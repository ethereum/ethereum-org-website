---
title: Jembatan
description: Gambaran umum tentang jembatan untuk pengembang
lang: id
---

Dengan menjamurnya rantai blok lapisan 1 (l1) dan solusi [penskalaan](/developers/docs/scaling/) lapisan 2 (l2), bersama dengan jumlah aplikasi terdesentralisasi (dapp) yang terus bertambah yang beralih ke lintas rantai, kebutuhan akan komunikasi dan pergerakan aset di seluruh rantai telah menjadi bagian penting dari infrastruktur jaringan. Berbagai jenis jembatan ada untuk membantu mewujudkan hal ini.

## Kebutuhan akan jembatan {#need-for-bridges}

Jembatan ada untuk menghubungkan jaringan rantai blok. Jembatan memungkinkan konektivitas dan interoperabilitas antar rantai blok.

Rantai blok ada di lingkungan yang terisolasi, yang berarti tidak ada cara bagi rantai blok untuk berdagang dan berkomunikasi dengan rantai blok lain secara alami. Akibatnya, meskipun mungkin ada aktivitas dan inovasi yang signifikan dalam suatu ekosistem, hal itu dibatasi oleh kurangnya konektivitas dan interoperabilitas dengan ekosistem lain.

Jembatan menawarkan cara bagi lingkungan rantai blok yang terisolasi untuk terhubung satu sama lain. Jembatan membangun rute transportasi antar rantai blok di mana token, pesan, data arbitrer, dan bahkan panggilan [kontrak pintar](/developers/docs/smart-contracts/) dapat ditransfer dari satu rantai ke rantai lainnya.

## Manfaat jembatan {#benefits-of-bridges}

Sederhananya, jembatan membuka banyak kasus penggunaan dengan memungkinkan jaringan rantai blok untuk bertukar data dan memindahkan aset di antara mereka.

Rantai blok memiliki kekuatan, kelemahan, dan pendekatan unik untuk membangun aplikasi (seperti kecepatan, laju pemrosesan, biaya, dll.). Jembatan membantu pengembangan ekosistem kripto secara keseluruhan dengan memungkinkan rantai blok untuk memanfaatkan inovasi satu sama lain.

Bagi pengembang, jembatan memungkinkan hal-hal berikut:

- transfer data, informasi, dan aset apa pun lintas rantai.
- membuka fitur dan kasus penggunaan baru untuk protokol karena jembatan memperluas ruang desain untuk apa yang dapat ditawarkan protokol. Misalnya, protokol untuk yield farming yang awalnya disebarkan di Mainnet [Ethereum](/) dapat menawarkan kumpulan likuiditas di semua rantai yang kompatibel dengan EVM.
- kesempatan untuk memanfaatkan kekuatan dari berbagai rantai blok. Misalnya, pengembang dapat memperoleh manfaat dari biaya yang lebih rendah yang ditawarkan oleh berbagai solusi lapisan 2 (l2) dengan menyebarkan dapp mereka di seluruh rollup, dan sidechain serta pengguna dapat menjembatani di antara mereka.
- kolaborasi di antara pengembang dari berbagai ekosistem rantai blok untuk membangun produk baru.
- menarik pengguna dan komunitas dari berbagai ekosistem ke dapp mereka.

## Bagaimana cara kerja jembatan? {#how-do-bridges-work}

Meskipun ada banyak [jenis desain jembatan](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), tiga cara untuk memfasilitasi transfer aset lintas rantai sangat menonjol:

- **Kunci dan cetak –** Mengunci aset di rantai sumber dan mencetak aset di rantai tujuan.
- **Bakar dan cetak –** Membakar aset di rantai sumber dan mencetak aset di rantai tujuan.
- **Tukar atomik (Atomic swaps) –** Menukar aset di rantai sumber dengan aset di rantai tujuan dengan pihak lain.

## Jenis-jenis jembatan {#bridge-types}

Jembatan biasanya dapat diklasifikasikan ke dalam salah satu kategori berikut:

