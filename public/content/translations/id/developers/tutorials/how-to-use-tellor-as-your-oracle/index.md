---
title: Cara Menyiapkan Tellor sebagai Oracle Anda
description: Panduan untuk memulai pengintegrasian oracle Tellor ke dalam protokol Anda
author: "Tellor"
lang: id
tags: [ "Solidity", "kontrak pintar", "oracle" ]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Kuis Pop: Protokol Anda hampir selesai, tetapi memerlukan oracle untuk mendapatkan akses ke data off-chain... Apa yang Anda lakukan?

## (Prasyarat Tidak Wajib) {#soft-prerequisites}

Postingan ini bertujuan untuk membuat akses ke feed oracle sesederhana dan semudah mungkin. Meskipun begitu, kami mengasumsikan hal berikut mengenai tingkat keahlian pengodean Anda untuk fokus pada aspek oracle.

Asumsi:

- Anda dapat menavigasi terminal
- Anda sudah menginstal npm
- Anda tahu cara menggunakan npm untuk mengelola dependensi

Tellor adalah oracle sumber terbuka dan aktif yang siap untuk diimplementasikan. Panduan pemula ini hadir untuk menunjukkan betapa mudahnya seseorang dapat memulai dan menjalankan Tellor, menyediakan proyek Anda oracle yang sepenuhnya terdesentralisasi dan tahan sensor.

## Overview {#overview}

Tellor adalah sistem oracle tempat para pihak dapat meminta nilai dari titik data di luar rantai (misalnya, BTC/USD) dan para pelapor bersaing untuk menambahkan nilai ini ke bank data di dalam rantai, yang dapat diakses oleh semua kontrak pintar Ethereum. Masukan ke bank data ini diamankan oleh jaringan reporter yang di-stake. Tellor menggunakan mekanisme insentif kripto-ekonomi, memberi imbalan atas pengiriman data yang jujur oleh reporter dan menghukum pelaku jahat melalui penerbitan token Tellor, Tributes (TRB), dan mekanisme sengketa.

Dalam tutorial ini kita akan membahas:

- Menyiapkan perangkat awal yang Anda perlukan untuk memulai dan menjalankannya.
- Membahas contoh sederhana.
- Mendaftar alamat testnet dari jaringan tempat Anda saat ini dapat menguji Tellor.

## Menggunakan Tellor {#usingtellor}

Hal pertama yang ingin Anda lakukan adalah menginstal alat-alat dasar yang diperlukan untuk menggunakan Tellor sebagai oracle Anda. Gunakan [paket ini](https://github.com/tellor-io/usingtellor) untuk menginstal Kontrak Pengguna Tellor:

`npm install usingtellor`

Setelah diinstal, ini akan memungkinkan kontrak Anda untuk mewarisi fungsi dari kontrak 'UsingTellor'.

Bagus! Sekarang setelah Anda menyiapkan peralatannya, mari kita lakukan latihan sederhana tempat kita mengambil harga bitcoin:

### Contoh BTC/USD {#btcusd-example}

Wariskan kontrak UsingTellor, dengan meneruskan alamat Tellor sebagai argumen konstruktor:

Berikut contohnya:

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

Untuk kemudahan penggunaan, repo UsingTellor dilengkapi dengan versi kontrak [Tellor Playground](https://github.com/tellor-io/TellorPlayground) untuk integrasi yang lebih mudah. Lihat [di sini](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) untuk daftar fungsi yang bermanfaat.

Untuk implementasi oracle Tellor yang lebih kuat, periksa daftar lengkap fungsi yang tersedia [di sini](https://github.com/tellor-io/usingtellor/blob/master/README.md).
