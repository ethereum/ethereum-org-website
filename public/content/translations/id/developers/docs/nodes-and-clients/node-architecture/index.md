---
title: Arsitektur node
description: Pengantar tentang bagaimana simpul Ethereum diatur.
lang: id
---

Sebuah simpul Ethereum terdiri dari dua klien: [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) dan [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients). Agar sebuah simpul dapat mengusulkan blok baru, simpul tersebut juga harus menjalankan [klien validator](#validators).

Ketika Ethereum menggunakan [proof-of-work](/developers/docs/consensus-mechanisms/pow/), sebuah klien eksekusi sudah cukup untuk menjalankan simpul Ethereum penuh. Namun, sejak mengimplementasikan [proof-of-stake](/developers/docs/consensus-mechanisms/pow/), klien eksekusi harus digunakan bersama dengan perangkat lunak lain yang disebut [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients).

Diagram di bawah ini menunjukkan hubungan antara dua klien Ethereum. Kedua klien terhubung ke jaringan peer-to-peer (P2P) masing-masing. Jaringan P2P yang terpisah diperlukan karena klien eksekusi gosip transaksi melalui jaringan P2P mereka, memungkinkan mereka untuk mengelola kumpulan transaksi lokal mereka, sementara klien konsensus menggosipkan blok melalui jaringan P2P mereka, memungkinkan konsensus dan pertumbuhan rantai.

![](node-architecture-text-background.png)

_Ada beberapa pilihan untuk klien eksekusi termasuk Erigon, Nethermind, dan Besu_.

Agar struktur dua klien ini berfungsi, klien konsensus harus meneruskan kumpulan transaksi ke klien eksekusi. Klien eksekusi transaksi secara lokal untuk memvalidasi bahwa transaksi tersebut tidak melanggar aturan Ethereum apa pun dan bahwa pembaruan yang diusulkan pada status Ethereum sudah benar. Saat sebuah node dipilih menjadi produsen blok, instans klien konsensusnya meminta kumpulan transaksi dari klien eksekusi untuk disertakan dalam blok baru dan mengeksekusinya guna memperbarui status global. Klien konsensus menggerakkan klien eksekusi melalui koneksi RPC lokal menggunakan [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Apa yang dilakukan klien eksekusi? {#execution-client}

Klien eksekusi bertanggung jawab atas validasi, penanganan, dan gosip transaksi, bersama dengan manajemen state dan mendukung Mesin Virtual Ethereum ([EVM](/developers/docs/evm/)). Ini **tidak** bertanggung jawab atas pembangunan blok, gosip blok, atau penanganan logika konsensus. Hal ini merupakan kewenangan klien konsensus.

Klien eksekusi membuat muatan eksekusi - daftar transaksi, pengadilan negara yang diperbarui, dan data terkait eksekusi lainnya. Klien konsensus menyertakan muatan eksekusi di setiap blok. Klien eksekusi juga bertanggung jawab untuk eksekusi ulang transaksi di blok baru untuk memastikan transaksi tersebut valid. Eksekusi transaksi dilakukan pada komputer tertanam klien eksekusi, yang dikenal sebagai [Mesin Virtual Ethereum (EVM)](/developers/docs/evm).

Klien eksekusi juga menawarkan antarmuka pengguna ke Ethereum melalui [metode RPC](/developers/docs/apis/json-rpc) yang memungkinkan pengguna untuk membuat kueri ke rantai blok Ethereum, mengirimkan transaksi, dan menyebarkan kontrak pintar. Umumnya, panggilan RPC ditangani oleh sebuah pustaka seperti [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/), atau oleh antarmuka pengguna seperti dompet browser.

Singkatnya, klien eksekusi adalah:

- gerbang pengguna ke Ethereum
- rumah bagi Mesin Virtual Ethereum, negara dan kumpulan transaksi Ethereum.

## Apa yang dilakukan klien konsensus? {#consensus-client}

Klien konsensus berurusan dengan semua logika yang memungkinkan sebuah simpul untuk tetap sinkron dengan jaringan Ethereum. Ini termasuk menerima blok dari rekan-rekan dan menjalankan algoritma pilihan fork untuk memastikan simpul selalu mengikuti rantai dengan akumulasi pengesahan terbesar (dibobot oleh saldo efektif validator). Serupa dengan klien eksekusi, klien konsensus memiliki jaringan P2P mereka sendiri yang digunakan untuk berbagi blok dan pengesahan.

Klien konsensus tidak berpartisipasi dalam membuktikan atau mengusulkan blok - ini dilakukan oleh validator, sebuah tambahan opsional untuk klien konsensus. Klien konsensus tanpa validator hanya mengikuti kepala rantai, yang memungkinkan simpul untuk tetap sinkronisasi. Hal ini memungkinkan pengguna untuk melakukan transaksi dengan Ethereum menggunakan klien eksekusi mereka, dengan keyakinan bahwa mereka berada di rantai yang benar.

## Validator {#validators}

Dengan mempertaruhkan dan menjalankan perangkat lunak validator, suatu simpul layak dipilih untuk mengusulkan blok baru. Operator simpul dapat menambahkan validator ke klien konsensus mereka dengan menyetor 32 ETH dalam kontrak setoran. Klien validator dibundel dengan klien konsensus dan dapat ditambahkan ke simpul kapan saja. Validator menangani pengesahan dan memblokir proposal. Hal ini juga memungkinkan sebuah simpul untuk mengumpulkan hadiah atau kehilangan ETH melalui penalti atau pemotongan.

[Selengkapnya tentang staking](/staking/).

## Perbandingan komponen simpul {#node-comparison}

| Klien Eksekusi                                             | Klien Konsensus                                                                                                                                                                       | Validator                              |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Transaksi gosip melalui jaringan P2P-nya                   | Blok gosip dan pengesahan atas jaringan P2P-nya                                                                                                                                       | Mengusulkan blok                       |
| Mengeksekusi/mengeksekusi ulang transaksi                  | Menjalankan algoritma pilihan garpu                                                                                                                                                   | Memperoleh hadiah/penalti              |
| Memverifikasi perubahan status yang masuk                  | Melacak kepala rantai                                                                                                                                                                 | Membuat pengesahan                     |
| Mengelola percobaan status dan penerimaan                  | Mengelola status Suar (berisi informasi konsensus dan eksekusi)                                                                                                    | Membutuhkan 32 ETH untuk dipertaruhkan |
| Membuat muatan eksekusi                                    | Melacak akumulasi keserampangan dalam RANDAO (algoritma yang menyediakan keacakan yang dapat diverifikasi untuk pemilihan validator dan operasi konsensus lainnya) | Dapat dipotong                         |
| Mengekspos API JSON-RPC untuk berinteraksi dengan Ethereum | Melacak pembenaran dan finalisasi                                                                                                                                                     |                                        |

## Bacaan lebih lanjut {#further-reading}

- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos)
- [Proposal blok](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Imbalan dan penalti validator](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
