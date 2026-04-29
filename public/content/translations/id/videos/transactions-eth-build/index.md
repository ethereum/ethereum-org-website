---
title: "Transaksi — ETH.BUILD"
description: "Demonstrasi tentang cara kerja transaksi Ethereum menggunakan alat edukasi ETH.BUILD. Lihat bagaimana transaksi dibuat, ditandatangani, dan dikirim di jaringan Ethereum."
lang: id
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "transaksi"
format: tutorial
author: Austin Griffith
breadcrumb: "Transaksi (ETH.BUILD)"
---

Sebuah tutorial oleh **Austin Griffith** yang mendemonstrasikan cara kerja transaksi Ethereum menggunakan alat pemrograman visual ETH.BUILD — mencakup struktur transaksi, harga gas, penandatanganan, penyiaran, dan pool transaksi.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=er-0ihqFQB0) yang dipublikasikan oleh Austin Griffith. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Biaya transaksi dan insentif penambang (0:00) {#transaction-fees-and-miner-incentives-000}

Di ETH.BUILD hari ini kita akan berbicara tentang transaksi. Sampai saat ini, kita telah melihat transaksi-transaksi ini ditambang ke dalam blok, dikemas dalam blok, dan ditambang ke dalam rantai. Kita ingin berbicara tentang apa yang memberi insentif kepada penambang — selain imbalan blok — untuk menarik transaksi kita keluar dari pool dan memasukkannya ke dalam blok serta menambangnya ke dalam rantai, dibandingkan dengan orang lain di dalam pool. Bisa jadi ada ribuan orang di dalam pool yang semuanya semacam melakukan penawaran, dan penawaran itu dilakukan dengan biaya ini.

Saya bisa memiliki biaya dalam transaksi saya yang mengatakan "Saya Alice dan saya mengirim lima ke Bob, dan nonce saya adalah satu untuk perlindungan pemutaran ulang (replay protection)." Selain itu, siapa pun yang menambang ini dapat mengambil biaya tersebut untuk diri mereka sendiri. Pada dasarnya, Alice mengirim lima ke Bob tetapi juga membayar penambang sejumlah uang untuk memasukkannya ke dalam rantai.

#### Anatomi transaksi Ethereum (1:10) {#anatomy-of-an-ethereum-transaction-110}

Seperti apa bentuk transaksi di Ethereum? Kita tidak akan memiliki "Bob" dan "Alice" lagi — kita akan memiliki alamat. Nilainya akan dalam Wei, bukan dalam ETH. Dan biayanya juga akan dalam Wei.

Mari kita mulai dan melihat transaksi ini. Saya memiliki akun dengan mnemonik yang dimasukkan, dan saya terhubung ke Mainnet Ethereum. Saya juga menjalankan modul untuk mendapatkan data harga dari CoinMarketCap, sehingga saya dapat melihat bahwa nol koma satu sekian ETH bernilai sekitar dua puluh tiga dolar.

#### Menyiapkan transaksi (2:25) {#setting-up-the-transaction-225}

Apa yang akan saya lakukan adalah membuat transaksi dan memberi insentif kepada penambang untuk mengambilnya dan memasukkannya ke onchain. Saya punya dua karakter — Alice dan Bob. Alice akan mengirimkan sejumlah nilai kepada Bob menggunakan kunci privat miliknya. Tidak ada kolom alamat "dari" (from) di sini karena — ingat — kita menandatangani dan memulihkan dengan pasangan kunci kita. Transaksi dikemas, ditandatangani, dan kemudian dikirim melintasi jaringan. Tidak ada yang bisa merusaknya, dan di sisi lain seseorang dapat memulihkannya dan menemukan bahwa memang kitalah yang menandatanganinya. Alamat "dari" tersebut diturunkan (derived).

#### Strategi harga gas (4:20) {#gas-price-strategy-420}

Harga gas diatur ke sekitar 4,1 Gwei secara bawaan — itu adalah 4,1 miliar Wei. Tetapi kita ingin lebih strategis tentang hal itu dan melihat apa yang sedang terjadi onchain saat ini. Kita dapat melihat bahwa blok terakhir memiliki 78 transaksi, dan harga gas berkisar dari sekitar 5 turun ke batas minimum tertentu. Pada dasarnya, kita harus berada di atas 5 agar dapat ditambang ke dalam blok tersebut. Jadi mari kita atur harga gas ke 5,001 — hanya sedikit lebih tinggi.

#### Mengonversi ke Wei (5:20) {#converting-to-wei-520}

Kita perlu melakukan konversi ke Wei. Di Ethereum, Anda terutama berurusan dengan dua denominasi: ETH, yang biasanya dibicarakan orang, dan kemudian Wei, yang merupakan pecahan ETH yang sangat kecil. Gwei — yang kita gunakan untuk harga gas — berada di antaranya. Alasan untuk ini mirip dengan mengapa kita tidak berjalan-jalan berbicara dalam pecahan sen.

Alice memiliki 0,18 ETH, dan kita akan mengirim 0,05 ETH ke Bob. Kita memasukkan harga gas sebesar 5 Gwei.

#### Penandatanganan dan penyiaran (7:02) {#signing-and-broadcasting-702}

Ketika Alice memilih untuk menandatangani transaksi, itu meluncur sebagai transaksi yang ditandatangani yang dapat melintasi jaringan. Tidak ada yang bisa mengutak-atiknya — di sisi lain, seseorang dapat menyimpulkan bahwa Alice-lah yang menandatanganinya, dan itu berisi semua informasi tentang kepada siapa kita ingin mengirim dan gas yang masuk ke penambang.

Kita mengambil transaksi yang ditandatangani itu dan memasukkannya ke dalam fungsi kirim modul rantai blok. Ketika saya mengklik kirim, itu memberi kita sebuah hash — hash transaksi. Pada dasarnya, saya mengirimkannya ke jaringan terdistribusi dan mereka memberi saya kembali sebuah hash transaksi. Itu keluar di jaringan, dan kemudian ada pool transaksi ini — orang-orang semuanya menawar agar transaksi mereka berhasil.

#### Memeriksa blok (8:41) {#checking-the-block-841}

Kita dapat meminta (query) rantai blok untuk transaksi kita. Benar saja, itu sudah ditambang. Kita dapat melihat blok tersebut, mengurutkan berdasarkan harga gas, dan menemukan transaksi kita. Ada transaksi kita pada harga gas 5,001 — Alice mengirim ke Bob, tanpa data tambahan. Kita ada di sana, sekitar empat atau lima posisi dari bawah.

#### Mengirim data dengan transaksi (9:54) {#sending-data-with-a-transaction-954}

Kita dapat mengirim nilai dan menawar agar transaksi kita dikenali onchain. Tapi mari kita lihat satu hal lagi — kolom data. Kita dapat mengirim sesuatu bersama dengan transaksi kita. Itu akan berada dalam bentuk heksadesimal. Alice akan mengirim enam dolar lagi ke Bob, dan kita akan melampirkan pesan: "hey Bob." Kita dapat melihat "hey Bob" dikonversi menjadi hex.

Kita menandatangani transaksi itu, mengirimkannya ke penambang, itu masuk ke jaringan, dan kita mendapatkan hash kembali. Kita mengawasinya agar ditambang, dan itu terjadi. Ketika kita memeriksa blok itu, kita dapat melihat transaksi kita dengan data yang terlampir.

#### Pool transaksi dan peningkatan gas (12:43) {#transaction-pool-and-gas-bumping-1243}

Untuk demonstrasi terakhir, saya memasukkan transaksi ke dalam pool dengan harga gas yang sangat rendah — sekitar 1,001 Gwei. Transaksi itu diam di sana belum ditambang karena kita tidak cukup memberi insentif kepada para penambang. Kita dapat melihat transaksi tersebut tertunda di dalam pool transaksi. Pool tersebut memiliki antara satu hingga tiga ratus transaksi, tetapi blok terbaru yang ditambang menunjukkan harga gas terkecil adalah sekitar 5.

Jadi kita perlu mengirim ulang transaksi ini — mari kita naikkan menjadi 10. Itu jauh lebih banyak dari yang dibutuhkan, tetapi kita akan mengirim ulang transaksi yang sama dengan nonce yang sama tetapi harga gas yang lebih tinggi. Jaringan mengatakan "orang yang sama, transaksi yang sama, bersedia membayar lebih." Transaksi itu diambil dan ditambang ke dalam blok berikutnya.

#### Ringkasan (14:52) {#summary-1452}

Kita mengirim transaksi, kita membayar sejumlah gas untuk memberi insentif kepada penambang agar memasukkannya ke dalam rantai blok. Kita juga mengirim data bersama dengan transaksi — ada berbagai macam hal yang sangat keren yang dapat kita lakukan sekarang karena kita memiliki data panggilan (call data) ini, dan kita akan membahas kontrak pintar (smart contracts) dan banyak hal menyenangkan nanti.