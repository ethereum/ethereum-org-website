---
title: Gas dan biaya
metaTitle: "Biaya dan gas Ethereum: gambaran umum teknis"
description: Pelajari tentang biaya gas Ethereum, bagaimana cara perhitungannya, serta perannya dalam keamanan jaringan dan proses transaksi.
lang: id
---

Gas penting untuk jaringan Ethereum. Ini adalah bahan bakar yang memungkinkan Ethereum beroperasi, sama seperti sebuah mobil memerlukan bensin untuk bergerak.

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [transaksi](/developers/docs/transactions/) dan [EVM](/developers/docs/evm/).

## Apa itu gas? {#what-is-gas}

Gas merujuk pada unit yang mengukur jumlah upaya komputasional yang diperlukan untuk menjalankan operasi tertentu di jaringan Ethereum.

Karena setiap transaksi di Ethereum membutuhkan sumber daya komputasi untuk dieksekusi, sumber daya tersebut harus dibayar agar Ethereum tidak rentan terhadap spam dan tidak tersangkut dalam loop komputasi tak terbatas. Pembayaran untuk komputasi dilakukan dalam bentuk biaya gas.

Biaya gas adalah **jumlah gas yang digunakan untuk melakukan suatu operasi, dikalikan dengan biaya per unit gas**. Biaya tersebut dibayarkan tanpa memandang apakah transaksi berhasil atau gagal.

