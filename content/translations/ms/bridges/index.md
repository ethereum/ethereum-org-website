---
title: Pengenalan kepada hubungan blok rantai
description: Jambatan membolehkan pengguna untuk memindahkan dana mereka di seluruh blok rantai yang berbeza
lang: ms
---

# Jambatan blok rantai {#prerequisites}

_Web3 telah berkembang menjadi ekosistem blok rantai L1 dan penyelesaian pengukuran L2, masing-masing direka dengan keupayaan dan pertukaran yang unik. Apabila bilangan protokol blok rantai meningkat, begitu juga permintaan untuk memindahkan aset merentasi rantaian. Untuk memenuhi permintaan ini, kami memerlukan jambatan._

<Divider />

## Apakah jambatan? {#what-are-bridges}

Jambatan blok rantai berfungsi seperti jambatan yang kita tahu di dunia fizikal. Sama seperti jambatan fizikal menghubungkan dua lokasi fizikal, jambatan blok rantai menghubungkan dua ekosistem blok rantai. **Jambatan memudahkan komunikasi antara blok rantai melalui pemindahan maklumat dan aset**.

Mari kita lihat contoh:

Anda dari Amerika Syarikat dan merancang perjalanan ke Eropah. Anda mempunyai USD, tetapi anda memerlukan EUR untuk berbelanja. Untuk menukar USD anda kepada EUR anda boleh menggunakan pertukaran mata wang dengan sedikit yuran.

