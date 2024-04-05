---
title: Pengenalan terhadap jembatan rantai blok
description: Jembatan yang memungkinkan pengguna untuk memindahkan dana mereka di berbagai rantai blok yang berbeda
lang: id
---

# Jembatan blockchain {#prerequisites}

_Web3 telah berkembang menjadi ekosistem rantai blok L1 dan solusi penskalaan L2, masing-masing dirancang dengan kemampuan dan pertukaran yang unik. Seiring dengan bertambahnya jumlah protokol rantai blok, begitu juga [permintaan untuk memindahkan aset di antara berbagai rantai](https://dune.xyz/eliasimos/Bridge-Away-(from-Ethereum)). Untuk memenuhi permintaan ini, kita memerlukan jembatan penghubung._

<Divider />

## Apa itu jembatan? {#what-are-bridges}

Jembatan rantai blok bekerja seperti jembatan yang kita kenal di dunia fisik. Sama seperti jembatan yang menghubungkan dua lokasi fisik, sebuah jembatan rantai blok menghubungkan dua ekosistem rantai blok. Jembatan memberi fasilitas komunikasi antara rantai blok melalui transfer informasi dan aset.

Mari kita lihat sebuah contoh:

Anda dari AS dan merencanakan perjalanan ke Eropa. Anda memiliki USD, tetapi Anda memerlukan EUR untuk digunakan. Untuk menukarkan USD Anda menjadi EUR, Anda dapat menggunakan layanan pertukaran mata uang dengan biaya kecil.

Namun, apa yang Anda lakukan jika anda ingin membuat penukaran yang serupa untuk menggunakan rantai blok yang berbeda? Katakanlah anda ingin menukarkan ETH di Ethereum Jaringan Utama dengan ETH di [Arbitrum](https://arbitrum.io/). Seperti bursa mata uang yang kita lakukan untuk EUR, kita memerlukan mekanisme untuk memindahkan ETH kita dari Ethereum ke Arbitrum. Jembatan dapat memungkinkan transaksi semacam itu. Pada kasus ini, [Arbitrum memiliki jembatan asli](https://bridge.arbitrum.io/) yang dapat mentransfer ETH dari Jaringan Utama ke Arbitrum.

## Mengapa kita memerlukan jembatan? {#why-do-we-need-bridges}

Semua rantai blok memiliki keterbatasan masing-masing. Agar Ethereum dapat berkembang dan mengikuti permintaan, diperlukan rollup. Sebagai alternatif, L1 seperti Solana dan Avalanche dirancang dengan cara yang berbeda untuk memungkinkan keluaran yang lebih tinggi namun dengan mengorbankan desentralisasi.

Namun, semua rantai blok berkembang dalam lingkungan yang aman dan memiliki aturan dan mekanisme konsensus yang berbeda. Ini berarti mereka tidak dapat melakukan komunikasi secara alami, dan token tidak dapat bergerak bebas antara rantai blok.

Jembatan ada untuk menghubungkan Rantai Blok, memungkinkan transfer informasi dan token antara mereka.

Jembatan memungkinkan:

- transfer aset dan informasi lintas rantai.
- dapps untuk mengakses kekuatan berbagai rantai blok - dengan demikian meningkatkan kemampuan mereka (karena protokol sekarang memiliki lebih banyak ruang desain untuk inovasi).
- pengguna untuk mengakses platform baru dan memanfaatkan manfaat dari rantai yang berbeda.
- pengembang dari ekosistem rantai blok yang berbeda untuk berkolaborasi dan membangun platform baru bagi para pengguna.

[Cara bridge token ke layer 2](/guides/how-to-use-a-bridge/)

<Divider />

## Kasus penggunaan jembatan {#bridge-use-cases}

Berikut adalah beberapa cara di mana Anda dapat menggunakan jembatan:

### Biaya transaksi lebih rendah {#transaction-fees}

Misalkan Anda memiliki ETH di Ethereum di Jaringan Utama tetapi ingin biaya transaksi yang lebih murah untuk menjelajahi dapps yang berbeda. Dengan memindahkan ETH Anda dari Jaringan Utama ke Ethereum L2 Rollup, Anda dapat menikmati Biaya Transaksi yang lebih rendah.

### Dapps di rantai blok lain {#dapps-other-chains}

Jika Anda telah menggunakan Aave di Ethereum Jaringan Utama untuk Meminjamkan USDT tetapi suku bunga untuk Pemberian pinjaman USDT menggunakan Aave di Polygon lebih tinggi.

### Menjelajahi ekosistem rantai blok {#explore-ecosystems}

Jika Anda memiliki ETH di Jaringan Utama Ethereum dan ingin menjelajahi alternatif L1 untuk mencoba dapps asli mereka. Anda dapat menggunakan jembatan untuk mentransfer ETH Anda dari Ethereum Jaringan Utama ke alternatif L1 tersebut.

### Aset kripto asli milik sendiri {#own-native}

Mari kita umpamakan Anda ingin memiliki Bitcoin (BTC) asli, tetapi Anda hanya memiliki dana di Ethereum Jaringan Utama. Untuk mendapatkan paparan terhadap BTC di Ethereum, Anda dapat membeli pembungkus Bitcoin (WBTC). Namun, WBTC adalah token ERC-20 asli dari Jaringan Ethereum, yang berarti ia merupakan versi Ethereum dari Bitcoin dan bukan aset asli di rantai blok Bitcoin. Untuk memiliki BTC asli, Anda harus memindahkan aset Anda dari Ethereum ke Bitcoin menggunakan sebuah jembatan. Ini akan menghubungkan WBTC Anda dan mengonversi menjadi BTC asli. Sebagai alternatif, Anda mungkin memiliki BTC dan ingin menggunakannya dalam protokol DeFi Ethereum. Hal ini akan memerlukan penggunaan jembatan sebaliknya, dari BTC ke WBTC yang kemudian dapat digunakan sebagai aset di Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  Anda juga dapat melakukan semua hal di atas menggunakan sebuah <a href="/get-eth/">bursa terpusat</a>. Namun, kecuali jika dana Anda sudah berada di bursa, ini akan melibatkan beberapa langkah, dan kemungkinan lebih baik jika Anda menggunakan jembatan.
</InfoBanner>

<Divider />

## Jenis-jenis jembatan {#types-of-bridge}

Jembatan memiliki berbagai jenis desain dan komplek. Secara umum, jembatan dapat dibagi menjadi dua kategori: jembatan yang dapat dipercaya dan jembatan yang tidak memerlukan kepercayaan.

| Jembatan yang Dapat Dipercaya                                                                                                                         | Jembatan yang Tidak Memerlukan Kepercayaan                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Jembatan yang dapat dipercaya mengandalkan entitas atau sistem pusat untuk operasional mereka.                                                        | Jembatan yang tidak memerlukan kepercayaan beroperasi menggunakan kontrak pintar dan algoritma.                           |
| Mereka memiliki asumsi kepercayaan terkait pengawasan dana dan keamanan jembatan. Pengguna sebagian besar bergantung pada reputasi operator jembatan. | Mereka tidak memerlukan kepercayaan, yaitu keamanan jembatan sama dengan keamanan dari rantai blok yang mendasarinya.     |
| Pengguna harus melepaskan kendali atas aset kripto mereka.                                                                                            | Melalui kontrak pintar, jembatan yang tidak memerlukan kepercayaan memungkinkan pengguna tetap mengendalikan dana mereka. |

Secara singkat, kita dapat mengatakan bahwa jembatan yang dapat dipercaya memiliki asumsi kepercayaan, sedangkan jembatan yang tidak memerlukan kepercayaan memiliki sedikit asumsi kepercayaan dan tidak membuat asumsi kepercayaan baru di luar domain yang mendasarinya. Berikut adalah cara menggambarkan istilah ini:

- **Jembatan yang tidak memerlukan kepercayaan**: memiliki tingkat keamanan yang setara dengan domain yang mendasari. Seperti yang dijelaskan oleh [Arjun Bhuptani dalam artikel ini.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Asumsi kepercayaan:** bergerak menjauh dari keamanan domain yang mendasarinya dengan menambahkan verifikator eksternal dalam sistem, sehingga membuatnya kurang Aman secara kripto-ekonomi.

Untuk mengembangkan pemahaman yang lebih baik tentang perbedaan kunci antara kedua pendekatan ini, mari kita ambil contoh:

Bayangkan Anda sedang berada di pos pemeriksaan keamanan bandara. Ada dua jenis pos pemeriksaan:

1. Pos Pemeriksaan Manual — dioperasikan oleh petugas yang secara manual memeriksa semua detail tiket dan identitas Anda sebelum memberikan boarding pass.
2. Pemeriksaan Mandiri — dioperasikan oleh mesin di mana Anda memasukkan detail penerbangan Anda dan menerima boarding pass jika semuanya telah sesuai.

Pemeriksaan manual serupa dengan model tepercaya karena bergantung pada pihak ketiga, yaitu petugas, untuk pengoperasiannya. Sebagai pengguna, Anda percaya kepada petugas untuk membuat keputusan yang tepat dan menggunakan informasi pribadi Anda dengan benar.

Pemeriksaan mandiri serupa dengan model tanpa kepercayaan karena model ini menghilangkan peran operator dan menggunakan teknologi untuk pengoperasiannya. Pengguna selalu memegang kendali atas data mereka dan tidak perlu memercayai pihak ketiga dengan informasi pribadi mereka.

Banyak solusi yang menjembatani mengadopsi model-model di antara kedua ekstrem ini dengan berbagai tingkat ketidakpercayaan.

<Divider />

## Risiko menggunakan jembatan {#bridge-risk}

Jembatan masih dalam tahap awal pengembangan. Kemungkinan desain jembatan yang optimal belum ditemukan. Berinteraksi dengan semua jenis jembatan mengandung risiko:

- **Risiko Kontrak Pintar —** risiko adanya bug dalam kode yang dapat menyebabkan dana pengguna hilang
- **Risiko Teknologi —** kegagalan perangkat lunak, kode yang bermasalah, kesalahan manusia, spam, dan serangan jahat dapat mengganggu operasi pengguna

Selain itu, karena jembatan tepercaya menambah asumsi kepercayaan, jembatan ini membawa risiko tambahan seperti:

- **Risiko Sensor —** operator jembatan secara teori dapat mencegah pengguna untuk mentransfer aset mereka menggunakan jembatan tersebut
- **Risiko Kustodian —** operator jembatan dapat berkolusi untuk mencuri dana pengguna

Dana pengguna berisiko jika:

- ada bug dalam kontrak pintar
- pengguna membuat kesalahan
- rantai blok yang mendasarinya diretas
- operator jembatan memiliki niat jahat di jembatan tepercaya
- jembatan diretas

Salah satu peretasan baru-baru ini adalah jembatan Wormhole milik Solana, [di mana 120 ribu wETH ($325 juta USD) dicuri selama peretasan](https://rekt.news/wormhole-rekt/). Banyak dari [serangan terbesar di jaringan rantai blok melibatkan jembatan](https://rekt.news/leaderboard/).

Jembatan sangat penting untuk menerima pengguna ke dalam Ethereum L2, dan bahkan untuk pengguna yang ingin menjelajahi ekosistem yang berbeda. Namun, mengingat risiko yang terlibat dalam berinteraksi dengan jembatan, pengguna harus memahami untung-rugi yang dibuat oleh jembatan. Berikut beberapa [strategi keamanan lintas rantai](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Bacaan lebih lanjut {#further-reading}

- [EIP-5164: Eksekusi Lintas Rantai](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _18 Juni 2022 - Brendan Asselstine_
- [Kerangka Kerja Risiko L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _5 Juli 2022 - Bartek Kiepuszewski_
- ["Mengapa masa depan akan menjadi multi-rantai, tetapi bukan lintas rantai."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _8 Januari 2022 - Vitalik Buterin_
- [Apa Itu Jembatan Rantai Blok dan Bagaimana Kita Dapat Mengklasifikasikannya?](https://blog.li.finance/what-are-blockchain-bridges-and-how-can-we-classify-them-560dc6ec05fa) _18 Februari 2021 - Arjun Chand_
- [Apa Itu Jembatan Lintas Rantai?](https://www.alchemy.com/overviews/cross-chain-bridges) _10 Mei 2022 - Alchemy_
- [Jembatan Rantai Blok: Membangun Jaringan dari Kryptonetwork](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) _8 September 2021 - Dmitriy Berenzon_
- [Jembatan dalam Ruang Kripto](https://medium.com/chainsafe-systems/bridges-in-crypto-space-12e158f5fd1e) _23 Agustus 2021 - Ben Adar Hyman_
- [Trilema Interoperabilitas](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17) _1 Oktober 2021 - Arjun Bhuptani_
- [Amankan Jembatan: Komunikasi Lintas Rantai yang Tepat](https://medium.com/dragonfly-research/secure-the-bridge-cross-chain-communication-done-right-part-i-993f76ffed5d) _23 Agustus 2021 - Celia Wan_
