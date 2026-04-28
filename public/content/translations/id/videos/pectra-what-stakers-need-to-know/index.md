---
title: "Pembaruan Pectra Ethereum: apa yang perlu diketahui oleh pelaku staking"
description: "Menjelaskan pembaruan Pectra dari sudut pandang pelaku staking, mencakup dampak praktis pada validator, operasi staking, dan EIP utama yang memengaruhi staking dalam protokol Ethereum."
lang: id
youtubeId: "_UpAFpC7X6Y"
uploadDate: 2025-01-22
duration: "0:09:14"
educationLevel: intermediate
topic:
  - "peta jalan"
  - "pectra"
  - "staking"
format: explainer
author: Blockdaemon
breadcrumb: "Pectra untuk Pelaku Staking"
---

Sebuah webinar yang diselenggarakan oleh **Blockdaemon** bersama insinyur rantai blok Julia Schmidt (Alluvial) dan Freddy Tänzer (Blockdaemon) yang membahas bagaimana pembaruan Pectra berdampak pada staking ETH. Webinar ini mencakup penarikan yang dapat dipicu oleh lapisan eksekusi, peningkatan saldo efektif maksimum, konsolidasi validator, dan implikasi staking likuid.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=_UpAFpC7X6Y) yang diterbitkan oleh Blockdaemon. Transkrip ini telah disunting sedikit agar lebih mudah dibaca.*

#### Pengantar (0:00) {#introduction-000}

**Host:** Halo dan selamat datang di webinar yang diselenggarakan oleh Blockdaemon ini, yang berfokus pada pembaruan Pectra Ethereum yang akan datang. Bersama kita hari ini adalah Julia Schmidt, insinyur rantai blok di Alluvial, dan Freddy Tänzer, pimpinan ekosistem Ethereum Blockdaemon, untuk membahas bagaimana perubahan Pectra akan berdampak pada staking ETH, jaringan secara keseluruhan, layanan staking likuid, dan banyak lagi. Sebagai permulaan, Freddy — bisakah Anda memberi kami gambaran singkat tentang pembaruan Pectra dan apa dampaknya bagi pelaku staking?

#### Apa itu Pectra (1:28) {#what-is-pectra-128}

**Freddy Tänzer:** Jadi Pectra adalah pembaruan Ethereum yang dijadwalkan pada akhir Q1 2025 — sekitar bulan Maret, mungkin sedikit mundur, mungkin April atau sekitarnya. Pada awalnya ini seharusnya menjadi percabangan kecil, dan kemudian semakin banyak hal yang ditambahkan, sehingga mereka sekarang membaginya menjadi dua.

Bagian pertama berisi banyak hal — misalnya, terkait dengan akun pintar, abstraksi akun, dan hal-hal semacam itu — tetapi saya ingin benar-benar berfokus pada hal-hal yang relevan bagi audiens kita dalam hal perubahan staking. Terutama ada dua hal besar.

Yang pertama adalah fakta bahwa Anda dapat memicu penarikan dan keluar dari validator Anda melalui lapisan eksekusi — kredensial penarikan — yang pada dasarnya menghilangkan ketergantungan pada operator node. Yang kedua, yang bisa dibilang efeknya lebih besar, adalah bahwa saldo efektif maksimum dari sebuah validator sekarang dapat berubah. Sebelumnya hanya 32 ETH sebagai jumlah tetap, dan sekarang bisa berada di antara 32 dan 2.048 ETH.

Ada juga yang lebih kecil yang pada dasarnya mengarah pada fakta bahwa deposit jauh lebih cepat — terdaftar onchain dari sekitar 14 jam menjadi kurang dari satu jam — tetapi saya pikir dua hal tersebut adalah yang paling relevan untuk diskusi kita di sini.

#### EIP-7002: keluar yang dapat dipicu oleh lapisan eksekusi (2:58) {#eip-7002-execution-layer-triggerable-exits-258}

