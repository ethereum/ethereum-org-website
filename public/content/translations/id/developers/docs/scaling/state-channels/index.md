---
title: Kanal State
description: Pengenalan tentang state channel dan payment channel sebagai solusi skalabilitas yang saat ini digunakan oleh komunitas Ethereum.
lang: id
sidebarDepth: 3
---

Saluran status memungkinkan peserta untuk melakukan transaksi secara aman di luar rantai sambil meminimalkan interaksi dengan Ethereum Mainnet. Rekan-rekan dalam saluran dapat melakukan sejumlah transaksi offchain yang tidak terbatas, sementara hanya mengirimkan dua transaksi onchain saja: satu untuk membuka saluran dan satu lagi untuk menutupnya. Hal ini memungkinkan hasil transaksi yang sangat tinggi dan menghasilkan biaya yang lebih rendah bagi pengguna.

## Persyaratan {#prerequisites}

Anda sebaiknya sudah membaca dan memahami halaman kami tentang [skaling Ethereum](/developers/docs/scaling/) dan [layer 2](/layer-2/).

## Apa yang dimaksud dengan saluran? {#what-are-channels}

Blockchain publik, seperti Ethereum, menghadapi tantangan skalabilitas karena arsitektur terdistribusinya: semua transaksi onchain harus diproses oleh seluruh node. Node harus dapat menangani volume transaksi dalam sebuah blok dengan menggunakan perangkat keras yang sederhana, memberikan batasan pada throughput transaksi untuk menjaga agar jaringan tetap terdesentralisasi. Saluran blockchain memecahkan masalah ini dengan memungkinkan pengguna berinteraksi secara di luar rantai sambil tetap mengandalkan keamanan rantai utama untuk penyelesaian akhir.

Channels adalah protokol peer-to-peer sederhana yang memungkinkan dua pihak untuk melakukan banyak transaksi di antara mereka sendiri dan kemudian hanya memposting hasil akhir ke blockchain. Saluran ini menggunakan kriptografi untuk menunjukkan bahwa data ringkasan yang mereka hasilkan benar-benar merupakan hasil dari serangkaian transaksi perantara yang valid. Kontrak pintar ["multisig"](/developers/docs/smart-contracts/#multisig) memastikan bahwa transaksi ditandatangani oleh pihak-pihak yang tepat.

Dengan channel, perubahan status dieksekusi dan divalidasi oleh pihak-pihak yang berkepentingan, meminimalkan komputasi pada lapisan eksekusi Ethereum. Hal ini mengurangi kemacetan di Ethereum dan juga meningkatkan kecepatan pemrosesan transaksi bagi pengguna.

Setiap saluran dikelola oleh [multisig smart contract](/developers/docs/smart-contracts/#multisig)yang berjalan di Ethereum. Untuk membuka saluran, para peserta menyebarkan kontrak saluran di blockchain dan menyetor dana ke dalamnya. Kedua pihak secara bersama-sama menandatangani pembaruan status untuk menginisialisasi status saluran, setelah itu mereka dapat melakukan transaksi dengan cepat dan bebas di luar rantai.

Peserta menutup saluran dengan mengirimkan status terakhir saluran yang telah disepakati bersama ke onchain. Setelah itu, smart contract mendistribusikan dana yang terkunci sesuai dengan saldo masing-masing peserta dalam kondisi akhir saluran.

Saluran peer-to-peer sangat berguna untuk situasi di mana beberapa peserta yang telah ditentukan sebelumnya ingin bertransaksi dengan frekuensi tinggi tanpa menimbulkan biaya tambahan. Saluran blockchain dibagi menjadi dua kategori: payment channels **saluran pembayaran** dan state channels **saluran status**.

## Saluran pembayaran {#payment-channels}

Saluran pembayaran dapat dijelaskan sebagai "buku besar dua arah" yang dikelola bersama oleh dua pengguna. Saldo awal buku besar adalah jumlah deposit yang dikunci di kontrak onchain selama fase pembukaan saluran. Transfer pada saluran pembayaran dapat dilakukan secara instan dan tanpa keterlibatan blockchain itu sendiri, kecuali untuk pembuatan satu kali onchain di awal dan penutupan saluran di akhir.

Pembaruan saldo buku besar (yaitu, status saluran pembayaran) memerlukan persetujuan semua pihak dalam saluran. Pembaruan saluran yang ditandatangani oleh semua peserta saluran dianggap selesai, mirip dengan transaksi di Ethereum.

Saluran pembayaran termasuk salah satu solusi skalabilitas awal yang dirancang untuk meminimalkan aktivitas onchain yang mahal dari interaksi pengguna sederhana (misalnya, transfer ETH, atomic swap, pembayaran mikro). Peserta saluran dapat melakukan sejumlah tak terbatas transaksi instan tanpa biaya antara satu sama lain selama jumlah bersih dari transfer mereka tidak melebihi token yang di depositkan.

## Saluran state{#state-channels}

Selain mendukung pembayaran offchain, saluran pembayaran belum terbukti berguna untuk menangani logika transisi status umum. Saluran status diciptakan untuk mengatasi masalah ini dan membuat saluran berguna untuk meningkatkan perhitungan umum.

Saluran negara masih memiliki banyak kesamaan dengan saluran pembayaran. Sebagai contoh, pengguna berinteraksi dengan bertukar pesan (transaksi) yang ditandatangani secara kriptografis, yang juga harus ditandatangani oleh peserta saluran lainnya. Jika pembaruan status yang diusulkan tidak ditandatangani oleh semua peserta, pembaruan tersebut dianggap tidak valid.

Namun, selain menyimpan saldo pengguna, saluran ini juga melacak kondisi terkini dari penyimpanan kontrak (misalnya, nilai-nilai variabel kontrak).

Hal ini memungkinkan eksekusi smart contract secara offchain antara dua pengguna. Dalam skenario ini, pembaruan status internal smart contract hanya memerlukan persetujuan dari rekan-rekan yang membuat saluran.

Meskipun hal ini memecahkan masalah skalabilitas yang dijelaskan sebelumnya, hal ini berimplikasi pada keamanan. Di Ethereum, keabsahan transisi status ditegakkan oleh protokol konsensus jaringan. Hal ini menjadikan mustahil untuk mengusulkan pembaruan yang tidak valid pada status kontrak pintar atau mengubah eksekusi kontrak pintar.

Kanal status tidak memiliki jaminan keamanan yang sama. Sampai batas tertentu, saluran negara adalah versi miniatur dari Mainnet. Dengan terbatasnya jumlah partisipan yang menegakkan aturan, kemungkinan perilaku jahat (misalnya, mengajukan pembaruan status yang tidak valid) meningkat. Saluran status mendapatkan keamanan mereka dari sistem arbitrase sengketa yang berbasis pada bukti penipuan [fraud proofs](/glossary/#fraud-proof).

## Cara kerja state channel {#how-state-channels-work}

Pada dasarnya, aktivitas dalam sebuah state channel adalah sebuah sesi interaksi yang melibatkan pengguna dan sistem blockchain. Pengguna sebagian besar berkomunikasi satu sama lain di luar rantai dan hanya berinteraksi dengan blockchain yang mendasarinya untuk membuka saluran, menutup saluran, atau menyelesaikan sengketa yang mungkin terjadi antara peserta.

Bagian berikut ini menguraikan alur kerja dasar saluran negara:

### Membuka saluran {#opening-the-channel}

Membuka saluran mengharuskan peserta untuk memberikan dana ke kontrak pintar di Mainnet. Deposit juga berfungsi sebagai tab virtual, sehingga para aktor yang berpartisipasi dapat bertransaksi dengan bebas tanpa perlu menyelesaikan pembayaran dengan segera. Hanya ketika saluran diselesaikan di onchain, para pihak menyelesaikan transaksi satu sama lain dan menarik sisa saldo mereka.

Deposit ini juga berfungsi sebagai jaminan untuk menjamin perilaku jujur dari setiap peserta. Jika deposan dinyatakan bersalah atas tindakan jahat selama fase penyelesaian sengketa, kontrak akan memotong deposit mereka.

Rekan-rekan saluran harus menandatangani status awal, yang disetujui bersama. Ini berfungsi sebagai awal mula saluran negara, setelah itu pengguna dapat mulai bertransaksi.

### Menggunakan saluran {#using-the-channel}

Setelah menginisialisasi status saluran, rekan-rekan berinteraksi dengan menandatangani transaksi dan mengirimkannya kepada satu sama lain untuk mendapatkan persetujuan. Peserta memulai pembaruan status dengan transaksi ini dan menandatangani pembaruan status dari orang lain. Setiap transaksi terdiri dari hal-hal berikut ini:

- Sebuah **nonce**, yang berfungsi sebagai ID unik untuk transaksi dan mencegah serangan replay. Ini juga mengidentifikasi urutan pembaruan status yang terjadi (yang penting untuk penyelesaian sengketa)

- Status lama saluran

- Status baru saluran

- Transaksi yang memicu transisi keadaan (misalnya, Alice mengirim 5 ETH ke Bob)

Pembaruan status di dalam channel tidak disiarkan ke blockchain seperti biasanya ketika pengguna berinteraksi di Mainnet, yang sejalan dengan tujuan state channel untuk meminimalkan jejak onchain. Selama peserta menyetujui pembaruan status, pembaruan tersebut bersifat final seperti transaksi Ethereum. Peserta hanya perlu bergantung pada konsensus Mainnet jika terjadi perselisihan.

### Menutup channel{#closing-the-channel}

Menutup state channel memerlukan pengiriman status terakhir channel yang telah disepakati ke smart contract di blockchain. Detail yang dirujuk dalam pembaruan status termasuk jumlah pergerakan setiap peserta dan daftar transaksi yang disetujui.

Setelah memverifikasi bahwa pembaruan status valid (yaitu, ditandatangani oleh semua pihak), smart contract menyelesaikan saluran dan mendistribusikan dana terkunci sesuai dengan hasil saluran. Pembayaran yang dilakukan secara offchain diterapkan ke status Ethereum, dan setiap peserta menerima sisa bagian dari dana yang terkunci.

Skenario yang dijelaskan di atas mewakili apa yang terjadi pada kasus bahagia. Terkadang, pengguna mungkin tidak dapat mencapai kesepakatan dan menyelesaikan saluran (kasus yang menyedihkan). Salah satu dari yang berikut ini bisa jadi benar dalam situasi tersebut:

- Peserta menjadi offline dan gagal mengusulkan transisi status

- Peserta menolak untuk ikut menandatangani pembaruan status yang valid

- Peserta berusaha menyelesaikan channel dengan mengajukan pembaruan status lama ke kontrak onchain

- Peserta mengusulkan transisi status yang tidak valid untuk ditandatangani oleh orang lain

Setiap kali konsensus gagal di antara para aktor yang berpartisipasi dalam sebuah channel, opsi terakhir adalah bergantung pada konsensus Mainnet untuk menegakkan status akhir channel yang valid. Dalam kasus ini, menutup state channel memerlukan penyelesaian sengketa secara onchain.

### Penyelesaian sengketa{#settling-disputes}

Biasanya, pihak-pihak dalam sebuah channel setuju untuk menutup channel terlebih dahulu dan ikut menandatangani transisi status terakhir, yang mereka serahkan ke smart contract. Setelah pembaruan disetujui di blockchain, eksekusi smart contract offchain berakhir, dan peserta keluar dari saluran dengan dana mereka.

Namun, salah satu pihak dapat mengajukan permintaan di blockchain untuk mengakhiri eksekusi smart contract dan memfinalisasi saluran—tanpa menunggu persetujuan pihak lawan. Jika terjadi salah satu situasi yang melanggar konsensus seperti yang dijelaskan sebelumnya, salah satu pihak dapat memicu kontrak di blockchain untuk menutup saluran dan mendistribusikan dana. Hal ini memberikan tanpa kepercayaan **trustlessness**, memastikan bahwa pihak yang jujur dapat menarik deposit mereka kapan saja, terlepas dari tindakan pihak lain.

Untuk memproses keluar dari saluran, pengguna harus mengirimkan pembaruan status terakhir yang valid dari aplikasi ke kontrak onchain. Jika ini berhasil (yaitu, ada tanda tangan dari semua pihak), maka dana akan didistribusikan kembali sesuai dengan keinginan mereka.

Namun, ada penundaan dalam mengeksekusi permintaan keluar dari pengguna tunggal. Jika permintaan untuk menutup saluran disetujui secara bulat, maka transaksi keluar onchain akan dieksekusi segera.

Penundaan terjadi dalam keluar satu pengguna karena kemungkinan tindakan penipuan. Sebagai contoh, seorang peserta saluran mungkin mencoba menyelesaikan saluran di Ethereum dengan mengirimkan pembaruan status lama ke onchain.

Sebagai langkah penanggulangan, saluran status memungkinkan pengguna jujur menantang pembaruan status yang tidak valid dengan mengirimkan status terbaru dan sah dari saluran ke onchain. Saluran status dirancang sedemikian rupa sehingga pembaruan status yang lebih baru dan disetujui akan mengalahkan pembaruan status yang lebih lama.

Setelah salah satu pihak memicu sistem penyelesaian sengketa onchain, pihak lainnya diwajibkan merespons dalam batas waktu tertentu (disebut jendela tantangan atau challenge window). Ini memungkinkan pengguna untuk menantang transaksi keluar, terutama jika pihak lain menggunakan pembaruan yang usang.

Apapun situasinya, pengguna channel selalu memiliki jaminan finalitas yang kuat: jika transisi status yang mereka pegang ditandatangani oleh semua anggota dan merupakan pembaruan terbaru, maka status tersebut memiliki finalitas setara dengan transaksi onchain biasa. Mereka masih harus menantang pihak lain secara onchain, tetapi satu-satunya hasil yang mungkin adalah memfinalisasi status terakhir yang valid, yang memang mereka pegang.

### Bagaimana saluran status berinteraksi dengan Ethereum? {#how-do-state-channels-interact-with-ethereum}

Meskipun mereka beroperasi sebagai protokol offchain, state channel memiliki komponen onchain: kontrak pintar yang dikerahkan di Ethereum saat membuka channel. Kontrak ini mengontrol aset yang didepositkan ke dalam saluran, memverifikasi pembaruan status, dan mengatasi perselisihan antara peserta.

State channel tidak mempublikasikan data transaksi atau komitmen status ke Mainnet, berbeda dengan solusi skalabilitas [layer 2](/layer-2/). Namun, mereka lebih terhubung ke Mainnet dibandingkan, misalnya, [sidechains](/developers/docs/scaling/sidechains/), sehingga lebih aman dalam beberapa hal.

Saluran status mengandalkan protokol Ethereum utama untuk hal-hal berikut:

#### 1. Liveness{#liveness}

Kontrak onchain yang dideploy saat membuka channel bertanggung jawab atas fungsi dan operasional channel tersebut. Jika kontrak berjalan di Ethereum, maka saluran selalu tersedia untuk digunakan. Sebaliknya, sidechain selalu dapat gagal, meskipun Mainnet beroperasi, yang dapat membahayakan dana pengguna.

#### 2. Keamanan {#security}

Secara beberapa aspek, saluran status mengandalkan Ethereum untuk memberikan keamanan dan melindungi pengguna dari mitra yang jahat. Seperti yang dibahas dalam bagian-bagian selanjutnya, saluran menggunakan mekanisme bukti penipuan yang memungkinkan pengguna menantang upaya untuk menyelesaikan saluran dengan pembaruan yang tidak valid atau usang.

Dalam kasus ini, pihak yang jujur memberikan status terakhir yang valid dari channel sebagai bukti kecurangan kepada kontrak onchain untuk diverifikasi. Bukti kecurangan memungkinkan pihak-pihak yang saling tidak percaya untuk melakukan transaksi offchain tanpa mempertaruhkan dana mereka.

#### 3. Final {#finality}

Pembaruan status yang ditandatangani secara kolektif oleh pengguna saluran dianggap sama validnya dengan transaksi onchain. Namun, semua aktivitas dalam saluran hanya mencapai finalitas sejati ketika saluran ditutup di Ethereum.

In the optimistic case, both parties can cooperate and sign the final state update and submit onchain to close the channel, after which the funds are distributed according to the channel's final state. Dalam kasus pesimistis, di mana seseorang mencoba menipu dengan memposting pembaruan status yang salah di onchain, transaksinya tidak akan diselesaikan sampai jendela tantangan berakhir.

## Saluran status virtual {#virtual-state-channels}

Implementasi sederhana dari sebuah state channel adalah dengan menyebarkan kontrak baru setiap kali dua pengguna ingin menjalankan sebuah aplikasi offchain. Hal ini tidak hanya tidak praktis, tetapi juga menghilangkan efisiensi biaya dari state channels, karena biaya transaksi (onchain dapat cepat menumpuk).

Untuk mengatasi masalah ini, "saluran virtual" diciptakan. Tidak seperti channel biasa yang membutuhkan transaksi onchain untuk dibuka dan ditutup, virtual channel dapat dibuka, dijalankan, dan diselesaikan tanpa berinteraksi dengan rantai utama. Bahkan dimungkinkan untuk menyelesaikan sengketa secara offchain menggunakan metode ini.

Sistem ini bergantung pada keberadaan yang disebut "ledger channels", yang telah didanai di onchain. Saluran virtual antara dua pihak dapat dibangun di atas saluran buku besar yang sudah ada, dengan pemilik atau pemilik-pemilik saluran buku besar berfungsi sebagai perantara.

Pengguna di setiap saluran virtual berinteraksi melalui contoh kontrak baru, dengan saluran buku besar yang dapat mendukung beberapa contoh kontrak. State dari ledger channel juga memuat lebih dari satu status penyimpanan kontrak, memungkinkan eksekusi paralel dari aplikasi secara offchain antara berbagai pengguna.

Sama seperti saluran biasa, pengguna bertukar pembaruan status untuk memajukan mesin status. Kecuali terjadi sengketa, pihak perantara hanya perlu dihubungi saat membuka atau menutup saluran.

### Saluran pembayaran virtual {#virtual-payment-channels}

Saluran pembayaran virtual bekerja dengan konsep yang sama seperti saluran status virtual: peserta yang terhubung ke jaringan yang sama dapat bertukar pesan tanpa perlu membuka saluran baru di blockchain. Dalam saluran pembayaran virtual, transfer nilai dialihkan melalui satu atau beberapa perantara, dengan jaminan bahwa hanya penerima yang dituju yang dapat menerima dana yang ditransfer.

## Saluran aplikasi state {#applications-of-state-channels}

### Pembayaran {#payments}

Saluran blockchain awal adalah protokol sederhana yang memungkinkan dua peserta melakukan transfer cepat dengan biaya rendah secara offchain tanpa harus membayar biaya transaksi tinggi di Mainnet. Saat ini, saluran pembayaran masih berguna untuk aplikasi yang dirancang untuk pertukaran dan penyetoran eter dan token.

Pembayaran berbasis kanal memiliki keuntungan sebagai berikut:

1. **Throughput**: Jumlah transaksi offchain per saluran tidak terkait dengan throughput Ethereum, yang dipengaruhi oleh berbagai faktor, terutama ukuran blok dan waktu blok. Dengan mengeksekusi transaksi di luar rantai, saluran blockchain dapat mencapai throughput yang lebih tinggi.

2. **Privasi:** Karena saluran ini berada di luar rantai, rincian interaksi antara peserta tidak tercatat di blockchain publik Ethereum. Pengguna saluran hanya perlu berinteraksi di blockchain ketika mendanai dan menutup saluran atau menyelesaikan perselisihan. Dengan demikian, saluran berguna bagi individu yang menginginkan transaksi yang lebih pribadi.

3. **Latensi:** Transaksi offchain yang dilakukan antara peserta saluran dapat diselesaikan secara instan, jika kedua pihak bekerja sama, sehingga mengurangi keterlambatan. Sebaliknya, mengirim transaksi di Mainnet harus menunggu node untuk memproses transaksi, menghasilkan blok baru dengan transaksi tersebut, dan mencapai konsensus. Pengguna juga mungkin perlu menunggu konfirmasi blokir lebih lanjut sebelum mempertimbangkan untuk menyelesaikan transaksi.

4. **Biaya:** Saluran status sangat berguna dalam situasi di mana sekelompok peserta akan menukar banyak pembaruan status selama periode waktu yang panjang. Satu-satunya biaya yang dikeluarkan adalah pembukaan dan penutupan state channel smart contract; setiap perubahan state antara pembukaan dan penutupan channel akan lebih murah daripada yang sebelumnya karena biaya penyelesaian didistribusikan dengan tepat.

Mengimplementasikan saluran status pada solusi lapisan 2, seperti [rollups](/developers/docs/scaling/#rollups), dapat membuatnya lebih menarik untuk pembayaran. Meskipun saluran menawarkan pembayaran murah, biaya untuk menyiapkan kontrak onchain di Mainnet pada fase pembukaan bisa menjadi mahal—terutama ketika biaya gas melonjak. Rollup berbasis Ethereum menawarkan [biaya transaksi lebih rendah](https://l2fees.info/) dan dapat mengurangi beban bagi peserta saluran dengan menurunkan biaya setup.

### Transaksi mikro {#microtransactions}

Transaksi mikro adalah pembayaran bernilai rendah (misalnya, lebih rendah dari sepersekian dolar) yang tidak dapat diproses oleh bisnis tanpa menimbulkan kerugian. Entitas-entitas ini harus membayar penyedia layanan pembayaran, yang tidak dapat mereka lakukan jika margin pembayaran pelanggan terlalu rendah untuk menghasilkan keuntungan.

Saluran pembayaran menyelesaikan masalah ini dengan mengurangi biaya overhead yang terkait dengan transaksi mikro. Sebagai contoh, Penyedia Layanan Internet (ISP) dapat membuka saluran pembayaran dengan pelanggan, yang memungkinkan mereka untuk melakukan pembayaran dalam jumlah kecil setiap kali mereka menggunakan layanan.

Di luar biaya pembukaan dan penutupan saluran, peserta tidak dikenakan biaya lebih lanjut untuk transaksi mikro (tidak ada biaya gas). Ini adalah situasi yang saling menguntungkan karena pelanggan memiliki fleksibilitas lebih dalam menentukan jumlah yang mereka bayarkan untuk layanan dan bisnis tidak akan kehilangan transaksi mikro yang menguntungkan.

### Aplikasi Desentralisasi {#decentralized-applications}

Seperti saluran pembayaran, saluran negara dapat melakukan pembayaran bersyarat sesuai dengan status akhir mesin negara. Saluran status juga dapat mendukung logika transisi status arbitrer, sehingga berguna untuk mengeksekusi aplikasi umum secara offchain.

Saluran status sering kali dibatasi pada aplikasi sederhana berbasis giliran, karena ini mempermudah pengelolaan dana yang dikunci di kontrak onchain. Selain itu, dengan jumlah pihak yang terbatas yang memperbarui status aplikasi offchain secara berkala, menghukum perilaku tidak jujur menjadi relatif mudah.

Efisiensi aplikasi saluran negara juga bergantung pada desainnya. Sebagai contoh, seorang pengembang mungkin men-deploy kontrak saluran aplikasi di onchain sekali saja dan membiarkan pemain lain menggunakan kembali aplikasi tersebut tanpa harus berinteraksi dengan onchain. Dalam hal ini, saluran aplikasi awal berfungsi sebagai saluran buku besar ledger channel yang mendukung beberapa saluran virtual, masing-masing menjalankan instance baru dari kontrak pintar aplikasi secara offchain.

Kasus penggunaan yang potensial untuk aplikasi saluran negara adalah permainan dua pemain sederhana, di mana dana didistribusikan berdasarkan hasil permainan. Manfaatnya di sini adalah para pemain tidak perlu saling mempercayai (trustlessness) dan kontrak onchain, bukan pemain, yang mengontrol alokasi dana serta penyelesaian sengketa (desentralisasi).

Kasus penggunaan lain yang memungkinkan untuk aplikasi saluran negara termasuk kepemilikan nama ENS, buku besar NFT, dan banyak lagi.

### Transfer Atomic {#atomic-transfers}

Saluran pembayaran awal terbatas pada transfer antara dua pihak, sehingga membatasi penggunaannya. Namun, diperkenalkannya virtual channels memungkinkan individu untuk mengarahkan transfer melalui perantara (misalnya, beberapa channel p2p) tanpa harus membuka channel baru di blockchain.

Umumnya digambarkan sebagai "transfer multi-hop", pembayaran yang dirutekan bersifat atomik (yaitu, semua bagian transaksi berhasil atau gagal sama sekali). Transfer atomik menggunakan [Hashed Timelock Contracts (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) untuk memastikan pembayaran hanya dilepaskan jika kondisi tertentu terpenuhi, sehingga mengurangi risiko pihak lawan.

## Kelemahan menggunakan state channels {#drawbacks-of-state-channels}

### Asumsi liveness {#liveness-assumptions}

Untuk memastikan efisiensi, saluran negara menempatkan batas waktu pada kemampuan peserta saluran untuk menanggapi sengketa. Aturan ini mengasumsikan bahwa rekan-rekan akan selalu online untuk memantau aktivitas saluran dan mengikuti tantangan bila diperlukan.

Pada kenyataannya, pengguna bisa saja offline karena alasan di luar kendali mereka (misalnya, koneksi internet yang buruk, kerusakan mekanis, dll.). Jika pengguna yang jujur offline, rekan yang jahat dapat mengeksploitasi situasi ini dengan menampilkan status perantara yang lama pada kontrak adjudikator dan mencuri dana yang dikomitmenkan.

Beberapa saluran menggunakan "watchtowers" — entitas yang bertanggung jawab untuk memantau kejadian sengketa di blockchain atas nama pihak lain dan mengambil tindakan yang diperlukan, seperti memberi peringatan kepada pihak terkait. Namun, hal ini dapat menambah biaya penggunaan saluran negara.

### Ketersediaan Data {#data-unavailability}

Seperti yang telah dijelaskan sebelumnya, untuk mengajukan sengketa yang tidak sah, Anda harus menunjukkan status terbaru dan valid dari saluran negara. Ini adalah aturan lain yang didasarkan pada asumsi-bahwa pengguna memiliki akses ke status terbaru saluran.

Meskipun mengharapkan pengguna saluran untuk menyimpan salinan status aplikasi offchain adalah wajar, data ini bisa hilang akibat kesalahan atau kegagalan mekanis. Jika pengguna tidak memiliki data yang dicadangkan, mereka hanya bisa berharap bahwa pihak lain tidak menyelesaikan permintaan keluar yang tidak valid dengan menggunakan transisi status lama yang mereka miliki.

Pengguna Ethereum tidak perlu berurusan dengan masalah ini karena jaringan memberlakukan aturan tentang ketersediaan data. Data transaksi disimpan dan disebarkan oleh semua node dan tersedia untuk diunduh oleh pengguna jika diperlukan.

### Masalah Likuiditas {#liquidity-issues}

Untuk membuat saluran blockchain, para peserta perlu mengunci dana dalam smart contract onchain selama siklus hidup saluran tersebut. Hal ini mengurangi likuiditas pengguna channel dan juga membatasi channel hanya untuk mereka yang mampu menjaga dana tetap terkunci di Mainnet.

Namun, saluran buku besar ledger channels—yang dioperasikan oleh penyedia layanan offchain (OSP)—dapat mengurangi masalah likuiditas bagi pengguna. Dua rekan yang terhubung ke saluran buku besar dapat membuat saluran virtual, yang dapat mereka buka dan selesaikan sepenuhnya secara offchain, kapan pun mereka mau.

Penyedia layanan offchain juga bisa membuka saluran dengan beberapa rekan, sehingga berguna untuk merutekan pembayaran. Tentu saja, pengguna harus membayar biaya ke OSP untuk layanan mereka, yang mungkin tidak diinginkan oleh sebagian orang.

### Serangan Griefing {#griefing-attacks}

Serangan duka cita adalah fitur umum dari sistem berbasis bukti penipuan. Serangan duka cita tidak secara langsung menguntungkan penyerang, tetapi menyebabkan kesedihan (yaitu, bahaya) bagi korban, sesuai dengan namanya.

Pembuktian penipuan rentan terhadap serangan kesedihan karena pihak yang jujur harus menanggapi setiap perselisihan, bahkan yang tidak valid, atau berisiko kehilangan dana mereka. Seorang peserta jahat dapat memutuskan untuk terus-menerus memposting transisi status lama stale di onchain, memaksa pihak yang jujur untuk merespons dengan status yang valid. Biaya dari transaksi onchain tersebut dapat dengan cepat menumpuk, menyebabkan pihak yang jujur mengalami kerugian dalam prosesnya.

### Set peserta yang telah ditentukan sebelumnya {#predefined-participant-sets}

Secara desain, jumlah peserta yang terdiri dari saluran negara tetap tetap selama masa berlakunya. Hal ini karena memperbarui kumpulan peserta akan menyulitkan operasi saluran, terutama ketika mendanai saluran, atau menyelesaikan sengketa. Menambahkan atau menghapus peserta juga akan membutuhkan aktivitas onchain tambahan, yang meningkatkan beban bagi pengguna.

Meskipun hal ini membuat state channel lebih mudah untuk dipikirkan, namun hal ini membatasi kegunaan desain channel bagi pengembang aplikasi. Hal ini sebagian menjelaskan mengapa state channel ditiadakan dan digantikan oleh solusi penskalaan lain, seperti rollup.

### Pemrosesan transaksi paralel {#parallel-transaction-processing}

Peserta di saluran negara mengirim pembaruan negara secara bergantian, itulah sebabnya mengapa saluran ini bekerja paling baik untuk "aplikasi berbasis giliran" (misalnya, permainan catur dua pemain). Ini menghilangkan kebutuhan untuk menangani pembaruan status yang bersamaan dan mengurangi pekerjaan yang harus dilakukan kontrak onchain untuk menghukum pihak yang mengirim pembaruan lama. Namun, efek samping dari desain ini adalah bahwa transaksi saling bergantung satu sama lain, meningkatkan latensi dan mengurangi pengalaman pengguna secara keseluruhan.

Beberapa saluran status memecahkan masalah ini dengan menggunakan desain "full-duplex" yang memisahkan status offchain menjadi dua status "simplex" searah, sehingga memungkinkan pembaruan status secara bersamaan. Desain seperti ini meningkatkan throughput offchain dan mengurangi keterlambatan transaksi.

## Gunakan saluran status {#use-state-channels}

Beberapa proyek menyediakan implementasi kanal state yang dapat Anda integrasikan ke dalam dapp Anda:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Bacaan lebih lanjut {#further-reading}

**Kanal state**

- [Membuat Pemahaman tentang Solusi Skalabilitas Layer 2 Ethereum: Saluran Status, Plasma, dan Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4)– Josh Stark, 12 Februari 2018
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Blockchain State Channels: A State of the Art](https://ieeexplore.ieee.org/document/9627997)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
