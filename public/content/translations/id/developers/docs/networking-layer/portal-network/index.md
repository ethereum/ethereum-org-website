---
title: Jaringan Portal
description: "Gambaran umum tentang Portal Network – sebuah jaringan yang sedang dikembangkan untuk mendukung klien dengan sumber daya terbatas."
lang: id
---

Ethereum adalah sebuah jaringan yang terdiri dari komputer-komputer yang menjalankan perangkat lunak klien Ethereum. Masing-masing komputer ini disebut 'node'. Perangkat lunak klien memungkinkan sebuah node untuk mengirim dan menerima data di jaringan Ethereum, serta memverifikasi data sesuai dengan aturan protokol Ethereum. Node menyimpan banyak data historis di penyimpanan disknya dan menambahkannya ketika mereka menerima paket informasi baru, yang dikenal sebagai blok, dari node lain di jaringan. Hal ini diperlukan untuk selalu memastikan bahwa sebuah node memiliki informasi yang konsisten dengan jaringan lainnya. Ini berarti menjalankan node membutuhkan banyak ruang disk. Beberapa operasi node dapat membutuhkan banyak RAM juga.

Untuk mengatasi masalah penyimpanan disk ini, node 'ringan' telah dikembangkan yang meminta informasi dari node penuh alih-alih menyimpannya sendiri. Namun, ini berarti node ringan tidak memverifikasi informasi secara independen dan malah mempercayai node lain sebagai gantinya. Ini juga berarti bahwa node penuh diharuskan melakukan pekerjaan lebih untuk melayani node ringan tersebut.

Portal Network adalah desain jaringan baru untuk Ethereum yang bertujuan untuk memecahkan masalah ketersediaan data untuk node "ringan" tanpa harus mempercayai atau menambah beban pada node penuh, dengan berbagi data yang diperlukan dalam potongan kecil di seluruh jaringan.

Selengkapnya tentang [simpul dan klien](/developers/docs/nodes-and-clients/)

## Mengapa kita membutuhkan Jaringan Portal {#why-do-we-need-portal-network}

Node Ethereum menyimpan salinan penuh atau sebagian dari blockchain Ethereum. Salinan lokal ini digunakan untuk memvalidasi transaksi dan memastikan node mengikuti chain yang benar. This locally stored data enables nodes to independently verify the validity of incoming information without having to place trust in any other party.

