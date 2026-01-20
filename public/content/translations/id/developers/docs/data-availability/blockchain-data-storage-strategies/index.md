---
title: Strategi Penyimpanan Data Blockchain
description: Ada beberapa cara untuk menyimpan data menggunakan blockchain. Artikel ini akan membandingkan berbagai strategi, biaya dan kompromi yang terkait, serta persyaratan untuk menggunakannya dengan aman.
lang: id
---

Ada beberapa cara untuk menyimpan informasi, baik secara langsung di blockchain, maupun dengan cara yang diamankan oleh blockchain:

- Blob EIP-4844
- Calldata
- Offchain dengan mekanisme L1
- "Code" kontrak
- Event
- Penyimpanan EVM

Pemilihan metode yang akan digunakan didasarkan pada beberapa kriteria:

- Sumber informasi. Informasi dalam calldata tidak dapat diambil secara langsung dari blockchain itu sendiri.
- Tujuan informasi. Calldata hanya tersedia dalam transaksi yang memuatnya. Event tidak dapat diakses secara langsung dalam onchain.
- Seberapa besar kesulitan yang bisa diterima? Komputer yang menjalankan full node dapat melakukan lebih banyak pemrosesan dibandingkan light client yang berjalan di aplikasi browser.
- Apakah perlu mempermudah akses informasi dari setiap node?
- Persyaratan keamanan.

## Persyaratan keamanan {#security-requirements}

Secara umum, keamanan informasi terdiri dari tiga atribut:

- _Kerahasiaan_, entitas yang tidak memiliki wewenang tidak diizinkan untuk membaca informasi. Ini penting dalam berbagai kasus, akan tetapi tidak dalam hal ini. _Tidak ada rahasia di rantai blok_. Blockchain berfungsi karena siapa pun dapat memverifikasi transisi statusnya, sehingga tidak mungkin menggunakannya untuk menyimpan rahasia secara langsung. Ada cara untuk menyimpan informasi rahasia di blockchain, tetapi semuanya bergantung pada komponen offchain untuk menyimpan setidaknya satu kunci.

