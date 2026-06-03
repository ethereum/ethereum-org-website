---
title: "Membangun di Ethereum pada tahun 2026: apa yang telah berubah"
description: "Tiga peningkatan protokol sejak tahun 2023 mengubah dua hal yang dipedulikan oleh pembangun: berapa biaya penggunaan l1 dan apa yang dapat dilakukan oleh dompet biasa. Panduan praktis untuk membangun di Ethereum pada tahun 2026."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "biaya gas"
  - "abstraksi akun"
  - "peningkatan protokol"
published: 2026-05-07
image: /images/developers/blog/latest-post-header-3.png
breadcrumb: Membangun di Ethereum pada tahun 2026
lang: id
---

Jika model mental Anda tentang Ethereum terbentuk pada tahun 2021 hingga 2023, itu sudah usang. Tiga peningkatan protokol sejak saat itu, [Dencun](/roadmap/dencun/) pada bulan Maret 2024, [Pectra](/roadmap/pectra/) pada bulan Mei 2025, dan [Fusaka](/roadmap/fusaka/) pada bulan Desember 2025, mengubah dua hal yang dipedulikan oleh pembangun, berapa biaya penggunaan lapisan 1 (l1) dan apa yang dapat dilakukan oleh dompet biasa.

## Mainnet kembali murah {#mainnet-is-cheap-again}

Rezim biaya tahun 2021 hingga 2023 tidak lagi menjadi asumsi bawaan yang aman.

Per 5 Mei 2026, pelacak gas Etherscan menunjukkan gas standar sekitar 0,15 Gwei, dengan rata-rata harian mendekati 0,5 Gwei sepanjang bulan April. Transfer ETH dasar berbiaya di bawah satu sen pada tingkat tersebut, dengan hari-hari biasa akhir-akhir ini berada di angka sen satu digit yang rendah. Trennya terus menurun di setiap peningkatan baru-baru ini, dan yang berikutnya, [Glamsterdam](/roadmap/glamsterdam/), diatur untuk menekan biaya lebih rendah lagi. Hal itu membuat "Mainnet Ethereum terlalu mahal untuk sebagian besar aplikasi" menjadi titik awal yang usang.

Jika Anda menginginkan aturan praktis yang sederhana, gunakan perhitungan gas alih-alih cerita lama. Pada 0,5 Gwei, rata-rata bulan April baru-baru ini, dan ETH pada kisaran $2.350, ilustrasi biayanya terlihat seperti ini.

| Operasi | Gas yang Digunakan | Ilustrasi Biaya |
| :-------------- | :---------- | :---------------- |
| Transfer ETH | 21.000 | **$0,025** |
| Transfer ERC-20 | \~65.000 | **$0,076** |
| Menyetujui ERC-20 | \~46.000 | **$0,054** |
| Tukar | \~180.000 | **$0,21** |
| Menyebarkan ERC-20 | \~1.200.000 | **$1,41** |

Itu adalah contoh, bukan jaminan. Biaya bergerak seiring dengan harga ETH, harga gas, dan kompleksitas kontrak. Pembacaan Gwei dapat berayun secara luas dalam bulan yang normal sementara biaya dolarnya hampir tidak bergerak, karena rollup sekarang membawa sekitar 95 persen transaksi Ethereum dan l1 biasanya berjalan jauh di bawah target bloknya. Biaya Mainnet sekarang cukup rendah sehingga banyak aplikasi dapat berjalan secara masuk akal di Mainnet.

### Mengapa biaya turun {#why-costs-fell}

Tiga peningkatan melakukan sebagian besar pekerjaan tersebut.

Dencun (Maret 2024) memperkenalkan EIP-4844 dan memberi rollup jalur data mereka sendiri melalui blob, dengan pasar biaya yang terpisah. Rollup berhenti bersaing dengan lalu lintas eksekusi biasa di ruang blok yang sama.

Pectra diaktivasi pada 7 Mei 2025. EIP-7691 meningkatkan laju pemrosesan blob dari target 3 / maks 6 blob per blok menjadi target 6 / maks 9, yang memperluas penggunaan jalur data murah oleh rollup dan menekan biaya lapisan 2 (l2) menjadi lebih rendah.

