---
title: "Pasangan kunci — ETH.BUILD"
description: "Demonstrasi pasangan kunci publik-privat menggunakan alat edukasi ETH.BUILD. Pahami bagaimana pasangan kunci kriptografi mengamankan akun Ethereum dan memungkinkan penandatanganan transaksi."
lang: id
youtubeId: "9LtBDy67Tho"
uploadDate: 2021-01-14
duration: "0:04:05"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Pasangan Kunci (ETH.BUILD)"
---

Sebuah tutorial oleh **Austin Griffith** yang mendemonstrasikan bagaimana pasangan kunci publik-privat bekerja menggunakan alat pemrograman visual ETH.BUILD, mencakup pembuatan kunci privat, derivasi kunci publik, penandatanganan pesan, dan pemulihan tanda tangan.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=9LtBDy67Tho) yang dipublikasikan oleh Austin Griffith. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

### Kunci privat (0:00) {#the-private-key-000}

Di video pertama kita menggunakan hash, dan hash akan menjadi penting ke depannya. Namun bagian terpenting berikutnya adalah pasangan kunci. Bagian terpenting dari pasangan kunci adalah kunci privat. Mari kita buat satu — pada dasarnya ini adalah string heksadesimal 64 karakter acak, ukurannya sama dengan hash yang baru saja kita kerjakan.

Anda mulai dengan itu sebagai kunci privat Anda, dan kemudian menggunakan kriptografi kurva eliptik — silakan cek di Wikipedia sebagai selingan — kita menurunkan sebuah kunci publik. Jadi sekarang kita memiliki kunci privat dan kunci publik. Kita baru saja membuat kunci privat secara tiba-tiba, dan kunci publik memberi kita sebuah alamat. Di sinilah orang-orang dapat benar-benar mengirimkan uang. Ketika seseorang berkata "kirim ke alamat Ethereum saya," inilah yang dimaksud.

Jika saya ingin membuat akun di Wells Fargo, saya harus berkendara ke bank dan memberikan banyak informasi kepada mereka. Itu akan memakan waktu. Namun untuk membuat akun dalam sistem kriptografi seperti ini, di mana saya dapat mengirim dan menerima uang, saya hanya perlu membuat kunci privat ini. Kunci privat heksadesimal 64 karakter ini menurunkan semua hal lainnya.

### Menandatangani dan memulihkan pesan (1:54) {#signing-and-recovering-messages-154}

Ada properti yang sangat rapi tentang pasangan kunci ini yang harus kita eksplorasi, yaitu menandatangani dan memulihkan pesan. Pada dasarnya, Anda mengambil kunci privat Anda dan menggunakannya untuk menandatangani suatu pesan. Mari kita ketik sebuah pesan — "beruang itu lengket dengan madu."

Kita memasukkannya sebagai pesan kita, dan dengan fitur tanda tangan otomatis diaktifkan, itu mengembalikan sebuah tanda tangan kepada kita. Mirip seperti hash, tanda tangan kita pada dasarnya mengambil pesan dan kunci privat kita lalu menandatangani sesuatu. Apa yang kita dapatkan dari itu adalah sebuah tanda tangan.

Saya dapat mengirimkannya ke seluruh dunia — saya dapat mengirimkannya secara publik kepada semua orang — string tanda tangan ini bersama dengan pesannya. Apa yang dapat dilakukan siapa pun dengan matematika adalah memverifikasi bahwa secara spesifik sayalah yang menandatanganinya.

### Memulihkan alamat penandatangan (3:17) {#recovering-the-signers-address-317}

Biar saya tunjukkan bagaimana cara kerjanya. Kita menggunakan metode "recover" (pulihkan). Kita membutuhkan dua input: pesan — "beruang itu lengket dengan madu" — dan tanda tangan. Apa yang keluar dari situ adalah alamat yang digunakan untuk menandatanganinya. Kita dapat melihat secara visual bahwa akun tersebut menandatangani pesan itu menggunakan identikon Blockie.

Tidak ada cara untuk merusaknya. Jika ada yang mengubah satu kata pun — seperti menukar "beruang" menjadi "luwak" — semuanya berubah. Bahkan dengan tanda tangan yang sama, pesan yang berbeda akan mengeluarkan alamat yang berbeda, bukan alamat yang benar.

Pesan ini tidak dapat dirusak. Kita bisa memasukkan stempel waktu di sana — kita bisa mengatakan "pada hari ini saya memprediksi bahwa sesuatu akan terjadi," menandatanganinya, mengeluarkan tanda tangan dan pesannya, dan siapa pun untuk selamanya dapat membuktikan secara matematis bahwa Anda menandatangani pesan tersebut pada waktu itu.

### Properti utama dari pasangan kunci (4:58) {#the-key-property-of-a-key-pair-458}

Ini adalah properti utama dari pasangan kunci. Pasangan kunci yang dihasilkan hanya dari string acak heksadesimal 64 karakter dapat digunakan untuk menandatangani sebuah pesan, dan kemudian pesan tersebut dapat dipulihkan.

- Kunci privat + pesan = tanda tangan
- Tanda tangan + pesan = alamat publik

Kita dapat menandatangani data dengan kunci privat kita, dan orang-orang dapat membuktikan bahwa kitalah yang menandatanganinya. Itu akan menjadi bagian penting untuk langkah selanjutnya.