---
title: "Bagaimana cara kerja penarikan Ethereum?"
description: "Bagaimana cara kerja penarikan staking di Ethereum setelah peningkatan Shanghai/Capella, mencakup proses teknis, antrean penarikan, dan apa yang perlu diketahui oleh staker tentang mengakses ETH yang di-stake mereka."
lang: id
youtubeId: "RwwU3P9n3uo"
uploadDate: 2023-03-30
duration: "0:11:39"
educationLevel: intermediate
topic:
  - "cara-kerja-ethereum"
  - "staking"
  - "penarikan"
format: explainer
author: Finematics
breadcrumb: "Penarikan Staking"
---

Sebuah penjelasan oleh **Finematics** yang mencakup bagaimana cara kerja penarikan staking di Ethereum setelah peningkatan Shanghai/Capella, termasuk mekanisme penarikan sebagian dan penuh, kesalahpahaman umum, dan implikasinya bagi ekosistem staking.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=RwwU3P9n3uo) yang diterbitkan oleh Finematics. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

#### Rantai suar (0:31) {#the-beacon-chain-031}

Dengan peningkatan Shanghai/Capella yang semakin dekat, ada banyak diskusi tentang penarikan staking Ethereum dan apa artinya ini bagi ekosistem Ethereum secara keseluruhan.

Mari kita mulai dengan memahami bagaimana kita sampai di sini dan mengapa penarikan staking tidak diaktifkan ketika Ethereum beralih dari Bukti Kerja (PoW) ke Bukti Kepemilikan (PoS).

Transisi ke Bukti Kepemilikan (PoS) terjadi dalam beberapa langkah untuk meminimalkan jumlah perubahan besar yang terjadi pada saat yang bersamaan. Pendekatan ini sangat penting, terutama untuk jaringan mapan yang menyelesaikan nilai triliunan dolar per tahun. Langkah-langkah paling signifikan adalah: peluncuran Rantai suar, dan The Merge.

Peluncuran Rantai suar pada tahun 2020 menciptakan fondasi untuk transisi dengan membuat lapisan konsensus Bukti Kepemilikan (PoS) yang terpisah, berjalan berdampingan dengan rantai Bukti Kerja (PoW) Ethereum. Meluncurkan Rantai suar lebih awal memungkinkan akumulasi ETH yang cukup untuk mengamankan jaringan sebelum menyelesaikan transaksi bernilai nyata. Hal ini juga memungkinkan pengujian model konsensus Bukti Kepemilikan (PoS) yang baru untuk periode yang diperpanjang dengan dana nyata yang di-stake.

Para peserta jaringan awal mengkomitmenkan jutaan ETH untuk mengamankan jaringan Bukti Kepemilikan (PoS) Ethereum meskipun tahu bahwa mereka tidak akan dapat melakukan penarikan ETH mereka sampai waktu yang jauh di kemudian hari.

Langkah besar berikutnya, The Merge, menyatukan lapisan konsensus Bukti Kepemilikan (PoS) dengan lapisan eksekusi. Hal ini memungkinkan untuk akhirnya meninggalkan Bukti Kerja (PoW) dan hanya mempertahankan satu rantai kanonikal — Ethereum — yang kini diamankan oleh jutaan ETH yang di-stake. The Merge sejauh ini merupakan perubahan terbesar yang pernah ada pada Ethereum. Karena sifat peningkatannya, hal ini harus terjadi tanpa waktu henti.

Untuk meminimalkan risiko, ruang lingkup The Merge dikurangi, dan tidak ada fitur lain — di luar peralihan Bukti Kerja (PoW) ke Bukti Kepemilikan (PoS) — yang disertakan sebagai bagian dari peningkatan. "Pemotongan" terbesar yang harus dilakukan berdampak pada penarikan, yang menjadi fokus dari peningkatan Shanghai/Capella yang akan datang.

#### Penarikan (2:09) {#withdrawals-209}

Penarikan staking, seperti namanya, akan memungkinkan staker untuk melakukan penarikan ETH mereka yang terkunci. Ada dua jenis penarikan: "sebagian" dan "penuh."

**Penarikan sebagian** terjadi ketika validator melakukan penarikan imbalan yang terakumulasi — saldo ekstra di atas saldo efektif maksimum sebesar 32 ETH. Penarikan sebagian juga dapat disebut sebagai "pembayaran imbalan" atau "pembayaran saldo berlebih."

**Penarikan penuh** terjadi ketika validator telah menyelesaikan proses keluar dan seluruh saldo ditarik. Hal ini hanya terjadi ketika validator keluar dari sistem baik secara sukarela atau dengan dihapus secara paksa dalam proses yang disebut "pemotongan."

