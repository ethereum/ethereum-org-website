---
title: Nilai yang dapat diekstrak penambang (MEV)
description: Pengantar nilai yang dapat diekstrak penambang (MEV)
lang: id
---

Maximal (sebelumnya "miner") extractable value (MEV) merujuk pada nilai maksimum yang dapat diekstrak dari produksi blok dalam bentuk nilai kelebihan dari imbalan blok dan biaya gas standar dengan memasukkan, mengecualikan, dan mengubah urutan transaksi dalam sebuah blok.

Dalam konteks [bukti kerja](/developers/docs/consensus-mechanisms/pow/), nilai maksimum yang dapat diekstrak juga disebut "nilai penambang yang dapat diekstrak." Ini karena dalam bukti kerja, para penambang mengontrol pemasukan, pengecualian, dan pengurutan transaksi.

## Prasyarat {#prerequisites}

Pastikan Anda telah mengetahui [transaksi](/developers/docs/transactions/), [blok](/developers/docs/blocks/), [gas](/developers/docs/gas/), dan [penambangan](/developers/docs/consensus-mechanisms/pow/mining/). Pengetahuan tentang [dapp](/dapps/) dan [DeFi](/defi/) juga membantu untuk memahami konsep ini.

## Ekstraksi MEV {#mev-extraction}

Secara teori, MEV sepenuhnya bertambah sesuai jumlah para penambang karena penambang merupakan satu-satunya pihak yang dapat memastikan eksekusi peluang MEV yang menguntungkan (setidaknya dalam bukti kerja saat ini — ini akan berubah setelah [penggabungan](/roadmap/merge/)). Namun, dalam prakteknya, sebagian besar MEV diekstrak oleh para peserta jaringan independen yang disebut sebagai "para pencari." Para pencari menjalankan algoritma kompleks di data blockchain untuk mendeteksi peluang MEV yang menguntungkan dan memiliki bot untuk secara otomatis mengirimkan transaksi yang menguntungkan tersebut ke jaringan.

Para penambang memang mendapatkan sebagian dari jumlah MEV penuh karena para pencari rela membayar harga gas yang tinggi (yang masuk sebagai penghasilan bagi para penambang) sebagai ganti peluang yang lebih tinggi untuk pemasukan transaksi mereka yang menguntungkan dalam sebuah blok. Dengan mengganggap para pencari secara ekonomis rasional, biaya gas yang rela dibayarkan oleh seorang pencari akan berjumlah hingga 100% dari MEV para pencari (karena jika biaya gas lebih tinggi, pencari tersebut akan kehilangan uang).

