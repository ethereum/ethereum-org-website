---
title: Menerapkan kontrak pintar pertama Anda
description: Pengenalan tentang cara menerapkan kontrak pintar pertama Anda di testnet Ethereum
author: "jdourlens"
tags: ["kontrak pintar", "Remix", "Solidity", "menerapkan"]
skill: beginner
breadcrumb: "Deploy kontrak pertama"
lang: id
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Saya rasa Anda sama antusiasnya dengan kami untuk [menerapkan](/developers/docs/smart-contracts/deploying/) dan berinteraksi dengan [kontrak pintar](/developers/docs/smart-contracts/) pertama Anda di blockchain Ethereum.

Jangan khawatir, karena ini adalah kontrak pintar pertama kita, kita akan menerapkannya di [jaringan pengujian lokal](/developers/docs/networks/) sehingga Anda tidak perlu mengeluarkan biaya apa pun untuk menerapkan dan memainkannya sesuka Anda.

## Menulis kontrak kita {#writing-our-contract}

Langkah pertama adalah [mengunjungi Remix](https://remix.ethereum.org/) dan membuat file baru. Di bagian kiri atas antarmuka Remix, tambahkan file baru dan masukkan nama file yang Anda inginkan.

![Menambahkan file baru di antarmuka Remix](./remix.png)

Di file baru tersebut, kita akan menempelkan kode berikut.

```solidity
// SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Public variable of type unsigned int to keep the number of counts // Variabel publik bertipe unsigned int untuk menyimpan jumlah hitungan
    uint256 public count = 0;

    // Function that increments our counter // Fungsi yang menambah penghitung kita
    function increment() public {
        count += 1;
    }

    // Not necessary getter to get the count value // Getter yang tidak diperlukan untuk mendapatkan nilai hitungan
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Jika Anda terbiasa dengan pemrograman, Anda dapat dengan mudah menebak apa yang dilakukan program ini. Berikut adalah penjelasan baris demi baris:

- Baris 4: Kita mendefinisikan sebuah kontrak dengan nama `Counter`.
- Baris 7: Kontrak kita menyimpan satu bilangan bulat tak bertanda (unsigned integer) bernama `count` yang dimulai dari 0.
- Baris 10: Fungsi pertama akan memodifikasi status kontrak dan melakukan `increment()` pada variabel `count` kita.
- Baris 15: Fungsi kedua hanyalah sebuah getter untuk dapat membaca nilai dari variabel `count` di luar kontrak pintar. Perhatikan bahwa, karena kita mendefinisikan variabel `count` kita sebagai publik, hal ini sebenarnya tidak diperlukan tetapi ditampilkan sebagai contoh.

Itu saja untuk kontrak pintar sederhana pertama kita. Seperti yang mungkin Anda ketahui, ini terlihat seperti sebuah kelas dari bahasa OOP (Pemrograman Berorientasi Objek) seperti Java atau C++. Sekarang saatnya untuk bermain dengan kontrak kita.

## Menerapkan kontrak kita {#deploying-our-contract}

Setelah kita menulis kontrak pintar pertama kita, sekarang kita akan menerapkannya ke blockchain agar dapat memainkannya.

[Menerapkan kontrak pintar di blockchain](/developers/docs/smart-contracts/deploying/) sebenarnya hanyalah mengirimkan transaksi yang berisi kode dari kontrak pintar yang telah dikompilasi tanpa menentukan penerima apa pun.

Pertama-tama kita akan [mengompilasi kontrak](/developers/docs/smart-contracts/compiling/) dengan mengeklik ikon kompilasi di sisi kiri:

![Ikon kompilasi di bilah alat Remix](./remix-compile-button.png)

Kemudian klik tombol kompilasi:

![Tombol kompilasi di kompiler solidity Remix](./remix-compile.png)

Anda dapat memilih opsi "Auto compile" sehingga kontrak akan selalu dikompilasi saat Anda menyimpan konten di editor teks.

Kemudian navigasikan ke layar "deploy and run transactions":

![Ikon deploy di bilah alat Remix](./remix-deploy.png)

Setelah Anda berada di layar "deploy and run transactions", periksa kembali apakah nama kontrak Anda muncul dan klik Deploy. Seperti yang dapat Anda lihat di bagian atas halaman, lingkungan saat ini adalah "JavaScript VM" yang berarti kita akan menerapkan dan berinteraksi dengan kontrak pintar kita di blockchain pengujian lokal agar dapat menguji lebih cepat dan tanpa biaya apa pun.

![Tombol deploy di kompiler solidity Remix](./remix-deploy-button.png)

Setelah Anda mengeklik tombol "Deploy", Anda akan melihat kontrak Anda muncul di bagian bawah. Klik panah di sebelah kiri untuk memperluasnya sehingga kita akan melihat konten kontrak kita. Ini adalah variabel `counter` kita, fungsi `increment()` kita, dan getter `getCounter()`.

Jika Anda mengeklik tombol `count` atau `getCount`, itu sebenarnya akan mengambil konten dari variabel `count` kontrak dan menampilkannya. Karena kita belum memanggil fungsi `increment`, itu akan menampilkan 0.

![Tombol fungsi di kompiler solidity Remix](./remix-function-button.png)

Sekarang mari kita panggil fungsi `increment` dengan mengeklik tombol tersebut. Anda akan melihat log transaksi yang dibuat muncul di bagian bawah jendela. Anda akan melihat bahwa lognya berbeda saat Anda menekan tombol untuk mengambil data dibandingkan dengan tombol `increment`. Hal ini karena membaca data di blockchain tidak memerlukan transaksi (penulisan) atau biaya apa pun. Karena hanya memodifikasi status blockchain yang memerlukan pembuatan transaksi:

![Log transaksi](./transaction-log.png)

Setelah menekan tombol increment yang akan menghasilkan transaksi untuk memanggil fungsi `increment()` kita, jika kita mengeklik kembali tombol count atau getCount, kita akan membaca status kontrak pintar kita yang baru diperbarui dengan variabel count menjadi lebih besar dari 0.

![Status kontrak pintar yang baru diperbarui](./updated-state.png)

Pada tutorial berikutnya, kita akan membahas [cara Anda dapat menambahkan peristiwa ke kontrak pintar Anda](/developers/tutorials/logging-events-smart-contracts/). Mencatat peristiwa (logging events) adalah cara yang mudah untuk men-debug kontrak pintar Anda dan memahami apa yang terjadi saat memanggil suatu fungsi.