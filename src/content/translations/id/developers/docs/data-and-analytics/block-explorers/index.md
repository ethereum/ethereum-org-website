---
title: Penjelajah blok
description: Pengantar tentang penjelajah blok, portal Anda ke dunia data blockchain, di mana Anda dapat membuat kueri informasi tentang transaksi, akun, kontrak, dan banyak lagi.
lang: id
sidebarDepth: 3
---

Penjelajah blok adalah portal Anda ke data Ethereum. Anda bisa menggunakannya untuk melihat data waktu nyata tentang blok, transaksi, penambang, akun, dan aktivitas on-chain lainnya.

## Prasyarat {#prerequisites}

Anda harus memahami konsep dasar Ethereum agar Anda dapat memahami data yang diberikan oleh penjelajah blok kepada Anda. Mulai dengan [pengantar Ethereum](/developers/docs/intro-to-ethereum/).

## Layanan {#services}

- [Etherscan](https://etherscan.io/) –_Juga tersedia dalam bahasa Mandarin, Korea, Rusia, dan Jepang_
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) –_Juga tersedia dalam bahasa Mandarin, Spanyol, Prancis, Turki, Rusia, Korea, dan Vietnam_
- [Blockchair](https://blockchair.com/ethereum) –_Juga tersedia dalam bahasa Spanyol, Prancis, Italia, Belanda, Portugis, Rusia, Mandarin, dan Persia_
- [Blockscout](https://blockscout.com/)
- [OKLink](https://www.oklink.com/eth)

## Data {#data}

Ethereum bersifat transparan secara desainnya sehingga semua hal dapat diverifikasi. Penjelajah blok menyediakan antarmuka untuk mendapatkan informasi ini. Dan ini juga berlaku baik untuk jaringan utama Ethereum maupun testnet, jika Anda membutuhkan data itu.

Berikut ini ringkasan jenis data yang bisa Anda dapatkan dari penjelajah blok.

### Blok {#blocks}

Blok baru ditambahkan ke Ethereum setiap ~12 detik (ini bisa berfluktuasi) sehingga ada aliran data hampir konstan yang ditambahkan ke penjelajah data. Blok berisi banyak data penting yang mungkin Anda anggap berguna:

**Data standar**

- Ketinggian blok – Angka dan panjang blok dari blockchain (dalam blok) yang terkait dengan pembuatan blok saat ini.
- Stempel waktu – Waktu di mana seorang penambang menambang blok.
- Transaksi – Jumlah transaksi yang termasuk dalam blok.
- Penambang – Alamat penambang yang menambang blok.
- Imbalan – Jumlah ETH yang diberikan kepada penambang untuk menambahkan blok (imbalan 2ETH standar + biaya tranksasi dari transaksi yang termasuk dalam blok).
- Tingkat kesulitan – Tingkat kesulitan yang terkait dengan penambangan blok.
- Ukuran – Ukuran data dalam blok (diukur dalam bita).
- Gas terpakai – Jumlah unit gas yang dipakai oleh transaksi dalam blok.
- Batas gas – Jumlah batas gas yang ditetapkan oleh transaksi dalam blok.
- Data ekstra – Data ekstra yang telah dimasukkan penambang ke dalam blok.

**Data tingkat lanjut**

- Hash – Hash kriptografik yang mewakili header blok (pengenal unik blok).
- Hash induk – Hash blok yang ada sebelum blok saat ini.
- Sha3Uncles – Hash kombinasi dar semua paman untuk induk tertentu.
- StateRoot – Hash akar dari pohon Merkle yang menyimpan keseluruhan state sistem.
- Nonce – Nilai yang digunakan untuk menunjukkan bukti kerja dari satu blok oleh penambang.

**Blok paman**

Blok paman dibuat ketika dua penambang membuat blok pada saat hampir bersamaan - hanya satu blok yang bisa divalidasi di seluruh node. Blok paman tidak termasuk tapi masih mendapatkan imbalan untuk pekerjaannya.

Penjelajah blok menyediakan informasi tentang blok paman seperti:

- Nomor blok paman.
- Waktu pembuatan blok.
- Ketinggian blok saat dibuat.
- Siapa yang menambang blok.
- Imbalan ETH.

### Gas {#gas}

Penjelajah blok tidak hanya memberi Anda data tentang penggunaan Gas dalam transaksi dan blok, tapi beberapa juga akan memberi Anda informasi tentang harga gas saat ini di jaringan. Ini akan membantu Anda memahami penggunaan jaringan, mengirimkan transaksi aman, dan tidak memboroskan penggunaan gas. Carilah API yang bisa menolong Anda mendapat informasi ini ke dalam antarmuka produk Anda. Data khusus gas mencakup:

- Estimasi unit gas yang diperlukan untuk transaksi yang aman tapi lambat (+ perkiraan harga dan durasi).
- Estimasi unit gas yang diperlukan untuk transaksi rata-rata (+ perkiraan harga dan durasi).
- Estimasi unit gas yang diperlukan untuk transaksi yang cepat (+ perkiraan harga dan durasi).
- Waktu konfirmasi rata-rata berdasarkan harga gas.
- Kontrak yang menggunakan gas - dengan kata lain, produk populer yang sering membutuhkan banyak penggunaan pada jaringan.
- Akun yang menggunakan gas - dengan kata lain, pengguna jaringan yang aktif.

### Transaksi {#transactions}

Penjelajah blok telah menjadi tempat umum bagi orang-orang untuk mengikuti perkembangan transaksi mereka. Ini karena level detail yang bisa Anda dapatkan memberikan kepastian ekstra. Data transaksi mencakup:

**Data standar**

- Hash transaksi – Hash yang dihasilkan ketika transaksi dikirimkan.
- Status – Indikasi terkait apakah transaksi dalam status menunggu persetujuan, gagal, atau berhasil.
- Blok – Blok di mana transaksi telah dimasukkan.
- Stempel waktu – Waktu saat seorang penambang menambang transaksi.
- Dari – Alamat akun yang mengirimkan transaksi.
- Kepada – Alamat penerima atau kontrak pintar yang berinteraksi dengan transaksi.
- Token yang ditransfer – Daftar token yang ditransfer sebagai bagian dari transaksi.
- Nilai – Nilai total ETH yang ditransfer.
- Biaya transaksi – Jumlah yang dibayarkan kepada penambang untuk memroses transaksi (dihitung berdasarkan harga gas\*gas yang digunakan).

**Data tingkat lanjut**

- Batas gas – Jumlah maksimum unit gas yang bisa digunakan oleh transaksi ini.
- Gas yang digunakan – Jumlah sebenarnya unit gas yang digunakan oleh transaksi.
- Harga gas – Harga yang ditetapkan untuk setiap unit gas.
- Nonce – Nomor transaksi untuk alamat `dari` (ingat ini dimulai dari angka 0 jadi nonce bernilai `100` sebenarnya akan menjadi transaksi ke-101 yang dikirimkan oleh akun ini.
- Data input – Informasi ekstra yang diperlukan oleh transaksi.

### Akun {#accounts}

Ada banyak data yang bisa Anda akses tentang sebuah akun. Inilah alasan mengapa sering direkomendasikan untuk menggunakan beberapa akun agar aset dan nilai Anda tidak bisa dilacak dengan mudah. Ada juga beberapa solusi yang sedang dikembangkan untuk membuat transaksi dan aktivitas akun lebih bersifat privat. Tapi berikut ini data yang tersedia untuk akun:

**Akun pengguna**

- Alamat akun – Alamat publik yang bisa Anda gunakan sebagai tujuan pengiriman dana.
- Saldo ETH – Jumlah ETH yang terkait dengan akun tersebut.
- Total nilai ETH – Nilai dari ETH.
- Token – Token yang terkait dengan akun beserta nilainya.
- Riwayat transaksi – Daftar dari semua transaksi di mana akun ini bertindak baik sebagai pengirim atau penerima.

**Kontrak pintar**

Akun kontrak pintar memiliki semua data dari akun pengguna, tapi beberapa penjelajah blok bahkan akan menampilkan juga beberapa informasi kode. Contohnya mencakup:

- Kreator kontrak – Alamat yang menggunakan kontrak ke Jaringan utama.
- Transaksi pembuatan – Transaksi yang mencakup proses penggunaan ke Jaringan Utama.
- Kode sumber – Kode solidity atay vyper dari kontrak pintar.
- ABI kontrak – Antarmuka Biner Aplikasi kontrak – pemanggilan yang dilakukan kontrak dan data yang diterima.
- Kode pembuatan kontrak – Kode bita yang dikompilasi dari kontrak pintar – dibuat ketika Anda mengompilasi kontrak pintar yang ditulis dengan Solidity atau Vyper, dll.
- Aksi kontrak – Riwayat dari metode yang dipanggil dalam kontrak pintar. Pada dasarnya, ini adalah cara untuk melihat bagaimana cara menggunakan kontrak dan seberapa sering.

### Token {#tokens}

Token adalah suatu jenis kontrak sehingga akan memiliki data yang sama dengan kontrak pintar. Tapi karena token memiliki nilai dan bisa diperdagangkan, token memiliki poin data tambahan:

- Jenis – Apakah jenis token adalah ERC-20, ERC-721 atau standar token lainnya.
- Harga – Jika jenis token adalah ERC-20, token akan memiliki nilai pasar saat ini.
- Kapitalisasi pasar – Jika jenis token adalah ERC-20, token akan memiliki kapitalisasi pasar (dihitung berdasarkan harga\*total persediaan).
- Persediaan total – Jumlah token dalam perederan.
- Pemilik – Jumlah alamat yang memiliki token.
- Transfer – Berapa kali token telah ditransfer antar akun.
- Riwayat transaksi – Riwayat semua transaksi yang melibatkan token.
- Alamat kontrak – Alamat token yang diterapkan ke Jaringan Utama.
- Desimal – Token ERC-20 bisa dibagi dan memiliki tempat desimal.

### Jaringan {#network}

Tentu ada beberapa data yang berbicara tentang kesehatan jaringan. Ini cukup spesifik dalam mekanisme konsensus bukti kerja Ethereum. Ketika Ethereum beralih ke bukti taruhan, beberapa data ini akan menjadi mubazir

- Tingkat kesulitan – Tingkat kesulitan penambangan saat ini.
- Tingkat hash – Estimasi berapa banyak hash yang akan dihasilkan oleh penambang Ethereum yang mencoba menyelesaikan blok Ethereum saat ini atau blok tertentu.
- Transaksi total – Jumlah transaksi sejak Ethereum didirikan.
- Transaksi per detik – Jumlah transaksi yang dapat diproses dalam satu detik.
- Harga ETH – Taksiran harga 1 ETH saat ini.
- Persediaan ETH total – Jumlah ETH dalam perederan – ingat ETH baru dihasilkan bersamaan dengan pembuatan tiap blok dalam bentuk imbalan blok.
- Kapitalisasi pasar – Penghitungan harga\*persediaan.

## Data lapisan konsensus {#consensus-layer-data}

Peningkatan skalabilitas masih dalam pengembangan, tetapi rasanya layak membicarakan tentang beberapa poin data yang dapat disediakan oleh penjelajah. Sebenarnya, semua data ini tersedia saat ini dalam testnet.

Jika Anda belum terbiasa dengan road map, lihat [gambaran umum kami tentang peningkatan Ethereum](/upgrades/).

### Epoch {#epoch}

Rantai Suar akan membuat komite validator yang dipilih secara acak pada akhir dari setiap epoch (setiap 6,4 menit) untuk alasan keamanan. Data epoch meliputi:

- Nomor epoch.
- Status terselesaikan – Apakah epoch telah diselesaikan (Ya/Tidak).
- Waktu – Waktu berakhirnya epoch.
- Atestasi – Jumlah atestasi dalam epoch (pengambilan suara untuk blok dalam slot).
- Deposito – Jumlah deposito ETH yang termasuk dalam epoch (validator harus mempertaruhkan ETH untuk menjadi validator).
- Pemotongan – Jumlah penalti yang diberikan kepada pengusul blok atau pemberi atestasi.
- Partisipasi pengambilan suara – Jumlah ETH yang dipertaruhkan yang digunakan untuk mengesahkan blok.
- Validator – Jumlah validator aktif dalam epoch.
- Saldo Validator rata-rata – Saldo rata-rata untuk validator aktif.
- Slot – Jumlah slot yang termasuk dalam epoch (slot mencakup satu blok valid).

### Slot {#slot}

Slot adalah kesempatan untuk pembuatan blok, data yang tersedia untuk tiap slot meliputi:

- Epoch – Epoch di mana slot valid.
- Nomor slot.
- Status – Status dari slot (Diusulkan/Terlewatkan).
- Waktu – Stempel waktu slot.
- Pengusul – Validator yang mengusulkan blok untuk slot.
- Akar blok – Akar pohon hash dari BeaconBlock.
- Akar induk – Hash blok yang ada sebelumnya.
- Akar state – Root pohon hash dari BeaconState.
- Tanda tangan.
- Pengungkapan Randao.
- Graffiti – Pengusul blok dapat memasukkan pesan sepanjang 32 bita untuk proses pengajuan bloknya.
- Data Eksekusi.
  - Hash blok.
  - Jumlah deposito.
  - Akar deposito.
- Atestasi – Jumlah pengesahan blok dalam slot ini.
- Deposito – Jumlah deposito selama slot ini.
- Keluar secara sukarela – Jumlah validator yang keluar selama slot tersebut.
- Pemotongan – Jumlah penalti yang diberikan kepada pengusul blok atau pemberi atestasi.
- Pengambilan suara – Validator yang mengambil suara untuk blok dalam slot ini.

### Blok {#blocks-1}

Blok lapisan konsensus bekerja secara berbeda karena penambang digantikan oleh validator dan Rantai Suar memperkenalkan slot dan epoch ke Ethereum. Jadi ini berarti data yang baru!

- Pengusul – Validator yang terpilih secara algoritma untuk mengajukan blok baru.
- Epoch – Epoch di mana blok diusulkan.
- Slot – Slot di mana blok diusulkan.
- Atestasi – Jumlah pengesahan yang tercakup dalam slot. Atestasi adalah seperti pengambilan suara yang menunjukkan blok siap untuk beralih ke Rantai Suar.

### Validator {#validators}

Validator bertanggung jawab dalam mengusulkan blok dan mengesahkannya dalam slot.

- Nomor validator – Nomor unik yang mewakilkan validator.
- Saldo saat ini – Saldo validator termasuk imbalan.
- Saldo efektif – Saldo validator yang digunakan untuk penaruhan.
- Pemasukan – Imbalan atau penalti yang diterima validator.
- Status – Apakah validator saat ini sedang online dan aktif atau tidak.
- Efektifitas atestasi – Waktu rata-rata yang diperlukan untuk pengesahan oleh validator yang akan dimasukkan ke dalam rantai.
- Kelayakan aktivasi – Tanggal (dan epoch) saat validator tersedia untuk memvalidasi.
- Aktif sejak – Tanggal (dan epoch) saat validator aktif.
- Blok yang diusulkan – Blok yang telah diajukan oleh validator.
- Atestasi – Pengesahan yang telah diberikan oleh validator.
- Deposito – Alamat dari, hash transaksi, nomor blok, stempel waktu, jumlah dan status deposito penaruhan yang dibuat oleh validator.

### Atestasi {#attestations}

Atestasi adalah pengambilan suara "ya" untuk memasukkan blok ke dalam rantai. Data ini terkait dengan catatan dari pengesahan dan validator yang mengesahkan

- Slot – Slot di mana pengesahan terjadi.
- Indeks komite – Indeks komite pada slot tertentu.
- Bit agregasi – Mewakili pengesahan teragregasi dari seluruh validator peserta dalam pengesahan.
- Validator – Validator yang memberikan pengesahan.
- Akar blok suar – Menunjukkan blok di mana validator sedang melakukan pengesahan.
- Sumber – Menunjukkan epoch terbaru yang dijustifikasi.
- Target – Menunjukkan batas epoch terkini.
- Tanda tangan.

### Jaringan {#network-1}

Data tingkat atas lapisan konsensus mencakup berikut ini:

- Epoch saat ini.
- Slot saat ini.
- Validator aktif – Jumlah validator aktif.
- Validator menunggu – Jumlah validator yang menunggu untuk diaktifkan.
- ETH yang ditaruhkan – Jumlah ETH yang ditaruhkan dalam jaringan.
- Saldo rata-rata – Saldo ETH rata-rata validator.

## Penjelajah blok {#block-explorers}

- [Etherscan](https://etherscan.io/) – penjelajah blok yang bisa Anda gunakan mengambil data untuk Jaringan Utama Ethereum, Testnet Ropsten, Testnet Kovan, Testnet Rinkeby, dan Testnet Goerli.
- [Blockscout](https://blockscout.com/) – berfokus pada jaringan berikut:
  - xDai – kombinasi pintar dari stablecoin DAI MakerDAO dan sidechain POA serta teknologi tokenbridge.
  - POA – Sidechain dan jaringan otonom yang diamankan oleh satu grup validator terpercaya. Semua validator pada jaringan adalah notaris Amerika Serikat, dan informasi mereka tersedia secara publik.
  - Testnet Sokol POA.
  - ARTIS – blockchain yang berkesesuaian dengan Ethereum.
  - [LUKSO L14](https://blockscout.com/lukso/l14) – fungsi L14 sebagai jaringan percobaan pertama, untuk memungkinkan komunitas LUKSO membangun dan menguji coba infrastruktur umum.
  - qDai.
- [Etherchain](https://www.etherchain.org/) – penjelajah blok untuk Jaringan Utama Ethereum.
- [Ethplorer](https://ethplorer.io/) – penjelajah blok dengan fokus pada token untuk Jaringan Utama Ethereum dan testnet Kovan.
- [Blockchair](https://blockchair.com/ethereum) - penjelajah Ethereum yang paling privat. Juga digunakan untuk pemilihan dan penyaringan (mempool) data.

## Penjelajah blok (lapisan konsensus) rantai suar {#beacon-chain-block-explorers}

- [https://beaconcha.in/](https://beaconcha.in/)
- [https://beaconscan.com/](https://beaconscan.com/)
- [https://ethscan.org/](https://ethscan.org/) (fork beaconcha.in)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Penambangan](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transaksi](/developers/docs/transactions/)
- [Akun](/developers/docs/accounts/)
- [Jaringan](/developers/docs/networks/)
