---
title: "ABI Pendek untuk Optimisasi Calldata"
description: Mengoptimalkan kontrak pintar untuk Optimistic Rollup
author: Ori Pomerantz
lang: id
tags: [ "layer 2" ]
skill: intermediate
published: 2022-04-01
---

## Pengenalan {#introduction}

Dalam artikel ini, Anda belajar tentang [optimistic rollup](/developers/docs/scaling/optimistic-rollups), biaya transaksi di dalamnya, dan bagaimana struktur biaya yang berbeda itu mengharuskan kita untuk mengoptimalkan hal-hal yang berbeda dari yang ada di Jaringan Utama Ethereum.
Anda juga akan mempelajari cara mengimplementasikan optimisasi ini.

### Pengungkapan penuh {#full-disclosure}

Saya adalah karyawan purnawaktu [Optimism](https://www.optimism.io/), jadi contoh-contoh dalam artikel ini akan berjalan di Optimism.
Namun, teknik yang dijelaskan di sini seharusnya juga berfungsi dengan baik untuk rollup lainnya.

### Terminologi {#terminology}

Ketika membahas rollup, istilah 'layer 1' (L1) digunakan untuk Mainnet, jaringan produksi Ethereum.
Istilah 'layer 2' (L2) digunakan untuk rollup atau sistem lain yang mengandalkan L1 untuk keamanan tetapi melakukan sebagian besar pemrosesannya secara off-chain.

## Bagaimana cara kita mengurangi biaya transaksi L2 lebih lanjut? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[Optimistic rollup](/developers/docs/scaling/optimistic-rollups) harus menyimpan catatan dari setiap transaksi historis agar siapa pun dapat memeriksanya dan memverifikasi bahwa state saat ini sudah benar.
Cara termurah untuk memasukkan data ke Jaringan Utama Ethereum adalah dengan menuliskannya sebagai calldata.
Solusi ini dipilih oleh [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) dan [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Biaya transaksi L2 {#cost-of-l2-transactions}

Biaya transaksi L2 terdiri dari dua komponen:

1. Pemrosesan L2, yang biasanya sangat murah
2. Penyimpanan L1, yang terkait dengan biaya gas Mainnet

Saat saya menulis ini, di Optimism biaya gas L2 adalah 0,001 [Gwei](/developers/docs/gas/#pre-london).
Biaya gas L1, di sisi lain, adalah sekitar 40 gwei.
[Anda dapat melihat harga saat ini di sini](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Satu byte calldata dikenakan biaya 4 gas (jika nilainya nol) atau 16 gas (jika nilainya lainnya).
Salah satu operasi termahal di EVM adalah menulis ke penyimpanan.
Biaya maksimum untuk menulis word 32-byte ke penyimpanan di L2 adalah 22.100 gas. Saat ini, biayanya adalah 22,1 gwei.
Jadi, jika kita dapat menghemat satu byte nol calldata, kita akan dapat menulis sekitar 200 byte ke penyimpanan dan masih tetap untung.

### ABI {#the-abi}

Sebagian besar transaksi mengakses kontrak dari akun yang dimiliki secara eksternal.
Sebagian besar kontrak ditulis dalam Solidity dan menafsirkan bidang datanya per [antarmuka biner aplikasi (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Namun, ABI dirancang untuk L1, di mana satu byte calldata biayanya kira-kira sama dengan empat operasi aritmetika, bukan L2 di mana satu byte calldata biayanya lebih dari seribu operasi aritmetika.
Calldata dibagi sebagai berikut:

| Bagian          | Panjang |  Byte | Byte terbuang | Gas terbuang | Byte yang diperlukan | Gas yang diperlukan |
| --------------- | ------: | ----: | ------------: | -----------: | -------------------: | ------------------: |
| Selektor fungsi |       4 |   0-3 |             3 |           48 |                    1 |                  16 |
| Angka Nol       |      12 |  4-15 |            12 |           48 |                    0 |                   0 |
| Alamat tujuan   |      20 | 16-35 |             0 |            0 |                   20 |                 320 |
| Jumlah          |      32 | 36-67 |            17 |           64 |                   15 |                 240 |
| Total           |      68 |       |               |          160 |                      |                 576 |

Penjelasan:

- **Selektor fungsi**: Kontrak memiliki kurang dari 256 fungsi, jadi kita dapat membedakannya dengan satu byte.
  Byte-byte ini biasanya bukan nol dan oleh karena itu [berbiaya enam belas gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Angka Nol**: Byte-byte ini selalu nol karena alamat dua puluh byte tidak memerlukan word tiga puluh dua byte untuk menampungnya.
  Byte yang menyimpan angka nol berbiaya empat gas ([lihat yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), Lampiran G,
  hlm. 27, nilai untuk `G`<sub>`txdatazero`</sub>).
- **Jumlah**: Jika kita berasumsi bahwa dalam kontrak ini `decimals` adalah delapan belas (nilai normal) dan jumlah maksimum token yang kita transfer adalah 10<sup>18</sup>, kita mendapatkan jumlah maksimum 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, jadi lima belas byte sudah cukup.

Pemborosan 160 gas di L1 biasanya dapat diabaikan. Sebuah transaksi berbiaya setidaknya [21.000 gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), jadi tambahan 0,8% tidak menjadi masalah.
Namun, di L2, keadaannya berbeda. Hampir seluruh biaya transaksi adalah untuk menuliskannya ke L1.
Selain calldata transaksi, ada 109 byte header transaksi (alamat tujuan, tanda tangan, dll.).
Total biayanya adalah `109*16+576+160=2480`, dan kita membuang sekitar 6,5% dari itu.

## Mengurangi biaya saat Anda tidak mengontrol tujuan {#reducing-costs-when-you-dont-control-the-destination}

Dengan asumsi bahwa Anda tidak memiliki kontrol atas kontrak tujuan, Anda masih dapat menggunakan solusi yang serupa dengan [yang satu ini](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Mari kita periksa file-file yang relevan.

### Token.sol {#token-sol}

[Ini adalah kontrak tujuan](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Ini adalah kontrak standar ERC-20, dengan satu fitur tambahan.
Fungsi `faucet` ini memungkinkan setiap pengguna mendapatkan sejumlah token untuk digunakan.
Ini akan membuat kontrak ERC-20 produksi menjadi tidak berguna, tetapi ini membuat hidup lebih mudah ketika ERC-20 hanya ada untuk memfasilitasi pengujian.

```solidity
    /**
     * @dev Memberi pemanggil 1000 token untuk digunakan
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Ini adalah kontrak yang seharusnya dipanggil oleh transaksi dengan calldata yang lebih pendek](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Mari kita bahas baris per baris.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Kita memerlukan fungsi token untuk mengetahui cara memanggilnya.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Alamat token yang kita proksikan.

```solidity

    /**
     * @dev Menentukan alamat token
     * @param tokenAddr_ alamat kontrak ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

Alamat token adalah satu-satunya parameter yang perlu kita tentukan.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Membaca sebuah nilai dari calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "Batas panjang calldataVal adalah 32 byte");

        require(length + startByte <= msg.data.length,
            "calldataVal mencoba membaca melebihi calldatasize");
```

Kita akan memuat satu word 32-byte (256-bit) ke memori dan menghapus byte yang bukan bagian dari bidang yang kita inginkan.
Algoritma ini tidak bekerja untuk nilai yang lebih panjang dari 32 byte, dan tentu saja kita tidak dapat membaca melewati akhir calldata.
Di L1 mungkin perlu untuk melewati tes ini untuk menghemat gas, tetapi di L2 gas sangat murah, yang memungkinkan pemeriksaan kewarasan apa pun yang bisa kita pikirkan.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Kita bisa saja menyalin data dari panggilan ke `fallback()` (lihat di bawah), tetapi lebih mudah menggunakan [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), bahasa assembly dari EVM.

Di sini kita menggunakan [opcode CALLDATALOAD](https://www.evm.codes/#35) untuk membaca byte `startByte` hingga `startByte+31` ke dalam stack.
Secara umum, sintaksis opcode di Yul adalah `<nama opcode>(<nilai tumpukan pertama, jika ada>,<nilai tumpukan kedua, jika ada>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Hanya byte `length` yang paling signifikan yang merupakan bagian dari bidang tersebut, jadi kita melakukan [geser-kanan (right-shift)](https://en.wikipedia.org/wiki/Logical_shift) untuk menyingkirkan nilai-nilai lainnya.
Ini memiliki keuntungan tambahan yaitu memindahkan nilai ke sebelah kanan bidang, jadi nilainya adalah nilai itu sendiri, bukan nilai dikalikan 256<sup>sesuatu</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Ketika panggilan ke kontrak Solidity tidak cocok dengan tanda tangan fungsi apa pun, ia memanggil [fungsi `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (dengan asumsi ada).
Dalam kasus `CalldataInterpreter`, panggilan _apa pun_ akan sampai di sini karena tidak ada fungsi `external` atau `public` lainnya.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Membaca byte pertama dari calldata, yang memberitahu kita fungsinya.
Ada dua alasan mengapa sebuah fungsi tidak akan tersedia di sini:

1. Fungsi yang `pure` atau `view` tidak mengubah state dan tidak memerlukan gas (ketika dipanggil secara off-chain).
   Tidak masuk akal untuk mencoba mengurangi biaya gas mereka.
2. Fungsi yang mengandalkan [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Nilai `msg.sender` akan menjadi alamat `CalldataInterpreter`, bukan pemanggilnya.

Sayangnya, [melihat spesifikasi ERC-20](https://eips.ethereum.org/EIPS/eip-20), ini hanya menyisakan satu fungsi, `transfer`.
Ini menyisakan kita dengan hanya dua fungsi: `transfer` (karena kita dapat memanggil `transferFrom`) dan `faucet` (karena kita dapat mentransfer token kembali ke siapa pun yang memanggil kita).

```solidity

        // Panggil metode pengubah state dari token menggunakan
        // informasi dari calldata

        // faucet
        if (_func == 1) {
```

Panggilan ke `faucet()`, yang tidak memiliki parameter.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Setelah kita memanggil `token.faucet()` kita mendapatkan token. Namun, sebagai kontrak proksi, kita tidak **membutuhkan** token.
EOA (akun milik eksternal) atau kontrak yang memanggil kita yang membutuhkannya.
Jadi, kita mentransfer semua token kita ke siapa pun yang memanggil kita.

```solidity
        // transfer (asumsikan kita memiliki alokasi untuk itu)
        if (_func == 2) {
```

Mentransfer token memerlukan dua parameter: alamat tujuan dan jumlahnya.

```solidity
            token.transferFrom(
                msg.sender,
```

Kita hanya mengizinkan pemanggil untuk mentransfer token yang mereka miliki

```solidity
                address(uint160(calldataVal(1, 20))),
```

Alamat tujuan dimulai pada byte #1 (byte #0 adalah fungsinya).
Sebagai alamat, panjangnya 20-byte.

```solidity
                calldataVal(21, 2)
```

Untuk kontrak khusus ini, kami berasumsi bahwa jumlah maksimum token yang ingin ditransfer oleh siapa pun muat dalam dua byte (kurang dari 65536).

```solidity
            );
        }
```

Secara keseluruhan, sebuah transfer memakan 35 byte calldata:

| Bagian          | Panjang |  Byte |
| --------------- | ------: | ----: |
| Selektor fungsi |       1 |     0 |
| Alamat tujuan   |      32 |  1-32 |
| Jumlah          |       2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Unit test JavaScript ini](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) menunjukkan kepada kita bagaimana menggunakan mekanisme ini (dan bagaimana memverifikasi bahwa ia bekerja dengan benar).
Saya akan berasumsi Anda memahami [chai](https://www.chaijs.com/) dan [ethers](https://docs.ethers.io/v5/) dan hanya menjelaskan bagian-bagian yang secara spesifik berlaku untuk kontrak.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Seharusnya memungkinkan kita menggunakan token", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Alamat Token:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("Alamat CalldataInterpreter:", cdi.address)

    const signer = await ethers.getSigner()
```

Kita mulai dengan melakukan deploy pada kedua kontrak.

```javascript
    // Dapatkan token untuk digunakan
    const faucetTx = {
```

Kita tidak dapat menggunakan fungsi tingkat tinggi yang biasanya kita gunakan (seperti `token.faucet()`) untuk membuat transaksi, karena kita tidak mengikuti ABI.
Sebaliknya, kita harus membangun transaksi sendiri dan kemudian mengirimkannya.

```javascript
      to: cdi.address,
      data: "0x01"
```

Ada dua parameter yang perlu kita sediakan untuk transaksi:

1. `to`, alamat tujuan.
   Ini adalah kontrak calldata interpreter.
2. `data`, calldata yang akan dikirim.
   Dalam kasus panggilan faucet, datanya adalah satu byte, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Kita memanggil [metode `sendTransaction` milik signer](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) karena kita sudah menentukan tujuan (`faucetTx.to`) dan kita perlu agar transaksi ditandatangani.

```javascript
// Periksa faucet menyediakan token dengan benar
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Di sini kita memverifikasi saldo.
Tidak perlu menghemat gas pada fungsi `view`, jadi kita jalankan saja secara normal.

```javascript
// Berikan alokasi pada CDI (persetujuan tidak dapat di-proksi)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Berikan alokasi pada calldata interpreter agar bisa melakukan transfer.

```javascript
// Transfer token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Buat transaksi transfer. Byte pertama adalah "0x02", diikuti oleh alamat tujuan, dan terakhir jumlahnya (0x0100, yang merupakan 256 dalam desimal).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Periksa bahwa kita memiliki 256 token lebih sedikit
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Dan tujuan kita menerimanya
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Mengurangi biaya ketika Anda mengontrol kontrak tujuan {#reducing-the-cost-when-you-do-control-the-destination-contract}

Jika Anda memiliki kontrol atas kontrak tujuan, Anda dapat membuat fungsi yang melewati pemeriksaan `msg.sender` karena mereka mempercayai calldata interpreter.
[Anda dapat melihat contoh cara kerjanya di sini, di cabang `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Jika kontrak hanya merespons transaksi eksternal, kita bisa menggunakan hanya satu kontrak.
Namun, itu akan merusak [komposabilitas](/developers/docs/smart-contracts/composability/).
Jauh lebih baik memiliki kontrak yang merespons panggilan ERC-20 normal, dan kontrak lain yang merespons transaksi dengan data panggilan singkat.

### Token.sol {#token-sol-2}

Dalam contoh ini kita dapat memodifikasi `Token.sol`.
Ini memungkinkan kita memiliki sejumlah fungsi yang hanya dapat dipanggil oleh proksi.
Berikut adalah bagian-bagian barunya:

```solidity
    // Satu-satunya alamat yang diizinkan untuk menentukan alamat CalldataInterpreter
    address owner;

    // Alamat CalldataInterpreter
    address proxy = address(0);
```

Kontrak ERC-20 perlu mengetahui identitas proksi yang berwenang.
Namun, kita tidak bisa mengatur variabel ini di konstruktor, karena kita belum tahu nilainya.
Kontrak ini diinstansiasi terlebih dahulu karena proksi mengharapkan alamat token dalam konstruktornya.

```solidity
    /**
     * @dev Memanggil konstruktor ERC20.
     */
    constructor(
    ) ERC20("Token Oris yang tidak berguna-2", "OUT-2") {
        owner = msg.sender;
    }
```

Alamat pembuat (disebut `owner`) disimpan di sini karena itu adalah satu-satunya alamat yang diizinkan untuk mengatur proksi.

```solidity
    /**
     * @dev Mengatur alamat untuk proksi (CalldataInterpreter).
     * Hanya bisa dipanggil sekali oleh pemilik
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Hanya dapat dipanggil oleh pemilik");
        require(proxy == address(0), "Proksi sudah diatur");

        proxy = _proxy;
    }    // function setProxy
```

Proksi memiliki akses istimewa, karena dapat melewati pemeriksaan keamanan.
Untuk memastikan kita bisa mempercayai proksi, kita hanya membiarkan `owner` memanggil fungsi ini, dan hanya sekali.
Setelah `proksi` memiliki nilai riil (bukan nol), nilai itu tidak dapat diubah, jadi bahkan jika pemilik memutuskan untuk berbuat jahat, atau mnemoniknya terungkap, kita masih aman.

```solidity
    /**
     * @dev Beberapa fungsi hanya dapat dipanggil oleh proksi.
     */
    modifier onlyProxy {
```

Ini adalah fungsi `modifier`, yang memodifikasi cara kerja fungsi lain.

```solidity
      require(msg.sender == proxy);
```

Pertama, verifikasi kita dipanggil oleh proksi dan bukan orang lain.
Jika tidak, `revert`.

```solidity
      _;
    }
```

Jika ya, jalankan fungsi yang kita modifikasi.

```solidity
   /* Fungsi-fungsi yang mengizinkan proxy untuk benar-benar menjadi proxy bagi akun */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

Ini adalah tiga operasi yang biasanya mengharuskan pesan datang langsung dari entitas yang mentransfer token atau menyetujui alokasi.
Di sini kita memiliki versi proksi dari operasi-operasi ini yang:

1. Dimodifikasi oleh `onlyProxy()` sehingga tidak ada orang lain yang diizinkan untuk mengontrolnya.
2. Mendapatkan alamat yang biasanya `msg.sender` sebagai parameter tambahan.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Interpreter calldata hampir identik dengan yang di atas, kecuali bahwa fungsi yang di-proksi menerima parameter `msg.sender` dan tidak perlu ada alokasi untuk `transfer`.

```solidity
        // transfer (tidak perlu alokasi)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

Ada beberapa perubahan antara kode pengujian sebelumnya dan yang ini.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Kita perlu memberitahu kontrak ERC-20 proksi mana yang harus dipercaya

```js
console.log("Alamat CalldataInterpreter:", cdi.address)

// Membutuhkan dua penanda tangan untuk memverifikasi alokasi
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Untuk memeriksa `approve()` dan `transferFrom()` kita memerlukan penanda tangan kedua.
Kami menyebutnya `poorSigner` karena tidak mendapatkan token kami (tentu saja, ia harus memiliki ETH).

```js
// Transfer token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Karena kontrak ERC-20 mempercayai proksi (`cdi`), kita tidak memerlukan alokasi untuk meneruskan transfer.

```js
// persetujuan dan transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Periksa kombinasi approve / transferFrom dilakukan dengan benar
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Uji dua fungsi baru.
Perhatikan bahwa `transferFromTx` memerlukan dua parameter alamat: pemberi alokasi dan penerima.

## Kesimpulan {#conclusion}

Baik [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) maupun [Arbitrum](https://developer.offchainlabs.com/docs/special_features) sedang mencari cara untuk mengurangi ukuran calldata yang ditulis ke L1 dan oleh karena itu biaya transaksi.
Namun, sebagai penyedia infrastruktur yang mencari solusi generik, kemampuan kami terbatas.
Sebagai pengembang dapp, Anda memiliki pengetahuan spesifik aplikasi, yang memungkinkan Anda mengoptimalkan calldata Anda jauh lebih baik daripada yang bisa kami lakukan dalam solusi generik.
Semoga artikel ini membantu Anda menemukan solusi ideal untuk kebutuhan Anda.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).

