---
title: Jaringan
description: Gambaran umum tentang jaringan Ethereum dan tempat mendapatkan ether (ETH) testnet untuk menguji aplikasi Anda.
lang: id
---

Jaringan [Ethereum](/) adalah kelompok komputer terhubung yang berkomunikasi menggunakan protokol Ethereum. Hanya ada satu Mainnet Ethereum, tetapi jaringan independen yang mematuhi aturan protokol yang sama dapat dibuat untuk tujuan pengujian dan pengembangan. Ada banyak "jaringan" independen yang mematuhi protokol tanpa berinteraksi satu sama lain. Anda bahkan dapat memulainya secara lokal di komputer Anda sendiri untuk menguji kontrak pintar dan aplikasi Web3 Anda.

Akun Ethereum Anda akan berfungsi di berbagai jaringan yang berbeda, tetapi saldo akun dan riwayat transaksi Anda tidak akan terbawa dari jaringan utama Ethereum. Untuk tujuan pengujian, ada baiknya mengetahui jaringan mana yang tersedia dan cara mendapatkan ETH testnet untuk dicoba. Secara umum, untuk pertimbangan keamanan, tidak disarankan untuk menggunakan kembali akun Mainnet di testnet atau sebaliknya.

## Prasyarat {#prerequisites}

Anda harus memahami [dasar-dasar Ethereum](/developers/docs/intro-to-ethereum/) sebelum membaca tentang berbagai jaringan, karena jaringan pengujian (testnet) akan memberi Anda versi Ethereum yang murah dan aman untuk dicoba.

## Jaringan publik {#public-networks}

Jaringan publik dapat diakses oleh siapa saja di dunia yang memiliki koneksi internet. Siapa pun dapat membaca atau membuat transaksi di rantai blok publik dan memvalidasi transaksi yang sedang dieksekusi. Konsensus di antara rekan-rekan (peers) memutuskan penyertaan transaksi dan state jaringan.

### Mainnet Ethereum {#ethereum-mainnet}

Mainnet adalah rantai blok produksi Ethereum publik utama, tempat transaksi bernilai aktual terjadi di buku besar terdistribusi.

Ketika orang-orang dan bursa membahas harga ETH, mereka membicarakan ETH Mainnet.

### Testnet Ethereum {#ethereum-testnets}

Selain Mainnet, ada testnet publik. Ini adalah jaringan yang digunakan oleh pengembang protokol atau pengembang kontrak pintar untuk menguji peningkatan protokol serta potensi kontrak pintar di lingkungan yang mirip produksi sebelum penyebaran ke Mainnet. Anggap saja ini sebagai analogi antara server produksi versus server pementasan (staging).

Anda harus menguji kode kontrak apa pun yang Anda tulis di testnet sebelum menyebarkannya ke Mainnet. Di antara aplikasi terdesentralisasi (dapp) yang terintegrasi dengan kontrak pintar yang ada, sebagian besar proyek memiliki salinan yang disebarkan ke testnet.

Sebagian besar testnet dimulai dengan menggunakan mekanisme konsensus bukti otoritas (PoA) berizin. Ini berarti sejumlah kecil node dipilih untuk memvalidasi transaksi dan membuat blok baru – mempertaruhkan identitas mereka dalam prosesnya. Sebagai alternatif, beberapa testnet menampilkan mekanisme konsensus Bukti Kepemilikan (PoS) terbuka di mana semua orang dapat menguji menjalankan validator, sama seperti Mainnet Ethereum.

ETH di testnet seharusnya tidak memiliki nilai nyata; namun, ada pasar yang dibuat untuk jenis ETH testnet tertentu yang menjadi langka atau sulit diperoleh. Karena Anda memerlukan ETH untuk benar-benar berinteraksi dengan Ethereum (bahkan di testnet), kebanyakan orang mendapatkan ETH testnet secara gratis dari faucet. Sebagian besar faucet adalah aplikasi web tempat Anda dapat memasukkan alamat yang Anda minta untuk dikirimi ETH.

#### Testnet mana yang harus saya gunakan? {#which-testnet-should-i-use}

Dua testnet publik yang saat ini dikelola oleh pengembang klien adalah Sepolia dan Hoodi. Sepolia adalah jaringan bagi pengembang kontrak dan aplikasi untuk menguji aplikasi mereka. Jaringan Hoodi memungkinkan pengembang protokol menguji peningkatan jaringan, dan memungkinkan staker menguji menjalankan validator.

