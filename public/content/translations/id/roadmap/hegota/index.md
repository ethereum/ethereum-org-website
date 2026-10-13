---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "Pelajari tentang peningkatan protokol Hegotá"
lang: id
template: upgrade
---

Hegotá adalah peningkatan jaringan [Ethereum](/) yang diharapkan mengikuti [Glamsterdam](/roadmap/glamsterdam/). Ini dinamai dari kombinasi "Bogotá" (peningkatan lapisan eksekusi, dinamai dari lokasi Devcon sebelumnya) dan "Heze" (peningkatan lapisan konsensus, dinamai dari sebuah bintang).

Hegotá sedang dalam tahap perencanaan awal. Fitur utamanya telah dipilih dan perubahan kedua telah dijadwalkan, tetapi sisa ruang lingkupnya masih diputuskan, dan belum ada tanggal yang ditetapkan.

## Fitur Utama: FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

Daftar inklusi yang dipaksakan oleh pilihan percabangan (FOCIL, atau EIP-7805) adalah tentang [resistensi sensor](/roadmap/security/#censorship-resistance): memastikan bahwa sebuah transaksi yang valid masuk ke dalam sebuah blok bahkan jika para pembangun blok lebih memilih untuk mengabaikannya.

Saat ini, satu [validator](/glossary/#validator) membangun setiap blok dan memutuskan transaksi mana yang ada di dalamnya. Oleh karena itu, siapa pun yang dapat memengaruhi cukup banyak pembangun blok dapat menunda sebuah transaksi, dan pengguna tidak memiliki cara untuk memaksakan masalah tersebut selain menunggu dan berharap.

FOCIL menyebarkan keputusan tersebut ke banyak validator. Sebuah komite masing-masing mengajukan daftar transaksi yang seharusnya disertakan, dan aturan protokol mewajibkan pembangun blok untuk menghormati daftar tersebut. Menyensor sebuah transaksi tidak lagi menjadi sesuatu yang dapat dilakukan oleh satu pihak saja.

## Transaksi frame {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

Transaksi frame (EIP-8141) memungkinkan sebuah [akun](/glossary/#account) memutuskan sendiri apa yang dihitung sebagai transaksi yang valid, alih-alih protokol bersikeras pada satu skema tanda tangan yang tetap.

Saat ini setiap transaksi diotorisasi dengan cara yang sama: satu tanda tangan, dari satu kunci. [Akun kontrak pintar](/roadmap/account-abstraction/) mengakalinya dengan merutekan transaksi melalui infrastruktur tambahan, yang memakan biaya gas dan menambah bagian-bagian bergerak yang dapat gagal.

Sebuah transaksi frame memindahkan pemeriksaan ke dalam akun itu sendiri. Akun tersebut menjalankan logika verifikasinya sendiri, sehingga kemampuan yang saat ini membutuhkan infrastruktur tambahan tersebut — pemulihan sosial, batas pengeluaran, membutuhkan beberapa persetujuan, membiarkan orang lain membayar gas — menjadi hal-hal yang didukung secara langsung oleh protokol.

Karena akun memilih aturannya sendiri, ia juga dapat memilih skema tanda tangan yang tidak dapat dipecahkan oleh komputer kuantum. Hal ini menjadikannya sebuah langkah menuju [resistensi kuantum](/roadmap/security/#quantum-resistance) serta dompet yang lebih baik.

## Apa lagi yang ada di Hegotá {#scope}

Belum diputuskan. FOCIL dan transaksi frame adalah dua perubahan yang dijadwalkan sejauh ini; puluhan proposal lainnya telah diajukan dan belum ada yang ditetapkan. Halaman ini akan tetap singkat sampai ruang lingkupnya pasti — untuk status diskusi saat ini, lihat sumber daya di bawah ini.

## Bacaan lebih lanjut {#further-reading}

- [Forkcast: Hegotá](https://forkcast.org/upgrade/hegota) — status terkini dari setiap proposal
- [Meta EIP Hegotá (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [Spesifikasi teknis EIP-7805](https://eips.ethereum.org/EIPS/eip-7805)
- [Spesifikasi teknis EIP-8141](https://eips.ethereum.org/EIPS/eip-8141)
- [Peta jalan Ethereum](/roadmap/)
