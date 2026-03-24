---
title: Jembatan
description: Gambaran umum tentang jembatan untuk pengembang
lang: id
---

Dengan menjamurnya blockchain L1 dan solusi [peningkatan](/developers/docs/scaling/) L2, bersama dengan jumlah aplikasi terdesentralisasi yang terus bertambah yang beralih ke lintas rantai, kebutuhan akan komunikasi dan pergerakan aset lintas rantai telah menjadi bagian penting dari infrastruktur jaringan. Berbagai jenis jembatan ada untuk membantu mewujudkan hal ini.

## Kebutuhan akan jembatan {#need-for-bridges}

Jembatan ada untuk menghubungkan jaringan blockchain. Mereka memungkinkan konektivitas dan interoperabilitas antar blockchain.

Blockchain ada dalam lingkungan yang terisolasi, yang berarti tidak ada cara bagi blockchain untuk berdagang dan berkomunikasi dengan blockchain lain secara alami. Akibatnya, meskipun mungkin ada aktivitas dan inovasi yang signifikan dalam suatu ekosistem, hal itu dibatasi oleh kurangnya konektivitas dan interoperabilitas dengan ekosistem lain.

Jembatan menawarkan cara bagi lingkungan blockchain yang terisolasi untuk terhubung satu sama lain. Mereka membangun rute transportasi antar blockchain di mana token, pesan, data arbitrer, dan bahkan panggilan [kontrak pintar](/developers/docs/smart-contracts/) dapat ditransfer dari satu rantai ke rantai lainnya.

## Manfaat jembatan {#benefits-of-bridges}

Sederhananya, jembatan membuka banyak kasus penggunaan dengan memungkinkan jaringan blockchain untuk bertukar data dan memindahkan aset di antara mereka.

Blockchain memiliki kekuatan, kelemahan, dan pendekatan unik untuk membangun aplikasi (seperti kecepatan, throughput, biaya, dll.). Jembatan membantu pengembangan ekosistem kripto secara keseluruhan dengan memungkinkan blockchain untuk memanfaatkan inovasi satu sama lain.

Bagi pengembang, jembatan memungkinkan hal-hal berikut:

- transfer data, informasi, dan aset apa pun lintas rantai.
- membuka fitur dan kasus penggunaan baru untuk protokol karena jembatan memperluas ruang desain untuk apa yang dapat ditawarkan oleh protokol. Misalnya, protokol untuk yield farming yang awalnya diterapkan di Mainnet [Ethereum](/) dapat menawarkan kolam likuiditas di semua rantai yang kompatibel dengan EVM.
- kesempatan untuk memanfaatkan kekuatan dari berbagai blockchain. Misalnya, pengembang dapat memperoleh manfaat dari biaya yang lebih rendah yang ditawarkan oleh berbagai solusi L2 dengan menerapkan dapps mereka di seluruh rollup, dan sidechain serta pengguna dapat menjembatani di antara mereka.
- kolaborasi di antara para pengembang dari berbagai ekosistem blockchain untuk membangun produk baru.
- menarik pengguna dan komunitas dari berbagai ekosistem ke dapps mereka.

## Bagaimana cara kerja jembatan? {#how-do-bridges-work}

Meskipun ada banyak [jenis desain jembatan](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), tiga cara untuk memfasilitasi transfer aset lintas rantai sangat menonjol:

- **Kunci dan mint –** Mengunci aset di rantai sumber dan melakukan mint aset di rantai tujuan.
- **Bakar dan mint –** Membakar aset di rantai sumber dan melakukan mint aset di rantai tujuan.
- **Tukar atomik –** Menukar aset di rantai sumber dengan aset di rantai tujuan dengan pihak lain.

## Jenis-jenis jembatan {#bridge-types}

Jembatan biasanya dapat diklasifikasikan ke dalam salah satu kategori berikut:

