---
title: State Channels
description: An introduction to state channels and payment channels as a scaling solution currently utilized by the Ethereum community.
lang: id
sidebarDepth: 3
---

Saluran status (state channel) memungkinkan peserta untuk bertransaksi secara aman secara offchain sambil menjaga interaksi dengan Mainnet [Ethereum](/) seminimal mungkin. Rekan saluran dapat melakukan sejumlah transaksi offchain secara bebas sementara hanya mengirimkan dua transaksi onchain untuk membuka dan menutup saluran. Hal ini memungkinkan throughput transaksi yang sangat tinggi dan menghasilkan biaya yang lebih rendah bagi pengguna.

## Prasyarat {#prerequisites}

Anda harus sudah membaca dan memahami halaman kami tentang [peningkatan Ethereum](/developers/docs/scaling/) dan [layer 2](/layer-2/).

## Apa itu saluran? {#what-are-channels}

Blockchain publik, seperti Ethereum, menghadapi tantangan skalabilitas karena arsitektur terdistribusi mereka: transaksi onchain harus dieksekusi oleh semua node. Node harus mampu menangani volume transaksi dalam sebuah blok menggunakan perangkat keras yang sederhana, yang memberlakukan batas pada throughput transaksi untuk menjaga jaringan tetap desentralisasi. Saluran blockchain memecahkan masalah ini dengan memungkinkan pengguna untuk berinteraksi secara offchain sambil tetap mengandalkan keamanan rantai utama untuk penyelesaian akhir.

