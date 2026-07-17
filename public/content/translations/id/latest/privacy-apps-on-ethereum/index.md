---
title: "Cara membangun aplikasi privasi di Ethereum dengan bukti tanpa pengetahuan"
description: "Satu pola yang dapat digunakan kembali menggerakkan pemungutan suara anonim, mixer, airdrop, dan sistem keanggotaan di Ethereum. Pelajari siklus komitmen-nullifier-bukti dan bagaimana perkakas zero-knowledge membuatnya praktis untuk dibangun saat ini."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "bukti tanpa pengetahuan"
  - "privasi"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-2.png
breadcrumb: Aplikasi privasi di Ethereum
lang: id
---

Ethereum secara desain sangatlah publik. Setiap alamat, saldo, transaksi, panggilan kontrak, dan peristiwa dapat dilihat oleh siapa saja yang memiliki penjelajah blok. Transparansi tersebut berguna ketika Anda menginginkan kemampuan verifikasi. Hal ini menjadi masalah ketika pengguna perlu memilih, mengklaim, melakukan penarikan, atau membuktikan keanggotaan tanpa menautkan setiap tindakan kembali ke dompet yang sama.

Keanggotaan anonim adalah pola yang dapat digunakan kembali yang menggerakkan sebagian besar aplikasi privasi di Ethereum. Orang-orang mendaftar terlebih dahulu, lalu kemudian membuktikan bahwa mereka termasuk dalam grup tersebut tanpa mengungkapkan anggota yang mana mereka. Bukti tanpa pengetahuan (ZKP) adalah jembatan antara dompet pendaftaran dan dompet yang bertindak, dan jembatan tersebut tidak mengungkapkan siapa yang melintasinya.

Produk di sekitarnya berubah, tetapi kerangka privasi tetap sama.

## Pola tersebut, dijelaskan melalui pemungutan suara anonim {#the-pattern-explained-through-anonymous-voting}

Pola ini memiliki tiga bagian. Sebuah komitmen mendaftarkan setiap anggota. Sebuah pohon Merkle mengubah komitmen-komitmen tersebut menjadi sebuah kerumunan. Sebuah bukti dan sebuah nullifier memungkinkan satu anggota bertindak satu kali tanpa mengungkapkan anggota mana yang bertindak.

### Langkah pertama: mendaftar {#step-one-registering}

Setiap pemilih membuat dua nilai privat secara offchain, yaitu rahasia dan nullifier. Pemilih menge-hash nilai-nilai tersebut menjadi sebuah komitmen publik, lalu mendaftarkan komitmen tersebut secara onchain.

Komitmen tersebut adalah catatan pendaftaran publik. Rahasia dan nullifier adalah catatan privat yang dibutuhkan pemilih nantinya. Jika catatan tersebut hilang, pemilih tidak dapat membuktikan keanggotaan. Jika bocor, orang lain mungkin dapat memilih menggantikan pengguna tersebut.

Karena komitmen tersebut adalah sebuah hash, pengamat tidak dapat memulihkan nilai-nilai privat di dalamnya. Komitmen tersebut menyatakan "seseorang telah mendaftar" tanpa mengungkapkan siapa yang nantinya akan menggunakan pendaftaran tersebut.

### Langkah kedua: membangun kerumunan {#step-two-building-the-crowd}

Seiring bertambahnya pemilih yang mendaftar, aplikasi mengumpulkan komitmen mereka ke dalam sebuah pohon Merkle. Pohon Merkle mengompresi daftar nilai yang panjang menjadi satu hash tunggal, yang disebut akar. Ubah nilai apa pun dalam daftar tersebut dan hash-nya akan berubah, sehingga akar tersebut bertindak sebagai ringkasan yang tahan terhadap gangguan dari keseluruhan himpunan.

Pohon tersebut adalah himpunan anonimitas Anda. Jika ada sepuluh pengguna di dalam pohon tersebut, seorang pengamat dapat mempersempit tindakan selanjutnya menjadi salah satu dari sepuluh pengguna tersebut. Jika ada sepuluh ribu pengguna di dalam pohon tersebut, tindakan tersebut jauh lebih sulit untuk ditautkan ke satu orang. Aplikasi privat dengan himpunan anonimitas yang kecil biasanya tidak terlalu privat, meskipun kriptografi-nya sudah benar.

### Langkah ketiga: bertindak secara anonim {#step-three-acting-anonymously}

