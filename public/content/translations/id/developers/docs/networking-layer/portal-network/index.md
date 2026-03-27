---
title: Jaringan Portal
description: Gambaran umum tentang Jaringan Portal - jaringan dalam tahap pengembangan yang dirancang untuk mendukung klien dengan sumber daya rendah.
lang: id
---

[Ethereum](/) adalah jaringan yang terdiri dari komputer-komputer yang menjalankan perangkat lunak klien Ethereum. Setiap komputer ini disebut 'node'. Perangkat lunak klien memungkinkan node untuk mengirim dan menerima data di jaringan Ethereum, dan memverifikasi data terhadap aturan protokol Ethereum. Node menyimpan banyak data historis di penyimpanan disk mereka dan menambahkannya ketika mereka menerima paket informasi baru, yang dikenal sebagai blok, dari node lain di jaringan. Hal ini diperlukan untuk selalu memeriksa bahwa sebuah node memiliki informasi yang konsisten dengan bagian jaringan lainnya. Ini berarti menjalankan node dapat membutuhkan banyak ruang disk. Beberapa operasi node juga dapat membutuhkan banyak RAM.

Untuk mengatasi masalah penyimpanan disk ini, node 'ringan' telah dikembangkan yang meminta informasi dari node penuh alih-alih menyimpan semuanya sendiri. Namun, ini berarti node ringan tidak memverifikasi informasi secara independen dan malah mempercayai node lain. Ini juga berarti bahwa node penuh diharuskan untuk mengambil pekerjaan ekstra untuk melayani node ringan tersebut.

Jaringan Portal adalah desain jaringan baru untuk Ethereum yang bertujuan untuk memecahkan masalah ketersediaan data untuk node "ringan" tanpa harus mempercayai atau memberikan beban ekstra pada node penuh, dengan membagikan data yang diperlukan dalam potongan-potongan kecil di seluruh jaringan.

Lebih lanjut tentang [node dan klien](/developers/docs/nodes-and-clients/)

## Mengapa kita membutuhkan Jaringan Portal {#why-do-we-need-portal-network}

Node Ethereum menyimpan salinan penuh atau sebagian dari blockchain Ethereum mereka sendiri. Salinan lokal ini digunakan untuk memvalidasi transaksi dan memastikan node mengikuti rantai yang benar. Data yang disimpan secara lokal ini memungkinkan node untuk memverifikasi secara independen bahwa data yang masuk adalah valid dan benar tanpa perlu mempercayai entitas lain.

