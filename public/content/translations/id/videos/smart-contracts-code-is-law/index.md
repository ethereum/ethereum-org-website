---
title: "Kode adalah hukum? Penjelasan kontrak pintar"
description: "Menjelajahi konsep 'kode adalah hukum' melalui sudut pandang kontrak pintar di Ethereum dan DeFi. Video ini membahas apa itu kontrak pintar, bagaimana cara kerjanya, dan pertanyaan filosofis tentang apakah kode harus menjadi penengah utama."
lang: id
youtubeId: "pWGLtjG-F5c"
uploadDate: 2020-11-18
duration: "0:15:25"
educationLevel: beginner
topic:
  - "smart-contracts"
format: explainer
author: Finematics
breadcrumb: "Kontrak Pintar"
---

Sebuah penjelasan oleh **Finematics** yang menjelajahi konsep "kode adalah hukum" melalui sudut pandang kontrak pintar di Ethereum, mencakup apa itu kontrak pintar, bagaimana cara kerjanya, keuntungannya dibandingkan kontrak tradisional, dan mengapa mereka menjadi blok penyusun keuangan terdesentralisasi (DeFi).

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=pWGLtjG-F5c) yang dipublikasikan oleh Finematics. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Pengantar (0:00) {#introduction-000}

Pernahkah Anda mendengar ungkapan "kode adalah hukum," di mana teknologi digunakan untuk menegakkan aturan? Dalam hal ini, apakah kita masih membutuhkan pengacara? Atau mungkin kita bisa hidup di dunia yang sepenuhnya otomatis di mana kode mendikte apa yang boleh dan tidak boleh kita lakukan. Dengan perkembangan kontrak pintar saat ini, skenario futuristik ini mungkin lebih dekat dari yang kita kira.

Kontrak pintar adalah sepotong kode yang dapat dieksekusi secara otomatis dan dengan cara yang deterministik. Kode kontrak pintar biasanya disimpan dan dieksekusi di rantai blok untuk membuatnya tanpa kepercayaan dan aman. Kontrak pintar juga memiliki kemampuan untuk menerima, menyimpan, dan mengirim dana — dan bahkan memanggil kontrak pintar lainnya. Mereka mengikuti semantik jika-maka (if-then), yang membuatnya cukup mudah untuk diprogram.

Kontrak pintar bertujuan untuk menghilangkan faktor manusia dari pengambilan keputusan. Faktor manusia sering terbukti menjadi elemen yang paling rentan terhadap kesalahan dan tidak dapat diandalkan dari kontrak tradisional standar.

Mesin penjual otomatis (vending machine) sangat sering muncul sebagai analogi yang baik untuk kontrak pintar, karena memiliki beberapa kesamaan. Mesin penjual otomatis pada umumnya diprogram dengan cara yang memungkinkan tindakan tertentu dan transisi state berdasarkan input. Mesin ini juga bekerja dengan cara yang sepenuhnya deterministik. Misalnya, jika Anda ingin membeli sekaleng kola seharga dua dolar dan Anda hanya memiliki satu dolar, tidak peduli berapa kali Anda mencoba, Anda tidak akan bisa mendapatkan minuman tersebut. Di sisi lain, jika Anda memasukkan tiga dolar, mesin akan memberi Anda sekaleng kola dan uang kembalian yang sesuai. Bahkan uang kembalian yang diberikan dipilih dengan cara yang telah ditentukan dan diprogram berdasarkan koin mana yang tersedia dan koin mana yang ingin dikeluarkan mesin terlebih dahulu.

Kontrak pintar dapat murni bergantung pada informasi yang tersedia di rantai blok — misalnya, "jika Anda memberi saya sepuluh token A, saya akan memberi Anda sepuluh token B." Atau bisa juga bergantung pada sumber data eksternal, misalnya, pada harga ETH atau S&P 500. Contoh terakhir membuat kontrak pintar menjadi lebih sulit, karena mereka harus mempercayai data dunia nyata. Kepercayaan yang dibutuhkan dapat diminimalkan dengan menggunakan layanan orakel, tetapi bahkan layanan orakel pun harus dipercaya. Sudah ada beberapa proyek yang, dengan menggunakan insentif tertentu, membuat orakel lebih mungkin untuk memberikan data yang benar. Chainlink adalah proyek yang jelas menonjol dalam kategori ini.

#### Kontrak pintar Ethereum (3:09) {#ethereum-smart-contracts-309}

Ethereum adalah rantai blok yang mendukung kontrak pintar dan memungkinkan seorang pemrogram untuk mengimplementasikan kontrak pintar mereka sendiri. Kontrak pintar dapat ditulis dalam bahasa pemrograman yang disebut Solidity, yang dibuat khusus untuk tujuan tersebut. Di Ethereum, semua kontrak pintar yang diterapkan tidak dapat diubah — ini berarti bahwa setelah diterapkan, mereka tidak dapat dimodifikasi, yang menciptakan risiko tertentu yang akan kita bahas nanti.

Kontrak pintar di Ethereum juga terdesentralisasi, yang berarti tidak ada satu mesin pun yang mengendalikan kontrak tersebut. Faktanya, semua node di jaringan Ethereum menyimpan kontrak yang sama dengan state yang sama persis. Meskipun Ethereum saat ini adalah platform kontrak pintar serbaguna yang paling populer, ini bukan satu-satunya dan memiliki beberapa pesaing, termasuk Cardano, Tezos, EOS, dan Tron — tetapi tidak semuanya memiliki karakteristik yang sama.

#### Definisi kontrak pintar (4:23) {#smart-contract-definition-423}

Istilah "kontrak pintar" diciptakan oleh kriptografer terkenal Nick Szabo pada awal 1990-an. Nama tersebut, meskipun tidak terlalu menjelaskan dirinya sendiri, tetap melekat dan umum digunakan, terutama di industri rantai blok. Untuk melihat manfaat kontrak pintar, mari kita bandingkan kontrak pintar hipotetis dengan padanannya di ruang tradisional.

#### Contoh kontrak pintar (4:46) {#smart-contract-example-446}

Katakanlah kita ingin menulis kontrak berikut: jika Alice mengirimkan sejumlah X token A dan Bob mengirimkan jumlah token B yang sama, token tersebut akan ditukar — Alice akan menerima token Bob dan Bob akan menerima token Alice.

Di dunia tanpa kontrak pintar, salah satu cara untuk mencapai hal tersebut tanpa Alice harus mempercayai Bob dan Bob harus mempercayai Alice adalah dengan membuat kontrak eskro (escrow) dengan pihak ketiga. Pihak ketiga akan mengumpulkan token A dari Alice, menunggu jumlah token B yang sama dari Bob, dan mengirimkan token yang ditukar masing-masing kepada Alice dan Bob.

#### Masalah kontrak pintar (5:45) {#smart-contract-problems-545}

Pendekatan ini sudah menunjukkan beberapa masalah yang mungkin dihadapi Alice dan Bob:

- **Mempercayai perantara** — tidak ada jaminan bahwa pihak ketiga tidak akan melarikan diri dengan token setelah menerima dana dari Alice dan Bob. Kita harus bergantung pada reputasi perantara dan asuransi potensial.
- **Hasil non-deterministik** — jika terjadi kesalahan, hal itu mungkin memiliki keluaran yang berbeda tergantung pada berbagai faktor, termasuk yurisdiksi di mana kasus potensial akan diselesaikan.

Di sisi lain, kontrak pintar akan bekerja dengan cara yang sepenuhnya otomatis dan deterministik, memastikan kedua belah pihak menerima dana ketika mereka memenuhi kriteria awal untuk menyetorkan token. Kontrak pintar juga dapat menyimpan dana di dalam dirinya sendiri, yang tidak mungkin dicapai di dunia tradisional.

#### Kecepatan (6:47) {#speed-647}

Tergantung pada perantara, Alice dan Bob mungkin harus menunggu bahkan beberapa hari atau minggu untuk menyelesaikan transisi token. Bagaimana jika mereka ingin menukar token pada hari Minggu dan perantara tidak beroperasi? Dengan kontrak pintar, masalah semacam ini hilang, dan kontrak dapat dipenuhi beberapa detik setelah kriteria awal terpenuhi.

#### Biaya (7:16) {#cost-716}

Kontrak tradisional tidak hanya mahal karena perantara yang harus mengambil keuntungan — ada juga risiko besar biaya tersembunyi untuk hal-hal seperti arbitrase dan penegakan hukum jika ada masalah dengan kontrak.

Dapat digunakan kembali adalah keuntungan lainnya: kontrak pintar yang sama yang bertanggung jawab untuk menukar token Alice dan Bob dapat digunakan oleh siapa saja yang ingin menukar token. Di dunia tradisional, mereka semua harus menandatangani kontrak terpisah dan membayar biaya masing-masing kepada perantara.

#### Penipuan (7:58) {#fraud-758}

Penipuan adalah biaya tersembunyi lainnya, kali ini untuk perantara itu sendiri. Perantara harus memastikan bahwa token Alice dan Bob sah sebelum menginisialisasi tukar. Penipuan sangat umum dalam keuangan tradisional, dan sebagian besar perusahaan memiliki tim besar yang bekerja murni untuk mencegah penipuan. Dengan kontrak pintar, token dapat diverifikasi di rantai blok, dan dengan tanda tangan digital, langsung jelas apakah Alice dan Bob memenuhi syarat untuk membelanjakan token mereka.

#### Kasus penggunaan (8:42) {#use-cases-842}

Kontrak pintar memiliki jumlah kasus penggunaan yang terus berkembang mulai dari pembayaran dan keuangan terdesentralisasi (DeFi) hingga rantai pasokan dan urun dana (crowdfunding). Kontrak pintar juga merupakan blok penyusun dasar untuk aplikasi terdesentralisasi (dapp).

#### DeFi (9:07) {#defi-907}

Keuangan terdesentralisasi (DeFi) adalah salah satu industri baru yang sangat bergantung pada kontrak pintar. Beberapa hal yang telah dibangun di ruang ini meliputi:

- **Stablecoin terdesentralisasi** — dengan penggunaan kontrak pintar yang cerdas dan insentif tertentu, kita dapat membuat stablecoin yang dipatok ke dolar AS tanpa harus menyimpan dolar di dunia nyata. MakerDAO adalah salah satu proyek yang memungkinkan hal ini.
- **Penyediaan likuiditas otomatis** — serangkaian kontrak pintar dapat memungkinkan pengguna untuk menyediakan likuiditas dan menukar token dengan cara yang sepenuhnya tanpa izin dan terdesentralisasi. Uniswap dan Kyber Network adalah contoh yang baik dari protokol semacam itu.

#### Urun dana dan rantai pasokan (10:05) {#crowdfunding-and-supply-chains-1005}

Kasus penggunaan lainnya adalah memberikan lebih banyak transparansi pada rantai pasokan, di mana protokol seperti OriginTrail ikut berperan. Dalam hal urun dana, Anda dapat membayangkan sebuah kontrak yang membuka kunci dana segera setelah tujuan tertentu terpenuhi dan diverifikasi oleh komunitas.

#### Kontrak pintar masa depan (10:29) {#future-smart-contracts-1029}

Bagaimana jika kontrak pintar dapat memfasilitasi hal-hal seperti berbagi tumpangan (ride-sharing), penyewaan apartemen, dan banyak lagi? Bagaimana dengan amal? Anda dapat membayangkan dana yang sepenuhnya otomatis yang akan mengirimkan uang langsung kepada orang-orang yang paling membutuhkannya, tanpa perantara apa pun. Misalnya, dana tersebut dapat menentukan bahwa wilayah tertentu dilanda badai dan mengalihkan dana ke bagian dunia tersebut. Untuk saat ini, kedengarannya sangat tidak mungkin, tetapi semua elemen yang diperlukan untuk mewujudkan hal seperti ini sedang dibangun saat ini juga.

Kasus penggunaan untuk kontrak pintar hampir tidak terbatas, tetapi sebelum kita dapat mencapai semua itu, kita harus mengatasi beberapa masalah:

- **Bug** — salah satu risiko utama dalam hal kontrak pintar adalah sesuatu yang menghantui setiap perangkat lunak lainnya. Contoh terbaik adalah peretasan DAO, yang mengakibatkan hilangnya Ether senilai jutaan dolar karena penyerang dapat menguras dana dari kontrak pintar. Hal ini menyebabkan Ethereum melakukan percabangan keras dan menciptakan banyak ketidaksepakatan di komunitas Ethereum. Sejak peretasan DAO, komunitas Ethereum telah menghasilkan banyak langkah keamanan ekstra. Saat ini, hampir semua kontrak pintar populer telah melalui audit keamanan, sering kali oleh beberapa tim. Ada juga tren penggunaan metode verifikasi formal untuk membuktikan bahwa kontrak tertentu akan selalu berperilaku dengan cara yang diharapkan.
- **Perubahan protokol** — bahkan jika kontrak pintar tidak memiliki bug apa pun dan telah diaudit, kita tetap tidak dapat menjamin bahwa perubahan pada tingkat platform tidak akan menyebabkan masalah. Peningkatan pada protokol itu sendiri dapat menyebabkan kontrak pintar tertentu mulai berperilaku berbeda dari yang diharapkan.
- **Data dunia nyata** — layanan orakel dapat menyediakan cara yang dapat diandalkan untuk mendapatkan informasi dari dunia nyata ke dalam rantai blok. Namun bayangkan Anda menyewa apartemen atau mobil dan membuat kerusakan yang tidak disengaja. Bagaimana mungkin kontrak pintar, tanpa campur tangan manusia, mengetahuinya? Ada banyak contoh di mana sulit untuk membayangkan bagaimana sesuatu yang tidak terduga yang terjadi di dunia nyata dapat terlihat oleh kontrak pintar.

Selain hal di atas, ada juga risiko yang melibatkan regulasi dan pajak, tetapi ini semua pada akhirnya dapat diselesaikan.

#### Bisakah kita menggantikan pengacara? (13:58) {#can-we-replace-lawyers-1358}

Jadi, bisakah kita benar-benar menggantikan pengacara dengan kode? Tidak juga — setidaknya tidak untuk saat ini. Di masa depan, kemungkinan akan semakin banyak kontrak yang diotomatisasi, terutama di bidang keuangan. Namun bahkan di dunia yang sepenuhnya otomatis, pengacara dapat memberikan pengetahuan berharga yang dapat diterjemahkan ke dalam kode. Ada juga banyak tantangan regulasi di seputar industri kripto yang akan membuat pengacara sangat sibuk untuk sementara waktu. Namun demikian, jika saya seorang pengacara, saya akan mulai belajar tentang kontrak pintar dan pengkodean, karena mereka akan memainkan peran besar di masa depan.

#### Ringkasan (14:53) {#summary-1453}

Kelebihan kontrak pintar:

- Sepenuhnya otomatis
- Hasil deterministik
- Tanpa kepercayaan
- Cepat, presisi, dan aman
- Hemat biaya dan transparan

Kekurangan kontrak pintar:

- Bug perangkat lunak
- Perubahan protokol
- Ketidakpastian regulasi dan pajak

Meskipun kontrak pintar membawa risiko tertentu, kita masih berada di tahap yang sangat awal, dan sebagian besar masalah saat ini dapat diselesaikan.