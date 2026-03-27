---
title: Mekanisme konsensus
description: Penjelasan tentang protokol konsensus dalam sistem terdistribusi dan perannya di Ethereum.
lang: id
---

Istilah 'mekanisme konsensus' sering digunakan dalam percakapan sehari-hari untuk merujuk pada protokol 'proof-of-stake', 'proof-of-work', atau 'proof-of-authority'. Namun, ini hanyalah komponen dalam mekanisme konsensus yang melindungi dari [serangan sybil](/glossary/#sybil-attack). Mekanisme konsensus adalah tumpukan lengkap ide, protokol, dan insentif yang memungkinkan sekumpulan node terdistribusi untuk menyetujui status blockchain.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca [pengenalan Ethereum](/developers/docs/intro-to-ethereum/) kami terlebih dahulu.

## Apa itu konsensus? {#what-is-consensus}

Dengan konsensus, yang kami maksud adalah kesepakatan umum telah tercapai. Pertimbangkan sekelompok orang yang pergi ke bioskop. Jika tidak ada ketidaksepakatan pada pilihan film yang diusulkan, maka konsensus tercapai. Jika ada ketidaksepakatan, kelompok tersebut harus memiliki cara untuk memutuskan film mana yang akan ditonton. Dalam kasus ekstrem, kelompok tersebut pada akhirnya akan berpisah.

Terkait dengan blockchain [Ethereum](/), prosesnya diformalkan, dan mencapai konsensus berarti setidaknya 66% dari node di jaringan menyetujui status global jaringan.

## Apa itu mekanisme konsensus? {#what-is-a-consensus-mechanism}

Istilah mekanisme konsensus merujuk pada seluruh tumpukan protokol, insentif, dan ide yang memungkinkan jaringan node untuk menyetujui status blockchain.

Ethereum menggunakan mekanisme konsensus berbasis proof-of-stake yang memperoleh keamanan kripto-ekonominya dari serangkaian hadiah dan penalti yang diterapkan pada modal yang dikunci oleh staker. Struktur insentif ini mendorong staker individu untuk mengoperasikan validator yang jujur, menghukum mereka yang tidak melakukannya, dan menciptakan biaya yang sangat tinggi untuk menyerang jaringan.

Kemudian, ada protokol yang mengatur bagaimana validator yang jujur dipilih untuk mengusulkan atau memvalidasi blok, memproses transaksi, dan memberikan suara untuk pandangan mereka tentang kepala rantai. Dalam situasi langka di mana beberapa blok berada di posisi yang sama di dekat kepala rantai, ada mekanisme pilihan fork yang memilih blok yang membentuk rantai 'terberat', diukur dengan jumlah validator yang memberikan suara untuk blok tersebut yang ditimbang berdasarkan saldo ether yang mereka stake.

Beberapa konsep penting untuk konsensus yang tidak secara eksplisit didefinisikan dalam kode, seperti keamanan tambahan yang ditawarkan oleh potensi koordinasi sosial di luar jalur sebagai garis pertahanan terakhir terhadap serangan pada jaringan.

Komponen-komponen ini bersama-sama membentuk mekanisme konsensus.

## Jenis-jenis mekanisme konsensus {#types-of-consensus-mechanisms}

### Berbasis proof-of-work {#proof-of-work}

Seperti Bitcoin, Ethereum pernah menggunakan protokol konsensus berbasis **proof-of-work (PoW)**.

#### Pembuatan blok {#pow-block-creation}

Penambang bersaing untuk membuat blok baru yang diisi dengan transaksi yang diproses. Pemenangnya membagikan blok baru tersebut dengan seluruh jaringan dan mendapatkan sejumlah ETH yang baru di-mint. Perlombaan dimenangkan oleh komputer yang mampu memecahkan teka-teki matematika paling cepat. Ini menghasilkan tautan kriptografi antara blok saat ini dan blok sebelumnya. Memecahkan teka-teki ini adalah pekerjaan dalam "proof-of-work". Rantai kanonikal kemudian ditentukan oleh aturan pilihan fork yang memilih kumpulan blok yang memiliki pekerjaan paling banyak yang dilakukan untuk menambangnya.

#### Keamanan {#pow-security}

Jaringan dijaga keamanannya oleh fakta bahwa Anda akan membutuhkan 51% dari daya komputasi jaringan untuk menipu rantai. Ini akan membutuhkan investasi yang sangat besar dalam peralatan dan energi; Anda kemungkinan akan menghabiskan lebih banyak daripada yang Anda dapatkan.

Lebih lanjut tentang [proof-of-work](/developers/docs/consensus-mechanisms/pow/)

### Berbasis proof-of-stake {#proof-of-stake}

Ethereum sekarang menggunakan protokol konsensus berbasis **proof-of-stake (PoS)**.

#### Pembuatan blok {#pos-block-creation}

Validator membuat blok. Satu validator dipilih secara acak di setiap slot untuk menjadi pengusul blok. Klien konsensus mereka meminta bundel transaksi sebagai 'muatan eksekusi' dari klien eksekusi yang dipasangkan. Mereka membungkus ini dalam data konsensus untuk membentuk blok, yang mereka kirim ke node lain di jaringan Ethereum. Produksi blok ini dihargai dalam ETH. Dalam kasus langka ketika beberapa kemungkinan blok ada untuk satu slot, atau node mendengar tentang blok pada waktu yang berbeda, algoritma pilihan fork memilih blok yang membentuk rantai dengan bobot pengesahan terbesar (di mana bobot adalah jumlah validator yang mengesahkan yang diskalakan berdasarkan saldo ETH mereka).

#### Keamanan {#pos-security}

Sistem proof-of-stake aman secara kripto-ekonomi karena penyerang yang mencoba mengambil kendali rantai harus menghancurkan sejumlah besar ETH. Sistem hadiah memberi insentif kepada staker individu untuk berperilaku jujur, dan penalti mengurangi insentif staker untuk bertindak jahat.

Lebih lanjut tentang [proof-of-stake](/developers/docs/consensus-mechanisms/pos/)

### Panduan visual {#types-of-consensus-video}

Tonton lebih lanjut tentang berbagai jenis mekanisme konsensus yang digunakan di Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Ketahanan sybil & pemilihan rantai {#sybil-chain}

Proof-of-work dan proof-of-stake saja bukanlah protokol konsensus, tetapi mereka sering disebut demikian untuk kesederhanaan. Mereka sebenarnya adalah mekanisme ketahanan sybil dan pemilih pembuat blok; mereka adalah cara untuk memutuskan siapa pembuat blok terbaru. Komponen penting lainnya adalah algoritma pemilihan rantai (alias pilihan fork) yang memungkinkan node untuk memilih satu blok yang benar di kepala rantai dalam skenario di mana beberapa blok ada di posisi yang sama.

**Ketahanan sybil** mengukur bagaimana sebuah protokol bertahan terhadap serangan sybil. Ketahanan terhadap jenis serangan ini sangat penting untuk blockchain yang terdesentralisasi dan memungkinkan penambang dan validator untuk dihargai secara setara berdasarkan sumber daya yang dimasukkan. Proof-of-work dan proof-of-stake melindungi dari hal ini dengan membuat pengguna menghabiskan banyak energi atau memberikan banyak jaminan. Perlindungan ini adalah pencegah ekonomi terhadap serangan sybil.

**Aturan pemilihan rantai** digunakan untuk memutuskan rantai mana yang merupakan rantai yang "benar". Bitcoin menggunakan aturan "rantai terpanjang", yang berarti bahwa blockchain mana pun yang terpanjang akan menjadi yang diterima sebagai valid dan dikerjakan oleh node lainnya. Untuk rantai proof-of-work, rantai terpanjang ditentukan oleh total kesulitan proof-of-work kumulatif rantai tersebut. Ethereum dulunya juga menggunakan aturan rantai terpanjang; namun, sekarang setelah Ethereum berjalan pada proof-of-stake, ia mengadopsi algoritma pilihan fork yang diperbarui yang mengukur 'bobot' rantai. Bobot adalah jumlah akumulasi suara validator, yang ditimbang berdasarkan saldo ether yang di-stake oleh validator.

Ethereum menggunakan mekanisme konsensus yang dikenal sebagai [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) yang menggabungkan [proof-of-stake Casper FFG](https://arxiv.org/abs/1710.09437) dengan [aturan pilihan fork GHOST](https://arxiv.org/abs/2003.03052).

## Bacaan lebih lanjut {#further-reading}

- [Apa Itu Algoritma Konsensus Blockchain?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Apa itu Konsensus Nakamoto? Panduan Lengkap untuk Pemula](https://blockonomi.com/nakamoto-consensus/)
- [Bagaimana Cara Kerja Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Tentang Keamanan dan Kinerja Blockchain Proof of Work](https://eprint.iacr.org/2016/555.pdf)
- [Kesalahan Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Penambangan](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)