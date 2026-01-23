---
title: Keberagaman klien
description: Penjelasan tingkat tinggi tentang pentingnya keragaman klien Ethereum.
lang: id
sidebarDepth: 2
---

Perilaku node Ethereum dikendalikan oleh perangkat lunak klien yang dijalankannya. Ada beberapa klien Ethereum tingkat produksi, masing-masing dikembangkan dan dikelola dalam bahasa yang berbeda oleh tim yang berbeda. Klien dibangun dengan spesifikasi umum yang memastikan klien berkomunikasi satu sama lain dengan lancar dan memiliki fungsionalitas yang sama dan memberikan pengalaman pengguna yang setara. Namun, saat ini distribusi klien di seluruh node tidak cukup merata untuk mewujudkan benteng jaringan ini secara maksimal. Idealnya, pengguna membagi secara kasar sama rata di berbagai klien untuk menghadirkan keragaman klien sebanyak mungkin ke dalam jaringan.

## Persyaratan {#prerequisites}

Jika Anda belum memahami apa itu node dan klien, lihat [node dan klien](/developers/docs/nodes-and-clients/). Lapisan [eksekusi](/glossary/#execution-layer) dan [konsensus](/glossary/#consensus-layer) didefinisikan dalam glosarium.

## Mengapa ada banyak klien? {#why-multiple-clients}

Klien yang banyak dan dikembangkan serta dipelihara secara independen ada karena keragaman klien membuat jaringan lebih tahan terhadap serangan dan bug. Beberapa klien adalah kekuatan yang unik untuk Ethereum - blockchain lain bergantung pada kesempurnaan satu klien. Namun, tidak cukup hanya dengan memiliki beberapa klien yang tersedia, mereka harus diadopsi oleh komunitas dan total node aktif yang didistribusikan secara relatif merata di antara mereka.

## Mengapa keragaman klien penting? {#client-diversity-importance}

Memiliki banyak klien yang dikembangkan dan dipelihara secara mandiri sangat penting untuk kesehatan jaringan yang terdesentralisasi. Mari kita telusuri alasannya.

### Bug {#bugs}

Bug pada klien individu tidak terlalu berisiko terhadap jaringan jika mewakili minoritas node Ethereum. Dengan distribusi node yang merata di banyak klien, kemungkinan sebagian besar klien mengalami masalah yang sama menjadi kecil, dan sebagai hasilnya, jaringan menjadi lebih kuat.

### Ketahanan terhadap serangan {#resilience}

Keragaman klien juga menawarkan ketahanan terhadap serangan. Misalnya, serangan yang [mengelabui klien tertentu](https://twitter.com/vdWijden/status/1437712249926393858) ke cabang rantai tertentu kemungkinan besar tidak akan berhasil karena klien lain tidak mungkin dapat dieksploitasi dengan cara yang sama dan rantai kanoniknya tetap tidak terkorupsi. Keragaman klien yang rendah meningkatkan risiko yang terkait dengan peretasan pada klien yang dominan. Keragaman klien telah terbukti menjadi pertahanan yang penting terhadap serangan jahat pada jaringan, misalnya serangan denial-of-service Shanghai pada tahun 2016 dimungkinkan karena penyerang dapat mengelabui klien dominan (Geth) untuk mengeksekusi operasi i/o disk yang lambat puluhan ribu kali per blok. Karena klien alternatif juga online dan tidak memiliki kerentanan yang sama, Ethereum dapat menahan serangan tersebut dan terus beroperasi sementara kerentanan di Geth diperbaiki.

### Finalitas Proof-of-Stake {#finality}

Bug pada klien konsensus dengan lebih dari 33% node Ethereum dapat mencegah lapisan konsensus untuk diselesaikan, yang berarti pengguna tidak dapat mempercayai bahwa transaksi tidak akan dikembalikan atau diubah pada suatu saat. Hal ini akan sangat bermasalah bagi banyak aplikasi yang dibangun di atas Ethereum, terutama DeFi.

<Emoji text="🚨" className="me-4" /> Lebih buruk lagi, bug kritis pada klien dengan mayoritas dua pertiga dapat menyebabkan rantai <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">terpecah dan difinalisasi secara tidak benar</a>, yang menyebabkan sejumlah besar validator terjebak di rantai yang tidak valid. Jika mereka ingin bergabung kembali dengan rantai yang benar, para validator ini akan menghadapi pemotongan atau penarikan dan pengaktifan kembali secara sukarela yang lambat dan mahal. Besarnya skala pemotongan dengan jumlah node yang bersalah dengan mayoritas dua pertiga dipotong secara maksimal (32 ETH).

Meskipun ini adalah skenario yang tidak mungkin terjadi, ekosistem Ethereum dapat mengurangi risikonya dengan meratakan distribusi klien di seluruh node yang aktif. Idealnya, tidak ada klien konsensus yang mencapai 33% dari total node.

### Tanggung jawab bersama {#responsibility}

Ada juga biaya yang harus dikeluarkan untuk memiliki klien mayoritas. Hal ini memberikan tekanan dan tanggung jawab yang berlebihan pada tim pengembangan yang kecil. Semakin sedikit keragaman klien, semakin besar beban tanggung jawab bagi pengembang untuk mempertahankan klien mayoritas. Menyebarkan tanggung jawab ini ke beberapa tim akan baik untuk kesehatan jaringan node Ethereum dan jaringan orang-orangnya.

## Keragaman klien saat ini {#current-client-diversity}

### Klien Eksekusi {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Klien Konsensus {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Lainnya", value: 0.07 }
]}
/>

