---
title: Area aktif penelitian Ethereum
description: Jelajahi berbagai area penelitian terbuka dan pelajari cara untuk terlibat.
lang: id
---

Salah satu kekuatan utama Ethereum adalah komunitas penelitian dan rekayasa aktif yang terus-menerus meningkatkannya. Banyak orang yang antusias dan terampil di seluruh dunia ingin mendedikasikan diri mereka pada masalah-masalah yang belum terselesaikan di Ethereum, tetapi tidak selalu mudah untuk mengetahui apa saja masalah tersebut. Halaman ini menguraikan area penelitian aktif utama sebagai panduan kasar menuju teknologi mutakhir Ethereum.

## Cara kerja penelitian Ethereum {#how-ethereum-research-works}

Penelitian Ethereum bersifat terbuka dan transparan. Budayanya adalah membuat alat dan hasil penelitian seterbuka dan seinteraktif mungkin, misalnya melalui buku catatan (notebook) yang dapat dieksekusi. Penelitian Ethereum bergerak cepat, dengan temuan baru yang diunggah dan didiskusikan secara terbuka di forum seperti [ethresear.ch](https://ethresear.ch/) alih-alih menjangkau komunitas melalui publikasi tradisional setelah melalui beberapa putaran tinjauan sejawat (peer review). Yayasan Ethereum juga memublikasikan apa yang sedang diprioritaskannya dan alasannya, sehingga siapa pun dapat melihat masalah mana yang saat ini dianggap mendesak.

## Sumber daya penelitian umum {#general-research-resources}

Terlepas dari topik spesifiknya, ada banyak informasi tentang penelitian Ethereum yang dapat ditemukan di [ethresear.ch](https://ethresear.ch) dan [saluran Discord R&D Eth](https://discord.gg/qGpsxSA). Ini adalah tempat utama di mana para peneliti Ethereum mendiskusikan ide-ide terbaru dan peluang pengembangan.

Untuk gambaran umum tentang arah protokol, mulailah dengan [peta jalan Ethereum](/roadmap/), lalu baca [Pembaruan Prioritas Protokol untuk 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026) dari Yayasan Ethereum dan [pembaruan klaster protokol](https://blog.ethereum.org/2026/05/11/protocol-update-may-26) yang melaporkan kemajuannya. [Studi Protokol Ethereum](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) adalah titik masuk terstruktur bagi orang-orang yang ingin bekerja pada protokol itu sendiri.

## Sumber Pendanaan {#sources-of-funding}

Anda dapat terlibat dengan penelitian Ethereum dan mendapatkan bayaran untuk itu. [Yayasan Ethereum](/foundation/) mendanai penelitian dan barang publik melalui [Program Dukungan Ekosistem](https://esp.ethereum.foundation/applicants)-nya, yang mengunggah daftar keinginan dan permintaan proposal yang menjelaskan masalah yang ingin diselesaikan. Anda dapat menemukan informasi tentang peluang pendanaan yang aktif dan yang akan datang di [halaman hibah Ethereum](/community/grants/).

## Penelitian protokol {#protocol-research}

Penelitian protokol berkaitan dengan lapisan dasar Ethereum: serangkaian aturan yang menentukan bagaimana node terhubung, berkomunikasi, bertukar, dan menyimpan data Ethereum serta mencapai konsensus tentang state dari rantai blok. Dua kategori lamanya adalah konsensus dan eksekusi, dan beberapa topik penelitian kini melintasi keduanya.

### Konsensus {#consensus}

Penelitian konsensus berkaitan dengan [mekanisme Bukti Kepemilikan (PoS) Ethereum](/developers/docs/consensus-mechanisms/pos/): keamanan aturan pilihan percabangan dan gawai finalitas, kriptoekonomi dari staking, jaringan peer-to-peer yang membawa blok, atestasi, dan data blob, serta kriptografi yang digunakan validator untuk tanda tangan. Beberapa contoh topik penelitian konsensus adalah:

- mengidentifikasi dan menambal kerentanan;
- mengukur keamanan kriptoekonomi;
- mengurangi waktu yang dibutuhkan agar sebuah blok mencapai finalitas;
- dan meningkatkan efisiensi, keamanan, serta pemantauan jaringan peer-to-peer antara klien konsensus.

Sebagian besar pekerjaan ini telah beralih dari makalah ke spesifikasi. Pengambilan sampel ketersediaan data diluncurkan pada peningkatan [Fusaka](/roadmap/fusaka/), perubahan pada cara blok dibangun dan bagaimana transaksi dijamin penyertaannya telah dispesifikasikan untuk peningkatan mendatang, dan desain ulang jangka panjang yang dikenal sebagai konsensus ramping (lean consensus) sedang mengeksplorasi finalitas yang lebih cepat bersama dengan tanda tangan pasca-kuantum.

#### Bacaan latar belakang {#background-reading}

- [Pengantar Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Finalitas slot tunggal](/roadmap/single-slot-finality/)
- [Makalah Casper FFG](https://arxiv.org/abs/1710.09437)
- [Makalah Gasper](https://arxiv.org/abs/2003.03052)
- [Ethereum ramping (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### Penelitian terbaru {#recent-research}

- [Konsensus Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilema Ketersediaan/Finalitas](https://arxiv.org/abs/2009.04987)
- [Finalitas 3-slot: SSF bukan tentang slot "tunggal"](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### Eksekusi {#execution}

Lapisan eksekusi berkaitan dengan mengeksekusi transaksi, menjalankan [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/), dan menghasilkan muatan eksekusi untuk diteruskan ke lapisan konsensus. Penelitian di sini terbagi menjadi dua untaian: membuat state menjadi murah untuk disimpan dan dibuktikan, serta meningkatkan laju pemrosesan tanpa membebankan lebih banyak biaya kepada orang-orang yang menjalankan node. Ada banyak area penelitian aktif, termasuk:

- menetapkan ulang biaya gas dari operasi yang menciptakan state;
- kedaluwarsa riwayat yang tidak lagi perlu dilayani oleh node;
- daftar akses tingkat blok yang memungkinkan transaksi divalidasi secara paralel;
- pasar biaya multidimensi yang menetapkan harga state, data, dan komputasi secara terpisah;
- dan membuktikan eksekusi blok l1 dengan zkEVM.

#### Bacaan latar belakang {#background-reading-1}

- [Pengantar EVM](/developers/docs/evm/)
- [Lapisan eksekusi Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)
- [Spesifikasi lapisan eksekusi Ethereum](https://github.com/ethereum/execution-specs)
- [Pengoptimalan basis data](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Penelitian terbaru {#recent-research-1}

- [EIP-7928: Daftar akses tingkat blok](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: Peningkatan biaya gas pembuatan state](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: Pasar biaya multidimensi terpadu](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69, kedaluwarsa riwayat dan tanda terima yang lebih sederhana](https://eips.ethereum.org/EIPS/eip-7642)
- [Meluncurkan zkEVM l1: pembuktian waktu nyata](https://blog.ethereum.org/2025/07/10/realtime-proving)

### Ketahanan sensor dan pembangunan blok {#censorship-resistance-and-block-building}

Sebagian besar blok Ethereum saat ini dirakit oleh sejumlah kecil pembangun khusus, yang memusatkan kekuatan untuk memutuskan transaksi mana yang disertakan. Penelitian di area ini mencakup membawa pasar pembangun ke dalam protokol itu sendiri, sehingga peran mengusulkan dan membangun blok dipisahkan oleh aturan konsensus alih-alih oleh perangkat lunak di luar protokol, dan memberi validator cara untuk memaksa penyertaan transaksi yang ditinggalkan oleh pembangun.

#### Bacaan latar belakang {#background-reading-21}

- [Pemisahan pengusul-pembangun (PBS)](/roadmap/pbs/)
- [Pemilihan pemimpin rahasia tunggal (SSLE)](/roadmap/secret-leader-election/)

#### Penelitian terbaru {#recent-research-21}

- [EIP-7732: Pemisahan pengusul-pembangun yang tertanam](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: Daftar penyertaan yang ditegakkan oleh pilihan percabangan](https://eips.ethereum.org/EIPS/eip-7805)
- [Meningkatkan ketahanan sensor transaksi di bawah pemisahan pengusul/pembangun](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Pertumbuhan state dan ketiadaan state {#state-growth-and-statelessness}

Setiap full node menyimpan state Ethereum, sehingga tingkat pertumbuhan state tersebut menetapkan batas bawah biaya untuk menjalankannya. Dalam jangka pendek, penelitian berfokus pada penetapan ulang harga operasi yang menciptakan state dan pada kedaluwarsa riwayat yang tidak lagi perlu disimpan oleh node. Dalam jangka panjang, rencananya adalah mengganti trie Merkle-Patricia heksari Ethereum dengan pohon biner yang menghasilkan bukti yang jauh lebih kecil, dan bergerak menuju ketiadaan state, sehingga sebuah node dapat memverifikasi blok tanpa menyimpan seluruh state. Pekerjaan sebelumnya di area ini mengasumsikan Pohon Verkle; proposal saat ini adalah pohon biner terpadu, yang membawa jadwal gas Saksi yang ditentukan untuk lini pekerjaan sebelumnya tersebut.

#### Bacaan latar belakang {#background-reading-22}

- [Ketiadaan state dan Kedaluwarsa state](/roadmap/statelessness/)
- [Buku ketiadaan state Ethereum](https://stateless.fyi/)

#### Penelitian terbaru {#recent-research-22}

- [EIP-7864: State Ethereum menggunakan pohon biner terpadu](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: Perubahan biaya gas ketiadaan state](https://eips.ethereum.org/EIPS/eip-4762)
- [Mengapa state terdesentralisasi penting bagi Ethereum](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### Kriptografi pasca-kuantum {#post-quantum-cryptography}

Tanda tangan validator Ethereum dan sebagian besar lapisan aplikasinya bergantung pada kriptografi kurva eliptik, yang dapat ditembus oleh komputer kuantum yang cukup mumpuni. Membuat Ethereum tahan kuantum berarti mengganti tanda tangan tersebut dengan alternatif berbasis hash atau berbasis kisi (lattice), menjaga agregasi tanda tangan tetap cukup efisien untuk kumpulan validator yang besar, dan memberikan jalur migrasi bagi akun yang ada. Yayasan Ethereum menjalankan tim pasca-kuantum khusus, dan ini adalah salah satu program dengan cakrawala terpanjang di peta jalan.

#### Bacaan latar belakang {#background-reading-23}

- [Ketahanan kuantum](/roadmap/security/quantum-resistance/)
- [Ethereum pasca-kuantum](https://pq.ethereum.org/)

#### Penelitian terbaru {#recent-research-23}

- [Ethereum ramping (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Kriptografi Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Implementasi Ethereum ramping](https://github.com/leanEthereum)

## Pengembangan Klien {#client-development}

Klien Ethereum adalah implementasi dari protokol Ethereum. Pengembangan klien mewujudkan hasil dari penelitian protokol menjadi kenyataan dengan membangunnya ke dalam klien-klien ini. Pengembangan klien mencakup pembaruan spesifikasi klien serta membangun implementasi spesifik.

Sebuah node Ethereum diharuskan untuk menjalankan dua perangkat lunak:

1. klien konsensus untuk melacak kepala rantai blok, menggosipkan blok, dan menangani logika konsensus
2. klien eksekusi untuk mendukung Mesin Virtual Ethereum dan mengeksekusi transaksi serta kontrak pintar

Kelas klien baru sedang dibuat prototipenya bersama dengan kedua klien tersebut, termasuk klien yang membuktikan eksekusi blok l1 dan klien konsensus ramping yang dibangun di sekitar tanda tangan pasca-kuantum.

Lihat [halaman node dan klien](/developers/docs/nodes-and-clients/) untuk detail lebih lanjut tentang node dan klien serta untuk daftar semua implementasi klien saat ini. Anda juga dapat menemukan riwayat semua peningkatan Ethereum di [halaman riwayat](/ethereum-forks/).

### Klien Eksekusi {#execution-clients}

- [Spesifikasi klien eksekusi](https://github.com/ethereum/execution-specs)
- [Spesifikasi API Eksekusi](https://github.com/ethereum/execution-apis)

### Klien Konsensus {#consensus-clients}

- [Spesifikasi klien konsensus](https://github.com/ethereum/consensus-specs)
- [Spesifikasi API Beacon](https://ethereum.github.io/beacon-APIs/)

### Klien zkEVM {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Meluncurkan zkEVM l1: fondasi keamanan](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## Penskalaan dan kinerja {#scaling-and-performance}

Penskalaan Ethereum adalah area fokus besar bagi para peneliti Ethereum, dan ini berjalan pada dua jalur secara bersamaan: meningkatkan laju pemrosesan lapisan 1 itu sendiri, dan memindahkan eksekusi ke rollup yang memposting data mereka ke Ethereum. Pekerjaan saat ini mencakup peningkatan batas gas blok, penetapan ulang harga pertumbuhan state, perluasan kapasitas blob untuk data rollup, dan pengurangan apa yang harus disimpan dan diverifikasi oleh sebuah node. Informasi pengantar tentang penskalaan Ethereum tersedia di [halaman penskalaan](/developers/docs/scaling/) kami dan [peta jalan penskalaan](/roadmap/scaling/).

### Lapisan 2 {#layer-2}

Sekarang ada beberapa protokol lapisan 2 (l2) yang menskalakan Ethereum menggunakan teknik berbeda untuk pemrosesan batch transaksi dan mengamankannya di lapisan 1 Ethereum. Penelitian terbuka mencakup pengurangan latensi dan biaya pembuktian, mempersingkat waktu yang dibutuhkan transaksi untuk mencapai finalitas tanpa kepercayaan, dan memberi pengguna pengalaman tunggal yang koheren di banyak rollup.

#### Bacaan latar belakang {#background-reading-2}

- [Pengantar lapisan 2](/layer-2/)
- [L2BEAT: ringkasan penskalaan](https://l2beat.com/scaling/summary)
- [Peta jalan ethereum yang berpusat pada rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### Penelitian terbaru {#recent-research-2}

- [Lapisan 2 Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: biaya onchain](https://l2beat.com/scaling/costs)
- [Membangun di Ethereum pada tahun 2026: apa yang telah berubah](/latest/building-on-ethereum-in-2026/)

### Interoperabilitas {#interoperability}

Pengguna dan aset tersebar di lapisan 1 Ethereum dan banyak lapisan 2, dan masalah penelitiannya adalah membiarkan mereka bergerak dan bertindak melintasi rantai-rantai tersebut tanpa memercayai perantara. Pekerjaan di sini mencakup transfer berbasis intensi, pengalamatan dan penamaan lintas rantai yang distandarisasi, penyampaian pesan umum, dan abstraksi rantai di tingkat dompet. Ini menggantikan model di mana jembatan kustodian memegang aset, dan jembatan secara historis telah menjadi salah satu sumber kerugian terbesar dalam ekosistem, sehingga keamanan mekanisme lintas rantai apa pun tetap menjadi perhatian utama.

#### Bacaan latar belakang {#background-reading-3}

- [Pengantar jembatan rantai blok](/bridges/)
- [Membuat Ethereum terasa seperti satu rantai lagi](https://blog.ethereum.org/2025/11/18/eil)
- [Kerangka Kerja Intensi Terbuka](https://openintents.xyz/)
- [Memvalidasi jembatan](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Penelitian terbaru {#recent-research-3}

- [ERC-7683: Intensi lintas rantai](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: Alamat Interoperabel](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: Nama Interoperabel](https://eips.ethereum.org/EIPS/eip-7828)

### Ketersediaan data dan penskalaan blob {#data-availability-and-blob-scaling}

Rollup memposting data mereka ke Ethereum dalam blob, dan menskalakan lapisan data tersebut adalah masalah penelitian tersendiri, terpisah dari penskalaan eksekusi. Ethereum sekarang menggunakan pengambilan sampel ketersediaan data, sehingga validator dapat memverifikasi bahwa data blob telah dipublikasikan dengan mengambil sampel bagian-bagiannya alih-alih mengunduh semuanya, dan kapasitas blob ditingkatkan secara bertahap melalui percabangan khusus parameter blob saja. Pertanyaan terbuka mencakup seberapa jauh pengambilan sampel dapat didorong, bagaimana menjaga persyaratan bandwidth tetap dapat dikelola bagi orang-orang yang melakukan staking di rumah, dan bagaimana penetapan harga blob harus merespons permintaan.

#### Bacaan latar belakang {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Peningkatan Fusaka](/roadmap/fusaka/)
- [danksharding](/roadmap/danksharding/)
- [Ketersediaan data](/developers/docs/data-availability/)
- [EIP-4844: Transaksi blob shard](https://eips.ethereum.org/EIPS/eip-4844)
- [Catatan Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### Penelitian terbaru {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: Hardfork khusus parameter blob](https://eips.ethereum.org/EIPS/eip-7892)
- [Sharding Ethresear.ch](https://ethresear.ch/c/sharding/6)

### Perangkat Keras {#hardware}

[Menjalankan node](/developers/docs/nodes-and-clients/run-a-node/) pada perangkat keras sederhana sangat mendasar untuk menjaga Ethereum tetap terdesentralisasi, sehingga setiap peningkatan laju pemrosesan harus ditimbang terhadap biayanya bagi operator node. Dengan batas gas blok yang meningkat dan peningkatan lebih lanjut yang direncanakan, penelitian aktif mencakup pertumbuhan state dan cara menetapkan harganya, sinkronisasi dan kinerja basis data pada state yang lebih besar, penghematan disk yang tersedia dari kedaluwarsa riwayat, dan pada akhirnya ketiadaan state.

#### Bacaan latar belakang {#background-reading-5}

- [Jalankan node Ethereum Anda sendiri](/developers/docs/nodes-and-clients/run-a-node/)
- [Ketiadaan state dan Kedaluwarsa state](/roadmap/statelessness/)
- [Ethereum di ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Penelitian terbaru {#recent-research-5}

- [Menskalakan Ethereum: jalan menuju batas gas yang lebih tinggi dan seterusnya](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: Jadwal batas gas](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: Peningkatan biaya gas pembuatan state](https://eips.ethereum.org/EIPS/eip-8037)

## Keamanan {#security}

Keamanan adalah topik luas yang mungkin mencakup pencegahan spam dan penipuan, keamanan dompet, keamanan perangkat keras, keamanan kriptoekonomi, ketahanan sensor, kesiapan pasca-kuantum, perburuan bug, serta pengujian dan verifikasi aplikasi dan perangkat lunak klien. [Peta jalan keamanan](/roadmap/security/) Ethereum mencakup pekerjaan tingkat protokol.

### Kriptografi & ZKP {#cryptography--zkp}

Bukti tanpa pengetahuan (ZKP) dan kriptografi sangat penting untuk membangun privasi dan keamanan ke dalam Ethereum dan aplikasinya. Pembuktian zero-knowledge telah beralih dari penelitian ke infrastruktur produksi: pembukti yang membuktikan blok Ethereum nyata sekarang diukur secara publik berdasarkan latensi, biaya, dan keandalannya. Masalah terbuka telah bergeser sesuai dengan itu, menuju pembuktian blok l1 yang cukup cepat untuk melakukannya secara waktu nyata, memperhitungkan secara ketat keamanan sistem pembuktian yang digunakan, dan bersiap untuk kriptografi pasca-kuantum.

#### Bacaan latar belakang {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Privasi](/roadmap/privacy/)
- [Siniar Zero Knowledge](https://zeroknowledge.fm/)

#### Penelitian terbaru {#recent-research-6}

- [ZK Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Kriptografi Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Kalkulator keandalan untuk sistem pembuktian zkEVM berbasis hash](https://github.com/ethereum/soundcalc)
- [Meluncurkan zkEVM l1: fondasi keamanan](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### Dompet {#wallets}

Dompet Ethereum dapat berupa ekstensi peramban, aplikasi desktop dan seluler, atau kontrak pintar di Ethereum. Abstraksi akun tidak lagi bersifat eksperimental: ERC-4337 menyediakan akun pintar tanpa perubahan protokol, dan EIP-7702 memungkinkan akun biasa mengatur kode sehingga pemrosesan batch transaksi, sponsor gas, dan pemulihan sosial berfungsi dengan alamat yang sudah dimiliki pengguna. Penelitian terbuka sekarang berpusat pada abstraksi akun asli dalam protokol itu sendiri, pada arsitektur akun modular dan dapat diaudit, serta pada manajemen dan pemulihan kunci yang dapat dioperasikan dengan aman oleh orang biasa.

#### Bacaan latar belakang {#background-reading-7}

- [Pengantar dompet](/wallets/)
- [Pengantar keamanan dompet](/security/)
- [Abstraksi akun](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Keamanan Ethresear.ch](https://ethresear.ch/c/security/25)

#### Penelitian terbaru {#recent-research-7}

- [EIP-8141: Transaksi bingkai (Frame transaction)](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: API panggilan dompet](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: Penemuan penyedia multi-injeksi](https://eips.ethereum.org/EIPS/eip-6963)
- [Dompet kontrak pintar yang berfokus pada validasi](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## Komunitas, pendidikan, dan penjangkauan {#community-education-and-outreach}

Orientasi pengguna baru ke Ethereum membutuhkan sumber daya pendidikan dan pendekatan penjangkauan yang baru. Ini mungkin termasuk postingan blog dan artikel, buku, siniar, meme, sumber daya pengajaran, peristiwa, dan apa pun yang membangun komunitas, menyambut pemula, dan mendidik orang-orang tentang Ethereum.

### Desain dan UX {#design-and-ux}

Untuk mengorientasi lebih banyak orang ke Ethereum, ekosistem harus meningkatkan desain dan pengalaman penggunanya. Ini mengharuskan desainer dan pakar produk untuk memeriksa kembali cara kerja dompet dan aplikasi, dan ini semakin berarti merancang berdasarkan standar yang sudah ada: panggilan dompet yang diproses secara batch, sponsor gas, akun yang dapat dipulihkan, dan alamat yang dapat dibaca manusia yang membawa rantai tempat mereka berada. Secara komparatif, hanya ada sedikit tempat kanonik untuk penelitian UX Web3, sehingga studi dan panduan desain yang dipublikasikan cenderung tersebar.

#### Bacaan latar belakang {#background-reading-8}

- [Desain dan UX di Web3](/developers/docs/design-and-ux/)
- [Peta jalan pengalaman pengguna Ethereum](/roadmap/user-experience/)
- [Buku Panduan Desain Web3](https://learnweb3.design/)
- [Buku Pegangan Desain UX Web3](https://web3ux.design/)

#### Penelitian terbaru {#recent-research-8}

- [UX/UI Ethresear.ch](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: API panggilan dompet](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: Nama Interoperabel](https://eips.ethereum.org/EIPS/eip-7828)

### Ekonomi {#economics}

Penelitian ekonomi di Ethereum secara luas mengikuti dua pendekatan: memvalidasi keamanan mekanisme yang mengandalkan insentif ekonomi ("mikroekonomi") dan menganalisis aliran nilai antara protokol, aplikasi, dan pengguna ("makroekonomi"). Ada faktor kriptoekonomi yang kompleks terkait dengan aset asli Ethereum (Ether) dan token yang dibangun di atasnya (misalnya NFT dan token ERC-20).

#### Bacaan latar belakang {#background-reading-9}

- [Grup Insentif Kuat (Robust Incentives Group)](https://rig.ethereum.org/)
- [Kelas master ekonomi Ethereum dan model ekonomi](https://github.com/CADLabs/ethereum-economic-model)

#### Penelitian terbaru {#recent-research-9}

- [Ekonomi Ethresear.ch](https://ethresear.ch/c/economics/16)
- [Keseimbangan pasokan yang beredar](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Mengukur MEV: Seberapa gelap hutannya?](https://arxiv.org/abs/2101.05511)

### Ruang blok dan pasar biaya {#blockspace-fee-markets}

Pasar ruang blok mengatur penyertaan transaksi pengguna akhir, baik secara langsung di Ethereum (lapisan 1) atau di jaringan yang dijembatani, misalnya, rollup (lapisan 2). Di Ethereum, transaksi dikirimkan ke pasar biaya yang diterapkan dalam protokol sebagai EIP-1559, melindungi rantai dari spam dan menetapkan harga kemacetan. Di kedua lapisan, transaksi dapat menghasilkan eksternalitas, yang dikenal sebagai Nilai Maksimal yang Dapat Diekstraksi (MEV), yang mendorong struktur pasar baru untuk menangkap atau mengelola eksternalitas ini. Pekerjaan saat ini memperluas hal ini ke penetapan harga beberapa sumber daya sekaligus, karena state, data, dan komputasi mengalami kemacetan secara independen, dan untuk mengubah siapa yang merakit blok dan dengan persyaratan apa.

#### Bacaan latar belakang {#background-reading-10}

- [Desain Mekanisme Biaya Transaksi untuk Rantai Blok Ethereum: Analisis Ekonomi EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulasi EIP-1559 (Grup Insentif Kuat)](https://ethereum.github.io/abm1559)
- [Ekonomi rollup dari prinsip pertama](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, Pengurutan Ulang Transaksi, dan Ketidakstabilan Konsensus di Bursa Terdesentralisasi](https://arxiv.org/abs/1904.05234)

#### Penelitian terbaru {#recent-research-10}

- [EIP-7999: Pasar biaya multidimensi terpadu](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: Daftar akses tingkat blok](https://eips.ethereum.org/EIPS/eip-7928)
- [MEV lintas domain](https://arxiv.org/abs/2112.01472)

### Insentif Bukti Kepemilikan (PoS) {#proof-of-stake-incentives}

Validator menggunakan aset asli Ethereum (Ether) sebagai kolateral terhadap perilaku tidak jujur. Kriptoekonomi dari hal ini menentukan keamanan jaringan. Validator yang canggih mungkin dapat mengeksploitasi nuansa lapisan insentif untuk meluncurkan serangan eksplisit. Sejak peningkatan Pectra, validator juga dapat menahan dan memperoleh penghasilan dari saldo efektif yang jauh lebih besar dan mengonsolidasikan beberapa validator menjadi satu, yang mengubah ekonomi dalam menjalankannya.

#### Bacaan latar belakang {#background-reading-11}

- [Saldo efektif maksimum](/roadmap/pectra/maxeb/)
- [Kelas master ekonomi Ethereum dan model ekonomi](https://github.com/CADLabs/ethereum-economic-model)
- [Simulasi insentif PoS (Grup Insentif Kuat)](https://ethereum.github.io/beaconrunner/)

#### Penelitian terbaru {#recent-research-11}

- [Grup Insentif Kuat](https://rig.ethereum.org/)
- [Tiga Serangan pada PoS Ethereum](https://arxiv.org/abs/2110.10086)

### Staking likuid dan derivatif {#liquid-staking-and-derivatives}

Staking likuid memungkinkan pengguna dengan kurang dari 32 ETH untuk menerima imbal hasil staking dengan menukar Ether dengan token yang mewakili Ether yang di-stake yang dapat digunakan di DeFi. Namun, insentif dan dinamika pasar yang terkait dengan staking likuid masih terus ditemukan, serta pengaruhnya terhadap keamanan Ethereum (misalnya, risiko sentralisasi).

#### Bacaan latar belakang {#background-reading-12}

- [Staking likuid Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Jalan menuju staking Ethereum tanpa kepercayaan](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### Penelitian terbaru {#recent-research-12}

- [Risiko Derivatif Staking Likuid](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [Menangani penarikan dari Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## Pengujian {#testing}

### Pengujian klien dan jaringan {#client-and-network-testing}

Spesifikasi Ethereum dapat dieksekusi, dan perlengkapan pengujian (test fixtures) yang dihasilkan darinya adalah apa yang digunakan tim klien untuk memeriksa implementasi mereka. Bersamaan dengan itu, test harness bersama menjalankan klien satu sama lain dan terhadap kondisi jaringan yang sengaja dibuat bermusuhan, dan testnet publik menguji peningkatan sebelum mencapai Mainnet. Meningkatkan infrastruktur ini adalah beberapa pekerjaan dengan daya ungkit tertinggi yang tersedia, karena ini adalah cara bug ditangkap sebelum mencapai pengguna.

#### Bacaan latar belakang {#background-reading-24}

- [Spesifikasi lapisan eksekusi Ethereum](https://github.com/ethereum/execution-specs)
- [Spesifikasi klien konsensus](https://github.com/ethereum/consensus-specs)

#### Penelitian terbaru {#recent-research-24}

- [hive, test harness klien ujung-ke-ujung](https://github.com/ethereum/hive)
- [Assertoor, alat pengujian testnet](https://github.com/ethpandaops/assertoor)

### Verifikasi formal {#formal-verification}

Verifikasi formal menggunakan bukti matematis yang diperiksa mesin untuk menetapkan bahwa spesifikasi atau implementasi berperilaku sebagaimana mestinya. Di Ethereum, ini mencakup pembuktian bahwa implementasi EVM cocok dengan semantik formal, membuktikan keandalan sirkuit dan sistem pembuktian yang diandalkan oleh pembukti zero-knowledge, dan memverifikasi primitif kriptografi di bawahnya. Penelitian lebih lanjut dapat memperkuat bukti-bukti ini dan memperluasnya ke lebih banyak tumpukan (stack).

#### Bacaan latar belakang {#background-reading-13}

- [zkEVM yang Diverifikasi](https://verified-zkevm.org/)
- [Verifikasi Formal (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Penelitian terbaru {#recent-research-13}

- [Gambaran umum proyek zkEVM yang diverifikasi](https://github.com/Verified-zkEVM/Overview)
- [KEVM: semantik EVM di K](https://github.com/runtimeverification/evm-semantics)
- [Verifikasi formal dari kontrak deposit](https://github.com/runtimeverification/deposit-contract-verification)

## Ilmu data dan analitik {#data-science-and-analytics}

Ada kebutuhan akan lebih banyak alat analisis data dan dasbor yang memberikan informasi terperinci tentang aktivitas di Ethereum dan kesehatan jaringan. Sebagian besar data yang mendasarinya bersifat publik dan dapat dikueri, sehingga kesenjangannya biasanya ada pada analisis dan presentasi alih-alih pada akses.

### Bacaan latar belakang {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Dasbor keragaman klien](https://clientdiversity.org/)
- [Spesifikasi API eksekusi JSON-RPC Ethereum](https://ethereum.github.io/execution-apis/)

#### Penelitian terbaru {#recent-research-14}

- [Analisis Data Grup Insentif Kuat](https://rig.ethereum.org/)
- [Data terbuka ethPandaOps](https://ethpandaops.io/data/)
- [L2BEAT: ringkasan penskalaan](https://l2beat.com/scaling/summary)

## Aplikasi dan perkakas {#apps-and-tooling}

Lapisan aplikasi mendukung ekosistem program yang beragam yang menyelesaikan transaksi di lapisan dasar Ethereum. Tim pengembangan terus-menerus menemukan cara baru untuk memanfaatkan Ethereum guna membuat versi aplikasi Web2 penting yang dapat disusun, tanpa izin, dan tahan sensor, atau membuat konsep asli Web3 yang sama sekali baru. Pada saat yang sama, perkakas baru sedang dikembangkan yang membuat pembuatan dapp di Ethereum menjadi tidak terlalu rumit.

### DeFi {#defi}

Keuangan terdesentralisasi (DeFi) adalah salah satu kelas aplikasi utama yang dibangun di atas Ethereum. DeFi bertujuan untuk menciptakan "lego uang" yang dapat disusun yang memungkinkan pengguna untuk menyimpan, mentransfer, meminjamkan, meminjam, dan menginvestasikan aset kripto menggunakan kontrak pintar. DeFi adalah ruang yang bergerak cepat yang terus diperbarui. Penelitian tentang protokol yang aman, efisien, dan dapat diakses terus dibutuhkan.

#### Bacaan latar belakang {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Apa itu DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Penelitian terbaru {#recent-research-15}

- [Keuangan terdesentralisasi, kepemilikan terpusat?](https://arxiv.org/pdf/2012.09306.pdf)
- [Aplikasi Ethresear.ch](https://ethresear.ch/c/applications/18)

### DAO {#daos}

Kasus penggunaan yang berdampak untuk Ethereum adalah kemampuan untuk berorganisasi secara terdesentralisasi melalui penggunaan DAO. Ada banyak penelitian aktif tentang bagaimana DAO di Ethereum dapat dikembangkan dan dimanfaatkan untuk mengeksekusi bentuk tata kelola yang lebih baik, sebagai alat koordinasi yang minim kepercayaan, yang sangat memperluas pilihan orang-orang di luar korporasi dan organisasi tradisional.

#### Bacaan latar belakang {#background-reading-16}

- [Pengantar DAO](/dao/)

#### Penelitian terbaru {#recent-research-16}

- [Memetakan ekosistem DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Alat pengembang {#developer-tools}

Alat untuk pengembang Ethereum berkembang pesat. Ada banyak penelitian dan pengembangan aktif yang harus dilakukan di area umum ini.

#### Bacaan latar belakang {#background-reading-17}

- [Perkakas berdasarkan bahasa pemrograman](/developers/docs/programming-languages/)
- [Kerangka Kerja Pengembang](/developers/docs/frameworks/)
- [Pengantar dapp](/developers/docs/dapps/)
- [Standar token](/developers/docs/standards/tokens/)

#### Penelitian terbaru {#recent-research-17}

- [Discord R&D Eth](https://discord.gg/qGpsxSA)
- [Spesifikasi API eksekusi Ethereum](https://github.com/ethereum/execution-apis)

### Oracle {#oracles}

Oracle mengimpor data offchain ke rantai blok dengan cara yang tanpa izin dan terdesentralisasi. Membawa data ini onchain memungkinkan dapp menjadi reaktif terhadap fenomena dunia nyata seperti fluktuasi harga pada aset dunia nyata, peristiwa di aplikasi offchain, atau bahkan perubahan cuaca.

#### Bacaan latar belakang {#background-reading-18}

- [Pengantar Oracle](/developers/docs/oracles/)

#### Penelitian terbaru {#recent-research-18}

- [Survei oracle rantai blok](https://arxiv.org/pdf/2004.07140.pdf)

### Keamanan aplikasi {#app-security}

Peretasan di Ethereum umumnya mengeksploitasi kerentanan dalam aplikasi individual alih-alih dalam protokol itu sendiri. Peretas dan pengembang aplikasi terkunci dalam perlombaan senjata untuk mengembangkan serangan dan pertahanan baru. Ini berarti selalu ada penelitian dan pengembangan penting yang diperlukan untuk menjaga aplikasi tetap aman dari peretasan.

#### Bacaan latar belakang {#background-reading-19}

- [Keamanan kontrak pintar](/developers/docs/smart-contracts/security/)
- [Laporan eksploitasi Wormhole](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [Daftar post-mortem peretasan kontrak Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Berita Rekt](https://rekt.news/)

#### Penelitian terbaru {#recent-research-19}

- [Aplikasi Ethresear.ch](https://ethresear.ch/c/applications/18)

### Tumpukan teknologi {#technology-stack}

Mendesentralisasi seluruh tumpukan teknologi Ethereum adalah area penelitian yang penting. Saat ini, dapp di Ethereum umumnya memiliki beberapa titik sentralisasi karena mereka mengandalkan perkakas atau infrastruktur terpusat. Mengurangi ketergantungan tersebut berarti membuatnya praktis bagi aplikasi untuk membaca Ethereum tanpa memercayai penyedia tunggal, di sinilah klien ringan (light client) dan akses tanpa kepercayaan ke data node berperan.

#### Bacaan latar belakang {#background-reading-20}

- [Tumpukan Ethereum](/developers/docs/ethereum-stack/)
- [Klien ringan](/developers/docs/nodes-and-clients/light-clients/)
- [Pengantar kontrak pintar](/developers/docs/smart-contracts/)
- [Pengantar penyimpanan terdesentralisasi](/developers/docs/storage/)

#### Penelitian terbaru {#recent-research-20}

- [Komposabilitas kontrak pintar](/developers/docs/smart-contracts/composability/)
- [Coinbase: Pengantar Tumpukan Web3](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)