Setelah diaktifkan, penarikan staking akan didistribusikan secara otomatis setiap beberapa hari. Selain itu, proses penarikan dimulai pada lapisan konsensus, sehingga tidak ada biaya transaksi yang diperlukan pada langkah mana pun.

Untuk mulai melakukan penarikan imbalan staking mereka, seorang validator harus memberikan alamat penarikan mereka hanya sekali. Mengingat penarikan memengaruhi lapisan konsensus dan lapisan eksekusi Ethereum, kedua bagian jaringan harus diperbarui. "Shanghai" adalah nama peningkatan lapisan eksekusi yang berisi penarikan, yang ditentukan dalam EIP-4895. "Capella" adalah nama peningkatan lapisan konsensus pasangannya, yang diaktifkan pada saat yang sama. Kedua peningkatan ini terkadang juga disebut sebagai "Shapella."

#### Mekanisme (3:40) {#mechanics-340}

Dalam ekosistem Ethereum, setiap validator memiliki nomor indeks yang sesuai. Selain itu, mereka juga memiliki dua jenis kredensial penarikan, yang didefinisikan sebagai `0x00` atau `0x01`.

`0x00` menunjukkan bahwa validator tertentu tidak memiliki alamat penarikan yang terkait. Kredensial ini diturunkan sebagai hash dari kunci publik BLS dengan byte pertamanya ditukar dengan byte nol — itulah asal namanya.

`0x01` berarti bahwa validator memberikan alamat penarikan mereka. Kredensial penarikan ini direpresentasikan sebagai `0x01` diikuti oleh 11 byte nol, lalu alamat Ethereum yang dipilih.

Untuk mengaktifkan penarikan, validator dengan kredensial `0x00` perlu menandatangani pesan "BLSToExecutionChange". Hal ini akan dimungkinkan setelah peningkatan Capella.

Setelah penarikan diaktifkan, validator yang mengusulkan blok akan memindai secara linier melalui indeks validator untuk menemukan 16 validator pertama dengan kredensial `0x01` yang:

- Memiliki saldo yang melebihi 32 ETH (imbalan validator yang masih harus dibayar)
- Dapat "ditarik" (telah sepenuhnya keluar dari set validator)

Pencarian linier berhenti setelah menemukan 16 validator yang cocok dengan kriteria ini atau setelah 16.384 iterasi. Algoritma mengingat indeks di mana pencarian berhenti, sehingga validator berikutnya yang mengusulkan blok dapat melanjutkan dari indeks tersebut. Setelah mencapai indeks terakhir, algoritma mulai dari awal — indeks 0.

Analogi yang baik adalah jam analog di mana jarum menunjuk ke jam, bergerak ke satu arah, tidak melewatkan jam apa pun, dan akhirnya kembali ke awal lagi setelah angka terakhir tercapai.

Setelah pemindaian selesai, validator membuat daftar penarikan untuk disertakan dalam muatan eksekusi mereka. Setiap item dalam daftar berisi:

- **WithdrawalIndex** — indeks yang meningkat secara monoton, mulai dari 0, yang bertambah 1 per penarikan untuk mengidentifikasi setiap penarikan secara unik
- **ValidatorIndex** — indeks dari validator yang saldonya sedang ditarik
- **ExecutionAddress** — alamat ETH pada lapisan eksekusi ke mana penarikan harus dikirim
- **Amount** — jumlah, dalam Gwei, yang akan dikirim ke alamat eksekusi

Saat membangun atau memproses blok, klien lapisan eksekusi menerapkan penarikan ini di akhir blok. Memproses penarikan tidak bersaing dengan transaksi pengguna untuk ruang blok. Dengan maksimum 16 penarikan yang diproses per blok, seharusnya ada maksimum 115.200 penarikan yang diproses per hari, dengan asumsi tidak ada slot yang terlewat.

Desain penarikan ini sederhana namun sangat kuat.

#### Kesalahpahaman (6:30) {#misconceptions-630}

Kesalahpahaman pertama menyatakan bahwa saat memproses penarikan, ada perbedaan antara penarikan "penuh" dan "sebagian" dalam hal prioritas atau urutan. Baik penarikan penuh maupun sebagian terjadi ketika pemindaian linier atas set validator mencapai indeks validator. Satu-satunya perbedaan adalah bahwa dalam kasus penarikan penuh, validator harus meninggalkan antrean keluar dan mencapai "Epok yang dapat ditarik" sebelum pemindaian linier dapat mengambilnya.

Kesalahpahaman lainnya adalah bahwa pengguna akan kehilangan imbalan mereka jika mereka tidak memberikan alamat penarikan. Ini tidak benar — jika validator lupa memberikan alamat penarikan, imbalan ETH mereka tidak akan hilang begitu saja setelah penarikan diaktifkan. Sebaliknya, pemindaian akan melewati validator yang belum memberikan alamat penarikan mereka.

