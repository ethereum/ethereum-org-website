---
title: Glamsterdam
description: Pelajari tentang peningkatan protokol Glamsterdam
lang: id
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam adalah peningkatan Ethereum mendatang yang direncanakan untuk Semester 1 2026
</AlertTitle>
<AlertDescription>
Peningkatan Glamsterdam hanyalah satu langkah dalam tujuan pengembangan jangka panjang Ethereum. Pelajari lebih lanjut tentang [peta jalan protokol](/roadmap/) dan [peningkatan sebelumnya](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

Peningkatan Glamsterdam [Ethereum](/) yang akan datang dirancang untuk membuka jalan bagi generasi peningkatan skala berikutnya. Glamsterdam dinamai dari kombinasi "Amsterdam" (peningkatan lapisan eksekusi, dinamai dari lokasi Devconnect sebelumnya) dan "Gloas" (peningkatan lapisan konsensus, dinamai dari sebuah bintang).

Mengikuti kemajuan yang dicapai dalam peningkatan [Fusaka](/roadmap/fusaka/), Glamsterdam berfokus pada peningkatan skala L1 dengan mengatur ulang cara jaringan memproses transaksi dan mengelola basis datanya yang terus berkembang, secara mendasar memperbarui cara Ethereum membuat dan memverifikasi blok.

Sementara Fusaka berfokus pada penyempurnaan dasar, Glamsterdam memajukan tujuan "Tingkatkan Skala L1" dan "Tingkatkan Skala Blob" dengan mengabadikan pemisahan tugas di antara berbagai peserta jaringan, dan memperkenalkan cara yang lebih efisien untuk menangani data guna mempersiapkan [status](/glossary/#state) untuk paralelisasi throughput tinggi.

Peningkatan ini memastikan Ethereum tetap cepat, terjangkau, dan terdesentralisasi saat menangani lebih banyak aktivitas, sambil menjaga persyaratan perangkat keras tetap dapat dikelola bagi orang-orang yang menjalankan [node](/glossary/#node) di rumah.

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

- Mempercepat pemrosesan (paralelisasi): Mengatur ulang cara jaringan mencatat dependensi data, sehingga dapat memproses banyak transaksi secara bersamaan dengan aman alih-alih dalam urutan satu per satu yang lambat.
- Memperluas kapasitas: Membagi tugas berat dalam membuat dan memverifikasi blok, memberi jaringan lebih banyak waktu untuk menyebarkan jumlah data yang lebih besar tanpa melambat.
- Mencegah pembengkakan basis data (keberlanjutan): Menyesuaikan biaya jaringan untuk secara akurat mencerminkan biaya perangkat keras jangka panjang dari penyimpanan data baru, membuka blokir peningkatan batas gas di masa mendatang sambil mencegah penurunan kinerja perangkat keras.

Singkatnya, Glamsterdam akan memperkenalkan perubahan struktural untuk memastikan bahwa seiring dengan peningkatan kapasitas jaringan, jaringan tersebut tetap berkelanjutan dan kinerjanya tetap tinggi.

## Tingkatkan skala L1 & pemrosesan paralel {#scale-l1}

Peningkatan skala L1 yang bermakna membutuhkan peralihan dari asumsi kepercayaan di luar protokol dan batasan eksekusi serial. Glamsterdam mengatasi hal ini dengan mengabadikan pemisahan tugas pembuatan blok tertentu dan memperkenalkan struktur data baru yang memungkinkan jaringan bersiap untuk pemrosesan paralel.

### Proposal utama: Enshrined Proposer-Builder Separation (ePBS) {#epbs}

- Menghapus asumsi kepercayaan di luar protokol dan ketergantungan pada relai pihak ketiga
- Mendukung peningkatan skala L1 dengan memungkinkan payload yang jauh lebih besar melalui jendela propagasi yang diperpanjang
- Memperkenalkan pembayaran pembangun tanpa kepercayaan (trustless) langsung ke dalam protokol 

Saat ini, proses pengusulan dan pembuatan blok mencakup penyerahan antara pengusul blok dan pembangun blok. Hubungan antara pengusul dan pembangun bukanlah bagian dari protokol inti Ethereum, sehingga bergantung pada middleware pihak ketiga tepercaya, perangkat lunak (relai), dan kepercayaan di luar protokol antar entitas.

Hubungan di luar protokol antara pengusul dan pembangun juga menciptakan "jalur panas" selama validasi blok yang memaksa [validator](/glossary/#validator) untuk bergegas melalui penyiaran dan eksekusi transaksi dalam jendela 2 detik yang ketat, membatasi seberapa banyak data yang dapat ditangani jaringan.

**Enshrined Proposer-Builder Separation (ePBS, atau EIP-7732)** secara formal memisahkan pekerjaan pengusul (yang memilih blok konsensus) dari pembangun (yang merakit payload eksekusi), mengabadikan penyerahan ini langsung ke dalam protokol. 

Membangun pertukaran payload blok tanpa kepercayaan untuk pembayaran langsung ke dalam protokol menghilangkan kebutuhan akan middleware pihak ketiga (seperti MEV-Boost). Namun, pembangun dan pengusul mungkin masih memilih untuk menggunakan relai atau middleware di luar protokol untuk fitur kompleks yang belum menjadi bagian dari protokol inti. 

Untuk mengatasi hambatan "jalur panas", ePBS juga memperkenalkan Payload Timeliness Committee (PTC) dan logika tenggat waktu ganda, yang memungkinkan validator untuk mengesahkan blok konsensus dan ketepatan waktu payload eksekusi secara terpisah untuk memaksimalkan throughput.

<YouTube id="u8XvkTrjITs" />

Memisahkan peran pengusul dan pembangun di tingkat protokol memperluas jendela propagasi (atau waktu yang tersedia untuk menyebarkan data ke seluruh jaringan) dari 2 detik menjadi sekitar 9 detik.

Dengan mengganti middleware dan relai di luar protokol dengan mekanika di dalam protokol, ePBS mengurangi ketergantungan kepercayaan dan memungkinkan Ethereum untuk memproses jumlah data yang jauh lebih besar dengan aman (seperti lebih banyak blob untuk [layer 2](/glossary/#layer-2)) tanpa membebani jaringan.

**Sumber daya**: [Spesifikasi teknis EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Proposal utama: Block-Level Access Lists (BALs) {#bals}

- Menghilangkan hambatan pemrosesan berurutan dengan menyediakan peta awal dari semua dependensi transaksi, menyiapkan panggung bagi validator untuk memproses banyak transaksi secara paralel alih-alih satu per satu
- Memungkinkan node untuk memperbarui catatan mereka dengan membaca hasil akhir tanpa perlu memutar ulang setiap transaksi (sinkronisasi tanpa eksekusi), membuatnya jauh lebih cepat untuk menyinkronkan node ke jaringan
- Menghilangkan tebakan, memungkinkan validator untuk memuat semua data yang diperlukan sekaligus alih-alih menemukannya selangkah demi selangkah, yang membuat validasi jauh lebih cepat

Ethereum saat ini seperti jalan satu jalur; karena jaringan tidak tahu data apa yang akan dibutuhkan atau diubah oleh transaksi (seperti akun mana yang akan disentuh transaksi) sampai transaksi dijalankan, validator harus memproses transaksi satu per satu dalam garis berurutan yang ketat. Jika mereka mencoba memproses transaksi sekaligus, tanpa mengetahui dependensi ini, dua transaksi mungkin secara tidak sengaja mencoba mengubah data yang sama persis pada saat yang sama, menyebabkan kesalahan.

**Block-Level Access Lists (BALs, atau EIP-7928)** seperti peta yang disertakan dalam setiap blok, memberi tahu jaringan bagian mana dari basis data yang akan diakses sebelum pekerjaan dimulai. BALs mengharuskan setiap blok untuk menyertakan hash dari setiap perubahan akun yang akan disentuh transaksi, bersama dengan hasil akhir dari perubahan tersebut (catatan hash dari semua akses status dan nilai pasca-eksekusi).

Karena mereka memberikan visibilitas instan ke transaksi mana yang tidak tumpang tindih, BALs memungkinkan node untuk melakukan pembacaan disk paralel, mengambil informasi untuk banyak transaksi secara bersamaan. Jaringan dapat dengan aman mengelompokkan transaksi yang tidak terkait dan memprosesnya secara paralel.

Karena BAL menyertakan hasil akhir transaksi (nilai pasca-eksekusi), ketika node jaringan perlu menyinkronkan ke status jaringan saat ini, mereka dapat menyalin hasil akhir tersebut untuk memperbarui catatan mereka. Validator tidak perlu lagi memutar ulang semua transaksi rumit dari awal untuk mengetahui apa yang terjadi, membuatnya lebih cepat dan lebih mudah bagi node baru untuk bergabung dengan jaringan.

Pembacaan disk paralel yang diaktifkan oleh BALs akan menjadi langkah signifikan menuju masa depan di mana Ethereum dapat memproses banyak transaksi sekaligus, secara signifikan meningkatkan kecepatan jaringan.

#### eth/71 Block Access List Exchange {#bale}

Block Access List Exchange (eth/71 atau EIP-8159) adalah pendamping jaringan langsung untuk daftar akses tingkat blok. Sementara BALs membuka kunci eksekusi paralel, eth/71 meningkatkan protokol peer-to-peer untuk memungkinkan node benar-benar membagikan daftar ini melalui jaringan. Menerapkan pertukaran daftar akses blok akan memungkinkan sinkronisasi yang lebih cepat dan memungkinkan node untuk melakukan pembaruan status tanpa eksekusi.

**Sumber daya**:

- [Spesifikasi teknis EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Spesifikasi teknis EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Keberlanjutan jaringan {#network-sustainability}

Seiring pertumbuhan jaringan Ethereum yang lebih cepat, penting untuk memastikan bahwa biaya penggunaannya sesuai dengan keausan pada perangkat keras yang menjalankan Ethereum. Jaringan perlu meningkatkan batas kapasitas keseluruhannya agar dapat meningkatkan skala dengan aman dan memproses lebih banyak transaksi.

### Peningkatan biaya gas pembuatan status {#state-creation-gas-cost-increase}

- Memastikan bahwa biaya untuk membuat akun baru atau kontrak pintar secara akurat mencerminkan beban jangka panjang yang mereka tempatkan pada basis data Ethereum
- Secara otomatis menyesuaikan biaya pembuatan data ini berdasarkan kapasitas keseluruhan jaringan, menargetkan tingkat pertumbuhan yang aman dan dapat diprediksi sehingga perangkat keras fisik standar dapat terus menjalankan jaringan
- Memisahkan akuntansi untuk biaya spesifik ini ke reservoir baru, menghapus batas transaksi lama dan memungkinkan pengembang untuk menerapkan aplikasi yang lebih besar dan lebih kompleks

Menambahkan akun, token, dan [kontrak pintar](/glossary/#smart-contract) baru menciptakan data permanen (dikenal sebagai "status") yang harus disimpan tanpa batas waktu oleh setiap komputer yang menjalankan jaringan. Biaya saat ini untuk menambahkan atau membaca data ini tidak konsisten dan belum tentu mencerminkan beban penyimpanan jangka panjang yang sebenarnya yang mereka tempatkan pada perangkat keras jaringan.

Beberapa tindakan yang menciptakan status di Ethereum, seperti membuat akun baru atau menerapkan kontrak pintar yang besar, memiliki biaya yang relatif rendah dibandingkan dengan ruang penyimpanan permanen yang mereka gunakan pada node jaringan, misalnya, penerapan kontrak secara signifikan lebih murah per byte daripada membuat slot penyimpanan.

Tanpa penyesuaian, status Ethereum dapat tumbuh hampir 200 GiB setahun jika jaringan ditingkatkan ke batas gas 100M, yang pada akhirnya melampaui perangkat keras umum.

**Peningkatan biaya gas pembuatan status (atau EIP-8037)** menyelaraskan biaya dengan mengaitkannya pada ukuran sebenarnya dari data yang dibuat, memperbarui biaya sehingga proporsional dengan jumlah data permanen yang dibuat atau diakses oleh suatu operasi.

EIP-8037 juga memperkenalkan model reservoir untuk mengelola biaya ini dengan lebih dapat diprediksi; biaya gas status ditarik dari `state_gas_reservoir` terlebih dahulu, dan opcode `GAS` hanya mengembalikan `gas_left`, mencegah bingkai eksekusi salah menghitung gas yang tersedia.

Sebelum EIP-8037, baik pekerjaan komputasi (pemrosesan aktif) maupun penyimpanan data permanen (menyimpan kontrak pintar ke basis data jaringan) berbagi batas gas yang sama. Model reservoir membagi akuntansi: batas gas untuk pekerjaan komputasi aktual dari transaksi (pemrosesan) dan untuk penyimpanan data jangka panjang (gas status). Memisahkan keduanya membantu mencegah ukuran data aplikasi yang sangat besar dari membatasi batas gas; selama pengembang menyediakan dana yang cukup untuk mengisi reservoir untuk penyimpanan data, mereka dapat menerapkan kontrak pintar yang jauh lebih besar dan lebih kompleks.

Menetapkan harga penyimpanan data dengan lebih akurat dan dapat diprediksi akan membantu Ethereum meningkatkan kecepatan dan kapasitasnya dengan aman tanpa membengkakkan basis data. Keberlanjutan ini akan memungkinkan operator node untuk terus menggunakan perangkat keras yang (relatif) terjangkau selama bertahun-tahun yang akan datang, menjaga mengunci di rumah tetap dapat diakses untuk mempertahankan desentralisasi jaringan.

**Sumber daya**: [Spesifikasi teknis EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Pembaruan biaya gas akses status {#state-access-gas-cost-update}

- Meningkatkan biaya gas ketika aplikasi membaca atau memperbarui informasi yang disimpan secara permanen di Ethereum (opcode akses status) agar secara akurat sesuai dengan pekerjaan komputasi yang dibutuhkan perintah ini
- Memperkuat ketahanan jaringan dengan mencegah serangan penolakan layanan (denial-of-service) yang mengeksploitasi operasi pembacaan data yang secara artifisial murah

Seiring dengan pertumbuhan status Ethereum, tindakan mencari dan membaca data lama ("akses status") menjadi lebih berat dan lebih lambat untuk diproses oleh node. Biaya untuk tindakan ini tetap sama meskipun sekarang sedikit lebih mahal untuk mencari informasi (dalam hal daya komputasi).

Akibatnya, beberapa perintah spesifik saat ini dihargai terlalu rendah relatif terhadap pekerjaan yang mereka paksakan untuk dilakukan oleh node. `EXTCODESIZE` dan `EXTCODECOPY` dihargai terlalu rendah, misalnya, karena mereka membutuhkan dua pembacaan basis data yang terpisah—satu untuk objek akun, dan yang kedua untuk ukuran kode aktual atau bytecode.

**Pembaruan biaya gas akses status (atau EIP-8038)** meningkatkan konstanta gas untuk opcode akses status, seperti mencari data akun dan kontrak, untuk menyelaraskan dengan kinerja perangkat keras modern dan ukuran status.

Menyelaraskan biaya akses status juga membantu membuat Ethereum lebih tangguh. Karena tindakan pembacaan data yang berat ini secara artifisial murah, penyerang jahat dapat mengirim spam ke jaringan dengan ribuan permintaan data kompleks dalam satu blok sebelum mencapai batas biaya jaringan, yang berpotensi menyebabkan jaringan terhenti atau macet (serangan penolakan layanan). Bahkan tanpa niat jahat, pengembang tidak didorong secara ekonomi untuk membangun aplikasi yang efisien jika membaca data jaringan terlalu murah.

Dengan menetapkan harga tindakan akses status secara lebih akurat, Ethereum dapat menjadi lebih tangguh terhadap perlambatan yang tidak disengaja atau disengaja, sementara menyelaraskan biaya jaringan dengan beban perangkat keras membuktikan fondasi yang lebih berkelanjutan untuk peningkatan batas gas di masa mendatang.

**Sumber daya**: [Spesifikasi teknis EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Ketahanan jaringan

Penyempurnaan pada tugas validator dan proses keluar memastikan stabilitas jaringan selama peristiwa pemotongan massal dan mendemokratisasi likuiditas. Peningkatan ini membuat jaringan lebih stabil dan memastikan bahwa semua peserta, besar dan kecil, diperlakukan secara adil.

### Kecualikan validator yang dipotong dari pengusulan {#exclude-slashed-validators}

- Menghentikan validator yang dihukum (dipotong) agar tidak dipilih untuk mengusulkan blok di masa mendatang, menghilangkan jaminan slot yang terlewat
- Menjaga Ethereum berjalan lancar dan dapat diandalkan, mencegah kemacetan parah jika terjadi peristiwa pemotongan massal

Saat ini, bahkan jika validator dipotong (dihukum karena melanggar aturan atau tidak beroperasi seperti yang diharapkan), sistem mungkin masih memilih mereka untuk memimpin blok dalam waktu dekat ketika menghasilkan pandangan ke depan pengusul di masa mendatang.

Karena blok dari pengusul yang dipotong secara otomatis ditolak sebagai tidak valid, hal ini menyebabkan jaringan melewatkan slot dan menunda pemulihan jaringan selama peristiwa pemotongan massal.

**Kecualikan validator yang dipotong dari pengusulan (atau EIP-8045)** secara sederhana menyaring validator yang dipotong agar tidak dipilih untuk tugas di masa mendatang. Ini meningkatkan ketahanan rantai dengan memastikan hanya validator yang sehat yang dipilih untuk mengusulkan blok, mempertahankan kualitas layanan selama gangguan jaringan.

**Sumber daya**: [Spesifikasi teknis EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Biarkan proses keluar menggunakan antrean konsolidasi {#let-exits-use-the-consolidation-queue}

- Menutup celah yang memungkinkan validator bersaldo tinggi untuk keluar dari jaringan lebih cepat daripada validator yang lebih kecil melalui antrean konsolidasi
- Memungkinkan proses keluar reguler meluap ke antrean kedua ini ketika memiliki kapasitas cadangan, mengurangi waktu penarikan mengunci selama periode volume tinggi
- Mempertahankan keamanan yang ketat untuk menghindari perubahan batas keamanan inti Ethereum atau melemahkan jaringan

Sejak [peningkatan Pectra](/roadmap/pectra) meningkatkan saldo efektif maksimum untuk validator Ethereum dari 32 ETH menjadi 2.048 ETH, celah teknis memungkinkan validator bersaldo tinggi untuk keluar dari jaringan lebih cepat daripada validator yang lebih kecil melalui antrean konsolidasi.

**Biarkan proses keluar menggunakan antrean konsolidasi (atau EIP-8080)** mendemokratisasi antrean konsolidasi untuk semua proses keluar mengunci, menciptakan satu antrean yang adil untuk semua orang.

Untuk merinci bagaimana ini bekerja saat ini:

- Batas churn Ethereum adalah batas keamanan pada tingkat di mana validator dapat masuk, keluar, atau menggabungkan (mengkonsolidasikan) ETH yang mereka stake, untuk memastikan keamanan jaringan tidak pernah tidak stabil
- Karena konsolidasi validator adalah tindakan yang lebih berat dengan lebih banyak bagian yang bergerak daripada proses keluar validator standar, ini memakan porsi yang lebih besar dari anggaran keamanan ini (batas churn)
- Secara khusus, protokol mendikte bahwa biaya keamanan yang tepat dari satu proses keluar standar adalah dua pertiga (2/3) dari biaya satu konsolidasi

Antrean keluar yang lebih adil akan memungkinkan proses keluar standar untuk meminjam ruang yang tidak terpakai dari antrean konsolidasi selama periode permintaan keluar yang tinggi, menerapkan nilai tukar "3 untuk 2" (untuk setiap 2 tempat konsolidasi yang tidak terpakai, jaringan dapat dengan aman memproses 3 proses keluar standar). Faktor churn 3/2 ini menyeimbangkan permintaan di seluruh antrean konsolidasi dan keluar.

Mendemokratisasi akses ke antrean konsolidasi akan meningkatkan kecepatan pengguna untuk keluar dari stake mereka selama periode permintaan tinggi hingga 2,5x, tanpa mengorbankan keamanan jaringan.

**Sumber daya**: [Spesifikasi teknis EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Tingkatkan pengalaman pengguna & pengembang {#improve-user-developer-experience}

Peningkatan Glamsterdam Ethereum bertujuan untuk meningkatkan pengalaman pengguna, meningkatkan kemampuan penemuan data, dan menangani peningkatan ukuran pesan untuk mencegah kegagalan sinkronisasi. Ini membuatnya lebih mudah untuk melacak apa yang terjadi onchain sambil mencegah gangguan teknis saat jaringan ditingkatkan skalanya.

### Kurangi biaya gas transaksi intrinsik {#reduce-intrinsic-transaction-gas-costs}

- Menurunkan biaya dasar untuk transaksi, mengurangi biaya keseluruhan dari pembayaran ETH asli yang sederhana
- Membuat transfer yang lebih kecil menjadi lebih terjangkau, meningkatkan kelayakan Ethereum sebagai alat tukar rutin

Semua transaksi Ethereum memiliki biaya gas dasar yang tetap saat ini, terlepas dari seberapa sederhana atau kompleksnya untuk diproses. **Kurangi gas transaksi intrinsik (atau EIP-2780)** mengusulkan pengurangan biaya dasar tersebut untuk membuat transfer ETH standar antara akun yang ada hingga **71% lebih murah**.

Kurangi gas transaksi intrinsik bekerja dengan merinci biaya transaksi untuk mencerminkan hanya pekerjaan dasar dan penting yang sebenarnya dilakukan oleh komputer yang menjalankan jaringan, seperti memverifikasi tanda tangan digital dan memperbarui saldo. Karena pembayaran ETH dasar tidak mengeksekusi kode kompleks atau membawa data tambahan, proposal ini akan mengurangi biayanya agar sesuai dengan jejaknya yang ringan.

Proposal ini memperkenalkan pengecualian untuk membuat akun baru guna menjaga agar biaya yang lebih rendah tidak membebani status jaringan. Jika transfer mengirimkan ETH ke alamat yang kosong dan tidak ada, jaringan harus membuat catatan baru yang permanen untuknya. Biaya tambahan gas ditambahkan untuk pembuatan akun tersebut guna membantu menutupi beban penyimpanan jangka panjangnya.

Bersama-sama, EIP-2780 bertujuan untuk membuat transfer sehari-hari antara akun yang ada menjadi lebih terjangkau sambil memastikan jaringan tetap terlindungi dari pembengkakan basis data dengan menetapkan harga pertumbuhan status yang sebenarnya secara akurat.

**Sumber daya**: [Spesifikasi teknis EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Deterministic Factory Predeploy {#deterministic-factory-predeploy}

- Memberi pengembang cara asli untuk menerapkan aplikasi dan dompet kontrak pintar ke alamat yang sama persis di berbagai rantai
- Memungkinkan pengguna untuk memiliki alamat dompet pintar yang sama di beberapa jaringan layer 2 (L2), mengurangi beban kognitif, mengurangi kebingungan, dan mengurangi risiko kehilangan dana yang tidak disengaja
- Menggantikan solusi sementara yang saat ini digunakan pengembang untuk mencapai paritas ini, membuatnya lebih mudah dan lebih aman untuk membangun dompet dan aplikasi multi-rantai

Jika pengguna memiliki dompet kontrak pintar saat ini dengan akun di beberapa rantai yang kompatibel dengan Mesin Virtual Ethereum (EVM), mereka sering kali berakhir dengan alamat yang sama sekali berbeda di jaringan yang berbeda. Ini tidak hanya membingungkan, tetapi dapat menyebabkan hilangnya dana secara tidak disengaja.

**Deterministic Factory Predeploy (atau EIP-7997)** memberi pengembang cara bawaan asli untuk menerapkan aplikasi terdesentralisasi dan dompet kontrak pintar mereka ke alamat yang sama persis di beberapa rantai EVM, termasuk mainnet Ethereum, jaringan layer 2 (L2), dan banyak lagi. Jika diadopsi, ini akan memungkinkan pengguna untuk memiliki alamat yang sama persis di setiap rantai yang berpartisipasi, secara signifikan mengurangi beban kognitif dan potensi kesalahan pengguna.

Deterministic Factory Predeploy bekerja dengan menempatkan program pabrik khusus yang minimal secara permanen di lokasi yang identik (khususnya, alamat 0x12) di setiap rantai yang kompatibel dengan EVM yang berpartisipasi. Tujuannya adalah untuk menyediakan kontrak pabrik standar universal yang dapat diadopsi oleh jaringan apa pun yang kompatibel dengan EVM; selama rantai EVM berpartisipasi dan mengadopsi standar ini, pengembang akan dapat menggunakannya untuk menerapkan kontrak pintar mereka ke alamat yang sama persis di jaringan tersebut.

Standardisasi ini menyederhanakan pembuatan dan pengelolaan aplikasi lintas rantai untuk pengembang dan ekosistem yang lebih luas. Pengembang tidak perlu lagi membangun kode khusus rantai untuk menautkan perangkat lunak mereka bersama-sama di berbagai jaringan, melainkan menggunakan pabrik universal ini untuk menghasilkan alamat yang sama persis untuk aplikasi mereka di mana saja. Selain itu, penjelajah blok, layanan pelacakan, dan dompet dapat dengan lebih mudah mengidentifikasi dan menautkan aplikasi dan akun ini di berbagai rantai, menciptakan lingkungan multi-rantai yang lebih terpadu dan mulus untuk semua peserta berbasis Ethereum.

**Sumber daya**: [Spesifikasi teknis EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Transfer dan pembakaran ETH memancarkan log {#eth-transfers-and-burns-emit-a-log}

- Secara otomatis menghasilkan catatan permanen (log) setiap kali ETH ditransfer atau dibakar
- Memperbaiki titik buta historis yang memungkinkan aplikasi, bursa, dan jembatan untuk mendeteksi deposit pengguna secara andal tanpa alat pelacakan ad-hoc

Tidak seperti token (ERC-20), transfer ETH reguler antara kontrak pintar tidak memancarkan tanda terima yang jelas (log standar), membuatnya sulit dilacak oleh bursa dan aplikasi.

Transfer dan pembakaran ETH memancarkan log (atau EIP-7708) mewajibkan jaringan untuk memancarkan peristiwa log standar setiap kali jumlah ETH yang bukan nol dipindahkan atau dibakar.

Ini akan membuatnya jauh lebih mudah dan lebih andal bagi dompet, bursa, dan operator jembatan untuk melacak deposit dan pergerakan secara akurat tanpa perkakas khusus.

**Sumber daya**: [Spesifikasi teknis EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 partial block receipt lists {#eth-70-partial-block-receipt-lists}

Saat kita meningkatkan jumlah pekerjaan yang dapat dilakukan Ethereum, daftar tanda terima untuk tindakan tersebut (catatan data dari transaksi ini) menjadi sangat besar sehingga berpotensi menyebabkan node jaringan gagal saat mencoba menyinkronkan data satu sama lain.

eth/70 partial block receipt lists (atau EIP-7975) memperkenalkan cara baru bagi node untuk berbicara satu sama lain (eth/70) yang memungkinkan daftar besar ini dipecah menjadi bagian-bagian yang lebih kecil dan lebih mudah dikelola. eth/70 memperkenalkan sistem paginasi untuk protokol komunikasi jaringan yang memungkinkan node untuk memecah daftar tanda terima blok dan dengan aman meminta data dalam potongan yang lebih kecil dan lebih mudah dikelola.

Perubahan ini akan mencegah kegagalan sinkronisasi jaringan selama periode aktivitas padat. Pada akhirnya, ini membuka jalan bagi Ethereum untuk meningkatkan kapasitas bloknya, dan memproses lebih banyak transaksi per blok di masa mendatang, tanpa membebani perangkat keras fisik yang menyinkronkan rantai.

**Sumber daya**: [Spesifikasi teknis EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773)
- [Pengumuman blog Pembaruan Prioritas Protokol untuk 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum Pasca-kuantum, Glamsterdam akan datang](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## FAQ {#faq}

### Bagaimana ETH dapat dikonversi setelah hard fork Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Tidak Ada Tindakan yang Diperlukan untuk ETH Anda**: Tidak perlu mengonversi atau meningkatkan ETH Anda setelah peningkatan Glamsterdam. Saldo akun Anda akan tetap sama, dan ETH yang Anda pegang saat ini akan tetap dapat diakses dalam bentuknya yang ada setelah hard fork.
- **Waspadalah terhadap penipuan!** <Emoji text="⚠️" /> **siapa pun yang menginstruksikan Anda untuk "meningkatkan" ETH Anda sedang mencoba menipu Anda.** Tidak ada yang perlu Anda lakukan sehubungan dengan peningkatan ini. Aset Anda akan tetap sama sekali tidak terpengaruh. Ingat, tetap mendapat informasi adalah pertahanan terbaik terhadap penipuan.

[Lebih lanjut tentang mengenali dan menghindari penipuan](/security/)

### Apakah peningkatan Glamsterdam memengaruhi semua node dan validator Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Ya, peningkatan Glamsterdam memerlukan pembaruan pada [klien eksekusi dan klien konsensus](/developers/docs/nodes-and-clients/). Karena peningkatan ini memperkenalkan Enshrined Proposer-Builder Separation (ePBS), operator node perlu memastikan klien mereka diperbarui untuk menangani cara baru blok dibangun, divalidasi, dan disahkan oleh jaringan.

Semua klien Ethereum utama akan merilis versi yang mendukung hard fork yang ditandai sebagai prioritas tinggi. Anda dapat mengikuti kapan rilis ini akan tersedia di repositori GitHub klien, [saluran Discord](https://ethstaker.org/support) mereka, [Discord EthStaker](https://dsc.gg/ethstaker), atau dengan berlangganan blog Ethereum untuk pembaruan protokol.

Untuk mempertahankan sinkronisasi dengan jaringan Ethereum pasca-peningkatan, operator node harus memastikan mereka menjalankan versi klien yang didukung. Perhatikan bahwa informasi tentang rilis klien sensitif terhadap waktu, dan pengguna harus merujuk ke pembaruan terbaru untuk detail paling terkini.

### Sebagai staker, apa yang perlu saya lakukan untuk peningkatan Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Seperti halnya setiap peningkatan jaringan, pastikan untuk memperbarui klien Anda ke versi terbaru yang ditandai dengan dukungan Glamsterdam. Ikuti pembaruan di milis dan [Pengumuman Protokol di Blog EF](https://blog.ethereum.org/category/protocol) untuk mendapatkan informasi tentang rilis.

Untuk memvalidasi penyiapan Anda sebelum Glamsterdam diaktifkan di mainnet, Anda dapat menjalankan validator di testnet. Fork testnet juga diumumkan di milis dan blog.

### Peningkatan apa yang akan disertakan Glamsterdam untuk peningkatan skala L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Fitur utamanya adalah ePBS (EIP-7732), yang memisahkan tugas berat memvalidasi transaksi jaringan dari tugas mencapai konsensus. Ini memperluas jendela propagasi data dari 2 detik menjadi sekitar 9 detik, membuka blokir kemampuan Ethereum untuk menangani throughput transaksi yang jauh lebih tinggi dengan aman dan mengakomodasi lebih banyak blob data untuk jaringan layer 2.

### Apakah Glamsterdam akan menurunkan biaya di Ethereum (layer 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Ya, Glamsterdam kemungkinan besar akan mengurangi biaya untuk pengguna sehari-hari! Kurangi gas transaksi intrinsik (atau EIP-2780) mengurangi biaya dasar untuk mengirim ETH, membuat ETH jauh lebih murah untuk digunakan untuk pembayaran sehari-hari.

Selain itu, untuk keberlanjutan jangka panjang, Glamsterdam memperkenalkan Block-Level Access Lists (BALs). Ini memungkinkan pemrosesan paralel dan mempersiapkan L1 untuk menangani batas gas keseluruhan yang lebih tinggi dengan aman di masa mendatang, yang kemungkinan akan mengurangi biaya gas per transaksi seiring dengan pertumbuhan kapasitas.

### Apakah akan ada perubahan pada kontrak pintar saya yang ada pasca-Glamsterdam? {#will-my-smart-contracts-change}

Kontrak yang ada akan terus berfungsi normal setelah Glamsterdam. Pengembang kemungkinan akan mendapatkan beberapa alat baru dan harus meninjau penggunaan gas mereka:

- Tingkatkan ukuran kontrak maksimum (atau EIP-7954) memungkinkan pengembang untuk menerapkan aplikasi yang lebih besar, menaikkan batas ukuran kontrak maksimum dari sekitar 24KiB menjadi 32KiB.
- Deterministic factory predeploy (atau EIP-7997) memperkenalkan kontrak pabrik bawaan yang universal. Ini memungkinkan pengembang untuk menerapkan aplikasi dan dompet kontrak pintar mereka ke alamat yang sama persis di semua rantai EVM yang berpartisipasi.
- Jika aplikasi Anda bergantung pada pelacakan kompleks untuk menemukan transfer ETH, transfer dan pembakaran ETH memancarkan log (atau EIP-7708) akan memungkinkan Anda untuk beralih menggunakan log untuk akuntansi yang lebih sederhana dan andal.
- Peningkatan biaya gas pembuatan status (atau EIP-8037) dan pembaruan biaya gas akses status (atau EIP-8038) memperkenalkan model keberlanjutan baru yang akan mengubah biaya penerapan kontrak tertentu, karena membuat akun baru atau penyimpanan permanen akan memiliki biaya yang menyesuaikan secara dinamis.

### Bagaimana Glamsterdam akan memengaruhi penyimpanan node dan persyaratan perangkat keras? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Beberapa EIP yang sedang dipertimbangkan untuk Glamsterdam mengatasi jurang kinerja dari pertumbuhan status:

- Peningkatan biaya gas pembuatan status (atau EIP-8037) memperkenalkan model penetapan harga dinamis untuk menargetkan tingkat pertumbuhan basis data status sebesar 100 GiB/tahun, memastikan perangkat keras fisik standar dapat terus menjalankan jaringan secara efisien.
- eth/70 partial block receipt lists (atau EIP-7975) memungkinkan node untuk meminta tanda terima blok yang dipaginasi, yang memecah daftar tanda terima blok yang padat data menjadi potongan-potongan yang lebih kecil untuk mencegah kerusakan dan sinkronisasi saat Ethereum ditingkatkan skalanya.