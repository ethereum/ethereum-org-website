---
title: "EigenLayer: penambahan fitur tanpa izin ke Ethereum"
description: "Sreeram Kannan menyajikan pendekatan EigenLayer untuk penambahan fitur tanpa izin di Ethereum."
lang: id
youtubeId: "-V-fG4J1N_M"
uploadDate: 2023-02-10
duration: "0:24:11"
educationLevel: advanced
topic:
  - "staking ulang"
  - "eigenlayer"
  - "keamanan"
format: presentation
author: a16z crypto
breadcrumb: "EigenLayer"
---

Sebuah bincang penelitian oleh **Sreeram Kannan** (University of Washington / EigenLayer) di acara penelitian kripto a16z, yang menjelaskan bagaimana EigenLayer bertujuan untuk memungkinkan inovasi tanpa izin di Ethereum dengan mengizinkan staker untuk mengikat modal yang di-stake yang sama pada kondisi pemotongan tambahan sebagai imbalan untuk menyediakan layanan baru seperti orakel, jembatan, lapisan ketersediaan data, dan lingkungan eksekusi alternatif.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=-V-fG4J1N_M) yang diterbitkan oleh a16z crypto. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Pengantar (0:00) {#introduction-000}

Hari ini saya akan berbicara tentang salah satu produk yang sedang kami bangun, yang juga merupakan sebuah ide bernama EigenLayer. Kami menyebut EigenLayer sebagai kolektif staking ulang, tetapi apa yang dilakukannya adalah memungkinkan siapa saja untuk menambahkan fitur baru ke Ethereum.

Seperti yang diperkenalkan Tim, saya adalah seorang profesor madya di University of Washington di Seattle, tempat kami telah mengerjakan rantai blok, konsensus, dan bidang lainnya selama empat setengah tahun terakhir. Selama setahun terakhir, saya telah mendirikan perusahaan rintisan EigenLayer Labs. Kami telah melakukan banyak pekerjaan pada protokol konsensus — kami memiliki makalah berjudul "Everything is a Race" yang menganalisis kondisi di mana protokol tipe rantai terpanjang Bukti Kerja (PoW), Bukti Kepemilikan (PoS), dan bukti ruang (proof of space) aman. Kami membangun di atas beberapa pemahaman tersebut — misalnya, sebuah makalah berjudul Prism, yang merupakan protokol Bukti Kerja (PoW) dengan latensi yang sangat rendah. Kami juga melakukan pekerjaan yang disebut PoSAT tentang cara membuat protokol Bukti Kepemilikan (PoS) yang tersedia secara dinamis, di mana protokol Anda terus bekerja di bawah partisipasi yang bervariasi.

#### Kapan rantai blok dapat dipertanggungjawabkan (1:31) {#when-are-blockchains-accountable-131}

Kami juga mengeksplorasi kapan rantai blok dapat dipertanggungjawabkan. Salah satu heuristiknya adalah ketika Anda memiliki kuorum dan tanda tangan, jika sekelompok staker menandatangani ganda pada sebuah blok, rantai blok tersebut dapat dipertanggungjawabkan. Namun ada beberapa kehalusan — misalnya, protokol seperti Algorand, yang juga menggunakan kuorum, tidak dapat dipertanggungjawabkan karena bergantung pada asumsi waktu di mana Anda dapat membuat pelanggaran keamanan dengan tidak mengatakan apa pun.

#### Konsensus multi-sumber daya (2:11) {#multi-resource-consensus-211}

Dua karya terbaru adalah tentang konsensus multi-sumber daya — misalkan Anda ingin membangun protokol yang menggunakan Bukti Kepemilikan (PoS), bukti ruang, dan Bukti Kerja (PoW) yang semuanya digabungkan menjadi satu protokol. Anda ingin protokol tersebut berfungsi bahkan jika mayoritas penambang Bukti Kerja (PoW) bertindak jahat, asalkan sebagian kecil penambang Bukti Kepemilikan (PoS) jujur. Kami telah mengkarakterisasi wilayah tarik-ulur (trade-off) di berbagai sumber daya.

Kami juga mengerjakan desain topologi peer-to-peer — bagaimana Anda memastikan bahwa dalam jaringan peer-to-peer rantai blok, protokol konsensus menghormati urutan pesan? Salah satu hal yang terjadi secara merajalela di rantai blok adalah front-running. Untuk mencegah front-running yang tidak ditargetkan — di mana Anda hanya ingin mendahului orang lain karena Anda memiliki keuntungan harga — kami memiliki makalah berjudul Themis yang memberikan rantai blok properti masuk-pertama-keluar-pertama (first-in-first-out) bawaan.

Di atas konsensus, ada solusi penskalaan seperti sharding. Kami memiliki beberapa makalah — Coded Merkle Tree dan Free2Shard — tentang hal itu.

Satu hal yang kami temukan sebagai gesekan utama dalam rantai blok adalah bahwa tingkat inovasi pada lapisan inti — pada konsensus, sharding, atau peer-to-peer — jauh lebih rendah daripada tingkat inovasi pada lapisan aplikasi. Aplikasi dapat disebarkan tanpa izin — siapa pun dapat menyebarkan aplikasi di atas rantai blok yang ada seperti Ethereum. Sedangkan peningkatan protokol inti sangat berizin dalam arti yang sangat dalam. Hal ini telah cukup banyak menghambat ruang kita.

#### Memisahkan kepercayaan dan inovasi (8:30) {#decoupling-trust-and-innovation-830}

Membawa cerita kembali ke tahun 2008–2009: Bitcoin memelopori kepercayaan terdesentralisasi melalui penambangan Bukti Kerja (PoW). Di atas penambangan, ada protokol konsensus — rantai terpanjang atau rantai terberat — yang memutuskan rantai yang valid. Di atas itu, Bitcoin Script menetapkan semantik eksekusi. Jadi kita memiliki lapisan kepercayaan di dasar, lapisan konsensus di atasnya, dan lapisan eksekusi di atasnya lagi.

Namun Bitcoin juga merupakan rantai blok khusus aplikasi — dirancang untuk satu aplikasi: pertukaran Bitcoin di antara klien. Kembali ke tahun 2011, setiap aplikasi baru yang perlu dibangun di atas rantai blok membutuhkan jaringan kepercayaannya sendiri. Misalnya, seseorang ingin membangun sistem nama domain terdesentralisasi yang disebut Namecoin. Lapisan skrip Bitcoin tidak memberi Anda cukup kemampuan pemrograman, jadi Anda harus membuat lapisan skrip baru dan jaringan kepercayaan baru. Tidak ada cara untuk berbagi kepercayaan antara Namecoin dan Bitcoin.

Ide inti yang dibangun oleh Ethereum adalah pemisahan kepercayaan dan inovasi. Mereka mengambil lapisan skrip Bitcoin dan menggantinya dengan lapisan pemrograman Turing-complete serbaguna — Ethereum Virtual Machine. Ini adalah peningkatan teknis kecil dalam arti dasar, tetapi apa yang diciptakannya adalah modularitas kepercayaan. Sekarang siapa pun dapat datang dan membangun aplikasi terdesentralisasi (dapp) di atas sistem tersebut. Orang yang membangun ENS tidak ada hubungannya dengan jaringan kepercayaan. Kepercayaan jaringan Ethereum menjadi modul yang dapat dipasok ke aplikasi terdistribusi mana pun.

#### Inovasi terbuka (10:23) {#open-innovation-1023}

Hal ini menyebabkan percepatan besar-besaran dari ekonomi pseudonim. Siapa pun yang membuat aplikasi ini — mereka sendiri tidak dipercaya, mereka hanya membawa inovasi. Anda datang dengan sebuah ide, Anda bisa menjadi siapa saja, Anda tidak perlu dipercaya, Anda hanya menulis kode Anda, menaruhnya di Ethereum, dan semua orang percaya bahwa Ethereum akan terus mengeksekusi kondisi seperti yang dinyatakan.

Salah satu cara untuk memodelkan ini: lapisan dasar — jaringan kepercayaan, konsensus, dan mesin virtual — digabungkan menjadi jaringan kepercayaan yang menghasilkan kepercayaan. Rantai blok Ethereum adalah penghasil kepercayaan. Aplikasi terdistribusi adalah konsumen kepercayaan. Pertukaran nilainya adalah: dapp mendapatkan kepercayaan dari Ethereum dan sebagai imbalannya membayar biaya kembali. Sama seperti modal ventura yang merupakan pemisahan modal dan inovasi, Ethereum memisahkan kepercayaan dan inovasi.

Namun hambatan terhadap inovasi terbuka terus berlanjut. Jika saya memiliki ide tentang cara meningkatkan protokol konsensus Ethereum — katakanlah ini tahun 2019 dan saya datang dengan protokol konsensus Avalanche — tidak ada cara untuk menyebarkannya ke Ethereum. Jadi apa yang saya lakukan? Saya pergi dan menciptakan seluruh dunia saya sendiri. Ini adalah era rantai blok lapisan 1 (l1) alternatif — masing-masing dengan protokol konsensus yang berbeda, mesin virtual yang berbeda, tetapi masing-masing harus membangun jaringan kepercayaannya sendiri.

Gambaran ini terlihat persis seperti gambaran Bitcoin dan Namecoin pada tahun 2011. Inovasi di tingkat dapp dapat dengan mudah dibangun di atas Ethereum, tetapi inovasi yang lebih dalam dan menyentuh jantung tumpukan harus menciptakan ekosistem kepercayaan yang terfragmentasi.

Selain itu, Ethereum hanya memasok kepercayaan kepada dapp untuk pembuatan blok — pengurutan transaksi dan eksekusi transaksi. Itu saja. Jika dapp menginginkan kepercayaan pada hal lain — membaca data dari internet, membaca data dari rantai blok lain, menjalankan mesin eksekusi yang berbeda, menjalankan mesin permainan, menjalankan sistem autentikasi — mereka harus membuat jaringan kepercayaannya sendiri. Chainlink adalah contoh yang bagus: ini adalah protokol orakel yang membantu mengambil data dari internet ke dalam rantai blok, tetapi Chainlink memiliki jaringan kepercayaannya sendiri. Kepercayaannya tidak dipinjam dari staker Ethereum.

#### Masalah ekonomi mikro (16:28) {#microeconomic-problem-1628}

Masalah ekonomi mikro: jika Anda menjalankan middleware — katakanlah, sistem penyimpanan data — Anda harus membuat mekanisme staking Anda sendiri. Anda membutuhkan keamanan ekonomi yang tinggi, yang berarti banyak modal yang di-stake, dan kemudian Anda memiliki biaya peluang modal. Misalnya, Anda ingin $10 miliar di-stake di lapisan penyimpanan data Anda. Anda harus membayar tingkat tahunan 5% atau 10% pada modal tersebut di dunia non-spekulatif. Biaya dominannya bukanlah biaya operasional penyimpanan data — melainkan biaya untuk memberi makan basis modal ekonomi yang sangat besar.

Anda melihat ekosistem Bukti Kepemilikan (PoS) mana pun: 94% imbalan diberikan kepada orang yang memegang modal, dan hanya 6% yang diberikan kepada orang yang benar-benar melakukan operasi. Jadi, bahkan jika Anda datang dengan ide terobosan untuk mengurangi biaya operasional sebesar 10×, 94% tersebut tetap tidak berubah. Struktur biaya Anda dibatasi oleh biaya modal.

Jika Anda adalah sebuah dapp, masalah ekonomi mikronya adalah Anda membayar biaya yang sangat tinggi ke jaringan kepercayaan besar seperti Ethereum, tetapi Anda dibatasi oleh kepercayaan terlemah yang Anda andalkan. Jika Anda memiliki orakel atau jembatan yang tidak begitu tepercaya, Anda bisa dieksploitasi di sana. Keamanan Anda selalu menjadi penyebut persekutuan terkecil.

#### Masalah ekonomi (19:52) {#economic-problem-1952}

Untuk rantai blok inti, jika proposisi nilai intinya adalah untuk menyediakan kepercayaan terdesentralisasi dan menghasilkan pendapatan darinya, Ethereum hanya mampu menyediakan kepercayaan terdesentralisasi pada pembuatan blok — bukan pada semua hal lain yang diperlukan untuk menjalankan layanan terdesentralisasi. Pulau-pulau kepercayaan terdesentralisasi sedang diciptakan oleh middleware lain, dan alih-alih pendapatan menyelaraskan dan menciptakan jaringan kepercayaan yang masif, pendapatan terfragmentasi menjadi pulau-pulau yang lebih kecil.

#### EigenLayer (20:44) {#eigenlayer-2044}

Ini sebenarnya adalah ide yang sangat sederhana yang memecahkan semua masalah ini sekaligus.

EigenLayer adalah mekanisme untuk memanfaatkan jaringan kepercayaan yang ada untuk melakukan hal-hal lain yang tidak dimaksudkan untuk dilakukannya. Ethereum memasok kepercayaan pada pengurutan dan eksekusi. EigenLayer adalah serangkaian kontrak pintar di Ethereum, dan kata operatif intinya adalah staking ulang.

Apa itu staking ulang? Dalam Ethereum Bukti Kepemilikan (PoS), beberapa puluh miliar dolar telah di-stake di Rantai suar. EigenLayer adalah mekanisme di mana staker melakukan staking ulang — mereka menempatkan modal yang sama pada risiko tambahan. Mereka mengunci stake mereka di Ethereum, dan stake yang sama diikat pada kondisi pemotongan tambahan. Pemotongan adalah mekanisme di mana stake Anda dapat diambil, tetapi sekarang Anda menambahkan alasan tambahan di mana Anda dapat dihukum, di atas kontrak pintar EigenLayer.

Properti yang kami inginkan: stake yang sama mengambil risiko tambahan. Risiko tambahan pada apa? Pada penyediaan layanan baru apa pun yang telah dibangun di atas EigenLayer — seseorang ingin membangun orakel, jembatan, lapisan ketersediaan data, protokol konsensus baru. Semua ini dapat dibangun di atas EigenLayer. Jika Anda adalah staker yang ikut serta, Anda juga menentukan subkumpulan layanan mana yang Anda ikuti — dan dengan demikian memperoleh pendapatan sambil juga mengambil risiko pemotongan tambahan.

#### Bagaimana EigenLayer menyelaraskan ekosistem (23:50) {#how-eigenlayer-aligns-the-ecosystem-2350}

Untuk middleware: jika seorang staker yang sudah melakukan staking di Ethereum ikut serta untuk juga menyediakan layanan pada orakel, mereka tidak memiliki biaya modal tambahan. Mereka sudah melakukan staking di Ethereum dan mendapatkan APR. Dengan ikut serta dalam EigenLayer, biaya modal marjinalnya sangat kecil atau secara teoretis nol. Jika Anda tahu bahwa sebagai node yang jujur Anda tidak akan pernah dipotong, risikonya diminimalkan. Persamaannya menjadi: apakah biaya operasional terjustifikasi oleh pendapatan? Struktur biaya middleware tiba-tiba berubah dari dibatasi modal menjadi dibatasi biaya operasional.

Untuk dapp: terutama layanan populer yang diikuti oleh banyak staker memberikan kepercayaan yang sama seperti Ethereum itu sendiri. Jika semua staker berpotensi ikut serta, Anda bisa mendapatkan kepercayaan inti Ethereum pada layanan yang tidak dibangun secara bawaan ke dalam Ethereum.

Ini juga selaras nilainya dengan ekosistem inti. Staker yang melakukan staking di Ethereum mendapatkan imbalan blok dan biaya transaksi, tetapi mereka juga bisa mendapatkan biaya orakel, biaya ketersediaan data, biaya pengurutan — semua hal yang sebelumnya tidak tersedia. Fakta bahwa ada sumber pendapatan tambahan untuk staking ETH meningkatkan nilai token itu sendiri.

EigenLayer adalah pasar dua sisi. Satu sisi adalah staker yang ikut serta. Sisi lainnya adalah middleware dan layanan yang dibangun di atas EigenLayer yang ikut serta untuk menggunakan staker ini.

#### Over-leveraging dan manajemen risiko (33:00) {#over-leveraging-and-risk-management-3300}

**Pertanyaan audiens:** Bagaimana jika stake mengalami over-leveraging?

Katakanlah ada sepuluh dapp berbeda yang menjalankan rantai mereka sendiri, masing-masing dengan nilai $1 juta yang mengandalkan kuorum staker $2 juta yang sama — stake tersebut menjadi over-leveraged. EigenLayer juga merupakan lapisan manajemen risiko. Kami memodelkan ini sebagai masalah grafik: setiap staker adalah node, setiap layanan bergantung pada sekelompok staker, dan ada keuntungan dari korupsi untuk setiap layanan. Kemudian Anda menghitung potongan pada grafik ini untuk memastikan sistem tidak pernah over-leveraged.

Jika sistem menjadi over-leveraged, biaya naik, lebih banyak orang ikut serta, dan sistem menjadi under-leveraged lagi. Seiring dengan dimulainya lebih banyak layanan, peluang imbal hasil (yield) naik, dan lebih banyak modal yang terkunci — alih-alih 5% ETH yang di-stake, Anda mungkin memiliki 50%.

#### Ekonomi ruang blok (43:58) {#block-space-economics-4358}

Ruang blok ditentukan oleh batas blok — ukuran maksimum yang dapat diakomodasi oleh sebuah blok. Semua sistem rantai blok memiliki ekonomi yang menyesuaikan diri di mana saat ukuran blok Anda mendekati batas blok, harga mulai meledak.

Batas blok ditetapkan oleh infrastruktur node terlemah. Filosofi Ethereum adalah untuk menerima validator rumahan di Venezuela — mungkin 1 megabita per detik. Jadi begitulah batas blok ditetapkan. Tetapi semua staker yang berjalan di Amazon Web Services memiliki koneksi 10 gigabit — perbedaan 10.000× dari node terlemah.

EigenLayer secara otomatis menyelesaikan ini dengan menciptakan pasar bebas di mana para staker ini dapat meminjamkan ruang blok tambahan mereka untuk layanan lain. Seseorang dapat membangun rantai lain dengan 15 giga-gas per blok alih-alih 15 juta gas. Anda mendapatkan sekitar 60% dari keamanan Ethereum — dan itu sudah cukup baik.

#### Heterogenitas staker (48:57) {#staker-heterogeneity-4857}

Heterogenitas staker melampaui kemampuan komputasi. Staker sangat heterogen dalam preferensi risiko dan imbalan mereka. Anda dan saya mungkin setuju bahwa kita akan dipotong jika kita berbeda dari keluaran API Coinbase, tetapi bagi orang lain itu sama sekali tidak dapat diterima. Hal ini tidak akan pernah bisa dinormalisasi ke dalam protokol inti tetapi dapat dieksternalisasi ke dalam lapisan keikutsertaan (opt-in).

Staker juga heterogen dalam preferensi imbalan. Di Ethereum, ruang blok adalah kuantitas yang tidak berwarna — semua transaksi adalah sama, dan satu-satunya sinyal untuk membedakannya adalah harga. Sangat sulit untuk membangun jejaring sosial di atas Ethereum karena setiap transaksi jejaring sosial bersaing dengan transaksi keuangan terdesentralisasi (DeFi) yang jauh lebih menguntungkan berdasarkan transaksi-demi-transaksi. Solusi kami: staker ikut serta dalam rantai sub (sub-chains) yang berbeda di mana mereka memiliki preferensi imbalan yang berbeda.

#### Inovasi yang demokratis dan tangkas (51:01) {#democratic-and-agile-innovation-5101}

EigenLayer memecahkan masalah tentang bagaimana merancang rantai blok yang demokratis sekaligus tangkas dalam inovasi. Ethereum dikelola secara sangat demokratis tetapi juga sangat lambat dalam merespons. Semua protokol saat ini melakukan tarik-ulur antara ketangkasan dan tata kelola yang demokratis. Ethereum ditambah EigenLayer mendapatkan yang terbaik dari kedua dunia: lapisan dasar yang demokratis dan diperbarui secara perlahan, di atasnya EigenLayer memungkinkan orang untuk membangun inovasi yang merespons dengan cepat terhadap permintaan pasar dengan cara yang sepenuhnya tanpa izin.

#### EigenDA dan penutup (52:56) {#eigenda-and-closing-5256}

Kami sedang menjajaki pembangunan jembatan, otomatisasi berbasis kejadian, layanan pengurutan yang adil, rantai samping, dan integrasi MEV — semuanya di EigenLayer. EigenLayer sudah aktif di testnet internal. Kami telah membangun kasus penggunaan pertama: lapisan ketersediaan data berskala hiper untuk Ethereum yang disebut EigenDA. Ini adalah lapisan ketersediaan data yang menggabungkan ide-ide terbaik dalam pengodean penghapusan dan komitmen polinomial. Di testnet kami, kecepatan Anda dapat menulis data adalah 12,4 megabita per detik — 10× lebih besar dari apa yang dijadwalkan untuk dikirimkan oleh Ethereum 2.0.

Wawasan utamanya adalah bahwa dengan pengodean penghapusan, total biaya penyimpanan file tidak bergantung pada jumlah node yang ikut serta. Tetapi harga yang dapat Anda kenakan bergantung pada jumlah node karena Anda memberikan lebih banyak keamanan ekonomi. Ada ekonomi penskalaan mandiri di mana semakin banyak node akan ikut serta karena mereka dapat mengenakan premi keamanan tanpa meningkatkan biaya operasional. Pengodean penghapusan mematahkan tarik-ulur antara skalabilitas dan desentralisasi — Anda mendapatkan desentralisasi penuh dan skalabilitas penuh secara bersamaan.

#### Sorotan Tanya Jawab (58:00) {#qa-highlights-5800}

**Tentang audit middleware:** Sama seperti ada ekosistem audit kontrak pintar, kita membutuhkan ekosistem audit middleware. Audit kontrak pintar melayani pengguna yang seharusnya tidak tahu apa-apa. Audit middleware melayani staker yang seharusnya tahu sesuatu. Jika kita tidak bisa membuat audit middleware berfungsi, kita seharusnya juga tidak benar-benar memercayai audit kontrak pintar.

**Tentang risiko:** Contoh ekstremnya — semua stake ikut serta dalam sistem EigenLayer di mana Anda bisa dipotong bahkan tanpa melakukan sesuatu yang buruk, dan kemudian Anda dipotong dan seluruh protokol berada dalam risiko. Itu mungkin saja. Tetapi staker adalah pihak yang kehilangan uang mereka, jadi mereka harus lebih berhati-hati dalam ikut serta. Memudahkan mereka untuk berhati-hati adalah apa yang sedang kami fokuskan.

**Tentang ruang blok lapisan 1 (l1) vs. rantai samping:** Anda dapat menjalankan sistem yang sangat berbeda — seperti Solana VM — di atas jaringan kepercayaan Ethereum. Kondisi pemotongannya sederhana: jika Anda menandatangani ganda sebuah blok pada kedalaman yang sama, itu adalah kondisi yang dapat diverifikasi secara onchain dan Anda akan dipotong. Struktur biayanya berfungsi karena pelaku staking ulang tidak memiliki biaya modal tambahan, dan perbedaan antara rantai samping EigenLayer dan memiliki rantai Anda sendiri adalah Anda tidak memerlukan token nilai baru dan Anda tidak perlu membayar untuk mempertahankan biaya modal dari token tersebut.