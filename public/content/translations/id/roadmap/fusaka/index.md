---
title: Fulu-Osaka (Fusaka)
description: Pelajari pengunduhan protokol Fusaka
lang: id
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**Peningkatan Fusaka yang sangat dinantikan oleh Ethereum ditayangkan pada 3 Desember 2025**

Upgrade jaringan Fusaka mengikuti [Pectra](/roadmap/pectra/) dan menghadirkan lebih banyak fitur baru serta meningkatkan pengalaman bagi setiap pengguna dan pengembang Ethereum. Nama ini terdiri dari upgrade lapisan eksekusi Osaka dan versi lapisan konsensus yang dinamai menurut bintang Fulu. Kedua bagian Ethereum menerima peningkatan yang mendorong skala, keamanan, dan pengalaman pengguna Ethereum ke masa depan.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Peningkatan Fusaka hanyalah satu langkah dalam tujuan pengembangan jangka panjang Ethereum. Pelajari lebih lanjut [peta perjalanan protokol](/roadmap/) dan [peningkatan sebelumnya](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Peningkatan di Fusaka {#improvements-in-fusaka}

### Penskalaan blob {#scale-blobs}

#### PeerDAS {#peerdas}

Ini adalah _unggulan_ dari percabangan Fusaka, fitur utama yang ditambahkan dalam peningkatan ini. Lapisan ke-2 saat ini mengirim data mereka ke Ethereum dalam bentuk blob, tipe data sementara yang dibuat khusus untuk lapisan ke-2. Sebelum Fusaka, setiap simpul penuh wajib menyimpan setiap blob untuk menjamin keberadaan data. Seiring meningkatnya keluaran blob, kewajiban untuk mengunduh semua data tersebut menjadi sangat membebani sumber daya dan tidak lagi dapat dipertahankan.

Dengan [pengambilan sampel ketersediaan data](https://notes.ethereum.org/@fradamt/das-fork-choice), alih-alih harus menyimpan semua data blob, setiap simpul akan bertanggung jawab atas sebagian data blob. Blob didistribusikan secara acak merata ke seluruh simpul dalam jaringan, dengan setiap simpul penuh hanya menyimpan 1/8 dari total data. Dengan mekanisme ini, skalabilitas teoretis dapat meningkat hingga 8 kali lipat. Untuk memastikan ketersediaan data, setiap bagian dari data dapat direkonstruksi dari 50% data yang ada dengan metode yang menurunkan kemungkinan kesalahan atau kehilangan data hingga tingkat yang sangat kecil secara kriptografis (~satu dari 10<sup>20</sup> hingga satu dari 10<sup>24</sup>).

Hal ini menjaga agar kebutuhan perangkat keras dan bandwidth untuk simpul tetap wajar, sekaligus memungkinkan skalabilitas blob yang menghasilkan lebih banyak kapasitas dengan biaya lebih rendah untuk lapisan ke-2.

[Pelajari lebih lanjut tentang PeerDAS](/roadmap/fusaka/peerdas/)

**Sumber daya**:

- [Spesifikasi teknis EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion tentang PeerDAS: Penskalaan Ethereum Hari Ini | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Akademis: Dokumentasi PeerDAS Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Percabangan Hanya Parameter Blob {#blob-parameter-only-forks}

Skala Ethereum Lapisan ke-2 - seiring pertumbuhan jaringan, mereka perlu mengunggah lebih banyak data ke Ethereum. Ini berarti Ethereum akan perlu meningkatkan jumlah blob yang tersedia seiring berjalannya waktu. Meskipun PeerDAS memungkinkan penskalaan data blob, hal itu perlu dilakukan secara bertahap dan aman.

Karena Ethereum adalah kode yang berjalan di ribuan simpul independen yang harus sepakat pada aturan yang sama, kita tidak bisa begitu saja memperkenalkan perubahan seperti menambah jumlah blob dengan cara yang sama seperti memperbarui sebuah situs web. Setiap perubahan aturan harus berupa upgrade terkoordinasi, di mana setiap simpul, klien, dan perangkat lunak validator melakukan pembaruan sebelum blok yang telah ditentukan bersama.

Upgrade terkoordinasi ini umumnya mencakup banyak perubahan, memerlukan banyak pengujian, dan prosesnya memakan waktu. Untuk dapat beradaptasi lebih cepat dengan kebutuhan blob lapisan ke-2 yang terus berubah, percabangan hanya parameter blob memperkenalkan mekanisme untuk meningkatkan jumlah blob tanpa harus menunggu jadwal upgrade besar berikutnya.

Percabangan hanya parameter blob dapat diatur oleh klien, mirip dengan parameter konfigurasi lain seperti batas gas. Di antara upgrade besar Ethereum, klien dapat menyepakati untuk meningkatkan blob 'target' dan 'max', misalnya menjadi 9 dan 12, lalu operator simpul memperbarui perangkat lunak mereka untuk ikut serta dalam percabangan kecil tersebut. Percabangan hanya parameter blob ini dapat dikonfigurasikan kapan saja.

Saat blob pertama kali ditambahkan ke jaringan dalam peningkatan Dencun, targetnya adalah 3. Jumlah itu ditingkatkan menjadi 6 di Pectra dan, setelah Fusaka, jumlah itu sekarang dapat ditingkatkan pada tingkat yang berkelanjutan secara independen dari peningkatan jaringan utama ini.

![Bagan yang menunjukkan jumlah blob rata-rata per blok dan peningkatan target dengan peningkatan](./average-blob-count-per-block.webp)

Sumber grafik: [Blob Ethereum - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Sumber daya**: [Spesifikasi teknis EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Biaya dasar blob dibatasi oleh biaya eksekusi {#blob-base-fee-bounded-by-execution-costs}

Lapisan ke-2 membayar dua biaya saat mengirim data: biaya blob dan gas eksekusi yang dibutuhkan untuk memverifikasi blob tersebut. Jika gas eksekusi mendominasi, lelang biaya blob dapat turun hingga 1 wei dan berhenti berfungsi sebagai sinyal harga.

EIP-7918 menetapkan harga cadangan proporsional di bawah setiap blob. Ketika harga cadangan lebih tinggi daripada biaya dasar blob nominal, algoritme penyesuaian biaya memperlakukan blok tersebut seolah-olah melebihi target dan menghentikan penurunan biaya, sehingga biaya dapat meningkat secara normal. Hasilnya:

- pasar biaya blob selalu bereaksi terhadap kemacetan
- lapisan ke-2 membayar setidaknya sebagian besar dari komputasi yang mereka terapkan pada simpul
- lonjakan biaya dasar pada EL tidak lagi dapat mendukung biaya blob pada 1 wei

**Sumber daya**:

- [Spesifikasi teknis EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Penjelasan Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Penskalaan L1 {#scale-l1}

#### Kedaluwarsa riwayat dan tanda terima yang lebih sederhana {#history-expiry}

Pada bulan Juli 2025, klien eksekusi Ethereum [mulai mendukung kedaluwarsa riwayat parsial](https://blog.ethereum.org/2025/07/08/partial-history-exp). Ini menghapus riwayat yang lebih lama dari [Penggabungan](https://ethereum.org/roadmap/merge/) untuk mengurangi ruang disk yang dibutuhkan oleh operator simpul seiring dengan pertumbuhan Ethereum.

EIP ini berada di bagian yang terpisah dari "EIP Inti" karena percabangan ini sebenarnya tidak menerapkan perubahan apa pun - ini adalah pemberitahuan bahwa tim klien harus mendukung kedaluwarsa riwayat pada saat peningkatan Fusaka. Secara praktis, klien dapat menerapkan ini kapan saja, tetapi menambahkannya ke peningkatan secara konkret menempatkannya di daftar tugas mereka dan memungkinkan mereka untuk menguji perubahan Fusaka bersamaan dengan fitur ini.

**Sumber daya**: [Spesifikasi teknis EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Tetapkan batas atas untuk MODEXP {#set-upper-bounds-for-modexp}

Sampai saat ini, precompile MODEXP menerima angka dengan ukuran hampir tak terbatas. Hal ini membuatnya sulit untuk diuji, mudah disalahgunakan, dan berisiko bagi kestabilan klien. EIP-7823 menetapkan batas yang jelas: setiap angka input maksimal panjangnya 8192 bit (1024 byte). Apa pun yang lebih besar ditolak, gas transaksi dibakar, dan tidak ada perubahan status yang terjadi. Hal ini dengan sangat baik mencakup kebutuhan dunia nyata sekaligus menghilangkan kasus-kasus ekstrem yang sebelumnya mempersulit perencanaan batas gas dan tinjauan keamanan. Perubahan ini memberikan keamanan dan perlindungan DoS yang lebih baik tanpa memengaruhi pengalaman pengguna maupun pengembang.

**Sumber daya**: [Spesifikasi teknis EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Batas Gas Transaksi {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) menambahkan batas 16.777.216 (2^24) gas per transaksi. Ini adalah langkah penguatan DoS secara proaktif dengan membatasi biaya terburuk dari satu transaksi saat kita meningkatkan batas gas blok. Perubahan ini membuat validasi dan propagasi lebih mudah untuk dimodelkan, sehingga memungkinkan kita mengatasi skalabilitas dengan menaikkan batas gas.

Mengapa tepatnya 2^24 gas? Batas ini jauh lebih kecil dari batas gas saat ini, namun tetap cukup besar untuk deployment kontrak nyata dan precompile yang berat, serta penggunaan bilangan pangkat 2 memudahkan implementasi di seluruh klien. Ukuran maksimum transaksi yang baru ini mirip dengan ukuran rata-rata blok sebelum Pectra, sehingga menjadi batas yang wajar untuk operasi apa pun di Ethereum.

**Sumber daya**: [Spesifikasi teknis EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Peningkatan biaya gas `MODEXP` {#modexp-gas-cost-increase}

MODEXP adalah fungsi bawaan yang menghitung eksponensial modular, sejenis perhitungan bilangan besar yang digunakan dalam verifikasi tanda tangan RSA dan sistem bukti. Hal ini memungkinkan kontrak menjalankan perhitungan ini secara langsung tanpa harus mengimplementasikannya sendiri.

Devs dan tim klien mengidentifikasi MODEXP sebagai hambatan utama untuk meningkatkan batas gas blok karena harga gas saat ini sering meremehkan berapa banyak daya komputasi yang dibutuhkan masukan tertentu. Ini artinya satu transaksi yang menggunakan MODEXP dapat menghabiskan sebagian besar waktu yang dibutuhkan untuk memproses seluruh blok, sehingga memperlambat jaringan.

EIP ini mengubah harga agar sesuai dengan biaya komputasi nyata dengan:

- menaikkan biaya minimum dari 200 menjadi 500 gas dan menghapus diskon sepertiga dari EIP-2565 pada perhitungan biaya umum
- meningkatkan biaya lebih tajam ketika input eksponen sangat panjang. jika eksponen (angka “pangkat” yang Anda berikan sebagai argumen kedua) lebih panjang dari 32 byte / 256 bit, biaya gas naik jauh lebih cepat untuk setiap byte tambahan
- biaya juga bertambah untuk basis besar atau modulus ekstra. Dua angka lainnya (basis dan modulus) diasumsikan setidaknya 32 byte - jika salah satu lebih besar, biaya meningkat sebanding dengan ukurannya

Dengan penyesuaian biaya terhadap waktu pemrosesan aktual yang lebih baik, MODEXP tidak lagi menyebabkan suatu blok membutuhkan waktu terlalu lama untuk divalidasi. Perubahan ini merupakan salah satu dari beberapa perubahan yang bertujuan untuk memastikan peningkatan batas gas blok Ethereum menjadi aman di masa mendatang.

**Sumber daya**: [Spesifikasi teknis EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Batas Ukuran Blok Eksekusi RLP {#rlp-execution-block-size-limit}

Ini menciptakan batas atas seberapa besar sebuah blok diizinkan - ini adalah batasan pada apa yang _dikirim_ melalui jaringan dan terpisah dari batas gas, yang membatasi _pekerjaan_ di dalam sebuah blok. Batas ukuran blok adalah 10 MiB, dengan alokasi kecil (2 MiB) dicadangkan untuk data konsensus sehingga semuanya pas dan menyebar dengan bersih. Jika sebuah blok muncul lebih besar dari itu, klien akan menolaknya.
Ini diperlukan karena blok yang sangat besar membutuhkan waktu lebih lama untuk menyebar dan diverifikasi di seluruh jaringan dan dapat menimbulkan masalah konsensus atau disalahgunakan sebagai vektor DoS. Selain itu, gosip lapisan konsensus sudah tidak akan meneruskan blok di atas ~10 MiB, jadi menyelaraskan lapisan eksekusi dengan batas itu menghindari situasi aneh "dilihat oleh sebagian, dilepaskan oleh yang lain".

Intinya: ini adalah batas atas ukuran blok eksekusi yang dikodekan [RLP](/developers/docs/data-structures-and-encoding/rlp/). Total 10 MiB, dengan margin keamanan 2 MiB yang dicadangkan untuk pembingkaian blok suar. Secara praktis, klien mendefinisikan

`MAX_BLOCK_SIZE = 10.485.760` byte dan

`SAFETY_MARGIN = 2.097.152` byte,

dan menolak setiap blok eksekusi yang muatan RLP-nya melebihi

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Tujuannya adalah untuk membatasi waktu propagasi/validasi kasus terburuk dan menyelaraskan dengan perilaku gosip lapisan konsensus, mengurangi risiko reorg/DoS tanpa mengubah akuntansi gas.

**Sumber daya**: [Spesifikasi teknis EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Tetapkan batas gas default ke 60 juta {#set-default-gas-limit-to-60-million}

Sebelum menaikkan batas gas dari 30 juta menjadi 36 juta pada bulan Februari 2025 (dan selanjutnya menjadi 45 juta), nilai ini tidak berubah sejak Penggabungan (September 2022). EIP ini bertujuan menjadikan skalabilitas sebagai prioritas.

EIP-7935 mengoordinasikan tim klien EL untuk menaikkan batas gas default di atas 45 juta saat ini untuk Fusaka. Ini adalah EIP Informasional, tetapi secara eksplisit meminta klien untuk menguji batas yang lebih tinggi pada devnet, menyatu pada nilai yang aman, dan mengirimkan angka tersebut dalam rilis Fusaka mereka.

Perencanaan devnet menargetkan penekanan ~60 juta (blok penuh dengan beban sintetis) dan kenaikan berulang. Penelitian mengatakan patologi ukuran blok terburuk tidak boleh mengikat di bawah ~150 juta. Peluncuran harus dipasangkan dengan batasan gas transaksi (EIP-7825) sehingga tidak ada transaksi tunggal yang dapat mendominasi saat batas meningkat.

**Sumber daya**: [Spesifikasi teknis EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Tingkatkan UX {#improve-ux}

#### Lookahead pengusul deterministik {#deterministic-proposer-lookahead}

Dengan EIP-7917, Rantai Suar akan mengetahui pengusul blok yang akan datang untuk epoch berikutnya. Memiliki pandangan deterministik di mana validator akan mengusulkan blok di masa depan dapat mengaktifkan [prakonfirmasi](https://ethresear.ch/t/based-preconfirmations/17353) - komitmen dengan pengusul yang akan datang yang menjamin transaksi pengguna akan dimasukkan dalam blok mereka tanpa menunggu blok yang sebenarnya.

Fitur ini menguntungkan implementasi klien dan keamanan jaringan karena mencegah kasus-kasus tepi di mana validator dapat memanipulasi jadwal pengusul. Lookahead juga memungkinkan implementasi yang lebih kompleks.

**Sumber daya**: [Spesifikasi teknis EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Hitung opcode nol di depan (CLZ) {#count-leading-zeros-opcode}

Fitur ini menambahkan instruksi EVM kecil, **hitung nol di depan (CLZ)**. Hampir semua hal di EVM direpresentasikan sebagai nilai 256-bit—opcode baru ini mengembalikan berapa banyak bit nol yang ada di depan. Ini adalah fitur umum dalam banyak arsitektur set instruksi karena memungkinkan operasi aritmatika yang lebih efisien. Dalam praktiknya, proses ini meringkas pemindaian bit hand-roll saat ini menjadi satu langkah, sehingga mencari bit set pertama, memindai byte, atau menguraikan bitfield jadi lebih simpel dan murah. Opcode-nya rendah, berbiaya tetap, dan telah dipatok nilainya agar setara dengan penambahan dasar, yang memangkas bytecode dan menghemat bahan bakar untuk pekerjaan yang sama.

**Sumber daya**: [Spesifikasi teknis EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Precompile untuk Dukungan Kurva secp256r1 {#secp256r1-precompile}

Memperkenalkan pemeriksa tanda tangan secp256r1 (P-256) bergaya passkey bawaan pada alamat tetap `0x100` menggunakan format panggilan yang sama yang sudah diadopsi oleh banyak L2 dan memperbaiki kasus tepi, sehingga kontrak yang ditulis untuk lingkungan tersebut berfungsi di L1 tanpa perubahan.

Peningkatan UX! Bagi pengguna, ini membuka penandatanganan asli perangkat dan passkey. Dompet dapat memanfaatkan Apple Secure Enclave, Android Keystore, modul keamanan perangkat keras (HSM), dan FIDO2/WebAuthn secara langsung - tanpa frasa benih, orientasi yang lebih lancar, dan alur multifaktor yang terasa seperti aplikasi modern. Ini menghasilkan UX yang lebih baik, pemulihan yang lebih mudah, dan pola abstraksi akun yang cocok dengan apa yang sudah dilakukan miliaran perangkat.

Bagi pengembang, ini mengambil input 160-byte dan mengembalikan output 32-byte, sehingga memudahkan untuk mem-porting pustaka dan kontrak L2 yang ada. Di balik layar, ini mencakup pemeriksaan titik-di-tak-hingga dan perbandingan-modular untuk menghilangkan kasus tepi yang rumit tanpa merusak pemanggil yang valid.

**Sumber daya**:

- [Spesifikasi teknis EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Lebih lanjut tentang RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Perhatikan bahwa EIP-7951 menggantikan RIP-7212)_

### Meta {#meta}

#### Metode JSON-RPC `eth_config` {#eth-config}

Ini adalah panggilan JSON-RPC yang memungkinkan Anda menanyakan kepada simpul Anda pengaturan percabangan apa yang Anda jalankan. Ini mengembalikan tiga snapshot: `current`, `next`, & `last` sehingga validator dan perangkat pemantauan dapat memverifikasi bahwa klien telah siap untuk percabangan yang akan datang.

Secara praktis, ini untuk mengatasi kekurangan yang ditemukan ketika percabangan Pectra ditayangkan di jaringan percobaan Holesky pada awal 2025 dengan kesalahan konfigurasi kecil yang mengakibatkan keadaan non-finalisasi. Ini membantu tim pengujian dan pengembang memastikan bahwa percabangan besar akan berperilaku seperti yang diharapkan saat berpindah dari devnet ke jaringan percobaan, dan dari jaringan percobaan ke Jaringan Utama.

Snapshot mencakup: `chainId`, `forkId`, waktu aktivasi percabangan yang direncanakan, precompile mana yang aktif, alamat precompile, dependensi kontrak sistem, dan jadwal blob percabangan.

EIP ini berada di bagian yang terpisah dari "EIP Inti" karena percabangan ini sebenarnya tidak menerapkan perubahan apa pun - ini adalah pemberitahuan bahwa tim klien harus mengimplementasikan metode JSON-RPC ini pada saat peningkatan Fusaka.

**Sumber daya**: [Spesifikasi teknis EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## FAQ {#faq}

### Apakah peningkatan ini memengaruhi semua node dan validator Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Ya, pemutakhiran Fusaka memerlukan pembaruan pada [klien eksekusi dan klien konsensus](/developers/docs/nodes-and-clients/). Semua klien utama Ethereum akan merilis versi yang mendukung hard fork yang ditandai sebagai prioritas tinggi. Anda dapat mengetahui ketersediaan rilis ini di repo Github klien, [saluran Discord](https://ethstaker.org/support) mereka, [Discord EthStaker](https://dsc.gg/ethstaker), atau dengan berlangganan blog Ethereum untuk pembaruan protokol. Untuk menjaga sinkronisasi dengan jaringan Ethereum setelah upgrade, operator node harus memastikan bahwa mereka menjalankan versi client yang didukung. Perlu dicatat bahwa informasi mengenai rilis client bersifat sensitif terhadap waktu, sehingga pengguna harus merujuk pada pembaruan terbaru untuk mendapatkan detail yang paling terkini.

### Bagaimana cara menukarkan ETH setelah hard fork? {#how-can-eth-be-converted-after-the-hardfork}

- **Tidak Ada Tindakan yang Diperlukan untuk ETH Anda**: Setelah peningkatan Ethereum Fusaka, Anda tidak perlu mengonversi atau meningkatkan ETH Anda. Saldo akun Anda akan tetap sama, dan ETH yang Anda miliki saat ini akan tetap dapat diakses dalam bentuknya yang ada setelah hard fork.
- Waspada Penipuan! <Emoji text="⚠️" /> Siapa pun yang menyuruh Anda "meng-upgrade" ETH Anda sedang mencoba menipu Anda. Tidak ada tindakan yang perlu dilakukan terkait upgrade ini. Aset milik anda tidak akan terpengaruh sama sekali. Ingat, tetap terinformasi adalah pertahanan terbaik untuk melawan penipuan.

[Lebih lanjut tentang mengenali dan menghindari penipuan](/security/)

### Ada apa dengan zebra? <Emoji text="🦓" /> {#whats-with-the-zebras}

Zebra adalah "maskot" pilihan pengembang untuk Fusaka karena garis-garisnya mencerminkan pengambilan sampel ketersediaan data berbasis kolom dari PeerDAS, di mana simpul menyimpan subnet kolom tertentu dan mengambil sampel beberapa kolom lain dari setiap slot peer untuk memeriksa apakah data blob tersedia.

Penggabungan pada tahun 2022 [menggunakan panda](https://x.com/hwwonx/status/1431970802040127498) sebagai maskotnya untuk menandakan penyatuan lapisan eksekusi & konsensus. Sejak saat itu, maskot telah dipilih secara informal untuk setiap percabangan dan muncul sebagai seni ASCII di log klien pada saat peningkatan. Ini hanyalah cara yang menyenangkan untuk merayakannya.

### Peningkatan apa saja yang disertakan untuk Penskalaan L2? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) adalah fitur utama dari percabangan ini. Ini mengimplementasikan pengambilan sampel ketersediaan data (DAS) yang membuka lebih banyak skalabilitas untuk rollup, secara teoritis menskalakan ruang blob hingga 8 kali ukuran saat ini. Pasar biaya blob juga akan ditingkatkan untuk bereaksi secara efisien terhadap kemacetan dan menjamin L2 membayar biaya yang berarti untuk komputasi dan ruang yang dibebankan blob pada simpul.

### Apa bedanya percabangan BPO? {#how-are-bpo-forks-different}

Percabangan Parameter Khusus Blob menyediakan mekanisme untuk terus meningkatkan jumlah blob (baik target maupun maks) setelah PeerDAS diaktifkan, tanpa harus menunggu peningkatan terkoordinasi penuh. Setiap peningkatan di-hardcode untuk dikonfigurasi sebelumnya dalam rilis klien yang mendukung Fusaka.

Sebagai pengguna atau validator, Anda tidak perlu memperbarui klien Anda untuk setiap BPO dan hanya perlu memastikan untuk mengikuti hardfork besar seperti Fusaka. Ini adalah praktik yang sama seperti sebelumnya, tidak ada tindakan khusus yang diperlukan. Masih disarankan untuk memantau klien Anda seputar peningkatan dan BPO dan tetap memperbaruinya bahkan di antara rilis besar karena perbaikan atau optimisasi mungkin mengikuti hardfork.

### Apa jadwal BPO? {#what-is-the-bpo-schedule}

Jadwal pasti pembaruan BPO akan ditentukan dengan rilis Fusaka. Ikuti [pengumuman Protokol](https://blog.ethereum.org/category/protocol) dan catatan rilis klien Anda.

Contoh tampilannya:

- Sebelum Fusaka: target 6, maks 9
- Saat aktivasi Fusaka: target 6, maks 9
- BPO1, beberapa minggu setelah aktivasi Fusaka: target 10, maks 15, meningkat dua pertiga
- BPO2, beberapa minggu setelah BPO1: target 14, maks 21

### Akankah ini menurunkan biaya di Ethereum (lapisan 1) {#will-this-lower-gas}

Peningkatan ini tidak menurunkan biaya gas di L1, setidaknya tidak secara langsung. Fokus utamanya adalah lebih banyak ruang blob untuk data rollup, sehingga menurunkan biaya di lapisan 2. Ini mungkin memiliki beberapa efek samping pada pasar biaya L1 tetapi tidak ada perubahan signifikan yang diharapkan.

### Sebagai staker, apa yang perlu saya lakukan untuk peningkatan ini? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Seperti setiap peningkatan jaringan, pastikan untuk memperbarui klien Anda ke versi terbaru yang ditandai dengan dukungan Fusaka. Ikuti pembaruan di milis dan [Pengumuman Protokol di Blog EF](https://blog.ethereum.org/category/protocol) untuk mendapatkan informasi tentang rilis.
Untuk memvalidasi penyiapan Anda sebelum Fusaka diaktifkan di Jaringan Utama, Anda dapat menjalankan validator di jaringan percobaan. Fusaka [diaktifkan lebih awal di jaringan percobaan](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement) yang memberi Anda lebih banyak ruang untuk memastikan semuanya berfungsi dan melaporkan bug. Percabangan jaringan percobaan juga diumumkan di milis dan blog.

### Apakah "Deterministic Proposer Lookahead" (EIP-7917) memengaruhi validator? {#does-7917-affect-validators}

Perubahan ini tidak mengubah cara kerja klien validator Anda, namun, ini akan memberikan lebih banyak wawasan tentang tugas validator Anda di masa depan. Pastikan untuk memperbarui perangkat pemantauan Anda untuk mengikuti fitur-fitur baru.

### Bagaimana Fusaka memengaruhi persyaratan bandwidth untuk simpul dan validator? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS membuat perubahan signifikan dalam cara simpul mentransmisikan data blob. Semua data dibagi menjadi beberapa bagian yang disebut kolom di 128 subnet dengan simpul yang hanya berlangganan beberapa di antaranya. Jumlah kolom subnet yang harus disimpan oleh simpul tergantung pada konfigurasi mereka dan jumlah validator yang terhubung. Persyaratan bandwidth yang sebenarnya akan bergantung pada jumlah blob yang diizinkan di jaringan dan jenis simpul. Pada saat aktivasi Fusaka, target blob tetap sama seperti sebelumnya, tetapi dengan PeerDAS, operator simpul dapat melihat penurunan penggunaan disk blob dan lalu lintas jaringan mereka. Seiring BPO mengonfigurasi jumlah blob yang lebih tinggi di jaringan, bandwidth yang diperlukan akan meningkat dengan setiap BPO.

Persyaratan simpul masih dalam [margin yang direkomendasikan](https://eips.ethereum.org/EIPS/eip-7870) bahkan setelah BPO Fusaka.

#### Simpul penuh {#full-nodes}

Simpul reguler tanpa validator akan berlangganan hanya 4 subnet, menyediakan penyimpanan untuk 1/8 dari data asli. Ini berarti bahwa dengan jumlah data blob yang sama, bandwidth simpul untuk mengunduhnya akan lebih kecil dengan faktor delapan (8). Penggunaan disk dan bandwidth unduhan blob untuk simpul penuh normal mungkin berkurang sekitar 80%, menjadi hanya beberapa Mb.

#### Penaruh solo {#solo-stakers}

Jika simpul digunakan untuk klien validator, ia harus menyimpan lebih banyak kolom dan oleh karena itu memproses lebih banyak data. Dengan penambahan validator, simpul berlangganan setidaknya 8 subnet kolom dan oleh karena itu memproses data dua kali lebih banyak daripada simpul biasa tetapi masih lebih sedikit daripada sebelum Fusaka. Jika saldo validator di atas 287 ETH, semakin banyak subnet yang akan dilanggani.

Untuk staker solo, ini berarti penggunaan disk dan bandwidth unduhan mereka akan berkurang sekitar 50%. Namun untuk membangun blok secara lokal dan mengunggah semua blob ke jaringan, diperlukan lebih banyak bandwidth unggahan. Pembangun lokal akan membutuhkan bandwidth unggah 2-3 kali lebih tinggi dari sebelumnya pada saat Fusaka dan dengan target BPO2 15/21 blob, bandwidth unggah akhir yang diperlukan harus sekitar 5 kali lebih tinggi, yaitu 100Mpbs.

#### Validator besar {#large-validators}

Jumlah subnet yang dilanggani bertambah dengan lebih banyak saldo dan validator yang ditambahkan ke simpul. Misalnya, dengan saldo sekitar 800 ETH, simpul menyimpan 25 kolom dan akan membutuhkan sekitar 30% lebih banyak bandwidth unduhan daripada sebelumnya. Unggahan yang diperlukan meningkat mirip dengan simpul biasa dan setidaknya 100Mbps diperlukan.

Pada 4096 ETH, 2 validator saldo maks, simpul menjadi 'supernode' yang menyimpan semua kolom, oleh karena itu mengunduh dan menyimpan semuanya. Simpul-simpul ini secara aktif memulihkan jaringan dengan menyumbangkan kembali data yang hilang tetapi juga membutuhkan lebih banyak bandwidth dan penyimpanan. Dengan target blob akhir 6 kali lebih tinggi dari sebelumnya, super node harus menyimpan sekitar 600GB data blob tambahan dan memiliki bandwidth unduhan berkelanjutan yang lebih cepat sekitar 20Mbps.

[Baca detail lebih lanjut tentang persyaratan yang diharapkan.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Perubahan EVM apa yang diimplementasikan? {#what-evm-changes-are-implemented}

Fusaka memperkuat EVM dengan perubahan dan fitur minor baru.

- Untuk keamanan saat penskalaan, ukuran maksimum satu transaksi akan [dibatasi hingga 16,7 juta](https://eips.ethereum.org/EIPS/eip-7825) unit gas.
- [Opcode baru hitung nol di depan (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) ditambahkan ke EVM dan akan memungkinkan bahasa kontrak pintar untuk melakukan operasi tertentu dengan lebih efisien.
- [Biaya precompile `ModExp` akan ditingkatkan](https://eips.ethereum.org/EIPS/eip-7883)—kontrak yang menggunakannya akan membebankan lebih banyak gas untuk eksekusi.

### Bagaimana batas gas 16M yang baru memengaruhi pengembang kontrak? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka memperkenalkan batasan [ukuran maksimum satu transaksi hingga 16,7 juta](https://eips.ethereum.org/EIPS/eip-7825) (2^24) unit gas. Ini kira-kira seukuran blok rata-rata sebelumnya yang membuatnya cukup besar untuk menampung transaksi kompleks yang akan menghabiskan seluruh blok. Batas ini menciptakan perlindungan bagi klien, mencegah potensi serangan DoS di masa depan dengan batas gas blok yang lebih tinggi. Tujuan penskalaan adalah untuk memungkinkan lebih banyak transaksi masuk ke blockchain tanpa satu pun yang menghabiskan seluruh blok.

Transaksi pengguna biasa masih jauh dari mencapai batas ini. Kasus tepi tertentu seperti operasi DeFi yang besar dan kompleks, penerapan kontrak pintar yang besar, atau transaksi batch yang menargetkan beberapa kontrak mungkin terpengaruh oleh perubahan ini. Transaksi ini harus dibagi menjadi transaksi yang lebih kecil atau dioptimalkan dengan cara lain. Gunakan simulasi sebelum mengirimkan transaksi yang berpotensi mencapai batas.

Metode RPC `eth_call` tidak dibatasi dan akan memungkinkan simulasi transaksi yang lebih besar dari batas blockchain yang sebenarnya. Batas aktual untuk metode RPC dapat dikonfigurasi oleh operator klien untuk memastikan pencegahan penyalahgunaan.

### Apa arti CLZ bagi pengembang? {#what-clz-means-for-developers}

Kompilator EVM seperti Solidity akan mengimplementasikan dan memanfaatkan fungsi baru untuk menghitung nol di balik layar. Kontrak baru mungkin mendapat manfaat dari penghematan gas jika mengandalkan operasi semacam ini. Ikuti rilis dan pengumuman fitur dari bahasa kontrak pintar untuk dokumentasi tentang potensi penghematan.

### Apakah ada perubahan untuk kontrak pintar saya yang sudah ada? {#what-clz-means-for-developers}

Fusaka tidak memiliki dampak langsung yang akan merusak kontrak yang ada atau mengubah perilakunya. Perubahan yang diperkenalkan ke lapisan eksekusi dibuat dengan kompatibilitas mundur, namun, selalu waspadai kasus tepi dan dampak potensial.

[Dengan meningkatnya biaya precompile `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), kontrak yang bergantung padanya akan mengonsumsi lebih banyak gas untuk eksekusi. Jika kontrak Anda sangat bergantung pada ini dan menjadi lebih mahal bagi pengguna, pertimbangkan kembali cara pemanfaatannya.

Pertimbangkan [batas baru 16,7 juta](https://eips.ethereum.org/EIPS/eip-7825) jika transaksi yang mengeksekusi kontrak Anda mungkin mencapai ukuran yang sama.

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [fusaka meta eip](https://eips.ethereum.org/EIPS/eip-7607)
- [Pengumuman blog jaringan percobaan Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Apa yang Fusaka & Pectra akan bawa ke Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Peningkatan Ethereum Berikutnya: Fusaka, Glamsterdam & Selanjutnya dengan Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [File Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs Dijelaskan](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)
