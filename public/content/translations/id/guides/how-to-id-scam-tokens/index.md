---
title: Bagaimana cara mengidentifikasi token palsu
description: Memahami token palsu, bagaimana mereka membuat diri terlihat sah, dan cara menghindarinya.
lang: id
---

# Cara mengidentifikasi token penipuan {#identify-scam-tokens}

Salah satu kegunaan paling umum dari Ethereum untuk suatu grup adalah membuat token yang dapat dipertukarkan, dalam pengertian sebagai mata uang mereka sendiri. Token-token ini biasanya mengikuti standar, [ERC-20](/developers/docs/standards/tokens/erc-20/). Namun, di mana pun ada kasus penggunaan sah yang membawa nilai, juga ada para penjahat yang mencoba mencuri nilai tersebut untuk diri mereka sendiri.

Ada dua cara di mana mereka kemungkinan akan menipu Anda:

- **Menjual token penipuan kepada Anda**, yang mungkin terlihat seperti token sah yang ingin Anda beli, tetapi diterbitkan oleh para penipu dan tidak bernilai apa-apa.
- **Menipu Anda untuk menandatangani transaksi yang buruk**, biasanya dengan mengarahkan Anda ke antarmuka pengguna mereka sendiri. Mereka mungkin mencoba membuat Anda memberikan ijin untuk kontrak mereka pada token ERC-20 Anda, mengungkapkan informasi sensitif yang memberikan akses kepada mereka terhadap aset Anda, dan sebagainya. Antarmuka pengguna ini mungkin menjadi tiruan hampir sempurna dari situs yang jujur, tetapi dengan trik tersembunyi.

Untuk mengilustrasikan apa itu token penipuan, dan cara mengidentifikasinya, kita akan melihat salah satu contohnya: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Token ini mencoba terlihat seperti token [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) yang sah.

<ExpandableCard
title="Apa itu ARB?"
contentPreview=''>

