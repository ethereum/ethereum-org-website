---
title: "Waffle: Mocking dinamis dan percobaan memanggil kontrak pintar"
description: Tutorial tingkat lanjut Waffle untuk menggunakan mocking dinamis dan percobaan memanggil kontrak
author: "Daniel Izdebski"
tags:
  - "waffle"
  - "kontrak pintar"
  - "solidity"
  - "pengujian"
  - "mocking"
skill: intermediate
lang: id
published: 2020-11-14
---

## Apa yang akan di pelajari pada tutorial ini? {#what-is-this-tutorial-about}

Pada tutorial ini, Anda akan belajar cara:

- menggunakan mocking dinamis
- menguji interaksi antara kontrak pintar

Asumsi:

- Anda telah mengetahui bagaimana cara menulis kontrak pintar sederhana dalam `Solidity`
- Anda terbiasa dengan `JavaScript` dan `TypeScript`
- Anda telah menyelesaikan tutorial `Waffle` lainnya atau mengetahui beberapa hal tentangnya

## Mocking dinamis {#dynamic-mocking}

Mengapa mocking dinamis sangat berguna? Baiklah, hal ini mengizinkan kita menulis tes unit ketimbang tes yang terintegrasi. Apa maksudnya? Hal ini berarti bahwa kita tidak perlu khawatir tentang dependensi kontrak pintar, sehingga kita bisa menguji semuanya secara terisolasi. Saya akan menunjukan bagaimana cara Anda melakukannya.

### **1. Proyek** {#1-project}

Sebelum memulai, kita perlu menyiapkan proyek node.js sederhana:

```bash
$ mkdir dynamic-mocking
$ cd dynamic-mocking
$ mkdir contracts src

$ yarn init
# or if you're using npm
$ npm init
```

Mari kita mulai dengan menambah typescript dan menguji dependensi - mocha dan chai:

```bash
$ yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# atau jika anda menggunakan npm
$ npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Sekarang mari tambahkan `Waffle` dan `ether`:

```bash
$ yarn add --dev ethereum-waffle ethers
# atau jika anda menggunakan npm
$ npm install ethereum-waffle ethers --save-dev
```

Struktur proyek Anda seharusnya terlihat seperti ini:

```
.
├── contracts
├── package.json
└── test
```

### **2. Kontrak pintar** {#2-smart-contract}

Untuk memulai mocking dinamis, kita membutuhkan kontrak pintar dengan dependensi. Tenang, saya akan membantu!

Berikut adalah kontrak pintar sederhana yang ditulis dalam `Solidity` yang tujuannya hanya memeriksa apakah kita kaya. Kontrak pintar ini menggunakan token ERC20 untuk memeriksa apakah kita memiliki token yang cukup. Letakan pada `./contracts/AmIRichAlready.sol`.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

Karena kita mau menggunakan mocking dinamis, kita tidak memerlukan seluruh ERC20, itulah mengapa kita menggunakan antarmuka IERC20 dengan hanya satu fungsi.

Saatnya membuat kontrak ini! Untuk itu, kita akan menggunakan `Waffle`. Pertama, kita akan membuat file konfigurasi `waffle.json` sederhana yang menentukan pilihan kompilasi.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Sekarang, kita sudah siap untuk membuat kontrak menggunakan Waffle:

```bash
$ npx waffle
```

Mudah, bukan? Dalam folder `build/`, dua file sesuai dengan kontrak dan antar mukanya muncul. Kita akan menggunakannya nanti untuk percobaan.

### **3. Pengujian** {#3-testing}

Mari kita buat file bernama `AmIRichAlready.test.ts` untuk tes yang sebenarnya. Pertama, kita harus menangani hasil impor. Kita akan membutuhkannya nanti:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

Kecuali untuk dependensi JS, kita harus mengimpor kontrak dan antar muka yang kita bangun:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle menggunakan `chai` untuk pengujian. Namun, sebelum kita menggunakannya, kita harus menginjeksi matcher Waffle kedalam chai:

```typescript
use(solidity)
```

Kita harus mengimplementasikan fungsi `beforeEach()` yang akan mengatur ulang state kontrak sebelum setiap tes dimulai. Pertama-tama mari kita pikirkan apa yang kita butuhkan untuk itu. Untuk menggunakan kontrak, kita membutuhkan dua hal: dompet dan kontrak ERC20 yang digunakan untuk meneruskannya sebagai argumen kontrak `AmIRichAlready`.

Pertama, kita buat dompetnya:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Selanjutnya, kita harus menggunakan kontrak ERC20. Ini bagian sulitnya - kita hanya memiliki satu antarmuka. Di sinilah peran di mana Waffle datang menyelamatkan kita. Waffle memiliki fungsi `deployMockContract()` ajaib yang membuat kontrak dengan hanya menggunakan _abi_ dari antarmuka:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Sekarang dengan dompet maupun ERC20 yang digunakan, kita akan lanjutkan dan menggunakan kontrak `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Secara keseluruhan, fungsi `beforeEach()` kita telah selesai. Sejauh ini file `AmIRichAlready.test.ts` Anda seharusnya telihat seperti ini:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

