---
title: Penambangan
description: Penjelasan tentang cara kerja penambangan Ethereum dan bagaimana hal itu membantu menjaga Ethereum tetap aman dan terdesentralisasi.
lang: id
incomplete: true
---

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, sebaiknya Anda membaca terlebih dahulu tentang [transaksi](/developers/docs/transactions/), [blok](/developers/docs/blocks/) dan [Bukti Kerja](/developers/docs/consensus-mechanisms/pow/).

## Apa itu penambangan Ethereum? {#what-is-ethereum-mining}

Penambangan adalah proses membuat blok transaksi untuk ditambahkan ke blockchain Ethereum.

Ethereum, seperti Bitcoin, saat ini menggunakan mekanisme konsensus [proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow/). Penambangan adalah sumber kehidupan bukti kerja. Penambang Ethereum - komputer yang menjalankan perangkat lunak - menggunakan waktu dan kekuatan komputasi mereka untuk memproses transaksi dan menghasilkan blok.

<InfoBanner emoji=":wave:">
   Bukti taruhan akan menggantikan penambangan dan bukti kerja dalam satu tahun ke depan. Anda dapat mulai menaruhkan ETH Anda hari ini. <a href="/staking/">Selengkapnya tentang penaruhan</a>    
</InfoBanner>

## Mengapa penambang ada? {#why-do-miners-exist}

Dalam sistem terdesentralisasi seperti Ethereum, kita perlu memastikan bahwa semua orang menyetujui urutan transaksi. Penambang membantu ini terjadi dengan memecahkan teka-teki yang sulit secara komputasi untuk menghasilkan blok, yang berfungsi sebagai cara untuk mengamankan jaringan dari serangan.

[Selengkapnya tentang bukti kerja](/developers/docs/consensus-mechanisms/pow/)

## Siapa yang bisa menjadi penambang di Ethereum? {#who-can-become-a-miner}

Secara teknis, siapa pun dapat menambang di jaringan Ethereum menggunakan komputer mereka. Namun, tidak semua orang dapat menambang ether (ETH) dan menghasilkan keuntungan. Dalam kebanyakan kasus, para penambang harus membeli perangkat keras komputer yang didedikasikan untuk menambang dan menghasilkan keuntungan. Meskipun benar bahwa siapa pun dapat menjalankan perangkat lunak penambangan di komputer mereka, tampaknya tidak mungkin untuk komputer dengan spesifikasi biasa mendapatkan imbalan blok yang cukup untuk menutupi semua biaya penambangan.

### Biaya penambangan {#cost-of-mining}

- Potensi biaya untuk perangkat keras yang diperlukan untuk membangun dan mempertahankan rig penambangan
- Biaya pemakaian listrik untuk menjalankan rig penambangannya
- Jika Anda menambang di sebuah pool, pool penambangan umumnya memungut biaya % tetap untuk tiap blok yang dihasilkan oleh poolnya
- Potensi biaya peralatan untuk mendukung rig penambangan (ventilasi, pengawasan energi, pemasangan kabel listrik, dll.)

Untuk lebih jauh menjelajahi keuntungan penambangan, gunakan kalkulator penambangan, seperti yang disediakan [Etherscan](https://etherscan.io/ether-mining-calculator).

## Bagaimana transaksi Ethereum ditambang {#how-ethereum-transactions-are-mined}

1. Seorang pengguna menulis dan menandatangani permintaan [transaksi](/developers/docs/transactions/) dengan kunci privat dari beberapa [akun](/developers/docs/accounts/).
2. Pengguna menyiarkan permintaan transaksi ke seluruh jaringan Ethereum dari beberapa [node](/developers/docs/nodes-and-clients/).
3. Setelah mendengar tentang permintaan transaksi baru, setiap node di jaringan Ethereum menambahkan permintaan ke mempool lokal mereka, daftar semua permintaan transaksi yang pernah mereka dengar yang belum dikomit ke blockchain dalam satu blok.
4. Pada titik tertentu, node penambangan mengumpulkan beberapa lusin atau ratusan permintaan transaksi ke dalam [blok](/developers/docs/blocks/) potensial, dengan cara yang memaksimalkan [biaya transaksi](/developers/docs/gas/) yang mereka peroleh saat masih berada di bawah batas gas blok. Node penambangan kemudian:
   1. Memverifikasi validitas setiap permintaan transaksi (yaitu tidak ada yang mencoba mentransfer ether dari akun yang tidak mereka tanda tangani, permintaan tidak salah format, dll.), dan kemudian mengeksekusi kode permintaan, mengubah state salinan lokal EVM mereka. Penambang menghadiahi biaya transaksi untuk setiap permintaan transaksi tersebut ke akun mereka sendiri.
   2. Memulai proses pembuatan “sertifikat legitimasi” Bukti Kerja untuk blok potensial, setelah semua permintaan transaksi di blok telah diverifikasi dan dieksekusi pada salinan EVM lokal.
5. Akhirnya, penambang akan selesai memproduksi sertifikat untuk blok yang mencakup permintaan transaksi khusus kami. Penambang kemudian menyiarkan blok yang telah selesai, yang mencakup sertifikat dan checksum dari state EVM baru yang diklaim.
6. Node lain mendengar tentang blok baru. Mereka memverifikasi sertifikat, mengeksekusi semua transaksi di blok itu sendiri (termasuk transaksi yang awalnya disiarkan oleh pengguna kami), dan memverifikasi bahwa checksum state EVM baru mereka setelah eksekusi semua transaksi cocok dengan checksum state yang diklaim oleh blok penambang. Baru kemudian node-node ini menambahkan blok ini ke ekor blockchain mereka, dan menerima state EVM baru sebagai state kanonis.
7. Setiap node menghapus semua transaksi di blok baru dari mempool lokal mereka yang berisi permintaan transaksi yang tidak terpenuhi.
8. Node baru yang bergabung dengan jaringan mengunduh semua blok secara berurutan, termasuk blok yang berisi transaksi yang kami minati. Mereka menginisialisasi salinan EVM lokal (yang dimulai sebagai EVM state kosong), dan kemudian melalui proses mengeksekusi setiap transaksi di setiap blok di atas salinan EVM lokal mereka, yang memverifikasi checksum state di setiap blok sepanjang jalan.

Setiap transaksi ditambang (disertakan dalam blok baru dan disebarkan untuk pertama kalinya) satu kali, tetapi dieksekusi dan diverifikasi oleh setiap peserta dalam proses memajukan state EVM kanonis. Ini menyoroti salah satu mantra utama blockchain: **Jangan percaya, verifikasi**.

## Demo visual {#a-visual-demo}

Amati Austin memandu Anda melalui penambangan dan blockchain bukti kerja.

<YouTube id="zcX7OJ-L8XQ" />

## Bacaan lebih lanjut {#further-reading}

- [Apa artinya menambang Ethereum?](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_

## Peralatan terkait {#related-tools}

- [Penambang Ethereum terbaik](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Kalkulator penambangan Etherscan](https://etherscan.io/ether-mining-calculator)
- [Minerstat mining calculator](https://minerstat.com/coin/ETH)

## Topik terkait {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Bukti kerja](/developers/docs/consensus-mechanisms/pow/)
