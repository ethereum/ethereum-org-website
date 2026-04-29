---
title: "Privasi institusional Ethereum saat ini"
description: "Sebuah panel di acara Web3Privacy Now selama Devconnect 2025, menampilkan para ahli yang mendiskusikan kebutuhan privasi institusional dunia nyata di Ethereum, mulai dari kepatuhan hingga bukti tanpa pengetahuan (ZKP)."
lang: id
youtubeId: "cZqlg4W1Els"
uploadDate: 2025-11-22
duration: "0:30:50"
educationLevel: advanced
topic:
  - "privasi-dan-keamanan"
  - "privasi"
format: panel
author: Web3Privacy Now
breadcrumb: "Privasi Institusional"
---

Sebuah panel di acara Web3Privacy Now selama Devconnect 2025, dimoderatori oleh **Oskar Thorin** (IPTF/EF), menampilkan **Zach Obront** (Etherealize), **Amzah** (ABN Amro), **Eugenio** (European Blockchain Association), dan **François** (Polygon Miden) yang mendiskusikan kebutuhan privasi institusional dunia nyata di Ethereum, mulai dari kepatuhan regulasi hingga bukti tanpa pengetahuan untuk keuangan terdesentralisasi (DeFi) institusional.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=cZqlg4W1Els) yang dipublikasikan oleh Web3Privacy Now. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

#### Pengantar Satuan Tugas Privasi Institusional (0:03) {#introduction-to-institutional-privacy-task-force-003}

**Oskar Thorin:** Halo. Apakah kalian bisa mendengar saya? Baiklah. Keren. Jadi pertama-tama kita akan melakukan pembicaraan pengantar yang sangat singkat — sekitar 3 hingga 5 menit — dan kemudian itu akan mengarah ke panel. Ini adalah pembicaraan yang dipersingkat. Panel sebelumnya banyak berbicara tentang kepatuhan dan privasi dan sebagainya. Saya memberikan pembicaraan sebelumnya di Cyban Congress yang juga menyinggung hal ini, dan akan ada versi yang lebih panjang dari pembicaraan ini di DeFi Day nanti hari ini. Namun, apa yang ingin saya bicarakan adalah privasi institusional di Ethereum.

Nama saya Oskar dan saya adalah pimpinan IPTF di Yayasan Ethereum. Singkatan dari Institutional Privacy Task Force (Satuan Tugas Privasi Institusional). Dan mengapa privasi institusional itu penting? Ini penting karena beberapa alasan. Saya pikir satu alasan besar adalah jika Anda melihat institusi keuangan besar yang ada ini, kita berbicara tentang triliunan dolar dalam aliran moneter. Dulu regulasi adalah penghalang terbesar bagi mereka untuk beralih onchain. Namun, apa yang terjadi dalam beberapa tahun terakhir ini sebenarnya privasi adalah penghalang terbesar bagi mereka.

Jadi apa daya ungkit dan dampaknya di sini? Saya pikir bahkan hanya dengan memindahkan 1% dana keuangan tradisional ke Ethereum akan memiliki dampak besar dalam hal dampak yang dapat diberikan Ethereum pada privasi. Dan hanya dengan melakukan orientasi pada satu institusi di sini juga menyentuh jutaan pengguna, bukan? Ini bukan hipotesis. Ada institusi yang sudah onchain, dan ada banyak hal yang terjadi selama sekitar satu tahun ke depan di sini. Waktunya adalah sekarang, dalam hal institusi yang beralih onchain dengan privasi bawaan.

Satu institusi besar di sini dapat memiliki dampak besar pada ekosistem mana yang akhirnya menang — apakah itu Ethereum atau versi yang lebih privat. Mengapa mereka menginginkan Ethereum? Ada beberapa alasan. Hal-hal seperti likuiditas, ketahanan sensor, waktu aktif (uptime) 10 tahun, dan itu menjadi nilai jual dalam hal penyelesaian. Ada alternatif lain juga, tetapi mereka memiliki batasan yang berbeda. 

