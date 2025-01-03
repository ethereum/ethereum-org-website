---
title: Bagaimana cara mengidentifikasi token palsu
description: Memahami token palsu, bagaimana mereka membuat diri terlihat sah, dan cara menghindarinya.
lang: id
---

# Bagaimana cara mengidentifikasi token palsu {#identify-scam-tokens}

Salah satu kegunaan paling umum dari Ethereum untuk suatu grup adalah membuat token yang dapat dipertukarkan, dalam pengertian sebagai mata uang mereka sendiri. Token-token ini umumnya mengikuti standar [ERC-20](/developers/docs/standards/tokens/erc-20/). Namun, di mana pun ada kasus penggunaan sah yang membawa nilai, juga ada para penjahat yang mencoba mencuri nilai tersebut untuk diri mereka sendiri.

Ada dua cara di mana mereka kemungkinan akan menipu Anda:

- **Mengajukan token palsu kepada Anda**, yang mungkin terlihat seperti token sah yang ingin Anda beli, tetapi diterbitkan oleh penipu dan tidak memiliki nilai.
- **Membujuk Anda untuk menandatangani transaksi buruk**, biasanya dengan mengarahkan Anda ke antarmuka pengguna mereka sendiri. Mereka mungkin mencoba membuat Anda memberikan ijin untuk kontrak mereka pada token ERC-20 Anda, mengungkapkan informasi sensitif yang memberikan akses kepada mereka terhadap aset Anda, dan sebagainya. Antarmuka pengguna ini mungkin menjadi tiruan hampir sempurna dari situs yang jujur, tetapi dengan trik tersembunyi.

