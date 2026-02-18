---
title: Mekanisme Konsensus
description: Penjelasan tentang protokol konsensus dalam sistem terdistribusi dan peran yang dimainkannya di Ethereum.
lang: id
---

Istilah 'mekanisme konsensus' sering digunakan dalam bahasa sehari-hari untuk merujuk pada protokol 'bukti kepemilikan', 'bukti kerja', atau 'bukti otoritas'. Namun, ini hanyalah komponen dalam mekanisme konsensus yang melindungi terhadap [serangan Sybil](/glossary/#sybil-attack). Mekanisme konsensus adalah kumpulan ide, protokol, dan insentif yang memungkinkan sekumpulan node terdistribusi untuk menyepakati status blockchain.

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda untuk terlebih dahulu membaca [pengantar tentang Ethereum](/developers/docs/intro-to-ethereum/).

## Apa itu konsensus? {#what-is-consensus}

Yang kami maksud dengan konsensus adalah kesepakatan umum yang telah dicapai. Anggaplah ada sebuah grup orang yang pergi ke bioskop. Jika tidak ada ketidaksepakatan pada pilihan film yang diusulkan, maka konsensus tercapai. Jika ada ketidaksepakatan, kelompok harus memiliki sarana untuk memutuskan film mana yang akan ditonton. Dalam kasus yang ekstrim, kelompok ini pada akhirnya akan terpecah.

Dalam hal blockchain Ethereum, prosesnya diformalkan, dan mencapai konsensus berarti setidaknya 66% dari node di jaringan setuju dengan status global jaringan.

## Apa itu mekanisme konsensus? {#what-is-a-consensus-mechanism}

Istilah mekanisme konsensus mengacu pada seluruh tumpukan protokol, insentif, dan ide yang memungkinkan jaringan node untuk menyetujui status blockchain.

Ethereum menggunakan mekanisme konsensus berbasis bukti kepemilikan yang mendapatkan keamanan kripto-ekonominya dari serangkaian imbalan dan hukuman yang diterapkan pada modal yang dikunci oleh para stakers. Struktur insentif ini mendorong setiap stakers untuk mengoperasikan validator yang jujur, menghukum mereka yang tidak jujur, dan menciptakan biaya yang sangat tinggi untuk menyerang jaringan.

Kemudian, terdapat sebuah protokol yang mengatur bagaimana validator yang jujur dipilih untuk mengajukan atau memvalidasi blok, memproses transaksi, dan memberikan suara mereka untuk memilih kepala rantai. Dalam situasi yang jarang terjadi di mana beberapa blok berada di posisi yang sama di dekat kepala rantai, ada mekanisme fork-choice yang memilih blok yang membentuk rantai 'terberat', yang diukur dari jumlah validator yang memilih blok yang dibobotkan oleh saldo eter yang dipertaruhkan.

Beberapa konsep penting untuk konsensus yang tidak secara eksplisit didefinisikan dalam kode, seperti keamanan tambahan yang ditawarkan oleh potensi koordinasi sosial di luar jaringan sebagai garis pertahanan terakhir terhadap serangan pada jaringan.

Komponen-komponen ini bersama-sama membentuk mekanisme konsensus.

## Jenis-jenis mekanisme konsensus {#types-of-consensus-mechanisms}

### Berbasis Bukti Kerja {#proof-of-work}

Seperti Bitcoin, Ethereum pernah menggunakan protokol konsensus berbasis **bukti kerja (PoW)**.

#### Pembuatan blok {#pow-block-creation}

Para penambang berlomba-lomba membuat blok baru yang berisi transaksi yang telah diproses. Pemenang membagikan blok baru kepada jaringan lainnya dan mendapatkan beberapa ETH yang baru dicetak. Perlombaan ini dimenangkan oleh komputer yang mampu memecahkan teka-teki matematika tercepat. Ini menghasilkan tautan kriptografi antara blok saat ini dan blok sebelumnya. Memecahkan teka-teki ini adalah tugas di "bukti kerja". Rantai kanonik kemudian ditentukan oleh aturan fork-choice yang memilih sekumpulan blok yang paling banyak dikerjakan untuk menambangnya.

#### Keamanan {#pow-security}

Jaringan tetap terjaga aman karena Anda memerlukan 51% daya komputasi jaringan untuk menipu rantai. Ini akan membutuhkan investasi sangat besar dalam peralatan dan energi; Anda mungkin menghabiskan lebih banyak daripada yang Anda dapatkan.

Lebih lanjut tentang [bukti kerja](/developers/docs/consensus-mechanisms/pow/)

### Berbasis Bukti Taruhan {#proof-of-stake}

Ethereum sekarang menggunakan protokol konsensus berbasis **bukti taruhan (PoS)**.

#### Pembuatan blok {#pos-block-creation}

Validator membuat blok. Satu validator dipilih secara acak di setiap slot untuk menjadi pengusul blok. Klien konsensus mereka meminta sekumpulan transaksi sebagai 'muatan eksekusi' dari klien eksekusi berpasangan. Mereka membungkusnya dengan data konsensus untuk membentuk sebuah blok, yang kemudian dikirim ke node lain di jaringan Ethereum. Produksi blok ini dihargai dalam ETH. Dalam kasus yang jarang terjadi ketika ada beberapa kemungkinan blok untuk satu slot, atau node mendengar tentang blok pada waktu yang berbeda, algoritme fork choice akan memilih blok yang membentuk rantai dengan bobot pengesahan terbesar (di mana bobot adalah jumlah validator yang mengesahkan yang diskalakan dengan saldo ETH mereka).

#### Keamanan {#pos-security}

Sistem proof-of-stake adalah sistem yang aman secara kripto-ekonomi karena penyerang yang mencoba mengambil alih kendali rantai harus menghancurkan ETH dalam jumlah yang sangat besar. Sistem penghargaan memberikan insentif kepada setiap pemain untuk berperilaku jujur, dan hukuman memberikan disinsentif kepada pemain untuk bertindak jahat.

Lebih lanjut tentang [bukti taruhan](/developers/docs/consensus-mechanisms/pos/)

### Panduan visual {#types-of-consensus-video}

Tonton selengkapnya tentang berbagai jenis mekanisme konsensus yang digunakan di Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Ketahanan Sybil & pemilihan rantai {#sybil-chain}

Proof-of-work dan proof-of-stake sendiri bukanlah protokol konsensus, tetapi sering disebut demikian untuk mempermudah. Protokol ini sebenarnya merupakan mekanisme ketahanan Sybil dan pemilih penulis blok; merupakan cara untuk menentukan siapa penulis dari blok terakhir. Komponen penting lainnya adalah algoritma pemilihan rantai (juga dikenal sebagai algoritma pemilihan cabang) yang memungkinkan node memilih satu blok yang benar di bagian paling atas rantai dalam situasi di mana beberapa blok ada di posisi yang sama.

**Ketahanan Sybil** mengukur seberapa kuat suatu protokol menghadapi serangan Sybil. Ketahanan terhadap jenis serangan ini penting untuk rantai blok terdesentralisasi dan memungkinkan para penambang dan validator diberi imbalan dengan adil sesuai dengan sumber daya yang terpakai. Bukti kerja dan bukti taruhan melawan serangan ini dengan membuat para pengguna menghabiskan banyak energi atau menyediakan banyak jaminan. Perlindungan ini adalah tindakan pencegahan ekonomis terhadap serangan Sybil.

**Aturan pemilihan rantai** digunakan untuk menentukan rantai mana yang merupakan rantai yang "benar". Bitcoin menggunakan aturan "rantai terpanjang", yang berarti bahwa blockchain mana pun yang terpanjang akan menjadi blockchain yang diterima dan digunakan oleh node-node lainnya. Untuk rantai bukti kerja, rantai terpanjangnya ditentukan oleh total tingkat kesulitan bukti kerja kumulatif dari rantai. Ethereum juga pernah menggunakan aturan rantai terpanjang; namun, sekarang Ethereum berjalan berdasarkan bukti kepemilikan (proof-of-stake), Ethereum mengadopsi algoritme fork-choice yang telah diperbarui yang mengukur 'bobot' rantai. Bobot adalah jumlah akumulasi suara validator, yang dibobot oleh saldo staked-ether validator.

Ethereum menggunakan mekanisme konsensus yang dikenal sebagai [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) yang menggabungkan [bukti taruhan Casper FFG](https://arxiv.org/abs/1710.09437) dengan [aturan pilihan fork GHOST](https://arxiv.org/abs/2003.03052).

## Bacaan lebih lanjut {#further-reading}

- [Apa Itu Algoritma Konsensus Rantai Blok?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Apa itu Konsensus Nakamoto? Panduan Lengkap untuk Pemula](https://blockonomi.com/nakamoto-consensus/)
- [Bagaimana Cara Kerja Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Tentang Keamanan dan Kinerja Rantai Blok Bukti Kerja](https://eprint.iacr.org/2016/555.pdf)
- [Kesalahan Bizantium](https://en.wikipedia.org/wiki/Byzantine_fault)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Menambang](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Bukti Otoritas](/developers/docs/consensus-mechanisms/poa/)
