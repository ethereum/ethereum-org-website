---
title: Jaringan Pengembangan
description: Gambaran umum tentang jaringan pengembangan dan peralatan yang tersedia untuk membantu menyusun aplikasi Ethereum.
lang: id
---

Ketika menyusun aplikasi Ethereum dengan kontrak pintar, Anda ingin menjalankannya pada jaringan lokal untuk melihat bagaimana cara kerjanya sebelum digunakan.

Mirip dengan cara Anda menjalankan server lokal di komputer Anda untuk pengembangan web, Anda bisa menggunakan jaringan pengembangan untuk membuat instance blockchain lokal guna menguji dapp. Jaringan pengembangan Ethereum ini menyediakan fitur yang memungkinkan pengulangan lebih cepat daripada testnet publik (contohnya, Anda tidak perlu menangani perolehan ETH dari keran testnet).

## Persyaratan {#prerequisites}

Anda harus memahami [dasar-dasar tumpukan Ethereum](/developers/docs/ethereum-stack/) dan [jaringan Ethereum](/developers/docs/networks/) sebelum menyelami jaringan pengembangan.

## Apa yang dimaksud jaringan pengembangan? {#what-is-a-development-network}

Jaringan pengembangan pada dasarnya adalah klien Ethereum (implementasi Ethereum) yang didesain secara khusus untuk pengembangan lokal.

**Mengapa tidak menjalankan saja node Ethereum standar secara lokal?**

Anda _dapat_ [menjalankan sebuah node](/developers/docs/nodes-and-clients/#running-your-own-node) tetapi karena jaringan pengembangan dibuat khusus untuk pengembangan, jaringan tersebut sering kali dilengkapi dengan fitur-fitur praktis seperti:

- Secara deterministik melakukan seeding terhadap rantai blok lokal Anda dengan data (misalnya, akun dengan saldo ETH)
- Menghasilkan blok secara instan dengan setiap transaksi yang diterimanya, secara berurutan dan tanpa penundaan
- Fungsionalitas pembuatan log dan melakukan debug yang disempurnakan

## Perangkat yang tersedia {#available-projects}

**Catatan**: Sebagian besar [kerangka kerja pengembangan](/developers/docs/frameworks/) menyertakan jaringan pengembangan bawaan. Kami menyarankan untuk memulai dengan kerangka kerja untuk [menyiapkan lingkungan pengembangan lokal Anda](/developers/local-environment/).

### Jaringan Hardhat {#hardhat-network}

Jaringan Ethereum lokal yang didesain untuk pengembangan. Jaringan ini memungkinkan Anda menggunakan kontrak, menjalankan pengujian, dan melakukan debug kode Anda.

Jaringan Hardhat tersedia dengan Hardhat bawaan, sebuah lingkungan pengembangan Ethereum untuk profesional.

- [Situs Web](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Rantai Suar Lokal {#local-beacon-chains}

Beberapa klien konsensus memiliki alat bawaan untuk memutar rantai suar lokal untuk tujuan pengujian. Petunjuk untuk Lighthouse, Nimbus dan Lodestar tersedia:

- [Testnet lokal menggunakan Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Testnet lokal menggunakan Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Testchain Ethereum Publik {#public-beacon-testchains}

Ada juga dua implementasi uji publik Ethereum yang dikelola: Sepolia dan Hoodi. Testnet yang direkomendasikan dengan dukungan jangka panjang adalah Hoodi, yang bisa divalidasi oleh siapa saja. Sepolia menggunakan himpunan sistem validator terbatas, sehingga tidak ada akses umum untuk menambahkan validator baru pada testnet ini.

- [Hoodi Staking Launchpad](https://hoodi.launchpad.ethereum.org/)

### Paket Kurtosis Ethereum {#kurtosis}

Kurtosis adalah sistem pembangunan untuk lingkungan pengujian multi-kontainer yang memungkinkan pengembang untuk secara lokal menjalankan contoh jaringan blockchain yang dapat direproduksi.

Paket Ethereum Kurtosis dapat digunakan untuk dengan cepat membuat testnet Ethereum yang dapat diparameterisasi, sangat skalabel, dan privat di atas Docker atau Kubernetes. Paket ini mendukung semua klien utama pada Execution Layer (EL) dan Consensus Layer (CL). Kurtosis secara otomatis menangani seluruh pemetaan port lokal dan koneksi layanan untuk jaringan representatif yang digunakan dalam validasi serta alur kerja pengujian yang berkaitan dengan infrastruktur inti Ethereum.

- [Paket jaringan Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Situs Web](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Dokumentasi](https://docs.kurtosis.com/)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kerangka kerja pengembangan](/developers/docs/frameworks/)
- [Menyiapkan lingkungan pengembangan lokal](/developers/local-environment/)
