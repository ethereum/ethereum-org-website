---
title: Glamsterdam
description: Pelajari tentang peningkatan protokol Glamsterdam
lang: id
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam adalah peningkatan Ethereum mendatang yang direncanakan untuk paruh kedua tahun 2026
</AlertTitle>
<AlertDescription>
Peningkatan Glamsterdam hanyalah satu langkah dalam tujuan pengembangan jangka panjang Ethereum. Pelajari lebih lanjut tentang [peta jalan protokol](/roadmap/) dan [peningkatan sebelumnya](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

Peningkatan Glamsterdam [Ethereum](/) yang akan datang dirancang untuk membuka jalan bagi generasi penskalaan berikutnya. Glamsterdam dinamai dari kombinasi "Amsterdam" (peningkatan lapisan eksekusi, dinamai dari lokasi Devconnect sebelumnya) dan "Gloas" (peningkatan lapisan konsensus, dinamai dari sebuah bintang).

Mengikuti kemajuan yang dicapai dalam peningkatan [Fusaka](/roadmap/fusaka/), Glamsterdam berfokus pada penskalaan lapisan 1 (l1) dengan mengatur ulang cara jaringan memproses transaksi dan mengelola basis datanya yang terus berkembang, yang secara fundamental memperbarui cara Ethereum membuat dan memverifikasi blok.

Sementara Fusaka berfokus pada penyempurnaan mendasar, Glamsterdam memajukan tujuan "Skalakan L1" dan "Skalakan Blob" dengan mengabadikan pemisahan tugas di antara berbagai peserta jaringan, dan memperkenalkan cara yang lebih efisien untuk menangani data guna mempersiapkan [state](/glossary/#state) untuk paralelisasi laju pemrosesan tinggi.

Peningkatan ini memastikan Ethereum tetap cepat, terjangkau, dan terdesentralisasi saat menangani lebih banyak aktivitas, sambil menjaga persyaratan perangkat keras tetap dapat dikelola oleh orang-orang yang menjalankan [node](/glossary/#node) di rumah.

<VideoWatch slug="ethereum-evolution-glamsterdam" />

## Peningkatan yang dipertimbangkan untuk Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Catatan: Artikel ini saat ini menyoroti pilihan EIP yang sedang dipertimbangkan untuk disertakan dalam Glamsterdam. Proposal tambahan yang secara aktif diuji di devnet meliputi EIP-7778, EIP-7843, EIP-7976, EIP-7981, dan EIP-8024. Untuk pembaruan status terbaru, lihat [peningkatan Glamsterdam di Forkcast](https://forkcast.org/upgrade/glamsterdam).

Jika Anda ingin menambahkan EIP yang sedang dipertimbangkan untuk Glamsterdam, tetapi belum ditambahkan ke halaman ini, [pelajari cara berkontribusi ke ethereum.org di sini](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Peningkatan Glamsterdam berpusat pada tiga tujuan utama:

- Mempercepat pemrosesan (paralelisasi): Mengatur ulang cara jaringan mencatat dependensi data, sehingga dapat memproses banyak transaksi secara bersamaan dengan aman alih-alih dalam urutan satu per satu yang lambat.
- Memperluas kapasitas: Membagi tugas berat dalam membuat dan memverifikasi blok, memberi jaringan lebih banyak waktu untuk menyebarkan jumlah data yang lebih besar tanpa melambat.
- Mencegah pembengkakan basis data (keberlanjutan): Menyesuaikan biaya jaringan untuk secara akurat mencerminkan biaya perangkat keras jangka panjang dari penyimpanan data baru, membuka blokir peningkatan batas gas di masa mendatang sambil mencegah penurunan kinerja perangkat keras.

Singkatnya, Glamsterdam akan memperkenalkan perubahan struktural untuk memastikan bahwa seiring dengan peningkatan kapasitas jaringan, jaringan tersebut tetap berkelanjutan dan kinerjanya tetap tinggi.

## Skalakan lapisan 1 (l1) & pemrosesan paralel {#scale-l1}

Penskalaan lapisan 1 (l1) yang bermakna memerlukan peralihan dari asumsi kepercayaan di luar protokol dan kendala eksekusi serial. Glamsterdam mengatasi hal ini dengan mengabadikan pemisahan tugas pembuatan blok tertentu dan memperkenalkan struktur data baru yang memungkinkan jaringan bersiap untuk pemrosesan paralel.

### Proposal utama: Pemisahan Pengusul-Pembangun yang Diabadikan (ePBS) {#epbs}

- Menghapus asumsi kepercayaan di luar protokol dan ketergantungan pada relai pihak ketiga
- Mendukung penskalaan lapisan 1 (l1) dengan memungkinkan muatan yang jauh lebih besar melalui jendela penyebaran yang diperpanjang
- Memperkenalkan pembayaran pembangun tanpa kepercayaan langsung ke dalam protokol 
- Mewajibkan pembaruan arsitektur untuk pool staking guna memungkinkan pemantauan tanpa kepercayaan, meskipun pengalaman pengguna staking secara keseluruhan ditingkatkan oleh proses pemilihan pembangun yang disempurnakan

Saat ini, proses pengusulan dan pembuatan blok mencakup serah terima antara pengusul blok dan pembangun blok. Hubungan antara pengusul dan pembangun bukanlah bagian dari protokol inti Ethereum, sehingga bergantung pada middleware pihak ketiga tepercaya, perangkat lunak (relai), dan kepercayaan di luar protokol antar entitas.

Hubungan di luar protokol antara pengusul dan pembangun juga menciptakan "jalur panas" selama validasi blok yang memaksa [validator](/glossary/#validator) untuk bergegas melalui penyiaran dan eksekusi transaksi dalam jendela 2 detik yang ketat, membatasi seberapa banyak data yang dapat ditangani jaringan.

**Pemisahan Pengusul-Pembangun yang Diabadikan (ePBS, atau EIP-7732)** secara formal memisahkan pekerjaan pengusul (yang memilih blok konsensus) dari pembangun (yang merakit muatan eksekusi), mengabadikan serah terima ini langsung ke dalam protokol. 

Membangun pertukaran muatan blok tanpa kepercayaan untuk pembayaran langsung ke dalam protokol menghilangkan kebutuhan akan middleware pihak ketiga (seperti MEV-Boost). Namun, pembangun dan pengusul mungkin masih memilih untuk menggunakan relai atau middleware di luar protokol untuk fitur kompleks yang belum menjadi bagian dari protokol inti. 

Untuk mengatasi hambatan "jalur panas", ePBS juga memperkenalkan Komite Ketepatan Waktu Muatan (PTC) dan logika tenggat waktu ganda, yang memungkinkan validator untuk membuktikan blok konsensus dan ketepatan waktu muatan eksekusi secara terpisah untuk memaksimalkan laju pemrosesan.

<VideoWatch slug="proposer-builder-separation" />

Memisahkan peran pengusul dan pembangun di tingkat protokol memperluas jendela penyebaran (atau waktu yang tersedia untuk menyebarkan data ke seluruh jaringan) dari 2 detik menjadi sekitar 9 detik.

Dengan mengganti middleware dan relai di luar protokol dengan mekanika di dalam protokol, ePBS mengurangi ketergantungan kepercayaan dan memungkinkan Ethereum memproses jumlah data yang jauh lebih besar dengan aman (seperti lebih banyak blob untuk [lapisan 2 (l2)](/glossary/#layer-2)) tanpa membebani jaringan.

**Sumber daya**: [Spesifikasi teknis EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Proposal utama: Daftar Akses Tingkat Blok (BAL) {#bals}

- Menghilangkan hambatan pemrosesan berurutan dengan menyediakan peta awal dari semua dependensi transaksi, menyiapkan panggung bagi validator untuk memproses banyak transaksi secara paralel alih-alih satu per satu
- Memungkinkan node untuk memperbarui catatan mereka dengan membaca hasil akhir tanpa perlu memutar ulang setiap transaksi (sinkronisasi tanpa eksekusi), membuatnya jauh lebih cepat untuk melakukan sinkronisasi node ke jaringan
- Menghilangkan tebakan, memungkinkan validator untuk memuat semua data yang diperlukan sekaligus alih-alih menemukannya selangkah demi selangkah, yang membuat validasi jauh lebih cepat

Ethereum saat ini seperti jalan satu jalur; karena jaringan tidak tahu data apa yang akan dibutuhkan atau diubah oleh transaksi (seperti akun mana yang akan disentuh transaksi) sampai transaksi dijalankan, validator harus memproses transaksi satu per satu dalam garis berurutan yang ketat. Jika mereka mencoba memproses transaksi sekaligus, tanpa mengetahui dependensi ini, dua transaksi mungkin secara tidak sengaja mencoba mengubah data yang sama persis pada saat yang sama, menyebabkan kesalahan.

**Daftar Akses Tingkat Blok (BAL, atau EIP-7928)** berfungsi seperti peta untuk jaringan, merinci bagian basis data mana yang akan diakses sebelum pekerjaan dimulai. Lapisan eksekusi menyimpan Daftar Akses Blok lengkap, termasuk setiap perubahan akun yang akan disentuh transaksi, bersama dengan hasil akhir dari perubahan tersebut (semua akses state dan nilai pasca-eksekusi). Untuk menjaga blok tetap ringan, header blok berisi bidang baru dengan sidik jari digital unik (catatan hash) dari daftar ini.

Karena memberikan visibilitas instan ke transaksi mana yang tidak tumpang tindih, BAL memungkinkan node untuk melakukan pembacaan disk paralel, mengambil informasi untuk banyak transaksi secara bersamaan. Jaringan dapat dengan aman mengelompokkan transaksi yang tidak terkait dan memprosesnya secara paralel.

Karena BAL menyertakan hasil akhir transaksi (nilai pasca-eksekusi), ketika node jaringan perlu melakukan sinkronisasi ke state jaringan saat ini, mereka dapat menyalin hasil akhir tersebut untuk memperbarui catatan mereka. Validator tidak perlu lagi memutar ulang semua transaksi rumit dari awal untuk mengetahui apa yang terjadi, sehingga lebih cepat dan lebih mudah bagi node baru untuk bergabung dengan jaringan.

Pembacaan disk paralel yang diaktifkan oleh BAL akan menjadi langkah signifikan menuju masa depan di mana Ethereum dapat memproses banyak transaksi sekaligus, yang secara signifikan meningkatkan kecepatan jaringan.

#### Pertukaran Daftar Akses Blok eth/71 {#bale}

Pertukaran Daftar Akses Blok (eth/71 atau EIP-8159) adalah pendamping jaringan langsung untuk daftar akses tingkat blok. Sementara BAL membuka kunci eksekusi paralel, eth/71 meningkatkan protokol peer-to-peer untuk memungkinkan node benar-benar membagikan daftar ini melalui jaringan. Sekarang diwajibkan untuk semua klien lapisan eksekusi, pertukaran daftar akses blok akan memungkinkan sinkronisasi yang lebih cepat dan memungkinkan node untuk melakukan pembaruan state tanpa eksekusi.

**Sumber daya**:

- [Spesifikasi teknis EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Spesifikasi teknis EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Keberlanjutan jaringan {#network-sustainability}

Seiring dengan pertumbuhan jaringan Ethereum yang lebih cepat, penting untuk memastikan bahwa biaya penggunaannya sesuai dengan keausan pada perangkat keras yang menjalankan Ethereum. Jaringan perlu meningkatkan batas kapasitas keseluruhannya agar dapat menskalakan dan memproses lebih banyak transaksi dengan aman.

### Peningkatan biaya gas pembuatan state {#state-creation-gas-cost-increase}

- Memastikan bahwa biaya untuk membuat akun baru atau kontrak pintar secara akurat mencerminkan beban jangka panjang yang mereka tempatkan pada basis data Ethereum
- Menetapkan **biaya per bita state (CPSB)** tetap yang menargetkan tingkat pertumbuhan yang aman dan dapat diprediksi sebesar 120 GiB/tahun, memastikan perangkat keras fisik standar dapat terus menjalankan jaringan
- Memisahkan akuntansi untuk biaya spesifik ini ke reservoir baru, menghapus batas transaksi lama dan memungkinkan pengembang untuk menyebarkan aplikasi yang lebih besar dan lebih kompleks

Menambahkan akun, token, dan [kontrak pintar](/glossary/#smart-contract) baru menciptakan data permanen (dikenal sebagai "state") yang harus disimpan tanpa batas waktu oleh setiap komputer yang menjalankan jaringan. Biaya saat ini untuk menambah atau membaca data ini tidak konsisten dan belum tentu mencerminkan beban penyimpanan jangka panjang yang sebenarnya pada perangkat keras jaringan.

Beberapa tindakan yang membuat state di Ethereum, seperti membuat akun baru atau menyebarkan kontrak pintar besar, relatif berbiaya rendah dibandingkan dengan ruang penyimpanan permanen yang mereka gunakan di node jaringan, misalnya, penyebaran kontrak secara signifikan lebih murah per bita daripada membuat slot penyimpanan.

Tanpa penyesuaian, pertumbuhan state Ethereum akan menjadi tidak berkelanjutan saat jaringan menskalakan menuju batas dasar batas gas 200 juta yang diaktifkan oleh Glamsterdam (dengan pengembang saat ini menguji pada batas gas blok referensi 150 juta untuk memperoleh penetapan harga state yang akurat).

**Peningkatan biaya gas pembuatan state (atau EIP-8037)** menyelaraskan biaya dengan mengaitkannya pada ukuran sebenarnya dari data yang dibuat, memperbarui biaya sehingga proporsional dengan jumlah data permanen yang dibuat atau diakses oleh suatu operasi.

EIP-8037 juga memperkenalkan model reservoir untuk mengelola biaya ini dengan lebih dapat diprediksi; biaya gas state ditarik dari `state_gas_reservoir` terlebih dahulu, dan opcode `GAS` hanya mengembalikan `gas_left`, mencegah bingkai eksekusi salah menghitung gas yang tersedia. Untuk mendukung hal ini, tugas latar belakang penting diberikan jatah bahan bakar ekstra yang langsung masuk ke cadangan khusus ini, memastikan operasi jaringan kritis tidak akan gagal hanya karena menyimpan data permanen membutuhkan lebih banyak sumber daya.

Sebelum EIP-8037, baik pekerjaan komputasi (pemrosesan aktif) maupun penyimpanan data permanen (menyimpan kontrak pintar ke basis data jaringan) berbagi batas gas yang sama. Model reservoir membagi akuntansi: batas gas untuk pekerjaan komputasi aktual dari transaksi (pemrosesan) dan untuk penyimpanan data jangka panjang (gas state). Memisahkan keduanya membantu mencegah ukuran data aplikasi yang sangat besar membatasi batas gas; selama pengembang menyediakan dana yang cukup untuk mengisi reservoir untuk penyimpanan data, mereka dapat menyebarkan kontrak pintar yang jauh lebih besar dan lebih kompleks.

Menetapkan harga penyimpanan data dengan lebih akurat dan dapat diprediksi akan membantu Ethereum meningkatkan kecepatan dan kapasitasnya dengan aman tanpa membengkakkan basis data. Keberlanjutan ini akan memungkinkan operator node untuk terus menggunakan perangkat keras yang (relatif) terjangkau selama bertahun-tahun yang akan datang, menjaga staking di rumah tetap dapat diakses untuk mempertahankan desentralisasi jaringan.

**Sumber daya**: [Spesifikasi teknis EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Pembaruan biaya gas akses state {#state-access-gas-cost-update}

- Meningkatkan biaya gas ketika aplikasi membaca atau memperbarui informasi yang disimpan secara permanen di Ethereum (opcode akses state) agar secara akurat sesuai dengan pekerjaan komputasi yang diwajibkan oleh perintah ini
- Memperkuat ketahanan jaringan dengan mencegah serangan penolakan layanan (denial-of-service) yang mengeksploitasi operasi pembacaan data yang secara artifisial murah

Seiring dengan pertumbuhan state Ethereum, tindakan mencari dan membaca data lama ("akses state") menjadi lebih berat dan lebih lambat untuk diproses oleh node. Biaya untuk tindakan ini tetap sama meskipun sekarang sedikit lebih mahal untuk mencari informasi (dalam hal daya komputasi).

Akibatnya, beberapa perintah spesifik saat ini dihargai terlalu rendah relatif terhadap pekerjaan yang mereka paksakan untuk dilakukan oleh node. `EXTCODESIZE` dan `EXTCODECOPY` dihargai terlalu rendah, misalnya, karena mereka memerlukan dua pembacaan basis data terpisah—satu untuk objek akun, dan yang kedua untuk ukuran kode aktual atau kode bita.

**Pembaruan biaya gas akses state (atau EIP-8038)** meningkatkan konstanta gas untuk opcode akses state, seperti mencari data akun dan kontrak, agar selaras dengan kinerja perangkat keras modern dan ukuran state.

Menyelaraskan biaya akses state juga membantu membuat Ethereum lebih tangguh. Karena tindakan pembacaan data yang berat ini secara artifisial murah, penyerang jahat dapat mengirim spam ke jaringan dengan ribuan permintaan data kompleks dalam satu blok sebelum mencapai batas biaya jaringan, yang berpotensi menyebabkan jaringan terhenti atau macet (serangan penolakan layanan). Bahkan tanpa niat jahat, pengembang tidak didorong secara ekonomi untuk membangun aplikasi yang efisien jika membaca data jaringan terlalu murah.

Dengan menetapkan harga tindakan akses state secara lebih akurat, Ethereum dapat menjadi lebih tangguh terhadap perlambatan yang tidak disengaja atau disengaja, sementara menyelaraskan biaya jaringan dengan beban perangkat keras membuktikan fondasi yang lebih berkelanjutan untuk peningkatan batas gas di masa mendatang.

**Sumber daya**: [Spesifikasi teknis EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Ketahanan jaringan {#network-resilience}

Penyempurnaan tugas validator dan proses keluar memastikan stabilitas jaringan selama peristiwa pemotongan massal dan mendemokratisasi likuiditas. Peningkatan ini membuat jaringan lebih stabil dan memastikan bahwa semua peserta, besar dan kecil, diperlakukan secara adil.

### Mengecualikan validator yang dipotong dari pengusulan {#exclude-slashed-validators}

- Menghentikan validator yang dihukum (dipotong) agar tidak dipilih untuk mengusulkan blok di masa mendatang, menghilangkan jaminan slot yang terlewat
- Menjaga Ethereum berjalan lancar dan dapat diandalkan, mencegah kemacetan parah jika terjadi peristiwa pemotongan massal

Saat ini, bahkan jika validator dipotong (dihukum karena melanggar aturan atau tidak beroperasi seperti yang diharapkan), sistem mungkin masih memilih mereka untuk memimpin blok dalam waktu dekat ketika menghasilkan pandangan ke depan pengusul di masa mendatang.

Karena blok dari pengusul yang dipotong secara otomatis ditolak sebagai tidak valid, hal ini menyebabkan jaringan melewatkan slot dan menunda pemulihan jaringan selama peristiwa pemotongan massal.

**Mengecualikan validator yang dipotong dari pengusulan (atau EIP-8045)** hanya menyaring validator yang dipotong agar tidak dipilih untuk tugas di masa mendatang. Hal ini meningkatkan ketahanan rantai dengan memastikan hanya validator yang sehat yang dipilih untuk mengusulkan blok, mempertahankan kualitas layanan selama gangguan jaringan.

**Sumber daya**: [Spesifikasi teknis EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Biarkan proses keluar menggunakan antrean konsolidasi {#let-exits-use-the-consolidation-queue}

- Menutup celah yang memungkinkan validator bersaldo tinggi untuk keluar dari jaringan lebih cepat daripada validator yang lebih kecil melalui antrean konsolidasi
- Memungkinkan proses keluar reguler melimpah ke antrean kedua ini ketika memiliki kapasitas luang, mengurangi waktu penarikan staking selama periode volume tinggi
- Mempertahankan keamanan yang ketat untuk menghindari pengubahan batas keamanan inti Ethereum atau melemahkan jaringan

Sejak [peningkatan Pectra](/roadmap/pectra) meningkatkan saldo efektif maksimum untuk validator Ethereum dari 32 ETH menjadi 2.048 ETH, celah teknis memungkinkan validator bersaldo tinggi untuk keluar dari jaringan lebih cepat daripada validator yang lebih kecil melalui antrean konsolidasi.

**Biarkan proses keluar menggunakan antrean konsolidasi (atau EIP-8080)** mendemokratisasi antrean konsolidasi untuk semua proses keluar staking, menciptakan satu antrean yang adil untuk semua orang.

Untuk merinci cara kerjanya saat ini:

- Batas churn Ethereum adalah batas keamanan pada tingkat di mana validator dapat masuk, keluar, atau menggabungkan (mengkonsolidasikan) ETH yang di-stake mereka, untuk memastikan keamanan jaringan tidak pernah tidak stabil
- Karena konsolidasi validator adalah tindakan yang lebih berat dengan lebih banyak bagian yang bergerak daripada proses keluar validator standar, hal ini memakan porsi yang lebih besar dari anggaran keamanan ini (batas churn)
- Secara khusus, protokol mendikte bahwa biaya keamanan yang tepat dari satu proses keluar standar adalah dua pertiga (2/3) dari biaya satu konsolidasi

Antrean keluar yang lebih adil akan memungkinkan proses keluar standar untuk meminjam ruang yang tidak terpakai dari antrean konsolidasi selama periode permintaan keluar yang tinggi, menerapkan nilai tukar "3 untuk 2" (untuk setiap 2 tempat konsolidasi yang tidak terpakai, jaringan dapat dengan aman memproses 3 proses keluar standar). Faktor churn 3/2 ini menyeimbangkan permintaan di seluruh antrean konsolidasi dan keluar.

Mendemokratisasi akses ke antrean konsolidasi akan meningkatkan kecepatan pengguna untuk keluar dari stake mereka selama periode permintaan tinggi hingga 2,5x, tanpa mengorbankan keamanan jaringan.

**Sumber daya**: [Spesifikasi teknis EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Meningkatkan pengalaman pengguna & pengembang {#improve-user-developer-experience}

Peningkatan Glamsterdam Ethereum bertujuan untuk meningkatkan pengalaman pengguna, meningkatkan kemampuan penemuan data, dan menangani ukuran pesan yang meningkat untuk mencegah kegagalan sinkronisasi. Hal ini memudahkan untuk melacak apa yang terjadi onchain sambil mencegah gangguan teknis saat jaringan berskala.

### Mengurangi biaya gas transaksi intrinsik {#reduce-intrinsic-transaction-gas-costs}

- Menurunkan biaya dasar untuk transaksi, mengurangi biaya keseluruhan dari pembayaran ETH asli yang sederhana
- Membuat transfer yang lebih kecil menjadi lebih terjangkau, meningkatkan kelayakan Ethereum sebagai alat tukar rutin

Semua transaksi Ethereum memiliki biaya gas dasar tetap saat ini, terlepas dari seberapa sederhana atau kompleksnya untuk diproses. **Mengurangi gas transaksi intrinsik (atau EIP-2780)** mengusulkan pengurangan biaya dasar tersebut untuk membuat transfer ETH standar antara akun yang ada hingga **71% lebih murah**.

Mengurangi gas transaksi intrinsik bekerja dengan merinci biaya transaksi untuk hanya mencerminkan pekerjaan dasar dan esensial yang sebenarnya dilakukan oleh komputer yang menjalankan jaringan, seperti memverifikasi tanda tangan digital dan memperbarui saldo. Karena pembayaran ETH dasar tidak mengeksekusi kode kompleks atau membawa data ekstra, proposal ini akan mengurangi biayanya agar sesuai dengan jejaknya yang ringan.

Proposal ini memperkenalkan pengecualian untuk membuat akun baru guna menjaga agar biaya yang lebih rendah tidak membebani state jaringan. Jika transfer mengirimkan ETH ke alamat kosong yang tidak ada, jaringan harus membuat catatan baru permanen untuknya. Biaya tambahan gas ditambahkan untuk pembuatan akun tersebut guna membantu menutupi beban penyimpanan jangka panjangnya.

Bersama-sama, EIP-2780 bertujuan untuk membuat transfer sehari-hari antara akun yang ada menjadi lebih terjangkau sambil memastikan jaringan tetap terlindungi dari pembengkakan basis data dengan menetapkan harga pertumbuhan state yang sebenarnya secara akurat.

**Sumber daya**: [Spesifikasi teknis EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Penyebaran Awal Pabrik Deterministik {#deterministic-factory-predeploy}

- Memberi pengembang cara asli untuk menyebarkan aplikasi dan dompet kontrak pintar ke alamat yang sama persis di berbagai rantai
- Memungkinkan pengguna untuk memiliki alamat dompet pintar yang sama di beberapa jaringan lapisan 2 (l2), mengurangi beban kognitif, mengurangi kebingungan, dan mengurangi risiko kehilangan dana yang tidak disengaja
- Menggantikan solusi sementara yang saat ini digunakan pengembang untuk mencapai paritas ini, membuatnya lebih mudah dan lebih aman untuk membangun dompet dan aplikasi multi-rantai

Jika pengguna memiliki dompet kontrak pintar saat ini dengan akun di beberapa rantai yang kompatibel dengan Mesin Virtual Ethereum (EVM), mereka sering kali berakhir dengan alamat yang sama sekali berbeda di jaringan yang berbeda. Hal ini tidak hanya membingungkan, tetapi dapat menyebabkan hilangnya dana secara tidak sengaja.

**Penyebaran Awal Pabrik Deterministik (atau EIP-7997)** memberi pengembang cara bawaan asli untuk menyebarkan aplikasi terdesentralisasi dan dompet kontrak pintar mereka ke alamat yang sama persis di beberapa rantai EVM, termasuk Mainnet Ethereum, jaringan lapisan 2 (l2), dan banyak lagi. Jika diadopsi, ini akan memungkinkan pengguna untuk memiliki alamat yang sama persis di setiap rantai yang berpartisipasi, secara signifikan mengurangi beban kognitif dan potensi kesalahan pengguna.

Penyebaran Awal Pabrik Deterministik bekerja dengan menempatkan program pabrik khusus yang minimal secara permanen di lokasi yang identik (khususnya, alamat 0x12) di setiap rantai kompatibel EVM yang berpartisipasi. Tujuannya adalah untuk menyediakan kontrak pabrik standar universal yang dapat diadopsi oleh jaringan apa pun yang kompatibel dengan EVM; selama rantai EVM berpartisipasi dan mengadopsi standar ini, pengembang akan dapat menggunakannya untuk menyebarkan kontrak pintar mereka ke alamat yang sama persis di jaringan tersebut.

Standarisasi ini menyederhanakan pembuatan dan pengelolaan aplikasi lintas rantai untuk pengembang dan ekosistem yang lebih luas. Pengembang tidak perlu lagi membuat kode khusus rantai untuk menautkan perangkat lunak mereka bersama-sama di berbagai jaringan, melainkan menggunakan pabrik universal ini untuk menghasilkan alamat yang sama persis untuk aplikasi mereka di mana saja. Selain itu, penjelajah blok, layanan pelacakan, dan dompet dapat dengan lebih mudah mengidentifikasi dan menautkan aplikasi dan akun ini di berbagai rantai, menciptakan lingkungan multi-rantai yang lebih terpadu dan mulus untuk semua peserta berbasis Ethereum.

**Sumber daya**: [Spesifikasi teknis EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Transfer dan pembakaran ETH memancarkan Log {#eth-transfers-and-burns-emit-a-log}

- Secara otomatis menghasilkan catatan permanen (Log) setiap kali ETH ditransfer atau dibakar
- Memperbaiki titik buta historis yang memungkinkan aplikasi, bursa, dan jembatan untuk mendeteksi setoran pengguna secara andal tanpa alat pelacakan ad-hoc

Tidak seperti token (ERC-20), transfer ETH reguler antara kontrak pintar tidak memancarkan tanda terima yang jelas (Log standar), membuatnya sulit dilacak oleh bursa dan aplikasi.

Transfer dan pembakaran ETH memancarkan Log (atau EIP-7708) mewajibkan jaringan untuk memancarkan peristiwa Log standar setiap kali jumlah ETH yang bukan nol dipindahkan atau dibakar.

Hal ini akan membuatnya jauh lebih mudah dan lebih andal bagi dompet, bursa, dan operator jembatan untuk melacak setoran dan pergerakan secara akurat tanpa perkakas khusus.

**Sumber daya**: [Spesifikasi teknis EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### Daftar tanda terima blok parsial eth/70 {#eth-70-partial-block-receipt-lists}

Saat kita meningkatkan jumlah pekerjaan yang dapat dilakukan Ethereum, daftar tanda terima untuk tindakan tersebut (catatan data dari transaksi ini) menjadi sangat besar sehingga berpotensi menyebabkan node jaringan gagal saat mencoba melakukan sinkronisasi data satu sama lain.

Sekarang menjadi persyaratan untuk semua klien lapisan eksekusi, daftar tanda terima blok parsial eth/70 (atau EIP-7975) memperkenalkan cara baru bagi node untuk berbicara satu sama lain (eth/70) yang memungkinkan daftar besar ini dipecah menjadi bagian-bagian yang lebih kecil dan lebih mudah dikelola. eth/70 memperkenalkan sistem paginasi untuk protokol komunikasi jaringan yang memungkinkan node memecah daftar tanda terima blok dan dengan aman meminta data dalam potongan yang lebih kecil dan lebih mudah dikelola.

Perubahan ini akan mencegah kegagalan sinkronisasi jaringan selama periode aktivitas padat. Pada akhirnya, ini membuka jalan bagi Ethereum untuk meningkatkan kapasitas bloknya, dan memproses lebih banyak transaksi per blok di masa mendatang, tanpa membebani perangkat keras fisik yang menyinkronkan rantai.

**Sumber daya**: [Spesifikasi teknis EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Meta EIP Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Pengumuman blog Pembaruan Prioritas Protokol untuk 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum Pasca-kuantum, Glamsterdam akan datang](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## FAQ {#faq}

### Bagaimana ETH dapat dikonversi setelah percabangan keras Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Tidak Ada Tindakan yang Diperlukan untuk ETH Anda**: Tidak perlu mengonversi atau meningkatkan ETH Anda setelah peningkatan Glamsterdam. Saldo akun Anda akan tetap sama, dan ETH yang Anda pegang saat ini akan tetap dapat diakses dalam bentuknya yang ada setelah percabangan keras.
- **Waspadalah terhadap penipuan!** <Emoji text="⚠️" /> **siapa pun yang menginstruksikan Anda untuk "meningkatkan" ETH Anda sedang mencoba menipu Anda.** Tidak ada yang perlu Anda lakukan sehubungan dengan peningkatan ini. Aset Anda akan tetap sama sekali tidak terpengaruh. Ingat, tetap mendapat informasi adalah pertahanan terbaik terhadap penipuan.

[Lebih lanjut tentang mengenali dan menghindari penipuan](/security/)

### Apakah peningkatan Glamsterdam memengaruhi semua node dan validator Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Ya, peningkatan Glamsterdam mewajibkan pembaruan pada [klien eksekusi dan klien konsensus](/developers/docs/nodes-and-clients/). Karena peningkatan ini memperkenalkan Pemisahan Pengusul-Pembangun yang Diabadikan (ePBS), operator node perlu memastikan klien mereka diperbarui untuk menangani cara baru blok dibangun, divalidasi, dan dibuktikan oleh jaringan.

Semua klien utama Ethereum akan merilis versi yang mendukung percabangan keras yang ditandai sebagai prioritas tinggi. Anda dapat mengikuti kapan rilis ini akan tersedia di repositori GitHub klien, [saluran Discord](https://ethstaker.org/support) mereka, [Discord EthStaker](https://dsc.gg/ethstaker), atau dengan berlangganan blog Ethereum untuk pembaruan protokol.

Untuk mempertahankan sinkronisasi dengan jaringan Ethereum pasca-peningkatan, operator node harus memastikan mereka menjalankan versi klien yang didukung. Perhatikan bahwa informasi tentang rilis klien sensitif terhadap waktu, dan pengguna harus merujuk ke pembaruan terbaru untuk detail paling mutakhir.

### Sebagai staker, apa yang perlu saya lakukan untuk peningkatan Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Seperti halnya setiap peningkatan jaringan, pastikan untuk memperbarui klien Anda ke versi terbaru yang ditandai dengan dukungan Glamsterdam. Ikuti pembaruan di milis dan [Pengumuman Protokol di Blog EF](https://blog.ethereum.org/category/protocol) untuk mendapatkan informasi tentang rilis.

Untuk memvalidasi penyiapan Anda sebelum Glamsterdam diaktifkan di Mainnet, Anda dapat menjalankan validator di testnet. Percabangan testnet juga diumumkan di milis dan blog.

### Peningkatan apa yang akan disertakan Glamsterdam untuk penskalaan lapisan 1 (l1)? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Fitur utamanya adalah ePBS (EIP-7732), yang memisahkan tugas berat memvalidasi transaksi jaringan dari tugas mencapai konsensus. Hal ini memperluas jendela penyebaran data dari 2 detik menjadi sekitar 9 detik, membuka blokir kemampuan Ethereum untuk menangani laju pemrosesan transaksi yang jauh lebih tinggi dengan aman dan mengakomodasi lebih banyak blob data untuk jaringan lapisan 2 (l2).

### Apakah Glamsterdam akan menurunkan biaya di Ethereum (lapisan 1 (l1))? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Ya, Glamsterdam kemungkinan besar akan mengurangi biaya untuk pengguna sehari-hari! Mengurangi gas transaksi intrinsik (atau EIP-2780) mengurangi biaya dasar untuk mengirim ETH, membuat ETH jauh lebih murah untuk digunakan pada pembayaran sehari-hari.

Selain itu, untuk keberlanjutan jangka panjang, Glamsterdam memperkenalkan Daftar Akses Tingkat Blok (BAL). Hal ini memungkinkan pemrosesan paralel dan mempersiapkan lapisan 1 (l1) untuk menangani batas gas keseluruhan yang lebih tinggi dengan aman di masa mendatang, yang kemungkinan akan mengurangi biaya gas per transaksi seiring dengan pertumbuhan kapasitas.

### Apakah akan ada perubahan pada kontrak pintar saya yang ada pasca-Glamsterdam? {#will-my-smart-contracts-change}

Kontrak yang ada akan terus berfungsi normal setelah Glamsterdam. Pengembang kemungkinan akan mendapatkan beberapa alat baru dan harus meninjau penggunaan gas mereka:

- Meningkatkan ukuran kontrak maksimum (atau EIP-7954) memungkinkan pengembang untuk menyebarkan aplikasi yang lebih besar, menaikkan batas ukuran kontrak maksimum dari sekitar 24KiB menjadi 32KiB.
- Penyebaran awal pabrik deterministik (atau EIP-7997) memperkenalkan kontrak pabrik bawaan yang universal. Ini memungkinkan pengembang untuk menyebarkan aplikasi dan dompet kontrak pintar mereka ke alamat yang sama persis di semua rantai EVM yang berpartisipasi.
- Jika aplikasi Anda bergantung pada pelacakan kompleks untuk menemukan transfer ETH, transfer dan pembakaran ETH memancarkan Log (atau EIP-7708) akan memungkinkan Anda beralih menggunakan Log untuk akuntansi yang lebih sederhana dan andal.
- Peningkatan biaya gas pembuatan state (atau EIP-8037) dan pembaruan biaya gas akses state (atau EIP-8038) memperkenalkan model keberlanjutan baru yang akan mengubah biaya penyebaran kontrak tertentu, karena membuat akun baru atau penyimpanan permanen akan memiliki biaya tetap standar baru berdasarkan ukuran data yang dibuat.

### Bagaimana Glamsterdam akan memengaruhi penyimpanan node dan persyaratan perangkat keras? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Beberapa EIP yang sedang dipertimbangkan untuk Glamsterdam mengatasi penurunan kinerja (cliff) dari pertumbuhan state:

- Peningkatan biaya gas pembuatan state (atau EIP-8037) memperkenalkan kerangka kerja biaya tetap (CPSB) untuk menargetkan tingkat pertumbuhan basis data state sebesar 120 GiB/tahun, memastikan perangkat keras fisik standar dapat terus menjalankan jaringan secara efisien.
- Daftar tanda terima blok parsial eth/70 (atau EIP-7975) memungkinkan node untuk meminta tanda terima blok yang dipaginasi, yang memecah daftar tanda terima blok yang padat data menjadi potongan-potongan yang lebih kecil untuk mencegah kemacetan dan sinkronisasi saat Ethereum berskala.