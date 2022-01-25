---
title: Penggabungan
description: Pelajari tentang penggabungan - ketika Jaringan Utama Ethereum bergabung dengan Rantai Suar yang dikoordinasikan sistem bukti penaruhan.
lang: id
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: Pada akhirnya, Jaringan Utama Ethereum saat ini akan "bergabung" dengan sistem bukti taruhan rantai suar.
summaryPoint2: Ini akan menandai akhir bukti kerja untuk Ethereum, dan transisi penuh ke bukti taruhan.
summaryPoint3: Ini direncanakan mendahului peluncuran rantai shard.
summaryPoint4: Sebelumnya kami menyebutnya sebagai "docking."
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Peningkatan ini mewakilkan peralihan resmi ke konsensus bukti taruhan. Ini menghilangkan kebutuhan akan penambangan dengan energi besar, dan alih-alih mengamankan jaringan yang menggunakan ether yang ditaruhkan. Satu langkah yang sangat menyenangkan dalam mewujudkan <a href="/upgrades/vision/">visi Eth2</a> – lebih banyak skalabilitas, keamanan, dan keberlanjutan.
</UpgradeStatus>

## Apa itu penggabungan? {#what-is-the-docking}

Penting untuk diingat bahwa pada awalnya [Rantai Suar](/upgrades/beacon-chain/) diluncurkan terpisah dari [Jaringan Utama](/glossary/#mainnet) - sistem rantai yang kita pakai saat ini. Jaringan Utama Ethereum terus diamankan oleh [bukti kerja](/developers/docs/consensus-mechanisms/pow/), sekalipun Rantai Suar beroperasi secara paralel menggunakan [bukti taruhan](/developers/docs/consensus-mechanisms/pos/). Penggabungan terjadi ketika dua sistem ini pada akhirnya menjadi satu.

Bayangkan Ethereum adalah sebuah kapal luar angkasa yang belum cukup siap untuk perjalanan antar bintang. Dengan Rantai Suar, komunitas telah membangun sebuah mesin baru dan lambung kapal yang lebih kuat. Ketika sudah saatnya, kapal yang ada saat ini akan bergabung dengan sistem baru, menjadi satu kapal, siap untuk melakukan perjalanan tahun cahaya yang intens, dan mengarungi alam semesta.

## Bergabung dengan Jaringan Utama {#docking-mainnet}

Ketika sudah siap, Jaringan Utama Ethereum akan "bergabung" dengan Rantai Suar, menjadi shard-nya sendiri yang menggunakan sistem bukti taruhan alih-alih [bukti kerja](/developers/docs/consensus-mechanisms/pow/).

Jaringan Utama akan memampukan pengoperasian kontrak pintar menjadi sistem bukti taruhan, ditambah dengan pengalaman, dan kondisi Ethereum saat ini, untuk memastikan transisi yang mulus bagi semua pemilik dan pengguna ETH.

## Setelah penggabungan {#after-the-merge}

Ini akan menandakan akhir dari bukti kerja untuk Ethereum dan memulai era Ethereum yang lebih berkelanjutan dan ramah lingkungan. Pada titik ini Ethereum akan satu langkah lebih dekat pada pencapaian penskalaan, keamanan, dan keberlanjutan penuh yang digariskan dalam [visi Eth2](/upgrades/vision/).

Penting untuk dicatat bahwa satu tujuan implementasi dari penggabungan adalah kemudahan untuk mempercepat transisi dari sistem bukti kerja ke bukti taruhan. Pengembang sedang memusatkan usaha mereka pada transisi ini, dan mengurangi fitur tambahan yang bisa menunda pencapaian tujuan ini.

**Ini berati beberapa fitur, seperti kemampuan untuk menarik ETH yang ditaruhkan, harus menunggu sedikit lebih lama setelah penggabungan selesai.** Rencananya mencakup peningkatan "pembersihan" pasca penggabungan untuk menyelesaikan fitur ini, yang diharapkan terjadi sesegera mungkin setelah penggabungan selesai.

## Hubungan antar peningkatan {#relationship-between-upgrades}

Semua peningkatan Eth2 saling terkait. Jadi mari kita ringkas bagaimana penggabungan ini berhubungan dengan peningkatan lain.

### Penggabungan dan Rantai Suar {#docking-and-beacon-chain}

Saat penggabungan terjadi, penaruh akan ditugaskan untuk memvalidasi Jaringan Utama Ethereum. [Penambangan](/developers/docs/consensus-mechanisms/pow/mining/) tidak lagi diperlukan sehingga penambang kemungkinan akan menginvestasikan penghasilan mereka ke dalam penaruhan pada sistem bukti taruhan yang baru.

<ButtonLink to="/upgrades/beacon-chain/">Rantai Suar</ButtonLink>

### Penggabungan dan pembersihan pasca penggabungan {#merge-and-post-merge-cleanup}

Segera setelah penggabungan terjadi, beberapa fitur seperti menarik ETH yang ditaruhkan, akan terhenti sementara waktu. Ini direncanakan untuk peningkatan terpisah yang mengikuti segera setelah penggabungan.

Ikuti perkembangannya bersama [Blog Pengembangan dan Penelitian EF](https://blog.ethereum.org/category/research-and-development/). Bagi mereka yang ingin tahu, pelajari selengkapnya tentang [Apa yang Terjadi Setelah Penggabungan](https://youtu.be/7ggwLccuN5s?t=101), yang disajikan oleh Vitalik pada acara ETHGlobal April 2021.

### Penggabungan dan rantai shard {#docking-and-shard-chains}

Pada awalnya, rencananya adalah melanjutkan pengembangan rantai shard sebelum penggabungan – untuk menyelesaikan masalah skalabilitas. Namun, seiring dengan kepopuleran [solusi penskalaan lapisan 2](/developers/docs/scaling/#layer-2-scaling), prioritasnya berubah menjadi penukaran sistem bukti kerja ke bukti taruhan lewat proses penggabungan.

Ini akan menjadi penilaian berkelanjutan dari komunitas seiring dengan kebutuhan akan potensi beberapa putaran rantai shard untuk memungkinkan skalabilitas yang tak terbatas.

<ButtonLink to="/upgrades/shard-chains/">Rantai shard</ButtonLink>
