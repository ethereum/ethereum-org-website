---
title: Buat dan sebarkan aplikasi DeFi
description: Setor token ERC20 ke kontrak pintar dan cetak Token Farm
author: "strykerin"
tags:
  - "solidity"
  - "defi"
  - "web3.js"
  - "truffle"
  - "ganache"
  - "kontrak pintar"
skill: intermediate
lang: id
published: 2020-12-31
source: github.com
sourceUrl: https://github.com/strykerin/DeFi-Token-Farm
---

Dalam tutorial ini, kita akan membangun Aplikasi DeFi dengan Solidity di mana pengguna dapat menyetor token ERC20 ke kontrak pintar dan kontrak pintar akan mencetak serta mentransfer Token Farm ke mereka. Pengguna nantinya dapat menarik token ERC20 mereka dengan membakar Token Farm pada kontrak pintar dan token ERC20 akan ditransfer kembali ke mereka.

## Instal Truffle dan Ganache {#install-truffle-and-ganache}

Jika ini adalah pertama kalinya Anda menulis kontrak pintar, maka Anda perlu mengatur lingkungan kerja. Kita akan menggunakan dua perangkat: [Truffle](https://www.trufflesuite.com/) dan [Ganache](https://www.trufflesuite.com/ganache).

Truffle adalah lingkungan pengembangan dan kerangka pengujian untuk pengembangan kontrak pintar bagi Ethereum. Dengan menggunakan Truffle, kita mudah membangun dan menyebarkan kontrak pintar ke rantai blok. Ganache membuat kita dapat menciptakan rantai blok Ethereum lokal untuk menguji kontrak pintar. Ganache menyimulasikan fitur dari jaringan yang sebenarnya dan 10 akun pertama didanai dengan 100 ether pengujian, sehingga membuat penyebaran dan pengujian kontrak pintar menjadi gratis dan mudah. Ganache tersedia sebagai aplikasi desktop dan perangkat baris perintah. Untuk artikel ini, kita akan menggunakan aplikasi desktop UI.

![Aplikasi desktop UI Ganache](https://cdn-images-1.medium.com/max/2360/1*V1iQ5onbLbT5Ib2QaiOSyg.png)_Aplikasi desktop UI Ganache_

Untuk membuat proyek, jalankan perintah berikut

```bash
mkdir your-project-name
cd your-project-name
truffle init
```

Perintah ini akan membuat sebuah proyek kosong untuk pengembangan dan penyebaran kontrak pintar kita. Struktur proyek yang dibuat adalah sebagai berikut:

- `contracts`: Folder untuk kontrak pintar solidity

- `migrations`: Folder untuk skrip penyebaran

- `test`: Folder untuk menguji kontrak pintar kita

- `truffle-config.js`: File konfigurasi Truffle

## Buat Token ERC20 {#create-the-erc20-token}

Pertama, kita perlu membuat token ERC20 yang akan digunakan untuk melakukan taruhan pada kontrak pintar. Untuk membuat token yang dapat ditukarkan, kita terlebih dahulu perlu menginstal pustaka OpenZeppelin. Pustaka ini memuat penerapan standar seperti ERC20 dan ERC721. Untuk menginstal pustaka tersebut, jalankan perintah:

```bash
npm install @openzeppelin/contracts
```

Dengan menggunakan pustaka OpenZeppelin, kita dapat membuat token ERC20 dengan menulis ke `contracts/MyToken.sol` dengan kode solidity berikut:

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() public ERC20("MyToken", "MTKN"){
        _mint(msg.sender, 1000000000000000000000000);
    }
}
```

Dalam kode di atas:

- Baris 3: Kita mengimpor kontrak ERC20.sol dari openzeppelin yang memuat penerapan untuk standar token ini.

- Baris 5: Kita mewariskan dari kontrak ERC20.sol.

- Baris 6: Kita memanggil konstruktor ERC20.sol dan melewatkan parameter nama dan simbol sebagai `"MyToken"` dan `"MTKN"` secara berurutan.

- Baris 7: Kita mencetak dan mentransfer 1 juta token untuk akun yang menyebarkan kontrak pintar (kita menggunakan 18 desimal default untuk token ERC20, yang berarti bahwa jika kita ingin mencetak 1 token, Anda akan menyatakannya sebagai 1000000000000000000, 1 dengan 18 nol).

Kita dapat melihat di bawah penerapan konstruktor ERC20.sol di mana field `_decimals` ditetapkan menjadi 18:

```solidity
string private _name;
string private _symbol;
uint8 private _decimals;

constructor (string memory name_, string memory symbol_) public {
    _name = name_;
    _symbol = symbol_;
    _decimals = 18;
}
```

## Kumpulkan Token ERC20 {#compile-the-erc20-token}

Untuk mengumpulkan kontrak pintar kita, kita harus terlebih dahulu memeriksa versi pengumpul solidity kita. Anda dapat memeriksa versi tersebut dengan menjalankan perintah:

```bash
truffle version
```

Versi default adalah `Solidity v0.5.16`. Karena token kita ditulis menggunakan versi solidity `0.6.2`, jika kita menjalankan perintah untuk mengumpulkan kontrak kita, maka kita akan mendapatkan kesalahan pada pengumpul. Untuk menentukan versi pengumpul solidity yang digunakan, buka file `truffle-config.js` dan tetapkan versi pengumpul yang diinginkan seperti terlihat di bawah:

```javascript
// Configure your compilers
compilers: {
  solc: {
    version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
    // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
    // settings: {          // See the solidity docs for advice about optimization and evmVersion
    //  optimizer: {
    //    enabled: false,
    //    runs: 200
    //  },
    //  evmVersion: "byzantium"
    // }
  }
}
```

Sekarang, kita dapat mengumpulkan kontrak pintar kita dengan menjalankan perintah berikut:

```bash
truffle compile
```

## Sebarkan Token ERC20 {#deploy-erc20-token}

Setelah dikumpulkan, kita sekarang dapat menyebarkan token kita.

Pada folder `migrasi`, buat file yang diberi nama `2_deploy_Tokens.js`. File ini adalah tempat kita akan menyebarkan baik Token ERC20 maupun kontrak pintar FarmToken kita. Kode di bawah digunakan untuk menyebarkan kontrak MyToken.sol kita:

```javascript
const MyToken = artifacts.require("MyToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()
}
```

Buka Ganache dan pilih opsi "Quickstart" untuk memulai rantai blok Ethereum lokal. Untuk menyebarkan kontrak kita, jalankan:

```bash
truffle migrate
```

Alamat yang digunakan untuk menyebarkan kontrak kita adalah daftar alamat pertama yang ditunjukkan Ganache kepada kita. Untuk memverifikasinya, kita dapat membuka aplikasi desktop Ganache, dan kita dapat memverifikasi bahwa saldo ether karena saldo akun pertama telah berkurang akibat biaya ether untuk menyebarkan kontrak pintar kita:

![Aplikasi desktop Ganache](https://cdn-images-1.medium.com/max/2346/1*1iJ9VRlyLuza58HL3DLfpg.png)_Aplikasi desktop Ganache_

Untuk memverifikasi bawa 1 juta token MyToken telah dikirimkan ke alamat penyebar, kita dapat menggunakan Konsol Truffle untuk berinteraksi dengan kontrak pintar yang telah disebarkan.

> [Konsol Truffle adalah konsol interaktif dasar yang terhubung ke klien Ethereum mana pun.](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)

Agar dapat berinteraksi dengan kontrak pintar kita, jalankan perintah berikut:

```bash
truffle console
```

Sekarang, kita dapat menulis perintah berikut dalam terminal:

- Dapatkan kontrak pintar: `myToken = menunggu MyToken.deployed()`

- Dapatkan susunan akun dari Ganache: `accounts = menunggu web3.eth.getAccounts()`

- Dapatkan saldo akun pertama: `saldo = menunggu myToken.balanceOf(accounts[0])`

- Format saldo dari 18 desimal: `web3.utils.fromWei(balance.toString())`

Dengan menjalankan perintah di atas, kita akan melihat bahwa alamat pertama sebenarnya memiliki 1 juta MyTokens:

![Alamat pertama memiliki 1000000 MyTokens](https://cdn-images-1.medium.com/max/2000/1*AQlj9A7dw-qtY4QAD3Bpxw.png)

_Alamat pertama memiliki 1000000 MyTokens_

## Buat Kontrak Pintar FarmToken {#create-farmtoken-smart-contract}

Kontrak pintar FarmToken akan memiliki 3 fungsi:

- `balance()`: Dapatkan saldo MyToken pada kontrak pintar FarmToken.

- `deposit(uint256 _amount)`: Transfer MyToken atas nama pengguna ke kontrak pintar FarmToken, kemudian cetak dan transfer FarmToken ke pengguna tersebut.

- `withdraw(uint256 _amount)`: Bakar FarmToken pengguna dan transfer MyToken ke alamat pengguna tersebut.

Mari kita lihat konstruktor FarmToken:

```solidity
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
    using Address for address;
    using SafeMath for uint256; // As of Solidity v0.8.0, mathematical operations can be done safely without the need for SafeMath
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token)
        public
        ERC20("FarmToken", "FRM")
    {
        token = IERC20(_token);
    }
