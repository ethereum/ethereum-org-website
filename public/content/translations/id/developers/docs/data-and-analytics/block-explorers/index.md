---
title: Penjelajah blok
description: Pengantar tentang penjelajah blok, portal Anda ke dunia data rantai blok, tempat Anda dapat meminta informasi tentang transaksi, akun, kontrak, dan banyak lagi.
lang: id
sidebarDepth: 3
---

Penjelajah blok adalah portal Anda ke data Ethereum. Anda dapat menggunakannya untuk melihat data waktu nyata tentang blok, transaksi, validator, akun, dan aktivitas onchain lainnya.

## Prasyarat {#prerequisites}

Anda harus memahami konsep dasar Ethereum sehingga Anda dapat memahami data yang diberikan oleh penjelajah blok kepada Anda. Mulailah dengan [pengantar ke Ethereum](/developers/docs/intro-to-ethereum/).

## Alat sumber terbuka {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) - Penjelajah Ethereum bebas iklan yang memungkinkan pengunduhan set datanya (open-core: modul inti adalah sumber terbuka)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Layanan {#services}

- [Blockchair](https://blockchair.com/ethereum) - Penjelajah Ethereum privat. Juga untuk menyortir dan memfilter data (mempool). Tersedia dalam bahasa Spanyol, Prancis, Italia, Belanda, Portugis, Rusia, Mandarin, dan Farsi
- [Chainlens](https://www.chainlens.com/)
- [Penjelajah Blok DexGuru](https://ethereum.dex.guru/)
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

- Tinggi blok - Nomor blok dan panjang rantai blok (dalam blok) pada saat pembuatan blok saat ini
- Stempel waktu - Waktu saat sebuah blok diusulkan
- Transaksi - Jumlah transaksi yang disertakan di dalam blok
- Penerima biaya - Alamat yang menerima tip biaya gas dari transaksi
- Imbalan Blok - Jumlah ETH yang diberikan kepada validator yang mengusulkan blok
- Ukuran - Ukuran data di dalam blok (diukur dalam bita)
- Gas yang digunakan - Total unit gas yang digunakan oleh transaksi di dalam blok
- Batas gas - Total batas gas yang ditetapkan oleh transaksi di dalam blok
- Biaya dasar per gas - Pengganda minimum yang diperlukan agar transaksi dapat disertakan dalam sebuah blok
- Biaya yang dibakar - Berapa banyak ETH yang dibakar di dalam blok
- Data ekstra - Data tambahan apa pun yang disertakan oleh pembangun di dalam blok

**Data lanjutan**

- Hash - Hash kriptografi yang mewakili header blok (pengidentifikasi unik dari blok)
- Hash induk - Hash dari blok yang datang sebelum blok saat ini
- StateRoot - Hash akar dari trie Merkle yang menyimpan seluruh state dari sistem

### Gas {#gas}

Penjelajah blok tidak hanya akan memberi Anda data tentang penggunaan Gas dalam transaksi dan blok, tetapi beberapa juga akan memberi Anda informasi tentang harga gas jaringan saat ini. Ini akan membantu Anda memahami penggunaan jaringan, mengirimkan transaksi yang aman, dan tidak menghabiskan terlalu banyak biaya untuk gas. Carilah API yang dapat membantu Anda memasukkan informasi ini ke dalam antarmuka produk Anda. Data khusus gas mencakup:

- Perkiraan unit gas yang dibutuhkan untuk transaksi yang aman namun lambat (+ perkiraan harga dan durasi)
- Perkiraan unit gas yang dibutuhkan untuk transaksi rata-rata (+ perkiraan harga dan durasi)
- Perkiraan unit gas yang dibutuhkan untuk transaksi cepat (+ perkiraan harga dan durasi)
- Waktu konfirmasi rata-rata berdasarkan harga gas
- Kontrak yang mengonsumsi gas - dengan kata lain, produk populer yang banyak digunakan di jaringan
- Akun yang menghabiskan gas - dengan kata lain, pengguna jaringan yang sering bertransaksi

### Transaksi {#transactions}

Penjelajah blok telah menjadi tempat yang umum bagi orang-orang untuk melacak kemajuan transaksi mereka. Hal itu karena tingkat detail yang bisa Anda dapatkan memberikan kepastian ekstra. Data transaksi mencakup:

**Data standar**

- Hash transaksi - Hash yang dihasilkan saat transaksi dikirimkan
- Status - Indikasi apakah transaksi tersebut tertunda, gagal, atau berhasil
- Blok - Blok tempat transaksi tersebut disertakan
- Stempel waktu - Waktu saat transaksi disertakan dalam blok yang diusulkan oleh validator
- Dari - Alamat akun yang mengirimkan transaksi
- Ke - Alamat penerima atau kontrak pintar yang berinteraksi dengan transaksi
- Token yang ditransfer - Daftar token yang ditransfer sebagai bagian dari transaksi
- Nilai - Total nilai ETH yang ditransfer
- Biaya transaksi - Jumlah yang dibayarkan kepada validator untuk memproses transaksi (dihitung dari harga gas\*gas yang digunakan)

**Data lanjutan**

- Batas gas - Jumlah maksimum unit gas yang dapat dikonsumsi oleh transaksi ini
- Gas yang digunakan - Jumlah aktual unit gas yang dikonsumsi oleh transaksi
- Harga gas - Harga yang ditetapkan per unit gas
- Nonce - Nomor transaksi untuk alamat `from` (ingatlah bahwa ini dimulai dari 0 sehingga nonce `100` sebenarnya akan menjadi transaksi ke-101 yang dikirimkan oleh akun ini)
- Data masukan - Informasi tambahan apa pun yang diperlukan oleh transaksi

### Akun {#accounts}

Ada banyak data yang dapat Anda akses tentang sebuah akun. Inilah sebabnya mengapa sering disarankan untuk menggunakan beberapa akun sehingga aset dan nilai Anda tidak dapat dilacak dengan mudah. Ada juga beberapa solusi yang sedang dikembangkan untuk membuat transaksi dan aktivitas akun menjadi lebih privat. Namun, berikut adalah data yang tersedia untuk akun:

**Akun pengguna**

- Alamat akun - Alamat publik yang dapat Anda gunakan untuk mengirim dana
- Saldo ETH - Jumlah ETH yang terkait dengan akun tersebut
- Total nilai ETH - Nilai dari ETH tersebut
- Token - Token yang terkait dengan akun dan nilainya
- Riwayat transaksi - Daftar semua transaksi di mana akun ini menjadi pengirim atau penerima

**Kontrak pintar**

Akun kontrak pintar memiliki semua data yang dimiliki oleh akun pengguna, tetapi beberapa penjelajah blok bahkan akan menampilkan beberapa informasi kode juga. Contohnya meliputi:

- Pembuat kontrak - Alamat yang menyebarkan kontrak ke Mainnet
- Transaksi pembuatan - Transaksi yang menyertakan penyebaran ke Mainnet
- Kode sumber - Kode Solidity atau Vyper dari kontrak pintar
- ABI Kontrak - Antarmuka Biner Aplikasi (Application Binary Interface) dari kontrak—panggilan yang dilakukan kontrak dan data yang diterima
- Kode pembuatan kontrak - Kode bita yang dikompilasi dari kontrak pintar—dibuat saat Anda mengompilasi kontrak pintar yang ditulis dalam Solidity atau Vyper, dll.
- Peristiwa kontrak - Riwayat metode yang dipanggil dalam kontrak pintar—pada dasarnya adalah cara untuk melihat bagaimana kontrak digunakan dan seberapa sering

### Token {#tokens}

Token adalah jenis kontrak sehingga mereka akan memiliki data yang mirip dengan kontrak pintar. Namun karena token memiliki nilai dan dapat diperdagangkan, token memiliki titik data tambahan:

- Jenis - Apakah itu ERC-20, ERC-721, atau standar token lainnya
- Harga - Jika itu adalah ERC-20, token tersebut akan memiliki nilai pasar saat ini
- Kapitalisasi pasar - Jika itu adalah ERC-20, token tersebut akan memiliki kapitalisasi pasar (dihitung dari harga\*total pasokan)
- Total pasokan - Jumlah token yang beredar
- Pemegang - Jumlah alamat yang memegang token
- Transfer - Berapa kali token telah ditransfer antar akun
- Riwayat transaksi - Riwayat semua transaksi yang menyertakan token
- Alamat kontrak - Alamat token yang disebarkan ke Mainnet
- Desimal - Token ERC-20 dapat dibagi dan memiliki tempat desimal

### Jaringan {#network}

Beberapa data blok berkaitan dengan kesehatan Ethereum secara lebih holistik.

- Total transaksi - Jumlah transaksi sejak Ethereum dibuat
- Transaksi per detik - Jumlah transaksi yang dapat diproses dalam satu detik
- Harga ETH - Valuasi 1 ETH saat ini
- Total pasokan ETH - Jumlah ETH yang beredar—ingatlah bahwa ETH baru dibuat dengan pembuatan setiap blok dalam bentuk imbalan blok
- Kapitalisasi pasar - Perhitungan harga\*pasokan

## Data lapisan konsensus {#consensus-layer-data}

### Epok {#epoch}

Untuk alasan keamanan, komite validator yang diacak dibuat pada akhir setiap Epok (setiap 6,4 menit). Data Epok mencakup:

- Nomor Epok
- Status difinalisasi - Apakah Epok telah difinalisasi (Ya/Tidak)
- Waktu - Waktu saat Epok berakhir
- Atestasi - Jumlah atestasi dalam Epok (suara untuk blok di dalam slot)
- Deposit - Jumlah deposit ETH yang disertakan dalam Epok (validator harus melakukan staking ETH untuk menjadi validator)
- Pemotongan (Slashing) - Jumlah penalti yang diberikan kepada pengusul blok atau pemberi atestasi
- Partisipasi pemungutan suara - Jumlah ETH yang di-stake yang digunakan untuk memberikan atestasi pada blok
- Validator - Jumlah validator yang aktif untuk Epok tersebut
- Saldo Validator rata-rata - Saldo rata-rata untuk validator aktif
- Slot - Jumlah slot yang disertakan dalam Epok (slot mencakup satu blok yang valid)

### Slot {#slot}

Slot adalah peluang untuk pembuatan blok, data yang tersedia untuk setiap slot mencakup:

- Epok - Epok di mana slot tersebut valid
- Nomor slot
- Status - Status slot (Diusulkan/Dilewatkan)
- Waktu - Stempel waktu slot
- Pengusul - Validator yang mengusulkan blok untuk slot tersebut
- Akar blok - Akar pohon hash (hash-tree-root) dari blok suar (BeaconBlock)
- Akar induk - Hash dari blok yang datang sebelumnya
- Akar state - Akar pohon hash (hash-tree-root) dari BeaconState
- Tanda tangan
- Pengungkapan RANDAO
- Grafiti - Pengusul blok dapat menyertakan pesan sepanjang 32 bita ke proposal bloknya
- Data Eksekusi
  - Hash blok
  - Jumlah deposit
  - Akar deposit
- Atestasi - Jumlah atestasi untuk blok di slot ini
- Deposit - Jumlah deposit selama slot ini
- Keluar sukarela - Jumlah validator yang keluar selama slot tersebut
- Pemotongan (Slashing) - Jumlah penalti yang diberikan kepada pengusul blok atau pemberi atestasi
- Suara - Validator yang memberikan suara untuk blok di slot ini

### Blok {#blocks-1}

Bukti Kepemilikan (PoS) membagi waktu menjadi slot dan Epok. Jadi itu berarti data baru!

- Pengusul - Validator yang dipilih secara algoritmik untuk mengusulkan blok baru
- Epok - Epok di mana blok tersebut diusulkan
- Slot - Slot di mana blok tersebut diusulkan
- Atestasi - Jumlah atestasi yang disertakan dalam slot—atestasi seperti suara yang menunjukkan bahwa blok siap untuk masuk ke Rantai suar

### Validator {#validators}

Validator bertanggung jawab untuk mengusulkan blok dan memberikan atestasi kepadanya di dalam slot.

- Nomor validator - Nomor unik yang mewakili validator
- Saldo saat ini - Saldo validator termasuk imbalan
- Saldo efektif - Saldo validator yang digunakan untuk staking
- Pendapatan - Imbalan atau penalti yang diterima oleh validator
- Status - Apakah validator saat ini sedang daring dan aktif atau tidak
- Efektivitas atestasi - Waktu rata-rata yang dibutuhkan agar atestasi validator disertakan dalam rantai
- Kelayakan untuk aktivasi - Tanggal (dan Epok) saat validator menjadi tersedia untuk memvalidasi
- Aktif sejak - Tanggal (dan Epok) saat validator menjadi aktif
- Blok yang diusulkan - Blok yang telah diusulkan oleh validator
- Atestasi - Atestasi yang telah diberikan oleh validator
- Deposit - Alamat asal, hash transaksi, nomor blok, stempel waktu, jumlah, dan status dari deposit staking yang dilakukan oleh validator

### Atestasi {#attestations}

Atestasi adalah suara "ya" untuk menyertakan blok dalam rantai. Datanya berkaitan dengan catatan atestasi dan validator yang memberikan atestasi

- Slot - Slot di mana atestasi berlangsung
- Indeks komite - Indeks komite pada slot yang diberikan
- Bit agregasi - Mewakili atestasi gabungan dari semua validator yang berpartisipasi dalam atestasi
- Validator - Validator yang memberikan atestasi
- Akar blok suar - Menunjuk ke blok yang diberikan atestasi oleh validator
- Sumber - Menunjuk ke Epok terjustifikasi terbaru
- Target - Menunjuk ke batas Epok terbaru
- Tanda tangan

### Jaringan {#network-1}

Data tingkat atas lapisan konsensus mencakup hal-hal berikut:

- Epok saat ini
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