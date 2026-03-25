---
title: Whitepaper Ethereum
description: Makalah pengantar untuk Ethereum, diterbitkan pada tahun 2013 sebelum peluncurannya.
lang: id
sidebarDepth: 2
hideEditButton: true
---

<WhitepaperBridge />

_Meskipun sudah berusia beberapa tahun, kami mempertahankan makalah asli di bawah ini karena terus berfungsi sebagai referensi yang berguna dan representasi akurat dari [Ethereum](/) serta visinya._

# Whitepaper Ethereum {#ethereum-whitepaper}

## Platform Kontrak Pintar dan Aplikasi Terdesentralisasi Generasi Berikutnya {#a-next-generation-smart-contract-and-decentralized-application-platform}

Pengembangan Bitcoin oleh Satoshi Nakamoto pada tahun 2009 sering dipuji sebagai perkembangan radikal dalam uang dan mata uang, menjadi contoh pertama dari aset digital yang secara bersamaan tidak memiliki dukungan atau "[nilai intrinsik](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" dan tidak ada penerbit atau pengendali terpusat. Namun, bagian lain dari eksperimen Bitcoin yang bisa dibilang lebih penting adalah teknologi blockchain yang mendasarinya sebagai alat konsensus terdistribusi, dan perhatian mulai beralih dengan cepat ke aspek lain dari Bitcoin ini. Aplikasi alternatif dari teknologi blockchain yang sering dikutip termasuk penggunaan aset digital di dalam blockchain untuk mewakili mata uang kustom dan instrumen keuangan ("[colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), kepemilikan perangkat fisik yang mendasarinya ("[properti pintar](https://en.bitcoin.it/wiki/Smart_Property)"), aset non-fungible seperti nama domain ("[Namecoin](http://namecoin.org)"), serta aplikasi yang lebih kompleks yang melibatkan aset digital yang dikendalikan secara langsung oleh sepotong kode yang mengimplementasikan aturan arbitrer ("[kontrak pintar](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") atau bahkan "[organisasi otonom terdesentralisasi](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO) berbasis blockchain. Apa yang ingin disediakan oleh Ethereum adalah blockchain dengan bahasa pemrograman Turing-complete yang sepenuhnya matang dan bawaan yang dapat digunakan untuk membuat "kontrak" yang dapat digunakan untuk menyandikan fungsi transisi status arbitrer, memungkinkan pengguna untuk membuat sistem apa pun yang dijelaskan di atas, serta banyak sistem lain yang belum kita bayangkan, hanya dengan menuliskan logikanya dalam beberapa baris kode.

## Pengantar Bitcoin dan Konsep yang Ada {#introduction-to-bitcoin-and-existing-concepts}

### Sejarah {#history}

Konsep mata uang digital desentralisasi, serta aplikasi alternatif seperti pendaftaran properti, telah ada selama beberapa dekade. Protokol e-cash anonim pada tahun 1980-an dan 1990-an, yang sebagian besar bergantung pada primitif kriptografi yang dikenal sebagai Chaumian blinding, menyediakan mata uang dengan tingkat privasi yang tinggi, tetapi protokol tersebut sebagian besar gagal mendapatkan daya tarik karena ketergantungannya pada perantara terpusat. Pada tahun 1998, [b-money](http://www.weidai.com/bmoney.txt) karya Wei Dai menjadi proposal pertama yang memperkenalkan ide penciptaan uang melalui pemecahan teka-teki komputasi serta konsensus desentralisasi, tetapi proposal tersebut kurang merinci tentang bagaimana konsensus desentralisasi sebenarnya dapat diimplementasikan. Pada tahun 2005, Hal Finney memperkenalkan konsep "[reusable proofs of work](https://nakamotoinstitute.org/finney/rpow/)", sebuah sistem yang menggunakan ide-ide dari b-money bersama dengan teka-teki Hashcash yang sulit secara komputasi dari Adam Back untuk menciptakan konsep mata uang kripto, tetapi sekali lagi gagal mencapai ideal karena bergantung pada komputasi tepercaya sebagai backend. Pada tahun 2009, mata uang desentralisasi untuk pertama kalinya diimplementasikan dalam praktiknya oleh Satoshi Nakamoto, menggabungkan primitif yang sudah mapan untuk mengelola kepemilikan melalui kriptografi kunci publik dengan algoritma konsensus untuk melacak siapa yang memiliki koin, yang dikenal sebagai "proof-of-work".

Mekanisme di balik proof-of-work adalah sebuah terobosan di ruang ini karena secara bersamaan memecahkan dua masalah. Pertama, ini menyediakan algoritma konsensus yang sederhana dan cukup efektif, memungkinkan node di jaringan untuk secara kolektif menyetujui serangkaian pembaruan kanonikal pada status buku besar Bitcoin. Kedua, ini menyediakan mekanisme untuk memungkinkan masuk secara bebas ke dalam proses konsensus, memecahkan masalah politik dalam memutuskan siapa yang berhak memengaruhi konsensus, sekaligus mencegah serangan sybil. Hal ini dilakukan dengan mengganti hambatan formal untuk berpartisipasi, seperti persyaratan untuk terdaftar sebagai entitas unik pada daftar tertentu, dengan hambatan ekonomi - bobot satu node dalam proses pemungutan suara konsensus berbanding lurus dengan daya komputasi yang dibawa oleh node tersebut. Sejak saat itu, pendekatan alternatif telah diusulkan yang disebut _proof-of-stake_, yang menghitung bobot sebuah node sebanding dengan kepemilikan mata uangnya dan bukan sumber daya komputasi; diskusi tentang kelebihan relatif dari kedua pendekatan tersebut berada di luar cakupan makalah ini, tetapi perlu dicatat bahwa kedua pendekatan tersebut dapat digunakan untuk berfungsi sebagai tulang punggung mata uang kripto.

### Bitcoin Sebagai Sistem Transisi Status {#bitcoin-as-a-state-transition-system}

![Transisi status Ethereum](./ethereum-state-transition.png)

Dari sudut pandang teknis, buku besar dari mata uang kripto seperti Bitcoin dapat dianggap sebagai sistem transisi status, di mana terdapat "status" yang terdiri dari status kepemilikan semua bitcoin yang ada dan "fungsi transisi status" yang mengambil status dan transaksi lalu menghasilkan status baru sebagai hasilnya. Dalam sistem perbankan standar, misalnya, status adalah neraca, transaksi adalah permintaan untuk memindahkan $X dari A ke B, dan fungsi transisi status mengurangi nilai di akun A sebesar $X dan meningkatkan nilai di akun B sebesar $X. Jika akun A memiliki kurang dari $X sejak awal, fungsi transisi status akan mengembalikan kesalahan. Oleh karena itu, seseorang dapat mendefinisikannya secara formal:

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

"Status" dalam Bitcoin adalah kumpulan semua koin (secara teknis, "output transaksi yang belum dibelanjakan" atau UTXO) yang telah di-mint dan belum dibelanjakan, dengan setiap UTXO memiliki denominasi dan pemilik (didefinisikan oleh alamat 20-byte yang pada dasarnya adalah kunci publik kriptografi<sup>[fn1](#notes)</sup>). Sebuah transaksi berisi satu atau lebih input, dengan setiap input berisi referensi ke UTXO yang ada dan tanda tangan kriptografi yang dihasilkan oleh kunci pribadi yang terkait dengan alamat pemilik, dan satu atau lebih output, dengan setiap output berisi UTXO baru untuk ditambahkan ke status.

Fungsi transisi status `APPLY(S,TX) -> S'` secara kasar dapat didefinisikan sebagai berikut:

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

Paruh pertama dari langkah pertama mencegah pengirim transaksi membelanjakan koin yang tidak ada, paruh kedua dari langkah pertama mencegah pengirim transaksi membelanjakan koin orang lain, dan langkah kedua menegakkan pelestarian nilai. Untuk menggunakan ini sebagai pembayaran, protokolnya adalah sebagai berikut. Misalkan Alice ingin mengirim 11.7 BTC ke Bob. Pertama, Alice akan mencari sekumpulan UTXO tersedia yang ia miliki yang jumlahnya setidaknya 11.7 BTC. Secara realistis, Alice tidak akan bisa mendapatkan tepat 11.7 BTC; katakanlah jumlah terkecil yang bisa ia dapatkan adalah 6+4+2=12. Ia kemudian membuat transaksi dengan tiga input dan dua output tersebut. Output pertama akan menjadi 11.7 BTC dengan alamat Bob sebagai pemiliknya, dan output kedua akan menjadi "kembalian" 0.3 BTC yang tersisa, dengan pemiliknya adalah Alice sendiri.

### Penambangan {#mining}

![Blok Ethereum](./ethereum-blocks.png)

Jika kita memiliki akses ke layanan terpusat yang dapat dipercaya, sistem ini akan sangat mudah untuk diimplementasikan; ini bisa dikodekan persis seperti yang dijelaskan, menggunakan hard drive server terpusat untuk melacak status. Namun, dengan Bitcoin kita mencoba membangun sistem mata uang desentralisasi, jadi kita perlu menggabungkan sistem transaksi status dengan sistem konsensus untuk memastikan bahwa semua orang setuju pada urutan transaksi. Proses konsensus desentralisasi Bitcoin mengharuskan node di jaringan untuk terus berupaya menghasilkan paket transaksi yang disebut "blok". Jaringan ini dimaksudkan untuk menghasilkan kira-kira satu blok setiap sepuluh menit, dengan setiap blok berisi stempel waktu, nonce, referensi ke (yaitu, hash dari) blok sebelumnya dan daftar semua transaksi yang telah terjadi sejak blok sebelumnya. Seiring waktu, ini menciptakan "blockchain" yang persisten dan terus berkembang yang secara konstan diperbarui untuk mewakili status terbaru dari buku besar Bitcoin.

Algoritma untuk memeriksa apakah sebuah blok valid, yang diekspresikan dalam paradigma ini, adalah sebagai berikut:

1. Periksa apakah blok sebelumnya yang direferensikan oleh blok tersebut ada dan valid.
2. Periksa bahwa stempel waktu blok lebih besar dari blok sebelumnya<sup>[fn2](#notes)</sup> dan kurang dari 2 jam di masa depan
3. Periksa bahwa proof-of-work pada blok tersebut valid.
4. Misalkan `S[0]` adalah status pada akhir blok sebelumnya.
5. Misalkan `TX` adalah daftar transaksi blok dengan `n` transaksi. Untuk semua `i` dalam `0...n-1`, tetapkan `S[i+1] = APPLY(S[i],TX[i])` Jika ada aplikasi yang mengembalikan kesalahan, keluar dan kembalikan false.
6. Kembalikan true, dan daftarkan `S[n]` sebagai status pada akhir blok ini.

Pada dasarnya, setiap transaksi dalam blok harus memberikan transisi status yang valid dari apa yang merupakan status kanonikal sebelum transaksi dieksekusi ke beberapa status baru. Perhatikan bahwa status tidak dikodekan dalam blok dengan cara apa pun; ini murni abstraksi untuk diingat oleh node yang memvalidasi dan hanya dapat dihitung (secara aman) untuk blok mana pun dengan memulai dari status genesis dan secara berurutan menerapkan setiap transaksi di setiap blok. Selain itu, perhatikan bahwa urutan penambang memasukkan transaksi ke dalam blok itu penting; jika ada dua transaksi A dan B dalam sebuah blok sedemikian rupa sehingga B membelanjakan UTXO yang dibuat oleh A, maka blok tersebut akan valid jika A datang sebelum B tetapi tidak sebaliknya.

Satu kondisi validitas yang ada dalam daftar di atas yang tidak ditemukan dalam sistem lain adalah persyaratan untuk "proof-of-work". Kondisi tepatnya adalah bahwa hash double-SHA256 dari setiap blok, yang diperlakukan sebagai angka 256-bit, harus kurang dari target yang disesuaikan secara dinamis, yang pada saat penulisan ini adalah sekitar 2<sup>187</sup>. Tujuan dari ini adalah untuk membuat pembuatan blok menjadi "sulit" secara komputasi, sehingga mencegah penyerang sybil membuat ulang seluruh blockchain untuk keuntungan mereka. Karena SHA256 dirancang untuk menjadi fungsi pseudo-acak yang sama sekali tidak dapat diprediksi, satu-satunya cara untuk membuat blok yang valid hanyalah coba-coba, berulang kali menambahkan nonce dan melihat apakah hash baru cocok.

Pada target saat ini ~2<sup>187</sup>, jaringan harus melakukan rata-rata ~2<sup>69</sup> percobaan sebelum blok yang valid ditemukan; secara umum, target dikalibrasi ulang oleh jaringan setiap 2016 blok sehingga rata-rata blok baru diproduksi oleh beberapa node di jaringan setiap sepuluh menit. Untuk mengkompensasi penambang atas pekerjaan komputasi ini, penambang dari setiap blok berhak untuk memasukkan transaksi yang memberikan diri mereka sendiri 25 BTC dari ketiadaan. Selain itu, jika ada transaksi yang memiliki total denominasi lebih tinggi pada inputnya daripada pada outputnya, selisihnya juga diberikan kepada penambang sebagai "biaya transaksi". Secara kebetulan, ini juga merupakan satu-satunya mekanisme di mana BTC diterbitkan; status genesis tidak mengandung koin sama sekali.

Untuk lebih memahami tujuan penambangan, mari kita periksa apa yang terjadi jika ada penyerang yang berniat jahat. Karena kriptografi yang mendasari Bitcoin diketahui aman, penyerang akan menargetkan satu bagian dari sistem Bitcoin yang tidak dilindungi oleh kriptografi secara langsung: urutan transaksi. Strategi penyerang itu sederhana:

1. Kirim 100 BTC ke pedagang dengan imbalan beberapa produk (sebaiknya barang digital dengan pengiriman cepat)
2. Tunggu pengiriman produk
3. Hasilkan transaksi lain yang mengirimkan 100 BTC yang sama ke dirinya sendiri
4. Cobalah untuk meyakinkan jaringan bahwa transaksinya ke dirinya sendiri adalah yang datang lebih dulu.

Setelah langkah (1) terjadi, setelah beberapa menit beberapa penambang akan memasukkan transaksi ke dalam blok, katakanlah blok nomor 270000. Setelah sekitar satu jam, lima blok lagi akan ditambahkan ke rantai setelah blok tersebut, dengan masing-masing blok tersebut secara tidak langsung menunjuk ke transaksi dan dengan demikian "mengonfirmasi" hal itu. Pada titik ini, pedagang akan menerima pembayaran sebagai final dan mengirimkan produk; karena kita berasumsi ini adalah barang digital, pengirimannya instan. Sekarang, penyerang membuat transaksi lain yang mengirimkan 100 BTC ke dirinya sendiri. Jika penyerang hanya melepaskannya ke alam liar, transaksi tidak akan diproses; penambang akan mencoba menjalankan `APPLY(S,TX)` dan menyadari bahwa `TX` mengonsumsi UTXO yang tidak lagi berada dalam status. Jadi sebagai gantinya, penyerang membuat "fork" dari blockchain, dimulai dengan menambang versi lain dari blok 270000 yang menunjuk ke blok 269999 yang sama sebagai induk tetapi dengan transaksi baru menggantikan yang lama. Karena data blok berbeda, ini memerlukan pengerjaan ulang proof-of-work. Selain itu, versi baru blok 270000 milik penyerang memiliki hash yang berbeda, sehingga blok asli 270001 hingga 270005 tidak "menunjuk" ke sana; dengan demikian, rantai asli dan rantai baru penyerang benar-benar terpisah. Aturannya adalah bahwa dalam sebuah fork, blockchain terpanjang dianggap sebagai kebenaran, dan karenanya penambang yang sah akan bekerja pada rantai 270005 sementara penyerang sendirian bekerja pada rantai 270000. Agar penyerang dapat membuat blockchain-nya menjadi yang terpanjang, ia harus memiliki daya komputasi yang lebih besar daripada gabungan seluruh jaringan untuk mengejar ketertinggalan (karenanya, "serangan 51%").

### Pohon Merkle {#merkle-trees}

![SPV di Bitcoin](./spv-bitcoin.png)

_Kiri: cukup dengan menyajikan hanya sejumlah kecil node dalam pohon Merkle untuk memberikan bukti validitas sebuah cabang._

_Kanan: setiap upaya untuk mengubah bagian mana pun dari pohon Merkle pada akhirnya akan menyebabkan ketidakkonsistenan di suatu tempat di atas rantai._

Fitur skalabilitas penting dari Bitcoin adalah bahwa blok disimpan dalam struktur data multi-level. "Hash" dari sebuah blok sebenarnya hanyalah hash dari header blok, sepotong data sekitar 200-byte yang berisi stempel waktu, nonce, hash blok sebelumnya dan hash root dari struktur data yang disebut pohon Merkle yang menyimpan semua transaksi di dalam blok. Pohon Merkle adalah jenis pohon biner, terdiri dari sekumpulan node dengan sejumlah besar node daun di bagian bawah pohon yang berisi data yang mendasarinya, sekumpulan node perantara di mana setiap node adalah hash dari dua anaknya, dan akhirnya satu node root, juga dibentuk dari hash kedua anaknya, yang mewakili "puncak" pohon. Tujuan dari pohon Merkle adalah untuk memungkinkan data dalam sebuah blok dikirimkan sedikit demi sedikit: sebuah node dapat mengunduh hanya header dari sebuah blok dari satu sumber, bagian kecil dari pohon yang relevan bagi mereka dari sumber lain, dan tetap yakin bahwa semua data tersebut benar. Alasan mengapa ini berhasil adalah karena hash merambat ke atas: jika pengguna jahat mencoba menukar transaksi palsu ke bagian bawah pohon Merkle, perubahan ini akan menyebabkan perubahan pada node di atasnya, dan kemudian perubahan pada node di atasnya lagi, yang pada akhirnya mengubah root pohon dan karenanya hash dari blok tersebut, menyebabkan protokol mendaftarkannya sebagai blok yang sama sekali berbeda (hampir pasti dengan proof-of-work yang tidak valid).

Protokol pohon Merkle bisa dibilang sangat penting untuk keberlanjutan jangka panjang. Sebuah "full node" di jaringan Bitcoin, yang menyimpan dan memproses keseluruhan setiap blok, memakan sekitar 15 GB ruang disk di jaringan Bitcoin pada April 2014, dan bertambah lebih dari satu gigabyte per bulan. Saat ini, hal ini layak untuk beberapa komputer desktop dan bukan ponsel, dan di masa depan hanya bisnis dan penghobi yang dapat berpartisipasi. Sebuah protokol yang dikenal sebagai "simplified payment verification" (SPV) memungkinkan kelas node lain untuk ada, yang disebut "light node", yang mengunduh header blok, memverifikasi proof-of-work pada header blok, dan kemudian mengunduh hanya "cabang" yang terkait dengan transaksi yang relevan bagi mereka. Ini memungkinkan light node untuk menentukan dengan jaminan keamanan yang kuat apa status dari setiap transaksi Bitcoin, dan saldo mereka saat ini, sambil mengunduh hanya sebagian kecil dari seluruh blockchain.

### Aplikasi Blockchain Alternatif {#alternative-blockchain-applications}

Gagasan untuk mengambil ide blockchain yang mendasarinya dan menerapkannya pada konsep lain juga memiliki sejarah panjang. Pada tahun 2005, Nick Szabo muncul dengan konsep "[secure property titles with owner authority](https://nakamotoinstitute.org/library/secure-property-titles/)", sebuah dokumen yang menjelaskan bagaimana "kemajuan baru dalam teknologi basis data yang direplikasi" akan memungkinkan sistem berbasis blockchain untuk menyimpan registri siapa yang memiliki tanah apa, menciptakan kerangka kerja yang rumit termasuk konsep-konsep seperti homesteading, adverse possession, dan pajak tanah Georgia. Namun, sayangnya tidak ada sistem basis data replikasi yang efektif yang tersedia pada saat itu, sehingga protokol tersebut tidak pernah diimplementasikan dalam praktiknya. Namun, setelah tahun 2009, setelah konsensus desentralisasi Bitcoin dikembangkan, sejumlah aplikasi alternatif dengan cepat mulai bermunculan.

- **Namecoin** - dibuat pada tahun 2010, [Namecoin](https://namecoin.org/) paling baik digambarkan sebagai basis data pendaftaran nama desentralisasi. Dalam protokol desentralisasi seperti Tor, Bitcoin, dan BitMessage, perlu ada cara untuk mengidentifikasi akun sehingga orang lain dapat berinteraksi dengan mereka, tetapi dalam semua solusi yang ada, satu-satunya jenis pengidentifikasi yang tersedia adalah hash pseudo-acak seperti `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idealnya, seseorang ingin dapat memiliki akun dengan nama seperti "george". Namun, masalahnya adalah jika satu orang dapat membuat akun bernama "george" maka orang lain dapat menggunakan proses yang sama untuk mendaftarkan "george" untuk diri mereka sendiri juga dan meniru mereka. Satu-satunya solusi adalah paradigma first-to-file, di mana pendaftar pertama berhasil dan yang kedua gagal - masalah yang sangat cocok untuk protokol konsensus Bitcoin. Namecoin adalah implementasi tertua, dan paling sukses, dari sistem pendaftaran nama yang menggunakan ide semacam itu.
- **Colored coins** - tujuan dari [colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) adalah untuk berfungsi sebagai protokol yang memungkinkan orang untuk membuat mata uang digital mereka sendiri - atau, dalam kasus sepele yang penting dari mata uang dengan satu unit, token digital, di blockchain Bitcoin. Dalam protokol colored coins, seseorang "menerbitkan" mata uang baru dengan secara publik menetapkan warna ke UTXO Bitcoin tertentu, dan protokol secara rekursif mendefinisikan warna UTXO lain agar sama dengan warna input yang dihabiskan oleh transaksi yang membuatnya (beberapa aturan khusus berlaku dalam kasus input warna campuran). Ini memungkinkan pengguna untuk memelihara dompet yang hanya berisi UTXO dengan warna tertentu dan mengirimkannya seperti bitcoin biasa, melacak mundur melalui blockchain untuk menentukan warna UTXO apa pun yang mereka terima.
- **Metacoins** - ide di balik metacoin adalah memiliki protokol yang hidup di atas Bitcoin, menggunakan transaksi Bitcoin untuk menyimpan transaksi metacoin tetapi memiliki fungsi transisi status yang berbeda, `APPLY'`. Karena protokol metacoin tidak dapat mencegah transaksi metacoin yang tidak valid muncul di blockchain Bitcoin, sebuah aturan ditambahkan bahwa jika `APPLY'(S,TX)` mengembalikan kesalahan, protokol secara default menjadi `APPLY'(S,TX) = S`. Ini menyediakan mekanisme yang mudah untuk membuat protokol mata uang kripto arbitrer, berpotensi dengan fitur-fitur canggih yang tidak dapat diimplementasikan di dalam Bitcoin itu sendiri, tetapi dengan biaya pengembangan yang sangat rendah karena kompleksitas penambangan dan jaringan sudah ditangani oleh protokol Bitcoin. Metacoins telah digunakan untuk mengimplementasikan beberapa kelas kontrak keuangan, pendaftaran nama, dan pertukaran terdesentralisasi.

Jadi, secara umum, ada dua pendekatan untuk membangun protokol konsensus: membangun jaringan independen, dan membangun protokol di atas Bitcoin. Pendekatan pertama, meskipun cukup berhasil dalam kasus aplikasi seperti Namecoin, sulit untuk diimplementasikan; setiap implementasi individu perlu mem-bootstrap blockchain independen, serta membangun dan menguji semua transisi status dan kode jaringan yang diperlukan. Selain itu, kami memprediksi bahwa serangkaian aplikasi untuk teknologi konsensus desentralisasi akan mengikuti distribusi hukum pangkat di mana sebagian besar aplikasi akan terlalu kecil untuk menjamin blockchain mereka sendiri, dan kami mencatat bahwa ada kelas besar aplikasi terdesentralisasi, khususnya organisasi otonom terdesentralisasi, yang perlu berinteraksi satu sama lain.

Pendekatan berbasis Bitcoin, di sisi lain, memiliki kelemahan bahwa ia tidak mewarisi fitur simplified payment verification dari Bitcoin. SPV berfungsi untuk Bitcoin karena dapat menggunakan kedalaman blockchain sebagai proksi untuk validitas; pada titik tertentu, setelah leluhur dari sebuah transaksi mundur cukup jauh, aman untuk mengatakan bahwa mereka secara sah merupakan bagian dari status. Meta-protokol berbasis blockchain, di sisi lain, tidak dapat memaksa blockchain untuk tidak menyertakan transaksi yang tidak valid dalam konteks protokol mereka sendiri. Oleh karena itu, implementasi meta-protokol SPV yang sepenuhnya aman perlu memindai mundur hingga ke awal blockchain Bitcoin untuk menentukan apakah transaksi tertentu valid atau tidak. Saat ini, semua implementasi "ringan" dari meta-protokol berbasis Bitcoin bergantung pada server tepercaya untuk menyediakan data, bisa dibilang hasil yang sangat suboptimal terutama ketika salah satu tujuan utama dari mata uang kripto adalah untuk menghilangkan kebutuhan akan kepercayaan.

### Pembuatan Skrip {#scripting}

Bahkan tanpa ekstensi apa pun, protokol Bitcoin sebenarnya memfasilitasi versi lemah dari konsep "kontrak pintar". UTXO di Bitcoin dapat dimiliki tidak hanya oleh kunci publik, tetapi juga oleh skrip yang lebih rumit yang diekspresikan dalam bahasa pemrograman berbasis tumpukan sederhana. Dalam paradigma ini, transaksi yang membelanjakan UTXO tersebut harus menyediakan data yang memenuhi skrip. Memang, bahkan mekanisme kepemilikan kunci publik dasar diimplementasikan melalui skrip: skrip mengambil tanda tangan kurva eliptik sebagai input, memverifikasinya terhadap transaksi dan alamat yang memiliki UTXO, dan mengembalikan 1 jika verifikasi berhasil dan 0 jika sebaliknya. Skrip lain yang lebih rumit ada untuk berbagai kasus penggunaan tambahan. Misalnya, seseorang dapat membuat skrip yang memerlukan tanda tangan dari dua dari tiga kunci pribadi yang diberikan untuk memvalidasi ("multi tanda tangan"), pengaturan yang berguna untuk akun perusahaan, akun tabungan yang aman, dan beberapa situasi escrow pedagang. Skrip juga dapat digunakan untuk membayar hadiah untuk solusi masalah komputasi, dan seseorang bahkan dapat membuat skrip yang mengatakan sesuatu seperti "UTXO Bitcoin ini milik Anda jika Anda dapat memberikan bukti SPV bahwa Anda mengirim transaksi Dogecoin dengan denominasi ini kepada saya", yang pada dasarnya memungkinkan pertukaran lintas mata uang kripto desentralisasi.

Namun, bahasa skrip seperti yang diimplementasikan dalam Bitcoin memiliki beberapa batasan penting:

- **Kurangnya kelengkapan Turing (Turing-completeness)** - artinya, meskipun ada sebagian besar komputasi yang didukung oleh bahasa skrip Bitcoin, ia hampir tidak mendukung semuanya. Kategori utama yang hilang adalah loop. Ini dilakukan untuk menghindari loop tak terbatas selama verifikasi transaksi; secara teoritis ini adalah hambatan yang dapat diatasi oleh pemrogram skrip, karena loop apa pun dapat disimulasikan hanya dengan mengulangi kode yang mendasarinya berkali-kali dengan pernyataan if, tetapi ini mengarah pada skrip yang sangat tidak efisien ruang. Misalnya, mengimplementasikan algoritma tanda tangan kurva eliptik alternatif kemungkinan akan membutuhkan 256 putaran perkalian berulang yang semuanya dimasukkan secara individual ke dalam kode.
- **Kebutaan nilai (Value-blindness)** - tidak ada cara bagi skrip UTXO untuk memberikan kontrol terperinci atas jumlah yang dapat ditarik. Misalnya, salah satu kasus penggunaan yang kuat dari kontrak oracle adalah kontrak lindung nilai, di mana A dan B memasukkan BTC senilai $1000 dan setelah 30 hari skrip mengirimkan BTC senilai $1000 ke A dan sisanya ke B. Ini akan membutuhkan oracle untuk menentukan nilai 1 BTC dalam USD, tetapi meskipun demikian, ini merupakan peningkatan besar dalam hal kepercayaan dan persyaratan infrastruktur dibandingkan solusi yang sepenuhnya terpusat yang tersedia sekarang. Namun, karena UTXO bersifat semua-atau-tidak-sama-sekali, satu-satunya cara untuk mencapai ini adalah melalui peretasan yang sangat tidak efisien dengan memiliki banyak UTXO dari berbagai denominasi (misalnya, satu UTXO dari 2<sup>k</sup> untuk setiap k hingga 30) dan meminta oracle memilih UTXO mana yang akan dikirim ke A dan mana yang ke B.
- **Kurangnya status** - UTXO dapat dibelanjakan atau tidak dibelanjakan; tidak ada peluang untuk kontrak multi-tahap atau skrip yang menyimpan status internal lainnya di luar itu. Ini membuatnya sulit untuk membuat kontrak opsi multi-tahap, penawaran pertukaran terdesentralisasi, atau protokol komitmen kriptografi dua tahap (diperlukan untuk hadiah komputasi yang aman). Ini juga berarti bahwa UTXO hanya dapat digunakan untuk membangun kontrak sederhana yang hanya sekali pakai dan bukan kontrak "stateful" yang lebih kompleks seperti organisasi desentralisasi, dan membuat meta-protokol sulit untuk diimplementasikan. Status biner yang dikombinasikan dengan kebutaan nilai juga berarti bahwa aplikasi penting lainnya, batas penarikan, tidak mungkin dilakukan.
- **Kebutaan blockchain** - UTXO buta terhadap data blockchain seperti nonce, stempel waktu, dan hash blok sebelumnya. Ini sangat membatasi aplikasi dalam perjudian, dan beberapa kategori lainnya, dengan menghilangkan bahasa skrip dari sumber keacakan yang berpotensi berharga.

Jadi, kita melihat tiga pendekatan untuk membangun aplikasi tingkat lanjut di atas mata uang kripto: membangun blockchain baru, menggunakan skrip di atas Bitcoin, dan membangun meta-protokol di atas Bitcoin. Membangun blockchain baru memungkinkan kebebasan tak terbatas dalam membangun serangkaian fitur, tetapi dengan mengorbankan waktu pengembangan, upaya bootstrapping, dan keamanan. Menggunakan skrip mudah diimplementasikan dan distandarisasi, tetapi sangat terbatas dalam kemampuannya, dan meta-protokol, meskipun mudah, menderita kesalahan dalam skalabilitas. Dengan Ethereum, kami bermaksud untuk membangun kerangka kerja alternatif yang memberikan keuntungan yang lebih besar dalam kemudahan pengembangan serta properti klien ringan yang lebih kuat, sementara pada saat yang sama memungkinkan aplikasi untuk berbagi lingkungan ekonomi dan keamanan blockchain.

## Ethereum {#ethereum}

Tujuan dari Ethereum adalah untuk membuat protokol alternatif untuk membangun aplikasi terdesentralisasi, memberikan serangkaian pertukaran (tradeoff) berbeda yang kami yakini akan sangat berguna untuk kelas besar aplikasi terdesentralisasi, dengan penekanan khusus pada situasi di mana waktu pengembangan yang cepat, keamanan untuk aplikasi kecil dan jarang digunakan, serta kemampuan berbagai aplikasi untuk berinteraksi dengan sangat efisien, adalah hal yang penting. Ethereum melakukan ini dengan membangun apa yang pada dasarnya merupakan lapisan dasar abstrak yang paling utama: sebuah blockchain dengan bahasa pemrograman Turing-complete bawaan, yang memungkinkan siapa saja untuk menulis kontrak pintar dan aplikasi terdesentralisasi di mana mereka dapat membuat aturan arbitrer mereka sendiri untuk kepemilikan, format transaksi, dan fungsi transisi status. Versi dasar dari Namecoin dapat ditulis dalam dua baris kode, dan protokol lain seperti mata uang dan sistem reputasi dapat dibangun dalam waktu kurang dari dua puluh baris. Kontrak pintar, "kotak" kriptografi yang berisi nilai dan hanya membukanya jika kondisi tertentu terpenuhi, juga dapat dibangun di atas platform ini, dengan kekuatan yang jauh lebih besar daripada yang ditawarkan oleh skrip Bitcoin karena adanya tambahan kekuatan dari Turing-completeness, kesadaran nilai (value-awareness), kesadaran blockchain (blockchain-awareness), dan status.

### Akun Ethereum {#ethereum-accounts}

Di Ethereum, status terdiri dari objek yang disebut "akun", dengan setiap akun memiliki alamat 20-byte dan transisi status berupa transfer nilai dan informasi secara langsung antar akun. Sebuah akun Ethereum berisi empat bidang:

- **nonce**, sebuah penghitung yang digunakan untuk memastikan setiap transaksi hanya dapat diproses satu kali
- **Saldo ether** akun saat ini
- **Kode kontrak** akun, jika ada
- **Penyimpanan** akun (kosong secara default)

"Ether" adalah bahan bakar kripto internal utama Ethereum, dan digunakan untuk membayar biaya transaksi. Secara umum, ada dua jenis akun: **akun yang dimiliki secara eksternal**, yang dikendalikan oleh kunci pribadi, dan **akun kontrak**, yang dikendalikan oleh kode kontraknya. Akun yang dimiliki secara eksternal tidak memiliki kode, dan seseorang dapat mengirim pesan dari akun yang dimiliki secara eksternal dengan membuat dan menandatangani sebuah transaksi; dalam akun kontrak, setiap kali akun kontrak menerima pesan, kodenya akan aktif, memungkinkannya untuk membaca dan menulis ke penyimpanan internal serta mengirim pesan lain atau membuat kontrak secara bergantian.

Perhatikan bahwa "kontrak" di Ethereum tidak boleh dilihat sebagai sesuatu yang harus "dipenuhi" atau "dipatuhi"; melainkan, mereka lebih seperti "agen otonom" yang hidup di dalam lingkungan eksekusi Ethereum, selalu mengeksekusi bagian kode tertentu ketika "dicolek" oleh pesan atau transaksi, dan memiliki kendali langsung atas saldo ether mereka sendiri serta penyimpanan kunci/nilai mereka sendiri untuk melacak variabel yang persisten.

### Pesan dan Transaksi {#messages-and-transactions}

Istilah "transaksi" digunakan di Ethereum untuk merujuk pada paket data yang ditandatangani yang menyimpan pesan untuk dikirim dari akun yang dimiliki secara eksternal. Transaksi berisi:

- Penerima pesan
- Tanda tangan yang mengidentifikasi pengirim
- Jumlah ether yang akan ditransfer dari pengirim ke penerima
- Bidang data opsional
- Nilai `STARTGAS`, yang mewakili jumlah maksimum langkah komputasi yang diizinkan untuk diambil oleh eksekusi transaksi
- Nilai `GASPRICE`, yang mewakili biaya yang dibayar pengirim per langkah komputasi

Tiga yang pertama adalah bidang standar yang diharapkan dalam mata uang kripto apa pun. Bidang data tidak memiliki fungsi secara default, tetapi mesin virtual memiliki opcode yang dapat digunakan kontrak untuk mengakses data tersebut; sebagai contoh kasus penggunaan, jika sebuah kontrak berfungsi sebagai layanan pendaftaran domain on-blockchain, maka kontrak tersebut mungkin ingin menafsirkan data yang diteruskan kepadanya sebagai berisi dua "bidang", bidang pertama adalah domain yang akan didaftarkan dan bidang kedua adalah alamat IP untuk mendaftarkannya. Kontrak akan membaca nilai-nilai ini dari data pesan dan menempatkannya dengan tepat di penyimpanan.

Bidang `STARTGAS` dan `GASPRICE` sangat penting untuk model anti-penolakan layanan (anti-denial of service) Ethereum. Untuk mencegah perulangan tak terbatas yang tidak disengaja atau bermusuhan atau pemborosan komputasi lainnya dalam kode, setiap transaksi diharuskan untuk menetapkan batas berapa banyak langkah komputasi eksekusi kode yang dapat digunakannya. Unit dasar komputasi adalah "gas"; biasanya, satu langkah komputasi berbiaya 1 gas, tetapi beberapa operasi berbiaya gas lebih tinggi karena secara komputasi lebih mahal, atau meningkatkan jumlah data yang harus disimpan sebagai bagian dari status. Ada juga biaya sebesar 5 gas untuk setiap byte dalam data transaksi. Tujuan dari sistem biaya ini adalah untuk mengharuskan penyerang membayar secara proporsional untuk setiap sumber daya yang mereka konsumsi, termasuk komputasi, bandwidth, dan penyimpanan; oleh karena itu, setiap transaksi yang menyebabkan jaringan mengonsumsi jumlah yang lebih besar dari salah satu sumber daya ini harus memiliki biaya gas yang kira-kira proporsional dengan peningkatannya.

### Pesan {#messages}

Kontrak memiliki kemampuan untuk mengirim "pesan" ke kontrak lain. Pesan adalah objek virtual yang tidak pernah diserialisasi dan hanya ada di lingkungan eksekusi Ethereum. Sebuah pesan berisi:

- Pengirim pesan (implisit)
- Penerima pesan
- Jumlah ether yang akan ditransfer bersama pesan
- Bidang data opsional
- Nilai `STARTGAS`

Pada dasarnya, pesan itu seperti transaksi, kecuali bahwa pesan tersebut diproduksi oleh kontrak dan bukan aktor eksternal. Sebuah pesan diproduksi ketika kontrak yang sedang mengeksekusi kode mengeksekusi opcode `CALL`, yang memproduksi dan mengeksekusi pesan. Seperti halnya transaksi, pesan menyebabkan akun penerima menjalankan kodenya. Dengan demikian, kontrak dapat memiliki hubungan dengan kontrak lain dengan cara yang persis sama seperti yang dapat dilakukan oleh aktor eksternal.

Perhatikan bahwa jatah gas yang ditetapkan oleh transaksi atau kontrak berlaku untuk total gas yang dikonsumsi oleh transaksi tersebut dan semua sub-eksekusi. Misalnya, jika aktor eksternal A mengirim transaksi ke B dengan 1000 gas, dan B mengonsumsi 600 gas sebelum mengirim pesan ke C, dan eksekusi internal C mengonsumsi 300 gas sebelum kembali, maka B dapat menghabiskan 100 gas lagi sebelum kehabisan gas.

### Fungsi Transisi Status Ethereum {#ethereum-state-transition-function}

![Transisi status Ether](./ether-state-transition.png)

Fungsi transisi status Ethereum, `APPLY(S,TX) -> S'` dapat didefinisikan sebagai berikut:

1. Periksa apakah transaksi terbentuk dengan baik (yaitu, memiliki jumlah nilai yang tepat), tanda tangannya valid, dan nonce cocok dengan nonce di akun pengirim. Jika tidak, kembalikan kesalahan.
2. Hitung biaya transaksi sebagai `STARTGAS * GASPRICE`, dan tentukan alamat pengiriman dari tanda tangan. Kurangi biaya dari saldo akun pengirim dan tingkatkan nonce pengirim. Jika tidak ada cukup saldo untuk dibelanjakan, kembalikan kesalahan.
3. Inisialisasi `GAS = STARTGAS`, dan kurangi sejumlah gas per byte untuk membayar byte dalam transaksi.
4. Transfer nilai transaksi dari akun pengirim ke akun penerima. Jika akun penerima belum ada, buatlah. Jika akun penerima adalah kontrak, jalankan kode kontrak baik sampai selesai atau sampai eksekusi kehabisan gas.
5. Jika transfer nilai gagal karena pengirim tidak memiliki cukup uang, atau eksekusi kode kehabisan gas, kembalikan semua perubahan status kecuali pembayaran biaya, dan tambahkan biaya ke akun penambang.
6. Jika tidak, kembalikan biaya untuk semua gas yang tersisa kepada pengirim, dan kirim biaya yang dibayarkan untuk gas yang dikonsumsi ke penambang.

Sebagai contoh, misalkan kode kontraknya adalah:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Perhatikan bahwa pada kenyataannya kode kontrak ditulis dalam kode EVM tingkat rendah; contoh ini ditulis dalam Serpent, salah satu bahasa tingkat tinggi kami, untuk kejelasan, dan dapat dikompilasi menjadi kode EVM. Misalkan penyimpanan kontrak dimulai dalam keadaan kosong, dan sebuah transaksi dikirim dengan nilai 10 ether, 2000 gas, harga gas 0,001 ether, dan 64 byte data, dengan byte 0-31 mewakili angka `2` dan byte 32-63 mewakili string `CHARLIE`. Proses untuk fungsi transisi status dalam kasus ini adalah sebagai berikut:

1. Periksa apakah transaksi valid dan terbentuk dengan baik.
2. Periksa apakah pengirim transaksi memiliki setidaknya 2000 \* 0,001 = 2 ether. Jika ya, maka kurangi 2 ether dari akun pengirim.
3. Inisialisasi gas = 2000; dengan asumsi transaksi panjangnya 170 byte dan biaya per byte adalah 5, kurangi 850 sehingga tersisa 1150 gas.
4. Kurangi 10 ether lagi dari akun pengirim, dan tambahkan ke akun kontrak.
5. Jalankan kode. Dalam kasus ini, ini sederhana: ia memeriksa apakah penyimpanan kontrak pada indeks `2` digunakan, menyadari bahwa itu tidak digunakan, dan karenanya ia menetapkan penyimpanan pada indeks `2` ke nilai `CHARLIE`. Misalkan ini membutuhkan 187 gas, jadi jumlah gas yang tersisa adalah 1150 - 187 = 963
6. Tambahkan 963 \* 0,001 = 0,963 ether kembali ke akun pengirim, dan kembalikan status yang dihasilkan.

Jika tidak ada kontrak di ujung penerima transaksi, maka total biaya transaksi hanya akan sama dengan `GASPRICE` yang diberikan dikalikan dengan panjang transaksi dalam byte, dan data yang dikirim bersama transaksi akan menjadi tidak relevan.

Perhatikan bahwa pesan bekerja secara ekuivalen dengan transaksi dalam hal pengembalian (revert): jika eksekusi pesan kehabisan gas, maka eksekusi pesan tersebut, dan semua eksekusi lain yang dipicu oleh eksekusi tersebut, akan dikembalikan, tetapi eksekusi induk tidak perlu dikembalikan. Ini berarti "aman" bagi sebuah kontrak untuk memanggil kontrak lain, seolah-olah A memanggil B dengan gas G maka eksekusi A dijamin akan kehilangan paling banyak gas G. Terakhir, perhatikan bahwa ada opcode, `CREATE`, yang membuat kontrak; mekanika eksekusinya umumnya mirip dengan `CALL`, dengan pengecualian bahwa output dari eksekusi menentukan kode dari kontrak yang baru dibuat.

### Eksekusi Kode {#code-execution}

Kode dalam kontrak Ethereum ditulis dalam bahasa bytecode berbasis tumpukan (stack) tingkat rendah, yang disebut sebagai "kode Mesin Virtual Ethereum" atau "kode EVM". Kode tersebut terdiri dari serangkaian byte, di mana setiap byte mewakili sebuah operasi. Secara umum, eksekusi kode adalah perulangan tak terbatas yang terdiri dari berulang kali melakukan operasi pada penghitung program saat ini (yang dimulai dari nol) dan kemudian meningkatkan penghitung program sebesar satu, sampai akhir kode tercapai atau kesalahan atau instruksi `STOP` atau `RETURN` terdeteksi. Operasi memiliki akses ke tiga jenis ruang untuk menyimpan data:

- **Tumpukan (stack)**, wadah masuk-terakhir-keluar-pertama (last-in-first-out) di mana nilai dapat didorong (push) dan ditarik (pop)
- **Memori**, array byte yang dapat diperluas tanpa batas
- **Penyimpanan** jangka panjang kontrak, sebuah penyimpanan kunci/nilai. Tidak seperti tumpukan dan memori, yang diatur ulang setelah komputasi berakhir, penyimpanan bertahan untuk jangka panjang.

Kode juga dapat mengakses nilai, pengirim, dan data dari pesan yang masuk, serta data header blok, dan kode juga dapat mengembalikan array byte data sebagai output.

Model eksekusi formal dari kode EVM secara mengejutkan sangat sederhana. Saat Mesin Virtual Ethereum berjalan, status komputasi penuhnya dapat didefinisikan oleh tuple `(block_state, transaction, message, code, memory, stack, pc, gas)`, di mana `block_state` adalah status global yang berisi semua akun dan mencakup saldo serta penyimpanan. Pada awal setiap putaran eksekusi, instruksi saat ini ditemukan dengan mengambil byte ke-`pc` dari `code` (atau 0 jika `pc >= len(code)`), dan setiap instruksi memiliki definisinya sendiri dalam hal bagaimana hal itu memengaruhi tuple. Misalnya, `ADD` menarik dua item dari tumpukan dan mendorong jumlahnya, mengurangi `gas` sebesar 1 dan meningkatkan `pc` sebesar 1, dan `SSTORE` menarik dua item teratas dari tumpukan dan memasukkan item kedua ke dalam penyimpanan kontrak pada indeks yang ditentukan oleh item pertama. Meskipun ada banyak cara untuk mengoptimalkan eksekusi Mesin Virtual Ethereum melalui kompilasi just-in-time, implementasi dasar Ethereum dapat dilakukan dalam beberapa ratus baris kode.

### Blockchain dan Penambangan {#blockchain-and-mining}

![Diagram blok penerapan Ethereum](./ethereum-apply-block-diagram.png)

Blockchain Ethereum dalam banyak hal mirip dengan blockchain Bitcoin, meskipun memiliki beberapa perbedaan. Perbedaan utama antara Ethereum dan Bitcoin sehubungan dengan arsitektur blockchain adalah bahwa, tidak seperti Bitcoin, blok Ethereum berisi salinan daftar transaksi dan status terbaru. Selain itu, dua nilai lainnya, nomor blok dan tingkat kesulitan, juga disimpan di dalam blok. Algoritma validasi blok dasar di Ethereum adalah sebagai berikut:

1. Periksa apakah blok sebelumnya yang direferensikan ada dan valid.
2. Periksa apakah stempel waktu blok lebih besar dari blok sebelumnya yang direferensikan dan kurang dari 15 menit ke masa depan
3. Periksa apakah nomor blok, tingkat kesulitan, akar transaksi, akar paman (uncle root), dan batas gas (berbagai konsep tingkat rendah khusus Ethereum) valid.
4. Periksa apakah proof-of-work pada blok tersebut valid.
5. Misalkan `S[0]` adalah status pada akhir blok sebelumnya.
6. Misalkan `TX` adalah daftar transaksi blok, dengan `n` transaksi. Untuk semua `i` dalam `0...n-1`, tetapkan `S[i+1] = APPLY(S[i],TX[i])`. Jika ada aplikasi yang mengembalikan kesalahan, atau jika total gas yang dikonsumsi dalam blok hingga titik ini melebihi `GASLIMIT`, kembalikan kesalahan.
7. Misalkan `S_FINAL` adalah `S[n]`, tetapi menambahkan hadiah blok yang dibayarkan kepada penambang.
8. Periksa apakah akar pohon Merkle dari status `S_FINAL` sama dengan akar status akhir yang disediakan di header blok. Jika ya, blok tersebut valid; jika tidak, blok tersebut tidak valid.

Pendekatan ini mungkin tampak sangat tidak efisien pada pandangan pertama, karena perlu menyimpan seluruh status dengan setiap blok, tetapi pada kenyataannya efisiensinya harus sebanding dengan Bitcoin. Alasannya adalah bahwa status disimpan dalam struktur pohon, dan setelah setiap blok hanya sebagian kecil dari pohon yang perlu diubah. Dengan demikian, secara umum, di antara dua blok yang berdekatan, sebagian besar pohon harus sama, dan oleh karena itu data dapat disimpan sekali dan direferensikan dua kali menggunakan penunjuk (yaitu, hash dari sub-pohon). Jenis pohon khusus yang dikenal sebagai "pohon Patricia" digunakan untuk mencapai hal ini, termasuk modifikasi pada konsep pohon Merkle yang memungkinkan node untuk disisipkan dan dihapus, dan tidak hanya diubah, secara efisien. Selain itu, karena semua informasi status adalah bagian dari blok terakhir, tidak perlu menyimpan seluruh riwayat blockchain - sebuah strategi yang, jika dapat diterapkan pada Bitcoin, dapat dihitung untuk memberikan penghematan ruang 5-20x.

Pertanyaan yang sering diajukan adalah "di mana" kode kontrak dieksekusi, dalam hal perangkat keras fisik. Ini memiliki jawaban sederhana: proses mengeksekusi kode kontrak adalah bagian dari definisi fungsi transisi status, yang merupakan bagian dari algoritma validasi blok, jadi jika sebuah transaksi ditambahkan ke dalam blok `B`, eksekusi kode yang dihasilkan oleh transaksi tersebut akan dieksekusi oleh semua node, sekarang dan di masa depan, yang mengunduh dan memvalidasi blok `B`.

## Aplikasi {#applications}

Secara umum, ada tiga jenis aplikasi di atas Ethereum. Kategori pertama adalah aplikasi keuangan, yang memberi pengguna cara yang lebih kuat untuk mengelola dan membuat kontrak menggunakan uang mereka. Ini termasuk sub-mata uang, turunan keuangan (derivatif), kontrak lindung nilai (hedging), dompet tabungan, surat wasiat, dan pada akhirnya bahkan beberapa kelas kontrak kerja skala penuh. Kategori kedua adalah aplikasi semi-keuangan, di mana uang terlibat tetapi ada juga sisi non-moneter yang berat pada apa yang sedang dilakukan; contoh yang sempurna adalah hadiah yang ditegakkan sendiri untuk solusi masalah komputasi. Terakhir, ada aplikasi seperti pemungutan suara online dan tata kelola terdesentralisasi yang sama sekali bukan keuangan.

### Sistem Token {#token-systems}

Sistem token di blockchain memiliki banyak aplikasi mulai dari sub-mata uang yang mewakili aset seperti USD atau emas hingga saham perusahaan, token individu yang mewakili properti pintar, kupon aman yang tidak dapat dipalsukan, dan bahkan sistem token yang sama sekali tidak memiliki ikatan dengan nilai konvensional, yang digunakan sebagai sistem poin untuk insentif. Sistem token secara mengejutkan mudah diimplementasikan di Ethereum. Poin utama yang perlu dipahami adalah bahwa semua mata uang, atau sistem token, pada dasarnya adalah sebuah basis data dengan satu operasi: kurangi X unit dari A dan berikan X unit ke B, dengan syarat bahwa (i) A memiliki setidaknya X unit sebelum transaksi dan (2) transaksi disetujui oleh A. Semua yang diperlukan untuk mengimplementasikan sistem token adalah mengimplementasikan logika ini ke dalam sebuah kontrak.

Kode dasar untuk mengimplementasikan sistem token di Serpent terlihat sebagai berikut:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Ini pada dasarnya adalah implementasi harfiah dari fungsi transisi status "sistem perbankan" yang dijelaskan lebih lanjut di atas dalam dokumen ini. Beberapa baris kode tambahan perlu ditambahkan untuk menyediakan langkah awal mendistribusikan unit mata uang pada awalnya dan beberapa kasus tepi lainnya, dan idealnya sebuah fungsi akan ditambahkan untuk membiarkan kontrak lain menanyakan saldo dari sebuah alamat. Tapi hanya itu saja. Secara teoritis, sistem token berbasis Ethereum yang bertindak sebagai sub-mata uang berpotensi menyertakan fitur penting lain yang tidak dimiliki oleh meta-mata uang berbasis Bitcoin onchain: kemampuan untuk membayar biaya transaksi secara langsung dalam mata uang tersebut. Cara ini akan diimplementasikan adalah bahwa kontrak akan mempertahankan saldo ether yang dengannya ia akan mengembalikan ether yang digunakan untuk membayar biaya kepada pengirim, dan ia akan mengisi kembali saldo ini dengan mengumpulkan unit mata uang internal yang diambilnya dalam biaya dan menjualnya kembali dalam lelang yang berjalan konstan. Pengguna dengan demikian perlu "mengaktifkan" akun mereka dengan ether, tetapi begitu ether ada di sana, itu akan dapat digunakan kembali karena kontrak akan mengembalikannya setiap saat.

### Derivatif Keuangan dan Mata Uang Bernilai Stabil {#financial-derivatives-and-stable-value-currencies}

Derivatif keuangan adalah aplikasi paling umum dari "kontrak pintar", dan salah satu yang paling sederhana untuk diimplementasikan dalam kode. Tantangan utama dalam mengimplementasikan kontrak keuangan adalah bahwa mayoritas dari mereka memerlukan referensi ke ticker harga eksternal; misalnya, aplikasi yang sangat diinginkan adalah kontrak pintar yang melindungi nilai terhadap volatilitas ether (atau mata uang kripto lainnya) sehubungan dengan dolar AS, tetapi melakukan ini mengharuskan kontrak untuk mengetahui berapa nilai ETH/USD. Cara paling sederhana untuk melakukan ini adalah melalui kontrak "umpan data" yang dikelola oleh pihak tertentu (misalnya, NASDAQ) yang dirancang sedemikian rupa sehingga pihak tersebut memiliki kemampuan untuk memperbarui kontrak sesuai kebutuhan, dan menyediakan antarmuka yang memungkinkan kontrak lain untuk mengirim pesan ke kontrak tersebut dan mendapatkan kembali respons yang memberikan harga.

Dengan bahan penting tersebut, kontrak lindung nilai akan terlihat sebagai berikut:

1. Tunggu pihak A untuk memasukkan 1000 ether.
2. Tunggu pihak B untuk memasukkan 1000 ether.
3. Catat nilai USD dari 1000 ether, dihitung dengan menanyakan kontrak umpan data, dalam penyimpanan, katakanlah ini adalah $x.
4. Setelah 30 hari, izinkan A atau B untuk "mengaktifkan kembali" kontrak untuk mengirim ether senilai $x (dihitung dengan menanyakan kontrak umpan data lagi untuk mendapatkan harga baru) ke A dan sisanya ke B.

Kontrak semacam itu akan memiliki potensi signifikan dalam perdagangan kripto. Salah satu masalah utama yang disebutkan tentang mata uang kripto adalah kenyataan bahwa ia fluktuatif; meskipun banyak pengguna dan pedagang mungkin menginginkan keamanan dan kenyamanan berurusan dengan aset kriptografi, mereka mungkin tidak ingin menghadapi prospek kehilangan 23% dari nilai dana mereka dalam satu hari. Hingga saat ini, solusi yang paling umum diusulkan adalah aset yang didukung penerbit; idenya adalah bahwa penerbit membuat sub-mata uang di mana mereka memiliki hak untuk menerbitkan dan mencabut unit, dan memberikan satu unit mata uang kepada siapa saja yang memberi mereka (secara offline) satu unit aset dasar yang ditentukan (misalnya, emas, USD). Penerbit kemudian berjanji untuk memberikan satu unit aset dasar kepada siapa saja yang mengirim kembali satu unit aset kripto. Mekanisme ini memungkinkan aset non-kriptografi apa pun untuk "diangkat" menjadi aset kriptografi, asalkan penerbit dapat dipercaya.

Namun, dalam praktiknya, penerbit tidak selalu dapat dipercaya, dan dalam beberapa kasus infrastruktur perbankan terlalu lemah, atau terlalu bermusuhan, agar layanan semacam itu ada. Derivatif keuangan memberikan alternatif. Di sini, alih-alih penerbit tunggal yang menyediakan dana untuk mendukung suatu aset, pasar spekulan yang terdesentralisasi, yang bertaruh bahwa harga aset referensi kriptografi (misalnya, ETH) akan naik, memainkan peran tersebut. Tidak seperti penerbit, spekulan tidak memiliki opsi untuk gagal bayar di pihak mereka dari tawar-menawar karena kontrak lindung nilai menahan dana mereka di escrow. Perhatikan bahwa pendekatan ini tidak sepenuhnya terdesentralisasi, karena sumber tepercaya masih diperlukan untuk menyediakan ticker harga, meskipun bisa dibilang ini masih merupakan peningkatan besar-besaran dalam hal mengurangi persyaratan infrastruktur (tidak seperti menjadi penerbit, menerbitkan umpan harga tidak memerlukan lisensi dan kemungkinan dapat dikategorikan sebagai kebebasan berbicara) dan mengurangi potensi penipuan.

### Sistem Identitas dan Reputasi {#identity-and-reputation-systems}

Mata uang kripto alternatif paling awal dari semuanya, [Namecoin](http://namecoin.org/), mencoba menggunakan blockchain mirip Bitcoin untuk menyediakan sistem pendaftaran nama, di mana pengguna dapat mendaftarkan nama mereka dalam basis data publik di samping data lainnya. Kasus penggunaan utama yang disebutkan adalah untuk sistem [DNS](https://wikipedia.org/wiki/Domain_Name_System), memetakan nama domain seperti "bitcoin.org" (atau, dalam kasus Namecoin, "bitcoin.bit") ke alamat IP. Kasus penggunaan lainnya termasuk otentikasi email dan sistem reputasi yang berpotensi lebih maju. Berikut adalah kontrak dasar untuk menyediakan sistem pendaftaran nama mirip Namecoin di Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Kontraknya sangat sederhana; itu hanyalah sebuah basis data di dalam jaringan Ethereum yang dapat ditambahkan, tetapi tidak dapat dimodifikasi atau dihapus. Siapa pun dapat mendaftarkan nama dengan nilai tertentu, dan pendaftaran itu kemudian melekat selamanya. Kontrak pendaftaran nama yang lebih canggih juga akan memiliki "klausul fungsi" yang memungkinkan kontrak lain untuk menanyakannya, serta mekanisme bagi "pemilik" (yaitu, pendaftar pertama) dari sebuah nama untuk mengubah data atau mentransfer kepemilikan. Seseorang bahkan dapat menambahkan fungsionalitas reputasi dan web-of-trust di atasnya.

### Penyimpanan File Terdesentralisasi {#decentralized-file-storage}

Selama beberapa tahun terakhir, telah muncul sejumlah startup penyimpanan file online yang populer, yang paling menonjol adalah Dropbox, yang berupaya memungkinkan pengguna untuk mengunggah cadangan hard drive mereka dan meminta layanan menyimpan cadangan tersebut dan memungkinkan pengguna untuk mengaksesnya dengan imbalan biaya bulanan. Namun, pada titik ini pasar penyimpanan file terkadang relatif tidak efisien; pandangan sepintas pada berbagai solusi yang ada menunjukkan bahwa, terutama pada tingkat "uncanny valley" 20-200 GB di mana kuota gratis maupun diskon tingkat perusahaan tidak berlaku, harga bulanan untuk biaya penyimpanan file arus utama sedemikian rupa sehingga Anda membayar lebih dari biaya seluruh hard drive dalam satu bulan. Kontrak Ethereum dapat memungkinkan pengembangan ekosistem penyimpanan file terdesentralisasi, di mana pengguna individu dapat memperoleh sejumlah kecil uang dengan menyewakan hard drive mereka sendiri dan ruang yang tidak terpakai dapat digunakan untuk lebih menurunkan biaya penyimpanan file.

Bagian penting yang mendasari perangkat semacam itu adalah apa yang kami sebut "kontrak Dropbox terdesentralisasi". Kontrak ini bekerja sebagai berikut. Pertama, seseorang membagi data yang diinginkan menjadi blok-blok, mengenkripsi setiap blok untuk privasi, dan membangun pohon Merkle darinya. Seseorang kemudian membuat kontrak dengan aturan bahwa, setiap N blok, kontrak akan memilih indeks acak di pohon Merkle (menggunakan hash blok sebelumnya, yang dapat diakses dari kode kontrak, sebagai sumber keacakan), dan memberikan X ether ke entitas pertama yang memasok transaksi dengan bukti kepemilikan blok yang disederhanakan seperti verifikasi pembayaran pada indeks tertentu di pohon tersebut. Ketika pengguna ingin mengunduh ulang file mereka, mereka dapat menggunakan protokol saluran pembayaran mikro (misalnya, membayar 1 szabo per 32 kilobyte) untuk memulihkan file; pendekatan yang paling efisien biaya adalah agar pembayar tidak mempublikasikan transaksi sampai akhir, melainkan mengganti transaksi dengan yang sedikit lebih menguntungkan dengan nonce yang sama setelah setiap 32 kilobyte.

Fitur penting dari protokol ini adalah bahwa, meskipun mungkin tampak seperti seseorang mempercayai banyak node acak untuk tidak memutuskan melupakan file tersebut, seseorang dapat mengurangi risiko itu hingga mendekati nol dengan membagi file menjadi banyak bagian melalui pembagian rahasia, dan mengawasi kontrak untuk melihat setiap bagian masih dalam kepemilikan suatu node. Jika kontrak masih membayarkan uang, itu memberikan bukti kriptografi bahwa seseorang di luar sana masih menyimpan file tersebut.

### Organisasi Otonom Terdesentralisasi {#decentralized-autonomous-organizations}

Konsep umum dari "organisasi otonom terdesentralisasi" adalah entitas virtual yang memiliki sekumpulan anggota atau pemegang saham tertentu yang, mungkin dengan mayoritas 67%, memiliki hak untuk membelanjakan dana entitas dan memodifikasi kodennya. Para anggota akan secara kolektif memutuskan bagaimana organisasi harus mengalokasikan dananya. Metode untuk mengalokasikan dana DAO dapat berkisar dari hadiah, gaji hingga mekanisme yang lebih eksotis seperti mata uang internal untuk menghargai pekerjaan. Ini pada dasarnya mereplikasi jebakan hukum dari perusahaan tradisional atau nirlaba tetapi hanya menggunakan teknologi blockchain kriptografi untuk penegakan. Sejauh ini banyak pembicaraan seputar DAO telah berkisar pada model "kapitalis" dari "perusahaan otonom terdesentralisasi" (DAC) dengan pemegang saham yang menerima dividen dan saham yang dapat diperdagangkan; sebuah alternatif, mungkin digambarkan sebagai "komunitas otonom terdesentralisasi", akan membuat semua anggota memiliki bagian yang sama dalam pengambilan keputusan dan mengharuskan 67% anggota yang ada untuk setuju menambah atau menghapus anggota. Persyaratan bahwa satu orang hanya dapat memiliki satu keanggotaan kemudian perlu ditegakkan secara kolektif oleh kelompok.

Garis besar umum tentang cara mengkodekan DAO adalah sebagai berikut. Desain paling sederhana hanyalah sepotong kode yang memodifikasi sendiri yang berubah jika dua pertiga anggota menyetujui perubahan. Meskipun kode secara teoritis tetap, seseorang dapat dengan mudah menyiasati ini dan memiliki mutabilitas de-facto dengan memiliki potongan kode dalam kontrak terpisah, dan memiliki alamat kontrak mana yang akan dipanggil disimpan dalam penyimpanan yang dapat dimodifikasi. Dalam implementasi sederhana dari kontrak DAO semacam itu, akan ada tiga jenis transaksi, dibedakan oleh data yang disediakan dalam transaksi:

- `[0,i,K,V]` untuk mendaftarkan proposal dengan indeks `i` untuk mengubah alamat pada indeks penyimpanan `K` menjadi nilai `V`
- `[1,i]` untuk mendaftarkan suara yang mendukung proposal `i`
- `[2,i]` untuk menyelesaikan proposal `i` jika cukup banyak suara telah diberikan

Kontrak kemudian akan memiliki klausul untuk masing-masing ini. Ini akan menyimpan catatan semua perubahan penyimpanan terbuka, bersama dengan daftar siapa yang memilihnya. Ini juga akan memiliki daftar semua anggota. Ketika setiap perubahan penyimpanan mencapai dua pertiga anggota yang memilihnya, transaksi penyelesaian dapat mengeksekusi perubahan tersebut. Kerangka yang lebih canggih juga akan memiliki kemampuan pemungutan suara bawaan untuk fitur-fitur seperti mengirim transaksi, menambah anggota dan menghapus anggota, dan bahkan mungkin menyediakan delegasi suara bergaya [Liquid Democracy](https://wikipedia.org/wiki/Liquid_democracy) (yaitu, siapa pun dapat menugaskan seseorang untuk memilih mereka, dan penugasan bersifat transitif sehingga jika A menugaskan B dan B menugaskan C maka C menentukan suara A). Desain ini akan memungkinkan DAO untuk tumbuh secara organik sebagai komunitas yang terdesentralisasi, memungkinkan orang untuk pada akhirnya mendelegasikan tugas menyaring siapa yang menjadi anggota kepada spesialis, meskipun tidak seperti dalam "sistem saat ini" spesialis dapat dengan mudah muncul dan menghilang dari keberadaan seiring waktu saat anggota komunitas individu mengubah keberpihakan mereka.

Model alternatif adalah untuk perusahaan terdesentralisasi, di mana setiap akun dapat memiliki nol atau lebih saham, dan dua pertiga dari saham diperlukan untuk membuat keputusan. Kerangka lengkap akan melibatkan fungsionalitas manajemen aset, kemampuan untuk membuat penawaran untuk membeli atau menjual saham, dan kemampuan untuk menerima penawaran (sebaiknya dengan mekanisme pencocokan pesanan di dalam kontrak). Delegasi juga akan ada bergaya Liquid Democracy, menggeneralisasi konsep "dewan direksi".

### Aplikasi Lebih Lanjut {#further-applications}

**1. Dompet tabungan**. Misalkan Alice ingin menjaga dananya tetap aman, tetapi khawatir dia akan kehilangan atau seseorang akan meretas kunci pribadinya. Dia memasukkan ether ke dalam kontrak dengan Bob, sebuah bank, sebagai berikut:

- Alice sendiri dapat menarik maksimum 1% dari dana per hari.
- Bob sendiri dapat menarik maksimum 1% dari dana per hari, tetapi Alice memiliki kemampuan untuk melakukan transaksi dengan kuncinya yang mematikan kemampuan ini.
- Alice dan Bob bersama-sama dapat menarik apa saja.

Biasanya, 1% per hari sudah cukup bagi Alice, dan jika Alice ingin menarik lebih banyak, dia dapat menghubungi Bob untuk meminta bantuan. Jika kunci Alice diretas, dia berlari ke Bob untuk memindahkan dana ke kontrak baru. Jika dia kehilangan kuncinya, Bob pada akhirnya akan mengeluarkan dana tersebut. Jika Bob ternyata jahat, maka dia dapat mematikan kemampuannya untuk menarik.

**2. Asuransi tanaman**. Seseorang dapat dengan mudah membuat kontrak derivatif keuangan tetapi menggunakan umpan data cuaca alih-alih indeks harga apa pun. Jika seorang petani di Iowa membeli derivatif yang membayar secara terbalik berdasarkan curah hujan di Iowa, maka jika terjadi kekeringan, petani akan secara otomatis menerima uang dan jika ada cukup hujan petani akan senang karena tanaman mereka akan tumbuh dengan baik. Ini dapat diperluas ke asuransi bencana alam secara umum.

**3. Umpan data terdesentralisasi**. Untuk kontrak keuangan untuk perbedaan, mungkin sebenarnya untuk mendesentralisasikan umpan data melalui protokol yang disebut "[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)". SchellingCoin pada dasarnya bekerja sebagai berikut: N pihak semuanya memasukkan ke dalam sistem nilai dari datum tertentu (misalnya, harga ETH/USD), nilai-nilai tersebut diurutkan, dan semua orang antara persentil ke-25 dan ke-75 mendapatkan satu token sebagai hadiah. Setiap orang memiliki insentif untuk memberikan jawaban yang akan diberikan orang lain, dan satu-satunya nilai yang secara realistis dapat disetujui oleh sejumlah besar pemain adalah default yang jelas: kebenaran. Ini menciptakan protokol terdesentralisasi yang secara teoritis dapat memberikan sejumlah nilai, termasuk harga ETH/USD, suhu di Berlin atau bahkan hasil dari komputasi keras tertentu.

**4. Escrow multi tanda tangan pintar**. Bitcoin memungkinkan kontrak transaksi multi tanda tangan di mana, misalnya, tiga dari lima kunci yang diberikan dapat membelanjakan dana. Ethereum memungkinkan lebih banyak perincian; misalnya, empat dari lima dapat membelanjakan semuanya, tiga dari lima dapat membelanjakan hingga 10% per hari, dan dua dari lima dapat membelanjakan hingga 0,5% per hari. Selain itu, multi tanda tangan Ethereum bersifat asinkron - dua pihak dapat mendaftarkan tanda tangan mereka di blockchain pada waktu yang berbeda dan tanda tangan terakhir akan secara otomatis mengirim transaksi.

**5. Komputasi awan**. Teknologi EVM juga dapat digunakan untuk menciptakan lingkungan komputasi yang dapat diverifikasi, memungkinkan pengguna untuk meminta orang lain melakukan komputasi dan kemudian secara opsional meminta bukti bahwa komputasi pada pos pemeriksaan tertentu yang dipilih secara acak dilakukan dengan benar. Ini memungkinkan terciptanya pasar komputasi awan di mana setiap pengguna dapat berpartisipasi dengan desktop, laptop, atau server khusus mereka, dan pemeriksaan langsung bersama dengan deposit keamanan dapat digunakan untuk memastikan bahwa sistem tersebut dapat dipercaya (yaitu, node tidak dapat menipu secara menguntungkan). Meskipun sistem semacam itu mungkin tidak cocok untuk semua tugas; tugas yang memerlukan tingkat komunikasi antar-proses yang tinggi, misalnya, tidak dapat dengan mudah dilakukan pada awan node yang besar. Namun, tugas-tugas lain jauh lebih mudah untuk diparalelkan; proyek-proyek seperti SETI@home, folding@home dan algoritma genetik dapat dengan mudah diimplementasikan di atas platform semacam itu.

**6. Perjudian peer-to-peer**. Sejumlah protokol perjudian peer-to-peer, seperti [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) karya Frank Stajano dan Richard Clayton, dapat diimplementasikan di blockchain Ethereum. Protokol perjudian paling sederhana sebenarnya hanyalah kontrak untuk perbedaan pada hash blok berikutnya, dan protokol yang lebih maju dapat dibangun dari sana, menciptakan layanan perjudian dengan biaya mendekati nol yang tidak memiliki kemampuan untuk menipu.

**7. Pasar prediksi**. Asalkan ada oracle atau SchellingCoin, pasar prediksi juga mudah diimplementasikan, dan pasar prediksi bersama dengan SchellingCoin mungkin terbukti menjadi aplikasi arus utama pertama dari [futarchy](https://mason.gmu.edu/~rhanson/futarchy.html) sebagai protokol tata kelola untuk organisasi terdesentralisasi.

**8. Pasar terdesentralisasi onchain**, menggunakan sistem identitas dan reputasi sebagai basis.

## Rupa-rupa dan Kekhawatiran {#miscellanea-and-concerns}

### Implementasi GHOST yang Dimodifikasi {#modified-ghost-implementation}

Protokol "Greedy Heaviest Observed Subtree" (GHOST) adalah sebuah inovasi yang pertama kali diperkenalkan oleh Yonatan Sompolinsky dan Aviv Zohar pada [Desember 2013](https://eprint.iacr.org/2013/881.pdf). Motivasi di balik GHOST adalah bahwa blockchain dengan waktu konfirmasi yang cepat saat ini mengalami penurunan keamanan karena tingkat kebasian (stale rate) yang tinggi - karena blok membutuhkan waktu tertentu untuk menyebar melalui jaringan, jika penambang A menambang sebuah blok dan kemudian penambang B kebetulan menambang blok lain sebelum blok penambang A menyebar ke B, blok penambang B pada akhirnya akan terbuang sia-sia dan tidak akan berkontribusi pada keamanan jaringan. Selain itu, ada masalah sentralisasi: jika penambang A adalah kolam penambangan (mining pool) dengan 30% kekuatan hash dan B memiliki 10% kekuatan hash, A akan memiliki risiko menghasilkan blok basi 70% dari waktu (karena 30% waktu lainnya A menghasilkan blok terakhir dan dengan demikian akan mendapatkan data penambangan dengan segera) sedangkan B akan memiliki risiko menghasilkan blok basi 90% dari waktu. Dengan demikian, jika interval blok cukup pendek sehingga tingkat kebasian menjadi tinggi, A akan menjadi jauh lebih efisien hanya karena ukurannya. Dengan gabungan kedua efek ini, blockchain yang menghasilkan blok dengan cepat sangat mungkin menyebabkan satu kolam penambangan memiliki persentase kekuatan hash jaringan yang cukup besar untuk memiliki kendali de facto atas proses penambangan.

Seperti yang dijelaskan oleh Sompolinsky dan Zohar, GHOST memecahkan masalah pertama dari hilangnya keamanan jaringan dengan memasukkan blok basi dalam perhitungan rantai mana yang "terpanjang"; artinya, bukan hanya induk dan leluhur lebih lanjut dari sebuah blok, tetapi juga keturunan basi dari leluhur blok tersebut (dalam jargon Ethereum, "paman" atau "uncles") ditambahkan ke perhitungan blok mana yang memiliki total proof-of-work terbesar yang mendukungnya. Untuk memecahkan masalah kedua dari bias sentralisasi, kami melampaui protokol yang dijelaskan oleh Sompolinsky dan Zohar, dan juga memberikan hadiah blok kepada blok basi: sebuah blok basi menerima 87,5% dari hadiah dasarnya, dan keponakan yang menyertakan blok basi tersebut menerima sisa 12,5%. Namun, biaya transaksi tidak diberikan kepada paman.

Ethereum mengimplementasikan versi GHOST yang disederhanakan yang hanya turun hingga tujuh tingkat. Secara khusus, ini didefinisikan sebagai berikut:

- Sebuah blok harus menentukan satu induk, dan harus menentukan 0 atau lebih paman
- Seorang paman yang disertakan dalam blok B harus memiliki properti berikut:
  - Ia harus merupakan anak langsung dari leluhur generasi ke-k dari B, di mana `2 <= k <= 7`.
  - Ia tidak boleh merupakan leluhur dari B
  - Seorang paman harus berupa header blok yang valid, tetapi tidak perlu berupa blok yang sebelumnya telah diverifikasi atau bahkan blok yang valid
  - Seorang paman harus berbeda dari semua paman yang disertakan dalam blok sebelumnya dan semua paman lain yang disertakan dalam blok yang sama (non-inklusi ganda)
- Untuk setiap paman U dalam blok B, penambang B mendapatkan tambahan 3,125% yang ditambahkan ke hadiah coinbase-nya dan penambang U mendapatkan 93,75% dari hadiah coinbase standar.

Versi GHOST yang terbatas ini, dengan paman yang hanya dapat disertakan hingga 7 generasi, digunakan karena dua alasan. Pertama, GHOST yang tidak terbatas akan memasukkan terlalu banyak komplikasi ke dalam perhitungan paman mana untuk blok tertentu yang valid. Kedua, GHOST yang tidak terbatas dengan kompensasi seperti yang digunakan di Ethereum menghilangkan insentif bagi penambang untuk menambang di rantai utama dan bukan di rantai penyerang publik.

### Biaya {#fees}

Karena setiap transaksi yang dipublikasikan ke dalam blockchain membebankan biaya pada jaringan untuk mengunduh dan memverifikasinya, ada kebutuhan akan beberapa mekanisme pengaturan, yang biasanya melibatkan biaya transaksi, untuk mencegah penyalahgunaan. Pendekatan default, yang digunakan dalam Bitcoin, adalah memiliki biaya yang murni sukarela, mengandalkan penambang untuk bertindak sebagai penjaga gerbang dan menetapkan minimum dinamis. Pendekatan ini telah diterima dengan sangat baik di komunitas Bitcoin terutama karena "berbasis pasar", yang memungkinkan penawaran dan permintaan antara penambang dan pengirim transaksi menentukan harganya. Namun, masalah dengan alur penalaran ini adalah bahwa pemrosesan transaksi bukanlah sebuah pasar; meskipun secara intuitif menarik untuk menafsirkan pemrosesan transaksi sebagai layanan yang ditawarkan penambang kepada pengirim, pada kenyataannya setiap transaksi yang disertakan penambang perlu diproses oleh setiap node di jaringan, sehingga sebagian besar biaya pemrosesan transaksi ditanggung oleh pihak ketiga dan bukan penambang yang membuat keputusan apakah akan menyertakannya atau tidak. Oleh karena itu, masalah tragedi kepemilikan bersama (tragedy-of-the-commons) sangat mungkin terjadi.

Namun, ternyata kelemahan dalam mekanisme berbasis pasar ini, ketika diberikan asumsi penyederhanaan yang tidak akurat tertentu, secara ajaib membatalkan dirinya sendiri. Argumennya adalah sebagai berikut. Misalkan:

1. Sebuah transaksi mengarah ke `k` operasi, menawarkan hadiah `kR` kepada penambang mana pun yang menyertakannya di mana `R` ditetapkan oleh pengirim dan `k` serta `R` (secara kasar) terlihat oleh penambang sebelumnya.
2. Sebuah operasi memiliki biaya pemrosesan sebesar `C` untuk node mana pun (yaitu, semua node memiliki efisiensi yang sama)
3. Terdapat `N` node penambangan, masing-masing dengan kekuatan pemrosesan yang sama persis (yaitu, `1/N` dari total)
4. Tidak ada node penuh non-penambangan yang ada.

Seorang penambang akan bersedia memproses sebuah transaksi jika hadiah yang diharapkan lebih besar dari biayanya. Dengan demikian, hadiah yang diharapkan adalah `kR/N` karena penambang memiliki peluang `1/N` untuk memproses blok berikutnya, dan biaya pemrosesan untuk penambang hanyalah `kC`. Oleh karena itu, penambang akan menyertakan transaksi di mana `kR/N > kC`, atau `R > NC`. Perhatikan bahwa `R` adalah biaya per operasi yang diberikan oleh pengirim, dan dengan demikian merupakan batas bawah dari manfaat yang diperoleh pengirim dari transaksi tersebut, dan `NC` adalah biaya bagi seluruh jaringan secara bersama-sama untuk memproses sebuah operasi. Oleh karena itu, penambang memiliki insentif untuk hanya menyertakan transaksi yang total manfaat utilitariannya melebihi biayanya.

Namun, ada beberapa penyimpangan penting dari asumsi-asumsi tersebut dalam kenyataannya:

1. Penambang memang membayar biaya yang lebih tinggi untuk memproses transaksi daripada node verifikasi lainnya, karena waktu verifikasi ekstra menunda penyebaran blok dan dengan demikian meningkatkan kemungkinan blok tersebut akan menjadi basi.
2. Memang ada node penuh non-penambangan.
3. Distribusi kekuatan penambangan pada akhirnya mungkin menjadi sangat tidak egaliter dalam praktiknya.
4. Spekulan, musuh politik, dan orang gila yang fungsi utilitasnya termasuk menyebabkan kerugian pada jaringan memang ada, dan mereka dapat dengan cerdik mengatur kontrak di mana biaya mereka jauh lebih rendah daripada biaya yang dibayarkan oleh node verifikasi lainnya.

(1) memberikan kecenderungan bagi penambang untuk menyertakan lebih sedikit transaksi, dan
(2) meningkatkan `NC`; oleh karena itu, kedua efek ini setidaknya sebagian saling membatalkan.<sup>[Bagaimana?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) dan (4) adalah masalah utama; untuk menyelesaikannya, kami cukup melembagakan batas mengambang (floating cap): tidak ada blok yang dapat memiliki lebih banyak operasi daripada `BLK_LIMIT_FACTOR` dikalikan rata-rata pergerakan eksponensial jangka panjang. Secara khusus:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` dan `EMA_FACTOR` adalah konstanta yang akan ditetapkan ke 65536 dan 1,5 untuk saat ini, tetapi kemungkinan akan diubah setelah analisis lebih lanjut.

Ada faktor lain yang mendisinsentifkan ukuran blok yang besar di Bitcoin: blok yang besar akan membutuhkan waktu lebih lama untuk menyebar, dan dengan demikian memiliki probabilitas lebih tinggi untuk menjadi basi. Di Ethereum, blok yang sangat memakan gas juga dapat membutuhkan waktu lebih lama untuk menyebar baik karena secara fisik lebih besar maupun karena membutuhkan waktu lebih lama untuk memproses transisi status transaksi untuk divalidasi. Disinsentif penundaan ini merupakan pertimbangan yang signifikan di Bitcoin, tetapi kurang begitu di Ethereum karena protokol GHOST; oleh karena itu, mengandalkan batas blok yang diatur memberikan garis dasar yang lebih stabil.

### Komputasi dan Kelengkapan Turing {#computation-and-turing-completeness}

Catatan penting adalah bahwa Mesin Virtual Ethereum bersifat Turing-complete (lengkap secara Turing); ini berarti bahwa kode EVM dapat menyandikan komputasi apa pun yang dapat dibayangkan untuk dilakukan, termasuk perulangan tak terbatas (infinite loops). Kode EVM memungkinkan perulangan dengan dua cara. Pertama, ada instruksi `JUMP` yang memungkinkan program untuk melompat kembali ke titik sebelumnya dalam kode, dan instruksi `JUMPI` untuk melakukan lompatan bersyarat, yang memungkinkan pernyataan seperti `while x < 27: x = x * 2`. Kedua, kontrak dapat memanggil kontrak lain, yang berpotensi memungkinkan perulangan melalui rekursi. Hal ini secara alami mengarah pada sebuah masalah: dapatkah pengguna jahat pada dasarnya mematikan penambang dan node penuh dengan memaksa mereka masuk ke dalam perulangan tak terbatas? Masalah ini muncul karena masalah dalam ilmu komputer yang dikenal sebagai masalah penghentian (halting problem): tidak ada cara untuk mengetahui, dalam kasus umum, apakah suatu program tertentu akan pernah berhenti atau tidak.

Seperti yang dijelaskan di bagian transisi status, solusi kami bekerja dengan mengharuskan sebuah transaksi untuk menetapkan jumlah maksimum langkah komputasi yang diizinkan untuk diambil, dan jika eksekusi memakan waktu lebih lama, komputasi akan dikembalikan (reverted) tetapi biaya tetap dibayarkan. Pesan bekerja dengan cara yang sama. Untuk menunjukkan motivasi di balik solusi kami, pertimbangkan contoh-contoh berikut:

- Seorang penyerang membuat kontrak yang menjalankan perulangan tak terbatas, dan kemudian mengirimkan transaksi yang mengaktifkan perulangan tersebut ke penambang. Penambang akan memproses transaksi, menjalankan perulangan tak terbatas, dan menunggunya kehabisan gas. Meskipun eksekusi kehabisan gas dan berhenti di tengah jalan, transaksi tersebut tetap valid dan penambang tetap mengklaim biaya dari penyerang untuk setiap langkah komputasi.
- Seorang penyerang membuat perulangan tak terbatas yang sangat panjang dengan maksud memaksa penambang untuk terus melakukan komputasi dalam waktu yang sangat lama sehingga pada saat komputasi selesai, beberapa blok lagi akan keluar dan tidak mungkin bagi penambang untuk menyertakan transaksi guna mengklaim biaya. Namun, penyerang akan diharuskan untuk mengirimkan nilai untuk `STARTGAS` yang membatasi jumlah langkah komputasi yang dapat diambil oleh eksekusi, sehingga penambang akan tahu sebelumnya bahwa komputasi akan memakan jumlah langkah yang sangat besar.
- Seorang penyerang melihat kontrak dengan kode dalam bentuk seperti `send(A,contract.storage[A]); contract.storage[A] = 0`, dan mengirimkan transaksi dengan gas yang hanya cukup untuk menjalankan langkah pertama tetapi tidak untuk langkah kedua (yaitu, melakukan penarikan tetapi tidak membiarkan saldonya turun). Penulis kontrak tidak perlu khawatir tentang perlindungan terhadap serangan semacam itu, karena jika eksekusi berhenti di tengah jalan, perubahan akan dikembalikan.
- Sebuah kontrak keuangan bekerja dengan mengambil median dari sembilan umpan data kepemilikan (proprietary data feeds) untuk meminimalkan risiko. Seorang penyerang mengambil alih salah satu umpan data, yang dirancang agar dapat dimodifikasi melalui mekanisme panggilan alamat variabel (variable-address-call) yang dijelaskan di bagian tentang DAO, dan mengubahnya untuk menjalankan perulangan tak terbatas, dengan demikian mencoba memaksa setiap upaya untuk mengklaim dana dari kontrak keuangan agar kehabisan gas. Namun, kontrak keuangan dapat menetapkan batas gas pada pesan untuk mencegah masalah ini.

Alternatif untuk kelengkapan Turing (Turing-completeness) adalah ketidaklengkapan Turing (Turing-incompleteness), di mana `JUMP` dan `JUMPI` tidak ada dan hanya satu salinan dari setiap kontrak yang diizinkan ada di tumpukan panggilan (call stack) pada waktu tertentu. Dengan sistem ini, sistem biaya yang dijelaskan dan ketidakpastian seputar efektivitas solusi kami mungkin tidak diperlukan, karena biaya pelaksanaan kontrak akan dibatasi di atas oleh ukurannya. Selain itu, ketidaklengkapan Turing bahkan bukan batasan yang besar; dari semua contoh kontrak yang telah kami susun secara internal, sejauh ini hanya satu yang memerlukan perulangan, dan bahkan perulangan itu dapat dihilangkan dengan membuat 26 pengulangan dari sepotong kode satu baris. Mengingat implikasi serius dari kelengkapan Turing, dan manfaatnya yang terbatas, mengapa tidak menggunakan bahasa yang tidak lengkap secara Turing saja? Namun pada kenyataannya, ketidaklengkapan Turing jauh dari solusi yang rapi untuk masalah tersebut. Untuk melihat alasannya, pertimbangkan kontrak-kontrak berikut:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Sekarang, kirimkan sebuah transaksi ke A. Dengan demikian, dalam 51 transaksi, kita memiliki kontrak yang memakan 2<sup>50</sup> langkah komputasi. Penambang dapat mencoba mendeteksi bom logika semacam itu sebelumnya dengan mempertahankan nilai di samping setiap kontrak yang menentukan jumlah maksimum langkah komputasi yang dapat diambilnya, dan menghitung ini untuk kontrak yang memanggil kontrak lain secara rekursif, tetapi itu akan mengharuskan penambang untuk melarang kontrak yang membuat kontrak lain (karena pembuatan dan pelaksanaan semua 26 kontrak di atas dapat dengan mudah digulung menjadi satu kontrak tunggal). Poin bermasalah lainnya adalah bahwa bidang alamat dari sebuah pesan adalah variabel, jadi secara umum mungkin tidak mungkin untuk mengetahui kontrak lain mana yang akan dipanggil oleh kontrak tertentu sebelumnya. Oleh karena itu, secara keseluruhan, kita memiliki kesimpulan yang mengejutkan: kelengkapan Turing secara mengejutkan mudah dikelola, dan kurangnya kelengkapan Turing sama mengejutkannya sulit dikelola kecuali kontrol yang sama persis diterapkan - tetapi dalam hal ini mengapa tidak membiarkan protokol tersebut menjadi lengkap secara Turing?

### Mata Uang dan Penerbitan {#currency-and-issuance}

Jaringan Ethereum mencakup mata uang bawaannya sendiri, ether, yang melayani tujuan ganda yaitu menyediakan lapisan likuiditas utama untuk memungkinkan pertukaran yang efisien antara berbagai jenis aset digital dan, yang lebih penting, menyediakan mekanisme untuk membayar biaya transaksi. Untuk kenyamanan dan untuk menghindari perdebatan di masa depan (lihat perdebatan mBTC/uBTC/satoshi saat ini di Bitcoin), denominasi akan diberi label sebelumnya:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Ini harus dianggap sebagai versi yang diperluas dari konsep "dolar" dan "sen" atau "BTC" dan "satoshi". Dalam waktu dekat, kami berharap "ether" digunakan untuk transaksi biasa, "finney" untuk transaksi mikro dan "szabo" serta "wei" untuk diskusi teknis seputar biaya dan implementasi protokol; denominasi yang tersisa mungkin menjadi berguna nanti dan tidak boleh disertakan dalam klien pada saat ini.

Model penerbitan akan menjadi sebagai berikut:

- Ether akan dirilis dalam penjualan mata uang dengan harga 1000-2000 ether per BTC, sebuah mekanisme yang dimaksudkan untuk mendanai organisasi Ethereum dan membayar pengembangan yang telah digunakan dengan sukses oleh platform lain seperti Mastercoin dan NXT. Pembeli awal akan mendapat manfaat dari diskon yang lebih besar. BTC yang diterima dari penjualan akan digunakan sepenuhnya untuk membayar gaji dan hadiah (bounties) kepada pengembang dan diinvestasikan ke berbagai proyek nirlaba dan berorientasi laba dalam ekosistem Ethereum dan mata uang kripto.
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

#### Tingkat Pertumbuhan Pasokan Jangka Panjang (persen)

![Inflasi Ethereum](./ethereum-inflation.png)

_Meskipun penerbitan mata uang linier, sama seperti Bitcoin seiring berjalannya waktu tingkat pertumbuhan pasokan tetap cenderung mendekati nol._

Dua pilihan utama dalam model di atas adalah (1) keberadaan dan ukuran kumpulan dana abadi (endowment pool), dan (2) keberadaan pasokan linier yang tumbuh secara permanen, berlawanan dengan pasokan yang dibatasi seperti pada Bitcoin. Pembenaran dari kumpulan dana abadi adalah sebagai berikut. Jika kumpulan dana abadi tidak ada, dan penerbitan linier dikurangi menjadi 0,217x untuk memberikan tingkat inflasi yang sama, maka jumlah total ether akan menjadi 16,5% lebih sedikit dan dengan demikian setiap unit akan menjadi 19,8% lebih berharga. Oleh karena itu, dalam ekuilibrium 19,8% lebih banyak ether akan dibeli dalam penjualan, sehingga setiap unit akan sekali lagi sama berharganya seperti sebelumnya. Organisasi juga kemudian akan memiliki 1,198x lebih banyak BTC, yang dapat dianggap terbagi menjadi dua irisan: BTC asli, dan tambahan 0,198x. Oleh karena itu, situasi ini _sama persis_ dengan dana abadi, tetapi dengan satu perbedaan penting: organisasi memegang murni BTC, dan dengan demikian tidak diberi insentif untuk mendukung nilai unit ether.

Model pertumbuhan pasokan linier permanen mengurangi risiko dari apa yang dilihat sebagian orang sebagai konsentrasi kekayaan yang berlebihan di Bitcoin, dan memberi individu yang hidup di era sekarang dan masa depan kesempatan yang adil untuk memperoleh unit mata uang, sementara pada saat yang sama mempertahankan insentif yang kuat untuk mendapatkan dan memegang ether karena "tingkat pertumbuhan pasokan" sebagai persentase masih cenderung mendekati nol seiring berjalannya waktu. Kami juga berteori bahwa karena koin selalu hilang seiring berjalannya waktu karena kecerobohan, kematian, dll, dan kehilangan koin dapat dimodelkan sebagai persentase dari total pasokan per tahun, bahwa total pasokan mata uang yang beredar pada kenyataannya pada akhirnya akan stabil pada nilai yang sama dengan penerbitan tahunan dibagi dengan tingkat kehilangan (misalnya, pada tingkat kehilangan 1%, setelah pasokan mencapai 26X maka 0,26X akan ditambang dan 0,26X hilang setiap tahun, menciptakan ekuilibrium).

Perhatikan bahwa di masa depan, kemungkinan besar Ethereum akan beralih ke model proof-of-stake untuk keamanan, mengurangi persyaratan penerbitan menjadi antara nol dan 0,05X per tahun. Jika organisasi Ethereum kehilangan pendanaan atau karena alasan lain menghilang, kami membiarkan terbuka sebuah "kontrak sosial": siapa pun memiliki hak untuk membuat versi kandidat masa depan dari Ethereum, dengan satu-satunya syarat adalah bahwa jumlah ether harus paling banyak sama dengan `60102216 * (1.198 + 0.26 * n)` di mana `n` adalah jumlah tahun setelah blok genesis. Pembuat bebas untuk melakukan penjualan massal (crowd-sell) atau sebaliknya menetapkan sebagian atau seluruh perbedaan antara ekspansi pasokan yang didorong oleh PoS dan ekspansi pasokan maksimum yang diizinkan untuk membayar pengembangan. Peningkatan kandidat yang tidak mematuhi kontrak sosial dapat dibenarkan untuk di-fork menjadi versi yang patuh.

### Sentralisasi Penambangan {#mining-centralization}

Algoritma penambangan Bitcoin bekerja dengan meminta penambang menghitung SHA256 pada versi header blok yang sedikit dimodifikasi jutaan kali berulang-ulang, sampai akhirnya satu node muncul dengan versi yang hash-nya kurang dari target (saat ini sekitar 2<sup>192</sup>). Namun, algoritma penambangan ini rentan terhadap dua bentuk sentralisasi. Pertama, ekosistem penambangan telah didominasi oleh ASIC (application-specific integrated circuits), chip komputer yang dirancang untuk, dan karenanya ribuan kali lebih efisien pada, tugas spesifik penambangan Bitcoin. Ini berarti bahwa penambangan Bitcoin tidak lagi menjadi pengejaran yang sangat terdesentralisasi dan egaliter, yang membutuhkan jutaan dolar modal untuk berpartisipasi secara efektif. Kedua, sebagian besar penambang Bitcoin sebenarnya tidak melakukan validasi blok secara lokal; sebaliknya, mereka mengandalkan kolam penambangan terpusat untuk menyediakan header blok. Masalah ini bisa dibilang lebih buruk: pada saat penulisan ini, tiga kolam penambangan teratas secara tidak langsung mengendalikan sekitar 50% kekuatan pemrosesan di jaringan Bitcoin, meskipun ini dimitigasi oleh fakta bahwa penambang dapat beralih ke kolam penambangan lain jika sebuah kolam atau koalisi mencoba serangan 51%.

Niat saat ini di Ethereum adalah menggunakan algoritma penambangan di mana penambang diharuskan untuk mengambil data acak dari status, menghitung beberapa transaksi yang dipilih secara acak dari N blok terakhir di blockchain, dan mengembalikan hash dari hasilnya. Ini memiliki dua manfaat penting. Pertama, kontrak Ethereum dapat mencakup segala jenis komputasi, sehingga ASIC Ethereum pada dasarnya akan menjadi ASIC untuk komputasi umum - yaitu, CPU yang lebih baik. Kedua, penambangan membutuhkan akses ke seluruh blockchain, memaksa penambang untuk menyimpan seluruh blockchain dan setidaknya mampu memverifikasi setiap transaksi. Ini menghilangkan kebutuhan akan kolam penambangan terpusat; meskipun kolam penambangan masih dapat melayani peran yang sah untuk meratakan keacakan distribusi hadiah, fungsi ini dapat dilayani sama baiknya oleh kolam peer-to-peer tanpa kendali pusat.

Model ini belum teruji, dan mungkin ada kesulitan di sepanjang jalan dalam menghindari pengoptimalan cerdas tertentu saat menggunakan eksekusi kontrak sebagai algoritma penambangan. Namun, salah satu fitur yang sangat menarik dari algoritma ini adalah memungkinkan siapa saja untuk "meracuni sumur", dengan memasukkan sejumlah besar kontrak ke dalam blockchain yang dirancang khusus untuk menghalangi ASIC tertentu. Insentif ekonomi ada bagi produsen ASIC untuk menggunakan trik semacam itu untuk saling menyerang. Dengan demikian, solusi yang kami kembangkan pada akhirnya adalah solusi manusia ekonomi adaptif daripada murni teknis.

### Skalabilitas {#scalability}

Salah satu kekhawatiran umum tentang Ethereum adalah masalah skalabilitas. Seperti Bitcoin, Ethereum menderita kelemahan bahwa setiap transaksi perlu diproses oleh setiap node di jaringan. Dengan Bitcoin, ukuran blockchain saat ini berada di sekitar 15 GB, tumbuh sekitar 1 MB per jam. Jika jaringan Bitcoin memproses 2000 transaksi per detik milik Visa, ia akan tumbuh sebesar 1 MB per tiga detik (1 GB per jam, 8 TB per tahun). Ethereum kemungkinan akan mengalami pola pertumbuhan yang serupa, diperburuk oleh fakta bahwa akan ada banyak aplikasi di atas blockchain Ethereum alih-alih hanya mata uang seperti halnya Bitcoin, tetapi diperbaiki oleh fakta bahwa node penuh Ethereum hanya perlu menyimpan status alih-alih seluruh riwayat blockchain.

Masalah dengan ukuran blockchain yang begitu besar adalah risiko sentralisasi. Jika ukuran blockchain meningkat menjadi, katakanlah, 100 TB, maka skenario yang mungkin terjadi adalah hanya sejumlah kecil bisnis besar yang akan menjalankan node penuh, dengan semua pengguna biasa menggunakan node SPV ringan. Dalam situasi seperti itu, muncul potensi kekhawatiran bahwa node penuh dapat bersatu dan semua setuju untuk menipu dengan cara yang menguntungkan (misalnya, mengubah hadiah blok, memberi diri mereka sendiri BTC). Node ringan tidak akan memiliki cara untuk mendeteksi ini dengan segera. Tentu saja, setidaknya satu node penuh yang jujur kemungkinan akan ada, dan setelah beberapa jam informasi tentang penipuan tersebut akan bocor melalui saluran seperti Reddit, tetapi pada saat itu sudah terlambat: akan terserah pada pengguna biasa untuk mengatur upaya memasukkan blok yang diberikan ke daftar hitam, masalah koordinasi yang masif dan kemungkinan tidak layak pada skala yang sama dengan melakukan serangan 51% yang sukses. Dalam kasus Bitcoin, ini saat ini menjadi masalah, tetapi ada modifikasi blockchain yang [disarankan oleh Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) yang akan meringankan masalah ini.

Dalam waktu dekat, Ethereum akan menggunakan dua strategi tambahan untuk mengatasi masalah ini. Pertama, karena algoritma penambangan berbasis blockchain, setidaknya setiap penambang akan dipaksa menjadi node penuh, menciptakan batas bawah pada jumlah node penuh. Kedua dan yang lebih penting, bagaimanapun, kami akan menyertakan akar pohon status perantara di blockchain setelah memproses setiap transaksi. Bahkan jika validasi blok terpusat, selama ada satu node verifikasi yang jujur, masalah sentralisasi dapat dihindari melalui protokol verifikasi. Jika seorang penambang menerbitkan blok yang tidak valid, blok tersebut harus diformat dengan buruk, atau status `S[n]` tidak benar. Karena `S[0]` diketahui benar, pasti ada beberapa status pertama `S[i]` yang tidak benar di mana `S[i-1]` benar. Node verifikasi akan memberikan indeks `i`, bersama dengan "bukti ketidakvalidan" yang terdiri dari subset node pohon Patricia yang perlu memproses `APPLY(S[i-1],TX[i]) -> S[i]`. Node akan dapat menggunakan node tersebut untuk menjalankan bagian komputasi itu, dan melihat bahwa `S[i]` yang dihasilkan tidak cocok dengan `S[i]` yang diberikan.

Serangan lain yang lebih canggih akan melibatkan penambang jahat yang menerbitkan blok yang tidak lengkap, sehingga informasi lengkap bahkan tidak ada untuk menentukan apakah blok tersebut valid atau tidak. Solusi untuk ini adalah protokol tantangan-respons (challenge-response): node verifikasi mengeluarkan "tantangan" dalam bentuk indeks transaksi target, dan setelah menerima node, node ringan memperlakukan blok tersebut sebagai tidak tepercaya sampai node lain, baik penambang atau pemverifikasi lain, memberikan subset node Patricia sebagai bukti validitas.

## Kesimpulan {#conclusion}

Protokol Ethereum pada awalnya disusun sebagai versi yang ditingkatkan dari mata uang kripto, menyediakan fitur-fitur canggih seperti eskro di atas blockchain, batas penarikan, kontrak keuangan, pasar perjudian, dan sejenisnya melalui bahasa pemrograman yang sangat umum. Protokol Ethereum tidak akan "mendukung" aplikasi apa pun secara langsung, tetapi keberadaan bahasa pemrograman Turing-complete berarti bahwa kontrak arbitrer secara teoretis dapat dibuat untuk jenis transaksi atau aplikasi apa pun. Namun, hal yang lebih menarik tentang Ethereum adalah bahwa protokol Ethereum bergerak jauh melampaui sekadar mata uang. Protokol seputar penyimpanan file terdesentralisasi, komputasi terdesentralisasi, dan pasar prediksi terdesentralisasi, di antara puluhan konsep serupa lainnya, memiliki potensi untuk secara substansial meningkatkan efisiensi industri komputasi, dan memberikan dorongan besar pada protokol peer-to-peer lainnya dengan menambahkan lapisan ekonomi untuk pertama kalinya. Terakhir, ada juga sejumlah besar aplikasi yang sama sekali tidak ada hubungannya dengan uang.

Konsep fungsi transisi status arbitrer seperti yang diimplementasikan oleh protokol Ethereum menyediakan platform dengan potensi unik; alih-alih menjadi protokol yang tertutup dan bertujuan tunggal yang ditujukan untuk serangkaian aplikasi tertentu dalam penyimpanan data, perjudian, atau keuangan, Ethereum pada dasarnya bersifat terbuka, dan kami percaya bahwa Ethereum sangat cocok untuk berfungsi sebagai lapisan dasar bagi sejumlah besar protokol keuangan dan non-keuangan di tahun-tahun mendatang.

## Catatan dan Bacaan Lebih Lanjut {#notes-and-further-reading}

### Catatan {#notes}

1. Pembaca yang cermat mungkin menyadari bahwa sebenarnya alamat Bitcoin adalah hash dari kunci publik kurva eliptik (elliptic curve), dan bukan kunci publik itu sendiri. Namun, sebenarnya ini adalah terminologi kriptografi yang sangat sah untuk menyebut hash kunci publik sebagai kunci publik itu sendiri. Hal ini karena kriptografi Bitcoin dapat dianggap sebagai algoritma tanda tangan digital kustom, di mana kunci publik terdiri dari hash kunci publik ECC, tanda tangan terdiri dari kunci publik ECC yang digabungkan dengan tanda tangan ECC, dan algoritma verifikasi melibatkan pemeriksaan kunci publik ECC dalam tanda tangan terhadap hash kunci publik ECC yang disediakan sebagai kunci publik dan kemudian memverifikasi tanda tangan ECC terhadap kunci publik ECC.
2. Secara teknis, median dari 11 blok sebelumnya.
3. Secara internal, 2 dan "CHARLIE" keduanya adalah angka<sup>[fn3](#notes)</sup>, dengan yang terakhir berada dalam representasi basis 256 big-endian. Angka dapat bernilai setidaknya 0 dan paling banyak 2<sup>256</sup>-1.

### Bacaan Lebih Lanjut {#further-reading}

1. [Nilai intrinsik](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Properti pintar](https://en.bitcoin.it/wiki/Smart_Property)
3. [Kontrak pintar](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Proof-of-work yang dapat digunakan kembali](https://nakamotoinstitute.org/finney/rpow/)
6. [Sertifikat properti yang aman dengan otoritas pemilik](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Whitepaper Bitcoin](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Segitiga Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Whitepaper Colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Whitepaper Mastercoin](https://github.com/mastercoin-MSC/spec)
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

_Untuk sejarah whitepaper, lihat [wiki ini](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/)._

_Ethereum, seperti banyak proyek perangkat lunak sumber terbuka yang digerakkan oleh komunitas, telah berkembang sejak awal kemunculannya. Untuk mempelajari tentang perkembangan terbaru Ethereum, dan bagaimana perubahan pada protokol dilakukan, kami merekomendasikan [panduan ini](/learn/)._