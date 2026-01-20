---
title: "Waffle: Mocking dinamis dan pengujian pemanggilan kontrak"
description: Tutorial Waffle tingkat lanjut untuk menggunakan mocking dinamis dan pengujian pemanggilan kontrak
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "kontrak pintar",
    "Solidity",
    "pengujian",
    "mocking"
  ]
skill: intermediate
lang: id
published: 14-11-2020
---

## Apa isi tutorial ini? {#what-is-this-tutorial-about}

Dalam tutorial ini Anda akan belajar cara:

- menggunakan mocking dinamis
- menguji interaksi antara kontrak pintar

Asumsi:

- Anda sudah tahu cara menulis kontrak pintar sederhana di `Solidity`
- Anda sudah terbiasa dengan `JavaScript` dan `TypeScript`
- Anda telah menyelesaikan tutorial `Waffle` lainnya atau mengetahui satu atau dua hal tentangnya

## Mocking dinamis {#dynamic-mocking}

Mengapa mocking dinamis berguna? Hal ini memungkinkan kita untuk menulis tes unit alih-alih tes integrasi. Apa artinya? Artinya kita tidak perlu khawatir tentang dependensi kontrak pintar, sehingga kita dapat menguji semuanya dalam isolasi penuh. Saya akan menunjukkan kepada Anda cara melakukannya.

### **1. Proyek** {#1-project}

Sebelum kita mulai, kita perlu mempersiapkan proyek node.js sederhana:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# atau jika Anda menggunakan npm
npm init
```

Mari kita mulai dengan menambahkan typescript dan dependensi pengujian - mocha & chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# atau jika Anda menggunakan npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Sekarang mari tambahkan `Waffle` dan `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# atau jika Anda menggunakan npm
npm install ethereum-waffle ethers --save-dev
```

Struktur proyek Anda seharusnya terlihat seperti ini sekarang:

```
.
├── contracts
├── package.json
└── test
```

### **2. Kontrak Pintar** {#2-smart-contract}

Untuk memulai mocking dinamis, kita memerlukan kontrak pintar dengan dependensi. Jangan khawatir, saya akan bantu!

Berikut adalah kontrak pintar sederhana yang ditulis dalam `Solidity` yang satu-satunya tujuannya adalah untuk memeriksa apakah kita kaya. Ini menggunakan token ERC20 untuk memeriksa apakah kita memiliki token yang cukup. Letakkan di `./contracts/AmIRichAlready.sol`.

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

Karena kita ingin menggunakan mocking dinamis, kita tidak memerlukan seluruh ERC20, itulah sebabnya kita menggunakan antarmuka IERC20 yang hanya memiliki satu fungsi.

Saatnya membangun kontrak ini! Untuk itu kita akan menggunakan `Waffle`. Pertama, kita akan membuat file konfigurasi `waffle.json` sederhana yang menentukan opsi kompilasi.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Sekarang kita siap untuk membangun kontrak dengan Waffle:

```bash
npx waffle
```

Mudah, bukan? Di dalam folder `build/`, dua file yang sesuai dengan kontrak dan antarmukanya telah muncul. Kita akan menggunakannya nanti untuk pengujian.

### **3. Pengujian** {#3-testing}

Mari kita buat file bernama `AmIRichAlready.test.ts` untuk pengujian yang sebenarnya. Pertama-tama, kita harus menangani impor. Kita akan membutuhkannya nanti:

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

Selain dependensi JS, kita perlu mengimpor kontrak dan antarmuka yang telah kita bangun:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle menggunakan `chai` untuk pengujian. Namun, sebelum kita dapat menggunakannya, kita harus menyuntikkan matcher Waffle ke dalam chai itu sendiri:

```typescript
use(solidity)
```

Kita perlu mengimplementasikan fungsi `beforeEach()` yang akan mengatur ulang status kontrak sebelum setiap pengujian. Mari kita pikirkan dulu apa yang kita butuhkan di sana. Untuk menerapkan kontrak, kita memerlukan dua hal: dompet dan kontrak ERC20 yang telah diterapkan untuk diteruskan sebagai argumen untuk kontrak `AmIRichAlready`.

Pertama kita membuat dompet:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Kemudian, kita perlu menerapkan kontrak ERC20. Inilah bagian yang rumit - kita hanya memiliki antarmuka. Di sinilah Waffle datang untuk menyelamatkan kita. Waffle memiliki fungsi `deployMockContract()` ajaib yang membuat kontrak hanya dengan menggunakan _abi_ dari antarmuka:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Sekarang dengan dompet dan ERC20 yang telah diterapkan, kita dapat melanjutkan dan menerapkan kontrak `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Dengan semua itu, fungsi `beforeEach()` kita selesai. Sejauh ini, file `AmIRichAlready.test.ts` Anda akan terlihat seperti ini:

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

