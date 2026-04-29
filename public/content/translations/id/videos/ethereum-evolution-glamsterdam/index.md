---
title: "Evolusi Ethereum: Fusaka, Glamsterdam, dan seterusnya"
description: "Preston Van Loon membahas peningkatan protokol Ethereum yang akan datang, mencakup pencapaian peta jalan Fusaka dan Glamsterdam serta evolusi jangka panjang dari protokol tersebut."
lang: id
youtubeId: "GgKveVMLnoo"
uploadDate: 2025-03-01
duration: "0:21:34"
educationLevel: intermediate
topic:
  - "peta-jalan-dan-prioritas"
  - "peta-jalan"
  - "peningkatan"
format: presentation
author: ETHDenver
breadcrumb: "Evolusi Ethereum"
---

Sebuah presentasi oleh **Preston Van Loon** dari Offchain Labs dan Prysm, disampaikan di ETHDenver. Preston membahas kecepatan peningkatan Ethereum baru-baru ini dan apa yang akan terjadi pada jaringan ke depannya, termasuk Pectra, Fusaka, PeerDAS, Glamsterdam, FOCIL, waktu slot yang lebih singkat, dan finalitas yang lebih cepat.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=GgKveVMLnoo) yang dipublikasikan oleh ETHDenver. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

#### Pengantar (0:07) {#introduction-007}

**Pembawa Acara:** Baiklah, semuanya. Mari kita lanjutkan. Kita akan berbicara tentang evolusi Ethereum bersama Preston Van Loon. Silakan dimulai.

**Preston Van Loon:** Baiklah. Terima kasih. GM — Anda tahu ini GM kapan saja, siang atau malam, tidak peduli apakah ini pagi atau bukan. Jadi saya melihat GM sepanjang siang dan malam. Saya ingin berbicara tentang evolusi Ethereum, jadi mari kita mulai.

Ada narasi yang mungkin pernah Anda dengar sebelumnya: Ethereum terlalu lambat dalam merilis pembaruan. Saya tahu Anda pernah mendengarnya. Saya pernah mendengarnya. Anda sudah mendengarnya berkali-kali. Orang-orang akan berkata, "Kapan merge? Tidak bisakah para pengembang melakukan sesuatu? Rantai lain bergerak cepat. Mengapa Ethereum bergerak sangat lambat?" Saya di sini untuk memberi tahu Anda bahwa narasi itu sudah mati.

Saya bekerja pada klien konsensus Prysm. Ini adalah salah satu komponen kunci dari Rantai suar Ethereum. Dan saya terlibat langsung dalam pembaruan terbaru — untuk Pectra, Fusaka. Dari apa yang saya lihat di dalam, ini bukanlah birokrasi yang bergerak lambat seperti yang diklaim orang-orang tentang Ethereum selama bertahun-tahun. Ini sebenarnya adalah mesin berkecepatan tinggi dan dieksekusi dengan baik yang memberikan beberapa peningkatan terbesar yang pernah kita lihat dalam sejarah Ethereum.

#### Merilis tiga peningkatan dalam satu tahun (1:18) {#shipping-three-upgrades-in-one-year-118}

Apa yang kami rilis pada tahun 2025 adalah tiga pembaruan besar dalam satu tahun. Pertama, Pectra pada bulan Mei 2025. Ini memperkenalkan abstraksi akun asli, peningkatan pada saldo efektif maksimum validator yang memungkinkan konsolidasi, dan sepuluh EIP lainnya. Pada bulan Mei, ini adalah peningkatan terbesar dalam hal EIP yang pernah dilihat Ethereum.

Namun hanya tujuh bulan kemudian, kami merilis Fusaka — peningkatan yang bahkan lebih besar dalam hal EIP. Yang ini memiliki tiga belas, dengan inovasi yang disebut PeerDAS, yang sangat menarik. Namun hanya enam hari kemudian, kami melakukan peningkatan lagi dengan percabangan BPO1, dan BPO2 menyusul tak lama setelah itu, meningkatkan kapasitas blob Ethereum.

Ini adalah bukti nyata dari perilisan Ethereum. Ini adalah kolaborasi antara lima atau enam klien konsensus, lima klien eksekusi, banyak peneliti — lebih dari seratus orang yang terlibat dalam pengembangan inti Ethereum — dan mereka semua merilis pembaruan secara terkoordinasi pada saat yang bersamaan.

#### Penskalaan PeerDAS (2:22) {#peerdas-scaling-222}

Mari kita lihat sorotan utama untuk Fusaka: PeerDAS. PeerDAS adalah solusi penskalaan yang sangat luar biasa. Sebelum PeerDAS, kita memiliki Pectra, dan dengan Pectra Anda harus — sebagai operator node atau validator — mengunduh setiap blob yang menyertai sebuah blok. Ini menargetkan enam blob per blok. Semua orang harus mengunduhnya, dan itu benar-benar menjadi hambatan penskalaan. Jika Anda ingin meningkatkannya, Anda meminta operator node untuk secara proporsional meningkatkan penggunaan bandwidth mereka untuk blob.

