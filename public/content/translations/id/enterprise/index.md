---
title: Perusahaan di Jaringan Utama Ethereum
description: Panduan, artikel, dan peralatan tentang aplikasi perusahaan di blockchain Ethereum publik
lang: id
---

# Jaringan Utama Ethereum untuk perusahaan {#ethereum-for-enterprise}

Aplikasi blockchain membantu perusahaan untuk:

- Meningkatkan kepercayaan dan mengurangi biaya koordinasi di antara pihak perusahaan
- Meningkatkan akuntabilitas dan efisiensi operasional jaringan bisnis
- Membangun model bisnis baru dan peluang penciptaan nilai
- Secara kompetitif memastikan organisasi mereka tetap akan relevan di masa depan

Aplikasi blockchain perusahaan bisa dibangun di [Jaringan Utama](/glossary/#mainnet) Ethereum publik tanpa izin, atau di blockchain privat yang didasarkan pada teknologi Ethereum. Temukan Informasi lebih lanjut tentang [rantai Enterprise Ethereum privat](/enterprise/private-ethereum/).

## Ethereum publik vs privat {#private-vs-public}

Hanya ada satu Jaringan Utama Ethereum publik. Aplikasi yang dibangun di Jaringan Utama dapat bekerja sama, mirip seperti aplikasi yang dibangun di Internet yang dapat terhubung satu sama lain, memanfaatkan potensi penuh dari blockchain terdesentralisasi.

Banyak bisnis dan konsorsium telah menyebarkan blockchain pribadi yang diizinkan untuk aplikasi spesifik berdasarkan teknologi Ethereum.

### Perbedaan utama {#key-differences}

- Keamanan/Kekekalan Blockchain - Ketahanan blockchain terhadap gangguan ditentukan oleh algoritma konsensusnya. Jaringan Utama Ethereum diamankan oleh interaksi ribuan node independen yang dijalankan oleh individu dan penambang di seluruh dunia. Rantai privat biasanya memiliki sejumlah kecil node yang dikendalikan oleh satu atau beberapa organisasi; node tersebut dapat dikontrol dengan ketat, tapi hanya sedikit yang harus dikompromikan untuk menulis ulang rantai atau melakukan transaksi penipuan.
- Kinerja - Karena rantai Enterprise Ethereum privat dapat menggunakan node berkinerja tinggi dengan persyaratan perangkat keras khusus dan algoritma konsensus berbeda seperti Bukti Otoritas, rantai dapat mencapai throughput transaksi yang lebih tinggi pada lapisan dasar (Lapisan 1). Pada Jaringan Utama Ethereum, throughput tinggi dapat dicapai dengan penggunaan [solusi penskalaan Lapisan 2](/developers/docs/scaling/#layer-2-scaling).
- Biaya - Biaya untuk mengoperasikan rantai privat terutama tercermin dalam usaha keras untuk menyiapkan dan mengelola rantai, dan server untuk menjalankannya. Meskipun tidak ada biaya untuk terhubung ke Jaringan Utama Ethereum, ada biaya gas untuk setiap transaksi yang harus dibayar dalam ether. Pemancar transaksi (alias Stasiun Gas) sedang dikembangkan untuk menghilangkan perlunya melibatkan pengguna akhir dan bahkan perusahaan, agar ether dapat digunakan secara langsung dalam transaksi. Beberapa [analisis](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) telah menunjukkan bahwa total biaya untuk mengoperasikan satu aplikasi bisa lebih rendah di Jaringan Utama ketimbang menjalankannya di rantai privat.
- Pemberian Izin Node - Hanya node yang disahkan dapat bergabung dalam rantai privat. Siapa pun dapat menyiapkan node di Jaringan Utama Ethereum.
- Privasi - Akses ke data yang ditulis di rantai privat bisa dikendalikan dengan membatasi akses ke jaringan, dan dengan lebih halus menggunakan kontrol akses dan transaksi privat. Semua data yang ditulis di Lapisan 1 Jaringan Utama dapat dilihat oleh siapa pun, sehingga informasi sensitif harus disimpan dan ditransmisikan secara off-chain, atau dienkripsi. Pola desain yang mendukung hal ini sedang populer (contohnya, Baseline, Aztec), serta solusi Lapisan 2 yang dapat menjaga data tetap terbagi dan berada di luar Lapisan 1.

### Mengapat membangun di Jaringan Utama Ethereum {#why-build-on-ethereum-mainnet}

Perusahaan telah bereksperimen dengan teknologi blockchain sejak sekitar 2016, ketika proyek Hyperledger, Quorum, dan Corda diluncurkan. Fokusnya terutama pada blockchain perusahaan privat yang diizinkan, tapi sejak awal 2019 ada perubahan dalam pemikiran tentang blockchain publik vs privat untuk aplikasi bisnis. Sebuah [survei](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf) yang diadakan oleh Forrester menunjukkan bahwa "Responden survey ... melihat potensi ini, dengan 75% mengatakan bahwa mereka kemungkinan besar akan memanfaatkan blockchain publik di masa depan, dan hampir sepertiga mengatakan mereka sangat mungkin melakukan itu". Paul Brody dari EY telah [membahas](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) tentang keuntungan membangun pada blockchain publik, yang (bergantung pada aplikasi) bisa mencakup keamanan/kekebalan yang lebih kuat, transparansi, biaya total kepemilikan yang lebih rendah, dan kemampuan untuk bekerja sama dengan semua aplikasi lainnya yang juga ada di Jaringan Utama (efek jaringan). Berbagi kerangka acuan umum antar perusahaan menghindari munculnya sejumlah silo terisolasi yang tidak perlu yang tidak bisa saling berkomunikasi dan berbagi atau sinkron satu sama lain.

Pengembangan lainnya yang menggeser fokus ke blockchain publik adalah [Lapisan 2](/developers/docs/scaling/#layer-2-scaling). Lapisan 2 terutama untuk kategori teknologi skalabilitas yang membuat aplikasi throughput tinggi mungkin ada di rantai publik. Tetapi solusi Lapisan 2 juga bisa [mengatasi beberapa tantangan lainnya yang mendorong pengembang perusahaan memilih rantai privat di masa lalu](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

Protokol Baseline adalah salah satu proyek utama yang menentukan satu protokol yang memungkinkan kolaborasi rahasia dan rumit di antara perusahaan tanpa meninggalkan data sensitif apa pun secara on-chain. Proyek ini telah mendapatkan [momentum](https://www.oasis-open.org/2020/08/26/baseline-protocol-achieves-key-milestone-with-release-of-v0-1-implementation-for-enterprise/) signifikan sepanjang 2020.

## Sumber daya pengembang perusahaan {#enterprise-developer-resources}

### Organisasi {#organizations}

Beberapa usaha kolaboratif untuk membuat Ethereum ramah bagi perusahaan telah dikerjakan oleh organisasi berbeda:

- [Enterprise Ethereum Alliance (EEA)](https://entethalliance.org/) EEA memungkinkan organisasi untuk mengadopsi dan menggunakan teknologi Ethereum dalam operasi bisnis harian mereka. EEA memberdayakan ekosistem Ethereum untuk mengembangkan peluang bisnis, menggerakkan adopsi industri, serta belajar dan berkolaborasi satu sama lainnya. Grup kerja Jaringan Utama EEA adalah tempat penting untuk perwakilan dari kelompok perusahaan yang tertarik dalam membangun di Jaringan Utama Ethereum publik, serta anggota komunitas Ethereum yang ingin mendukung mereka.
- [Ethereum OASIS Open Project](https://github.com/ethereum-oasis/oasis-open-project) Proyek Terbuka OASIS Ethereum adalah Proyek Terbuka OASIS yang ada untuk menyediakan forum netral bagi beragam pemangku kepentingan dengan tujuan membuat spesifikasi kualitas tinggi yang mendukung kelangsungan, kemampuan pertukaran informasi, dan kemudahan integrasi Ethereum. Proyek ini dimaksudkan untuk mengembangkan dokumentasi yang jelas, standar terbuka, dan berkualitas tinggi, serta membagikan rangkaian uji yang mendukung fitur baru dan penyempurnaan protokol Ethereum.
- [Baseline Project](https://www.baseline-protocol.org/) Protokol Baseline adalah sebuah inisiatif sumber terbuka yang menggabungkan kemajuan kriptografi, layanan pesan, dan blockchain untuk menghasilkan proses bisnis yang aman dan privat dengan biaya rendah melalui Jaringan Utama Ethereum publik. Protokol ini memungkinkan kolaborasi rahasia dan kompleks di antara perusahaan tanpa meninggalkan data sensitif apa pun secara on-chain. Proyek Baseline adalah sub-proyek dari Proyek Terbuka OASIS Ethereum, dan dikoordinasikan oleh Komite Pengarah Teknis Baseline.

### Produk dan layanan {#products-and-services}

- [Alchemy](https://www.alchemy.com/) _menyediakan layanan dan peralatan API untuk membangun dan mengawasi aplikasi di Ethereum_
- [Blockapps](https://blockapps.net/) _implementasi protokol Enterprise Ethereum, peralatan, dan API yang membentuk platform STRATO_
- [Chainstack](https://chainstack.com/) _infrastruktur jaringan utama dan testnet Ethereum yang dihost di cloud pelanggan publik dan terisolasi_
- [ConsenSys](https://consensys.io/) _menyediakan daftar produk dan peralatan untuk membangun di Ethereum, maupun layanan konsultasi dan pengembangan kustom_
- [Envision Blockchain](https://envisionblockchain.com/) _menyediakan layanan konsultasi dan pengembangan yang berfokus pada perusahaan yang dikhususkan di Jaringan Utama Ethereum_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _menyediakan alur kerja pengadaan dengan menerbitkan RFQ, kontrak, pesanan pembelian, dan faktur di keseluruhan jaringan partner bisnis terpercaya Anda_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _sebuah klien Ethereum sumber terbuka berfokus pada perusahaan yang dikembangkan di bawah lisensi Apache 2.0 dan ditulis dalam bahasa Java_
- [Infura](https://infura.io/) _akses API yang dapat diukur untuk jaringan Ethereum dan IPFS_
- [Provide](https://provide.services/) _infrastruktur dan API untuk aplikasi Web3 Perusahaan_
- [Unibright](https://unibright.io/) _sekelompok spesialis, arstitek, pengembang, dan konsultan blockchain dengan pengalaman 20+ tahun dalam proses dan integrasi bisnis_

### Peralatan dan pustaka {#tooling-and-libraries}

- [Alethio](https://explorer.aleth.io/) _Platform Analisis Data Ethereum_
- [Epirus](https://www.web3labs.com/epirus) _sebuah platform untuk mengembangkan, menggunakan, dan mengawasi aplikasi blockchain oleh Web3 Labs_
- [Ernst & Young's ‘Nightfall'](https://github.com/EYBlockchain/nightfall) _sebuah kotak peralatan untuk transaksi privat_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _sebuah aplikasi penandatanganan transaksi untuk digunakan dengan penyedia web3_
- [Tenderly](https://tenderly.co/) _sebuah Platform Data yang menyediakan analitik, peringatan, dan pengawasan dalam waktu sebenarnya dengan dukungan untuk jaringan privat._

### Solusi skalabilitas {#scalability-solutions}

[Lapisan 2](/developers/docs/scaling/#layer-2-scaling) adalah serangkaian teknologi atau sistem yang beroperasi di atas Ethereum (Lapisan 1), mewarisi ciri - ciri keamanan dari Lapisan 1, dan menyediakan kapasitas (keluaran) pemrosesan transaksi lebih banyak, biaya transaksi lebih rendah (biaya pengoperasian), dan konfirmasi transaksi yang lebih cepat daripada Lapisan 1. Solusi penskalaan Lapisan 2 diamankan oleh Lapisan 1, tetapi memungkinkan aplikasi blockchain menangani lebih banyak pengguna atau aksi atau data daripada yang bisa diakomodasi Lapisan 1. Banyak dari mereka memanfaatkan kemajuan terkini dalam kriptografi dan bukti zero-knowledge (ZK) untuk memaksimalkan kinerja dan keamanan.

Membangun aplikasi Anda di atas solusi penskalaan Lapisan 2 bisa membantu [menyelesaikan banyak masalah yang sebelumnya membuat perusahaan membangun di blockchain privat](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), namun tetap mempertahankan keuntungan dari membangun di Jaringan Utama.

Contoh solusi L2 yang siap dipakai atau yang akan segera dimasukkan:

- Rollup Optimistic (data on chain, bukti penipuan)
  - [Optimism](https://optimism.io/)
  - [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
  - [Fuel Network](https://fuel.sh)
- Rollup ZK (data on chain, bukti validitas ZK)
  - [Loopring](https://loopring.org)
  - [Starkware](https://starkware.co)
  - [Matter Labs ZKsync](https://matter-labs.io/)
  - [Aztec 2.0](https://aztec.network/)
- Validium (data off chain, bukti validitas ZK)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkPorter](https://matter-labs.io/)
- Plasma (data off chain, bukti penipuan)
  - [OMG Network](https://omg.network/)
  - [Gazelle](https://gzle.io)
  - [Matic Network](https://matic.network/)
  - [LeapDAO](https://ipfs.leapdao.org/)
- Kanal state
  - [Connext](https://connext.network/)
  - [Kchannels](https://www.kchannels.io/)
  - [Perun](https://perun.network)
  - [Raiden](https://raiden.network/)
- Sidechain
  - [Skale](https://skale.network)
  - [POA Network](https://www.poa.network/)
- Solusi hibrida yang menggabungkan properti dari berbagai kategori
  - [Celer](https://celer.network)

## Aplikasi perusahaan yang ada di Jaringan Utama {#enterprise-live-on-mainnet}

Berikut adalah beberapa aplikasi perusahaan yang telah digunakan pada Jaringan Utama Ethereum publik

### Pembayaran {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _membayar pengguna untuk perhatian mereka terhadap iklan dan pengguna bisa membayar penerbit untuk mendukung mereka, lewat Token Perhatian Dasar._
- [hCaptcha](https://www.hcaptcha.com/) _sistem CAPTCHA pencegahan Bot yang membayar operator situs web atas pekerjaan yang diselesaikan oleh pengguna untuk menamai data yang digunakan untuk pembelajaran mesin. Sekarang digunakan oleh Cloudflare._
- [Audius](https://audius.co/) _sebuah layanan streaming yang menghubungkan penggemar musik langsung dengan para artis, dan memungkinkan artis dibayar secara penuh oleh penggemar mereka, secara langsung dan saat itu juga untuk setiap stream_
- [EthereumAds](https://ethereumads.com/) _memungkinkan operator situs web menjual ruang iklan dan memperoleh bayaran melalui Ethereum_

### Keuangan {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _penerbitan dan penyelesaian obligasi_
- [Societe Generale](https://www.societegenerale.com/en/news/newsroom/societe-generale-performs-first-financial-transaction-settled-central-bank-digital) _penerbitan obligasi_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _penawaran dan tokenisasi obligasi untuk FAT Brands_
- [Sila](https://silamoney.com/) _perbankan dan infrastructure-as-a-service pembayaran ACH_
- [Tinlake](https://tinlake.centrifuge.io/) _pembiayaan piutang melalui aset dunia nyata yang ditokenisasi seperti faktur, hipotek, atau royalti streaming_
- [Kratos](https://triterras.com/kratos) _platform perdagangan komoditas dan pembiayaan perdagangan yang menghubungkan dan memungkinkan penjual komoditas untuk berdagang dan mendapatkan modal dari pemberi pinjaman secara langsung dan daring_
- [Fasset](https://www.fasset.com/) _sebuah platform untuk mendukung infrastruktur berkelanjutan_
- [Taurus](https://www.taurushq.com/) _menerbitkan sekuritas yang diberi token_

### Notarisasi data {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _detail pinjaman terakhir di-hash dan dicatat di Jaringan Utama_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _agensi berita terbesar di Italia yang melawan berita palsu dan memungkinkan pembaca memverifikasi sumber berita dengan mencatatnya di Jaringan Utama_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _mencatat rilis berita di Ethereum untuk memastikan akuntabilitas dan kepercayaan perusahaan_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _mencatat sumber dan riwayat perbaikan pengawasan di Ethereum_
- [EthSign](https://ethsign.xyz/) _mencatat dokumen elektronik yang telah ditandatangani pada blockchain Ethereum_

### Rantai pasokan {#supply-chain}

- [Morpheus.network](https://morpheus.network/) _platform otomatisasi rantai pasokan yang mengimplementasikan gabungan rantai privat dengan data ternotarisasi di Jaringan Utama Ethereum, dan digunakan oleh perusahaan seperti distributor makanan, minyak, dan gas di Kanada yaitu Federated Co-op Ltd. dan penyedia makanan binatang peliharaan di Argentina Vitalcan_
- [Minespider](https://www.minespider.com/) _pelacakan rantai pasokan_
- [ShipChain](https://shipchain.io) _sidechain Ethereum publik dan sistem perusahaan untuk visibilitas dan kepercayaan rantai pasokan, khususnya untuk logistik multimodal_
- [Follow Our Fibre](https://www.followourfibre.com) _keterlacakan rantai pasokan viscose_
- [Pengadaan Jaringan EY OpsChain](https://blockchain.ey.com/products/contract-manager) _memungkinkan perusahaan terlibat dalam sebuah alur kerja pengadaan dengan menerbitkan RFQ, kontrak, pemesanan pembelian, dan faktur di keseluruhan jaringan dari rekan bisnis terpercaya Anda_
- [Treum](https://treum.io/) _menghadirkan transparansi, keterlacakan, dan kemampuan untuk diperdagangan pada rantai pasokan, menggunakan teknologi blockchain_
- [TradeTrust](https://www.tradetrust.io/) _memverifikasi electronic Bills of Lading (eBLs) untuk pengiriman internasional_

### Kredensial dan sertifikasi {#credentials}

- [Utah Counties](http://www.utahcounty.gov/Dept/ClerkAud/DigitalCertCopy.html) _menerbitkan surat nikah digital di Ethereum_
- [Two Italian high schools](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _diploma digital yang diterbitkan di Jaringan Utama Ethereum_
- [University of St. Gallen](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _proyek percontohan untuk memverifikasi gelar oleh sebuah universitas di Swiss_
- [Malta](https://cointelegraph.com/news/malta-to-store-education-certificates-on-a-blockchain) _semua sertifikat pendidikan yang tercatat di Jaringan Utama oleh [Hyland](https://www.learningmachine.com/)_
- [Pohang University of Science and Technology](https://www.theblockcrypto.com/linked/55176/south-korean-university-issues-blockchain-stored-diplomas-amid-the-spread-of-the-coronavirus) _universitas Korea Selatan menerbitkan diploma yang tersimpan di blockchain bagi lulusan barunya_
- [OpenCerts](https://opencerts.io/) _menerbitkan kredensial pendidikan blockchain di Singapura_
- [BlockCerts](https://www.blockcerts.org/) _mengembangkan sebuah standar terbuka untuk kredensial blockchain_
- [SkillTree](http://skilltree.org/) _pelatihan keahlian dan sertifikasi daring yang bisa dikonfigurasi dengan pemicu batas waktu atau ketergantungan pada keahlian lain_

### Utilitas {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _pembayaran pemakaian listrik_

Jika Anda ingin menambahkan daftar ini, silahkan baca [instruksi untuk berkontribusi](/contributing/).
