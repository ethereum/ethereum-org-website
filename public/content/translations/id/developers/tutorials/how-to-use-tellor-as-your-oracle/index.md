---
title: Cara Menyiapkan Tellor sebagai Oracle Anda
description: Sebuah panduan untuk memulai mengintegrasikan oracle Tellor ke dalam protokol Anda
author: "Tellor"
lang: id
tags:
  - "solidity"
  - "kontrak pintar"
  - "feed harga"
  - "oracle"
skill: beginner
published: 2021-06-29
source: Dokumen Tellor
sourceUrl: https://docs.tellor.io/tellor/
---

Pop Quiz: Your protocol is just about finished, but it needs an oracle to get access to off chain data...What do you do?

## Prasyarat (perangkat lunak) {#soft-prerequisites}

Posting ini bertujuan untuk membuat akses ke feed oracle semudah dan sesederhana mungkin. Oleh karena itu, kami menggangap yang berikut ini kira - kira adalah tingkat kemahiran pengodean Anda untuk berfokus pada aspek oracle.

Asumsi:

- Anda dapat menavigasikan suatu terminal
- Anda memiliki npm yang telah terinstal
- Anda mengetahui cara menggunakan npm untuk mengelola dependensi

Tellor adalah oracle sumber terbuka dan langsung yang siap untuk diimplementasikan. Panduan pemula ini ada untuk menampilkan kemudahan yang dengannya seseorang dapat memulai dan menjalankan Tellor, yang menyediakan proyek Anda dengan oracle yang sepenuhnya terdesentralisasi dan tahan penyensoran.

## Gambaran umum {#overview}

Tellor is an oracle system where parties can request the value of an off-chain data point (e.g. BTC/USD) and reporters compete to add this value to an on-chain data-bank, accessible by all Ethereum smart contracts. The inputs to this data-bank are secured by a network of staked reporters. Tellor utilizes crypto-economic incentive mechanisms, rewarding honest data submissions by reporters and punishing bad actors through the issuance of Tellor’s token, Tributes (TRB) and a dispute mechanism.

Dalam tutorial ini, kita akan membahas:

- Menyiapkan toolkit awal yang akan Anda butuhkan untuk memulai dan menjalankannya.
- Membahas suatu contoh sederhana.
- Merinci alamat testnet jaringan yang dapat Anda gunakan untuk menguji Tellor saat ini.

## Menggunakan Tellor {#usingtellor}

Hal pertama yang akan ingin Anda lakukan adalah menginstal perangkat dasar yang diperlukan untuk menggunakan Tellor sebagai oracle Anda. Use [this package](https://github.com/tellor-io/usingtellor) to install the Tellor User Contracts:

`npm install usingtellor`

Setelah diinstal, ini akan memungkinkan kontrak Anda untuk mewarisi fungsi dari kontrak 'UsingTellor'.

Bagus! Now that you've got the tools ready, let's go through a simple exercise where we retrieve the bitcoin price:

### Contoh BTC/USD {#btcusd-example}

Wariskan kontrak UsingTellor, yang meneruskan alamat Tellor sebagai argumen konstruktor:

Berikut contohnya:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract BtcPriceContract is UsingTellor {

  //This Contract now has access to all functions in UsingTellor

  bytes btcPrice;
  bytes32 btcQueryId = 0x0000000000000000000000000000000000000000000000000000000000000002;

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {
    bool _didGet;
    uint256 _timestamp;

    (_didGet, btcPrice, _timestamp) = getCurrentValue(btcQueryId);
  }
}
```

**Want to try a different data feed? Check out the list of supported data feeds here: [Current Data Feeds](https://docs.tellor.io/tellor/integration/data-feed-ids)**

## Alamat: {#addresses}

Mainnet: [`0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0`](https://etherscan.io/address/0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0#code)

### Ingin melakukan beberapa pengujian terlebih dahulu? Lihat daftar di bawah untuk alamat testnet aktif kami: {#looking-to-do-some-testing-first-see-the-list-below-for-our-active-testnet-addresses}

Rinkeby: [`0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0`](https://rinkeby.etherscan.io/address/0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0#code)

Kovan: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://kovan.etherscan.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

Ropsten: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://ropsten.etherscan.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

Goerli: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://goerli.etherscan.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

BSC Testnet: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://testnet.bscscan.com/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

Polygon Mumbai Testnet: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://mumbai.polygonscan.com/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7/contracts#code)

Arbitrum Testnet: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://rinkeby-explorer.arbitrum.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7)

### Untuk implementasi yang lebih kuat pada oracle Tellor, lihat daftar lengkap fungsi yang tersedia [di sini.](https://github.com/tellor-io/usingtellor/blob/master/README.md) {#for-a-more-robust-implementation-of-the-tellor-oracle-check-out-the-full-list-of-available-functions-here}
