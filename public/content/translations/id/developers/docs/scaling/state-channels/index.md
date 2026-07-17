---
title: Kanal State
description: Pengantar tentang kanal state dan kanal pembayaran sebagai solusi penskalaan yang saat ini digunakan oleh komunitas Ethereum.
lang: id
sidebarDepth: 3
---

Kanal state memungkinkan peserta untuk bertransaksi secara aman secara offchain sambil menjaga interaksi dengan Mainnet [Ethereum](/) seminimal mungkin. Peer kanal dapat melakukan sejumlah transaksi offchain tanpa batas sambil hanya mengirimkan dua transaksi onchain untuk membuka dan menutup kanal. Ini memungkinkan laju pemrosesan transaksi yang sangat tinggi dan menghasilkan biaya yang lebih rendah bagi pengguna.

## Prasyarat {#prerequisites}

Anda harus sudah membaca dan memahami halaman kami tentang [penskalaan Ethereum](/developers/docs/scaling/) dan [lapisan 2 (l2)](/layer-2/).

## Apa itu kanal? {#what-are-channels}

Rantai blok publik, seperti Ethereum, menghadapi tantangan skalabilitas karena arsitektur terdistribusinya: transaksi onchain harus dieksekusi oleh semua node. Node harus mampu menangani volume transaksi dalam sebuah blok menggunakan perangkat keras yang sederhana, yang memberlakukan batasan pada laju pemrosesan transaksi untuk menjaga jaringan tetap terdesentralisasi. Kanal rantai blok memecahkan masalah ini dengan memungkinkan pengguna untuk berinteraksi secara offchain sambil tetap mengandalkan keamanan rantai utama untuk penyelesaian akhir.

Kanal adalah protokol peer-to-peer sederhana yang memungkinkan dua pihak untuk melakukan banyak transaksi di antara mereka sendiri dan kemudian hanya memposting hasil akhirnya ke rantai blok. Kanal menggunakan kriptografi untuk menunjukkan bahwa data ringkasan yang mereka hasilkan benar-benar merupakan hasil dari serangkaian transaksi perantara yang valid. Sebuah kontrak pintar ["multisig"](/developers/docs/smart-contracts/#multisig) memastikan transaksi ditandatangani oleh pihak yang tepat.

Dengan kanal, perubahan state dieksekusi dan divalidasi oleh pihak-pihak yang berkepentingan, meminimalkan komputasi pada lapisan eksekusi Ethereum. Ini mengurangi kemacetan di Ethereum dan juga meningkatkan kecepatan pemrosesan transaksi bagi pengguna.

Setiap kanal dikelola oleh [kontrak pintar multisig](/developers/docs/smart-contracts/#multisig) yang berjalan di Ethereum. Untuk membuka kanal, peserta menyebarkan kontrak kanal secara onchain dan menyetorkan dana ke dalamnya. Kedua belah pihak secara kolektif menandatangani pembaruan state untuk menginisialisasi state kanal, setelah itu mereka dapat bertransaksi dengan cepat dan bebas secara offchain.

Untuk menutup kanal, peserta mengirimkan state kanal terakhir yang disepakati secara onchain. Setelah itu, kontrak pintar mendistribusikan dana yang dikunci sesuai dengan saldo masing-masing peserta dalam state akhir kanal.

Kanal peer-to-peer sangat berguna untuk situasi di mana beberapa peserta yang telah ditentukan sebelumnya ingin bertransaksi dengan frekuensi tinggi tanpa menimbulkan biaya tambahan yang terlihat. Kanal rantai blok terbagi dalam dua kategori: **kanal pembayaran** dan **kanal state**.

## Kanal pembayaran {#payment-channels}

Kanal pembayaran paling baik digambarkan sebagai "buku besar dua arah" yang dikelola secara kolektif oleh dua pengguna. Saldo awal buku besar adalah jumlah setoran yang dikunci ke dalam kontrak onchain selama fase pembukaan kanal. Transfer kanal pembayaran dapat dilakukan secara instan dan tanpa keterlibatan rantai blok yang sebenarnya itu sendiri, kecuali untuk pembuatan onchain satu kali di awal dan penutupan kanal pada akhirnya.

Pembaruan pada saldo buku besar (yaitu, state kanal pembayaran) mewajibkan persetujuan dari semua pihak di dalam kanal. Pembaruan kanal, yang ditandatangani oleh semua peserta kanal, dianggap telah difinalisasi, sangat mirip dengan transaksi di Ethereum.

Kanal pembayaran adalah salah satu solusi penskalaan paling awal yang dirancang untuk meminimalkan aktivitas onchain yang mahal dari interaksi pengguna yang sederhana (misalnya, transfer ETH, pertukaran atomik, pembayaran mikro). Peserta kanal dapat melakukan transaksi instan tanpa biaya dalam jumlah tak terbatas di antara mereka sendiri selama jumlah bersih transfer mereka tidak melebihi token yang disetorkan.

## Kanal state {#state-channels}

Selain mendukung pembayaran offchain, kanal pembayaran belum terbukti berguna untuk menangani logika transisi state secara umum. Kanal state diciptakan untuk memecahkan masalah ini dan membuat kanal berguna untuk menskalakan komputasi tujuan umum.

Kanal state masih memiliki banyak kesamaan dengan kanal pembayaran. Misalnya, pengguna berinteraksi dengan bertukar pesan yang ditandatangani secara kriptografi (transaksi), yang juga harus ditandatangani oleh peserta kanal lainnya. Jika pembaruan state yang diusulkan tidak ditandatangani oleh semua peserta, itu dianggap tidak valid.

Namun, selain menyimpan saldo pengguna, kanal juga melacak state saat ini dari penyimpanan kontrak (yaitu, nilai variabel kontrak).

Ini memungkinkan untuk mengeksekusi kontrak pintar secara offchain di antara dua pengguna. Dalam skenario ini, pembaruan pada state internal kontrak pintar hanya mewajibkan persetujuan dari peer yang membuat kanal tersebut.

Meskipun ini memecahkan masalah skalabilitas yang dijelaskan sebelumnya, hal ini memiliki implikasi terhadap keamanan. Di Ethereum, validitas transisi state ditegakkan oleh protokol konsensus jaringan. Ini membuatnya mustahil untuk mengusulkan pembaruan yang tidak valid pada state kontrak pintar atau mengubah eksekusi kontrak pintar.

Kanal state tidak memiliki jaminan keamanan yang sama. Sampai batas tertentu, kanal status adalah versi miniatur dari Mainnet. Dengan serangkaian peserta terbatas yang menegakkan aturan, kemungkinan perilaku jahat (misalnya, mengusulkan pembaruan state yang tidak valid) meningkat. Kanal state memperoleh keamanannya dari sistem arbitrase perselisihan yang didasarkan pada [bukti penipuan](/glossary/#fraud-proof).

## Cara kerja kanal state {#how-state-channels-work}

Pada dasarnya, aktivitas dalam kanal status adalah sesi interaksi yang melibatkan pengguna dan sistem rantai blok. Pengguna sebagian besar berkomunikasi satu sama lain secara offchain dan hanya berinteraksi dengan rantai blok yang mendasarinya untuk membuka kanal, menutup kanal, atau menyelesaikan potensi perselisihan di antara peserta.

Bagian berikut menguraikan alur kerja dasar dari sebuah kanal status:

### Membuka kanal {#opening-the-channel}

Membuka kanal mewajibkan peserta untuk mengunci dana ke kontrak pintar di Mainnet. Setoran ini juga berfungsi sebagai tabungan virtual, sehingga aktor yang berpartisipasi dapat bertransaksi dengan bebas tanpa perlu segera menyelesaikan pembayaran. Hanya ketika kanal difinalisasi secara onchain barulah para pihak saling menyelesaikan pembayaran dan menarik apa yang tersisa dari tabungan mereka.

Setoran ini juga berfungsi sebagai jaminan untuk memastikan perilaku jujur dari setiap peserta. Jika penyetor terbukti bersalah melakukan tindakan jahat selama fase penyelesaian perselisihan, kontrak akan memotong setoran mereka.

Peer kanal harus menandatangani state awal, yang disepakati oleh mereka semua. Ini berfungsi sebagai genesis kanal status, setelah itu pengguna dapat mulai bertransaksi.

### Menggunakan kanal {#using-the-channel}

Setelah menginisialisasi state kanal, peer berinteraksi dengan menandatangani transaksi dan mengirimkannya satu sama lain untuk disetujui. Peserta memulai pembaruan state dengan transaksi ini dan menandatangani pembaruan state dari yang lain. Setiap transaksi terdiri dari hal-hal berikut:

- Sebuah **nonce**, yang bertindak sebagai ID unik untuk transaksi dan mencegah serangan pemutaran ulang (replay attack). Ini juga mengidentifikasi urutan terjadinya pembaruan state (yang penting untuk penyelesaian perselisihan)

- State lama kanal

- State baru kanal

- Transaksi yang memicu transisi state (misalnya, Alice mengirim 5 ETH ke Bob)

Pembaruan state di dalam kanal tidak disiarkan secara onchain seperti yang biasanya terjadi ketika pengguna berinteraksi di Mainnet, yang sejalan dengan tujuan kanal state untuk meminimalkan jejak onchain. Selama peserta menyetujui pembaruan state, pembaruan tersebut sama finalnya dengan transaksi Ethereum. Peserta hanya perlu bergantung pada konsensus Mainnet jika timbul perselisihan.

### Menutup kanal {#closing-the-channel}

Menutup kanal status mewajibkan pengiriman state akhir kanal yang disepakati ke kontrak pintar onchain. Detail yang dirujuk dalam pembaruan state mencakup jumlah langkah masing-masing peserta dan daftar transaksi yang disetujui.

Setelah memverifikasi bahwa pembaruan state valid (yaitu, ditandatangani oleh semua pihak), kontrak pintar memfinalisasi kanal dan mendistribusikan dana yang dikunci sesuai dengan hasil kanal. Pembayaran yang dilakukan secara offchain diterapkan pada state Ethereum dan setiap peserta menerima sisa porsi dana mereka yang terkunci.

Skenario yang dijelaskan di atas mewakili apa yang terjadi dalam kasus yang ideal. Terkadang, pengguna mungkin tidak dapat mencapai kesepakatan dan memfinalisasi kanal (kasus yang buruk). Salah satu dari hal berikut bisa terjadi dalam situasi tersebut:

- Peserta menjadi offline dan gagal mengusulkan transisi state

- Peserta menolak untuk ikut menandatangani pembaruan state yang valid

- Peserta mencoba memfinalisasi kanal dengan mengusulkan pembaruan state lama ke kontrak onchain

- Peserta mengusulkan transisi state yang tidak valid untuk ditandatangani oleh orang lain

Kapan pun konsensus rusak di antara aktor yang berpartisipasi dalam sebuah kanal, opsi terakhir adalah mengandalkan konsensus Mainnet untuk menegakkan state akhir kanal yang valid. Dalam kasus ini, menutup kanal status mewajibkan penyelesaian perselisihan secara onchain.

### Menyelesaikan perselisihan {#settling-disputes}

Biasanya, pihak-pihak dalam sebuah kanal sepakat untuk menutup kanal sebelumnya dan ikut menandatangani transisi state terakhir, yang mereka kirimkan ke kontrak pintar. Setelah pembaruan disetujui secara onchain, eksekusi kontrak pintar offchain berakhir dan peserta keluar dari kanal dengan uang mereka.

Namun, satu pihak dapat mengirimkan permintaan onchain untuk mengakhiri eksekusi kontrak pintar dan memfinalisasi kanal—tanpa menunggu persetujuan dari pihak lawannya. Jika salah satu situasi perusak konsensus yang dijelaskan sebelumnya terjadi, salah satu pihak dapat memicu kontrak onchain untuk menutup kanal dan mendistribusikan dana. Ini memberikan **sifat tanpa kepercayaan**, memastikan bahwa pihak yang jujur dapat keluar dengan setoran mereka kapan saja, terlepas dari tindakan pihak lain.

Untuk memproses keluar dari kanal, pengguna harus mengirimkan pembaruan state valid terakhir dari aplikasi ke kontrak onchain. Jika ini terbukti benar (yaitu, memuat tanda tangan semua pihak), maka dana didistribusikan kembali untuk keuntungan mereka.

Namun, ada penundaan dalam mengeksekusi permintaan keluar pengguna tunggal. Jika permintaan untuk menyimpulkan kanal disetujui dengan suara bulat, maka transaksi keluar onchain dieksekusi dengan segera.

Penundaan mulai berlaku pada proses keluar pengguna tunggal karena adanya kemungkinan tindakan penipuan. Misalnya, peserta kanal mungkin mencoba memfinalisasi kanal di Ethereum dengan mengirimkan pembaruan state yang lebih lama secara onchain.

Sebagai tindakan pencegahan, kanal state memungkinkan pengguna yang jujur untuk menantang pembaruan state yang tidak valid dengan mengirimkan state kanal terbaru yang valid secara onchain. Kanal state dirancang sedemikian rupa sehingga pembaruan state yang lebih baru dan disepakati mengalahkan pembaruan state yang lebih lama.

Setelah peer memicu sistem penyelesaian perselisihan onchain, pihak lain diwajibkan untuk merespons dalam batas waktu (disebut jendela tantangan). Ini memungkinkan pengguna untuk menantang transaksi keluar, terutama jika pihak lain menerapkan pembaruan yang sudah usang.

Apa pun kasusnya, pengguna kanal selalu memiliki jaminan finalitas yang kuat: jika transisi state yang mereka miliki ditandatangani oleh semua anggota dan merupakan pembaruan terbaru, maka itu memiliki finalitas yang setara dengan transaksi onchain biasa. Mereka masih harus menantang pihak lain secara onchain, tetapi satu-satunya hasil yang mungkin adalah memfinalisasi state valid terakhir, yang mereka pegang.

### Bagaimana kanal state berinteraksi dengan Ethereum? {#how-do-state-channels-interact-with-ethereum}

Meskipun ada sebagai protokol offchain, kanal state memiliki komponen onchain: kontrak pintar yang disebarkan di Ethereum saat membuka kanal. Kontrak ini mengontrol aset yang disetorkan ke dalam kanal, memverifikasi pembaruan state, dan menengahi perselisihan di antara peserta.

Kanal state tidak memublikasikan data transaksi atau komitmen state ke Mainnet, tidak seperti solusi penskalaan [lapisan 2 (l2)](/layer-2/). Namun, mereka lebih terhubung ke Mainnet daripada, katakanlah, [rantai samping](/developers/docs/scaling/sidechains/), yang membuatnya sedikit lebih aman.

Kanal state mengandalkan protokol utama Ethereum untuk hal-hal berikut:

#### 1. Liveness {#liveness}

Kontrak onchain yang disebarkan saat membuka kanal bertanggung jawab atas fungsionalitas kanal. Jika kontrak berjalan di Ethereum, maka kanal selalu tersedia untuk digunakan. Sebaliknya, rantai samping selalu bisa gagal, bahkan jika Mainnet beroperasi, yang menempatkan dana pengguna dalam risiko.

#### 2. Security {#security}

Sampai batas tertentu, kanal state mengandalkan Ethereum untuk memberikan keamanan dan melindungi pengguna dari peer yang jahat. Seperti yang dibahas di bagian selanjutnya, kanal menggunakan mekanisme bukti penipuan yang memungkinkan pengguna menantang upaya untuk memfinalisasi kanal dengan pembaruan yang tidak valid atau usang.

Dalam kasus ini, pihak yang jujur memberikan state kanal valid terbaru sebagai bukti penipuan ke kontrak onchain untuk diverifikasi. Bukti penipuan memungkinkan pihak-pihak yang saling tidak percaya untuk melakukan transaksi offchain tanpa mempertaruhkan dana mereka dalam prosesnya.

#### 3. Finality {#finality}

Pembaruan state yang ditandatangani secara kolektif oleh pengguna kanal dianggap sama baiknya dengan transaksi onchain. Namun, semua aktivitas di dalam kanal hanya mencapai finalitas sejati ketika kanal ditutup di Ethereum.

Dalam kasus yang optimis, kedua belah pihak dapat bekerja sama dan menandatangani pembaruan state akhir dan mengirimkannya secara onchain untuk menutup kanal, setelah itu dana didistribusikan sesuai dengan state akhir kanal. Dalam kasus yang pesimis, di mana seseorang mencoba berbuat curang dengan memposting pembaruan state yang salah secara onchain, transaksi mereka tidak difinalisasi sampai jendela tantangan berlalu.

## Kanal state virtual {#virtual-state-channels}

Implementasi naif dari sebuah kanal status adalah menyebarkan kontrak baru ketika dua pengguna ingin mengeksekusi aplikasi secara offchain. Ini tidak hanya tidak layak, tetapi juga meniadakan efektivitas biaya dari kanal state (biaya transaksi onchain dapat dengan cepat menumpuk).

Untuk memecahkan masalah ini, "kanal virtual" diciptakan. Tidak seperti kanal biasa yang mewajibkan transaksi onchain untuk dibuka dan diakhiri, kanal virtual dapat dibuka, dieksekusi, dan difinalisasi tanpa berinteraksi dengan rantai utama. Bahkan dimungkinkan untuk menyelesaikan perselisihan secara offchain menggunakan metode ini.

Sistem ini mengandalkan keberadaan apa yang disebut "kanal buku besar", yang telah didanai secara onchain. Kanal virtual antara dua pihak dapat dibangun di atas kanal buku besar yang ada, dengan pemilik kanal buku besar berfungsi sebagai perantara.

Pengguna di setiap kanal virtual berinteraksi melalui instans kontrak baru, dengan kanal buku besar yang mampu mendukung beberapa instans kontrak. State kanal buku besar juga berisi lebih dari satu state penyimpanan kontrak, yang memungkinkan eksekusi paralel aplikasi secara offchain di antara pengguna yang berbeda.

Sama seperti kanal biasa, pengguna bertukar pembaruan state untuk memajukan mesin state. Kecuali jika timbul perselisihan, perantara hanya perlu dihubungi saat membuka atau mengakhiri kanal.

### Kanal pembayaran virtual {#virtual-payment-channels}

Kanal pembayaran virtual bekerja berdasarkan ide yang sama dengan kanal state virtual: peserta yang terhubung ke jaringan yang sama dapat meneruskan pesan tanpa perlu membuka kanal baru secara onchain. Dalam kanal pembayaran virtual, transfer nilai dirutekan melalui satu atau lebih perantara, dengan jaminan bahwa hanya penerima yang dituju yang dapat menerima dana yang ditransfer.

## Aplikasi kanal state {#applications-of-state-channels}

### Pembayaran {#payments}

Kanal rantai blok awal adalah protokol sederhana yang memungkinkan dua peserta untuk melakukan transfer cepat dengan biaya rendah secara offchain tanpa harus membayar biaya transaksi yang tinggi di Mainnet. Saat ini, kanal pembayaran masih berguna untuk aplikasi yang dirancang untuk pertukaran dan penyetoran Ether dan token.

Pembayaran berbasis kanal memiliki keuntungan sebagai berikut:

1. **Laju pemrosesan**: Jumlah transaksi offchain per kanal tidak terhubung dengan laju pemrosesan Ethereum, yang dipengaruhi oleh berbagai faktor, terutama ukuran blok dan waktu blok. Dengan mengeksekusi transaksi secara offchain, kanal rantai blok dapat mencapai laju pemrosesan yang lebih tinggi.

2. **Privasi**: Karena kanal ada secara offchain, detail interaksi antar peserta tidak dicatat di rantai blok publik Ethereum. Pengguna kanal hanya perlu berinteraksi secara onchain saat mendanai dan menutup kanal atau menyelesaikan perselisihan. Dengan demikian, kanal berguna bagi individu yang menginginkan transaksi yang lebih privat.

3. **Latensi**: Transaksi offchain yang dilakukan antar peserta kanal dapat diselesaikan secara instan, jika kedua belah pihak bekerja sama, sehingga mengurangi penundaan. Sebaliknya, mengirim transaksi di Mainnet mewajibkan Anda menunggu node untuk memproses transaksi, menghasilkan blok baru dengan transaksi tersebut, dan mencapai konsensus. Pengguna mungkin juga perlu menunggu lebih banyak konfirmasi blok sebelum menganggap transaksi telah difinalisasi.

4. **Biaya**: Kanal state sangat berguna dalam situasi di mana sekelompok peserta akan bertukar banyak pembaruan state dalam jangka waktu yang lama. Satu-satunya biaya yang timbul adalah pembukaan dan penutupan kontrak pintar kanal status; setiap perubahan state antara pembukaan dan penutupan kanal akan lebih murah daripada yang sebelumnya karena biaya penyelesaian didistribusikan sebagaimana mestinya.

Menerapkan kanal state pada solusi lapisan 2 (l2), seperti [rollup](/developers/docs/scaling/#rollups), dapat membuatnya lebih menarik untuk pembayaran. Meskipun kanal menawarkan pembayaran yang murah, biaya penyiapan kontrak onchain di Mainnet selama fase pembukaan bisa menjadi mahal—terutama ketika biaya gas melonjak. Rollup berbasis Ethereum menawarkan [biaya transaksi yang lebih rendah](https://l2fees.info/) dan dapat mengurangi biaya tambahan bagi peserta kanal dengan menurunkan biaya penyiapan.

### Pembayaran mikro {#microtransactions}

Pembayaran mikro adalah pembayaran bernilai rendah (misalnya, lebih rendah dari sebagian kecil dolar) yang tidak dapat diproses oleh bisnis tanpa mengalami kerugian. Entitas ini harus membayar penyedia layanan pembayaran, yang tidak dapat mereka lakukan jika margin pada pembayaran pelanggan terlalu rendah untuk menghasilkan keuntungan.

Kanal pembayaran memecahkan masalah ini dengan mengurangi biaya tambahan yang terkait dengan pembayaran mikro. Misalnya, Penyedia Layanan Internet (ISP) dapat membuka kanal pembayaran dengan pelanggan, yang memungkinkan mereka untuk mengalirkan pembayaran kecil setiap kali mereka menggunakan layanan tersebut.

Di luar biaya pembukaan dan penutupan kanal, peserta tidak dikenakan biaya lebih lanjut pada pembayaran mikro (tidak ada biaya gas). Ini adalah situasi yang saling menguntungkan karena pelanggan memiliki lebih banyak fleksibilitas dalam berapa banyak mereka membayar untuk layanan dan bisnis tidak kehilangan pembayaran mikro yang menguntungkan.

### Aplikasi terdesentralisasi (dapp) {#decentralized-applications}

Seperti kanal pembayaran, kanal state dapat melakukan pembayaran bersyarat sesuai dengan state akhir mesin state. Kanal state juga dapat mendukung logika transisi state arbitrer, yang membuatnya berguna untuk mengeksekusi aplikasi generik secara offchain.

Kanal state sering kali terbatas pada aplikasi berbasis giliran yang sederhana, karena ini membuatnya lebih mudah untuk mengelola dana yang dikunci ke kontrak onchain. Selain itu, dengan jumlah pihak yang terbatas yang memperbarui state aplikasi offchain secara berkala, menghukum perilaku tidak jujur relatif mudah.

Efisiensi aplikasi kanal status juga bergantung pada desainnya. Misalnya, pengembang mungkin menyebarkan kontrak kanal aplikasi secara onchain satu kali dan mengizinkan pemain lain untuk menggunakan kembali aplikasi tersebut tanpa harus pergi ke onchain. Dalam kasus ini, kanal aplikasi awal berfungsi sebagai kanal buku besar yang mendukung beberapa kanal virtual, yang masing-masing menjalankan instans baru dari kontrak pintar aplikasi secara offchain.

Kasus penggunaan potensial untuk aplikasi kanal status adalah permainan dua pemain sederhana, di mana dana didistribusikan berdasarkan hasil permainan. Manfaatnya di sini adalah pemain tidak perlu saling percaya (sifat tanpa kepercayaan) dan kontrak onchain, bukan pemain, yang mengontrol alokasi dana dan penyelesaian perselisihan (desentralisasi).

Kasus penggunaan lain yang mungkin untuk aplikasi kanal status mencakup kepemilikan nama ENS, buku besar NFT, dan banyak lagi.

### Transfer atomik {#atomic-transfers}

Kanal pembayaran awal dibatasi pada transfer antara dua pihak, yang membatasi kegunaannya. Namun, pengenalan kanal virtual memungkinkan individu untuk merutekan transfer melalui perantara (yaitu, beberapa kanal p2p) tanpa harus membuka kanal baru secara onchain.

Umumnya digambarkan sebagai "transfer multi-hop", pembayaran yang dirutekan bersifat atomik (yaitu, semua bagian transaksi berhasil atau gagal sama sekali). Transfer atomik menggunakan [Hashed Timelock Contracts (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) untuk memastikan pembayaran dilepaskan hanya jika kondisi tertentu terpenuhi, sehingga mengurangi risiko pihak lawan.

## Kelemahan menggunakan kanal state {#drawbacks-of-state-channels}

### Asumsi liveness {#liveness-assumptions}

Untuk memastikan efisiensi, kanal state menempatkan batas waktu pada kemampuan peserta kanal untuk merespons perselisihan. Aturan ini mengasumsikan bahwa peer akan selalu online untuk memantau aktivitas kanal dan melawan tantangan bila diperlukan.

Pada kenyataannya, pengguna dapat menjadi offline karena alasan di luar kendali mereka (misalnya, koneksi internet yang buruk, kegagalan mekanis, dll.). Jika pengguna yang jujur menjadi offline, peer yang jahat dapat mengeksploitasi situasi tersebut dengan menyajikan state perantara lama ke kontrak penengah dan mencuri dana yang dikunci.

Beberapa kanal menggunakan "menara pengawas" (watchtowers)—entitas yang bertanggung jawab untuk mengawasi peristiwa perselisihan onchain atas nama orang lain dan mengambil tindakan yang diperlukan, seperti memperingatkan pihak-pihak yang berkepentingan. Namun, ini dapat menambah biaya penggunaan kanal status.

### Ketidaktersediaan data {#data-unavailability}

Seperti yang dijelaskan sebelumnya, menantang perselisihan yang tidak valid mewajibkan penyajian state terbaru yang valid dari kanal status. Ini adalah aturan lain yang didasarkan pada asumsi—bahwa pengguna memiliki akses ke state terbaru kanal.

Meskipun mengharapkan pengguna kanal untuk menyimpan salinan state aplikasi offchain adalah hal yang masuk akal, data ini mungkin hilang karena kesalahan atau kegagalan mekanis. Jika pengguna tidak memiliki cadangan data, mereka hanya dapat berharap bahwa pihak lain tidak memfinalisasi permintaan keluar yang tidak valid menggunakan transisi state lama yang mereka miliki.

Pengguna Ethereum tidak perlu berurusan dengan masalah ini karena jaringan menegakkan aturan tentang ketersediaan data. Data transaksi disimpan dan disebarkan oleh semua node dan tersedia untuk diunduh pengguna jika dan ketika diperlukan.

### Masalah Likuiditas {#liquidity-issues}

Untuk membuat kanal rantai blok, peserta perlu mengunci dana dalam kontrak pintar onchain selama siklus hidup kanal. Ini mengurangi Likuiditas pengguna kanal dan juga membatasi kanal hanya bagi mereka yang mampu menjaga dana tetap terkunci di Mainnet.

Namun, kanal buku besar—yang dioperasikan oleh penyedia layanan offchain (OSP)—dapat mengurangi masalah Likuiditas bagi pengguna. Dua peer yang terhubung ke kanal buku besar dapat membuat kanal virtual, yang dapat mereka buka dan finalisasi sepenuhnya secara offchain, kapan pun mereka mau.

Penyedia layanan offchain juga dapat membuka kanal dengan beberapa peer, yang membuatnya berguna untuk merutekan pembayaran. Tentu saja, pengguna harus membayar biaya kepada OSP untuk layanan mereka, yang mungkin tidak diinginkan oleh sebagian orang.

### Serangan griefing {#griefing-attacks}

Serangan griefing adalah fitur umum dari sistem berbasis bukti penipuan. Serangan griefing tidak secara langsung menguntungkan penyerang tetapi menyebabkan kesedihan (yaitu, kerugian) bagi korban, oleh karena itu dinamakan demikian.

Pembuktian penipuan rentan terhadap serangan griefing karena pihak yang jujur harus merespons setiap perselisihan, bahkan yang tidak valid sekalipun, atau berisiko kehilangan dana mereka. Peserta yang jahat dapat memutuskan untuk berulang kali memposting transisi state yang usang secara onchain, memaksa pihak yang jujur untuk merespons dengan state yang valid. Biaya transaksi onchain tersebut dapat dengan cepat menumpuk, menyebabkan pihak yang jujur merugi dalam prosesnya.

### Kumpulan peserta yang telah ditentukan {#predefined-participant-sets}

Berdasarkan desain, jumlah peserta yang membentuk kanal status tetap tidak berubah sepanjang masa pakainya. Ini karena memperbarui kumpulan peserta akan memperumit operasi kanal, terutama saat mendanai kanal, atau menyelesaikan perselisihan. Menambah atau menghapus peserta juga akan mewajibkan aktivitas onchain tambahan, yang meningkatkan biaya tambahan bagi pengguna.

Meskipun ini membuat kanal state lebih mudah dipahami, hal ini membatasi kegunaan desain kanal bagi pengembang aplikasi. Ini sebagian menjelaskan mengapa kanal state telah ditinggalkan demi solusi penskalaan lainnya, seperti rollup.

### Pemrosesan transaksi paralel {#parallel-transaction-processing}

Peserta dalam kanal status mengirimkan pembaruan state secara bergiliran, itulah sebabnya mereka bekerja paling baik untuk "aplikasi berbasis giliran" (misalnya, permainan catur dua pemain). Ini menghilangkan kebutuhan untuk menangani pembaruan state secara bersamaan dan mengurangi pekerjaan yang harus dilakukan kontrak onchain untuk menghukum pemosting pembaruan yang usang. Namun, efek samping dari desain ini adalah bahwa transaksi saling bergantung satu sama lain, meningkatkan latensi dan mengurangi pengalaman pengguna secara keseluruhan.

Beberapa kanal state memecahkan masalah ini dengan menggunakan desain "full-duplex" yang memisahkan state offchain menjadi dua state "simpleks" searah, yang memungkinkan pembaruan state secara bersamaan. Desain semacam itu meningkatkan laju pemrosesan offchain dan mengurangi penundaan transaksi.

## Gunakan kanal state {#use-state-channels}

Beberapa proyek menyediakan implementasi kanal state yang dapat Anda integrasikan ke dalam aplikasi terdesentralisasi (dapp) Anda:

- [Connext](https://connext.network/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Bacaan lebih lanjut {#further-reading}

**Kanal state**

- [Memahami Solusi Penskalaan Lapisan 2 (l2) Ethereum: Kanal State, Plasma, dan Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 Feb 2018_
- [Kanal State - sebuah penjelasan](https://www.jeffcoleman.ca/state-channels/) _6 Nov 2015 - Jeff Coleman_
- [Dasar-dasar Kanal State](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Kanal State Rantai Blok: Sebuah Kecanggihan Teknologi](https://ieeexplore.ieee.org/document/9627997)

_Tahu sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_