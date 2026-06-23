---
title: Mekanisme konsensus
description: Penjelasan tentang protokol konsensus dalam sistem terdistribusi dan perannya di Ethereum.
lang: id
authors: ["Patrick Collins"]
---

Istilah 'mekanisme konsensus' sering digunakan secara bahasa sehari-hari untuk merujuk pada protokol 'Bukti Kepemilikan (PoS)', 'Bukti Kerja (PoW)', atau 'bukti otoritas (PoA)'. Namun, ini hanyalah komponen dalam mekanisme konsensus yang melindungi dari [serangan Sybil](/glossary/#sybil-attack). Mekanisme konsensus adalah tumpukan lengkap dari ide, protokol, dan insentif yang memungkinkan sekumpulan node terdistribusi untuk menyetujui state dari sebuah rantai blok.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu [pengantar Ethereum](/developers/docs/intro-to-ethereum/) kami.

## Apa itu konsensus? {#what-is-consensus}

Dengan konsensus, yang kami maksud adalah kesepakatan umum telah tercapai. Pertimbangkan sekelompok orang yang pergi ke bioskop. Jika tidak ada ketidaksepakatan pada pilihan film yang diusulkan, maka konsensus tercapai. Jika ada ketidaksepakatan, kelompok tersebut harus memiliki cara untuk memutuskan film mana yang akan ditonton. Dalam kasus ekstrem, kelompok tersebut pada akhirnya akan berpisah.

Terkait dengan rantai blok [Ethereum](/), prosesnya diformalkan, dan mencapai konsensus berarti setidaknya 66% dari node di jaringan menyetujui state global dari jaringan tersebut.

## Apa itu mekanisme konsensus? {#what-is-a-consensus-mechanism}

Istilah mekanisme konsensus merujuk pada seluruh tumpukan protokol, insentif, dan ide yang memungkinkan jaringan node untuk menyetujui state dari sebuah rantai blok.

Ethereum menggunakan mekanisme konsensus berbasis Bukti Kepemilikan (PoS) yang memperoleh keamanan kripto-ekonominya dari serangkaian hadiah dan penalti yang diterapkan pada modal yang dikunci oleh staker. Struktur insentif ini mendorong staker individu untuk mengoperasikan validator yang jujur, menghukum mereka yang tidak melakukannya, dan menciptakan biaya yang sangat tinggi untuk menyerang jaringan.

Kemudian, ada protokol yang mengatur bagaimana validator yang jujur dipilih untuk mengusulkan atau memvalidasi blok, memproses transaksi, dan memberikan suara untuk pandangan mereka tentang kepala rantai. Dalam situasi langka di mana beberapa blok berada di posisi yang sama di dekat kepala rantai, ada mekanisme pilihan cabang yang memilih blok yang membentuk rantai 'terberat', diukur dari jumlah validator yang memberikan suara untuk blok tersebut yang ditimbang berdasarkan saldo Ether yang di-stake.

Beberapa konsep penting untuk konsensus yang tidak secara eksplisit didefinisikan dalam kode, seperti keamanan tambahan yang ditawarkan oleh potensi koordinasi sosial di luar jalur (out-of-band) sebagai garis pertahanan terakhir terhadap serangan pada jaringan.

Komponen-komponen ini bersama-sama membentuk mekanisme konsensus.

## Jenis-jenis mekanisme konsensus {#types-of-consensus-mechanisms}

### Berbasis Bukti Kerja (PoW) {#proof-of-work}

Seperti Bitcoin, Ethereum pernah menggunakan protokol konsensus berbasis **Bukti Kerja (PoW)**.

#### Pembuatan blok {#pow-block-creation}

Penambang bersaing untuk membuat blok baru yang berisi transaksi yang telah diproses. Pemenangnya membagikan blok baru tersebut dengan seluruh jaringan dan mendapatkan sejumlah ETH yang baru dicetak. Perlombaan ini dimenangkan oleh komputer yang mampu memecahkan teka-teki matematika paling cepat. Ini menghasilkan tautan kriptografi antara blok saat ini dan blok sebelumnya. Memecahkan teka-teki ini adalah kerja dalam "Bukti Kerja (PoW)". Rantai kanonis kemudian ditentukan oleh aturan pilihan cabang yang memilih kumpulan blok yang memiliki paling banyak pekerjaan yang dilakukan untuk menambangnya.

#### Keamanan {#pow-security}

Jaringan tetap aman karena fakta bahwa Anda akan membutuhkan 51% dari daya komputasi jaringan untuk menipu rantai. Ini akan membutuhkan investasi yang sangat besar dalam peralatan dan energi; Anda kemungkinan akan menghabiskan lebih banyak daripada yang Anda dapatkan.

Lebih lanjut tentang [Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Berbasis Bukti Kepemilikan (PoS) {#proof-of-stake}

Ethereum sekarang menggunakan protokol konsensus berbasis **Bukti Kepemilikan (PoS)**.

#### Pembuatan blok {#pos-block-creation}

Validator membuat blok. Satu validator dipilih secara acak di setiap slot untuk menjadi pengusul blok. Klien konsensus mereka meminta sekumpulan transaksi sebagai 'muatan eksekusi' dari klien eksekusi yang dipasangkan dengannya. Mereka membungkus ini dalam data konsensus untuk membentuk sebuah blok, yang mereka kirim ke node lain di jaringan Ethereum. Produksi blok ini diberi hadiah dalam bentuk ETH. Dalam kasus langka ketika ada beberapa kemungkinan blok untuk satu slot, atau node mendengar tentang blok pada waktu yang berbeda, algoritme pilihan cabang memilih blok yang membentuk rantai dengan bobot atestasi terbesar (di mana bobot adalah jumlah validator yang melakukan atestasi yang diskalakan berdasarkan saldo ETH mereka).

#### Keamanan {#pos-security}

Sistem Bukti Kepemilikan (PoS) aman secara kripto-ekonomi karena penyerang yang mencoba mengambil kendali atas rantai harus menghancurkan sejumlah besar ETH. Sistem hadiah memberikan insentif kepada staker individu untuk berperilaku jujur, dan penalti memberikan disinsentif kepada staker agar tidak bertindak jahat.

Lebih lanjut tentang [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/)

### Panduan visual {#types-of-consensus-video}

Tonton lebih lanjut tentang berbagai jenis mekanisme konsensus yang digunakan di Ethereum:

<VideoWatch slug="understanding-consensus-mechanisms" />

### Ketahanan Sybil & pemilihan rantai {#sybil-chain}

Bukti Kerja (PoW) dan Bukti Kepemilikan (PoS) saja bukanlah protokol konsensus, tetapi sering disebut demikian untuk penyederhanaan. Keduanya sebenarnya adalah mekanisme ketahanan Sybil dan pemilih pembuat blok; keduanya adalah cara untuk memutuskan siapa pembuat blok terbaru. Komponen penting lainnya adalah algoritme pemilihan rantai (alias pilihan cabang) yang memungkinkan node untuk memilih satu blok tunggal yang benar di kepala rantai dalam skenario di mana terdapat beberapa blok di posisi yang sama.

**Ketahanan Sybil** mengukur bagaimana sebuah protokol bertahan terhadap serangan Sybil. Ketahanan terhadap jenis serangan ini sangat penting untuk rantai blok yang terdesentralisasi dan memungkinkan penambang dan validator untuk diberi hadiah secara setara berdasarkan sumber daya yang dimasukkan. Bukti Kerja (PoW) dan Bukti Kepemilikan (PoS) melindungi dari hal ini dengan membuat pengguna menghabiskan banyak energi atau memberikan banyak kolateral. Perlindungan ini adalah pencegah ekonomi terhadap serangan Sybil.

**Aturan pemilihan rantai** digunakan untuk memutuskan rantai mana yang merupakan rantai yang "benar". Bitcoin menggunakan aturan "rantai terpanjang", yang berarti rantai blok mana pun yang terpanjang akan menjadi rantai yang diterima sebagai valid dan dikerjakan oleh node lainnya. Untuk rantai Bukti Kerja (PoW), rantai terpanjang ditentukan oleh total kesulitan Bukti Kerja (PoW) kumulatif dari rantai tersebut. Ethereum dulunya juga menggunakan aturan rantai terpanjang; namun, sekarang karena Ethereum berjalan pada Bukti Kepemilikan (PoS), ia mengadopsi algoritme pilihan cabang yang diperbarui yang mengukur 'bobot' rantai. Bobot tersebut adalah jumlah akumulasi dari suara validator, yang ditimbang berdasarkan saldo Ether yang di-stake oleh validator.

Ethereum menggunakan mekanisme konsensus yang dikenal sebagai [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) yang menggabungkan [Bukti Kepemilikan (PoS) Casper FFG](https://arxiv.org/abs/1710.09437) dengan [aturan pilihan cabang GHOST](https://arxiv.org/abs/2003.03052).

## Bacaan lebih lanjut {#further-reading}

- [Apa Itu Algoritme Konsensus Rantai Blok?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Apa itu Konsensus Nakamoto? Panduan Lengkap untuk Pemula](https://blockonomi.com/nakamoto-consensus/)
- [Bagaimana Cara Kerja Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Tentang Keamanan dan Performa Rantai Blok Bukti Kerja](https://eprint.iacr.org/2016/555.pdf)
- [Kesalahan Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Penambangan](/developers/docs/consensus-mechanisms/pow/mining/)
- [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Bukti otoritas (PoA)](/developers/docs/consensus-mechanisms/poa/)