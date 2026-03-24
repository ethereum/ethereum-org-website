---
title: "Merekayasa Balik Sebuah Kontrak"
description: Cara memahami kontrak ketika Anda tidak memiliki kode sumbernya
author: Ori Pomerantz
lang: id
tags: ["evm", "opcode"]
skill: advanced
published: 2021-12-30
---
## Pengantar {#introduction}

_Tidak ada rahasia di blockchain_, semua yang terjadi konsisten, dapat diverifikasi, dan tersedia untuk publik. Idealnya, [kontrak harus memiliki kode sumber yang dipublikasikan dan diverifikasi di Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Namun, [hal tersebut tidak selalu terjadi](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Dalam artikel ini Anda akan belajar cara merekayasa balik kontrak dengan melihat kontrak tanpa kode sumber, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Ada kompiler balik (reverse compiler), tetapi mereka tidak selalu menghasilkan [hasil yang dapat digunakan](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). Dalam artikel ini Anda akan belajar cara merekayasa balik secara manual dan memahami kontrak dari [opcode](https://github.com/wolflo/evm-opcodes), serta cara menafsirkan hasil dari dekompiler.

Untuk dapat memahami artikel ini, Anda harus sudah mengetahui dasar-dasar EVM, dan setidaknya sedikit familier dengan assembler EVM. [Anda dapat membaca tentang topik-topik ini di sini](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Siapkan Kode yang Dapat Dieksekusi {#prepare-the-executable-code}

Anda bisa mendapatkan opcode dengan membuka Etherscan untuk kontrak tersebut, mengklik tab **Contract** dan kemudian **Switch to Opcodes View**. Anda akan mendapatkan tampilan yang berisi satu opcode per baris.

![Tampilan Opcode dari Etherscan](opcode-view.png)

Namun, untuk dapat memahami lompatan (jumps), Anda perlu mengetahui di mana letak setiap opcode di dalam kode. Untuk melakukannya, salah satu caranya adalah dengan membuka Google Spreadsheet dan menempelkan opcode di kolom C. [Anda dapat melewati langkah-langkah berikut dengan membuat salinan dari spreadsheet yang sudah disiapkan ini](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Langkah selanjutnya adalah mendapatkan lokasi kode yang benar sehingga kita dapat memahami lompatan. Kita akan meletakkan ukuran opcode di kolom B, dan lokasinya (dalam heksadesimal) di kolom A. Ketik fungsi ini di sel `B1` lalu salin dan tempelkan untuk sisa kolom B, hingga akhir kode. Setelah Anda melakukan ini, Anda dapat menyembunyikan kolom B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Pertama, fungsi ini menambahkan satu byte untuk opcode itu sendiri, dan kemudian mencari `PUSH`. Opcode push bersifat khusus karena mereka perlu memiliki byte tambahan untuk nilai yang didorong (pushed). Jika opcode tersebut adalah `PUSH`, kita mengekstrak jumlah byte dan menambahkannya.

Di `A1` letakkan offset pertama, yaitu nol. Kemudian, di `A2`, letakkan fungsi ini dan sekali lagi salin dan tempelkan untuk sisa kolom A:

```
=dec2hex(hex2dec(A1)+B1)
```

Kita memerlukan fungsi ini untuk memberikan nilai heksadesimal karena nilai yang didorong sebelum lompatan (`JUMP` dan `JUMPI`) diberikan kepada kita dalam bentuk heksadesimal.

## Titik Masuk (0x00) {#the-entry-point-0x00}

Kontrak selalu dieksekusi dari byte pertama. Ini adalah bagian awal dari kode:

| Offset | Opcode       | Stack (setelah opcode) |
| -----: | ------------ | ---------------------- |
|      0 | PUSH1 0x80   | 0x80                   |
|      2 | PUSH1 0x40   | 0x40, 0x80             |
|      4 | MSTORE       | Kosong                 |
|      5 | PUSH1 0x04   | 0x04                   |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04      |
|      8 | LT           | CALLDATASIZE\<4         |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4    |
|      C | JUMPI        | Kosong                 |

Kode ini melakukan dua hal:

1. Menulis 0x80 sebagai nilai 32 byte ke lokasi memori 0x40-0x5F (0x80 disimpan di 0x5F, dan 0x40-0x5E semuanya nol).
2. Membaca ukuran calldata. Biasanya data panggilan (call data) untuk kontrak Ethereum mengikuti [ABI (antarmuka biner aplikasi)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), yang setidaknya membutuhkan empat byte untuk pemilih fungsi (function selector). Jika ukuran data panggilan kurang dari empat, lompat ke 0x5E.

![Diagram alur untuk bagian ini](flowchart-entry.png)

### Handler di 0x5E (untuk data panggilan non-ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Opcode       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Potongan kode ini dimulai dengan `JUMPDEST`. Program EVM (Mesin Virtual Ethereum) akan memunculkan pengecualian jika Anda melompat ke opcode yang bukan `JUMPDEST`. Kemudian ia melihat CALLDATASIZE, dan jika bernilai "benar" (yaitu, bukan nol) ia akan melompat ke 0x7C. Kita akan membahasnya di bawah ini.

| Offset | Opcode     | Stack (setelah opcode)                                                                     |
| -----: | ---------- | ------------------------------------------------------------------------------------------ |
|     64 | CALLVALUE  | [Wei](/glossary/#wei) yang diberikan oleh panggilan. Disebut `msg.value` di Solidity |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                                         |

Jadi ketika tidak ada data panggilan, kita membaca nilai dari Storage[6]. Kita belum tahu apa nilai ini, tetapi kita dapat mencari transaksi yang diterima kontrak tanpa data panggilan. Transaksi yang hanya mentransfer ETH tanpa data panggilan apa pun (dan karenanya tidak ada metode) memiliki metode `Transfer` di Etherscan. Faktanya, [transaksi pertama yang diterima kontrak](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) adalah sebuah transfer.

Jika kita melihat transaksi tersebut dan mengeklik **Click to see More**, kita melihat bahwa data panggilan, yang disebut data masukan (input data), memang kosong (`0x`). Perhatikan juga bahwa nilainya adalah 1,559 ETH, yang akan relevan nanti.

![Data panggilan kosong](calldata-empty.png)

Selanjutnya, klik tab **State** (Status) dan perluas kontrak yang sedang kita rekayasa balik (0x2510...). Anda dapat melihat bahwa `Storage[6]` memang berubah selama transaksi, dan jika Anda mengubah Hex menjadi **Number** (Angka), Anda melihatnya menjadi 1,559,000,000,000,000,000, nilai yang ditransfer dalam wei (saya menambahkan koma untuk kejelasan), yang sesuai dengan nilai kontrak berikutnya.

![Perubahan pada Storage[6]](storage6.png)

Jika kita melihat perubahan status yang disebabkan oleh [transaksi `Transfer` lainnya dari periode yang sama](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) kita melihat bahwa `Storage[6]` melacak nilai kontrak untuk sementara waktu. Untuk saat ini kita akan menyebutnya `Value*`. Tanda bintang (`*`) mengingatkan kita bahwa kita belum _tahu_ apa yang dilakukan variabel ini, tetapi itu tidak mungkin hanya untuk melacak nilai kontrak karena tidak perlu menggunakan penyimpanan, yang sangat mahal, ketika Anda bisa mendapatkan saldo akun Anda menggunakan `ADDRESS BALANCE`. Opcode pertama mendorong alamat kontrak itu sendiri. Yang kedua membaca alamat di bagian atas stack dan menggantinya dengan saldo dari alamat tersebut.

| Offset | Opcode       | Stack                                       |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

Kita akan terus melacak kode ini di tujuan lompatan.

| Offset | Opcode     | Stack                                                       |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` adalah bitwise, jadi ia membalikkan nilai setiap bit dalam nilai panggilan.

| Offset | Opcode       | Stack                                                                       |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

Kita melompat jika `Value*` lebih kecil dari 2^256-CALLVALUE-1 atau sama dengannya. Ini terlihat seperti logika untuk mencegah overflow. Dan memang, kita melihat bahwa setelah beberapa operasi yang tidak masuk akal (menulis ke memori yang akan segera dihapus, misalnya) pada offset 0x01DE kontrak dikembalikan (revert) jika overflow terdeteksi, yang merupakan perilaku normal.

Perhatikan bahwa overflow semacam itu sangat tidak mungkin terjadi, karena itu akan membutuhkan nilai panggilan ditambah `Value*` agar sebanding dengan 2^256 wei, sekitar 10^59 ETH. [Total pasokan ETH, saat penulisan ini, kurang dari dua ratus juta](https://etherscan.io/stat/supply).

| Offset | Opcode   | Stack                                     |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

Jika kita sampai di sini, dapatkan `Value* + CALLVALUE` dan lompat ke offset 0x75.

| Offset | Opcode   | Stack                           |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

Jika kita sampai di sini (yang mengharuskan data panggilan kosong) kita menambahkan nilai panggilan ke `Value*`. Ini konsisten dengan apa yang kita katakan tentang apa yang dilakukan transaksi `Transfer`.

| Offset | Opcode |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Terakhir, bersihkan stack (yang sebenarnya tidak perlu) dan beri sinyal akhir transaksi yang berhasil.

Singkatnya, berikut adalah diagram alur untuk kode awal.

![Diagram alur titik masuk](flowchart-entry.png)

## Handler di 0x7C {#the-handler-at-0x7c}

Saya sengaja tidak mencantumkan di judul apa yang dilakukan handler ini. Tujuannya bukan untuk mengajari Anda cara kerja kontrak spesifik ini, melainkan cara melakukan rekayasa balik (reverse engineer) kontrak. Anda akan mempelajari apa yang dilakukannya dengan cara yang sama seperti saya, yaitu dengan mengikuti kodenya.

Kita sampai di sini dari beberapa tempat:

- Jika ada data panggilan (call data) sebesar 1, 2, atau 3 byte (dari offset 0x63)
- Jika tanda tangan metode tidak diketahui (dari offset 0x42 dan 0x5D)

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

Ini adalah sel penyimpanan (storage) lain, yang tidak dapat saya temukan dalam transaksi apa pun sehingga lebih sulit untuk mengetahui apa artinya. Kode di bawah ini akan membuatnya lebih jelas.

| Offset | Opcode                                            | Stack                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

Opcode ini memotong nilai yang kita baca dari Storage[3] menjadi 160 bit, panjang dari sebuah alamat Ethereum.

| Offset | Opcode | Stack                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

Lompatan (jump) ini berlebihan, karena kita akan menuju ke opcode berikutnya. Kode ini tidak seefisien yang seharusnya dalam penggunaan gas.

| Offset | Opcode     | Stack                           |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

Di bagian paling awal kode, kita mengatur Mem[0x40] menjadi 0x80. Jika kita mencari 0x40 nanti, kita melihat bahwa kita tidak mengubahnya - jadi kita dapat berasumsi nilainya adalah 0x80.

| Offset | Opcode       | Stack                                             |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

Salin semua data panggilan ke memori, dimulai dari 0x80.

| Offset | Opcode        | Stack                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

Sekarang semuanya menjadi jauh lebih jelas. Kontrak ini dapat bertindak sebagai [proxy](https://blog.openzeppelin.com/proxy-patterns/), memanggil alamat di Storage[3] untuk melakukan pekerjaan yang sebenarnya. `DELEGATE_CALL` memanggil kontrak terpisah, tetapi tetap berada di penyimpanan yang sama. Ini berarti bahwa kontrak yang didelegasikan, yang mana kita menjadi proxy-nya, mengakses ruang penyimpanan yang sama. Parameter untuk panggilan tersebut adalah:

- _Gas_: Semua gas yang tersisa
- _Alamat yang dipanggil_: Storage[3]-as-address
- _Data panggilan_: Byte CALLDATASIZE yang dimulai dari 0x80, yang merupakan tempat kita meletakkan data panggilan asli
- _Data kembalian_: Tidak ada (0x00 - 0x00) Kita akan mendapatkan data kembalian dengan cara lain (lihat di bawah)

| Offset | Opcode         | Stack                                                                                         |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

Di sini kita menyalin semua data kembalian ke buffer memori yang dimulai dari 0x80.

| Offset | Opcode       | Stack                                                                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1         | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO       | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     BC | JUMPI        | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2         | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address          |
|     BF | RETURN       |                                                                                                                              |

Jadi setelah panggilan, kita menyalin data kembalian ke buffer 0x80 - 0x80+RETURNDATASIZE, dan jika panggilan berhasil, kita kemudian melakukan `RETURN` dengan buffer tersebut.

### DELEGATECALL Gagal {#delegatecall-failed}

Jika kita sampai di sini, ke 0xC0, itu berarti kontrak yang kita panggil dikembalikan (reverted). Karena kita hanya sebuah proxy untuk kontrak tersebut, kita ingin mengembalikan data yang sama dan juga melakukan revert.

| Offset | Opcode   | Stack                                                                                                               |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2     | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     C3 | REVERT   |

Jadi kita melakukan `REVERT` dengan buffer yang sama yang kita gunakan untuk `RETURN` sebelumnya: 0x80 - 0x80+RETURNDATASIZE

![Diagram alur panggilan ke proxy](flowchart-proxy.png)

## Panggilan ABI {#abi-calls}

Jika ukuran data panggilan adalah empat byte atau lebih, ini mungkin merupakan panggilan ABI yang valid.

| Offset | Opcode       | Stack                                             |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((Kata pertama (256 bit) dari data panggilan)))      |
|     10 | PUSH1 0xe0   | 0xE0 (((Kata pertama (256 bit) dari data panggilan))) |
|     12 | SHR          | (((32 bit pertama (4 byte) dari data panggilan)))    |

Etherscan memberi tahu kita bahwa `1C` adalah opcode yang tidak diketahui, karena [itu ditambahkan setelah Etherscan menulis fitur ini](https://eips.ethereum.org/EIPS/eip-145) dan mereka belum memperbaruinya. Sebuah [tabel opcode yang terbaru](https://github.com/wolflo/evm-opcodes) menunjukkan kepada kita bahwa ini adalah geser kanan (shift right)

| Offset | Opcode           | Stack                                                                                                    |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((32 bit pertama (4 byte) dari data panggilan))) (((32 bit pertama (4 byte) dari data panggilan)))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((32 bit pertama (4 byte) dari data panggilan))) (((32 bit pertama (4 byte) dari data panggilan))) |
|     19 | GT               | 0x3CD8045E>32-bit-pertama-dari-data-panggilan (((32 bit pertama (4 byte) dari data panggilan)))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>32-bit-pertama-dari-data-panggilan (((32 bit pertama (4 byte) dari data panggilan)))            |
|     1D | JUMPI            | (((32 bit pertama (4 byte) dari data panggilan)))                                                           |

Dengan membagi pengujian pencocokan tanda tangan metode menjadi dua seperti ini, rata-rata akan menghemat separuh pengujian. Kode yang segera mengikuti ini dan kode di 0x43 mengikuti pola yang sama: `DUP1` 32 bit pertama dari data panggilan, `PUSH4 (((tanda tangan metode>`, jalankan `EQ` untuk memeriksa kesetaraan, dan kemudian `JUMPI` jika tanda tangan metode cocok. Berikut adalah tanda tangan metode, alamatnya, dan jika diketahui [definisi metode yang sesuai](https://www.4byte.directory/):

| Metode                                                                                 | Tanda tangan metode | Offset untuk melompat ke |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103              |
| ???                                                                                    | 0x81e580d3       | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158              |
| ???                                                                                    | 0x1f135823       | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED              |

Jika tidak ada kecocokan yang ditemukan, kode melompat ke [penangan proxy di 0x7C](#the-handler-at-0x7c), dengan harapan bahwa kontrak yang menjadi proxy kita memiliki kecocokan.

![Diagram alur panggilan ABI](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Opcode       | Stack                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

Hal pertama yang dilakukan fungsi ini adalah memeriksa bahwa panggilan tersebut tidak mengirimkan ETH apa pun. Fungsi ini bukan [`payable`](https://solidity-by-example.org/payable/). Jika seseorang mengirimi kita ETH, itu pasti sebuah kesalahan dan kita ingin melakukan `REVERT` untuk menghindari ETH tersebut berada di tempat di mana mereka tidak bisa mendapatkannya kembali.

| Offset | Opcode                                            | Stack                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] alias kontrak di mana kita menjadi proxy)))                   |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] alias kontrak di mana kita menjadi proxy)))              |
|    116 | MLOAD                                             | 0x80 (((Storage[3] alias kontrak di mana kita menjadi proxy)))              |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] alias kontrak di mana kita menjadi proxy)))    |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] alias kontrak di mana kita menjadi proxy)))    |
|    12D | SWAP2                                             | (((Storage[3] alias kontrak di mana kita menjadi proxy))) 0xFF...FF 0x80    |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

Dan 0x80 sekarang berisi alamat proxy

| Offset | Opcode       | Stack     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Kode E4 {#the-e4-code}

Ini adalah pertama kalinya kita melihat baris-baris ini, tetapi baris-baris ini dibagikan dengan metode lain (lihat di bawah). Jadi kita akan menyebut nilai dalam stack sebagai X, dan ingat saja bahwa dalam `splitter()` nilai X ini adalah 0xA0.

| Offset | Opcode     | Stack       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

Jadi kode ini menerima penunjuk memori dalam stack (X), dan menyebabkan kontrak melakukan `RETURN` dengan buffer yaitu 0x80 - X.

Dalam kasus `splitter()`, ini mengembalikan alamat di mana kita menjadi proxy. `RETURN` mengembalikan buffer di 0x80-0x9F, yang merupakan tempat kita menulis data ini (offset 0x130 di atas).

## currentWindow() {#currentwindow}

Kode pada offset 0x158-0x163 identik dengan apa yang kita lihat pada 0x103-0x10E di `splitter()` (selain dari tujuan `JUMPI`), jadi kita tahu `currentWindow()` juga bukan `payable`.

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### Kode DA {#the-da-code}

Kode ini juga dibagikan dengan metode lain. Jadi kita akan menyebut nilai di dalam stack sebagai Y, dan ingat saja bahwa di `currentWindow()` nilai dari Y ini adalah Storage[1].

| Offset | Opcode     | Stack            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Tulis Y ke 0x80-0x9F.

| Offset | Opcode     | Stack          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

Dan sisanya sudah dijelaskan [di atas](#the-e4-code). Jadi lompatan ke 0xDA menulis bagian atas stack (Y) ke 0x80-0x9F, dan mengembalikan nilai tersebut. Dalam kasus `currentWindow()`, ini mengembalikan Storage[1].

## merkleRoot() {#merkleroot}

Kode pada offset 0xED-0xF8 identik dengan apa yang kita lihat pada 0x103-0x10E di `splitter()` (selain dari tujuan `JUMPI`), jadi kita tahu `merkleRoot()` juga bukan `payable`.

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

Apa yang terjadi setelah lompatan [sudah kita ketahui](#the-da-code). Jadi `merkleRoot()` mengembalikan Storage[0].

## 0x81e580d3 {#0x81e580d3}

Kode di offset 0x138-0x143 identik dengan apa yang kita lihat di 0x103-0x10E dalam `splitter()` (selain tujuan `JUMPI`), jadi kita tahu fungsi ini juga bukan `payable`.

| Offset | Opcode       | Stack                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Sepertinya fungsi ini mengambil setidaknya 32 byte (satu word) dari data panggilan.

| Offset | Opcode | Stack                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

Jika tidak mendapatkan data panggilan, transaksi akan dibatalkan tanpa data kembalian apa pun.

Mari kita lihat apa yang terjadi jika fungsi tersebut _benar-benar_ mendapatkan data panggilan yang dibutuhkannya.

| Offset | Opcode       | Stack                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` adalah word pertama dari data panggilan _setelah_ tanda tangan metode

| Offset | Opcode       | Stack                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Jika word pertama tidak kurang dari Storage[4], fungsi tersebut gagal. Fungsi ini dibatalkan tanpa nilai kembalian apa pun:

| Offset | Opcode     | Stack         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

Jika calldataload(4) kurang dari Storage[4], kita mendapatkan kode ini:

| Offset | Opcode     | Stack                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

Dan lokasi memori 0x00-0x1F sekarang berisi data 0x04 (0x00-0x1E semuanya nol, 0x1F adalah empat)

| Offset | Opcode     | Stack                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Jadi ada tabel pencarian di penyimpanan, yang dimulai pada SHA3 dari 0x000...0004 dan memiliki entri untuk setiap nilai data panggilan yang sah (nilai di bawah Storage[4]).

| Offset | Opcode | Stack                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Kita sudah tahu apa yang dilakukan [kode di offset 0xDA](#the-da-code), kode tersebut mengembalikan nilai teratas stack kepada pemanggil. Jadi fungsi ini mengembalikan nilai dari tabel pencarian kepada pemanggil.

## 0x1f135823 {#0x1f135823}

Kode pada offset 0xC4-0xCF identik dengan apa yang kita lihat pada 0x103-0x10E di `splitter()` (selain dari tujuan `JUMPI`), jadi kita tahu fungsi ini juga bukan `payable`.

| Offset | Opcode       | Stack             |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

Kita sudah tahu apa yang dilakukan [kode pada offset 0xDA](#the-da-code), kode tersebut mengembalikan nilai teratas stack kepada pemanggil. Jadi fungsi ini mengembalikan `Value*`.

### Ringkasan Metode {#method-summary}

Apakah Anda merasa sudah memahami kontrak pada titik ini? Saya tidak. Sejauh ini kita memiliki metode-metode berikut:

| Metode                            | Arti                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Transfer                          | Menerima nilai yang diberikan oleh panggilan dan meningkatkan `Value*` sebesar jumlah tersebut         |
| [splitter()](#splitter)           | Mengembalikan Storage[3], alamat proksi                                                                |
| [currentWindow()](#currentwindow) | Mengembalikan Storage[1]                                                                               |
| [merkleRoot()](#merkeroot)        | Mengembalikan Storage[0]                                                                               |
| [0x81e580d3](#0x81e580d3)         | Mengembalikan nilai dari tabel pencarian, asalkan parameternya kurang dari Storage[4]                  |
| [0x1f135823](#0x1f135823)         | Mengembalikan Storage[6], alias Value\*                                                                |

Namun kita tahu fungsionalitas lainnya disediakan oleh kontrak di Storage[3]. Mungkin jika kita tahu apa kontrak itu, itu akan memberi kita petunjuk. Untungnya, ini adalah blockchain dan semuanya diketahui, setidaknya secara teori. Kita tidak melihat metode apa pun yang mengatur Storage[3], jadi itu pasti telah diatur oleh konstruktor.

## Konstruktor {#the-constructor}

Saat kita [melihat sebuah kontrak](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) kita juga dapat melihat transaksi yang membuatnya.

![Klik transaksi pembuatan](create-tx.png)

Jika kita mengeklik transaksi tersebut, lalu tab **Status**, kita dapat melihat nilai awal dari parameter-parameter tersebut. Secara khusus, kita dapat melihat bahwa Storage[3] berisi [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Kontrak tersebut pasti berisi fungsionalitas yang hilang. Kita dapat memahaminya menggunakan alat yang sama yang kita gunakan untuk kontrak yang sedang kita selidiki.

## Kontrak Proksi {#the-proxy-contract}

Menggunakan teknik yang sama seperti yang kita gunakan untuk kontrak asli di atas, kita dapat melihat bahwa kontrak akan dikembalikan (revert) jika:

- Terdapat ETH yang dilampirkan pada panggilan (0x05-0x0F)
- Ukuran data panggilan kurang dari empat (0x10-0x19 dan 0xBE-0xC2)

Dan metode yang didukungnya adalah:

| Metode                                                                                                          | Tanda tangan metode          | Offset untuk melompat ke |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

Kita dapat mengabaikan empat metode terbawah karena kita tidak akan pernah mencapainya. Tanda tangannya sedemikian rupa sehingga kontrak asli kita menanganinya sendiri (Anda dapat mengklik tanda tangan untuk melihat detailnya di atas), jadi metode tersebut pasti merupakan [metode yang ditimpa (overridden)](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Salah satu metode yang tersisa adalah `claim(<params>)`, dan yang lainnya adalah `isClaimed(<params>)`, jadi ini terlihat seperti kontrak airdrop. Daripada memeriksa sisa opcode satu per satu, kita dapat [mencoba decompiler](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), yang menghasilkan hasil yang dapat digunakan untuk tiga fungsi dari kontrak ini. Rekayasa balik untuk fungsi lainnya diserahkan sebagai latihan bagi pembaca.

### scaleAmountByPercentage {#scaleamountbypercentage}

Inilah yang diberikan decompiler kepada kita untuk fungsi ini:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

`require` pertama menguji bahwa data panggilan memiliki, selain empat byte dari tanda tangan fungsi, setidaknya 64 byte, cukup untuk dua parameter. Jika tidak, maka jelas ada sesuatu yang salah.

Pernyataan `if` tampaknya memeriksa bahwa `_param1` bukan nol, dan bahwa `_param1 * _param2` tidak negatif. Ini mungkin untuk mencegah kasus wrap around (meluap).

Terakhir, fungsi mengembalikan nilai yang diskalakan.

### claim {#claim}

Kode yang dibuat decompiler cukup kompleks, dan tidak semuanya relevan bagi kita. Saya akan melewati beberapa bagian untuk fokus pada baris-baris yang saya yakini memberikan informasi yang berguna

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Kita melihat dua hal penting di sini:

- `_param2`, meskipun dideklarasikan sebagai `uint256`, sebenarnya adalah sebuah alamat
- `_param1` adalah jendela (window) yang sedang diklaim, yang harus berupa `currentWindow` atau sebelumnya.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Jadi sekarang kita tahu bahwa Storage[5] adalah array dari jendela dan alamat, dan apakah alamat tersebut telah mengklaim hadiah untuk jendela itu.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

Kita tahu bahwa `unknown2eb4a7ab` sebenarnya adalah fungsi `merkleRoot()`, jadi kode ini terlihat seperti sedang memverifikasi [bukti merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Ini berarti bahwa `_param4` adalah bukti merkle.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Beginilah cara sebuah kontrak mentransfer ETH miliknya sendiri ke alamat lain (kontrak atau akun yang dimiliki secara eksternal). Kontrak memanggilnya dengan nilai yang merupakan jumlah yang akan ditransfer. Jadi sepertinya ini adalah airdrop ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Dua baris terbawah memberi tahu kita bahwa Storage[2] juga merupakan kontrak yang kita panggil. Jika kita [melihat transaksi konstruktor](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) kita melihat bahwa kontrak ini adalah [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), sebuah kontrak Wrapped Ether [yang kode sumbernya telah diunggah ke Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Jadi sepertinya kontrak mencoba mengirim ETH ke `_param2`. Jika bisa melakukannya, bagus. Jika tidak, kontrak mencoba mengirim [WETH](https://weth.tkn.eth.limo/). Jika `_param2` adalah akun yang dimiliki secara eksternal (EOA) maka ia selalu dapat menerima ETH, tetapi kontrak dapat menolak untuk menerima ETH. Namun, WETH adalah ERC-20 dan kontrak tidak dapat menolak untuk menerimanya.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Di akhir fungsi, kita melihat entri log sedang dibuat. [Lihat entri log yang dihasilkan](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) dan saring pada topik yang dimulai dengan `0xdbd5...`. Jika kita [mengklik salah satu transaksi yang menghasilkan entri semacam itu](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) kita melihat bahwa itu memang terlihat seperti klaim - akun tersebut mengirim pesan ke kontrak yang sedang kita rekayasa balik, dan sebagai imbalannya mendapatkan ETH.

![Sebuah transaksi klaim](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Fungsi ini sangat mirip dengan [`claim`](#claim) di atas. Fungsi ini juga memeriksa bukti merkle, mencoba mentransfer ETH ke yang pertama, dan menghasilkan jenis entri log yang sama.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

Perbedaan utamanya adalah parameter pertama, jendela untuk ditarik, tidak ada. Sebaliknya, ada perulangan (loop) di semua jendela yang dapat diklaim.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

Jadi ini terlihat seperti varian `claim` yang mengklaim semua jendela.

## Kesimpulan {#conclusion}

Sekarang Anda seharusnya sudah tahu cara memahami kontrak yang kode sumbernya tidak tersedia, menggunakan opcode atau (jika berfungsi) dekompiler. Seperti yang terlihat dari panjang artikel ini, melakukan rekayasa balik pada sebuah kontrak bukanlah hal yang sepele, tetapi dalam sistem di mana keamanan sangat penting, ini adalah keterampilan yang penting untuk dapat memverifikasi bahwa kontrak berfungsi seperti yang dijanjikan.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).