Sekarang dengan Fusaka, kita memiliki blob yang di-erasure-code dan meminta validator untuk hanya menyimpan sebagian dari itu. Anda hanya perlu menyimpan seperdelapan dari blob tersebut. Dan dengan 50% blob mana pun, Anda dapat merekonstruksi keseluruhannya. Jadi dengan penyebaran ini di seluruh jaringan, ini memastikan bahwa Ketersediaan data terjamin dan ada lebih sedikit beban pada staker solo. Ini memberi kita pengurangan bandwidth jaringan secara langsung hampir 90% dalam penggunaan blob.

Melihat angka-angkanya: untuk Pectra, kita memiliki target enam dan maksimum sembilan blob dengan batas gas 36 juta. Kami menganggap ini sebagai dasar untuk penggunaan blob — yaitu 768 kilobyte per blok. Sekarang, di antara Pectra dan Fusaka, kita memiliki peningkatan di luar jadwal di mana batas gas ditingkatkan. Ini adalah proses tata kelola onchain di mana validator hanya memilih apa yang mereka pikir seharusnya menjadi batas blok — naik dari 36 menjadi 45 juta. Dan kemudian di akhir tahun kita mencapai Fusaka, yang tidak mengubah target atau maksimum blob tetapi sekali lagi meningkatkan batas gas.

Dan kemudian kita mendapatkan penurunan besar dalam bandwidth di mana setiap blok dengan target enam blob sekarang hanya berukuran 96 kilobyte data blob yang harus disimpan oleh validator. Kemudian lagi dengan BPO1, percabangan khusus parameter blob, kami meningkatkan target menjadi 10 dan maksimum menjadi 15. BPO2, yang terjadi hanya sebulan kemudian, naik menjadi 14 dan 21 — yang mana dua kali lipat dari apa yang kita miliki di Pectra, tetapi masih 71% lebih sedikit penggunaan bandwidth pada blob untuk staker solo.

#### Apa yang akan datang di Glamsterdam (4:30) {#whats-coming-in-glamsterdam-430}

Apa yang akan datang selanjutnya di Glamsterdam? Ada tiga hal yang sangat penting dan satu yang masih dalam penelitian aktif.

Yang pertama adalah ePBS — pemisahan pengusul-pembangun (PBS) yang diabadikan (enshrined). Cara produksi blok dilakukan saat ini, banyak orang mengalihdayakan kesempatan mereka untuk membangun sebuah blok melalui MEV-Boost kepada pembangun yang sangat canggih. Itu adalah mayoritas dari jaringan. Masalahnya adalah Anda harus memercayai sebuah relai, dan ada banyak kepercayaan bahwa pembangun akan benar-benar mengajukan blok yang telah mereka tawar. ePBS memperkenalkan mekanisme di dalam protokol sehingga jauh lebih sedikit kepercayaan yang dibutuhkan, dan ini adalah implementasi yang sangat bersih dari ide yang sama.

Hal berikutnya yang kita miliki adalah daftar akses tingkat blok. Ini adalah inovasi keren di mana setiap blok akan dilengkapi dengan daftar yang menyatakan di mana dalam state ia membaca atau menulis data. Artinya adalah Anda dapat memproses blok secara paralel. Saat ini Anda harus memproses blok secara berurutan. Jika Anda ingin memproses blok 10, Anda harus terlebih dahulu memproses 9 dan 8 dan seterusnya. Sekarang, jika Anda memiliki kumpulan blok dan tidak ada satupun yang bertentangan dengan informasi akses state, Anda dapat memproses kedelapan blok tersebut secara paralel. Mungkin Anda memiliki delapan inti (core) — itu membuat Ethereum lebih efisien dan lebih cepat dalam memproses blok.

Hal ketiga adalah penetapan ulang harga gas. Telah ada tolok ukur melalui EIP ini yang menunjukkan beberapa opcode terlalu mahal, beberapa terlalu murah. Sekarang kita akan memperbarui biaya yang Anda bayarkan untuk setiap opcode agar mencerminkan kenyataan, membuat Ethereum lebih aman dan lebih efisien.

#### Peran l2 yang terus berkembang (6:14) {#the-evolving-role-of-l2s-614}

Ada satu hal yang ingin saya bicarakan yang baru-baru ini disebutkan oleh Vitalik. Dia mengatakan dalam sebuah tweet beberapa minggu yang lalu bahwa visi asli dari lapisan 2 (l2) dan peran mereka di Ethereum tidak lagi masuk akal. Hal ini mendapat banyak sorotan utama, dan saya pikir banyak orang mengambil kesimpulan yang salah dari hal ini.

