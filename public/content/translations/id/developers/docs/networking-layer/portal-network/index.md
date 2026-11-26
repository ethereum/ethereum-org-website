---
title: Portal Network
description: Gambaran umum tentang Portal Network, sebuah jaringan peer-to-peer yang menjaga riwayat Ethereum tetap tersedia saat klien berhenti menyimpan semuanya.
lang: id
---

[Ethereum](/) adalah jaringan yang terdiri dari komputer-komputer yang menjalankan perangkat lunak klien Ethereum. Masing-masing komputer ini disebut 'node'. Perangkat lunak klien memungkinkan node untuk mengirim dan menerima data di jaringan Ethereum, dan memverifikasi data terhadap aturan protokol Ethereum. Node menyimpan banyak data historis di penyimpanan disk mereka dan menambahkannya ketika mereka menerima paket informasi baru, yang dikenal sebagai blok, dari node lain di jaringan. Hal ini diperlukan untuk selalu memeriksa bahwa sebuah node memiliki informasi yang konsisten dengan bagian jaringan lainnya. Ini berarti menjalankan node dapat membutuhkan banyak ruang disk. Beberapa operasi node juga dapat membutuhkan banyak RAM.

Klien eksekusi tidak lagi harus menyimpan semua data tersebut. Sejak Juli 2025 mereka dapat membuang badan dan tanda terima blok dari sebelum [The Merge](/roadmap/merge/), dan peta jalan Ethereum mencakup membuang lebih banyak riwayat rantai seiring berjalannya waktu. Riwayat tersebut tetap harus tersedia bagi siapa saja yang membutuhkannya, seperti penjelajah blok, pengindeks, atau dompet yang mencari transaksi lama.

Portal Network menjaga riwayat ini tetap tersedia dengan membagikannya dalam potongan-potongan kecil ke banyak node. Tidak ada node yang harus menyimpan semuanya, dan sebuah node dapat mengambil potongan apa pun dan memeriksanya terhadap data yang sudah disimpannya, tanpa harus memercayai node yang mengirimkannya.

Lebih lanjut tentang [node dan klien](/developers/docs/nodes-and-clients/)

## Mengapa kita membutuhkan Portal Network {#why-do-we-need-portal-network}

Node Ethereum menyimpan salinan penuh atau sebagian dari rantai blok Ethereum mereka sendiri. Salinan lokal ini digunakan untuk memvalidasi transaksi dan memastikan node mengikuti rantai yang benar. Data yang disimpan secara lokal ini memungkinkan node untuk memverifikasi secara independen bahwa data yang masuk adalah valid dan benar tanpa perlu memercayai entitas lain.

