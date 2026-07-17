---
title: Penambangan
description: Penjelasan tentang bagaimana penambangan bekerja di Ethereum.
lang: id
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Bukti Kerja (PoW) tidak lagi mendasari mekanisme konsensus Ethereum, yang berarti penambangan telah dimatikan. Sebagai gantinya, [Ethereum](/) diamankan oleh validator yang melakukan stake ETH. Anda dapat mulai melakukan staking ETH Anda hari ini. Baca lebih lanjut tentang <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Bukti Kepemilikan (PoS)</a>, dan <a href='/staking/'>staking</a>. Halaman ini hanya untuk kepentingan sejarah.
</AlertDescription>
</AlertContent>
</Alert>

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [transaksi](/developers/docs/transactions/), [blok](/developers/docs/blocks/), dan [Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow/).

## Apa itu penambangan Ethereum? {#what-is-ethereum-mining}

Penambangan adalah proses pembuatan blok transaksi untuk ditambahkan ke rantai blok Ethereum dalam arsitektur Bukti Kerja (PoW) Ethereum yang kini sudah tidak digunakan lagi.

Kata penambangan berasal dari konteks analogi emas untuk mata uang kripto. Emas atau logam mulia itu langka, begitu pula token digital, dan satu-satunya cara untuk meningkatkan total volume dalam sistem Bukti Kerja (PoW) adalah melalui penambangan. Dalam Ethereum Bukti Kerja (PoW), satu-satunya mode penerbitan adalah melalui penambangan. Namun, tidak seperti emas atau logam mulia, penambangan Ethereum juga merupakan cara untuk mengamankan jaringan dengan membuat, memverifikasi, menerbitkan, dan menyebarkan blok di rantai blok.

Menambang Ether = Mengamankan Jaringan

Penambangan adalah urat nadi dari setiap rantai blok Bukti Kerja (PoW). Penambang Ethereum - komputer yang menjalankan perangkat lunak - menggunakan waktu dan daya komputasi mereka untuk memproses transaksi dan menghasilkan blok sebelum transisi ke Bukti Kepemilikan (PoS).

## Mengapa penambang ada? {#why-do-miners-exist}

Dalam sistem terdesentralisasi seperti Ethereum, kita perlu memastikan bahwa semua orang setuju dengan urutan transaksi. Penambang membantu mewujudkan hal ini dengan memecahkan teka-teki yang sulit secara komputasi untuk menghasilkan blok, mengamankan jaringan dari serangan.

[Lebih lanjut tentang Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow/)

Sebelumnya, siapa pun dapat menambang di jaringan Ethereum menggunakan komputer mereka. Namun, tidak semua orang dapat menambang Ether (ETH) secara menguntungkan. Dalam kebanyakan kasus, penambang harus membeli perangkat keras komputer khusus, dan memiliki akses ke sumber energi yang murah. Komputer rata-rata tidak mungkin mendapatkan imbalan blok yang cukup untuk menutupi biaya penambangan terkait.

### Biaya penambangan {#cost-of-mining}

- Potensi biaya perangkat keras yang diperlukan untuk membangun dan memelihara rig penambangan
- Biaya listrik untuk menyalakan rig penambangan
- Jika Anda menambang di sebuah pool, pool ini biasanya mengenakan biaya % tetap dari setiap blok yang dihasilkan oleh pool tersebut
- Potensi biaya peralatan untuk mendukung rig penambangan (ventilasi, pemantauan energi, kabel listrik, dll.)

