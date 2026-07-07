import { useState } from "react";

// Kamu Tipe BBM Pertamina yang Mana? — interactive fuel personality quiz
// Stack: React + Tailwind CSS. Drop into any React app; no external deps.

const FUELS = {
  lite: {
    name: "Pertalite",
    title: "Sahabat sejuta umat",
    spec: "RON 90 · Loyalitas 100",
    color: "#00A64F",
    dark: "#00753A",
    icon: "🤝",
    desc: "Kamu definisi “selalu ada”. Chat grup kamu yang bales duluan, urunan kado kamu yang koordinir, dan pas semua orang bingung, kamu yang turun tangan. Merakyat, gampang ditemuin di mana aja, dan nggak pernah ribet. Kadang jadi andalan semua orang itu capek, tapi justru itu superpower kamu: tanpa kamu, semuanya nggak jalan. Kamu bukan pelengkap, kamu fondasinya. Tapi inget ya, istirahat juga boleh.",
    quote: "Tanpa aku, grup sepi. Ada aku, semua jalan.",
  },
  max: {
    name: "Pertamax",
    title: "Si paling seimbang",
    spec: "RON 92 · Stabil di segala medan",
    color: "#00529C",
    dark: "#003A70",
    icon: "⚖️",
    desc: "Hidup kamu kayak playlist yang udah dikurasi: nggak berlebihan, tapi semuanya berkualitas. Kamu tahu kapan harus gas, kapan harus santai. Kerjaan beres, tidur cukup, masih sempat nonton series. Orang percaya sama kamu bukan karena kamu paling heboh, tapi karena kamu paling konsisten. Standar kamu jelas: nggak harus kelihatan mewah, yang penting terasa benar.",
    quote: "Seimbang itu flex paling elegan.",
  },
  turbo: {
    name: "Pertamax Turbo",
    title: "Ngebut adalah kepribadian",
    spec: "RON 98 · Performa maksimal",
    color: "#ED2124",
    dark: "#B01215",
    icon: "🚀",
    desc: "Jalan kaki aja kamu nyalip orang. Notifikasi kalender kamu lebih rame dari grup keluarga. Buat kamu, “santai” cuma transisi antara dua ambisi. Standar tinggi, gerak cepat, dan kamu nggak sanggup lihat progress bar jalan lambat. Capek? Kadang. Tapi lihat hasil kerja sendiri itu bahan bakar paling premium buat kamu.",
    quote: "Pelan-pelan itu bagus. Buat orang lain.",
  },
  dex: {
    name: "Pertamina Dex",
    title: "Tenaga tanpa drama",
    spec: "CN 53 · Torsi versi manusia",
    color: "#37474F",
    dark: "#22303B",
    icon: "💪",
    desc: "Ngomongnya dikit, ngangkatnya banyak. Pas semua orang masih sibuk wacana, kamu udah setengah jalan ngerjain. Kamu tipe yang dipanggil pas keadaan berat: pindahan kosan, deadline mustahil, atau jadi tempat cerita jam 1 pagi. Nggak butuh spotlight, karena hasil kerja kamu yang ngomong. Tenaga besar, drama nol.",
    quote: "Ngomong dikit, ngangkat banyak.",
  },
};

