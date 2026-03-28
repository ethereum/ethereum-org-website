---
title: Node dan klien
description: Gambaran umum tentang node dan perangkat lunak klien Ethereum, ditambah cara menyiapkan node dan mengapa Anda harus melakukannya.
lang: id
sidebarDepth: 2
---

[Ethereum](/) adalah jaringan komputer terdistribusi (dikenal sebagai node) yang menjalankan perangkat lunak yang dapat memverifikasi blok dan data transaksi. Perangkat lunak ini harus dijalankan di komputer Anda untuk mengubahnya menjadi node Ethereum. Ada dua perangkat lunak terpisah (dikenal sebagai 'klien') yang diperlukan untuk membentuk sebuah node.

## Prasyarat {#prerequisites}

Anda harus memahami konsep jaringan peer-to-peer dan [dasar-dasar EVM](/developers/docs/evm/) sebelum menyelam lebih dalam dan menjalankan instans klien Ethereum Anda sendiri. Lihat [pengantar Ethereum](/developers/docs/intro-to-ethereum/) kami.

Jika Anda baru mengenal topik node, kami sarankan untuk terlebih dahulu memeriksa pengantar ramah pengguna kami tentang [menjalankan node Ethereum](/run-a-node).

## Apa itu node dan klien? {#what-are-nodes-and-clients}

"Node" adalah instans perangkat lunak klien Ethereum apa pun yang terhubung ke komputer lain yang juga menjalankan perangkat lunak Ethereum, membentuk sebuah jaringan. Klien adalah implementasi Ethereum yang memverifikasi data terhadap aturan protokol dan menjaga jaringan tetap aman. Sebuah node harus menjalankan dua klien: klien konsensus dan klien eksekusi.

- Klien eksekusi (juga dikenal sebagai Mesin Eksekusi, klien EL atau sebelumnya klien Eth1) mendengarkan transaksi baru yang disiarkan di jaringan, mengeksekusinya di EVM, dan menyimpan status terbaru serta basis data dari semua data Ethereum saat ini.
- Klien konsensus (juga dikenal sebagai Beacon Node, klien CL atau sebelumnya klien Eth2) mengimplementasikan algoritma konsensus proof-of-stake, yang memungkinkan jaringan untuk mencapai kesepakatan berdasarkan data yang divalidasi dari klien eksekusi. Ada juga perangkat lunak ketiga, yang dikenal sebagai 'validator' yang dapat ditambahkan ke klien konsensus, memungkinkan node untuk berpartisipasi dalam mengamankan jaringan.