Agar Ethereum dapat melakukan orientasi pada institusi-institusi ini, mereka perlu mengatasi masalah privasi ini. Apa yang kami coba lakukan di Satuan Tugas Privasi Institusional adalah melakukan orientasi institusi ke Ethereum dan memastikan tujuan privasi mereka terpenuhi. Kami melakukan hal-hal seperti lokakarya, mencoba mendemistifikasi ruang ini dan memastikan kami dapat memenuhi kebutuhan institusional khususnya terkait privasi. Artefak pertama yang kami miliki adalah peta privasi institusional ini — kami berbicara dengan institusi besar, memahami kasus penggunaan dan persyaratan bisnis mereka, menjadikannya sumber terbuka (open source) sebanyak mungkin, dan kemudian berbicara dengan vendor di ruang ini untuk menghubungkan institusi ke ruang solusi. 

#### Pengenalan Panel dan Masalah Institusional (5:00) {#panel-introductions-and-institutional-problems-500}

**Oskar Thorin:** Maaf agak cepat, tetapi semoga bisa dipahami. Jadi panel ini memiliki banyak ahli di bidang penelitian, kebijakan, dan rekayasa, dan kita akan berbicara tentang privasi institusional. 

Sekadar perkenalan singkat: Kita bersama Eugenio, yang merupakan Kepala Pertumbuhan di European Blockchain Association. Kita bersama Zach Obront, CEO Etherealize, di mana ia membangun produk institusional dan primitif privasi yang mendasarinya. Kita bersama Amzah, yang menghabiskan sebagian besar kariernya dalam manajemen risiko keuangan sebelum terlibat secara mendalam di Ethereum, dan sekarang menjembatani kontrol tradisional dengan pasar asli Ethereum. Dan terakhir, kita bersama François, seorang insinyur protokol staf senior di Polygon Miden, yang berfokus pada sistem bukti tanpa pengetahuan.

Untuk memulai, dalam satu kalimat atau mungkin beberapa kalimat, masalah institusional apa yang sedang Anda kerjakan yang sebenarnya membutuhkan privasi di jalur publik daripada sekadar basis data tradisional atau rantai privat? Mungkin kita bisa mulai dengan François.

**François:** Ya, tentu saja Anda selalu dapat membangun di atas rantai privat, tetapi hari ini kami percaya bahwa institusi ingin mengakses likuiditas global yang ditawarkan oleh Ethereum sambil pada saat yang sama mempertahankan apa yang mereka miliki dari dunia keuangan tradisional, yaitu tingkat privasi yang memungkinkan mereka untuk berdagang dengan likuiditas global tanpa membuat seluruh perdagangan mereka menjadi publik. Bagi kami, itulah mengapa penting untuk membangun privasi di dalamnya, tetapi juga untuk membangun di atas Ethereum.

**Eugenio:** Yah, mungkin saya bisa mengambil ini dari perspektif yang berbeda — dari perspektif standar. Dalam proses standar, ada konsep yang sangat penting bagi institusi, yaitu jangkar kepercayaan (trust anchor). Pada dasarnya setiap institusi memiliki lingkungan offchain yang besar, di mana mereka menambatkan kewajiban ke dalam masyarakat bagi semua orang yang menggunakan layanan mereka. Salah satu bagian dari masalah besar dalam menciptakan layanan berbasis rantai blok untuk institusi adalah bagaimana menciptakan sistem yang efisien untuk menjembatani jangkar kepercayaan ke dalam dunia onchain, dan kemudian bagaimana menanamkan teknik kriptografi untuk memastikan bahwa data diproses dengan cara yang minimal, tetapi dapat diaudit dan diverifikasi.

**Zach Obront:** Keren. Jadi di Etherealize, kami berfokus pada peningkatan beberapa cara kerja internal yang mendalam dari pasar keuangan, khususnya pasar kredit. Jadi saya akan mengatasinya dari dua arah. Pertama adalah *mengapa privasi?* Saat ini, semua pasar ini berjalan berdasarkan perjanjian bilateral. Ada dua pihak. Mereka sangat terbiasa dengan gagasan bahwa informasi yang tepat yang perlu bocor, akan bocor, dan tidak ada yang lain. Jadi satu-satunya cara mereka akan mempertimbangkan rantai blok publik adalah dengan terpenuhinya tingkat privasi tersebut. 

