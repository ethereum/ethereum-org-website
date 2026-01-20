---
title: Node Arsip Ethereum
description: Ikhtisar node arsip
lang: id
sidebarDepth: 2
---

Node arsip adalah sebuah contoh klien Ethereum yang dikonfigurasikan untuk membangun arsip dari semua status historis. Ini adalah alat yang berguna untuk kasus penggunaan tertentu, tetapi mungkin lebih rumit untuk dijalankan daripada node penuh.

## Persyaratan {#prerequisites}

Anda harus memahami konsep [simpul Ethereum](/developers/docs/nodes-and-clients/), [arsitekturnya](/developers/docs/nodes-and-clients/node-architecture/), [strategi sinkronisasi](/developers/docs/nodes-and-clients/#sync-modes), praktik [menjalankan](/developers/docs/nodes-and-clients/run-a-node/) dan [menggunakannya](/developers/docs/apis/json-rpc/).

## Apa itu node arsip

Untuk memahami pentingnya node arsip, mari perjelas konsep dari "status." Ethereum dapat disebut sebagai _mesin state berbasis transaksi_. Ini terdiri dari akun dan aplikasi yang mengeksekusi transaksi yang mengubah statusnya. Data global dengan informasi tentang setiap akun dan kontrak disimpan dalam database trie yang disebut status. Hal ini dikelola oleh klien lapisan eksekusi (EL) dan mencakup:

- Saldo akun dan nonce
- Kode kontrak dan penyimpanan
- Data terkait konsensus, mis., Staking Deposit Contract

Untuk berinteraksi dengan jaringan, memverifikasi dan menghasilkan blok baru, klien Ethereum harus mengikuti perubahan terbaru (ujung dari chain) dan oleh karenanya status saat ini. Klien lapisan eksekusi yang dikonfigurasi sebagai simpul penuh memverifikasi dan mengikuti status jaringan terbaru tetapi hanya menyimpan beberapa status terakhir, mis., status yang terkait dengan 128 blok terakhir, sehingga dapat menangani reorg rantai dan memberikan akses cepat ke data terbaru. Status terakhir adalah apa yang dibutuhkan oleh semua klien untuk memverifikasi transaksi yang masuk dan menggunakan jaringan.

Anda dapat membayangkan status sebagai snapshot jaringan sesaat pada blok tertentu dan arsip sebagai pemutaran ulang sejarah.

Status historis dapat dipangkas dengan aman karena mereka tidak diperlukan untuk jaringan agar dapat beroperasi dan akan menjadi tidak berguna bagi klien untuk menyimpan semua data yang usang. Status yang ada sebelum beberapa blok terbaru (mis., 128 blok sebelum blok teratas) secara efektif akan dibuang. Node penuh hanya menyimpan data historis blockchain (blok dan transaksi) dan sesekali snapshot historis yang dapat mereka gunakan untuk membuat ulang status yang lama berdasarkan permintaan. Mereka melakukan ini dengan mengeksekusi ulang transaksi sebelumnya di EVM, yang dapat menuntut secara komputasi ketika status yang diinginkan jauh dari snapshot terdekat.

Namun, ini berarti bahwa mengakses status historis pada node penuh menghabiskan banyak komputasi. Klien mungkin perlu mengeksekusi semua transaksi sebelumnya dan menghitung satu status historis dari genesis. Node arsip memecahkan hal ini dengan menyimpan tidak hanya status terbaru tetapi juga setiap status historis yang dibuat setelah setiap blok. Pada dasarnya, hal ini membuat pertukaran dengan kebutuhan ruang disk yang lebih besar.

Penting untuk dicatat bahwa jaringan tidak bergantung pada node arsip untuk menyimpan dan menyediakan semua data historis. Seperti yang disebutkan di atas, semua status historis sementara waktu dapat diturunkan pada node penuh. Transaksi disimpan oleh setiap node penuh (saat ini kurang dari 400G) dan dapat mengulang untuk membangun seluruh arsip.

### Kasus penggunaan

Penggunaan rutin Ethereum seperti mengirim transaksi, menyebarkan kontrak, memverifikasi konsensus, dll. Tidak memerlukan akses ke status historis. Pengguna tidak pernah membutuhkan node arsip untuk interaksi standar dengan jaringan.

Manfaat utama dari status arsip adalah akses cepat ke kueri mengenai status historis. Sebagai contoh, node arsip akan segera mengembalikan hasil seperti:

- _Berapakah saldo ETH dari akun 0x1337... di blok 15537393?_
- _Berapakah saldo token 0x dalam kontrak 0x di blok 1920000?_

Seperti yang dijelaskan di atas, sebuah node penuh perlu menghasilkan data ini dengan eksekusi EVM yang menggunakan CPU dan membutuhkan waktu. Simpul arsip mengaksesnya di disk dan memberikan respons dengan segera. Ini adalah fitur yang berguna untuk bagian infrastruktur tertentu, misalnya:

- Penyedia layanan seperti penjelajah blok
- Penelitian
- Analis keamanan
- Pengembang dapp
- Audit dan kepatuhan

Ada berbagai [layanan](/developers/docs/nodes-and-clients/nodes-as-a-service/) gratis yang juga memungkinkan akses ke data historis. Karena menjalankan node arsip lebih banyak menuntut, akses ini sebagian besar terbatas dan hanya berfungsi untuk akses sesekali. Jika proyek Anda membutuhkan akses konstan ke data historis, Anda harus mempertimbangkan untuk menjalankannya sendiri.

## Implementasi dan penggunaan

Node arsip dalam konteks ini berarti data yang disampaikan oleh pengguna yang menghadapi klien lapisan eksekusi saat mereka menangani database status dan menyediakan titik akhir JSON-RPC. Opsi konfigurasi, waktu sinkronisasi dan ukuran database dapat bervariasi tergantung pada klien. Untuk detailnya, silakan merujuk ke dokumentasi yang disediakan oleh klien Anda.

Sebelum memulai simpul arsip Anda sendiri, pelajari tentang perbedaan antara para klien dan terutama berbagai [persyaratan perangkat keras](/developers/docs/nodes-and-clients/run-a-node/#requirements). Sebagian besar klien tidak dioptimalkan untuk fitur ini dan arsip mereka memerlukan ruang lebih dari 12TB. Sebaliknya, implementasi seperti Erigon dapat menyimpan data yang sama di bawah 3TB yang membuatnya menjadi cara paling efektif untuk menjalankan node arsip.

## Praktik yang direkomendasikan

Selain [rekomendasi umum untuk menjalankan simpul](/developers/docs/nodes-and-clients/run-a-node/), simpul arsip mungkin lebih menuntut pada perangkat keras dan pemeliharaan. Mempertimbangkan [fitur utama](https://github.com/ledgerwatch/erigon#key-features) Erigon, pendekatan yang paling praktis adalah menggunakan implementasi klien [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Perangkat keras

Selalu pastikan untuk memverifikasi persyaratan perangkat keras untuk mode tertentu dalam dokumentasi klien.
Kebutuhan terbesar untuk node arsip adalah ruang disk. Tergantung pada klien, itu bervariasi dari 3TB hingga 12TB. Bahkan jika HDD dapat dianggap sebagai solusi yang lebih baik untuk data dalam jumlah besar, namun untuk menyinkronkan dan terus memperbarui kepala rantai akan membutuhkan drive SSD. Drive [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) sudah cukup baik tetapi harus memiliki kualitas yang andal, setidaknya [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Disk dapat dipasang ke komputer desktop atau server dengan slot yang cukup. Perangkat khusus seperti itu sangat ideal untuk menjalankan node dengan waktu kerja yang tinggi. Sangat memungkinkan untuk menjalankannya di laptop, tetapi portabilitasnya akan dikenakan biaya tambahan.

Semua data harus muat dalam satu volume, oleh karena itu disk harus digabungkan, mis., dengan [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) atau LVM. Mungkin juga ada baiknya mempertimbangkan penggunaan [ZFS](https://en.wikipedia.org/wiki/ZFS) karena mendukung "Copy-on-write" yang memastikan data ditulis dengan benar ke disk tanpa kesalahan tingkat rendah.

Untuk stabilitas dan keamanan yang lebih baik dalam mencegah kerusakan basis data yang tidak disengaja, terutama dalam pengaturan profesional, pertimbangkan untuk menggunakan [memori ECC](https://en.wikipedia.org/wiki/ECC_memory) jika sistem Anda mendukungnya. Ukuran RAM umumnya disarankan sama seperti untuk node penuh, tetapi lebih banyak RAM dapat membantu mempercepat sinkronisasi.

Selama sinkronisasi awal, klien dalam mode arsip akan mengeksekusi setiap transaksi sejak genesis. Kecepatan eksekusi sebagian besar dibatasi oleh CPU, sehingga CPU yang lebih cepat dapat membantu waktu sinkronisasi awal. Pada rata-rata komputer konsumen, sinkronisasi awal dapat memakan waktu hingga satu bulan.

## Bacaan lebih lanjut {#further-reading}

- [Simpul Penuh Ethereum vs Simpul Arsip](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, September 2022_
- [Membangun Simpul Arsip Ethereum Anda Sendiri](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, Agustus 2021_
- [Cara menyiapkan Erigon, RPC Erigon, dan TrueBlocks (scrape dan API) sebagai layanan](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, diperbarui September 2022_

## Topik terkait {#related-topics}

- [Simpul dan klien](/developers/docs/nodes-and-clients/)
- [Menjalankan simpul](/developers/docs/nodes-and-clients/run-a-node/)
