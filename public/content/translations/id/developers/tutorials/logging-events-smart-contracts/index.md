---
title: Mencatat data dari kontrak pintar dengan aksi
description: Pengantar aksi kontrak pintar dan cara menggunakannya untuk mencatat data
author: "jdourlens"
tags: [ "kontrak pintar", "remix", "Solidity", "aksi" ]
skill: intermediate
lang: id
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam Solidity, [aksi](/developers/docs/smart-contracts/anatomy/#events-and-logs) adalah sinyal yang dapat dipancarkan oleh kontrak pintar. Dapps, atau apa pun yang terhubung dengan API Ethereum JSON-RPC, dapat mendengarkan aksi ini dan bertindak sesuai. Sebuah aksi juga dapat diindeks sehingga riwayat aksi dapat dicari nanti.

## Peristiwa {#events}

Aksi yang paling umum di rantai blok Ethereum pada saat artikel ini ditulis adalah aksi Transfer yang dihasilkan oleh token ERC20 ketika seseorang mentransfer token.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Tanda aksi dideklarasikan di dalam kode kontrak dan dapat dihasilkan dengan kata kunci emit. Sebagai contoh, aksi transfer mencatat siapa yang mengirim transfer (_from_), kepada siapa (_to_) dan berapa banyak token yang ditransfer (_value_).

Jika kita kembali ke kontrak pintar Counter dan memutuskan untuk mencatat setiap kali nilai berubah. Karena kontrak ini tidak dimaksudkan untuk disebarkan tetapi berfungsi sebagai dasar untuk membangun kontrak lain dengan memperluasnya: ini disebut kontrak abstrak. Dalam kasus contoh penghitung kami, itu akan terlihat seperti ini:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Variabel pribadi tipe unsigned int untuk menyimpan jumlah hitungan
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

- **Baris 5**: kita mendeklarasikan aksi kita dan isinya, nilai lama dan nilai baru.

- **Baris 13**: Saat kita menambah variabel penghitung kita, kita memancarkan aksi.

Jika sekarang kita menyebarkan kontrak dan memanggil fungsi increment, kita akan melihat bahwa Remix akan menampilkannya secara otomatis jika Anda mengeklik transaksi baru di dalam sebuah array bernama logs.

![Tangkapan layar Remix](./remix-screenshot.png)

Log sangat berguna untuk men-debug kontrak pintar Anda, tetapi juga sangat penting jika Anda membangun aplikasi yang digunakan oleh berbagai orang dan memudahkan pembuatan analitik untuk melacak dan memahami bagaimana kontrak pintar Anda digunakan. Log yang dihasilkan oleh transaksi ditampilkan di penjelajah blok populer dan Anda juga dapat, misalnya, menggunakannya untuk membuat skrip di luar rantai untuk mendengarkan aksi tertentu dan mengambil tindakan saat aksi tersebut terjadi.