const QUIZ = [
  {
    q: "Jam 6 pagi. Alarm bunyi. Kamu…",
    a: [
      { t: "Snooze 3 kali, tapi anehnya tetap sampai tepat waktu", k: "lite" },
      { t: "Bangun sesuai jadwal, sarapan, semua sudah terencana", k: "max" },
      { t: "Udah bangun dari jam 5, sempat olahraga dulu", k: "turbo" },
      { t: "Bangun sekali, langsung gerak. Tanpa drama.", k: "dex" },
    ],
  },
  {
    q: "Macet total di Sudirman. Kamu ngapain?",
    a: [
      { t: "Buka 3 aplikasi maps sekaligus nyari celah", k: "turbo" },
      { t: "Voice note ke grup: “gila, macet banget woy”", k: "lite" },
      { t: "Diam, tenang. Macet itu waktu bonus buat mikir.", k: "dex" },
      { t: "Nyalain podcast, sabar, toh nanti juga sampai", k: "max" },
    ],
  },
  {
    q: "Grup chat nanya: “makan siang di mana?”",
    a: [
      { t: "Jawab “terserah”, tapi ujungnya kamu juga yang mutusin", k: "lite" },
      { t: "Udah kirim link resto plus jam booking dari tadi", k: "turbo" },
      { t: "Kasih 2 opsi: rating 4.5 ke atas, harga masuk akal", k: "max" },
      { t: "“Yang deket aja. Porsinya yang banyak.”", k: "dex" },
    ],
  },
  {
    q: "Peran kamu di kerja kelompok:",
    a: [
      { t: "Diam-diam ngerjain 60 persen sendirian", k: "dex" },
      { t: "Penjaga mood tim, yang bales semua chat", k: "lite" },
      { t: "Bikin timeline, follow up jam 11 malam", k: "turbo" },
      { t: "Bagian sendiri beres on time, rapi, nggak ribut", k: "max" },
    ],
  },
  {
    q: "Weekend ideal versi kamu:",
    a: [
      { t: "Brunch santai, jalan sore, me time berkualitas", k: "max" },
      { t: "Gym, beresin rumah, angkat-angkat barang", k: "dex" },
      { t: "Nongkrong bareng temen sampai lupa waktu", k: "lite" },
      { t: "Itinerary padat: lari pagi, coffee tasting, networking", k: "turbo" },
    ],
  },
  {
    q: "Gaya bales chat kamu:",
    a: [
      { t: "Voice note 2 menit sambil jalan cepat", k: "turbo" },
      { t: "Bales yang penting, jelas, dan sopan", k: "max" },
      { t: "“Ok.” “Siap.” Selesai.", k: "dex" },
      { t: "Semua dibales, termasuk grup keluarga", k: "lite" },
    ],
  },
  {
    q: "Deadline tinggal 24 jam. Kondisi kamu:",
    a: [
      { t: "Panik dikit, ngopi, ngeluh di grup, tapi kelar juga", k: "lite" },
      { t: "Aman. Udah dicicil dari minggu lalu.", k: "max" },
      { t: "Kelar dari H-2, sekarang revisi biar makin perfect", k: "turbo" },
      { t: "Mode fokus: begadang sekali, kelar, tidur", k: "dex" },
    ],
  },
  {
    q: "Isi galeri HP kamu kebanyakan:",
    a: [
      { t: "Stok meme buat dikirim ke grup", k: "lite" },
      { t: "Screenshot to do list, jadwal, dan quotes ambis", k: "turbo" },
      { t: "Foto rapi, ada album, ke-backup semua", k: "max" },
      { t: "12 foto. Semuanya penting.", k: "dex" },
    ],
  },
  {
    q: "Cara kamu pesan kopi:",
    a: [
      { t: "Latte gula aren, yang penting bijinya jelas", k: "max" },
      { t: "Kopi hitam. Panas. Udah.", k: "dex" },
      { t: "Double shot americano, take away, sambil jalan", k: "turbo" },
      { t: "Es kopi susu yang biasa aja, nggak perlu aneh-aneh", k: "lite" },
    ],
  },
  {
    q: "Kalimat yang paling “kamu banget”:",
    a: [
      { t: "“Sini, biar aku yang angkat.”", k: "dex" },
      { t: "“Aku ikut aja, yang penting bareng-bareng.”", k: "lite" },
      { t: "“Bisa lebih cepat nggak sih ini?”", k: "turbo" },
      { t: "“Yang penting kualitasnya, bukan gayanya.”", k: "max" },
    ],
  },
];

const FRESH_SCORE = { lite: 0, max: 0, turbo: 0, dex: 0 };

