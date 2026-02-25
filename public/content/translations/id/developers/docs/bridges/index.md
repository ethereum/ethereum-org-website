---
title: Jembatan
description: Gambaran umum tentang jembatan untuk para pengembang
lang: id
---

Dengan menjamurnya blockchain L1 dan solusi [penskalaan](/developers/docs/scaling/) L2, bersamaan dengan semakin banyaknya aplikasi terdesentralisasi yang lintas rantai, kebutuhan akan komunikasi dan pergerakan aset lintas rantai telah menjadi bagian penting dari infrastruktur jaringan. Berbagai jenis penghubung ada untuk membantu mewujudkan hal ini.

## Kebutuhan akan jembatan {#need-for-bridges}

Penghubung ada untuk menghubungkan jaringan blockchain. Mereka memungkinkan konektivitas dan interoperabilitas antara rantai blok.

Blockchain beroperasi di lingkungan terisolasi siloed, artinya tidak ada cara bagi satu blockchain untuk secara alami berdagang atau berkomunikasi dengan blockchain lain. Akibatnya, meskipun mungkin ada aktivitas dan inovasi yang signifikan dalam satu ekosistem, hal tersebut terbatas karena kurangnya konektivitas dan interoperabilitas dengan ekosistem lain.

Penghubung menawarkan cara bagi lingkungan rantai blok yang terisolasi untuk terhubung satu sama lain. Jembatan membangun rute transportasi antar-blockchain tempat token, pesan, data arbitrer, dan bahkan panggilan [kontrak pintar](/developers/docs/smart-contracts/) dapat ditransfer dari satu rantai ke rantai lainnya.

## Manfaat jembatan {#benefits-of-bridges}

Singkatnya, bridge membuka banyak kasus penggunaan dengan memungkinkan jaringan blockchain saling bertukar data dan memindahkan aset di antara mereka.

Setiap blockchain memiliki kelebihan, kelemahan, dan pendekatan unik dalam membangun aplikasi (misalnya kecepatan, kapasitas transaksi, biaya, dll.). Bridges membantu pengembangan ekosistem kripto secara keseluruhan dengan memungkinkan blockchain memanfaatkan inovasi dari blockchain lain.

Bagi pengembang, penghubung memungkinkan hal-hal berikut:

- transfer data, informasi, dan aset apa pun lintas rantai.
- membuka fitur dan kasus penggunaan baru bagi protokol, karena jembatan memperluas ruang desain untuk apa yang dapat ditawarkan oleh protokol. Sebagai contoh, sebuah protokol untuk yield farming yang awalnya diterapkan di Ethereum Mainnet dapat menawarkan liquidity pool di seluruh jaringan yang kompatibel dengan EVM.
- kesempatan untuk memanfaatkan kekuatan blockchain yang berbeda. Sebagai contoh, pengembang dapat memanfaatkan biaya lebih rendah yang ditawarkan oleh berbagai solusi L2 dengan menerapkan dapp mereka di rollup dan sidechain, sementara pengguna dapat melakukan bridging di antaranya.
- kolaborasi antara pengembang dari berbagai ekosistem rantai blok untuk membangun produk baru.
- menarik pengguna dan komunitas dari berbagai ekosistem ke aplikasi terdesentralisasi mereka.

## Bagaimana cara kerja penghubung? {#how-do-bridges-work}

Meskipun ada banyak [jenis desain jembatan](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), tiga cara untuk memfasilitasi transfer aset lintas-rantai menjadi yang paling menonjol:

- **Kunci dan cetak –** Mengunci aset di rantai sumber dan mencetak aset di rantai tujuan.
- **Bakar dan cetak –** Membakar aset di rantai sumber dan mencetak aset di rantai tujuan.
- **Tukar atomik –** Menukar aset di rantai sumber dengan aset di rantai tujuan dengan pihak lain.

## Jenis-jenis jembatan {#bridge-types}

Penghubung biasanya dapat diklasifikasikan ke dalam salah satu kategori berikut:

