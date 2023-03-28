---
title: Data dan analitik
description: Cara mendapatkan data dan analitik on-chain untuk digunakan di dapp Anda
lang: id
---

## Pendahuluan {#Introduction}

Karena pemanfaatan jaringan terus berkembang, peningkatan jumlah informasi berharga akan ada dalam data on-chain. Karena volume data meningkat dengan cepat, menghitung dan menggabungkan informasi ini untuk dilaporkan atau mendorong fungsi dApp dapat menjadi upaya yang memakan banyak waktu dan proses.

Memanfaatkan penyedia data yang ada dapat mempercepat pengembangan, menghasilkan hasil yang lebih akurat, dan mengurangi upaya pemeliharaan yang sedang berlangsung. Ini akan memungkinkan tim untuk berkonsentrasi pada fungsionalitas inti yang coba disediakan oleh proyek mereka.

## Prasyarat {#prerequisites}

Anda harus memahami konsep dasar [Penjelajah Blok](/developers/docs/data-and-analytics/block-explorers/) untuk lebih memahami penggunaannya dalam konteks analisis data. Selain itu, biasakan diri Anda dengan konsep [indeks](/glossary/#index) untuk memahami keuntungan yang ditambahkannya ke desain sistem.

Dalam hal dasar arsitektur, memahami apa itu [API](https://www.wikipedia.org/wiki/API) dan [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), bahkan dalam teori.

## The Graph {#the-graph}

[Graph Network](https://thegraph.com/) adalah protokol pembuatan indeks terdesentralisasi untuk mengatur data blockchain. Alih-alih membangun dan mengelola penyimpanan data off-chain dan terpusat untuk menggabungkan data on-chain, dengan The Graph, pengembang dapat membangun aplikasi tanpa server yang berjalan sepenuhnya di infrastruktur publik.

Dengan menggunakan [GraphQL](https://graphql.org/), pengembang dapat membuat kueri salah satu API terbuka yang dikurasi, yang dikenal sebagai sub-grafik, dikenal sebagai sub-grafik, untuk memperoleh informasi yang mereka butuhkan untuk menjalankan dApp mereka. Dengan membuat kueri sub-grafik yang diindeks ini, Laporan dan dApp tidak hanya mendapatkan manfaat kinerja dan skalabilitas, tetapi juga akurasi bawaan yang disediakan oleh konsensus jaringan. Karena peningkatan baru dan/atau sub-grafik ditambahkan ke jaringan, proyek Anda bisa melakukan proses pengulangan dengan cepat untuk memanfaatkan penguatan ini.

## Penjelajah blok {#block-explorers}

Banyak [Penjelajah Blok](/developers/docs/data-and-analytics/block-explorers/) menawarkan gateway [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) yang akan memberikan visibilitas bagi pengembang ke data waktu nyata di blok, transaksi, penambang, akun, dan aktivitas on-chain lainnya.

Pengembang kemudian dapat memroses dan mengubah data ini untuk memberikan wawasan dan interaksi unik kepada pengguna mereka dengan [blockchain](/glossary/#blockchain).

## Bacaan Lebih Lanjut {#further-reading}

- [Gambaran Umum Graph Network](https://thegraph.com/docs/network#overview)
- [Playground Query Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Contoh kode API pada EtherScan](https://etherscan.io/apis#contracts)
