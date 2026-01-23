---
title: Penskalaan
description: Pengenalan tentang opsi penskalaan berbeda yang sedang dikembangkan saat ini oleh komunitas Ethereum.
lang: id
sidebarDepth: 3
---

## Ikhtisar penskalaan {#scaling-overview}

Seiring bertambahnya jumlah orang yang menggunakan Ethereum, blockchain telah mencapai batasan kapasitas tertentu. Ini telah menaikkan biaya penggunaan jaringan, menimbulkan kebutuhan akan "solusi penskalaan." Ada beberapa solusi yang sedang diteliti, diuji, dan diimplementasikan yang menggunakan pendekatan berbeda untuk mencapai tujuan yang sama.

Tujuan utama skalabilitas adalah untuk meningkatkan kecepatan transaksi (finalitas yang lebih cepat) dan keluaran transaksi (transaksi per detik yang lebih tinggi) tanpa mengorbankan desentralisasi atau keamanan. Di blockchain Ethereum lapisan 1, permintaan yang tinggi menyebabkan transaksi menjadi lebih lambat dan [harga gas](/developers/docs/gas/) menjadi tidak terjangkau. Meningkatkan kapasitas jaringan dalam hal kecepatan dan throughput sangat penting untuk adopsi Ethereum yang bermakna dan massal.

Meskipun kecepatan dan throughput penting, solusi penskalaan yang memungkinkan tujuan ini tetap terdesentralisasi dan aman juga penting. Menjaga agar hambatan masuk tetap rendah bagi operator node sangat penting dalam mencegah kemajuan menuju daya komputasi yang terpusat dan tidak aman.

Secara konseptual, pertama-tama kita mengkategorikan skalabilitas sebagai skalabilitas on-chain atau off-chain.

## Persyaratan {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang semua topik dasar. Menerapkan solusi penskalaan memerlukan pemahaman tingkat lanjut karena teknologinya kurang teruji, dan masih terus diteliti dan dikembangkan.

## Penskalaan di dalam rantai {#onchain-scaling}

