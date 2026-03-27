---
title: Mesin Virtual Ethereum (EVM)
description: Pengantar tentang mesin virtual Ethereum dan bagaimana kaitannya dengan status, transaksi, dan kontrak pintar.
lang: id
---

Mesin Virtual Ethereum (EVM) adalah lingkungan virtual desentralisasi yang mengeksekusi kode secara konsisten dan aman di seluruh node [Ethereum](/). Node menjalankan EVM untuk mengeksekusi kontrak pintar, menggunakan "[gas](/developers/docs/gas/)" untuk mengukur upaya komputasi yang diperlukan untuk [operasi](/developers/docs/evm/opcodes/), memastikan alokasi sumber daya yang efisien dan keamanan jaringan.

## Prasyarat {#prerequisites}

Beberapa pemahaman dasar tentang terminologi umum dalam ilmu komputer seperti [byte](https://wikipedia.org/wiki/Byte), [memori](https://wikipedia.org/wiki/Computer_memory), dan [stack](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>) diperlukan untuk memahami EVM. Akan sangat membantu juga jika Anda terbiasa dengan konsep kriptografi/blockchain seperti [fungsi hash](https://wikipedia.org/wiki/Cryptographic_hash_function) dan [Merkle tree](https://wikipedia.org/wiki/Merkle_tree).

## Dari buku besar ke mesin status {#from-ledger-to-state-machine}

Analogi 'buku besar terdistribusi' sering digunakan untuk menggambarkan blockchain seperti Bitcoin, yang memungkinkan mata uang kripto desentralisasi menggunakan alat dasar kriptografi. Buku besar menyimpan catatan aktivitas yang harus mematuhi serangkaian aturan yang mengatur apa yang dapat dan tidak dapat dilakukan seseorang untuk memodifikasi buku besar tersebut. Misalnya, alamat Bitcoin tidak dapat membelanjakan lebih banyak Bitcoin daripada yang telah diterimanya sebelumnya. Aturan-aturan ini mendasari semua transaksi di Bitcoin dan banyak blockchain lainnya.

Meskipun Ethereum memiliki mata uang kripto aslinya sendiri (ether) yang mengikuti aturan intuitif yang hampir sama persis, Ethereum juga memungkinkan fungsi yang jauh lebih kuat: [kontrak pintar](/developers/docs/smart-contracts/). Untuk fitur yang lebih kompleks ini, diperlukan analogi yang lebih canggih. Alih-alih buku besar terdistribusi, Ethereum adalah [mesin status](https://wikipedia.org/wiki/Finite-state_machine) terdistribusi. Status Ethereum adalah struktur data besar yang tidak hanya menyimpan semua akun dan saldo, tetapi juga _status mesin_, yang dapat berubah dari blok ke blok sesuai dengan serangkaian aturan yang telah ditentukan sebelumnya, dan yang dapat mengeksekusi kode mesin arbitrer. Aturan spesifik untuk mengubah status dari blok ke blok ditentukan oleh EVM.

![Diagram yang menunjukkan susunan EVM](./evm.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Fungsi transisi status Ethereum {#the-ethereum-state-transition-function}

EVM berperilaku seperti fungsi matematika: Diberikan sebuah input, ia menghasilkan output yang deterministik. Oleh karena itu, cukup membantu untuk mendeskripsikan Ethereum secara lebih formal sebagai memiliki **fungsi transisi status**:

```
Y(S, T)= S'
```

Diberikan status valid lama `(S)` dan serangkaian transaksi valid baru `(T)`, fungsi transisi status Ethereum `Y(S, T)` menghasilkan status output valid baru `S'`

### Status {#state}

Dalam konteks Ethereum, status adalah struktur data yang sangat besar yang disebut [Merkle Patricia Trie yang dimodifikasi](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), yang menjaga semua [akun](/developers/docs/accounts/) terhubung oleh hash dan dapat direduksi menjadi satu root hash yang disimpan di blockchain.

### Transaksi {#transactions}

Transaksi adalah instruksi yang ditandatangani secara kriptografi dari akun. Ada dua jenis transaksi: yang menghasilkan panggilan pesan dan yang menghasilkan pembuatan kontrak.

Pembuatan kontrak menghasilkan pembuatan akun kontrak baru yang berisi bytecode [kontrak pintar](/developers/docs/smart-contracts/anatomy/) yang telah dikompilasi. Kapan pun akun lain melakukan panggilan pesan ke kontrak tersebut, ia akan mengeksekusi bytecode-nya.

## Instruksi EVM {#evm-instructions}

EVM mengeksekusi sebagai [mesin stack](https://wikipedia.org/wiki/Stack_machine) dengan kedalaman 1024 item. Setiap item adalah kata 256-bit, yang dipilih untuk kemudahan penggunaan dengan kriptografi 256-bit (seperti hash Keccak-256 atau tanda tangan secp256k1).

Selama eksekusi, EVM memelihara _memori_ sementara (sebagai array byte yang dialamatkan dengan kata), yang tidak bertahan di antara transaksi.

### Penyimpanan sementara

Penyimpanan sementara adalah penyimpanan nilai-kunci per transaksi yang diakses melalui opcode `TSTORE` dan `TLOAD`. Penyimpanan ini bertahan di semua panggilan internal selama transaksi yang sama tetapi dihapus pada akhir transaksi. Tidak seperti memori, penyimpanan sementara dimodelkan sebagai bagian dari status EVM daripada bingkai eksekusi, namun tidak dikomit ke status global. Penyimpanan sementara memungkinkan pembagian status sementara yang efisien gas di seluruh panggilan internal selama transaksi.

### Penyimpanan

Kontrak berisi trie _penyimpanan_ Merkle Patricia (sebagai array kata yang dapat dialamatkan dengan kata), yang terkait dengan akun yang bersangkutan dan merupakan bagian dari status global. Penyimpanan persisten ini berbeda dari penyimpanan sementara, yang hanya tersedia selama durasi satu transaksi dan tidak membentuk bagian dari trie penyimpanan persisten akun.

### Opcode

Bytecode kontrak pintar yang dikompilasi dieksekusi sebagai sejumlah [opcode](/developers/docs/evm/opcodes) EVM, yang melakukan operasi stack standar seperti `XOR`, `AND`, `ADD`, `SUB`, dll. EVM juga mengimplementasikan sejumlah operasi stack khusus blockchain, seperti `ADDRESS`, `BALANCE`, `BLOCKHASH`, dll. Kumpulan opcode juga mencakup `TSTORE` dan `TLOAD`, yang menyediakan akses ke penyimpanan sementara.

![Diagram yang menunjukkan di mana gas dibutuhkan untuk operasi EVM](../gas/gas.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementasi EVM {#evm-implementations}

Semua implementasi EVM harus mematuhi spesifikasi yang dijelaskan dalam Ethereum Yellowpaper.

Selama sepuluh tahun sejarah Ethereum, EVM telah mengalami beberapa revisi, dan ada beberapa implementasi EVM dalam berbagai bahasa pemrograman.

[Klien eksekusi Ethereum](/developers/docs/nodes-and-clients/#execution-clients) mencakup implementasi EVM. Selain itu, ada beberapa implementasi mandiri, termasuk:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Bacaan Lebih Lanjut {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper alias KEVM: Semantics of EVM in K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Ethereum Virtual Machine Opcodes](https://www.ethervm.io/)
- [Referensi Interaktif Opcode Mesin Virtual Ethereum](https://www.evm.codes/)
- [Pengantar singkat dalam dokumentasi Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum - The Ethereum Virtual Machine](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Topik Terkait {#related-topics}

- [Gas](/developers/docs/gas/)

## Tutorial: Mesin Virtual Ethereum (EVM) / Opcode di Ethereum {#tutorials}

- [Memahami Spesifikasi EVM Yellow Paper](/developers/tutorials/yellow-paper-evm/) _– Panduan terarah tentang spesifikasi EVM formal dari Ethereum Yellow Paper._
- [Rekayasa Balik Kontrak](/developers/tutorials/reverse-engineering-a-contract/) _– Cara merekayasa balik kontrak pintar yang dikompilasi menggunakan opcode EVM._