Klien-klien ini bekerja sama untuk melacak kepala rantai Ethereum dan memungkinkan pengguna untuk berinteraksi dengan jaringan Ethereum. Desain modular dengan beberapa perangkat lunak yang bekerja bersama disebut [kompleksitas terenkapsulasi](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Pendekatan ini membuatnya lebih mudah untuk mengeksekusi [The Merge](/roadmap/merge) dengan mulus, membuat perangkat lunak klien lebih mudah dipelihara dan dikembangkan, dan memungkinkan penggunaan kembali klien individu, misalnya, dalam [ekosistem layer 2](/layer-2/).

![Coupled execution and consensus clients](./eth1eth2client.png)
Diagram yang disederhanakan dari klien eksekusi dan konsensus yang digabungkan.

### Keragaman klien {#client-diversity}

Baik [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) maupun [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients) ada dalam berbagai bahasa pemrograman yang dikembangkan oleh tim yang berbeda.

Beberapa implementasi klien dapat membuat jaringan lebih kuat dengan mengurangi ketergantungannya pada satu basis kode. Tujuan idealnya adalah untuk mencapai keragaman tanpa ada klien yang mendominasi jaringan, sehingga menghilangkan potensi titik kegagalan tunggal.
Berbagai bahasa juga mengundang komunitas pengembang yang lebih luas dan memungkinkan mereka untuk membuat integrasi dalam bahasa pilihan mereka.

Pelajari lebih lanjut tentang [keragaman klien](/developers/docs/nodes-and-clients/client-diversity/).

Kesamaan dari implementasi ini adalah semuanya mengikuti satu spesifikasi. Spesifikasi mendikte bagaimana jaringan dan blockchain Ethereum berfungsi. Setiap detail teknis didefinisikan dan spesifikasi dapat ditemukan sebagai:

- Awalnya, [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Spesifikasi eksekusi](https://github.com/ethereum/execution-specs/)
- [Spesifikasi konsensus](https://github.com/ethereum/consensus-specs)
- [EIP](https://eips.ethereum.org/) yang diimplementasikan dalam berbagai [peningkatan jaringan](/ethereum-forks/)

### Melacak node di jaringan {#network-overview}

Beberapa pelacak menawarkan gambaran umum waktu nyata dari node di jaringan Ethereum. Perhatikan bahwa karena sifat jaringan yang terdesentralisasi, perayap ini hanya dapat memberikan pandangan terbatas tentang jaringan dan mungkin melaporkan hasil yang berbeda.

- [Peta node](https://etherscan.io/nodetracker) oleh Etherscan
- [Ethernodes](https://ethernodes.org/) oleh Bitfly
- [Nodewatch](https://www.nodewatch.io/) oleh Chainsafe, merayapi node konsensus
- [Monitoreth](https://monitoreth.io/) - oleh MigaLabs, Alat pemantauan jaringan terdistribusi
- [Laporan Kesehatan Jaringan Mingguan](https://probelab.io) - oleh ProbeLab, Menggunakan [perayap Nebula](https://github.com/dennis-tra/nebula) dan alat lainnya

## Jenis node {#node-types}

Jika Anda ingin [menjalankan node Anda sendiri](/developers/docs/nodes-and-clients/run-a-node/), Anda harus memahami bahwa ada berbagai jenis node yang mengonsumsi data secara berbeda. Faktanya, klien dapat menjalankan tiga jenis node yang berbeda: light, full, dan archive. Ada juga opsi strategi sinkronisasi yang berbeda yang memungkinkan waktu sinkronisasi lebih cepat. Sinkronisasi mengacu pada seberapa cepat ia bisa mendapatkan informasi paling mutakhir tentang status Ethereum.

### Full node {#full-node}

Full node melakukan validasi blok demi blok dari blockchain, termasuk mengunduh dan memverifikasi badan blok dan data status untuk setiap blok. Ada berbagai kelas full node - beberapa mulai dari blok genesis dan memverifikasi setiap blok dalam seluruh sejarah blockchain. Yang lain memulai verifikasi mereka pada blok yang lebih baru yang mereka percayai valid (misalnya, 'snap sync' Geth). Terlepas dari mana verifikasi dimulai, full node hanya menyimpan salinan lokal dari data yang relatif baru (biasanya 128 blok terbaru), memungkinkan data lama dihapus untuk menghemat ruang disk. Data lama dapat dibuat ulang saat dibutuhkan.

- Menyimpan data blockchain penuh (meskipun ini dipangkas secara berkala sehingga full node tidak menyimpan semua data status kembali ke genesis)
- Berpartisipasi dalam validasi blok, memverifikasi semua blok dan status.
- Semua status dapat diambil dari penyimpanan lokal atau dibuat ulang dari 'snapshot' oleh full node.
- Melayani jaringan dan menyediakan data berdasarkan permintaan.

### Archive node {#archive-node}

Archive node adalah full node yang memverifikasi setiap blok dari genesis dan tidak pernah menghapus data apa pun yang diunduh.

- Menyimpan semua yang disimpan di full node dan membangun arsip status historis. Ini diperlukan jika Anda ingin menanyakan sesuatu seperti saldo akun pada blok #4.000.000, atau sekadar dan secara andal menguji set transaksi Anda sendiri tanpa memvalidasinya menggunakan pelacakan.
- Data ini mewakili unit terabyte, yang membuat archive node kurang menarik bagi pengguna rata-rata tetapi bisa berguna untuk layanan seperti penjelajah blok, vendor dompet, dan analitik rantai.

Menyinkronkan klien dalam mode apa pun selain archive akan menghasilkan data blockchain yang dipangkas. Ini berarti, tidak ada arsip dari semua status historis tetapi full node dapat membangunnya sesuai permintaan.

Pelajari lebih lanjut tentang [Archive node](/developers/docs/nodes-and-clients/archive-nodes).

### Light node {#light-node}

Alih-alih mengunduh setiap blok, light node hanya mengunduh header blok. Header ini berisi informasi ringkasan tentang isi blok. Informasi lain apa pun yang dibutuhkan light node diminta dari full node. Light node kemudian dapat secara independen memverifikasi data yang mereka terima terhadap akar status di header blok. Light node memungkinkan pengguna untuk berpartisipasi dalam jaringan Ethereum tanpa perangkat keras yang kuat atau bandwidth tinggi yang diperlukan untuk menjalankan full node. Pada akhirnya, light node mungkin berjalan di ponsel atau perangkat tertanam. Light node tidak berpartisipasi dalam konsensus (yaitu, mereka tidak bisa menjadi validator), tetapi mereka dapat mengakses blockchain Ethereum dengan fungsionalitas dan jaminan keamanan yang sama seperti full node.

Klien light adalah area pengembangan aktif untuk Ethereum dan kami berharap dapat segera melihat klien light baru untuk lapisan konsensus dan lapisan eksekusi.
Ada juga rute potensial untuk menyediakan data klien light melalui [jaringan gosip](https://www.ethportal.net/). Ini menguntungkan karena jaringan gosip dapat mendukung jaringan light node tanpa memerlukan full node untuk melayani permintaan.

Ethereum belum mendukung populasi light node yang besar, tetapi dukungan light node adalah area yang diharapkan berkembang pesat dalam waktu dekat. Secara khusus, klien seperti [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios), dan [LodeStar](https://lodestar.chainsafe.io/) saat ini sangat fokus pada light node.

## Mengapa saya harus menjalankan node Ethereum? {#why-should-i-run-an-ethereum-node}

Menjalankan node memungkinkan Anda untuk secara langsung, tanpa kepercayaan, dan secara pribadi menggunakan Ethereum sambil mendukung jaringan dengan menjaganya agar lebih kuat dan terdesentralisasi.

### Manfaat bagi Anda {#benefits-to-you}

Menjalankan node Anda sendiri memungkinkan Anda untuk menggunakan Ethereum dengan cara yang pribadi, mandiri, dan tanpa kepercayaan. Anda tidak perlu memercayai jaringan karena Anda dapat memverifikasi data sendiri dengan klien Anda. "Jangan percaya, verifikasi" adalah mantra blockchain yang populer.

- Node Anda memverifikasi semua transaksi dan blok terhadap aturan konsensus dengan sendirinya. Ini berarti Anda tidak perlu bergantung pada node lain di jaringan atau sepenuhnya memercayai mereka.
- Anda dapat menggunakan dompet Ethereum dengan node Anda sendiri. Anda dapat menggunakan dapps dengan lebih aman dan pribadi karena Anda tidak perlu membocorkan alamat dan saldo Anda ke perantara. Semuanya dapat diperiksa dengan klien Anda sendiri. [MetaMask](https://metamask.io), [Frame](https://frame.sh/), dan [banyak dompet lainnya](/wallets/find-wallet/) menawarkan impor RPC, yang memungkinkan mereka untuk menggunakan node Anda.
- Anda dapat menjalankan dan meng-host sendiri layanan lain yang bergantung pada data dari Ethereum. Misalnya, ini mungkin validator Beacon Chain, perangkat lunak seperti layer 2, infrastruktur, penjelajah blok, pemroses pembayaran, dll.
- Anda dapat menyediakan [titik akhir RPC](/developers/docs/apis/json-rpc/) kustom Anda sendiri. Anda bahkan dapat menawarkan titik akhir ini secara publik kepada komunitas untuk membantu mereka menghindari penyedia terpusat yang besar.
- Anda dapat terhubung ke node Anda menggunakan **Komunikasi Antar-proses (IPC)** atau menulis ulang node untuk memuat program Anda sebagai plugin. Ini memberikan latensi rendah, yang sangat membantu, mis., saat memproses banyak data menggunakan pustaka web3 atau saat Anda perlu mengganti transaksi Anda secepat mungkin (yaitu, frontrunning).
- Anda dapat secara langsung melakukan stake ETH untuk mengamankan jaringan dan mendapatkan hadiah. Lihat [mengunci solo](/staking/solo/) untuk memulai.

![How you access Ethereum via your application and nodes](./nodes.png)

### Manfaat jaringan {#network-benefits}

Serangkaian node yang beragam penting untuk kesehatan, keamanan, dan ketahanan operasional Ethereum.

- Full node menegakkan aturan konsensus sehingga mereka tidak dapat ditipu untuk menerima blok yang tidak mengikutinya. Ini memberikan keamanan ekstra di jaringan karena jika semua node adalah light node, yang tidak melakukan verifikasi penuh, validator dapat menyerang jaringan.
- Jika terjadi serangan yang mengatasi pertahanan kripto-ekonomi dari [proof-of-stake](/developers/docs/consensus-mechanisms/pos/#what-is-pos), pemulihan sosial dapat dilakukan oleh full node yang memilih untuk mengikuti rantai yang jujur.
- Lebih banyak node di jaringan menghasilkan jaringan yang lebih beragam dan kuat, tujuan akhir dari desentralisasi, yang memungkinkan sistem yang tahan sensor dan andal.
- Full node menyediakan akses ke data blockchain untuk klien ringan yang bergantung padanya. Light node tidak menyimpan seluruh blockchain, melainkan memverifikasi data melalui [akar status di header blok](/developers/docs/blocks/#block-anatomy). Mereka dapat meminta lebih banyak informasi dari full node jika mereka membutuhkannya.

Jika Anda menjalankan full node, seluruh jaringan Ethereum mendapat manfaat darinya, bahkan jika Anda tidak menjalankan validator.

## Menjalankan node Anda sendiri {#running-your-own-node}

Tertarik untuk menjalankan klien Ethereum Anda sendiri?

Untuk pengantar yang ramah pemula, kunjungi halaman [menjalankan node](/run-a-node) kami untuk mempelajari lebih lanjut.

Jika Anda lebih merupakan pengguna teknis, selami lebih banyak detail dan opsi tentang cara [menyiapkan node Anda sendiri](/developers/docs/nodes-and-clients/run-a-node/).

## Alternatif {#alternatives}

Menyiapkan node Anda sendiri dapat menghabiskan waktu dan sumber daya Anda, tetapi Anda tidak selalu perlu menjalankan instans Anda sendiri. Dalam hal ini, Anda dapat menggunakan penyedia API pihak ketiga. Untuk gambaran umum tentang penggunaan layanan ini, lihat [node sebagai layanan](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Jika seseorang menjalankan node Ethereum dengan API publik di komunitas Anda, Anda dapat mengarahkan dompet Anda ke node komunitas melalui RPC Kustom dan mendapatkan lebih banyak privasi daripada dengan pihak ketiga tepercaya yang acak.

Di sisi lain, jika Anda menjalankan klien, Anda dapat membagikannya dengan teman-teman Anda yang mungkin membutuhkannya.

## Klien eksekusi {#execution-clients}

Komunitas Ethereum memelihara beberapa klien eksekusi sumber terbuka (sebelumnya dikenal sebagai 'klien Eth1', atau hanya 'klien Ethereum'), yang dikembangkan oleh tim yang berbeda menggunakan bahasa pemrograman yang berbeda. Ini membuat jaringan lebih kuat dan lebih [beragam](/developers/docs/nodes-and-clients/client-diversity/). Tujuan idealnya adalah untuk mencapai keragaman tanpa ada klien yang mendominasi untuk mengurangi titik kegagalan tunggal.

Tabel ini merangkum klien yang berbeda. Semuanya lulus [pengujian klien](https://github.com/ethereum/tests) dan dipelihara secara aktif untuk tetap diperbarui dengan peningkatan jaringan.

| Klien                                                                    | Bahasa     | Sistem operasi        | Jaringan                  | Strategi sinkronisasi                                          | Pemangkasan status |
| ------------------------------------------------------------------------ | ---------- | --------------------- | ------------------------- | -------------------------------------------------------------- | ------------------ |
| [Geth](https://geth.ethereum.org/)                                       | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), [Full](#full-sync)                         | Archive, Dipangkas |
| [Nethermind](https://www.nethermind.io/)                                 | C#, .NET   | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync) (tanpa melayani), Fast, [Full](#full-sync)  | Archive, Dipangkas |
| [Besu](https://besu.hyperledger.org/en/stable/)                          | Java       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), [Fast](#fast-sync), [Full](#full-sync)     | Archive, Dipangkas |
| [Erigon](https://github.com/ledgerwatch/erigon)                          | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Full](#full-sync)                                             | Archive, Dipangkas |
| [Reth](https://reth.rs/)                                                 | Rust       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Full](#full-sync)                                             | Archive, Dipangkas |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(beta)_ | TypeScript | Linux, Windows, macOS | Sepolia, Hoodi          | [Full](#full-sync)                                             | Dipangkas          |

Untuk informasi lebih lanjut tentang jaringan yang didukung, bacalah tentang [jaringan Ethereum](/developers/docs/networks/).

Setiap klien memiliki kasus penggunaan dan keuntungan yang unik, jadi Anda harus memilih satu berdasarkan preferensi Anda sendiri. Keragaman memungkinkan implementasi difokuskan pada fitur dan audiens pengguna yang berbeda. Anda mungkin ingin memilih klien berdasarkan fitur, dukungan, bahasa pemrograman, atau lisensi.

### Besu {#besu}

Hyperledger Besu adalah klien Ethereum tingkat perusahaan untuk jaringan publik dan berizin. Ini menjalankan semua fitur Mainnet Ethereum, dari pelacakan hingga GraphQL, memiliki pemantauan ekstensif dan didukung oleh ConsenSys, baik di saluran komunitas terbuka maupun melalui SLA komersial untuk perusahaan. Ini ditulis dalam Java dan dilisensikan di bawah Apache 2.0.

[Dokumentasi](https://besu.hyperledger.org/en/stable/) ekstensif Besu akan memandu Anda melalui semua detail tentang fitur dan pengaturannya.

### Erigon {#erigon}

Erigon, sebelumnya dikenal sebagai Turbo-Geth, dimulai sebagai fork dari Go Ethereum yang berorientasi pada kecepatan dan efisiensi ruang disk. Erigon adalah implementasi Ethereum yang sepenuhnya diarsiteki ulang, saat ini ditulis dalam Go tetapi dengan implementasi dalam bahasa lain yang sedang dikembangkan. Tujuan Erigon adalah untuk menyediakan implementasi Ethereum yang lebih cepat, lebih modular, dan lebih dioptimalkan. Ini dapat melakukan sinkronisasi archive node penuh menggunakan sekitar 2TB ruang disk, dalam waktu kurang dari 3 hari.

### Go Ethereum {#geth}

Go Ethereum (disingkat Geth) adalah salah satu implementasi asli dari protokol Ethereum. Saat ini, ini adalah klien yang paling tersebar luas dengan basis pengguna terbesar dan berbagai perkakas untuk pengguna dan pengembang. Ini ditulis dalam Go, sepenuhnya sumber terbuka dan dilisensikan di bawah GNU LGPL v3.

Pelajari lebih lanjut tentang Geth di [dokumentasinya](https://geth.ethereum.org/docs).

### Nethermind {#nethermind}

Nethermind adalah implementasi Ethereum yang dibuat dengan tumpukan teknologi C# .NET, dilisensikan dengan LGPL-3.0, berjalan di semua platform utama termasuk ARM. Ini menawarkan kinerja luar biasa dengan:

- mesin virtual yang dioptimalkan
- akses status
- jaringan dan fitur kaya seperti dasbor Prometheus/Grafana, dukungan pencatatan perusahaan seq, pelacakan JSON-RPC, dan plugin analitik.

Nethermind juga memiliki [dokumentasi terperinci](https://docs.nethermind.io), dukungan pengembang yang kuat, komunitas online, dan dukungan 24/7 yang tersedia untuk pengguna premium.

### Reth {#reth}

Reth (singkatan dari Rust Ethereum) adalah implementasi full node Ethereum yang difokuskan untuk menjadi ramah pengguna, sangat modular, cepat, dan efisien. Reth awalnya dibangun dan didorong maju oleh Paradigm, dan dilisensikan di bawah lisensi Apache dan MIT.

Reth siap produksi, dan cocok untuk penggunaan di lingkungan yang sangat penting seperti mengunci atau layanan dengan waktu aktif tinggi. Berkinerja baik dalam kasus penggunaan di mana kinerja tinggi dengan margin besar diperlukan seperti RPC, MEV, pengindeksan, simulasi, dan aktivitas P2P.

Pelajari lebih lanjut dengan memeriksa [Buku Reth](https://reth.rs/), atau [repo GitHub Reth](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### Dalam pengembangan {#execution-in-development}

Klien-klien ini masih dalam tahap awal pengembangan dan belum direkomendasikan untuk penggunaan produksi.

#### EthereumJS {#ethereumjs}

Klien Eksekusi EthereumJS (EthereumJS) ditulis dalam TypeScript dan terdiri dari sejumlah paket, termasuk primitif inti Ethereum yang diwakili oleh kelas Blok, Transaksi, dan Merkle-Patricia Trie serta komponen klien inti termasuk implementasi Mesin Virtual Ethereum (EVM), kelas blockchain, dan tumpukan jaringan DevP2P.

Pelajari lebih lanjut tentang hal itu dengan membaca [dokumentasinya](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master)

## Klien konsensus {#consensus-clients}

Ada beberapa klien konsensus (sebelumnya dikenal sebagai klien 'Eth2') untuk mendukung [peningkatan konsensus](/roadmap/beacon-chain/). Mereka bertanggung jawab atas semua logika terkait konsensus termasuk algoritma pilihan fork, memproses pengesahan, dan mengelola hadiah serta penalti [proof-of-stake](/developers/docs/consensus-mechanisms/pos).

| Klien                                                         | Bahasa     | Sistem operasi        | Jaringan                                                  |
| ------------------------------------------------------------- | ---------- | --------------------- | --------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Beacon Chain, Hoodi, Pyrmont, Sepolia, dan lainnya      |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia, dan lainnya               |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia, dan lainnya               |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | Beacon Chain, Gnosis, Hoodi, Pyrmont, Sepolia, dan lainnya |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Beacon Chain, Gnosis, Hoodi, Sepolia, dan lainnya       |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia, dan lainnya               |

### Lighthouse {#lighthouse}

Lighthouse adalah implementasi klien konsensus yang ditulis dalam Rust di bawah lisensi Apache-2.0. Ini dipelihara oleh Sigma Prime dan telah stabil serta siap produksi sejak genesis Beacon Chain. Ini diandalkan oleh berbagai perusahaan, kolam staking, dan individu. Ini bertujuan untuk menjadi aman, berkinerja, dan dapat dioperasikan di berbagai lingkungan, dari PC desktop hingga penerapan otomatis yang canggih.

Dokumentasi dapat ditemukan di [Buku Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar adalah implementasi klien konsensus siap produksi yang ditulis dalam Typescript di bawah lisensi LGPL-3.0. Ini dipelihara oleh ChainSafe Systems dan merupakan klien konsensus terbaru untuk staker solo, pengembang, dan peneliti. Lodestar terdiri dari beacon node dan klien validator yang didukung oleh implementasi JavaScript dari protokol Ethereum. Lodestar bertujuan untuk meningkatkan kegunaan Ethereum dengan klien light, memperluas aksesibilitas ke kelompok pengembang yang lebih besar, dan berkontribusi lebih lanjut pada keragaman ekosistem.

Informasi lebih lanjut dapat ditemukan di [situs web Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus adalah implementasi klien konsensus yang ditulis dalam Nim di bawah lisensi Apache-2.0. Ini adalah klien siap produksi yang digunakan oleh staker solo dan kolam staking. Nimbus dirancang untuk efisiensi sumber daya, membuatnya mudah dijalankan pada perangkat dengan sumber daya terbatas dan infrastruktur perusahaan dengan kemudahan yang sama, tanpa mengorbankan stabilitas atau kinerja hadiah. Jejak sumber daya yang lebih ringan berarti klien memiliki margin keamanan yang lebih besar saat jaringan berada di bawah tekanan.

Pelajari lebih lanjut di [dokumen Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm adalah klien konsensus sumber terbuka berfitur lengkap yang ditulis dalam Go di bawah lisensi GPL-3.0. Ini menampilkan UI aplikasi web opsional dan memprioritaskan pengalaman pengguna, dokumentasi, dan konfigurabilitas untuk pengguna stake-at-home dan institusional.

Kunjungi [dokumen Prysm](https://prysm.offchainlabs.com/docs/) untuk mempelajari lebih lanjut.

### Teku {#teku}

Teku adalah salah satu klien genesis Beacon Chain asli. Di samping tujuan biasa (keamanan, ketahanan, stabilitas, kegunaan, kinerja), Teku secara khusus bertujuan untuk sepenuhnya mematuhi semua berbagai standar klien konsensus.

Teku menawarkan opsi penerapan yang sangat fleksibel. Beacon node dan klien validator dapat dijalankan bersama sebagai satu proses, yang sangat nyaman untuk staker solo, atau node dapat dijalankan secara terpisah untuk operasi mengunci yang canggih. Selain itu, Teku sepenuhnya dapat dioperasikan dengan [Web3Signer](https://github.com/ConsenSys/web3signer/) untuk keamanan kunci penandatanganan dan perlindungan pemotongan.

Teku ditulis dalam Java dan dilisensikan di bawah Apache 2.0. Ini dikembangkan oleh tim Protokol di ConsenSys yang juga bertanggung jawab atas Besu dan Web3Signer. Pelajari lebih lanjut di [dokumen Teku](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandine adalah implementasi klien konsensus, yang ditulis dalam Rust di bawah lisensi GPL-3.0. Ini dipelihara oleh Tim Inti Grandine dan cepat, berkinerja tinggi, serta ringan. Ini cocok untuk berbagai staker dari staker solo yang berjalan pada perangkat bersumber daya rendah seperti Raspberry Pi hingga staker institusional besar yang menjalankan puluhan ribu validator.

Dokumentasi dapat ditemukan di [Buku Grandine](https://docs.grandine.io/)

## Mode sinkronisasi {#sync-modes}

Untuk mengikuti dan memverifikasi data saat ini di jaringan, klien Ethereum perlu menyinkronkan dengan status jaringan terbaru. Ini dilakukan dengan mengunduh data dari rekan, memverifikasi integritasnya secara kriptografi, dan membangun basis data blockchain lokal.

Mode sinkronisasi mewakili pendekatan yang berbeda untuk proses ini dengan berbagai pertukaran. Klien juga bervariasi dalam implementasi algoritma sinkronisasi mereka. Selalu merujuk ke dokumentasi resmi dari klien pilihan Anda untuk spesifikasi implementasi.

### Mode sinkronisasi lapisan eksekusi {#execution-layer-sync-modes}

Lapisan eksekusi dapat dijalankan dalam mode yang berbeda agar sesuai dengan kasus penggunaan yang berbeda, dari mengeksekusi ulang status dunia blockchain hingga hanya menyinkronkan dengan ujung rantai dari pos pemeriksaan tepercaya.

#### Sinkronisasi penuh {#full-sync}

Sinkronisasi penuh mengunduh semua blok (termasuk header dan badan blok) dan membuat ulang status blockchain secara bertahap dengan mengeksekusi setiap blok dari genesis.

- Meminimalkan kepercayaan dan menawarkan keamanan tertinggi dengan memverifikasi setiap transaksi.
- Dengan meningkatnya jumlah transaksi, dibutuhkan waktu berhari-hari hingga berminggu-minggu untuk memproses semua transaksi.

[Archive node](#archive-node) melakukan sinkronisasi penuh untuk membangun (dan mempertahankan) riwayat lengkap perubahan status yang dibuat oleh setiap transaksi di setiap blok.

#### Sinkronisasi cepat {#fast-sync}

Seperti sinkronisasi penuh, sinkronisasi cepat mengunduh semua blok (termasuk header, transaksi, dan tanda terima). Namun, alih-alih memproses ulang transaksi historis, sinkronisasi cepat bergantung pada tanda terima hingga mencapai kepala terbaru, ketika ia beralih ke mengimpor dan memproses blok untuk menyediakan full node.

- Strategi fast sync.
- Mengurangi permintaan pemrosesan demi penggunaan bandwidth.

#### Snap sync {#snap-sync}

Snap sync juga memverifikasi rantai blok demi blok. Namun, alih-alih memulai dari blok genesis, snap sync dimulai pada pos pemeriksaan 'tepercaya' yang lebih baru yang diketahui menjadi bagian dari blockchain yang sebenarnya. Node menyimpan pos pemeriksaan berkala sambil menghapus data yang lebih lama dari usia tertentu. Snapshot ini digunakan untuk membuat ulang data status sesuai kebutuhan, daripada menyimpannya selamanya.

- Strategi sinkronisasi tercepat, saat ini menjadi default di Mainnet Ethereum.
- Menghemat banyak penggunaan disk dan bandwidth jaringan tanpa mengorbankan keamanan.

[Lebih lanjut tentang snap sync](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Light sync {#light-sync}

Mode klien light mengunduh semua header blok, data blok, dan memverifikasi beberapa secara acak. Hanya menyinkronkan ujung rantai dari pos pemeriksaan tepercaya.

- Hanya mendapatkan status terbaru sambil mengandalkan kepercayaan pada pengembang dan mekanisme konsensus.
- Klien siap digunakan dengan status jaringan saat ini dalam beberapa menit.

**NB** Light sync belum berfungsi dengan Ethereum proof-of-stake - versi baru dari light sync akan segera dirilis!

[Lebih lanjut tentang klien light](/developers/docs/nodes-and-clients/light-clients/)

### Mode sinkronisasi lapisan konsensus {#consensus-layer-sync-modes}

#### Optimistic sync {#optimistic-sync}

Optimistic sync adalah strategi sinkronisasi pasca-penggabungan yang dirancang untuk menjadi opt-in dan kompatibel ke belakang, memungkinkan node eksekusi untuk menyinkronkan melalui metode yang sudah mapan. Mesin eksekusi dapat _secara optimis_ mengimpor blok beacon tanpa memverifikasinya sepenuhnya, menemukan kepala terbaru, dan kemudian mulai menyinkronkan rantai dengan metode di atas. Kemudian, setelah klien eksekusi menyusul, ia akan memberi tahu klien konsensus tentang validitas transaksi di Beacon Chain.

[Lebih lanjut tentang optimistic sync](https://github.com/ethereum/consensus-specs/blob/master/sync/optimistic.md)

#### Checkpoint sync {#checkpoint-sync}

Checkpoint sync, juga dikenal sebagai sinkronisasi subjektivitas lemah, menciptakan pengalaman pengguna yang unggul untuk menyinkronkan Beacon Node. Ini didasarkan pada asumsi [subjektivitas lemah](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) yang memungkinkan sinkronisasi Beacon Chain dari pos pemeriksaan subjektivitas lemah baru-baru ini alih-alih genesis. Checkpoint sync membuat waktu sinkronisasi awal secara signifikan lebih cepat dengan asumsi kepercayaan yang serupa dengan sinkronisasi dari [genesis](/glossary/#genesis-block).

Dalam praktiknya, ini berarti node Anda terhubung ke layanan jarak jauh untuk mengunduh status final terbaru dan terus memverifikasi data dari titik tersebut. Pihak ketiga yang menyediakan data dipercaya dan harus dipilih dengan cermat.

Lebih lanjut tentang [checkpoint sync](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Bacaan lebih lanjut {#further-reading}

- [Ethereum 101 - Bagian 2 - Memahami Node](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 Februari 2019_
- [Menjalankan Full Node Ethereum: Panduan untuk yang Kurang Termotivasi](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 November 2019_

## Topik terkait {#related-topics}

- [Blok](/developers/docs/blocks/)
- [Jaringan](/developers/docs/networks/)

## Tutorial terkait {#related-tutorials}

- [Ubah Raspberry Pi 4 Anda menjadi node validator hanya dengan mem-flash kartu MicroSD – Panduan instalasi](/developers/tutorials/run-node-raspberry-pi/) _– Flash Raspberry Pi 4 Anda, colokkan kabel ethernet, sambungkan disk SSD, dan nyalakan perangkat untuk mengubah Raspberry Pi 4 menjadi full node Ethereum yang menjalankan lapisan eksekusi (Mainnet) dan / atau lapisan konsensus (Beacon Chain / validator)._