---
title: Mencatat data dari kontrak pintar dengan peristiwa
description: Pengantar tentang peristiwa kontrak pintar dan bagaimana Anda dapat menggunakannya untuk mencatat data
author: "jdourlens"
tags: ["kontrak pintar", "Remix", "Solidity", "peristiwa"]
skill: intermediate
breadcrumb: Pencatatan peristiwa
lang: id
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam Solidity, [peristiwa](/developers/docs/smart-contracts/anatomy/#events-and-logs) adalah sinyal yang dikirimkan yang dapat dipicu oleh kontrak pintar. Aplikasi terdesentralisasi (dapp), atau apa pun yang terhubung ke API JSON-RPC Ethereum, dapat mendengarkan peristiwa ini dan bertindak sesuai dengan itu. Sebuah peristiwa juga dapat diindeks sehingga riwayat peristiwa tersebut dapat dicari di kemudian hari.

## Peristiwa {#events}

Salah satu kejadian paling umum di rantai blok Ethereum adalah kejadian `Transfer` yang dikirimkan oleh token ERC-20 ketika seseorang mentransfer token.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Tanda tangan kejadian dideklarasikan di dalam kode kontrak dan dapat dikirimkan dengan kata kunci emit. Sebagai contoh, kejadian transfer mencatat siapa yang mengirim transfer (_from_), kepada siapa (_to_), dan berapa banyak token yang ditransfer (_value_).

Mari kita kembali ke kontrak pintar `Counter` dari [menyebarkan kontrak pintar pertama Anda](/developers/tutorials/deploying-your-first-smart-contract/) dan mencatat setiap kali nilainya berubah. Ini akan terlihat seperti ini:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // Variabel publik bertipe unsigned int untuk menyimpan jumlah hitungan
    uint256 public count = 0;

    // Fungsi yang menaikkan nilai penghitung kita
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter yang tidak diperlukan untuk mendapatkan nilai hitungan
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Perhatikan bahwa:

- **Baris 6**: kita mendeklarasikan kejadian kita dan apa yang dikandungnya, nilai lama dan nilai baru.

- **Baris 14**: Ketika kita menambah variabel hitungan kita, kita mengirimkan kejadian tersebut.

Jika kita sekarang menyebarkan kontrak dan memanggil fungsi increment, kita akan melihat bahwa Remix akan secara otomatis menampilkannya jika Anda mengeklik transaksi baru di dalam sebuah array bernama logs.

![Tangkapan layar Remix](./remix-screenshot.png)

Log sangat berguna untuk men-debug kontrak pintar Anda, tetapi juga penting jika Anda membangun aplikasi yang digunakan oleh berbagai orang dan membuatnya lebih mudah untuk membuat analitik guna melacak dan memahami bagaimana kontrak pintar Anda digunakan. Log yang dihasilkan oleh transaksi ditampilkan di penjelajah blok populer dan Anda juga dapat, misalnya, menggunakannya untuk membuat skrip offchain untuk mendengarkan kejadian tertentu dan mengambil tindakan ketika kejadian tersebut terjadi.
