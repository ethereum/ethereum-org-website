---
title: "Membuka penskalaan Ethereum: Penjelasan EIP-4844"
description: "Finematics menjelaskan EIP-4844 (proto-danksharding), pembaruan utama dalam percabangan keras Dencun yang memperkenalkan transaksi blob untuk secara dramatis mengurangi biaya bagi rollup lapisan 2 (l2) di Ethereum."
lang: id
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "cara-kerja-ethereum"
  - "penskalaan"
  - "eip-4844"
  - "dencun"
  - "pembaruan"
format: explainer
author: Finematics
breadcrumb: "Penjelasan EIP-4844"
---

Sebuah penjelasan oleh **Finematics** yang membahas EIP-4844 (proto-danksharding), pembaruan utama dalam percabangan keras Dencun yang memperkenalkan transaksi blob untuk secara dramatis mengurangi biaya bagi rollup lapisan 2 (l2) di Ethereum.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=HT9PHWloIiU) yang dipublikasikan oleh Finematics. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

#### Pengantar (0:00) {#introduction-000}

Penskalaan Ethereum telah menjadi topik yang hangat diperdebatkan selama beberapa waktu. Solusi lapisan 2 (l2) telah berada di garis depan pertempuran ini, menawarkan cara untuk menangani transaksi di luar rantai utama untuk mengurangi kemacetan dan menurunkan biaya. Namun ada satu kendala — bahkan l2 menghadapi batasan yang menghambat efisiensi dan skalabilitasnya. EIP-4844 adalah langkah selanjutnya dalam meningkatkan potensi l2 dan menyelaraskan Ethereum dengan peta jalan penskalaannya.

Jadi, tentang apa sebenarnya EIP-4844 itu? Bagaimana tepatnya hal ini membantu penskalaan l2? Kemungkinan baru apa yang dibukanya? Dan benarkah hal ini dapat mengurangi biaya transaksi di l2 hingga lebih dari 90%?

#### Apa itu EIP-4844 dan proto-danksharding (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

Sebagai pengingat, EIP adalah singkatan dari Ethereum Improvement Proposal (Proposal Peningkatan Ethereum), sebuah proses di mana pengembang dapat menyarankan perubahan pada protokol Ethereum. EIP-4844, secara khusus, mengusulkan jenis transaksi baru yang dapat secara signifikan meningkatkan cara data ditangani dan diproses di Ethereum. Anda mungkin juga pernah mendengar nama "proto-danksharding," yang sekarang digunakan secara bergantian dengan EIP-4844.

Proto-danksharding adalah implementasi awal dari danksharding penuh. Ini meletakkan dasar untuk penskalaan lebih lanjut dengan danksharding di masa depan. Hal ini dicapai dengan mengimplementasikan sebagian besar logika dan "kerangka kerja" yang membentuk spesifikasi danksharding penuh, tanpa mengimplementasikan sharding data yang sebenarnya. Melakukannya dengan cara ini memungkinkan transisi yang lebih mudah dan tidak terlalu mengganggu yang dapat terjadi melalui beberapa pembaruan jaringan tanpa menimbulkan terlalu banyak risiko pada Ethereum dalam satu pembaruan.

Gagasan inti di balik EIP-4844 adalah untuk mendukung masa depan Ethereum yang "berpusat pada rollup". Rollup adalah solusi lapisan 2 (l2) yang memproses transaksi di luar rantai utama Ethereum tetapi mewarisi keamanan Ethereum. EIP-4844 bertujuan untuk membuat rollup menjadi lebih murah dan lebih efisien dengan memperkenalkan jenis transaksi baru yang dapat dimanfaatkan oleh rollup untuk memungkinkan mereka menurunkan biaya operasionalnya secara signifikan. Hal ini pada gilirannya akan memungkinkan aplikasi yang dibangun di atas rollup menjadi jauh lebih murah untuk digunakan dan meningkatkan adopsi seluruh ekosistem Ethereum.

Bayangkan melakukan tukar DEX di salah satu rollup. Jika biaya saat ini untuk melakukan operasi semacam itu adalah, katakanlah, $1, kemungkinan besar akan turun menjadi sekitar $0,10 pasca-EIP-4844. Namun, dampak dalam contoh ini memiliki beberapa peringatan yang akan kita bahas nanti di video.

EIP-4844 bersama dengan beberapa EIP lainnya akan disertakan dalam pembaruan jaringan Dencun yang akan datang.

#### Detail teknis (2:50) {#technical-details-250}

Sekarang, mari kita lihat lebih dekat bagaimana EIP-4844 bekerja.

EIP-4844 memperkenalkan jenis transaksi baru ke Ethereum yang menerima "blob" data untuk disimpan di simpul suar untuk waktu yang singkat. Perubahan ini kompatibel ke depan dengan peta jalan penskalaan Ethereum, dan blob cukup kecil untuk menjaga penggunaan disk tetap terkendali. Transaksi blob berada dalam format yang sama dengan yang diharapkan ada dalam spesifikasi danksharding akhir.

Hal ini hadir bersamaan dengan "pasar biaya blob," yang memastikan bahwa ruang blob digunakan secara efisien dan tetap layak secara ekonomi. Hal ini dicapai dengan memperkenalkan gas blob sebagai jenis gas baru. Ini independen dari gas normal. Untuk saat ini, hanya blob yang dihargai dalam gas blob.

Blob adalah 4.096 elemen bidang yang masing-masing berukuran 32 bita. Batas blob per blok dikendalikan oleh parameter MAX_BLOBS_PER_BLOCK. Batas ini dapat dimulai dari yang rendah dan tumbuh melalui beberapa pembaruan jaringan. Awalnya, Dencun menargetkan 6 blob per blok. 4.096 × 32 bita × 6 per blok = 0,75 MB per blok.

Blob disimpan di simpul suar (lapisan konsensus), bukan di lapisan eksekusi. Pekerjaan sharding di masa depan hanya memerlukan perubahan pada simpul suar, yang memungkinkan lapisan eksekusi untuk mengerjakan inisiatif lain secara paralel.

Blob berumur pendek dan dipangkas setelah sekitar dua minggu. Blob tersedia cukup lama bagi semua aktor rollup untuk mengambilnya, tetapi cukup singkat untuk menjaga penggunaan disk tetap terkendali. Hal ini memungkinkan blob dihargai lebih murah daripada data panggilan, yang merupakan data yang disimpan dalam riwayat selamanya.

Tulang punggung kriptografi dari EIP-4844 adalah komitmen KZG. Tanpa membahas terlalu dalam, komitmen ini memungkinkan penyertaan data yang efisien dan aman, yang sangat penting untuk fungsionalitas transaksi blob. Dengan cara ini, hanya komitmen terhadap blob yang harus diinterpretasikan oleh EVM di lapisan eksekusi dan bukan blob itu sendiri.

Untuk menghasilkan rahasia bersama untuk komitmen KZG, sebuah upacara berbasis peramban yang didistribusikan secara luas dijalankan sehingga semua peserta jaringan Ethereum memiliki kesempatan untuk memastikan bahwa rahasia tersebut dihasilkan dengan benar dan aman.

EIP-4844 menambahkan prakompilasi baru yang disebut evaluasi titik yang memverifikasi bukti KZG yang mengklaim bahwa sebuah blob (diwakili oleh sebuah komitmen) mengevaluasi ke nilai tertentu pada titik tertentu.

Jadi bagaimana tepatnya semua ini berlaku untuk rollup? Dengan ruang blob yang baru, rollup akan dapat menempatkan data blok mereka ke dalam blob daripada data panggilan yang lebih mahal yang telah digunakan untuk tujuan ini sejauh ini. Memanfaatkan ruang blob berumur pendek di lapisan konsensus dimungkinkan karena rollup hanya membutuhkan data agar tersedia cukup lama untuk memastikan aktor yang jujur dapat membangun ruang rollup.