Diagram ini mungkin sudah usang — kunjungi [ethernodes.org](https://ethernodes.org) dan [clientdiversity.org](https://clientdiversity.org) untuk informasi terkini.

Dua diagram lingkaran di atas menunjukkan cuplikan keragaman klien saat ini untuk lapisan eksekusi dan konsensus (pada saat penulisan pada Oktober 2025). Keragaman klien telah meningkat selama bertahun-tahun, dan lapisan eksekusi telah melihat penurunan dominasi oleh [Geth](https://geth.ethereum.org/), dengan [Nethermind](https://www.nethermind.io/nethermind-client) di urutan kedua, [Besu](https://besu.hyperledger.org/) ketiga dan [Erigon](https://github.com/ledgerwatch/erigon) keempat, dengan klien lain yang terdiri kurang dari 3% dari jaringan. Klien yang paling umum digunakan di lapisan konsensus—[Lighthouse](https://lighthouse.sigmaprime.io/)—jumlahnya hampir menyamai klien terpopuler kedua. [Prysm](https://prysmaticlabs.com/#projects) dan [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) masing-masing menyumbang ~31% dan ~14%, dan klien lain jarang digunakan.

Data lapisan eksekusi diperoleh dari [supermajority.info](https://supermajority.info/) pada 26 Oktober 2025. Data untuk klien konsensus diperoleh dari [Michael Sproul](https://github.com/sigp/blockprint). Data klien konsensus lebih sulit diperoleh karena klien lapisan konsensus tidak selalu memiliki jejak yang jelas yang dapat digunakan untuk mengidentifikasi mereka. Data tersebut dihasilkan menggunakan algoritma klasifikasi yang terkadang membingungkan beberapa klien minoritas (lihat [di sini](https://twitter.com/sproulM_/status/1440512518242197516) untuk detail lebih lanjut). Pada diagram di atas, klasifikasi yang ambigu ini diperlakukan dengan label salah satu dari keduanya (misalnya Nimbus/Teku). Namun demikian, jelas bahwa sebagian besar jaringan menjalankan Prysm. Meskipun hanya berupa cuplikan, nilai-nilai dalam diagram tersebut memberikan gambaran umum yang baik tentang kondisi keragaman klien saat ini.

Data keragaman klien terkini untuk lapisan konsensus sekarang tersedia di [clientdiversity.org](https://clientdiversity.org/).

## Lapisan eksekusi {#execution-layer}

Hingga saat ini, pembicaraan seputar keragaman klien hanya berfokus pada lapisan konsensus. Namun, klien eksekusi [Geth](https://geth.ethereum.org) saat ini menyumbang sekitar 85% dari semua node. Persentase ini bermasalah karena alasan yang sama dengan klien konsensus. Sebagai contoh, sebuah bug di Geth yang mempengaruhi penanganan transaksi atau membangun muatan eksekusi dapat menyebabkan klien konsensus menyelesaikan transaksi yang bermasalah atau disadap. Oleh karena itu, Ethereum akan lebih sehat dengan distribusi klien eksekusi yang lebih merata, idealnya tidak ada klien yang mewakili lebih dari 33% jaringan.

## Gunakan klien minoritas {#use-minority-client}

Mengatasi keragaman klien membutuhkan lebih dari sekadar pengguna individu untuk memilih klien minoritas - ini membutuhkan kumpulan validator dan institusi seperti dapps dan bursa utama untuk mengganti klien juga. Namun, semua pengguna dapat melakukan bagian mereka dalam memperbaiki ketidakseimbangan saat ini dan menormalkan penggunaan semua perangkat lunak Ethereum yang tersedia. Setelah Penggabungan, semua operator node akan diminta untuk menjalankan klien eksekusi dan klien konsensus. Memilih kombinasi klien yang disarankan di bawah ini akan membantu meningkatkan keragaman klien.

### Klien eksekusi {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Klien konsensus {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Pengguna teknis dapat membantu mempercepat proses ini dengan menulis lebih banyak tutorial dan dokumentasi untuk klien minoritas dan mendorong rekan-rekan mereka yang mengoperasikan node untuk bermigrasi dari klien yang dominan. Panduan untuk beralih ke klien konsensus minoritas tersedia di [clientdiversity.org](https://clientdiversity.org/).

## Dasbor keragaman klien {#client-diversity-dashboards}

Beberapa dasbor memberikan statistik keragaman klien secara real-time untuk lapisan eksekusi dan konsensus.

**Lapisan konsensus:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Lapisan eksekusi:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Bacaan lebih lanjut {#further-reading}

- [Keragaman klien di lapisan konsensus Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Merge Ethereum: Jalankan klien mayoritas dengan risiko Anda sendiri!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 Maret 2022_
- [Pentingnya keragaman klien](https://our.status.im/the-importance-of-client-diversity/)
- [Daftar layanan simpul Ethereum](https://ethereumnodes.com/)
- ["Lima Mengapa" dari masalah keragaman klien](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Keragaman Ethereum dan Cara Mengatasinya (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Topik terkait {#related-topics}

- [Jalankan node Ethereum](/run-a-node/)
- [Simpul dan klien](/developers/docs/nodes-and-clients/)
