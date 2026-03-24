---
title: Beacon Chain
description: Pelajari tentang Beacon Chain - peningkatan yang memperkenalkan Ethereum proof-of-stake.
lang: id
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoint1: Beacon Chain memperkenalkan proof-of-stake ke ekosistem Ethereum.
summaryPoint2: Ini digabungkan dengan rantai proof-of-work Ethereum asli pada bulan September 2022.
summaryPoint3: Beacon Chain memperkenalkan logika konsensus dan protokol gossip blok yang sekarang mengamankan Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Beacon Chain diluncurkan pada 1 Desember 2020, dan meresmikan proof-of-stake sebagai mekanisme konsensus Ethereum dengan peningkatan The Merge pada 15 September 2022.
</UpgradeStatus>

## Apa itu Beacon Chain? {#what-is-the-beacon-chain}

Beacon Chain adalah nama dari blockchain proof-of-stake asli yang diluncurkan pada tahun 2020. Ini dibuat untuk memastikan logika konsensus proof-of-stake kuat dan berkelanjutan sebelum mengaktifkannya di mainnet [Ethereum](/). Oleh karena itu, ia berjalan berdampingan dengan Ethereum proof-of-work asli. Beacon Chain adalah rantai blok 'kosong', tetapi mematikan proof-of-work dan menyalakan proof-of-stake di Ethereum memerlukan instruksi kepada Beacon Chain untuk menerima data transaksi dari klien eksekusi, menggabungkannya ke dalam blok dan kemudian mengaturnya ke dalam blockchain menggunakan mekanisme konsensus berbasis proof-of-stake. Pada saat yang sama, klien Ethereum asli mematikan penambangan, propagasi blok, dan logika konsensus mereka, menyerahkan semuanya ke Beacon Chain. Peristiwa ini dikenal sebagai [The Merge](/roadmap/merge/). Setelah The Merge terjadi, tidak ada lagi dua blockchain. Sebaliknya, hanya ada satu Ethereum proof-of-stake, yang sekarang membutuhkan dua klien berbeda per node. Beacon Chain sekarang menjadi lapisan konsensus, jaringan peer-to-peer dari klien konsensus yang menangani gossip blok dan logika konsensus, sementara klien asli membentuk lapisan eksekusi, yang bertanggung jawab untuk melakukan gossip dan mengeksekusi transaksi, serta mengelola status Ethereum. Kedua lapisan tersebut dapat berkomunikasi satu sama lain menggunakan Engine API.

## Apa yang dilakukan Beacon Chain? {#what-does-the-beacon-chain-do}

Beacon Chain adalah nama yang diberikan untuk buku besar akun yang melakukan dan mengoordinasikan jaringan [staker](/staking/) Ethereum sebelum staker tersebut mulai memvalidasi blok Ethereum yang sebenarnya. Namun, ia tidak memproses transaksi atau menangani interaksi kontrak pintar karena hal itu dilakukan di lapisan eksekusi.
Beacon Chain bertanggung jawab atas hal-hal seperti penanganan blok dan pengesahan, menjalankan algoritma pilihan fork, dan mengelola hadiah serta penalti.
Baca lebih lanjut di [halaman arsitektur node](/developers/docs/nodes-and-clients/node-architecture/#node-comparison) kami.

## Dampak Beacon Chain {#beacon-chain-features}

### Memperkenalkan mengunci {#introducing-staking}

Beacon Chain memperkenalkan [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) ke Ethereum. Ini menjaga Ethereum tetap aman dan menghasilkan lebih banyak ETH bagi validator dalam prosesnya. Pada praktiknya, mengunci melibatkan mengunci ETH untuk mengaktifkan perangkat lunak validator. Sebagai staker, Anda menjalankan perangkat lunak yang membuat dan memvalidasi blok baru di dalam rantai.

Mengunci memiliki tujuan yang sama dengan yang sebelumnya dilakukan oleh [penambangan](/developers/docs/consensus-mechanisms/pow/mining/), tetapi berbeda dalam banyak hal. Penambangan membutuhkan pengeluaran awal yang besar dalam bentuk perangkat keras yang kuat dan konsumsi energi, yang menghasilkan skala ekonomi, dan mendorong sentralisasi. Penambangan juga tidak disertai dengan persyaratan apa pun untuk mengunci aset sebagai jaminan, yang membatasi kemampuan protokol untuk menghukum pelaku kejahatan setelah terjadinya serangan.

Transisi ke proof-of-stake membuat Ethereum secara signifikan lebih aman dan terdesentralisasi dibandingkan dengan proof-of-work. Semakin banyak orang yang berpartisipasi dalam jaringan, semakin terdesentralisasi dan aman dari serangan.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Jika Anda tertarik untuk menjadi validator dan membantu mengamankan Ethereum, [pelajari lebih lanjut tentang mengunci](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Mempersiapkan sharding {#setting-up-for-sharding}

Sejak Beacon Chain bergabung dengan mainnet Ethereum asli, komunitas Ethereum mulai mencari cara untuk peningkatan jaringan.

Proof-of-stake memiliki keuntungan karena memiliki registri dari semua produsen blok yang disetujui pada waktu tertentu, masing-masing dengan ETH yang di-stake. Registri ini menyiapkan panggung untuk kemampuan membagi dan menaklukkan, tetapi secara andal membagi tanggung jawab jaringan tertentu.

Tanggung jawab ini berbanding terbalik dengan proof-of-work, di mana penambang tidak memiliki kewajiban terhadap jaringan dan dapat berhenti menambang serta mematikan perangkat lunak node mereka secara permanen dalam sekejap tanpa dampak apa pun. Juga tidak ada registri pengusul blok yang diketahui dan tidak ada cara yang dapat diandalkan untuk membagi tanggung jawab jaringan dengan aman.

[Lebih lanjut tentang sharding](/roadmap/danksharding/)

## Hubungan antar peningkatan {#relationship-between-upgrades}

Peningkatan Ethereum semuanya agak saling berkaitan. Jadi mari kita rekap bagaimana Beacon Chain memengaruhi peningkatan lainnya.

### Beacon Chain dan The Merge {#merge-and-beacon-chain}

Pada awalnya, Beacon Chain ada secara terpisah dari mainnet Ethereum, tetapi keduanya digabungkan pada tahun 2022.

<ButtonLink href="/roadmap/merge/">
  The Merge
</ButtonLink>

### Shard dan Beacon Chain {#shards-and-beacon-chain}

Sharding hanya dapat dengan aman memasuki ekosistem Ethereum dengan adanya mekanisme konsensus proof-of-stake. Beacon Chain memperkenalkan mengunci, yang 'bergabung' dengan mainnet, membuka jalan bagi sharding untuk membantu peningkatan Ethereum lebih lanjut.

<ButtonLink href="/roadmap/danksharding/">
  Rantai shard
</ButtonLink>

## Bacaan lebih lanjut {#further-reading}

- [Lebih lanjut tentang arsitektur node](/developers/docs/nodes-and-clients/node-architecture)
- [Lebih lanjut tentang proof-of-stake](/developers/docs/consensus-mechanisms/pos)