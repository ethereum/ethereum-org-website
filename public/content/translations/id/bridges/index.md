---
title: Jembatan rantai blok
metaTitle: Pengantar jembatan rantai blok
description: Jembatan memungkinkan pengguna untuk memindahkan dana mereka melintasi berbagai rantai blok yang berbeda
lang: id
---

_Web3 telah berkembang menjadi ekosistem rantai blok lapisan 1 (l1) dan solusi penskalaan lapisan 2 (l2), masing-masing dirancang dengan kemampuan dan kompromi yang unik. Seiring bertambahnya jumlah protokol rantai blok, permintaan untuk memindahkan aset lintas rantai juga meningkat. Untuk memenuhi permintaan ini, kita membutuhkan jembatan._

<Divider />

## Apa itu jembatan? {#what-are-bridges}

Jembatan rantai blok bekerja persis seperti jembatan yang kita kenal di dunia fisik. Sama seperti jembatan fisik yang menghubungkan dua lokasi fisik, jembatan rantai blok menghubungkan dua ekosistem rantai blok. **Jembatan memfasilitasi komunikasi antar rantai blok melalui transfer informasi dan aset**.

Mari kita pertimbangkan sebuah contoh:

Anda berasal dari AS dan sedang merencanakan perjalanan ke Eropa. Anda memiliki USD, tetapi Anda membutuhkan EUR untuk dibelanjakan. Untuk menukarkan USD Anda ke EUR, Anda dapat menggunakan penukaran mata uang dengan sedikit biaya.

