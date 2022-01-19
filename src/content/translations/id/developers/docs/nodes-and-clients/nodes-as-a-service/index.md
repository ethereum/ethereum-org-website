---
title: Node sebagai layanan
description: Gambaran umum tingkat pemula tentang layanan node, pro dan kontranya, serta penyedia populer.
lang: id
sidebar: true
sidebarDepth: 2
---

## Pendahuluan {#Introduction}

Menjalankan [node Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) milik Anda bisa sangat sulit, khususnya pada proses awal atau saat melakukan penskalaan dengan cepat. Ada [sejumlah layanan](#popular-node-services) yang menjalankan infrastruktur node yang dioptimalkan untuk Anda, sehingga Anda dapat fokus pada pengembangan aplikasi atau produk. Kami akan menjelaskan bagaimana cara kerja layanan node, pro dan kotra dalam penggunaannya, dan daftar penyedia jika Anda tertarik untuk memulainya.

## Prasyarat {#prerequisites}

Jika Anda belum memahami apa itu node dan klien, bacalah tentang [Node dan klien](/developers/docs/nodes-and-clients/).

## Bagaimana cara kerja layanan node? {#how-do-node-services-work}

Penyedia layanan node menjalankan klien node terdistribusi di belakang layar untuk Anda, sehingga Anda tidak perlu melakukannya sendiri.

Layanan ini umumnya menyediakan kunci API yang bisa Anda gunakan untuk menulis pada dan membaca dari blockchain. Layanan ini sering mencakup akses ke [testnet Ethereum](/developers/docs/networks/#testnets) sebagai tambahan pada Jaringan Utama.

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
  - [Dokumentasi](https://docs.alchemyapi.io/)
  - Fitur
    - Opsi layanan gratis
    - Skalakan saat Anda jalankan
    - Data arsip gratis
    - Peralatan analitik
    - Dasbor
    - Endpoint API yang unik
    - Webhook
    - Dukungan langsung
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Dokumentasi](https://ubiquity.docs.blockdaemon.com/)
  - Keuntungan
    - Dasbor
    - Basis node satuan
    - Analitik
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
- [**GetBlock**](https://getblock.io/)
  - [Dokumentasi](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Fitur
    - Akses ke 40+ node blockchain
    - 40rb permintaan harian gratis
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
    - Akses ke 50+ node blockchain
- [**Infura**](https://infura.io/)
  - [Dokumentasi](https://infura.io/docs)
  - Fitur
    - Opsi layanan gratis
    - Skalakan saat Anda jalankan
    - Data arsip berbayar
    - Dukungan langsung
    - Dasbor
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
- [**Pocket Network**](https://www.pokt.network/)
  - [Dokumentasi](https://docs.pokt.network/home/)
  - Fitur
    - Protokol dan Pasar RPC terdesentralisasi
    - 1 JT Permintaan Per Hari untuk Layanan Gratis (per titik akhir, maks. 2)
    - [Endpoint Publik](https://docs.pokt.network/home/resources/public-rpc-endpoints)
    - Pra-Penaruhan+ Program (jika Anda memerlukan lebih dari 1JT permintaan per hari)
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
  - [Dokumentasi](https://rivet.readthedocs.io/en/latest/)
  - Fitur
    - Opsi layanan gratis
    - Skalakan saat Anda jalankan

## Bacaan lebih lanjut {#further-reading}

- [Daftar layanan node Ethereum](https://ethereumnodes.com/)

## Topik terkait {#related-topics}

- [Node dan klien](/developers/docs/nodes-and-clients/)

## Tutorial terkait {#related-tutorials}

- [Memulai pengembangan Ethereum menggunakan Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Panduan untuk mengirim transaksi menggunakan web3 dan Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
