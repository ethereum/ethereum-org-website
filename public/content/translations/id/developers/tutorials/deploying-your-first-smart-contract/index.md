---
title: Menyebarkan kontrak pintar pertama Anda
description: Pengantar untuk menyebarkan kontrak pintar pertama Anda di testnet Ethereum
author: "jdourlens"
tags: [ "kontrak pintar", "remix", "Solidity", "menyebarkan" ]
skill: beginner
lang: id
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Saya rasa Anda sama bersemangatnya dengan kami untuk [menyebarkan](/developers/docs/smart-contracts/deploying/) dan berinteraksi dengan [kontrak pintar](/developers/docs/smart-contracts/) pertama Anda di rantai blok Ethereum.

Jangan khawatir, karena ini adalah kontrak pintar pertama kita, kita akan menyebarkannya di [testnet lokal](/developers/docs/networks/) sehingga Anda tidak perlu membayar apa pun untuk menyebarkan dan bermain sepuasnya dengannya.

## Menulis kontrak kita {#writing-our-contract}

Langkah pertama adalah [mengunjungi Remix](https://remix.ethereum.org/) dan membuat file baru. Pada bagian kiri atas antarmuka Remix, tambahkan file baru dan masukkan nama file yang Anda inginkan.

![Menambahkan file baru di antarmuka Remix](./remix.png)

Di file yang baru, kita akan menempelkan kode berikut.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Variabel publik dari tipe integer tak bertanda untuk menyimpan jumlah hitungan
    uint256 public count = 0;

    // Fungsi yang menambah nilai penghitung kita
    function increment() public {
        count += 1;
    }

    // Getter yang tidak diperlukan untuk mendapatkan nilai hitungan
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Jika Anda terbiasa dengan pemrograman, Anda dapat dengan mudah menebak apa yang dilakukan oleh program ini. Berikut adalah penjelasan baris per baris:

- Baris 4: Kita mendefinisikan sebuah kontrak dengan nama `Counter`.
- Baris 7: Kontrak kita menyimpan satu integer tak bertanda bernama `count` yang dimulai dari 0.
- Baris 10: Fungsi pertama akan memodifikasi state kontrak dan `increment()` variabel `count` kita.
- Baris 15: Fungsi kedua hanyalah sebuah getter untuk dapat membaca nilai variabel `count` di luar kontrak pintar. Perhatikan bahwa, karena kita mendefinisikan variabel `count` kita sebagai publik, ini tidak diperlukan tetapi ditampilkan sebagai contoh.

Itu saja untuk kontrak pintar sederhana pertama kita. Seperti yang mungkin Anda ketahui, ini terlihat seperti sebuah kelas dari bahasa OOP (Object-Oriented Programming) seperti Java atau C++. Sekarang saatnya bermain dengan kontrak kita.

## Menyebarkan kontrak kita {#deploying-our-contract}

Setelah kita menulis kontrak pintar pertama kita, sekarang kita akan menyebarkannya ke rantai blok agar dapat bermain dengannya.

[Menyebarkan kontrak pintar di rantai blok](/developers/docs/smart-contracts/deploying/) sebenarnya hanya mengirimkan transaksi yang berisi kode dari kontrak pintar yang terkompilasi tanpa menentukan penerima mana pun.

Pertama-tama kita akan [mengompilasi kontrak](/developers/docs/smart-contracts/compiling/) dengan mengeklik ikon kompilasi di sisi kiri:

![Ikon kompilasi di bilah alat Remix](./remix-compile-button.png)

Lalu klik tombol kompilasi:

![Tombol kompilasi di pengompilasi Solidity Remix](./remix-compile.png)

Anda dapat memilih opsi "Kompilasi otomatis" sehingga kontrak akan selalu dikompilasi saat Anda menyimpan konten di editor teks.

Kemudian, navigasikan ke layar "deploy and run transactions":

![Ikon deploy di bilah alat Remix](./remix-deploy.png)

Setelah Anda berada di layar "deploy and run transactions", periksa kembali bahwa nama kontrak Anda muncul dan klik Deploy. Seperti yang dapat Anda lihat di bagian atas halaman, lingkungan saat ini adalah "JavaScript VM" yang berarti kita akan menyebarkan dan berinteraksi dengan kontrak pintar kita di rantai blok tes lokal agar dapat menguji lebih cepat dan tanpa biaya apa pun.

![Tombol deploy di pengompilasi Solidity Remix](./remix-deploy-button.png)

Setelah Anda mengeklik tombol "Deploy", Anda akan melihat kontrak Anda muncul di bagian bawah. Klik tanda panah di sebelah kiri untuk memperluasnya sehingga kita akan melihat isi kontrak kita. Ini adalah variabel `counter` kita, fungsi `increment()` kita, dan getter `getCounter()`.

Jika Anda mengeklik tombol `count` atau `getCount`, itu akan benar-benar mengambil konten dari variabel `count` kontrak dan menampilkannya. Karena kita belum memanggil fungsi `increment`, itu akan menampilkan 0.

![Tombol fungsi di pengompilasi Solidity Remix](./remix-function-button.png)

Sekarang, mari kita panggil fungsi `increment` dengan mengeklik tombolnya. Anda akan melihat log transaksi yang dibuat muncul di bagian bawah jendela. Anda akan melihat bahwa lognya berbeda ketika Anda menekan tombol untuk mengambil data, alih-alih tombol `increment`. Itu karena membaca data di rantai blok tidak memerlukan transaksi (penulisan) atau biaya apa pun. Karena hanya memodifikasi state dari rantai blok yang memerlukan pembuatan transaksi:

![Log transaksi](./transaction-log.png)

Setelah menekan tombol `increment` yang akan menghasilkan transaksi untuk memanggil fungsi `increment()` kita, jika kita mengeklik kembali tombol `count` atau `getCount`, kita akan membaca state kontrak pintar kita yang baru diperbarui dengan variabel `count` lebih besar dari 0.

![State kontrak pintar yang baru diperbarui](./updated-state.png)

Dalam tutorial berikutnya, kita akan membahas [cara menambahkan aksi ke kontrak pintar Anda](/developers/tutorials/logging-events-smart-contracts/). Membuat log aksi adalah cara yang mudah untuk men-debug kontrak pintar Anda dan memahami apa yang terjadi saat memanggil sebuah fungsi.
