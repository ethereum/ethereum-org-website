---
title: The Merge
description: Pelajari tentang The Merge - ketika Mainnet Ethereum mengadopsi Bukti Kepemilikan (PoS).
lang: id
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - "Mainnet Ethereum menggunakan Bukti Kepemilikan (PoS), tetapi tidak selalu demikian."
  - "Peningkatan dari mekanisme Bukti Kerja (PoW) asli ke Bukti Kepemilikan (PoS) disebut The Merge."
  - "The Merge merujuk pada Mainnet Ethereum asli yang bergabung dengan rantai blok Bukti Kepemilikan (PoS) terpisah yang disebut Rantai suar, yang kini ada sebagai satu rantai."
  - "The Merge mengurangi konsumsi energi Ethereum sebesar ~99,95%."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  The Merge dieksekusi pada 15 September 2022. Ini menyelesaikan transisi Ethereum ke konsensus Bukti Kepemilikan (PoS), secara resmi menghentikan penggunaan Bukti Kerja (PoW) dan mengurangi konsumsi energi sebesar ~99,95%.
</UpgradeStatus>

## Apa itu The Merge? {#what-is-the-merge}

The Merge adalah penggabungan lapisan eksekusi asli Ethereum (Mainnet yang telah ada sejak [genesis](/ethereum-forks/#frontier)) dengan lapisan konsensus Bukti Kepemilikan (PoS) barunya, Rantai suar. Ini menghilangkan kebutuhan akan penambangan yang padat energi dan sebagai gantinya memungkinkan jaringan diamankan menggunakan ETH yang di-stake. Ini adalah langkah yang sangat menarik dalam mewujudkan visi [Ethereum](/)—lebih banyak skalabilitas, keamanan, dan keberlanjutan.

<MergeInfographic />

Awalnya, [Rantai suar](/roadmap/beacon-chain/) diluncurkan secara terpisah dari [Mainnet](/glossary/#mainnet). Mainnet Ethereum - dengan semua akun, saldo, kontrak pintar, dan state rantai bloknya - terus diamankan oleh [Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow/), bahkan saat Rantai suar berjalan secara paralel menggunakan [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/). The Merge adalah saat kedua sistem ini akhirnya bersatu, dan Bukti Kerja (PoW) secara permanen digantikan oleh Bukti Kepemilikan (PoS).

Bayangkan Ethereum adalah pesawat luar angkasa yang diluncurkan sebelum benar-benar siap untuk pelayaran antarbintang. Dengan Rantai suar, komunitas membangun mesin baru dan lambung yang diperkuat. Setelah pengujian yang signifikan, tiba saatnya untuk menukar mesin baru dengan yang lama di tengah penerbangan. Ini menggabungkan mesin baru yang lebih efisien ke dalam pesawat yang ada, memungkinkannya menempuh tahun cahaya yang serius dan menjelajahi alam semesta.

## Bergabung dengan Mainnet {#merging-with-mainnet}

Bukti Kerja (PoW) mengamankan Mainnet Ethereum dari genesis hingga The Merge. Ini memungkinkan rantai blok Ethereum yang biasa kita gunakan muncul pada Juli 2015 dengan semua fitur yang sudah dikenal—transaksi, kontrak pintar, akun, dll.

Sepanjang sejarah Ethereum, para pengembang bersiap untuk transisi akhir dari Bukti Kerja (PoW) ke Bukti Kepemilikan (PoS). Pada 1 Desember 2020, Rantai suar dibuat sebagai rantai blok terpisah dari Mainnet, berjalan secara paralel.

Rantai suar pada awalnya tidak memproses transaksi Mainnet. Sebaliknya, ia mencapai konsensus pada state-nya sendiri dengan menyetujui validator aktif dan saldo akun mereka. Setelah pengujian ekstensif, tiba saatnya bagi Rantai suar untuk mencapai konsensus pada data dunia nyata. Setelah The Merge, Rantai suar menjadi mesin konsensus untuk semua data jaringan, termasuk transaksi lapisan eksekusi dan saldo akun.

The Merge mewakili peralihan resmi untuk menggunakan Rantai suar sebagai mesin produksi blok. Penambangan tidak lagi menjadi sarana untuk memproduksi blok yang valid. Sebaliknya, validator Bukti Kepemilikan (PoS) telah mengadopsi peran ini dan sekarang bertanggung jawab untuk memproses validitas semua transaksi dan mengusulkan blok.

Tidak ada riwayat yang hilang dalam The Merge. Saat Mainnet bergabung dengan Rantai suar, ia juga menggabungkan seluruh riwayat transaksional Ethereum.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Transisi ke Bukti Kepemilikan (PoS) ini mengubah cara Ether diterbitkan. Pelajari lebih lanjut tentang [penerbitan Ether sebelum dan sesudah The Merge](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Pengguna dan pemegang {#users-holders}

**The Merge tidak mengubah apa pun bagi pemegang/pengguna.**

_Ini perlu diulangi_: Sebagai pengguna atau pemegang ETH atau aset digital lainnya di Ethereum, serta staker yang tidak mengoperasikan node, **Anda tidak perlu melakukan apa pun dengan dana atau dompet Anda untuk memperhitungkan The Merge.** ETH tetaplah ETH. Tidak ada yang namanya "ETH lama"/"ETH baru" atau "ETH1"/"ETH2" dan dompet berfungsi persis sama setelah The Merge seperti sebelumnya—orang yang memberi tahu Anda sebaliknya kemungkinan besar adalah penipu.

Meskipun menukar Bukti Kerja (PoW), seluruh riwayat Ethereum sejak genesis tetap utuh dan tidak diubah oleh transisi ke Bukti Kepemilikan (PoS). Dana apa pun yang disimpan di dompet Anda sebelum The Merge masih dapat diakses setelah The Merge. **Tidak ada tindakan yang diperlukan untuk meningkatkan di pihak Anda.**

[Lebih lanjut tentang keamanan Ethereum](/security/#eth2-token-scam)

### Operator node dan pengembang dapp {#node-operators-dapp-developers}

<ExpandableCard
title="Operator dan penyedia node staking"
contentPreview="Jika Anda adalah pelaku staking yang menjalankan pengaturan node sendiri atau penyedia infrastruktur node, ada beberapa hal yang perlu Anda perhatikan setelah The Merge."
id="staking-node-operators">

Item tindakan utama meliputi:

1. Jalankan _kedua_ klien konsensus dan klien eksekusi; titik akhir pihak ketiga untuk mendapatkan data eksekusi tidak lagi berfungsi sejak The Merge.
2. Autentikasi klien eksekusi dan konsensus dengan rahasia JWT bersama sehingga mereka dapat berkomunikasi dengan aman.
3. Tetapkan alamat `fee recipient` untuk menerima tip biaya transaksi/MEV yang Anda peroleh.

Tidak menyelesaikan dua item pertama di atas akan mengakibatkan node Anda terlihat sebagai "offline" hingga kedua lapisan disinkronisasi dan diautentikasi.

Tidak menetapkan `fee recipient` akan tetap memungkinkan validator Anda berperilaku seperti biasa, tetapi Anda akan kehilangan tip biaya yang tidak dibakar dan MEV apa pun yang seharusnya Anda peroleh di blok yang diusulkan validator Anda.
</ExpandableCard>

<ExpandableCard
title="Operator node non-validasi dan penyedia infrastruktur"
contentPreview="Jika Anda mengoperasikan node Ethereum non-validasi, perubahan paling signifikan yang datang bersama The Merge adalah persyaratan untuk menjalankan klien untuk BAIK lapisan eksekusi MAUPUN lapisan konsensus."
id="node-operators">

Hingga The Merge, klien eksekusi (seperti Go Ethereum (Geth), Erigon, Besu, atau Nethermind) sudah cukup untuk menerima, memvalidasi dengan benar, dan menyebarkan blok yang sedang digosipkan oleh jaringan. _Setelah The Merge_, validitas transaksi yang terkandung dalam muatan eksekusi sekarang juga bergantung pada validitas "blok konsensus" di mana ia berada.

Akibatnya, node Ethereum penuh sekarang memerlukan klien eksekusi dan klien konsensus. Kedua klien ini bekerja sama menggunakan Engine API baru. Engine API memerlukan autentikasi menggunakan rahasia JWT, yang disediakan untuk kedua klien yang memungkinkan komunikasi yang aman.

Item tindakan utama meliputi:

- Instal klien konsensus selain klien eksekusi
- Autentikasi klien eksekusi dan konsensus dengan rahasia JWT bersama sehingga mereka dapat berkomunikasi satu sama lain dengan aman.

Tidak menyelesaikan item di atas akan mengakibatkan node Anda tampak "offline" hingga kedua lapisan disinkronisasi dan diautentikasi.

</ExpandableCard>

<ExpandableCard
title="Pengembang dapp dan kontrak pintar"
contentPreview="The Merge dirancang agar memiliki dampak minimal pada pengembang kontrak pintar dan dapp."
id="developers">

The Merge hadir dengan perubahan pada konsensus, yang juga mencakup perubahan terkait dengan:

<ul>
  <li>struktur blok</li>
  <li>waktu slot/blok</li>
  <li>perubahan opcode</li>
  <li>sumber keacakan onchain</li>
  <li>konsep <em>safe head</em> dan <em>blok yang difinalisasi</em></li>
</ul>

Untuk informasi lebih lanjut, lihat postingan blog oleh Tim Beiko tentang <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">Bagaimana The Merge Berdampak pada Lapisan Aplikasi Ethereum</a>.

</ExpandableCard>

## The Merge dan konsumsi energi {#merge-and-energy}

The Merge menandai akhir dari Bukti Kerja (PoW) untuk Ethereum dan memulai era Ethereum yang lebih berkelanjutan dan ramah lingkungan. Konsumsi energi Ethereum turun sekitar 99,95%, menjadikan Ethereum sebagai rantai blok hijau. Pelajari lebih lanjut tentang [konsumsi energi Ethereum](/energy-consumption/).

## The Merge dan penskalaan {#merge-and-scaling}

The Merge juga menyiapkan panggung untuk peningkatan skalabilitas lebih lanjut yang tidak mungkin dilakukan di bawah Bukti Kerja (PoW), membawa Ethereum selangkah lebih dekat untuk mencapai skala penuh, keamanan, dan keberlanjutan yang sedang dibangun oleh [peta jalannya](/roadmap/).

## Kesalahpahaman tentang The Merge {#misconceptions}

<ExpandableCard
title="Miskonsepsi: &quot;Menjalankan node memerlukan staking 32 ETH.&quot;"
contentPreview="Salah. Siapa pun bebas melakukan sinkronisasi salinan Ethereum mereka sendiri yang diverifikasi secara mandiri (yaitu, menjalankan node). Tidak diperlukan ETH—baik sebelum The Merge, setelah The Merge, maupun kapan pun.">

Ada dua jenis node Ethereum: node yang dapat mengusulkan blok dan node yang tidak.

Node yang mengusulkan blok hanyalah sebagian kecil dari total node di Ethereum. Kategori ini mencakup node penambangan di bawah Bukti Kerja (PoW) dan node validator di bawah Bukti Kepemilikan (PoS). Kategori ini memerlukan komitmen sumber daya ekonomi (seperti kekuatan hash GPU dalam Bukti Kerja (PoW) atau ETH yang di-stake dalam Bukti Kepemilikan (PoS)) sebagai imbalan atas kemampuan untuk sesekali mengusulkan blok berikutnya dan mendapatkan hadiah protokol.

Node lain di jaringan (yaitu, mayoritas) tidak diharuskan untuk memberikan komitmen sumber daya ekonomi apa pun selain komputer tingkat konsumen dengan penyimpanan yang tersedia 1-2 TB dan koneksi internet. Node ini tidak mengusulkan blok, tetapi mereka tetap melayani peran penting dalam mengamankan jaringan dengan meminta pertanggungjawaban semua pengusul blok dengan mendengarkan blok baru dan memverifikasi validitasnya pada saat kedatangan sesuai dengan aturan konsensus jaringan. Jika blok tersebut valid, node terus menyebarkannya melalui jaringan. Jika blok tidak valid karena alasan apa pun, perangkat lunak node akan mengabaikannya sebagai tidak valid dan menghentikan penyebarannya.

Menjalankan node yang tidak memproduksi blok dimungkinkan bagi siapa saja di bawah mekanisme konsensus mana pun (Bukti Kerja (PoW) atau Bukti Kepemilikan (PoS)); ini <em>sangat dianjurkan</em> untuk semua pengguna jika mereka memiliki sarana. Menjalankan node sangat berharga bagi Ethereum dan memberikan manfaat tambahan bagi setiap individu yang menjalankannya, seperti peningkatan keamanan, privasi, dan ketahanan terhadap penyensoran.

Kemampuan bagi siapa saja untuk menjalankan node mereka sendiri <em>sangat penting</em> untuk mempertahankan desentralisasi jaringan Ethereum.

[Lebih lanjut tentang menjalankan node Anda sendiri](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Miskonsepsi: &quot;The Merge gagal menurunkan biaya gas.&quot;"
contentPreview="Salah. The Merge adalah perubahan mekanisme konsensus, bukan perluasan kapasitas jaringan, dan tidak pernah dimaksudkan untuk menurunkan biaya gas.">

Biaya gas adalah produk dari permintaan jaringan relatif terhadap kapasitas jaringan. The Merge menghentikan penggunaan Bukti Kerja (PoW), bertransisi ke Bukti Kepemilikan (PoS) untuk konsensus, tetapi tidak secara signifikan mengubah parameter apa pun yang secara langsung memengaruhi kapasitas jaringan atau laju pemrosesan.

Dengan <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">peta jalan yang berpusat pada rollup</a>, upaya difokuskan pada penskalaan aktivitas pengguna di [lapisan 2 (l2)](/layer-2/), sambil mengaktifkan Mainnet lapisan 1 (l1) sebagai lapisan penyelesaian terdesentralisasi yang aman yang dioptimalkan untuk penyimpanan data rollup guna membantu membuat transaksi rollup secara eksponensial lebih murah. Transisi ke Bukti Kepemilikan (PoS) adalah pendahulu penting untuk mewujudkan hal ini. [Lebih lanjut tentang gas dan biaya.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Miskonsepsi: &quot;Transaksi dipercepat secara substansial oleh The Merge.&quot;"
contentPreview="Salah. Meskipun ada sedikit perubahan, kecepatan transaksi sebagian besar sama di lapisan 1 saat ini seperti sebelum The Merge.">
"Kecepatan" transaksi dapat diukur dengan beberapa cara, termasuk waktu untuk dimasukkan ke dalam blok dan waktu hingga finalitas. Keduanya sedikit berubah, tetapi tidak dengan cara yang akan diperhatikan pengguna.

Secara historis, pada Bukti Kerja (PoW), targetnya adalah memiliki blok baru setiap ~13,3 detik. Di bawah Bukti Kepemilikan (PoS), slot terjadi tepat setiap 12 detik, yang masing-masing merupakan peluang bagi validator untuk menerbitkan blok. Sebagian besar slot memiliki blok, tetapi belum tentu semuanya (misalnya, validator sedang offline). Dalam Bukti Kepemilikan (PoS), blok diproduksi ~10% lebih sering daripada pada Bukti Kerja (PoW). Ini adalah perubahan yang cukup tidak signifikan dan tidak mungkin diperhatikan oleh pengguna.

Bukti Kepemilikan (PoS) memperkenalkan konsep finalitas transaksi yang sebelumnya tidak ada. Dalam Bukti Kerja (PoW), kemampuan untuk membalikkan blok menjadi semakin sulit secara eksponensial dengan setiap blok yang ditambang di atas transaksi, tetapi tidak pernah benar-benar mencapai nol. Di bawah Bukti Kepemilikan (PoS), blok digabungkan ke dalam Epok (rentang waktu 6,4 menit yang berisi 32 peluang untuk blok) yang dipilih oleh validator. Saat Epok berakhir, validator memberikan suara tentang apakah akan menganggap Epok tersebut 'terjustifikasi'. Jika validator setuju untuk menjustifikasi Epok, itu akan difinalisasi di Epok berikutnya. Membatalkan transaksi yang difinalisasi secara ekonomi tidak layak karena akan membutuhkan perolehan dan pembakaran lebih dari sepertiga dari total ETH yang di-stake.

</ExpandableCard>

<ExpandableCard
title="Miskonsepsi: &quot;The Merge memungkinkan penarikan staking.&quot;"
contentPreview="Salah, tetapi penarikan staking sejak saat itu telah diaktifkan melalui peningkatan Shanghai/Capella.">

Awalnya setelah The Merge, staker hanya dapat mengakses tip biaya dan MEV yang diperoleh sebagai hasil dari proposal blok. Hadiah ini dikreditkan ke akun non-staking yang dikendalikan oleh validator (dikenal sebagai <em>penerima biaya</em>), dan segera tersedia. Hadiah ini terpisah dari hadiah protokol untuk melakukan tugas validator.

Sejak peningkatan jaringan Shanghai/Capella, staker sekarang dapat menunjuk <em>alamat penarikan</em> untuk mulai menerima pembayaran otomatis dari setiap kelebihan saldo staking (ETH di atas 32 dari hadiah protokol). Peningkatan ini juga mengaktifkan kemampuan validator untuk membuka kunci dan mengklaim kembali seluruh saldonya saat keluar dari jaringan.

[Lebih lanjut tentang penarikan staking](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Miskonsepsi: &quot;Sekarang setelah The Merge selesai, dan penarikan diaktifkan, semua pelaku staking dapat keluar secara bersamaan.&quot;"
contentPreview="Salah. Proses keluar validator dibatasi kecepatannya demi alasan keamanan.">
Sejak peningkatan Shanghai/Capella mengaktifkan penarikan, validator diberi insentif untuk menarik saldo staking mereka di atas 32 ETH, karena dana ini tidak menambah imbal hasil dan sebaliknya terkunci. Bergantung pada APR (ditentukan oleh total ETH yang di-stake), mereka mungkin diberi insentif untuk keluar dari validator mereka untuk mengklaim kembali seluruh saldo mereka atau berpotensi melakukan stake lebih banyak lagi menggunakan hadiah mereka untuk mendapatkan lebih banyak imbal hasil.

Peringatan penting di sini, keluar validator penuh dibatasi lajunya oleh protokol, dan hanya sejumlah validator yang dapat keluar per Epok (setiap 6,4 menit). Batas ini berfluktuasi tergantung pada jumlah validator aktif, tetapi mencapai sekitar 0,33% dari total ETH yang di-stake dapat dikeluarkan dari jaringan dalam satu hari.

Ini mencegah eksodus massal dana yang di-stake. Selain itu, ini mencegah penyerang potensial dengan akses ke sebagian besar total ETH yang di-stake dari melakukan pelanggaran yang dapat dipotong dan keluar/menarik semua saldo validator yang melanggar di Epok yang sama sebelum protokol dapat menegakkan hukuman pemotongan.

APR juga sengaja dibuat dinamis, memungkinkan pasar staker untuk menyeimbangkan berapa banyak mereka bersedia dibayar untuk membantu mengamankan jaringan. Jika tarifnya terlalu rendah, maka validator akan keluar pada tingkat yang dibatasi oleh protokol. Secara bertahap ini akan menaikkan APR untuk semua orang yang tersisa, menarik staker baru atau yang kembali lagi.
</ExpandableCard>

## Apa yang terjadi pada 'Eth2'? {#eth2}

Istilah 'Eth2' telah dihentikan penggunaannya. Setelah menggabungkan 'Eth1' dan 'Eth2' menjadi satu rantai, tidak perlu lagi
membedakan antara dua jaringan Ethereum; yang ada hanyalah Ethereum.

Untuk membatasi kebingungan, komunitas telah memperbarui istilah-istilah ini:

- 'Eth1' sekarang menjadi 'lapisan eksekusi', yang menangani transaksi dan eksekusi.
- 'Eth2' sekarang menjadi 'lapisan konsensus', yang menangani konsensus Bukti Kepemilikan (PoS).

Pembaruan terminologi ini hanya mengubah konvensi penamaan; ini tidak mengubah tujuan atau peta jalan Ethereum.

[Pelajari lebih lanjut tentang penggantian nama 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## Hubungan antar peningkatan {#relationship-between-upgrades}

Peningkatan Ethereum semuanya agak saling terkait. Jadi mari kita rekap bagaimana The Merge berhubungan dengan peningkatan lainnya.

### The Merge dan Rantai suar {#merge-and-beacon-chain}

The Merge mewakili adopsi formal Rantai suar sebagai lapisan konsensus baru ke lapisan eksekusi Mainnet asli. Sejak The Merge, validator ditugaskan untuk mengamankan Mainnet Ethereum, dan penambangan pada [Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow/) tidak lagi menjadi sarana produksi blok yang valid.

Blok sebaliknya diusulkan oleh node validasi yang telah men-stake ETH sebagai imbalan atas hak untuk berpartisipasi dalam konsensus. Peningkatan ini menyiapkan panggung untuk peningkatan skalabilitas di masa mendatang, termasuk sharding.

<ButtonLink href="/roadmap/beacon-chain/">
  Rantai suar
</ButtonLink>

### The Merge dan peningkatan Shanghai {#merge-and-shanghai}

Untuk menyederhanakan dan memaksimalkan fokus pada transisi yang sukses ke Bukti Kepemilikan (PoS), peningkatan The Merge tidak menyertakan fitur tertentu yang diantisipasi seperti kemampuan untuk menarik ETH yang di-stake. Fungsionalitas ini diaktifkan secara terpisah dengan peningkatan Shanghai/Capella.

Bagi yang penasaran, pelajari lebih lanjut tentang [Apa yang Terjadi Setelah The Merge](https://youtu.be/7ggwLccuN5s?t=101), yang dipresentasikan oleh Vitalik pada acara ETHGlobal April 2021.

### The Merge dan sharding {#merge-and-data-sharding}

Awalnya, rencananya adalah mengerjakan sharding sebelum The Merge untuk mengatasi skalabilitas. Namun, dengan ledakan [solusi penskalaan lapisan 2 (l2)](/layer-2/), prioritas bergeser ke menukar Bukti Kerja (PoW) ke Bukti Kepemilikan (PoS) terlebih dahulu.

Rencana untuk sharding berkembang pesat, tetapi mengingat kebangkitan dan keberhasilan teknologi lapisan 2 (l2) untuk menskalakan eksekusi transaksi, rencana sharding telah bergeser untuk menemukan cara paling optimal untuk mendistribusikan beban penyimpanan data panggilan terkompresi dari kontrak rollup, memungkinkan pertumbuhan eksponensial dalam kapasitas jaringan. Ini tidak akan mungkin terjadi tanpa terlebih dahulu bertransisi ke Bukti Kepemilikan (PoS).

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Bacaan lebih lanjut {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />