---
title: Mencatat data dari kontrak pintar dengan peristiwa
description: Pengantar tentang peristiwa kontrak pintar dan bagaimana Anda dapat menggunakannya untuk mencatat data
author: "jdourlens"
tags: ["kontrak pintar", "Remix", "Solidity", "peristiwa"]
skill: intermediate
breadcrumb: Pencatatan peristiwa
lang: id
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam Solidity, [peristiwa](/developers/docs/smart-contracts/anatomy/#events-and-logs) adalah sinyal yang dikirimkan yang dapat dipicu oleh kontrak pintar. Aplikasi terdesentralisasi (dapp), atau apa pun yang terhubung ke API JSON-RPC Ethereum, dapat mendengarkan peristiwa ini dan bertindak sesuai dengan itu. Sebuah peristiwa juga dapat diindeks sehingga riwayat peristiwa tersebut dapat dicari di kemudian hari.

## Peristiwa {#events}

Peristiwa yang paling umum di rantai blok Ethereum pada saat penulisan artikel ini adalah peristiwa Transfer yang dipancarkan oleh token ERC-20 ketika seseorang mentransfer token.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Tanda tangan peristiwa dideklarasikan di dalam kode kontrak dan dapat dipancarkan dengan kata kunci emit. Misalnya, peristiwa transfer mencatat siapa yang mengirim transfer (_from_), kepada siapa (_to_), dan berapa banyak token yang ditransfer (_value_).

Jika kita kembali ke kontrak pintar Counter kita dan memutuskan untuk mencatat setiap kali nilainya berubah. Karena kontrak ini tidak dimaksudkan untuk disebarkan tetapi berfungsi sebagai dasar untuk membangun kontrak lain dengan memperluasnya: ini disebut kontrak abstrak. Dalam kasus contoh penghitung (counter) kita, tampilannya akan seperti ini:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Variabel privat bertipe unsigned int untuk menyimpan jumlah hitungan
    uint256 private count = 0;

    // Fungsi yang menaikkan penghitung kita
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter untuk mendapatkan nilai hitungan
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Perhatikan bahwa:

- **Baris 5**: kita mendeklarasikan peristiwa kita dan apa isinya, nilai lama dan nilai baru.

- **Baris 13**: Saat kita menambah variabel hitungan (count) kita, kita memancarkan peristiwa tersebut.

Jika kita sekarang menyebarkan kontrak dan memanggil fungsi increment, kita akan melihat bahwa Remix akan secara otomatis menampilkannya jika Anda mengklik transaksi baru di dalam array yang bernama logs.

![Remix screenshot](./remix-screenshot.png)

Log sangat berguna untuk men-debug kontrak pintar Anda, tetapi log juga penting jika Anda membangun aplikasi yang digunakan oleh orang yang berbeda dan membuatnya lebih mudah untuk membuat analitik guna melacak dan memahami bagaimana kontrak pintar Anda digunakan. Log yang dihasilkan oleh transaksi ditampilkan di penjelajah blok populer dan Anda juga dapat, misalnya, menggunakannya untuk membuat skrip offchain untuk mendengarkan peristiwa tertentu dan mengambil tindakan saat peristiwa itu terjadi.