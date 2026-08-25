---
title: "Dasar-dasar Ethereum: pengantar"
description: "Kuliah pengantar tentang fundamental Ethereum, mencakup apa itu Ethereum, perbedaannya dengan Bitcoin, dan konsep inti yang mendasari jaringan Ethereum."
lang: id
youtubeId: "j78ZcIIpi0Q"
uploadDate: 2022-03-01
duration: "0:11:14"
educationLevel: beginner
topic:
  - "ethereum"
  - "intro"
format: presentation
author: Quezar
breadcrumb: "Dasar-dasar Ethereum"
---

Sebuah kuliah pengantar oleh **Quezar** yang mencakup fundamental Ethereum, termasuk apa itu blockchain, bagaimana cara kerjanya di balik layar, dan komponen utama yang membentuk jaringan Ethereum.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=j78ZcIIpi0Q) yang dipublikasikan oleh Quezar. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Selamat datang dan gambaran umum seri (0:03) {#welcome-and-series-overview-003}

Selamat datang kembali di bagian lain dari seri Ethereum. Jika Anda sedang mencari sumber daya yang bagus untuk memahami bagaimana Ethereum bekerja di balik layar, kami menyediakannya untuk Anda. Pada bagian sebelumnya, kita telah membahas cara membaca dan menulis kontrak Solidity dasar dan secara singkat mendiskusikan beberapa hal tentang berbagai komponen jaringan Ethereum. Pada bagian ini, kita akan membahas lebih dalam tentang arsitektur Ethereum dan mendiskusikan setiap komponen secara lebih mendetail. Kami akan segera menghadirkan lebih banyak video, jadi jika Anda menyukai konten semacam ini, tekan tombol suka dan berlangganan agar Anda mendapat pemberitahuan saat video baru ditayangkan.

#### Tujuan dan prasyarat (0:40) {#goals-and-prerequisites-040}

Tujuan dari bagian seri ini adalah untuk memberi Anda pemahaman yang baik tentang arsitektur Ethereum dalam waktu seminggu. Sama seperti bagian sebelumnya, saya telah menyusunnya sedemikian rupa sehingga dalam tujuh hari Anda akan jauh lebih familier dengan segala hal yang terjadi di jaringan Ethereum setiap kali seseorang melakukan aktivitas di dalamnya.

Berbicara tentang prasyarat — tidak ada hal khusus yang harus Anda ketahui sebelumnya. Jika Anda menonton video ini, kemungkinan besar Anda sudah cukup tahu tentang jaringan Ethereum sejauh menyangkut bagian ini. Namun, saya sarankan untuk menyelesaikan bagian sebelumnya dari seri ini — Dasar-dasar Solidity — karena bagian tersebut sifatnya jauh lebih praktis. Anda dapat menjalankan kode di Remix IDE dan melihat bagaimana segala sesuatunya benar-benar bekerja di jaringan Ethereum. Bagian ini sebagian besar akan berada di sisi teoretis, dan jika Anda sudah menyelesaikan bagian sebelumnya, Anda akan merasa jauh lebih mudah untuk memahaminya.

#### Apa yang akan kita bahas (1:41) {#what-well-cover-141}

Pada bagian ini kita akan membahas apa itu blockchain dan melihat bagaimana cara kerjanya di balik layar. Kita juga akan melihat komponen apa saja yang membentuk jaringan Ethereum, lalu kita akan melangkah lebih jauh dan mendiskusikan setiap komponen secara lebih mendetail.

Untuk bagian ini, saya menggunakan dokumentasi resmi Ethereum sebagai dasar. Setelah Anda menyelesaikan bagian ini, Anda sebagian besar akan menguasai topik-topik dasar dari dokumentasi ini. Anda akan jauh lebih mudah memahaminya. Tentu saja tidak semuanya ada di dalam video, tetapi saya telah mencoba untuk mencakup semua hal pada tingkat yang lebih tinggi. Anda dapat menganggap bagian ini sebagai pengantar untuk dokumentasi, yang jauh lebih mendalam.

#### Alat dan pendekatan (2:30) {#tools-and-approach-230}

Kita juga akan menggunakan Etherscan untuk melihat bagaimana setiap komponen bekerja secara waktu nyata. Jangan khawatir jika Anda tidak dapat memahami semuanya sekaligus — Anda selalu dapat mengunjungi kembali topik-topik tertentu kapan pun Anda mau. Saya sarankan untuk beristirahat sejenak setelah setiap topik agar Anda dapat mencernanya dengan lebih baik. Jadi, mari kita mulai dengan memahami apa itu blockchain.