Mari kita tulis tes pertama untuk kontrak `AmIRichAlready`. Menurut Anda, tes kita seharusnya tentang apa? Ya, Anda benar! Kita harus memeriksa apakah kita sudah kaya :)

Tapi tunggu sebentar. Bagaimana kontrak tiruan kita tahu nilai apa yang harus dikembalikan? Kita belum mengimplementasikan logika apa pun untuk fungsi `balanceOf()`. Sekali lagi, Waffle dapat membantu di sini. Kontrak tiruan kita memiliki beberapa hal baru yang menarik sekarang:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Dengan pengetahuan ini kita akhirnya dapat menulis tes pertama kita:

```typescript
it("mengembalikan false jika dompet memiliki kurang dari 1.000.000 token", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Mari kita bagi tes ini menjadi beberapa bagian:

1. Kita mengatur kontrak tiruan ERC20 kita untuk selalu mengembalikan saldo 999999 token.
2. Periksa apakah metode `contract.check()` mengembalikan `false`.

Kita siap untuk menyalakannya:

![Satu tes berhasil](./test-one.png)

Jadi tesnya berhasil, tapi... masih ada ruang untuk perbaikan. Fungsi `balanceOf()` akan selalu mengembalikan 99999. Kita bisa memperbaikinya dengan menentukan dompet yang fungsinya harus mengembalikan sesuatu - sama seperti kontrak sungguhan:

```typescript
it("mengembalikan false jika dompet memiliki kurang dari 1.000.001 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Sejauh ini, kita hanya menguji kasus di mana kita tidak cukup kaya. Mari kita uji sebaliknya:

```typescript
it("mengembalikan true jika dompet memiliki setidaknya 1.000.001 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Anda menjalankan tesnya...

![Dua tes berhasil](test-two.png)

...dan ini dia! Kontrak kita tampaknya berfungsi sebagaimana mestinya :)

## Menguji pemanggilan kontrak {#testing-contract-calls}

Mari kita rangkum apa yang telah kita lakukan sejauh ini. Kita telah menguji fungsionalitas kontrak `AmIRichAlready` kita dan tampaknya berfungsi dengan baik. Itu berarti kita sudah selesai, bukan? Belum tentu! Waffle memungkinkan kita menguji kontrak bahkan lebih jauh lagi. Tapi bagaimana tepatnya? Nah, dalam persenjataan Waffle ada matcher `calledOnContract()` dan `calledOnContractWith()`. Mereka akan memungkinkan kita memeriksa apakah kontrak kita memanggil kontrak mock ERC20. Berikut adalah tes dasar dengan salah satu matcher ini:

```typescript
it("memeriksa apakah kontrak memanggil balanceOf pada token ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Kita bahkan bisa melangkah lebih jauh dan meningkatkan tes ini dengan matcher lain yang saya sebutkan sebelumnya:

```typescript
it("memeriksa apakah kontrak memanggil balanceOf dengan dompet tertentu pada token ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Mari kita periksa apakah tesnya benar:

![Tiga tes berhasil](test-three.png)

Bagus, semua tes berwarna hijau.

Menguji pemanggilan kontrak dengan Waffle sangatlah mudah. Dan inilah bagian terbaiknya. Matcher ini bekerja dengan baik pada kontrak normal maupun kontrak tiruan! Ini karena Waffle mencatat dan menyaring pemanggilan EVM alih-alih menyuntikkan kode, seperti yang terjadi pada pustaka pengujian populer untuk teknologi lain.

## Garis Finis {#the-finish-line}

Selamat! Sekarang Anda tahu cara menggunakan Waffle untuk menguji pemanggilan kontrak dan membuat kontrak tiruan secara dinamis. Ada lebih banyak fitur menarik untuk ditemukan. Saya sarankan untuk mendalami dokumentasi Waffle.

Dokumentasi Waffle tersedia [di sini](https://ethereum-waffle.readthedocs.io/).

Kode sumber untuk tutorial ini dapat ditemukan [di sini](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Tutorial yang mungkin juga Anda minati:

- [Menguji kontrak pintar dengan Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
