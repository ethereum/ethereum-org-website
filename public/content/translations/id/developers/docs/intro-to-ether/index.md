---
title: Pengantar teknis tentang ether
description: Pengantar pengembang tentang mata uang kripto ether.
lang: id
---

## Prasyarat {#prerequisites}

Untuk membantu Anda memahami halaman ini dengan lebih baik, kami sarankan Anda membaca [Pengantar Ethereum](/developers/docs/intro-to-ethereum/) terlebih dahulu.

## Apa itu mata uang kripto? {#what-is-a-cryptocurrency}

Mata uang kripto adalah alat tukar yang diamankan oleh buku besar berbasis blockchain.

Alat tukar adalah segala sesuatu yang diterima secara luas sebagai pembayaran untuk barang dan jasa, dan buku besar adalah penyimpanan data yang melacak transaksi. Teknologi blockchain memungkinkan pengguna untuk melakukan transaksi pada buku besar tanpa bergantung pada pihak ketiga tepercaya untuk memelihara buku besar tersebut.

Mata uang kripto pertama adalah Bitcoin, yang diciptakan oleh Satoshi Nakamoto. Sejak perilisan Bitcoin pada tahun 2009, orang-orang telah membuat ribuan mata uang kripto di berbagai blockchain yang berbeda.

## Apa itu ether? {#what-is-ether}

**Ether (ETH)** adalah mata uang kripto yang digunakan untuk banyak hal di jaringan Ethereum. Pada dasarnya, ini adalah satu-satunya bentuk pembayaran yang dapat diterima untuk biaya transaksi, dan setelah [The Merge](/roadmap/merge), ether diperlukan untuk memvalidasi dan mengusulkan blok di Mainnet. Ether juga digunakan sebagai bentuk utama agunan di pasar pinjaman [DeFi](/defi), sebagai unit akun di pasar NFT, sebagai pembayaran yang diperoleh karena melakukan layanan atau menjual barang dunia nyata, dan banyak lagi.

Ethereum memungkinkan pengembang untuk membuat [**aplikasi terdesentralisasi (dapps)**](/developers/docs/dapps), yang semuanya berbagi kumpulan daya komputasi. Kumpulan daya komputasi bersama ini terbatas, sehingga Ethereum memerlukan mekanisme untuk menentukan siapa yang dapat menggunakannya. Jika tidak, sebuah dapp dapat secara tidak sengaja atau dengan niat jahat menghabiskan semua sumber daya jaringan, yang akan memblokir orang lain untuk mengaksesnya.

Mata uang kripto ether mendukung mekanisme penetapan harga untuk daya komputasi Ethereum. Ketika pengguna ingin melakukan transaksi, mereka harus membayar ether agar transaksi mereka dikenali di blockchain. Biaya penggunaan ini dikenal sebagai [biaya gas](/developers/docs/gas/), dan biaya gas bergantung pada jumlah daya komputasi yang diperlukan untuk mengeksekusi transaksi dan permintaan daya komputasi di seluruh jaringan pada saat itu.

Oleh karena itu, bahkan jika dapp yang berbahaya mengirimkan perulangan tak terbatas, transaksi tersebut pada akhirnya akan kehabisan ether dan berhenti, memungkinkan jaringan untuk kembali normal.

