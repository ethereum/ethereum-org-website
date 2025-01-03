---
title: Laporan Resmi Ethereum
description: Laporan pengantar Ethereum, yang diterbitkan pada tahun 2013 sebelum peluncurannya.
lang: id
sidebarDepth: 2
hideEditButton: true
---

# Laporan Resmi Ethereum {#ethereum-whitepaper}

_Laporan pengantar ini awalnya diterbitkan di tahun 2014 oleh Vitalik Buterin, pendiri [Ethereum](/what-is-ethereum/), sebelum peluncuran proyeknya pada tahun 2015. Penting untuk diperhatikan bahwa Ethereum, seperti kebanyakan proyek perangkat lunaksumber terbuka yang digerakkan oleh komunitas, telah berkembang sejak peluncuran pertamanya._

_Setelah beberapa tahun, kami mempertahankan laporan ini karena terus berfungsi sebagai rujukan yang berguna dan representasi akurat dari Ethereum dan visinya. Untuk mempelajari tentang pengembangan Ethereum terkini, dan bagaimana perubahan protokol dibuat, kami menyarankan [panduan ini](/learn/)._

[Peneliti dan akademisi yang mencari sejarah atau versi kanonis dari kertas putih [dari Desember 2014] harus merujuk PDF ini.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Kontrak Pintar Generasi Berikutnya dan Platform Aplikasi Terdesentralisasi {#a-next-generation-smart-contract-and-decentralized-application-platform}

Pengembangan Bitcoin oleh Satoshi Nakamoto pada tahun 2009 sering disebut sebagai pengembangan radikal dalam uang dan mata uang, dan jadi contoh pertama aset digital yang dengan serempak tanpa jaminan atau "[nilai intrinsik](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)" dan tanpa pengendali atau penerbit tunggal. Namun, bagian lain yang bisa dibilang lebih penting dari eksperimen rantai blok adalah teknologi rantai blok yang mendasari sebagai alat konsensus terdistribusi, dan perhatian dengan cepat mulai beralih ke aspek lain dari rantai blok ini. Alternatif aplikasi umum dari teknologi rantai blok meliputi penggunaan aset digital di rantai blok untuk mewakili mata uang khusus dan instrumen keuangan ("[koin berwarna](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), kepemilikan perangkat fisik dasar ("[properti pintar](https://en.bitcoin.it/wiki/Smart_Property)"), aset yang tidak dapat ditukarkan seperti nama domain ("[Namecoin](http://namecoin.org)"), serta aplikasi yang lebih kompleks melibatkan aset digital yang dikendalikan secara langsung oleh potongan kode yang menerapkan aturan sembarang ("[kontrak pintar](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") atau bahkan "[organisasi otonom terdesentralisasi](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO) berbasis rantai blok. Apa yang ingin disediakan oleh Ethereum adalah sebuah rantai blok dengan bahasa pemrograman Turing-complete bawaan yang dapat digunakan untuk membuat "kontrak" yang dapat digunakan untuk mengkodekan fungsi transisi status yang berubah-ubah, yang memungkinkan pengguna untuk membuat sistem apa saja yang dijelaskan di atas, dan juga sistem-sistem lain yang belum pernah kita bayangkan sebelumnya, cukup dengan menuliskan logikanya dalam beberapa baris kode.

## Pengantar pada Bitcoin dan Konsep yang Telah Ada {#introduction-to-bitcoin-and-existing-concepts}

### Riwayat {#history}

Konsep mata uang digital terdesentralisasi, serta aplikasi alternatif seperti pendaftaran properti, telah ada selama beberapa dekade. Protokol-protokol e-cash anonim pada tahun 1980-an dan 1990-an, sebagian besar bergantung pada kriptografi primitif yang dikenal sebagai Chaumian blinding, menyediakan mata uang dengan tingkat privasi yang tinggi, akan tetapi protokol-protokol ini sebagian besar gagal untuk mendapatkan daya tarik karena ketergantungannya pada perantara yang tersentralisasi. Pada tahun 1998, [b-money](http://www.weidai.com/bmoney.txt) dari Wei Dai menjadi proposal pertama yang memperkenalkan ide untuk menciptakan uang melalui pemecahan teka-teki komputasi dan juga konsensus yang terdesentralisasi, tetapi proposal ini tidak memberikan rincian tentang bagaimana konsensus yang terdesentralisasi dapat diimplementasikan. Pada tahun 2005, Hal Finney memperkenalkan konsep "[bukti kerja yang dapat digunakan kembali](https://nakamotoinstitute.org/finney/rpow/)", sebuah sistem yang menggabungkan ide dari b-money bersama dengan teka-teki Hashcash yang sulit secara komputasi dari Adam Back untuk menciptakan konsep mata uang kripto, tetapi sekali lagi tidak mencapai ideal dengan mengandalkan komputasi tepercaya sebagai sistem pendukung jaringan. Pada tahun 2009, mata uang terdesentralisasi untuk pertama kalinya diimplementasikan dalam praktik oleh Satoshi Nakamoto, menggabungkan primitif yang sudah mapan untuk mengelola kepemilikan melalui kriptografi kunci publik dengan algoritma konsensus untuk melacak siapa yang memiliki koin, yang dikenal sebagai "bukti kerja".

Mekanisme di balik bukti kerja merupakan sebuah terobosan di bidang ini karena secara bersamaan memecahkan dua masalah. Pertama, ia menyediakan algoritma konsensus yang sederhana dan cukup efektif, yang memungkinkan simpul dalam jaringan untuk secara kolektif menyetujui satu set pembaruan kanonis untuk status buku besar Bitcoin. Kedua, ia menyediakan mekanisme untuk mengizinkan masuknya orang secara bebas ke dalam proses konsensus, memecahkan masalah politik dalam menentukan siapa yang dapat memengaruhi konsensus, dan pada saat yang sama mencegah serangan sybil. Hal ini dilakukan dengan mengganti penghalang formal untuk berpartisipasi, seperti persyaratan untuk terdaftar sebagai entitas unik dalam daftar tertentu, dengan penghalang ekonomi - bobot satu simpul dalam proses pemungutan suara konsensus berbanding lurus dengan daya komputasi yang dibawa oleh simpul tersebut. Sejak itu, pendekatan alternatif telah diusulkan yang disebut _bukti taruhan_, menghitung bobot suatu simpul sebagai proposional terhadap jumlah mata uang yang dipegangnya dan bukan sumber daya komputasi; diskusi tentang keunggulan relatif dari kedua pendekatan ini melebihi cakupan tulisan ini, tetapi perlu dicatat bahwa kedua pendekatan tersebut dapat digunakan sebagai tulang punggun suatu mata uang kripto.

### Bitcoin Sebagai Sebuah Sistem Transisi State {#bitcoin-as-a-state-transition-system}

![Transisi state Ethereum](./ethereum-state-transition.png)

Dari sudut pandang teknis, buku besar mata uang kripto seperti Bitcoin dapat dianggap sebagai sebuah sistem transisi keadaan, di mana terdapat sebuah "keadaan" yang terdiri dari status kepemilikan semua bitcoin yang ada dan sebuah "fungsi transisi keadaan" yang mengambil sebuah keadaan dan sebuah transaksi dan mengeluarkan sebuah keadaan baru sebagai hasilnya. Dalam sistem perbankan standar, sebagai contoh, state adalah lembar saldo, transaksi adalah permintaan pemindahan $X dari A ke B, dan fungsi transisi state mengurangi nilai akun A sebesar $X dan menambah nilai di akun B sebesar $X. Jika akun A memiliki saldo kurang dari $X sejak awalnya, fungsi transisi state mengembalikan nilai eror. Dengan demikian, seseorang bisa mendefinisikan secara formal:

```
APPLY(S,TX) -> S' atau ERROR
```

Dalam sistem perbankan yang didefinisikan di atas:

```js
APPLY({ Alice: $50, Bob: $50 },"kirim $20 dari Alice ke Bob") = { Alice: $30, Bob: $70 }
```

Tapi:

```js
APPLY({ Alice: $50, Bob: $50 },"kirim $70 dari Alice ke Bob") = ERROR
```

"State" dalam Bitcoin adalah kumpulan semua koin (secara teknis, "luaran transaksi yang tidak terpakai" atau UTXO) yang telah dicetak dan belum dibelanjakan, dengan setiap UTXO memiliki denominasi dan pemilik (didefinisikan oleh alamat 20-bita yang pada dasarnya adalah kunci publik kriptografi<sup>[fn1](#notes)</sup>). Sebuah transaksi berisi satu atau lebih input, dengan setiap input berisi referensi ke UTXO yang sudah ada dan tanda tangan kriptografi yang dihasilkan oleh kunci pribadi yang terkait dengan alamat pemilik, dan satu atau lebih luaran, dengan setiap output berisi UTXO baru yang akan ditambahkan ke dalam state.

The state transition function `APPLY(S,TX) -> S'` dapat didefinisikan secara kasar sebagai berikut:

<ol>
  <li>
    Untuk tiap input dalam <code>TX</code>:
    <ul>
    <li>
        Jika UTXO yang dirujuk tidak ada dalam <code>S</code>, kembali dengan nilai eror.
    </li>
    <li>
        Jika tanda tangan yang diberikan tidak sesuai dengan pemilik UTXO, kembalikan kesalahan.
    </li>
    </ul>
  </li>
  <li>
    Jika jumlah denominasi semua UTXO input kurang dari jumlah denominasi semua UTXO output, kembalikan kesalahan.
  </li>
  <li>
    Mengembalikan <code>S</code> dengan semua input UTXO dihapus dan semua output UTXO ditambahkan.
  </li>
</ol>

Setengah bagian dari langkah pertama mencegah pengirim transaksi menggunakan koin yang tidak ada, setengah bagian lainnya dari langkah pertama mencegah pengirim transaksi memakai koin orang lain, dan langkah kedua melaksanakan nilai konservasi. Untuk memakai fungsi ini dalam pembayaran, protokolnya sebagai berikut. Anggaplah Alice mau mengirim 11,7 BTC ke Bob. Pertama-tama, Alice akan mencari sekumpulan UTXO tersedia yang dia miliki yang totalnya setidaknya mencapai 11,7 BTC. Secara realistis, Alice tidak akan bisa mendapatkan persis 11,7 BTC; anggaplah jumlah paling kecil yang bisa dia dapatkan adalah 6+4+2=12. Dia kemudian membuat transaksi dengan tiga input dan dua output tersebut. Output pertama akan berupa 11,7 BTC dengan alamat Bob sebagai pemiliknya, dan output kedua akan berupa "kembalian" 0,3 BTC yang tersisa, dengan pemilik adalah Alice sendiri.

### Penambangan {#mining}

![Blok Ethereum](./ethereum-blocks.png)

Jika kita punya akses ke layanan terpusat yang terpercaya, sistem ini akan menjadi tidak penting untuk diimplementasikan; sistem ini bisa dengan mudah dikodekan sama persis seperti yang dideskripsikan, menggunakan hard drive server terpusat untuk melacak kondisi state. Namun, dengan Bitcoin kita mencoba membangun sistem mata uang terdesentralisasi, sehingga kita akan perlu menggabungkan sistem transisi state dengan sistem konsensus untuk memastikan setiap orang sepakat tentang urutan transaksi. Proses konsensus terdesentralisasi Bitcoin memerlukan node dalam jaringan agar terus menghasilkan paket transaksi yang disebut "blok". Jaringan dimaksudkan untuk menghasilkan kurang lebih satu blok setiap sepuluh menit, dengan setiap blok berisi stempel waktu, nonce, referensi ke (misalnya hash dari) blok sebelumnya, dan daftar semua transaksi yang telah terjadi sejak blok sebelumnya. Seiring waktu, ini menciptakan "blokchain" yang terus bertumbuh dan tak terhentikan yang terus diperbarui untuk menunjukkan state terkini dari buku besar Bitcoin.

Algoritma untuk memeriksa apakah sebuah blok valid, yang diekspresikan dalam paradigma ini, adalah sebagai berikut:

1. Periksa apakah blok sebelumnya yang direferensikan oleh blok tersebut ada dan valid.
2. Memeriksa apakah stempel waktu dari blok lebih besar dari stempel waktu blok sebelumnya<sup>[fn2](#notes)</sup> dan kurang dari 2 jam ke depan
3. Periksa apakah bukti kerja pada blok tersebut valid.
4. Biarkan `S[0]` menjadi state pada ujung blok sebelumnya.
5. Anggaplah `TX` adalah daftar transaksi blok dengan `n` transaksi. Untuk semua `i` dalam `0...n-1`, atur `S[i+1] = APPLY(S[i],TX[i])` Jika ada aplikasi yang mengembalikan galat, keluar dan kembalikan nilai false.
6. Mengembalikan nilai true, dan mendaftarkan `S[n]` sebagai keadaan pada akhir blok ini.

Pada dasarnya, tiap transaksi dalam blok harus menyediakan transisi state valid dari apa yang menjadi state kanonis sebelum transaksi dijalankan menjadi beberapa state baru. Perhatikan bahwa state tersebut tidak dikodekan dalam blok dengan cara apa pun; murni adalah abstraksi untuk diingat oleh node yang memvalidasi dan hanya bisa (dengan aman) dikomputasi untuk blok mana pun dengan memulai dari state genesis dan secara berurutan menerapkan setiap transaksi dalam setiap blok. Sebagai tambahan, perhatikan bahwa urutan di mana penambang memasukkan transaksi ke dalam unsur blok; jika ada dua transaksi A dan B dalam satu blok sehingga B memakai UTXO yang dibuat A, maka blok tersebut akan valid jika A ada sebelum B tapi bukan sebaliknya.

Kondisi validitas yang ada dalam daftar di atas yang tidak ditemukan dalam sistem lainnya adalah persyaratan untuk "bukti kerja". Kondisi persisnya adalah hash ganda SHA256 dari setiap blok, yang dianggap sebagai angka 256 bit, harus lebih kecil dari target yang disesuaikan secara dinamis, yang pada saat penulisan ini kira-kira 2<sup>187</sup>. Tujuannya adalah agar pembuatan blok "sulit" secara komputasi, sehingga mencegah penyerang sybil membuat ulang seluruh blokchain sesuai keinginan mereka. Karena SHA256 dirancang untuk menjadi fungsi acak semu yang benar-benar tidak dapat diprediksi, satu-satunya cara untuk membuat sebuah blok valid adalah hanya lewat coba-coba, yang secara berulang menambah nonce dan melihat apakah hash baru cocok.

Pada target \~2<sup>187</sup> saat ini, jaringan harus membuat rata-rata \~2<sup>69</sup> percobaan sebelum sebuah blok valid ditemukan; secara umum, target dikalibrasi ulang oleh jaringan setiap 2016 blok, sehingga rata-rata satu blok baru dihasilkan oleh beberapa node dalam jaringan setiap sepuluh menit. Untuk memberi kompensasi kepada penambang atas pekerjaan komputasional ini, penambang setiap blok berhak untuk memasukkan transaksi yang memberi mereka sendiri 25 BTC entah dari mana. Sebagai itu, jika transaksi memiliki denominasi total lebih tinggi dalam inputnya daripada outputnya, perbedaannya juga diberi ke penambang sebagai "biaya transaksi". Secara tidak sengaja, ini juga adalah satu-satunya mekanisme untuk menerbitkan BTC; state genesis tidak berisi koin sama sekali.

Agar lebih memahami tujuan penambangan, mari kita memeriksa apa yang terjadi saat ada penyerang jahat. Karena kriptografi yang mendasari Bitcoin dikenal aman, penyerang akan menargetkan satu bagian dari sistem Bitcoin yang tidak terlindungi secara langsung oleh kriptografi: urutan transaksi. Strategi penyerang sederhana:

1. Kirim 100 BTC ke pedagang untuk ditukar dengan suatu produk (lebih disukai barang digital dengan pengiriman cepat)
2. Menunggu pengiriman produk
3. Membuat transaksi lainnya yang mengirim 100 BTC yang sama ke dirinya sendiri
4. Cobalah untuk meyakinkan jaringan bahwa transaksinya dengan dirinya sendiri adalah transaksi yang didahulukan.

Setelah langkah (1) dilakukan, setelah beberapa menit beberapa penambang akan memasukkan transaksi tersebut ke dalam sebuah blok, katakanlah nomor blok 270000. Setelah kira-kira satu jam, lima blok lainnya akan ditambahkan ke rantai setelah blok tersebut, dengan setiap blok secara tidak langsung menunjuk ke transaksi itu dan dengan demikian "mengonfirmasi" transaksi itu. Pada titik ini, pedagang akan menerima pembayaran seperti yang telah difinalisasi dan mengantar produk pesanan; karena kita menganggap ini adalah barang digital, pengantarannya bersifat instan. Sekarang, penyerang membuat transaksi lainnya yang mengirimkan 100 BTC ke dirinya sendiri. Jika penyerang hanya mengeluarkannya ke alam liar jaringan, transaksi tidak akan diproses; penambang akan menjalankan `APPLY(S,TX)` dan mengetahui bahwa `TX` memakai UTXO yang tidak ada lagi di state. Jadi sebagai gantinya, penyerang membuat sebuah "fork" blockchain, dimulai dengan menambang versi lain dari blok 270000 yang menunjuk ke blok 269999 yang sama sebagai induknya, tapi dengan transaksi baru menggantikan transaksi yang lama. Karena data blok berbeda, ini memerlukan pengerjaan ulang bukti kerja. Lagi pula, versi blok 270000 baru milik penyerang memiliki hash berbeda, sehingga blok 270001 hingga 270005 asli tidak "menunjuk" ke blok tersebut; jadi, rantai asli dan rantai baru penyerang benar-benar terpisah. Aturannya adalah dalam sebuah fork, blokchain terpanjang dianggap sebagai kebenaran, dan karenanya penambang sah akan bekerja di rantai 270005 sedangkan penyerang sendiri bekerja di rantai 270000. Agar penyerang dapat membuat blockchainnya menjadi yang terpanjang, dia perlu mendapatkan daya komputasional yang lebih banyak daripada jaringan lainnya yang digabungkan agar bisa menyusul (oleh karen aitu disebut, "serangan 51%").

### Pohon Merkle {#merkle-trees}

![SPV dalam Bitcoin](./spv-bitcoin.png)

_Kiri: dengan menampilkan sejumlah kecil node di pohon Merkle, cukup untuk memberi bukti validitas dari sebuah cabang._

_Kanan: usaha apa pun untuk mengubah salah satu bagian dari pohon Merkle pada akhirnya akan menyebabkan inkonsistensi di suatu tempat di rantai._

Fitur skalabilitas yang penting dari Bitcoin adalah blok disimpan dalam sebuah struktur data multilevel. "Hash" blok sebenarnya hanyalah hash dari header blok, sepotong data berukuran kira-kira 200 bita yang berisi stempel waktu, nonce, hash blok sebelumnya, dan hash akar dari struktur data yang disebut pohon Merkle yang menyimpan semua transaksi dalam blok. Pohon Merkle adalah jenis pohon binari, terdiri dari sekumpulan node dengan sejumlah besar node daun pada bagian bawah pohon yang berisi data yang mendasarinya, sekumpulan node menengah di mana setiap node adalah hash dari dua anaknya, dan akhinya node akar tunggal, juga terbentuk dari hash kedua anaknya, yang mewakili "bagian puncak" pohon. Tujuan pohon Merkle adalah untuk memungkinkan data di sebuah blok diantarkan setahap demi setahap: sebuah node bisa mengunduh hanya header sebuah blok dari satu sumber, bagian kecil pohon yang sesuai dengannya dari sumber lain, dan tetap yakin bahwa semua data benar. Alasan mengapa hal ini berhasil adalah hash menyebar ke atas: jika seorang pengguna jahat berusaha menukar satu transaksi palsu ke bagian bawah pohon Merkle, perubahan ini akan menyebabkan perubahan pada node di atas, kemudian perubahan pada node di atasnya, yang akhirnya mengubah akar pohon dan dengan demikian hash blok, yang menyebabkan protokol mendaftarkannya sebagai blok yang sama sekali berbeda (hampir pasti dengan sebuah bukti kerja tidak valid).

Protokol pohon Merkle bisa dibilang penting untuk keberlangsungan jangka panjang. Satu "node penuh" dalam jaringan Bitcoin, node yang menyimpan dan memroses keseluruhan dari setiap blok, menghabiskan kira-kira 15 GB ruang disk dalam jaringan Bitcoin sejak April 2014, dan terus bertumbuh sebesar lebih dari satu gigabita per bulan. Saat ini, hal ini dapat dilakukan untuk beberapa komputer desktop dan bukan ponsel, dan nantinya di masa depan hanya perusahaan dan penghobi yang akan dapat berpartisipasi. Sebuah protokol yang dikenal sebagai "simplified payment verification" (SPV) memungkinkan kelas node lainnya ada, yang disebut "node ringan", yang mengunduh header blok, memverifikasi bukti kerja pada header blok, dan kemudian mengunduh hanya "cabang" yang terkait dengan transaksi yang relevan dengannya. Ini memungkinkan node ringan dengan jaminan keamanan kuat menentukan status transaksi Bitcoin, dan saldonya saat ini, sambil mengunduh hanya sebagian kecil dari keseluruhan blockchain.

### Aplikasi Blockchain Alternatif {#alternative-blockchain-applications}

Gagasan untuk mengambil ide blockchain yang mendasarinya dan menerapkannya pada konsep lain juga memiliki sejarah yang panjang. Pada tahun 2005, Nick Szabo mengeluarkan konsep "[mengamankan hak milik dengan otoritas pemilik](https://nakamotoinstitute.org/secure-property-titles/)", sebuah dokumen yang menjelaskan bagaimana "kemajuan baru dalam teknologi basis data yang direplikasi" akan memungkinkan sebuah sistem berbasis rantai blok untuk menyimpan registri tentang siapa yang memiliki tanah apa, menciptakan sebuah kerangka kerja yang rumit yang meliputi konsep-konsep seperti homesteading, kepemilikan yang tidak sesuai, dan pajak tanah Georgia. Namun sayangnya, tak ada sistem basis data efektif yang direplikasi yang tersedia saat itu, dan karenanya protokol ini tidak pernah diimplementasikan dalam prakteknya. Namun, setelah 2009, setelah konsensus terdesentralisasi Bitcoin dikembangkan, sejumlah aplikasi alternatif dengan cepat mulai bermunculan.

- **Namecoin** - diciptakan pada tahun 2010, [Namecoin](https://namecoin.org/) dapat dijelaskan sebagai basis data registrasi nama terdesentralisasi. Dalam protokol terdesentralisasi seperti Tor, Bitcoin, dan BitMessage, perlu ada cara untuk mengidentifikasi akun sehingga orang lain dapat berinteraksi dengan mereka, tetapi dalam semua solusi yang ada, jenis pengenal yang tersedia hanya berupa hash semuacak seperti `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idealnya, seseorang ingin memiliki akun dengan nama seperti "george". Namun, masalahnya adalah jika satu orang dapat membuat akun bernama "george" maka orang lain dapat menggunakan proses yang sama untuk mendaftarkan "george" untuk diri mereka sendiri dan menyamar sebagai mereka. Satu-satunya solusi adalah paradigma yang mendaftar pertama, di mana pendaftar pertama berhasil dan yang kedua gagal - masalah yang sangat cocok untuk protokol konsensus Bitcoin. Namecoin adalah implementasi tertua, dan paling sukses, dari sistem registrasi nama yang menggunakan ide tersebut.
- **Koin Berwarna** - tujuan dari [koin berwarna](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) adalah menjadi sebuah protokol yang memungkinkan orang untuk membuat mata uang digital mereka sendiri - atau, dalam kasus sederhana penting dari mata uang dengan satu unit, token digital, di rantai blok Bitcoin. Dalam protokol koin berwarna, seseorang "menerbitkan" mata uang baru dengan memberikan warna pada UTXO Bitcoin tertentu, dan protokol ini secara rekursif mendefinisikan warna UTXO lainnya agar sama dengan warna input yang dihabiskan oleh transaksi yang membuatnya (beberapa aturan khusus berlaku untuk input warna campuran). Hal ini memungkinkan pengguna untuk menyimpan dompet yang hanya berisi UTXO dengan warna tertentu dan mengirimkannya seperti bitcoin biasa, menelusuri rantai blok untuk menentukan warna UTXO yang mereka terima.
- **Metakoin** - gagasan di balik metakoin adalah memiliki protokol yang berjalan di atas Bitcoin, menggunakan transaksi Bitcoin untuk menyimpan transaksi metakoin tetapi memiliki fungsi transisi keadaan yang berbeda, `APPLY'`. Karena protokol metakoin tidak dapat mencegah transaksi metakoin yang tidak valid muncul di rantai blok Bitcoin, sebuah aturan ditambahkan bahwa jika `APPLY'(S,TX)` mengembalikan galat, maka protokol akan menggunakan nilai `APPLY'(S,TX) = S` sebagai bawaan. Hal ini memberikan sebuah mekanisme yang mudah untuk membuat sebuah protokol mata uang kripto, yang berpotensi memiliki fitur-fitur canggih yang tidak dapat diimplementasikan di dalam Bitcoin itu sendiri, tetapi dengan biaya pengembangan yang sangat rendah karena kerumitan dalam menambang dan jaringan sudah ditangani oleh protokol Bitcoin. Metacoin telah digunakan untuk mengimplementasikan beberapa kelas kontrak keuangan, registrasi nama, dan pertukaran yang terdesentralisasi.

Oleh karena itu, secara umum, ada dua pendekatan terhadap pembangunan protokol konsensus: membangun jaringan independen, dan membangun protokol di atas Bitcoin. Pendekatan pertama, sekalipun cukup berhasil dalam kasus penggunaannya seperti Namecoin, sulit diimplementasikan; setiap implementasi individual harus melakukan bootstrap pada blockchain independen, serta membangun dan menguji semua transisi state dan kode jaringan yang diperlukan. Sebagai tambahan, kami memperkirakan bahwa serangkaian aplikasi untuk teknologi konsensus terdesentralisasi akan mengikuti distribusi hukum daya di mana sebagian besar aplikasi akan menjadi terlalu kecil untuk menjamin blockchainnya sendiri, dan kami mencatat bahwa ada kelas aplikasi terdesentralisasi yang besar, khususnya organisasi otonom terdesentralisasi, yang memerlukan interaksi satu sama lain.

Pendekatan berbasis Bitcoin, di sisi lainnya, memiliki kelemahan karena tidak mewarisi fitur verifikasi pembayaran yang disederhanakan dari Bitcoin. SPV berfungsi untuk Bitcoin karena bisa menggunakan kedalaman blockchain sebagai proksi untuk validitas; pada beberapa titik, setelah perintis transaksi mundur cukup jauh, aman untuk dikatakan bahwa ini resmi bagian dari state. Protokol meta berbasis blockchain, di sisi lainnya, tidak bisa memaksa blockchain untuk tidak memasukkan transaksi yang tidak valid dalam konteks protokolnya sendiri. Oleh karena itu, implementasi protokol meta SPV yang benar-benar aman perlu memindai ke belakang ke titik awal blockchain Bitcoin untuk menentukan apakah transaksi tertentu valid atau tidak valid. Saat ini, semua implementasi "ringan" dari protokol meta berbasis Bitcoin mengandalkan server terpercaya untuk menyediakan datanya, yang bisa dibilang hasilnya sangat kurang optimal, khususnya karena salah satu tujuan utama mata uang kripto adalah menghilangkan kebutuhan akan kepercayaan.

### Pembuatan skrip {#scripting}

Bahkan tanpa ekstensi apa pun, protokol Bitcoin sebenarnya mendukung versi kecil dari konsep "kontrak pintar". UTXO dalam Bitcoin bisa dimiliki tidak hanya melalui kunci publik, tetapi juga melalui skrip yang lebih rumit yang diekspresikan dalam bahasa pemrograman berbasis tumpukan sederhana. Dalam paradigma ini, sebuah pengeluaran transaksi yang datanya memenuhi skrip harus disediakan oleh UTXO. Betul, bahkan mekanisme kepemilikan kunci publik dasar diimplementasikan lewat sebuah skrip: skrip mengambil tanda tangan kurva eliptik sebagai input, memverifikasinya terhadap transaksi dan alamat yang memiliki UTXO, dan kembali dengan nilai 1 jika verifikasi berhasil dan 0 jika tidak berhasil. Lainnya, yang lebih rumit, skrip ada untuk beragam kasus penggunaan lainnya. Contohnya, seseorang bisa menyusun skrip yang memerlukan dua tanda tangan dari tiga kunci privat yang tersedia untuk mengesahkan ("multisig"), sebuah pengaturan yang berguna untuk akun perusahaan, akun tabungan yang aman, dan beberapa situasi escrow pedagang. Skrip bisa juga digunakan untuk membayar hadiah atas solusi masalah komputasional, dan seseorang bahkan bisa menyusun skrip yang berisi sesuatu seperti ini "UTXO Bitcoin ini adalah milik Anda jika Anda bisa memberikan bukti SPV bahwa Anda mengirimkan transaksi Dogecoin dalam denominasi ini kepada saya", yang pada dasarnya memungkinkan bursa lintas mata uang kripto terdesentralisasi.

Namun, bahasa skrip seperti yang diimplementasikan dalam Bitcoin punya beberapa batasan penting:

- **Ketidaklengkapannya-Turing** - artinya, meskipun ada subset besar komputasi yang didukung oleh bahasa pemrograman skrip Bitcoin, namun tidak mendukung segalanya. Kategori utama yang tidak ada yaitu, loop. Hal ini dilakukan untuk menghindari perulangan tak terbatas selama verifikasi transaksi; secara teoritis hal ini merupakan hambatan yang dapat diatasi oleh para pemrogram skrip, karena setiap perulangan dapat disimulasikan hanya dengan mengulangi kode yang mendasarinya berkali-kali dengan pernyataan if, tetapi hal ini menghasilkan skrip yang sangat boros tempat. Sebagai contoh, mengimplementasikan algoritma tanda tangan kurva elips alternatif kemungkinan akan membutuhkan 256 putaran perkalian berulang yang semuanya disertakan secara individual dalam kode.
- **Value-blindness** - tidak ada cara bagi sebuah skrip UTXO untuk memberikan kontrol yang sangat detail terhadap jumlah yang dapat ditarik. Sebagai contoh, salah satu kasus penggunaan yang kuat dari kontrak oracle adalah kontrak lindung nilai, di mana A dan B memasukkan BTC senilai $1000 dan setelah 30 hari, skrip mengirimkan BTC senilai $1000 kepada A dan sisanya kepada B. Hal ini akan membutuhkan oracle untuk menentukan nilai 1 BTC dalam USD, tetapi meskipun demikian, ini merupakan peningkatan yang sangat besar dalam hal kepercayaan dan kebutuhan infrastruktur daripada solusi yang sepenuhnya tersentralisasi yang tersedia saat ini. Namun, karena UTXO berpirinsip semuanya atau tidak sama sekali, satu-satunya cara untuk mencapainya adalah melalui peretasan yang sangat tidak efisien yaitu memiliki banyak UTXO dengan denominasi beragam (misalnya, satu UTXO terdiri dari 2<sup>k</sup> untuk setiap k hingga 30) dan memerintahkan oracle memilih UTXO mana yang harus dikirimkan ke A dan mana yang ke B.
- **Ketidakadaan Keadaan** - UTXO dapat digunakan atau tidak digunakan; tidak ada peluang untuk kontrak atau skrip multi-tahap yang mempertahankan keadaan internal lainnya selain itu. Hal ini menyulitkan untuk membuat kontrak opsi multi-tahap, penawaran pertukaran terdesentralisasi, atau protokol komitmen kriptografi dua tahap (yang diperlukan untuk hadiah komputasi yang aman). Ini juga berarti bahwa UTXO hanya dapat digunakan untuk membangun kontrak yang sederhana dan sekali pakai dan bukan kontrak "stateful" yang lebih kompleks seperti organisasi yang terdesentralisasi, dan membuat meta-protokol sulit untuk diimplementasikan. Keadaan biner yang dikombinasikan dengan value-blindness juga berarti bahwa aplikasi penting lainnya, batas penarikan, tidak mungkin dilakukan.
- **Ketidakpedulian terhadap rantai blok** - UTXO tidak memiliki informasi tentang data rantai blok seperti nonce, stempel waktu, dan hash blok sebelumnya. Hal ini sangat membatasi aplikasi dalam perjudian, dan beberapa kategori lainnya, dengan menghilangkan bahasa skrip dari sumber keacakan yang berpotensi berharga.

Dengan demikian, kita melihat tiga pendekatan untuk membangun aplikasi tingkat lanjutan di atas mata uang kripto: membangun blockchain baru, menggunakan bahasa skrip di atas Bitcoin, dan membangun protokol meta di atas Bitcoin. Membangun blockchain baru memungkinkan kebebasan yang tak terbatas dalam membangun serangkaian fitur, tetapi mengorbankan waktu pengembangan, usaha bootstrapping, dan keamanan. Penggunaan bahasa skrip mudah diimplementasikan dan memiliki standar, tetapi sangat terbatas dalam kemampuannya, dan protokol meta, meskipun mudah, terdapat kesalahan dalam aspek skalabilitas. Dengan Ethereum, kami bermaksud membangun sebuah kerangka kerja alternatif yang menyediakan hasil yang jauh lebih besar dalam kemudahan pengembangan, maupun properti klien ringan yang bahkan lebih kuat, sementara secara bersamaan memungkinkan aplikasi untuk berbagi lingkungan ekonomi dan keamanan blokchain.

## Ethereum {#ethereum}

Tujuan dari Ethereum adalah menciptakan sebuah protokol alternatif untuk membangun aplikasi terdesentralisasi, yang menyediakan beragam rangkaian tradeoff yang kami yakini akan sangat berguna untuk kelas besar aplikasi terdesentralisasi, dengan penekanan tertentu pada situasi di mana waktu pengembangan cepat, keamanan untuk aplikasi kecil dan yang jarang digunakan, dan kemampuan aplikasi berbeda untuk berinteraksi dengan sangat efisien, menjadi penting. Ethereum melakukan ini dengan membangun apa yang pada dasarnya merupakan lapisan dasar abstrak utama: sebuah blockchain dengan bahasa pemrograman bawaan yang lengkap secara Turing, yang memungkinkan siapa pun untuk menulis kontrak pintar dan aplikasi terdesentralisasi, di mana mereka bisa membuat aturan arbitrari sendiri atas kepemilikan, format transaksi, dan fungsi transisi state. Versi sederhana Namecoin bisa ditulis dalam dua baris kode, dan protokol lainnya seperti mata uang dan sistem reputasi bisa disusun dengan jumlah baris kode di bawah dua puluh. Kontrak pintar, "kotak" kriptografik yang berisi nilai dan hanya terbuka jika kondisi tertentu dipenuhi, bisa juga di bangun di atas platformnya, dengan daya yang jauh lebih banyak dari yang ditawarkan oleh skrip Bitcoin, karena adanya daya tambahan dari kelengkapan Turing, kesadaran nilai, kesadaran dan state blokchain.

### Akun Ethereum {#ethereum-accounts}

Dalam Ethereum, state terdiri dari objek-objek yang disebut "akun", dengan setiap akun memiliki alamat 20-bita dan transisi state adalah transfer langsung nilai dan informasi antar akun. Sebuah akun Ethereum berisi empat bidang:

- **Nonce**, sebuah penghitung yang digunakan untuk memastikan setiap transaksi hanya dapat diproses sekali
- **Saldo ether** akun saat ini
- **Kode kontrak** akun, jika ada
- **Penyimpanan** akun (kosong secara default)

"Ether" adalah bahan bakar kripto internal utama Ethereum, dan digunakan untuk membayar biaya transaksi. Secara umum, ada dua jenis akun: **akun yang dimiliki secara eksternal**, yang dikontrol oleh kunci pribadi, dan **akun kontrak**, yang dikontrol oleh kode kontrak mereka. Akun yang dimiliki secara eksternal tidak memiliki kode, dan seseorang dapat mengirim pesan dari akun yang dimiliki secara eksternal dengan membuat dan menandatangani transaksi; dalam akun kontrak, setiap kali akun kontrak menerima pesan, kodenya akan diaktifkan, sehingga memungkinkannya untuk membaca dan menulis ke penyimpanan internal dan mengirim pesan lain atau membuat kontrak secara bergantian.

Perhatikan bahwa "kontrak" dalam Ethereum tidak boleh dilihat sebagai sesuatu yang harus "dipenuhi" atau "dipatuhi"; namun, kontrak tersebut lebih seperti "agen otonom" yang berada di dalam lingkungan eksekusi Ethereum, yang selalu mengeksekusi bagian kode tertentu ketika "ditodong" oleh sebuah pesan atau transaksi, dan memiliki kontrol langsung terhadap saldo ether mereka sendiri dan penyimpan kunci/nilai mereka sendiri untuk melacak variabel yang tetap.

### Pesan dan Transaksi {#messages-and-transactions}

Istilah "transaksi" digunakan dalam Ethereum untuk merujuk pada paket data yang ditandatangani yang menyimpan pesan yang akan dikirim dari akun yang dimiliki secara eksternal. Transaksi berisi:

- Penerima pesan
- Tanda tangan yang mengidentifikasi pengirim
- Jumlah ether yang akan ditransfer dari pengirim ke penerima
- Sebuah field data opsional
- Nilai `STARTGAS`, yang mewakili jumlah langkah komputasi maksimum yang diperbolehkan dalam eksekusi transaksi
- Nilai `GASPRICE`, yang mewakili biaya yang dibayarkan oleh pengirim per langkah komputasi

Ketiga bagian pertama adalah field standar yang diharapkan ada di mata uang kripto mana pun. Bidang data tidak memiliki fungsi secara default, tetapi mesin virtual memiliki opcode yang digunakan kontrak untuk mengakses data; sebagai contoh kasus penggunaan, jika sebuah kontrak berfungsi sebagai layanan registrasi domain on-rantai blok, maka kontrak tersebut dapat menginterpretasikan data yang diteruskan kepadanya sebagai berisi dua "bidang", bidang pertama adalah domain yang akan didaftarkan dan bidang kedua adalah alamat IP yang akan didaftarkan. Kontrak akan membaca nilai-nilai ini dari data pesan dan menempatkannya dengan tepat dalam penyimpanan.

Bidang `STARTGAS` dan `GASPRICE` sangat penting untuk model anti-penolakan layanan Ethereum. Untuk mencegah perulangan tak terbatas yang agresif atau tak disengaja, atau pemborosan dalam kode komputasional lainnya, setiap transaksi diharuskan untuk menentukan batasan seberapa banyak langkah eksekusi kode komputasional yang bisa digunakan. Unit dasar komputasi adalah "gas"; biasanya, satu langkah komputasi memerlukan biaya 1 gas, tetapi beberapa operasi memerlukan biaya yang lebih tinggi karena lebih mahal secara komputasi, atau meningkatkan jumlah data yang harus disimpan sebagai bagian dari state. Ada juga biaya 5 gas untuk tiap bita dalam data transaksi. Maksud dari sistem biaya adalah untuk mengharuskan penyerang membayar secara proporsional untuk setiap sumber daya yang mereka konsumsi, termasuk komputasi, bandwidth, dan penyimpanan; oleh karena itu, setiap transaksi yang menyebabkan jaringan mengkonsumsi sumber daya yang lebih besar dari sumber daya tersebut harus memiliki biaya gas yang secara kasar sebanding dengan peningkatan tersebut.

### Pesan {#messages}

Kontrak memiliki kemampuan untuk mengirim "pesan" ke kontrak lain. Pesan adalah objek virtual yang tidak pernah diserialisasikan dan hanya ada di lingkungan eksekusi Ethereum. Satu pesan berisi:

- Pengirim message (tersirat)
- Penerima message
- Jumlah ether yang ditransfer bersamaan dengan pesan
- Sebuah field data opsional
- Sebuah nilai `STARTGAS`

Pada dasarnya, sebuah pesan seperti sebuah transaksi, kecuali bahwa pesan tersebut dihasilkan oleh sebuah kontrak dan bukan oleh aktor eksternal. Sebuah pesan dihasilkan ketika sebuah kontrak yang sedang menjalankan kode menjalankan opcode `CALL`, yang menghasilkan dan menjalankan sebuah pesan. Seperti sebuah transaksi, sebuah pesan mengarah ke akun penerima yang menjalankan kodenya. Dengan demikian, kontrak dapat memiliki hubungan dengan kontrak lain dengan cara yang persis sama seperti yang dilakukan oleh aktor eksternal.

Perhatikan bahwa jatah gas yang ditetapkan oleh suatu transaksi atau kontrak berlaku untuk total gas yang dikonsumsi oleh transaksi tersebut dan semua sub-eksekusi. Sebagai contoh, jika aktor eksternal A mengirim transaksi ke B dengan 1000 gas, dan B mengkonsumsi 600 gas sebelum mengirim pesan ke C, dan eksekusi internal C mengonsumsi 300 gas sebelum kembali, maka B dapat menghabiskan 100 gas lagi sebelum kehabisan gas.

### Fungsi Transisi State Ethereum {#ethereum-state-transition-function}

![Transisi state Ether](./ether-state-transition.png)

Fungsi transisi state Ethereum, `APPLY(S,TX) -> S'` dapat didefinisikan sebagai berikut:

1. Periksa apakah transaksi terbentuk dengan baik (yaitu memiliki jumlah nilai yang tepat), tanda tangan valid, dan nonce cocok dengan nonce yang ada di akun pengirim. Jika tidak, kembali dengan nilai eror.
2. Menghitung biaya transaksi sebagai `STARTGAS * GASPRICE`, dan menentukan alamat pengirim dari tanda tangan. Kurangi biaya dari saldo akun pengirim dan tambahkan nonce pengirim. Jika saldo pemakaian tidak cukup, kembali dengan nilai eror.
3. Menginisialisasi `GAS = STARTGAS`, dan mengurangi sejumlah gas tertentu per bita untuk membayar bita dalam transaksi.
4. Mentransfer nilai transaksi dari akun pengirim ke akun penerima. Jika akun penerima belum ada, buatlah akun tersebut. Jika akun penerima adalah sebuah kontrak, jalankan kode kontrak hingga selesai atau hingga eksekusi kehabisan gas.
5. Jika transfer nilai gagal karena pengirim tidak memiliki cukup uang, atau eksekusi kode kehabisan gas, kembalikan semua perubahan status kecuali pembayaran biaya, dan tambahkan biaya ke akun penambang.
6. Jika tidak, kembalikan biaya untuk semua gas yang tersisa kepada pengirim, dan kirimkan biaya yang telah dibayarkan untuk gas yang dikonsumsi kepada penambang.

Sebagai contoh, anggaplah kode kontrak adalah:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Perhatikan bahwa pada kenyataannya kode kontrak ditulis dalam kode EVM tingkat rendah; contoh ini ditulis dalam Serpent, salah satu bahasa tingkat tinggi kami, untuk kejelasan, dan dapat dikompilasi ke kode EVM. Misalkan penyimpanan kontrak dimulai dengan kosong, dan sebuah transaksi dikirim dengan nilai 10 ether, 2000 gas, 0,001 harga gas ether, dan 64 bita data, dengan bita 0-31 mewakili angka `2` dan bita 32-63 mewakili string `CHARLIE`. Proses untuk fungsi transisi status dalam kasus ini adalah sebagai berikut:

1. Periksa apakah transaksi sudah valid dan terbentuk dengan baik.
2. Pastikan pengirim transaksi memiliki setidaknya 2000 \* 0,001 = 2 ether. Jika demikian, maka kurangi 2 ether dari akun pengirim.
3. Inisialisasi gas = 2000; dengan asumsi transaksi sepanjang 170 bita dan biaya bita adalah 5, kurangi 850 sehingga tersisa 1,150 gas.
4. Kurangi 10 ether lagi dari akun pengirim, dan tambahkan ke akun kontrak.
5. Jalankan kode. Dalam kasus ini, ini sederhana: sistem memeriksa apakah penyimpanan kontrak pada indeks `2` digunakan, perhatikan bahwa itu tidak digunakan, dan kemudian ia menetapkan penyimpanan pada indeks `2` ke nilai `CHARLIE`. Misalkan ini membutuhkan 187 gas, jadi jumlah gas yang tersisa adalah 1150 - 187 = 963
6. Tambahkan 963 \* 0,001 = 0,963 ether kembali ke akun pengirim, dan kembalikan status yang dihasilkan.

Jika tidak ada kontrak di ujung penerima transaksi, maka total biaya transaksi akan sama dengan `GASPRICE` yang disediakan dikalikan dengan panjang transaksi dalam bita, dan data yang dikirim bersama transaksi tidak relevan.

Perhatikan bahwa pesan bekerja sama dengan transaksi dalam hal pengembalian: jika eksekusi pesan kehabisan gas, maka eksekusi pesan tersebut, dan semua eksekusi lain yang dipicu oleh eksekusi tersebut, akan dikembalikan, tetapi eksekusi induk tidak perlu dikembalikan. Ini berarti bahwa "aman" bagi sebuah kontrak untuk memanggil kontrak lain, karena jika A memanggil B dengan gas G maka eksekusi A dijamin kehilangan paling banyak gas G. Akhirnya, perlu dicatat bahwa ada opcode `CREATE` yang membuat kontrak; mekanika eksekusinya umumnya serupa dengan opcode `CALL`, dengan pengecualian bahwa hasil eksekusi menentukan kode dari kontrak yang baru saja dibuat.

### Eksekusi Kode {#code-execution}

Kode dalam kontrak Ethereum ditulis dalam bahasa kode bita tingkat rendah berbasis stack, yang disebut sebagai "kode mesin virtual Ethereum" atau "kode EVM". Kode terdiri dari serangkaian bita, di mana setiap bita mewakili sebuah operasi. Secara umum, eksekusi kode adalah sebuah perulangan tak terbatas yang terdiri dari melakukan operasi pada counter program saat ini (yang dimulai dari nol) secara berulang, dan kemudian menambahkan counter program sebanyak satu, sampai akhir kode tercapai atau kesalahan atau instruksi `STOP` atau `RETURN` terdeteksi. Operasi memiliki akses ke tiga jenis ruang untuk menyimpan data:

- **Stack**, sebuah wadah terakhir-masuk-pertama-keluar di mana nilai-nilai dapat dimasukkan dan diambil
- **Memori**, sebuah array bita yang dapat diperluas secara tak terbatas
- **Penyimpanan** jangka panjang kontrak, sebuah penyimpanan kunci/nilai. Tidak seperti stack dan memori, yang diatur ulang setelah komputasi berakhir, penyimpanan tetap bertahan untuk jangka panjang.

Kode ini juga dapat mengakses nilai, pengirim dan data dari pesan yang masuk, serta data header blok, dan kode ini juga dapat mengembalikan array bita data sebagai luaran.

Model eksekusi formal kode EVM sangat sederhana. Ketika mesin virtual Ethereum sedang berjalan, keadaan komputasinya dapat didefinisikan oleh tupel `(block_state, transaction, message, code, memory, stack, pc, gas)`, di mana `block_state` adalah keadaan global yang berisi semua akun dan mencakup saldo dan penyimpanan. Pada awal setiap putaran eksekusi, instruksi saat ini ditemukan dengan mengambil bita ke-`pc` dari `code` (atau 0 jika `pc >= len(code)`), dan setiap instruksi memiliki definisinya sendiri dalam hal bagaimana instruksi tersebut memengaruhi tupel tersebut. Sebagai contoh, `ADD` memunculkan dua item dari stack dan mendorong jumlahnya, mengurangi `gas` sebesar 1 dan menambahkan `pc` sebesar 1, dan `SSTORE` memunculkan dua item teratas dari stack dan memasukkan item kedua ke dalam penyimpanan kontrak pada indeks yang ditentukan oleh item pertama. Meskipun ada banyak cara untuk mengoptimalkan eksekusi mesin virtual Ethereum melalui kompilasi tepat waktu, implementasi dasar Ethereum dapat dilakukan dalam beberapa ratus baris kode.

### Rantai blok dan Menambang {#blockchain-and-mining}

![Menerapkan diagram blok Ethereum](./ethereum-apply-block-diagram.png)

Rantai blok Ethereum dalam banyak hal serupa dengan rantai blok Bitcoin, meskipun ada beberapa perbedaan. Perbedaan utama antara Ethereum dan Bitcoin dalam hal arsitektur rantai blok adalah, tidak seperti Bitcoin, blok Ethereum berisi salinan daftar transaksi dan status terbaru. Selain itu, dua nilai lainnya, nomor blok dan tingkat kesulitan, juga disimpan di dalam blok. Algoritma validasi blok dasar di Ethereum adalah sebagai berikut:

1. Periksa apakah blok yang dirujuk sebelumnya ada dan valid.
2. Periksa apakah stempel waktu blok lebih besar dari stempel waktu blok sebelumnya yang direferensikan dan kurang dari 15 menit ke depan
3. Periksa apakah nomor blok, tingkat kesulitan, akar transaksi, akar uncle, dan batas gas (berbagai konsep khusus Ethereum tingkat rendah) sudah valid.
4. Periksa apakah bukti kerja pada blok tersebut valid.
5. Biarkan `S[0]` menjadi state pada ujung blok sebelumnya.
6. Biarkan `TX` menjadi daftar transaksi blok, dengan `n` transaksi. Untuk semua `i` dalam `0...n-1`, atur `S[i+1] = APPLY(S[i],TX[i])`. Jika ada aplikasi yang mengembalikan galat, atau jika total gas yang dikonsumsi dalam blok sampai saat ini melebihi `GASLIMIT`, maka kembalikan galat.
7. Biarkan `S_FINAL` menjadi `S[n]`, tetapi tambahkan imbalan blok yang dibayarkan kepada penambang.
8. Periksa apakah akar pohon Merkle dari state `S_FINAL` sama dengan akar state akhir yang disediakan dalam header blok. Jika ya, blokir tersebut valid; jika tidak, blokir tersebut tidak valid.

Pendekatan ini mungkin terlihat sangat tidak efisien pada pandangan pertama, karena harus menyimpan seluruh state pada setiap blok, tetapi pada kenyataannya efisiensi harus sebanding dengan Bitcoin. Alasannya adalah karena state disimpan dalam struktur pohon, dan setelah setiap blok hanya sebagian kecil dari pohon yang perlu diubah. Dengan demikian, secara umum, antara dua blok yang berdekatan, sebagian besar pohon harus sama, dan oleh karena itu data dapat disimpan satu kali dan direferensikan dua kali menggunakan pointer (misalnya, hash dari sub-pohon). Jenis pohon khusus yang dikenal sebagai "pohon Patricia" digunakan untuk mencapai hal ini, termasuk modifikasi pada konsep pohon Merkle yang memungkinkan simpul-simpul disisipkan dan dihapus, dan tidak hanya diubah, secara efisien. Selain itu, karena semua informasi status merupakan bagian dari blok terakhir, maka tidak perlu menyimpan seluruh riwayat rantai blok - sebuah strategi yang, jika dapat diterapkan pada Bitcoin, dapat dihitung untuk memberikan penghematan ruang sebesar 5-20x lipat.

Pertanyaan yang sering ditanyakan adalah "di mana" kode kontrak dieksekusi, dalam hal perangkat keras fisik. Ini memiliki jawaban sederhana: proses eksekusi kode kontrak adalah bagian dari definisi fungsi transisi keadaan, yang merupakan bagian dari algoritma validasi blok, sehingga jika suatu transaksi ditambahkan ke dalam blok `B`, eksekusi kode yang dipicu oleh transaksi tersebut akan dieksekusi oleh semua node, sekarang dan di masa depan, yang mengunduh dan memvalidasi blok `B`.

## Aplikasi {#applications}

Secara umum, ada tiga jenis aplikasi di atas Ethereum. Kategori pertama adalah aplikasi finansial, memberikan kekuatan kepada pengguna cara yang lebih untuk mengelola dan masuk dalam kontrak menggunakan uang mereka. Ini termasuk sub-mata uang, derivatif keuangan, kontrak lindung nilai, dompet tabungan, surat wasiat, dan pada akhirnya bahkan beberapa kelas kontrak kerja skala penuh. Kategori kedua adalah aplikasi semi-keuangan, di mana uang terlibat tetapi ada juga sisi non-moneter yang besar dari apa yang sedang dilakukan; contoh yang sempurna adalah hadiah yang menegakkan sendiri untuk solusi masalah komputasi. Terakhir, ada aplikasi seperti pemungutan suara daring dan tata kelola terdesentralisasi yang sama sekali tidak bersifat finansial.

### Sistem Token {#token-systems}

Sistem token pada rantai blok memiliki banyak aplikasi mulai dari sub-mata uang yang mewakili aset seperti USD atau emas hingga saham perusahaan, token individu yang mewakili properti pintar, kupon yang tidak dapat dipalsukan aman, dan bahkan sistem token yang tidak memiliki hubungan dengan nilai konvensional sama sekali, yang digunakan sebagai sistem poin untuk insentif. Sistem token sangat mudah diimplementasikan di Ethereum. Poin penting yang harus dipahami adalah bahwa semua mata uang, atau sistem token, pada dasarnya adalah sebuah database dengan satu operasi: kurangi X unit dari A dan berikan X unit ke B, dengan ketentuan bahwa (i) A memiliki setidaknya X unit sebelum transaksi dan (2) transaksi tersebut disetujui oleh A. Yang diperlukan untuk mengimplementasikan sistem token adalah mengimplementasikan logika ini ke dalam sebuah kontrak.

Kode dasar untuk mengimplementasikan sistem token di Serpent terlihat sebagai berikut:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Ini pada dasarnya adalah implementasi harfiah dari fungsi transisi negara "sistem perbankan" yang dijelaskan lebih lanjut di atas dalam dokumen ini. Beberapa baris kode tambahan perlu ditambahkan untuk menyediakan langkah awal pendistribusian unit mata uang di tempat pertama dan beberapa kasus tepi lainnya, dan idealnya sebuah fungsi akan ditambahkan untuk memungkinkan kontrak lain meminta saldo suatu alamat. Tapi hanya itu saja yang ada untuk itu. Secara teoritis, sistem token berbasis Ethereum yang bertindak sebagai sub-mata uang dapat berpotensi menyertakan fitur penting lainnya yang tidak dimiliki oleh mata uang meta-rantai blok berbasis Bitcoin di dalam rantai: kemampuan untuk membayar biaya transaksi secara langsung dalam mata uang tersebut. Cara penerapannya adalah kontrak akan mempertahankan saldo ether yang akan digunakan untuk mengembalikan ether yang digunakan untuk membayar biaya kepada pengirim, dan akan mengisi saldo ini dengan mengumpulkan unit mata uang internal yang dibutuhkan untuk membayar biaya dan menjualnya kembali dalam lelang yang sedang berjalan. Oleh karena itu, pengguna perlu "mengaktifkan" akun mereka dengan ether, tetapi begitu ether ada di sana, akun tersebut akan dapat digunakan kembali karena kontrak akan mengembalikannya setiap saat.

### Turunan finansial dan Mata Uang Bernilai Stabil {#financial-derivatives-and-stable-value-currencies}

Derivatif keuangan adalah aplikasi yang paling umum dari "kontrak pintar", dan salah satu yang paling mudah diimplementasikan dalam kode. Tantangan utama dalam mengimplementasikan kontrak keuangan adalah bahwa sebagian besar dari mereka memerlukan referensi ke telegrap harga eksternal; misalnya, aplikasi yang sangat diinginkan adalah kontrak pintar yang melakukan lindung nilai terhadap volatilitas ether (atau mata uang kripto lainnya) sehubungan dengan dolar AS, tetapi untuk melakukan hal ini, kontrak harus mengetahui berapa nilai ETH/USD. Cara paling sederhana untuk melakukan hal ini adalah melalui kontrak "feed data" yang dikelola oleh pihak tertentu (mis. NASDAQ) yang dirancang agar pihak tersebut dapat memperbarui kontrak sesuai kebutuhan, dan menyediakan antarmuka yang memungkinkan kontrak lain untuk mengirim pesan ke kontrak tersebut dan mendapatkan balasan berupa harga.

Dengan adanya unsur penting tersebut, kontrak lindung nilai akan terlihat sebagai berikut:

1. Tunggu pihak A memasukkan 1000 ether.
2. Tunggu pihak B memasukkan 1000 ether.
3. Catat nilai USD dari 1000 ether, yang dihitung dengan menanyakan kontrak umpan data, dalam penyimpanan, katakanlah ini adalah $x.
4. Setelah 30 hari, izinkan A atau B untuk "mengaktifkan kembali" kontrak untuk mengirim ether senilai $x (dihitung dengan meminta kontrak umpan data lagi untuk mendapatkan harga baru) ke A dan sisanya ke B.

Kontrak demikian akan memiliki potensi signifikan dalam perdagangan kripto. Salah satu masalah utama yang disebutkan mengenai mata uang kripto adalah fakta bahwa mata uang ini mudah berubah; meskipun banyak pengguna dan pedagang yang menginginkan keamanan dan kenyamanan dalam bertransaksi dengan aset kriptografi, banyak dari mereka yang tidak ingin menghadapi kemungkinan kehilangan 23% dari nilai dana mereka dalam satu hari. Hingga saat ini, solusi yang paling sering diusulkan adalah aset yang didukung oleh penerbit; idenya adalah penerbit menciptakan sub-mata uang di mana mereka memiliki hak untuk menerbitkan dan mencabut unit, dan menyediakan satu unit mata uang kepada siapa pun yang menyediakannya (secara offline) dengan satu unit aset acuan tertentu (mis. emas, USD). Penerbit kemudian berjanji untuk memberikan satu unit aset acuan kepada siapa saja yang mengirimkan kembali satu unit aset kripto. Mekanisme ini memungkinkan aset non-kriptografi apa pun untuk "diangkat" menjadi aset kriptografi, asalkan penerbitnya dapat dipercaya.

Namun dalam praktiknya, penerbit tidak selalu dapat dipercaya, dan dalam beberapa kasus, infrastruktur perbankan terlalu lemah, atau terlalu tidak bersahabat, sehingga layanan semacam itu tidak ada. Turunan finansial menyediakan sebuah alternatif. Di sini, alih-alih penerbit tunggal yang menyediakan dana untuk mendukung aset, pasar terdesentralisasi yang terdiri dari para spekulan, bertaruh bahwa harga aset referensi kriptografi (mis. ETH) akan naik, memainkan peran tersebut. Tidak seperti emiten, spekulan tidak memiliki opsi untuk gagal dalam tawar-menawar karena kontrak lindung nilai menahan dana mereka dalam escrow. Perlu diingat bahwa pendekatan ini tidak sepenuhnya terdesentralisasi, karena sumber tepercaya masih diperlukan untuk menyediakan telegrap harga, meskipun dapat dikatakan bahwa hal ini merupakan peningkatan besar dalam hal mengurangi kebutuhan infrastruktur (tidak seperti menjadi penerbit, menerbitkan umpan harga tidak memerlukan lisensi dan kemungkinan besar dapat dikategorikan sebagai kebebasan berbicara) dan mengurangi potensi penipuan.

### Identitas dan Sistem Reputasi {#identity-and-reputation-systems}

Mata uang kripto alternatif pertama yang muncul, [Namecoin](http://namecoin.org/), mencoba menggunakan rantai blok serupa Bitcoin untuk menyediakan sistem registrasi nama, di mana pengguna dapat mendaftarkan nama mereka dalam basis data publik bersama dengan data lainnya. Kasus penggunaan utama yang sering dikutip adalah untuk sistem [DNS](https://wikipedia.org/wiki/Domain_Name_System), yang memetakan nama domain seperti "bitcoin.org" (atau, dalam kasus Namecoin, "bitcoin.bit") ke alamat IP. Kasus penggunaan lainnya termasuk autentikasi email dan sistem reputasi yang berpotensi lebih canggih. Berikut ini adalah kontrak dasar untuk menyediakan sistem registrasi nama yang mirip dengan Namecoin di Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Kontraknya sangat sederhana; semuanya itu merupakan basis data di dalam jaringan Ethereum yang dapat di tambahkan, tetapi tidak dapat dimodifikasi atau dihapus. Siapa pun dapat mendaftarkan nama dengan nilai tertentu, dan pendaftaran tersebut akan melekat selamanya. Kontrak pendaftaran nama yang lebih canggih juga akan memiliki "klausul fungsi" yang memungkinkan kontrak lain untuk menanyakannya, serta mekanisme untuk "pemilik" (yaitu pendaftar pertama) sebuah nama untuk mengubah data atau mengalihkan kepemilikan. Kita bahkan bisa menambahkan fungsionalitas reputasi dan web-of-trust di atasnya.

### Penyimpanan File Terdesentralisasi {#decentralized-file-storage}

Selama beberapa tahun terakhir, telah muncul sejumlah perusahaan rintisan penyimpanan file daring yang populer, yang paling menonjol adalah Dropbox, yang memungkinkan pengguna untuk mengunggah cadangan hard drive mereka dan meminta layanan ini untuk menyimpan cadangan tersebut dan mengizinkan pengguna untuk mengaksesnya dengan imbalan biaya bulanan. Namun, pada saat ini pasar penyimpanan file terkadang relatif tidak efisien; pandangan sepintas pada berbagai solusi yang ada menunjukkan bahwa, terutama pada tingkat "lembah yang luar biasa" 20-200 GB di mana tidak ada kuota gratis atau diskon tingkat perusahaan yang berlaku, harga bulanan untuk biaya penyimpanan file utama sedemikian rupa sehingga Anda membayar lebih banyak daripada biaya seluruh hard drive dalam satu bulan. Kontrak Ethereum dapat memungkinkan pengembangan ekosistem penyimpanan file yang terdesentralisasi, di mana pengguna individu dapat memperoleh sejumlah kecil uang dengan menyewakan hard drive mereka sendiri dan ruang yang tidak terpakai dapat digunakan untuk menurunkan biaya penyimpanan file.

Bagian utama yang menopang perangkat semacam itu adalah apa yang kami sebut sebagai "kontrak Dropbox yang terdesentralisasi". Kontrak ini bekerja sebagai berikut. Pertama, seseorang membagi data yang diinginkan menjadi beberapa blok, mengenkripsi setiap blok untuk privasi, dan membangun pohon Merkle dari data tersebut. Kemudian membuat sebuah kontrak dengan aturan bahwa, setiap N blok, kontrak akan memilih sebuah indeks acak di dalam pohon Merkle (menggunakan hash blok sebelumnya, yang dapat diakses dari kode kontrak, sebagai sumber keacakan), dan memberikan X ether kepada entitas pertama yang memasok transaksi dengan verifikasi pembayaran yang disederhanakan-seperti bukti kepemilikan blok pada indeks tertentu di dalam pohon. Ketika pengguna ingin mengunduh ulang file mereka, mereka dapat menggunakan protokol saluran pembayaran mikro (misalnya, membayar 1 szabo per 32 kilobita) untuk memulihkan file tersebut; pendekatan yang paling hemat biaya adalah pembayar tidak memublikasikan transaksi hingga akhir, alih-alih mengganti transaksi tersebut dengan transaksi yang sedikit lebih menguntungkan dengan nonce yang sama setiap 32 kilobita.

Fitur penting dari protokol ini adalah, walaupun kelihatannya seperti memercayai banyak simpul secara acak untuk tidak memutuskan untuk melupakan file tersebut, kita dapat mengurangi risiko tersebut hingga mendekati nol dengan cara membagi file tersebut ke dalam beberapa bagian melalui berbagi rahasia, dan mengawasi kontrak untuk melihat apakah setiap bagian tersebut masih berada di tangan beberapa simpul. Jika sebuah kontrak masih membayar uang, itu memberikan bukti kriptografi bahwa seseorang di luar sana masih menyimpan file tersebut.

### Organisasi Otonom Terdesentralisasi {#decentralized-autonomous-organizations}

Konsep umum dari "organisasi otonom terdesentralisasi" adalah sebuah entitas virtual yang memiliki sekumpulan anggota atau pemegang saham tertentu yang, mungkin dengan mayoritas 67%, memiliki hak untuk membelanjakan dana entitas dan memodifikasi kodenya. Para anggota secara kolektif akan memutuskan bagaimana organisasi harus mengalokasikan dananya. Metode untuk mengalokasikan dana DAO dapat berkisar dari hadiah, gaji, hingga mekanisme yang lebih eksotis seperti mata uang internal untuk memberi imbalan pekerjaan. Pada dasarnya, ini mereplikasi perangkap hukum perusahaan tradisional atau nirlaba tetapi hanya menggunakan teknologi rantai blok kriptografi untuk penegakan hukum. Sejauh ini banyak pembicaraan seputar DAO adalah seputar model "kapitalis" dari "perusahaan otonom yang terdesentralisasi" (DAC) dengan pemegang saham yang menerima dividen dan saham yang dapat diperdagangkan; sebuah alternatif, yang dapat digambarkan sebagai "komunitas otonom yang terdesentralisasi", akan membuat semua anggota memiliki andil yang sama dalam pengambilan keputusan dan mengharuskan 67% anggota yang ada setuju untuk menambah atau menghapus anggota. Persyaratan bahwa satu orang hanya boleh memiliki satu keanggotaan kemudian perlu ditegakkan secara kolektif oleh kelompok.

Sebuah garis besar umum tentang bagaimana mengodekan DAO adalah sebagai berikut. Desain yang paling sederhana hanyalah sepotong kode yang dapat dimodifikasi sendiri yang akan berubah jika dua pertiga anggota menyetujui suatu perubahan. Meskipun kode secara teoritis tidak dapat diubah, seseorang dapat dengan mudah menyiasatinya dan memiliki mutabilitas de-facto dengan memiliki potongan-potongan kode dalam kontrak yang terpisah, dan memiliki alamat kontrak mana yang akan dipanggil yang disimpan dalam penyimpanan yang dapat dimodifikasi. Dalam implementasi sederhana dari kontrak DAO tersebut, akan ada tiga jenis transaksi, yang dibedakan berdasarkan data yang disediakan dalam transaksi:

- `[0,i,K,V]` digunakan untuk mendaftarkan proposal dengan indeks `i` untuk mengubah alamat pada indeks penyimpanan `K` menjadi nilai `V`
- `[1,i]` untuk mendaftarkan satu suara yang mendukung proposal `i`
- `[2,i]` untuk memfinalisasi proposal `i` jika suara yang diperoleh telah mencukupi

Kontraknya kemudian akan memiliki klausa untuk setiap transaksi ini. Ini akan menyimpan catatan semua perubahan penyimpanan terbuka, bersama dengan daftar siapa yang memilihnya. Juga akan memiliki daftar semua anggota. Ketika setiap perubahan penyimpanan mendapatkan dua pertiga dari anggota yang memilihnya, transaksi finalisasi dapat mengeksekusi perubahan tersebut. Rangkaian yang lebih canggih juga akan memiliki kemampuan voting terintegrasi untuk fitur seperti mengirim transaksi, menambahkan anggota, dan menghapus anggota, dan bahkan mungkin menyediakan delegasi suara gaya [Demokrasi Cair](https://wikipedia.org/wiki/Liquid_democracy) (yaitu, siapa pun dapat menugaskan seseorang untuk memberikan suara atas nama mereka, dan penugasan bersifat transitif, jadi jika A menugaskan B dan B menugaskan C maka C menentukan suara A). Desain ini akan memungkinkan DAO untuk tumbuh secara organik sebagai komunitas yang terdesentralisasi, yang pada akhirnya memungkinkan orang untuk mendelegasikan tugas menyaring siapa yang menjadi anggota kepada spesialis, meskipun tidak seperti dalam "sistem saat ini", para spesialis dapat dengan mudah masuk dan keluar dari eksistensi dari waktu ke waktu ketika anggota komunitas mengubah keberpihakannya.

Model alternatifnya adalah perusahaan yang terdesentralisasi, di mana setiap akun dapat memiliki nol saham atau lebih, dan dua pertiga saham diperlukan untuk membuat keputusan. Kerangka kerja yang lengkap akan melibatkan fungsionalitas manajemen aset, kemampuan untuk membuat penawaran untuk membeli atau menjual saham, dan kemampuan untuk menerima penawaran (sebaiknya dengan mekanisme pencocokan pesanan di dalam kontrak). Delegasi juga akan ada dalam gaya Demokrasi Cair, yang menggeneralisasi konsep "dewan direksi".

### Aplikasi Lebih Lanjut {#further-applications}

**1. Dompet tabungan**. Misalkan Alice ingin menyimpan dananya dengan aman, tetapi khawatir akan kehilangan atau seseorang akan meretas kunci pribadinya. Dia memasukkan ether ke dalam sebuah kontrak dengan Bob, sebuah bank, sebagai berikut:

- Alice sendiri bisa menarik maksimum 1% dari dananya per hari.
- Bob sendiri dapat menarik maksimum 1% dari dana per hari, tetapi Alice memiliki kemampuan untuk melakukan transaksi dengan kuncinya yang mematikan kemampuan ini.
- Alice dan Bob bersama-sama bisa menarik apa pun.

Biasanya, 1% per hari sudah cukup untuk Alice, dan jika Alice ingin menarik lebih banyak, dia dapat menghubungi Bob untuk meminta bantuan. Jika kunci Alice diretas, dia akan berlari ke Bob untuk memindahkan dana ke kontrak baru. Jika dia kehilangan kuncinya, Bob akan mendapatkan dana tersebut pada akhirnya. Jika Bob ternyata jahat, maka dia bisa mematikan kemampuannya untuk menarik diri.

**2. Asuransi panen**. Seseorang dapat dengan mudah membuat kontrak derivatif keuangan tetapi menggunakan umpan data cuaca, bukan indeks harga apa pun. Jika seorang petani di Iowa membeli derivatif yang membayar secara terbalik berdasarkan curah hujan di Iowa, maka jika terjadi kekeringan, petani secara otomatis akan menerima uang dan jika ada cukup hujan, petani akan senang karena tanaman mereka akan tumbuh dengan baik. Ini bisa diperluas ke asuransi bencana alam pada umumnya.

**3. Umpan data terdesentralisasi**. Untuk kontrak finansial berupa kontrak perbedaan, sebenarnya mungkin memungkinkan untuk mendesentralisasikan umpan data melalui sebuah protokol yang disebut "[SchellingCoin](http://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)". SchellingCoin pada dasarnya bekerja sebagai berikut: N pihak semuanya memasukkan nilai datum yang diberikan ke dalam sistem (misalnya, harga ETH/USD), nilainya diurutkan, dan setiap orang yang berada di persentil ke-25 hingga ke-75 mendapatkan satu token sebagai imbalan. Setiap orang memiliki insentif untuk memberikan jawaban yang akan diberikan oleh orang lain, dan satu-satunya nilai yang secara realistis dapat disetujui oleh banyak pemain adalah standar yang jelas: kebenaran. Hal ini menciptakan protokol terdesentralisasi yang secara teoritis dapat memberikan sejumlah nilai, termasuk harga ETH/USD, suhu di Berlin, atau bahkan hasil dari komputasi yang sulit.

**4. Escrow multi tanda tangan pintar**. Bitcoin memungkinkan kontrak transaksi multitandatangan di mana, sebagai contoh, tiga dari lima kunci yang diberikan dapat membelanjakan dana. Ethereum memungkinkan lebih banyak perincian; misalnya, empat dari lima orang dapat membelanjakan semuanya, tiga dari lima orang dapat membelanjakan hingga 10% per hari, dan dua dari lima orang dapat membelanjakan hingga 0,5% per hari. Selain itu, multisig Ethereum bersifat asinkron - dua pihak dapat mendaftarkan tanda tangan mereka di rantai blok pada waktu yang berbeda dan tanda tangan terakhir akan secara otomatis mengirim transaksi.

**5. Komputasi cloud**. Teknologi EVM juga dapat digunakan untuk menciptakan lingkungan komputasi yang dapat diverifikasi, sehingga pengguna dapat meminta orang lain untuk melakukan komputasi dan kemudian secara opsional meminta bukti bahwa komputasi pada titik pemeriksaan tertentu yang dipilih secara acak telah dilakukan dengan benar. Hal ini memungkinkan terciptanya pasar komputasi cloud di mana setiap pengguna dapat berpartisipasi dengan desktop, laptop, atau server khusus mereka, dan pengecekan di tempat bersama dengan uang jaminan dapat digunakan untuk memastikan bahwa sistem tersebut dapat dipercaya (misal, simpul tidak dapat menipu secara menguntungkan). Meskipun sistem seperti itu mungkin tidak cocok untuk semua tugas; tugas yang membutuhkan komunikasi antar-proses tingkat tinggi, misalnya, tidak dapat dengan mudah dilakukan pada cloud simpul yang besar. Akan tetapi, tugas-tugas lain jauh lebih mudah untuk diparalelkan; proyek-proyek seperti SETI@home, folding@home, dan algoritme genetika dapat dengan mudah diimplementasikan di atas platform semacam itu.

**6. Perjudian peer-to-peer**. Berbagai protokol perjudian peer-to-peer, seperti protokol [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) yang dikembangkan oleh Frank Stajano dan Richard Clayton, dapat diimplementasikan di rantai blok Ethereum. Protokol perjudian yang paling sederhana sebenarnya hanyalah kontrak untuk perbedaan pada hash blok berikutnya, dan protokol yang lebih canggih dapat dibangun dari sana, menciptakan layanan perjudian dengan biaya mendekati nol yang tidak memiliki kemampuan untuk menipu.

**7. Pasar prediksi**. Dengan adanya oracle atau SchellingCoin, pasar prediksi juga mudah diimplementasikan, dan pasar prediksi bersama dengan SchellingCoin mungkin akan menjadi aplikasi utama pertama dari [futarchy](http://hanson.gmu.edu/futarchy.html) sebagai protokol pemerintahan untuk organisasi terdesentralisasi.

**8. Pasar terdesentralisasi di dalam rantai**, menggunakan sistem identitas dan reputasi sebagai dasarnya.

## Lain-Lain dan Permasalahan {#miscellanea-and-concerns}

### Implementasi GHOST yang Dimodifikasi {#modified-ghost-implementation}

Protokol "Greedy Heaviest Observed Subtree" (GHOST) adalah inovasi yang pertama kali diperkenalkan oleh Yonatan Sompolinsky dan Aviv Zohar pada bulan [Desember 2013](https://eprint.iacr.org/2013/881.pdf). Motivasi di balik GHOST adalah bahwa rantai blok dengan waktu konfirmasi yang cepat saat ini mengalami penurunan keamanan karena tingkat basi yang tinggi - karena blok membutuhkan waktu tertentu untuk menyebar melalui jaringan, jika penambang A menambang sebuah blok dan kemudian penambang B menambang blok lain sebelum blok penambang A menyebar ke B, maka blok penambang B akan terbuang sia-sia dan tidak akan memberikan kontribusi terhadap keamanan jaringan. Selain itu, terdapat masalah sentralisasi: jika penambang A adalah sebuah pool menambang dengan hashpower 30% dan B memiliki hashpower 10%, A akan memiliki risiko menghasilkan blok basi 70% dari waktu (karena 30% dari waktu yang lain A menghasilkan blok terakhir dan dengan demikian akan mendapatkan data menambang dengan segera), sedangkan B akan memiliki risiko menghasilkan blok basi 90% dari waktu. Dengan demikian, jika interval blok cukup pendek sehingga tingkat basi menjadi tinggi, A akan jauh lebih efisien hanya berdasarkan ukurannya. Dengan gabungan kedua efek ini, rantai blok yang menghasilkan blok dengan cepat sangat mungkin untuk menghasilkan satu pool menambang yang memiliki persentase hashpower jaringan yang cukup besar sehingga secara de facto dapat mengontrol proses menambang.

Seperti yang dijelaskan oleh Sompolinsky dan Zohar, GHOST memecahkan masalah pertama yaitu kehilangan keamanan jaringan dengan memasukkan blok-blok basi ke dalam perhitungan rantai mana yang "terpanjang"; dengan kata lain, tidak hanya induk dan nenek moyang lebih lanjut dari sebuah blok, tetapi juga keturunan basi dari nenek moyang blok tersebut (dalam jargon Ethereum, "paman") ditambahkan ke dalam perhitungan blok mana yang memiliki total bukti-bukti kerja terbesar yang mendukungnya. Untuk mengatasi masalah kedua yaitu bias sentralisasi, kami melampaui protokol yang dijelaskan oleh Sompolinsky dan Zohar, dan juga memberikan imbalan blok kepada stales: sebuah stale menerima 87,5% dari imbalan dasarnya, dan keponakan yang menyertakan stale tersebut menerima 12,5% sisanya. Namun, biaya transaksi tidak diberikan kepada blok paman.

Ethereum mengimplementasikan versi sederhana dari GHOST yang hanya turun tujuh level. Khususnya, seperti yang didefinisikan berikut ini:

- Sebuah blok harus menentukan satu induk, dan harus menentukan 0 atau lebih banyak blok paman
- Satu blok paman yang termasuk dalam blok B harus memiliki properti berikut ini:
  - Itu harus berupa keturunan langsung dari leluhur generasi ke-k dari B, di mana `2 <= k <= 7`.
  - Tidak mungkin nenek moyang dari B
  - Paman harus berupa header blok yang valid, tetapi tidak harus berupa blok yang telah diverifikasi sebelumnya atau bahkan blok yang valid
  - Seorang paman harus berbeda dari semua paman yang termasuk dalam blok sebelumnya dan semua paman lain yang termasuk dalam blok yang sama (tidak termasuk ganda)
- Untuk setiap paman U di blok B, penambang B akan mendapatkan tambahan 3,125% dari imbalan coinbase dan penambang U akan mendapatkan 93,75% dari imbalan coinbase standar.

Versi terbatas GHOST ini, dengan paman yang hanya dapat disertakan hingga 7 generasi, digunakan untuk dua alasan. Pertama, GHOST yang tidak terbatas akan memasukkan terlalu banyak komplikasi ke dalam perhitungan paman mana untuk blok tertentu yang valid. Kedua, GHOST tanpa batas dengan kompensasi seperti yang digunakan dalam Ethereum menghilangkan insentif bagi penambang untuk menambang di rantai utama dan bukan di rantai penyerang publik.

### Biaya {#fees}

Karena setiap transaksi yang diterbitkan ke dalam rantai blok membebankan biaya kepada jaringan untuk mengunduh dan memverifikasinya, maka diperlukan sebuah mekanisme regulasi, yang biasanya melibatkan biaya transaksi, untuk mencegah penyalahgunaan. Pendekatan standar yang digunakan dalam Bitcoin adalah dengan biaya yang murni sukarela, dengan mengandalkan para penambang untuk bertindak sebagai penjaga gerbang dan menetapkan batas minimum yang dinamis. Pendekatan ini telah diterima dengan sangat baik dalam komunitas Bitcoin terutama karena pendekatan ini "berbasis pasar", yang memungkinkan penawaran dan permintaan antara penambang dan pengirim transaksi menentukan harga. Akan tetapi, masalah dengan pemikiran ini adalah bahwa pemrosesan transaksi bukanlah sebuah pasar; walaupun secara intuitif menarik untuk mengartikan pemrosesan transaksi sebagai sebuah layanan yang ditawarkan oleh penambang kepada pengirim, pada kenyataannya, setiap transaksi yang disertakan oleh penambang harus diproses oleh setiap simpul di dalam jaringan, sehingga sebagian besar biaya pemrosesan transaksi ditanggung oleh pihak ketiga, dan bukan oleh penambang yang mengambil keputusan untuk mengikutsertakan transaksi tersebut atau tidak. Oleh karena itu, masalah tragedi yang biasa terjadi sangat mungkin terjadi.

Namun, ternyata kekurangan dalam mekanisme berbasis pasar ini, ketika diberikan asumsi penyederhanaan tertentu yang tidak akurat, secara ajaib akan hilang dengan sendirinya. Argumennya adalah sebagai berikut. Anggaplah:

1. Sebuah transaksi menghasilkan `k` operasi, menawarkan imbalan `kR` kepada penambang mana pun yang menyertakannya di mana `R` ditetapkan oleh pengirim dan `k` dan `R` (secara kasar) terlihat oleh penambang sebelumnya.
2. Sebuah operasi memiliki biaya pemrosesan sebesar `C` untuk setiap simpul (misalnya, semua simpul memiliki efisiensi yang sama)
3. Terdapat `N` simpul menambang, masing-masing dengan kekuatan pemrosesan yang sama (misalnya, `1/N` dari total)
4. Tidak ada simpul penuh non-menambang.

Seorang penambang akan bersedia untuk memproses sebuah transaksi jika imbalan yang diharapkan lebih besar daripada biayanya. Oleh karena itu, imbalan yang diharapkan adalah `kR/N` karena penambang memiliki peluang `1/N` untuk memproses blok berikutnya, dan biaya pemrosesan bagi penambang adalah `kC`. Oleh karena itu, penambang akan menyertakan transaksi di mana `kR/N > kC`, atau `R > NC`. Perhatikan bahwa `R` adalah biaya per operasi yang diberikan oleh pengirim, dan oleh karena itu merupakan batas bawah manfaat yang diperoleh pengirim dari transaksi, dan `NC` adalah biaya keseluruhan jaringan untuk memproses sebuah operasi. Oleh karena itu, para penambang memiliki insentif untuk memasukkan hanya transaksi-transaksi yang total manfaatnya melebihi biayanya.

Namun demikian, ada beberapa penyimpangan penting dari asumsi-asumsi tersebut pada kenyataannya:

1. Penambang membayar biaya yang lebih tinggi untuk memproses transaksi dibandingkan simpul verifikasi lainnya, karena waktu verifikasi tambahan menunda penyebaran blok dan dengan demikian meningkatkan kemungkinan blok menjadi kedaluwarsa.
2. Memang ada simpul penuh yang tidak ditambang.
3. Distribusi kekuasaan menambang dapat berakhir dengan ketidakadilan dalam praktiknya.
4. Spekulan, musuh politik, dan orang gila yang memiliki fungsi utilitas untuk merusak jaringan memang ada, dan mereka dapat dengan cerdik membuat kontrak yang biayanya jauh lebih rendah daripada biaya yang dibayarkan oleh simpul-simpul pemverifikasi lainnya.

(1) membuat penambang cenderung memasukkan transaksi yang lebih sedikit, dan (2) meningkatkan `NC`; karena itu, setidaknya, kedua efek tersebut secara terpisah saling membatalkan satu sama lain.<sup>[Bagaimana?](https://github.com/ethereum/wiki/issues/447#issuecomment-316972260)</sup> (3) dan (4) adalah masalah utama; untuk menanganinya kita hanya perlu membentuk modal mengambang: tidak ada blok yang bisa memiliki operasi lebih dari `BLK_LIMIT_FACTOR` kali yang adalah rata- rata pergerakan eksponensial jangka panjang. Secara rinci:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` dan `EMA_FACTOR` adalah konstanta yang saat ini akan diatur menjadi 65536 dan 1.5, tetapi kemungkinan akan diubah setelah analisis lebih lanjut.

Ada faktor lain yang menjadi disinsentif bagi ukuran blok yang besar dalam Bitcoin: blok yang besar akan membutuhkan waktu lebih lama untuk disebarkan, dan dengan demikian memiliki kemungkinan yang lebih tinggi untuk menjadi kedaluwarsa. Di Ethereum, blok yang sangat banyak mengonsumsi gas juga membutuhkan waktu lebih lama untuk disebarkan karena secara fisik lebih besar dan karena membutuhkan waktu lebih lama untuk memproses transisi status transaksi untuk memvalidasi. Disinsentif penundaan ini merupakan pertimbangan yang signifikan dalam Bitcoin, tetapi tidak terlalu signifikan dalam Ethereum karena protokol GHOST; oleh karena itu, mengandalkan batas blok yang diatur akan memberikan dasar yang lebih stabil.

### Komputasi Dan Kelengkapan-Turing {#computation-and-turing-completeness}

Catatan penting adalah bahwa mesin virtual Ethereum adalah Turing-complete; ini berarti bahwa kode EVM dapat mengodekan komputasi apa pun yang dapat dilakukan, termasuk loop tak terbatas. Kode EVM memungkinkan pengulangan dalam dua cara. Pertama, ada instruksi `JUMP` yang memungkinkan program melompat kembali ke posisi sebelumnya dalam kode, dan instruksi `JUMPI` untuk melompat secara kondisional, memungkinkan untuk pernyataan seperti `while x < 27: x = x * 2`. Kedua, kontrak dapat memanggil kontrak lain, yang berpotensi memungkinkan terjadinya pengulangan melalui perulangan. Hal ini tentu saja menimbulkan sebuah masalah: dapatkah pengguna yang jahat pada dasarnya mematikan penambang dan seluruh simpul dengan memaksa mereka untuk masuk ke dalam sebuah loop yang tidak terbatas? Masalah ini muncul karena masalah dalam ilmu komputer yang dikenal sebagai masalah penghentian: tidak ada cara untuk mengetahui, dalam kasus umum, apakah suatu program akan berhenti atau tidak.

Seperti yang dijelaskan di bagian transisi state, solusi kami bekerja dengan mengharuskan transaksi untuk menetapkan jumlah maksimum langkah komputasi yang diperbolehkan, dan jika eksekusi memerlukan waktu yang lebih lama, komputasi akan dikembalikan tetapi biaya tetap dibayarkan. Pesan bekerja dalam cara yang sama. Untuk menunjukkan motivasi di balik solusi kami, pertimbangkan contoh-contoh berikut ini:

- Seorang penyerang membuat sebuah kontrak yang menjalankan sebuah perulangan tak terbatas, dan kemudian mengirimkan sebuah transaksi yang mengaktifkan perulangan tersebut kepada penambang. Penambang akan memproses transaksi, menjalankan infinite loop, dan menunggu sampai kehabisan gas. Meskipun eksekusi kehabisan tenaga dan berhenti di tengah jalan, transaksi masih sah dan penambang masih mengklaim biaya dari penyerang untuk setiap langkah komputasi.
- Seorang penyerang membuat sebuah perulangan tak terbatas yang sangat panjang dengan tujuan memaksa penambang untuk terus melakukan komputasi dalam waktu yang sangat lama sehingga pada saat komputasi selesai, beberapa blok sudah keluar dan tidak memungkinkan bagi penambang untuk menyertakan transaksi untuk mendapatkan upah. Namun, penyerang akan diminta untuk mengirimkan nilai untuk `STARTGAS` yang membatasi jumlah langkah komputasi yang dapat diambil oleh eksekusi, sehingga penambang akan tahu sebelumnya bahwa komputasi akan memerlukan jumlah langkah yang sangat besar.
- Seorang penyerang melihat kontrak dengan kode dalam bentuk seperti `send(A,contract.storage[A]); contract.storage[A] = 0`, dan mengirimkan transaksi dengan cukup gas hanya untuk menjalankan langkah pertama namun tidak yang kedua (yaitu, membuat penarikan tetapi tidak membiarkan saldo berkurang). Penulis kontrak tidak perlu khawatir untuk melindungi diri dari serangan seperti itu, karena jika eksekusi berhenti di tengah jalan, perubahan akan dikembalikan.
- Kontrak keuangan bekerja dengan mengambil median dari sembilan umpan data eksklusif untuk meminimalkan risiko. Seorang penyerang mengambil alih salah satu umpan data, yang didesain untuk dapat dimodifikasi melalui mekanisme panggilan-alamat-variabel yang dijelaskan pada bagian tentang DAO, dan mengubahnya untuk menjalankan sebuah putaran yang tidak terbatas, dengan demikian mencoba untuk memaksa setiap usaha untuk mengklaim dana dari kontrak keuangan untuk menghabiskan gas. Namun, kontrak keuangan dapat menetapkan batas gas pada pesan untuk mencegah masalah ini.

Alternatif kelengkapan-Turing adalah ketidaklengkapan Turing, di mana `JUMP` dan `JUMPI` tidak ada, dan hanya satu salinan dari setiap kontrak yang diizinkan ada dalam stack panggilan pada satu waktu tertentu. Dengan sistem ini, sistem biaya yang dijelaskan dan ketidakpastian seputar keefektifan solusi kami mungkin tidak diperlukan, karena biaya pelaksanaan kontrak akan terbatas ke atas oleh ukurannya. Selain itu, ketidaklengkapan Turing bahkan tidak terlalu menjadi batasan; dari semua contoh kontrak yang kami buat secara internal, sejauh ini hanya satu yang membutuhkan pengulangan, dan bahkan pengulangan tersebut dapat dihilangkan dengan membuat 26 pengulangan sepotong kode satu baris. Mengingat implikasi serius dari kelengkapan-Turing, dan manfaatnya yang terbatas, mengapa tidak memiliki bahasa ketidaklengkapan Turing? Namun pada kenyataannya, ketidaklengkapan Turing masih jauh dari solusi yang tepat untuk masalah ini. Untuk mengetahui alasannya, simaklah kontrak-kontrak berikut ini:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (jalankan satu langkah dari program dan catat perubahannya di penyimpanan)
```

Sekarang, kirimkan transaksi ke A. Dengan demikian, dalam 51 transaksi, kita memiliki kontrak yang memerlukan 2<sup>50</sup> langkah komputasi. Para penambang dapat mencoba untuk mendeteksi bom logika seperti itu sebelumnya dengan mempertahankan sebuah nilai di samping setiap kontrak yang menentukan jumlah maksimum langkah komputasi yang dapat dilakukan, dan menghitungnya untuk kontrak yang memanggil kontrak lain secara rekursif, tetapi hal tersebut akan mengharuskan para penambang untuk melarang kontrak yang membuat kontrak lain (karena pembuatan dan eksekusi ke-26 kontrak di atas dapat dengan mudah digabungkan ke dalam satu kontrak). Hal lain yang menjadi masalah adalah bidang alamat dari sebuah pesan merupakan sebuah variabel, sehingga pada umumnya tidak mungkin untuk mengetahui kontrak mana yang akan dipanggil oleh kontrak tertentu sebelumnya. Oleh karena itu, secara keseluruhan, kami memiliki kesimpulan yang mengejutkan: Kelengkapan-Turing ternyata mudah dikelola, dan kurangnya kelengkapan Turing juga sama sulitnya untuk dikelola kecuali jika ada kontrol yang sama persis - tetapi dalam hal ini mengapa tidak membiarkan menjadi protokol lengkap Turing?

### Mata Uang dan Penerbitan {#currency-and-issuance}

Jaringan Ethereum memiliki mata uang bawaannya sendiri, ether, yang memiliki tujuan ganda, yaitu menyediakan lapisan likuiditas utama untuk memungkinkan pertukaran yang efisien antara berbagai jenis aset digital dan, yang lebih penting lagi, menyediakan mekanisme pembayaran biaya transaksi. Untuk kenyamanan dan menghindari perdebatan di masa depan (seperti perdebatan mBTC/uBTC/satoshi saat ini dalam Bitcoin), denominasi akan diberi label sebelumnya:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Ini seharusnya dianggap sebagai versi yang diperluas dari konsep "dollars" dan "cents" atau "BTC" dan "satoshi". Di masa depan yang dekat, kami mengharapkan "ether" digunakan untuk transaksi biasa, "finney" untuk mikrotransaksi, dan "szabo" serta "wei" untuk diskusi teknis mengenai biaya dan implementasi protokol; denominasi yang tersisa mungkin akan berguna nanti dan tidak seharusnya disertakan dalam klien saat ini.

Model penerbitan akan seperti berikut:

- Ether akan dirilis melalui penjualan mata uang dengan harga 1000-2000 ether per BTC, mekanisme yang dimaksudkan untuk mendanai organisasi Ethereum dan membiayai pengembangan yang telah berhasil digunakan oleh platform lain seperti Mastercoin dan NXT. Pembeli yang lebih awal akan mendapatkan diskon yang lebih besar. BTC yang diterima dari penjualan akan digunakan sepenuhnya untuk membayar gaji dan imbalan kepada pengembang serta diinvestasikan dalam berbagai proyek berorientasi profit dan nirlaba dalam ekosistem Ethereum dan mata uang kripto.
- Sejumlah 0,099x jumlah total yang dijual (60102216 ETH) akan dialokasikan kepada organisasi untuk mengganti kontributor awal dan membayar biaya yang dinyatakan dalam ETH sebelum blok genesis.
- Sejumlah 0,099x jumlah total yang dijual akan dijaga sebagai cadangan jangka panjang.
- Sejumlah 0,26x jumlah total yang dijual akan dialokasikan kepada para penambang setiap tahun selamanya setelah titik tersebut.

| Kelompok                                 | Saat peluncuran | Setelah 1 tahun | Setelah 5 tahun |
| ---------------------------------------- | --------------- | --------------- | --------------- |
| Unit mata uang                           | 1,198X          | 1,458X          | 2,498X          |
| Pembeli                                  | 83,5%           | 68,6%           | 40,0%           |
| Dana cadangan terpakai sebelum penjualan | 8,26%           | 6,79%           | 3,96%           |
| Dana cadangan terpakai setelah penjualan | 8,26%           | 6,79%           | 3,96%           |
| Penambang                                | 0%              | 17,8%           | 52,0%           |

#### Tingkat Pertumbuhan Pasokan Jangka Panjang (persen)

![Inflasi Ethereum](./ethereum-inflation.png)

_Meskipun penerbitan mata uang bersifat linear, sama seperti pada Bitcoin seiring waktu laju pertumbuhan pasokan cenderung mendekati nol._

Dua pilihan utama dalam model di atas adalah (1) keberadaan dan besarnya kolam dana warisan, dan (2) keberadaan pasokan linear yang terus tumbuh secara permanen, berbeda dengan pasokan yang terbatas seperti pada Bitcoin. Justifikasi dari pool dana warisan adalah sebagai berikut. Jika kolam dana warisan tidak ada, dan penerbitan linear berkurang menjadi 0,217x untuk memberikan tingkat inflasi yang sama, maka jumlah total ether akan berkurang sebesar 16,5% dan setiap unit akan menjadi lebih berharga sebesar 19,8%. Oleh karena itu, dalam keseimbangan, 19,8% lebih banyak ether akan dibeli dalam penjualan, sehingga setiap unit akan kembali memiliki nilai yang sama seperti sebelumnya. Organisasi juga akan memiliki 1,198x lebih banyak BTC, yang dapat dianggap terbagi menjadi dua bagian: BTC asli, dan tambahan 0,198x. Oleh karena itu, situasi ini _benar-benar setara_ dengan dana warisan, tetapi dengan satu perbedaan penting: organisasi hanya memiliki BTC, sehingga tidak diincentivasi untuk mendukung nilai unit ether.

Model pertumbuhan pasokan linear permanen mengurangi risiko yang dilihat oleh beberapa orang sebagai konsentrasi kekayaan yang berlebihan dalam Bitcoin, dan memberikan kesempatan yang adil bagi individu yang hidup dalam era sekarang dan masa depan untuk mengakuisisi unit mata uang, sambil tetap mempertahankan insentif kuat untuk mendapatkan dan menyimpan ether karena "laju pertumbuhan pasokan" sebagai persentase masih cenderung mendekati nol seiring waktu. Kami juga berhipotesis bahwa karena koin selalu hilang seiring waktu karena kelalaian, kematian, dll, dan kehilangan koin dapat dimodelkan sebagai persentase dari total pasokan per tahun, maka total pasokan mata uang yang beredar pada kenyataannya akan akhirnya stabil pada nilai yang sama dengan penerbitan tahunan dibagi dengan tingkat kerugian (misalnya, dengan tingkat kerugian sebesar 1%, begitu pasokan mencapai 26X maka 0,26X akan ditambang dan 0,26X hilang setiap tahun, menciptakan keseimbangan).

Perlu dicatat bahwa di masa depan, kemungkinan Ethereum akan beralih ke model bukti taruhan untuk keamanan, mengurangi kebutuhan penerbitan menjadi antara nol dan 0,05X per tahun. Jika organisasi Ethereum kehilangan pendanaan atau menghilang karena alasan lain, kami membuka "kontrak sosial": siapa pun memiliki hak untuk menciptakan versi calon Ethereum di masa depan, dengan satu-satunya syarat adalah bahwa kuantitas ether harus paling banyak sama dengan `60102216 * (1,198 + 0,26 * n)` di mana `n` adalah jumlah tahun setelah blok genesis. Pencipta bebas untuk menjual secara kolektif atau dengan cara lain mengalokasikan sebagian atau seluruh perbedaan antara ekspansi pasokan yang didorong oleh PoS dan ekspansi pasokan maksimum yang diizinkan untuk membayar pengembangan. Pembaruan calon yang tidak mematuhi kontrak sosial dengan wajar dapat di-fork menjadi versi yang sesuai.

### Sentralisasi Menambang {#mining-centralization}

Algoritma menambang Bitcoin bekerja dengan cara membuat para penambang menghitung SHA256 pada versi yang sedikit dimodifikasi dari blok header berulang kali, hingga akhirnya satu simpul menemukan versi yang memiliki hash lebih kecil dari target (saat ini sekitar 2<sup>192</sup>). Namun, algoritma menambang ini rentan terhadap dua bentuk sentralisasi. Pertama, ekosistem menambang telah didominasi oleh ASIC (sirkuit terintegrasi khusus aplikasi), chip komputer yang dirancang, dan oleh karena itu ribuan kali lebih efisien dalam tugas spesifik menambang Bitcoin. Ini berarti bahwa menambang Bitcoin tidak lagi merupakan usaha yang sangat terdesentralisasi dan egaliter, tetapi memerlukan jutaan dolar modal untuk berpartisipasi secara efektif. Kedua, sebagian besar menambang Bitcoin sebenarnya tidak melakukan validasi blok secara lokal; sebaliknya, mereka mengandalkan pool menambang terpusat untuk menyediakan header blok. Masalah ini mungkin lebih buruk: pada saat penulisan ini, tiga pool penambangan teratas secara tidak langsung mengendalikan sekitar 50% daya pemrosesan dalam jaringan Bitcoin, meskipun hal ini dikurangi oleh kenyataan bahwa para penambang dapat beralih ke pool menambang lain jika sebuah pool atau koalisi mencoba serangan 51%.

Niat saat ini di Ethereum adalah menggunakan algoritma menambang di mana para penambang diharuskan untuk mengambil data acak dari status, menghitung beberapa transaksi yang dipilih secara acak dari blok-blok terakhir N dalam rantai blok, dan mengembalikan hash dari hasilnya. Ini memiliki dua manfaat penting. Pertama, kontrak Ethereum dapat mencakup berbagai jenis komputasi, sehingga ASIC Ethereum pada dasarnya akan menjadi ASIC untuk komputasi umum - yaitu, CPU yang lebih baik. Kedua, menambang memerlukan akses ke seluruh rantai blok, memaksa para penambang untuk menyimpan seluruh rantai blok dan setidaknya mampu memverifikasi setiap transaksi. Ini menghilangkan kebutuhan akan pool penambangan terpusat; meskipun pool menambang masih dapat berperan dalam meratakan ketidakpastian distribusi imbalan, fungsi ini juga dapat dijalankan dengan baik oleh pool peer-to-peer tanpa kendali pusat.

Model ini belum diuji, dan mungkin akan ada kesulitan dalam menghindari beberapa optimisasi cerdik saat menggunakan eksekusi kontrak sebagai algoritma menambang. Namun, satu fitur yang menarik dari algoritma ini adalah bahwa ia memungkinkan siapa pun untuk "meracuni sumur", dengan memperkenalkan sejumlah besar kontrak ke dalam rantai blok yang secara khusus dirancang untuk menghalangi beberapa ASIC. Insentif ekonomi ada bagi produsen ASIC untuk menggunakan trik semacam itu untuk saling menyerang. Oleh karena itu, solusi yang kami kembangkan pada akhirnya adalah solusi manusia ekonomi yang adaptif daripada hanya solusi teknis semata.

### Skalabilitas {#scalability}

Salah satu perhatian umum terkait Ethereum adalah masalah skalabilitasnya. Seperti Bitcoin, Ethereum juga memiliki kelemahan di mana setiap transaksi harus diproses oleh setiap simpul dalam jaringan. Dengan Bitcoin, ukuran rantai blok saat ini berada di sekitar 15 GB, bertambah sekitar 1 MB per jam. Jika jaringan Bitcoin harus memproses 2000 transaksi per detik seperti Visa, maka ukurannya akan bertambah 1 MB setiap tiga detik (1 GB per jam, 8 TB per tahun). Ethereum berpotensi mengalami pola pertumbuhan serupa, meskipun situasinya mungkin lebih rumit karena ada banyak aplikasi yang menggunakan rantai blok Ethereum dibandingkan dengan Bitcoin yang hanya berfungsi sebagai mata uang. Namun, keadaan ini bisa diperbaiki oleh kenyataan bahwa simpul penuh Ethereum hanya perlu menyimpan status daripada seluruh sejarah rantai blok.

Masalah dari ukuran rantai blok sangat besar seperti ini adalah risiko sentralisasi. Jika ukuran rantai blok meningkat menjadi, katakanlah, 100 TB, maka kemungkinan skenarionya adalah hanya sejumlah kecil bisnis besar yang akan menjalankan simpul penuh, sementara semua pengguna biasa akan menggunakan simpul SPV ringan. Dalam situasi tersebut, muncul kekhawatiran potensial bahwa simpul penuh dapat bersatu dan setuju untuk melakukan penipuan dalam beberapa cara yang menguntungkan (misalnya, mengubah imbalan blok, memberi diri mereka sendiri BTC). Simpul-ringan tidak memiliki cara untuk mendeteksi hal ini secara langsung. Tentu saja, setidaknya satu simpul penuh yang jujur kemungkinan akan ada, dan setelah beberapa jam informasi tentang penipuan akan tersebar melalui saluran seperti Reddit. Namun, pada saat itu sudah terlambat: akan menjadi tanggung jawab pengguna biasa untuk mengatur upaya untuk memasukkan blok-blok yang diberikan ke dalam daftar hitam, masalah koordinasi yang besar dan kemungkinan sulit diselesaikan dalam skala yang serupa seperti suksesnya serangan 51%. Dalam kasus Bitcoin, saat ini adalah masalah, tetapi ada modifikasi rantai blok yang [disarankan oleh Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) yang akan meredakan masalah ini.

Dalam jangka pendek, Ethereum akan menggunakan dua strategi tambahan untuk mengatasi masalah ini. Pertama, karena algoritma menambang berbasis rantai blok, setidaknya setiap penambang akan dipaksa menjadi simpul penuh, menciptakan batas bawah pada jumlah simpul penuh. Kedua, dan yang lebih penting, kami akan menyertakan akar pohon keadaan perantara dalam rantai blok setelah memproses setiap transaksi. Meskipun validasi blok terpusat, selama ada satu simpul verifikasi yang jujur, masalah sentralisasi dapat diatasi melalui protokol verifikasi. Jika seorang penambang memublikasikan blok yang tidak valid, blok tersebut entah berformat buruk atau keadaan `S[n]` tidak benar. Karena `S[0]` diketahui benar, maka harus ada keadaan pertama `S[i]` yang tidak benar, di mana `S[i-1]` adalah benar. Simpul yang melakukan verifikasi akan menyediakan indeks `i`, beserta "bukti ketidakvalidan" yang terdiri dari subset simpul pohon Patricia yang diperlukan untuk memproses `APPLY(S[i-1],TX[i]) -> S[i]`. Simpul-simpul tersebut akan dapat menggunakan simpul-simpul tersebut untuk menjalankan bagian komputasi tersebut, dan melihat bahwa `S[i]` yang dihasilkan tidak sesuai dengan `S[i]` yang diberikan.

Serangan lain yang lebih canggih melibatkan penambang jahat yang mempublikasikan blok yang tidak lengkap, sehingga informasi lengkap bahkan tidak ada untuk menentukan apakah blok-blok tersebut valid atau tidak. Solusi untuk ini adalah protokol tantangan-respons: simpul verifikasi mengeluarkan "tantangan" dalam bentuk indeks transaksi target, dan saat menerima sebuah blok, simpul ringan memperlakukan blok tersebut sebagai tidak dapat dipercaya hingga simpul lain, baik penambang atau verifikator lainnya, memberikan sebagian simpul Patricia sebagai bukti validitas.

## Kesimpulan {#conclusion}

Protokol Ethereum awalnya diusulkan sebagai versi yang ditingkatkan dari mata uang kripto, yang menyediakan fitur-fitur canggih seperti escrow di rantai blok, batas penarikan, kontrak keuangan, pasar perjudian, dan sejenisnya melalui bahasa pemrograman yang sangat umum. Protokol Ethereum tidak secara langsung "mendukung" aplikasi mana pun, tetapi adanya bahasa pemrograman yang Turing lengkap berarti bahwa kontrak sembarang dapat teoretis dibuat untuk jenis transaksi atau aplikasi apa pun. Namun, hal yang lebih menarik tentang Ethereum adalah bahwa protokol Ethereum jauh melampaui sekadar sistem mata uang. Protokol seputar penyimpanan berkas terdesentralisasi, komputasi terdesentralisasi, dan pasar prediksi terdesentralisasi, di antara puluhan konsep lainnya, berpotensi meningkatkan efisiensi industri komputasi secara signifikan, serta memberikan dorongan besar kepada protokol peer-to-peer lainnya dengan menambahkan lapisan ekonomi untuk pertama kalinya. Terakhir, ada juga berbagai aplikasi yang sama sekali tidak berhubungan dengan uang.

Konsep dari fungsi transisi keadaan sembarang yang diimplementasikan oleh protokol Ethereum memberikan potensi platform yang unik; daripada menjadi protokol tertutup dengan tujuan tunggal yang dimaksudkan untuk sejumlah aplikasi tertentu dalam penyimpanan data, perjudian, atau keuangan, Ethereum dirancang sebagai protokol terbuka, dan kami percaya bahwa ia sangat cocok untuk menjadi lapisan dasar untuk sejumlah besar protokol finansial dan non-finansial dalam beberapa tahun mendatang.

## Catatan dan Bacaan Lebih Lanjut {#notes-and-further-reading}

### Catatan {#notes}

1. Seorang pembaca yang berpengalaman mungkin akan memperhatikan bahwa sebenarnya alamat Bitcoin adalah hash dari kunci publik kurva eliptik, bukan kunci publik itu sendiri. Namun, sebenarnya adalah istilah kriptografi yang sah untuk merujuk pada pubkey hash sebagai kunci publik itu sendiri. Hal ini karena kriptografi Bitcoin dapat dianggap sebagai algoritma tanda tangan digital khusus, di mana kunci publik terdiri dari hash dari ECC pubkey, tanda tangan terdiri dari ECC pubkey yang digabungkan dengan tanda tangan ECC, dan algoritma verifikasi melibatkan pemeriksaan ECC pubkey dalam tanda tangan terhadap hash ECC pubkey yang diberikan sebagai kunci publik, dan kemudian memverifikasi tanda tangan ECC terhadap ECC pubkey.
2. Secara teknis, rata-rata dari 11 blok sebelumnya.
3. Secara internal, angka 2 dan "CHARLIE" keduanya merupakan angka<sup>[fn3](#notes)</sup>, dengan yang terakhir Big-endian dalam representasi basis 256 berurutan. Angka dapat setidaknya 0 dan paling banyak 2<sup>256</sup>-1.

### Bacaan Lebih Lanjut {#further-reading}

1. [Nilai intrinsik](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)
2. [Properti pintar](https://en.bitcoin.it/wiki/Smart_Property)
3. [Kontrak pintar](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Bukti kerja yang dapat digunakan kembali](https://nakamotoinstitute.org/finney/rpow/)
6. [Mengamankan hak properti dengan otoritas pemilik](https://nakamotoinstitute.org/secure-property-titles/)
7. [Laporan resmi Bitcoin](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Segitiga Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Kertas putih koin berwarna](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Kertas putih Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Perusahaan otonom terdesentralisasi, Majalah Bitcoin](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Verifikasi pembayaran yang disederhanakan](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Pohon Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Pohon Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ dan Agen Otonom, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn tentang Properti Pintar pada Festival Turing](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [RLP Ethereum](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)
20. [Pohon Merkle Patricia Ethereum](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)
21. [Peter Todd tentang pohon jumlah Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Untuk riwayat kertas putih, lihat [wiki ini](https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_Ethereum, seperti kebanyakan proyek perangkat lunak sumber terbuka yang digerakkan oleh komunitas, telah berkembang sejak peluncuran pertamanya. Untuk mempelajari tentang pengembangan Ethereum terkini, dan bagaimana perubahan protokol dibuat, kami menyarankan [panduan ini](/learn/)._
