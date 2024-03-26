---
title: Ethereum untuk pengembang JavaScript
description: Pelajari cara menjadi pengembang untuk Ethereum menggunakan proyek dan peralatan berbasis JavaScript.
lang: id
---

JavaScript adalah salah satu bahasa terpopuler di ekosistem Ethereum. Faktanya, ada sebuah [tim](https://github.com/ethereumjs) yang didedikasikan untuk membawa sebanyak mungkin Ethereum ke JavaScript.

Ada beberapa kesempatan untuk menulis JavaScript (atau sesuatu yang mendekati itu) di [semua level penumpukan](/developers/docs/ethereum-stack/).

## Berinteraksi dengan Ethereum {#interact-with-ethereum}

### Pustaka API JavaScript {#javascript-api-libraries}

Jika Anda berniat untuk menulis JavaScript untuk menanyakan blockchain, mengirim transaksi, dan lainnya, cara paling mudah untuk melakukannya adalah menggunakan [pustaka API JavaScript](/developers/docs/apis/javascript/). API ini memungkinkan pengembang untuk dengan mudah berinteraksi dengan [node di jaringan Ethereum](/developers/docs/nodes-and-clients/).

Anda dapat menggunakan pustaka ini untuk berinteraksi dengan kontrak pintar di Ethereum sehingga memungkinkan untuk membangun dapp di mana Anda hanya menggunakan JavaScript untuk berinteraksi dengan kontrak yang sudah ada sebelumnya.

**Lihat juga**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _– termasuk implementasi dan utilitas dompet Ethereum di JavaScript and TypeScript._

### Kontrak pintar {#smart-contracts}

Jika Anda pengembang JavaScript yang ingin menulis kontrak pintar sendiri, Anda mungkin ingin mengenal [Solidity](https://solidity.readthedocs.io). Ini adalah bahasa kontrak pintar paling populer dan sangat terinspirasi oleh JavaScript.

Selengkapnya tentang [kontrak pintar](/developers/docs/smart-contracts/).

## Memahami protokol {#understand-the-protocol}

### Mesin virtual Ethereum {#the-ethereum-virtual-machine}

Ada implementasi JavaScript dari [mesin virtual Ethereum](/developers/docs/evm/). Mendukung aturan fork terbaru. Aturan-aturan fork mengacu pada perubahan yang dibuat pada EVM sebagai hasil dari peningkatan yang direncanakan.

Itu dibagi menjadi berbagai paket JavaScript yang dapat Anda periksa untuk lebih memahaminya:

- Akun
- Blok
- Blockchain itu sendiri
- Transaksi
- Dan banyak lagi...

Ini akan membantu Anda memahami hal-hal seperti "apa struktur data dari suatu akun?".

Jika Anda lebih suka membaca kode, JavaScript ini bisa menjadi alternatif yang bagus untuk membaca dokumen kami.

**Kunjungi monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Node dan klien {#nodes-and-clients}

Ada klien Ethereumjs yang sedang dalam pengembangan. Ini memungkinkan Anda menggali cara kerja klien Ethereum dalam bahasa yang Anda pahami.

**Kunjungi klien**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-client)

## Proyek lainnya {#other-projects}

Banyak hal lain juga yang terjadi di ranah JavaScript Ethereum, termasuk:

- pustaka dari utilitas dompet.
- perlalatan untuk menghasilkan, mengimpor, dan mengekspor kunci Ethereum.
- implementasi dari `merkle-patricia-tree` – sebuah struktur data yang diuraikan dalam yellow paper Ethereum.

Gali apa pun yang paling Anda minati di [EthereumJS repo](https://github.com/ethereumjs)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
