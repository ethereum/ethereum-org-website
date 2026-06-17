---
title: Cara Menyiapkan Tellor sebagai Orakel Anda
description: Panduan untuk mulai mengintegrasikan orakel Tellor ke dalam protokol Anda
author: "Tellor"
lang: id
tags: ["Solidity", "kontrak pintar", "orakel"]
skill: beginner
breadcrumb: Orakel Tellor
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Kuis Singkat: Protokol Anda hampir selesai, tetapi membutuhkan orakel untuk mendapatkan akses ke data offchain... Apa yang Anda lakukan?

## Prasyarat (Ringan) {#soft-prerequisites}

Postingan ini bertujuan untuk membuat akses ke feed orakel menjadi sesederhana dan semudah mungkin. Meskipun demikian, kami mengasumsikan hal-hal berikut tentang tingkat keahlian coding Anda agar dapat berfokus pada aspek orakel.

Asumsi:

- Anda dapat menavigasi terminal
- Anda telah menginstal npm
- Anda tahu cara menggunakan npm untuk mengelola dependensi

Tellor adalah orakel live dan open-source yang siap untuk diimplementasikan. Panduan pemula ini hadir untuk menunjukkan betapa mudahnya memulai dan menjalankan Tellor, yang menyediakan orakel yang sepenuhnya terdesentralisasi dan tahan sensor untuk proyek Anda.

## Gambaran Umum {#overview}

Tellor adalah sistem orakel di mana para pihak dapat meminta nilai dari titik data offchain (misalnya, BTC/USD) dan pelapor bersaing untuk menambahkan nilai ini ke bank data onchain, yang dapat diakses oleh semua kontrak pintar Ethereum. Input ke bank data ini diamankan oleh jaringan pelapor yang melakukan stake. Tellor memanfaatkan mekanisme insentif ekonomi kripto, memberikan imbalan atas pengiriman data yang jujur oleh pelapor dan menghukum pelaku kejahatan melalui penerbitan token Tellor, Tributes (TRB), dan mekanisme sengketa.

Dalam tutorial ini kita akan membahas:

- Menyiapkan toolkit awal yang Anda perlukan untuk memulai dan menjalankannya.
- Mempelajari contoh sederhana.
- Membuat daftar alamat testnet dari jaringan tempat Anda dapat menguji Tellor saat ini.

## UsingTellor {#usingtellor}

Hal pertama yang ingin Anda lakukan adalah menginstal alat dasar yang diperlukan untuk menggunakan Tellor sebagai orakel Anda. Gunakan [paket ini](https://github.com/tellor-io/usingtellor) untuk menginstal Kontrak Pengguna Tellor:

`npm install usingtellor`

Setelah diinstal, ini akan memungkinkan kontrak Anda untuk mewarisi fungsi dari kontrak 'UsingTellor'.

Bagus! Sekarang setelah Anda menyiapkan alatnya, mari kita lakukan latihan sederhana di mana kita mengambil harga bitcoin:

### Contoh BTC/USD {#btcusd-example}

Warisi kontrak UsingTellor, dengan meneruskan alamat Tellor sebagai argumen konstruktor:

Berikut adalah contohnya:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Kontrak ini sekarang memiliki akses ke semua fungsi di UsingTellor

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

Untuk daftar lengkap alamat kontrak, rujuk [di sini](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Untuk kemudahan penggunaan, repo UsingTellor dilengkapi dengan versi kontrak [Tellor Playground](https://github.com/tellor-io/TellorPlayground) untuk integrasi yang lebih mudah. Lihat [di sini](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) untuk daftar fungsi yang berguna.

Untuk implementasi orakel Tellor yang lebih tangguh, lihat daftar lengkap fungsi yang tersedia [di sini](https://github.com/tellor-io/usingtellor/blob/master/README.md).