Dari arah lain, *mengapa berada di rantai blok publik?* Ini adalah pasar yang kompleks dengan pihak-pihak yang belum tentu saling percaya dan perlu mengandalkan regulasi lintas negara. Memiliki sumber kebenaran di pusat pasar tersebut adalah keuntungan besar yang tidak dapat Anda lakukan tanpa rantai blok publik. Saat ini mereka agak terhenti dan mengatakan "Ada potensi peningkatan ini, tetapi kami tidak dapat melakukannya tanpa privasi yang kami butuhkan." Kami mencoba menyatukan hal-hal tersebut.

**Amzah:** Ya. Jadi saya bekerja untuk ABN Amro, yang merupakan bank besar di Belanda. Kami memiliki 5 juta pelanggan ritel. Jadi kami sebenarnya tidak sedang membangun sesuatu saat ini secara khusus dalam privasi, tetapi apa yang akan datang sekarang adalah misalnya dompet identitas digital. Biasanya cara kerjanya adalah data disimpan dalam basis data terpusat dan kemudian Anda terhubung dengan penyedia luar atau pihak ketiga, tetapi itu tentu saja tidak benar-benar aman. Jadi kami sudah mulai memikirkan bagaimana kami dapat menggunakan bukti tanpa pengetahuan (ZK-proofs), misalnya, sehingga kami dapat memiliki pengungkapan selektif dengan pihak luar. Dalam hal itu, kami dapat melindungi informasi pelanggan kami dan juga membiarkan mereka terhubung dengan lingkungan Web3 yang lebih luas.

#### Alur Kerja dan Penyimpanan Konkret (10:07) {#concrete-workflows-and-storage-1007}

**Oskar Thorin:** Oke, bagus. Jika Anda memilih satu alur konkret yang mungkin Anda pedulikan — seperti mungkin beberapa penerbitan obligasi, perdagangan, atau pembayaran perbendaharaan — siapa yang dapat melihat apa tepatnya pada langkah apa, dan apa yang disimpan onchain versus offchain? Mungkin dimulai dengan François.

**François:** Cara yang bagus untuk mendekati ini adalah mendekatinya dari sudut pandang ingin berdagang dengan DEX di Uniswap. Hal yang menyenangkan adalah kami dapat menawarkan di Miden sesuatu yang menawarkan anonimitas penuh. Kami memiliki akun anonim yang saling berdagang melalui catatan (notes). Ini adalah campuran dari model akun dan model UTXO. 

Jika Anda berdagang dengan suatu tempat (venue), tempat itu akan ingin menjadi publik. Sebagai DEX, Anda ingin memublikasikan ulang harga setiap kali Anda berinteraksi dengan seseorang. Jadi Anda memancarkan catatan ke dalam sebuah batch. Sebagai pengguna, tidak ada apa pun onchain kecuali apa yang mungkin dapat didekripsi oleh tempat tersebut. Tempat tersebut melakukan perdagangan Anda dan memancarkan catatan saat keluar. Catatan tersebut kemudian dapat diklaim oleh akun yang bisa sepenuhnya privat. Jadi Anda mempertahankan anonimitas penuh dalam hal pengguna — dengan pengecualian tempat yang telah memutuskan untuk mengungkapkan beberapa informasi secara publik. Di atas semua itu, kami membangun alur kepatuhan, yang mencakup alur kerja kemampuan audit dan kebijakan kunci tampilan (view-key) yang memungkinkan rekayasa pasar di tingkat lokal.

**Eugenio:** Yah, mungkin saya bisa mengambilnya lebih dari perspektif fungsional. Umumnya setiap alur penerbitan atau distribusi untuk layanan institusional memiliki tiga pilar utama. Yang pertama adalah identitas dan kepercayaan, yang terhubung dengan alur orientasi untuk investor, proses KYC/KYB, dan sebagainya.

Yang kedua adalah penegakan kebijakan. Akun mengumpulkan semua informasi dari lingkungan offchain ini dan menghasilkan pemicu ke pernyataan eksekusi di rantai blok. Dalam konteks ini, teknik pelestarian privasi dapat membuat distribusi yang efisien. Misalnya, penawaran yang hanya dapat didistribusikan ke jenis investor tertentu yang terkait dengan jenis akun tertentu.

Pilar ketiga adalah pelaporan. Ini terkait dengan orientasi dan operasi perdagangan onchain. Perekat dari semua layanan ini adalah bagaimana kita mengekstrak dari pengesahan data onchain titik-titik data yang sebenarnya kita butuhkan offchain untuk memberikan pelaporan tradisional bagi klien kita pada akhirnya.

