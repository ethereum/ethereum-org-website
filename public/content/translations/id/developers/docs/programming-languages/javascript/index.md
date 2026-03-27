---
title: Ethereum untuk pengembang JavaScript
description: Pelajari cara mengembangkan Ethereum menggunakan proyek dan perkakas berbasis JavaScript.
lang: id
---

JavaScript adalah salah satu bahasa paling populer di ekosistem Ethereum. Faktanya, ada sebuah [tim](https://github.com/ethereumjs) yang berdedikasi untuk membawa sebanyak mungkin Ethereum ke JavaScript.

Ada peluang untuk menulis JavaScript (atau sesuatu yang mirip) di [semua tingkat tumpukan](/developers/docs/ethereum-stack/).

## Berinteraksi dengan Ethereum {#interact-with-ethereum}

### Pustaka API JavaScript {#javascript-api-libraries}

Jika Anda ingin menulis JavaScript untuk melakukan kueri pada blockchain, mengirim transaksi, dan lainnya, cara paling nyaman untuk melakukannya adalah menggunakan [pustaka API JavaScript](/developers/docs/apis/javascript/). API ini memungkinkan pengembang untuk dengan mudah berinteraksi dengan [node di jaringan Ethereum](/developers/docs/nodes-and-clients/).

Anda dapat menggunakan pustaka ini untuk berinteraksi dengan kontrak pintar di Ethereum sehingga memungkinkan untuk membangun dapp di mana Anda hanya menggunakan JavaScript untuk berinteraksi dengan kontrak yang sudah ada.

**Lihat**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _mencakup implementasi dompet Ethereum dan utilitas dalam JavaScript dan TypeScript._
- [viem](https://viem.sh) – _Antarmuka TypeScript untuk Ethereum yang menyediakan primitif stateless tingkat rendah untuk berinteraksi dengan Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _meta-library TypeScript dengan caching bawaan, hook, dan mock pengujian untuk pengembangan Ethereum yang mudah di seluruh pustaka web3._

### Kontrak pintar {#smart-contracts}

Jika Anda adalah pengembang JavaScript dan ingin menulis kontrak pintar Anda sendiri, Anda mungkin ingin membiasakan diri dengan [Solidity](https://solidity.readthedocs.io). Ini adalah bahasa kontrak pintar paling populer dan secara sintaksis mirip dengan JavaScript, yang mungkin membuatnya lebih mudah dipelajari.

Lebih lanjut tentang [kontrak pintar](/developers/docs/smart-contracts/).

## Memahami protokol {#understand-the-protocol}

### Mesin Virtual Ethereum {#the-ethereum-virtual-machine}

Terdapat implementasi JavaScript dari [Mesin Virtual Ethereum](/developers/docs/evm/). Ini mendukung aturan fork terbaru. Aturan fork merujuk pada perubahan yang dibuat pada EVM sebagai hasil dari peningkatan yang direncanakan.

Ini dibagi menjadi berbagai paket JavaScript yang dapat Anda periksa untuk lebih memahaminya:

- Akun
- Blok
- Blockchain itu sendiri
- Transaksi
- Dan lainnya...

Ini akan membantu Anda memahami hal-hal seperti "apa struktur data dari sebuah akun?".

Jika Anda lebih suka membaca kode, JavaScript ini bisa menjadi alternatif yang bagus daripada membaca dokumen kami.

**Lihat EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Node dan klien {#nodes-and-clients}

Klien Ethereumjs sedang dalam pengembangan aktif yang memungkinkan Anda menggali bagaimana klien Ethereum bekerja dalam bahasa yang Anda pahami; JavaScript!

**Lihat klien**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Proyek lainnya {#other-projects}

Ada juga banyak hal lain yang terjadi di dunia JavaScript Ethereum, termasuk:

- pustaka utilitas dompet.
- alat untuk menghasilkan, mengimpor, dan mengekspor kunci Ethereum.
- implementasi `merkle-patricia-tree` – struktur data yang diuraikan dalam yellow paper Ethereum.

Gali apa pun yang paling menarik bagi Anda di [repo EthereumJS](https://github.com/ethereumjs)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_