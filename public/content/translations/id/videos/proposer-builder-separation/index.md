---
title: "Melampaui protokol Ethereum: pemisahan pengusul-pembangun"
description: "Sebuah presentasi tentang pemisahan pengusul-pembangun (PBS), sebuah pola desain yang memisahkan peran pembangunan blok dan pengusulan blok di Ethereum."
lang: id
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "roadmap"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "Penjelasan PBS"
---

Presentasi ini menjelaskan bagaimana produksi blok Ethereum telah berevolusi dari model sederhana menjadi rantai pasokan canggih yang melibatkan validator, pembangun, pencari, dan relai. Barnabé Monnot dari Yayasan Ethereum menjelaskan mengapa pemisahan pengusul-pembangun (PBS) ada, bagaimana relai MEV-Boost memediasi hubungan antara pengusul dan pembangun, dan solusi dalam-protokol apa yang sedang dieksplorasi untuk mengurangi ketergantungan kepercayaan dan meningkatkan ketahanan sensor, distribusi MEV, serta desentralisasi validator.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=u8XvkTrjITs) yang diterbitkan oleh CBER Forum. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

#### Pengantar (0:00) {#introduction-000}

Nama saya Barnabé Monnot. Saya akan berbicara sedikit tentang apa yang terjadi di luar protokol, dan khususnya konsep pemisahan pengusul-pembangun (PBS) dan bagaimana hal itu dioperasikan dengan relai serta banyak infrastruktur offchain.

Saya suka menganggap protokol sebagai objek abstrak yang memiliki kekuatan tertentu. Salah satu kekuatan yang dimiliki protokol adalah kemampuannya untuk memberikan hak kepada peserta tertentu. Kita telah melihat pada pembicaraan sebelumnya bahwa protokol memberdayakan validator untuk melakukan tugas konsensus, tetapi itu bukan satu-satunya hal yang mereka lakukan — kita juga harus mengemas blok dengan transaksi. Kita menyebutnya tugas eksekusi, dan itulah yang ingin saya fokuskan dalam pembicaraan ini.

#### Mengapa validator menggunakan pembangun (0:46) {#why-validators-use-builders-046}

Yang menarik adalah meskipun protokol yang memunculkan hak-hak ini dan memberikannya kepada validator, apa yang kita amati dalam praktiknya adalah banyak validator memilih untuk tidak menggunakan hak itu sendiri. Mereka memilih untuk memberikan hak tersebut kepada orang lain untuk melakukannya atas nama mereka. Dan dengan "orang lain" kita mengenal mereka di Ethereum sebagai pembangun.

Jadi apa yang kita amati adalah meskipun validator terus melakukan tugas konsensus ini sendiri, mereka memutuskan untuk meneruskan tugas eksekusi kepada pembangun. Ini sebenarnya adalah pasar yang cukup signifikan. Saat ini sekitar 90% blok dibangun oleh pembangun eksternal, dan itu telah terjadi sejak sekitar Desember 2022 — tiga bulan setelah The Merge. Pembayaran median dari pembangun ke validator adalah sekitar $120 per blok. Ada satu juta dolar yang dibayarkan setiap hari, dan setiap 12 detik ada kemungkinan bagi pasar ini untuk mencapai semacam kesepakatan antara satu pengusul dan satu pembangun.

Hari ini saya ingin membahas mengapa validator menggunakan pembangun, dari mana hubungan itu berasal — saya akan memperkenalkan sedikit tentang MEV dan pencari di sepanjang jalan — kemudian saya akan memberi tahu Anda bagaimana hubungan ini dimediasi, dan saya akan berbicara tentang relai yang ada saat ini dan solusi dalam-protokol yang sedang kami pikirkan. Saya juga ingin melihat gambaran besarnya sedikit, karena mudah untuk melihat gambar-gambar ini dan berpikir "oh ini sangat menakutkan, bagaimana dengan desentralisasi?" Saya ingin memberi Anda pemahaman bahwa ini adalah pertukaran yang sedang dibuat, tetapi menurut pendapat saya dibuat ke arah yang benar.

#### Model naif dan MEV (3:04) {#the-naive-model-and-mev-304}

