---
title: Optimistic Rollup
description: Pengantar tentang optimistic rollup—sebuah solusi skalabilitas yang digunakan oleh komunitas Ethereum.
lang: id
---

Optimistic rollup adalah protokol layer 2 (L2) yang dirancang untuk meningkatkan throughput dari layer dasar Ethereum. Mereka mengurangi beban komputasi pada rantai utama Ethereum dengan memproses transaksi di luar chain, sehingga menawarkan peningkatan kecepatan pemrosesan yang signifikan. Berbeda dengan solusi penskalaan lainnya, seperti [sidechain](/developers/docs/scaling/sidechains/), optimistic rollup mendapatkan keamanan dari Mainnet dengan memublikasikan hasil transaksi secara on-chain, atau [plasma chain](/developers/docs/scaling/plasma/), yang juga memverifikasi transaksi di Ethereum dengan fraud proof, tetapi menyimpan data transaksi di tempat lain.

Karena komputasi merupakan bagian yang lambat dan mahal dalam penggunaan Ethereum, optimistic rollup dapat menawarkan peningkatan skalabilitas hingga 10–100x. Optimistic rollup juga menulis transaksi ke Ethereum sebagai `calldata` atau dalam [blob](/roadmap/danksharding/), mengurangi biaya gas bagi pengguna.

## Persyaratan {#prerequisites}

Anda sebaiknya sudah membaca dan memahami halaman kami tentang [skaling Ethereum](/developers/docs/scaling/) dan [layer 2](/layer-2/).

## Apa itu optimistic rollup? {#what-is-an-optimistic-rollup}

Optimistic rollup adalah pendekatan untuk menskalakan Ethereum yang melibatkan pemindahan komputasi dan penyimpanan state ke luar chain. Optimistic rollup mengeksekusi transaksi di luar Ethereum, tetapi memposting data transaksi ke Mainnet sebagai `calldata` atau dalam [blob](/roadmap/danksharding/).

Operator optimistic rollup menggabungkan beberapa transaksi offchain menjadi batch besar sebelum dikirimkan ke Ethereum. Pendekatan ini memungkinkan pembagian biaya tetap di antara beberapa transaksi dalam setiap batch, sehingga mengurangi biaya bagi pengguna akhir. Optimistic rollup juga menggunakan teknik kompresi untuk mengurangi jumlah data yang diposting ke Ethereum.

