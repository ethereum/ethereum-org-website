---
title: Sidechain
description: Pengantar sidechain sebagai solusi penskalaan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
sidebarDepth: 3
---

Sebuah sidechain adalah blockchain terpisah yang berjalan secara independen dari Ethereum dan terhubung ke Ethereum Mainnet melalui jembatan dua arah two-way bridge. Sidechain dapat memiliki parameter blok dan [algoritma konsensus](/developers/docs/consensus-mechanisms/) yang terpisah, yang sering kali dirancang untuk memproses transaksi secara efisien. Akan tetapi, menggunakan sidechain melibatkan trade-off, karena mereka tidak mewarisi sifat keamanan Ethereum. Tidak seperti [solusi penskalaan layer 2](/layer-2/), sidechain tidak mengirimkan perubahan status dan data transaksi kembali ke Mainnet Ethereum.

Sidechain juga mengorbankan sebagian desentralisasi atau keamanan untuk mencapai throughput yang tinggi ([trilema skalabilitas](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Akan tetapi, Ethereum berkomitmen untuk melakukan penskalaan tanpa mengorbankan desentralisasi dan keamanan.

## Bagaimana cara kerja sidechain? {#how-do-sidechains-work}

Sidechain adalah blockchain independen, dengan sejarah, roadmap pengembangan, dan pertimbangan desain yang berbeda. Meskipun sebuah sidechain mungkin memiliki beberapa kesamaan permukaan dengan Ethereum, ia memiliki beberapa fitur yang membedakannya secara signifikan.

### Algoritma konsensus {#consensus-algorithms}

Salah satu kualitas yang membuat sidechain unik (berbeda dengan Ethereum) adalah algoritma konsensus yang digunakan. Sidechains tidak bergantung pada Ethereum untuk mencapai konsensus dan dapat memilih protokol konsensus alternatif yang sesuai dengan kebutuhan mereka. Beberapa contoh algoritma konsensus yang digunakan pada sidechain antara lain:

- [Bukti Otoritas](/developers/docs/consensus-mechanisms/poa/)
- [Bukti Taruhan yang Didelegasikan](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Toleransi kesalahan Byzantine](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Seperti Ethereum, sidechain memiliki node validator yang memverifikasi dan memproses transaksi, menghasilkan blok, serta menyimpan status blockchain. Validator juga bertanggung jawab untuk menjaga konsensus di seluruh jaringan dan mengamankannya dari serangan jahat.

#### Parameter blok {#block-parameters}

Ethereum menetapkan batasan pada [waktu blok](/developers/docs/blocks/#block-time) (yaitu, waktu yang dibutuhkan untuk menghasilkan blok baru) dan [ukuran blok](/developers/docs/blocks/#block-size) (yaitu, jumlah data yang terkandung per blok yang dinyatakan dalam gas). Sebaliknya, sidechain sering mengadopsi parameter yang berbeda, seperti waktu blok lebih cepat dan batas gas lebih tinggi, untuk mencapai throughput tinggi, transaksi cepat, dan biaya rendah.

Meskipun hal ini memiliki beberapa manfaat, namun memiliki implikasi yang sangat penting untuk desentralisasi dan keamanan jaringan. Parameter blok, seperti waktu blok yang cepat dan ukuran blok yang besar, meningkatkan kesulitan menjalankan full node—menjadikan hanya beberapa "supernode" yang bertanggung jawab untuk mengamankan chain. Dalam skenario seperti itu, kemungkinan kolusi validator atau pengambilalihan rantai yang jahat akan meningkat.

Agar blockchain dapat diskalakan tanpa mengorbankan desentralisasi, menjalankan node harus terbuka untuk semua orang—tidak hanya pihak yang memiliki perangkat keras khusus. Inilah sebabnya upaya sedang dilakukan untuk memastikan semua orang dapat [menjalankan node penuh](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) di jaringan Ethereum.

### Kompatibilitas EVM {#evm-compatibility}

Beberapa sidechain kompatibel dengan EVM dan mampu mengeksekusi kontrak yang dikembangkan untuk [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/). Sidechain yang kompatibel dengan EVM mendukung kontrak pintar [yang ditulis dalam Solidity](/developers/docs/smart-contracts/languages/), serta bahasa kontrak pintar EVM lainnya, yang berarti kontrak pintar yang ditulis untuk Mainnet Ethereum juga akan berfungsi pada sidechain yang kompatibel dengan EVM.

Ini berarti jika Anda ingin menggunakan [dapp](/developers/docs/dapps/) Anda di sidechain, Anda hanya perlu men-deploy [kontrak pintar](/developers/docs/smart-contracts/) Anda ke sidechain ini. Sidechain ini terlihat, terasa, dan berfungsi seperti Mainnet—Anda menulis kontrak dalam Solidity, dan berinteraksi dengan chain melalui RPC sidechain tersebut.

Karena sidechain kompatibel dengan EVM, mereka dianggap sebagai [solusi penskalaan](/developers/docs/scaling/) yang berguna untuk dapp asli Ethereum. Dengan dapp Anda di sidechain, pengguna dapat menikmati biaya gas yang lebih rendah dan transaksi yang lebih cepat, terutama jika Mainnet sedang padat.

Akan tetapi, seperti yang telah dijelaskan sebelumnya, menggunakan sidechain melibatkan pertukaran yang signifikan. Setiap sidechain bertanggung jawab atas keamanannya dan tidak mewarisi properti keamanan Ethereum. Hal ini meningkatkan kemungkinan terjadinya perilaku jahat yang dapat memengaruhi pengguna Anda atau menempatkan dana mereka dalam risiko.

### Pergerakan aset {#asset-movement}

Agar sebuah blockchain terpisah bisa menjadi sidechain untuk Ethereum Mainnet, blockchain tersebut harus memiliki kemampuan untuk memfasilitasi transfer aset dari dan ke Ethereum Mainnet. Interoperabilitas dengan Ethereum ini dicapai dengan menggunakan jembatan blockchain. [Jembatan](/bridges/) menggunakan kontrak pintar yang di-deploy di Mainnet Ethereum dan sidechain untuk mengontrol penjembatanan dana di antara keduanya.

Meskipun bridges membantu pengguna memindahkan dana antara Ethereum dan sidechain, aset tersebut tidak benar-benar dipindahkan secara fisik di antara kedua chain. Sebaliknya, mekanisme yang biasanya melibatkan proses minting dan burning digunakan untuk mentransfer nilai antar chain. Selengkapnya tentang [cara kerja jembatan](/developers/docs/bridges/#how-do-bridges-work).

## Kelebihan dan kekurangan sidechain {#pros-and-cons-of-sidechains}

| Kelebihan                                                                                                                                                  | Kekurangan                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Teknologi yang mendasari sidechain sudah mapan dan mendapat manfaat dari penelitian luas serta perbaikan dalam desainnya.                  | Sidechain menukar sebagian tingkat desentralisasi dan sifat “trustless” untuk mendapatkan skalabilitas.                                                                        |
| Sidechain mendukung komputasi umum dan menawarkan kompatibilitas EVM (mereka dapat menjalankan dapp asli Ethereum).     | Sebuah sidechain menggunakan mekanisme konsensus yang terpisah dan tidak mendapatkan jaminan keamanan dari Ethereum.                                                           |
| Sidechains menggunakan model konsensus yang berbeda untuk memproses transaksi secara efisien dan menurunkan biaya transaksi bagi pengguna. | Sidechains membutuhkan asumsi kepercayaan yang lebih tinggi (misalnya, jika mayoritas validator sidechain bersikap jahat, mereka dapat melakukan penipuan). |
| Sidechain yang kompatibel dengan EVM memungkinkan dapps untuk memperluas ekosistem mereka.                                                 |                                                                                                                                                                                                |

### Gunakan Sidechain {#use-sidechains}

Beberapa proyek menyediakan implementasi sidechain yang dapat Anda integrasikan ke dalam dapp Anda:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (sebelumnya xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Bacaan lebih lanjut {#further-reading}

- [Penskalaan dapps Ethereum melalui Sidechain](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 Feb 2018 - Georgios Konstantopoulos_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
