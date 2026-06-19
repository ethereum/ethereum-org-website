---
title: Menyebarkan kontrak pintar pertama Anda
description: Pengenalan tentang cara menyebarkan kontrak pintar pertama Anda di jaringan pengujian Ethereum
author: "jdourlens"
tags: ["kontrak pintar", "remix", "solidity", "menyebarkan"]
skill: beginner
breadcrumb: Menyebarkan kontrak pertama
lang: id
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Saya rasa Anda sama antusiasnya dengan kami untuk [menyebarkan](/developers/docs/smart-contracts/deploying/) dan berinteraksi dengan [kontrak pintar](/developers/docs/smart-contracts/) pertama Anda di rantai blok Ethereum.

Jangan khawatir, karena ini adalah kontrak pintar pertama kita, kita akan menyebarkannya di [jaringan pengujian lokal](/developers/docs/networks/) sehingga Anda tidak perlu mengeluarkan biaya apa pun untuk menyebarkan dan memainkannya sesuka Anda.

## Menulis kontrak kita {#writing-our-contract}

Langkah pertama adalah [mengunjungi Remix](https://remix.ethereum.org/) dan membuat file baru. Di bagian kiri atas antarmuka Remix, tambahkan file baru dan masukkan nama file yang Anda inginkan.

![Adding a new file in the Remix interface](./remix.png)

Di file baru tersebut, kita akan menempelkan kode berikut.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Variabel publik bertipe unsigned int untuk menyimpan jumlah hitungan
    uint256 public count = 0;

    // Fungsi yang menambah penghitung kita
    function increment() public {
        count += 1;
    }

    // Getter yang tidak diperlukan untuk mendapatkan nilai hitungan
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Jika Anda terbiasa dengan pemrograman, Anda dapat dengan mudah menebak apa yang dilakukan program ini. Berikut adalah penjelasan baris demi baris:

- Baris 4: Kita mendefinisikan sebuah kontrak dengan nama `Counter`.
- Baris 7: Kontrak kita menyimpan satu bilangan bulat tak bertanda (unsigned integer) bernama `count` yang dimulai dari 0.
- Baris 10: Fungsi pertama akan memodifikasi state dari kontrak dan melakukan `increment()` pada variabel `count` kita.
- Baris 15: Fungsi kedua hanyalah sebuah getter untuk dapat membaca nilai dari variabel `count` di luar kontrak pintar. Perhatikan bahwa, karena kita mendefinisikan variabel `count` kita sebagai publik, hal ini sebenarnya tidak diperlukan tetapi ditampilkan sebagai contoh.

Itu saja untuk kontrak pintar sederhana pertama kita. Seperti yang mungkin Anda ketahui, ini terlihat seperti sebuah kelas dari bahasa OOP (Pemrograman Berorientasi Objek) seperti Java atau C++. Sekarang saatnya untuk bermain dengan kontrak kita.

## Menyebarkan kontrak kita {#deploying-our-contract}

Karena kita telah menulis kontrak pintar pertama kita, sekarang kita akan menyebarkannya ke rantai blok agar dapat memainkannya.

[Menyebarkan kontrak pintar di rantai blok](/developers/docs/smart-contracts/deploying/) sebenarnya hanyalah mengirimkan sebuah transaksi yang berisi kode dari kontrak pintar yang telah dikompilasi tanpa menentukan penerima apa pun.

Pertama-tama kita akan [mengompilasi kontrak](/developers/docs/smart-contracts/compiling/) dengan mengeklik ikon kompilasi di sisi kiri:

![The compile icon in the Remix toolbar](./remix-compile-button.png)

Kemudian klik tombol kompilasi:

![The compile button in the Remix solidity compiler](./remix-compile.png)

Anda dapat memilih opsi "Auto compile" sehingga kontrak akan selalu dikompilasi saat Anda menyimpan konten di editor teks.

Kemudian navigasikan ke layar "deploy and run transactions":

![The deploy icon in the Remix toolbar](./remix-deploy.png)

Setelah Anda berada di layar "deploy and run transactions", periksa kembali apakah nama kontrak Anda muncul dan klik Deploy. Seperti yang dapat Anda lihat di bagian atas halaman, lingkungan saat ini adalah "JavaScript VM" yang berarti kita akan menyebarkan dan berinteraksi dengan kontrak pintar kita di rantai blok pengujian lokal agar dapat menguji lebih cepat dan tanpa biaya apa pun.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

Setelah Anda mengeklik tombol "Deploy", Anda akan melihat kontrak Anda muncul di bagian bawah. Klik panah di sebelah kiri untuk memperluasnya sehingga kita akan melihat konten kontrak kita. Ini adalah variabel `counter` kita, fungsi `increment()` kita, dan getter `getCounter()`.

Jika Anda mengeklik tombol `count` atau `getCount`, itu sebenarnya akan mengambil konten dari variabel `count` kontrak dan menampilkannya. Karena kita belum memanggil fungsi `increment`, itu seharusnya menampilkan 0.

![The function button in the Remix solidity compiler](./remix-function-button.png)

Sekarang mari kita panggil fungsi `increment` dengan mengeklik tombol tersebut. Anda akan melihat Log dari transaksi yang dibuat muncul di bagian bawah jendela. Anda akan melihat bahwa Log tersebut berbeda saat Anda menekan tombol untuk mengambil data dibandingkan dengan tombol `increment`. Hal ini karena membaca data di rantai blok tidak memerlukan transaksi (penulisan) atau biaya apa pun. Karena hanya memodifikasi state dari rantai blok yang mengharuskan pembuatan transaksi:

![A log of transactions](./transaction-log.png)

Setelah menekan tombol increment yang akan menghasilkan transaksi untuk memanggil fungsi `increment()` kita, jika kita mengeklik kembali tombol count atau getCount, kita akan membaca state yang baru diperbarui dari kontrak pintar kita dengan variabel count menjadi lebih besar dari 0.

![Newly updated state of the smart contract](./updated-state.png)

Di tutorial berikutnya, kita akan membahas [cara Anda dapat menambahkan peristiwa ke kontrak pintar Anda](/developers/tutorials/logging-events-smart-contracts/). Mencatat peristiwa ke dalam Log adalah cara yang mudah untuk men-debug kontrak pintar Anda dan memahami apa yang terjadi saat memanggil sebuah fungsi.