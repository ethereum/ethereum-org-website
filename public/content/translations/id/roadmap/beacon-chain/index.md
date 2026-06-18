---
title: Rantai Suar
description: Pelajari tentang Rantai Suar - peningkatan yang memperkenalkan Ethereum Bukti Kepemilikan (PoS).
lang: id
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - "Rantai Suar memperkenalkan Bukti Kepemilikan (PoS) ke ekosistem Ethereum."
  - "Rantai ini digabungkan dengan rantai Bukti Kerja (PoW) Ethereum yang asli pada bulan September 2022."
  - "Rantai Suar memperkenalkan logika konsensus dan protokol gosip blok yang sekarang mengamankan Ethereum."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Rantai Suar diluncurkan pada tanggal 1 Desember 2020, dan meresmikan Bukti Kepemilikan (PoS) sebagai mekanisme konsensus Ethereum dengan peningkatan The Merge pada tanggal 15 September 2022.
</UpgradeStatus>

## Apa itu Rantai Suar? {#what-is-the-beacon-chain}

Rantai Suar adalah nama dari rantai blok Bukti Kepemilikan (PoS) asli yang diluncurkan pada tahun 2020. Rantai ini dibuat untuk memastikan logika konsensus Bukti Kepemilikan (PoS) kuat dan berkelanjutan sebelum mengaktifkannya di Mainnet [Ethereum](/). Oleh karena itu, rantai ini berjalan berdampingan dengan Ethereum Bukti Kerja (PoW) yang asli. Rantai Suar adalah rantai blok 'kosong', tetapi mematikan Bukti Kerja (PoW) dan menyalakan Bukti Kepemilikan (PoS) di Ethereum memerlukan instruksi kepada Rantai Suar untuk menerima data transaksi dari klien eksekusi, menggabungkannya ke dalam blok, dan kemudian mengaturnya ke dalam rantai blok menggunakan mekanisme konsensus berbasis Bukti Kepemilikan (PoS). Pada saat yang sama, klien Ethereum asli mematikan penambangan, propagasi blok, dan logika konsensus mereka, menyerahkan semuanya ke Rantai Suar. Peristiwa ini dikenal sebagai [The Merge](/roadmap/merge/). Setelah The Merge terjadi, tidak ada lagi dua rantai blok. Sebaliknya, hanya ada satu Ethereum Bukti Kepemilikan (PoS), yang sekarang membutuhkan dua klien berbeda per node. Rantai Suar sekarang menjadi lapisan konsensus, jaringan peer-to-peer dari klien konsensus yang menangani gosip blok dan logika konsensus, sementara klien asli membentuk lapisan eksekusi, yang bertanggung jawab untuk menggosipkan dan mengeksekusi transaksi, serta mengelola state Ethereum. Kedua lapisan tersebut dapat berkomunikasi satu sama lain menggunakan Engine API.

## Apa yang dilakukan Rantai Suar? {#what-does-the-beacon-chain-do}

Rantai Suar adalah nama yang diberikan pada buku besar akun yang melakukan dan mengoordinasikan jaringan [staker](/staking/) Ethereum sebelum para staker tersebut mulai memvalidasi blok Ethereum yang sebenarnya. Namun, rantai ini tidak memproses transaksi atau menangani interaksi kontrak pintar karena hal tersebut dilakukan di lapisan eksekusi.
Rantai Suar bertanggung jawab atas hal-hal seperti penanganan blok dan atestasi, menjalankan algoritme pilihan cabang, serta mengelola imbalan dan penalti.
Baca lebih lanjut di [halaman arsitektur node](/developers/docs/nodes-and-clients/node-architecture/#node-comparison) kami.

## Dampak Rantai Suar {#beacon-chain-features}

### Memperkenalkan staking {#introducing-staking}

Rantai Suar memperkenalkan [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/) ke Ethereum. Hal ini menjaga Ethereum tetap aman dan menghasilkan lebih banyak ETH bagi validator dalam prosesnya. Dalam praktiknya, staking melibatkan staking ETH untuk mengaktifkan perangkat lunak validator. Sebagai staker, Anda menjalankan perangkat lunak yang membuat dan memvalidasi blok baru di rantai.

Staking memiliki tujuan yang sama dengan yang sebelumnya dilakukan oleh [penambangan](/developers/docs/consensus-mechanisms/pow/mining/), tetapi berbeda dalam banyak hal. Penambangan membutuhkan pengeluaran awal yang besar dalam bentuk perangkat keras yang kuat dan konsumsi energi, yang menghasilkan skala ekonomi, dan mendorong sentralisasi. Penambangan juga tidak disertai dengan persyaratan untuk mengunci aset sebagai kolateral, sehingga membatasi kemampuan protokol untuk menghukum pelaku kejahatan setelah terjadinya serangan.

Transisi ke Bukti Kepemilikan (PoS) membuat Ethereum jauh lebih aman dan terdesentralisasi dibandingkan dengan Bukti Kerja (PoW). Semakin banyak orang yang berpartisipasi dalam jaringan, semakin terdesentralisasi dan aman dari serangan jaringan tersebut.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Jika Anda tertarik untuk menjadi validator dan membantu mengamankan Ethereum, [pelajari lebih lanjut tentang staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Persiapan untuk sharding {#setting-up-for-sharding}

Sejak Rantai Suar digabungkan dengan Mainnet Ethereum yang asli, komunitas Ethereum mulai mencari cara untuk menskalakan jaringan.

Bukti Kepemilikan (PoS) memiliki keuntungan berupa adanya registri dari semua produsen blok yang disetujui pada waktu tertentu, masing-masing dengan ETH yang di-stake. Registri ini menyiapkan landasan untuk kemampuan membagi dan menaklukkan, serta membagi tanggung jawab jaringan tertentu secara andal.

Tanggung jawab ini berbanding terbalik dengan Bukti Kerja (PoW), di mana penambang tidak memiliki kewajiban terhadap jaringan dan dapat berhenti menambang serta mematikan perangkat lunak node mereka secara permanen dalam sekejap tanpa dampak apa pun. Selain itu, tidak ada registri pengusul blok yang diketahui dan tidak ada cara yang andal untuk membagi tanggung jawab jaringan dengan aman.

[Lebih lanjut tentang sharding](/roadmap/danksharding/)

## Hubungan antar peningkatan {#relationship-between-upgrades}

Peningkatan Ethereum semuanya saling berkaitan. Jadi mari kita rekap bagaimana Rantai Suar memengaruhi peningkatan lainnya.

### Rantai Suar dan The Merge {#merge-and-beacon-chain}

Pada awalnya, Rantai Suar ada secara terpisah dari Mainnet Ethereum, tetapi keduanya digabungkan pada tahun 2022.

<ButtonLink href="/roadmap/merge/">
  The Merge
</ButtonLink>

### Shard dan Rantai Suar {#shards-and-beacon-chain}

Sharding hanya dapat memasuki ekosistem Ethereum dengan aman jika mekanisme konsensus Bukti Kepemilikan (PoS) telah diterapkan. Rantai Suar memperkenalkan staking, yang 'digabungkan' dengan Mainnet, membuka jalan bagi sharding untuk membantu menskalakan Ethereum lebih lanjut.

<ButtonLink href="/roadmap/danksharding/">
  Rantai shard
</ButtonLink>

## Bacaan lebih lanjut {#further-reading}

- [Lebih lanjut tentang arsitektur node](/developers/docs/nodes-and-clients/node-architecture)
- [Lebih lanjut tentang Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos)