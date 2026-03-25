---
title: Keragaman klien
description: Penjelasan tingkat tinggi tentang pentingnya keragaman klien Ethereum.
lang: id
sidebarDepth: 2
---

Perilaku sebuah node [Ethereum](/) dikendalikan oleh perangkat lunak klien yang dijalankannya. Ada beberapa klien Ethereum tingkat produksi, masing-masing dikembangkan dan dipelihara dalam bahasa yang berbeda oleh tim yang terpisah. Klien-klien ini dibangun berdasarkan spesifikasi umum yang memastikan klien dapat berkomunikasi satu sama lain dengan lancar, memiliki fungsionalitas yang sama, dan memberikan pengalaman pengguna yang setara. Namun, saat ini distribusi klien di seluruh node belum cukup merata untuk mewujudkan potensi penuh dari penguatan jaringan ini. Idealnya, pengguna terbagi secara merata di berbagai klien untuk membawa keragaman klien sebanyak mungkin ke dalam jaringan.

## Prasyarat {#prerequisites}

Jika Anda belum memahami apa itu node dan klien, lihat [node dan klien](/developers/docs/nodes-and-clients/). Lapisan [eksekusi](/glossary/#execution-layer) dan [konsensus](/glossary/#consensus-layer) didefinisikan dalam glosarium.

## Mengapa ada banyak klien? {#why-multiple-clients}

Banyak klien yang dikembangkan dan dipelihara secara independen ada karena keragaman klien membuat jaringan lebih tangguh terhadap serangan dan bug. Banyaknya klien adalah kekuatan unik bagi Ethereum - blockchain lain bergantung pada ketidakbersalahan satu klien tunggal. Namun, tidak cukup hanya dengan menyediakan banyak klien, klien-klien tersebut harus diadopsi oleh komunitas dan total node aktif didistribusikan secara relatif merata di antara mereka.

## Mengapa keragaman klien penting? {#client-diversity-importance}

Memiliki banyak klien yang dikembangkan dan dipelihara secara independen sangat penting untuk kesehatan jaringan yang terdesentralisasi. Mari kita jelajahi alasannya.

### Bug {#bugs}

Sebuah bug pada klien individu memiliki risiko yang lebih kecil terhadap jaringan ketika mewakili minoritas node Ethereum. Dengan distribusi node yang kira-kira merata di banyak klien, kemungkinan sebagian besar klien mengalami masalah yang sama adalah kecil, dan sebagai hasilnya, jaringan menjadi lebih kuat.

### Ketahanan terhadap serangan {#resilience}

Keragaman klien juga menawarkan ketahanan terhadap serangan. Misalnya, serangan yang [menipu klien tertentu](https://twitter.com/vdWijden/status/1437712249926393858) ke cabang rantai tertentu tidak mungkin berhasil karena klien lain tidak mungkin dieksploitasi dengan cara yang sama dan rantai kanonikal tetap tidak rusak. Keragaman klien yang rendah meningkatkan risiko yang terkait dengan peretasan pada klien dominan. Keragaman klien telah terbukti menjadi pertahanan penting terhadap serangan berbahaya di jaringan, misalnya serangan penolakan layanan (denial-of-service) Shanghai pada tahun 2016 dimungkinkan karena penyerang mampu menipu klien dominan (Geth) untuk mengeksekusi operasi i/o disk yang lambat puluhan ribu kali per blok. Karena klien alternatif juga online yang tidak memiliki kerentanan yang sama, Ethereum mampu menahan serangan dan terus beroperasi sementara kerentanan di Geth diperbaiki.

### Finalitas proof-of-stake {#finality}

Sebuah bug pada klien konsensus dengan lebih dari 33% node Ethereum dapat mencegah lapisan konsensus mencapai finalitas, yang berarti pengguna tidak dapat mempercayai bahwa transaksi tidak akan dikembalikan atau diubah pada suatu saat. Hal ini akan sangat bermasalah bagi banyak aplikasi yang dibangun di atas Ethereum, khususnya DeFi.

<Emoji text="🚨" className="me-4" /> Lebih buruk lagi, bug kritis pada klien dengan mayoritas dua pertiga dapat menyebabkan rantai <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">terpecah dan mencapai finalitas secara tidak benar</a>, yang menyebabkan sekumpulan besar validator terjebak pada rantai yang tidak valid. Jika mereka ingin bergabung kembali dengan rantai yang benar, validator ini menghadapi pemotongan atau penarikan sukarela dan pengaktifan kembali yang lambat dan mahal. Besarnya pemotongan berskala dengan jumlah node yang bersalah dengan mayoritas dua pertiga dipotong secara maksimal (32 ETH).

Meskipun ini adalah skenario yang tidak mungkin terjadi, ekosistem Ethereum dapat memitigasi risikonya dengan meratakan distribusi klien di seluruh node aktif. Idealnya, tidak ada klien konsensus yang akan mencapai pangsa 33% dari total node.

### Tanggung jawab bersama {#responsibility}

Ada juga biaya manusia untuk memiliki klien mayoritas. Hal ini memberikan tekanan dan tanggung jawab yang berlebihan pada tim pengembangan yang kecil. Semakin sedikit keragaman klien, semakin besar beban tanggung jawab bagi para pengembang yang memelihara klien mayoritas. Menyebarkan tanggung jawab ini ke beberapa tim baik untuk kesehatan jaringan node Ethereum maupun jaringan manusianya.

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
{ name: "Other", value: 0.07 }
]}
/>

