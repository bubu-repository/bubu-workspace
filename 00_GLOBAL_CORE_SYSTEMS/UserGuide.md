# Cara Pakai BUBU Workspace

**Untuk semua orang di tim BUBU. Nggak perlu bisa coding, nggak perlu tau apa itu "skill" atau "MCP".**

---

## Satu aturan saja: ketik apa yang kamu mau

Buka Claude Code, pastikan yang kebuka folder **BUBU**, lalu tulis permintaanmu pakai bahasa sehari-hari. Sependek dan seberantakan apa pun. Claude yang mikir sisanya: mau pakai alat apa, formatnya apa, disimpan di mana. Kamu nggak usah mikirin itu.

Tulis "bikinin MOM meeting tadi", Claude langsung kasih notulen rapi. Tulis "gimana brand Kahf", Claude langsung kasih riset. Nggak ada pertanyaan bertele-tele, nggak ada "mau format apa?". Langsung jadi.

Kalau ada yang perlu ditebak, Claude akan tebak yang paling masuk akal, kasih tau tebakannya di satu baris di atas ("Saya asumsikan: ..."), lalu tetap kasih hasil lengkapnya. Kalau tebakannya meleset, tinggal koreksi.

---

## Contoh: apa yang kamu ketik, apa yang kamu dapat

| Kamu ketik begini | Claude kasih ini |
|---|---|
| "bikinin notulen rapat tadi sama Kahf" | MOM lengkap (ringkasan, keputusan, action items, next steps), file PDF + Word, tersimpan di folder Kahf |
| "tolong rapiin catatan ini" *(paste catatan)* | Notulen rapi format BUBU, bukan sekadar bullet |
| "invoice-in buat Pertamina 350 juta" | Invoice resmi ber-branding BUBU, file Word siap kirim |
| "bikin surat penawaran jasa brand strategy" | Surat penawaran lengkap dengan kop, isi, dan tanda tangan |
| "buat presentasi buat klien Kahf" | Deck presentasi utuh dengan alur cerita, file PowerPoint on-brand |
| "gimana sih brand Tokopedia" | Riset brand lengkap: timeline, positioning, kompetitor, dan Bubu Match |
| "riset dong kompetitor kita" | Analisa kompetitor terstruktur, bukan cuma satu paragraf |
| *(attach file PDF)* "tolong ringkas ini" | File dibaca dulu otomatis, lalu diringkas |

Pola-nya: kamu minta sedikit, Claude kasih versi seniornya. Minta "catatan" dapat MOM penuh. Minta "slide" dapat deck utuh. Effort-nya selalu lebih dari yang kamu ketik.

---

## Lanjutin kerjaan kemarin

Nggak perlu jelasin ulang dari awal. Tinggal ketik:

> "lanjutin deck Kahf yang kemarin"

atau

> "terusin riset yang belum kelar"

Claude akan cari file atau catatan progres terakhir di folder klien itu dan nyambung dari situ, bukan mulai dari nol.

---

## Upload file? Langsung aja

Attach file apa pun ke chat: PDF, Word, Excel, PowerPoint, gambar, audio, bahkan link YouTube. Claude otomatis baca isinya dulu, baru kerjain permintaanmu. Kamu nggak perlu convert apa-apa manual.

---

## File hasilnya ada di mana

Semua hasil masuk ke folder **`Clients/`** di dalam folder BUBU, dirapikan per nama klien:

```
Clients/
├── Kahf/
│   ├── MOM/
│   ├── Decks/
│   └── Research/
├── Pertamina/
│   └── ...
└── Internal/        (kalau kerjaan internal BUBU, bukan buat klien tertentu)
```

Kalau kamu nggak nyebut nama klien, Claude simpan di `Internal`. Kalau nyebut, otomatis masuk ke folder klien itu.

---

## Yang perlu kamu ingat

Nggak usah hafal nama skill. Nggak usah nulis prompt yang bagus. Nggak usah pilih format. Ketik aja apa yang ada di kepala, sependek apa pun, dalam bahasa Indonesia biasa. Claude ngerti, dan langsung kasih hasil jadi yang bisa langsung dipakai.

Kalau hasilnya belum pas, bilang aja apa yang kurang. Itu jauh lebih cepat daripada mikirin cara minta yang benar dari awal.

---

**BUBU Cultural Intelligence Agency**, Jakarta
*It's not about visibility. It's about relevance.*
