---
title: Penjelajah blok
description: Pengantar tentang penjelajah blok, portal Anda ke dunia data blockchain, di mana Anda dapat membuat kueri informasi tentang transaksi, akun, kontrak, dan banyak lagi.
lang: id
sidebarDepth: 3
---

Penjelajah blok adalah portal Anda ke data Ethereum. Anda dapat menggunakannya untuk melihat data real-time pada blok, transaksi, validator, akun, dan aktivitas onchain lainnya.

## Persyaratan {#prerequisites}

Anda harus memahami konsep dasar Ethereum agar Anda dapat memahami data yang diberikan oleh penjelajah blok kepada Anda. Mulailah dengan [pengantar Ethereum](/developers/docs/intro-to-ethereum/).

## Layanan {#services}

- [Etherscan](https://etherscan.io/) -_Juga tersedia dalam bahasa Tionghoa, Korea, Rusia, dan Jepang_
- [3xpl](https://3xpl.com/ethereum)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair](https://blockchair.com/ethereum) -_Juga tersedia dalam bahasa Spanyol, Prancis, Italia, Belanda, Portugis, Rusia, Tionghoa, dan Farsi_
- [Blockscout](https://eth.blockscout.com/)
- [Chainlens](https://www.chainlens.com/)
- [Penjelajah Blok DexGuru](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) -_Juga tersedia dalam bahasa Tionghoa, Spanyol, Prancis, Turki, Rusia, Korea, dan Vietnam_
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)
- [Ethseer](https://ethseer.io)

## Perangkat sumber terbuka {#open-source-tools}

- [Otterscan](https://otterscan.io/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)

## Data {#data}

Ethereum bersifat transparan secara desainnya sehingga semua hal dapat diverifikasi. Penjelajah blok menyediakan antarmuka untuk mendapatkan informasi ini. Dan ini juga berlaku baik untuk jaringan utama Ethereum maupun testnet, jika Anda membutuhkan data itu. Data dibagi menjadi data eksekusi dan data konsensus. Data eksekusi mengacu pada transaksi yang telah dieksekusi dalam blok tertentu. Data konsensus mengacu pada blok itu sendiri dan validator yang mengusulkannya.

Berikut ini ringkasan jenis data yang bisa Anda dapatkan dari penjelajah blok.

### Data eksekusi {#execution-data}

Blok baru ditambahkan ke Ethereum setiap 12 detik (kecuali jika pengusul blok melewatkan gilirannya), sehingga aliran data yang hampir konstan ditambahkan ke penjelajah blok. Blok berisi banyak data penting yang mungkin Anda anggap berguna:

**Data standar**

- Tinggi blok - Nomor blok dan panjang blockchain (dalam blok) pada pembuatan blok saat ini
- Cap waktu - Waktu saat blok diusulkan
- Transaksi - Jumlah transaksi yang termasuk dalam blok
- Penerima biaya - Alamat yang menerima tip biaya gas dari transaksi
- Hadiah Blok - Jumlah ETH yang diberikan kepada validator yang mengajukan blok
- Ukuran - Ukuran data di dalam blok (diukur dalam byte)
- Gas yang digunakan - Total unit gas yang digunakan oleh transaksi di blok tersebut
- Batas gas - Total batas gas yang ditetapkan oleh transaksi di blok tersebut
- Biaya dasar per gas - Pengali minimum yang diperlukan agar transaksi dapat dimasukkan ke dalam blok
- Biaya yang dibakar - Berapa banyak ETH yang dibakar di dalam blok
- Data tambahan - Data tambahan apa pun yang disertakan oleh pembuat di dalam blok

**Data tingkat lanjut**

- Hash - Hash kriptografi yang mewakili header blok (pengenal unik blok)
- Hash induk - Hash dari blok yang datang sebelum blok saat ini
- StateRoot - Hash akar dari Merkle trie yang menyimpan seluruh status sistem

### Gas {#gas}

Penjelajah blok tidak hanya memberi Anda data tentang penggunaan Gas dalam transaksi dan blok, tapi beberapa juga akan memberi Anda informasi tentang harga gas saat ini di jaringan. Ini akan membantu Anda memahami penggunaan jaringan, mengirimkan transaksi aman, dan tidak memboroskan penggunaan gas. Carilah API yang bisa menolong Anda mendapat informasi ini ke dalam antarmuka produk Anda. Data khusus gas mencakup:

- Estimasi unit gas yang diperlukan untuk transaksi yang aman tapi lambat (+ perkiraan harga dan durasi)
- Estimasi unit gas yang diperlukan untuk transaksi rata-rata (+ perkiraan harga dan durasi)
- Estimasi unit gas yang diperlukan untuk transaksi yang cepat (+ perkiraan harga dan durasi)
- Waktu konfirmasi rata-rata berdasarkan harga gas
- Kontrak yang menggunakan gas - dengan kata lain, produk populer yang banyak digunakan di jaringan
- Akun yang menghabiskan pulsa - dengan kata lain, pengguna jaringan yang sering

### Transaksi {#transactions}

Penjelajah blok telah menjadi tempat umum bagi orang-orang untuk mengikuti perkembangan transaksi mereka. Ini karena level detail yang bisa Anda dapatkan memberikan kepastian ekstra. Data transaksi mencakup:

**Data standar**

- Hash transaksi - Hash yang dihasilkan saat transaksi dikirimkan
- Status - Indikasi apakah transaksi tertunda, gagal, atau sukses
- Blok - Blok di mana transaksi telah dimasukkan
- Cap waktu - Waktu saat transaksi dimasukkan ke dalam blok yang diusulkan oleh validator
- Dari - Alamat akun yang mengirimkan transaksi
- Kepada - Alamat penerima atau kontrak pintar yang berinteraksi dengan transaksi
- Token yang ditransfer - Daftar token yang ditransfer sebagai bagian dari transaksi
- Nilai - Total nilai ETH yang ditransfer
- Biaya transaksi - Jumlah yang dibayarkan kepada validator untuk memproses transaksi (dihitung berdasarkan harga gas\* gas yang digunakan)

**Data tingkat lanjut**

- Batas gas - Jumlah maksimum unit gas yang dapat dikonsumsi oleh transaksi ini
- Gas yang digunakan - Jumlah unit gas aktual yang dikonsumsi dalam transaksi
- Harga gas - Harga yang ditetapkan per unit gas
- Nonce - Nomor transaksi untuk alamat `from` (perlu diingat bahwa ini dimulai dari 0 sehingga nonce `100` sebenarnya adalah transaksi ke-101 yang dikirimkan oleh akun ini)
- Input data - Informasi tambahan yang diperlukan oleh transaksi

### Akun {#accounts}

Ada banyak data yang bisa Anda akses tentang sebuah akun. Inilah alasan mengapa sering direkomendasikan untuk menggunakan beberapa akun agar aset dan nilai Anda tidak bisa dilacak dengan mudah. Ada juga beberapa solusi yang sedang dikembangkan untuk membuat transaksi dan aktivitas akun lebih bersifat privat. Tapi berikut ini data yang tersedia untuk akun:

**Akun pengguna**

- Alamat akun - Alamat publik yang dapat Anda gunakan untuk mengirim dana
- Saldo ETH - Jumlah ETH yang terkait dengan akun tersebut
- Total nilai ETH - Nilai dari ETH tersebut
- Token - Token yang terkait dengan akun dan nilainya
- Riwayat transaksi - Daftar semua transaksi di mana akun ini menjadi pengirim atau penerima

**Kontrak pintar**

Akun kontrak pintar memiliki semua data dari akun pengguna, tapi beberapa penjelajah blok bahkan akan menampilkan juga beberapa informasi kode. Contohnya mencakup:

- Pembuat kontrak - Alamat yang menyebarkan kontrak ke Jaringan Utama
- Transaksi pembuatan - Transaksi yang mencakup penyebaran ke Jaringan Utama
- Kode sumber - Kode Solidity atau Vyper dari kontrak pintar
- ABI Kontrak - Antarmuka Biner Aplikasi dari kontrak, yaitu panggilan yang dilakukan oleh kontrak dan data yang diterima
- Kode penciptaan kontrak - Kode byte yang dikompilasi dari kontrak pintar—dibuat saat Anda mengompilasi kontrak pintar yang ditulis dalam Solidity, Vyper, dll.
- Event kontrak - Riwayat metode yang dipanggil dalam kontrak pintar—pada dasarnya cara untuk melihat bagaimana kontrak digunakan dan seberapa sering

### Token {#tokens}

Token adalah jenis kontrak sehingga mereka akan memiliki data yang serupa dengan kontrak pintar. Tapi karena token memiliki nilai dan bisa diperdagangkan, token memiliki poin data tambahan:

- Jenis - Apakah itu ERC-20, ERC-721 atau standar token lainnya
- Harga - Jika mereka adalah ERC-20, mereka akan memiliki nilai pasar saat ini
- Kapitalisasi pasar - Jika mereka ERC-20, mereka akan memiliki kapitalisasi pasar (dihitung berdasarkan harga\*total pasokan)
- Total pasokan - Jumlah token yang beredar
- Pemegang - Jumlah alamat yang memiliki token tersebut
- Transfer - Berapa kali token telah ditransfer antar akun
- Riwayat transaksi - Riwayat semua transaksi termasuk token
- Alamat kontrak - Alamat dari token yang telah didistribusikan ke Mainnet
- Desimal - Token ERC-20 dapat dibagi dan memiliki tempat desimal

### Jaringan {#network}

Beberapa data blok berkaitan dengan kesehatan Ethereum secara lebih menyeluruh.

- Total transaksi - Jumlah transaksi sejak Ethereum diciptakan
- Transaksi per detik - Jumlah transaksi yang dapat diproses perdetik
- Harga ETH - Penilaian saat ini dari 1 ETH
- Pasokan total ETH - Jumlah ETH yang beredar—ingat bahwa ETH baru diciptakan dengan pembuatan setiap blok dalam bentuk hadiah blok
- Kapitalisasi pasar - Perhitungan harga\* pasokan

## Data lapisan konsensus {#consensus-layer-data}

### Jangka Waktu {#epoch}

Untuk alasan keamanan, komite validator acak dibuat pada akhir setiap epoch (setiap 6,4 menit). Data epoch meliputi:

- Nomor epoch
- Status final - Apakah epoch telah diselesaikan (Ya/Tidak)
- Waktu - Waktu saat epoch berakhir
- Pengesahan - Jumlah pengesahan dalam epoch (suara untuk blok dalam slot)
- Setoran - Jumlah setoran ETH yang dimasukkan dalam epoch (validator harus bertaruh ETH untuk menjadi validator)
- Pemotongan - Jumlah hukuman yang diberikan kepada pengusul blok atau yang mengesahkan
- Partisipasi voting - Jumlah ETH yang dipertaruhkan yang digunakan untuk mengesahkan blok
- Validator - Jumlah validator yang aktif untuk epoch tersebut
- Rata-rata Saldo Validator - Rata-rata saldo untuk validator yang aktif
- Slot - Jumlah slot yang termasuk dalam epoch (slot mencakup satu blok yang sah)

### Ruang {#slot}

Slot adalah kesempatan untuk pembuatan blok, data yang tersedia untuk tiap slot meliputi:

- Epoch - Epoch di mana slot tersebut valid
- Nomor slot
- Status - Status dari slot tersebut (Diajukan/Terlewat)
- Waktu - Penanda waktu dari slot tersebut
- Pengusul - Validator yang mengajukan blok untuk slot tersebut
- Akar blok - Akar pohon hash dari BeaconBlock
- Akar induk - Hash dari blok yang datang sebelumnya
- Akar negara - Akar pohon hash dari BeaconState
- Tanda tangan
- Pengungkapan Randao
- Graffiti - Pengusul blok dapat menyertakan pesan panjang 32 byte ke proposal bloknya
- Data Eksekusi
  - Hash blok
  - Jumlah deposito
  - Akar deposito
- Pengesahan - Jumlah pengesahan untuk blok di slot ini
- Setoran - Jumlah setoran selama slot ini
- Keluar secara sukarela - Jumlah validator yang keluar selama slot
- Pemotongan - Jumlah hukuman yang diberikan kepada pengusul blok atau yang mengesahkan
- Suara - Validator yang memberikan suara untuk blok di slot ini

### Blok {#blocks-1}

Proof-of-stake membagi waktu ke dalam slot dan zaman. Jadi ini berarti data yang baru!

- Pengusul - Validator yang dipilih secara algoritmik untuk mengusulkan blok baru
- Zaman - Zaman di mana blok diusulkan
- Slot - Slot di mana blok diusulkan
- Pengesahan - Jumlah pengesahan yang termasuk dalam slot-pengesahan adalah seperti suara yang mengindikasikan bahwa blok tersebut siap untuk dikirim ke Beacon Chain

### Validator {#validators}

Validator bertanggung jawab dalam mengusulkan blok dan mengesahkannya dalam slot.

- Nomor validator - Nomor unik yang mewakili validator
- Saldo saat ini - Saldo validator termasuk hadiah
- Saldo efektif - Saldo validator yang digunakan untuk staking
- Pendapatan - Imbalan atau hukuman yang diterima oleh validator
- Status - Apakah validator saat ini sedang online dan aktif atau tidak
- Efektivitas pengesahan - Waktu rata-rata yang diperlukan agar pengesahan validator dimasukkan ke dalam rantai
- Kelayakan untuk aktivasi - Tanggal (dan waktu) ketika validator tersedia untuk divalidasi
- Aktif sejak - Tanggal (dan zaman) ketika validator menjadi aktif
- Blok yang diusulkan - Blok yang diusulkan oleh validator
- Pengesahan - Pengesahan yang diberikan oleh validator
- Setoran - Alamat asal, hash transaksi, nomor blok, stempel waktu, jumlah dan status setoran staking yang dibuat oleh validator

### Pengesahan {#attestations}

Atestasi adalah pengambilan suara "ya" untuk memasukkan blok ke dalam rantai. Data ini terkait dengan catatan dari pengesahan dan validator yang mengesahkan

- Slot - Slot tempat pengesahan berlangsung
- Indeks komite - Indeks komite pada slot yang diberikan
- Bit agregasi - Mewakili pengesahan agregat dari semua validator yang berpartisipasi dalam pengesahan
- Validator - Para validator yang memberikan pengesahan
- Akar blok suar - Menunjuk ke blok yang sedang disahkan oleh validator
- Sumber - Menunjuk ke zaman terbaru yang dibenarkan
- Target - Menunjuk ke batas zaman terbaru
- Tanda tangan

### Jaringan {#network-1}

Data tingkat atas lapisan konsensus mencakup berikut ini:

- Epoch saat ini
- Slot saat ini
- Validator aktif - Jumlah validator aktif
- Validator yang tertunda - Jumlah validator yang menunggu untuk diaktifkan
- ETH yang dipertaruhkan - Jumlah ETH yang dipertaruhkan dalam jaringan
- Saldo rata-rata - Saldo ETH rata-rata validator

## Penjelajah blok {#block-explorers}

- [Etherscan](https://etherscan.io/) - penjelajah blok yang dapat Anda gunakan untuk mengambil data untuk Mainnet Ethereum dan testnet
- [3xpl](https://3xpl.com/ethereum) - penjelajah Ethereum sumber terbuka bebas iklan yang memungkinkan pengunduhan kumpulan datanya
- [Beaconcha.in](https://beaconcha.in/) - penjelajah blok sumber terbuka untuk Mainnet Ethereum dan testnet
- [Blockchair](https://blockchair.com/ethereum) - penjelajah Ethereum paling privat. Juga digunakan untuk pemilihan dan penyaringan (mempool) data
- [Etherchain](https://www.etherchain.org/) - penjelajah blok untuk Mainnet Ethereum
- [Ethplorer](https://ethplorer.io/) - penjelajah blok dengan fokus pada token untuk Mainnet Ethereum dan testnet Kovan

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Transaksi](/developers/docs/transactions/)
- [Akun](/developers/docs/accounts/)
- [Jaringan](/developers/docs/networks/)
