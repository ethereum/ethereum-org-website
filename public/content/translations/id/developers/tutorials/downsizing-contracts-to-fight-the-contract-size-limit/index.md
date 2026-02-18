---
title: "Memperkecil ukuran kontrak untuk mengatasi batasan ukuran kontrak"
description: Apa yang dapat Anda lakukan untuk mencegah kontrak pintar Anda menjadi terlalu besar?
author: Markus Waas
lang: id
tags: [ "Solidity", "kontrak pintar", "penyimpanan" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Mengapa ada batasan? {#why-is-there-a-limit}

Pada [22 November 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) hard-fork Spurious Dragon memperkenalkan [EIP-170](https://eips.ethereum.org/EIPS/eip-170) yang menambahkan batas ukuran kontrak pintar sebesar 24.576 kb. Bagi Anda sebagai pengembang Solidity, ini berarti ketika Anda menambahkan lebih banyak fungsionalitas ke kontrak Anda, pada titik tertentu Anda akan mencapai batas dan saat menyebarkan akan melihat kesalahan:

`Peringatan: Ukuran kode kontrak melebihi 24576 bita (batasan yang diperkenalkan di Spurious Dragon). Kontrak ini mungkin tidak dapat disebarkan di Jaringan Utama. Pertimbangkan untuk mengaktifkan optimizer (dengan nilai "runs" yang rendah!), menonaktifkan string revert, atau menggunakan pustaka.`

Batasan ini diperkenalkan untuk mencegah serangan denial-of-service (DOS). Setiap pemanggilan ke kontrak relatif murah dari segi gas. Namun, dampak pemanggilan kontrak untuk node Ethereum meningkat secara tidak proporsional tergantung pada ukuran kode kontrak yang dipanggil (membaca kode dari disk, prapemrosesan kode, menambahkan data ke bukti Merkle). Setiap kali Anda berada dalam situasi di mana penyerang membutuhkan sedikit sumber daya untuk menyebabkan banyak pekerjaan bagi orang lain, Anda berpotensi terkena serangan DOS.

Awalnya ini tidak terlalu menjadi masalah karena salah satu batasan ukuran kontrak alami adalah batas gas blok. Tentunya, sebuah kontrak harus disebarkan dalam sebuah transaksi yang menyimpan semua bytecode kontrak. Jika Anda hanya menyertakan satu transaksi itu ke dalam sebuah blok, Anda dapat menggunakan semua gas itu, tetapi jumlahnya tidak tak terbatas. Sejak [Pembaruan London](/ethereum-forks/#london), batas gas blok dapat bervariasi antara 15 juta dan 30 juta unit tergantung pada permintaan jaringan.

Berikut ini kita akan melihat beberapa metode yang diurutkan berdasarkan potensi dampaknya. Anggap saja ini seperti menurunkan berat badan. Strategi terbaik bagi seseorang untuk mencapai target berat badannya (dalam kasus kita 24kb) adalah dengan fokus pada metode berdampak besar terlebih dahulu. Dalam kebanyakan kasus, hanya dengan memperbaiki pola makan Anda akan sampai di sana, tetapi terkadang Anda membutuhkan sedikit lebih banyak. Lalu Anda bisa menambahkan olahraga (dampak sedang) atau bahkan suplemen (dampak kecil).

## Dampak besar {#big-impact}

### Pisahkan kontrak Anda {#separate-your-contracts}

Ini harus selalu menjadi pendekatan pertama Anda. Bagaimana Anda bisa memisahkan kontrak menjadi beberapa yang lebih kecil? Hal ini umumnya memaksa Anda untuk menghasilkan arsitektur yang baik untuk kontrak Anda. Kontrak yang lebih kecil selalu lebih disukai dari perspektif keterbacaan kode. Untuk memisahkan kontrak, tanyakan pada diri Anda:

- Fungsi mana saja yang saling terkait? Setiap set fungsi mungkin paling baik berada di kontraknya sendiri.
- Fungsi mana yang tidak memerlukan pembacaan state kontrak atau hanya sebagian kecil dari state tersebut?
- Bisakah Anda memisahkan penyimpanan dan fungsionalitas?

### Pustaka {#libraries}

Salah satu cara sederhana untuk memindahkan kode fungsionalitas dari penyimpanan adalah dengan menggunakan [pustaka](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Jangan mendeklarasikan fungsi pustaka sebagai internal karena fungsi tersebut akan [ditambahkan ke kontrak](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) secara langsung selama kompilasi. Tetapi jika Anda menggunakan fungsi public, maka fungsi-fungsi tersebut akan benar-benar berada di dalam kontrak pustaka terpisah. Pertimbangkan [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) untuk membuat penggunaan pustaka lebih mudah.

### Proksi {#proxies}

Strategi yang lebih canggih adalah sistem proksi. Pustaka menggunakan `DELEGATECALL` di belakang, yang hanya menjalankan fungsi kontrak lain dengan state dari kontrak pemanggil. Kunjungi [postingan blog ini](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) untuk mempelajari lebih lanjut tentang sistem proksi. Proksi memberi Anda lebih banyak fungsionalitas, mis., memungkinkan pemutakhiran, tetapi juga menambah banyak kerumitan. Saya tidak akan menambahkannya hanya untuk mengurangi ukuran kontrak kecuali itu adalah satu-satunya pilihan Anda karena alasan apa pun.

## Dampak sedang {#medium-impact}

### Hapus fungsi {#remove-functions}

Yang ini seharusnya sudah jelas. Fungsi dapat menambah ukuran kontrak cukup banyak.

- **External**: Sering kali kita menambahkan banyak fungsi view untuk alasan kenyamanan. Itu tidak masalah sampai Anda mencapai batas ukuran. Maka Anda mungkin perlu benar-benar berpikir untuk menghapus semua kecuali yang benar-benar penting.
- **Internal**: Anda juga dapat menghapus fungsi internal/private dan cukup melakukan inlining kode selama fungsi tersebut hanya dipanggil sekali.

### Hindari variabel tambahan {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Perubahan sederhana seperti ini membuat perbedaan sebesar **0,28kb**. Kemungkinan besar Anda dapat menemukan banyak situasi serupa di kontrak Anda dan hal tersebut dapat bertambah hingga jumlah yang signifikan.

### Persingkat pesan kesalahan {#shorten-error-message}

Pesan revert yang panjang dan khususnya banyak pesan revert yang berbeda dapat memperbesar ukuran kontrak. Sebagai gantinya, gunakan kode kesalahan yang pendek dan dekodekan di kontrak Anda. Pesan yang panjang bisa menjadi jauh lebih pendek:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Gunakan kesalahan khusus alih-alih pesan kesalahan

Kesalahan khusus telah diperkenalkan di [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Ini adalah cara yang bagus untuk mengurangi ukuran kontrak Anda, karena dikodekan dengan ABI sebagai pemilih (sama seperti fungsi).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Pertimbangkan nilai run yang rendah di optimizer {#consider-a-low-run-value-in-the-optimizer}

Anda juga dapat mengubah pengaturan optimizer. Nilai default 200 berarti ia mencoba mengoptimalkan bytecode seolah-olah sebuah fungsi dipanggil 200 kali. Jika Anda mengubahnya menjadi 1, pada dasarnya Anda memberitahu optimizer untuk mengoptimalkan untuk kasus di mana setiap fungsi hanya dijalankan sekali. Fungsi yang dioptimalkan untuk berjalan hanya sekali berarti dioptimalkan untuk deployment itu sendiri. Perlu diketahui bahwa **ini meningkatkan [biaya gas](/developers/docs/gas/) untuk menjalankan fungsi**, jadi Anda mungkin tidak ingin melakukannya.

## Dampak kecil {#small-impact}

### Hindari meneruskan struct ke fungsi {#avoid-passing-structs-to-functions}

Jika Anda menggunakan [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), akan sangat membantu jika tidak meneruskan struct ke sebuah fungsi. Daripada meneruskan parameter sebagai sebuah struct, teruskan parameter yang diperlukan secara langsung. Dalam contoh ini kita menghemat **0,1kb** lagi.

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### Deklarasikan visibilitas yang benar untuk fungsi dan variabel {#declare-correct-visibility-for-functions-and-variables}

- Fungsi atau variabel yang hanya dipanggil dari luar? Deklarasikan sebagai `external` alih-alih `public`.
- Fungsi atau variabel yang hanya dipanggil dari dalam kontrak? Deklarasikan sebagai `private` atau `internal` alih-alih `public`.

### Hapus modifier {#remove-modifiers}

Modifier, terutama bila digunakan secara intensif, dapat berdampak signifikan pada ukuran kontrak. Pertimbangkan untuk menghapusnya dan sebagai gantinya gunakan fungsi.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Kiat-kiat ini akan membantu Anda mengurangi ukuran kontrak secara signifikan. Sekali lagi, saya tidak bisa cukup menekankannya, selalu fokus pada pemisahan kontrak jika memungkinkan untuk dampak terbesar.
