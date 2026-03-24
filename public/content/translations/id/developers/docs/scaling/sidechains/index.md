---
title: Sidechain
description: Pengantar tentang sidechain sebagai solusi peningkatan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
sidebarDepth: 3
---

Sidechain adalah blockchain terpisah yang berjalan secara independen dari [Ethereum](/) dan terhubung ke Mainnet Ethereum oleh jembatan dua arah. Sidechain dapat memiliki parameter blok dan [algoritma konsensus](/developers/docs/consensus-mechanisms/) yang terpisah, yang sering kali dirancang untuk pemrosesan transaksi yang efisien. Namun, menggunakan sidechain melibatkan pertukaran (trade-off), karena mereka tidak mewarisi sifat keamanan Ethereum. Tidak seperti [solusi peningkatan layer 2](/layer-2/), sidechain tidak mengirimkan perubahan status dan data transaksi kembali ke Mainnet Ethereum.

Sidechain juga mengorbankan beberapa tingkat desentralisasi atau keamanan untuk mencapai throughput yang tinggi ([trilema skalabilitas](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Namun, Ethereum berkomitmen pada peningkatan tanpa mengorbankan desentralisasi dan keamanan.

## Bagaimana cara kerja sidechain? {#how-do-sidechains-work}

Sidechain adalah blockchain independen, dengan riwayat, peta jalan pengembangan, dan pertimbangan desain yang berbeda. Meskipun sidechain mungkin memiliki beberapa kesamaan tingkat permukaan dengan Ethereum, ia memiliki beberapa fitur yang khas.

### Algoritma konsensus {#consensus-algorithms}

Salah satu kualitas yang membuat sidechain unik (yaitu, berbeda dari Ethereum) adalah algoritma konsensus yang digunakan. Sidechain tidak bergantung pada Ethereum untuk konsensus dan dapat memilih protokol konsensus alternatif yang sesuai dengan kebutuhan mereka. Beberapa contoh algoritma konsensus yang digunakan pada sidechain meliputi:

- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)
- [Delegated proof-of-stake](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Byzantine fault tolerance](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Seperti Ethereum, sidechain memiliki node validasi yang memverifikasi dan memproses transaksi, menghasilkan blok, dan menyimpan status blockchain. Validator juga bertanggung jawab untuk mempertahankan konsensus di seluruh jaringan dan mengamankannya dari serangan berbahaya.

#### Parameter blok {#block-parameters}

Ethereum menempatkan batasan pada [waktu blok](/developers/docs/blocks/#block-time) (yaitu, waktu yang dibutuhkan untuk menghasilkan blok baru) dan [ukuran blok](/developers/docs/blocks/#block-size) (yaitu, jumlah data yang terkandung per blok dalam denominasi gas). Sebaliknya, sidechain sering kali mengadopsi parameter yang berbeda, seperti waktu blok yang lebih cepat dan batas gas yang lebih tinggi, untuk mencapai throughput yang tinggi, transaksi yang cepat, dan biaya yang rendah.

Meskipun ini memiliki beberapa manfaat, hal ini memiliki implikasi kritis terhadap desentralisasi dan keamanan jaringan. Parameter blok, seperti waktu blok yang cepat dan ukuran blok yang besar, meningkatkan kesulitan dalam menjalankan node penuh—menyisakan beberapa "supernode" yang bertanggung jawab untuk mengamankan rantai. Dalam skenario seperti itu, kemungkinan kolusi validator atau pengambilalihan rantai secara berbahaya akan meningkat.

Agar blockchain dapat melakukan peningkatan tanpa merusak desentralisasi, menjalankan node harus terbuka untuk semua orang—tidak harus pihak dengan perangkat keras khusus. Inilah sebabnya mengapa upaya sedang dilakukan untuk memastikan semua orang dapat [menjalankan node penuh](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) di jaringan Ethereum.

### Kompatibilitas EVM {#evm-compatibility}

Beberapa sidechain kompatibel dengan EVM dan mampu mengeksekusi kontrak yang dikembangkan untuk [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/). Sidechain yang kompatibel dengan EVM mendukung kontrak pintar yang [ditulis dalam Solidity](/developers/docs/smart-contracts/languages/), serta bahasa kontrak pintar EVM lainnya, yang berarti kontrak pintar yang ditulis untuk Mainnet Ethereum juga akan berfungsi pada sidechain yang kompatibel dengan EVM.

Ini berarti jika Anda ingin menggunakan [dapp](/developers/docs/dapps/) Anda di sidechain, Anda hanya perlu menerapkan [kontrak pintar](/developers/docs/smart-contracts/) Anda ke sidechain ini. Ini terlihat, terasa, dan bertindak seperti halnya Mainnet—Anda menulis kontrak dalam Solidity, dan berinteraksi dengan rantai melalui RPC sidechain.

Karena sidechain kompatibel dengan EVM, mereka dianggap sebagai [solusi peningkatan](/developers/docs/scaling/) yang berguna untuk dapp asli Ethereum. Dengan dapp Anda di sidechain, pengguna dapat menikmati biaya gas yang lebih rendah dan transaksi yang lebih cepat, terutama jika Mainnet sedang padat.

Namun, seperti yang dijelaskan sebelumnya, menggunakan sidechain melibatkan pertukaran yang signifikan. Setiap sidechain bertanggung jawab atas keamanannya sendiri dan tidak mewarisi sifat keamanan Ethereum. Hal ini meningkatkan kemungkinan perilaku berbahaya yang dapat memengaruhi pengguna Anda atau membahayakan dana mereka.

### Pergerakan aset {#asset-movement}

Agar blockchain terpisah dapat menjadi sidechain bagi Mainnet Ethereum, ia memerlukan kemampuan untuk memfasilitasi transfer aset dari dan ke Mainnet Ethereum. Interoperabilitas dengan Ethereum ini dicapai menggunakan jembatan blockchain. [Jembatan](/bridges/) menggunakan kontrak pintar yang diterapkan di Mainnet Ethereum dan sidechain untuk mengontrol penjembatanan dana di antara keduanya.

Meskipun jembatan membantu pengguna memindahkan dana antara Ethereum dan sidechain, aset tersebut tidak dipindahkan secara fisik melintasi kedua rantai. Sebaliknya, mekanisme yang biasanya melibatkan proses mint dan pembakaran (burning) digunakan untuk mentransfer nilai di seluruh rantai. Lebih lanjut tentang [cara kerja jembatan](/developers/docs/bridges/#how-do-bridges-work).

## Kelebihan dan kekurangan sidechain {#pros-and-cons-of-sidechains}

| Kelebihan                                                                                                                   | Kekurangan                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Teknologi yang mendasari sidechain sudah mapan dan mendapat manfaat dari penelitian ekstensif serta peningkatan dalam desain. | Sidechain mengorbankan beberapa tingkat desentralisasi dan sifat tanpa kepercayaan (trustlessness) demi skalabilitas. |
| Sidechain mendukung komputasi umum dan menawarkan kompatibilitas EVM (mereka dapat menjalankan dapp asli Ethereum).         | Sidechain menggunakan mekanisme konsensus yang terpisah dan tidak mendapat manfaat dari jaminan keamanan Ethereum. |
| Sidechain menggunakan model konsensus yang berbeda untuk memproses transaksi secara efisien dan menurunkan biaya transaksi bagi pengguna. | Sidechain memerlukan asumsi kepercayaan yang lebih tinggi (misalnya, kuorum validator sidechain yang berbahaya dapat melakukan penipuan). |
| Sidechain yang kompatibel dengan EVM memungkinkan dapp untuk memperluas ekosistem mereka.                                   |                                                                                                                  |

### Gunakan Sidechain {#use-sidechains}

Beberapa proyek menyediakan implementasi sidechain yang dapat Anda integrasikan ke dalam dapp Anda:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (sebelumnya xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Bacaan lebih lanjut {#further-reading}

- [Scaling Ethereum dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 Feb 2018 - Georgios Konstantopoulos_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_