```

- Baris 3-6: Kita mengimpor kontrak berikut dari openzeppelin: IERC20.sol, Address.sol, SafeERC20.sol, dan ERC20.sol.

- Baris 8: FarmToken akan mewarisi dari kontrak ERC20.

- Baris 14-19: Konstruktor FarmToken akan diterima sebagai parameter alamat kontrak MyToken dan kita akan menugaskan kontrak tersebut ke variabel publik kita yang disebut `token`.

Mari kita terapkan fungsi `balance()`. Fungsi ini tidak akan menerima parameter dan akan mengembalikan saldo MyToken pada kontrak pintar ini. Fungsi ini diterapkan seperti terlihat di bawah:

```solidity
function balance() public view returns (uint256) {
    return token.balanceOf(address(this));
}
```

Untuk fungsi `deposit(uint256 _amount)`, fungsi ini akan diterima sebagai parameter jumlah yang ingin disetor pengguna dan fungsi ini akan mencetak dan mentransfer FarmToken ke pengguna:

```solidity
function deposit(uint256 _amount) public {
    // Amount must be greater than zero
    require(_amount > 0, "amount cannot be 0");

    // Transfer MyToken to smart contract
    token.safeTransferFrom(msg.sender, address(this), _amount);

    // Mint FarmToken to msg sender
    _mint(msg.sender, _amount);
}
```

Untuk fungsi `withdraw(uint256 _amount)`, kita akan menerima fungsi tersebut sebagai parameter jumlah FarmToken yang ingin di bakar oleh pengguna dan kemudian mentransfer kembali jumlah MyToken yang sama ke pengguna:

```solidity
function withdraw(uint256 _amount) public {
    // Burn FarmTokens from msg sender
    _burn(msg.sender, _amount);

    // Transfer MyTokens from this smart contract to msg sender
    token.safeTransfer(msg.sender, _amount);
}
```

Sekarang, kita akan menyebarkan kontrak pintar kita. Untuk melakukannya, kita akan kembali ke file `2_deploy_Tokens.js` dan menambahkan kontrak baru yang akan disebarkan:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()

  // Deploy Farm Token
  await deployer.deploy(FarmToken, myToken.address)
  const farmToken = await FarmToken.deployed()
}
```

