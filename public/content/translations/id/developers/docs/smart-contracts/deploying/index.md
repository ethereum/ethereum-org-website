---
title: Menyebarkan kontrak pintar
description: Pelajari cara menyebarkan kontrak pintar ke jaringan Ethereum, termasuk prasyarat, alat, dan langkah-langkah penyebaran.
lang: id
---

Anda perlu menyebarkan kontrak pintar Anda agar tersedia bagi pengguna jaringan Ethereum.

Untuk menyebarkan kontrak pintar, Anda hanya perlu mengirimkan transaksi Ethereum yang berisi kode kontrak pintar yang telah dikompilasi tanpa menentukan penerima apa pun.

## Prasyarat {#prerequisites}

Anda harus memahami [jaringan Ethereum](/developers/docs/networks/), [transaksi](/developers/docs/transactions/), dan [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/) sebelum menyebarkan kontrak pintar.

Menyebarkan kontrak juga membutuhkan Ether (ETH) karena kontrak tersebut disimpan di rantai blok, jadi Anda harus familier dengan [gas dan biaya](/developers/docs/gas/) di Ethereum.

Terakhir, Anda perlu mengkompilasi kontrak Anda sebelum menyebarkannya, jadi pastikan Anda telah membaca tentang [kompilasi kontrak pintar](/developers/docs/smart-contracts/compiling/).

## Cara menyebarkan kontrak pintar {#how-to-deploy-a-smart-contract}

### Apa yang Anda butuhkan {#what-youll-need}

- Kode bita kontrak Anda – ini dihasilkan melalui [kompilasi](/developers/docs/smart-contracts/compiling/)
- ETH untuk gas – Anda akan menetapkan batas gas Anda seperti transaksi lainnya, jadi ketahuilah bahwa penyebaran kontrak membutuhkan lebih banyak gas daripada transfer ETH sederhana
- skrip atau plugin penyebaran
- akses ke [node Ethereum](/developers/docs/nodes-and-clients/), baik dengan menjalankan node Anda sendiri, terhubung ke node publik, atau melalui kunci API menggunakan [layanan node](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Langkah-langkah untuk menyebarkan kontrak pintar {#steps-to-deploy}

Langkah-langkah spesifik yang terlibat akan bergantung pada kerangka kerja pengembangan yang digunakan. Misalnya, Anda dapat memeriksa [dokumentasi Hardhat tentang menyebarkan kontrak Anda](https://hardhat.org/docs/tutorial/deploying) atau [dokumentasi Foundry tentang menyebarkan dan memverifikasi kontrak pintar](https://book.getfoundry.sh/forge/deploying). Setelah disebarkan, kontrak Anda akan memiliki alamat Ethereum seperti [akun](/developers/docs/accounts/) lainnya dan dapat diverifikasi menggunakan [alat verifikasi kode sumber](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Alat terkait {#related-tools}

**Remix - _Remix IDE memungkinkan pengembangan, penyebaran, dan pengelolaan kontrak pintar untuk rantai blok seperti Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Platform pengembangan Web3 yang menyediakan debugging, observabilitas, dan blok bangunan infrastruktur untuk mengembangkan, menguji, memantau, dan mengoperasikan kontrak pintar_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentasi](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Lingkungan pengembangan untuk mengkompilasi, menyebarkan, menguji, dan men-debug perangkat lunak Ethereum Anda_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentasi tentang menyebarkan kontrak Anda](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Sebarkan kontrak apa pun dengan mudah ke rantai yang kompatibel dengan EVM, menggunakan satu perintah_**

- [Dokumentasi](https://portal.thirdweb.com/deploy/)

**Crossmint - _Platform pengembangan Web3 tingkat perusahaan untuk menyebarkan kontrak pintar, mengaktifkan pembayaran kartu kredit dan lintas rantai, serta menggunakan API untuk membuat, mendistribusikan, menjual, menyimpan, dan mengedit NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentasi](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Tutorial terkait {#related-tutorials}

- [Menyebarkan kontrak pintar pertama Anda](/developers/tutorials/deploying-your-first-smart-contract/) _– Pengantar untuk menyebarkan kontrak pintar pertama Anda di jaringan pengujian Ethereum._
- [Hello World | tutorial kontrak pintar](/developers/tutorials/hello-world-smart-contract/) _– Tutorial yang mudah diikuti untuk membuat & menyebarkan kontrak pintar dasar di Ethereum._
- [Berinteraksi dengan kontrak lain dari Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cara menyebarkan kontrak pintar dari kontrak yang ada dan berinteraksi dengannya._
- [Cara memperkecil ukuran kontrak Anda](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Cara mengurangi ukuran kontrak Anda agar tetap di bawah batas dan menghemat gas_

## Bacaan lebih lanjut {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Menyebarkan kontrak Anda dengan Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kerangka kerja pengembangan](/developers/docs/frameworks/)
- [Menjalankan node Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Node-sebagai-layanan](/developers/docs/nodes-and-clients/nodes-as-a-service)