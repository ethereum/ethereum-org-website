---
title: Standar Token ERC-777
description:
lang: id
---

## Pendahuluan? {#introduction}

ERC-777 adalah standar token fungible yang meningkatkan standar [ERC-20](/developers/docs/standards/tokens/erc-20/) yang sudah ada.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, sebaiknya Anda membaca terlebih dahulu [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Apa peningkatan yang diusulkan oleh ERC-777 terhadap ERC-20? {#-erc-777-vs-erc-20}

ERC-777 menyediakan peningkatan berikut pada ERC-20.

### Kaitan {#hooks}

Kaitan adalah sebuah fungsi yang dideskripsikan dalam kode kontrak pintar. Kaitan dipanggil saat token dikirim atau diterima melalui kontrak. Ini memungkinkan kontrak pintar bereaksi terhadap token yang masuk atau keluar.

Kaitan didaftarkan dan ditemukan menggunakan standar [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Mengapa kaitan sangat berguna? {#why-are-hooks-great}

1. Kaitan memungkinkan mengirim token ke sebuah kontrak dan memberi tahu kontrak tersebut dalam satu transaksi, tidak seperti [ERC-20](https://eips.ethereum.org/EIPS/eip-20), yang membutuhkan pemanggilan ganda (`approve`/`transferFrom`) untuk melakukan ini.
2. Kontrak yang belum mendaftarkan kaitan tidak kompatibel dengan ERC-777. Kontrak yang mengirim akan membatalkan transaksi ketika kontrak yang menerima belum mendaftarkan kaitan. Ini mencegah pemindahan yang tidak disengaja ke kontrak pintar non-ERC-777.
3. Kaitan dapat menolak transaksi.

### Desimal {#decimals}

Standar ini juga menyelesaikan kebingungan seputar `decimals` yang terjadi dalam ERC-20. Kejelasan ini meningkatkan pengalaman pengembang.

### Kompatibilitas mundur dengan ERC-20 {#backwards-compatibility-with-erc-20}

Kontrak ERC-777 dapat melakukan interaksi seolah-olah ini adalah kontrak ERC-20.

## Bacaan Lebih Lanjut {#further-reading}

[EIP-777: Standar Token](https://eips.ethereum.org/EIPS/eip-777)
