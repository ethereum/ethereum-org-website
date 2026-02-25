---
title: Rantai plasma
description: Pengantar rantai plasma sebagai solusi penskalaan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
incomplete: true
sidebarDepth: 3
---

Plasma chain adalah blockchain terpisah yang dihubungkan ke Ethereum Mainnet, tetapi mengeksekusi transaksi di luar rantai utama dengan mekanisme validasi bloknya sendiri. Plasma chain kadang disebut sebagai ‘child chain’, yang pada dasarnya merupakan salinan lebih kecil dari Ethereum Mainnet. Rantai plasma menggunakan [bukti penipuan](/glossary/#fraud-proof) (seperti [optimistic rollup](/developers/docs/scaling/optimistic-rollups/)) untuk mengadili sengketa.

Merkle tree memungkinkan pembuatan tumpukan rantai tanpa batas yang dapat berfungsi untuk mengurangi beban bandwidth dari rantai induk (termasuk Ethereum Mainnet). Namun, meskipun rantai-rantai ini mendapatkan sebagian keamanan dari Ethereum (melalui fraud proof), keamanan dan efisiensinya dipengaruhi oleh beberapa keterbatasan desain.

## Persyaratan {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang semua topik dasar dan pemahaman tingkat tinggi tentang [penskalaan Ethereum](/developers/docs/scaling/).

## Apa itu Plasma?

Plasma adalah sebuah kerangka kerja untuk meningkatkan skalabilitas dalam blockchain publik seperti Ethereum. Seperti yang dijelaskan dalam [whitepaper Plasma](http://plasma.io/plasma.pdf) yang asli, rantai Plasma dibangun di atas blockchain lain (disebut "rantai root"). Setiap child chain terhubung dari root chain dan umumnya dikelola oleh sebuah smart contract yang diterapkan di parent chain.

Kontrak Plasma berfungsi, antara lain, sebagai [jembatan](/developers/docs/bridges/) yang memungkinkan pengguna memindahkan aset antara Jaringan Utama Ethereum dan rantai plasma. Meskipun ini membuatnya mirip dengan [sidechain](/developers/docs/scaling/sidechains/), rantai plasma mendapat manfaat—setidaknya, sampai batas tertentu—dari keamanan Jaringan Utama Ethereum. Ini tidak seperti sidechain yang hanya bertanggung jawab atas keamanannya.

## Bagaimana cara kerja Plasma?

Komponen dasar dari kerangka kerja Plasma adalah:

### Komputasi di luar rantai {#offchain-computation}

Kecepatan pemrosesan Ethereum saat ini terbatas pada sekitar ~15–20 transaksi per detik, sehingga mengurangi kemungkinan jangka pendek untuk melakukan scaling agar dapat menangani lebih banyak pengguna. Masalah ini ada terutama karena [mekanisme konsensus](/developers/docs/consensus-mechanisms/) Ethereum mengharuskan banyak simpul peer-to-peer untuk memverifikasi setiap pembaruan pada status blockchain.

Meskipun mekanisme konsensus Ethereum diperlukan untuk keamanan, hal itu mungkin tidak berlaku untuk setiap kasus penggunaan. Sebagai contoh, Alice mungkin tidak perlu pembayaran hariannya kepada Bob untuk secangkir kopi diverifikasi oleh seluruh jaringan Ethereum, karena terdapat tingkat kepercayaan tertentu di antara keduanya.

Plasma mengandaikan bahwa Ethereum Mainnet tidak perlu memverifikasi semua transaksi. Sebaliknya, kita dapat memproses transaksi di luar Mainnet, sehingga node tidak perlu memvalidasi setiap transaksi.

Komputasi offchain diperlukan karena rantai plasma dapat mengoptimalkan kecepatan dan biaya. Sebagai contoh, sebuah rantai Plasma dapat—dan pada umumnya memang—menggunakan satu ‘operator’ untuk mengelola pengurutan dan eksekusi transaksi. Dengan hanya satu entitas yang memverifikasi transaksi, waktu pemrosesan pada rantai Plasma lebih cepat dibandingkan Ethereum Mainnet.

### Komitmen status {#state-commitments}

Meskipun Plasma mengeksekusi transaksi di luar rantai, transaksi tersebut tetap diselesaikan di lapisan eksekusi utama Ethereum—jika tidak, rantai Plasma tidak dapat memperoleh jaminan keamanan dari Ethereum. Namun, menyelesaikan transaksi offchain tanpa mengetahui keadaan rantai plasma akan merusak model keamanan dan memungkinkan penyebaran transaksi yang tidak valid. Inilah sebabnya operator, yaitu entitas yang bertanggung jawab memproduksi blok pada rantai plasma, diwajibkan untuk secara berkala mempublikasikan state commitments di Ethereum.

[Skema komitmen](https://en.wikipedia.org/wiki/Commitment_scheme) adalah teknik kriptografi untuk berkomitmen pada nilai atau pernyataan tanpa mengungkapkannya kepada pihak lain. Komitmen bersifat binding dalam arti bahwa setelah kamu melakukan komitmen pada suatu nilai atau pernyataan, kamu tidak dapat mengubahnya lagi. Komitmen status di Plasma berbentuk "akar Merkle" (berasal dari [pohon Merkle](/whitepaper/#merkle-trees)) yang dikirimkan operator secara berkala ke kontrak Plasma di rantai Ethereum.

Akar Merkle adalah primitif kriptografi yang memungkinkan kompresi sejumlah besar informasi. Akar Merkle (juga disebut "akar blok" dalam kasus ini) dapat mewakili semua transaksi dalam satu blok. Akar Merkle juga memudahkan untuk memverifikasi bahwa sepotong kecil data adalah bagian dari kumpulan data yang lebih besar. Misalnya, seorang pengguna dapat menghasilkan [bukti Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) untuk membuktikan pencantuman transaksi dalam blok tertentu.

Akar Merkle penting untuk memberikan informasi mengenai status off-chain kepada Ethereum. Kamu bisa menganggap Merkle roots seperti "titik simpan": operator seakan berkata, ‘Inilah kondisi Plasma chain pada waktu tertentu, dan inilah Merkle root sebagai buktinya." Operator berkomitmen pada _status saat ini_ dari rantai plasma dengan akar Merkle, itulah sebabnya ini disebut "komitmen status".

### Entri dan keluar {#entries-and-exits}

Agar pengguna Ethereum bisa memanfaatkan Plasma, harus ada mekanisme untuk memindahkan dana antara Mainnet dan plasma chain. Kita tidak bisa sembarangan mengirim ether ke sebuah alamat di plasma chain—karena chain ini tidak kompatibel, transaksi tersebut bisa gagal atau bahkan menyebabkan dana hilang.

Plasma menggunakan kontrak induk yang berjalan di Ethereum untuk memproses entri dan keluarnya pengguna. Kontrak utama ini juga bertanggung jawab untuk melacak state commitments (yang telah dijelaskan sebelumnya) dan menghukum perilaku tidak jujur melalui fraud proofs (yang akan dibahas nanti).

#### Memasuki rantai plasma {#entering-the-plasma-chain}

Untuk masuk ke dalam rantai plasma, Alice (pengguna) harus menyetor ETH atau token ERC-20 apa pun ke dalam kontrak plasma. Operator plasma, yang memantau setoran kontrak, membuat ulang jumlah yang sama dengan setoran awal Alice dan melepaskannya ke alamat miliknya di plasma chain. Alice diharuskan untuk membuktikan bahwa ia telah menerima dana di rantai anak dan kemudian dapat menggunakan dana tersebut untuk bertransaksi.

#### Keluar dari rantai plasma {#exiting-the-plasma-chain}

Keluar dari rantai plasma lebih kompleks daripada memasukinya karena beberapa alasan. Yang terbesar adalah, meskipun Ethereum memiliki informasi tentang status rantai plasma, ia tidak dapat memverifikasi apakah informasi tersebut benar atau tidak. Pengguna yang berniat jahat dapat membuat pernyataan yang tidak benar ("Saya memiliki 1000 ETH") dan lolos dengan memberikan bukti palsu untuk mendukung klaim tersebut.

Untuk mencegah penarikan dana yang berbahaya, "periode tantangan" diperkenalkan. Selama periode sanggahan (biasanya seminggu), siapa pun dapat mengajukan sanggahan atas permintaan penarikan dana dengan menggunakan bukti penipuan. Jika tantangan berhasil, maka permintaan penarikan dana ditolak.

Namun, biasanya pengguna jujur dan membuat klaim yang benar tentang dana yang mereka miliki. Dalam skenario ini, Alice akan memulai permintaan penarikan pada rantai akar (Ethereum) dengan mengirimkan transaksi ke kontrak plasma.

Dia juga harus memberikan bukti Merkle yang memverifikasi bahwa transaksi yang menciptakan dananya di rantai Plasma telah dimasukkan ke dalam blok. Ini diperlukan untuk iterasi Plasma, seperti [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), yang menggunakan model [Output Transaksi yang Belum Dibelanjakan (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Yang lain, seperti [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), merepresentasikan dana sebagai [token yang tidak dapat dipertukarkan](/developers/docs/standards/tokens/erc-721/) alih-alih UTXO. Penarikan, dalam hal ini, membutuhkan bukti kepemilikan token pada rantai Plasma. Hal ini dilakukan dengan mengirimkan dua transaksi terakhir yang melibatkan token dan memberikan bukti Merkle yang memverifikasi penyertaan transaksi tersebut ke dalam blok.

Pengguna juga harus menambahkan jaminan pada permintaan penarikan dana sebagai jaminan perilaku jujur. Jika penantang membuktikan bahwa permintaan penarikan Alice tidak valid, ikatannya akan dipotong, dan sebagian akan diberikan kepada penantang sebagai hadiah.

Jika periode tantangan berlalu tanpa ada yang memberikan bukti penipuan, permintaan penarikan Alice dianggap sah, sehingga ia dapat mengambil setoran dari kontrak Plasma di Ethereum.

### Arbitrase sengketa {#dispute-arbitration}

Seperti blockchain lainnya, rantai plasma memerlukan mekanisme untuk menegakkan integritas transaksi jika peserta bertindak jahat (misalnya, pembelanjaan ganda dana). Untuk itu, rantai plasma menggunakan bukti-bukti kecurangan untuk menengahi perselisihan terkait keabsahan transisi negara dan menghukum perilaku buruk. Bukti-bukti penipuan digunakan sebagai mekanisme di mana rantai anak Plasma mengajukan keluhan ke rantai induknya atau ke rantai induk.

Bukti kecurangan hanyalah sebuah klaim bahwa transisi keadaan tertentu tidak valid. Contohnya adalah jika pengguna (Alice) mencoba membelanjakan dana yang sama dua kali. Mungkin dia membelanjakan UTXO dalam sebuah transaksi dengan Bob dan ingin membelanjakan UTXO yang sama (yang sekarang menjadi milik Bob) dalam transaksi lain.

Untuk mencegah penarikan, Bob akan membuat bukti penipuan dengan memberikan bukti bahwa Alice membelanjakan UTXO tersebut dalam transaksi sebelumnya dan bukti Merkle atas penyertaan transaksi tersebut ke dalam blok. Proses yang sama berlaku di Plasma Cash-Bob perlu memberikan bukti bahwa Alice sebelumnya mentransfer token yang ingin ia tarik.

Jika tantangan Bob berhasil, permintaan penarikan Alice akan dibatalkan. Namun, pendekatan ini bergantung pada kemampuan Bob untuk mengawasi rantai permintaan penarikan dana. Jika Bob sedang offline, maka Alice dapat memproses penarikan berbahaya setelah periode tantangan berakhir.

## Masalah keluar massal di plasma {#the-mass-exit-problem-in-plasma}

Masalah keluar massal terjadi ketika sejumlah besar pengguna mencoba menarik diri dari rantai plasma pada saat yang bersamaan. Alasan masalah ini ada berkaitan dengan salah satu masalah terbesar Plasma: **tidak tersedianya data**.

Ketersediaan data adalah kemampuan untuk memverifikasi bahwa informasi untuk blok yang diusulkan benar-benar dipublikasikan di jaringan blockchain. Sebuah blok dikatakan "tidak tersedia" jika produsen menerbitkan blok itu sendiri tetapi menahan data yang digunakan untuk membuat blok tersebut.

Blok harus tersedia jika node ingin mengunduh blok dan memverifikasi keabsahan transaksi. Blockchain memastikan ketersediaan data dengan memaksa produsen blok untuk memposting semua data transaksi ke dalam blockchain.

Ketersediaan data juga membantu mengamankan protokol penskalaan off-chain yang dibangun di atas lapisan dasar Ethereum. Dengan memaksa operator pada rantai ini untuk mempublikasikan data transaksi di Ethereum, siapa pun dapat menentang blok yang tidak valid dengan membuat bukti penipuan yang merujuk pada status rantai yang benar.

Rantai plasma utamanya menyimpan data transaksi dengan operator dan **tidak menerbitkan data apa pun di Jaringan Utama** (yaitu, selain komitmen status berkala). Ini berarti pengguna harus bergantung pada operator untuk menyediakan data blokir jika mereka perlu membuat bukti penipuan yang menentang transaksi yang tidak valid. Jika sistem ini berhasil, maka pengguna selalu dapat menggunakan bukti penipuan untuk mengamankan dana.

Masalahnya dimulai ketika operator, bukan sembarang pengguna, adalah pihak yang bertindak jahat. Karena operator memegang kendali penuh atas blockchain, mereka memiliki lebih banyak insentif untuk memajukan transisi status yang tidak valid dalam skala yang lebih besar, seperti mencuri dana milik pengguna di rantai plasma.

Dalam hal ini, menggunakan sistem anti-penipuan klasik tidak akan berhasil. Operator dapat dengan mudah membuat transaksi yang tidak valid dengan mentransfer dana Alice dan Bob ke dompet mereka dan menyembunyikan data yang diperlukan untuk membuat bukti penipuan. Hal ini dimungkinkan karena operator tidak diwajibkan untuk menyediakan data bagi pengguna atau Mainnet.

Oleh karena itu, solusi yang paling optimis adalah dengan mencoba "keluarnya pengguna secara massal" dari rantai plasma. Keluar secara massal memperlambat rencana operator jahat untuk mencuri dana dan memberikan perlindungan bagi pengguna. Permintaan penarikan diurutkan berdasarkan kapan setiap UTXO (atau token) dibuat, sehingga mencegah operator jahat mendahului pengguna yang jujur.

Meskipun demikian, kami masih membutuhkan cara untuk memverifikasi keabsahan permintaan penarikan selama keluar massal - untuk mencegah orang-orang oportunis mengambil keuntungan dari kekacauan yang terjadi dalam proses keluar yang tidak valid. Solusinya sederhana: mewajibkan pengguna untuk memposting **status rantai terakhir yang valid** untuk menarik uang mereka.

Tetapi pendekatan ini masih memiliki masalah. Sebagai contoh, jika semua pengguna dalam sebuah rantai plasma harus keluar (yang mungkin terjadi jika ada operator yang jahat), maka seluruh status valid dari rantai plasma tersebut harus dibuang ke dalam lapisan dasar Ethereum sekaligus. Dengan ukuran rantai plasma yang berubah-ubah (throughput tinggi = lebih banyak data) dan kendala pada kecepatan pemprosesan Ethereum, ini bukanlah solusi yang ideal.

Meskipun keluar permainan terdengar bagus secara teori, keluar massal di kehidupan nyata kemungkinan besar akan memicu kemacetan di seluruh jaringan di Ethereum itu sendiri. Selain merusak fungsionalitas Ethereum, keluar massal yang tidak terkoordinasi dengan baik berarti pengguna mungkin tidak dapat menarik dana sebelum operator menguras semua akun di rantai plasma.

## Kelebihan dan kekurangan plasma {#pros-and-cons-of-plasma}

| Kelebihan                                                                                                                                                                                                                                                                                                  | Kekurangan                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Menawarkan hasil yang tinggi dan biaya rendah per transaksi.                                                                                                                                                                                                                               | Tidak mendukung komputasi umum (tidak dapat menjalankan smart contract). Hanya pentransferan, penukaran token biasa, dan beberapa jenis transaksi lainnya yang didukung melalui logika predikat. |
| Baik untuk transaksi antara pengguna yang berwenang (tidak ada overhead per pasangan pengguna jika keduanya dibuat pada rantai plasma)                                                                                                                                                  | Perlu secara berkala mengawasi jaringan (persyaratan liveness) atau mendelegasikan tanggung jawab ini kepada orang lain untuk memastikan keamanan dana Anda.                                                     |
| Rantai plasma dapat diadaptasi untuk kasus penggunaan tertentu yang tidak terkait dengan rantai utama. Siapa pun, termasuk bisnis, dapat menyesuaikan kontrak pintar Plasma untuk menyediakan infrastruktur yang dapat diskalakan yang bekerja dalam konteks yang berbeda. | Mengandalkan satu atau lebih operator untuk menyimpan data dan menyajikannya berdasarkan permintaan.                                                                                                                                |
| Mengurangi beban pada Ethereum Mainnet dengan memindahkan komputasi dan penyimpanan di luar jaringan.                                                                                                                                                                                      | Penarikan tertunda beberapa hari untuk memungkinkan sanggahan. Untuk aset yang dapat dipertukarkan, hal ini dapat dimitigasi oleh penyedia likuiditas, tetapi ada biaya modal yang terkait.                         |
|                                                                                                                                                                                                                                                                                                            | Jika terlalu banyak pengguna yang mencoba keluar secara bersamaan, Ethereum Mainnet dapat mengalami kemacetan.                                                                                                                      |

## Plasma vs protokol penskalaan Layer 2 {#plasma-vs-layer-2}

Meskipun Plasma pernah dianggap sebagai solusi penskalaan yang berguna untuk Ethereum, kini ia telah ditinggalkan dan digantikan oleh [protokol penskalaan layer 2 (L2)](/layer-2/). Solusi penskalaan L2 memperbaiki beberapa masalah Plasma:

### Efisiensi {#efficiency}

[Zero-knowledge rollup](/developers/docs/scaling/zk-rollups) menghasilkan bukti kriptografi tentang validitas setiap batch transaksi yang diproses di luar rantai. Hal ini mencegah pengguna (dan operator) memajukan transisi status yang tidak valid, sehingga tidak perlu ada periode tantangan dan keluar dari permainan. Ini juga berarti pengguna tidak perlu memantau rantai secara berkala untuk mengamankan dana mereka.

### Dukungan untuk kontrak pintar {#support-for-smart-contracts}

Masalah lain dengan kerangka kerja plasma adalah [ketidakmampuan untuk mendukung eksekusi kontrak pintar Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Akibatnya, sebagian besar implementasi Plasma sebagian besar dibangun untuk pembayaran sederhana atau pertukaran token ERC-20.

Sebaliknya, optimistic rollup, kompatibel dengan [Mesin Virtual Ethereum](/developers/docs/evm/) dan dapat menjalankan [kontrak pintar](/developers/docs/smart-contracts/) asli Ethereum, menjadikannya solusi yang berguna dan _aman_ untuk penskalaan [aplikasi terdesentralisasi](/developers/docs/dapps/). Demikian pula, ada rencana untuk [membuat implementasi zero-knowledge dari EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) yang akan memungkinkan ZK-rollup untuk memproses logika arbitrer dan mengeksekusi kontrak pintar.

### Ketersediaan Data {#data-unavailability}

Seperti yang telah dijelaskan sebelumnya, plasma mengalami masalah ketersediaan data. Jika operator yang jahat memajukan transisi yang tidak valid pada rantai plasma, pengguna tidak akan dapat menantangnya karena operator dapat menahan data yang diperlukan untuk membuat bukti penipuan. Rollup memecahkan masalah ini dengan memaksa operator untuk memposting data transaksi di Ethereum, yang memungkinkan siapa saja untuk memverifikasi status rantai dan membuat bukti penipuan jika perlu.

### Masalah keluar massal {#mass-exit-problem}

ZK-rollup dan rollup optimis keduanya memecahkan masalah keluarnya massa Plasma dengan berbagai cara. Sebagai contoh, ZK-rollup bergantung pada mekanisme kriptografi yang memastikan operator tidak dapat mencuri dana pengguna dalam skenario apa pun.

Demikian pula, rollingan optimis memberlakukan periode penundaan pada penarikan di mana siapa pun dapat memulai tantangan dan mencegah permintaan penarikan yang berbahaya. Meskipun mirip dengan Plasma, perbedaannya adalah verifikator memiliki akses ke data yang diperlukan untuk membuat bukti kecurangan. Dengan demikian, pengguna rollup tidak perlu melakukan migrasi "siapa cepat dia dapat" ke Ethereum Mainnet.

## Apa perbedaan Plasma dengan sidechain dan sharding? {#plasma-sidechains-sharding}

Plasma, sidechain, dan sharding cukup mirip karena semuanya terhubung ke Ethereum Mainnet dengan cara tertentu. Namun, tingkat dan kekuatan koneksi ini bervariasi, yang memengaruhi sifat keamanan setiap solusi penskalaan.

### Plasma vs sidechain {#plasma-vs-sidechains}

[Sidechain](/developers/docs/scaling/sidechains/) adalah blockchain yang dioperasikan secara independen yang terhubung ke Jaringan Utama Ethereum melalui jembatan dua arah. [Jembatan](/bridges/) memungkinkan pengguna untuk menukarkan token di antara kedua blockchain untuk bertransaksi di sidechain, mengurangi kemacetan di Jaringan Utama Ethereum dan meningkatkan skalabilitas.
Sidechain menggunakan mekanisme konsensus yang terpisah dan biasanya jauh lebih kecil daripada Ethereum Mainnet. Akibatnya, menjembatani aset ke rantai ini melibatkan peningkatan risiko; mengingat kurangnya jaminan keamanan yang diwarisi dari Ethereum Mainnet dalam model sidechain, pengguna berisiko kehilangan dana dalam serangan terhadap sidechain.

Sebaliknya, rantai plasma mendapatkan keamanannya dari Mainnet. Hal ini membuat mereka jauh lebih aman dibandingkan dengan sidechain. Baik sidechain maupun rantai plasma dapat memiliki protokol konsensus yang berbeda, tetapi perbedaannya adalah rantai plasma mempublikasikan akar Merkle untuk setiap blok di Ethereum Mainnet. Akar blok adalah potongan-potongan kecil informasi yang dapat kita gunakan untuk memverifikasi informasi tentang transaksi yang terjadi pada rantai plasma. Jika terjadi serangan pada rantai plasma, pengguna dapat dengan aman menarik dana mereka kembali ke Mainnet dengan menggunakan bukti yang sesuai.

### Plasma vs sharding {#plasma-vs-sharding}

Baik rantai plasma maupun rantai pecahan secara berkala mempublikasikan bukti kriptografi ke Ethereum Mainnet. Namun, keduanya memiliki sifat keamanan yang berbeda.

Rantai pecahan mengirimkan "collation header" ke Mainnet yang berisi informasi terperinci tentang setiap pecahan data. Node di Mainnet memverifikasi dan menegakkan validitas pecahan data, mengurangi kemungkinan transisi pecahan yang tidak valid dan melindungi jaringan dari aktivitas jahat.

Plasma berbeda karena Mainnet hanya menerima sedikit informasi tentang keadaan rantai anak. Ini berarti Mainnet tidak dapat memverifikasi transaksi yang dilakukan pada rantai anak secara efektif, sehingga kurang aman.

**Catatan** bahwa sharding blockchain Ethereum tidak lagi ada di peta jalan. Ini telah digantikan oleh penskalaan melalui rollup dan [Danksharding](/roadmap/danksharding).

### Gunakan Plasma {#use-plasma}

Beberapa proyek menyediakan implementasi Plasma yang dapat Anda integrasikan ke dalam dapp Anda:

- [Polygon](https://polygon.technology/) (sebelumnya Jaringan Matic)

## Bacaan lebih lanjut {#further-reading}

- [Pelajari Plasma](https://www.learnplasma.org/en/)
- [Pengingat singkat tentang apa arti "keamanan bersama" dan mengapa itu sangat penting](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Sidechain vs Plasma vs Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Memahami Plasma, Bagian 1: Dasar-dasarnya](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Kehidupan dan Kematian Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
