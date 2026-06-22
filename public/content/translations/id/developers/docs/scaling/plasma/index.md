---
title: Rantai Plasma
description: Pengantar tentang rantai plasma sebagai solusi penskalaan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
incomplete: true
sidebarDepth: 3
---

Rantai Plasma adalah rantai blok terpisah yang ditambatkan ke Mainnet [Ethereum](/) tetapi mengeksekusi transaksi secara offchain dengan mekanismenya sendiri untuk validasi blok. Rantai Plasma terkadang disebut sebagai rantai "anak", yang pada dasarnya adalah salinan yang lebih kecil dari Mainnet Ethereum. Rantai Plasma menggunakan [bukti penipuan (fraud proof)](/glossary/#fraud-proof) (seperti [optimistic rollup](/developers/docs/scaling/optimistic-rollups/)) untuk menengahi perselisihan.

Pohon Merkle memungkinkan pembuatan tumpukan rantai ini tanpa akhir yang dapat bekerja untuk mengurangi beban laju data (bandwidth) dari rantai induk (termasuk Mainnet Ethereum). Namun, meskipun rantai ini memperoleh beberapa keamanan dari Ethereum (melalui bukti penipuan), keamanan dan efisiensinya dipengaruhi oleh beberapa batasan desain.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang semua topik dasar dan pemahaman tingkat tinggi tentang [penskalaan Ethereum](/developers/docs/scaling/).

## Apa itu Plasma? {#what-is-plasma}

Plasma adalah kerangka kerja untuk meningkatkan skalabilitas dalam rantai blok publik seperti Ethereum. Seperti yang dijelaskan dalam [buku putih Plasma](https://plasma.io/plasma.pdf) aslinya, rantai Plasma dibangun di atas rantai blok lain (disebut "rantai akar"). Setiap "rantai anak" meluas dari rantai akar dan umumnya dikelola oleh kontrak pintar yang diterapkan pada rantai induk.

Kontrak Plasma berfungsi, antara lain, sebagai [jembatan](/developers/docs/bridges/) yang memungkinkan pengguna untuk memindahkan aset antara Mainnet Ethereum dan rantai plasma. Meskipun hal ini membuatnya mirip dengan [rantai samping](/developers/docs/scaling/sidechains/), rantai plasma mendapat manfaat—setidaknya, sampai batas tertentu—dari keamanan Mainnet Ethereum. Hal ini berbeda dengan rantai samping yang bertanggung jawab penuh atas keamanannya sendiri.

## Bagaimana cara kerja Plasma? {#how-does-plasma-work}

Komponen dasar dari kerangka kerja Plasma adalah:

### Komputasi offchain {#offchain-computation}

Kecepatan pemrosesan Ethereum saat ini terbatas pada ~ 15-20 transaksi per detik, mengurangi kemungkinan jangka pendek dari penskalaan untuk menangani lebih banyak pengguna. Masalah ini ada terutama karena [mekanisme konsensus](/developers/docs/consensus-mechanisms/) Ethereum mewajibkan banyak simpul peer-to-peer untuk memverifikasi setiap pembaruan pada state rantai blok.

Meskipun mekanisme konsensus Ethereum diperlukan untuk keamanan, hal itu mungkin tidak berlaku untuk setiap kasus penggunaan. Misalnya, Alice mungkin tidak memerlukan pembayaran hariannya kepada Bob untuk secangkir kopi diverifikasi oleh seluruh jaringan Ethereum karena ada kepercayaan di antara kedua belah pihak.

Plasma menganggap bahwa Mainnet Ethereum tidak perlu memverifikasi semua transaksi. Sebaliknya, kita dapat memproses transaksi di luar Mainnet, membebaskan simpul dari keharusan memvalidasi setiap transaksi.

Komputasi offchain diperlukan karena rantai Plasma dapat mengoptimalkan kecepatan dan biaya. Misalnya, rantai Plasma mungkin—dan paling sering—menggunakan "operator" tunggal untuk mengelola pengurutan dan eksekusi transaksi. Dengan hanya satu entitas yang memverifikasi transaksi, waktu pemrosesan pada rantai plasma lebih cepat daripada Mainnet Ethereum.

### Komitmen state {#state-commitments}

Meskipun Plasma mengeksekusi transaksi secara offchain, transaksi tersebut diselesaikan pada lapisan eksekusi utama Ethereum—jika tidak, rantai Plasma tidak dapat memperoleh manfaat dari jaminan keamanan Ethereum. Namun, menyelesaikan transaksi offchain tanpa mengetahui state dari rantai plasma akan merusak model keamanan dan memungkinkan proliferasi transaksi yang tidak valid. Inilah sebabnya mengapa operator, entitas yang bertanggung jawab untuk memproduksi blok pada rantai plasma, diwajibkan untuk mempublikasikan "komitmen state" di Ethereum secara berkala.

[Skema komitmen](https://en.wikipedia.org/wiki/Commitment_scheme) adalah teknik kriptografi untuk berkomitmen pada suatu nilai atau pernyataan tanpa mengungkapkannya kepada pihak lain. Komitmen bersifat "mengikat" dalam arti Anda tidak dapat mengubah nilai atau pernyataan setelah Anda berkomitmen padanya. Komitmen state dalam Plasma berbentuk "akar Merkle" (berasal dari [pohon Merkle](/whitepaper/#merkle-trees)) yang dikirimkan operator secara berkala ke kontrak Plasma di rantai Ethereum.

Akar Merkle adalah primitif kriptografi yang memungkinkan kompresi sejumlah besar informasi. Akar Merkle (juga disebut "akar blok" dalam kasus ini) dapat mewakili semua transaksi dalam sebuah blok. Akar Merkle juga memudahkan untuk memverifikasi bahwa sebagian kecil data adalah bagian dari kumpulan data yang lebih besar. Misalnya, pengguna dapat menghasilkan [bukti Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) untuk membuktikan penyertaan transaksi dalam blok tertentu.

Akar Merkle penting untuk memberikan informasi tentang state offchain ke Ethereum. Anda dapat menganggap akar Merkle sebagai "titik simpan": operator mengatakan, "Ini adalah state dari rantai Plasma pada titik waktu x, dan ini adalah akar Merkle sebagai buktinya." Operator berkomitmen pada _state saat ini_ dari rantai plasma dengan akar Merkle, itulah sebabnya ini disebut "komitmen state".

### Masuk dan keluar {#entries-and-exits}

Agar pengguna Ethereum dapat memanfaatkan Plasma, perlu ada mekanisme untuk memindahkan dana antara Mainnet dan rantai plasma. Namun, kita tidak dapat secara sewenang-wenang mengirim Ether ke alamat di rantai plasma—rantai ini tidak kompatibel, sehingga transaksi akan gagal atau menyebabkan hilangnya dana.

Plasma menggunakan kontrak utama yang berjalan di Ethereum untuk memproses masuk dan keluarnya pengguna. Kontrak utama ini juga bertanggung jawab untuk melacak komitmen state (dijelaskan sebelumnya) dan menghukum perilaku tidak jujur melalui bukti penipuan (akan dibahas lebih lanjut nanti).

#### Memasuki rantai plasma {#entering-the-plasma-chain}

Untuk memasuki rantai plasma, Alice (pengguna) harus menyetorkan ETH atau token ERC-20 apa pun ke dalam kontrak plasma. Operator plasma, yang mengawasi setoran kontrak, membuat ulang jumlah yang sama dengan setoran awal Alice dan melepaskannya ke alamatnya di rantai plasma. Alice diwajibkan untuk membuktikan penerimaan dana di rantai anak dan kemudian dapat menggunakan dana ini untuk transaksi.

#### Keluar dari rantai plasma {#exiting-the-plasma-chain}

Keluar dari rantai plasma lebih kompleks daripada memasukinya karena beberapa alasan. Alasan terbesarnya adalah, meskipun Ethereum memiliki informasi tentang state rantai plasma, ia tidak dapat memverifikasi apakah informasi tersebut benar atau tidak. Pengguna yang berniat jahat dapat membuat pernyataan yang salah ("Saya memiliki 1000 ETH") dan lolos dengan memberikan bukti palsu untuk mendukung klaim tersebut.

Untuk mencegah penarikan yang berbahaya, "periode tantangan" diperkenalkan. Selama periode tantangan (biasanya seminggu), siapa pun dapat menantang permintaan penarikan menggunakan bukti penipuan. Jika tantangan berhasil, maka permintaan penarikan ditolak.

Namun, biasanya pengguna jujur dan membuat klaim yang benar tentang dana yang mereka miliki. Dalam skenario ini, Alice akan memulai permintaan penarikan pada rantai akar (Ethereum) dengan mengirimkan transaksi ke kontrak plasma.

Dia juga harus memberikan bukti Merkle yang memverifikasi bahwa transaksi yang menciptakan dananya di rantai Plasma disertakan dalam sebuah blok. Hal ini diperlukan untuk iterasi Plasma, seperti [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), yang menggunakan model [Unspent Transaction Output (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Yang lain, seperti [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), mewakili dana sebagai [token yang tidak dapat dipertukarkan (NFT)](/developers/docs/standards/tokens/erc-721/) alih-alih UTXO. Penarikan, dalam hal ini, memerlukan bukti kepemilikan token di rantai Plasma. Hal ini dilakukan dengan mengirimkan dua transaksi terbaru yang melibatkan token dan memberikan bukti Merkle yang memverifikasi penyertaan transaksi tersebut dalam sebuah blok.

Pengguna juga harus menambahkan jaminan pada permintaan penarikan sebagai garansi perilaku jujur. Jika penantang membuktikan permintaan penarikan Alice tidak valid, jaminannya akan mengalami pemotongan, dan sebagian darinya diberikan kepada penantang sebagai imbalan.

Jika periode tantangan berlalu tanpa ada yang memberikan bukti penipuan, permintaan penarikan Alice dianggap valid, memungkinkannya untuk mengambil setoran dari kontrak Plasma di Ethereum.

### Arbitrase perselisihan {#dispute-arbitration}

Seperti rantai blok mana pun, rantai plasma memerlukan mekanisme untuk menegakkan integritas transaksi jika peserta bertindak jahat (misalnya, pengeluaran ganda dana). Untuk tujuan ini, rantai plasma menggunakan bukti penipuan untuk menengahi perselisihan mengenai validitas transisi state dan menghukum perilaku buruk. Bukti penipuan digunakan sebagai mekanisme di mana rantai anak Plasma mengajukan keluhan ke rantai induknya atau ke rantai akar.

Bukti penipuan pada dasarnya adalah klaim bahwa transisi state tertentu tidak valid. Contohnya adalah jika pengguna (Alice) mencoba membelanjakan dana yang sama dua kali. Mungkin dia membelanjakan UTXO dalam transaksi dengan Bob dan ingin membelanjakan UTXO yang sama (yang sekarang milik Bob) dalam transaksi lain.

Untuk mencegah penarikan, Bob akan menyusun bukti penipuan dengan memberikan bukti bahwa Alice membelanjakan UTXO tersebut dalam transaksi sebelumnya dan bukti Merkle tentang penyertaan transaksi tersebut dalam sebuah blok. Proses yang sama berlaku di Plasma Cash—Bob perlu memberikan bukti bahwa Alice sebelumnya mentransfer token yang dia coba tarik.

Jika tantangan Bob berhasil, permintaan penarikan Alice dibatalkan. Namun, pendekatan ini bergantung pada kemampuan Bob untuk mengawasi rantai untuk permintaan penarikan. Jika Bob sedang offline, maka Alice dapat memproses penarikan berbahaya setelah periode tantangan berlalu.

## Masalah keluar massal di plasma {#the-mass-exit-problem-in-plasma}

Masalah keluar massal terjadi ketika sejumlah besar pengguna mencoba menarik diri dari rantai plasma pada saat yang bersamaan. Mengapa masalah ini ada hubungannya dengan salah satu masalah terbesar Plasma: **ketidaktersediaan data**.

Ketersediaan data adalah kemampuan untuk memverifikasi bahwa informasi untuk blok yang diusulkan benar-benar dipublikasikan di jaringan rantai blok. Sebuah blok "tidak tersedia" jika produsen mempublikasikan blok itu sendiri tetapi menahan data yang digunakan untuk membuat blok tersebut.

Blok harus tersedia agar simpul dapat mengunduh blok dan memverifikasi validitas transaksi. Rantai blok memastikan ketersediaan data dengan memaksa produsen blok untuk memposting semua data transaksi secara onchain.

Ketersediaan data juga membantu mengamankan protokol penskalaan offchain yang dibangun di atas lapisan dasar Ethereum. Dengan memaksa operator pada rantai ini untuk mempublikasikan data transaksi di Ethereum, siapa pun dapat menantang blok yang tidak valid dengan menyusun bukti penipuan yang merujuk pada state rantai yang benar.

Rantai Plasma terutama menyimpan data transaksi dengan operator dan **tidak mempublikasikan data apa pun di Mainnet** (yaitu, selain komitmen state berkala). Ini berarti pengguna harus bergantung pada operator untuk menyediakan data blok jika mereka perlu membuat bukti penipuan yang menantang transaksi yang tidak valid. Jika sistem ini berfungsi, maka pengguna selalu dapat menggunakan bukti penipuan untuk mengamankan dana.

Masalah dimulai ketika operator, bukan sembarang pengguna, adalah pihak yang bertindak jahat. Karena operator memegang kendali penuh atas rantai blok, mereka memiliki lebih banyak insentif untuk memajukan transisi state yang tidak valid dalam skala yang lebih besar, seperti mencuri dana milik pengguna di rantai plasma.

Dalam hal ini, menggunakan sistem bukti penipuan klasik tidak akan berhasil. Operator dapat dengan mudah membuat transaksi tidak valid yang mentransfer dana Alice dan Bob ke dompet mereka dan menyembunyikan data yang diperlukan untuk membuat bukti penipuan. Hal ini dimungkinkan karena operator tidak diwajibkan untuk menyediakan data bagi pengguna atau Mainnet.

Oleh karena itu, solusi paling optimis adalah mencoba "keluar massal" pengguna dari rantai plasma. Keluar massal memperlambat rencana operator jahat untuk mencuri dana dan memberikan beberapa ukuran perlindungan bagi pengguna. Permintaan penarikan diurutkan berdasarkan kapan setiap UTXO (atau token) dibuat, mencegah operator jahat melakukan front-running terhadap pengguna yang jujur.

Meskipun demikian, kita masih memerlukan cara untuk memverifikasi validitas permintaan penarikan selama keluar massal—untuk mencegah individu oportunistik mengambil keuntungan dari kekacauan dengan memproses keluar yang tidak valid. Solusinya sederhana: wajibkan pengguna untuk memposting **state rantai yang valid** terakhir untuk mengeluarkan uang mereka.

Namun pendekatan ini masih memiliki masalah. Misalnya, jika semua pengguna di rantai plasma perlu keluar (yang dimungkinkan dalam kasus operator jahat), maka seluruh state valid dari rantai plasma harus dibuang ke lapisan dasar Ethereum sekaligus. Dengan ukuran rantai plasma yang sewenang-wenang (laju pemrosesan tinggi = lebih banyak data) dan kendala pada kecepatan pemrosesan Ethereum, ini bukanlah solusi yang ideal.

Meskipun permainan keluar (exit games) terdengar bagus secara teori, keluar massal di kehidupan nyata kemungkinan akan memicu kemacetan di seluruh jaringan pada Ethereum itu sendiri. Selain merusak fungsionalitas Ethereum, keluar massal yang dikoordinasikan dengan buruk berarti bahwa pengguna mungkin tidak dapat menarik dana sebelum operator menguras setiap akun di rantai plasma.

## Kelebihan dan kekurangan plasma {#pros-and-cons-of-plasma}

| Kelebihan                                                                                                                                                                                                                                        | Kekurangan                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Menawarkan laju pemrosesan tinggi dan biaya rendah per transaksi.                                                                                                                                                                                | Tidak mendukung komputasi umum (tidak dapat menjalankan kontrak pintar). Hanya transfer token dasar, pertukaran (swap), dan beberapa jenis transaksi lain yang didukung melalui logika predikat.             |
| Baik untuk transaksi antara pengguna arbitrer (tidak ada biaya tambahan per pasangan pengguna jika keduanya ditetapkan pada rantai plasma)                                                                                                       | Perlu mengawasi jaringan secara berkala (persyaratan liveness) atau mendelegasikan tanggung jawab ini kepada orang lain untuk memastikan keamanan dana Anda.                                                 |
| Rantai Plasma dapat disesuaikan dengan kasus penggunaan tertentu yang tidak terkait dengan rantai utama. Siapa pun, termasuk bisnis, dapat menyesuaikan kontrak pintar Plasma untuk menyediakan infrastruktur terukur yang berfungsi dalam konteks berbeda. | Bergantung pada satu atau lebih operator untuk menyimpan data dan menyajikannya berdasarkan permintaan.                                                                                                      |
| Mengurangi beban pada Mainnet Ethereum dengan memindahkan komputasi dan penyimpanan secara offchain.                                                                                                                                             | Penarikan tertunda beberapa hari untuk memungkinkan adanya tantangan. Untuk aset yang dapat dipertukarkan, hal ini dapat dimitigasi oleh penyedia likuiditas, tetapi ada biaya modal yang terkait. |
|                                                                                                                                                                                                                                                  | Jika terlalu banyak pengguna mencoba keluar secara bersamaan, Mainnet Ethereum bisa menjadi macet.                                                                                                           |

## Plasma vs protokol penskalaan lapisan 2 {#plasma-vs-layer-2}

Meskipun Plasma pernah dianggap sebagai solusi penskalaan yang berguna untuk Ethereum, sejak saat itu Plasma telah ditinggalkan dan digantikan oleh [protokol penskalaan lapisan 2 (l2)](/layer-2/). Solusi penskalaan l2 memperbaiki beberapa masalah Plasma:

### Efisiensi {#efficiency}

[Zero-Knowledge rollup](/developers/docs/scaling/zk-rollups) menghasilkan bukti kriptografi tentang validitas setiap kumpulan transaksi yang diproses secara offchain. Hal ini mencegah pengguna (dan operator) memajukan transisi state yang tidak valid, menghilangkan kebutuhan akan periode tantangan dan permainan keluar. Ini juga berarti pengguna tidak perlu mengawasi rantai secara berkala untuk mengamankan dana mereka.

### Dukungan untuk kontrak pintar {#support-for-smart-contracts}

Masalah lain dengan kerangka kerja plasma adalah [ketidakmampuan untuk mendukung eksekusi kontrak pintar Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Akibatnya, sebagian besar implementasi Plasma sebagian besar dibangun untuk pembayaran sederhana atau pertukaran token ERC-20.

Sebaliknya, optimistic rollup, kompatibel dengan [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/) dan dapat menjalankan [kontrak pintar](/developers/docs/smart-contracts/) asli Ethereum, menjadikannya solusi yang berguna dan _aman_ untuk menskalakan [aplikasi terdesentralisasi (dapp)](/developers/docs/dapps/). Demikian pula, rencana sedang berjalan untuk [membuat implementasi zero-knowledge dari EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) yang akan memungkinkan ZK-rollup untuk memproses logika arbitrer dan mengeksekusi kontrak pintar.

### Ketidaktersediaan data {#data-unavailability}

Seperti yang dijelaskan sebelumnya, plasma menderita masalah ketersediaan data. Jika operator jahat memajukan transisi yang tidak valid pada rantai plasma, pengguna tidak akan dapat menantangnya karena operator dapat menahan data yang diperlukan untuk membuat bukti penipuan. Rollup memecahkan masalah ini dengan memaksa operator untuk memposting data transaksi di Ethereum, memungkinkan siapa pun untuk memverifikasi state rantai dan membuat bukti penipuan jika perlu.

### Masalah keluar massal {#mass-exit-problem}

ZK-rollup dan optimistic rollup keduanya memecahkan masalah keluar massal Plasma dengan berbagai cara. Misalnya, ZK-rollup bergantung pada mekanisme kriptografi yang memastikan operator tidak dapat mencuri dana pengguna dalam skenario apa pun.

Demikian pula, optimistic rollup memberlakukan periode penundaan pada penarikan di mana siapa pun dapat memulai tantangan dan mencegah permintaan penarikan yang berbahaya. Meskipun ini mirip dengan Plasma, perbedaannya adalah pemverifikasi memiliki akses ke data yang diperlukan untuk membuat bukti penipuan. Dengan demikian, pengguna rollup tidak perlu terlibat dalam migrasi "siapa cepat dia dapat" yang panik ke Mainnet Ethereum.

## Apa perbedaan Plasma dengan rantai samping dan sharding? {#plasma-sidechains-sharding}

Plasma, rantai samping, dan sharding cukup mirip karena semuanya terhubung ke Mainnet Ethereum dalam beberapa cara. Namun, tingkat dan kekuatan koneksi ini bervariasi, yang memengaruhi properti keamanan dari setiap solusi penskalaan.

### Plasma vs rantai samping {#plasma-vs-sidechains}

[Rantai samping](/developers/docs/scaling/sidechains/) adalah rantai blok yang dioperasikan secara independen yang terhubung ke Mainnet Ethereum melalui jembatan dua arah. [Jembatan](/bridges/) memungkinkan pengguna untuk menukar token di antara kedua rantai blok untuk bertransaksi di rantai samping, mengurangi kemacetan di Mainnet Ethereum dan meningkatkan skalabilitas.
Rantai samping menggunakan mekanisme konsensus terpisah dan biasanya jauh lebih kecil daripada Mainnet Ethereum. Akibatnya, menjembatani aset ke rantai ini melibatkan peningkatan risiko; mengingat kurangnya jaminan keamanan yang diwarisi dari Mainnet Ethereum dalam model rantai samping, pengguna berisiko kehilangan dana dalam serangan terhadap rantai samping.

Sebaliknya, rantai plasma memperoleh keamanannya dari Mainnet. Hal ini membuatnya jauh lebih aman daripada rantai samping. Baik rantai samping maupun rantai plasma dapat memiliki protokol konsensus yang berbeda, tetapi perbedaannya adalah rantai plasma mempublikasikan akar Merkle untuk setiap blok di Mainnet Ethereum. Akar blok adalah potongan kecil informasi yang dapat kita gunakan untuk memverifikasi informasi tentang transaksi yang terjadi pada rantai plasma. Jika serangan terjadi pada rantai plasma, pengguna dapat dengan aman menarik dana mereka kembali ke Mainnet menggunakan bukti yang sesuai.

### Plasma vs sharding {#plasma-vs-sharding}

Baik rantai plasma maupun rantai shard secara berkala mempublikasikan bukti kriptografi ke Mainnet Ethereum. Namun, keduanya memiliki properti keamanan yang berbeda.

Rantai shard melakukan komitmen "header kolasi" ke Mainnet yang berisi informasi terperinci tentang setiap shard data. Simpul di Mainnet memverifikasi dan menegakkan validitas shard data, mengurangi kemungkinan transisi shard yang tidak valid dan melindungi jaringan dari aktivitas berbahaya.

Plasma berbeda karena Mainnet hanya menerima informasi minimal tentang state rantai anak. Ini berarti Mainnet tidak dapat secara efektif memverifikasi transaksi yang dilakukan pada rantai anak, membuatnya kurang aman.

**Catatan** bahwa sharding rantai blok Ethereum tidak lagi ada di peta jalan. Hal ini telah digantikan oleh penskalaan melalui rollup dan [danksharding](/roadmap/danksharding).

### Gunakan Plasma {#use-plasma}

Beberapa proyek menyediakan implementasi Plasma yang dapat Anda integrasikan ke dalam dapp Anda:

- [Polygon](https://polygon.technology/) (sebelumnya Matic Network)

## Bacaan lebih lanjut {#further-reading}

- [Pelajari Plasma](https://www.learnplasma.org/en/)
- [Pengingat singkat tentang apa arti "keamanan bersama" dan mengapa itu sangat penting](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Rantai Samping vs Plasma vs Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Memahami Plasma, Bagian 1: Dasar-dasar](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Kehidupan dan Kematian Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Tutorial: Rantai Plasma di Ethereum {#tutorials}

- [Tulis plasma khusus aplikasi yang menjaga privasi](/developers/tutorials/app-plasma/) _– Bangun aplikasi plasma yang menjaga privasi menggunakan bukti tanpa pengetahuan dan komponen offchain._