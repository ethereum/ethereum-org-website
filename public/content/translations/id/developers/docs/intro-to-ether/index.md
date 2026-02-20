---
title: Pengantar teknis untuk eter
description: Pengantar pengembang untuk mata uang kripto ether.
lang: id
---

## Persyaratan {#prerequisites}

Untuk membantu Anda lebih memahami halaman ini, kami sarankan Anda membaca [Pengenalan tentang Ethereum](/developers/docs/intro-to-ethereum/) terlebih dahulu.

## Apa itu mata uang kripto? {#what-is-a-cryptocurrency}

Mata uang kripto adalah sarana pertukaran yang diamankan oleh buku besar berbasis blockchain.

Sebuah sarana pertukaran adalah apa pun yang diterima luas sebagai pembayaran untuk barang dan layanan, dan sebuah buku besar adalah tempat penyimpanan data yang mencatat transaksi. Teknologi blockchain memungkinkan para pengguna membuat transaksi di buku besar tanpa mengandalkan pihak ketiga yang terpercaya untuk menjaga isi buku besarnya.

Mata uang kripto pertama adalah Bitcoin, yang dibuat oleh Satoshi Nakamoto. Sejak Bitcoin dirilis pada tahun 2009, orang-orang telah membuat ribuan mata uang kripto di banyak blockchain yang berbeda.

## Apa itu ether? {#what-is-ether}

**Ether (ETH)** adalah mata uang kripto yang digunakan untuk banyak hal di jaringan Ethereum. Pada dasarnya, ini adalah satu-satunya bentuk pembayaran yang dapat diterima untuk biaya transaksi, dan setelah [The Merge](/roadmap/merge), ether diperlukan untuk memvalidasi dan mengusulkan blok di Mainnet. Ether juga digunakan sebagai bentuk jaminan utama di pasar pinjaman [DeFi](/defi), sebagai unit akun di pasar NFT, sebagai pembayaran yang diperoleh untuk melakukan layanan atau menjual barang di dunia nyata, dan banyak lagi.

Ethereum memungkinkan pengembang untuk membuat [**aplikasi terdesentralisasi (dapps)**](/developers/docs/dapps), yang semuanya berbagi kumpulan daya komputasi. Pool bersama ini terbatas, sehingga Ethereum memerlukan sebuah mekanisme untuk menentukan siapa yang dapat menggunakannya. Jika tidak, sebuah dapp dapat secara tidak sengaja atau dengan maksud jahat menghabiskan semua sumber daya jaringan, yang akan menghalangi pengguna lainnya untuk mengaksesnya.

Mata uang kripto ether mendukung mekanisme penetapan harga untuk daya komputasi Ethereum. Ketika para pengguna ingin membuat transaksi, mereka harus membayar ether agar transaksi mereka dikenali di blockchain. Biaya penggunaan ini dikenal sebagai [biaya gas](/developers/docs/gas/), dan biaya gas bergantung pada jumlah daya komputasi yang diperlukan untuk mengeksekusi transaksi dan permintaan di seluruh jaringan untuk daya komputasi pada saat itu.

Oleh karena itu, sekalipun sebuah dapp jahat mengirimkan perulangan tak terhingga, transaksi pada akhirnya akan kehabisan gas dan terhenti, yang memungkinkan jaringan untuk kembali ke kondisi normal.