Tetapi, apa yang patut anda lakukan jika anda ingin membuat pertukaran yang serupa untuk menggunakan [blok rantai](/glossary/#blockchain) yang berbeza? Katakan anda ingin menukar [ETH](/glossary/#ether) pada Rangkaian Utama Ethereum untuk ETH pada[Arbitrum](https://arbitrum.io/). Seperti pertukaran mata wang yang kami buat untuk EUR, kami memerlukan mekanisme untuk memindahkan ETH kami daripada Ethereum kepada Arbitrum. Jambatan membolehkan transaksi sedemikian. Dalam kes ini, [Arbitrum mempunyai jambatan asal](https://bridge.arbitrum.io/) yang boleh memindahkan ETH dari Rangkaian Utama ke Arbitrum.

## Mengapakah kita memerlukan jambatan? {#why-do-we-need-bridges}

Semua blok rantai mempunyai batasan. Untuk Ethereum meningkat dan memenuhi permintaan, ia memerlukan [peningkatan](/glossary/#rollups). Sebagai alternatif, L1 seperti Solana dan Avalanche direka dengan cara yang berbeza untuk membolehkan daya pengeluaran yang lebih tinggi tetapi mengorbankan keteragihan.

Walau bagaimanapun, semua rantai blok berkembang dalam persekitaran terpencil dan mempunyai peraturan dan mekanisme [konsensus](/glossary/#consensus) yang berbeza. Ini bermakna ia tidak boleh berkomunikasi secara semulajadi, dan token tidak boleh bergerak bebas antara blok rantai.

Jambatan wujud untuk menyambung blok rantai, membolehkan pemindahan maklumat dan token antaranya.

**Jambatan membolehkan**:

- pemindahan rantaian rentas aset dan maklumat.
- [dapp](/glossary/#dapp) untuk mengakses kekuatan pelbagai rantai blok – sekali gus meningkatkan keupayaan mereka (kerana protokol kini mempunyai lebih banyak ruang reka bentuk untuk inovasi).
- pengguna untuk mengakses platform baru dan memanfaatkan faedah rantai yang berbeza.
- pemaju daripada ekosistem blok rantai yang berbeza untuk bekerjasama dan membina platform baru untuk pengguna.

[Bagaimana untuk mentautkan tokens ke layer 2](/guides/how-to-use-a-bridge/)

<Divider />

## Jambatan menggunakan kes {#bridge-use-cases}

Berikut adalah beberapa senario di mana anda boleh menggunakan jambatan:

### Yuran transaksi yang lebih rendah {#transaction-fees}

Katakan anda mempunyai ETH di Rangkaian Utama Ethereum tetapi mahu yuran transaksi yang lebih murah untuk meneroka dapp yang berbeza. Dengan merapatkan ETH anda dari Rangkaian Utama ke peningkatan Ethereum L2, anda boleh menikmati yuran transaksi yang lebih rendah.

### Dapp pada blok rantai lain {#dapps-other-chains}

Jika anda telah menggunakan Aave pada Rangkaian Utama Ethereum untuk meminjamkan USDT tetapi kadar faedah untuk meminjamkan USDT menggunakan Aave pada Polygon lebih tinggi.

### Terokai ekosistem blok rantai {#explore-ecosystems}

Jika anda mempunyai ETH di Rangkaian Utama Ethereum dan anda ingin meneroka alt L1 untuk mencuba dapp asli mereka. Anda boleh menggunakan jambatan untuk memindahkan ETH anda dari Rangkaian Utama Ethereum ke alt L1.

### Miliki aset kripto asli {#own-native}

Katakan anda mahu memiliki Bitcoin asli (BTC), tetapi anda hanya mempunyai dana di Rangkaian Utama Ethereum. Untuk mendapatkan pendedahan kepada BTC pada Ethereum, anda boleh membeli Bitcoin Berbalut (WBTC). Walau bagaimanapun, WBTC ialah token [ERC-20](/glossary/#erc-20) asli kepada rangkaian Ethereum, yang bermaksud ia adalah versi Ethereum Bitcoin dan bukan aset asal pada blok rantai Bitcoin. Untuk memiliki BTC asli, anda perlu merapatkan aset anda daripada Ethereum kepada Bitcoin menggunakan jambatan. Ini akan merapatkan WBTC anda dan menukarnya kepada BTC asli. Sebagai alternatif, anda mungkin memiliki BTC dan ingin menggunakannya dalam protokol Ethereum [DeFi](/glossary/#defi) . Ini akan memerlukan merapatkan cara lain, dari BTC kepada WBTC yang kemudian boleh digunakan sebagai aset pada Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  Anda juga boleh melakukan semua perkara di atas menggunakan <a href="/get-eth/">pertukaran terpusat</a>. Namun, melainkan dana anda sudah berada di bursa, ia akan melibatkan beberapa langkah, dan anda mungkin akan lebih baik menggunakan jambatan.
</InfoBanner>

<Divider />

## Jenis-jenis jambatan {#types-of-bridge}

Jambatan mempunyai pelbagai jenis reka bentuk dan kerumitan. Secara umumnya, jambatan jatuh kepada dua kategori: jambatan yang boleh dipercayai dan jambatan tanpa kepercayaan.

| Jambatan Dipercayai                                                                                                                                                  | Jambatan Tanpa Kepercayaan                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Jambatan yang dipercayai bergantung kepada entiti pusat atau sistem untuk operasi mereka.                                                                            | Jambatan tanpa kepercayaan beroperasi menggunakan kontrak pintar dan algoritma.                                                  |
| Jambatan mempunyai andaian kepercayaan berkenaan dengan jagaan dana dan keselamatan jambatan. Pengguna kebanyakannya bergantung kepada reputasi pengendali jambatan. | Jambatan tanpa kepercayaan, iaitu keselamatan jambatan adalah sama seperti blok rantai asas.                                     |
| Pengguna perlu melepaskan kawalan aset kripto mereka.                                                                                                                | Melalui [kontrak pintar](/glossary/#smart-contract), jambatan tanpa kepercayaan membolehkan pengguna kekal mengawal dana mereka. |

Secara ringkasnya, kita boleh mengatakan bahawa jambatan yang dipercayai mempunyai andaian kepercayaan, sedangkan jambatan tanpa kepercayaan mempunyai kepercayaan yang minimum dan tidak membuat andaian kepercayaan baru di luar domain asas. Berikut ialah cara istilah-istilah ini boleh diterangkan:

- **Tanpa kepercayaan**: mempunyai keselamatan yang setara dengan domain asas. Seperti yang diterangkan oleh [Arjun Bhuptani dalam artikel ini.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Andaian kepercayaan:**bergerak jauh daripada keselamatan domain asas dengan menambah pengesahan luaran dalam sistem, dengan itu menjadikannya satu kripto ekonomi yang kurang selamat.

Untuk mengembangkan pemahaman yang lebih baik tentang perbezaan utama antara dua pendekatan tersebut, mari kita ambil satu contoh:

Bayangkan anda berada di pusat pemeriksaan keselamatan lapangan terbang. Terdapat dua jenis pusat pemeriksaan:

1. Pemeriksaan Manual — dikendalikan oleh para pegawai yang memeriksa semua butiran tiket dan identiti anda secara manual sebelum menyerahkan pas masuk.
2. Daftar Masuk Sendiri — dikendalikan oleh mesin di mana anda memasukkan butiran penerbangan anda dan menerima pas masuk jika segala-galanya sah.

Pusat pemeriksaan manual adalah serupa dengan model yang dipercayai kerana ia bergantung kepada pihak ketiga, iaitu pegawai, untuk operasinya. Sebagai pengguna, anda percaya kepada para pegawai untuk membuat keputusan yang betul dan menggunakan maklumat peribadi anda dengan betul.

Daftar masuk sendiri serupa dengan model tanpa kepercayaan kerana ia mengeluarkan peranan pengendali dan menggunakan teknologi dalam pengendaliannya. Pengguna sentiasa kekal dalam mengawal data mereka dan tidak perlu mempercayai pihak ketiga dengan maklumat peribadi mereka.

Banyak penyelesaian jambatan mengguna pakai model antara dua ekstrem ini dengan pelbagai tahap tanpa kepercayaan.

<Divider />

## Gunakan jambatan {#use-bridge}

Menggunakan jambatan membolehkan anda mengalihkan aset anda merentasi blok rantai yang berbeza. Berikut ialah beberapa sumber yang boleh membantu anda mencari dan menggunakan jambatan:

- **[Ringkasan Jambatan L2BEAT](https://l2beat.com/bridges/summary) & [Analisis Risiko Jambatan L2BEAT](https://l2beat.com/bridges/risk)**: Ringkasan komprehensif pelbagai jambatan, termasuk butiran mengenai pasaran saham, jenis jambatan dan rantaian destinasi. L2BEAT juga mempunyai analisis risiko untuk jambatan, membantu pengguna membuat keputusan termaklum apabila memilih jambatan.
- **[Ringkasan Jambatan DefiLlama](https://defillama.com/bridges/Ethereum)**: Ringkasan bilangan jambatan merentas rangkaian Ethereum.

<Divider />

## Risiko menggunakan jambatan {#bridge-risk}

Jambatan berada dalam peringkat awal perkembangan. Kemungkinan reka bentuk jambatan optimum belum ditemukan. Berinteraksi dengan apa-apa jenis jambatan mempunyai risiko:

- **Risiko Kontrak Pintar —** risiko pepijat dalam kod yang boleh menyebabkan dana pengguna hilang
- **Risiko Teknologi —** kegagalan perisian, kod bermasalah, kesilapan manusia, spam, dan serangan berniat jahat mungkin boleh mengganggu operasi pengguna

Selain itu, memandangkan jambatan yang dipercayai menambah andaian kepercayaan, ia mempunyai risiko tambahan seperti:

- ** Risiko Penapisan —** pengendali jambatan secara teori boleh menghalang pengguna daripada memindahkan aset mereka menggunakan jambatan
- **Risiko Penapisan —** pengendali jambatan setara teori boleh berkomplot mencuri dana pengguna

Dana pengguna berisiko jika:

- terdapat pepijat dalam kontrak pintar
- pengguna telah membuat kesilapan
- blok rantai asas digodam
- pengendali jambatan mempunyai niat berniat jahat di jambatan yang dipercayai
- jambatan telah digodam

Satu penggodaman baru-baru ini ialah jambatan Wormhole Solana, [di mana 120k wETH ($325 juta USD) dicuri semasa penggodaman.](https://rekt.news/wormhole-rekt/). Kebanyakan [ penggodaman terbesar dalam blok rantai melibatkan jambatan](https://rekt.news/leaderboard/).

Jambatan adalah penting untuk membawa pengguna ke Ethereum L2, dan juga untuk pengguna yang ingin meneroka ekosistem yang berbeza. Namun, memandangkan risiko yang terlibat dalam berinteraksi dengan jambatan, pengguna mesti memahami pertukaran yang dibuat oleh jambatan tersebut. Ini ialah beberapa [strategi untuk keselamatan rentas rantaian](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Bacaan lanjut {#further-reading}

- [EIP-5164: Pelaksanaan Rentas Rantaian](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _18 Jun 2022 - Brendan Asselstine_
- [Rangka Kerja Risiko L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _5 Julai 2022 - Bartek Kiepuszewski_
- ["Sebab masa depan akan menjadi berbilang rantai, tetapi tidak akan menjadi bersilang rantai."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _ 8 Januari 2022 - Vitalik Buterin_
