---
title: Penskalaan
description: Pengenalan tentang opsi penskalaan berbeda yang sedang dikembangkan saat ini oleh komunitas Ethereum.
lang: id
---

## Gambaran umum penskalaan {#scaling-overview}

Seiring bertambahnya jumlah orang yang menggunakan Ethereum, blockchain telah mencapai batasan kapasitas tertentu. Ini telah menaikkan biaya penggunaan jaringan, menimbulkan kebutuhan akan "solusi penskalaan." Ada beberapa solusi yang sedang diteliti, diuji, dan diimplementasikan yang menggunakan pendekatan berbeda untuk mencapai tujuan yang sama.

Tujuan utama skalabilitas adalah untuk meningkatkan kecepatan transaksi (finalitas lebih cepat), dan keluaran transaksi (transaksi tinggi per detik), tanpa mengorbankan desentralisasi atau keamanan (selengkapnya di [visi Ethereum](/upgrades/vision/)). Pada blockchain Ethereum lapisan 1, permintaan yang tinggi menyebabkan transaksi yang lebih lambat dan harga gas yang tidak stabil. Meningkatkan kapasitas jaringan dalam hal kecepatan dan throughput sangat penting untuk adopsi Ethereum yang bermakna dan massal.

Meskipun kecepatan dan throughput penting, solusi penskalaan yang memungkinkan tujuan ini tetap terdesentralisasi dan aman juga penting. Menjaga agar hambatan masuk tetap rendah bagi operator node sangat penting dalam mencegah kemajuan menuju daya komputasi yang terpusat dan tidak aman.

Secara konseptual, pertama-tama kami mengategorikan penskalaan sebagai penskalaan on-chain atau penskalaan off-chain.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang semua topik dasar. Menerapkan solusi penskalaan memerlukan pemahaman tingkat lanjut karena teknologinya kurang teruji, dan masih terus diteliti dan dikembangkan.

## Penskalaan On-Chain {#on-chain-scaling}

