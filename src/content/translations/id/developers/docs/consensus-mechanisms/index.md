---
title: Mekanisme Konsensus
description: Penjelasan tentang protokol konsensus dalam sistem terdistribusi dan peran yang dimainkannya di Ethereum.
lang: id
incomplete: true
---

Jika terkait dengan blockchain seperti Ethereum, yang pada dasarnya adalah basis data terdistribusi, node jaringan harus dapat berkesesuaian dengan state sistem saat ini. Hal ini dicapai dengan menggunakan mekanisme konsensus.

Sekalipun mekanisme konsensus tidak secara langsung terkait dengan membangun dapp, memahaminya akan memperjelas konsep yang relevan untuk Anda dan pengalaman para pengguna Anda, seperti harga gas dan frekuensi transaksi.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca [pengantar Ethereum](/developers/docs/intro-to-ethereum/) kami terlebih dahulu.

## Apa itu konsensus? {#what-is-consensus}

Yang kami maksud dengan konsensus adalah kesepakatan umum yang telah dicapai. Anggaplah ada sebuah grup orang yang pergi ke bioskop. Jika tidak ada kesepakatan terhadap pilihan film yang diusulkan, maka konsensus dicapai. Dalam kasus ekstrem, grup akan pada akhirnya terpecah.

Terkait dengan blockchain, mencapai konsensus berarti setidaknya 51% node di jaringan sepakat tentang state jaringan global berikutnya.

## Apa itu mekanisme konsensus? {#what-is-a-consensus-mechanism}

Mekanisme konsensus (juga dikenal sebagai protokol konsensus atau algoritma konsensus) memungkinkan sistem terdistribusi (jaringan komputer) untuk bekerja bersama dan tetap aman.

Selama beberapa dekade, mekanisme ini telah digunakan untuk membangun konsensus di antara node basis data, server aplikasi, dan infrastruktur perusahaan lainnya. Dalam beberapa tahun terakhir, mekanisme konsensus baru telah diciptakan untuk memungkinkan sistem ekonomi kripto, seperti Ethereum, untuk berkesesuaian dengan state jaringan.

Mekanisme konsensus dalam sistem ekonomi kripto juga membantu mencegah beberapa jenis serangan ekonomi tertentu. Secara teori, penyerang dapat membahayakan konsensus dengan mengendalikan 51% jaringan. Mekanisme konsensus dirancang untuk membuat "serangan 51%" ini tidak mungkin dilakukan. Mekanisme yang berbeda direkayasa untuk memecahkan masalah keamanan ini dalam cara yang berbeda.

<YouTube id="dylgwcPH4EA" />

## Jenis-jenis mekanisme konsensus {#types-of-consensus-mechanisms}

### Bukti kerja {#proof-of-work}

Ethereum, seperti Bitcoin, saat ini menggunakan protokol konsensus **bukti kerja (PoW)**.

#### Pembuatan blok {#pow-block-creation}

Bukti kerja dijalankan oleh [penambang](/developers/docs/consensus-mechanisms/pow/mining/), yang bersaing untuk membuat blok baru yang penuh dengan transaksi yang diproses. Pemenang membagikan blok baru kepada jaringan lainnya dan mendapatkan beberapa ETH yang baru dicetak. Perlombaan dimenangkan oleh komputer siapa pun yang tercepat dalam memecahkan teka-teki matematika - ini menghasilkan tautan kriptografis antara blok saat ini dan blok sebelumnya. Memecahkan teka-teki ini adalah tugas di "bukti kerja".

#### Keamanan {#pow-security}

Jaringan tetap terjaga aman karena Anda memerlukan 51% daya komputasi jaringan untuk menipu rantai. Ini akan membutuhkan investasi sangat besar dalam peralatan dan energi; Anda mungkin menghabiskan lebih banyak daripada yang Anda dapatkan.

Selengkapnya tentang [bukti kerja](/developers/docs/consensus-mechanisms/pow/)

### Bukti taruhan {#proof-of-stake}