- **Jembatan asli (Native bridges) –** Jembatan ini biasanya dibangun untuk memulai likuiditas pada rantai blok tertentu, sehingga memudahkan pengguna untuk memindahkan dana ke ekosistem. Misalnya, [Arbitrum Bridge](https://bridge.arbitrum.io/) dibangun untuk memudahkan pengguna menjembatani dari Mainnet Ethereum ke Arbitrum. Jembatan lain semacam itu termasuk Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge), dll.
- **Jembatan berbasis validator atau orakel –** Jembatan ini bergantung pada set validator eksternal atau orakel untuk memvalidasi transfer lintas rantai. Contoh: Multichain dan Across.
- **Jembatan penyampaian pesan umum –** Jembatan ini dapat mentransfer aset, bersama dengan pesan dan data arbitrer lintas rantai. Contoh: Axelar, LayerZero, dan Nomad.
- **Jaringan likuiditas –** Jembatan ini terutama berfokus pada transfer aset dari satu rantai ke rantai lainnya melalui tukar atomik. Umumnya, mereka tidak mendukung penyampaian pesan lintas rantai. Contoh: Connext dan Hop.

## Pertimbangan untung-rugi (Trade-offs) {#trade-offs}

Dengan jembatan, tidak ada solusi yang sempurna. Sebaliknya, hanya ada pertimbangan untung-rugi yang dibuat untuk memenuhi suatu tujuan. Pengembang dan pengguna dapat mengevaluasi jembatan berdasarkan faktor-faktor berikut:

- **Keamanan –** Siapa yang memverifikasi sistem? Jembatan yang diamankan oleh validator eksternal biasanya kurang aman dibandingkan jembatan yang diamankan secara lokal atau asli oleh validator rantai blok.
- **Kenyamanan –** Berapa lama waktu yang dibutuhkan untuk menyelesaikan transaksi, dan berapa banyak transaksi yang perlu ditandatangani pengguna? Bagi pengembang, berapa lama waktu yang dibutuhkan untuk mengintegrasikan jembatan, dan seberapa kompleks prosesnya?
- **Konektivitas –** Apa saja rantai tujuan berbeda yang dapat dihubungkan oleh jembatan (yaitu, rollup, sidechain, rantai blok lapisan 1 lainnya, dll.), dan seberapa sulit untuk mengintegrasikan rantai blok baru?
- **Kemampuan untuk meneruskan data yang lebih kompleks –** Dapatkah jembatan memungkinkan transfer pesan dan data arbitrer yang lebih kompleks lintas rantai, atau apakah ia hanya mendukung transfer aset lintas rantai?
- **Efektivitas biaya –** Berapa biaya untuk mentransfer aset lintas rantai melalui jembatan? Biasanya, jembatan mengenakan biaya tetap atau variabel tergantung pada biaya gas dan likuiditas rute tertentu. Penting juga untuk mengevaluasi efektivitas biaya jembatan berdasarkan modal yang dibutuhkan untuk memastikan keamanannya.

Pada tingkat tinggi, jembatan dapat dikategorikan sebagai tepercaya (trusted) dan tanpa kepercayaan (trustless).

- **Tepercaya (Trusted) –** Jembatan tepercaya diverifikasi secara eksternal. Mereka menggunakan sekumpulan pemverifikasi eksternal (Federasi dengan multi-sig, sistem komputasi multi-pihak, jaringan orakel) untuk mengirim data lintas rantai. Akibatnya, mereka dapat menawarkan konektivitas yang hebat dan memungkinkan penyampaian pesan yang sepenuhnya umum lintas rantai. Mereka juga cenderung berkinerja baik dalam hal kecepatan dan efektivitas biaya. Hal ini mengorbankan keamanan, karena pengguna harus bergantung pada keamanan jembatan.
- **Tanpa kepercayaan (Trustless) –** Jembatan ini bergantung pada rantai blok yang mereka hubungkan dan validatornya untuk mentransfer pesan dan token. Mereka 'tanpa kepercayaan' karena mereka tidak menambahkan asumsi kepercayaan baru (selain rantai blok). Akibatnya, jembatan tanpa kepercayaan dianggap lebih aman daripada jembatan tepercaya.

Untuk mengevaluasi jembatan tanpa kepercayaan berdasarkan faktor lain, kita harus memecahnya menjadi jembatan penyampaian pesan umum dan jaringan likuiditas.

- **Jembatan penyampaian pesan umum –** Jembatan ini unggul dalam keamanan dan kemampuan untuk mentransfer data yang lebih kompleks lintas rantai. Biasanya, mereka juga baik dalam efektivitas biaya. Namun, kekuatan ini umumnya mengorbankan konektivitas untuk jembatan klien ringan (contoh: IBC) dan kelemahan kecepatan untuk jembatan optimis (contoh: Nomad) yang menggunakan bukti penipuan.
- **Jaringan likuiditas –** Jembatan ini menggunakan tukar atomik untuk mentransfer aset dan merupakan sistem yang diverifikasi secara lokal (yaitu, mereka menggunakan validator rantai blok yang mendasarinya untuk memverifikasi transaksi). Akibatnya, mereka unggul dalam keamanan dan kecepatan. Selain itu, mereka dianggap relatif hemat biaya dan menawarkan konektivitas yang baik. Namun, pertukaran utamanya adalah ketidakmampuan mereka untuk meneruskan data yang lebih kompleks – karena mereka tidak mendukung penyampaian pesan lintas rantai.

## Risiko dengan jembatan {#risk-with-bridges}

Jembatan menyumbang tiga [peretasan terbesar di keuangan terdesentralisasi (DeFi)](https://rekt.news/leaderboard/) teratas dan masih dalam tahap awal pengembangan. Menggunakan jembatan apa pun membawa risiko berikut:

- **Risiko kontrak pintar –** Meskipun banyak jembatan telah berhasil melewati audit, hanya butuh satu kelemahan dalam kontrak pintar agar aset terpapar peretasan (contoh: [Wormhole Bridge Solana](https://rekt.news/wormhole-rekt/)).
- **Risiko keuangan sistemik** – Banyak jembatan menggunakan aset yang dibungkus (wrapped assets) untuk mencetak versi kanonik dari aset asli di rantai baru. Hal ini memaparkan ekosistem pada risiko sistemik, seperti yang telah kita lihat pada versi token yang dibungkus yang dieksploitasi.
- **Risiko pihak lawan (Counterparty risk) –** Beberapa jembatan menggunakan desain tepercaya yang mewajibkan pengguna untuk bergantung pada asumsi bahwa validator tidak akan berkolusi untuk mencuri dana pengguna. Kebutuhan pengguna untuk memercayai aktor pihak ketiga ini memaparkan mereka pada risiko seperti rug pull, penyensoran, dan aktivitas berbahaya lainnya.
- **Masalah terbuka –** Mengingat jembatan masih dalam tahap awal pengembangan, ada banyak pertanyaan yang belum terjawab terkait bagaimana jembatan akan berkinerja dalam kondisi pasar yang berbeda, seperti saat kemacetan jaringan dan selama peristiwa tak terduga seperti serangan tingkat jaringan atau pengembalian state. Ketidakpastian ini menimbulkan risiko tertentu, yang tingkatannya masih belum diketahui.

## Bagaimana dapp dapat menggunakan jembatan? {#how-can-dapps-use-bridges}

Berikut adalah beberapa aplikasi praktis yang dapat dipertimbangkan pengembang tentang jembatan dan membawa dapp mereka ke lintas rantai:

### Mengintegrasikan jembatan {#integrating-bridges}

Bagi pengembang, ada banyak cara untuk menambahkan dukungan untuk jembatan:

1. **Membangun jembatan Anda sendiri –** Membangun jembatan yang aman dan andal tidaklah mudah, terutama jika Anda mengambil rute yang lebih minim kepercayaan. Selain itu, ini membutuhkan pengalaman bertahun-tahun dan keahlian teknis yang terkait dengan studi skalabilitas dan interoperabilitas. Selain itu, ini akan membutuhkan tim yang turun tangan langsung untuk memelihara jembatan dan menarik likuiditas yang cukup untuk membuatnya layak.

2. **Menunjukkan kepada pengguna beberapa opsi jembatan –** Banyak [dapp](/developers/docs/dapps/) mewajibkan pengguna untuk memiliki token asli mereka untuk berinteraksi dengannya. Untuk memungkinkan pengguna mengakses token mereka, mereka menawarkan opsi jembatan yang berbeda di situs web mereka. Namun, metode ini adalah perbaikan cepat untuk masalah tersebut karena menjauhkan pengguna dari antarmuka dapp dan masih mewajibkan mereka untuk berinteraksi dengan dapp dan jembatan lain. Ini adalah pengalaman orientasi yang rumit dengan peningkatan ruang lingkup untuk membuat kesalahan.

3. **Mengintegrasikan jembatan –** Solusi ini tidak mewajibkan dapp untuk mengirim pengguna ke antarmuka jembatan eksternal dan DEX. Ini memungkinkan dapp untuk meningkatkan pengalaman orientasi pengguna. Namun, pendekatan ini memiliki keterbatasan:

   - Penilaian dan pemeliharaan jembatan itu sulit dan memakan waktu.
   - Memilih satu jembatan menciptakan satu titik kegagalan dan ketergantungan.
   - Dapp dibatasi oleh kemampuan jembatan.
   - Jembatan saja mungkin tidak cukup. Dapp mungkin memerlukan DEX untuk menawarkan lebih banyak fungsionalitas seperti tukar lintas rantai.

4. **Mengintegrasikan beberapa jembatan –** Solusi ini memecahkan banyak masalah yang terkait dengan mengintegrasikan satu jembatan. Namun, ini juga memiliki keterbatasan, karena mengintegrasikan beberapa jembatan menghabiskan sumber daya dan menciptakan beban teknis dan komunikasi bagi pengembang—sumber daya paling langka di kripto.

5. **Mengintegrasikan agregator jembatan –** Opsi lain untuk dapp adalah mengintegrasikan solusi agregasi jembatan yang memberi mereka akses ke beberapa jembatan. Agregator jembatan mewarisi kekuatan semua jembatan dan karenanya tidak dibatasi oleh kemampuan jembatan tunggal mana pun. Khususnya, agregator jembatan biasanya memelihara integrasi jembatan, yang menyelamatkan dapp dari kerumitan untuk tetap mengikuti aspek teknis dan operasional dari integrasi jembatan.

Meskipun demikian, agregator jembatan juga memiliki keterbatasan. Misalnya, meskipun mereka dapat menawarkan lebih banyak opsi jembatan, biasanya ada lebih banyak jembatan yang tersedia di pasar selain yang ditawarkan di platform agregator. Selain itu, sama seperti jembatan, agregator jembatan juga terpapar pada risiko kontrak pintar dan teknologi (lebih banyak kontrak pintar = lebih banyak risiko).

Jika dapp mengambil rute mengintegrasikan jembatan atau agregator, ada opsi berbeda berdasarkan seberapa dalam integrasi yang dimaksudkan. Misalnya, jika itu hanya integrasi front-end untuk meningkatkan pengalaman orientasi pengguna, dapp akan mengintegrasikan widget. Namun, jika integrasi tersebut untuk mengeksplorasi strategi lintas rantai yang lebih dalam seperti staking, yield farming, dll., dapp mengintegrasikan SDK atau API.

### Menyebarkan dapp di beberapa rantai {#deploying-a-dapp-on-multiple-chains}

Untuk menyebarkan dapp di beberapa rantai, pengembang dapat menggunakan platform pengembangan seperti [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), dll. Biasanya, platform ini dilengkapi dengan plugin yang dapat disusun yang dapat memungkinkan dapp untuk beralih ke lintas rantai. Misalnya, pengembang dapat menggunakan proksi penyebaran deterministik yang ditawarkan oleh [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Contoh: {#examples}

- [Cara membangun dapp lintas rantai](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Membangun Pasar NFT Lintas Rantai](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Membangun dapp NFT lintas rantai](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Memantau aktivitas kontrak lintas rantai {#monitoring-contract-activity-across-chains}

Untuk memantau aktivitas kontrak lintas rantai, pengembang dapat menggunakan subgraf dan platform pengembang seperti Tenderly untuk mengamati kontrak pintar secara real-time. Platform semacam itu juga memiliki alat yang menawarkan fungsionalitas pemantauan data yang lebih besar untuk aktivitas lintas rantai, seperti memeriksa [peristiwa yang dipancarkan oleh kontrak](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), dll.

#### Alat {#tools}

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Bacaan lebih lanjut {#further-reading}

- [Jembatan Rantai Blok](/bridges/) – ethereum.org
- [Kerangka Kerja Risiko Jembatan L2BEAT](https://l2beat.com/bridges/summary)
- [Blockchain Bridges: Building Networks of Cryptonetworks](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 Sep 2021 – Dmitriy Berenzon
- [The Interoperability Trilemma](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 Okt 2021 – Arjun Bhuptani
- [Clusters: How Trusted & Trust-Minimized Bridges Shape the Multi-Chain Landscape](https://blog.celestia.org/clusters/) - 4 Okt 2021 – Mustafa Al-Bassam
- [LI.FI: With Bridges, Trust is a Spectrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 Apr 2022 – Arjun Chand
- [The State Of Rollup Interoperability Solutions](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 Jun 2024 – Alex Hook
- [Harnessing Shared Security For Secure Cross-Chain Interoperability: Lagrange State Committees And Beyond](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 Jun 2024 – Emmanuel Awosika

Selain itu, berikut adalah beberapa presentasi berwawasan dari [James Prestwich](https://twitter.com/_prestwich) yang dapat membantu mengembangkan pemahaman yang lebih dalam tentang jembatan:

- [Building Bridges, Not Walled Gardens](https://youtu.be/ZQJWMiX4hT0)
- [Breaking Down Bridges](https://youtu.be/b0mC-ZqN8Oo)
- [Why are the Bridges Burning](https://youtu.be/c7cm2kd20j8)