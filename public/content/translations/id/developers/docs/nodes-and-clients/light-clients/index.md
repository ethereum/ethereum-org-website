---
title: Klien ringkas
description: Pengantar ke klien ringan Ethereum.
lang: id
---

Menjalankan full node adalah cara yang paling aman, privat, terdesentralisasi, dan tahan sensor untuk berinteraksi dengan Ethereum. Dengan simpul penuh, Anda menyimpan salinan blockchain Anda sendiri yang dapat Anda minta secara instan dan Anda mendapatkan akses langsung ke jaringan peer-to-peer Ethereum. Namun, menjalankan sebuah node penuh membutuhkan sejumlah besar memori, penyimpanan, dan CPU. Ini berarti tidak memungkinkan bagi setiap orang untuk menjalankan node mereka sendiri. Ada beberapa solusi untuk hal ini di peta jalan Ethereum, termasuk tanpa kewarganegaraan, tetapi solusi-solusi tersebut masih beberapa tahun lagi untuk diimplementasikan. Jawabannya dalam jangka pendek adalah menukar beberapa manfaat menjalankan node penuh dengan peningkatan kinerja yang besar yang memungkinkan node berjalan dengan kebutuhan perangkat keras yang sangat rendah. Node yang melakukan pertukaran ini dikenal sebagai light node.

## Apa itu klien ringan {#what-is-a-light-client}

Light node adalah simpul yang menjalankan perangkat lunak klien ringan. Alih-alih menyimpan salinan lokal dari data blockchain dan memverifikasi semua perubahan secara independen, mereka justru meminta data yang diperlukan dari beberapa penyedia. Penyedia mungkin berupa koneksi langsung ke node penuh atau melalui server RPC terpusat. Data kemudian diverifikasi oleh simpul cahaya, yang memungkinkannya untuk mengikuti kepala rantai. Light node hanya memproses header blok, hanya sesekali mengunduh konten blok yang sebenarnya. Node dapat bervariasi dalam tingkat ke-ringanannya, tergantung pada kombinasi perangkat lunak klien ringan dan penuh yang mereka jalankan. Sebagai contoh, konfigurasi paling ringan adalah menjalankan klien eksekusi ringan dan klien konsensus ringan. Kemungkinan besar juga banyak node yang akan memilih untuk menjalankan klien konsensus ringan dengan klien eksekusi penuh, atau sebaliknya.

## Bagaimana cara kerja klien ringan? {#how-do-light-clients-work}

Ketika Ethereum mulai menggunakan mekanisme konsensus berbasis bukti kepemilikan, infrastruktur baru diperkenalkan secara khusus untuk mendukung klien ringan. Cara kerjanya adalah dengan secara acak memilih subset dari 512 validator setiap 1,1 hari untuk berfungsi sebagai **komite sinkronisasi**. Komite sinkronisasi menandatangani tajuk blok terbaru. Setiap header blok berisi tanda tangan gabungan dari para validator dalam komite sinkronisasi dan "bitfield" yang menunjukkan validator mana yang menandatangani dan mana yang tidak. Setiap header juga menyertakan daftar validator yang diharapkan untuk berpartisipasi dalam penandatanganan blok berikutnya. Ini berarti klien ringan dapat dengan cepat melihat bahwa komite sinkronisasi telah menandatangani data yang mereka terima, dan mereka juga dapat memeriksa bahwa komite sinkronisasi tersebut adalah yang asli dengan membandingkan data yang mereka terima dengan data yang diberitahukan kepada mereka di blok sebelumnya. Dengan cara ini, light client dapat terus memperbarui pengetahuannya mengenai blok Ethereum terbaru tanpa perlu mengunduh blok itu sendiri, cukup dengan header yang berisi informasi ringkasan.

