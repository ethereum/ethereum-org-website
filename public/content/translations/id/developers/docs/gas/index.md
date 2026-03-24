---
title: Gas dan biaya
metaTitle: "Gas dan biaya Ethereum: gambaran teknis"
description: Pelajari tentang biaya gas Ethereum, bagaimana mereka dihitung, dan peran mereka dalam keamanan jaringan dan pemrosesan transaksi.
lang: id
---

Gas sangat penting bagi jaringan [Ethereum](/). Ini adalah bahan bakar yang memungkinkannya beroperasi, sama seperti mobil yang membutuhkan bensin untuk berjalan.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [transaksi](/developers/docs/transactions/) dan [EVM](/developers/docs/evm/).

## Apa itu gas? {#what-is-gas}

Gas merujuk pada unit yang mengukur jumlah upaya komputasi yang diperlukan untuk mengeksekusi operasi tertentu di jaringan Ethereum.

Karena setiap transaksi Ethereum memerlukan sumber daya komputasi untuk dieksekusi, sumber daya tersebut harus dibayar untuk memastikan Ethereum tidak rentan terhadap spam dan tidak dapat terjebak dalam putaran komputasi tak terbatas. Pembayaran untuk komputasi dilakukan dalam bentuk biaya gas.

Biaya gas adalah **jumlah gas yang digunakan untuk melakukan suatu operasi, dikalikan dengan biaya per unit gas**. Biaya ini dibayarkan terlepas dari apakah transaksi berhasil atau gagal.

