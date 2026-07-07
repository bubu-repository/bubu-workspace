# Reverse-Engineering "Fable": What It Actually Is, and How to Build the Clone

**Prepared for:** BUBU Internal (AI Systems)
**Date:** 7 July 2026
**Sources:** Anthropic docs (Prompting Claude Fable 5; Introducing Claude Fable 5 and Mythos 5), the Claude Code harness as observed from inside a running session, and the `bubu-press-release` skill (the BUBU Media Formula implementation this document uses as its worked example).

---

## The correction that makes everything else buildable

Fable 5 is a single large language model, a decoder-only transformer served token by token through one API endpoint (`POST /v1/messages`). There is no hidden overseer inside it, no internal router dispatching worker models, no secret deliberation pipeline. Every "orchestrator" behavior you observe (multi-step task execution, skill routing, memory, subagents, self-correction) is produced by two things: how the model was trained, and a scaffold of plain code and plain text files wrapped around it, called the harness. The training you cannot copy. The scaffold you can copy this week, with open-source models, because it is loops, files, and prompts.

That distinction is the whole blueprint. Roughly speaking the system you interact with is three layers:

| Layer | What it is | Replicable? |
|---|---|---|
| **1. The model** (`claude-fable-5`) | Weights trained with heavy reinforcement learning on long-horizon agentic tasks; always-on adaptive thinking; strong literal instruction following | No. Substitute an open model (Qwen, Llama, DeepSeek) and accept a quality gap, mainly on long-horizon coherence |
| **2. The harness** (Claude Code / Agent SDK) | The agent loop, tool execution, just-in-time skill loading, file-based memory, subagent spawning, context injection | Yes, fully. ~300 lines of Python |
| **3. The workspace** (BUBU's own setup) | CLAUDE.md standing instructions, skills like `bubu-press-release`, the angle log, `Learnings.md`, `ClientPreferences.md` | Yes, trivially. It is already markdown files on disk |

Layers 2 and 3 carry more of the observed "intelligence" than most people assume. The rest of this document dissects each mechanism and then gives the build plan.

---

## 1. 🧠 Fable's Cognitive Architecture vs. Standard LLMs

### What happens on one API request

A standard LLM call and a Fable call have the same skeleton: tokens in, tokens out, stateless, full history re-sent every turn. Three properties differ at the model level, all documented, none secret:

1. **Thinking is always on.** Fable 5 rejects `thinking: {type: "disabled"}` with a 400. Before and *between* tool calls the model emits internal reasoning tokens (billed, never returned raw; a summary is available via `display: "summarized"`). This is the "multi-step deliberation loop" you hypothesized: it is interleaved chain-of-thought, sampled inline in the same forward pass stream, not a separate module.
2. **Effort is a first-class dial.** `output_config.effort` (`low` → `max`) scales how much the model thinks and acts per request. A single request at high effort on a hard task can run 15 minutes: gather context, build, self-verify, all inside one turn. Standard chat models have no equivalent control.
3. **Training for long horizons.** The model was optimized on multi-hour and multi-day agentic trajectories, so it retains instructions across hundreds of tool calls, audits its own progress claims against tool results when told to, and dispatches parallel subagents dependably. Anthropic's own guidance says prompts written for older models are usually *too prescriptive* for Fable and reduce quality: state the goal and constraints, drop the step-by-step scaffolding.

### The execution pipeline you actually observed

Everything else in the pipeline lives in the harness. This is the loop, verbatim in shape:

```
1. Build prompt:  [system prompt] + [injected context] + [full message history]
2. Call model     (streaming)
3. Model returns: thinking blocks + text + zero or more tool_use blocks
4. If tool_use:   execute each tool locally → append tool_result blocks
                  → go to 2
5. If end_turn:   deliver final text to user
```

Your three hypotheses map onto this loop as follows:

| Your hypothesis | The real mechanism | Where it lives |
|---|---|---|
| Multi-step deliberation loop | Interleaved thinking tokens + the while-loop above | Model + harness |
| Hierarchical overseer-worker routing | Subagents: the lead model calls an `Agent` **tool**; the harness spawns a fresh model instance with its own context and a scoped prompt, and returns its final text as a tool result. The model decides when to delegate; the harness does the plumbing | Harness |
| Dynamic state-based context injection | Exactly real, and mundane: the harness splices text into the prompt at defined points. CLAUDE.md at session start, `<system-reminder>` blocks mid-conversation, recalled memory files, skill bodies on trigger | Harness |

### Skills: the routing mechanism with no router

There is no classifier deciding "this request needs the press-release skill." At session start the harness puts only each skill's *name and description* (a few hundred tokens each) into the system prompt. The model itself reads the user request, matches it against those descriptions, and calls a `Skill` tool; the harness then injects the full SKILL.md (thousands of tokens of instructions) into context, and generation continues under those instructions. This is progressive disclosure: cheap index always loaded, expensive body loaded just in time. The "auto-routing" is ordinary in-context reasoning by the same single model.

### Memory and long-horizon persistence

There is no vector database and no gradient update. Persistence is files:

- **Session-to-session memory:** a directory of markdown files, one fact per file, plus an index (`MEMORY.md`) small enough to load into every session's system prompt. Recall means the harness pastes relevant files into context.
- **Within-session survival:** when context approaches the window limit, the harness (or the API's server-side compaction) summarizes older turns into a compact block. The model continues from the summary.
- **Task state:** checkpoint files on disk (`*.checkpoint.md` in this workspace), so a killed session resumes by reading its own notes.

Anthropic's guidance is explicit that Fable performs measurably better when given "a place to write notes, as simple as a Markdown file." Continuous learning in this system is an agent writing to its own prompt-injection surface. That is the entire trick, and it is why the BUBU Learning Loop (Section 9 of this workspace's CLAUDE.md) works.

---

## 2. ⚡ Formula Learning Without Template Collapse

This is the mechanism you care most about, and BUBU already runs a working reference implementation: `bubu-toolkit/skills/bubu-press-release/SKILL.md`. Dissecting why it works tells you exactly how to engineer it anywhere.

### Why naive formula prompts collapse into templates

An LLM given a positive example ("here is a great press release, follow this formula") treats the example as the distribution to sample near. Every output regresses toward the same opening, the same paragraph rhythm, the same transitions. Repetition is the default failure mode of "formula" prompting. Preventing it takes five counter-forces, and the BUBU skill applies all five:

**Force 1: encode the formula as logic, never as layout.** The skill's core axiom is literal: "learn the formula, never the template... a psychological logic, not a document structure. Invent a fresh structural architecture for every single release." The four parts (Contrarian Cultural Hook → Angle of Relevance → Evidence & Grounding → Impact Vector) are defined by *what the reader must experience*, and the skill explicitly permits reordering, merging, and interleaving. A formula written as reader-experience checkpoints gives the model freedom in the surface form; a formula written as sections takes it away.

**Force 2: constrain the negative space, not the positive space.** The skill bans specific vocabulary, the "not A, but B" frame, template-report sentence shapes, em dashes, stat-stacking. Negative constraints prune the degenerate modes without collapsing the distribution the way a positive example does. This is the single highest-leverage trick for any voice system.

**Force 3: external state that makes repetition detectable.** The angle log (`bubu-press-angle-log.md`) records every deployed angle, hook, and structure. Before writing, the model must read it and is forbidden from reusing anything structurally or thematically identical. Repetition avoidance cannot live inside a stateless model; it requires a ledger outside the model that turns "don't repeat yourself" from a vibe into a checkable query. This is your Angle Differentiation Engine, and it is a text file.

**Force 4: a self-critique pass with a concrete rubric.** After drafting, the skill runs a silent audit: news clear within three sentences? under 350 words? zero banned frames? at most 2-3 numbers, each interpreted? angle one no other journalist would write? structure different from every logged release? If any check fails, rewrite before presenting. Generation and evaluation are separated into two passes even inside one model call, which is the cheapest form of the overseer-worker pattern you hypothesized.

**Force 5: feedback distilled into rules, not edits.** When the user critiques a draft, the skill extracts the *general principle* ("hooks must reference lived behavior, not abstract theory") and appends it to a Learned Rules section of the log. Every future generation re-checks against the full rule list. One correction changes all future outputs. That is the continuous-learning loop, implemented as append-only markdown.

### The generalized pipeline

Any "strategic formula" (media formula, deck narrative arc, research structure) replicates with this per-task sequence:

```
RECALL   read ledger: past outputs' angles/structures + learned rules
AUDIT    choose an angle; reject any candidate matching the ledger
GENERATE draft under (formula-as-logic + negative constraints + learned rules)
LINT     deterministic checks in code, not the model: banned words,
         banned frames, length, structure fingerprint vs. ledger
CRITIQUE second model pass scoring the draft against the rubric
REVISE   if lint or critique fails, regenerate with the failure reasons appended
LOG      append this output's angle, hook type, structure, and any new
         learned rule to the ledger
```

The LINT stage matters more with weaker models: a regex catches an em dash with 100% recall at zero token cost, so push every mechanically checkable rule out of the prompt and into code, and spend the model's judgment only on the checks that need judgment.

---

## 3. 🏗️ The Reverse-Engineering Blueprint (Building It Without Fable)

### Component decomposition

| Component | Job | Implementation |
|---|---|---|
| **Orchestrator loop** | The while-loop from Section 1: call model, execute tools, feed results back | ~150 lines of Python, or LangGraph if you want built-in persistence and human-in-the-loop interrupts |
| **Model server** | Token generation | Ollama (dev) or vLLM (prod) serving Qwen3-32B/235B, Llama 4, or DeepSeek-V3-class weights; any OpenAI-compatible endpoint works. Pick a model with native tool-calling and reasoning traces |
| **Tool layer** | File read/write, shell, web fetch, document renderers | Plain Python functions with JSON-schema signatures |
| **Skill store** | Formula and voice instructions, loaded just in time | Folder of SKILL.md files; index of name+description in the system prompt; full body injected when the router step selects one |
| **Memory ledger** | Cross-session facts, preferences, learned rules | Markdown files + one index file loaded every session (mirror of `BUBU_Assets/Knowledge/`) |
| **Angle Differentiation Engine** | Repetition rejection | The angle log file, read pre-generation; optionally add embedding cosine-similarity (e.g. `bge-m3` locally) between the candidate angle and logged angles, reject above ~0.80 |
| **Self-Critique loop** | Quality gate | LINT (deterministic code) + one critique call, ideally to a *fresh context* (Anthropic's own note: fresh-context verifiers outperform self-critique in the same context) |
| **State manager** | Crash-safe long tasks | Checkpoint file updated after each completed section; resume by reading it |

### Architecture diagram

```
                        ┌─────────────────────────────────────────┐
                        │            ORCHESTRATOR (Python)         │
                        │                                           │
 user request ────────▶ │  1. assemble prompt                       │
                        │     ├── system core (Fable-Core, §4)      │
                        │     ├── memory index + relevant ledgers   │
                        │     ├── skill index (names+descriptions)  │
                        │     └── message history                   │
                        │  2. call LLM ◀────────────────────────┐   │
                        │  3. parse response                    │   │
                        │     ├── tool call? ──▶ TOOL LAYER ────┘   │
                        │     │                  (fs / shell / web  │
                        │     │                   / load_skill      │
                        │     │                   / spawn_subagent) │
                        │     └── final text ──▶ QUALITY GATE       │
                        │                         ├── LINT (regex)  │
                        │                         ├── CRITIQUE call │
                        │                         └── fail? loop ▲  │
                        │  4. deliver + LOG ledgers                 │
                        └───────────────┬───────────────────────────┘
                                        │
              ┌─────────────────────────┼──────────────────────────┐
              ▼                         ▼                          ▼
      ┌──────────────┐         ┌──────────────┐          ┌──────────────┐
      │  SKILL STORE │         │ MEMORY LEDGER│          │  MODEL SERVER │
      │  skills/*/   │         │ learnings.md │          │  vLLM/Ollama  │
      │  SKILL.md    │         │ prefs.md     │          │  (any OpenAI- │
      │              │         │ angle-log.md │          │   compatible) │
      └──────────────┘         │ INDEX.md     │          └──────────────┘
                               └──────────────┘
      Subagents = the same orchestrator, recursed once, with a scoped
      prompt and empty history; its final text returns as a tool result.
```

### The orchestrator loop, concretely

```python
import json, re, requests

LLM = "http://localhost:8000/v1/chat/completions"   # vLLM / Ollama

def call(messages, tools=None):
    r = requests.post(LLM, json={"model": "qwen3-32b", "messages": messages,
                                 "tools": tools, "temperature": 0.7})
    return r.json()["choices"][0]["message"]

def run_task(user_request, system_core, skill_index, memory_index):
    messages = [
        {"role": "system", "content": system_core + skill_index + memory_index},
        {"role": "user", "content": user_request},
    ]
    while True:
        msg = call(messages, tools=TOOL_SCHEMAS)
        messages.append(msg)
        if not msg.get("tool_calls"):
            return quality_gate(msg["content"], messages)   # may loop back
        for tc in msg["tool_calls"]:
            result = TOOLS[tc["function"]["name"]](**json.loads(tc["function"]["arguments"]))
            messages.append({"role": "tool", "tool_call_id": tc["id"],
                             "content": str(result)[:20000]})

def quality_gate(draft, messages):
    errors = lint(draft)                        # regex: banned words, frames, length
    if not errors:
        verdict = call([{"role": "system", "content": CRITIQUE_RUBRIC},
                        {"role": "user", "content": draft}])   # fresh context
        errors = parse_failures(verdict["content"])
    if errors:
        messages.append({"role": "user", "content":
            "Revise. Fix ONLY these failures, keep everything else: "
            + "; ".join(errors)})
        return run_continue(messages)           # bounded retries: max 3
    append_to_ledger(draft)
    return draft

def lint(text):
    errs = []
    if "—" in text: errs.append("em dash present")
    for w in BANNED_WORDS:
        if re.search(rf"\b{w}\b", text, re.I): errs.append(f"banned word: {w}")
    if re.search(r"(?i)\bnot (just |only |about )?\w[^.]{0,60}, (but|it's| it is)\b", text):
        errs.append("'not A, but B' frame")
    return errs
```

Two build notes from hard-won practice. First, weaker open models drift out of the loop discipline (they narrate instead of calling tools, or stop mid-task); a `while` loop with a max-iteration guard plus a "if your last message is a plan and not a result, continue working" nudge message recovers most of it. Second, keep the stable prompt prefix byte-identical across calls (system core first, volatile context last) so KV-cache reuse in vLLM keeps latency and cost down, the same prefix-caching economics the Claude API charges you for.

### Honest capability accounting

The scaffold reproduces the *mechanics* exactly: routing, formula discipline, angle differentiation, self-critique, learning loop, checkpointing. What it will not reproduce is layer 1: Fable-class first-shot correctness, multi-hour coherence, and the judgment quality of the critique pass. Expect the clone on a 32B open model to need 2 to 3 revision cycles where Fable needs zero to one, and to need the LINT stage doing more of the enforcement. For a press-release-length deliverable that gap is manageable; for week-long autonomous runs it is not, and no prompt closes it.

---

## 4. 📜 The "Fable-Core" System Prompt and State Loop

Drop-in system prompt, model-agnostic, encoding the cognitive style dissected above. Replace bracketed values. Pair it with the loop from Section 3.

```text
You are [AGENT_NAME], a senior autonomous specialist for [ORG]. You complete
tasks end to end and return finished deliverables, never plans or questions
when action is possible.

OPERATING RULES
1. Act on sufficient information. When you have enough to proceed, proceed.
   Do not re-derive established facts, re-litigate decided questions, or
   survey options you will not pursue. If weighing a choice, pick one and
   state the assumption in a single line at the top of your reply.
2. One clarifying question maximum, and only when the task is impossible
   without it. Even then, deliver a best-guess draft alongside the question.
3. Ground every progress claim in evidence from this session's tool results.
   If something is unverified, say so plainly. Never report intended work
   as done.
4. Boundaries: when the user describes a problem or thinks out loud, deliver
   an assessment and stop. Change state only when asked. Before any
   destructive or irreversible action, stop and confirm.
5. End your turn only when the deliverable is complete or you are blocked on
   input only the user can supply. If your final paragraph is a plan or a
   promise, execute it instead.

WORKFLOW FOR EVERY DELIVERABLE
A. RECALL: read [LEDGER_DIR]/index.md, the relevant client preferences, and
   the output log for this deliverable type. Treat Learned Rules as binding.
B. DIFFERENTIATE: choose an approach that shares no structure or central
   angle with any logged past output. If your first idea is the one any
   competent generalist would produce, discard it and go one level deeper.
C. GENERATE under the active formula. The formula is a sequence of effects
   on the reader, never a document layout: invent a fresh structure every
   time. Honor every negative constraint below.
D. SELF-AUDIT silently against the rubric before presenting. If any check
   fails, rewrite before the user sees it.
E. LOG: append to the output log: date, task, angle used, structure used,
   one line on what worked. When the user corrects you, extract the general
   principle and append it to Learned Rules immediately.

NEGATIVE CONSTRAINTS (voice)
- No em dashes. Use a comma, colon, parentheses, or a new sentence.
- Never write "not A, but B" or any variant, in any language.
- Banned vocabulary: [BANNED_LIST].
- No template sentences ("This initiative focuses on...").
- Vary sentence and paragraph length; at most [N] statistics per piece, each
  followed by a plain-language sentence on what it means for a person.
- Thesis in the first three sentences. End on the sharpest line, not a recap.

MEMORY
Write one lesson per file in [LEDGER_DIR], one-line summary at the top.
Record corrections and confirmed approaches, with the why. Do not save what
the files or history already record. Update rather than duplicate; delete
notes proven wrong. Consult these files at the start of every task.

DELEGATION
Delegate independent subtasks to subagents and keep working while they run.
Every subagent must save its output to a file before reporting done; never
accept "done" without a file path. Verify with a fresh-context checker
rather than re-reading your own draft.
```

And the state loop that carries a long task across sessions, the piece most clones forget:

```
on task start:      if [task].checkpoint.md exists → resume from it
after each section: write output to disk; update checkpoint
                    (done / in-progress / remaining / exact resume command)
on user feedback:   append learned rule to ledger BEFORE continuing the task
on task complete:   final LOG entry; delete checkpoint
```

---

## The one-paragraph summary

Fable's "secret sauce" splits cleanly in two. The model itself brings trained long-horizon competence, always-on reasoning, and instruction fidelity; that part is weights, and you rent it or approximate it with open models. Everything that looks like cognitive architecture (skill routing, formula discipline without template rot, memory, self-critique, feedback learning) is a while-loop, a folder of markdown, an append-only ledger, and a lint pass, and the working proof is already in this repository: `bubu-press-release` implements the full pattern in a single SKILL.md plus one log file. Build the loop from Section 3, install the prompt from Section 4, keep the ledgers honest, and the clone thinks the way this system does. The weights decide how far it gets on the hardest day; the scaffold decides whether it behaves the same on every day.
