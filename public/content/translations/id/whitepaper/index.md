---
title: Buku Putih Ethereum
description: Makalah pengantar untuk Ethereum, diterbitkan pada tahun 2013 sebelum peluncurannya.
lang: id
sidebarDepth: 2
hideEditButton: true
authors: ["Vitalik Buterin"]
---

<WhitepaperBridge />

_Meskipun sudah berusia beberapa tahun, kami mempertahankan makalah asli di bawah ini karena makalah ini terus berfungsi sebagai referensi yang berguna dan representasi akurat dari [Ethereum](/) serta visinya._

## Platform Kontrak Pintar dan Aplikasi Terdesentralisasi Generasi Berikutnya {#a-next-generation-smart-contract-and-decentralized-application-platform}

Pengembangan Bitcoin oleh Satoshi Nakamoto pada tahun 2009 sering dipuji sebagai perkembangan radikal dalam uang dan mata uang, menjadi contoh pertama dari aset digital yang secara bersamaan tidak memiliki dukungan atau "[nilai intrinsik](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" dan tidak memiliki penerbit atau pengendali terpusat. Namun, bagian lain dari eksperimen Bitcoin yang bisa dibilang lebih penting adalah teknologi rantai blok yang mendasarinya sebagai alat konsensus terdistribusi, dan perhatian mulai beralih dengan cepat ke aspek lain dari Bitcoin ini. Aplikasi alternatif dari teknologi rantai blok yang sering dikutip meliputi penggunaan aset digital di rantai blok untuk mewakili mata uang kustom dan instrumen keuangan ("[koin berwarna](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), kepemilikan perangkat fisik yang mendasarinya ("[properti pintar](https://en.bitcoin.it/wiki/Smart_Property)"), aset yang tidak dapat dipertukarkan seperti nama domain ("[Namecoin](http://namecoin.org)"), serta aplikasi yang lebih kompleks yang melibatkan aset digital yang dikendalikan secara langsung oleh sepotong kode yang mengimplementasikan aturan arbitrer ("[kontrak pintar](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") atau bahkan "[organisasi otonom terdesentralisasi](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO) berbasis rantai blok. Apa yang ingin disediakan oleh Ethereum adalah rantai blok dengan bahasa pemrograman Turing-complete bawaan yang sepenuhnya matang, yang dapat digunakan untuk membuat "kontrak" yang dapat digunakan untuk menyandikan fungsi transisi state arbitrer, memungkinkan pengguna untuk membuat sistem apa pun yang dijelaskan di atas, serta banyak sistem lain yang belum kita bayangkan, hanya dengan menuliskan logikanya dalam beberapa baris kode.

## Pengantar Bitcoin dan Konsep yang Ada {#introduction-to-bitcoin-and-existing-concepts}

### Sejarah {#history}

Konsep mata uang digital terdesentralisasi, serta aplikasi alternatif seperti pendaftaran properti, telah ada selama beberapa dekade. Protokol e-cash anonim pada tahun 1980-an dan 1990-an, yang sebagian besar bergantung pada primitif kriptografi yang dikenal sebagai Chaumian blinding, menyediakan mata uang dengan tingkat privasi yang tinggi, tetapi protokol tersebut sebagian besar gagal mendapatkan daya tarik karena ketergantungannya pada perantara terpusat. Pada tahun 1998, [b-money](http://www.weidai.com/bmoney.txt) dari Wei Dai menjadi proposal pertama yang memperkenalkan ide penciptaan uang melalui pemecahan teka-teki komputasi serta konsensus terdesentralisasi, tetapi proposal tersebut kurang merinci tentang bagaimana konsensus terdesentralisasi dapat benar-benar diimplementasikan. Pada tahun 2005, Hal Finney memperkenalkan konsep "[bukti kerja yang dapat digunakan kembali](https://nakamotoinstitute.org/finney/rpow/)", sebuah sistem yang menggunakan ide-ide dari b-money bersama dengan teka-teki Hashcash yang sulit secara komputasi dari Adam Back untuk menciptakan konsep mata uang kripto, tetapi sekali lagi gagal mencapai ideal karena bergantung pada komputasi tepercaya sebagai backend. Pada tahun 2009, mata uang terdesentralisasi untuk pertama kalinya diimplementasikan dalam praktiknya oleh Satoshi Nakamoto, menggabungkan primitif yang sudah mapan untuk mengelola kepemilikan melalui kriptografi kunci publik dengan algoritma konsensus untuk melacak siapa yang memiliki koin, yang dikenal sebagai "Bukti Kerja (PoW)".

Mekanisme di balik Bukti Kerja (PoW) adalah sebuah terobosan di ruang ini karena secara bersamaan memecahkan dua masalah. Pertama, ini menyediakan algoritma konsensus yang sederhana dan cukup efektif, memungkinkan node dalam jaringan untuk secara kolektif menyetujui serangkaian pembaruan kanonikal pada state buku besar Bitcoin. Kedua, ini menyediakan mekanisme untuk memungkinkan masuk secara bebas ke dalam proses konsensus, memecahkan masalah politik dalam memutuskan siapa yang dapat memengaruhi konsensus, sekaligus mencegah serangan sybil. Ini dilakukan dengan mengganti hambatan formal untuk berpartisipasi, seperti persyaratan untuk terdaftar sebagai entitas unik pada daftar tertentu, dengan hambatan ekonomi - bobot satu node dalam proses pemungutan suara konsensus berbanding lurus dengan daya komputasi yang dibawa oleh node tersebut. Sejak saat itu, pendekatan alternatif telah diusulkan yang disebut _Bukti Kepemilikan (PoS)_, yang menghitung bobot sebuah node sebanding dengan kepemilikan mata uangnya dan bukan sumber daya komputasi; diskusi tentang manfaat relatif dari kedua pendekatan tersebut berada di luar cakupan buku putih ini, tetapi perlu dicatat bahwa kedua pendekatan tersebut dapat digunakan untuk berfungsi sebagai tulang punggung mata uang kripto.

### Bitcoin Sebagai Sistem Transisi State {#bitcoin-as-a-state-transition-system}

![Ethereum state transition](./ethereum-state-transition.png)

Dari sudut pandang teknis, buku besar mata uang kripto seperti Bitcoin dapat dianggap sebagai sistem transisi state, di mana terdapat "state" yang terdiri dari status kepemilikan semua bitcoin yang ada dan "fungsi transisi state" yang mengambil state dan transaksi lalu menghasilkan state baru sebagai hasilnya. Dalam sistem perbankan standar, misalnya, state adalah neraca, transaksi adalah permintaan untuk memindahkan $X dari A ke B, dan fungsi transisi state mengurangi nilai di akun A sebesar $X dan meningkatkan nilai di akun B sebesar $X. Jika akun A memiliki kurang dari $X sejak awal, fungsi transisi state akan mengembalikan kesalahan. Oleh karena itu, seseorang dapat mendefinisikannya secara formal:

```
APPLY(S,TX) -> S' or ERROR
```

Dalam sistem perbankan yang didefinisikan di atas:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Tetapi:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

"State" dalam Bitcoin adalah kumpulan semua koin (secara teknis, "output transaksi yang belum dibelanjakan" atau UTXO) yang telah dicetak dan belum dibelanjakan, dengan setiap UTXO memiliki denominasi dan pemilik (didefinisikan oleh alamat 20-byte yang pada dasarnya adalah kunci publik kriptografi<sup>[fn1](#notes)</sup>). Sebuah transaksi berisi satu atau lebih input, dengan setiap input berisi referensi ke UTXO yang ada dan tanda tangan kriptografi yang dihasilkan oleh kunci privat yang terkait dengan alamat pemilik, dan satu atau lebih output, dengan setiap output berisi UTXO baru untuk ditambahkan ke state.

Fungsi transisi state `APPLY(S,TX) -> S'` dapat didefinisikan secara kasar sebagai berikut:

<ol>
  <li>
    Untuk setiap input dalam <code>TX</code>:
    <ul>
    <li>
        Jika UTXO yang direferensikan tidak ada dalam <code>S</code>, kembalikan kesalahan.
    </li>
    <li>
        Jika tanda tangan yang diberikan tidak cocok dengan pemilik UTXO, kembalikan kesalahan.
    </li>
    </ul>
  </li>
  <li>
    Jika jumlah denominasi dari semua UTXO input kurang dari jumlah denominasi dari semua UTXO output, kembalikan kesalahan.
  </li>
  <li>
    Kembalikan <code>S</code> dengan semua UTXO input dihapus dan semua UTXO output ditambahkan.
  </li>
</ol>

Bagian pertama dari langkah pertama mencegah pengirim transaksi membelanjakan koin yang tidak ada, bagian kedua dari langkah pertama mencegah pengirim transaksi membelanjakan koin orang lain, dan langkah kedua menegakkan pelestarian nilai. Untuk menggunakan ini sebagai pembayaran, protokolnya adalah sebagai berikut. Misalkan Alice ingin mengirim 11.7 BTC ke Bob. Pertama, Alice akan mencari sekumpulan UTXO tersedia yang dimilikinya yang berjumlah setidaknya 11.7 BTC. Secara realistis, Alice tidak akan bisa mendapatkan tepat 11.7 BTC; katakanlah jumlah terkecil yang bisa dia dapatkan adalah 6+4+2=12. Dia kemudian membuat transaksi dengan tiga input dan dua output tersebut. Output pertama akan menjadi 11.7 BTC dengan alamat Bob sebagai pemiliknya, dan output kedua akan menjadi sisa 0.3 BTC "kembalian", dengan pemiliknya adalah Alice sendiri.

### Penambangan {#mining}

![Ethereum blocks](./ethereum-blocks.png)

Jika kita memiliki akses ke layanan terpusat yang dapat dipercaya, sistem ini akan sangat mudah diimplementasikan; ini bisa dikodekan persis seperti yang dijelaskan, menggunakan hard drive server terpusat untuk melacak state. Namun, dengan Bitcoin kita mencoba membangun sistem mata uang terdesentralisasi, jadi kita perlu menggabungkan sistem transaksi state dengan sistem konsensus untuk memastikan bahwa semua orang menyetujui urutan transaksi. Proses konsensus terdesentralisasi Bitcoin mewajibkan node dalam jaringan untuk terus berupaya menghasilkan paket transaksi yang disebut "blok". Jaringan ini dimaksudkan untuk menghasilkan kira-kira satu blok setiap sepuluh menit, dengan setiap blok berisi stempel waktu, nonce, referensi ke (yaitu, hash dari) blok sebelumnya dan daftar semua transaksi yang telah terjadi sejak blok sebelumnya. Seiring waktu, ini menciptakan "rantai blok" yang persisten dan terus berkembang yang secara konstan diperbarui untuk mewakili state terbaru dari buku besar Bitcoin.

Algoritma untuk memeriksa apakah sebuah blok valid, yang diekspresikan dalam paradigma ini, adalah sebagai berikut:

1. Periksa apakah blok sebelumnya yang direferensikan oleh blok tersebut ada dan valid.
2. Periksa bahwa stempel waktu blok lebih besar dari blok sebelumnya<sup>[fn2](#notes)</sup> dan kurang dari 2 jam di masa depan
3. Periksa bahwa Bukti Kerja (PoW) pada blok tersebut valid.
4. Misalkan `S[0]` adalah state di akhir blok sebelumnya.
5. Misalkan `TX` adalah daftar transaksi blok dengan `n` transaksi. Untuk semua `i` dalam `0...n-1`, tetapkan `S[i+1] = APPLY(S[i],TX[i])` Jika ada aplikasi yang mengembalikan kesalahan, keluar dan kembalikan false.
6. Kembalikan true, dan daftarkan `S[n]` sebagai state di akhir blok ini.

Pada dasarnya, setiap transaksi dalam blok harus menyediakan transisi state yang valid dari apa yang merupakan state kanonikal sebelum transaksi dieksekusi ke beberapa state baru. Perhatikan bahwa state tidak dikodekan dalam blok dengan cara apa pun; ini murni sebuah abstraksi untuk diingat oleh node yang memvalidasi dan hanya dapat dihitung (secara aman) untuk blok mana pun dengan memulai dari state genesis dan secara berurutan menerapkan setiap transaksi di setiap blok. Selain itu, perhatikan bahwa urutan penambang memasukkan transaksi ke dalam blok itu penting; jika ada dua transaksi A dan B dalam sebuah blok sedemikian rupa sehingga B membelanjakan UTXO yang dibuat oleh A, maka blok tersebut akan valid jika A mendahului B, tetapi tidak sebaliknya.

Satu kondisi validitas yang ada dalam daftar di atas yang tidak ditemukan dalam sistem lain adalah persyaratan untuk "Bukti Kerja (PoW)". Kondisi tepatnya adalah bahwa hash SHA-256 ganda dari setiap blok, yang diperlakukan sebagai angka 256-bit, harus kurang dari target yang disesuaikan secara dinamis, yang pada saat penulisan ini adalah sekitar 2<sup>187</sup>. Tujuan dari ini adalah untuk membuat pembuatan blok menjadi "sulit" secara komputasi, sehingga mencegah penyerang sybil membuat ulang seluruh rantai blok untuk keuntungan mereka. Karena SHA-256 dirancang untuk menjadi fungsi pseudo-acak yang sama sekali tidak dapat diprediksi, satu-satunya cara untuk membuat blok yang valid hanyalah dengan coba-coba, berulang kali menambah nonce dan melihat apakah hash baru tersebut cocok.

Pada target saat ini yaitu ~2<sup>187</sup>, jaringan harus melakukan rata-rata ~2<sup>69</sup> percobaan sebelum blok yang valid ditemukan; secara umum, target dikalibrasi ulang oleh jaringan setiap 2016 blok sehingga rata-rata blok baru dihasilkan oleh beberapa node dalam jaringan setiap sepuluh menit. Untuk memberikan kompensasi kepada penambang atas pekerjaan komputasi ini, penambang dari setiap blok berhak untuk memasukkan transaksi yang memberikan diri mereka sendiri 25 BTC dari ketiadaan. Selain itu, jika ada transaksi yang memiliki total denominasi lebih tinggi pada inputnya daripada outputnya, selisihnya juga diberikan kepada penambang sebagai "biaya transaksi". Secara kebetulan, ini juga merupakan satu-satunya mekanisme di mana BTC diterbitkan; state genesis tidak berisi koin sama sekali.

Untuk lebih memahami tujuan penambangan, mari kita periksa apa yang terjadi jika ada penyerang yang berniat jahat. Karena kriptografi yang mendasari Bitcoin diketahui aman, penyerang akan menargetkan satu bagian dari sistem Bitcoin yang tidak dilindungi oleh kriptografi secara langsung: urutan transaksi. Strategi penyerang itu sederhana:

1. Kirim 100 BTC ke pedagang dengan imbalan beberapa produk (sebaiknya barang digital dengan pengiriman cepat)
2. Tunggu pengiriman produk
3. Hasilkan transaksi lain yang mengirimkan 100 BTC yang sama ke dirinya sendiri
4. Cobalah untuk meyakinkan jaringan bahwa transaksinya ke dirinya sendiri adalah yang datang lebih dulu.

Setelah langkah (1) terjadi, setelah beberapa menit beberapa penambang akan memasukkan transaksi tersebut ke dalam sebuah blok, katakanlah blok nomor 270000. Setelah sekitar satu jam, lima blok lagi akan ditambahkan ke rantai setelah blok tersebut, dengan masing-masing blok tersebut secara tidak langsung menunjuk ke transaksi dan dengan demikian "mengonfirmasi"-nya. Pada titik ini, pedagang akan menerima pembayaran sebagai difinalisasi dan mengirimkan produk; karena kita berasumsi ini adalah barang digital, pengirimannya instan. Sekarang, penyerang membuat transaksi lain yang mengirimkan 100 BTC ke dirinya sendiri. Jika penyerang hanya merilisnya ke dalam praktik, transaksi tidak akan diproses; penambang akan mencoba menjalankan `APPLY(S,TX)` dan menyadari bahwa `TX` mengonsumsi UTXO yang tidak lagi berada di dalam state. Jadi sebagai gantinya, penyerang membuat "percabangan" dari rantai blok, dimulai dengan menambang versi lain dari blok 270000 yang menunjuk ke blok 269999 yang sama sebagai induk tetapi dengan transaksi baru menggantikan yang lama. Karena data bloknya berbeda, ini mewajibkan pengerjaan ulang Bukti Kerja (PoW). Selain itu, versi baru blok 270000 milik penyerang memiliki hash yang berbeda, sehingga blok asli 270001 hingga 270005 tidak "menunjuk" ke sana; dengan demikian, rantai asli dan rantai baru penyerang benar-benar terpisah. Aturannya adalah bahwa dalam percabangan, rantai blok terpanjang dianggap sebagai kebenaran, dan karenanya penambang yang sah akan bekerja pada rantai 270005 sementara penyerang sendirian bekerja pada rantai 270000. Agar penyerang dapat membuat rantai bloknya menjadi yang terpanjang, ia harus memiliki daya komputasi yang lebih besar daripada gabungan seluruh jaringan untuk mengejar ketertinggalan (karenanya, "serangan 51%").

### Pohon Merkle {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_Kiri: cukup menyajikan hanya sejumlah kecil node dalam pohon Merkle untuk memberikan bukti validitas sebuah cabang._

_Kanan: setiap upaya untuk mengubah bagian mana pun dari pohon Merkle pada akhirnya akan menyebabkan ketidakkonsistenan di suatu tempat di atas rantai._

Fitur skalabilitas penting dari Bitcoin adalah bahwa blok disimpan dalam struktur data multi-level. "Hash" dari sebuah blok sebenarnya hanyalah hash dari header blok, sepotong data sekitar 200-byte yang berisi stempel waktu, nonce, hash blok sebelumnya, dan hash root dari struktur data yang disebut pohon Merkle yang menyimpan semua transaksi di dalam blok. Pohon Merkle adalah jenis pohon biner, yang terdiri dari sekumpulan node dengan sejumlah besar node daun di bagian bawah pohon yang berisi data yang mendasarinya, sekumpulan node perantara di mana setiap node adalah hash dari dua anaknya, dan akhirnya satu node root, juga dibentuk dari hash kedua anaknya, yang mewakili "puncak" pohon. Tujuan dari pohon Merkle adalah untuk memungkinkan data dalam sebuah blok dikirimkan sedikit demi sedikit: sebuah node dapat mengunduh hanya header dari sebuah blok dari satu sumber, sebagian kecil dari pohon yang relevan bagi mereka dari sumber lain, dan tetap yakin bahwa semua data tersebut benar. Alasan mengapa ini berhasil adalah karena hash merambat ke atas: jika pengguna jahat mencoba menukar transaksi palsu ke bagian bawah pohon Merkle, perubahan ini akan menyebabkan perubahan pada node di atasnya, dan kemudian perubahan pada node di atasnya lagi, yang pada akhirnya mengubah root pohon dan karenanya hash dari blok tersebut, menyebabkan protokol mendaftarkannya sebagai blok yang sama sekali berbeda (hampir pasti dengan Bukti Kerja (PoW) yang tidak valid).

Protokol pohon Merkle bisa dibilang sangat penting untuk keberlanjutan jangka panjang. Sebuah "full node" di jaringan Bitcoin, yang menyimpan dan memproses keseluruhan setiap blok, menghabiskan sekitar 15 GB ruang disk di jaringan Bitcoin pada April 2014, dan bertambah lebih dari satu gigabyte per bulan. Saat ini, ini layak untuk beberapa komputer desktop dan bukan ponsel, dan di masa depan hanya bisnis dan penghobi yang dapat berpartisipasi. Protokol yang dikenal sebagai "verifikasi pembayaran yang disederhanakan" (SPV) memungkinkan kelas node lain untuk ada, yang disebut "node ringan", yang mengunduh header blok, memverifikasi Bukti Kerja (PoW) pada header blok, dan kemudian mengunduh hanya "cabang" yang terkait dengan transaksi yang relevan bagi mereka. Ini memungkinkan node ringan untuk menentukan dengan jaminan keamanan yang kuat apa status transaksi Bitcoin mana pun, dan saldo mereka saat ini, sambil mengunduh hanya sebagian kecil dari seluruh rantai blok.

### Aplikasi Rantai Blok Alternatif {#alternative-blockchain-applications}

Gagasan untuk mengambil ide rantai blok yang mendasarinya dan menerapkannya pada konsep lain juga memiliki sejarah panjang. Pada tahun 2005, Nick Szabo muncul dengan konsep "[hak milik properti yang aman dengan otoritas pemilik](https://nakamotoinstitute.org/library/secure-property-titles/)", sebuah dokumen yang menjelaskan bagaimana "kemajuan baru dalam teknologi basis data yang direplikasi" akan memungkinkan sistem berbasis rantai blok untuk menyimpan registri siapa yang memiliki tanah apa, menciptakan kerangka kerja yang rumit termasuk konsep-konsep seperti homesteading, adverse possession, dan pajak tanah Georgia. Namun, sayangnya tidak ada sistem basis data replikasi yang efektif yang tersedia pada saat itu, sehingga protokol tersebut tidak pernah diimplementasikan dalam praktiknya. Namun, setelah tahun 2009, setelah konsensus terdesentralisasi Bitcoin dikembangkan, sejumlah aplikasi alternatif dengan cepat mulai bermunculan.

- **Namecoin** - dibuat pada tahun 2010, [Namecoin](https://namecoin.org/) paling tepat digambarkan sebagai basis data pendaftaran nama yang terdesentralisasi. Dalam protokol terdesentralisasi seperti Tor, Bitcoin, dan BitMessage, perlu ada cara untuk mengidentifikasi akun sehingga orang lain dapat berinteraksi dengan mereka, tetapi dalam semua solusi yang ada, satu-satunya jenis pengidentifikasi yang tersedia adalah hash pseudo-acak seperti `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idealnya, seseorang ingin dapat memiliki akun dengan nama seperti "george". Namun, masalahnya adalah jika satu orang dapat membuat akun bernama "george" maka orang lain dapat menggunakan proses yang sama untuk mendaftarkan "george" untuk diri mereka sendiri juga dan meniru mereka. Satu-satunya solusi adalah paradigma first-to-file, di mana pendaftar pertama berhasil dan yang kedua gagal - masalah yang sangat cocok untuk protokol konsensus Bitcoin. Namecoin adalah implementasi tertua, dan paling sukses, dari sistem pendaftaran nama yang menggunakan ide semacam itu.
- **Koin berwarna (Colored coins)** - tujuan dari [koin berwarna](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) adalah untuk berfungsi sebagai protokol yang memungkinkan orang membuat mata uang digital mereka sendiri - atau, dalam kasus sepele yang penting dari mata uang dengan satu unit, token digital, di rantai blok Bitcoin. Dalam protokol koin berwarna, seseorang "menerbitkan" mata uang baru dengan secara publik menetapkan warna ke UTXO Bitcoin tertentu, dan protokol secara rekursif mendefinisikan warna UTXO lain agar sama dengan warna input yang dibelanjakan oleh transaksi yang membuatnya (beberapa aturan khusus berlaku dalam kasus input warna campuran). Ini memungkinkan pengguna untuk memelihara dompet yang hanya berisi UTXO dengan warna tertentu dan mengirimkannya seperti bitcoin biasa, melacak kembali melalui rantai blok untuk menentukan warna UTXO apa pun yang mereka terima.
- **Metacoin** - ide di balik metacoin adalah memiliki protokol yang hidup di atas Bitcoin, menggunakan transaksi Bitcoin untuk menyimpan transaksi metacoin tetapi memiliki fungsi transisi state yang berbeda, `APPLY'`. Karena protokol metacoin tidak dapat mencegah transaksi metacoin yang tidak valid muncul di rantai blok Bitcoin, sebuah aturan ditambahkan bahwa jika `APPLY'(S,TX)` mengembalikan kesalahan, protokol secara default menjadi `APPLY'(S,TX) = S`. Ini menyediakan mekanisme yang mudah untuk membuat protokol mata uang kripto arbitrer, berpotensi dengan fitur-fitur canggih yang tidak dapat diimplementasikan di dalam Bitcoin itu sendiri, tetapi dengan biaya pengembangan yang sangat rendah karena kompleksitas penambangan dan jaringan sudah ditangani oleh protokol Bitcoin. Metacoin telah digunakan untuk mengimplementasikan beberapa kelas kontrak keuangan, pendaftaran nama, dan pertukaran terdesentralisasi.

Jadi, secara umum, ada dua pendekatan untuk membangun protokol konsensus: membangun jaringan independen, dan membangun protokol di atas Bitcoin. Pendekatan pertama, meskipun cukup berhasil dalam kasus aplikasi seperti Namecoin, sulit untuk diimplementasikan; setiap implementasi individu perlu melakukan bootstrap rantai blok independen, serta membangun dan menguji semua transisi state dan kode jaringan yang diperlukan. Selain itu, kami memprediksi bahwa serangkaian aplikasi untuk teknologi konsensus terdesentralisasi akan mengikuti distribusi hukum pangkat di mana sebagian besar aplikasi akan terlalu kecil untuk menjamin rantai blok mereka sendiri, dan kami mencatat bahwa ada kelas besar aplikasi terdesentralisasi (dapp), khususnya organisasi otonom terdesentralisasi, yang perlu berinteraksi satu sama lain.

Pendekatan berbasis Bitcoin, di sisi lain, memiliki kelemahan yaitu tidak mewarisi fitur verifikasi pembayaran yang disederhanakan dari Bitcoin. SPV berfungsi untuk Bitcoin karena dapat menggunakan kedalaman rantai blok sebagai proksi untuk validitas; pada titik tertentu, setelah leluhur dari sebuah transaksi mundur cukup jauh, aman untuk mengatakan bahwa mereka secara sah merupakan bagian dari state. Meta-protokol berbasis rantai blok, di sisi lain, tidak dapat memaksa rantai blok untuk tidak menyertakan transaksi yang tidak valid dalam konteks protokol mereka sendiri. Oleh karena itu, implementasi meta-protokol SPV yang sepenuhnya aman perlu memindai mundur hingga ke awal rantai blok Bitcoin untuk menentukan apakah transaksi tertentu valid atau tidak. Saat ini, semua implementasi "ringan" dari meta-protokol berbasis Bitcoin bergantung pada server tepercaya untuk menyediakan data, bisa dibilang hasil yang sangat suboptimal terutama ketika salah satu tujuan utama mata uang kripto adalah untuk menghilangkan kebutuhan akan kepercayaan.

### Pembuatan Skrip {#scripting}

Bahkan tanpa ekstensi apa pun, protokol Bitcoin sebenarnya memfasilitasi versi lemah dari konsep "kontrak pintar". UTXO di Bitcoin dapat dimiliki tidak hanya oleh kunci publik, tetapi juga oleh skrip yang lebih rumit yang diekspresikan dalam bahasa pemrograman berbasis tumpukan sederhana. Dalam paradigma ini, transaksi yang membelanjakan UTXO tersebut harus menyediakan data yang memenuhi skrip. Memang, bahkan mekanisme kepemilikan kunci publik dasar diimplementasikan melalui skrip: skrip mengambil tanda tangan kurva eliptik sebagai input, memverifikasinya terhadap transaksi dan alamat yang memiliki UTXO, dan mengembalikan 1 jika verifikasi berhasil dan 0 jika sebaliknya. Skrip lain yang lebih rumit ada untuk berbagai kasus penggunaan tambahan. Misalnya, seseorang dapat membuat skrip yang mewajibkan tanda tangan dari dua dari tiga kunci privat yang diberikan untuk memvalidasi ("multisig"), pengaturan yang berguna untuk akun perusahaan, akun tabungan yang aman, dan beberapa situasi eskro pedagang. Skrip juga dapat digunakan untuk membayar hadiah untuk solusi masalah komputasi, dan seseorang bahkan dapat membuat skrip yang mengatakan sesuatu seperti "UTXO Bitcoin ini milik Anda jika Anda dapat memberikan bukti SPV bahwa Anda mengirim transaksi Dogecoin dengan denominasi ini kepada saya", yang pada dasarnya memungkinkan pertukaran lintas mata uang kripto yang terdesentralisasi.

Namun, bahasa skrip seperti yang diimplementasikan dalam Bitcoin memiliki beberapa batasan penting:

- **Kurangnya kelengkapan Turing (Turing-completeness)** - artinya, meskipun ada sebagian besar komputasi yang didukung oleh bahasa skrip Bitcoin, bahasa ini hampir tidak mendukung semuanya. Kategori utama yang hilang adalah loop (perulangan). Ini dilakukan untuk menghindari loop tak terbatas selama verifikasi transaksi; secara teoritis ini adalah hambatan yang dapat diatasi oleh pemrogram skrip, karena loop apa pun dapat disimulasikan hanya dengan mengulangi kode yang mendasarinya berkali-kali dengan pernyataan if, tetapi ini mengarah pada skrip yang sangat tidak efisien ruang. Misalnya, mengimplementasikan algoritma tanda tangan kurva eliptik alternatif kemungkinan akan mewajibkan 256 putaran perkalian berulang yang semuanya disertakan secara individual dalam kode.
- **Kebutaan nilai (Value-blindness)** - tidak ada cara bagi skrip UTXO untuk memberikan kontrol terperinci atas jumlah yang dapat ditarik. Misalnya, salah satu kasus penggunaan yang kuat dari kontrak orakel adalah kontrak lindung nilai, di mana A dan B memasukkan BTC senilai $1000 dan setelah 30 hari skrip mengirimkan BTC senilai $1000 ke A dan sisanya ke B. Ini akan mewajibkan orakel untuk menentukan nilai 1 BTC dalam USD, tetapi meskipun demikian, ini merupakan peningkatan besar-besaran dalam hal kepercayaan dan persyaratan infrastruktur dibandingkan solusi yang sepenuhnya terpusat yang tersedia sekarang. Namun, karena UTXO bersifat semua-atau-tidak-sama-sekali, satu-satunya cara untuk mencapai ini adalah melalui peretasan yang sangat tidak efisien dengan memiliki banyak UTXO dengan berbagai denominasi (misalnya, satu UTXO sebesar 2<sup>k</sup> untuk setiap k hingga 30) dan meminta orakel memilih UTXO mana yang akan dikirim ke A dan mana yang ke B.
- **Kurangnya state** - UTXO dapat dibelanjakan atau tidak dibelanjakan; tidak ada peluang untuk kontrak multi-tahap atau skrip yang menyimpan state internal lain di luar itu. Ini membuatnya sulit untuk membuat kontrak opsi multi-tahap, penawaran pertukaran terdesentralisasi, atau protokol komitmen kriptografi dua tahap (diperlukan untuk hadiah komputasi yang aman). Ini juga berarti bahwa UTXO hanya dapat digunakan untuk membangun kontrak sederhana yang hanya sekali pakai dan bukan kontrak "stateful" yang lebih kompleks seperti organisasi terdesentralisasi, dan membuat meta-protokol sulit untuk diimplementasikan. State biner yang dikombinasikan dengan kebutaan nilai juga berarti bahwa aplikasi penting lainnya, batas penarikan, tidak mungkin dilakukan.
- **Kebutaan rantai blok (Blockchain-blindness)** - UTXO buta terhadap data rantai blok seperti nonce, stempel waktu, dan hash blok sebelumnya. Ini sangat membatasi aplikasi dalam perjudian, dan beberapa kategori lainnya, dengan menghilangkan sumber keacakan yang berpotensi berharga dari bahasa skrip.

Jadi, kita melihat tiga pendekatan untuk membangun aplikasi tingkat lanjut di atas mata uang kripto: membangun rantai blok baru, menggunakan skrip di atas Bitcoin, dan membangun meta-protokol di atas Bitcoin. Membangun rantai blok baru memungkinkan kebebasan tak terbatas dalam membangun serangkaian fitur, tetapi dengan mengorbankan waktu pengembangan, upaya bootstrapping, dan keamanan. Menggunakan skrip mudah diimplementasikan dan distandarisasi, tetapi kemampuannya sangat terbatas, dan meta-protokol, meskipun mudah, mengalami kesalahan dalam skalabilitas. Dengan Ethereum, kami bermaksud untuk membangun kerangka kerja alternatif yang memberikan keuntungan yang lebih besar dalam kemudahan pengembangan serta properti klien ringan yang lebih kuat, sementara pada saat yang sama memungkinkan aplikasi untuk berbagi lingkungan ekonomi dan keamanan rantai blok.

## Ethereum {#ethereum}

Intensi dari Ethereum adalah untuk membuat protokol alternatif untuk membangun aplikasi terdesentralisasi (dapp), menyediakan serangkaian pertukaran (tradeoff) berbeda yang kami yakini akan sangat berguna untuk sebagian besar aplikasi terdesentralisasi, dengan penekanan khusus pada situasi di mana waktu pengembangan yang cepat, keamanan untuk aplikasi kecil dan jarang digunakan, serta kemampuan berbagai aplikasi untuk berinteraksi dengan sangat efisien, adalah hal yang penting. Ethereum melakukan ini dengan membangun apa yang pada dasarnya merupakan lapisan dasar abstrak pamungkas: sebuah rantai blok dengan bahasa pemrograman Turing-complete bawaan, yang memungkinkan siapa saja untuk menulis kontrak pintar dan aplikasi terdesentralisasi di mana mereka dapat membuat aturan arbitrer mereka sendiri untuk kepemilikan, format transaksi, dan fungsi transisi state. Versi dasar dari Namecoin dapat ditulis dalam dua baris kode, dan protokol lain seperti mata uang dan sistem reputasi dapat dibangun dalam waktu kurang dari dua puluh baris. Kontrak pintar, "kotak" kriptografi yang berisi nilai dan hanya membukanya jika kondisi tertentu terpenuhi, juga dapat dibangun di atas platform ini, dengan kekuatan yang jauh lebih besar daripada yang ditawarkan oleh skrip Bitcoin karena adanya tambahan kekuatan dari Turing-completeness, kesadaran nilai (value-awareness), kesadaran rantai blok (blockchain-awareness), dan state.

### Akun Ethereum {#ethereum-accounts}

Di Ethereum, state terdiri dari objek-objek yang disebut "akun", dengan setiap akun memiliki alamat 20-bita dan transisi state berupa transfer nilai dan informasi secara langsung antar akun. Sebuah akun Ethereum berisi empat bidang:

- **nonce**, sebuah penghitung yang digunakan untuk memastikan setiap transaksi hanya dapat diproses satu kali
- **Saldo ether** akun saat ini
- **Kode kontrak** akun, jika ada
- **Penyimpanan** akun (kosong secara default)

"Ether" adalah bahan bakar kripto internal utama Ethereum, dan digunakan untuk membayar biaya transaksi. Secara umum, ada dua jenis akun: **akun yang dimiliki secara eksternal** (externally owned accounts), yang dikendalikan oleh kunci privat, dan **akun kontrak**, yang dikendalikan oleh kode kontrak mereka. Akun yang dimiliki secara eksternal tidak memiliki kode, dan seseorang dapat mengirim pesan dari akun yang dimiliki secara eksternal dengan membuat dan menandatangani sebuah transaksi; dalam akun kontrak, setiap kali akun kontrak menerima pesan, kodenya akan aktif, memungkinkannya untuk membaca dan menulis ke penyimpanan internal serta mengirim pesan lain atau membuat kontrak secara bergantian.

Perhatikan bahwa "kontrak" di Ethereum tidak boleh dilihat sebagai sesuatu yang harus "dipenuhi" atau "dipatuhi"; melainkan, mereka lebih seperti "agen otonom" yang hidup di dalam lingkungan eksekusi Ethereum, selalu mengeksekusi bagian kode tertentu ketika "dicolek" oleh sebuah pesan atau transaksi, dan memiliki kendali langsung atas saldo ether mereka sendiri serta penyimpanan kunci/nilai (key/value store) mereka sendiri untuk melacak variabel-variabel persisten.

### Pesan dan Transaksi {#messages-and-transactions}

Istilah "transaksi" digunakan di Ethereum untuk merujuk pada paket data yang ditandatangani yang menyimpan pesan untuk dikirim dari akun yang dimiliki secara eksternal. Transaksi berisi:

- Penerima pesan
- Tanda tangan yang mengidentifikasi pengirim
- Jumlah ether yang akan ditransfer dari pengirim ke penerima
- Bidang data opsional
- Nilai `STARTGAS`, yang mewakili jumlah maksimum langkah komputasi yang diizinkan untuk diambil oleh eksekusi transaksi
- Nilai `GASPRICE`, yang mewakili biaya yang dibayar pengirim per langkah komputasi

Tiga yang pertama adalah bidang standar yang diharapkan ada dalam mata uang kripto apa pun. Bidang data tidak memiliki fungsi secara default, tetapi mesin virtual memiliki opcode yang dapat digunakan oleh kontrak untuk mengakses data tersebut; sebagai contoh kasus penggunaan, jika sebuah kontrak berfungsi sebagai layanan pendaftaran domain onchain, maka kontrak tersebut mungkin ingin menafsirkan data yang diteruskan kepadanya sebagai berisi dua "bidang", bidang pertama adalah domain yang akan didaftarkan dan bidang kedua adalah alamat IP untuk mendaftarkannya. Kontrak akan membaca nilai-nilai ini dari data pesan dan menempatkannya dengan tepat di penyimpanan.

Bidang `STARTGAS` dan `GASPRICE` sangat penting untuk model anti-penolakan layanan (anti-denial of service) Ethereum. Untuk mencegah perulangan tak terbatas (infinite loops) yang tidak disengaja atau bersifat merusak, atau pemborosan komputasi lainnya dalam kode, setiap transaksi diwajibkan untuk menetapkan batas berapa banyak langkah komputasi eksekusi kode yang dapat digunakannya. Unit dasar komputasi adalah "gas"; biasanya, satu langkah komputasi memakan biaya 1 gas, tetapi beberapa operasi memakan jumlah gas yang lebih tinggi karena secara komputasi lebih mahal, atau meningkatkan jumlah data yang harus disimpan sebagai bagian dari state. Terdapat juga biaya sebesar 5 gas untuk setiap bita dalam data transaksi. Intensi dari sistem biaya ini adalah untuk mewajibkan penyerang membayar secara proporsional untuk setiap sumber daya yang mereka konsumsi, termasuk komputasi, bandwidth, dan penyimpanan; oleh karena itu, setiap transaksi yang menyebabkan jaringan mengonsumsi jumlah yang lebih besar dari salah satu sumber daya ini harus memiliki biaya gas yang kira-kira proporsional dengan peningkatannya.

### Pesan {#messages}

Kontrak memiliki kemampuan untuk mengirim "pesan" ke kontrak lain. Pesan adalah objek virtual yang tidak pernah diserialisasi dan hanya ada di dalam lingkungan eksekusi Ethereum. Sebuah pesan berisi:

- Pengirim pesan (implisit)
- Penerima pesan
- Jumlah ether yang akan ditransfer bersama dengan pesan
- Bidang data opsional
- Nilai `STARTGAS`

Pada dasarnya, pesan itu seperti transaksi, kecuali bahwa pesan diproduksi oleh kontrak dan bukan oleh aktor eksternal. Sebuah pesan diproduksi ketika sebuah kontrak yang sedang mengeksekusi kode menjalankan opcode `CALL`, yang memproduksi dan mengeksekusi sebuah pesan. Seperti halnya transaksi, sebuah pesan menyebabkan akun penerima menjalankan kodenya. Dengan demikian, kontrak dapat memiliki hubungan dengan kontrak lain dengan cara yang persis sama seperti yang dapat dilakukan oleh aktor eksternal.

Perhatikan bahwa jatah gas yang ditetapkan oleh sebuah transaksi atau kontrak berlaku untuk total gas yang dikonsumsi oleh transaksi tersebut dan semua sub-eksekusinya. Sebagai contoh, jika aktor eksternal A mengirim transaksi ke B dengan 1000 gas, dan B mengonsumsi 600 gas sebelum mengirim pesan ke C, dan eksekusi internal C mengonsumsi 300 gas sebelum kembali, maka B dapat menghabiskan 100 gas lagi sebelum kehabisan gas.

### Fungsi Transisi State Ethereum {#ethereum-state-transition-function}

![Ether state transition](./ether-state-transition.png)

Fungsi transisi state Ethereum, `APPLY(S,TX) -> S'` dapat didefinisikan sebagai berikut:

1. Periksa apakah transaksi terbentuk dengan baik (yaitu, memiliki jumlah nilai yang tepat), tanda tangan valid, dan nonce cocok dengan nonce di akun pengirim. Jika tidak, kembalikan kesalahan.
2. Hitung biaya transaksi sebagai `STARTGAS * GASPRICE`, dan tentukan alamat pengiriman dari tanda tangan. Kurangi biaya dari saldo akun pengirim dan tingkatkan nonce pengirim. Jika tidak ada cukup saldo untuk dibelanjakan, kembalikan kesalahan.
3. Inisialisasi `GAS = STARTGAS`, dan kurangi sejumlah gas per bita untuk membayar bita-bita dalam transaksi.
4. Transfer nilai transaksi dari akun pengirim ke akun penerima. Jika akun penerima belum ada, buat akun tersebut. Jika akun penerima adalah sebuah kontrak, jalankan kode kontrak baik sampai selesai atau sampai eksekusi kehabisan gas.
5. Jika transfer nilai gagal karena pengirim tidak memiliki cukup uang, atau eksekusi kode kehabisan gas, kembalikan (revert) semua perubahan state kecuali pembayaran biaya, dan tambahkan biaya tersebut ke akun penambang.
6. Jika tidak, kembalikan dana (refund) biaya untuk semua gas yang tersisa kepada pengirim, dan kirimkan biaya yang dibayarkan untuk gas yang dikonsumsi kepada penambang.

Sebagai contoh, misalkan kode kontraknya adalah:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Perhatikan bahwa pada kenyataannya kode kontrak ditulis dalam kode EVM tingkat rendah; contoh ini ditulis dalam Serpent, salah satu bahasa tingkat tinggi kami, demi kejelasan, dan dapat dikompilasi menjadi kode EVM. Misalkan penyimpanan kontrak dimulai dalam keadaan kosong, dan sebuah transaksi dikirim dengan nilai 10 ether, 2000 gas, harga gas 0,001 ether, dan 64 bita data, dengan bita 0-31 mewakili angka `2` dan bita 32-63 mewakili string `CHARLIE`<sup>[fn3](#notes)</sup>. Proses untuk fungsi transisi state dalam kasus ini adalah sebagai berikut:

1. Periksa apakah transaksi valid dan terbentuk dengan baik.
2. Periksa apakah pengirim transaksi memiliki setidaknya 2000 \* 0,001 = 2 ether. Jika ya, maka kurangi 2 ether dari akun pengirim.
3. Inisialisasi gas = 2000; dengan asumsi panjang transaksi adalah 170 bita dan biaya per bita adalah 5, kurangi 850 sehingga tersisa 1150 gas.
4. Kurangi 10 ether lagi dari akun pengirim, dan tambahkan ke akun kontrak.
5. Jalankan kode. Dalam kasus ini, prosesnya sederhana: kode memeriksa apakah penyimpanan kontrak pada indeks `2` digunakan, menyadari bahwa itu tidak digunakan, dan karenanya menetapkan penyimpanan pada indeks `2` ke nilai `CHARLIE`. Misalkan ini memakan 187 gas, sehingga jumlah gas yang tersisa adalah 1150 - 187 = 963
6. Tambahkan kembali 963 \* 0,001 = 0,963 ether ke akun pengirim, dan kembalikan state yang dihasilkan.

Jika tidak ada kontrak di ujung penerima transaksi, maka total biaya transaksi hanya akan sama dengan `GASPRICE` yang diberikan dikalikan dengan panjang transaksi dalam bita, dan data yang dikirim bersama transaksi akan menjadi tidak relevan.

Perhatikan bahwa pesan bekerja secara ekuivalen dengan transaksi dalam hal pengembalian (revert): jika eksekusi pesan kehabisan gas, maka eksekusi pesan tersebut, dan semua eksekusi lain yang dipicu oleh eksekusi tersebut, akan dikembalikan (revert), tetapi eksekusi induk tidak perlu dikembalikan. Ini berarti "aman" bagi sebuah kontrak untuk memanggil kontrak lain, karena jika A memanggil B dengan G gas maka eksekusi A dijamin akan kehilangan paling banyak G gas. Terakhir, perhatikan bahwa ada sebuah opcode, `CREATE`, yang membuat sebuah kontrak; mekanisme eksekusinya secara umum mirip dengan `CALL`, dengan pengecualian bahwa keluaran dari eksekusi tersebut menentukan kode dari kontrak yang baru dibuat.

### Eksekusi Kode {#code-execution}

Kode dalam kontrak Ethereum ditulis dalam bahasa kode bita (bytecode) berbasis tumpukan (stack) tingkat rendah, yang disebut sebagai "kode mesin virtual Ethereum" atau "kode EVM". Kode tersebut terdiri dari serangkaian bita, di mana setiap bita mewakili sebuah operasi. Secara umum, eksekusi kode adalah perulangan tak terbatas yang terdiri dari pelaksanaan operasi secara berulang pada penghitung program (program counter) saat ini (yang dimulai dari nol) dan kemudian meningkatkan penghitung program sebesar satu, sampai akhir kode tercapai atau sebuah kesalahan atau instruksi `STOP` atau `RETURN` terdeteksi. Operasi-operasi tersebut memiliki akses ke tiga jenis ruang untuk menyimpan data:

- **Tumpukan (stack)**, sebuah wadah masuk-terakhir-keluar-pertama (last-in-first-out) di mana nilai-nilai dapat didorong (push) dan ditarik (pop)
- **Memori**, sebuah larik bita yang dapat diperluas tanpa batas
- **Penyimpanan** jangka panjang kontrak, sebuah penyimpanan kunci/nilai. Tidak seperti tumpukan dan memori, yang diatur ulang setelah komputasi berakhir, penyimpanan bertahan untuk jangka panjang.

Kode juga dapat mengakses nilai, pengirim, dan data dari pesan yang masuk, serta data header blok, dan kode juga dapat mengembalikan larik bita data sebagai keluaran.

Model eksekusi formal dari kode EVM secara mengejutkan sangat sederhana. Saat mesin virtual Ethereum berjalan, state komputasi penuhnya dapat didefinisikan oleh tupel `(block_state, transaction, message, code, memory, stack, pc, gas)`, di mana `block_state` adalah state global yang berisi semua akun dan mencakup saldo serta penyimpanan. Pada awal setiap putaran eksekusi, instruksi saat ini ditemukan dengan mengambil bita ke-`pc` dari `code` (atau 0 jika `pc >= len(code)`), dan setiap instruksi memiliki definisinya sendiri dalam hal bagaimana instruksi tersebut memengaruhi tupel. Sebagai contoh, `ADD` menarik dua item dari tumpukan dan mendorong jumlahnya, mengurangi `gas` sebesar 1 dan meningkatkan `pc` sebesar 1, dan `SSTORE` menarik dua item teratas dari tumpukan dan menyisipkan item kedua ke dalam penyimpanan kontrak pada indeks yang ditentukan oleh item pertama. Meskipun ada banyak cara untuk mengoptimalkan eksekusi mesin virtual Ethereum melalui kompilasi just-in-time, implementasi dasar Ethereum dapat dilakukan dalam beberapa ratus baris kode.

### Rantai Blok dan Penambangan {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

Rantai blok Ethereum dalam banyak hal mirip dengan rantai blok Bitcoin, meskipun memiliki beberapa perbedaan. Perbedaan utama antara Ethereum dan Bitcoin sehubungan dengan arsitektur rantai blok adalah bahwa, tidak seperti Bitcoin, blok Ethereum berisi salinan dari daftar transaksi dan state terbaru. Selain itu, dua nilai lainnya, nomor blok dan kesulitan, juga disimpan di dalam blok. Algoritma validasi blok dasar di Ethereum adalah sebagai berikut:

1. Periksa apakah blok sebelumnya yang direferensikan ada dan valid.
2. Periksa apakah stempel waktu (timestamp) blok lebih besar dari blok sebelumnya yang direferensikan dan kurang dari 15 menit di masa depan
3. Periksa apakah nomor blok, kesulitan, akar transaksi (transaction root), akar paman (uncle root), dan batas gas (berbagai konsep tingkat rendah khusus Ethereum) adalah valid.
4. Periksa apakah Bukti Kerja (PoW) pada blok tersebut valid.
5. Misalkan `S[0]` adalah state pada akhir blok sebelumnya.
6. Misalkan `TX` adalah daftar transaksi blok, dengan `n` transaksi. Untuk semua `i` dalam `0...n-1`, tetapkan `S[i+1] = APPLY(S[i],TX[i])`. Jika ada aplikasi yang mengembalikan kesalahan, atau jika total gas yang dikonsumsi dalam blok hingga titik ini melebihi `GASLIMIT`, kembalikan kesalahan.
7. Misalkan `S_FINAL` adalah `S[n]`, tetapi dengan menambahkan imbalan blok yang dibayarkan kepada penambang.
8. Periksa apakah akar pohon Merkle dari state `S_FINAL` sama dengan akar state akhir yang disediakan di header blok. Jika ya, blok tersebut valid; jika tidak, blok tersebut tidak valid.

Pendekatan ini mungkin tampak sangat tidak efisien pada pandangan pertama, karena perlu menyimpan seluruh state dengan setiap blok, tetapi pada kenyataannya efisiensinya harus sebanding dengan Bitcoin. Alasannya adalah bahwa state disimpan dalam struktur pohon, dan setelah setiap blok hanya sebagian kecil dari pohon yang perlu diubah. Dengan demikian, secara umum, di antara dua blok yang berdekatan, sebagian besar pohon harus sama, dan oleh karena itu data dapat disimpan sekali dan direferensikan dua kali menggunakan penunjuk (yaitu, hash dari sub-pohon). Jenis pohon khusus yang dikenal sebagai "pohon Patricia" digunakan untuk mencapai hal ini, termasuk modifikasi pada konsep pohon Merkle yang memungkinkan node untuk disisipkan dan dihapus, dan bukan hanya diubah, secara efisien. Selain itu, karena semua informasi state adalah bagian dari blok terakhir, tidak perlu menyimpan seluruh riwayat rantai blok - sebuah strategi yang, jika dapat diterapkan pada Bitcoin, dapat dihitung untuk memberikan penghematan ruang 5-20x.

Pertanyaan yang sering diajukan adalah "di mana" kode kontrak dieksekusi, dalam hal perangkat keras fisik. Ini memiliki jawaban sederhana: proses mengeksekusi kode kontrak adalah bagian dari definisi fungsi transisi state, yang merupakan bagian dari algoritma validasi blok, jadi jika sebuah transaksi ditambahkan ke dalam blok `B` eksekusi kode yang dihasilkan oleh transaksi tersebut akan dieksekusi oleh semua node, sekarang dan di masa depan, yang mengunduh dan memvalidasi blok `B`.

## Aplikasi {#applications}

Secara umum, ada tiga jenis aplikasi di atas Ethereum. Kategori pertama adalah aplikasi keuangan, yang memberi pengguna cara yang lebih kuat untuk mengelola dan membuat kontrak menggunakan uang mereka. Ini termasuk sub-mata uang, derivatif keuangan, kontrak lindung nilai, dompet tabungan, surat wasiat, dan pada akhirnya bahkan beberapa kelas kontrak kerja skala penuh. Kategori kedua adalah aplikasi semi-keuangan, di mana uang dilibatkan tetapi ada juga sisi non-moneter yang kuat pada apa yang sedang dilakukan; contoh yang sempurna adalah sayembara yang dieksekusi secara otomatis untuk solusi masalah komputasi. Terakhir, ada aplikasi seperti pemungutan suara online dan tata kelola terdesentralisasi yang sama sekali bukan keuangan.

### Sistem Token {#token-systems}

Sistem token di rantai blok memiliki banyak aplikasi mulai dari sub-mata uang yang mewakili aset seperti USD atau emas hingga saham perusahaan, token individu yang mewakili properti pintar, kupon aman yang tidak dapat dipalsukan, dan bahkan sistem token yang sama sekali tidak memiliki ikatan dengan nilai konvensional, yang digunakan sebagai sistem poin untuk insentif. Sistem token secara mengejutkan mudah diimplementasikan di Ethereum. Poin utama yang perlu dipahami adalah bahwa pada dasarnya semua mata uang, atau sistem token, adalah basis data dengan satu operasi: kurangi X unit dari A dan berikan X unit ke B, dengan ketentuan bahwa (i) A memiliki setidaknya X unit sebelum transaksi dan (2) transaksi disetujui oleh A. Yang diperlukan untuk mengimplementasikan sistem token hanyalah mengimplementasikan logika ini ke dalam sebuah kontrak.

Kode dasar untuk mengimplementasikan sistem token di Serpent terlihat sebagai berikut:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Ini pada dasarnya adalah implementasi harfiah dari fungsi transisi state "sistem perbankan" yang dijelaskan lebih lanjut di atas dalam dokumen ini. Beberapa baris kode tambahan perlu ditambahkan untuk menyediakan langkah awal pendistribusian unit mata uang pada tahap pertama dan beberapa kasus ekstrem lainnya, dan idealnya sebuah fungsi akan ditambahkan untuk memungkinkan kontrak lain meminta (query) saldo dari sebuah alamat. Namun, hanya itu saja. Secara teoretis, sistem token berbasis Ethereum yang bertindak sebagai sub-mata uang berpotensi menyertakan fitur penting lain yang tidak dimiliki oleh meta-mata uang berbasis Bitcoin onchain: kemampuan untuk membayar biaya transaksi secara langsung dalam mata uang tersebut. Cara ini akan diimplementasikan adalah kontrak akan mempertahankan saldo ether yang dengannya ia akan mengembalikan ether yang digunakan untuk membayar biaya kepada pengirim, dan ia akan mengisi ulang saldo ini dengan mengumpulkan unit mata uang internal yang diambilnya sebagai biaya dan menjualnya kembali dalam lelang yang berjalan konstan. Dengan demikian, pengguna perlu "mengaktifkan" akun mereka dengan ether, tetapi setelah ether ada di sana, ether tersebut dapat digunakan kembali karena kontrak akan mengembalikannya setiap saat.

### Derivatif Keuangan dan Mata Uang Bernilai Stabil {#financial-derivatives-and-stable-value-currencies}

Derivatif keuangan adalah aplikasi paling umum dari "kontrak pintar", dan salah satu yang paling sederhana untuk diimplementasikan dalam kode. Tantangan utama dalam mengimplementasikan kontrak keuangan adalah bahwa sebagian besar dari mereka memerlukan referensi ke ticker harga eksternal; misalnya, aplikasi yang sangat diinginkan adalah kontrak pintar yang melakukan lindung nilai terhadap volatilitas ether (atau mata uang kripto lainnya) sehubungan dengan dolar AS, tetapi melakukan ini mewajibkan kontrak untuk mengetahui berapa nilai ETH/USD. Cara paling sederhana untuk melakukan ini adalah melalui kontrak "umpan data" yang dikelola oleh pihak tertentu (misalnya, NASDAQ) yang dirancang sedemikian rupa sehingga pihak tersebut memiliki kemampuan untuk memperbarui kontrak sesuai kebutuhan, dan menyediakan antarmuka yang memungkinkan kontrak lain untuk mengirim pesan ke kontrak tersebut dan mendapatkan kembali respons yang memberikan harga.

Dengan bahan penting tersebut, kontrak lindung nilai akan terlihat sebagai berikut:

1. Tunggu pihak A untuk memasukkan 1000 ether.
2. Tunggu pihak B untuk memasukkan 1000 ether.
3. Catat nilai USD dari 1000 ether, yang dihitung dengan meminta (query) kontrak umpan data, di penyimpanan, katakanlah ini adalah $x.
4. Setelah 30 hari, izinkan A atau B untuk "mengaktifkan kembali" kontrak guna mengirim ether senilai $x (dihitung dengan meminta kontrak umpan data lagi untuk mendapatkan harga baru) ke A dan sisanya ke B.

Kontrak semacam itu akan memiliki potensi yang signifikan dalam perdagangan kripto. Salah satu masalah utama yang disebutkan tentang mata uang kripto adalah kenyataan bahwa ia volatil; meskipun banyak pengguna dan pedagang mungkin menginginkan keamanan dan kenyamanan dalam berurusan dengan aset kriptografi, mereka mungkin tidak ingin menghadapi prospek kehilangan 23% dari nilai dana mereka dalam satu hari. Hingga saat ini, solusi yang paling umum diusulkan adalah aset yang didukung penerbit; idenya adalah bahwa penerbit membuat sub-mata uang di mana mereka memiliki hak untuk menerbitkan dan mencabut unit, dan memberikan satu unit mata uang kepada siapa saja yang memberi mereka (secara offline) satu unit aset dasar yang ditentukan (misalnya, emas, USD). Penerbit kemudian berjanji untuk memberikan satu unit aset dasar kepada siapa saja yang mengirim kembali satu unit aset kripto tersebut. Mekanisme ini memungkinkan aset non-kriptografi apa pun untuk "diangkat" menjadi aset kriptografi, asalkan penerbitnya dapat dipercaya.

Namun, dalam praktiknya, penerbit tidak selalu dapat dipercaya, dan dalam beberapa kasus infrastruktur perbankan terlalu lemah, atau terlalu bermusuhan, sehingga layanan semacam itu tidak dapat ada. Derivatif keuangan memberikan alternatif. Di sini, alih-alih satu penerbit yang menyediakan dana untuk mendukung suatu aset, pasar spekulan yang terdesentralisasi, yang bertaruh bahwa harga aset referensi kriptografi (misalnya, ETH) akan naik, memainkan peran tersebut. Tidak seperti penerbit, spekulan tidak memiliki opsi untuk gagal bayar pada sisi tawar-menawar mereka karena kontrak lindung nilai menahan dana mereka di eskro. Perhatikan bahwa pendekatan ini tidak sepenuhnya terdesentralisasi, karena sumber tepercaya masih diperlukan untuk menyediakan ticker harga, meskipun bisa dibilang ini masih merupakan peningkatan besar-besaran dalam hal mengurangi persyaratan infrastruktur (tidak seperti menjadi penerbit, menerbitkan umpan harga tidak memerlukan lisensi dan kemungkinan dapat dikategorikan sebagai kebebasan berbicara) dan mengurangi potensi penipuan.

### Sistem Identitas dan Reputasi {#identity-and-reputation-systems}

Mata uang kripto alternatif paling awal dari semuanya, [Namecoin](http://namecoin.org/), mencoba menggunakan rantai blok mirip Bitcoin untuk menyediakan sistem pendaftaran nama, di mana pengguna dapat mendaftarkan nama mereka dalam basis data publik di samping data lainnya. Kasus penggunaan utama yang disebutkan adalah untuk sistem [DNS](https://wikipedia.org/wiki/Domain_Name_System), yang memetakan nama domain seperti "bitcoin.org" (atau, dalam kasus Namecoin, "bitcoin.bit") ke alamat IP. Kasus penggunaan lainnya termasuk autentikasi email dan sistem reputasi yang berpotensi lebih canggih. Berikut adalah kontrak dasar untuk menyediakan sistem pendaftaran nama mirip Namecoin di Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Kontraknya sangat sederhana; itu hanyalah sebuah basis data di dalam jaringan Ethereum yang dapat ditambahkan, tetapi tidak dapat dimodifikasi atau dihapus. Siapa pun dapat mendaftarkan nama dengan nilai tertentu, dan pendaftaran itu kemudian melekat selamanya. Kontrak pendaftaran nama yang lebih canggih juga akan memiliki "klausul fungsi" yang memungkinkan kontrak lain untuk memintanya (query), serta mekanisme bagi "pemilik" (yaitu, pendaftar pertama) dari sebuah nama untuk mengubah data atau mentransfer kepemilikan. Seseorang bahkan dapat menambahkan fungsionalitas reputasi dan web-of-trust di atasnya.

### Penyimpanan File Terdesentralisasi {#decentralized-file-storage}

Selama beberapa tahun terakhir, telah muncul sejumlah startup penyimpanan file online yang populer, yang paling menonjol adalah Dropbox, yang berupaya memungkinkan pengguna untuk mengunggah cadangan hard drive mereka dan meminta layanan tersebut menyimpan cadangan dan memungkinkan pengguna untuk mengaksesnya dengan imbalan biaya bulanan. Namun, pada titik ini pasar penyimpanan file terkadang relatif tidak efisien; pandangan sepintas pada berbagai solusi yang ada menunjukkan bahwa, khususnya pada tingkat "uncanny valley" 20-200 GB di mana kuota gratis maupun diskon tingkat perusahaan tidak berlaku, harga bulanan untuk biaya penyimpanan file arus utama sedemikian rupa sehingga Anda membayar lebih dari biaya seluruh hard drive dalam satu bulan. Kontrak Ethereum dapat memungkinkan pengembangan ekosistem penyimpanan file yang terdesentralisasi, di mana pengguna individu dapat memperoleh sejumlah kecil uang dengan menyewakan hard drive mereka sendiri dan ruang yang tidak terpakai dapat digunakan untuk lebih menekan biaya penyimpanan file.

Bagian penting yang mendasari perangkat semacam itu adalah apa yang kami sebut "kontrak Dropbox terdesentralisasi". Kontrak ini bekerja sebagai berikut. Pertama, seseorang membagi data yang diinginkan menjadi blok-blok, mengenkripsi setiap blok untuk privasi, dan membangun pohon Merkle darinya. Seseorang kemudian membuat kontrak dengan aturan bahwa, setiap N blok, kontrak akan memilih indeks acak di pohon Merkle (menggunakan hash blok sebelumnya, yang dapat diakses dari kode kontrak, sebagai sumber keacakan), dan memberikan X ether ke entitas pertama yang memasok transaksi dengan bukti kepemilikan yang disederhanakan seperti verifikasi pembayaran dari blok pada indeks tertentu di pohon tersebut. Ketika pengguna ingin mengunduh ulang file mereka, mereka dapat menggunakan protokol saluran pembayaran mikro (misalnya, membayar 1 szabo per 32 kilobyte) untuk memulihkan file; pendekatan yang paling efisien biaya adalah agar pembayar tidak mempublikasikan transaksi sampai akhir, melainkan mengganti transaksi dengan yang sedikit lebih menguntungkan dengan nonce yang sama setelah setiap 32 kilobyte.

Fitur penting dari protokol ini adalah bahwa, meskipun tampaknya seseorang memercayai banyak node acak untuk tidak memutuskan melupakan file tersebut, seseorang dapat mengurangi risiko itu hingga mendekati nol dengan membagi file menjadi banyak bagian melalui pembagian rahasia (secret sharing), dan mengawasi kontrak untuk melihat setiap bagian masih dalam kepemilikan suatu node. Jika kontrak masih membayarkan uang, itu memberikan bukti kriptografi bahwa seseorang di luar sana masih menyimpan file tersebut.

### Organisasi Otonom Terdesentralisasi {#decentralized-autonomous-organizations}

Konsep umum dari "organisasi otonom terdesentralisasi" adalah entitas virtual yang memiliki sekumpulan anggota atau pemegang saham tertentu yang, mungkin dengan mayoritas 67%, memiliki hak untuk membelanjakan dana entitas dan memodifikasi kodenya. Para anggota akan secara kolektif memutuskan bagaimana organisasi harus mengalokasikan dananya. Metode untuk mengalokasikan dana DAO dapat berkisar dari sayembara, gaji hingga mekanisme yang lebih eksotis seperti mata uang internal untuk memberikan imbalan atas pekerjaan. Ini pada dasarnya mereplikasi jebakan hukum dari perusahaan tradisional atau nirlaba tetapi hanya menggunakan teknologi rantai blok kriptografi untuk penegakan. Sejauh ini banyak pembicaraan seputar DAO telah berkisar pada model "kapitalis" dari "perusahaan otonom terdesentralisasi" (DAC) dengan pemegang saham yang menerima dividen dan saham yang dapat diperdagangkan; sebuah alternatif, yang mungkin digambarkan sebagai "komunitas otonom terdesentralisasi", akan membuat semua anggota memiliki bagian yang sama dalam pengambilan keputusan dan mewajibkan 67% anggota yang ada untuk setuju menambah atau menghapus anggota. Persyaratan bahwa satu orang hanya dapat memiliki satu keanggotaan kemudian perlu ditegakkan secara kolektif oleh kelompok tersebut.

Garis besar umum tentang cara mengodekan DAO adalah sebagai berikut. Desain paling sederhana hanyalah sepotong kode yang memodifikasi dirinya sendiri yang berubah jika dua pertiga anggota menyetujui perubahan. Meskipun kode secara teoretis tidak dapat diubah, seseorang dapat dengan mudah menyiasati ini dan memiliki mutabilitas de-facto dengan memiliki potongan kode dalam kontrak terpisah, dan memiliki alamat kontrak mana yang akan dipanggil yang disimpan dalam penyimpanan yang dapat dimodifikasi. Dalam implementasi sederhana dari kontrak DAO semacam itu, akan ada tiga jenis transaksi, yang dibedakan oleh data yang disediakan dalam transaksi:

- `[0,i,K,V]` untuk mendaftarkan proposal dengan indeks `i` untuk mengubah alamat pada indeks penyimpanan `K` menjadi nilai `V`
- `[1,i]` untuk mendaftarkan suara yang mendukung proposal `i`
- `[2,i]` untuk memfinalisasi proposal `i` jika cukup banyak suara telah diberikan

Kontrak kemudian akan memiliki klausul untuk masing-masing ini. Itu akan menyimpan catatan semua perubahan penyimpanan yang terbuka, bersama dengan daftar siapa yang memilihnya. Itu juga akan memiliki daftar semua anggota. Ketika setiap perubahan penyimpanan mendapatkan dua pertiga anggota yang memilihnya, transaksi finalisasi dapat mengeksekusi perubahan tersebut. Kerangka yang lebih canggih juga akan memiliki kemampuan pemungutan suara bawaan untuk fitur-fitur seperti mengirim transaksi, menambah anggota dan menghapus anggota, dan bahkan mungkin menyediakan pendelegasian suara bergaya [Liquid Democracy](https://wikipedia.org/wiki/Liquid_democracy) (yaitu, siapa pun dapat menugaskan seseorang untuk memilih mereka, dan penugasan bersifat transitif sehingga jika A menugaskan B dan B menugaskan C maka C menentukan suara A). Desain ini akan memungkinkan DAO untuk tumbuh secara organik sebagai komunitas yang terdesentralisasi, memungkinkan orang untuk pada akhirnya mendelegasikan tugas menyaring siapa yang menjadi anggota kepada spesialis, meskipun tidak seperti dalam "sistem saat ini" spesialis dapat dengan mudah muncul dan menghilang seiring waktu saat anggota komunitas individu mengubah keberpihakan mereka.

Model alternatif adalah untuk perusahaan terdesentralisasi, di mana setiap akun dapat memiliki nol atau lebih saham, dan dua pertiga saham diwajibkan untuk membuat keputusan. Kerangka lengkap akan melibatkan fungsionalitas manajemen aset, kemampuan untuk membuat penawaran untuk membeli atau menjual saham, dan kemampuan untuk menerima penawaran (sebaiknya dengan mekanisme pencocokan pesanan di dalam kontrak). Pendelegasian juga akan ada dengan gaya Liquid Democracy, yang menggeneralisasi konsep "dewan direksi".

### Aplikasi Lebih Lanjut {#further-applications}

**1. Dompet tabungan**. Misalkan Alice ingin menjaga dananya tetap aman, tetapi khawatir dia akan kehilangan atau seseorang akan meretas kunci privatnya. Dia memasukkan ether ke dalam kontrak dengan Bob, sebuah bank, sebagai berikut:

- Alice sendiri dapat melakukan penarikan maksimum 1% dari dana per hari.
- Bob sendiri dapat melakukan penarikan maksimum 1% dari dana per hari, tetapi Alice memiliki kemampuan untuk membuat transaksi dengan kuncinya yang mematikan kemampuan ini.
- Alice dan Bob bersama-sama dapat menarik apa pun.

Biasanya, 1% per hari sudah cukup bagi Alice, dan jika Alice ingin menarik lebih banyak, dia dapat menghubungi Bob untuk meminta bantuan. Jika kunci Alice diretas, dia berlari ke Bob untuk memindahkan dana ke kontrak baru. Jika dia kehilangan kuncinya, Bob pada akhirnya akan mengeluarkan dana tersebut. Jika Bob ternyata jahat, maka dia dapat mematikan kemampuannya untuk menarik.

**2. Asuransi tanaman**. Seseorang dapat dengan mudah membuat kontrak derivatif keuangan tetapi menggunakan umpan data cuaca alih-alih indeks harga apa pun. Jika seorang petani di Iowa membeli derivatif yang membayar secara terbalik berdasarkan curah hujan di Iowa, maka jika terjadi kekeringan, petani tersebut akan secara otomatis menerima uang dan jika ada cukup hujan, petani tersebut akan senang karena tanaman mereka akan tumbuh dengan baik. Ini dapat diperluas ke asuransi bencana alam secara umum.

**3. Umpan data terdesentralisasi**. Untuk kontrak keuangan untuk perbedaan (contracts for difference), mungkin sebenarnya dimungkinkan untuk mendesentralisasikan umpan data melalui protokol yang disebut "[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)". SchellingCoin pada dasarnya bekerja sebagai berikut: N pihak semuanya memasukkan ke dalam sistem nilai dari datum tertentu (misalnya, harga ETH/USD), nilai-nilai tersebut diurutkan, dan semua orang antara persentil ke-25 dan ke-75 mendapatkan satu token sebagai imbalan. Setiap orang memiliki insentif untuk memberikan jawaban yang akan diberikan oleh orang lain, dan satu-satunya nilai yang secara realistis dapat disetujui oleh sejumlah besar pemain adalah default yang jelas: kebenaran. Ini menciptakan protokol terdesentralisasi yang secara teoretis dapat memberikan sejumlah nilai, termasuk harga ETH/USD, suhu di Berlin, atau bahkan hasil dari komputasi keras tertentu.

**4. Eskro multisig pintar**. Bitcoin memungkinkan kontrak transaksi multisig di mana, misalnya, tiga dari lima kunci yang diberikan dapat membelanjakan dana. Ethereum memungkinkan granularitas yang lebih besar; misalnya, empat dari lima dapat membelanjakan semuanya, tiga dari lima dapat membelanjakan hingga 10% per hari, dan dua dari lima dapat membelanjakan hingga 0,5% per hari. Selain itu, multisig Ethereum bersifat asinkron - dua pihak dapat mendaftarkan tanda tangan mereka di rantai blok pada waktu yang berbeda dan tanda tangan terakhir akan secara otomatis mengirimkan transaksi.

**5. Komputasi awan**. Teknologi EVM juga dapat digunakan untuk menciptakan lingkungan komputasi yang dapat diverifikasi, yang memungkinkan pengguna untuk meminta orang lain melakukan komputasi dan kemudian secara opsional meminta bukti bahwa komputasi pada pos pemeriksaan tertentu yang dipilih secara acak dilakukan dengan benar. Ini memungkinkan terciptanya pasar komputasi awan di mana setiap pengguna dapat berpartisipasi dengan desktop, laptop, atau server khusus mereka, dan pemeriksaan mendadak (spot-checking) bersama dengan deposit keamanan dapat digunakan untuk memastikan bahwa sistem tersebut dapat dipercaya (yaitu, node tidak dapat berbuat curang secara menguntungkan). Meskipun sistem semacam itu mungkin tidak cocok untuk semua tugas; tugas yang memerlukan tingkat komunikasi antar-proses yang tinggi, misalnya, tidak dapat dengan mudah dilakukan pada awan node yang besar. Namun, tugas-tugas lain jauh lebih mudah untuk diparalelkan; proyek-proyek seperti SETI@home, folding@home, dan algoritma genetik dapat dengan mudah diimplementasikan di atas platform semacam itu.

**6. Perjudian peer-to-peer**. Sejumlah protokol perjudian peer-to-peer, seperti [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) karya Frank Stajano dan Richard Clayton, dapat diimplementasikan di rantai blok Ethereum. Protokol perjudian yang paling sederhana sebenarnya hanyalah kontrak untuk perbedaan (contract for difference) pada hash blok berikutnya, dan protokol yang lebih canggih dapat dibangun dari sana, menciptakan layanan perjudian dengan biaya mendekati nol yang tidak memiliki kemampuan untuk berbuat curang.

**7. Pasar prediksi**. Asalkan ada orakel atau SchellingCoin, pasar prediksi juga mudah diimplementasikan, dan pasar prediksi bersama dengan SchellingCoin mungkin terbukti menjadi aplikasi arus utama pertama dari [futarchy](https://mason.gmu.edu/~rhanson/futarchy.html) sebagai protokol tata kelola untuk organisasi terdesentralisasi.

**8. Pasar terdesentralisasi onchain**, menggunakan sistem identitas dan reputasi sebagai basis.

## Lain-lain dan Kekhawatiran {#miscellanea-and-concerns}

### Implementasi GHOST yang Dimodifikasi {#modified-ghost-implementation}

Protokol "Greedy Heaviest Observed Subtree" (GHOST) adalah sebuah inovasi yang pertama kali diperkenalkan oleh Yonatan Sompolinsky dan Aviv Zohar pada [Desember 2013](https://eprint.iacr.org/2013/881.pdf). Motivasi di balik GHOST adalah bahwa rantai blok dengan waktu konfirmasi yang cepat saat ini mengalami penurunan keamanan karena tingkat *stale* (kedaluwarsa) yang tinggi - karena blok membutuhkan waktu tertentu untuk berpropagasi melalui jaringan, jika penambang A menambang sebuah blok dan kemudian penambang B kebetulan menambang blok lain sebelum blok penambang A berpropagasi ke B, blok penambang B pada akhirnya akan terbuang sia-sia dan tidak akan berkontribusi pada keamanan jaringan. Selain itu, ada masalah sentralisasi: jika penambang A adalah *mining pool* (kumpulan penambangan) dengan 30% kekuatan hash dan B memiliki 10% kekuatan hash, A akan memiliki risiko menghasilkan blok *stale* 70% dari waktu (karena 30% waktu lainnya A menghasilkan blok terakhir dan dengan demikian akan mendapatkan data penambangan dengan segera) sedangkan B akan memiliki risiko menghasilkan blok *stale* 90% dari waktu. Dengan demikian, jika interval blok cukup pendek sehingga tingkat *stale* menjadi tinggi, A akan menjadi jauh lebih efisien hanya karena ukurannya. Dengan gabungan kedua efek ini, rantai blok yang menghasilkan blok dengan cepat sangat mungkin menyebabkan satu *mining pool* memiliki persentase kekuatan hash jaringan yang cukup besar untuk memiliki kendali de facto atas proses penambangan.

Seperti yang dijelaskan oleh Sompolinsky dan Zohar, GHOST memecahkan masalah pertama hilangnya keamanan jaringan dengan memasukkan blok *stale* dalam perhitungan rantai mana yang "terpanjang"; artinya, tidak hanya induk dan leluhur lebih lanjut dari sebuah blok, tetapi juga keturunan *stale* dari leluhur blok tersebut (dalam jargon Ethereum, "paman" atau *uncles*) ditambahkan ke perhitungan blok mana yang memiliki total Bukti Kerja (PoW) terbesar yang mendukungnya. Untuk memecahkan masalah kedua dari bias sentralisasi, kami melampaui protokol yang dijelaskan oleh Sompolinsky dan Zohar, dan juga memberikan imbalan blok kepada blok *stale*: sebuah blok *stale* menerima 87,5% dari imbalan dasarnya, dan keponakan yang memasukkan blok *stale* tersebut menerima sisa 12,5%. Namun, biaya transaksi tidak diberikan kepada paman.

Ethereum mengimplementasikan versi GHOST yang disederhanakan yang hanya turun hingga tujuh tingkat. Secara spesifik, ini didefinisikan sebagai berikut:

- Sebuah blok wajib menentukan satu induk, dan wajib menentukan 0 atau lebih paman
- Paman yang dimasukkan dalam blok B wajib memiliki properti berikut:
  - Ia wajib menjadi anak langsung dari leluhur generasi ke-k dari B, di mana `2 <= k <= 7`.
  - Ia tidak boleh menjadi leluhur dari B
  - Paman wajib berupa header blok yang valid, tetapi tidak perlu berupa blok yang sebelumnya telah diverifikasi atau bahkan blok yang valid
  - Paman wajib berbeda dari semua paman yang dimasukkan dalam blok sebelumnya dan semua paman lain yang dimasukkan dalam blok yang sama (inklusi non-ganda)
- Untuk setiap paman U dalam blok B, penambang B mendapatkan tambahan 3,125% yang ditambahkan ke imbalan *coinbase*-nya dan penambang U mendapatkan 93,75% dari imbalan *coinbase* standar.

Versi GHOST yang terbatas ini, dengan paman yang hanya dapat dimasukkan hingga 7 generasi, digunakan karena dua alasan. Pertama, GHOST yang tidak terbatas akan memasukkan terlalu banyak komplikasi ke dalam perhitungan paman mana untuk blok tertentu yang valid. Kedua, GHOST yang tidak terbatas dengan kompensasi seperti yang digunakan di Ethereum menghilangkan insentif bagi penambang untuk menambang di rantai utama dan bukan di rantai penyerang publik.

### Biaya {#fees}

Karena setiap transaksi yang dipublikasikan ke dalam rantai blok membebankan biaya pada jaringan karena perlu mengunduh dan memverifikasinya, ada kebutuhan akan beberapa mekanisme pengaturan, yang biasanya melibatkan biaya transaksi, untuk mencegah penyalahgunaan. Pendekatan bawaan, yang digunakan dalam Bitcoin, adalah memiliki biaya yang murni sukarela, mengandalkan penambang untuk bertindak sebagai penjaga gerbang dan menetapkan batas minimum yang dinamis. Pendekatan ini telah diterima dengan sangat baik di komunitas Bitcoin terutama karena "berbasis pasar", yang memungkinkan penawaran dan permintaan antara penambang dan pengirim transaksi menentukan harganya. Namun, masalah dengan alur penalaran ini adalah bahwa pemrosesan transaksi bukanlah sebuah pasar; meskipun secara intuitif menarik untuk menafsirkan pemrosesan transaksi sebagai layanan yang ditawarkan penambang kepada pengirim, pada kenyataannya setiap transaksi yang dimasukkan oleh penambang perlu diproses oleh setiap node di jaringan, sehingga sebagian besar biaya pemrosesan transaksi ditanggung oleh pihak ketiga dan bukan penambang yang membuat keputusan apakah akan memasukkannya atau tidak. Oleh karena itu, masalah tragedi kepemilikan bersama (*tragedy-of-the-commons*) sangat mungkin terjadi.

Namun, ternyata kelemahan dalam mekanisme berbasis pasar ini, ketika diberikan asumsi penyederhanaan yang tidak akurat tertentu, secara ajaib membatalkan dirinya sendiri. Argumennya adalah sebagai berikut. Misalkan:

1. Sebuah transaksi mengarah ke `k` operasi, menawarkan imbalan `kR` kepada penambang mana pun yang memasukkannya di mana `R` ditetapkan oleh pengirim dan `k` serta `R` (secara kasar) terlihat oleh penambang sebelumnya.
2. Sebuah operasi memiliki biaya pemrosesan sebesar `C` untuk node mana pun (yaitu, semua node memiliki efisiensi yang sama)
3. Terdapat `N` node penambangan, masing-masing dengan kekuatan pemrosesan yang sama persis (yaitu, `1/N` dari total)
4. Tidak ada full node non-penambangan yang ada.

Seorang penambang akan bersedia memproses transaksi jika imbalan yang diharapkan lebih besar dari biayanya. Dengan demikian, imbalan yang diharapkan adalah `kR/N` karena penambang memiliki peluang `1/N` untuk memproses blok berikutnya, dan biaya pemrosesan untuk penambang hanyalah `kC`. Oleh karena itu, penambang akan memasukkan transaksi di mana `kR/N > kC`, atau `R > NC`. Perhatikan bahwa `R` adalah biaya per operasi yang diberikan oleh pengirim, dan dengan demikian merupakan batas bawah dari manfaat yang diperoleh pengirim dari transaksi tersebut, dan `NC` adalah biaya untuk seluruh jaringan secara bersama-sama dalam memproses sebuah operasi. Oleh karena itu, penambang memiliki insentif untuk hanya memasukkan transaksi yang manfaat utilitarian totalnya melebihi biayanya.

Namun, ada beberapa penyimpangan penting dari asumsi-asumsi tersebut dalam kenyataannya:

1. Penambang memang membayar biaya yang lebih tinggi untuk memproses transaksi daripada node pemverifikasi lainnya, karena waktu verifikasi ekstra menunda propagasi blok dan dengan demikian meningkatkan kemungkinan blok tersebut akan menjadi *stale*.
2. Memang ada full node non-penambangan.
3. Distribusi kekuatan penambangan pada akhirnya mungkin menjadi sangat tidak egaliter dalam praktiknya.
4. Spekulan, musuh politik, dan orang gila yang fungsi utilitasnya termasuk menyebabkan kerugian pada jaringan memang ada, dan mereka dapat dengan cerdik mengatur kontrak di mana biaya mereka jauh lebih rendah daripada biaya yang dibayarkan oleh node pemverifikasi lainnya.

(1) memberikan kecenderungan bagi penambang untuk memasukkan lebih sedikit transaksi, dan
(2) meningkatkan `NC`; oleh karena itu, kedua efek ini setidaknya sebagian saling membatalkan.<sup>[Bagaimana?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) dan (4) adalah masalah utama; untuk menyelesaikannya, kami cukup melembagakan batas mengambang (*floating cap*): tidak ada blok yang dapat memiliki lebih banyak operasi daripada
`BLK_LIMIT_FACTOR` kali rata-rata pergerakan eksponensial jangka panjang.
Secara spesifik:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` dan `EMA_FACTOR` adalah konstanta yang akan ditetapkan ke 65536 dan 1,5 untuk saat ini, tetapi kemungkinan akan diubah setelah analisis lebih lanjut.

Ada faktor lain yang mendisinsentifkan ukuran blok yang besar di Bitcoin: blok yang besar akan membutuhkan waktu lebih lama untuk berpropagasi, dan dengan demikian memiliki probabilitas lebih tinggi untuk menjadi *stale*. Di Ethereum, blok yang sangat memakan gas juga dapat membutuhkan waktu lebih lama untuk berpropagasi baik karena secara fisik lebih besar maupun karena membutuhkan waktu lebih lama untuk memproses transisi state transaksi untuk divalidasi. Disinsentif penundaan ini merupakan pertimbangan yang signifikan di Bitcoin, tetapi kurang begitu di Ethereum karena protokol GHOST; oleh karena itu, mengandalkan batas blok yang diatur memberikan garis dasar yang lebih stabil.

### Komputasi dan Kelengkapan Turing {#computation-and-turing-completeness}

Catatan penting adalah bahwa mesin virtual Ethereum bersifat *Turing-complete* (lengkap Turing); ini berarti bahwa kode EVM dapat menyandikan komputasi apa pun yang dapat dibayangkan untuk dilakukan, termasuk perulangan tak terbatas (*infinite loops*). Kode EVM memungkinkan perulangan dengan dua cara. Pertama, ada instruksi `JUMP` yang memungkinkan program untuk melompat kembali ke titik sebelumnya dalam kode, dan instruksi `JUMPI` untuk melakukan lompatan bersyarat, yang memungkinkan pernyataan seperti `while x < 27: x = x * 2`. Kedua, kontrak dapat memanggil kontrak lain, yang berpotensi memungkinkan perulangan melalui rekursi. Hal ini secara alami mengarah pada sebuah masalah: dapatkah pengguna jahat pada dasarnya mematikan penambang dan full node dengan memaksa mereka masuk ke dalam perulangan tak terbatas? Masalah ini muncul karena masalah dalam ilmu komputer yang dikenal sebagai masalah penghentian (*halting problem*): tidak ada cara untuk mengetahui, dalam kasus umum, apakah suatu program tertentu akan pernah berhenti atau tidak.

Seperti yang dijelaskan di bagian transisi state, solusi kami bekerja dengan mewajibkan sebuah transaksi untuk menetapkan jumlah maksimum langkah komputasi yang diizinkan untuk diambil, dan jika eksekusi memakan waktu lebih lama, komputasi akan dikembalikan (*revert*) tetapi biaya tetap dibayarkan. Pesan bekerja dengan cara yang sama. Untuk menunjukkan motivasi di balik solusi kami, pertimbangkan contoh-contoh berikut:

- Seorang penyerang membuat kontrak yang menjalankan perulangan tak terbatas, dan kemudian mengirimkan transaksi yang mengaktifkan perulangan tersebut ke penambang. Penambang akan memproses transaksi, menjalankan perulangan tak terbatas, dan menunggu hingga kehabisan gas. Meskipun eksekusi kehabisan gas dan berhenti di tengah jalan, transaksi tersebut tetap valid dan penambang tetap mengklaim biaya dari penyerang untuk setiap langkah komputasi.
- Seorang penyerang membuat perulangan tak terbatas yang sangat panjang dengan intensi memaksa penambang untuk terus melakukan komputasi dalam waktu yang sangat lama sehingga pada saat komputasi selesai, beberapa blok lagi akan keluar dan tidak mungkin bagi penambang untuk memasukkan transaksi guna mengklaim biaya. Namun, penyerang akan diwajibkan untuk mengirimkan nilai untuk `STARTGAS` yang membatasi jumlah langkah komputasi yang dapat diambil oleh eksekusi, sehingga penambang akan tahu sebelumnya bahwa komputasi tersebut akan memakan jumlah langkah yang sangat besar.
- Seorang penyerang melihat kontrak dengan kode dalam bentuk seperti `send(A,contract.storage[A]); contract.storage[A] = 0`, dan mengirimkan transaksi dengan gas yang hanya cukup untuk menjalankan langkah pertama tetapi tidak untuk langkah kedua (yaitu, melakukan penarikan tetapi tidak membiarkan saldonya turun). Penulis kontrak tidak perlu khawatir tentang perlindungan terhadap serangan semacam itu, karena jika eksekusi berhenti di tengah jalan, perubahannya akan dikembalikan.
- Sebuah kontrak keuangan bekerja dengan mengambil median dari sembilan umpan data eksklusif untuk meminimalkan risiko. Seorang penyerang mengambil alih salah satu umpan data, yang dirancang agar dapat dimodifikasi melalui mekanisme panggilan alamat variabel yang dijelaskan di bagian tentang DAO, dan mengubahnya untuk menjalankan perulangan tak terbatas, dengan demikian mencoba memaksa setiap upaya untuk mengklaim dana dari kontrak keuangan agar kehabisan gas. Namun, kontrak keuangan dapat menetapkan batas gas pada pesan untuk mencegah masalah ini.

Alternatif untuk kelengkapan Turing adalah ketidaklengkapan Turing (*Turing-incompleteness*), di mana `JUMP` dan `JUMPI` tidak ada dan hanya satu salinan dari setiap kontrak yang diizinkan ada di tumpukan panggilan (*call stack*) pada waktu tertentu. Dengan sistem ini, sistem biaya yang dijelaskan dan ketidakpastian seputar efektivitas solusi kami mungkin tidak diperlukan, karena biaya pelaksanaan kontrak akan dibatasi di atas oleh ukurannya. Selain itu, ketidaklengkapan Turing bahkan bukan batasan yang besar; dari semua contoh kontrak yang telah kami susun secara internal, sejauh ini hanya satu yang membutuhkan perulangan, dan bahkan perulangan itu dapat dihilangkan dengan membuat 26 pengulangan dari sepotong kode satu baris. Mengingat implikasi serius dari kelengkapan Turing, dan manfaatnya yang terbatas, mengapa tidak menggunakan bahasa yang tidak lengkap Turing saja? Namun pada kenyataannya, ketidaklengkapan Turing jauh dari solusi yang rapi untuk masalah tersebut. Untuk melihat alasannya, pertimbangkan kontrak-kontrak berikut:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Sekarang, kirimkan transaksi ke A. Dengan demikian, dalam 51 transaksi, kita memiliki kontrak yang memakan 2<sup>50</sup> langkah komputasi. Penambang dapat mencoba mendeteksi bom logika semacam itu sebelumnya dengan mempertahankan nilai di samping setiap kontrak yang menentukan jumlah maksimum langkah komputasi yang dapat diambilnya, dan menghitung ini untuk kontrak yang memanggil kontrak lain secara rekursif, tetapi itu akan mewajibkan penambang untuk melarang kontrak yang membuat kontrak lain (karena pembuatan dan eksekusi dari semua 26 kontrak di atas dapat dengan mudah digulung menjadi satu kontrak tunggal). Poin bermasalah lainnya adalah bahwa bidang alamat dari sebuah pesan adalah variabel, jadi secara umum mungkin tidak mungkin untuk mengetahui kontrak lain mana yang akan dipanggil oleh kontrak tertentu sebelumnya. Oleh karena itu, secara keseluruhan, kita memiliki kesimpulan yang mengejutkan: kelengkapan Turing secara mengejutkan mudah dikelola, dan kurangnya kelengkapan Turing sama mengejutkannya sulit dikelola kecuali kontrol yang sama persis diterapkan - tetapi dalam hal ini mengapa tidak membiarkan protokol tersebut menjadi lengkap Turing saja?

### Mata Uang dan Penerbitan {#currency-and-issuance}

Jaringan Ethereum mencakup mata uang bawaannya sendiri, ether, yang melayani tujuan ganda yaitu menyediakan lapisan Likuiditas utama untuk memungkinkan pertukaran yang efisien antara berbagai jenis aset digital dan, yang lebih penting, menyediakan mekanisme untuk membayar biaya transaksi. Untuk kenyamanan dan untuk menghindari perdebatan di masa mendatang (lihat perdebatan mBTC/uBTC/satoshi saat ini di Bitcoin), denominasi akan diberi label sebelumnya:

- 1: Wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Ini harus dianggap sebagai versi yang diperluas dari konsep "dolar" dan "sen" atau "BTC" dan "satoshi". Dalam waktu dekat, kami memperkirakan "ether" akan digunakan untuk transaksi biasa, "finney" untuk transaksi mikro, dan "szabo" serta "Wei" untuk diskusi teknis seputar biaya dan implementasi protokol; denominasi yang tersisa mungkin menjadi berguna nanti dan tidak boleh dimasukkan dalam klien pada saat ini.

Model penerbitan akan menjadi sebagai berikut:

- Ether akan dirilis dalam penjualan mata uang dengan harga 1000-2000 ether per BTC, sebuah mekanisme yang dimaksudkan untuk mendanai organisasi Ethereum dan membayar pengembangan yang telah digunakan dengan sukses oleh platform lain seperti Mastercoin dan NXT. Pembeli awal akan mendapat manfaat dari diskon yang lebih besar. BTC yang diterima dari penjualan akan digunakan sepenuhnya untuk membayar gaji dan hadiah (*bounties*) kepada pengembang dan diinvestasikan ke dalam berbagai proyek nirlaba dan berorientasi laba di ekosistem Ethereum dan mata uang kripto.
- 0,099x dari jumlah total yang terjual (60102216 ETH) akan dialokasikan ke organisasi untuk mengkompensasi kontributor awal dan membayar pengeluaran berdenominasi ETH sebelum blok genesis.
- 0,099x dari jumlah total yang terjual akan dipertahankan sebagai cadangan jangka panjang.
- 0,26x dari jumlah total yang terjual akan dialokasikan kepada penambang per tahun selamanya setelah titik tersebut.

| Kelompok | Saat peluncuran | Setelah 1 tahun | Setelah 5 tahun |
| ---------------------- | --------- | ------------ | ------------- |
| Unit mata uang | 1.198X | 1.458X | 2.498X |
| Pembeli | 83.5% | 68.6% | 40.0% |
| Cadangan yang dihabiskan pra-penjualan | 8.26% | 6.79% | 3.96% |
| Cadangan yang digunakan pasca-penjualan | 8.26% | 6.79% | 3.96% |
| Penambang | 0% | 17.8% | 52.0% |

#### Tingkat Pertumbuhan Pasokan Jangka Panjang (persen) {#long-term-supply-growth-rate-percent}

![Ethereum inflation](./ethereum-inflation.png)

_Meskipun penerbitan mata uang linier, sama seperti Bitcoin seiring berjalannya waktu tingkat pertumbuhan pasokan tetap cenderung menuju nol._

Dua pilihan utama dalam model di atas adalah (1) keberadaan dan ukuran kumpulan dana abadi (*endowment pool*), dan (2) keberadaan pasokan linier yang tumbuh secara permanen, berlawanan dengan pasokan yang dibatasi seperti di Bitcoin. Pembenaran dari kumpulan dana abadi adalah sebagai berikut. Jika kumpulan dana abadi tidak ada, dan penerbitan linier dikurangi menjadi 0,217x untuk memberikan tingkat inflasi yang sama, maka jumlah total ether akan menjadi 16,5% lebih sedikit dan dengan demikian setiap unit akan menjadi 19,8% lebih berharga. Oleh karena itu, dalam ekuilibrium 19,8% lebih banyak ether akan dibeli dalam penjualan, sehingga setiap unit akan sekali lagi sama berharganya seperti sebelumnya. Organisasi kemudian juga akan memiliki 1,198x lebih banyak BTC, yang dapat dianggap terbagi menjadi dua bagian: BTC asli, dan tambahan 0,198x. Oleh karena itu, situasi ini _sama persis_ dengan dana abadi, tetapi dengan satu perbedaan penting: organisasi memegang murni BTC, dan dengan demikian tidak diberi insentif untuk mendukung nilai unit ether.

Model pertumbuhan pasokan linier permanen mengurangi risiko dari apa yang dilihat sebagian orang sebagai konsentrasi kekayaan yang berlebihan di Bitcoin, dan memberi individu yang hidup di era sekarang dan masa depan kesempatan yang adil untuk memperoleh unit mata uang, sementara pada saat yang sama mempertahankan insentif yang kuat untuk mendapatkan dan memegang ether karena "tingkat pertumbuhan pasokan" sebagai persentase masih cenderung menuju nol seiring berjalannya waktu. Kami juga berteori bahwa karena koin selalu hilang seiring berjalannya waktu karena kecerobohan, kematian, dll., dan kehilangan koin dapat dimodelkan sebagai persentase dari total pasokan per tahun, bahwa total pasokan mata uang yang beredar pada kenyataannya pada akhirnya akan stabil pada nilai yang sama dengan penerbitan tahunan dibagi dengan tingkat kehilangan (misalnya, pada tingkat kehilangan 1%, setelah pasokan mencapai 26X maka 0,26X akan ditambang dan 0,26X hilang setiap tahun, menciptakan ekuilibrium).

Perhatikan bahwa di masa mendatang, kemungkinan besar Ethereum akan beralih ke model Bukti Kepemilikan (PoS) untuk keamanan, mengurangi persyaratan penerbitan menjadi antara nol dan 0,05X per tahun. Jika organisasi Ethereum kehilangan pendanaan atau karena alasan lain menghilang, kami membiarkan terbuka sebuah "kontrak sosial": siapa pun memiliki hak untuk membuat versi kandidat Ethereum di masa mendatang, dengan satu-satunya syarat adalah bahwa jumlah ether harus paling banyak sama dengan `60102216 * (1.198 + 0.26 * n)` di mana `n` adalah jumlah tahun setelah blok genesis. Pembuat bebas untuk melakukan urun dana (*crowd-sell*) atau sebaliknya menetapkan sebagian atau seluruh perbedaan antara ekspansi pasokan yang didorong oleh PoS dan ekspansi pasokan maksimum yang diizinkan untuk membayar pengembangan. Peningkatan kandidat yang tidak mematuhi kontrak sosial dapat dibenarkan untuk dilakukan percabangan (*fork*) ke dalam versi yang patuh.

### Sentralisasi Penambangan {#mining-centralization}

Algoritma penambangan Bitcoin bekerja dengan meminta penambang menghitung SHA256 pada versi header blok yang sedikit dimodifikasi jutaan kali berulang-ulang, hingga akhirnya satu node muncul dengan versi yang hash-nya kurang dari target (saat ini sekitar 2<sup>192</sup>). Namun, algoritma penambangan ini rentan terhadap dua bentuk sentralisasi. Pertama, ekosistem penambangan telah didominasi oleh ASIC (*application-specific integrated circuits*), cip komputer yang dirancang untuk, dan karenanya ribuan kali lebih efisien pada, tugas spesifik penambangan Bitcoin. Ini berarti bahwa penambangan Bitcoin tidak lagi menjadi pengejaran yang sangat terdesentralisasi dan egaliter, yang membutuhkan modal jutaan dolar untuk berpartisipasi secara efektif. Kedua, sebagian besar penambang Bitcoin sebenarnya tidak melakukan validasi blok secara lokal; sebaliknya, mereka mengandalkan *mining pool* terpusat untuk menyediakan header blok. Masalah ini bisa dibilang lebih buruk: pada saat penulisan ini, tiga *mining pool* teratas secara tidak langsung mengendalikan sekitar 50% kekuatan pemrosesan di jaringan Bitcoin, meskipun ini dimitigasi oleh fakta bahwa penambang dapat beralih ke *mining pool* lain jika sebuah *pool* atau koalisi mencoba serangan 51%.

Intensi saat ini di Ethereum adalah menggunakan algoritma penambangan di mana penambang diwajibkan untuk mengambil data acak dari state, menghitung beberapa transaksi yang dipilih secara acak dari N blok terakhir di rantai blok, dan mengembalikan hash dari hasilnya. Ini memiliki dua manfaat penting. Pertama, kontrak Ethereum dapat mencakup segala jenis komputasi, sehingga ASIC Ethereum pada dasarnya akan menjadi ASIC untuk komputasi umum - yaitu, CPU yang lebih baik. Kedua, penambangan mewajibkan akses ke seluruh rantai blok, memaksa penambang untuk menyimpan seluruh rantai blok dan setidaknya mampu memverifikasi setiap transaksi. Ini menghilangkan kebutuhan akan *mining pool* terpusat; meskipun *mining pool* masih dapat melayani peran yang sah untuk meratakan keacakan distribusi imbalan, fungsi ini dapat dilayani sama baiknya oleh *pool* peer-to-peer tanpa kendali terpusat.

Model ini belum teruji, dan mungkin ada kesulitan di sepanjang jalan dalam menghindari pengoptimalan cerdas tertentu saat menggunakan eksekusi kontrak sebagai algoritma penambangan. Namun, salah satu fitur yang sangat menarik dari algoritma ini adalah bahwa ia memungkinkan siapa saja untuk "meracuni sumur" (*poison the well*), dengan memasukkan sejumlah besar kontrak ke dalam rantai blok yang dirancang khusus untuk menghalangi ASIC tertentu. Insentif ekonomi ada bagi produsen ASIC untuk menggunakan trik semacam itu untuk saling menyerang. Dengan demikian, solusi yang sedang kami kembangkan pada akhirnya adalah solusi manusia ekonomi yang adaptif daripada murni solusi teknis.

### Skalabilitas {#scalability}

Salah satu kekhawatiran umum tentang Ethereum adalah masalah skalabilitas. Seperti Bitcoin, Ethereum menderita kelemahan bahwa setiap transaksi perlu diproses oleh setiap node di jaringan. Dengan Bitcoin, ukuran rantai blok saat ini berada di sekitar 15 GB, tumbuh sekitar 1 MB per jam. Jika jaringan Bitcoin memproses 2000 transaksi per detik seperti Visa, ia akan tumbuh sebesar 1 MB per tiga detik (1 GB per jam, 8 TB per tahun). Ethereum kemungkinan akan mengalami pola pertumbuhan yang serupa, diperburuk oleh fakta bahwa akan ada banyak aplikasi di atas rantai blok Ethereum alih-alih hanya mata uang seperti halnya Bitcoin, tetapi diperbaiki oleh fakta bahwa full node Ethereum hanya perlu menyimpan state alih-alih seluruh riwayat rantai blok.

Masalah dengan ukuran rantai blok yang begitu besar adalah risiko sentralisasi. Jika ukuran rantai blok meningkat menjadi, katakanlah, 100 TB, maka skenario yang mungkin terjadi adalah bahwa hanya sejumlah kecil bisnis besar yang akan menjalankan full node, dengan semua pengguna biasa menggunakan node SPV ringan. Dalam situasi seperti itu, muncul potensi kekhawatiran bahwa full node dapat bersatu dan semuanya setuju untuk berbuat curang dengan cara yang menguntungkan (misalnya, mengubah imbalan blok, memberi diri mereka sendiri BTC). Node ringan tidak akan memiliki cara untuk mendeteksi ini dengan segera. Tentu saja, setidaknya satu full node yang jujur kemungkinan akan ada, dan setelah beberapa jam informasi tentang penipuan tersebut akan bocor melalui saluran seperti Reddit, tetapi pada saat itu sudah terlambat: akan terserah pada pengguna biasa untuk mengatur upaya untuk memasukkan blok yang diberikan ke daftar hitam, masalah koordinasi yang masif dan kemungkinan tidak layak pada skala yang sama dengan melakukan serangan 51% yang sukses. Dalam kasus Bitcoin, ini saat ini menjadi masalah, tetapi ada modifikasi rantai blok yang [disarankan oleh Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) yang akan meringankan masalah ini.

Dalam waktu dekat, Ethereum akan menggunakan dua strategi tambahan untuk mengatasi masalah ini. Pertama, karena algoritma penambangan berbasis rantai blok, setidaknya setiap penambang akan dipaksa menjadi full node, menciptakan batas bawah pada jumlah full node. Kedua dan yang lebih penting, bagaimanapun, kami akan memasukkan akar pohon state perantara di rantai blok setelah memproses setiap transaksi. Bahkan jika validasi blok terpusat, selama ada satu node pemverifikasi yang jujur, masalah sentralisasi dapat dihindari melalui protokol verifikasi. Jika penambang menerbitkan blok yang tidak valid, blok tersebut pasti diformat dengan buruk, atau state `S[n]` tidak benar. Karena `S[0]` diketahui benar, pasti ada beberapa state pertama `S[i]` yang tidak benar di mana `S[i-1]` benar. Node pemverifikasi akan memberikan indeks `i`, bersama dengan "bukti ketidakvalidan" yang terdiri dari subset node pohon Patricia yang perlu memproses `APPLY(S[i-1],TX[i]) -> S[i]`. Node akan dapat menggunakan node tersebut untuk menjalankan bagian komputasi itu, dan melihat bahwa `S[i]` yang dihasilkan tidak cocok dengan `S[i]` yang diberikan.

Serangan lain yang lebih canggih akan melibatkan penambang jahat yang menerbitkan blok yang tidak lengkap, sehingga informasi lengkap bahkan tidak ada untuk menentukan apakah blok tersebut valid atau tidak. Solusi untuk ini adalah protokol tantangan-respons (*challenge-response*): node verifikasi mengeluarkan "tantangan" dalam bentuk indeks transaksi target, dan setelah menerima node, node ringan memperlakukan blok tersebut sebagai tidak tepercaya sampai node lain, baik penambang atau pemverifikasi lain, memberikan subset node Patricia sebagai bukti validitas.

## Kesimpulan {#conclusion}

Protokol Ethereum pada awalnya digagas sebagai versi mata uang kripto yang ditingkatkan, yang menyediakan fitur-fitur canggih seperti eskro pada rantai blok, batas penarikan, kontrak keuangan, pasar perjudian, dan sejenisnya melalui bahasa pemrograman yang sangat umum. Protokol Ethereum tidak akan "mendukung" aplikasi apa pun secara langsung, tetapi keberadaan bahasa pemrograman yang Turing-complete berarti bahwa kontrak arbitrer secara teoretis dapat dibuat untuk jenis transaksi atau aplikasi apa pun. Namun, hal yang lebih menarik tentang Ethereum adalah bahwa protokol Ethereum bergerak jauh melampaui sekadar mata uang. Protokol seputar penyimpanan file terdesentralisasi, komputasi terdesentralisasi, dan pasar prediksi terdesentralisasi, di antara puluhan konsep serupa lainnya, memiliki potensi untuk secara substansial meningkatkan efisiensi industri komputasi, dan memberikan dorongan besar pada protokol peer-to-peer lainnya dengan menambahkan lapisan ekonomi untuk pertama kalinya. Terakhir, ada juga sejumlah besar aplikasi yang sama sekali tidak ada hubungannya dengan uang.

Konsep fungsi transisi state arbitrer seperti yang diimplementasikan oleh protokol Ethereum menyediakan platform dengan potensi yang unik; alih-alih menjadi protokol tujuan tunggal yang tertutup dan ditujukan untuk serangkaian aplikasi tertentu dalam penyimpanan data, perjudian, atau keuangan, Ethereum dirancang agar bersifat terbuka, dan kami percaya bahwa Ethereum sangat cocok untuk berfungsi sebagai lapisan dasar bagi sejumlah besar protokol keuangan maupun non-keuangan di tahun-tahun mendatang.

## Catatan dan Bacaan Lebih Lanjut {#notes-and-further-reading}

### Catatan {#notes}

1. Pembaca yang teliti mungkin menyadari bahwa sebenarnya alamat Bitcoin adalah hash dari kunci publik kurva eliptik, dan bukan kunci publik itu sendiri. Namun, sebenarnya sangat sah dalam terminologi kriptografi untuk menyebut hash kunci publik sebagai kunci publik itu sendiri. Hal ini karena kriptografi Bitcoin dapat dianggap sebagai algoritma tanda tangan digital kustom, di mana kunci publik terdiri dari hash kunci publik ECC, tanda tangan terdiri dari kunci publik ECC yang digabungkan dengan tanda tangan ECC, dan algoritma verifikasi melibatkan pengecekan kunci publik ECC dalam tanda tangan terhadap hash kunci publik ECC yang diberikan sebagai kunci publik dan kemudian memverifikasi tanda tangan ECC terhadap kunci publik ECC.
2. Secara teknis, nilai tengah (median) dari 11 blok sebelumnya.
3. Secara internal, 2 dan "CHARLIE" keduanya adalah angka, dengan yang terakhir berada dalam representasi basis 256 big-endian. Angka dapat bernilai paling sedikit 0 dan paling banyak 2<sup>256</sup>-1.

### Bacaan Lebih Lanjut {#further-reading}

1. [Nilai intrinsik](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Properti pintar](https://en.bitcoin.it/wiki/Smart_Property)
3. [Kontrak pintar](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Bukti kerja yang dapat digunakan kembali](https://nakamotoinstitute.org/finney/rpow/)
6. [Sertifikat properti yang aman dengan otoritas pemilik](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Buku putih Bitcoin](https://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Segitiga Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Buku putih Colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Buku putih Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Perusahaan otonom terdesentralisasi, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Verifikasi pembayaran yang disederhanakan](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Pohon Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Pohon Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ dan Agen Otonom, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn tentang Properti Pintar di Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [RLP Ethereum](/developers/docs/data-structures-and-encoding/rlp/)
20. [Pohon Merkle Patricia Ethereum](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd tentang pohon jumlah Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Untuk sejarah buku putih ini, lihat [wiki ini](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/)._

_Ethereum, seperti banyak proyek perangkat lunak sumber terbuka yang digerakkan oleh komunitas, telah berkembang sejak awal kemunculannya. Untuk mempelajari tentang perkembangan terbaru Ethereum, dan bagaimana perubahan pada protokol dibuat, kami merekomendasikan [panduan ini](/learn/)._
