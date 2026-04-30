---
title: "Rollup: strategi penskalaan Ethereum yang paling mutakhir?"
description: "Eksplorasi mendalam tentang rollup sebagai strategi penskalaan utama Ethereum. Video ini menjelaskan cara kerja rollup Optimistic (Arbitrum, Optimism) dan rollup zero-knowledge."
lang: id
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "scaling"
  - "rollups"
  - "optimistic-rollups"
  - "zk-rollups"
format: explainer
author: Finematics
breadcrumb: "Rollup"
---

Penjelasan oleh **Finematics** yang membahas rollup sebagai strategi penskalaan utama Ethereum. Video ini membandingkan rollup Optimistic (Arbitrum, Optimism) dengan rollup ZK, dan mengkaji mengapa rollup telah menjadi metode dominan untuk penskalaan Ethereum.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=7pWxCklcNsU) yang dipublikasikan oleh Finematics. Transkrip ini telah diedit sedikit agar lebih mudah dibaca.*

#### Lapisan 2 (1:17) {#layer-2-117}

Penskalaan Ethereum telah menjadi salah satu topik yang paling banyak dibahas dalam dunia kripto. Perdebatan tentang penskalaan biasanya memanas selama periode aktivitas jaringan yang tinggi seperti tren CryptoKitties pada tahun 2017, Musim Panas keuangan terdesentralisasi (DeFi) pada tahun 2020, atau pasar bullish kripto pada awal tahun 2021. Selama periode ini, permintaan yang tak tertandingi untuk jaringan Ethereum mengakibatkan biaya gas yang sangat tinggi, sehingga mahal bagi pengguna sehari-hari untuk membayar transaksi mereka.

Untuk mengatasi masalah ini, pencarian solusi penskalaan yang paling mutakhir telah menjadi salah satu prioritas utama bagi berbagai tim dan komunitas Ethereum secara keseluruhan.

Secara umum, ada tiga cara utama untuk menskalakan Ethereum — atau bahkan, sebagian besar rantai blok lainnya: menskalakan rantai blok itu sendiri (penskalaan lapisan 1 (l1)), membangun di atas lapisan 1 (penskalaan lapisan 2 (l2)), dan membangun di samping lapisan 1 (rantai samping).

#### Di luar lapisan 1 (1:58) {#outside-of-layer-1-158}

Terkait lapisan 1 (l1), Eth2 adalah solusi yang dipilih untuk menskalakan rantai blok Ethereum. Eth2 mengacu pada serangkaian perubahan yang saling terhubung seperti migrasi ke Bukti Kepemilikan (PoS), menggabungkan state dari rantai blok Bukti Kerja (PoW) ke dalam rantai Bukti Kepemilikan (PoS) yang baru, dan sharding. Sharding, khususnya, dapat secara dramatis meningkatkan laju pemrosesan jaringan Ethereum, terutama jika digabungkan dengan rollup.

Terkait penskalaan di luar lapisan 1, berbagai solusi penskalaan yang berbeda telah dicoba dengan hasil yang beragam. Di satu sisi, kita memiliki solusi lapisan 2 (l2) seperti saluran (channels) yang sepenuhnya diamankan oleh Ethereum tetapi hanya berfungsi dengan baik untuk serangkaian aplikasi tertentu. Rantai samping, di sisi lain, biasanya kompatibel dengan EVM dan dapat menskalakan aplikasi tujuan umum. Kelemahan utamanya adalah rantai samping kurang aman dibandingkan solusi lapisan 2 karena tidak bergantung pada keamanan Ethereum dan malah memiliki model konsensus mereka sendiri.

Sebagian besar rollup bertujuan untuk mencapai yang terbaik dari kedua dunia ini dengan menciptakan solusi penskalaan tujuan umum sambil tetap sepenuhnya bergantung pada keamanan Ethereum. Ini adalah pencapaian tertinggi dari penskalaan, karena memungkinkan penerapan semua kontrak pintar yang ada di Ethereum ke rollup dengan sedikit atau tanpa perubahan tanpa mengorbankan keamanan. Tidak heran jika rollup mungkin merupakan solusi penskalaan yang paling diantisipasi dari semuanya.

Rollup adalah jenis solusi penskalaan yang bekerja dengan mengeksekusi transaksi di luar lapisan 1 tetapi memposting data transaksi di lapisan 1. Hal ini memungkinkan rollup untuk menskalakan jaringan dan tetap mendapatkan keamanannya dari konsensus Ethereum. Memindahkan komputasi secara offchain pada dasarnya memungkinkan pemrosesan lebih banyak transaksi secara total, karena hanya sebagian data dari transaksi rollup yang harus muat ke dalam blok Ethereum.