Penting untuk diingat bahwa alamat penarikan tidak dapat diubah dan hanya diatur sekali. Staker harus sangat berhati-hati saat mengatur alamat penarikan, memastikan mereka memiliki kepemilikan penuh atas alamat yang diberikan.

Ada juga spekulasi bahwa staker akan melakukan penarikan banyak ETH dari ekosistem Ethereum setelah penarikan diaktifkan, dengan versi yang lebih kuat dari argumen ini mengasumsikan hal itu akan mengganggu stabilitas mekanisme konsensus Bukti Kepemilikan (PoS). Meskipun kita tidak dapat sepenuhnya memprediksi berapa banyak ETH yang akan ditarik seiring waktu, ada beberapa argumen balasan yang penting:

Pertama, sebagian besar staker adalah pengadopsi awal Ethereum yang cukup berani untuk melakukan staking ketika masih belum pasti kapan penarikan akan diaktifkan. Banyak staker telah menyatakan keinginan mereka untuk terus melakukan staking guna mendukung jaringan dan terus mendapatkan imbalan dalam denominasi ETH.

Kedua, untuk memastikan bahwa mekanisme konsensus Bukti Kepemilikan (PoS) dan set validator aktif tetap stabil, Ethereum menerapkan antrean penarikan untuk semua validator yang ingin keluar. Antrean ini membatasi jumlah validator yang dapat meninggalkan ekosistem secara bersamaan.

Pemindaian penarikan pertama akan menarik banyak imbalan yang terakumulasi — pada dasarnya sejak awal mula Rantai suar. Namun, pemindaian berikutnya akan memproses jumlah ETH yang jauh lebih kecil.

#### Implikasi (8:39) {#implications-839}

Mengaktifkan penarikan akan menciptakan aliran staking dua arah yang terbuka. Saat ini, aliran staking bersifat satu arah — ETH hanya dapat mengalir ke dalam jaringan dan tidak pernah keluar darinya. Menariknya, mengaktifkan penarikan dapat mendorong lebih banyak orang untuk melakukan staking, karena mereka akan tahu bahwa mereka selalu dapat melakukan penarikan ETH mereka jika diperlukan untuk hal lain.

Staker yang tidak menjalankan validator mereka sendiri dan melakukan staking dengan penyedia staking terpusat akan dapat mengubah penyedia mereka ke penyedia yang berbeda. Mereka dapat melakukan penarikan dana dari penyedia yang menawarkan tingkat staking yang lebih rendah ke penyedia yang menawarkan tingkat yang lebih baik, berpindah dari penyedia terpusat ke penyedia yang terdesentralisasi, atau bahkan menjalankan validator mereka sendiri.

Penarikan juga akan berdampak pada derivatif staking likuid seperti Lido, Rocket Pool, dan lainnya. Token staking likuid (LST) seperti stETH atau rETH memiliki sejarah kehilangan patokan mereka untuk sementara terhadap harga ETH selama turbulensi pasar. Namun, dengan aliran staking dua arah, setiap perbedaan signifikan dalam patokan mereka akan dengan cepat dihilangkan melalui arbitrase.

Pengadopsi awal dalam staking likuid dan staking terpusat menguasai sebagian besar pasar karena mereka tidak memiliki banyak persaingan. Namun, pangsa pasar dari para pemain lama ini dapat melihat perubahan besar setelah penarikan diaktifkan, terutama jika mereka tidak menawarkan tingkat yang kompetitif. Kemampuan untuk berpindah secara bebas di antara penyedia staking akan menguntungkan pasar staking ETH.

#### Ringkasan (10:01) {#summary-1001}

Mengaktifkan penarikan staking adalah salah satu peningkatan yang paling diantisipasi pada Ethereum. Akan sangat penting untuk memastikan perubahan ini dieksekusi dengan lancar. Untuk membantu pengujian, validator akan memiliki beberapa devnet dan testnet yang tersedia untuk menjalankan proses dan menyelesaikan potensi masalah apa pun sebelum ditayangkan di Mainnet.

Penarikan adalah peningkatan lain yang membawa Ethereum selangkah lebih maju menuju pembangunan masa depan yang berkelanjutan, aman, dan terdesentralisasi. Peningkatan Shapella diperkirakan akan berlangsung pada paruh pertama tahun 2023.

Pada saat video ini dibuat, Rantai suar telah mengakumulasi lebih dari 17 juta ETH di lebih dari 530.000 validator. Saldo rata-rata untuk sebuah validator berada tepat di atas 34 ETH, yang berarti lebih dari 1 juta ETH dalam imbalan yang terakumulasi. Akan menarik untuk melihat bagaimana penarikan akan memengaruhi angka-angka ini.