Untuk mengilustrasikan apa itu token palsu, dan bagaimana mengidentifikasinya, kita akan melihat contoh salah satunya: [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). Token ini berusaha terlihat seperti token sah [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="Apa itu ARB?"
contentPreview=''>

Arbitrum adalah organisasi yang mengembangkan dan mengelola <a href="/developers/docs/scaling/optimistic-rollups/">rollup optimistis</a>. Pada awalnya, Arbitrum diorganisir sebagai perusahaan berorientasi keuntungan, namun kemudian mengambil langkah-langkah untuk mendesentralisasikan. Sebagai bagian dari proses tersebut, mereka menerbitkan <a href="/dao/#token-based-membership">token tata kelola</a> yang dapat diperdagangkan.

</ExpandableCard>

<ExpandableCard
title="Mengapa token palsu disebut wARB?"
contentPreview=''>

Ada konvensi dalam Ethereum bahwa ketika suatu aset tidak mematuhi standar ERC-20, kita membuat versi "wrapped" darinya dengan nama yang diawali oleh "w". Jadi, sebagai contoh, kita memiliki wBTC untuk bitcoin dan <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH untuk ether</a>.

Tidak masuk akal untuk membuat versi wrapped dari token ERC-20 yang sudah ada di Ethereum, tetapi penipu mengandalkan tampilan keabsahan daripada realitas yang mendasarinya.

</ExpandableCard>

## Bagaimana cara kerja token palsu? {#how-do-scam-tokens-work}

Inti dari Ethereum adalah desentralisasi. Ini berarti tidak ada otoritas pusat yang dapat menyita aset Anda atau mencegah Anda melakukan penyebaran kontrak pintar. Namun, ini juga berarti bahwa penipu dapat menyebarluaskan kontrak pintar apa pun yang mereka inginkan.

<ExpandableCard
title="Apa itu kontrak pintar?"
contentPreview=''>

<a href="/developers/docs/smart-contracts/">Kontrak pintar</a> adalah program-program yang berjalan di atas rantai blok Ethereum. Setiap token ERC-20, misalnya, diimplementasikan sebagai kontrak pintar.

</ExpandableCard>

Secara khusus, Arbitrum telah menyebarkan kontrak yang menggunakan simbol `ARB`. Namun, hal itu tidak menghentikan orang lain untuk juga menyebarkan kontrak yang menggunakan simbol yang sama persis, atau serupa. Siapa pun yang menulis kontrak memiliki kuasa untuk menentukan apa yang akan dilakukan oleh kontrak tersebut.

## Terlihat sah {#appearing-legitimate}

Terdapat beberapa trik yang dilakukan oleh pencipta token palsu untuk terlihat sah.

- **Nama dan simbol yang sah**. Seperti yang disebut sebelumnya, kontrak ERC-20 dapat memiliki simbol dan nama yang sama dengan kontrak ERC-20 lainnya. Anda tidak bisa mengandalkan bidang-bidang tersebut untuk keamanan.

- **Pemilik sah**. Token palsu seringkali mengirimkan sejumlah saldo besar secara tiba-tiba ke alamat-alamat yang bisa diharapkan sebagai pemegang sah dari token yang sebenarnya.

  Sebagai contoh, mari kita lihat lagi `wARB`. [Tentang 16% dari token-token tersebut](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) dipegang oleh sebuah alamat yang tag publiknya adalah [Arbitrum Foundation: Deployer](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f). Ini _bukan_ alamat palsu, ini benar-benar adalah alamat yang [mendeploy kontrak ARB asli di Jaringan Utama Ethereum](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Karena saldo ERC-20 dari suatu alamat adalah bagian dari penyimpanan kontrak ERC-20, kontrak dapat menentukannya sesuai dengan keinginan pengembang kontrak. Juga mungkin bagi suatu kontrak untuk melarang transfer sehingga pengguna sah tidak akan dapat menghilangkan token palsu tersebut.

- **Transfer sah**. _Pemilik sah tidak akan membayar untuk mentransfer token palsu kepada orang lain, jadi jika ada transfer, itu pasti sah, bukan?_ **Salah**. Aksi `Transfer` dihasilkan oleh kontrak ERC-20. Seorang penipu dengan mudah dapat menulis kontrak sedemikian rupa sehingga akan menghasilkan tindakan-tindakan tersebut.

## Situs web penipuan {#websites}

Penipu juga dapat membuat situs web yang sangat meyakinkan, kadang-kadang bahkan klon presisi dari situs asli dengan UI yang identik, tetapi dengan trik-trik yang halus. Contohnya mungkin adalah tautan eksternal yang tampak sah, namun sebenarnya mengarahkan pengguna ke situs penipuan eksternal, atau instruksi yang salah yang membimbing pengguna untuk mengungkapkan kunci mereka atau mengirim dana ke alamat penyerang.

Praktik terbaik untuk menghindari ini adalah dengan cermat memeriksa URL situs yang Anda kunjungi, dan menyimpan alamat situs otentik yang dikenal dalam daftar bookmark Anda. Kemudian, Anda dapat mengakses situs asli melalui daftar bookmark Anda tanpa secara tidak sengaja membuat kesalahan ejaan atau bergantung pada tautan eksternal.

## Bagaimana Anda bisa melindungi diri? {#protect-yourself}

1. **Periksa alamat kontrak**. Token sah berasal dari organisasi yang sah, dan Anda dapat melihat alamat kontrak di situs web organisasi tersebut. Sebagai contoh, [untuk `ARB` Anda dapat melihat alamat sahnya di sini](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Token-token nyata memiliki likuiditas**. Pilihan lainnya adalah melihat ukuran kolam likuiditas di [Uniswap](https://uniswap.org/), salah satu protokol pertukaran token yang paling umum digunakan. Protokol ini bekerja dengan menggunakan kolam likuiditas, di mana para investor mendepositkan token-token mereka dengan harapan mendapatkan pengembalian dari biaya perdagangan.

Token palsu umumnya memiliki kolam likuiditas yang sangat kecil, jika ada, karena para penipu tidak ingin mengambil risiko atas aset nyata. Sebagai contoh, kolam Uniswap `ARB`/`ETH` memiliki sekitar satu juta dolar ([lihat di sini untuk nilai terbaru](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) dan membeli atau menjual sejumlah kecil tidak akan mengubah harga:

![Membeli token yang sah](./uniswap-real.png)

Namun, saat Anda mencoba membeli token palsu `wARB`, bahkan pembelian kecil akan mengubah harga lebih dari 90%:

![Membeli token palsu](./uniswap-scam.png)

Ini adalah bukti lain yang menunjukkan bahwa `wARB` kemungkinan bukanlah token yang sah.

3. **Cari di Etherscan**. Banyak token palsu sudah diidentifikasi dan dilaporkan oleh komunitas. Token-token seperti itu [dicatat di Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Meskipun Etherscan bukan sumber otoritatif kebenaran (ini adalah sifat jaringan terdesentralisasi bahwa tidak bisa ada sumber otoritatif untuk keabsahan), token-token yang diidentifikasi oleh Etherscan sebagai penipuan kemungkinan besar adalah penipuan.

   ![Token palsu di Etherscan](./etherscan-scam.png)

## Kesimpulan {#conclusion}

Selama masih ada nilai di dunia, akan selalu ada penipu yang mencoba mencurinya untuk diri mereka sendiri, dan dalam dunia terdesentralisasi, tidak ada yang melindungi Anda kecuali diri Anda sendiri. Semoga Anda ingat poin-poin ini untuk membantu membedakan token sah dari penipuan:

- Token palsu berpura-pura menjadi token sah, mereka dapat menggunakan nama, simbol, dan sebagainya yang sama.
- Token palsu _tidak dapat_ menggunakan akun kontrak yang sama.
- Sumber terbaik untuk alamat token sah adalah organisasi yang memiliki token tersebut.
- Jika tidak berhasil, Anda dapat menggunakan aplikasi-aplikasi populer dan terpercaya seperti [Uniswap](https://app.uniswap.org/#/swap) dan [Etherscan](https://etherscan.io/).