**Host:** Untuk perubahan besar pertama, Julia, bisakah Anda menjelaskan bagaimana proses pasca-Pectra akan berubah dibandingkan dengan cara saat ini di mana penarikan diinisiasi dalam ekosistem staking Ethereum?

**Julia Schmidt:** Untuk mengusulkan dan membuktikan blok, validator harus terus daring dan memiliki saldo yang di-stake sebesar 32 ETH. Saat Anda menyiapkan validator untuk mengambil bagian dalam mekanisme konsensus, Anda akan menyiapkan dua kunci. Yang pertama adalah kunci validator, yang digunakan untuk melakukan tugas validator — menandatangani pengesahan blok. Yang kedua adalah kunci penarikan, yang mewakili kepemilikan ETH yang di-stake.

Anda memiliki dua cara untuk melakukan staking: staking mandiri, atau pengaturan multi-kustodian seperti dengan Blockdaemon dan seperti yang kami lakukan di Liquid Collective, di mana Anda dapat memilih operator node Anda untuk melakukan semua tugas validator dan operasi validator atas nama Anda. Hal itu memberi mereka kunci validator, dan Anda hanya memiliki akses ke kunci penarikan.

Pesan sebenarnya untuk keluar dari validator hanya dapat dikirim dari kunci validator yang dikendalikan oleh operator node. Hal itu mengharuskan Anda untuk memercayai operator node Anda — untuk bergantung pada mereka agar keluar dari validator untuk Anda. Jika mereka melakukannya, itu bagus, tetapi Anda selalu harus bergantung pada pihak ketiga ini.

Apa yang terjadi sebelumnya adalah Anda akan setuju untuk menandatangani pesan keluar sebelumnya saat Anda menyiapkan pengaturan staking multi-kustodian ini. Anda akan mendapatkan pesan yang dapat Anda gunakan nanti untuk keluar dari validator Anda, tetapi Anda tidak akan tahu apakah pesan keluar tersebut akan benar-benar berfungsi. Setiap kali ada pembaruan di Ethereum yang mengubah nomor versi, pesan keluar Anda mungkin tidak lagi berfungsi.

Pada pembaruan Dencun terakhir, EIP baru mengubah waktu kedaluwarsa pada pesan keluar ini — tetapi itu hanya mengobati gejalanya, bukan menyelesaikan masalahnya. Masalah sebenarnya adalah pemilik ETH yang di-stake tidak dapat memicu penarikan. Dana tersebut pada dasarnya dapat disandera oleh operator node.

Hal ini sekarang diselesaikan dengan EIP-7002, yang memungkinkan kunci validator dan kunci penarikan untuk memicu keluar dari lapisan eksekusi — cukup dengan mengirimkan transaksi ke kontrak penarikan khusus di mana Anda mengirimkan permintaan penarikan dan menentukan apakah keluar penuh dari validator, atau penarikan sebagian dari saldo yang di-stake.

#### EIP-7251: saldo efektif maksimum (4:15) {#eip-7251-max-effective-balance-415}

**Host:** Freddy, bisakah Anda memberi kami gambaran umum tentang saldo efektif maksimum ke depannya mulai dari Pectra dan seterusnya, dan bagaimana hal ini akan berdampak pada orang-orang yang saat ini melakukan staking?

**Freddy Tänzer:** Sebagai tambahan — untuk pelanggan institusional kami, ketergantungan pada operator node ini biasanya diatasi dengan pesan keluar yang ditandatangani sebelumnya, terutama untuk mengatasi kekhawatiran dari regulator atau kekhawatiran kelangsungan bisnis. Mereka juga harus menjaga agar pesan keluar tersebut tetap aman. Jadi ada penyederhanaan proses yang jelas, menghilangkan ketergantungan tersebut.

