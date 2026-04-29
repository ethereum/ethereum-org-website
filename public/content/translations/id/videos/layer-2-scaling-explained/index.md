---
title: "Penjelasan penskalaan lapisan 2 Ethereum"
description: "Gambaran umum solusi penskalaan lapisan 2 untuk Ethereum, termasuk rollup, Plasma, kanal state, dan rantai samping."
lang: id
youtubeId: "BgCgauWVTs0"
uploadDate: 2021-02-03
duration: "0:14:28"
educationLevel: intermediate
topic:
  - "penskalaan"
  - "lapisan-2"
format: explainer
author: Finematics
breadcrumb: "Penskalaan Lapisan 2"
---

Sebuah penjelasan oleh **Finematics** yang mencakup solusi penskalaan lapisan 2 untuk Ethereum — termasuk kanal, Plasma, rantai samping, dan rollup, serta mengapa rollup muncul sebagai strategi penskalaan yang dominan. Pelajari bagaimana teknologi ini mengurangi biaya dan meningkatkan laju pemrosesan sambil mewarisi keamanan Ethereum.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=BgCgauWVTs0) yang dipublikasikan oleh Finematics. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Penskalaan Ethereum (0:31) {#ethereum-scaling-031}

Penskalaan Ethereum telah menjadi salah satu topik yang paling banyak dibahas hampir sejak jaringan diluncurkan. Perdebatan tentang penskalaan selalu memanas setelah periode kemacetan jaringan yang besar.

Salah satu periode pertama seperti ini adalah pasar bull kripto tahun 2017, di mana CryptoKitties yang terkenal bersama dengan ICO mampu menyumbat seluruh jaringan Ethereum, menyebabkan lonjakan besar dalam biaya gas. Tahun ini kemacetan jaringan kembali lebih kuat, kali ini disebabkan oleh popularitas keuangan terdesentralisasi (DeFi) dan yield farming. Ada periode waktu di mana bahkan biaya gas setinggi 500+ Gwei tidak akan membuat transaksi Anda diverifikasi untuk sementara waktu.

#### Penskalaan rantai blok (1:20) {#scaling-blockchains-120}

Ketika berbicara tentang penskalaan Ethereum atau rantai blok pada umumnya, ada dua cara utama untuk melakukannya: menskalakan lapisan dasar itu sendiri — lapisan 1 (l1) — atau menskalakan jaringan dengan memindahkan sebagian pekerjaan ke lapisan lain — lapisan 2 (l2).

Lapisan 1 adalah lapisan konsensus dasar standar di mana hampir semua transaksi saat ini diselesaikan. Konsep lapisan bukanlah konsep khusus Ethereum; rantai blok lain seperti Bitcoin atau Zcash juga menggunakannya secara ekstensif.

Lapisan 2 adalah lapisan lain yang dibangun di atas lapisan 1. Ada beberapa poin penting di sini: lapisan 2 tidak mewajibkan perubahan apa pun pada lapisan 1 — lapisan ini dapat dibangun di atas lapisan 1 menggunakan elemen yang ada, seperti kontrak pintar. Lapisan 2 juga memanfaatkan keamanan lapisan 1 dengan menambatkan state-nya ke dalam lapisan 1.

Ethereum saat ini dapat memproses sekitar 15 transaksi per detik pada lapisan dasarnya. Penskalaan lapisan 2 dapat secara dramatis meningkatkan jumlah transaksi — tergantung pada solusinya, memproses antara 2.000 dan 4.000 transaksi per detik.

#### Ethereum 2.0 (2:39) {#ethereum-20-239}

Bagaimana dengan Ethereum 2.0? Bukankah itu seharusnya menskalakan Ethereum? Ya — Ethereum 2.0 memperkenalkan Bukti Kepemilikan (PoS) dan sharding yang akan secara dramatis meningkatkan laju pemrosesan transaksi pada lapisan dasar.

Apakah itu berarti kita tidak memerlukan penskalaan lapisan 2 ketika Ethereum 2.0 diluncurkan? Tidak juga — bahkan dengan sharding, Ethereum masih akan membutuhkan penskalaan lapisan 2 untuk dapat menangani ratusan ribu atau bahkan jutaan transaksi per detik di masa depan.

#### Trilema skalabilitas (3:15) {#scalability-trilemma-315}

Di sinilah trilema skalabilitas yang terkenal ikut berperan. Secara teori, kita bisa saja melewati lapisan 2 sepenuhnya dan fokus pada penskalaan lapisan dasar. Ini akan mewajibkan node yang sangat terspesialisasi untuk menangani peningkatan beban kerja, yang akan mengarah pada sentralisasi yang lebih tinggi dan oleh karena itu menurunkan keamanan dan sifat tahan sensor dari jaringan.

Berpegang pada fakta bahwa skalabilitas tidak boleh mengorbankan keamanan dan desentralisasi, kita dihadapkan pada kombinasi penskalaan lapisan 1 dan lapisan 2 untuk melangkah ke masa depan.

#### Penskalaan lapisan 2 (3:52) {#layer-2-scaling-352}

Penskalaan lapisan 2 adalah istilah kolektif untuk solusi yang membantu meningkatkan kemampuan lapisan 1 dengan menangani transaksi secara offchain. Dua kemampuan utama yang dapat ditingkatkan adalah kecepatan transaksi dan laju pemrosesan transaksi. Selain itu, solusi lapisan 2 dapat sangat mengurangi biaya gas.

Ketika berbicara tentang solusi penskalaan yang sebenarnya, ada beberapa opsi yang tersedia. Beberapa opsi tersedia saat ini dan dapat meningkatkan laju pemrosesan jaringan Ethereum dalam jangka pendek hingga menengah, sementara yang lain menargetkan jangka waktu menengah hingga panjang. Beberapa solusi bersifat spesifik untuk aplikasi — misalnya, kanal pembayaran — sementara yang lain, seperti optimistic rollup, dapat digunakan untuk eksekusi kontrak arbitrer apa pun.

#### Kanal (5:03) {#channels-503}

Kanal adalah salah satu solusi penskalaan pertama yang dibahas secara luas. Kanal memungkinkan peserta untuk menukar transaksi mereka beberapa kali sambil hanya mengirimkan dua transaksi ke lapisan dasar. Jenis kanal yang paling populer adalah kanal state dan subtipe-nya, kanal pembayaran.

Meskipun kanal memiliki potensi untuk dengan mudah memproses ribuan transaksi per detik, kanal memiliki beberapa kelemahan. Kanal tidak menawarkan partisipasi terbuka — peserta harus diketahui di awal, dan pengguna harus mengunci dana mereka dalam kontrak multisig. Selain itu, solusi penskalaan ini bersifat spesifik untuk aplikasi dan tidak dapat digunakan untuk menskalakan kontrak pintar tujuan umum.

Proyek utama yang memanfaatkan kekuatan kanal state di Ethereum adalah Raiden. Konsep kanal pembayaran juga digunakan secara ekstensif oleh Lightning Network milik Bitcoin.

#### Plasma (6:04) {#plasma-604}

Plasma adalah solusi penskalaan lapisan 2 yang awalnya diusulkan oleh Joseph Poon dan Vitalik Buterin. Ini adalah kerangka kerja untuk membangun aplikasi yang dapat diskalakan di Ethereum.

Plasma memanfaatkan penggunaan kontrak pintar dan pohon Merkle untuk memungkinkan pembuatan rantai anak dalam jumlah tak terbatas — salinan dari rantai blok Ethereum induk. Memindahkan transaksi dari rantai utama ke rantai anak memungkinkan transaksi yang cepat dan murah.

Salah satu kelemahan Plasma adalah masa tunggu yang lama bagi pengguna yang ingin menarik dana mereka dari lapisan 2. Plasma, mirip dengan kanal, tidak dapat digunakan untuk menskalakan kontrak pintar tujuan umum. OMG Network dibangun di atas implementasi Plasma mereka sendiri yang disebut More Viable Plasma. Matic Network adalah contoh lain dari platform yang menggunakan versi adaptasi dari kerangka kerja Plasma.

#### Rantai samping (7:08) {#sidechains-708}

Rantai samping adalah rantai blok independen yang kompatibel dengan Ethereum dengan model konsensus dan parameter blok mereka sendiri. Interoperabilitas dengan Ethereum dimungkinkan dengan menggunakan Ethereum Virtual Machine yang sama, sehingga kontrak yang diterapkan ke lapisan dasar Ethereum dapat langsung diterapkan ke rantai samping.

xDai adalah salah satu contoh rantai samping tersebut.

#### ZK rollup (8:11) {#zk-rollups-811}

Rollup menyediakan penskalaan dengan menggabungkan — atau "menggulung" — transaksi rantai samping ke dalam satu transaksi dan menghasilkan bukti kriptografi, yang juga dikenal sebagai SNARK (Succinct Non-interactive Argument of Knowledge). Hanya bukti ini yang dikirimkan ke lapisan dasar. Dengan rollup, semua state dan eksekusi transaksi ditangani di rantai samping; rantai utama Ethereum hanya menyimpan data transaksi.

Ada dua jenis rollup: ZK rollup dan optimistic rollup.

ZK rollup, meskipun lebih cepat dan lebih efisien daripada optimistic rollup, tidak menyediakan cara mudah bagi kontrak pintar yang ada untuk bermigrasi ke lapisan 2.

Optimistic rollup menjalankan mesin virtual yang kompatibel dengan EVM yang disebut OVM (Optimistic Virtual Machine), yang memungkinkan eksekusi kontrak pintar yang sama seperti yang dapat dieksekusi di Ethereum. Ini sangat penting karena memudahkan kontrak pintar yang ada untuk mempertahankan komposabilitas mereka, yang sangat relevan dalam DeFi di mana semua kontrak pintar utama telah teruji di lapangan.

Salah satu proyek utama yang mengerjakan optimistic rollup adalah Optimism, yang semakin dekat dengan peluncuran Mainnet mereka. Ketika berbicara tentang ZK rollup, Loopring dan DeversiFi adalah contoh yang baik dari bursa terdesentralisasi yang dibangun di lapisan 2. Selain itu, kita memiliki zkSync yang memungkinkan pembayaran kripto yang dapat diskalakan.

#### Peta jalan yang berpusat pada rollup (9:18) {#a-rollup-centric-roadmap-918}

Skalabilitas rollup juga dapat diperbesar oleh Ethereum 2.0. Faktanya, karena rollup hanya membutuhkan lapisan data untuk diskalakan, mereka bisa mendapatkan dorongan luar biasa di Ethereum 2.0 Fase 1, yang berkaitan dengan sharding data.

Terlepas dari spektrum solusi penskalaan lapisan 2 yang tersedia, tampaknya komunitas Ethereum menyatu pada pendekatan penskalaan terutama melalui rollup dan sharding data Ethereum 2.0 Fase 1. Pendekatan ini juga dikonfirmasi dalam postingan terbaru oleh Vitalik Buterin yang berjudul "A Rollup-Centric Ethereum Roadmap."

Dalam video mendatang, kita akan menjelajahi penskalaan lapisan dasar dengan Ethereum 2.0 dan bagaimana penskalaan lapisan 1 dan lapisan 2 dapat membantu membuat keuangan terdesentralisasi (DeFi) lebih mudah diakses oleh semua orang.