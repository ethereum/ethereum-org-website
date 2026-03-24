---
title: Standar Token ERC-777
description: Pelajari tentang ERC-777, standar token fungible yang ditingkatkan dengan hook, meskipun ERC-20 lebih direkomendasikan untuk keamanan.
lang: id
---

## Peringatan {#warning}

**ERC-777 sulit untuk diimplementasikan dengan benar, karena [kerentanannya terhadap berbagai bentuk serangan](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Disarankan untuk menggunakan [ERC-20](/developers/docs/standards/tokens/erc-20/) sebagai gantinya.** Halaman ini tetap ada sebagai arsip sejarah.

## Pengantar? {#introduction}

ERC-777 adalah standar token fungible yang meningkatkan standar [ERC-20](/developers/docs/standards/tokens/erc-20/) yang sudah ada.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Peningkatan apa yang diusulkan ERC-777 dibandingkan ERC-20? {#-erc-777-vs-erc-20}

ERC-777 memberikan peningkatan berikut dibandingkan ERC-20.

### Hook {#hooks}

Hook adalah fungsi yang dijelaskan dalam kode kontrak pintar. Hook dipanggil ketika token dikirim atau diterima melalui kontrak. Hal ini memungkinkan kontrak pintar untuk bereaksi terhadap token yang masuk atau keluar.

Hook didaftarkan dan ditemukan menggunakan standar [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Mengapa hook itu hebat? {#why-are-hooks-great}

1. Hook memungkinkan pengiriman token ke kontrak dan memberi tahu kontrak dalam satu transaksi, tidak seperti [ERC-20](https://eips.ethereum.org/EIPS/eip-20), yang memerlukan panggilan ganda (`approve`/`transferFrom`) untuk mencapai hal ini.
2. Kontrak yang belum mendaftarkan hook tidak kompatibel dengan ERC-777. Kontrak pengirim akan membatalkan transaksi ketika kontrak penerima belum mendaftarkan hook. Hal ini mencegah transfer yang tidak disengaja ke kontrak pintar non-ERC-777.
3. Hook dapat menolak transaksi.

### Desimal {#decimals}

Standar ini juga memecahkan kebingungan seputar `decimals` yang disebabkan oleh ERC-20. Kejelasan ini meningkatkan pengalaman pengembang.

### Kompatibilitas mundur dengan ERC-20 {#backwards-compatibility-with-erc-20}

Kontrak ERC-777 dapat berinteraksi seolah-olah mereka adalah kontrak ERC-20.

## Bacaan Lebih Lanjut {#further-reading}

[EIP-777: Standar Token](https://eips.ethereum.org/EIPS/eip-777)