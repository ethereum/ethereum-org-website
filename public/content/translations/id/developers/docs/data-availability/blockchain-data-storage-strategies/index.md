---
title: Strategi Penyimpanan Data Rantai Blok
description: Ada beberapa cara untuk menyimpan data menggunakan rantai blok. Artikel ini akan membandingkan berbagai strategi, biaya dan komprominya, serta persyaratan untuk menggunakannya dengan aman.
lang: id
---

Ada beberapa cara untuk menyimpan informasi baik secara langsung di rantai blok, atau dengan cara yang diamankan oleh rantai blok:

- Blob EIP-4844
- Calldata
- Offchain dengan mekanisme L1
- "Kode" kontrak
- Peristiwa
- Penyimpanan EVM

Pilihan metode mana yang akan digunakan didasarkan pada beberapa kriteria:

- Sumber informasi. Informasi dalam calldata tidak dapat berasal langsung dari rantai blok itu sendiri.
- Tujuan informasi. Calldata hanya tersedia dalam transaksi yang menyertakannya. Peristiwa sama sekali tidak dapat diakses secara onchain.
- Seberapa banyak kerumitan yang dapat diterima? Komputer yang menjalankan full node skala penuh dapat melakukan lebih banyak pemrosesan daripada klien ringan dalam aplikasi yang berjalan di peramban.
- Apakah perlu memfasilitasi akses mudah ke informasi dari setiap node?
- Persyaratan keamanan.

## Persyaratan keamanan {#security-requirements}

Secara umum, keamanan informasi terdiri dari tiga atribut:

- _Kerahasiaan_ (Confidentiality), entitas yang tidak berwenang tidak diizinkan untuk membaca informasi. Hal ini penting dalam banyak kasus, tetapi tidak di sini. _Tidak ada rahasia di rantai blok_. Rantai blok berfungsi karena siapa pun dapat memverifikasi transisi state, sehingga mustahil menggunakannya untuk menyimpan rahasia secara langsung. Ada cara untuk menyimpan informasi rahasia di rantai blok, tetapi semuanya bergantung pada beberapa komponen offchain untuk menyimpan setidaknya sebuah kunci.

- _Integritas_ (Integrity), informasi tersebut benar, tidak dapat diubah oleh entitas yang tidak berwenang, atau dengan cara yang tidak sah (misalnya, mentransfer [token ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) tanpa peristiwa `Transfer`). Di rantai blok, setiap node memverifikasi setiap perubahan state, yang memastikan integritas.