Biarkan saya memberi tahu Anda apa artinya dari sudut pandang orang dalam. Ethereum berskala lebih cepat dari yang diharapkan. Biaya lebih rendah dari sebelumnya. Saya tidak pernah berpikir saya akan membayar biaya gas kurang dari satu Gwei di Mainnet, tetapi di sinilah kita. Blob sangat melimpah — kita punya banyak. Kita menskalakan blob lebih cepat dari yang diharapkan. Dan bahkan biaya l2 sangat rendah.

Jadi gagasan bahwa kita membutuhkan l2 serbaguna — yaitu, l2 yang pada dasarnya adalah EVM yang sama dengan yang kita miliki di lapisan 1 (l1), hanya disalin dan ditempel berkali-kali dan yang mereka lakukan hanyalah berjalan lebih cepat — itu bukan visinya lagi. l2 ini akan berkembang pesat dengan spesialisasi. Beberapa dari mereka akan menargetkan hal-hal seperti privasi, permainan, hal-hal spesifik dalam keuangan terdesentralisasi (DeFi), atau ekstensi dari EVM. Tetapi jika mereka hanya salinan klon dari l1, mereka bukan bagian dari peta jalan di mana kita awalnya membayangkan paradigma sharding semacam ini melalui l2.

#### FOCIL: ketahanan sensor tingkat protokol (7:25) {#focil-protocol-level-censorship-resistance-725}

Di luar Glamsterdam, ada tiga hal yang sangat keren dalam pengembangan dan penelitian aktif. Yang pertama adalah FOCIL — Fork-Choice Enforced Inclusion Lists (Daftar Inklusi yang Ditegakkan oleh Pilihan Percabangan).

Masalah yang ingin diselesaikannya adalah bahwa pembangun blok memiliki pilihan. Mereka dapat memutuskan transaksi apa yang dimasukkan ke dalam blok. Mereka mungkin lebih menyukai beberapa atau tidak menyukai yang lain — mungkin untuk keuntungan MEV, mungkin karena tekanan regulasi. Namun bagaimanapun juga, mereka dapat menyensor transaksi sesuka mereka, dan tidak ada yang bisa dilakukan siapa pun tentang hal itu.

FOCIL mengubah dinamika kekuatan. Alih-alih mengatakan pembangun blok dapat memilih semua transaksi dalam sebuah blok, ada komite acak yang memilih — berdasarkan heuristik lokal mereka — beberapa transaksi yang mereka yakini harus dimasukkan dalam blok berikutnya. Ini bukan semua transaksi di blok berikutnya. Pembangun masih memiliki banyak kebebasan, tetapi ada sebagian kecil yang harus mereka sertakan. Pengusul blok akan mengambil daftar pendek ini — mungkin sekitar delapan transaksi — dan meletakkannya di akhir blok, dan transaksi tersebut dieksekusi bersama blok tersebut.

Ini ditegakkan melalui pilihan percabangan. Validator yang melihat sebuah blok tidak akan memberikan atestasi terhadapnya kecuali jika blok tersebut memiliki daftar inklusi yang dilampirkan di bagian bawah. Jika mereka melihat blok tanpa daftar tersebut, mereka akan menganggap blok itu tidak valid dan mengabaikannya — mereka tidak akan menyebarkannya, mereka tidak akan memberikan suara untuk itu. Ini masih merupakan penelitian aktif dengan beberapa parameter yang masih diputuskan, tetapi arahnya jelas: Ethereum akan menyertakan ketahanan sensor pada tingkat protokol.

#### Waktu slot yang lebih singkat (9:24) {#shorter-slot-times-924}

Hal berikutnya yang sangat menarik adalah waktu slot yang lebih singkat. Dengan Hegata — percabangan setelah Glamsterdam — kami sedang mempertimbangkan apakah kami dapat menyertakan waktu slot yang lebih singkat atau slot cepat. Itu tidak berarti kita langsung melompat ke slot enam detik atau bahkan lebih cepat, tetapi membangun jalurnya untuk memungkinkan hal itu terjadi.

Kedengarannya sangat sederhana — seperti, "mari kita bergerak lebih cepat." Tetapi Anda harus memikirkan tentang propagasi jaringan, tugas atestasi validator di mana mereka memiliki jumlah waktu yang terbatas untuk melakukannya, dan kemudian ada sisi ekonominya. Ketika saya pertama kali bereksperimen dengan ini, saya hanya mengubah angka 12 menjadi 6 dan tiba-tiba semua orang menghasilkan penerbitan dua kali lipat — uang dua kali lipat — yang mana sebenarnya bukan niat di balik waktu slot yang lebih singkat. Ini tentang bergerak lebih cepat tetapi menjaga semuanya tetap setara. Jadi ini adalah hal yang sangat kompleks, tetapi memiliki kemungkinan untuk mencapai tujuan akhir tersebut secara bertahap.