Sekarang, mengenai saldo efektif maksimum: banyak hal yang tidak berubah, dan semua ini bersifat opsional (opt-in). Anda tidak perlu mengubah apa pun. Tujuan dari pengembang inti Ethereum dan ekosistem pada umumnya adalah untuk mengurangi jumlah validator di jaringan. Kita memiliki lebih dari satu juta validator sekarang, dan masing-masing harus berkomunikasi dengan yang lain tentang pengesahan dan konsensus. Itu adalah lalu lintas jaringan yang sangat besar — pengujian telah menunjukkan bahwa mencapai dua juta validator bisa menjadi masalah.

Tujuannya adalah untuk mengurangi jumlah validator tanpa memengaruhi keamanan jaringan — karena jumlah total ETH yang di-stake akan tetap konstan, hanya rata-rata lebih banyak ETH per validator.

Bagi pelanggan, ini terutama berarti mereka perlu memutuskan apakah akan menggunakan jenis validator baru atau yang lama. Ini bergantung pada kebutuhan likuiditas mereka. Dalam pengaturan saat ini dengan validator 32 ETH, imbalan protokol Anda akan didorong ke kredensial penarikan Anda setiap sembilan atau sepuluh hari, memberi Anda likuiditas reguler.

Namun banyak pengaturan berasumsi bahwa imbalan digunakan untuk menggabungkan (compound) stake. Di masa lalu, saat menggabungkan, Anda harus menunggu hingga Anda memiliki imbalan 32 ETH untuk meluncurkan validator baru secara manual. Dengan jenis validator baru, Anda menggabungkan imbalan Anda secara otomatis — itu berarti lebih banyak imbalan dan lebih sedikit pekerjaan.

Kompensasinya adalah Anda tidak mendapatkan imbalan secara teratur, dan Anda perlu menyiapkan proses untuk mengambilnya. Pemicu penarikan sekarang adalah transaksi reguler yang dikenakan biaya gas, alih-alih menerima imbalan secara gratis pada model lama.

Ada kabar baik juga tentang pemotongan: penalti pemotongan awal akan turun drastis — sekitar 128×. Dengan validator 32 ETH, penalti awalnya adalah satu ETH. Setelah Pectra, itu akan menjadi sebagian kecil dari ETH — mungkin $20 atau $25. Ini memiliki efek samping positif pada staking mandiri, yang jelas penting untuk netralitas Ethereum yang kredibel.

Manfaat penggabungan otomatis terutama menguntungkan jumlah stake yang lebih kecil. Jika Anda memiliki seribu validator, Anda dapat meluncurkan yang baru secara manual setiap bulan. Tetapi jika Anda hanya memiliki satu validator, Anda praktis harus menunggu 32 tahun untuk menggabungkannya.

#### Implikasi staking likuid (11:25) {#liquid-staking-implications-1125}

**Host:** Julia, bagaimana perbandingan konsolidasi validator yang lebih besar dengan manfaat staking likuid? Bagaimana keputusan ini akan dipertimbangkan dalam benak pelaku staking pasca-Pectra?

**Julia Schmidt:** Di Alluvial, kami telah mengikuti perubahan ini dengan saksama dan ingin menawarkan kedua solusi tersebut. Permintaan konsolidasi di Pectra adalah solusi sementara yang seharusnya tidak memengaruhi waktu perolehan saldo efektif Anda — ia tidak perlu melalui antrean aktivasi lagi saat mengonsolidasikan beberapa validator. Prosesnya cukup lancar.

Fakta bahwa penalti pemotongan awal telah diturunkan mengurangi risiko menjalankan validator bersaldo tinggi. Dorongan dari Yayasan Ethereum benar-benar untuk mengonsolidasikan sebanyak yang kita bisa untuk mengurangi beban jaringan. Ada sedikit kerugian: dalam kasus yang sangat jarang terjadi di mana validator saldo efektif maksimum sebesar 2.048 ETH terkena pemotongan, ia akan masuk ke antrean keluar dan dana Anda akan dikunci untuk waktu yang lebih lama — itu akan seperti 64 validator yang terkena pemotongan sekaligus. Jadi kami akan mencoba menawarkan batas atas validator yang fleksibel sesuai dengan selera risiko klien.

