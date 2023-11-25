---
title: Node dan klien
description: Gambaran umum tentang perangkat lunak node dan klien Ethereum, juga cara menyiapkan node dan mengapa Anda harus melakukannya.
lang: id
sidebarDepth: 2
---

Ethereum adalah jaringan komputer terdistribusi yang menjalankan perangkat lunak (dikenal sebagai node) yang dapat memverifikasi blok dan data transaksi. Anda memerlukan satu aplikasi, yang dikenal sebagai klien, pada perangkat Anda untuk "menjalankan" sebuah node.

## Prasyarat {#prerequisites}

Anda harus memahami konsep jaringan peer-to-peer dan [dasar-dasar EVM](/developers/docs/evm/) sebelum menggali lebih dalam dan menjalankan instance klien Ethereum Anda sendiri. Coba lihat [pengantar Ethereum](/developers/docs/intro-to-ethereum/) kami.

## Apa itu node dan klien? {#what-are-nodes-and-clients}

"Node" merujuk pada satu bagian perangkat lunak yang dikenal sebagai satu klien. Klien adalah implementasi Ethereum yang memverifikasi semua transaksi di setiap blok, menjaga jaringan tetap aman dan data tetap akurat.

Anda bisa melihat tampilan jaringan Ethereum secara nyata dengan melihat [peta node](https://etherscan.io/nodetracker) ini.

Ada banyak [klien Ethereum](/developers/docs/nodes-and-clients/#execution-clients), dalam berbagai bahasa pemrograman seperti Go, Rust, JavaScript, Typescript, Python, C# .NET, Nim dan Java. Persamaan dari semua implementasi ini adalah semuanya mengikuti spesifikasi formal (pada awalnya [Yellow Paper Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)). Spesifikasi ini mengatur bagaimana jaringan Ethereum dan blockchain berfungsi.

![Klien eksekusi](./client-diagram.png) Diagram yang disederhanakan tentang apa saja fitur klien Ethereum.

## Jenis node {#node-types}

Jika Anda ingin [menjalankan node sendiri](/developers/docs/nodes-and-clients/run-a-node/), Anda harus mengerti bahwa ada berbagai jenis node yang mengonsumsi data secara berbeda. Bahkan, klien dapat menjalankan 3 tipe node yang berbeda - ringan, penuh, dan arsip. Ada juga opsi strategi sinkronisasi berbeda yang memungkinkan waktu sinkronisasi yang lebih cepat. Sinkronisasi merujuk pada seberapa cepat prosesnya mendapat informasi paling terbaru pada state Ethereum.

### Node penuh {#full-node}

- Menyimpan data blockchain penuh.
- Berpartisipasi dalam validasi blok, memverifikasi semua blok dan state.
- Semua state bisa dikembangkan dari satu node penuh.
- Melayani jaringan dan menyediakan data sesuai permintaan.

### Node Ringan {#light-node}

- Menyimpan rantai header dan meminta semua hal lainnya.
- Bisa memverifikasi keabsahan data yang dibandingkan dengan root state dalam header blok.
- Berguna untuk perangkat dengan kapasitas rendah, seperti perangkat bawaan atau ponsel, yang tidak sanggup menyimpan data blokchain dalam ukuran gigabyte.

### Node arsip {#archive-node}

- Menyimpan semua data yang tersimpan dalam node penuh dan menyusun riwayat arsip state. Diperlukan jika Anda ingin menanyakan sesuatu seperti saldo akun pada blok #4.000.000, atau secara sederhana dan andal [menguji sekumpulan transaksi Anda sendiri tanpa menambangnya dengan mengggunakan OpenEthereum](https://openethereum.github.io/JSONRPC-trace-module#trace_callmany).
- Data ini mewakilkan unit terabita yang membuat node arsip kurang menarik bagi pengguna pada umumnya, tetapi dapat menolong untuk layanan seperti penjelajah blok, vendor dompet, dan analitik rantai.

Mensinkronisasikan klien di mode mana saja selain arsip akan menghasilkan data blockchain yang terpangkas. Ini berarti, tidak ada arsip untuk semua state riwayat, tetapi node penuh dapat menyusunnya sesuai permintaan.

## Mengapa Anda harus menjalankan satu node Ethereum? {#why-should-i-run-an-ethereum-node}

Menjalankan node memungkinkan Anda menggunakan Ethereum tanpa membutuhkan kepercayaan dan secara privat sekaligus Anda mendukung ekosistem.

### Keuntungan untuk Anda {#benefits-to-you}

Menjalankan node sendiri memungkinkan Anda menggunakan Ethereum dengan cara yang benar-benar privat, mandiri, dan tidak membutuhkan kepercayaan. Anda tidak perlu mempercayai jaringan karena Anda bisa memverifikasi data sendiri dengan klien Anda. "Jangan percaya, lakukan verifikasi" adalah mantra blockchain yang populer.

- Node Anda memverifikasi semua transaksi dan blok dibandingkan dengan aturan konsensus itu sendiri. Ini berarti Anda tidak harus mengandalkan node lain dalam jaringan atau sepenuhnya mempercayainya.
- Anda tidak akan harus membocorkan alamat dan saldo Anda ke node acak. Semua hal bisa dicek dengan klien Anda sendiri.
- Dapp Anda bisa lebih aman dan privat jika Anda menggunakan node Anda sendiri. [MetaMask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) and some other wallets can be easily pointed to your own local node.
- Anda dapat memrogram endpoint RPC kustom Anda sendiri.
- Anda dapat menghubungkan node Anda dengan menggunakan **Komunikasi Antar Proes (IPC)** atau menulis kembali node untuk memuat program Anda sebagai plugin. Ini menghasilkan latensi yang rendah, yang diperlukan untuk menggantikan transaksi Anda secepat mungkin (maksudnya frontrunning).

![Bagaimana Anda mengakses Ethereum lewat aplikasi dan node Anda](./nodes.png)

### Keuntungan jaringan {#network-benefits}

Sebuah kumpulan node beragam penting untuk kesehatan, keamanan dan ketahanan operasional Ethereum.

- Mereka menyediakan akses ke data blockchain untuk klien lightweight yang bergantung pada data tersebut. Pada puncak tinggi penggunaan, harus ada node penuh yang cukup untuk membantu sinkronisasi node ringan. Node ringan tidak menyimpan seluruh blockchain, melainkan memverifikasi data lewat [root state dalam header blok](/developers/docs/blocks/#block-anatomy). Mereka bisa meminta lebih banyak informasi dari blok jika mereka membutuhkannya.
- Node penuh melaksanakan aturan konsensus bukti kerja sehingga mereka tidak bisa ditipu untuk menerima blok yang tidak mengikutinya. Ini menyediakan keamanan ekstra dalam jaringan karena jika semua node berjenis node ringan, yang tidak melakukan verifikasi penuh, penambang bisa menyerang jaringan dan, sebagai contoh, membuat blok dengan imbalan yang lebih tinggi.

Jika Anda menjalankan node penuh, seluruh jaringan Ethereum mendapat keuntungan darinya.

## Menjalankan node milik Anda sendiri {#running-your-own-node}

Tertarik menjalankan klien Ethereum Anda sendiri?

For a beginner-friendly introduction visit our [run a node](/run-a-node) page to learn more.

If you're more of a technical user, learn how to [spin up your own node](/developers/docs/nodes-and-clients/run-a-node/) with the command line!

### Proyek {#projects}

[**Pilih klien dan ikuti petunjuknya**](#clients)

**ethnode -** **_Jalankan node Ethereum (Geth atau OpenEthereum) untuk pengembangan lokal._**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode -** **_Sebuah sistem operasi GUI untuk menjalankan node Web3, yang mencakup Ethereum dan rantai suar, pada satu mesin khusus._**

- [dappnode.io](https://dappnode.io)

### Sumber Daya {#resources}

- [Menjalankan Node Penuh Ethereum: Sebuah Panduan Lengkap](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _7 November 2019 - Justin Leroux_
- [Lembaran Cheat Konfigurasi Node](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _5 Januari 2019 - Afri Schoeden_
- [Cara Menginstal dan Menjalankan Node Geth](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _4 Okt 2020 - Sahil Sen_
- [Cara Menginstal dan Menjalankan Node OpenEthereum (fka. Parity)](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _22 Sept 2020 - Sahil Sen_

## Alternatif {#alternatives}

Menjalankan node Anda sendiri dapat menjadi sulit dan Anda tidak selalu harus menjalankan instance Anda sendiri. Dalam kasus ini, Anda bisa menggunakan satu penyedia API pihak ketiga seperti [Infura](https://infura.io), [Alchemy](https://alchemyapi.io), atau [QuikNode](https://www.quiknode.io). Sebagai alternatifnya [ArchiveNode](https://archivenode.io/) adalah satu node Arsip yang didanai komunitas yang bertujuan membawa data arsip blockchain Ethereum kepada para pengembang independen yang sebaliknya tidak bisa mendapatkannya. For an overview of using these services, check out [nodes as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Jika seseorang menjalankan node Ethereum dengan API publik dalam komunitas Anda, Anda bisa merujuk dompet ringan Anda (seperti MetaMask) ke node komunitas [melalui RPC Kustom](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) dan mendapat lebih banyak privasi dari pada menggunakan beberapa pihak ketiga terpercaya acak.

Di sisi lain, jika Anda menjalankan satu klien, Anda bisa membagikannya dengan teman Anda yang mungkin membutuhkannya.

## Klien eksekusi (sebelumnya 'klien Eth1') {#execution-clients}

Komunitas Ethereum memelihara beberapa klien eksekusi sumber terbuka (sebelumnya dikenal sebagai 'klien Eth1', atau 'klien Ethereum'), yang dikembangkan oleh berbagai tim menggunakan beragam bahasa pemrograman. Ini membuat jaringan lebih kuat dan lebih beragam. Tujuan idealnya adalah untuk mencapai keberagaman tanpa dominasi klien mana pun sehingga ini menurunkan jumlah titik kegagalan mana pun.

Tabel ini meringkaskan berbagai jenis klien. Semuanya telah lulus [pengujian klien](https://github.com/ethereum/tests) dan secara aktif dipertahankan agar tetap yang terbaru dengan peningkatan jaringan.

| Klien                                                                     | Bahasa   | Sistem operasi        | Jaringan                                                 | Strategi sinkronisasi | Pemotongan state |
| ------------------------------------------------------------------------- | -------- | --------------------- | -------------------------------------------------------- | --------------------- | ---------------- |
| [Geth](https://geth.ethereum.org/)                                        | Go       | Linux, Windows, macOS | Jaringan Utama, Görli, Rinkeby, Ropsten                  | Snap, Full            | Arsip, Dipotong  |
| [Nethermind](http://nethermind.io/)                                       | C#, .NET | Linux, Windows, macOS | Jaringan Utama, Görli, Ropsten, Rinkeby, dan banyak lagi | Fast, Beam, Archive   | Arsip, Dipotong  |
| [Besu](https://besu.hyperledger.org/en/stable/)                           | Java     | Linux, Windows, macOS | Mainnet, Rinkeby, Ropsten, Görli, and more               | Cepat, Penuh          | Arsip, Dipotong  |
| [Erigon](https://github.com/ledgerwatch/erigon)                           | Go       | Linux, Windows, macOS | Jaringan Utama, Görli, Rinkeby, Ropsten                  | Full                  | Arsip, Dipotong  |
| [OpenEthereum (Deprecated)](https://github.com/openethereum/openethereum) | Rust     | Linux, Windows, macOS | Jaringan Utama, Kovan, Ropsten, dan banyak lagi          | Warp, Penuh           | Arsip, Dipotong  |

**Perhatikan bahwa OpenEthereum [telah menjadi usang](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) dan tidak lagi dipertahankan.** Gunakan dengan hati-hati dan lebih baik beralih ke implementasi klien lainnya.

Untuk informasi lebih lanjut tentang jaringan yang didukung, baca tentang [jaringan Ethereum](/developers/docs/networks/).

### Manfaat dari impelementasi berbeda {#advantages-of-different-implementations}

Setiap klien mempunyai kasus penggunaan dan keuntungan yang unik, jadi Anda harus memilih salah satu berdasarkan preferensi Anda sendiri. Keberagaman memungkinkan implementasi difokuskan pada fitur dan audiens pengguna berbeda. Anda mungkin ingin memilih satu klien berdasarkan fitur, dukungan, bahasa pemrograman, atau lisensi.

#### Go Ethereum {#geth}

Go Ethereum (singkatannya Geth) adalah satu dari implementasi original protokol Ethereum. Saat ini, Geth adalah klien yang paling tersebar luas dengan basis pengguna terbesar dan keberagaman perangkat untuk para pengguna dan pengembang. Geth ditulis dalam Go, yang adalah sumber terbuka penuh dan terlisensi di bawah GNU LGPL v3.

#### OpenEthereum {#openethereum}

OpenEthereum adalah sebuah klien Ethereum cepat, kaya akan fitur, dan berbasis CLI tingkat lanjut. Dibangun guna menyediakan infrastruktur penting untuk layanan cepat dan dapat diandalkan yang membutuhkan sinkronisasi cepat dan uptime maksimum. Tujuan OpenEthereum adalah menjadi klien Ethereum tercepat, paling ringan, dan paling aman. Menyediakan basis kode yang bersih dan modular untuk:

- kostumisasi yang mudah.
- integrasi ringan ke dalam layanan atau produk.
- memori minimal dan jejak penyimpanan.

OpenEthereum dikembangkan menggunakan bahasa pemrograman Rust canggih dan terlisensi di bawah GPLv3.

**Perhatikan bahwa OpenEthereum [telah menjadi usang](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) dan tidak lagi dipertahankan.** Gunakan dengan hati-hati dan lebih baik beralih ke implementasi klien lainnya.

#### Nethermind {#nethermind}

Nethermind adalah satu implementasi Ethereum yang dibuat dengan tumpukan teknologi C# .NET, beroperasi pada semua platform utama termasuk ARM. Implementasi ini menawarkan kinerja luar biasa dengan:

- mesin virtual yang dioptimalkan
- akses state
- jaringan dan fitur yang kaya seperti dasbor Prometheus/Graphana, dukungan logging perusahaan seq, pelacakan JSON RPC, dan plugin analitik.

Nethermind juga mempunyai [dokumentasi detil](https://docs.nethermind.io), dukungan pengembang yang kuat, komunitasi daring dan dukungan 24/7 yang tersedia untuk para pengguna premium.

#### Besu {#besu}

Hyperledger Besu adalah klien Ethereum standar perusahaan untuk jaringan publik dan berizin. Ia menjalankan seluruh fitur Jaringan Utama Ethereum, mulai dari pelacakan hingga GraphQL, memiliki pengawasan ektensif dan didukung oleh ConsenSys, baik di kanal komunitas terbuka maupun melalui SLA komersial untuk perusahaan. Ditulis dalam Java dan berlisensi Apache 2.0.

#### Erigon {#erigon}

Erigon, yang sebelumnya dikenal sebagai Erigon, adalah sebuah fork Go Ethereum yang diarahkan untuk efisiensi kecepatan dan pemakaian ruangan cakram. Erigon adalah sebuah implementasi yang sepenuhnya di buat kembali di Ethereum, yang saat ini ditulis dalam Go dengan implementasi dalam bahasa pemograman lain yang direncanakan. Tujuan Erigon adalah menyediakan implementasi Ethereum yang lebih cepat, lebih modular, dan lebih teroptimisasi. Ia dapat melakukan sinkronisasi node arsip penuh dengan menggunakan kurang dari 2 TB ruangan cakram, dalam waktu kurang dari 3 hari

### Mode sinkronisasi {#sync-modes}

Untuk mengikuti dan memverifikasi data saat ini di jaringan, klien Ethereum perlu melakukan sinkronisasi dengan state jaringan terkini. Ini dilakukan dengan mengunduh data dari para rekan sejawat, yang secara kriptografik memverifikasi integritas mereka, dan membangun basis data blockchain lokal.

Mode sinkronisasi mewakili pendekatan berbeda terhadap proses ini dengan berbagai pertukaran. Klien juga bervariasi dalam implementasi algoritma sinkronisasinya. Mengaculah selalu pada dokumentasi resmi dari klien pilihan Anda untuk spesifikasi tentang implementasi.

#### Gambaran umum strategi {#overview-of-strategies}

Tinjauan umum pendekatan sinkronisasi yang digunakan dalam klien untuk Jaringan Utama:

##### Sinkonisasi penuh

Sinkronisasi penuh mengunduh semua blok (termasuk header, transaksi, dan bukti pembayaran) dan menghasilkan state blockchain yang terus bertambah dengan mengeksekusi setiap blok dari blok genesis.

- Meminimalkan kepercayaan dan menawarkan keamanan tertinggi dengan memverifikasi setiap transaksi.
- Dengan meningkatnya jumlah transaksi, butuh waktu berhari-hari hingga berminggu-minggu untuk memroses semua transaksi.

##### Sinkronisasi cepat

Sinkronisasi cepat mengunduh semua blok (termasuk header, transaksi dan bukti pembayaran), memverifikasi semua header, dan mengunduh state dan memverifikasinya dengan membandingkannya terhadap header.

- Mengandalkan keamanan mekanisme konsensus.
- Sinkronisasi memakan waktu hanya beberapa jam.

##### Sinkronisasi ringan

Mode klien ringan mengunduh semua header blok, data blok, dan memverifikasi beberapa secara acak. Hanya menyinkronkan ujung rantai dari pos pemeriksaan terpercaya.

- Hanya mengambil state terbaru saat mengandalkan kepercayaan pada pengembang dan mekanisme konsensus.
- Klien siap dipakai dengan state jaringan saat ini dalam beberapa menit.

[Lebih lanjut tentang klien Ringan](https://www.parity.io/blog/what-is-a-light-client/)

##### Sinkronisasi snap

Diimplementasikan oleh Geth. Dengan menggunakan foto - foto dinamis yang disediakan oleh para rekan sejawat, ia mengambilkan semua data akun dan penyimpanan tanpa mengunduh node trie menengah dan kemudian menyusun ulang trie Merkle secara lokal.

- Strategi sinkronisasi tercepat yang dikembangkan oleh Geth, yang saat ini adalah versi defaultnya
- Menghemat pemakaian ruangan cakram dan bandwidth jaringan tanpa mengorbankan aspek keamanan.

[Lebih lanjut tentang Snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

##### Sinkronisasi warp

Diimplementasikan oleh OpenEthereum. Node secara teratur menghasilkan foto state konsensus yang penting dan rekan sejawat mana pun dapat mengambilkan foto ini di jaringan, yang memungkinkan sinkronisasi cepat dari titik ini.

- Mode sinkronisasi OpenEthereum yang tercepat dan default mengandalkan foto statis yang disediakan oleh para rekan sejawat.
- Strategi yang mirip dengan sinkronisasi snap, tetapi tanpa manfaat keamanan tertentu.

[Lebih lanjut tentang Warp](https://openethereum.github.io/Beginner-Introduction#warping---no-warp)

##### Sinkronisasi beam

Diimplementasikan oleh Nethermind dan Trinity. Berfungsi seperti sinkronisasi cepat tetapi juga mengunduh data yang diperlukan untuk mengeksekusi blok terkini, yang memungkinkan Anda membuat query terhadap rantai dalam beberapa menit pertama sejak dimulai.

- Menyinkronkan state terlebih dahulu dan memungkinkan Anda membuat kueri terhadap RPC dalam waktu beberapa menit.
- Masih dalam tahap pengembangan dan belum sepenuhnya bisa diandalkan, sinkronisasi latar belakang diperlambat dan respons RPC mungkin gagal.

[Lebih lanjut tentang Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)

#### Pengaturan di klien {#client-setup}

Klien menawarkan opsi konfigurasi yang kaya untuk menyesuaikan dengan kebutuhan Anda. Pilih salah satu yang paling sesuai dengan Anda berdasarkan tingkat keamanan, data yang tersedia, dan biayanya. Selain algoritma sinkronisasi, Anda juga dapat menentukan pemangkasan berbagai jenis data lama. Pemangkasan memungkinkan penghapusan data lama, contohnya menghilangkan node trie state yang tidak dapat dicapai dari blok terkini.

Perhatikan dokumentasi klien atau halaman bantuan untuk menemukan mode sinkronisasi mana yang merupakan opsi defaultnya. Anda dapat menentukan tipe sinkronisasi yang lebih disukai ketika Anda melakukan penyiapan, dalam cara:

**Menyiapkan sinkronisasi ringan di [GETH](https://geth.ethereum.org/) atau [ERIGON](https://github.com/ledgerwatch/erigon)**

`geth --syncmode "light"`

Untuk detail lebih lanjut, lihat tutorialnya di [menjalankan node ringan Geth](/developers/tutorials/run-light-node-geth/).

**Menyiapkan sinkronisasi penuh dengan arsip di [Besu](https://besu.hyperledger.org/)**

`besu --sync-mode=FULL`

Sama seperti konfigurasi lainnya, ia dapat ditentukan dengan bendera startup atau dalam berkas konfigurasi. Contoh lainnya adalah [Nethermind](https://docs.nethermind.io/nethermind/) yang mendorong Anda untuk memilih konfigurasi pada saat inisiasi pertama dan membuat berkas konfigurasi.

## Klien konsensus (sebelumnya klien 'Eth2') {#consensus-clients}

Ada beberapa klien konsensus (sebelumnya dikenal sebagai klien 'Eth2') untuk mendukung [peningkatan konsensus](/roadmap/beacon-chain/). They are running the Beacon Chain and will provide proof-of-stake consensus mechanism to execution clients after [The Merge](/roadmap/merge/).

| Klien                                                       | Bahasa     | Sistem operasi        | Jaringan                             |
| ----------------------------------------------------------- | ---------- | --------------------- | ------------------------------------ |
| [Teku](https://pegasys.tech/teku)                           | Java       | Linux, Windows, macOS | Rantai Suar, Goerli                  |
| [Nimbus](https://nimbus.team/)                              | Nim        | Linux, Windows, macOS | Rantai Suar, Goerli                  |
| [Lighthouse](https://lighthouse-book.sigmaprime.io/)        | Rust       | Linux, Windows, macOS | Rantai Suar, Goerli, Pyrmont         |
| [Lodestar](https://lodestar.chainsafe.io/)                  | TypeScript | Linux, Windows, macOS | Rantai Suar, Goerli                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/) | Go         | Linux, Windows, macOS | Rantai Suar, Gnosis, Goerli, Pyrmont |

## Perangkat keras {#hardware}

Kebutuhan perangkat keras berbeda untuk tiap klien tapi secara umum tidak terlalu tinggi karena node hanya perlu terus dalam kondisi tersinkronisasi. Jangan merancukannya dengan penambangan yang memerlukan lebih banyak daya komputasi. Akan tetapi, waktu sinkronisasi dan performa memang meningkat dengan perangkat keras yang lebih kuat. Bergantung kebutuhan dan keinginan Anda, Ethereum dapat dijalankan pada komputer, server rumah, komputer papan tunggal, atau server privat virtual di cloud.

Satu cara mudah untuk menjalankan node Anda sendiri adalah menggunakan kotak 'colokkan dan jalankan' seperti [DAppNode](https://dappnode.io/). Menyediakan perangkat keras untuk menjalankan klien dan apllikasi yang bergantung padanya dengan antar muka pengguna sederhana.

### Persyaratan {#requirements}

Sebelum menginstal klien apa pun, pastikan komputer Anda punya sumber daya yang cukup untuk menjalankannya. Persayaratan minimum dan disarankan bisa ditemukan di bawah, akan tetapi bagian kuncinya adalah kapasitas penyimpanan disk. Menyinkronisasikan blockchain Ethereum sangat bergantung banyak pada input/output. Sangat disarankan untuk memiliki satu solid-state drive (SSD). Untuk menjalankan satu klien Ethereum pada HDD, Anda akan membutuhkan paling sedikit 8GB RAM untuk digunakan sebagai cache.

#### Persayaratan minimum {#recommended-specifications}

- CPU dengan 2+ inti
- RAM dengan ukuran minimum 4GB dengan satu SSD, 8 GB+ jika Anda punya satu HDD
- Bandwidth dengan kecepatan 8 MBit/d

#### Spesifikasi yang direkomendasikan {#recommended-specifications}

- CPU cepat dengan 4+ inti
- RAM berukuran 16 GB+
- SSD cepat dengan kapasitas penyimpanan paling sedikit 500 GB
- Bandwidth dengan kecepatan 25+ MBit/d

Mode sinkronisasi yang Anda pilih akan mempengaruhi persyaratan ukuran ruangan cakram, tapi kami telah memperkirakan ruangan cakram yang akan Anda perlukan untuk setiap klien di bawah ini.

| Klien        | Ukuran disk (sinkronisasi cepat) | Ukuran disk (arsip penuh) |
| ------------ | -------------------------------- | ------------------------- |
| Geth         | 400GB+                           | 6TB+                      |
| OpenEthereum | 280GB+                           | 6TB+                      |
| Nethermind   | 200GB+                           | 5TB+                      |
| Besu         | 750GB+                           | 5TB+                      |
| Erigon       | N/A                              | 1TB+                      |

- Catatan: Erigon tidak melakukan Sinkronisasi Cepat, tapi Pemangkasan Penuh masih memungkinkan (~500GB)

Bagan ini menunjukkan bagaimana persyaratan kapasitas penyimpanan selalu berubah. Untuk data Geth dan Parity yang paling terbaru, lihat [data sinkronisasi penuh](https://etherscan.io/chartsync/chaindefault) dan [ data sinkronisasi arsip](https://etherscan.io/chartsync/chainarchive).

### Ethereum pada komputer papan tunggal {#ethereum-on-a-single-board-computer}

Cara paling nyaman dan murah untuk menjalankan node Ethereum adalah menggunakan komputer papan tungggal dengan arstitektur ARM seperti Raspberry Pi. [Ethereum di ARM](https://twitter.com/EthereumOnARM) menyediakan gambar dari klien Geth, Parity, Nethermind, dan Besu. Ini adalah tutorial sederhana tentang [bagaimana menyusun dan menyiapkan klien ARM](/developers/tutorials/run-node-raspberry-pi/).

Perangkat kecil, terjangkau dan efisien seperti ini, ideal untuk menjalankan node di rumah.

## Bacaan lebih lanjut {#further-reading}

Ada banyak informasi tentang klien Ethereum di internet. Berikut adalah beberapa sumber daya yang mungkin bisa membantu.

- [Ethereum 101 - Bagian 2 - Memahami Node](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 Februari 2019_
- [Menjalankan Node Penuh Ethereum: Panduan bagi Mereka yang Hampir Tidak Termotivasi](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 November 2019_
- [Menganalisis persyaratan perangkat keras untuk menjadi node tervalidasi penuh Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 September 2018_
- [Menjalankan Node Hyperledger Besu di Jaringan Utama Ethereum: Keuntungan, Persyaratan, dan Penyiapan](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Mei 2020_

## Topik terkait {#related-topics}

- [Blok](/developers/docs/blocks/)
- [Jaringan](/developers/docs/networks/)

## Tutorial terkait {#related-tutorials}

- [Menjalankan Node dengan Geth](/developers/tutorials/run-light-node-geth/) _– Cara mengunduh, menginstal, dan menjalankan Geth. Covering syncmodes, the JavaScript console, and more._
- [Ubah Raspberry Pi 4 Anda menjadi node validator cukup dengan mem-flash kartu MicroSD – Panduan instalasi](/developers/tutorials/run-node-raspberry-pi/) _– Flash Raspberry Pi 4, colokkan kabel ethernet, hubungkan SSD dan nyalakan perangkat untuk mengubah Raspberry Pi 4 menjadi node penuh Ethereum yang menjalankan lapisan eksekusi (Jaringan Utama) dan / atau lapisan konsensus (Rantai Suar / validator)._
