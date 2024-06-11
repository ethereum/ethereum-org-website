---
title: Menyebarkan kontrak pintar pertama Anda
description: Pengantar untuk menggunakan kontrak pintar pertama Anda di jaringan percobaan Ethereum
author: "jdourlens"
tags:
  - "kontrak pintar"
  - "remix"
  - "solidity"
  - "memulai"
  - "menyebarkan"
skill: beginner
lang: id
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Saya kira Anda bersemangat seperti kami untuk [menyebarkan](/developers/docs/smart-contracts/deploying/) dan berinteraksi dengan [kontrak pintar](/developers/docs/smart-contracts/) pertama Anda di rantai blok Ethereum.

Jangan khawatir, karena ini adalah kontrak pintar pertama kita, kita akan menggunakannya pada [jaringan percobaan lokal](/developers/docs/networks/), sehingga tidak memerlukan biaya apa pun untuk menggunakan dan bermain dengannya selama yang Anda mau.

## Menulis kontrak kita {#writing-our-contract}

Langkah pertama adalah [kunjungi Remix](https://remix.ethereum.org/) dan buat file baru. Pada bagian atas kiri antarmuka Remix, tambahkan file baru dan masukkan nama yang Anda inginkan.

![Menambahkan file baru di antarmuka Remix](./remix.png)

Di file baru itu, kita akan menempelkan kode berikut ini.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Variabel publik dari tipe int yang belum ditetapkan untuk mencatat jumlah hitungan
    uint256 public count = 0;

    // Fungsi yang menambah nilai penghitung kita
    function increment() public {
        count += 1;
    }

    // Pengambil yang tidak diperlukan untuk mendapatkan nilai hitungan
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Jika Anda terbiasa dengan pemrograman, Anda bisa dengan mudah menebak apa yang dilakukan program ini. Berikut adalah penjelas baris per baris:

- Baris 3: Kita menentukan sebuah kontrak dengan nama `Counter`.
- Baris 6: Kontrak kita menyimpan satu bilangan bulat yang tidak ditandatangani bernama `count` yang dimulai dari 0.
- Baris 9: Fungsi pertama akan memodifikasi state kontrak dan `increment()` variabel `count` kita.
- Baris 14: Fungsi kedua hanyalah pengambil yang mampu membaca nilai dari variabel `count` di luar kontrak pintar. Perhatikan bahwa, karena kita menentukan variabel `count` kita sebagai variabel publik, ini tidak penting tapi ditunjukkan sebagai contoh.

Itulah kontrak pintar sederhana pertama kita. Seperti yang Anda ketahui, ini tampak seperti kelas dari bahasa OOP seperti Java atau C++. Sekarang saatnya bermain dengan kontrak kita.

## Menyebarkan kontrak kita {#deploying-our-contract}

Saat menulis kontrak pintar pertama kita, kita akan menggunakannya ke blockchain agar dapat berinteraksi dengannya.

[Menyebarkan kontrak pintar pada rantai blok](/developers/docs/smart-contracts/deploying/) sebenarnya hanya mengirim transaksi berisi kode kontrak pintar yang terkompilasi tanpa menentukan penerima.

Pertama kita akan [mengompilasi kontrak](/developers/docs/smart-contracts/compiling/) dengan mengklik ikon kompilasi di sebelah kiri:

![Ikon kompilasi di bilah alat Remix](./remix-compile-button.png)

Lalu klik tombol kompilasi:

![Tombol kompilasi di pengompilasi solidity Remix](./remix-compile.png)

You can choose to select the “Auto compile” option so the contract will always be compiled when you save the content on the text editor.

Lala arahkan ke penggunaan dan jalankan layar transaksi:

![Ikon gunakan di bilah alat Remix](./remix-deploy.png)

Setelah Anda ada di layar transaksi "gunakan dan jalankan", periksa ulang bahwa nama kontrak Anda muncul dan klik Gunakan. As you can see on the top of the page, the current environment is “JavaScript VM” that means that we’ll deploy and interact with our smart contract on a local test blockchain to be able to test faster and without any fees.

![Tombol gunakan di pengompilasi solidity Remix](./remix-deploy-button.png)

Setelah Anda sudah mengklik tombol "Gunakan", Anda akan melihat kontrak muncul di bawah. Klik tanda panah di sebelah kiri untuk memperluasnya, sehingga kita bisa melihat isi kontrak kita. Inilah variabel `counter` kita, fungsi `increment()` dan pengambil `getCounter()` kita.

Jika Anda mengklik tombol `count` atau `getCount`, ini akan mengambil isi dari variabel `count` kontrak dan menampilkannya. Karena kita belum memanggil fungsi `increment`, kontrak seharusnya menampilkan 0.

![Tombol fungsi di pengompilasi solidity Remix](./remix-function-button.png)

Sekarang mari kita memanggil fungsi `increment` dengan mengklik tombolnya. Anda akan melihat log transaksi yang dibuat muncul pada bagian bawah jendela. Anda akan melihat bahwa log tampak berbeda saat Anda menekan tombol untuk mengambil data sebagai ganti menekan tombol `increment`. Itu karena membaca data di blockchain tidak memerlukan transaksi apa pun (penulisan) atau biaya. Karena hanya saat memodifikasi state blokchainlah yang memerlukan pembuatan transaksi:

![Log transaksi](./transaction-log.png)

Setelah menekan tombol increment yang akan menghasilkan transaksi untuk memanggil fungsi `increment()` kita, jika kita mengklik kembali tombol count atau getCount, kita akan membaca state yang baru diperbarui dari kontrak pintar dengan variabel count lebih besar dari 0.

![State kontrak pintar yang baru diperbarui](./updated-state.png)

Dalam tutorial berikutnya, kita akan membahas [cara menambahkan aksi ke kontrak pintar Anda](/developers/tutorials/logging-events-smart-contracts/). Membuat log aksi adalah cara mudah untuk men-debug kontrak pintar Anda dan memahami apa yang terjadi saat memanggil sebuah fungsi.
