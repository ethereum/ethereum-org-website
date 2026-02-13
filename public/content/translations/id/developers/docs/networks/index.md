---
title: Jaringan
description: Sebuah gambaran umum tentang jaringan Ethereum dan di mana mendapatkan ether (ETH) testnet untuk menguji aplikasi Anda.
lang: id
---

Jaringan Ethereum adalah kumpulan komputer yang saling terhubung dan berkomunikasi menggunakan protokol Ethereum. Hanya ada satu Ethereum Mainnet, tetapi jaringan independen yang mengikuti aturan protokol yang sama dapat dibuat untuk keperluan pengujian dan pengembangan. Ada banyak jaringan independen yang mengikuti protokol Ethereum tanpa saling berinteraksi satu sama lain. Kamu bahkan bisa memulai jaringan secara lokal di komputermu sendiri untuk menguji smart contract dan aplikasi web3.

Akun Ethereum-mu akan berfungsi di berbagai jaringan, tetapi saldo dan riwayat transaksimu tidak akan terbawa dari jaringan utama Ethereum. Untuk keperluan pengujian, ada baiknya mengetahui jaringan mana yang tersedia dan bagaimana cara mendapatkan testnet ETH untuk dicoba. Secara umum, untuk pertimbangan keamanan, tidak disarankan menggunakan kembali akun mainnet di testnet atau sebaliknya.

## Persyaratan {#prerequisites}

Anda harus memahami [dasar-dasar Ethereum](/developers/docs/intro-to-ethereum/) sebelum membaca tentang berbagai jaringan, karena testnet akan memberi Anda versi Ethereum yang murah dan aman untuk dicoba.

## Jaringan publik {#public-networks}

Jaringan publik dapat diakses siapa saja di dalam dunia dengan koneksi internet. Siapa pun bisa membaca atau membuat transaksi pada blockchain publik dan memvalidasi transaksi yang sedang dijalankan. Konsensus di antara para peer yang menentukan penyertaan transaksi dan keadaan jaringan.

### Mainnet Ethereum {#ethereum-mainnet}

Jaringan Utama adalah blokchain produksi Ethereum publik yang utama, di mana transaksi dengan nilai sebenarnya terjadi pada buku besar terdistribusi.

Saat orang-orang dan bursa membahas harga ETH, mereka sedang berbicara tentang Jaringan Utama ETH.

### Testnet Ethereum {#ethereum-testnets}

Selain Jaringan Utama, ada testnet publik. Ini adalah jaringan yang digunakan pengembang protokol atau kontrak pintar untuk menguji peningkatan protokol serta kontrak pintar potensial dalam lingkungan yang menyerupai produksi sebelum proses penerapan ke Jaringan Utama. Anggap ini sebagai analog dari server produksi versus server pementasan.

Anda harus menguji kode kontrak apa pun yang Anda tulis di testnet sebelum menerapkannya ke Mainnet. Di antara dapp yang terintegrasi dengan smart contract yang sudah ada, sebagian besar proyek memiliki salinan yang dideploy di testnet.

Sebagian besar testnet dimulai dengan menggunakan mekanisme konsensus proof-of-authority yang bersifat permissioned. Ini berarti sejumlah kecil node dipilih untuk memvalidasi transaksi dan membuat blok baru - mempertaruhkan identitas mereka dalam prosesnya. Sebagai alternatif, beberapa testnet menggunakan mekanisme konsensus proof-of-stake yang terbuka, di mana siapa pun dapat mencoba menjalankan validator, sama seperti di Ethereum Mainnet.

ETH di testnet seharusnya tidak memiliki nilai nyata; namun, ada pasar yang tercipta untuk beberapa jenis testnet ETH yang menjadi langka atau sulit didapatkan. Karena Anda memerlukan ETH untuk benar-benar berinteraksi dengan Ethereum (bahkan di testnet), sebagian besar orang mendapatkan ETH testnet secara gratis dari faucet. Sebagian besar faucet adalah aplikasi web tempat Anda dapat memasukkan alamat untuk meminta ETH dikirimkan ke sana.

#### Testnet mana yang harus Saya gunakan?

