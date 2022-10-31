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

<DocLink to="/developers/docs/accounts">
  Akun Ethereum
</DocLink>

### alamat {#address}

Pada umumnya, akun ini mewakili [EOA](#eoa) atau [kontrak](#contract-accouint) yang dapat menerima (alamat tujuan) atau mengirim (alamat sumber) [transaksi](#transaction) di blockchain. Lebih khusus lagi, ini adalah 160 bit paling kanan dari [hash Keccak](#keccak-256) dari [kunci publik](#public-key) [ECDSA](#ecdsa).

### application binary interface (ABI) {#abi}

Cara standar untuk berinteraksi dengan [kontrak](#contract-account) di ekosistem Ethereum, baik dari luar blockchain maupun untuk interaksi antar kontrak.

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### application programming interface {#api}

Application Programming Interface (API) adalah serangkaian definisi tentang cara menggunakan suatu perangkat lunak. API ada di antara aplikasi dan server web, dan memfasilitasi transfer data di antaranya.

### assert {#assert}

Dalam [Solidity](#solidity), `assert(false)` dikompilasi ke `0xfe`, opcode yang tidak valid, yang menggunakan semua [gas](#gas) dan mengembalikan semua perubahan. Ketika pernyataan `assert()` gagal, sesuatu yang sangat salah dan tidak terduga terjadi, dan anda harus memperbaiki kode Anda. Anda harus menggunakan `assert()` untuk menghindari kondisi yang seharusnya tidak pernah terjadi.

<DocLink to="/developers/docs/smart-contracts/security/">
  Keamanan kontrak pintar
</DocLink>

### pengesahan {#attestation}

Suara validator untuk [Ranta Suar](#beacon-chain) atau [shard](#shard) [blok](#block). Validator harus membuktikan blok, menandakan bahwa mereka setuju dengan status yang diusulkan oleh blok.

<Divider />

## B {#section-b}

### Biaya dasar {#base-fee}

Setiap [blok](#block) memiliki harga minimum yang dikenal sebagai 'harga dasar'. Itu adalah harga [gas](#gas) minimum yang harus dibayar seorang pengguna untuk memasukkan transaksi dalam blok berikutnya.

<DocLink to="/developers/docs/gas/">
  Gas dan biaya
</DocLink>

### Rantai Suar {#beacon-chain}

Peningkatan jaringan yang memperkenalkan lapisan konsensus baru, yang akan menjadi koordinator untuk seluruh jaringan Ethereum. Ini memperkenalkan [bukti taruhan](#pos) dan [validator](#validator) ke Ethereum. Pada akhirnya ini akan tergabung dengan [Jaringan Utama](#mainnet).

<DocLink to="/upgrades/beacon-chain/">
  Rantai Suar
</DocLink>

### big-endian {#big-endian}

Representasi nomor posisi dengan digit paling signifikan berada di urutan pertama dalam memori. Kebalikan dari little-endian, dengan angka penting terkecil berada di urutan pertama.

### blok {#block}

Kumpulan informasi yang diperlukan (header blok) tentang [transaksi](#transaction) yang terdiri dari, dan satu set header blok lainnya yang dikenal sebagai [ommers](#ommer). Blok ditambahkan ke jaringan Ethereum oleh [penambang](#miner).

<DocLink to="/developers/docs/blocks/">
  Block
</DocLink>

### blockchain {#blockchain}

Di Ethereum, urutan [blok](#block) divalidasi oleh sistem [bukti kerja](#pow), masing-masing menautkan ke pendahulunya semua cara ke [blok genesis](#genesis-block). Tidak ada batasan ukuran blok; melainkan menggunakan [batas gas](#gas-limit) yang bervariasi.

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Apa itu Blockchain?
</DocLink>

### kode bita {#bytecode}

Kumpulan instruksi abstrak yang dirancang untuk eksekusi yang efisien oleh penerjemah perangkat lunak atau mesin virtual. Tidak seperti kode sumber yang dapat dibaca manusia, kode bita diekspresikan dalam format numerik.

### Fork Byzantium {#byzantium-fork}

Tipe fork pertama dari dua [fork keras](#hard-fork) untuk fase pengembangan [Metropolis](#metropolis). Fork ini mencakup Penundaan [Bom Kesulitan](#difficulty-bomb) Metropolis EIP-649 dan Pengurangan Imbalan Blok, yaitu dengan cara [Zaman Es](#ice-age) ditunda selama 1 tahun dan imbalan blok dikurangi dari 5 ke 3 ether.

<Divider />

## C {#section-c}

### pos pemeriksaan {#checkpoint}

[Rantai Suar](#beacon-chain) memiliki tempo yang dibagi menjadi beberapa slot (12 detik) dan epoch (32 slot). Slot pertama dalam setiap epoch merupakan pos pemeriksaan. Ketika [supermayoritas](#supermajority) validator membuktikan tautan antara dua pos pemeriksaan, mereka dapat [dibenarkan](#justification) dan ketika pos pemeriksaan lainnya dibenarkan pada tingkat atas, mereka dapat [difinalisasi](#finality).

### mengkompilasi {#compiling}

Mengubah kode yang ditulis dalam bahasa pemrograman tingkat tinggi (seperti [Solidity](#solidity)) menjadi bahasa dengan tingkat yang lebih rendah (seperti [kode bita](#bytecode) EVM).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Mengompilasi Kontrak Pintar
</DocLink>

### panitia {#committee}

Sebuah grup yang terdiri dari minimal 128 [validator](#validator) yang ditetapkan ke suar dan blok shard secara acak oleh [Rantai Suar](#beacon-chain).

### konsensus {#consensus}

Saat semua node yang berjumlah besar (biasanya sebagian besar node di jaringan) memiliki blok yang sama dalam blockchain terbaik yang divalidasi secara lokal. Jangan dirancukan dengan [aturan konsensus](#consensus-rules).

### klien konsensus {#consensus-client}

Klien konsensus (seperti Prysm, Teku, Nimbus, Lightouse, Lodestar) menjalankan algoritma konsensus [bukti taruhan](#pos) Ethereum, yang memungkinkan jaringan mencapai kesepakatan mengenai kepala Rantai Suar. Klien konsensus tidak berpartisipasi dalam memvalidasi/menyiarkan transaksi atau mengeksekusi transisi state. Tindakan ini dilakukan oleh [klien eksekusi](#execution-client).

### lapisan konsensus {#consensus-layer}

Lapisan konsensus Ethereum merupakan jaringan [klien konsensus](#consensus-client).

### aturan konsensus {#consensus-rules}

Aturan validasi blok yang diikuti node penuh untuk tetap dalam konsensus dengan node lainnya. Jangan dirancukan dengan [konsensus](#consensus).

### Fork Konstantinopel {#constantinople-fork}

Bagian kedua dari tahapan [Metropolis](#metropolis), awalnya direncanakan untuk diluncurkan pada pertengahan 2018. Diharapkan untuk mencakup pergeseran ke algoritma konsensus [bukti kerja](#pow)/[bukti taruhan](#pos) hibrida, yang ada di antara perubahan lainnya.

### akun kontrak {#contract-account}

Akun yang berisi kode yang dieksekusi setiap kali menerima satu [transaksi](#transaction) dari [akun](#account) lainnya ([EOA](#eoa) atau [kontrak](#contract-account)).

### transaksi pembuatan kontrak {#contract-creation-transaction}

[Transaksi](#transaction) spesial, dengan [alamat kosong](#zero-address) sebagai penerimanya, yang digunakan untuk mendaftarkan sebuah [kontrak](#contract-account) dan mencatatnya di blockchain Ethereum.

### tautan silang {#crosslink}

Sebuah tautan silang menyediakan ringkasan tentang state shard. Tautan silang berisi cara rantai [shard](#shard) akan berkomunikasi satu sama lain melalui [Rantai Suar](#beacon-chain) dalam [sistem bukti taruhan](#proof-of-stake) yang berbentuk shard.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Bukti taruhan
</DocLink>

<Divider />

## D {#section-d}

### Organisasi Otonom Terdesentralisasi (DAO) {#dao}

Perusahaan atau organisasi lain yang beroperasi tanpa pengelolaan hierarkis. DAO bisa juga mengacu pada sebuah kontrak bernama "The DAO" yang diluncurkan pada 30 April 2016, yang kemudian diretas pada Juni 2016; ini pada akhirnya memotivasi pembuatan [fork keras](#hard-fork) (dengan nama kode DAO) di blok 1.192.000, yang membalikkan kontrak DAO yang diretas dan menyebabkan Ethereum dan Ethereum Classic terpisah menjadi dua sistem yang saling berkompetisi.

<DocLink to="/dao/">
  Organisasi Otonom Terdesentralisasi (DAO)
</DocLink>

### Dapp {#dapp}

Aplikasi terdesentralisasi. Singkatnya, Dapp adalah sebuah [kontrak pintar](#smart-contract) dan antarmuka pengguna web. Lebih luasnya, Dapp adalah aplikasi web yang dibangun di atas layanan infrastruktur peer-to-peer terbuka dan terdesentralisasi. Selain itu, banyak Dapp mencakup penyimpanan terdesentralisasi dan/atau protokol dan platform message.

<DocLink to="/developers/docs/dapps/">
  Pengantar Dapps
</DocLink>

### pertukaran terdesentralisasi (DEX) {#dex}

Jenis [dapp](#dapp) yang memungkinkan Anda menukar token dengan rekan sejawat di jaringan. Anda memerlukan [ether](#ether) untuk menggunakannya (untuk membayar [biaya transaksi](#transaction-fee)) tapi ini bukan subjek yang tunduk pada pembatasan geografis seperti bursa terpusat – siapa pun bisa berpartisipasi.

<DocLink to="/get-eth/#dex">
  Bursa terdesentralisasi
</DocLink>

### deed {#deed}

Lihat [token yang tidak dapat dipertukarkan (NFT)](#nft)

### DeFi {#defi}

Singkatan dari "decentralized finance", sebuah kategori luas dari [dapp](#dapp) yang bertujuan menyediakan layanan keuangan yang didukung blockchain, tanpa perantara mana pun, sehingga siapa pun yang memiliki koneksi internet dapat berpartisipasi.

<DocLink to="/defi/">
  Keuangan Terdesentralisasi (DeFi)
</DocLink>

### tingkat kesulitan {#difficulty}

Pengaturan di seluruh jaringan yang mengontrol berapa banyak komputasi yang dibutuhkan untuk menghasilkan sebuah [bukti kerja](#pow).

### bom kesulitan {#difficulty-bomb}

Peningkatan eksponensial terencana dalam pengaturan [tingkat kesulitan](#difficulty) [bukti kerja](#pow) yang dirancang untuk memotivasi transisi ke [bukti taruhan](#pos), yang mengurangi peluang [fork](#hard-fork)

### tanda tangan digital {#digital-signatures}

Data string pendek yang dibuat pengguna untuk dokumen yang menggunakan [kunci privat](#private-key) sehingga siapa pun dengan [kunci publik](#public-key), tanda tangan, dan dokumen yang sesuai dapat memverifikasi bahwa (1) dokumennya "ditandatangani" oleh pemilik dari kunci privat tersebut, dan (2) dokumen tidak diubah setelah ditandatangani.

<Divider />

## E {#section-e}

### algoritma tanda tangan digital kurva eliptik (ECDSA) {#ecdsa}

Algoritma kriptografik yang digunakan oleh Ethereum untuk memastikan bahwa dana yang tersedia hanya dapat dipakai oleh pemiliknya. Ini adalah metode yang lebih disukai untuk membuat kunci publik dan privat. Cocok untuk pembuatan [alamat](#address) akun dan verifikasi [transaksi](#transaction).

### epoch {#epoch}

Periode waktu 32 [slot](#slot) (6,4 menit) dalam sistem terkoordinasi [Rantai Suar](#beacon-chain). [Komite](#committee) [validator](#validator) diacak pada tiap epoch untuk alasan keamanan. Ada peluang bagi rantai di tiap epoch untuk di [finalisasi](#finality).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Bukti taruhan
</DocLink>

### Eth1 {#eth1}

'Eth1' adalah istilah yang merujuk pada Jaringan Utama Ethereum, blockchain bukti kerja yang telah ada. Istilah ini sudah tidak dipakai dan digantikan dengan 'lapisan eksekusi'. [Pelajari selengkapnya mengenai perubahan nama tersebut](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  Selengkapnya tentang peningkatan Ethereum
</DocLink>

### Eth2 {#eth2}

'Eth2' adalah istilah yang merujuk pada sebuah set peningkatan protokol Ethereum, termasuk transisi Ethereum ke bukti taruhan. Istilah ini sudah tidak dipakai dan digantikan dengan 'lapisan konsensus'. [Pelajari selengkapnya mengenai perubahan nama tersebut](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  Selengkapnya tentang peningkatan Ethereum
</DocLink>

### Proposal Peningkatan Ethereum (EIP) {#eip}

Dokumen desain yang menyediakan informasi bagi komunitas Ethereum, yang menjelaskan fitur baru yang diusulkan atau proses atau lingkungannya (lihat [ERC](#erc)).

<DocLink to="/eips/">
  Pengantar EIP
</DocLink>

### Layanan Nama Ethereum (ENS) {#ens}

Pendaftaran ENS adalah [kontrak](#smart-contract) sentral tunggal yang menyediakan pemetaan dari nama domain hingga pemilik dan penyelesai, seperti yang dijelaskan dalam [EIP](#eip) 137.

[Baca lebih lanjut di ens.domains](https://ens.domains)

### entropi {#entropy}

Dalam konteks kriptografi, entropi berarti kurangnya prediktabilitas atau tingkat keserampangan. Saat membuat informasi rahasia, seperti [kunci privat](#private-key), algoritme biasanya bergantung pada sumber entropi tinggi untuk memastikan output menjadi tidak dapat diprediksi.

### klien eksekusi {#execution-client}

Klien eksekusi (dulu disebut "klien Eth1"), seperti Besu, Erigon, go-ethereum, Nethermind, ditugaskan untuk memroses dan menyiarkan transaksi, serta mengelola status Ethereum. Mereka menjalankan komputasi untuk setiap transaksi di [Mesin Virtual Ethereum](#evm) untuk memastikan bahwa aturan protokol dipatuhi. Sekarang, mereka juga menangani konsensus [bukti kerja](#pow). Setelah transisi ke [bukti taruhan](#pos), mereka akan mendelegasikan tugas tersebut ke klien konsensus.

### lapisan eksekusi {#execution-layer}

Lapisan eksekusi Ethereum merupakan jaringan untuk [klien eksekusi](#execution-client).

### akun dengan kepemilikan eksternal (EOA) {#eoa}

[Akun](#account) yang dibuat oleh atau untuk pengguna manusia di jaringan Ethereum.

### Permintaan Ethereum untuk Komentar (ERC) {#erc}

Label yang diberikan ke beberapa [EIP](#eip) yang berusaha untuk menentukan standar spesifik penggunaan Ethereum.

<DocLink to="/eips/">
  Pengantar EIP
</DocLink>

### Ethash {#ethash}

Algoritma [bukti kerja](#pow) untuk Ethereum 1.0.

[Baca lebih lanjut di eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

Mata uang kripto asli yang digunakan oleh ekosistem Ethereum, yang mencakup biaya [gas](#gas) saat mengeksekusi transaksi. Juga tertulis sebagai ETH atau simbolnya Ξ, huruf besar Yunani untuk karakter Xi.

<DocLink to="/eth/">
  Mata uang untuk masa depan digital kita
</DocLink>

### aksi {#events}

Memungkinkan penggunaan fasilitas pembuatan log [EVM](#evm). [Dapp](#dapp) bisa mendengarkan aksi dan menggunakannya untuk memicu pemanggilan kembali JavaScript dalam antarmuka pengguna.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Aksi dan Log
</DocLink>

### Mesin Virtual Ethereum (EVM) {#evm}

Mesin virtual berbasis tumpukan yang mengeksekusi [kode bita](#bytecode). Dalam Ethereum, model eksekusi menentukan cara state sistem dimodifikasi sesuai rangkaian instruksi kode bita dan tupel kecil data lingkungan. Cara ini ditentukan melalui sebuah model formal dari mesin state virtual.

<DocLink to="/developers/docs/evm/">
  Mesin Virtual Ethereum
</DocLink>

### Bahasa perakitan EVM {#evm-assembly-language}

Bentuk [kode bita](#bytecode) EVM yang dapat dibaca manusia.

<Divider />

## F {#section-f}

### fungsi fallback {#fallback-function}

Fungsi default yang dipanggil saat tidak ada data atau nama fungsi yang dideklarasikan.

### keran {#faucet}

Layanan yang dilaksanakan lewat [kontrak pintar](#smart-contract) yang mengeluarkan dana dalam bentuk ether ujicoba gratis yang bisa digunakan dalam satu testnet.

<DocLink to="/developers/docs/networks/#testnet-faucets">
  Keran Testnet
</DocLink>

### finalitas {#finality}

Finalitas adalah jaminan bahwa serangkaian transaksi sebelum waktu yang ditentukan tidak akan berubah dan tidak bisa dibalikkan.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality">
  Finalitas Bukti Kerja
</DocLink>
<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Finalitas Bukti Taruhan
</DocLink>

### finney {#finney}

Denominasi [ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### fork {#fork}

Perubahan dalam protokol yang menyebabkan pembuatan rantai alternatif, atau perbedaan sementara dalam dua jalur blok potensial selama penambangan.

### algoritma pilihan fork {#fork-choice-algorithm}

Algoritma tersebut digunakan untuk mengidentifikasi kepala blockchain. Pada lapisan eksekusi, kepala rantai diidentifikasikan sebagai yang memiliki tingkat kesulitan tertinggi dibaliknya. Ini berarti kepala rantai sebenarnya adalah yang memerlukan paling banyak pekerjaan untuk menambangnya. Pada lapisan konsensus, algoritma mengobservasi atestasi yang diakumulasi dari validator ([LMD_GHOST](#lmd-ghost)).

### bukti penipuan {#fraud-proof}

Model keamanan untuk solusi [lapisan 2](#layer-2) tertentu di mana, untuk meningkatkan kecepatan, transaksi di-[roll up](#rollups) ke dalam kelompok dan dikirimkan ke Ethereum dalam transaksi tunggal. Mereka dianggap valid tapi bisa ditentang jika ada kecurigaan penipuan. Bukti penipuan kemudian akan menjalankan transaksi untuk memeriksa apakah penipuan terjadi. Metode ini meningkatkan kemungkinan jumlah transaksi sekaligus mempertahankan keamanan. Beberapa [rollup](#rollups) menggunakan [bukti validitas](#validity-proof).

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Rollup Optimistic
</DocLink>

### garis depan {#frontier}

Fase pengembangan uji coba awal Ethereum, yang berlangsung dari Juli 2015 sampai Maret 2016.

<Divider />

## G {#section-g}

### gas {#gas}

Bahan bakar virtual yang digunakan di Ethereum untuk mengeksekusi kontrak pintar. [EVM](#evm) menggunakan mekanisme akuntansi untuk mengukur pemakaian gas dan membatasi pemakaian dengan menghitung sumber daya (lihat [Lengkap secara Turing](#turing-complete)).

<DocLink to="/developers/docs/gas/">
  Gas dan Biaya
</DocLink>

### batas gas {#gas-limit}

Jumlah maksimum [gas](#gas) yang mungkin dipakai oleh [transaksi](#transaction) atau [blok](#block).

### blok genesis {#genesis-block}

Blok pertama di [blockchain](#blockchain), digunakan untuk menginisialisasi jaringan tertentu dan mata uang kriptonya.

### geth {#geth}

Go Ethereum. Salah satu implementasi protokol Ethereum yang paling menonjol, ditulis dalam bahasa Go.

[Baca lebih lanjut di geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Singkatan untuk gigawei, sebuah denominasi [ether](#ether), biasanya digunakan untuk memberi harga pada [gas](#gas). 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### fork keras {#hard-fork}

Perbedaan permanen dalam [rantai blok](#blockchain); juga dikenal sebagai perubahan fork keras. Fork ini biasanya muncul saat node yang tak ditingkatkan tidak bisa memvalidasi blok yang dibuat oleh node yang ditingkatkan yang mengikuti [aturan konsensus](#consensus-rules) yang lebih baru. Jangan dirancukan dengan fork, fork lunak, fork perangkat lunak, atau fork Git.

### hash {#hash}

Sidik jari input berukuran variabel yang panjangnya tetap, dihasilkan oleh fungsi hash. (Lihat [keccak-256](#keccak-256))

### Dompet HD {#hd-wallet}

[Dompet](#wallet) yang menggunakan pembuatan dan protokol pemindahan kunci hierarchical deterministic (HD).

[Baca lebih lanjut di github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### Seed dompet HD {#hd-wallet-seed}

Nilai yang digunakan untuk membuat [kunci privat](#private-key) master dan kode rantai master untuk [dompet](#wallet) HD. Seed dompet dapat diwakili oleh kata mnemonik, yang memudahkan manusia untuk menyalin, membuat cadangan, dan memulihkan kunci privat.

### homestead {#homestead}

Tahapan pengembangan kedua Ethereum, yang diluncurkan pada Maret 2016 di blok 1.150.000.

<Divider />

## I {#section-i}

### indeks {#index}

Struktur jaringan yang dimaksudkan untuk mengoptimalkan pembuatan kueri informasi dari seluruh [blockchain](#blockchain) dengan menyediakan jalur efisien ke sumber penyimpanannya.

### Protokol Alamat Klien Antar Bursa (ICAP) {#icap}

Pengodean alamat Ethereum yang setengah kompatibel dengan pengodean Kode Rekening Bank Internasional (IBAN), menawarkan pengodean alamat Ethereum yang serbaguna, checksum, dan dapat bertukar informasi. Alamat ICAP menggunakan kode negara semu IBAN yang baru- XE, kepanjangan dari "eXtended Ethereum," seperti yang digunakan dalam mata uang nonyurisdiksi (contohnya, XBT, XRP, XCP).

### Zaman Es {#ice-age}

[Fork keras](#hard-fork) Ethereum di blok 200.000 untuk memperkenalkan peningkatan [tingkat kesulitan](#difficulty) eksponensial (alias [bom kesulitan](#difficulty-bomb)), mendorong transisi ke [bukti taruhan](#pos).

### lingkungan pengembangan terintegrasi (IDE) {#ide}

Antarmuka pengguna yang biasanya menggabungkan editor, pengompilasi, waktu eksekusi, dan debugger kode.

<DocLink to="/developers/docs/ides/">
  Lingkungan Pengembangan Terintegrasi
</DocLink>

### masalah kode yang disebarkan bersifat abadi {#immutable-deployed-code-problem}

Setelah kode [kontrak](#smart-contract) (atau [pustaka](#library)) disebarkan, kode menjadi abadi. Cara pengembangan perangkat lunak standar bergantung pada kemampuan untuk memperbaiki potensi bug dan menambahkan fitur baru, sehingga ini merupakan tantangan untuk pengembangan kontrak pintar.

<DocLink to="/developers/docs/smart-contracts/deploying/">
  Menggunakan Kontrak Pintar
</DocLink>

### transaksi internal {#internal-transaction}

[Transaksi](#transaction) yang dikirim dari [akun kontrak](#contract-account) ke akun kontrak lainnya atau [EOA](#eoa) (lihat [message](#message)).

<Divider />

## K {#section-k}

### fungsi derivasi kunci (KDF) {#kdf}

Juga dikenal sebagai "algoritma perentangan kata sandi", ini digunakan oleh format [penyimpanan kunci](#keystore-file) untuk melawan serangan pemaksaan, kamus, dan tabel pelangi pada enkripsi frasa kata sandi, dengan secara berulang membuat hash dari frasa kata sandinya.

<DocLink to="/developers/docs/smart-contracts/security/">
  Keamanan kontrak pintar
</DocLink>

### keccak-256 {#keccak-256}

Fungsi [hash](#hash) kriptografik yang digunakan di Ethereum. Keccak-256 distandardisasi sebagai [SHA](#sha)-3.

### file penyimpanan kunci {#keystore-file}

File yang dikodekan dengan JSON yang berisi [kunci privat](#private-key) tunggal (dibuat secara acak), dienkripsi oleh frasa kata sandi untuk pengamanan tambahan.

<Divider />

## L {#section-l}

### lapisan 2 {#layer-2}

Area pengembangan yang berpusat pada peningkatan pembuatan lapisan di atas protokol Ethereum. Peningkatan ini terkait dengan kecepatan [transaksi](#transaction), [biaya transaksi](#transaction-fee) yang lebih murah, dan privasi transaksi.

<DocLink to="/developers/docs/scaling/#layer-2-scaling">
  Lapisan 2
</DocLink>

### LevelDB {#level-db}

Penyimpan nilai kunci pada disk sumber terbuka, yang diimplementasikan sebagai [pustaka](#library) berbobot ringan, bertujuan tunggal, dengan pengaitan ke banyak platform.

### pustaka {#library}

Tipe [kontrak](#smart-contract) spesial yang tidak memiliki fungsi yang dapat dibayar, fungsi fallback, dan penyimpanan data. Oleh karena itu, tidak bisa menerima atau menampung ether, atau menyimpan data. Sebuah pustaka yang sebelumnya berfungsi sebagai kode yang disebarkan yang dapat dipanggil kontrak lainnya untuk komputasi yang hanya dapat dibaca.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Pustaka Kontrak Pintar
</DocLink>

### klien ringan {#lightweight-client}

Klien Ethereum yang tidak menyimpan salinan lokal dari [rantai blok](#blockchain), atau memvalidasi blok dan [transaksi](#transaction). Menawarkan fungsi [dompet](#wallet) dan bisa membuat dan menyiarkan transaksi.

<Divider />

### LMD_GHOST {#lmd-ghost}

[Algoritma pilihan fork](#fork-choice-algorithm) yang digunakan oleh klien konsensus Ethereum untuk mengidentifikasi kepala rantai. LMD-GHOST merupakan singkatan dari "Latest Message Driven Greediest Heaviest Observed SubTree" yang berarti bahwa kepala rantai merupakan blok dengan akumulasi [atestasi](#attestation) terbesar dalam sejarah rantai tersebut.

## M {#section-m}

### Jaringan Utama {#mainnet}

Singkatan dari "jaringan utama", ini adalah [blockchain](#blockchain) Ethereum publik yang utama. ETH sebenarnya, nilai sebenarnya, dan konsekuensi sebenarnya. Juga dikenal sebagai lapisan 1 saat mendiskusikan tentang solusi penskalaan [lapisan 2](#layer-2). (Selain itu, lihat [jaringan percobaan](#testnet))

### Pohon Merkle Patricia {#merkle-patricia-tree}

Struktur data yang digunakan di Ethereum untuk menyimpan pasangan nilai kunci secara efisien.

### message {#message}

[Transaksi internal](#internal-transaction) yang tidak pernah diurutkan dan hanya dikirim dalam [EVM](#evm).

### pemanggilan message {#message-call}

Tindakan penyampaian [message](#message) dari satu akun ke akun lainnya. Jika akun tujuan dikaitkan dengan kode [EVM](#evm), maka VM akan dimulai dengan status objek tersebut dan message yang dijadikan dasar aksi.

### Metropolis {#metropolis}

Tahapan pengembangan ketiga Ethereum, yang diluncurkan pada Oktober 2017.

### penambang {#miner}

[Node](#node) jaringan yang menemukan [bukti kerja](#pow) valid untuk blok baru, melalui metode hashing penyampaian yang berulang (lihat [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Penambangan
</DocLink>

### Cetak {#mint}

Pencetakan adalah proses membuat token baru dan membawanya ke dalam sirkulasi sehingga dapat digunakan. Ini adalah mekanisme terdesentralisasi untuk membuat token baru tanpa keterlibatan otoritas pusat.

<Divider />

## N {#section-n}

### jaringan {#network}

Mengacu pada jaringan Ethereum, jaringan peer-to-peer yang menyebarkan transaksi dan blok ke setiap node Ethereum (peserta jaringan).

<DocLink to="/developers/docs/networks/">
  Jaringan
</DocLink>

### token yang tidak dapat dipertukarkan (NFT) {#nft}

Juga dikenal sebagai "deed", ini adalah standar token yang diperkenalkan oleh proposal ERC-721. NFT bisa dilacak dan diperdagangkan, tapi tiap token adalah unik dan berbeda; token ini tidak bisa ditukarkan seperti ETH dan [token ERC-20](#token-standard). NFT bisa menunjukkan kepemilikan aset digital atau fisik.

<DocLink to="/nft/">
  Token yang Tidak Dapat Dipertukarkan (NFT)
</DocLink>
<DocLink to="/developers/docs/standards/tokens/erc-721/">
  Standar Token yang Tidak Dapat Dipertukarkan ERC-721
</DocLink>

### node {#node}

Klien perangkat lunak yang berpartisipasi dalam jaringan.

<DocLink to="/developers/docs/nodes-and-clients/">
  Node dan Klien
</DocLink>

### nonce {#nonce}

Dalam kriptografi, sebuah nilai hanya bisa digunakan satu kali. Ada dua tipe nonce yang digunakan di Ethereum- nonce akun adalah penghitung transaksi dalam tiap akun, yang digunakan untuk mencegah serangan pengulangan; nonce [bukti kerja](#pow) adalah nilai acak dalam satu blok yang digunakan untuk memenuhi [bukti kerja](#pow).

<Divider />

## O {#section-o}

### blok ommer (uncle) {#ommer}

Ketika seorang [penambang](#miner) menemukan [blok](#block) valid, penambang lain mungkin telah menerbitkan blok saingan yang pertama-tama ditambahkan ke ujung blockchain. Blok valid tapi lama ini bisa dimasukkan oleh blok yang lebih baru sebagai _ommer_ dan menerima setengah dari imbalan blok. Istilah "ommer" adalah istilah netral secara gender yang lebih disukai untuk saudara kandung dari blok induk, tapi kadang-kadang disebut juga sebagai "uncle".

### Rollup optimistic {#optimistic-rollup}

[Rollup](#rollups) transaksi yang menggunakan [bukti penipuan](#fraud-proof) untuk menawarkan keluaran transaksi [lapisan 2](#layer-2) yang ditingkatkan, sekaligus menggunakan pengamanan yang disediakan oleh [Jaringan Utama](#mainnet) (lapisan 1). Tidak seperti [Plasma](#plasma), solusi lapisan 2 yang mirip dengannya, rollup Optimistic bisa menangani jenis transaksi yang lebih rumit – apa pun memungkinkan di [EVM](#evm). Rollup ini memang memiliki masalah latensi jika dibandingkan dengan [rollup Zero-knowledge](#zk-rollups) karena satu transaksi bisa ditentang lewat bukti penipuan.

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Rollup Optimistic
</DocLink>

### Oracle {#oracle}

Oracle merupakan sebuah jembatan yang menghubungkan antara [blockchain](#blockchain) dan dunia nyata. Mereka bertindak sebagai [API](#api) on-chain yang dapat dikuerikan untuk informasi dan digunakan di [kontrak pintar](#smart-contract).

<DocLink to="/developers/docs/oracles/">
  Oracle
</DocLink>

<Divider />

## P {#section-p}

### parity {#parity}

Salah satu dari implementasi kemampuan pertukaran informasi yang paling menonjol dari perangkat lunak klien Ethereum.

### Plasma {#plasma}

Solusi penskalaan off-chain yang menggunakan [bukti penipuan](#fraud-proof), seperti [Rollup optimistic](#optimistic-rollups). Plasma terbatas pada transaksi sederhana seperti transfer dan penukaran token dasar.

<DocLink to="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### kunci privat (kunci rahasia) {#private-key}

Angka rahasia yang memungkinkan pengguna Ethereum membuktikan kepemilikan sebuah akun atau kontrak, dengan membuat tanda tangan digital (lihat [kunci publik](#public-key), [alamat](#address), [ECDSA](#ecdsa)).

### Bukti Taruhan (PoS) {#pos}

Metode yang digunakan oleh protokol blockchain mata uang kripto untuk mencapai [konsensus](#consensus) terdistribusi. PoS meminta pengguna membuktikan kepemilikan sejumlah mata uang kripto tertentu ("taruhan" mereka di jaringan) untuk dapat berpartisipasi dalam proses validasi transaksi.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Bukti taruhan
</DocLink>

### Bukti kerja (PoW) {#pow}

Data (bukti) yang membutuhkan komputasi signifikan untuk ditemukan. Dalam Ethereum, [penambang](#miner) harus menemukan solusi numerik dari algoritma [Ethash](#ethash) yang sesuai dengan target [tingkat kesulitan](#difficulty) keseluruhan jaringan.

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  Bukti kerja
</DocLink>

### kunci publik {#public-key}

Angka, yang didapatkan lewat fungsi satu arah dari [kunci privat](#private-key), yang bisa dibagikan secara pubik dan digunakan oleh siapa pun untuk memverifikasi tanda tangan digital yang terbuat dengan kunci privat yang sesuai.

<Divider />

## R {#section-r}

### tanda terima {#receipt}

Data yang dikembalikan oleh klien Ethereum untuk mewakili hasil dari sebuah [transaksi](#transaction) tertentu, termasuk [hash](#hash) transaksi, nomor [bloknya](#block), jumlah [gas](#gas) terpakai, dan, dalam hal penggunaan [kontrak pintar](#smart-contract), [alamat](#address) kontraknya.

### serangan re-entrancy {#re-entrancy-attack}

Serangan yang terdiri dari kontrak penyerang memanggil fungsi kontrak korban dalam cara yang pada saat eksekusinya, korban memanggil kontrak penyerang lagi, secara berulang. Ini bisa mengakibatkan, sebagai contoh, pencurian dana dengan melewatkan bagian kontrak korban yang memerbarui saldo atau yang menghitung jumlah penarikan.

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  Re-entrancy
</DocLink>

### imbalan {#reward}

Sejumlah ether yang dimasukkan ke dalam setiap blok baru sebagai imbalan oleh jaringan untuk [penambang](#miner) yang menemukan solusi [bukti kerja](#pow).

### Prefiks Panjang Rekursif (RLP) {#rlp}

Standar pengodean yang dirancang oleh pengembang Ethereum untuk mengodekan dan mengurutkan objek (stuktur data) dengan kompleksitas dan penjang yang bersifat arbitrari.

### rollup {#rollups}

Jenis solusi penskalaan [lapisan 2](#layer-2) yang mengelompokkan beberapa transaksi dan mengirimkannya ke [rantai utama Ethereum](#mainnet) dalam transaksi tunggal. Ini memungkinkan pengurangan biaya [gas](#gas) dan menambah keluaran [transaksi](#transaction). Ada rollup Optimistic dan Zero-knowledge yang menggunakan metode pengamanan berbeda untuk menawarkan perolehan skalabilitas ini.

<DocLink to="/developers/docs/scaling/#rollups">
  Rollup
</DocLink>

<Divider />

## S {#section-s}

### Serenity {#serenity}

Tahapan pengembangan Ethereum yang memulai serangkaian penskalaan dan peningkatan berkelanjutan, yang sebelumnya dikenal sebagai 'Ethereum 2.0', atau 'Eth2'.

<DocLink to="/upgrades/">
  Peningkatan Ethereum
</DocLink>

### Algoritma Hash Aman (SHA) {#sha}

Serumpun fungsi hash kriptografik yang diterbitkan oleh National Institute of Standards and Technology (NIST).

### shard / rantai shard {#shard}

Rantai [bukti taruhan](#pos) yang dikoordinir oleh [Rantai Suar](#beacon-chain) dan diamankan oleh [validator](#validator). Akan ada 64 rantai yang ditambahkan ke jaringan sebagai bagian dari peningkatan rantai shard. Rantai shard akan menawarkan keluaran transaksi yang bertambah untuk Ethereum dengan menyediakan data tambahan untuk solusi [lapisan 2](#layer-2) seperti [rollup optimistic](#optimistic-rollups) dan [rollup ZK](#zk-rollups).

<DocLink to="/upgrades/shard-chains">
  Rantai shard
</DocLink>

### sidechain {#sidechain}

Solusi penskalaan yang menggunakan rantai terpisah dengan [aturan konsensus](#consensus-rules) yang berbeda, sering kali lebih cepat. Sebuah jembatan diperlukan untuk menghubungkan sidechain ini ke [Jaringan Utama](#mainnet). [Rollup](#rollups) juga menggunakan sidechain, tetapi beroperasi dalam kolaborasi dengan [Jaringan Utama](#mainnet) sebagai gantinya.

<DocLink to="/developers/docs/scaling/sidechains/">
  Sidechain
</DocLink>

### singleton {#singleton}

Komputer yang memprogram istilah yang mendeskripsikan objek istilah tersebut yang hanya dapat berisi satu instance tunggal.

### slot {#slot}

Periode waktu (12 detik) yang di dalamnya [Rantai Suar](#beacon-chain) dan blok rantai [shard](#shard) baru bisa diusulkan oleh [validator](#validator) dalam sistem [bukti taruhan](#pos). Sebuah slot mungkin tidak berisi. 32 slot membentuk satu [epoch](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Bukti taruhan
</DocLink>

### kontrak pintar {#smart-contract}

Program yang beroperasi dalam infrastruktur komputasi Ethereum.

<DocLink to="/developers/docs/smart-contracts/">
  Pengantar Kontrak Pintar
</DocLink>

### SNARK {#snark}

Kependekan dari "succinct non-interactive argument of knowledge", SNARK merupakan sejenis [bukti zero-knowledge](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollup zero-knowledge
</DocLink>

### Solidity {#solidity}

Bahasa pemrograman prosedural (imperatif) dengan sintaksis yang mirip dengan JavaScript, C++, atau Java. Bahasa paling populer dan paling sering digunakan untuk [kontrak pintar](#smart-contract) Ethereum. Dibuat oleh Dr. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Perakitan inline Solidity {#solidity-inline-assembly}

Bahasa perakitan [EVM](#evm) dalam program [Solidity](#solidity). Dukungan Solidity untuk perakitan inline memudahkan proses untuk menulis operasi tertentu.

### Spurious Dragon {#spurious-dragon}

[Fork keras](#hard-fork) dari blockchain Ethereum, yang muncul di blok 2.675.000 untuk mengatasi lebih banyak vektor serangan penolakan layanan dan state yang bersih (lihat [Tangerine Whistle](#tangerine-whistle)). Juga, mekanisme perlindungan terhadap serangan perulangan (lihat [nonce](#nonce)).

### stablecoin {#stablecoin}

[Token ERC-20](#token-standard) dengan nilai yang dipatok pada nilai aset lainnya. Ada stablecoin yang didukung oleh mata uang fiat seperti dolar, logam mulia seperti emas, dan mata uang kripto lainnya seperti Bitcoin.

<DocLink to="/eth/#tokens">
  ETH bukan satu-satunya kripto pada Ethereum
</DocLink>

### penaruhan {#staking}

Mendepositokan sejumlah [ether](#ether) (taruhan Anda) untuk menjadi validator dan mengamankan [jaringan](#network). Seorang validator memeriksa [transaksi](#transaction) dan mengusulkan [blok](#block) di bawah model konsensus [bukti taruhan](#pos). Penaruhan memberi Anda insentif ekonomi untuk bertindak demi keuntungan terbaik jaringan. Anda akan mendapatkan imbalan untuk melaksanakan tugas [validator](#validator) Anda, tapi kehilangan jumlah ETH secara beragam jika Anda tidak menjalankannya.

<DocLink to="/staking/">
  Taruhkan ETH Anda untuk menjadi validator Ethereum
</DocLink>

### STARK {#stark}

Kependekan dari "scalable transparent argument of knowledge", STARK merupakan sejenis [bukti zero-knowledge](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollup zero-knowledge
</DocLink>

### kanal state {#state-channels}

Solusi [lapisan 2](#layer-2), yaitu sebuah kanal disiapkan di antara perserta, dan mereka bisa bertransaksi dengan bebas dan dengan biaya rendah. Hanya [transaksi](#transaction) yang ditujukan untuk memulai kanal dan menutup kanal yang dikirimkan ke [Jaringan Utama](#mainnet). Ini memungkinkan throughput transaksi yang sangat tinggi, tapi memang bergantung pada prosedur mengetahui jumlah peserta dari awal dan mengunci pendanaan yang tersedia.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  Kanal state
</DocLink>

### supermayoritas {#supermajority}

Supermayoritas adalah istilah yang diberikan untuk jumlah yang melampaui 2/3 (66%) dari total ether yang dipertaruhkan pada [Rantai Suar](#beacon-chain). Suara supermayoritas diperlukan agar blok dapat [difinalisasi](#finality) pada Rantai Suar.

### panitia sinkronisasi {#sync-committee}

Panitia sinkronisasi adalah grup [validator](#validator) yang dipilih secara acak pada [Rantai Suar](#beacon-chain) yang disegarkan setiap ~27 jam. Tujuannya adalah menambahkan tanda tangan mereka pada header blok yang valid. Komite sinkronisasi memungkinkan [klien ringan](#lightweight-client) untuk terus melacak kepala blockchain tanpa harus mengakses keseluruhan set validator.

### szabo {#szabo}

Denominasi [ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

[Fork keras](#hard-fork) dalam blockchain Ethereum, yang muncul di blok 2.463.000 untuk mengubah perhitungan [gas](#gas) dari operasi intensif I/O tertentu dan untuk membersihkan state yang terkumpul dari serangan penolakan layanan, yang mengeksploitasi biaya gas rendah untuk operasi tersebut.

### jaringan percobaan {#testnet}

Singkatan dari "test network", jaringan yang digunakan untuk menyimulasikan perilaku jaringan Ethereum utama (lihat [Jaringan Utama](#mainnet)).

<DocLink to="/developers/docs/networks/#ethereum-testnets">
  Jaringan percobaan
</DocLink>

### standar token {#token-standard}

Diperkenalkan oleh proposal ERC-20, ini menyediakan struktur [kontrak pintar](#smart-contract) yang terstandardisasi untuk token yang dapat dipertukarkan. Token dari kontrak yang sama bisa dilacak, diperdagangkan, dan dapat dipertukarkan, tidak seperti [NFT](#nft).

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  Standar Token ERC-20
</DocLink>

### transaksi {#transaction}

Data yang dikomit ke Blockchain Ethereum yang ditandatangani oleh [akun](#account) pengirim, yang menargetkannya [alamat](#address) tertentu. Transaksi berisi metadata seperti [batas gas](#gas-limit) untuk transaksi tersebut.

<DocLink to="/developers/docs/transactions/">
  Transaksi
</DocLink>

### biaya transaksi {#transaction-fee}

Biaya yang Anda perlukan kapan pun Anda menggunakan jaringan Ethereum. Contohnya mencakup pengiriman dana dari [dompet](#wallet), atau interaksi [dapp](#dapp), seperti menukar token atau membeli item koleksi. Anda bisa menganggap ini seperti biaya layanan. Biaya ini akan berubah berdasarkan seberapa sibuk jaringan. Ini karena [penambang](#miner), orang-orang yang bertanggungjawab untuk memproses transaksi Anda, kemungkinan memprioritaskan transaksi dengan biaya lebih tinggi – sehingga kemacetan memaksa harga untuk naik.

Pada level teknis, biaya transaksi Anda berhubungan dengan seberapa banyak [gas](#gas) yang diperlukan transaksi Anda.

Mengurangi biaya transaksi adalah subjek diskusi yang sangat diminati saat ini. Lihat [Lapisan 2](#layer-2)

### Lengkap secara Turing {#turing-complete}

Konsep yang dinamai dari ahli matematika dan ilmuwan komputer Inggris, Alan Turing- sebuah sistem aturan manipulasi data (seperti rangkaian instruksi komputer, bahasa pemrograman, atau otomat seluler) dianggap "lengkap secara Turing" atau "universal secara komputasional" jika bisa digunakan untuk mensimulasikan mesin Turing mana pun.

<Divider />

## V {#section-v}

### validator {#validator}

[Node](#node) dalam sistem [bukti taruhan](#pos) yang bertanggung jawab untuk menyimpan data, memproses transaksi, dan menambahkan blok baru ke blockchain. Untuk mengaktifkan perangkat lunak validator, Anda harus [menaruhkan](#staking) 32 ETH.

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Bukti taruhan
</DocLink>
<DocLink to="/staking/">
  Penaruhan di Ethereum
</DocLink>

### Bukti validitas {#validity-proof}

Model keamanan untuk solusi [lapisan 2](#layer-2) tertentu di mana, untuk meningkatkan kecepatan, transaksi di-[roll up](/#rollups) ke dalam kelompok dan dikirimkan ke Ethereum dalam transaksi tunggal. Komputasi transaksi dijalankan secara off-chain dan kemudian disediakan ke dalam rantai utama dengan bukti validitasnya. Metode ini meningkatkan kemungkinan jumlah transaksi sekaligus mempertahankan keamanan. Beberapa [rollup](#rollups) menggunakan [bukti penipuan](#fraud-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollup zero-knowledge
</DocLink>

### Validium {#validium}

Solusi off-chain yang menggunakan [bukti validitas](#validity-proof) untuk meningkatkan keluaran transaksi. Tidak seperti [Rollup zero-knowledge](#zk-rollup), data Validium tidak disimpan pada [Jaringan Utama](#mainnet) lapisan 1.

<DocLink to="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Bahasa pemrograman tingkat tinggi dengan sintaksis seperti Phyton. Ditujukan untuk mengenal bahasa fungsional yang lebih murni. Dibuat oleh Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### dompet {#wallet}

Perangkat lunak yang berisi [kunci privat](#private-key). Digunakan untuk mengakses dan mengontrol [akun](#account) Ethereum dan berinteraksi dengan [kontrak pintar](#smart-contract). Kunci tidak perlu disimpan dalam dompet, dan bisa didapatkan dari penyimpanan luring (yaitu, kartu memori atau kertas) agar lebih aman. Terlepas dari namanya, dompet tidak pernah menyimpan koin atau token sebenarnya.

<DocLink to="/wallets/">
  Dompet Ethereum
</DocLink>

### Web3 {#web3}

Versi ketiga web. Pertama kali diusulkan oleh Dr. Gavin Wood, Web3 mewakili visi dan fokus baru untuk aplikasi web- dari aplikasi yang dimiliki dan dikelola secara terpusat, ke aplikasi yang dibangun pada protokol terdesentralisasi (lihat [Dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 vs Web3
</DocLink>

### wei {#wei}

Denominasi terkecil dari [ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### alamat kosong {#zero-address}

Alamat Ethereum spesial, tidak berisi sama sekali, yang dikhususkan sebagai alamat tujuan dari [transaksi pembuatan kontrak](#contract-creation-transaction).

### Bukti zero-knowledge {#zk-proof}

Bukti zero-knowledge adalah metode kriptografik yang memungkinkan seorang individu untuk membuktikan bahwa sebuah pernyataan adalah benar tanpa menyampaikan informasi tambahan.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollup zero-knowledge
</DocLink>

### Rollup zero-knowledge {#zk-rollup}

[Rollup](#rollups) transaksi yang menggunakan [bukti validitas](#validity-proof) untuk menawarkan keluaran transaksi [lapisan 2](#layer-2) yang ditingkatkan, sementara menggunakan keamanan yang disediakan oleh [Jaringan Utama](#mainnet) (lapisan 1). Sekalipun rollup ini tidak bisa menangani jenis transaksi rumit, seperti [Rollup optimistic](#optimistic-rollups), rollup ini tidak memiliki masalah latensi karena transaksi terbukti valid saat dikirimkan.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollup Zero-knowledge
</DocLink>

<Divider />

## Sumber {#sources}

_Disediakan dalam bagian melalui [Menguasai Ethereum](https://github.com/ethereumbook/ethereumbook) oleh [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) di bawah CC-BY-SA_

<Divider />

## Berkontribusi untuk halaman ini {#contribute-to-this-page}

Apakah kami melewatkan sesuatu? Apakah ada yang salah? Bantu kami meningkatkannya dengan berkontribusi untuk glosarium ini di GitHub!

[Pelajari lebih lanjut tentang cara berkontribusi](/contributing/adding-glossary-terms)
