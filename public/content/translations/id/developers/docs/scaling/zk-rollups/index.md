---
title: Zero-knowledge rollup
description: "Pengantar zero-knowledge rollup—solusi peningkatan yang digunakan oleh komunitas Ethereum."
lang: id
---

Zero-knowledge rollup (ZK-rollup) adalah solusi [peningkatan](/developers/docs/scaling/) layer 2 yang meningkatkan throughput di Mainnet [Ethereum](/) dengan memindahkan komputasi dan penyimpanan status secara offchain. ZK-rollup dapat memproses ribuan transaksi dalam satu batch dan kemudian hanya memposting beberapa data ringkasan minimal ke Mainnet. Data ringkasan ini mendefinisikan perubahan yang harus dilakukan pada status Ethereum dan beberapa bukti kriptografi bahwa perubahan tersebut benar.

## Prasyarat {#prerequisites}

Anda harus sudah membaca dan memahami halaman kami tentang [peningkatan Ethereum](/developers/docs/scaling/) dan [layer 2](/layer-2).

## Apa itu zero-knowledge rollup? {#what-are-zk-rollups}

**Zero-knowledge rollup (ZK-rollup)** menggabungkan (atau 'menggulung') transaksi ke dalam batch yang dieksekusi secara offchain. Komputasi offchain mengurangi jumlah data yang harus diposting ke blockchain. Operator ZK-rollup mengirimkan ringkasan perubahan yang diperlukan untuk mewakili semua transaksi dalam satu batch daripada mengirimkan setiap transaksi secara individual. Mereka juga menghasilkan [bukti validitas](/glossary/#validity-proof) untuk membuktikan kebenaran perubahan mereka.

Status ZK-rollup dipertahankan oleh kontrak pintar yang diterapkan di jaringan Ethereum. Untuk memperbarui status ini, node ZK-rollup harus mengirimkan bukti validitas untuk verifikasi. Seperti yang disebutkan, bukti validitas adalah jaminan kriptografi bahwa perubahan status yang diusulkan oleh rollup benar-benar merupakan hasil dari mengeksekusi batch transaksi yang diberikan. Ini berarti bahwa ZK-rollup hanya perlu memberikan bukti validitas untuk menyelesaikan transaksi di Ethereum alih-alih memposting semua data transaksi secara onchain seperti [optimistic rollup](/developers/docs/scaling/optimistic-rollups/).

Tidak ada penundaan saat memindahkan dana dari ZK-rollup ke Ethereum karena transaksi keluar dieksekusi setelah kontrak ZK-rollup memverifikasi bukti validitas. Sebaliknya, penarikan dana dari optimistic rollup tunduk pada penundaan untuk memungkinkan siapa saja menantang transaksi keluar dengan [anti-penipuan](/glossary/#fraud-proof).

ZK-rollup menulis transaksi ke Ethereum sebagai `calldata`. `calldata` adalah tempat data yang disertakan dalam panggilan eksternal ke fungsi kontrak pintar disimpan. Informasi dalam `calldata` dipublikasikan di blockchain, memungkinkan siapa saja untuk merekonstruksi status rollup secara independen. ZK-rollup menggunakan teknik kompresi untuk mengurangi data transaksi—misalnya, akun diwakili oleh indeks daripada alamat, yang menghemat 28 byte data. Publikasi data onchain adalah biaya yang signifikan untuk rollup, sehingga kompresi data dapat mengurangi biaya bagi pengguna.

## Bagaimana ZK-rollup berinteraksi dengan Ethereum? {#zk-rollups-and-ethereum}

Rantai ZK-rollup adalah protokol offchain yang beroperasi di atas blockchain Ethereum dan dikelola oleh kontrak pintar Ethereum onchain. ZK-rollup mengeksekusi transaksi di luar Mainnet, tetapi secara berkala melakukan komit batch transaksi offchain ke kontrak rollup onchain. Catatan transaksi ini bersifat tetap, sangat mirip dengan blockchain Ethereum, dan membentuk rantai ZK-rollup.

Arsitektur inti ZK-rollup terdiri dari komponen-komponen berikut:

1. **Kontrak onchain**: Seperti yang disebutkan, protokol ZK-rollup dikendalikan oleh kontrak pintar yang berjalan di Ethereum. Ini termasuk kontrak utama yang menyimpan blok rollup, melacak deposit, dan memantau pembaruan status. Kontrak onchain lainnya (kontrak pemverifikasi) memverifikasi bukti zero-knowledge yang dikirimkan oleh produsen blok. Dengan demikian, Ethereum berfungsi sebagai lapisan dasar atau "layer 1" untuk ZK-rollup.

2. **Mesin virtual (VM) offchain**: Meskipun protokol ZK-rollup berada di Ethereum, eksekusi transaksi dan penyimpanan status terjadi pada mesin virtual terpisah yang independen dari [EVM](/developers/docs/evm/). VM offchain ini adalah lingkungan eksekusi untuk transaksi di ZK-rollup dan berfungsi sebagai lapisan sekunder atau "layer 2" untuk protokol ZK-rollup. Bukti validitas yang diverifikasi di Mainnet Ethereum menjamin kebenaran transisi status di VM offchain.

ZK-rollup adalah "solusi peningkatan hibrida"—protokol offchain yang beroperasi secara independen tetapi memperoleh keamanan dari Ethereum. Secara khusus, jaringan Ethereum menegakkan validitas pembaruan status pada ZK-rollup dan menjamin ketersediaan data di balik setiap pembaruan pada status rollup. Akibatnya, ZK-rollup jauh lebih aman daripada solusi peningkatan offchain murni, seperti [sidechain](/developers/docs/scaling/sidechains/), yang bertanggung jawab atas properti keamanan mereka sendiri, atau [validium](/developers/docs/scaling/validium/), yang juga memverifikasi transaksi di Ethereum dengan bukti validitas, tetapi menyimpan data transaksi di tempat lain.

ZK-rollup bergantung pada protokol utama Ethereum untuk hal-hal berikut:

### Ketersediaan data {#data-availability}

ZK-rollup mempublikasikan data status untuk setiap transaksi yang diproses secara offchain ke Ethereum. Dengan data ini, individu atau bisnis dapat mereproduksi status rollup dan memvalidasi rantai itu sendiri. Ethereum membuat data ini tersedia untuk semua peserta jaringan sebagai `calldata`.

ZK-rollup tidak perlu mempublikasikan banyak data transaksi secara onchain karena bukti validitas sudah memverifikasi keaslian transisi status. Namun demikian, menyimpan data secara onchain tetap penting karena memungkinkan verifikasi independen dan tanpa izin dari status rantai L2 yang pada gilirannya memungkinkan siapa saja untuk mengirimkan batch transaksi, mencegah operator jahat menyensor atau membekukan rantai.

Onchain diperlukan bagi pengguna untuk berinteraksi dengan rollup. Tanpa akses ke data status, pengguna tidak dapat menanyakan saldo akun mereka atau memulai transaksi (misalnya, penarikan) yang bergantung pada informasi status.

### Finalitas transaksi {#transaction-finality}

Ethereum bertindak sebagai lapisan penyelesaian untuk ZK-rollup: Transaksi L2 diselesaikan hanya jika kontrak L1 menerima bukti validitas. Ini menghilangkan risiko operator jahat merusak rantai (misalnya, mencuri dana rollup) karena setiap transaksi harus disetujui di Mainnet. Selain itu, Ethereum menjamin bahwa operasi pengguna tidak dapat dibatalkan setelah diselesaikan di L1.

### Ketahanan sensor {#censorship-resistance}

Sebagian besar ZK-rollup menggunakan "supernode" (operator) untuk mengeksekusi transaksi, menghasilkan batch, dan mengirimkan blok ke L1. Meskipun ini memastikan efisiensi, ini meningkatkan risiko penyensoran: operator ZK-rollup yang jahat dapat menyensor pengguna dengan menolak untuk memasukkan transaksi mereka ke dalam batch.

Sebagai langkah keamanan, ZK-rollup memungkinkan pengguna untuk mengirimkan transaksi secara langsung ke kontrak rollup di Mainnet jika mereka merasa sedang disensor oleh operator. Ini memungkinkan pengguna untuk memaksa keluar dari ZK-rollup ke Ethereum tanpa harus bergantung pada izin operator.

## Bagaimana cara kerja ZK-rollup? {#how-do-zk-rollups-work}

### Transaksi {#transactions}

Pengguna di ZK-rollup menandatangani transaksi dan mengirimkannya ke operator L2 untuk diproses dan dimasukkan ke dalam batch berikutnya. Dalam beberapa kasus, operator adalah entitas terpusat, yang disebut sequencer, yang mengeksekusi transaksi, menggabungkannya ke dalam batch, dan mengirimkannya ke L1. Sequencer dalam sistem ini adalah satu-satunya entitas yang diizinkan untuk menghasilkan blok L2 dan menambahkan transaksi rollup ke kontrak ZK-rollup.

ZK-rollup lainnya dapat merotasi peran operator dengan menggunakan set validator [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Calon operator menyetorkan dana ke dalam kontrak rollup, dengan ukuran setiap stake memengaruhi peluang staker untuk terpilih menghasilkan batch rollup berikutnya. Stake operator dapat dipotong jika mereka bertindak jahat, yang memberi insentif kepada mereka untuk memposting blok yang valid.

#### Bagaimana ZK-rollup mempublikasikan data transaksi di Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Seperti yang dijelaskan, data transaksi dipublikasikan di Ethereum sebagai `calldata`. `calldata` adalah area data dalam kontrak pintar yang digunakan untuk meneruskan argumen ke suatu fungsi dan berperilaku mirip dengan [memori](/developers/docs/smart-contracts/anatomy/#memory). Meskipun `calldata` tidak disimpan sebagai bagian dari status Ethereum, ia tetap ada secara onchain sebagai bagian dari [log riwayat](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) rantai Ethereum. `calldata` tidak memengaruhi status Ethereum, menjadikannya cara yang murah untuk menyimpan data secara onchain.

Kata kunci `calldata` sering mengidentifikasi metode kontrak pintar yang dipanggil oleh transaksi dan menyimpan input ke metode tersebut dalam bentuk urutan byte arbitrer. ZK-rollup menggunakan `calldata` untuk mempublikasikan data transaksi terkompresi secara onchain; operator rollup cukup menambahkan batch baru dengan memanggil fungsi yang diperlukan dalam kontrak rollup dan meneruskan data terkompresi sebagai argumen fungsi. Ini membantu mengurangi biaya bagi pengguna karena sebagian besar biaya rollup digunakan untuk menyimpan data transaksi secara onchain.

### Komitmen status {#state-commitments}

Status ZK-rollup, yang mencakup akun dan saldo L2, direpresentasikan sebagai [pohon Merkle](/whitepaper/#merkle-trees). Hash kriptografi dari akar pohon Merkle (akar Merkle) disimpan dalam kontrak onchain, memungkinkan protokol rollup untuk melacak perubahan dalam status ZK-rollup.

Rollup bertransisi ke status baru setelah eksekusi serangkaian transaksi baru. Operator yang memulai transisi status diharuskan untuk menghitung akar status baru dan mengirimkannya ke kontrak onchain. Jika bukti validitas yang terkait dengan batch diautentikasi oleh kontrak pemverifikasi, akar Merkle yang baru menjadi akar status kanonis ZK-rollup.

Selain menghitung akar status, operator ZK-rollup juga membuat akar batch—akar pohon Merkle yang terdiri dari semua transaksi dalam satu batch. Saat batch baru dikirimkan, kontrak rollup menyimpan akar batch, memungkinkan pengguna untuk membuktikan bahwa suatu transaksi (misalnya, permintaan penarikan) disertakan dalam batch tersebut. Pengguna harus memberikan detail transaksi, akar batch, dan [bukti Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) yang menunjukkan jalur penyertaan.

### Bukti validitas {#validity-proofs}

Akar status baru yang dikirimkan operator ZK-rollup ke kontrak L1 adalah hasil pembaruan pada status rollup. Katakanlah Alice mengirim 10 token ke Bob, operator cukup mengurangi saldo Alice sebesar 10 dan menambah saldo Bob sebesar 10. Operator kemudian melakukan hash pada data akun yang diperbarui, membangun kembali pohon Merkle rollup, dan mengirimkan akar Merkle baru ke kontrak onchain.

Namun kontrak rollup tidak akan secara otomatis menerima komitmen status yang diusulkan sampai operator membuktikan bahwa akar Merkle yang baru dihasilkan dari pembaruan yang benar pada status rollup. Operator ZK-rollup melakukan ini dengan menghasilkan bukti validitas, komitmen kriptografi ringkas yang memverifikasi kebenaran transaksi yang di-batch.

Bukti validitas memungkinkan pihak-pihak untuk membuktikan kebenaran suatu pernyataan tanpa mengungkapkan pernyataan itu sendiri—oleh karena itu, mereka juga disebut bukti zero-knowledge. ZK-rollup menggunakan bukti validitas untuk mengonfirmasi kebenaran transisi status offchain tanpa harus mengeksekusi ulang transaksi di Ethereum. Bukti-bukti ini dapat berupa [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) atau [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

Baik SNARK maupun STARK membantu membuktikan integritas komputasi offchain di ZK-rollup, meskipun setiap jenis bukti memiliki fitur yang berbeda.

**ZK-SNARK**

Agar protokol ZK-SNARK berfungsi, pembuatan Common Reference String (CRS) diperlukan: CRS menyediakan parameter publik untuk membuktikan dan memverifikasi bukti validitas. Keamanan sistem pembuktian bergantung pada pengaturan CRS; jika informasi yang digunakan untuk membuat parameter publik jatuh ke tangan aktor jahat, mereka mungkin dapat menghasilkan bukti validitas palsu.

Beberapa ZK-rollup mencoba memecahkan masalah ini dengan menggunakan [upacara komputasi multi-pihak (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), yang melibatkan individu tepercaya, untuk menghasilkan parameter publik untuk sirkuit ZK-SNARK. Setiap pihak menyumbangkan beberapa keacakan (disebut "limbah beracun") untuk membangun CRS, yang harus segera mereka hancurkan.

Pengaturan tepercaya digunakan karena meningkatkan keamanan pengaturan CRS. Selama satu peserta yang jujur menghancurkan input mereka, keamanan sistem ZK-SNARK terjamin. Namun, pendekatan ini membutuhkan kepercayaan kepada mereka yang terlibat untuk menghapus keacakan sampel mereka dan tidak merusak jaminan keamanan sistem.

Mengesampingkan asumsi kepercayaan, ZK-SNARK populer karena ukuran buktinya yang kecil dan verifikasi waktu konstan. Karena verifikasi bukti di L1 merupakan biaya yang lebih besar untuk mengoperasikan ZK-rollup, L2 menggunakan ZK-SNARK untuk menghasilkan bukti yang dapat diverifikasi dengan cepat dan murah di Mainnet.

**ZK-STARK**

Seperti ZK-SNARK, ZK-STARK membuktikan validitas komputasi offchain tanpa mengungkapkan inputnya. Namun, ZK-STARK dianggap sebagai peningkatan dari ZK-SNARK karena skalabilitas dan transparansinya.

ZK-STARK bersifat 'transparan', karena dapat bekerja tanpa pengaturan tepercaya dari Common Reference String (CRS). Sebaliknya, ZK-STARK mengandalkan keacakan yang dapat diverifikasi secara publik untuk mengatur parameter guna menghasilkan dan memverifikasi bukti.

ZK-STARK juga memberikan skalabilitas yang lebih besar karena waktu yang dibutuhkan untuk membuktikan dan memverifikasi bukti validitas meningkat secara _kuasilinear_ sehubungan dengan kompleksitas komputasi yang mendasarinya. Dengan ZK-SNARK, waktu pembuktian dan verifikasi berskala _linear_ sehubungan dengan ukuran komputasi yang mendasarinya. Ini berarti ZK-STARK membutuhkan lebih sedikit waktu daripada ZK-SNARK untuk membuktikan dan memverifikasi ketika kumpulan data besar terlibat, menjadikannya berguna untuk aplikasi bervolume tinggi.

ZK-STARK juga aman terhadap komputer kuantum, sementara Kriptografi Kurva Eliptik (ECC) yang digunakan dalam ZK-SNARK secara luas diyakini rentan terhadap serangan komputasi kuantum. Kelemahan ZK-STARK adalah mereka menghasilkan ukuran bukti yang lebih besar, yang lebih mahal untuk diverifikasi di Ethereum.

#### Bagaimana cara kerja bukti validitas di ZK-rollup? {#validity-proofs-in-zk-rollups}

##### Pembuatan bukti

Sebelum menerima transaksi, operator akan melakukan pemeriksaan biasa. Ini termasuk mengonfirmasi bahwa:

- Akun pengirim dan penerima adalah bagian dari pohon status.
- Pengirim memiliki dana yang cukup untuk memproses transaksi.
- Transaksi sudah benar dan cocok dengan kunci publik pengirim di rollup.
- Nonce pengirim sudah benar, dll.

Setelah node ZK-rollup memiliki cukup transaksi, ia menggabungkannya ke dalam batch dan mengompilasi input untuk sirkuit pembuktian untuk dikompilasi menjadi bukti ZK yang ringkas. Ini termasuk:

- Akar pohon Merkle yang terdiri dari semua transaksi dalam batch.
- Bukti Merkle untuk transaksi guna membuktikan penyertaan dalam batch.
- Bukti Merkle untuk setiap pasangan pengirim-penerima dalam transaksi guna membuktikan bahwa akun tersebut adalah bagian dari pohon status rollup.
- Serangkaian akar status perantara, yang diturunkan dari pembaruan akar status setelah menerapkan pembaruan status untuk setiap transaksi (yaitu, mengurangi akun pengirim dan menambah akun penerima).

Sirkuit pembuktian menghitung bukti validitas dengan "mengulang" setiap transaksi dan melakukan pemeriksaan yang sama yang diselesaikan operator sebelum memproses transaksi. Pertama, ia memverifikasi bahwa akun pengirim adalah bagian dari akar status yang ada menggunakan bukti Merkle yang disediakan. Kemudian ia mengurangi saldo pengirim, meningkatkan nonce mereka, melakukan hash pada data akun yang diperbarui dan menggabungkannya dengan bukti Merkle untuk menghasilkan akar Merkle baru.

Akar Merkle ini mencerminkan satu-satunya perubahan dalam status ZK-rollup: perubahan pada saldo dan nonce pengirim. Ini dimungkinkan karena bukti Merkle yang digunakan untuk membuktikan keberadaan akun digunakan untuk menurunkan akar status baru.

Sirkuit pembuktian melakukan proses yang sama pada akun penerima. Ia memeriksa apakah akun penerima ada di bawah akar status perantara (menggunakan bukti Merkle), meningkatkan saldo mereka, melakukan hash ulang pada data akun dan menggabungkannya dengan bukti Merkle untuk menghasilkan akar status baru.

Proses ini berulang untuk setiap transaksi; setiap "pengulangan" menciptakan akar status baru dari pembaruan akun pengirim dan akar baru berikutnya dari pembaruan akun penerima. Seperti yang dijelaskan, setiap pembaruan pada akar status mewakili satu bagian dari perubahan pohon status rollup.

Sirkuit pembuktian ZK mengulangi seluruh batch transaksi, memverifikasi urutan pembaruan yang menghasilkan akar status akhir setelah transaksi terakhir dieksekusi. Akar Merkle terakhir yang dihitung menjadi akar status kanonis terbaru dari ZK-rollup.

##### Verifikasi bukti

Setelah sirkuit pembuktian memverifikasi kebenaran pembaruan status, operator L2 mengirimkan bukti validitas yang dihitung ke kontrak pemverifikasi di L1. Sirkuit verifikasi kontrak memverifikasi validitas bukti dan juga memeriksa input publik yang menjadi bagian dari bukti:

- **Akar pra-status**: Akar status lama ZK-rollup (yaitu, sebelum transaksi yang di-batch dieksekusi), yang mencerminkan status valid terakhir yang diketahui dari rantai L2.

- **Akar pasca-status**: Akar status baru ZK-rollup (yaitu, setelah eksekusi transaksi yang di-batch), yang mencerminkan status terbaru rantai L2. Akar pasca-status adalah akar akhir yang diturunkan setelah menerapkan pembaruan status di sirkuit pembuktian.

- **Akar batch**: Akar Merkle dari batch, yang diturunkan dengan _merklisasi_ transaksi dalam batch dan melakukan hash pada akar pohon.

- **Input transaksi**: Data yang terkait dengan transaksi yang dieksekusi sebagai bagian dari batch yang dikirimkan.

Jika bukti memenuhi sirkuit (yaitu, valid), itu berarti ada urutan transaksi valid yang mentransisikan rollup dari status sebelumnya (disidikjari secara kriptografi oleh akar pra-status) ke status baru (disidikjari secara kriptografi oleh akar pasca-status). Jika akar pra-status cocok dengan akar yang disimpan dalam kontrak rollup, dan buktinya valid, kontrak rollup mengambil akar pasca-status dari bukti dan memperbarui pohon statusnya untuk mencerminkan status rollup yang berubah.

### Masuk dan keluar {#entries-and-exits}

Pengguna memasuki ZK-rollup dengan menyetorkan token ke dalam kontrak rollup yang diterapkan pada rantai L1. Transaksi ini diantrekan karena hanya operator yang dapat mengirimkan transaksi ke kontrak rollup.

Jika antrean deposit yang tertunda mulai terisi, operator ZK-rollup akan mengambil transaksi deposit dan mengirimkannya ke kontrak rollup. Setelah dana pengguna berada di rollup, mereka dapat mulai bertransaksi dengan mengirimkan transaksi ke operator untuk diproses. Pengguna dapat memverifikasi saldo di rollup dengan melakukan hash pada data akun mereka, mengirimkan hash ke kontrak rollup, dan memberikan bukti Merkle untuk memverifikasi terhadap akar status saat ini.

Menarik dana dari ZK-rollup ke L1 sangatlah mudah. Pengguna memulai transaksi keluar dengan mengirimkan aset mereka di rollup ke akun yang ditentukan untuk dibakar. Jika operator menyertakan transaksi dalam batch berikutnya, pengguna dapat mengirimkan permintaan penarikan ke kontrak onchain. Permintaan penarikan ini akan mencakup hal-hal berikut:

- Bukti Merkle yang membuktikan penyertaan transaksi pengguna ke akun pembakaran dalam batch transaksi

- Data transaksi

- Akar batch

- Alamat L1 untuk menerima dana yang disetorkan

Kontrak rollup melakukan hash pada data transaksi, memeriksa apakah akar batch ada, dan menggunakan bukti Merkle untuk memeriksa apakah hash transaksi adalah bagian dari akar batch. Setelah itu, kontrak mengeksekusi transaksi keluar dan mengirimkan dana ke alamat pilihan pengguna di L1.

## ZK-rollup dan kompatibilitas EVM {#zk-rollups-and-evm-compatibility}

Tidak seperti optimistic rollup, ZK-rollup tidak serta merta kompatibel dengan [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/). Membuktikan komputasi EVM tujuan umum dalam sirkuit lebih sulit dan padat sumber daya daripada membuktikan komputasi sederhana (seperti transfer token yang dijelaskan sebelumnya).

Namun, [kemajuan dalam teknologi zero-knowledge](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) memicu minat baru untuk membungkus komputasi EVM dalam bukti zero-knowledge. Upaya ini diarahkan untuk menciptakan implementasi EVM zero-knowledge (zkEVM) yang dapat secara efisien memverifikasi kebenaran eksekusi program. zkEVM menciptakan kembali opcode EVM yang ada untuk pembuktian/verifikasi dalam sirkuit, yang memungkinkan untuk mengeksekusi kontrak pintar.

Seperti EVM, zkEVM bertransisi antar status setelah komputasi dilakukan pada beberapa input. Perbedaannya adalah bahwa zkEVM juga membuat bukti zero-knowledge untuk memverifikasi kebenaran setiap langkah dalam eksekusi program. Bukti validitas dapat memverifikasi kebenaran operasi yang menyentuh status VM (memori, tumpukan, penyimpanan) dan komputasi itu sendiri (yaitu, apakah operasi memanggil opcode yang tepat dan mengeksekusinya dengan benar?).

Pengenalan ZK-rollup yang kompatibel dengan EVM diharapkan dapat membantu pengembang memanfaatkan skalabilitas dan jaminan keamanan dari bukti zero-knowledge. Lebih penting lagi, kompatibilitas dengan infrastruktur asli Ethereum berarti pengembang dapat membangun dapp yang ramah ZK menggunakan perkakas dan bahasa yang familier (dan teruji).

## Bagaimana cara kerja biaya ZK-rollup? {#how-do-zk-rollup-fees-work}

Berapa banyak yang dibayar pengguna untuk transaksi di ZK-rollup bergantung pada biaya gas, sama seperti di Mainnet Ethereum. Namun, biaya gas bekerja secara berbeda di L2 dan dipengaruhi oleh biaya-biaya berikut:

1. **Penulisan status**: Ada biaya tetap untuk menulis ke status Ethereum (yaitu, mengirimkan transaksi di blockchain Ethereum). ZK-rollup mengurangi biaya ini dengan melakukan batching transaksi dan menyebarkan biaya tetap ke beberapa pengguna.

2. **Publikasi data**: ZK-rollup mempublikasikan data status untuk setiap transaksi ke Ethereum sebagai `calldata`. Biaya `calldata` saat ini diatur oleh [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), yang menetapkan biaya masing-masing sebesar 16 gas untuk byte bukan nol dan 4 gas untuk byte nol dari `calldata`. Biaya yang dibayarkan pada setiap transaksi dipengaruhi oleh seberapa banyak `calldata` yang perlu diposting secara onchain untuk itu.

3. **Biaya operator L2**: Ini adalah jumlah yang dibayarkan kepada operator rollup sebagai kompensasi atas biaya komputasi yang dikeluarkan dalam memproses transaksi, sangat mirip dengan ["biaya prioritas (tip)" transaksi](/developers/docs/gas/#how-are-gas-fees-calculated) di Mainnet Ethereum.

4. **Pembuatan dan verifikasi bukti**: Operator ZK-rollup harus menghasilkan bukti validitas untuk batch transaksi, yang padat sumber daya. Memverifikasi bukti zero-knowledge di Mainnet juga membutuhkan gas (~ 500.000 gas).

Selain melakukan batching transaksi, ZK-rollup mengurangi biaya bagi pengguna dengan mengompresi data transaksi. Anda dapat [melihat ikhtisar waktu nyata](https://l2fees.info/) tentang berapa biaya untuk menggunakan ZK-rollup Ethereum.

## Bagaimana ZK-rollup meningkatkan Ethereum? {#scaling-ethereum-with-zk-rollups}

### Kompresi data transaksi {#transaction-data-compression}

ZK-rollup memperluas throughput pada lapisan dasar Ethereum dengan mengambil komputasi secara offchain, tetapi dorongan nyata untuk peningkatan berasal dari kompresi data transaksi. [Ukuran blok](/developers/docs/blocks/#block-size) Ethereum membatasi data yang dapat ditampung setiap blok dan, lebih jauh lagi, jumlah transaksi yang diproses per blok. Dengan mengompresi data terkait transaksi, ZK-rollup secara signifikan meningkatkan jumlah transaksi yang diproses per blok.

ZK-rollup dapat mengompresi data transaksi lebih baik daripada optimistic rollup karena mereka tidak perlu memposting semua data yang diperlukan untuk memvalidasi setiap transaksi. Mereka hanya perlu memposting data minimal yang diperlukan untuk membangun kembali status akun dan saldo terbaru di rollup.

### Bukti rekursif {#recursive-proofs}

Keuntungan dari bukti zero-knowledge adalah bahwa bukti dapat memverifikasi bukti lainnya. Misalnya, satu ZK-SNARK dapat memverifikasi ZK-SNARK lainnya. "Bukti dari bukti" semacam itu disebut bukti rekursif dan secara dramatis meningkatkan throughput pada ZK-rollup.

Saat ini, bukti validitas dihasilkan berdasarkan blok demi blok dan dikirimkan ke kontrak L1 untuk verifikasi. Namun, memverifikasi bukti blok tunggal membatasi throughput yang dapat dicapai ZK-rollup karena hanya satu blok yang dapat diselesaikan saat operator mengirimkan bukti.

Namun, bukti rekursif memungkinkan untuk menyelesaikan beberapa blok dengan satu bukti validitas. Ini karena sirkuit pembuktian secara rekursif menggabungkan beberapa bukti blok hingga satu bukti akhir dibuat. Operator L2 mengirimkan bukti rekursif ini, dan jika kontrak menerimanya, semua blok yang relevan akan diselesaikan secara instan. Dengan bukti rekursif, jumlah transaksi ZK-rollup yang dapat diselesaikan di Ethereum pada interval tertentu meningkat.

### Kelebihan dan kekurangan ZK-rollup {#zk-rollups-pros-and-cons}

| Kelebihan                                                                                                                                                                                              | Kekurangan                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bukti validitas memastikan kebenaran transaksi offchain dan mencegah operator mengeksekusi transisi status yang tidak valid.                                                                           | Biaya yang terkait dengan komputasi dan verifikasi bukti validitas sangat besar dan dapat meningkatkan biaya bagi pengguna rollup.                                                                 |
| Menawarkan finalitas transaksi yang lebih cepat karena pembaruan status disetujui setelah bukti validitas diverifikasi di L1.                                                                          | Membangun ZK-rollup yang kompatibel dengan EVM sulit dilakukan karena kompleksitas teknologi zero-knowledge.                                                                                       |
| Mengandalkan mekanisme kriptografi tanpa kepercayaan untuk keamanan, bukan kejujuran aktor yang diberi insentif seperti pada [optimistic rollup](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Menghasilkan bukti validitas membutuhkan perangkat keras khusus, yang dapat mendorong kontrol terpusat atas rantai oleh beberapa pihak.                                                            |
| Menyimpan data yang diperlukan untuk memulihkan status offchain di L1, yang menjamin keamanan, ketahanan sensor, dan desentralisasi.                                                                   | Operator terpusat (sequencer) dapat memengaruhi urutan transaksi.                                                                                                                                  |
| Pengguna mendapat manfaat dari efisiensi modal yang lebih besar dan dapat menarik dana dari L2 tanpa penundaan.                                                                                        | Persyaratan perangkat keras dapat mengurangi jumlah peserta yang dapat memaksa rantai untuk membuat kemajuan, meningkatkan risiko operator jahat membekukan status rollup dan menyensor pengguna.  |
| Tidak bergantung pada asumsi keaktifan dan pengguna tidak perlu memvalidasi rantai untuk melindungi dana mereka.                                                                                       | Beberapa sistem pembuktian (misalnya, ZK-SNARK) memerlukan pengaturan tepercaya yang, jika salah penanganan, berpotensi membahayakan model keamanan ZK-rollup.                                     |
| Kompresi data yang lebih baik dapat membantu mengurangi biaya penerbitan `calldata` di Ethereum dan meminimalkan biaya rollup bagi pengguna.                                                           |                                                                                                                                                                                                    |

### Penjelasan visual tentang ZK-rollup {#zk-video}

Tonton Finematics menjelaskan ZK-rollup:

<YouTube id="7pWxCklcNsU" start="406" />


## Siapa yang sedang mengerjakan zkEVM? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM untuk L2 vs L1</AlertTitle>
<AlertDescription>
Proyek-proyek di bawah ini menggunakan teknologi zkEVM para membangun rollup layer 2. Ada juga penelitian tentang penggunaan zkEVM untuk verifikasi blok L1, yang akan memungkinkan validator memverifikasi blok Ethereum tanpa menjalankan kembali transaksi.
</AlertDescription>
</AlertContent>
</Alert>


Proyek yang mengerjakan zkEVM meliputi:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM adalah proyek yang didanai oleh Ethereum Foundation untuk mengembangkan ZK-rollup yang kompatibel dengan EVM dan mekanisme untuk menghasilkan bukti validitas untuk blok Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _adalah ZK Rollup terdesentralisasi di mainnet Ethereum yang bekerja pada Mesin Virtual Ethereum zero-knowledge (zkEVM) yang mengeksekusi transaksi Ethereum secara transparan, termasuk kontrak pintar dengan validasi bukti zero-knowledge._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll adalah perusahaan berbasis teknologi yang bekerja untuk membangun Solusi Layer 2 zkEVM asli untuk Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko adalah ZK-rollup terdesentralisasi yang setara dengan Ethereum ([ZK-EVM Tipe 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era adalah ZK Rollup yang kompatibel dengan EVM yang dibangun oleh Matter Labs, didukung oleh zkEVM-nya sendiri._

- **[Starknet](https://starkware.co/starknet/)** - _StarkNet adalah solusi peningkatan layer 2 yang kompatibel dengan EVM yang dibangun oleh StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph adalah solusi peningkatan rollup hibrida yang memanfaatkan bukti zk untuk mengatasi masalah tantangan status Layer 2._

- **[Linea](https://linea.build)** - _Linea adalah Layer 2 zkEVM yang setara dengan Ethereum yang dibangun oleh Consensys, sepenuhnya selaras dengan ekosistem Ethereum._

## Bacaan lebih lanjut tentang ZK-rollup {#further-reading-on-zk-rollups}

- [Apa Itu Zero-Knowledge Rollup?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Apa itu zero-knowledge rollup?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Panduan Praktis untuk Rollup Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARK vs SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Apa itu zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Tipe ZK-EVM: Setara Ethereum, setara EVM, Tipe 1, Tipe 4, dan kata kunci samar lainnya](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Pengantar zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Apa itu L2 ZK-EVM?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Sumber daya Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARK di balik layar](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Bagaimana SNARK dimungkinkan?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Tutorial: Privasi & zero-knowledge di Ethereum {#tutorials}

- [Menggunakan zero-knowledge untuk status rahasia](/developers/tutorials/secret-state/) _– Cara menggunakan bukti ZK dan komponen server offchain untuk mempertahankan status permainan rahasia secara onchain._
- [Menggunakan Alamat Siluman](/developers/tutorials/stealth-addr/) _– Bagaimana alamat siluman ERC-5564 memungkinkan transfer ETH anonim menggunakan derivasi kunci kriptografi._
- [Menggunakan Ethereum untuk autentikasi web2](/developers/tutorials/ethereum-for-web2-auth/) _– Cara mengintegrasikan tanda tangan dompet Ethereum dengan sistem autentikasi web2 berbasis SAML._