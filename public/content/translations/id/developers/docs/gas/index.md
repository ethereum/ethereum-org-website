---
title: Gas dan biaya
description:
lang: id
---

Gas penting untuk jaringan Ethereum. Ini adalah bahan bakar yang memungkinkan Ethereum beroperasi, sama seperti sebuah mobil memerlukan bensin untuk bergerak.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami menyarankan Anda terlebih dahulu membaca tentang [transaksi](/developers/docs/transactions/) dan [EVM](/developers/docs/evm/).

## Apa itu gas? {#what-is-gas}

Gas merujuk pada unit yang mengukur jumlah upaya komputasional yang diperlukan untuk menjalankan operasi tertentu di jaringan Ethereum.

Karena tiap transaksi Ethereum memerlukan sumber daya komputasional untuk dijalankan, tiap transaksi membutuhkan biaya. Gas merujuk pada biaya yang diperlukan agar berhasil menjalankan transaksi di Ethereum.

![Diagram menunjukkan di mana gas diperlukan dalam operasi EVM](./gas.png) _Diagram diadaptasi dari [Ethereum EVM yang diilustrasikan](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Biaya gas dibayarkan dalam mata uang asli Ethereum, ether (ETH). Harga gas dinyatakan dalam gwei, yang adalah denominasi ETH - setiap gwei setara dengan 0,000000001 ETH (10<sup>-9</sup> ETH). Misalnya, daripada mengatakan biaya gas Anda 0,000000001 ether, Anda bisa mengatakan biaya gas Anda 1 gwei. Kata 'gwei' sendiri berarti 'giga-wei', dan itu sama dengan 1.000.000.000 wei. Wei sendiri (dinamai dari [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), pembuat [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) adalah unit terkecil dari ETH.

## Sebelum peningkatan London {#pre-london}

Cara penghitungan biaya transaksi di jaringan Ethereum diubah dengan [Peningkatan London](/history/#london) pada Agustus 2021. Berikut adalah rekap tentang cara kerja hal-hal tersebut:

Katakanlah Alice harus membayar Bob 1 ETH. Dalam transaksi tersebut, batas gas adalah 21.000 unit dan harga gas adalah 200 gwei.

Total biaya adalah: `Unit gas (batas) * Harga gas per unit` yaitu `21.000 * 200 = 4.200.000 gwei` atau 0,0042 ETH

Ketika Alice mengirimkan uang, 1,0042 ETH akan dipotong dari akun Alice. Bob akan dikreditkan 1,0000 ETH. Penambang akan menerima 0,0042 ETH.

Video ini menawarkan gambaran umum yang ringkas tentang gas dan mengapa gas ada:

<YouTube id="AJvzNICwcwc" />

## Setelah peningkatan London {#post-london}

[Peningkatan London](/history/#london) diimplementasikan pada 5 Agustus 2021 untuk membuat kegiatan transaksi di Ethereum lebih dapat diprediksi oleh para pengguna dengan merombak mekanisme biaya transaksi Ethereum. Keuntungan level tinggi yang diperkenalkan oleh perubahan ini termasuk estimasi biaya transaksi yang lebih baik, pemasukan transaksi yang umumnya lebih cepat, dan mengimbangi penerbitan ETH dengan membakar persentase biaya transaksi.

Dimulai dengan peningkatan jaringan London, setiap blok memiliki biaya dasar, harga minimum per unit gas untuk dimasukkan ke dalam blok ini, yang dihitung oleh jaringan berdasarkan permintaan ruangan blok. Karena biaya dasar dari biaya transaksi dibakar, para pengguna juga diharapkan untuk menetapkan tips (biaya prioritas) dalam transaksi mereka. Tips memberi kompensasi bagi penambang untuk mengeksekusi dan menyebarkan transaksi pengguna dalam blok dan diharapkan diatur secara otomatis oleh sebagian besar dompet.

Cara menghitung total biaya transaksi adalah sebagai berikut: `Gas units (limit) * (Base fee + Tip)`

Katakanlah Jordan harus membayar Taylor 1 ETH. Dalam transaksi tersebut, batas gas adalah 21.000 unit dan biaya dasar adalah 100 gwei. Jordan memasukkan tips 10 gwei.

Dengan menggunakan rumus di atas, kita dapat menghitungnya sebagai `21.000 * (100 + 10) = 2.310.000 gwei` atau 0,00231 ETH.

Ketika Jordan mengirimkan uang, 1,00231 ETH akan dipotong dari akun Jordan. Taylor akan dikreditkan 1,0000 ETH. Penambang menerima tips 0,00021 ETH. Biaya dasar 0,0021 ETH dihilangkan.

Selain itu, Jordan juga dapat menetapkan biaya maksimal (`maxFeePerGas`) untuk transaksi tersebut. Selisih antara biaya maksimum dan biaya sebenarnya dikembalikan dananya ke Jordan, yaitu `pengembalian dana = biaya maksimum - (biaya dasar + biaya prioritas)`. Jordan dapat menetapkan jumlah maksimum untuk membayar transaksi yang dilakukan dan tidak khawatir tentang membayar lebih "di luar dari" biaya dasar saat transaksi dijalankan.

### Ukuran blok {#block-size}

Sebelum Peningkatan London, Ethereum memiliki blok berukuran tetap. Pada waktu permintaan jaringan tinggi, blok-blok ini beroperasi pada kapasitas total. Akibatnya, para pengguna sering harus menunggu permintaan yang tinggi untuk mengurangi penyertaan dalam blok, yang menyebabkan pengalaman pengguna yang buruk.

Peningkatan London memasukkan blok berukuran variabel ke Ethereum. Setiap blok memiliki ukuran target sebesar 15 juta gas tetapi ukuran blok akan bertambah atau berkurang sesuai dengan permintaan jaringan, hingga mencapai batas blok yang berukuran 30 juta gas (2x ukuran blok target). Protokol mencapai keseimbangan untuk ukuran blok sebesar 15 juta pada umumnya melalui proses _tâtonnement_. Ini berarti jika ukuran blok lebih besar dari ukuran blok target, protokol akan meningkatkan harga dasar untuk blok berikutnya. Dalam cara yang sama, protokol akan mengurangi harga dasar jika ukuran blok kurang dari ukuran blok target. Jumlah biaya dasar yang disesuaikan proporsional dengan seberapa besar perbedaan ukuran blok saat ini dari blok target. [Selengkapnya tentang blok](/developers/docs/blocks/).

### Biaya dasar {#base-fee}

Setiap blok memiliki biaya dasar yang berfungsi sebagai harga cadangan. Agar dapat dimasukkan ke dalam sebuah blok, harga per gas yang ditawarkan setidaknya harus sama dengan harga dasar. Harga dasar dihitung secara independen dari blok saat ini dan sebagai gantinya ditentukan oleh blok sebelumnya - yang membuat biaya transaksi lebih terprediksi bagi para pengguna. Ketika blok ditambang, biaya dasar ini "dibakar", yang menghilangkannya dari peredaran.

Biaya dasar dihitung berdasarkan sebuah formula yang membandingkan ukuran blok sebelumnya (jumlah gas yang terpakai untuk semua transaksi) dengan ukuran blok target. Biaya dasar akan meningkat hingga mencapai nilai maksimum 12,5% per blok jika ukuran blok target terlewati. Pertumbuhan yang pesat ini membuat ukuran blok secara ekonomis tidak mungkin untuk tetap berukuran besar tanpa batasan waktu.

| Nomor Blok | Gas yang Termasuk | Peningkatan Biaya | Biaya Dasar Saat Ini |
| ---------- | ----------------: | ----------------: | -------------------: |
| 1          |           15 Juta |                0% |             100 gwei |
| 2          |           30 Juta |                0% |             100 gwei |
| 3          |           30 Juta |             12,5% |           112,5 gwei |
| 4          |           30 Juta |             12,5% |           126,6 gwei |
| 5          |           30 Juta |             12,5% |           142,4 gwei |
| 6          |           30 Juta |             12,5% |           160,2 gwei |
| 7          |           30 Juta |             12,5% |           180,2 gwei |
| 8          |           30 Juta |             12,5% |           202,7 gwei |

Dibandingkan dengan pasar pelelangan gas pra-London, perubahan mekanisme biaya transaksi ini menyebabkan prediksi harga yang lebih terandalkan. Berdasarkan tabel di atas - untuk membuat transaksi di blok nomor 9, dompet akan memberi tahu pengguna dengan kepastian bahwa **biaya dasar maksimum** yang harus ditambahkan ke blok berikutnya adalah `biaya dasar saat ini * 112,5%` atau `202,8 gwei * 112,5% = 228,1 gwei`.

Juga penting untuk dicatat bahwa kecil kemungkinan kita akan melihat perluasan lonjakan dari blok penuh karena kecepatan kenaikan biaya dasar untuk melanjutkan blok penuh.

| Nomor Blok | Gas yang Termasuk | Peningkatan Biaya | Biaya Dasar Saat Ini |
| ---------- | ----------------: | ----------------: | -------------------: |
| 30         |           30 Juta |             12,5% |          2705,6 gwei |
| ...        |               ... |             12,5% |                  ... |
| 50         |           30 Juta |             12,5% |         28531,3 gwei |
| ...        |               ... |             12,5% |                  ... |
| 100        |           30 Juta |             12,5% |      10302608,6 gwei |

### Biaya prioritas (tips) {#priority-fee}

Sebelum Peningkatan London, para penambang akan menerima biaya gas total dari transaksi mana pun yang dimasukkan ke dalam sebuah blok.

Dengan biaya dasar baru yang dibakar, Peningkatan London memasukkan biaya prioritas (tip) untuk mendorong para penambang memasukkan sebuah transaksi dalam blok. Tanpa tips, para penambang akan menganggap menambang blok kosong menguntungkan secara ekonomis, karena mereka akan menerima imbalan blok yang sama. Dala kondisi normal, sejumlah kecil tips akan memberi insentif minimal bagi para penambang untuk memasukkan sebuah transaksi. Agar transaksi yang harusnya secara istimewa dieksekusi terlebih dahulu sebelum transaksi lainnya dalam blok yang sama, tip yang lebih tinggi akan menjadi penting untuk berupaya memenangkan penawaran transaksi yang saling berkompetisi.

### Biaya maksimum {#maxfee}

Untuk mengeksekusi transaksi di jaringan, pengguna dapat menentukan batasan maksimum yang dengan rela mereka bayar agar transaksi mereka dapat dieksekusi. Parameter opsional ini dikenal sebagai `maxFeePerGas`. Agar sebuah transaksi dapat dieksekusi, biaya maksimum harus melebihi jumlah biaya dasar dan tips. Pengirim transaksi mendapat pengembalian dana dari selisih antara biaya maksimum dan jumlah biaya dasar dan tips.

### Biaya penghitungan {#calculating-fees}

Salah satu keuntungan utama yang dicapai dengan peningkatan London adalah pengalaman pengguna yang lebih baik ketika menentukan biaya transaksi. Untuk dompet yang mendukung peningkatan ini, alih-alih secara eksplisit menampilkan berapa banyak yang rela Anda bayarkan agar transaksi Anda berhasil, penyedia dompet akan menetapkan biaya transaksi yang disarankan secara otomatis (biaya dasar + biaya prioritas yang disarankan) untuk mengurangi biaya kompleksitas yang dibebankan kepada para penggunanya.

## EIP-1559 {#eip-1559}

Implementasi dari [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) dalam Peningkatan London membuat mekanisme biaya transaksi lebih kompleks dari pada pelelangan harga gas sebelumnya, tetapi memberi keuntungan harga gas yang lebih terprediksi, yang menyebabkan pasar biaya transaksi yang lebih efisien. Pengguna dapat mengirimkan transaksi dengan `maxFeePerGas` yang sesuai dengan jumlah biaya yang rela mereka bayarkan agar transaksinya dieksekusi, dengan mengetahui bahwa mereka tidak akan membayar lebih dari harga gas pasar (`baseFeePerGas`), dan mendapatkan tambahan, dikurangi tips mereka, yang dikembalikan dananya.

Video ini menjelaskan EIP-1559 dan keuntungan yang diberikannya:

<YouTube id="MGemhK9t44Q" />

Jika Anda tertarik, Anda dapat membaca [spesifikasi EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) yang pasti.

Lanjutkan perjalanan menakjubkan ini dengan [EIP-1559 Resources](https://hackmd.io/@timbeiko/1559-resources) ini.

## Mengapa ada biaya gas? {#why-do-gas-fees-exist}

Singkatnya, biaya gas membantu menjaga keamanan jaringan Ethereum. Dengan mengharuskan pembayaran biaya untuk setiap komputasi yang dijalankan dalam jaringan, kami mencegah para aktor jahat menyampah di dalam jaringan. Untuk mencegah perulangan tak terbatas yang agresif atau tak disengaja, atau pemborosan dalam kode komputasional lainnya, setiap transaksi diharuskan untuk menentukan batasan seberapa banyak langkah eksekusi kode komputasional yang bisa digunakan. Unit dasar dari komputasi tersebut adalah "gas".

Sekalipun sebuah transaksi menyertakan batasan, gas yang tidak digunakan dalam transaksi dikembalikan ke pengguna (yakni `biaya maks - (biaya dasar + tips)` dikembalikan).

![Diagram menunjukkan cara mengembalikan dana gas yang tidak terpakai](../transactions/gas-tx.png) _Diagram diadaptasi dari [Ethereum EVM yang diilustrasikan](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Apa itu batas gas? {#what-is-gas-limit}

Batas gas merujuk pada jumlah gas maksimum yang rela Anda pakai dalam sebuah transaksi. Transaksi yang lebih rumit, yang melibatkan [kontrak pintar](/developers/docs/smart-contracts/), memerlukan lebih banyak upaya komputasional sehingga memerlukan batas gas yang lebih tinggi daripada hanya sebuah pembayaran sederhana. Satu transfer ETH standar memerlukan batas gas sebesar 21.000 unit gas.

Sebagai contoh, jika Anda menetapkan batas gas sebesar 50.000 untuk satu transfer ETH sederhana, EVM akan memakai 21.000, dan Anda akan mendapatkan kembali sisa 29.000. Namun, jika Anda menetapkan gas terlalu sedikit, misalnya, batas gas sebesar 20.000 untuk satu transfer ETH sederhana, EVM akan memakai 20.000 unit gas yang berupaya untuk memenuhi transaksi, tapi tidak akan mampu diselesaikan. EVM kemudian akan membalikkan perubahan apa pun, tetapi karena upaya setara 20k unit gas telah dilakukan oleh penambang, gas tersebut dipakai.

## Mengapa biaya gas dapat menjadi sangat tinggi? {#why-can-gas-fees-get-so-high}

Biaya gas yang tinggi dikarenakan popularitas Ethereum. Melakukan operasi mana pun di Ethereum memerlukan pemakaian gas, dan ruangan gas terbatas dalam tiap blok. Biaya termasuk perhitungan, penyimpanan atau manipulasi data, atau transfer token, yang masing-masing menggunakan jumlah unit "gas" yang berbeda. Karena fungsionalitas dapp berkembang menjadi lebih kompleks, jumlah operasi yang dapat dilakukan oleh kontrak pintar juga bertambah, yang berarti setiap transaksi memerlukan lebih banyak ruangan dalam blok yang berukuran terbatas. Jika ada terlalu banyak permintaan, pengguna harus menawarkan jumlah tips yang lebih tinggi untuk dicoba dan mengalahkan penawaran transaksi pengguna lainnya. Biaya tips yang lebih tinggi dapat membuat transaksi Anda lebih mungkin akan masuk ke blok berikutnya.

Harga gas sendiri sebenarnya tidak menentukan jumlah yang harus kita bayarkan untuk satu transaksi tertentu. Untuk menghitung biaya transaksi, kita harus mengalikan gas yang dipakai oleh biaya transaksi, yang diukur dalam gwei.

## Inisiatif untuk mengurangi biaya gas {#initiatives-to-reduce-gas-costs}

[Peningkatan skalabilitas](/roadmap/) Ethereum seharusnya akan menyelesaikan beberapa masalah biaya gas, hasilnya yang akan memungkinkan platform untuk memroses ribuan transaksi per detik dan melakukan penskalaan secara global.

Penskalaan lapisan 2 adalah inisiatif utama untuk sangat meningkatkan biaya gas, pengalaman pengguna, dan skalabilitas. [Selengkapnya tentang penskalaan lapisan 2](/developers/docs/scaling/#layer-2-scaling).

Model bukti taruhan yang baru, yang diperkenalkan di Rantai Suar, seharusnya mengurangi pemakaian daya yang tinggi dan ketergantungan pada perangkat keras khusus. Rantai ini akan memungkinkan jaringan Ethereum terdesentralisasi untuk berkesesuaian dan menjaga jaringan tetap aman, sekaligus membatasi pemakaian daya dengan mengharuskan komitmen keuangan.

Siapa pun yang memiliki setidaknya 32 ETH dapat menaruhkannya dan menjadi validator yang bertanggung jawab untuk memroses transaksi, memvalidasi blok, dan mengusulkan blok baru untuk ditambahkan ke rantai. Para pengguna yang memiliki kurang dari 32 ETH dapat bergabung dengan pool penaruhan.

## Strategi bagi Anda untuk mengurangi biaya gas {#strategies-for-you-to-reduce-gas-costs}

Jika Anda mencari cara untuk mengurangi biaya gas untuk ETH Anda, Anda dapat menetapkan tips untuk menunjukkan tingkat prioritas transaksi Anda. Penambang akan 'mengerjakan' dan menjalankan transaksi yang menawarkan tips per gas yang lebih tinggi, karena mereka bisa menyimpan tips yang Anda bayarkan dan cenderung tidak tertarik menjalankan transaksi dengan tips yang lebih rendah.

Jika ingin memantau harga gas, sehingga Anda dapat mengirim ETH lebih murah, Anda dapat menggunakan berbagai alat seperti:

- [Penaksir](https://etherscan.io/gastracker) _harga gas Transaksi Etherscan_
- [Penaksir Gas ETH Blocknative](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Ekstensi Chrome penaksir gas mendukung transaksi lama Tipe 0 dan transaksi Tipe 2 EIP-1559._

- [Stasiun Gas ETH](https://ethgasstation.info/) _Metrik yang berorientasi pelanggan untuk pasar gas Ethereum_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, and Polygon._

## Peralatan terkait {#related-tools}

- [Analitik Gas Bloxy](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _Stasiun gas jaringan Ethereum_
- [Platform Gas Blocknative](https://www.blocknative.com/gas) _API estimasi gas yang didukung oleh platform data mempool global Blocknative_

## Bacaan lebih lanjut {#further-reading}

- [Gas Ethereum Dijelaskan](https://defiprime.com/gas)
- [Mengurangi pemakaian gas Kontrak Pintar Anda](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Bukti Taruhan versus Bukti Kerja](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)

## Topik terkait {#related-topics}

- [Penambangan](/developers/docs/consensus-mechanisms/pow/mining/)
