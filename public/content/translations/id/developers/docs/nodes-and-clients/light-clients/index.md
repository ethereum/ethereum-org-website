---
title: Klien ringan
description: Pengantar tentang klien ringan Ethereum.
lang: id
---

Menjalankan full node adalah cara yang paling minim kepercayaan (trustless), privat, terdesentralisasi, dan tahan sensor untuk berinteraksi dengan [Ethereum](/). Dengan full node, Anda menyimpan salinan blockchain Anda sendiri yang dapat Anda kueri secara instan dan Anda mendapatkan akses langsung ke jaringan peer-to-peer Ethereum. Namun, menjalankan full node membutuhkan jumlah memori, penyimpanan, dan CPU yang signifikan. Ini berarti tidak layak bagi semua orang untuk menjalankan node mereka sendiri. Ada beberapa solusi untuk ini di peta jalan Ethereum, termasuk statelessness (tanpa status), tetapi masih butuh beberapa tahun lagi untuk diimplementasikan. Jawaban dalam jangka pendek adalah mengorbankan beberapa manfaat menjalankan full node untuk peningkatan kinerja besar yang memungkinkan node berjalan dengan persyaratan perangkat keras yang sangat rendah. Node yang melakukan pertukaran ini dikenal sebagai light node (node ringan).

## Apa itu klien ringan {#what-is-a-light-client}

Light node adalah node yang menjalankan perangkat lunak klien ringan. Alih-alih menyimpan salinan lokal dari data blockchain dan memverifikasi semua perubahan secara independen, mereka meminta data yang diperlukan dari suatu penyedia. Penyedia tersebut mungkin merupakan koneksi langsung ke full node atau melalui beberapa server RPC terpusat. Data tersebut kemudian diverifikasi oleh light node, memungkinkannya untuk mengikuti bagian terdepan (head) dari rantai. Light node hanya memproses header blok, dan hanya sesekali mengunduh konten blok yang sebenarnya. Node dapat bervariasi dalam tingkat keringanannya, tergantung pada kombinasi perangkat lunak klien ringan dan penuh yang mereka jalankan. Misalnya, konfigurasi paling ringan adalah menjalankan klien eksekusi ringan dan klien konsensus ringan. Ada kemungkinan juga bahwa banyak node akan memilih untuk menjalankan klien konsensus ringan dengan klien eksekusi penuh, atau sebaliknya.

## Bagaimana cara kerja klien ringan? {#how-do-light-clients-work}

Ketika Ethereum mulai menggunakan mekanisme konsensus berbasis proof-of-stake, infrastruktur baru diperkenalkan secara khusus untuk mendukung klien ringan. Cara kerjanya adalah dengan memilih secara acak subset dari 512 validator setiap 1,1 hari untuk bertindak sebagai **komite sinkronisasi (sync committee)**. Komite sinkronisasi menandatangani header dari blok-blok terbaru. Setiap header blok berisi tanda tangan gabungan dari validator di komite sinkronisasi dan "bitfield" yang menunjukkan validator mana yang menandatangani dan mana yang tidak. Setiap header juga menyertakan daftar validator yang diharapkan untuk berpartisipasi dalam menandatangani blok berikutnya. Ini berarti klien ringan dapat dengan cepat melihat bahwa komite sinkronisasi telah menandatangani data yang mereka terima, dan mereka juga dapat memeriksa bahwa komite sinkronisasi tersebut asli dengan membandingkan yang mereka terima dengan yang diharapkan pada blok sebelumnya. Dengan cara ini, klien ringan dapat terus memperbarui pengetahuannya tentang blok Ethereum terbaru tanpa benar-benar mengunduh blok itu sendiri, hanya header yang berisi informasi ringkasan.

Pada lapisan eksekusi tidak ada spesifikasi tunggal untuk klien eksekusi ringan. Cakupan klien eksekusi ringan dapat bervariasi dari "mode ringan" dari klien eksekusi penuh yang memiliki semua fungsionalitas EVM dan jaringan dari full node tetapi hanya memverifikasi header blok, tanpa mengunduh data terkait, atau bisa juga berupa klien yang lebih disederhanakan yang sangat bergantung pada penerusan permintaan ke penyedia RPC untuk berinteraksi dengan Ethereum.

## Mengapa klien ringan penting? {#why-are-light-clients-important}

Klien ringan penting karena mereka memungkinkan pengguna untuk memverifikasi data yang masuk daripada mempercayai secara buta bahwa penyedia data mereka benar dan jujur, sambil hanya menggunakan sebagian kecil dari sumber daya komputasi dari full node. Data yang diterima klien ringan dapat diperiksa terhadap header blok yang mereka ketahui telah ditandatangani oleh setidaknya 2/3 dari kumpulan acak 512 validator Ethereum. Ini adalah bukti yang sangat kuat bahwa data tersebut benar.

Klien ringan hanya menggunakan sejumlah kecil daya komputasi, memori, dan penyimpanan sehingga dapat dijalankan di ponsel, disematkan dalam aplikasi, atau sebagai bagian dari peramban (browser). Klien ringan adalah cara untuk membuat akses yang minim kepercayaan ke Ethereum menjadi semudah mempercayai penyedia pihak ketiga.

Mari kita ambil contoh sederhana. Bayangkan Anda ingin memeriksa saldo akun Anda. Untuk melakukan ini, Anda harus membuat permintaan ke node Ethereum. Node tersebut akan memeriksa salinan lokal dari status Ethereum untuk saldo Anda dan mengembalikannya kepada Anda. Jika Anda tidak memiliki akses langsung ke node, ada operator terpusat yang menyediakan data ini sebagai layanan. Anda dapat mengirim permintaan kepada mereka, mereka memeriksa node mereka, dan mengirimkan hasilnya kembali kepada Anda. Masalahnya adalah Anda kemudian harus mempercayai penyedia tersebut untuk memberikan informasi yang benar. Anda tidak akan pernah benar-benar tahu bahwa informasi tersebut benar jika Anda tidak dapat memverifikasinya sendiri.

