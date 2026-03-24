---
title: Penambangan
description: Penjelasan tentang bagaimana penambangan bekerja di Ethereum.
lang: id
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Proof-of-work tidak lagi mendasari mekanisme konsensus Ethereum, yang berarti penambangan telah dimatikan. Sebagai gantinya, [Ethereum](/) diamankan oleh validator yang melakukan stake ETH. Anda dapat mulai mengunci ETH Anda hari ini. Baca lebih lanjut tentang <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake</a>, dan <a href='/staking/'>mengunci</a>. Halaman ini hanya untuk kepentingan sejarah.
</AlertDescription>
</AlertContent>
</Alert>

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda terlebih dahulu membaca tentang [transaksi](/developers/docs/transactions/), [blok](/developers/docs/blocks/), dan [proof-of-work](/developers/docs/consensus-mechanisms/pow/).

## Apa itu penambangan Ethereum? {#what-is-ethereum-mining}

Penambangan adalah proses pembuatan blok transaksi untuk ditambahkan ke blockchain Ethereum dalam arsitektur proof-of-work Ethereum yang sekarang sudah tidak digunakan lagi.

Kata penambangan berasal dari konteks analogi emas untuk mata uang kripto. Emas atau logam mulia itu langka, begitu pula token digital, dan satu-satunya cara untuk meningkatkan total volume dalam sistem proof-of-work adalah melalui penambangan. Dalam Ethereum proof-of-work, satu-satunya mode penerbitan adalah melalui penambangan. Namun, tidak seperti emas atau logam mulia, penambangan Ethereum juga merupakan cara untuk mengamankan jaringan dengan membuat, memverifikasi, menerbitkan, dan menyebarkan blok di blockchain.

Menambang ether = Mengamankan Jaringan

Penambangan adalah sumber kehidupan dari setiap blockchain proof-of-work. Penambang Ethereum - komputer yang menjalankan perangkat lunak - menggunakan waktu dan daya komputasi mereka untuk memproses transaksi dan menghasilkan blok sebelum transisi ke proof-of-stake.

## Mengapa penambang ada? {#why-do-miners-exist}

Dalam sistem desentralisasi seperti Ethereum, kita perlu memastikan bahwa semua orang setuju pada urutan transaksi. Penambang membantu mewujudkan hal ini dengan memecahkan teka-teki yang sulit secara komputasi untuk menghasilkan blok, mengamankan jaringan dari serangan.

[Lebih lanjut tentang proof-of-work](/developers/docs/consensus-mechanisms/pow/)

Sebelumnya, siapa pun dapat menambang di jaringan Ethereum menggunakan komputer mereka. Namun, tidak semua orang dapat menambang ether (ETH) secara menguntungkan. Dalam kebanyakan kasus, penambang harus membeli perangkat keras komputer khusus, dan memiliki akses ke sumber energi yang murah. Komputer rata-rata tidak mungkin mendapatkan hadiah blok yang cukup untuk menutupi biaya penambangan terkait.

### Biaya penambangan {#cost-of-mining}

- Potensi biaya perangkat keras yang diperlukan untuk membangun dan memelihara rig penambangan
- Biaya listrik untuk menyalakan rig penambangan
- Jika Anda menambang di sebuah kolam (pool), kolam ini biasanya mengenakan biaya % tetap dari setiap blok yang dihasilkan oleh kolam tersebut
- Potensi biaya peralatan untuk mendukung rig penambangan (ventilasi, pemantauan energi, kabel listrik, dll.)

