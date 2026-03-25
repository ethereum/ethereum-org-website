---
title: Jaringan
description: Gambaran umum tentang jaringan Ethereum dan di mana mendapatkan ether (ETH) testnet untuk menguji aplikasi Anda.
lang: id
---

[Jaringan](/) Ethereum adalah kelompok komputer terhubung yang berkomunikasi menggunakan protokol Ethereum. Hanya ada satu Mainnet Ethereum, tetapi jaringan independen yang mematuhi aturan protokol yang sama dapat dibuat untuk tujuan pengujian dan pengembangan. Ada banyak "jaringan" independen yang mematuhi protokol tanpa berinteraksi satu sama lain. Anda bahkan dapat memulai satu secara lokal di komputer Anda sendiri untuk menguji kontrak pintar dan aplikasi web3 Anda.

Akun Ethereum Anda akan berfungsi di berbagai jaringan yang berbeda, tetapi saldo akun dan riwayat transaksi Anda tidak akan terbawa dari jaringan utama Ethereum. Untuk tujuan pengujian, sangat berguna untuk mengetahui jaringan mana yang tersedia dan bagaimana cara mendapatkan ETH testnet untuk dicoba. Secara umum, untuk pertimbangan keamanan, tidak disarankan untuk menggunakan kembali akun mainnet di testnet atau sebaliknya.

## Prasyarat {#prerequisites}

Anda harus memahami [dasar-dasar Ethereum](/developers/docs/intro-to-ethereum/) sebelum membaca tentang berbagai jaringan, karena jaringan pengujian (testnet) akan memberi Anda versi Ethereum yang murah dan aman untuk dicoba.

## Jaringan publik {#public-networks}

Jaringan publik dapat diakses oleh siapa saja di dunia yang memiliki koneksi internet. Siapa pun dapat membaca atau membuat transaksi di blockchain publik dan memvalidasi transaksi yang sedang dieksekusi. Konsensus di antara rekan-rekan (peers) memutuskan penyertaan transaksi dan status jaringan.

### Mainnet Ethereum {#ethereum-mainnet}

Mainnet adalah blockchain produksi Ethereum publik utama, di mana transaksi bernilai aktual terjadi di buku besar terdistribusi.

Ketika orang-orang dan bursa membahas harga ETH, mereka berbicara tentang ETH Mainnet.

### Testnet Ethereum {#ethereum-testnets}

Selain Mainnet, ada testnet publik. Ini adalah jaringan yang digunakan oleh pengembang protokol atau pengembang kontrak pintar untuk menguji peningkatan protokol serta potensi kontrak pintar di lingkungan yang mirip produksi sebelum diterapkan ke Mainnet. Anggap saja ini sebagai analogi antara server produksi versus server staging.

Anda harus menguji kode kontrak apa pun yang Anda tulis di testnet sebelum menerapkannya ke Mainnet. Di antara dapps yang terintegrasi dengan kontrak pintar yang ada, sebagian besar proyek memiliki salinan yang diterapkan ke testnet.

Sebagian besar testnet dimulai dengan menggunakan mekanisme konsensus proof-of-authority berizin. Ini berarti sejumlah kecil node dipilih untuk memvalidasi transaksi dan membuat blok baru – mengunci identitas mereka dalam prosesnya. Sebagai alternatif, beberapa testnet menampilkan mekanisme konsensus proof-of-stake terbuka di mana semua orang dapat menguji menjalankan validator, sama seperti Mainnet Ethereum.

ETH di testnet seharusnya tidak memiliki nilai nyata; namun, ada pasar yang dibuat untuk jenis ETH testnet tertentu yang menjadi langka atau sulit didapat. Karena Anda memerlukan ETH untuk benar-benar berinteraksi dengan Ethereum (bahkan di testnet), kebanyakan orang mendapatkan ETH testnet secara gratis dari faucet. Sebagian besar faucet adalah aplikasi web di mana Anda dapat memasukkan alamat yang Anda minta agar ETH dikirimkan kepadanya.

#### Testnet mana yang harus saya gunakan?

Dua testnet publik yang saat ini dikelola oleh pengembang klien adalah Sepolia dan Hoodi. Sepolia adalah jaringan bagi pengembang kontrak dan aplikasi untuk menguji aplikasi mereka. Jaringan Hoodi memungkinkan pengembang protokol menguji peningkatan jaringan, dan memungkinkan staker menguji menjalankan validator.