Ethereum memiliki rencana untuk melakukan peningkatan ke protokol konsensus **bukti taruhan (PoS)**.

#### Pembuatan blok {#pos-block-creation}

Bukti taruhan dijalankan oleh validator yang telah mempertaruhkan ETH untuk berpartisipasi dalam sistem. Validator dipilih secara acak untuk membuat blok baru, membagikannya dengan jaringan, dan mendapatkan imbalan. Alih-alih perlu melakukan pekerjaan komputasi yang intens, Anda hanya perlu menstaking ETH Anda di jaringan. Inilah yang mendorong perilaku jaringan yang sehat.

#### Keamanan {#pos-security}

Sistem bukti taruhan tetap aman karena Anda memerlukan 51% dari total ETH yang dipertaruhkan untuk menipu rantai. Dan bahwa taruhan Anda akan dipotong untuk perilaku jahat.

Selengkapnya tentang [bukti taruhan](/developers/docs/consensus-mechanisms/pos/)

### Panduan visual {#types-of-consensus-video}

Tonton selengkapnya tentang berbagai jenis mekanisme konsensus yang digunakan di Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Ketahanan Sybil dan pemilihan rantai {#sybil-chain}

Saat ini secara teknis, bukti kerja dan bukti taruhan pada dasarnya bukan protokol konsensus, tapi sering dianggap demikian agar mudah dipahami. Protokol ini sebenarnya merupakan mekanisme ketahanan Sybil dan pemilih penulis blok; merupakan cara untuk menentukan siapa penulis dari blok terakhir. Mekanisme ketahanan Sybil inilah yang dikombinasikan dengan aturan pemilihan rantai yang membentuk mekanisme konsensus sebenarnya.

**Ketahanan Sybil** mengukur seberapa kuat sebuah protokol menghadapi [serangan Sybil](https://wikipedia.org/wiki/Sybil_attack). Serangan Sybil terjadi saat satu pengguna atau grup berpura-pura menjadi banyak pengguna. Ketahanan terhadap jenis serangan ini penting untuk rantai blok terdesentralisasi dan memungkinkan para penambang dan validator diberi imbalan dengan adil sesuai dengan sumber daya yang terpakai. Bukti kerja dan bukti taruhan melawan serangan ini dengan membuat para pengguna menghabiskan banyak energi atau menyediakan banyak jaminan. Perlindungan ini adalah tindakan pencegahan ekonomis terhadap serangan Sybil.

**Aturan pemilihan rantai** digunakan untuk menentukan rantai mana yang merupakan rantai yang "benar". Ethereum dan Bitcoin saat ini menggunakan aturan "rantai terpanjang", yang berarti bahwa rantai blok mana pun yang merupakan rantai terpanjang akan menjadi acuan yang dianggap valid oleh keseluruhan node dan dengannya mereka akan bekerja. Untuk rantai bukti kerja, rantai terpanjangnya ditentukan oleh total tingkat kesulitan bukti kerja kumulatif dari rantai.

Kombinasi bukti kerja dan aturan rantai terpanjang dikenal sebagai "Konsensus Nakamoto."

[Rantai Suar](/upgrades/beacon-chain/) menggunakan mekanisme konsensus yang disebut [Casper the Friendly Finality Gadget](https://arxiv.org/abs/1710.09437), yang berbasis bukti taruhan.

## Bacaan lebih lanjut {#further-reading}

- [Apa itu Algoritma Konsensus Blockchain?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Apa itu Konsensus Nakamoto? Panduan Lengkap Untuk Pemula](https://blockonomi.com/nakamoto-consensus/)
- [Bagaimana Cara kerja Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Tentang Keamanan dan Kinerja Blockchain Bukti Kerja](https://eprint.iacr.org/2016/555.pdf)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Bukti kerja](/developers/docs/consensus-mechanisms/pow/)
- [Penambangan](/developers/docs/consensus-mechanisms/pow/mining/)
- [Bukti taruhan](/developers/docs/consensus-mechanisms/pos/)
