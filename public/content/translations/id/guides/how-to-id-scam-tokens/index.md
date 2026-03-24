---
title: Cara mengidentifikasi token penipuan
description: Memahami token penipuan, bagaimana mereka membuat diri mereka terlihat sah, dan cara menghindarinya.
lang: id
---

# Cara mengidentifikasi token penipuan {#identify-scam-tokens}

Salah satu penggunaan paling umum untuk Ethereum adalah bagi sebuah kelompok untuk membuat token yang dapat diperdagangkan, dalam artian mata uang mereka sendiri. Token ini biasanya mengikuti sebuah standar, [ERC-20](/developers/docs/standards/tokens/erc-20/). Namun, di mana pun ada kasus penggunaan sah yang membawa nilai, ada juga penjahat yang mencoba mencuri nilai tersebut untuk diri mereka sendiri.

Ada dua cara yang kemungkinan besar mereka gunakan untuk menipu Anda:

- **Menjual token penipuan kepada Anda**, yang mungkin terlihat seperti token sah yang ingin Anda beli, tetapi diterbitkan oleh penipu dan tidak bernilai apa-apa.
- **Menipu Anda agar menandatangani transaksi yang buruk**, biasanya dengan mengarahkan Anda ke antarmuka pengguna mereka sendiri. Mereka mungkin mencoba membuat Anda memberikan izin (allowance) kepada kontrak mereka atas token ERC-20 Anda, mengekspos informasi sensitif yang memberi mereka akses ke aset Anda, dll. Antarmuka pengguna ini mungkin merupakan tiruan yang hampir sempurna dari situs yang jujur, tetapi dengan trik tersembunyi.

Untuk mengilustrasikan apa itu token penipuan, dan cara mengidentifikasinya, kita akan melihat salah satu contohnya: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Token ini mencoba terlihat seperti token [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) yang sah.

<ExpandableCard
title="Apa itu ARB?"
contentPreview=''>