Salinan lokal dari rantai blok dan data state serta tanda terima terkait ini memakan banyak ruang di hard disk node. Sebagai contoh, SSD 4TB direkomendasikan untuk menjalankan node menggunakan [Geth](https://geth.ethereum.org) yang dipasangkan dengan klien konsensus. Dengan riwayat rantai penuh, Geth menempati lebih dari 1,8TB ruang disk (per September 2026), dan itu terus bertambah seiring dengan rantai.

Ini berarti menjalankan node bisa menjadi mahal, karena sejumlah besar ruang disk harus didedikasikan untuk Ethereum. [Kedaluwarsa riwayat](/roadmap/statelessness/#history-expiry) menguranginya dengan membiarkan klien menghapus data blok lama yang tidak mereka perlukan untuk mengikuti rantai: sejak [kedaluwarsa riwayat sebagian](https://blog.ethereum.org/2025/07/08/partial-history-exp) pada Juli 2025, klien eksekusi dapat membuang badan dan tanda terima dari setiap blok sebelum The Merge. [Kedaluwarsa state](/roadmap/statelessness/#state-expiry) dan [ketiadaan state](/roadmap/statelessness/) adalah solusi lebih lanjut yang masih diteliti.

Setelah node berhenti menyimpan riwayat lama, mereka tidak dapat lagi menyajikannya kepada orang lain. Arsip, torrent, dan penyedia menyimpan salinannya; Portal Network menyebarkannya ke banyak node, sehingga tetap tersedia tanpa bergantung pada salah satu dari mereka.

## Bagaimana cara kerja Portal Network? {#how-does-portal-network-work}

Node Ethereum memiliki protokol ketat yang menentukan bagaimana mereka berkomunikasi satu sama lain. Klien eksekusi berkomunikasi menggunakan serangkaian subprotokol yang dikenal sebagai [devp2p](/developers/docs/networking-layer/#devp2p), sementara klien konsensus menggunakan tumpukan subprotokol berbeda yang disebut [libp2p](/developers/docs/networking-layer/#libp2p). devp2p memungkinkan sebuah node meminta badan blok dan tanda terima dari peer-nya, tetapi peer yang telah membuang riwayat lama tidak dapat menyajikannya. Aplikasi dan dompet juga bisa mendapatkan data dari node melalui [Antarmuka Pemrograman Aplikasi (API) JSON-RPC](/developers/docs/apis/json-rpc/), tetapi itu bergantung pada satu node atau penyedia yang menyimpan data dan memercayainya untuk jujur.

Portal Network adalah jaringan peer-to-peer terpisah yang dibangun untuk berbagi riwayat. Ini berjalan pada [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md), protokol penemuan node yang juga digunakan klien konsensus untuk menemukan peer, dan mengatur node-nodenya sebagai [tabel hash terdistribusi (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table), mirip dengan BitTorrent. Setiap node memiliki ID node, dan setiap bagian konten, seperti tanda terima dari satu blok, memiliki ID konten di ruang ID yang sama, yang diturunkan dari nomor bloknya. Setiap node menyimpan konten yang ID-nya paling dekat dengan ID-nya sendiri, hingga jarak yang dipilihnya, yang disebut radiusnya. Untuk mengambil sebuah konten, sebuah node bertanya kepada peer yang diketahuinya yang paling dekat dengan ID konten tersebut. Peer yang tidak memilikinya akan menjawab dengan node yang lebih dekat lagi, hingga permintaan tersebut mencapai node yang menyimpannya.

<PortalHistoryDiagram />

Sebuah node tidak pernah harus memercayai data yang diterimanya. Node menyimpan setiap header blok, dan setiap header berkomitmen pada transaksi dan tanda terima bloknya melalui akar (root) seperti `transactionsRoot` dan `receiptsRoot`. Node memeriksa badan blok atau tanda terima blok terhadap akar-akar tersebut sebelum menggunakannya.

### Portal Network {#the-portal-networks}

Portal Network pertama kali dirancang sebagai beberapa subjaringan yang akan memungkinkan klien ringan mengikuti rantai tanpa memercayai full node: jaringan klien ringan Rantai suar, jaringan state, jaringan gosip transaksi, dan jaringan riwayat. Pada tahun 2025, spesifikasi dari semuanya kecuali satu dipindahkan ke versi lama (legacy), dan pengembangan kini berfokus pada **jaringan Riwayat**, yang menyimpan badan dan tanda terima dari blok-blok masa lalu untuk klien eksekusi yang menyimpan setiap header blok tetapi telah membuang sisa riwayatnya.

## Klien Portal Network {#client-diversity-as-default}

Beberapa tim membangun klien Portal Network:

- [Klien Nimbus Portal](https://fluffy.guide) (sebelumnya Fluffy): ditulis dalam Nim, dan satu-satunya yang masih dalam pengembangan aktif
- [Trin](https://github.com/ethereum/trin): ditulis dalam Rust, tidak lagi dipelihara
- [Ultralight](https://github.com/ethereumjs/ultralight): ditulis dalam TypeScript, tanpa pembaruan sejak pertengahan 2025
- [Shisui](https://github.com/zen-eth/shisui): ditulis dalam Go, tanpa pembaruan sejak pertengahan 2025

## Bacaan lebih lanjut {#further-reading}

- [Spesifikasi Portal Network](https://github.com/ethereum/portal-network-specs)
- [Menggunakan protokol Portal Network untuk kedaluwarsa riwayat](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Kedaluwarsa riwayat sebagian](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [Portal Network (Piper Merriam di Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [Discord Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Situs web Portal Network](https://www.ethportal.net/)
