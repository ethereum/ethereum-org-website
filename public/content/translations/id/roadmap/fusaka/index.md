---
title: Fulu-Osaka (Fusaka)
description: Pelajari pengunduhan protokol Fusaka
lang: id
---

# Fusaka {#fusaka}

Upgrade jaringan Fusaka mengikuti [Pectra](/roadmap/pectra/) dan menghadirkan lebih banyak fitur baru serta meningkatkan pengalaman bagi setiap pengguna dan pengembang Ethereum. Nama ini terdiri dari upgrade lapisan eksekusi Osaka dan versi lapisan konsensus yang dinamai menurut bintang Fulu. Kedua bagian Ethereum menerima peningkatan yang mendorong skala, keamanan, dan pengalaman pengguna Ethereum ke masa depan.

Peningkatan ini direncanakan untuk Q4 2025.

<InfoBanner>
Pembaruan Fusaka hanyalah satu langkah dalam tujuan pengembangan jangka panjang Ethereum. Pelajari lebih lanjut [peta perjalanan protokol](/roadmap/) dan [upgrade sebelumnya](/history/).
</InfoBanner>

## Peningkatan di Fusaka {#improvements-in-fusaka}

### Ketersediaan data & penskalaan L2 {#data-availability-and-l2-scaling}

#### PeerDAS {#peerdas}

Spesifikasi: https://eips.ethereum.org/EIPS/eip-7594

Sumber daya: https://youtu.be/bONWd1x2TjQ?t=328 (dapplion di PeerDAS)

Ini adalah _headline_ dari fork Fusaka, fitur utama yang ditambahkan dalam upgrade ini. Lapisan ke-2 saat ini mengirim data mereka ke Ethereum dalam bentuk blob, tipe data sementara yang dibuat khusus untuk lapisan ke-2. Sebelum Fusaka, setiap simpul penuh wajib menyimpan setiap blob untuk menjamin keberadaan data. Seiring meningkatnya keluaran blob, kewajiban untuk mengunduh semua data tersebut menjadi sangat membebani sumber daya dan tidak lagi dapat dipertahankan.

