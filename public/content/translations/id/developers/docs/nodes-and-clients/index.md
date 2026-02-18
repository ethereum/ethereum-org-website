---
title: Simpul dan Klien
description: Gambaran umum tentang perangkat lunak node dan klien Ethereum, juga cara menyiapkan node dan mengapa Anda harus melakukannya.
lang: id
sidebarDepth: 2
---

Ethereum adalah jaringan terdistribusi dari komputer-komputer (dikenal sebagai node) yang menjalankan perangkat lunak untuk memverifikasi blok dan data transaksi. Perangkat lunak tersebut harus dijalankan di komputer Anda untuk mengubahnya menjadi node Ethereum. Ada dua perangkat lunak terpisah (dikenal sebagai ‘client’) yang diperlukan untuk membentuk sebuah node.

## Persyaratan {#prerequisites}

Anda harus memahami konsep jaringan peer-to-peer dan [dasar-dasar EVM](/developers/docs/evm/) sebelum menyelami lebih dalam dan menjalankan instans klien Ethereum Anda sendiri. Lihat [pengantar kami tentang Ethereum](/developers/docs/intro-to-ethereum/).

Jika Anda baru mengenal topik simpul, kami merekomendasikan untuk melihat terlebih dahulu pengantar kami yang ramah pengguna tentang [menjalankan simpul Ethereum](/run-a-node).

## Apa itu node dan klien? {#what-are-nodes-and-clients}

Node’ adalah setiap instance dari perangkat lunak client Ethereum yang terhubung dengan komputer lain yang juga menjalankan perangkat lunak Ethereum, sehingga membentuk sebuah jaringan. Client adalah implementasi Ethereum yang memverifikasi data sesuai aturan protokol dan menjaga keamanan jaringan. Sebuah node harus menjalankan dua client: client konsensus dan client eksekusi.

- Execution client (juga dikenal sebagai Execution Engine, EL client, atau sebelumnya Eth1 client) mendengarkan transaksi baru yang disiarkan di jaringan, mengeksekusinya di EVM, dan menyimpan status terbaru serta basis data dari semua data Ethereum saat ini.
- Consensus client (juga dikenal sebagai Beacon Node, CL client, atau sebelumnya Eth2 client) mengimplementasikan algoritma konsensus proof-of-stake, yang memungkinkan jaringan mencapai kesepakatan berdasarkan data yang divalidasi dari execution client. Ada juga perangkat lunak ketiga, yang dikenal sebagai ‘validator’, yang dapat ditambahkan ke consensus client, memungkinkan sebuah node ikut serta dalam menjaga keamanan jaringan.

