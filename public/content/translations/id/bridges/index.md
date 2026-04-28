---
title: Pengantar jembatan blockchain
description: Jembatan memungkinkan pengguna untuk memindahkan dana mereka di berbagai blockchain yang berbeda
lang: id
---

# Jembatan blockchain {#prerequisites}

_Web3 telah berkembang menjadi ekosistem blockchain L1 dan solusi peningkatan L2, masing-masing dirancang dengan kemampuan dan pertukaran (trade-off) yang unik. Seiring dengan meningkatnya jumlah protokol blockchain, permintaan untuk memindahkan aset lintas rantai juga meningkat. Untuk memenuhi permintaan ini, kita membutuhkan jembatan._

<Divider />

## Apa itu jembatan? {#what-are-bridges}

Jembatan blockchain bekerja persis seperti jembatan yang kita kenal di dunia fisik. Sama seperti jembatan fisik yang menghubungkan dua lokasi fisik, jembatan blockchain menghubungkan dua ekosistem blockchain. **Jembatan memfasilitasi komunikasi antar blockchain melalui transfer informasi dan aset**.

Mari kita pertimbangkan sebuah contoh:

Anda berasal dari AS dan sedang merencanakan perjalanan ke Eropa. Anda memiliki USD, tetapi Anda membutuhkan EUR untuk dibelanjakan. Untuk menukarkan USD Anda ke EUR, Anda dapat menggunakan penukaran mata uang dengan sedikit biaya.

