---
title: Peningkatan
description: Pengantar tentang berbagai opsi peningkatan yang saat ini sedang dikembangkan oleh komunitas Ethereum.
lang: id
sidebarDepth: 3
---

## Ringkasan peningkatan {#scaling-overview}

Seiring bertambahnya jumlah orang yang menggunakan [Ethereum](/), blockchain telah mencapai batasan kapasitas tertentu. Hal ini telah meningkatkan biaya penggunaan jaringan, menciptakan kebutuhan akan "solusi peningkatan". Ada berbagai solusi yang sedang diteliti, diuji, dan diimplementasikan yang mengambil pendekatan berbeda untuk mencapai tujuan yang serupa.

Tujuan utama dari skalabilitas adalah untuk meningkatkan kecepatan transaksi (finalitas yang lebih cepat) dan throughput transaksi (jumlah transaksi per detik yang lebih tinggi) tanpa mengorbankan desentralisasi atau keamanan. Pada blockchain Ethereum layer 1, permintaan yang tinggi menyebabkan transaksi menjadi lebih lambat dan [harga gas](/developers/docs/gas/) yang tidak layak. Meningkatkan kapasitas jaringan dalam hal kecepatan dan throughput adalah hal mendasar untuk adopsi Ethereum yang bermakna dan massal.

Meskipun kecepatan dan throughput itu penting, sangat penting bahwa solusi peningkatan yang memungkinkan tujuan ini tetap terdesentralisasi dan aman. Menjaga hambatan masuk tetap rendah bagi operator node sangat penting dalam mencegah perkembangan menuju daya komputasi yang terpusat dan tidak aman.

Secara konseptual, pertama-tama kita mengkategorikan peningkatan sebagai peningkatan onchain atau peningkatan offchain.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang semua topik dasar. Mengimplementasikan solusi peningkatan adalah hal yang tingkat lanjut karena teknologinya belum banyak teruji, dan terus diteliti serta dikembangkan.

## Peningkatan onchain {#onchain-scaling}