Metode penskalaan ini memerlukan perubahan pada protokol Ethereum (lapisan 1 [Jaringan Utama](/glossary/#mainnet)). Sharding saat ini menjadi fokus utama untuk metode penskalaan ini.

### Sharding {#sharding}

Sharding adalah proses pemisahan basis data secara horizontal untuk menyebarkan muatan. Dalam konteks Ethereum, sharding akan mengurangi kemacetan jaringan dan meningkatkan transaksi per detik dengan membuat rantai baru, yang dikenal sebagai “shard.” Ini juga akan meringankan beban setiap validator yang tidak lagi diharuskan untuk memroses keseluruhan transaksi di seluruh jaringan.

Pelajari lebih lanjut tentang [sharding](/upgrades/sharding/).

## Penskalaan off-chain {#off-chain-scaling}

Solusi off-chain diimplementasikan secara terpisah dari Jaringan Utama lapisan 1 - solusi ini tidak memerlukan perubahan pada protokol Ethereum yang telah ada. Beberapa solusi, yang dikenal sebagai solusi "lapisan 2", memperoleh keamanannya langsung dari konsensus Ethereum lapisan 1, seperti [rollup](/developers/docs/scaling/layer-2-rollups/) atau [kanal state](/developers/docs/scaling/state-channels/). Solusi lain melibatkan pembuatan rantai baru dalam berbagai bentuk yang memperoleh keamanannya secara terpisah dari Jaringan Utama, seperti [sidechain](#sidechains) atau rantai [plasma](#plasma). Solusi ini berkomunikasi dengan Jaringan Utama, tetapi memperoleh keamanannya secara berbeda untuk mencapai berbagai tujuan.

### Penskalaan lapisan 2 {#layer-2-scaling}

Kategori solusi off-chain ini mendapatkan keamanannya dari Ethereum Jaringan Utama.

Sebagian besar solusi lapisan 2 berpusat di sekitar server atau sekelompok server, yang masing-masing dapat disebut sebagai node, validator, operator, sequencer, produser blok, atau istilah serupa. Bergantung pada implementasinya, node lapisan 2 ini dapat dijalankan oleh individu, bisnis, atau entitas yang menggunakannya, atau oleh operator pihak ketiga, atau oleh sekelompok besar individu (mirip dengan Jaringan Utama). Secara umum, transaksi dikirimkan ke node lapisan 2 ini alih-alih dikirimkan langsung ke lapisan 1 (Jaringan Utama). Untuk beberapa solusi, instance lapisan 2 kemudian mengelompokkannya ke dalam kelompok-kelompok sebelum menambatkannya ke lapisan 1, setelah itu mereka diamankan oleh lapisan 1 dan tidak dapat diubah. Detail tentang bagaimana hal ini dilakukan sangat bervariasi antara teknologi dan implementasi lapisan 2 yang berbeda.

Instance lapisan 2 tertentu dapat dibuka dan dibagikan oleh banyak aplikasi, atau dapat digunakan oleh satu proyek dan didedikasikan hanya untuk mendukung aplikasinya.

#### Rollup {#rollups}

Rollup melakukan eksekusi transaksi di luar lapisan 1 dan kemudian data diposting ke lapisan 1 di mana konsensus tercapai. Karena data transaksi termasuk dalam blok lapisan 1, ini memungkinkan rollup diamankan oleh keamanan Ethereum asli.

- [Rollup ZK](/developers/docs/scaling/layer-2-rollups/#zk-rollups)
- [Rollup optimistic](/developers/docs/scaling/layer-2-rollups/#optimistic-rollups)

Pelajari lebih lanjut tentang [rollup](/developers/docs/scaling/layer-2-rollups/).

#### Kanal state {#channels}

Kanal state menggunakan kontrak multisig untuk memungkinkan peserta bertransaksi off-chain dengan cepat dan bebas, kemudian menyelesaikan finalitasnya dengan Jaringan Utama. Ini mengurangi kemacetan, biaya, dan penundaan jaringan. Dua jenis kanal saat ini adalah kanal state dan kanal pembayaran.

Pelajari lebih lanjut tentang [kanal state](/developers/docs/scaling/state-channels/).

### Sidechain {#sidechains}

Sidechain adalah blokchain independen yang kompatibel dengan EVM yang beroperasi secara paralel dengan Jaringan Utama. Ini kompatibel dengan Ethereum melalui jembatan dua arah, dan beroperasi di bawah aturan konsensus terpilih, dan parameter blok mereka.

Pelajari lebih lanjut tentang [Sidechain](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Rantai plasma adalah blockchain terpisah yang ditambatkan ke rantai Ethereum utama, dan menggunakan bukti penipuan (seperti [rollup Optimistic](/developers/docs/scaling/layer-2-rollups/#optimistic-rollups)) untuk menengahi perselisihan.

Pelajari lebih lanjut tentang [Plasma](/developers/docs/scaling/plasma/).

## Mengapa begitu banyak solusi penskalaan yang dibutuhkan? {#why-do-we-need-these}

- Beberapa solusi dapat membantu mengurangi kemacetan secara keseluruhan pada salah satu bagian jaringan, dan juga mencegah satu titik kegagalan.
- Keseluruhannya lebih besar dari jumlah bagian-bagiannya. Berbagai solusi bisa ada dan bekerja dalam harmoni, memungkinkan efek yang sangat besar terhadap kecepatan dan throughput di masa depan.
- Tidak semua solusi memerlukan penggunaan algoritma konsensus Ethereum secara langsung, dan berbagai alternatif bisa menawarkan manfaat yang tanpanya akan sulit untuk diperoleh.
- Tidak ada satu pun solusi penskalaan yang cukup untuk memenuhi [visi Ethereum](/upgrades/vision/).

## Selengkapnya tentang pelajar visual? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Perhatikan penjelasan dalam video ini menggunakan istilah "Lapisan 2" untuk merujuk pada semua solusi penskalaan off-chain, sedangkan kami membedakan "Lapisan 2" sebagai sebuah solusi off-chain yang mendapat keamanannya lewat konsensus Jaringan Utama lapisan 1._

## Bacaan lebih lanjut {#further-reading}

- [Roadmap Ethereum rollup-centric](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Analitik terbaru tentang solusi penskalaan Lapisan 2 untuk Ethereum](https://www.l2beat.com/)
- [Mengevaluasi Solusi Penskalaan lapisan 2 Ethereum: Kerangka Kerja Perbandingan](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Panduan Tidak Lengkap tentang Rollup](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Rollup ZK yang digerakkan Ethereum: Yang Terbaik di Kelasnya](https://hackmd.io/@canti/rkUT0BD8K)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
