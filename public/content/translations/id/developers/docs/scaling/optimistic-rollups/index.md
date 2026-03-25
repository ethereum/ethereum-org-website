---
title: Optimistic Rollup
description: "Pengantar tentang optimistic rollup—solusi peningkatan yang digunakan oleh komunitas Ethereum."
lang: id
---

Optimistic rollup adalah protokol layer 2 (L2) yang dirancang untuk memperluas throughput lapisan dasar Ethereum. Mereka mengurangi komputasi di rantai utama [Ethereum](/) dengan memproses transaksi secara offchain, menawarkan peningkatan signifikan dalam kecepatan pemrosesan. Tidak seperti solusi peningkatan lainnya, seperti [sidechain](/developers/docs/scaling/sidechains/), optimistic rollup memperoleh keamanan dari Mainnet dengan menerbitkan hasil transaksi secara onchain, atau [rantai plasma](/developers/docs/scaling/plasma/), yang juga memverifikasi transaksi di Ethereum dengan anti-penipuan, tetapi menyimpan data transaksi di tempat lain.

Karena komputasi adalah bagian yang lambat dan mahal dari penggunaan Ethereum, optimistic rollup dapat menawarkan peningkatan skalabilitas hingga 10-100x. Optimistic rollup juga menulis transaksi ke Ethereum sebagai `calldata` atau dalam [blob](/roadmap/danksharding/), mengurangi biaya gas untuk pengguna.

## Prasyarat {#prerequisites}

Anda harus sudah membaca dan memahami halaman kami tentang [peningkatan Ethereum](/developers/docs/scaling/) dan [layer 2](/layer-2/).

## Apa itu optimistic rollup? {#what-is-an-optimistic-rollup}

Optimistic rollup adalah pendekatan untuk peningkatan Ethereum yang melibatkan pemindahan komputasi dan penyimpanan status secara offchain. Optimistic rollup mengeksekusi transaksi di luar Ethereum, tetapi memposting data transaksi ke Mainnet sebagai `calldata` atau dalam [blob](/roadmap/danksharding/).

Operator optimistic rollup menggabungkan beberapa transaksi offchain bersama-sama dalam batch besar sebelum mengirimkannya ke Ethereum. Pendekatan ini memungkinkan penyebaran biaya tetap di beberapa transaksi dalam setiap batch, mengurangi biaya untuk pengguna akhir. Optimistic rollup juga menggunakan teknik kompresi untuk mengurangi jumlah data yang diposting di Ethereum.

Optimistic rollup dianggap "optimistis" karena mereka mengasumsikan transaksi offchain adalah valid dan tidak menerbitkan bukti validitas untuk batch transaksi yang diposting secara onchain. Hal ini membedakan optimistic rollup dari [zero-knowledge rollup](/developers/docs/scaling/zk-rollups) yang menerbitkan [bukti validitas](/glossary/#validity-proof) kriptografi untuk transaksi offchain.

Optimistic rollup sebaliknya bergantung pada skema pembuktian anti-penipuan untuk mendeteksi kasus di mana transaksi tidak dihitung dengan benar. Setelah batch rollup dikirimkan di Ethereum, ada jendela waktu (disebut periode tantangan) di mana siapa pun dapat menantang hasil transaksi rollup dengan menghitung [anti-penipuan](/glossary/#fraud-proof).

Jika anti-penipuan berhasil, protokol rollup mengeksekusi ulang transaksi dan memperbarui status rollup yang sesuai. Efek lain dari anti-penipuan yang berhasil adalah bahwa sequencer yang bertanggung jawab untuk memasukkan transaksi yang dieksekusi secara tidak benar ke dalam blok akan menerima penalti.

Jika batch rollup tetap tidak tertantang (yaitu, semua transaksi dieksekusi dengan benar) setelah periode tantangan berlalu, itu dianggap valid dan diterima di Ethereum. Pihak lain dapat terus membangun di atas blok rollup yang belum dikonfirmasi, tetapi dengan peringatan: hasil transaksi akan dibatalkan jika didasarkan pada transaksi yang dieksekusi secara tidak benar yang diterbitkan sebelumnya.

## Bagaimana cara optimistic rollup berinteraksi dengan Ethereum? {#optimistic-rollups-and-Ethereum}

Optimistic rollup adalah [solusi peningkatan offchain](/developers/docs/scaling/#offchain-scaling) yang dibangun untuk beroperasi di atas Ethereum. Setiap optimistic rollup dikelola oleh serangkaian kontrak pintar yang diterapkan di jaringan Ethereum. Optimistic rollup memproses transaksi di luar rantai utama Ethereum, tetapi memposting transaksi offchain (dalam batch) ke kontrak rollup onchain. Seperti blockchain Ethereum, catatan transaksi ini bersifat tetap dan membentuk "rantai optimistic rollup."

Arsitektur dari optimistic rollup terdiri dari bagian-bagian berikut:

**Kontrak onchain**: Operasi optimistic rollup dikendalikan oleh kontrak pintar yang berjalan di Ethereum. Ini termasuk kontrak yang menyimpan blok rollup, memantau pembaruan status pada rollup, dan melacak deposit pengguna. Dalam hal ini, Ethereum berfungsi sebagai lapisan dasar atau "layer 1" untuk optimistic rollup.

**Mesin virtual (VM) offchain**: Meskipun kontrak yang mengelola protokol optimistic rollup berjalan di Ethereum, protokol rollup melakukan komputasi dan penyimpanan status pada mesin virtual lain yang terpisah dari [Mesin Virtual Ethereum](/developers/docs/evm/). VM offchain adalah tempat aplikasi berada dan perubahan status dieksekusi; ini berfungsi sebagai lapisan atas atau "layer 2" untuk optimistic rollup.

Karena optimistic rollup dirancang untuk menjalankan program yang ditulis atau dikompilasi untuk EVM, VM offchain menggabungkan banyak spesifikasi desain EVM. Selain itu, anti-penipuan yang dihitung secara onchain memungkinkan jaringan Ethereum untuk menegakkan validitas perubahan status yang dihitung dalam VM offchain.

Optimistic rollup digambarkan sebagai 'solusi peningkatan hibrida' karena, meskipun mereka ada sebagai protokol terpisah, properti keamanannya berasal dari Ethereum. Antara lain, Ethereum menjamin kebenaran komputasi offchain rollup dan ketersediaan data di balik komputasi tersebut. Hal ini membuat optimistic rollup lebih aman daripada protokol peningkatan offchain murni (misalnya, [sidechain](/developers/docs/scaling/sidechains/)) yang tidak bergantung pada Ethereum untuk keamanan.

Optimistic rollup bergantung pada protokol utama Ethereum untuk hal-hal berikut:

### Ketersediaan data {#data-availability}

Seperti yang disebutkan, optimistic rollup memposting data transaksi ke Ethereum sebagai `calldata` atau [blob](/roadmap/danksharding/). Karena eksekusi rantai rollup didasarkan pada transaksi yang dikirimkan, siapa pun dapat menggunakan informasi ini—yang berlabuh pada lapisan dasar Ethereum—untuk mengeksekusi status rollup dan memverifikasi kebenaran transisi status.

[Ketersediaan data](/developers/docs/data-availability/) sangat penting karena tanpa akses ke data status, penantang tidak dapat membangun anti-penipuan untuk membantah operasi rollup yang tidak valid. Dengan Ethereum yang menyediakan ketersediaan data, risiko operator rollup lolos dari tindakan berbahaya (misalnya, mengirimkan blok yang tidak valid) berkurang.

### Ketahanan sensor {#censorship-resistance}

Optimistic rollup juga bergantung pada Ethereum untuk ketahanan sensor. Dalam optimistic rollup, entitas terpusat (operator) bertanggung jawab untuk memproses transaksi dan mengirimkan blok rollup ke Ethereum. Hal ini memiliki beberapa implikasi:

- Operator rollup dapat menyensor pengguna dengan sepenuhnya offline, atau dengan menolak untuk memproduksi blok yang menyertakan transaksi tertentu di dalamnya.

- Operator rollup dapat mencegah pengguna menarik dana yang didepositkan dalam kontrak rollup dengan menahan data status yang diperlukan untuk bukti kepemilikan Merkle. Menahan data status juga dapat menyembunyikan status rollup dari pengguna dan mencegah mereka berinteraksi dengan rollup.

Optimistic rollup memecahkan masalah ini dengan memaksa operator untuk menerbitkan data yang terkait dengan pembaruan status di Ethereum. Menerbitkan data rollup secara onchain memiliki manfaat berikut:

- Jika operator optimistic rollup offline atau berhenti memproduksi batch transaksi, node lain dapat menggunakan data yang tersedia untuk mereproduksi status terakhir rollup dan melanjutkan produksi blok.

- Pengguna dapat menggunakan data transaksi untuk membuat bukti Merkle yang membuktikan kepemilikan dana dan menarik aset mereka dari rollup.

- Pengguna juga dapat mengirimkan transaksi mereka di L1 alih-alih ke sequencer, dalam hal ini sequencer harus memasukkan transaksi dalam batas waktu tertentu untuk terus memproduksi blok yang valid.

### Penyelesaian {#settlement}

Peran lain yang dimainkan Ethereum dalam konteks optimistic rollup adalah sebagai lapisan penyelesaian. Lapisan penyelesaian menambatkan seluruh ekosistem blockchain, menetapkan keamanan, dan memberikan finalitas objektif jika terjadi perselisihan di rantai lain (optimistic rollup dalam hal ini) yang memerlukan arbitrase.

Mainnet Ethereum menyediakan pusat bagi optimistic rollup untuk memverifikasi anti-penipuan dan menyelesaikan perselisihan. Selain itu, transaksi yang dilakukan pada rollup hanya bersifat final _setelah_ blok rollup diterima di Ethereum. Setelah transaksi rollup dikomit ke lapisan dasar Ethereum, itu tidak dapat dibatalkan (kecuali dalam kasus reorganisasi rantai yang sangat tidak mungkin terjadi).

## Bagaimana cara kerja optimistic rollup? {#how-optimistic-rollups-work}

### Eksekusi dan agregasi transaksi {#transaction-execution-and-aggregation}

Pengguna mengirimkan transaksi ke "operator", yang merupakan node yang bertanggung jawab untuk memproses transaksi pada optimistic rollup. Juga dikenal sebagai "validator" atau "agregator", operator menggabungkan transaksi, mengompresi data yang mendasarinya, dan menerbitkan blok di Ethereum.

Meskipun siapa pun dapat menjadi validator, validator optimistic rollup harus memberikan jaminan sebelum memproduksi blok, mirip dengan [sistem proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Jaminan ini dapat dipotong jika validator memposting blok yang tidak valid atau membangun di atas blok yang lama namun tidak valid (bahkan jika blok mereka valid). Dengan cara ini, optimistic rollup memanfaatkan insentif kriptoekonomi untuk memastikan validator bertindak jujur.

Validator lain di rantai optimistic rollup diharapkan untuk mengeksekusi transaksi yang dikirimkan menggunakan salinan status rollup mereka. Jika status akhir validator berbeda dari status yang diusulkan operator, mereka dapat memulai tantangan dan menghitung anti-penipuan.

Beberapa optimistic rollup mungkin mengabaikan sistem validator tanpa izin dan menggunakan "sequencer" tunggal untuk mengeksekusi rantai. Seperti validator, sequencer memproses transaksi, memproduksi blok rollup, dan mengirimkan transaksi rollup ke rantai L1 (Ethereum).

Sequencer berbeda dari operator rollup biasa karena mereka memiliki kontrol yang lebih besar atas pengurutan transaksi. Selain itu, sequencer memiliki akses prioritas ke rantai rollup dan merupakan satu-satunya entitas yang berwenang untuk mengirimkan transaksi ke kontrak onchain. Transaksi dari node non-sequencer atau pengguna biasa hanya diantrekan dalam kotak masuk terpisah sampai sequencer memasukkannya ke dalam batch baru.

#### Mengirimkan blok rollup ke Ethereum {#submitting-blocks-to-ethereum}

Seperti yang disebutkan, operator optimistic rollup menggabungkan transaksi offchain ke dalam sebuah batch dan mengirimkannya ke Ethereum untuk notarisasi. Proses ini melibatkan kompresi data terkait transaksi dan menerbitkannya di Ethereum sebagai `calldata` atau dalam blob.

`calldata` adalah area yang tidak dapat dimodifikasi dan tidak persisten dalam kontrak pintar yang sebagian besar berperilaku seperti [memori](/developers/docs/smart-contracts/anatomy/#memory). Meskipun `calldata` bertahan secara onchain sebagai bagian dari [log riwayat](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) blockchain, ia tidak disimpan sebagai bagian dari status Ethereum. Karena `calldata` tidak menyentuh bagian mana pun dari status Ethereum, ia lebih murah daripada status untuk menyimpan data secara onchain.

Kata kunci `calldata` juga digunakan dalam Solidity untuk meneruskan argumen ke fungsi kontrak pintar pada saat eksekusi. `calldata` mengidentifikasi fungsi yang dipanggil selama transaksi dan menahan input ke fungsi dalam bentuk urutan byte arbitrer.

Dalam konteks optimistic rollup, `calldata` digunakan untuk mengirim data transaksi terkompresi ke kontrak onchain. Operator rollup menambahkan batch baru dengan memanggil fungsi yang diperlukan dalam kontrak rollup dan meneruskan data terkompresi sebagai argumen fungsi. Menggunakan `calldata` mengurangi biaya pengguna karena sebagian besar biaya yang ditanggung rollup berasal dari penyimpanan data secara onchain.

Berikut adalah [sebuah contoh](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) dari pengiriman batch rollup untuk menunjukkan bagaimana konsep ini bekerja. Sequencer memanggil metode `appendSequencerBatch()` dan meneruskan data transaksi terkompresi sebagai input menggunakan `calldata`.

Beberapa rollup sekarang menggunakan blob untuk memposting batch transaksi ke Ethereum.

Blob tidak dapat dimodifikasi dan tidak persisten (sama seperti `calldata`) tetapi dipangkas dari riwayat setelah ~18 hari. Untuk informasi lebih lanjut tentang blob, lihat [Danksharding](/roadmap/danksharding).

### Komitmen status {#state-commitments}

Kapan pun, status optimistic rollup (akun, saldo, kode kontrak, dll.) diatur sebagai [pohon Merkle](/whitepaper/#merkle-trees) yang disebut "pohon status". Akar dari pohon Merkle ini (akar status), yang merujuk pada status terbaru rollup, di-hash dan disimpan dalam kontrak rollup. Setiap transisi status pada rantai menghasilkan status rollup baru, yang dikomit oleh operator dengan menghitung akar status baru.

Operator diharuskan untuk mengirimkan akar status lama dan akar status baru saat memposting batch. Jika akar status lama cocok dengan akar status yang ada dalam kontrak onchain, yang terakhir dibuang dan diganti dengan akar status baru.

Operator rollup juga diharuskan untuk mengomit akar Merkle untuk batch transaksi itu sendiri. Hal ini memungkinkan siapa pun untuk membuktikan penyertaan transaksi dalam batch (di L1) dengan menyajikan [bukti Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Komitmen status, terutama akar status, diperlukan untuk membuktikan kebenaran perubahan status dalam optimistic rollup. Kontrak rollup menerima akar status baru dari operator segera setelah diposting, tetapi nantinya dapat menghapus akar status yang tidak valid untuk memulihkan rollup ke status yang benar.

### Pembuktian anti-penipuan {#fraud-proving}

Seperti yang dijelaskan, optimistic rollup memungkinkan siapa pun untuk menerbitkan blok tanpa memberikan bukti validitas. Namun, untuk memastikan rantai tetap aman, optimistic rollup menentukan jendela waktu di mana siapa pun dapat membantah transisi status. Oleh karena itu, blok rollup disebut "asersi" karena siapa pun dapat membantah validitasnya.

Jika seseorang membantah asersi, maka protokol rollup akan memulai komputasi anti-penipuan. Setiap jenis anti-penipuan bersifat interaktif—seseorang harus memposting asersi sebelum orang lain dapat menantangnya. Perbedaannya terletak pada berapa banyak putaran interaksi yang diperlukan untuk menghitung anti-penipuan.

Skema pembuktian interaktif putaran tunggal memutar ulang transaksi yang disengketakan di L1 untuk mendeteksi asersi yang tidak valid. Protokol rollup mengemulasi eksekusi ulang transaksi yang disengketakan di L1 (Ethereum) menggunakan kontrak pemverifikasi, dengan akar status yang dihitung menentukan siapa yang memenangkan tantangan. Jika klaim penantang tentang status rollup yang benar adalah benar, operator akan dihukum dengan jaminan mereka dipotong.

Namun, mengeksekusi ulang transaksi di L1 untuk mendeteksi penipuan memerlukan penerbitan komitmen status untuk transaksi individu dan meningkatkan data yang harus diterbitkan rollup secara onchain. Memutar ulang transaksi juga menimbulkan biaya gas yang signifikan. Karena alasan ini, optimistic rollup beralih ke pembuktian interaktif multi-putaran, yang mencapai tujuan yang sama (yaitu, mendeteksi operasi rollup yang tidak valid) dengan lebih efisien.

#### Pembuktian interaktif multi-putaran {#multi-round-interactive-proving}

Pembuktian interaktif multi-putaran melibatkan protokol bolak-balik antara pembuat asersi dan penantang yang diawasi oleh kontrak pemverifikasi L1, yang pada akhirnya memutuskan pihak yang berbohong. Setelah node L2 menantang asersi, pembuat asersi diharuskan untuk membagi asersi yang disengketakan menjadi dua bagian yang sama. Setiap asersi individu dalam hal ini akan berisi jumlah langkah komputasi yang sama dengan yang lain.

Penantang kemudian akan memilih asersi mana yang ingin ditantang. Proses pembagian (disebut "protokol biseksi") berlanjut sampai kedua belah pihak memperdebatkan asersi tentang _satu_ langkah eksekusi. Pada titik ini, kontrak L1 akan menyelesaikan perselisihan dengan mengevaluasi instruksi (dan hasilnya) untuk menangkap pihak yang curang.

Pembuat asersi diharuskan untuk memberikan "bukti satu langkah" yang memverifikasi validitas komputasi satu langkah yang disengketakan. Jika pembuat asersi gagal memberikan bukti satu langkah, atau pemverifikasi L1 menganggap bukti tersebut tidak valid, mereka kalah dalam tantangan.

Beberapa catatan tentang jenis anti-penipuan ini:

1. Pembuktian anti-penipuan interaktif multi-putaran dianggap efisien karena meminimalkan pekerjaan yang harus dilakukan rantai L1 dalam arbitrase perselisihan. Alih-alih memutar ulang seluruh transaksi, rantai L1 hanya perlu mengeksekusi ulang satu langkah dalam eksekusi rollup.

2. Protokol biseksi mengurangi jumlah data yang diposting secara onchain (tidak perlu menerbitkan komitmen status untuk setiap transaksi). Selain itu, transaksi optimistic rollup tidak dibatasi oleh batas gas Ethereum. Sebaliknya, optimistic rollup yang mengeksekusi ulang transaksi harus memastikan transaksi L2 memiliki batas gas yang lebih rendah untuk mengemulasi eksekusinya dalam satu transaksi Ethereum.

3. Sebagian dari jaminan pembuat asersi yang berbahaya diberikan kepada penantang, sementara bagian lainnya dibakar. Pembakaran mencegah kolusi di antara validator; jika dua validator berkolusi untuk memulai tantangan palsu, mereka masih akan kehilangan sebagian besar dari seluruh stake.

4. Pembuktian interaktif multi-putaran mengharuskan kedua belah pihak (pembuat asersi dan penantang) untuk mengambil langkah dalam jendela waktu yang ditentukan. Kegagalan untuk bertindak sebelum tenggat waktu berakhir menyebabkan pihak yang gagal kehilangan tantangan.

#### Mengapa anti-penipuan penting untuk optimistic rollup {#fraud-proof-benefits}

Anti-penipuan penting karena memfasilitasi _finalitas tanpa kepercayaan_ dalam optimistic rollup. Finalitas tanpa kepercayaan adalah kualitas dari optimistic rollup yang menjamin bahwa sebuah transaksi—selama itu valid—pada akhirnya akan dikonfirmasi.

Node berbahaya dapat mencoba menunda konfirmasi blok rollup yang valid dengan memulai tantangan palsu. Namun, anti-penipuan pada akhirnya akan membuktikan validitas blok rollup dan menyebabkannya dikonfirmasi.

Hal ini juga berkaitan dengan properti keamanan lain dari optimistic rollup: validitas rantai bergantung pada keberadaan _satu_ node yang jujur. Node yang jujur dapat memajukan rantai dengan benar baik dengan memposting asersi yang valid atau membantah asersi yang tidak valid. Apa pun kasusnya, node berbahaya yang berselisih dengan node yang jujur akan kehilangan stake mereka selama proses pembuktian anti-penipuan.

### Interoperabilitas L1/L2 {#l1-l2-interoperability}

Optimistic rollup dirancang untuk interoperabilitas dengan Mainnet Ethereum dan memungkinkan pengguna untuk meneruskan pesan dan data arbitrer antara L1 dan L2. Mereka juga kompatibel dengan EVM, sehingga Anda dapat mem-porting [dapps](/developers/docs/dapps/) yang ada ke optimistic rollup atau membuat dapps baru menggunakan alat pengembangan Ethereum.

#### 1. Pergerakan aset {#asset-movement}

##### Memasuki rollup

Untuk menggunakan optimistic rollup, pengguna mendepositkan ETH, token ERC-20, dan aset lain yang diterima dalam kontrak [jembatan](/developers/docs/bridges/) rollup di L1. Kontrak jembatan akan meneruskan transaksi ke L2, di mana jumlah aset yang setara di-mint dan dikirim ke alamat pilihan pengguna di optimistic rollup.

Transaksi yang dibuat pengguna (seperti deposit L1 > L2) biasanya diantrekan sampai sequencer mengirimkannya kembali ke kontrak rollup. Namun, untuk menjaga ketahanan sensor, optimistic rollup memungkinkan pengguna untuk mengirimkan transaksi secara langsung ke kontrak rollup onchain jika telah tertunda melewati waktu maksimum yang diizinkan.

Beberapa optimistic rollup mengadopsi pendekatan yang lebih lugas untuk mencegah sequencer menyensor pengguna. Di sini, sebuah blok didefinisikan oleh semua transaksi yang dikirimkan ke kontrak L1 sejak blok sebelumnya (misalnya, deposit) di samping transaksi yang diproses pada rantai rollup. Jika sequencer mengabaikan transaksi L1, ia akan menerbitkan akar status yang (terbukti) salah; oleh karena itu, sequencer tidak dapat menunda pesan yang dibuat pengguna setelah diposting di L1.

##### Keluar dari rollup

Menarik dana dari optimistic rollup ke Ethereum lebih sulit karena skema pembuktian anti-penipuan. Jika pengguna memulai transaksi L2 > L1 untuk menarik dana yang di-escrow di L1, mereka harus menunggu sampai periode tantangan—berlangsung sekitar tujuh hari—berlalu. Namun demikian, proses penarikan itu sendiri cukup mudah.

Setelah permintaan penarikan dimulai pada rollup L2, transaksi dimasukkan dalam batch berikutnya, sementara aset pengguna pada rollup dibakar. Setelah batch diterbitkan di Ethereum, pengguna dapat menghitung bukti Merkle yang memverifikasi penyertaan transaksi keluar mereka di dalam blok. Kemudian tinggal menunggu melalui periode penundaan untuk menyelesaikan transaksi di L1 dan menarik dana ke Mainnet.

Untuk menghindari menunggu seminggu sebelum menarik dana ke Ethereum, pengguna optimistic rollup dapat menggunakan **penyedia likuiditas** (LP). Penyedia likuiditas mengambil alih kepemilikan penarikan L2 yang tertunda dan membayar pengguna di L1 (sebagai imbalan atas biaya).

Penyedia likuiditas dapat memeriksa validitas permintaan penarikan pengguna (dengan mengeksekusi rantai itu sendiri) sebelum melepaskan dana. Dengan cara ini mereka memiliki jaminan bahwa transaksi pada akhirnya akan dikonfirmasi (yaitu, finalitas tanpa kepercayaan).

#### 2. Kompatibilitas EVM {#evm-compatibility}

Bagi pengembang, keuntungan dari optimistic rollup adalah kompatibilitasnya—atau, lebih baik lagi, ekuivalensinya—dengan [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/). Rollup yang kompatibel dengan EVM mematuhi spesifikasi dalam [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) dan mendukung EVM pada tingkat bytecode.

Kompatibilitas EVM dalam optimistic rollup memiliki manfaat berikut:

i. Pengembang dapat memigrasikan kontrak pintar yang ada di Ethereum ke rantai optimistic rollup tanpa harus memodifikasi basis kode secara ekstensif. Hal ini dapat menghemat waktu tim pengembangan saat menerapkan kontrak pintar Ethereum di L2.

ii. Pengembang dan tim proyek yang menggunakan optimistic rollup dapat memanfaatkan infrastruktur Ethereum. Ini termasuk bahasa pemrograman, pustaka kode, alat pengujian, perangkat lunak klien, infrastruktur penerapan, dan sebagainya.

Menggunakan perkakas yang ada sangat penting karena alat-alat ini telah diaudit, di-debug, dan ditingkatkan secara ekstensif selama bertahun-tahun. Hal ini juga menghilangkan kebutuhan bagi pengembang Ethereum untuk mempelajari cara membangun dengan tumpukan pengembangan yang sama sekali baru.

#### 3. Panggilan kontrak lintas rantai {#cross-chain-contract-calls}

Pengguna (akun yang dimiliki secara eksternal) berinteraksi dengan kontrak L2 dengan mengirimkan transaksi ke kontrak rollup atau meminta sequencer atau validator melakukannya untuk mereka. Optimistic rollup juga memungkinkan akun kontrak di Ethereum untuk berinteraksi dengan kontrak L2 menggunakan kontrak penjembatan untuk meneruskan pesan dan meneruskan data antara L1 dan L2. Ini berarti Anda dapat memprogram kontrak L1 di Mainnet Ethereum untuk memanggil fungsi milik kontrak pada optimistic rollup L2.

Panggilan kontrak lintas rantai terjadi secara asinkron—artinya panggilan dimulai terlebih dahulu, kemudian dieksekusi di lain waktu. Hal ini berbeda dengan panggilan antara dua kontrak di Ethereum, di mana panggilan tersebut langsung membuahkan hasil.

Contoh panggilan kontrak lintas rantai adalah deposit token yang dijelaskan sebelumnya. Kontrak di L1 meng-escrow token pengguna dan mengirim pesan ke kontrak L2 yang dipasangkan untuk men-mint jumlah token yang sama pada rollup.

Karena panggilan pesan lintas rantai menghasilkan eksekusi kontrak, pengirim biasanya diharuskan untuk menanggung [biaya gas](/developers/docs/gas/) untuk komputasi. Disarankan untuk menetapkan batas gas yang tinggi untuk mencegah transaksi gagal pada rantai target. Skenario penjembatanan token adalah contoh yang baik; jika sisi L1 dari transaksi (mendepositkan token) berhasil, tetapi sisi L2 (men-mint token baru) gagal karena gas rendah, deposit menjadi tidak dapat dipulihkan.

Terakhir, kita harus mencatat bahwa panggilan pesan L2 > L1 antara kontrak perlu memperhitungkan penundaan (panggilan L1 > L2 biasanya dieksekusi setelah beberapa menit). Hal ini karena pesan yang dikirim ke Mainnet dari optimistic rollup tidak dapat dieksekusi sampai jendela tantangan berakhir.

## Bagaimana cara kerja biaya optimistic rollup? {#how-do-optimistic-rollup-fees-work}

Optimistic rollup menggunakan skema biaya gas, mirip dengan Ethereum, untuk menunjukkan berapa banyak yang dibayar pengguna per transaksi. Biaya yang dikenakan pada optimistic rollup bergantung pada komponen berikut:

1. **Penulisan status**: Optimistic rollup menerbitkan data transaksi dan header blok (terdiri dari hash header blok sebelumnya, akar status, akar batch) ke Ethereum sebagai `blob`, atau "objek besar biner". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) memperkenalkan solusi hemat biaya untuk menyertakan data secara onchain. `blob` adalah bidang transaksi baru yang memungkinkan rollup untuk memposting data transisi status terkompresi ke Ethereum L1. Tidak seperti `calldata`, yang tetap secara permanen onchain, blob berumur pendek dan dapat dipangkas dari klien setelah [4096 epoch](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (sekitar 18 hari). Dengan menggunakan blob untuk memposting batch transaksi terkompresi, optimistic rollup dapat secara signifikan mengurangi biaya penulisan transaksi ke L1.

2. **Gas blob yang digunakan**: Transaksi yang membawa blob menggunakan mekanisme biaya dinamis yang mirip dengan yang diperkenalkan oleh [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Biaya gas untuk transaksi tipe-3 memperhitungkan biaya dasar untuk blob, yang ditentukan oleh jaringan berdasarkan permintaan ruang blob dan penggunaan ruang blob dari transaksi yang dikirim.

3. **Biaya operator L2**: Ini adalah jumlah yang dibayarkan ke node rollup sebagai kompensasi atas biaya komputasi yang timbul dalam memproses transaksi, mirip dengan biaya gas di Ethereum. Node rollup mengenakan biaya transaksi yang lebih rendah karena L2 memiliki kapasitas pemrosesan yang lebih tinggi dan tidak dihadapkan pada kemacetan jaringan yang memaksa validator di Ethereum untuk memprioritaskan transaksi dengan biaya yang lebih tinggi.

Optimistic rollup menerapkan beberapa mekanisme untuk mengurangi biaya bagi pengguna, termasuk menggabungkan transaksi dan mengompresi `calldata` untuk mengurangi biaya publikasi data. Anda dapat memeriksa [pelacak biaya L2](https://l2fees.info/) untuk gambaran umum waktu nyata tentang berapa biaya untuk menggunakan optimistic rollup berbasis Ethereum.

## Bagaimana optimistic rollup meningkatkan Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Seperti yang dijelaskan, optimistic rollup menerbitkan data transaksi terkompresi di Ethereum untuk menjamin ketersediaan data. Kemampuan untuk mengompresi data yang diterbitkan secara onchain sangat penting untuk meningkatkan throughput di Ethereum dengan optimistic rollup.

Rantai utama Ethereum menempatkan batasan pada seberapa banyak data yang dapat ditampung blok, didenominasi dalam unit gas ([ukuran blok rata-rata](/developers/docs/blocks/#block-size) adalah 15 juta gas). Meskipun ini membatasi berapa banyak gas yang dapat digunakan setiap transaksi, ini juga berarti kita dapat meningkatkan transaksi yang diproses per blok dengan mengurangi data terkait transaksi—secara langsung meningkatkan skalabilitas.

Optimistic rollup menggunakan beberapa teknik untuk mencapai kompresi data transaksi dan meningkatkan tingkat TPS. Misalnya, [artikel](https://vitalik.eth.limo/general/2021/01/05/rollup.html) ini membandingkan data yang dihasilkan oleh transaksi pengguna dasar (mengirim ether) di Mainnet vs berapa banyak data yang dihasilkan oleh transaksi yang sama di rollup:

| Parameter | Ethereum (L1)          | Rollup (L2)   |
| --------- | ---------------------- | ------------- |
| Nonce     | ~3                     | 0             |
| Harga gas | ~8                     | 0-0.5         |
| Gas       | 3                      | 0-0.5         |
| Ke        | 21                     | 4             |
| Nilai     | 9                      | ~3            |
| Tanda tangan | ~68 (2 + 33 + 33)   | ~0.5          |
| Dari      | 0 (dipulihkan dari sig)| 4             |
| **Total** | **\~112 byte**          | **\~12 byte**  |

Melakukan beberapa perhitungan kasar pada angka-angka ini dapat membantu menunjukkan peningkatan skalabilitas yang diberikan oleh optimistic rollup:

1. Ukuran target untuk setiap blok adalah 15 juta gas dan biayanya 16 gas untuk memverifikasi satu byte data. Membagi ukuran blok rata-rata dengan 16 gas (15.000.000/16) menunjukkan bahwa blok rata-rata dapat menampung **937.500 byte data**.
2. Jika transaksi rollup dasar menggunakan 12 byte, maka blok Ethereum rata-rata dapat memproses **78.125 transaksi rollup** (937.500/12) atau **39 batch rollup** (jika setiap batch menampung rata-rata 2.000 transaksi).
3. Jika blok baru diproduksi di Ethereum setiap 15 detik, maka kecepatan pemrosesan rollup akan berjumlah sekitar **5.208 transaksi per detik**. Ini dilakukan dengan membagi jumlah transaksi rollup dasar yang dapat ditampung oleh blok Ethereum (**78.125**) dengan waktu blok rata-rata (**15 detik**).

Ini adalah perkiraan yang cukup optimistis, mengingat bahwa transaksi optimistic rollup tidak mungkin mencakup seluruh blok di Ethereum. Namun, ini dapat memberikan gambaran kasar tentang seberapa besar keuntungan skalabilitas yang dapat diberikan optimistic rollup kepada pengguna Ethereum (implementasi saat ini menawarkan hingga 2.000 TPS).

Pengenalan [sharding data](/roadmap/danksharding/) di Ethereum diharapkan dapat meningkatkan skalabilitas dalam optimistic rollup. Karena transaksi rollup harus berbagi ruang blok dengan transaksi non-rollup lainnya, kapasitas pemrosesannya dibatasi oleh throughput data pada rantai utama Ethereum. Danksharding akan meningkatkan ruang yang tersedia untuk rantai L2 untuk menerbitkan data per blok, menggunakan penyimpanan "blob" yang lebih murah dan tidak permanen alih-alih `CALLDATA` yang mahal dan permanen.

### Kelebihan dan kekurangan optimistic rollup {#optimistic-rollups-pros-and-cons}

| Kelebihan | Kekurangan |
| --------- | ---------- |
| Menawarkan peningkatan besar-besaran dalam skalabilitas tanpa mengorbankan keamanan atau sifat tanpa kepercayaan. | Penundaan dalam finalitas transaksi karena potensi tantangan penipuan. |
| Data transaksi disimpan di rantai layer 1, meningkatkan transparansi, keamanan, ketahanan sensor, dan desentralisasi. | Operator rollup terpusat (sequencer) dapat memengaruhi pengurutan transaksi. |
| Pembuktian anti-penipuan menjamin finalitas tanpa kepercayaan dan memungkinkan minoritas yang jujur untuk mengamankan rantai. | Jika tidak ada node yang jujur, operator berbahaya dapat mencuri dana dengan memposting blok dan komitmen status yang tidak valid. |
| Menghitung anti-penipuan terbuka untuk node L2 biasa, tidak seperti bukti validitas (digunakan dalam ZK-rollup) yang memerlukan perangkat keras khusus. | Model keamanan bergantung pada setidaknya satu node jujur yang mengeksekusi transaksi rollup dan mengirimkan anti-penipuan untuk menantang transisi status yang tidak valid. |
| Rollup mendapat manfaat dari "keaktifan tanpa kepercayaan" (siapa pun dapat memaksa rantai untuk maju dengan mengeksekusi transaksi dan memposting asersi) | Pengguna harus menunggu periode tantangan satu minggu berakhir sebelum menarik dana kembali ke Ethereum. |
| Optimistic rollup bergantung pada insentif kriptoekonomi yang dirancang dengan baik untuk meningkatkan keamanan pada rantai. | Rollup harus memposting semua data transaksi secara onchain, yang dapat meningkatkan biaya. |
| Kompatibilitas dengan EVM dan Solidity memungkinkan pengembang untuk mem-porting kontrak pintar asli Ethereum ke rollup atau menggunakan perkakas yang ada untuk membuat dapps baru. | |

### Penjelasan visual tentang optimistic rollup {#optimistic-video}

Lebih suka belajar secara visual? Tonton Finematics menjelaskan optimistic rollup:

<YouTube id="7pWxCklcNsU" start="263" />

## Bacaan lebih lanjut tentang optimistic rollup

- [Bagaimana cara kerja optimistic rollup (Panduan Lengkap)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Apa itu Rollup Blockchain? Pengantar Teknis](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Panduan Esensial untuk Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Panduan Praktis untuk Rollup Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Status Anti-Penipuan di L2 Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Bagaimana cara kerja Rollup Optimism sebenarnya?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Penyelaman Mendalam OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Apa itu Mesin Virtual Optimistic?](https://www.alchemy.com/overviews/optimistic-virtual-machine)

## Tutorial: Optimistic rollup dan jembatan di Ethereum {#tutorials}

- [Panduan kontrak jembatan standar Optimism](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Panduan kode beranotasi dari jembatan standar Optimism untuk memindahkan aset antara L1 dan L2._