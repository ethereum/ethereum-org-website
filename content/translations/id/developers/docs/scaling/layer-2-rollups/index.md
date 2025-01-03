---
title: Rollup Lapisan 2
description: Pengantar untuk berbagai solusi penskalaan rollup lapisan 2 yang saat ini sedang dikembangkan oleh komunitas Ethereum.
lang: id
incomplete: true
sidebarDepth: 3
---

Lapisan 2 adalah istilah kolektif untuk solusi yang dirancang demi membantu menskalakan aplikasi Anda dengan menangani transaksi di luar Jaringan Utama Ethereum (lapisan 1), sekaligus memanfaatkan model keamanan terdesentralisasi yang kuat dari Jaringan Utama. Kecepatan transaksi menurun ketika jaringan sibuk yang dapat membuat pengalaman pengguna menjadi buruk untuk jenis dapp tertentu. Dan ketika jaringan semakin sibuk, harga gas meningkat karena pengirim transaksi bertujuan untuk mengalahkan satu sama lain. Ini dapat menyebabkan penggunaan Ethereum menjadi sangat mahal.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang semua topik dasar dan pemahaman tingkat tinggi tentang [penskalaan Ethereum](/developers/docs/scaling/). Menerapkan solusi penskalaan seperti rollup adalah topik lanjutan karena teknologinya kurang teruji, dan masih terus diteliti dan dikembangkan.

## Kenapa lapisan 2 dibutuhkan? {#why-is-layer-2-needed}

- Beberapa kasus penggunaan, seperti game blockchain, tidak masuk akal dengan waktu transaksi saat ini.
- Menggunakan aplikasi blockchain bisa menjadi mahal, yang tidak seharusnya demikian.
- Setiap pembaruan skalabilitas tidak boleh mengorbankan aspek desentralisasi atau keamanan – lapisan 2 dibangun di atas Ethereum.

## Rollup {#rollups}

Rollup adalah solusi yang dapat menjalankan _eksekusi_ transaksi di luar rantai utama Ethereum (lapisan 1), kecuali _data_ pasca transaksi pada lapisan 1. Karena _data_ transaksi ada pada lapisan 1, ini membuat rollup diamankan oleh lapisan 1. Mewarisi properti keamanan lapisan 1, saat melakukan eksekusi di luar lapisan 1, adalah karakteristik rollup yang menonjol.

Tiga properti rollup yang disederhanakan adalah:

1. _eksekusi_ transaksi di luar lapisan 1
2. data atau bukti transaksi ada di lapisan 1
3. sebuah kontrak pintar rollup di lapisan 1 yang dapat memastikan eksekusi transaksi yang benar pada lapisan 2 dengan menggunakan data transaksi pada lapisan 1

Rollup membutuhkan "operator" untuk mempertaruhkan sebuah obligasi dalam kontrak rollup. Ini memberi insentif kepada operator untuk memverifikasi dan melaksanakn transaksi dengan benar.

**Berguna untuk:**

- mengurangi biaya bagi para pengguna
- membuka partisipasi
- mempercepat throughput transaksi

Ada dua jenis rollup dengan model keamanan yang berbeda:

