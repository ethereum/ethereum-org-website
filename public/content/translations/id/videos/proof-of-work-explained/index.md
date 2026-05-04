---
title: "Apa itu Bukti Kerja (PoW)?"
description: "Penjelasan ramah pemula tentang mekanisme konsensus Bukti Kerja (PoW), termasuk bagaimana penambang memecahkan teka-teki kriptografi untuk memvalidasi transaksi dan mengamankan jaringan rantai blok."
lang: id
youtubeId: "3EUAcxhuoU4"
uploadDate: 2019-02-22
duration: "0:05:31"
educationLevel: beginner
topic:
  - "consensus"
  - "pow"
format: explainer
author: Binance Academy
breadcrumb: "Bukti Kerja"
---

Penjelasan oleh **Binance Academy** yang membahas mekanisme konsensus Bukti Kerja (PoW), termasuk asal-usulnya, bagaimana penambang bersaing untuk memecahkan teka-teki kriptografi, dan bagaimana hal itu mengamankan jaringan rantai blok.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=3EUAcxhuoU4) yang diterbitkan oleh Binance Academy. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Asal-usul Bukti Kerja (0:00) {#origins-of-proof-of-work-000}

Berasal dari tahun 1993, konsep Bukti Kerja (PoW) dikembangkan untuk mencegah serangan penolakan layanan (denial-of-service) dan penyalahgunaan layanan lainnya seperti spam di sebuah jaringan, dengan mewajibkan beberapa pekerjaan dari pengguna layanan — yang biasanya berarti waktu pemrosesan oleh komputer.

Pada tahun 2009, Bitcoin memperkenalkan cara inovatif dalam menggunakan Bukti Kerja (PoW) sebagai algoritma konsensus untuk memvalidasi transaksi dan menyiarkan blok baru ke rantai blok. Sejak saat itu, metode ini telah menyebar menjadi algoritma konsensus yang banyak digunakan di berbagai mata uang kripto.

#### Bagaimana Bukti Kerja bekerja (0:33) {#how-proof-of-work-works-033}

Singkatnya, penambang di sebuah jaringan bersaing satu sama lain untuk memecahkan teka-teki komputasi yang kompleks. Teka-teki ini sulit untuk dipecahkan tetapi mudah untuk diverifikasi setelah seseorang menemukan solusi yang tepat.

Setelah seorang penambang menemukan solusi untuk teka-teki tersebut, mereka dapat menyiarkan blok tersebut ke jaringan, di mana semua penambang lainnya akan memverifikasi bahwa solusi tersebut benar.

#### Contoh penambangan Bitcoin (0:56) {#bitcoin-mining-example-056}

Bitcoin adalah sistem berbasis rantai blok yang dikelola oleh kerja kolektif dari node yang terdesentralisasi. Beberapa dari node ini dikenal sebagai penambang dan bertanggung jawab untuk menambahkan blok baru ke rantai blok.

Untuk melakukannya, penambang perlu mencoba dan menebak angka pseudo-acak yang dikenal sebagai nonce. Angka ini, ketika digabungkan dengan data yang disediakan di dalam blok dan dilewatkan melalui fungsi hash, harus menghasilkan hasil yang sesuai dengan kondisi yang diberikan — misalnya, hash yang dimulai dengan empat angka nol.

Ketika hasil yang cocok ditemukan, node lainnya memverifikasi validitas hasil tersebut, dan node penambang diberikan imbalan berupa imbalan blok. Oleh karena itu, tidak mungkin untuk menambahkan blok baru ke rantai utama tanpa terlebih dahulu menemukan nonce yang valid, yang pada gilirannya menghasilkan solusi untuk blok spesifik tersebut — yang disebut hash blok.

#### Mengapa disebut "Bukti Kerja" (1:46) {#why-its-called-proof-of-work-146}

Setiap blok yang divalidasi berisi hash blok yang mewakili pekerjaan yang dilakukan oleh penambang. Inilah sebabnya mengapa hal ini disebut Bukti Kerja (PoW).

#### Manfaat keamanan (1:54) {#security-benefits-154}

Bukti Kerja (PoW) membantu melindungi jaringan dari berbagai serangan yang berbeda. Serangan yang berhasil akan membutuhkan banyak daya komputasi dan banyak waktu untuk melakukan perhitungan. Oleh karena itu, hal ini akan menjadi tidak efisien karena biaya yang dikeluarkan akan lebih besar daripada potensi imbalan dari menyerang jaringan.

#### Keterbatasan (2:10) {#limitations-210}

Salah satu masalah dengan Bukti Kerja (PoW) adalah bahwa penambangan membutuhkan perangkat keras komputer mahal yang menghabiskan banyak daya. Meskipun perhitungan algoritma yang rumit menjamin keamanan jaringan, perhitungan ini tidak dapat dimanfaatkan lebih dari itu.

#### Melihat ke depan (2:25) {#looking-ahead-225}

Meskipun Bukti Kerja (PoW) mungkin bukan solusi yang paling efisien, ini masih merupakan salah satu metode paling populer untuk mencapai konsensus dalam rantai blok. Sudah ada metode dan pendekatan alternatif yang mencoba memecahkan masalah ini, tetapi hanya waktu yang akan menjawab metode apa yang akan menjadi penerus Bukti Kerja (PoW).