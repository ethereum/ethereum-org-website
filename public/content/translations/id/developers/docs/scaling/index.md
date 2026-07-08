---
title: Penskalaan
description: Pengantar tentang berbagai opsi penskalaan yang saat ini sedang dikembangkan oleh komunitas Ethereum.
lang: id
sidebarDepth: 3
---

## Ikhtisar penskalaan {#scaling-overview}

Seiring bertambahnya jumlah orang yang menggunakan [Ethereum](/), rantai blok telah mencapai batasan kapasitas tertentu. Hal ini telah meningkatkan biaya penggunaan jaringan, menciptakan kebutuhan akan "solusi penskalaan". Ada berbagai solusi yang sedang diteliti, diuji, dan diimplementasikan yang mengambil pendekatan berbeda untuk mencapai tujuan yang serupa.

Tujuan utama dari skalabilitas adalah untuk meningkatkan kecepatan transaksi (finalitas yang lebih cepat) dan laju pemrosesan transaksi (jumlah transaksi per detik yang lebih tinggi) tanpa mengorbankan desentralisasi atau keamanan. Pada rantai blok Ethereum lapisan 1 (l1), permintaan yang tinggi menyebabkan transaksi menjadi lebih lambat dan [harga gas](/developers/docs/gas/) yang tidak masuk akal. Meningkatkan kapasitas jaringan dalam hal kecepatan dan laju pemrosesan adalah hal yang mendasar untuk adopsi massal dan bermakna dari Ethereum.

Meskipun kecepatan dan laju pemrosesan itu penting, sangat penting bahwa solusi penskalaan yang memungkinkan tujuan ini tetap terdesentralisasi dan aman. Menjaga hambatan masuk tetap rendah bagi operator node sangat penting dalam mencegah perkembangan menuju daya komputasi yang terpusat dan tidak aman.

Secara konseptual, pertama-tama kita mengkategorikan penskalaan sebagai penskalaan onchain atau penskalaan offchain.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang semua topik dasar. Mengimplementasikan solusi penskalaan adalah hal yang tingkat lanjut karena teknologinya belum banyak teruji di lapangan, dan terus diteliti serta dikembangkan.

## Penskalaan onchain {#onchain-scaling}