- _Ketersediaan_ (Availability), informasi tersedia untuk setiap entitas yang berwenang. Di rantai blok, hal ini biasanya dicapai dengan menyediakan informasi di setiap [full node](https://ethereum.org/developers/docs/nodes-and-clients/#full-node).

Berbagai solusi di sini semuanya memiliki integritas yang sangat baik, karena hash diposting di L1. Namun, solusi tersebut memiliki jaminan ketersediaan yang berbeda.

## Prasyarat {#prerequisites}

Anda harus memiliki pemahaman yang baik tentang [dasar-dasar rantai blok](/developers/docs/intro-to-ethereum/). Halaman ini juga mengasumsikan pembaca sudah familier dengan [blok](/developers/docs/blocks/), [transaksi](/developers/docs/transactions/), dan topik relevan lainnya.

## Blob EIP-4844 {#eip-4844-blobs}

Dimulai dengan [hardfork Dencun](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md), rantai blok Ethereum menyertakan [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), yang menambahkan blob data ke Ethereum dengan masa pakai terbatas (awalnya sekitar [18 hari](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)). Blob ini diberi harga secara terpisah dari [gas eksekusi](/developers/docs/gas), meskipun menggunakan mekanisme yang serupa. Blob ini adalah cara yang murah untuk memposting data sementara.

Kasus penggunaan utama untuk blob EIP-4844 adalah agar rollup dapat memublikasikan transaksinya. [Rollup Optimistic](/developers/docs/scaling/optimistic-rollups) perlu memublikasikan transaksi di rantai blok mereka. Transaksi tersebut harus tersedia bagi siapa saja selama [periode tantangan](https://docs.optimism.io/connect/resources/glossary#challenge-period) untuk memungkinkan [validator](https://docs.optimism.io/connect/resources/glossary#validator) memperbaiki kesalahan jika [sekuenser](https://docs.optimism.io/connect/resources/glossary#sequencer) rollup memposting akar state yang salah.

Namun, setelah periode tantangan berlalu dan akar state difinalisasi, tujuan yang tersisa untuk mengetahui transaksi ini adalah untuk mereplikasi state rantai saat ini. State ini juga tersedia dari node rantai, dengan pemrosesan yang jauh lebih sedikit. Jadi informasi transaksi harus tetap dipertahankan di beberapa tempat, seperti [penjelajah blok](/developers/docs/data-and-analytics/block-explorers), tetapi tidak perlu membayar untuk tingkat ketahanan sensor yang disediakan Ethereum.

[Rollup zero-knowledge](/developers/docs/scaling/zk-rollups/#data-availability) juga memposting data transaksinya untuk memungkinkan node lain mereplikasi state yang ada dan memverifikasi bukti validitas, tetapi sekali lagi itu adalah persyaratan jangka pendek.

Pada saat penulisan, memposting di EIP-4844 membutuhkan biaya satu Wei (10<sup>-18</sup> ETH) per bita, yang dapat diabaikan dibandingkan dengan [21.000 gas eksekusi yang dibutuhkan oleh transaksi apa pun, termasuk transaksi yang memposting blob](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Anda dapat melihat harga EIP-4844 saat ini di [blobscan.com](https://blobscan.com/blocks).

Berikut adalah alamat untuk melihat blob yang diposting oleh beberapa rollup terkenal.

| Rollup                               | Alamat kotak surat                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata mengacu pada bita yang dikirim sebagai bagian dari transaksi. Ini disimpan sebagai bagian dari catatan permanen rantai blok di dalam blok yang menyertakan transaksi tersebut.

Ini adalah metode termurah untuk menempatkan data secara permanen di rantai blok. Biaya per bita adalah 4 gas eksekusi (jika bitanya nol) atau 16 gas (nilai lainnya). Jika data dikompresi, yang merupakan praktik standar, maka setiap nilai bita memiliki kemungkinan yang sama, sehingga biaya rata-ratanya adalah sekitar 15,95 gas per bita.

Pada saat penulisan, harganya adalah 12 Gwei/gas dan 2300 $/ETH, yang berarti biayanya sekitar 45 sen per kilobita. Karena ini adalah metode termurah sebelum EIP-4844, ini adalah metode yang digunakan rollup untuk menyimpan informasi transaksi, yang harus tersedia untuk [tantangan kesalahan](https://docs.optimism.io/stack/protocol/overview#fault-proofs), tetapi tidak perlu dapat diakses secara langsung secara onchain.

Berikut adalah alamat untuk melihat transaksi yang diposting oleh beberapa rollup terkenal.

| Rollup                               | Alamat kotak surat                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Offchain dengan mekanisme L1 {#offchain-with-l1-mechs}

Bergantung pada kompromi keamanan Anda, mungkin dapat diterima untuk menempatkan informasi di tempat lain dan menggunakan mekanisme yang memastikan data tersedia saat dibutuhkan. Ada dua persyaratan agar ini berfungsi:

1. Memposting [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) data di rantai blok, yang disebut _komitmen input_ (input commitment). Ini bisa berupa kata 32-bita tunggal, sehingga tidak mahal. Selama komitmen input tersedia, integritas terjamin karena tidak mungkin menemukan data lain yang akan di-hash ke nilai yang sama. Jadi jika data yang salah diberikan, hal itu dapat dideteksi.

2. Memiliki mekanisme yang memastikan ketersediaan. Misalnya, di [Redstone](https://redstone.xyz/docs/what-is-redstone) node mana pun dapat mengajukan tantangan ketersediaan. Jika sekuenser tidak merespons secara onchain pada tenggat waktu, komitmen input dibuang, sehingga informasi tersebut dianggap tidak pernah diposting.

Ini dapat diterima untuk rollup Optimistic karena kita sudah mengandalkan setidaknya satu pemverifikasi yang jujur untuk akar state. Pemverifikasi yang jujur tersebut juga akan memastikan ia memiliki data untuk memproses blok, dan mengeluarkan tantangan ketersediaan jika informasi tersebut tidak tersedia secara offchain. Jenis rollup Optimistic ini disebut [Plasma](/developers/docs/scaling/plasma/).

## Kode kontrak {#contract-code}

Informasi yang hanya perlu ditulis sekali, tidak pernah ditimpa, dan harus tersedia secara onchain dapat disimpan sebagai kode kontrak. Ini berarti kita membuat "kontrak pintar" dengan data tersebut dan kemudian menggunakan [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) untuk membaca informasi tersebut. Keuntungannya adalah menyalin kode relatif murah.

Selain biaya ekspansi memori, `EXTCODECOPY` membutuhkan biaya 2600 gas untuk akses pertama ke kontrak (saat masih "dingin") dan 100 gas untuk salinan berikutnya dari kontrak yang sama ditambah 3 gas per kata 32 bita. Dibandingkan dengan calldata, yang membutuhkan biaya 15,95 per bita, ini lebih murah mulai dari sekitar 200 bita. Berdasarkan [rumus untuk biaya ekspansi memori](https://www.evm.codes/about#memoryexpansion), selama Anda tidak membutuhkan lebih dari 4MB memori, biaya ekspansi memori lebih kecil daripada biaya penambahan calldata.

Tentu saja, ini hanyalah biaya untuk _membaca_ data. Untuk membuat kontrak membutuhkan biaya sekitar 32.000 gas + 200 gas/bita. Metode ini hanya ekonomis ketika informasi yang sama perlu dibaca berkali-kali dalam transaksi yang berbeda.

Kode kontrak bisa saja tidak masuk akal, selama tidak dimulai dengan `0xEF`. Kontrak yang dimulai dengan `0xEF` ditafsirkan sebagai [format objek ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), yang memiliki persyaratan yang jauh lebih ketat.

## Peristiwa {#events}

[Peristiwa](https://docs.alchemy.com/docs/solidity-events) dipancarkan oleh kontrak pintar, dan dibaca oleh perangkat lunak offchain.
Keuntungannya adalah kode offchain dapat mendengarkan peristiwa. Biayanya adalah [gas](https://www.evm.codes/#a0?fork=cancun), 375 ditambah 8 gas per bita data. Pada 12 Gwei/gas dan 2300 $/ETH, ini berarti satu sen ditambah 22 sen per kilobita.

## Penyimpanan {#storage}

Kontrak pintar memiliki akses ke [penyimpanan persisten](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Namun, ini sangat mahal. Menulis kata 32 bita ke slot penyimpanan yang sebelumnya kosong dapat [membutuhkan biaya 22.100 gas](https://www.evm.codes/#55?fork=cancun). Pada 12 Gwei/gas dan 2300 $/ETH, ini sekitar 61 sen per operasi penulisan, atau $19,5 per kilobita.

Ini adalah bentuk penyimpanan paling mahal di Ethereum.

## Ringkasan {#summary}

Tabel ini merangkum berbagai opsi, serta kelebihan dan kekurangannya.

| Jenis penyimpanan                | Sumber data      | Jaminan ketersediaan                                                                                                             | Ketersediaan onchain                                             | Batasan tambahan                                                  |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Blob EIP-4844              | Offchain            | Jaminan Ethereum selama [~18 hari](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | Hanya hash yang tersedia                                           |                                                                         |
| Calldata                    | Offchain            | Jaminan Ethereum selamanya (bagian dari rantai blok)                                                                                | Hanya tersedia jika ditulis ke kontrak, dan pada transaksi tersebut |
| Offchain dengan mekanisme L1 | Offchain            | Jaminan "satu pemverifikasi jujur" selama periode tantangan                                                                        | Hanya hash                                                        | Dijamin oleh mekanisme tantangan, hanya selama periode tantangan |
| Kode kontrak               | Onchain atau offchain | Jaminan Ethereum selamanya (bagian dari rantai blok)                                                                                | Ya                                                              | Ditulis ke alamat "acak", tidak dapat dimulai dengan `0xEF`                 |
| Peristiwa                      | Onchain             | Jaminan Ethereum selamanya (bagian dari rantai blok)                                                                                | Tidak                                                               |
| Penyimpanan                     | Onchain             | Jaminan Ethereum selamanya (bagian dari rantai blok dan state saat ini hingga ditimpa)                                        | Ya                                                              |