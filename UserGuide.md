# BUBU Workspace — Panduan Lengkap untuk Pengguna Baru

**Versi 2.0 | Juni 2026 | BUBU Cultural Intelligence Agency**

> Panduan ini ditulis untuk siapa pun di tim BUBU — tidak perlu background coding atau IT.
> Ikuti step per step, dan kamu akan siap bekerja dalam 15–20 menit.

---

## Daftar Isi

1. [Apa Itu BUBU Workspace?](#1-apa-itu-bubu-workspace)
2. [Apa Saja yang Perlu Diinstall?](#2-apa-saja-yang-perlu-diinstall)
3. [Setup Langkah demi Langkah](#3-setup-langkah-demi-langkah)
4. [Install BUBU Toolkit (Wajib)](#4-install-bubu-toolkit-wajib)
5. [Apa Itu gstack?](#5-apa-itu-gstack)
6. [Cara Kerja Sehari-hari](#6-cara-kerja-sehari-hari)
7. [Contoh Penggunaan Nyata](#7-contoh-penggunaan-nyata)
8. [FAQ & Troubleshooting](#8-faq--troubleshooting)

---

## 1. Apa Itu BUBU Workspace?

Bayangkan BUBU Workspace seperti **lemari arsip digital bersama** yang berisi semua "alat pintar" untuk bekerja dengan Claude (AI assistant dari Anthropic).

Isinya ada tiga jenis alat:

| Apa | Fungsinya |
|-----|-----------|
| **BUBU Toolkit** | 5 skill khusus BUBU: bikin MOM, surat resmi, deck presentasi, riset brand, dan konversi file |
| **gstack** | 23+ skill tambahan untuk pekerjaan yang lebih teknis (review, QA, deploy — lebih relevan untuk tim yang develop produk digital) |
| **BUBU Assets** | Logo, template, context file tentang perusahaan — bahan baku untuk semua output |

**Kenapa perlu di-setup?**
Karena dengan setup ini, setiap anggota tim BUBU punya akses ke tools yang sama, output yang konsisten brand-nya, dan update otomatis kalau ada skill baru ditambahkan.

---

## 2. Apa Saja yang Perlu Diinstall?

Sebelum mulai, pastikan tiga hal ini sudah ada di komputermu:

### A. Claude Code
Ini adalah aplikasi utamanya — tempat kamu ngobrol dengan Claude dan menjalankan semua skill BUBU.

**Download:** [claude.ai/code](https://claude.ai/code)

Setelah download, install seperti aplikasi biasa (drag ke Applications di Mac, atau run installer di Windows).

---

### B. Git
Git adalah alat untuk "mengunduh dan menyinkronkan" workspace BUBU dari internet ke komputermu. Mirip seperti Dropbox, tapi untuk kode dan file teks.

**Cara cek apakah sudah ada:**
1. Buka **Terminal** (Mac: cari "Terminal" di Spotlight/Search, tekan Cmd+Space lalu ketik Terminal)
2. Ketik: `git --version`
3. Tekan Enter

Jika muncul sesuatu seperti `git version 2.39.0` → **Git sudah ada, lanjut ke langkah berikutnya.**

Jika muncul error atau tidak ada → **Install Git dulu:**
- **Mac:** Ketik `xcode-select --install` di Terminal, lalu ikuti instruksinya
- **Windows:** Download dari [git-scm.com](https://git-scm.com/) dan install seperti biasa

---

### C. Bun
Bun adalah "mesin" yang dibutuhkan gstack agar bisa jalan. Anggap saja seperti driver yang diperlukan printer agar bisa ngeprint.

**Cara install Bun:**
1. Buka Terminal
2. Copy-paste perintah ini lalu tekan Enter:
   ```
   curl -fsSL https://bun.sh/install | bash
   ```
3. Tunggu sampai selesai (biasanya 1-2 menit)
4. **Tutup Terminal, lalu buka lagi** (penting — agar Bun aktif)
5. Verifikasi: ketik `bun --version` — harus muncul angka versi

---

## 3. Setup Langkah demi Langkah

### Langkah 1 — Download BUBU Workspace

Buka Terminal dan ketik perintah berikut **satu per satu**:

```bash
git clone --recurse-submodules https://github.com/seabub/bubu-workspace.git BUBU
```

Tekan Enter dan tunggu. Terminal akan menampilkan progress download. Ini bisa memakan waktu 2-5 menit tergantung koneksi internet.

> **`--recurse-submodules`** artinya "download juga gstack sekalian" — jangan di-skip flag ini.

Setelah selesai, ketik:
```bash
cd BUBU
```

Ini untuk "masuk" ke folder BUBU yang baru saja didownload.

---

### Langkah 2 — Jalankan Setup

Masih di Terminal (pastikan kamu sudah di dalam folder BUBU), ketik:

```bash
chmod +x setup.sh && ./setup.sh
```

Tekan Enter. Ini akan:
- Menginisialisasi gstack (buat binary/mesin yang diperlukan)
- Mengaktifkan auto-update — gstack akan update sendiri setiap kali kamu buka Claude Code

Proses ini sekitar 2-3 menit. Kalau selesai, akan muncul pesan:
```
Done. Restart Claude Code to activate all skills.
```

---

### Langkah 3 — Buka Workspace di Claude Code

1. Buka aplikasi **Claude Code**
2. Di menu/layar awal, pilih **Open Folder** atau **Open Directory**
3. Pilih folder `BUBU` yang tadi didownload (biasanya ada di home folder kamu, atau di mana pun kamu menjalankan perintah clone tadi)
4. Claude Code akan membuka workspace BUBU

> Setelah ini, **setiap kali** kamu mau kerja dengan tools BUBU, buka Claude Code dan pilih folder BUBU ini. Jangan buka folder lain.

---

## 4. Install BUBU Toolkit (Wajib)

BUBU Toolkit adalah skill-skill khusus untuk pekerjaan BUBU sehari-hari. File instalasinya ada di dalam folder BUBU dengan nama `bubu-toolkit.plugin`.

**Cara install:**

1. Di Claude Code, cari panel atau menu **Plugins** (biasanya di sidebar kiri atau menu atas)
2. Klik **Install from file** atau **Install Plugin**
3. Browse ke folder BUBU, pilih file **`bubu-toolkit.plugin`**
4. Klik Install / Open
5. **Restart Claude Code**

Setelah restart, kamu punya 5 skill BUBU yang aktif:

| Skill | Gunakan untuk |
|-------|--------------|
| `/bubu-mom` | Bikin Minutes of Meeting dari catatan, rekaman, atau chat log |
| `/bubu-admin-docs` | Surat resmi, invoice, penawaran, SOP, memo, proposal |
| `/bubu-presentation` | Deck presentasi dengan branding BUBU |
| `/bubu-market-research` | Riset brand, analisa kompetitor, market analysis |
| `/markitdown` | Konversi file (PDF, Word, Excel, dll) jadi text yang bisa dibaca Claude |

**Cara pakai skill:** cukup tulis perintah ke Claude Code, dan kalau relevan dengan salah satu skill di atas, Claude akan otomatis menggunakannya. Kamu tidak perlu mengetik `/bubu-mom` secara manual — cukup bilang "tolong buatkan MOM dari catatan ini" dan Claude tahu harus pakai skill apa.

---

## 5. Apa Itu gstack?

### Penjelasan Singkat

gstack adalah **koleksi "peran virtual"** yang bisa dipanggil saat bekerja dengan Claude Code. Setiap peran punya keahlian spesifik — seperti tim di kantor, tapi berbentuk AI commands.

### Analogi

Bayangkan kamu punya satu chat yang bisa tiba-tiba berubah jadi:
- **Konsultan strategis** yang challenge ide kamu dari sudut bisnis
- **Arsitek teknis** yang gambar data flow dan arsitektur sistem
- **QA tester** yang buka browser sungguhan dan test aplikasi kamu
- **Code reviewer** yang cari bug sebelum naik production
- **Release engineer** yang merge kode dan deploy ke server

Itulah gstack. Kamu manggil satu skill dengan perintah `/nama-skill`, dan Claude langsung "berperan" sebagai spesialis itu.

### Untuk Siapa?

gstack paling berguna untuk **tim yang develop produk digital** — web app, mobile app, atau sistem internal. Kalau kamu di tim yang tidak mengelola codebase, kamu mungkin jarang butuh gstack secara langsung.

Tapi tetap ada beberapa gstack skill yang berguna untuk semua orang di BUBU:
- `/browse` — suruh Claude browsing internet untuk kamu
- `/investigate` — bantu debug masalah atau cari root cause suatu isu
- `/document-generate` — generate dokumentasi dari scratch

---

### Daftar Lengkap gstack Skills

| Skill | Tahap | Fungsi |
|-------|-------|--------|
| `/office-hours` | Berpikir | Challenge dan refine ide produk, bikin design doc |
| `/plan-ceo-review` | Perencanaan | CEO challenge scope dan prioritas fitur |
| `/plan-eng-review` | Perencanaan | Arsitek lock technical architecture |
| `/plan-design-review` | Perencanaan | Designer audit UI/UX |
| `/autoplan` | Perencanaan | Jalankan ketiga plan review sekaligus |
| `/review` | Review | Code review — cari bugs sebelum merge |
| `/cso` | Review | Security audit (OWASP + STRIDE) |
| `/investigate` | Review | Debugging sistematis untuk bug misterius |
| `/qa` | Testing | Test pakai browser beneran, cari dan fix bugs |
| `/qa-only` | Testing | Test browser, report bugs saja (tidak fix) |
| `/ship` | Deploy | Sync, test, push, buka PR |
| `/land-and-deploy` | Deploy | Merge PR, deploy, verifikasi production |
| `/retro` | Refleksi | Sprint retrospective — apa yang berhasil, apa yang tidak |
| `/browse` / `$B` | Kapan saja | Browsing internet via browser headless |
| `/open-gstack-browser` | Kapan saja | Buka browser dengan sidebar Claude terintegrasi |
| `/setup-browser-cookies` | Kapan saja | Import cookies dari Chrome untuk test halaman login |
| `/careful` | Kapan saja | Minta konfirmasi sebelum command berbahaya |
| `/freeze` | Kapan saja | Batasi edit hanya ke satu direktori |
| `/guard` | Kapan saja | Kombinasi `/careful` + `/freeze` |
| `/document-release` | Setelah deploy | Update semua dokumentasi yang sudah stale |
| `/document-generate` | Kapan saja | Generate dokumentasi dari awal |
| `/codex` | Review | Second opinion dari OpenAI Codex |
| `/setup-gbrain` | Setup | Setup persistent memory untuk AI antar sesi |

---

## 6. Cara Kerja Sehari-hari

### Cara Pakai Skills BUBU (Paling Sering Dipakai)

Setelah setup selesai, cara kerja sehari-hari sangat sederhana:

1. Buka **Claude Code**
2. Pastikan workspace yang aktif adalah folder **BUBU**
3. Mulai ngobrol dengan Claude seperti biasa
4. Kalau mau bikin MOM, tinggal bilang: *"Tolong buatkan notulen dari catatan rapat ini: [paste catatan kamu]"*
5. Claude akan otomatis pakai skill yang tepat

### Upload File

Kalau mau attach file (PDF, Word, Excel, gambar, dll):
1. Attach file ke chat Claude Code seperti biasa
2. Claude secara otomatis akan convert dulu ke format yang bisa dibaca (via `/markitdown`)
3. Setelah itu baru dilanjutkan sesuai request kamu

---

## 7. Contoh Penggunaan Nyata

### Contoh 1: Bikin MOM Rapat

**Situasi:** Kamu baru selesai rapat kick-off dengan klien MyPertamina. Kamu punya catatan kasar di notepad.

**Yang kamu lakukan di Claude Code:**
> "Tolong buatkan Minutes of Meeting dari catatan berikut. Kliennya MyPertamina, rapatnya tadi 26 Juni 2026, dihadiri Bu Rina (Director BUBU), Pak Aryo dan Bu Siti dari MyPertamina.
>
> Catatan: Diskusi soal campaign Agustusan, brief: awareness + engagement, budget sekitar 500 juta, timeline 3 bulan, deliverables yang disepakati: 3 konten viral TikTok, 1 key visual, dan 1 activation. Next step: BUBU kirim proposal minggu depan."

**Apa yang terjadi:**
Claude akan menggunakan skill `/bubu-mom` secara otomatis, membaca context BUBU dari company overview, dan menghasilkan file MOM lengkap dengan format profesional BUBU — header oranye, logo, semua seksi (Executive Summary, Action Items, Next Steps, dll) — lalu menyimpannya di:
`Clients/MyPertamina/MOM/MyPertamina_MOM_KickoffMeeting_2026-06-26.pdf`

---

### Contoh 2: Bikin Surat Penawaran

**Situasi:** Perlu bikin surat penawaran untuk proyek brand strategy.

**Yang kamu lakukan:**
> "Bikin surat penawaran untuk klien PT Gojek Tokopedia. Jasa yang ditawarkan: Brand Strategy & Cultural Positioning, total nilai proyek Rp 350 juta, dengan breakdown: riset 2 minggu, strategy development 3 minggu, presentasi dan finalisasi 1 minggu."

**Hasilnya:**
File `.docx` surat penawaran resmi dengan branding BUBU, saved di `Clients/Internal/Documents/`.

---

### Contoh 3: Riset Brand Kompetitor

**Situasi:** Tim dapat brief untuk klien yang bersaing dengan brand X. Perlu quick intel.

**Yang kamu lakukan:**
> "Tolong riset brand Tokopedia — khususnya bagaimana positioning mereka, cultural relevance mereka di Indonesia, kampanye besar 3 tahun terakhir, dan apa yang bisa kita pelajari untuk klien kita yang bergerak di e-commerce juga."

**Hasilnya:**
Laporan riset mendalam dengan timeline brand, cultural positioning analysis, competitive benchmarking, dan "Bubu Match" assessment — saved di `Clients/Internal/Research/`.

---

### Contoh 4: Upload dan Proses File

**Situasi:** Klien kirim brief dalam format PDF.

**Yang kamu lakukan:**
- Attach file PDF ke chat
- Ketik: "Tolong baca brief ini dan buatkan summary + rekomendasi pendekatan kreatif dari BUBU"

**Apa yang terjadi:**
Claude otomatis convert PDF → Markdown dulu, lalu baca isinya, lalu tulis summary + rekomendasi.

---

### Contoh 5: Pakai gstack untuk Browse Internet

**Situasi:** Kamu mau Claude cari informasi terbaru tentang tren budaya pop Indonesia.

**Yang kamu lakukan:**
> "Cari informasi tentang tren budaya pop Indonesia 2026 — apa yang lagi viral, siapa influencer yang naik daun, dan apa cultural moment yang paling signifikan 6 bulan terakhir."

Claude akan pakai `/browse` dari gstack untuk browsing internet dan mengompilasi informasinya.

---

## 8. FAQ & Troubleshooting

### Q: Skills BUBU tidak muncul setelah install plugin?
**A:** Restart Claude Code. Kadang plugin butuh restart agar aktif.

---

### Q: Error "command not found: bun" saat setup?
**A:**
1. Tutup Terminal yang sekarang
2. Buka Terminal baru
3. Coba lagi `bun --version`

Kalau masih error, berarti instalasi Bun belum selesai. Coba install lagi:
```
curl -fsSL https://bun.sh/install | bash
```
Lalu tutup dan buka Terminal baru.

---

### Q: Bagaimana kalau ada update — skill baru ditambahkan ke workspace?
**A:** Buka Terminal, masuk ke folder BUBU, ketik:
```
git pull
```
Semua file terbaru akan ter-download. Kalau ada update di plugin, install ulang `bubu-toolkit.plugin` di Claude Code.

---

### Q: Output disimpan di mana?
**A:** Semua output ada di folder `Clients/` di dalam folder BUBU, diorganisir per nama klien:
```
Clients/
├── Internal/          (untuk kebutuhan internal BUBU)
│   ├── MOM/
│   └── Documents/
└── MyPertamina/       (untuk klien MyPertamina)
    ├── MOM/
    ├── Decks/
    ├── Documents/
    └── Research/
```

---

### Q: Saya tidak tahu harus pakai skill apa?
**A:** Tidak perlu tau! Cukup ceritakan apa yang kamu butuhkan dalam bahasa Indonesia biasa. Claude akan memilih skill yang tepat. Contoh:
- *"Buatkan notulen rapat tadi"* → Claude pakai `/bubu-mom`
- *"Bikin deck proposal untuk klien"* → Claude pakai `/bubu-presentation`
- *"Riset brand Shopee"* → Claude pakai `/bubu-market-research`

---

### Q: Apa bedanya gstack dengan BUBU Toolkit?
**A:**
- **BUBU Toolkit** = skill yang dibuat khusus untuk kebutuhan BUBU sehari-hari (MOM, surat, deck, riset brand)
- **gstack** = skill-skill teknis untuk pengembangan produk digital (review kode, QA, deploy, browsing)

Kebanyakan tim BUBU yang non-technical akan lebih banyak pakai BUBU Toolkit. gstack lebih relevan untuk tim yang handle produk digital seperti bubu.com.

---

### Q: Berapa biayanya?
**A:** gstack gratis (open source). Yang berbayar adalah penggunaan Claude API — tapi itu sudah dihandle sebagai bagian dari subscription BUBU ke Claude Code. Tidak ada biaya tambahan untuk anggota tim.

---

### Q: Apakah data saya aman?
**A:** Ya. Semua file diproses secara lokal di komputer kamu, dan hanya teks yang dikirim ke Claude untuk diproses. File tidak tersimpan di server eksternal mana pun (kecuali Google Drive kalau kamu menggunakan integrasi tersebut secara eksplisit).

---

## Selamat! Setup Selesai.

Kamu sekarang punya akses ke semua tools BUBU:
- ✅ Claude Code terinstall
- ✅ BUBU Workspace ter-clone
- ✅ gstack aktif dan auto-update
- ✅ BUBU Toolkit (5 skills) terinstall

**Langkah pertama yang direkomendasikan:** coba bikin MOM dari catatan rapat terakhir kamu. Paste catatan kasar, lihat hasilnya.

---

**Butuh bantuan?** Hubungi siapa pun di tim yang sudah familiar dengan setup ini, atau tanyakan langsung ke Claude — dia bisa bantu troubleshoot juga.

---

**BUBU Cultural Intelligence Agency**
Jakarta, Indonesia
*It's not about visibility. It's about relevance.*