#### Sepolia {#sepolia}

**Sepolia adalah testnet default yang direkomendasikan untuk pengembangan aplikasi**. Jaringan Sepolia menggunakan set validator berizin yang dikendalikan oleh tim klien & pengujian.

##### Sumber Daya
- [Situs Web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucet
- [Faucet Sepolia Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Faucet Sepolia Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Faucet Sepolia Chainstack](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Faucet Ekosistem Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Faucet Sepolia ethfaucet.com](https://ethfaucet.com/networks/ethereum)
- [Faucet Sepolia Web3 Google Cloud](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet Sepolia Infura](https://www.infura.io/faucet)
- [Faucet PoW](https://sepolia-faucet.pk910.de/)
- [Faucet Sepolia QuickNode](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi adalah testnet untuk menguji validasi dan staking. Jaringan Hoodi terbuka bagi pengguna yang ingin menjalankan validator testnet. Oleh karena itu, staker yang ingin menguji peningkatan protokol sebelum disebarkan ke Mainnet harus menggunakan Hoodi.

- Set validator terbuka, staker dapat menguji peningkatan jaringan
- State besar, berguna untuk menguji interaksi kontrak pintar yang kompleks
- Lebih lama untuk sinkronisasi dan membutuhkan lebih banyak penyimpanan untuk menjalankan node

##### Sumber Daya

- [Situs Web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Penjelajah](https://explorer.hoodi.ethpandaops.io/)
- [Sinkronisasi Titik Periksa](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucet

- [Faucet Hoodi Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Faucet Hoodi](https://hoodi.ethpandaops.io/)
- [Faucet PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery adalah jenis testnet unik yang diatur ulang sepenuhnya setiap bulan. State eksekusi dan konsensus kembali ke genesis setiap 28 hari, yang berarti apa pun yang terjadi di testnet bersifat sementara (ephemeral). Hal ini membuatnya ideal untuk pengujian jangka pendek, bootstrap node yang cepat, dan jenis aplikasi 'hello world' yang tidak memerlukan keabadian.

- State selalu segar, pengujian jangka pendek untuk validator dan aplikasi
- Hanya mencakup set kontrak dasar
- Set validator terbuka dan mudah untuk mengakses dana dalam jumlah besar
- Persyaratan node terkecil dan sinkronisasi tercepat, rata-rata &lt;5GB

##### Sumber Daya

- [Situs Web](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Obrolan komunitas](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Penjelajah Beacon](https://beaconlight.ephemery.dev/)
- [Sinkronisasi Titik Periksa](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucet {#faucets}

- [Faucet Bordel](https://faucet.bordel.wtf/)
- [Faucet PoW Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (usang) {#holesky}

Testnet Holesky sudah usang sejak September 2025. Operator staking dan penyedia infrastruktur sebaiknya menggunakan Hoodi untuk pengujian validator.

- [Pengumuman Penutupan Testnet Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog EF, 1-September-2025_
- [Pembaruan Testnet Holesky dan Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _Blog EF, 18-Maret-2025_

### Testnet lapisan 2 {#layer-2-testnets}

[Lapisan 2 (l2)](/layer-2/) adalah istilah kolektif untuk menggambarkan serangkaian solusi penskalaan Ethereum tertentu. Lapisan 2 adalah rantai blok terpisah yang memperluas Ethereum dan mewarisi jaminan keamanan Ethereum. Testnet lapisan 2 biasanya digabungkan erat dengan testnet Ethereum publik.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Sebuah testnet untuk [Arbitrum](https://arbitrum.io/).

##### Sumber Daya

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucet

- [Faucet Arbitrum Sepolia Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Faucet Arbitrum Sepolia Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Faucet Arbitrum Sepolia ethfaucet.com](https://ethfaucet.com/networks/arbitrum)
- [Faucet Arbitrum Sepolia QuickNode](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Sebuah testnet untuk [Optimism](https://www.optimism.io/).

##### Sumber Daya

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucet

- [Faucet Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Faucet Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Faucet Optimism Sepolia ethfaucet.com](https://ethfaucet.com/networks/optimism)
- [Faucet Testnet](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Sebuah testnet untuk [Starknet](https://www.starknet.io).

##### Sumber Daya

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucet

- [Faucet Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Faucet Starknet Sepolia Blast](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Faucet Starknet](https://starknet-faucet.vercel.app/)

## Jaringan privat {#private-networks}

Jaringan Ethereum adalah jaringan privat jika node-nya tidak terhubung ke jaringan publik (yaitu, Mainnet atau testnet). Dalam konteks ini, privat hanya berarti dicadangkan atau diisolasi, bukan dilindungi atau aman.

### Jaringan pengembangan {#development-networks}

Untuk mengembangkan aplikasi Ethereum, Anda pasti ingin menjalankannya di jaringan privat untuk melihat cara kerjanya sebelum menyebarkannya. Mirip dengan cara Anda membuat server lokal di komputer Anda untuk pengembangan web, Anda dapat membuat instans rantai blok lokal untuk menguji aplikasi terdesentralisasi (dapp) Anda. Ini memungkinkan iterasi yang jauh lebih cepat daripada testnet publik.

Ada proyek dan alat yang didedikasikan untuk membantu hal ini. Pelajari lebih lanjut tentang [jaringan pengembangan](/developers/docs/development-networks/).

### Jaringan konsorsium {#consortium-networks}

Proses konsensus dikendalikan oleh serangkaian node yang telah ditentukan sebelumnya yang tepercaya. Misalnya, jaringan privat dari institusi akademik yang dikenal yang masing-masing mengatur satu node, dan blok divalidasi oleh ambang batas penandatangan di dalam jaringan.

Jika jaringan Ethereum publik seperti internet publik, jaringan konsorsium seperti intranet privat.

## <Emoji text="🚉" /> Mengapa testnet Ethereum dinamai berdasarkan stasiun metro? {#why-naming}

Banyak testnet Ethereum dinamai berdasarkan stasiun metro atau kereta api di dunia nyata. Tradisi penamaan ini dimulai sejak awal dan mencerminkan kota-kota global tempat para kontributor pernah tinggal atau bekerja. Ini simbolis, mudah diingat, dan praktis. Sama seperti testnet yang diisolasi dari Mainnet Ethereum, jalur metro berjalan terpisah dari lalu lintas permukaan.

### <Emoji text="🚧" /> Testnet yang umum digunakan dan lama (legacy) {#common-and-legacy-testnets}

- **Sepolia** - Lingkungan yang terhubung dengan metro di Athena, Yunani. Saat ini digunakan untuk pengujian kontrak pintar dan dapp.
- **Hoodi** - Dinamai berdasarkan stasiun metro Hoodi di Bengaluru, India. Digunakan untuk pengujian validator dan peningkatan protokol.
- **Goerli** _(usang)_ - Dinamai berdasarkan Görlitzer Bahnhof di Berlin, Jerman.
- **Rinkeby** _(usang)_ - Dinamai berdasarkan pinggiran kota Stockholm yang memiliki stasiun metro.
- **Ropsten** _(usang)_ - Merujuk pada suatu area dan bekas terminal feri/metro di Stockholm.
- **Kovan** _(usang)_ - Dinamai berdasarkan stasiun MRT Singapura.
- **Morden** _(usang)_ - Dinamai berdasarkan stasiun London Underground. Testnet publik pertama Ethereum.

### <Emoji text="🧪" /> Testnet khusus lainnya {#other-testnets}

Beberapa testnet dibuat untuk pengujian jangka pendek atau khusus peningkatan dan tidak selalu bertema metro:

- **Holesky** _(usang)_ - Dinamai berdasarkan stasiun Holešovice di Praha. Digunakan untuk pengujian validator; usang pada tahun 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(semuanya usang)_ dan **Ephemery** - Dibuat khusus untuk simulasi peningkatan seperti The Merge, Shanghai, atau eksperimen validator. Beberapa nama bersifat regional atau tematik, bukan berbasis metro.

Menggunakan nama stasiun metro membantu pengembang mengidentifikasi dan mengingat testnet dengan cepat tanpa perlu bergantung pada ID rantai numerik. Ini juga mencerminkan budaya Ethereum: praktis, global, dan berpusat pada manusia.

## Alat terkait {#related-tools}

- [Chainlist](https://chainlist.org/) _daftar jaringan EVM untuk menghubungkan dompet dan penyedia ke ID Rantai dan ID Jaringan yang sesuai_
- [Rantai berbasis EVM](https://github.com/ethereum-lists/chains) _Repo GitHub dari metadata rantai yang menggerakkan Chainlist_

## Bacaan lebih lanjut {#further-reading}

- [Proposal: Siklus Hidup Testnet Ethereum yang Dapat Diprediksi](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Evolusi Testnet Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
