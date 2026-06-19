---
title: Rollup zero-knowledge
description: "Pengantar tentang rollup zero-knowledge—sebuah solusi penskalaan yang digunakan oleh komunitas Ethereum."
lang: id
---

Rollup zero-knowledge (ZK-rollup) adalah [solusi penskalaan](/developers/docs/scaling/) lapisan 2 (l2) yang meningkatkan laju pemrosesan di Mainnet [Ethereum](/) dengan memindahkan komputasi dan penyimpanan state secara offchain. ZK-rollup dapat memproses ribuan transaksi dalam satu batch dan kemudian hanya memposting beberapa data ringkasan minimal ke Mainnet. Data ringkasan ini mendefinisikan perubahan yang harus dilakukan pada state Ethereum dan beberapa bukti kriptografi bahwa perubahan tersebut benar.

## Prasyarat {#prerequisites}

Anda harus sudah membaca dan memahami halaman kami tentang [penskalaan Ethereum](/developers/docs/scaling/) dan [lapisan 2](/layer-2).

## Apa itu rollup zero-knowledge? {#what-are-zk-rollups}

**Rollup zero-knowledge (ZK-rollup)** menggabungkan (atau 'menggulung') transaksi ke dalam batch yang dieksekusi secara offchain. Komputasi offchain mengurangi jumlah data yang harus diposting ke rantai blok. Operator ZK-rollup mengirimkan ringkasan perubahan yang diperlukan untuk mewakili semua transaksi dalam satu batch daripada mengirimkan setiap transaksi secara individual. Mereka juga menghasilkan [bukti validitas](/glossary/#validity-proof) untuk membuktikan kebenaran perubahan mereka.

State ZK-rollup dikelola oleh kontrak pintar yang diterapkan di jaringan Ethereum. Untuk memperbarui state ini, node ZK-rollup harus mengirimkan bukti validitas untuk verifikasi. Seperti yang disebutkan, bukti validitas adalah jaminan kriptografi bahwa perubahan state yang diusulkan oleh rollup benar-benar merupakan hasil dari eksekusi batch transaksi yang diberikan. Ini berarti bahwa ZK-rollup hanya perlu memberikan bukti validitas untuk memfinalisasi transaksi di Ethereum alih-alih memposting semua data transaksi secara onchain seperti [rollup optimistik](/developers/docs/scaling/optimistic-rollups/).

Tidak ada penundaan saat memindahkan dana dari ZK-rollup ke Ethereum karena transaksi keluar dieksekusi setelah kontrak ZK-rollup memverifikasi bukti validitas. Sebaliknya, penarikan dana dari rollup optimistik tunduk pada penundaan untuk memungkinkan siapa saja menantang transaksi keluar dengan [bukti penipuan](/glossary/#fraud-proof).

ZK-rollup menulis transaksi ke Ethereum sebagai `calldata`. `calldata` adalah tempat data yang disertakan dalam panggilan eksternal ke fungsi kontrak pintar disimpan. Informasi dalam `calldata` dipublikasikan di rantai blok, memungkinkan siapa saja untuk merekonstruksi state rollup secara independen. ZK-rollup menggunakan teknik kompresi untuk mengurangi data transaksi—misalnya, akun diwakili oleh indeks alih-alih alamat, yang menghemat 28 byte data. Publikasi data onchain adalah biaya yang signifikan untuk rollup, sehingga kompresi data dapat mengurangi biaya bagi pengguna.

## Bagaimana ZK-rollup berinteraksi dengan Ethereum? {#zk-rollups-and-ethereum}

Rantai ZK-rollup adalah protokol offchain yang beroperasi di atas rantai blok Ethereum dan dikelola oleh kontrak pintar Ethereum onchain. ZK-rollup mengeksekusi transaksi di luar Mainnet, tetapi secara berkala melakukan komitmen batch transaksi offchain ke kontrak rollup onchain. Catatan transaksi ini tidak dapat diubah, sama seperti rantai blok Ethereum, dan membentuk rantai ZK-rollup.

Arsitektur inti ZK-rollup terdiri dari komponen-komponen berikut:

1. **Kontrak onchain**: Seperti yang disebutkan, protokol ZK-rollup dikendalikan oleh kontrak pintar yang berjalan di Ethereum. Ini termasuk kontrak utama yang menyimpan blok rollup, melacak deposit, dan memantau pembaruan state. Kontrak onchain lainnya (kontrak pemverifikasi) memverifikasi bukti tanpa pengetahuan yang dikirimkan oleh produsen blok. Dengan demikian, Ethereum berfungsi sebagai lapisan dasar atau "lapisan 1" untuk ZK-rollup.

2. **Mesin virtual (VM) offchain**: Meskipun protokol ZK-rollup berada di Ethereum, eksekusi transaksi dan penyimpanan state terjadi pada mesin virtual terpisah yang independen dari [EVM](/developers/docs/evm/). VM offchain ini adalah lingkungan eksekusi untuk transaksi di ZK-rollup dan berfungsi sebagai lapisan sekunder atau "lapisan 2" untuk protokol ZK-rollup. Bukti validitas yang diverifikasi di Mainnet Ethereum menjamin kebenaran transisi state di VM offchain.

ZK-rollup adalah "solusi penskalaan hibrida"—protokol offchain yang beroperasi secara independen tetapi memperoleh keamanan dari Ethereum. Secara khusus, jaringan Ethereum menegakkan validitas pembaruan state pada ZK-rollup dan menjamin ketersediaan data di balik setiap pembaruan pada state rollup. Akibatnya, ZK-rollup jauh lebih aman daripada solusi penskalaan offchain murni, seperti [sidechain](/developers/docs/scaling/sidechains/), yang bertanggung jawab atas properti keamanannya sendiri, atau [validium](/developers/docs/scaling/validium/), yang juga memverifikasi transaksi di Ethereum dengan bukti validitas, tetapi menyimpan data transaksi di tempat lain.

ZK-rollup bergantung pada protokol utama Ethereum untuk hal-hal berikut:

### Ketersediaan data {#data-availability}

ZK-rollup mempublikasikan data state untuk setiap transaksi yang diproses secara offchain ke Ethereum. Dengan data ini, individu atau bisnis dapat mereproduksi state rollup dan memvalidasi rantai itu sendiri. Ethereum membuat data ini tersedia untuk semua peserta jaringan sebagai `calldata`.

ZK-rollup tidak perlu mempublikasikan banyak data transaksi secara onchain karena bukti validitas sudah memverifikasi keaslian transisi state. Meskipun demikian, menyimpan data secara onchain tetap penting karena memungkinkan verifikasi independen tanpa izin dari state rantai l2 yang pada gilirannya memungkinkan siapa saja untuk mengirimkan batch transaksi, mencegah operator jahat menyensor atau membekukan rantai.

Onchain diperlukan agar pengguna dapat berinteraksi dengan rollup. Tanpa akses ke data state, pengguna tidak dapat menanyakan saldo akun mereka atau memulai transaksi (misalnya, penarikan) yang bergantung pada informasi state.

### Finalitas transaksi {#transaction-finality}

Ethereum bertindak sebagai lapisan penyelesaian untuk ZK-rollup: transaksi l2 difinalisasi hanya jika kontrak l1 menerima bukti validitas. Ini menghilangkan risiko operator jahat merusak rantai (misalnya, mencuri dana rollup) karena setiap transaksi harus disetujui di Mainnet. Selain itu, Ethereum menjamin bahwa operasi pengguna tidak dapat dibatalkan setelah difinalisasi di l1.

### Ketahanan terhadap sensor {#censorship-resistance}

Sebagian besar ZK-rollup menggunakan "supernode" (operator) untuk mengeksekusi transaksi, menghasilkan batch, dan mengirimkan blok ke l1. Meskipun ini memastikan efisiensi, hal ini meningkatkan risiko penyensoran: operator ZK-rollup yang jahat dapat menyensor pengguna dengan menolak untuk memasukkan transaksi mereka ke dalam batch.

Sebagai langkah keamanan, ZK-rollup memungkinkan pengguna untuk mengirimkan transaksi secara langsung ke kontrak rollup di Mainnet jika mereka merasa disensor oleh operator. Ini memungkinkan pengguna untuk memaksa keluar dari ZK-rollup ke Ethereum tanpa harus bergantung pada izin operator.

## Bagaimana cara kerja ZK-rollup? {#how-do-zk-rollups-work}

### Transaksi {#transactions}

Pengguna di ZK-rollup menandatangani transaksi dan mengirimkannya ke operator l2 untuk diproses dan dimasukkan ke dalam batch berikutnya. Dalam beberapa kasus, operator adalah entitas terpusat, yang disebut sekuenser, yang mengeksekusi transaksi, menggabungkannya ke dalam batch, dan mengirimkannya ke l1. Sekuenser dalam sistem ini adalah satu-satunya entitas yang diizinkan untuk menghasilkan blok l2 dan menambahkan transaksi rollup ke kontrak ZK-rollup.

ZK-rollup lainnya mungkin merotasi peran operator dengan menggunakan set validator [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/). Calon operator mendepositkan dana di kontrak rollup, dengan ukuran setiap stake memengaruhi peluang staker untuk dipilih guna menghasilkan batch rollup berikutnya. Stake operator dapat mengalami pemotongan jika mereka bertindak jahat, yang memberi insentif kepada mereka untuk memposting blok yang valid.

#### Bagaimana ZK-rollup mempublikasikan data transaksi di Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Seperti yang dijelaskan, data transaksi dipublikasikan di Ethereum sebagai `calldata`. `calldata` adalah area data dalam kontrak pintar yang digunakan untuk meneruskan argumen ke suatu fungsi dan berperilaku mirip dengan [memori](/developers/docs/smart-contracts/anatomy/#memory). Meskipun `calldata` tidak disimpan sebagai bagian dari state Ethereum, ia tetap ada secara onchain sebagai bagian dari [log riwayat](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) rantai Ethereum. `calldata` tidak memengaruhi state Ethereum, menjadikannya cara yang murah untuk menyimpan data secara onchain.

Kata kunci `calldata` sering kali mengidentifikasi metode kontrak pintar yang dipanggil oleh suatu transaksi dan menyimpan input ke metode tersebut dalam bentuk urutan byte arbitrer. ZK-rollup menggunakan `calldata` untuk mempublikasikan data transaksi terkompresi secara onchain; operator rollup cukup menambahkan batch baru dengan memanggil fungsi yang diperlukan dalam kontrak rollup dan meneruskan data terkompresi sebagai argumen fungsi. Ini membantu mengurangi biaya bagi pengguna karena sebagian besar biaya rollup digunakan untuk menyimpan data transaksi secara onchain.

### Komitmen state {#state-commitments}

State ZK-rollup, yang mencakup akun dan saldo l2, direpresentasikan sebagai [pohon Merkle](/whitepaper/#merkle-trees). Hash kriptografi dari akar pohon Merkle (akar Merkle) disimpan dalam kontrak onchain, memungkinkan protokol rollup untuk melacak perubahan dalam state ZK-rollup.

Rollup bertransisi ke state baru setelah eksekusi serangkaian transaksi baru. Operator yang memulai transisi state diwajibkan untuk menghitung akar state baru dan mengirimkannya ke kontrak onchain. Jika bukti validitas yang terkait dengan batch diautentikasi oleh kontrak pemverifikasi, akar Merkle yang baru menjadi akar state kanonis ZK-rollup.

Selain menghitung akar state, operator ZK-rollup juga membuat akar batch—akar pohon Merkle yang terdiri dari semua transaksi dalam satu batch. Saat batch baru dikirimkan, kontrak rollup menyimpan akar batch, memungkinkan pengguna untuk membuktikan bahwa suatu transaksi (misalnya, permintaan penarikan) disertakan dalam batch tersebut. Pengguna harus memberikan detail transaksi, akar batch, dan [bukti Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) yang menunjukkan jalur penyertaan.

### Bukti validitas {#validity-proofs}

Akar state baru yang dikirimkan operator ZK-rollup ke kontrak l1 adalah hasil dari pembaruan pada state rollup. Katakanlah Alice mengirim 10 token ke Bob, operator cukup mengurangi saldo Alice sebesar 10 dan menambah saldo Bob sebesar 10. Operator kemudian melakukan proses hash pada data akun yang diperbarui, membangun kembali pohon Merkle rollup, dan mengirimkan akar Merkle baru ke kontrak onchain.

Namun kontrak rollup tidak akan secara otomatis menerima komitmen state yang diusulkan sampai operator membuktikan bahwa akar Merkle yang baru dihasilkan dari pembaruan yang benar pada state rollup. Operator ZK-rollup melakukan ini dengan menghasilkan bukti validitas, komitmen kriptografi ringkas yang memverifikasi kebenaran transaksi yang diproses secara batch.

Bukti validitas memungkinkan pihak-pihak untuk membuktikan kebenaran suatu pernyataan tanpa mengungkapkan pernyataan itu sendiri—oleh karena itu, bukti ini juga disebut bukti tanpa pengetahuan. ZK-rollup menggunakan bukti validitas untuk mengonfirmasi kebenaran transisi state offchain tanpa harus mengeksekusi ulang transaksi di Ethereum. Bukti ini dapat berupa [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) atau [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

Baik SNARK maupun STARK membantu membuktikan integritas komputasi offchain di ZK-rollup, meskipun setiap jenis bukti memiliki fitur yang berbeda.

**ZK-SNARK**

Agar protokol ZK-SNARK berfungsi, pembuatan Common Reference String (CRS) diperlukan: CRS menyediakan parameter publik untuk membuktikan dan memverifikasi bukti validitas. Keamanan sistem pembuktian bergantung pada pengaturan CRS; jika informasi yang digunakan untuk membuat parameter publik jatuh ke tangan aktor jahat, mereka mungkin dapat menghasilkan bukti validitas palsu.

Beberapa ZK-rollup mencoba memecahkan masalah ini dengan menggunakan [upacara komputasi multi-pihak (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), yang melibatkan individu tepercaya, untuk menghasilkan parameter publik bagi sirkuit ZK-SNARK. Setiap pihak menyumbangkan beberapa keacakan (disebut "limbah beracun") untuk membangun CRS, yang harus segera mereka hancurkan.

Pengaturan tepercaya digunakan karena meningkatkan keamanan pengaturan CRS. Selama satu peserta yang jujur menghancurkan input mereka, keamanan sistem ZK-SNARK terjamin. Namun, pendekatan ini mengharuskan kita memercayai mereka yang terlibat untuk menghapus keacakan yang mereka ambil sampelnya dan tidak merusak jaminan keamanan sistem.

Terlepas dari asumsi kepercayaan, ZK-SNARK populer karena ukuran buktinya yang kecil dan verifikasi waktu konstan. Karena verifikasi bukti di l1 merupakan biaya yang lebih besar dalam mengoperasikan ZK-rollup, l2 menggunakan ZK-SNARK untuk menghasilkan bukti yang dapat diverifikasi dengan cepat dan murah di Mainnet.

**ZK-STARK**

Seperti ZK-SNARK, ZK-STARK membuktikan validitas komputasi offchain tanpa mengungkapkan inputnya. Namun, ZK-STARK dianggap sebagai peningkatan dari ZK-SNARK karena skalabilitas dan transparansinya.

ZK-STARK bersifat 'transparan', karena dapat bekerja tanpa pengaturan tepercaya dari Common Reference String (CRS). Sebaliknya, ZK-STARK bergantung pada keacakan yang dapat diverifikasi secara publik untuk mengatur parameter guna menghasilkan dan memverifikasi bukti.

ZK-STARK juga memberikan skalabilitas yang lebih besar karena waktu yang dibutuhkan untuk membuktikan dan memverifikasi bukti validitas meningkat secara _kuasilinear_ sehubungan dengan kompleksitas komputasi yang mendasarinya. Dengan ZK-SNARK, waktu pembuktian dan verifikasi berskala secara _linear_ sehubungan dengan ukuran komputasi yang mendasarinya. Ini berarti ZK-STARK membutuhkan lebih sedikit waktu daripada ZK-SNARK untuk membuktikan dan memverifikasi ketika kumpulan data besar terlibat, menjadikannya berguna untuk aplikasi bervolume tinggi.

ZK-STARK juga aman terhadap komputer kuantum, sementara Kriptografi Kurva Eliptik (ECC) yang digunakan dalam ZK-SNARK secara luas diyakini rentan terhadap serangan komputasi kuantum. Kelemahan ZK-STARK adalah mereka menghasilkan ukuran bukti yang lebih besar, yang lebih mahal untuk diverifikasi di Ethereum.

#### Bagaimana cara kerja bukti validitas di ZK-rollup? {#validity-proofs-in-zk-rollups}

##### Pembuatan bukti {#}

Sebelum menerima transaksi, operator akan melakukan pemeriksaan biasa. Ini termasuk mengonfirmasi bahwa:

- Akun pengirim dan penerima adalah bagian dari pohon state.
- Pengirim memiliki dana yang cukup untuk memproses transaksi.
- Transaksi sudah benar dan cocok dengan kunci publik pengirim di rollup.
- Nonce pengirim sudah benar, dll.

Setelah node ZK-rollup memiliki cukup transaksi, node tersebut menggabungkannya ke dalam sebuah batch dan mengompilasi input untuk sirkuit pembuktian agar dikompilasi menjadi bukti ZK yang ringkas. Ini termasuk:

- Akar pohon Merkle yang terdiri dari semua transaksi dalam batch.
- Bukti Merkle untuk transaksi guna membuktikan penyertaan dalam batch.
- Bukti Merkle untuk setiap pasangan pengirim-penerima dalam transaksi guna membuktikan bahwa akun tersebut adalah bagian dari pohon state rollup.
- Serangkaian akar state perantara, yang diturunkan dari pembaruan akar state setelah menerapkan pembaruan state untuk setiap transaksi (yaitu, mengurangi akun pengirim dan menambah akun penerima).

Sirkuit pembuktian menghitung bukti validitas dengan melakukan "looping" pada setiap transaksi dan melakukan pemeriksaan yang sama seperti yang diselesaikan operator sebelum memproses transaksi. Pertama, ia memverifikasi bahwa akun pengirim adalah bagian dari akar state yang ada menggunakan bukti Merkle yang disediakan. Kemudian ia mengurangi saldo pengirim, meningkatkan nonce mereka, melakukan proses hash pada data akun yang diperbarui, dan menggabungkannya dengan bukti Merkle untuk menghasilkan akar Merkle baru.

Akar Merkle ini mencerminkan satu-satunya perubahan dalam state ZK-rollup: perubahan pada saldo dan nonce pengirim. Ini dimungkinkan karena bukti Merkle yang digunakan untuk membuktikan keberadaan akun digunakan untuk menurunkan akar state baru.

Sirkuit pembuktian melakukan proses yang sama pada akun penerima. Ia memeriksa apakah akun penerima ada di bawah akar state perantara (menggunakan bukti Merkle), meningkatkan saldo mereka, melakukan proses hash ulang pada data akun, dan menggabungkannya dengan bukti Merkle untuk menghasilkan akar state baru.

Proses ini berulang untuk setiap transaksi; setiap "loop" membuat akar state baru dari pembaruan akun pengirim dan akar baru berikutnya dari pembaruan akun penerima. Seperti yang dijelaskan, setiap pembaruan pada akar state mewakili satu bagian dari perubahan pohon state rollup.

Sirkuit pembuktian ZK melakukan iterasi pada seluruh batch transaksi, memverifikasi urutan pembaruan yang menghasilkan akar state akhir setelah transaksi terakhir dieksekusi. Akar Merkle terakhir yang dihitung menjadi akar state kanonis terbaru dari ZK-rollup.

##### Verifikasi bukti {#}

Setelah sirkuit pembuktian memverifikasi kebenaran pembaruan state, operator l2 mengirimkan bukti validitas yang dihitung ke kontrak pemverifikasi di l1. Sirkuit verifikasi kontrak memverifikasi validitas bukti dan juga memeriksa input publik yang menjadi bagian dari bukti:

- **Akar pra-state**: Akar state lama ZK-rollup (yaitu, sebelum transaksi yang diproses secara batch dieksekusi), yang mencerminkan state valid terakhir yang diketahui dari rantai l2.

- **Akar pasca-state**: Akar state baru ZK-rollup (yaitu, setelah eksekusi transaksi yang diproses secara batch), yang mencerminkan state terbaru rantai l2. Akar pasca-state adalah akar akhir yang diturunkan setelah menerapkan pembaruan state di sirkuit pembuktian.

- **Akar batch**: Akar Merkle dari batch, yang diturunkan dengan _memerklisasi_ transaksi dalam batch dan melakukan proses hash pada akar pohon.

- **Input transaksi**: Data yang terkait dengan transaksi yang dieksekusi sebagai bagian dari batch yang dikirimkan.

Jika bukti memenuhi sirkuit (yaitu, valid), itu berarti ada urutan transaksi valid yang mentransisikan rollup dari state sebelumnya (disidikjari secara kriptografi oleh akar pra-state) ke state baru (disidikjari secara kriptografi oleh akar pasca-state). Jika akar pra-state cocok dengan akar yang disimpan dalam kontrak rollup, dan buktinya valid, kontrak rollup mengambil akar pasca-state dari bukti dan memperbarui pohon statenya untuk mencerminkan state rollup yang berubah.

### Masuk dan keluar {#entries-and-exits}

Pengguna memasuki ZK-rollup dengan mendepositkan token di kontrak rollup yang diterapkan pada rantai l1. Transaksi ini diantrekan karena hanya operator yang dapat mengirimkan transaksi ke kontrak rollup.

Jika antrean deposit yang tertunda mulai terisi, operator ZK-rollup akan mengambil transaksi deposit dan mengirimkannya ke kontrak rollup. Setelah dana pengguna berada di rollup, mereka dapat mulai bertransaksi dengan mengirimkan transaksi ke operator untuk diproses. Pengguna dapat memverifikasi saldo di rollup dengan melakukan proses hash pada data akun mereka, mengirimkan hash ke kontrak rollup, dan memberikan bukti Merkle untuk memverifikasi terhadap akar state saat ini.

Melakukan penarikan dari ZK-rollup ke l1 sangatlah mudah. Pengguna memulai transaksi keluar dengan mengirimkan aset mereka di rollup ke akun yang ditentukan untuk dibakar. Jika operator menyertakan transaksi dalam batch berikutnya, pengguna dapat mengirimkan permintaan penarikan ke kontrak onchain. Permintaan penarikan ini akan mencakup hal-hal berikut:

- Bukti Merkle yang membuktikan penyertaan transaksi pengguna ke akun bakar dalam suatu batch transaksi

- Data transaksi

- Akar batch

- Alamat l1 untuk menerima dana yang didepositkan

Kontrak rollup melakukan proses hash pada data transaksi, memeriksa apakah akar batch ada, dan menggunakan bukti Merkle untuk memeriksa apakah hash transaksi adalah bagian dari akar batch. Setelah itu, kontrak mengeksekusi transaksi keluar dan mengirimkan dana ke alamat pilihan pengguna di l1.

## ZK-rollup dan kompatibilitas EVM {#zk-rollups-and-evm-compatibility}

Tidak seperti rollup optimistik, ZK-rollup tidak serta-merta kompatibel dengan [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/). Membuktikan komputasi EVM tujuan umum dalam sirkuit lebih sulit dan memakan banyak sumber daya daripada membuktikan komputasi sederhana (seperti transfer token yang dijelaskan sebelumnya).

Namun, [kemajuan dalam teknologi zero-knowledge](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) memicu minat baru dalam membungkus komputasi EVM dalam bukti tanpa pengetahuan. Upaya ini diarahkan untuk menciptakan implementasi EVM zero-knowledge (zkEVM) yang dapat secara efisien memverifikasi kebenaran eksekusi program. Sebuah zkEVM membuat ulang opcode EVM yang ada untuk pembuktian/verifikasi dalam sirkuit, memungkinkan untuk mengeksekusi kontrak pintar.

Seperti EVM, zkEVM bertransisi antar state setelah komputasi dilakukan pada beberapa input. Perbedaannya adalah zkEVM juga membuat bukti tanpa pengetahuan untuk memverifikasi kebenaran setiap langkah dalam eksekusi program. Bukti validitas dapat memverifikasi kebenaran operasi yang menyentuh state VM (memori, tumpukan, penyimpanan) dan komputasi itu sendiri (yaitu, apakah operasi memanggil opcode yang tepat dan mengeksekusinya dengan benar?).

Pengenalan ZK-rollup yang kompatibel dengan EVM diharapkan dapat membantu pengembang memanfaatkan skalabilitas dan jaminan keamanan dari bukti tanpa pengetahuan. Lebih penting lagi, kompatibilitas dengan infrastruktur asli Ethereum berarti pengembang dapat membangun aplikasi terdesentralisasi (dapp) yang ramah ZK menggunakan perkakas dan bahasa yang familier (dan telah teruji).

## Bagaimana cara kerja biaya ZK-rollup? {#how-do-zk-rollup-fees-work}

Berapa banyak yang dibayar pengguna untuk transaksi di ZK-rollup bergantung pada biaya gas, sama seperti di Mainnet Ethereum. Namun, biaya gas bekerja secara berbeda di l2 dan dipengaruhi oleh biaya-biaya berikut:

1. **Penulisan state**: Ada biaya tetap untuk menulis ke state Ethereum (yaitu, mengirimkan transaksi di rantai blok Ethereum). ZK-rollup mengurangi biaya ini dengan melakukan pemrosesan batch transaksi dan menyebarkan biaya tetap ke beberapa pengguna.

2. **Publikasi data**: ZK-rollup mempublikasikan data state untuk setiap transaksi ke Ethereum sebagai `calldata`. Biaya `calldata` saat ini diatur oleh [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), yang menetapkan biaya masing-masing sebesar 16 gas untuk byte bukan nol dan 4 gas untuk byte nol dari `calldata`. Biaya yang dibayarkan pada setiap transaksi dipengaruhi oleh seberapa banyak `calldata` yang perlu diposting secara onchain untuk transaksi tersebut.

3. **Biaya operator l2**: Ini adalah jumlah yang dibayarkan kepada operator rollup sebagai kompensasi atas biaya komputasi yang timbul dalam memproses transaksi, mirip seperti ["biaya prioritas (tip)" transaksi](/developers/docs/gas/#how-are-gas-fees-calculated) di Mainnet Ethereum.

4. **Pembuatan dan verifikasi bukti**: Operator ZK-rollup harus menghasilkan bukti validitas untuk batch transaksi, yang memakan banyak sumber daya. Memverifikasi bukti tanpa pengetahuan di Mainnet juga membutuhkan gas (~ 500.000 gas).

Selain melakukan pemrosesan batch transaksi, ZK-rollup mengurangi biaya bagi pengguna dengan mengompresi data transaksi. Anda dapat [melihat gambaran umum waktu nyata](https://l2fees.info/) tentang berapa biaya untuk menggunakan ZK-rollup Ethereum.

## Bagaimana ZK-rollup menskalakan Ethereum? {#scaling-ethereum-with-zk-rollups}

### Kompresi data transaksi {#transaction-data-compression}

ZK-rollup memperluas laju pemrosesan pada lapisan dasar Ethereum dengan melakukan komputasi secara offchain, tetapi dorongan nyata untuk penskalaan berasal dari kompresi data transaksi. [Ukuran blok](/developers/docs/blocks/#block-size) Ethereum membatasi data yang dapat ditampung setiap blok dan, lebih jauh lagi, jumlah transaksi yang diproses per blok. Dengan mengompresi data terkait transaksi, ZK-rollup secara signifikan meningkatkan jumlah transaksi yang diproses per blok.

ZK-rollup dapat mengompresi data transaksi lebih baik daripada rollup optimistik karena mereka tidak perlu memposting semua data yang diperlukan untuk memvalidasi setiap transaksi. Mereka hanya perlu memposting data minimal yang diperlukan untuk membangun kembali state terbaru dari akun dan saldo di rollup.

### Bukti rekursif {#recursive-proofs}

Keuntungan dari bukti tanpa pengetahuan adalah bahwa bukti dapat memverifikasi bukti lainnya. Misalnya, satu ZK-SNARK dapat memverifikasi ZK-SNARK lainnya. "Bukti dari bukti" semacam itu disebut bukti rekursif dan secara dramatis meningkatkan laju pemrosesan pada ZK-rollup.

Saat ini, bukti validitas dihasilkan berdasarkan blok demi blok dan dikirimkan ke kontrak l1 untuk verifikasi. Namun, memverifikasi bukti blok tunggal membatasi laju pemrosesan yang dapat dicapai ZK-rollup karena hanya satu blok yang dapat difinalisasi saat operator mengirimkan bukti.

Namun, bukti rekursif memungkinkan untuk memfinalisasi beberapa blok dengan satu bukti validitas. Ini karena sirkuit pembuktian secara rekursif menggabungkan beberapa bukti blok hingga satu bukti akhir dibuat. Operator l2 mengirimkan bukti rekursif ini, dan jika kontrak menerimanya, semua blok yang relevan akan difinalisasi secara instan. Dengan bukti rekursif, jumlah transaksi ZK-rollup yang dapat difinalisasi di Ethereum pada interval tertentu akan meningkat.

### Kelebihan dan kekurangan ZK-rollup {#zk-rollups-pros-and-cons}

| Kelebihan                                                                                                                                                                                                   | Kekurangan                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bukti validitas memastikan kebenaran transaksi offchain dan mencegah operator mengeksekusi transisi state yang tidak valid.                                                                           | Biaya yang terkait dengan penghitungan dan verifikasi bukti validitas cukup besar dan dapat meningkatkan biaya bagi pengguna rollup.                                                                            |
| Menawarkan finalitas transaksi yang lebih cepat karena pembaruan state disetujui setelah bukti validitas diverifikasi di l1.                                                                                              | Membangun ZK-rollup yang kompatibel dengan EVM sulit dilakukan karena kompleksitas teknologi zero-knowledge.                                                                                                    |
| Bergantung pada mekanisme kriptografi tanpa kepercayaan untuk keamanan, bukan kejujuran aktor yang diberi insentif seperti pada [rollup optimistik](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Menghasilkan bukti validitas memerlukan perangkat keras khusus, yang dapat mendorong kontrol terpusat atas rantai oleh beberapa pihak.                                                                    |
| Menyimpan data yang diperlukan untuk memulihkan state offchain di l1, yang menjamin keamanan, ketahanan terhadap sensor, dan desentralisasi.                                                                       | Operator terpusat (sekuenser) dapat memengaruhi pengurutan transaksi.                                                                                                                     |
| Pengguna mendapat manfaat dari efisiensi modal yang lebih besar dan dapat melakukan penarikan dana dari l2 tanpa penundaan.                                                                                                           | Persyaratan perangkat keras dapat mengurangi jumlah peserta yang dapat memaksa rantai untuk membuat kemajuan, meningkatkan risiko operator jahat membekukan state rollup dan menyensor pengguna. |
| Tidak bergantung pada asumsi keaktifan dan pengguna tidak perlu memvalidasi rantai untuk melindungi dana mereka.                                                                                              | Beberapa sistem pembuktian (misalnya, ZK-SNARK) memerlukan pengaturan tepercaya yang, jika salah ditangani, berpotensi membahayakan model keamanan ZK-rollup.                                                     |
| Kompresi data yang lebih baik dapat membantu mengurangi biaya publikasi `calldata` di Ethereum dan meminimalkan biaya rollup bagi pengguna.                                                                             |                                                                                                                                                                                                    |

### Penjelasan visual tentang ZK-rollup {#zk-video}

Tonton Finematics menjelaskan ZK-rollup:

## Siapa yang mengerjakan zkEVM? {#zkevm-projects}

<HTML-PLACEHOLDER-COMPONENT-000001>

<HTML-PLACEHOLDER-COMPONENT-000003>
<HTML-PLACEHOLDER-COMPONENT-000004>zkEVM untuk l2 vs l1</HTML-PLACEHOLDER-COMPONENT-000004>
<HTML-PLACEHOLDER-COMPONENT-000005>
Proyek-proyek di bawah ini menggunakan teknologi zkEVM untuk membangun rollup Lapisan 2. Ada juga penelitian tentang penggunaan zkEVM untuk [verifikasi blok l1](/roadmap/zkevm/), yang akan memungkinkan validator untuk memverifikasi blok Ethereum tanpa mengeksekusi ulang transaksi.
</HTML-PLACEHOLDER-COMPONENT-000005>
</HTML-PLACEHOLDER-COMPONENT-000003>
</HTML-PLACEHOLDER-COMPONENT-000001>

Proyek yang mengerjakan zkEVM meliputi:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM adalah proyek yang didanai oleh Yayasan Ethereum untuk mengembangkan ZK-rollup yang kompatibel dengan EVM dan mekanisme untuk menghasilkan bukti validitas untuk blok Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _adalah ZK Rollup terdesentralisasi di mainnet Ethereum yang bekerja pada Mesin Virtual Ethereum zero-knowledge (zkEVM) yang mengeksekusi transaksi Ethereum secara transparan, termasuk kontrak pintar dengan validasi bukti tanpa pengetahuan._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll adalah perusahaan berbasis teknologi yang berupaya membangun Solusi Lapisan 2 zkEVM asli untuk Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko adalah ZK-rollup terdesentralisasi yang setara dengan Ethereum ([ZK-EVM Tipe 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era adalah ZK Rollup yang kompatibel dengan EVM yang dibangun oleh Matter Labs, didukung oleh zkEVM-nya sendiri._

- **[Starknet](https://starkware.co/starknet/)** - _Starknet adalah solusi penskalaan lapisan 2 yang kompatibel dengan EVM yang dibangun oleh StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph adalah solusi penskalaan rollup hibrida yang memanfaatkan bukti ZK untuk mengatasi masalah tantangan state Lapisan 2._

- **[Linea](https://linea.build)** - _Linea adalah Lapisan 2 zkEVM yang setara dengan Ethereum yang dibangun oleh ConsenSys, sepenuhnya selaras dengan ekosistem Ethereum._

## Bacaan lebih lanjut tentang ZK-rollup {#further-reading-on-zk-rollups}

- [Apa Itu Rollup Zero-Knowledge?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Apa itu rollup zero-knowledge?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Panduan Praktis untuk Rollup Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARK vs SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Apa itu zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Jenis ZK-EVM: Setara Ethereum, setara EVM, Tipe 1, Tipe 4, dan kata kunci kriptik lainnya](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Pengantar zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Apa itu l2 ZK-EVM?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Sumber daya Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [Cara kerja ZK-SNARK secara teknis](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Bagaimana SNARK dimungkinkan?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Tutorial: Privasi & zero-knowledge di Ethereum {#tutorials}

- [Menggunakan zero-knowledge untuk state rahasia](/developers/tutorials/secret-state/) _– Cara menggunakan bukti ZK dan komponen server offchain untuk mempertahankan state permainan rahasia secara onchain._
- [Menggunakan Alamat Siluman](/developers/tutorials/stealth-addr/) _– Bagaimana alamat siluman ERC-5564 memungkinkan transfer ETH anonim menggunakan derivasi kunci kriptografi._
- [Menggunakan Ethereum untuk autentikasi Web2](/developers/tutorials/ethereum-for-web2-auth/) _– Cara mengintegrasikan tanda tangan dompet Ethereum dengan sistem autentikasi Web2 berbasis SAML._