Saluran adalah protokol peer-to-peer sederhana yang memungkinkan dua pihak untuk melakukan banyak transaksi di antara mereka sendiri dan kemudian hanya memposting hasil akhirnya ke blockchain. Saluran ini menggunakan kriptografi untuk menunjukkan bahwa data ringkasan yang mereka hasilkan benar-benar merupakan hasil dari serangkaian transaksi perantara yang valid. Sebuah kontrak pintar ["multi tanda tangan"](/developers/docs/smart-contracts/#multisig) memastikan transaksi ditandatangani oleh pihak yang tepat.

Dengan saluran, perubahan status dieksekusi dan divalidasi oleh pihak-pihak yang berkepentingan, meminimalkan komputasi pada lapisan eksekusi Ethereum. Hal ini mengurangi kemacetan di Ethereum dan juga meningkatkan kecepatan pemrosesan transaksi bagi pengguna.

Setiap saluran dikelola oleh [kontrak pintar multi tanda tangan](/developers/docs/smart-contracts/#multisig) yang berjalan di Ethereum. Untuk membuka saluran, peserta menerapkan kontrak saluran secara onchain dan menyetorkan dana ke dalamnya. Kedua belah pihak secara kolektif menandatangani pembaruan status untuk menginisialisasi status saluran, setelah itu mereka dapat bertransaksi dengan cepat dan bebas secara offchain.

Untuk menutup saluran, peserta mengirimkan status saluran terakhir yang disepakati secara onchain. Setelah itu, kontrak pintar mendistribusikan dana yang terkunci sesuai dengan saldo masing-masing peserta dalam status akhir saluran.

Saluran peer-to-peer sangat berguna untuk situasi di mana beberapa peserta yang telah ditentukan sebelumnya ingin bertransaksi dengan frekuensi tinggi tanpa menimbulkan overhead yang terlihat. Saluran blockchain terbagi dalam dua kategori: **saluran pembayaran (payment channel)** dan **saluran status (state channel)**.

## Saluran pembayaran {#payment-channels}

Saluran pembayaran paling baik digambarkan sebagai "buku besar dua arah" yang dikelola secara kolektif oleh dua pengguna. Saldo awal buku besar adalah jumlah deposit yang dikunci ke dalam kontrak onchain selama fase pembukaan saluran. Transfer saluran pembayaran dapat dilakukan secara instan dan tanpa keterlibatan blockchain yang sebenarnya itu sendiri, kecuali untuk pembuatan onchain satu kali di awal dan penutupan saluran pada akhirnya.

Pembaruan pada saldo buku besar (yaitu, status saluran pembayaran) memerlukan persetujuan dari semua pihak di dalam saluran. Pembaruan saluran, yang ditandatangani oleh semua peserta saluran, dianggap telah difinalisasi, sama seperti transaksi di Ethereum.

Saluran pembayaran adalah salah satu solusi peningkatan paling awal yang dirancang untuk meminimalkan aktivitas onchain yang mahal dari interaksi pengguna yang sederhana (misalnya, transfer ETH, pertukaran atomik, pembayaran mikro). Peserta saluran dapat melakukan transaksi instan tanpa biaya dalam jumlah tak terbatas antara satu sama lain selama jumlah bersih transfer mereka tidak melebihi token yang disetorkan.

## Saluran status {#state-channels}

Selain mendukung pembayaran offchain, saluran pembayaran belum terbukti berguna untuk menangani logika transisi status umum. Saluran status dibuat untuk memecahkan masalah ini dan membuat saluran berguna untuk peningkatan komputasi tujuan umum.

Saluran status masih memiliki banyak kesamaan dengan saluran pembayaran. Misalnya, pengguna berinteraksi dengan bertukar pesan (transaksi) yang ditandatangani secara kriptografi, yang juga harus ditandatangani oleh peserta saluran lainnya. Jika pembaruan status yang diusulkan tidak ditandatangani oleh semua peserta, maka pembaruan tersebut dianggap tidak valid.

Namun, selain menyimpan saldo pengguna, saluran ini juga melacak status penyimpanan kontrak saat ini (yaitu, nilai variabel kontrak).

Hal ini memungkinkan untuk mengeksekusi kontrak pintar secara offchain antara dua pengguna. Dalam skenario ini, pembaruan pada status internal kontrak pintar hanya memerlukan persetujuan dari rekan-rekan yang membuat saluran tersebut.

Meskipun ini memecahkan masalah skalabilitas yang dijelaskan sebelumnya, hal ini memiliki implikasi terhadap keamanan. Di Ethereum, validitas transisi status ditegakkan oleh protokol konsensus jaringan. Hal ini membuatnya tidak mungkin untuk mengusulkan pembaruan yang tidak valid pada status kontrak pintar atau mengubah eksekusi kontrak pintar.

Saluran status tidak memiliki jaminan keamanan yang sama. Sampai batas tertentu, saluran status adalah versi miniatur dari mainnet. Dengan serangkaian peserta terbatas yang menegakkan aturan, kemungkinan perilaku jahat (misalnya, mengusulkan pembaruan status yang tidak valid) meningkat. Saluran status memperoleh keamanannya dari sistem arbitrase perselisihan yang didasarkan pada [anti-penipuan](/glossary/#fraud-proof).

## Bagaimana saluran status bekerja {#how-state-channels-work}

Pada dasarnya, aktivitas dalam saluran status adalah sesi interaksi yang melibatkan pengguna dan sistem blockchain. Pengguna sebagian besar berkomunikasi satu sama lain secara offchain dan hanya berinteraksi dengan blockchain yang mendasarinya untuk membuka saluran, menutup saluran, atau menyelesaikan potensi perselisihan antar peserta.

Bagian berikut menguraikan alur kerja dasar dari saluran status:

### Membuka saluran {#opening-the-channel}

Membuka saluran mengharuskan peserta untuk mengunci dana ke kontrak pintar di mainnet. Deposit ini juga berfungsi sebagai tab virtual, sehingga aktor yang berpartisipasi dapat bertransaksi secara bebas tanpa perlu menyelesaikan pembayaran dengan segera. Hanya ketika saluran difinalisasi secara onchain, para pihak saling menyelesaikan dan menarik apa yang tersisa dari tab mereka.

Deposit ini juga berfungsi sebagai jaminan untuk menjamin perilaku jujur dari setiap peserta. Jika deposan terbukti bersalah atas tindakan jahat selama fase penyelesaian perselisihan, kontrak akan melakukan pemotongan terhadap deposit mereka.

Rekan saluran harus menandatangani status awal, yang disetujui oleh mereka semua. Ini berfungsi sebagai genesis saluran status, setelah itu pengguna dapat mulai bertransaksi.

### Menggunakan saluran {#using-the-channel}

Setelah menginisialisasi status saluran, rekan-rekan berinteraksi dengan menandatangani transaksi dan mengirimkannya satu sama lain untuk disetujui. Peserta memulai pembaruan status dengan transaksi ini dan menandatangani pembaruan status dari orang lain. Setiap transaksi terdiri dari hal-hal berikut:

- Sebuah **nonce**, yang bertindak sebagai ID unik untuk transaksi dan mencegah serangan replay. Ini juga mengidentifikasi urutan terjadinya pembaruan status (yang penting untuk penyelesaian perselisihan)

- Status lama saluran

- Status baru saluran

- Transaksi yang memicu transisi status (misalnya, Alice mengirim 5 ETH ke Bob)

Pembaruan status di dalam saluran tidak disiarkan secara onchain seperti yang biasanya terjadi ketika pengguna berinteraksi di mainnet, yang sejalan dengan tujuan saluran status untuk meminimalkan jejak onchain. Selama peserta menyetujui pembaruan status, pembaruan tersebut sama finalnya dengan transaksi Ethereum. Peserta hanya perlu bergantung pada konsensus mainnet jika timbul perselisihan.

### Menutup saluran {#closing-the-channel}

Menutup saluran status memerlukan pengiriman status akhir saluran yang disepakati ke kontrak pintar onchain. Detail yang dirujuk dalam pembaruan status mencakup jumlah langkah masing-masing peserta dan daftar transaksi yang disetujui.

Setelah memverifikasi bahwa pembaruan status valid (yaitu, ditandatangani oleh semua pihak), kontrak pintar memfinalisasi saluran dan mendistribusikan dana yang terkunci sesuai dengan hasil saluran. Pembayaran yang dilakukan secara offchain diterapkan pada status Ethereum dan setiap peserta menerima sisa porsi dana mereka yang terkunci.

Skenario yang dijelaskan di atas mewakili apa yang terjadi dalam kasus yang membahagiakan (happy case). Terkadang, pengguna mungkin tidak dapat mencapai kesepakatan dan memfinalisasi saluran (kasus yang menyedihkan/sad case). Salah satu dari hal berikut ini bisa jadi benar untuk situasi tersebut:

- Peserta offline dan gagal mengusulkan transisi status

- Peserta menolak untuk ikut menandatangani pembaruan status yang valid

- Peserta mencoba memfinalisasi saluran dengan mengusulkan pembaruan status lama ke kontrak onchain

- Peserta mengusulkan transisi status yang tidak valid untuk ditandatangani oleh orang lain

Kapan pun konsensus rusak di antara aktor yang berpartisipasi dalam sebuah saluran, opsi terakhir adalah mengandalkan konsensus mainnet untuk menegakkan status akhir saluran yang valid. Dalam hal ini, menutup saluran status memerlukan penyelesaian perselisihan secara onchain.

### Menyelesaikan perselisihan {#settling-disputes}

Biasanya, pihak-pihak dalam sebuah saluran setuju untuk menutup saluran sebelumnya dan ikut menandatangani transisi status terakhir, yang mereka kirimkan ke kontrak pintar. Setelah pembaruan disetujui secara onchain, eksekusi kontrak pintar offchain berakhir dan peserta keluar dari saluran dengan uang mereka.

Namun, satu pihak dapat mengirimkan permintaan onchain untuk mengakhiri eksekusi kontrak pintar dan memfinalisasi saluran—tanpa menunggu persetujuan rekan mereka. Jika salah satu situasi perusak konsensus yang dijelaskan sebelumnya terjadi, salah satu pihak dapat memicu kontrak onchain untuk menutup saluran dan mendistribusikan dana. Hal ini memberikan sifat **tanpa kepercayaan (trustlessness)**, memastikan bahwa pihak yang jujur dapat menarik deposit mereka kapan saja, terlepas dari tindakan pihak lain.

Untuk memproses keluar dari saluran, pengguna harus mengirimkan pembaruan status valid terakhir dari aplikasi ke kontrak onchain. Jika ini terbukti benar (yaitu, memuat tanda tangan semua pihak), maka dana didistribusikan kembali untuk keuntungan mereka.

Namun, ada penundaan dalam mengeksekusi permintaan keluar pengguna tunggal. Jika permintaan untuk menyimpulkan saluran disetujui dengan suara bulat, maka transaksi keluar onchain dieksekusi dengan segera.

Penundaan ini ikut berperan dalam proses keluar pengguna tunggal karena kemungkinan tindakan penipuan. Misalnya, peserta saluran mungkin mencoba memfinalisasi saluran di Ethereum dengan mengirimkan pembaruan status yang lebih lama secara onchain.

Sebagai tindakan pencegahan, saluran status memungkinkan pengguna yang jujur untuk menantang pembaruan status yang tidak valid dengan mengirimkan status saluran terbaru yang valid secara onchain. Saluran status dirancang sedemikian rupa sehingga pembaruan status yang lebih baru dan disepakati mengalahkan pembaruan status yang lebih lama.

Setelah rekan memicu sistem penyelesaian perselisihan onchain, pihak lain diharuskan untuk merespons dalam batas waktu (disebut jendela tantangan). Hal ini memungkinkan pengguna untuk menantang transaksi keluar, terutama jika pihak lain menerapkan pembaruan yang sudah usang.

Apa pun masalahnya, pengguna saluran selalu memiliki jaminan finalitas yang kuat: jika transisi status yang mereka miliki ditandatangani oleh semua anggota dan merupakan pembaruan terbaru, maka finalitasnya sama dengan transaksi onchain biasa. Mereka masih harus menantang pihak lain secara onchain, tetapi satu-satunya hasil yang mungkin adalah memfinalisasi status valid terakhir, yang mereka pegang.

### Bagaimana saluran status berinteraksi dengan Ethereum? {#how-do-state-channels-interact-with-ethereum}

Meskipun ada sebagai protokol offchain, saluran status memiliki komponen onchain: kontrak pintar yang diterapkan di Ethereum saat membuka saluran. Kontrak ini mengontrol aset yang disetorkan ke dalam saluran, memverifikasi pembaruan status, dan menengahi perselisihan antar peserta.

Saluran status tidak mempublikasikan data transaksi atau komitmen status ke mainnet, tidak seperti solusi peningkatan [layer 2](/layer-2/). Namun, mereka lebih terhubung ke mainnet daripada, katakanlah, [sidechain](/developers/docs/scaling/sidechains/), yang membuatnya sedikit lebih aman.

Saluran status mengandalkan protokol utama Ethereum untuk hal-hal berikut:

#### 1. Keaktifan (Liveness) {#liveness}

Kontrak onchain yang diterapkan saat membuka saluran bertanggung jawab atas fungsionalitas saluran. Jika kontrak berjalan di Ethereum, maka saluran selalu tersedia untuk digunakan. Sebaliknya, sidechain selalu bisa gagal, bahkan jika mainnet beroperasi, yang menempatkan dana pengguna dalam risiko.

#### 2. Keamanan {#security}

Sampai batas tertentu, saluran status mengandalkan Ethereum untuk memberikan keamanan dan melindungi pengguna dari rekan yang jahat. Seperti yang dibahas di bagian selanjutnya, saluran menggunakan mekanisme anti-penipuan yang memungkinkan pengguna menantang upaya untuk memfinalisasi saluran dengan pembaruan yang tidak valid atau usang.

Dalam hal ini, pihak yang jujur memberikan status saluran valid terbaru sebagai anti-penipuan ke kontrak onchain untuk verifikasi. Anti-penipuan memungkinkan pihak-pihak yang saling tidak percaya untuk melakukan transaksi offchain tanpa mempertaruhkan dana mereka dalam prosesnya.

#### 3. Finalitas {#finality}

Pembaruan status yang ditandatangani secara kolektif oleh pengguna saluran dianggap sama baiknya dengan transaksi onchain. Namun, semua aktivitas di dalam saluran hanya mencapai finalitas yang sebenarnya ketika saluran ditutup di Ethereum.

Dalam kasus yang optimis, kedua belah pihak dapat bekerja sama dan menandatangani pembaruan status akhir dan mengirimkannya secara onchain untuk menutup saluran, setelah itu dana didistribusikan sesuai dengan status akhir saluran. Dalam kasus yang pesimis, di mana seseorang mencoba menipu dengan memposting pembaruan status yang salah secara onchain, transaksi mereka tidak difinalisasi sampai jendela tantangan berlalu.

## Saluran status virtual {#virtual-state-channels}

Implementasi naif dari saluran status adalah menerapkan kontrak baru ketika dua pengguna ingin mengeksekusi aplikasi secara offchain. Hal ini tidak hanya tidak layak, tetapi juga meniadakan efektivitas biaya dari saluran status (biaya transaksi onchain dapat dengan cepat bertambah).

Untuk memecahkan masalah ini, "saluran virtual" diciptakan. Tidak seperti saluran biasa yang memerlukan transaksi onchain untuk membuka dan mengakhiri, saluran virtual dapat dibuka, dieksekusi, dan difinalisasi tanpa berinteraksi dengan rantai utama. Bahkan dimungkinkan untuk menyelesaikan perselisihan secara offchain menggunakan metode ini.

Sistem ini bergantung pada keberadaan apa yang disebut "saluran buku besar" (ledger channel), yang telah didanai secara onchain. Saluran virtual antara dua pihak dapat dibangun di atas saluran buku besar yang ada, dengan pemilik saluran buku besar berfungsi sebagai perantara.

Pengguna di setiap saluran virtual berinteraksi melalui instans kontrak baru, dengan saluran buku besar yang mampu mendukung beberapa instans kontrak. Status saluran buku besar juga berisi lebih dari satu status penyimpanan kontrak, yang memungkinkan eksekusi paralel aplikasi secara offchain di antara pengguna yang berbeda.

Sama seperti saluran biasa, pengguna bertukar pembaruan status untuk memajukan mesin status. Kecuali jika timbul perselisihan, perantara hanya perlu dihubungi saat membuka atau mengakhiri saluran.

### Saluran pembayaran virtual {#virtual-payment-channels}

Saluran pembayaran virtual bekerja berdasarkan ide yang sama dengan saluran status virtual: peserta yang terhubung ke jaringan yang sama dapat menyampaikan pesan tanpa perlu membuka saluran baru secara onchain. Dalam saluran pembayaran virtual, transfer nilai dirutekan melalui satu atau lebih perantara, dengan jaminan bahwa hanya penerima yang dituju yang dapat menerima dana yang ditransfer.

## Aplikasi saluran status {#applications-of-state-channels}

### Pembayaran {#payments}

Saluran blockchain awal adalah protokol sederhana yang memungkinkan dua peserta untuk melakukan transfer cepat dengan biaya rendah secara offchain tanpa harus membayar biaya transaksi yang tinggi di mainnet. Saat ini, saluran pembayaran masih berguna untuk aplikasi yang dirancang untuk pertukaran dan deposit ether dan token.

Pembayaran berbasis saluran memiliki keuntungan sebagai berikut:

1. **Throughput**: Jumlah transaksi offchain per saluran tidak terhubung dengan throughput Ethereum, yang dipengaruhi oleh berbagai faktor, terutama ukuran blok dan waktu blok. Dengan mengeksekusi transaksi secara offchain, saluran blockchain dapat mencapai throughput yang lebih tinggi.

2. **Privasi**: Karena saluran ada secara offchain, detail interaksi antar peserta tidak dicatat di blockchain publik Ethereum. Pengguna saluran hanya perlu berinteraksi secara onchain saat mendanai dan menutup saluran atau menyelesaikan perselisihan. Dengan demikian, saluran berguna bagi individu yang menginginkan transaksi yang lebih privat.

3. **Latensi**: Transaksi offchain yang dilakukan antar peserta saluran dapat diselesaikan secara instan, jika kedua belah pihak bekerja sama, sehingga mengurangi penundaan. Sebaliknya, mengirim transaksi di mainnet mengharuskan menunggu node untuk memproses transaksi, menghasilkan blok baru dengan transaksi tersebut, dan mencapai konsensus. Pengguna mungkin juga perlu menunggu lebih banyak konfirmasi blok sebelum menganggap transaksi telah difinalisasi.

4. **Biaya**: Saluran status sangat berguna dalam situasi di mana sekumpulan peserta akan bertukar banyak pembaruan status dalam jangka waktu yang lama. Satu-satunya biaya yang timbul adalah pembukaan dan penutupan kontrak pintar saluran status; setiap perubahan status antara pembukaan dan penutupan saluran akan lebih murah daripada yang sebelumnya karena biaya penyelesaian didistribusikan sebagaimana mestinya.

Menerapkan saluran status pada solusi layer 2, seperti [rollup](/developers/docs/scaling/#rollups), dapat membuatnya lebih menarik untuk pembayaran. Meskipun saluran menawarkan pembayaran yang murah, biaya penyiapan kontrak onchain di mainnet selama fase pembukaan bisa menjadi mahal—terutama ketika biaya gas melonjak. Rollup berbasis Ethereum menawarkan [biaya transaksi yang lebih rendah](https://l2fees.info/) dan dapat mengurangi overhead bagi peserta saluran dengan menurunkan biaya penyiapan.

### Transaksi mikro {#microtransactions}

Transaksi mikro adalah pembayaran bernilai rendah (misalnya, lebih rendah dari sebagian kecil dolar) yang tidak dapat diproses oleh bisnis tanpa menimbulkan kerugian. Entitas ini harus membayar penyedia layanan pembayaran, yang tidak dapat mereka lakukan jika margin pada pembayaran pelanggan terlalu rendah untuk menghasilkan keuntungan.

Saluran pembayaran memecahkan masalah ini dengan mengurangi overhead yang terkait dengan transaksi mikro. Misalnya, Penyedia Layanan Internet (ISP) dapat membuka saluran pembayaran dengan pelanggan, yang memungkinkan mereka untuk mengalirkan pembayaran kecil setiap kali mereka menggunakan layanan tersebut.

Di luar biaya pembukaan dan penutupan saluran, peserta tidak dikenakan biaya lebih lanjut pada transaksi mikro (tidak ada biaya gas). Ini adalah situasi yang saling menguntungkan karena pelanggan memiliki lebih banyak fleksibilitas dalam berapa banyak mereka membayar untuk layanan dan bisnis tidak kehilangan transaksi mikro yang menguntungkan.

### Aplikasi terdesentralisasi {#decentralized-applications}

Seperti saluran pembayaran, saluran status dapat melakukan pembayaran bersyarat sesuai dengan status akhir mesin status. Saluran status juga dapat mendukung logika transisi status arbitrer, yang membuatnya berguna untuk mengeksekusi aplikasi generik secara offchain.

Saluran status sering kali terbatas pada aplikasi berbasis giliran yang sederhana, karena hal ini memudahkan pengelolaan dana yang dikunci ke kontrak onchain. Selain itu, dengan jumlah pihak yang terbatas yang memperbarui status aplikasi offchain secara berkala, menghukum perilaku tidak jujur relatif mudah.

Efisiensi aplikasi saluran status juga bergantung pada desainnya. Misalnya, pengembang mungkin menerapkan kontrak saluran aplikasi secara onchain sekali dan memungkinkan pemain lain untuk menggunakan kembali aplikasi tersebut tanpa harus menggunakan onchain. Dalam hal ini, saluran aplikasi awal berfungsi sebagai saluran buku besar yang mendukung beberapa saluran virtual, yang masing-masing menjalankan instans baru dari kontrak pintar aplikasi secara offchain.

Kasus penggunaan potensial untuk aplikasi saluran status adalah permainan dua pemain sederhana, di mana dana didistribusikan berdasarkan hasil permainan. Manfaatnya di sini adalah bahwa pemain tidak perlu saling percaya (tanpa kepercayaan) dan kontrak onchain, bukan pemain, yang mengontrol alokasi dana dan penyelesaian perselisihan (desentralisasi).

Kasus penggunaan lain yang mungkin untuk aplikasi saluran status mencakup kepemilikan nama ENS, buku besar NFT, dan banyak lagi.

### Transfer atomik {#atomic-transfers}

Saluran pembayaran awal dibatasi pada transfer antara dua pihak, yang membatasi kegunaannya. Namun, pengenalan saluran virtual memungkinkan individu untuk merutekan transfer melalui perantara (yaitu, beberapa saluran p2p) tanpa harus membuka saluran baru secara onchain.

Umumnya digambarkan sebagai "transfer multi-hop", pembayaran yang dirutekan bersifat atomik (yaitu, semua bagian transaksi berhasil atau gagal sama sekali). Transfer atomik menggunakan [Hashed Timelock Contracts (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) untuk memastikan pembayaran dirilis hanya jika kondisi tertentu terpenuhi, sehingga mengurangi risiko pihak lawan.

## Kelemahan menggunakan saluran status {#drawbacks-of-state-channels}

### Asumsi keaktifan {#liveness-assumptions}

Untuk memastikan efisiensi, saluran status menempatkan batas waktu pada kemampuan peserta saluran untuk merespons perselisihan. Aturan ini mengasumsikan bahwa rekan-rekan akan selalu online untuk memantau aktivitas saluran dan menentang tantangan bila diperlukan.

Pada kenyataannya, pengguna dapat offline karena alasan di luar kendali mereka (misalnya, koneksi internet yang buruk, kegagalan mekanis, dll.). Jika pengguna yang jujur offline, rekan yang jahat dapat mengeksploitasi situasi tersebut dengan menyajikan status perantara lama ke kontrak penengah dan mencuri dana yang dikunci.

Beberapa saluran menggunakan "menara pengawas" (watchtower)—entitas yang bertanggung jawab untuk mengawasi peristiwa perselisihan onchain atas nama orang lain dan mengambil tindakan yang diperlukan, seperti memperingatkan pihak-pihak yang berkepentingan. Namun, hal ini dapat menambah biaya penggunaan saluran status.

### Ketidaktersediaan data {#data-unavailability}

Seperti yang dijelaskan sebelumnya, menantang perselisihan yang tidak valid memerlukan penyajian status saluran status terbaru yang valid. Ini adalah aturan lain yang didasarkan pada asumsi—bahwa pengguna memiliki akses ke status terbaru saluran.

Meskipun mengharapkan pengguna saluran untuk menyimpan salinan status aplikasi offchain adalah hal yang wajar, data ini mungkin hilang karena kesalahan atau kegagalan mekanis. Jika pengguna tidak memiliki cadangan data, mereka hanya dapat berharap bahwa pihak lain tidak memfinalisasi permintaan keluar yang tidak valid menggunakan transisi status lama yang mereka miliki.

Pengguna Ethereum tidak perlu berurusan dengan masalah ini karena jaringan menegakkan aturan tentang ketersediaan data. Data transaksi disimpan dan disebarkan oleh semua node dan tersedia untuk diunduh pengguna jika dan ketika diperlukan.

### Masalah likuiditas {#liquidity-issues}

Untuk membuat saluran blockchain, peserta perlu mengunci dana dalam kontrak pintar onchain selama siklus hidup saluran. Hal ini mengurangi likuiditas pengguna saluran dan juga membatasi saluran bagi mereka yang mampu menjaga dana tetap terkunci di mainnet.

Namun, saluran buku besar—yang dioperasikan oleh penyedia layanan offchain (OSP)—dapat mengurangi masalah likuiditas bagi pengguna. Dua rekan yang terhubung ke saluran buku besar dapat membuat saluran virtual, yang dapat mereka buka dan finalisasi sepenuhnya secara offchain, kapan pun mereka mau.

Penyedia layanan offchain juga dapat membuka saluran dengan beberapa rekan, yang membuatnya berguna untuk merutekan pembayaran. Tentu saja, pengguna harus membayar biaya kepada OSP untuk layanan mereka, yang mungkin tidak diinginkan oleh sebagian orang.

### Serangan griefing {#griefing-attacks}

Serangan griefing adalah fitur umum dari sistem berbasis anti-penipuan. Serangan griefing tidak secara langsung menguntungkan penyerang tetapi menyebabkan kesedihan (yaitu, kerugian) bagi korban, oleh karena itu dinamakan demikian.

Pembuktian anti-penipuan rentan terhadap serangan griefing karena pihak yang jujur harus merespons setiap perselisihan, bahkan yang tidak valid sekalipun, atau berisiko kehilangan dana mereka. Peserta yang jahat dapat memutuskan untuk berulang kali memposting transisi status yang usang secara onchain, yang memaksa pihak yang jujur untuk merespons dengan status yang valid. Biaya transaksi onchain tersebut dapat dengan cepat bertambah, yang menyebabkan pihak yang jujur merugi dalam prosesnya.

### Kumpulan peserta yang telah ditentukan sebelumnya {#predefined-participant-sets}

Berdasarkan desain, jumlah peserta yang membentuk saluran status tetap tidak berubah sepanjang masa pakainya. Hal ini karena memperbarui kumpulan peserta akan memperumit operasi saluran, terutama saat mendanai saluran, atau menyelesaikan perselisihan. Menambah atau menghapus peserta juga akan memerlukan aktivitas onchain tambahan, yang meningkatkan overhead bagi pengguna.

Meskipun hal ini membuat saluran status lebih mudah untuk dipahami, hal ini membatasi kegunaan desain saluran bagi pengembang aplikasi. Hal ini sebagian menjelaskan mengapa saluran status telah ditinggalkan demi solusi peningkatan lainnya, seperti rollup.

### Pemrosesan transaksi paralel {#parallel-transaction-processing}

Peserta dalam saluran status mengirimkan pembaruan status secara bergantian, itulah sebabnya mereka bekerja paling baik untuk "aplikasi berbasis giliran" (misalnya, permainan catur dua pemain). Hal ini menghilangkan kebutuhan untuk menangani pembaruan status secara bersamaan dan mengurangi pekerjaan yang harus dilakukan kontrak onchain untuk menghukum pemosting pembaruan yang usang. Namun, efek samping dari desain ini adalah bahwa transaksi bergantung satu sama lain, yang meningkatkan latensi dan mengurangi pengalaman pengguna secara keseluruhan.

Beberapa saluran status memecahkan masalah ini dengan menggunakan desain "full-duplex" yang memisahkan status offchain menjadi dua status "simpleks" searah, yang memungkinkan pembaruan status secara bersamaan. Desain semacam itu meningkatkan throughput offchain dan mengurangi penundaan transaksi.

## Gunakan saluran status {#use-state-channels}

Beberapa proyek menyediakan implementasi saluran status yang dapat Anda integrasikan ke dalam dapps Anda:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Bacaan lebih lanjut {#further-reading}

**Saluran status**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [Basics of State Channels](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Blockchain State Channels: A State of the Art](https://ieeexplore.ieee.org/document/9627997)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_