Untuk mengeksplorasi lebih lanjut profitabilitas penambangan, gunakan kalkulator penambangan, seperti yang disediakan oleh [Etherscan](https://etherscan.io/ether-mining-calculator).

## Bagaimana transaksi Ethereum ditambang {#how-ethereum-transactions-were-mined}

Berikut ini memberikan gambaran umum tentang bagaimana transaksi ditambang dalam Bukti Kerja (PoW) Ethereum. Deskripsi analog dari proses ini untuk Bukti Kepemilikan (PoS) Ethereum dapat ditemukan [di sini](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Seorang pengguna menulis dan menandatangani permintaan [transaksi](/developers/docs/transactions/) dengan kunci privat dari suatu [akun](/developers/docs/accounts/).
2. Pengguna menyiarkan permintaan transaksi ke seluruh jaringan Ethereum dari suatu [node](/developers/docs/nodes-and-clients/).
3. Setelah mendengar tentang permintaan transaksi baru, setiap node di jaringan Ethereum menambahkan permintaan tersebut ke mempool lokal mereka, sebuah daftar dari semua permintaan transaksi yang telah mereka dengar yang belum dimasukkan ke rantai blok dalam sebuah blok.
4. Pada titik tertentu, sebuah node penambangan mengumpulkan beberapa lusin atau ratusan permintaan transaksi ke dalam [blok](/developers/docs/blocks/) potensial, dengan cara yang memaksimalkan [biaya transaksi](/developers/docs/gas/) yang mereka peroleh sambil tetap berada di bawah batas gas blok. Node penambangan kemudian:
   1. Memverifikasi validitas setiap permintaan transaksi (yaitu, tidak ada yang mencoba mentransfer Ether keluar dari akun yang belum mereka buatkan tanda tangannya, permintaan tersebut tidak cacat, dll.), dan kemudian mengeksekusi kode permintaan tersebut, mengubah state dari salinan EVM lokal mereka. Penambang memberikan biaya transaksi untuk setiap permintaan transaksi tersebut ke akun mereka sendiri.
   2. Memulai proses pembuatan "sertifikat legitimasi" Bukti Kerja (PoW) untuk blok potensial, setelah semua permintaan transaksi di dalam blok telah diverifikasi dan dieksekusi pada salinan EVM lokal.
5. Pada akhirnya, seorang penambang akan selesai membuat sertifikat untuk sebuah blok yang mencakup permintaan transaksi spesifik kita. Penambang kemudian menyiarkan blok yang telah selesai, yang mencakup sertifikat dan checksum dari state EVM baru yang diklaim.
6. Node lain mendengar tentang blok baru tersebut. Mereka memverifikasi sertifikat, mengeksekusi semua transaksi pada blok itu sendiri (termasuk transaksi yang awalnya disiarkan oleh pengguna kita), dan memverifikasi bahwa checksum dari state EVM baru mereka setelah eksekusi semua transaksi cocok dengan checksum dari state yang diklaim oleh blok penambang. Hanya setelah itu node-node ini menambahkan blok ini ke ekor rantai blok mereka, dan menerima state EVM baru sebagai state kanonikal.
7. Setiap node menghapus semua transaksi di blok baru dari mempool lokal mereka yang berisi permintaan transaksi yang belum terpenuhi.
8. Node baru yang bergabung dengan jaringan mengunduh semua blok secara berurutan, termasuk blok yang berisi transaksi yang kita minati. Mereka menginisialisasi salinan EVM lokal (yang dimulai sebagai EVM dengan state kosong), dan kemudian melalui proses mengeksekusi setiap transaksi di setiap blok di atas salinan EVM lokal mereka, memverifikasi checksum state di setiap blok di sepanjang jalan.

Setiap transaksi ditambang (dimasukkan ke dalam blok baru dan disebarkan untuk pertama kalinya) satu kali, tetapi dieksekusi dan diverifikasi oleh setiap peserta dalam proses memajukan state EVM kanonikal. Hal ini menyoroti salah satu mantra utama rantai blok: **Jangan percaya, verifikasi**.

## Blok ommer (paman) {#ommer-blocks}

Penambangan blok pada Bukti Kerja (PoW) bersifat probabilistik, yang berarti terkadang dua blok yang valid diterbitkan secara bersamaan karena latensi jaringan. Dalam kasus ini, protokol harus menentukan rantai terpanjang (dan karenanya paling "valid") sambil memastikan keadilan terhadap penambang dengan memberikan sebagian imbalan pada blok valid yang diusulkan namun tidak dimasukkan. Hal ini mendorong desentralisasi jaringan lebih lanjut karena penambang yang lebih kecil, yang mungkin menghadapi latensi lebih besar, masih dapat menghasilkan keuntungan melalui imbalan [blok ommer (paman)](/glossary/#ommer).

Istilah "ommer" adalah istilah netral gender yang lebih disukai untuk saudara dari blok induk, tetapi ini juga terkadang disebut sebagai "paman" (uncle). **Sejak perpindahan Ethereum ke Bukti Kepemilikan (PoS), blok ommer (paman) tidak lagi ditambang** karena hanya satu pengusul yang dipilih di setiap slot. Anda dapat melihat perubahan ini dengan melihat [grafik historis](https://ycharts.com/indicators/ethereum_uncle_rate) dari blok ommer (paman) yang ditambang.

## Demo visual {#a-visual-demo}

Tonton Austin memandu Anda melalui penambangan dan rantai blok Bukti Kerja (PoW).

<VideoWatch slug="blockchain-eth-build" />

## Algoritma penambangan {#mining-algorithm}

Mainnet Ethereum hanya pernah menggunakan satu algoritma penambangan - ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash adalah penerus dari algoritma R&D asli yang dikenal sebagai ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Lebih lanjut tentang algoritma penambangan](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Topik terkait {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow/)