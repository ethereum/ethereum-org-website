---
title: Indonesia
description: Sebuah pengantar untuk nilai yang dapat dieskstrak penambang (MEV)
lang: id
---

Maximal extractable value (MEV) mengacu pada nilai maksimum yang dapat diekstraksi dari produksi blok yang melebihi imbalan blok standar dan biaya gas dengan menyertakan, mengecualikan, dan mengubah urutan transaksi di blok.

## Nilai ekstraksi maksimum {#maximal-extractable-value}

Nilai ekstraksi maksimum pertama kali diterapkan dalam konteks [proof-of-work](/developers/docs/consensus-mechanisms/pow/), dan awalnya disebut sebagai "nilai ekstraksi penambang". Ini karena dalam bukti kerja, para penambang mengontrol pemasukan, pengecualian, dan pengurutan transaksi. Namun, sejak transisi ke bukti-pasak melalui [The Merge](/roadmap/merge), validator telah bertanggung jawab atas peran-peran ini, dan penambangan tidak lagi menjadi bagian dari protokol Ethereum. Metode ekstraksi nilai masih ada, meskipun demikian, sehingga istilah "Nilai maksimum yang dapat diekstrak" sekarang digunakan sebagai gantinya.

## Persyaratan {#prerequisites}

Pastikan Anda terbiasa dengan [transaksi](/developers/docs/transactions/), [blok](/developers/docs/blocks/), [bukti-pasak](/developers/docs/consensus-mechanisms/pos) dan [gas](/developers/docs/gas/). Keakraban dengan [dapps](/apps/) dan [DeFi](/defi/) juga akan membantu.

## Ekstraksi MEV {#mev-extraction}

Secara teori, MEV sepenuhnya menjadi tanggung jawab validator karena mereka adalah satu-satunya pihak yang dapat menjamin eksekusi peluang MEV yang menguntungkan. Namun, dalam prakteknya, sebagian besar MEV diekstrak oleh para peserta jaringan independen yang disebut sebagai "para pencari." Para pencari menjalankan algoritma kompleks di data blockchain untuk mendeteksi peluang MEV yang menguntungkan dan memiliki bot untuk secara otomatis mengirimkan transaksi yang menguntungkan tersebut ke jaringan.

Validator tetap mendapatkan sebagian dari jumlah MEV penuh karena para pencari bersedia membayar biaya gas yang tinggi (yang diberikan kepada validator) sebagai imbalan atas kemungkinan yang lebih tinggi untuk memasukkan transaksi mereka yang menguntungkan ke dalam blok. Dengan mengganggap para pencari secara ekonomis rasional, biaya gas yang rela dibayarkan oleh seorang pencari akan berjumlah hingga 100% dari MEV para pencari (karena jika biaya gas lebih tinggi, pencari tersebut akan kehilangan uang).

