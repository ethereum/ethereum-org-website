---
title: Agen AI
metaTitle: Agen AI | Agen AI di Ethereum
description: Gambaran umum tentang agen AI di Ethereum
lang: id
template: use-cases
emoji: ":robot:"
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Orang-orang berkumpul di meja terminal
summaryPoint1: AI yang berinteraksi dengan blockchain dan berdagang secara mandiri
summaryPoint2: Mengontrol dompet dan dana onchain
summaryPoint3: Mempekerjakan manusia atau agen lain untuk bekerja
buttons:
  - content: Apa itu agen AI?
    toId: what-are-ai-agents
  - content: Jelajahi agen
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Bayangkan menavigasi Ethereum dengan asisten AI yang mempelajari tren pasar onchain 24/7, menjawab pertanyaan, dan bahkan mengeksekusi transaksi atas nama Anda. Selamat datang di dunia Agen AI—sistem cerdas yang dirancang untuk menyederhanakan kehidupan digital Anda.

Di Ethereum, kita melihat inovasi agen AI mulai dari pemengaruh (influencer) virtual dan pembuat konten otonom hingga platform analisis pasar waktu nyata (real-time), yang memberdayakan pengguna dengan memberikan wawasan, hiburan, dan efisiensi operasional.

## Apa itu agen AI? {#what-are-ai-agents}

Agen AI adalah program perangkat lunak yang menggunakan kecerdasan buatan untuk melakukan tugas atau membuat keputusan sendiri. Mereka belajar dari data, beradaptasi dengan perubahan, dan menangani tugas-tugas kompleks. Mereka beroperasi tanpa henti dan dapat mendeteksi peluang secara instan.

### Bagaimana agen AI bekerja dengan blockchain {#how-ai-agents-work-with-blockchains}

Dalam keuangan tradisional, agen AI sering beroperasi di lingkungan terpusat dengan input data yang terbatas. Hal ini menghambat kemampuan mereka untuk belajar atau mengelola aset secara otonom.

Sebaliknya, ekosistem desentralisasi Ethereum menawarkan beberapa keuntungan utama:

- <strong>Data transparan:</strong> Akses ke informasi blockchain waktu nyata.
- <strong>Kepemilikan aset sejati:</strong> Aset digital sepenuhnya dimiliki oleh agen AI.
- <strong>Fungsionalitas onchain yang kuat:</strong> Memungkinkan Agen AI untuk mengeksekusi transaksi, berinteraksi dengan kontrak pintar, menyediakan likuiditas, dan berkolaborasi lintas protokol.

Faktor-faktor ini mengubah agen AI dari sekadar bot sederhana menjadi sistem dinamis yang dapat meningkatkan kemampuannya sendiri, yang menawarkan nilai signifikan di berbagai sektor:

<CardGrid>
  <Card title="DeFi Otomatis" emoji=":money_with_wings:" description="Agen AI terus mengawasi tren pasar, mengeksekusi perdagangan, dan mengelola portofolio — membuat dunia DeFi yang kompleks menjadi jauh lebih mudah didekati."/>
  <Card title="Ekonomi agen AI baru" emoji="🌎" description="Agen AI dapat mempekerjakan agen lain (atau manusia) dengan keterampilan berbeda untuk melakukan tugas khusus bagi mereka." />
  <Card title="Manajemen risiko" emoji="🛠️" description="Dengan memantau aktivitas transaksional, agen AI dapat membantu mendeteksi penipuan dan melindungi aset digital Anda dengan lebih baik dan lebih cepat." />
</CardGrid>

## AI yang dapat diverifikasi {#verifiable-ai}

Agen AI yang berjalan offchain sering kali berperilaku seperti "kotak hitam"—penalaran, input, dan output mereka tidak dapat diverifikasi secara independen. Ethereum mengubah hal tersebut. Dengan menambatkan perilaku agen secara onchain, pengembang dapat membangun agen yang _trustless_ (tanpa perlu kepercayaan), _transparan_, dan _otonom secara ekonomi_. Tindakan agen semacam itu dapat diaudit, dibatasi, dan dibuktikan.

### Inferensi yang dapat diverifikasi {#verifiable-inference}

Inferensi AI secara tradisional terjadi secara offchain, di mana eksekusi murah tetapi eksekusi model tidak transparan. Di Ethereum, pengembang dapat memasangkan agen dengan komputasi yang dapat diverifikasi menggunakan beberapa teknik:

- [**zkML (zero-knowledge machine learning)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) memungkinkan agen membuktikan bahwa suatu model dieksekusi dengan benar tanpa mengungkapkan model atau inputnya
- [**Pengesahan TEE (trusted execution environment)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) memungkinkan bukti yang didukung perangkat keras bahwa agen menjalankan model atau jalur kode tertentu
- **Sifat tetap onchain** memastikan bukti dan pengesahan ini dapat dirujuk, diputar ulang, dan dipercaya oleh kontrak atau agen mana pun

## Pembayaran, dan perdagangan dengan x402 {#x402}