- **Jembatan asli –** Jembatan ini biasanya dibuat untuk bootstrap likuiditas di blockchain tertentu, sehingga memudahkan pengguna untuk memindahkan dana ke ekosistem. Misalnya, [Arbitrum Bridge](https://bridge.arbitrum.io/) dibuat untuk memudahkan pengguna menjembatani dari Ethereum Mainnet ke Arbitrum. Jembatan sejenis lainnya termasuk Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge), dll.
- **Jembatan berbasis validator atau oracle –** Jembatan ini mengandalkan set validator eksternal atau oracle untuk memvalidasi transfer lintas-rantai. Contoh: Multichain and Across.
- **Jembatan pengirim pesan umum –** Jembatan ini dapat mentransfer aset, beserta pesan dan data arbitrer lintas-rantai. Contohnya: Axelar, LayerZero, dan Nomad.
- **Jaringan likuiditas –** Jembatan ini terutama berfokus pada transfer aset dari satu rantai ke rantai lain melalui tukar atomik. Umumnya, mereka tidak mendukung pesan lintas rantai. Contoh: Connext dan Hop.

## Trade-off yang perlu dipertimbangkan {#trade-offs}

Dengan penghubung, tidak ada solusi yang sempurna. Sebaliknya, hanya ada trade-off yang dibuat untuk memenuhi tujuan. Pengembang dan pengguna dapat mengevaluasi penghubung berdasarkan faktor-faktor berikut:

- **Keamanan –** Siapa yang memverifikasi sistem? Jembatan yang diamankan oleh validator eksternal biasanya kurang aman dibandingkan jembatan yang diamankan secara lokal atau native oleh validator blockchain itu sendiri.
- **Kenyamanan –** Berapa lama waktu yang dibutuhkan untuk menyelesaikan transaksi, dan berapa banyak transaksi yang perlu ditandatangani oleh pengguna? Bagi pengembang, berapa lama waktu yang dibutuhkan untuk mengintegrasikan penghubung, dan seberapa kompleks prosesnya?
- **Konektivitas –** Rantai tujuan berbeda apa saja yang dapat dihubungkan oleh jembatan (misalnya, rollup, sidechain, blockchain lapisan 1 lainnya, dll.), dan seberapa sulit untuk mengintegrasikan blockchain baru?
- **Kemampuan untuk meneruskan data yang lebih kompleks –** Dapatkah jembatan memungkinkan transfer pesan dan data arbitrer yang lebih kompleks lintas-rantai, atau hanya mendukung transfer aset lintas-rantai?
- **Efektivitas biaya –** Berapa biaya untuk mentransfer aset lintas-rantai melalui jembatan? Biasanya, penghubung mengenakan biaya tetap atau variabel tergantung pada biaya gas dan likuiditas rute tertentu. Selain itu, sangat penting untuk mengevaluasi efisiensi biaya sebuah jembatan berdasarkan modal yang diperlukan untuk menjamin keamanannya.

Pada tingkat tinggi, penghubung dapat dikategorikan sebagai terpercaya dan tanpa kepercayaan.

- **Terpercaya –** Jembatan terpercaya diverifikasi secara eksternal. Mereka menggunakan sekumpulan verifikator eksternal (Federasi dengan multi-sig, sistem komputasi multi-pihak, jaringan oracle) untuk mengirim data antar rantai. Akibatnya, mereka dapat menawarkan konektivitas yang baik dan memungkinkan pertukaran pesan yang sepenuhnya tergeneralisasi antar rantai. Mereka juga cenderung unggul dalam kecepatan dan biaya-efektif. Hal ini memiliki konsekuensi pada keamanan, karena pengguna harus bergantung pada keamanan bridge itu sendiri.
- **Tanpa kepercayaan –** Jembatan ini mengandalkan blockchain yang mereka hubungkan dan validatornya untuk mentransfer pesan dan token. Mereka disebut 'tanpa kepercayaan' karena tidak menambahkan asumsi kepercayaan baru (selain yang sudah ada pada blockchain). Akibatnya, penghubung tanpa kepercayaan dianggap lebih aman daripada penghubung terpercaya.

Untuk mengevaluasi bridge tanpa kepercayaan berdasarkan faktor-faktor lain, kita harus membaginya menjadi generalized message passing bridges dan liquidity networks.

- **Jembatan pengirim pesan umum –** Jembatan ini unggul dalam keamanan dan kemampuan untuk mentransfer data yang lebih kompleks lintas-rantai. Biasanya, mereka juga baik dalam biaya-efektif. Namun, keunggulan ini umumnya disertai dengan keterbatasan konektivitas pada bridge light client (misal: IBC) dan penurunan kecepatan pada bridge optimistik (misal: Nomad) yang menggunakan fraud proofs.
- **Jaringan likuiditas –** Jembatan ini menggunakan tukar atomik untuk mentransfer aset dan merupakan sistem yang diverifikasi secara lokal (yaitu, mereka menggunakan validator blockchain yang mendasarinya untuk memverifikasi transaksi). Akibatnya, mereka unggul dalam keamanan dan kecepatan. Selain itu, mereka dianggap relatif biaya-efektif dan menawarkan konektivitas yang baik. Namun, kompromi utamanya adalah ketidakmampuannya untuk mentransfer data yang lebih kompleks – karena mereka tidak mendukung pengiriman pesan lintas-chain.

## Risiko dengan jembatan {#risk-with-bridges}

Jembatan menyumbang tiga [peretasan terbesar di DeFi](https://rekt.news/leaderboard/) teratas dan masih dalam tahap awal pengembangan. Menggunakan penghubung apa pun membawa risiko berikut:

- **Risiko kontrak pintar –** Meskipun banyak jembatan telah berhasil lolos audit, hanya perlu satu kelemahan dalam kontrak pintar agar aset terekspos pada peretasan (mis.: [Jembatan Wormhole Solana](https://rekt.news/wormhole-rekt/)).
- **Risiko keuangan sistemik** – Banyak jembatan menggunakan aset terbungkus untuk mencetak versi kanonis dari aset asli di rantai baru. Hal ini mengekspos ekosistem pada risiko sistemik, seperti yang terlihat ketika versi “wrapped” dari token dieksploitasi.
- **Risiko pihak lawan –** Beberapa jembatan menggunakan desain terpercaya yang mengharuskan pengguna untuk mengandalkan asumsi bahwa validator tidak akan berkolusi untuk mencuri dana pengguna. Kebutuhan pengguna untuk mempercayai pihak ketiga ini mengekspos mereka pada risiko seperti rug pull, sensor, dan aktivitas jahat lainnya.
- **Masalah terbuka –** Mengingat jembatan masih dalam tahap awal pengembangan, ada banyak pertanyaan yang belum terjawab terkait bagaimana kinerja jembatan dalam kondisi pasar yang berbeda, seperti saat terjadi kemacetan jaringan dan selama peristiwa tak terduga seperti serangan tingkat jaringan atau pembalikan status. Ketidakpastian ini menimbulkan risiko tertentu, yang tingkatnya masih belum diketahui.

## Bagaimana aplikasi terdesentralisasi dapat menggunakan penghubung? {#how-can-dapps-use-bridges}

Berikut beberapa aplikasi praktis yang bisa dipertimbangkan pengembang terkait jembatan blockchain dan membawa dapp mereka lintas-chain:

### Mengintegrasikan jembatan {#integrating-bridges}

Bagi pengembang, ada banyak cara untuk menambahkan dukungan untuk penghubung:

1. **Membangun jembatan Anda sendiri –** Membangun jembatan yang aman dan andal tidaklah mudah, terutama jika Anda mengambil rute yang lebih meminimalkan kepercayaan. Selain itu, hal ini membutuhkan pengalaman bertahun-tahun dan keahlian teknis terkait studi skalabilitas dan interoperabilitas. Selain itu, dibutuhkan tim yang aktif mengelola bridge serta menarik likuiditas yang cukup agar proyek tersebut dapat berjalan secara layak.

2. **Menampilkan beberapa opsi jembatan kepada pengguna –** Banyak [dapps](/developers/docs/dapps/) mengharuskan pengguna memiliki token asli mereka untuk berinteraksi dengannya. Untuk memungkinkan pengguna mengakses token mereka, mereka menyediakan berbagai opsi jembatan di situs web mereka. Namun, metode ini hanyalah solusi cepat untuk masalah tersebut, karena pengguna harus meninggalkan antarmuka dapp dan tetap perlu berinteraksi dengan dapp serta jembatan lainnya. Ini adalah pengalaman onboarding yang merepotkan dengan ruang lingkup kesalahan yang meningkat.

3. **Mengintegrasikan jembatan –** Solusi ini tidak mengharuskan dapp mengirim pengguna ke jembatan eksternal dan antarmuka DEX. Ini memungkinkan aplikasi terdesentralisasi untuk meningkatkan pengalaman onboarding pengguna. Namun, pendekatan ini memiliki keterbatasan:

   - Penilaian dan pemeliharaan penghubung sulit dan memakan waktu.
   - Memilih satu penghubung menciptakan titik kegagalan tunggal dan ketergantungan.
   - Aplikasi terdesentralisasi dibatasi oleh kemampuan penghubung.
   - Penghubung saja mungkin tidak cukup. Aplikasi terdesentralisasi mungkin membutuhkan DEX untuk menawarkan lebih banyak fungsi seperti swap lintas rantai.

4. **Mengintegrasikan beberapa jembatan –** Solusi ini memecahkan banyak masalah yang terkait dengan pengintegrasian satu jembatan. Namun, ini juga memiliki keterbatasan, karena mengintegrasikan beberapa jembatan membutuhkan banyak sumber daya dan menimbulkan beban teknis serta komunikasi bagi pengembang—yang merupakan sumber daya paling langka di dunia kripto.

5. **Mengintegrasikan agregator jembatan –** Pilihan lain untuk dapps adalah mengintegrasikan solusi agregasi jembatan yang memberi mereka akses ke beberapa jembatan. Agregator bridge mewarisi kekuatan semua bridge dan dengan demikian tidak dibatasi oleh kemampuan penghubung tunggal mana pun. Perlu dicatat, agregator bridge biasanya memelihara integrasi penghubung, yang menyelamatkan aplikasi terdesentralisasi dari repotnya tetap berada di atas aspek teknis dan operasional integrasi penghubung.

Meskipun demikian, agregator bridge juga memiliki keterbatasannya. Misalnya, meskipun mereka dapat menawarkan lebih banyak penghubung, biasanya ada lebih banyak penghubung yang tersedia di pasar selain yang ditawarkan di platform agregator. Selain itu, sama seperti penghubung, agregator bridge juga terpapar risiko kontrak pintar dan teknologi (lebih banyak kontrak pintar = lebih banyak risiko).

Jika aplikasi terdesentralisasi menurunkan rute mengintegrasikan penghubung atau agregator, ada berbagai opsi berdasarkan seberapa dalam integrasi yang dimaksudkan. Misalnya, jika hanya integrasi front-end untuk meningkatkan pengalaman onboarding pengguna, dapp akan mengintegrasikan widget. Namun, jika integrasinya untuk menjelajahi strategi lintas rantai yang lebih dalam seperti staking, yield farming, dll, aplikasi terdesentralisasi mengintegrasikan SDK atau API.

### Menyebarkan dapp di beberapa rantai {#deploying-a-dapp-on-multiple-chains}

Untuk menyebarkan dapp di beberapa rantai, pengembang dapat menggunakan platform pengembangan seperti [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), dll. Biasanya, platform-platform ini dilengkapi dengan plugin yang dapat disusun untuk memungkinkan dapp beroperasi di berbagai jaringan. Misalnya, pengembang dapat menggunakan proksi penyebaran deterministik yang ditawarkan oleh [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Contoh:

- [Cara membangun dapps lintas-rantai](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Membangun Marketplace NFT Lintas-Rantai](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Membangun dapps NFT lintas-rantai](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Memantau aktivitas kontrak lintas-rantai {#monitoring-contract-activity-across-chains}

Untuk memantau aktivitas kontrak di berbagai jaringan, pengembang dapat menggunakan subgraph dan platform seperti Tenderly untuk melihat kontrak pintar secara langsung. Platform semacam itu juga memiliki alat yang menawarkan fungsionalitas pemantauan data yang lebih besar untuk aktivitas lintas-rantai, seperti memeriksa [event yang dipancarkan oleh kontrak](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), dll.

#### Peralatan

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Bacaan lebih lanjut {#further-reading}

- [Jembatan Blockchain](/bridges/) – ethereum.org
- [Kerangka Risiko Jembatan L2Beat](https://l2beat.com/bridges/summary)
- [Jembatan Blockchain: Membangun Jaringan dari Jaringan Kripto](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 Sep 2021 – Dmitriy Berenzon
- [Trilema Interoperabilitas](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 Okt 2021 – Arjun Bhuptani
- [Kluster: Bagaimana Jembatan Tepercaya & Minim Kepercayaan Membentuk Lanskap Multi-Rantai](https://blog.celestia.org/clusters/) - 4 Okt 2021 – Mustafa Al-Bassam
- [LI.FI: Dengan Jembatan, Kepercayaan adalah Spektrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 Apr 2022 – Arjun Chand
- [Keadaan Solusi Interoperabilitas Rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 Juni 2024 – Alex Hook
- [Memanfaatkan Keamanan Bersama untuk Interoperabilitas Lintas-Rantai yang Aman: Komite Status Lagrange dan Selebihnya](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 Juni 2024 – Emmanuel Awosika

Selain itu, berikut adalah beberapa presentasi mendalam oleh [James Prestwich](https://twitter.com/_prestwich) yang dapat membantu mengembangkan pemahaman yang lebih dalam tentang jembatan:

- [Membangun Jembatan, Bukan Taman Berdinding](https://youtu.be/ZQJWMiX4hT0)
- [Membedah Jembatan](https://youtu.be/b0mC-ZqN8Oo)
- [Mengapa Jembatan Terbakar](https://youtu.be/c7cm2kd20j8)
