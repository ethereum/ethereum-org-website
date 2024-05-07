---
title: Bagaimana mengimplementasikan pasar ERC-721
description: Cara menjual item yang ditokenisasi pada papan iklan baris terdesentralisasi
author: "Alberto Cuesta Cañada"
tags:
  - "kontrak pintar"
  - "erc-721"
  - "solidity"
  - "token"
skill: intermediate
lang: id
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Dalam artikel ini, saya akan menunjukkan Anda cara mengodekan Craiglist untuk blockchain Ethereum.

Sebelum Gumtree, Ebay, dan Craiglist ada, kebanyakan papan iklan baris terbuat dari gabus atau kertas. Papan iklan baris ada di koridor sekolah, koran, lampu jalan, dan bagian muka toko.

Semuanya berubah dengan internet. Jumlah orang yang bisa melihat papan iklan baris tertentu bertambah banyak berkali-kali lipat. Dengan begitu, pasar yang diwakilinya menjadi lebih efisien dan berskala global. Ebay adalah perusahaan yang sangat besar yang asal usulnya dapat dilacak dari papan iklan baris fisik ini.

Dengan blockchain, pasar-pasar ini akan berubah sekali lagi, berikut caranya.

## Monetisasi {#monetization}

Model bisnis papan iklan baris blockchain publik akan berbeda dari jenis Ebay dan perusahaan lainnya.

Pertama, ada [sudut desentralisasi](/developers/docs/web2-vs-web3/). Platform yang telah ada harus mempertahankan server mereka sendiri. Platform terdesentralisasi dikelola oleh penggunanya, sehingga pemilik platform tidak perlu mengeluarkan biaya pengoperasian platform inti sepeserpun.

Lalu ada front end, situs web, atau antarmuka yang memberi akses ke platform. Di sini ada banyak pilihan. Para pemilik platform bisa membatasi akses dan memaksa setiap orang menggunakan antarmuka mereka, dengan memungut biaya. Pemilik platform juga bisa memutuskan untuk membuka akses (Kekuatan bagi Orang-Orang!) dan membiarkan siapa pun membangun antarmuka pada platform tersebut. Atau pemilik bisa memutuskan pendekatan apa pun di tengah-tengah esktrem ini.

_Pemimpin perusahaan dengan visi yang lebih banyak dari saya akan tahu bagaimana memonetisasi ini. Menurut saya, ini berbeda dari status quo dan mungkin menguntungkan._

Lagipula, ada aspek otomatisasi dan pembayaran. Beberapa hal bisa sangat [tertokenisasi](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) dan diperdagangkan secara efektif dalam papan iklan baris. Aset yang ditokenisasi mudah dipindahkan dalam blockchain. Metode pembayaran sangat kompleks juga bisa dengan mudah diimplementasikan dalam blockchain.

Saya baru saja mencium kesempatan bisnis di sini. Papan iklan baris yang tanpa biaya pengoperasian bisa dengan mudah diimplementasikan, dengan jalur pembayaran kompleks yang dimasukkan dalam tiap transaksi. Saya yakin seseorang akan menemukan ide tentang bagaimana menggunakan ini.

Saya hanya senang membangunnya. Mari kita lihat kodenya.

## Implementasi {#implementation}

