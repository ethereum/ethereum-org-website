---
title: Kanal State
description: Pengantar kanal state dan kanal pembayaran sebagai solusi penskalaan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
incomplete: true
sidebarDepth: 3
---

Kanal state memungkinkan peserta untuk bertransaksi `x` beberapa kali secara off-chain sementara hanya mengirimkan dua transaksi on-chain ke jaringan Ethereum. Ini memungkinkan throughput yang sangat tinggi.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang semua topik dasar dan pemahaman tingkat tinggi tentang [penskalaan Ethereum](/developers/docs/scaling/). Menerapkan solusi penskalaan seperti kanal adalah topik lanjutan karena teknologinya kurang teruji, dan masih terus diteliti dan dikembangkan.

## Kanal {#channels}

Peserta harus mengunci sebagian dari state Ethereum, seperti deposito ETH, ke dalam kontrak multisig. Kontrak multisig adalah jenis kontrak yang memerlukan tanda tangan (dan dengan demikian persetujuan) dari beberapa kunci privat agar bisa dieksekusi.

Mengunci state dengan cara ini adalah transaksi pertama dan membuka kanal. Para peserta kemudian dapat bertransaksi dengan cepat dan bebas secara off-chain. Ketika interaksi selesai, transaksi on-chain terakhir dikirimkan, membuka kunci state.

**Berguna untuk**:

- banyak pembaruan state
- ketika jumlah peserta diketahui di muka
- ketika peserta selalu tersedia

Ada dua jenis kanal saat ini: kanal state dan kanal pembayaran.

## Kanal state {#state-channels}

Kanal state mungkin paling baik dijelaskan melalui sebuah contoh, seperti permainan tic tac toe:

1. Buat kontrak pintar multisig “Hakim” di rantai utama Ethereum yang memahami aturan tic-tac-toe, dan dapat mengidentifikasi Alice dan Bob sebagai dua pemain dalam game kami. Kontrak ini memegang hadiah 1ETH.

2. Kemudian, Alice dan Bob mulai memainkan permainan, membuka kanal state. Setiap gerakan menciptakan transaksi off-chain yang berisi “nonce”, yang berarti bahwa kita selalu dapat mengetahui nanti dalam urutan apa gerakan itu terjadi.

3. Ketika ada pemenang, mereka menutup kanal dengan mengirimkan state akhir (misalnya daftar transaksi) ke kontrak Hakim, hanya membayar satu biaya transaksi. Hakim memastikan bahwa “state akhir” ini ditandatangani oleh kedua belah pihak, dan menunggu selama satu periode waktu untuk memastikan bahwa tidak ada yang dapat secara sah menentang hasilnya, dan kemudian membayarkan hadiah 1ETH kepada Alice.

## Kanal pembayaran {#payment-channels}

Kanal state yang disederhanakan yang hanya menangani pembayaran (misalnya transfer ETH). Mereka mengizinkan transfer off-chain antara dua peserta, selama jumlah bersih transfer mereka tidak melebihi token yang didepositokan.

## Pro dan kontra {#channels-pros-and-cons}

| Pro                                                                                             | Kontra                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Penarikan/penyelesaian instan di Jaringan Utama (jika kedua pihak pada satu kanal bekerja sama) | Waktu dan biaya untuk menyiapkan dan menyelesaikan satu kanal - tidak begitu baik untuk transaksi sesekali antara pengguna yang berwenang.                   |
| Throughput yang sangat tinggi dimungkinkan                                                      | Perlu secara berkala mengawasi jaringan (persyaratan liveness) atau mendelegasikan tanggung jawab ini kepada orang lain untuk memastikan keamanan dana Anda. |
| Biaya per transaksi terendah - bagus untuk streaming pembayaran mikro                           | Harus mengunci dana di kanal pembayaran terbuka                                                                                                              |
|                                                                                                 | Tidak mendukung partisipasi terbuka                                                                                                                          |

## Gunakan kanal state {#use-state-channels}

Beberapa proyek menyediakan implementasi kanal state yang dapat Anda integrasikan ke dalam dapp Anda:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Bacaan lebih lanjut {#further-reading}

**Kanal state**

- [EthHub tentang kanal state](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/state-channels/)
- [Memahami Solusi Penskalaan Lapisan 2 Ethereum: Kanal State, Plasma, dan Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 2 Feb 2018_
- [Kanal State - sebuah penjelasan](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [Dasar-Dasar Kanal State](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Kanal pembayaran**

- [EthHub tentang kanal pembayaran](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/payment-channels/)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
