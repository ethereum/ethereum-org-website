---
title: Penambangan
description: Penjelasan tentang bagaimana cara kerja penambangan di Ethereum.
lang: id
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Proof-of-work tidak lagi mendasari mekanisme konsensus Ethereum, yang berarti penambangan telah dimatikan. Sebaliknya, Ethereum diamankan oleh validator yang mempertaruhkan ETH. Anda dapat mulai menaruhkan ETH Anda hari ini. Read more on <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake</a>, and <a href='/staking/'>staking</a>. Halaman ini hanya untuk kepentingan sejarah.
</AlertDescription>
</AlertContent>
</Alert>

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, kami menyarankan Anda untuk membaca terlebih dahulu tentang [transaksi](/developers/docs/transactions/), [blok](/developers/docs/blocks/), dan [bukti kerja](/developers/docs/consensus-mechanisms/pow/).

## Apa itu penambangan Ethereum? {#what-is-ethereum-mining}

Penambangan adalah proses pembuatan blok transaksi yang akan ditambahkan ke blockchain Ethereum dalam arsitektur proof-of-work Ethereum yang sudah tidak digunakan lagi.

Kata mining berasal dari konteks analogi emas untuk mata uang kripto. Emas atau logam mulia merupakan barang langka, begitu pula token digital, dan satu-satunya cara untuk meningkatkan volume total dalam sistem proof-of-work adalah melalui penambangan. Dalam proof-of-work Ethereum, satu-satunya cara penerbitan adalah melalui penambangan. Tidak seperti emas atau logam mulia, penambangan Ethereum juga merupakan cara untuk mengamankan jaringan dengan cara membuat, memverifikasi, menerbitkan, dan menyebarkan blok-blok di dalam blockchain.

Menambang eter = Mengamankan Jaringan

Penambangan adalah sumber kehidupan dari setiap blockchain proof-of-work. Penambang Ethereum - komputer yang menjalankan perangkat lunak - menggunakan waktu dan daya komputasi mereka untuk memproses transaksi dan menghasilkan blok sebelum transisi ke bukti kepemilikan.

## Mengapa penambang ada? {#why-do-miners-exist}

Dalam sistem terdesentralisasi seperti Ethereum, kita perlu memastikan bahwa semua orang menyetujui urutan transaksi. Para penambang membantu hal ini terjadi dengan memecahkan teka-teki yang sulit secara komputasi untuk menghasilkan blok, mengamankan jaringan dari serangan.

[Selengkapnya tentang bukti kerja](/developers/docs/consensus-mechanisms/pow/)

Siapapun sebelumnya dapat menambang di jaringan Ethereum menggunakan komputer mereka. Namun, tidak semua orang dapat menambang ether (ETH) secara menguntungkan. Dalam banyak kasus, para penambang harus membeli perangkat keras komputer khusus, dan memiliki akses ke sumber energi yang murah. Rata-rata komputer tidak mungkin mendapatkan reward blok yang cukup untuk menutupi biaya penambangan.

### Biaya penambangan {#cost-of-mining}

- Potensi biaya untuk perangkat keras yang diperlukan untuk membangun dan mempertahankan rig penambangan
- Biaya pemakaian listrik untuk menjalankan rig penambangannya
- Jika Anda menambang di dalam pool, pool ini biasanya mengenakan biaya tetap dari setiap blok yang dihasilkan oleh pool
- Potensi biaya peralatan untuk mendukung rig penambangan (ventilasi, pengawasan energi, pemasangan kabel listrik, dll.)

