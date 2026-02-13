---
title: Ethereum untuk pengembang JavaScript
description: Pelajari cara menjadi pengembang untuk Ethereum menggunakan proyek dan peralatan berbasis JavaScript.
lang: id
---

JavaScript adalah salah satu bahasa terpopuler di ekosistem Ethereum. Faktanya, ada sebuah [tim](https://github.com/ethereumjs) yang berdedikasi untuk membawa sebanyak mungkin Ethereum ke JavaScript.

Ada peluang untuk menulis JavaScript (atau yang sejenisnya) di [semua tingkatan tumpukan](/developers/docs/ethereum-stack/).

## Berinteraksi dengan Ethereum {#interact-with-ethereum}

### Pustaka API JavaScript {#javascript-api-libraries}

Jika Anda ingin menulis JavaScript untuk membuat kueri pada blockchain, mengirim transaksi, dan lainnya, cara paling mudah untuk melakukannya adalah dengan menggunakan [pustaka API JavaScript](/developers/docs/apis/javascript/). API ini memungkinkan pengembang untuk berinteraksi dengan mudah dengan [simpul di jaringan Ethereum](/developers/docs/nodes-and-clients/).

Anda dapat menggunakan pustaka ini untuk berinteraksi dengan kontrak pintar di Ethereum sehingga memungkinkan untuk membangun dapp di mana Anda hanya menggunakan JavaScript untuk berinteraksi dengan kontrak yang sudah ada sebelumnya.

**Lihat**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _mencakup implementasi dompet Ethereum dan utilitas dalam JavaScript dan TypeScript._
- [viem](https://viem.sh) – _Antarmuka TypeScript untuk Ethereum yang menyediakan primitif stateless tingkat rendah untuk berinteraksi dengan Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _meta-pustaka TypeScript dengan caching, hook, dan mock pengujian bawaan untuk pengembangan Ethereum yang mudah di seluruh pustaka web3._

### Kontrak Pintar {#smart-contracts}

Jika Anda seorang pengembang JavaScript dan ingin menulis kontrak pintar Anda sendiri, Anda mungkin ingin membiasakan diri dengan [Solidity](https://solidity.readthedocs.io). Ini adalah bahasa kontrak pintar yang paling populer dan secara sintaksis sama dengan JavaScript, yang mungkin membuatnya lebih mudah untuk dipelajari.

Selengkapnya tentang [kontrak pintar](/developers/docs/smart-contracts/).

## Memahami protokol {#understand-the-protocol}

### Mesin Virtual Ethereum {#the-ethereum-virtual-machine}

Ada implementasi JavaScript dari [Mesin Virtual Ethereum](/developers/docs/evm/). Mendukung aturan fork terbaru. Aturan-aturan fork mengacu pada perubahan yang dibuat pada EVM sebagai hasil dari peningkatan yang direncanakan.

Itu dibagi menjadi berbagai paket JavaScript yang dapat Anda periksa untuk lebih memahaminya:

- Akun
- Block
- Blockchain itu sendiri
- Transaksi
- Dan banyak lagi...

Ini akan membantu Anda memahami hal-hal seperti "apa struktur data dari suatu akun?".

Jika Anda lebih suka membaca kode, JavaScript ini bisa menjadi alternatif yang bagus untuk membaca dokumen kami.

**Lihat EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Simpul dan klien {#nodes-and-clients}

Klien Ethereumjs sedang dalam pengembangan aktif yang memungkinkan Anda mempelajari cara kerja klien Ethereum dalam bahasa yang Anda pahami; JavaScript!

**Lihat klien**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Proyek lainnya {#other-projects}

Banyak hal lain juga yang terjadi di ranah JavaScript Ethereum, termasuk:

- pustaka dari utilitas dompet.
- perlalatan untuk menghasilkan, mengimpor, dan mengekspor kunci Ethereum.
- sebuah implementasi dari `merkle-patricia-tree` – struktur data yang diuraikan dalam buku kuning Ethereum.

Gali apa pun yang paling menarik minat Anda di [repo EthereumJS](https://github.com/ethereumjs)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
