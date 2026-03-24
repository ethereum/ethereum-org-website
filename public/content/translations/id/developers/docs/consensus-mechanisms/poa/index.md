---
title: Proof-of-authority (PoA)
description: Penjelasan tentang protokol konsensus proof-of-authority dan perannya dalam ekosistem blockchain.
lang: id
---

**Proof-of-authority (PoA)** adalah algoritma konsensus berbasis reputasi yang merupakan versi modifikasi dari [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Ini sebagian besar digunakan oleh chain privat, testnet, dan jaringan pengembangan lokal. PoA adalah algoritma konsensus berbasis reputasi yang membutuhkan kepercayaan pada sekumpulan penandatangan yang berwenang untuk menghasilkan blok, alih-alih mekanisme berbasis stake dalam PoS.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda terlebih dahulu membaca tentang [transaksi](/developers/docs/transactions/), [blok](/developers/docs/blocks/), dan [mekanisme konsensus](/developers/docs/consensus-mechanisms/).

## Apa itu proof-of-authority (PoA)? {#what-is-poa}

Proof-of-authority adalah versi modifikasi dari **[proof-of-stake](/developers/docs/consensus-mechanisms/pos/) (PoS)** yang merupakan algoritma konsensus berbasis reputasi alih-alih mekanisme berbasis stake dalam PoS. Istilah ini diperkenalkan untuk pertama kalinya pada tahun 2017 oleh Gavin Wood, dan algoritma konsensus ini sebagian besar telah digunakan oleh chain privat, testnet, dan jaringan pengembangan lokal, karena mengatasi kebutuhan akan sumber daya berkualitas tinggi seperti yang dilakukan PoW, dan mengatasi masalah skalabilitas dengan PoS dengan memiliki subset kecil node yang menyimpan blockchain dan menghasilkan blok.

Proof-of-authority membutuhkan kepercayaan pada sekumpulan penandatangan yang berwenang yang ditetapkan dalam [blok genesis](/glossary/#genesis-block). Dalam sebagian besar implementasi saat ini, semua penandatangan yang berwenang mempertahankan kekuatan dan hak istimewa yang sama saat menentukan konsensus dari chain. Gagasan di balik mengunci reputasi adalah setiap validator yang berwenang dikenal baik oleh semua orang melalui hal-hal seperti know your customer (KYC), atau dengan memiliki organisasi terkenal yang menjadi satu-satunya validator—dengan cara ini jika validator melakukan kesalahan, identitas mereka diketahui.

Ada beberapa implementasi PoA, tetapi implementasi standar Ethereum adalah **clique**, yang mengimplementasikan [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique ramah pengembang dan merupakan standar yang mudah diimplementasikan, mendukung semua jenis sinkronisasi klien. Implementasi lainnya termasuk [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) dan [Aura](https://openethereum.github.io/Chain-specification).

## Bagaimana cara kerjanya {#how-it-works}

Dalam PoA, sekumpulan penandatangan yang berwenang dipilih untuk membuat blok baru. Penandatangan dipilih berdasarkan reputasi mereka, dan mereka adalah satu-satunya yang diizinkan untuk membuat blok baru. Penandatangan dipilih secara round-robin, dan setiap penandatangan diizinkan untuk membuat blok dalam jangka waktu tertentu. Waktu pembuatan blok bersifat tetap, dan penandatangan diharuskan untuk membuat blok dalam jangka waktu tersebut.

Reputasi dalam konteks ini bukanlah hal yang dapat diukur melainkan reputasi perusahaan terkenal seperti Microsoft dan Google, oleh karena itu cara memilih penandatangan tepercaya bukanlah algoritmik melainkan tindakan manusia normal yaitu _kepercayaan_ di mana sebuah entitas katakanlah misalnya Microsoft membuat jaringan privat PoA antara ratusan atau ribuan startup dan perannya sendiri sebagai satu-satunya penandatangan tepercaya dengan kemungkinan menambahkan penandatangan terkenal lainnya seperti Google di masa depan, startup tersebut, tanpa ragu, akan mempercayai Microsoft untuk bertindak jujur setiap saat dan menggunakan jaringan tersebut. Ini memecahkan kebutuhan untuk melakukan stake di berbagai jaringan kecil/privat yang dibangun untuk tujuan berbeda agar tetap terdesentralisasi dan berfungsi, bersama dengan kebutuhan akan penambang, yang menghabiskan banyak daya dan sumber daya. Beberapa jaringan privat menggunakan standar PoA seperti VeChain, dan beberapa memodifikasinya seperti Binance yang menggunakan [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) yang merupakan versi modifikasi khusus dari PoA dan PoS.

Proses pemungutan suara dilakukan oleh penandatangan itu sendiri. Setiap penandatangan memberikan suara untuk penambahan atau penghapusan penandatangan di blok mereka saat mereka membuat blok baru. Suara dihitung oleh node, dan penandatangan ditambahkan atau dihapus berdasarkan suara yang mencapai ambang batas tertentu `SIGNER_LIMIT`.

Mungkin ada situasi di mana fork kecil terjadi, kesulitan sebuah blok bergantung pada apakah blok tersebut ditandatangani pada gilirannya (in turn) atau di luar gilirannya (out of turn). Blok "in turn" memiliki kesulitan 2, dan blok "out of turn" memiliki kesulitan 1. Dalam kasus fork kecil, chain dengan sebagian besar penandatangan yang menyegel blok "in turn" akan mengakumulasi kesulitan paling banyak dan menang.

## Vektor serangan {#attack-vectors}

### Penandatangan berbahaya {#malicious-signers}

Pengguna berbahaya dapat ditambahkan ke daftar penandatangan, atau kunci/mesin penandatanganan mungkin disusupi. Dalam skenario seperti itu, protokol harus mampu mempertahankan diri dari reorganisasi dan spamming. Solusi yang diusulkan adalah dengan daftar N penandatangan yang berwenang, setiap penandatangan hanya dapat melakukan mint 1 blok dari setiap K. Ini memastikan bahwa kerusakan dibatasi, dan sisa validator dapat mengeluarkan pengguna berbahaya tersebut melalui pemungutan suara.

### Penyensoran {#censorship-attack}

Vektor serangan menarik lainnya adalah jika seorang penandatangan (atau sekelompok penandatangan) mencoba menyensor blok yang memberikan suara untuk menghapus mereka dari daftar otorisasi. Untuk mengatasi hal ini, frekuensi mint yang diizinkan dari penandatangan dibatasi menjadi 1 dari N/2. Ini memastikan bahwa penandatangan berbahaya perlu mengontrol setidaknya 51% dari akun penandatanganan, di mana pada titik tersebut mereka akan secara efektif menjadi sumber kebenaran baru untuk chain tersebut.

### Spam {#spam-attack}

Vektor serangan kecil lainnya adalah penandatangan berbahaya yang menyuntikkan proposal pemungutan suara baru di dalam setiap blok yang mereka mint. Karena node perlu menghitung semua suara untuk membuat daftar aktual penandatangan yang berwenang, mereka harus mencatat semua suara dari waktu ke waktu. Tanpa menempatkan batas pada jendela pemungutan suara, ini bisa tumbuh perlahan, namun tidak terbatas. Solusinya adalah menempatkan jendela _bergerak_ dari W blok yang setelahnya suara dianggap basi. _Jendela yang masuk akal mungkin 1-2 epoch._

### Blok bersamaan {#concurrent-blocks}

Dalam jaringan PoA, ketika ada N penandatangan yang berwenang, setiap penandatangan diizinkan untuk melakukan mint 1 blok dari K, yang berarti bahwa N-K+1 validator diizinkan untuk melakukan mint pada titik waktu tertentu. Untuk mencegah validator ini berlomba untuk blok, setiap penandatangan harus menambahkan "offset" acak kecil ke waktu saat merilis blok baru. Meskipun proses ini memastikan bahwa fork kecil jarang terjadi, fork sesekali masih bisa terjadi, sama seperti mainnet. Jika seorang penandatangan ditemukan menyalahgunakan kekuasaannya dan menyebabkan kekacauan, penandatangan lainnya dapat mengeluarkan mereka melalui pemungutan suara.

Jika misalnya ada 10 penandatangan yang berwenang dan setiap penandatangan diizinkan untuk membuat 1 blok dari 20, maka pada waktu tertentu, 11 validator dapat membuat blok. Untuk mencegah mereka berlomba membuat blok, setiap penandatangan menambahkan "offset" acak kecil ke waktu mereka merilis blok baru. Ini mengurangi terjadinya fork kecil tetapi masih memungkinkan fork sesekali, seperti yang terlihat di Mainnet Ethereum. Jika seorang penandatangan menyalahgunakan otoritas mereka dan menyebabkan gangguan, mereka dapat dikeluarkan dari jaringan melalui pemungutan suara.

## Kelebihan dan kekurangan {#pros-and-cons}

| Kelebihan                                                                                                                                                 | Kekurangan                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lebih dapat diskalakan daripada mekanisme populer lainnya seperti PoS dan PoW, karena didasarkan pada jumlah penandatangan blok yang terbatas             | Jaringan PoA biasanya memiliki jumlah node validasi yang relatif kecil. Ini membuat jaringan PoA lebih terpusat.                                      |
| Blockchain PoA sangat murah untuk dijalankan dan dipelihara                                                                                               | Menjadi penandatangan yang berwenang biasanya di luar jangkauan orang biasa, karena blockchain membutuhkan entitas dengan reputasi yang mapan.        |
| Transaksi dikonfirmasi dengan sangat cepat karena bisa mencapai kurang dari 1 detik karena hanya sejumlah penandatangan terbatas yang diperlukan untuk memvalidasi blok baru | Penandatangan berbahaya dapat melakukan reorg, pengeluaran ganda, menyensor transaksi di jaringan, serangan tersebut dimitigasi tetapi masih mungkin terjadi |

## Bacaan lebih lanjut {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Standar Clique_
- [Studi Proof of Authority](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Apa itu Proof of Authority](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Penjelasan Proof of Authority](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA dalam blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Penjelasan Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA yang tidak digunakan lagi, spesifikasi Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, implementasi PoA lainnya](https://besu.hyperledger.org/private-networks/concepts/poa)

### Lebih suka belajar secara visual? {#visual-learner}

Tonton penjelasan visual tentang proof-of-authority:

<YouTube id="Mj10HSEM5_8" />

## Topik terkait {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)