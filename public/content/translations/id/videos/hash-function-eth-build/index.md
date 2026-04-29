---
title: "Fungsi hash — ETH.BUILD"
description: "Demonstrasi fungsi hash kriptografi menggunakan alat edukasi ETH.BUILD. Pelajari cara kerja fungsi hash dan mengapa fungsi ini mendasar bagi model integritas data dan akun Ethereum."
lang: id
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "akun"
  - "kriptografi"
format: tutorial
author: Austin Griffith
breadcrumb: "Fungsi Hash (ETH.BUILD)"
---

Sebuah tutorial oleh **Austin Griffith** yang mendemonstrasikan cara kerja fungsi hash kriptografi menggunakan alat pemrograman visual ETH.BUILD, mencakup determinisme, keluaran dengan panjang tetap, properti satu arah, dan pohon Merkle.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=QJ010l-pBpE) yang dipublikasikan oleh Austin Griffith. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

### Pengantar fungsi hash (0:00) {#introduction-to-hash-functions-000}

Ini adalah video pertama dari seri yang disebut ETH.BUILD. Anda dapat mengunjungi eth.build untuk menggunakan alat ini, tetapi ini hanya untuk bermain-main dan mendapatkan gambaran tentang cara kerja berbagai hal saat membangun di Ethereum.

Modul pertama yang akan kita lihat adalah fungsi hash. Apa sebenarnya fungsi hash itu? Yah, ini agak mirip dengan sidik jari. Anda memiliki sebuah masukan — bisa apa saja — tetapi untuk saat ini kita akan menggunakan teks "hello world." Di sisi lain Anda akan memiliki sebuah keluaran, dan keluaran itu adalah string heksadesimal 64 karakter. Dikatakan 66 karakter karena awalan "0x", tetapi sebenarnya itu adalah string hex 64 karakter.

### Memvisualisasikan hash sebagai warna (0:50) {#visualizing-hashes-as-colors-050}

Jika Anda melihat hex, itu agak terlihat seperti warna, dan mungkin lebih mudah untuk menggambarkan apa yang kita lihat di sini jika kita menjadikannya warna. Jadi yang akan kita lakukan adalah mengambil enam karakter pertama dari string apa pun itu dan menampilkannya sebagai warna. Jika kita melihatnya, kita melihat warna ungu yang bagus.

Mari kita lihat apa warna nama saya — nah, hijau hutan yang bagus. Sekarang mari kita kembali ke "hello world" — warnanya ungu lagi.

### Determinisme dan keluaran dengan panjang tetap (1:38) {#determinism-and-fixed-length-output-138}

Apa yang baru saja kita temukan adalah bahwa ini bersifat deterministik. Pada dasarnya, apa pun yang kita masukkan sebagai masukan kita, kita akan selalu mendapatkan hal yang sama di sisi lain.

Properti kedua adalah Anda dapat memasukkan apa pun dengan ukuran sembarang. Saya dapat menekan keyboard secara acak dan melihat warnanya berubah, tetapi string tersebut tetap pada panjang 66 karakter. Tidak peduli apa yang Anda masukkan ke sini — bahkan sebuah file — saya dapat memasukkan file Leo, anak saya, dan memasukkannya sebagai hash dan mendapatkan warna oranye yang bagus. Kemudian saya dapat memasukkan dokumen teks daftar kata BIP dan warnanya biru muda yang bagus ini. Jika saya membawa Leo kembali, tebak apa warnanya? Kita tahu warnanya akan menjadi oranye itu. Anda mendapatkan sidik jari deterministik dari hal yang Anda masukkan.

### Properti satu arah (2:37) {#one-directional-property-237}

Properti terpenting berikutnya adalah bahwa ini bersifat satu arah. Jika saya memasukkan "hello world" lagi, kita akan mendapatkan hash "4717" ini. Jika kita mengambil hash tersebut dan mengirimkannya kepada seseorang dan berkata "ini adalah hash dari rahasia saya — jika Anda bisa menebak rahasia saya, saya akan memberi Anda seratus dolar," mereka tidak akan bisa menebaknya.

Katakanlah hash dimulai dengan "4717" dan mereka mulai mengutak-atik mencoba menemukan kecocokan. Anda tidak bisa hanya mengubah sedikit karakter dan menjadi dekat — Anda bisa menebaknya atau tidak sama sekali. Anda pada dasarnya harus menebaknya dengan paksa (brute-force). Jika mereka kebetulan menebak "hello world," mereka akan mendapatkan jawabannya, tetapi jika mereka tidak menebaknya, mereka tidak akan pernah mendapatkannya. Tidak ada cara untuk mengetahui apakah Anda semakin dekat.

Anda akan menemukan dengan kriptografi bahwa terkadang hal itu membuat frustrasi sebagai pengembang karena itu berhasil atau tidak — Anda tidak mendapatkan petunjuk apa pun tentang apakah Anda semakin dekat. Tapi itu hal yang baik. Itulah properti yang kita inginkan dari sebuah fungsi hash.

### Ringkasan properti fungsi hash (3:43) {#summary-of-hash-function-properties-343}

Jadi kita punya: apa pun dengan ukuran berapa pun dapat dimasukkan ke dalam fungsi hash, dan itu akan mengeluarkan sidik jari heksadesimal 64 karakter yang tepat dari data tersebut. Ini bersifat deterministik. Ini satu arah — Anda tidak bisa kembali ke arah sebaliknya. Sangat mudah untuk membuat hash, tetapi sangat sulit untuk menebak rahasia dari hash tersebut.

### Pohon Merkle dan menggabungkan hash (4:06) {#merkle-trees-and-combining-hashes-406}

Apa yang bisa kita lakukan dengan ini adalah beberapa hal yang sangat rapi, seperti pohon Merkle. Kita memiliki tiga masukan kita, dan kita bisa menggabungkannya. Kita dapat menggabungkan semua hash tersebut dan kemudian menge-hash kombinasinya.

Warna di sini — ungu itu — mewakili hash dari semua hash ini. Jika saya mengubah "hello world" menjadi "hello world one," ungu itu akan berubah. Setiap perubahan kecil pada salah satu masukan ini akan menyebabkan hash akhir berubah. Anda dapat memasukkan segala macam data dengan berbagai cara yang berbeda — bahkan memiliki pohon hash, sebuah pohon Merkle — atau memiliki sekumpulan blok berturut-turut, dan hash akhir ini akan didasarkan pada semua hal ini. Jika ada hal kecil yang berubah di mana saja di sepanjang jalan, hash akhir akan berubah.

### Poin penting (5:53) {#key-takeaway-553}

Poin pentingnya adalah bahwa fungsi hash pada dasarnya seperti sidik jari. Jika saya mengetikkan sesuatu, itu akan secara deterministik memberi saya keluaran yang saya harapkan. Itulah fungsi hash — selamat datang di ETH.BUILD. Mari kita buat beberapa hal keren dan belajar banyak di sepanjang jalan.