Anda dapat memikirkan model naif dari produksi blok di mana validator dipilih menurut proses pemilihan pemimpin, dan mereka harus membuat blok yang berisi daftar transaksi dari mempool. Dalam model yang paling naif, Anda benar-benar hanya memiliki dua pihak — validator yang mendengarkan mempool, dan ketika giliran mereka untuk membuat blok, mereka mengambil transaksi yang membayar biaya paling besar dan menambahkannya, biasanya menggunakan algoritma pengemasan yang tidak terlalu canggih.

Apa yang telah diamati secara cukup dramatis dalam lima tahun terakhir adalah bahwa ini memberikan banyak kekuatan kepada produsen — khususnya kekuatan pandangan terakhir. Mereka melihat apa yang ingin dilakukan pengguna, misalnya mereka melihat bahwa pengguna ingin menukar sesuatu, dan mereka dapat menggunakan informasi itu untuk mengekstraksi keuntungan bagi diri mereka sendiri.

Dalam kasus terbaik, keuntungan ini berasal dari fungsi pasar alami seperti arbitrase. Dalam kasus terburuk, itu bisa datang langsung dari saku pengguna, seperti dalam kasus serangan sandwich. Misalnya, seorang pengguna membuat pesanan tukar untuk token A terhadap token B di beberapa pasar seperti Uniswap. Transaksi itu akan menciptakan ketidakseimbangan harga dengan pasar lain yang diterapkan pada rantai yang sama. Produsen dapat melihat transaksi tertunda dan memasukkan transaksi mereka sendiri yang melakukan tukar ke arah lain di pasar yang berbeda, mengantongi arbitrase di sepanjang jalan.

Ini benar-benar memberikan banyak kekuatan kepada produsen dan membuat posisi menjadi produsen blok sangat berharga. Hak istimewa produsen ini adalah sesuatu yang sekarang kita sebut **nilai maksimal yang dapat diekstraksi (MEV)**.

#### Peran pencari (5:43) {#the-role-of-searchers-543}

Dalam praktiknya, produsen mungkin tidak tahu di mana letak nilainya. Anda bisa memiliki produsen blok yang agak tidak canggih — seperti yang disebutkan, siapa pun dapat menjadi validator selama mereka memiliki modal yang cukup dan mampu menjalankan node. Dalam praktiknya, saya mungkin tidak tahu cara melakukan arbitrase atau apa pun tentang pasar keuangan. Apa yang saya inginkan adalah seseorang memberi tahu saya di mana peluang ini berada — pasar orang-orang yang bersaing untuk memberi tahu saya apa hal terbaik yang harus dilakukan sebagai produsen blok.

Entitas-entitas ini yang sangat pandai menemukan peluang, kita menyebutnya **pencari**. Mereka memunculkan peluang kepada produsen blok. Pencari mungkin mengamati pengguna yang melakukan tukar, baik melalui mempool publik atau melalui dark pool atau saluran pribadi, dan kemudian berkomunikasi dengan validator: "Ada tukar yang terjadi — jika Anda mengemas tukar ini bersama dengan arbitrase ini ke dalam bundel transaksi atomik dan menyertakan bundel ini, maka Anda dapat menghasilkan uang dari arbitrase." Anda akan memiliki banyak pencari yang bersaing untuk meyakinkan produsen blok.

Model ini bekerja dengan baik dalam praktiknya jika pencari memercayai produsen untuk menjaga bundel tetap atomik. Anda mungkin baru-baru ini mendengar tentang serangan di Ethereum yang merugikan sekelompok penyerang sandwich sebesar $25 juta — akar penyebabnya adalah penyerang berhasil merusak atomisitas bundel, menerima isinya dan mencoba mengatur ulang serta memodifikasinya. Itu adalah properti yang sangat penting yang benar-benar hanya berlaku selama produsen dapat dipercaya untuk tidak merusak atomisitas ini.

#### Mengapa kita membutuhkan pembangun (8:16) {#why-we-need-builders-816}

Apa yang Anda lakukan jika produsen tidak tepercaya? Pasca-The Merge di Ethereum, kita memiliki staker solo — sekitar 6% dari jaringan — yang tidak kita kenal. Para pencari tidak akan benar-benar ingin mengirim bundel ke pengusul blok ini karena itu sedikit terlalu berbahaya.

