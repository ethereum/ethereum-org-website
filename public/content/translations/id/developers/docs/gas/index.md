---
title: Gas dan biaya
metaTitle: "Gas dan biaya Ethereum: ikhtisar teknis"
description: Pelajari tentang biaya gas Ethereum, cara penghitungannya, dan perannya dalam keamanan jaringan serta pemrosesan transaksi.
lang: id
---

Gas sangat penting bagi jaringan [Ethereum](/). Gas adalah bahan bakar yang memungkinkannya beroperasi, sama seperti mobil yang membutuhkan bensin untuk berjalan.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [transaksi](/developers/docs/transactions/) dan [EVM](/developers/docs/evm/).

## Apa itu gas? {#what-is-gas}

Gas merujuk pada unit yang mengukur jumlah upaya komputasi yang diperlukan untuk mengeksekusi operasi tertentu di jaringan Ethereum.

Karena setiap transaksi Ethereum memerlukan sumber daya komputasi untuk dieksekusi, sumber daya tersebut harus dibayar untuk memastikan Ethereum tidak rentan terhadap spam dan tidak terjebak dalam putaran komputasi tak terbatas. Pembayaran untuk komputasi dilakukan dalam bentuk biaya gas.

Biaya gas adalah **jumlah gas yang digunakan untuk melakukan suatu operasi, dikalikan dengan biaya per unit gas**. Biaya ini dibayarkan terlepas dari apakah transaksi berhasil atau gagal.

