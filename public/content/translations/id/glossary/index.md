---
title: Glosarium Ethereum
description: Glosarium istilah teknis dan non-teknis yang tidak lengkap terkait dengan Ethereum
lang: id
sidebarDepth: 2
---

# Glosarium {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### Serangan 51% {#51-attack}

Jenis serangan pada [jaringan](#network) terdesentralisasi di mana grup mendapatkan kendali atas sebagian besar [node](#node). Ini akan memungkinkan mereka untuk menipu blockchain dengan membalikkan [transaksi](#transaction) dan menggandakan pembelanjaan [ether](#ether) dan token lainnya.

## A {#section-a}

### akun {#account}

Objek yang berisi [alamat](#address), saldo, [nonce](#nonce), serta penyimpanan dan kode opsional. Sebuah akun dapat berupa [akun kontrak](#contract-account) atau [akun yang dimiliki secara eksternal (EOA)](#eoa).

<DocLink href="/developers/docs/accounts">
  Akun Ethereum
</DocLink>

### alamat {#address}

Pada umumnya, akun ini mewakili [EOA](#eoa) atau [kontrak](#contract-account) yang dapat menerima (alamat tujuan) atau mengirim (alamat sumber) [transaksi](#transaction) di Rantai Blok. Lebih khusus lagi, ini adalah 160 bit paling kanan dari [hash Keccak](#keccak-256) dari [kunci publik](#public-key) [ECDSA](#ecdsa).

### application binary interface (ABI) {#abi}

Cara standar untuk berinteraksi dengan [kontrak](#contract-account) di ekosistem Ethereum, baik dari luar blockchain maupun untuk interaksi antar kontrak.

<DocLink href="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### application programming interface {#api}

Application Programming Interface (API) adalah serangkaian definisi tentang cara menggunakan suatu perangkat lunak. API ada di antara aplikasi dan server web, dan memfasilitasi transfer data di antaranya.

### ASIC {#asic}

Sirkuit terpadu khusus aplikasi. Ini biasanya mengacu pada sirkuit terintegrasi, yang dibuat khusus untuk penambangan mata uang kripto.

### menyatakan {#assert}

Dalam [Solidity](#solidity), `assert(false)` dikompilasi menjadi `0xfe`, sebuah opcode tidak valid, yang menggunakan semua [gas](#gas) yang tersisa dan membatalkan semua perubahan. Ketika pernyataan `assert()` gagal, sesuatu yang sangat salah dan tidak terduga terjadi, dan Anda harus memperbaiki kode Anda. Anda harus menggunakan `assert()` untuk menghindari kondisi yang seharusnya tidak pernah terjadi.

<DocLink href="/developers/docs/smart-contracts/security/">
  Keamanan kontrak pintar
</DocLink>

### pengesahan {#attestation}

Klaim yang dibuat oleh suatu entitas bahwa sesuatu adalah benar. Dalam konteks Ethereum, validator konsensus harus membuat klaim mengenai apa yang mereka percayai sebagai keadaan dari rantai. Pada waktu yang telah ditentukan, setiap validator memiliki tanggung jawab untuk menerbitkan atestasi yang berbeda, yang secara resmi menyatakan pandangan validator tentang keadaan rantai, termasuk pos pemeriksaan terakhir yang telah difinalisasi dan kepala rantai saat ini.

<DocLink href="/developers/docs/consensus-mechanisms/pos/attestations/">
  Atestasi
</DocLink>

<Divider />

## B {#section-b}

### Biaya dasar {#base-fee}

Setiap [blok](#block) memiliki harga minimum yang dikenal sebagai 'biaya dasar'. Itu adalah harga [gas](#gas) minimum yang harus dibayar seorang pengguna untuk memasukkan transaksi dalam blok berikutnya.

<DocLink href="/developers/docs/gas/">
  Gas dan biaya
</DocLink>

### Rantai Suar {#beacon-chain}

Rantai Suar adalah rantai blok yang memperkenalkan [bukti taruhan](#pos) dan [validator](#validator) ke Ethereum. Rantai Suar berjalan berdampingan dengan Jaringan Utama Ethereum bukti kerja mulai dari Desember 2020 hingga kedua rantai tersebut digabungkan pada September 2022 untuk membentuk Ethereum saat ini.

<DocLink href="/roadmap/beacon-chain/">
  Rantai Suar
</DocLink>

### big-endian {#big-endian}

Representasi angka posisional di mana digit paling signifikan ditempatkan pertama dalam memori. Kebalikan dari little-endian, di mana digit paling tidak signifikan ditempatkan pertama.

### blok {#block}

Sebuah blok adalah unit informasi yang terikat yang mencakup daftar transaksi yang diurutkan dan informasi terkait konsensus. Blok diusulkan oleh validator bukti taruhan, pada saat itu blok tersebut dibagikan ke seluruh jaringan rekan-ke-rekan, di mana mereka dapat dengan mudah diverifikasi secara independen oleh semua simpul lainnya. Aturan konsensus mengatur konten blok yang dianggap valid, dan semua blok yang tidak valid diabaikan oleh jaringan. Urutan blok-blok ini dan transaksi di dalamnya menciptakan rangkaian peristiwa yang deterministik dengan akhirnya mewakili keadaan terkini dari jaringan.

<DocLink href="/developers/docs/blocks/">
  Block
</DocLink>

### penjelajah-blok {#block-explorer}

Antarmuka yang memungkinkan pengguna untuk mencari informasi dari, dan tentang, sebuah rantai blok. Ini termasuk mengambil transaksi individual, aktivitas yang terkait dengan alamat spesifik, dan informasi tentang jaringan.

### header blok {#block-header}

Header blok adalah kumpulan metadata tentang sebuah blok dan ringkasan transaksi yang termasuk dalam muatan eksekusi.

### penyebaran blok {#block-propagation}

Proses mentransmisikan blok yang telah dikonfirmasi kepada semua node lain dalam jaringan.

### pengusul blok {#block-proposer}

Validator tertentu yang dipilih untuk membuat blok dalam [ruang](#slot) tertentu.

### imbalan blok {#block-reward}

Jumlah ether yang diberikan kepada pengusul blok baru yang valid.

### status blok {#block-status}

Berbagai kondisi di mana sebuah blok dapat berada. Beberapa kondisi yang mungkin terjadi adalah:

- diusulkan: blok diusulkan oleh seorang validator
- dijadwalkan: para validator saat ini sedang mengirimkan data
- terlewat/terlewatkan: pemberi usul tidak mengusulkan blok dalam jangka waktu yang memenuhi syarat.
- terlantar: blok tersebut telah di-reorganisasi keluar oleh [algoritma pemilihan garpu](#fork-choice-algorithm)

### waktu blok {#block-time}

Interval waktu antara blok ditambahkan ke dalam rantai blok.

### validasi blok {#block-validation}

Proses memeriksa bahwa blok baru mengandung transaksi dan tanda tangan yang sah, membangun pada rantai sejarah terberat, dan mengikuti semua aturan konsensus lainnya. Blok-blok yang sah ditambahkan ke akhir rantai dan disebarluaskan kepada yang lain dalam jaringan. Blok yang tidak sah diabaikan.

### rantai blok {#blockchain}

Sekumpulan [blok](#block), masing-masing menghubungkan ke pendahulunya hingga mencapai [blok genesis](#genesis-block) dengan merujuk pada hash blok sebelumnya. Keutuhan rantai blok dijamin secara kripto-ekonomi menggunakan mekanisme konsensus berbasisbukti taruhan.

<DocLink href="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Apa itu blockchain?
</DocLink>

### simpul boot {#bootnode}

Simpul yang dapat digunakan untuk memulai proses penemuan saat menjalankan sebuah simpul. Titik akhir dari simpul ini dicatat dalam kode sumber Ethereum.

### kode bita {#bytecode}

Kumpulan instruksi abstrak yang dirancang untuk eksekusi yang efisien oleh penerjemah perangkat lunak atau mesin virtual. Tidak seperti kode sumber yang dapat dibaca manusia, kode bita diekspresikan dalam format numerik.

### Fork Byzantium {#byzantium-fork}

Tipe garpu pertama dari dua [garpu keras](#hard-fork) untuk fase pengembangan [Metropolis](#metropolis). Garpu ini mencakup Penundaan [Bom Kesulitan](#difficulty-bomb) Metropolis EIP-649 dan Pengurangan Imbalan Blok, yaitu dengan cara [Zaman Es](#ice-age) ditunda selama 1 tahun dan imbalan blok dikurangi dari 5 ke 3 ether.

<Divider />

## C {#section-c}

### Casper-FFG {#casper-ffg}

Casper-FFG adalah protokol konsensus bukti taruhan yang digunakan bersamaan dengan algoritma pemilihan garpu [LMD-GHOST](#lmd-ghost) untuk memungkinkan [klien konsensus](#consensus-client) setuju dengan kepala Rantai Suar.

### pos pemeriksaan {#checkpoint}

[Rantai Suar](#beacon-chain) memiliki tempo yang terbagi menjadi slot (12 detik) dan jangka waktu (32 slot). Ruang pertama dalam setiap jangka waktu merupakan pos pemeriksaan. Ketika [supermayoritas](#supermajority) validator membuktikan tautan antara dua pos pemeriksaan, mereka dapat [dibenarkan](#justification) dan ketika pos pemeriksaan lainnya dibenarkan pada tingkat atas, mereka dapat [difinalisasi](#finality).

### mengompilasi {#compiling}

Mengubah kode yang ditulis dalam bahasa pemrograman tingkat tinggi (seperti [Solidity](#solidity)) menjadi bahasa dengan tingkat yang lebih rendah (seperti [kode bita](#bytecode) EVM).

<DocLink href="/developers/docs/smart-contracts/compiling/">
  Mengompilasi Kontrak Pintar
</DocLink>

### panitia {#committee}

Sebuah kelompok yang terdiri dari setidaknya 128 [validator](#validator) yang ditugaskan untuk memvalidasi blok dalam setiap ruang. Salah satu validator dalam panitia adalah pengumpul, yang bertanggung jawab untuk menggabungkan tanda tangan dari semua validator lain dalam komite yang setuju pada sebuah pengesahan. Jangan dirancukan dengan [panitia sinkronisasi](#sync-committee).

### ketidakmungkinan komputasi {#computational-infeasibility}

Sebuah proses dianggap tidak mungkin secara komputasi jika memerlukan waktu yang sangat lama (misalnya miliaran tahun) untuk dilakukan oleh siapa pun yang mungkin memiliki minat untuk melakukannya.

### konsensus {#consensus}

Ketika sebagian besar mayoritas simpul dalam jaringan memiliki blok yang sama dalam rantai blok terbaik yang telah divalidasi secara lokal. Jangan disamakan dengan [aturan konsensus](#consensus-rules).

### klien konsensus {#consensus-client}

Klien konsensus (seperti Prysm, Teku, Nimbus, Lighthouse, Lodestar) menjalankan algoritma konsensus [bukti taruhan](#pos) Ethereum, yang memungkinkan jaringan mencapai kesepakatan mengenai kepala Rantai Suar. Klien konsensus tidak berpartisipasi dalam memvalidasi/menyiarkan transaksi atau mengeksekusi transisi status. Tindakan ini dilakukan oleh [klien eksekusi](#execution-client).

### lapisan konsensus {#consensus-layer}

Lapisan konsensus Ethereum merupakan jaringan [klien konsensus](#consensus-client).

### aturan konsensus {#consensus-rules}

Aturan validasi blok yang diikuti node penuh untuk tetap dalam konsensus dengan node lainnya. Jangan dirancukan dengan [konsensus](#consensus).

### Dipertimbangkan untuk Inklusi (CFI) {#cfi}

Sebuah [EIP](#eip) inti yang belum aktif di Jaringan Utama, dan pengembang klien umumnya memberikan tanggapan positif terhadap ide tersebut. Dengan asumsi memenuhi semua persyaratan untuk penyertaan jaringan utama, ini berpotensi untuk disertakan dalam peningkatan jaringan (tidak harus yang berikutnya).

### Fork Konstantinopel {#constantinople-fork}

Bagian kedua dari tahapan [Metropolis](#metropolis), awalnya direncanakan untuk diluncurkan pada pertengahan 2018. Diharapkan untuk mencakup pergeseran ke algoritma konsensus [bukti kerja](#pow)/[bukti taruhan](#pos) hibrida, yang ada di antara perubahan lainnya.

### akun kontrak {#contract-account}

Akun yang berisi kode yang dieksekusi setiap kali menerima satu [transaksi](#transaction) dari [akun](#account) lainnya ([EOA](#eoa) atau [kontrak](#contract-account)).

### transaksi pembuatan kontrak {#contract-creation-transaction}

Sebuah [transaksi](#transaction) khusus yang mencakup kode inisiasi kontrak. Penerima diatur menjadi `null` dan kontrak dideploy ke alamat yang dihasilkan dari alamat pengguna dan `nonce`. yang digunakan untuk mendaftarkan sebuah [kontrak](#contract-account) dan mencatatnya pada rantai blok Ethereum.

### ekonomi Kripto {#cryptoeconomics}

Ekonomi mata uang kripto.

## D {#section-d}

### Đ {#d-with-stroke}

Đ (D dengan stroke) digunakan dalam bahasa Inggris Kuno, Inggris Pertengahan, Islandia, dan Faroe untuk mewakili huruf besar "Eth". Ini digunakan dalam kata-kata seperti ĐEV atau Đapp (aplikasi terdesentralisasi), di mana Đ adalah huruf Norse "eth". Huruf besar eth (Ð) juga digunakan untuk melambangkan mata uang kripto Dogecoin. Hal ini biasanya terlihat pada literatur Ethereum yang lebih lama, tetapi lebih jarang digunakan saat ini.

### DAG {#dag}

DAG adalah singkatan dari Directed Acyclic Graph. Ini adalah struktur data yang terdiri dari simpul dan tautan di antara mereka. Sebelum Penggabungan, Ethereum menggunakan DAG dalam algoritma [bukti kerja](#pow)-nya, yaitu [Ethash](#ethash), tetapi tidak lagi digunakan dalam algoritma [bukti taruhan](#pos).

### Dapp {#dapp}

Aplikasi terdesentralisasi. Singkatnya, Dapp adalah sebuah [kontrak pintar](#smart-contract) dan antarmuka pengguna web. Secara lebih luas, dapp adalah aplikasi web yang dibangun di atas layanan infrastruktur rekan-ke-rekan yang terbuka dan terdesentralisasi. Selain itu, banyak dapps menyertakan penyimpanan dan/atau protokol dan platform pesan.

<DocLink href="/developers/docs/dapps/">
  Pengantar dapps
</DocLink>

### ketersediaan data {#data-availability}

Sifat dari sebuah status bahwa setiap simpul yang terhubung ke jaringan dapat mengunduh bagian tertentu dari status yang mereka inginkan.

### desentralisasi {#decentralization}

Konsep memindahkan kontrol dan pelaksanaan proses dari entitas pusat.

### organisasi otonom terdesentralisasi (DAO) {#dao}

Perusahaan atau organisasi lain yang beroperasi tanpa pengelolaan hierarkis. DAO bisa juga mengacu pada sebuah kontrak bernama "DAO" yang diluncurkan pada 30 April 2016, yang kemudian diretas pada Juni 2016; ini pada akhirnya memotivasi pembuatan [garpu keras](#hard-fork) (dengan nama kode DAO) di blok 1.192.000, yang membalikkan kontrak DAO yang diretas dan menyebabkan Ethereum dan Ethereum Classic terpisah menjadi dua sistem yang saling berkompetisi.

<DocLink href="/dao/">
  Organisasi otonom terdesentralisasi (DAO)
</DocLink>

### bursa terdesentralisasi (DEX) {#dex}

Jenis [dapp](#dapp) yang memungkinkan Anda menukar token dengan rekan sejawat di jaringan. Anda memerlukan [ether](#ether) untuk menggunakannya (untuk membayar [biaya transaksi](#transaction-fee)) tapi ini bukan subjek yang tunduk pada pembatasan geografis seperti bursa terpusat – siapa pun bisa berpartisipasi.

<DocLink href="/get-eth/#dex">
  Bursa terdesentralisasi
</DocLink>

### akta {#deed}

Lihat [token yang tidak dapat dipertukarkan (NFT)](#nft).

### kontrak deposit {#deposit-contract}

Pintu gerbang untuk melakukan penaruhan di Ethereum. Kontrak setoran adalah kontrak pintar di Ethereum yang menerima setoran ETH dan mengelola saldo validator. Validator tidak dapat diaktifkan tanpa menyetor ETH ke dalam kontrak ini. Kontrak membutuhkan ETH dan data input. Data input ini termasuk kunci publik validator dan kunci publik penarikan, yang ditandatangani oleh kunci pribadi validator. Data ini diperlukan agar seorang validator dapat diidentifikasi dan disetujui oleh jaringan [bukti taruhan](#pos).

### DeFi {#defi}

Singkatan dari "keuangan terdesentralisasi", sebuah kategori luas dari [dapps](#dapp) yang bertujuan untuk menyediakan layanan keuangan yang didukung rantai blok, tanpa perantara mana pun, sehingga siapa pun yang memiliki koneksi internet dapat berpartisipasi.

<DocLink href="/defi/">
  Keuangan Terdesentralisasi (DeFi)
</DocLink>

### tingkat kesulitan {#difficulty}

Pengaturan jaringan secara keseluruhan dalam jaringan [bukti kerja](#pow) yang mengontrol berapa banyak komputasi rata-rata yang diperlukan untuk menemukan nonce yang valid. Kesulitan diwakili oleh jumlah nol di depan yang diperlukan dalam hash blok yang dihasilkan agar dapat dianggap valid. Konsep ini sudah tidak digunakan lagi di Ethereum sejak transisi ke bukti taruhan.

### bom kesulitan {#difficulty-bomb}

Kenaikan eksponensial yang direncanakan dalam pengaturan [tingkat kesulitan](#difficulty) [bukti kerja](#pow) yang dirancang untuk memotivasi transisi ke [bukti taruhan](#pos), mengurangi kemungkinan terjadinya [garpu](#hard-fork). Bom kesulitan ditinggalkan dengan [transisi ke bukti taruhan](/roadmap/merge).

### tanda tangan digital {#digital-signatures}

Data string pendek yang dibuat pengguna untuk dokumen yang menggunakan [kunci pribadi](#private-key) sehingga siapa pun dengan [kunci publik](#public-key), tanda tangan, dan dokumen yang sesuai dapat memverifikasi bahwa (1) dokumennya "ditandatangani" oleh pemilik dari kunci privat tersebut, dan (2) dokumen tidak diubah setelah ditandatangani.

<Divider />

### penemuan {#discovery}

Proses di mana sebuah node Ethereum menemukan simpul lain untuk terhubung.

### tabel hash terdistribusi (DHT) {#distributed-hash-table}

Struktur data yang berisi pasangan `(key, value)` yang digunakan oleh simpul Ethereum untuk mengidentifikasi rekan-rekan yang akan dihubungkan dan menentukan protokol mana yang akan digunakan untuk berkomunikasi.

### pengeluaran ganda {#double-spend}

Sebuah garpu rantai blok yang disengaja, di mana seorang pengguna dengan kekuatan penambangan/taruhan yang cukup besar mengirimkan sebuah transaksi yang memindahkan sejumlah mata uang di luar rantai (contoh: keluar ke dalam uang fiat atau melakukan pembelian di luar rantai) dan kemudian mengorganisasi ulang rantai blok untuk menghapus transaksi tersebut. Pembelanjaan ganda yang berhasil membuat penyerang memiliki aset di dalam dan di luar rantai.

## E {#section-e}

### algoritma tanda tangan digital kurva eliptik (ECDSA) {#ecdsa}

Algoritma kriptografi yang digunakan oleh Ethereum untuk memastikan bahwa dana yang tersedia hanya dapat dipakai oleh pemiliknya. Ini adalah metode yang lebih disukai untuk membuat kunci publik dan pribadi. Cocok untuk pembuatan [alamat](#address) akun dan verifikasi [transaksi](#transaction).

### enkripsi {#encryption}

Enkripsi adalah konversi data elektronik ke dalam bentuk yang tidak dapat dibaca oleh siapa pun kecuali pemilik kunci dekripsi yang benar.

### entropi {#entropy}

Dalam konteks kriptografi, entropi berarti kurangnya prediktabilitas atau tingkat keserampangan. Saat membuat informasi rahasia, seperti [kunci pribadi](#private-key), algoritma biasanya bergantung pada sumber entropi tinggi untuk memastikan output menjadi tidak dapat diprediksi.

### jangka waktu {#epoch}

Sebuah periode dari 32 [ruang](#slot), setiap slotnya berdurasi 12 detik, dengan total 6,4 menit. [Komite](#committee) validator diacak setiap jangka waktu untuk alasan keamanan. Setiap jangka waktu memiliki kesempatan untuk rantai menjadi [terfinalisasi](#finality). Setiap validator diberi tanggung jawab baru pada awal setiap jangka waktu.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Bukti taruhan
</DocLink>

### penghindaran {#equivocation}

Seorang validator mengirimkan dua pesan yang saling bertentangan. Salah satu contoh sederhana adalah pengirim transaksi yang mengirimkan dua transaksi dengan nonce yang sama. Yang lainnya adalah pengusul blok yang mengajukan dua blok pada ketinggian blok yang sama (atau untuk ruang yang sama).

### Eth1 {#eth1}

'Eth1' adalah istilah yang merujuk pada Jaringan Utama Ethereum, rantai blok bukti kerja yang telah ada. Istilah ini sudah tidak dipakai dan digantikan dengan 'lapisan eksekusi'. [Pelajari selengkapnya mengenai perubahan nama tersebut](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Selengkapnya tentang peningkatan Ethereum
</DocLink>

### Eth2 {#eth2}

'Eth2' adalah istilah yang merujuk pada sebuah set peningkatan protokol Ethereum, termasuk transisi Ethereum ke bukti taruhan. Istilah ini sudah tidak dipakai dan digantikan dengan 'lapisan konsensus'. [Pelajari selengkapnya mengenai perubahan nama tersebut](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Selengkapnya tentang peningkatan Ethereum
</DocLink>

### Proposal peningkatan Ethereum (EIP) {#eip}

Dokumen desain yang menyediakan informasi bagi komunitas Ethereum, yang menjelaskan fitur baru yang diusulkan atau proses atau lingkungannya (lihat [ERC](#erc)).

<DocLink href="/eips/">
  Pengantar EIP
</DocLink>

### Layanan Nama Ethereum (ENS) {#ens}

Pendaftaran ENS adalah [kontrak](#smart-contract) sentral tunggal yang menyediakan pemetaan dari nama domain hingga pemilik dan penyelesai, seperti yang dijelaskan dalam [EIP](#eip) 137.

[Baca lebih lanjut di ens.domains](https://ens.domains)

### klien eksekusi {#execution-client}

Klien eksekusi (sebelumnya dikenal sebagai "klien Eth1"), seperti Besu, Erigon, Go-Ethereum (Geth), Nethermind, bertugas memproses dan menyiarkan transaksi dan mengelola status Ethereum. Mereka menjalankan komputasi untuk setiap transaksi menggunakan [Mesin Virtual Ethereum](#evm) untuk memastikan bahwa aturan protokol diikuti.

### lapisan eksekusi {#execution-layer}

Lapisan eksekusi Ethereum merupakan jaringan untuk [klien eksekusi](#execution-client).

### akun dengan kepemilikan eksternal (EOA) {#eoa}

Akun yang dimiliki secara eksternal (EOA) adalah [akun](#account) yang dikontrol oleh [kunci pribadi](#private-key), biasanya dihasilkan menggunakan [frase benih](#hd-wallet-seed). Tidak seperti kontrak pintar, akun yang dimiliki secara eksternal adalah akun tanpa kode apa pun yang terkait dengannya. Biasanya akun-akun ini dikelola dengan [dompet](#wallet).

### Permintaan Ethereum untuk Komentar (ERC) {#erc}

Label yang diberikan ke beberapa [EIP](#eip) yang berusaha untuk menentukan standar spesifik penggunaan Ethereum.

<DocLink href="/eips/">
  Pengantar EIP
</DocLink>

### Ethash {#ethash}

Sebuah algoritma [bukti kerja](#pow) yang digunakan pada Ethereum sebelum bertransisi ke [bukti taruhan](#pos).

[Baca lebih lanjut](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)

### ether {#ether}

Mata uang kripto asli yang digunakan oleh ekosistem Ethereum, yang mencakup biaya [gas](#gas) saat mengeksekusi transaksi. Juga tertulis sebagai ETH atau simbolnya Ξ, huruf besar Yunani untuk karakter Xi.

<DocLink href="/eth/">
  Mata uang untuk masa depan digital kita
</DocLink>

### aksi {#events}

Memungkinkan penggunaan fasilitas pembuatan log [EVM](#evm). [Dapps](#dapp) bisa mendengarkan aksi dan menggunakannya untuk memicu pemanggilan kembali JavaScript dalam antarmuka pengguna.

<DocLink href="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Aksi dan Log
</DocLink>

### Mesin Virtual Ethereum (EVM) {#evm}

Mesin virtual berbasis tumpukan yang mengeksekusi [kode bita](#bytecode). Dalam Ethereum, model eksekusi menentukan cara state sistem dimodifikasi sesuai rangkaian instruksi kode bita dan tupel kecil data lingkungan. Cara ini ditentukan melalui sebuah model formal dari mesin state virtual.

<DocLink href="/developers/docs/evm/">
  Mesin Virtual Ethereum
</DocLink>

### Bahasa perakitan EVM {#evm-assembly-language}

Bentuk [kode bita](#bytecode) EVM yang dapat dibaca manusia.

<Divider />

## F {#section-f}

### fungsi fallback {#fallback-function}

Fungsi default yang dipanggil saat tidak ada data atau nama fungsi yang dideklarasikan.

### keran {#faucet}

Layanan yang dilaksanakan lewat [kontrak pintar](#smart-contract) yang mengeluarkan dana dalam bentuk ether uji coba gratis yang bisa digunakan dalam satu jaringan percobaan.

<DocLink href="/developers/docs/networks/#testnet-faucets">
  Keran jaringan percobaan
</DocLink>

### finalitas {#finality}

Finalitas adalah jaminan bahwa serangkaian transaksi sebelum waktu yang ditentukan tidak akan berubah dan tidak bisa dibalikkan.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#finality">
  Finalitas bukti taruhan
</DocLink>

### finney {#finney}

Denominasi [ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### garpu {#fork}

Perubahan protokol yang menyebabkan terciptanya rantai alternatif atau divergensi temporal menjadi dua jalur blok potensial.

### algoritma pilihan garpu {#fork-choice-algorithm}

Algoritma tersebut digunakan untuk mengidentifikasi kepala rantai blok. Pada lapisan eksekusi, kepala rantai diidentifikasikan sebagai yang memiliki tingkat kesulitan tertinggi dibaliknya. Ini berarti kepala rantai sebenarnya adalah yang memerlukan paling banyak pekerjaan untuk menambangnya. Pada lapisan konsensus, algoritma mengobservasi atestasi yang diakumulasi dari validator ([LMD_GHOST](#lmd-ghost)).

### bukti penipuan {#fraud-proof}

Model keamanan untuk solusi [lapisan ke-2](#layer-2) tertentu di mana, untuk meningkatkan kecepatan, transaksi di-[roll up](#rollups) ke dalam kelompok dan dikirimkan ke Ethereum dalam transaksi tunggal. Bukti penipuan ini dianggap valid tapi bisa ditentang jika ada kecurigaan penipuan. Bukti penipuan kemudian akan menjalankan transaksi untuk memeriksa apakah penipuan terjadi. Metode ini meningkatkan kemungkinan jumlah transaksi sekaligus mempertahankan keamanan. Beberapa [rollup](#rollups) menggunakan [bukti validitas](#validity-proof).

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Rollup Optimistic
</DocLink>

### garis depan {#frontier}

Fase pengembangan uji coba awal Ethereum, yang berlangsung dari Juli 2015 sampai Maret 2016.

<Divider />

## G {#section-g}

### gas {#gas}

Bahan bakar virtual yang digunakan di Ethereum untuk mengeksekusi kontrak pintar. [EVM](#evm) menggunakan mekanisme akuntansi untuk mengukur pemakaian gas dan membatasi pemakaian dengan menghitung sumber daya (lihat [Lengkap secara Turing](#turing-complete)).

<DocLink href="/developers/docs/gas/">
  Gas dan Biaya
</DocLink>

### batas gas {#gas-limit}

Jumlah maksimum [gas](#gas) yang mungkin dipakai oleh [transaksi](#transaction) atau [blok](#block).

### harga gas {#gas-price}

Harga dalam ether untuk satu unit gas yang ditentukan dalam transaksi.

### blok genesis {#genesis-block}

Blok pertama di [rantai blok](#blockchain), digunakan untuk menginisialisasi jaringan tertentu dan mata uang kriptonya.

### geth {#geth}

Go Ethereum. Salah satu implementasi protokol Ethereum yang paling menonjol, ditulis dalam bahasa Go.

[Baca lebih lanjut di geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Singkatan untuk gigawei, sebuah denominasi [ether](#ether), biasanya digunakan untuk memberi harga pada [gas](#gas). 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### garpu keras {#hard-fork}

Perbedaan permanen dalam [rantai blok](#blockchain); juga dikenal sebagai perubahan garpu keras. Garpu ini biasanya muncul saat node yang tak ditingkatkan tidak bisa memvalidasi blok yang dibuat oleh simpul yang ditingkatkan yang mengikuti [aturan konsensus](#consensus-rules) yang lebih baru. Jangan dirancukan dengan garpu, garpu halus, garpu perangkat lunak, atau garpu Git.

### hash {#hash}

Sidik jari input berukuran variabel yang panjangnya tetap, dihasilkan oleh fungsi hash. (Lihat [keccak-256](#keccak-256)).

### hashrate {#hash-rate}

Jumlah perhitungan hash yang dibuat per detik oleh komputer yang menjalankan perangkat lunak penambangan.

### Dompet HD {#hd-wallet}

[Dompet](#wallet) yang menggunakan pembuatan kunci dan protokol transfer hierarchical deterministic (HD).

[Baca lebih lanjut di github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### Benih dompet HD {#hd-wallet-seed}

Nilai yang digunakan untuk membuat [kunci pribadi](#private-key) master dan kode rantai master untuk [dompet](#wallet) HD. Benih dompet dapat diwakili oleh kata mnemonik, yang memudahkan manusia untuk menyalin, membuat cadangan, dan memulihkan kunci pribadi.

### homestead {#homestead}

Tahapan pengembangan kedua Ethereum, yang diluncurkan pada Maret 2016 di blok 1.150.000.

<Divider />

## I {#section-i}

### indeks {#index}

Struktur jaringan yang dimaksudkan untuk mengoptimalkan pembuatan kueri informasi dari seluruh [rantai blok](#blockchain) dengan menyediakan jalur efisien ke sumber penyimpanannya.

### Protokol Alamat Klien Antar Bursa (ICAP) {#icap}

Pengodean alamat Ethereum yang setengah kompatibel dengan pengodean Kode Rekening Bank Internasional (IBAN), menawarkan pengodean alamat Ethereum yang serbaguna, checksum, dan dapat bertukar informasi. Alamat ICAP menggunakan kode negara semu IBAN yang baru- XE, kepanjangan dari "eXtended Ethereum," seperti yang digunakan dalam mata uang nonyurisdiksi (contohnya, XBT, XRP, XCP).

### Zaman Es {#ice-age}

[Garpu keras](#hard-fork) Ethereum di blok 200.000 untuk memperkenalkan peningkatan [tingkat kesulitan](#difficulty) eksponensial (alias [bom kesulitan](#difficulty-bomb)), mendorong transisi ke [bukti taruhan](#pos).

### lingkungan pengembangan terintegrasi (IDE) {#ide}

Antarmuka pengguna yang biasanya menggabungkan editor, pengompilasi, waktu eksekusi, dan debugger kode.

<DocLink href="/developers/docs/ides/">
  Lingkungan Pengembangan Terintegrasi
</DocLink>

### masalah kode yang disebarkan bersifat abadi {#immutable-deployed-code-problem}

Setelah kode [kontrak](#smart-contract) (atau [pustaka](#library)) disebarkan, kode menjadi abadi. Cara pengembangan perangkat lunak standar bergantung pada kemampuan untuk memperbaiki potensi bug dan menambahkan fitur baru, sehingga ini merupakan tantangan untuk pengembangan kontrak pintar.

<DocLink href="/developers/docs/smart-contracts/deploying/">
  Menggunakan Kontrak Pintar
</DocLink>

### transaksi internal {#internal-transaction}

[Transaksi](#transaction) yang dikirim dari [akun kontrak](#contract-account) ke akun kontrak lainnya atau [EOA](#eoa) (lihat [pesan](#message)).

<Divider />

### penerbitan

Pencetakan ether baru untuk memberi imbalan pada proposal blok, pengesahan, dan pelaporan.

## K {#section-k}

### fungsi derivasi kunci (KDF) {#kdf}

Juga dikenal sebagai "algoritma perentangan kata sandi", ini digunakan oleh format [penyimpanan kunci](#keystore-file) untuk melawan serangan pemaksaan, kamus, dan tabel pelangi pada enkripsi frasa kata sandi, dengan secara berulang membuat hash dari frasa kata sandinya.

<DocLink href="/developers/docs/smart-contracts/security/">
  Keamanan kontrak pintar
</DocLink>

### toko kunci {#keyfile}

Setiap pasangan kunci pribadi/alamat akun ada sebagai sebuah file kunci tunggal dalam klien Ethereum. Ini adalah file teks JSON yang berisi kunci pribadi terenkripsi dari akun, yang hanya bisa didekripsi dengan kata sandi yang dimasukkan saat pembuatan akun.

### keccak-256 {#keccak-256}

Fungsi [hash](#hash) kriptografi yang digunakan di Ethereum. Keccak-256 distandardisasi sebagai [SHA](#sha)-3.

<Divider />

## L {#section-l}

### lapisan 2 {#layer-2}

Area pengembangan yang berpusat pada peningkatan pembuatan lapisan di atas protokol Ethereum. Peningkatan ini terkait dengan kecepatan [transaksi](#transaction), [biaya transaksi](#transaction-fee) yang lebih murah, dan privasi transaksi.

<DocLink href="/layer-2/">
  Lapisan 2
</DocLink>

### LevelDB {#level-db}

Penyimpan nilai kunci pada disk sumber terbuka, yang diimplementasikan sebagai [pustaka](#library) berbobot ringan, bertujuan tunggal, dengan pengaitan ke banyak platform.

### pustaka {#library}

Tipe [kontrak](#smart-contract) spesial yang tidak memiliki fungsi yang dapat dibayar, fungsi fallback, dan penyimpanan data. Oleh karena itu, tidak bisa menerima atau menampung ether, atau menyimpan data. Sebuah pustaka yang sebelumnya berfungsi sebagai kode yang disebarkan yang dapat dipanggil kontrak lainnya untuk komputasi yang hanya dapat dibaca.

<DocLink href="/developers/docs/smart-contracts/libraries/">
  Pustaka Kontrak Pintar
</DocLink>

### klien ringan {#light-client}

Klien Ethereum yang tidak menyimpan salinan lokal dari [rantai blok](#blockchain), atau memvalidasi blok dan [transaksi](#transaction). Menawarkan fungsi [dompet](#wallet) dan bisa membuat dan menyiarkan transaksi.

<Divider />

### LMD_GHOST {#lmd-ghost}

[Algoritma pilihan garpu](#fork-choice-algorithm) yang digunakan oleh klien konsensus Ethereum untuk mengidentifikasi kepala rantai. LMD-GHOST adalah singkatan dari "Latest Message Driven Greediest Heaviest Observed SubTree" yang Didorong oleh Pesan Terakhir, yang berarti bahwa kepala rantai adalah blok dengan akumulasi [pengesahan](#attestation) terbanyak dalam riwayat rantai tersebut.

## M {#section-m}

### Jaringan Utama {#mainnet}

Singkatan dari "jaringan utama", ini adalah [rantai blok](#blockchain) Ethereum publik yang utama. ETH nyata, nilai nyata, dan konsekuensi nyata. Juga dikenal sebagai lapisan ke-1 apabila membahas solusi penskalaan [lapisan ke-2](#layer-2). (Selain itu, lihat [jaringan percobaan](#testnet)).

<DocLink href="/developers/docs/networks/">
  Jaringan Ethereum
</DocLink>

### memori-keras {#memory-hard}

Fungsi memory-hard adalah proses yang mengalami penurunan kecepatan atau kelayakan secara drastis apabila terjadi penurunan jumlah memori yang tersedia, meskipun hanya berkurang sedikit. Contohnya adalah algoritma penambangan Ethereum [Ethash](#ethash).

### Pohon Merkle Patricia {#merkle-patricia-tree}

Struktur data yang digunakan di Ethereum untuk menyimpan pasangan nilai-kunci dengan efisien.

### message {#message}

[Transaksi internal](#internal-transaction) yang tidak pernah diurutkan dan hanya dikirim di dalam [EVM](#evm).

### pemanggilan message {#message-call}

Tindakan meneruskan [message](#message) dari satu akun ke akun lainnya. Jika akun tujuan dikaitkan dengan kode [EVM](#evm), maka VM tersebut akan dimulai dengan keadaan objek tersebut, lalu message akan dijalankan.

### Metropolis {#metropolis}

Tahapan pengembangan ketiga Ethereum, yang diluncurkan pada Oktober 2017.

### penambangan {#mining}

Proses melakukan hashing pada header blok secara berulang sambil meningkatkan [nonce](#nonce) hingga hasilnya mengandung sejumlah angka tertentu yang terdiri dari nol biner di depannya. Proses ini adalah cara untuk menambahkan [blok](#block) ke [rantai blok](#blockchain) bukti kerja. Cara ini digunakan untuk mengamankan Ethereum sebelum beralih ke [bukti taruhan](#pos).

### penambang {#miner}

[Simpul](#node) jaringan yang menemukan [bukti kerja](#pow) yang valid untuk blok baru, melalui cara hashing dengan lintasan berulang (lihat [Ethash](#ethash)). Para penambang tidak lagi menjadi bagian dari Ethereum - mereka digantikan oleh validator ketika Ethereum beralih ke [bukti taruhan](#pos).

<DocLink href="/developers/docs/consensus-mechanisms/pow/mining/">
  Penambangan
</DocLink>

### cetak {#mint}

Minting adalah proses membuat token baru dan memasukkannya ke peredaran agar dapat digunakan. Mekanisme ini terdesentralisasi untuk membuat token baru tanpa keterlibatan otoritas pusat.

<Divider />

## N {#section-n}

### jaringan {#network}

Mengacu pada jaringan Ethereum, jaringan peer-to-peer yang menyebarkan transaksi dan blok ke setiap simpul Ethereum (peserta jaringan).

<DocLink href="/developers/docs/networks/">
  Jaringan
</DocLink>

### tingkat hash jaringan {#network-hashrate}

[Tingkast hash](#hashrate) gabungan yang dihasilkan oleh seluruh jaringan penambangan. Penambangan di Ethereum dinonaktifkan setelah Ethereum beralih ke [bukti taruhan](#pos).

### token yang tidak dapat dipertukarkan (NFT) {#nft}

Standar token yang juga dikenal sebagai "deed" ini diperkenalkan pada proposal ERC-721. NFT bisa dilacak dan diperdagangkan, tetapi setiap token bersifat unik dan berbeda; token ini tidak dapat dipertukarkan seperti ETH dan [token ERC-20](#token-standard). NFT bisa menunjukkan kepemilikan aset digital atau fisik.

<DocLink href="/nft/">
  Token yang Tidak Dapat Dipertukarkan (NFT)
</DocLink>
<DocLink href="/developers/docs/standards/tokens/erc-721/">
  Standar Token yang Tidak Dapat Dipertukarkan ERC-721
</DocLink>

### simpul {#node}

Klien perangkat lunak yang berpartisipasi dalam jaringan.

<DocLink href="/developers/docs/nodes-and-clients/">
  Simpul dan Klien
</DocLink>

### nonce {#nonce}

Nilai dalam kriptografi yang hanya boleh digunakan satu kali. Nonce akun adalah penghitung transaksi di setiap akun, yang digunakan untuk mencegah serangan replay.

<Divider />

## O {#section-o}

### blok ommer (paman) {#ommer}

Ketika seorang [penambang](#miner) bukti kerja menemukan [blok](#block) yang valid, penambang lain mungkin telah mempublikasikan blok pesaing yang ditambahkan terlebih dahulu ke ujung rantai blok. Blok yang valid tapi sudah usang ini dapat dimasukkan pada blok yang lebih baru sebagai _ommer_ dan menerima setengah dari imbalan blok. Istilah "ommer" adalah istilah netral secara gender yang lebih disukai untuk menyebut saudara dari blok induk, tapi kadang-kadang juga disebut sebagai "paman". Hal tersebut relevan untuk Ethereum ketika masih menggunakan jaringan [bukti kerja](#pow) tetapi ommer bukanlah fitur dari Ethereum [bukti taruhan](#pos) karena hanya satu pengusul blok yang dipilih di setiap slot.

### penggabungan yang optimis {#optimistic-rollup}

[Penggabungan](#rollups) transaksi yang menggunakan [bukti penipuan](#fraud-proof) untuk menawarkan peningkatan keluaran transaksi [lapisan ke-2](#layer-2), sambil menggunakan keamanan yang disediakan oleh [Jaringan Utama](#mainnet) (lapisan ke-1). Tidak seperti [Plasma](#plasma), solusi lapisan ke-2 yang serupa, rollup optimis dapat menangani jenis transaksi yang lebih rumit – segala hal yang dapat dilakukan di [EVM](#evm). Rollup ini memang memiliki masalah latensi jika dibandingkan dengan [Rollup tanpa pengetahuan](#zk-rollups) karena transaksi bisa ditantang lewat bukti penipuan.

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Rollup Optimistic
</DocLink>

### Oracle {#oracle}

Oracle adalah jembatan antara [rantai blok](#blockchain) dan dunia nyata. Oracle berperan sebagai [API](#api) di dalam rantai yang dapat dikirimkan kueri untuk meminta informasi dan digunakan pada [kontrak pintar](#smart-contract).

<DocLink href="/developers/docs/oracles/">
  Oracle
</DocLink>

<Divider />

## P {#section-p}

### parity {#parity}

Salah satu implementasi kemampuan dukungan operasi yang paling menonjol pada perangkat lunak klien Ethereum.

### teman sebaya {#peer}

Komputer terhubung yang menjalankan perangkat lunak klien Ethereum dengan salinan identik [rantai blok](#blockchain).

### jaringan peer to peer {#peer-to-peer-network}

Jaringan komputer ([peer](#peer)) yang secara kolektif dapat menjalankan fungsionalitas tanpa memerlukan layanan terpusat berbasis server.

### Plasma {#plasma}

Solusi penskalaan di luar rantai yang menggunakan [bukti penipuan](#fraud-proof), seperti [Rollup optimis](#optimistic-rollups). Plasma dibatasi pada transaksi sederhana seperti transfer dan penukaran token biasa.

<DocLink href="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### kunci pribadi (kunci rahasia) {#private-key}

Angka rahasia yang digunakan oleh pengguna Ethereum untuk membuktikan kepemilikan akun atau kontrak, dengan menghasilkan tanda tangan digital (lihat [kunci publik](#public-key), [alamat](#address), [ECDSA](#ecdsa)).

### rantai pribadi {#private-chain}

Rantai blok yang sepenuhnya pribadi, yaitu rantai blok dengan akses yang berizin dan tidak tersedia untuk digunakan oleh publik.

### bukti taruhan (PoS) {#pos}

Metode yang digunakan oleh protokol rantai blok mata uang kripto untuk mencapai [konsensus](#consensus) terdistribusi. PoS meminta pengguna membuktikan kepemilikan sejumlah mata uang kripto tertentu ("taruhan" pengguna di jaringan) agar dapat berpartisipasi dalam validasi transaksi.

<DocLink href="/developers/docs/consensus-mechanisms/pos/">
  Bukti taruhan
</DocLink>

### bukti kerja (PoW) {#pow}

Sepotong data (bukti) yang membutuhkan komputasi yang signifikan untuk dapat ditemukan.

<DocLink href="/developers/docs/consensus-mechanisms/pow/">
  Bukti kerja
</DocLink>

### kunci publik {#public-key}

Angka, yang diturunkan melalui fungsi satu arah dari [kunci pribadi](#private-key), yang dapat dibagikan secara pubik dan digunakan oleh siapa pun untuk memverifikasi tanda tangan digital yang dibuat dengan kunci pribadi yang sesuai.

<Divider />

## R {#section-r}

### tanda terima {#receipt}

Data yang dihasilkan oleh klien Ethereum untuk mewakili hasil dari [transaksi](#transaction) tertentu, termasuk [hash](#hash) pada transaksi, nomor [blok](#block)nya, jumlah [gas](#gas) yang dipakai, dan, dalam hal penyebaran [kontrak pintar](#smart-contract), [alamat](#address) kontrak.

### serangan re-entrancy {#re-entrancy-attack}

Serangan yang memiliki ciri pemanggilan fungsi kontrak korban oleh kontrak penyerang dengan cara yang sedemikian rupa sehingga pada saat dijalankan, korban akan memanggil kontrak penyerang lagi secara berulang. Hal ini dapat mengakibatkan, misalnya, pencurian dana dengan melewatkan bagian ketika kontrak korban memperbarui saldo atau menghitung jumlah penarikan.

<DocLink href="/developers/docs/smart-contracts/security/#re-entrancy">
  Re-entrancy
</DocLink>

### imbalan {#reward}

Sejumlah ether yang dimasukkan ke dalam setiap blok baru sebagai imbalan oleh jaringan untuk [penambang](#miner) yang menemukan solusi [bukti kerja](#pow).

### Prefiks Panjang Rekursif (RLP) {#rlp}

Standar pengodean yang dirancang oleh pengembang Ethereum untuk mengodekan dan mengurutkan objek (stuktur data) dengan kompleksitas dan panjang sembarang.

### rollup {#rollups}

Jenis solusi penskalaan [lapisan ke-2](#layer-2) yang membuat beberapa batch atas sejumlah transaksi dan mengirimkannya ke [rantai utama Ethereum](#mainnet) dalam satu transaksi tunggal. Dengan cara ini, penurunan biaya [gas](#gas) dan peningkatan keluaran [transaksi](#transaction) dapat dilakukan. Ada Rollup optimis dan Rollup tanpa pengetahuan yang menggunakan metode keamanan berbeda untuk memberikan perolehan pada skalabilitas ini.

<DocLink href="/developers/docs/scaling/#rollups">
  Rollup
</DocLink>

<Divider />

### RPC {#rpc}

**Remote procedure call (RPC)** adalah protokol yang digunakan oleh suatu program untuk meminta layanan dari program yang terletak di komputer lain di suatu jaringan tanpa harus memahami detail jaringan tersebut.

## S {#section-s}

### Algoritma Hash Aman (SHA) {#sha}

Kelompok fungsi hash kriptografi yang diterbitkan oleh National Institute of Standards and Technology (NIST).

### Serenity {#serenity}

Tahapan pengembangan Ethereum yang memulai serangkaian penskalaan dan peningkatan berkelanjutan, yang sebelumnya dikenal sebagai 'Ethereum 2.0', atau 'Eth2'.

<DocLink href="/roadmap/">
  Peningkatan Ethereum
</DocLink>

### serialisasi {#serialization}

Proses mengubah struktur data menjadi urutan bita.

### pecahan / rantai pecahan {#shard}

Rantai pecahan adalah bagian-bagian diskret dari total rantai blok yang dapat ditempatkan ke subset validator untuk menjadi tanggung jawabnya. Cara ini akan menawarkan peningkatan keluaran transaksi untuk Ethereum dan meningkatkan ketersediaan data untuk solusi [lapisan ke-2](#layer-2) seperti [penggabungan yang optimis](#optimistic-rollups) dan [rollup tanpa pengetahuan](#zk-rollups).

<DocLink href="/roadmap/danksharding">
  Danksharding
</DocLink>

### rantai samping {#sidechain}

Solusi penskalaan yang menggunakan rantai terpisah dengan [aturan konsensus](#consensus-rules) yang berbeda dan sering kali lebih cepat. Diperlukan jembatan untuk menghubungkan rantai samping ini ke [Jaringan Utama](#mainnet). [Rollup](#rollups) juga menggunakan rantai samping, tetapi rollup beroperasi dengan kolaborasi bersama [Jaringan Utama](#mainnet), bukan dengan rantai samping.

<DocLink href="/developers/docs/scaling/sidechains/">
  Sidechain
</DocLink>

### penandatanganan {#signing}

Mempertunjukkan secara kriptografi bahwa transaksi telah disetujui oleh pemegang kunci pribadi tertentu.

### singleton {#singleton}

Istilah pemrograman komputer yang menggambarkan objek yang hanya dapat berisi satu instans tunggal.

### slasher {#slasher}

Slasher adalah entitas yang memindai pengesahan untuk mencari pelanggaran yang dapat dipotong. Pemotongan disebarkan ke jaringan, dan pengusul blok berikutnya menambahkan bukti ke blok tersebut. Pengusul blok kemudian menerima imbalan karena telah memotong validator jahat.

### celah {#slot}

Sebuah periode waktu (12 detik) agar blok-blok baru dapat diajukan oleh [validator](#validator) dalam sistem [bukti taruhan](#pos). Ruang boleh kosong. 32 ruang membentuk satu [jangka waktu](#epoch).

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Bukti taruhan
</DocLink>

### kontrak pintar {#smart-contract}

Program yang berjalan pada infrastruktur komputasi Ethereum.

<DocLink href="/developers/docs/smart-contracts/">
  Pengantar kontrak pintar
</DocLink>

### SNARK {#snark}

Singkatan dari "argumen pengetahuan yang ringkas dan tidak interaktif", SNARK adalah sejenis [bukti tanpa pengetahuan](#zk-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollup zero-knowledge
</DocLink>

### garpu halus {#soft-fork}

Pemisahan dalam [rantai blok](#blockchain) yang terjadi ketika [aturan konsensus](#consensus-rules) berubah. Berbeda dengan [garpu keras](#hard-fork), garpu halus bersifat kompatibel mundur; simpul yang telah ditingkatkan dapat memvalidasi blok yang dibuat oleh simpul yang belum ditingkatkan selama simpul tersebut mengikuti aturan konsensus baru.

### Solidity {#solidity}

Bahasa pemrograman prosedural (imperatif) dengan sintaksis yang serupa dengan JavaScript, C++, atau Java. Bahasa paling populer dan paling sering digunakan untuk [kontrak pintar](#smart-contract) Ethereum. Diciptakan oleh Dr. Gavin Wood.

<DocLink href="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Perakitan inline Solidity {#solidity-inline-assembly}

Bahasa perakitan [EVM](#evm) di program [Solidity](#solidity). Dukungan Solidity untuk kode assembly dalam baris mempermudah penulisan operasi tertentu.

### Spurious Dragon {#spurious-dragon}

[Garpu keras](#hard-fork) dari blockchain Ethereum, yang muncul di blok 2.675.000 untuk mengatasi lebih banyak vektor serangan penolakan layanan dan state yang bersih (lihat [Tangerine Whistle](#tangerine-whistle)). Juga merupakan mekanisme perlindungan terhadap serangan replay (lihat [nonce](#nonce)).

### koin stabil {#stablecoin}

[Token ERC-20](#token-standard) dengan nilai yang dipatok ke nilai aset lainnya. Ada stablecoin yang didukung oleh mata uang fiat seperti dolar, logam mulia seperti emas, dan mata uang kripto lainnya seperti Bitcoin.

<DocLink href="/eth/#tokens">
  ETH bukan satu-satunya kripto pada Ethereum
</DocLink>

### penaruhan {#staking}

Menyetorkan sejumlah [ether](#ether) (taruhan Anda) untuk menjadi validator dan mengamankan [jaringan](#network). Validator memeriksa [transaksi](#transaction) dan mengusulkan [blok](#block) dalam model konsensus [bukti taruhan](#pos). Penaruhan memberi Anda insentif ekonomi untuk bertindak demi kepentingan utama jaringan. Anda akan mendapatkan imbalan untuk melaksanakan tugas [validator](#validator) Anda, tetapi akan kehilangan ETH dalam jumlah beragam jika tidak melakukannya.

<DocLink href="/staking/">
  Pertaruhkan ETH Anda untuk menjadi validator Ethereum
</DocLink>

### pool penaruhan {#staking-pool}

Gabungan ETH dengan lebih dari satu penaruh Ethereum, digunakan untuk mencapai 32 ETH yang diperlukan untuk mengaktifkan satu set kunci validator. Operator simpul menggunakan kunci-kunci ini untuk berpartisipasi dalam konsensus dan [imbalan blok](#block-reward) akan dibagi di antara pemberi stake yang berkontribusi. Pool staking atau pendelegasian taruhan tidak native pada protokol Ethereum, tetapi banyak solusi yang telah dibangun oleh komunitas.

<DocLink href="/staking/pools/">
  Penaruhan pool
</DocLink>

### STARK {#stark}

Singkatan dari "argumen pengetahuan yang transparan dan dapat diskalakan", STARK adalah salah satu jenis [bukti tanpa pengetahuan](#zk-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollup zero-knowledge
</DocLink>

### keadaan {#state}

Bidikan spontan pada semua saldo dan data pada titik waktu tertentu di rantai blok, biasanya mengacu pada kondisi di blok tertentu.

### kanal state {#state-channels}

Solusi [lapisan ke-2](#layer-2), yang menjadi tempat penyiapan kanal di antara para peserta sehingga mereka dapat bertransaksi dengan bebas dan murah. Hanya [transaksi](#transaction) untuk menyiapkan kanal dan menutup kanal yang akan dikirim ke [Jaringan Utama](#mainnet). Hal ini memungkinkan keluaran transaksi yang sangat tinggi, tetapi memang mengandalkan pengetahuan tentang jumlah peserta sebelumnya dan penguncian dana.

<DocLink href="/developers/docs/scaling/state-channels/#state-channels">
  Kanal state
</DocLink>

### supermayoritas {#supermajority}

Supermayoritas adalah istilah yang diberikan untuk jumlah yang melebihi 2/3 (66%) dari total ether yang dipertaruhkan yang mengamankan Ethereum. Suara supermayoritas diperlukan agar blok dapat [difinalisasi](#finality) pada Rantai Suar.

### menyinkronkan {#syncing}

Proses mengunduh seluruh versi terbaru rantai blok ke sebuah simpul.

### panitia sinkronisasi {#sync-committee}

Panitia sinkronisasi adalah sekelompok [validator](#validator) yang dipilih secara acak yang diperbarui setiap ~27 jam. Tujuan panitia ini adalah menambahkan tanda tangan mereka pada header blok yang valid. Dengan adanya panitia sinkronisasi, [klien ringan](#light-client) dapat melacak kepala rantai blok tanpa perlu mengakses seluruh kumpulan validator.

### szabo {#szabo}

Denominasi [ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

[Garpu keras](#hard-fork) dalam blockchain Ethereum, yang muncul di blok 2.463.000 untuk mengubah perhitungan [gas](#gas) dari operasi intensif I/O tertentu dan untuk membersihkan state yang terkumpul dari serangan penolakan layanan, yang mengeksploitasi biaya gas rendah untuk operasi tersebut.

### tingkat kesulitan total terminal (TTD) {#terminal-total-difficulty}

Tingkat kesulitan total adalah jumlah tingkat kesulitan menambang Ethash untuk semua blok hingga titik tertentu pada rantai blok. Tingkat kesulitan total terminal adalah nilai spesifik untuk tingkat kesulitan total yang digunakan sebagai pemicu bagi klien eksekusi untuk menonaktifkan penambangannya dan memblokir fungsi gosip yang memungkinkan jaringan melakukan transisi ke bukti taruhan.

### jaringan percobaan {#testnet}

Singkatan dari "jaringan percobaan," jaringan yang digunakan untuk menyimulasikan perilaku jaringan Ethereum utama (lihat [Jaringan Utama](#mainnet)).

<DocLink href="/developers/docs/networks/#ethereum-testnets">
  Jaringan percobaan
</DocLink>

### token {#token}

Barang virtual yang dapat diperdagangkan dan didefinisikan di kontrak pintar pada rantai blok Ethereum.

### standar token {#token-standard}

Diperkenalkan oleh proposal ERC-20, standar token menyediakan struktur [kontrak pintar](#smart-contract) terstandardisasi untuk token yang dapat dipertukarkan. Token dari kontrak yang sama bisa dilacak, diperdagangkan, dan dapat dipertukarkan, tidak seperti [NFT](#nft).

<DocLink href="/developers/docs/standards/tokens/erc-20/">
  Standar Token ERC-20
</DocLink>

### transaksi {#transaction}

Data yang di-commit ke Rantai Blok Ethereum dan ditandatangani oleh [akun](#account) pengirim dengan menargetkan [alamat](#address) tertentu. Transaksi berisi metadata seperti [batas gas](#gas-limit) untuk transaksi tersebut.

<DocLink href="/developers/docs/transactions/">
  Transaksi
</DocLink>

### biaya transaksi {#transaction-fee}

Biaya yang harus Anda bayar setiap kali Anda menggunakan jaringan Ethereum. Contohnya termasuk mengirim dana dari [dompet](#wallet) Anda atau interaksi [dapp](#dapp), seperti menukar token atau membeli barang koleksi. Anda bisa menganggapnya seperti biaya layanan. Biaya ini akan berubah berdasarkan seberapa sibuk jaringan. Hal ini disebabkan oleh [validator](#validator), para individu yang bertanggung jawab untuk memproses transaksi Anda, cenderung memprioritaskan transaksi dengan biaya yang lebih tinggi - sehingga kepadatan akan mendorong kenaikan harga.

Pada tingkat teknis, biaya transaksi Anda berhubungan dengan jumlah [gas](#gas) yang dibutuhkan oleh transaksi Anda.

Mengurangi biaya transaksi adalah subjek diskusi yang sangat diminati saat ini. Lihat [Lapisan ke-2](#layer-2).

### keadaan tanpa kepercayaan {#trustlessness}

Kemampuan jaringan untuk memediasi transaksi tanpa perlu ada kepercayaan dari pihak mana pun yang terlibat terhadap pihak ketiga.

### Lengkap secara Turing {#turing-complete}

Sebuah konsep yang dinamai menurut nama matematikawan dan ilmuwan komputer Inggris, Alan Turing - sebuah sistem aturan manipulasi data (seperti set instruksi komputer, bahasa pemrograman, atau automaton seluler) akan disebut sebagai "Lengkap secara Turing" atau "universal secara komputasi" jika sistem tersebut dapat digunakan untuk menyimulasikan setiap mesin Turing.

<Divider />

## V {#section-v}

### validator {#validator}

[Simpul](#node) dalam sistem [bukti taruhan](#pos) yang bertanggung jawab untuk menyimpan data, memproses transaksi, dan menambahkan blok baru ke rantai blok. Untuk mengaktifkan perangkat lunak validator, Anda harus dapat memberi [taruhan](#staking) 32 ETH.

<DocLink href="/developers/docs/consensus-mechanisms/pos">
  Bukti taruhan
</DocLink>
<DocLink href="/staking/">
  Penaruhan di Ethereum
</DocLink>

### siklus hidup validator {#validator-lifecycle}

Urutan keadaan yang dapat dialami oleh validator. Berbagai keadaan ini termasuk:

- disetorkan: Setidaknya 32 ETH telah disetorkan ke [kontrak deposit](#deposit-contract) oleh validator
- ditunda: validator berada dalam antrean aktivasi menunggu untuk dipilih ke dalam jaringan oleh validator yang telah ada
- aktif: saat ini sedang membuktikan dan mengajukan blok
- Pemotongan: validator berperilaku buruk dan sedang dipotong
- keluar: validator telah ditandai untuk keluar dari jaringan, baik secara sukarela atau karena telah dikeluarkan.

### bukti validitas {#validity-proof}

Model keamanan untuk solusi [lapisan ke-2](#layer-2) tertentu di mana, untuk meningkatkan kecepatan, transaksi di-[roll up](/#rollups) ke dalam kelompok dan dikirimkan ke Ethereum dalam transaksi tunggal. Komputasi transaksi dilakukan di luar rantai dan kemudian dipasok ke rantai utama dengan bukti validitasnya. Metode ini meningkatkan kemungkinan jumlah transaksi sekaligus mempertahankan keamanan. Beberapa [rollup](#rollups) menggunakan [bukti penipuan](#fraud-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollup zero-knowledge
</DocLink>

### validium {#validium}

Solusi di luar rantai yang menggunakan [bukti validitas](#validity-proof) untuk meningkatkan keluaran transaksi. Berbeda dengan [Rollup tanpa pengetahuan](#zk-rollup), data validium tidak disimpan di lapisan 1 [Jaringan Utama](#mainnet).

<DocLink href="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Bahasa pemrograman tingkat tinggi dengan sintaksis seperti Phyton. Dimaksudkan agar lebih mendekati bahasa fungsional murni. Diciptakan oleh Vitalik Buterin.

<DocLink href="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### dompet {#wallet}

Perangkat lunak yang menyimpan [kunci pribadi](#private-key). Digunakan untuk mengakses dan mengontrol [akun](#account) Ethereum dan berinteraksi dengan [kontrak pintar](#smart-contract). Kunci tidak perlu disimpan dalam dompet, dan sebagai gantinya dapat diambil dari penyimpanan offline (yaitu, kartu memori atau kertas) untuk meningkatkan keamanan. Berlawanan dengan namanya, dompet tidak pernah menyimpan koin atau token aktual.

<DocLink href="/wallets/">
  Dompet Ethereum
</DocLink>

### Web3 {#web3}

Versi ketiga web. Pertama kali diusulkan oleh Dr. Gavin Wood, Web3 melambangkan visi dan fokus baru untuk aplikasi web - dari aplikasi yang dimiliki dan dikelola secara terpusat menjadi aplikasi yang dibangun di atas protokol terdesentralisasi (lihat [dapp](#dapp)).

<DocLink href="/developers/docs/web2-vs-web3/">
  Web2 vs Web3
</DocLink>

### wei {#wei}

Denominasi terkecil dari [ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### alamat kosong {#zero-address}

Alamat Ethereum, yang seluruhnya terdiri dari angka nol, yang sering digunakan sebagai alamat untuk menghapus token dari sirkulasi token yang ada pemiliknya. Perbedaan dibuat antara token yang secara resmi dihapus dari indeks kontrak pintar melalui metode burn() dan token yang dikirim ke alamat ini.

### bukti tanpa pengetahuan {#zk-proof}

Bukti tanpa pengetahuan adalah metode kriptografi yang memungkinkan individu membuktikan bahwa suatu pernyataan adalah benar tanpa menyampaikan informasi tambahan apa pun.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollup zero-knowledge
</DocLink>

### rollup tanpa pengetahuan {#zk-rollup}

[Penggabungan](#rollups) transaksi yang menggunakan [bukti validitas](#validity-proof) untuk menawarkan peningkatan keluaran transaksi [lapisan ke-2](#layer-2) sambil menggunakan keamanan yang disediakan oleh [Jaringan Utama](#mainnet) (lapisan ke-1). Sekalipun rollup ini tidak bisa menangani jenis transaksi rumit, seperti [Rollup optimis](#optimistic-rollups), rollup ini tidak memiliki masalah latensi karena transaksi terbukti valid saat dikirimkan.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollup tanpa pengetahuan
</DocLink>

<Divider />

## Sumber {#sources}

_Disediakan sebagian melalui [Menguasai Ethereum](https://github.com/ethereumbook/ethereumbook) oleh [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) di bawah CC-BY-SA_

<Divider />

## Berkontribusi untuk halaman ini {#contribute-to-this-page}

Apakah kami melewatkan sesuatu? Apakah ada yang salah? Bantu kami meningkatkan diri dengan berkontribusi kepada glosarium di GitHub!

[Pelajari selengkapnya tentang cara berkontribusi](/contributing/adding-glossary-terms)