Untuk mencapai hal ini, transaksi rollup dieksekusi pada rantai terpisah yang bahkan dapat menjalankan versi EVM khusus rollup. Langkah selanjutnya setelah mengeksekusi transaksi pada rollup adalah menggabungkannya dan mempostingnya ke rantai utama Ethereum. Seluruh proses ini pada dasarnya mengeksekusi transaksi, mengambil data, mengompresinya, dan menggulungnya ke rantai utama dalam satu kumpulan — itulah sebabnya dinamakan "rollup."

Setiap rollup menerapkan serangkaian kontrak pintar di lapisan 1 yang bertanggung jawab untuk memproses setoran dan penarikan serta memverifikasi bukti. Bukti juga merupakan tempat di mana perbedaan utama antara berbagai jenis rollup ikut berperan. Rollup Optimistic menggunakan bukti penipuan, sementara rollup ZK menggunakan bukti validitas.

#### Rollup Optimistic (4:26) {#optimistic-rollups-426}

Rollup Optimistic memposting data ke lapisan 1 (l1) dan mengasumsikan bahwa data tersebut benar — itulah sebabnya dinamakan "optimistic". Jika data yang diposting valid, kita berada di jalur yang tepat dan tidak ada hal lain yang perlu dilakukan. Rollup Optimistic mendapat keuntungan karena tidak perlu melakukan pekerjaan tambahan dalam skenario yang optimis.

Jika terjadi transaksi yang tidak valid, sistem harus dapat mengidentifikasinya, memulihkan state yang benar, dan menghukum pihak yang mengirimkan transaksi tersebut. Untuk mencapai hal ini, rollup Optimistic menerapkan sistem penyelesaian sengketa yang mampu memverifikasi bukti penipuan, mendeteksi transaksi penipuan, dan mencegah aktor jahat untuk mengirimkan transaksi tidak valid lainnya atau bukti penipuan yang salah.

Dalam sebagian besar implementasi rollup Optimistic, pihak yang dapat mengirimkan kumpulan transaksi ke lapisan 1 harus memberikan jaminan, biasanya dalam bentuk ETH. Peserta jaringan lainnya dapat mengirimkan bukti penipuan jika mereka menemukan transaksi yang salah. Setelah bukti penipuan dikirimkan, sistem memasuki mode penyelesaian sengketa. Dalam mode ini, transaksi yang mencurigakan dieksekusi lagi — kali ini di rantai utama Ethereum. Jika eksekusi membuktikan bahwa transaksi tersebut memang penipuan, pihak yang mengirimkan transaksi ini akan dihukum, biasanya dengan pemotongan ETH yang dijaminkan.

Untuk mencegah aktor jahat mengirimkan spam ke jaringan dengan bukti penipuan yang salah, pihak yang ingin mengirimkan bukti penipuan biasanya juga harus memberikan jaminan yang dapat dikenakan pemotongan.

Agar dapat mengeksekusi transaksi rollup di lapisan 1, rollup Optimistic harus menerapkan sistem yang mampu memutar ulang transaksi dengan state yang sama persis dengan yang ada saat transaksi tersebut awalnya dieksekusi di rollup. Ini adalah salah satu bagian rumit dari rollup Optimistic dan biasanya dicapai dengan membuat kontrak manajer terpisah yang menggantikan panggilan fungsi tertentu dengan state dari rollup.

Sistem dapat bekerja seperti yang diharapkan dan mendeteksi penipuan bahkan jika hanya ada satu pihak yang jujur yang memantau state rollup dan mengirimkan bukti penipuan jika diperlukan. Karena insentif yang tepat di dalam sistem rollup, memasuki proses penyelesaian sengketa seharusnya menjadi situasi yang luar biasa dan bukan sesuatu yang terjadi setiap saat.

Terkait rollup ZK, tidak ada penyelesaian sengketa sama sekali. Hal ini dimungkinkan dengan memanfaatkan bagian kriptografi cerdas yang disebut bukti zero-knowledge — itulah sebabnya dinamakan rollup ZK. Dalam model ini, setiap kumpulan yang diposting ke lapisan 1 menyertakan bukti kriptografi yang disebut ZK-SNARK. Bukti tersebut dapat diverifikasi dengan cepat oleh kontrak lapisan 1 saat kumpulan transaksi dikirimkan, dan kumpulan yang tidak valid dapat langsung ditolak.

#### Perbedaan lainnya (7:28) {#other-differences-728}

Karena sifat proses penyelesaian sengketa, rollup Optimistic harus memberikan waktu yang cukup kepada semua peserta jaringan untuk mengirimkan bukti penipuan sebelum menyelesaikan transaksi di lapisan 1 (l1). Periode ini biasanya cukup lama — untuk memastikan bahwa bahkan dalam skenario terburuk, transaksi penipuan masih dapat disengketakan. Hal ini menyebabkan penarikan dari rollup Optimistic menjadi cukup lama, karena pengguna harus menunggu hingga satu atau dua minggu untuk dapat menarik dana mereka kembali ke lapisan 1.

