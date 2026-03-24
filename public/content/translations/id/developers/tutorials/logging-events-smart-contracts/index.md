---
title: Mencatat data dari kontrak pintar dengan event
description: Pengenalan tentang event kontrak pintar dan bagaimana Anda dapat menggunakannya untuk mencatat data
author: "jdourlens"
tags: ["kontrak pintar", "Remix", "Solidity", "event"]
skill: intermediate
breadcrumb: "Pencatatan event"
lang: id
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam Solidity, [event](/developers/docs/smart-contracts/anatomy/#events-and-logs) adalah sinyal yang dikirimkan yang dapat dipicu oleh kontrak pintar. Dapps, atau apa pun yang terhubung ke API JSON-RPC Ethereum, dapat mendengarkan event ini dan bertindak sesuai dengan itu. Sebuah event juga dapat diindeks sehingga riwayat event tersebut dapat dicari di kemudian hari.

## Event {#events}

Event yang paling umum di blockchain Ethereum pada saat penulisan artikel ini adalah event Transfer yang dipancarkan oleh token ERC20 ketika seseorang mentransfer token.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Tanda tangan event dideklarasikan di dalam kode kontrak dan dapat dipancarkan dengan kata kunci emit. Sebagai contoh, event transfer mencatat siapa yang mengirim transfer (_from_), kepada siapa (_to_) dan berapa banyak token yang ditransfer (_value_).

Jika kita kembali ke kontrak pintar Counter kita dan memutuskan untuk mencatat setiap kali nilainya berubah. Karena kontrak ini tidak dimaksudkan untuk diterapkan tetapi berfungsi sebagai dasar untuk membangun kontrak lain dengan memperluasnya: ini disebut kontrak abstrak. Dalam kasus contoh counter kita, akan terlihat seperti ini:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Private variable of type unsigned int to keep the number of counts // Variabel privat bertipe unsigned int untuk menyimpan jumlah hitungan
    uint256 private count = 0;

    // Function that increments our counter // Fungsi yang menaikkan penghitung kita
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter to get the count value // Getter untuk mendapatkan nilai hitungan
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Perhatikan bahwa:

- **Baris 5**: kita mendeklarasikan event kita dan apa isinya, nilai lama dan nilai baru.

- **Baris 13**: Ketika kita menambah variabel hitungan kita, kita memancarkan event tersebut.

Jika kita sekarang menerapkan kontrak dan memanggil fungsi increment, kita akan melihat bahwa Remix akan secara otomatis menampilkannya jika Anda mengklik transaksi baru di dalam array yang bernama logs.

![Tangkapan layar Remix](./remix-screenshot.png)

Log sangat berguna untuk men-debug kontrak pintar Anda tetapi juga penting jika Anda membangun aplikasi yang digunakan oleh orang yang berbeda dan membuatnya lebih mudah untuk membuat analitik untuk melacak dan memahami bagaimana kontrak pintar Anda digunakan. Log yang dihasilkan oleh transaksi ditampilkan di penjelajah blok populer dan Anda juga dapat misalnya menggunakannya untuk membuat skrip offchain untuk mendengarkan event tertentu dan mengambil tindakan ketika event tersebut terjadi.