Untuk mengeksplorasi profitabilitas penambangan lebih lanjut, gunakan kalkulator penambangan, seperti yang disediakan oleh [Etherscan](https://etherscan.io/ether-mining-calculator).

## Bagaimana transaksi Ethereum ditambang {#how-ethereum-transactions-were-mined}

Berikut ini adalah gambaran umum mengenai bagaimana transaksi ditambang dalam proof-of-work Ethereum. Deskripsi serupa tentang proses ini untuk bukti taruhan Ethereum dapat ditemukan [di sini](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Seorang pengguna menulis dan menandatangani permintaan [transaksi](/developers/docs/transactions/) dengan kunci pribadi dari sebuah [akun](/developers/docs/accounts/).
2. Pengguna menyiarkan permintaan transaksi ke seluruh jaringan Ethereum dari suatu [simpul](/developers/docs/nodes-and-clients/).
3. Setelah mendengar tentang permintaan transaksi baru, setiap node di jaringan Ethereum menambahkan permintaan ke mempool lokal mereka, daftar semua permintaan transaksi yang pernah mereka dengar yang belum dikomit ke blockchain dalam satu blok.
4. Pada titik tertentu, sebuah simpul penambangan mengumpulkan beberapa lusin atau ratusan permintaan transaksi ke dalam [blok](/developers/docs/blocks/) potensial, dengan cara yang memaksimalkan [biaya transaksi](/developers/docs/gas/) yang mereka peroleh sambil tetap berada di bawah batas gas blok. Node penambangan kemudian:
   1. Memverifikasi validitas setiap permintaan transaksi (yaitu, tidak ada yang mencoba mentransfer ether dari sebuah akun yang belum mereka tandatangani, permintaan tidak cacat format, dll.), lalu mengeksekusi kode permintaan, mengubah state pada salinan lokal EVM mereka. Penambang menghadiahi biaya transaksi untuk setiap permintaan transaksi tersebut ke akun mereka sendiri.
   2. Memulai proses pembuatan “sertifikat legitimasi” bukti kerja untuk blok potensial, setelah semua permintaan transaksi dalam blok telah diverifikasi dan dieksekusi pada salinan EVM lokal.
5. Akhirnya, penambang akan selesai memproduksi sertifikat untuk blok yang mencakup permintaan transaksi khusus kami. Penambang kemudian menyiarkan blok yang telah selesai, yang mencakup sertifikat dan checksum dari state EVM baru yang diklaim.
6. Node lain mendengar tentang blok baru. Mereka memverifikasi sertifikat, mengeksekusi semua transaksi di blok itu sendiri (termasuk transaksi yang awalnya disiarkan oleh pengguna kami), dan memverifikasi bahwa checksum state EVM baru mereka setelah eksekusi semua transaksi cocok dengan checksum state yang diklaim oleh blok penambang. Baru kemudian node-node ini menambahkan blok ini ke ekor blockchain mereka, dan menerima state EVM baru sebagai state kanonis.
7. Setiap node menghapus semua transaksi di blok baru dari mempool lokal mereka yang berisi permintaan transaksi yang tidak terpenuhi.
8. Node baru yang bergabung dengan jaringan mengunduh semua blok secara berurutan, termasuk blok yang berisi transaksi yang kami minati. Mereka menginisialisasi salinan EVM lokal (yang dimulai sebagai EVM state kosong), dan kemudian melalui proses mengeksekusi setiap transaksi di setiap blok di atas salinan EVM lokal mereka, yang memverifikasi checksum state di setiap blok sepanjang jalan.

Setiap transaksi ditambang (disertakan dalam blok baru dan disebarkan untuk pertama kalinya) satu kali, tetapi dieksekusi dan diverifikasi oleh setiap peserta dalam proses memajukan state EVM kanonis. Ini menyoroti salah satu mantra utama dari rantai blok: **Jangan percaya, verifikasi**.

## Blok Ommer (paman) {#ommer-blocks}

Penambangan blok pada proof-of-work bersifat probabilistik, yang berarti terkadang dua blok yang valid diterbitkan secara bersamaan karena latensi jaringan. Dalam kasus ini, protokol harus menentukan rantai terpanjang (dan oleh karena itu paling "valid") sambil memastikan keadilan bagi para penambang dengan memberikan penghargaan sebagian kepada blok valid yang tidak termasuk yang diusulkan. Hal ini mendorong desentralisasi jaringan lebih lanjut karena para penambang yang lebih kecil, yang mungkin menghadapi latensi lebih besar, masih dapat menghasilkan imbal hasil melalui hadiah blok [ommer](/glossary/#ommer).

Istilah "ommer" adalah istilah netral secara gender yang lebih disukai untuk menyebut saudara dari blok induk, tapi kadang-kadang juga disebut sebagai "paman". **Sejak perpindahan Ethereum ke bukti taruhan, blok ommer tidak lagi ditambang** karena hanya satu pengusul yang dipilih di setiap ruang. Anda dapat melihat perubahan ini dengan melihat [grafik historis](https://ycharts.com/indicators/ethereum_uncle_rate) dari blok ommer yang ditambang.

## Demo visual {#a-visual-demo}

Amati Austin memandu Anda melalui penambangan dan blockchain bukti kerja.

<YouTube id="zcX7OJ-L8XQ" />

## Algoritma penambangan {#mining-algorithm}

Jaringan Utama Ethereum hanya pernah menggunakan satu algoritma penambangan - ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash adalah penerus dari algoritma R&D asli yang dikenal sebagai ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Selengkapnya tentang algoritma penambangan](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Topik terkait {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