Dari sisi utilitas, token staking likuid jelas menambah likuiditas — bahkan dengan penarikan sebagian dari lapisan eksekusi, itu tidak akan instan. Anda mengirimkan transaksi, itu masuk antrean, lalu ada Epok keluar dan Epok penarikan. Token staking likuid masih menawarkan likuiditas instan yang tidak dapat diberikan oleh penarikan sebagian.

#### Langkah selanjutnya untuk pelaku staking (16:20) {#next-steps-for-stakers-1620}

**Freddy Tänzer:** Apa yang kami lihat adalah bahwa lembaga keuangan biasanya akan melakukan staking antara 65% dan 85% dari ETH mereka di bawah kustodian, karena mereka membutuhkan sisanya sebagai penyangga likuiditas untuk penebusan. Dengan staking likuid, Anda berpotensi meningkatkan jumlah ETH yang di-stake, yang menghasilkan imbalan yang lebih tinggi.

Kedua belah pihak mendapat manfaat dari Pectra — staking likuid mendapatkan opsi penarikan lapisan eksekusi, dan staking tradisional mendapatkan penghapusan masalah kenaikan 32 ETH, terutama untuk stake yang lebih kecil.

**Julia Schmidt:** Dengan protokol Liquid Collective, kami tidak hanya menawarkan staking ke satu operator node — kami memiliki konsorsium dari berbagai operator node yang kami alokasikan stake-nya dalam pendekatan round-robin. Hal itu meningkatkan desentralisasi dari ETH yang di-stake. Dan operator node ini mengikuti NORS (Node Operator Risk Standard), jadi kami juga menjamin pertanggungan jika terjadi pemotongan.

Keuntungan utama yang belum saya singgung adalah penarikan sebagian — sekarang setelah Anda dapat menarik ETH yang di-stake dari lapisan eksekusi, ini membuka jalan baru bagi protokol seperti EigenLayer untuk memicu penarikan dan keluar. Ada peningkatan besar dalam fungsionalitas dan interoperabilitas yang sekarang dapat digabungkan dengan lebih baik oleh keuangan terdesentralisasi (DeFi) ke dalam siklus hidup validator penuh, dari deposit hingga keluar. Sebagai insinyur rantai blok, sungguh menyenangkan bisa mengotomatiskan alur kerja secara penuh.

#### Penutup (19:50) {#closing-1950}

**Host:** Julia, ke mana orang bisa pergi untuk mempelajari lebih lanjut tentang Liquid Collective dan Alluvial?

**Julia Schmidt:** Anda dapat mengikuti Alluvial dan Liquid Collective di Twitter, di X, di LinkedIn, atau di situs web Alluvial. Kami akan membagikan artikel yang merinci perubahan terkait pembaruan Pectra dan bagaimana hal itu akan memengaruhi lanskap Ethereum.

**Host:** Freddy, ada pembaruan yang ingin dibagikan terkait Pectra?

**Freddy Tänzer:** Kami memiliki banyak hal yang akan datang. Kami akan memiliki halaman khusus di situs web kami, blockdaemon.com — itu akan menjadi pusat dari semua sumber daya. Kami akan memiliki postingan blog, FAQ, dan beberapa panduan serta rekomendasi pemodelan terkait jenis validator apa yang harus dipilih dan ukurannya. Apakah Anda menginginkan satu validator 2.000 ETH, atau dua dengan 1.000, atau empat dengan 500 — semua ini pada umumnya mungkin, dan ada keputusan kompensasi yang harus dibuat. Kami akan membantu pelanggan kami menavigasi melalui ini.

**Host:** Luar biasa. Freddy, Julia, terima kasih banyak atas waktu Anda hari ini — diskusi yang menarik dan pengantar Pectra yang hebat.