**Zach Obront:** Jawaban untuk ini sangat berbeda tergantung pada alur mana, bukan? Ini adalah salah satu tantangan di ruang ini — sulit untuk memiliki prinsip-prinsip umum. Salah satu contoh alur adalah pinjaman besar di mana pembayaran bunga dilakukan, dan banyak pemberi pinjaman dipisahkan. Harapannya adalah tidak ada yang boleh tahu tentang itu. Tidak ada regulasi seputar hal itu. Itu diizinkan untuk sepenuhnya privat, dan kami ingin dapat mendukung ujung spektrum tersebut. 

Di sisi lain, mungkin ada perdagangan posisi antara pemberi pinjaman, dan ada harapan bahwa pihak administratif tertentu dapat melihat bahwa perdagangan itu terjadi, tetapi bukan harganya. Mungkin yang lain dapat melihat semua detailnya. Kami telah membangun segalanya di sekitar model fleksibel ini di mana kami tidak ingin melakukan hardcode pada aturan kepatuhan. Kami ingin mengatakan bahwa pengguna atau aplikasi dapat menentukannya sendiri. Kami memiliki kemampuan untuk menegakkan aturan seputar regulator atau badan administratif yang dapat melihat berbagai hal, atau bahkan memberikan data agregat ke asosiasi.

**Amzah:** Ya. Saya sebagian besar setuju dengan apa yang dikatakan Zach. Di masa lalu, ketika institusi memikirkan tentang privasi, mereka hanya akan memulai rantai privat di mana mungkin 20 bank berpartisipasi dan hanya mereka yang dapat melihat apa yang ada di dalamnya. Namun sebenarnya, ini jauh lebih bernuansa. Ini tergantung pada kasus penggunaan, jenis alur apa, dan apa yang perlu diketahui oleh regulator. Anda dapat menempatkan informasi saldo onchain dalam bentuk yang lebih teragregasi menggunakan bukti cadangan (proof of reserves), misalnya.

#### Persyaratan yang Tidak Dapat Dinegosiasikan (15:26) {#non-negotiable-requirements-1526}

**Oskar Thorin:** Eugenio dan Amzah, dari bank, tempat, dan regulator, apa saja persyaratan yang tidak dapat dinegosiasikan yang terus Anda dengar berulang kali? Seperti jejak audit, aturan KYC, atau persyaratan pelaporan?

**Eugenio:** Saya akan mengatakan akuntabilitas dalam hal proses orientasi, dan kepatuhan yang terkait dengan pelaporan. Bagi saya, ini tentang membingkai persyaratan bisnis yang konkret ke dalam struktur teknis. Kesulitannya ada pada detailnya — apakah pengguna Anda adalah aplikasi atau investor menciptakan alur proses yang berbeda untuk ekosistem Anda. Tujuannya haruslah membangun sistem ini secara efisien, jika tidak kita akan terhalang dari adopsi. Inilah sebabnya mengapa infrastruktur akun di Ethereum berkembang dengan cara yang sangat keren.

**Amzah:** Ya, tidak ada tambahan nyata untuk itu. 

**François:** Salah satu pendiri kami menghabiskan berminggu-minggu dengan pelanggan di ruang institusional, dan permintaan tingkat atas yang muncul adalah "kontrol." Siapa yang melihat apa, kapan, dan untuk alasan apa. Dan kemudian Anda menurunkan percakapan tersebut ke dalam detail dan itu menjadi sangat disesuaikan. Bagi kami, ini bagus karena dunia keuangan tradisional telah menghabiskan puluhan tahun membangun praktik akuntansi dan alur AML/CTF mereka. Mereka sangat spesifik tentang kontrol tersebut. Jadi kami membangun kemampuan tersebut di lapisan protokol dan mendukung pelanggan dalam perjalanan mereka.

#### Pertukaran (Trade-offs) dan Likuiditas Global (18:10) {#trade-offs-and-global-liquidity-1810}

**Oskar Thorin:** Apa pertukaran utama yang saat ini Anda jalani? Kinerja versus privasi, atau likuiditas global versus kontrol pengetikan, atau transparansi onchain versus catatan offchain? Dimulai dengan Zach.

