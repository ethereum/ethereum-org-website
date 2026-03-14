---
title: Rollup zero-knowledge
description: Pengantar tentang rollup tanpa pengetahuan - solusi peningkatan oleh komunitas Ethereum.
lang: id
---

Zero-knowledge rollup (ZK-rollup) adalah [solusi penskalaan](/developers/docs/scaling/) layer 2 yang meningkatkan throughput di Mainnet Ethereum dengan memindahkan komputasi dan penyimpanan-state secara offchain. ZK-rollups mampu memproses ribuan transaksi dalam satu rombongan dan kemudian hanya mengunggah ringkasan data minimal ke Mainnet. Ringkasan data ini mendefinisikan bahwa pembaruan data yang harus dilakukan di Ethereum dan bukti kriptografi dalam perubahan itu benar adanya.

## Persyaratan {#prerequisites}

Anda seharusnya sudah membaca dan memahami halaman kami tentang [penskalaan Ethereum](/developers/docs/scaling/) dan [lapisan 2](/layer-2).

## Apa itu zero-knowledge rollups? {#what-are-zk-rollups}

**Zero-knowledge rollup (ZK-rollup)** menggabungkan (atau 'roll up') transaksi menjadi batch yang dieksekusi secara offchain. Komputasi di luar chain mengurangi jumlah data yang harus diposting ke blockchain. Operator ZK-rollup mengajukan ringkasan perubahan harus merepresentasikan semua transaksi dalam satu rombongan dari pada mengirim transaksi satu per satu. ZK-rollup juga menghasilkan [bukti validitas](/glossary/#validity-proof) untuk membuktikan kebenaran dari perubahannya.

Status ZK-rollup ini dikelola dengan kontrak pintar yang diunggah dalam jaringan Ethereum. Untuk memperbaharui status, node ZK-rollup harus mengajukan bukti validitas untuk verifikasi. Seperti yang disebut, bukti validitas adalah jaminan kriptografi yang menjamin bahwa perubahan data yang diusulkan oleh rollup adalah benar-benar hasil eksekusi dari kumpulan transaksi. Ini berarti ZK-rollup hanya perlu menyediakan bukti validitas untuk menyelesaikan transaksi di Ethereum, alih-alih memposting semua data transaksi ke onchain seperti [optimistic rollup](/developers/docs/scaling/optimistic-rollups/).

Tidak ada jeda waktu ketika memindahkan dana dari ZK-rollup ke Ethereum karena hasil transaksi sekali dieksekusi maka kontrak ZK-rollup memverifikasi bukti validitas. Sebaliknya, penarikan dana dari optimistic rollup dikenai penundaan untuk memberi kesempatan bagi siapa saja menantang transaksi keluar dengan [fraud proof](/glossary/#fraud-proof).

ZK-rollup menulis transaksi ke Ethereum sebagai `calldata`. `calldata` adalah tempat data yang disertakan dalam panggilan eksternal ke fungsi kontrak pintar disimpan. Informasi dalam `calldata` dipublikasikan di blockchain, yang memungkinkan siapa pun untuk merekonstruksi state rollup secara mandiri. ZK-rollup menggunakan teknik kompresi untuk mengurangi data transaksi -misalnya, akun direpresentasikan oleh sebuah indeks dari pada sebuah alamat. Hal ini menghemat 28 bit data. Publikasi data di onchain merupakan biaya signifikan bagi rollups, sehingga kompresi data dapat mengurangi biaya bagi pengguna.

## Bagaimana ZK-rollup berinteraksi dengan Ethereum? {#zk-rollups-and-ethereum}

Rantai ZK-rollup adalah protokol offchain yang berjalan di atas blockchain Ethereum dan dikelola oleh smart contract Ethereum onchain. ZK-rollups mengeksekusi transaksi di luar Mainnet, tetapi secara berkala mengirimkan batch transaksi offchain ke smart contract rollup onchain. Catatan transaksi ini abadi, seperti blockchain Ethereum, dan bentuk-bentuk rangkaian ZK-rollup.

Pokok arsitektur ZK-rollup dibanggun dengan komponen berikut:

1. **Kontrak onchain**: Seperti yang telah disebutkan, protokol ZK-rollup dikendalikan oleh kontrak pintar yang berjalan di Ethereum. Hal ini termasuk kontrak utama yang memuat data blok rollup, melacak dana, dan memonitor perubahan data. Kontrak onchain lain (kontrak verifier) memverifikasi bukti zero-knowledge yang dikirimkan oleh pembuat blok. Jadi, Ethereum menjadi dasar lapisan atau "lapisan 1" bagi ZK-rollup.

2. **Mesin virtual (VM) offchain**: Meskipun protokol ZK-rollup ada di Ethereum, eksekusi transaksi dan penyimpanan state terjadi di mesin virtual terpisah yang independen dari [EVM](/developers/docs/evm/). VM offchain ini adalah lingkungan eksekusi untuk transaksi di ZK-rollup dan berfungsi sebagai lapisan sekunder atau ‘layer 2’ untuk protokol ZK-rollup. Bukti validitas yang diverifikasi di Ethereum Mainnet menjamin kebenaran transisi state di VM offchain.

ZK-rollups adalah ‘solusi penskalaan hibrida’—protokol offchain yang beroperasi secara independen namun mendapatkan keamanan dari Ethereum. Secara khusus, jaringan Ethereum memberlakukan keabsahan pembaruan status pada ZK-rollup dan menjamin ketersediaan data di balik setiap pembaharuan status rollup. Akibatnya, ZK-rollup jauh lebih aman dibandingkan solusi penskalaan offchain murni, seperti [sidechain](/developers/docs/scaling/sidechains/), yang bertanggung jawab atas properti keamanannya sendiri, atau [validium](/developers/docs/scaling/validium/), yang juga memverifikasi transaksi di Ethereum dengan bukti validitas, tetapi menyimpan data transaksi di tempat lain.

ZK-rollup bergantung pada protokol Ethereum utama untuk hal-hal berikut ini:

### Ketersediaan data {#data-availability}

ZK-rollups menerbitkan data state untuk setiap transaksi yang diproses offchain ke Ethereum. Dengan data ini, individu atau bisnis dapat mengulang produksi status rollup dan mengesahkan rantai itu sendiri. Ethereum membuat data ini tersedia untuk semua peserta jaringan sebagai `calldata`.

ZK-rollups tidak perlu mempublikasikan banyak data transaksi di onchain karena bukti validitas sudah memverifikasi keaslian transisi state. Namun demikian, menyimpan data di onchain tetap penting karena memungkinkan verifikasi independen tanpa izin terhadap state rantai L2, yang pada gilirannya memungkinkan siapa saja mengirim batch transaksi, mencegah operator jahat mengekang atau membekukan rantai.

Onchain diperlukan agar pengguna dapat berinteraksi dengan rollup. Tanpa akses ke data state, pengguna tidak dapat memeriksa saldo akun mereka atau memulai transaksi (misalnya, penarikan) yang bergantung pada informasi state.

### Finalitas transaksi {#transaction-finality}

Ethereum berperan sebagai lapisan penyelesaian untuk ZK-rollups: transaksi L2 hanya diselesaikan jika kontrak L1 menerima bukti validitas. Ini menghilangkan risiko operator jahat merusak rantai (misalnya, mencuri dana rollup) karena setiap transaksi harus disetujui di Jaringan Utama. Selain itu, Ethereum menjamin bahwa operasi pengguna tidak dapat dibatalkan setelah diselesaikan di L1.

### Ketahanan sensor {#censorship-resistance}

Sebagian besar ZK-rollups menggunakan ‘supernode’ (operator) untuk mengeksekusi transaksi, membuat batch, dan mengirim blok ke L1. Meskipun ini memastikan efisiensi, hal ini meningkatkan risiko sensor: operator ZK-rollup jahat dapat menyensor pengguna dengan menolak memasukkan transaksi mereka ke dalam batch.

Sebagai langkah keamanan, ZK-rollups memungkinkan pengguna untuk mengirim transaksi langsung ke kontrak rollup di Mainnet jika mereka merasa disensor oleh operator. Ini memungkinkan pengguna untuk memaksa keluar dari ZK-rollup ke Ethereum tanpa harus bergantung pada izin operator.

## Bagaimana cara kerja ZK-rollups? {#how-do-zk-rollups-work}

### Transaksi {#transactions}

Pengguna di ZK-rollup menandatangani transaksi dan mengirimkannya ke operator L2 untuk diproses dan dimasukkan ke dalam batch berikutnya. Dalam beberapa kasus, operator adalah entitas terpusat yang disebut sequencer, yang mengeksekusi transaksi, menggabungkannya menjadi batch, dan mengirimkannya ke L1. Sequencer dalam sistem ini adalah satu-satunya entitas yang diizinkan untuk membuat blok L2 dan menambahkan transaksi rollup ke kontrak ZK-rollup.

ZK-rollup lain dapat menggilir peran operator dengan menggunakan satu set validator [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Calon operator menyetor dana ke kontrak rollup, dengan besarnya setiap taruhan memengaruhi peluang staker untuk dipilih dalam memproduksi batch rollup berikutnya. Taruhan operator dapat dikurangi jika mereka bertindak jahat, yang mendorong mereka untuk memposting blok yang valid.

#### Cara ZK-rollup memublikasikan data transaksi di Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Seperti yang telah dijelaskan, data transaksi dipublikasikan di Ethereum sebagai `calldata`. `calldata` adalah area data dalam kontrak pintar yang digunakan untuk meneruskan argumen ke sebuah fungsi dan berperilaku serupa dengan [memori](/developers/docs/smart-contracts/anatomy/#memory). Meskipun `calldata` tidak disimpan sebagai bagian dari state Ethereum, `calldata` tetap ada secara onchain sebagai bagian dari [log riwayat](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) rantai Ethereum. `calldata` tidak memengaruhi state Ethereum, menjadikannya cara yang murah untuk menyimpan data secara onchain.

Kata kunci `calldata` sering kali mengidentifikasi metode kontrak pintar yang dipanggil oleh suatu transaksi dan menampung input untuk metode tersebut dalam bentuk urutan byte yang arbitrer. ZK-rollup menggunakan `calldata` untuk mempublikasikan data transaksi yang dikompresi secara onchain; operator rollup cukup menambahkan batch baru dengan memanggil fungsi yang diperlukan di kontrak rollup dan meneruskan data terkompresi sebagai argumen fungsi. Ini bantuan mengurangi biaya bagi pengguna karena sebagian besar biaya rollup digunakan untuk menyimpan data transaksi di onchain.

### Komitmen status {#state-commitments}

State ZK-rollup, yang mencakup akun dan saldo L2, direpresentasikan sebagai [Pohon Merkle](/whitepaper/#merkle-trees). Hash kriptografi dari akar Merkle tree (Merkle root) disimpan di kontrak onchain, memungkinkan protokol rollup melacak perubahan dalam state ZK-rollup.

Rollup bertransisi ke state baru setelah eksekusi satu set transaksi baru. Operator yang memulai transisi state diwajibkan untuk menghitung state root baru dan mengirimkannya ke kontrak onchain. Jika bukti validitas yang terkait dengan batch diautentikasi oleh kontrak verifier, Merkle root baru menjadi state root kanonik ZK-rollup.

Selain menghitung state root, operator ZK-rollup juga membuat batch root—akar dari Merkle tree yang mencakup semua transaksi dalam satu batch. “Ketika batch baru dikirimkan, kontrak rollup menyimpan batch root, memungkinkan pengguna membuktikan bahwa sebuah transaksi (misalnya, permintaan penarikan) termasuk dalam batch tersebut. Pengguna harus memberikan detail transaksi, root batch, dan [bukti Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) yang menunjukkan jalur inklusi.

### Bukti validitas {#validity-proofs}

State root baru yang dikirimkan operator ZK-rollup ke kontrak L1 adalah hasil dari pembaruan pada state rollup. Misalkan Alice mengirim 10 token ke Bob, operator cukup mengurangi saldo Alice sebesar 10 dan menambahkan saldo Bob sebesar 10. Operator kemudian melakukan hash pada data akun yang diperbarui, membangun ulang Merkle tree rollup, dan mengirimkan Merkle root baru ke kontrak onchain.

Namun kontrak rollup tidak akan otomatis menerima komitmen state yang diajukan sampai operator membuktikan bahwa Merkle root baru berasal dari pembaruan yang benar pada state rollup. Operator ZK-rollup melakukan ini dengan menghasilkan bukti validitas, sebuah komitmen kriptografi ringkas yang memverifikasi kebenaran transaksi dalam batch.

Bukti validitas memungkinkan pihak-pihak membuktikan kebenaran suatu pernyataan tanpa mengungkapkan pernyataan itu sendiri—oleh karena itu, bukti ini juga disebut bukti zero-knowledge. ZK-rollups menggunakan bukti validitas untuk memastikan kebenaran transisi state offchain tanpa harus mengeksekusi ulang transaksi di Ethereum. Bukti-bukti ini dapat berupa [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) atau [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

Baik SNARK maupun STARK membantu memastikan integritas perhitungan offchain di ZK-rollups, meskipun masing-masing jenis bukti memiliki fitur yang khas.

**ZK-SNARK**

Agar protokol ZK-SNARK berfungsi, pembuatan Common Reference String (CRS) diperlukan: CRS menyediakan parameter publik untuk membuktikan dan memverifikasi bukti validitas. Keamanan sistem pembuktian bergantung pada pengaturan CRS; jika informasi yang digunakan untuk membuat parameter publik jatuh ke tangan pihak jahat, mereka mungkin dapat menghasilkan bukti validitas palsu.

Beberapa ZK-rollup mencoba menyelesaikan masalah ini dengan menggunakan [upacara komputasi multi-pihak (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), yang melibatkan individu tepercaya, untuk menghasilkan parameter publik bagi sirkuit ZK-SNARK. Setiap pihak menyumbangkan sedikit elemen acak (disebut "toxic waste") untuk membangun CRS, yang harus mereka hancurkan segera setelahnya.

Trusted setup digunakan karena meningkatkan keamanan pengaturan CRS. Selama satu peserta jujur menghancurkan input mereka, keamanan sistem ZK-SNARK dijamin. Namun, pendekatan ini tetap mengharuskan mempercayai pihak-pihak yang terlibat untuk menghapus elemen acak yang mereka ambil dan tidak merusak jaminan keamanan sistem.

Terlepas dari asumsi kepercayaan, ZK-SNARK populer karena ukuran buktinya yang kecil dan verifikasi yang waktu eksekusinya konstan. Karena verifikasi bukti di L1 merupakan biaya terbesar dalam mengoperasikan ZK-rollup, L2 menggunakan ZK-SNARK untuk menghasilkan bukti yang dapat diverifikasi dengan cepat dan murah di Jaringan Utama.

**ZK-STARK**

Seperti ZK-SNARK, ZK-STARK membuktikan validitas perhitungan Di luar rantai tanpa mengungkapkan inputnya. Namun, ZK-STARK dianggap sebagai peningkatan dari ZK-SNARK karena skalabilitas dan transparansinya.

ZK-STARK bersifat 'transparan', karena dapat berfungsi tanpa trusted setup dari Common Reference String (CRS). Sebaliknya, ZK-STARK mengandalkan elemen acak yang dapat diverifikasi secara publik untuk mengatur parameter dalam menghasilkan dan memverifikasi bukti.

ZK-STARK juga memberikan skalabilitas lebih karena waktu yang dibutuhkan untuk membuktikan dan memverifikasi bukti validitas meningkat secara _kuasilinear_ seiring dengan kompleksitas komputasi yang mendasarinya. Dengan ZK-SNARK, waktu pembuktian dan verifikasi berskala secara _linear_ sehubungan dengan ukuran komputasi yang mendasarinya. Ini berarti ZK-STARK membutuhkan waktu lebih sedikit dibandingkan ZK-SNARK untuk membuktikan dan memverifikasi ketika dataset besar terlibat, sehingga berguna untuk aplikasi dengan volume tinggi.

ZK-STARK juga aman terhadap komputer kuantum, sementara Elliptic Curve Cryptography (ECC) yang digunakan dalam ZK-SNARK diyakini rentan terhadap serangan komputasi kuantum. Kelemahan ZK-STARK adalah menghasilkan ukuran bukti yang lebih besar, yang lebih mahal untuk diverifikasi di Ethereum.

#### Bagaimana bukti validitas bekerja dalam ZK-rollups? {#validity-proofs-in-zk-rollups}

##### Pembuatan bukti

Sebelum menerima transaksi, operator akan melakukan pemeriksaan seperti biasa. Ini termasuk memastikan bahwa:

- Akun pengirim dan penerima merupakan bagian dari pohon state.
- Pengirim memiliki dana yang cukup untuk memproses transaksi.
- Transaksi tersebut benar dan sesuai dengan kunci publik pengirim pada rollup.
- Nonce pengirim benar, dan lain-lain.

Setelah node ZK-rollup memiliki cukup transaksi, node tersebut menggabungkannya menjadi sebuah batch dan menyusun input untuk sirkuit pembuktian agar dikompilasi menjadi bukti ZK yang ringkas. Ini mencakup:

- Akar pohon Merkle yang mencakup semua transaksi dalam batch.
- Bukti Merkle untuk transaksi guna membuktikan inklusi dalam batch.
- Bukti Merkle untuk setiap pasangan pengirim-penerima dalam transaksi guna membuktikan bahwa akun-akun tersebut merupakan bagian dari pohon status rollup.
- Sekumpulan akar status antara, yang diperoleh dari pembaruan akar status setelah menerapkan pembaruan status untuk setiap transaksi (misalnya, mengurangi saldo akun pengirim dan menambah saldo akun penerima).

Sirkuit pembuktian menghitung bukti validitas dengan 'melakukan loop' pada setiap transaksi dan melakukan pemeriksaan yang sama seperti yang dilakukan operator sebelum memproses transaksi. Pertama, sirkuit memverifikasi bahwa akun pengirim merupakan bagian dari akar status yang ada menggunakan bukti Merkle yang diberikan. Kemudian, sirkuit mengurangi saldo pengirim, menambah nonce mereka, melakukan hashing pada data akun yang diperbarui, dan menggabungkannya dengan bukti Merkle untuk menghasilkan akar Merkle baru.

Akar Merkle ini mencerminkan satu-satunya perubahan dalam status ZK-rollup: perubahan pada saldo dan nonce pengirim. Hal ini dimungkinkan karena bukti Merkle yang digunakan untuk membuktikan keberadaan akun digunakan untuk menurunkan akar status baru.

Sirkuit pembuktian melakukan proses yang sama pada akun penerima. Sirkuit memeriksa apakah akun penerima ada di bawah akar status antara (menggunakan bukti Merkle), menambah saldo mereka, melakukan hashing ulang pada data akun, dan menggabungkannya dengan bukti Merkle untuk menghasilkan akar status baru.

Proses ini diulang untuk setiap transaksi; setiap 'loop' menghasilkan akar status baru dari pembaruan akun pengirim dan akar baru berikutnya dari pembaruan akun penerima. Seperti yang dijelaskan, setiap pembaruan pada akar status mewakili satu bagian dari pohon status rollup yang berubah.

Sirkuit pembuktian ZK melakukan iterasi pada seluruh batch transaksi, memverifikasi urutan pembaruan yang menghasilkan akar status akhir setelah transaksi terakhir dijalankan. Akar Merkle terakhir yang dihitung menjadi akar status kanonik terbaru dari ZK-rollup.

##### Verifikasi Bukti

Setelah sirkuit pembuktian memverifikasi kebenaran pembaruan status, operator L2 mengirimkan bukti validitas yang dihitung ke kontrak verifier di L1. Sirkuit verifikasi kontrak memverifikasi validitas bukti dan juga memeriksa input publik yang merupakan bagian dari bukti:

- **Root pra-state**: Root state lama dari ZK-rollup (yaitu, sebelum transaksi yang di-batch dieksekusi), yang mencerminkan state valid terakhir yang diketahui dari rantai L2.

- **Root pasca-state**: Root state baru dari ZK-rollup (yaitu, setelah eksekusi transaksi yang di-batch), yang mencerminkan state terbaru dari rantai L2. Akar status akhir adalah akar terakhir yang diperoleh setelah menerapkan pembaruan status dalam sirkuit pembuktian.

- **Root batch**: Root Merkle dari batch, yang diturunkan dengan _merklizing_ transaksi dalam batch dan melakukan hashing pada root pohonnya.

- **Input transaksi**: Data yang terkait dengan transaksi yang dijalankan sebagai bagian dari batch yang dikirimkan.

Jika bukti memenuhi sirkuit (yaitu, valid), ini berarti terdapat urutan transaksi yang sah yang mengubah rollup dari status sebelumnya (yang secara kriptografi ditandai oleh akar status awal) ke status baru (yang secara kriptografi ditandai oleh akar status akhir). Jika akar status awal cocok dengan akar yang tersimpan di kontrak rollup, dan bukti tersebut valid, kontrak rollup mengambil akar status akhir dari bukti tersebut dan memperbarui pohon statusnya untuk mencerminkan perubahan status rollup.

### Entri dan keluar {#entries-and-exits}

Pengguna memasuki ZK-rollup dengan menyetor token ke dalam kontrak rollup yang dijalankan di rantai L1. Transaksi ini masuk ke antrean karena hanya operator yang dapat mengirim transaksi ke kontrak rollup.

Jika antrean deposit yang menunggu mulai penuh, operator ZK-rollup akan mengambil transaksi deposit tersebut dan mengirimkannya ke kontrak rollup. Setelah dana pengguna berada di dalam rollup, mereka dapat mulai melakukan transaksi dengan mengirimkan transaksi ke operator untuk diproses. Pengguna dapat memverifikasi saldo di rollup dengan melakukan hash pada data akun mereka, mengirimkan hash tersebut ke kontrak rollup, dan menyediakan bukti Merkle untuk diverifikasi terhadap akar status saat ini.

Tarik dana dari ZK-rollup ke L1 itu sederhana. Pengguna memulai transaksi keluar dengan mengirim aset mereka di rollup ke akun tertentu untuk dibakar. Jika operator memasukkan transaksi tersebut ke dalam batch berikutnya, pengguna dapat mengajukan permintaan penarikan ke kontrak onchain. Permintaan penarikan ini akan mencakup hal-hal berikut:

- Bukti Merkle yang membuktikan bahwa transaksi pengguna ke akun pembakaran termasuk dalam sebuah batch transaksi

- Data Transaksi

- Akar Batch

- Alamat L1 untuk menerima dana yang disetor

Kontrak rollup melakukan hash pada data transaksi, memeriksa apakah batch root ada, dan menggunakan Merkle proof untuk memverifikasi apakah hash transaksi termasuk dalam batch root. Setelah itu, kontrak mengeksekusi transaksi keluar dan mengirimkan dana ke alamat yang dipilih pengguna di L1.

## ZK-rollup dan kompatibilitas EVM {#zk-rollups-and-evm-compatibility}

Berbeda dengan optimistic rollup, ZK-rollup tidak langsung kompatibel dengan [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/). Membuktikan komputasi EVM serba guna dalam sirkuit lebih sulit dan membutuhkan sumber daya lebih banyak dibandingkan membuktikan komputasi sederhana (seperti transfer token yang dijelaskan sebelumnya).

Namun, [kemajuan dalam teknologi zero-knowledge](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) memicu minat baru untuk membungkus komputasi EVM dalam bukti zero-knowledge. Upaya-upaya ini ditujukan untuk menciptakan implementasi Ethereum Virtual Machine berbasis zero-knowledge (zkEVM) yang dapat memverifikasi dengan efisien kebenaran eksekusi program. Sebuah zkEVM mereplikasi opcode EVM yang ada untuk keperluan pembuktian/verifikasi dalam sirkuit, sehingga memungkinkan eksekusi kontrak pintar.

Seperti EVM, sebuah zkEVM berpindah antar status setelah perhitungan dilakukan pada beberapa input. Perbedaannya adalah zkEVM juga membuat bukti zero-knowledge untuk memverifikasi kebenaran setiap langkah dalam eksekusi program. Bukti validitas dapat memverifikasi kebenaran operasi yang memengaruhi status VM (memori, stack, storage) serta perhitungannya sendiri (misalnya, apakah operasi memanggil opcode yang tepat dan mengeksekusinya dengan benar?).

Diperkenalkannya ZK-rollup yang kompatibel dengan EVM diharapkan membantu pengembang memanfaatkan skalabilitas dan jaminan keamanan dari bukti zero-knowledge. Yang lebih penting, kompatibilitas dengan infrastruktur Ethereum asli berarti pengembang dapat membangun dapp yang ramah ZK menggunakan alat dan bahasa yang sudah dikenal (dan terbukti keandalannya).

## Bagaimana cara kerja biaya ZK-rollup? {#how-do-zk-rollup-fees-work}

Seberapa banyak pengguna membayar untuk transaksi di ZK-rollup bergantung pada biaya gas, sama seperti di Ethereum Mainnet. Namun, biaya gas bekerja secara berbeda di L2 dan dipengaruhi oleh biaya-biaya berikut:

1. **Penulisan state**: Ada biaya tetap untuk menulis ke state Ethereum (yaitu, mengirimkan transaksi di blockchain Ethereum). ZK-rollups mengurangi biaya ini dengan mengelompokkan transaksi dan membagi biaya tetap tersebut di antara banyak pengguna.

2. **Publikasi data**: ZK-rollup memublikasikan data state untuk setiap transaksi ke Ethereum sebagai `calldata`. Biaya `calldata` saat ini diatur oleh [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), yang menetapkan biaya masing-masing 16 gas untuk byte non-nol dan 4 gas untuk byte nol dari `calldata`. Biaya yang dibayarkan untuk setiap transaksi dipengaruhi oleh seberapa banyak `calldata` yang perlu diposting secara onchain untuknya.

3. **Biaya operator L2**: Ini adalah jumlah yang dibayarkan kepada operator rollup sebagai kompensasi atas biaya komputasi yang dikeluarkan dalam memproses transaksi, sama seperti ["biaya prioritas (tip)" transaksi](/developers/docs/gas/#how-are-gas-fees-calculated) di Mainnet Ethereum.

4. **Pembuatan dan verifikasi bukti**: Operator ZK-rollup harus menghasilkan bukti validitas untuk batch transaksi, yang memerlukan banyak sumber daya. Memverifikasi bukti zero-knowledge di Mainnet juga membutuhkan gas (~500.000 gas).

Selain mengelompokkan transaksi, ZK-rollups mengurangi biaya bagi pengguna dengan cara mengompresi data transaksi. Anda dapat [melihat gambaran waktu nyata](https://l2fees.info/) tentang biaya penggunaan ZK-rollup Ethereum.

## Bagaimana ZK-rollups meningkatkan skalabilitas Ethereum? {#scaling-ethereum-with-zk-rollups}

### Kompresi data transaksi {#transaction-data-compression}

ZK-rollups meningkatkan kapasitas transaksi di layer dasar Ethereum dengan memindahkan sebagian perhitungan ke offchain, namun dorongan terbesar untuk skalabilitas datang dari kompresi data transaksi. [Ukuran blok](/developers/docs/blocks/#block-size) Ethereum membatasi data yang dapat ditampung oleh setiap blok dan, dengan demikian, jumlah transaksi yang diproses per blok. Dengan mengompresi data terkait transaksi, ZK-rollup secara signifikan meningkatkan jumlah transaksi yang dapat diproses per blok.

ZK-rollup dapat mengompresi data transaksi lebih efisien dibandingkan optimistic rollup karena mereka tidak perlu memposting semua data yang diperlukan untuk memvalidasi setiap transaksi. Mereka hanya perlu memposting data minimal yang diperlukan untuk membangun kembali status terbaru akun dan saldo di rollup.

### Bukti rekursif {#recursive-proofs}

Salah satu keunggulan bukti zero-knowledge adalah bahwa sebuah bukti dapat digunakan untuk memverifikasi bukti lainnya. Sebagai contoh, satu ZK-SNARK dapat memverifikasi ZK-SNARK lainnya. Bukti dari bukti” semacam ini disebut recursive proofs dan secara signifikan meningkatkan throughput pada ZK-rollup.

Saat ini, validity proofs dibuat per blok dan dikirim ke kontrak L1 untuk diverifikasi. Namun, memverifikasi proof per blok tunggal membatasi throughput yang bisa dicapai ZK-rollups, karena hanya satu blok yang dapat difinalisasi saat operator mengirimkan proof.

Namun, dengan recursive proofs, beberapa blok bisa difinalisasi sekaligus hanya dengan satu validity proof. Hal ini terjadi karena proving circuit secara rekursif menggabungkan beberapa proof blok hingga terbentuk satu final proof. Operator L2 mengirimkan recursive proof ini, dan jika kontrak menerimanya, semua blok terkait akan difinalisasi secara instan. Dengan recursive proofs, jumlah transaksi ZK-rollup yang dapat difinalisasi di Ethereum dalam setiap interval meningkat.

### Kelebihan dan kekurangan ZK-rollup {#zk-rollups-pros-and-cons}

| Kelebihan                                                                                                                                                                                                                                       | Kekurangan                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bukti validitas memastikan kebenaran perhitungan di luar rantai dan mencegah operator melakukan transisi status yang tidak sah.                                                                                                 | Biaya yang terkait dengan pembuatan dan verifikasi bukti validitas cukup besar dan dapat meningkatkan biaya bagi pengguna rollup.                                                                                 |
| Memberikan finalitas transaksi lebih cepat karena pembaruan status disetujui segera setelah bukti validitas diverifikasi di L1.                                                                                                 | Membangun ZK-rollup yang kompatibel dengan EVM sulit karena kompleksitas teknologi zero-knowledge.                                                                                                                |
| Mengandalkan mekanisme kriptografis tanpa kepercayaan untuk keamanan, bukan kejujuran para pelaku yang diberi insentif seperti pada [optimistic rollup](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Membuat bukti validitas memerlukan perangkat keras khusus, yang dapat mendorong pengendalian terpusat terhadap chain oleh beberapa pihak.                                                                         |
| Menyimpan data yang diperlukan untuk memulihkan status offchain di L1, yang menjamin keamanan, ketahanan terhadap sensor, dan desentralisasi.                                                                                   | Operator terpusat (sequencer) dapat memengaruhi urutan transaksi.                                                                                                                              |
| Pengguna mendapatkan manfaat dari efisiensi modal yang lebih tinggi dan dapat menarik dana dari L2 tanpa penundaan.                                                                                                             | Persyaratan perangkat keras yang tinggi dapat mengurangi jumlah peserta yang mampu memaksa jalannya kemajuan rantai, sehingga meningkatkan risiko operator jahat membekukan status rollup dan menyensor pengguna. |
| Tidak bergantung pada asumsi ketersediaan, dan pengguna tidak perlu memvalidasi rantai untuk melindungi dana mereka.                                                                                                            | Beberapa sistem pembuktian (misalnya, ZK-SNARK) membutuhkan trusted setup, yang jika ditangani secara salah, berpotensi mengompromikan model keamanan ZK-rollup.                               |
| Kompresi data yang lebih baik dapat membantu mengurangi biaya publikasi `calldata` di Ethereum dan meminimalkan biaya rollup bagi pengguna.                                                                                     |                                                                                                                                                                                                                                   |

### Penjelasan visual mengenai ZK-rollup {#zk-video}

Tonton Finematics yang menjelaskan rollup ZK:

<YouTube id="7pWxCklcNsU" start="406" />

## Siapa yang sedang mengerjakan zkEVM? {#zkevm-projects}

Proyek-proyek yang sedang mengerjakan zkEVM meliputi:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM adalah proyek yang didanai oleh Ethereum Foundation untuk mengembangkan ZK-rollup yang kompatibel dengan EVM dan mekanisme untuk menghasilkan bukti validitas untuk blok Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _adalah sebuah ZK Rollup terdesentralisasi di mainnet Ethereum yang bekerja pada Mesin Virtual Ethereum zero-knowledge (zkEVM) yang mengeksekusi transaksi Ethereum secara transparan, termasuk kontrak pintar dengan validasi bukti zero-knowledge._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll adalah perusahaan yang didorong oleh teknologi yang bekerja untuk membangun Solusi Layer 2 zkEVM asli untuk Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko adalah ZK-rollup terdesentralisasi yang setara dengan Ethereum (sebuah [ZK-EVM Tipe 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era adalah sebuah ZK Rollup yang kompatibel dengan EVM yang dibuat oleh Matter Labs, didukung oleh zkEVM miliknya sendiri._

- **[Starknet](https://starkware.co/starknet/)** - _StarkNet adalah solusi penskalaan layer 2 yang kompatibel dengan EVM yang dibuat oleh StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph adalah solusi penskalaan rollup hibrida yang menggunakan bukti-zk untuk mengatasi masalah tantangan state Layer 2._

- **[Linea](https://linea.build)** - _Linea adalah Layer 2 zkEVM yang setara dengan Ethereum yang dibuat oleh Consensys, sepenuhnya selaras dengan ekosistem Ethereum._

## Bacaan lebih lanjut tentang ZK-rollup {#further-reading-on-zk-rollups}

- [Apa Itu Zero-Knowledge Rollup?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Apa itu zero-knowledge rollup?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Panduan Praktis untuk Rollup Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARK vs SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Apa itu zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Tipe ZK-EVM: Setara Ethereum, setara EVM, Tipe 1, Tipe 4, dan kata-kata kunci samar lainnya](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Pengenalan zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Apa itu ZK-EVM L2?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Sumber daya Keren-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [Mengenal ZK-SNARK lebih dalam](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Bagaimana SNARK bisa terjadi?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