Fusaka diaktivasi pada 3 Desember 2025. Perubahan kapasitas utamanya adalah PeerDAS, yang memungkinkan validator mengambil sampel data blob alih-alih mengunduh setiap blob secara penuh, dan pengambilan sampel itulah yang membuat jumlah blob yang lebih tinggi menjadi aman di lapisan jaringan. Secara paralel, komunitas menaikkan batas gas l1 dari 30 juta menjadi 60 juta selama tahun 2025, dan EIP-7935 dari Fusaka menstandarkan 60 juta sebagai bawaan yang baru. EIP-7825 membatasi setiap transaksi tunggal pada \~16,78 juta gas, yang tidak akan pernah disadari oleh sebagian besar aplikasi, tetapi penyebaran yang sangat besar dan panggilan ganda (multicall) monolitik sekarang harus muat di dalamnya. EIP-7951 juga menambahkan verifikasi secp256r1 (P-256) asli di Mainnet, yang membuat tanda tangan kunci sandi dan WebAuthn jauh lebih murah untuk diverifikasi dalam alur akun.

Efek bersihnya adalah Mainnet tidak lagi dihargai seperti rantai yang padat secara permanen.

## Bagaimana EIP-7702 mengubah model akun {#how-eip-7702-changes-the-account-model}

Pectra juga menghadirkan EIP-7702, yang memberi dompet biasa akses ke perilaku akun pintar seperti pemrosesan batch, sponsor gas, kunci sesi, alur pemulihan, dan UX yang ramah kunci sandi, tanpa membuat pengguna bermigrasi ke akun baru.

Ini bekerja dengan menambahkan jenis transaksi baru (tipe `0x04`, `SetCode`) yang memungkinkan EOA menetapkan penunjuk ke kode kontrak yang sudah disebarkan. Pengguna tetap menggunakan alamat yang sama, kunci EOA asli memegang kendali penuh atas akun tersebut, dan pendelegasian nantinya dapat diubah atau diatur ulang ke alamat nol (null address).

Bagi pembangun aplikasi, perubahan praktisnya adalah meminta hasil dari dompet, bukan pengaturan EIP-7702 tingkat rendah. Jika pengguna perlu menyetujui dan menukar dalam satu alur, mintalah pemrosesan batch melalui ERC-5792 `wallet_sendCalls`. Dompet dapat memutuskan apakah akan menggunakan EIP-7702, ERC-4337, atau sistem akun lainnya.

Kode yang didelegasikan adalah batas keamanan. Jika dompet mengarahkan EOA ke kode yang penuh bug atau berbahaya, kode tersebut dapat melakukan panggilan sebagai pengguna, termasuk persetujuan token, transfer, dan interaksi aplikasi. Pembangun harus memperlakukan target pendelegasian seperti infrastruktur dompet, mengandalkan implementasi yang telah diperiksa oleh dompet dan tidak meminta pengguna untuk mendelegasikan ke kode yang dikendalikan aplikasi secara sembarangan.

## Apa yang diubah dari cara membangun {#what-this-changes-about-how-to-build}

Pertanyaan bawaan pembangun dulunya adalah "l2 mana yang cukup murah?" Pertanyaan itu masih memiliki jawaban, tetapi itu bukan satu-satunya. Dengan biaya l1 di kisaran sen per transaksi selama beban normal, dan EIP-7702 yang memungkinkan dompet mana pun mengekspos UX akun pintar tanpa memigrasikan alamat, pertanyaan bawaan yang lebih berguna adalah apakah aplikasi harus berada di Mainnet, atau apakah l2 tertentu memberikan keuntungan distribusi, likuiditas, atau UX nyata yang tidak dapat diberikan oleh l1.

