---
title: Menggunakan kontrak pintar
description:
lang: id
---

Anda perlu menggunakan kontrak pintar Anda agar kontrak pintar tersedia bagi pengguna jaringan Ethereum.

Untuk menggunakan kontrak pintar, Anda hanya perlu mengirim transaksi Ethereum yang berisi kode kontrak pintar yang dikompilasi tanpa menentukan penerima.

## Prasyarat {#prerequisites}

Anda harus memahami [jaringan Ethereum](/developers/docs/networks/), [transaksi](/developers/docs/transactions/), dan [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/) sebelum menggunakan kontrak pintar.

Menggunakan kontrak juga memerlukan ether (ETH), jadi Anda harus terbiasa dengan [gas dan biaya](/developers/docs/gas/) di Ethereum.

Akhirnya, Anda hanya perlu mengompilasi kontrak sebelum menggunakannya, jadi pastikan Anda telah membaca tentang [mengompilasi kontrak pintar](/developers/docs/smart-contracts/compiling/).

## Cara menggunakan kontrak pintar {#how-to-deploy-a-smart-contract}

### Apa yang akan Anda butuhkan {#what-youll-need}

- kode bita kontrak Anda – ini dihasilkan melalui [pengompilasian](/developers/docs/smart-contracts/compiling/)
- ETH untuk gas – Anda akan menentukan batas gas seperti transaksi lainnya, jadi ingatlah penggunaan kontrak memerlukan lebih banyak gas daripada transfer ETH sederhana
- skrip atan plugin penggunaan
- akses ke [node Ethereum](/developers/docs/nodes-and-clients/), baik dengan menjalankan node Anda, terhubung dengan node publik, atau melalui kunci API yang menggunakan [layanan node](/developers/docs/nodes-and-clients/nodes-as-a-service/) seperti Infura atau Alchemy

### Langkah-langkah untuk menggunakan kontrak pintar {#steps-to-deploy}

Langkah-langkah khusus yang diperlukan akan bergantung pada peralatan yang Anda gunakan. Sebagai contoh, lihat [dokumentasi Hardhat tentang menggunakan kontrak Anda](https://hardhat.org/guides/deploying.html) atau [dokumentasi Truffle tentang penggunaan jaringan dan aplikasi](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment). Ini adalah dua dari peralatan paling populer untuk penggunaan kontrak pintar, yang melibatkan penulisan skrip untuk menangani langkah-langkah penggunaan.

Setelah digunakan, kontrak Anda akan memiliki alamat Ethereum seperti [akun](/developers/docs/accounts/) lainnya.

## Peralatan terkait {#related-tools}

**Remix - _IDE Remix memungkinkan mengembangkan, menggunakan, dan mengatur kontrak pintar untuk Ethereum seperti blockchain_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Platform untuk memantau kontrak pintar dengan mudah melalui fitur pelacakan kesalahan, peringatan, metrik kinerja, dan analitik kontrak terperinci_**

- [tenderly.co](https://tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Lingkungan pengembangan untuk mengompilasi, menggunakan, menguji, dan melakukan debug perangkat lunak Ethereum Anda_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentasi tentang menggunakan kontrak Anda](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**Truffle -** **_Lingkungan pengembangan, kerangka kerja pengujian, pipeline pengembangan, dan peralatan lainnya._**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [Dokumentasi tentang penggunaan jaringan dan aplikasi](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment)
- [GitHub](https://github.com/trufflesuite/truffle)

## Tutorial terkait {#related-tutorials}

- [Menggunakan kontrak pintar pertama Anda](/developers/tutorials/deploying-your-first-smart-contract/) _– Pengantar tentang menggunakan kontrak pintar pertama Anda di jaringan percobaan Ethereum._
- [Berinteraksi dengan kontrak lain dari Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cara menggunakan kontrak pintar dari kontrak yang sudah ada dan berinteraksi dengan kontrak pintar tersebut._
- [Bagaimana memperkecil ukuran kontrak Anda](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Bagaimana mengurangi ukuran kontrak Anda agar tetap di bawah batasan dan menghemat pemakaian gas_

## Bacaan lebih lanjut {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Menggunakan kontrak Anda dengan Hardhat](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kerangka kerja pengembangan](/developers/docs/frameworks/)
- [Jalankan node Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