Pada lapisan eksekusi, tidak ada spesifikasi tunggal untuk klien eksekusi ringan. Ruang lingkup klien eksekusi ringan dapat bervariasi dari "mode ringan" klien eksekusi penuh yang memiliki semua EVM dan fungsionalitas jaringan dari node penuh tetapi hanya memverifikasi header blok, tanpa mengunduh data terkait, atau dapat berupa klien yang lebih sederhana yang sangat bergantung pada penerusan permintaan ke penyedia RPC untuk berinteraksi dengan Ethereum.

## Mengapa klien ringan itu penting? {#why-are-light-clients-important}

Klien ringan sangat penting karena memungkinkan pengguna untuk memverifikasi data yang masuk daripada secara membabi buta mempercayai bahwa penyedia data mereka benar dan jujur, sementara hanya menggunakan sebagian kecil sumber daya komputasi dari node penuh. Data yang diterima klien light dapat diperiksa dengan header blok yang mereka ketahui telah ditandatangani oleh setidaknya 2/3 dari sekumpulan 512 validator Ethereum secara acak. Ini adalah bukti yang sangat kuat bahwa data tersebut benar.

Klien ringan hanya menggunakan sedikit daya komputasi, memori, dan penyimpanan sehingga dapat dijalankan pada ponsel, disematkan pada aplikasi, atau sebagai bagian dari peramban. Klien ringan adalah cara untuk membuat akses yang minim kepercayaan ke Ethereum sama mudahnya dengan mempercayai penyedia pihak ketiga.

Mari kita ambil contoh sederhana. Bayangkan Anda ingin memeriksa saldo akun Anda. Untuk melakukan ini, Anda harus membuat permintaan ke node Ethereum. Node tersebut akan memeriksa salinan lokal dari status Ethereum untuk mengetahui saldo Anda dan mengembalikannya kepada Anda. Jika Anda tidak memiliki akses langsung ke node, ada operator terpusat yang menyediakan data ini sebagai layanan. Anda bisa mengirimkan permintaan kepada mereka, mereka akan memeriksa node mereka, dan mengirimkan hasilnya kepada Anda. Masalahnya adalah Anda harus mempercayai penyedia layanan untuk memberikan informasi yang benar. Anda tidak akan pernah benar-benar tahu apakah informasi tersebut benar jika Anda tidak dapat memverifikasinya sendiri.

Klien yang ringan mengatasi masalah ini. Anda masih meminta data dari beberapa penyedia eksternal, tetapi ketika Anda menerima data kembali, data tersebut disertai dengan bukti bahwa simpul cahaya Anda dapat memeriksa informasi yang diterimanya di header blok. Ini berarti Ethereum memverifikasi kebenaran data Anda, bukan operator tepercaya.

## Inovasi apa yang dimungkinkan oleh klien ringan? {#what-innovations-do-light-clients-enable}

Manfaat utama dari light client adalah memungkinkan lebih banyak orang untuk mengakses Ethereum secara mandiri dengan persyaratan perangkat keras yang dapat diabaikan dan ketergantungan minimal pada pihak ketiga. Hal ini baik untuk pengguna karena mereka dapat memverifikasi data mereka sendiri dan juga baik untuk jaringan karena meningkatkan jumlah dan keragaman node yang memverifikasi rantai.

Kemampuan untuk menjalankan node Ethereum pada perangkat dengan penyimpanan, memori, dan daya pemrosesan yang sangat kecil adalah salah satu bidang inovasi utama yang dibuka oleh klien ringan. Sementara saat ini node Ethereum membutuhkan banyak sumber daya komputasi, klien ringan dapat disematkan ke dalam browser, berjalan di ponsel dan bahkan mungkin perangkat yang lebih kecil seperti jam tangan pintar. Ini berarti dompet Ethereum dengan klien tertanam dapat berjalan di ponsel. Ini berarti dompet seluler dapat jauh lebih terdesentralisasi karena mereka tidak perlu mempercayai penyedia data terpusat untuk data mereka.