- _Integritas berarti informasi tersebut benar, dan tidak dapat diubah oleh pihak yang tidak berwenang atau dengan cara yang tidak sah (misalnya, memindahkan [token ERC-20,](https://eips.ethereum.org/EIPS/eip-20#events)tanpa adanya event `Transfer`). Di blockchain, setiap node memverifikasi setiap perubahan status, yang memastikan keutuhannya.

- _Ketersediaan_, informasi tersedia untuk setiap entitas yang berwenang. Di blockchain, hal ini biasanya dicapai dengan memastikan informasi tersedia di setiap [node penuh] (https://ethereum.org/developers/docs/nodes-and-clients#full-node).

Berbagai solusi di sini semuanya memiliki integritas yang sangat baik, karena hash diposting di L1. Namun, jaminan ketersediaannya berbeda-beda.

## Persyaratan {#prerequisites}

Anda seharusnya mempunyai pemahaman yang baik tentang [dasar-dasar blockchain](/developers/docs/intro-to-ethereum/). Halaman ini juga menganggap bahwa pembaca sudah mengenal [blok](/developers/docs/blocks/), [transaksi](/developers/docs/transactions/), dan topik-topik terkait lainnya.

## Blob EIP-4844 {#eip-4844-blobs}

Dimulai dengan [hardfork Dencun] (https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) blockchain Ethereum termasuk [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), yang menambahkan data blob dengan masa hidup terbatas (pada awalnya sekitar [18 hari](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). Blob-blob ini diberi harga terpisah dari [gas eksekusi](/developers/docs/gas), meskipun menggunakan mekanisme yang mirip. Mereka adalah metode yang terjangkau untuk mengunggah data sementara.

Kegunaan utama untuk blob EIP-4844 adalah agar rollup dapat mempublikasikan transaksinya. [Optimistic rollups](/developers/docs/scaling/optimistic-rollups) perlu mempublikasikan transaksi pada blockchain mereka. Transaksi tersebut harus tersedia untuk siapapun selama [periode tantangan] (https://docs.optimism.io/connect/resources/glossary#challenge-period) agar [validator] (https://docs.optimism.io/connect/resources/glossary#validator) dapat memperbaiki kesalahan jika [sequencer] dari rollup (https://docs.optimism.io/connect/resources/glossary#sequencer) mengunggah state root yang salah.

Namun, setelah periode tantangan berakhir dan state root telah difinalisasi, tujuan utama mengetahui transaksi-transaksi ini adalah untuk mereplikasi state terkini dari rantai tersebut. Kondisi ini juga bisa diakses dari node rantai, dan memerlukan pemrosesan yang jauh lebih sedikit. Jadi informasi transaksi sebaiknya tetap disimoan di beberapa tempat, seperti [block explorers](/developers/docs/data-and-analytics/block-explorers), namun tidak perlu membayar tingkat perlindungan untuk sensor yang disediakan oleh Ethereum.

[Zero-knowledge rollups](/developers/docs/scaling/zk-rollups/#data-availability) juga mem-posting data transaksi mereka untuk memungkinkan node lain mereplikasi state yang ada dan memverifikasi bukti validitas, tetapi sekali lagi, ini adalah kebutuhan jangka pendek.

Saat menulis posting di EIP-4844 dikenakan biaya satu wei (10<sup>-18</sup> ETH) per byte, yang dapat diabaikan dibandingkan dengan [21.000 gas eksekusi yang dikenakan biaya transaksi apa pun, termasuk transaksi yang memposting gumpalan] (https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Anda dapat melihat harga terkini EIP-4844 di [blobscan.com](https://blobscan.com/blocks).

Berikut adalah alamat-alamat untuk melihat blob yang diposting oleh beberapa rollup terkenal.

| Rollup                               | Alamat kotak surat                                                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata mengacu pada byte yang dikirim sebagai bagian dari transaksi. Informasi ini disimpan sebagai bagian dari catatan permanen blockchain di dalam blok yang memuat transaksi tersebut.

Ini adalah metode paling murah untuk menyimpan data secara permanen di blockchain. Biaya per byte adalah 4 gas eksekusi (jika byte bernilai nol) atau 16 gas (untuk byte dengan nilai lainnya). Jika data dikompresi, yang merupakan praktik standar, maka setiap nilai byte sama kemungkinannya, sehingga biaya rata-rata kira-kira 15,95 gas per byte.

Pada saat penulisan, harga adalah 12 gwei per gas dan 2300 $ per ETH, yang berarti biaya kira-kira 45 sen per kilobyte. Karena ini adalah metode termurah sebelum EIP-4844, ini adalah metode rollup yang digunakan untuk menyimpan informasi transaksi, yang harus tersedia untuk [fault challenge] (https://docs.optimism.io/stack/protocol/overview#fault-proofs), tetapi tidak perlu dapat diakses secara langsung di dalam chain.

Berikut adalah alamat untuk melihat transaksi yang diposting oleh beberapa rollup terkenal.

| Rollup                               | Alamat kotak surat                                                                                                            |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Offchain dengan mekanisme L1 {#offchain-with-l1-mechs}

Tergantung pada pertimbangan keamanan Anda, mungkin saja menempatkan informasi di tempat lain dan menggunakan mekanisme yang memastikan data tersedia saat dibutuhkan. Ada dua persyaratan agar hal ini dapat dilakukan:

1. Posting [hash] (https://en.wikipedia.org/wiki/Cryptographic_hash_function) dari data pada blockchain, yang disebut dengan _input commitment_. Ini bisa berupa satu kata 32-byte, jadi tidak mahal. Selama input commitment tersedia, integritas terjamin karena tidak mungkin menemukan data lain yang menghasilkan nilai hash yang sama. Jadi, jika data yang diberikan salah, maka dapat terdeteksi.

2. Memiliki mekanisme yang memastikan ketersediaan. Sebagai contoh, di [Redstone] (https://redstone.xyz/docs/what-is-redstone), setiap node dapat mengirimkan tantangan ketersediaan. Jika sequencer tidak merespons onchain sebelum batas waktu, input commitment akan dibuang, sehingga informasi dianggap tidak pernah diposting.

Ini dapat diterima untuk optimistic rollup karena kita sudah mengandalkan setidaknya satu verifier yang jujur untuk state root. Verifier yang jujur tersebut juga akan memastikan bahwa ia memiliki data untuk memproses blok, dan akan mengeluarkan availability challenge jika informasi tidak tersedia di luar rantai. Jenis rollup optimis ini disebut [plasma] (/developers/docs/scaling/plasma/).

## Kode kontrak {#contract-code}

Informasi yang hanya perlu ditulis sekali, tidak pernah ditimpa, dan harus tersedia di onchain, dapat disimpan sebagai kode kontrak. Ini berarti kami membuat “kontrak pintar” dengan data dan kemudian menggunakan [`EXECODECOPY`](https://www.evm.codes/#3c?fork=shanghai) untuk membaca informasi. Keuntungannya adalah menyalin kode relatif murah.

Selain biaya perluasan memori, EXTCODECOPY dikenakan biaya 2600 gas untuk akses pertama ke kontrak (saat "cold") dan 100 gas untuk salinan berikutnya dari kontrak yang sama, ditambah 3 gas per 32 byte kata. Dibandingkan dengan calldata, yang harganya 15,95 per byte, ini lebih murah mulai dari sekitar 200 byte. Berdasarkan [rumus untuk biaya ekspansi memori] (https://www.evm.codes/about#memoryexpansion), selama Anda tidak memerlukan memori lebih dari 4MB, biaya ekspansi memori lebih kecil daripada biaya penambahan data panggilan.

Tentu saja, ini hanyalah biaya untuk _membaca_ data. Untuk membuat kontrak membutuhkan biaya sekitar 32.000 gas + 200 gas/byte. Metode ini hanya ekonomis jika informasi yang sama perlu dibaca berkali-kali dalam transaksi yang berbeda.

Kode kontrak bisa saja tidak masuk akal, asalkan tidak dimulai dengan `xEF`. Kontrak yang dimulai dengan `xEF` ditafsirkan sebagai [format objek ethereum] (https://notes.ethereum.org/@ipsilon/evm-object-format-overview), yang memiliki persyaratan yang lebih ketat.

## Peristiwa {#events}

[Peristiwa](https://docs.alchemy.com/docs/solidity-events) dipancarkan oleh smart contract, dan dibaca oleh perangkat lunak off-chain.
Keuntungannya adalah kode offchain dapat mendengarkan peristiwa. Biayanya adalah [gas](https://www.evm.codes/#a0?fork=cancun), 375 ditambah 8 gas per byte data. Pada 12 gwei/gas dan 2300 $/ETH, ini berarti satu sen ditambah 22 sen per kilobyte.

## Penyimpanan {#storage}

Kontrak pintar memiliki akses ke [penyimpanan persisten](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Namun, harganya sangat mahal. Menulis kata 32 byte ke slot penyimpanan yang sebelumnya kosong dapat [menghabiskan 22.100 gas](https://www.evm.codes/#55?fork=cancun). Pada 12 gwei/gas dan 2300 $/ETH, ini adalah sekitar 61 sen per operasi tulis, atau 19,5 dolar per kilobyte.

Ini adalah bentuk penyimpanan yang paling mahal di Ethereum.

## Rangkuman {#summary}

Tabel ini merangkum berbagai opsi yang tersedia beserta kelebihan dan kekurangannya.

| Jenis Penyimpanan            | Sumber data                          | Jaminan ketersediaan                                                                                                                                | Ketersediaan dalam Jaringan                                             | Keterbatasan tambahan                                            |
| ---------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Blob EIP-4844                | Di luar jaringan                     | Jaminan Ethereum selama [~18 hari](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Hanya hash yang tersedia                                                |                                                                  |
| Calldata                     | Di luar jaringan                     | Jaminan Ethereum selamanya (bagian dari blockchain)                                                                              | Hanya tersedia jika tertulis dalam kontrak, dan pada transaksi tersebut |                                                                  |
| Offchain dengan mekanisme L1 | Di luar jaringan                     | Jaminan “Satu verifikator yang jujur” selama periode tantangan                                                                                      | Hanya Hash                                                              | Dijamin oleh mekanisme tantangan, hanya selama periode tantangan |
| Kode Kontrak                 | Dalam Jaringan atau Di Luar Jaringan | Jaminan Ethereum selamanya (bagian dari blockchain)                                                                              | Ya                                                                      | Ditulis ke alamat “acak”, tidak dapat dimulai dengan `0xEF`      |
| Event                        | Dalam Jaringan                       | Jaminan Ethereum selamanya (bagian dari blockchain)                                                                              | Tidak                                                                   |                                                                  |
| Penyimpanan                  | Dalam Jaringan                       | Jaminan Ethereum selamanya (bagian dari blockchain dan status saat ini sampai ditimpa)                                           | Ya                                                                      |                                                                  |
