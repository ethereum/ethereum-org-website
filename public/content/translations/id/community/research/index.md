---
title: Bidang-bidang penelitian Ethereum yang aktif
description: Jelajahi berbagai bidang penelitian terbuka dan pelajari cara untuk ikut terlibat.
lang: id
---

# Bidang penelitian Ethereum yang aktif {#active-areas-of-ethereum-research}

Salah satu kekuatan utama Ethereum adalah komunitas riset dan rekayasa yang aktif yang terus-menerus meningkatkan platform ini. Banyak orang yang antusias dan berbakat di seluruh dunia ingin berkontribusi pada masalah-masalah penting di Ethereum, tetapi tidak selalu mudah untuk mengetahui apa saja masalah tersebut. Halaman ini menguraikan bidang riset aktif utama sebagai panduan kasar untuk memahami perkembangan terkini di Ethereum.

## Bagaimana riset Ethereum bekerja {#how-ethereum-research-works}

Penelitian Ethereum bersifat terbuka dan transparan, serta mewujudkan prinsip-prinsip pengetahuan yang tidak terpusat [Decentralized Science (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Budayanya adalah membuat alat dan hasil riset se-transparan dan se-interaktif mungkin, misalnya melalui notebook yang dapat dijalankan. Riset Ethereum bergerak dengan cepat, dengan temuan-temuan baru dipublikasikan dan didiskusikan secara terbuka di forum seperti [ethresear.ch](https://ethresear.ch/) daripada disampaikan ke komunitas melalui publikasi tradisional setelah melalui beberapa tahap peer review.

## Sumber daya penelitian umum {#general-research-resources}

Terlepas dari topiknya, terdapat banyak informasi mengenai penelitian Ethereum yang dapat ditemukan di [ethresear.ch](https://ethresear.ch) dan kanal Discord [Eth R&D channel](https://discord.gg/qGpsxSA). Ini adalah tempat utama di mana para peneliti Ethereum mendiskusikan ide-ide terbaru dan peluang pengembangan.

Laporan ini dipublikasikan pada bulan Mei 2022 oleh [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) untuk memberikan gambaran yang bagus tentang peta jalan Ethereum.

## Sumber Pendanaan {#sources-of-funding}

Anda bisa terlibat dalam penelitian Ethereum dan mendapatkan bayaran untuk itu! Contohnya, [Yayasan Ethereum](/foundation/) baru saja melakukan [Pendanaan Hibah Akademik](https://esp.ethereum.foundation/academic-grants). Anda bisa menemukan informasi tentang peluang pendanaan yang sedang berlangsung dan yang akan datang di [halaman hibah Ethereum](/community/grants/).

## Protokol riset {#protocol-research}

Penelitian protokol berfokus pada lapisan dasar Ethereum — sekumpulan aturan yang menentukan bagaimana node terhubung, berkomunikasi, bertukar dan menyimpan data Ethereum, serta mencapai konsensus mengenai status blockchain. Penelitian protokol dibagi menjadi dua kategori utama: consensus dan eksekusi.

### Konsensus {#consensus}

Konsensus penelitian berkaitan dengan [mekanisme pembuktian Ethereum](/developers/docs/consensus-mechanisms/pos/). Beberapa contoh topik penelitian consensus adalah:

- Mengidentifikasi dan memperbaiki kerentanan;
- Mengukur keamanan cryptoeconomic;
- meningkatkan keamanan atau kinerja dari implementasi klien;
- dan mengembangkan klien ringan.

Selain penelitian yang berfokus ke masa depan, beberapa perombakan mendasar pada protokol, seperti finalitas satu slot, sedang diteliti untuk memungkinkan peningkatan signifikan pada Ethereum. Selain itu, efisiensi, keamanan, dan pemantauan jaringan peer-to-peer antar klien konsensus juga merupakan topik penelitian yang penting.

#### Latar belakang bacaan {#background-reading}

- [Pengantar tentang proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Penjelasan Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Penjelasan Casper-FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Penjelasan Gasper](https://arxiv.org/abs/2003.03052)

#### Riset terakhir {#recent-research}

- [Konsensus ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilema Ketersediaan/Finalitas](https://arxiv.org/abs/2009.04987)
- [Slot tunggal finalitas](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Pemisahan pengusul-pembuat](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Eksekusi {#execution}

Lapisan eksekusi berfokus pada pelaksanaan transaksi, menjalankan [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) dan menghasilkan execution payload untuk diteruskan ke lapisan konsensus. Ada banyak area penelitian aktif, termasuk:

- Mengembangkan dukungan klien ringan;
- Meneliti batasan gas;
- dan menggabungkan struktur data baru (misalnya, Verkle Tries).

#### Latar belakang bacaan {#background-reading-1}

- [Pengenalan EVM](/developers/docs/evm)
- [Lapisan eksekusi ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Riset terakhir {#recent-research-1}

- [Optimasi basisdata](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Status kadaluarsa](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Jalur ke status kadaluarsa](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Proposal Verkle dan status kadaluarsa](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Manajemen histori](https://eips.ethereum.org/EIPS/eip-4444)
- [langkah-langkah verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Contoh data yang tersedia](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Pengembangan Klien {#client-development}

Klien Ethereum adalah implementasi dari protokol Ethereum. Pengembangan klien mengubah hasil riset protokol menjadi kenyataan dengan membangunnya langsung ke dalam klien-klien ini. Pengembangan klien mencakup memperbarui spesifikasi klien sekaligus membangun implementasi spesifik.

Diperlukan node Ethereum untuk menjalankan dua perangkat lunak:

1. sebuah klien konsensus untuk melacak blok terbaru pada blockchain, menyebarkan blok, dan menangani logika konsensus
2. sebuah klien eksekusi untuk mendukung Ethereum Virtual Machine serta mengeksekusi transaksi dan smart contract

Lihat [halaman node dan klien](/developers/docs/nodes-and-clients/) untuk detail lebih lanjut tentang node dan klien dan untuk daftar semua implementasi klien saat ini. Anda juga dapat melihat riwayat pengembangan Ethereum pada di [halaman ini](/ethereum-forks/).

### Klien Eksekusi: {#execution-clients}

- [Spesifikasi klien eksekusi](https://github.com/ethereum/execution-specs)
- [Spesifikasi eksekusi API](https://github.com/ethereum/execution-apis)

### Klien konsensus {#consensus-clients}

- [Spesifikasi klien konsensus](https://github.com/ethereum/consensus-specs)
- [Spesifikasi API Beacon](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Skalabilitas dan performa {#scaling-and-performance}

Skalabilitas Ethereum adalah area besar yang difokuskan oleh para peneliti Ethereum. Pendekatan saat ini termasuk memindahkan transaksi ke rollups dan membuatnya semurah mungkin dengan menggunakan data blobs. Pengantar mengenai skalabilitas Ethereum tersedia di [halaman skalabilitas](/developers/docs/scaling) kami.

### Lapisan 2 {#layer-2}

Saat ini terdapat beberapa protokol Lapisan 2 yang memperluas skalabilitas Ethereum dengan menggunakan berbagai teknik untuk mengumpulkan transaksi dan mengamankannya di Lapisan 1 Ethereum. Ini adalah topik yang berkembang dengan sangat cepat dengan potensi penelitian dan pengembangan yang besar.

#### Latar belakang bacaan {#background-reading-2}

- [Pengantar tentang lapisan 2](/layer-2/)
- [Polynya: Rollups, Ketersediaan Data, dan Rantai Modular](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Riset terakhir {#recent-research-2}

- [Fair-Ordering Arbitrum untuk Sequencers](https://eprint.iacr.org/2021/1465)
- [Ethresear.ch Layer 2](https://ethresear.ch/c/layer-2/32)
- [Peta jalan yang berpusat pada rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Jembatan {#bridges}

Salah satu area khusus dari layer 2 yang memerlukan lebih banyak penelitian dan pengembangan adalah bridges yang aman dan berkinerja. Termasuk bridges antara berbagai Layer 2 dan bridges antara Layer 1 dan Layer 2. Ini adalah area penelitian yang sangat penting karena bridges sering menjadi target para peretas.

#### Latar belakang bacaan {#background-reading-3}

- [Pengenalan terhadap jembatan rantai blok](/bridges/)
- [Vitalik di atas jembatan](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Artikel jembatan blockchain](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Nilai terkunci di jembatan](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Riset terakhir {#recent-research-3}

- [Memvalidasi jembatan](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Pecahan {#sharding}

Sharding Blockchain Ethereum telah lama menjadi bagian dari roadmap pengembangan. Namun, solusi skalabilitas baru seperti 'Danksharding' saat ini menjadi pusat perhatian.

Prekursor untuk Danksharding penuh yang dikenal sebagai Proto-Danksharding ditayangkan dengan peningkatan jaringan Cancun-Deneb (“Dencun”).

[Lebih lanjut mengenai peningkatan Dencun](/roadmap/dencun/)

#### Latar belakang bacaan {#background-reading-4}

- [Catatan Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Video Danksharding tanpa bank](https://www.youtube.com/watch?v=N5p0TB77flM)
- [ringkasan penelitian sharding ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [danksharding (polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Riset terakhir {#recent-research-4}

- [eip-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [vitalik tentang sharding dan pengambilan sampel ketersediaan data](https://hackmd.io/@vbuterin/sharding_proposal)

### Perangkat keras {#hardware}

[Menjalankan node](/developers/docs/nodes-and-clients/run-a-node/) pada perangkat keras sederhana merupakan hal mendasar untuk menjaga Ethereum tetap terdesentralisasi. Oleh karena itu, penelitian aktif untuk meminimalkan keperluan perangkat keras untuk menjalankan simpul adalah area penelitian yang penting.

#### Latar belakang bacaan {#background-reading-5}

- [Ethereum di ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Riset terakhir {#recent-research-5}

- [ecdsa di FPGAs](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Keamanan {#security}

Keamanan adalah topik yang luas yang mungkin mencakup pencegahan spam/penipuan, keamanan dompet, keamanan perangkat keras, keamanan crypto-ekonomi, pencarian bug dan pengujian aplikasi serta perangkat lunak klien, dan pengelolaan kunci. Berkontribusi pada pengetahuan di bidang-bidang ini akan membantu merangsang adopsi secara luas.

### Kriptografi & ZKP {#cryptography--zkp}

Bukti nol pengetahuan (Zero-knowledge proofs atau ZKP) dan kriptografi sangat penting untuk membangun privasi dan keamanan dalam Ethereum dan aplikasinya. Zero-knowledge adalah ruang yang relatif muda namun berkembang dengan cepat dengan banyak peluang penelitian dan pengembangan yang terbuka. Beberapa kemungkinan termasuk mengembangkan implementasi yang lebih efisien dari [algoritma hashing keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), menemukan komitmen polinomial yang lebih baik daripada yang ada saat ini atau mengurangi biaya pembangkitan kunci publik ecdsa dan sirkuit verifikasi tanda tangan.

#### Latar belakang bacaan {#background-reading-6}

- [Blog 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Riset terakhir {#recent-research-6}

- [kemajuan terbaru dalam kriptografi kurva eliptik](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Dompet {#wallets}

Dompet Ethereum dapat berupa ekstensi peramban, aplikasi desktop dan seluler, atau kontrak pintar di Ethereum. Saat ini sedang dilakukan penelitian aktif terhadap dompet pemulihan sosial yang mengurangi sebagian risiko yang terkait dengan pengelolaan kunci pengguna individual. Dalam pengembangan dompet terkait, terdapat penelitian terhadap bentuk-bentuk alternatif abstraksi akun, yang merupakan area penelitian yang penting dalam tahap awal.

#### Latar belakang bacaan {#background-reading-7}

- [Pengantar mengenai dompet](/wallets/)
- [Pengantar tentang keamanan dompet](/security/)
- [keamanan ethresear.ch](https://ethresear.ch/tag/keamanan)
- [Abstraksi Akun EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Abstraksi Akun EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)

#### Riset terakhir {#recent-research-7}

- [dompet kontrak pintar yang berfokus pada validasi](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [masa depan akun](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [kode operasi autentikasi dan panggilan autentikasi eip-3074](https://eips.ethereum.org/EIPS/eip-3074)
- [kode penerbitan di alamat eoa](https://eips.ethereum.org/EIPS/eip-5003)

## Komunitas, pendidikan dan sosialisasi {#community-education-and-outreach}

Mengenalkan pengguna baru ke Ethereum memerlukan sumber daya pendidikan baru dan pendekatan penyuluhan yang berbeda. Hal ini mungkin melibatkan tulisan blog dan artikel, buku, podcast, meme, sumber daya pengajaran, kegiatan, serta apapun untuk membangun komunitas, menyambut pendatang baru, dan memberikan pemahaman mengenai Ethereum.

### UX/UI {#uxui}

Untuk mendapatkan lebih banyak orang ke Ethereum, ekosistem harus meningkatkan UX/UI. Hal ini akan memerlukan desainer dan ahli produk untuk mengkaji ulang desain dompet dan aplikasi.

#### Latar belakang bacaan {#background-reading-8}

- [UX/UI ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Riset terakhir {#recent-research-8}

- [desain web3 discord](https://discord.gg/FsCFPMTSm9)
- [prinsip desain web3](https://www.web3designprinciples.com/)
- [diskusi pesulap ethereum ux](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Ekonomi {#economics}

Penelitian ekonomi di Ethereum umumnya mengikuti dua pendekatan: memvalidasi keamanan mekanisme yang mengandalkan insentif ekonomi ("mikroekonomi") dan menganalisis aliran nilai antara protokol, aplikasi, dan pengguna ("makroekonomi"). Terdapat faktor-faktor kripto-ekonomi kompleks yang terkait dengan aset bawaan Ethereum (ether) dan token-token yang dibangun di atasnya (misalnya NFT dan token ERC20).

#### Latar belakang bacaan {#background-reading-9}

- [kelompok insentif yang kuat](https://rig.ethereum.org/)
- [lokakarya etkonomi di devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Riset terakhir {#recent-research-9}

- [analisis empiris eip1559](https://arxiv.org/abs/2201.05574)
- [keseimbangan pasokan yang beredar](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [mengukur mev: Seberapa gelap hutannya?](https://arxiv.org/abs/2101.05511)

### Pasar blockspace dan biaya {#blockspace-fee-markets}

Pasar ruang blok mengatur inklusi transaksi pengguna akhir, baik secara langsung di Ethereum (Lapisan 1) maupun pada jaringan terhubung, misalnya rollup (Lapisan 2). Di Ethereum, transaksi dikirimkan ke pasar biaya yang diterapkan dalam protokol sebagai EIP-1559, melindungi jaringan dari spam dan kongesti harga. Pada kedua lapisan, transaksi dapat menghasilkan efek samping, yang dikenal sebagai Nilai Maksimal Ekstraktable (MEV), yang mendorong struktur pasar baru untuk menangkap atau mengelola efek samping ini.

#### Latar belakang bacaan {#background-reading-10}

- [Desain mekanisme biaya transaksi untuk blockchain Ethereum: Analisis Ekonomi EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulasi EIP-1559 (Kelompok Insentif yang Kuat)](https://ethereum.github.io/abm1559)
- [ekonomi rollup dari prinsip-prinsip pertama](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [flash boys 2,0: Frontrunning, Penataan Ulang Transaksi, dan Ketidakstabilan Konsensus di Bursa Terdesentralisasi](https://arxiv.org/abs/1904.05234)

#### Riset terakhir {#recent-research-10}

- [presentasi video eip-1559 multidimensi](https://youtu.be/QbR4MTgnCko)
- [lintas domain mev](http://arxiv.org/abs/2112.01472)
- [lelang mev](https://ethresear.ch/t/lelang-mev-melelang-hak-pemesanan-transaksi-sebagai-solusi-untuk-nilai-yang-dapat-diekstrak-oleh-penambang/6788)

### Insentif bukti kepemilikan {#proof-of-stake-incentives}

Validator menggunakan aset asli Ethereum (ether) sebagai jaminan terhadap perilaku tidak jujur. Kriptoekonomi ini menentukan keamanan jaringan. Validator yang canggih mungkin dapat memanfaatkan nuansa lapisan insentif untuk meluncurkan serangan eksplisit.

#### Latar belakang bacaan {#background-reading-11}

- [kelas master ekonomi ethereum dan model ekonomi](https://github.com/CADLabs/ethereum-economic-model)
- [simulasi insentif pos (kelompok insentif yang kuat)](https://ethereum.github.io/beaconrunner/)

#### Riset terakhir {#recent-research-11}

- [meningkatkan ketahanan sensor transaksi di bawah pemisahan pengusul/pembangun (pbs)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [tiga serangan terhadap pos ethereum](https://arxiv.org/abs/2110.10086)

### Staking dan derivatif likuid {#liquid-staking-and-derivatives}

Staking cair memungkinkan pengguna dengan kurang dari 32 ETH untuk menerima hasil staking dengan menukar ether dengan token yang mewakili ether yang dipertaruhkan yang dapat digunakan dalam DeFi. Namun, insentif dan dinamika pasar yang terkait dengan staking likuid masih terus diungkap, begitu pula pengaruhnya terhadap keamanan Ethereum (misalnya risiko sentralisasi).

#### Latar belakang bacaan {#background-reading-12}

- [ethresear.ch staking cair](https://ethresear.ch/search?q=liquid%20staking)
- [lido: Jalan menuju staking Ethereum tanpa kepercayaan](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [rocket pool: Pengenalan protokol staking](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Riset terakhir {#recent-research-12}

- [menangani penarikan dari lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Kredensial penarikan](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [risiko derivatif staking likuid](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Pengujian {#testing}

### Verifikasi formal {#formal-verification}

Verifikasi formal adalah penulisan kode untuk memverifikasi bahwa spesifikasi konsensus Ethereum benar dan bebas bug. Ada versi spesifikasi yang dapat dieksekusi yang ditulis dalam Python yang memerlukan pemeliharaan dan pengembangan. Penelitian lebih lanjut dapat membantu meningkatkan implementasi Python pada spesifikasi tersebut dan menambahkan alat yang dapat memverifikasi kebenaran dan mengidentifikasi masalah dengan lebih kuat.

#### Latar belakang bacaan {#background-reading-13}

- [Pengantar verifikasi formal](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Verifikasi Formal (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Riset terakhir {#recent-research-13}

- [verifikasi formal kontrak deposit](https://github.com/runtimeverification/deposit-contract-verification)
- [verifikasi formal spesifikasi rantai suar](https://github.com/runtimeverification/deposit-contract-verification)

## Ilmu data dan analitik {#data-science-and-analytics}

Ada kebutuhan untuk lebih banyak alat analisis data dan dasbor yang memberikan informasi terperinci tentang aktivitas di Ethereum dan kesehatan jaringan.

### Latar belakang bacaan {#background-reading-14}

- [analitik bukit pasir](https://dune.com/browse/dashboards)
- [dasbor keragaman klien](https://clientdiversity.org/)

#### Riset terakhir {#recent-research-14}

- [analisis data kelompok insentif yang kuat](https://rig.ethereum.org/)

## Aplikasi dan perkakas {#apps-and-tooling}

Lapisan aplikasi mendukung ekosistem beragam program yang menyelesaikan transaksi di lapisan dasar Ethereum. Tim pengembang terus-menerus menemukan cara baru untuk memanfaatkan Ethereum untuk menciptakan versi aplikasi Web2 penting yang dapat dikomposisikan, tanpa izin, dan tahan sensor, atau menciptakan konsep baru yang sepenuhnya asli Web3. Pada saat yang sama, alat-alat baru sedang dikembangkan untuk membuat pembangunan dapp di Ethereum menjadi kurang kompleks.

### DeFi {#defi}

Keuangan terdesentralisasi (DeFi) adalah salah satu kelas utama aplikasi yang dibangun di atas Ethereum. DeFi bertujuan untuk menciptakan "money legos" yang dapat dikomposisikan, yang memungkinkan pengguna untuk menyimpan, mentransfer, meminjamkan, meminjam, dan menginvestasikan aset kripto menggunakan smart contract. DeFi adalah ruang yang bergerak cepat dan terus diperbarui. Penelitian terhadap protokol yang aman, efisien, dan mudah diakses terus dibutuhkan.

#### Latar belakang bacaan {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Apa itu DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Riset terakhir {#recent-research-15}

- [keuangan terdesentralisasi, kepemilikan terpusat?](https://arxiv.org/pdf/2012.09306.pdf)
- [optimisme: Jalan menuju transaksi sub-dolar](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Salah satu kasus penggunaan Ethereum yang berdampak adalah kemampuan untuk berorganisasi secara terdesentralisasi melalui penggunaan DAO. Terdapat banyak penelitian aktif tentang bagaimana DAO di Ethereum dapat dikembangkan dan digunakan untuk menjalankan bentuk tata kelola yang lebih baik, sebagai alat koordinasi yang meminimalkan kebutuhan akan kepercayaan, sehingga secara signifikan memperluas opsi orang di luar korporasi dan organisasi tradisional.

#### Latar belakang bacaan {#background-reading-16}

- [Pengantar DAO](/dao/)
- [dao kolektif](https://daocollective.xyz/)

#### Riset terakhir {#recent-research-16}

- [Pemetaan ekosistem DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Perangkat pengembang {#developer-tools}

Peralatan untuk pengembang Ethereum berkembang pesat. Ada banyak penelitian dan pengembangan aktif yang harus dilakukan di bidang umum ini.

#### Latar belakang bacaan {#background-reading-17}

- [Peralatan berdasarkan bahasa pemrograman](/developers/docs/programming-languages/)
- [Developer Frameworks](/developers/docs/frameworks/)
- [daftar alat pengembang konsensus](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Standar token](/developers/docs/standards/tokens/)
- [cryptodevhub: Alat EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Riset terakhir {#recent-research-17}

- [saluran alat konsensus discord litbang eth](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oracle {#oracles}

Oracle mengimpor data dari offchain ke dalam blockchain secara tanpa izin dan terdesentralisasi. Mendapatkan data ini di on-chain memungkinkan dapp untuk bereaksi terhadap fenomena dunia nyata, seperti fluktuasi harga aset nyata, peristiwa di aplikasi off-chain, atau bahkan perubahan cuaca.

#### Latar belakang bacaan {#background-reading-18}

- [Pengenalan Oracle](/developers/docs/oracles/)

#### Riset terakhir {#recent-research-18}

- [survei oracle blockchain](https://arxiv.org/pdf/2004.07140.pdf)
- [kertas putih chainlink](https://chain.link/whitepaper)

### Keamanan aplikasi {#app-security}

Peretasan di Ethereum umumnya memanfaatkan kerentanan pada aplikasi individual daripada pada protokol itu sendiri. Peretas dan pengembang aplikasi terlibat dalam perlombaan senjata untuk mengembangkan serangan dan pertahanan baru. Ini berarti selalu diperlukan penelitian dan pengembangan yang penting untuk menjaga aplikasi tetap aman dari peretasan.

#### Latar belakang bacaan {#background-reading-19}

- [laporan eksploitasi lubang cacing](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [daftar post-mortem peretasan kontrak ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [berita rekt](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Riset terakhir {#recent-research-19}

- [aplikasi ethresear.ch](https://ethresear.ch/c/aplikasi/18)

### Tumpukan teknologi {#technology-stack}

Desentralisasi seluruh tumpukan teknologi Ethereum merupakan area penelitian yang penting. Saat ini, dapps di Ethereum umumnya memiliki beberapa titik sentralisasi karena mengandalkan perkakas atau infrastruktur terpusat.

#### Latar belakang bacaan {#background-reading-20}

- [Stack Ethereum](/developers/docs/ethereum-stack/)
- [coinbase: Pengantar Tumpukan Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Pengenalan kontrak pintar](/developers/docs/smart-contracts/)
- [Pengantar penyimpanan terdesentralisasi](/developers/docs/storage/)

#### Riset terakhir {#recent-research-20}

- [Komposabilitas kontrak pintar](/developers/docs/smart-contracts/composability/)
