---
title: Penggabungan
description: Pelajari tentang Penggabungan - ketika Jaringan Utama Ethereum mengadopsi bukti taruhan.
lang: id
template: upgrade
image: /upgrades/merge.png
alt:
summaryPoint1: Jaringan Utama Ethereum menggunakan bukti taruhan, tetapi tidak selalu demikian.
summaryPoint2: Peningkatan dari mekanisme bukti kerja yang asli menjadi bukti taruhan disebut Penggabungan.
summaryPoint3: Penggabungan mengacu pada penggabungan Jaringan Utama Ethereum asli dengan rantai blok bukti taruhan terpisah yang disebut Rantai Suar, yang sekarang ada sebagai satu rantai.
summaryPoint4: Penggabungan ini mengurangi konsumsi energi Ethereum sebesar ~99,95%.
---

<UpgradeStatus dateKey="page-upgrades:page-upgrades-beacon-date">
  Penggabungan telah dilaksanakan pada tanggal 15 September 2022. Hal ini menyelesaikan transisi Ethereum ke konsensus bukti taruhan, yang secara resmi tidak lagi menggunakan bukti kerja dan mengurangi konsumsi energi sebesar ~99,95%.
</UpgradeStatus>

## Apa itu Penggabungan? {#what-is-the-merge}