![Sebuah diagram yang menunjukkan di mana gas diperlukan dalam operasi EVM](./gas.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Biaya gas harus dibayar dalam mata uang asli Ethereum, yaitu ether (ETH). Harga gas biasanya dikutip dalam gwei, yang merupakan denominasi dari ETH. Setiap gwei setara dengan satu miliar bagian dari satu ETH (0,000000001 ETH atau 10<sup>-9</sup> ETH).

Sebagai contoh, alih-alih mengatakan bahwa biaya gas Anda adalah 0,000000001 ether, Anda bisa mengatakan biaya gas Anda adalah 1 gwei.

Kata 'gwei' adalah singkatan dari 'giga-wei', yang berarti 'satu miliar wei'. Satu gwei setara dengan satu miliar wei. Wei sendiri (dinamai menurut [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), pencipta [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) adalah unit ETH terkecil.

## Bagaimana biaya gas dihitung? {#how-are-gas-fees-calculated}

Anda dapat menetapkan jumlah gas yang bersedia Anda bayarkan saat mengirimkan sebuah transaksi. Dengan menawarkan sejumlah gas, Anda sedang melakukan penawaran agar transaksi Anda dimasukkan ke dalam blok berikutnya. Jika Anda menawarkan terlalu sedikit, validator cenderung tidak memilih transaksi Anda untuk dimasukkan, yang berarti transaksi Anda mungkin terlambat dieksekusi atau bahkan tidak dijalankan sama sekali. Jika Anda menawarkan terlalu banyak, Anda bisa membuang-buang ETH. Jadi, bagaimana Anda bisa tahu berapa banyak yang harus dibayar?

Total gas yang Anda bayar dibagi menjadi dua komponen: `biaya dasar` dan `biaya prioritas` (tip).

`Biaya dasar` ditetapkan oleh protokol—Anda harus membayar setidaknya sejumlah ini agar transaksi Anda dianggap valid. `Biaya prioritas` adalah tip yang Anda tambahkan ke biaya dasar untuk membuat transaksi Anda menarik bagi validator sehingga mereka memilihnya untuk dimasukkan ke dalam blok berikutnya.

Transaksi yang hanya membayar `biaya dasar` secara teknis valid tetapi kemungkinan kecil untuk disertakan karena tidak menawarkan insentif bagi validator untuk memilihnya daripada transaksi lain mana pun. Biaya `prioritas` yang 'benar' ditentukan oleh penggunaan jaringan pada saat Anda mengirim transaksi—jika permintaan sedang tinggi, Anda mungkin harus menetapkan biaya `prioritas` Anda lebih tinggi, tetapi ketika permintaan sedang rendah, Anda bisa membayar lebih sedikit.

Sebagai contoh, katakanlah Jordan harus membayar Taylor 1 ETH. Transfer ETH memerlukan 21.000 unit gas, dan biaya dasarnya adalah 10 gwei. Jordan memasukkan tips 2 gwei.

Total biaya sekarang akan sama dengan:

`unit gas yang digunakan * (biaya dasar + biaya prioritas)`

di mana `biaya dasar` adalah nilai yang ditetapkan oleh protokol dan `biaya prioritas` adalah nilai yang ditetapkan oleh pengguna sebagai tip untuk validator.

misalnya, `21,000 * (10 + 2) = 252,000 gwei` (0.000252 ETH).

Ketika Jordan mengirimkan uang, 1.000252 ETH akan dikurangkan dari akun Jordan. Taylor akan dikreditkan 1,0000 ETH. Validator menerima ujung 0,000042 ETH. `Biaya dasar` sebesar 0,00021 ETH dibakar.

### Biaya dasar {#base-fee}

Setiap blok memiliki biaya dasar yang berfungsi sebagai harga cadangan. Agar memenuhi syarat untuk dimasukkan dalam sebuah blok, harga per gas yang ditawarkan harus setidaknya sama dengan biaya dasar. Biaya dasar dihitung secara independen dari blok saat ini dan ditentukan berdasarkan blok-blok sebelumnya – sehingga biaya transaksi menjadi lebih mudah diprediksi bagi pengguna. Ketika blok dibuat, **biaya dasar ini "dibakar"**, menghapusnya dari sirkulasi.

Biaya dasar dihitung dengan rumus yang membandingkan ukuran blok sebelumnya (jumlah gas yang digunakan untuk semua transaksi) dengan ukuran target (setengah dari batas gas). Biaya dasar akan naik atau turun maksimal 12,5% per blok jika ukuran blok target berada di atas atau di bawah target, secara berurutan. Pertumbuhan eksponensial ini membuat ukuran blok tidak layak secara ekonomi untuk tetap tinggi tanpa batas waktu.

| Nomor Blok | Gas yang Termasuk | Peningkatan Biaya | Biaya Dasar Saat Ini |
| ---------- | ----------------: | ----------------: | -------------------: |
| 1          |               18M |                0% |             100 gwei |
| 2          |               36M |                0% |             100 gwei |
| 3          |               36M |             12,5% |           112,5 gwei |
| 4          |               36M |             12,5% |           126,6 gwei |
| 5          |               36M |             12,5% |           142,4 gwei |
| 6          |               36M |             12,5% |           160,2 gwei |
| 7          |               36M |             12,5% |           180,2 gwei |
| 8          |               36M |             12,5% |           202,7 gwei |

Pada tabel di atas, sebuah contoh ditunjukkan dengan menggunakan 36 juta sebagai batas gas. Mengikuti contoh ini, untuk membuat transaksi di blok nomor 9, sebuah dompet akan memberi tahu pengguna dengan pasti bahwa **biaya dasar maksimum** yang akan ditambahkan ke blok berikutnya adalah `biaya dasar saat ini * 112.5%` atau `202.7 gwei * 112.5% = 228.1 gwei`.

Penting juga untuk dicatat bahwa kecil kemungkinan kita akan melihat lonjakan blok penuh yang diperpanjang karena kecepatan kenaikan biaya dasar sebelum blok penuh.

| Nomor Blok                                          |                                   Gas yang Termasuk | Peningkatan Biaya |                                Biaya Dasar Saat Ini |
| --------------------------------------------------- | --------------------------------------------------: | ----------------: | --------------------------------------------------: |
| 30                                                  |                                                 36M |             12,5% |                                         2705,6 gwei |
| ... | ... |             12,5% | ... |
| 50                                                  |                                                 36M |             12,5% |                                        28531,3 gwei |
| ... | ... |             12,5% | ... |
| 100                                                 |                                                 36M |             12,5% |                                     10302608,6 gwei |

### Biaya prioritas (tip) {#priority-fee}

Biaya prioritas (tip) memberikan insentif kepada validator untuk memaksimalkan jumlah transaksi dalam satu blok, yang hanya dibatasi oleh batas gas blok. Tanpa tip, validator yang rasional dapat menyertakan lebih sedikit—atau bahkan nol—transaksi tanpa penalti lapisan eksekusi atau lapisan konsensus langsung, karena imbalan penaruhan tidak bergantung pada berapa banyak transaksi yang ada di dalam blok. Selain itu, tip memungkinkan pengguna untuk menawar lebih tinggi dari yang lain untuk mendapatkan prioritas dalam blok yang sama, yang secara efektif menandakan urgensi.

### Biaya maks {#maxfee}

Untuk mengeksekusi transaksi di jaringan, pengguna dapat menentukan batasan maksimum yang dengan rela mereka bayar agar transaksi mereka dapat dieksekusi. Parameter opsional ini dikenal sebagai `maxFeePerGas`. Agar sebuah transaksi dapat dieksekusi, biaya maksimum harus melebihi jumlah biaya dasar dan tips. Pengirim transaksi mendapat pengembalian dana dari selisih antara biaya maksimum dan jumlah biaya dasar dan tips.

### Ukuran blok {#block-size}

Setiap blok memiliki ukuran target setengah dari batas gas saat ini, tetapi ukuran blok akan bertambah atau berkurang sesuai dengan permintaan jaringan, hingga batas blok tercapai (2x ukuran blok target). Protokol mencapai ukuran blok rata-rata yang seimbang pada target melalui proses _tâtonnement_. Ini berarti jika ukuran blok lebih besar dari ukuran blok target, protokol akan meningkatkan harga dasar untuk blok berikutnya. Dalam cara yang sama, protokol akan mengurangi harga dasar jika ukuran blok kurang dari ukuran blok target.

Jumlah biaya dasar yang disesuaikan proporsional dengan seberapa besar perbedaan ukuran blok saat ini dari blok target. Ini adalah perhitungan linier dari -12,5% untuk blok kosong, 0% pada ukuran target, hingga +12,5% untuk blok yang mencapai batas gas. Batas gas dapat berfluktuasi dari waktu ke waktu berdasarkan sinyal validator, serta melalui peningkatan jaringan. Anda dapat [melihat perubahan batas gas dari waktu ke waktu di sini](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Selengkapnya tentang blok](/developers/docs/blocks/)

### Menghitung biaya gas dalam praktiknya {#calculating-fees-in-practice}

Anda dapat secara eksplisit menyatakan berapa banyak yang bersedia Anda bayarkan agar transaksi Anda dieksekusi. Akan tetapi, sebagian besar penyedia dompet akan secara otomatis menetapkan biaya transaksi yang direkomendasikan (biaya dasar + biaya prioritas yang direkomendasikan) untuk mengurangi jumlah kerumitan yang dibebankan kepada penggunanya.

## Mengapa ada biaya gas? {#why-do-gas-fees-exist}

Pendeknya, biaya gas menolong menjaga jaringan Ethereum aman. Dengan mengharuskan pembayaran biaya untuk setiap komputasi yang dijalankan dalam jaringan, kami mencegah para aktor jahat menyampah di dalam jaringan. Untuk mencegah perulangan tak terbatas yang agresif atau tak disengaja, atau pemborosan dalam kode komputasional lainnya, setiap transaksi diharuskan untuk menentukan batasan seberapa banyak langkah eksekusi kode komputasional yang bisa digunakan. Unit dasar dari komputasi tersebut adalah "gas".

Meskipun suatu transaksi menyertakan batas, gas apa pun yang tidak digunakan dalam transaksi akan dikembalikan ke pengguna (misalnya, `biaya maks - (biaya dasar + tip)` dikembalikan).

![Diagram yang menunjukkan cara pengembalian gas yang tidak terpakai](../transactions/gas-tx.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Apa yang dimaksud dengan batas gas? {#what-is-gas-limit}

Batas gas mengacu pada jumlah maksimum gas yang dapat Anda konsumsi dalam satu transaksi. Transaksi yang lebih rumit yang melibatkan [kontrak pintar](/developers/docs/smart-contracts/) memerlukan lebih banyak pekerjaan komputasi, sehingga memerlukan batas gas yang lebih tinggi daripada pembayaran sederhana. Satu transfer ETH standar memerlukan batas gas sebesar 21.000 unit gas.

Sebagai contoh, jika Anda menetapkan batas gas sebesar 50.000 untuk satu transfer ETH sederhana, EVM akan memakai 21.000, dan Anda akan mendapatkan kembali sisa 29.000. Namun, jika Anda menentukan gas terlalu sedikit, misalnya batas gas 20.000 untuk transfer ETH sederhana, transaksi akan gagal saat fase validasi. Ini akan ditolak sebelum dimasukkan ke dalam blok, dan tidak ada gas yang akan digunakan. Di sisi lain, jika sebuah transaksi kehabisan gas saat eksekusi (misalnya, smart contract menggunakan seluruh gas di tengah proses), EVM akan membatalkan semua perubahan, tetapi seluruh gas yang disediakan tetap akan terpakai untuk pekerjaan yang telah dilakukan.

## Mengapa biaya gas dapat menjadi sangat tinggi? {#why-can-gas-fees-get-so-high}

Biaya gas yang tinggi dikarenakan popularitas Ethereum. Jika ada terlalu banyak permintaan, pengguna harus menawarkan jumlah tip yang lebih tinggi untuk mencoba mengalahkan transaksi pengguna lain. Biaya tips yang lebih tinggi dapat membuat transaksi Anda lebih mungkin akan masuk ke blok berikutnya. Selain itu, aplikasi smart contract yang lebih kompleks mungkin melakukan banyak operasi untuk mendukung fungsinya, sehingga menghabiskan banyak gas.

## Inisiatif untuk mengurangi biaya gas {#initiatives-to-reduce-gas-costs}

[Peningkatan skalabilitas](/roadmap/) Ethereum pada akhirnya akan mengatasi beberapa masalah biaya gas, yang pada gilirannya, akan memungkinkan platform untuk memproses ribuan transaksi per detik dan berskala secara global.

Penskalaan lapisan 2 adalah inisiatif utama untuk sangat meningkatkan biaya gas, pengalaman pengguna, dan skalabilitas.

[Selengkapnya tentang penskalaan lapisan 2](/developers/docs/scaling/#layer-2-scaling)

## Memantau biaya gas {#monitoring-gas-fees}

Jika ingin memantau harga gas, sehingga Anda dapat mengirim ETH lebih murah, Anda dapat menggunakan berbagai alat seperti:

- [Etherscan](https://etherscan.io/gastracker) _Estimator harga gas transaksi_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Estimator harga gas transaksi sumber terbuka_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Pantau dan lacak harga gas Ethereum, dan L2 untuk mengurangi biaya transaksi dan menghemat uang_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Ekstensi Chrome estimasi gas yang mendukung transaksi lawas Tipe 0 dan transaksi Tipe 2 EIP-1559._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Hitung biaya gas dalam mata uang lokal Anda untuk berbagai jenis transaksi di Mainnet, Arbitrum, dan Polygon._

## Perangkat terkait {#related-tools}

- [Platform Gas Blocknative](https://www.blocknative.com/gas) _API estimasi gas yang didukung oleh platform data mempool global Blocknative_
- [Gas Network](https://gas.network) Oracle Gas On-chain. Dukungan untuk 35+ rantai.

## Bacaan lebih lanjut {#further-reading}

- [Penjelasan Gas Ethereum](https://defiprime.com/gas)
- [Mengurangi konsumsi gas dari Kontrak Pintar Anda](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Strategi Optimisasi Gas untuk Pengembang](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Dokumen EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Sumber Daya EIP-1559 Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Memisahkan Mekanisme dari Meme](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