Dalam kasus rollup optimis seperti Optimism atau Arbitrum, mereka hanya perlu menyediakan data yang mendasarinya selama jendela tantangan penipuan terbuka. Bukti penipuan dapat memverifikasi transisi dalam langkah-langkah yang lebih kecil, memuat paling banyak beberapa nilai blob pada satu waktu melalui data panggilan.

Rollup ZK akan memberikan dua komitmen pada transaksi atau data delta state mereka: komitmen blob dan komitmen rollup ZK itu sendiri menggunakan sistem bukti apa pun yang digunakan rollup secara internal. Mereka juga akan menggunakan protokol bukti kesetaraan, menggunakan prakompilasi evaluasi titik yang disebutkan sebelumnya, untuk membuktikan bahwa kedua komitmen tersebut merujuk pada data yang sama.

#### Dampak (6:25) {#impact-625}

Dampak EIP-4844 pada ekosistem Ethereum tidak dapat dilebih-lebihkan. Sebagai permulaan, ini secara dramatis meningkatkan skalabilitas solusi lapisan 2 (l2), mengurangi biaya operasionalnya dan membuatnya lebih kompetitif dengan rantai blok alternatif lain yang murah. Pengurangan biaya operasional dimungkinkan karena sebagian besar biaya yang saat ini ditanggung oleh rollup disebabkan oleh biaya yang dibayarkan untuk data panggilan.

Selain itu, EIP-4844 meletakkan dasar untuk penskalaan lebih lanjut melalui danksharding penuh. Pembaruan di masa depan ini akan membagi jaringan Ethereum menjadi beberapa shard data, yang masing-masing mampu menyimpan data secara independen, yang selanjutnya meningkatkan kapasitas jaringan.

Dengan turunnya biaya operasional, kita dapat menyaksikan gelombang solusi lapisan 2 (l2) baru yang bermunculan, menarik pengembang untuk membangun aplikasi inovatif di atas rollup.

Terkait penurunan biaya transaksi pada rollup, yang diilustrasikan oleh contoh tukar DEX kita sebelumnya, situasinya cukup kompleks. Dengan asumsi permintaan untuk rollup tetap konstan pasca-EIP-4844, kita memang dapat mengantisipasi pengurangan biaya yang signifikan bagi pengguna. Namun, peningkatan skalabilitas dapat menyebabkan efek ekonomi yang tidak terduga. Misalnya, biaya transaksi yang lebih rendah untuk pengguna akhir mungkin mendorong lebih banyak orang untuk menggunakan rollup, yang selanjutnya meningkatkan permintaan pada sumber daya jaringan dan berpotensi menaikkan biaya transaksi.

Satu hal yang pasti — bahkan jika hasil utamanya adalah peningkatan laju pemrosesan transaksi dan biaya transaksi tetap sama, EIP-4844 meletakkan dasar untuk skalabilitas yang lebih besar di masa depan yang pada akhirnya akan menghasilkan transaksi yang lebih murah bagi pengguna.

#### Ringkasan (8:04) {#summary-804}

Komunitas Ethereum telah menyelesaikan pengujian EIP-4844 di berbagai testnet, dengan peluncuran Mainnet yang diharapkan pada tanggal 13 Maret. Ini adalah langkah monumental menuju pencapaian skalabilitas yang tak tertandingi untuk Ethereum. Kita sudah dapat melihat sebagian besar l2 utama berkomitmen untuk mulai menggunakan ruang blob baru segera setelah pembaruan Dencun terjadi.

Kesimpulannya, EIP-4844 lebih dari sekadar pembaruan. Ini adalah momen penting dalam perjalanan Ethereum menuju rantai blok yang lebih terukur, efisien, dan ramah pengguna. Dengan mengurangi biaya dan meningkatkan efisiensi solusi lapisan 2 (l2), Ethereum siap untuk memperkuat posisinya sebagai platform terkemuka untuk aplikasi terdesentralisasi.