![Diagram yang menunjukkan di mana gas dibutuhkan dalam operasi EVM](./gas.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Biaya gas harus dibayar dalam mata uang asli Ethereum, ether (ETH). Harga gas biasanya dikutip dalam gwei, yang merupakan denominasi dari ETH. Setiap gwei sama dengan sepersemiliar dari satu ETH (0,000000001 ETH atau 10<sup>-9</sup> ETH).

Sebagai contoh, daripada mengatakan bahwa biaya gas Anda adalah 0,000000001 ether, Anda dapat mengatakan biaya gas Anda adalah 1 gwei.

Kata 'gwei' adalah singkatan dari 'giga-wei', yang berarti 'miliar wei'. Satu gwei sama dengan satu miliar wei. Wei itu sendiri (dinamai dari [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), pencipta [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) adalah unit terkecil dari ETH.

## Bagaimana biaya gas dihitung? {#how-are-gas-fees-calculated}

Anda dapat mengatur jumlah gas yang bersedia Anda bayar saat Anda mengirimkan transaksi. Dengan menawarkan sejumlah gas tertentu, Anda menawar agar transaksi Anda dimasukkan ke dalam blok berikutnya. Jika Anda menawarkan terlalu sedikit, validator cenderung tidak akan memilih transaksi Anda untuk dimasukkan, yang berarti transaksi Anda mungkin dieksekusi terlambat atau tidak sama sekali. Jika Anda menawarkan terlalu banyak, Anda mungkin membuang-buang ETH. Jadi, bagaimana Anda bisa tahu berapa banyak yang harus dibayar?

Total gas yang Anda bayar dibagi menjadi dua komponen: `base fee` (biaya dasar) dan `priority fee` (tip).

`base fee` ditetapkan oleh protokol—Anda harus membayar setidaknya jumlah ini agar transaksi Anda dianggap valid. `priority fee` adalah tip yang Anda tambahkan ke biaya dasar untuk membuat transaksi Anda menarik bagi validator sehingga mereka memilihnya untuk dimasukkan ke dalam blok berikutnya.

Transaksi yang hanya membayar `base fee` secara teknis valid tetapi tidak mungkin dimasukkan karena tidak menawarkan insentif kepada validator untuk memilihnya dibandingkan transaksi lainnya. Biaya `priority` yang 'tepat' ditentukan oleh penggunaan jaringan pada saat Anda mengirim transaksi Anda—jika ada banyak permintaan maka Anda mungkin harus mengatur biaya `priority` Anda lebih tinggi, tetapi ketika ada lebih sedikit permintaan Anda dapat membayar lebih sedikit.

Sebagai contoh, katakanlah Jordan harus membayar Taylor 1 ETH. Transfer ETH membutuhkan 21.000 unit gas, dan biaya dasar adalah 10 gwei. Jordan menyertakan tip sebesar 2 gwei.

Total biaya sekarang akan sama dengan:

`unit gas yang digunakan * (biaya dasar + biaya prioritas)`

di mana `base fee` adalah nilai yang ditetapkan oleh protokol dan `priority fee` adalah nilai yang ditetapkan oleh pengguna sebagai tip untuk validator.

mis., `21.000 * (10 + 2) = 252.000 gwei` (0,000252 ETH).

Ketika Jordan mengirim uang, 1,000252 ETH akan dipotong dari akun Jordan. Taylor akan dikreditkan 1,0000 ETH. Validator menerima tip sebesar 0,000042 ETH. `base fee` sebesar 0,00021 ETH dibakar.

### Biaya dasar {#base-fee}

Setiap blok memiliki biaya dasar yang bertindak sebagai harga cadangan. Agar memenuhi syarat untuk dimasukkan ke dalam blok, harga yang ditawarkan per gas setidaknya harus sama dengan biaya dasar. Biaya dasar dihitung secara independen dari blok saat ini dan sebaliknya ditentukan oleh blok-blok sebelumnya, membuat biaya transaksi lebih dapat diprediksi oleh pengguna. Ketika blok dibuat, **biaya dasar ini "dibakar"**, menghapusnya dari peredaran.

Biaya dasar dihitung dengan rumus yang membandingkan ukuran blok sebelumnya (jumlah gas yang digunakan untuk semua transaksi) dengan ukuran target (setengah dari batas gas). Biaya dasar akan meningkat atau menurun dengan maksimum 12,5% per blok jika ukuran blok target berada di atas atau di bawah target, secara berurutan. Pertumbuhan eksponensial ini membuatnya secara ekonomi tidak layak untuk ukuran blok tetap tinggi tanpa batas waktu.

| Nomor Blok | Gas yang Dimasukkan | Peningkatan Biaya | Biaya Dasar Saat Ini |
| ---------- | ------------------: | ----------------: | -------------------: |
| 1          |                 18M |                0% |             100 gwei |
| 2          |                 36M |                0% |             100 gwei |
| 3          |                 36M |             12,5% |           112,5 gwei |
| 4          |                 36M |             12,5% |           126,6 gwei |
| 5          |                 36M |             12,5% |           142,4 gwei |
| 6          |                 36M |             12,5% |           160,2 gwei |
| 7          |                 36M |             12,5% |           180,2 gwei |
| 8          |                 36M |             12,5% |           202,7 gwei |

Pada tabel di atas, sebuah contoh didemonstrasikan menggunakan 36 juta sebagai batas gas. Mengikuti contoh ini, untuk membuat transaksi pada blok nomor 9, dompet akan memberi tahu pengguna dengan pasti bahwa **biaya dasar maksimum** yang akan ditambahkan ke blok berikutnya adalah `biaya dasar saat ini * 112,5%` atau `202,7 gwei * 112,5% = 228,1 gwei`.

Penting juga untuk dicatat bahwa tidak mungkin kita akan melihat lonjakan blok penuh yang berkepanjangan karena kecepatan peningkatan biaya dasar yang mendahului blok penuh.

| Nomor Blok | Gas yang Dimasukkan | Peningkatan Biaya | Biaya Dasar Saat Ini |
| ---------- | ------------------: | ----------------: | -------------------: |
| 30         |                 36M |             12,5% |          2705,6 gwei |
| ...        |                 ... |             12,5% |                  ... |
| 50         |                 36M |             12,5% |         28531,3 gwei |
| ...        |                 ... |             12,5% |                  ... |
| 100        |                 36M |             12,5% |      10302608,6 gwei |

### Biaya prioritas (tip) {#priority-fee}

Biaya prioritas (tip) memberikan insentif kepada validator untuk memaksimalkan jumlah transaksi dalam sebuah blok, yang hanya dibatasi oleh batas gas blok. Tanpa tip, validator yang rasional dapat memasukkan lebih sedikit—atau bahkan nol—transaksi tanpa penalti langsung dari lapisan eksekusi atau lapisan konsensus, karena hadiah mengunci tidak bergantung pada berapa banyak transaksi yang ada dalam sebuah blok. Selain itu, tip memungkinkan pengguna untuk menawar lebih tinggi dari yang lain untuk mendapatkan prioritas dalam blok yang sama, yang secara efektif menandakan urgensi. 

### Biaya maks {#maxfee}

Untuk mengeksekusi transaksi di jaringan, pengguna dapat menentukan batas maksimum yang bersedia mereka bayar agar transaksi mereka dieksekusi. Parameter opsional ini dikenal sebagai `maxFeePerGas`. Agar transaksi dapat dieksekusi, biaya maks harus melebihi jumlah biaya dasar dan tip. Pengirim transaksi akan dikembalikan selisih antara biaya maks dan jumlah biaya dasar serta tip.

### Ukuran blok {#block-size}

Setiap blok memiliki ukuran target setengah dari batas gas saat ini, tetapi ukuran blok akan meningkat atau menurun sesuai dengan permintaan jaringan, hingga batas blok tercapai (2x ukuran blok target). Protokol mencapai ukuran blok rata-rata ekuilibrium pada target melalui proses _tâtonnement_. Ini berarti jika ukuran blok lebih besar dari ukuran blok target, protokol akan meningkatkan biaya dasar untuk blok berikutnya. Demikian pula, protokol akan menurunkan biaya dasar jika ukuran blok kurang dari ukuran blok target.

Jumlah penyesuaian biaya dasar sebanding dengan seberapa jauh ukuran blok saat ini dari target. Ini adalah perhitungan linier dari -12,5% untuk blok kosong, 0% pada ukuran target, hingga +12,5% untuk blok yang mencapai batas gas. Batas gas dapat berfluktuasi dari waktu ke waktu berdasarkan sinyal validator, serta melalui peningkatan jaringan. Anda dapat [melihat perubahan batas gas dari waktu ke waktu di sini](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Lebih lanjut tentang blok](/developers/docs/blocks/)

### Menghitung biaya gas dalam praktiknya {#calculating-fees-in-practice}

Anda dapat secara eksplisit menyatakan berapa banyak yang bersedia Anda bayar untuk mengeksekusi transaksi Anda. Namun, sebagian besar penyedia dompet akan secara otomatis menetapkan biaya transaksi yang disarankan (biaya dasar + biaya prioritas yang disarankan) untuk mengurangi jumlah kompleksitas yang dibebankan kepada pengguna mereka.

## Mengapa biaya gas ada? {#why-do-gas-fees-exist}

Singkatnya, biaya gas membantu menjaga keamanan jaringan Ethereum. Dengan mewajibkan biaya untuk setiap komputasi yang dieksekusi di jaringan, kami mencegah pelaku kejahatan melakukan spam pada jaringan. Untuk menghindari putaran tak terbatas yang tidak disengaja atau bermusuhan atau pemborosan komputasi lainnya dalam kode, setiap transaksi diharuskan untuk menetapkan batas berapa banyak langkah komputasi eksekusi kode yang dapat digunakannya. Unit dasar komputasi adalah "gas".

Meskipun transaksi menyertakan batas, gas apa pun yang tidak digunakan dalam transaksi akan dikembalikan kepada pengguna (mis., `biaya maks - (biaya dasar + tip)` dikembalikan).

![Diagram yang menunjukkan bagaimana gas yang tidak digunakan dikembalikan](../transactions/gas-tx.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Apa itu batas gas? {#what-is-gas-limit}

Batas gas merujuk pada jumlah maksimum gas yang bersedia Anda konsumsi pada sebuah transaksi. Transaksi yang lebih rumit yang melibatkan [kontrak pintar](/developers/docs/smart-contracts/) memerlukan lebih banyak pekerjaan komputasi, sehingga memerlukan batas gas yang lebih tinggi daripada pembayaran sederhana. Transfer ETH standar memerlukan batas gas sebesar 21.000 unit gas.

Sebagai contoh, jika Anda menetapkan batas gas sebesar 50.000 untuk transfer ETH sederhana, EVM akan mengonsumsi 21.000, dan Anda akan mendapatkan kembali sisa 29.000. Namun, jika Anda menentukan gas yang terlalu sedikit, misalnya, batas gas sebesar 20.000 untuk transfer ETH sederhana, transaksi akan gagal selama fase validasi. Transaksi tersebut akan ditolak sebelum dimasukkan ke dalam blok, dan tidak ada gas yang akan dikonsumsi. Di sisi lain, jika transaksi kehabisan gas selama eksekusi (mis., kontrak pintar menghabiskan semua gas di tengah jalan), EVM akan mengembalikan perubahan apa pun, tetapi semua gas yang disediakan akan tetap dikonsumsi untuk pekerjaan yang dilakukan.

## Mengapa biaya gas bisa menjadi sangat tinggi? {#why-can-gas-fees-get-so-high}

Biaya gas yang tinggi disebabkan oleh popularitas Ethereum. Jika ada terlalu banyak permintaan, pengguna harus menawarkan jumlah tip yang lebih tinggi untuk mencoba dan menawar lebih tinggi dari transaksi pengguna lain. Tip yang lebih tinggi dapat membuat transaksi Anda lebih mungkin masuk ke blok berikutnya. Selain itu, aplikasi kontrak pintar yang lebih kompleks mungkin melakukan banyak operasi untuk mendukung fungsinya, membuatnya mengonsumsi banyak gas.

## Inisiatif untuk mengurangi biaya gas {#initiatives-to-reduce-gas-costs}

[Peningkatan skalabilitas](/roadmap/) Ethereum pada akhirnya harus mengatasi beberapa masalah biaya gas, yang pada gilirannya, akan memungkinkan platform untuk memproses ribuan transaksi per detik dan berskala global.

Peningkatan layer 2 adalah inisiatif utama untuk sangat meningkatkan biaya gas, pengalaman pengguna, dan skalabilitas.

[Lebih lanjut tentang peningkatan layer 2](/developers/docs/scaling/#layer-2-scaling)

## Memantau biaya gas {#monitoring-gas-fees}

Jika Anda ingin memantau harga gas, sehingga Anda dapat mengirim ETH Anda dengan biaya lebih murah, Anda dapat menggunakan banyak alat yang berbeda seperti:

- [Etherscan](https://etherscan.io/gastracker) _Estimator harga gas transaksi_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Estimator harga gas transaksi sumber terbuka_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Pantau dan lacak harga gas Ethereum dan L2 untuk mengurangi biaya transaksi dan menghemat uang_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Ekstensi Chrome estimasi gas yang mendukung transaksi warisan Tipe 0 dan transaksi EIP-1559 Tipe 2._
- [Kalkulator Biaya Gas Cryptoneur](https://www.cryptoneur.xyz/gas-fees-calculator) _Hitung biaya gas dalam mata uang lokal Anda untuk berbagai jenis transaksi di Mainnet, Arbitrum, dan Polygon._

## Alat terkait {#related-tools}

- [Platform Gas Blocknative](https://www.blocknative.com/gas) _API estimasi gas yang didukung oleh platform data mempool global Blocknative_
- [Gas Network](https://gas.network) Oracle Gas Onchain. Dukungan untuk 35+ rantai. 

## Bacaan lebih lanjut {#further-reading}

- [Penjelasan Gas Ethereum](https://defiprime.com/gas)
- [Mengurangi konsumsi gas dari Kontrak Pintar Anda](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Strategi Optimasi Gas untuk Pengembang](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Dokumentasi EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Sumber Daya EIP-1559 Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Memisahkan Mekanisme Dari Meme](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)