Untungnya, ada beberapa proyek yang berupaya memperbaiki situasi ini dengan menyediakan "jalan keluar likuiditas" yang cepat. Proyek-proyek ini menawarkan penarikan yang hampir instan kembali ke lapisan 1, lapisan 2 (l2) lainnya, atau bahkan rantai samping dan mengenakan sedikit biaya untuk kenyamanan tersebut. Hop Protocol dan Connext adalah proyek-proyek yang patut diperhatikan.

Rollup ZK tidak memiliki masalah penarikan yang lama, karena dana tersedia untuk ditarik segera setelah kumpulan rollup, bersama dengan bukti validitas, dikirimkan ke lapisan 1.

Namun, rollup ZK memiliki kelemahannya sendiri. Karena kompleksitas teknologinya, jauh lebih sulit untuk membuat rollup ZK yang kompatibel dengan EVM, yang membuatnya lebih sulit untuk menskalakan aplikasi tujuan umum tanpa harus menulis ulang logika aplikasi. Meskipun demikian, zkSync membuat kemajuan yang signifikan di bidang ini dan mereka mungkin dapat meluncurkan rollup ZK yang kompatibel dengan EVM dalam waktu dekat.

Rollup Optimistic memiliki waktu yang sedikit lebih mudah dengan kompatibilitas EVM. Mereka masih harus menjalankan versi EVM mereka sendiri dengan beberapa modifikasi, tetapi 99% kontrak dapat di-porting tanpa melakukan perubahan apa pun. Rollup ZK juga jauh lebih berat secara komputasi daripada rollup Optimistic, yang berarti bahwa node yang menghitung bukti ZK harus berupa mesin berspesifikasi tinggi, sehingga sulit bagi pengguna lain untuk menjalankannya.

#### Peningkatan penskalaan (9:32) {#scaling-improvements-932}

Terkait peningkatan penskalaan, kedua jenis rollup seharusnya dapat menskalakan Ethereum dari sekitar 15–45 transaksi per detik (tergantung pada jenis transaksi) hingga sebanyak 1.000–4.000 transaksi per detik. Perlu dicatat bahwa dimungkinkan untuk memproses lebih banyak transaksi per detik dengan menawarkan lebih banyak ruang untuk kumpulan rollup di lapisan 1 (l1).

Ini juga alasan mengapa Eth2 dapat menciptakan sinergi besar dengan rollup, karena hal ini meningkatkan kemungkinan ruang ketersediaan data dengan membuat beberapa shard — yang masing-masing mampu menyimpan sejumlah besar data. Kombinasi Eth2 dan rollup dapat meningkatkan kecepatan transaksi Ethereum hingga sebanyak 100.000 transaksi per detik.

Optimism dan Arbitrum saat ini merupakan opsi paling populer terkait rollup Optimistic. Optimism telah diluncurkan sebagian ke Mainnet Ethereum dengan serangkaian mitra terbatas seperti Synthetix dan Uniswap untuk memastikan bahwa teknologi tersebut berfungsi seperti yang diharapkan sebelum peluncuran penuh. Arbitrum telah menerapkan versinya ke Mainnet dan mulai melakukan orientasi berbagai proyek ke dalam ekosistemnya.

Beberapa proyek paling terkenal yang diluncurkan di Arbitrum termasuk Uniswap, Sushi, Bancor, Augur, Chainlink, Aave, dan banyak lagi. Arbitrum juga telah mengumumkan kemitraannya dengan Reddit, yang berfokus pada peluncuran rantai rollup terpisah untuk menskalakan sistem imbalan mereka. Optimism bermitra dengan MakerDAO untuk membuat Jembatan Optimism Dai dan memungkinkan penarikan cepat DAI dan token lainnya kembali ke lapisan 1.

Meskipun Arbitrum dan Optimism mencoba mencapai tujuan yang sama — membangun solusi rollup Optimistic yang kompatibel dengan EVM — ada beberapa perbedaan dalam desain mereka. Arbitrum memiliki model penyelesaian sengketa yang berbeda. Alih-alih menjalankan ulang seluruh transaksi di lapisan 1 untuk memverifikasi apakah bukti penipuan tersebut valid, mereka telah menghasilkan model multi-putaran interaktif yang memungkinkan penyempitan ruang lingkup sengketa dan berpotensi hanya mengeksekusi beberapa instruksi di lapisan 1 untuk memeriksa apakah transaksi yang mencurigakan tersebut valid.

