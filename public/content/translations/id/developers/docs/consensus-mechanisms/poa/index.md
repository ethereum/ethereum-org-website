---
title: Bukti otoritas (PoA)
description: Penjelasan mengenai protokol konsensus bukti otoritas dan perannya dalam ekosistem blockchain.
lang: id
---

**Proof-of-Authority (PoA)** adalah algoritma konsensus berbasis reputasi yang merupakan versi modifikasi dari [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Sebagian besar di gunakan oleh jaringan pribadi, jaringan percobaan, dan jaringan pengembangan lokal. PoA adalah algoritma konsensus berbasis reputasi yang membutuhkan kepercayaan terhadap kelompok penandatangan resmi untuk menghasilkan blok, sebagai ganti dari mekanisme berbasis taruhan pada PoS.

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, kami menyarankan kamu terlebih dahulu membaca tentang [transaksi](/developers/docs/transactions/),[blocks](/developers/docs/blocks/),dan [consensus mechanisms](/developers/docs/consensus-mechanisms/).

## Apa itu bukti otoritas (PoA)? {#what-is-poa}

Proof-of-authority adalah versi modifikasi dari **[proof-of-stake]/developers/docs/consensus-mechanisms/pos/ (PoS)**, yaitu consensus algorithm berbasis reputasi, bukan mekanisme berbasis kepemilikan (stake) seperti pada PoS. Istilah ini pertama kali diperkenalkan pada tahun 2017 oleh Gavin Wood, dan algoritma konsensus ini sebagian besar digunakan oleh jaringan pribadi, testnet, dan jaringan pengembangan lokal, karena PoA mengatasi kebutuhan akan sumber daya berkualitas tinggi seperti pada PoW, sekaligus mengatasi masalah skalabilitas pada PoS dengan hanya melibatkan subset kecil node yang menyimpan blockchain dan memproduksi blok.

Proof-of-Authority mengharuskan pengguna mempercayai sekelompok pemberi persetujuan yang disetujui, yang set dalam protokol atau melalui tata kelola [genesis block](/glossary/#genesis-block). Dalam sebagian besar implementasi saat ini, semua penanda tangan yang berwenang memiliki kekuatan dan hak yang sama dalam menentukan konsensus jaringan. Ide di balik reputation staking adalah setiap validator yang berwenang dikenal oleh semua pihak melalui mekanisme seperti know your customer (KYC), atau dengan hanya membiarkan organisasi terkenal menjadi validator—dengan cara ini, jika seorang validator melakukan kesalahan, identitasnya dapat diketahui.

Ada berbagai implementasi PoA, tetapi implementasi standar di Ethereum adalah **clique**, yang menerapkan [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique ramah pengembang dan merupakan standar yang mudah diimplementasikan, mendukung semua tipe sinkronisasi klien. Penerapan yang lain termasuk [IBFT version 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) dan [Aura](https://openethereum.github.io/Chain-specification).

## Bagaimana cara kerjanya {#how-it-works}

Dalam PoA, sekumpulan penanda tangan yang berwenang dipilih untuk membuat blok baru. Para penanda tangan dipilih berdasarkan reputasi mereka, dan hanya mereka yang diizinkan untuk membuat blok baru. Para penanda tangan dipilih secara bergiliran round-robin, dan setiap penanda tangan diizinkan membuat blok dalam jangka waktu tertentu. Waktu pembuatan blok ditetapkan, dan para penanda tangan diwajibkan membuat blok dalam jangka waktu tersebut.

Reputasi dalam konteks ini bukan sesuatu yang dapat diukur secara kuantitatif, melainkan reputasi perusahaan-perusahaan terkenal seperti Microsoft dan Google. Oleh karena itu, cara pemilihan penanda tangan tepercaya bukanlah algoritmik, melainkan berdasarkan tindakan manusia yang normal yaitu kepercayaan. Misalnya, Microsoft membuat jaringan PoA privat yang menghubungkan ratusan atau ribuan startup, dan mengambil peran sebagai satu-satunya penanda tangan tepercaya, dengan kemungkinan menambahkan penanda tangan terkenal lain seperti Google di masa depan. Startup-startup tersebut, tanpa ragu, akan mempercayai Microsoft untuk bertindak jujur setiap saat dan menggunakan jaringan tersebut. Hal ini mengatasi kebutuhan untuk melakukan staking di berbagai jaringan kecil/pribadi yang dibangun untuk tujuan berbeda agar tetap terdesentralisasi dan berfungsi, sekaligus menghilangkan kebutuhan akan penambang, yang mengonsumsi banyak energi dan sumber daya. Beberapa network privat menggunakan standar PoA seperti VeChain, sementara yang lain memodifikasinya, misalnya Binance yang menggunakan [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) sebuah versi kustom yang merupakan kombinasi dari PoA dan PoS.

Proses pemungutan suara dilakukan oleh para penanda tangan itu sendiri. Setiap penanda tangan memberikan suara untuk penambahan atau penghapusan penanda tangan lain dalam blok mereka saat membuat blok baru. Suara dihitung oleh node, dan para signers akan ditambahkan atau dihapus jika jumlah suara sudah mencapai ambang batas tertentu SIGNER_LIMIT.

Mungkin terjadi situasi di mana fork kecil muncul; kesulitan sebuah blok bergantung pada apakah blok tersebut ditandatangani sesuai giliran atau di luar giliran. In turn” blocks punya difficulty 2, dan “out of turn” blocks punya difficulty 1. Dalam kasus fork kecil, rantai dengan sebagian besar penanda tangan yang menutup blok "sesuai giliran" akan memiliki tingkat kesulitan tertinggi dan akan menang.

## jalur serangan {#attack-vectors}

### Penanda Tangan Jahat {#malicious-signers}

Seorang pengguna jahat bisa saja ditambahkan ke daftar penanda tangan, atau kunci/mesin penanda tangan bisa dikompromikan. Dalam skenario seperti itu, protokol harus mampu melindungi dirinya dari reorganisasi dan spam. Solusi yang diusulkan adalah bahwa dengan list N signers resmi, setiap signers hanya boleh mencetak 1 block dari setiap K blok. Ini memastikan kerusakan dapat dibatasi, dan validators lainnya dapat memilih untuk mengeluarkan malicious user.

### Pembatasan {#censorship-attack}

Vektor serangan menarik lainnya adalah jika seorang signers (atau sekelompok signers) mencoba membatasi blocks yang memberikan suara untuk menghapus mereka dari list otorisasi. Untuk mengatasi hal ini, frekuensi mencetak yang diperbolehkan bagi para signers dibatasi menjadi 1 dari N/2. Ini memastikan bahwa malicious signer harus menguasai setidaknya 51% accounts signers, pada titik itu mereka akan secara efektif menjadi sumber kebenaran baru bagi rantai.

### Sampah {#spam-attack}

Salah satu vektor serangan kecil lainnya adalah malicious signers yang menyisipkan proposal suara baru di setiap block yang mereka mint. Karena nodes perlu menghitung semua suara untuk membuat daftar resmi penandatangan yang sah, mereka harus mencatat semua suara dari waktu ke waktu. Tanpa menetapkan batas waktu untuk jendela pemungutan suara, hal ini bisa berkembang secara lambat, namun tanpa batas. Solusinya adalah menempatkan jendela bergerak moving window sebanyak W blok, setelah itu suara dianggap kadaluwarsa. _Jendela yang wajar mungkin adalah 1-2 periode._

### Blok bersamaan {#concurrent-blocks}

Dalam jaringan PoA, ketika terdapat N signer yang berwenang, setiap signer diperbolehkan untuk membuat 1 blok dari K, yang berarti N-K+1 validator diperbolehkan untuk membuat blok pada suatu waktu tertentu. Untuk mencegah validator ini saling berlomba membuat blok, setiap signer sebaiknya menambahkan offset kecil secara acak pada waktu mereka merilis blok baru. Meskipun proses ini memastikan bahwa fork kecil jarang terjadi, fork sesekali masih bisa terjadi, sama seperti di mainnet. Jika seorang signer terbukti menyalahgunakan kekuasaannya dan menimbulkan kekacauan, signer lain dapat memilih untuk mengeluarkannya.

Jika misalnya ada 10 signer yang diizinkan, dan setiap signer boleh membuat 1 blok dari 20, maka pada suatu waktu, 11 validator dapat membuat blok. Untuk mencegah mereka bersaing membuat blok, setiap signer menambahkan "offset" acak kecil pada waktu mereka merilis blok baru. Ini mengurangi terjadinya fork kecil tetapi tetap memungkinkan fork sesekali, seperti yang terlihat di Ethereum Mainnet. Jika seorang signer menyalahgunakan wewenangnya dan menimbulkan gangguan, mereka bisa dikeluarkan dari jaringan melalui pemungutan suara.

## Pro dan kontra {#pros-and-cons}

| Kelebihan                                                                                                                                                             | Kekurangan                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Lebih scalable dibandingkan mekanisme populer lainnya seperti PoS dan PoW, karena didasarkan pada jumlah signer blok yang terbatas                                    | Jaringan PoA biasanya memiliki jumlah node validasi yang relatif kecil. Hal ini membuat jaringan PoA lebih tersentralisasi.        |
| Blockchain PoA sangat murah untuk dijalankan dan dipelihara                                                                                                           | Menjadi penanda tangan resmi biasanya di luar jangkauan orang biasa, karena blockchain membutuhkan entitas dengan reputasi mapan.                  |
| Transaksi dikonfirmasi sangat cepat karena bisa mencapai kurang dari 1 detik karena hanya sejumlah penandatangan terbatas yang diperlukan untuk memvalidasi blok baru | Penandatangan jahat dapat melakukan reorganisasi, pengeluaran ganda, menyensor transaksi dalam jaringan, serangan tersebut dimitigasi tetapi masih mungkin terjadi |

## Bacaan lebih lanjut {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique standard_
- [Proof of Authority study](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [apa itu bukti otoritas](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [bukti otoritas dijelaskan](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [poa dalam blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique explained](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [poa yang tidak digunakan lagi, spesifikasi aura](https://openethereum.github.io/Chain-specification)
- [ibft 2,0, implementasi poa lainnya](https://besu.hyperledger.org/private-networks/concepts/poa)

### Selengkapnya tentang pelajar visual? {#visual-learner}

Tonton penjelasan visual tentang bukti otoritas:

<YouTube id="Mj10HSEM5_8" />

## Topik terkait {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)

