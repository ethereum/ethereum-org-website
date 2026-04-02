---
title: Area aktif penelitian Ethereum
description: Jelajahi berbagai area penelitian terbuka dan pelajari cara untuk terlibat.
lang: id
---

# Area aktif penelitian Ethereum {#active-areas-of-ethereum-research}

Salah satu kekuatan utama Ethereum adalah komunitas penelitian dan rekayasa aktif yang terus-menerus meningkatkannya. Banyak orang yang antusias dan terampil di seluruh dunia ingin mendedikasikan diri mereka pada masalah-masalah yang belum terselesaikan di Ethereum, tetapi tidak selalu mudah untuk mengetahui apa saja masalah tersebut. Halaman ini menguraikan area penelitian aktif utama sebagai panduan kasar menuju teknologi mutakhir Ethereum.

## Bagaimana penelitian Ethereum bekerja {#how-ethereum-research-works}

Penelitian Ethereum bersifat terbuka dan transparan, mewujudkan prinsip-prinsip [Sains Terdesentralisasi (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Budayanya adalah membuat alat dan hasil penelitian seterbuka dan seinteraktif mungkin, misalnya, melalui buku catatan yang dapat dieksekusi. Penelitian Ethereum bergerak cepat, dengan temuan baru yang diunggah dan didiskusikan secara terbuka di forum seperti [ethresear.ch](https://ethresear.ch/) daripada menjangkau komunitas melalui publikasi tradisional setelah putaran tinjauan sejawat.

## Sumber daya penelitian umum {#general-research-resources}

Terlepas dari topik spesifiknya, ada banyak informasi tentang penelitian Ethereum yang dapat ditemukan di [ethresear.ch](https://ethresear.ch) dan [saluran Discord Eth R&D](https://discord.gg/qGpsxSA). Ini adalah tempat utama di mana para peneliti Ethereum mendiskusikan ide-ide terbaru dan peluang pengembangan.

Laporan ini yang diterbitkan pada Mei 2022 oleh [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) memberikan gambaran umum yang baik tentang peta jalan Ethereum.

## Sumber Pendanaan {#sources-of-funding}

Anda dapat terlibat dengan penelitian Ethereum dan dibayar untuk itu! Misalnya, [Ethereum Foundation](/foundation/) baru-baru ini menjalankan [putaran pendanaan Hibah Akademik](https://esp.ethereum.foundation/academic-grants). Anda dapat menemukan informasi tentang peluang pendanaan yang aktif dan yang akan datang di [halaman hibah Ethereum](/community/grants/).

## Penelitian protokol {#protocol-research}

Penelitian protokol berkaitan dengan lapisan dasar Ethereum - serangkaian aturan yang mendefinisikan bagaimana node terhubung, berkomunikasi, bertukar, dan menyimpan data Ethereum serta mencapai konsensus tentang status blockchain. Penelitian protokol dibagi menjadi dua kategori tingkat atas: konsensus dan eksekusi.

### Konsensus {#consensus}

Penelitian konsensus berkaitan dengan [mekanisme proof-of-stake Ethereum](/developers/docs/consensus-mechanisms/pos/). Beberapa contoh topik penelitian konsensus adalah:

- mengidentifikasi dan menambal kerentanan;
- mengukur keamanan kriptoekonomi;
- meningkatkan keamanan atau kinerja implementasi klien;
- dan mengembangkan klien ringan.

Selain penelitian yang berwawasan ke depan, beberapa desain ulang mendasar dari protokol, seperti finalitas slot tunggal, sedang diteliti untuk memungkinkan peningkatan yang signifikan pada Ethereum. Selanjutnya, efisiensi, keamanan, dan pemantauan jaringan peer-to-peer antara klien konsensus juga merupakan topik penelitian yang penting.

#### Bacaan latar belakang {#background-reading}

- [Pengantar proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Makalah Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Penjelasan Casper-FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Makalah Gasper](https://arxiv.org/abs/2003.03052)

#### Penelitian terbaru {#recent-research}

- [Konsensus Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilema Ketersediaan/Finalitas](https://arxiv.org/abs/2009.04987)
- [Finalitas slot tunggal](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Pemisahan pengusul-pembangun (Proposer-builder separation)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Eksekusi {#execution}

Lapisan eksekusi berkaitan dengan mengeksekusi transaksi, menjalankan [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/) dan menghasilkan muatan eksekusi untuk diteruskan ke lapisan konsensus. Ada banyak area penelitian yang aktif, termasuk:

- membangun dukungan klien ringan;
- meneliti batas gas;
- dan menggabungkan struktur data baru (misalnya, Verkle Tries).

#### Bacaan latar belakang {#background-reading-1}

- [Pengantar EVM](/developers/docs/evm)
- [Lapisan eksekusi Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Penelitian terbaru {#recent-research-1}

- [Optimasi basis data](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Kedaluwarsa status (State expiry)](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Jalur menuju kedaluwarsa status](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Proposal Verkle dan kedaluwarsa status](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Manajemen riwayat](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle Trees](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Pengambilan sampel ketersediaan data](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Pengembangan Klien {#client-development}

Klien Ethereum adalah implementasi dari protokol Ethereum. Pengembangan klien mewujudkan hasil dari penelitian protokol menjadi kenyataan dengan membangunnya ke dalam klien-klien ini. Pengembangan klien mencakup pembaruan spesifikasi klien serta membangun implementasi spesifik.

Sebuah node Ethereum diharuskan untuk menjalankan dua perangkat lunak:

1. klien konsensus untuk melacak kepala blockchain, menyebarkan blok (gossip blocks), dan menangani logika konsensus
2. klien eksekusi untuk mendukung Mesin Virtual Ethereum dan mengeksekusi transaksi serta kontrak pintar

Lihat [halaman node dan klien](/developers/docs/nodes-and-clients/) untuk detail lebih lanjut tentang node dan klien serta untuk daftar semua implementasi klien saat ini. Anda juga dapat menemukan riwayat semua peningkatan Ethereum di [halaman riwayat](/ethereum-forks/).

### Klien Eksekusi {#execution-clients}

- [Spesifikasi klien eksekusi](https://github.com/ethereum/execution-specs)
- [Spesifikasi API Eksekusi](https://github.com/ethereum/execution-apis)

### Klien Konsensus {#consensus-clients}

- [Spesifikasi klien konsensus](https://github.com/ethereum/consensus-specs)
- [Spesifikasi API Beacon](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Peningkatan dan kinerja {#scaling-and-performance}

Peningkatan Ethereum adalah area fokus yang besar bagi para peneliti Ethereum. Pendekatan saat ini termasuk memindahkan transaksi ke rollup dan membuatnya semurah mungkin menggunakan blob data. Informasi pengantar tentang peningkatan Ethereum tersedia di [halaman peningkatan](/developers/docs/scaling) kami.

### Layer 2 {#layer-2}

Sekarang ada beberapa protokol Layer 2 yang meningkatkan Ethereum menggunakan teknik berbeda untuk mengelompokkan transaksi dan mengamankannya di Ethereum layer 1. Ini adalah topik yang berkembang sangat pesat dengan banyak potensi penelitian dan pengembangan.

#### Bacaan latar belakang {#background-reading-2}

- [Pengantar layer 2](/layer-2/)
- [Polynya: Rollup, DA, dan rantai modular](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Penelitian terbaru {#recent-research-2}

- [Pengurutan adil Arbitrum untuk sequencer](https://eprint.iacr.org/2021/1465)
- [Layer 2 Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Peta jalan yang berpusat pada rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Jembatan {#bridges}

Satu area khusus dari layer 2 yang membutuhkan lebih banyak penelitian dan pengembangan adalah jembatan yang aman dan berkinerja tinggi. Ini termasuk jembatan antara berbagai Layer 2 dan jembatan antara Layer 1 dan Layer 2. Ini adalah area penelitian yang sangat penting karena jembatan umumnya menjadi target para peretas.

#### Bacaan latar belakang {#background-reading-3}

- [Pengantar jembatan blockchain](/bridges/)
- [Vitalik tentang jembatan](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Artikel jembatan blockchain](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Nilai yang terkunci di jembatan](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Penelitian terbaru {#recent-research-3}

- [Memvalidasi jembatan](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding {#sharding}

Melakukan sharding pada blockchain Ethereum telah lama menjadi bagian dari peta jalan pengembangan. Namun, solusi peningkatan baru seperti "Danksharding" saat ini menjadi pusat perhatian.

Pendahulu dari Danksharding penuh yang dikenal sebagai Proto-Danksharding ditayangkan bersamaan dengan peningkatan jaringan Cancun-Deneb ("Dencun").

[Lebih lanjut tentang peningkatan Dencun](/roadmap/dencun/)

#### Bacaan latar belakang {#background-reading-4}

- [Catatan Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Video Danksharding Bankless](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Kompendium Penelitian Sharding Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Penelitian terbaru {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik tentang sharding dan pengambilan sampel ketersediaan data](https://hackmd.io/@vbuterin/sharding_proposal)

### Perangkat Keras {#hardware}

[Menjalankan node](/developers/docs/nodes-and-clients/run-a-node/) pada perangkat keras yang sederhana sangat mendasar untuk menjaga Ethereum tetap terdesentralisasi. Oleh karena itu, penelitian aktif untuk meminimalkan persyaratan perangkat keras untuk menjalankan node adalah area penelitian yang penting.

#### Bacaan latar belakang {#background-reading-5}

- [Ethereum di ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Penelitian terbaru {#recent-research-5}

- [ecdsa di FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Keamanan {#security}

Keamanan adalah topik luas yang mungkin mencakup pencegahan spam/penipuan, keamanan dompet, keamanan perangkat keras, keamanan kripto-ekonomi, perburuan bug dan pengujian aplikasi serta perangkat lunak klien dan manajemen kunci. Berkontribusi pada pengetahuan di area ini akan membantu merangsang adopsi arus utama.

### Kriptografi & ZKP {#cryptography--zkp}

Bukti zero-knowledge (ZKP) dan kriptografi sangat penting untuk membangun privasi dan keamanan ke dalam Ethereum dan aplikasinya. Zero-knowledge adalah ruang yang relatif muda tetapi bergerak cepat dengan banyak peluang penelitian dan pengembangan terbuka. Beberapa kemungkinan termasuk mengembangkan implementasi yang lebih efisien dari [algoritma hashing Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), menemukan komitmen polinomial yang lebih baik daripada yang ada saat ini atau mengurangi biaya pembuatan kunci publik ecdsa dan sirkuit verifikasi tanda tangan.

#### Bacaan latar belakang {#background-reading-6}

- [Blog 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Penelitian terbaru {#recent-research-6}

- [Kemajuan terbaru dalam kriptografi kurva eliptik](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [ZK Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### Dompet {#wallets}

Dompet Ethereum dapat berupa ekstensi peramban, aplikasi desktop dan seluler, atau kontrak pintar di Ethereum. Ada penelitian aktif tentang dompet pemulihan sosial yang mengurangi beberapa risiko yang terkait dengan manajemen kunci pengguna individu. Terkait dengan pengembangan dompet adalah penelitian tentang bentuk alternatif abstraksi akun, yang merupakan area penting dari penelitian yang baru lahir.

#### Bacaan latar belakang {#background-reading-7}

- [Pengantar dompet](/wallets/)
- [Pengantar keamanan dompet](/security/)
- [Keamanan Ethresear.ch](https://ethresear.ch/tag/security)
- [Abstraksi Akun EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Abstraksi Akun EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)

#### Penelitian terbaru {#recent-research-7}

- [Dompet kontrak pintar yang berfokus pada validasi](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Masa depan akun](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Opcode AUTH dan AUTHCALL EIP-3074](https://eips.ethereum.org/EIPS/eip-3074)
- [Menerbitkan kode di alamat EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Komunitas, pendidikan, dan penjangkauan {#community-education-and-outreach}

Membawa pengguna baru ke Ethereum membutuhkan sumber daya pendidikan dan pendekatan baru untuk penjangkauan. Ini mungkin termasuk postingan blog dan artikel, buku, podcast, meme, sumber daya pengajaran, acara, dan apa pun yang membangun komunitas, menyambut pemula, dan mendidik orang-orang tentang Ethereum.

### UX/UI {#uxui}

Untuk membawa lebih banyak orang ke Ethereum, ekosistem harus meningkatkan UX/UI. Ini akan membutuhkan desainer dan pakar produk untuk memeriksa kembali desain dompet dan aplikasi.

#### Bacaan latar belakang {#background-reading-8}

- [UX/UI Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Penelitian terbaru {#recent-research-8}

- [Discord Desain Web3](https://discord.gg/FsCFPMTSm9)
- [Prinsip Desain Web3](https://www.web3designprinciples.com/)
- [Diskusi UX Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Ekonomi {#economics}

Penelitian ekonomi di Ethereum secara luas mengikuti dua pendekatan: memvalidasi keamanan mekanisme yang mengandalkan insentif ekonomi ("mikroekonomi") dan menganalisis aliran nilai antara protokol, aplikasi, dan pengguna ("makroekonomi"). Ada faktor kripto-ekonomi yang kompleks yang berkaitan dengan aset asli Ethereum (ether) dan token yang dibangun di atasnya (misalnya NFT dan token ERC-20).

#### Bacaan latar belakang {#background-reading-9}

- [Grup Insentif Kuat (Robust Incentives Group)](https://rig.ethereum.org/)
- [Lokakarya ETHconomics di Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Penelitian terbaru {#recent-research-9}

- [Analisis empiris EIP-1559](https://arxiv.org/abs/2201.05574)
- [Keseimbangan pasokan yang beredar](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Mengukur MEV: Seberapa gelap hutannya?](https://arxiv.org/abs/2101.05511)

### Ruang blok dan pasar biaya {#blockspace-fee-markets}

Pasar ruang blok mengatur penyertaan transaksi pengguna akhir, baik secara langsung di Ethereum (Layer 1) atau di jaringan yang dijembatani, misalnya, rollup (Layer 2). Di Ethereum, transaksi dikirimkan ke pasar biaya yang diterapkan dalam protokol sebagai EIP-1559, melindungi rantai dari spam dan penetapan harga kemacetan. Pada kedua lapisan, transaksi dapat menghasilkan eksternalitas, yang dikenal sebagai Nilai Ekstraksi Maksimum (MEV), yang mendorong struktur pasar baru untuk menangkap atau mengelola eksternalitas ini.

#### Bacaan latar belakang {#background-reading-10}

- [Desain Mekanisme Biaya Transaksi untuk Blockchain Ethereum: Analisis Ekonomi EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulasi EIP-1559 (Grup Insentif Kuat)](https://ethereum.github.io/abm1559)
- [Ekonomi rollup dari prinsip pertama](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, Pengurutan Ulang Transaksi, dan Ketidakstabilan Konsensus di Pertukaran Terdesentralisasi](https://arxiv.org/abs/1904.05234)

#### Penelitian terbaru {#recent-research-10}

- [Presentasi video EIP-1559 Multidimensi](https://youtu.be/QbR4MTgnCko)
- [MEV lintas domain](http://arxiv.org/abs/2112.01472)
- [Lelang MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Insentif proof-of-stake {#proof-of-stake-incentives}

Validator menggunakan aset asli Ethereum (ether) sebagai jaminan terhadap perilaku tidak jujur. Kriptoekonomi dari hal ini menentukan keamanan jaringan. Validator yang canggih mungkin dapat mengeksploitasi nuansa lapisan insentif untuk meluncurkan serangan eksplisit.

#### Bacaan latar belakang {#background-reading-11}

- [Kelas master ekonomi Ethereum dan model ekonomi](https://github.com/CADLabs/ethereum-economic-model)
- [Simulasi insentif PoS (Grup Insentif Kuat)](https://ethereum.github.io/beaconrunner/)

#### Penelitian terbaru {#recent-research-11}

- [Meningkatkan ketahanan sensor transaksi di bawah pemisahan pengusul/pembangun (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Tiga Serangan pada PoS Ethereum](https://arxiv.org/abs/2110.10086)

### Liquid staking dan derivatif {#liquid-staking-and-derivatives}

Liquid staking memungkinkan pengguna dengan kurang dari 32 ETH untuk menerima hasil mengunci dengan menukar ether dengan token yang mewakili ether yang dikunci yang dapat digunakan di DeFi. Namun, insentif dan dinamika pasar yang terkait dengan liquid staking masih terus ditemukan, serta efeknya pada keamanan Ethereum (misalnya, risiko sentralisasi).

#### Bacaan latar belakang {#background-reading-12}

- [Liquid staking Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Jalan menuju mengunci Ethereum tanpa kepercayaan](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Pengantar protokol mengunci](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Penelitian terbaru {#recent-research-12}

- [Menangani penarikan dari Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Kredensial penarikan](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Risiko Derivatif Liquid Staking](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Pengujian {#testing}

### Verifikasi formal {#formal-verification}

Verifikasi formal adalah menulis kode untuk memverifikasi bahwa spesifikasi konsensus Ethereum sudah benar dan bebas bug. Ada versi spesifikasi yang dapat dieksekusi yang ditulis dengan Python yang membutuhkan pemeliharaan dan pengembangan. Penelitian lebih lanjut dapat membantu meningkatkan implementasi Python dari spesifikasi tersebut dan menambahkan alat yang dapat memverifikasi kebenaran dengan lebih kuat dan mengidentifikasi masalah.

#### Bacaan latar belakang {#background-reading-13}

- [Pengantar verifikasi formal](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Verifikasi Formal (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Penelitian terbaru {#recent-research-13}

- [Verifikasi formal dari kontrak deposit](https://github.com/runtimeverification/deposit-contract-verification)
- [Verifikasi formal dari spesifikasi Beacon Chain](https://github.com/runtimeverification/deposit-contract-verification)

## Ilmu data dan analitik {#data-science-and-analytics}

Ada kebutuhan untuk lebih banyak alat analisis data dan dasbor yang memberikan informasi terperinci tentang aktivitas di Ethereum dan kesehatan jaringan.

### Bacaan latar belakang {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Dasbor keragaman klien](https://clientdiversity.org/)

#### Penelitian terbaru {#recent-research-14}

- [Analisis Data Grup Insentif Kuat](https://rig.ethereum.org/)

## Aplikasi dan peralatan {#apps-and-tooling}

Lapisan aplikasi mendukung ekosistem program yang beragam yang menyelesaikan transaksi di lapisan dasar Ethereum. Tim pengembangan terus menemukan cara baru untuk memanfaatkan Ethereum guna membuat versi aplikasi Web2 penting yang dapat disusun, tanpa izin, dan tahan sensor atau membuat konsep asli Web3 yang sama sekali baru. Pada saat yang sama, peralatan baru sedang dikembangkan yang membuat pembuatan dapps di Ethereum menjadi tidak terlalu rumit.

### DeFi {#defi}

Keuangan terdesentralisasi (DeFi) adalah salah satu kelas utama aplikasi yang dibangun di atas Ethereum. DeFi bertujuan untuk membuat "lego uang" yang dapat disusun yang memungkinkan pengguna untuk menyimpan, mentransfer, meminjamkan, meminjam, dan menginvestasikan aset kripto menggunakan kontrak pintar. DeFi adalah ruang yang bergerak cepat yang terus diperbarui. Penelitian tentang protokol yang aman, efisien, dan dapat diakses terus dibutuhkan.

#### Bacaan latar belakang {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Apa itu DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Penelitian terbaru {#recent-research-15}

- [Keuangan terdesentralisasi, kepemilikan terpusat?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: Jalan menuju transaksi di bawah satu dolar](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Kasus penggunaan yang berdampak untuk Ethereum adalah kemampuan untuk berorganisasi secara terdesentralisasi melalui penggunaan DAO. Ada banyak penelitian aktif tentang bagaimana DAO di Ethereum dapat dikembangkan dan dimanfaatkan untuk mengeksekusi bentuk tata kelola yang lebih baik, sebagai alat koordinasi yang meminimalkan kepercayaan, sangat memperluas pilihan orang-orang di luar perusahaan dan organisasi tradisional.

#### Bacaan latar belakang {#background-reading-16}

- [Pengantar DAO](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Penelitian terbaru {#recent-research-16}

- [Memetakan ekosistem DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Alat pengembang {#developer-tools}

Alat untuk pengembang Ethereum berkembang pesat. Ada banyak penelitian dan pengembangan aktif yang harus dilakukan di area umum ini.

#### Bacaan latar belakang {#background-reading-17}

- [Peralatan berdasarkan bahasa pemrograman](/developers/docs/programming-languages/)
- [Kerangka Kerja Pengembang](/developers/docs/frameworks/)
- [Daftar alat pengembang konsensus](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Standar token](/developers/docs/standards/tokens/)
- [CryptoDevHub: Alat EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Penelitian terbaru {#recent-research-17}

- [Saluran Peralatan Konsensus Discord Eth R&D](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oracle {#oracles}

Oracle mengimpor data offchain ke blockchain dengan cara tanpa izin dan terdesentralisasi. Memasukkan data ini secara onchain memungkinkan dapps menjadi reaktif terhadap fenomena dunia nyata seperti fluktuasi harga pada aset dunia nyata, peristiwa di aplikasi offchain, atau bahkan perubahan cuaca.

#### Bacaan latar belakang {#background-reading-18}

- [Pengantar Oracle](/developers/docs/oracles/)

#### Penelitian terbaru {#recent-research-18}

- [Survei oracle blockchain](https://arxiv.org/pdf/2004.07140.pdf)
- [Buku putih Chainlink](https://chain.link/whitepaper)

### Keamanan aplikasi {#app-security}

Peretasan di Ethereum umumnya mengeksploitasi kerentanan dalam aplikasi individual daripada di protokol itu sendiri. Peretas dan pengembang aplikasi terkunci dalam perlombaan senjata untuk mengembangkan serangan dan pertahanan baru. Ini berarti selalu ada penelitian dan pengembangan penting yang diperlukan untuk menjaga aplikasi tetap aman dari peretasan.

#### Bacaan latar belakang {#background-reading-19}

- [Laporan eksploitasi Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Daftar post-mortem peretasan kontrak Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Berita Rekt](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Penelitian terbaru {#recent-research-19}

- [Aplikasi Ethresear.ch](https://ethresear.ch/c/applications/18)

### Tumpukan teknologi {#technology-stack}

Mendesentralisasi seluruh tumpukan teknologi Ethereum adalah area penelitian yang penting. Saat ini, dapps di Ethereum umumnya memiliki beberapa titik sentralisasi karena mereka mengandalkan peralatan atau infrastruktur terpusat.

#### Bacaan latar belakang {#background-reading-20}

- [Tumpukan Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase: Pengantar Tumpukan Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Pengantar kontrak pintar](/developers/docs/smart-contracts/)
- [Pengantar penyimpanan terdesentralisasi](/developers/docs/storage/)

#### Penelitian terbaru {#recent-research-20}

- [Komposabilitas kontrak pintar](/developers/docs/smart-contracts/composability/)