**Zach Obront:** Untungnya, kita berada di pasar di mana kecepatan bukanlah prioritas terbesar. Banyak pasar kredit diselesaikan dalam hitungan minggu, jadi hitungan detik bukanlah hal terbesar di pikiran mereka. Namun, UX dari privasi sangatlah sulit. Rantai blok sangat baik dalam mempertahankan konsep state yang diantrekan ini, menangani jika ada hal-hal yang berubah, dan memastikan transaksi diurutkan dengan benar. Saat kita mulai mengantrekan transaksi privat, segalanya menjadi rumit. Kita harus memikirkan pengalaman pengguna terbaik yang menyatu dengan privasi, terutama karena orang mengharapkan sistem menjadi privat sekaligus mudah digunakan.

**François:** Saya ingin menyoroti pertukaran yang *tidak* kita miliki, berkat Ethereum. Institusi benar-benar hanya ingin memasuki pasar jika itu sepadan dengan waktu mereka untuk masuk, yang berarti mereka menginginkan pasar global dengan efek jaringan, likuiditas yang dalam, dan banyak pihak lawan. Menjadi rollup di Ethereum, daripada rantai privat atau lapisan 1 (l1) lainnya, memberi kita akses ke pasar yang dalam itu.

Tentu saja, ada kompleksitas. Kami sangat peduli dengan pengalaman layanan premium (white-glove) untuk institusi yang memasuki pasar tersebut, sehingga mereka dapat memiliki kondisi mereka sendiri. Salah satu tantangannya adalah keseimbangan antara privasi dan ketahanan terhadap ancaman. Ada aktor ancaman yang ada di dunia Web3, dan kami ingin menanganinya dengan lebih baik untuk menawarkan pengalaman yang fantastis. Kami mendekati desentralisasi dengan hati-hati — kami tahu cara melakukannya, tetapi kami akan melakukannya pada saat yang paling melayani pelanggan.

#### Kepercayaan Sistem dan Pendorong Adopsi (20:47) {#system-trust-and-adoption-drivers-2047}

**Oskar Thorin:** Eugenio, bagaimana Anda membuat solusi ini dipercaya dan dapat digunakan oleh institusi dan pemerintah?

**Eugenio:** Semuanya dimulai dari mencoba mempertimbangkan layanan institusional sebagai sistem terintegrasi, di mana setiap bagian dari sistem melakukan aturan akses spesifiknya sendiri. Dari asal data hingga kompresi data di lapisan 2 (l2) dan desentralisasi data di lapisan 1 (l1). Jika kita menggabungkan sistem ini di mana lingkungan offchain memegang asumsi kepercayaan institusi, kita dapat mengalokasikan proses yang berbeda ke lapisan 2 (l2) dan lapisan 1 (l1).

**Oskar Thorin:** Amzah, bagaimana Anda melihat cara membuat sistem dipercaya dan dapat digunakan?

**Amzah:** Bagi kami, sangat penting bahwa itu dapat disesuaikan. Rantai blok tidak lagi hanya satu kasus penggunaan di mana semuanya sepenuhnya publik atau sepenuhnya privat. Ini bukan satu ukuran untuk semua. Yang juga paling penting bagi kami adalah mematuhi regulasi. Sektor perbankan di Eropa sangat diatur, dan jika ada sesuatu yang tidak benar mengenai privasi, itu tidak akan diterima oleh regulator.

#### Menatap ke Depan ke 2026 (23:15) {#looking-ahead-to-2026-2315}

**Oskar Thorin:** Baiklah, kita hampir sampai di penghujung acara. Apa satu blok bangunan — secara teknis, operasional, atau kebijakan — yang menurut Anda akan secara bermakna mempercepat adopsi institusional? Dan jika kita bertemu lagi pada tahun 2026, menurut Anda apa yang realistis yang akan terjadi tahun ini?

**Zach Obront:** Saya pikir "institusional" dan "privasi" saat ini adalah istilah yang sangat luas, dan keduanya bersinggungan secara berbeda di berbagai kasus penggunaan. Beberapa peduli untuk terhubung ke pasar yang likuid, sementara yang lain hanya menginginkan infrastruktur internal yang lebih baik. Ini akan membawa kita maju untuk mendapatkan kejelasan tentang situasi spesifik yang sedang kita coba selesaikan. Belum ada kategorisasi mendalam tentang persyaratan kepatuhan. Mendorong untuk memetakan persyaratan tersebut dan mengubahnya menjadi protokol yang mendukungnya akan meningkatkan kemampuan kita untuk membangun, daripada mengandalkan dunia terfragmentasi yang dijalankan oleh pengacara.

