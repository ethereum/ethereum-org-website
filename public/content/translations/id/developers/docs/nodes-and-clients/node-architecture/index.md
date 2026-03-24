---
title: Arsitektur node
description: Pengantar tentang bagaimana node Ethereum diatur.
lang: id
---

Sebuah node Ethereum terdiri dari dua klien: [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) dan [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients). Agar sebuah node dapat mengusulkan blok baru, node tersebut juga harus menjalankan [klien validator](#validators).

Ketika Ethereum menggunakan [proof-of-work](/developers/docs/consensus-mechanisms/pow/), klien eksekusi sudah cukup untuk menjalankan node Ethereum penuh. Namun, sejak menerapkan [proof-of-stake](/developers/docs/consensus-mechanisms/pow/), klien eksekusi harus digunakan bersama dengan perangkat lunak lain yang disebut [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients).

Diagram di bawah ini menunjukkan hubungan antara kedua klien Ethereum. Kedua klien terhubung ke jaringan peer-to-peer (P2P) masing-masing. Jaringan P2P yang terpisah diperlukan karena klien eksekusi menyebarkan (gossip) transaksi melalui jaringan P2P mereka, memungkinkan mereka untuk mengelola kumpulan transaksi lokal mereka, sementara klien konsensus menyebarkan blok melalui jaringan P2P mereka, memungkinkan konsensus dan pertumbuhan rantai.

![Diagram arsitektur node Ethereum yang menunjukkan lapisan eksekusi dan konsensus](node-architecture-text-background.png)

_Ada beberapa opsi untuk klien eksekusi termasuk Erigon, Nethermind, dan Besu_.

Agar struktur dua klien ini berfungsi, klien konsensus harus meneruskan bundel transaksi ke klien eksekusi. Klien eksekusi mengeksekusi transaksi secara lokal untuk memvalidasi bahwa transaksi tersebut tidak melanggar aturan Ethereum apa pun dan bahwa pembaruan yang diusulkan pada status Ethereum sudah benar. Ketika sebuah node dipilih menjadi produsen blok, instans klien konsensusnya meminta bundel transaksi dari klien eksekusi untuk dimasukkan ke dalam blok baru dan mengeksekusinya untuk memperbarui status global. Klien konsensus menggerakkan klien eksekusi melalui koneksi RPC lokal menggunakan [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Apa yang dilakukan klien eksekusi? {#execution-client}

Klien eksekusi bertanggung jawab atas validasi, penanganan, dan penyebaran transaksi, bersama dengan manajemen status dan mendukung Mesin Virtual Ethereum ([EVM](/developers/docs/evm/)). Klien ini **tidak** bertanggung jawab atas pembuatan blok, penyebaran blok, atau penanganan logika konsensus. Hal-hal tersebut berada dalam wewenang klien konsensus.

Klien eksekusi membuat payload eksekusi - daftar transaksi, trie status yang diperbarui, dan data terkait eksekusi lainnya. Klien konsensus menyertakan payload eksekusi di setiap blok. Klien eksekusi juga bertanggung jawab untuk mengeksekusi ulang transaksi di blok baru untuk memastikan bahwa transaksi tersebut valid. Mengeksekusi transaksi dilakukan pada komputer tertanam klien eksekusi, yang dikenal sebagai [Mesin Virtual Ethereum (EVM)](/developers/docs/evm).

Klien eksekusi juga menawarkan antarmuka pengguna ke Ethereum melalui [metode RPC](/developers/docs/apis/json-rpc) yang memungkinkan pengguna untuk menanyakan blockchain Ethereum, mengirimkan transaksi, dan menerapkan kontrak pintar. Panggilan RPC umumnya ditangani oleh pustaka seperti [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/), atau oleh antarmuka pengguna seperti dompet peramban.

Singkatnya, klien eksekusi adalah:

- gerbang pengguna ke Ethereum
- rumah bagi Mesin Virtual Ethereum, status Ethereum, dan kumpulan transaksi.

## Apa yang dilakukan klien konsensus? {#consensus-client}

Klien konsensus menangani semua logika yang memungkinkan sebuah node untuk tetap sinkron dengan jaringan Ethereum. Ini termasuk menerima blok dari rekan (peer) dan menjalankan algoritma pilihan fork untuk memastikan node selalu mengikuti rantai dengan akumulasi pengesahan terbesar (ditimbang berdasarkan saldo efektif validator). Mirip dengan klien eksekusi, klien konsensus memiliki jaringan P2P mereka sendiri yang melaluinya mereka berbagi blok dan pengesahan.

Klien konsensus tidak berpartisipasi dalam mengesahkan atau mengusulkan blok - ini dilakukan oleh validator, sebuah pengaya opsional untuk klien konsensus. Klien konsensus tanpa validator hanya mengikuti bagian terdepan (head) dari rantai, memungkinkan node untuk tetap sinkron. Hal ini memungkinkan pengguna untuk bertransaksi dengan Ethereum menggunakan klien eksekusi mereka, dengan keyakinan bahwa mereka berada di rantai yang benar.

## Validator {#validators}

Mengunci dan menjalankan perangkat lunak validator membuat sebuah node memenuhi syarat untuk dipilih guna mengusulkan blok baru. Operator node dapat menambahkan validator ke klien konsensus mereka dengan menyetorkan 32 ETH ke dalam kontrak deposit. Klien validator dibundel dengan klien konsensus dan dapat ditambahkan ke node kapan saja. Validator menangani pengesahan dan usulan blok. Ini juga memungkinkan sebuah node untuk mengumpulkan hadiah atau kehilangan ETH melalui penalti atau pemotongan.

[Lebih lanjut tentang mengunci](/staking/).

## Perbandingan komponen node {#node-comparison}

| Klien Eksekusi | Klien Konsensus | Validator |
| --- | --- | --- |
| Menyebarkan transaksi melalui jaringan P2P-nya | Menyebarkan blok dan pengesahan melalui jaringan P2P-nya | Mengusulkan blok |
| Mengeksekusi/mengeksekusi ulang transaksi | Menjalankan algoritma pilihan fork | Mengumpulkan hadiah/penalti |
| Memverifikasi perubahan status yang masuk | Melacak bagian terdepan dari rantai | Membuat pengesahan |
| Mengelola trie status dan tanda terima | Mengelola status Beacon (berisi info konsensus dan eksekusi) | Membutuhkan 32 ETH untuk di-stake |
| Membuat payload eksekusi | Melacak akumulasi keacakan di RANDAO (sebuah algoritma yang menyediakan keacakan yang dapat diverifikasi untuk pemilihan validator dan operasi konsensus lainnya) | Dapat dipotong |
| Mengekspos API JSON-RPC untuk berinteraksi dengan Ethereum | Melacak justifikasi dan finalisasi | |

## Bacaan lebih lanjut {#further-reading}

- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos)
- [Usulan blok](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Hadiah dan penalti validator](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)