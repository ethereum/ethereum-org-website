---
title: Algoritma penambangan
description: Tinjauan mendetail tentang algoritma yang digunakan untuk penambangan Ethereum.
lang: id
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Proof-of-work tidak lagi mendasari mekanisme konsensus Ethereum, yang berarti penambangan telah dimatikan. Sebagai gantinya, Ethereum diamankan oleh validator yang melakukan stake ETH. Anda dapat mulai mengunci ETH Anda hari ini. Baca lebih lanjut tentang <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake</a>, dan <a href='/staking/'>mengunci</a>. Halaman ini hanya untuk kepentingan sejarah.
</AlertDescription>
</AlertContent>
</Alert>

Penambangan Ethereum menggunakan algoritma yang dikenal sebagai Ethash. Gagasan mendasar dari algoritma ini adalah bahwa penambang mencoba menemukan input nonce menggunakan komputasi brute force sehingga hash yang dihasilkan lebih kecil dari ambang batas yang ditentukan oleh tingkat kesulitan yang dihitung. Tingkat kesulitan ini dapat disesuaikan secara dinamis, memungkinkan produksi blok terjadi pada interval yang teratur.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [konsensus proof-of-work](/developers/docs/consensus-mechanisms/pow) dan [penambangan](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto adalah algoritma penelitian pendahulu untuk penambangan Ethereum yang digantikan oleh Ethash. Ini adalah penggabungan dari dua algoritma yang berbeda: Dagger dan Hashimoto. Ini hanya pernah menjadi implementasi penelitian dan digantikan oleh Ethash pada saat Mainnet Ethereum diluncurkan.

[Dagger](http://www.hashcash.org/papers/dagger.html) melibatkan pembuatan [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph), yang irisan acaknya di-hash bersama-sama. Prinsip intinya adalah bahwa setiap nonce hanya membutuhkan sebagian kecil dari total pohon data yang besar. Menghitung ulang sub-pohon untuk setiap nonce sangat memberatkan untuk penambangan - karenanya perlu menyimpan pohon tersebut - tetapi tidak masalah untuk verifikasi nilai satu nonce. Dagger dirancang untuk menjadi alternatif dari algoritma yang ada seperti Scrypt, yang membutuhkan memori besar (memory-hard) tetapi sulit untuk diverifikasi ketika kebutuhan memorinya meningkat ke tingkat yang benar-benar aman. Namun, Dagger rentan terhadap akselerasi perangkat keras memori bersama dan ditinggalkan demi jalur penelitian lain.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) adalah algoritma yang menambahkan ketahanan ASIC dengan menjadi terikat I/O (yaitu, pembacaan memori adalah faktor pembatas dalam proses penambangan). Teorinya adalah bahwa RAM lebih tersedia daripada komputasi; penelitian bernilai miliaran dolar telah menyelidiki pengoptimalan RAM untuk berbagai kasus penggunaan, yang sering kali melibatkan pola akses yang hampir acak (karenanya disebut “random access memory”). Akibatnya, RAM yang ada kemungkinan cukup mendekati optimal untuk mengevaluasi algoritma. Hashimoto menggunakan blockchain sebagai sumber data, secara bersamaan memenuhi (1) dan (3) di atas.

Dagger-Hashimoto menggunakan versi algoritma Dagger dan Hashimoto yang telah diubah. Perbedaan antara Dagger Hashimoto dan Hashimoto adalah bahwa, alih-alih menggunakan blockchain sebagai sumber data, Dagger Hashimoto menggunakan kumpulan data yang dibuat khusus, yang diperbarui berdasarkan data blok setiap N blok. Kumpulan data dihasilkan menggunakan algoritma Dagger, memungkinkan penghitungan subset yang efisien khusus untuk setiap nonce untuk algoritma verifikasi klien ringan. Perbedaan antara Dagger Hashimoto dan Dagger adalah bahwa, tidak seperti pada Dagger asli, kumpulan data yang digunakan untuk menanyakan blok bersifat semi-permanen, hanya diperbarui pada interval tertentu (misalnya, seminggu sekali). Ini berarti bahwa porsi upaya untuk menghasilkan kumpulan data mendekati nol, sehingga argumen Sergio Lerner mengenai percepatan memori bersama dapat diabaikan.

Lebih lanjut tentang [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash adalah algoritma penambangan yang benar-benar digunakan di Mainnet Ethereum yang sebenarnya di bawah arsitektur proof-of-work yang sekarang sudah tidak digunakan lagi. Ethash secara efektif adalah nama baru yang diberikan pada versi spesifik Dagger-Hashimoto setelah algoritma tersebut diperbarui secara signifikan, sambil tetap mewarisi prinsip-prinsip dasar pendahulunya. Mainnet Ethereum hanya pernah menggunakan Ethash - Dagger Hashimoto adalah versi R&D dari algoritma penambangan yang digantikan sebelum penambangan dimulai di Mainnet Ethereum.

[Lebih lanjut tentang Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_