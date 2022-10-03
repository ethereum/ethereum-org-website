---
title: Rantai plasma
description: Pengantar rantai plasma sebagai solusi penskalaan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
incomplete: true
sidebarDepth: 3
---

Rantai plasma adalah blockchain terpisah yang ditambatkan ke rantai Ethereum utama, dan menggunakan bukti penipuan (seperti [rollup Optimistic](/developers/docs/scaling/layer-2-rollups/#optimistic-rollups)) untuk menengahi perselisihan. Rantai ini kadang disebut sebagai rantai "anak" karena pada dasarnya rantai ini adalah salinan Jaringan Utama Ethereum yang lebih kecil. Pohon Merkel memungkinkan pembuatan tumpukan tak terbatas dari rantai-rantai ini yang dapat bekerja untuk melepas muatan bandwidth dari rantai induk (termasuk Jaringan Utama). Mereka memperoleh keamanannya melalui [bukti penipuan](/glossary/#fraud-proof), dan setiap rantai anak memiliki mekanisme sendiri untuk validasi blok.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang semua topik dasar dan pemahaman tingkat tinggi tentang [penskalaan Ethereum](/developers/docs/scaling/). Menerapkan solusi penskalaan seperti Plasma adalah topik lanjutan karena teknologinya kurang teruji, dan masih terus diteliti dan dikembangkan.

## Pro dan kontra {#pros-and-cons}

| Pro                                                                                                                                    | Kontra                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Throughput yang tinggi, biaya rendah per transaksi.                                                                                    | Tidak mendukung komputasi umum. Hanya pentransferan, penukaran token biasa, dan beberapa jenis transaksi lainnya yang didukung melalui logika predikat.                               |
| Baik untuk transaksi antara pengguna yang berwenang (tidak ada overhead per pasangan pengguna jika keduanya dibuat pada rantai plasma) | Perlu secara berkala mengawasi jaringan (persyaratan liveness) atau mendelegasikan tanggung jawab ini kepada orang lain untuk memastikan keamanan dana Anda.                          |
|                                                                                                                                        | Mengandalkan satu atau lebih operator untuk menyimpan data dan menyajikannya berdasarkan permintaan.                                                                                  |
|                                                                                                                                        | Penarikan tertunda beberapa hari untuk memungkinkan sanggahan. Untuk aset yang dapat dipertukarkan, hal ini dapat dikurangi oleh penyedia likuiditas, tetapi ada biaya modal terkait. |

### Gunakan Plasma {#use-plasma}

Beberapa proyek menyediakan implementasi Plasma yang dapat Anda integrasikan ke dalam dapp Anda:

- [OMG Network](https://omg.network/)
- [Polygon](https://polygon.technology/) (sebelumnya Matic Network)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Bacaan lebih lanjut {#further-reading}

- [EthHub tentang Plasma](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/plasma/)
- [Belajar tentang Plasma](https://www.learnplasma.org/en/)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
