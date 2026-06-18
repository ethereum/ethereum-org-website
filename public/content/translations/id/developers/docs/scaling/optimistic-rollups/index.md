---
title: Rollup Optimistic
description: "Pengantar tentang rollup Optimistic—solusi penskalaan yang digunakan oleh komunitas Ethereum."
lang: id
---

Rollup Optimistic adalah protokol lapisan 2 (l2) yang dirancang untuk memperluas laju pemrosesan lapisan dasar Ethereum. Mereka mengurangi komputasi pada rantai utama [Ethereum](/) dengan memproses transaksi secara offchain, menawarkan peningkatan signifikan dalam kecepatan pemrosesan. Tidak seperti solusi penskalaan lainnya, seperti [sidechain](/developers/docs/scaling/sidechains/), rollup Optimistic memperoleh keamanan dari Mainnet dengan memublikasikan hasil transaksi secara onchain, atau [rantai Plasma](/developers/docs/scaling/plasma/), yang juga memverifikasi transaksi di Ethereum dengan bukti penipuan, tetapi menyimpan data transaksi di tempat lain.

Karena komputasi adalah bagian yang lambat dan mahal dari penggunaan Ethereum, rollup Optimistic dapat menawarkan peningkatan skalabilitas hingga 10-100x. Rollup Optimistic juga menulis transaksi ke Ethereum sebagai `calldata` atau dalam [blob](/roadmap/danksharding/), mengurangi biaya gas untuk pengguna.

## Prasyarat {#prerequisites}

Anda harus sudah membaca dan memahami halaman kami tentang [penskalaan Ethereum](/developers/docs/scaling/) dan [lapisan 2](/layer-2/).

## Apa itu rollup Optimistic? {#what-is-an-optimistic-rollup}

Rollup Optimistic adalah pendekatan untuk menskalakan Ethereum yang melibatkan pemindahan komputasi dan penyimpanan state secara offchain. Rollup Optimistic mengeksekusi transaksi di luar Ethereum, tetapi memposting data transaksi ke Mainnet sebagai `calldata` atau dalam [blob](/roadmap/danksharding/).

Operator rollup Optimistic menggabungkan beberapa transaksi offchain bersama-sama dalam batch besar sebelum mengirimkannya ke Ethereum. Pendekatan ini memungkinkan penyebaran biaya tetap di beberapa transaksi dalam setiap batch, mengurangi biaya untuk pengguna akhir. Rollup Optimistic juga menggunakan teknik kompresi untuk mengurangi jumlah data yang diposting di Ethereum.

