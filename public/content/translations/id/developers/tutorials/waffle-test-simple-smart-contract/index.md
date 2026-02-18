---
title: Menguji kontrak pintar sederhana dengan pustaka Waffle
description: Tutorial untuk pemula
author: Ewa Kowalska
tags: [ "kontrak pintar", "Solidity", "Waffle", "pengujian" ]
skill: beginner
lang: id
published: 2021-02-26
---

## Dalam tutorial ini Anda akan belajar cara {#in-this-tutorial-youll-learn-how-to}

- Menguji perubahan saldo dompet
- Uji emisi peristiwa dengan argumen tertentu
- Menegaskan bahwa transaksi telah dikembalikan

## Asumsi {#assumptions}

- Anda dapat membuat proyek JavaScript atau TypeScript baru
- Anda memiliki pengalaman dasar dengan pengujian dalam JavaScript
- Anda telah menggunakan beberapa manajer paket seperti yarn atau npm
- Anda memiliki pengetahuan yang sangat dasar tentang kontrak pintar dan Solidity

## Memulai {#getting-started}

Tutorial ini mendemonstrasikan pengaturan dan proses pengujian menggunakan yarn, tetapi tidak ada masalah jika Anda lebih memilih npm - saya akan memberikan referensi yang tepat ke [dokumentasi](https://ethereum-waffle.readthedocs.io/en/latest/index.html) Waffle resmi.

## Instal Dependensi {#install-dependencies}

[Tambahkan](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) dependensi ethereum-waffle dan typescript ke dev dependencies proyek Anda.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Contoh kontrak pintar {#example-smart-contract}

Selama tutorial ini, kita akan mengerjakan contoh kontrak pintar sederhana - EtherSplitter. Fungsinya tidak lebih dari memungkinkan siapa pun untuk mengirim sejumlah wei dan membaginya secara merata di antara dua penerima yang telah ditentukan sebelumnya.
Fungsi split mengharuskan jumlah wei genap, jika tidak maka akan dikembalikan. Untuk kedua penerima, ia melakukan transfer wei yang diikuti dengan emisi peristiwa Transfer.

Tempatkan cuplikan kode EtherSplitter di `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Kompilasi kontrak {#compile-the-contract}

Untuk [mengompilasi](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) kontrak, tambahkan entri berikut ke file package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

Selanjutnya, buat file konfigurasi Waffle di direktori root proyek - `waffle.json` - lalu tempelkan konfigurasi berikut di sana:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Jalankan `yarn build`. Hasilnya, direktori `build` akan muncul dengan kontrak EtherSplitter yang telah dikompilasi dalam format JSON.

## Pengaturan pengujian {#test-setup}

Pengujian dengan Waffle memerlukan penggunaan matcher Chai dan Mocha, jadi Anda perlu [menambahkannya](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) ke proyek Anda. Perbarui file package.json Anda dan tambahkan entri `test` di bagian skrip:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Jika Anda ingin [menjalankan](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) pengujian Anda, cukup jalankan `yarn test` .

## Pengujian {#testing}

Sekarang buat direktori `test` dan buat file baru `test\EtherSplitter.test.ts`.
Salin cuplikan di bawah ini dan tempelkan ke file pengujian kami.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // tambahkan pengujian di sini
})
```

Beberapa kata sebelum kita mulai.
`MockProvider` hadir dengan versi tiruan dari blockchain. Ini juga menyediakan dompet tiruan yang akan kita gunakan untuk menguji kontrak EtherSplitter. Kita bisa mendapatkan hingga sepuluh dompet dengan memanggil metode `getWallets()` pada provider. Dalam contoh, kita mendapatkan tiga dompet - untuk pengirim dan dua penerima.

Selanjutnya, kita mendeklarasikan sebuah variabel yang disebut 'splitter' - ini adalah kontrak EtherSplitter tiruan kita. Ini dibuat sebelum setiap eksekusi pengujian tunggal oleh metode `deployContract`. Metode ini menyimulasikan penerapan kontrak dari dompet yang diteruskan sebagai parameter pertama (dompet pengirim dalam kasus kita). Parameter kedua adalah ABI dan bytecode dari kontrak yang diuji - kita meneruskan file json dari kontrak EtherSplitter yang dikompilasi dari direktori `build`. Parameter ketiga adalah sebuah array dengan argumen konstruktor kontrak, yang dalam kasus kita, adalah dua alamat penerima.

## changeBalances {#changebalances}

Pertama, kita akan memeriksa apakah metode split benar-benar mengubah saldo dompet penerima. Jika kita membagi 50 wei dari akun pengirim, kita akan mengharapkan saldo kedua penerima meningkat sebesar 25 wei. Kita akan menggunakan matcher `changeBalances` dari Waffle:

```ts
it("Mengubah saldo akun", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Sebagai parameter pertama dari matcher, kita meneruskan sebuah array dompet penerima, dan sebagai yang kedua - sebuah array peningkatan yang diharapkan pada akun-akun yang sesuai.
Jika kita ingin memeriksa saldo dari satu dompet tertentu, kita juga dapat menggunakan matcher `changeBalance`, yang tidak memerlukan array, seperti pada contoh di bawah ini:

```ts
it("Mengubah saldo akun", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Perhatikan bahwa dalam kedua kasus `changeBalance` dan `changeBalances` kita meneruskan fungsi split sebagai callback karena matcher perlu mengakses status saldo sebelum dan sesudah panggilan.

Selanjutnya, kita akan menguji apakah peristiwa Transfer diemisikan setelah setiap transfer wei. Kita akan beralih ke matcher lain dari Waffle:

## Emit {#emit}

```ts
it("Mengemisikan peristiwa pada transfer ke penerima pertama", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Mengemisikan peristiwa pada transfer ke penerima kedua", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

Matcher `emit` memungkinkan kita untuk memeriksa apakah sebuah kontrak mengemisikan sebuah peristiwa saat memanggil sebuah metode. Sebagai parameter untuk matcher `emit`, kita menyediakan kontrak tiruan yang kita prediksi akan mengemisikan peristiwa, bersama dengan nama peristiwa tersebut. Dalam kasus kita, kontrak tiruan adalah `splitter` dan nama peristiwanya - `Transfer`. Kita juga dapat memverifikasi nilai yang tepat dari argumen yang diemisikan bersama peristiwa - kita meneruskan argumen ke matcher `withArgs` sebanyak yang diharapkan oleh deklarasi peristiwa kita. Dalam kasus kontrak EtherSplitter, kita meneruskan alamat pengirim dan penerima bersama dengan jumlah wei yang ditransfer.

## revertedWith {#revertedwith}

Sebagai contoh terakhir, kita akan memeriksa apakah transaksi dikembalikan jika jumlah wei ganjil. Kita akan menggunakan matcher `revertedWith`:

```ts
it("Dikembalikan ketika jumlah Vei ganjil", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

Pengujian ini, jika lulus, akan meyakinkan kita bahwa transaksi tersebut memang benar-benar dikembalikan. Namun, harus ada juga kecocokan yang persis antara pesan yang kita teruskan dalam pernyataan `require` dan pesan yang kita harapkan dalam `revertedWith`. Jika kita kembali ke kode kontrak EtherSplitter, dalam pernyataan `require` untuk jumlah wei, kita memberikan pesan: 'Uneven wei amount not allowed'. Ini cocok dengan pesan yang kita harapkan dalam pengujian kita. Jika tidak sama, pengujian akan gagal.

## Selamat! {#congratulations}

Anda telah membuat langkah besar pertama Anda untuk menguji kontrak pintar dengan Waffle!