Optimistic rollup disebut ‘optimistic’ karena mereka mengasumsikan bahwa transaksi offchain valid dan tidak mempublikasikan bukti validitas untuk batch transaksi yang dikirimkan ke on-chain. Hal ini memisahkan optimistic rollup dari [zero-knowledge rollup](/developers/docs/scaling/zk-rollups) yang memublikasikan [bukti validitas](/glossary/#validity-proof) kriptografis untuk transaksi off-chain.

Optimistic rollup sebaliknya mengandalkan skema fraud-proof untuk mendeteksi kasus di mana transaksi tidak dihitung dengan benar. Setelah batch rollup dikirimkan di Ethereum, ada jendela waktu (disebut periode tantangan) di mana siapa pun dapat menantang hasil transaksi rollup dengan menghitung [fraud proof](/glossary/#fraud-proof).

Jika fraud proof berhasil, protokol rollup akan mengeksekusi ulang transaksi dan memperbarui state rollup sesuai dengan hasilnya. Efek lain dari fraud proof yang berhasil adalah sequencer yang bertanggung jawab memasukkan transaksi yang dieksekusi secara salah ke dalam blok akan menerima penalti.

Jika batch rollup tetap tidak ditantang (yaitu, semua transaksi dieksekusi dengan benar) setelah periode tantangan berakhir, batch tersebut dianggap valid dan diterima di Ethereum. Orang lain dapat terus membangun di atas blok rollup yang belum dikonfirmasi, tetapi dengan catatan: hasil transaksi akan dibatalkan jika didasarkan pada transaksi yang dieksekusi secara salah yang dipublikasikan sebelumnya.

## Bagaimana optimistic rollup berinteraksi dengan Ethereum? Bagaimana cara optimistic rollup menskalakan Ethereum? {#optimistic-rollups-and-Ethereum}

Optimistic rollup adalah [solusi penskalaan off-chain](/developers/docs/scaling/#offchain-scaling) yang dibuat untuk beroperasi di atas Ethereum. Setiap optimistic rollup dikelola oleh sekumpulan smart contract yang diterapkan di jaringan Ethereum. Optimistic rollup memproses transaksi di luar rantai utama Ethereum, tetapi memposting transaksi offchain (dalam bentuk batch) ke smart contract rollup di on-chain. Seperti blockchain Ethereum, catatan transaksi ini bersifat immutable dan membentuk "rantai optimistic rollup."

Arsitektur optimistic rolliup terdiri dari bagian-bagian berikut ini:

**Kontrak on-chain**: Operasi optimistic rollup dikendalikan oleh smart contract yang berjalan di Ethereum. Ini mencakup kontrak yang menyimpan blok rollup, memantau pembaruan state pada rollup, dan melacak deposit pengguna. Dalam hal ini, Ethereum berfungsi sebagai base layer atau ‘layer 1’ untuk optimistic rollup.

**Mesin virtual (VM) off-chain**: Meskipun kontrak yang mengelola protokol optimistic rollup berjalan di Ethereum, protokol rollup melakukan komputasi dan penyimpanan state di mesin virtual lain yang terpisah dari [Mesin Virtual Ethereum](/developers/docs/evm/). Offchain VM adalah tempat aplikasi berjalan dan perubahan state dieksekusi; ini berfungsi sebagai lapisan atas atau ‘layer 2’ untuk sebuah optimistic rollup.

Karena optimistic rollup dirancang untuk menjalankan program yang ditulis atau dikompilasi untuk EVM, offchain VM mengadopsi banyak spesifikasi desain dari EVM. Selain itu, fraud proof yang dihitung secara on-chain memungkinkan jaringan Ethereum untuk menerapkan validitas perubahan state yang dihitung di VM off-chain.

Optimistic rollup disebut sebagai ‘solusi skalabilitas hibrida’ karena, meskipun mereka ada sebagai protokol terpisah, sifat keamanan mereka berasal dari Ethereum. Di antara hal-hal lainnya, Ethereum menjamin kebenaran komputasi offchain dari sebuah rollup dan ketersediaan data di balik komputasi tersebut. Hal ini membuat optimistic rollup lebih aman daripada protokol penskalaan murni off-chain (misalnya, [sidechain](/developers/docs/scaling/sidechains/)) yang tidak bergantung pada Ethereum untuk keamanan.

Optimistic rollup bergantung pada protokol utama Ethereum untuk hal-hal berikut ini:

### Ketersediaan data {#data-availability}

Seperti yang disebutkan, optimistic rollup memposting data transaksi ke Ethereum sebagai `calldata` atau [blob](/roadmap/danksharding/). Karena eksekusi rantai rollup didasarkan pada transaksi yang dikirimkan, siapa pun dapat menggunakan informasi ini—yang tertambat pada layer dasar Ethereum—untuk mengeksekusi state rollup dan memverifikasi kebenaran transisi state.

[Ketersediaan data](/developers/docs/data-availability/) sangat penting karena tanpa akses ke data state, penantang tidak dapat membuat fraud proof untuk membantah operasi rollup yang tidak valid. Dengan Ethereum menyediakan ketersediaan data, risiko operator rollup lolos dari tindakan jahat (misalnya, mengirimkan blok yang tidak valid) berkurang.

### Ketahanan sensor {#censorship-resistance}

Optimistic rollup juga mengandalkan Ethereum untuk censorship resistance. Dalam sebuah optimistic rollup, sebuah entitas terpusat (operator) bertanggung jawab untuk memproses transaksi dan mengirimkan blok rollup ke Ethereum. Hal ini memiliki beberapa implikasi:

- Operator rollup dapat menyensor pengguna dengan sepenuhnya offline, atau dengan menolak untuk membuat blok yang memasukkan transaksi tertentu di dalamnya.

- Operator rollup dapat mencegah pengguna menarik dana yang disetorkan ke kontrak rollup dengan menahan data state yang diperlukan untuk Merkle proof kepemilikan. Menahan data state juga dapat menyembunyikan state rollup dari pengguna dan mencegah mereka berinteraksi dengan rollup.

Optimistic rollup menyelesaikan masalah ini dengan memaksa operator untuk mempublikasikan data yang terkait dengan pembaruan state di Ethereum. Mempublikasikan data rollup di onchain memiliki manfaat berikut:

- Jika operator optimistic rollup offline atau berhenti membuat batch transaksi, node lain dapat menggunakan data yang tersedia untuk mereproduksi state terakhir rollup dan melanjutkan produksi blok.

- Pengguna dapat menggunakan data transaksi untuk membuat Merkle proof yang membuktikan kepemilikan dana dan menarik aset mereka dari rollup.

- Pengguna juga dapat mengirimkan transaksi mereka ke L1 alih-alih ke sequencer, dalam hal ini sequencer harus memasukkan transaksi tersebut dalam batas waktu tertentu agar tetap dapat memproduksi blok yang valid.

### Penyelesaian {#settlement}

Peran lain yang dimainkan Ethereum dalam konteks optimistic rollup adalah sebagai lapisan penyelesaian. Lapisan penyelesaian menjadi jangkar bagi seluruh ekosistem blockchain, menetapkan keamanan, dan menyediakan finalitas objektif jika terjadi sengketa di rantai lain (dalam hal ini optimistic rollup) yang memerlukan arbitrase.

Jaringan Utama Ethereum menyediakan hub untuk optimistic rollup untuk memverifikasi bukti penipuan dan menyelesaikan perselisihan. Selain itu, transaksi yang dilakukan pada rollup hanya bersifat final _setelah_ blok rollup diterima di Ethereum. Setelah transaksi rollup dikomitmen ke layer dasar Ethereum, transaksi tersebut tidak dapat dibatalkan (kecuali dalam kasus reorganisasi rantai yang sangat tidak mungkin terjadi).

## Bagaimana cara kerja optimistic rollup? {#how-optimistic-rollups-work}

### Eksekusi dan agregasi transaksi {#transaction-execution-and-aggregation}

Pengguna mengirimkan transaksi ke ‘operator’, yaitu node yang bertanggung jawab memproses transaksi di optimistic rollup. Juga dikenal sebagai ‘validator’ atau ‘aggregator’, operator menggabungkan transaksi, mengompresi data yang mendasarinya, dan mempublikasikan blok tersebut di Ethereum.

Meskipun siapa pun dapat menjadi validator, validator optimistic rollup harus memberikan jaminan sebelum menghasilkan blok, seperti halnya [sistem proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Jaminan ini dapat dipotong jika validator memposting blok yang tidak valid atau membangun di atas blok lama yang tidak valid (meskipun blok mereka sendiri valid). Dengan cara ini, optimistic rollup memanfaatkan insentif ekonomi kripto untuk memastikan validator bertindak jujur.

Validator lain di rantai optimistic rollup diharapkan mengeksekusi transaksi yang dikirimkan menggunakan salinan state rollup mereka. Jika state akhir validator berbeda dari state yang diusulkan operator, mereka dapat memulai tantangan dan menghitung fraud proof.

Beberapa optimistic rollup mungkin mengabaikan sistem validator tanpa izin dan menggunakan satu ‘sequencer’ untuk mengeksekusi rantai. Seperti validator, sequencer memproses transaksi, membuat blok rollup, dan mengirimkan transaksi rollup ke rantai L1 (Ethereum).

Sequencer berbeda dari operator rollup biasa karena mereka memiliki kontrol lebih besar atas urutan transaksi. Selain itu, sequencer memiliki akses prioritas ke rantai rollup dan merupakan satu-satunya entitas yang berwenang mengirimkan transaksi ke kontrak on-chain. Transaksi dari node non-sequencer atau pengguna biasa hanya akan dimasukkan ke dalam antrean di inbox terpisah hingga sequencer memasukkannya ke dalam batch baru.

#### Mengirimkan blok rollup ke Ethereum {#submitting-blocks-to-ethereum}

Seperti yang disebutkan, operator optimistic rollup menggabungkan transaksi offchain menjadi sebuah batch dan mengirimkannya ke Ethereum untuk dinotariskan. Proses ini melibatkan pemadatan data terkait transaksi dan memublikasikannya di Ethereum sebagai `calldata` atau dalam blob.

`calldata` adalah area yang tidak dapat diubah dan tidak persisten dalam smart contract yang sebagian besar berperilaku seperti [memori](/developers/docs/smart-contracts/anatomy/#memory). Meskipun `calldata` tetap ada secara on-chain sebagai bagian dari [log riwayat](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) blockchain, data tersebut tidak disimpan sebagai bagian dari state Ethereum. Karena `calldata` tidak menyentuh bagian mana pun dari state Ethereum, `calldata` lebih murah daripada state untuk menyimpan data secara on-chain.

Kata kunci `calldata` juga digunakan dalam Solidity untuk meneruskan argumen ke fungsi smart contract pada waktu eksekusi. `calldata` mengidentifikasi fungsi yang dipanggil selama transaksi dan menampung input ke fungsi dalam bentuk urutan bita arbitrer.

Dalam konteks optimistic rollup, `calldata` digunakan untuk mengirim data transaksi terkompresi ke kontrak on-chain. Operator rollup menambahkan batch baru dengan memanggil fungsi yang diperlukan di kontrak rollup dan mengirimkan data yang dikompresi sebagai argumen fungsi. Menggunakan `calldata` mengurangi biaya pengguna karena sebagian besar biaya yang ditimbulkan rollup berasal dari penyimpanan data secara on-chain.

Berikut adalah [contoh](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) pengiriman batch rollup untuk menunjukkan cara kerja konsep ini. Sequencer memanggil metode `appendSequencerBatch()` dan meneruskan data transaksi terkompresi sebagai input menggunakan `calldata`.

Beberapa rollup sekarang menggunakan blob untuk mengirim batch transaksi ke Ethereum.

Blob bersifat tidak dapat diubah dan tidak persisten (seperti `calldata`) tetapi dipangkas dari riwayat setelah ~18 hari. Untuk informasi lebih lanjut tentang blob, lihat [Danksharding](/roadmap/danksharding).

### Komitmen status {#state-commitments}

Pada setiap titik waktu, state optimistic rollup (akun, saldo, kode kontrak, dll.) diorganisir sebagai [Pohon Merkle](/whitepaper/#merkle-trees) yang disebut "pohon state". Akar dari Merkle tree ini (state root), yang merujuk pada state terbaru rollup, di-hash dan disimpan di kontrak rollup. Setiap transisi state di rantai menghasilkan state rollup baru, yang dikomitmen oleh operator dengan menghitung state root baru.

Operator diwajibkan untuk mengirimkan state root lama maupun state root baru saat memposting batch. Jika state root lama cocok dengan state root yang ada di kontrak on-chain, yang lama akan dibuang dan diganti dengan state root baru.

Operator rollup juga diwajibkan untuk mengkomit Merkle root dari batch transaksi itu sendiri. Ini memungkinkan siapa pun untuk membuktikan penyertaan transaksi dalam batch (di L1) dengan menunjukkan [bukti Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

State commitment, terutama state root, diperlukan untuk membuktikan kebenaran perubahan state dalam sebuah optimistic rollup. Kontrak rollup menerima state root baru dari operator segera setelah dikirim, tetapi dapat menghapus state root yang tidak valid kemudian untuk mengembalikan rollup ke state yang benar.

### Pembuktian fraud {#fraud-proving}

Seperti yang telah dijelaskan, optimistic rollup mengizinkan siapa saja untuk menerbitkan blok tanpa memberikan bukti validitas. Namun, untuk memastikan rantai tetap aman, optimistic rollup menetapkan jendela waktu di mana siapa pun dapat mempersoalkan sebuah transisi state. Oleh karena itu, blok rollup disebut "pernyataan" karena siapa pun dapat membantah validitasnya.

Jika seseorang mempersoalkan sebuah pernyataan, maka protokol rollup akan memulai perhitungan fraud proof. Setiap jenis fraud proof bersifat interaktif—seseorang harus mengirimkan sebuah pernyataan sebelum orang lain dapat menantangnya. Perbedaannya terletak pada berapa banyak putaran interaksi yang diperlukan untuk menghitung fraud proof.

Skema pembuktian interaktif satu putaran memutar ulang transaksi yang disengketakan di L1 untuk mendeteksi pernyataan yang tidak valid. Protokol rollup meniru eksekusi ulang transaksi yang disengketakan di L1 (Ethereum) menggunakan kontrak verifier, dengan state root yang dihitung menentukan siapa yang memenangkan tantangan. Jika klaim pihak yang menantang mengenai state rollup yang benar terbukti, operator akan dikenai sanksi dengan dipotong jaminannya.

Namun, mengeksekusi ulang transaksi di L1 untuk mendeteksi penipuan membutuhkan publikasi state commitment untuk setiap transaksi dan meningkatkan jumlah data yang harus dipublikasikan rollup di on-chain. Transaksi ulang juga dikenakan biaya gas yang signifikan. Untuk alasan ini, optimistic rollup beralih ke pembuktian interaktif multi-putaran, yang mencapai tujuan yang sama (yaitu mendeteksi operasi rollup yang tidak valid) dengan lebih efisien.

#### Pembuktian interaktif multi-babak {#multi-round-interactive-proving}

Pembuktian interaktif multi-putaran melibatkan protokol bolak-balik antara pihak yang mengajukan pernyataan dan pihak yang menantang yang diawasi oleh kontrak verifier L1, yang pada akhirnya menentukan pihak yang berbohong. Setelah node L2 menantang sebuah pernyataan, pihak pengaju pernyataan diwajibkan untuk membagi pernyataan yang disengketakan menjadi dua bagian yang sama. Setiap pernyataan individu dalam kasus ini akan memuat jumlah langkah komputasi yang sama dengan yang lain.

Penantang kemudian akan memilih pernyataan mana yang ingin ditantang. Proses pembagian (disebut "protokol biseksi") berlanjut hingga kedua belah pihak membantah pernyataan tentang _satu_ langkah eksekusi. Pada titik ini, kontrak L1 akan menyelesaikan perselisihan dengan mengevaluasi instruksi (dan hasilnya) untuk menangkap pihak yang melakukan penipuan.

Pihak pengaju pernyataan diwajibkan memberikan ‘one-step proof’ untuk memverifikasi keabsahan komputasi satu langkah yang disengketakan. Jika pihak pengaju pernyataan gagal memberikan one-step proof, atau verifier L1 menganggap bukti tersebut tidak valid, mereka akan kalah dalam tantangan.

Beberapa catatan tentang jenis bukti penipuan ini:

1. Pembuktian penipuan interaktif multi-putaran dianggap efisien karena meminimalkan pekerjaan yang harus dilakukan rantai L1 dalam arbitrase perselisihan. Alih-alih memutar ulang seluruh transaksi, rantai L1 hanya perlu mengeksekusi ulang satu langkah dalam eksekusi rollup.

2. Protokol bisection mengurangi jumlah data yang dipublikasikan di on-chain (tidak perlu mempublikasikan state commit untuk setiap transaksi). Selain itu, transaksi optimistic rollup tidak dibatasi oleh gas limit Ethereum. Sebaliknya, ketika optimistic rollup mengeksekusi ulang transaksi, harus memastikan bahwa transaksi L2 memiliki gas limit lebih rendah agar dapat meniru eksekusinya dalam satu transaksi Ethereum.

3. Sebagian dari jaminan pihak pengaju pernyataan yang jahat diberikan kepada pihak yang menantang, sementara sebagian lainnya dibakar. Pembakaran mencegah kolusi di antara para validator; jika dua validator berkolusi untuk memulai tantangan palsu, mereka tetap akan kehilangan sebagian besar dari total stake.

4. Pembuktian interaktif multi-putaran mengharuskan kedua pihak (pengaju pernyataan dan pihak yang menantang) melakukan langkah dalam jendela waktu yang ditentukan. Kegagalan untuk bertindak sebelum batas waktu berakhir menyebabkan pihak yang lalai kalah dalam tantangan.

#### Mengapa fraud proof penting untuk optimistic rollup {#fraud-proof-benefits}

Fraud proof penting karena memfasilitasi _finalitas tanpa kepercayaan_ dalam optimistic rollup. Trustless finality adalah sifat dari optimistic rollup yang menjamin bahwa sebuah transaksi—selama valid—pada akhirnya akan dikonfirmasi.

Node jahat dapat mencoba menunda konfirmasi sebuah blok rollup yang valid dengan memulai tantangan palsu. Namun, fraud proof pada akhirnya akan membuktikan keabsahan blok rollup dan menyebabkan blok tersebut dikonfirmasi.

Ini juga berkaitan dengan properti keamanan lain dari optimistic rollup: validitas chain bergantung pada keberadaan _satu_ node yang jujur. Node yang jujur dapat memajukan rantai dengan benar dengan cara mengirimkan pernyataan yang valid atau mempersoalkan pernyataan yang tidak valid. Bagaimanapun juga, node jahat yang terlibat dalam perselisihan dengan node yang jujur akan kehilangan stake mereka selama proses pembuktian penipuan.

### Interoperabilitas L1/L2 {#l1-l2-interoperability}

Optimistic rollup dirancang agar interoperable dengan Ethereum Mainnet dan memungkinkan pengguna mengirim pesan serta data arbitrary antara L1 dan L2. Mereka juga kompatibel dengan EVM, sehingga Anda dapat mem-porting [dapps](/developers/docs/dapps/) yang sudah ada ke optimistic rollup atau membuat dapps baru menggunakan alat pengembangan Ethereum.

#### 1. Pergerakan aset {#asset-movement}

##### Memasuki rollup

Untuk menggunakan optimistic rollup, pengguna menyetorkan ETH, token ERC-20, dan aset lain yang diterima di kontrak [jembatan](/developers/docs/bridges/) rollup di L1. Kontrak penghubung akan meneruskan transaksi ke L2, di mana jumlah aset yang setara dicetak dan dikirim ke alamat yang dipilih pengguna pada optimistic rollup.

Transaksi yang dibuat pengguna (seperti deposit L1 > L2) biasanya diantrekan hingga sequencer mengirimkannya kembali ke kontrak rollup. Namun, untuk menjaga resistensi terhadap sensor, optimistic rollups memungkinkan pengguna mengirim transaksi langsung ke kontrak rollup onchain jika transaksi tersebut tertunda melewati batas waktu maksimum yang diizinkan.

Beberapa optimistic rollup mengadopsi pendekatan yang lebih mudah untuk mencegah sequencer menyensor pengguna. Di sini, sebuah blok ditentukan oleh semua transaksi yang dikirimkan ke kontrak L1 sejak blok sebelumnya (misalnya, setoran) di samping transaksi yang diproses pada rollup chain. Jika sequencer mengabaikan transaksi L1, maka itu akan menerbitkan akar status yang (kemungkinan besar) salah; oleh karena itu, sequencer tidak dapat menunda messages yang dibuat oleh pengguna setelah dikirim pada L1.

##### Keluar dari rollup

Penarikan dari optimistic rollup ke Ethereum lebih sulit karena skema pembuktian penipuan. Jika pengguna memulai transaksi L2 > L1 untuk menarik dana yang di-escrow di L1, mereka harus menunggu hingga periode tantangan—yang berlangsung sekitar tujuh hari—berakhir. Namun demikian, proses penarikan itu sendiri cukup mudah.

Setelah permintaan penarikan dimulai pada L2 rollup, transaksi tersebut akan dimasukkan ke dalam batch berikutnya, sementara aset pengguna pada rollup akan dibakar. Setelah batch diterbitkan di Ethereum, pengguna dapat menghitung bukti Merkle yang memverifikasi penyertaan transaksi keluar mereka di blok. Kemudian tinggal menunggu selama periode penundaan untuk menyelesaikan transaksi di L1 dan menarik dana ke Jaringan Utama.

Untuk menghindari menunggu seminggu sebelum menarik dana ke Ethereum, pengguna optimistic rollup dapat menggunakan **penyedia likuiditas** (LP). Penyedia likuiditas mengambil kepemilikan penarikan L2 yang tertunda dan membayar pengguna pada L1 (dengan imbalan biaya).

Penyedia likuiditas dapat memeriksa validitas permintaan penarikan pengguna (dengan mengeksekusi chain itu sendiri) sebelum melepaskan dana. Dengan cara ini mereka memiliki jaminan bahwa transaksi pada akhirnya akan dikonfirmasi (yaitu, finalitas tanpa kepercayaan).

#### 2. Kompatibilitas EVM {#evm-compatibility}

Bagi pengembang, keuntungan dari optimistic rollup adalah kompatibilitasnya—atau, lebih baik lagi, kesetaraannya—dengan [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/). Rollup yang kompatibel dengan EVM mematuhi spesifikasi dalam [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) dan mendukung EVM di tingkat bytecode.

Kompatibilitas EVM dalam optimistic rollup memiliki manfaat sebagai berikut:

i. Pengembang dapat memigrasikan kontrak pintar yang ada di Ethereum ke optimistic rollup chain tanpa harus memodifikasi basis kode secara luas. Hal ini dapat menghemat waktu tim pengembangan saat menyebarkan kontrak pintar Ethereum di L2.

ii. Pengembang dan tim proyek yang menggunakan optimistic rollup dapat memanfaatkan infrastruktur Ethereum. Ini termasuk bahasa pemrograman, pustaka kode, perangkat pengujian, perangkat lunak klien, infrastruktur penyebaran, dan sebagainya.

Menggunakan perangkat yang ada adalah penting karena perangkat ini telah diaudit secara luas, di-debug, dan ditingkatkan selama bertahun-tahun. Hal ini juga menghilangkan kebutuhan bagi pengembang Ethereum untuk belajar bagaimana cara membangun dengan tumpukan pengembangan yang sepenuhnya baru.

#### 3. Panggilan kontrak lintas-chain {#cross-chain-contract-calls}

Pengguna (akun yang dimiliki secara eksternal) berinteraksi dengan kontrak L2 dengan mengirimkan transaksi ke kontrak rollup atau meminta sequencer atau validator melakukannya untuk mereka. Optimistic rollup juga memungkinkan akun kontrak di Ethereum untuk berinteraksi dengan kontrak L2 menggunakan kontrak penghubung untuk menyampaikan messages dan meneruskan data antara L1 dan L2. Ini berarti Anda dapat memprogram kontrak L1 di Jaringan Utama Ethereum untuk menjalankan fungsi yang termasuk dalam kontrak pada L2 optimistic rollup.

Panggilan kontrak cross-chain terjadi secara asinkron—artinya panggilan dimulai terlebih dahulu, kemudian dieksekusi di lain waktu. Ini berbeda dari panggilan antara dua kontrak di Ethereum, di mana panggilan tersebut segera memberikan hasil.

Contoh dari panggilan kontrak cross-chain adalah setoran token yang dijelaskan sebelumnya. Sebuah kontrak pada L1 menampung token pengguna dan mengirimkan message ke kontrak L2 yang dipasangkan untuk mencetak jumlah token yang sama pada rollup.

Karena panggilan pesan lintas-chain menghasilkan eksekusi kontrak, pengirim biasanya diharuskan untuk menanggung [biaya gas](/developers/docs/gas/) untuk komputasi. Disarankan untuk set batas gas yang tinggi untuk mencegah kegagalan transaksi pada target chain. Skenario penghubung token adalah contoh yang bagus; jika sisi L1 dari transaksi (penyetoran token) berfungsi, tetapi sisi L2 (mencetak token baru) gagal karena gas yang rendah, setoran menjadi tidak dapat dipulihkan.

Terakhir, perlu dicatat bahwa panggilan pesan L2 > L1 antar kontrak perlu memperhitungkan penundaan (panggilan L1 > L2 biasanya dieksekusi setelah beberapa menit). Ini karena messages yang dikirim ke Jaringan Utama dari optimistic rollup tidak dapat dieksekusi sampai jendela tantangan berakhir.

## Bagaimana cara kerja biaya optimistic rollup? {#how-do-optimistic-rollup-fees-work}

Optimistic rollup menggunakan skema biaya gas, seperti halnya Ethereum, untuk menunjukkan berapa banyak pengguna membayar per transaksi. Biaya yang dikenakan pada optimistic rollup bergantung pada komponen berikut:

1. **Penulisan state**: Optimistic rollup memublikasikan data transaksi dan header blok (terdiri dari hash header blok sebelumnya, state root, batch root) ke Ethereum sebagai `blob`, atau "binary large object". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) memperkenalkan solusi hemat biaya untuk menyertakan data secara on-chain. `blob` adalah bidang transaksi baru yang memungkinkan rollup memposting data transisi state terkompresi ke Ethereum L1. Berbeda dengan `calldata`, yang tetap secara permanen on-chain, blob berumur pendek dan dapat dipangkas dari klien setelah [4096 epoch](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (sekitar 18 hari). Dengan menggunakan blob untuk memposting batch transaksi yang terkompresi, optimistic rollups dapat secara signifikan mengurangi biaya penulisan transaksi ke L1.

2. **Gas blob yang digunakan**: Transaksi pembawa blob menggunakan mekanisme biaya dinamis yang serupa dengan yang diperkenalkan oleh [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Biaya gas untuk transaksi tipe-3 memperhitungkan biaya dasar untuk blob, yang ditentukan oleh jaringan berdasarkan permintaan ruang blob dan penggunaan ruang blob dari transaksi yang dikirim.

3. **Biaya operator L2**: Ini adalah jumlah yang dibayarkan kepada node rollup sebagai kompensasi atas biaya komputasi yang timbul dalam memproses transaksi, seperti biaya gas di Ethereum. Node rollup membebankan biaya transaksi yang lebih rendah karena L2 memiliki kapasitas pemrosesan yang lebih tinggi dan tidak dihadapkan pada kepadatan jaringan yang memaksa validator di Ethereum untuk memprioritaskan transaksi dengan biaya yang lebih tinggi.

Optimistic rollup menerapkan beberapa mekanisme untuk mengurangi biaya bagi pengguna, termasuk menggabungkan transaksi dan memadatkan `calldata` untuk mengurangi biaya publikasi data. Anda dapat memeriksa [pelacak biaya L2](https://l2fees.info/) untuk gambaran waktu nyata tentang berapa biaya untuk menggunakan optimistic rollup berbasis Ethereum.

## Bagaimana optimistic rollup menskalakan Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Seperti yang telah dijelaskan, optimistic rollup menerbitkan data transaksi terkompresi di Ethereum untuk menjamin ketersediaan data. Kemampuan untuk mengompresi data yang dipublikasikan di onchain sangat penting untuk meningkatkan throughput Ethereum dengan optimistic rollups.

Chain utama Ethereum memberlakukan batasan pada seberapa banyak data yang dapat ditampung blok, dalam satuan gas ([ukuran blok rata-rata](/developers/docs/blocks/#block-size) adalah 15 juta gas). Meskipun hal ini membatasi jumlah gas yang dapat digunakan untuk setiap transaksi, ini juga berarti kita dapat meningkatkan transaksi yang diproses per blok dengan mengurangi data yang terkait dengan transaksi—secara langsung meningkatkan skalabilitas.

Optimistic rollup menggunakan beberapa teknik untuk mencapai kompresi data transaksi dan meningkatkan angka TPS. Misalnya, [artikel](https://vitalik.eth.limo/general/2021/01/05/rollup.html) ini membandingkan data yang dihasilkan transaksi pengguna dasar (mengirim ether) di Mainnet vs. berapa banyak data yang dihasilkan transaksi yang sama di rollup:

| Parameter    | Ethereum (L1)                     | Rollup (L2)       |
| ------------ | ---------------------------------------------------- | ------------------------------------ |
| Nonce        | ~3                                   | 0                                    |
| Harga gas    | ~8                                   | 0-0.5                |
| Gas          | 3                                                    | 0-0.5                |
| Ke           | 21                                                   | 4                                    |
| Nilai        | 9                                                    | ~3                   |
| Tanda tangan | ~68 (2 + 33 + 33) | ~0.5 |
| Dari         | 0 (dikembalikan dari sig)         | 4                                    |
| **Total**    | **~112 bita**                        | **~12 bytes**        |

Melakukan perhitungan kasar pada angka-angka ini dapat membantu menunjukkan peningkatan skalabilitas yang diberikan oleh optimistic rollup:

1. Ukuran target untuk setiap blok adalah 15 juta gas dan dibutuhkan 16 gas untuk memverifikasi satu byte data. Membagi ukuran blok rata-rata dengan 16 gas (15.000.000/16) menunjukkan blok rata-rata dapat menampung **937.500 bita data**.
2. Jika transaksi rollup dasar menggunakan 12 bita, maka blok Ethereum rata-rata dapat memproses **78.125 transaksi rollup** (937.500/12) atau **39 batch rollup** (jika setiap batch menampung rata-rata 2.000 transaksi).
3. Jika blok baru diproduksi di Ethereum setiap 15 detik, maka kecepatan pemrosesan rollup akan mencapai sekitar **5.208 transaksi per detik**. Ini dilakukan dengan membagi jumlah transaksi rollup dasar yang dapat ditampung oleh blok Ethereum (**78.125**) dengan waktu blok rata-rata (**15 detik**).

Ini adalah perkiraan yang cukup optimis, mengingat bahwa transaksi optimistic rollup tidak mungkin mencakup seluruh blok di Ethereum. Namun, ini dapat memberikan gambaran kasar tentang seberapa besar peningkatan skalabilitas yang dapat diberikan oleh optimistic rollup kepada pengguna Ethereum (implementasi saat ini menawarkan hingga 2.000 TPS).

Pengenalan [pecahan data](/roadmap/danksharding/) di Ethereum diharapkan dapat meningkatkan skalabilitas dalam optimistic rollup. Karena transaksi rollup harus berbagi ruang blok dengan transaksi non-rollup lainnya, kapasitas pemrosesannya dibatasi oleh keluaran data pada chain utama Ethereum. Danksharding akan meningkatkan ruang yang tersedia bagi chain L2 untuk memublikasikan data per blok, menggunakan penyimpanan "blob" yang lebih murah dan tidak permanen daripada `CALLDATA` yang mahal dan permanen.

### Kelebihan dan kekurangan optimistic rollup {#optimistic-rollups-pros-and-cons}

| Kelebihan                                                                                                                                                                                          | Kekurangan                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Menawarkan peningkatan besar-besaran dalam skalabilitas tanpa mengorbankan keamanan atau kepercayaan.                                                                              | Keterlambatan dalam finalitas transaksi karena potensi tantangan penipuan.                                                                                                         |
| Data transaksi disimpan pada chain lapisan 1, meningkatkan transparansi, keamanan, ketahanan terhadap sensor, dan desentralisasi.                                                  | Operator rollup terpusat (sequencer) dapat memengaruhi pemesanan transaksi.                                                                                     |
| Pembuktian penipuan menjamin hasil akhir yang tidak dapat dipercaya dan memungkinkan minoritas yang jujur untuk mengamankan chain.                                                 | Jika tidak ada node yang jujur, operator yang jahat dapat mencuri dana dengan mengirim blok yang tidak valid dan komitmen status.                                                  |
| Bukti penipuan komputasi terbuka untuk node L2 biasa, tidak seperti bukti validitas (yang digunakan dalam ZK-rollup) yang membutuhkan perangkat keras khusus.   | Model keamanan bergantung pada setidaknya satu node yang jujur yang mengeksekusi transaksi rollup dan mengirimkan bukti penipuan untuk menantang transisi status yang tidak valid. |
| Rollup mendapat manfaat dari "liveness tanpa kepercayaan" (siapa pun dapat memaksa chain untuk maju dengan mengeksekusi transaksi dan menerbitkan pernyataan)                   | Pengguna harus menunggu periode tantangan satu minggu berakhir sebelum menarik dana kembali ke Ethereum.                                                                           |
| Optimistic rollup bergantung pada insentif ekonomi kripto yang dirancang dengan baik untuk meningkatkan keamanan pada chain.                                                       | Rollups harus memposting semua data transaksi di onchain, yang dapat meningkatkan biaya.                                                                                           |
| Kompatibilitas dengan EVM dan Solidity memungkinkan pengembang untuk mem-port kontrak pintar asli Ethereum ke rollup atau menggunakan perangkat yang ada untuk membuat dapps baru. |                                                                                                                                                                                                    |

### Penjelasan visual tentang optimistic rollup {#optimistic-video}

Selengkapnya tentang pelajar visual? Tonton Finematics menjelaskan optimistic rollup:

<YouTube id="7pWxCklcNsU" start="263" />

## Baca lebih lanjut tentang optimistic rollup

- [Bagaimana cara kerja optimistic rollup (Panduan Lengkap)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Apa itu Blockchain Rollup? Sebuah Pengantar Teknis](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Panduan Penting untuk Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Panduan Praktis untuk Rollup Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Keadaan Fraud Proof di L2 Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Bagaimana Rollup Optimism benar-benar bekerja?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Seluk Beluk OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a309d1085f52)
- [Apa itu Mesin Virtual Optimis?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
