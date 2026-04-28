---
title: Menerapkan kontrak pintar
description: Pelajari cara menerapkan kontrak pintar ke jaringan Ethereum, termasuk prasyarat, alat, dan langkah-langkah penerapannya.
lang: id
---

Anda perlu menerapkan kontrak pintar Anda agar tersedia bagi pengguna jaringan Ethereum.

Untuk menerapkan kontrak pintar, Anda hanya perlu mengirimkan transaksi Ethereum yang berisi kode kontrak pintar yang telah dikompilasi tanpa menentukan penerima apa pun.

## Prasyarat {#prerequisites}

Anda harus memahami [jaringan Ethereum](/developers/docs/networks/), [transaksi](/developers/docs/transactions/), dan [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/) sebelum menerapkan kontrak pintar.

Menerapkan kontrak juga membutuhkan ether (ETH) karena kontrak tersebut disimpan di blockchain, jadi Anda harus familier dengan [gas dan biaya](/developers/docs/gas/) di Ethereum.

Terakhir, Anda perlu mengompilasi kontrak Anda sebelum menerapkannya, jadi pastikan Anda telah membaca tentang [mengompilasi kontrak pintar](/developers/docs/smart-contracts/compiling/).

## Cara menerapkan kontrak pintar {#how-to-deploy-a-smart-contract}

### Apa yang Anda butuhkan {#what-youll-need}

- Bytecode kontrak Anda – ini dihasilkan melalui [kompilasi](/developers/docs/smart-contracts/compiling/)
- ETH untuk gas – Anda akan menetapkan batas gas Anda seperti transaksi lainnya, jadi ketahuilah bahwa penerapan kontrak membutuhkan lebih banyak gas daripada transfer ETH sederhana
- skrip atau plugin penerapan
- akses ke [node Ethereum](/developers/docs/nodes-and-clients/), baik dengan menjalankan node Anda sendiri, terhubung ke node publik, atau melalui kunci API menggunakan [layanan node](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Langkah-langkah untuk menerapkan kontrak pintar {#steps-to-deploy}

Langkah-langkah spesifik yang terlibat akan bergantung pada kerangka kerja pengembangan yang digunakan. Misalnya, Anda dapat memeriksa [dokumentasi Hardhat tentang penerapan kontrak Anda](https://hardhat.org/docs/tutorial/deploying) atau [dokumentasi Foundry tentang penerapan dan verifikasi kontrak pintar](https://book.getfoundry.sh/forge/deploying). Setelah diterapkan, kontrak Anda akan memiliki alamat Ethereum seperti [akun](/developers/docs/accounts/) lainnya dan dapat diverifikasi menggunakan [alat verifikasi kode sumber](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Alat terkait {#related-tools}

**Remix - _Remix IDE memungkinkan pengembangan, penerapan, dan pengelolaan kontrak pintar untuk blockchain yang mirip dengan Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Platform pengembangan web3 yang menyediakan debugging, observabilitas, dan blok bangunan infrastruktur untuk mengembangkan, menguji, memantau, dan mengoperasikan kontrak pintar_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentasi](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Lingkungan pengembangan untuk mengompilasi, menerapkan, menguji, dan men-debug perangkat lunak Ethereum Anda_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentasi tentang penerapan kontrak Anda](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Menerapkan kontrak apa pun dengan mudah ke rantai yang kompatibel dengan EVM, menggunakan satu perintah_**

- [Dokumentasi](https://portal.thirdweb.com/deploy/)

**Crossmint - _Platform pengembangan web3 tingkat perusahaan untuk menerapkan kontrak pintar, mengaktifkan pembayaran kartu kredit dan lintas rantai, serta menggunakan API untuk membuat, mendistribusikan, menjual, menyimpan, dan mengedit NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentasi](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Tutorial terkait {#related-tutorials}

- [Menerapkan kontrak pintar pertama Anda](/developers/tutorials/deploying-your-first-smart-contract/) _– Pengantar untuk menerapkan kontrak pintar pertama Anda di testnet Ethereum._
- [Hello World | tutorial kontrak pintar](/developers/tutorials/hello-world-smart-contract/) _– Tutorial yang mudah diikuti untuk membuat & menerapkan kontrak pintar dasar di Ethereum._
- [Berinteraksi dengan kontrak lain dari Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cara menerapkan kontrak pintar dari kontrak yang ada dan berinteraksi dengannya._
- [Cara memperkecil ukuran kontrak Anda](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Cara mengurangi ukuran kontrak Anda agar tetap di bawah batas dan menghemat gas_

## Bacaan lebih lanjut {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Menerapkan kontrak Anda dengan Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kerangka kerja pengembangan](/developers/docs/frameworks/)
- [Menjalankan node Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Node-sebagai-layanan (Nodes-as-a-service)](/developers/docs/nodes-and-clients/nodes-as-a-service)