Sangat [umum untuk menyamakan](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum dan ether — ketika orang merujuk pada "harga Ethereum," mereka sebenarnya sedang mendeskripsikan harga ether.

## Mint ether {#minting-ether}

Mint adalah proses di mana ether baru dibuat di buku besar Ethereum. Protokol Ethereum yang mendasarinya membuat ether baru, dan tidak mungkin bagi pengguna untuk membuat ether.

Ether di-mint sebagai hadiah untuk setiap blok yang diusulkan dan pada setiap pos pemeriksaan epoch untuk aktivitas validator lainnya yang terkait dengan pencapaian konsensus. Jumlah total yang diterbitkan bergantung pada jumlah validator dan berapa banyak ether yang telah mereka stake. Total penerbitan ini dibagi rata di antara validator dalam kasus ideal di mana semua validator jujur dan online, tetapi pada kenyataannya, ini bervariasi berdasarkan kinerja validator. Sekitar 1/8 dari total penerbitan diberikan kepada pengusul blok; sisanya didistribusikan ke validator lainnya. Pengusul blok juga menerima tip dari biaya transaksi dan pendapatan terkait MEV, tetapi ini berasal dari ether yang didaur ulang, bukan penerbitan baru.

## Membakar ether {#burning-ether}

Selain membuat ether melalui hadiah blok, ether dapat dihancurkan melalui proses yang disebut 'pembakaran' (burning). Ketika ether dibakar, ether tersebut dihapus dari peredaran secara permanen.

Pembakaran ether terjadi di setiap transaksi di Ethereum. Ketika pengguna membayar transaksi mereka, biaya dasar gas, yang ditetapkan oleh jaringan sesuai dengan permintaan transaksional, akan dihancurkan. Hal ini, ditambah dengan ukuran blok yang bervariasi dan biaya gas maksimum, menyederhanakan estimasi biaya transaksi di Ethereum. Ketika permintaan jaringan tinggi, [blok](https://eth.blockscout.com/block/22580057) dapat membakar lebih banyak ether daripada yang di-mint, yang secara efektif mengimbangi penerbitan ether.

Membakar biaya dasar menghambat kemampuan produsen blok untuk memanipulasi transaksi. Misalnya, jika produsen blok menerima biaya dasar, mereka dapat memasukkan transaksi mereka sendiri secara gratis dan menaikkan biaya dasar untuk orang lain. Sebagai alternatif, mereka dapat mengembalikan biaya dasar kepada beberapa pengguna secara offchain, yang mengarah ke pasar biaya transaksi yang lebih buram dan kompleks.

## Denominasi ether {#denominations}

Karena nilai banyak transaksi di Ethereum kecil, ether memiliki beberapa denominasi yang dapat dirujuk sebagai unit akun yang lebih kecil. Dari denominasi ini, Wei dan gwei sangatlah penting.

Wei adalah jumlah ether terkecil yang mungkin, dan sebagai hasilnya, banyak implementasi teknis, seperti [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), akan mendasarkan semua perhitungan dalam Wei.

Gwei, kependekan dari giga-wei, sering digunakan untuk mendeskripsikan biaya gas di Ethereum.

| Denominasi   | Nilai dalam ether | Penggunaan Umum           |
| ------------ | ----------------- | ------------------------- |
| Wei          | 10<sup>-18</sup>  | Implementasi teknis       |
| Gwei         | 10<sup>-9</sup>   | Biaya gas yang dapat dibaca manusia |

## Mentransfer ether {#transferring-ether}

Setiap transaksi di Ethereum berisi bidang `value`, yang menentukan jumlah ether yang akan ditransfer, dalam denominasi wei, untuk dikirim dari alamat pengirim ke alamat penerima.

Ketika alamat penerima adalah [kontrak pintar](/developers/docs/smart-contracts/), ether yang ditransfer ini dapat digunakan untuk membayar gas ketika kontrak pintar mengeksekusi kodenya.

[Lebih lanjut tentang transaksi](/developers/docs/transactions/)

## Kueri ether {#querying-ether}

Pengguna dapat melakukan kueri saldo ether dari [akun](/developers/docs/accounts/) mana pun dengan memeriksa bidang `balance` akun tersebut, yang menunjukkan kepemilikan ether dalam denominasi wei.

[Etherscan](https://etherscan.io) dan [Blockscout](https://eth.blockscout.com) adalah alat populer untuk memeriksa saldo alamat melalui aplikasi berbasis web. Misalnya, [halaman Blockscout ini](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) menunjukkan saldo untuk Ethereum Foundation. Saldo akun juga dapat dikueri menggunakan dompet atau secara langsung dengan membuat permintaan ke node.

## Bacaan lebih lanjut {#further-reading}

- [Mendefinisikan ether dan Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Whitepaper Ethereum](/whitepaper/): Proposal asli untuk Ethereum. Dokumen ini mencakup deskripsi tentang ether dan motivasi di balik penciptaannya.
- [Kalkulator Gwei](https://www.alchemy.com/gwei-calculator): Gunakan kalkulator gwei ini untuk mengonversi wei, gwei, dan ether dengan mudah. Cukup masukkan jumlah wei, gwei, atau ETH apa pun dan hitung konversinya secara otomatis.

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_