Penggabungan adalah penyatuan lapisan eksekusi asli Ethereum (Jaringan Utama yang telah ada sejak [genesis](/history/#frontier)) dengan lapisan konsensus bukti taruhan baru, Rantai Suar. Ini menghilangkan kebutuhan akan penambangan yang boros energi dan sebagai gantinya memungkinkan jaringan untuk diamankan menggunakan ETH yang dipertaruhkan. Ini adalah langkah yang sangat menarik dalam mewujudkan visi Ethereum - skalabilitas, keamanan, dan keberlanjutan yang lebih baik.

<MergeInfographic />

Pada awalnya, [Rantai Suar](/roadmap/beacon-chain/) dikirim secara terpisah dari [Jaringan Utama](/glossary/#mainnet). Jaringan Utama Ethereum - dengan semua akun, saldo, kontrak pintar, dan status rantai blok - tetap diamankan oleh [bukti kerja](/developers/docs/consensus-mechanisms/pow/), bahkan saat Rantai Suar berjalan paralel menggunakan [bukti taruhan](/developers/docs/consensus-mechanisms/pos/). Penggabungan adalah saat kedua sistem ini akhirnya digabungkan, dan bukti kerja digantikan secara permanen oleh bukti taruhan.

Bayangkan Ethereum adalah sebuah pesawat luar angkasa yang diluncurkan sebelum cukup siap untuk melakukan perjalanan antarbintang. Dengan Rantai Suar, komunitas membuat mesin baru dan lambung kapal yang dikeraskan. Setelah pengujian yang signifikan, tiba saatnya untuk menukar mesin baru dengan mesin lama di tengah penerbangan. Penggabungan mesin baru yang lebih efisien ke dalam kapal yang sudah ada memungkinkannya untuk menjelajah beberapa tahun cahaya dan menjelajahi alam semesta.

## Penggabungan dengan Jaringan Utama {#merging-with-mainnet}

Bukti kerja mengamankan Jaringan Utama Ethereum dari awal hingga Penggabungan. Hal ini memungkinkan rantai blok Ethereum yang kita semua kenal hadir pada bulan Juli 2015 dengan semua fitur-fiturnya yang sudah tidak asing lagi - transaksi, kontrak pintar, akun, dll.

Sepanjang sejarah Ethereum, para pengembang mempersiapkan diri untuk transisi dari bukti kerja ke bukti taruhan. Pada tanggal 1 Desember 2020, Rantai Suar dibuat sebagai rantai blok yang terpisah dari Jaringan Utama, berjalan secara paralel.

Rantai Suar pada awalnya tidak memproses transaksi Jaringan Utama. Sebaliknya, ia mencapai konsensus tentang keadaannya sendiri dengan menyetujui validator aktif dan saldo akun mereka. Setelah pengujian ekstensif, tiba saatnya bagi Rantai Suar untuk mencapai konsensus pada data dunia nyata. Setelah Penggabungan, Rantai Suar menjadi mesin konsensus untuk semua data jaringan, termasuk transaksi lapisan eksekusi dan saldo akun.

Penggabungan ini merupakan peralihan resmi untuk menggunakan Rantai Suar sebagai mesin produksi blok. Penambangan tidak lagi menjadi sarana untuk menghasilkan blok yang valid. Sebagai gantinya, validator bukti taruhan telah mengadopsi peran ini dan sekarang bertanggung jawab untuk memproses keabsahan semua transaksi dan mengusulkan blok.

Tidak ada sejarah yang hilang dalam Penggabungan. Ketika Jaringan Utama bergabung dengan Rantai Suar, Jaringan Utama juga menggabungkan seluruh sejarah transaksi Ethereum.

<InfoBanner>
Transisi ke bukti taruhan ini mengubah cara penerbitan ether. Pelajari lebih lanjut tentang <a href="/roadmap/merge/issuance/">pengeluaran ether sebelum dan setelah Penggabungan</a>.
</InfoBanner>

### Pengguna dan pemegang {#users-holders}

**Penggabungan tidak mengubah apa pun bagi pemegang/pengguna.**

_Ini patut diulang_: Sebagai pengguna atau pemegang ETH atau aset digital lainnya di Ethereum, serta para staker non-simpul operator, **Anda tidak perlu melakukan apa pun dengan dana atau dompet Anda untuk mempertimbangkan Penggabungan.** ETH tetaplah ETH. Tidak ada yang namanya "ETH lama"/"ETH baru" atau "ETH1"/"ETH2" dan dompet bekerja sama persis setelah Penggabungan seperti yang mereka lakukan sebelumnya - orang yang memberi tahu Anda sebaliknya kemungkinan besar adalah penipu.

Meskipun telah menukar bukti kerja, seluruh sejarah Ethereum sejak awal tetap utuh dan tidak diubah oleh transisi ke bukti taruhan. Semua dana yang tersimpan di dompet Anda sebelum Penggabungan masih dapat diakses setelah Penggabungan. **Tidak diperlukan tindakan untuk meningkatkan dari pihak Anda.**

[Lebih lanjut tentang keamanan Ethereum](/security/#eth2-token-scam)

### Operator simpul dan pengembang dapp {#node-operators-dapp-developers}

<ExpandableCard
title="Operator dan penyedia simpul penaruhan"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Item-item tindakan utama meliputi:

1. Jalankan _kedua_ klien konsensus dan klien eksekusi; titik akhir pihak ketiga untuk mendapatkan data eksekusi tidak lagi berfungsi sejak Penggabungan.
2. Autentikasi klien eksekusi dan konsensus dengan rahasia JWT bersama sehingga mereka dapat berkomunikasi dengan aman.
3. Tetapkan alamat `penerima biaya` untuk menerima tips biaya transaksi/MEV yang Anda peroleh.

Tidak menyelesaikan dua hal pertama di atas akan mengakibatkan simpul Anda terlihat sebagai "offline" hingga kedua lapisan disinkronkan dan diautentikasi.

Tidak menetapkan `penerima biaya` akan tetap memungkinkan validator Anda berperilaku seperti biasa, tetapi Anda akan kehilangan tips biaya yang tidak terbakar dan MEV yang seharusnya Anda dapatkan dari blok yang diajukan oleh validator Anda.
</ExpandableCard>

<ExpandableCard
title="Operator simpul dan penyedia infrastruktur yang tidak memvalidasi"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Hingga Penggabungan, klien eksekusi (seperti Geth, Erigon, Besu, atau Nethermind) sudah cukup untuk menerima, memvalidasi dengan benar, dan menyebarkan blok yang sedang digosipkan oleh jaringan. _Setelah Penggabungan_, validitas transaksi yang terkandung dalam muatan eksekusi sekarang juga bergantung pada validitas "blok konsensus" yang terkandung di dalamnya.

Sebagai hasilnya, sebuah simpul Ethereum penuh sekarang membutuhkan klien eksekusi dan klien konsensus. Kedua klien ini bekerja bersama menggunakan API Engine yang baru. API Engine memerlukan autentikasi menggunakan rahasia JWT, yang disediakan untuk kedua klien yang memungkinkan komunikasi yang aman.

Item-item tindakan utama meliputi:

- Menginstal klien konsensus selain klien eksekusi
- Autentikasi klien eksekusi dan konsensus dengan rahasia JWT bersama sehingga mereka dapat berkomunikasi dengan aman satu sama lain.

Tidak menyelesaikan item di atas akan mengakibatkan simpul Anda tampak "offline" hingga kedua lapisan disinkronkan dan diautentikasi.

</ExpandableCard>

<ExpandableCard
title="Dapp dan pengembang kontrak pintar"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

Penggabungan disertai dengan perubahan konsensus, yang juga mencakup perubahan yang terkait dengan:<

<ul>
  <li>struktur blok</li>
  <li>pengaturan waktu ruang/blok</li>
  <li>perubahan opcode</li>
  <li>sumber keacakan di dalam rantai</li>
  <li>konsep dari <em>blok aman</em> dan <em>blok yang telah difinalisasi</em></li>
</ul>

Untuk informasi lebih lanjut, lihat tulisan blog ini oleh Tim Beiko tentang <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">Bagaimana Penggabungan Memengaruhi Lapisan Aplikasi Ethereum</a>.

</ExpandableCard>

## Penggabungan dan konsumsi energi {#merge-and-energy}

Penggabungan ini menandai berakhirnya bukti kerja untuk Ethereum dan memulai era Ethereum yang lebih berkelanjutan dan ramah lingkungan. Konsumsi energi Ethereum turun sekitar 99,95%, menjadikan Ethereum sebagai rantai blok hijau. Pelajari lebih lanjut tentang [konsumsi energi Ethereum](/energy-consumption/).

## Penggabungan dan penskalaan {#merge-and-scaling}

Penggabungan juga membuka jalan untuk peningkatan skalabilitas lebih lanjut yang tidak mungkin dilakukan di bawah bukti kerja, mendekatkan Ethereum satu langkah lebih dekat untuk mencapai skala penuh, keamanan, dan keberlanjutan seperti yang diuraikan dalam [visi Ethereum](/roadmap/vision/)nya.

## Kesalahpahaman tentang Penggabungan {#misconceptions}

<ExpandableCard
title="Miskonsepsi: &quot;Menjalankan simpul membutuhkan penaruhan 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Ada dua jenis simpul Ethereum: simpul yang dapat mengusulkan blok dan simpul yang tidak.

Simpul yang mengusulkan blok hanya sejumlah kecil dari total simpul di Ethereum. Kategori ini mencakup simpul penambangan di bawah bukti kerja (proof-of-work/PoW) dan simpul validator di bawah bukti kepemilikan (proof-of-stake/PoS). Kategori ini membutuhkan sumber daya ekonomi (seperti kekuatan hash GPU dalam bukti kerja atau ETH yang dipertaruhkan dalam bukti taruhan) sebagai imbalan atas kemampuan untuk sesekali mengusulkan blok berikutnya dan mendapatkan imbalan protokol.

Simpul lain dalam jaringan (yaitu mayoritas) tidak perlu menyediakan sumber daya ekonomi apa pun di luar komputer kelas konsumen dengan penyimpanan yang tersedia sebesar 1-2 TB dan koneksi internet. Simpul-simpul ini tidak mengusulkan blok, tetapi mereka masih memiliki peran penting dalam mengamankan jaringan dengan meminta pertanggungjawaban dari semua pengusul blok dengan mendengarkan blok-blok baru dan memverifikasi keabsahannya pada saat kedatangan sesuai dengan aturan konsensus jaringan. Jika blok tersebut valid, simpul akan terus menyebarkannya melalui jaringan. Jika blok tidak valid karena alasan apa pun, perangkat lunak simpul akan mengabaikannya sebagai tidak valid dan menghentikan penyebarannya.

Menjalankan simpul yang tidak memproduksi blok memungkinkan bagi siapa pun di bawah kedua mekanisme konsensus (bukti kerja atau bukti taruhan); ini <em>sangat dianjurkan</em> bagi semua pengguna jika mereka memiliki kemampuan. Menjalankan sebuah simpul sangat berharga bagi Ethereum dan memberikan manfaat tambahan bagi setiap individu yang menjalankannya, seperti peningkatan keamanan, privasi, dan ketahanan terhadap sensor.

Kemampuan bagi siapa pun untuk menjalankan simpul mereka sendiri adalah <em>mutlak penting</em> untuk menjaga desentralisasi jaringan Ethereum.

<a href="/run-a-node/">Lebih lanjut tentang menjalankan simpul Anda sendiri</a>

</ExpandableCard>

<ExpandableCard
title="Miskonsepsi: &quot;Penggabungan gagal mengurangi biaya gas.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Biaya gas adalah produk dari permintaan jaringan relatif terhadap kapasitas jaringan. Penggabungan tidak lagi menggunakan bukti kerja, beralih ke bukti taruhan untuk konsensus, tetapi tidak secara signifikan mengubah parameter apa pun yang secara langsung memengaruhi kapasitas atau keluaran jaringan.

Dengan <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">peta perjalanan berbasis rollup</a>, upaya difokuskan pada penskalaan aktivitas pengguna di <a href="/layer-2/">lapisan ke-2</a>, sambil memungkinkan Jaringan Utama lapisan ke-1 sebagai lapisan penyelesaian terdesentralisasi yang aman yang dioptimalkan untuk penyimpanan data rollup untuk membantu membuat transaksi rollup menjadi jauh lebih murah secara eksponensial. Transisi ke bukti taruhan merupakan langkah awal yang penting untuk mewujudkan hal ini. <a href="/developers/docs/gas/">Lebih lanjut tentang gas dan biaya.</a>

</ExpandableCard>

<ExpandableCard
title="Miskonsepsi: &quot;Transaksi secara signifikan dipercepat oleh Penggabungan.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
"Kecepatan" transaksi dapat diukur dengan beberapa cara, termasuk waktu untuk dimasukkan ke dalam blok dan waktu finalisasi. Kedua hal ini sedikit berubah, tetapi tidak begitu kentara bagi pengguna.

Secara historis, pada bukti kerja, targetnya adalah memiliki blok baru setiap ~13,3 detik. Pada bukti taruhan, slot terjadi tepat setiap 12 detik, yang mana setiap slot merupakan kesempatan bagi validator untuk menerbitkan blok. Sebagian besar slot memiliki blok, tetapi belum tentu semuanya (misalnya, validator sedang offline). Pada bukti taruhan, blok diproduksi ~10% lebih sering dibandingkan dengan bukti kerja. Ini merupakan perubahan yang tidak terlalu signifikan dan kemungkinan tidak akan disadari oleh pengguna.

Bukti taruhan memperkenalkan konsep finalitas transaksi yang sebelumnya tidak ada. Dalam bukti kerja, kemampuan untuk membalikkan sebuah blok menjadi lebih sulit secara eksponensial dengan setiap blok yang ditambang di atas transaksi, tetapi tidak pernah mencapai nol. Dalam bukti taruhan, blok digabungkan ke dalam periode waktu (rentang waktu 6,4 menit yang terdiri dari 32 peluang blok) yang akan dipilih oleh para validator. Ketika jangka waktu berakhir, para validator memberikan suara untuk memutuskan apakah jangka waktu tersebut 'dibenarkan' atau tidak. Jika validator setuju untuk membenarkan jangka waktu, maka epoch tersebut akan difinalisasi di jangka waktu berikutnya. Membatalkan transaksi yang telah difinalisasi tidak ekonomis karena akan memerlukan pengambilan dan pembakaran lebih dari sepertiga total ETH yang dipertaruhkan.

</ExpandableCard>

<ExpandableCard
title="Miskonsepsi: &quot;Penggabungan memungkinkan penarikan penaruhan.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Awalnya setelah Penggabungan, para staker hanya dapat mengakses tip biaya dan MEV yang diperoleh sebagai hasil dari usulan blok. Imbalan ini dikreditkan ke akun non-penaruhan yang dikendalikan oleh validator (dikenal sebagai <em>penerima biaya</em>), dan tersedia segera. Imbalan ini terpisah dari imbalan protokol untuk menjalankan tugas validator.

Sejak upgrade jaringan Shanghai/Capella, para staker sekarang dapat menunjuk alamat <em>penarikan</em> untuk mulai menerima pembayaran otomatis dari saldo penaruhan berlebihan (ETH di atas 32 dari imbalan protokol). Upgrade ini juga memungkinkan kemampuan bagi validator untuk membuka kunci dan mengklaim seluruh saldo saat keluar dari jaringan.

<a href="/staking/withdrawals/">Lebih lanjut tentang penarikan staking</a>

</ExpandableCard>

<ExpandableCard
title="Miskonsepsi: &quot;Sekarang Penggabungan telah selesai, dan penarikan diaktifkan, para staker bisa keluar semua sekaligus.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Sejak meningkatkan Shanghai/Capella mengizinkan penarikan, para validator memiliki insentif untuk menarik saldo penaruhan mereka yang melebihi 32 ETH, karena dana-dana tersebut tidak meningkatkan hasil dan sebaliknya terkunci. Tergantung pada APR (ditentukan oleh total ETH yang dipertaruhkan), mungkin ada insentif untuk keluar dari validatornya untuk mengklaim seluruh saldo atau bahkan mempertaruhkan lebih lagi menggunakan imbalannya untuk mendapatkan hasil lebih banyak.

Namun, perlu dicatat bahwa keluar penuh dari validator dibatasi oleh protokol, dan hanya sejumlah terbatas validator yang diizinkan keluar setiap jangka waktu (setiap 6,4 menit). Batas ini bervariasi tergantung pada jumlah validator aktif, tetapi berjumlah sekitar 0,33% dari total ETH yang dipertaruhkan dapat keluar dari jaringan dalam satu hari.

Hal ini mencegah terjadinya pengeluaran dana penaruhan secara massal. Selain itu, hal ini mencegah penyerang potensial yang memiliki akses ke sebagian besar total ETH yang dipertaruhkan untuk melakukan pelanggaran yang dapat dipotong dan keluar/menarik semua saldo validator yang melanggar pada jangka waktu yang sama sebelum protokol dapat memberlakukan hukuman pemotongan.

APR juga disengaja dinamis, memungkinkan pasar para staker untuk menyeimbangkan seberapa banyak mereka bersedia dibayar untuk membantu mengamankan jaringan. Jika tingkatnya terlalu rendah, maka validator akan keluar dengan batas kecepatan yang ditentukan oleh protokol. Secara perlahan ini akan meningkatkan APR bagi semua yang tetap tinggal, menarik staker baru atau yang kembali lagi.
</ExpandableCard>

## Apa yang akan terjadi pada 'Eth2'? {#eth2}

Istilah 'Eth2' telah dihentikan penggunaannya. Setelah menggabungkan 'Eth1' dan 'Eth2' menjadi satu rantai tunggal, tidak ada lagi kebutuhan untuk membedakan antara dua jaringan Ethereum; hanya ada Ethereum.

Untuk mengurangi kebingungan, komunitas telah memperbarui istilah-istilah berikut ini:

- 'Eth1' sekarang adalah 'lapisan eksekusi', yang menangani transaksi dan eksekusi.
- 'Eth2' sekarang adalah 'lapisan konsensus', yang menangani konsensus bukti taruhan.

Pembaruan terminologi ini hanya mengubah konvensi penamaan; ini tidak mengubah tujuan atau peta perjalanan Ethereum.

[Pelajari selengkapnya tentang penamaan ulang 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Hubungan antar peningkatan {#relationship-between-upgrades}

Semua peningkatan Ethereum saling terkait. Jadi mari kita ringkas bagaimana Penggabungan ini berhubungan dengan peningkatan lain.

### Penggabungan dan Rantai Suar {#merge-and-beacon-chain}

Pengabungan mewakili adopsi resmi Rantai Suar sebagai lapisan konsensus baru untuk lapisan eksekusi Jaringan Utama asli. Sejak Penggabungan, para validator ditugaskan untuk mengamankan Jaringan Utama Ethereum, dan penambangan menggunakan [bukti kerja](/developers/docs/consensus-mechanisms/pow/) tidak lagi merupakan cara yang valid untuk produksi blok.

Blok diusulkan dengan memvalidasi simpul yang telah mempertaruhkan ETH dengan imbalan hak untuk berpartisipasi dalam konsensus. Peningkatan ini menyiapkan panggung untuk peningkatan skalabilitas di masa depan, termasuk pecahan.

<ButtonLink to="/roadmap/beacon-chain/">
  Rantai Suar
</ButtonLink>

### Penggabungan dan peningkatan Shanghai {#merge-and-shanghai}

Untuk menyederhanakan dan memaksimalkan fokus pada transisi yang sukses ke bukti taruhan, peningkatan Penggabungan tidak menyertakan fitur-fitur tertentu yang telah diantisipasi seperti kemampuan untuk menarik ETH yang dipertaruhkan. Fungsionalitas ini diaktifkan secara terpisah dengan peningkatan Shanghai/Capella.

Bagi mereka yang ingin tahu, pelajari selengkapnya tentang [Apa yang Terjadi Setelah Penggabungan](https://youtu.be/7ggwLccuN5s?t=101), yang disajikan oleh Vitalik pada acara ETHGlobal April 2021.

### Penggabungan dan pecahan {#merge-and-data-sharding}

Awalnya, rencananya adalah mengerjakan pecahan sebelum Penggabungan untuk mengatasi skalabilitas. Namun, dengan munculnya solusi penskalaan [lapisan ke-2](/layer-2/), prioritas berubah menjadi menggantikan bukti kerja dengan bukti taruhan terlebih dahulu.

Rencana untuk pecahan berkembang dengan cepat, tetapi dengan munculnya dan keberhasilan teknologi lapisan ke-2 untuk meningkatkan eksekusi transaksi, rencana pecahan telah bergeser untuk menemukan cara yang paling optimal untuk mendistribusikan beban penyimpanan data panggilan terkompresi dari kontrak rollup, yang memungkinkan pertumbuhan kapasitas jaringan secara eksponensial. Hal ini tidak akan mungkin terjadi tanpa terlebih dahulu beralih ke bukti taruhan.

<ButtonLink to="/roadmap/danksharding/">
  Pecahan
</ButtonLink>

## Bacaan lebih lanjut {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