Client-client ini bekerja sama untuk melacak head dari rantai Ethereum dan memungkinkan pengguna berinteraksi dengan jaringan Ethereum. Desain modular dengan beberapa bagian perangkat lunak yang bekerja bersama disebut [kompleksitas terkapsulasi](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Pendekatan ini mempermudah eksekusi [Penggabungan](/roadmap/merge) dengan lancar, membuat perangkat lunak klien lebih mudah dipelihara dan dikembangkan, dan memungkinkan penggunaan kembali klien individual, misalnya, dalam [ekosistem lapisan ke-2](/layer-2/).

![Klien eksekusi dan konsensus yang digabungkan](./eth1eth2client.png)
Diagram sederhana dari klien eksekusi dan konsensus yang digabungkan.

### Keanekaragaman klien {#client-diversity}

Baik [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) maupun [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients) tersedia dalam berbagai bahasa pemrograman yang dikembangkan oleh tim yang berbeda.

Beberapa implementasi client dapat membuat jaringan lebih kuat dengan mengurangi ketergantungannya pada satu basis kode saja. Tujuan idealnya adalah mencapai keberagaman tanpa ada client yang mendominasi jaringan, sehingga menghilangkan potensi titik kegagalan tunggal.
Keberagaman bahasa pemrograman juga mengundang komunitas pengembang yang lebih luas dan memungkinkan mereka membuat integrasi dalam bahasa yang mereka pilih.

Pelajari lebih lanjut tentang [keragaman klien](/developers/docs/nodes-and-clients/client-diversity/).

Kesamaan yang dimiliki oleh semua implementasi ini adalah, semuanya mengikuti satu spesifikasi. Spesifikasi menentukan bagaimana jaringan Ethereum dan fungsi blockchain. Setiap detail teknis telah didefinisikan dan spesifikasinya dapat ditemukan sebagai berikut:

- Awalnya, [Kertas Kuning Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Spesifikasi eksekusi](https://github.com/ethereum/execution-specs/)
- [Spesifikasi konsensus](https://github.com/ethereum/consensus-specs)
- [EIPs](https://eips.ethereum.org/) yang diimplementasikan dalam berbagai [pemutakhiran jaringan](/ethereum-forks/)

### Melacak simpul di jaringan {#network-overview}

Beberapa pelacak menawarkan gambaran umum real-time dari node-node di jaringan Ethereum. Perlu dicatat bahwa karena sifat jaringan terdesentralisasi, crawler ini hanya dapat memberikan pandangan terbatas tentang jaringan dan mungkin melaporkan hasil yang berbeda.

- [Peta simpul](https://etherscan.io/nodetracker) oleh Etherscan
- [Ethernodes](https://ethernodes.org/) oleh Bitfly
- [Nodewatch](https://www.nodewatch.io/) oleh Chainsafe, merayapi simpul konsensus
- [Monitoreth](https://monitoreth.io/) - oleh MigaLabs, Alat pemantauan jaringan terdistribusi
- [Laporan Kesehatan Jaringan Mingguan](https://probelab.io) - oleh ProbeLab, Menggunakan [Nebula crawler](https://github.com/dennis-tra/nebula) dan alat lainnya

## Jenis simpul {#node-types}

Jika Anda ingin [menjalankan simpul Anda sendiri](/developers/docs/nodes-and-clients/run-a-node/), Anda harus memahami bahwa ada berbagai jenis simpul yang mengonsumsi data secara berbeda. Faktanya, client dapat menjalankan tiga jenis node yang berbeda: light, full, dan archive. Terdapat juga pilihan strategi sinkronisasi yang berbeda yang memungkinkan waktu sinkronisasi lebih cepat. Sinkronisasi mengacu pada seberapa cepat node dapat memperoleh informasi terbaru tentang status Ethereum.

### Simpul penuh {#full-node}

Full node melakukan validasi blockchain secara blok demi blok, termasuk mengunduh dan memverifikasi block body serta data state untuk setiap blok. Ada berbagai kelas full node — beberapa memulai dari genesis block dan memverifikasi setiap blok secara keseluruhan sepanjang sejarah blockchain. Lainnya memulai verifikasi mereka pada blok yang lebih baru yang mereka percayai valid (misalnya, 'snap sync' Geth). Terlepas dari dari mana verifikasi dimulai, full node hanya menyimpan salinan lokal dari data yang relatif terbaru (biasanya 128 blok terakhir), sehingga data lama dapat dihapus untuk menghemat ruang disk. Data yang lebih lama dapat dibuat ulang bila diperlukan.

- Menyimpan data blockchain secara penuh (meskipun ini secara berkala dipangkas sehingga full node tidak menyimpan seluruh data state sejak genesis)
- Berpartisipasi dalam validasi blok, memverifikasi semua blok dan state.
- Semua status dapat diambil dari penyimpanan lokal atau dibuat ulang dari 'snapshot' oleh simpul penuh.
- Melayani jaringan dan menyediakan data sesuai permintaan.

### Simpul arsip {#archive-node}

Archive node adalah full node yang memverifikasi setiap blok sejak genesis dan tidak pernah menghapus data yang diunduh.

- Menyimpan semua yang disimpan oleh full node dan membangun arsip state historis. Ini diperlukan jika Anda ingin menanyakan sesuatu seperti saldo akun pada blok #4.000.000, atau sekadar menguji kumpulan transaksi Anda sendiri dengan cara yang sederhana dan dapat diandalkan tanpa memvalidasinya menggunakan tracing.
- Data ini berukuran dalam satuan terabyte, sehingga membuat archive node kurang menarik bagi pengguna biasa, tetapi bisa sangat berguna untuk layanan seperti block explorer, penyedia dompet, dan analisis blockchain.

Mensinkronisasikan klien di mode mana saja selain arsip akan menghasilkan data blockchain yang terpangkas. Ini berarti, tidak ada arsip dari semua state historis, tetapi full node mampu membangunnya sesuai permintaan.

Pelajari lebih lanjut tentang [Simpul arsip](/developers/docs/nodes-and-clients/archive-nodes).

### Simpul ringan {#light-node}

Alih-alih mengunduh setiap blok, light node hanya mengunduh header blok. Header ini berisi informasi ringkasan tentang isi blok-blok tersebut. Informasi lain yang dibutuhkan oleh light node akan diminta dari full node. Light node kemudian dapat memverifikasi secara mandiri data yang mereka terima terhadap state root yang ada di header blok. Light node memungkinkan pengguna untuk berpartisipasi dalam jaringan Ethereum tanpa membutuhkan perangkat keras yang kuat atau bandwidth tinggi seperti yang diperlukan untuk menjalankan full node. Pada akhirnya, light node dapat berjalan pada ponsel atau perangkat yang disematkan. Simpul ringan tidak berpartisipasi dalam konsensus (yaitu, mereka tidak bisa menjadi validator), tetapi mereka dapat mengakses blockchain Ethereum dengan fungsionalitas dan jaminan keamanan yang sama seperti simpul penuh.

Light client adalah area yang sedang aktif dikembangkan untuk Ethereum, dan kami berharap akan segera muncul light client baru untuk layer konsensus maupun layer eksekusi.
Ada juga rute potensial untuk menyediakan data klien ringan melalui [jaringan gosip](https://www.ethportal.net/). Ini menguntungkan karena jaringan gossip dapat mendukung jaringan light node tanpa mengharuskan full node untuk melayani permintaan.

Ethereum belum mendukung populasi light node yang besar, tetapi dukungan untuk light node diperkirakan akan berkembang pesat dalam waktu dekat. Secara khusus, klien seperti [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios), dan [LodeStar](https://lodestar.chainsafe.io/) saat ini sangat berfokus pada simpul ringan.

## Mengapa Anda harus menjalankan satu node Ethereum? {#why-should-i-run-an-ethereum-node}

Menjalankan sebuah node memungkinkan Anda menggunakan Ethereum secara langsung, tanpa perlu mempercayai pihak lain, dan secara pribadi, sambil mendukung jaringan dengan menjadikannya lebih kuat dan terdesentralisasi.

### Manfaat untuk Anda {#benefits-to-you}

Menjalankan node sendiri memungkinkan Anda menggunakan Ethereum secara pribadi, mandiri, dan tanpa perlu mempercayai pihak lain. Anda tidak perlu mempercayai jaringan karena Anda bisa memverifikasi data sendiri dengan klien Anda. "Jangan percaya, lakukan verifikasi" adalah mantra blockchain yang populer.

- Node Anda memverifikasi semua transaksi dan blok dibandingkan dengan aturan konsensus itu sendiri. Ini berarti Anda tidak harus mengandalkan node lain dalam jaringan atau sepenuhnya mempercayainya.
- Anda dapat menggunakan dompet Ethereum dengan node Anda sendiri. Anda bisa menggunakan dapps dengan lebih aman dan pribadi karena Anda tidak perlu membocorkan alamat dan saldo Anda ke perantara. Semua hal bisa dicek dengan klien Anda sendiri. [MetaMask](https://metamask.io), [Frame](https://frame.sh/), dan [banyak dompet lainnya](/wallets/find-wallet/) menawarkan pengimporan RPC, yang memungkinkan mereka menggunakan simpul Anda.
- Anda dapat menjalankan dan menghosting sendiri layanan lain yang bergantung pada data dari Ethereum. Sebagai contoh, ini dapat berupa validator Beacon Chain, perangkat lunak seperti layer 2, infrastruktur, penjelajah blok, pemroses pembayaran, dll.
- Anda dapat menyediakan [titik akhir RPC](/developers/docs/apis/json-rpc/) khusus Anda sendiri. Anda bahkan dapat menawarkan endpoint ini secara publik kepada komunitas untuk membantu mereka menghindari penyedia besar yang tersentralisasi.
- Anda dapat terhubung ke simpul Anda menggunakan **Komunikasi Antar-Proses (IPC)** atau menulis ulang simpul untuk memuat program Anda sebagai plugin. Ini memberikan latensi rendah, yang sangat membantu, misalnya, saat memproses banyak data menggunakan pustaka web3 atau ketika Anda perlu mengganti transaksi Anda secepat mungkin (yaitu, frontrunning).
- Anda bisa langsung melakukan staking ETH untuk mengamankan jaringan dan mendapatkan reward. Lihat [staking solo](/staking/solo/) untuk memulai.

![Cara Anda mengakses Ethereum melalui aplikasi dan simpul Anda](./nodes.png)

### Manfaat jaringan {#network-benefits}

Sebuah kumpulan node beragam penting untuk kesehatan, keamanan dan ketahanan operasional Ethereum.

- Node penuh menegakkan aturan konsensus sehingga mereka tidak dapat ditipu untuk menerima blok yang tidak mengikutinya. Ini memberikan keamanan ekstra dalam jaringan karena jika semua node adalah light node, yang tidak melakukan verifikasi penuh, validator dapat menyerang jaringan.
- Jika terjadi serangan yang mengatasi pertahanan kripto-ekonomi dari [bukti-taruhan](/developers/docs/consensus-mechanisms/pos/#what-is-pos), pemulihan sosial dapat dilakukan oleh simpul penuh yang memilih untuk mengikuti rantai yang jujur.
- Lebih banyak node dalam jaringan menghasilkan jaringan yang lebih beragam dan kuat, tujuan akhir dari desentralisasi, yang memungkinkan sistem yang tahan sensor dan dapat diandalkan.
- Node penuh menyediakan akses ke data blockchain untuk klien ringan yang bergantung padanya. Simpul ringan tidak menyimpan seluruh blockchain, sebaliknya mereka memverifikasi data melalui [akar status dalam header blok](/developers/docs/blocks/#block-anatomy). Mereka dapat meminta lebih banyak informasi dari node penuh jika mereka membutuhkannya.

Jika Anda menjalankan sebuah node penuh, seluruh jaringan Ethereum akan mendapatkan keuntungan darinya, bahkan jika Anda tidak menjalankan validator.

## Menjalankan simpul Anda sendiri {#running-your-own-node}

Tertarik menjalankan klien Ethereum Anda sendiri?

Untuk pengenalan yang ramah bagi pemula, kunjungi halaman [jalankan simpul](/run-a-node) kami untuk mempelajari lebih lanjut.

Jika Anda lebih merupakan pengguna teknis, selami detail dan opsi lebih lanjut tentang cara [menjalankan simpul Anda sendiri](/developers/docs/nodes-and-clients/run-a-node/).

## Alternatif {#alternatives}

Menyiapkan node Anda sendiri dapat menghabiskan waktu dan sumber daya, tetapi Anda tidak selalu perlu menjalankan instans Anda sendiri. Dalam hal ini, Anda dapat menggunakan penyedia API pihak ketiga. Untuk gambaran umum tentang penggunaan layanan ini, lihat [simpul sebagai layanan](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Jika seseorang menjalankan node Ethereum dengan API publik di komunitas Anda, Anda dapat mengarahkan wallet Anda ke node komunitas melalui Custom RPC dan mendapatkan lebih banyak privasi dibandingkan dengan pihak ketiga yang tidak tepercaya.

Di sisi lain, jika Anda menjalankan satu klien, Anda bisa membagikannya dengan teman Anda yang mungkin membutuhkannya.

## Klien eksekusi {#execution-clients}

Komunitas Ethereum memelihara beberapa klien eksekusi sumber terbuka (sebelumnya dikenal sebagai 'klien Eth1', atau 'klien Ethereum'), yang dikembangkan oleh berbagai tim menggunakan beragam bahasa pemrograman. Ini membuat jaringan lebih kuat dan lebih [beragam](/developers/docs/nodes-and-clients/client-diversity/). Tujuan idealnya adalah untuk mencapai keberagaman tanpa dominasi klien mana pun sehingga ini menurunkan jumlah titik kegagalan mana pun.

Tabel ini meringkaskan berbagai jenis klien. Semuanya lulus [tes klien](https://github.com/ethereum/tests) dan dipelihara secara aktif agar tetap terbarui dengan pemutakhiran jaringan.

| Klien                                                                                       | Bahasa                   | Sistem operasi        | Jaringan                       | Strategi sinkronisasi                                                            | Pemotongan state |
| ------------------------------------------------------------------------------------------- | ------------------------ | --------------------- | ------------------------------ | -------------------------------------------------------------------------------- | ---------------- |
| [Geth](https://geth.ethereum.org/)                                                          | Go                       | Linux, Windows, macOS | Jaringan Utama, Sepolia, Hoodi | [Snap](#snap-sync), [Full](#full-sync)                                           | Arsip, Dipotong  |
| [Nethermind](https://www.nethermind.io/)                                                    | C#, .NET | Linux, Windows, macOS | Jaringan Utama, Sepolia, Hoodi | [Snap](#snap-sync) (tanpa melayani), Fast, [Full](#full-sync) | Arsip, Dipotong  |
| [Besu](https://besu.hyperledger.org/en/stable/)                                             | Java                     | Linux, Windows, macOS | Jaringan Utama, Sepolia, Hoodi | [Snap](#snap-sync), [Fast](#fast-sync), [Full](#full-sync)                       | Arsip, Dipotong  |
| [Erigon](https://github.com/ledgerwatch/erigon)                                             | Go                       | Linux, Windows, macOS | Jaringan Utama, Sepolia, Hoodi | [Full](#full-sync)                                                               | Arsip, Dipotong  |
| [Reth](https://reth.rs/)                                                                    | Rust                     | Linux, Windows, macOS | Jaringan Utama, Sepolia, Hoodi | [Full](#full-sync)                                                               | Arsip, Dipotong  |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(beta)_ | TypeScript               | Linux, Windows, macOS | Sepolia, Hoodi                 | [Full](#full-sync)                                                               | Dipotong         |

Untuk informasi lebih lanjut tentang jaringan yang didukung, baca tentang [jaringan Ethereum](/developers/docs/networks/).

Setiap klien mempunyai kasus penggunaan dan keuntungan yang unik, jadi Anda harus memilih salah satu berdasarkan preferensi Anda sendiri. Keberagaman memungkinkan implementasi difokuskan pada fitur dan audiens pengguna berbeda. Anda mungkin ingin memilih satu klien berdasarkan fitur, dukungan, bahasa pemrograman, atau lisensi.

### Besu {#besu}

Hyperledger Besu adalah klien Ethereum standar perusahaan untuk jaringan publik dan berizin. Klien ini menjalankan seluruh fitur Jaringan Utama Ethereum, mulai dari pelacakan hingga GraphQL, memiliki pemantauan ektensif dan didukung oleh ConsenSys, baik di kanal komunitas terbuka maupun melalui SLA komersial untuk perusahaan. Ditulis dalam Java dan berlisensi Apache 2.0.

[Dokumentasi](https://besu.hyperledger.org/en/stable/) ekstensif Besu akan memandu Anda melalui semua detail tentang fitur dan pengaturannya.

### Erigon {#erigon}

Erigon, yang sebelumnya dikenal sebagai Turbo-Geth, dimulai sebagai sebuah fork dari Go Ethereum yang berorientasi pada kecepatan dan efisiensi ruang disk. Erigon adalah implementasi Ethereum yang sepenuhnya diarsiteki ulang, saat ini ditulis dalam bahasa Go tetapi dengan implementasi dalam bahasa lain yang sedang dikembangkan. Tujuan Erigon adalah menyediakan implementasi Ethereum yang lebih cepat, lebih modular, dan lebih optimal. Sinkronisasi simpul arsip penuh dapat melakukan sinkronisasi simpul arsip menggunakan ruang disk sekitar 2TB, dalam waktu kurang dari 3 hari.

### Go Ethereum {#geth}

Go Ethereum (singkatannya Geth) adalah satu dari implementasi original protokol Ethereum. Saat ini, Geth adalah klien yang paling tersebar luas dengan basis pengguna terbesar dan keberagaman perangkat untuk para pengguna dan pengembang. Geth ditulis dalam Go, yang adalah sumber terbuka penuh dan terlisensi di bawah GNU LGPL v3.

Pelajari lebih lanjut tentang Geth di [dokumentasinya](https://geth.ethereum.org/docs/).

### Nethermind {#nethermind}

Nethermind adalah implementasi Ethereum yang dibuat dengan tumpukan teknologi C# .NET, dilisensikan dengan LGPL-3.0, berjalan di semua platform utama termasuk ARM. Implementasi ini menawarkan kinerja luar biasa dengan:

- mesin virtual yang dioptimalkan
- akses state
- fitur jaringan lengkap dengan dashboard Prometheus/Grafana, dukungan logging Seq enterprise, pelacakan JSON-RPC, dan plugin analitik.

Nethermind juga memiliki [dokumentasi terperinci](https://docs.nethermind.io), dukungan pengembang yang kuat, komunitas online, dan dukungan 24/7 yang tersedia untuk pengguna premium.

### Reth {#reth}

Reth (singkatan dari Rust Ethereum) adalah implementasi simpul penuh Ethereum yang fokus pada kemudahan penggunaan, sangat modular, cepat, dan efisien. Reth awalnya dibangun dan dikembangkan oleh Paradigm, dan dilisensikan di bawah lisensi Apache dan MIT.

Reth siap digunakan dalam produksi, dan cocok untuk digunakan di lingkungan kritis seperti staking atau layanan dengan ketersediaan tinggi. Berkinerja baik pada kasus penggunaan yang membutuhkan performa tinggi dengan margin besar, seperti RPC, MEV, indexing, simulasi, dan aktivitas P2P.

Pelajari lebih lanjut dengan melihat [Buku Reth](https://reth.rs/), atau [repo GitHub Reth](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### Dalam pengembangan {#execution-in-development}

"Klien-klien" berikut masih dalam tahap awal pengembangan dan belum disarankan untuk penggunaan produksi.

#### EthereumJS {#ethereumjs}

EthereumJS Execution Client (EthereumJS) ditulis dalam TypeScript dan terdiri dari sejumlah paket, termasuk primitif inti Ethereum yang direpresentasikan oleh kelas Block, Transaction, dan Merkle-Patricia Trie, serta komponen inti klien seperti implementasi Ethereum Virtual Machine (EVM), kelas blockchain, dan stack jaringan DevP2P.

Pelajari lebih lanjut tentangnya dengan membaca [dokumentasinya](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master)

## Klien konsensus {#consensus-clients}

Ada beberapa klien konsensus (sebelumnya dikenal sebagai klien 'Eth2') untuk mendukung [pemutakhiran konsensus](/roadmap/beacon-chain/). Mereka bertanggung jawab atas semua logika terkait konsensus termasuk algoritme pilihan-fork, memproses pengesahan, dan mengelola imbalan dan penalti [bukti-taruhan](/developers/docs/consensus-mechanisms/pos).

| Klien                                                         | Bahasa     | Sistem operasi        | Jaringan                                                  |
| ------------------------------------------------------------- | ---------- | --------------------- | --------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Rantai Suar, Hoodi, Pyrmont, Sepolia, dan lainnya         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Rantai Suar, Hoodi, Sepolia, dan lainnya                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Rantai Suar, Hoodi, Sepolia, dan lainnya                  |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | Rantai Suar, Gnosis, Hoodi, Pyrmont, Sepolia, dan lainnya |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Rantai Suar, Gnosis, Hoodi, Sepolia, dan lainnya          |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Rantai Suar, Hoodi, Sepolia, dan lainnya                  |

### Lighthouse {#lighthouse}

Lighthouse adalah implementasi klien konsensus yang ditulis dalam Rust di bawah lisensi Apache-2.0. Ini dikelola oleh Sigma Prime dan telah stabil dan siap produksi sejak awal mula Beacon Chain. Ini diandalkan oleh berbagai perusahaan, kolam taruhan, dan individu. Ini bertujuan untuk menjadi aman, berkinerja tinggi, dan dapat dioperasikan di berbagai lingkungan, mulai dari PC desktop hingga penerapan otomatis yang canggih.

Dokumentasi dapat ditemukan di [Buku Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar adalah implementasi klien konsensus siap produksi yang ditulis dalam Typescript di bawah lisensi LGPL-3.0. Dikelola oleh ChainSafe Systems dan merupakan klien konsensus terbaru untuk para pemain tunggal, pengembang, dan peneliti. Lodestar terdiri dari simpul suar dan klien validator yang didukung oleh implementasi JavaScript dari protokol Ethereum. Lodestar bertujuan untuk meningkatkan kegunaan Ethereum dengan klien ringan, memperluas aksesibilitas ke kelompok pengembang yang lebih besar dan lebih jauh berkontribusi pada keragaman ekosistem.

Informasi lebih lanjut dapat ditemukan di [situs web Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus adalah implementasi klien konsensus yang ditulis dalam Nim di bawah lisensi Apache-2.0. Ini adalah klien siap produksi yang digunakan oleh solo-staker dan staking pool. Nimbus dirancang untuk efisiensi sumber daya, sehingga mudah dijalankan pada perangkat dengan sumber daya terbatas dan infrastruktur perusahaan dengan kemudahan yang sama, tanpa mengorbankan stabilitas atau kinerja penghargaan. Jejak sumber daya yang lebih ringan berarti klien memiliki margin keamanan yang lebih besar saat jaringan mengalami tekanan.

Pelajari lebih lanjut di [dokumen Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm adalah klien konsensus sumber terbuka dengan fitur lengkap yang ditulis dalam bahasa Go di bawah lisensi GPL-3.0. Aplikasi ini memiliki UI webapp opsional dan memprioritaskan pengalaman pengguna, dokumentasi, dan konfigurabilitas untuk pengguna rumahan dan institusi.

Kunjungi [dokumen Prysm](https://prysm.offchainlabs.com/docs/) untuk mempelajari lebih lanjut.

### Teku {#teku}

Teku adalah salah satu klien genesis Beacon Chain yang asli. Di samping tujuan-tujuan yang biasa (keamanan, ketahanan, stabilitas, kegunaan, kinerja), Teku secara khusus bertujuan untuk sepenuhnya mematuhi semua standar klien konsensus.

Teku menawarkan opsi penerapan yang sangat fleksibel. Node suar dan klien validator dapat dijalankan bersama sebagai satu proses, yang sangat nyaman untuk staker tunggal, atau node dapat dijalankan secara terpisah untuk operasi staking yang canggih. Selain itu, Teku sepenuhnya dapat dioperasikan dengan [Web3Signer](https://github.com/ConsenSys/web3signer/) untuk keamanan kunci penandatanganan dan perlindungan dari pemotongan.

Teku ditulis dalam bahasa Java dan berlisensi Apache 2.0. Ini dikembangkan oleh tim Protokol di ConsenSys yang juga bertanggung jawab atas Besu dan Web3Signer. Pelajari lebih lanjut di [dokumen Teku](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandin adalah implementasi klien konsensus, ditulis dalam Rust di bawah lisensi GPL-3.0. Dipelihara oleh Tim Inti nama dan cepat, kemampuan tinggi, dan ringan. Cocok untuk berbagai kepentingan, mulai dari  kepentingan tunggal yang menjalankan perangkat dengan sumber daya rendah seperti Raspberry Pi hingga pemangku kepentingan institusional besar yang menjalankan puluhan ribu validator.

Dokumentasi dapat ditemukan di [Buku Grandine](https://docs.grandine.io/)

## Mode sinkronisasi {#sync-modes}

Untuk mengikuti dan memverifikasi data saat ini di jaringan, klien Ethereum perlu melakukan sinkronisasi dengan state jaringan terkini. Ini dilakukan dengan mengunduh data dari para rekan sejawat, yang secara kriptografik memverifikasi integritasnya, dan membangun basis data blockchain lokal.

Mode sinkronisasi mewakili pendekatan berbeda terhadap proses ini dengan berbagai pertukaran. Klien juga bervariasi dalam implementasi algoritma sinkronisasinya. Mengaculah selalu pada dokumentasi resmi dari klien pilihan Anda untuk spesifikasi tentang implementasi.

### Mode sinkronisasi lapisan eksekusi {#execution-layer-sync-modes}

Lapisan eksekusi dapat dijalankan dalam berbagai mode agar sesuai dengan berbagai kasus penggunaan, mulai dari ekseskusi ulang status dunia blockchain hingga hanya melakukan sinkronisasi dengan ujung rantai dari titik pemeriksaan tepercaya.

#### Sinkronisasi penuh {#full-sync}

Full sync mengunduh semua blok (termasuk header dan isi blok) dan meregenerasi status blockchain secara bertahap dengan mengeksekusi setiap blok sejak genesis.

- Meminimalkan kepercayaan dan menawarkan keamanan tertinggi dengan memverifikasi setiap transaksi.
- Dengan meningkatnya jumlah transaksi, butuh waktu berhari-hari hingga berminggu-minggu untuk memroses semua transaksi.

[Simpul arsip](#archive-node) melakukan sinkronisasi penuh untuk membangun (dan menyimpan) riwayat lengkap perubahan status yang dibuat oleh setiap transaksi di setiap blok.

#### Sinkronisasi cepat {#fast-sync}

Seperti sinkronisasi penuh, sinkronisasi cepat unduh semua blok (termasuk ketua, transaksi, dan tanda terima). Akan tetapi, alih-alih memproses ulang transaksi historis, sinkronisasi cepat mengandalkan penerimaan hingga mencapai titik tertinggi sekarang, saat beralih ke pengiriman dan waktu proses blok untuk menyediakan simpul penuh.

- Strategi sinkronisasi cepat.
- Mengurangi permintaan waktu proses demi penggunaan bandwidth.

#### Sinkronisasi snap {#snap-sync}

Sinkronisasi Snap juga verifikasi rantai blok demi blok. Namun, alih-alih memulai dari blok genesis, snap sync dimulai dari checkpoint 'terpercaya' yang lebih baru dan diketahui merupakan bagian dari blockchain yang sebenarnya. Node menyimpan pos pemeriksaan berkala sambil menghapus data yang lebih tua dari usia tertentu. Alat ini digunakan untuk menghasilkan kembali data status sesuai kebutuhan, alih-alih menyimpannya selamanya.

- Strategi sinkronisasi paling cepat, saat ini menjadi pertama di Ethereum mainet
- Menghemat pemakaian ruangan cakram dan bandwidth jaringan tanpa mengorbankan aspek keamanan.

[Selengkapnya tentang sinkronisasi snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Sinkronisasi ringan {#light-sync}

Mode klien ringan mengunduh semua header blok, data blok, dan memverifikasi beberapa secara acak. Hanya menyinkronkan ujung rantai dari pos pemeriksaan terpercaya.

- Hanya mengambil state terbaru saat mengandalkan kepercayaan pada pengembang dan mekanisme konsensus.
- Klien siap dipakai dengan state jaringan saat ini dalam beberapa menit.

**NB** Sinkronisasi ringan belum berfungsi dengan Ethereum bukti-taruhan - versi baru sinkronisasi ringan akan segera hadir!

[Selengkapnya tentang klien ringan](/developers/docs/nodes-and-clients/light-clients/)

### Mode sinkronisasi lapisan konsensus {#consensus-layer-sync-modes}

#### Sinkronisasi optimis {#optimistic-sync}

Sinkronisasi optimis adalah strategi sinkronisasi pasca-penggabungan yang dirancang untuk menjadi opt-in dan kompatibel ke belakang, yang memungkinkan node eksekusi untuk melakukan sinkronisasi melalui metode yang telah ditetapkan. Mesin eksekusi dapat _secara optimis_ mengimpor blok beacon tanpa memverifikasinya sepenuhnya, menemukan head terbaru, dan kemudian mulai menyinkronkan rantai dengan metode di atas. Kemudian, setelah klien eksekusi menyusul, ia akan menginformasikan kepada klien konsensus mengenai keabsahan transaksi dalam Rantai Beacon.

[Selengkapnya tentang sinkronisasi optimis](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### Sinkronisasi titik periksa {#checkpoint-sync}

Sinkronisasi titik pemeriksaan, juga dikenal sebagai sinkronisasi subjektivitas lemah, menciptakan pengalaman pengguna yang unggul untuk menyinkronkan Node Beacon. Ini didasarkan pada asumsi [subjektivitas lemah](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) yang memungkinkan sinkronisasi Rantai Suar dari titik periksa subjektivitas lemah baru-baru ini, bukan dari genesis. Sinkronisasi titik periksa membuat waktu sinkronisasi awal jauh lebih cepat dengan asumsi kepercayaan yang serupa seperti sinkronisasi dari [genesis](/glossary/#genesis-block).

Dalam praktiknya, ini berarti node Anda terhubung ke layanan jarak jauh untuk mengunduh status terakhir yang telah diselesaikan dan terus memverifikasi data dari titik tersebut. Penyedia data pihak ketiga harus terpercaya dan dipilih secara cermat.

Selengkapnya tentang [sinkronisasi titik periksa](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Bacaan lebih lanjut {#further-reading}

- [Ethereum 101 - Bagian 2 - Memahami Simpul](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 Februari 2019_
- [Menjalankan Simpul Penuh Ethereum: Panduan bagi yang Kurang Termotivasi](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 November 2019_

## Topik terkait {#related-topics}

- [Blok](/developers/docs/blocks/)
- [Jaringan](/developers/docs/networks/)

## Tutorial terkait {#related-tutorials}

- [Ubah Raspberry Pi 4 Anda menjadi simpul validator hanya dengan mem-flash kartu MicroSD – Panduan instalasi](/developers/tutorials/run-node-raspberry-pi/) _– Flash Raspberry Pi 4 Anda, colokkan kabel ethernet, hubungkan disk SSD dan nyalakan perangkat untuk mengubah Raspberry Pi 4 menjadi simpul Ethereum penuh yang menjalankan lapisan eksekusi (Mainnet) dan/atau lapisan konsensus (Rantai Suar / validator)._
