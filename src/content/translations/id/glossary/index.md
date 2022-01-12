---
title: Glosarium Ethereum
description: Glosarium istilah teknis dan non-teknis yang tidak lengkap terkait dengan Ethereum
lang: id
sidebar: true
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

Umumnya, ini mewakili [EOA](#eoa) atau [kontrak](#contract-accouint) yang dapat menerima (alamat tujuan) atau mengirim (alamat sumber) [transaksi](#transaction) di blockchain. Lebih khusus lagi, ini adalah 160 bit paling kanan dari [hash Keccak](#keccak-256) dari [kunci publik](#public-key) [ECDSA](#ecdsa).

### application binary interface (ABI) {#abi}

Cara standar untuk berinteraksi dengan [kontrak](#contract-account) di ekosistem Ethereum, baik dari luar blockchain maupun untuk interaksi antar kontrak.

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### application programming interface {#api}

Application Programming Interface (API) adalah serangkaian definisi tentang cara menggunakan suatu perangkat lunak. API ada di antara aplikasi dan server web, dan memfasilitasi transfer data di antaranya.

### assert {#assert}

Di [Solidity](#solidity), `assert(false)` dikompilasi menjadi `0xfe`, opcode yang tidak valid, yang menggunakan semua [gas](#gas) tersisa dan mengembalikan semua perubahan. Ketika pernyataan `assert()` gagal, sesuatu yang sangat salah dan tidak terduga terjadi, dan Anda harus memperbaiki kode Anda. Anda harus menggunakan `assert()` untuk menghindari kondisi yang seharusnya tidak pernah terjadi.

<DocLink to="/developers/docs/smart-contracts/security/">
  Keamanan kontrak pintar
</DocLink>

### pengesahan {#attestation}

Suara validator untuk [Ranta Suar](#beacon-chain) atau [shard](#shard) [blok](#block). Validator harus membuktikan blok, menandakan bahwa mereka setuju dengan status yang diusulkan oleh blok.

<Divider />

## B {#section-b}

### Rantai Suar {#beacon-chain}

Peningkatan Eth2 yang akan menjadi koordinator untuk jaringan Ethereum. Ini memperkenalkan [bukti taruhan](#pos) dan [validator](#validator) ke Ethereum. Pada akhirnya ini akan tergabung dengan [Jaringan Utama](#mainnet).

<DocLink to="/eth2/beacon-chain/">
  Rantai Suar
</DocLink>

### big-endian {#big-endian}

Representasi nomor posisi di mana digit paling signifikan pertama dalam memori. Kebalikan dari little-endian, di mana angka penting terkecil didahulukan.

### blok {#block}

Kumpulan informasi yang diperlukan (header blok) tentang [transaksi](#transaction) yang terdiri dari, dan satu set header blok lainnya yang dikenal sebagai [ommers](#ommer). Blok ditambahkan ke jaringan Ethereum oleh [penambang](#miner).

<DocLink to="/developers/docs/blocks/">
  Blok
</DocLink>

### blockchain {#blockchain}

Di Ethereum, urutan [blok](#block) divalidasi oleh sistem [bukti kerja](#pow), masing-masing menautkan ke pendahulunya semua cara ke [blok genesis](#genesis-block). Tidak ada batasan ukuran blok; melainkan menggunakan [batas gas](#gas-limit) yang bervariasi.

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Apa itu Blockchain?
</DocLink>

### kode bita {#bytecode}

Kumpulan instruksi abstrak yang dirancang untuk eksekusi yang efisien oleh penerjemah perangkat lunak atau mesin virtual. Tidak seperti kode sumber yang dapat dibaca manusia, kode bita diekspresikan dalam format numerik.

### Fork Byzantium {#byzantium-fork}

Tipe fork pertama dari dua [fork keras](#hard-fork) untuk fase pengembangan [Metropolis](#metropolis). Fork ini mencakup Penundaan [Bom Kesulitan](#difficulty-bomb) Metropolis EIP-649 dan Pengurangan Imbalan Blok, di mana [Zaman Es](#ice-age) ditunda selama 1 tahun dan imbalan blok dikurangi dari 5 ke 3 ether.

<Divider />

## C {#section-c}

### menyusun {#compiling}

Mengubah kode tertulis dalam sebuah bahasa pemrograman tingkat tinggi (seperti [Solidity](#solidity)) menjadi bahasa yang bertingkat lebih rendah (seperti [kode bita](#bytecode) EVM).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Menyusun Kontrak Pintar
</DocLink>

### panitia {#committee}

Sebuah kelompok yang terdiri paling sedikit 128[validator](#validator) yang ditugaskan ke blok suar dan shard secara acak oleh [Rantai Suar](#beacon-chain).

### konsensus {#consensus}

Saat node berjumlah besar (biasanya kebanyakan node di jaringan) semuanya memiliki blok yang sama dalam blockchain terbaik mereka yang di validasi secara lokal. Jangan dirancukan dengan [aturan konsensus](#consensus-rules).

### aturan konsensus {#consensus-rules}

Aturan validasi blok yang diikuti node penuh untuk tetap berkesesuaian dengan node lainnya. Jangan dirancukan dengan [konsensus](#consensus).

### Fork Konstantinopel {#constantinople-fork}

Bagian kedua dari fase [Metropolis](#metropolis), yang awalnya direncanakan untuk diluncurkan pada pertengahan 2018. Diharapkan untuk mencakup pergeseran ke algoritma konsensus [bukti kerja](#pow)/[bukti taruhan](#pos) hibrida, yang ada di antara perubahan lainnya.

### akun kontrak {#contract-account}

Akun yang berisi kode yang dieksekusi setiap kali menerima satu [transaksi](#transaction) dari [akun](#account) lainnya ([EOA](#eoa) atau [kontrak](#contract-account)).

### transaksi pembuatan kontrak {#contract-creation-transaction}

[Transaksi](#transaction) spesial, dengan [alamat kosong](#zero-address) sebagai penerimanya, yang digunakan untuk mendaftarkan sebuah [kontrak](#contract-account) dan mencatatnya di blockchain Ethereum.

### tautan silang {#crosslink}

Sebuah tautan silang menyediakan ringkasan tentang sebuah state shard. Tautan silang berisi cara rantai [shard](#shard) akan berkomunikasi satu sama lain melalui [Rantai Suar](#beacon-chain) dalam [sistem bukti taruhan](#proof-of-stake) yang berbentuk shard.

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

Aplikasi terdesentralisasi. Singkatnya, Dapp adalah sebuah [kontrak pintar](#smart-contract) dan antarmuka pengguna web. Lebih luasnya, Dapp adalah aplikasi web yang dibangun di atas layanan infrastruktur peer-to-peer terbuka dan terdesentralisasi. Sebagai tambahan, banyak Dapp mencakup penyimpanan terdesentralisasi dan/atau protokol dan platform message.

<DocLink to="/developers/docs/dapps/">
  Pengantar Dapp
</DocLink>

### decentralized exchange (DEX) {#dex}

Jenis [dapp](#dapp) yang memungkinkan Anda menukar token dengan rekan sejawat di jaringan. Anda memerlukan [ether](#ether) untuk menggunakannya (untuk membayar [biaya transaksi](#transaction-fee)) tapi ini bukan subjek yang tunduk pada pembatasan geografis seperti bursa terpusat – siapa pun bisa berpartisipasi.

<DocLink to="/get-eth/#dex">
  Bursa terdesentralisasi
</DocLink>

### deed {#deed}

Lihat [non-fungible token (NFT)](#nft)

### DeFi {#defi}

Singkatan dari "decentralized finance", sebuah kategori luas dari [dapp](#dapp) yang bertujuan menyediakan layanan keuangan yang didukung blockchain, tanpa perantara mana pun, sehingga siapa pun yang memiliki koneksi internet dapat berpartisipasi.

<DocLink to="/defi/">
  Keuangan Terdesentralisasi (DeFi)
</DocLink>

### tingkat kesulitan {#difficulty}

Pengaturan luas jaringan yang mengontrol berapa banyak komputasi yang dibutuhkan untuk menghasilkan sebuah [bukti kerja](#pow).

### bom kesulitan {#difficulty-bomb}

Peningkatan eksponensial terencana dalam pengaturan [tingkat kesulitan](#difficulty) [bukti kerja](#pow) yang dirancang untuk memotivasi perpindahan ke [bukti taruhan](#pos), yang mengurangi peluang pada [fork](#hard-fork)

### tanda tangan digital {#digital-signatures}

Data string pendek yang dibuat pengguna untuk dokumen yang menggunakan [kunci privat](#private-key) sehingga siapa pun dengan [kunci publik](#public-key), tanda tangan, dan dokumen yang sesuai dapat memverifikasi bahwa (1) dokumennya "ditandatangani" oleh pemilik dari kunci privat tersebut, dan (2) dokumen tidak diubah setelah ditandatangani.

<Divider />

## E {#section-e}

### algoritma tanda tangan digital kurva eliptik (ECDSA) {#ecdsa}

Algoritma kriptografik yang digunakan oleh Ethereum untuk memastikan bahwa dana yang tersedia hanya dapat dipakai oleh pemiliknya. Ini adalah metode yang lebih disukai untuk membuat kunci publik dan privat. Cocok untuk pembuatan [alamat](#address) akun dan verifikasi [transaksi](#transaction).

### epoch {#epoch}

Periode waktu 32 [slot](#slot) (6,4 menit) dalam sistem terkoordinasi [Rantai Suar](#beacon-chain). [Komite](#committee) [validator](#validator) diacak pada tiap epoch untuk alasan keamanan. Ada peluang bagi rantai di tiap epoch untuk di[finalisasi](#finality).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Bukti taruhan
</DocLink>

### Proposal Peningkatan Ethereum (EIP) {#eip}

Dokumen desain yang menyediakan informasi bagi komunitas Ethereum, yang mendeskripsikan satu fitur atau proses atau lingkungan baru yang diusulkan (lihat [ERC](#erc)).

<DocLink to="/eips/">
  Pengantar EIP
</DocLink>

### Layanan Nama Ethereum (ENS) {#ens}

Pendaftaran ENS adalah [kontrak](#smart-contract) sentral tunggal yang menyediakan pemetaan dari nama domain pemilik dan pembaru, seperti dideskripsikan dalam [EIP](#eip) 137.

[Baca lebih lanjut di github.com](https://github.com/ethereum/ens)

### entropi {#entropy}

Dalam konteks kriptografi, entropi berarti kurangnya prediktabilitas atau tingkat keserampangan. Saat membuat informasi rahasia, seperti [kunci privat](#private-key), algoritma biasanya bergantung pada sumber entropi tinggi untuk memastikan output menjadi tidak dapat diprediksi.

### externally owned account (EOA) {#eoa}

[Akun](#account) yang terbuat oleh atau untuk pengguna manusia di jaringan Ethereum.

### Ethereum Request for Comments (ERC) {#erc}

Label yang diberikan ke beberapa [EIP](#eip) yang berusaha untuk menentukan standar spesifik penggunaan Ethereum.

<DocLink to="/eips/">
  Pengantar EIP
</DocLink>

### Ethash {#ethash}

Algoritma [bukti kerja](#pow) untuk Ethereum 1.0.

[Baca lebih lanjut di eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

Mata uang kripto asli yang digunakan ekosistem Ethereum, yang mencakup biaya [gas](#gas) saat mengeksekusi transaksi. Juga tertulis sebagai ETH atau simbolnya Ξ, huruf besar Yunani untuk karakter Xi.

<DocLink to="/eth/">
  Kurs untuk masa depan digital kita
</DocLink>

### aksi {#events}

Memungkinkan penggunaan fasilitas logging [EVM](#evm). [Dapp](#dapp) bisa mendengarkan aksi dan menggunakannya untuk memicu pemanggilan kembali JavaScript dalam antarmuka pengguna.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Aksi dan Log
</DocLink>

### Mesin Virtual Ethereum (EVM) {#evm}

Mesin virtual berbasis tumpukan yang mengeksekusi [kodebita](#bytecode). Dalam Ethereum, model eksekusi menentukan bagaimana state sistem dimodifikasi sesuai rangkaian instruksi kodebita dan tupel kecil data lingkungan. Ini ditentukan lewat sebuah model formal dari mesin state virtual.

<DocLink to="/developers/docs/evm/">
  Mesin Virtual Ethereum
</DocLink>

### Bahasa perakitan EVM {#evm-assembly-language}

Bentuk [kodebita](#bytecode) EVM yang dapat dibaca manusia.

<Divider />

## F {#section-f}

### fungsi fallback {#fallback-function}

Fungsi default yang dipanggil saat ketiadaan data atau nama fungsi yang dideklarasikan.

### keran {#faucet}

Layanan yang dilaksanakan lewat [kontrak pintar](#smart-contract) yang mengeluarkan dana dalam bentuk ether uji coba gratis yang bisa digunakan dalam satu testnet.

<DocLink to="/developers/docs/networks/#testnet-faucets">
  Keran Testnet
</DocLink>

### finalitas {#finality}

Finalitas adalah jaminan bahwa serangkaian transaksi sebelum waktu yang dtentukan tidak akan berubah dan tidak bisa dibalikkan.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality">
  Finalitas bukti kerja
</DocLink> <DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Finalitas bukti taruhan
</DocLink>

### finney {#finney}

Denominasi [ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### fork {#fork}

Perubahan dalam protokol yang menyebabkan pembuatan rantai alternatif, atau perbedaan sementara dalam dua jalur blok potensi selama penambangan.

### bukti penipuan {#fraud-proof}

Model keamanan untuk solusi [lapisan 2](#layer-2) tertentu di mana, untuk meningkatkan kecepatan, transaksi di-[roll up](#rollups) ke dalam kelompok dan dikirimkan ke Ethereum dalam transaksi tunggal. Bukti penipuan ini dianggap valid tapi bisa ditentang jika ada kecurigaan penipuan. Bukti penipuan kemudian akan menjalankan transaksi untuk memeriksa apakah penipuan terjadi. Metode ini meningkatkan kemungkinan jumlah transaksi sekaligus mempertahankan keamanan. Beberapa [rollup](#rollups) menggunakan [bukti validitas](#validity-proof).

<DocLink to="/developers/docs/scaling/layer-2-rollups/#optimistic-rollups">
  Rollup optimistic
</DocLink>

### frontier {#frontier}

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

Perbedaan permanen dalam [blockchain](#blockchain); juga dikenal sebagai perubahan hard-forking. Fork ini biasanya muncul saat node yang tak ditingkatkan tidak bisa memvalidasi blok yang dibuat oleh node yang ditingkatkan yang mengikuti [aturan konsensus](#consensus-rules) yang lebih baru. Jangan dirancukan dengan fork, fork lunak, fork perangkat lunak atau fork Git.

### hash {#hash}

Sidik jari input berukuran beragam yang panjangnya tetap, dibuat oleh fungsi hash. (Lihat [keccak-256](#keccak-256))

### Dompet HD {#hd-wallet}

[Dompet](#wallet) yang menggunakan pembuatan kunci dan protokol transfer hierarchical deterministic (HD).

[Baca lebih lanjut di github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### Seed dompet HD {#hd-wallet-seed}

Nilai yang digunakan untuk membuat [kunci privat](#private-key) master dan kode rantai master untuk [dompet](#wallet) HD. Frasa seed dompet dapat diwakili oleh kata mnemonic, membuatnya lebih mudah untuk menyalin, membuat cadangan, dan menyimpan kunci privat.

### homestead {#homestead}

Fase pengembangan kedua Ethereum, yang diluncurkan pada Maret 2016 di blok 1.150.000.

<Divider />

## I {#section-i}

### indeks {#index}

Struktur jangan yang dimaksudkan untuk mengoptimalkan pembuatan kueri informasi dari seluruh [blockchain](#blockchain) dengan menyediakan jalur efisien ke sumber penyimpanannya.

### Inter-exchange Client Address Protocol (ICAP) {#icap}

Pengodean alamat Ethereum yang setengah kompatibel dengan pengodean International Bank Account Number (IBAN), menawarkan pengodean alamat Ethereum yang serbaguna, checksum, dan dapat bertukar informasi. Alamat ICAP menggunakan kode negara semu IBAN yang baru- XE, kepanjangan dari "eXtended Ethereum," seperti yang digunakan dalam mata uang nonyuridksi (contohnya, XBT, XRP, XCP).

### Zaman Es {#ice-age}

[Fork keras](#hard-fork) Ethereum di blok 200.000 untuk memperkenalkan peningkatan [tingkat kesulitan](#difficulty) eksponensial (alias [bom kesulitan](#difficulty-bomb)), mendorong transisi ke [bukti taruhan](#pos).

### integrated development environment (IDE) {#ide}

Antarmuka pengguna yang biasanya menggabungkan editor, pengompilasi, runtime, dan debugger kode.

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

### key derivation function (KDF) {#kdf}

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

<DocLink to="/developers/docs/scaling/layer-2-rollups/">
  Lapisan 2
</DocLink>

### LevelDB {#level-db}

Penyimpan nilai pada kunci disk sumber terbuka, yang diimplementasikan sebagai [pustaka](#library) berbobot ringan, bertujuan tunggal, dengan pengaitan ke banyak platform.

### pustaka {#library}

Tipe [kontrak](#smart-contract) spesial yang tidak memiliki fungsi yang dapat dibayar, fungsi fallback, dan penyimpanan data. Oleh karena itu, tidak bisa menerima atau menampung ether, atau menyimpan data. Sebuah pustaka sebelumnya berfungsi sebagai kode yang disebarkan yang dipanggil kontrak lainnya untuk komputasi yang hanya dapat dibaca.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Pustaka Kontrak Pintar
</DocLink>

### klien ringan {#lightweight-client}

Klien Ethereum yang tidak menyimpan salinan lokal dari [blockchain](#blockchain), atau mengesahkan blok dan [transaksi](#transaction). Menawarkan fungsi [dompet](#wallet) dan bisa membuat dan menyiarkan transaksi.

<Divider />

## M {#section-m}

### Jaringan Utama {#mainnet}

Singkatan dari "jaringan utama", ini adalah [blockchain](#blockchain) Ethereum publik yang utama. ETH sebenarnya, nilai sebenarnya, dan konsekuensi sebenarnya. Juga dikenal sebagai lapisan 1 saat mendiskusikan tentang solusi penskalaan [lapisan 2](#layer-2). (Juga, lihat [testnet](#testnet))

### Merkle Patricia trie {#merkle-patricia-tree}

Struktur data yang digunakan di Ethereum untuk secara efisien menyimpan pasangan nilai kunci.

### message {#message}

[Transaksi internal](#internal-transaction) yang tidak pernah diurutkan dan hanya dikirm dalam [EVM](#evm).

### pemanggilan message {#message-call}

Tindakan penyampaian [message](#message) dari satu akun ke akun lainnya. Jika akun tujuan terhubung dengan kode [EVM](#evm), maka VM akan dijalankan dengan state objek tersebut dan message yang dijadikan dasar eksekusi.

### Metropolis {#metropolis}

Fase pengembangan ketiga Ethereum, diluncurkan pada Oktober 2017.

### penambang {#miner}

[Node](#node) jaringan yang menemukan [bukti kerja](#pow) valid untuk blok baru, melalui metode hashing penyampaian yang berulang (lihat [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Penambangan
</DocLink>

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
</DocLink> <DocLink to="/developers/docs/standards/tokens/erc-721/">
  Standar Token Non-Fungible ERC-721
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

### ommer (uncle) block {#ommer}

Ketika seorang [penambang](#miner) menemukan [blok](#block) valid, penambang lain mungkin telah menerbitkan blok saingan yang pertama-tama ditambahkan ke ujung blockchain. Blok valid, tapi lama, ini bisa dimasukkan oleh blok yang lebih baru sebagai _ommer_ dan menerima setengah dari imbalan blok. Istilah "ommer" adalah istilah netral secara gender yang lebih disukai untuk saudara kandung dari blok induk, tapi kadang-kadang disebut juga sebagai "uncle".

### Rollup optimistic {#optimistic-rollup}

[Rollup](#rollups) transaksi yang menggunakan [bukti penipuan](#fraud-proof) untuk menawarkan throughput transaksi [lapisan 2](#layer-2) yang ditingkatkan, sekaligus menggunakan pengamanan yang disediakan oleh [Jaringan Utama](#mainnet) (lapisan 1). Tidak seperti [Plasma](#plasma), solusi lapisan 2 yang mirip dengannya, rollup Optimistic bisa menangani jenis transaksi yang lebih rumit – apa pun memungkinkan di [EVM](#evm). Rollup ini memang memiliki masalah latensi jika dibandingkan dengan [rollup Zero-knowledge](#zk-rollups) karena satu transaksi bisa ditentang lewat bukti penipuan.

<DocLink to="/developers/docs/scaling/layer-2-rollups/#optimistic-rollups">
  Rollup Optimistic
</DocLink>

<Divider />

## P {#section-p}

### parity {#parity}

Satu dari implementasi aspek kemampuan pertukaran informasi yang paling menonjol dari perangkat lunak klien Ethereum.

### Plasma {#plasma}

Solusi perluasan off-chain yang menggunakan [bukti penipuan](#fraud-proof), seperti [rollup Optimistic](#optimistic-rollups). Plasma terbatas pada transaksi sederhana seperti transfer dan penukaran token dasar.

<DocLink to="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### kunci privat (kunci rahasia) {#private-key}

Angka rahasia yang memungkinkan pengguna Ethereum membuktikan kepemilikan sebuah akun atau kontrak, dengan membuat tanda tangan digital (lihat [kunci publik](#public-key), [alamat](#address), [ECDSA](#ecdsa)).

### bukti taruhan (PoS) {#pos}

Metode yang dengannya protokol blockchain mata uang kripto bertujuan mencapai [konsensus](#consensus) terdistribusi. PoS meminta pengguna membuktikan kepemilikan sejumlah mata uang kripto tertentu ("taruhan" mereka di jaringan) untuk dapat berpartisipasi dalam proses validasi transaksi.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Bukti taruhan
</DocLink>

### bukti kerja (PoW) {#pow}

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

Sejumlah ether yang dimasukkan ke dalam blok baru sebagai imbalan oleh jaringan untuk [penambang](#miner) yang menemukan solusi [bukti kerja](#pow).

### Prefiks Panjang Rekursif (RLP) {#rlp}

Standar pengodean yang dirancang oleh pengembang Ethereum untuk mengodekan dan mengurutkan objek (stuktur data) dengan kompleksitas dan penjang yang bersifat arbitrari.

### rollup {#rollups}

Jenis solusi penskalaan [lapisan 2](#layer-2) yang mengelompokkan beberapa transaksi dan mengirimkannya ke [rantai utama Ethereum](#mainnet) dalam transaksi tunggal. Ini memungkinkan pengurangan biaya [gas](#gas) dan menambah throughput [transaksi](#transaction). Ada rollup Optimistic dan Zero-knowledge yang menggunakan metode pengamanan berbeda untuk menawarkan perolehan skalabilitas ini.

<DocLink to="/developers/docs/scaling/layer-2-rollups/">
  Rollup
</DocLink>

<Divider />

## S {#section-s}

### Serenity {#serenity}

Fase pengembangan final dan keempat Ethereum, juga dikenal sebagai Ethereum 2.0.

<DocLink to="/eth2/">
  Ethereum 2.0 (Eth2)
</DocLink>

### Algoritma Hash Aman (SHA) {#sha}

Serumpun fungsi hash kriptografik yang diterbitkan oleh National Institute of Standards and Technology (NIST).

### shard / rantai shard {#shard}

Rantai [bukti taruhan](#pos) yang dikendalikan oleh [Rantai Suar](#beacon-chain) dan diamankan oleh [validator](#validator). Akan ada 64 rantai yang ditambahkan ke jaringan sebagai bagian dari peningkatan rantai shard Eth2. Rantai shard akan menawarkan throughput transaksi yang bertambah untuk Ethereum dengan menyediakan data tambahan untuk solusi [lapisan 2](#layer-2) seperti [rollup optimistic](#optimistic-rollups) dan [rollup ZK](#zk-rollups).

<DocLink to="/eth2/shard-chains">
  Rantai shard
</DocLink>

### sidechain {#sidechain}

Solusi penskalaan yang menggunakan rantai terpisah dengan [aturan konsensus](#consensus-rules) yang berbeda, sering kali lebih cepat. Sebuah jembatan diperlukan untuk menghubungkan sidechain ini ke [Jaringan Utama](#mainnet). [Rollup](#rollups) juga menggunakan sidechain, tapi mereka beroperasi dalam kolaborasi dengan [Jaringan Utama](#mainnet) sebagai gantinya.

<DocLink to="/developers/docs/scaling/sidechains/">
  Sidechain
</DocLink>

### singleton {#singleton}

Komputer yang memrogram istilah yang mendeskripsikan objek yang darinya hanya satu instance tunggal dapat eksis.

### slot {#slot}

Periode waktu (12 detik) yang dalamnya [Rantai Suar](#beacon-chain) dan blok rantai [shard](#shard) bisa diusulkan oleh seorang [validator](#validator) dalam sistem [bukti taruhan](#pos). Sebuah slot mungkin tidak berisi. 32 slot membentuk satu [epoch](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Bukti taruhan
</DocLink>

### kontrak pintar {#smart-contract}

Program yang beroperasi dalam infrastruktur komputasi Ethereum.

<DocLink to="/developers/docs/smart-contracts/">
  Pengantar Kontrak Pintar
</DocLink>

### Solidity {#solidity}

Bahasa pemrograman prosedural (imperatif) dengan sintaksis yang mirip dengan JavaScript, C++, atau Java. Bahasa paling populer dan paling sering digunakan untuk [kontrak pintar](#smart-contract) Ethereum. Dibuat oleh Dr. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Perakitan inline Solidity {#solidity-inline-assembly}

Bahasa penyusunan [EVM](#evm) dalam program [Solidity](#solidity). Dukungan Solidity untuk penyusunan inline membuat prosesnya lebih mudah untuk menulis operasi tertentu.

### Spurious Dragon {#spurious-dragon}

[Fork keras](#hard-fork) dari blockchain Ethereum, yang muncul di blok 2.675.000 untuk mengatasi lebih banyak vektor serangan penolakan layanan dan state yang bersih. (lihat [Tangerine Whistle](#tangerine-whistle)). Juga, mekanisme perlindungan terhadap serangan perulangan (lihat [nonce](#nonce)).

### stablecoin {#stablecoin}

[Token ERC-20](#token-standard) dengan nilai terpancang pada nilai aset lainnya. Ada stablecoin yang didukung oleh mata uang fiat seperti dolar, logam mulia seperti emas, dan mata uang kripto lainnya seperti Bitcoin.

<DocLink to="/eth/#tokens">
  ETH bukan satu-satunya kripto pada Ethereum
</DocLink>

### penaruhan {#staking}

Mendepositokan sejumlah [ether](#ether) (taruhan Anda) untuk menjadi validator dan mengamankan [jaringan](#network). Seorang validator memeriksa [transaksi](#transaction) dan mengusulkan [blok](#block) di bawah model konsensus [bukti taruhan](#pos). Penaruhan memberi Anda insentif ekonomi untuk bertindak demi keuntungan terbaik jaringan. Anda akan mendapatkan imbalan untuk melaksanakan tugas [validator](#validator) Anda, tapi kehilangan jumlah ETH secara beragam jika Anda tidak menjalankannya.

<DocLink to="/eth2/staking/">
  Taruhkan ETH Anda untuk menjadi validator Ethereum
</DocLink>

### kanal state {#state-channels}

Solusi [lapisan 2](#layer-2) di mana sebuah kanal disiapkan di antara perserta, di mana mereka bisa bertransaksi dengan bebas dan rendah biaya. Hanya [transaksi](#transaction) yang ditujukan untuk memulai kanal dan menutup kanal dikirimkan ke [Jaringan Utama](#mainnet). Ini memungkinkan throughput transaksi yang sangat tinggi, tapi memang bergantung pada prosedur mengetahui jumlah peserta dari awal dan mengunci pendanaan yang tersedia.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  Kanal state
</DocLink>

### szabo {#szabo}

Denominasi [ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

[Fork keras](#hard-fork) dalam blockchain Ethereum, yang muncul di blok 2.463.000 untuk mengubah perhitungan [gas](#gas) dari operasi intensif I/O tertentu dan untuk membersihkan state yang terkumpul dari serangan penolakan layanan, yang mengeksploitasi biaya gas rendah untuk operasi tersebut.

### testnet {#testnet}

Singkatan dari "test network", jaringan yang digunakan untuk mensimulasikan perilaku jaringan Ethereum utama (lihat [Jaringan Utama](#mainnet)).

<DocLink to="/developers/docs/networks/#testnets">
  Testnet
</DocLink>

### standar token {#token-standard}

Diperkenalkan oleh proposal ERC-20, ini menyediakan struktur [kontrak pintar](#smart-contract) yang terstandarisasi untuk token fungible. Token dari kontrak yang sama bisa dilacak, diperdagangkan, dan dapat bertukar informasi, tidak seperti [NFT](#nft).

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  Standar Token ERC-20
</DocLink>

### transaksi {#transaction}

Data yang dikomit ke Blockchain Ethereum yang ditandatangani oleh [akun](#account) pengirim, yang menargetkannya ke [alamat](#address) spesifik. Transaksi berisi metadata seperti [batasan gas](#gas-limit) untuk transaksi tersebut.

<DocLink to="/developers/docs/transactions/">
  Transaksi
</DocLink>

### biaya transaksi {#transaction-fee}

Biaya yang Anda perlukan kapan pun Anda menggunakan jaringan Ethereum. Contohnya mencakup pengiriman dana dari [dompet](#wallet), atau interaksi [dapp](#dapp), seperti menukar token atau membeli item yang dapat dikoleksi. Anda bisa menganggap ini seperti biaya layanan. Biaya ini akan berubah berdasarkan seberapa sibuk jaringan. Ini karena [penambang](#miner), orang-orang yang bertanggungjawab untuk memroses transaksi Anda, kemungkinan memprioritaskan transaksi dengan biaya lebih tinggi – sehingga kemacetan memaksa harga untuk naik.

Pada level teknis, biaya transaksi Anda berhubungan dengan seberapa banyak [gas](#gas) yang diperlukan transaksi Anda.

Mengurangi biaya transaksi adalah subjek diskusi yang sangat diminati saat ini. Lihat [Lapisan 2](#layer-2)

### Lengkap secara Turing {#turing-complete}

Konsep yang dinamai dari ahli matematika dan ilmuwan komputer Inggris, Alan Turing- sebuah sistem aturan manipulasi data (seperti rangkaian instruksi komputer, bahasa pemrograman, atau otomat seluler) dianggap "lengkap secara Turing" atau "universal secara komputasional" jika bisa digunakan untuk mensimulasikan mesin Turing mana pun.

<Divider />

## V {#section-v}

### validator {#validator}

[Node](#node) dalam sistem [bukti taruhan](#pos) yang bertanggungjawab untuk menyimpan data, memproses transaksi, dan menambahkan blok baru ke blockchain. Untuk mengaktifkan perangkat lunak validator, Anda harus [menaruhkan](#staking) 32 ETH.

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Bukti taruhan
</DocLink> <DocLink to="/eth2/staking/">
  Bertaruh di Ethereum
</DocLink>

### Bukti validitas {#validity-proof}

Model keamanan untuk solusi [lapisan 2](#layer-2) tertentu di mana, untuk meningkatkan kecepatan, transaksi di-[roll up](/#rollups) ke dalam kelompok dan dikirimkan ke Ethereum dalam transaksi tunggal. Komputasi transaksi dijalankan secara off-chain dan kemudian disediakan ke dalam rantai utama dengan bukti validitasnya. Metode ini meningkatkan kemungkinan jumlah transaksi sekaligus mempertahankan keamanan. Beberapa [rollup](#rollups) menggunakan [bukti penipuan](#fraud-proof).

<DocLink to="/developers/docs/scaling/layer-2-rollups/#zk-rollups">
  Rollup zero-knowledge
</DocLink>

### Validium {#validium}

Solusi off-chain yang menggunakan [bukti validitas](#validity-proof) untuk meningkatkan throughput transaksi. Tidak seperti [Rollup zero-knowledge](#zk-rollup), data Validium tidak disimpan pada [Jaringan Utama](#mainnet) lapisan 1.

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

Perangkat lunak yang berisi [kunci privat](#private-key). Digunakan untuk mengakses dan mengontrol [akun](#account) Ethereum dan berinteraksi dengan [kontrak pintar](#smart-contract). Kunci tidak perlu disimpan dalam dompet, dan bisa sebagai gantinya didapatkan dari penyimpanan luring (maksudnya kartu memori atau kertas) untuk keamanan lebih. Terlepas dari namanya, dompet tidak pernah menyimpan koin atau token sebenarnya.

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

### Rollup Zero-Knowledge {#zk-rollup}

[Rollup](#rollups) transaksi yang menggunakan [bukti validitas](#validity-proof) untuk menawarkan throughput transaksi [lapisan 2](#layer-2) yang ditingkatkan, sementara menggunakan keamanan yang disediakan oleh [Jaringan Utama](#mainnet) (lapisan 1). Sekalipun rollup ini tidak bisa menangani jenis transaksi rumit, seperti [Rollup optimistic](#optimistic-rollups), rollup ini tidak memiliki masalah latensi karena transaksi terbukti valid saat dikirimkan.

<DocLink to="/developers/docs/scaling/layer-2-rollups/#zk-rollups">
  Rollup Zero-knowledge
</DocLink>

<Divider />

## Sumber {#sources}

_Disediakan dalam bagian melalui [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) oleh [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) di bawah CC-BY-SA_

<Divider />

## Berkontribusi untuk halaman ini {#contribute-to-this-page}

Apakah kami melewatkan sesuatu? Apakah ada yang salah? Bantu kami meningkatkannya dengan berkontribusi untuk glosarium ini di GitHub!

[Pelajari lebih lanjut tentang cara berkontribusi](/contributing/adding-glossary-terms)
