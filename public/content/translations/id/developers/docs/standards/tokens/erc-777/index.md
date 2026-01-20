---
title: Standar Token ERC-777
description: Pelajari tentang ERC-777, standar token yang dapat dipertukarkan yang telah disempurnakan dengan kait, meskipun ERC-20 direkomendasikan untuk keamanan.
lang: id
---

## Peringatan {#warning}

**ERC-777 sulit diimplementasikan dengan benar, karena [kerentanannya terhadap berbagai bentuk serangan](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Disarankan untuk menggunakan [ERC-20](/developers/docs/standards/tokens/erc-20/) sebagai gantinya.** Halaman ini tetap ada sebagai arsip historis.

## Pengenalan? {#introduction}

ERC-777 adalah standar token fungible yang meningkatkan standar [ERC-20](/developers/docs/standards/tokens/erc-20/) yang sudah ada.

## Persyaratan {#prerequisites}

Untuk memahami halaman ini dengan lebih baik, kami menyarankan Anda terlebih dahulu membaca tentang [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Apa peningkatan yang diusulkan oleh ERC-777 terhadap ERC-20? {#-erc-777-vs-erc-20}

ERC-777 menyediakan peningkatan berikut pada ERC-20.

### Hooks {#hooks}

Kaitan adalah sebuah fungsi yang dideskripsikan dalam kode kontrak pintar. Kaitan dipanggil saat token dikirim atau diterima melalui kontrak. Ini memungkinkan kontrak pintar bereaksi terhadap token yang masuk atau keluar.

Hooks didaftarkan dan ditemukan menggunakan standar [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Mengapa kaitan sangat berguna? {#why-are-hooks-great}

1. Hooks memungkinkan pengiriman token ke kontrak sekaligus memberi notifikasi kepada kontrak dalam satu transaksi, berbeda dengan [ERC-20](https://eips.ethereum.org/EIPS/eip-20), yang memerlukan dua panggilan (`approve`/`transferFrom`) untuk mencapai hal yang sama.
2. Kontrak yang belum mendaftarkan kaitan tidak kompatibel dengan ERC-777. Kontrak yang mengirim akan membatalkan transaksi ketika kontrak yang menerima belum mendaftarkan kaitan. Ini mencegah pemindahan yang tidak disengaja ke kontrak pintar non-ERC-777.
3. Kaitan dapat menolak transaksi.

### Desimal {#decimals}

Standar ini juga mengatasi kebingungan terkait `decimals` yang terjadi pada ERC-20. Kejelasan ini meningkatkan pengalaman pengembang.

### Kompatibilitas mundur dengan ERC-20 {#backwards-compatibility-with-erc-20}

Kontrak ERC-777 dapat melakukan interaksi seolah-olah ini adalah kontrak ERC-20.

## Bacaan Lebih Lanjut {#bacaan-lebih lanjut}

[EIP-777: Standar Token](https://eips.ethereum.org/EIPS/eip-777)
