---
title: "Memperkecil ukuran kontrak untuk mengatasi batasan ukuran kontrak"
description: Apa yang Anda dapat lakukan untuk mencegah kontrak pintar Anda menjadi terlalu besar?
author: Markus Waas
lang: id
tags:
  - "solidity"
  - "kontrak pintar"
  - "penyimpanan"
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Mengapa ada batasan? {#why-is-there-a-limit}

Pada tanggal [22 November 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) fork keras Sprurious Dragon memperkenalkan [EIP-170](https://eips.ethereum.org/EIPS/eip-170) yang menambah batas ukuran kontrak pintar sebesar 24,576 kb. Bagi Anda sebagai pengembang Solidity, ini berarti ketika Anda menambahkan lebih banyak fungsionalitas ke kontrak, pada titik tertentu Anda akan mencapai batas dan ketika menggunakannya akan melihat kesalahan:

`Peringatan: Ukuran kode kontrak melebih 24576 bita (batasan yang diperkenalkan dalam Spurious Dragon). This contract may not be deployable on Mainnet. Pertimbangkan untuk mengaktifkan pengoptimisasi (dengan nilai "berjalan" yang rendah!), yang menghentikan string pembalikan atau menggunakan pustaka.`

Batasan ini diperkenalkan untuk mencegah serangan layanan penolakan (DOS). Setiap pemanggilan terhadap kontrak relatif berbiaya gas murah. Namun, dampak pemanggilan kontrak bagi node Ethereum meningkat secara tidak proporsional bergantung pada ukuran kode kontrak yang dipanggil (pembacaan kode dari disk, pemrosesan kode sebelumnya, penambahan data ke bukti Merkle). Setiap kali Anda berhadapan dengan situasi semacam itu, di mana penyerang membutuhkan sedikit sumber daya untuk menghasilkan banyak pekerjaan bagi yang lain, Anda berpotensi menghadapi serangan DOS.

Pada awalnya ini tidak menjadi masalah, karena batasan ukuran kontrak dasar seseorang adalah batasan gas blok. Jelas sebuah kontrak perlu digunakan dalam transaksi yang menampung semua kode bita kontrak. Jika Anda kemudian memasukkan hanya satu transaksi tersebut ke dalam sebuah blok, Anda dapat menggunakan semua gas tersebut, tapi itu tak terbatas. Namun, masalah dalam kasus ini adalah bahwa batasan gas blok berubah dari waktu ke waktu dan secara teori tidak terbatas. Saat peluncuran EIP-170, batasan gas blok hanya 4,7 juta. Sekarang batasan gas blok baru [meningkat lagi](https://etherscan.io/chart/gaslimit) pada bulan lalu ke angka 11,9 juta.

Berikutnya kita akan melihat beberapa metode yang diurutkan berdasarkan potensi dampaknya. Bayangkan ini seperti upaya mengurangi berat badan. Strategi terbaik bagi seseorang untuk mencapai berat badan idealnya (dalam kasus kita 24kb) adalah memusatkan perhatian pada metode yang berdampak besar terlebih dahulu. Dalam kebanyakan kasus, hanya memperbaiki pola makan Anda akan membawa Anda pada sasaran, tetapi terkadang Anda memerlukan upaya yang sedikit lebih banyak. Lalu Anda mungkin menambahkan beberapa jenis latihan (dampak sedang) atau bahkan mengonsumsi suplemen (dampak kecil).

## Dampak besar {#big-impact}

### Pisahkan kontrak Anda {#separate-your-contracts}

Ini harus selalu menjadi pendekatan pertama Anda. Bagaimana cara Anda memisahkan kontrak menjadi beberapa kontrak yang lebih kecil? Ini umumnya memaksa Anda untuk menemukan arsitektur yang baik untuk kontrak Anda. Kontrak yang lebih kecil selalu lebih disukai jika dilhat dari aspek keterbacaan kode. Untuk memecahkan kontrak, tanyakan pada diri Anda sendiri:

- Fungsi mana yang saling terkait? Setiap rangkaian fungsi mungkin berfungsi paling baik dalam kontraknya masing-masing.
- Fungsi mana yang tidak memerlukan pembacaan state kontrak atau yang hanya memerlukan subset state tertentu?
- Bisakah Anda memisahkan penyimpanan dan fungsionalitas?

### Pustaka {#libraries}

Satu cara sederhana untuk memindahkan kode fungsionalitas dari penyimpanannya adalah dengan menggunakan [pustaka](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Jangan mendeklarasikan fungsi pustaka sebagai fungsi internal karena itu akan [ditambahkan ke kontrak](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) secara lansung pada saat pengompilasian. Tetapi jika Anda menggunakan fungsi publik, pada dasarnya fungsi itu akan ada dalam kontrak pustaka terpisah. Pertimbangkan [tujuan penggunaan](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) untuk membuat penggunaan pustaka menjadi lebih mudah.

### Proksi {#proxies}

Strategi yang lebih canggih adalah sistem proksi. Pustaka menggunakan `DELEGATECALL` di latar belakang yang hanya mengeksekusi fungsi kontrak lain dengan state kontrak yang memanggil. Lihat [postingan blog ini](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) untuk mempelajari selengkapnya tentang sistem proksi. Sistem ini memberi Anda lebih banyak fungsionalitas, misalnya memungkinkan kemampuan untuk melakukan peningkatan, tetapi juga menambah banyak kompleksitas. Saya tidak akan menambahkan sistem itu hanya untuk mengurangi ukuran kontrak, kecuali itulah satu-satunya opsi yang tersedia dengan alasan apa pun.

## Dampak sedang {#medium-impact}

### Menghapus fungsi {#remove-functions}

Ini harus jelas. Fungsi sedikit menambah ukuran kontrak.

- **Eksternal**: Sering kali kita menambah banyak fungsi tampilan untuk alasan kenyamanan. Itu sangat baik sampai Anda mencapai batasan ukuran kontrak. Kemudian Anda mungkin merasa benar-benar ingin menghapus semua fungsi dengan mengecualikan fungsi yang benar-benar penting.
- **Internal**: Anda juga dapat menghapus fungsi internal/privat dan hanya memasukkan kode asalkan fungsinya dipanggil hanya satu kali.

### Hindari penggunaan variabel tambahan {#avoid-additional-variables}

Sebuah perubahan sederhana seperti ini:

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

menghasilkan perbedaan sebesar **0,28kb**. Kemungkinannya Anda dapat menghadapi banyak situasi serupa dalam kontrak Anda dan itu dapat benar-benar menambah ukuran dalam jumlah yang besar.

### Perpendek pesan kesalahan {#shorten-error-message}

Pesan pembalikan yang panjang dan khususnya beragam pesan pembalikan dapat membengkakkan ukuran kontrak. Sebagai gantinya, gunakan kode-kode kesalahan yang pendek dan kodekan dalam kontrak Anda. Sebuah pesan yang panjang dapat menjadi jauh lebih pendek:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");

```

```solidity
require(msg.sender == owner, "OW1");
```

### Pertimbangkan menggunakan nilai berjalan yang rendah dalam pengoptimisasi {#consider-a-low-run-value-in-the-optimizer}

Anda juga dapat mengubah pengaturan pengoptimisasinya. Nilai default 200 berarti mencoba mengoptimalkan kode bita seolah-olah sebuah fungsi dipanggil 200 kali. Jika Anda mengubahnya menjadi 1, pada dasarnya Anda memberi tahu pengoptimisasi untuk melakukan pengoptimalan dalam hal menjalankan setiap fungsi hanya sekali. Sebuah fungsi yang dioptimalkan agar berjalan hanya satu kali berarti fungsi itu dioptimalkan untuk penggunaan itu sendiri. Ketahuilah bahwa **ini meningkatkan [biaya gas](/developers/docs/gas/) untuk menjalankan fungsi**, sehingga Anda mungkin tidak ingin melakukannya.

## Dampak kecil {#small-impact}

### Hindari meneruskan struct ke fungsi {#avoid-passing-structs-to-functions}

Jika Anda menggunakan [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), ini dapat membantu agar tidak meneruskan struct ke sebuah fungsi. Sebagai ganti meneruskan parameter sebagai struct...

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

... teruskan parameter yang diperlukan secara langsung. Dalam contoh ini, kita menghemat ukuran sebesar **0,1kb**.

### Deklarasikan visibilitas yang benar untuk fungsi dan variabel {#declare-correct-visibility-for-functions-and-variables}

- Fungsi atau variabel yang hanya dipanggil dari luar? Deklarasikan mereka sebagai `eksternal` ketimbang `publik`.
- Fungsi atau variabel yang hanya dipanggil dari dalam kontrak? Deklarasikan mereka sebagai `privat` atau `internal` ketimbang `publik`.

### Menghapus pengubah {#remove-modifiers}

Pengubah, khususnya jika dipakai secara intens, dapat berdampak signifikan terhadap ukuran kontrak. Pertimbangkan untuk menghapusnya dan sebagai gantinya gunakan fungsi.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Tips tersebut akan membantu Anda mengurangi ukuran kontrak secara signifikan. Sekali lagi, ini sangat penting, selalu fokus pada pemisahan kontrak jika memungkinkan untuk mendapatkan hasil terbaik.

## Masa depan batasan ukuran kontrak {#the-future-for-the-contract-size-limits}

Ada [proposal terbuka](https://eips.ethereum.org/EIPS/eip-1662) untuk menghapus batasan ukuran kontrak. Ide ini pada dasarnya untuk membuat pemanggilan kontrak lebih mahal untuk kontrak dengan ukuran sangat besar. Ini tidak akan terlalu sulit untuk diimplementasikan, memiliki kompatibilitas ke belakang yang sederhana (menempatkan semua kontrak yang telah digunakan sebelumnya dalam kategori termurah), tetapi [tidak semua orang diyakinkan oleh ide ini](https://ethereum-magicians.org/t/removing-or-increasing-the-contract-size-limit/3045/24).

Hanya waktu yang akan menentukan apakah batasan itu akan berubah di masa depan, reaksinya (lihat gambar di sebelah kanan) secara pasti menunjukkan persyaratan yang jelas bagi kita para pengembang. Sayangnya, ini bukanlah sesuatu yang dapat Anda harapkan dalam waktu dekat ini.
