---
title: Sidechain
description: Pengantar sidechain sebagai solusi penskalaan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
incomplete: true
sidebarDepth: 3
---

Sidechain adalah blockchain terpisah yang berjalan secara paralel dengan Jaringan Utama Ethereum dan beroperasi secara independen. Sidechain memliki [algoritma konsensus](/developers/docs/consensus-mechanisms/) (seperti [bukti otoritas](https://wikipedia.org/wiki/Proof_of_authority), [Bukti penaruhan yang Didelegasikan](https://en.bitcoinwiki.org/wiki/DPoS), [Toleransi kesalahan Byzantine](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)). Sidechain terhubung ke Jaringan Utama lewat jembatan dua arah.

Apa yang membuat sidechain sangat menarik adalah bahwa rantai tersebut bekerja sama seperti rantai Ethereum utama karena didasarkan pada [EVM](/developers/docs/evm/). Sidechain tidak menggunakan Ethereum, sidechain adalah Ethereum. Ini berarti jika Anda ingin menggunakan [dapp](/developers/docs/dapps/) di sidechain, ini hanyalah masalah penggunaan kode Anda ke sidechain ini. Sidechain terlihat, terasa, dan bertindak seperti Jaringan Utama – Anda menulis kontrak di Solidity, dan berinteraksi dengan rantai melalui API Web3.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang semua topik dasar dan pemahaman tingkat tinggi tentang [penskalaan Ethereum](/developers/docs/scaling/).

## Pro dan kontra {#pros-and-cons}

| Pro                                                           | Kontra                                                                                                             |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Teknologi yang sudah mapan.                                   | Kurang terdesentralisasi.                                                                                          |
| Mendukung komputasi umum, memiliki kompatibilitas dengan EVM. | Menggunakan mekanisme konsensus terpisah. Tidak diamankan oleh lapisan 1 (jadi secara teknis ini bukan lapisan 2). |
|                                                               | Kuorum validator sidechain dapat melakukan penipuan.                                                               |

### Gunakan Sidechain {#use-sidechains}

Beberapa proyek menyediakan implementasi sidechain yang dapat Anda integrasikan ke dalam dapp Anda:

- [Skale](https://skale.network/)
- [POA Network](https://www.poa.network/)
- [Gnosis Chain (sebelumnya xDai)](https://www.xdaichain.com/)

## Bacaan lebih lanjut {#further-reading}

- [Penskalaan Dapp Ethereum melalui Sidechain](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 Feb 2018 - Georgios Konstantopoulos_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