Salinan lokal dari blockchain dan data status, dan data tanda terima yang terkait ini memakan banyak ruang pada hard disk node. Sebagai contoh, hard disk 2TB direkomendasikan untuk menjalankan sebuah simpul menggunakan [Geth](https://geth.ethereum.org) yang dipasangkan ke klien konsensus. Dengan menggunakan snap sync, yang hanya menyimpan data rantai dari sejumlah blok terbaru, Geth biasanya memakan sekitar 650GB ruang penyimpanan, tetapi bertambah sekitar 14GB per minggu (Anda bisa memangkas node kembali ke 650GB secara berkala).

Ini berarti menjalankan node bisa menjadi mahal, karena harus menyediakan ruang penyimpanan yang besar khusus untuk Ethereum. Ada beberapa solusi untuk masalah ini di peta perjalanan Ethereum, termasuk [kedaluwarsa riwayat](/roadmap/statelessness/#history-expiry), [kedaluwarsa state](/roadmap/statelessness/#state-expiry) dan [statelessness](/roadmap/statelessness/). Namun, hal ini mungkin masih beberapa tahun lagi untuk dapat diimplementasikan. Ada juga [simpul ringan](/developers/docs/nodes-and-clients/light-clients/) yang tidak menyimpan salinan data chain mereka sendiri, mereka meminta data yang mereka butuhkan dari simpul penuh. Namun, ini berarti light node harus mempercayai full node untuk menyediakan data yang jujur, dan juga membebani full node yang harus melayani data yang dibutuhkan light node.

Portal Network bertujuan menyediakan cara alternatif bagi light node untuk mendapatkan data mereka tanpa harus bergantung pada kepercayaan atau menambah beban signifikan pada pekerjaan yang harus dilakukan full node. Hal ini akan dilakukan dengan memperkenalkan cara baru bagi node Ethereum untuk berbagi data di seluruh jaringan.

## Bagaimana cara kerja Jaringan Portal? {#how-does-portal-network-work}

Node Ethereum memiliki protokol ketat yang menentukan bagaimana mereka berkomunikasi satu sama lain. Klien eksekusi berkomunikasi menggunakan serangkaian subprotokol yang dikenal sebagai [DevP2P](/developers/docs/networking-layer/#devp2p), sementara klien konsensus menggunakan tumpukan subprotokol yang berbeda yang disebut [libP2P](/developers/docs/networking-layer/#libp2p). Ini menentukan tipe data yang dapat diteruskan di antara node.

![devP2P dan libP2P](portal-network-devp2p-libp2p.png)

Simpul juga dapat menyajikan data tertentu melalui [API JSON-RPC](/developers/docs/apis/json-rpc/), yang merupakan cara aplikasi dan dompet menukar informasi dengan simpul Ethereum. Namun, tidak satu pun dari protokol ini yang ideal untuk menyajikan data ke klien ringan.

Saat ini klien ringan tidak dapat meminta potongan data rantai tertentu melalui DevP2P atau libP2P karena protokol tersebut hanya dirancang untuk memungkinkan sinkronisasi rantai serta penyebaran gossiping blok dan transaksi. Klien ringan tidak ingin mengunduh informasi ini karena hal itu akan menghentikan mereka dari menjadi "ringan".

JSON-RPC API juga bukan pilihan yang ideal untuk permintaan data klien ringan, karena bergantung pada koneksi ke node penuh tertentu atau penyedia RPC terpusat yang dapat menyajikan data tersebut. Ini berarti klien ringan harus mempercayai node/penyedia tertentu agar jujur, dan juga node penuh mungkin harus menangani banyak permintaan dari banyak klien ringan, yang menambah beban kebutuhan bandwidth mereka.

Tujuan dari Portal Network adalah merancang ulang keseluruhan desain, yang dibangun secara khusus untuk keringanan, di luar batasan desain klien Ethereum yang sudah ada.

Gagasan inti dari Jaringan Portal adalah mengambil bagian terbaik dari tumpukan jaringan saat ini dengan memungkinkan informasi yang dibutuhkan oleh klien ringan, seperti data historis dan identitas kepala rantai saat ini, untuk disajikan melalui jaringan peer-to-peer terdesentralisasi bergaya DevP2P yang ringan menggunakan [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (mirip dengan Bittorrent).

Idenya adalah menambahkan sebagian kecil dari total data historis Ethereum dan beberapa tanggung jawab node tertentu ke setiap node. Kemudian, permintaan dilayani dengan mencari node yang menyimpan data spesifik yang diminta dan mengambilnya dari mereka.

Hal ini membalik model normal di mana light node mencari satu node dan memintanya untuk memfilter serta menyajikan data dalam jumlah besar; sebagai gantinya, mereka dengan cepat memfilter jaringan node yang luas, di mana masing-masing hanya menangani sejumlah kecil data.

Tujuannya adalah untuk memungkinkan jaringan terdesentralisasi dari klien Portal ringan untuk:

- melacak kepala chain
- sinkronisasi data chain terbaru dan historis
- mengambil data status
- menyiarkan transaksi
- menjalankan transaksi menggunakan [EVM](/developers/docs/evm/)

Manfaat dari desain jaringan ini adalah:

- mengurangi ketergantungan pada penyedia layanan terpusat
- Mengurangi penggunaan bandwidth Internet
- Sinkronisasi yang diminimalkan atau nol
- Dapat diakses oleh perangkat dengan sumber daya terbatas (<1 GB RAM, <100 MB ruang disk, 1 CPU)

Tabel di bawah ini menunjukkan fungsi-fungsi dari klien yang ada yang dapat disediakan oleh Jaringan Portal, yang memungkinkan pengguna untuk mengakses fungsi-fungsi ini pada perangkat dengan sumber daya sangat rendah.

### Jaringan portal

| Klien beacon light | Jaringan negara              | Gosip transaksi     | Jaringan sejarah |
| ------------------ | ---------------------------- | ------------------- | ---------------- |
| Rantai suar ringan | Penyimpanan akun dan kontrak | Kolam memori ringan | Header           |
| Data protokol      |                              |                     | Badan blok       |
|                    |                              |                     | Tanda terima     |

## Keberagaman klien secara default {#client-diversity-as-default}

Para pengembang Jaringan Portal juga membuat pilihan desain untuk membangun empat klien Jaringan Portal yang terpisah sejak hari pertama.

Klien Jaringan Portal adalah:

- [Trin](https://github.com/ethereum/trin): ditulis dengan Rust
- [Fluffy](https://fluffy.guide): ditulis dengan Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): ditulis dengan Typescript
- [Shisui](https://github.com/zen-eth/shisui): ditulis dengan Go

Memiliki beberapa implementasi klien independen meningkatkan ketahanan dan desentralisasi jaringan Ethereum.

Jika satu klien mengalami masalah atau kerentanan, klien lain dapat terus beroperasi dengan lancar, sehingga mencegah terjadinya titik kegagalan tunggal. Selain itu, keberagaman implementasi klien mendorong inovasi dan persaingan, sehingga memacu peningkatan serta mengurangi risiko monokultur dalam ekosistem.

## Bacaan lebih lanjut {#further-reading}

- [Jaringan Portal (Piper Merriam di Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord Jaringan Portal](https://discord.gg/CFFnmE7Hbs)
- [Situs web Jaringan Portal](https://www.ethportal.net/)
