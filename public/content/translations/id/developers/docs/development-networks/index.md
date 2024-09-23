---
title: Jaringan Pengembangan
description: Gambaran umum tentang jaringan pengembangan dan peralatan yang tersedia untuk membantu menyusun aplikasi Ethereum.
lang: id
---

Ketika menyusun aplikasi Ethereum dengan kontrak pintar, Anda ingin menjalankannya pada jaringan lokal untuk melihat bagaimana cara kerjanya sebelum digunakan.

Mirip dengan cara Anda menjalankan server lokal di komputer Anda untuk pengembangan web, Anda bisa menggunakan jaringan pengembangan untuk membuat instance blockchain lokal guna menguji dapp. Jaringan pengembangan Ethereum ini menyediakan fitur yang memungkinkan pengulangan lebih cepat daripada testnet publik (contohnya, Anda tidak perlu menangani perolehan ETH dari keran testnet).

## Prasyarat {#prerequisites}

Anda harus memahami [dasar-dasar tentang tumpukan Ethereum](/developers/docs/ethereum-stack/) dan [jaringan Ethereum](/developers/docs/networks/) sebelum menyelami jaringan pengembangan.

## Apa yang dimaksud jaringan pengembangan? {#what-is-a-development-network}

Jaringan pengembangan pada dasarnya adalah klien Ethereum (implementasi Ethereum) yang didesain secara khusus untuk pengembangan lokal.

**Mengapa tidak menjalankan saja node Ethereum standar secara lokal?**

Anda _dapat_ [menjalankan node](/developers/docs/nodes-and-clients/#running-your-own-node) (seperti Geth, Erigon, atau Nethermind) tetapi karena jaringan pengembangan dibuat dengan tujuan untuk pengembangan, sering kali tersedia dengan fitur yang praktis seperti:

- Secara deterministik melakukan seeding terhadap blockchain lokal Anda dengan data (seperti akun dengan saldo ETH)
- Secara instan menambang blok dengan tiap transaksi yang diterima, secara berurutan dan tanpa penundaan
- Fungsionalitas pembuatan log dan melakukan debug yang disempurnakan

## Peralatan yang tersedia {#available-projects}

**Catatan**: Sebagian besar [kerangka kerja pengembangan](/developers/docs/frameworks/) menyertakan jaringan pengembangan bawaan. Kami menyarankan memulai dengan kerangka kerja untuk [menyiapkan lingkungan pengembangan lokal Anda](/developers/local-environment/).

### Jaringa Hardhat {#hardhat-network}

Jaringan Ethereum lokal yang didesain untuk pengembangan. Jaringan ini memungkinkan Anda menggunakan kontrak, menjalankan pengujian, dan melakukan debug kode Anda

Jaringan Hardhat tersedia dengan Hardhat bawaan, sebuah lingkungan pengembangan Ethereum untuk profesional.

- [Situs web](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kerangka kerja pengembangan](/developers/docs/frameworks/)
- [Menyiapkan lingkungan pengembangan lokal](/developers/local-environment/)
