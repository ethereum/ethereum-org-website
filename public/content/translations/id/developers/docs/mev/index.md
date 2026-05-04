---
title: Nilai ekstraksi maksimum (MEV)
description: Pengenalan tentang nilai ekstraksi maksimum (MEV)
lang: id
---

Nilai ekstraksi maksimum (MEV) mengacu pada nilai maksimum yang dapat diekstraksi dari produksi blok melebihi hadiah blok standar dan biaya gas dengan menyertakan, mengecualikan, dan mengubah urutan transaksi dalam sebuah blok.

## Nilai ekstraksi maksimum {#maximal-extractable-value}

Nilai ekstraksi maksimum pertama kali diterapkan dalam konteks [proof-of-work](/developers/docs/consensus-mechanisms/pow/), dan awalnya disebut sebagai "miner extractable value" (nilai ekstraksi penambang). Hal ini karena dalam proof-of-work, penambang mengontrol penyertaan, pengecualian, dan pengurutan transaksi. Namun, sejak transisi ke proof-of-stake melalui [The Merge](/roadmap/merge), validator telah bertanggung jawab atas peran-peran ini, dan penambangan tidak lagi menjadi bagian dari protokol [Ethereum](/). Meskipun demikian, metode ekstraksi nilai masih ada, sehingga istilah "Nilai ekstraksi maksimum" kini digunakan sebagai gantinya.

## Prasyarat {#prerequisites}

Pastikan Anda familier dengan [transaksi](/developers/docs/transactions/), [blok](/developers/docs/blocks/), [proof-of-stake](/developers/docs/consensus-mechanisms/pos), dan [gas](/developers/docs/gas/). Pemahaman tentang [dapps](/apps/) dan [DeFi](/defi/) juga akan sangat membantu.

## Ekstraksi MEV {#mev-extraction}

Secara teori, MEV sepenuhnya menjadi milik validator karena mereka adalah satu-satunya pihak yang dapat menjamin eksekusi peluang MEV yang menguntungkan. Namun, pada praktiknya, sebagian besar MEV diekstraksi oleh peserta jaringan independen yang disebut sebagai "searcher" (pencari). Searcher menjalankan algoritma kompleks pada data blockchain untuk mendeteksi peluang MEV yang menguntungkan dan memiliki bot untuk secara otomatis mengirimkan transaksi yang menguntungkan tersebut ke jaringan.

Validator tetap mendapatkan sebagian dari jumlah MEV penuh karena searcher bersedia membayar biaya gas yang tinggi (yang masuk ke validator) sebagai imbalan atas kemungkinan yang lebih tinggi untuk menyertakan transaksi menguntungkan mereka dalam sebuah blok. Dengan asumsi searcher rasional secara ekonomi, biaya gas yang bersedia dibayar oleh searcher akan mencapai hingga 100% dari MEV searcher (karena jika biaya gas lebih tinggi, searcher akan merugi).

