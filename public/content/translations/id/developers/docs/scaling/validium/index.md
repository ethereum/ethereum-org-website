---
title: Validium
description: Pengantar Validium sebagai solusi penskalaan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
incomplete: true
sidebarDepth: 3
---

Menggunakan bukti validitas seperti [rollup ZK](/developers/docs/scaling/layer-2-rollups#zk-rollups) tetapi data tidak disimpan pada rantai Ethereum lapisan 1 utama. Ini dapat menghasilkan 10rb transaksi per detik per rantai validium dan berbagai rantai dapat dijalankan secara paralel.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang semua topik dasar dan pemahaman tingkat tinggi tentang [penskalaan Ethereum](/developers/docs/scaling/). Menerapkan solusi pensklaan seperti Validium adalah topik lanjutan karena teknologinya kurang teruji, dan masih terus diteliti dan dikembangkan.

## Pro dan kontra {#pros-and-cons}

| Pro                                                                                                                               | Kontra                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tidak ada penundaan penarikan (tidak ada latensi ke tx on-chain/cross-chain); efisiensi modal yang lebih besar.                   | Dukungan terbatas untuk perhitungan umum/kontrak pintar; bahasa khusus diperlukan.                                                                                     |
| Tidak rentan terhadap serangan ekonomi tertentu yang dihadapi oleh sistem berbasis bukti penipuan dalam aplikasi bernilai tinggi. | Daya komputasi yang tinggi diperlukan untuk menghasilkan bukti ZK; tidak hemat biaya untuk aplikasi dengan throughput rendah.                                          |
|                                                                                                                                   | Waktu finalitas subjektif lebih lambat (10-30 menit untuk menghasilkan bukti ZK) (tetapi lebih cepat untuk finalitas penuh karena tidak ada penundaan waktu sengketa). |
|                                                                                                                                   | Menghasilkan sebuah bukti mengharuskan data off-chain tersedia setiap saat.                                                                                            |

### Gunakan Validium {#use-validium}

Beberapa proyek menyediakan implementasi Validium yang dapat Anda integrasikan ke dalam dapp Anda:

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)
- [Loopring](https://loopring.org/#/)

## Bacaan lebih lanjut {#further-reading}

- [Validium dan Lapisan 2 Dua Lawan Dua — Terbitan No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
