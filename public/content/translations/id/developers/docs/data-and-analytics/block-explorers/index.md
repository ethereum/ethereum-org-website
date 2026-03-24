---
title: Penjelajah blok
description: Pengenalan tentang penjelajah blok, portal Anda ke dunia data blockchain, tempat Anda dapat meminta informasi tentang transaksi, akun, kontrak, dan banyak lagi.
lang: id
sidebarDepth: 3
---

Penjelajah blok adalah portal Anda ke data Ethereum. Anda dapat menggunakannya untuk melihat data waktu nyata tentang blok, transaksi, validator, akun, dan aktivitas onchain lainnya.

## Prasyarat {#prerequisites}

Anda harus memahami konsep dasar Ethereum sehingga Anda dapat memahami data yang diberikan oleh penjelajah blok kepada Anda. Mulailah dengan [pengenalan tentang Ethereum](/developers/docs/intro-to-ethereum/).

## Alat sumber terbuka {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) - Penjelajah Ethereum bebas iklan yang memungkinkan pengunduhan kumpulan datanya (open-core: modul inti adalah sumber terbuka)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Layanan {#services}

- [Blockchair](https://blockchair.com/ethereum) - Penjelajah Ethereum privat. Juga untuk menyortir dan memfilter data (mempool). Tersedia dalam bahasa Spanyol, Prancis, Italia, Belanda, Portugis, Rusia, Mandarin, dan Farsi
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) - Juga tersedia dalam bahasa Mandarin, Korea, Rusia, dan Jepang
- [Ethplorer](https://ethplorer.io/) - Penjelajah blok dengan fokus pada token. Juga tersedia dalam bahasa Mandarin, Spanyol, Prancis, Turki, Rusia, Korea, dan Vietnam
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Data {#data}

Ethereum dirancang transparan sehingga semuanya dapat diverifikasi. Penjelajah blok menyediakan antarmuka untuk mendapatkan informasi ini. Dan ini berlaku untuk jaringan utama Ethereum maupun testnet, jika Anda membutuhkan data tersebut. Data dibagi menjadi data eksekusi dan data konsensus. Data eksekusi merujuk pada transaksi yang telah dieksekusi dalam blok tertentu. Data konsensus merujuk pada blok itu sendiri dan validator yang mengusulkannya.

Berikut adalah ringkasan jenis data yang bisa Anda dapatkan dari penjelajah blok.

### Data eksekusi {#execution-data}

Blok baru ditambahkan ke Ethereum setiap 12 detik (kecuali jika pengusul blok melewatkan gilirannya), sehingga aliran data yang hampir konstan ditambahkan ke penjelajah blok. Blok berisi banyak data penting yang mungkin berguna bagi Anda:

**Data standar**

- Tinggi blok (Block height) - Nomor blok dan panjang blockchain (dalam blok) pada saat pembuatan blok saat ini
- Stempel waktu (Timestamp) - Waktu saat blok diusulkan
- Transaksi - Jumlah transaksi yang disertakan di dalam blok
- Penerima biaya (Fee recipient) - Alamat yang menerima tip biaya gas dari transaksi
- Hadiah blok (Block Reward) - Jumlah ETH yang diberikan kepada validator yang mengusulkan blok
- Ukuran (Size) - Ukuran data di dalam blok (diukur dalam byte)
- Gas yang digunakan (Gas used) - Total unit gas yang digunakan oleh transaksi di dalam blok
- Batas gas (Gas limit) - Total batas gas yang ditetapkan oleh transaksi di dalam blok
- Biaya dasar per gas (Base fee per gas) - Pengganda minimum yang diperlukan agar transaksi dapat disertakan dalam blok
- Biaya yang dibakar (Burnt fees) - Berapa banyak ETH yang dibakar di dalam blok
- Data tambahan (Extra data) - Data tambahan apa pun yang disertakan oleh pembuat di dalam blok

**Data lanjutan**

- Hash - Hash kriptografi yang mewakili header blok (pengidentifikasi unik dari blok)
- Hash induk (Parent hash) - Hash dari blok yang datang sebelum blok saat ini
- StateRoot - Hash root dari Merkle trie yang menyimpan seluruh status sistem

### Gas {#gas}

Penjelajah blok tidak hanya akan memberi Anda data tentang penggunaan Gas dalam transaksi dan blok, tetapi beberapa juga akan memberi Anda informasi tentang harga gas jaringan saat ini. Ini akan membantu Anda memahami penggunaan jaringan, mengirimkan transaksi yang aman, dan tidak menghabiskan terlalu banyak biaya untuk gas. Carilah API yang dapat membantu Anda memasukkan informasi ini ke dalam antarmuka produk Anda. Data khusus gas mencakup:

- Perkiraan unit gas yang dibutuhkan untuk transaksi yang aman namun lambat (+ perkiraan harga dan durasi)
- Perkiraan unit gas yang dibutuhkan untuk transaksi rata-rata (+ perkiraan harga dan durasi)
- Perkiraan unit gas yang dibutuhkan untuk transaksi cepat (+ perkiraan harga dan durasi)
- Waktu konfirmasi rata-rata berdasarkan harga gas
- Kontrak yang mengonsumsi gas - dengan kata lain, produk populer yang banyak digunakan di jaringan
- Akun yang menghabiskan gas - dengan kata lain, pengguna jaringan yang sering bertransaksi

### Transaksi {#transactions}

Penjelajah blok telah menjadi tempat umum bagi orang-orang untuk melacak kemajuan transaksi mereka. Hal ini karena tingkat detail yang bisa Anda dapatkan memberikan kepastian ekstra. Data transaksi mencakup:

**Data standar**

- Hash transaksi - Hash yang dihasilkan saat transaksi dikirimkan
- Status - Indikasi apakah transaksi tertunda, gagal, atau berhasil
- Blok - Blok tempat transaksi telah disertakan
- Stempel waktu - Waktu saat transaksi disertakan dalam blok yang diusulkan oleh validator
- Dari (From) - Alamat akun yang mengirimkan transaksi
- Ke (To) - Alamat penerima atau kontrak pintar yang berinteraksi dengan transaksi
- Token yang ditransfer - Daftar token yang ditransfer sebagai bagian dari transaksi
- Nilai (Value) - Total nilai ETH yang ditransfer
- Biaya transaksi - Jumlah yang dibayarkan kepada validator untuk memproses transaksi (dihitung dari harga gas\*gas yang digunakan)

**Data lanjutan**

- Batas gas - Jumlah maksimum unit gas yang dapat dikonsumsi oleh transaksi ini
- Gas yang digunakan - Jumlah aktual unit gas yang dikonsumsi oleh transaksi
- Harga gas - Harga yang ditetapkan per unit gas
- Nonce - Nomor transaksi untuk alamat `from` (ingatlah bahwa ini dimulai dari 0 sehingga nonce `100` sebenarnya adalah transaksi ke-101 yang dikirimkan oleh akun ini)
- Data masukan (Input data) - Informasi tambahan apa pun yang diperlukan oleh transaksi

### Akun {#accounts}

Ada banyak data yang dapat Anda akses tentang sebuah akun. Inilah sebabnya mengapa sering disarankan untuk menggunakan beberapa akun sehingga aset dan nilai Anda tidak dapat dilacak dengan mudah. Ada juga beberapa solusi yang sedang dikembangkan untuk membuat transaksi dan aktivitas akun menjadi lebih privat. Namun, berikut adalah data yang tersedia untuk akun:

**Akun pengguna**

- Alamat akun - Alamat publik yang dapat Anda gunakan untuk mengirim dana
- Saldo ETH - Jumlah ETH yang terkait dengan akun tersebut
- Total nilai ETH - Nilai dari ETH tersebut
- Token - Token yang terkait dengan akun dan nilainya
- Riwayat transaksi - Daftar semua transaksi di mana akun ini menjadi pengirim atau penerima

**Kontrak pintar**

Akun kontrak pintar memiliki semua data yang dimiliki akun pengguna, tetapi beberapa penjelajah blok bahkan akan menampilkan beberapa informasi kode juga. Contohnya meliputi:

- Pembuat kontrak - Alamat yang menerapkan kontrak ke Mainnet
- Transaksi pembuatan - Transaksi yang menyertakan penerapan ke Mainnet
- Kode sumber - Kode Solidity atau Vyper dari kontrak pintar
- ABI Kontrak - Antarmuka Biner Aplikasi (Application Binary Interface) dari kontrak—panggilan yang dilakukan kontrak dan data yang diterima
- Kode pembuatan kontrak - Bytecode yang dikompilasi dari kontrak pintar—dibuat saat Anda mengompilasi kontrak pintar yang ditulis dalam Solidity atau Vyper, dll.
- Peristiwa kontrak - Riwayat metode yang dipanggil dalam kontrak pintar—pada dasarnya adalah cara untuk melihat bagaimana kontrak digunakan dan seberapa sering

### Token {#tokens}

Token adalah jenis kontrak sehingga mereka akan memiliki data yang mirip dengan kontrak pintar. Namun karena mereka memiliki nilai dan dapat diperdagangkan, mereka memiliki titik data tambahan:

- Jenis - Apakah mereka ERC-20, ERC-721, atau standar token lainnya
- Harga - Jika mereka adalah ERC-20, mereka akan memiliki nilai pasar saat ini
- Kapitalisasi pasar (Market cap) - Jika mereka adalah ERC-20, mereka akan memiliki kapitalisasi pasar (dihitung dari harga\*total pasokan)
- Total pasokan - Jumlah token yang beredar
- Pemegang (Holders) - Jumlah alamat yang memegang token
- Transfer - Berapa kali token telah ditransfer antar akun
- Riwayat transaksi - Riwayat semua transaksi yang menyertakan token
- Alamat kontrak - Alamat token yang diterapkan ke Mainnet
- Desimal - Token ERC-20 dapat dibagi dan memiliki tempat desimal

### Jaringan {#network}

Beberapa data blok berkaitan dengan kesehatan Ethereum secara lebih holistik.

- Total transaksi - Jumlah transaksi sejak Ethereum dibuat
- Transaksi per detik - Jumlah transaksi yang dapat diproses dalam satu detik
- Harga ETH - Valuasi saat ini dari 1 ETH
- Total pasokan ETH - Jumlah ETH yang beredar—ingatlah bahwa ETH baru dibuat dengan pembuatan setiap blok dalam bentuk hadiah blok
- Kapitalisasi pasar - Perhitungan harga\*pasokan

## Data lapisan konsensus {#consensus-layer-data}

### Epoch {#epoch}

Untuk alasan keamanan, komite validator yang diacak dibuat pada akhir setiap epoch (setiap 6,4 menit). Data epoch mencakup:

- Nomor epoch
- Status difinalisasi - Apakah epoch telah difinalisasi (Ya/Tidak)
- Waktu - Waktu epoch berakhir
- Pengesahan (Attestations) - Jumlah pengesahan dalam epoch (suara untuk blok di dalam slot)
- Deposit - Jumlah deposit ETH yang disertakan dalam epoch (validator harus melakukan stake ETH untuk menjadi validator)
- Pemotongan (Slashings) - Jumlah penalti yang diberikan kepada pengusul blok atau pemberi pengesahan
- Partisipasi pemungutan suara - Jumlah ETH yang di-stake yang digunakan untuk mengesahkan blok
- Validator - Jumlah validator yang aktif untuk epoch tersebut
- Saldo rata-rata Validator - Saldo rata-rata untuk validator aktif
- Slot - Jumlah slot yang disertakan dalam epoch (slot mencakup satu blok yang valid)

### Slot {#slot}

Slot adalah peluang untuk pembuatan blok, data yang tersedia untuk setiap slot mencakup:

- Epoch - Epoch di mana slot tersebut valid
- Nomor slot
- Status - Status slot (Diusulkan/Dilewatkan)
- Waktu - Stempel waktu slot
- Pengusul (Proposer) - Validator yang mengusulkan blok untuk slot tersebut
- Root blok - Hash-tree-root dari BeaconBlock
- Root induk - Hash dari blok yang datang sebelumnya
- Root status - Hash-tree-root dari BeaconState
- Tanda tangan (Signature)
- Pengungkapan Randao (Randao reveal)
- Grafiti - Pengusul blok dapat menyertakan pesan sepanjang 32 byte ke proposal bloknya
- Data Eksekusi
  - Hash blok
  - Jumlah deposit
  - Root deposit
- Pengesahan - Jumlah pengesahan untuk blok di slot ini
- Deposit - Jumlah deposit selama slot ini
- Keluar sukarela (Voluntary exits) - Jumlah validator yang keluar selama slot
- Pemotongan - Jumlah penalti yang diberikan kepada pengusul blok atau pemberi pengesahan
- Suara (Votes) - Validator yang memberikan suara untuk blok di slot ini

### Blok {#blocks-1}

Proof-of-stake membagi waktu menjadi slot dan epoch. Jadi itu berarti data baru!

- Pengusul - Validator yang dipilih secara algoritmik untuk mengusulkan blok baru
- Epoch - Epoch di mana blok diusulkan
- Slot - Slot di mana blok diusulkan
- Pengesahan - Jumlah pengesahan yang disertakan dalam slot—pengesahan seperti suara yang menunjukkan bahwa blok siap untuk masuk ke Beacon Chain

### Validator {#validators}

Validator bertanggung jawab untuk mengusulkan blok dan mengesahkannya di dalam slot.

- Nomor validator - Nomor unik yang mewakili validator
- Saldo saat ini - Saldo validator termasuk hadiah
- Saldo efektif - Saldo validator yang digunakan untuk melakukan stake
- Pendapatan - Hadiah atau penalti yang diterima oleh validator
- Status - Apakah validator saat ini sedang online dan aktif atau tidak
- Efektivitas pengesahan - Waktu rata-rata yang dibutuhkan agar pengesahan validator disertakan dalam rantai
- Kelayakan untuk aktivasi - Tanggal (dan epoch) saat validator tersedia untuk memvalidasi
- Aktif sejak - Tanggal (dan epoch) saat validator menjadi aktif
- Blok yang diusulkan - Blok yang telah diusulkan oleh validator
- Pengesahan - Pengesahan yang telah diberikan oleh validator
- Deposit - Alamat pengirim (from), hash transaksi, nomor blok, stempel waktu, jumlah, dan status deposit mengunci yang dilakukan oleh validator

### Pengesahan {#attestations}

Pengesahan adalah suara "ya" untuk menyertakan blok dalam rantai. Data mereka berkaitan dengan catatan pengesahan dan validator yang mengesahkan

- Slot - Slot di mana pengesahan berlangsung
- Indeks komite - Indeks komite pada slot yang diberikan
- Bit agregasi - Mewakili pengesahan gabungan dari semua validator yang berpartisipasi dalam pengesahan
- Validator - Validator yang memberikan pengesahan
- Root blok beacon - Menunjuk ke blok yang disahkan oleh validator
- Sumber (Source) - Menunjuk ke epoch terbaru yang dibenarkan (justified)
- Target - Menunjuk ke batas epoch terbaru
- Tanda tangan

### Jaringan {#network-1}

Data tingkat atas lapisan konsensus mencakup hal-hal berikut:

- Epoch saat ini
- Slot saat ini
- Validator aktif - Jumlah validator aktif
- Validator tertunda - Jumlah validator yang menunggu untuk diaktifkan
- ETH yang di-stake - Jumlah ETH yang di-stake di jaringan
- Saldo rata-rata - Saldo ETH rata-rata dari validator

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Transaksi](/developers/docs/transactions/)
- [Akun](/developers/docs/accounts/)
- [Jaringan](/developers/docs/networks/)