Dengan itu, untuk beberapa peluang MEV yang sangat kompetitif, seperti [arbitrase DEX](#mev-examples-dex-arbitrage), para pencari mungkin harus membayar 90% atau bahkan lebih dari total pendapatan MEV mereka dalam biaya gas kepada validator karena begitu banyak orang ingin menjalankan perdagangan arbitrase yang menguntungkan yang sama. Ini karena satu-satunya cara untuk memastikan bahwa transaksi arbitrase mereka berjalan adalah jika mereka mengirimkan transaksi dengan harga gas tertinggi.

### Gas golfing {#mev-extraction-gas-golfing}

Dinamika ini telah membuat keahlian "bermain golf gas" — memrogram transaksi sehingga mereka menggunakan jumlah gas terkecil — menjadi sebuah keunggulan kompetitif, karena memungkinkan para pencari menetapkan harga gas yang lebih tinggi sementara menjaga harga total gas mereka konstan (karena biaya gas = harga gas \* gas terpakai).

Beberapa teknik gas golf yang terkenal meliputi: menggunakan alamat yang diawali dengan untaian nol yang panjang (mis., [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)) karena memerlukan lebih sedikit ruang (dan karenanya gas) untuk disimpan; dan meninggalkan saldo token [ERC-20](/developers/docs/standards/tokens/erc-20/) kecil dalam kontrak, karena biaya gas untuk menginisialisasi slot penyimpanan (jika saldo 0) lebih mahal daripada untuk memperbarui slot penyimpanan. Menemukan lebih banyak teknik untuk mengurangi pemakaian gas adalah area penelitian aktif di antara para pencari.

### Frontrunner umum {#mev-extraction-generalized-frontrunners}

Alih-alih memrogram algoritma yang kompleks untuk mendeteksi peluang MEV yang menguntungkan, beberapa pencari menjalankan frontrunner yang digeneralisasi. Frontrunner yang digeneralisasi adalah bot yang mengawasi mempool untuk mendeteksi transaksi yang menguntungkan. Frontrunner akan menyalin kode transaksi yang berpotensi menguntungkan, menggantikan alamat dengan alamat frontrunner, dan menjalankan transaksi secara lokal untuk memeriksa ulang bahwa transaksi yang dimodifikasi menghasilkan keuntungan di alamat frontrunner. Jika transaksi memang menguntungkan, frontrunner akan mengirimkan transaksi yang dimodifikasi dengan alamat yang digantikan dan harga gas yang lebih tinggi, "yang melakukan frontrunning" transaksi asli dan mendapatkan MEV pencari asli.

### Flashbots {#mev-extraction-flashbots}

Flashbots adalah proyek independen yang memperluas klien eksekusi dengan layanan yang memungkinkan pencari untuk mengirimkan transaksi MEV ke validator tanpa mengungkapkannya ke mempool publik. Ini mencegah transaksi di-frontrun oleh frontrunner yang digeneralisasi.

## Contoh MEV {#mev-examples}

MEV muncul di blockchain dalam beberapa cara.

### Arbitrase DEX {#mev-examples-dex-arbitrage}

Arbitrase [bursa terdesentralisasi](/glossary/#dex) (DEX) adalah peluang MEV yang paling sederhana dan paling terkenal. Hasilnya, peluang ini juga merupakan peluang yang paling kompetitif.

Cara kerjanya seperti ini: jika dua DEX menawarkan sebuah token dengan dua harga berbeda, seseorang dapat membeli token itu di DEX dengan harga lebih rendah dan menjualnya di DEX dengan harga lebih tinggi dalam satu transaksi atomik. Berkat mekanisme blockchain, ini merupakan arbitrase sejati dan tanpa resiko.

[Ini contohnya](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) dari sebuah transaksi arbitrase yang menguntungkan di mana seorang pencari mengubah 1.000 ETH menjadi 1.045 ETH dengan mengambil keuntungan dari perbedaan harga pasangan ETH/DAI di Uniswap vs. Sushiswap.

### Likuidasi {#mev-examples-liquidations}

Likuidasi protokol peminjaman menyajikan peluang MEV yang terkenal lainnya.

Protokol pinjaman seperti Maker dan Aave mengharuskan pengguna menyetor sejumlah jaminan (misalnya, ETH). Agunan yang disimpan ini kemudian digunakan untuk meminjamkan kepada pengguna lain.

Pengguna kemudian dapat meminjam aset dan token dari orang lain tergantung pada apa yang mereka butuhkan (misalnya, Anda mungkin meminjam MKR jika Anda ingin memberikan suara dalam proposal tata kelola MakerDAO) hingga persentase tertentu dari jaminan yang mereka setorkan. Sebagai contoh, jika jumlah peminjaman maksimal 30%, pengguna yang menyetor 100 DAI ke dalam protokol dapat meminjam aset lain hingga 30 DAI. Protokol menentukan persentase daya pinjam yang tepat.

Sama seperti nilai dari jaminan peminjam berfluktuasi, begitu pula dengan kuasa peminjaman mereka. Jika, karena fluktuasi pasar, nilai aset yang dipinjam melebihi, katakanlah, 30% dari nilai jaminan mereka (sekali lagi, persentase tepatnya ditentukan oleh protokol), protokol biasanya memungkinkan siapa pun untuk melikuidasi agunan, dengan segera membayar pemberi pinjaman (ini mirip dengan cara kerja [panggilan margin](https://www.investopedia.com/terms/m/margincall.asp) dalam keuangan tradisional). Jika dilikuidasi, peminjam biasanya harus membayar biaya likuidasi yang sangat besar, sebagain dari biayanya masuk ke likuidator — yang merupakan tempat di mana peluang MEV masuk.

Para pencari berkompetisi untuk melakukan parse terhadap data blockchain secepat mungkin untuk menentukan peminjam mana yang dapat dilikuidasi dan menjadi yang pertama untuk mengirim transaksi likuidasi dan menerima biaya likuidasi bagi mereka sendiri.

### Perdagangan sandwich {#mev-examples-sandwich-trading}

Perdagangan sandwich adalah metode umum lainnya untuk ekstraksi MEV.

Untuk melakukan sandwich, seorang pencari akan mengawasi mempool untuk perdagangan DEX yang besar. Misalnya, anggaplah seseorang ingin membeli 10.000 UNI dengan DAI di Uniswap. Perdagangan sebesar ini akan memiliki efek yang berarti pada pasangan UNI/DAI, yang berpotensi secara signifikan meningkatkan harga UNI relatif terhadap DAI.

Seorang pencari dapat menghitung perkiraan efek harga dari perdagangan besar ini pada pasangan UNI/DAI dan mengeksekusi pesanan beli yang optimal segera _sebelum_ perdagangan besar, membeli UNI dengan harga murah, kemudian mengeksekusi pesanan jual segera _setelah_ perdagangan besar, menjualnya dengan harga yang lebih tinggi yang disebabkan oleh pesanan besar tersebut.

Namun, sandwiching lebih berisiko karena tidak bersifat atomik (tidak seperti arbitrase DEX, seperti yang dijelaskan di atas) dan rentan terhadap [serangan salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV NFT {#mev-examples-nfts}

MEV dalam area NFT adalah fenomena yang sedang populer, dan tidak harus menguntungkan.

Namun, karena transaksi NFT terjadi di blockchain yang sama seperti yang digunakan bersama oleh semua transaksi Ethereum lainnya, para pencari dapat menggunakan teknik serupa seperti yang digunakan dalam peluang MEV tradisional dalam pasar NFT juga.

Misalnya, jika ada satu drop NFT populer dan seorang pencari menginginkan NFT tertentu atau rangkaian NFT, mereka dapat memrogram transaksi sedemikian rupa sehingga mereka ada di urutan pertama dalam antrian untuk membeli NFT tersebut, atau mereka dapat membeli seluruh rangkaian NFT dalam satu transaksi. Atau jika sebuah NFT [salah dicantumkan pada harga rendah](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), seorang pencari dapat mendahului pembeli lain dan mengambilnya dengan harga murah.

Satu contoh menonjol dari NFT MEV terjadi ketika seorang pencari menghabiskan $7 juta untuk [membeli](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) setiap Cryptopunk dengan harga dasar. Seorang peneliti blockchain [menjelaskan di Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) bagaimana pembeli bekerja dengan penyedia MEV untuk menjaga kerahasiaan pembelian mereka.

### Ekor Panjang {#mev-examples-long-tail}

Arbitrase DEX, likuidasi, dan perdagangan sandwich semuanya merupakan peluang MEV yang sangat terkenal dan sepertinya tidak mungkin menguntungkan bagi para pencari baru. Namun, ada ekor panjang yaitu peluang MEV yang kurang dikenal (MEV NFT bisa dibilang merupakan peluang semacam itu).

Para pencari yang baru memulai mungkin bisa mendapatkan lebih banyak kesuksesan dengan mencari MEV di ekor yang lebih panjang ini. [Papan lowongan MEV](https://github.com/flashbots/mev-job-board) dari Flashbot mencantumkan beberapa peluang yang muncul.

## Efek MEV {#effects-of-mev}

MEV tidak semuanya buruk — ada dua konsekuensi baik positif dan negatif dari MEV di Ethereum.

### Sisi baiknya {#effects-of-mev-the-good}

Banyak proyek DeFi mengandalkan para pelaku yang rasional secara ekonomi untuk memastikan kegunaan dan kestabilan protokol mereka. Sebagai contoh, arbitrase DEX memastikan bahwa para pengguna mendapatkan harga yang terbaik, yang paling tepat untuk token mereka, dan protokol pemberi pinjaman mengandalkan proses likuidasi yang cepat ketika kemampuan membayar para peminjam di bawah rasio jaminan untuk memastikan para pemberi pinjaman mendapatkan pembayaran kembali.

Tanpa para pencari rasional yang mencari dan memperbaiki ketidakefisienan ekonomi dan memanfaatkan insentif ekonomi protokol, protokol DeFi dan dapp secara umum mungkin tidak akan sekokoh seperti hari ini.

### Sisi buruknya {#effects-of-mev-the-bad}

Pada lapisan aplikasi, beberapa bentuk MEV, seperti perdagangan sandwich, menyebabkan pengalaman yang jelas lebih buruk bagi para pengguna. Para pengguna yang di-sandwich menghadapi slippage yang meningkat dan eksekusi perdagangan mereka yang lebih buruk.

Pada lapisan jaringan, frontrunner yang digeneralisasi dan pelelangan harga gas yang di dalamnya mereka sering terlibat (ketika dua atau bebrapa frontrunner berkompetisi agar transaksi mereka dimasukkan di blok berikutnya, secara progresif menaikkan harga gas transaksi mereka sendiri) menyebabkan kemacetan jaringan dan harga gas yang tinggi bagi orang lain yang mencoba menjalankan transaksi reguler.

Di luar apa yang terjadi _di dalam_ blok, MEV dapat memiliki efek merusak _di antara_ blok. Jika MEV yang tersedia dalam sebuah blok secara signifikan melebihi hadiah blok standar, validator dapat diberi insentif untuk mengatur ulang blok dan menangkap MEV untuk diri mereka sendiri, yang menyebabkan pengorganisasian ulang blockchain dan ketidakstabilan konsensus.

Kemungkinan reorganisasi blockchain ini telah [dijelajahi sebelumnya di blockchain Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Karena imbalan blok Bitcoin berkurang setengah dan biaya transaksi membuat bagian imbalan blok yang semakin besar, masalahnya muncul ketika dianggap rasional secara ekonomi oleh para penambang untuk melepaskan imbalan blok berikutnya dan sebagai gantinya menambang kembali blok sebelumnya dengan harga pembayaran yang lebih tinggi. Dengan pertumbuhan MEV, situasi yang sama ini dapat terjadi di Ethereum, yang mengancam integritas blockchain.

## Kondisi MEV {#state-of-mev}

Ekstraksi MEV membengkak pada awal 2021, yang menyebabkan harga gas yang sangat tinggi dalam beberapa bulan pertama. Munculnya relai MEV Flashbots telah mengurangi efektivitas pelopor umum dan telah mengambil lelang harga gas di luar rantai, menurunkan harga gas untuk pengguna biasa.

Meskipun banyak pencari masih menghasilkan banyak uang dari MEV, ketika peluang menjadi lebih terkenal dan semakin banyak pencari yang bersaing untuk mendapatkan peluang yang sama, validator akan menangkap lebih banyak lagi total pendapatan MEV (karena jenis lelang gas yang sama seperti yang dijelaskan sebelumnya di atas juga terjadi di Flashbots, meskipun secara pribadi, dan validator akan menangkap pendapatan gas yang dihasilkan). MEV juga tidak unik bagi Ethereum, dan karena peluangnya semakin kompetitif di Ethereum, para pencari berpindah ke blockchain pengganti seperti Binance Smart Chain, di mana peluang MEV serupa seperti yang di Ethereum ada dengan lebih sedikit kompetisi.

Di sisi lain, transisi dari proof-of-work ke proof-of-stake dan upaya yang sedang berlangsung untuk menskalakan Ethereum menggunakan rollup, semuanya mengubah lanskap MEV dengan cara yang masih belum jelas. Belum diketahui secara pasti bagaimana memiliki pengusul blok yang dijamin yang diketahui sedikit lebih awal mengubah dinamika ekstraksi MEV dibandingkan dengan model probabilistik dalam bukti-kerja atau bagaimana ini akan terganggu ketika [pemilihan pemimpin rahasia tunggal](https://ethresear.ch/t/secret-non-single-leader-election/11789) dan [teknologi validator terdistribusi](/staking/dvt/) diterapkan. Demikian pula, masih harus dilihat peluang MEV apa yang ada ketika sebagian besar aktivitas pengguna dialihkan dari Ethereum ke rollup dan pecahan layer 2.

## MEV dalam Ethereum Proof-of-Stake (PoS) {#mev-in-ethereum-proof-of-stake}

Seperti yang telah dijelaskan, MEV memiliki implikasi negatif terhadap pengalaman pengguna secara keseluruhan dan keamanan lapisan konsensus. Namun, transisi Ethereum ke konsensus bukti kepemilikan (dijuluki "The Merge") berpotensi menimbulkan risiko baru terkait MEV:

### Sentralisasi validator {#validator-centralization}

Pasca Penggabungan Ethereum, para validator (yang telah melakukan deposit keamanan sebesar 32 ETH) membuat konsensus mengenai keabsahan blok yang ditambahkan ke dalam Rantai Beacon. Karena 32 ETH mungkin di luar jangkauan banyak orang, [bergabung dengan pool staking](/staking/pools/) mungkin merupakan pilihan yang lebih layak. Namun demikian, distribusi [staker solo](/staking/solo/) yang sehat adalah ideal, karena ini mengurangi sentralisasi validator dan meningkatkan keamanan Ethereum.

Namun, ekstraksi MEV diyakini mampu mempercepat sentralisasi validator. Ini sebagian karena, karena validator [mendapatkan lebih sedikit untuk mengusulkan blok](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) daripada penambang sebelumnya, ekstraksi MEV telah sangat [memengaruhi pendapatan validator](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) sejak [The Merge](/roadmap/merge/).

Kumpulan staking yang lebih besar kemungkinan akan memiliki lebih banyak sumber daya untuk berinvestasi dalam optimisasi yang diperlukan untuk menangkap peluang MEV. Semakin banyak MEV yang diekstrak oleh pool-pool ini, semakin banyak sumber daya yang mereka miliki untuk meningkatkan kemampuan ekstraksi MEV mereka (dan meningkatkan pendapatan keseluruhan), yang pada dasarnya menciptakan [ekonomi skala](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Dengan sumber daya yang lebih sedikit, pemain tunggal mungkin tidak dapat mengambil untung dari peluang MEV. Hal ini dapat meningkatkan tekanan pada validator independen untuk bergabung dengan kumpulan staking yang kuat untuk meningkatkan pendapatan mereka, sehingga mengurangi desentralisasi di Ethereum.

### Mempool berizin {#permissioned-mempools}

Sebagai respons terhadap serangan sandwiching dan frontrunning, para trader mungkin mulai melakukan kesepakatan offchain dengan validator demi menjaga privasi transaksi. Alih-alih mengirimkan potensi transaksi MEV ke mempool publik, pedagang mengirimkannya langsung ke validator, yang memasukkannya ke dalam blok dan membagi keuntungan dengan pedagang.

"Dark pool" adalah versi yang lebih besar dari pengaturan ini dan berfungsi sebagai mempool berizin dan hanya dapat diakses oleh pengguna yang bersedia membayar biaya tertentu. Tren ini akan mengurangi sifat Ethereum yang tidak memiliki izin dan tidak dapat dipercaya dan berpotensi mengubah blockchain menjadi mekanisme "pay-to-play" yang menguntungkan penawar tertinggi.

Mempool yang diizinkan juga akan mempercepat risiko sentralisasi yang dijelaskan di bagian sebelumnya. Pool besar yang menjalankan beberapa validator kemungkinan besar akan mendapatkan keuntungan dari menawarkan privasi transaksi kepada pedagang dan pengguna, sehingga meningkatkan pendapatan MEV mereka.

Memerangi masalah terkait MEV ini di pasca Penggabungan Ethereum adalah area inti dari penelitian. Hingga saat ini, dua solusi yang diusulkan untuk mengurangi dampak negatif MEV pada desentralisasi dan keamanan Ethereum setelah The Merge adalah [**Proposer-Builder Separation (PBS)**](/roadmap/pbs/) dan [**Builder API**](https://github.com/ethereum/builder-specs).

### Pemisahan Proposer-Builder {#proposer-builder-separation}

Pada proof-of-work dan proof-of-stake, sebuah node yang membangun sebuah blok mengusulkannya untuk ditambahkan ke dalam rantai ke node lain yang berpartisipasi dalam konsensus. Sebuah blok baru menjadi bagian dari rantai kanonik setelah penambang lain membangun di atasnya (dalam PoW) atau menerima pengesahan dari mayoritas pengesah (dalam PoS).

Kombinasi peran produsen blok dan pengusul blok adalah yang memperkenalkan sebagian besar masalah terkait MEV yang dijelaskan sebelumnya. Sebagai contoh, node konsensus diberi insentif untuk memicu reorganisasi rantai dalam [serangan time-bandit](https://www.mev.wiki/attack-examples/time-bandit-attack) untuk memaksimalkan pendapatan MEV.

[Pemisahan proposer-builder](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) dirancang untuk mengurangi dampak MEV, terutama di lapisan konsensus. Fitur utama PBS adalah pemisahan aturan produsen blok dan pengusul blok. Validator masih bertanggung jawab untuk mengusulkan dan memberikan suara pada blok, tetapi kelas baru dari entitas khusus, yang disebut **pembangun blok**, ditugaskan untuk mengurutkan transaksi dan membangun blok.

Dalam PBS, pembuat blok membuat bundel transaksi dan menempatkan penawaran untuk dimasukkan ke dalam blok Rantai Suar (sebagai "muatan eksekusi"). Validator yang dipilih untuk mengajukan blok berikutnya kemudian memeriksa penawaran yang berbeda dan memilih paket dengan biaya tertinggi. PBS pada dasarnya menciptakan pasar lelang, di mana para pembangun bernegosiasi dengan validator yang menjual ruang blok.

Desain PBS saat ini menggunakan [skema commit-reveal](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) di mana pembangun hanya mempublikasikan komitmen kriptografis terhadap isi blok (header blok) bersama dengan tawaran mereka. Setelah menerima tawaran yang menang, pengusul membuat proposal blok yang ditandatangani yang menyertakan tajuk blok. Pembangun blok diharapkan untuk mempublikasikan seluruh isi blok setelah melihat proposal blok yang ditandatangani, dan juga harus menerima cukup [atestasi](/glossary/#attestation) dari validator sebelum diselesaikan.

#### Bagaimana pemisahan pengusul-pembangun mengurangi dampak MEV? {#how-does-pbs-curb-mev-impact}

Pemisahan pengusul-pembuat dalam protokol mengurangi efek MEV pada konsensus dengan menghapus ekstraksi MEV dari lingkup validator. Sebaliknya, pembuat blok yang menjalankan perangkat keras khusus akan menangkap peluang MEV di masa mendatang.

Namun, hal ini tidak mengecualikan validator sepenuhnya dari pendapatan terkait MEV, karena para pembangun harus mengajukan penawaran yang tinggi agar blok mereka diterima oleh validator. Namun demikian, dengan validator yang tidak lagi secara langsung berfokus pada pengoptimalan pendapatan MEV, ancaman serangan bandit waktu berkurang.

Pemisahan pengusul-pembangun juga mengurangi risiko sentralisasi MEV. Sebagai contoh, penggunaan skema commit-reveal menghilangkan kebutuhan para pembangun untuk mempercayai validator agar tidak mencuri kesempatan MEV atau mengeksposnya ke pembangun lain. Hal ini menurunkan hambatan bagi solo stakers untuk memperoleh manfaat dari MEV. Jika tidak, para builder cenderung akan lebih memilih kolam besar yang memiliki reputasi offchain dan menjalin kesepakatan offchain dengan mereka.

Demikian pula, validator tidak perlu mempercayai pembangun untuk tidak menahan badan blok atau menerbitkan blok yang tidak valid karena pembayaran tidak bersyarat. Biaya validator tetap diproses meskipun blok yang diajukan tidak tersedia atau dinyatakan tidak valid oleh validator lain. Dalam kasus terakhir, blok akan dibuang begitu saja, memaksa pembuat blok kehilangan semua biaya transaksi dan pendapatan MEV.

### Builder API {#builder-api}

Meskipun pemisahan pembangun-pengusul menjanjikan untuk mengurangi efek ekstraksi MEV, mengimplementasikannya membutuhkan perubahan pada protokol konsensus. Secara spesifik, aturan [pilihan fork](/developers/docs/consensus-mechanisms/pos/#fork-choice) pada Beacon Chain perlu diperbarui. [Builder API](https://github.com/ethereum/builder-specs) adalah solusi sementara yang bertujuan untuk menyediakan implementasi yang berfungsi dari pemisahan proposer-builder, meskipun dengan asumsi kepercayaan yang lebih tinggi.

Builder API adalah versi modifikasi dari [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) yang digunakan oleh klien lapisan konsensus untuk meminta muatan eksekusi dari klien lapisan eksekusi. Seperti yang diuraikan dalam [spesifikasi validator jujur](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md), validator yang dipilih untuk tugas pengusulan blok meminta bundel transaksi dari klien eksekusi yang terhubung, yang mereka sertakan dalam blok Beacon Chain yang diusulkan.

Builder API juga berfungsi sebagai perangkat lunak tengah antara validator dan klien lapisan eksekusi; namun berbeda karena memungkinkan validator di Beacon Chain untuk memperoleh blok dari entitas eksternal (daripada membangun blok secara lokal menggunakan klien eksekusi).

Di bawah ini adalah ikhtisar tentang cara kerja API Builder:

1. API Builder menghubungkan validator ke jaringan pembuat blok yang menjalankan klien lapisan eksekusi. Seperti di PBS, pembangun adalah pihak khusus yang berinvestasi dalam pembangunan blok yang intensif sumber daya dan menggunakan strategi yang berbeda untuk memaksimalkan pendapatan yang diperoleh dari tips prioritas MEV +.

2. Sebuah validator (menjalankan klien lapisan konsensus) meminta muatan eksekusi bersama dengan tawaran dari jaringan pembangun. Tawaran dari pembangun akan berisi header payload eksekusi-komitmen kriptografi untuk konten payload-dan biaya yang harus dibayarkan kepada validator.

3. Validator meninjau tawaran yang masuk dan memilih muatan eksekusi dengan biaya tertinggi. Dengan menggunakan API Builder, validator membuat proposal blok Beacon yang "dibutakan" yang hanya menyertakan tanda tangan mereka dan header muatan eksekusi dan mengirimkannya ke pembangun.

4. Pembangun yang menjalankan API Pembangun diharapkan merespons dengan muatan eksekusi penuh setelah melihat proposal blok yang dibutakan. Hal ini memungkinkan validator untuk membuat blok Beacon yang "ditandatangani", yang disebarkan ke seluruh jaringan.

5. Validator yang menggunakan API Builder masih diharapkan untuk membangun blok secara lokal jika pembuat blok gagal merespons dengan cepat, sehingga mereka tidak melewatkan hadiah proposal blok. Namun, validator tidak dapat membuat blok lain menggunakan transaksi yang baru diungkapkan atau set lain, karena itu akan sama dengan _ekuivokasi_ (menandatangani dua blok dalam slot yang sama), yang merupakan pelanggaran yang dapat dikenai sanksi slashing.

Contoh implementasi dari Builder API adalah [MEV Boost](https://github.com/flashbots/mev-boost), sebuah penyempurnaan pada [mekanisme lelang Flashbots](https://docs.flashbots.net/Flashbots-auction/overview) yang dirancang untuk menekan eksternalitas negatif dari MEV pada Ethereum. Lelang Flashbots memungkinkan validator di bukti-pasak untuk mengalihdayakan pekerjaan membangun blok yang menguntungkan kepada pihak khusus yang disebut **pencari**.
![Diagram yang menunjukkan alur MEV secara detail](./mev.png)

Pencari mencari peluang MEV yang menguntungkan dan mengirimkan bundel transaksi ke pengusul blok bersama dengan [tawaran harga tertutup](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) untuk dimasukkan ke dalam blok. Validator yang menjalankan mev-geth, versi fork dari klien go-ethereum (Geth) hanya perlu memilih kelompok dengan keuntungan paling besar dan memasukkannya sebagai bagian dari blok baru. Untuk melindungi pengusul blok (validator) dari spam dan transaksi yang tidak valid, bundel transaksi melewati **relayer** untuk validasi sebelum sampai ke pengusul.

MEV Boost mempertahankan cara kerja yang sama dengan lelang Flashbots yang asli, meskipun dengan fitur-fitur baru yang dirancang untuk peralihan Ethereum ke bukti kepemilikan. Pencari masih menemukan transaksi MEV yang menguntungkan untuk dimasukkan ke dalam blok, tetapi kelas baru dari pihak-pihak khusus, yang disebut **pembangun**, bertanggung jawab untuk menggabungkan transaksi dan bundel ke dalam blok. Pembangun menerima tawaran harga tertutup dari pencari dan menjalankan pengoptimalan untuk menemukan pemesanan yang paling menguntungkan.

Relayer masih bertanggung jawab untuk memvalidasi bundel transaksi sebelum meneruskannya ke pengusul. Namun, MEV Boost memperkenalkan **escrow** yang bertanggung jawab untuk menyediakan [ketersediaan data](/developers/docs/data-availability/) dengan menyimpan badan blok yang dikirim oleh pembangun dan header blok yang dikirim oleh validator. Di sini, validator yang terhubung ke relai meminta muatan eksekusi yang tersedia dan menggunakan algoritme pemesanan MEV Boost untuk memilih header muatan dengan tawaran tertinggi + kiat MEV.

#### Bagaimana cara Builder API memitigasi dampak MEV? {#how-does-builder-api-curb-mev-impact}

Manfaat utama dari Builder API adalah potensinya untuk mendemokratisasi akses ke peluang MEV. Menggunakan skema komitmen-pengungkapan menghilangkan asumsi kepercayaan dan mengurangi hambatan masuk bagi validator yang ingin mendapatkan manfaat dari MEV. Hal ini akan mengurangi tekanan pada solo stakers untuk berintegrasi dengan staking pool yang besar untuk meningkatkan keuntungan MEV.

Implementasi API Builder secara luas akan mendorong persaingan yang lebih besar di antara para pembuat blok, yang akan meningkatkan resistensi terhadap sensor. Ketika validator meninjau tawaran dari beberapa pembuat, pembuat yang berniat menyensor satu atau beberapa transaksi pengguna harus mengalahkan semua pembuat yang tidak menyensor agar berhasil. Hal ini secara dramatis meningkatkan biaya penyensoran pengguna dan membuat praktik ini tidak lagi dilakukan.

Beberapa proyek, seperti MEV Boost, menggunakan API Builder sebagai bagian dari struktur keseluruhan yang dirancang untuk memberikan privasi transaksi kepada pihak-pihak tertentu, seperti pedagang yang mencoba menghindari serangan frontrunning/sandwiching. Hal ini dicapai dengan menyediakan saluran komunikasi pribadi antara pengguna dan pembuat blok. Tidak seperti mempool berizin yang dijelaskan sebelumnya, pendekatan ini bermanfaat karena alasan berikut:

1. Keberadaan beberapa pembangun di pasar membuat penyensoran menjadi tidak praktis, yang menguntungkan pengguna. Sebaliknya, keberadaan dark pool yang tersentralisasi dan berbasis kepercayaan akan memusatkan kekuatan di tangan beberapa pembuat blok dan meningkatkan kemungkinan penyensoran.

2. Perangkat lunak pembuat API adalah sumber terbuka, yang memungkinkan siapa saja untuk menawarkan layanan pembuat blok. Ini berarti pengguna tidak dipaksa untuk menggunakan pembuat blok tertentu dan meningkatkan netralitas dan tanpa izin Ethereum. Selain itu, pedagang yang mencari MEV tidak akan secara tidak sengaja berkontribusi pada sentralisasi dengan menggunakan saluran transaksi pribadi.

## Sumber daya terkait {#related-resources}

- [Dokumentasi Flashbots](https://docs.flashbots.net/)
- [GitHub Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Pelacak dengan statistik waktu nyata untuk relai MEV-Boost dan pembangun blok_

## Bacaan lebih lanjut {#further-reading}

- [Apa Itu Nilai yang Dapat Diekstraksi Penambang (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV dan Saya](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum adalah Hutan Gelap](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Melarikan Diri dari Hutan Gelap](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Mendahului Krisis MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Utas MEV oleh @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Arsitektur Flashbots Siap Merge](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Apa Itu MEV Boost](https://www.alchemy.com/overviews/mev-boost)
- [Mengapa menjalankan mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Panduan Hitchhiker untuk Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
