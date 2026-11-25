---
title: Pasar prediksi
lang: id
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Berdagang pada hasil dari kejadian di masa depan"
  - "Harga berfungsi sebagai perkiraan publik secara langsung tentang seberapa besar kemungkinan sesuatu terjadi"
buttons:
  - content: Pelajari lebih lanjut
    toId: how-prediction-markets-work
  - content: Jelajahi aplikasi
    toId: find-a-prediction-market
    isSecondary: false
---

Pasar prediksi memungkinkan orang membeli dan menjual saham pada hasil dari kejadian di masa depan. Harga saham menunjukkan seberapa besar kemungkinan hasil tersebut menurut pasar secara keseluruhan. Pasar ini menarik perhatian luas selama pemilihan umum AS tahun 2024.

## Cara kerja pasar prediksi {#how-prediction-markets-work}

Setiap pasar mengajukan pertanyaan dengan jawaban yang jelas, seperti "Apakah besok akan hujan di Lisbon?". Saham **Ya** membayar $1 jika jawabannya ternyata ya dan tidak membayar apa pun jika tidak. Saham **Tidak** bekerja sebaliknya.

Jika saham Ya diperdagangkan pada 67 sen, pasar mengatakan ada sekitar 67% kemungkinan hujan. Siapa pun yang berpikir kemungkinan sebenarnya berbeda dapat membeli atau menjual, dan hal itu menggerakkan harga. Karena orang yang tahu lebih banyak memiliki alasan untuk berdagang, informasi baru cenderung muncul dalam harga dengan cepat. Itulah sebabnya pasar prediksi dapat menjadi prakiraan yang berguna. Meskipun tidak sempurna.

Setiap saham yang menang dibayar oleh seseorang yang memegang sisi yang kalah. Pasar prediksi bersifat **zero-sum**: selain biaya, apa yang didapat pemenang, adalah apa yang hilang dari pihak yang kalah.

## Mengapa ini penting? {#why-does-this-matter}

Pasar prediksi berbasis rantai blok menambahkan beberapa hal yang tidak dimiliki situs taruhan dan bursa tradisional:

<Grid>
  <Card title="Data terbuka" emoji="🔍" description="Setiap perdagangan dicatat secara onchain, sehingga siapa pun dapat memeriksa harga, volume, dan siapa yang menang atau kalah."/>
  <Card title="Penyelesaian onchain" emoji="🌎" description="Posisi adalah token di dompet Anda sendiri, dan kontrak pintar membayarkan saham yang menang setelah hasilnya dilaporkan." />
  <Card title="Peluang yang didorong pasar" emoji="🤝" description="Harga ditetapkan oleh pedagang yang membeli dan menjual saham hasil, bukan ditetapkan sebelumnya oleh bandar taruhan terpusat." />
</Grid>