Peningkatan onchain memerlukan perubahan pada protokol Ethereum (layer 1 [Mainnet](/glossary/#mainnet)). Untuk waktu yang lama, sharding blockchain diharapkan dapat meningkatkan Ethereum. Ini akan melibatkan pemisahan blockchain menjadi bagian-bagian terpisah (shard) untuk diverifikasi oleh subset validator. Namun, peningkatan dengan rollup layer 2 telah mengambil alih sebagai teknik peningkatan utama. Hal ini didukung oleh penambahan bentuk data baru yang lebih murah yang dilampirkan pada blok Ethereum yang dirancang khusus untuk membuat rollup menjadi murah bagi pengguna.

### Sharding {#sharding}

Sharding adalah proses pemisahan basis data. Subset validator akan bertanggung jawab atas shard individu daripada melacak seluruh Ethereum. Sharding berada di [peta jalan](/roadmap/) Ethereum untuk waktu yang lama, dan pernah dimaksudkan untuk diluncurkan sebelum The Merge ke proof-of-stake. Namun, perkembangan pesat [rollup layer 2](#layer-2-scaling) dan penemuan [Danksharding](/roadmap/danksharding) (menambahkan blob data rollup ke blok Ethereum yang dapat diverifikasi dengan sangat efisien oleh validator) telah mengarahkan komunitas Ethereum untuk lebih menyukai peningkatan yang berpusat pada rollup daripada peningkatan dengan sharding. Ini juga akan membantu menjaga logika konsensus Ethereum tetap lebih sederhana.

## Peningkatan offchain {#offchain-scaling}

Solusi offchain diimplementasikan secara terpisah dari Mainnet layer 1 - mereka tidak memerlukan perubahan pada protokol Ethereum yang ada. Beberapa solusi, yang dikenal sebagai solusi "layer 2", memperoleh keamanannya secara langsung dari konsensus Ethereum layer 1, seperti [optimistic rollup](/developers/docs/scaling/optimistic-rollups/), [zero-knowledge rollup](/developers/docs/scaling/zk-rollups/) atau [saluran status](/developers/docs/scaling/state-channels/). Solusi lain melibatkan pembuatan rantai baru dalam berbagai bentuk yang memperoleh keamanannya secara terpisah dari Mainnet, seperti [sidechain](#sidechains), [validium](#validium), atau [rantai plasma](#plasma). Solusi ini berkomunikasi dengan Mainnet tetapi memperoleh keamanannya secara berbeda untuk mencapai berbagai tujuan.

### Peningkatan layer 2 {#layer-2-scaling}

Kategori solusi offchain ini memperoleh keamanannya dari Mainnet Ethereum.

Layer 2 adalah istilah kolektif untuk solusi yang dirancang untuk membantu meningkatkan aplikasi Anda dengan menangani transaksi di luar Mainnet Ethereum (layer 1) sambil memanfaatkan model keamanan terdesentralisasi yang kuat dari Mainnet. Kecepatan transaksi menurun ketika jaringan sedang sibuk, membuat pengalaman pengguna menjadi buruk untuk jenis dapps tertentu. Dan seiring jaringan menjadi lebih sibuk, harga gas meningkat karena pengirim transaksi bertujuan untuk saling mengalahkan tawaran. Hal ini dapat membuat penggunaan Ethereum menjadi sangat mahal.

Sebagian besar solusi layer 2 berpusat di sekitar server atau kluster server, yang masing-masing dapat disebut sebagai node, validator, operator, sequencer, produsen blok, atau istilah serupa. Bergantung pada implementasinya, node layer 2 ini dapat dijalankan oleh individu, bisnis, atau entitas yang menggunakannya, atau oleh operator pihak ke-3, atau oleh sekelompok besar individu (mirip dengan Mainnet). Secara umum, transaksi dikirimkan ke node layer 2 ini alih-alih dikirimkan langsung ke layer 1 (Mainnet). Untuk beberapa solusi, instans layer 2 kemudian mengelompokkannya ke dalam grup sebelum menambatkannya ke layer 1, setelah itu mereka diamankan oleh layer 1 dan tidak dapat diubah. Detail tentang bagaimana hal ini dilakukan sangat bervariasi antara teknologi dan implementasi layer 2 yang berbeda.

Instans layer 2 tertentu mungkin terbuka dan dibagikan oleh banyak aplikasi, atau mungkin diterapkan oleh satu proyek dan didedikasikan untuk mendukung aplikasi mereka saja.

#### Mengapa layer 2 dibutuhkan? {#why-is-layer-2-needed}

- Peningkatan transaksi per detik sangat meningkatkan pengalaman pengguna, dan mengurangi kemacetan jaringan di Mainnet Ethereum.
- Transaksi digulung (rolled up) menjadi satu transaksi ke Mainnet Ethereum, mengurangi biaya gas bagi pengguna dan membuat Ethereum lebih inklusif dan dapat diakses oleh orang-orang di mana saja.
- Setiap pembaruan pada skalabilitas tidak boleh mengorbankan desentralisasi atau keamanan – layer 2 dibangun di atas Ethereum.
- Terdapat jaringan layer 2 khusus aplikasi yang membawa serangkaian efisiensinya sendiri saat bekerja dengan aset dalam skala besar.

[Lebih lanjut tentang layer 2](/layer-2/).

#### Rollup {#rollups}

Rollup melakukan eksekusi transaksi di luar layer 1 dan kemudian data diposting ke layer 1 di mana konsensus dicapai. Karena data transaksi disertakan dalam blok layer 1, ini memungkinkan rollup diamankan oleh keamanan asli Ethereum.

Ada dua jenis rollup dengan model keamanan yang berbeda:

- **Optimistic rollup**: mengasumsikan transaksi valid secara default dan hanya menjalankan komputasi, melalui [**anti-penipuan**](/glossary/#fraud-proof), jika terjadi tantangan. [Lebih lanjut tentang Optimistic rollup](/developers/docs/scaling/optimistic-rollups/).
- **Zero-knowledge rollup**: menjalankan komputasi offchain dan mengirimkan [**bukti validitas**](/glossary/#validity-proof) ke rantai. [Lebih lanjut tentang zero-knowledge rollup](/developers/docs/scaling/zk-rollups/).

#### Saluran status {#channels}

Saluran status memanfaatkan kontrak multi tanda tangan untuk memungkinkan peserta bertransaksi dengan cepat dan bebas secara offchain, kemudian menyelesaikan finalitas dengan Mainnet. Ini meminimalkan kemacetan jaringan, biaya, dan penundaan. Dua jenis saluran saat ini adalah saluran status dan saluran pembayaran.

Pelajari lebih lanjut tentang [saluran status](/developers/docs/scaling/state-channels/).

### Sidechain {#sidechains}

Sidechain adalah blockchain independen yang kompatibel dengan EVM yang berjalan secara paralel dengan Mainnet. Ini kompatibel dengan Ethereum melalui jembatan dua arah dan berjalan di bawah aturan konsensus dan parameter blok yang mereka pilih sendiri.

Pelajari lebih lanjut tentang [Sidechain](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Rantai plasma adalah blockchain terpisah yang ditambatkan ke rantai utama Ethereum dan menggunakan anti-penipuan (seperti [optimistic rollup](/developers/docs/scaling/optimistic-rollups/)) untuk menengahi perselisihan.

Pelajari lebih lanjut tentang [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Rantai Validium menggunakan bukti validitas seperti zero-knowledge rollup tetapi data tidak disimpan di rantai utama Ethereum layer 1. Hal ini dapat menghasilkan 10 ribu transaksi per detik per rantai Validium dan beberapa rantai dapat dijalankan secara paralel.

Pelajari lebih lanjut tentang [Validium](/developers/docs/scaling/validium/).

## Mengapa begitu banyak solusi peningkatan yang dibutuhkan? {#why-do-we-need-these}

- Berbagai solusi dapat membantu mengurangi kemacetan keseluruhan pada bagian mana pun dari jaringan dan juga mencegah titik kegagalan tunggal.
- Keseluruhan lebih besar daripada jumlah bagian-bagiannya. Solusi yang berbeda dapat ada dan bekerja secara harmonis, memungkinkan efek eksponensial pada kecepatan dan throughput transaksi di masa depan.
- Tidak semua solusi memerlukan pemanfaatan algoritma konsensus Ethereum secara langsung, dan alternatif dapat menawarkan manfaat yang jika tidak akan sulit diperoleh.

## Lebih suka belajar secara visual? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Perhatikan bahwa penjelasan dalam video menggunakan istilah "Layer 2" untuk merujuk pada semua solusi peningkatan offchain, sementara kami membedakan "Layer 2" sebagai solusi offchain yang memperoleh keamanannya melalui konsensus Mainnet layer 1._

<YouTube id="7pWxCklcNsU" />

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum yang berpusat pada rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Analitik terkini tentang solusi peningkatan Layer 2 untuk Ethereum](https://www.l2beat.com/)
- [Mengevaluasi Solusi Peningkatan layer 2 Ethereum: Kerangka Kerja Perbandingan](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Panduan Tidak Lengkap untuk Rollup](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollup yang didukung Ethereum: Penakluk Dunia](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistic Rollup vs ZK Rollup](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Mengapa rollup + shard data adalah satu-satunya solusi berkelanjutan untuk skalabilitas tinggi](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Layer 3 seperti apa yang masuk akal?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Ketersediaan Data Atau: Bagaimana Rollup Belajar Berhenti Khawatir Dan Mencintai Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Panduan Praktis untuk Rollup Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Tutorial: Membangun Layer 2 yang dapat ditingkatkan di Ethereum {#tutorials}

- [Semua yang dapat Anda cache](/developers/tutorials/all-you-can-cache/) _– Cara membangun dan menggunakan kontrak caching untuk mengurangi biaya calldata pada rollup._
- [ABI Pendek untuk Optimasi Calldata](/developers/tutorials/short-abi/) _– Cara menggunakan ABI yang lebih pendek untuk mengurangi biaya calldata untuk transaksi layer 2._