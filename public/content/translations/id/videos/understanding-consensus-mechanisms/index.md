---
title: "Memahami mekanisme konsensus rantai blok"
description: "Penjelasan yang mencakup mekanisme konsensus inti yang digunakan dalam rantai blok, dan bagaimana mekanisme tersebut memungkinkan jaringan terdesentralisasi untuk menyepakati state transaksi tanpa otoritas pusat."
lang: id
youtubeId: "ojxfbN78WFQ"
uploadDate: 2018-11-29
duration: "0:09:33"
educationLevel: beginner
topic:
  - "konsensus"
  - "rantai blok"
format: explainer
author: Tech in Asia
breadcrumb: "Mekanisme Konsensus"
---

Penjelasan oleh **Tech in Asia** yang mencakup tiga mekanisme konsensus utama yang digunakan dalam sistem rantai blok, Bukti Kerja (PoW), Bukti Kepemilikan (PoS), dan bukti otoritas (PoA), serta bagaimana mekanisme tersebut memungkinkan jaringan terdesentralisasi untuk menyepakati state transaksi.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=ojxfbN78WFQ) yang dipublikasikan oleh Tech in Asia. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Apa itu mekanisme konsensus? (0:00) {#what-are-consensus-mechanisms-000}

Rantai blok — kata yang paling populer di tahun 2018. Namun, tahukah Anda bagaimana sistem peer-to-peer terdesentralisasi tanpa figur otoritatif membuat keputusan? Jawabannya terletak pada mekanisme konsensus. Ada berbagai mekanisme konsensus, tetapi semuanya memiliki tujuan yang sama: untuk memastikan catatan tersebut benar dan jujur. Perbedaannya adalah cara konsensus dicapai. Di sini kita akan menjelajahi tiga jenis mekanisme konsensus.

#### Bukti Kerja (PoW) (0:23) {#proof-of-work-023}

Dalam sistem Bukti Kerja (PoW), data transaksi disimpan dalam blok, divalidasi dengan meminta orang memecahkan masalah matematika rumit yang melekat padanya. Hal ini biasanya dilakukan oleh komputer yang kuat dan dikenal sebagai "penambangan." Imbalan dalam bentuk mata uang kripto diberikan kepada penambang pertama yang memecahkan masalah tersebut.

Bayangkan sekelompok pemburu harta karun yang mencoba membuka peti dengan kunci rumit yang terpasang padanya. Mencari tahu kombinasi yang benar sangatlah melelahkan, tetapi orang pertama yang berhasil melakukannya akan mendapatkan imbalan. Singkatnya, Bukti Kerja (PoW) adalah perlombaan untuk mencari tahu kombinasi yang tepat pada peti harta karun. Mata uang kripto seperti Bitcoin dan Ethereum menggunakan mekanisme Bukti Kerja (PoW).

#### Bukti Kepemilikan (PoS) (1:04) {#proof-of-stake-104}

Selanjutnya, kita memiliki Bukti Kepemilikan (PoS). Di sini pembuat blok baru, yang juga dikenal sebagai validator, dipilih secara acak berdasarkan seberapa banyak stake yang mereka komit ke jaringan. Semakin tinggi stake yang ditempatkan, semakin tinggi peluang untuk dipilih sebagai validator.

Mari kita terapkan ini pada skenario peti harta karun. Bayangkan sekelompok pemburu harta karun bersaing untuk mendapatkan sebuah peti. Peti tersebut diberikan sebagai imbalan berdasarkan sistem lotre. Untuk berpartisipasi, setiap pemburu harus membeli tiket lotre. Semakin banyak yang dibeli setiap pemburu, semakin tinggi peluang untuk menang. Protokol rantai blok seperti Ouroboros dari Cardano dan EOS mengadopsi konsensus Bukti Kepemilikan (PoS).

#### Bukti otoritas (PoA) (1:42) {#proof-of-authority-142}

Terakhir, bukti otoritas (PoA) — bentuk modifikasi dari Bukti Kepemilikan (PoS). Di sini, hanya pihak yang disetujui yang dipilih berdasarkan reputasi mereka yang dapat menjadi validator.

Mari kita tinjau kembali skenario peti harta karun. Sekelompok pemburu harta karun membentuk serikat dan mengumpulkan harta mereka. Berdasarkan tingkat kepercayaan mereka, beberapa orang terpilih ditunjuk oleh kelompok tersebut untuk memastikan validitas isi peti. Hyperledger Fabric dari IBM dan testnet Kovan Ethereum adalah beberapa contoh sistem rantai blok yang menggunakan bukti otoritas (PoA).

#### Model konsensus hibrida (2:14) {#hybrid-consensus-models-214}

Sementara perusahaan rantai blok tradisional beroperasi pada satu mekanisme konsensus, beberapa perusahaan inovatif mengadopsi berbagai protokol konsensus. Ambil contoh Opet Foundation, yang sedang membangun rantai blok unik untuk menyimpan data yang dikumpulkan pada aplikasi chatbot pendamping pendidikannya dengan menerapkan protokol bukti otoritas (PoA) dan Bukti Kerja (PoW).

Data seperti catatan akademik, ekstrakurikuler, dan profil kepribadian siswa disimpan di rantai blok dan berpotensi divalidasi melalui kerangka kerja bukti otoritas (PoA) yang didukung oleh Hyperledger Fabric. Validator, dalam hal ini, adalah institusi pendidikan terkemuka atau bahkan pencatat nasional dan kementerian pendidikan terkait. Hal ini membantu memastikan bahwa semua data siswa dapat dipercaya.

Namun, siapa yang mau bekerja secara gratis? Konsensus Bukti Kerja (PoW) berperan untuk memberikan imbalan kepada validator yang telah melakukan pekerjaan.

#### Privasi dan data siswa (3:02) {#privacy-and-student-data-302}

Dengan Hyperledger Fabric, setiap catatan siswa diamankan dengan kunci hash privat yang dimiliki oleh siswa. Data tersebut hanya dapat diakses ketika siswa memberikan kunci unik tersebut. Ini berarti privasi siswa terjaga dan dikendalikan oleh siswa itu sendiri.

Sebagai contoh, ketika siswa mendaftar ke universitas melalui platform Opet, mereka memberikan kunci unik dari catatan mereka kepada universitas. Dengan itu, universitas dapat mengakses catatan akademik terbaru mereka. Siswa juga akan dapat melihat apakah catatan mereka telah dibuka atau setidaknya dipertimbangkan untuk pendaftaran. Hal ini meningkatkan efisiensi dan transparansi dibandingkan dengan metode tradisional.

#### Penutup (3:37) {#closing-337}

Dengan menggabungkan model Bukti Kerja (PoW) dan bukti otoritas (PoA), solusi rantai blok Opet Foundation memastikan privasi pada data siswa sekaligus memberikan insentif kepada institusi pendidikan dan siswa ketika mereka berkontribusi pada platform. Dengan rantai blok yang semakin populer, hanya masalah waktu sebelum kita melihat lebih banyak lagi sistem hibrida unik yang diciptakan.