Perlu diperhatikan bahwa saat menyebarkan FarmToken, kita menyebarkan alamat kontrak MyToken yang digunakan sebagai parameter.

Sekarang, jalankan `truffle compile` dan `truffle migrate` untuk menyebarkan kontrak kita.

Mari kita menguji kontrak pintar kita. Alih-alih menggunakan `konsol truffle` untuk berinteraksi dengan kontrak pintar kita, kita akan membuat skrip untuk mengautomasi proses ini. Buat folder bernama `skrip` dan tambahkan file `getMyTokenBalance.js` berikut. Folder ini akan memeriksa saldo MyToken pada kontrak pintar FarmToken:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  myToken = await MyToken.deployed()
  farmToken = await FarmToken.deployed()
  balance = await myToken.balanceOf(farmToken.address)
  console.log(web3.utils.fromWei(balance.toString()))
  callback()
}
```

Untuk melaksanakan skrip, jalankan perintah cli berikut:

```bash
truffle exec .\scripts\getMyTokenBalance.js
```

Kita akan mendapatkan hasil yang diinginkan, yaitu 0. Jika Anda mendapatkan kesalahan tentang FarmToken yang belum disebarkan, jaringan truffle belum menerima versi terbaru dari kode kontrak Anda. Cukup tutup ganache, mulai cepat lagi dan pastikan untuk menjalankan `truffle migrate`.

Sekarang, mari kita bertaruh MyToken ke kontrak pintar. Karena fungsi `deposit(uint256 _amount)` memangil fungsi `safeTransferFrom` dari ERC20, pengguna harus terlebih dahulu menyetujui kontrak pintar untuk mentransfer MyToken atas nama pengguna. Jadi, pada skrip di bawah, kita akan terlebih dahulu menyetujui langkah ini, kemudian kita akan memanggil fungsi:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default.
  const allowanceBefore = await myToken.allowance(
    accounts[0],
    farmToken.address
  )
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )

  // In order to allow the Smart Contract to transfer to MyToken (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow farmToken to transfer x amount of MyToken on our behalf
  await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"))

  // Validate that the farmToken can now move x amount of MyToken on our behalf
  const allowanceAfter = await myToken.allowance(accounts[0], farmToken.address)
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )
  // Call Deposit function from FarmToken
  console.log("Call Deposit Function")
  await farmToken.deposit(web3.utils.toWei("100", "ether"))
  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

Untuk menjalankan skrip ini: `truffle exec .\scripts\transferMyTokenToFarmToken.js`. Anda seharusnya melihat pada konsol Anda:

![output dari transferMyTokenToFarmToken.js](https://cdn-images-1.medium.com/max/2000/1*MoekE2QCw7vB98u5dl7ang.png)

_output dari transferMyTokenToFarmToken.js_

Seperti yang dapat kita lihat, kita telah berhasil menyetor MyToken ke kontrak pintar karena akun pertama sekarang memiliki FarmToken.

Untuk melakukan penarikan:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )

  // Call Deposit function from FarmToken
  console.log("Call Withdraw Function")
  await farmToken.withdraw(web3.utils.toWei("100", "ether"))

  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

Untuk menjalankan skrip ini: `truffle exec .\scripts\withdrawMyTokenFromTokenFarm.js`. Seperti yang dapat kita lihat pada output di bawah, kita telah berhasil mendapatkan MyToken kembali dan kita telah membakar FarmToken:

![output dari withdrawMyTokenFromTokenFarm.js](https://cdn-images-1.medium.com/max/2000/1*jHYlTFg0NgGbhASpsRvc0w.png)

_output dari withdrawMyTokenFromTokenFarm.js_

## Referensi {#references}

[Kontrak - Dokumentasi OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/)

[Perangkat Berguna untuk Kontrak Pintar | Truffle Suite](https://www.trufflesuite.com/)

[Ganache | Truffle Suite](https://www.trufflesuite.com/ganache)

[Apa yang Dimaksud dengan DeFi? Panduan bagi Pemula (Diperbarui Tahun 2021) (99bitcoins.com)](https://99bitcoins.com/what-is-defi/)

[DeFi - Papan Peringkat Keuangan Terdesentralisasi di DeFi Pulse](https://defipulse.com/)
