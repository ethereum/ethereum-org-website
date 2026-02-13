---
title: Algoritme Penambangan
description: Tinjauan mendalam tentang algoritma yang digunakan untuk penambangan Ethereum.
lang: id
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Proof-of-work tidak lagi mendasari mekanisme konsensus Ethereum, yang berarti penambangan telah dimatikan. Sebaliknya, Ethereum diamankan oleh validator yang mempertaruhkan ETH. Anda dapat mulai menaruhkan ETH Anda hari ini. Read more on <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake</a>, and <a href='/staking/'>staking</a>. Halaman ini hanya untuk kepentingan sejarah.
</AlertDescription>
</AlertContent>
</Alert>

Penambangan Ethereum menggunakan algoritma yang dikenal dengan nama Ethash. Ide dasar dari algoritma ini adalah bahwa penambang mencoba menemukan masukan nonce dengan komputasi brute force sehingga hash yang dihasilkan lebih kecil dari ambang batas yang ditentukan oleh kesulitan yang dihitung. Tingkat kesulitan ini dapat disesuaikan secara dinamis, memungkinkan produksi blok terjadi pada interval yang teratur.

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, kami menyarankan Anda untuk terlebih dahulu membaca tentang [konsensus bukti kerja](/developers/docs/consensus-mechanisms/pow) dan [penambangan](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto adalah algoritma penelitian pendahulu untuk penambangan Ethereum yang kemudian digantikan oleh Ethash. Dagger Hashimoto merupakan gabungan dari dua algoritma berbeda: Dagger dan Hashimoto. Dagger Hashimoto hanya pernah menjadi implementasi penelitian dan digantikan oleh Ethash pada saat Jaringan Utama Ethereum diluncurkan.

[Dagger](http://www.hashcash.org/papers/dagger.html) melibatkan pembuatan [Grafik Asiklik Berarah](https://en.wikipedia.org/wiki/Directed_acyclic_graph), yang irisan acaknya di-hash menjadi satu. Prinsip intinya adalah setiap nonce hanya membutuhkan bagian kecil dari pohon data total yang besar. Menghitung ulang subcabang untuk setiap nonce sulit dilakukan dalam penambangan - oleh karena itu perlunya menyimpan cabangnya - tetapi cukup baik untuk verifikasi nonce tunggal. Dagger dirancang sebagai alternatif terhadap algoritma yang sudah ada seperti Scrypt, yang sulit untuk diverifikasi ketika tingkat kekerasan memori mereka meningkat ke tingkat yang benar-benar aman. Namun, Dagger rentan terhadap akselerasi perangkat keras memori bersama dan dihapus demi mendukung jalur penelitian lainnya.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) adalah sebuah algoritma yang menambahkan resistansi ASIC dengan terikat I/O (yaitu, pembacaan memori adalah faktor pembatas dalam proses penambangan). Teorinya adalah bahwa RAM lebih tersedia daripada komputasi; miliaran dolar dalam penelitian telah menyelidiki optimisasi RAM untuk berbagai kasus penggunaan, yang sering melibatkan pola akses yang mendekati acak (oleh karena itu disebut "random access memory"). Akibatnya, RAM yang sudah ada kemungkinan besar cukup mendekati optimal untuk mengevaluasi algoritma tersebut. Hashimoto menggunakan blockchain sebagai sumber data, secara bersamaan memenuhi (1) dan (3) di atas.

Dagger-Hashimoto menggunakan versi yang dimodifikasi dari algoritma Dagger dan Hashimoto. Perbedaan antara Dagger Hashimoto dan Hashimoto adalah bahwa, daripada menggunakan blockchain sebagai sumber data, Dagger Hashimoto menggunakan kumpulan data yang dihasilkan kustom, yang diperbarui berdasarkan data blok setiap N blok. Kumpulan data dihasilkan menggunakan algoritma Dagger, memungkinkan perhitungan subset yang spesifik untuk setiap nonce dalam algoritma verifikasi klien ringan dengan efisien. Perbedaan antara Dagger Hashimoto dan Dagger adalah, tidak seperti pada Dagger asli, kumpulan data yang digunakan untuk mengakses blok bersifat semipermanen, hanya diperbarui pada interval sesekali (misalnya, seminggu sekali). This means that the portion of the effort of generating the dataset is close to zero, so Sergio Lerner’s arguments regarding shared memory speedups become negligible.

Selengkapnya tentang [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash adalah algoritma penambangan yang benar-benar digunakan pada jaringan utama Ethereum di bawah arsitektur proof-of-work yang sekarang sudah usang. Ethash pada dasarnya adalah nama baru yang diberikan kepada versi tertentu dari Dagger-Hashimoto setelah algoritma tersebut mengalami pembaruan signifikan, sambil tetap mewarisi prinsip-prinsip dasar pendahulunya. Jaringan Utama Ethereum hanya pernah menggunakan Ethash - Dagger Hashimoto adalah versi R&D dari algoritma penambangan yang digantikan sebelum penambangan dimulai di Jaringan Utama Ethereum.

Selengkapnya tentang [Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
