---
title: Mesin Virtual Ethereum (EVM)
description: Pengantar mesin virtual Ethereum dan bagaimana kaitannya dengan state, transaksi, dan kontrak pintar.
lang: id
---

Ethereum Virtual Machine (EVM) adalah lingkungan virtual terdesentralisasi yang mengeksekusi kode secara konsisten dan aman di semua node Ethereum. Simpul-simpul menjalankan EVM untuk mengeksekusi kontrak pintar, menggunakan "[gas](/developers/docs/gas/)" untuk mengukur upaya komputasi yang diperlukan untuk [operasi](/developers/docs/evm/opcodes/), memastikan alokasi sumber daya yang efisien dan keamanan jaringan.

## Persyaratan {#prerequisites}

Diperlukan sedikit pemahaman tentang terminologi umum dalam ilmu komputer seperti [bita](https://wikipedia.org/wiki/Byte), [memori](https://wikipedia.org/wiki/Computer_memory), dan [tumpukan](https://wikipedia.org/wiki/Stack_\(abstract_data_type\)) untuk memahami EVM. Akan sangat membantu juga jika Anda sudah terbiasa dengan konsep kriptografi/rantai blok seperti [fungsi hash](https://wikipedia.org/wiki/Cryptographic_hash_function) dan [pohon Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Dari buku besar ke mesin state {#from-ledger-to-state-machine}

Analogi dari 'buku besar terdistribusi' sering digunakan untuk menggambarkan blockchain seperti Bitcoin, yang memungkinkan mata uang terdesentralisasi menggunakan peralatan dasar kriptografi. Buku besar menyimpan catatan aktivitas yang harus mematuhi seperangkat aturan yang mengatur apa yang boleh dan tidak boleh dilakukan oleh seseorang untuk mengubah buku besar. Misalnya, alamat Bitcoin tidak dapat membelanjakan lebih banyak Bitcoin daripada yang diterima sebelumnya. Aturan ini mendukung semua transaksi di Bitcoin dan banyak blockchain lainnya.

Meskipun Ethereum memiliki mata uang kripto asli (ether) yang mengikuti aturan intuitif yang hampir sama persis, Ethereum juga memungkinkan fungsi yang jauh lebih kuat: [kontrak pintar](/developers/docs/smart-contracts/). Untuk fitur yang lebih kompleks ini, diperlukan analogi yang lebih canggih. Bukannya buku besar terdistribusi, Ethereum adalah [mesin state](https://wikipedia.org/wiki/Finite-state-machine) terdistribusi. State Ethereum adalah struktur data besar yang tidak hanya menampung semua akun dan saldo, tetapi juga _state mesin_, yang dapat berubah dari blok ke blok sesuai dengan serangkaian aturan yang telah ditentukan sebelumnya, dan yang dapat mengeksekusi kode mesin arbitrer. Aturan spesifik tentang mengubah state dari blok ke blok ditentukan oleh EVM.

![Diagram yang menunjukkan susunan EVM](./evm.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Fungsi transisi state Ethereum {#the-ethereum-state-transition-function}

EVM bertindak seperti fungsi matematika: Jika menerima input, akan menghasilkan output deterministik. Oleh karena itu, akan sangat membantu jika Ethereum dideskripsikan secara lebih formal sebagai sesuatu yang memiliki **fungsi transisi state**:

```
Y(S, T)= S'
```

Diberikan state lama yang valid `(S)` dan satu set transaksi baru yang valid `(T)`, fungsi transisi state Ethereum `Y(S, T)` menghasilkan state output baru yang valid `S'`

### State {#state}

Dalam konteks Ethereum, state adalah struktur data yang sangat besar yang disebut [Pohon Merkle Patricia yang dimodifikasi](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), yang menyimpan semua [akun](/developers/docs/accounts/) yang ditautkan oleh hash dan dapat direduksi menjadi satu hash root tunggal yang disimpan di rantai blok.

### Transaksi {#transactions}

Transaksi adalah instruksi yang ditandatangani secara kriptografis dari akun. Ada dua jenis transaksi: transaksi yang menghasilkan pemanggilan pesan dan transaksi yang menghasilkan pembuatan kontrak.

Pembuatan kontrak menghasilkan pembuatan akun kontrak baru yang berisi kode bita [kontrak pintar](/developers/docs/smart-contracts/anatomy/) yang dikompilasi. Setiap kali akun lain melakukan pemanggilan pesan ke kontrak itu, akun itu akan mengeksekusi kode bitanya.

## Instruksi EVM {#evm-instructions}

EVM dieksekusi sebagai [mesin tumpukan](https://wikipedia.org/wiki/Stack_machine) dengan kedalaman 1024 item. Setiap item adalah kata berukuran 256 bit, yang dipilih untuk kemudahan penggunaan dengan kriptografi 256 bit (seperti hash Keccak-256 atau tanda tangan secp256k1).

Selama eksekusi, EVM mempertahankan _memori_ sementara (sebagai larik bita yang dialamatkan dengan kata), yang tidak persisten antar transaksi.

### Penyimpanan sementara

Penyimpanan sementara adalah penyimpanan nilai-kunci per transaksi yang diakses melalui opcode `TSTORE` dan `TLOAD`. Penyimpanan ini tetap ada di semua panggilan internal selama transaksi yang sama, tetapi akan dihapus pada akhir transaksi. Tidak seperti memori, penyimpanan sementara dimodelkan sebagai bagian dari state EVM, bukan kerangka eksekusi, namun tidak dicatatkan ke state global. Penyimpanan sementara memungkinkan pembagian state sementara yang hemat gas di seluruh panggilan internal selama transaksi.

### Penyimpanan

Kontrak berisi trie _penyimpanan_ Merkle Patricia (sebagai larik kata yang dapat dialamatkan dengan kata), yang terkait dengan akun yang bersangkutan dan merupakan bagian dari state global. Penyimpanan persisten ini berbeda dari penyimpanan sementara, yang hanya tersedia selama satu transaksi dan tidak menjadi bagian dari trie penyimpanan persisten akun.

### Opcode

Kode bita kontrak pintar yang dikompilasi dieksekusi sebagai sejumlah [opcode](/developers/docs/evm/opcodes) EVM, yang melakukan operasi tumpukan standar seperti `XOR`, `AND`, `ADD`, `SUB`, dll. EVM juga mengimplementasikan sejumlah operasi tumpukan khusus rantai blok, seperti `ADDRESS`, `BALANCE`, `BLOCKHASH`, dll. Set opcode juga menyertakan `TSTORE` dan `TLOAD`, yang menyediakan akses ke penyimpanan sementara.

![Diagram yang menunjukkan di mana gas diperlukan untuk operasi EVM](../gas/gas.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementasi EVM {#evm-implementations}

Semua implementasi EVM harus sesuai dengan spesifikasi yang dideskripsikan dalam Yellowpaper Ethereum.

Selama sepuluh tahun sejarah Ethereum, EVM telah mengalami beberapa revisi, dan ada beberapa implementasi EVM dalam berbagai bahasa pemrograman.

[Klien eksekusi Ethereum](/developers/docs/nodes-and-clients/#execution-clients) menyertakan implementasi EVM. Selain itu, ada beberapa implementasi mandiri, termasuk:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Bacaan Lebih Lanjut {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper alias KEVM: Semantik EVM dalam K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Opcode Mesin Virtual Ethereum](https://www.ethervm.io/)
- [Referensi Interaktif Opcode Mesin Virtual Ethereum](https://www.evm.codes/)
- [Pengantar singkat dalam dokumentasi Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Menguasai Ethereum - Mesin Virtual Ethereum](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Topik Terkait {#related-topics}

- [Gas](/developers/docs/gas/)
