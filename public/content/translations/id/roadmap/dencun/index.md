---
title: Pertanyaan Umum Cancun-Deneb (Dencun)
description: Pertanyaan yang sering muncul mengenai pembaruan jaringan Cancun-Deneb (Dencun)
lang: id
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) adalah peningkatan pada jaringan Ethereum, yang mengaktifkan **Proto-Danksharding (EIP-4844)**, memperkenalkan blobs data sementara untuk penyimpanan rollup [layer 2 (L2)](/glossary/#layer-2) yang lebih murah.

Tipe transaksi baru memungkinkan penyedia rollup menyimpan data dengan biaya lebih efisien dalam bentuk yang disebut "blobs." Blobs dijamin akan tersedia dalam jaringan selama sekitar 18 hari (lebih tepatnya, 4096 [epochs] (/glossary/#epoch)). Setelah periode ini, blobs dihapus dari jaringan, tetapi aplikasi masih dapat memverifikasi keabsahan data mereka menggunakan bukti.

Hal ini secara signifikan mengurangi biaya rollup, membatasi pertumbuhan rantai, dan membantu mendukung lebih banyak pengguna sambil tetap menjaga keamanan serta desentralisasi operator node.

## Kapan kita bisa mengharapkan rollup mencerminkan biaya yang lebih rendah karena Proto-Danksharding? {#when}

- Peningkatan ini di aktifkan pada masa 269568, pada tanggal **13-Maret-2024 jam 13:55Sore (UTC)**
- Semua penyedia rollup utama, seperti Arbitrum atau Optimism, telah mengisaratkan bahwa blob akan di dukung mengikuti peningkatan
- Garis waktu untuk dukungan setiap rollup mungkin berbeda-beda, karena setiap penyedia harus memperbarui sistem mereka agar dapat memanfaatkan ruang blob baru.

## Bagaimana cara menukarkan ETH setelah hard fork? {#scam-alert}

- Tidak Perlu Tindakan untuk ETH Anda: Setelah upgrade Ethereum Dencun, Anda tidak perlu mengonversi atau memperbarui ETH Anda. Saldo akun Anda akan tetap sama, dan ETH yang Anda miliki saat ini akan tetap dapat diakses dalam bentuknya yang ada setelah hard fork.
- Waspada Penipuan! <Emoji text="⚠️" /> Siapa pun yang menyuruh Anda "meng-upgrade" ETH Anda sedang mencoba menipu Anda. Tidak ada tindakan yang perlu dilakukan terkait upgrade ini. Aset milik anda tidak akan terpengaruh sama sekali. Ingat, tetap terinformasi adalah pertahanan terbaik untuk melawan penipuan.

[Lebih lanjut tentang mengenali dan menghindari penipuan](/security/)

## Masalah apa yang di pecahkan oleh peningkatan jaringan Decun? {#network-impact}

Dencun terutama menangani skalabilitas (menangani lebih banyak pengguna dan transaksi) dengan biaya yang terjangkau, sambil mempertahankan desentralisasi jaringan.

Komunitas Ethereum telah mengambil pendekatan “rollup-sentris” untuk pertumbuhannya, yang menempatkan layer 2 rollup sebagai cara utama untuk mendukung lebih banyak pengguna secara aman.

Jaringan rollup menangani pemrosesan (atau "eksekusi") transaksi secara terpisah dari Mainnet, lalu mempublikasikan bukti kriptografi dan/atau data transaksi yang dikompresi dari hasilnya kembali ke Mainnet untuk pencatatan. Menyimpan bukti-bukti ini membutuhkan biaya (dalam bentuk [gas](/daftar istilah/#gas)), yang, sebelum Proto-Danksharding, harus disimpan secara permanen oleh semua operator simpul jaringan, membuatnya menjadi tugas yang mahal.

Pengenalan Proto-Danksharding dalam upgrade Dencun menambahkan penyimpanan data lebih murah untuk bukti ini dengan hanya mewajibkan operator node menyimpan data tersebut selama sekitar 18 hari, setelah itu data dapat dihapus dengan aman untuk mencegah peningkatan kebutuhan perangkat keras.  Karena rollup biasanya memiliki periode penarikan selama 7 hari, model keamanan mereka tetap tidak berubah selama blob tersedia di L1 selama periode ini. Jendela pemangkasan 18 hari memberikan penyangga yang signifikan untuk periode ini.

[Lebih lanjut tentang penskalaan Ethereum](/roadmap/scaling/)

## Bagaimana cara mengakses data gumpalan lama? {#historical-access}

Sementara node Ethereum biasa akan selalu menyimpan state saat ini dari jaringan, data blob historis dapat dibuang sekitar 18 hari setelah diperkenalkan. Sebelum membuang data ini, Ethereum memastikan bahwa data tersebut telah tersedia untuk semua partisipan jaringan, memberi waktu untuk:

- Pihak yang berkepentingan untuk mengunduh dan menyimpan data.
- Penyelesaian semua periode tantangan rollup.
- Finalisasi transaksi rollup.

Data blob historis mungkin dibutuhkan untuk berbagai alasan dan dapat disimpan serta diakses menggunakan beberapa protokol terdesentralisasi:

- **Protokol pengindeks pihak ketiga**, seperti The Graph, menyimpan data ini melalui jaringan terdesentralisasi dari operator node yang diberi insentif melalui mekanisme kripto-ekonomi.
- **BitTorrent** adalah protokol terdesentralisasi di mana para relawan dapat menyimpan dan mendistribusikan data ini kepada orang lain.
- **[Jaringan portal Ethereum](/developers/docs/networking-layer/portal-network/)** bertujuan untuk menyediakan akses ke semua data Ethereum melalui jaringan operator node yang terdesentralisasi dengan mendistribusikan data di antara peserta yang mirip dengan BitTorrent.
- **Pengguna individu** selalu bebas menyimpan salinan data apa pun yang mereka inginkan untuk referensi historis.
- **Penyedia rollup** diberi insentif untuk menyimpan data ini guna meningkatkan pengalaman pengguna rollup mereka.
- **Penjelajah blok** biasanya menjalankan node arsip yang mengindeks dan menyimpan semua informasi ini agar mudah diakses sebagai referensi historis, yang dapat diakses pengguna melalui antarmuka web.

Penting untuk dicatat bahwa pemulihan status historis beroperasi pada **model kepercayaan 1 dari N**. Ini berarti Anda hanya memerlukan data dari satu sumber tepercaya untuk memverifikasi kebenarannya menggunakan status terkini jaringan.

## Bagaimana peningkatan ini berkontribusi pada peta jalan Ethereum yang lebih luas? {#roadmap-impact}

Proto-Danksharding menyiapkan panggung untuk implementasi penuh [Danksharding](/roadmap/danksharding/). Danksharding dirancang untuk mendistribusikan penyimpanan data rollup di antara operator node, sehingga setiap operator hanya perlu menangani sebagian kecil dari total data. Distribusi ini akan meningkatkan jumlah data blobs per blok, yang penting untuk meningkatkan skala Ethereum agar mampu menangani lebih banyak pengguna dan transaksi.

Skalabilitas ini penting untuk [mendukung miliaran pengguna di Ethereum](/roadmap/scaling/) dengan biaya yang terjangkau dan aplikasi yang lebih canggih, sambil mempertahankan jaringan yang terdesentralisasi. Tanpa perubahan ini, tuntutan perangkat keras bagi operator node akan meningkat, yang akan menuntut penggunaan peralatan yang semakin mahal. Hal ini dapat membuat operator yang lebih kecil tidak mampu bersaing, sehingga mengakibatkan terpusatnya kendali jaringan di antara beberapa operator besar, yang bertentangan dengan prinsip desentralisasi.

## Apakah peningkatan ini memengaruhi semua klien konsensus dan validator Ethereum? {#client-impact}

Ya, Proto-Danksharding (EIP-4844) memerlukan pembaruan pada klien eksekusi dan klien konsensus. Semua klien utama Ethereum telah merilis versi yang mendukung pemutakhiran. Untuk menjaga sinkronisasi dengan jaringan Ethereum setelah upgrade, operator node harus memastikan bahwa mereka menjalankan versi client yang didukung. Perlu dicatat bahwa informasi mengenai rilis client bersifat sensitif terhadap waktu, sehingga pengguna harus merujuk pada pembaruan terbaru untuk mendapatkan detail yang paling terkini. [lihat detail tentang rilis klien yang didukung](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Klien konsensus menangani perangkat lunak _Validator_, yang semuanya telah diperbarui untuk mengakomodasi pemutakhiran.

## Bgaimana Cancun-Deneb (Dencun) dampaknya ke jaringan ethereum {#testnet-impact}

- Devnet, Sepolia, dan Holesky semuanya telah menjalani upgrade Dencun dan Proto-Danksharding berfungsi sepenuhnya
- Rollup Pengembang dapat menggunakan jaringan ini untuk EIP-4844 testing
- kebanyakan user akan sepenuhnya tidak terpengaruh oleh perubahan ini pada masing masing tesnet

## Apakah smua transaksi akan memengaruhi di L2 sekarang menggunakan blob space sementara, ataukah pengguna masih bisa memilih? {#calldata-vs-blobs}

Transaksi rollup di Layer 2 (L2) Ethereum memiliki dua opsi untuk penyimpanan data: ruang blob sementara atau calldata kontrak pintar permanen. Ruang blob adalah pilihan yang ekonomis, menyediakan penyimpanan sementara dengan biaya lebih rendah. Hal ini menjamin ketersediaan data untuk semua periode hambatan yang diperlukan. Di sisi lain, calldata kontrak pintar menawarkan penyimpanan permanen, tetapi biayanya lebih tinggi.

Keputusan antara memakai blob sapce atau calldata terutama ditemuka oleh penyedia rollup. Mereka membuat keputusan ini berdasarkan permintaan saat ini untuk ruang blob. Jika ruang blob sedang tinggi permintaannya, rollup mungkin memilih calldata untuk memastikan data diposting tepat waktu.

Meskipun secara teori pengguna dapat memilih jenis penyimpanan yang mereka inginkan, penyedia rollup biasanya yang mengatur pilihan ini. Memberikan opsi ini kepada pengguna akan menambah kompleksitas, terutama dalam pengelompokan transaksi yang hemat biaya. Untuk detail spesifik mengenai pilihan ini, pengguna sebaiknya merujuk pada dokumentasi yang disediakan oleh masing-masing penyedia rollup.

## Apakah 4844 akan mengurangi gas L1? {#l1-fee-impact}

Tidak signifikan. Pasar gas baru diperkenalkan khusus untuk ruang blob, untuk digunakan oleh penyedia rollup. Meskipun biaya di L1 dapat dikurangi dengan memindahkan data rollup ke blobs, upgrade ini terutama berfokus pada pengurangan biaya di L2. Pengurangan biaya di L1 (Mainnet) mungkin terjadi sebagai efek sekunder, tetapi dalam skala yang lebih kecil._

- Pengurangan gas L1 akan proporsional dengan adopsi/penggunaan data blob oleh penyedia rollup
- Gas L1 kemungkinan akan tetap kompetitif dari aktivitas yang tidak terkait dengan rollup
- Rollup yang menggunakan ruang blob akan membutuhkan lebih sedikit gas di L1, sehingga membantu menurunkan biaya gas L1 dalam jangka pendek
- Ruang blob masih terbatas, jadi jika blob dalam sebuah blok sudah penuh/tersaturasi, rollup mungkin harus memposting datanya sebagai data permanen sementara, yang akan meningkatkan harga gas di L1 dan L2

## Apakah ini akan mengurangi biaya pada blockchain EVM lapisan 1 lainnya? {#alt-l1-fee-impact}

Tidak. Manfaat Proto-Danksharding khusus untuk rollup layer 2 Ethereum yang menyimpan bukti mereka di layer 1 (Mainnet).

Hanya karena kompatibel dengan Ethereum Virtual Machine (EVM) tidak berarti sebuah jaringan akan merasakan manfaat dari upgrade ini. Jaringan yang beroperasi secara independen dari Ethereum (baik kompatibel EVM maupun tidak) tidak menyimpan data mereka di Ethereum dan tidak akan mendapatkan manfaat dari upgrade ini.

[Lebih lanjut tentang rollup lapisan 2](/layer-2/)

## Selengkapnya tentang pelajar visual? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

Membuka Skala Ethereum, EIP-4844 — Finematics

<YouTube id="dFjyUY3e53Q" />

_Blobspace 101 dengan Domothy — Bankless_

## Bacaan lebih lanjut {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [eip-4844: Transaksi blob shard (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [pengumuman mainnet dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - Blog Yayasan Ethereum
- [panduan menumpang ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Proto-Danksharding FAQ](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [penjelasan mendalam tentang eip-4844: Inti dari Peningkatan Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [AllCoreDevs Update 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
