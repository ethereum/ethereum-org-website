---
title: "Apa itu NFT dan bagaimana mereka dapat digunakan dalam keuangan terdesentralisasi (DeFi)?"
description: "Pahami mekanisme token non-sepadan (NFT) di Ethereum dan bagaimana mereka digunakan dalam aplikasi keuangan terdesentralisasi (DeFi)."
lang: id
youtubeId: "Xdkkux6OxfM"
uploadDate: 2020-09-29
duration: "0:11:13"
educationLevel: beginner
topic:
  - "nfts"
  - "defi"
  - "erc-721"
  - "erc-1155"
  - "lending"
format: explainer
author: Finematics
breadcrumb: "NFT dan DeFi"
---

Penjelasan oleh **Finematics** yang mencakup mekanisme token non-sepadan (NFT) di Ethereum dan bagaimana mereka bersinggungan dengan keuangan terdesentralisasi (DeFi), termasuk standar token, kasus penggunaan, dan peminjaman berkolateral NFT.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=Xdkkux6OxfM) yang diterbitkan oleh Finematics. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Sepadan vs. non-sepadan (0:00) {#fungible-vs-non-fungible-000}

Mari kita mulai dengan kata "sepadan" (fungible). Sepadan berarti bahwa unit individu dari suatu aset dapat dipertukarkan dan tidak dapat dibedakan satu sama lain. Contoh yang baik dari aset sepadan adalah mata uang. Uang kertas lima dolar selalu memiliki nilai yang sama dengan uang kertas lima dolar lainnya. Anda tidak terlalu peduli uang kertas lima dolar mana yang Anda terima karena semuanya bernilai sama.

Namun, ketika berbicara tentang aset non-sepadan, setiap unit adalah unik dan tidak dapat langsung digantikan oleh yang lain. Contoh yang baik adalah tiket pesawat. Meskipun tiket pesawat mungkin terlihat mirip, masing-masing membawa nama penumpang, tujuan, waktu keberangkatan, dan nomor kursi yang berbeda. Mencoba menukar satu tiket pesawat dengan yang lain dapat menyebabkan beberapa masalah serius.

Contoh lainnya adalah kartu koleksi. Meskipun mungkin terlihat mirip, setiap kartu memiliki atribut yang berbeda. Faktor-faktor seperti tahun produksi atau bagaimana kartu tersebut dirawat dapat membuat perbedaan. Contoh ekstrem dari sesuatu yang non-sepadan adalah karya seni — sebuah lukisan, misalnya, biasanya hanya dibuat sebagai satu salinan asli.

#### Properti NFT (2:13) {#properties-of-nfts-213}

Sekarang setelah kita tahu apa arti "non-sepadan", mari kita lihat properti NFT yang paling umum.

- **Unik** — setiap NFT memiliki properti berbeda yang biasanya disimpan dalam metadata token
- **Terbukti langka** — biasanya ada jumlah NFT yang terbatas, dengan contoh ekstrem hanya memiliki satu salinan; jumlah token dapat diverifikasi di rantai blok
- **Tidak dapat dibagi** — sebagian besar NFT tidak dapat dipecah menjadi denominasi yang lebih kecil, jadi Anda tidak dapat membeli atau mentransfer sebagian dari NFT Anda

Sama seperti token standar, NFT juga menjamin kepemilikan aset, mudah ditransfer, dan anti-penipuan.

#### Standar token: ERC-20, ERC-721, dan ERC-1155 (3:17) {#token-standards-erc-20-erc-721-and-erc-1155-317}

Meskipun NFT dapat diimplementasikan pada rantai blok mana pun yang mendukung pemrograman kontrak pintar, standar yang paling menonjol adalah ERC-721 dan ERC-1155 di Ethereum. Sebelum kita menyelami standar NFT, mari kita rekap singkat ERC-20, karena ini akan berguna untuk perbandingan.

**ERC-20** adalah standar terkenal untuk membuat token di rantai blok Ethereum. Contohnya termasuk koin stabil seperti USDT atau DAI, dan token keuangan terdesentralisasi (DeFi) seperti LEND, YFI, SNX, dan UNI. ERC-20 memungkinkan pembuatan token sepadan — semua token yang dibuat di bawah standar ini sama sekali tidak dapat dibedakan. Tidak masalah apakah Anda menerima USDT dari seorang teman atau dari bursa; nilai setiap token adalah sama.

**ERC-721** adalah standar untuk membuat token non-sepadan. Ini memungkinkan pembuatan kontrak yang menghasilkan token yang dapat dibedakan dengan properti yang berbeda. Contoh umumnya adalah CryptoKitties yang terkenal — sebuah permainan yang memungkinkan pengumpulan dan pembiakan anak kucing virtual.

**ERC-1155** adalah langkah selanjutnya dalam pembuatan token non-sepadan. Standar ini memungkinkan pembuatan kontrak yang mendukung token sepadan dan non-sepadan. Ini dibuat oleh Enjin, sebuah proyek yang berfokus pada permainan berbasis rantai blok. Dalam banyak permainan seperti World of Warcraft, seorang pemain dapat memegang item non-sepadan — pedang, perisai, baju besi — dan item sepadan seperti emas atau panah. ERC-1155 memungkinkan pengembang untuk mendefinisikan token sepadan dan non-sepadan serta memutuskan berapa banyak dari masing-masing token yang harus ada.

#### Kasus penggunaan NFT (5:28) {#nft-use-cases-528}

Selain CryptoKitties, ada beberapa permainan populer lainnya yang memanfaatkan NFT, seperti Gods Unchained dan Decentraland. Decentraland adalah contoh yang menarik karena pemain dapat membeli bidang tanah digital yang nantinya dapat dijual kembali atau bahkan digunakan sebagai ruang iklan di dalam permainan.

Contoh lainnya termasuk pasar untuk seni digital, seperti Rarible dan SuperRare, dan bahkan agregator pasar seperti OpenSea. Contoh lain dari sesuatu yang langka yang dapat direpresentasikan sebagai NFT adalah nama domain — misalnya, Ethereum Name Service dengan ekstensi .eth dan Unstoppable Domains dengan ekstensi .crypto.

Beberapa NFT bisa sangat mahal. CryptoKitty termahal, Dragon, dijual seharga 600 ETH pada akhir tahun 2017 — bernilai sekitar seratus tujuh puluh ribu dolar pada saat itu. Nama domain langka seperti exchange.eth bisa bernilai lebih dari lima ratus ribu dolar.

#### NFT sebagai kolateral di DeFi (6:48) {#nfts-as-collateral-in-defi-648}

Ketika berbicara tentang DeFi, NFT dapat membuka lebih banyak potensi untuk keuangan terdesentralisasi. Saat ini, sebagian besar protokol peminjaman DeFi menggunakan kolateral. Salah satu ide paling menarik adalah menggunakan NFT sebagai kolateral. Ini berarti Anda akan dapat menyediakan NFT yang mewakili karya seni, tanah digital, atau bahkan real estat yang ditokenisasi sebagai kolateral, dan meminjam uang dengan jaminan tersebut.

Ini terdengar menjanjikan, tetapi ada masalah. Dalam platform peminjaman standar DeFi seperti Compound atau Aave, nilai kolateral yang disediakan dapat dengan mudah diukur dengan mengintegrasikan oracle harga. Ini mengagregasi harga dari berbagai sumber likuid, seperti bursa terpusat dan terdesentralisasi. Ketika berbicara tentang NFT, pasar untuk token tertentu sangat sering tidak likuid, yang membuat proses penemuan harga menjadi rumit.

Untuk memahami masalah ini dengan lebih baik, bayangkan seseorang membeli CryptoKitty langka seharga 10 ETH. NFT ini kemudian digunakan sebagai kolateral, dan peminjam menarik 1.700 DAI — dengan asumsi bahwa 10 ETH bernilai 3.500 dolar dan NFT khusus ini memiliki rasio pinjaman terhadap nilai sebesar 50%. Setelah ini, jika tidak ada orang lain yang bersedia membeli CryptoKitty khusus ini, pasar untuk NFT ini menjadi tidak likuid atau bahkan tidak ada. Satu-satunya asumsi adalah bahwa NFT tersebut masih bernilai sama dengan harga jual terakhirnya — yang mana bukan asumsi yang aman, karena nilai NFT dapat berubah secara dramatis.

Inilah sebabnya mengapa beberapa proyek yang menawarkan pinjaman berkolateral NFT menggunakan model yang sedikit berbeda: pinjaman peer-to-peer. Dalam model pasar ini, peminjam dapat menawarkan NFT mereka sebagai kolateral, dan pemberi pinjaman dapat memilih NFT mana yang bersedia mereka terima sebelum menginisialisasi pinjaman. NFT yang digunakan sebagai kolateral disimpan dalam kontrak eskro, dan jika peminjam gagal bayar dengan tidak mengembalikan jumlah yang dipinjam ditambah bunga tepat waktu, NFT tersebut ditransfer ke pemberi pinjaman. Ruang ini masih baru, tetapi salah satu perusahaan yang menggunakan model ini adalah NFTfi.

#### NFT sebagai produk keuangan (9:32) {#nfts-as-financial-products-932}

Selain digunakan sebagai kolateral, NFT juga dapat mewakili produk keuangan yang lebih kompleks seperti asuransi, obligasi, atau opsi. Yinsure dari Yearn Finance adalah contoh yang baik dari penggunaan NFT di ruang asuransi. Di Yinsure, setiap kontrak asuransi direpresentasikan sebagai NFT yang juga dapat diperdagangkan di pasar sekunder seperti Rarible.

Kami juga baru-baru ini mulai melihat konsep asli DeFi seperti penambangan likuiditas digunakan oleh proyek-proyek NFT. Rarible, misalnya, mulai memberi penghargaan kepada penggunanya dengan token tata kelola RARI karena membuat, membeli, dan menjual NFT di platform mereka.

#### Pasar NFT yang berkembang (10:30) {#the-growing-nft-market-1030}

Dengan lebih dari 100 juta dolar nilai NFT yang diperdagangkan dan 6 juta dolar pada bulan terakhir saja, ruang NFT adalah salah satu ceruk dengan pertumbuhan tercepat di kripto. Ini memiliki potensi besar mulai dari anak kucing digital hingga produk keuangan yang kompleks.