Penskalaan onchain mewajibkan perubahan pada protokol Ethereum ([Mainnet](/glossary/#mainnet) lapisan 1). Untuk waktu yang lama, melakukan sharding pada rantai blok diharapkan dapat menskalakan Ethereum. Hal ini akan melibatkan pemisahan rantai blok menjadi bagian-bagian terpisah (shard) untuk diverifikasi oleh subset validator. Namun, penskalaan dengan rollup lapisan 2 (l2) telah mengambil alih sebagai teknik penskalaan utama. Hal ini didukung oleh penambahan bentuk data baru yang lebih murah yang dilampirkan pada blok Ethereum yang dirancang khusus untuk membuat rollup menjadi murah bagi pengguna.

### Sharding {#sharding}

Sharding adalah proses memisahkan basis data. Subset validator akan bertanggung jawab atas shard individu daripada melacak seluruh Ethereum. Sharding berada di [peta jalan](/roadmap/) Ethereum untuk waktu yang lama, dan pernah dimaksudkan untuk diluncurkan sebelum The Merge ke Bukti Kepemilikan (PoS). Namun, perkembangan pesat [rollup lapisan 2](#layer-2-scaling) dan penemuan [danksharding](/roadmap/danksharding) (menambahkan blob data rollup ke blok Ethereum yang dapat diverifikasi dengan sangat efisien oleh validator) telah mengarahkan komunitas Ethereum untuk lebih memilih penskalaan yang berpusat pada rollup daripada penskalaan dengan sharding. Hal ini juga akan membantu menjaga logika konsensus Ethereum tetap lebih sederhana.

## Penskalaan offchain {#offchain-scaling}

Solusi offchain diimplementasikan secara terpisah dari Mainnet lapisan 1 - solusi ini tidak mewajibkan perubahan pada protokol Ethereum yang ada. Beberapa solusi, yang dikenal sebagai solusi "lapisan 2", memperoleh keamanannya secara langsung dari konsensus Ethereum lapisan 1, seperti [optimistic rollup](/developers/docs/scaling/optimistic-rollups/), [zero-knowledge rollup](/developers/docs/scaling/zk-rollups/), atau [kanal state](/developers/docs/scaling/state-channels/). Solusi lain melibatkan pembuatan rantai baru dalam berbagai bentuk yang memperoleh keamanannya secara terpisah dari Mainnet, seperti [rantai samping](#sidechains), [validium](#validium), atau [rantai Plasma](#plasma). Solusi-solusi ini berkomunikasi dengan Mainnet tetapi memperoleh keamanannya secara berbeda untuk mencapai berbagai tujuan.

### Penskalaan lapisan 2 {#layer-2-scaling}

Kategori solusi offchain ini memperoleh keamanannya dari Mainnet Ethereum.

Lapisan 2 adalah istilah kolektif untuk solusi yang dirancang untuk membantu menskalakan aplikasi Anda dengan menangani transaksi di luar Mainnet Ethereum (lapisan 1) sambil memanfaatkan model keamanan terdesentralisasi yang kuat dari Mainnet. Kecepatan transaksi menurun ketika jaringan sedang sibuk, membuat pengalaman pengguna menjadi buruk untuk jenis aplikasi terdesentralisasi (dapp) tertentu. Dan seiring jaringan menjadi lebih sibuk, harga gas meningkat karena pengirim transaksi bertujuan untuk saling mengalahkan tawaran satu sama lain. Hal ini dapat membuat penggunaan Ethereum menjadi sangat mahal.

Sebagian besar solusi lapisan 2 berpusat di sekitar server atau klaster server, yang masing-masing dapat disebut sebagai node, validator, operator, sekuenser, pembuat blok, atau istilah serupa. Bergantung pada implementasinya, node lapisan 2 ini dapat dijalankan oleh individu, bisnis, atau entitas yang menggunakannya, atau oleh operator pihak ke-3, atau oleh sekelompok besar individu (mirip dengan Mainnet). Secara umum, transaksi dikirimkan ke node lapisan 2 ini alih-alih dikirimkan langsung ke lapisan 1 (Mainnet). Untuk beberapa solusi, instans lapisan 2 kemudian mengelompokkannya ke dalam grup sebelum menambatkannya ke lapisan 1, setelah itu mereka diamankan oleh lapisan 1 dan tidak dapat diubah. Detail tentang bagaimana hal ini dilakukan sangat bervariasi antara teknologi dan implementasi lapisan 2 yang berbeda.

Instans lapisan 2 tertentu mungkin terbuka dan dibagikan oleh banyak aplikasi, atau mungkin disebarkan oleh satu proyek dan didedikasikan untuk mendukung aplikasi mereka saja.

#### Mengapa lapisan 2 dibutuhkan? {#why-is-layer-2-needed}

- Peningkatan transaksi per detik sangat meningkatkan pengalaman pengguna, dan mengurangi kemacetan jaringan di Mainnet Ethereum.
- Transaksi di-rollup menjadi satu transaksi ke Mainnet Ethereum, mengurangi biaya gas bagi pengguna dan membuat Ethereum lebih inklusif dan dapat diakses oleh orang-orang di mana saja.
- Pembaruan apa pun pada skalabilitas tidak boleh mengorbankan desentralisasi atau keamanan – lapisan 2 dibangun di atas Ethereum.
- Terdapat jaringan lapisan 2 khusus aplikasi yang membawa serangkaian efisiensinya sendiri saat bekerja dengan aset dalam skala besar.

[Lebih lanjut tentang lapisan 2](/layer-2/).

#### Rollup {#rollups}

Rollup melakukan eksekusi transaksi di luar lapisan 1 dan kemudian data diposting ke lapisan 1 di mana konsensus dicapai. Karena data transaksi disertakan dalam blok lapisan 1, hal ini memungkinkan rollup diamankan oleh keamanan asli Ethereum.

Ada dua jenis rollup dengan model keamanan yang berbeda:

- **Optimistic rollup**: mengasumsikan transaksi valid secara default dan hanya menjalankan komputasi, melalui [**bukti penipuan**](/glossary/#fraud-proof), jika terjadi tantangan. [Lebih lanjut tentang Optimistic rollup](/developers/docs/scaling/optimistic-rollups/).
- **Zero-knowledge rollup**: menjalankan komputasi secara offchain dan mengirimkan [**bukti validitas**](/glossary/#validity-proof) ke rantai. [Lebih lanjut tentang zero-knowledge rollup](/developers/docs/scaling/zk-rollups/).

#### Kanal state {#channels}

Kanal state memanfaatkan kontrak multisig untuk memungkinkan peserta bertransaksi dengan cepat dan bebas secara offchain, lalu menyelesaikan finalitas dengan Mainnet. Hal ini meminimalkan kemacetan jaringan, biaya, dan penundaan. Dua jenis kanal saat ini adalah kanal state dan kanal pembayaran.

Pelajari lebih lanjut tentang [kanal state](/developers/docs/scaling/state-channels/).

### Rantai samping {#sidechains}

Rantai samping adalah rantai blok independen yang kompatibel dengan EVM yang berjalan secara paralel dengan Mainnet. Rantai ini kompatibel dengan Ethereum melalui jembatan dua arah dan berjalan di bawah aturan konsensus dan parameter blok yang mereka pilih sendiri.

Pelajari lebih lanjut tentang [Rantai samping](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Rantai Plasma adalah rantai blok terpisah yang ditambatkan ke rantai utama Ethereum dan menggunakan bukti penipuan (seperti [optimistic rollup](/developers/docs/scaling/optimistic-rollups/)) untuk menengahi perselisihan.

Pelajari lebih lanjut tentang [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Rantai validium menggunakan bukti validitas seperti zero-knowledge rollup tetapi data tidak disimpan di rantai utama Ethereum lapisan 1. Hal ini dapat menghasilkan 10 ribu transaksi per detik per rantai validium dan beberapa rantai dapat dijalankan secara paralel.

Pelajari lebih lanjut tentang [Validium](/developers/docs/scaling/validium/).

## Mengapa begitu banyak solusi penskalaan yang dibutuhkan? {#why-do-we-need-these}

- Berbagai solusi dapat membantu mengurangi kemacetan keseluruhan pada bagian mana pun dari jaringan dan juga mencegah titik kegagalan tunggal.
- Keseluruhan lebih besar daripada jumlah bagian-bagiannya. Solusi yang berbeda dapat ada dan bekerja secara harmonis, memungkinkan efek eksponensial pada kecepatan dan laju pemrosesan transaksi di masa depan.
- Tidak semua solusi mewajibkan pemanfaatan algoritma konsensus Ethereum secara langsung, dan alternatif dapat menawarkan manfaat yang jika tidak akan sulit diperoleh.

## Lebih suka belajar secara visual? {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_Perhatikan bahwa penjelasan dalam video menggunakan istilah "Lapisan 2" untuk merujuk pada semua solusi penskalaan offchain, sementara kami membedakan "Lapisan 2" sebagai solusi offchain yang memperoleh keamanannya melalui konsensus Mainnet lapisan 1._

<VideoWatch slug="rollups-scaling-strategy" />

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum yang berpusat pada rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Analitik terkini tentang solusi penskalaan Lapisan 2 untuk Ethereum](https://www.l2beat.com/)
- [Mengevaluasi Solusi Penskalaan lapisan 2 Ethereum: Kerangka Kerja Perbandingan](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Panduan Tidak Lengkap tentang Rollup](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollup yang Didukung Ethereum: Penakluk Dunia](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistic Rollup vs ZK Rollup](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Mengapa rollup + shard data adalah satu-satunya solusi berkelanjutan untuk skalabilitas tinggi](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Lapisan 3 seperti apa yang masuk akal?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Ketersediaan Data Atau: Bagaimana Rollup Belajar Berhenti Khawatir dan Mencintai Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Panduan Praktis untuk Rollup Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Tutorial: Membangun Lapisan 2 yang dapat diskalakan di Ethereum {#tutorials}

- [Semua yang dapat Anda cache](/developers/tutorials/all-you-can-cache/) _– Cara membangun dan menggunakan kontrak caching untuk mengurangi biaya data panggilan pada rollup._
- [ABI Pendek untuk Pengoptimalan Data Panggilan](/developers/tutorials/short-abi/) _– Cara menggunakan ABI yang lebih pendek untuk mengurangi biaya data panggilan untuk transaksi lapisan 2._