Klien ringan mengatasi masalah ini. Anda masih meminta data dari beberapa penyedia eksternal, tetapi ketika Anda menerima data kembali, data tersebut dilengkapi dengan bukti yang dapat diperiksa oleh light node Anda terhadap informasi yang diterimanya di header blok. Ini berarti Ethereum memverifikasi kebenaran data Anda alih-alih operator tepercaya.

## Inovasi apa yang dimungkinkan oleh klien ringan? {#what-innovations-do-light-clients-enable}

Manfaat utama dari klien ringan adalah memungkinkan lebih banyak orang untuk mengakses Ethereum secara independen dengan persyaratan perangkat keras yang dapat diabaikan dan ketergantungan minimal pada pihak ketiga. Ini baik untuk pengguna karena mereka dapat memverifikasi data mereka sendiri dan ini baik untuk jaringan karena meningkatkan jumlah dan keragaman node yang memverifikasi rantai.

Kemampuan untuk menjalankan node Ethereum pada perangkat dengan penyimpanan, memori, dan daya pemrosesan yang sangat kecil adalah salah satu area inovasi utama yang dibuka oleh klien ringan. Padahal saat ini node Ethereum membutuhkan banyak sumber daya komputasi, klien ringan dapat disematkan ke dalam peramban, dijalankan di ponsel, dan mungkin perangkat yang lebih kecil seperti jam tangan pintar. Ini berarti dompet Ethereum dengan klien yang disematkan dapat berjalan di ponsel. Ini berarti dompet seluler bisa jauh lebih terdesentralisasi karena mereka tidak perlu mempercayai penyedia data terpusat untuk data mereka.

Perluasan dari hal ini adalah mengaktifkan perangkat **internet of things (IoT)**. Klien ringan dapat digunakan untuk dengan cepat membuktikan kepemilikan beberapa saldo token atau NFT, dengan semua jaminan keamanan yang diberikan oleh komite sinkronisasi, memicu beberapa tindakan di jaringan IoT. Bayangkan sebuah [layanan penyewaan sepeda](https://youtu.be/ZHNrAXf3RDE?t=929) yang menggunakan aplikasi dengan klien ringan yang disematkan untuk dengan cepat memverifikasi bahwa Anda memiliki NFT layanan penyewaan tersebut dan jika ya, membuka kunci sepeda untuk Anda kendarai!

Rollup Ethereum juga akan mendapat manfaat dari klien ringan. Salah satu masalah besar untuk rollup adalah peretasan yang menargetkan jembatan yang memungkinkan dana ditransfer dari Mainnet Ethereum ke rollup. Salah satu kerentanannya adalah oracle yang digunakan rollup untuk mendeteksi bahwa pengguna telah melakukan deposit ke jembatan. Jika oracle memberikan data yang buruk, mereka dapat mengelabui rollup agar berpikir bahwa ada deposit ke jembatan dan secara tidak benar melepaskan dana. Klien ringan yang disematkan di rollup dapat digunakan untuk melindungi dari oracle yang rusak karena deposit ke jembatan dapat disertai dengan bukti yang dapat diverifikasi oleh rollup sebelum melepaskan token apa pun. Konsep yang sama juga dapat diterapkan pada jembatan antar-rantai lainnya.

Klien ringan juga dapat digunakan untuk meningkatkan dompet Ethereum. Alih-alih mempercayai data yang diberikan dari penyedia RPC, dompet Anda dapat secara langsung memverifikasi data yang disajikan kepada Anda menggunakan klien ringan yang disematkan. Ini akan menambah keamanan pada dompet Anda. Jika penyedia RPC Anda tidak jujur dan memberi Anda data yang salah, klien ringan yang disematkan dapat memberi tahu Anda!

## Bagaimana status pengembangan klien ringan saat ini? {#current-state-of-development}

Ada beberapa klien ringan dalam pengembangan, termasuk klien ringan eksekusi, konsensus, dan gabungan eksekusi/konsensus. Berikut adalah implementasi klien ringan yang kami ketahui pada saat penulisan halaman ini:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): klien konsensus ringan dalam TypeScript
- [Helios](https://github.com/a16z/helios): gabungan klien eksekusi dan konsensus ringan dalam Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): mode ringan untuk klien eksekusi (dalam pengembangan) dalam Go
- [Nimbus](https://nimbus.guide/el-light-client.html): klien konsensus ringan dalam Nim

Sepengetahuan kami, belum ada satu pun dari ini yang dianggap siap produksi.

Ada juga banyak pekerjaan yang sedang dilakukan untuk meningkatkan cara klien ringan dapat mengakses data Ethereum. Saat ini, klien ringan bergantung pada permintaan RPC ke full node menggunakan model klien/server, tetapi di masa depan data dapat diminta dengan cara yang lebih terdesentralisasi menggunakan jaringan khusus seperti [Portal Network](https://www.ethportal.net/) yang dapat menyajikan data ke klien ringan menggunakan protokol gosip peer-to-peer.

Item [peta jalan](/roadmap/) lainnya seperti [Verkle trees](/roadmap/verkle-trees/) dan [statelessness](/roadmap/statelessness/) pada akhirnya akan membawa jaminan keamanan klien ringan setara dengan klien penuh.

## Bacaan lebih lanjut {#further-reading}

- [Zsolt Felfodhi tentang klien ringan Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling tentang jaringan klien ringan](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling tentang klien ringan setelah The Merge](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Jalan berliku menuju klien ringan yang fungsional](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)