Dengan [pengambilan sampel ketersediaan data](https://notes.ethereum.org/@fradamt/das-fork-choice), alih-alih harus menyimpan semua data blob, setiap simpul akan bertanggung jawab atas sebagian data blob. Blob didistribusikan secara acak merata ke seluruh simpul dalam jaringan, dengan setiap simpul penuh hanya menyimpan 1/8 dari total data. Dengan mekanisme ini, skalabilitas teoretis dapat meningkat hingga 8 kali lipat. Untuk memastikan ketersediaan data, setiap bagian dari data dapat direkonstruksi dari 50% data yang ada dengan metode yang menurunkan kemungkinan kesalahan atau kehilangan data hingga tingkat yang sangat kecil secara kriptografis (~satu dari 10²⁰ hingga 10²⁴).

Hal ini menjaga agar kebutuhan perangkat keras dan bandwidth untuk simpul tetap wajar, sekaligus memungkinkan skalabilitas blob yang menghasilkan lebih banyak kapasitas dengan biaya lebih rendah untuk lapisan ke-2.

Mendalam: https://eprint.iacr.org/2024/1362.pdf

#### Percabangan hanya parameter blob {#blob-parameter-only-forks}

Spesifikasi: https://eips.ethereum.org/EIPS/eip-7892

Skala Ethereum Lapisan ke-2 - seiring pertumbuhan jaringan, mereka perlu mengunggah lebih banyak data ke Ethereum. Ini berarti Ethereum akan perlu meningkatkan jumlah blob yang tersedia seiring berjalannya waktu. Meskipun PeerDAS memungkinkan penskalaan data blob, hal itu perlu dilakukan secara bertahap dan aman.

Karena Ethereum adalah kode yang berjalan di ribuan simpul independen yang harus sepakat pada aturan yang sama, kita tidak bisa begitu saja memperkenalkan perubahan seperti menambah jumlah blob dengan cara yang sama seperti memperbarui sebuah situs web. Setiap perubahan aturan harus berupa upgrade terkoordinasi, di mana setiap simpul, klien, dan perangkat lunak validator melakukan pembaruan sebelum blok yang telah ditentukan bersama.

Upgrade terkoordinasi ini umumnya mencakup banyak perubahan, memerlukan banyak pengujian, dan prosesnya memakan waktu. Untuk dapat beradaptasi lebih cepat dengan kebutuhan blob lapisan ke-2 yang terus berubah, percabangan hanya parameter blob memperkenalkan mekanisme untuk meningkatkan jumlah blob tanpa harus menunggu jadwal upgrade besar berikutnya.

Percabangan hanya parameter blob dapat diatur oleh klien, mirip dengan parameter konfigurasi lain seperti batas gas. Di antara upgrade besar Ethereum, klien dapat menyepakati untuk meningkatkan blob 'target' dan 'max', misalnya menjadi 9 dan 12, lalu operator simpul memperbarui perangkat lunak mereka untuk ikut serta dalam percabangan kecil tersebut. Percabangan hanya parameter blob ini dapat dikonfigurasikan kapan saja.

#### Biaya dasar blob dibatasi oleh biaya eksekusi {#blob-base-fee-bounded-by-execution-costs}

Spesifikasi: https://eips.ethereum.org/EIPS/eip-7918

Penjelasan buku cerita: https://notes.ethereum.org/@anderselowsson/AIG

Lapisan ke-2 membayar dua biaya saat mengirim data: biaya blob dan gas eksekusi yang dibutuhkan untuk memverifikasi blob tersebut. Jika gas eksekusi mendominasi, lelang biaya blob dapat turun hingga 1 wei dan berhenti berfungsi sebagai sinyal harga.

EIP-7918 menetapkan harga cadangan proporsional di bawah setiap blob. Ketika harga cadangan lebih tinggi daripada biaya dasar blob nominal, algoritme penyesuaian biaya memperlakukan blok tersebut seolah-olah melebihi target dan menghentikan penurunan biaya, sehingga biaya dapat meningkat secara normal.

- pasar biaya blob selalu bereaksi terhadap kemacetan
- lapisan ke-2 membayar setidaknya sebagian besar dari komputasi yang mereka terapkan pada simpul
- lonjakan biaya dasar pada EL tidak lagi dapat mendukung biaya blob pada 1 wei

### Batasan gas, biaya & penguatan DoS {#gas-limits-fees-and-dos-hardening}

#### Tetapkan batas atas untuk MODEXP {#set-upper-bounds-for-modexp}

Spesifikasi: https://eips.ethereum.org/EIPS/eip-7823

Sampai saat ini, precompile MODEXP menerima angka dengan ukuran hampir tak terbatas. Hal ini membuatnya sulit untuk diuji, mudah disalahgunakan, dan berisiko bagi kestabilan klien. EIP-7823 menetapkan batas yang jelas: setiap angka input maksimal panjangnya 8192 bit (1024 byte). Apa pun yang lebih besar ditolak, gas transaksi dibakar, dan tidak ada perubahan status yang terjadi. Hal ini dengan sangat baik mencakup kebutuhan dunia nyata sekaligus menghilangkan kasus-kasus ekstrem yang sebelumnya mempersulit perencanaan batas gas dan tinjauan keamanan. Perubahan ini memberikan keamanan dan perlindungan DoS yang lebih baik tanpa memengaruhi pengalaman pengguna maupun pengembang.

#### Batas Gas Transaksi {#transaction-gas-limit-cap}

Spesifikasi: https://eips.ethereum.org/EIPS/eip-7825

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) menambahkan batas 16.777.216 (2^24) gas per transaksi. Ini adalah langkah penguatan DoS secara proaktif dengan membatasi biaya terburuk dari satu transaksi saat kita meningkatkan batas gas blok. Perubahan ini membuat validasi dan propagasi lebih mudah untuk dimodelkan, sehingga memungkinkan kita mengatasi skalabilitas dengan menaikkan batas gas.

Mengapa tepatnya 2^24 gas? Batas ini jauh lebih kecil dari batas gas saat ini, namun tetap cukup besar untuk deployment kontrak nyata dan precompile yang berat, serta penggunaan bilangan pangkat 2 memudahkan implementasi di seluruh klien. Ukuran maksimum transaksi yang baru ini mirip dengan ukuran rata-rata blok sebelum Pectra, sehingga menjadi batas yang wajar untuk operasi apa pun di Ethereum.

#### Kenaikan Biaya Gas MODEXP {#modexp-gas-cost-increase}