[Protokol x402](https://www.x402.org/), yang diterapkan di Ethereum dan layer 2, memberi agen cara asli untuk membayar sumber daya dan berinteraksi secara ekonomi tanpa campur tangan manusia. Agen dapat:

- Membayar komputasi, data, dan panggilan API menggunakan stablecoin
- Meminta atau memverifikasi pengesahan dari agen atau layanan lain
- Berpartisipasi dalam perdagangan antar-agen, membeli dan menjual komputasi, data, atau output model

x402 mengubah Ethereum menjadi lapisan ekonomi yang dapat diprogram untuk agen otonom, memungkinkan interaksi bayar-per-penggunaan alih-alih akun, langganan, atau penagihan terpusat.

### Keamanan keuangan agen {#agentic-finance-security}

Agen otonom membutuhkan pagar pembatas. Ethereum menyediakannya di tingkat dompet dan kontrak:

- [Akun pintar (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) memungkinkan pengembang menerapkan batas pengeluaran, daftar putih (whitelist), kunci sesi, dan izin terperinci
- Batasan yang diprogram dalam kontrak pintar dapat membatasi apa yang diizinkan untuk dilakukan oleh agen
- Batasan berbasis inferensi (misalnya, memerlukan bukti zkML sebelum mengeksekusi tindakan berisiko tinggi) menambahkan lapisan keamanan lain

Kontrol ini memungkinkan penerapan agen otonom yang tidak tak terbatas.

### Registri onchain: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) mendefinisikan registri onchain untuk identitas, reputasi, dan validasi agen. Ditulis bersama oleh kontributor dari MetaMask, Ethereum Foundation, Google, dan Coinbase, ini diterapkan di 16 jaringan termasuk mainnet Ethereum, Base, Polygon, Arbitrum, dan lainnya.

Ini menyediakan:

- Sebuah **registri identitas** untuk pengidentifikasi agen yang portabel dan tahan sensor
- Sebuah **registri reputasi** untuk sinyal umpan balik standar di seluruh aplikasi
- Sebuah **registri validasi** untuk meminta verifikasi independen (zkML, TEE, eksekusi ulang yang di-stake)

ERC-8004 memudahkan agen untuk menemukan, memverifikasi, dan bertransaksi satu sama lain dalam lingkungan yang sepenuhnya terdesentralisasi.

## Agen AI di Ethereum {#ai-agents-on-ethereum}

Kita mulai mengeksplorasi potensi penuh dari agen AI, dan proyek-proyek sudah memanfaatkan sinergi antara AI dan blockchain—terutama dalam transparansi dan monetisasi.

<AiAgentProductLists list="ai-agents" />

<strong>Penampilan pertama Luna sebagai tamu podcast</strong>

<YouTube id="ZCsOMxnIruA" />

## Dompet yang dikendalikan agen {#agent-controlled-wallets}

Agen seperti Luna atau AIXBT mengontrol dompet onchain mereka sendiri ([Dompet AIXBT](https://clusters.xyz/aixbt), [Dompet Luna](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)) yang memungkinkan mereka memberikan tip kepada penggemar dan berpartisipasi dalam aktivitas ekonomi.

Selama kampanye sosial X Luna #LunaMuralChallenge, Luna memilih dan memberi hadiah kepada para pemenang melalui dompet Base-nya — menandai <strong>contoh pertama dari AI yang mempekerjakan manusia untuk hadiah kripto</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Senang mengetahuinya</strong></p>
<p className="mt-2">Agen AI dan alat terkait masih dalam tahap awal pengembangan dan sangat eksperimental—gunakan dengan hati-hati.</p>
</AlertContent>
</Alert>

## Kontrol dompet Anda menggunakan perintah obrolan {#control-your-wallet-using-chat-commands}

Anda dapat melewati antarmuka DeFi yang rumit dan mengelola kripto Anda dengan perintah obrolan sederhana.

Pendekatan intuitif ini membuat transaksi lebih cepat, lebih mudah, dan tidak rentan terhadap kesalahan seperti mengirim dana ke alamat yang salah atau membayar biaya terlalu mahal.

<AiAgentProductLists list="chat" />

## Agen AI vs bot AI {#ai-agents-vs-ai-bots}

Perbedaan antara agen AI dan bot AI terkadang bisa membingungkan, karena keduanya melakukan tindakan otomatis berdasarkan input.

- Bot AI seperti asisten otomatis — Mereka mengikuti instruksi spesifik yang telah diprogram sebelumnya untuk melakukan tugas rutin.
- Agen AI lebih seperti pendamping cerdas — Mereka belajar dari pengalaman, beradaptasi dengan informasi baru, dan membuat keputusan sendiri.

|                     | Agen AI                                                              | Bot AI                                     |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Interaksi**    | Kompleks, dapat beradaptasi, otonom                                         | Sederhana, ruang lingkup yang telah ditentukan, di-hardcode        |
| **Pembelajaran**        | Belajar terus-menerus, dapat bereksperimen dan beradaptasi dengan data baru secara waktu nyata | Beroperasi pada data yang telah dilatih sebelumnya atau aturan tetap |
| **Penyelesaian tugas** | Bertujuan untuk mencapai tujuan yang lebih luas                                     | Hanya berfokus pada tugas-tugas tertentu              |

## Pelajari lebih dalam {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Anda dapat membangun agen AI Anda sendiri {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />