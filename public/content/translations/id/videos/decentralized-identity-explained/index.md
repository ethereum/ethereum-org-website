---
title: "Penjelasan tentang identitas terdesentralisasi"
description: "Penjelasan tentang bagaimana identitas terdesentralisasi memberi pengguna lebih banyak kendali atas identitas digital mereka, dan menjaga informasi pribadi di internet lebih aman menggunakan kredensial berbasis blockchain."
lang: id
youtubeId: "Ew-_F-OtDFI"
uploadDate: 2022-04-12
duration: "0:05:22"
educationLevel: beginner
topic:
  - "identitas"
format: explainer
author: Microsoft Security
breadcrumb: "Identitas Terdesentralisasi"
---

Penjelasan oleh **Microsoft Security** tentang bagaimana identitas terdesentralisasi (DID) memberi pengguna lebih banyak kendali atas kredensial digital mereka, mencakup masalah dengan pengidentifikasi digital saat ini, bagaimana Kredensial yang Dapat Diverifikasi (Verifiable Credentials) dan Pengidentifikasi Terdesentralisasi (Decentralized Identifiers) bekerja, dan apa artinya ini bagi privasi daring.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=Ew-_F-OtDFI) yang dipublikasikan oleh Microsoft Security. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Masalah dengan kredensial digital (0:02) {#the-problem-with-digital-credentials-002}

Setiap hari, kita membawa dompet yang penuh dengan kartu. Namun, hanya beberapa kartu pilihan — seperti KTP pemerintah dan kartu kredit — yang diterima secara luas. Masyarakat kita telah menetapkan norma global tentang bagaimana kita menyajikan dan memverifikasi kredensial yang diwakili oleh kartu fisik ini. Namun, tidak ada padanan yang benar-benar setara untuk kredensial digital.

Mengapa tidak? Pertama, tidak ada mekanisme standar untuk menerbitkan kartu digital. Untuk menerbitkan kartu atau kredensial digital yang dapat diterima secara universal, kita memerlukan pengidentifikasi digital yang dapat dimiliki individu secara independen dari entitas, organisasi, atau institusi mana pun. Saat ini, kita menggunakan alamat email dan nomor telepon sebagai pengidentifikasi untuk mengakses situs web dan aplikasi. Namun, akses kita ke pengidentifikasi ini, dan informasi pribadi kita, bergantung pada penyedia layanan yang dapat mencabutnya kapan saja.

Kedua, tidak ada standar yang diterima secara universal untuk mengekspresikan, menukar, dan memverifikasi kredensial digital melintasi batas-batas organisasi.

#### Bagaimana identitas terdesentralisasi bekerja (1:03) {#how-decentralized-identity-works-103}

Semua ini akan segera berubah. Bentuk baru identitas digital, berdasarkan standar yang sedang berkembang seperti Kredensial yang Dapat Diverifikasi dan Pengidentifikasi Terdesentralisasi, dapat memungkinkan kredensial digital berfungsi di mana saja, menjadi lebih tepercaya, dan menghormati privasi.

Begini cara kerjanya. Kenalkan, Alice. Dompet digital barunya memberdayakannya untuk memiliki dan mengendalikan kredensial. Karena tidak terikat pada satu organisasi mana pun, sumber otoritatif dapat dengan yakin menerbitkan kredensial berbasis standar kepada Alice. Ketika Alice menyajikan kredensial ini, situs web dan aplikasi dapat memeriksa bahwa kredensial tersebut valid — misalnya, dengan mengonfirmasi ke universitas bahwa dia adalah mahasiswa di sana — dan kemudian memberikan akses yang sesuai.

#### Kepercayaan kriptografi (1:51) {#cryptographic-trust-151}

Meskipun proses ini mungkin lebih mudah, bagaimana kita tahu bahwa ini tepercaya? Pengidentifikasi Terdesentralisasi memanfaatkan sistem kriptografi yang telah terbukti. Ketika Alice menyajikan kredensialnya, dompet digitalnya menghasilkan pengidentifikasi unik dan menandatanganinya menggunakan kunci privat yang diamankan oleh bukti biometrik atau PIN yang hanya dia yang tahu. Kunci publik yang dipasangkan secara unik dipublikasikan ke buku besar terdistribusi.

Alice dapat menyajikan kartu identitas mahasiswa digitalnya ke toko buku, dan sebelum memberikan diskon, toko buku tersebut dapat mengonfirmasi bahwa universitas menerbitkan kartu tersebut untuk Alice.

#### Privasi dan kendali (2:27) {#privacy-and-control-227}

Pengalaman ini meniru apa yang dilakukan Alice saat ini. Dia dapat menyajikan dan mengautentikasi serangkaian Kredensial yang Dapat Diverifikasi secara digital sama seperti dia menyajikan kartu fisik. Dan dia dapat mencabutnya dengan satu klik, sama seperti dia mengembalikan kartu ke dompetnya.

Yang terbaik dari semuanya, kartu digital ini bersifat privat. Hal ini menempatkan Alice dalam kendali penuh atas identitas digitalnya — dia yang membuat keputusan untuk itu. Kredensial yang Dapat Diverifikasi akan membuatnya lebih mudah untuk tetap memegang kendali dan membantu membuka internet yang lebih tepercaya yang menghormati privasi bagi kita semua.