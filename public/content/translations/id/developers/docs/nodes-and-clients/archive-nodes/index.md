---
title: Archive Node Ethereum
description: Gambaran umum tentang archive node
lang: id
sidebarDepth: 2
---

Archive node adalah instans dari klien [Ethereum](/) yang dikonfigurasi untuk membangun arsip dari semua status historis. Ini adalah alat yang berguna untuk kasus penggunaan tertentu tetapi mungkin lebih rumit untuk dijalankan daripada full node.

## Prasyarat {#prerequisites}

Anda harus memahami konsep [node Ethereum](/developers/docs/nodes-and-clients/), [arsitekturnya](/developers/docs/nodes-and-clients/node-architecture/), [strategi sinkronisasi](/developers/docs/nodes-and-clients/#sync-modes), praktik [menjalankan](/developers/docs/nodes-and-clients/run-a-node/) dan [menggunakannya](/developers/docs/apis/json-rpc/).

## Apa itu archive node

Untuk memahami pentingnya archive node, mari kita perjelas konsep "status" (state). Ethereum dapat disebut sebagai _mesin status berbasis transaksi_. Ini terdiri dari akun dan aplikasi yang mengeksekusi transaksi yang mengubah status mereka. Data global dengan informasi tentang setiap akun dan kontrak disimpan dalam basis data trie yang disebut status. Ini ditangani oleh klien lapisan eksekusi (EL) dan mencakup:

- Saldo akun dan nonce
- Kode dan penyimpanan kontrak
- Data terkait konsensus, mis., Kontrak Deposit Staking (Staking Deposit Contract)

Untuk berinteraksi dengan jaringan, memverifikasi dan menghasilkan blok baru, klien Ethereum harus mengikuti perubahan terbaru (ujung rantai) dan oleh karena itu status saat ini. Klien lapisan eksekusi yang dikonfigurasi sebagai full node memverifikasi dan mengikuti status terbaru dari jaringan tetapi hanya menyimpan beberapa status sebelumnya dalam cache, mis., status yang terkait dengan 128 blok terakhir, sehingga dapat menangani reorganisasi rantai dan menyediakan akses cepat ke data terbaru. Status terbaru adalah apa yang dibutuhkan semua klien untuk memverifikasi transaksi yang masuk dan menggunakan jaringan.

Anda dapat membayangkan status sebagai cuplikan jaringan sesaat pada blok tertentu dan arsip sebagai pemutaran ulang riwayat.

Status historis dapat dipangkas dengan aman karena tidak diperlukan agar jaringan dapat beroperasi dan akan menjadi mubazir bagi klien untuk menyimpan semua data yang sudah usang. Status yang ada sebelum beberapa blok terbaru (mis., 128 blok sebelum head) secara efektif dibuang. Full node hanya menyimpan data blockchain historis (blok dan transaksi) dan sesekali cuplikan historis yang dapat mereka gunakan untuk meregenerasi status lama berdasarkan permintaan. Mereka melakukan ini dengan mengeksekusi ulang transaksi masa lalu di EVM, yang dapat menuntut komputasi tinggi ketika status yang diinginkan jauh dari cuplikan terdekat.

Namun, ini berarti bahwa mengakses status historis pada full node menghabiskan banyak komputasi. Klien mungkin perlu mengeksekusi semua transaksi masa lalu dan menghitung satu status historis dari genesis. Archive node menyelesaikan ini dengan menyimpan tidak hanya status terbaru tetapi setiap status historis yang dibuat setelah setiap blok. Ini pada dasarnya membuat pertukaran (trade-off) dengan persyaratan ruang disk yang lebih besar.

Penting untuk dicatat bahwa jaringan tidak bergantung pada archive node untuk menyimpan dan menyediakan semua data historis. Seperti disebutkan di atas, semua status sementara historis dapat diturunkan pada full node. Transaksi disimpan oleh full node mana pun (saat ini kurang dari 400G) dan dapat diputar ulang untuk membangun seluruh arsip.

### Kasus penggunaan

Penggunaan reguler Ethereum seperti mengirim transaksi, menerapkan kontrak, memverifikasi konsensus, dll. tidak memerlukan akses ke status historis. Pengguna tidak pernah membutuhkan archive node untuk interaksi standar dengan jaringan.

Manfaat utama dari arsip status adalah akses cepat ke kueri tentang status historis. Misalnya, archive node akan segera mengembalikan hasil seperti:

- _Berapa saldo ETH dari akun 0x1337... pada blok 15537393?_
- _Berapa saldo token 0x dalam kontrak 0x pada blok 1920000?_

Seperti dijelaskan di atas, full node perlu menghasilkan data ini dengan eksekusi EVM yang menggunakan CPU dan membutuhkan waktu. Archive node mengaksesnya di disk dan menyajikan respons dengan segera. Ini adalah fitur yang berguna untuk bagian infrastruktur tertentu, misalnya:

- Penyedia layanan seperti penjelajah blok
- Peneliti
- Analis keamanan
- Pengembang dapp
- Audit dan kepatuhan

Ada berbagai [layanan](/developers/docs/nodes-and-clients/nodes-as-a-service/) gratis yang juga memungkinkan akses ke data historis. Karena lebih menuntut untuk menjalankan archive node, akses ini sebagian besar terbatas dan hanya berfungsi untuk akses sesekali. Jika proyek Anda memerlukan akses konstan ke data historis, Anda harus mempertimbangkan untuk menjalankannya sendiri.

## Implementasi dan penggunaan

Archive node dalam konteks ini berarti data yang disajikan oleh klien lapisan eksekusi yang menghadap pengguna karena mereka menangani basis data status dan menyediakan titik akhir JSON-RPC. Opsi konfigurasi, waktu sinkronisasi, dan ukuran basis data dapat bervariasi menurut klien. Untuk detailnya, silakan merujuk ke dokumentasi yang disediakan oleh klien Anda.

Sebelum memulai archive node Anda sendiri, pelajari tentang perbedaan antara klien dan terutama berbagai [persyaratan perangkat keras](/developers/docs/nodes-and-clients/run-a-node/#requirements). Sebagian besar klien tidak dioptimalkan untuk fitur ini dan arsip mereka membutuhkan lebih dari 12TB ruang. Sebaliknya, implementasi seperti Erigon dapat menyimpan data yang sama di bawah 3TB yang menjadikannya cara paling efektif untuk menjalankan archive node.

## Praktik yang disarankan

Selain [rekomendasi umum untuk menjalankan node](/developers/docs/nodes-and-clients/run-a-node/), archive node mungkin lebih menuntut pada perangkat keras dan pemeliharaan. Mempertimbangkan [fitur utama](https://github.com/ledgerwatch/erigon#key-features) Erigon, pendekatan paling praktis adalah menggunakan implementasi klien [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Perangkat keras

Selalu pastikan untuk memverifikasi persyaratan perangkat keras untuk mode tertentu dalam dokumentasi klien.
Persyaratan terbesar untuk archive node adalah ruang disk. Tergantung pada klien, ini bervariasi dari 3TB hingga 12TB. Meskipun HDD mungkin dianggap sebagai solusi yang lebih baik untuk jumlah data yang besar, menyinkronkannya dan terus memperbarui ujung rantai akan membutuhkan drive SSD. Drive [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) sudah cukup baik tetapi harus memiliki kualitas yang andal, setidaknya [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Disk dapat dipasang ke komputer desktop atau server dengan slot yang cukup. Perangkat khusus semacam itu ideal untuk menjalankan node dengan waktu aktif (uptime) tinggi. Sangat mungkin untuk menjalankannya di laptop tetapi portabilitas akan datang dengan biaya tambahan.

Semua data harus muat dalam satu volume, oleh karena itu disk harus digabungkan, mis., dengan [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) atau LVM. Mungkin juga patut dipertimbangkan untuk menggunakan [ZFS](https://en.wikipedia.org/wiki/ZFS) karena mendukung "Copy-on-write" yang memastikan data ditulis dengan benar ke disk tanpa kesalahan tingkat rendah.

Untuk stabilitas dan keamanan lebih dalam mencegah kerusakan basis data yang tidak disengaja, terutama dalam pengaturan profesional, pertimbangkan untuk menggunakan [memori ECC](https://en.wikipedia.org/wiki/ECC_memory) jika sistem Anda mendukungnya. Ukuran RAM umumnya disarankan sama dengan full node tetapi lebih banyak RAM dapat membantu mempercepat sinkronisasi.

Selama sinkronisasi awal, klien dalam mode arsip akan mengeksekusi setiap transaksi sejak genesis. Kecepatan eksekusi sebagian besar dibatasi oleh CPU, sehingga CPU yang lebih cepat dapat membantu waktu sinkronisasi awal. Pada komputer konsumen rata-rata, sinkronisasi awal dapat memakan waktu hingga satu bulan.

## Bacaan lebih lanjut {#further-reading}

- [Ethereum Full Node vs Archive Node](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, September 2022_
- [Building Your Own Ethereum Archive Node](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, Agustus 2021_
- [How to set up Erigon, Erigon’s RPC and TrueBlocks (scrape and API) as services](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, diperbarui September 2022_

## Topik terkait {#related-topics}

- [Node dan klien](/developers/docs/nodes-and-clients/)
- [Menjalankan node](/developers/docs/nodes-and-clients/run-a-node/)