Untuk mengeksplorasi lebih lanjut profitabilitas penambangan, gunakan kalkulator penambangan, seperti yang disediakan oleh [Etherscan](https://etherscan.io/ether-mining-calculator).

## Bagaimana transaksi Ethereum ditambang {#how-ethereum-transactions-were-mined}

Berikut ini memberikan gambaran umum tentang bagaimana transaksi ditambang dalam proof-of-work Ethereum. Deskripsi analog dari proses ini untuk proof-of-stake Ethereum dapat ditemukan [di sini](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Seorang pengguna menulis dan menandatangani permintaan [transaksi](/developers/docs/transactions/) dengan kunci pribadi dari suatu [akun](/developers/docs/accounts/).
2. Pengguna menyiarkan permintaan transaksi ke seluruh jaringan Ethereum dari suatu [node](/developers/docs/nodes-and-clients/).
3. Setelah mendengar tentang permintaan transaksi baru, setiap node di jaringan Ethereum menambahkan permintaan tersebut ke mempool lokal mereka, daftar semua permintaan transaksi yang telah mereka dengar yang belum dimasukkan ke blockchain dalam sebuah blok.
4. Pada titik tertentu, node penambangan menggabungkan beberapa lusin atau ratusan permintaan transaksi ke dalam [blok](/developers/docs/blocks/) potensial, dengan cara yang memaksimalkan [biaya transaksi](/developers/docs/gas/) yang mereka peroleh sambil tetap berada di bawah batas gas blok. Node penambangan kemudian:
   1. Memverifikasi validitas setiap permintaan transaksi (yaitu, tidak ada yang mencoba mentransfer ether keluar dari akun yang belum mereka buatkan tanda tangannya, permintaan tidak cacat, dll.), dan kemudian mengeksekusi kode permintaan, mengubah status salinan EVM lokal mereka. Penambang memberikan biaya transaksi untuk setiap permintaan transaksi tersebut ke akun mereka sendiri.
   2. Memulai proses pembuatan "sertifikat legitimasi" proof-of-work untuk blok potensial, setelah semua permintaan transaksi di dalam blok telah diverifikasi dan dieksekusi pada salinan EVM lokal.
5. Pada akhirnya, seorang penambang akan selesai membuat sertifikat untuk sebuah blok yang mencakup permintaan transaksi spesifik kita. Penambang kemudian menyiarkan blok yang telah selesai, yang mencakup sertifikat dan checksum dari status EVM baru yang diklaim.
6. Node lain mendengar tentang blok baru tersebut. Mereka memverifikasi sertifikat, mengeksekusi semua transaksi pada blok itu sendiri (termasuk transaksi yang awalnya disiarkan oleh pengguna kita), dan memverifikasi bahwa checksum dari status EVM baru mereka setelah eksekusi semua transaksi cocok dengan checksum dari status yang diklaim oleh blok penambang. Hanya setelah itu node-node ini menambahkan blok ini ke ekor blockchain mereka, dan menerima status EVM baru sebagai status kanonikal.
7. Setiap node menghapus semua transaksi di blok baru dari mempool lokal mereka yang berisi permintaan transaksi yang belum terpenuhi.
8. Node baru yang bergabung dengan jaringan mengunduh semua blok secara berurutan, termasuk blok yang berisi transaksi yang kita minati. Mereka menginisialisasi salinan EVM lokal (yang dimulai sebagai EVM berstatus kosong), dan kemudian melalui proses mengeksekusi setiap transaksi di setiap blok di atas salinan EVM lokal mereka, memverifikasi checksum status di setiap blok di sepanjang jalan.

Setiap transaksi ditambang (dimasukkan ke dalam blok baru dan disebarkan untuk pertama kalinya) sekali, tetapi dieksekusi dan diverifikasi oleh setiap peserta dalam proses memajukan status EVM kanonikal. Hal ini menyoroti salah satu mantra utama blockchain: **Jangan percaya, verifikasi**.

## Blok ommer (uncle) {#ommer-blocks}

Penambangan blok pada proof-of-work bersifat probabilistik, yang berarti terkadang dua blok yang valid diterbitkan secara bersamaan karena latensi jaringan. Dalam hal ini, protokol harus menentukan rantai terpanjang (dan karenanya paling "valid") sambil memastikan keadilan terhadap penambang dengan memberikan sebagian hadiah pada blok valid yang diusulkan namun tidak disertakan. Hal ini mendorong desentralisasi jaringan lebih lanjut karena penambang yang lebih kecil, yang mungkin menghadapi latensi lebih besar, masih dapat menghasilkan keuntungan melalui hadiah blok [ommer](/glossary/#ommer).

Istilah "ommer" adalah istilah netral gender yang lebih disukai untuk saudara dari blok induk, tetapi ini juga kadang-kadang disebut sebagai "uncle" (paman). **Sejak Ethereum beralih ke proof-of-stake, blok ommer tidak lagi ditambang** karena hanya satu pengusul blok yang dipilih di setiap slot. Anda dapat melihat perubahan ini dengan melihat [grafik historis](https://ycharts.com/indicators/ethereum_uncle_rate) dari blok ommer yang ditambang.

## Demo visual {#a-visual-demo}

Tonton Austin memandu Anda melalui penambangan dan blockchain proof-of-work.

<YouTube id="zcX7OJ-L8XQ" />

## Algoritma penambangan {#mining-algorithm}

Mainnet Ethereum hanya pernah menggunakan satu algoritma penambangan - ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash adalah penerus dari algoritma R&D asli yang dikenal sebagai ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Lebih lanjut tentang algoritma penambangan](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Topik terkait {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)