Arbitrum adalah organisasi yang mengembangkan dan mengelola [optimistic rollups](/developers/docs/scaling/optimistic-rollups/). Pada awalnya, Arbitrum diorganisir sebagai perusahaan berorientasi keuntungan, namun kemudian mengambil langkah-langkah untuk mendesentralisasikan. Sebagai bagian dari proses tersebut, mereka menerbitkan [token tata kelola](/dao/#token-based-membership) yang dapat diperdagangkan.

</ExpandableCard>

<ExpandableCard
title="Mengapa token penipuan itu disebut wARB?"
contentPreview=''>

Ada konvensi dalam Ethereum bahwa ketika suatu aset tidak mematuhi standar ERC-20, kita membuat versi "wrapped" darinya dengan nama yang diawali oleh "w". Jadi, sebagai contoh, kita memiliki wBTC untuk bitcoin dan <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH untuk ether</a>.

Tidak masuk akal untuk membuat versi wrapped dari token ERC-20 yang sudah ada di Ethereum, tetapi penipu mengandalkan tampilan keabsahan daripada realitas yang mendasarinya.

</ExpandableCard>

## Bagaimana cara kerja token palsu? {#how-do-scam-tokens-work}

Inti dari Ethereum adalah desentralisasi. Ini berarti tidak ada otoritas pusat yang dapat menyita aset Anda atau mencegah Anda melakukan penyebaran kontrak pintar. Namun, ini juga berarti bahwa penipu dapat menyebarluaskan kontrak pintar apa pun yang mereka inginkan.

<ExpandableCard
title="Apa itu kontrak pintar?"
contentPreview=''>

[Kontrak pintar](/developers/docs/smart-contracts/) adalah program yang berjalan di atas blockchain Ethereum. Setiap token ERC-20, misalnya, diimplementasikan sebagai kontrak pintar.

</ExpandableCard>

Secara spesifik, Arbitrum menyebarkan sebuah kontrak yang menggunakan simbol `ARB`. Namun, hal itu tidak menghentikan orang lain untuk juga menyebarkan kontrak yang menggunakan simbol yang sama persis, atau serupa. Siapa pun yang menulis kontrak memiliki kuasa untuk menentukan apa yang akan dilakukan oleh kontrak tersebut.

## Terlihat sah {#appearing-legitimate}

Terdapat beberapa trik yang dilakukan oleh pencipta token palsu untuk terlihat sah.

- **Nama dan simbol yang sah**. Seperti yang disebut sebelumnya, kontrak ERC-20 dapat memiliki simbol dan nama yang sama dengan kontrak ERC-20 lainnya. Anda tidak bisa mengandalkan bidang-bidang tersebut untuk keamanan.

- **Pemilik sah**. Token palsu seringkali mengirimkan sejumlah saldo besar secara tiba-tiba ke alamat-alamat yang bisa diharapkan sebagai pemegang sah dari token yang sebenarnya.

  Sebagai contoh, mari kita lihat lagi `wARB`. [Sekitar 16% dari token](https://eth.blockscout.com/token/0xb047c8032b99841713b8E3872F06cF32beb27b82?tab=holders) dipegang oleh sebuah alamat yang tag publiknya adalah [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Ini _bukan_ alamat palsu, ini benar-benar alamat yang [menyebarkan kontrak ARB asli di Jaringan Utama Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Karena saldo ERC-20 dari suatu alamat adalah bagian dari penyimpanan kontrak ERC-20, kontrak dapat menentukannya sesuai dengan keinginan pengembang kontrak. Juga mungkin bagi suatu kontrak untuk melarang transfer sehingga pengguna sah tidak akan dapat menghilangkan token palsu tersebut.

- **Transfer sah**. _Pemilik yang sah tidak akan membayar untuk mentransfer token penipuan ke orang lain, jadi jika ada transfer, itu pasti sah, bukan?_ **Salah**. Event `Transfer` dihasilkan oleh kontrak ERC-20. Seorang penipu dengan mudah dapat menulis kontrak sedemikian rupa sehingga akan menghasilkan tindakan-tindakan tersebut.

## Situs web penipuan {#websites}

Penipu juga dapat membuat situs web yang sangat meyakinkan, kadang-kadang bahkan klon presisi dari situs asli dengan UI yang identik, tetapi dengan trik-trik yang halus. Contohnya mungkin adalah tautan eksternal yang tampak sah, namun sebenarnya mengarahkan pengguna ke situs penipuan eksternal, atau instruksi yang salah yang membimbing pengguna untuk mengungkapkan kunci mereka atau mengirim dana ke alamat penyerang.

Praktik terbaik untuk menghindari ini adalah dengan cermat memeriksa URL situs yang Anda kunjungi, dan menyimpan alamat situs otentik yang dikenal dalam daftar bookmark Anda. Kemudian, Anda dapat mengakses situs asli melalui daftar bookmark Anda tanpa secara tidak sengaja membuat kesalahan ejaan atau bergantung pada tautan eksternal.

## Bagaimana Anda bisa melindungi diri? {#protect-yourself}

1. **Periksa alamat kontrak**. Token sah berasal dari organisasi yang sah, dan Anda dapat melihat alamat kontrak di situs web organisasi tersebut. Sebagai contoh, [untuk `ARB` Anda dapat melihat alamat yang sah di sini](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Token-token nyata memiliki likuiditas**. Pilihan lain adalah dengan melihat ukuran pool likuiditas di [Uniswap](https://uniswap.org/), salah satu protokol penukaran token yang paling umum. Protokol ini bekerja dengan menggunakan kolam likuiditas, di mana para investor mendepositkan token-token mereka dengan harapan mendapatkan pengembalian dari biaya perdagangan.

Token palsu umumnya memiliki kolam likuiditas yang sangat kecil, jika ada, karena para penipu tidak ingin mengambil risiko atas aset nyata. Sebagai contoh, pool Uniswap `ARB`/`ETH` menampung sekitar satu juta dolar ([lihat di sini untuk nilai terkini](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) dan membeli atau menjual dalam jumlah kecil tidak akan mengubah harganya:

![Membeli token yang sah](./uniswap-real.png)

Tetapi ketika Anda mencoba membeli token penipuan `wARB`, bahkan pembelian kecil pun akan mengubah harga lebih dari 90%:

![Membeli token penipuan](./uniswap-scam.png)

Ini adalah bukti lain yang menunjukkan bahwa `wARB` kemungkinan bukan token yang sah.

3. **Cari di Etherscan**. Banyak token palsu sudah diidentifikasi dan dilaporkan oleh komunitas. Token semacam itu [ditandai di Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Meskipun Etherscan bukan sumber otoritatif kebenaran (ini adalah sifat jaringan terdesentralisasi bahwa tidak bisa ada sumber otoritatif untuk keabsahan), token-token yang diidentifikasi oleh Etherscan sebagai penipuan kemungkinan besar adalah penipuan.

   ![Token penipuan di Etherscan](./etherscan-scam.png)

## Kesimpulan {#conclusion}

Selama masih ada nilai di dunia, akan selalu ada penipu yang mencoba mencurinya untuk diri mereka sendiri, dan dalam dunia terdesentralisasi, tidak ada yang melindungi Anda kecuali diri Anda sendiri. Semoga Anda ingat poin-poin ini untuk membantu membedakan token sah dari penipuan:

- Token palsu berpura-pura menjadi token sah, mereka dapat menggunakan nama, simbol, dan sebagainya yang sama.
- Token penipuan _tidak dapat_ menggunakan alamat kontrak yang sama.
- Sumber terbaik untuk alamat token sah adalah organisasi yang memiliki token tersebut.
- Jika itu tidak berhasil, Anda dapat menggunakan aplikasi populer dan tepercaya seperti [Uniswap](https://app.uniswap.org/#/swap) dan [Blockscout](https://eth.blockscout.com/).
