---
title: Glamsterdam
description: Pelajari tentang peningkatan protokol Glamsterdam
lang: id
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam adalah peningkatan Ethereum yang akan datang yang direncanakan untuk H1 2026
</AlertTitle>
<AlertDescription>
Peningkatan Glamsterdam hanyalah satu langkah dalam tujuan pengembangan jangka panjang Ethereum. Pelajari lebih lanjut tentang [peta jalan protokol](/roadmap/) dan [peningkatan sebelumnya](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

Peningkatan Glamsterdam [Ethereum](/) yang akan datang dirancang untuk membuka jalan bagi generasi peningkatan berikutnya. Glamsterdam dinamai dari kombinasi "Amsterdam" (peningkatan lapisan eksekusi, dinamai berdasarkan lokasi Devconnect sebelumnya) dan "Gloas" (peningkatan lapisan konsensus, dinamai berdasarkan nama bintang).

Mengikuti kemajuan yang dibuat dalam peningkatan [Fusaka](/roadmap/fusaka/), Glamsterdam berfokus pada peningkatan L1 dengan mengatur ulang bagaimana jaringan memproses transaksi dan mengelola basis data yang berkembang, yang secara fundamental memperbarui cara Ethereum membuat dan memverifikasi blok.

Sementara Fusaka berfokus pada penyempurnaan mendasar, Glamsterdam memajukan tujuan "Peningkatan L1" dan "Peningkatan Blob" dengan mengabadikan pemisahan tugas antara berbagai peserta jaringan, dan memperkenalkan cara yang lebih efisien untuk menangani data untuk mempersiapkan [status](/glossary/#state) untuk paralelisasi throughput tinggi.

Peningkatan ini memastikan Ethereum tetap cepat, terjangkau, dan terdesentralisasi karena menangani lebih banyak aktivitas, sambil menjaga persyaratan perangkat keras tetap dapat dikelola bagi orang-orang yang menjalankan [node](/glossary/#node) di rumah.

<YouTube id="GgKveVMLnoo" />

## Peningkatan yang dipertimbangkan untuk Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Catatan: Artikel ini saat ini menyoroti pilihan EIP yang sedang dipertimbangkan untuk disertakan dalam Glamsterdam. Untuk pembaruan status terbaru, lihat [peningkatan Glamsterdam di Forkcast](https://forkcast.org/upgrade/glamsterdam).

Jika Anda ingin menambahkan EIP yang sedang dipertimbangkan untuk Glamsterdam, tetapi belum ditambahkan ke halaman ini, [pelajari cara berkontribusi ke ethereum.org di sini](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Peningkatan Glamsterdam berpusat pada tiga tujuan utama:

- Mempercepat pemrosesan (paralelisasi): Mengatur ulang cara jaringan mencatat dependensi data, sehingga dapat memproses banyak transaksi secara aman pada saat yang sama, bukan dalam urutan satu per satu yang lambat.
- Memperluas kapasitas: Membagi pekerjaan berat dalam membuat dan memverifikasi blok, memberikan jaringan lebih banyak waktu untuk menyebarkan data dalam jumlah yang lebih besar tanpa melambat.
- Mencegah pembengkakan basis data (keberlanjutan): Menyesuaikan biaya jaringan agar secara akurat mencerminkan biaya perangkat keras jangka panjang untuk menyimpan data baru, membuka blokir peningkatan batas gas di masa depan sambil mencegah penurunan kinerja perangkat keras.

Singkatnya, Glamsterdam akan memperkenalkan perubahan struktural untuk memastikan bahwa seiring dengan peningkatan kapasitas jaringan, jaringan tersebut tetap berkelanjutan dan kinerjanya tetap tinggi.

## Peningkatan L1 & pemrosesan paralel {#scale-l1}

Peningkatan L1 yang berarti memerlukan perpindahan dari asumsi kepercayaan di luar protokol dan batasan eksekusi serial. Glamsterdam mengatasi hal ini dengan mengabadikan pemisahan tugas-tugas pembangunan blok tertentu dan memperkenalkan struktur data baru yang memungkinkan jaringan untuk mempersiapkan pemrosesan paralel.

### Proposal utama: Pemisahan Pengusul-Pembangun yang Diabadikan (ePBS) {#epbs}

- Menghapus asumsi kepercayaan di luar protokol dan ketergantungan pada relai pihak ketiga
- Mendukung peningkatan L1 dengan mengizinkan muatan yang jauh lebih besar melalui jendela propagasi yang diperluas
- Memperkenalkan pembayaran pembangun tanpa kepercayaan langsung ke dalam protokol

Saat ini, proses mengusulkan dan membangun blok mencakup serah terima antara pengusul blok dan pembangun blok. Hubungan antara pengusul dan pembangun bukanlah bagian dari protokol inti Ethereum, sehingga bergantung pada middleware pihak ketiga yang tepercaya, perangkat lunak (relai), dan kepercayaan di luar protokol antar entitas.

Hubungan di luar protokol antara pengusul dan pembangun juga menciptakan "jalur panas" selama validasi blok yang memaksa [validator](/glossary/#validator) untuk bergegas melalui siaran dan eksekusi transaksi dalam jendela 2 detik yang ketat, membatasi berapa banyak data yang dapat ditangani oleh jaringan.

**Pemisahan Pengusul-Pembangun yang Diabadikan (ePBS, atau EIP-7732)** secara formal memisahkan pekerjaan pengusul (yang memilih blok konsensus) dari pembangun (yang merakit muatan eksekusi), mengabadikan serah terima ini langsung ke dalam protokol.

Membangun pertukaran tanpa kepercayaan dari muatan blok untuk pembayaran langsung ke dalam protokol menghilangkan kebutuhan akan middleware pihak ketiga (seperti MEV-Boost). Namun, pembangun dan pengusul mungkin masih memilih untuk menggunakan relai atau middleware di luar protokol untuk fitur-fitur kompleks yang belum menjadi bagian dari protokol inti.

Untuk mengatasi kemacetan "jalur panas", ePBS juga memperkenalkan Komite Ketepatan Waktu Muatan (PTC) dan logika tenggat waktu ganda, yang memungkinkan validator untuk mengesahkan blok konsensus dan ketepatan waktu muatan eksekusi secara terpisah untuk memaksimalkan keluaran.

<YouTube id="u8XvkTrjITs" />

Memisahkan peran pengusul dan pembangun pada tingkat protokol memperluas jendela propagasi (atau waktu yang tersedia untuk menyebarkan data ke seluruh jaringan) dari 2 detik menjadi sekitar 9 detik.

Dengan mengganti middleware dan relai di luar protokol dengan mekanik dalam protokol, ePBS mengurangi ketergantungan kepercayaan dan memungkinkan Ethereum untuk memproses data dalam jumlah yang jauh lebih besar secara aman (seperti lebih banyak blob untuk [layer 2](/glossary/#layer-2)) tanpa membebani jaringan.

**Sumber Daya**: [Spesifikasi teknis EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Proposal utama: Daftar Akses Tingkat Blok (BALs) {#bals}

- Menghilangkan kemacetan pemrosesan berurutan dengan menyediakan peta awal dari semua dependensi transaksi, mempersiapkan panggung bagi validator untuk memproses banyak transaksi secara paralel alih-alih satu per satu
- Memungkinkan node untuk memperbarui catatan mereka dengan membaca hasil akhir tanpa perlu memutar ulang setiap transaksi (sinkronisasi tanpa eksekusi), membuatnya jauh lebih cepat untuk menyinkronkan node ke jaringan
- Menghilangkan tebakan, memungkinkan validator untuk memuat semua data yang diperlukan sekaligus alih-alih menemukannya langkah demi langkah, yang membuat validasi menjadi lebih cepat

Ethereum saat ini seperti jalan satu lajur; karena jaringan tidak tahu data apa yang akan dibutuhkan atau diubah oleh suatu transaksi (seperti akun mana yang akan disentuh oleh suatu transaksi) hingga transaksi tersebut dijalankan, validator harus memproses transaksi satu per satu dalam baris yang ketat dan berurutan. Jika mereka mencoba memproses transaksi sekaligus, tanpa mengetahui dependensi ini, dua transaksi mungkin secara tidak sengaja mencoba mengubah data yang sama persis pada saat yang sama, menyebabkan kesalahan.

**Daftar Akses Tingkat Blok (BALs, atau EIP-7928)** seperti peta yang disertakan di setiap blok, memberitahu jaringan bagian mana dari basis data yang akan diakses sebelum pekerjaan dimulai. BAL memerlukan setiap blok untuk menyertakan hash dari setiap perubahan akun yang akan disentuh oleh transaksi, bersama dengan hasil akhir dari perubahan tersebut (catatan hash dari semua akses status dan nilai pasca-eksekusi).

Karena memberikan visibilitas instan ke transaksi mana yang tidak tumpang tindih, BAL memungkinkan node untuk melakukan pembacaan disk secara paralel, mengambil informasi untuk banyak transaksi secara bersamaan. Jaringan dapat dengan aman mengelompokkan transaksi yang tidak terkait dan memprosesnya secara paralel.

Karena BAL menyertakan hasil akhir transaksi (nilai pasca-eksekusi), ketika node jaringan perlu menyinkronkan ke status jaringan saat ini, mereka dapat menyalin hasil akhir tersebut untuk memperbarui catatan mereka. Validator tidak perlu lagi memutar ulang semua transaksi yang rumit dari awal untuk mengetahui apa yang terjadi, sehingga lebih cepat dan lebih mudah bagi node baru untuk bergabung dengan jaringan.

Pembacaan disk secara paralel yang dimungkinkan oleh BAL akan menjadi langkah signifikan menuju masa depan di mana Ethereum dapat memproses banyak transaksi sekaligus, secara signifikan meningkatkan kecepatan jaringan.

#### Pertukaran Daftar Akses Blok eth/71 {#bale}

Pertukaran Daftar Akses Blok (eth/71 atau EIP-8159) adalah pendamping jaringan langsung untuk daftar akses tingkat blok. Sementara BAL membuka eksekusi paralel, eth/71 meningkatkan protokol peer-to-peer untuk memungkinkan node benar-benar berbagi daftar ini melalui jaringan. Mengimplementasikan pertukaran daftar akses blok akan memungkinkan sinkronisasi yang lebih cepat dan memungkinkan node untuk melakukan pembaruan status tanpa eksekusi.

**Sumber daya**:

- [Spesifikasi teknis EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Spesifikasi teknis EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Keberlanjutan jaringan {#network-sustainability}

Seiring pertumbuhan jaringan Ethereum yang lebih cepat, penting untuk memastikan bahwa biaya penggunaannya sesuai dengan keausan pada perangkat keras yang menjalankan Ethereum. Jaringan perlu meningkatkan batas kapasitas keseluruhannya agar dapat melakukan peningkatan dan memproses lebih banyak transaksi dengan aman.

### Peningkatan biaya gas pembuatan status {#state-creation-gas-cost-increase}

- Memastikan bahwa biaya untuk membuat akun atau kontrak pintar baru secara akurat mencerminkan beban jangka panjang yang mereka bebankan pada basis data Ethereum
- Secara otomatis menyesuaikan biaya pembuatan data ini berdasarkan kapasitas jaringan secara keseluruhan, menargetkan tingkat pertumbuhan yang aman dan dapat diprediksi sehingga perangkat keras fisik standar dapat terus menjalankan jaringan
- Memisahkan akuntansi untuk biaya spesifik ini ke reservoir baru, menghapus batas transaksi lama dan memungkinkan pengembang untuk menyebarkan aplikasi yang lebih besar dan lebih kompleks

Menambahkan akun baru, token, dan [kontrak pintar](/glossary/#smart-contract) menciptakan data permanen (dikenal sebagai "status") yang harus disimpan tanpa batas oleh setiap komputer yang menjalankan jaringan. Biaya saat ini untuk menambah atau membaca data ini tidak konsisten dan tidak selalu mencerminkan beban penyimpanan jangka panjang yang sebenarnya mereka bebankan pada perangkat keras jaringan.

Beberapa tindakan yang menciptakan status di Ethereum, seperti membuat akun baru atau menyebarkan kontrak pintar besar, biayanya relatif rendah dibandingkan dengan ruang penyimpanan permanen yang mereka gunakan di node jaringan, misalnya, penyebaran kontrak jauh lebih murah per bita daripada membuat ruang penyimpanan.

Tanpa penyesuaian, status Ethereum dapat tumbuh hampir 200 GiB per tahun jika jaringan melakukan peningkatan hingga batas gas 100 Juta, yang pada akhirnya akan melampaui perangkat keras biasa.

**Peningkatan biaya gas pembuatan status (atau EIP-8037)** menyelaraskan biaya dengan mengikatnya pada ukuran sebenarnya dari data yang dibuat, memperbarui biaya sehingga sebanding dengan jumlah data permanen yang dibuat atau diakses oleh suatu operasi.

EIP-8037 juga memperkenalkan model reservoir untuk mengelola biaya ini secara lebih dapat diprediksi; biaya gas status mengambil dari `state_gas_reservoir` terlebih dahulu, dan opcode `GAS` hanya mengembalikan `gas_left`, mencegah frame eksekusi salah menghitung gas yang tersedia.

Sebelum EIP-8037, baik pekerjaan komputasi (pemrosesan aktif) maupun penyimpanan data permanen (menyimpan kontrak pintar ke basis data jaringan) berbagi batas gas yang sama. Model reservoir membagi akuntansi: batas gas untuk pekerjaan komputasi aktual transaksi (pemrosesan) dan untuk penyimpanan data jangka panjang (gas status). Memisahkan keduanya membantu mencegah ukuran data aplikasi yang besar melampaui batas gas; selama pengembang menyediakan dana yang cukup untuk mengisi reservoir untuk penyimpanan data, mereka dapat menyebarkan kontrak pintar yang jauh lebih besar dan lebih kompleks.

Penetapan harga penyimpanan data yang lebih akurat dan dapat diprediksi akan membantu Ethereum meningkatkan kecepatan dan kapasitasnya dengan aman tanpa membuat basis data membengkak. Keberlanjutan ini akan memungkinkan operator node untuk terus menggunakan perangkat keras yang (relatif) terjangkau untuk tahun-tahun mendatang, menjaga agar mengunci dari rumah tetap dapat diakses untuk mempertahankan desentralisasi jaringan.

**Sumber Daya**: [Spesifikasi teknis EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Pembaruan biaya gas akses-status {#state-access-gas-cost-update}

- Meningkatkan biaya gas saat aplikasi membaca atau memperbarui informasi yang disimpan secara permanen di Ethereum (opcode akses-status) agar sesuai dengan pekerjaan komputasi yang dibutuhkan oleh perintah ini
- Memperkuat ketahanan jaringan dengan mencegah serangan penolakan layanan yang mengeksploitasi operasi pembacaan data yang murah secara artifisial

Seiring pertumbuhan status Ethereum, tindakan mencari dan membaca data lama ("akses status") menjadi lebih berat dan lebih lambat untuk diproses oleh node. Biaya untuk tindakan ini tetap sama meskipun sekarang sedikit lebih mahal untuk mencari informasi (dalam hal daya komputasi).

Akibatnya, beberapa perintah spesifik saat ini harganya terlalu rendah dibandingkan dengan pekerjaan yang dipaksakan pada sebuah node. `EXTCODESIZE` dan `EXTCODECOPY` dihargai terlalu rendah, misalnya, karena mereka memerlukan dua pembacaan basis data terpisah—satu untuk objek akun, dan yang kedua untuk ukuran kode atau kode bita yang sebenarnya.

**Pembaruan biaya gas akses-status (atau EIP-8038)** meningkatkan konstanta gas untuk opcode akses-status, seperti mencari data akun dan kontrak, untuk menyelaraskan dengan kinerja perangkat keras modern dan ukuran status.

Menyelaraskan biaya akses-status juga membantu membuat Ethereum lebih tangguh. Karena tindakan pembacaan data yang berat ini murah secara artifisial, penyerang jahat dapat melakukan spam pada jaringan dengan ribuan permintaan data yang kompleks dalam satu blok sebelum mencapai batas biaya jaringan, yang berpotensi menyebabkan jaringan macet atau mogok (serangan penolakan layanan). Bahkan tanpa niat jahat, pengembang tidak didorong secara ekonomi untuk membangun aplikasi yang efisien jika membaca data jaringan terlalu murah.

Dengan memberi harga tindakan akses-status secara lebih akurat, Ethereum dapat menjadi lebih tangguh terhadap perlambatan yang tidak disengaja atau disengaja, sementara menyelaraskan biaya jaringan dengan beban perangkat keras membuktikan fondasi yang lebih berkelanjutan untuk peningkatan batas gas di masa mendatang.

**Sumber Daya**: [Spesifikasi teknis EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Ketahanan jaringan

Penyempurnaan tugas validator dan proses keluar memastikan stabilitas jaringan selama peristiwa pemotongan massal dan mendemokratisasi likuiditas. Peningkatan ini membuat jaringan lebih stabil dan memastikan bahwa semua peserta, besar dan kecil, diperlakukan secara adil.

### Kecualikan validator yang dipotong dari pengusulan {#exclude-slashed-validators}

- Menghentikan validator yang dikenai sanksi (dipotong) agar tidak dipilih untuk mengusulkan blok di masa depan, menghilangkan slot yang terlewatkan yang dijamin
- Menjaga Ethereum berjalan dengan lancar dan andal, mencegah kemacetan parah dalam kasus peristiwa pemotongan massal

Saat ini, bahkan jika validator dipotong (dikenai sanksi karena melanggar aturan atau tidak beroperasi seperti yang diharapkan), sistem mungkin masih memilih mereka untuk memimpin blok dalam waktu dekat ketika menghasilkan tinjauan pengusul di masa depan.

Karena blok dari pengusul yang dipotong secara otomatis ditolak sebagai tidak valid, ini menyebabkan jaringan kehilangan slot dan menunda pemulihan jaringan selama peristiwa pemotongan massal.

**Kecualikan validator yang dipotong dari pengusulan (atau EIP-8045)** hanya menyaring validator yang dipotong agar tidak dipilih untuk tugas di masa depan. Ini meningkatkan ketahanan rantai dengan memastikan hanya validator yang sehat yang dipilih untuk mengusulkan blok, mempertahankan kualitas layanan selama gangguan jaringan.

**Sumber Daya**: [Spesifikasi teknis EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Biarkan pintu keluar menggunakan antrean konsolidasi {#let-exits-use-the-consolidation-queue}

- Menutup celah yang memungkinkan validator dengan saldo tinggi untuk keluar dari jaringan lebih cepat daripada validator yang lebih kecil melalui antrean konsolidasi
- Memungkinkan pintu keluar reguler meluap ke antrean kedua ini ketika memiliki kapasitas cadangan, mengurangi waktu penarikan dari mengunci selama periode volume tinggi
- Mempertahankan keamanan yang ketat untuk menghindari perubahan batas keamanan inti Ethereum atau melemahkan jaringan

Sejak [peningkatan Pectra](/roadmap/pectra) meningkatkan saldo efektif maksimum untuk validator Ethereum dari 32 ETH menjadi 2.048 ETH, celah teknis memungkinkan validator dengan saldo tinggi untuk keluar dari jaringan lebih cepat daripada validator yang lebih kecil melalui antrean konsolidasi.

**Biarkan pintu keluar menggunakan antrean konsolidasi (atau EIP-8080)** mendemokratisasi antrean konsolidasi untuk semua pintu keluar mengunci, menciptakan satu baris yang adil untuk semua orang.

Untuk menguraikan cara kerjanya saat ini:

- Batas churn Ethereum adalah batas keamanan pada tingkat di mana validator dapat masuk, keluar, atau menggabungkan (mengkonsolidasikan) ETH yang mereka stake, untuk memastikan keamanan jaringan tidak pernah goyah
- Karena konsolidasi validator adalah tindakan yang lebih berat dengan lebih banyak bagian yang bergerak daripada keluar validator standar, ia menghabiskan sebagian besar anggaran keamanan ini (batas churn)
- Secara spesifik, protokol menentukan bahwa biaya keamanan pasti dari satu pintu keluar standar adalah dua pertiga (2/3) dari biaya satu konsolidasi

Antrean keluar yang lebih adil akan memungkinkan keluar standar untuk meminjam ruang yang tidak terpakai dari antrean konsolidasi selama periode permintaan keluar yang tinggi, menerapkan nilai tukar "3 untuk 2" (untuk setiap 2 tempat konsolidasi yang tidak terpakai, jaringan dapat dengan aman memproses 3 keluar standar). Faktor churn 3/2 ini menyeimbangkan permintaan di seluruh antrean konsolidasi dan keluar.

Mendemokratisasi akses ke antrean konsolidasi akan meningkatkan kecepatan pengguna dapat keluar dari stake mereka selama periode permintaan tinggi hingga 2,5x, tanpa mengorbankan keamanan jaringan.

**Sumber Daya**: [Spesifikasi teknis EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Meningkatkan pengalaman pengguna & pengembang {#improve-user-developer-experience}

Peningkatan Glamsterdam Ethereum bertujuan untuk meningkatkan pengalaman pengguna, meningkatkan kemudahan penemuan data, dan menangani ukuran pesan yang meningkat untuk mencegah kegagalan sinkronisasi. Ini membuatnya lebih mudah untuk melacak apa yang terjadi onchain sambil mencegah hambatan teknis saat jaringan melakukan peningkatan.

### Mengurangi biaya gas transaksi intrinsik {#reduce-intrinsic-transaction-gas-costs}

- Menurunkan biaya dasar untuk transaksi, mengurangi biaya keseluruhan pembayaran ETH asli sederhana
- Membuat transfer yang lebih kecil lebih terjangkau, meningkatkan kelayakan Ethereum sebagai media pertukaran rutin

Semua transaksi Ethereum memiliki biaya gas dasar tetap hari ini, terlepas dari seberapa sederhana atau kompleksnya untuk diproses. **Mengurangi gas transaksi intrinsik (atau EIP-2780)** mengusulkan pengurangan biaya dasar tersebut untuk membuat transfer ETH standar antar akun yang ada hingga **71% lebih murah**.

Mengurangi gas transaksi intrinsik bekerja dengan memecah biaya transaksi untuk mencerminkan hanya pekerjaan dasar dan esensial yang sebenarnya dilakukan oleh komputer yang menjalankan jaringan, seperti memverifikasi tanda tangan digital dan memperbarui saldo. Karena pembayaran ETH dasar tidak mengeksekusi kode yang kompleks atau membawa data tambahan, proposal ini akan mengurangi biayanya agar sesuai dengan jejaknya yang ringan.

Proposal ini memperkenalkan pengecualian untuk membuat akun baru untuk menjaga agar biaya yang lebih rendah tidak membanjiri status jaringan. Jika transfer mengirimkan ETH ke alamat yang kosong dan tidak ada, jaringan harus membuat catatan baru yang permanen untuknya. Biaya tambahan gas ditambahkan untuk pembuatan akun tersebut untuk membantu menutupi beban penyimpanan jangka panjangnya.

Bersama-sama, EIP-2780 bertujuan untuk membuat transfer sehari-hari antar akun yang ada lebih terjangkau sambil memastikan jaringan masih terlindungi dari pembengkakan basis data dengan memberi harga pertumbuhan status yang sebenarnya secara akurat.

**Sumber Daya**: [Spesifikasi teknis EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Penyebaran Awal Pabrik Deterministik {#deterministic-factory-predeploy}

- Memberikan pengembang cara asli untuk menyebarkan aplikasi dan dompet kontrak pintar ke alamat yang sama persis di berbagai rantai
- Memungkinkan pengguna untuk memiliki alamat dompet pintar yang sama di beberapa jaringan layer 2 (L2), mengurangi beban kognitif, mengurangi kebingungan, dan mengurangi risiko kehilangan dana secara tidak sengaja
- Menggantikan solusi yang saat ini digunakan pengembang untuk mencapai paritas ini, membuatnya lebih mudah dan lebih aman untuk membangun dompet dan aplikasi multi-rantai

Jika pengguna memiliki dompet kontrak pintar hari ini dengan akun di beberapa rantai yang kompatibel dengan Mesin Virtual Ethereum (EVM), mereka seringkali berakhir dengan alamat yang sama sekali berbeda di jaringan yang berbeda. Ini tidak hanya membingungkan, tetapi juga dapat menyebabkan kehilangan dana secara tidak sengaja.

**Penyebaran Awal Pabrik Deterministik (atau EIP-7997)** memberikan pengembang cara bawaan dan asli untuk menyebarkan aplikasi terdesentralisasi dan dompet kontrak pintar mereka ke alamat yang sama persis di berbagai rantai EVM, termasuk Mainnet Ethereum, jaringan layer 2 (L2), dan banyak lagi. Jika diadopsi, ini akan memungkinkan pengguna untuk memiliki alamat yang sama persis di setiap rantai yang berpartisipasi, secara signifikan mengurangi beban kognitif dan potensi kesalahan pengguna.

Penyebaran Awal Pabrik Deterministik bekerja dengan menempatkan program pabrik khusus yang minimal secara permanen di lokasi yang identik (khususnya, alamat 0x12) di setiap rantai yang kompatibel dengan EVM yang berpartisipasi. Tujuannya adalah untuk menyediakan kontrak pabrik standar universal yang dapat diadopsi oleh jaringan yang kompatibel dengan EVM; selama rantai EVM berpartisipasi dan mengadopsi standar ini, pengembang akan dapat menggunakannya untuk menyebarkan kontrak pintar mereka ke alamat yang sama persis di jaringan tersebut.

Standardisasi ini menyederhanakan pembangunan dan pengelolaan aplikasi lintas rantai untuk pengembang dan ekosistem yang lebih luas. Pengembang tidak perlu lagi membuat kode khusus untuk rantai tertentu untuk menghubungkan perangkat lunak mereka di berbagai jaringan, melainkan menggunakan pabrik universal ini untuk menghasilkan alamat yang sama persis untuk aplikasi mereka di mana saja. Selain itu, penjelajah blok, layanan pelacakan, dan dompet dapat dengan lebih mudah mengidentifikasi dan menautkan aplikasi dan akun ini di berbagai rantai, menciptakan lingkungan multi-rantai yang lebih terpadu dan mulus untuk semua peserta berbasis Ethereum.

**Sumber Daya**: [Spesifikasi teknis EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Transfer dan pembakaran ETH mengeluarkan log {#eth-transfers-and-burns-emit-a-log}

- Secara otomatis menghasilkan catatan permanen (log) setiap kali ETH ditransfer atau dibakar
- Memperbaiki titik buta historis yang memungkinkan aplikasi, bursa, dan jembatan untuk mendeteksi deposit pengguna secara andal tanpa alat pelacakan ad-hoc

Berbeda dengan token (ERC-20), transfer ETH reguler antar kontrak pintar tidak mengeluarkan tanda terima yang jelas (log standar), sehingga sulit dilacak oleh bursa dan aplikasi.

Transfer dan pembakaran ETH mengeluarkan log (atau EIP-7708) mewajibkan jaringan untuk mengeluarkan peristiwa log standar setiap kali sejumlah ETH yang tidak nol dipindahkan atau dibakar.

Ini akan membuatnya jauh lebih mudah dan lebih dapat diandalkan bagi dompet, bursa, dan operator jembatan untuk melacak deposit dan pergerakan secara akurat tanpa peralatan khusus.

**Sumber Daya**: [Spesifikasi teknis EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### Daftar tanda terima blok parsial eth/70 {#eth-70-partial-block-receipt-lists}

Seiring dengan meningkatnya jumlah pekerjaan yang dapat dilakukan Ethereum, daftar tanda terima untuk tindakan tersebut (catatan data dari transaksi ini) menjadi sangat besar sehingga berpotensi menyebabkan node jaringan gagal saat mencoba menyinkronkan data satu sama lain.

Daftar tanda terima blok parsial eth/70 (atau EIP-7975) memperkenalkan cara baru bagi node untuk berkomunikasi satu sama lain (eth/70) yang memungkinkan daftar besar ini dipecah menjadi bagian-bagian yang lebih kecil dan lebih mudah dikelola. eth/70 memperkenalkan sistem paginasi untuk protokol komunikasi jaringan yang memungkinkan node untuk memecah daftar tanda terima blok dan dengan aman meminta data dalam potongan yang lebih kecil dan lebih mudah dikelola.

Perubahan ini akan mencegah kegagalan sinkronisasi jaringan selama periode aktivitas padat. Pada akhirnya, ini membuka jalan bagi Ethereum untuk meningkatkan kapasitas bloknya, dan memproses lebih banyak transaksi per blok di masa depan, tanpa membebani perangkat keras fisik yang menyinkronkan rantai.

**Sumber Daya**: [Spesifikasi teknis EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Meta EIP Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Pengumuman blog Pembaruan Prioritas Protokol untuk 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum pasca-kuantum, Glamsterdam akan datang](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## FAQ {#faq}

### Bagaimana cara mengonversi ETH setelah hard fork Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Tidak Ada Tindakan yang Diperlukan untuk ETH Anda**: Tidak perlu mengonversi atau meningkatkan ETH Anda setelah peningkatan Glamsterdam. Saldo akun Anda akan tetap sama, dan ETH yang Anda miliki saat ini akan tetap dapat diakses dalam bentuknya yang ada setelah hard fork.
- **Waspada penipuan!** <Emoji text="⚠️" /> **siapa pun yang menginstruksikan Anda untuk "meningkatkan" ETH Anda sedang mencoba menipu Anda.** Tidak ada yang perlu Anda lakukan sehubungan dengan peningkatan ini. Aset milik anda tidak akan terpengaruh sama sekali. Ingat, tetap terinformasi adalah pertahanan terbaik untuk melawan penipuan.

[Lebih lanjut tentang mengenali dan menghindari penipuan](/security/)

### Apakah peningkatan Glamsterdam memengaruhi semua node dan validator Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Ya, peningkatan Glamsterdam memerlukan pembaruan pada [klien eksekusi dan klien konsensus](/developers/docs/nodes-and-clients/). Karena peningkatan ini memperkenalkan Pemisahan Pengusul-Pembangun yang Diabadikan (ePBS), operator node perlu memastikan klien mereka diperbarui untuk menangani cara-cara baru blok dibangun, divalidasi, dan disahkan oleh jaringan.

Semua klien utama Ethereum akan merilis versi yang mendukung hard fork yang ditandai sebagai prioritas tinggi. Anda dapat terus mengikuti kapan rilis ini akan tersedia di repositori GitHub klien, [saluran Discord](https://ethstaker.org/support) mereka, [Discord EthStaker](https://dsc.gg/ethstaker), atau dengan berlangganan blog Ethereum untuk pembaruan protokol.

Untuk menjaga sinkronisasi dengan jaringan Ethereum setelah upgrade, operator node harus memastikan bahwa mereka menjalankan versi client yang didukung. Perlu dicatat bahwa informasi mengenai rilis client bersifat sensitif terhadap waktu, sehingga pengguna harus merujuk pada pembaruan terbaru untuk mendapatkan detail yang paling terkini.

### Sebagai seorang staker, apa yang perlu saya lakukan untuk peningkatan Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Seperti setiap peningkatan jaringan, pastikan untuk memperbarui klien Anda ke versi terbaru yang ditandai dengan dukungan Glamsterdam. Ikuti pembaruan di milis dan [Pengumuman Protokol di Blog EF](https://blog.ethereum.org/category/protocol) untuk mendapatkan informasi tentang rilis.

Untuk memvalidasi pengaturan Anda sebelum Glamsterdam diaktifkan di Mainnet, Anda dapat menjalankan validator di testnet. Percabangan jaringan percobaan juga diumumkan di milis dan blog.

### Peningkatan apa yang akan disertakan Glamsterdam untuk peningkatan L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Fitur utamanya adalah ePBS (EIP-7732), yang memisahkan tugas berat memvalidasi transaksi jaringan dari tugas mencapai konsensus. Ini memperluas jendela propagasi data dari 2 detik menjadi sekitar 9 detik, membuka kemampuan Ethereum untuk menangani keluaran transaksi yang jauh lebih tinggi dengan aman dan mengakomodasi lebih banyak blob data untuk jaringan layer 2.

### Akankah Glamsterdam menurunkan biaya di Ethereum (layer 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Ya, Glamsterdam kemungkinan besar akan mengurangi biaya untuk pengguna sehari-hari! Mengurangi gas transaksi intrinsik (atau EIP-2780) mengurangi biaya dasar untuk mengirim ETH, membuat ETH jauh lebih murah untuk digunakan dalam pembayaran sehari-hari.

Selain itu, untuk keberlanjutan jangka panjang, Glamsterdam memperkenalkan Daftar Akses Tingkat Blok (BALs). Ini memungkinkan pemrosesan paralel dan mempersiapkan L1 untuk menangani batas gas keseluruhan yang lebih tinggi dengan aman di masa depan, yang kemungkinan akan mengurangi biaya gas per transaksi seiring dengan bertambahnya kapasitas.

### Apakah akan ada perubahan pada kontrak pintar saya yang sudah ada pasca-Glamsterdam? {#will-my-smart-contracts-change}

Kontrak yang ada akan terus berfungsi normal setelah Glamsterdam. Pengembang kemungkinan akan mendapatkan beberapa alat baru dan harus meninjau penggunaan gas mereka:

- Peningkatan ukuran kontrak maksimum (atau EIP-7954) memungkinkan pengembang untuk menyebarkan aplikasi yang lebih besar, meningkatkan batas ukuran kontrak maksimum dari sekitar 24KiB menjadi 32KiB.
- Penyebaran awal pabrik deterministik (atau EIP-7997) memperkenalkan kontrak pabrik universal bawaan. Ini memungkinkan pengembang untuk menyebarkan aplikasi dan dompet kontrak pintar mereka ke alamat yang sama persis di semua rantai EVM yang berpartisipasi.
- Jika aplikasi Anda mengandalkan pelacakan kompleks untuk menemukan transfer ETH, transfer ETH dan pembakaran yang mengeluarkan log (atau EIP-7708) akan memungkinkan Anda untuk beralih menggunakan log untuk akuntansi yang lebih sederhana dan andal.
- Peningkatan biaya gas pembuatan status (atau EIP-8037) dan pembaruan biaya gas akses-status (atau EIP-8038) memperkenalkan model keberlanjutan baru yang akan mengubah biaya penyebaran kontrak tertentu, karena pembuatan akun baru atau penyimpanan permanen akan memiliki biaya yang dapat disesuaikan secara dinamis.

### Bagaimana Glamsterdam akan memengaruhi penyimpanan node dan persyaratan perangkat keras? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Beberapa EIP yang sedang dipertimbangkan untuk Glamsterdam mengatasi jurang kinerja pertumbuhan status:

- Peningkatan biaya gas pembuatan status (atau EIP-8037) memperkenalkan model penetapan harga dinamis untuk menargetkan tingkat pertumbuhan basis data status sebesar 100 GiB/tahun, memastikan perangkat keras fisik standar dapat terus menjalankan jaringan secara efisien.
- Daftar tanda terima blok parsial eth/70 (atau EIP-7975) memungkinkan node untuk meminta tanda terima blok yang dipaginasi, yang memecah daftar tanda terima blok yang sarat data menjadi potongan-potongan yang lebih kecil untuk mencegah crash dan sinkronisasi saat Ethereum melakukan peningkatan.