Diagram ini mungkin sudah usang — kunjungi [ethernodes.org](https://ethernodes.org) dan [clientdiversity.org](https://clientdiversity.org) untuk informasi terkini.

Dua diagram lingkaran di atas menunjukkan cuplikan keragaman klien saat ini untuk lapisan eksekusi dan konsensus (pada saat penulisan di bulan Oktober 2025). Keragaman klien telah meningkat selama bertahun-tahun, dan lapisan eksekusi telah melihat penurunan dominasi oleh [Geth](https://geth.ethereum.org/), dengan [Nethermind](https://www.nethermind.io/nethermind-client) di posisi kedua yang berdekatan, [Besu](https://besu.hyperledger.org/) ketiga dan [Erigon](https://github.com/ledgerwatch/erigon) keempat, dengan klien lain yang mencakup kurang dari 3% dari jaringan. Klien yang paling umum digunakan pada lapisan konsensus—[Lighthouse](https://lighthouse.sigmaprime.io/)—cukup dekat dengan yang paling banyak digunakan kedua. [Prysm](https://prysmaticlabs.com/#projects) dan [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) masing-masing mencapai ~31% dan ~14%, dan klien lain jarang digunakan.

Data lapisan eksekusi diperoleh dari [supermajority.info](https://supermajority.info/) pada 26-Okt-2025. Data untuk klien konsensus diperoleh dari [Michael Sproul](https://github.com/sigp/blockprint). Data klien konsensus lebih sulit diperoleh karena klien lapisan konsensus tidak selalu memiliki jejak yang tidak ambigu yang dapat digunakan untuk mengidentifikasi mereka. Data tersebut dihasilkan menggunakan algoritma klasifikasi yang terkadang membingungkan beberapa klien minoritas (lihat [di sini](https://twitter.com/sproulM_/status/1440512518242197516) untuk detail lebih lanjut). Pada diagram di atas, klasifikasi yang ambigu ini diperlakukan dengan label salah satu/atau (misalnya Nimbus/Teku). Namun demikian, jelas bahwa mayoritas jaringan menjalankan Prysm. Meskipun hanya berupa cuplikan, nilai-nilai dalam diagram memberikan gambaran umum yang baik tentang keadaan keragaman klien saat ini.

Data keragaman klien terkini untuk lapisan konsensus sekarang tersedia di [clientdiversity.org](https://clientdiversity.org/).

## Lapisan eksekusi {#execution-layer}

Hingga saat ini, percakapan seputar keragaman klien terutama difokuskan pada lapisan konsensus. Namun, klien eksekusi [Geth](https://geth.ethereum.org) saat ini menyumbang sekitar 85% dari semua node. Persentase ini bermasalah karena alasan yang sama seperti pada klien konsensus. Misalnya, bug di Geth yang memengaruhi penanganan transaksi atau membangun muatan eksekusi dapat menyebabkan klien konsensus mencapai finalitas pada transaksi yang bermasalah atau memiliki bug. Oleh karena itu, Ethereum akan lebih sehat dengan distribusi klien eksekusi yang lebih merata, idealnya tanpa ada klien yang mewakili lebih dari 33% jaringan.

## Gunakan klien minoritas {#use-minority-client}

Mengatasi keragaman klien membutuhkan lebih dari sekadar pengguna individu untuk memilih klien minoritas - ini juga membutuhkan kolam validator dan institusi seperti dapps utama dan bursa untuk beralih klien. Namun, semua pengguna dapat melakukan bagian mereka dalam memperbaiki ketidakseimbangan saat ini dan menormalkan penggunaan semua perangkat lunak Ethereum yang tersedia. Setelah The Merge, semua operator node akan diwajibkan untuk menjalankan klien eksekusi dan klien konsensus. Memilih kombinasi klien yang disarankan di bawah ini akan membantu meningkatkan keragaman klien.

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

Pengguna teknis dapat membantu mempercepat proses ini dengan menulis lebih banyak tutorial dan dokumentasi untuk klien minoritas dan mendorong rekan-rekan operator node mereka untuk bermigrasi dari klien dominan. Panduan untuk beralih ke klien konsensus minoritas tersedia di [clientdiversity.org](https://clientdiversity.org/).

## Dasbor keragaman klien {#client-diversity-dashboards}

Beberapa dasbor memberikan statistik keragaman klien secara real-time untuk lapisan eksekusi dan konsensus.

**Lapisan konsensus:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Lapisan eksekusi:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Bacaan lebih lanjut {#further-reading}

- [Keragaman klien pada lapisan konsensus Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum Merge: Jalankan klien mayoritas dengan risiko Anda sendiri!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 Maret 2022_
- [Pentingnya keragaman klien](https://our.status.im/the-importance-of-client-diversity/)
- [Daftar layanan node Ethereum](https://ethereumnodes.com/)
- ["Lima Mengapa" dari masalah keragaman klien](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Keragaman Ethereum dan Cara Menyelesaikannya (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Topik terkait {#related-topics}

- [Menjalankan node Ethereum](/run-a-node/)
- [Node dan klien](/developers/docs/nodes-and-clients/)