![A diagram showing where gas is needed in EVM operations](./gas.png)
_Diagram diadaptasi dari [Ilustrasi EVM Ethereum](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Biaya gas harus dibayar dalam mata uang asli Ethereum, ether (ETH). Harga gas biasanya dikutip dalam Gwei, yang merupakan denominasi dari ETH. Setiap Gwei sama dengan sepersemiliar ETH (0,000000001 ETH atau 10<sup>-9</sup> ETH).

Sebagai contoh, alih-alih mengatakan bahwa biaya gas Anda adalah 0,000000001 ether, Anda dapat mengatakan biaya gas Anda adalah 1 Gwei.

Kata 'Gwei' adalah singkatan dari 'giga-wei', yang berarti 'miliar Wei'. Satu Gwei sama dengan satu miliar Wei. Wei itu sendiri (dinamai dari [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), pencipta [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) adalah unit terkecil dari ETH.

## Bagaimana biaya gas dihitung? {#how-are-gas-fees-calculated}

Anda dapat menetapkan jumlah gas yang bersedia Anda bayar saat mengirimkan transaksi. Dengan menawarkan sejumlah gas tertentu, Anda menawar agar transaksi Anda dimasukkan ke dalam blok berikutnya. Jika Anda menawarkan terlalu sedikit, validator cenderung tidak akan memilih transaksi Anda untuk dimasukkan, yang berarti transaksi Anda mungkin dieksekusi terlambat atau tidak sama sekali. Jika Anda menawarkan terlalu banyak, Anda mungkin membuang-buang ETH. Jadi, bagaimana Anda bisa tahu berapa banyak yang harus dibayar?

Total gas yang Anda bayar dibagi menjadi dua komponen: `base fee` (biaya dasar) dan `priority fee` (tip).

`base fee` ditetapkan oleh protokol—Anda harus membayar setidaknya jumlah ini agar transaksi Anda dianggap valid. `priority fee` adalah tip yang Anda tambahkan ke biaya dasar untuk membuat transaksi Anda menarik bagi validator sehingga mereka memilihnya untuk dimasukkan ke dalam blok berikutnya.

Transaksi yang hanya membayar `base fee` secara teknis valid tetapi tidak mungkin dimasukkan karena tidak menawarkan insentif kepada validator untuk memilihnya dibandingkan transaksi lain. Biaya `priority` yang 'tepat' ditentukan oleh penggunaan jaringan pada saat Anda mengirim transaksi—jika ada banyak permintaan maka Anda mungkin harus menetapkan biaya `priority` Anda lebih tinggi, tetapi ketika permintaan lebih sedikit Anda dapat membayar lebih sedikit.

Sebagai contoh, katakanlah Jordan harus membayar Taylor 1 ETH. Transfer ETH memerlukan 21.000 unit gas, dan biaya dasar adalah 10 Gwei. Jordan menyertakan tip sebesar 2 Gwei.

Total biaya sekarang akan sama dengan:

`units of gas used * (base fee + priority fee)`

di mana `base fee` adalah nilai yang ditetapkan oleh protokol dan `priority fee` adalah nilai yang ditetapkan oleh pengguna sebagai tip untuk validator.

mis., `21,000 * (10 + 2) = 252,000 gwei` (0,000252 ETH).

Ketika Jordan mengirim uang, 1,000252 ETH akan dipotong dari akun Jordan. Taylor akan dikreditkan 1,0000 ETH. Validator menerima tip sebesar 0,000042 ETH. `base fee` sebesar 0,00021 ETH dibakar.

### Biaya dasar {#base-fee}

Setiap blok memiliki biaya dasar yang bertindak sebagai harga cadangan. Agar memenuhi syarat untuk dimasukkan ke dalam blok, harga yang ditawarkan per gas setidaknya harus sama dengan biaya dasar. Biaya dasar dihitung secara independen dari blok saat ini dan sebaliknya ditentukan oleh blok-blok sebelumnya, membuat biaya transaksi lebih dapat diprediksi oleh pengguna. Ketika blok dibuat, **biaya dasar ini "dibakar"**, menghapusnya dari peredaran.

Biaya dasar dihitung dengan rumus yang membandingkan ukuran blok sebelumnya (jumlah gas yang digunakan untuk semua transaksi) dengan ukuran target (setengah dari batas gas). Biaya dasar akan meningkat atau menurun maksimal 12,5% per blok jika ukuran blok target masing-masing berada di atas atau di bawah target. Pertumbuhan eksponensial ini membuatnya secara ekonomi tidak layak bagi ukuran blok untuk tetap tinggi tanpa batas waktu.

| Nomor Blok | Gas yang Dimasukkan | Peningkatan Biaya | Biaya Dasar Saat Ini |
| ---------- | ------------------: | ----------------: | -------------------: |
| 1          |                 18M |                0% |             100 Gwei |
| 2          |                 36M |                0% |             100 Gwei |
| 3          |                 36M |             12,5% |           112,5 Gwei |
| 4          |                 36M |             12,5% |           126,6 Gwei |
| 5          |                 36M |             12,5% |           142,4 Gwei |
| 6          |                 36M |             12,5% |           160,2 Gwei |
| 7          |                 36M |             12,5% |           180,2 Gwei |
| 8          |                 36M |             12,5% |           202,7 Gwei |

Pada tabel di atas, sebuah contoh didemonstrasikan menggunakan 36 juta sebagai batas gas. Mengikuti contoh ini, untuk membuat transaksi pada blok nomor 9, dompet akan memberi tahu pengguna dengan pasti bahwa **biaya dasar maksimum** yang akan ditambahkan ke blok berikutnya adalah `current base fee * 112.5%` atau `202.7 gwei * 112.5% = 228.1 gwei`.

Penting juga untuk dicatat bahwa kecil kemungkinannya kita akan melihat lonjakan blok penuh yang berkepanjangan karena kecepatan peningkatan biaya dasar yang mendahului blok penuh.

| Nomor Blok | Gas yang Dimasukkan | Peningkatan Biaya | Biaya Dasar Saat Ini |
| ---------- | ------------------: | ----------------: | -------------------: |
| 30         |                 36M |             12,5% |          2705,6 Gwei |
| ...        |                 ... |             12,5% |                  ... |
| 50         |                 36M |             12,5% |         28531,3 Gwei |
| ...        |                 ... |             12,5% |                  ... |
| 100        |                 36M |             12,5% |      10302608,6 Gwei |

### Biaya prioritas (tip) {#priority-fee}

Biaya prioritas (tip) memberi insentif kepada validator untuk memaksimalkan jumlah transaksi dalam sebuah blok, yang hanya dibatasi oleh batas gas blok. Tanpa tip, validator yang rasional dapat memasukkan lebih sedikit—atau bahkan nol—transaksi tanpa penalti lapisan eksekusi atau lapisan konsensus langsung, karena imbalan staking tidak bergantung pada berapa banyak transaksi yang ada dalam sebuah blok. Selain itu, tip memungkinkan pengguna untuk menawar lebih tinggi dari yang lain untuk mendapatkan prioritas dalam blok yang sama, yang secara efektif menandakan urgensi. 

### Biaya maksimum {#maxfee}

Untuk mengeksekusi transaksi di jaringan, pengguna dapat menentukan batas maksimum yang bersedia mereka bayar agar transaksi mereka dieksekusi. Parameter opsional ini dikenal sebagai `maxFeePerGas`. Agar transaksi dapat dieksekusi, biaya maksimum harus melebihi jumlah biaya dasar dan tip. Pengirim transaksi akan menerima pengembalian dana sebesar selisih antara biaya maksimum dan jumlah biaya dasar serta tip.

### Ukuran blok {#block-size}

Setiap blok memiliki ukuran target setengah dari batas gas saat ini, tetapi ukuran blok akan meningkat atau menurun sesuai dengan permintaan jaringan, hingga batas blok tercapai (2x ukuran blok target). Protokol mencapai ukuran blok rata-rata ekuilibrium pada target melalui proses _tâtonnement_. Ini berarti jika ukuran blok lebih besar dari ukuran blok target, protokol akan meningkatkan biaya dasar untuk blok berikutnya. Demikian pula, protokol akan menurunkan biaya dasar jika ukuran blok lebih kecil dari ukuran blok target.

Jumlah penyesuaian biaya dasar sebanding dengan seberapa jauh ukuran blok saat ini dari target. Ini adalah perhitungan linier dari -12,5% untuk blok kosong, 0% pada ukuran target, hingga +12,5% untuk blok yang mencapai batas gas. Batas gas dapat berfluktuasi dari waktu ke waktu berdasarkan sinyal validator, serta melalui peningkatan jaringan. Anda dapat [melihat perubahan batas gas dari waktu ke waktu di sini](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Lebih lanjut tentang blok](/developers/docs/blocks/)

### Menghitung biaya gas dalam praktiknya {#calculating-fees-in-practice}

Anda dapat secara eksplisit menyatakan berapa banyak yang bersedia Anda bayar agar transaksi Anda dieksekusi. Namun, sebagian besar penyedia dompet akan secara otomatis menetapkan biaya transaksi yang direkomendasikan (biaya dasar + biaya prioritas yang direkomendasikan) untuk mengurangi tingkat kerumitan yang dibebankan kepada pengguna mereka.

## Mengapa biaya gas ada? {#why-do-gas-fees-exist}

Singkatnya, biaya gas membantu menjaga keamanan jaringan Ethereum. Dengan mewajibkan biaya untuk setiap komputasi yang dieksekusi di jaringan, kita mencegah pelaku kejahatan melakukan spam pada jaringan. Untuk menghindari putaran tak terbatas yang tidak disengaja atau bermusuhan atau pemborosan komputasi lainnya dalam kode, setiap transaksi diwajibkan untuk menetapkan batas berapa banyak langkah komputasi eksekusi kode yang dapat digunakannya. Unit dasar komputasi adalah "gas".

Meskipun transaksi menyertakan batas, gas apa pun yang tidak digunakan dalam transaksi akan dikembalikan kepada pengguna (mis., `max fee - (base fee + tip)` dikembalikan).

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_Diagram diadaptasi dari [Ilustrasi EVM Ethereum](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Apa itu batas gas? {#what-is-gas-limit}

Batas gas merujuk pada jumlah maksimum gas yang bersedia Anda konsumsi pada sebuah transaksi. Transaksi yang lebih rumit yang melibatkan [kontrak pintar](/developers/docs/smart-contracts/) memerlukan lebih banyak pekerjaan komputasi, sehingga memerlukan batas gas yang lebih tinggi daripada pembayaran sederhana. Transfer ETH standar memerlukan batas gas sebesar 21.000 unit gas.

Sebagai contoh, jika Anda menetapkan batas gas sebesar 50.000 untuk transfer ETH sederhana, EVM akan mengonsumsi 21.000, dan Anda akan mendapatkan kembali sisa 29.000. Namun, jika Anda menentukan gas yang terlalu sedikit, misalnya, batas gas sebesar 20.000 untuk transfer ETH sederhana, transaksi akan gagal selama fase validasi. Transaksi tersebut akan ditolak sebelum dimasukkan ke dalam blok, dan tidak ada gas yang akan dikonsumsi. Di sisi lain, jika transaksi kehabisan gas selama eksekusi (mis., kontrak pintar menghabiskan semua gas di tengah jalan), EVM akan mengembalikan perubahan apa pun, tetapi semua gas yang disediakan akan tetap dikonsumsi untuk pekerjaan yang telah dilakukan.

## Mengapa biaya gas bisa menjadi sangat tinggi? {#why-can-gas-fees-get-so-high}

Biaya gas yang tinggi disebabkan oleh popularitas Ethereum. Jika ada terlalu banyak permintaan, pengguna harus menawarkan jumlah tip yang lebih tinggi untuk mencoba dan menawar lebih tinggi dari transaksi pengguna lain. Tip yang lebih tinggi dapat membuat transaksi Anda lebih mungkin masuk ke blok berikutnya. Selain itu, aplikasi kontrak pintar yang lebih kompleks mungkin melakukan banyak operasi untuk mendukung fungsinya, membuatnya mengonsumsi banyak gas.

## Inisiatif untuk mengurangi biaya gas {#initiatives-to-reduce-gas-costs}

[Peningkatan skalabilitas](/roadmap/) Ethereum pada akhirnya akan mengatasi beberapa masalah biaya gas, yang pada gilirannya akan memungkinkan platform untuk memproses ribuan transaksi per detik dan berskala global.

Penskalaan lapisan 2 (l2) adalah inisiatif utama untuk sangat meningkatkan biaya gas, pengalaman pengguna, dan skalabilitas.

[Lebih lanjut tentang penskalaan lapisan 2 (l2)](/developers/docs/scaling/#layer-2-scaling)

## Memantau biaya gas {#monitoring-gas-fees}

Jika Anda ingin memantau harga gas, sehingga Anda dapat mengirim ETH Anda dengan biaya lebih murah, Anda dapat menggunakan banyak alat yang berbeda seperti:

- [Etherscan](https://etherscan.io/gastracker) _Estimator harga gas transaksi_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Estimator harga gas transaksi sumber terbuka_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Pantau dan lacak harga gas Ethereum dan L2 untuk mengurangi biaya transaksi dan menghemat uang_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Ekstensi Chrome untuk estimasi gas yang mendukung transaksi warisan Tipe 0 dan transaksi EIP-1559 Tipe 2._
- [Kalkulator Biaya Gas Cryptoneur](https://www.cryptoneur.xyz/gas-fees-calculator) _Hitung biaya gas dalam mata uang lokal Anda untuk berbagai jenis transaksi di Mainnet, Arbitrum, dan Polygon._

## Alat terkait {#related-tools}

- [Platform Gas Blocknative](https://www.blocknative.com/gas) _API estimasi gas yang didukung oleh platform data mempool global Blocknative_
- [Jaringan Gas](https://gas.network) Oracle Gas Onchain. Dukungan untuk 35+ rantai. 

## Bacaan lebih lanjut {#further-reading}

- [Penjelasan Gas Ethereum](https://defiprime.com/gas)
- [Mengurangi konsumsi gas dari Kontrak Pintar Anda](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Strategi Pengoptimalan Gas untuk Pengembang](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Dokumentasi EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Sumber Daya EIP-1559 Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Memisahkan Mekanisme Dari Meme](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)