#### Sepolia {#sepolia}

**Sepolia adalah testnet default yang direkomendasikan untuk pengembangan aplikasi**. Jaringan Sepolia menggunakan set validator berizin yang dikendalikan oleh tim klien & pengujian.

##### Sumber daya

- [Situs Web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucet

- [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Chain Platform Sepolia Faucet](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Chainstack Sepolia Faucet](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Ethereum Ecosystem Faucet](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [ethfaucet.com Sepolia Faucet](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet)
- [PoW Faucet](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi adalah testnet untuk menguji validasi dan mengunci (staking). Jaringan Hoodi terbuka bagi pengguna yang ingin menjalankan validator testnet. Oleh karena itu, staker yang ingin menguji peningkatan protokol sebelum diterapkan ke mainnet harus menggunakan Hoodi.

- Set validator terbuka, staker dapat menguji peningkatan jaringan
- Status yang besar, berguna untuk menguji interaksi kontrak pintar yang kompleks
- Lebih lama untuk disinkronkan dan membutuhkan lebih banyak penyimpanan untuk menjalankan node

##### Sumber daya

- [Situs Web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Penjelajah](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucet

- [Chain Platform Hoodi Faucet](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi Faucet](https://hoodi.ethpandaops.io/)
- [PoW Faucet](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery adalah jenis testnet unik yang sepenuhnya diatur ulang setiap bulan. Status eksekusi dan konsensus kembali ke genesis setiap 28 hari, yang berarti apa pun yang terjadi di testnet bersifat sementara (ephemeral). Hal ini membuatnya ideal untuk pengujian jangka pendek, bootstrap node yang cepat, dan jenis aplikasi 'hello world' yang tidak memerlukan keabadian.

- Status yang selalu segar, pengujian jangka pendek untuk validator dan aplikasi
- Hanya mencakup set kontrak dasar
- Set validator terbuka dan mudah untuk mengakses dana dalam jumlah besar
- Persyaratan node terkecil dan sinkronisasi tercepat, rata-rata &lt;5GB

##### Sumber daya

- [Situs Web](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [Obrolan komunitas](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Penjelajah Beacon](https://beaconlight.ephemery.dev/)
- [Checkpoint Sync](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucet

- [Bordel Faucet](https://faucet.bordel.wtf/)
- [Pk910 PoW Faucet](https://ephemery-faucet.pk910.de/)

#### Holesky (usang) {#holesky}

Testnet Holesky sudah usang (deprecated) per September 2025. Operator staking dan penyedia infrastruktur sebaiknya menggunakan Hoodi untuk pengujian validator.

- [Pengumuman Penutupan Testnet Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog EF, 1-September-2025_
- [Pembaruan Testnet Holesky dan Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _Blog EF, 18-Maret-2025_

### Testnet Layer 2 {#layer-2-testnets}

[Layer 2 (L2)](/layer-2/) adalah istilah kolektif untuk menggambarkan serangkaian solusi peningkatan (scaling) Ethereum tertentu. Layer 2 adalah blockchain terpisah yang memperluas Ethereum dan mewarisi jaminan keamanan Ethereum. Testnet layer 2 biasanya digabungkan secara erat dengan testnet Ethereum publik.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Sebuah testnet untuk [Arbitrum](https://arbitrum.io/).

##### Sumber daya

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucet

- [Alchemy Arbitrum Sepolia Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia faucet](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia Faucet](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Sebuah testnet untuk [Optimism](https://www.optimism.io/).

##### Sumber daya

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucet

- [Alchemy Faucet](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlink Faucet](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia Faucet](https://ethfaucet.com/networks/optimism)
- [Testnet Faucet](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Sebuah testnet untuk [Starknet](https://www.starknet.io).

##### Sumber daya

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucet

- [Alchemy Faucet](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia Faucet](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet Faucet](https://starknet-faucet.vercel.app/)

## Jaringan privat {#private-networks}

Jaringan Ethereum adalah jaringan privat jika node-nya tidak terhubung ke jaringan publik (yaitu, Mainnet atau testnet). Dalam konteks ini, privat hanya berarti dicadangkan atau diisolasi, bukan dilindungi atau aman.

### Jaringan pengembangan {#development-networks}

Untuk mengembangkan aplikasi Ethereum, Anda pasti ingin menjalankannya di jaringan privat untuk melihat cara kerjanya sebelum menerapkannya. Mirip dengan cara Anda membuat server lokal di komputer Anda untuk pengembangan web, Anda dapat membuat instans blockchain lokal untuk menguji dapp Anda. Hal ini memungkinkan iterasi yang jauh lebih cepat daripada testnet publik.

Ada proyek dan alat yang didedikasikan untuk membantu hal ini. Pelajari lebih lanjut tentang [jaringan pengembangan](/developers/docs/development-networks/).

### Jaringan konsorsium {#consortium-networks}

Proses konsensus dikendalikan oleh serangkaian node yang telah ditentukan sebelumnya yang tepercaya. Misalnya, jaringan privat dari institusi akademik yang dikenal yang masing-masing mengatur satu node, dan blok divalidasi oleh ambang batas penandatangan di dalam jaringan.

Jika jaringan Ethereum publik seperti internet publik, jaringan konsorsium seperti intranet privat.

## <Emoji text="🚉" /> Mengapa testnet Ethereum dinamai berdasarkan stasiun metro? {#why-naming}

Banyak testnet Ethereum dinamai berdasarkan stasiun metro atau kereta api di dunia nyata. Tradisi penamaan ini dimulai sejak awal dan mencerminkan kota-kota global tempat para kontributor pernah tinggal atau bekerja. Ini bersifat simbolis, mudah diingat, dan praktis. Sama seperti testnet yang diisolasi dari mainnet Ethereum, jalur metro berjalan terpisah dari lalu lintas permukaan.

### <Emoji text="🚧" /> Testnet yang umum digunakan dan lama {#common-and-legacy-testnets}

- **Sepolia** - Lingkungan yang terhubung dengan metro di Athena, Yunani. Saat ini digunakan untuk pengujian kontrak pintar dan dApp.
- **Hoodi** - Dinamai berdasarkan stasiun metro Hoodi di Bengaluru, India. Digunakan untuk pengujian validator dan peningkatan protokol.
- **Goerli** _(usang)_ - Dinamai berdasarkan Görlitzer Bahnhof di Berlin, Jerman.
- **Rinkeby** _(usang)_ - Dinamai berdasarkan pinggiran kota Stockholm yang memiliki stasiun metro.
- **Ropsten** _(usang)_ - Merujuk pada suatu area dan bekas terminal feri/metro di Stockholm.
- **Kovan** _(usang)_ - Dinamai berdasarkan stasiun MRT Singapura.
- **Morden** _(usang)_ - Dinamai berdasarkan stasiun London Underground. Testnet publik pertama Ethereum.

### <Emoji text="🧪" /> Testnet khusus lainnya {#other-testnets}

Beberapa testnet dibuat untuk pengujian jangka pendek atau khusus peningkatan dan tidak selalu bertema metro:

- **Holesky** _(usang)_ - Dinamai berdasarkan stasiun Holešovice di Praha. Digunakan untuk pengujian validator; usang pada tahun 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(semuanya usang)_ dan **Ephemery** - Dibuat khusus untuk simulasi peningkatan seperti The Merge, Shanghai, atau eksperimen validator. Beberapa nama bersifat regional atau tematik, bukan berdasarkan metro.

Menggunakan nama stasiun metro membantu pengembang mengidentifikasi dan mengingat testnet dengan cepat tanpa perlu bergantung pada ID rantai numerik. Hal ini juga mencerminkan budaya Ethereum: praktis, global, dan berpusat pada manusia.

## Alat terkait {#related-tools}

- [Chainlist](https://chainlist.org/) _daftar jaringan EVM untuk menghubungkan dompet dan penyedia ke ID Rantai dan ID Jaringan yang sesuai_
- [EVM-based Chains](https://github.com/ethereum-lists/chains) _repo GitHub dari metadata rantai yang menggerakkan Chainlist_

## Bacaan lebih lanjut {#further-reading}

- [Proposal: Siklus Hidup Testnet Ethereum yang Dapat Diprediksi](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Evolusi Testnet Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)