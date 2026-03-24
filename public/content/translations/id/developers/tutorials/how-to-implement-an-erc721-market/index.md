---
title: Cara mengimplementasikan pasar ERC-721
description: Cara menempatkan barang yang ditokenisasi untuk dijual di papan iklan baris terdesentralisasi
author: "Alberto Cuesta Cañada"
tags: ["kontrak pintar", "erc-721", "Solidity", "token"]
skill: intermediate
breadcrumb: "Pasar ERC-721"
lang: id
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Dalam artikel ini, saya akan menunjukkan kepada Anda cara memprogram Craigslist untuk blockchain Ethereum.

Sebelum Gumtree, Ebay, dan Craigslist, papan iklan baris sebagian besar terbuat dari gabus atau kertas. Ada papan iklan baris di koridor sekolah, surat kabar, lampu jalan, dan etalase toko.

Semua itu berubah dengan adanya internet. Jumlah orang yang dapat melihat papan iklan baris tertentu berlipat ganda hingga beberapa kali lipat. Dengan itu, pasar yang mereka wakili menjadi jauh lebih efisien dan berskala global. Ebay adalah bisnis besar yang menelusuri asal-usulnya dari papan iklan baris fisik ini.

Dengan blockchain, pasar-pasar ini akan berubah sekali lagi, izinkan saya menunjukkan caranya.

## Monetisasi {#monetization}

Model bisnis dari papan iklan baris blockchain publik harus berbeda dari Ebay dan perusahaannya.

Pertama, ada [sudut pandang desentralisasi](/developers/docs/web2-vs-web3/). Platform yang ada perlu memelihara server mereka sendiri. Platform terdesentralisasi dipelihara oleh penggunanya, sehingga biaya menjalankan platform inti turun menjadi nol bagi pemilik platform.

Kemudian ada front end, situs web atau antarmuka yang memberikan akses ke platform. Di sini ada banyak pilihan. Pemilik platform dapat membatasi akses dan memaksa semua orang untuk menggunakan antarmuka mereka, dengan mengenakan biaya. Pemilik platform juga dapat memutuskan untuk membuka akses (Kekuatan untuk Rakyat!) dan membiarkan siapa saja membangun antarmuka ke platform. Atau pemilik dapat memutuskan pendekatan apa pun di tengah-tengah ekstrem tersebut.

_Pemimpin bisnis dengan visi yang lebih dari saya akan tahu cara memonetisasi ini. Yang saya lihat hanyalah bahwa ini berbeda dari status quo dan mungkin menguntungkan._

Selain itu, ada sudut pandang otomatisasi dan pembayaran. Beberapa hal dapat [ditokenisasi dengan sangat efektif](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) dan diperdagangkan di papan iklan baris. Aset yang ditokenisasi mudah ditransfer dalam blockchain. Metode pembayaran yang sangat kompleks dapat dengan mudah diimplementasikan dalam blockchain.

Saya hanya mencium peluang bisnis di sini. Papan iklan baris tanpa biaya operasional dapat dengan mudah diimplementasikan, dengan jalur pembayaran kompleks yang disertakan dalam setiap transaksi. Saya yakin seseorang akan menemukan ide tentang untuk apa ini digunakan.

Saya hanya senang membangunnya. Mari kita lihat kodenya.

## Implementasi {#implementation}