- **Jembatan asli (Native bridges) –** Jembatan ini biasanya dibangun untuk memulai likuiditas pada blockchain tertentu, sehingga memudahkan pengguna untuk memindahkan dana ke ekosistem tersebut. Misalnya, [Arbitrum Bridge](https://bridge.arbitrum.io/) dibangun untuk memudahkan pengguna menjembatani dari Mainnet Ethereum ke Arbitrum. Jembatan lain semacam itu termasuk Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge), dll.
- **Jembatan berbasis validator atau oracle –** Jembatan ini bergantung pada kumpulan validator eksternal atau oracle untuk memvalidasi transfer lintas rantai. Contoh: Multichain dan Across.
- **Jembatan penyampaian pesan umum –** Jembatan ini dapat mentransfer aset, bersama dengan pesan dan data arbitrer lintas rantai. Contoh: Axelar, LayerZero, dan Nomad.
- **Jaringan likuiditas –** Jembatan ini terutama berfokus pada transfer aset dari satu rantai ke rantai lain melalui tukar atomik. Umumnya, mereka tidak mendukung penyampaian pesan lintas rantai. Contoh: Connext dan Hop.

## Pertukaran (trade-off) yang perlu dipertimbangkan {#trade-offs}

Dengan jembatan, tidak ada solusi yang sempurna. Sebaliknya, hanya ada pertukaran (trade-off) yang dibuat untuk memenuhi suatu tujuan. Pengembang dan pengguna dapat mengevaluasi jembatan berdasarkan faktor-faktor berikut:

- **Keamanan –** Siapa yang memverifikasi sistem? Jembatan yang diamankan oleh validator eksternal biasanya kurang aman dibandingkan jembatan yang diamankan secara lokal atau asli oleh validator blockchain.
- **Kenyamanan –** Berapa lama waktu yang dibutuhkan untuk menyelesaikan transaksi, dan berapa banyak transaksi yang perlu ditandatangani oleh pengguna? Bagi seorang pengembang, berapa lama waktu yang dibutuhkan untuk mengintegrasikan jembatan, dan seberapa kompleks prosesnya?
- **Konektivitas –** Apa saja rantai tujuan berbeda yang dapat dihubungkan oleh jembatan (yaitu, rollup, sidechain, blockchain layer 1 lainnya, dll.), dan seberapa sulitkah mengintegrasikan blockchain baru?
- **Kemampuan untuk meneruskan data yang lebih kompleks –** Dapatkah jembatan memungkinkan transfer pesan dan data arbitrer yang lebih kompleks lintas rantai, atau apakah ia hanya mendukung transfer aset lintas rantai?
- **Efektivitas biaya –** Berapa biaya untuk mentransfer aset lintas rantai melalui jembatan? Biasanya, jembatan mengenakan biaya tetap atau variabel tergantung pada biaya gas dan likuiditas rute tertentu. Sangat penting juga untuk mengevaluasi efektivitas biaya jembatan berdasarkan modal yang dibutuhkan untuk memastikan keamanannya.

Pada tingkat tinggi, jembatan dapat dikategorikan sebagai tepercaya (trusted) dan tanpa kepercayaan (trustless).

- **Tepercaya (Trusted) –** Jembatan tepercaya diverifikasi secara eksternal. Mereka menggunakan sekumpulan pemverifikasi eksternal (Federasi dengan multi tanda tangan, sistem komputasi multi-pihak, jaringan oracle) untuk mengirim data lintas rantai. Akibatnya, mereka dapat menawarkan konektivitas yang hebat dan memungkinkan penyampaian pesan yang sepenuhnya umum lintas rantai. Mereka juga cenderung berkinerja baik dalam hal kecepatan dan efektivitas biaya. Hal ini mengorbankan keamanan, karena pengguna harus bergantung pada keamanan jembatan.
- **Tanpa kepercayaan (Trustless) –** Jembatan ini bergantung pada blockchain yang mereka hubungkan dan validator mereka untuk mentransfer pesan dan token. Mereka 'tanpa kepercayaan' karena mereka tidak menambahkan asumsi kepercayaan baru (selain blockchain). Akibatnya, jembatan tanpa kepercayaan dianggap lebih aman daripada jembatan tepercaya.

Untuk mengevaluasi jembatan tanpa kepercayaan berdasarkan faktor lain, kita harus membaginya menjadi jembatan penyampaian pesan umum dan jaringan likuiditas.

- **Jembatan penyampaian pesan umum –** Jembatan ini unggul dalam keamanan dan kemampuan untuk mentransfer data yang lebih kompleks lintas rantai. Biasanya, mereka juga baik dalam efektivitas biaya. Namun, kekuatan ini umumnya mengorbankan konektivitas untuk jembatan klien ringan (contoh: IBC) dan kelemahan kecepatan untuk jembatan optimis (contoh: Nomad) yang menggunakan anti-penipuan.
- **Jaringan likuiditas –** Jembatan ini menggunakan tukar atomik untuk mentransfer aset dan merupakan sistem yang diverifikasi secara lokal (yaitu, mereka menggunakan validator blockchain yang mendasarinya untuk memverifikasi transaksi). Akibatnya, mereka unggul dalam keamanan dan kecepatan. Selain itu, mereka dianggap relatif hemat biaya dan menawarkan konektivitas yang baik. Namun, pertukaran (trade-off) utamanya adalah ketidakmampuan mereka untuk meneruskan data yang lebih kompleks – karena mereka tidak mendukung penyampaian pesan lintas rantai.

## Risiko dengan jembatan {#risk-with-bridges}

Jembatan menyumbang tiga [peretasan terbesar di DeFi](https://rekt.news/leaderboard/) teratas dan masih dalam tahap awal pengembangan. Menggunakan jembatan apa pun membawa risiko berikut:

- **Risiko kontrak pintar –** Meskipun banyak jembatan telah berhasil melewati audit, hanya butuh satu kelemahan dalam kontrak pintar agar aset rentan terhadap peretasan (contoh: [Wormhole Bridge Solana](https://rekt.news/wormhole-rekt/)).
- **Risiko keuangan sistemik** – Banyak jembatan menggunakan aset terbungkus untuk melakukan mint versi kanonik dari aset asli di rantai baru. Hal ini memaparkan ekosistem pada risiko sistemik, seperti yang telah kita lihat pada versi token terbungkus yang dieksploitasi.
- **Risiko pihak lawan (Counterparty risk) –** Beberapa jembatan menggunakan desain tepercaya yang mengharuskan pengguna untuk bergantung pada asumsi bahwa validator tidak akan berkolusi untuk mencuri dana pengguna. Kebutuhan pengguna untuk memercayai aktor pihak ketiga ini memaparkan mereka pada risiko seperti rug pull, penyensoran, dan aktivitas berbahaya lainnya.
- **Masalah terbuka –** Mengingat bahwa jembatan masih dalam tahap awal pengembangan, ada banyak pertanyaan yang belum terjawab terkait dengan bagaimana jembatan akan berkinerja dalam kondisi pasar yang berbeda, seperti saat kemacetan jaringan dan selama peristiwa yang tidak terduga seperti serangan tingkat jaringan atau pengembalian status (state rollback). Ketidakpastian ini menimbulkan risiko tertentu, yang tingkatannya masih belum diketahui.

## Bagaimana dapps dapat menggunakan jembatan? {#how-can-dapps-use-bridges}

Berikut adalah beberapa aplikasi praktis yang dapat dipertimbangkan oleh pengembang tentang jembatan dan membawa dapp mereka ke lintas rantai:

### Mengintegrasikan jembatan {#integrating-bridges}

Bagi pengembang, ada banyak cara untuk menambahkan dukungan untuk jembatan:

1. **Membangun jembatan Anda sendiri –** Membangun jembatan yang aman dan andal tidaklah mudah, terutama jika Anda mengambil rute yang lebih meminimalkan kepercayaan. Selain itu, ini membutuhkan pengalaman bertahun-tahun dan keahlian teknis yang terkait dengan studi skalabilitas dan interoperabilitas. Tambahan pula, ini akan membutuhkan tim yang turun tangan langsung untuk memelihara jembatan dan menarik likuiditas yang cukup agar layak.

2. **Menunjukkan kepada pengguna beberapa opsi jembatan –** Banyak [dapps](/developers/docs/dapps/) mengharuskan pengguna untuk memiliki token asli mereka untuk berinteraksi dengannya. Untuk memungkinkan pengguna mengakses token mereka, mereka menawarkan opsi jembatan yang berbeda di situs web mereka. Namun, metode ini adalah perbaikan cepat untuk masalah tersebut karena menjauhkan pengguna dari antarmuka dapp dan masih mengharuskan mereka untuk berinteraksi dengan dapps dan jembatan lain. Ini adalah pengalaman orientasi (onboarding) yang rumit dengan peningkatan ruang lingkup untuk membuat kesalahan.

3. **Mengintegrasikan jembatan –** Solusi ini tidak mengharuskan dapp untuk mengirim pengguna ke antarmuka jembatan eksternal dan DEX. Ini memungkinkan dapps untuk meningkatkan pengalaman orientasi pengguna. Namun, pendekatan ini memiliki keterbatasan:

   - Penilaian dan pemeliharaan jembatan itu sulit dan memakan waktu.
   - Memilih satu jembatan menciptakan satu titik kegagalan dan ketergantungan.
   - Dapp dibatasi oleh kemampuan jembatan.
   - Jembatan saja mungkin tidak cukup. Dapps mungkin memerlukan DEX untuk menawarkan lebih banyak fungsionalitas seperti tukar lintas rantai.

4. **Mengintegrasikan beberapa jembatan –** Solusi ini memecahkan banyak masalah yang terkait dengan mengintegrasikan satu jembatan. Namun, ini juga memiliki keterbatasan, karena mengintegrasikan beberapa jembatan memakan sumber daya dan menciptakan beban teknis dan komunikasi bagi pengembang—sumber daya paling langka di kripto.

5. **Mengintegrasikan agregator jembatan –** Opsi lain untuk dapps adalah mengintegrasikan solusi agregasi jembatan yang memberi mereka akses ke beberapa jembatan. Agregator jembatan mewarisi kekuatan semua jembatan dan dengan demikian tidak dibatasi oleh kemampuan satu jembatan mana pun. Khususnya, agregator jembatan biasanya memelihara integrasi jembatan, yang menyelamatkan dapp dari kerumitan untuk terus mengikuti aspek teknis dan operasional dari integrasi jembatan.

Meskipun demikian, agregator jembatan juga memiliki keterbatasan. Misalnya, meskipun mereka dapat menawarkan lebih banyak opsi jembatan, biasanya ada lebih banyak jembatan yang tersedia di pasar selain yang ditawarkan di platform agregator. Selain itu, sama seperti jembatan, agregator jembatan juga terpapar pada risiko kontrak pintar dan teknologi (lebih banyak kontrak pintar = lebih banyak risiko).

Jika sebuah dapp mengambil rute mengintegrasikan jembatan atau agregator, ada opsi berbeda berdasarkan seberapa dalam integrasi yang dimaksudkan. Misalnya, jika itu hanya integrasi front-end untuk meningkatkan pengalaman orientasi pengguna, sebuah dapp akan mengintegrasikan widget. Namun, jika integrasinya adalah untuk mengeksplorasi strategi lintas rantai yang lebih dalam seperti mengunci, yield farming, dll., dapp mengintegrasikan SDK atau API.

### Menerapkan dapp di beberapa rantai {#deploying-a-dapp-on-multiple-chains}

Untuk menerapkan dapp di beberapa rantai, pengembang dapat menggunakan platform pengembangan seperti [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), dll. Biasanya, platform ini dilengkapi dengan plugin yang dapat disusun yang memungkinkan dapps untuk beralih ke lintas rantai. Misalnya, pengembang dapat menggunakan proksi penerapan deterministik yang ditawarkan oleh [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Contoh:

- [Cara membangun dapps lintas rantai](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Membangun Pasar NFT Lintas Rantai](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Membangun dapps NFT lintas rantai](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Memantau aktivitas kontrak lintas rantai {#monitoring-contract-activity-across-chains}

Untuk memantau aktivitas kontrak lintas rantai, pengembang dapat menggunakan subgraf dan platform pengembang seperti Tenderly untuk mengamati kontrak pintar secara real-time. Platform semacam itu juga memiliki alat yang menawarkan fungsionalitas pemantauan data yang lebih besar untuk aktivitas lintas rantai, seperti memeriksa [peristiwa yang dipancarkan oleh kontrak](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), dll.

#### Alat

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Bacaan lebih lanjut {#further-reading}

- [Jembatan Blockchain](/bridges/) – ethereum.org
- [Kerangka Kerja Risiko Jembatan L2Beat](https://l2beat.com/bridges/summary)
- [Jembatan Blockchain: Membangun Jaringan dari Jaringan Kripto](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 Sep 2021 – Dmitriy Berenzon
- [Trilema Interoperabilitas](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 Okt 2021 – Arjun Bhuptani
- [Kluster: Bagaimana Jembatan Tepercaya & Diminimalkan Kepercayaannya Membentuk Lanskap Multi-Rantai](https://blog.celestia.org/clusters/) - 4 Okt 2021 – Mustafa Al-Bassam
- [LI.FI: Dengan Jembatan, Kepercayaan adalah Spektrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 Apr 2022 – Arjun Chand
- [Keadaan Solusi Interoperabilitas Rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 Juni 2024 – Alex Hook
- [Memanfaatkan Keamanan Bersama Untuk Interoperabilitas Lintas Rantai yang Aman: Komite Status Lagrange Dan Seterusnya](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 Juni 2024 – Emmanuel Awosika

Selain itu, berikut adalah beberapa presentasi berwawasan dari [James Prestwich](https://twitter.com/_prestwich) yang dapat membantu mengembangkan pemahaman yang lebih dalam tentang jembatan:

- [Membangun Jembatan, Bukan Taman Bertembok](https://youtu.be/ZQJWMiX4hT0)
- [Membedah Jembatan](https://youtu.be/b0mC-ZqN8Oo)
- [Mengapa Jembatan Terbakar](https://youtu.be/c7cm2kd20j8)