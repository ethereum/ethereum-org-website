---
title: Node sebagai layanan
description: Gambaran umum tingkat pemula tentang layanan node, pro dan kontranya, serta penyedia populer.
lang: id
sidebarDepth: 2
---

## Pengenalan {#Introduction}

Menjalankan [simpul Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) Anda sendiri bisa jadi menantang, terutama saat baru memulai atau saat melakukan penskalaan dengan cepat. Ada [sejumlah layanan](#popular-node-services) yang menjalankan infrastruktur simpul yang dioptimalkan untuk Anda, sehingga Anda dapat fokus pada pengembangan aplikasi atau produk Anda. Kami akan menjelaskan bagaimana cara kerja layanan node, pro dan kotra dalam penggunaannya, dan daftar penyedia jika Anda tertarik untuk memulainya.

## Persyaratan {#prerequisites}

Jika Anda belum memahami apa itu simpul dan klien, lihat [Simpul dan klien](/developers/docs/nodes-and-clients/).

## Para Penaruh {#stakoooooooooooooors}

Para pemain tunggal harus menjalankan infrastruktur mereka sendiri daripada bergantung pada penyedia pihak ketiga. Ini berarti menjalankan klien eksekusi yang digabungkan dengan klien konsensus. Sebelum [Penggabungan](/roadmap/merge), memungkinkan untuk hanya menjalankan klien konsensus dan menggunakan penyedia terpusat untuk data eksekusi; ini tidak lagi memungkinkan - seorang penaruh solo harus menjalankan kedua klien. Namun, ada layanan yang tersedia untuk memudahkan proses ini.

[Baca lebih lanjut tentang menjalankan simpul](/developers/docs/nodes-and-clients/run-a-node/).

Layanan yang dijelaskan di halaman ini adalah untuk simpul yang tidak di-taruhkan.

## Bagaimana cara kerja layanan simpul? {#how-do-node-services-work}

Penyedia layanan simpul menjalankan klien simpul terdistribusi di belakang layar untuk Anda, sehingga Anda tidak perlu melakukannya sendiri.

Layanan ini umumnya menyediakan kunci API yang bisa Anda gunakan untuk menulis pada dan membaca dari rantai blok. Layanan ini sering kali menyertakan akses ke [testnet Ethereum](/developers/docs/networks/#ethereum-testnets) selain Jaringan Utama.

Beberapa layanan menawarkan node yang didedikasikan sebagai milik Anda sendiri yang dikelola mereka untuk Anda, sementara yang lainnya menggunakan penyeimbang muatan untuk mendistribusikan aktivitas di seluruh simpul.

Hampir semua layanan node sangat mudah untuk dintegrasikan, melibatkan sebaris perubahan dalam kode Anda untuk menukar simpul yang Anda host sendiri, atau bahkan beralih antar layanan itu sendiri.

Sering kali layanan simpul akan menjalankan berbagai [klien simpul](/developers/docs/nodes-and-clients/#execution-clients) dan [jenis](/developers/docs/nodes-and-clients/#node-types), memungkinkan Anda untuk mengakses simpul penuh dan arsip selain metode khusus klien dalam satu API.

Penting untuk dicatat bahwa layanan Node tidak dan seharusnya tidak menyimpan kunci atau informasi privat Anda.

## Apa keuntungan menggunakan layanan node? {#benefits-of-using-a-node-service}

Keuntungan utama menggunakan layanan node adalah Anda tidak perlu menyediakan waktu merawat dan mengelola node sendiri. Ini memungkinkan Anda fokus pada penyusunan produk Anda alih-alih harus khawatir dengan pemeliharaan infrastruktur.

Menjalankan node Anda sendiri bisa sangat mahal dari segi penyimpanan bandwidth hingga segi waktu yang seharusnya lebih banyak untuk melakukan pembuatan. Hal-hal seperti memutar lebih banyak node ketika melakukan penskalaan, meningkatkan node ke versi terbaru, dan memastikan konsistensi status, dapat mengalihkan perhatian Anda dari membangun dan membelanjakan sumber daya pada produk web3 yang Anda inginkan.

## Apa kelebihan penggunaan Layanan Node? {#cons-of-using-a-node-service}

Dengan menggunakan layanan node Anda memusatkan aspek infrastruktur produk Anda. Karena alasan ini, proyek yang menerapkan desentralisasi sampai ke level paling tinggi mungkin lebih memilih node hosting mandiri dari pada menyewa pihak ketiga.

Baca lebih lanjut tentang [keuntungan menjalankan simpul Anda sendiri](/developers/docs/nodes-and-clients/#benefits-to-you).

## Layanan simpul populer {#popular-node-services}

Berikut ini adalah daftar beberapa penyedia node Ethereum paling populer, jangan ragu-ragu menambahkan penyedia mana saja yang terlewat! Setiap layanan node menawarkan keuntungan dan fitur berbeda di samping layanan gratis atau berbayar, Anda harus menginvestigasi mana yang paling sesuai dengan kebutuhan Anda sebelum membuat keputusan.

- [**Alchemy**](https://alchemy.com/)
  - [Dokumentasi](https://www.alchemy.com/docs/)
  - Fitur
    - Tingkat gratis terbesar dengan 300 juta unit komputasi per bulan (~30 juta permintaan getLatestBlock)
    - Dukungan multichain untuk Polygon, Starknet, Optimisme, Arbitrum
    - Memberdayakan ~70% dari dapps Ethereum terbesar dan volume transaksi DeFi
    - Peringatan webhook waktu nyata melalui Alchemy Notify
    - Dukungan dan keandalan/stabilitas terbaik di kelasnya
    - API NFT Alchemy
    - Dasbor dengan Penjelajah Permintaan, Pengamat Mempool, dan Komposer
    - Akses keran testnet terintegrasi
    - Komunitas pembangun Discord yang aktif dengan 18 ribu pengguna

- [**Allnodes**](https://www.allnodes.com/)
  - [Dokumentasi](https://docs.allnodes.com/)
  - Fitur
    - Tidak ada batasan kecepatan dengan token PublicNode yang dibuat di halaman portofolio Allnodes.
    - Titik akhir rpc gratis yang berfokus pada privasi (100+ rantai blok) di [PublicNode](https://www.publicnode.com)
    - Node khusus tanpa batasan kecepatan untuk 90+ blockchain
    - Node arsip khusus untuk 30+ blockchain
    - Tersedia di 3 wilayah (AS, Eropa, Asia)
    - Snapshot untuk 100+ rantai blok di [PublicNode](https://www.publicnode.com/snapshots)
    - Layanan dukungan teknis 24 jam sehari, 7 hari seminggu, dengan uptime SLA 99,90%-99.98% (sesuai paket).
    - Bayar harga per jam
    - Pembayaran melalui Kartu Kredit, PayPal, atau Cryptocurrency

- [**All That Node**](https://allthatnode.com/)
  - [Dokumentasi](https://docs.allthatnode.com/)
  - Fitur
    - 50.000 permintaan per hari pada paket gratis
    - Mendukung lebih dari 40 protokol
    - Mendukung API JSON-RPC (EVM, Tendermint), REST, dan Websocket
    - Akses tak terbatas hingga tanggal pengarsipan
    - Dukungan teknis hingga 24/7 dan lebih dari 99.9% durasi aktif
    - keran ( Faucet ) tersedia pada multi rantai
    - Akses titik akhir tanpa batas dengan jumlah kunci "API" tak terbatas
    - Melacak/Debug dukungan "API"
    - Pembaruan otomatis

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Dokumentasi](https://aws.amazon.com/managed-blockchain/resources/)
  - Fitur
    - Ethereum nodes dengan manajemen penuh
    - Tersedia di enam wilayah
    - JSON-RPC melalui HTTP dan WebSocket yang aman
    - Mendukung 3 rantai
    - SLA, Dukungan AWS 24/7
    - Go-ethereum dan Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Dokumentasi](https://docs.ankr.com/)
  - Fitur
    - Protokol Ankr - akses terbuka ke endpoint API RPC Publik untuk 8+ rantai
    - Memuat saldo dan pengawasan kesehatan node untuk gerbang masuk yang cepat dan tepercaya ke node terdekat yang tersedia
    - Tingkatan premium yang mengaktifkan endpoint WSS dan batas laju yang tak terbatas
    - Node penuh satu klik dan penyebaran node validator untuk 40+ rantai
    - Skalakan saat Anda jalankan
    - Alat analitik
    - Dasbor
    - Endpoint RPC, HTTPS, dan WSS
    - Dukungan langsung

- [**Blast**](https://blastapi.io/)
  - [Dokumentasi](https://docs.blastapi.io/)
  - Fitur
    - Dukungan RPC dan WSS
    - Hosting node multi-wilayah
    - Infrastruktur yang terdesentralisasi
    - API Publik
    - Paket Gratis Khusus
    - Dukungan multichain (17+ blockchain)
    - Simpul Arsip
    - Dukungan Discord 24/7
    - Pemantauan dan peringatan 24/7
    - SLA keseluruhan sebesar 99,9%
    - Bayar dengan kripto

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Dokumentasi](https://ubiquity.docs.blockdaemon.com/)
  - Keuntungan
    - Dasbor
    - Basis node satuan
    - Analitik

- [**BlockPI**](https://blockpi.io/)
  - [Dokumentasi](https://docs.blockpi.io/)
  - Fitur
    - Struktur simpul yang kuat & terdistribusi
    - Hingga 40 titik akhir HTTPS dan WSS
    - Paket pendaftaran gratis dan paket bulanan
    - Metode penelusuran + Dukungan data arsip
    - Paket dengan masa berlaku hingga 90 hari
    - Paket khusus dan bayar sesuai kebutuhan Anda
    - Bayar dengan kripto
    - Dukungan langsung & Dukungan teknis

- [**Chainbase**](https://www.chainbase.com/)
  - [Dokumentasi](https://docs.chainbase.com)
  - Fitur
    - Layanan RPC yang sangat tersedia, cepat, dan terukur
    - Dukungan multi-rantai
    - Tarif gratis
    - Dasbor yang mudah digunakan
    - Menyediakan layanan data blockchain di luar RPC

- [**Chainstack**](https://chainstack.com/)
  - [Dokumentasi](https://docs.chainstack.com/)
  - Fitur
    - Node umum gratis
    - Node arsip umum
    - Dukungan GraphQL
    - Endpoint RPC dan WSS
    - Node penuh dan arsip khusus
    - Waktu sinkronisasi yang cepat untuk penerapan khusus
    - Bawa cloud Anda
    - Bayar harga per jam
    - Dukungan langsung 24/7

- [**dRPC**](https://drpc.org/)
  - [Dokumentasi](https://drpc.org/docs)
  - NodeCloud: Infrastruktur RPC siap pakai mulai dari $10 (USD)—kecepatan penuh, tanpa batas
  - Fitur NodeCloud:
    - Dukungan API untuk 185 jaringan
    - Kumpulan terdistribusi dari 40+ penyedia
    - Cakupan global dengan sembilan (9) kluster geografis
    - Sistem penyeimbangan beban bertenaga AI
    - Harga tetap bayar sesuai pemakaian—tanpa kenaikan, tanpa kedaluwarsa, tanpa ikatan
    - Kunci tak terbatas, penyesuaian kunci granular, peran tim, perlindungan front-end
    - Tarif tetap metode sebesar 20 unit komputasi (CU) per metode
    - [Daftar rantai titik akhir publik](https://drpc.org/chainlist)
    - [Kalkulator harga](https://drpc.org/pricing#calculator)
  - NodeCore: tumpukan sumber terbuka untuk organisasi yang menginginkan kontrol penuh

- [**GetBlock**](https://getblock.io/)
  - [Dokumentasi](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Fitur
    - Akses ke 40+ simpul rantai blok
    - 40 Ribu permintaan harian gratis
    - Jumlah kunci API yang tidak terbatas
    - Kecepatan koneksi tinggi 1GB/detik
    - Lacak+Arsipkan
    - Analitik tingkat lanjut
    - Pembaruan otomatis
    - Dukungan teknis

- [**InfStones**](https://infstones.com/)
  - Fitur
    - Opsi layanan gratis
    - Skalakan saat Anda jalankan
    - Analitik
    - Dasbor
    - Endpoint API yang unik
    - Node penuh khusus
    - Waktu sinkronisasi yang cepat untuk penerapan khusus
    - Dukungan langsung 24/7
    - Akses ke 50+ simpul rantai blok

- [**Infura**](https://infura.io/)
  - [Dokumentasi](https://infura.io/docs)
  - Fitur
    - Opsi layanan gratis
    - Skalakan saat Anda jalankan
    - Data arsip berbayar
    - Dukungan langsung
    - Dasbor

- [**Kaleido**](https://kaleido.io/)
  - [Dokumentasi](https://docs.kaleido.io/)
  - Fitur
    - Tingkat pemula gratis
    - Penyebaran simpul Ethereum sekali klik
    - Klien dan algoritma yang dapat disesuaikan (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - 500+ API administratif dan layanan
    - Antarmuka RESTful untuk pengiriman transaksi Ethereum (didukung Apache Kafka)
    - Streaming keluar untuk pengiriman acara (didukung Apache Kafka)
    - Koleksi mendalam layanan \"di luar rantai\" dan layanan pelengkap (misalnya, transportasi pesan terenkripsi bilateral)
    - Penyiapan jaringan yang mudah dengan tata kelola dan kontrol akses berbasis peran
    - Manajemen pengguna yang canggih untuk administrator dan pengguna akhir
    - Infrastruktur kelas perusahaan yang sangat skalabel, tangguh, dan tangguh
    - Manajemen kunci pribadi Cloud HSM
    - Penambatan Ethereum Mainnet
    - Sertifikasi ISO 27k dan SOC 2, Tipe 2
    - Konfigurasi runtime dinamis (misalnya, menambahkan integrasi cloud, mengubah ingress simpul, dll.)
    - Dukungan untuk orkestrasi penerapan multi-cloud, multi-wilayah, dan hibrida
    - Harga berbasis SaaS per jam yang sederhana
    - SLA dan dukungan 24x7

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Dokumentasi](https://docs.lavanet.xyz/)
  - Fitur
    - Penggunaan Testnet Gratis
    - Redundansi Terdesentralisasi untuk Waktu Kerja Tinggi
    - Sumber terbuka
    - SDK yang sepenuhnya terdesentralisasi
    - Integrasi Ethers.js
    - Antarmuka Manajemen Proyek yang Intuitif
    - Integritas Data Berbasis Konsensus
    - Dukungan Multi-Rantai

- [**Moralis**](https://moralis.io/)
  - [Dokumentasi](https://docs.moralis.io/)
  - Fitur
    - Node umum gratis
    - Node arsip umum gratis
    - Berfokus pada privasi (tidak ada kebijakan log)
    - Dukungan antar rantai
    - Skalakan saat Anda jalankan
    - Dasbor
    - SDK Ethereum unik
    - Endpoint API yang unik
    - Dukungan teknis langsung

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Dokumentasi](https://docs.nodereal.io/docs/introduction)
  - Fitur
    - Layanan API RPC yang andal, cepat, dan dapat diskalakan
    - API yang disempurnakan untuk pengembang web3
    - Dukungan multi-rantai
    - Mulailah secara gratis

- [**NOWNodes**](https://nownodes.io/)
  - [Dokumentasi](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Fitur
    - Akses ke 50+ simpul rantai blok
    - Kunci API Gratis
    - Block Explorer
    - Waktu Respons API ⩽ 1 detik
    - Tim Dukungan 24/7
    - Manajer Akun Pribadi
    - Node bersama, arsip, cadangan, dan khusus

- [**Pocket Network**](https://www.pokt.network/)
  - [Dokumentasi](https://docs.pokt.network/home/)
  - Fitur
    - Protokol dan Pasar RPC terdesentralisasi
    - 1JT Permintaan Per Hari untuk Layanan Gratis (per endpoint, maks. 2)
    - [Titik Akhir Publik](https://docs.pokt.network/developers/public-endpoints)
    - Pra-Penaruhan+ Program (jika Anda memerlukan lebih dari 1JT permintaan per hari)
    - Didukung 15+ Blockchain
    - 6400+ Node yang menghasilkan POKT untuk aplikasi layanan
    - Simpul Arsip, Simpul Arsip dengan Pelacakan, & Dukungan Simpul Testnet
    - Keberagaman Klien Node Jaringan Utama Ethereum
    - Tidak Ada Satu Titik Kegagalan
    - Tanpa Waktu Henti
    - Tokenomic Hampir Nol yang Berbiaya Efektif (taruhkan POKT satu kali untuk bandwidth jaringan)
    - Tidak ada biaya hangus bulanan, ubah infrastruktur Anda menjadi aset
    - Penyeimbang Muatan yang dibangun ke dalam Protokol
    - Skalakan jumlah permintaan per hari dan node per jam tanpa terbatas seiring dengan prosesnya
    - Opsi paling privat, tahan penyensoran
    - Dukungan pengembang langsung
    - Dasbor dan analitik [Pocket Portal](https://bit.ly/ETHorg_POKTportal)

- [**QuickNode**](https://www.quicknode.com)
  - [Dokumentasi](https://www.quicknode.com/docs/)
  - Fitur
    - Dukungan teknis 24/7 & komunitas dev Discord
    - Jaringan geo-balanced, multi cloud/metal, dengan latensi rendah
    - Dukungan multichain (Optimisme, Arbitrum, Poligon + 11 lainnya)
    - Lapisan tengah untuk kecepatan & stabilitas (perutean panggilan, cache, pengindeksan)
    - Pemantauan Kontrak Cerdas melalui Webhooks
    - Dasbor intuitif, rangkaian analisis, komposer RPC
    - Fitur keamanan tingkat lanjut (JWT, masking, daftar putih)
    - API data dan analisis NFT
    - [Tersertifikasi SOC2](https://www.quicknode.com/security)
    - Cocok untuk Pengembang hingga Perusahaan

- [**Rivet**](https://rivet.cloud/)
  - [Dokumentasi](https://rivet.readthedocs.io/en/latest/)
  - Fitur
    - Opsi layanan gratis
    - Skalakan saat Anda jalankan

- [**SenseiNode**](https://senseinode.com)
  - [Dokumentasi](https://docs.senseinode.com/)
  - Fitur
    - Node khusus dan Berbagi
    - Dasbor
    - Hosting di AWS pada beberapa penyedia hosting di berbagai lokasi di Amerika Latin
    - Klien Prysm dan Lighthouse

- [**SettleMint**](https://console.settlemint.com/)
  - [Dokumentasi](https://docs.settlemint.com/)
  - Fitur
    - Uji coba gratis
    - Skalakan saat Anda jalankan
    - Dukungan GraphQL
    - Endpoint RPC dan WSS
    - Node penuh khusus
    - Bawa cloud Anda
    - Alat analitik
    - Dasbor
    - Bayar harga per jam
    - Dukungan langsung

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Dokumentasi](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Fitur
    - Tingkat gratis termasuk 25 juta Unit Tenderly per bulan
    - Akses gratis ke data historis
    - Beban kerja yang berat untuk membaca hingga 8x lebih cepat
    - 100% akses baca yang konsisten
    - Titik akhir JSON-RPC
    - Pembuat permintaan RPC berbasis UI dan pratinjau permintaan
    - Terintegrasi erat dengan alat pengembangan, debugging, dan pengujian Tenderly
    - Simulasi transaksi
    - Analisis dan pemfilteran penggunaan
    - Manajemen kunci akses yang mudah
    - Dukungan teknis khusus melalui obrolan, email, dan Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Dokumentasi](https://services.tokenview.io/docs?type=nodeService)
  - Fitur
    - Dukungan teknis 24/7 & Komunitas Dev Telegram
    - Dukungan multichain (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Baik titik akhir RPC dan WSS terbuka untuk digunakan
    - Akses tak terbatas ke API data arsip
    - Dasbor dengan Penjelajah Permintaan dan Pengamat Mempool
    - API data NFT dan pemberitahuan Webhook
    - Bayar dalam Crypto
    - Dukungan eksternal untuk persyaratan perilaku ekstra

- [**Watchdata**](https://watchdata.io/)
  - [Dokumentasi](https://docs.watchdata.io/)
  - Fitur
    - Keandalan data
    - Koneksi tanpa gangguan tanpa waktu henti
    - Otomatisasi proses
    - Tarif gratis
    - Batas tinggi yang sesuai untuk semua pengguna
    - Dukungan untuk berbagai node
    - Penskalaan sumber daya
    - Kecepatan pemrosesan yang tinggi

- [**ZMOK**](https://zmok.io/)
  - [Dokumentasi](https://docs.zmok.io/)
  - Fitur
    - Berjalan di depan sebagai layanan
    - Mempool transaksi global dengan metode pencarian/penyaringan
    - Biaya TX tak terbatas dan Gas tak terbatas untuk transaksi pengiriman
    - Mendapatkan blok baru dan pembacaan blockchain tercepat
    - Jaminan harga terbaik per panggilan API

- [**Zeeve**](https://www.zeeve.io/)
  - [Dokumentasi](https://www.zeeve.io/docs/)
  - Fitur
    - Platform otomatisasi tanpa kode tingkat perusahaan yang menyediakan penyebaran, pemantauan, dan pengelolaan node dan jaringan Blockchain
    - 30+ Protokol & Integrasi yang Didukung, dan akan terus ditambahkan
    - Layanan infrastruktur web3 bernilai tambah seperti penyimpanan terdesentralisasi, identitas terdesentralisasi, dan API data Blockchain Ledger untuk kasus penggunaan di dunia nyata
    - Dukungan 24/7 dan pemantauan proaktif memastikan kesehatan node sepanjang waktu.
    - Titik akhir RPC menawarkan akses terautentikasi ke API, manajemen tanpa repot dengan dasbor dan analitik yang intuitif.
    - Menyediakan cloud terkelola dan membawa opsi cloud Anda sendiri untuk dipilih dan mendukung semua penyedia cloud utama seperti AWS, Azure, Google Cloud, Digital Ocean, dan on-premise.
    - Kami menggunakan perutean cerdas untuk mencapai node yang paling dekat dengan pengguna Anda setiap saat

## Bacaan lebih lanjut {#further-reading}

- [Daftar layanan simpul Ethereum](https://ethereumnodes.com/)

## Topik terkait {#related-topics}

- [Simpul dan klien](/developers/docs/nodes-and-clients/)

## Tutorial terkait {#related-tutorials}

- [Memulai pengembangan Ethereum menggunakan Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Panduan untuk mengirim transaksi menggunakan web3 dan Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