Spesifikasi: https://eips.ethereum.org/EIPS/eip-7883

MODEXP adalah fungsi bawaan yang menghitung eksponensial modular, sejenis perhitungan bilangan besar yang digunakan dalam verifikasi tanda tangan RSA dan sistem bukti. Hal ini memungkinkan kontrak menjalankan perhitungan ini secara langsung tanpa harus mengimplementasikannya sendiri.

Devs dan tim klien mengidentifikasi MODEXP sebagai hambatan utama untuk meningkatkan batas gas blok karena harga gas saat ini sering meremehkan berapa banyak daya komputasi yang dibutuhkan masukan tertentu. Ini artinya satu transaksi yang menggunakan MODEXP dapat menghabiskan sebagian besar waktu yang dibutuhkan untuk memproses seluruh blok, sehingga memperlambat jaringan.

EIP‑7883 mengubah harga agar sesuai dengan biaya komputasi nyata dengan:

- menaikkan biaya minimum dari 200 menjadi 500 gas dan menghapus diskon sepertiga dari EIP-2565 pada perhitungan biaya umum
- meningkatkan biaya lebih tajam ketika input eksponen sangat panjang. jika eksponen (angka “pangkat” yang Anda berikan sebagai argumen kedua) lebih panjang dari 32 byte / 256 bit, biaya gas naik jauh lebih cepat untuk setiap byte tambahan
- biaya juga bertambah untuk basis besar atau modulus ekstra. Dua angka lainnya (basis dan modulus) diasumsikan setidaknya 32 byte - jika salah satu lebih besar, biaya meningkat sebanding dengan ukurannya

Dengan penyesuaian biaya terhadap waktu pemrosesan aktual yang lebih baik, MODEXP tidak lagi menyebabkan suatu blok membutuhkan waktu terlalu lama untuk divalidasi. Perubahan ini merupakan salah satu dari beberapa perubahan yang bertujuan untuk memastikan peningkatan batas gas blok Ethereum menjadi aman di masa mendatang.

#### Batas Ukuran Blok Eksekusi RLP {#rlp-execution-block-size-limit}

Spesifikasi: https://eips.ethereum.org/EIPS/eip-7934

Ethereum menambahkan batas keras pada [RLP](/developers/docs/data-structures-and-encoding/rlp/)-Ukuran blok eksekusi yang berukuran: Total 10 MiB, dengan margin keselamatan 2 MiB yang disediakan untuk framing blok suar. Secara praktis, klien mendefinisikan `MAX_BLOCK_SIZE = 10.485.760` byte dan `SAFETY_MARGIN = 2.097.152` byte, dan menolak blok eksekusi apa pun yang muatan RLP-nya melebihi `MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`. Tujuannya adalah untuk mengikat waktu propagasi/validasi kasus terburuk dan selaras dengan perilaku gosip CL (blok yang lebih dari 10 MiB tidak diperbanyak), mengurangi risiko reorg/DoS tanpa mengubah akuntansi gas.

#### Tetapkan batas gas default ke XX juta {#set-default-gas-limit-to-xx-million}

Spesifikasi: https://eips.ethereum.org/EIPS/eip-7935

Sebelum menaikkan batas gas dari 30 juta menjadi 36 juta pada bulan Februari 2025 (dan selanjutnya menjadi 45 juta), nilai ini tidak berubah sejak Penggabungan (September 2022). EIP ini bertujuan menjadikan skalabilitas sebagai prioritas.

EIP-7935 mengoordinasikan tim klien EL untuk menaikkan batas gas default di atas 45 juta saat ini untuk Fusaka. Ini adalah EIP Informasional, tetapi secara eksplisit meminta klien untuk menguji batas yang lebih tinggi pada devnet, menyatu pada nilai yang aman, dan mengirimkan angka tersebut dalam rilis Fusaka mereka.

Perencanaan devnet menargetkan penekanan ~60 juta (blok penuh dengan beban sintetis) dan kenaikan berulang. Penelitian mengatakan patologi ukuran blok terburuk tidak boleh mengikat di bawah ~150 juta. Peluncuran harus dipasangkan dengan batasan gas transaksi (EIP-7825) sehingga tidak ada transaksi tunggal yang dapat mendominasi saat batas meningkat.

### Dukungan prakonfirmasi {#preconfirmation-support}

