---
title: Jaringan
description: Sebuah gambaran umum tentang jaringan Ethereum dan di mana mendapatkan ether (ETH) testnet untuk menguji aplikasi Anda.
lang: id
sidebar: true
---

Karena Ethereum adalah sebuah protokol, ini berarti ada beberapa "jaringan" independen yang sesuai dengan protokol ini yang tidak berinteraksi satu sama lain.

Jaringan adalah lingkungan Ethereum berbeda yang bisa Anda akses untuk kasus penggunaan pengembangan, pengujian, atau produksi. Akun Ethereum Anda akan berfungsi di berbagai jaringan tapi saldo akun dan riwayat transaksi Anda tidak akan dibawa dari jaringan Ethereum utama. Untuk tujuan pengujian, akan berguna jika mengetahui jaringan mana yang tersedia dan bagaimana mendapat ETH testnet sehingga Anda bisa melakukan uji coba dengannya.

## Prasyarat {#prerequisites}

Anda harus mengerti konsep dasar tentang Ethereum sebelum membaca lebih banyak tentang jaringan berbeda karena jaringan percobaan akan memberi Anda versi Ethereum yang murah dan aman untuk keperluan uji coba. Coba lihat [pengantar Ethereum](/developers/docs/intro-to-ethereum/) kami.

## Jaringan publik {#public-networks}

Jaringan publik dapat diakses siapa saja di dalam dunia dengan koneksi internet. Siapa pun bisa membaca atau membuat transaksi pada blockchain publik dan memvalidasi transaksi yang sedang dijalankan. Persetujuan transaksi dan state jaringan ditentukan oleh konsensus rekan sejawat.

### Jaringan Utama {#mainnet}

Jaringan Utama adalah blokchain produksi Ethereum publik yang utama, di mana transaksi dengan nilai sebenarnya terjadi pada buku besar terdistribusi.

Saat orang-orang dan bursa membahas harga ETH, mereka sedang berbicara tentang Jaringan Utama ETH.

### Testnet {#testnets}

Selain Jaringan Utama, ada testnet publik. Ini adalah jaringan yang digunakan pengembang protokol atau kontrak pintar untuk menguji peningkatan protokol serta kontrak pintar potensial dalam lingkungan yang menyerupai produksi sebelum proses penerapan ke Jaringan Utama. Anggap ini sebagai analog dari server produksi versus server pementasan.

Secara umum, penting menguji kode kontrak apa pun yang Anda tulis di testnet sebelum menerapkannya ke Jaringan Utama. Jika Anda menyusun sebuah dapp yang terintegrasi dengan kontrak pintar yang telah ada, sebagian besar proyek memiliki salinan yang diterapkan ke testnet tempat Anda berinteraksi.

Kebanyakan testnet menggunakan mekanisme konsensus bukti otoritas. Ini berarti sejumlah kecil node dipilih untuk memvalidasi transaksi dan membuat blok baru - mempertaruhkan identitas mereka dalam prosesnya. Sulit untuk memberi insentif terhadap penambangan pada testnet bukti kerja yang bisa membuatnya rentan terhadap serangan.

#### Görli {#goerli}

Testnet bukti otoritas yang berfungsi di seluruh klien.

#### Kovan {#kovan}

Testnet bukti kerja untuk mereka yang menjalankan klien OpenEthereum.

#### Rinkeby {#rinkeby}

Testnet bukti otoritas bagi mereka yang menjalankan klien Geth.

#### Ropsten {#ropsten}

Testnet bukti kerja. Ini berarti representasi Ethereum yang terbaik.

### Keran testnet {#testnet-faucets}

ETH dalam testnet tidak punya nilai sebenarnya; oleh karena itu, tidak ada pasar untuk ETH testnet. Karena Anda membutuhkan ETH untuk benar-benar berinteraksi dengan Ethereum, kebanyakan orang mendapatkan ETH testnet dari keran. Sebagian besar keran adalah aplikasi web tempat Anda dapat memasukkan alamat pengiriman ETH yang Anda minta.

- [Keran Görli](https://faucet.goerli.mudit.blog/)
- [Keran Kovan](https://faucet.kovan.network/)
- [Keran Rinkeby](https://faucet.rinkeby.io/)
- [Keran Ropsten](https://faucet.ropsten.be/)

## Jaringan privat {#private-networks}

Jaringan Ethereum adalah jaringan privat jika nodenya tidak terhubung dengan jaringan publik (mis. Jaringan Utama atau testnet). Dalam konteks ini, privat hanya berarti sudah disimpan atau diisolasi, alih-alih dilindungi atau aman.

### Jaringan pengembangan {#development-networks}

Untuk mengembangkan aplikasi Ethereum, Anda ingin menjalankannya di jaringan privat untuk melihat cara kerjanya sebelum menerapkannya. Serupa dengan cara Anda membuat server lokal pada komputer untuk pengembangan web, Anda bisa membuat instance blockchain lokal untuk menguji dapp Anda. Ini memungkinkan proses pengulangan yang lebih cepat daripada testnet publik.

Ada proyek dan peralatan yang didedikasikan untuk membantu proses ini. Pelajari lebih lanjut tentang [jaringan pengembangan](/developers/docs/development-networks/).

### Jaringan Konsorsium {#consortium-networks}

Proses konsensusnya dikendalikan oleh kumpulan node terpercaya yang telah ditentukan sebelumnya. Sebagai contoh, jaringan privat dari institusi akademis terkenal yang masing-masing mengurus satu node, dan blok divalidasi oleh ambang batas penandatangan dalam jaringan.

Jika jaringan Ethereum publik seperti internet publik, Anda bisa menganggap jaringan konsorsium sebagai intranet privat.

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
