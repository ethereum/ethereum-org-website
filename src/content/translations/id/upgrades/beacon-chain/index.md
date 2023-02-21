---
title: Rantai Suar
description: Belajar tentang Rantai Suar - peningkatan yang memperkenalkan bukti taruhan Ethereum.
lang: id
template: upgrade
image: ../../../../../assets/upgrades/core.png
summaryPoint1: Rantai Suar tidak mengubah apa pun terkait Ethereum yang kita gunakan saat ini.
summaryPoint2: Rantai Suar akan mengoordinasikan jaringan, yang berfungsi sebagai lapisan konsensus.
summaryPoint3: Rantai Suar memperkenalkan bukti taruhan ke ekosistem Ethereum.
summaryPoint4: Anda mungkin mengenalnya sebagai "Fase 0" pada roadmap teknis.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    Rantai Suar yang diluncurkan pada siang hari, 1 Desember 2020 waktu UTC. Untuk mempelajari lebih lanjut, <a href="https://beaconscan.com/">jelajahi data ini</a>. Jika Anda ingin membantu memvalidasi rantai, Anda dapat <a href="/staking/">menaruhkan ETH Anda</a>.
</UpgradeStatus>

## Apa yang dilakukan oleh Rantai Suar? {#what-does-the-beacon-chain-do}

Rantai Suar akan mengadakan atau mengoordinasi jaringan yang sudah diperluas dari [shard](/upgrades/sharding/) dan [penaruh](/staking/). Tapi itu tidak akan sama seperti [Jaringan Utama Ethereum](/glossary/#mainnet) saat ini. Rantai suar tidak bisa menangani akun ataupun kontrak pintar.

Peran Rantai Suar akan berubah seiring berjalannya waktu, namun rantai ini merupakan komponen dasar untuk [jaringan Ethereum yang aman, berkelanjutan, dan terukur yang sedang kami kerjakan](/upgrades/vision/).

## Fitur-fitur Rantai Suar {#beacon-chain-features}

### Memperkenalkan penaruhan {#introducing-staking}

Rantai Suar akan memperkenalkan [bukti taruhan](/developers/docs/consensus-mechanisms/pos/) kepada Ethereum. Ini adalah cara baru untuk anda membantu mempertahankan keamanan Ethereum. Bayangkan ini sebagai sebuah kebaikan umum yang akan membuat Ethereum lebih sehat dan menghasilkan lebih banyak ETH dalam prosesnya. Pada praktiknya, itu akan melibatkan Anda untuk menaruhkan ETH dengan tujuan mengaktifkan perangkat lunak validator. Sebagai validator Anda akan memroses transaksi dan menciptakan blok-blok baru di dalam rantai.

Penaruhan dan menjadi validator lebih mudah daripada [menambang](/developers/docs/mining/) (itulah bagaimana saat ini jaringan aman). Ini diharapkan dapat membantu membuat Ethereum lebih aman dalam jangka panjang. Semakin banyak orang berpartisipasi dalam jaringan ini, makin terdesentralisasi dan amanlah jaringan ini dari serangan.

<InfoBanner emoji=":money_bag:">
Jika Anda tertarik untuk menjadi validator dan membantu mengamankan Rantai Suar, <a href="/staking/">pelajari selengkapnya tentang penaruhan</a>.
</InfoBanner>

Ini juga merupakan perubahan penting untuk peningkatan lainnya: [rantai shard](/upgrades/sharding/).

### Menyiapkan rantai shard {#setting-up-for-shard-chains}

Setelah Jaringan Utama bergabung dengan Rantai Suar, peningkatan berikutnya akan memperkenalkan rantai shard ke jaringan bukti taruhan. "Shard" ini akan meningkatkan kapasitas jaringan dan meningkatkan kecepatan transaksi dengan memperluas jaringan menjadi 64 blockchain. Rantai Suar adalah langkah penting utama dalam mengenalkan rantai shard, karena membutuhkan penaruhan agar berfungsi dengan aman.

Nantinya Rantai Suar juga akan bertangung jawab untuk para penaruh yang dipilih secara acak untuk mengesahkan rantai shard. Ini adalah kunci untuk membuat para penaruh sulit berkolusi dan mengambil alih shard. Ini berarti mereka mempunyai [kesempatan kurang dari 1 dalam satu triliun](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Hubungan antar Peningkatan {#relationship-between-upgrades}

Semua peningkatan Ethereum saling terkait. Jadi ayo kita ingat kembali bagaimana Rantai Suar memengaruhi peningkatan lainnya.

### Jaringan Utama dan Rantai Suar {#mainnet-and-beacon-chain}

Rantai Suar, pada awalnya, akan hadir terpisah dari Jaringan Utama Ethereum yang kita gunakan saat ini. Tetapi mereka akan disatukan ke depannya. Rencananya adalah "menggabungkan" Jaringan Utama ke dalam sistem bukti taruhan yang dikontrol dan dikoordinasi oleh Rantai Suar.

<ButtonLink to="/upgrades/merge/">
    Penggabungan
</ButtonLink>

### Shard dan Rantai Suar {#shards-and-beacon-chain}

Rantai shard hanya dapat masuk dalam ekosistem Ethereum dengan mekanisme konsesus bukti taruhan. Rantai Suar akan memperkenalkan penaruhan, menyiapkan jalan bagi peningkatan rantai shard berikutnya.

<ButtonLink to="/upgrades/sharding/">
    Rantai shard
</ButtonLink>

<Divider />

## Berinteraksi dengan Rantai Suar {#interact-with-beacon-chain}

<BeaconChainActions />
