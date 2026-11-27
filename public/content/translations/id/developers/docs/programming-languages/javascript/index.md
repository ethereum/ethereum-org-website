---
title: Ethereum untuk pengembang JavaScript
description: Pelajari cara mengembangkan Ethereum menggunakan proyek dan perkakas berbasis JavaScript.
lang: id
---

JavaScript adalah salah satu bahasa paling populer di ekosistem Ethereum, dengan implementasi JavaScript dan TypeScript untuk segala hal mulai dari primitif protokol inti hingga klien konsensus produksi.

Ada peluang untuk menulis JavaScript (atau sesuatu yang mirip) di [semua tingkat tumpukan](/developers/docs/ethereum-stack/).

## Berinteraksi dengan Ethereum {#interact-with-ethereum}

### Pustaka API JavaScript {#javascript-api-libraries}

Jika Anda ingin menulis JavaScript untuk melakukan kueri pada rantai blok, mengirim transaksi, dan lainnya, cara paling nyaman untuk melakukannya adalah menggunakan [pustaka API JavaScript](/developers/docs/apis/javascript/). API ini memungkinkan pengembang untuk dengan mudah berinteraksi dengan [simpul (node) di jaringan Ethereum](/developers/docs/nodes-and-clients/).

Anda dapat menggunakan pustaka ini untuk berinteraksi dengan kontrak pintar di Ethereum sehingga memungkinkan untuk membangun aplikasi terdesentralisasi (dapp) di mana Anda hanya menggunakan JavaScript untuk berinteraksi dengan kontrak yang sudah ada.

**Lihat**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _mencakup implementasi dompet Ethereum dan utilitas dalam JavaScript dan TypeScript._
- [Viem](https://viem.sh) – _Antarmuka TypeScript untuk Ethereum yang menyediakan primitif nirkondisi (stateless) tingkat rendah untuk berinteraksi dengan Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _sebuah meta-pustaka TypeScript dengan caching bawaan, hook, dan tiruan (mock) pengujian untuk pengembangan Ethereum yang mudah di berbagai pustaka Web3._

### Kontrak pintar {#smart-contracts}

Jika Anda seorang pengembang JavaScript dan ingin menulis kontrak pintar Anda sendiri, Anda mungkin ingin membiasakan diri dengan [Solidity](https://solidity.readthedocs.io). Ini adalah bahasa kontrak pintar yang paling populer dan secara sintaksis mirip dengan JavaScript, yang mungkin membuatnya lebih mudah untuk dipelajari.

Lebih lanjut tentang [kontrak pintar](/developers/docs/smart-contracts/).

## Memahami protokol {#understand-the-protocol}

### Mesin virtual Ethereum {#the-ethereum-virtual-machine}

Terdapat implementasi JavaScript dari [mesin virtual Ethereum](/developers/docs/evm/). Ini mendukung aturan percabangan terbaru. Aturan percabangan merujuk pada perubahan yang dibuat pada EVM sebagai hasil dari peningkatan yang direncanakan.

Ini dipisahkan ke dalam berbagai paket JavaScript yang dapat Anda periksa untuk lebih memahami:

- Akun
- Blok
- Rantai blok itu sendiri
- Transaksi
- Dan banyak lagi...

Ini akan membantu Anda memahami hal-hal seperti "apa struktur data dari sebuah akun?".

Jika Anda lebih suka membaca kode, JavaScript ini bisa menjadi alternatif yang bagus daripada membaca dokumentasi kami.

**Lihat EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Simpul dan klien {#nodes-and-clients}

[Lodestar](https://lodestar.chainsafe.io/) adalah klien konsensus siap produksi yang ditulis dalam TypeScript dan dikelola oleh ChainSafe. Ini mencakup simpul suar dan klien validator, dan merupakan tempat yang baik untuk melihat bagaimana konsensus Bukti Kepemilikan Ethereum bekerja dalam bahasa yang Anda ketahui.

**Lihat Lodestar**  
[`ChainSafe/lodestar`](https://github.com/ChainSafe/lodestar)

Di sisi eksekusi, klien EthereumJS sudah usang dan diarsipkan, tetapi kode sumbernya tetap tersedia untuk menjelajahi bagaimana klien Ethereum bekerja dalam JavaScript.

**Lihat klien yang diarsipkan**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/archive/client)

## Proyek lainnya {#other-projects}

Ada juga banyak hal lain yang terjadi di dunia JavaScript Ethereum, termasuk:

- pustaka utilitas dompet.
- perkakas untuk menghasilkan, mengimpor, dan mengekspor kunci Ethereum.
- implementasi dari `merkle-patricia-tree` – sebuah struktur data yang diuraikan dalam kertas kuning Ethereum.

Gali apa pun yang paling menarik bagi Anda di [repo EthereumJS](https://github.com/ethereumjs)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