Namun, untuk beberapa peluang MEV yang sangat kompetitif, seperti [arbitrase DEX](#mev-examples-dex-arbitrage), para pencari mungkin harus membayar hingga 90% atau lebih banyak dari total pendapatan MEV dalam bentuk biaya gas kepada penambang karena begitu banyak orang ingin menjalankan perdagangan arbitrase menguntungkan yang sama. Ini karena satu-satunya cara untuk memastikan bahwa transaksi arbitrase mereka berjalan adalah jika mereka mengirimkan transaksi dengan harga gas tertinggi.

### Permainan golf gas {#mev-extraction-gas-golfing}

Dinamika ini telah membuat keahlian "bermain golf gas" — memrogram transaksi sehingga mereka menggunakan jumlah gas terkecil — menjadi sebuah keunggulan kompetitif, karena memungkinkan para pencari menetapkan harga gas yang lebih tinggi sementara menjaga harga total gas mereka konstan (karena biaya gas = harga gas \* gas terpakai).

Beberapa teknik bermain golf gas yang terkenal termasuk: menggunakan alamat yang dimulai dengan string nol yang panjang (misalnya [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)) karena memakai ruangan yang lebih kecil (dan demikian juga dengan gas) untuk disimpan; dan menyisakan sedikit saldo token [ERC-20](/developers/docs/standards/tokens/erc-20/) dalam kontrak, karena memerlukan lebih banyak gas untuk menginsialisasi sebuah slot penyimpanan (contoh kasus jika saldo 0) daripada untuk memperbarui slot penyimpanan. Menemukan lebih banyak teknik untuk mengurangi pemakaian gas adalah area penelitian aktif di antara para pencari.

### Frontrunner yang digeneralisasi {#mev-extraction-generalized-frontrunners}

Alih-alih memrogram algoritma yang kompleks untuk mendeteksi peluang MEV yang menguntungkan, beberapa pencari menjalankan frontrunner yang digeneralisasi. Frontrunner yang digeneralisasi adalah bot yang mengawasi mempool untuk mendeteksi transaksi yang menguntungkan. Frontrunner akan menyalin kode transaksi yang berpotensi menguntungkan, menggantikan alamat dengan alamat frontrunner, dan menjalankan transaksi secara lokal untuk memeriksa ulang bahwa transaksi yang dimodifikasi menghasilkan keuntungan di alamat frontrunner. Jika transaksi memang menguntungkan, frontrunner akan mengirimkan transaksi yang dimodifikasi dengan alamat yang digantikan dan harga gas yang lebih tinggi, "yang melakukan frontrunning" transaksi asli dan mendapatkan MEV pencari asli.

### Flashbot {#mev-extraction-flashbots}

Flashbot adalah sebuah proyek independen yang memperluas klien go-ethereum dengan layanan yang memungkinkan para pencari mengirimkan transaksi MEV kepada para penambang tanpa menunjukkannya ke mempool publik. Ini mencegah transaksi di-frontrun oleh frontrunner yang digeneralisasi.

Pada saat penulisan ini, sebagian besar transaksi MEV diarahkan melalui Flashbot, yang berarti kinerja frontrunner yang digeneralisasi tidak seefektif seperti di masa lalu.

## Contoh-contoh MEV {#mev-examples}

MEV muncul di blockchain dalam beberapa cara.

### Arbitrase DEX {#mev-examples-dex-arbitrage}

Arbitrase [Bursa terdesentralisasi](/glossary/#dex) (DEX) adalah peluang MEV yang paling sederhana dan paling terkenal. Hasilnya, peluang ini juga merupakan peluang yang paling kompetitif.

Cara kerjanya seperti ini: jika dua DEX menawarkan sebuah token dengan dua harga berbeda, seseorang dapat membeli token itu di DEX dengan harga lebih rendah dan menjualnya di DEX dengan harga lebih tinggi dalam satu transaksi atomik. Berkat mekanisme blockchain, ini merupakan arbitrase sejati dan tanpa resiko.

[Berikut adalah contoh](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) transaksi arbitrase yang menguntungkan ketika seorang pencari mengubah 1.000 ETH menjadi 1.045 ETH dengan mengambil keuntungan dari penawaran harga pasangan ETH/DAI yang berbeda di Uniswap vs. Sushiswap.

### Likuidasi {#mev-examples-liquidations}

Likuidasi protokol peminjaman menyajikan peluang MEV yang terkenal lainnya.

Protokol peminjaman seperti Maker dan Aave berfungsi dengan mengharuskan para pengguna mendepositokan beberapa jenis jaminan (misalnya ETH). Para pengguna kemudian dapat meminjam beragam aset dan token dari pihak lain tergantung pada kebutuhan mereka (misalnya, mereka mungkin meminjam MKR jika mereka ingin memberikan suara di proposal tata kelola MakerDAO atau SUSHI jika mereka ingin mendapatkan hasil dari sebagian biaya perdagangan di Sushiswap) hingga jumlah tertentu sesuai dengan jaminan yang mereka depositokan — misalnya, 30% (persentase pasti kuasa meminjam ditentukan oleh protokol). Para pengguna yang darinya mereka meminjam token lainnya berfungsi sebagai pemberi pinjaman dalam kasus ini.

Sama seperti nilai dari jaminan peminjam berfluktuasi, begitu pula dengan kuasa peminjaman mereka. Jika, karena fluktuasi pasar, nilai dari aset yang dipinjam melebihi anggaplah, 30% dari nilai jaminan mereka (sekali lagi, persentase pastinya ditentukan oleh protokol), protokol umumnya memungkinkan siapa pun untuk melikuidasi jaminan, yang secara cepat membayarkan ke pemberi pinjaman (ini mirip dengan cara kerja [pemanggilan margin](https://www.investopedia.com/terms/m/margincall.asp) dalam keuangan tradisional). Jika dilikuidasi, peminjam biasanya harus membayar biaya likuidasi yang sangat besar, sebagain dari biayanya masuk ke likuidator — yang merupakan tempat di mana peluang MEV masuk.

Para pencari berkompetisi untuk melakukan parse terhadap data blockchain secepat mungkin untuk menentukan peminjam mana yang dapat dilikuidasi dan menjadi yang pertama untuk mengirim transaksi likuidasi dan menerima biaya likuidasi bagi mereka sendiri.

### Perdagangan sandwich {#mev-examples-sandwich-trading}

Perdagangan sandwich adalah metode umum lainnya untuk ekstraksi MEV.

Untuk melakukan sandwich, seorang pencari akan mengawasi mempool untuk perdagangan DEX yang besar. Misalnya, anggaplah seseorang ingin membeli 10.000 UNI dengan DAI di Uniswap. Perdagangan dengan nilai sebesar ini akan berdampak besar terhadap harga pasangan UNI/DAI, yang sangat berpotensi menaikan harga UNI dibandingkan dengan DAI.

Seorang pencari dapat menghitung dampak harga perkiraan dari perdagangan besar ini terhadap harga pasangan UNI/DAI dan mengeksekusi perintah pembelian optimal dengan segera _sebelum_ perdagangan dilakukan, yang membeli UNI dengan harga murah, lalu mengeksekusi perintah jual dengan segera _setelah_ perdagangan dilakukan, yang menjualnya untuk harga yang lebih tinggi yang disebabkan oleh permintaan yang besar.

Namun, melakukan sandwich, lebih beresiko karena tidak bersifat atomik (tidak seperti arbitrase DEX, seperti yang digambarkan di atas) dan cenderung rentan terhadap [serangan salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV NFT {#mev-examples-nfts}

MEV dalam area NFT adalah fenomena yang sedang populer, dan tidak harus menguntungkan.

Namun, karena transaksi NFT terjadi di blockchain yang sama seperti yang digunakan bersama oleh semua transaksi Ethereum lainnya, para pencari dapat menggunakan teknik serupa seperti yang digunakan dalam peluang MEV tradisional dalam pasar NFT juga.

Misalnya, jika ada satu drop NFT populer dan seorang pencari menginginkan NFT tertentu atau rangkaian NFT, mereka dapat memrogram transaksi sedemikian rupa sehingga mereka ada di urutan pertama dalam antrian untuk membeli NFT tersebut, atau mereka dapat membeli seluruh rangkaian NFT dalam satu transaksi. Atau jika sebuah NFT [secara keliru dicantumkan dengan harga yang rendah](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), seorang pencari dapat melakukan frontrun terhadap para pembeli yang lain dan membelinya segera dengan harga yang murah.

Satu contoh menonjol dari MEV NFT terjadi ketika seorang pencari menghabiskan $7 juta untuk [membeli](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) setiap Cryptopunck dengan harga dasar. Seorang peneliti blockchain [menjelaskan di Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) bagaimana pembeli tersebut bekerja dengan seorang penyedia MEV untuk menjaga pembelian mereka tetap rahasia.

### Ekor panjang {#mev-examples-long-tail}

Arbitrase DEX, likuidasi, dan perdagangan sandwich semuanya merupakan peluang MEV yang sangat terkenal dan sepertinya tidak mungkin menguntungkan bagi para pencari baru. Namun, ada ekor panjang yaitu peluang MEV yang kurang dikenal (MEV NFT bisa dibilang merupakan peluang semacam itu).

Para pencari yang baru memulai mungkin bisa mendapatkan lebih banyak kesuksesan dengan mencari MEV di ekor yang lebih panjang ini. [Lowongan pekerjaan MEV](https://github.com/flashbots/mev-job-board) Flashbot mencantumkan beberapa peluang yang seperti ini.

## Efek dari MEV {#effects-of-mev}

MEV tidak semuanya buruk — ada dua konsekuensi baik positif dan negatif dari MEV di Ethereum.

### Dampak baiknya {#effects-of-mev-the-good}

Banyak proyek DeFi mengandalkan para pelaku yang rasional secara ekonomi untuk memastikan kegunaan dan kestabilan protokol mereka. Sebagai contoh, arbitrase DEX memastikan bahwa para pengguna mendapatkan harga yang terbaik, yang paling tepat untuk token mereka, dan protokol pemberi pinjaman mengandalkan proses likuidasi yang cepat ketika kemampuan membayar para peminjam di bawah rasio jaminan untuk memastikan para pemberi pinjaman mendapatkan pembayaran kembali.

Tanpa para pencari rasional yang mencari dan memperbaiki ketidakefisienan ekonomi dan memanfaatkan insentif ekonomi protokol, protokol DeFi dan dapp secara umum mungkin tidak akan sekokoh seperti hari ini.

### Dampak buruknya {#effects-of-mev-the-bad}

Pada lapisan aplikasi, beberapa bentuk MEV, seperti perdagangan sandwich, menyebabkan pengalaman yang jelas lebih buruk bagi para pengguna. Para pengguna yang di-sandwich menghadapi slippage yang meningkat dan eksekusi perdagangan mereka yang lebih buruk.

Pada lapisan jaringan, frontrunner yang digeneralisasi dan pelelangan harga gas yang di dalamnya mereka sering terlibat (ketika dua atau bebrapa frontrunner berkompetisi agar transaksi mereka dimasukkan di blok berikutnya, secara progresif menaikkan harga gas transaksi mereka sendiri) menyebabkan kemacetan jaringan dan harga gas yang tinggi bagi orang lain yang mencoba menjalankan transaksi reguler.

Di luar dari apa yang terjadi _dalam_ blok, MEV dapat berdampak merusak _di antara_ blok. Jika MEV yang tersedia dalam sebuah blok secara signifikan melebihi imbalan blok standar, para penambang mungkin terdorong untuk menambang kembali blok dan mendapatkan MEV untuk diri mereka sendiri, yang menyebabkan reorganisasi blockchain dan ketidakstabilan konsensus.

Kemungkinan reorganisasi blockchain ini telah [dianalisa sebelumnya di blockchain Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Karena imbalan blok Bitcoin berkurang setengah dan biaya transaksi membuat bagian imbalan blok yang semakin besar, masalahnya muncul ketika dianggap rasional secara ekonomi oleh para penambang untuk melepaskan imbalan blok berikutnya dan sebagai gantinya menambang kembali blok sebelumnya dengan harga pembayaran yang lebih tinggi. Dengan pertumbuhan MEV, situasi yang sama ini dapat terjadi di Ethereum, yang mengancam integritas blockchain.

## Keadaan MEV saat ini {#state-of-mev}

Ekstraksi MEV membengkak pada awal 2021, yang menyebabkan harga gas yang sangat tinggi dalam beberapa bulan pertama. Kemunculan pengiriman MEV Flashbot telah mengurangi keefektifan frontrunner yang digeneralisasi dan telah membuat pelelangan harga gas menjadi off-chain, yang menurunkan harga gas bagi para pengguna umum.

Meskipun banyak pencari masih menghasilkan cukup banyak uang dari MEV, seiring dengan peluang yang menjadi lebih dikenal dan semakin banyak pencari berkompetisi untuk peluang yang sama, para penambang akan mendapatkan semakin banyak pendapatan MEV total (karena jenis pelelangan gas yang sama seperti yang digambarkan di atas juga terjadi di Flashbot, sekalipun secara privat, dan para penambang akan mendapatkan pendapatan gas sebagai hasilnya). MEV juga tidak unik bagi Ethereum, dan karena peluangnya semakin kompetitif di Ethereum, para pencari berpindah ke blockchain pengganti seperti Binance Smart Chain, di mana peluang MEV serupa seperti yang di Ethereum ada dengan lebih sedikit kompetisi.

Seiring pertumbuhan dan peningkatan kepopuleran DeFi, MEV mungkin akan segera melebihi imbalan blok Ethereum dasar. Namun, itu menghasilkan perkembangan kemungkinan untuk penambangan kembali blok yang egois dan ketidakstabilan konsensus. Beberapa menganggap ini sebagai ancaman eksistensial terhadap Ethereum, dan mencegah penambangan yang egois adalah bidang penelitian yang aktif di teori protokol Ethereum. Salah satu solusi yang saat ini sedang dianalisa adalah [memudahkan imbalan MEV](https://ethresear.ch/t/committee-driven-mev-smoothing/10408).

## Sumber daya terkait {#related-resources}

- [GitHub Flashbot](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _Dasbor dan penjelajah transaksi langsung untuk transaksi MEV_

## Bacaan lebih lanjut {#further-reading}

- [Apa itu Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV dan Saya](https://research.paradigm.xyz/MEV)
- [Ethereum merupakan sebuah Dark Forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Melarikan diri dari Dark Forest](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbot: Melakukan frontrunning terhadap Krisis MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Thread MEV @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
