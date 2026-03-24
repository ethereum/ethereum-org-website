---
title: Komposabilitas kontrak pintar
description: Pelajari bagaimana kontrak pintar dapat digabungkan seperti balok Lego untuk membangun dapps yang kompleks dengan menggunakan kembali komponen yang ada.
lang: id
incomplete: true
---

## Pengantar singkat {#a-brief-introduction}

Kontrak pintar bersifat publik di Ethereum dan dapat dianggap sebagai API terbuka. Anda tidak perlu menulis kontrak pintar Anda sendiri untuk menjadi pengembang dapp, Anda hanya perlu tahu cara berinteraksi dengannya. Misalnya, Anda dapat menggunakan kontrak pintar yang ada dari [Uniswap](https://uniswap.exchange/swap), sebuah pertukaran terdesentralisasi, untuk menangani semua logika tukar token di aplikasi Anda – Anda tidak perlu memulai dari awal. Lihat beberapa kontrak [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) dan [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) mereka.

## Apa itu komposabilitas? {#what-is-composability}

Komposabilitas adalah menggabungkan komponen-komponen yang berbeda untuk membuat sistem atau keluaran baru. Dalam pengembangan perangkat lunak, komposabilitas berarti pengembang dapat menggunakan kembali komponen perangkat lunak yang ada untuk membangun aplikasi baru. Cara yang baik untuk memahami komposabilitas adalah dengan menganggap elemen yang dapat dikomposisikan sebagai balok Lego. Setiap Lego dapat digabungkan dengan yang lain, memungkinkan Anda untuk membangun struktur yang kompleks dengan menggabungkan Lego yang berbeda.

Di Ethereum, setiap kontrak pintar adalah semacam Lego—Anda dapat menggunakan kontrak pintar dari proyek lain sebagai blok bangunan untuk proyek Anda. Ini berarti Anda tidak perlu menghabiskan waktu untuk menemukan kembali roda atau membangun dari awal.

## Bagaimana cara kerja komposabilitas? {#how-does-composability-work}

Kontrak pintar Ethereum seperti API publik, sehingga siapa pun dapat berinteraksi dengan kontrak atau mengintegrasikannya ke dalam dapps untuk fungsionalitas tambahan. Komposabilitas kontrak pintar umumnya bekerja berdasarkan tiga prinsip: modularitas, otonomi, dan kemampuan untuk ditemukan (discoverability):

**1. Modularitas**: Ini adalah kemampuan komponen individu untuk melakukan tugas tertentu. Di Ethereum, setiap kontrak pintar memiliki kasus penggunaan tertentu (seperti yang ditunjukkan dalam contoh Uniswap).

**2. Otonomi**: Komponen yang dapat dikomposisikan harus dapat beroperasi secara independen. Setiap kontrak pintar di Ethereum mengeksekusi dirinya sendiri dan dapat berfungsi tanpa bergantung pada bagian lain dari sistem.

**3. Kemampuan untuk ditemukan (Discoverability)**: Pengembang tidak dapat memanggil kontrak eksternal atau mengintegrasikan pustaka perangkat lunak ke dalam aplikasi jika kontrak tersebut tidak tersedia untuk publik. Berdasarkan desainnya, kontrak pintar bersifat sumber terbuka; siapa pun dapat memanggil kontrak pintar atau melakukan fork pada basis kode.

## Manfaat komposabilitas {#benefits-of-composability}

### Siklus pengembangan yang lebih singkat {#shorter-development-cycle}

Komposabilitas mengurangi pekerjaan yang harus dilakukan pengembang saat membuat [dapps](/apps/#what-are-dapps). [Seperti yang dikatakan Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "Sumber terbuka berarti setiap masalah hanya perlu diselesaikan sekali."

Jika ada kontrak pintar yang memecahkan satu masalah, pengembang lain dapat menggunakannya kembali, sehingga mereka tidak perlu memecahkan masalah yang sama. Dengan cara ini, pengembang dapat mengambil pustaka perangkat lunak yang ada dan menambahkan fungsionalitas ekstra untuk membuat dapps baru.

### Inovasi yang lebih besar {#greater-innovation}

Komposabilitas mendorong inovasi dan eksperimen karena pengembang bebas untuk menggunakan kembali, memodifikasi, menduplikasi, atau mengintegrasikan kode sumber terbuka untuk menciptakan hasil yang diinginkan. Akibatnya, tim pengembangan menghabiskan lebih sedikit waktu pada fungsionalitas dasar dan dapat mengalokasikan lebih banyak waktu untuk bereksperimen dengan fitur-fitur baru.

### Pengalaman pengguna yang lebih baik {#better-user-experience}

Interoperabilitas antara komponen ekosistem Ethereum meningkatkan pengalaman pengguna. Pengguna dapat mengakses fungsionalitas yang lebih besar ketika dapps mengintegrasikan kontrak pintar eksternal dibandingkan dalam ekosistem yang terfragmentasi di mana aplikasi tidak dapat berkomunikasi.

Kami akan menggunakan contoh dari perdagangan arbitrase untuk mengilustrasikan manfaat interoperabilitas:

Jika sebuah token diperdagangkan lebih tinggi di `exchange A` daripada `exchange B`, Anda dapat memanfaatkan perbedaan harga tersebut untuk mendapatkan keuntungan. Namun, Anda hanya dapat melakukannya jika Anda memiliki modal yang cukup untuk mendanai transaksi (yaitu, membeli token dari `exchange B` dan menjualnya di `exchange A`).

Dalam skenario di mana Anda tidak memiliki dana yang cukup untuk menutupi perdagangan, pinjaman kilat (flash loan) mungkin ideal. [Pinjaman kilat](/defi/#flash-loans) sangat teknis, tetapi ide dasarnya adalah Anda dapat meminjam aset (tanpa agunan) dan mengembalikannya dalam _satu_ transaksi.

Kembali ke contoh awal kita, seorang pedagang arbitrase dapat mengambil pinjaman kilat dalam jumlah besar, membeli token dari `exchange B`, menjualnya di `exchange A`, membayar kembali modal + bunga, dan menyimpan keuntungannya, dalam transaksi yang sama. Logika kompleks ini membutuhkan penggabungan panggilan ke beberapa kontrak, yang tidak akan mungkin terjadi jika kontrak pintar tidak memiliki interoperabilitas.

## Contoh komposabilitas di Ethereum {#composability-in-ethereum}

### Tukar token {#token-swaps}

Jika Anda membuat dapp yang mengharuskan transaksi dibayar dalam ETH, Anda dapat mengizinkan pengguna untuk membayar dalam token ERC-20 lainnya dengan mengintegrasikan logika tukar token. Kode tersebut akan secara otomatis mengonversi token pengguna menjadi ETH sebelum kontrak mengeksekusi fungsi yang dipanggil.

### Tata kelola {#governance}

Membangun sistem tata kelola khusus untuk [DAO](/dao/) bisa mahal dan memakan waktu. Sebagai gantinya, Anda dapat menggunakan perangkat tata kelola sumber terbuka, seperti [Aragon Client](https://client.aragon.org/), untuk memulai DAO Anda guna membuat kerangka kerja tata kelola dengan cepat.

### Manajemen identitas {#identity-management}

Daripada membangun sistem autentikasi khusus atau mengandalkan penyedia terpusat, Anda dapat mengintegrasikan alat identitas terdesentralisasi (DID) untuk mengelola autentikasi bagi pengguna. Contohnya adalah [SpruceID](https://www.spruceid.com/), sebuah perangkat sumber terbuka yang menawarkan fungsionalitas "Masuk dengan Ethereum" yang memungkinkan pengguna mengautentikasi identitas dengan dompet Ethereum.

## Tutorial terkait {#related-tutorials}

- [Mulai pengembangan frontend dapp Anda dengan create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Gambaran umum tentang cara menggunakan create-eth-app untuk membuat aplikasi dengan kontrak pintar populer yang siap pakai._

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

- [Composability is Innovation](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Why Composability Matters For Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [What is Composability?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)