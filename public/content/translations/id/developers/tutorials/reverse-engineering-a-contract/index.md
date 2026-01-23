---
title: "Menganalisis Balik Kontrak"
description: Bagaimana cara memahami sebuah kontrak ketika Anda tidak memiliki kode sumber
author: Ori Pomerantz
lang: id
tags: [ "evm", "opcode" ]
skill: advanced
published: 2021-12-30
---

## Pengenalan {#introduction}

_Tidak ada rahasia di dalam rantai blok, semua yang terjadi adalah konsisten, dapat diverifikasi, dan tersedia untuk umum._ Idealnya, [kode sumber kontrak harus dipublikasikan dan diverifikasi di Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Namun, [tidak selalu demikian](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Dalam artikel ini Anda akan belajar cara melakukan reverse engineering kontrak dengan melihat kontrak tanpa kode sumber, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Ada decompiler terbalik, tetapi tidak selalu menghasilkan [hasil yang dapat digunakan](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). Dalam artikel ini Anda belajar cara melakukan reverse engineering secara manual dan memahami kontrak dari [opcode](https://github.com/wolflo/evm-opcodes), serta cara menginterpretasikan hasil dari decompiler.

Untuk dapat memahami artikel ini, Anda sebaiknya sudah menguasai dasar-dasar EVM, dan setidaknya sedikit mengenal assembler EVM. [Anda dapat membaca tentang topik-topik ini di sini](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Menyiapkan Kode yang Dapat Dieksekusi {#prepare-the-executable-code}

Anda bisa mendapatkan opcode dengan membuka Etherscan untuk kontrak tersebut, dengan mengeklik tab **Kontrak** lalu **Beralih ke Tampilan Opcode**. Anda akan mendapatkan tampilan satu opcode per baris.

![Tampilan Opcode dari Etherscan](opcode-view.png)

Namun, untuk dapat memahami lompatan, Anda perlu tahu di mana setiap opcode berada di dalam kode. Untuk melakukan itu, salah satu caranya adalah dengan membuka Google Spreadsheet dan menempelkan opcode di kolom C. [Anda dapat melewati langkah-langkah berikut dengan membuat salinan spreadsheet yang sudah disiapkan ini](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Langkah selanjutnya adalah mendapatkan lokasi kode yang benar sehingga kita dapat memahami lompatan. Kita akan menempatkan ukuran opcode di kolom B, dan lokasi (dalam heksadesimal) di kolom A. Ketik fungsi ini di sel `B1` lalu salin dan tempelkan ke sisa kolom B, hingga akhir kode. Setelah melakukan ini, Anda dapat menyembunyikan kolom B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Pertama fungsi ini menambahkan satu byte untuk opcode itu sendiri, dan kemudian mencari `PUSH`. Opcode push bersifat spesial karena mereka memerlukan byte tambahan untuk nilai yang didorong. Jika opcode-nya `PUSH`, kita mengekstrak jumlah byte dan menambahkannya.

Di `A1` masukkan offset pertama, nol. Kemudian, di `A2`, masukkan fungsi ini dan sekali lagi salin dan tempelkan ke sisa kolom A:

```
=dec2hex(hex2dec(A1)+B1)
```

Kita memerlukan fungsi ini untuk memberi kita nilai heksadesimal karena nilai-nilai yang didorong sebelum lompatan (`JUMP` dan `JUMPI`) diberikan kepada kita dalam heksadesimal.

## Titik Masuk (0x00) {#the-entry-point-0x00}

Kontrak selalu dieksekusi dari byte pertama. Ini adalah bagian awal dari kode:

| Offset | Opcode       | Tumpukan (setelah opcode)   |
| -----: | ------------ | ---------------------------------------------- |
|      0 | PUSH1 0x80   | 0x80                                           |
|      2 | PUSH1 0x40   | 0x40, 0x80                                     |
|      4 | MSTORE       | Kosong                                         |
|      5 | PUSH1 0x04   | 0x04                                           |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04                              |
|      8 | LT           | CALLDATASIZE\<4      |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4 |
|      C | JUMPI        | Kosong                                         |

Kode ini melakukan dua hal:

1. Tulis 0x80 sebagai nilai 32 byte ke lokasi memori 0x40-0x5F (0x80 disimpan di 0x5F, dan 0x40-0x5E semuanya nol).
2. Baca ukuran calldata. Biasanya data panggilan untuk kontrak Ethereum mengikuti [ABI (application binary interface)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), yang minimal memerlukan empat byte untuk pemilih fungsi. Jika ukuran data panggilan kurang dari empat, lompat ke 0x5E.

![Diagram alir untuk bagian ini](flowchart-entry.png)

### Penangan di 0x5E (untuk data panggilan non-ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Opcode       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Cuplikan ini dimulai dengan `JUMPDEST`. Program EVM (Mesin Virtual Ethereum) akan melemparkan pengecualian jika Anda melompat ke opcode yang bukan `JUMPDEST`. Kemudian, ia melihat CALLDATASIZE, dan jika "true" (yaitu, bukan nol) melompat ke 0x7C. Kita akan membahasnya di bawah ini.

| Offset | Opcode     | Tumpukan (setelah opcode)                                                          |
| -----: | ---------- | ----------------------------------------------------------------------------------------------------- |
|     64 | CALLVALUE  | [Wei](/glossary/#wei) yang disediakan oleh panggilan. Disebut `msg.value` di Solidity |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                                           |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                                                         |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                                               |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                                             |
|     6B | SLOAD      | Penyimpanan[6] CALLVALUE 0 6 CALLVALUE            |

Jadi ketika tidak ada data panggilan, kita membaca nilai dari Penyimpanan[6]. Kita belum tahu nilai ini, tetapi kita bisa mencari transaksi yang diterima kontrak tanpa data panggilan. Transaksi yang hanya mentransfer ETH tanpa data panggilan (dan karenanya tidak ada metode) memiliki metode `Transfer` di Etherscan. Faktanya, [transaksi pertama yang diterima kontrak](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) adalah transfer.

Jika kita melihat transaksi itu dan mengklik **Klik untuk melihat Lebih Lanjut**, kita melihat bahwa data panggilan, yang disebut data input, memang kosong (`0x`). Perhatikan juga bahwa nilainya adalah 1,559 ETH, itu akan relevan nanti.

![Data panggilan kosong](calldata-empty.png)

Selanjutnya, klik tab **State** dan perluas kontrak yang sedang kita rekayasa balik (0x2510...). Anda dapat melihat bahwa `Penyimpanan[6]` memang berubah selama transaksi, dan jika Anda mengubah Hex menjadi **Angka**, Anda akan melihatnya menjadi 1.559.000.000.000.000.000, nilai yang ditransfer dalam wei (saya menambahkan koma untuk kejelasan), yang sesuai dengan nilai kontrak berikutnya.

![Perubahan dalam Penyimpanan[6]](storage6.png)

Jika kita melihat perubahan state yang disebabkan oleh [transaksi `Transfer` lainnya dari periode yang sama](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) kita melihat bahwa `Penyimpanan[6]` melacak nilai kontrak untuk sementara waktu. Untuk saat ini kita akan menyebutnya `Nilai*`. Tanda bintang (\*) mengingatkan kita bahwa kita belum tahu apa yang dilakukan variabel ini, tetapi tidak mungkin hanya untuk melacak nilai kontrak karena tidak perlu menggunakan penyimpanan, yang sangat mahal, ketika Anda bisa mendapatkan saldo akun Anda menggunakan `ADDRESS BALANCE`. Opcode pertama mendorong alamat kontrak itu sendiri. Yang kedua membaca alamat di bagian atas tumpukan dan menggantinya dengan saldo alamat tersebut.

| Offset | Opcode       | Tumpukan                                    |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Nilai\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Nilai\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Nilai\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Nilai\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |                                             |

Kita akan terus melacak kode ini di tujuan lompatan.

| Offset | Opcode     | Tumpukan                                                    |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Nilai\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Nilai\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Nilai\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Nilai\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` adalah bitwise, jadi ia membalikkan nilai setiap bit dalam nilai panggilan.

| Offset | Opcode       | Tumpukan                                                                                               |
| -----: | ------------ | ------------------------------------------------------------------------------------------------------ |
|    1AC | DUP3         | Nilai\* 2^256-CALLVALUE-1 0x00 Nilai\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|    1AD | GT           | Nilai\*>2^256-CALLVALUE-1 0x00 Nilai\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|    1AE | ISZERO       | Nilai\*\<=2^256-CALLVALUE-1 0x00 Nilai\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Nilai\*\<=2^256-CALLVALUE-1 0x00 Nilai\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |                                                                                                        |

Kita melompat jika `Nilai*` lebih kecil dari 2^256-CALLVALUE-1 atau sama dengannya. Ini terlihat seperti logika untuk mencegah overflow. Dan memang, kita melihat bahwa setelah beberapa operasi yang tidak masuk akal (menulis ke memori yang akan dihapus, misalnya) di offset 0x01DE, kontrak akan dikembalikan jika overflow terdeteksi, yang merupakan perilaku normal.

Perhatikan bahwa overflow seperti itu sangat tidak mungkin, karena akan memerlukan nilai panggilan ditambah `Nilai*` agar sebanding dengan 2^256 wei, sekitar 10^59 ETH. [Total pasokan ETH, saat tulisan ini dibuat, kurang dari dua ratus juta](https://etherscan.io/stat/supply).

| Offset | Opcode   | Tumpukan                                  |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Nilai\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Nilai\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Nilai\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Nilai\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |                                           |

Jika kita sampai di sini, dapatkan `Nilai* + CALLVALUE` dan lompat ke offset 0x75.

| Offset | Opcode   | Tumpukan                        |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Nilai\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Nilai\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Nilai\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

Jika kita sampai di sini (yang mengharuskan data panggilan kosong) kita menambahkan nilai panggilan ke `Nilai*`. Ini konsisten dengan apa yang kita katakan dilakukan oleh transaksi `Transfer`.

| Offset | Opcode |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Terakhir, bersihkan tumpukan (yang tidak perlu) dan beri sinyal akhir transaksi yang berhasil.

Singkatnya, inilah diagram alir untuk kode awal.

![Diagram alir titik masuk](flowchart-entry.png)

## Penangan di 0x7C {#the-handler-at-0x7c}

Saya sengaja tidak mencantumkan apa yang dilakukan oleh penangan ini di judul. Poinnya bukan untuk mengajari Anda bagaimana kontrak spesifik ini bekerja, tetapi bagaimana melakukan reverse engineering kontrak. Anda akan mempelajari apa yang dilakukannya dengan cara yang sama seperti yang saya lakukan, dengan mengikuti kode.

Kita sampai di sini dari beberapa tempat:

- Jika ada data panggilan sebesar 1, 2, atau 3 byte (dari offset 0x63)
- Jika tanda tangan metode tidak diketahui (dari offset 0x42 dan 0x5D)

| Offset | Opcode       | Tumpukan                                                                     |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|     7C | JUMPDEST     |                                                                              |
|     7D | PUSH1 0x00   | 0x00                                                                         |
|     7F | PUSH2 0x009d | 0x9D 0x00                                                                    |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00                                                               |
|     84 | SLOAD        | Penyimpanan[3] 0x9D 0x00 |

Ini adalah sel penyimpanan lain, yang tidak dapat saya temukan dalam transaksi apa pun sehingga lebih sulit untuk mengetahui artinya. Kode di bawah ini akan membuatnya lebih jelas.

| Offset | Opcode                                            | Tumpukan                                                                                                                                                |
| -----: | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Penyimpanan[3] 0x9D 0x00 |
|     9A | AND                                               | Penyimpanan[3]-sebagai-alamat 0x9D 0x00                                                             |

Opcode ini memotong nilai yang kita baca dari Penyimpanan[3] menjadi 160 bit, panjang alamat Ethereum.

| Offset | Opcode | Tumpukan                                                                                    |
| -----: | ------ | ------------------------------------------------------------------------------------------- |
|     9B | SWAP1  | 0x9D Penyimpanan[3]-sebagai-alamat 0x00 |
|     9C | JUMP   | Penyimpanan[3]-sebagai-alamat 0x00      |

Lompatan ini berlebihan, karena kita akan menuju ke opcode berikutnya. Kode ini tidak seefisien gas yang seharusnya.

| Offset | Opcode     | Tumpukan                                                                                                                                        |
| -----: | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|     9D | JUMPDEST   | Penyimpanan[3]-sebagai-alamat 0x00                                                          |
|     9E | SWAP1      | 0x00 Penyimpanan[3]-sebagai-alamat                                                          |
|     9F | POP        | Penyimpanan[3]-sebagai-alamat                                                               |
|     A0 | PUSH1 0x40 | 0x40 Penyimpanan[3]-sebagai-alamat                                                          |
|     A2 | MLOAD      | Mem[0x40] Penyimpanan[3]-sebagai-alamat |

Di awal sekali kode, kita mengatur Mem[0x40] menjadi 0x80. Jika kita mencari 0x40 nanti, kita melihat bahwa kita tidak mengubahnya - jadi kita bisa berasumsi nilainya 0x80.

| Offset | Opcode       | Tumpukan                                                                                                      |
| -----: | ------------ | ------------------------------------------------------------------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Penyimpanan[3]-sebagai-alamat           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Penyimpanan[3]-sebagai-alamat      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Penyimpanan[3]-sebagai-alamat |
|     A7 | CALLDATACOPY | 0x80 Penyimpanan[3]-sebagai-alamat                        |

Salin semua data panggilan ke memori, mulai dari 0x80.

| Offset | Opcode                             | Tumpukan                                                                                                                                                                                                 |
| -----: | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00                         | 0x00 0x80 Penyimpanan[3]-sebagai-alamat                                                                                                              |
|     AA | DUP1                               | 0x00 0x00 0x80 Penyimpanan[3]-sebagai-alamat                                                                                                         |
|     AB | CALLDATASIZE                       | CALLDATASIZE 0x00 0x00 0x80 Penyimpanan[3]-sebagai-alamat                                                                                            |
|     AC | DUP4                               | 0x80 CALLDATASIZE 0x00 0x00 0x80 Penyimpanan[3]-sebagai-alamat                                                                                       |
|     AD | DUP6                               | Penyimpanan[3]-sebagai-alamat 0x80 CALLDATASIZE 0x00 0x00 0x80 Penyimpanan[3]-sebagai-alamat     |
|     AE | GAS                                | GAS Penyimpanan[3]-sebagai-alamat 0x80 CALLDATASIZE 0x00 0x00 0x80 Penyimpanan[3]-sebagai-alamat |
|     AF | DELEGATE_CALL |                                                                                                                                                                                                          |

Sekarang semuanya jauh lebih jelas. Kontrak ini dapat bertindak sebagai [proksi](https://blog.openzeppelin.com/proxy-patterns/), memanggil alamat di Penyimpanan[3] untuk melakukan pekerjaan yang sebenarnya. `DELEGATE_CALL` memanggil kontrak terpisah, tetapi tetap berada di penyimpanan yang sama. Ini berarti bahwa kontrak yang didelegasikan, yang menjadi proksi kita, mengakses ruang penyimpanan yang sama. Parameter untuk panggilan tersebut adalah:

- _Gas_: Semua gas yang tersisa
- _Alamat yang dipanggil_: Penyimpanan[3]-sebagai-alamat
- _Data panggilan_: byte CALLDATASIZE yang dimulai dari 0x80, tempat kita meletakkan data panggilan asli
- _Data kembali_: Tidak ada (0x00 - 0x00) Kita akan mendapatkan data kembali dengan cara lain (lihat di bawah)

| Offset | Opcode         | Tumpukan                                                                                                                                                                                                                       |
| -----: | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat                          |

Di sini kita menyalin semua data yang dikembalikan ke buffer memori yang dimulai dari 0x80.

| Offset | Opcode       | Tumpukan                                                                                                                                                                                                                                                                                                                                                                                              |
| -----: | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((keberhasilan/kegagalan panggilan))) RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat                                                                                                 |
|     B7 | DUP1         | (((keberhasilan/kegagalan panggilan))) (((keberhasilan/kegagalan panggilan))) RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat |
|     B8 | ISZERO       | (((apakah panggilan gagal))) (((keberhasilan/kegagalan panggilan))) RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat           |
|     B9 | PUSH2 0x00c0 | 0xC0 (((apakah panggilan gagal))) (((keberhasilan/kegagalan panggilan))) RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat      |
|     BC | JUMPI        | (((keberhasilan/kegagalan panggilan))) RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat                                                                                                 |
|     BD | DUP2         | RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat                                                                                  |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat                                                                             |
|     BF | RETURN       |                                                                                                                                                                                                                                                                                                                                                                                                       |

Jadi setelah panggilan, kita menyalin data yang dikembalikan ke buffer 0x80 - 0x80+RETURNDATASIZE, dan jika panggilan berhasil, kita kemudian `KEMBALI` dengan buffer yang persis sama.

### DELEGATECALL Gagal {#delegatecall-failed}

Jika kita sampai di sini, ke 0xC0, itu berarti kontrak yang kita panggil telah dibatalkan. Karena kita hanya proksi untuk kontrak itu, kita ingin mengembalikan data yang sama dan juga mengembalikan.

| Offset | Opcode   | Tumpukan                                                                                                                                                                                                                                                                                                                  |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((keberhasilan/kegagalan panggilan))) RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat                     |
|     C1 | DUP2     | RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) RETURNDATASIZE (((keberhasilan/kegagalan panggilan))) 0x80 Penyimpanan[3]-sebagai-alamat |
|     C3 | REVERT   |                                                                                                                                                                                                                                                                                                                           |

Jadi kita `MENGEMBALIKAN` dengan buffer yang sama yang kita gunakan untuk `MENGEMBALIKAN` sebelumnya: 0x80 - 0x80+RETURNDATASIZE

![Diagram alir panggilan ke proksi](flowchart-proxy.png)

## Panggilan ABI {#abi-calls}

Jika ukuran data panggilan adalah empat byte atau lebih, ini mungkin panggilan ABI yang valid.

| Offset | Opcode       | Tumpukan                                                                                                                          |
| -----: | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                                                                                                              |
|      F | CALLDATALOAD | (((Kata pertama (256 bit) dari data panggilan)))      |
|     10 | PUSH1 0xe0   | 0xE0 (((Kata pertama (256 bit) dari data panggilan))) |
|     12 | SHR          | (((32 bit pertama (4 byte) dari data panggilan)))     |

Etherscan memberi tahu kita bahwa `1C` adalah opcode yang tidak dikenal, karena [itu ditambahkan setelah Etherscan menulis fitur ini](https://eips.ethereum.org/EIPS/eip-145) dan mereka belum memperbaruinya. Sebuah [tabel opcode terbaru](https://github.com/wolflo/evm-opcodes) menunjukkan kepada kita bahwa ini adalah geser ke kanan

| Offset | Opcode           | Tumpukan                                                                                                                                                                                                                                                               |
| -----: | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((32 bit pertama (4 byte) dari data panggilan))) (((32 bit pertama (4 byte) dari data panggilan)))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((32 bit pertama (4 byte) dari data panggilan))) (((32 bit pertama (4 byte) dari data panggilan))) |
|     19 | GT               | 0x3CD8045E>32-bit-pertama-dari-data-panggilan (((32 bit pertama (4 byte) dari data panggilan)))                                                                                            |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>32-bit-pertama-dari-data-panggilan (((32 bit pertama (4 byte) dari data panggilan)))                                                                                       |
|     1D | JUMPI            | (((32 bit pertama (4 byte) dari data panggilan)))                                                                                                                                          |

Dengan membagi tes pencocokan tanda tangan metode menjadi dua seperti ini akan menghemat rata-rata setengah tes. Kode yang langsung mengikuti ini dan kode di 0x43 mengikuti pola yang sama: `DUP1` 32 bit pertama dari data panggilan, `PUSH4 (((tanda tangan metode)`, jalankan `EQ` untuk memeriksa kesetaraan, lalu `JUMPI` jika tanda tangan metode cocok. Berikut adalah tanda tangan metode, alamatnya, dan jika diketahui [definisi metode yang sesuai](https://www.4byte.directory/):

| Metode                                                                                                    | Tanda tangan metode | Offset untuk melompat |
| --------------------------------------------------------------------------------------------------------- | ------------------- | --------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e          | 0x0103                |
| ???                                                                                                       | 0x81e580d3          | 0x0138                |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4          | 0x0158                |
| ???                                                                                                       | 0x1f135823          | 0x00C4                |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab          | 0x00ED                |

Jika tidak ditemukan kecocokan, kode akan melompat ke [penangan proksi di 0x7C](#the-handler-at-0x7c), dengan harapan bahwa kontrak tempat kami menjadi proksi memiliki kecocokan.

![Diagram alir panggilan ABI](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Opcode       | Tumpukan                      |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |                               |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |                               |

Hal pertama yang dilakukan fungsi ini adalah memeriksa bahwa panggilan tidak mengirim ETH apa pun. Fungsi ini tidak [`payable`](https://solidity-by-example.org/payable/). Jika seseorang mengirimi kita ETH, itu pasti kesalahan dan kita ingin `MENGEMBALIKAN` untuk menghindari ETH itu berada di tempat yang tidak dapat mereka ambil kembali.

| Offset | Opcode                                            | Tumpukan                                                                                                                                                                                                                           |
| -----: | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |                                                                                                                                                                                                                                    |
|    110 | POP                                               |                                                                                                                                                                                                                                    |
|    111 | PUSH1 0x03                                        | 0x03                                                                                                                                                                                                                               |
|    113 | SLOAD                                             | (((Penyimpanan[3] alias kontrak yang kami proksikan)))                                                                |
|    114 | PUSH1 0x40                                        | 0x40 (((Penyimpanan[3] alias kontrak yang kami proksikan)))                                                           |
|    116 | MLOAD                                             | 0x80 (((Penyimpanan[3] alias kontrak yang kami proksikan)))                                                           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Penyimpanan[3] alias kontrak yang kami proksikan))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Penyimpanan[3] alias kontrak yang kami proksikan))) |
|    12D | SWAP2                                             | (((Penyimpanan[3] alias kontrak yang kami proksikan))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                                                                                                                                                                                     |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                                                                                                                                                                                |
|    130 | MSTORE                                            | 0x80                                                                                                                                                                                                                               |

Dan 0x80 sekarang berisi alamat proksi

| Offset | Opcode       | Tumpukan  |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Kode E4 {#the-e4-code}

Ini adalah pertama kalinya kita melihat baris-baris ini, tetapi mereka dibagikan dengan metode lain (lihat di bawah). Jadi kita akan menyebut nilai dalam tumpukan X, dan ingat bahwa dalam `splitter()` nilai X ini adalah 0xA0.

| Offset | Opcode     | Tumpukan    |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |             |

Jadi kode ini menerima penunjuk memori di tumpukan (X), dan menyebabkan kontrak `MENGEMBALIKAN` dengan buffer yaitu 0x80 - X.

Dalam kasus `splitter()`, ini mengembalikan alamat yang kami proksikan. `KEMBALI` mengembalikan buffer di 0x80-0x9F, di mana kita menulis data ini (offset 0x130 di atas).

## currentWindow() {#currentwindow}

Kode di offset 0x158-0x163 identik dengan yang kita lihat di 0x103-0x10E di `splitter()` (selain tujuan `JUMPI`), jadi kita tahu `currentWindow()` juga tidak `payable`.

| Offset | Opcode       | Tumpukan                                                                     |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    164 | JUMPDEST     |                                                                              |
|    165 | POP          |                                                                              |
|    166 | PUSH2 0x00da | 0xDA                                                                         |
|    169 | PUSH1 0x01   | 0x01 0xDA                                                                    |
|    16B | SLOAD        | Penyimpanan[1] 0xDA      |
|    16C | DUP2         | 0xDA Penyimpanan[1] 0xDA |
|    16D | JUMP         | Penyimpanan[1] 0xDA      |

### Kode DA {#the-da-code}

Kode ini juga dibagikan dengan metode lain. Jadi kita akan menyebut nilai dalam tumpukan Y, dan ingat bahwa dalam `currentWindow()` nilai Y ini adalah Penyimpanan[1].

| Offset | Opcode     | Tumpukan         |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Tulis Y ke 0x80-0x9F.

| Offset | Opcode     | Tumpukan       |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

Dan sisanya sudah dijelaskan [di atas](#the-e4-code). Jadi lompatan ke 0xDA menulis nilai tumpukan teratas (Y) ke 0x80-0x9F, dan mengembalikan nilai itu. Dalam kasus `currentWindow()`, ia mengembalikan Penyimpanan[1].

## merkleRoot() {#merkleroot}

Kode di offset 0xED-0xF8 identik dengan yang kita lihat di 0x103-0x10E di `splitter()` (selain tujuan `JUMPI`), jadi kita tahu `merkleRoot()` juga tidak `payable`.

| Offset | Opcode       | Tumpukan                                                                     |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|     F9 | JUMPDEST     |                                                                              |
|     FA | POP          |                                                                              |
|     FB | PUSH2 0x00da | 0xDA                                                                         |
|     FE | PUSH1 0x00   | 0x00 0xDA                                                                    |
|    100 | SLOAD        | Penyimpanan[0] 0xDA      |
|    101 | DUP2         | 0xDA Penyimpanan[0] 0xDA |
|    102 | JUMP         | Penyimpanan[0] 0xDA      |

Apa yang terjadi setelah lompatan [sudah kita ketahui](#the-da-code). Jadi `merkleRoot()` mengembalikan Penyimpanan[0].

## 0x81e580d3 {#0x81e580d3}

Kode di offset 0x138-0x143 identik dengan yang kita lihat di 0x103-0x10E di `splitter()` (selain tujuan `JUMPI`), jadi kita tahu fungsi ini juga tidak `payable`.

| Offset | Opcode       | Tumpukan                                                                        |
| -----: | ------------ | ------------------------------------------------------------------------------- |
|    144 | JUMPDEST     |                                                                                 |
|    145 | POP          |                                                                                 |
|    146 | PUSH2 0x00da | 0xDA                                                                            |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                                     |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                                        |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                                            |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                         |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                    |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                       |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                    |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |

Sepertinya fungsi ini membutuhkan setidaknya 32 byte (satu kata) data panggilan.

| Offset | Opcode | Tumpukan                                     |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |                                              |

Jika tidak mendapatkan data panggilan, transaksi akan dibatalkan tanpa data yang dikembalikan.

Mari kita lihat apa yang terjadi jika fungsi _memang_ mendapatkan data panggilan yang dibutuhkannya.

| Offset | Opcode       | Tumpukan                                                    |
| -----: | ------------ | ----------------------------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA                               |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` adalah kata pertama dari data panggilan _setelah_ tanda tangan metode

| Offset | Opcode       | Tumpukan                                                                                                                                                                                                                 |
| -----: | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                                                                                                                                              |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                                                                                                                                              |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                                                                                                                                           |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                                  |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                                  |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                                                                                                                                           |
|    157 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                                  |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                                  |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                                                                                                                                             |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                          |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                     |
|    173 | SLOAD        | Penyimpanan[4] calldataload(4) 0x04 calldataload(4) 0xDA                                                                       |
|    174 | DUP2         | calldataload(4) Penyimpanan[4] calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    175 | LT           | calldataload(4)\<Penyimpanan[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Penyimpanan[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                          |

Jika kata pertama tidak kurang dari Penyimpanan[4], fungsi akan gagal. Ini akan dibatalkan tanpa nilai yang dikembalikan:

| Offset | Opcode     | Tumpukan                                                      |
| -----: | ---------- | ------------------------------------------------------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |                                                               |

Jika calldataload(4) kurang dari Penyimpanan[4], kita mendapatkan kode ini:

| Offset | Opcode     | Tumpukan                                                                                  |
| -----: | ---------- | ----------------------------------------------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

Dan lokasi memori 0x00-0x1F sekarang berisi data 0x04 (0x00-0x1E semuanya nol, 0x1F adalah empat)

| Offset | Opcode     | Tumpukan                                                                                                                                                                                                                         |
| -----: | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                                                                                                                                             |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                                                                                                                                             |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                                                                                                                                             |
|    188 | SHA3       | (((SHA3 dari 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA                                                                    |
|    189 | ADD        | (((SHA3 dari 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA                                                                    |
|    18A | SLOAD      | Penyimpanan[(((SHA3 dari 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Jadi ada tabel pencarian di penyimpanan, yang dimulai dari SHA3 dari 0x000...0004 dan memiliki entri untuk setiap nilai data panggilan yang sah (nilai di bawah Penyimpanan[4]).

| Offset | Opcode | Tumpukan                                                                                                                                                                                                                         |
| -----: | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Penyimpanan[(((SHA3 dari 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Penyimpanan[(((SHA3 dari 0x00-0x1F))) + calldataload(4)] 0xDA                                    |
|    18D | DUP2   | 0xDA Penyimpanan[(((SHA3 dari 0x00-0x1F))) + calldataload(4)] 0xDA                               |
|    18E | JUMP   | Penyimpanan[(((SHA3 dari 0x00-0x1F))) + calldataload(4)] 0xDA                                    |

Kita sudah tahu apa yang [kode di offset 0xDA](#the-da-code) lakukan, ia mengembalikan nilai tumpukan teratas ke pemanggil. Jadi fungsi ini mengembalikan nilai dari tabel pencarian ke pemanggil.

## 0x1f135823 {#0x1f135823}

Kode di offset 0xC4-0xCF identik dengan yang kita lihat di 0x103-0x10E di `splitter()` (selain tujuan `JUMPI`), jadi kita tahu fungsi ini juga tidak `payable`.

| Offset | Opcode       | Tumpukan          |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |                   |
|     D1 | POP          |                   |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Nilai\* 0xDA      |
|     D8 | DUP2         | 0xDA Nilai\* 0xDA |
|     D9 | JUMP         | Nilai\* 0xDA      |

Kita sudah tahu apa yang [kode di offset 0xDA](#the-da-code) lakukan, ia mengembalikan nilai tumpukan teratas ke pemanggil. Jadi fungsi ini mengembalikan `Nilai*`.

### Ringkasan Metode {#method-summary}

Apakah Anda merasa sudah memahami kontraknya pada saat ini? Saya tidak. Sejauh ini kita memiliki metode-metode ini:

| Metode                                               | Arti                                                                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Transfer                                             | Terima nilai yang disediakan oleh panggilan dan tingkatkan `Nilai*` dengan jumlah tersebut                                                 |
| [splitter()](#splitter)           | Kembalikan Penyimpanan[3], alamat proksi                                               |
| [currentWindow()](#currentwindow) | Kembalikan Penyimpanan[1]                                                              |
| [merkleRoot()](#merkeroot)        | Kembalikan Penyimpanan[0]                                                              |
| [0x81e580d3](#0x81e580d3)                            | Kembalikan nilai dari tabel pencarian, asalkan parameternya kurang dari Penyimpanan[4] |
| [0x1f135823](#0x1f135823)                            | Kembalikan Penyimpanan[6], alias. Nilai\*                              |

Tetapi kita tahu fungsionalitas lain disediakan oleh kontrak di Penyimpanan[3]. Mungkin jika kita tahu kontrak apa itu, itu akan memberi kita petunjuk. Untungnya, ini adalah rantai blok dan semuanya diketahui, setidaknya secara teori. Kami tidak melihat metode apa pun yang mengatur Penyimpanan[3], jadi itu pasti telah diatur oleh konstruktor.

## Konstruktor {#the-constructor}

Ketika kita [melihat sebuah kontrak](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) kita juga bisa melihat transaksi yang membuatnya.

![Klik transaksi pembuatan](create-tx.png)

Jika kita mengklik transaksi itu, lalu tab **State**, kita dapat melihat nilai awal parameter. Secara khusus, kita dapat melihat bahwa Penyimpanan[3] berisi [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Kontrak itu harus berisi fungsionalitas yang hilang. Kita dapat memahaminya menggunakan alat yang sama yang kita gunakan untuk kontrak yang sedang kita selidiki.

## Kontrak Proksi {#the-proxy-contract}

Dengan menggunakan teknik yang sama seperti yang kita gunakan untuk kontrak asli di atas, kita dapat melihat bahwa kontrak akan dikembalikan jika:

- Ada ETH yang melekat pada panggilan (0x05-0x0F)
- Ukuran data panggilan kurang dari empat (0x10-0x19 dan 0xBE-0xC2)

Dan metode yang didukungnya adalah:

| Metode                                                                                                                                                                                 | Tanda tangan metode          | Offset untuk melompat |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)                                                     | 0x8ffb5c97                   | 0x0135                |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)                                                                   | 0xd2ef0795                   | 0x0151                |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4                |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                                                                            | 0x338b1d31                   | 0x0110                |
| ???                                                                                                                                                                                    | 0x3f26479e                   | 0x0118                |
| ???                                                                                                                                                                                    | 0x1e7df9d3                   | 0x00C3                |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                                                                              | [0xba0bafb4](#currentwindow) | 0x0148                |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                                                                                 | [0x2eb4a7ab](#merkleroot)    | 0x0107                |
| ???                                                                                                                                                                                    | [0x81e580d3](#0x81e580d3)    | 0x0122                |
| ???                                                                                                                                                                                    | [0x1f135823](#0x1f135823)    | 0x00D8                |

Kita bisa mengabaikan empat metode terbawah karena kita tidak akan pernah sampai ke sana. Tanda tangan mereka sedemikian rupa sehingga kontrak asli kita menanganinya sendiri (Anda dapat mengklik tanda tangan untuk melihat detail di atas), jadi mereka pasti [metode yang diganti](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Salah satu metode yang tersisa adalah `claim(<params>)`, dan yang lainnya adalah `isClaimed(<params>)`, jadi sepertinya ini adalah kontrak airdrop. Daripada menelusuri sisa opcode satu per satu, kita bisa [mencoba decompiler](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), yang menghasilkan hasil yang dapat digunakan untuk tiga fungsi dari kontrak ini. Melakukan reverse engineering pada yang lain diserahkan sebagai latihan bagi pembaca.

### scaleAmountByPercentage {#scaleamountbypercentage}

Inilah yang diberikan oleh decompiler untuk fungsi ini:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

`require` pertama menguji bahwa data panggilan memiliki, selain empat byte tanda tangan fungsi, setidaknya 64 byte, cukup untuk kedua parameter. Jika tidak, maka jelas ada yang salah.

Pernyataan `if` tampaknya memeriksa bahwa `_param1` bukan nol, dan bahwa `_param1 * _param2` tidak negatif. Ini mungkin untuk mencegah kasus wrap around.

Terakhir, fungsi mengembalikan nilai yang diskalakan.

### klaim {#claim}

Kode yang dibuat decompiler rumit, dan tidak semuanya relevan bagi kita. Saya akan melewatkan beberapa di antaranya untuk fokus pada baris yang saya yakini memberikan informasi yang berguna

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'tidak dapat mengklaim untuk jendela mendatang'
```

Kita melihat dua hal penting di sini:

- `_param2`, meskipun dideklarasikan sebagai `uint256`, sebenarnya adalah sebuah alamat
- `_param1` adalah jendela yang diklaim, yang harus `currentWindow` atau lebih awal.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Akun sudah mengklaim jendela yang diberikan'
```

Jadi sekarang kita tahu bahwa Penyimpanan[5] adalah array jendela dan alamat, dan apakah alamat tersebut mengklaim hadiah untuk jendela itu.

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
      revert with 0, 'Bukti tidak valid'
```

Kita tahu bahwa `unknown2eb4a7ab` sebenarnya adalah fungsi `merkleRoot()`, jadi kode ini sepertinya sedang memverifikasi [bukti merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Ini berarti `_param4` adalah bukti merkle.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Ini adalah cara kontrak mentransfer ETH-nya sendiri ke alamat lain (kontrak atau milik eksternal). Ini memanggilnya dengan nilai yang merupakan jumlah yang akan ditransfer. Jadi sepertinya ini adalah airdrop ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Dua baris terbawah memberi tahu kita bahwa Penyimpanan[2] juga merupakan kontrak yang kita panggil. Jika kita [melihat transaksi konstruktor](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) kita melihat bahwa kontrak ini adalah [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), sebuah kontrak Wrapped Ether [yang kode sumbernya telah diunggah ke Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Jadi sepertinya kontrak mencoba mengirim ETH ke `_param2`. Jika bisa, bagus. Jika tidak, ia mencoba mengirim [WETH](https://weth.tkn.eth.limo/). Jika `_param2` adalah akun dengan kepemilikan eksternal (EOA) maka ia selalu dapat menerima ETH, tetapi kontrak dapat menolak untuk menerima ETH. Namun, WETH adalah ERC-20 dan kontrak tidak dapat menolak untuk menerimanya.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Di akhir fungsi kita melihat entri log sedang dibuat. [Lihat entri log yang dihasilkan](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) dan filter pada topik yang dimulai dengan `0xdbd5...`. Jika kita [mengklik salah satu transaksi yang menghasilkan entri seperti itu](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) kita melihat bahwa memang terlihat seperti klaim - akun mengirim pesan ke kontrak yang sedang kita rekayasa balik, dan sebagai imbalannya mendapatkan ETH.

![Transaksi klaim](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Fungsi ini sangat mirip dengan [`klaim`](#claim) di atas. Ini juga memeriksa bukti merkle, mencoba mentransfer ETH ke yang pertama, dan menghasilkan jenis entri log yang sama.

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
      revert with 0, 'Bukti tidak valid'
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

Perbedaan utamanya adalah parameter pertama, jendela untuk menarik, tidak ada. Sebaliknya, ada putaran di semua jendela yang bisa diklaim.

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

Jadi sepertinya varian `klaim` yang mengklaim semua jendela.

## Kesimpulan {#conclusion}

Sekarang Anda seharusnya tahu cara memahami kontrak yang kode sumbernya tidak tersedia, baik menggunakan opcode atau (ketika berhasil) decompiler. Seperti yang terlihat dari panjangnya artikel ini, melakukan reverse engineering sebuah kontrak bukanlah hal yang sepele, tetapi dalam sistem di mana keamanan sangat penting, ini adalah keterampilan penting untuk dapat memverifikasi bahwa kontrak bekerja seperti yang dijanjikan.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).
