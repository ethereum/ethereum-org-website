---
title: "Tutorial Waffle hello world menggunakan hardhat dan ether"
description: Buat proyek Waffle pertama Anda dengan hardhat dan ethers.js
author: "MiZiet"
tags:
  - "waffle"
  - "kontrak pintar"
  - "solidity"
  - "pengujian"
  - "hardhat"
  - "ethers.js"
skill: beginner
lang: id
published: 2020-10-16
---

Dalam tutorial [Waffle](https://ethereum-waffle.readthedocs.io) ini, kita akan belajar cara menyiapkan proyek kontrak pintar "Hello world" yang sederhana, menggunakan [hardhat](https://hardhat.org/) dan [ethers.js](https://docs.ethers.io/v5/). Kemudian kita akan belajar cara menambahkan fungsionalitas baru ke kontrak pintar kita dan cara mengujinya dengan Waffle.

Mari kita mulai dengan membuat proyek baru:

```bash
yarn init
```

atau

```bash
npm init
```

dan menginstal paket yang diperlukan:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

atau

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

Langkah selanjutnya adalah membuat proyek hardhat percontohan dengan menjalankan `npx hardhat`.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Selamat datang di HardHat v2.0.3 👷‍

? What do you want to do? …
❯ Create a sample project
Create an empty hardhat.config.js
Quit
```

Pilih `Buat proyek sampel`

Struktur proyek kita seharusnya terlihat seperti ini:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributs
├── .gitignore
├── hardhat.config.js
└── package.json
```

### Sekarang mari kita bicara tentang beberapa file ini: {#now-lets-talk}

- Greeter.sol - kontrak pintar kita yang ditulis dalam solidity;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("Deploying a Greeter with greeting:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

Kontrak pintar kita dapat dibagi menjadi tiga bagian:

1. constructor - tempat kami mendeklarasikan variabel tipe string yang disebut `greeting`,
2. function greet - sebuah fungsi yang akan mengembalikan `greeting` saat dipanggil,
3. function setGreeting - fungsi yang memungkinkan kita mengubah nilai `greeting`.

- sample-test.js - file tes kita

```js
describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### Langkah selanjutnya terdiri dari mengompilasi kontrak kita dan menjalankan pengujian: {#compiling-and-testing}

Pengujian wafel menggunakan Mocha (kerangka pengujian) dengan Chai (pustaka assertion). Yang harus Anda lakukan adalah menjalankan `npx hardhat test` dan menunggu pesan berikut muncul.

```bash
✓ Should return the new greeting once it's changed
```

### Semuanya terlihat bagus sejauh ini, mari tambahkan lebih banyak kerumitan pada proyek kita <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Bayangkan suatu situasi ketika seseorang menambahkan string kosong sebagai salam. Ini bukan sapaan yang hangat, bukan?  
Mari kita pastikan itu tidak terjadi:

Kita ingin menggunakan `revert` solidity ketika seseorang melewati string kosong. Hal baiknya adalah kita bisa dengan mudah menguji fungsionalitas ini dengan `to.be.revertedWith ()` matcher chai Waffle.

```js
it("Should revert when passing an empty string", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Greeting should not be empty"
  )
})
```

Sepertinya tes baru kita tidak lulus:

```bash
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    ✓ Should return the new greeting once it's changed (1514ms)
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to ''
    1) Should revert when passing an empty string


  1 passing (2s)
  1 failing
```

Mari kita terapkan fungsi ini ke dalam kontrak pintar kita:

```solidity
require(bytes(_greeting).length > 0, "Salam tidak boleh kosong");
```

Sekarang, fungsi setGreeting kita terlihat seperti ini:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Mari kita jalankan tes lagi:

```bash
✓ Should return the new greeting once it's changed (1467ms)
✓ Should revert when passing an empty string (276ms)

2 passing (2s)
```

Selamat! Anda berhasil :)

### Kesimpulan {#conclusion}

Kita membuat proyek sederhana dengan Waffle, Hardhat, dan eters.js. Kita mempelajari cara menyiapkan proyek, menambahkan pengujian, dan mengimplementasikan fungsionalitas baru.

Untuk chai matcher yang lebih hebat untuk menguji kontrak pintar Anda, lihat [dokumen resmi Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