Dengan demikian, untuk beberapa peluang MEV yang sangat kompetitif, seperti [arbitrase DEX](#mev-examples-dex-arbitrage), searcher mungkin harus membayar 90% atau bahkan lebih dari total pendapatan MEV mereka dalam bentuk biaya gas kepada validator karena begitu banyak orang ingin menjalankan perdagangan arbitrase menguntungkan yang sama. Hal ini karena satu-satunya cara untuk menjamin bahwa transaksi arbitrase mereka berjalan adalah jika mereka mengirimkan transaksi dengan harga gas tertinggi.

### Gas golfing {#mev-extraction-gas-golfing}

Dinamika ini telah membuat keahlian dalam "gas golfing" — memprogram transaksi sehingga menggunakan jumlah gas paling sedikit — menjadi keuntungan kompetitif, karena memungkinkan searcher untuk menetapkan harga gas yang lebih tinggi sambil menjaga total biaya gas mereka tetap konstan (karena biaya gas = harga gas \* gas yang digunakan).

Beberapa teknik gas golf yang terkenal meliputi: menggunakan alamat yang dimulai dengan serangkaian angka nol yang panjang (misalnya, [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)) karena membutuhkan lebih sedikit ruang (dan karenanya lebih sedikit gas) untuk disimpan; dan menyisakan saldo token [ERC-20](/developers/docs/standards/tokens/erc-20/) dalam jumlah kecil di kontrak, karena membutuhkan lebih banyak gas untuk menginisialisasi slot penyimpanan (kasus jika saldonya 0) daripada memperbarui slot penyimpanan. Menemukan lebih banyak teknik untuk mengurangi penggunaan gas adalah area penelitian yang aktif di kalangan searcher.

### Frontrunner umum {#mev-extraction-generalized-frontrunners}

Daripada memprogram algoritma kompleks untuk mendeteksi peluang MEV yang menguntungkan, beberapa searcher menjalankan frontrunner umum. Frontrunner umum adalah bot yang mengawasi mempool untuk mendeteksi transaksi yang menguntungkan. Frontrunner akan menyalin kode transaksi yang berpotensi menguntungkan, mengganti alamat dengan alamat frontrunner, dan menjalankan transaksi secara lokal untuk memeriksa ulang bahwa transaksi yang dimodifikasi menghasilkan keuntungan bagi alamat frontrunner. Jika transaksi tersebut memang menguntungkan, frontrunner akan mengirimkan transaksi yang dimodifikasi dengan alamat yang diganti dan harga gas yang lebih tinggi, melakukan "frontrunning" (mendahului) transaksi asli dan mendapatkan MEV dari searcher asli.

### Flashbots {#mev-extraction-flashbots}

Flashbots adalah proyek independen yang memperluas klien eksekusi dengan layanan yang memungkinkan searcher untuk mengirimkan transaksi MEV ke validator tanpa mengungkapkannya ke mempool publik. Hal ini mencegah transaksi didahului (frontrun) oleh frontrunner umum.

## Contoh MEV {#mev-examples}

MEV muncul di blockchain dalam beberapa cara.

### Arbitrase DEX {#mev-examples-dex-arbitrage}

Arbitrase [pertukaran terdesentralisasi](/glossary/#dex) (DEX) adalah peluang MEV yang paling sederhana dan paling terkenal. Akibatnya, ini juga merupakan yang paling kompetitif.

Cara kerjanya seperti ini: jika dua DEX menawarkan token dengan dua harga yang berbeda, seseorang dapat membeli token di DEX dengan harga lebih rendah dan menjualnya di DEX dengan harga lebih tinggi dalam satu transaksi atomik. Berkat mekanisme blockchain, ini adalah arbitrase sejati yang tanpa risiko.

[Berikut adalah contoh](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) transaksi arbitrase yang menguntungkan di mana seorang searcher mengubah 1.000 ETH menjadi 1.045 ETH dengan memanfaatkan perbedaan harga pasangan ETH/DAI di Uniswap vs. Sushiswap.

### Likuidasi {#mev-examples-liquidations}

Likuidasi protokol peminjaman menghadirkan peluang MEV terkenal lainnya.

Protokol peminjaman seperti Maker dan Aave mengharuskan pengguna untuk menyetorkan sejumlah agunan (misalnya, ETH). Agunan yang disetorkan ini kemudian digunakan untuk dipinjamkan kepada pengguna lain.

Pengguna kemudian dapat meminjam aset dan token dari orang lain tergantung pada apa yang mereka butuhkan (misalnya, Anda mungkin meminjam MKR jika Anda ingin memberikan suara dalam proposal tata kelola MakerDAO) hingga persentase tertentu dari agunan yang mereka setorkan. Misalnya, jika jumlah pinjaman maksimum adalah 30%, pengguna yang menyetorkan 100 DAI ke dalam protokol dapat meminjam hingga senilai 30 DAI dari aset lain. Protokol menentukan persentase daya pinjam yang tepat.

Seiring berfluktuasinya nilai agunan peminjam, daya pinjam mereka juga ikut berfluktuasi. Jika, karena fluktuasi pasar, nilai aset yang dipinjam melebihi katakanlah, 30% dari nilai agunan mereka (sekali lagi, persentase pastinya ditentukan oleh protokol), protokol biasanya mengizinkan siapa saja untuk melikuidasi agunan tersebut, secara instan melunasi pemberi pinjaman (ini mirip dengan cara kerja [margin call](https://www.investopedia.com/terms/m/margincall.asp) dalam keuangan tradisional). Jika dilikuidasi, peminjam biasanya harus membayar biaya likuidasi yang besar, yang sebagiannya masuk ke likuidator — di sinilah peluang MEV muncul.

Searcher bersaing untuk mengurai data blockchain secepat mungkin guna menentukan peminjam mana yang dapat dilikuidasi dan menjadi yang pertama mengirimkan transaksi likuidasi serta mengumpulkan biaya likuidasi untuk diri mereka sendiri.

### Perdagangan sandwich {#mev-examples-sandwich-trading}

Perdagangan sandwich adalah metode umum lainnya dari ekstraksi MEV.

Untuk melakukan sandwich, seorang searcher akan mengawasi mempool untuk mencari perdagangan DEX berskala besar. Misalnya, misalkan seseorang ingin membeli 10.000 UNI dengan DAI di Uniswap. Perdagangan sebesar ini akan memiliki efek yang berarti pada pasangan UNI/DAI, yang berpotensi menaikkan harga UNI secara signifikan relatif terhadap DAI.

Seorang searcher dapat menghitung perkiraan efek harga dari perdagangan besar ini pada pasangan UNI/DAI dan mengeksekusi pesanan beli yang optimal tepat _sebelum_ perdagangan besar tersebut, membeli UNI dengan harga murah, kemudian mengeksekusi pesanan jual tepat _setelah_ perdagangan besar tersebut, menjualnya dengan harga yang lebih tinggi yang disebabkan oleh pesanan besar tersebut.

Namun, melakukan sandwich lebih berisiko karena tidak bersifat atomik (tidak seperti arbitrase DEX, seperti yang dijelaskan di atas) dan rentan terhadap [serangan salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV NFT {#mev-examples-nfts}

MEV di ruang NFT adalah fenomena yang baru muncul, dan belum tentu menguntungkan.

Namun, karena transaksi NFT terjadi di blockchain yang sama yang digunakan oleh semua transaksi Ethereum lainnya, searcher dapat menggunakan teknik yang serupa dengan yang digunakan dalam peluang MEV tradisional di pasar NFT juga.

Misalnya, jika ada peluncuran NFT yang populer dan seorang searcher menginginkan NFT atau set NFT tertentu, mereka dapat memprogram transaksi sedemikian rupa sehingga mereka menjadi yang pertama dalam antrean untuk membeli NFT tersebut, atau mereka dapat membeli seluruh set NFT dalam satu transaksi. Atau jika sebuah NFT [secara tidak sengaja terdaftar dengan harga rendah](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), seorang searcher dapat mendahului (frontrun) pembeli lain dan merebutnya dengan harga murah.

Salah satu contoh menonjol dari MEV NFT terjadi ketika seorang searcher menghabiskan $7 juta untuk [membeli](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) setiap Cryptopunk pada harga dasar. Seorang peneliti blockchain [menjelaskan di Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) bagaimana pembeli tersebut bekerja sama dengan penyedia MEV untuk merahasiakan pembelian mereka.

### Ekor panjang {#mev-examples-long-tail}

Arbitrase DEX, likuidasi, dan perdagangan sandwich semuanya merupakan peluang MEV yang sangat terkenal dan kecil kemungkinannya untuk menguntungkan bagi searcher baru. Namun, ada ekor panjang (long tail) dari peluang MEV yang kurang dikenal (MEV NFT bisa dibilang salah satu peluang tersebut).

Searcher yang baru memulai mungkin dapat menemukan lebih banyak kesuksesan dengan mencari MEV di ekor yang lebih panjang ini. [Papan lowongan MEV](https://github.com/flashbots/mev-job-board) Flashbots mencantumkan beberapa peluang yang baru muncul.

## Efek MEV {#effects-of-mev}

MEV tidak sepenuhnya buruk — ada konsekuensi positif dan negatif dari MEV di Ethereum.

### Sisi baik {#effects-of-mev-the-good}

Banyak proyek DeFi bergantung pada aktor yang rasional secara ekonomi untuk memastikan kegunaan dan stabilitas protokol mereka. Misalnya, arbitrase DEX memastikan bahwa pengguna mendapatkan harga terbaik dan paling tepat untuk token mereka, dan protokol peminjaman bergantung pada likuidasi yang cepat ketika peminjam jatuh di bawah rasio agunan untuk memastikan pemberi pinjaman mendapatkan bayaran kembali.

Tanpa searcher rasional yang mencari dan memperbaiki inefisiensi ekonomi serta memanfaatkan insentif ekonomi protokol, protokol DeFi dan dapps pada umumnya mungkin tidak akan sekuat sekarang.

### Sisi buruk {#effects-of-mev-the-bad}

Pada lapisan aplikasi, beberapa bentuk MEV, seperti perdagangan sandwich, secara tegas menghasilkan pengalaman yang lebih buruk bagi pengguna. Pengguna yang terkena sandwich menghadapi peningkatan slippage dan eksekusi yang lebih buruk pada perdagangan mereka.

Pada lapisan jaringan, frontrunner umum dan lelang harga gas yang sering mereka ikuti (ketika dua atau lebih frontrunner bersaing agar transaksi mereka disertakan dalam blok berikutnya dengan secara progresif menaikkan harga gas transaksi mereka sendiri) mengakibatkan kemacetan jaringan dan harga gas yang tinggi bagi semua orang yang mencoba menjalankan transaksi reguler.

Di luar apa yang terjadi _di dalam_ blok, MEV dapat memiliki efek merusak _di antara_ blok. Jika MEV yang tersedia dalam sebuah blok secara signifikan melebihi hadiah blok standar, validator mungkin terdorong untuk mengatur ulang (reorg) blok dan menangkap MEV untuk diri mereka sendiri, yang menyebabkan reorganisasi blockchain dan ketidakstabilan konsensus.

Kemungkinan reorganisasi blockchain ini telah [dieksplorasi sebelumnya di blockchain Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Seiring dengan berkurangnya hadiah blok Bitcoin menjadi setengahnya dan biaya transaksi menjadi bagian yang semakin besar dari hadiah blok, muncul situasi di mana menjadi rasional secara ekonomi bagi penambang untuk melepaskan hadiah blok berikutnya dan malah menambang ulang blok masa lalu dengan biaya yang lebih tinggi. Dengan pertumbuhan MEV, situasi serupa dapat terjadi di Ethereum, yang mengancam integritas blockchain.

## Status MEV {#state-of-mev}

Ekstraksi MEV membengkak pada awal tahun 2021, yang mengakibatkan harga gas yang sangat tinggi pada beberapa bulan pertama tahun tersebut. Munculnya relai MEV Flashbots telah mengurangi efektivitas frontrunner umum dan telah membawa lelang harga gas secara offchain, sehingga menurunkan harga gas bagi pengguna biasa.

Meskipun banyak searcher masih menghasilkan banyak uang dari MEV, seiring dengan semakin dikenalnya peluang dan semakin banyak searcher yang bersaing untuk peluang yang sama, validator akan menangkap semakin banyak total pendapatan MEV (karena jenis lelang gas yang sama seperti yang dijelaskan di atas juga terjadi di Flashbots, meskipun secara pribadi, dan validator akan menangkap pendapatan gas yang dihasilkan). MEV juga tidak unik untuk Ethereum, dan seiring dengan semakin kompetitifnya peluang di Ethereum, searcher beralih ke blockchain alternatif seperti Binance Smart Chain, di mana peluang MEV yang serupa dengan yang ada di Ethereum tersedia dengan persaingan yang lebih sedikit.

Di sisi lain, transisi dari proof-of-work ke proof-of-stake dan upaya berkelanjutan untuk meningkatkan skala Ethereum menggunakan rollup semuanya mengubah lanskap MEV dengan cara yang masih agak tidak jelas. Belum diketahui secara pasti bagaimana memiliki pengusul blok terjamin yang diketahui sedikit lebih awal mengubah dinamika ekstraksi MEV dibandingkan dengan model probabilistik dalam proof-of-work atau bagaimana hal ini akan terganggu ketika [pemilihan pemimpin rahasia tunggal](https://ethresear.ch/t/secret-non-single-leader-election/11789) dan [teknologi validator terdistribusi](/staking/dvt/) diimplementasikan. Demikian pula, masih harus dilihat peluang MEV apa yang ada ketika sebagian besar aktivitas pengguna dialihkan dari Ethereum dan ke rollup layer 2 serta shard-nya.

## MEV dalam Proof-of-Stake (PoS) Ethereum {#mev-in-ethereum-proof-of-stake}

Seperti yang dijelaskan, MEV memiliki implikasi negatif terhadap pengalaman pengguna secara keseluruhan dan keamanan lapisan konsensus. Namun, transisi Ethereum ke konsensus proof-of-stake (dijuluki "The Merge") berpotensi memperkenalkan risiko baru terkait MEV:

### Sentralisasi validator {#validator-centralization}

Di Ethereum pasca-Merge, validator (yang telah melakukan deposit keamanan sebesar 32 ETH) mencapai konsensus tentang validitas blok yang ditambahkan ke Beacon Chain. Karena 32 ETH mungkin di luar jangkauan banyak orang, [bergabung dengan kolam staking](/staking/pools/) mungkin menjadi opsi yang lebih layak. Meskipun demikian, distribusi [staker solo](/staking/solo/) yang sehat adalah hal yang ideal, karena ini memitigasi sentralisasi validator dan meningkatkan keamanan Ethereum.

Namun, ekstraksi MEV diyakini mampu mempercepat sentralisasi validator. Hal ini sebagian karena, seiring validator [mendapatkan lebih sedikit untuk mengusulkan blok](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) dibandingkan penambang sebelumnya, ekstraksi MEV telah sangat [memengaruhi pendapatan validator](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) sejak [The Merge](/roadmap/merge/).

Kolam staking yang lebih besar kemungkinan akan memiliki lebih banyak sumber daya untuk diinvestasikan dalam pengoptimalan yang diperlukan guna menangkap peluang MEV. Semakin banyak MEV yang diekstraksi oleh kolam-kolam ini, semakin banyak sumber daya yang mereka miliki untuk meningkatkan kemampuan ekstraksi MEV mereka (dan meningkatkan pendapatan keseluruhan), yang pada dasarnya menciptakan [skala ekonomi](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Dengan lebih sedikit sumber daya yang mereka miliki, staker solo mungkin tidak dapat mengambil keuntungan dari peluang MEV. Hal ini dapat meningkatkan tekanan pada validator independen untuk bergabung dengan kolam staking yang kuat guna meningkatkan pendapatan mereka, sehingga mengurangi desentralisasi di Ethereum.

### Mempool berizin {#permissioned-mempools}

Sebagai tanggapan terhadap serangan sandwiching dan frontrunning, pedagang mungkin mulai melakukan kesepakatan offchain dengan validator untuk privasi transaksi. Alih-alih mengirimkan transaksi MEV potensial ke mempool publik, pedagang mengirimkannya langsung ke validator, yang menyertakannya dalam sebuah blok dan membagi keuntungan dengan pedagang tersebut.

"Dark pool" adalah versi yang lebih besar dari pengaturan ini dan berfungsi sebagai mempool berizin dengan akses terbatas yang terbuka bagi pengguna yang bersedia membayar biaya tertentu. Tren ini akan mengurangi sifat tanpa izin dan tanpa kepercayaan Ethereum serta berpotensi mengubah blockchain menjadi mekanisme "bayar untuk bermain" yang menguntungkan penawar tertinggi.

Mempool berizin juga akan mempercepat risiko sentralisasi yang dijelaskan di bagian sebelumnya. Kolam besar yang menjalankan banyak validator kemungkinan akan mendapat manfaat dari menawarkan privasi transaksi kepada pedagang dan pengguna, sehingga meningkatkan pendapatan MEV mereka.

Memerangi masalah terkait MEV ini di Ethereum pasca-Merge adalah area penelitian inti. Hingga saat ini, dua solusi yang diusulkan untuk mengurangi dampak negatif MEV pada desentralisasi dan keamanan Ethereum setelah The Merge adalah [**Pemisahan Pengusul-Pembangun (Proposer-Builder Separation/PBS)**](/roadmap/pbs/) dan [**API Pembangun (Builder API)**](https://github.com/ethereum/builder-specs).

### Pemisahan Pengusul-Pembangun {#proposer-builder-separation}

Baik dalam proof-of-work maupun proof-of-stake, sebuah node yang membangun blok mengusulkannya untuk ditambahkan ke rantai kepada node lain yang berpartisipasi dalam konsensus. Blok baru menjadi bagian dari rantai kanonik setelah penambang lain membangun di atasnya (dalam PoW) atau menerima pengesahan dari mayoritas validator (dalam PoS).

Kombinasi peran produsen blok dan pengusul blok inilah yang memunculkan sebagian besar masalah terkait MEV yang dijelaskan sebelumnya. Misalnya, node konsensus diberi insentif untuk memicu reorganisasi rantai dalam [serangan time-bandit](https://www.mev.wiki/attack-examples/time-bandit-attack) guna memaksimalkan pendapatan MEV.

[Pemisahan pengusul-pembangun](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) dirancang untuk memitigasi dampak MEV, terutama pada lapisan konsensus. Fitur utama PBS adalah pemisahan aturan produsen blok dan pengusul blok. Validator masih bertanggung jawab untuk mengusulkan dan memberikan suara pada blok, tetapi kelas entitas khusus yang baru, yang disebut **pembangun blok (block builder)**, ditugaskan untuk mengurutkan transaksi dan membangun blok.

Di bawah PBS, seorang pembangun blok membuat bundel transaksi dan menempatkan tawaran untuk penyertaannya dalam blok Beacon Chain (sebagai "muatan eksekusi"). Validator yang dipilih untuk mengusulkan blok berikutnya kemudian memeriksa berbagai tawaran dan memilih bundel dengan biaya tertinggi. PBS pada dasarnya menciptakan pasar lelang, di mana pembangun bernegosiasi dengan validator yang menjual ruang blok.

Desain PBS saat ini menggunakan [skema commit-reveal](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) di mana pembangun hanya memublikasikan komitmen kriptografi terhadap isi blok (header blok) bersama dengan tawaran mereka. Setelah menerima tawaran pemenang, pengusul membuat proposal blok yang ditandatangani yang mencakup header blok. Pembangun blok diharapkan untuk memublikasikan seluruh badan blok setelah melihat proposal blok yang ditandatangani, dan itu juga harus menerima [pengesahan](/glossary/#attestation) yang cukup dari validator sebelum diselesaikan.

#### Bagaimana pemisahan pengusul-pembangun memitigasi dampak MEV? {#how-does-pbs-curb-mev-impact}

Pemisahan pengusul-pembangun dalam protokol mengurangi efek MEV pada konsensus dengan menghapus ekstraksi MEV dari lingkup validator. Sebaliknya, pembangun blok yang menjalankan perangkat keras khusus akan menangkap peluang MEV ke depannya.

Namun, hal ini tidak sepenuhnya mengecualikan validator dari pendapatan terkait MEV, karena pembangun harus menawar tinggi agar blok mereka diterima oleh validator. Meskipun demikian, dengan validator yang tidak lagi berfokus langsung pada pengoptimalan pendapatan MEV, ancaman serangan time-bandit berkurang.

Pemisahan pengusul-pembangun juga mengurangi risiko sentralisasi MEV. Misalnya, penggunaan skema commit-reveal menghilangkan kebutuhan pembangun untuk memercayai validator agar tidak mencuri peluang MEV atau mengeksposnya ke pembangun lain. Hal ini menurunkan hambatan bagi staker solo untuk mendapatkan keuntungan dari MEV, jika tidak, pembangun akan cenderung lebih menyukai kolam besar dengan reputasi offchain dan melakukan kesepakatan offchain dengan mereka.

Demikian pula, validator tidak perlu memercayai pembangun untuk tidak menahan badan blok atau memublikasikan blok yang tidak valid karena pembayaran bersifat tanpa syarat. Biaya validator tetap diproses meskipun blok yang diusulkan tidak tersedia atau dinyatakan tidak valid oleh validator lain. Dalam kasus terakhir, blok tersebut dibuang begitu saja, memaksa pembangun blok kehilangan semua biaya transaksi dan pendapatan MEV.

### API Pembangun {#builder-api}

Meskipun pemisahan pengusul-pembangun menjanjikan untuk mengurangi efek ekstraksi MEV, penerapannya memerlukan perubahan pada protokol konsensus. Secara khusus, aturan [pilihan fork](/developers/docs/consensus-mechanisms/pos/#fork-choice) di Beacon Chain perlu diperbarui. [API Pembangun](https://github.com/ethereum/builder-specs) adalah solusi sementara yang bertujuan untuk menyediakan implementasi kerja dari pemisahan pengusul-pembangun, meskipun dengan asumsi kepercayaan yang lebih tinggi.

API Pembangun adalah versi modifikasi dari [API Mesin (Engine API)](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) yang digunakan oleh klien lapisan konsensus untuk meminta muatan eksekusi dari klien lapisan eksekusi. Seperti yang diuraikan dalam [spesifikasi validator jujur](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md), validator yang dipilih untuk tugas pengusulan blok meminta bundel transaksi dari klien eksekusi yang terhubung, yang mereka sertakan dalam blok Beacon Chain yang diusulkan.

API Pembangun juga bertindak sebagai middleware antara validator dan klien lapisan eksekusi; tetapi ini berbeda karena memungkinkan validator di Beacon Chain untuk mengambil sumber blok dari entitas eksternal (alih-alih membangun blok secara lokal menggunakan klien eksekusi).

Di bawah ini adalah gambaran umum tentang cara kerja API Pembangun:

1. API Pembangun menghubungkan validator ke jaringan pembangun blok yang menjalankan klien lapisan eksekusi. Seperti dalam PBS, pembangun adalah pihak khusus yang berinvestasi dalam pembangunan blok yang padat sumber daya dan menggunakan strategi berbeda untuk memaksimalkan pendapatan yang diperoleh dari MEV + tip prioritas.

2. Seorang validator (yang menjalankan klien lapisan konsensus) meminta muatan eksekusi beserta tawaran dari jaringan pembangun. Tawaran dari pembangun akan berisi header muatan eksekusi—komitmen kriptografi terhadap isi muatan—dan biaya yang harus dibayarkan kepada validator.

3. Validator meninjau tawaran yang masuk dan memilih muatan eksekusi dengan biaya tertinggi. Menggunakan API Pembangun, validator membuat proposal blok Beacon yang "dibutakan" (blinded) yang hanya menyertakan tanda tangan mereka dan header muatan eksekusi lalu mengirimkannya ke pembangun.

4. Pembangun yang menjalankan API Pembangun diharapkan untuk merespons dengan muatan eksekusi penuh setelah melihat proposal blok yang dibutakan. Hal ini memungkinkan validator untuk membuat blok Beacon yang "ditandatangani", yang mereka sebarkan ke seluruh jaringan.

5. Seorang validator yang menggunakan API Pembangun masih diharapkan untuk membangun blok secara lokal jika pembangun blok gagal merespons dengan cepat, sehingga mereka tidak kehilangan hadiah pengusulan blok. Namun, validator tidak dapat membuat blok lain menggunakan transaksi yang sekarang terungkap atau set lain, karena itu akan sama dengan _ekuivokasi_ (menandatangani dua blok dalam slot yang sama), yang merupakan pelanggaran yang dapat dikenakan pemotongan (slashing).

Contoh implementasi API Pembangun adalah [MEV Boost](https://github.com/flashbots/mev-boost), sebuah peningkatan pada [mekanisme lelang Flashbots](https://docs.flashbots.net/flashbots-auction/overview) yang dirancang untuk mengekang eksternalitas negatif MEV di Ethereum. Lelang Flashbots memungkinkan validator dalam proof-of-stake untuk mengalihdayakan pekerjaan membangun blok yang menguntungkan kepada pihak khusus yang disebut **searcher**.
![Diagram yang menunjukkan alur MEV secara detail](./mev.png)

Searcher mencari peluang MEV yang menguntungkan dan mengirimkan bundel transaksi ke pengusul blok bersama dengan [tawaran harga tertutup](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) untuk disertakan dalam blok. Validator yang menjalankan mev-geth, versi fork dari klien go-ethereum (Geth) hanya perlu memilih bundel dengan keuntungan terbanyak dan menyertakannya sebagai bagian dari blok baru. Untuk melindungi pengusul blok (validator) dari spam dan transaksi yang tidak valid, bundel transaksi melewati **relayer** untuk divalidasi sebelum sampai ke pengusul.

MEV Boost mempertahankan cara kerja yang sama dengan lelang Flashbots asli, meskipun dengan fitur baru yang dirancang untuk peralihan Ethereum ke proof-of-stake. Searcher masih menemukan transaksi MEV yang menguntungkan untuk disertakan dalam blok, tetapi kelas pihak khusus yang baru, yang disebut **pembangun**, bertanggung jawab untuk menggabungkan transaksi dan bundel ke dalam blok. Seorang pembangun menerima tawaran harga tertutup dari searcher dan menjalankan pengoptimalan untuk menemukan urutan yang paling menguntungkan.

Relayer masih bertanggung jawab untuk memvalidasi bundel transaksi sebelum meneruskannya ke pengusul. Namun, MEV Boost memperkenalkan **escrow** yang bertanggung jawab untuk menyediakan [ketersediaan data](/developers/docs/data-availability/) dengan menyimpan badan blok yang dikirim oleh pembangun dan header blok yang dikirim oleh validator. Di sini, seorang validator yang terhubung ke relai meminta muatan eksekusi yang tersedia dan menggunakan algoritma pengurutan MEV Boost untuk memilih header muatan dengan tawaran tertinggi + tip MEV.

#### Bagaimana API Pembangun memitigasi dampak MEV? {#how-does-builder-api-curb-mev-impact}

Manfaat inti dari API Pembangun adalah potensinya untuk mendemokratisasi akses ke peluang MEV. Menggunakan skema commit-reveal menghilangkan asumsi kepercayaan dan mengurangi hambatan masuk bagi validator yang ingin mendapatkan keuntungan dari MEV. Hal ini seharusnya mengurangi tekanan pada staker solo untuk berintegrasi dengan kolam staking besar guna meningkatkan keuntungan MEV.

Implementasi API Pembangun yang meluas akan mendorong persaingan yang lebih besar di antara pembangun blok, yang meningkatkan ketahanan terhadap penyensoran. Saat validator meninjau tawaran dari beberapa pembangun, pembangun yang berniat menyensor satu atau lebih transaksi pengguna harus mengalahkan tawaran semua pembangun non-penyensor lainnya agar berhasil. Hal ini secara dramatis meningkatkan biaya penyensoran pengguna dan mencegah praktik tersebut.

Beberapa proyek, seperti MEV Boost, menggunakan API Pembangun sebagai bagian dari struktur keseluruhan yang dirancang untuk memberikan privasi transaksi kepada pihak tertentu, seperti pedagang yang mencoba menghindari serangan frontrunning/sandwiching. Hal ini dicapai dengan menyediakan saluran komunikasi pribadi antara pengguna dan pembangun blok. Tidak seperti mempool berizin yang dijelaskan sebelumnya, pendekatan ini bermanfaat karena alasan berikut:

1. Keberadaan banyak pembangun di pasar membuat penyensoran menjadi tidak praktis, yang menguntungkan pengguna. Sebaliknya, keberadaan dark pool yang terpusat dan berbasis kepercayaan akan memusatkan kekuasaan di tangan beberapa pembangun blok dan meningkatkan kemungkinan penyensoran.

2. Perangkat lunak API Pembangun bersifat sumber terbuka (open-source), yang memungkinkan siapa saja untuk menawarkan layanan pembangun blok. Ini berarti pengguna tidak dipaksa untuk menggunakan pembangun blok tertentu dan meningkatkan netralitas serta sifat tanpa izin Ethereum. Selain itu, pedagang pencari MEV tidak akan secara tidak sengaja berkontribusi pada sentralisasi dengan menggunakan saluran transaksi pribadi.

## Sumber daya terkait {#related-resources}

- [Dokumentasi Flashbots](https://docs.flashbots.net/)
- [GitHub Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Pelacak dengan statistik waktu nyata untuk relai MEV-Boost dan pembangun blok_

## Bacaan lebih lanjut {#further-reading}

- [What Is Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV and Me](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum is a Dark Forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escaping the Dark Forest](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning the MEV Crisis](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Utas MEV @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Merge ready Flashbots Architecture](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [What Is MEV Boost](https://www.alchemy.com/overviews/mev-boost)
- [Why run mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [The Hitchhikers Guide To Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)