Mari kita tulis tes pertama ke kontrak `AmIRichAlready`. Menurut Anda, tentang apa seharusnya tes kita? Ya, Anda benar! Kita harus memeriksa apakah kita sudah kaya :)

Tapi tunggu dulu. Bagaimana kontrak mocked kita tahu nilai apa yang dikembalikan? Kita belum mengimplementasikan logika apa pun untuk fungsi `balanceOf()`. Sekali lagi, Waffle bisa membantu kita di sini. Kontrak mocked kita memiliki hal baru yang menarik sekarang:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Dengan pengetahuan ini, akhirnya kita bisa menulis tes pertama kita:

```typescript
it("returns false if the wallet has less than 1000000 tokens", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Mari kita pecahkan tes ini ke dalam bagian-bagian:

1. Kita atur kontrak mock ERC20 kita untuk selalu mengembalikan saldo 999999 token.
2. Periksa apakah metode `contract.check()` mengembalikan nilai `false`.

Kita siap untuk menyalakannya:

![Satu ujian lulus](test-one.png)

Jadi testnya bekerja, namun... masih ada sedikit ruang untuk peningkatan. Fungsi `balanceOf()` akan selalu mengembalikan 99999. Kita bisa meningkatkannya dengan menentukan dompet yang ke mana fungsinya harus mengembalikan sesuatu - sama seperti kontrak sungguhan:

```typescript
it("returns false if the wallet has less than 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Sejauh ini, kita hanya mencoba kasus di mana kita tidak cukup kaya. Mari kita coba kebalikannya:

```typescript
it("returns true if the wallet has at least 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Anda jalankan tesnya...

![Dua ujian lulus](test-two.png)

....dan ini dia! Kontrak kita tampak berjalan sebagaimana mestinya :)

## Menguji pemanggilan kontrak {#testing-contract-calls}

Mari kita ringkas apa yang telah kita lakukan sejauh ini. Kita telah menguji fungsionalitas kontrak `AmIRichAlready` kita dan tampaknya bekerja dengan benar. Artinya, kita telah selesai, bukan? Belum selesai! Waffle memungkinkan kita menguji kontrak bahkan lebih jauh lagi. Tapi, bagaimana persisnya? Dalam gudang senjata Waffle, ada matcher `calledOnContract()` dan `calledOnContractWith()`. Mereka akan memungkinkan kita memeriksa apakah kontrak kita memanggil kontrak mock ERC20. Berikut adalah tes dasarnya dengan salah satu matcher ini:

```typescript
it("checks if contract called balanceOf on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Kita bahkan bisa melangkah lebih jauh dan meningkatkan tes ini dengan matcher lain yang saya sebutkan sebelumnya:

```typescript
it("checks if contract called balanceOf with certain wallet on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Mari kita periksa apakah tesnya benar:

![Tiga ujian lulus](test-three.png)

Hebat, semua test berwarna hijau.

Menguji pemanggilan kontrak dengan Waffle sangatlah mudah. Dan inilah bagian terbaiknya. Matcher ini bekerja baik dalam kontrak normal dan mocked! Itu karena Waffle mencatat dan menyaring pemanggilan EVM ketimbang menginjeksi kode, seperti dalam kasus pustaka pengujian populer untuk teknologi lainnya.

## Garis Akhir {#the-finish-line}

Selamat! Sekarang Anda tahu cara menggunakan Waffle untuk menguji pemanggilan kontrak dan kontrak mock secara dinamis. Ada fitur yang jauh lebih menarik untuk ditemukan. Saya menyarankan menyelam ke dalam dokumentasi Waffle.

Dokumentasi Waffle tersedia [di sini](https://ethereum-waffle.readthedocs.io/).

Sumber kode untuk tutorial ini bisa ditemukan [di sini](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Tutorial yang mungkin juga Anda minati:

- [Menguji kontrak pintar dengan Waffle](/developers/tutorials/testing-smart-contract-with-waffle/)