[Umumnya orang-orang menyamakan](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum dan ether — ketika orang merujuk pada "harga Ethereum," mereka sebenarnya menjelaskan harga ether.

## Mencetak ether {#minting-ether}

Mencetak adalah proses di mana ether baru dibuat di buku besar Ethereum. Protokol Ethereum yang mendasarinya membuat ether baru, dan ini tidak memungkinkan untuk seorang pengguna membuat ether.

"ether" dicetak sebagai imbalan dari setiap blok yang diusulkan dan pada setiap titik kontrol "epoch" untuk aktivitas validator lain yang terkait dengan mencapai konsensus. Jumlah keseluruhan yang diterbitkan bergantung kepada jumlah validator dan berapa banyak ether yang mereka taruh. Jumlah penerbitan ini dibagi merata kepada seluruh validator, pada situasi ideal ketika seluruh validator berlaku jujur dan dalam jaringan, namun pada praktiknya, hal tersebut bervariasi berdasarkan performa validator. Sekitar 1/8 dari total penerbitan diberikan kepada pelaku pengusulan blok; sisanya di distribusikan diantara validator lain. Pengusul blok juga menerima imbalan dari biaya transaksi dan pendapatan yang terkait MEV, namun hal ini berasal dari ether yang di daur ulang, bukan penerbitan baru.

## Membakar ether {#burning-ether}

Juga dengan pembuatan ether melalui imbalan blok, ether dapat dihancurkan oleh proses yang disebut 'pembakaran'. Ketika ether dibakar, ether dihilangkan dari perederan secara permananen.

Pembakaran ether terjadi dalam setiap transaksi di Ethereum. Ketika pengguna membayar transaksi mereka, biaya gas dasar yang ditetapkan oleh jaringan berdasarkan permintaan transaksi, akan dimusnahkan. Hal ini, dipadukan dengan ukuran blok yang bervariasi dan biaya gas maksimum, menyederhanakan perkiraan biaya transaksi di ethereum. Ketika permintaan jaringan tinggi, [blok](https://eth.blockscout.com/block/22580057) dapat membakar lebih banyak ether daripada yang mereka cetak, yang secara efektif mengimbangi penerbitan ether.

Pembakaran biaya dasar mengurangi kemampuan produsen blok untuk memanipulasi transaksi. Sebagai contoh, jika produsen blok menerima biaya dasar, mereka dapat menyertakan transaksi mereka sendiri secara gratis dan meningkatkan biaya dasar untuk semua orang. Sebagai alternatif, mereka dapat mengembalikan biaya dasar kepada beberapa pengguna secara offchain, yang dapat menghasilkan pasar biaya transaksi yang lebih kompleks dan tidak transparan.

## Denominasi ether {#denominations}

Dikarenakan banyak transaksi pada ethereum yang bernilai kecil, ether memiliki beberapa denominasi yang dapat dijadikan rujukan sebagai jumlah nilai yang lebih kecil. Dari denominasi ini, Wei dan gwei sangat penting.

Wei adalah jumlah ether terkecil, dan sebagai hasilnya, banyak implementasi teknis, seperti [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), akan mendasarkan semua perhitungan dalam Wei.

Gwei, kependekan dari giga-wei, sering digunakan untuk menggambarkan biaya gas di Ethereum.

| Denominasi | Nilai dalam ether | Penggunaan Umum                |
| ---------- | ----------------- | ------------------------------ |
| Wei        | 10<sup>-18</sup>  | Implementasi teknis            |
| Gwei       | 10<sup>-9</sup>   | Biaya gas yang terbaca manusia |

## Mentransfer ether {#transferring-ether}

Setiap transaksi di Ethereum berisi bidang `value`, yang menentukan jumlah ether yang akan ditransfer, didenominasikan dalam wei, untuk dikirim dari alamat pengirim ke alamat penerima.

Ketika alamat penerima adalah [kontrak pintar](/developers/docs/smart-contracts/), ether yang ditransfer ini dapat digunakan untuk membayar gas ketika kontrak pintar menjalankan kodenya.

[Selengkapnya tentang transaksi](/developers/docs/transactions/)

## Mengkueri ether {#querying-ether}

Pengguna dapat mengkueri saldo ether dari [akun](/developers/docs/accounts/) mana pun dengan memeriksa bidang `balance` akun, yang menunjukkan kepemilikan ether yang didenominasikan dalam wei.

[Etherscan](https://etherscan.io) dan [Blockscout](https://eth.blockscout.com) adalah alat populer untuk memeriksa saldo alamat melalui aplikasi berbasis web. Sebagai contoh, [halaman Blockscout ini](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) menampilkan saldo untuk Ethereum Foundation. Saldo akun juga dapat diperiksa menggunakan dompet digital atau langsung dengan mengirim permintaan ke node.

## Bacaan lebih lanjut {#further-reading}

- [Mendefinisikan ether dan Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Kertas Putih Ethereum](/whitepaper/): Proposal asli untuk Ethereum. Dokumen ini memasukkan deskripsi ether dan motivasi dibalik pembuatannya.
- [Kalkulator Gwei](https://www.alchemy.com/gwei-calculator): Gunakan kalkulator gwei ini untuk mengonversi wei, gwei, dan ether dengan mudah. Cukup masukkan jumlah dalam wei, gwei, atau ETH, dan konversinya akan dihitung secara otomatis.

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
