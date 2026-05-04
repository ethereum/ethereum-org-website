---
title: "Kriptoekonomi: bukti otoritas"
description: "Kuliah kriptoekonomi yang menjelaskan mekanisme konsensus bukti otoritas (PoA), mencakup cara kerjanya, kelebihan dan kekurangannya dibandingkan dengan Bukti Kerja dan bukti kepemilikan, serta di mana ia digunakan dalam praktiknya."
lang: id
youtubeId: "Mj10HSEM5_8"
uploadDate: 2018-10-19
duration: "0:09:18"
educationLevel: intermediate
topic:
  - "consensus"
  - "proof-of-authority"
format: presentation
author: Cryptoeconomics Study
breadcrumb: "Bukti Otoritas"
---

Sebuah kuliah kriptoekonomi oleh **Cryptoeconomics Study** yang menjelaskan mekanisme konsensus bukti otoritas (PoA), termasuk bagaimana otoritas pusat menentukan urutan transaksi, masalah pengeluaran ganda dan penyensoran yang ditimbulkannya, serta pendekatan mitigasi tanda tangan ganda.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=Mj10HSEM5_8) yang diterbitkan oleh Cryptoeconomics Study. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Cara kerja bukti otoritas (0:00) {#how-proof-of-authority-works-000}

Selamat datang di bagian 2.4 — bukti otoritas — di mana kita memulihkan otoritas pusat tersebut untuk menentukan urutan transaksi dan memecahkan masalah kecil pengeluaran ganda yang mengganggu itu.

Pada suatu ketika, ada sebuah otoritas pusat yang disukai semua orang. Mereka semua menyetujui otoritas yang hebat ini dan berkata, "Mengapa kita tidak mendengarkan mereka saja? Kita mengalami masalah-masalah ini dan kita tidak sepakat tentang state yang benar, jadi biarkan saja dia memberi tahu kita apa state-nya."

Otoritas pusat kita menjalankan node besarnya, dan sekarang orang-orang menandatangani transaksi dan alih-alih mengirimkannya langsung satu sama lain, mereka mengirimkannya ke otoritas pusat. Otoritas pusat menerapkan setiap transaksi dan menandatanganinya sendiri, dengan mengatakan, "Ya, saya menyetujui — ini adalah transaksi nol." Otoritas pusat kemudian mengirimkannya kepada semua orang, dan semua orang menerima transaksi tersebut dan menerimanya sebagai kebenaran mutlak.

#### Masalah pengeluaran ganda (1:05) {#the-double-spend-problem-105}

Sekarang mari kita coba pengeluaran ganda. Apa yang akan terjadi? Mallory akan mengirimkan dua transaksi yang saling bertentangan ke otoritas pusat. Otoritas pusat menerima yang pertama dan menandatangani bahwa ini adalah transaksi kedua yang dia lihat, lalu menandatangani bahwa ini adalah transaksi ketiga yang dia lihat, dan kemudian menyebarkan pesan-pesan tersebut.

Apa yang terjadi? Semua orang menerima pesan yang sama, dan mereka semua memperhatikan urutan dari otoritas pusat. Itu berarti mereka semua berakhir dengan riwayat yang sama. Jika kita melihat state-nya, kita melakukannya dengan baik — Alice mengirim ke Jing, lalu Mallory mengirim ke Alice, lalu Mallory mencoba mengirim ke Jing, tetapi yang itu tidak berhasil karena Mallory tidak memiliki cukup uang. Saldo mereka semua akan sama. Mereka semua berada dalam konsensus. Otoritas pusat — hebat, kita berhasil melakukannya.

#### Ketika otoritas disusupi (2:09) {#when-the-authority-is-compromised-209}

Namun masalahnya adalah kita harus memercayai otoritas pusat untuk menyediakan urutan transaksi ini. Jadi apa yang terjadi jika otoritas pusat dikeluarkan dan ternyata dia adalah Mallory selama ini?

Kita kembali ke masalah yang sama seperti sebelumnya. Pertama, pengeluaran ganda — Mallory hanya menandatangani kedua transaksi yang bertentangan dan mengatakan bahwa keduanya terjadi pada saat yang sama. Kita tidak tahu mana yang lebih dulu. Mallory secara selektif menyebarkannya dan mengacaukan node-node tersebut, dan mereka kehilangan kesepakatan.

Masalah lainnya adalah penyensoran. Ini adalah masalah baru dengan rantai bukti otoritas kita. Bagaimana jika Mallory tidak menyukai Alice? Alice mencoba mengirim transaksi dan otoritas pusat hanya melihatnya, menyadari bahwa itu Alice, dan membuangnya. Alice mencoba mengirimkannya lagi, dan itu dibuang lagi. Alice tidak tahu apa yang terjadi — transaksinya tidak berhasil. Penyensoran berhasil, dan kita kembali menderita.

#### Memitigasi dengan tanda tangan ganda (3:21) {#mitigating-with-multi-signature-321}

Jangan terlalu khawatir — ada potensi mitigasi. Kita dapat mendesentralisasikan otoritas secara politis. Secara teoretis, ini akan mempersulit Mallory untuk mendapatkan kendali. Jadi, alih-alih satu otoritas pusat, kita memiliki empat otoritas yang berbeda. Mereka semua mungkin mewakili kepentingan yang berbeda dari pihak yang berbeda, dan mereka semua harus berkumpul untuk menyetujui transaksi.

Ini disebut multi-sig — sebuah tanda tangan ganda. Mereka menerima transaksi dari Alice ke Jing, dan yang pertama menandatangani dengan mengatakan, "Saya melihat pesan ini dan saya menyetujui." Kemudian yang kedua menandatangani, dan yang ketiga. Kita dapat mengatakan bahwa kita menerima tanda tangan ganda dua-dari-empat, atau tiga-dari-empat, atau mungkin kita wajibkan semua pihak — empat dari empat. Terserah Anda saat merancang tanda tangan ganda Anda.

Ini berarti transaksi berhasil dan telah disetujui oleh pihak berwenang.

#### Keterbatasan bukti otoritas (4:32) {#limitations-of-proof-of-authority-432}

Namun apa yang terjadi jika semua otoritas ini menjadi Mallory? Kita memiliki masalah yang sama persis — pengeluaran ganda dan penyensoran. Jadi ini tidak sempurna. Namun, dalam beberapa hal ini lebih baik daripada pemroses pembayaran terpusat karena setidaknya pengguna menjalankan semua transaksi itu sendiri. Mereka pada akhirnya dapat mendeteksi pengeluaran ganda, tetapi kita masih memiliki masalah. Secara teknis kita masih dapat melakukan pengeluaran ganda dan secara teknis kita masih dapat menyensor.

Tidak ada akses terbuka — mungkin sulit untuk menjadi salah satu otoritas ini. Dan tidak ada hukuman di dalam protokol jika pengeluaran ganda atau penyensoran terjadi. Tidak ada apa pun di dalam protokol yang akan menghukum tokoh-tokoh otoritas ini.

#### Apa yang terjadi selanjutnya (5:19) {#what-comes-next-519}

Jadi Alice yang bijak memutuskan ada cara lain — menyingkirkan otoritas. Siapa yang membutuhkannya? Sebagai gantinya, kita mengizinkan siapa saja untuk menjadi penambang dan berpartisipasi dalam protokol konsensus. Ini memberikan akses terbuka untuk berpartisipasi, memberikan imbalan ekonomi untuk perilaku yang baik — membentuk konsensus dengan cara yang berhasil — dan memberikan hukuman ekonomi untuk perilaku buruk, di mana kita mendeteksinya dan membakar koin orang-orang.

Namun itu akan dibahas selanjutnya dalam Bukti Kerja (PoW) — desain mekanisme untuk bab 3.