Dua testnet publik yang saat ini dikelola oleh pengembang klien adalah Sepolia dan Hoodi. Sepolia adalah jaringan untuk pengembang kontrak dan aplikasi dalam menguji aplikasi mereka. Jaringan Hoodi memungkinkan pengembang protokol untuk menguji peningkatan jaringan, serta memungkinkan para staker untuk mencoba menjalankan validator.

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
- [Faucet Sepolia Google Cloud Web3](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet Sepolia Infura](https://www.infura.io/faucet)
- [Faucet PoW](https://sepolia-faucet.pk910.de/)
- [Faucet Sepolia QuickNode](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi merupakan jaringan uji untuk pengujian, valid, pertaruhan. Jaringan Hoodi terbuka bagi pengguna yang ingin menjalankan validator testnet. Staker yang ingin menguji peningkatan protokol sebelum diterapkan di mainnet sebaiknya menggunakan Hoodi.

- Set validator terbuka, stakers dapat menguji peningkatan jaringan
- State yang besar, berguna untuk menguji interaksi smart contract yang kompleks
- Lebih lama untuk sinkronisasi dan memerlukan lebih banyak penyimpanan untuk menjalankan sebuah node

##### Sumber Daya

- [Situs Web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Penjelajah](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucet

- [Faucet Hoodi Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Faucet Hoodi](https://hoodi.ethpandaops.io/)
- [Faucet PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery adalah jenis testnet unik yang sepenuhnya disetel ulang setiap bulan. Status eksekusi dan konsensus akan kembali ke genesis setiap 28 hari, yang berarti apa pun yang terjadi di testnet bersifat sementara. Hal ini menjadikannya ideal untuk pengujian jangka pendek, bootstrap node yang cepat, dan aplikasi sederhana seperti "hello world" yang tidak memerlukan sifat permanen.

- Kondisi yang selalu segar, pengujian jangka pendek terhadap validator dan aplikasi
- Hanya mencakup seperangkat kontrak dasar
- Set validator terbuka dan mudah untuk mengakses dana dalam jumlah besar
- Persyaratan node terkecil dan sinkronisasi tercepat, rata-rata 5GB

##### Sumber Daya

- [Situs Web](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [Obrolan komunitas](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Penjelajah Beacon](https://beaconlight.ephemery.dev/)
- [Checkpoint Sync](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucet

- [Faucet Bordel](https://faucet.bordel.wtf/)
- [Faucet PoW Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (tidak digunakan lagi) {#holesky}

Testnet Holesky tidak digunakan lagi per September 2025. Operator staking dan penyedia infrastruktur sebaiknya menggunakan Hoodi untuk pengujian validator.

- [Pengumuman Penghentian Testnet Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog EF, 1 September 2025_
- [Pembaruan Testnet Holesky dan Hoodi](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _Blog EF, 18 Maret 2025_

### Testnet lapisan 2 {#layer-2-testnets}

[Lapisan 2 (L2)](/layer-2/) adalah istilah kolektif untuk menggambarkan serangkaian solusi penskalaan Ethereum tertentu. Layer 2 adalah blockchain terpisah yang memperluas Ethereum dan mewarisi jaminan keamanannya dari Ethereum. Testnet Layer 2 biasanya digabungkan dengan testnet Ethereum publik.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Sebuah testnet untuk [Arbitrum](https://arbitrum.io/).

##### Sumber Daya

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucet

- [Faucet Arbitrum Sepolia Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Keran Arbitrum Sepolia Chainlink](https://faucets.chain.link/arbitrum-sepolia)
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

- [Starkscan](https://sepolia.starkscan.co/)

##### Faucet

- [Faucet Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Faucet Starknet Sepolia Blast](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Faucet Starknet](https://starknet-faucet.vercel.app/)

## Jaringan pribadi {#private-networks}

Jaringan Ethereum adalah jaringan pribadi jika simpul-simpulnya tidak terhubung ke jaringan publik (yaitu, Mainnet atau testnet). Dalam konteks ini, private hanya berarti terbatas atau terisolasi, bukan berarti terlindungi atau aman.

### Jaringan pengembangan {#development-networks}

Untuk mengembangkan aplikasi Ethereum, Anda sebaiknya menjalankannya di jaringan privat terlebih dahulu untuk melihat cara kerjanya sebelum melakukan deployment. Sama seperti saat Anda membuat server lokal di komputer untuk pengembangan web, Anda juga bisa membuat instance blockchain lokal untuk menguji dapp Anda. Ini memungkinkan proses pengulangan yang lebih cepat daripada testnet publik.

Ada proyek dan peralatan yang didedikasikan untuk membantu proses ini. Pelajari lebih lanjut tentang [jaringan pengembangan](/developers/docs/development-networks/).

### Jaringan konsorsium {#consortium-networks}

Proses konsensus dikendalikan oleh sekumpulan node yang telah ditentukan sebelumnya dan dipercaya. Sebagai contoh, sebuah jaringan privat dari institusi akademik yang sudah dikenal, di mana masing-masing mengelola satu node, dan blok divalidasi oleh ambang batas penandatangan dalam jaringan tersebut.

Jika jaringan Ethereum publik itu seperti internet publik, maka jaringan konsorsium itu seperti intranet privat.

## <Emoji text="🚉" /> Mengapa testnet Ethereum dinamai berdasarkan stasiun metro? {#why-naming}

Banyak testnet Ethereum dinamai berdasarkan stasiun metro atau kereta api di dunia nyata. Tradisi penamaan ini dimulai sejak awal dan mencerminkan kota-kota global tempat para kontributor pernah tinggal atau bekerja. Ini simbolis, mudah diingat, dan praktis. Sama seperti testnet yang terisolasi dari mainnet Ethereum, jalur metro berjalan terpisah dari lalu lintas di permukaan.

### <Emoji text="🚧" /> Testnet yang umum digunakan dan testnet lama {#common-and-legacy-testnets}

- **Sepolia** - Lingkungan yang terhubung dengan metro di Athena, Yunani. Saat ini digunakan untuk pengujian kontrak pintar dan dApp.
- **Hoodi** - Dinamai berdasarkan stasiun metro Hoodi di Bengaluru, India. Digunakan untuk pengujian validator dan pembaruan protokol.
- **Goerli** _(tidak digunakan lagi)_ - Dinamai berdasarkan Görlitzer Bahnhof di Berlin, Jerman.
- **Rinkeby** _(tidak digunakan lagi)_ - Dinamai berdasarkan nama sebuah daerah pinggiran kota Stockholm yang memiliki stasiun metro.
- **Ropsten** _(tidak digunakan lagi)_ - Merujuk pada sebuah area dan bekas terminal feri/metro di Stockholm.
- **Kovan** _(tidak digunakan lagi)_ - Dinamai berdasarkan stasiun MRT Singapura.
- **Morden** _(tidak digunakan lagi)_ - Dinamai berdasarkan stasiun London Underground. Testnet publik pertama Ethereum.

### <Emoji text="🧪" /> Testnet khusus lainnya {#other-testnets}

Beberapa testnet dibuat untuk pengujian jangka pendek atau khusus pembaruan dan tidak selalu bertema metro:

- **Holesky** _(tidak digunakan lagi)_ - Dinamai berdasarkan stasiun Holešovice di Praha. Digunakan untuk pengujian validator; tidak digunakan lagi pada tahun 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(semuanya sudah tidak digunakan lagi)_ dan **Ephemery** - Dibuat khusus untuk simulasi pembaruan seperti The Merge, Shanghai, atau eksperimen validator. Beberapa nama bersifat regional atau tematik, bukan berbasis metro.

Menggunakan nama stasiun metro membantu pengembang mengidentifikasi dan mengingat testnet dengan cepat tanpa perlu bergantung pada ID rantai numerik. Ini juga mencerminkan budaya Ethereum: praktis, global, dan berpusat pada manusia.

## Perangkat terkait {#related-tools}

- [Chainlist](https://chainlist.org/) _daftar jaringan EVM untuk menghubungkan dompet dan penyedia ke ID Rantai dan ID Jaringan yang sesuai_
- [Rantai berbasis EVM](https://github.com/ethereum-lists/chains) _repo GitHub metadata rantai yang mendukung Chainlist_

## Bacaan lebih lanjut {#further-reading}

- [Proposal: Siklus Hidup Testnet Ethereum yang Dapat Diprediksi](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Evolusi Testnet Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