export default function PertaminaFuelQuiz() {
  const [screen, setScreen] = useState("start"); // start | quiz | result
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(FRESH_SCORE);
  const [fading, setFading] = useState(false);
  const [toast, setToast] = useState(null);

  const transition = (fn) => {
    setFading(true);
    setTimeout(() => {
      fn();
      setFading(false);
    }, 220);
  };

  const pick = (key) => {
    const next = { ...score, [key]: score[key] + 1 };
    transition(() => {
      setScore(next);
      if (step + 1 < QUIZ.length) setStep(step + 1);
      else setScreen("result");
    });
  };

  const restart = () =>
    transition(() => {
      setScreen("start");
      setStep(0);
      setScore(FRESH_SCORE);
    });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const winner = Object.keys(FUELS).reduce((a, b) =>
    score[b] > score[a] ? b : a
  );
  const fuel = FUELS[winner];
  const pct = Math.round((step / QUIZ.length) * 100);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="text-base font-extrabold tracking-tight">
            <span className="text-[#ED2124]">my</span>
            <span className="text-[#00529C]">pertamina</span>
          </div>
          <span className="text-[11px] font-medium text-[#00529C] bg-blue-50 px-3 py-1 rounded-full">
            ✦ Fuel Personality
          </span>
        </div>

        <div
          className={`p-6 transition-all duration-200 ${
            fading ? "opacity-0 -translate-x-3" : "opacity-100 translate-x-0"
          }`}
        >
          {/* ---------- START ---------- */}
          {screen === "start" && (
            <div className="text-center">
              <span className="inline-block bg-red-50 text-[#B01215] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                Kuis kepribadian
              </span>
              <h1 className="text-[27px] font-extrabold text-[#00529C] leading-tight mb-3">
                Kamu tipe BBM Pertamina yang mana?
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                10 pertanyaan receh soal hidup kamu sehari-hari. Jawab jujur
                ya, bukan jawab yang kelihatan keren doang.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {Object.values(FUELS).map((f) => (
                  <span
                    key={f.name}
                    className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: f.color }}
                    />
                    {f.name}
                  </span>
                ))}
              </div>
              <button
                onClick={() => transition(() => setScreen("quiz"))}
                className="w-full bg-[#ED2124] hover:brightness-110 active:scale-[.98] text-white font-bold py-3.5 rounded-2xl transition"
              >
                ⛽ Gas, mulai
              </button>
              <p className="text-[11px] text-gray-400 mt-3">
                Cuma 1 menit · hasilnya bisa dipamerin ke IG Story
              </p>
            </div>
          )}

          {/* ---------- QUIZ ---------- */}
          {screen === "quiz" && (
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-[#00529C]">
                  Pertanyaan {step + 1} dari {QUIZ.length}
                </span>
                <span className="text-[11px] font-medium text-gray-400">
                  {pct}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full mb-5 overflow-hidden">
                <div
                  className="h-full bg-[#00529C] rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <h2 className="text-[17px] font-bold text-gray-800 leading-snug mb-4">
                {QUIZ[step].q}
              </h2>
              {QUIZ[step].a.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => pick(opt.k)}
                  className="block w-full text-left bg-white border-[1.5px] border-gray-200 hover:border-[#00529C] hover:shadow-md hover:-translate-y-px active:scale-[.98] rounded-2xl px-4 py-3.5 mb-2.5 text-[13.5px] text-gray-700 leading-relaxed transition"
                >
                  <span className="inline-flex w-[22px] h-[22px] rounded-full bg-blue-50 text-[#00529C] text-[11px] font-bold items-center justify-center mr-2.5 align-middle">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt.t}
                </button>
              ))}
            </div>
          )}

          {/* ---------- RESULT ---------- */}
          {screen === "result" && (
            <div>
              <div
                className="rounded-2xl p-6 text-center mb-4"
                style={{ background: fuel.color }}
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 text-[26px]">
                  {fuel.icon}
                </div>
                <p className="text-[11px] text-white/85 uppercase tracking-[2px] font-bold mb-1.5">
                  Kamu adalah
                </p>
                <h2 className="text-[26px] font-extrabold text-white leading-tight">
                  {fuel.name}
                </h2>
                <p className="text-sm font-bold text-white/95 mt-1 mb-2.5">
                  {fuel.title}
                </p>
                <span className="inline-block bg-white/15 text-white text-[11px] font-medium px-3 py-1 rounded-full">
                  {fuel.spec}
                </span>
              </div>

              <p className="text-[13.5px] text-gray-600 leading-relaxed mb-4">
                {fuel.desc}
              </p>

              {/* Fuel mix breakdown */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#00529C] mb-2.5">
                  Campuran kepribadian kamu
                </p>
                {Object.entries(FUELS).map(([k, f]) => {
                  const p = Math.round((score[k] / QUIZ.length) * 100);
                  return (
                    <div key={k} className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] text-gray-500 font-medium w-24 shrink-0">
                        {f.name}
                      </span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${p}%`, background: f.color }}
                        />
                      </div>
                      <span className="text-[11px] text-gray-600 font-bold w-8 text-right">
                        {p}%
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* IG Story share card mockup */}
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#00529C] text-center mb-2.5">
                Preview IG Story kamu
              </p>
              <div className="flex justify-center mb-5">
                <div
                  className="w-[210px] rounded-2xl p-5 text-center"
                  style={{ background: fuel.dark }}
                >
                  <p className="text-[10px] text-white/70 uppercase tracking-[1.5px] font-bold mb-3.5">
                    Tipe BBM aku
                  </p>
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3 text-xl"
                    style={{ background: fuel.color }}
                  >
                    {fuel.icon}
                  </div>
                  <p className="text-[19px] font-extrabold text-white leading-tight mb-2">
                    {fuel.name}
                  </p>
                  <p className="text-xs text-white/90 italic leading-normal mb-4">
                    “{fuel.quote}”
                  </p>
                  <div className="border-t border-white/20 pt-3 text-[10px] text-white/75 font-medium">
                    <span className="text-white font-bold">my</span>pertamina ·
                    #TipeBBMAku
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  showToast("Story card disimpan. Siap dipost (mockup demo)")
                }
                className="w-full bg-white text-[#00529C] border-[1.5px] border-[#00529C] font-bold py-3.5 rounded-2xl mb-2.5 hover:bg-blue-50 active:scale-[.98] transition"
              >
                Share ke IG Story
              </button>
              <button
                onClick={() =>
                  showToast("+50 poin masuk ke akun MyPertamina kamu (mockup demo)")
                }
                className="w-full bg-[#ED2124] text-white font-bold py-3.5 rounded-2xl mb-2.5 hover:brightness-110 active:scale-[.98] transition"
              >
                🎁 Claim 50 MyPertamina Points
              </button>
              <button
                onClick={restart}
                className="w-full bg-transparent text-gray-500 border-[1.5px] border-gray-200 font-bold py-3.5 rounded-2xl hover:bg-gray-50 active:scale-[.98] transition"
              >
                Main lagi
              </button>
            </div>
          )}
        </div>

        {/* Toast */}
        {toast && (
          <div className="absolute left-1/2 bottom-4 -translate-x-1/2 bg-gray-900 text-white text-xs px-4 py-2.5 rounded-full whitespace-nowrap shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