Namun, apa yang Anda lakukan jika Anda ingin melakukan pertukaran serupa untuk menggunakan [blockchain](/glossary/#blockchain) yang berbeda? Katakanlah Anda ingin menukarkan [ETH](/glossary/#ether) di mainnet [Ethereum](/) dengan ETH di [Arbitrum](https://arbitrum.io/). Seperti penukaran mata uang yang kita lakukan untuk EUR, kita memerlukan mekanisme untuk memindahkan ETH kita dari Ethereum ke Arbitrum. Jembatan memungkinkan [transaksi](/glossary/#transaction) semacam itu. Dalam hal ini, [Arbitrum memiliki jembatan asli](https://portal.arbitrum.io/bridge) yang dapat mentransfer ETH dari mainnet ke Arbitrum.

## Mengapa kita membutuhkan jembatan? {#why-do-we-need-bridges}

Semua blockchain memiliki keterbatasannya masing-masing. Agar Ethereum dapat ditingkatkan dan mengimbangi permintaan, ia membutuhkan [rollup](/glossary/#rollups). Sebagai alternatif, L1 seperti Solana dan Avalanche dirancang secara berbeda untuk memungkinkan throughput yang lebih tinggi tetapi dengan mengorbankan desentralisasi.

Namun, semua blockchain dikembangkan di lingkungan yang terisolasi dan memiliki aturan serta mekanisme [konsensus](/glossary/#consensus) yang berbeda. Ini berarti mereka tidak dapat berkomunikasi secara asli, dan token tidak dapat bergerak bebas di antara blockchain.

Jembatan ada untuk menghubungkan blockchain, memungkinkan transfer informasi dan token di antara mereka.

**Jembatan memungkinkan**:

- transfer aset dan informasi lintas rantai.
- [dapps](/glossary/#dapp) untuk mengakses kekuatan dari berbagai blockchain – sehingga meningkatkan kemampuan mereka (karena protokol sekarang memiliki lebih banyak ruang desain untuk inovasi).
- pengguna untuk mengakses platform baru dan memanfaatkan manfaat dari rantai yang berbeda.
- pengembang dari ekosistem blockchain yang berbeda untuk berkolaborasi dan membangun platform baru bagi pengguna.

[Cara menjembatani token ke layer 2](/guides/how-to-use-a-bridge/)

<Divider />

## Kasus penggunaan jembatan {#bridge-use-cases}

Berikut adalah beberapa skenario di mana Anda dapat menggunakan jembatan:

### Biaya transaksi yang lebih rendah {#transaction-fees}

Katakanlah Anda memiliki ETH di mainnet Ethereum tetapi menginginkan biaya transaksi yang lebih murah untuk menjelajahi dapps yang berbeda. Dengan menjembatani ETH Anda dari mainnet ke rollup L2 Ethereum, Anda dapat menikmati biaya transaksi yang lebih rendah.

### Dapps di blockchain lain {#dapps-other-chains}

Jika Anda telah menggunakan Aave di mainnet Ethereum untuk memasok USDT tetapi suku bunga yang mungkin Anda terima untuk memasok USDT menggunakan Aave di Polygon lebih tinggi.

### Menjelajahi ekosistem blockchain {#explore-ecosystems}

Jika Anda memiliki ETH di mainnet Ethereum dan Anda ingin menjelajahi alt L1 untuk mencoba dapps asli mereka. Anda dapat menggunakan jembatan untuk mentransfer ETH Anda dari mainnet Ethereum ke alt L1.

### Memiliki aset kripto asli {#own-native}

Katakanlah Anda ingin memiliki Bitcoin (BTC) asli, tetapi Anda hanya memiliki dana di mainnet Ethereum. Untuk mendapatkan eksposur ke BTC di Ethereum, Anda dapat membeli Wrapped Bitcoin (WBTC). Namun, WBTC adalah [token](/glossary/#token) [ERC-20](/glossary/#erc-20) asli dari [jaringan](/glossary/#network) Ethereum, yang berarti ini adalah versi Ethereum dari Bitcoin dan bukan aset asli di blockchain Bitcoin. Untuk memiliki BTC asli, Anda harus menjembatani aset Anda dari Ethereum ke Bitcoin menggunakan jembatan. Ini akan menjembatani WBTC Anda dan mengubahnya menjadi BTC asli. Sebagai alternatif, Anda mungkin memiliki BTC dan ingin menggunakannya dalam protokol [DeFi](/glossary/#defi) Ethereum. Ini akan membutuhkan penjembatanan ke arah sebaliknya, dari BTC ke WBTC yang kemudian dapat digunakan sebagai aset di Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Anda juga dapat melakukan semua hal di atas menggunakan [bursa terpusat](/get-eth). Namun, kecuali dana Anda sudah ada di bursa, ini akan melibatkan beberapa langkah, dan Anda mungkin akan lebih baik menggunakan jembatan.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Jenis-jenis jembatan {#types-of-bridge}

Jembatan memiliki banyak jenis desain dan kerumitan. Secara umum, jembatan dibagi menjadi dua kategori: jembatan tepercaya (trusted) dan jembatan tanpa kepercayaan (trustless).

| Jembatan Tepercaya (Trusted)                                                                                                                            | Jembatan Tanpa Kepercayaan (Trustless)                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Jembatan tepercaya bergantung pada entitas atau sistem pusat untuk operasinya.                                                                          | Jembatan tanpa kepercayaan beroperasi menggunakan kontrak pintar dan algoritma.                        |
| Mereka memiliki asumsi kepercayaan sehubungan dengan penyimpanan dana dan keamanan jembatan. Pengguna sebagian besar bergantung pada reputasi operator jembatan. | Mereka tanpa kepercayaan, yaitu, keamanan jembatan sama dengan keamanan blockchain yang mendasarinya. |
| Pengguna harus melepaskan kendali atas aset kripto mereka.                                                                                              | Melalui [kontrak pintar](/glossary/#smart-contract), jembatan tanpa kepercayaan memungkinkan pengguna untuk tetap memegang kendali atas dana mereka. |

Singkatnya, kita dapat mengatakan bahwa jembatan tepercaya memiliki asumsi kepercayaan, sedangkan jembatan tanpa kepercayaan meminimalkan kepercayaan dan tidak membuat asumsi kepercayaan baru di luar domain yang mendasarinya. Berikut adalah bagaimana istilah-istilah ini dapat dijelaskan:

- **Tanpa kepercayaan (Trustless)**: memiliki keamanan yang setara dengan domain yang mendasarinya. Seperti yang dijelaskan oleh [Arjun Bhuptani dalam artikel ini.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Asumsi kepercayaan (Trust assumptions):** menjauh dari keamanan domain yang mendasarinya dengan menambahkan pemverifikasi eksternal dalam sistem, sehingga membuatnya kurang aman secara kripto-ekonomi.

Untuk mengembangkan pemahaman yang lebih baik tentang perbedaan utama antara kedua pendekatan tersebut, mari kita ambil sebuah contoh:

Bayangkan Anda berada di pos pemeriksaan keamanan bandara. Ada dua jenis pos pemeriksaan:

1. Pos Pemeriksaan Manual — dioperasikan oleh petugas yang secara manual memeriksa semua detail tiket dan identitas Anda sebelum menyerahkan boarding pass.
2. Lapor Masuk Mandiri (Self Check-In) — dioperasikan oleh mesin di mana Anda memasukkan detail penerbangan Anda dan menerima boarding pass jika semuanya sesuai.

Pos pemeriksaan manual mirip dengan model tepercaya karena bergantung pada pihak ketiga, yaitu petugas, untuk operasinya. Sebagai pengguna, Anda memercayai petugas untuk membuat keputusan yang tepat dan menggunakan informasi pribadi Anda dengan benar.

Lapor masuk mandiri mirip dengan model tanpa kepercayaan karena menghilangkan peran operator dan menggunakan teknologi untuk operasinya. Pengguna selalu memegang kendali atas data mereka dan tidak perlu memercayai pihak ketiga dengan informasi pribadi mereka.

Banyak solusi penjembatanan mengadopsi model di antara kedua ekstrem ini dengan tingkat ketiadaan kepercayaan (trustlessness) yang bervariasi.

<Divider />

## Menggunakan jembatan {#use-bridge}

Menggunakan jembatan memungkinkan Anda untuk memindahkan aset Anda di berbagai blockchain yang berbeda. Berikut adalah beberapa sumber daya yang dapat membantu Anda menemukan dan menggunakan jembatan:

- **[Ringkasan Jembatan L2BEAT](https://l2beat.com/bridges/summary) & [Analisis Risiko Jembatan L2BEAT](https://l2beat.com/bridges/summary)**: Ringkasan komprehensif dari berbagai jembatan, termasuk detail tentang pangsa pasar, jenis jembatan, dan rantai tujuan. L2BEAT juga memiliki analisis risiko untuk jembatan, membantu pengguna membuat keputusan yang tepat saat memilih jembatan.
- **[Ringkasan Jembatan DefiLlama](https://defillama.com/bridges/Ethereum)**: Ringkasan volume jembatan di seluruh jaringan Ethereum.

<Divider />

## Risiko menggunakan jembatan {#bridge-risk}

Jembatan masih dalam tahap awal pengembangan. Kemungkinan besar desain jembatan yang optimal belum ditemukan. Berinteraksi dengan jenis jembatan apa pun membawa risiko:

- **Risiko Kontrak Pintar —** risiko adanya bug dalam kode yang dapat menyebabkan hilangnya dana pengguna
- **Risiko Teknologi —** kegagalan perangkat lunak, kode yang penuh bug, kesalahan manusia, spam, dan serangan berbahaya yang mungkin dapat mengganggu operasi pengguna

Selain itu, karena jembatan tepercaya menambahkan asumsi kepercayaan, mereka membawa risiko tambahan seperti:

- **Risiko Sensor —** operator jembatan secara teoritis dapat menghentikan pengguna dari mentransfer aset mereka menggunakan jembatan
- **Risiko Kustodian —** operator jembatan dapat berkolusi untuk mencuri dana pengguna

Dana pengguna berisiko jika:

- terdapat bug dalam kontrak pintar
- pengguna melakukan kesalahan
- blockchain yang mendasarinya diretas
- operator jembatan memiliki niat jahat dalam jembatan tepercaya
- jembatan diretas

Salah satu peretasan baru-baru ini adalah jembatan Wormhole Solana, [di mana 120 ribu wETH ($325 juta USD) dicuri selama peretasan](https://rekt.news/wormhole-rekt/). Banyak dari [peretasan teratas di blockchain melibatkan jembatan](https://rekt.news/leaderboard/).

Jembatan sangat penting untuk mengikutsertakan pengguna ke L2 Ethereum, dan bahkan bagi pengguna yang ingin menjelajahi ekosistem yang berbeda. Namun, mengingat risiko yang terlibat dalam berinteraksi dengan jembatan, pengguna harus memahami pertukaran (trade-off) yang dibuat oleh jembatan. Berikut adalah beberapa [strategi untuk keamanan lintas rantai](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Bacaan lebih lanjut {#further-reading}

- [EIP-5164: Eksekusi Lintas Rantai](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 Juni 2022 - Brendan Asselstine_
- [Kerangka Kerja Risiko L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 Juli 2022 - Bartek Kiepuszewski_
- ["Mengapa masa depan akan menjadi multi-rantai, tetapi tidak akan menjadi lintas rantai."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 Januari 2022 - Vitalik Buterin_
- [Memanfaatkan Keamanan Bersama Untuk Interoperabilitas Lintas Rantai yang Aman: Komite Status Lagrange Dan Seterusnya](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 Juni 2024 - Emmanuel Awosika_
- [Status Solusi Interoperabilitas Rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 Juni 2024 - Alex Hook_