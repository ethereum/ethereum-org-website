---
title: "Mengecilkan ukuran kontrak untuk mengatasi batas ukuran kontrak"
description: Apa yang dapat Anda lakukan untuk mencegah kontrak pintar Anda menjadi terlalu besar?
author: Markus Waas
lang: id
tags: ["solidity", "kontrak pintar", "penyimpanan"]
skill: intermediate
breadcrumb: Mengecilkan ukuran kontrak
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Mengapa ada batasan? {#why-is-there-a-limit}

Pada [22 November 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon), percabangan keras (hard-fork) Spurious Dragon memperkenalkan [EIP-170](https://eips.ethereum.org/EIPS/eip-170) yang menambahkan batas ukuran kontrak pintar sebesar 24,576 kb. Bagi Anda sebagai pengembang Solidity, ini berarti ketika Anda menambahkan semakin banyak fungsionalitas ke kontrak Anda, pada titik tertentu Anda akan mencapai batas tersebut dan saat melakukan penyebaran akan melihat kesalahan:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Batasan ini diperkenalkan untuk mencegah serangan penolakan layanan (denial-of-service/DOS). Setiap panggilan ke sebuah kontrak relatif murah dari segi gas. Namun, dampak panggilan kontrak untuk simpul (node) Ethereum meningkat secara tidak proporsional tergantung pada ukuran kode kontrak yang dipanggil (membaca kode dari disk, memproses awal kode, menambahkan data ke bukti Merkle). Kapan pun Anda menghadapi situasi di mana penyerang membutuhkan sedikit sumber daya untuk menyebabkan banyak pekerjaan bagi orang lain, Anda mendapatkan potensi serangan DOS.

Awalnya ini bukan masalah besar karena salah satu batas ukuran kontrak alami adalah batas gas blok. Jelas, sebuah kontrak harus disebarkan dalam sebuah transaksi yang menampung seluruh kode bita kontrak tersebut. Jika Anda hanya menyertakan satu transaksi itu ke dalam sebuah blok, Anda dapat menghabiskan semua gas tersebut, tetapi itu tidak tak terbatas. Sejak [Pembaruan London](/ethereum-forks/#london), batas gas blok dapat bervariasi antara 15 juta dan 30 juta unit tergantung pada permintaan jaringan.

Berikut ini kita akan melihat beberapa metode yang diurutkan berdasarkan potensi dampaknya. Anggap saja seperti menurunkan berat badan. Strategi terbaik bagi seseorang untuk mencapai target berat badannya (dalam kasus kita 24kb) adalah dengan berfokus pada metode berdampak besar terlebih dahulu. Dalam kebanyakan kasus, hanya dengan memperbaiki pola makan Anda akan mencapai tujuan tersebut, tetapi terkadang Anda membutuhkan sedikit usaha ekstra. Kemudian Anda mungkin menambahkan beberapa olahraga (dampak sedang) atau bahkan suplemen (dampak kecil).

## Dampak besar {#big-impact}

### Pisahkan kontrak Anda {#separate-your-contracts}

Ini harus selalu menjadi pendekatan pertama Anda. Bagaimana Anda dapat memisahkan kontrak menjadi beberapa kontrak yang lebih kecil? Hal ini umumnya memaksa Anda untuk menghasilkan arsitektur yang baik untuk kontrak Anda. Kontrak yang lebih kecil selalu lebih disukai dari perspektif keterbacaan kode. Untuk memisahkan kontrak, tanyakan pada diri Anda:

- Fungsi mana yang saling berkaitan? Setiap kumpulan fungsi mungkin paling baik berada di kontraknya sendiri.
- Fungsi mana yang tidak memerlukan pembacaan state kontrak atau hanya sebagian kecil tertentu dari state tersebut?
- Dapatkah Anda memisahkan penyimpanan dan fungsionalitas?

### Pustaka {#libraries}

Salah satu cara sederhana untuk memindahkan kode fungsionalitas dari penyimpanan adalah dengan menggunakan [Pustaka](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Jangan mendeklarasikan fungsi Pustaka sebagai internal karena fungsi tersebut akan [ditambahkan ke kontrak](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) secara langsung selama kompilasi. Namun jika Anda menggunakan fungsi publik, maka fungsi tersebut pada kenyataannya akan berada dalam kontrak Pustaka yang terpisah. Pertimbangkan [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) untuk membuat penggunaan Pustaka menjadi lebih nyaman.

### Proksi {#proxies}

Strategi yang lebih tingkat lanjut adalah sistem proksi. Pustaka menggunakan `DELEGATECALL` di latar belakang yang secara sederhana mengeksekusi fungsi kontrak lain dengan state dari kontrak pemanggil. Lihat [postingan blog ini](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) untuk mempelajari lebih lanjut tentang sistem proksi. Sistem ini memberi Anda lebih banyak fungsionalitas, mis., memungkinkan kemampuan peningkatan (upgradability), tetapi juga menambah banyak kompleksitas. Saya tidak akan menambahkannya hanya untuk mengurangi ukuran kontrak kecuali itu adalah satu-satunya pilihan Anda untuk alasan apa pun.

## Dampak sedang {#medium-impact}

### Hapus fungsi {#remove-functions}

Yang satu ini seharusnya sudah jelas. Fungsi cukup banyak meningkatkan ukuran kontrak.

- **Eksternal**: Sering kali kita menambahkan banyak fungsi tampilan (view) untuk alasan kenyamanan. Itu sangat wajar sampai Anda mencapai batas ukuran. Kemudian Anda mungkin ingin benar-benar memikirkan untuk menghapus semuanya kecuali yang benar-benar penting.
- **Internal**: Anda juga dapat menghapus fungsi internal/privat dan cukup menyisipkan (inline) kodenya selama fungsi tersebut hanya dipanggil satu kali.

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

Perubahan sederhana seperti ini membuat perbedaan sebesar **0,28kb**. Kemungkinan besar Anda dapat menemukan banyak situasi serupa di kontrak Anda dan hal tersebut benar-benar dapat terakumulasi menjadi jumlah yang signifikan.

### Persingkat pesan kesalahan {#shorten-error-message}

Pesan mengembalikan (revert) yang panjang dan khususnya banyak pesan mengembalikan yang berbeda dapat membengkakkan kontrak. Sebagai gantinya, gunakan kode kesalahan pendek dan dekodekan di kontrak Anda. Pesan yang panjang bisa menjadi jauh lebih pendek:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Gunakan kesalahan kustom alih-alih pesan kesalahan {#use-custom-errors-instead-of-error-messages}

Kesalahan kustom telah diperkenalkan di [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Ini adalah cara yang bagus untuk mengurangi ukuran kontrak Anda, karena kesalahan kustom dienkodekan ABI sebagai penyeleksi (sama seperti fungsi).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Pertimbangkan nilai run yang rendah pada pengoptimal {#consider-a-low-run-value-in-the-optimizer}

Anda juga dapat mengubah pengaturan pengoptimal. Nilai bawaan 200 berarti pengoptimal mencoba mengoptimalkan kode bita seolah-olah sebuah fungsi dipanggil 200 kali. Jika Anda mengubahnya menjadi 1, pada dasarnya Anda memberi tahu pengoptimal untuk mengoptimalkan kasus menjalankan setiap fungsi hanya satu kali. Fungsi yang dioptimalkan untuk berjalan hanya satu kali berarti fungsi tersebut dioptimalkan untuk penyebaran itu sendiri. Sadarilah bahwa **ini meningkatkan [biaya gas](/developers/docs/gas/) untuk menjalankan fungsi**, jadi Anda mungkin tidak ingin melakukannya.

## Dampak kecil {#small-impact}

### Hindari meneruskan struct ke fungsi {#avoid-passing-structs-to-functions}

Jika Anda menggunakan [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), tidak meneruskan struct ke sebuah fungsi dapat membantu. Alih-alih meneruskan parameter sebagai struct, teruskan parameter yang diperlukan secara langsung. Dalam contoh ini kita menghemat **0,1kb** lagi.

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

### Hapus pengubah (modifier) {#remove-modifiers}

Pengubah (modifier), terutama bila digunakan secara intens, dapat berdampak signifikan pada ukuran kontrak. Pertimbangkan untuk menghapusnya dan sebagai gantinya gunakan fungsi.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Kiat-kiat tersebut akan membantu Anda mengurangi ukuran kontrak secara signifikan. Sekali lagi, saya tidak bisa cukup menekankan, selalu fokus pada pemisahan kontrak jika memungkinkan untuk mendapatkan dampak terbesar.