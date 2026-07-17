---
title: Cancun-Deneb (Dencun)
metaTitle: FAQ Cancun-Deneb (Dencun)
description: Pertanyaan yang sering diajukan mengenai pembaruan jaringan Cancun-Deneb (Dencun)
lang: id
---

Cancun-Deneb (Dencun) adalah pembaruan pada jaringan Ethereum, yang mengaktifkan **Proto-Danksharding (EIP-4844)**, memperkenalkan **blob** data sementara untuk penyimpanan rollup [lapisan 2 (l2)](/glossary/#layer-2) yang lebih murah.

Jenis transaksi baru memungkinkan penyedia rollup untuk menyimpan data dengan lebih hemat biaya dalam apa yang dikenal sebagai "blob". Blob dijamin tersedia di jaringan selama sekitar 18 hari (lebih tepatnya, 4096 [Epok](/glossary/#epoch)). Setelah periode ini, blob dipangkas dari jaringan, tetapi aplikasi masih dapat memverifikasi validitas datanya menggunakan bukti (proof). 

Hal ini secara signifikan mengurangi biaya rollup, membatasi pertumbuhan rantai, dan membantu mendukung lebih banyak pengguna sambil mempertahankan keamanan dan sekumpulan operator node yang terdesentralisasi.

## Kapan kita dapat mengharapkan rollup mencerminkan biaya yang lebih rendah karena Proto-Danksharding? {#when}

- Pembaruan ini diaktifkan pada Epok 269568, pada **13-Mar-2024 pukul 13:55 (UTC)**
- Semua penyedia rollup utama, seperti Arbitrum atau Optimism, telah memberi sinyal bahwa blob akan didukung segera setelah pembaruan
- Garis waktu untuk dukungan rollup individu dapat bervariasi, karena setiap penyedia harus memperbarui sistem mereka untuk memanfaatkan ruang blob yang baru

## Bagaimana ETH dapat dikonversi setelah percabangan keras? {#scam-alert}

- **Tidak Ada Tindakan yang Diperlukan untuk ETH Anda**: Setelah pembaruan Dencun Ethereum, tidak perlu mengonversi atau memperbarui ETH Anda. Saldo akun Anda akan tetap sama, dan ETH yang Anda pegang saat ini akan tetap dapat diakses dalam bentuknya yang ada setelah percabangan keras.
- **Hati-hati terhadap Penipuan!** <Emoji text="⚠️" /> **siapa pun yang menginstruksikan Anda untuk "memperbarui" ETH Anda sedang mencoba menipu Anda.** Tidak ada yang perlu Anda lakukan sehubungan dengan pembaruan ini. Aset Anda tidak akan terpengaruh sama sekali. Ingat, tetap mendapat informasi adalah pertahanan terbaik terhadap penipuan.

[Lebih lanjut tentang mengenali dan menghindari penipuan](/security/)

## Masalah apa yang diselesaikan oleh pembaruan jaringan Dencun? {#network-impact}

Dencun terutama mengatasi **skalabilitas** (menangani lebih banyak pengguna dan lebih banyak transaksi) dengan **biaya yang terjangkau**, sambil **mempertahankan desentralisasi** jaringan.

Komunitas Ethereum telah mengambil pendekatan "berpusat pada rollup" untuk pertumbuhannya, yang menempatkan rollup lapisan 2 (l2) sebagai sarana utama untuk mendukung lebih banyak pengguna dengan aman.

Jaringan rollup menangani _pemrosesan_ (atau "eksekusi") transaksi secara terpisah dari Mainnet dan kemudian memublikasikan bukti kriptografi dan/atau data transaksi terkompresi dari hasilnya kembali ke Mainnet untuk pencatatan. Menyimpan bukti-bukti ini membawa biaya (dalam bentuk [gas](/glossary/#gas)), yang, sebelum Proto-Danksharding, harus disimpan secara permanen oleh semua operator node jaringan, menjadikannya tugas yang mahal.

Pengenalan Proto-Danksharding dalam pembaruan Dencun menambahkan penyimpanan data yang lebih murah untuk bukti-bukti ini dengan hanya mewajibkan operator node untuk menyimpan data ini selama sekitar 18 hari, setelah itu data dapat dihapus dengan aman untuk mencegah perluasan persyaratan perangkat keras. Karena rollup biasanya memiliki periode penarikan selama 7 hari, model keamanan mereka tidak berubah selama blob tersedia di lapisan 1 (l1) untuk durasi ini. Jendela pemangkasan 18 hari memberikan penyangga yang signifikan untuk periode ini.

[Lebih lanjut tentang penskalaan Ethereum](/roadmap/scaling/)

## Bagaimana data blob lama diakses? {#historical-access}

Meskipun node Ethereum reguler akan selalu menyimpan _state saat ini_ dari jaringan, data blob historis dapat dibuang sekitar 18 hari setelah pengenalannya. Sebelum membuang data ini, Ethereum memastikan bahwa data tersebut telah tersedia untuk semua peserta jaringan, memberikan waktu untuk:

- Pihak yang berkepentingan untuk mengunduh dan menyimpan data.
- Penyelesaian semua periode tantangan rollup.
- Finalisasi transaksi rollup.

Data blob _historis_ mungkin diinginkan karena berbagai alasan dan dapat disimpan serta diakses menggunakan beberapa protokol terdesentralisasi:

- **Protokol pengindeksan pihak ketiga**, seperti The Graph, menyimpan data ini melalui jaringan operator node terdesentralisasi yang diberi insentif oleh mekanisme ekonomi kripto.
- **BitTorrent** adalah protokol terdesentralisasi di mana sukarelawan dapat menyimpan dan mendistribusikan data ini kepada orang lain.
- **[Portal Network Ethereum](/developers/docs/networking-layer/portal-network/)** bertujuan untuk menyediakan akses ke semua data Ethereum melalui jaringan operator node terdesentralisasi dengan mendistribusikan data di antara peserta yang mirip dengan BitTorrent.
- **Pengguna individu** selalu bebas untuk menyimpan salinan data mereka sendiri yang mereka inginkan untuk referensi historis.
- **Penyedia rollup** diberi insentif untuk menyimpan data ini guna meningkatkan pengalaman pengguna rollup mereka.
- **Penjelajah blok (block explorer)** biasanya menjalankan node arsip yang mengindeks dan menyimpan semua informasi ini untuk referensi historis yang mudah, dapat diakses oleh pengguna melalui antarmuka web.

Penting untuk dicatat bahwa memulihkan state historis beroperasi pada **model kepercayaan 1-dari-N**. Ini berarti Anda hanya memerlukan data dari _satu sumber tepercaya_ untuk memverifikasi kebenarannya menggunakan state jaringan saat ini.

## Bagaimana pembaruan ini berkontribusi pada peta jalan Ethereum yang lebih luas? {#roadmap-impact}

Proto-Danksharding menyiapkan panggung untuk implementasi penuh [danksharding](/roadmap/danksharding/). Danksharding dirancang untuk mendistribusikan penyimpanan data rollup di seluruh operator node, sehingga setiap operator hanya perlu menangani sebagian kecil dari total data. Distribusi ini akan meningkatkan jumlah blob data per blok, yang sangat penting untuk menskalakan Ethereum guna menangani lebih banyak pengguna dan transaksi.

Skalabilitas ini sangat penting untuk [mendukung miliaran pengguna di Ethereum](/roadmap/scaling/) dengan biaya terjangkau dan aplikasi yang lebih canggih, sambil mempertahankan jaringan yang terdesentralisasi. Tanpa perubahan ini, permintaan perangkat keras untuk operator node akan meningkat, yang mengarah pada kebutuhan akan peralatan yang semakin mahal. Hal ini dapat menyingkirkan operator yang lebih kecil karena biaya, yang mengakibatkan konsentrasi kontrol jaringan di antara beberapa operator besar, yang akan bertentangan dengan prinsip desentralisasi.

## Apakah pembaruan ini memengaruhi semua klien konsensus dan validator Ethereum? {#client-impact}

Ya, Proto-Danksharding (EIP-4844) memerlukan pembaruan pada klien eksekusi dan klien konsensus. Semua klien utama Ethereum telah merilis versi yang mendukung pembaruan tersebut. Untuk mempertahankan sinkronisasi dengan jaringan Ethereum pasca-pembaruan, operator node harus memastikan mereka menjalankan versi klien yang didukung. Perhatikan bahwa informasi tentang rilis klien sensitif terhadap waktu, dan pengguna harus merujuk pada pembaruan terbaru untuk detail paling terkini. [Lihat detail tentang rilis klien yang didukung](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Klien konsensus menangani perangkat lunak _Validator_, yang semuanya telah diperbarui untuk mengakomodasi pembaruan tersebut.

## Bagaimana Cancun-Deneb (Dencun) memengaruhi testnet Ethereum? {#testnet-impact}

- Devnet, Sepolia, dan Holesky semuanya telah menjalani pembaruan Dencun dan memiliki Proto-Danksharding yang berfungsi penuh
- Pengembang rollup dapat menggunakan jaringan ini untuk pengujian EIP-4844
- Sebagian besar pengguna sama sekali tidak akan terpengaruh oleh perubahan ini pada setiap testnet

## Apakah semua transaksi di L2 sekarang akan menggunakan ruang blob sementara, atau apakah Anda dapat memilih? {#calldata-vs-blobs}

Transaksi rollup di lapisan 2 (l2) Ethereum memiliki opsi untuk menggunakan dua jenis penyimpanan data: ruang blob sementara atau data panggilan (calldata) kontrak pintar permanen. Ruang blob adalah pilihan yang ekonomis, menyediakan penyimpanan sementara dengan biaya lebih rendah. Ini menjamin ketersediaan data untuk semua periode tantangan yang diperlukan. Di sisi lain, data panggilan kontrak pintar menawarkan penyimpanan permanen tetapi lebih mahal.

Keputusan antara menggunakan ruang blob atau data panggilan terutama dibuat oleh penyedia rollup. Mereka mendasarkan keputusan ini pada permintaan ruang blob saat ini. Jika ruang blob sangat diminati, rollup dapat memilih data panggilan untuk memastikan data diposting tepat waktu.

Meskipun secara teoretis pengguna dapat memilih jenis penyimpanan pilihan mereka, penyedia rollup biasanya mengelola pilihan ini. Menawarkan opsi ini kepada pengguna akan menambah kompleksitas, terutama dalam transaksi penggabungan (bundling) yang hemat biaya. Untuk detail spesifik tentang pilihan ini, pengguna harus merujuk pada dokumentasi yang disediakan oleh masing-masing penyedia rollup.

## Apakah 4844 akan mengurangi gas lapisan 1 (l1)? {#l1-fee-impact}

Tidak secara signifikan. Pasar gas baru diperkenalkan secara eksklusif untuk ruang blob, untuk digunakan oleh penyedia rollup. _Meskipun biaya di lapisan 1 (l1) dapat dikurangi dengan mengalihkan data rollup ke blob, pembaruan ini terutama berfokus pada pengurangan biaya lapisan 2 (l2). Pengurangan biaya di lapisan 1 (l1) (Mainnet) dapat terjadi sebagai efek orde kedua pada tingkat yang lebih rendah._

- Pengurangan gas lapisan 1 (l1) akan sebanding dengan adopsi/penggunaan data blob oleh penyedia rollup
- Gas lapisan 1 (l1) kemungkinan akan tetap kompetitif dari aktivitas yang tidak terkait dengan rollup
- Rollup yang mengadopsi penggunaan ruang blob akan menuntut lebih sedikit gas lapisan 1 (l1), membantu mendorong biaya gas lapisan 1 (l1) ke bawah dalam waktu dekat
- Ruang blob masih terbatas, jadi jika blob di dalam blok jenuh/penuh, maka rollup mungkin diharuskan untuk memposting data mereka sebagai data permanen untuk sementara waktu, yang akan mendorong harga gas lapisan 1 (l1) dan lapisan 2 (l2) naik

## Apakah ini akan mengurangi biaya pada blockchain lapisan 1 (l1) EVM lainnya? {#alt-l1-fee-impact}

Tidak. Manfaat Proto-Danksharding khusus untuk rollup lapisan 2 (l2) Ethereum yang menyimpan buktinya di lapisan 1 (l1) (Mainnet).

Hanya dengan kompatibel dengan Mesin Virtual Ethereum (EVM) tidak berarti bahwa suatu jaringan akan melihat manfaat apa pun dari pembaruan ini. Jaringan yang beroperasi secara independen dari Ethereum (baik kompatibel dengan EVM atau tidak) tidak menyimpan datanya di Ethereum dan tidak akan melihat manfaat apa pun dari pembaruan ini.

[Lebih lanjut tentang rollup lapisan 2](/layer-2/)

## Lebih suka belajar secara visual? {#visual-learner}

<VideoWatch slug="eip-4844-dencun-explained" />

_Membuka Penskalaan Ethereum, EIP-4844 — Finematics _

<VideoWatch slug="blobspace-101-dencun" />

_Blobspace 101 bersama Domothy — Bankless_

## Bacaan lebih lanjut {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Transaksi blob shard (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Pengumuman Mainnet Dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog Ethereum Foundation_
- [Panduan Hitchhiker untuk Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [FAQ Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Penjelasan Mendalam tentang EIP-4844: Inti dari Pembaruan Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Pembaruan AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_