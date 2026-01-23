---
title: Menggunakan kontrak pintar
description: Pelajari cara menerapkan kontrak pintar ke jaringan Ethereum, termasuk prasyarat, alat, dan langkah-langkah penerapan.
lang: id
---

Anda perlu menggunakan kontrak pintar Anda agar kontrak pintar tersedia bagi pengguna jaringan Ethereum.

Untuk menggunakan kontrak pintar, Anda hanya perlu mengirim transaksi Ethereum yang berisi kode kontrak pintar yang dikompilasi tanpa menentukan penerima.

## Persyaratan {#prerequisites}

Anda harus memahami [jaringan Ethereum](/developers/docs/networks/), [transaksi](/developers/docs/transactions/) dan [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/) sebelum menyebarkan kontrak pintar.

Penyebaran kontrak juga memerlukan biaya ether (ETH) karena disimpan di rantai blok, jadi Anda harus memahami [gas dan biaya](/developers/docs/gas/) di Ethereum.

Terakhir, Anda harus mengompilasi kontrak Anda sebelum menyebarkannya, jadi pastikan Anda telah membaca tentang [mengompilasi kontrak pintar](/developers/docs/smart-contracts/compiling/).

## Cara menyebarkan kontrak pintar {#how-to-deploy-a-smart-contract}

### Apa yang Anda butuhkan {#what-youll-need}

- Kode bita kontrak Anda – ini dihasilkan melalui [kompilasi](/developers/docs/smart-contracts/compiling/)
- ETH untuk gas – Anda akan menentukan batas gas seperti transaksi lainnya, jadi ingatlah penggunaan kontrak memerlukan lebih banyak gas daripada transfer ETH sederhana
- skrip atan plugin penggunaan
- akses ke [simpul Ethereum](/developers/docs/nodes-and-clients/), baik dengan menjalankan milik Anda sendiri, terhubung ke simpul publik, atau melalui kunci API menggunakan [layanan simpul](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Langkah-langkah untuk menyebarkan kontrak pintar {#steps-to-deploy}

Langkah-langkah spesifik yang terlibat akan bergantung pada framework pengembangan yang digunakan. Sebagai contoh, Anda dapat memeriksa [dokumentasi Hardhat tentang penyebaran kontrak Anda](https://hardhat.org/docs/tutorial/deploying) atau [dokumentasi Foundry tentang penyebaran dan verifikasi kontrak pintar](https://book.getfoundry.sh/forge/deploying). Setelah disebarkan, kontrak Anda akan memiliki alamat Ethereum seperti [akun](/developers/docs/accounts/) lainnya dan dapat diverifikasi menggunakan [perangkat verifikasi kode sumber](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Perangkat terkait {#related-tools}

**Remix - _Remix IDE memungkinkan pengembangan, penyebaran, dan pengelolaan kontrak pintar untuk blockchain seperti Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Platform pengembangan Web3 yang menyediakan penelusuran kesalahan, observabilitas, dan elemen dasar penyusun infrastruktur untuk mengembangkan, menguji, memantau, dan menjalankan kontrak pintar_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentasi](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Lingkungan pengembangan untuk mengompilasi, menyebarkan, menguji, dan melakukan debug pada perangkat lunak Ethereum Anda_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentasi tentang menyebarkan kontrak Anda](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Sebarkan setiap kontrak dengan mudah ke setiap rantai yang kompatibel dengan EVM, dengan menggunakan satu perintah tunggal_**

- [Dokumentasi](https://portal.thirdweb.com/deploy/)

**Crossmint - _Platform pengembangan web3 kelas enterprise untuk menyebarkan kontrak pintar, memungkinkan pembayaran dengan kartu kredit dan lintas rantai, serta menggunakan API untuk membuat, mendistribusikan, menjual, menyimpan, dan mengedit NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentasi](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Tutorial terkait {#related-tutorials}

- [Menyebarkan kontrak pintar pertama Anda](/developers/tutorials/deploying-your-first-smart-contract/) _– Pengantar untuk menyebarkan kontrak pintar pertama Anda di jaringan uji Ethereum._
- [Hello World | tutorial kontrak pintar](/developers/tutorials/hello-world-smart-contract/) _– Tutorial yang mudah diikuti untuk membuat & menyebarkan kontrak pintar dasar di Ethereum._
- [Berinteraksi dengan kontrak lain dari Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cara menyebarkan kontrak pintar dari kontrak yang ada dan berinteraksi dengannya._
- [Cara memperkecil ukuran kontrak Anda](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Cara mengurangi ukuran kontrak Anda agar tetap di bawah batas dan menghemat gas_

## Bacaan lebih lanjut {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Menyebarkan kontrak Anda dengan Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kerangka kerja pengembangan](/developers/docs/frameworks/)
- [Menjalankan simpul Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Simpul-sebagai-Layanan](/developers/docs/nodes-and-clients/nodes-as-a-service)