Perbedaan utama lainnya adalah pendekatan untuk menangani pengurutan transaksi dan MEV. Arbitrum pada awalnya akan menjalankan sekuenser yang bertanggung jawab untuk mengurutkan transaksi, tetapi mereka ingin mendesentralisasikannya dalam jangka panjang. Optimism lebih memilih pendekatan lain di mana pengurutan transaksi — dan karenanya MEV — dapat dilelang ke pihak lain untuk jangka waktu tertentu.

#### Rollup ZK (13:10) {#zk-rollups-1310}

Meskipun tampaknya komunitas Ethereum sebagian besar berfokus pada rollup Optimistic — setidaknya dalam jangka pendek — proyek-proyek yang mengerjakan rollup ZK juga berkembang sangat cepat.

Loopring menggunakan teknologi rollup ZK untuk menskalakan protokol pertukaran dan pembayarannya. Hermez dan ZKTube sedang berupaya menskalakan pembayaran menggunakan rollup ZK, dengan Hermez juga membangun rollup ZK yang kompatibel dengan EVM. Aztec berfokus pada menghadirkan fitur privasi ke teknologi rollup ZK mereka.

Rollup berbasis StarkWare telah digunakan secara luas oleh proyek-proyek seperti DeversiFi, Immutable X, dan dYdX. Seperti yang disebutkan sebelumnya, zkSync sedang mengerjakan mesin virtual yang kompatibel dengan EVM yang akan dapat sepenuhnya mendukung kontrak pintar arbitrer apa pun yang ditulis dalam Solidity.

#### DeFi (14:02) {#defi-1402}

Rollup juga seharusnya berdampak besar pada keuangan terdesentralisasi (DeFi). Pengguna yang sebelumnya tidak dapat bertransaksi di Ethereum karena biaya transaksi yang tinggi akan dapat tetap berada di ekosistem saat aktivitas jaringan tinggi di lain waktu. Rollup juga akan memungkinkan jenis aplikasi baru yang membutuhkan transaksi lebih murah dan waktu konfirmasi lebih cepat — semuanya sambil sepenuhnya diamankan oleh konsensus Ethereum. Tampaknya rollup dapat memicu periode pertumbuhan tinggi lainnya untuk DeFi.

#### Tantangan (14:29) {#challenges-1429}

Namun, ada beberapa tantangan terkait rollup. Komposabilitas adalah salah satunya — untuk menyusun transaksi yang menggunakan beberapa protokol, semuanya harus diterapkan pada rollup yang sama.

Tantangan lainnya adalah likuiditas yang terpecah. Tanpa adanya uang baru yang masuk ke ekosistem Ethereum secara keseluruhan, likuiditas yang ada di lapisan 1 (l1) dalam protokol seperti Uniswap atau Aave akan dibagi antara lapisan 1 dan beberapa implementasi rollup. Likuiditas yang lebih rendah biasanya berarti selisih harga yang lebih tinggi dan eksekusi perdagangan yang lebih buruk.

Ini juga berarti bahwa secara alami akan ada pemenang dan pecundang. Saat ini, ekosistem Ethereum yang ada tidak cukup besar untuk memanfaatkan semua solusi penskalaan. Hal ini mungkin — dan kemungkinan besar akan — berubah dalam jangka panjang, tetapi dalam jangka pendek, kita mungkin melihat beberapa rollup dan solusi penskalaan lainnya menjadi kota hantu. Di masa depan, kita mungkin juga melihat pengguna hidup sepenuhnya di dalam satu ekosistem rollup dan tidak berinteraksi dengan rantai utama Ethereum dan solusi penskalaan lainnya untuk jangka waktu yang lama.

#### Ancaman terhadap rantai samping (15:44) {#threat-to-sidechains-1544}

Satu pertanyaan yang sangat sering muncul saat membahas rollup adalah apakah mereka merupakan ancaman bagi rantai samping. Rantai samping masih akan memiliki tempatnya di ekosistem Ethereum. Meskipun biaya transaksi di lapisan 2 (l2) akan jauh lebih rendah daripada di lapisan 1 (l1), kemungkinan besar biayanya masih cukup tinggi untuk menyingkirkan jenis aplikasi tertentu seperti game dan aplikasi bervolume tinggi lainnya. Hal ini mungkin berubah ketika Ethereum memperkenalkan sharding, tetapi pada saat itu rantai samping mungkin menciptakan efek jaringan yang cukup untuk bertahan dalam jangka panjang.

Selain itu, biaya pada rollup lebih tinggi daripada pada rantai samping karena setiap kumpulan rollup masih harus membayar ruang blok Ethereum. Komunitas Ethereum menaruh fokus besar pada rollup dalam strategi penskalaan Ethereum — setidaknya dalam jangka pendek hingga menengah dan berpotensi lebih lama lagi.