Salinan lokal dari blockchain dan data status serta tanda terima terkait ini memakan banyak ruang di hard disk node. Misalnya, hard disk 2TB direkomendasikan untuk menjalankan node menggunakan [Geth](https://geth.ethereum.org) yang dipasangkan dengan klien konsensus. Menggunakan sinkronisasi snap, yang hanya menyimpan data rantai dari sekumpulan blok yang relatif baru, Geth biasanya menempati sekitar 650GB ruang disk tetapi tumbuh sekitar 14GB/minggu (Anda dapat memangkas node kembali ke 650GB secara berkala).

Ini berarti menjalankan node bisa menjadi mahal, karena sejumlah besar ruang disk harus didedikasikan untuk Ethereum. Ada beberapa solusi untuk masalah ini di peta jalan Ethereum, termasuk [kedaluwarsa riwayat](/roadmap/statelessness/#history-expiry), [kedaluwarsa status](/roadmap/statelessness/#state-expiry) dan [tanpa status](/roadmap/statelessness/). Namun, ini kemungkinan masih beberapa tahun lagi untuk diimplementasikan. Ada juga [node ringan](/developers/docs/nodes-and-clients/light-clients/) yang tidak menyimpan salinan data rantai mereka sendiri, mereka meminta data yang mereka butuhkan dari node penuh. Namun, ini berarti node ringan harus mempercayai node penuh untuk memberikan data yang jujur dan juga membebani node penuh yang harus melayani data yang dibutuhkan node ringan.

Jaringan Portal bertujuan untuk menyediakan cara alternatif bagi node ringan untuk mendapatkan data mereka yang tidak memerlukan kepercayaan atau menambah secara signifikan pekerjaan yang harus dilakukan oleh node penuh. Cara ini akan dilakukan dengan memperkenalkan cara baru bagi node Ethereum untuk berbagi data di seluruh jaringan.

## Bagaimana cara kerja Jaringan Portal? {#how-does-portal-network-work}

Node Ethereum memiliki protokol ketat yang menentukan bagaimana mereka berkomunikasi satu sama lain. Klien eksekusi berkomunikasi menggunakan serangkaian subprotokol yang dikenal sebagai [DevP2P](/developers/docs/networking-layer/#devp2p), sementara klien konsensus menggunakan tumpukan subprotokol berbeda yang disebut [libP2P](/developers/docs/networking-layer/#libp2p). Ini menentukan jenis data yang dapat diteruskan antar node.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

Node juga dapat menyajikan data spesifik melalui [JSON-RPC API](/developers/docs/apis/json-rpc/), yang merupakan cara aplikasi dan dompet bertukar informasi dengan node Ethereum. Namun, tidak satu pun dari ini merupakan protokol yang ideal untuk menyajikan data ke klien ringan.

Klien ringan saat ini tidak dapat meminta potongan data rantai spesifik melalui DevP2P atau libP2p karena protokol tersebut hanya dirancang untuk memungkinkan sinkronisasi rantai dan penyebaran blok dan transaksi. Klien ringan tidak ingin mengunduh informasi ini karena itu akan menghentikan mereka dari menjadi "ringan".

JSON-RPC API juga bukan pilihan ideal untuk permintaan data klien ringan, karena bergantung pada koneksi ke node penuh tertentu atau penyedia RPC terpusat yang dapat menyajikan data. Ini berarti klien ringan harus mempercayai node/penyedia tertentu tersebut untuk jujur, dan juga node penuh mungkin harus menangani banyak permintaan dari banyak klien ringan, menambah kebutuhan bandwidth mereka.

Inti dari Jaringan Portal adalah untuk memikirkan kembali seluruh desain, membangun secara khusus untuk keringanan, di luar batasan desain klien Ethereum yang ada.

Ide inti dari Jaringan Portal adalah mengambil bagian terbaik dari tumpukan jaringan saat ini dengan memungkinkan informasi yang dibutuhkan oleh klien ringan, seperti data historis dan identitas kepala rantai saat ini untuk disajikan melalui jaringan desentralisasi peer-to-peer bergaya DevP2P yang ringan menggunakan [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (mirip dengan Bittorrent).

Idenya adalah untuk menambahkan bagian-bagian kecil dari total data historis Ethereum dan beberapa tanggung jawab node spesifik ke setiap node. Kemudian, permintaan dilayani dengan mencari node yang menyimpan data spesifik yang diminta dan mengambilnya dari mereka.

Ini membalikkan model normal dari node ringan yang menemukan satu node dan meminta mereka untuk memfilter dan menyajikan volume data yang besar; sebaliknya, mereka dengan cepat memfilter jaringan node yang besar yang masing-masing menangani sejumlah kecil data.

Tujuannya adalah untuk memungkinkan jaringan desentralisasi dari klien Portal yang ringan untuk:

- melacak kepala rantai
- menyinkronkan data rantai terbaru dan historis
- mengambil data status
- menyiarkan transaksi
- mengeksekusi transaksi menggunakan [Mesin Virtual Ethereum](/developers/docs/evm/)

Manfaat dari desain jaringan ini adalah:

- mengurangi ketergantungan pada penyedia terpusat
- Mengurangi penggunaan bandwidth Internet
- Sinkronisasi yang diminimalkan atau nol
- Dapat diakses oleh perangkat dengan sumber daya terbatas (\<1 GB RAM, \<100 MB ruang disk, 1 CPU)

Tabel di bawah ini menunjukkan fungsi klien yang ada yang dapat disampaikan oleh Jaringan Portal, memungkinkan pengguna untuk mengakses fungsi-fungsi ini pada perangkat dengan sumber daya yang sangat rendah.

### Jaringan Portal

| Klien ringan beacon | Jaringan status              | Gosip transaksi     | Jaringan riwayat |
| ------------------- | ---------------------------- | ------------------- | --------------- |
| Ringan beacon chain | Penyimpanan akun dan kontrak | Mempool ringan      | Header          |
| Data protokol       |                              |                     | Badan blok      |
|                     |                              |                     | Tanda terima    |

## Keragaman klien secara default {#client-diversity-as-default}

Pengembang Jaringan Portal juga membuat pilihan desain untuk membangun empat klien Jaringan Portal yang terpisah sejak hari pertama.

Klien Jaringan Portal adalah:

- [Trin](https://github.com/ethereum/trin): ditulis dalam Rust
- [Fluffy](https://fluffy.guide): ditulis dalam Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): ditulis dalam Typescript
- [Shisui](https://github.com/zen-eth/shisui): ditulis dalam Go

Memiliki beberapa implementasi klien independen meningkatkan ketahanan dan desentralisasi jaringan Ethereum.

Jika satu klien mengalami masalah atau kerentanan, klien lain dapat terus beroperasi dengan lancar, mencegah titik kegagalan tunggal. Selain itu, implementasi klien yang beragam mendorong inovasi dan persaingan, mendorong peningkatan dan mengurangi risiko monokultur dalam ekosistem.

## Bacaan lebih lanjut {#further-reading}

- [Jaringan Portal (Piper Merriam di Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord Jaringan Portal](https://discord.gg/CFFnmE7Hbs)
- [Situs web Jaringan Portal](https://www.ethportal.net/)