Saat jajak pendapat dibuka, pemilih tidak boleh memilih dari dompet yang sama yang mendaftarkan komitmen tersebut. Memilih dari dompet pendaftaran akan menautkan suara langsung kembali ke pendaftar dan membatalkan upaya privasi. Sebaliknya, pemilih membuat sebuah bukti tanpa pengetahuan (ZKP). Pernyataan tersebut dienkode sebagai sebuah sirkuit yang menyatakan, "Saya mengetahui nilai-nilai privat yang menghasilkan komitmen terdaftar, dan saya mengungkapkan hash nullifier yang benar untuk jajak pendapat ini."

Bukti tersebut meyakinkan kontrak pemverifikasi bahwa pernyataan tersebut benar. Bukti tersebut tidak mengungkapkan rahasia, nullifier, atau komitmen mana yang digunakan.

Nullifier adalah apa yang mencegah pemungutan suara ganda. Bersamaan dengan bukti tersebut, pemilih memublikasikan sebuah hash nullifier. Kontrak pemungutan suara menyimpan hash tersebut setelah menerima suara. Jika catatan privat yang sama digunakan lagi untuk jajak pendapat yang sama, hal itu akan menghasilkan hash nullifier yang sama, dan kontrak akan menolak suara kedua. Dikombinasikan dengan bukti tersebut, hal ini membuat kontrak hanya mengetahui bahwa beberapa pemilih terdaftar telah bertindak satu kali, bukan siapa pemilih tersebut.

## Gerbang yang dapat digunakan kembali {#the-reusable-gate}

Pasangan bukti-dan-nullifier yang sama tersebut berfungsi lebih dari sekadar pemungutan suara. Singkirkan cerita pemungutan suara tersebut dan apa yang Anda miliki adalah sebuah gerbang privasi untuk fungsi-fungsi kontrak pintar.

Sebelum fungsi berjalan, kontrak memeriksa akar Merkle, memverifikasi bukti, mengonfirmasi bahwa hash nullifier belum digunakan, dan mengikat input publik ke aplikasi, rantai, jajak pendapat, klaim, atau penarikan yang tepat. Jika pemeriksaan tersebut berhasil, kontrak menandai nullifier sebagai telah digunakan dan menjalankan sisa fungsi tersebut.

Letakkan gerbang tersebut di depan sebuah pemungutan suara dan Anda mendapatkan pemungutan suara anonim. Letakkan di depan sebuah klaim airdrop dan Anda mendapatkan klaim anonim. Letakkan di depan sebuah fungsi penarikan dan Anda mendapatkan inti dari alur penarikan bergaya mixer. Pohon komitmen yang sama, ide nullifier yang sama, pola bukti yang sama. Yang berubah adalah badan fungsi dan logika aplikasi di sekitarnya.

## Apa yang berjalan di mana {#what-runs-where}

Pekerjaan privat biasanya terjadi secara offchain. Pengguna menyimpan catatan tersebut, dan aplikasi klien membangun Saksi dan menjalankan pembukti untuk menghasilkan bukti. Sebuah pengindeks melacak komitmen dan akar Merkle. Sebuah pemaket mempropagasi OperasiPengguna secara onchain dan juru bayar ERC-4337 mensponsori gas, sehingga dompet yang baru tidak memerlukan ETH dari dompet pengguna yang sudah diketahui terlebih dahulu.

Penegakan publik terjadi secara onchain. Kontrak pemverifikasi memeriksa bukti tersebut. Kontrak aplikasi memeriksa akar yang valid dan nullifier yang belum digunakan, menyimpan hash nullifier, dan menjalankan tindakan publik.

UX yang sensitif adalah penanganan catatan. Perlakukan rahasia dan nullifier seperti kunci. Jangan menaruhnya di analitik, log, URL, laporan kesalahan, atau telemetri sisi server yang normal. Begitu catatan tersebut bocor, privasi akan hilang, tidak peduli seberapa kuat bukti tersebut.

## Perkakas telah mengejar ketertinggalan {#the-tooling-caught-up}

Anda tidak perlu mengodekan kriptografi yang mendasarinya secara manual. Jalur yang umum adalah menulis sirkuit dalam bahasa zero-knowledge tingkat tinggi, menghasilkan pemverifikasi Solidity, dan memanggil pemverifikasi tersebut dari kontrak aplikasi.

