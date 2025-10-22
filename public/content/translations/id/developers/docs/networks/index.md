---
title: Jaringan
description: Sebuah gambaran umum tentang jaringan Ethereum dan di mana mendapatkan ether (ETH) testnet untuk menguji aplikasi Anda.
lang: id
---

Karena Ethereum adalah sebuah protokol, ini berarti ada beberapa "jaringan" independen yang sesuai dengan protokol ini yang tidak berinteraksi satu sama lain.

Jaringan adalah lingkungan Ethereum berbeda yang bisa Anda akses untuk kasus penggunaan pengembangan, pengujian, atau produksi. Akun Ethereum Anda akan berfungsi di berbagai jaringan tapi saldo akun dan riwayat transaksi Anda tidak akan dibawa dari jaringan Ethereum utama. Untuk tujuan pengujian, akan berguna jika mengetahui jaringan mana yang tersedia dan bagaimana mendapat ETH testnet sehingga Anda bisa melakukan uji coba dengannya.

## Prasyarat {#prerequisites}

Anda harus mengerti konsep dasar tentang Ethereum sebelum membaca lebih banyak tentang jaringan berbeda karena jaringan percobaan akan memberi Anda versi Ethereum yang murah dan aman untuk keperluan uji coba. Coba [pengantar Ethereum](/developers/docs/intro-to-ethereum/) kami.

## Jaringan publik {#public-networks}

Jaringan publik dapat diakses siapa saja di dalam dunia dengan koneksi internet. Siapa pun bisa membaca atau membuat transaksi pada blockchain publik dan memvalidasi transaksi yang sedang dijalankan. Persetujuan transaksi dan state jaringan ditentukan oleh konsensus rekan sejawat.

### Jaringan Utama {#mainnet}

Jaringan Utama adalah blokchain produksi Ethereum publik yang utama, di mana transaksi dengan nilai sebenarnya terjadi pada buku besar terdistribusi.

Saat orang-orang dan bursa membahas harga ETH, mereka sedang berbicara tentang Jaringan Utama ETH.

### Jaringan percobaan {#testnets}

Selain Jaringan Utama, ada testnet publik. Ini adalah jaringan yang digunakan pengembang protokol atau kontrak pintar untuk menguji peningkatan protokol serta kontrak pintar potensial dalam lingkungan yang menyerupai produksi sebelum proses penerapan ke Jaringan Utama. Anggap ini sebagai analog dari server produksi versus server pementasan.

Secara umum, penting menguji kode kontrak apa pun yang Anda tulis di testnet sebelum menerapkannya ke Jaringan Utama. Jika Anda menyusun sebuah dapp yang terintegrasi dengan kontrak pintar yang telah ada, sebagian besar proyek memiliki salinan yang diterapkan ke testnet tempat Anda berinteraksi.

Kebanyakan testnet menggunakan mekanisme konsensus bukti otoritas. Ini berarti sejumlah kecil node dipilih untuk memvalidasi transaksi dan membuat blok baru - mempertaruhkan identitas mereka dalam prosesnya. Sulit untuk memberi insentif terhadap penambangan pada testnet bukti kerja yang bisa membuatnya rentan terhadap serangan.

ETH dalam testnet tidak punya nilai sebenarnya; oleh karena itu, tidak ada pasar untuk ETH testnet. Karena Anda membutuhkan ETH untuk benar-benar berinteraksi dengan Ethereum, kebanyakan orang mendapatkan ETH testnet dari keran. Sebagian besar keran adalah aplikasi web tempat Anda dapat memasukkan alamat pengiriman ETH yang Anda minta.

#### Testnet mana yang harus digunakan?

Dua testnet publik yang saat ini dikelola oleh pengembang klien adalah Sepolia dan Hoodi. Sepolia adalah jaringan bagi pengembang kontrak dan aplikasi untuk menguji aplikasi mereka. Jaringan Hoodi memungkinkan pengembang protokol menguji peningkatan jaringan, dan memungkinkan para staker menguji validator.

#### Sepolia {#sepolia}

**Sepolia adalah testnet yang direkomendasikan untuk pengembangan aplikasi**. Jaringan Sepolia menggunakan set validator yang diizinkan. Ini cukup baru, yang berarti statusnya dan riwayatnya lebih ringan. Ini berarti jaringan disinkronkan dengan cepat dan menjalankan node membutuhkan lebih sedikit penyimpanan. Ini berguna bagi pengguna yang ingin menjalankan node dengan cepat dan terhubung langsung dengan jaringan.

