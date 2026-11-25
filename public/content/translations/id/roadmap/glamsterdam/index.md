---
title: Glamsterdam
description: "Glamsterdam adalah peningkatan Ethereum berikutnya setelah Fusaka. Pelajari bagaimana peningkatan ini berencana untuk menskalakan lapisan 1 dengan pemrosesan paralel, ePBS, dan penetapan harga state yang lebih adil."
lang: id
template: upgrade
---

<Alert variant="update">
<AlertContent>
<AlertDescription>
Peningkatan Glamsterdam hanyalah satu langkah dalam tujuan pengembangan jangka panjang Ethereum. Pelajari lebih lanjut tentang [peta jalan protokol](/roadmap/) dan [peningkatan sebelumnya](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

Peningkatan Glamsterdam [Ethereum](/) yang akan datang dirancang untuk membuka jalan bagi generasi penskalaan berikutnya. Glamsterdam dinamai dari kombinasi "Amsterdam" (peningkatan lapisan eksekusi, dinamai dari lokasi Devconnect sebelumnya) dan "Gloas" (peningkatan lapisan konsensus, dinamai dari sebuah bintang).

Mengikuti kemajuan yang dicapai dalam peningkatan [Fusaka](/roadmap/fusaka/), Glamsterdam berfokus pada penskalaan lapisan 1 (l1) dengan mengatur ulang bagaimana jaringan memproses transaksi dan mengelola basis datanya yang terus berkembang, secara fundamental memperbarui bagaimana Ethereum membuat dan memverifikasi blok.

Sementara Fusaka berfokus pada penyempurnaan mendasar, Glamsterdam memajukan tujuan "Skalakan L1" dan "Skalakan Blob" dengan mengabadikan pemisahan tugas di antara berbagai peserta jaringan, dan memperkenalkan cara yang lebih efisien untuk menangani data guna mempersiapkan [state](/glossary/#state) untuk paralelisasi laju pemrosesan tinggi.

Peningkatan ini memastikan Ethereum tetap cepat, terjangkau, dan terdesentralisasi saat menangani lebih banyak aktivitas, sambil menjaga persyaratan perangkat keras tetap dapat dikelola bagi orang-orang yang menjalankan [node](/glossary/#node) di rumah.

<VideoWatch slug="ethereum-evolution-glamsterdam" />

## Peningkatan di Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Catatan: Artikel ini menyoroti pilihan EIP yang dijadwalkan untuk disertakan dalam Glamsterdam. Proposal terjadwal tambahan yang sedang diuji di devnet meliputi EIP-7688, EIP-7778, EIP-7843, EIP-7976, EIP-7981, EIP-8024, eth/72 (EIP-8070), EIP-8136, snap/2 (EIP-8189), EIP-8246, dan EIP-8282. Cakupan telah dibekukan tetapi masih dapat berubah sebelum Mainnet, karena meta EIP masih dalam bentuk draf. Untuk pembaruan status terbaru, lihat [peningkatan Glamsterdam di Forkcast](https://forkcast.org/upgrade/glamsterdam).

Jika Anda ingin menambahkan EIP yang sedang dipertimbangkan untuk Glamsterdam, tetapi belum ditambahkan ke halaman ini, [pelajari cara berkontribusi ke ethereum.org di sini](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Peningkatan Glamsterdam berpusat pada tiga tujuan utama:

- Mempercepat pemrosesan (paralelisasi): Mengatur ulang bagaimana jaringan mencatat dependensi data, sehingga dapat memproses banyak transaksi secara aman pada saat yang sama alih-alih dalam urutan satu per satu yang lambat.
- Memperluas kapasitas: Membagi tugas berat dalam membuat dan memverifikasi blok, memberi jaringan lebih banyak waktu untuk menyebarkan jumlah data yang lebih besar tanpa melambat.
- Mencegah pembengkakan basis data (keberlanjutan): Menyesuaikan biaya jaringan untuk secara akurat mencerminkan biaya perangkat keras jangka panjang dari penyimpanan data baru, membuka blokir peningkatan batas gas di masa mendatang sambil mencegah penurunan kinerja perangkat keras.

Singkatnya, Glamsterdam akan memperkenalkan perubahan struktural untuk memastikan bahwa seiring dengan peningkatan kapasitas jaringan, jaringan tersebut tetap berkelanjutan dan kinerjanya tetap tinggi.

## Skalakan L1 & pemrosesan paralel {#scale-l1}

Penskalaan lapisan 1 (l1) yang bermakna memerlukan peralihan dari asumsi kepercayaan di luar protokol dan kendala eksekusi serial. Glamsterdam mengatasi hal ini dengan mengabadikan pemisahan tugas pembangunan blok tertentu dan memperkenalkan struktur data baru yang memungkinkan jaringan bersiap untuk pemrosesan paralel.

### Sorotan Utama: Pemisahan Pengusul-Pembangun yang Diabadikan (ePBS) {#epbs}

<EipTag upgrade="glamsterdam" id={7732} />

- Menghapus asumsi kepercayaan di luar protokol dan ketergantungan pada relai pihak ketiga
- Mendukung penskalaan lapisan 1 (l1) dengan memungkinkan muatan yang jauh lebih besar melalui jendela penyebaran yang diperpanjang
- Memperkenalkan pembayaran pembangun tanpa kepercayaan secara langsung ke dalam protokol 
- Mewajibkan pembaruan arsitektur untuk pool staking guna memungkinkan pemantauan tanpa kepercayaan, meskipun pengalaman pengguna staking secara keseluruhan ditingkatkan oleh proses pemilihan pembangun yang disempurnakan

Saat ini, proses pengusulan dan pembangunan blok mencakup serah terima antara pengusul blok dan pembangun blok. Hubungan antara pengusul dan pembangun bukanlah bagian dari protokol inti Ethereum, sehingga bergantung pada middleware pihak ketiga tepercaya, perangkat lunak (relai), dan kepercayaan di luar protokol antar entitas.

Hubungan di luar protokol antara pengusul dan pembangun juga menciptakan "jalur panas" selama validasi blok yang memaksa [validator](/glossary/#validator) untuk bergegas melalui penyiaran dan eksekusi transaksi dalam jendela 2 detik yang ketat, membatasi seberapa banyak data yang dapat ditangani jaringan.

**Pemisahan Pengusul-Pembangun yang Diabadikan (ePBS, atau EIP-7732)** secara formal memisahkan pekerjaan pengusul (yang memilih blok konsensus) dari pembangun (yang merakit muatan eksekusi), mengabadikan serah terima ini secara langsung ke dalam protokol. 

Membangun pertukaran muatan blok tanpa kepercayaan untuk pembayaran secara langsung ke dalam protokol menghilangkan kebutuhan akan middleware pihak ketiga (seperti MEV-Boost). Namun, pembangun dan pengusul mungkin masih memilih untuk menggunakan relai atau middleware di luar protokol untuk fitur kompleks yang belum menjadi bagian dari protokol inti. 

Untuk mengatasi hambatan "jalur panas", ePBS juga memperkenalkan Komite Ketepatan Waktu Muatan (PTC) dan logika tenggat waktu ganda, yang memungkinkan validator untuk membuktikan blok konsensus dan ketepatan waktu muatan eksekusi secara terpisah guna memaksimalkan laju pemrosesan.

<VideoWatch slug="proposer-builder-separation" />

Memisahkan peran pengusul dan pembangun pada tingkat protokol memperluas jendela penyebaran (atau waktu yang tersedia untuk menyebarkan data ke seluruh jaringan) dari 2 detik menjadi sekitar 9 detik.

Dengan mengganti middleware dan relai di luar protokol dengan mekanika di dalam protokol, ePBS mengurangi ketergantungan kepercayaan dan memungkinkan Ethereum untuk memproses jumlah data yang jauh lebih besar secara aman (seperti lebih banyak blob untuk [lapisan 2 (l2)](/glossary/#layer-2)) tanpa membebani jaringan.

**Sumber daya**: [Spesifikasi teknis EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Sorotan Utama: Daftar Akses Tingkat Blok (BAL) {#bals}

<EipTag upgrade="glamsterdam" id={7928} />

- Menghilangkan hambatan pemrosesan berurutan dengan menyediakan peta awal dari semua dependensi transaksi, menyiapkan panggung bagi validator untuk memproses banyak transaksi secara paralel alih-alih satu per satu
- Memungkinkan node untuk memperbarui catatan mereka dengan membaca hasil akhir tanpa perlu memutar ulang setiap transaksi (sinkronisasi tanpa eksekusi), membuatnya jauh lebih cepat untuk melakukan sinkronisasi node ke jaringan
- Menghilangkan tebakan, memungkinkan validator untuk memuat semua data yang diperlukan sekaligus alih-alih menemukannya selangkah demi selangkah, yang membuat validasi jauh lebih cepat

Ethereum saat ini seperti jalan satu jalur; karena jaringan tidak tahu data apa yang akan dibutuhkan atau diubah oleh suatu transaksi (seperti akun mana yang akan disentuh oleh transaksi) sampai transaksi dijalankan, validator harus memproses transaksi satu per satu dalam barisan berurutan yang ketat. Jika mereka mencoba memproses transaksi sekaligus, tanpa mengetahui dependensi ini, dua transaksi mungkin secara tidak sengaja mencoba mengubah data yang sama persis pada saat yang sama, sehingga menyebabkan kesalahan.

**Daftar Akses Tingkat Blok (BAL, atau EIP-7928)** berfungsi seperti peta untuk jaringan, merinci bagian mana dari basis data yang akan diakses sebelum pekerjaan dimulai. Lapisan eksekusi menyimpan Daftar Akses Blok secara penuh, termasuk setiap perubahan akun yang akan disentuh oleh transaksi, beserta hasil akhir dari perubahan tersebut (semua akses state dan nilai pasca-eksekusi). Untuk menjaga agar blok tetap ringan, header blok berisi bidang baru dengan sidik jari digital unik (catatan hash) dari daftar ini.

Karena memberikan visibilitas instan ke dalam transaksi mana yang tidak tumpang tindih, BAL memungkinkan node untuk melakukan pembacaan disk paralel, mengambil informasi untuk banyak transaksi secara bersamaan. Jaringan dapat dengan aman mengelompokkan transaksi yang tidak terkait dan memprosesnya secara paralel.

Karena BAL menyertakan hasil akhir transaksi (nilai pasca-eksekusi), ketika node jaringan perlu melakukan sinkronisasi ke state jaringan saat ini, mereka dapat menyalin hasil akhir tersebut untuk memperbarui catatan mereka. Validator tidak perlu lagi memutar ulang semua transaksi rumit dari awal untuk mengetahui apa yang terjadi, sehingga lebih cepat dan lebih mudah bagi node baru untuk bergabung dengan jaringan.

Pembacaan disk paralel yang dimungkinkan oleh BAL akan menjadi langkah signifikan menuju masa depan di mana Ethereum dapat memproses banyak transaksi sekaligus, yang secara signifikan meningkatkan kecepatan jaringan.

#### Pertukaran Daftar Akses Blok eth/71 {#bale}

<EipTag upgrade="glamsterdam" id={8159} />

Pertukaran Daftar Akses Blok (eth/71 atau EIP-8159) adalah pendamping jaringan langsung untuk daftar akses tingkat blok. Sementara BAL membuka kunci eksekusi paralel, eth/71 meningkatkan protokol peer-to-peer untuk memungkinkan node benar-benar membagikan daftar ini melalui jaringan. Sekarang diwajibkan untuk semua klien lapisan eksekusi, pertukaran daftar akses blok akan memungkinkan sinkronisasi yang lebih cepat dan memungkinkan node untuk melakukan pembaruan state tanpa eksekusi.

**Sumber daya**:

- [Spesifikasi teknis EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Spesifikasi teknis EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Keberlanjutan jaringan {#network-sustainability}

Seiring dengan pertumbuhan jaringan Ethereum yang semakin cepat, penting untuk memastikan bahwa biaya penggunaannya sesuai dengan keausan pada perangkat keras yang menjalankan Ethereum. Jaringan perlu meningkatkan batas kapasitas keseluruhannya agar dapat menskalakan dan memproses lebih banyak transaksi secara aman.

### Peningkatan biaya gas pembuatan state {#state-creation-gas-cost-increase}

<EipTag upgrade="glamsterdam" id={8037} />

- Memastikan bahwa biaya untuk membuat akun baru atau kontrak pintar secara akurat mencerminkan beban jangka panjang yang mereka berikan pada basis data Ethereum
- Menetapkan **biaya per bita state (CPSB)** tetap yang menargetkan tingkat pertumbuhan yang aman dan dapat diprediksi sebesar 120 GiB/tahun, memastikan perangkat keras fisik standar dapat terus menjalankan jaringan
- Memisahkan akuntansi untuk biaya spesifik ini ke reservoir baru, menghapus batas transaksi lama dan memungkinkan pengembang untuk menyebarkan aplikasi yang lebih besar dan lebih kompleks

Menambahkan akun, token, dan [kontrak pintar](/glossary/#smart-contract) baru menciptakan data permanen (dikenal sebagai "state") yang harus disimpan tanpa batas waktu oleh setiap komputer yang menjalankan jaringan. Biaya saat ini untuk menambahkan atau membaca data ini tidak konsisten dan belum tentu mencerminkan beban penyimpanan jangka panjang yang sebenarnya pada perangkat keras jaringan.

Beberapa tindakan yang menciptakan state di Ethereum, seperti membuat akun baru atau menyebarkan kontrak pintar yang besar, memiliki biaya yang relatif rendah dibandingkan dengan ruang penyimpanan permanen yang mereka gunakan pada node jaringan, misalnya, penyebaran kontrak secara signifikan lebih murah per bita daripada membuat slot penyimpanan.

Tanpa penyesuaian, pertumbuhan state Ethereum akan menjadi tidak berkelanjutan seiring dengan penskalaan jaringan menuju batas dasar batas gas 200 juta yang dimungkinkan oleh Glamsterdam (dengan pengembang saat ini menguji pada batas gas blok referensi 150 juta untuk memperoleh penetapan harga state yang akurat).

**Peningkatan biaya gas pembuatan state (atau EIP-8037)** menyelaraskan biaya dengan mengaitkannya pada ukuran sebenarnya dari data yang dibuat, memperbarui biaya sehingga proporsional dengan jumlah data permanen yang dibuat atau diakses oleh suatu operasi.

EIP-8037 juga memperkenalkan model reservoir untuk mengelola biaya ini agar lebih dapat diprediksi; biaya gas state ditarik dari `state_gas_reservoir` terlebih dahulu, dan opcode `GAS` hanya mengembalikan `gas_left`, mencegah bingkai eksekusi salah menghitung gas yang tersedia. Untuk mendukung hal ini, tugas latar belakang yang penting diberikan jatah bahan bakar ekstra yang langsung masuk ke cadangan khusus ini, memastikan operasi jaringan yang kritis tidak akan gagal hanya karena menyimpan data permanen memerlukan lebih banyak sumber daya.

Sebelum EIP-8037, baik pekerjaan komputasi (pemrosesan aktif) maupun penyimpanan data permanen (menyimpan kontrak pintar ke basis data jaringan) berbagi batas gas yang sama. Model reservoir membagi akuntansi: batas gas untuk pekerjaan komputasi transaksi yang sebenarnya (pemrosesan) dan untuk penyimpanan data jangka panjang (gas state). Memisahkan keduanya membantu mencegah ukuran data aplikasi yang sangat besar membatasi batas gas; selama pengembang menyediakan dana yang cukup untuk mengisi reservoir untuk penyimpanan data, mereka dapat menyebarkan kontrak pintar yang jauh lebih besar dan lebih kompleks.

Menetapkan harga penyimpanan data secara lebih akurat dan dapat diprediksi akan membantu Ethereum meningkatkan kecepatan dan kapasitasnya secara aman tanpa membengkakkan basis data. Keberlanjutan ini akan memungkinkan operator node untuk terus menggunakan perangkat keras yang (relatif) terjangkau selama bertahun-tahun yang akan datang, menjaga staking di rumah tetap dapat diakses untuk mempertahankan desentralisasi jaringan.

**Sumber daya**: [Spesifikasi teknis EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Pembaruan biaya gas akses state {#state-access-gas-cost-update}

<EipTag upgrade="glamsterdam" id={8038} />

- Meningkatkan biaya gas ketika aplikasi membaca atau memperbarui informasi yang disimpan secara permanen di Ethereum (opcode akses state) agar secara akurat sesuai dengan pekerjaan komputasi yang diperlukan oleh perintah ini
- Memperkuat ketahanan jaringan dengan mencegah serangan penolakan layanan (denial-of-service) yang mengeksploitasi operasi pembacaan data yang secara artifisial murah

Seiring dengan pertumbuhan state Ethereum, tindakan mencari dan membaca data lama ("akses state") menjadi lebih berat dan lebih lambat untuk diproses oleh node. Biaya untuk tindakan ini tetap sama meskipun sekarang sedikit lebih mahal untuk mencari informasi (dalam hal daya komputasi).

Akibatnya, beberapa perintah spesifik saat ini dihargai terlalu rendah relatif terhadap pekerjaan yang mereka paksakan untuk dilakukan oleh node. `EXTCODESIZE` dan `EXTCODECOPY` dihargai terlalu rendah, misalnya, karena mereka memerlukan dua pembacaan basis data terpisah—satu untuk objek akun, dan yang kedua untuk ukuran kode atau kode bita yang sebenarnya.

**Pembaruan biaya gas akses state (atau EIP-8038)** meningkatkan konstanta gas untuk opcode akses state, seperti mencari data akun dan kontrak, agar selaras dengan kinerja perangkat keras modern dan ukuran state.

Menyelaraskan biaya akses state juga membantu membuat Ethereum lebih tangguh. Karena tindakan pembacaan data yang berat ini secara artifisial murah, penyerang yang berniat jahat dapat mengirim spam ke jaringan dengan ribuan permintaan data yang kompleks dalam satu blok sebelum mencapai batas biaya jaringan, yang berpotensi menyebabkan jaringan terhenti atau mogok (serangan penolakan layanan). Bahkan tanpa niat jahat, pengembang tidak didorong secara ekonomi untuk membangun aplikasi yang efisien jika membaca data jaringan terlalu murah.

Dengan menetapkan harga tindakan akses state secara lebih akurat, Ethereum dapat menjadi lebih tangguh terhadap perlambatan yang tidak disengaja atau disengaja, sementara menyelaraskan biaya jaringan dengan beban perangkat keras membuktikan fondasi yang lebih berkelanjutan untuk peningkatan batas gas di masa mendatang.

**Sumber daya**: [Spesifikasi teknis EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Ketahanan jaringan {#network-resilience}

Penyempurnaan pada tugas validator dan proses keluar memastikan stabilitas jaringan selama kejadian pemotongan massal dan mempercepat seberapa cepat staker dapat memindahkan stake mereka. Peningkatan ini membuat jaringan lebih stabil dan memastikan bahwa semua peserta, besar dan kecil, diperlakukan secara adil.

### Kecualikan validator yang dipotong dari pengusulan {#exclude-slashed-validators}

<EipTag upgrade="glamsterdam" id={8045} />

- Menghentikan validator yang dihukum (dipotong) agar tidak dipilih untuk mengusulkan blok di masa mendatang, menghilangkan jaminan slot yang terlewat
- Menjaga Ethereum berjalan lancar dan dapat diandalkan, mencegah kemacetan parah jika terjadi kejadian pemotongan massal

Saat ini, bahkan jika validator dipotong (dihukum karena melanggar aturan atau tidak beroperasi seperti yang diharapkan), sistem mungkin masih memilih mereka untuk memimpin blok dalam waktu dekat ketika sistem menghasilkan pandangan ke depan pengusul di masa mendatang.

Karena blok dari pengusul yang dipotong secara otomatis ditolak sebagai tidak valid, hal ini menyebabkan jaringan melewatkan slot dan menunda pemulihan jaringan selama kejadian pemotongan massal.

**Kecualikan validator yang dipotong dari pengusulan (atau EIP-8045)** secara sederhana menyaring validator yang dipotong agar tidak dipilih untuk tugas di masa mendatang. Hal ini meningkatkan ketahanan rantai dengan memastikan hanya validator yang sehat yang dipilih untuk mengusulkan blok, mempertahankan kualitas layanan selama gangguan jaringan.

**Sumber daya**: [Spesifikasi teknis EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Tingkatkan churn keluar dan konsolidasi {#increase-exit-and-consolidation-churn}

<EipTag upgrade="glamsterdam" id={8061} />

- Secara signifikan mengurangi waktu penarikan staking dengan membiarkan kapasitas keluar berskala dengan jumlah total ETH yang di-stake, alih-alih dibatasi pada tingkat tetap
- Memberikan konsolidasi validator kapasitas antrean khusus mereka sendiri, mempercepat transisi ke validator yang lebih besar dan lebih efisien
- Mempertahankan keamanan jaringan melalui parameter keamanan yang dianalisis dengan cermat

Batas churn Ethereum adalah batas keamanan pada tingkat di mana validator dapat masuk, keluar, atau menggabungkan (mengkonsolidasikan) ETH yang mereka stake, untuk memastikan keamanan jaringan tidak pernah tidak stabil. Saat ini, keluar dan aktivasi berbagi satu batas yang dibatasi, sehingga selama periode permintaan tinggi, staker dapat menghadapi waktu tunggu yang lama untuk melakukan penarikan ETH mereka. Konsolidasi, di mana validator bergabung menjadi validator yang lebih besar dengan hingga 2.048 ETH (dimungkinkan oleh [peningkatan Pectra](/roadmap/pectra)), juga bersaing untuk kapasitas terbatas ini, yang berarti mengkonsolidasikan set validator penuh akan memakan waktu bertahun-tahun pada tingkat saat ini.

**Tingkatkan churn keluar dan konsolidasi (atau EIP-8061)** mengatur ulang batas-batas ini ke dalam jalur terpisah:

- Aktivasi validator mempertahankan batas yang dibatasi saat ini, tidak berubah
- Keluar tidak lagi dibatasi dan sebaliknya berskala dengan jumlah total ETH yang di-stake
- Konsolidasi mendapatkan kapasitas khusus mereka sendiri, kira-kira setengah dari ukuran batas aktivasi-keluar gabungan

Pada tingkat staking saat ini, hal ini meningkatkan kapasitas keluar sekitar 4x dan kapasitas konsolidasi sekitar 2x, yang berarti staker dapat melakukan penarikan ETH mereka jauh lebih cepat selama periode permintaan tinggi dan jaringan bertransisi lebih cepat ke set validator yang lebih kecil dan lebih efisien.

Karena stake dapat bergerak masuk dan keluar dari jaringan lebih cepat, perubahan ini secara kasar membagi dua waktu node dapat tetap offline sebelum memerlukan titik periksa tepercaya baru-baru ini untuk bergabung kembali dengan jaringan secara aman (periode subjektivitas lemah, dari sekitar 15,7 hari menjadi sekitar 7 hari). Pertukaran ini dianalisis dengan cermat untuk memastikan keamanan jaringan tetap terjaga.

**Sumber daya**: [Spesifikasi teknis EIP-8061](https://eips.ethereum.org/EIPS/eip-8061)

## Tingkatkan pengalaman pengguna & pengembang {#improve-user-developer-experience}

Peningkatan Glamsterdam Ethereum bertujuan untuk meningkatkan pengalaman pengguna, meningkatkan kemampuan penemuan data, dan menangani ukuran pesan yang meningkat untuk mencegah kegagalan sinkronisasi. Hal ini memudahkan untuk melacak apa yang terjadi onchain sambil mencegah gangguan teknis seiring dengan penskalaan jaringan.

### Kurangi biaya gas transaksi intrinsik {#reduce-intrinsic-transaction-gas-costs}

<EipTag upgrade="glamsterdam" id={2780} />

- Menurunkan biaya dasar untuk transaksi, mengurangi biaya keseluruhan dari pembayaran ETH asli yang sederhana
- Membuat transfer yang lebih kecil menjadi lebih terjangkau, meningkatkan kelayakan Ethereum sebagai alat tukar rutin

Semua transaksi Ethereum memiliki biaya gas dasar tetap saat ini, terlepas dari seberapa sederhana atau kompleksnya untuk diproses. **Kurangi gas transaksi intrinsik (atau EIP-2780)** mengusulkan pengurangan biaya dasar tersebut untuk membuat transfer ETH standar antara akun yang ada hingga **71% lebih murah**.

Kurangi gas transaksi intrinsik bekerja dengan merinci biaya transaksi untuk hanya mencerminkan pekerjaan dasar dan esensial yang benar-benar dilakukan oleh komputer yang menjalankan jaringan, seperti memverifikasi tanda tangan digital dan memperbarui saldo. Karena pembayaran ETH dasar tidak mengeksekusi kode kompleks atau membawa data ekstra, proposal ini akan mengurangi biayanya agar sesuai dengan jejaknya yang ringan.

Proposal ini memperkenalkan pengecualian untuk membuat akun baru guna menjaga agar biaya yang lebih rendah tidak membebani state jaringan. Jika transfer mengirimkan ETH ke alamat kosong yang tidak ada, jaringan harus membuat catatan baru permanen untuknya. Biaya tambahan gas ditambahkan untuk pembuatan akun tersebut guna membantu menutupi beban penyimpanan jangka panjangnya.

Secara bersama-sama, EIP-2780 bertujuan untuk membuat transfer sehari-hari antara akun yang ada menjadi lebih terjangkau sambil memastikan jaringan tetap terlindungi dari pembengkakan basis data dengan menetapkan harga pertumbuhan state yang sebenarnya secara akurat.

**Sumber daya**: [Spesifikasi teknis EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Prapenerapan Pabrik Deterministik {#deterministic-factory-predeploy}

<EipTag upgrade="glamsterdam" id={7997} />

- Memberi pengembang cara asli untuk menyebarkan aplikasi dan dompet kontrak pintar ke alamat yang sama persis di berbagai rantai
- Memungkinkan pengguna untuk memiliki alamat dompet pintar yang sama di beberapa jaringan lapisan 2 (l2), mengurangi beban kognitif, mengurangi kebingungan, dan mengurangi risiko kehilangan dana yang tidak disengaja
- Menggantikan solusi sementara yang saat ini digunakan pengembang untuk mencapai paritas ini, membuatnya lebih mudah dan lebih aman untuk membangun dompet dan aplikasi multi-rantai

Jika pengguna memiliki dompet kontrak pintar saat ini dengan akun di beberapa rantai yang kompatibel dengan Mesin Virtual Ethereum (EVM), mereka sering kali berakhir dengan alamat yang sama sekali berbeda di jaringan yang berbeda. Hal ini tidak hanya membingungkan, tetapi dapat menyebabkan kehilangan dana yang tidak disengaja.

**Prapenerapan Pabrik Deterministik (atau EIP-7997)** memberi pengembang cara bawaan asli untuk menyebarkan aplikasi terdesentralisasi dan dompet kontrak pintar mereka ke alamat yang sama persis di berbagai rantai EVM, termasuk Mainnet Ethereum, jaringan lapisan 2 (l2), dan banyak lagi. Jika diadopsi, hal ini akan memungkinkan pengguna untuk memiliki alamat yang sama persis di setiap rantai yang berpartisipasi, secara signifikan mengurangi beban kognitif dan potensi kesalahan pengguna.

Prapenerapan Pabrik Deterministik bekerja dengan menempatkan program pabrik khusus yang minimal secara permanen di lokasi yang identik (khususnya, alamat 0x12) di setiap rantai yang kompatibel dengan EVM yang berpartisipasi. Tujuannya adalah untuk menyediakan kontrak pabrik standar universal yang dapat diadopsi oleh jaringan apa pun yang kompatibel dengan EVM; selama rantai EVM berpartisipasi dan mengadopsi standar ini, pengembang akan dapat menggunakannya untuk menyebarkan kontrak pintar mereka ke alamat yang sama persis di jaringan tersebut.

Standardisasi ini menyederhanakan pembangunan dan pengelolaan aplikasi lintas rantai bagi pengembang dan ekosistem yang lebih luas. Pengembang tidak perlu lagi membangun kode khusus rantai kustom untuk menautkan perangkat lunak mereka bersama-sama di berbagai jaringan yang berbeda, melainkan menggunakan pabrik universal ini untuk menghasilkan alamat yang sama persis untuk aplikasi mereka di mana saja. Selain itu, penjelajah blok, layanan pelacakan, dan dompet dapat dengan lebih mudah mengidentifikasi dan menautkan aplikasi dan akun ini di berbagai rantai, menciptakan lingkungan multi-rantai yang lebih terpadu dan mulus untuk semua peserta berbasis Ethereum.

**Sumber daya**: [Spesifikasi teknis EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Transfer dan pembakaran ETH memancarkan log {#eth-transfers-and-burns-emit-a-log}

<EipTag upgrade="glamsterdam" id={7708} />

- Secara otomatis menghasilkan catatan permanen (Log) setiap kali ETH ditransfer atau dibakar
- Memperbaiki titik buta historis yang memungkinkan aplikasi, bursa, dan jembatan untuk mendeteksi setoran pengguna secara andal tanpa alat pelacakan ad-hoc

Tidak seperti token (ERC-20), transfer ETH reguler antara kontrak pintar tidak memancarkan tanda terima yang jelas (Log standar), membuatnya sulit dilacak oleh bursa dan aplikasi.

Transfer dan pembakaran ETH memancarkan log (atau EIP-7708) mewajibkan jaringan untuk memancarkan kejadian Log standar setiap kali jumlah ETH yang bukan nol dipindahkan atau dibakar.

Hal ini akan membuatnya jauh lebih mudah dan lebih andal bagi dompet, bursa, dan operator jembatan untuk melacak setoran dan pergerakan secara akurat tanpa perkakas kustom.

**Sumber daya**: [Spesifikasi teknis EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### Daftar tanda terima blok parsial eth/70 {#eth-70-partial-block-receipt-lists}

<EipTag upgrade="glamsterdam" id={7975} />

Seiring dengan peningkatan jumlah pekerjaan yang dapat dilakukan Ethereum, daftar tanda terima untuk tindakan tersebut (catatan data dari transaksi ini) menjadi sangat besar sehingga berpotensi menyebabkan node jaringan gagal saat mencoba melakukan sinkronisasi data satu sama lain.

Sekarang menjadi persyaratan untuk semua klien lapisan eksekusi, daftar tanda terima blok parsial eth/70 (atau EIP-7975) memperkenalkan cara baru bagi node untuk berbicara satu sama lain (eth/70) yang memungkinkan daftar besar ini dipecah menjadi bagian-bagian yang lebih kecil dan lebih mudah dikelola. eth/70 memperkenalkan sistem paginasi untuk protokol komunikasi jaringan yang memungkinkan node untuk memecah daftar tanda terima blok dan dengan aman meminta data dalam potongan yang lebih kecil dan lebih mudah dikelola.

Perubahan ini akan mencegah kegagalan sinkronisasi jaringan selama periode aktivitas padat. Pada akhirnya, hal ini membuka jalan bagi Ethereum untuk meningkatkan kapasitas bloknya, dan memproses lebih banyak transaksi per blok di masa mendatang, tanpa membebani perangkat keras fisik yang menyinkronkan rantai.

**Sumber daya**: [Spesifikasi teknis EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Meta EIP Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Pengumuman blog Pembaruan Prioritas Protokol untuk 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum pasca-kuantum, Glamsterdam akan datang](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## FAQ {#faq}

### Bagaimana ETH dapat dikonversi setelah percabangan keras Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Tidak Ada Tindakan yang Diperlukan untuk ETH Anda**: Tidak perlu mengonversi atau meningkatkan ETH Anda setelah peningkatan Glamsterdam. Saldo akun Anda akan tetap sama, dan ETH yang Anda pegang saat ini akan tetap dapat diakses dalam bentuknya yang ada setelah percabangan keras.
- **Waspadalah terhadap penipuan!** <Emoji text="⚠️" /> **siapa pun yang menginstruksikan Anda untuk "meningkatkan" ETH Anda sedang mencoba menipu Anda.** Tidak ada yang perlu Anda lakukan sehubungan dengan peningkatan ini. Aset Anda akan tetap sama sekali tidak terpengaruh. Ingat, tetap mendapat informasi adalah pertahanan terbaik terhadap penipuan.

[Lebih lanjut tentang mengenali dan menghindari penipuan](/security/)

### Apakah peningkatan Glamsterdam memengaruhi semua node dan validator Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Ya, peningkatan Glamsterdam memerlukan pembaruan pada [klien eksekusi dan klien konsensus](/developers/docs/nodes-and-clients/). Karena peningkatan ini memperkenalkan Pemisahan Pengusul-Pembangun yang Diabadikan (ePBS), operator node perlu memastikan klien mereka diperbarui untuk menangani cara baru blok dibangun, divalidasi, dan dibuktikan oleh jaringan.

Semua klien utama Ethereum akan merilis versi yang mendukung percabangan keras yang ditandai sebagai prioritas tinggi. Anda dapat mengikuti kapan rilis ini akan tersedia di repositori GitHub klien, [saluran Discord](https://ethstaker.org/support) mereka, [Discord EthStaker](https://dsc.gg/ethstaker), atau dengan berlangganan blog Ethereum untuk pembaruan protokol.

Untuk mempertahankan sinkronisasi dengan jaringan Ethereum pasca-peningkatan, operator node harus memastikan mereka menjalankan versi klien yang didukung. Perhatikan bahwa informasi tentang rilis klien sensitif terhadap waktu, dan pengguna harus merujuk pada pembaruan terbaru untuk detail paling mutakhir.

### Sebagai staker, apa yang perlu saya lakukan untuk peningkatan Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Seperti halnya setiap peningkatan jaringan, pastikan untuk memperbarui klien Anda ke versi terbaru yang ditandai dengan dukungan Glamsterdam. Ikuti pembaruan di milis dan [Pengumuman Protokol di Blog EF](https://blog.ethereum.org/category/protocol) untuk mendapatkan informasi tentang rilis.

Untuk memvalidasi penyiapan Anda sebelum Glamsterdam diaktifkan di Mainnet, Anda dapat menjalankan validator di testnet. Percabangan testnet juga diumumkan di milis dan blog.

### Peningkatan apa yang akan disertakan Glamsterdam untuk penskalaan L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Fitur utamanya adalah ePBS (EIP-7732), yang memisahkan tugas berat memvalidasi transaksi jaringan dari tugas mencapai konsensus. Hal ini memperluas jendela penyebaran data dari 2 detik menjadi sekitar 9 detik, membuka blokir kemampuan Ethereum untuk menangani laju pemrosesan transaksi yang jauh lebih tinggi secara aman dan mengakomodasi lebih banyak blob data untuk jaringan lapisan 2 (l2).

### Apakah Glamsterdam akan menurunkan biaya di Ethereum (lapisan 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Ya, Glamsterdam kemungkinan besar akan mengurangi biaya untuk pengguna sehari-hari! Kurangi gas transaksi intrinsik (atau EIP-2780) mengurangi biaya dasar untuk mengirim ETH, membuat ETH jauh lebih murah untuk digunakan pada pembayaran sehari-hari.

Selain itu, untuk keberlanjutan jangka panjang, Glamsterdam memperkenalkan Daftar Akses Tingkat Blok (BAL). Hal ini memungkinkan pemrosesan paralel dan mempersiapkan lapisan 1 (l1) untuk menangani batas gas keseluruhan yang lebih tinggi secara aman di masa mendatang, yang kemungkinan akan mengurangi biaya gas per transaksi seiring dengan pertumbuhan kapasitas.

### Apakah akan ada perubahan pada kontrak pintar saya yang ada pasca-Glamsterdam? {#will-my-smart-contracts-change}

Kontrak yang ada akan terus berfungsi normal setelah Glamsterdam. Pengembang kemungkinan akan mendapatkan beberapa alat baru dan harus meninjau penggunaan gas mereka:

- Tingkatkan ukuran kontrak maksimum (atau EIP-7954) memungkinkan pengembang untuk menyebarkan aplikasi yang lebih besar, menaikkan batas ukuran kontrak maksimum dari sekitar 24KiB menjadi 64KiB.
- Prapenerapan pabrik deterministik (atau EIP-7997) memperkenalkan kontrak pabrik bawaan yang universal. Hal ini memungkinkan pengembang untuk menyebarkan aplikasi dan dompet kontrak pintar mereka ke alamat yang sama persis di semua rantai EVM yang berpartisipasi.
- Jika aplikasi Anda mengandalkan pelacakan kompleks untuk menemukan transfer ETH, transfer dan pembakaran ETH memancarkan log (atau EIP-7708) akan memungkinkan Anda untuk beralih menggunakan Log untuk akuntansi yang lebih sederhana dan andal.
- Peningkatan biaya gas pembuatan state (atau EIP-8037) dan pembaruan biaya gas akses state (atau EIP-8038) memperkenalkan model keberlanjutan baru yang akan mengubah biaya penyebaran kontrak tertentu, karena membuat akun baru atau penyimpanan permanen akan memiliki biaya tetap standar baru berdasarkan ukuran data yang dibuat.

### Bagaimana Glamsterdam akan memengaruhi penyimpanan node dan persyaratan perangkat keras? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Beberapa EIP yang sedang dipertimbangkan untuk Glamsterdam mengatasi penurunan kinerja (cliff) dari pertumbuhan state:

- Peningkatan biaya gas pembuatan state (atau EIP-8037) memperkenalkan kerangka kerja biaya tetap (CPSB) untuk menargetkan tingkat pertumbuhan basis data state sebesar 120 GiB/tahun, memastikan perangkat keras fisik standar dapat terus menjalankan jaringan secara efisien.
- Daftar tanda terima blok parsial eth/70 (atau EIP-7975) memungkinkan node untuk meminta tanda terima blok yang dipaginasi, yang memecah daftar tanda terima blok yang padat data menjadi potongan-potongan yang lebih kecil untuk mencegah mogok dan sinkronisasi seiring dengan penskalaan Ethereum.
