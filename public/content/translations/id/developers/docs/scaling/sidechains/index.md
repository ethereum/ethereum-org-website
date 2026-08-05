---
title: Rantai Samping
description: Pengantar tentang rantai samping sebagai solusi penskalaan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
sidebarDepth: 3
---

Rantai samping adalah rantai blok terpisah yang berjalan secara independen dari [Ethereum](/) dan terhubung ke Mainnet Ethereum oleh jembatan dua arah. Rantai samping dapat memiliki parameter blok dan [algoritma konsensus](/developers/docs/consensus-mechanisms/) yang terpisah, yang sering kali dirancang untuk pemrosesan transaksi yang efisien. Namun, menggunakan rantai samping melibatkan kompromi, karena mereka tidak mewarisi properti keamanan Ethereum. Tidak seperti [solusi penskalaan lapisan 2 (l2)](/layer-2/), rantai samping tidak memposting perubahan state dan data transaksi kembali ke Mainnet Ethereum.

Rantai samping juga mengorbankan beberapa tingkat desentralisasi atau keamanan untuk mencapai laju pemrosesan yang tinggi ([trilema skalabilitas](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Namun, Ethereum berkomitmen untuk melakukan penskalaan tanpa mengorbankan desentralisasi dan keamanan.

## Bagaimana cara kerja rantai samping? {#how-do-sidechains-work}

Rantai samping adalah rantai blok independen, dengan riwayat, peta jalan pengembangan, dan pertimbangan desain yang berbeda. Meskipun rantai samping mungkin memiliki beberapa kesamaan di tingkat permukaan dengan Ethereum, ia memiliki beberapa fitur yang khas.

### Algoritma konsensus {#consensus-algorithms}

Salah satu kualitas yang membuat rantai samping unik (yaitu, berbeda dari Ethereum) adalah algoritma konsensus yang digunakan. Rantai samping tidak bergantung pada Ethereum untuk konsensus dan dapat memilih protokol konsensus alternatif yang sesuai dengan kebutuhan mereka. Beberapa contoh algoritma konsensus yang digunakan pada rantai samping meliputi:

- [Bukti otoritas (PoA)](/developers/docs/consensus-mechanisms/poa/)
- [Bukti Kepemilikan (PoS) yang didelegasikan](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Toleransi kesalahan Byzantine](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Seperti Ethereum, rantai samping memiliki node validasi yang memverifikasi dan memproses transaksi, menghasilkan blok, dan menyimpan state rantai blok. Validator juga bertanggung jawab untuk mempertahankan konsensus di seluruh jaringan dan mengamankannya dari serangan berbahaya.

#### Parameter blok {#block-parameters}

Ethereum menempatkan batasan pada [waktu blok](/developers/docs/blocks/#block-time) (yaitu, waktu yang dibutuhkan untuk menghasilkan blok baru) dan [ukuran blok](/developers/docs/blocks/#block-size) (yaitu, jumlah data yang terkandung per blok yang didenominasi dalam gas). Sebaliknya, rantai samping sering kali mengadopsi parameter yang berbeda, seperti waktu blok yang lebih cepat dan batas gas yang lebih tinggi, untuk mencapai laju pemrosesan yang tinggi, transaksi yang cepat, dan biaya yang rendah.

Meskipun ini memiliki beberapa manfaat, hal ini memiliki implikasi kritis terhadap desentralisasi dan keamanan jaringan. Parameter blok, seperti waktu blok yang cepat dan ukuran blok yang besar, meningkatkan kesulitan dalam menjalankan full node—menyisakan beberapa "supernode" yang bertanggung jawab untuk mengamankan rantai. Dalam skenario seperti itu, kemungkinan kolusi validator atau pengambilalihan rantai yang berbahaya akan meningkat.

Agar rantai blok dapat berskala tanpa merusak desentralisasi, menjalankan node harus terbuka untuk semua orang—tidak harus pihak dengan perangkat keras khusus. Inilah sebabnya mengapa upaya sedang dilakukan untuk memastikan semua orang dapat [menjalankan full node](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) di jaringan Ethereum.

### Kompatibilitas EVM {#evm-compatibility}

Beberapa rantai samping kompatibel dengan EVM dan mampu mengeksekusi kontrak yang dikembangkan untuk [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/). Rantai samping yang kompatibel dengan EVM mendukung kontrak pintar [yang ditulis dalam Solidity](/developers/docs/smart-contracts/languages/), serta bahasa kontrak pintar EVM lainnya, yang berarti kontrak pintar yang ditulis untuk Mainnet Ethereum juga akan berfungsi pada rantai samping yang kompatibel dengan EVM.

Ini berarti jika Anda ingin menggunakan [aplikasi terdesentralisasi (dapp)](/developers/docs/dapps/) Anda di rantai samping, Anda hanya perlu menerapkan [kontrak pintar](/developers/docs/smart-contracts/) Anda ke rantai samping ini. Ini terlihat, terasa, dan bertindak persis seperti Mainnet—Anda menulis kontrak dalam Solidity, dan berinteraksi dengan rantai melalui RPC rantai samping.

Karena rantai samping kompatibel dengan EVM, mereka dianggap sebagai [solusi penskalaan](/developers/docs/scaling/) yang berguna untuk dapp asli Ethereum. Dengan dapp Anda di rantai samping, pengguna dapat menikmati biaya gas yang lebih rendah dan transaksi yang lebih cepat, terutama jika Mainnet sedang padat.

Namun, seperti yang dijelaskan sebelumnya, menggunakan rantai samping melibatkan kompromi yang signifikan. Setiap rantai samping bertanggung jawab atas keamanannya dan tidak mewarisi properti keamanan Ethereum. Hal ini meningkatkan kemungkinan perilaku berbahaya yang dapat memengaruhi pengguna Anda atau membahayakan dana mereka.

### Pergerakan aset {#asset-movement}

Agar rantai blok terpisah menjadi rantai samping ke Mainnet Ethereum, ia memerlukan kemampuan untuk memfasilitasi transfer aset dari dan ke Mainnet Ethereum. Interoperabilitas dengan Ethereum ini dicapai menggunakan jembatan rantai blok. [Jembatan](/bridges/) menggunakan kontrak pintar yang diterapkan di Mainnet Ethereum dan rantai samping untuk mengontrol penjembatanan dana di antara keduanya.

Meskipun jembatan membantu pengguna memindahkan dana antara Ethereum dan rantai samping, aset tersebut tidak dipindahkan secara fisik melintasi kedua rantai. Sebaliknya, mekanisme yang biasanya melibatkan pencetakan dan pembakaran digunakan untuk mentransfer nilai lintas rantai. Selengkapnya tentang [cara kerja jembatan](/developers/docs/bridges/#how-do-bridges-work).

## Kelebihan dan kekurangan rantai samping {#pros-and-cons-of-sidechains}

| Kelebihan                                                                                                                   | Kekurangan                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Teknologi yang mendasari rantai samping sudah mapan dan mendapat manfaat dari penelitian ekstensif serta peningkatan desain. | Rantai samping mengorbankan beberapa tingkat desentralisasi dan sifat tanpa kepercayaan demi skalabilitas.                          |
| Rantai samping mendukung komputasi umum dan menawarkan kompatibilitas EVM (mereka dapat menjalankan dapp asli Ethereum).                    | Rantai samping menggunakan mekanisme konsensus terpisah dan tidak mendapat manfaat dari jaminan keamanan Ethereum.         |
| Rantai samping menggunakan model konsensus yang berbeda untuk memproses transaksi secara efisien dan menurunkan biaya transaksi bagi pengguna.         | Rantai samping mewajibkan asumsi kepercayaan yang lebih tinggi (misalnya, kuorum validator rantai samping yang berbahaya dapat melakukan penipuan). |
| Rantai samping yang kompatibel dengan EVM memungkinkan dapp untuk memperluas ekosistem mereka.                                                            |                                                                                                                  |

### Gunakan Rantai Samping {#use-sidechains}

Beberapa proyek menyediakan implementasi rantai samping yang dapat Anda integrasikan ke dalam dapp Anda:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (sebelumnya xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Bacaan lebih lanjut {#further-reading}

- [Menskalakan dapp Ethereum melalui Rantai Samping](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 Feb 2018 - Georgios Konstantopoulos_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_