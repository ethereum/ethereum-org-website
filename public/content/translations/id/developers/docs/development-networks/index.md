---
title: Jaringan Pengembangan
description: Gambaran umum tentang jaringan pengembangan dan alat yang tersedia untuk membantu membangun aplikasi Ethereum.
lang: id
---

Saat membangun aplikasi [Ethereum](/) dengan kontrak pintar, Anda akan ingin menjalankannya di jaringan lokal untuk melihat bagaimana cara kerjanya sebelum menerapkannya.

Mirip dengan bagaimana Anda mungkin menjalankan server lokal di komputer Anda untuk pengembangan web, Anda dapat menggunakan jaringan pengembangan untuk membuat instans blockchain lokal untuk menguji dapp Anda. Jaringan pengembangan Ethereum ini menyediakan fitur yang memungkinkan iterasi yang jauh lebih cepat daripada testnet publik (misalnya Anda tidak perlu berurusan dengan mendapatkan ETH dari faucet testnet).

## Prasyarat {#prerequisites}

Anda harus memahami [dasar-dasar tumpukan Ethereum](/developers/docs/ethereum-stack/) dan [jaringan Ethereum](/developers/docs/networks/) sebelum menyelami jaringan pengembangan.

## Apa itu jaringan pengembangan? {#what-is-a-development-network}

Jaringan pengembangan pada dasarnya adalah klien Ethereum (implementasi Ethereum) yang dirancang khusus untuk pengembangan lokal.

**Mengapa tidak menjalankan node Ethereum standar secara lokal saja?**

Anda _bisa_ [menjalankan node](/developers/docs/nodes-and-clients/#running-your-own-node) tetapi karena jaringan pengembangan dibangun khusus untuk pengembangan, mereka sering kali dilengkapi dengan fitur-fitur praktis seperti:

- Mengisi blockchain lokal Anda dengan data secara deterministik (misalnya, akun dengan saldo ETH)
- Menghasilkan blok secara instan dengan setiap transaksi yang diterimanya, secara berurutan dan tanpa penundaan
- Fungsionalitas debugging dan pencatatan (logging) yang ditingkatkan

## Alat yang tersedia {#available-projects}

**Catatan**: Sebagian besar [kerangka kerja pengembangan](/developers/docs/frameworks/) menyertakan jaringan pengembangan bawaan. Kami menyarankan untuk memulai dengan kerangka kerja untuk [menyiapkan lingkungan pengembangan lokal Anda](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

Jaringan Ethereum lokal yang dirancang untuk pengembangan. Ini memungkinkan Anda untuk menerapkan kontrak Anda, menjalankan pengujian Anda, dan men-debug kode Anda.

Hardhat Network hadir sebagai bawaan dengan Hardhat, lingkungan pengembangan Ethereum untuk para profesional.

- [Situs Web](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Beacon Chain Lokal {#local-beacon-chains}

Beberapa klien konsensus memiliki alat bawaan untuk memutar beacon chain lokal untuk tujuan pengujian. Instruksi untuk Lighthouse, Nimbus, dan Lodestar tersedia:

- [Testnet lokal menggunakan Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Testnet lokal menggunakan Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Rantai Uji Ethereum Publik {#public-beacon-testchains}

Ada juga dua implementasi pengujian publik Ethereum yang dipelihara: Sepolia dan Hoodi. Testnet yang direkomendasikan dengan dukungan jangka panjang adalah Hoodi, di mana siapa pun bebas untuk memvalidasi. Sepolia menggunakan set validator berizin, yang berarti tidak ada akses umum ke validator baru di testnet ini.

- [Hoodi Staking Launchpad](https://hoodi.launchpad.ethereum.org/)

### Paket Ethereum Kurtosis {#kurtosis}

Kurtosis adalah sistem pembangunan untuk lingkungan pengujian multi-kontainer yang memungkinkan pengembang untuk memutar instans jaringan blockchain yang dapat direproduksi secara lokal.

Paket Ethereum Kurtosis dapat digunakan untuk dengan cepat membuat instans testnet Ethereum pribadi yang dapat diparameterisasi, sangat terukur, dan melalui Docker atau Kubernetes. Paket ini mendukung semua klien Lapisan Eksekusi (EL) dan Lapisan Konsensus (CL) utama. Kurtosis dengan anggun menangani semua pemetaan port lokal dan koneksi layanan untuk jaringan representatif yang akan digunakan dalam alur kerja validasi dan pengujian yang berkaitan dengan infrastruktur inti Ethereum.

- [Paket jaringan Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Situs Web](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Dokumentasi](https://docs.kurtosis.com/)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kerangka kerja pengembangan](/developers/docs/frameworks/)
- [Menyiapkan lingkungan pengembangan lokal](/developers/local-environment/)

## Tutorial: Jaringan pengembangan & lingkungan pengujian di Ethereum {#tutorials}

- [Mengembangkan dan menguji dApps dengan testnet Ethereum lokal multi-klien](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Cara memutar testnet Ethereum multi-klien lokal dengan Kurtosis untuk pengembangan dan pengujian dApp._