Rollup Optimistic dianggap "optimistis" karena mereka mengasumsikan transaksi offchain adalah valid dan tidak memublikasikan bukti validitas untuk batch transaksi yang diposting secara onchain. Hal ini membedakan rollup Optimistic dari [rollup zero-knowledge](/developers/docs/scaling/zk-rollups) yang memublikasikan [bukti validitas](/glossary/#validity-proof) kriptografis untuk transaksi offchain.

Rollup Optimistic sebaliknya bergantung pada skema pembuktian penipuan untuk mendeteksi kasus di mana transaksi tidak dihitung dengan benar. Setelah batch rollup dikirimkan di Ethereum, ada jendela waktu (disebut periode tantangan) di mana siapa pun dapat menantang hasil transaksi rollup dengan menghitung [bukti penipuan](/glossary/#fraud-proof).

Jika bukti penipuan berhasil, protokol rollup mengeksekusi ulang transaksi dan memperbarui state rollup yang sesuai. Efek lain dari bukti penipuan yang berhasil adalah bahwa sekuenser yang bertanggung jawab untuk memasukkan transaksi yang dieksekusi secara tidak benar ke dalam blok akan menerima penalti.

Jika batch rollup tetap tidak tertantang (yaitu, semua transaksi dieksekusi dengan benar) setelah periode tantangan berlalu, batch tersebut dianggap valid dan diterima di Ethereum. Pihak lain dapat terus membangun di atas blok rollup yang belum dikonfirmasi, tetapi dengan peringatan: hasil transaksi akan dibatalkan jika didasarkan pada transaksi yang dieksekusi secara tidak benar yang dipublikasikan sebelumnya.

## Bagaimana rollup Optimistic berinteraksi dengan Ethereum? {#optimistic-rollups-and-ethereum}

Rollup Optimistic adalah [solusi penskalaan offchain](/developers/docs/scaling/#offchain-scaling) yang dibangun untuk beroperasi di atas Ethereum. Setiap rollup Optimistic dikelola oleh serangkaian kontrak pintar yang disebarkan di jaringan Ethereum. Rollup Optimistic memproses transaksi di luar rantai utama Ethereum, tetapi memposting transaksi offchain (dalam batch) ke kontrak rollup onchain. Seperti rantai blok Ethereum, catatan transaksi ini tidak dapat diubah dan membentuk "rantai rollup Optimistic."

Arsitektur rollup Optimistic terdiri dari bagian-bagian berikut:

**Kontrak onchain**: Operasi rollup Optimistic dikendalikan oleh kontrak pintar yang berjalan di Ethereum. Ini termasuk kontrak yang menyimpan blok rollup, memantau pembaruan state pada rollup, dan melacak deposit pengguna. Dalam hal ini, Ethereum berfungsi sebagai lapisan dasar atau "lapisan 1 (l1)" untuk rollup Optimistic.

**Mesin virtual (VM) offchain**: Meskipun kontrak yang mengelola protokol rollup Optimistic berjalan di Ethereum, protokol rollup melakukan komputasi dan penyimpanan state pada mesin virtual lain yang terpisah dari [Mesin Virtual Ethereum](/developers/docs/evm/). VM offchain adalah tempat aplikasi berada dan perubahan state dieksekusi; ini berfungsi sebagai lapisan atas atau "lapisan 2 (l2)" untuk rollup Optimistic.

Karena rollup Optimistic dirancang untuk menjalankan program yang ditulis atau dikompilasi untuk EVM, VM offchain menggabungkan banyak spesifikasi desain EVM. Selain itu, bukti penipuan yang dihitung secara onchain memungkinkan jaringan Ethereum untuk menegakkan validitas perubahan state yang dihitung dalam VM offchain.

Rollup Optimistic digambarkan sebagai 'solusi penskalaan hibrida' karena, meskipun mereka ada sebagai protokol terpisah, properti keamanannya berasal dari Ethereum. Antara lain, Ethereum menjamin kebenaran komputasi offchain rollup dan ketersediaan data di balik komputasi tersebut. Hal ini membuat rollup Optimistic lebih aman daripada protokol penskalaan offchain murni (misalnya, [sidechain](/developers/docs/scaling/sidechains/)) yang tidak bergantung pada Ethereum untuk keamanan.

Rollup Optimistic bergantung pada protokol utama Ethereum untuk hal-hal berikut:

### Ketersediaan data {#data-availability}

Seperti yang disebutkan, rollup Optimistic memposting data transaksi ke Ethereum sebagai `calldata` atau [blob](/roadmap/danksharding/). Karena eksekusi rantai rollup didasarkan pada transaksi yang dikirimkan, siapa pun dapat menggunakan informasi ini—yang berlabuh pada lapisan dasar Ethereum—untuk mengeksekusi state rollup dan memverifikasi kebenaran transisi state.

[Ketersediaan data](/developers/docs/data-availability/) sangat penting karena tanpa akses ke data state, penantang tidak dapat membangun bukti penipuan untuk menyengketakan operasi rollup yang tidak valid. Dengan Ethereum yang menyediakan ketersediaan data, risiko operator rollup lolos dari tindakan berbahaya (misalnya, mengirimkan blok yang tidak valid) berkurang.

### Ketahanan sensor {#censorship-resistance}

Rollup Optimistic juga bergantung pada Ethereum untuk ketahanan sensor. Dalam rollup Optimistic, entitas terpusat (operator) bertanggung jawab untuk memproses transaksi dan mengirimkan blok rollup ke Ethereum. Hal ini memiliki beberapa implikasi:

- Operator rollup dapat menyensor pengguna dengan sepenuhnya offline, atau dengan menolak untuk memproduksi blok yang menyertakan transaksi tertentu di dalamnya.

- Operator rollup dapat mencegah pengguna melakukan penarikan dana yang didepositkan dalam kontrak rollup dengan menahan data state yang diperlukan untuk bukti Merkle kepemilikan. Menahan data state juga dapat menyembunyikan state rollup dari pengguna dan mencegah mereka berinteraksi dengan rollup.

Rollup Optimistic memecahkan masalah ini dengan memaksa operator untuk memublikasikan data yang terkait dengan pembaruan state di Ethereum. Memublikasikan data rollup secara onchain memiliki manfaat berikut:

- Jika operator rollup Optimistic offline atau berhenti memproduksi batch transaksi, node lain dapat menggunakan data yang tersedia untuk mereproduksi state terakhir rollup dan melanjutkan produksi blok.

- Pengguna dapat menggunakan data transaksi untuk membuat bukti Merkle yang membuktikan kepemilikan dana dan menarik aset mereka dari rollup.

- Pengguna juga dapat mengirimkan transaksi mereka di l1 alih-alih ke sekuenser, dalam hal ini sekuenser harus memasukkan transaksi dalam batas waktu tertentu untuk terus memproduksi blok yang valid.

### Penyelesaian {#settlement}

Peran lain yang dimainkan Ethereum dalam konteks rollup Optimistic adalah sebagai lapisan penyelesaian. Lapisan penyelesaian melabuhkan seluruh ekosistem rantai blok, menetapkan keamanan, dan memberikan finalitas objektif jika terjadi perselisihan pada rantai lain (rollup Optimistic dalam hal ini) yang memerlukan arbitrase.

Mainnet Ethereum menyediakan hub bagi rollup Optimistic untuk memverifikasi bukti penipuan dan menyelesaikan perselisihan. Selain itu, transaksi yang dilakukan pada rollup hanya bersifat final _setelah_ blok rollup diterima di Ethereum. Setelah transaksi rollup dikomit ke lapisan dasar Ethereum, transaksi tersebut tidak dapat dibatalkan (kecuali dalam kasus reorganisasi rantai yang sangat tidak mungkin terjadi).

## Bagaimana cara kerja rollup Optimistic? {#how-optimistic-rollups-work}

### Eksekusi dan agregasi transaksi {#transaction-execution-and-aggregation}

Pengguna mengirimkan transaksi ke "operator", yang merupakan node yang bertanggung jawab untuk memproses transaksi pada rollup Optimistic. Juga dikenal sebagai "validator" atau "agregator", operator mengagregasi transaksi, mengompresi data yang mendasarinya, dan memublikasikan blok di Ethereum.

Meskipun siapa pun dapat menjadi validator, validator rollup Optimistic harus memberikan jaminan sebelum memproduksi blok, mirip dengan [sistem Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/). Jaminan ini dapat dipotong jika validator memposting blok yang tidak valid atau membangun di atas blok lama yang tidak valid (bahkan jika blok mereka valid). Dengan cara ini, rollup Optimistic memanfaatkan insentif kriptoekonomi untuk memastikan validator bertindak jujur.

Validator lain pada rantai rollup Optimistic diharapkan untuk mengeksekusi transaksi yang dikirimkan menggunakan salinan state rollup mereka. Jika state akhir validator berbeda dari state yang diusulkan operator, mereka dapat memulai tantangan dan menghitung bukti penipuan.

Beberapa rollup Optimistic mungkin mengabaikan sistem validator tanpa izin dan menggunakan "sekuenser" tunggal untuk mengeksekusi rantai. Seperti validator, sekuenser memproses transaksi, memproduksi blok rollup, dan mengirimkan transaksi rollup ke rantai l1 (Ethereum).

Sekuenser berbeda dari operator rollup biasa karena mereka memiliki kontrol yang lebih besar atas pengurutan transaksi. Selain itu, sekuenser memiliki akses prioritas ke rantai rollup dan merupakan satu-satunya entitas yang berwenang untuk mengirimkan transaksi ke kontrak onchain. Transaksi dari node non-sekuenser atau pengguna biasa hanya diantrekan dalam kotak masuk terpisah sampai sekuenser memasukkannya ke dalam batch baru.

#### Mengirimkan blok rollup ke Ethereum {#submitting-blocks-to-ethereum}

Seperti yang disebutkan, operator rollup Optimistic menggabungkan transaksi offchain ke dalam batch dan mengirimkannya ke Ethereum untuk notarisasi. Proses ini melibatkan kompresi data terkait transaksi dan memublikasikannya di Ethereum sebagai `calldata` atau dalam blob.

`calldata` adalah area yang tidak dapat dimodifikasi dan tidak persisten dalam kontrak pintar yang sebagian besar berperilaku seperti [memori](/developers/docs/smart-contracts/anatomy/#memory). Meskipun `calldata` bertahan secara onchain sebagai bagian dari [log riwayat](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) rantai blok, ia tidak disimpan sebagai bagian dari state Ethereum. Karena `calldata` tidak menyentuh bagian mana pun dari state Ethereum, ia lebih murah daripada state untuk menyimpan data secara onchain.

Kata kunci `calldata` juga digunakan di Solidity untuk meneruskan argumen ke fungsi kontrak pintar pada saat eksekusi. `calldata` mengidentifikasi fungsi yang dipanggil selama transaksi dan menahan input ke fungsi dalam bentuk urutan bita arbitrer.

Dalam konteks rollup Optimistic, `calldata` digunakan untuk mengirim data transaksi terkompresi ke kontrak onchain. Operator rollup menambahkan batch baru dengan memanggil fungsi yang diperlukan dalam kontrak rollup dan meneruskan data terkompresi sebagai argumen fungsi. Menggunakan `calldata` mengurangi biaya pengguna karena sebagian besar biaya yang dikeluarkan rollup berasal dari penyimpanan data secara onchain.

Berikut adalah [contoh](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) pengiriman batch rollup untuk menunjukkan bagaimana konsep ini bekerja. Sekuenser memanggil metode `appendSequencerBatch()` dan meneruskan data transaksi terkompresi sebagai input menggunakan `calldata`.

Beberapa rollup sekarang menggunakan blob untuk memposting batch transaksi ke Ethereum.

Blob tidak dapat dimodifikasi dan tidak persisten (sama seperti `calldata`) tetapi dipangkas dari riwayat setelah ~18 hari. Untuk informasi lebih lanjut tentang blob, lihat [danksharding](/roadmap/danksharding).

### Komitmen state {#state-commitments}

Pada titik waktu mana pun, state rollup Optimistic (akun, saldo, kode kontrak, dll.) diatur sebagai [pohon Merkle](/whitepaper/#merkle-trees) yang disebut "pohon state". Akar dari pohon Merkle ini (akar state), yang mereferensikan state terbaru rollup, di-hash dan disimpan dalam kontrak rollup. Setiap transisi state pada rantai menghasilkan state rollup baru, yang dikomit oleh operator dengan menghitung akar state baru.

Operator diwajibkan untuk mengirimkan akar state lama dan akar state baru saat memposting batch. Jika akar state lama cocok dengan akar state yang ada dalam kontrak onchain, akar state yang lama dibuang dan diganti dengan akar state yang baru.

Operator rollup juga diwajibkan untuk mengomit akar Merkle untuk batch transaksi itu sendiri. Hal ini memungkinkan siapa pun untuk membuktikan penyertaan transaksi dalam batch (di l1) dengan menyajikan [bukti Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Komitmen state, terutama akar state, diperlukan untuk membuktikan kebenaran perubahan state dalam rollup Optimistic. Kontrak rollup menerima akar state baru dari operator segera setelah diposting, tetapi nantinya dapat menghapus akar state yang tidak valid untuk memulihkan rollup ke state yang benar.

### Pembuktian penipuan {#fraud-proving}

Seperti yang dijelaskan, rollup Optimistic memungkinkan siapa pun untuk memublikasikan blok tanpa memberikan bukti validitas. Namun, untuk memastikan rantai tetap aman, rollup Optimistic menentukan jendela waktu di mana siapa pun dapat menyengketakan transisi state. Oleh karena itu, blok rollup disebut "asersi" karena siapa pun dapat menyengketakan validitasnya.

Jika seseorang menyengketakan asersi, maka protokol rollup akan memulai komputasi bukti penipuan. Setiap jenis bukti penipuan bersifat interaktif—seseorang harus memposting asersi sebelum orang lain dapat menantangnya. Perbedaannya terletak pada berapa banyak putaran interaksi yang diperlukan untuk menghitung bukti penipuan.

Skema pembuktian interaktif putaran tunggal memutar ulang transaksi yang disengketakan di l1 untuk mendeteksi asersi yang tidak valid. Protokol rollup mengemulasi eksekusi ulang transaksi yang disengketakan di l1 (Ethereum) menggunakan kontrak pemverifikasi, dengan akar state yang dihitung menentukan siapa yang memenangkan tantangan. Jika klaim penantang tentang state rollup yang benar adalah benar, operator akan dihukum dengan pemotongan jaminan mereka.

Namun, mengeksekusi ulang transaksi di l1 untuk mendeteksi penipuan memerlukan publikasi komitmen state untuk transaksi individual dan meningkatkan data yang harus dipublikasikan rollup secara onchain. Memutar ulang transaksi juga menimbulkan biaya gas yang signifikan. Karena alasan ini, rollup Optimistic beralih ke pembuktian interaktif multi-putaran, yang mencapai tujuan yang sama (yaitu, mendeteksi operasi rollup yang tidak valid) dengan lebih efisien.

#### Pembuktian interaktif multi-putaran {#multi-round-interactive-proving}

Pembuktian interaktif multi-putaran melibatkan protokol bolak-balik antara pembuat asersi dan penantang yang diawasi oleh kontrak pemverifikasi l1, yang pada akhirnya memutuskan pihak yang berbohong. Setelah node l2 menantang asersi, pembuat asersi diwajibkan untuk membagi asersi yang disengketakan menjadi dua bagian yang sama. Setiap asersi individual dalam kasus ini akan berisi langkah komputasi yang sama banyaknya dengan yang lain.

Penantang kemudian akan memilih asersi mana yang ingin ditantang. Proses pembagian (disebut "protokol biseksi") berlanjut sampai kedua belah pihak menyengketakan asersi tentang _satu_ langkah eksekusi. Pada titik ini, kontrak l1 akan menyelesaikan perselisihan dengan mengevaluasi instruksi (dan hasilnya) untuk menangkap pihak yang curang.

Pembuat asersi diwajibkan untuk memberikan "bukti satu langkah" yang memverifikasi validitas komputasi satu langkah yang disengketakan. Jika pembuat asersi gagal memberikan bukti satu langkah, atau pemverifikasi l1 menganggap bukti tersebut tidak valid, mereka kalah dalam tantangan.

Beberapa catatan tentang jenis bukti penipuan ini:

1. Pembuktian penipuan interaktif multi-putaran dianggap efisien karena meminimalkan pekerjaan yang harus dilakukan rantai l1 dalam arbitrase perselisihan. Alih-alih memutar ulang seluruh transaksi, rantai l1 hanya perlu mengeksekusi ulang satu langkah dalam eksekusi rollup.

2. Protokol biseksi mengurangi jumlah data yang diposting secara onchain (tidak perlu memublikasikan komitmen state untuk setiap transaksi). Selain itu, transaksi rollup Optimistic tidak dibatasi oleh batas gas Ethereum. Sebaliknya, rollup Optimistic yang mengeksekusi ulang transaksi harus memastikan transaksi l2 memiliki batas gas yang lebih rendah untuk mengemulasi eksekusinya dalam satu transaksi Ethereum.

3. Sebagian dari jaminan pembuat asersi yang berbahaya diberikan kepada penantang, sementara bagian lainnya dibakar. Pembakaran mencegah kolusi di antara validator; jika dua validator berkolusi untuk memulai tantangan palsu, mereka masih akan kehilangan sebagian besar dari seluruh stake.

4. Pembuktian interaktif multi-putaran mewajibkan kedua belah pihak (pembuat asersi dan penantang) untuk mengambil langkah dalam jendela waktu yang ditentukan. Kegagalan untuk bertindak sebelum tenggat waktu berakhir menyebabkan pihak yang lalai kehilangan tantangan.

#### Mengapa bukti penipuan penting untuk rollup Optimistic {#fraud-proof-benefits}

Bukti penipuan penting karena memfasilitasi _finalitas tanpa kepercayaan_ dalam rollup Optimistic. Finalitas tanpa kepercayaan adalah kualitas rollup Optimistic yang menjamin bahwa sebuah transaksi—selama itu valid—pada akhirnya akan dikonfirmasi.

Node berbahaya dapat mencoba menunda konfirmasi blok rollup yang valid dengan memulai tantangan palsu. Namun, bukti penipuan pada akhirnya akan membuktikan validitas blok rollup dan menyebabkannya dikonfirmasi.

Hal ini juga berkaitan dengan properti keamanan lain dari rollup Optimistic: validitas rantai bergantung pada keberadaan _satu_ node yang jujur. Node yang jujur dapat memajukan rantai dengan benar baik dengan memposting asersi yang valid atau menyengketakan asersi yang tidak valid. Apa pun kasusnya, node berbahaya yang berselisih dengan node yang jujur akan kehilangan stake mereka selama proses pembuktian penipuan.

### Interoperabilitas l1/l2 {#l1-l2-interoperability}

Rollup Optimistic dirancang untuk interoperabilitas dengan Mainnet Ethereum dan memungkinkan pengguna untuk meneruskan pesan dan data arbitrer antara l1 dan l2. Mereka juga kompatibel dengan EVM, sehingga Anda dapat mem-porting [aplikasi terdesentralisasi (dapp)](/developers/docs/dapps/) yang ada ke rollup Optimistic atau membuat dapp baru menggunakan alat pengembangan Ethereum.

#### 1. Pergerakan aset {#asset-movement}

##### Memasuki rollup {#}

Untuk menggunakan rollup Optimistic, pengguna mendepositkan ETH, token ERC-20, dan aset lain yang diterima dalam kontrak [jembatan](/developers/docs/bridges/) rollup di l1. Kontrak jembatan akan meneruskan transaksi ke l2, di mana jumlah aset yang setara dicetak dan dikirim ke alamat pilihan pengguna di rollup Optimistic.

Transaksi yang dibuat pengguna (seperti deposit l1 > l2) biasanya diantrekan sampai sekuenser mengirimkannya kembali ke kontrak rollup. Namun, untuk menjaga ketahanan sensor, rollup Optimistic memungkinkan pengguna untuk mengirimkan transaksi secara langsung ke kontrak rollup onchain jika telah tertunda melewati waktu maksimum yang diizinkan.

Beberapa rollup Optimistic mengadopsi pendekatan yang lebih lugas untuk mencegah sekuenser menyensor pengguna. Di sini, sebuah blok didefinisikan oleh semua transaksi yang dikirimkan ke kontrak l1 sejak blok sebelumnya (misalnya, deposit) di samping transaksi yang diproses pada rantai rollup. Jika sekuenser mengabaikan transaksi l1, ia akan memublikasikan akar state yang (terbukti) salah; oleh karena itu, sekuenser tidak dapat menunda pesan yang dibuat pengguna setelah diposting di l1.

##### Keluar dari rollup {#}

Melakukan penarikan dari rollup Optimistic ke Ethereum lebih sulit karena skema pembuktian penipuan. Jika pengguna memulai transaksi l2 > l1 untuk menarik dana yang di-escrow di l1, mereka harus menunggu sampai periode tantangan—berlangsung sekitar tujuh hari—berlalu. Namun demikian, proses penarikan itu sendiri cukup mudah.

Setelah permintaan penarikan dimulai pada rollup l2, transaksi dimasukkan dalam batch berikutnya, sementara aset pengguna pada rollup dibakar. Setelah batch dipublikasikan di Ethereum, pengguna dapat menghitung bukti Merkle yang memverifikasi penyertaan transaksi keluar mereka di dalam blok. Kemudian tinggal menunggu melalui periode penundaan untuk menyelesaikan transaksi di l1 dan menarik dana ke Mainnet.

Untuk menghindari menunggu seminggu sebelum menarik dana ke Ethereum, pengguna rollup Optimistic dapat menggunakan **penyedia likuiditas** (LP). Penyedia likuiditas mengambil alih kepemilikan penarikan l2 yang tertunda dan membayar pengguna di l1 (dengan imbalan biaya).

Penyedia likuiditas dapat memeriksa validitas permintaan penarikan pengguna (dengan mengeksekusi rantai itu sendiri) sebelum melepaskan dana. Dengan cara ini mereka memiliki jaminan bahwa transaksi pada akhirnya akan dikonfirmasi (yaitu, finalitas tanpa kepercayaan).

#### 2. Kompatibilitas EVM {#evm-compatibility}

Bagi pengembang, keuntungan dari rollup Optimistic adalah kompatibilitasnya—atau, lebih baik lagi, ekuivalensinya—dengan [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/). Rollup yang kompatibel dengan EVM mematuhi spesifikasi dalam [kertas kuning Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) dan mendukung EVM pada tingkat kode bita.

Kompatibilitas EVM dalam rollup Optimistic memiliki manfaat berikut:

i. Pengembang dapat memigrasikan kontrak pintar yang ada di Ethereum ke rantai rollup Optimistic tanpa harus memodifikasi basis kode secara ekstensif. Hal ini dapat menghemat waktu tim pengembangan saat menyebarkan kontrak pintar Ethereum di l2.

ii. Pengembang dan tim proyek yang menggunakan rollup Optimistic dapat memanfaatkan infrastruktur Ethereum. Ini termasuk bahasa pemrograman, pustaka kode, alat pengujian, perangkat lunak klien, infrastruktur penyebaran, dan sebagainya.

Menggunakan perkakas yang ada sangat penting karena alat-alat ini telah diaudit, di-debug, dan ditingkatkan secara ekstensif selama bertahun-tahun. Hal ini juga menghilangkan kebutuhan bagi pengembang Ethereum untuk mempelajari cara membangun dengan tumpukan pengembangan yang sama sekali baru.

#### 3. Panggilan kontrak lintas rantai {#cross-chain-contract-calls}

Pengguna (akun yang dimiliki secara eksternal) berinteraksi dengan kontrak l2 dengan mengirimkan transaksi ke kontrak rollup atau meminta sekuenser atau validator melakukannya untuk mereka. Rollup Optimistic juga memungkinkan akun kontrak di Ethereum untuk berinteraksi dengan kontrak l2 menggunakan kontrak jembatan untuk meneruskan pesan dan meneruskan data antara l1 dan l2. Ini berarti Anda dapat memprogram kontrak l1 di Mainnet Ethereum untuk memanggil fungsi milik kontrak pada rollup Optimistic l2.

Panggilan kontrak lintas rantai terjadi secara asinkron—artinya panggilan dimulai terlebih dahulu, kemudian dieksekusi di lain waktu. Hal ini berbeda dengan panggilan antara dua kontrak di Ethereum, di mana panggilan tersebut segera membuahkan hasil.

Contoh panggilan kontrak lintas rantai adalah deposit token yang dijelaskan sebelumnya. Kontrak di l1 meng-escrow token pengguna dan mengirim pesan ke kontrak l2 yang dipasangkan untuk mencetak jumlah token yang sama pada rollup.

Karena panggilan pesan lintas rantai menghasilkan eksekusi kontrak, pengirim biasanya diwajibkan untuk menanggung [biaya gas](/developers/docs/gas/) untuk komputasi. Disarankan untuk menetapkan batas gas yang tinggi untuk mencegah transaksi gagal pada rantai target. Skenario penjembatanan token adalah contoh yang baik; jika sisi l1 dari transaksi (mendepositkan token) berhasil, tetapi sisi l2 (mencetak token baru) gagal karena gas rendah, deposit menjadi tidak dapat dipulihkan.

Terakhir, kita harus mencatat bahwa panggilan pesan l2 > l1 antara kontrak perlu memperhitungkan penundaan (panggilan l1 > l2 biasanya dieksekusi setelah beberapa menit). Hal ini karena pesan yang dikirim ke Mainnet dari rollup Optimistic tidak dapat dieksekusi sampai jendela tantangan berakhir.

## Bagaimana cara kerja biaya rollup Optimistic? {#how-do-optimistic-rollup-fees-work}

Rollup Optimistic menggunakan skema biaya gas, mirip dengan Ethereum, untuk menunjukkan berapa banyak yang dibayar pengguna per transaksi. Biaya yang dikenakan pada rollup Optimistic bergantung pada komponen berikut:

1. **Penulisan state**: Rollup Optimistic memublikasikan data transaksi dan header blok (terdiri dari hash header blok sebelumnya, akar state, akar batch) ke Ethereum sebagai `blob`, atau "objek besar biner". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) memperkenalkan solusi hemat biaya untuk menyertakan data secara onchain. `blob` adalah bidang transaksi baru yang memungkinkan rollup untuk memposting data transisi state terkompresi ke l1 Ethereum. Tidak seperti `calldata`, yang tetap secara permanen onchain, blob berumur pendek dan dapat dipangkas dari klien setelah [4096 epoch](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (sekitar 18 hari). Dengan menggunakan blob untuk memposting batch transaksi terkompresi, rollup Optimistic dapat secara signifikan mengurangi biaya penulisan transaksi ke l1.

2. **Gas blob yang digunakan**: Transaksi yang membawa blob menggunakan mekanisme biaya dinamis yang mirip dengan yang diperkenalkan oleh [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Biaya gas untuk transaksi tipe-3 memperhitungkan biaya dasar untuk blob, yang ditentukan oleh jaringan berdasarkan permintaan ruang blob dan penggunaan ruang blob dari transaksi yang dikirim.

3. **Biaya operator l2**: Ini adalah jumlah yang dibayarkan ke node rollup sebagai kompensasi atas biaya komputasi yang dikeluarkan dalam memproses transaksi, mirip dengan biaya gas di Ethereum. Node rollup mengenakan biaya transaksi yang lebih rendah karena l2 memiliki kapasitas pemrosesan yang lebih tinggi dan tidak dihadapkan pada kemacetan jaringan yang memaksa validator di Ethereum untuk memprioritaskan transaksi dengan biaya yang lebih tinggi.

Rollup Optimistic menerapkan beberapa mekanisme untuk mengurangi biaya bagi pengguna, termasuk pemrosesan batch transaksi dan mengompresi `calldata` untuk mengurangi biaya publikasi data. Anda dapat memeriksa [pelacak biaya l2](https://l2fees.info/) untuk gambaran umum waktu nyata tentang berapa biaya untuk menggunakan rollup Optimistic berbasis Ethereum.

## Bagaimana rollup Optimistic menskalakan Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Seperti yang dijelaskan, rollup Optimistic memublikasikan data transaksi terkompresi di Ethereum untuk menjamin ketersediaan data. Kemampuan untuk mengompresi data yang dipublikasikan secara onchain sangat penting untuk menskalakan laju pemrosesan di Ethereum dengan rollup Optimistic.

Rantai utama Ethereum menempatkan batasan pada seberapa banyak data yang dapat ditampung blok, dalam denominasi unit gas ([ukuran blok rata-rata](/developers/docs/blocks/#block-size) adalah 15 juta gas). Meskipun ini membatasi berapa banyak gas yang dapat digunakan setiap transaksi, ini juga berarti kita dapat meningkatkan transaksi yang diproses per blok dengan mengurangi data terkait transaksi—secara langsung meningkatkan skalabilitas.

Rollup Optimistic menggunakan beberapa teknik untuk mencapai kompresi data transaksi dan meningkatkan tingkat TPS. Misalnya, [artikel](https://vitalik.eth.limo/general/2021/01/05/rollup.html) ini membandingkan data yang dihasilkan transaksi pengguna dasar (mengirim Ether) di Mainnet vs berapa banyak data yang dihasilkan transaksi yang sama pada rollup:

| Parameter | Ethereum (l1)          | Rollup (l2)   |
| --------- | ---------------------- | ------------- |
| Nonce     | ~3                     | 0             |
| Gasprice  | ~8                     | 0-0.5         |
| Gas       | 3                      | 0-0.5         |
| To        | 21                     | 4             |
| Value     | 9                      | ~3            |
| Signature | ~68 (2 + 33 + 33)      | ~0.5          |
| From      | 0 (dipulihkan dari sig)| 4             |
| **Total** | **\~112 bita**          | **\~12 bita**  |

Melakukan beberapa perhitungan kasar pada angka-angka ini dapat membantu menunjukkan peningkatan skalabilitas yang diberikan oleh rollup Optimistic:

1. Ukuran target untuk setiap blok adalah 15 juta gas dan biayanya 16 gas untuk memverifikasi satu bita data. Membagi ukuran blok rata-rata dengan 16 gas (15.000.000/16) menunjukkan bahwa blok rata-rata dapat menampung **937.500 bita data**.
2. Jika transaksi rollup dasar menggunakan 12 bita, maka blok Ethereum rata-rata dapat memproses **78.125 transaksi rollup** (937.500/12) atau **39 batch rollup** (jika setiap batch menampung rata-rata 2.000 transaksi).
3. Jika blok baru diproduksi di Ethereum setiap 15 detik, maka kecepatan pemrosesan rollup akan berjumlah sekitar **5.208 transaksi per detik**. Hal ini dilakukan dengan membagi jumlah transaksi rollup dasar yang dapat ditampung oleh blok Ethereum (**78.125**) dengan waktu blok rata-rata (**15 detik**).

Ini adalah perkiraan yang cukup optimistis, mengingat transaksi rollup Optimistic tidak mungkin mencakup seluruh blok di Ethereum. Namun, ini dapat memberikan gambaran kasar tentang seberapa besar keuntungan skalabilitas yang dapat diberikan rollup Optimistic kepada pengguna Ethereum (implementasi saat ini menawarkan hingga 2.000 TPS).

Pengenalan [sharding data](/roadmap/danksharding/) di Ethereum diharapkan dapat meningkatkan skalabilitas dalam rollup Optimistic. Karena transaksi rollup harus berbagi ruang blok dengan transaksi non-rollup lainnya, kapasitas pemrosesannya dibatasi oleh laju pemrosesan data pada rantai utama Ethereum. Danksharding akan meningkatkan ruang yang tersedia untuk rantai l2 untuk memublikasikan data per blok, menggunakan penyimpanan "blob" yang lebih murah dan tidak permanen alih-alih `CALLDATA` yang mahal dan permanen.

### Kelebihan dan kekurangan rollup Optimistic {#optimistic-rollups-pros-and-cons}

| Kelebihan                                                                                                                                             | Kekurangan                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Menawarkan peningkatan skalabilitas yang masif tanpa mengorbankan keamanan atau sifat tanpa kepercayaan.                                              | Penundaan dalam finalitas transaksi karena potensi tantangan penipuan.                                                                              |
| Data transaksi disimpan pada rantai lapisan 1, meningkatkan transparansi, keamanan, ketahanan sensor, dan desentralisasi.                             | Operator rollup terpusat (sekuenser) dapat memengaruhi pengurutan transaksi.                                                                        |
| Pembuktian penipuan menjamin finalitas tanpa kepercayaan dan memungkinkan minoritas yang jujur untuk mengamankan rantai.                              | Jika tidak ada node yang jujur, operator berbahaya dapat mencuri dana dengan memposting blok dan komitmen state yang tidak valid.                   |
| Menghitung bukti penipuan terbuka untuk node l2 biasa, tidak seperti bukti validitas (digunakan dalam rollup ZK) yang memerlukan perangkat keras khusus. | Model keamanan bergantung pada setidaknya satu node jujur yang mengeksekusi transaksi rollup dan mengirimkan bukti penipuan untuk menantang transisi state yang tidak valid. |
| Rollup mendapat manfaat dari "keaktifan tanpa kepercayaan" (siapa pun dapat memaksa rantai untuk maju dengan mengeksekusi transaksi dan memposting asersi) | Pengguna harus menunggu periode tantangan satu minggu berakhir sebelum menarik dana kembali ke Ethereum.                                            |
| Rollup Optimistic bergantung pada insentif kriptoekonomi yang dirancang dengan baik untuk meningkatkan keamanan pada rantai.                          | Rollup harus memposting semua data transaksi secara onchain, yang dapat meningkatkan biaya.                                                         |
| Kompatibilitas dengan EVM dan Solidity memungkinkan pengembang untuk mem-porting kontrak pintar asli Ethereum ke rollup atau menggunakan perkakas yang ada untuk membuat dapp baru. |

### Penjelasan visual tentang rollup Optimistic {#optimistic-video}

Lebih suka belajar secara visual? Tonton Finematics menjelaskan rollup Optimistic:

<VideoWatch slug="rollups-scaling-strategy" startTime="263" />

## Bacaan lebih lanjut tentang rollup Optimistic {#further-reading-on-optimistic-rollups}

- [Bagaimana cara kerja rollup Optimistic (Panduan Lengkap)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Apa itu Rollup Rantai Blok? Pengantar Teknis](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Panduan Esensial untuk Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Panduan Praktis untuk Rollup Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Status Bukti Penipuan di L2 Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Bagaimana cara kerja Rollup Optimism sebenarnya?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Eksplorasi Mendalam OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Apa itu Mesin Virtual Optimistic?](https://www.alchemy.com/overviews/optimistic-virtual-machine)

## Tutorial: Rollup Optimistic dan jembatan di Ethereum {#tutorials}

- [Panduan kontrak jembatan standar Optimism](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Panduan kode beranotasi dari jembatan standar Optimism untuk memindahkan aset antara l1 dan l2._