Jadi desain yang dicapai adalah: alih-alih meminta pencari mengomunikasikan bundel yang disertakan produsen dalam blok mereka, kami akan membuat seluruh blok untuk Anda. Dengan begitu Anda bisa menandatangani blok secara buta — Anda tidak perlu tahu apa yang ada di dalamnya, Anda percaya bahwa pembangun memberi Anda blok yang bagus.

Sekarang Anda memiliki rantai yang lebih dalam ini: validator di satu ujung, pengguna di ujung lain, dan di antara seluruh rantai perantara ini yang terus menjadi lebih padat seiring waktu. Pembangun melakukan bagian eksekusi sementara validator melakukan konsensus.

#### Bagaimana relai MEV-Boost bekerja (13:01) {#how-mev-boost-relays-work-1301}

Katakanlah Anda adalah seorang pengusul dan Anda ingin masuk ke pasar ini. Layanan produksi blok ini adalah masalah pertukaran adil yang klasik — dua pihak mencoba mencapai kesepakatan tetapi mereka tidak saling percaya. Literatur klasik memberi tahu Anda bahwa Anda tidak dapat melakukan pertukaran yang adil tanpa pihak ketiga yang tepercaya.

Apa yang kita gunakan saat ini sebagai pihak ketiga yang tepercaya adalah apa yang kita sebut **relai** — relai MEV-Boost. MEV-Boost adalah nama protokol yang memediasi interaksi antara pembangun dan validator. Relai duduk di tengah untuk memastikan bahwa kesepakatan tercapai dari kedua belah pihak.

Relai memiliki beberapa peran. Pertama, ia perlu memvalidasi muatan dari pembangun — relai melihat dengan jelas blok yang sedang dibuat oleh pembangun dan dapat memeriksa bahwa itu valid dan dapat diusulkan ke jaringan. Ada variasi yang disebut relai optimis, di mana relai tidak segera memeriksa validitas tetapi meminta kolateral dari pembangun seandainya blok tersebut pada akhirnya tidak valid.

Kedua, para pembangun membuat penawaran yang mencoba bersaing untuk menjadi pembangun yang dipilih oleh validator. Relai bertindak sebagai penerus penawaran, mengirimkan penawaran ke validator. Kemudian pada langkah terakhir, setelah validator memilih salah satu penawaran dari relai — dan validator dapat terhubung ke sebanyak mungkin relai yang mereka inginkan — mereka menandatanganinya, masih tanpa mengetahui apa isi blok tersebut, dan mengirim kembali penawaran yang ditandatangani ke relai. Dengan penawaran yang ditandatangani ini, relai dapat merilis blok ke jaringan.

Ekonomi relai itu rumit. Beberapa gratis, semacam barang publik. Yang lain telah mengembangkan model pendapatan — relai Ultrasound, misalnya, memiliki "penyesuaian penawaran" di mana mereka mengambil selisih antara penawaran terbaik dan terbaik kedua sebagai pendapatan.

#### Kepercayaan dan relai (17:01) {#trust-and-the-relay-1701}

Relai adalah pihak ketiga yang tepercaya dalam sistem. Katakanlah sebuah relai menyajikan blok yang tidak valid — orang-orang akan segera melihatnya karena itu ditandatangani, dan mereka akan dengan sangat cepat memutuskan sambungan dari relai itu. Anda bahkan dapat menggosipkan semacam bukti kesalahan. Dalam lima blok, jika relai tidak berkinerja baik, orang-orang akan berhenti memercayainya dan langsung memutuskan sambungan.

Jadi ini didasarkan pada kepercayaan, tetapi dengan asumsi itu dapat diganti dengan agak cepat. Relai bukanlah validator — mereka tidak harus memiliki stake dan mereka tidak harus memiliki hubungan apa pun dengan Ethereum. Mungkin saja mereka adalah orang-orang yang kita kenal dan cintai hari ini, tetapi besok bisa jadi siapa saja.

#### Mengabadikan PBS dalam protokol (20:01) {#enshrining-pbs-in-the-protocol-2001}

Kami mencoba menghilangkan status pihak ketiga tepercaya dari relai. Kami memiliki pihak ketiga tepercaya yang kami sukai di Ethereum — dan itu adalah Ethereum itu sendiri. Anda dapat merancang solusi dalam-protokol yang pada dasarnya mencoba mengabadikan peran relai dan membuat ketergantungan padanya menjadi opsional.