- Set validator tertutup, dikelola oleh tim klien & pengujian
- Testnet baru, lebih sedikit aplikasi yang diterapkan daripada testnet lain
- Sinkronisasi cepat dan menjalankan node membutuhkan sedikit penyimpanan

##### Sumber daya

- [Situs web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucet

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW Faucet](https://sepolia-faucet.pk910.de/)
- [Coinbase Wallet Faucet | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet)
- [Chainstack Sepolia Faucet](https://faucet.chainstack.com/sepolia-faucet)
- [Ethereum Ecosystem Faucet](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Hoodi {#hoodi}

Hoodi adalah testnet untuk pengujian validasi dan staking. Jaringan Hoodi terbuka bagi pengguna yang ingin menjalankan validator testnet. Oleh karena itu, staker yang ingin menguji peningkatan protokol sebelum penerapan ke Jaringan Utama harus menggunakan Hoodi.

- Set validator terbuka, staker dapat menguji peningkatan jaringan
- Status besar, berguna untuk menguji interaksi kontrak pintar yang kompleks
- Membutuhkan waktu lebih lama untuk sinkronisasi dan lebih banyak penyimpanan untuk menjalankan node

##### Sumber daya

- [Situs web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)

##### Faucet

- [Hoodi Faucet](https://hoodi.ethpandaops.io/)

Untuk meluncurkan validator di testnet Hoodi, gunakan [launchpad validator Hoodi](https://hoodi.launchpad.ethereum.org/id/).

### Testnet lapisan ke-2 {#layer-2-testnets}

[Lapisan ke-2 (L2)](/layer-2/) adalah istilah kolektif untuk solusi penskalaan Ethereum. Lapisan ke-2 adalah blockchain terpisah yang memperluas Ethereum dan mewarisi jaminan keamanan Ethereum. Testnet lapisan ke-2 biasanya terhubung erat dengan testnet publik Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Testnet untuk [Arbitrum](https://arbitrum.io/).

##### Faucet

- [Chainlink Faucet](https://faucets.chain.link/)
- [Alchemy Faucet](https://sepoliafaucet.com/)

#### Optimistic Sepolia {#optimistic-sepolia}

Testnet untuk [Optimism](https://www.optimism.io/).

##### Faucet

- [Paradigm Faucet](https://faucet.paradigm.xyz/)
- [Coinbase Wallet Faucet | Optimism Sepolia](https://coinbase.com/faucets/optimism-sepolia-faucet)
- [Alchemy Faucet](https://sepoliafaucet.com/)

#### Starknet Sepolia {#starknet-sepolia}

Testnet untuk [Starknet](https://www.starknet.io).

##### Faucet

- [Starknet Faucet](https://faucet.sepolia.starknet.io)
- [Alchemy Faucet](https://sepoliafaucet.com/)

## Jaringan privat {#private-networks}

Jaringan Ethereum adalah jaringan privat jika nodenya tidak terhubung dengan jaringan publik (mis. Jaringan Utama atau testnet). Dalam konteks ini, privat hanya berarti sudah disimpan atau diisolasi, alih-alih dilindungi atau aman.

### Jaringan pengembangan {#development-networks}

Untuk mengembangkan aplikasi Ethereum, Anda ingin menjalankannya di jaringan privat untuk melihat cara kerjanya sebelum menerapkannya. Serupa dengan cara Anda membuat server lokal pada komputer untuk pengembangan web, Anda bisa membuat instance blockchain lokal untuk menguji dapp Anda. Ini memungkinkan proses pengulangan yang lebih cepat daripada testnet publik.

Ada proyek dan peralatan yang didedikasikan untuk membantu proses ini. Pelajari lebih lanjut tentang [jaringan pengembangan](/developers/docs/development-networks/).

### Jaringan Konsorsium {#consortium-networks}

Proses konsensusnya dikendalikan oleh kumpulan node tepercaya yang telah ditentukan sebelumnya. Sebagai contoh, jaringan privat dari institusi akademis terkenal yang masing-masing mengurus satu node, dan blok divalidasi oleh ambang batas penandatangan dalam jaringan.

Jika jaringan Ethereum publik seperti internet publik, Anda bisa menganggap jaringan konsorsium sebagai intranet privat.

## Alat terkait {#related-tools}

- [Chainlist](https://chainlist.org/) _daftar jaringan EVM untuk menghubungkan dompet dan para penyedia dengan ID Rantai dan ID Jaringan yang sesuai_
- [Rantai berbasis EVM](https://github.com/ethereum-lists/chains) _repo rantai metadata GitHub yang menggerakkan Chainlist_

## Bacaan lebih Lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
