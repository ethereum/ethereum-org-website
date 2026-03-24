---
title: Fulu-Osaka (Fusaka)
description: Pelajari tentang peningkatan protokol Fusaka
lang: id
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**Peningkatan Fusaka Ethereum yang sangat dinantikan ditayangkan pada 3 Desember 2025**

Peningkatan jaringan Fusaka mengikuti [Pectra](/roadmap/pectra/) dan membawa lebih banyak fitur baru serta meningkatkan pengalaman bagi setiap pengguna dan pengembang [Ethereum](/). Namanya terdiri dari peningkatan lapisan eksekusi Osaka dan versi lapisan konsensus yang dinamai dari bintang Fulu. Kedua bagian Ethereum menerima peningkatan yang mendorong peningkatan (scaling), keamanan, dan pengalaman pengguna Ethereum ke masa depan.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Peningkatan Fusaka hanyalah satu langkah dalam tujuan pengembangan jangka panjang Ethereum. Pelajari lebih lanjut tentang [peta jalan protokol](/roadmap/) dan [peningkatan sebelumnya](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Peningkatan di Fusaka {#improvements-in-fusaka}

### Skala blob {#scale-blobs}

#### PeerDAS {#peerdas}

Ini adalah _sorotan utama_ dari fork Fusaka, fitur utama yang ditambahkan dalam peningkatan ini. Layer 2 saat ini memposting data mereka ke Ethereum dalam bentuk blob, tipe data sementara yang dibuat khusus untuk layer 2. Pra-Fusaka, setiap node penuh harus menyimpan setiap blob untuk memastikan bahwa data tersebut ada. Seiring meningkatnya throughput blob, keharusan untuk mengunduh semua data ini menjadi sangat intensif sumber daya dan tidak dapat dipertahankan.

Dengan [ketersediaan data sampling](https://notes.ethereum.org/@fradamt/das-fork-choice), alih-alih harus menyimpan semua data blob, setiap node akan bertanggung jawab atas sebagian dari data blob. Blob didistribusikan secara acak dan seragam di seluruh node dalam jaringan dengan setiap node penuh hanya menyimpan 1/8 dari data, sehingga memungkinkan peningkatan teoretis hingga 8x. Untuk memastikan ketersediaan data, bagian mana pun dari data dapat direkonstruksi dari 50% keseluruhan yang ada dengan metode yang menurunkan probabilitas data yang salah atau hilang ke tingkat kriptografi yang dapat diabaikan (\~satu banding 10<sup>20</sup> hingga satu banding 10<sup>24</sup>).

Ini menjaga persyaratan perangkat keras dan bandwidth untuk node tetap dapat dipertahankan sambil memungkinkan peningkatan blob yang menghasilkan lebih banyak skala dengan biaya yang lebih kecil untuk layer 2.

[Pelajari lebih lanjut tentang PeerDAS](/roadmap/fusaka/peerdas/)

**Sumber daya**:

- [Spesifikasi teknis EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion tentang PeerDAS: Scaling Ethereum Today | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Akademik: Dokumentasi PeerDAS Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Fork Blob-Parameter-Only {#blob-parameter-only-forks}

Layer 2 meningkatkan Ethereum - seiring pertumbuhan jaringan mereka, mereka perlu memposting lebih banyak data ke Ethereum. Ini berarti bahwa Ethereum perlu meningkatkan jumlah blob yang tersedia bagi mereka seiring berjalannya waktu. Meskipun PeerDAS memungkinkan peningkatan data blob, hal ini perlu dilakukan secara bertahap dan aman.

Karena Ethereum adalah kode yang berjalan pada ribuan node independen yang memerlukan kesepakatan pada aturan yang sama, kita tidak bisa begitu saja memperkenalkan perubahan seperti meningkatkan jumlah blob seperti cara Anda menerapkan pembaruan situs web. Setiap perubahan aturan harus berupa peningkatan terkoordinasi di mana setiap perangkat lunak node, klien, dan validator ditingkatkan sebelum blok yang telah ditentukan sebelumnya.

Peningkatan terkoordinasi ini umumnya mencakup banyak perubahan, memerlukan banyak pengujian, dan itu memakan waktu. Untuk beradaptasi lebih cepat terhadap perubahan kebutuhan blob layer 2, fork blob parameter only memperkenalkan mekanisme untuk meningkatkan blob tanpa harus menunggu jadwal peningkatan tersebut.

Fork blob parameter only dapat diatur oleh klien, mirip dengan konfigurasi lain seperti batas gas. Di antara peningkatan besar Ethereum, klien dapat setuju untuk meningkatkan `target` dan `max` blob menjadi mis. 9 dan 12 dan kemudian operator node akan memperbarui untuk mengambil bagian dalam fork kecil tersebut. Fork blob parameter only ini dapat dikonfigurasi kapan saja.

Ketika blob pertama kali ditambahkan ke jaringan dalam peningkatan Dencun, targetnya adalah 3. Itu ditingkatkan menjadi 6 di Pectra dan, setelah Fusaka, itu sekarang dapat ditingkatkan pada tingkat yang berkelanjutan secara independen dari peningkatan jaringan utama ini.

![Bagan yang menunjukkan jumlah blob rata-rata per blok dan peningkatan target dengan peningkatan](./average-blob-count-per-block.webp)

Sumber grafik: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Sumber daya**: [Spesifikasi teknis EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Biaya dasar blob dibatasi oleh biaya eksekusi {#blob-base-fee-bounded-by-execution-costs}

Layer 2 membayar dua tagihan saat mereka memposting data: biaya blob dan gas eksekusi yang diperlukan untuk memverifikasi blob tersebut. Jika gas eksekusi mendominasi, lelang biaya blob dapat turun drastis menjadi 1 wei dan berhenti menjadi sinyal harga.

EIP-7918 menyematkan harga cadangan proporsional di bawah setiap blob. Ketika cadangan lebih tinggi dari biaya dasar blob nominal, algoritma penyesuaian biaya memperlakukan blok sebagai melebihi target dan berhenti menekan biaya ke bawah serta memungkinkannya meningkat secara normal. Hasilnya:

- pasar biaya blob selalu bereaksi terhadap kemacetan
- layer 2 membayar setidaknya sebagian yang berarti dari komputasi yang mereka bebankan pada node
- lonjakan biaya dasar pada EL (Lapisan Eksekusi) tidak dapat lagi membuat biaya blob terdampar di 1 wei

**Sumber daya**:

- [Spesifikasi teknis EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Penjelasan Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Skala L1 {#scale-l1}

#### Kedaluwarsa riwayat dan tanda terima yang lebih sederhana {#history-expiry}

Pada Juli 2025, klien eksekusi Ethereum [mulai mendukung kedaluwarsa riwayat parsial](https://blog.ethereum.org/2025/07/08/partial-history-exp). Ini menghapus riwayat yang lebih lama dari [the Merge](https://ethereum.org/roadmap/merge/) untuk mengurangi ruang disk yang dibutuhkan oleh operator node seiring dengan terus berkembangnya Ethereum.

EIP ini berada di bagian yang terpisah dari "EIP Inti" karena fork tersebut sebenarnya tidak mengimplementasikan perubahan apa pun - ini adalah pemberitahuan bahwa tim klien harus mendukung kedaluwarsa riwayat pada peningkatan Fusaka. Secara praktis, klien dapat mengimplementasikan ini kapan saja tetapi menambahkannya ke peningkatan secara konkret menempatkannya di daftar tugas mereka dan memungkinkan mereka untuk menguji perubahan Fusaka bersamaan dengan fitur ini.

**Sumber daya**: [Spesifikasi teknis EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Tetapkan batas atas untuk MODEXP {#set-upper-bounds-for-modexp}

Hingga saat ini, prakompilasi MODEXP menerima angka dengan ukuran hampir berapa pun. Hal itu membuatnya sulit untuk diuji, mudah disalahgunakan, dan berisiko bagi stabilitas klien. EIP-7823 menetapkan batas yang jelas: setiap angka input dapat memiliki panjang paling banyak 8192 bit (1024 byte). Apa pun yang lebih besar akan ditolak, gas transaksi dibakar, dan tidak ada perubahan status yang terjadi. Ini dengan sangat nyaman mencakup kebutuhan dunia nyata sambil menghilangkan kasus ekstrem yang memperumit perencanaan batas gas dan tinjauan keamanan. Perubahan ini memberikan lebih banyak keamanan dan perlindungan DoS tanpa memengaruhi pengalaman pengguna atau pengembang.

**Sumber daya**: [Spesifikasi teknis EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Batas Atas Batas Gas Transaksi {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) menambahkan batas atas sebesar 16.777.216 (2^24) gas per transaksi. Ini adalah penguatan DoS proaktif dengan membatasi biaya kasus terburuk dari setiap transaksi tunggal saat kita menaikkan batas gas blok. Ini membuat validasi dan propagasi lebih mudah dimodelkan untuk memungkinkan kita menangani peningkatan melalui kenaikan batas gas.

Mengapa tepatnya 2^24 gas? Ini jauh lebih kecil dari batas gas saat ini, cukup besar untuk penerapan kontrak nyata & prakompilasi berat, dan pangkat 2 membuatnya mudah diimplementasikan di seluruh klien. Ukuran transaksi maksimum baru ini mirip dengan ukuran blok rata-rata pra-Pectra, menjadikannya batas yang wajar untuk operasi apa pun di Ethereum.

**Sumber daya**: [Spesifikasi teknis EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Peningkatan biaya gas `MODEXP` {#modexp-gas-cost-increase}

MODEXP adalah fungsi bawaan prakompilasi yang menghitung eksponensiasi modular, sejenis matematika angka besar yang digunakan dalam verifikasi tanda tangan RSA dan sistem bukti. Ini memungkinkan kontrak untuk menjalankan perhitungan ini secara langsung tanpa harus mengimplementasikannya sendiri.

Pengembang dan tim klien mengidentifikasi MODEXP sebagai hambatan utama untuk meningkatkan batas gas blok karena penetapan harga gas saat ini sering meremehkan berapa banyak daya komputasi yang dibutuhkan input tertentu. Ini berarti satu transaksi yang menggunakan MODEXP dapat menghabiskan sebagian besar waktu yang dibutuhkan untuk memproses seluruh blok, sehingga memperlambat jaringan.

EIP ini mengubah penetapan harga agar sesuai dengan biaya komputasi nyata dengan:

- menaikkan biaya minimum dari 200 menjadi 500 gas dan menghapus diskon sepertiga dari EIP-2565 pada perhitungan biaya umum
- meningkatkan biaya lebih tajam ketika input eksponen sangat panjang. jika eksponen (angka "pangkat" yang Anda berikan sebagai argumen kedua) lebih panjang dari 32 byte / 256 bit, biaya gas naik jauh lebih cepat untuk setiap byte tambahan
- mengenakan biaya tambahan untuk basis atau modulus yang besar juga. Dua angka lainnya (basis dan modulus) diasumsikan setidaknya 32 byte - jika salah satunya lebih besar, biayanya naik sebanding dengan ukurannya

Dengan menyesuaikan biaya secara lebih baik dengan waktu pemrosesan aktual, MODEXP tidak dapat lagi menyebabkan blok memakan waktu terlalu lama untuk divalidasi. Perubahan ini adalah salah satu dari beberapa perubahan yang bertujuan untuk membuatnya aman guna meningkatkan batas gas blok Ethereum di masa mendatang.

**Sumber daya**: [Spesifikasi teknis EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Batas Ukuran Blok Eksekusi RLP {#rlp-execution-block-size-limit}

Ini menciptakan batas atas seberapa besar sebuah blok diizinkan - ini adalah batas pada apa yang _dikirim_ melalui jaringan dan terpisah dari batas gas, yang membatasi _pekerjaan_ di dalam sebuah blok. Batas ukuran blok adalah 10 MiB, dengan kelonggaran kecil (2 MiB) yang dicadangkan untuk data konsensus sehingga semuanya pas dan menyebar dengan bersih. Jika sebuah blok muncul lebih besar dari itu, klien akan menolaknya.
Ini diperlukan karena blok yang sangat besar membutuhkan waktu lebih lama untuk menyebar dan diverifikasi di seluruh jaringan dan dapat menciptakan masalah konsensus atau disalahgunakan sebagai vektor DoS. Selain itu, gosip lapisan konsensus sudah tidak akan meneruskan blok lebih dari ~10 MiB, jadi menyelaraskan lapisan eksekusi ke batas tersebut menghindari situasi aneh "dilihat oleh beberapa orang, dijatuhkan oleh yang lain".

Intinya: ini adalah batas atas ukuran blok eksekusi yang dienkode [RLP](/developers/docs/data-structures-and-encoding/rlp/). Total 10 MiB, dengan margin keamanan 2 MiB yang dicadangkan untuk pembingkaian beacon-block. Secara praktis, klien mendefinisikan

`MAX_BLOCK_SIZE = 10,485,760` byte dan

`SAFETY_MARGIN = 2,097,152` byte,

dan menolak setiap blok eksekusi yang payload RLP-nya melebihi

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Tujuannya adalah untuk membatasi waktu propagasi/validasi kasus terburuk dan menyelaraskan dengan perilaku gosip lapisan konsensus, mengurangi risiko reorg/DoS tanpa mengubah akuntansi gas.

**Sumber daya**: [Spesifikasi teknis EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Tetapkan batas gas default ke 60 juta {#set-default-gas-limit-to-60-million}

Sebelum menaikkan batas gas dari 30M menjadi 36M pada Februari 2025 (dan selanjutnya menjadi 45M), nilai ini belum berubah sejak the Merge (September 2022). EIP ini bertujuan untuk menjadikan peningkatan yang konsisten sebagai prioritas.

EIP-7935 mengoordinasikan tim klien EL untuk menaikkan batas gas default di atas 45M saat ini untuk Fusaka. Ini adalah EIP Informasional, tetapi secara eksplisit meminta klien untuk menguji batas yang lebih tinggi di devnet, menyatu pada nilai yang aman, dan mengirimkan angka tersebut dalam rilis Fusaka mereka.

Perencanaan devnet menargetkan tekanan ~60M (blok penuh dengan beban sintetis) dan lonjakan iteratif; penelitian mengatakan patologi ukuran blok kasus terburuk tidak boleh mengikat di bawah ~150M. Peluncuran harus dipasangkan dengan batas atas batas gas transaksi (EIP-7825) sehingga tidak ada satu transaksi pun yang dapat mendominasi saat batas naik.

**Sumber daya**: [Spesifikasi teknis EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Meningkatkan UX {#improve-ux}

#### Lookahead pengusul deterministik {#deterministic-proposer-lookahead}

Dengan EIP-7917, Beacon Chain akan menyadari pengusul blok yang akan datang untuk epoch berikutnya. Memiliki pandangan deterministik tentang validator mana yang akan mengusulkan blok di masa mendatang dapat memungkinkan [prakonfirmasi](https://ethresear.ch/t/based-preconfirmations/17353) - komitmen dengan pengusul yang akan datang yang menjamin transaksi pengguna akan disertakan dalam blok mereka tanpa menunggu blok yang sebenarnya.

Fitur ini menguntungkan implementasi klien dan keamanan jaringan karena mencegah kasus ekstrem di mana validator dapat memanipulasi jadwal pengusul. Lookahead juga memungkinkan kompleksitas implementasi yang lebih rendah.

**Sumber daya**: [Spesifikasi teknis EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Opcode count leading zeros (CLZ) {#count-leading-zeros-opcode}

Fitur ini menambahkan instruksi EVM kecil, **count leading zeros (CLZ)**. Hampir semua yang ada di EVM direpresentasikan sebagai nilai 256-bit—opcode baru ini mengembalikan berapa banyak bit nol yang ada di depan. Ini adalah fitur umum di banyak arsitektur set instruksi karena memungkinkan operasi aritmatika yang lebih efisien. Dalam praktiknya, ini menyatukan pemindaian bit buatan tangan saat ini menjadi satu langkah, sehingga menemukan bit set pertama, memindai byte, atau mengurai bitfield menjadi lebih sederhana dan lebih murah. Opcode ini berbiaya rendah, tetap, dan telah diukur setara dengan penambahan dasar, yang memangkas bytecode dan menghemat gas untuk pekerjaan yang sama.

**Sumber daya**: [Spesifikasi teknis EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Prakompilasi untuk Dukungan Kurva secp256r1 {#secp256r1-precompile}

Memperkenalkan pemeriksa tanda tangan secp256r1 (P-256) bergaya kunci sandi (passkey) bawaan di alamat tetap `0x100` menggunakan format panggilan yang sama yang telah diadopsi oleh banyak L2 dan memperbaiki kasus ekstrem, sehingga kontrak yang ditulis untuk lingkungan tersebut berfungsi di L1 tanpa perubahan.

Peningkatan UX! Bagi pengguna, ini membuka penandatanganan asli perangkat dan kunci sandi. Dompet dapat memanfaatkan Apple Secure Enclave, Android Keystore, modul keamanan perangkat keras (HSM), dan FIDO2/WebAuthn secara langsung - tanpa frasa seed, orientasi yang lebih lancar, dan alur multi-faktor yang terasa seperti aplikasi modern. Ini menghasilkan UX yang lebih baik, pemulihan yang lebih mudah, dan pola abstraksi akun yang sesuai dengan apa yang telah dilakukan oleh miliaran perangkat.

Bagi pengembang, ini mengambil input 160-byte dan mengembalikan output 32-byte, sehingga memudahkan untuk mem-porting pustaka yang ada dan kontrak L2. Di balik layar, ini mencakup pemeriksaan point-at-infinity dan perbandingan modular untuk menghilangkan kasus ekstrem yang rumit tanpa merusak pemanggil yang valid.

**Sumber daya**:

- [Spesifikasi teknis EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Lebih lanjut tentang RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Perhatikan bahwa EIP-7951 menggantikan RIP-7212)_

### Meta {#meta}

#### Metode JSON-RPC `eth_config` {#eth-config}

Ini adalah panggilan JSON-RPC yang memungkinkan Anda untuk bertanya kepada node Anda pengaturan fork apa yang sedang Anda jalankan. Ini mengembalikan tiga snapshot: `current`, `next`, & `last` sehingga validator dan alat pemantauan dapat memverifikasi bahwa klien telah disiapkan untuk fork yang akan datang.

Secara praktis, ini untuk mengatasi kekurangan yang ditemukan ketika fork Pectra ditayangkan di testnet Holesky pada awal 2025 dengan kesalahan konfigurasi kecil yang mengakibatkan status tidak dapat difinalisasi. Ini membantu tim pengujian dan pengembang memastikan bahwa fork utama akan berperilaku seperti yang diharapkan saat berpindah dari devnet ke testnet, dan dari testnet ke Mainnet.

Snapshot meliputi: `chainId`, `forkId`, waktu aktivasi fork yang direncanakan, prakompilasi mana yang aktif, alamat prakompilasi, dependensi kontrak sistem, dan jadwal blob fork.

EIP ini berada di bagian yang terpisah dari "EIP Inti" karena fork tersebut sebenarnya tidak mengimplementasikan perubahan apa pun - ini adalah pemberitahuan bahwa tim klien harus mengimplementasikan metode JSON-RPC ini pada peningkatan Fusaka.

**Sumber daya**: [Spesifikasi teknis EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## FAQ {#faq}

### Apakah peningkatan ini memengaruhi semua node dan validator Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Ya, peningkatan Fusaka memerlukan pembaruan untuk [klien eksekusi dan klien konsensus](/developers/docs/nodes-and-clients/). Semua klien utama Ethereum akan merilis versi yang mendukung hard fork yang ditandai sebagai prioritas tinggi. Anda dapat mengikuti kapan rilis ini akan tersedia di repositori Github klien, [saluran Discord](https://ethstaker.org/support) mereka, [Discord EthStaker](https://dsc.gg/ethstaker), atau dengan berlangganan blog Ethereum untuk pembaruan protokol. Untuk mempertahankan sinkronisasi dengan jaringan Ethereum pasca-peningkatan, operator node harus memastikan mereka menjalankan versi klien yang didukung. Perhatikan bahwa informasi tentang rilis klien sensitif terhadap waktu, dan pengguna harus merujuk ke pembaruan terbaru untuk detail paling terkini.

### Bagaimana ETH dapat dikonversi setelah hard fork? {#how-can-eth-be-converted-after-the-hardfork}

- **Tidak Ada Tindakan yang Diperlukan untuk ETH Anda**: Setelah peningkatan Fusaka Ethereum, tidak perlu mengonversi atau meningkatkan ETH Anda. Saldo akun Anda akan tetap sama, dan ETH yang Anda pegang saat ini akan tetap dapat diakses dalam bentuknya yang ada setelah hard fork.
- **Hati-hati terhadap Penipuan!** <Emoji text="⚠️" /> **siapa pun yang menginstruksikan Anda untuk "meningkatkan" ETH Anda sedang mencoba menipu Anda.** Tidak ada yang perlu Anda lakukan sehubungan dengan peningkatan ini. Aset Anda akan tetap sama sekali tidak terpengaruh. Ingat, tetap mendapat informasi adalah pertahanan terbaik terhadap penipuan.

[Lebih lanjut tentang mengenali dan menghindari penipuan](/security/)

### Ada apa dengan zebra? <Emoji text="🦓" /> {#whats-with-the-zebras}

Zebra adalah "maskot" pilihan pengembang Fusaka karena garis-garisnya mencerminkan ketersediaan data sampling berbasis kolom PeerDAS, di mana node menyimpan subnet kolom tertentu dan mengambil sampel beberapa kolom lain dari setiap slot rekan untuk memeriksa bahwa data blob tersedia.

The Merge pada tahun 2022 [menggunakan panda](https://x.com/hwwonx/status/1431970802040127498) sebagai maskotnya untuk menandakan penggabungan lapisan eksekusi & konsensus. Sejak saat itu, maskot telah dipilih secara informal untuk setiap fork dan muncul sebagai seni ASCII di log klien pada saat peningkatan. Ini hanyalah cara yang menyenangkan untuk merayakannya.

### Peningkatan apa yang disertakan untuk Peningkatan L2? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) adalah fitur utama dari fork ini. Ini mengimplementasikan ketersediaan data sampling (DAS) yang membuka lebih banyak skalabilitas untuk rollup, secara teoretis meningkatkan ruang blob hingga 8 kali ukuran saat ini. Pasar biaya blob juga akan ditingkatkan untuk bereaksi secara efisien terhadap kemacetan dan menjamin L2 membayar biaya yang berarti untuk komputasi dan ruang yang dibebankan blob pada node.

### Bagaimana perbedaan fork BPO? {#how-are-bpo-forks-different}

Fork Blob Only Parameter menyediakan mekanisme untuk terus meningkatkan jumlah blob (baik target maupun maks) setelah PeerDAS diaktifkan, tanpa harus menunggu peningkatan terkoordinasi penuh. Setiap peningkatan di-hardcode untuk dikonfigurasi sebelumnya dalam rilis klien yang mendukung Fusaka.

Sebagai pengguna atau validator, Anda tidak perlu memperbarui klien Anda untuk setiap BPO dan hanya memastikan untuk mengikuti hard fork utama seperti Fusaka. Ini adalah praktik yang sama seperti sebelumnya, tidak ada tindakan khusus yang diperlukan. Anda tetap disarankan untuk memantau klien Anda di sekitar peningkatan dan BPO serta terus memperbaruinya bahkan di antara rilis utama karena perbaikan atau pengoptimalan mungkin mengikuti hard fork.

### Apa jadwal BPO? {#what-is-the-bpo-schedule}

Jadwal pasti pembaruan BPO akan ditentukan dengan rilis Fusaka. Ikuti [Pengumuman protokol](https://blog.ethereum.org/category/protocol) dan catatan rilis klien Anda.

Contoh bagaimana tampilannya nanti:

- Sebelum Fusaka: target 6, maks 9
- Pada aktivasi Fusaka: target 6, maks 9
- BPO1, beberapa minggu setelah aktivasi Fusaka: target 10, maks 15, meningkat dua pertiga
- BPO2, beberapa minggu setelah BPO1: target 14, maks 21

### Apakah ini akan menurunkan biaya di Ethereum (layer 1) {#will-this-lower-gas}

Peningkatan ini tidak menurunkan biaya gas di L1, setidaknya tidak secara langsung. Fokus utamanya adalah lebih banyak ruang blob untuk data rollup, sehingga menurunkan biaya di layer 2. Ini mungkin memiliki beberapa efek samping pada pasar biaya L1 tetapi tidak ada perubahan signifikan yang diharapkan.

### Sebagai staker, apa yang perlu saya lakukan untuk peningkatan ini? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Seperti halnya setiap peningkatan jaringan, pastikan untuk memperbarui klien Anda ke versi terbaru yang ditandai dengan dukungan Fusaka. Ikuti pembaruan di milis dan [Pengumuman Protokol di Blog EF](https://blog.ethereum.org/category/protocol) untuk mendapatkan informasi tentang rilis.
Untuk memvalidasi penyiapan Anda sebelum Fusaka diaktifkan di Mainnet, Anda dapat menjalankan validator di testnet. Fusaka [diaktifkan lebih cepat di testnet](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement) memberi Anda lebih banyak ruang untuk memastikan semuanya berfungsi dan melaporkan bug. Fork testnet juga diumumkan di milis dan blog.

### Apakah "Lookahead Pengusul Deterministik" (EIP-7917) memengaruhi validator? {#does-7917-affect-validators}

Perubahan ini tidak mengubah cara fungsi klien validator Anda, namun, ini akan memberikan lebih banyak wawasan tentang masa depan tugas validator Anda. Pastikan untuk memperbarui alat pemantauan Anda untuk mengikuti fitur-fitur baru.

### Bagaimana Fusaka memengaruhi persyaratan bandwidth untuk node dan validator? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS membuat perubahan signifikan dalam cara node mentransmisikan data blob. Semua data dibagi menjadi beberapa bagian yang disebut kolom di 128 subnet dengan node yang hanya berlangganan beberapa di antaranya. Jumlah kolom subnet yang harus disimpan oleh node bergantung pada konfigurasi mereka dan jumlah validator yang terhubung. Persyaratan bandwidth aktual akan bergantung pada jumlah blob yang diizinkan dalam jaringan dan jenis node. Pada saat aktivasi Fusaka, target blob tetap sama seperti sebelumnya, tetapi dengan PeerDAS, operator node dapat melihat penurunan penggunaan disk blob dan lalu lintas jaringan mereka. Saat BPO mengonfigurasi jumlah blob yang lebih tinggi dalam jaringan, bandwidth yang diperlukan akan meningkat dengan setiap BPO.

Persyaratan node masih dalam [margin yang disarankan](https://eips.ethereum.org/EIPS/eip-7870) bahkan setelah BPO Fusaka.

#### Node penuh {#full-nodes}

Node reguler tanpa validator apa pun hanya akan berlangganan 4 subnet, menyediakan penyimpanan untuk 1/8 dari data asli. Ini berarti bahwa dengan jumlah data blob yang sama, bandwidth node untuk mengunduhnya akan lebih kecil dengan faktor delapan (8). Penggunaan disk dan bandwidth unduhan blob untuk node penuh normal mungkin menurun sekitar 80%, menjadi hanya beberapa Mb.

#### Staker solo {#solo-stakers}

Jika node digunakan untuk klien validator, ia harus menyimpan lebih banyak kolom dan karenanya memproses lebih banyak data. Dengan penambahan validator, node berlangganan setidaknya 8 subnet kolom dan karenanya memproses data dua kali lebih banyak daripada node reguler tetapi masih lebih sedikit daripada sebelum Fusaka. Jika saldo validator di atas 287 ETH, semakin banyak subnet yang akan dilanggan.

Bagi staker solo, ini berarti penggunaan disk dan bandwidth unduhan mereka akan menurun sekitar 50%. Namun untuk membangun blok secara lokal dan mengunggah semua blob ke jaringan, diperlukan lebih banyak bandwidth unggahan. Pembangun lokal akan membutuhkan bandwidth unggahan 2-3 kali lebih tinggi dari sebelumnya pada saat Fusaka dan dengan target BPO2 sebesar 15/21 blob, bandwidth unggahan akhir yang diperlukan harus sekitar 5 kali lebih tinggi, pada 100Mpbs.

#### Validator besar {#large-validators}

Jumlah subnet yang dilanggan bertambah dengan lebih banyak saldo dan validator yang ditambahkan ke node. Misalnya, sekitar saldo 800 ETH, node menyimpan 25 kolom dan akan membutuhkan sekitar 30% lebih banyak bandwidth unduhan dari sebelumnya. Unggahan yang diperlukan meningkat mirip dengan node reguler dan setidaknya diperlukan 100Mbps.

Pada 4096 ETH, 2 validator saldo maks, node menjadi 'supernode' yang menyimpan semua kolom, karenanya mengunduh dan menyimpan semuanya. Node ini secara aktif menyembuhkan jaringan dengan menyumbangkan kembali data yang hilang tetapi juga membutuhkan lebih banyak bandwidth dan penyimpanan. Dengan target blob akhir menjadi 6 kali lebih tinggi dari sebelumnya, super node harus menyimpan sekitar 600GB data blob ekstra dan memiliki bandwidth unduhan berkelanjutan yang lebih cepat di sekitar 20Mbps.

[Baca detail lebih lanjut tentang persyaratan yang diharapkan.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Perubahan EVM apa yang diimplementasikan? {#what-evm-changes-are-implemented}

Fusaka memperkuat EVM dengan perubahan dan fitur kecil yang baru.

- Untuk keamanan saat peningkatan, ukuran maksimum dari satu transaksi akan [dibatasi hingga 16,7 juta](https://eips.ethereum.org/EIPS/eip-7825) unit gas.
- [Opcode baru count leading zeros (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) ditambahkan ke EVM dan akan memungkinkan bahasa kontrak pintar untuk melakukan operasi tertentu dengan lebih efisien.
- [Biaya prakompilasi `ModExp` akan ditingkatkan](https://eips.ethereum.org/EIPS/eip-7883)—kontrak yang menggunakannya akan mengenakan lebih banyak gas untuk eksekusi.

### Bagaimana batas gas 16M yang baru memengaruhi pengembang kontrak? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka memperkenalkan batas [ukuran maksimum dari satu transaksi menjadi 16,7 juta](https://eips.ethereum.org/EIPS/eip-7825) (2^24) unit gas. Ini kira-kira seukuran blok rata-rata sebelumnya yang membuatnya cukup besar untuk mengakomodasi transaksi kompleks yang akan menghabiskan seluruh blok. Batas ini menciptakan perlindungan bagi klien, mencegah potensi serangan DoS di masa mendatang dengan batas gas blok yang lebih tinggi. Tujuan peningkatan adalah untuk memungkinkan lebih banyak transaksi masuk ke dalam blockchain tanpa ada satu pun yang menghabiskan seluruh blok.

Transaksi pengguna reguler jauh dari mencapai batas ini. Kasus ekstrem tertentu seperti operasi DeFi yang besar dan kompleks, penerapan kontrak pintar yang besar, atau transaksi batch yang menargetkan beberapa kontrak mungkin terpengaruh oleh perubahan ini. Transaksi ini harus dibagi menjadi yang lebih kecil atau dioptimalkan dengan cara lain. Gunakan simulasi sebelum mengirimkan transaksi yang berpotensi mencapai batas.

Metode RPC `eth_call` tidak dibatasi dan akan memungkinkan simulasi transaksi yang lebih besar dari batas blockchain yang sebenarnya. Batas aktual untuk metode RPC dapat dikonfigurasi oleh operator klien untuk memastikan pencegahan penyalahgunaan.

### Apa arti CLZ bagi pengembang? {#what-clz-means-for-developers}

Kompiler EVM seperti Solidity akan mengimplementasikan dan memanfaatkan fungsi baru untuk menghitung nol di balik layar. Kontrak baru mungkin mendapat manfaat dari penghematan gas jika mereka mengandalkan jenis operasi ini. Ikuti rilis dan pengumuman fitur dari bahasa kontrak pintar untuk dokumentasi tentang potensi penghematan.

### Apakah ada perubahan untuk kontrak pintar saya yang sudah ada? {#what-clz-means-for-developers}

Fusaka tidak memiliki efek langsung yang akan merusak kontrak yang ada atau mengubah perilakunya. Perubahan yang diperkenalkan pada lapisan eksekusi dibuat dengan kompatibilitas mundur, namun, selalu perhatikan kasus ekstrem dan potensi dampaknya.

[Dengan peningkatan biaya prakompilasi `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), kontrak yang bergantung padanya akan mengonsumsi lebih banyak gas untuk eksekusi. Jika kontrak Anda sangat bergantung pada ini dan menjadi lebih mahal bagi pengguna, pertimbangkan kembali bagaimana itu dimanfaatkan.

Pertimbangkan [batas 16,7 juta yang baru](https://eips.ethereum.org/EIPS/eip-7825) jika transaksi yang mengeksekusi kontrak Anda mungkin mencapai ukuran yang sama.

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Pengumuman blog testnet Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Apa yang akan dibawa Fusaka & Pectra ke Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Peningkatan Ethereum Berikutnya: Fusaka, Glamsterdam & Beyond bersama Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [The Fusaka Files](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [Penjelasan PEEPanEIPs](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)