Saat ini, protokol Ethereum melihat sebagian dari apa yang dilakukan validator tetapi benar-benar buta terhadap jaringan pembangun. Kami mencoba mendorongnya agar protokol Ethereum menjadi pihak ketiga yang tepercaya dalam interaksi antara pengusul dan pembangun — dalam arti itu, kita tidak perlu lagi bergantung pada relai.

#### Membatasi pembangun, memperkuat desentralisasi (22:05) {#constraining-builders-amplifying-decentralization-2205}

Gambaran besarnya itu penting. Di setiap lapisan tampaknya ada permainan berbeda yang terjadi dan pemain berbeda yang mengambil uang dari satu sama lain — apakah ini keuangan tradisional yang terulang kembali? Saya ingin berargumen bahwa pertukaran ini tidak datang dari tempat yang buruk. Mereka mencoba bersandar pada properti dari sistem ini yang menurut kami berguna untuk menskalakannya dan membuatnya lebih bermanfaat.

Vitalik berbicara tentang asimetri mendasar dari layanan yang mungkin ditawarkan oleh rantai blok. Konsensus membutuhkan sekumpulan besar orang yang terdesentralisasi untuk melakukan pemeriksaan. Tetapi beberapa layanan benar-benar membutuhkan satu orang untuk melakukan pekerjaan dengan baik dan agar semua orang memverifikasi bahwa pekerjaan itu dilakukan dengan baik. Kita hanya membutuhkan satu pembangun untuk membuat blok, dan kemudian semua orang dapat memverifikasi bahwa itu valid.

Saat ini jelas ada tiga pembangun dominan: Beaver Build, Titan, dan rsync Builder. Apakah itu keadaan yang baik? Tidak juga — kita bisa melakukan yang lebih baik. Tetapi apakah realistis untuk membayangkan kita akan memiliki pembangun sebanyak validator? Mungkin tidak.

Apa yang benar-benar kita inginkan adalah lapisan tipis validator ini membatasi dan memanfaatkan fakta bahwa ada pihak-pihak berkekuatan tinggi di tengah yang dapat melakukan tugas-tugas yang tidak memerlukan asumsi mayoritas yang jujur.

Beberapa ide untuk membatasi pembangun:

- **Daftar inklusi** — di mana validator memberi tahu pembangun "Anda harus menyertakan transaksi ini di blok Anda"
- **Pembangunan blok parsial** — memecah blok penuh sehingga pembangun tidak memiliki monopoli atas seluruh ruang
- **Mengurangi ketergantungan pihak ketiga** — mengabadikan peran relai dalam protokol

Untuk memperkuat desentralisasi validator:

- **Pemisahan pengesah-pengusul** — alih-alih menjadikan validator sebagai produsen blok secara default, memilih sekelompok orang yang berbeda untuk menjadi produsen blok dan memisahkan peran-peran tersebut
- **Mekanisme staking yang ditingkatkan** — staking di Ethereum sedikit belum sempurna saat ini dan dapat ditingkatkan

#### Pertanyaan dan penutup (27:03) {#questions-and-closing-2703}

Sebuah pertanyaan dari audiens: di dunia keuangan tradisional, waktu penyelesaian sedang dikurangi dari dua hari menjadi satu hari. Apakah mengurangi waktu penyelesaian dari 12 detik ke interval yang lebih pendek akan mengatasi beberapa masalah front-running?

Orang-orang membicarakan hal ini — mereka menyebutnya **prakonfirmasi**. Idenya adalah Anda mengirim transaksi Anda dan seseorang memberi tahu Anda "Anda masuk, pada harga ini, pada state itu." Masalahnya adalah, Anda tidak dapat menyelesaikan lebih cepat daripada protokol yang berjalan. Anda tidak bisa mendapatkan penyelesaian finalitas yang lebih cepat dari 12 menit. Anda tidak dapat bergerak lebih cepat dari waktu blok.

Mempersingkat waktu blok itu sulit karena kita ingin menjaga lapisan validator se-terdesentralisasi mungkin, dan mempersingkatnya hanya akan meningkatkan persyaratan perangkat keras.