- **Rollup Optimistic**: menganggap transaksi valid secara default dan hanya menjalankan komputasi, melalui sebuah [**bukti penipuan**](/glossary/#fraud-proof), jika ada tantangan
- **Rollup zero knowledge**: menjalankan komputasi secara off-chain dan mengirimkan sebuah [**bukti validitas**](/glossary/#validity-proof) ke rantai

### Rollup optimistic {#optimistic-rollups}

Rollup optimistic duduk sejajar dengan rantai Ethereum utama pada lapisan 2. Rollup ini dapat menawarkan peningkatan skalabilitas karena tidak melakukan komputasi apa pun secara default. Sebagai gantinya, setelah satu transaksi, mereka mengusulkan state baru ke Jaringan Utama, atau "mengesahkan" transaksi tersebut.

Dengan rollup Optimistic, transaksi ditulis ke rantai utama Ethereum sebagai `calldata`, mengoptimalkannya lebih jauh dengan mengurangi biaya gas.

Karena komputasi adalah bagian yang lambat, mahal dari penggunaan Ethereum, rollup Optimistic dapat menawarkan peningkatan perluasan hingga 10-100x tergantung pada transaksi. Bahkan, jumlah ini akan semakin bertambah dengan pengenalan [rantai shard](/roadmap/danksharding), karena akan semakin banyak data yang tersedia jika sebuah transaksi dipertentangkan.

#### Mempersengketakan transaksi {#disputing-transactions}

Rollup optimistic tidak menghitung transaksi, jadi perlu ada mekanisme untuk memastikan transaksi itu sah dan tidak curang. Di sinilah bukti penipuan digunakan. Jika seseorang melihat transaksi penipuan, rollup akan mengeksekusi bukti penipuan dan menjalankan perhitungan transaksi, menggunakan data state yang tersedia. Ini berarti Anda mungkin memiliki waktu tunggu yang lebih lama untuk konfirmasi transaksi dari yang diperlukan dalam rollup ZK, karena prosesnya dapat ditentang.

![Diagram yang menunjukkan apa yang terjadi ketika transaksi penipuan terjadi dalam rollup Optimistic di Ethereum](./optimistic-rollups.png)

Gas yang Anda butuhkan untuk menjalankan perhitungan bukti penipuan bahkan dibayarkan kembali. Ben Jones dari Optimism menjelaskan sistem ikatan yang ada:

"_siapa pun yang mungkin dapat mengambil tindakan yang mengharuskan Anda membuktikan kecurangan untuk mengamankan dana pribadi memerlukan pemberian jaminan dari Anda. Anda pada dasarnya mengambil beberapa ETH dan menguncinya dan berkata "Hei, saya berjanji untuk mengatakan yang sebenarnya"... Jika saya tidak mengatakan yang sebenarnya dan penipuan terbukti, uang ini akan dipotong. Tidak hanya sebagian dari uang ini yang dipotong tetapi beberapa di antaranya akan digunakan membayar gas yang dihabiskan orang lain untuk melakukan proses bukti penipuan_"

Jadi Anda bisa melihat insentifnya: peserta dihukum karena melakukan penipuan dan mendapat penggantian uang karena membuktikan penipuan.

#### Pro dan kontra {#optimistic-pros-and-cons}

| Pro                                                                                                                                                       | Kontra                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Apa pun yang dapat Anda lakukan di lapisan 1 Ethereum, Anda dapat melakukannya dengan rollup Optimistic karena rollup kompatibel dengan EVM dan Solidity. | Waktu tunggu yang lama untuk transaksi on-chain karena berpotensi adanya penipuan. |
| Semua data transaksi disimpan pada rantai lapisan 1, yang berarti aman dan terdesentralisasi.                                                             | Seorang operator dapat memengaruhi pemesanan transaksi.                            |

#### Penjelasan visual tentang rollup optimistic {#optimistic-video}

Tonton Finematics menjelaskan rollup optimistic:

<YouTube id="7pWxCklcNsU" start="263" />

#### Gunakan rollup Optimistic {#use-optimistic-rollups}

Ada beberapa implementasi rollup Optimistic yang dapat Anda integrasikan ke dalam dapps Anda:

- [Arbitrum](https://arbitrum.io/)
- [Optimism](https://optimism.io/)
- [Boba](https://boba.network/)
- [Fuel Network](https://fuel.sh/)
- [Cartesi](https://cartesi.io/)

### Rollup zero-knowledge {#zk-rollups}

**Rollup zero knowledge (rollup ZK)** menggabungkan (atau me-"roll up") ratusan transfer off-chain dan menghasilkan bukti kriptografi, yang dikenal sebagai SNARK (succinct non-interactive argument of knowledge). Bukti ini dikenal sebagai bukti validitas dan diumumkan di lapisan 1.

Kontrak pintar rollup ZK mempertahankan state dari semua transfer pada lapisan 2, dan state ini hanya dapat diperbarui dengan bukti validitas. Artinya, rollup ZK hanya membutuhkan bukti validitas, alih-alih semua data transaksi. Dengan rollup ZK, memvalidasi blok menjadi lebih cepat dan lebih murah karena lebih sedikit data yang disertakan.

Dengan rollup ZK, tidak ada penundaan saat memindahkan dana dari lapisan 2 ke lapisan 1 karena bukti validitas yang diterima oleh kontrak rollup ZK telah memverifikasi dana.

Saat berada di lapisan 2, rollup ZK dapat dioptimalkan guna mengurangi ukuran transaksi lebih jauh. Misalnya, sebuah akun diwakili oleh indeks ketimbang alamat, yang mengurangi transaksi dari 32 bita menjadi hanya 4 bita. Transaksi juga ditulis ke Ethereum sebagai `calldata`, mengurangi gas.

#### Pro dan kontra {#zk-pros-and-cons}

| Pro                                                                                                                | Kontra                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Waktu penyelesaian yang lebih cepat karena state dengan segera diverifikasi setelah bukti dikirim ke rantai utama. | Beberapa tidak memiliki dukungan EVM.                                                                          |
| Tidak rentan terhadap serangan ekonomi yang menjadi kerentanan [rollup Optimistic](#optimistic-pros-and-cons).     | Bukti validitas sangat intens untuk dihitung – tidak sepadan untuk aplikasi dengan sedikit aktivitas on-chain. |
| Aman dan terdesentralisasi, karena data yang diperlukan untuk memulihkan state disimpan di rantai lapisan 1.       | Seorang operator dapat memengaruhi pemesanan transaksi                                                         |

#### Penjelasan visual tentang rollup ZK {#zk-video}

Tonton Finematics yang menjelaskan rollup ZK:

<YouTube id="7pWxCklcNsU" start="406" />

#### Gunakan rollup ZK {#use-zk-rollups}

Ada berbagai implementasi rollup ZK yang dapat Anda integrasikan ke dalam dapps Anda:

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs ZKsync](https://zksync.io/)
- [Aztec 2.0](https://aztec.network/)
- [Polygon Hermez](https://hermez.io/)
- [zkTube](https://zktube.io/)

## Solusi Hibrida {#hybrid-solutions}

Solusi hibrida ada dengan menggabungkan bagian terbaik dari berbagai teknologi lapisan 2, dan mungkin menawarkan pertukaran yang dapat dikonfigurasi.

### Gunakan solusi hibrida {#use-hybrid-solutions}

- [Celer](https://www.celer.network/)

## Bacaan lebih lanjut {#further-reading}

- [Panduan Tidak Lengkap tentang Rollup](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Rollup Optimistic vs Rollup ZK](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Skalabilitas Blockchain Zero-Knowledge](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Alasan rollup + shard data merupakan satu-satunya solusi berkelanjutan untuk penskalaan tinggi](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Rollup ZK yang digerakkan Ethereum: Yang Terbaik di Kelasnya](https://hackmd.io/@canti/rkUT0BD8K)

**Rollup ZK**

- [Apa itu Rollup Zero-Knowledge?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)

**Rollup Optimistic**

- [Panduan Penting untuk Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Bagaimana Rollup Optimism benar-benar berfungsi?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**Solusi Hibrida**

- [Menambahkan Sidechain Rollup PoS Hibrida ke Platform Lapisan 2 Koheren Celer di Ethereum](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)
- [Volition: yang terbaik dari seluruh dunia](https://polynya.medium.com/volitions-best-of-all-worlds-cfd313aec9a8)

**Video**

- [Rollup - Strategi Penskalaan Ethereum yang Terbaik?](https://youtu.be/7pWxCklcNsU)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
