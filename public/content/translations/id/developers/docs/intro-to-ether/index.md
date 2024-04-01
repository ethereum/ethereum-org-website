---
title: Pengantar ether
description: Pengantar pengembang untuk mata uang kripto ether.
lang: id
---

## Prasyarat {#prerequisites}

Untuk membantu Anda lebih memahami halaman ini, kami sarankan Anda membaca [Pengantar Ethereum](/developers/docs/intro-to-ethereum/) terlebih dahulu.

## Apa itu mata uang kripto? {#what-is-a-cryptocurrency}

Mata uang kripto adalah sarana pertukaran yang diamankan oleh buku besar berbasis blockchain.

Sebuah sarana pertukaran adalah apa pun yang diterima luas sebagai pembayaran untuk barang dan layanan, dan sebuah buku besar adalah tempat penyimpanan data yang mencatat transaksi. Teknologi blockchain memungkinkan para pengguna membuat transaksi di buku besar tanpa mengandalkan pihak ketiga yang terpercaya untuk menjaga isi buku besarnya.

Mata uang kripto pertama adalah Bitcoin, yang dibuat oleh Satoshi Nakamoto. Sejak Bitcoin dirilis pada tahun 2009, orang-orang telah membuat ribuan mata uang kripto di banyak blockchain yang berbeda.

## Apa itu ether? {#what-is-ether}

**Ether (ETH)** adalah mata uang kripto yang digunakan untuk berbagai keperluan di jaringan Ethereum. Pada dasarnya, ini adalah satu-satunya bentuk pembayaran yang dapat diterima untuk biaya transaksi, dan setelah [penggabungan](/roadmap/merge) juga diperlukan untuk memvalidasi dan mengusulkan pemblokiran di Jaringan Utama. Ether juga digunakan sebagai bentuk jaminan utama di pasar pinjaman [DeFi](/defi), sebagai unit akun di pasar NFT, sebagai pembayaran yang diperoleh karena menjalanan layanan atau menjual barang dunia nyata, dan banyak lagi.

Ethereum memungkinkan pengembang untuk membuat [**aplikasi terdesentralisasi (dapp)**](/developers/docs/dapps), yang semuanya berbagi pool daya komputasi. Pool bersama ini terbatas, sehingga Ethereum memerlukan sebuah mekanisme untuk menentukan siapa yang dapat menggunakannya. Jika tidak, sebuah dapp dapat secara tidak sengaja atau dengan maksud jahat menghabiskan semua sumber daya jaringan, yang akan menghalangi pengguna lainnya untuk mengaksesnya.

Mata uang kripto ether mendukung mekanisme penetapan harga untuk daya komputasi Ethereum. Ketika para pengguna ingin membuat transaksi, mereka harus membayar ether agar transaksi mereka dikenali di blockchain. Biaya pemakaian ini dikenal sebagai [biaya gas](/developers/docs/gas/), dan biaya gas bergantung pada jumlah daya komputasi yang diperlukan untuk mengeksekusi transaksi dan permintaan keseluruhan jaringan untuk daya komputasi pada saat itu.

Oleh karena itu, sekalipun sebuah dapp jahat mengirimkan perulangan tak terhingga, transaksi pada akhirnya akan kehabisan gas dan terhenti, yang memungkinkan jaringan untuk kembali ke kondisi normal.

Sifatnya [umum](https://www.reuters.com/article/us-crypto-currencies-lending-insight-idUSKBN25M0GP#:~:text=price%20of%20ethereum) [untuk](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845#:~:text=cryptocurrencies%20including%20ethereum) [menggabungkan](https://www.cnn.com/2021/03/14/tech/nft-art-buying/index.html#:~:text=price%20of%20ethereum) Ethereum dan ether — ketika orang-orang merujuk "harga Ethereum," itu menggambarkan harga ether.

## Mencetak ether {#minting-ether}

Mencetak adalah proses di mana ether baru dibuat di buku besar Ethereum. Protokol Ethereum yang mendasarinya membuat ether baru, dan ini tidak memungkinkan untuk seorang pengguna membuat ether.

Ether dicetak saat seorang penambang membuat sebuah blok di blockchain Ethereum. Sebagai insentif bagi para penambang, protokol memberikan imbalan di setiap blok, yang menambahkan saldo dari alamat yang ditetapkan oleh blok penambang. Nilai imbalan blok telah berubah dari waktu ke waktu, dan hari ini nilainya sebesar 2 ETH per blok.

## Membakar ether {#burning-ether}

Sama halnya dengan pembuatan ether melalui imbalan blok, ether dapat dihancurkan oleh proses yang disebut 'pembakaran'. Ketika ether dibakar, ether dihilangkan dari perederan secara permananen.

Pembakaran ether terjadi dalam setiap transaksi di Ethereum. When users pay for their transactions, a base gas fee, set by the network according to transactional demand, gets destroyed. This, coupled with variable block sizes and a maximum gas fee, simplifies transaction fee estimation on Ethereum. When network demand is high, [blocks](https://etherscan.io/block/12965263) can burn more ether than they mint, effectively offsetting ether issuance.

Burning the base fee prevents various ways the miners could manipulate it otherwise. For example, if miners got the base fee, they could include their own transactions for free and raise the base fee for everyone else. Alternatively, they could refund the base fee to some users off-chain, leading to a more opaque and complex transaction fee market.

## Denominasi ether {#denominations}

Karena banyak transaksi di Ethereum bernilai kecil, ether memiliki beberapa denominasi yang mungkin dirujuk untuk jumlah nilai yang lebih kecil. Dari denominasi ini, Wei dan gwei sangat penting.

Wei adalah jumlah ether terkecil, dan sebagai hasilnya, banyak implementasi teknis, seperti [Yellowpaper Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), akan mendasarkan semua penghitungan dalam Wei.

Gwei, kependekan dari giga-wei, sering digunakan untuk menggambarkan biaya gas di Ethereum.

| Denominasi | Nilai dalam ether | Penggunaan Umum                |
| ---------- | ----------------- | ------------------------------ |
| Wei        | 10<sup>-18</sup>  | Implementasi teknis            |
| Gwei       | 10<sup>-9</sup>   | Biaya gas yang terbaca manusia |

## Mentransfer ether {#transferring-ether}

Setiap transaksi di Ethereum berisi bidang `value`, yang menentukan jumlah ether yang akan ditransfer, dalam denominasi wei, untuk dikirim dari alamat pengirim ke alamat penerima.

Ketika alamat penerima merupakan [kontrak pintar](/developers/docs/smart-contracts/), ether yang ditransfer ini dapat digunakan untuk membayar gas ketika kontrak pintar menjalankan kodenya.

[Lebih lanjut tentang transaksi](/developers/docs/transactions/)

## Membuat kueri ether {#querying-ether}

Pengguna dapat membuat kueri saldo eter dari [akun](/developers/docs/accounts/) dengan memeriksa bidang `balance` akun, yang menunjukkan kepemilikan ether dalam mata uang wei.

[Etherscan](https://etherscan.io) adalah sebuah peralatan populer untuk memeriksa saldo alamat melalui aplikasi berbasis web. Sebagai contoh, [halaman Etherscan ini](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) menampilkan saldo untuk Yayasan Ethereum.

## Bacaan lebih lanjut {#further-reading}

- [Mendefiniskan Ether dan Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _Grup CME_
- [Laporan Resmi Ethereum](/whitepaper/): Proposal asli untuk Ethereum. Dokumen ini memasukkan deskripsi ether dan motivasi dibalik pembuatannya.

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