Beberapa waktu lalu kami memulai sebuah [repository sumber terbuka](https://github.com/HQ20/contracts?ref=hackernoon.com) dengan implementasi percontohan dalam kasus bisnis dan hal lainnya, silakan dilihat.

Kode untuk [Papan Iklan Baris Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) ini ada di sana, silakan pakai dan manfaatkan sesuka Anda. Hanya perhatikan bahwa kode belum diaudit dan Anda perlu melakukan uji kelayakan sebelum membiarkan uang masuk ke dalamnya.

Dasar-dasar papan ini tidaklah rumit. Semua iklan dalam papan ini hanya akan berbentuk struktur dengan beberapa bidang:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

Jadi ada seseorang yang membuat postingan iklan. Item untuk dijual. Harga untuk itemnya. Status perdagangan yang bisa dibuka, dieksekusi, atau dibatalkan.

Semua perdagangan ini akan disimpan dalam satu pemetaan. Karena semua hal dalam Solidity tampak seperti sebuah pemetaan. Juga karena itu praktis.

```solidity
mapping(uint256 => Trade) public trades;
```

Menggunakan pemetaan juga berarti kita harus menemukan id untuk setiap iklan sebelum membuat postingannya, dan kita juga harus mengetahui id sebuah iklan sebelum bisa mengoperasikannya. Ada beberapa cara menangani ini baik dalam kontrak pintar atau dalam front-end. Silakan bertanya jika Anda memerlukan beberapa petunjuk.

Selanjutnya hadir pertanyaan item seperti apa yang kita tangani, dan mata uang apa yang digunakan untuk pembayaran transaksi.

Untuk itemnya, kita hanya akan meminta mereka mengimplementasikan antarmuka [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), yang sebenarnya hanyalah cara mewakili item dunia nyata dalam blockchain, meskipun ini [paling cocok digunakan untuk aset digital](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Kita akan menentukan kontrak ERC721 kita dalam pembangun, yang berarti aset apa pun dalam papan iklan baris harus ditokenisasi sebelumnya.

Untuk pembayaran, kita akan melakukan hal yang serupa. Kebanyakan proyek blockchain menentukan mata uang kripto [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) mereka sendiri. Beberapa lainnya lebih suka menggunakan jenis arus utama seperti DAI. Dalam papan iklan baris ini, Anda hanya perlu memutuskan dalam pembangunan, mata uang apa yang Anda pakai. Mudah.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Kita hampir selesai. Kita sudah mendapatkan iklan, item untuk diperdagangkan, dan mata uang untuk pembayaran. Membuat iklan berarti memasukkan satu item dalam escrow untuk menunjukkan Anda pemilik item tersebut dan Anda belum mempostingnya dua kali, mungkin di papan yang berbeda.

Kode di bawah ini persis melakukan itu. Memasukkan itemnya dalam escrow, membuat iklan, melakukan beberapa pembenahan.

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

Untuk menerima perdagangan berarti memilih satu iklan (perdagangan), membayar harganya, menerima itemnya. Kode di bawah ini mengambil satu perdagangan. Memeriksa ketersediaanya. Membayar itemnya. Mengambil itemnya. Memperbarui iklannya.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Terbuka", "Perdagangan tidak Terbuka.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Tereksekusi";
  emit TradeStatusChange(_trade, "Tereksekusi");
}
```

Akhirnya, kita memiliki satu opsi bagi penjual untuk membatalkan perdagangan sebelum seorang pembeli menerimanya. Dalam beberapa model, iklan - sebagai gantinya iklan-iklan ini akan ditayangkan selama beberapa saat sebelum kedaluwarsa. Pilihan Anda, tergantung pada desain pasar Anda.

Kode di bawah sangat mirip dengan yang digunakan untuk mengeksekusi perdagangan, hanya bedanya tidak ada mata uang yang berpindah tangan dan item kembali ke poster iklan.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Perdagangan hanya dapat dibatalkan oleh pemilik postingan."
  );
  require(trade.status == "Terbuka", "Perdagangan tidak Terbuka.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Dibatalkan";
  emit TradeStatusChange(_trade, "Dibatalkan");
}
```

Selesai. Anda sampai pada bagian akhir implementasi. Cukup mengejutkan melihat betapa ringkasnya beberapa konsep bisnis saat diekspresikan dalam kode, dan ini adalah salah kasus itu. Simak kontrak lengkapnya [di repo kami](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Kesimpulan {#conclusion}

Papan iklan baris adalah konfigurasi pasar umum yang berskala besar dengan internet, menjadi model bisnis yang sangat populer dengan beberapa pemenang monopoli.

Papan iklan baris juga merupakan peralatan yang mudah direplikasi dalam lingkungan blockchain, dengan fitur sangat spesifik yang akan membuat tantangan terhadap perusahaan raksasa yang telah ada menjadi mungkin.

Dalam artikel ini, saya mencoba menghubungkan kenyataan bisnis dari papan iklan baris dengan implementasi teknologikal. Pengetahuan ini akan membantu Anda membuat visi dan roadmap untuk implementasi jika Anda memiliki kemampuan yang tepat.

Seperti biasanya, jika Anda ingin membuat apa pun yang menyenangkan dan mau menerima beberapa saran, silakan [hubungi saya](https://albertocuesta.es/)! Saya selalu senang bisa membantu.