Beberapa waktu lalu kami memulai [repositori sumber terbuka](https://github.com/HQ20/contracts?ref=hackernoon.com) dengan contoh implementasi kasus bisnis dan hal-hal menarik lainnya, silakan lihat.

Kode untuk [Papan Iklan Baris Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) ini ada di sana, silakan gunakan dan manfaatkan. Hanya saja, perlu disadari bahwa kode tersebut belum diaudit dan Anda perlu melakukan uji tuntas sendiri sebelum memasukkan uang ke dalamnya.

Dasar-dasar papan ini tidaklah rumit. Semua iklan di papan hanya akan berupa struct dengan beberapa bidang:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled // Terbuka, Dieksekusi, Dibatalkan
}
```

Jadi ada seseorang yang memposting iklan. Sebuah barang untuk dijual. Harga untuk barang tersebut. Status perdagangan yang bisa terbuka, dieksekusi, atau dibatalkan.

Semua perdagangan ini akan disimpan dalam sebuah pemetaan (mapping). Karena segala sesuatu di Solidity tampaknya berupa pemetaan. Juga karena ini nyaman.

```solidity
mapping(uint256 => Trade) public trades;
```

Menggunakan pemetaan hanya berarti bahwa kita harus membuat id untuk setiap iklan sebelum mempostingnya, dan kita perlu mengetahui id dari sebuah iklan sebelum kita dapat mengoperasikannya. Ada beberapa cara untuk menangani ini baik di kontrak pintar maupun di front-end. Silakan bertanya jika Anda memerlukan beberapa petunjuk.

Selanjutnya muncul pertanyaan tentang apa barang-barang yang kita tangani ini, dan apa mata uang yang digunakan untuk membayar transaksi ini.

Untuk barang-barang tersebut, kita hanya akan meminta agar mereka mengimplementasikan antarmuka [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), yang sebenarnya hanyalah cara untuk merepresentasikan barang-barang dunia nyata dalam blockchain, meskipun ini [berfungsi paling baik dengan aset digital](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Kita akan menentukan kontrak ERC-721 kita sendiri di konstruktor, yang berarti bahwa setiap aset di papan iklan baris kita harus telah ditokenisasi sebelumnya.

Untuk pembayaran, kita akan melakukan hal yang serupa. Sebagian besar proyek blockchain mendefinisikan mata uang kripto [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) mereka sendiri. Beberapa yang lain lebih suka menggunakan yang umum seperti DAI. Di papan iklan baris ini, Anda hanya perlu memutuskan pada saat konstruksi apa mata uang Anda nantinya. Mudah.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Kita hampir sampai. Kita punya iklan, barang untuk diperdagangkan, dan mata uang untuk pembayaran. Membuat iklan berarti menempatkan barang di escrow untuk menunjukkan bahwa Anda memilikinya dan bahwa Anda belum mempostingnya dua kali, mungkin di papan yang berbeda.

Kode di bawah ini melakukan hal tersebut. Menempatkan barang di escrow, membuat iklan, melakukan beberapa pembersihan.

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

Menerima perdagangan berarti memilih iklan (perdagangan), membayar harganya, menerima barangnya. Kode di bawah ini mengambil sebuah perdagangan. Memeriksa ketersediaannya. Membayar barang tersebut. Mengambil barang tersebut. Memperbarui iklan.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Terakhir, kita memiliki opsi bagi penjual untuk mundur dari perdagangan sebelum pembeli menerimanya. Dalam beberapa model, iklan justru akan tayang selama jangka waktu tertentu sebelum kedaluwarsa. Pilihan Anda, tergantung pada desain pasar Anda.

Kodenya sangat mirip dengan yang digunakan untuk mengeksekusi perdagangan, hanya saja tidak ada mata uang yang berpindah tangan dan barang tersebut kembali ke pembuat iklan.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

Itu saja. Anda berhasil mencapai akhir implementasi. Cukup mengejutkan betapa ringkasnya beberapa konsep bisnis ketika diekspresikan dalam kode, dan ini adalah salah satu kasus tersebut. Periksa kontrak lengkapnya [di repo kami](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Kesimpulan {#conclusion}

Papan iklan baris adalah konfigurasi pasar umum yang berskala besar dengan adanya internet, menjadi model bisnis yang sangat populer dengan beberapa pemenang monopolistik.

Papan iklan baris juga kebetulan merupakan alat yang mudah untuk direplikasi dalam lingkungan blockchain, dengan fitur-fitur yang sangat spesifik yang akan memungkinkan tantangan terhadap raksasa yang ada.

Dalam artikel ini, saya mencoba menjembatani realitas bisnis dari bisnis papan iklan baris dengan implementasi teknologinya. Pengetahuan ini akan membantu Anda untuk menciptakan visi dan peta jalan untuk implementasi jika Anda memiliki keterampilan yang tepat.

Seperti biasa, jika Anda ingin membangun sesuatu yang menyenangkan dan akan menyambut beberapa saran, silakan [hubungi saya](https://albertocuesta.es/)! Saya selalu senang membantu.