Asumsi akun juga berubah. Jangan merancang aplikasi baru seolah-olah setiap akun pengguna adalah EOA ECDSA biasa yang harus menyimpan ETH sebelum melakukan sesuatu yang berguna. Utamakan antarmuka pemrosesan batch tingkat dompet seperti ERC-5792 `wallet_sendCalls`, asumsikan sponsor gas dan kunci sesi akan menjadi fitur dompet yang normal, dan perlakukan kunci sandi serta alur pemulihan sebagai bagian dari permukaan UX akun alih-alih peretasan orientasi yang terpisah.

## Apa selanjutnya {#whats-next}

Peningkatan bernama Ethereum berikutnya adalah Glamsterdam, dengan Daftar Akses Tingkat Blok (BAL) dan pemisahan pengusul-pembangun (PBS) yang tertanam (ePBS) sebagai item utamanya. Bersama-sama, hal tersebut membuatnya aman untuk menaikkan batas gas blok dari 60 juta saat ini menjadi sekitar 200 juta, menyisakan lebih banyak kapasitas l1 untuk dikerjakan oleh pembangun. Aktivasi diharapkan pada paruh kedua tahun 2026. Setelah Glamsterdam, [Hegotá](https://forkcast.org/upgrade/hegota/) direncanakan untuk menyusul, dengan Daftar Inklusi yang Ditegakkan oleh Pilihan Percabangan (FOCIL) dipilih sebagai fitur utamanya.

Bagi pembangun, item yang layak dilacak adalah kapasitas l1 yang lebih besar (BAL), inklusi transaksi yang lebih andal (FOCIL), dan jalur menuju abstraksi akun asli. ePBS, tajuk utama Glamsterdam lainnya, sebagian besar merupakan perubahan infrastruktur yang menghapus ketergantungan kepercayaan di bawah inklusi transaksi l1. Perubahan permukaan tingkat aplikasi langsungnya kecil.

BAL adalah tentang menjaga l1 tetap murah seiring dengan pertumbuhan penggunaan. Secara sederhana, sebuah blok akan datang dengan peta akun dan penyimpanan yang disentuhnya. Klien dapat menggunakan peta tersebut untuk mengambil data sebelumnya dan mengeksekusi transaksi independen secara paralel, yang membuatnya lebih aman untuk menaikkan batas gas l1 tanpa membuat blok terlalu lambat untuk diverifikasi. Efek praktis bagi pembangun adalah bahwa lebih banyak aktivitas dapat kembali ke Mainnet tanpa secara otomatis menciptakan kembali rezim gas tahun 2021 hingga 2023.

FOCIL adalah tentang memasukkan transaksi yang valid ke dalam blok bahkan ketika satu produsen blok lebih suka mengabaikannya. Saat ini, jika pihak yang membangun blok mengabaikan suatu transaksi, sisa protokol memiliki cara terbatas untuk memaksanya masuk. Dengan EIP-7805, beberapa validator pada dasarnya akan mengatakan, "kami melihat transaksi yang valid ini menunggu di mempool publik." Blok berikutnya kemudian harus menyertakannya, atau validator dapat menolak untuk mendukung blok tersebut. Bagi pembangun, ini penting ketika akses yang andal ke l1 adalah bagian dari produk, termasuk alat privasi, jalur masuk (onramp) yang diatur, atau aplikasi yang melayani pengguna yang mungkin disaring oleh beberapa penyedia infrastruktur.

Bagi pembangun aplikasi, item Hegotá yang paling harus diperhatikan adalah abstraksi akun. EIP-8141, Transaksi Bingkai (Frame Transactions), akan menambahkan jenis transaksi di mana validasi, eksekusi, dan pembayaran gas dibagi menjadi bingkai-bingkai. Praktiknya, itu berarti akun pintar dapat memverifikasi transaksi itu sendiri, menentukan aturan tanda tangannya sendiri, menyetujui siapa yang membayar gas, dan mengeksekusi satu atau lebih tindakan tanpa bergantung pada EntryPoint ERC-4337, pembuat bundel (bundler), atau penyampai (relayer) yang dijalankan aplikasi.

Hal itu mengubah asumsi produk. Sponsor gas menjadi pola akun asli alih-alih infrastruktur yang harus diatur secara terpisah oleh setiap aplikasi. Skema tanda tangan alternatif menjadi lebih mudah untuk didukung, termasuk kunci sandi saat ini dan jalur menjauh dari ECDSA jika migrasi pasca-kuantum menjadi perlu. Jika EIP-8141 atau desain abstraksi akun asli serupa mendarat, model pembangun bergeser dari "sebuah EOA menandatangani transaksi" menjadi "sebuah akun menentukan bagaimana ia memvalidasi, membayar, dan mengeksekusi transaksi."

Itu adalah arahnya, bukan janji. EIP-8141 berstatus Draf, dan per Mei 2026 hanya "dipertimbangkan untuk disertakan" di Hegotá, yang berarti tim klien sedang mendiskusikannya tetapi belum berkomitmen untuk mengirimkannya dalam peningkatan tersebut. Jalur pembangunan praktis tahun 2026 untuk UX akun masih berupa alur dompet EIP-7702 ditambah ERC-4337, tetapi pembangun harus merancang seolah-olah akun yang dapat diprogram menjadi model akun bawaan.

## Apa yang harus dibangun secara berbeda sekarang {#what-to-build-differently-now}

Mulailah dengan memeriksa kembali asumsi biaya lama. Jika pedoman penyebaran Anda masih memperlakukan Mainnet Ethereum sebagai lingkungan 10 hingga 30 Gwei secara bawaan, itu mungkin mengalihkan terlalu banyak pekerjaan dari l1. Mainnet layak dipertimbangkan terlebih dahulu ketika aplikasi Anda bergantung pada likuiditas bersama, komposabilitas dengan protokol yang ada, netralitas, atau state bernilai tinggi yang harus berada di tempat di mana keamanan dan konsensus sosial Ethereum paling kuat.

Gunakan l2 untuk alasan yang masih penting, termasuk distribusi, volume transaksi yang sangat tinggi, ekosistem khusus aplikasi, atau biaya per tindakan yang harus sedekat mungkin dengan nol. Intinya bukanlah "Mainnet untuk segalanya." Intinya adalah bahwa "Mainnet terlalu mahal" tidak boleh lagi menjadi filter pertama.

Di sisi akun, bangunlah berdasarkan kemampuan dompet alih-alih EOA mentah. Frontend Anda harus siap untuk panggilan yang diproses secara batch, gas yang disponsori, kunci sesi, kunci sandi, dan alur pemulihan yang tiba melalui dompet. EIP-7702 dan ERC-4337 adalah alat praktis saat ini. Abstraksi akun asli adalah arah yang harus dilacak selanjutnya.

Berhentilah memperlakukan Mainnet Ethereum sebagai lapisan penyelesaian mahal yang hanya Anda sentuh di akhir, dan berhentilah memperlakukan akun pengguna sebagai kunci ECDSA statis yang harus menyimpan ETH sebelum mereka dapat melakukan apa pun. Ethereum pada tahun 2026 bergerak menuju eksekusi l1 yang lebih murah dan akun yang dapat diprogram. Bangunlah untuk dunia tersebut.

## Bacaan lebih lanjut {#further-reading}

- [Pengumuman Mainnet Pectra](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)
- [Pengumuman Mainnet Fusaka](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)
- [Pembaruan Prioritas Protokol untuk 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Titik Periksa #9 (Apr 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [Panduan Pectra 7702 di ethereum.org](https://ethereum.org/en/roadmap/pectra/7702/)
- [EIP-7702 Tetapkan Kode untuk EOA](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-7928 Daftar Akses Tingkat Blok](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-7805 Daftar Inklusi yang Ditegakkan oleh Pilihan Percabangan (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141 Transaksi Bingkai](https://eips.ethereum.org/EIPS/eip-8141)
- [Peningkatan Hegotá Forkcast](https://forkcast.org/upgrade/hegota/)
- [Pelacak Gas Etherscan](https://etherscan.io/gastracker)
- [Meta Hardfork Glamsterdam EIP-7773](https://eips.ethereum.org/EIPS/eip-7773)
- [Peta jalan Glamsterdam di ethereum.org](https://ethereum.org/roadmap/glamsterdam/)