Namun, apa yang Anda lakukan jika Anda ingin melakukan pertukaran serupa untuk menggunakan [rantai blok](/glossary/#blockchain) yang berbeda? Katakanlah Anda ingin menukarkan [ETH](/glossary/#ether) di Mainnet [Ethereum](/) dengan ETH di [Arbitrum](https://arbitrum.io/). Seperti penukaran mata uang yang kita lakukan untuk EUR, kita memerlukan mekanisme untuk memindahkan ETH kita dari Ethereum ke Arbitrum. Jembatan memungkinkan transaksi semacam itu. Dalam hal ini, [Arbitrum memiliki jembatan bawaan](https://portal.arbitrum.io/bridge) yang dapat mentransfer ETH dari Mainnet ke Arbitrum.

## Mengapa kita membutuhkan jembatan? {#why-do-we-need-bridges}

Semua rantai blok memiliki keterbatasannya masing-masing. Agar Ethereum dapat berskala dan mengimbangi permintaan, ia membutuhkan [rollup](/glossary/#rollups). Sebagai alternatif, l1 seperti Solana dan Avalanche dirancang secara berbeda untuk memungkinkan laju pemrosesan yang lebih tinggi tetapi dengan mengorbankan desentralisasi.

Namun, semua rantai blok dikembangkan di lingkungan yang terisolasi dan memiliki aturan serta mekanisme [konsensus](/glossary/#consensus) yang berbeda. Ini berarti mereka tidak dapat berkomunikasi secara bawaan, dan token tidak dapat bergerak bebas antar rantai blok.

Jembatan ada untuk menghubungkan rantai blok, memungkinkan transfer informasi dan token di antara mereka.

**Jembatan memungkinkan**:

- transfer aset dan informasi lintas rantai.
- [aplikasi terdesentralisasi (dapp)](/glossary/#dapp) untuk mengakses kekuatan berbagai rantai blok – sehingga meningkatkan kemampuan mereka (karena protokol sekarang memiliki lebih banyak ruang desain untuk inovasi).
- pengguna untuk mengakses platform baru dan memanfaatkan manfaat dari berbagai rantai yang berbeda.
- pengembang dari berbagai ekosistem rantai blok untuk berkolaborasi dan membangun platform baru bagi pengguna.

[Cara menjembatani token ke lapisan 2 (l2)](/guides/how-to-use-a-bridge/)

<Divider />

## Kasus penggunaan jembatan {#bridge-use-cases}

Berikut adalah beberapa skenario di mana Anda dapat menggunakan jembatan:

### Biaya transaksi yang lebih rendah {#transaction-fees}

Katakanlah Anda memiliki ETH di Mainnet Ethereum tetapi menginginkan biaya transaksi yang lebih murah untuk menjelajahi berbagai dapp. Dengan menjembatani ETH Anda dari Mainnet ke rollup l2 Ethereum, Anda dapat menikmati biaya transaksi yang lebih rendah.

### Dapp di rantai blok lain {#dapps-other-chains}

Jika Anda telah menggunakan Aave di Mainnet Ethereum untuk memasok USDT tetapi suku bunga yang mungkin Anda terima untuk memasok USDT menggunakan Aave di Polygon lebih tinggi.

### Menjelajahi ekosistem rantai blok {#explore-ecosystems}

Jika Anda memiliki ETH di Mainnet Ethereum dan Anda ingin menjelajahi l1 alternatif untuk mencoba dapp bawaan mereka. Anda dapat menggunakan jembatan untuk mentransfer ETH Anda dari Mainnet Ethereum ke l1 alternatif tersebut.

### Memiliki aset kripto bawaan {#own-native}

Katakanlah Anda ingin memiliki Bitcoin (BTC) bawaan, tetapi Anda hanya memiliki dana di Mainnet Ethereum. Untuk mendapatkan eksposur ke BTC di Ethereum, Anda dapat membeli Wrapped Bitcoin (WBTC). Namun, WBTC adalah token [ERC-20](/glossary/#erc-20) bawaan jaringan Ethereum, yang berarti ini adalah versi Ethereum dari Bitcoin dan bukan aset asli di rantai blok Bitcoin. Untuk memiliki BTC bawaan, Anda harus menjembatani aset Anda dari Ethereum ke Bitcoin menggunakan jembatan. Ini akan menjembatani WBTC Anda dan mengubahnya menjadi BTC bawaan. Sebagai alternatif, Anda mungkin memiliki BTC dan ingin menggunakannya dalam protokol [keuangan terdesentralisasi (DeFi)](/glossary/#defi) Ethereum. Ini akan membutuhkan penjembatanan ke arah sebaliknya, dari BTC ke WBTC yang kemudian dapat digunakan sebagai aset di Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Anda juga dapat melakukan semua hal di atas menggunakan [bursa terpusat](/get-eth). Namun, kecuali dana Anda sudah ada di bursa, ini akan melibatkan banyak langkah, dan Anda mungkin akan lebih baik menggunakan jembatan.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Jenis-jenis jembatan {#types-of-bridge}

Jembatan memiliki banyak jenis desain dan kerumitan. Secara umum, jembatan terbagi dalam dua kategori: jembatan tepercaya dan jembatan tanpa kepercayaan.

| Jembatan Tepercaya                                                                                                                                         | Jembatan Tanpa Kepercayaan                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Jembatan tepercaya bergantung pada entitas atau sistem pusat untuk operasinya.                                                                            | Jembatan tanpa kepercayaan beroperasi menggunakan kontrak pintar dan algoritma.                                        |
| Mereka memiliki asumsi kepercayaan sehubungan dengan penyimpanan dana dan keamanan jembatan. Pengguna sebagian besar mengandalkan reputasi operator jembatan. | Mereka tanpa kepercayaan, yaitu, keamanan jembatan sama dengan keamanan rantai blok yang mendasarinya. |
| Pengguna harus melepaskan kendali atas aset kripto mereka.                                                                                                   | Melalui [kontrak pintar](/glossary/#smart-contract), jembatan tanpa kepercayaan memungkinkan pengguna untuk tetap memegang kendali atas dana mereka.           |

Singkatnya, kita dapat mengatakan bahwa jembatan tepercaya memiliki asumsi kepercayaan, sedangkan jembatan tanpa kepercayaan bersifat minim kepercayaan dan tidak membuat asumsi kepercayaan baru di luar domain yang mendasarinya. Berikut adalah bagaimana istilah-istilah ini dapat dijelaskan:

- **Tanpa kepercayaan**: memiliki keamanan yang setara dengan domain yang mendasarinya. Seperti yang dijelaskan oleh [Arjun Bhuptani dalam artikel ini.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Asumsi kepercayaan:** menjauh dari keamanan domain yang mendasarinya dengan menambahkan pemverifikasi eksternal dalam sistem, sehingga membuatnya kurang aman secara kripto-ekonomi.

Untuk mengembangkan pemahaman yang lebih baik tentang perbedaan utama antara kedua pendekatan tersebut, mari kita ambil sebuah contoh:

Bayangkan Anda berada di titik periksa keamanan bandara. Ada dua jenis titik periksa:

1. Titik Periksa Manual — dioperasikan oleh petugas yang secara manual memeriksa semua detail tiket dan identitas Anda sebelum menyerahkan pas naik (boarding pass).
2. Lapor Masuk Mandiri (Self Check-In) — dioperasikan oleh mesin tempat Anda memasukkan detail penerbangan Anda dan menerima pas naik jika semuanya sesuai.

Titik periksa manual mirip dengan model tepercaya karena bergantung pada pihak ketiga, yaitu petugas, untuk operasinya. Sebagai pengguna, Anda memercayai petugas untuk membuat keputusan yang tepat dan menggunakan informasi pribadi Anda dengan benar.

Lapor masuk mandiri mirip dengan model tanpa kepercayaan karena menghilangkan peran operator dan menggunakan teknologi untuk operasinya. Pengguna selalu memegang kendali atas data mereka dan tidak perlu memercayai pihak ketiga dengan informasi pribadi mereka.

Banyak solusi penjembatanan mengadopsi model di antara kedua ekstrem ini dengan berbagai tingkat sifat tanpa kepercayaan.

<Divider />

## Menggunakan jembatan {#use-bridge}

Menggunakan jembatan memungkinkan Anda untuk memindahkan aset Anda melintasi berbagai rantai blok yang berbeda. Berikut adalah beberapa sumber daya yang dapat membantu Anda menemukan dan menggunakan jembatan:

- **[Ringkasan Jembatan L2BEAT](https://l2beat.com/bridges/summary) & [Analisis Risiko Jembatan L2BEAT](https://l2beat.com/bridges/summary)**: Ringkasan komprehensif dari berbagai jembatan, termasuk detail tentang pangsa pasar, jenis jembatan, dan rantai tujuan. L2BEAT juga memiliki analisis risiko untuk jembatan, membantu pengguna membuat keputusan yang tepat saat memilih jembatan.
- **[Ringkasan Jembatan DefiLlama](https://defillama.com/bridges/Ethereum)**: Ringkasan volume jembatan di seluruh jaringan Ethereum.

<Divider />

## Risiko menggunakan jembatan {#bridge-risk}

Jembatan masih dalam tahap awal pengembangan. Kemungkinan besar desain jembatan yang optimal belum ditemukan. Berinteraksi dengan jenis jembatan apa pun membawa risiko:

- **Risiko Kontrak Pintar —** risiko adanya kutu (bug) dalam kode yang dapat menyebabkan hilangnya dana pengguna
- **Risiko Teknologi —** kegagalan perangkat lunak, kode yang penuh kutu, kesalahan manusia, spam, dan serangan berbahaya yang mungkin dapat mengganggu operasi pengguna

Selain itu, karena jembatan tepercaya menambahkan asumsi kepercayaan, mereka membawa risiko tambahan seperti:

- **Risiko Sensor —** operator jembatan secara teoretis dapat menghentikan pengguna dari mentransfer aset mereka menggunakan jembatan
- **Risiko Kustodian —** operator jembatan dapat berkolusi untuk mencuri dana pengguna

Dana pengguna berisiko jika:

- terdapat kutu dalam kontrak pintar
- pengguna melakukan kesalahan
- rantai blok yang mendasarinya diretas
- operator jembatan memiliki niat jahat dalam jembatan tepercaya
- jembatan diretas

Salah satu peretasan baru-baru ini adalah jembatan Wormhole Solana, [di mana 120 ribu wETH ($325 juta USD) dicuri selama peretasan](https://rekt.news/wormhole-rekt/). Banyak dari [peretasan teratas dalam rantai blok melibatkan jembatan](https://rekt.news/leaderboard/).

Jembatan sangat penting untuk orientasi pengguna ke l2 Ethereum, dan bahkan bagi pengguna yang ingin menjelajahi ekosistem yang berbeda. Namun, mengingat risiko yang terlibat dalam berinteraksi dengan jembatan, pengguna harus memahami kompromi yang dibuat oleh jembatan tersebut. Berikut adalah beberapa [strategi untuk keamanan lintas rantai](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Bacaan lebih lanjut {#further-reading}
- [EIP-5164: Eksekusi Lintas Rantai](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 Juni 2022 - Brendan Asselstine_
- [Kerangka Kerja Risiko L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 Juli 2022 - Bartek Kiepuszewski_
- ["Mengapa masa depan akan menjadi multi-rantai, tetapi tidak akan menjadi lintas rantai."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 Januari 2022 - Vitalik Buterin_
- [Memanfaatkan Keamanan Bersama Untuk Interoperabilitas Lintas Rantai yang Aman: Komite State Lagrange Dan Seterusnya](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 Juni 2024 - Emmanuel Awosika_
- [Keadaan Solusi Interoperabilitas Rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 Juni 2024 - Alex Hook_