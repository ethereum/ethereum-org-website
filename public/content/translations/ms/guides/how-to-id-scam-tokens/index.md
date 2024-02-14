---
title: Cara mengenal pasti token penipuan
description: Memahami token penipuan, cara mereka cuba kelihatan sah, dan cara mengelakkannya.
lang: ms
---

# Cara mengenal pasti token penipuan {#identify-scam-tokens}

One of the most common uses for Ethereum is for a group to create a tradable token, in a sense their own currency. Token-token ini biasanya mematuhi standard [ERC-20](/developers/docs/standards/tokens/erc-20/). Walau bagaimanapun, di mana-mana sahaja terdapat kes penggunaan sah yang membawa nilai, terdapat juga penjenayah yang cuba mencuri nilai tersebut untuk diri mereka sendiri.

Terdapat dua cara mereka mungkin menipu anda:

- **Menjual token penipuan kepada anda**, yang mungkin kelihatan seperti token sah yang mahu anda beli, tetapi dikeluarkan oleh penipu dan tidak berharga.
- **Mengelirukan anda sehingga menandatangani transaksi yang buruk**, biasanya dengan menghalakan anda ke antara muka pengguna mereka sendiri. Mereka mungkin cuba mendapatkan anda untuk memberikan kebenaran pada kontrak mereka terhadap token ERC-20 anda, mendedahkan maklumat sensitif yang memberi mereka akses kepada aset anda, dan sebagainya. Antara muka pengguna ini mungkin menjadi salinan hampir sempurna laman web yang jujur, tetapi dengan trik-trik tersembunyi.

Untuk mengilustrasikan maksud token penipuan, dan cara mengenal pastinya, kita akan melihat satu contoh: [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). Token ini cuba kelihatan seperti token [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) yang sah.

<ExpandableCard
title="Apakah itu ARB?"
contentPreview=''>

Arbitrum ialah sebuah organisasi yang membangunkan dan mengurus <a href="/developers/docs/scaling/optimistic-rollups/">gulungan optimistik</a>. Pada awalnya, Arbitrum diorganisasikan sebagai syarikat bertujuan untung, tetapi kemudiannya mengambil langkah-langkah untuk mendesentralisasi. Sebagai sebahagian daripada proses itu, mereka mengeluarkan <a href="/dao/#token-based-membership">token tadbir urus</a> yang boleh diniagakan.

</ExpandableCard>

<ExpandableCard
title="Mengapakah token penipuan dipanggil wARB?"
contentPreview=''>

Terdapat kelaziman di Ethereum iaitu apabila aset tidak mematuhi piawai ERC-20, kami mencipta versi "wrapped" daripadanya dengan nama yang bermula dengan "w". Jadi, sebagai contoh, kita mempunyai wBTC untuk bitcoin dan <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH untuk ether</a>.

Tidak masuk akal untuk mencipta versi "wrapped" bagi token ERC-20 yang sudah wujud di Ethereum, tetapi penipu bergantung pada penampilan kesahihan daripada realiti asas.

</ExpandableCard>

## Bagaimanakah token penipuan berfungsi? {#how-do-scam-tokens-work}

Tujuan utama Ethereum ialah desentralisasi. Ini bermakna tiada pihak berkuasa pusat yang boleh menyita aset anda atau menghalang anda daripada melaksanakan kontrak pintar. Tetapi, itu juga bermakna bahawa penipu boleh melaksanakan kontrak pintar mengikut kemahuan mereka.

<ExpandableCard
title="What are smart contracts?"
contentPreview=''>

<a href="/developers/docs/smart-contracts/">Kontrak pintar</a> ialah program yang berjalan selain blok rantai Ethereum. Setiap token ERC-20, sebagai contoh, dilaksanakan sebagai kontrak pintar.

</ExpandableCard>

Secara khusus, Arbitrum melaksanakan suatu kontrak yang menggunakan simbol `ARB`. Tetapi itu tidak menghalangi orang lain daripada turut melaksanakan kontrak yang menggunakan simbol yang sama, atau serupa. Sesiapa yang menulis kontrak akan menentukan perkara yang kontrak akan lakukan.

## Nampak sah {#appearing-legitimate}

Terdapat beberapa trik yang dilakukan oleh pencipta token penipuan untuk kelihatan sah.

- **Nama dan simbol yang sah**. Seperti yang disebutkan sebelum ini, kontrak ERC-20 boleh mempunyai simbol dan nama yang sama dengan kontrak ERC-20 lain. Anda tidak boleh mengandalkan bidang-bidang tersebut untuk keselamatan.

