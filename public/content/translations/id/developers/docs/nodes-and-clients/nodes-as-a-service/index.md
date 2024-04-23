---
title: Node sebagai layanan
description: Gambaran umum tingkat pemula tentang layanan node, pro dan kontranya, serta penyedia populer.
lang: id
sidebarDepth: 2
---

## Pendahuluan {#Introduction}

Menjalankan [node Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) milik Anda bisa sangat sulit, khususnya pada proses awal atau saat melakukan penskalaan dengan cepat. Ada [sejumlah layanan](#popular-node-services) yang menjalankan infrastruktur node yang dioptimalkan untuk Anda, sehingga Anda dapat fokus pada pengembangan aplikasi atau produk. Kami akan menjelaskan bagaimana cara kerja layanan node, pro dan kotra dalam penggunaannya, dan daftar penyedia jika Anda tertarik untuk memulainya.

## Prasyarat {#prerequisites}

Jika Anda belum memahami apa itu node dan klien, bacalah tentang [Node dan klien](/developers/docs/nodes-and-clients/).

## Bagaimana cara kerja layanan node? {#how-do-node-services-work}

Penyedia layanan node menjalankan klien node terdistribusi di belakang layar untuk Anda, sehingga Anda tidak perlu melakukannya sendiri.

Layanan ini umumnya menyediakan kunci API yang bisa Anda gunakan untuk menulis pada dan membaca dari blockchain. Layanan ini sering mencakup akses ke [testnet Ethereum](/developers/docs/networks/#ethereum-testnets) sebagai tambahan pada Jaringan Utama.

Beberapa layanan menawarkan node yang didedikasikan sebagai milik Anda sendiri yang dikelola mereka untuk Anda, sementara yang lainnya menggunakan penyeimbang muatan untuk mendistribusikan aktivitas di seluruh node.

Hampir semua layanan node sangat mudah untuk dintegrasikan, melibatkan sebaris perubahan dalam kode Anda untuk menukar node yang Anda host sendiri, atau bahkan beralih antar layanan itu sendiri.

Sering kali layanan node akan menjalankan berbagai [klien node](/developers/docs/nodes-and-clients/#execution-clients) dan [jenis](/developers/docs/nodes-and-clients/#node-types), memungkinkan Anda mengakses node penuh dan node arsip di samping metode khusus klien dalam satu API.

Penting untuk dicatat bahwa layanan node tidak dan seharusnya tidak menyimpan kunci atau informasi privat Anda.

## Apa keuntungan menggunakan layanan node? {#benefits-of-using-a-node-service}

Keuntungan utama menggunakan layanan node adalah Anda tidak perlu menyediakan waktu merawat dan mengelola node sendiri. Ini memungkinkan Anda fokus pada penyusunan produk Anda alih-alih harus khawatir dengan pemeliharaan infrastruktur.

Menjalankan node Anda sendiri bisa sangat mahal dari segi penyimpanan bandwidth hingga segi waktu yang seharusnya lebih banyak untuk melakukan pembuatan. Hal-hal seperti menjalankan lebih banyak node ketika melakukan penskalaan, memperbarui node ke versi terbaru, dan memastikan konsistensi state, bisa mengurangi pembangunan dan pemakaian sumber daya pada produk web3 yang Anda inginkan.

## Apa kelebihan penggunaan Layanan Node? {#cons-of-using-a-node-service}

Dengan menggunakan layanan node Anda memusatkan aspek infrastruktur produk Anda. Karena alasan ini, proyek yang menerapkan desentralisasi sampai ke level paling tinggi mungkin lebih memilih node hosting mandiri dari pada menyewa pihak ketiga.

Baca lebih lanjut tentang [keuntungan menjalankan node Anda sendiri](/developers/docs/nodes-and-clients/#benefits-to-you).

## Layanan node populer {#popular-node-services}

Berikut ini adalah daftar beberapa penyedia node Ethereum paling populer, jangan ragu-ragu menambahkan penyedia mana saja yang terlewat! Setiap layanan node menawarkan keuntungan dan fitur berbeda di samping layanan gratis atau berbayar, Anda harus menginvestigasi mana yang paling sesuai dengan kebutuhan Anda sebelum membuat keputusan.

- [**Alchemy**](https://www.alchemy.com/)
  - [Dokumen](https://docs.alchemyapi.io/)
  - Fitur
    - Opsi layanan gratis
    - Skalakan saat Anda jalankan
    - Data arsip gratis
    - Peralatan analitik
    - Dasbor
    - Endpoint API yang unik
    - Webhook
    - Dukungan langsung
- [**Ankr**](https://www.ankr.com/)
  - [Dokumen](https://docs.ankr.com/)
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
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Dokumen](https://ubiquity.docs.blockdaemon.com/)
  - Keuntungan
    - Dasbor
    - Basis node satuan
    - Analitik
- [**Chainstack**](https://chainstack.com/)
  - [Dokumen](https://docs.chainstack.com/)
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
- [**GetBlock**](https://getblock.io/)
  - [Dokumen](https://getblock.io/docs/get-started/authentication-with-api-key/)
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
  - [Dokumen](https://infura.io/docs)
  - Fitur
    - Opsi layanan gratis
    - Skalakan saat Anda jalankan
    - Data arsip berbayar
    - Dukungan langsung
    - Dasbor
- [**Kaleido**](https://kaleido.io/)
  - [Dokumen](https://docs.kaleido.io/)
  - Fitur
    - Free startier tier
    - One-click Ethereum node deployment
    - Customizable clients and algorithms (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - 500+ administrative and service APIs
    - RESTful interface for Ethereum transaction submission (Apache Kafka backed)
    - Outbound streams for event delivery (Apache Kafka backed)
    - Deep collection of "off-chain" and ancillary services (e.g. bilateral encrypted messaging transport)
    - Straightforward network onboarding with governance and role-based access control
    - Sophisticated user management for both administrators and end users
    - Highly scalable, resilient, enterprise-grade infrastructure
    - Cloud HSM private key management
    - Ethereum Mainnet Tethering
    - ISO 27k and SOC 2, Type 2 certifications
    - Dynamic runtime configuration (e.g. adding cloud integrations, altering node ingresses, etc.)
    - Support for multi-cloud, multi-region and hybrid deployment orchestrations
    - Simple hourly SaaS-based pricing
    - SLAs and 24x7 support
- [**Moralis**](https://moralis.io/)
  - [Dokumen](https://docs.moralis.io/)
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
- [**Pocket Network**](https://www.pokt.network/)
  - [Dokumen](https://docs.pokt.network/home/)
  - Fitur
    - Protokol dan Pasar RPC terdesentralisasi
    - 1 Juta Permintaan Per Hari untuk Layanan Gratis (per titik akhir, maks. 2)
    - [Endpoint Publik](https://docs.pokt.network/developers/public-endpoints)
    - Pra-Penaruhan+ Program (jika Anda memerlukan lebih dari 1 Juta permintaan per hari)
    - Didukung 15+ Blockchain
    - 6400+ Node yang menghasilkan POKT untuk aplikasi layanan
    - Node Arsip, Node Arsip dengan Pelacakan dan Dukungan Node Testnet
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
- [**QuikNode**](https://www.quiknode.io/)
  - Fitur
    - 7 hari percobaan gratis
    - Dukungan beragam
    - Webhook
    - Dasbor
    - Analitik
- [**Rivet**](https://rivet.cloud/)
  - [Dokumen](https://rivet.readthedocs.io/en/latest/)
  - Fitur
    - Opsi layanan gratis
    - Skalakan saat Anda jalankan
- [**SettleMint**](https://console.settlemint.com/)
  - [Dokumen](https://docs.settlemint.com/)
  - Fitur
    - Uji coba gratis
    - Skalakan saat Anda jalankan
    - Dukungan GraphQL
    - Endpoint RPC dan WSS
    - Node penuh khusus
    - Bawa cloud Anda
    - Peralatan analitik
    - Dasbor
    - Bayar harga per jam
    - Dukungan langsung
- [**Watchdata**](https://watchdata.io/)
  - [Dokumen](https://docs.watchdata.io/)
  - Fitur
    - Data reliability
    - Uninterrupted connection with no downtime
    - Process automation
    - Free tariffs
    - High limits that suit any user
    - Support for various nodes
    - Resource scaling
    - High processing speeds

## Bacaan lebih lanjut {#further-reading}

- [Daftar layanan node Ethereum](https://ethereumnodes.com/)

## Topik terkait {#related-topics}

- [Node dan klien](/developers/docs/nodes-and-clients/)

## Tutorial terkait {#related-tutorials}

- [Memulai pengembangan Ethereum menggunakan Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Panduan untuk mengirim transaksi menggunakan web3 dan Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