Perluasan dari ini adalah memungkinkan perangkat **internet of things (IoT)**. Klien ringan dapat digunakan untuk membuktikan kepemilikan sejumlah saldo token atau NFT dengan cepat, dengan semua jaminan keamanan yang disediakan oleh komite sinkronisasi, yang memicu beberapa tindakan pada jaringan IoT. Bayangkan sebuah [layanan penyewaan sepeda](https://youtu.be/ZHNrAXf3RDE?t=929) yang menggunakan aplikasi dengan klien ringan tersemat untuk memverifikasi dengan cepat bahwa Anda memiliki NFT layanan penyewaan tersebut dan, jika ya, membuka kunci sepeda untuk Anda kendarai!

Rollup Ethereum juga akan mendapatkan keuntungan dari klien yang ringan. Salah satu masalah besar untuk rollup adalah peretasan yang menargetkan jembatan yang memungkinkan dana ditransfer dari Ethereum Mainnet ke rollup. Salah satu kerentanannya adalah oracle yang digunakan rollup untuk mendeteksi bahwa pengguna telah melakukan deposit ke dalam bridge. Jika oracle memasukkan data yang buruk, mereka dapat mengelabui rollup sehingga mengira ada setoran ke jembatan dan melepaskan dana secara tidak benar. Klien ringan yang tertanam di dalam rollup dapat digunakan untuk melindungi dari oracle yang rusak karena setoran ke dalam jembatan dapat disertai dengan bukti yang dapat diverifikasi oleh rollup sebelum melepaskan token apa pun. Konsep yang sama juga dapat diterapkan pada jembatan interchain lainnya.

Klien ringan juga dapat digunakan untuk meningkatkan dompet Ethereum. Alih-alih mempercayai data yang disediakan oleh penyedia RPC, dompet Anda dapat secara langsung memverifikasi data yang disajikan kepada Anda menggunakan klien ringan yang tertanam. Ini akan menambah keamanan pada dompet Anda. Jika penyedia RPC Anda tidak jujur dan memberi Anda data yang salah, klien cahaya tertanam dapat memberi tahu Anda!

## Bagaimana kondisi pengembangan klien ringan saat ini? {#current-state-of-development}

Ada beberapa klien ringan yang sedang dikembangkan, termasuk klien ringan eksekusi, konsensus, dan gabungan eksekusi/konsensus. Ini adalah implementasi klien ringan yang kami ketahui pada saat menulis halaman ini:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): klien ringan konsensus dalam TypeScript
- [Helios](https://github.com/a16z/helios): klien ringan eksekusi dan konsensus gabungan dalam Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): mode ringan untuk klien eksekusi (dalam pengembangan) dalam Go
- [Nimbus](https://nimbus.guide/el-light-client.html): klien ringan konsensus dalam Nim

Sepengetahuan kami, belum ada satupun yang dianggap siap produksi.

Ada juga banyak pekerjaan yang sedang dilakukan untuk meningkatkan cara-cara yang dapat digunakan oleh klien ringan untuk mengakses data Ethereum. Saat ini, klien ringan bergantung pada permintaan RPC ke node penuh menggunakan model klien/server, tetapi di masa mendatang, data dapat diminta dengan cara yang lebih terdesentralisasi menggunakan jaringan khusus seperti [Portal Network](https://www.ethportal.net/) yang dapat melayani data ke klien ringan menggunakan protokol gosip peer-to-peer.

Item [peta perjalanan](/roadmap/) lainnya seperti [pohon Verkle](/roadmap/verkle-trees/) dan [statelessness](/roadmap/statelessness/) pada akhirnya akan membuat jaminan keamanan klien ringan setara dengan klien penuh.

## Bacaan lebih lanjut {#further-reading}

- [Zsolt Felfodhi tentang klien ringan Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling tentang jaringan klien ringan](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling tentang klien ringan setelah Penggabungan](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Jalan berliku menuju klien ringan yang fungsional](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