#### Lookahead pengusul deterministik {#deterministic-proposer-lookahead}

Spesifikasi: https://eips.ethereum.org/EIPS/eip-7917

Dengan EIP-7917, Rantai Suar akan mengetahui pengusul blok yang akan datang untuk epoch berikutnya. Memiliki pandangan deterministik di mana validator akan mengusulkan blok di masa depan dapat mengaktifkan [prakonfirmasi](https://ethresear.ch/t/based-preconfirmations/17353) - komitmen dengan pengusul yang akan datang yang menjamin transaksi pengguna akan dimasukkan dalam blok mereka tanpa menunggu blok yang sebenarnya.

Fitur ini menguntungkan implementasi klien dan keamanan jaringan karena mencegah kasus-kasus tepi di mana validator dapat memanipulasi jadwal pengusul. Lookahead juga memungkinkan implementasi yang lebih kompleks.

### Opcode & prekompilasi (hadiah pengembang) {#opcodes-and-precomliles}

#### Hitung opcode nol di depan (CLZ) {#count-leading-zeros-opcode}

Spesifikasi: https://eips.ethereum.org/EIPS/eip-7939

EIP-7939 menambahkan instruksi EVM kecil, CLZ (“hitung angka nol di depan”). Diberikan nilai 256-bit, ia mengembalikan berapa banyak bit nol yang ada di depan — dan mengembalikan 256 jika nilainya sepenuhnya nol. Ini adalah fitur umum dalam banyak arsitektur set instruksi karena memungkinkan operasi aritmatika yang lebih efisien. Dalam praktiknya, proses ini meringkas pemindaian bit hand-roll saat ini menjadi satu langkah, sehingga mencari bit set pertama, memindai byte, atau menguraikan bitfield jadi lebih simpel dan murah. Opcode-nya rendah, berbiaya tetap, dan telah dipatok nilainya agar setara dengan penambahan dasar, yang memangkas bytecode dan menghemat bahan bakar untuk pekerjaan yang sama.

## Apakah peningkatan ini memengaruhi semua node dan validator Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Ya, pemutakhiran Fusaka memerlukan pembaruan pada [klien eksekusi dan klien konsensus](/developers/docs/nodes-and-clients/). Semua klien utama Ethereum akan merilis versi yang mendukung hard fork yang ditandai sebagai prioritas tinggi. Anda dapat mengetahui ketersediaan rilis ini di repo Github klien, [saluran Discord](https://ethstaker.org/support) mereka, [Discord EthStaker](https://dsc.gg/ethstaker), atau dengan berlangganan blog Ethereum untuk pembaruan protokol. Untuk menjaga sinkronisasi dengan jaringan Ethereum setelah upgrade, operator node harus memastikan bahwa mereka menjalankan versi client yang didukung. Perlu dicatat bahwa informasi mengenai rilis client bersifat sensitif terhadap waktu, sehingga pengguna harus merujuk pada pembaruan terbaru untuk mendapatkan detail yang paling terkini.

## Bagaimana cara menukarkan ETH setelah hard fork? {#how-can-eth-be-converted-after-the-hardfork}

- **Tidak Ada Tindakan yang Diperlukan untuk ETH Anda**: Setelah peningkatan Ethereum Fusaka, Anda tidak perlu mengonversi atau meningkatkan ETH Anda. Saldo akun Anda akan tetap sama, dan ETH yang Anda miliki saat ini akan tetap dapat diakses dalam bentuknya yang ada setelah hard fork.
- Waspada Penipuan! <Emoji text="⚠️" /> Siapa pun yang menyuruh Anda "meng-upgrade" ETH Anda sedang mencoba menipu Anda. Tidak ada tindakan yang perlu dilakukan terkait upgrade ini. Aset milik anda tidak akan terpengaruh sama sekali. Ingat, tetap terinformasi adalah pertahanan terbaik untuk melawan penipuan.

[Lebih lanjut tentang mengenali dan menghindari penipuan](/security/)

## Bacaan lebih lanjut {#further-reading}

- [Peta jalan Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [fusaka meta eip](https://eips.ethereum.org/EIPS/eip-7607)
- [Bankless: Apa yang Fusaka & Pectra akan bawa ke Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Peningkatan Ethereum Berikutnya: Fusaka, Glamsterdam & Selanjutnya dengan Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