Arbitrum adalah organisasi yang mengembangkan dan mengelola [optimistic rollup](/developers/docs/scaling/optimistic-rollups/). Awalnya, Arbitrum diorganisasikan sebagai perusahaan nirlaba, tetapi kemudian mengambil langkah-langkah menuju desentralisasi. Sebagai bagian dari proses tersebut, mereka menerbitkan [token tata kelola](/dao/#token-based-membership) yang dapat diperdagangkan.
</ExpandableCard>

<ExpandableCard
title="Mengapa token penipuan disebut wARB?"
contentPreview=''>

Ada sebuah konvensi di Ethereum bahwa ketika sebuah aset tidak mematuhi ERC-20, kita membuat versi "terbungkus" (wrapped) dari aset tersebut dengan nama yang diawali dengan "w". Jadi, sebagai contoh, kita memiliki wBTC untuk bitcoin dan <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH untuk ether</a>.

Tidak masuk akal untuk membuat versi terbungkus dari token ERC-20 yang sudah ada di Ethereum, tetapi penipu mengandalkan penampilan yang sah daripada realitas yang mendasarinya.
</ExpandableCard>

## Bagaimana cara kerja token penipuan? {#how-do-scam-tokens-work}

Inti dari Ethereum adalah desentralisasi. Ini berarti tidak ada otoritas pusat yang dapat menyita aset Anda atau mencegah Anda menerapkan kontrak pintar. Namun, ini juga berarti bahwa penipu dapat menerapkan kontrak pintar apa pun yang mereka inginkan.

<ExpandableCard
title="Apa itu kontrak pintar?"
contentPreview=''>

[Kontrak pintar](/developers/docs/smart-contracts/) adalah program yang berjalan di atas blockchain Ethereum. Setiap token ERC-20, misalnya, diimplementasikan sebagai kontrak pintar.
</ExpandableCard>

Secara khusus, Arbitrum menerapkan kontrak yang menggunakan simbol `ARB`. Namun, hal itu tidak menghentikan orang lain untuk juga menerapkan kontrak yang menggunakan simbol yang sama persis, atau yang serupa. Siapa pun yang menulis kontrak dapat mengatur apa yang akan dilakukan kontrak tersebut.

## Tampil sah {#appearing-legitimate}

Ada beberapa trik yang dilakukan pembuat token penipuan agar terlihat sah.

- **Nama dan simbol yang sah**. Seperti yang disebutkan sebelumnya, kontrak ERC-20 dapat memiliki simbol dan nama yang sama dengan kontrak ERC-20 lainnya. Anda tidak dapat mengandalkan bidang tersebut untuk keamanan.

- **Pemilik yang sah**. Token penipuan sering kali melakukan airdrop saldo dalam jumlah signifikan ke alamat yang diharapkan menjadi pemegang sah dari token asli.

  Sebagai contoh, mari kita lihat `wARB` lagi. [Sekitar 16% dari token](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) dipegang oleh alamat yang tag publiknya adalah [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Ini _bukanlah_ alamat palsu, ini benar-benar alamat yang [menerapkan kontrak ARB asli di mainnet Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Karena saldo ERC-20 dari sebuah alamat adalah bagian dari penyimpanan kontrak ERC-20, saldo tersebut dapat ditentukan oleh kontrak menjadi apa pun yang diinginkan oleh pengembang kontrak. Kontrak juga dimungkinkan untuk melarang transfer sehingga pengguna yang sah tidak akan dapat menyingkirkan token penipuan tersebut.

- **Transfer yang sah**. _Pemilik yang sah tidak akan membayar untuk mentransfer token penipuan kepada orang lain, jadi jika ada transfer, itu pasti sah, bukan?_ **Salah**. Peristiwa `Transfer` dihasilkan oleh kontrak ERC-20. Seorang penipu dapat dengan mudah menulis kontrak sedemikian rupa sehingga akan menghasilkan tindakan tersebut.

## Situs web penipuan {#websites}

Penipu juga dapat membuat situs web yang sangat meyakinkan, terkadang bahkan tiruan persis dari situs asli dengan UI yang identik, tetapi dengan trik yang halus. Contohnya mungkin tautan eksternal yang tampak sah sebenarnya mengirim pengguna ke situs penipuan eksternal, atau instruksi yang salah yang memandu pengguna untuk mengekspos kunci mereka atau mengirim dana ke alamat penyerang.

Praktik terbaik untuk menghindari hal ini adalah dengan memeriksa URL secara cermat untuk situs yang Anda kunjungi, dan menyimpan alamat untuk situs asli yang dikenal di markah (bookmark) Anda. Kemudian, Anda dapat mengakses situs asli melalui markah Anda tanpa secara tidak sengaja membuat kesalahan ejaan atau mengandalkan tautan eksternal.

## Bagaimana Anda dapat melindungi diri sendiri? {#protect-yourself}

1. **Periksa alamat kontrak**. Token yang sah berasal dari organisasi yang sah, dan Anda dapat melihat alamat kontrak di situs web organisasi tersebut. Sebagai contoh, [untuk `ARB` Anda dapat melihat alamat yang sah di sini](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Token asli memiliki likuiditas**. Pilihan lainnya adalah melihat ukuran kolam likuiditas di [Uniswap](https://uniswap.org/), salah satu protokol pertukaran token yang paling umum. Protokol ini bekerja menggunakan kolam likuiditas, di mana investor menyetorkan token mereka dengan harapan mendapatkan imbal hasil dari biaya perdagangan.

Token penipuan biasanya memiliki kolam likuiditas yang sangat kecil, jika ada, karena penipu tidak ingin mempertaruhkan aset nyata. Sebagai contoh, kolam Uniswap `ARB`/`ETH` menampung sekitar satu juta dolar ([lihat di sini untuk nilai terbarunya](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) dan membeli atau menjual dalam jumlah kecil tidak akan mengubah harga:

![Membeli token yang sah](./uniswap-real.png)

Namun, ketika Anda mencoba membeli token penipuan `wARB`, bahkan pembelian kecil pun akan mengubah harga lebih dari 90%:

![Membeli token penipuan](./uniswap-scam.png)

Ini adalah bukti lain yang menunjukkan kepada kita bahwa `wARB` kemungkinan besar bukanlah token yang sah.

3. **Lihat di Etherscan**. Banyak token penipuan telah diidentifikasi dan dilaporkan oleh komunitas. Token semacam itu [ditandai di Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Meskipun Etherscan bukanlah sumber kebenaran yang otoritatif (sudah menjadi sifat jaringan terdesentralisasi bahwa tidak mungkin ada sumber otoritatif untuk legitimasi), token yang diidentifikasi oleh Etherscan sebagai penipuan kemungkinan besar adalah penipuan.

   ![Token penipuan di Etherscan](./etherscan-scam.png)

## Kesimpulan {#conclusion}

Selama ada nilai di dunia, akan ada penipu yang mencoba mencurinya untuk diri mereka sendiri, dan di dunia yang terdesentralisasi tidak ada yang melindungi Anda kecuali diri Anda sendiri. Semoga Anda mengingat poin-poin ini untuk membantu membedakan token yang sah dari penipuan:

- Token penipuan meniru token yang sah, mereka dapat menggunakan nama, simbol, dll. yang sama.
- Token penipuan _tidak dapat_ menggunakan alamat kontrak yang sama.
- Sumber terbaik untuk alamat token yang sah adalah organisasi pemilik token tersebut.
- Jika gagal, Anda dapat menggunakan aplikasi populer dan tepercaya seperti [Uniswap](https://app.uniswap.org/#/swap) dan [Blockscout](https://eth.blockscout.com/).