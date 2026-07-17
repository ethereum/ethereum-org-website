---
title: Arsitektur node
description: Pengantar tentang bagaimana node Ethereum diatur.
lang: id
---

Sebuah node Ethereum terdiri dari dua klien: [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) dan [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients). Agar sebuah node dapat mengusulkan blok baru, node tersebut juga harus menjalankan [klien validator](#validators).

Ketika Ethereum menggunakan [Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow/), klien eksekusi sudah cukup untuk menjalankan node Ethereum penuh. Namun, sejak menerapkan [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/), klien eksekusi harus digunakan bersama dengan perangkat lunak lain yang disebut [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients).

Diagram di bawah ini menunjukkan hubungan antara kedua klien Ethereum. Kedua klien terhubung ke jaringan peer-to-peer (P2P) mereka masing-masing. Jaringan P2P yang terpisah diperlukan karena klien eksekusi menyebarkan transaksi melalui jaringan P2P mereka, yang memungkinkan mereka untuk mengelola pool transaksi lokal mereka, sementara klien konsensus menyebarkan blok melalui jaringan P2P mereka, yang memungkinkan konsensus dan pertumbuhan rantai.

![Diagram of Ethereum node architecture showing execution and consensus layers](node-architecture-text-background.png)

_Ada beberapa opsi untuk klien eksekusi termasuk Erigon, Nethermind, dan Besu_.

Agar struktur dua klien ini berfungsi, klien konsensus harus meneruskan bundel transaksi ke klien eksekusi. Klien eksekusi mengeksekusi transaksi secara lokal untuk memvalidasi bahwa transaksi tersebut tidak melanggar aturan Ethereum apa pun dan bahwa pembaruan yang diusulkan pada state Ethereum sudah benar. Ketika sebuah node dipilih menjadi produsen blok, instans klien konsensusnya meminta bundel transaksi dari klien eksekusi untuk disertakan dalam blok baru dan mengeksekusinya untuk memperbarui state global. Klien konsensus menggerakkan klien eksekusi melalui koneksi RPC lokal menggunakan [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Apa yang dilakukan klien eksekusi? {#execution-client}

Klien eksekusi bertanggung jawab atas validasi, penanganan, dan penyebaran transaksi, bersama dengan manajemen state dan mendukung Ethereum Virtual Machine ([EVM](/developers/docs/evm/)). Klien ini **tidak** bertanggung jawab atas pembuatan blok, penyebaran blok, atau penanganan logika konsensus. Hal-hal tersebut berada dalam wewenang klien konsensus.

Klien eksekusi membuat muatan eksekusi - daftar transaksi, trie keadaan yang diperbarui, dan data terkait eksekusi lainnya. Klien konsensus menyertakan muatan eksekusi di setiap blok. Klien eksekusi juga bertanggung jawab untuk mengeksekusi ulang transaksi di blok baru untuk memastikan bahwa transaksi tersebut valid. Mengeksekusi transaksi dilakukan pada komputer tertanam klien eksekusi, yang dikenal sebagai [Ethereum Virtual Machine (EVM)](/developers/docs/evm).

Klien eksekusi juga menawarkan antarmuka pengguna ke Ethereum melalui [metode RPC](/developers/docs/apis/json-rpc) yang memungkinkan pengguna untuk meminta data dari rantai blok Ethereum, mengirimkan transaksi, dan menyebarkan kontrak pintar. Panggilan RPC umumnya ditangani oleh pustaka seperti [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/), atau oleh antarmuka pengguna seperti dompet peramban.

Singkatnya, klien eksekusi adalah:

- gerbang pengguna ke Ethereum
- rumah bagi Ethereum Virtual Machine, state Ethereum, dan pool transaksi.

## Apa yang dilakukan klien konsensus? {#consensus-client}

Klien konsensus menangani semua logika yang memungkinkan sebuah node untuk tetap tersinkronisasi dengan jaringan Ethereum. Ini termasuk menerima blok dari rekan (peer) dan menjalankan algoritme pilihan cabang untuk memastikan node selalu mengikuti rantai dengan akumulasi atestasi terbesar (ditimbang berdasarkan saldo efektif validator). Mirip dengan klien eksekusi, klien konsensus memiliki jaringan P2P mereka sendiri yang melaluinya mereka berbagi blok dan atestasi.

Klien konsensus tidak berpartisipasi dalam melakukan atestasi atau mengusulkan blok - ini dilakukan oleh validator, sebuah pengaya opsional untuk klien konsensus. Klien konsensus tanpa validator hanya mengikuti bagian terdepan dari rantai, yang memungkinkan node untuk tetap tersinkronisasi. Hal ini memungkinkan pengguna untuk bertransaksi dengan Ethereum menggunakan klien eksekusi mereka, dengan keyakinan bahwa mereka berada di rantai yang benar.

## Validator {#validators}

Melakukan staking dan menjalankan perangkat lunak validator membuat sebuah node memenuhi syarat untuk dipilih guna mengusulkan blok baru. Operator node dapat menambahkan validator ke klien konsensus mereka dengan menyetorkan 32 ETH ke dalam kontrak deposit. Klien validator dibundel dengan klien konsensus dan dapat ditambahkan ke node kapan saja. Validator menangani atestasi dan proposal blok. Ini juga memungkinkan node untuk mengumpulkan hadiah atau kehilangan ETH melalui penalti atau pemotongan.

[Lebih lanjut tentang staking](/staking/).

## Perbandingan komponen node {#node-comparison}

| Klien Eksekusi                                     | Klien Konsensus                                                                                                                                           | Validator                    |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Menyebarkan transaksi melalui jaringan P2P-nya     | Menyebarkan blok dan atestasi melalui jaringan P2P-nya                                                                                                    | Mengusulkan blok             |
| Mengeksekusi/mengeksekusi ulang transaksi          | Menjalankan algoritme pilihan cabang                                                                                                                      | Mengumpulkan hadiah/penalti  |
| Memverifikasi perubahan state yang masuk           | Melacak bagian terdepan dari rantai                                                                                                                       | Membuat atestasi             |
| Mengelola trie keadaan dan tanda terima            | Mengelola state Beacon (berisi info konsensus dan eksekusi)                                                                                               | Membutuhkan 32 ETH untuk di-stake |
| Membuat muatan eksekusi                            | Melacak akumulasi keacakan di RANDAO (sebuah algoritme yang menyediakan keacakan yang dapat diverifikasi untuk pemilihan validator dan operasi konsensus lainnya) | Dapat mengalami pemotongan   |
| Mengekspos API JSON-RPC untuk berinteraksi dengan Ethereum | Melacak justifikasi dan finalisasi                                                                                                                        |                              |

## Bacaan lebih lanjut {#further-reading}

- [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos)
- [Proposal blok](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Hadiah dan penalti validator](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)