#### Finalitas yang lebih cepat (10:20) {#faster-finality-1020}

Hal ketiga adalah finalitas yang lebih cepat. Ini sangat penting karena Ethereum difinalisasi setiap dua Epok — setiap 13 menit — dan ada aplikasi yang sangat bergantung pada pertanyaan: apakah transaksi saya permanen? Jika transaksi belum berada dalam Epok yang difinalisasi, maka jawabannya adalah tidak — ada kemungkinan kecil bahwa transaksi tersebut dapat diatur ulang (reorg) dan transaksi perlu dikirimkan lagi.

Sekarang, jika kita memiliki finalitas yang cepat, hal-hal seperti bursa, jembatan, atau aplikasi apa pun dapat diyakinkan bahwa sebuah transaksi sudah final. Pertama, alih-alih dua Epok untuk finalitas, mari kita lakukan dalam satu Epok. Kemudian kita dapat mengatakan alih-alih Epok yang panjangnya 32 slot, mari kita persingkat menjadi empat slot. Sekarang, jika Anda menggabungkan ini dengan waktu slot enam detik, Anda berbicara tentang finalitas dalam waktu kurang dari 30 detik. Itu adalah tujuan akhir yang sangat keren.

#### Bintang utara (11:15) {#the-north-star-1115}

Semua ini dibangun ke dalam bintang utara (tujuan utama), di mana kita mengatakan l1 itu cepat dengan finalisasi dalam hitungan detik. Bagaimana kita sampai di sana? Pertama, kita mulai dengan PeerDAS — itu sudah dirilis. Itu memberi kita lapisan yang dapat diskalakan untuk Ketersediaan data. Selanjutnya, kita memiliki Glamsterdam, sebagian besar mencakup ePBS, yang merupakan implementasi bersih untuk pemisahan pengusul-pembangun (PBS) dan membuat hal-hal seperti FOCIL lebih berdampak. FOCIL hadir dengan ketahanan sensor, yang sangat selaras dengan ePBS. Dengan slot yang lebih cepat, waktu slot yang lebih cepat membuat finalitas yang lebih cepat menjadi lebih berdampak. Kemudian kita sampai pada tujuan akhir ini di mana kita benar-benar memiliki transaksi cepat yang difinalisasi dalam hitungan detik.

#### Penutup (12:02) {#closing-1202}

Saya ingin Anda membayangkan seperti apa kehidupan dalam dua tahun ke depan. Agak sulit untuk dipikirkan karena kripto bergerak sangat cepat. Ini mungkin menjadi kenyataan hanya dalam dua tahun: waktu konfirmasi transaksi empat atau enam detik; finalitas diukur dalam detik, bukan menit; penegakan tingkat protokol untuk ketahanan sensor; perlindungan terhadap kriptografi pasca-kuantum; dan l2 bersaing pada fitur dan inovasi baru, bukan hanya berjalan lebih cepat. Semua ini sambil tetap mempertahankan keutamaan bahwa Anda dapat menggunakan laptop atau perangkat keras tingkat konsumen untuk menjalankan full node di rumah. Ethereum dapat diakses dan tetap dapat diakses oleh semua orang di masa depan.

Kesimpulan yang saya ingin Anda miliki adalah: narasi yang saya sajikan kepada Anda di awal — benar-benar tidak ada bukti yang mendukungnya. Ethereum merilis pembaruan dengan cepat. Hanya dalam satu tahun, ada tiga peningkatan. Dan dalam 24 bulan ke depan, ada lebih banyak hal yang akan datang, dan mereka akan datang lebih cepat lagi.

Ini bukan sekadar garis waktu fantasi lima tahun. Ini adalah hal-hal aktual dengan proposal konkret yang sedang dikembangkan saat ini. Ada hal-hal di devnet saat ini. Ada orang-orang yang sedang bekerja saat kita berbicara tentang implementasi ini. Jika Anda membangun di Ethereum hari ini, Anda membangun di atas rantai blok yang paling aktif dikembangkan di dunia.

Saya Preston Van Loon, pengembang inti Ethereum. Saya bekerja di tim Prysm di Offchain Labs. Jika Anda ingin terlibat, cara terbaik untuk tetap mengikuti apa yang terjadi di Ethereum adalah dengan membantu membangunnya sendiri. Datang dan bicaralah dengan saya setelah ini. Datang dan lihat repositori Prysm atau repositori spesifikasi konsensus atau spesifikasi eksekusi mana pun — kami sangat mengharapkan kontribusi Anda. Terima kasih.