Data terbuka penting dalam praktiknya. Para peneliti dapat [mempelajari setiap perdagangan di Polymarket](https://cepr.org/publications/dp21615), yang mencakup lebih dari 2,4 juta pengguna dari November 2022 hingga Maret 2026, karena perdagangannya diselesaikan di rantai blok publik. Pemeriksaan independen semacam itu tidak mungkin dilakukan pada platform terpusat seperti Kalshi, di mana perdagangan dan pembayaran terjadi di sistem perusahaan itu sendiri. Tidak ada catatan publik untuk diaudit, dan tidak ada kontrak pintar yang menjamin bahwa posisi yang menang akan dibayar.

Berikut adalah cara pasar berjalan dari awal hingga akhir:

1. Sebuah pasar dibuat seputar pertanyaan dengan aturan yang jelas tentang bagaimana hal itu akan diputuskan.
2. Pedagang membeli dan menjual saham Ya dan Tidak, dan harga bergerak seiring dengan tindakan mereka.
3. Setelah kejadian tersebut terjadi, sebuah [orakel](/developers/docs/oracles/) melaporkan hasilnya secara onchain. Di Polymarket, siapa pun dapat mengusulkan hasil dengan memberikan deposit, dan siapa pun dapat menyengketakannya. Jika sengketa tidak diselesaikan, pemegang token UMA akan memilih hasilnya.
4. Setiap saham yang menang dapat ditukarkan dengan $1. Saham yang kalah tidak bernilai apa-apa.
5. Siapa pun dapat menggunakan riwayat harga dan data perdagangan untuk penelitian atau diskusi.

## Temukan pasar prediksi {#find-a-prediction-market}

Pasar prediksi ini menyelesaikan perdagangan secara onchain, sehingga siapa pun dapat memeriksa harga dan riwayat perdagangan:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Tetap waspada terhadap risiko</strong></p>
  <p className="mt-2">Sebagian besar orang yang berdagang di pasar prediksi kehilangan uang. Hanya perdagangkan apa yang Anda mampu untuk kehilangannya, dan waspadai potensi perilaku adiktif.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Tantangan & Risiko {#challenges-and-risks}

Pasar prediksi menghadapi tantangan nyata yang memengaruhi keadilan, legalitas, dan akurasi.

📉 **Sebagian besar pedagang kalah** – Sebuah [studi tentang setiap perdagangan Polymarket](https://cepr.org/publications/dp21615) dari November 2022 hingga Maret 2026 menemukan bahwa sekitar 69% pengguna berakhir dengan kerugian. Di antara pengguna yang menghasilkan uang, 1% teratas mengambil 76,5% dari keuntungan. Pemenang terbesar sebagian besar adalah pedagang yang menyediakan likuiditas dengan pesanan batas (limit order), sering kali secara profesional dan dalam volume tinggi.

🕵️ **Perdagangan orang dalam (Insider trading)** – Orang yang mengetahui hasil sebelumnya dapat mengambil keuntungan dengan mengorbankan pedagang lain. [Peneliti di Columbia Law School dan University of Haifa](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778) memperkirakan bahwa pedagang yang dicurigai memiliki informasi orang dalam menghasilkan sekitar $143 juta di Polymarket antara Februari 2024 dan Februari 2026.

⚖️ **Hasil yang disengketakan** – Kontrak pintar dapat membayar secara otomatis, tetapi seseorang tetap harus melaporkan apa yang terjadi. Ketika sebuah pertanyaan dirumuskan secara longgar atau faktanya tidak jelas, hasil yang dilaporkan dapat disengketakan.

⚠️ **Manipulasi pasar** – Pedagang dengan banyak uang dapat menggerakkan harga, terutama di pasar kecil. Wash trading (berdagang dengan diri sendiri) dapat membuat pasar terlihat lebih sibuk daripada yang sebenarnya.

💧 **Masalah likuiditas** – Partisipasi yang rendah ([likuiditas tipis](https://www.investopedia.com/terms/t/thinmarket.asp)) dapat membuat harga menjadi kurang dapat diandalkan.

🏛 **Ketidakpastian regulasi** – Aturan berbeda di setiap negara dan berubah dengan cepat. Di AS, regulator dan pengadilan masih memutuskan apakah beberapa kontrak kejadian, terutama pada olahraga, dihitung sebagai produk keuangan atau perjudian. Banyak platform memblokir pengguna di negara-negara tertentu.

## Bereksperimen dengan pasar prediksi {#experimenting-with-prediction-markets}

Pasar prediksi dapat berguna lebih dari sekadar berdagang untuk mendapatkan keuntungan. Salah satu ide, yang disebut futarki (futarchy), melangkah lebih jauh dan menggunakan pasar untuk membantu membuat keputusan, bukan hanya memprakirakannya.

Sebagai contoh, sebuah [Proposal Peningkatan Devcon](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) menyarankan agar penyelenggara Devcon menggunakan pasar prediksi untuk memprakirakan kehadiran di kemungkinan lokasi masa depan. Hal ini dapat membantu mereka menimbang kota mana yang akan menarik kejadian terbesar dibandingkan dengan kota mana yang paling mudah diakses secara internasional. Hal ini juga dapat menghemat waktu yang dihabiskan untuk membandingkan kebijakan visa, akses bandara, dan biaya hidup, sekaligus menunjukkan ke mana calon peserta akan bersemangat untuk pergi.

## Bacaan lebih lanjut {#further-reading}

[Dari pasar prediksi ke keuangan info](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[Siapa yang menang dan siapa yang kalah di pasar prediksi? Bukti dari Polymarket](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie, dan Martineau  
[Buku Putih Proyek Augur](https://github.com/AugurProject/whitepaper)
