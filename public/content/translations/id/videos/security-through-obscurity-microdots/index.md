---
title: "Keamanan melalui ketidakjelasan: menggunakan microdot untuk menyimpan rahasia"
description: "Menyajikan pendekatan tidak konvensional untuk penyimpanan kunci menggunakan teknologi microdot fisik, menyamarkan frasa benih dalam gambar cetak yang tidak terlihat oleh mata telanjang."
lang: id
youtubeId: "k9Dfg19JPEw"
uploadDate: 2024-11-15
duration: "0:09:55"
educationLevel: intermediate
topic:
  - "privasi-dan-keamanan"
  - "privasi"
  - "autentikasi"
format: presentation
author: Ethereum Foundation
breadcrumb: "Keamanan Microdot"
---

Sebuah presentasi singkat (lightning talk) oleh **jseam** di Devcon SEA yang mengeksplorasi pendekatan tidak konvensional untuk penyimpanan kunci menggunakan teknologi microdot fisik, yang secara historis digunakan dalam spionase untuk menyamarkan frasa benih dalam gambar cetak yang hampir tidak terlihat oleh mata telanjang.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=k9Dfg19JPEw) yang diterbitkan oleh Yayasan Ethereum. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

#### Mengapa microdot? (0:00) {#why-microdots-000}

Halo semuanya, selamat datang di Thailand. Untuk presentasi saya, saya akan berbicara tentang microdot — apa sebenarnya itu, mengapa Anda menginginkannya, dan bagaimana Anda bisa membuatnya. Saya punya beberapa sampel, jadi setelah presentasi ini Anda bisa melihatnya.

Ada banyak pertanyaan tentang OpSec (Keamanan Operasional) dan bagaimana Anda bisa menyembunyikan frasa benih. Banyak proses yang ada saat ini semuanya digital. Tapi bagaimana jika ada proses fisik? Bagaimana jika Anda bisa menyamarkan sesuatu? Penyimpanan kunci tetap menjadi masalah besar. Kita memiliki pembagian rahasia (secret sharing), pemulihan sosial — tetapi saya tahu banyak orang kripto agak asosial, jadi pemulihan sosial mungkin sulit dilakukan.

Lihat grafik ini: kita sedang mengalami epidemi kesepian saat ini. Jadi penyimpanan kunci dan pemulihan sosial akan menjadi masalah besar. Bagaimana jika ada pendekatan fisik untuk menyamarkan informasi?

#### Sejarah steganografi microdot (2:00) {#the-history-of-microdot-steganography-200}

Ini adalah teknik steganografi yang disebut microdot. Alasan saya menunjukkan ini hari ini adalah karena secara historis teknik ini telah digunakan dalam spionase. Tujuannya pada dasarnya adalah untuk menyembunyikan pesan di depan mata.

Semua dokumentasi seputar hal ini sangat terbatas. Anda mungkin bertanya pada Claude dan ia menjawab, "Maaf, tidak ada info untuk Anda." Saya melakukan rekayasa balik (reverse-engineering) informasi ini sendiri. Slide ini mendokumentasikan semuanya. Saya tidak akan bisa membahas setiap detail, tetapi saya akan membahas bagian-bagian yang menarik. Saya juga telah membuat repositori GitHub yang mendokumentasikan proses-proses tersebut.

#### Fotografi analog untuk keamanan (3:30) {#analog-photography-for-security-330}

Kita akan menghidupkan kembali fotografi analog untuk kasus penggunaan ini. Mengapa analog? Pada dasarnya tidak ada peluang bagi seseorang untuk meretas kamera analog kecuali mereka mencurinya secara fisik dari Anda.

Salah satu masalah utama dengan fotografi analog adalah ISO. Pada kamera digital, ini bukan masalah besar — Anda bisa menyesuaikannya. Tetapi dengan film, ISO adalah fungsi dari butiran film (film grains). Ini menjadi masalah ketika Anda ingin mengecilkan gambar. Semakin kecil ISO, semakin kecil butirannya secara umum.

Ada dua fase. Pertama, Anda mengambil foto, mencucinya (develop), dan menetapkannya (fix). Fase kedua adalah di mana, alih-alih memperbesar gambar, kita melakukan yang sebaliknya — kita menyusutkannya ke skala mikroskopis.

#### Proses Inggris (5:00) {#the-british-process-500}

Begini cara Anda melakukannya. Anda menulis frasa benih Anda. Biasanya tutorial MetaMask meminta Anda untuk menulis frasa benih — tetapi kemudian di mana Anda menyimpannya? Ini adalah salah satu cara: Anda mengambil foto frasa benih, menggulung filmnya, mencuci filmnya. Hal yang menarik — ini semua adalah logam berat, logam perak. Anda tidak boleh membuangnya ke toilet. Saya tidak sengaja menuangkan sebagian ke toilet saya, jadi saya mungkin telah melakukan beberapa pelanggaran lingkungan. Kemungkinan terburuknya, itu akan merusak pipa saya.

Anda mengambil foto lagi, dan tada — Anda mendapatkan titik kecil ini. Ini disebut proses Inggris (British process).

#### Proses dikromat (7:00) {#the-dichromated-process-700}

Proses selanjutnya yang bahkan lebih ekstrem adalah proses dikromat (dichromated process). Ini adalah cara Anda bisa mendapatkan perbesaran mikroskopis seperti 1000x. Tujuannya adalah untuk menemukan substrat kimia untuk ini, dan di sinilah apa yang saya sebut "Jus Jeruk Terlarang" (Forbidden Orange Juice) berperan — amonium dikromat. Ini sangat beracun. Saya sempat menumpahkan sebagian, dan saya hampir mati ketika menghirup debunya. Saya mungkin perlu pergi untuk skrining kanker setelah ini.

Anda memproyeksikan gambar dan Anda mendapatkan titik-titik kecil ini di selembar kertas. Titik-titiknya sangat kecil sehingga Anda pasti membutuhkan mikroskop. Yang menggunakan proses Inggris bisa Anda lihat dengan mata telanjang, tetapi proses dikromat menghasilkan sesuatu yang sangat kecil — saya bahkan tidak yakin apakah itu gambar yang sebenarnya tanpa mikroskop.

#### Tanya Jawab (8:00) {#qa-800}

Seberapa kecil microdot tersebut? Anda bisa melihat yang dibuat menggunakan proses Inggris dengan mata telanjang, tetapi proses dikromat menghasilkan sesuatu yang sangat kecil — Anda pasti membutuhkan mikroskop. Sulit untuk membedakan apakah itu gambar yang sebenarnya tanpa mikroskop.

**Pertanyaan:** Berapa lama ini bertahan? Apakah ada waktu paruh (half-life)?

**jseam:** Ini tidak radioaktif. Kita akan mengetahuinya dalam 20 tahun.

**Pertanyaan:** Apakah Anda telah membalikkan prosesnya — mengenkode lalu mendekode untuk melihat apakah Anda bisa memulihkannya?

**jseam:** Saya rasa Anda bisa. Anda mungkin membutuhkan semacam pengaturan proyeksi optik.

Terima kasih banyak. Jika kalian ingin melihat sampelnya, saya akan berada di sekitar sini. Terima kasih atas waktu kalian, semuanya.