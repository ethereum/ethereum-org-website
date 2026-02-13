---
title: Komposabilitas kontrak pintar
description: Pelajari bagaimana kontrak pintar dapat digabungkan seperti balok Lego untuk membangun dapps yang kompleks dengan menggunakan kembali komponen yang ada.
lang: id
incomplete: true
---

## Pengenalan singkat {#a-brief-introduction}

Kontrak pintar bersifat publik di Ethereum dan bisa dianggap sebagai API terbuka. Anda tidak perlu menulis kontrak pintar sendiri untuk menjadi pengembang dapp, Anda hanya perlu tahu bagaimana berinteraksi dengannya. Misalnya, Anda dapat menggunakan kontrak pintar yang sudah ada dari [Uniswap](https://uniswap.exchange/swap), sebuah bursa terdesentralisasi, untuk menangani semua logika pertukaran token di aplikasi Anda – Anda tidak perlu memulai dari awal. Lihat beberapa kontrak [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) dan [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) mereka.

## Apa yang dimaksud dengan komposabilitas? {#what-is-composability}

Komposabilitas adalah menggabungkan komponen-komponen berbeda untuk menciptakan sistem atau keluaran baru. Dalam pengembangan perangkat lunak, composability berarti pengembang dapat menggunakan kembali komponen perangkat lunak yang sudah ada untuk membangun aplikasi baru Cara yang baik untuk memahami daya gabung adalah dengan membayangkan elemen yang dapat digabungkan sebagai balok-balok Lego. Setiap Lego dapat digabungkan dengan Lego lain, memungkinkan Anda membangun struktur yang kompleks dengan mengombinasikan berbagai Lego yang berbeda.

Di Ethereum, setiap smart contract adalah semacam Lego—Anda bisa menggunakan smart contract dari proyek lain sebagai blok bangunan untuk proyek Anda sendiri. Ini berarti Anda tidak perlu menghabiskan waktu untuk menciptakan kembali roda atau membangun semuanya dari awal.

## Bagaimana cara kerja komposabilitas? {#how-does-composability-work}

Kontrak pintar Ethereum seperti API publik, jadi siapa pun bisa berinteraksi dengan kontrak tersebut atau mengintegrasikannya ke dalam dapp untuk menambahkan fungsionalitas. Komposabilitas kontrak pintar umumnya bekerja berdasarkan tiga prinsip: modularitas, otonomi, dan keterpahaman discoverability:

\*\*1. **Modularitas**: Ini adalah kemampuan komponen individual untuk melakukan tugas tertentu. Di Ethereum, setiap smart contract memiliki kasus penggunaan spesifik (seperti yang ditunjukkan pada contoh Uniswap).

\*\*2. **Otonomi**: Komponen yang dapat disusun harus dapat beroperasi secara independen. Setiap smart contract di Ethereum bersifat self-executing dan dapat berfungsi tanpa bergantung pada bagian lain dari sistem.

\*\*3. **Discoverability**: Pengembang tidak dapat memanggil kontrak eksternal atau mengintegrasikan pustaka perangkat lunak ke dalam aplikasi jika yang disebutkan sebelumnya tidak tersedia untuk umum. Secara desain, smart contract bersifat open-source; siapa pun dapat memanggil smart contract atau membuat fork dari kode sumbernya.

## Manfaat komposabilitas {#benefits-of-composability}

### Siklus pengembangan yang lebih singkat {#shorter-development-cycle}

Komposabilitas mengurangi pekerjaan yang harus dilakukan pengembang saat membuat [dapps](/apps/#what-are-dapps). [Seperti yang dikatakan Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "Sumber terbuka berarti setiap masalah hanya perlu diselesaikan satu kali."

Jika ada smart contract yang sudah menyelesaikan suatu masalah, pengembang lain bisa menggunakannya kembali, sehingga mereka tidak perlu memecahkan masalah yang sama. Dengan cara ini, pengembang dapat mengambil pustaka perangkat lunak yang sudah ada dan menambahkan fungsionalitas tambahan untuk membuat dapps baru.

### Inovasi yang lebih besar {#greater-innovation}

Komposabilitas mendorong inovasi dan eksperimen karena pengembang bebas menggunakan kembali, memodifikasi, menggandakan, atau mengintegrasikan kode sumber terbuka untuk menghasilkan hasil yang diinginkan. Akibatnya, tim pengembangan menghabiskan lebih sedikit waktu untuk fungsionalitas dasar dan dapat mengalokasikan lebih banyak waktu untuk bereksperimen dengan fitur-fitur baru.

### Pengalaman pengguna yang lebih baik {#better-user-experience}

Interoperabilitas antara komponen-komponen dalam ekosistem Ethereum meningkatkan pengalaman pengguna. Pengguna dapat mengakses fungsionalitas yang lebih luas ketika dapp mengintegrasikan smart contract eksternal, dibandingkan dalam ekosistem yang terfragmentasi di mana aplikasi tidak dapat saling berkomunikasi.

Kita akan menggunakan contoh dari perdagangan arbitrase untuk menggambarkan manfaat interoperabilitas:

Jika sebuah token diperdagangkan lebih tinggi di `bursa A` daripada di `bursa B`, Anda dapat memanfaatkan selisih harga untuk mendapatkan keuntungan. Namun, Anda hanya dapat melakukannya jika Anda memiliki modal yang cukup untuk mendanai transaksi (yaitu, membeli token dari `bursa B` dan menjualnya di `bursa A`).

Dalam skenario di mana kamu tidak memiliki cukup dana untuk menutupi perdagangan, flash loan mungkin menjadi solusi yang ideal. [Pinjaman kilat](/defi/#flash-loans) sangat teknis, tetapi ide dasarnya adalah Anda dapat meminjam aset (tanpa jaminan) dan mengembalikannya dalam _satu_ transaksi.

Kembali ke contoh awal kita, seorang pedagang arbitrase dapat mengambil pinjaman kilat dalam jumlah besar, membeli token dari `bursa B`, menjualnya di `bursa A`, membayar kembali modal + bunga, dan menyimpan keuntungannya, semuanya dalam satu transaksi yang sama. Logika kompleks ini membutuhkan penggabungan panggilan ke beberapa kontrak, yang tidak akan mungkin dilakukan jika smart contract tidak memiliki interoperabilitas.

## Contoh komposabilitas di Ethereum {#composability-in-ethereum}

### Pertukaran token {#token-swaps}

Jika Anda membuat dapp yang mengharuskan transaksi dibayar dalam ETH, Anda dapat memungkinkan pengguna membayar dengan token ERC-20 lain dengan mengintegrasikan logika pertukaran token. Kode tersebut secara otomatis akan mengonversi token pengguna menjadi ETH sebelum kontrak mengeksekusi fungsi yang dipanggil.

### Tata Kelola {#governance}

Membangun sistem tata kelola khusus untuk [DAO](/dao/) bisa mahal dan memakan waktu. Sebagai gantinya, Anda dapat menggunakan perangkat tata kelola sumber terbuka, seperti [Aragon Client](https://client.aragon.org/), untuk memulai DAO Anda dan membuat kerangka kerja tata kelola dengan cepat.

### Manajemen identitas {#identity-management}

Alih-alih membangun sistem autentikasi kustom atau bergantung pada penyedia terpusat, Anda bisa mengintegrasikan alat identitas terdesentralisasi (DID) untuk mengelola autentikasi pengguna. Contohnya adalah [SpruceID](https://www.spruceid.com/), sebuah perangkat sumber terbuka yang menawarkan fungsionalitas "Sign in with Ethereum" yang memungkinkan pengguna mengautentikasi identitas dengan dompet Ethereum.

## Tutorial terkait {#related-tutorials}

- [Mulai cepat pengembangan frontend dapp Anda dengan create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Gambaran umum tentang cara menggunakan create-eth-app untuk membuat aplikasi dengan kontrak pintar populer yang sudah siap pakai._

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

- [Komposabilitas adalah Inovasi](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Mengapa Komposabilitas Penting untuk Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Apa itu Komposabilitas?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