Penskalaan di dalam rantai memerlukan perubahan pada protokol Ethereum (lapisan 1 [Mainnet](/glossary/#mainnet)). Untuk waktu yang lama, sharding blockchain diharapkan dapat meningkatkan scale Ethereum. Ini akan melibatkan pemecahan blockchain menjadi bagian-bagian terpisah (shard) yang diverifikasi oleh subkelompok validator. Namun demikian, scaling dengan rollups layer-2 telah mengambil alih sebagai teknik scaling utama. Hal ini didukung oleh penambahan bentuk data baru yang lebih murah yang dilampirkan pada blok Ethereum, yang dirancang khusus untuk membuat rollup lebih hemat biaya bagi pengguna.

### Pecahan {#sharding}

Sharding adalah proses pemisahan basis data. Subkelompok validator akan bertanggung jawab atas shard tertentu, alih-alih memantau seluruh jaringan Ethereum. Sharding sudah lama ada di [peta jalan](/roadmap/) Ethereum, dan pernah dimaksudkan untuk diluncurkan sebelum The Merge ke proof-of-stake. Namun, perkembangan pesat [rollup lapisan 2](#layer-2-scaling) dan penemuan [Danksharding](/roadmap/danksharding) (menambahkan blob data rollup ke blok Ethereum yang dapat diverifikasi dengan sangat efisien oleh validator) telah membuat komunitas Ethereum lebih memilih penskalaan yang berpusat pada rollup daripada penskalaan dengan sharding. Ini juga akan membantu menjaga logika konsensus Ethereum tetap sederhana.

## Penskalaan di luar rantai {#offchain-scaling}

Solusi offchain diimplementasikan secara terpisah dari Layer 1 Mainnet — mereka tidak memerlukan perubahan pada protokol Ethereum yang ada. Beberapa solusi, yang dikenal sebagai solusi "lapisan 2", memperoleh keamanannya langsung dari konsensus Ethereum lapisan 1, seperti [optimistic rollup](/developers/docs/scaling/optimistic-rollups/), [zero-knowledge rollup](/developers/docs/scaling/zk-rollups/), atau [kanal state](/developers/docs/scaling/state-channels/). Solusi lain melibatkan pembuatan rantai baru dalam berbagai bentuk yang memperoleh keamanannya secara terpisah dari Mainnet, seperti [sidechain](#sidechains), [validium](#validium), atau [rantai plasma](#plasma). Solusi-solusi ini berkomunikasi dengan Mainnet tetapi mengambil keamanan mereka dengan cara berbeda untuk mencapai berbagai tujuan.

### Penskalaan lapisan 2 {#layer-2-scaling}

Solusi off-chain jenis ini mengambil keamanan dari Ethereum Mainnet.

Layer 2 adalah istilah kolektif untuk solusi yang dirancang untuk membantu meningkatkan skala aplikasi Anda dengan menangani transaksi di luar Ethereum Mainnet (lapisan 1), sambil memanfaatkan model keamanan terdesentralisasi yang kuat dari Mainnet. Kecepatan transaksi menurun saat jaringan sedang sibuk, sehingga pengalaman pengguna menjadi kurang baik untuk jenis dapp tertentu. Dan ketika jaringan semakin sibuk, harga gas meningkat karena pengirim transaksi bertujuan untuk mengalahkan satu sama lain. Ini dapat menyebabkan penggunaan Ethereum menjadi sangat mahal.

Sebagian besar solusi layer 2 berpusat pada satu server atau sekumpulan server, yang masing-masing dapat disebut sebagai node, validator, operator, sequencer, produser blok, atau istilah serupa. Tergantung pada implementasinya, node layer 2 ini bisa dijalankan oleh individu, perusahaan, atau entitas yang menggunakannya, oleh operator pihak ketiga, atau oleh sekelompok besar individu (mirip dengan Mainnet). Secara umum, transaksi dikirimkan ke node layer 2 ini alih-alih dikirim langsung ke layer 1 (Mainnet). Untuk beberapa solusi, instance layer 2 kemudian mengelompokkan transaksi menjadi batch sebelum menambatkannya ke layer 1, setelah itu transaksi tersebut dijamin oleh layer 1 dan tidak dapat diubah. Rincian tentang bagaimana hal ini dilakukan sangat bervariasi antara teknologi dan implementasi layer 2 yang berbeda.

Sebuah instance layer 2 tertentu dapat bersifat terbuka dan digunakan bersama oleh banyak aplikasi, atau dapat dikerahkan oleh satu proyek dan didedikasikan hanya untuk mendukung aplikasi mereka saja.

#### Kenapa lapisan 2 dibutuhkan? {#why-is-layer-2-needed}

- Peningkatan jumlah transaksi per detik secara signifikan meningkatkan pengalaman pengguna dan mengurangi kemacetan jaringan di Ethereum Mainnet.
- Transaksi digabungkan menjadi satu transaksi tunggal ke Ethereum Mainnet, sehingga mengurangi biaya gas bagi pengguna dan membuat Ethereum lebih inklusif serta mudah diakses oleh orang di seluruh dunia.
- Setiap pembaruan skalabilitas tidak boleh mengorbankan aspek desentralisasi atau keamanan – lapisan 2 dibangun di atas Ethereum.
- Ada jaringan layer 2 khusus aplikasi yang menghadirkan efisiensi tersendiri ketika bekerja dengan aset dalam skala besar.

[Selengkapnya tentang lapisan 2](/layer-2/).

#### Rollup {#rollups}

Rollup mengeksekusi transaksi di luar layer 1, kemudian data tersebut diposting ke layer 1 di mana konsensus dicapai. Karena data transaksi disertakan dalam blok layer 1, hal ini memungkinkan rollup diamankan oleh keamanan bawaan Ethereum.

Ada dua jenis rollup dengan model keamanan yang berbeda:

- **Optimistic rollup**: mengasumsikan transaksi valid secara default dan hanya menjalankan komputasi, melalui sebuah [**bukti penipuan**](/glossary/#fraud-proof), jika ada sanggahan. [Selengkapnya tentang Optimistic rollup](/developers/docs/scaling/optimistic-rollups/).
- **Zero-knowledge rollup**: menjalankan komputasi di luar rantai dan mengirimkan [**bukti validitas**](/glossary/#validity-proof) ke rantai. [Selengkapnya tentang zero-knowledge rollup](/developers/docs/scaling/zk-rollups/).

#### Saluran state{#channels}

Saluran status menggunakan kontrak multisig untuk memungkinkan peserta bertransaksi dengan cepat dan bebas di luar rantai, kemudian menyelesaikan finalitasnya di Mainnet. Ini mengurangi kemacetan, biaya, dan penundaan jaringan. Dua jenis kanal saat ini adalah kanal state dan kanal pembayaran.

Pelajari lebih lanjut tentang [kanal state](/developers/docs/scaling/state-channels/).

### Sidechain {#sidechains}

Sidechain adalah blockchain independen yang kompatibel dengan EVM dan berjalan paralel dengan Mainnet. Sidechain ini kompatibel dengan Ethereum melalui jembatan dua arah dan berjalan dengan aturan konsensus serta parameter blok yang dipilih sendiri.

Pelajari lebih lanjut tentang [Sidechain](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Rantai plasma adalah blockchain terpisah yang terhubung ke rantai utama Ethereum dan menggunakan bukti penipuan (seperti [optimistic rollup](/developers/docs/scaling/optimistic-rollups/)) untuk menengahi perselisihan.

Pelajari lebih lanjut tentang [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Validium chain menggunakan validity proofs seperti zero-knowledge rollups, tetapi datanya tidak disimpan di layer 1 Ethereum. Ini dapat memungkinkan 10 ribu transaksi per detik per Validium chain, dan beberapa chain dapat dijalankan secara paralel.

Pelajari lebih lanjut tentang [Validium](/developers/docs/scaling/validium/).

## Mengapa begitu banyak solusi penskalaan yang dibutuhkan? {#why-do-we-need-these}

- Beberapa solusi dapat membantu mengurangi kemacetan keseluruhan pada bagian mana pun dari jaringan sekaligus mencegah titik kegagalan tunggal.
- Keseluruhannya lebih besar dari jumlah bagian-bagiannya. Berbagai solusi bisa bersama-sama ada dan bekerja secara harmonis, memungkinkan efek eksponensial pada kecepatan transaksi dan throughput di masa depan.
- Tidak semua solusi memerlukan penggunaan langsung algoritma konsensus Ethereum, dan alternatif dapat menawarkan manfaat yang sulit diperoleh jika menggunakan konsensus utama.

## Selengkapnya tentang pelajar visual? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Perlu dicatat, penjelasan dalam video menggunakan istilah "Layer 2" untuk merujuk pada semua solusi penskalaan offchain, sementara kita membedakan "Layer 2" sebagai solusi offchain yang mengambil keamanan dari konsensus Mainnet Layer 1._

<YouTube id="7pWxCklcNsU" />

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum yang berpusat pada rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Analitik terkini tentang solusi penskalaan Lapisan 2 untuk Ethereum](https://www.l2beat.com/)
- [Mengevaluasi Solusi Penskalaan Lapisan 2 Ethereum: Kerangka Kerja Perbandingan](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Panduan Tidak Lengkap untuk Rollup](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollup yang didukung Ethereum: Terbaik di Dunia](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistic Rollup vs ZK Rollup](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Mengapa rollup + shard data adalah satu-satunya solusi berkelanjutan untuk skalabilitas tinggi](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Lapisan 3 seperti apa yang masuk akal?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Data Availability Or: How Rollups Learned To Stop Worrying And Love Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Panduan Praktis untuk Rollup Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
