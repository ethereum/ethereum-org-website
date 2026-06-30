---
title: "ABI Pendek untuk Optimasi Calldata"
description: Mengoptimalkan kontrak pintar untuk Optimistic Rollup
author: Ori Pomerantz
lang: id
tags: ["lapisan 2 (l2)"]
skill: intermediate
breadcrumb: ABI Pendek
published: 2022-04-01
---

## Pengantar {#introduction}

Dalam artikel ini, Anda akan belajar tentang [optimistic rollup](/developers/docs/scaling/optimistic-rollups), biaya transaksi di dalamnya, dan bagaimana struktur biaya yang berbeda tersebut mengharuskan kita untuk mengoptimalkan hal-hal yang berbeda dibandingkan di Mainnet Ethereum.
Anda juga akan belajar cara mengimplementasikan optimasi ini.

### Pengungkapan penuh {#full-disclosure}

Saya adalah karyawan purnawaktu [Optimism](https://www.optimism.io/), jadi contoh-contoh dalam artikel ini akan dijalankan di Optimism.
Namun, teknik yang dijelaskan di sini seharusnya berfungsi sama baiknya untuk rollup lainnya.

### Terminologi {#terminology}

Saat membahas rollup, istilah 'lapisan 1 (l1)' digunakan untuk Mainnet, jaringan produksi Ethereum.
Istilah 'lapisan 2 (l2)' digunakan untuk rollup atau sistem lain apa pun yang bergantung pada l1 untuk keamanan tetapi melakukan sebagian besar pemrosesannya secara offchain.

## Bagaimana kita dapat lebih mengurangi biaya transaksi l2? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Optimistic rollup](/developers/docs/scaling/optimistic-rollups) harus menyimpan catatan setiap transaksi historis sehingga siapa pun dapat memeriksanya dan memverifikasi bahwa state saat ini sudah benar.
Cara termurah untuk memasukkan data ke Mainnet Ethereum adalah dengan menulisnya sebagai calldata.
Solusi ini dipilih oleh [Optimism](https://docs.optimism.io/op-stack/protocol/overview) maupun [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction).

### Biaya transaksi l2 {#cost-of-l2-transactions}

Biaya transaksi l2 terdiri dari dua komponen:

1. Pemrosesan l2, yang biasanya sangat murah
2. Penyimpanan l1, yang terikat dengan biaya gas Mainnet

Saat saya menulis ini, di Optimism biaya gas l2 adalah 0,001 [Gwei](/developers/docs/gas/#pre-london).
Di sisi lain, biaya gas l1 adalah sekitar 40 Gwei.
[Anda dapat melihat harga saat ini di sini](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Satu bita calldata memakan biaya 4 gas (jika bernilai nol) atau 16 gas (jika bernilai lainnya).
Salah satu operasi paling mahal di EVM adalah menulis ke penyimpanan.
Biaya maksimum untuk menulis kata 32-bita ke penyimpanan di l2 adalah 22.100 gas. Saat ini, nilainya adalah 22,1 Gwei.
Jadi, jika kita dapat menghemat satu bita nol calldata, kita akan dapat menulis sekitar 200 bita ke penyimpanan dan tetap untung.

### ABI {#the-abi}

Sebagian besar transaksi mengakses sebuah kontrak dari akun yang dimiliki secara eksternal (externally-owned account).
Sebagian besar kontrak ditulis dalam Solidity dan menafsirkan bidang datanya sesuai dengan [antarmuka biner aplikasi (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Namun, ABI dirancang untuk l1, di mana satu bita calldata memakan biaya yang kira-kira sama dengan empat operasi aritmatika, bukan l2 di mana satu bita calldata memakan biaya lebih dari seribu operasi aritmatika.
Calldata dibagi seperti ini:

| Bagian | Panjang | Bita | Bita terbuang | Gas terbuang | Bita yang diperlukan | Gas yang diperlukan |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Pemilih fungsi | 4 | 0-3 | 3 | 48 | 1 | 16 |
| Nol | 12 | 4-15 | 12 | 48 | 0 | 0 |
| Alamat tujuan | 20 | 16-35 | 0 | 0 | 20 | 320 |
| Jumlah | 32 | 36-67 | 17 | 64 | 15 | 240 |
| Total | 68 | | | 160 | | 576 |

Penjelasan:

- **Pemilih fungsi**: Kontrak memiliki kurang dari 256 fungsi, jadi kita dapat membedakannya dengan satu bita.
  Bita-bita ini biasanya bukan nol dan oleh karena itu [memakan biaya enam belas gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Nol**: Bita-bita ini selalu nol karena alamat dua puluh bita tidak memerlukan kata tiga puluh dua bita untuk menyimpannya.
  Bita yang menyimpan nol memakan biaya empat gas ([lihat kertas kuning](https://ethereum.github.io/yellowpaper/paper.pdf), Lampiran G,
  hlm. 27, nilai untuk `G`<sub>`txdatazero`</sub>).
- **Jumlah**: Jika kita berasumsi bahwa dalam kontrak ini `decimals` adalah delapan belas (nilai normal) dan jumlah maksimum token yang kita transfer adalah 10<sup>18</sup>, kita mendapatkan jumlah maksimum 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, jadi lima belas bita sudah cukup.

Pemborosan 160 gas di l1 biasanya dapat diabaikan. Sebuah transaksi memakan biaya setidaknya [21.000 gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), jadi tambahan 0,8% tidak menjadi masalah.
Namun, di l2, situasinya berbeda. Hampir seluruh biaya transaksi adalah untuk menulisnya ke l1.
Selain calldata transaksi, terdapat 109 bita header transaksi (alamat tujuan, tanda tangan, dll.).
Oleh karena itu, total biayanya adalah `109*16+576+160=2480`, dan kita membuang sekitar 6,5% dari jumlah tersebut.

## Mengurangi biaya saat Anda tidak mengendalikan tujuan {#reducing-costs-when-you-dont-control-the-destination}

Dengan asumsi bahwa Anda tidak memiliki kendali atas kontrak tujuan, Anda masih dapat menggunakan solusi yang mirip dengan [ini](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Mari kita bahas berkas-berkas yang relevan.

### Token.sol {#token-sol}

[Ini adalah kontrak tujuan](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Ini adalah kontrak ERC-20 standar, dengan satu fitur tambahan.
Fungsi `faucet` ini memungkinkan pengguna mana pun untuk mendapatkan sejumlah token untuk digunakan.
Ini akan membuat kontrak ERC-20 produksi menjadi tidak berguna, tetapi ini mempermudah pekerjaan ketika ERC-20 hanya ada untuk memfasilitasi pengujian.

```solidity
    /**
     * @dev Memberikan pemanggil 1000 token untuk dimainkan
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Ini adalah kontrak yang seharusnya dipanggil oleh transaksi dengan calldata yang lebih pendek](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Mari kita bahas baris demi baris.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Kita memerlukan fungsi token untuk mengetahui cara memanggilnya.

```solidity
kontrak CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Alamat token di mana kita bertindak sebagai proksi.

```solidity

    /**
     * @dev Menentukan alamat token
     * @param tokenAddr_ alamat kontrak ERC-20
     */
    konstruktor(
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
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Kita akan memuat satu kata 32-bita (256-bit) ke memori dan menghapus bita yang bukan bagian dari bidang yang kita inginkan.
Algoritma ini tidak berfungsi untuk nilai yang lebih panjang dari 32 bita, dan tentu saja kita tidak dapat membaca melewati akhir calldata.
Di l1 mungkin perlu untuk melewati pengujian ini guna menghemat gas, tetapi di l2 gas sangat murah, yang memungkinkan pemeriksaan kewarasan (sanity check) apa pun yang dapat kita pikirkan.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Kita bisa saja menyalin data dari panggilan ke `fallback()` (lihat di bawah), tetapi lebih mudah menggunakan [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), bahasa rakitan (assembly) dari EVM.

Di sini kita menggunakan [opcode CALLDATALOAD](https://www.evm.codes/#35) untuk membaca bita `startByte` hingga `startByte+31` ke dalam tumpukan (stack).
Secara umum, sintaksis opcode di Yul adalah `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Hanya bita `length` paling signifikan yang merupakan bagian dari bidang tersebut, jadi kita melakukan [geser kanan (right-shift)](https://en.wikipedia.org/wiki/Logical_shift) untuk menyingkirkan nilai lainnya.
Ini memiliki keuntungan tambahan yaitu memindahkan nilai ke sebelah kanan bidang, sehingga menjadi nilai itu sendiri alih-alih nilai dikali 256<sup>sesuatu</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Ketika panggilan ke kontrak Solidity tidak cocok dengan tanda tangan fungsi mana pun, ia memanggil [fungsi `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (dengan asumsi fungsi tersebut ada).
Dalam kasus `CalldataInterpreter`, _apa pun_ panggilan akan masuk ke sini karena tidak ada fungsi `external` atau `public` lainnya.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Membaca bita pertama dari calldata, yang memberi tahu kita fungsinya.
Ada dua alasan mengapa sebuah fungsi tidak tersedia di sini:

1. Fungsi yang bersifat `pure` atau `view` tidak mengubah state dan tidak memakan biaya gas (saat dipanggil secara offchain).
   Tidak masuk akal untuk mencoba mengurangi biaya gasnya.
2. Fungsi yang bergantung pada [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Nilai `msg.sender` akan menjadi alamat `CalldataInterpreter`, bukan pemanggilnya.

Sayangnya, [melihat spesifikasi ERC-20](https://eips.ethereum.org/EIPS/eip-20), ini hanya menyisakan satu fungsi, `transfer`.
Ini hanya menyisakan dua fungsi bagi kita: `transfer` (karena kita dapat memanggil `transferFrom`) dan `faucet` (karena kita dapat mentransfer token kembali ke siapa pun yang memanggil kita).

```solidity

        // Memanggil metode pengubah state dari token menggunakan
        // informasi dari data panggilan

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
EOA (akun yang dimiliki secara eksternal) atau kontrak yang memanggil kitalah yang membutuhkannya.
Jadi kita mentransfer semua token kita ke siapa pun yang memanggil kita.

```solidity
        // transfer (asumsikan kita memiliki jatah untuk itu)
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

Alamat tujuan dimulai pada bita #1 (bita #0 adalah fungsi).
Sebagai sebuah alamat, panjangnya adalah 20 bita.

```solidity
                calldataVal(21, 2)
```

Untuk kontrak khusus ini, kita berasumsi bahwa jumlah maksimum token yang ingin ditransfer oleh siapa pun muat dalam dua bita (kurang dari 65536).

```solidity
            );
        }
```

Secara keseluruhan, sebuah transfer membutuhkan 35 bita calldata:

| Bagian | Panjang | Bita |
| ------------------- | -----: | ----: |
| Pemilih fungsi | 1 | 0 |
| Alamat tujuan | 32 | 1-32 |
| Jumlah | 2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Pengujian unit JavaScript ini](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) menunjukkan kepada kita cara menggunakan mekanisme ini (dan cara memverifikasi bahwa mekanisme ini berfungsi dengan benar).
Saya akan berasumsi bahwa Anda memahami [chai](https://www.chaijs.com/) dan [ethers](https://docs.ethers.io/v5/) dan hanya menjelaskan bagian-bagian yang secara khusus berlaku untuk kontrak tersebut.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Kita mulai dengan men-deploy kedua kontrak.

```javascript
    // Dapatkan token untuk dimainkan
    const faucetTx = {
```

Kita tidak dapat menggunakan fungsi tingkat tinggi yang biasanya kita gunakan (seperti `token.faucet()`) untuk membuat transaksi, karena kita tidak mengikuti ABI.
Sebaliknya, kita harus membangun transaksi itu sendiri dan kemudian mengirimkannya.

```javascript
      to: cdi.address,
      data: "0x01"
```

Ada dua parameter yang perlu kita sediakan untuk transaksi:

1. `to`, alamat tujuan.
   Ini adalah kontrak penerjemah calldata.
2. `data`, calldata yang akan dikirim.
   Dalam kasus panggilan faucet, datanya adalah satu bita, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Kita memanggil [metode `sendTransaction` milik penandatangan](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) karena kita sudah menentukan tujuan (`faucetTx.to`) dan kita memerlukan transaksi tersebut untuk ditandatangani.

```javascript
// Periksa apakah faucet menyediakan token dengan benar
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Di sini kita memverifikasi saldonya.
Tidak perlu menghemat gas pada fungsi `view`, jadi kita menjalankannya secara normal saja.

```javascript
// Beri CDI jatah (persetujuan tidak dapat diproksikan)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Berikan jatah kepada penerjemah calldata agar dapat melakukan transfer.

```javascript
// Transfer token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Buat transaksi transfer. Bita pertama adalah "0x02", diikuti oleh alamat tujuan, dan terakhir jumlahnya (0x0100, yang merupakan 256 dalam desimal).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Periksa apakah kita memiliki 256 token lebih sedikit
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Dan tujuan kita mendapatkannya
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Mengurangi biaya saat Anda mengendalikan kontrak tujuan {#reducing-the-cost-when-you-do-control-the-destination-contract}

Jika Anda memiliki kendali atas kontrak tujuan, Anda dapat membuat fungsi yang melewati pemeriksaan `msg.sender` karena fungsi tersebut memercayai penerjemah calldata.
[Anda dapat melihat contoh cara kerjanya di sini, di cabang `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Jika kontrak hanya merespons transaksi eksternal, kita bisa bertahan dengan hanya memiliki satu kontrak.
Namun, hal itu akan merusak [komposabilitas](/developers/docs/smart-contracts/composability/).
Jauh lebih baik memiliki kontrak yang merespons panggilan ERC-20 normal, dan kontrak lain yang merespons transaksi dengan data panggilan pendek.

### Token.sol {#token-sol-2}

Dalam contoh ini kita dapat memodifikasi `Token.sol`.
Ini memungkinkan kita memiliki sejumlah fungsi yang hanya boleh dipanggil oleh proksi.
Berikut adalah bagian-bagian barunya:

```solidity
    // Satu-satunya alamat yang diizinkan untuk menentukan alamat CalldataInterpreter
    address owner;

    // Alamat CalldataInterpreter
    address proxy = address(0);
```

Kontrak ERC-20 perlu mengetahui identitas proksi yang diotorisasi.
Namun, kita tidak dapat mengatur variabel ini di konstruktor, karena kita belum mengetahui nilainya.
Kontrak ini diinstansiasi terlebih dahulu karena proksi mengharapkan alamat token di konstruktornya.

```solidity
    /**
     * @dev Memanggil konstruktor ERC20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Alamat pembuat (disebut `owner`) disimpan di sini karena itu adalah satu-satunya alamat yang diizinkan untuk mengatur proksi.

```solidity
    /**
     * @dev menetapkan alamat untuk proksi (CalldataInterpreter).
     * Hanya dapat dipanggil sekali oleh pemilik
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Proksi memiliki akses istimewa, karena dapat melewati pemeriksaan keamanan.
Untuk memastikan kita dapat memercayai proksi, kita hanya membiarkan `owner` memanggil fungsi ini, dan hanya sekali.
Setelah `proxy` memiliki nilai nyata (bukan nol), nilai tersebut tidak dapat berubah, jadi meskipun pemiliknya memutuskan untuk berbuat jahat, atau mnemoniknya terungkap, kita tetap aman.

```solidity
    /**
     * @dev Beberapa fungsi mungkin hanya dapat dipanggil oleh proksi.
     */
    modifier onlyProxy {
```

Ini adalah [fungsi `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), yang memodifikasi cara kerja fungsi lainnya.

```solidity
      require(msg.sender == proxy);
```

Pertama, verifikasi bahwa kita dipanggil oleh proksi dan bukan oleh pihak lain.
Jika tidak, `revert`.

```solidity
      _;
    }
```

Jika ya, jalankan fungsi yang kita modifikasi.

```solidity
   /* Fungsi yang memungkinkan proksi untuk benar-benar menjadi proksi bagi akun */

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

Ini adalah tiga operasi yang biasanya mengharuskan pesan datang langsung dari entitas yang mentransfer token atau menyetujui jatah.
Di sini kita memiliki versi proksi dari operasi-operasi ini yang:

1. Dimodifikasi oleh `onlyProxy()` sehingga tidak ada orang lain yang diizinkan untuk mengendalikannya.
2. Mendapatkan alamat yang biasanya berupa `msg.sender` sebagai parameter tambahan.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Penerjemah calldata hampir identik dengan yang di atas, kecuali bahwa fungsi yang diproksikan menerima parameter `msg.sender` dan tidak diperlukan jatah untuk `transfer`.

```solidity
        // transfer (tidak perlu jatah)
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

Kita perlu memberi tahu kontrak ERC-20 proksi mana yang harus dipercaya

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Butuh dua penandatangan untuk memverifikasi jatah
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Untuk memeriksa `approve()` dan `transferFrom()` kita memerlukan penandatangan kedua.
Kita menyebutnya `poorSigner` karena ia tidak mendapatkan token kita sama sekali (tentu saja ia harus memiliki ETH).

```js
// Transfer token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Karena kontrak ERC-20 memercayai proksi (`cdi`), kita tidak memerlukan jatah untuk meneruskan transfer.

```js
// approval dan transferFrom
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

// Periksa apakah kombo approve / transferFrom dilakukan dengan benar
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Uji dua fungsi baru tersebut.
Perhatikan bahwa `transferFromTx` memerlukan dua parameter alamat: pemberi jatah dan penerima.

## Kesimpulan {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) maupun [Arbitrum](https://developer.offchainlabs.com/docs/special_features) sedang mencari cara untuk mengurangi ukuran calldata yang ditulis ke l1 dan dengan demikian mengurangi biaya transaksi.
Namun, sebagai penyedia infrastruktur yang mencari solusi generik, kemampuan kami terbatas.
Sebagai pengembang dapp, Anda memiliki pengetahuan khusus aplikasi, yang memungkinkan Anda mengoptimalkan calldata Anda jauh lebih baik daripada yang bisa kami lakukan dalam solusi generik.
Semoga artikel ini membantu Anda menemukan solusi ideal untuk kebutuhan Anda.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).