**Amzah:** Teknologinya telah berkembang pesat dengan bukti tanpa pengetahuan dan enkripsi homomorfik penuh. Saya pikir salah satu hal terpenting untuk ditingkatkan adalah pendidikan bagi regulator dan institusi. Mereka mungkin pernah mendengar tentang bukti tanpa pengetahuan, tetapi mereka tidak benar-benar tahu bagaimana cara kerjanya. Mayoritas regulator masih berpikir dari sudut pandang hukum — jika ada yang rusak, siapa yang bisa kita hubungi? Dan jika tidak ada yang bisa dihubungi, itu adalah persepsi yang sulit bagi mereka.

**Eugenio:** Di sisi teknologi, pembuktian dan agregasi ZK secara real-time akan benar-benar memungkinkan kita untuk membangun kasus penggunaan yang kompleks yang menggabungkan aplikasi, klien institusional, dan lapisan 1 (l1). Saya juga mendukung apa yang dikatakan Amzah tentang pendidikan. Untuk tahun 2026, saya ingin melihat lebih banyak keterlibatan kolaboratif antar proyek sehingga aplikasi dapat benar-benar mulai memiliki akses ke likuiditas global dan jaringan global.

**François:** Jika kita bertemu dalam setahun, saya ingin telah meluncurkan Mainnet Miden di musim semi, sehingga kita dapat merayakannya. Di luar ini, saya ingin kita berada di jalur menuju desentralisasi penuh. Ini akan membutuhkan upaya bersama. Hal inti yang ingin saya lihat terjadi adalah lebih banyak keterlibatan. Gagasan bahwa privasi bertentangan dengan kepatuhan tidaklah benar, tetapi menyatukan keduanya membutuhkan kerja keras. Kami ingin institusi membantu membentuk jenis pasar yang ingin mereka lihat, karena kami tahu ini akan menjadi berantakan dan khas dengan kebutuhan mereka.

#### Pemikiran Penutup (28:05) {#closing-thoughts-2805}

**Oskar Thorin:** Saya hanya ingin memberi Anda masing-masing 10 hingga 20 detik untuk menyebutkan sesuatu yang terjadi minggu ini atau promosi singkat sebelum kita selesai.

**Amzah:** Tiga tahun lalu, saya adalah seorang sukarelawan yang membantu di salah satu Devconnect pertama. Melihat bagaimana orang memandang institusi sekarang dibandingkan dengan saat itu adalah peningkatan yang sangat besar.

**Zach Obront:** Sungguh menakjubkan betapa banyak privasi yang dibicarakan tahun ini. Latar belakang saya adalah di bidang keamanan, dan ada kekurangan peneliti keamanan yang memahami hal ini. Siapa pun yang berada di persimpangan itu, saya mendorong Anda untuk terjun sepenuhnya.

**Eugenio:** Saya akan memilih organisasi regulasi data — saya pikir ada banyak harapan untuk ZKP dalam domain data yang patuh, dan lapisan interoperabilitas Ethereum akan membantu membawa institusi onchain.

**François:** Sangat sulit sebagai seorang insinyur; biasanya Anda mendengar tentang subjek khusus. Kami baru-baru ini mendaratkan prakompilasi (precompiles) di Miden, yang membuka verifikasi alur yang melibatkan pembelajaran mesin (machine learning). Jika Anda sangat kutu buku seperti saya, Anda benar-benar ingin melakukan pembelajaran mesin dan bukti pembelajaran mesin, dan itu sekarang adalah hal yang dapat kita lakukan.

**Oskar Thorin:** Saya ingin berterima kasih kepada semua panelis. Kita mendengar beberapa perspektif yang sangat menarik di seluruh teknologi, kebijakan, dan rekayasa. Kita baru saja menyentuh permukaannya, tetapi saya sarankan Anda berbicara lebih banyak jika Anda tertarik dengan topik ini. Terima kasih.