Tumpukan yang tepat bergantung pada pekerjaannya. Circom dengan snarkjs adalah jalur yang telah lama mapan untuk sirkuit tingkat aplikasi. Noir dengan Barretenberg adalah jalur yang lebih baru dan ramah pengembang. Halo2 dan gnark adalah pustaka sirkuit tingkat rendah. zkVM seperti RISC Zero atau SP1 membuktikan program normal, tetapi bisa lebih mahal untuk dibuktikan daripada sirkuit kustom kecil.

Untuk keanggotaan anonim, gunakan protokol yang sudah ada sebelum menulis sirkuit Anda sendiri. Semaphore memaketkan keanggotaan grup dan pencegahan penggunaan ganda berbasis nullifier ke dalam kontrak dan pustaka JavaScript. Untuk pemungutan suara privat dan tata kelola, MACI adalah jalur khusus karena menambahkan properti anti-kolusi. Protokol yang matang sering kali lebih aman daripada sirkuit baru.

## Bukti saja tidak cukup {#the-proof-is-not-enough}

Bahkan bukti yang sempurna pun akan gagal jika alur dompet membocorkan tautannya. Mendaftar dari dompet A dan kemudian bertindak dari dompet A, dan siapa pun yang mengawasi dapat menghubungkan transaksi tersebut. Mendanai dompet B dari dompet A tepat sebelum bertindak, dan transaksi pendanaan tersebut menciptakan masalah yang sama.

Inilah sebabnya mengapa pemaket dan juru bayar menjadi penting. Dompet yang bertindak haruslah baru, dan tidak perlu menerima ETH dari dompet yang coba dipisahkan oleh pengguna dari tindakan tersebut.

Masalah yang sama juga ada secara offchain. Mengirimkan transaksi pendaftaran dan tindakan dari alamat IP, penyedia RPC, atau sesi yang sama dapat melemahkan privasi yang diberikan oleh sirkuit. Frontend dapat bocor melalui analitik, penyimpanan lokal, dan log dukungan. Sebuah bukti tanpa pengetahuan (ZKP) menyembunyikan nilai-nilai di dalam bukti tersebut. Bukti tersebut tidak menyembunyikan segala sesuatu di sekitar transaksi.

Input publik adalah tempat lain di mana aplikasi privasi gagal. Apa pun yang ditandai sebagai publik di dalam sirkuit, dipancarkan sebagai sebuah peristiwa, disertakan dalam data panggilan, atau disimpan oleh kontrak dapat dilihat. Tinjau input publik secermat kontrol akses pada sebuah kontrak Solidity.

## Apa yang diubah oleh hal ini bagi para pembangun {#what-this-changes-for-builders}

Privasi di Ethereum dapat diluncurkan. Para pembangun dapat menyusun bagian-bagian tersebut menjadi aplikasi nyata. Tumpukannya adalah sebuah sirkuit untuk pernyataan privat, sebuah pemverifikasi untuk pemeriksaan bukti, sebuah kontrak aplikasi untuk aturan publik, sebuah pengindeks untuk data Merkle, dan sebuah pemaket ditambah juru bayar untuk pengiriman yang tidak dapat ditautkan dan sponsor gas.

Bagian yang sulit adalah desain produk, manajemen kunci, kebersihan metadata, audit, dan menumbuhkan himpunan anonimitas. Jika salah satu dari hal tersebut salah, privasi yang diberikan oleh bukti tersebut akan hilang.

## Bacaan lebih lanjut {#further-reading}

1. [Bukti tanpa pengetahuan (ethereum.org)](https://ethereum.org/zero-knowledge-proofs/)
2. [Dokumentasi Semaphore](https://docs.semaphore.pse.dev/)
3. [Dokumentasi MACI](https://maci.pse.dev/)
4. [Dokumentasi Circom](https://docs.circom.io/)
5. [Dokumentasi Noir](https://noir-lang.org/)
6. [Buku Halo2](https://zcash.github.io/halo2/)
7. [Dokumentasi gnark](https://docs.gnark.consensys.io/)
8. [Dokumentasi RISC Zero](https://dev.risczero.com/api/)
9. [Dokumentasi SP1](https://docs.succinct.xyz/docs/sp1/introduction)
10. [EIP-4337: Abstraksi Akun melalui Kontrak EntryPoint](https://eips.ethereum.org/EIPS/eip-4337)