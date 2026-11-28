---
title: "Mengecilkan ukuran kontrak untuk mengatasi batas ukuran kontrak"
description: Apa yang dapat Anda lakukan untuk mencegah kontrak pintar Anda menjadi terlalu besar?
author: Markus Waas
lang: id
tags: ["Solidity", "kontrak pintar", "penyimpanan"]
skill: intermediate
breadcrumb: Mengecilkan ukuran kontrak
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Mengapa ada batasan? {#why-is-there-a-limit}

Pada [22 November 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) percabangan keras Spurious Dragon memperkenalkan [EIP-170](https://eips.ethereum.org/EIPS/eip-170) yang menambahkan batas ukuran kontrak pintar sebesar 24.576 bita (24 KiB). Bagi Anda sebagai pengembang Solidity, ini berarti ketika Anda menambahkan lebih banyak fungsionalitas ke kontrak Anda, pada titik tertentu Anda akan mencapai batas tersebut dan kompiler akan memperingatkan Anda:

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Ada peringatan serupa untuk kode penyebaran (initcode), yang dibatasi oleh [EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) hingga 49.152 bita pada peningkatan Shanghai.

Batas ini tidak permanen. [EIP-7954](https://eips.ethereum.org/EIPS/eip-7954) menaikkannya menjadi 65.536 bita (64 KiB), dan batas initcode menjadi 131.072 bita, dan ini dijadwalkan untuk [peningkatan Glamsterdam](/roadmap/glamsterdam/). Hingga peningkatan tersebut aktif di jaringan tempat Anda menyebarkan, 24.576 bita adalah batas di sana, dan bahkan setelahnya kontrak yang lebih kecil tetap lebih murah untuk disebarkan dan lebih mudah untuk diaudit.

Batas ini diperkenalkan untuk mencegah serangan penolakan layanan (DOS). Panggilan apa pun ke kontrak relatif murah dari segi gas. Namun, dampak panggilan kontrak untuk simpul Ethereum meningkat secara tidak proporsional tergantung pada ukuran kode kontrak yang dipanggil (membaca kode dari disk, memproses awal kode, menambahkan data ke bukti Merkle). Kapan pun Anda memiliki situasi seperti itu di mana penyerang membutuhkan sedikit sumber daya untuk menyebabkan banyak pekerjaan bagi orang lain, Anda mendapatkan potensi serangan DOS.

Awalnya ini bukan masalah besar karena salah satu batas ukuran kontrak alami adalah batas gas blok. Jelas, sebuah kontrak harus disebarkan dalam sebuah transaksi yang menampung semua kode bita kontrak. Jika Anda hanya menyertakan satu transaksi itu ke dalam sebuah blok, Anda dapat menghabiskan semua gas itu, tetapi itu tidak tak terbatas. Saat ini batas gas blok adalah puluhan juta gas dan telah dinaikkan beberapa kali oleh validator, jadi dengan sendirinya itu akan memungkinkan kontrak yang sangat besar. Sejak [peningkatan Fusaka](/roadmap/fusaka/), satu transaksi juga dibatasi pada 16.777.216 gas ([EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)), tetapi itu masih jauh di atas biaya menyebarkan kontrak 24 KiB, itulah sebabnya batas ukuran eksplisit diperlukan.

Berikut ini kita akan melihat beberapa metode yang diurutkan berdasarkan potensi dampaknya. Pikirkan hal ini dalam istilah penurunan berat badan. Strategi terbaik bagi seseorang untuk mencapai target berat badan mereka (dalam kasus kita 24kb) adalah dengan berfokus pada metode berdampak besar terlebih dahulu. Dalam kebanyakan kasus, hanya dengan memperbaiki pola makan Anda akan mencapai tujuan tersebut, tetapi terkadang Anda membutuhkan sedikit lebih banyak. Kemudian Anda mungkin menambahkan beberapa olahraga (dampak sedang) atau bahkan suplemen (dampak kecil).

## Dampak besar {#big-impact}

### Pisahkan kontrak Anda {#separate-your-contracts}

Ini harus selalu menjadi pendekatan pertama Anda. Bagaimana Anda dapat memisahkan kontrak menjadi beberapa kontrak yang lebih kecil? Hal ini umumnya memaksa Anda untuk menghasilkan arsitektur yang baik untuk kontrak Anda. Kontrak yang lebih kecil selalu lebih disukai dari perspektif keterbacaan kode. Untuk memisahkan kontrak, tanyakan pada diri Anda:

- Fungsi mana yang saling berkaitan? Setiap kumpulan fungsi mungkin paling baik berada di kontraknya sendiri.
- Fungsi mana yang tidak memerlukan pembacaan state kontrak atau hanya sebagian kecil tertentu dari state tersebut?
- Dapatkah Anda memisahkan penyimpanan dan fungsionalitas?

### Pustaka {#libraries}

Salah satu cara sederhana untuk memindahkan kode fungsionalitas dari penyimpanan adalah dengan menggunakan [Pustaka](https://docs.soliditylang.org/en/latest/contracts.html#libraries). Jangan mendeklarasikan fungsi Pustaka sebagai internal karena fungsi tersebut akan [ditambahkan ke kontrak](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) secara langsung selama kompilasi. Namun jika Anda menggunakan fungsi publik, maka fungsi tersebut pada kenyataannya akan berada dalam kontrak Pustaka yang terpisah. Pertimbangkan [using for](https://docs.soliditylang.org/en/latest/contracts.html#using-for) untuk membuat penggunaan Pustaka menjadi lebih nyaman.

### Proksi {#proxies}

Strategi yang lebih tingkat lanjut adalah sistem proksi. Pustaka menggunakan `DELEGATECALL` di belakang layar yang secara sederhana mengeksekusi fungsi kontrak lain dengan state dari kontrak pemanggil. Lihat [meningkatkan kontrak pintar](/developers/docs/smart-contracts/upgrading/) untuk mempelajari lebih lanjut tentang sistem proksi. Sistem ini memberi Anda lebih banyak fungsionalitas, mis., memungkinkan peningkatan, tetapi juga menambah banyak kompleksitas. Saya tidak akan menambahkannya hanya untuk mengurangi ukuran kontrak kecuali itu adalah satu-satunya pilihan Anda karena alasan apa pun.

## Dampak sedang {#medium-impact}

### Hapus fungsi {#remove-functions}

Yang satu ini seharusnya sudah jelas. Fungsi cukup banyak meningkatkan ukuran kontrak.

- **Eksternal**: Sering kali kita menambahkan banyak fungsi tampilan (view) untuk alasan kenyamanan. Itu sangat wajar sampai Anda mencapai batas ukuran. Kemudian Anda mungkin ingin benar-benar memikirkan untuk menghapus semuanya kecuali yang benar-benar penting.
- **Internal**: Anda juga dapat menghapus fungsi internal/privat dan cukup menyisipkan (inline) kodenya selama fungsi tersebut hanya dipanggil satu kali.

### Hindari variabel tambahan {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Perubahan sederhana seperti ini membuat perbedaan sebesar **0,28kb** saat artikel ini ditulis. Penghematan pastinya bergantung pada versi dan pengaturan kompiler Anda (dengan Solidity 0.8.37 sekitar 0,1kb tanpa pengoptimal dan jauh lebih sedikit jika menggunakannya), jadi selalu ukur. Kemungkinannya adalah Anda dapat menemukan banyak situasi serupa di kontrak Anda dan hal tersebut benar-benar dapat terakumulasi menjadi jumlah yang signifikan.

### Persingkat pesan kesalahan {#shorten-error-message}

Pesan mengembalikan (revert) yang panjang dan khususnya banyak pesan mengembalikan yang berbeda dapat membengkakkan kontrak. Sebagai gantinya, gunakan kode kesalahan pendek dan dekodekan di kontrak Anda. Pesan yang panjang bisa menjadi jauh lebih pendek:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Gunakan kesalahan kustom alih-alih pesan kesalahan {#use-custom-errors-instead-of-error-messages}

Kesalahan kustom telah diperkenalkan di [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Ini adalah cara yang bagus untuk mengurangi ukuran kontrak Anda, karena kesalahan ini dienkode ABI sebagai penyeleksi (sama seperti fungsi).

```solidity
error Unauthorized();

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### Pertimbangkan nilai run yang rendah pada pengoptimal {#consider-a-low-run-value-in-the-optimizer}

Anda juga dapat mengubah pengaturan pengoptimal. Nilai bawaan 200 berarti pengoptimal mencoba mengoptimalkan kode bita seolah-olah sebuah fungsi dipanggil 200 kali. Jika Anda mengubahnya menjadi 1, pada dasarnya Anda memberi tahu pengoptimal untuk mengoptimalkan kasus menjalankan setiap fungsi hanya satu kali. Fungsi yang dioptimalkan untuk berjalan hanya satu kali berarti fungsi tersebut dioptimalkan untuk penyebaran itu sendiri. Perlu disadari bahwa **ini meningkatkan [biaya gas](/developers/docs/gas/) untuk menjalankan fungsi**, jadi Anda mungkin tidak ingin melakukannya. Jika Anda mengkompilasi dengan `viaIR` diaktifkan, periksa ukurannya dengan dan tanpa itu, karena pembuat kode berbasis IR dapat menghasilkan ukuran kode bita yang sangat berbeda. Lihat [opsi pengoptimal](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options) untuk detailnya.

## Dampak kecil {#small-impact}

### Hindari meneruskan struct ke fungsi {#avoid-passing-structs-to-functions}

Jika Anda menggunakan [ABI coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma) (bawaan sejak Solidity 0.8.0), tidak meneruskan struct ke sebuah fungsi dapat membantu. Alih-alih meneruskan parameter sebagai struct, teruskan parameter yang diperlukan secara langsung. Dalam contoh ini kita menghemat **0,1kb** lagi.

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### Deklarasikan visibilitas yang benar untuk fungsi dan variabel {#declare-correct-visibility-for-functions-and-variables}

- Fungsi atau variabel yang hanya dipanggil dari luar? Deklarasikan sebagai `external` alih-alih `public`.
- Fungsi atau variabel yang hanya dipanggil dari dalam kontrak? Deklarasikan sebagai `private` atau `internal` alih-alih `public`.

### Hapus pengubah (modifier) {#remove-modifiers}

Pengubah (modifier), terutama bila digunakan secara intens, dapat berdampak signifikan pada ukuran kontrak. Pertimbangkan untuk menghapusnya dan sebagai gantinya gunakan fungsi.

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

Kiat-kiat tersebut seharusnya membantu Anda mengurangi ukuran kontrak secara signifikan. Sekali lagi, saya tidak bisa cukup menekankan, selalu fokus pada pemisahan kontrak jika memungkinkan untuk dampak terbesar.