- **Pemilik yang sah**. Token penipuan seringkali mengirimkan jumlah saldo yang signifikan kepada alamat-alamat yang dapat diharapkan menjadi pemegang sah token yang sebenar.

  Sebagai contoh, mari kita lihat lagi `wARB`. [Sekitar 16% daripada token-token tersebut](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) dipegang oleh alamat yang tanda awamnya ialah [Arbitrum Foundation: Deployer](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f). Ini _bukan_ alamat palsu, ini memang alamat yang [melaksanakan kontrak ARB sebenar di rangkaian utama Ethereum](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Oleh sebab baki ERC-20 bagi sesuatu alamat adalah sebahagian daripada storan kontrak ERC-20, ia boleh ditentukan oleh kontrak untuk menjadi apa-apa sahaja yang diinginkan oleh pembangun kontrak tersebut. Suatu kontrak juga mungkin melarang pemindahan supaya pengguna sah tidak akan dapat menghilangkan token penipuan tersebut.

- **Pemindahan yang sah**. _Pemilik yang sah tidak akan membayar untuk memindahkan token penipuan kepada orang lain, jadi jika terjadi pemindahan maka itu harus sah, bukan?_ **Salah**. Acara `pemindahan` dihasilkan oleh kontrak ERC-20. Seorang penipu dengan mudah dapat menulis kontrak sedemikian rupa sehingga akan menghasilkan tindakan-tindakan tersebut.

## Laman web penipuan {#websites}

Penipu juga boleh menghasilkan laman web yang sangat meyakinkan, kadang-kadang bahkan klon tepat dari laman asli dengan antara muka pengguna (UI) yang serupa, tetapi dengan trik-trik halus. Contohnya mungkin pautan luar yang kelihatan sah sebenarnya mengirim pengguna ke laman penipuan luar, atau arahan salah yang membimbing pengguna untuk mendedahkan kunci mereka atau menghantar dana ke alamat penyerang.

Amalan terbaik untuk menghindari hal ini adalah dengan cermat memeriksa URL laman yang anda lawati, dan menyimpan alamat laman sah yang dikenali dalam kegemaran anda. Kemudian, anda boleh mengakses laman sebenar melalui kegemaran anda tanpa sengaja membuat kesalahan ejaan atau mengandalkan pautan luar.

## Bagaimanakah anda boleh melindungi diri anda? {#protect-yourself}

1. **Semak alamat kontrak**. Token yang sah berasal dari organisasi yang sah, dan anda boleh melihat alamat kontrak di laman web organisasi tersebut. Sebagai contoh, [untuk `ARB` anda boleh melihat alamat-alamat sah di sini](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Token sebenar mempunyai kecairan**. Satu pilihan lain ialah melihat saiz kumpulan kecairan di [Uniswap](https://uniswap.org/), salah satu protokol pertukaran token yang paling biasa. Protokol ini berfungsi menggunakan kumpulan kecairan, iaitu para pelabur mendepositkan token mereka dengan harapan mendapat pulangan daripada yuran dagangan.

Biasanya, token penipuan memiliki kumpulan kecairan yang sangat kecil, jika ada, kerana para penipu tidak ingin mengambil risiko dengan aset sebenar. Sebagai contoh, kumpulan `ARB`/`ETH` Uniswap memiliki sekitar satu juta dolar ([lihat di sini untuk nilai terkini](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) dan membeli atau menjual jumlah kecil tidak akan mengubah harga:

![Membeli token sah](./uniswap-real.png)

Tetapi apabila anda cuba membeli token penipuan `wARB`, pembelian yang kecil pun akan mengubah harga lebih daripada 90%:

![Membeli token penipuan](./uniswap-scam.png)

Ini ialah bukti lain yang menunjukkan bahawa `wARB` tidak mungkin token yang sah.

3. **Lihat di Etherscan**. Banyak token penipuan sudah dikenal pasti dan dilaporkan oleh komuniti. Token-token seperti itu [ditandai di Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Meskipun Etherscan bukanlah sumber otoritatif yang pasti (hal ini karena sifat jaringan terdesentralisasi yang tidak dapat memiliki sumber otoritatif untuk legitimasi), token-token yang dikenal pasti oleh Etherscan sebagai penipuan berkemungkinan besar ialah penipuan.

   ![Token penipuan di Etherscan](./etherscan-scam.png)

## Kesimpulan {#conclusion}

Selagi masih ada nilai di dunia, akan selalu ada penipu yang berusaha mencuri nilai tersebut untuk diri mereka sendiri, dan dalam dunia terdesentralisasi, tiada sesiapa yang melindungi anda kecuali diri sendiri. Mudah-mudahan, anda ingat isi penting ini untuk membantu membezakan token yang sah daripada penipuan:

- Token penipuan meniru token yang sah, mereka boleh menggunakan nama, simbol, dan sebagainya yang sama.
- Token penipuan _tidak boleh_ menggunakan alamat kontrak yang sama.
- Sumber terbaik bagi alamat token yang sah ialah organisasi yang memiliki token tersebut.
- Jika gagal menggunakan cara tersebut, anda boleh menggunakan aplikasi popular dan dipercayai seperti [Uniswap](https://app.uniswap.org/#/swap) dan [Etherscan](https://etherscan.io/).
