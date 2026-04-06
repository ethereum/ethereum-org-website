---
title: The Merge
description: Pelajari tentang The Merge - ketika Mainnet Ethereum mengadopsi proof-of-stake.
lang: id
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoint1: Mainnet Ethereum menggunakan proof-of-stake, tetapi tidak selalu demikian.
summaryPoint2: Peningkatan dari mekanisme proof-of-work asli ke proof-of-stake disebut The Merge.
summaryPoint3: The Merge merujuk pada penggabungan Mainnet Ethereum asli dengan blockchain proof-of-stake terpisah yang disebut Beacon Chain, yang kini ada sebagai satu rantai.
summaryPoint4: The Merge mengurangi konsumsi energi Ethereum sebesar ~99,95%.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  The Merge dieksekusi pada 15 September 2022. Ini menyelesaikan transisi Ethereum ke konsensus proof-of-stake, secara resmi menghentikan penggunaan proof-of-work dan mengurangi konsumsi energi sebesar ~99,95%.
</UpgradeStatus>

## Apa itu The Merge? {#what-is-the-merge}

The Merge adalah penggabungan lapisan eksekusi asli Ethereum (Mainnet yang telah ada sejak [genesis](/ethereum-forks/#frontier)) dengan lapisan konsensus proof-of-stake barunya, Beacon Chain. Ini menghilangkan kebutuhan akan penambangan yang padat energi dan sebaliknya memungkinkan jaringan diamankan menggunakan ETH yang dikunci. Ini adalah langkah yang benar-benar menarik dalam mewujudkan visi [Ethereum](/)—lebih banyak skalabilitas, keamanan, dan keberlanjutan.

<MergeInfographic />

Awalnya, [Beacon Chain](/roadmap/beacon-chain/) diluncurkan secara terpisah dari [Mainnet](/glossary/#mainnet). Mainnet Ethereum - dengan semua akun, saldo, kontrak pintar, dan status blockchain-nya - terus diamankan oleh [proof-of-work](/developers/docs/consensus-mechanisms/pow/), bahkan ketika Beacon Chain berjalan secara paralel menggunakan [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). The Merge adalah saat kedua sistem ini akhirnya bersatu, dan proof-of-work secara permanen digantikan oleh proof-of-stake.

Bayangkan Ethereum adalah pesawat luar angkasa yang diluncurkan sebelum benar-benar siap untuk perjalanan antarbintang. Dengan Beacon Chain, komunitas membangun mesin baru dan lambung yang diperkuat. Setelah pengujian yang signifikan, tiba saatnya untuk menukar mesin baru dengan yang lama di tengah penerbangan. Ini menggabungkan mesin baru yang lebih efisien ke dalam pesawat yang ada, memungkinkannya untuk menempuh tahun cahaya yang serius dan menjelajahi alam semesta.

## Bergabung dengan Mainnet {#merging-with-mainnet}

Proof-of-work mengamankan Mainnet Ethereum dari genesis hingga The Merge. Ini memungkinkan blockchain Ethereum yang biasa kita gunakan mulai ada pada Juli 2015 dengan semua fitur yang sudah dikenal—transaksi, kontrak pintar, akun, dll.

Sepanjang sejarah Ethereum, para pengembang bersiap untuk transisi akhir dari proof-of-work ke proof-of-stake. Pada 1 Desember 2020, Beacon Chain dibuat sebagai blockchain terpisah dari Mainnet, berjalan secara paralel.

Beacon Chain pada awalnya tidak memproses transaksi Mainnet. Sebaliknya, ia mencapai konsensus pada statusnya sendiri dengan menyetujui validator aktif dan saldo akun mereka. Setelah pengujian ekstensif, tiba saatnya bagi Beacon Chain untuk mencapai konsensus pada data dunia nyata. Setelah The Merge, Beacon Chain menjadi mesin konsensus untuk semua data jaringan, termasuk transaksi lapisan eksekusi dan saldo akun.

The Merge mewakili peralihan resmi untuk menggunakan Beacon Chain sebagai mesin produksi blok. Penambangan tidak lagi menjadi sarana untuk memproduksi blok yang valid. Sebaliknya, validator proof-of-stake telah mengadopsi peran ini dan sekarang bertanggung jawab untuk memproses validitas semua transaksi dan mengusulkan blok.

Tidak ada riwayat yang hilang dalam The Merge. Saat Mainnet bergabung dengan Beacon Chain, ia juga menggabungkan seluruh riwayat transaksional Ethereum.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Transisi ke proof-of-stake ini mengubah cara ether diterbitkan. Pelajari lebih lanjut tentang [penerbitan ether sebelum dan sesudah The Merge](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Pengguna dan pemegang {#users-holders}

**The Merge tidak mengubah apa pun bagi pemegang/pengguna.**

_Ini perlu diulangi_: Sebagai pengguna atau pemegang ETH atau aset digital lainnya di Ethereum, serta staker yang tidak mengoperasikan node, **Anda tidak perlu melakukan apa pun dengan dana atau dompet Anda untuk memperhitungkan The Merge.** ETH tetaplah ETH. Tidak ada yang namanya "ETH lama"/"ETH baru" atau "ETH1"/"ETH2" dan dompet berfungsi persis sama setelah The Merge seperti sebelumnya—orang yang memberi tahu Anda sebaliknya kemungkinan besar adalah penipu.

Meskipun menukar proof-of-work, seluruh riwayat Ethereum sejak genesis tetap utuh dan tidak diubah oleh transisi ke proof-of-stake. Dana apa pun yang disimpan di dompet Anda sebelum The Merge masih dapat diakses setelah The Merge. **Tidak ada tindakan yang diperlukan untuk meningkatkan di pihak Anda.**

[Lebih lanjut tentang keamanan Ethereum](/security/#eth2-token-scam)

### Operator node dan pengembang dapp {#node-operators-dapp-developers}

<ExpandableCard
title="Operator dan penyedia node staking"
contentPreview="Jika Anda adalah seorang staker yang menjalankan pengaturan node Anda sendiri atau penyedia infrastruktur node, ada beberapa hal yang perlu Anda waspadai setelah The Merge."
id="staking-node-operators">

Item tindakan utama meliputi:

1. Jalankan _kedua_ klien konsensus dan klien eksekusi; titik akhir pihak ketiga untuk mendapatkan data eksekusi tidak lagi berfungsi sejak The Merge.
2. Autentikasi klien eksekusi dan konsensus dengan rahasia JWT bersama sehingga mereka dapat berkomunikasi dengan aman.
3. Tetapkan alamat `fee recipient` (penerima biaya) untuk menerima tip biaya transaksi/MEV yang Anda peroleh.

Tidak menyelesaikan dua item pertama di atas akan mengakibatkan node Anda terlihat sebagai "offline" hingga kedua lapisan disinkronkan dan diautentikasi.

Tidak menetapkan `fee recipient` akan tetap memungkinkan validator Anda berperilaku seperti biasa, tetapi Anda akan kehilangan tip biaya yang tidak dibakar dan MEV apa pun yang seharusnya Anda peroleh di blok yang diusulkan validator Anda.
</ExpandableCard>

<ExpandableCard
title="Operator node non-validasi dan penyedia infrastruktur"
contentPreview="Jika Anda mengoperasikan node Ethereum non-validasi, perubahan paling signifikan yang datang dengan The Merge adalah persyaratan untuk menjalankan klien untuk KEDUA lapisan eksekusi DAN lapisan konsensus."
id="node-operators">

Hingga The Merge, klien eksekusi (seperti Geth, Erigon, Besu, atau Nethermind) sudah cukup untuk menerima, memvalidasi dengan benar, dan menyebarkan blok yang digosipkan oleh jaringan. _Setelah The Merge_, validitas transaksi yang terkandung dalam muatan eksekusi sekarang juga bergantung pada validitas "blok konsensus" di mana ia terkandung.

Akibatnya, node Ethereum penuh sekarang membutuhkan klien eksekusi dan klien konsensus. Kedua klien ini bekerja sama menggunakan Engine API baru. Engine API memerlukan autentikasi menggunakan rahasia JWT, yang disediakan untuk kedua klien yang memungkinkan komunikasi yang aman.

Item tindakan utama meliputi:

- Instal klien konsensus selain klien eksekusi
- Autentikasi klien eksekusi dan konsensus dengan rahasia JWT bersama sehingga mereka dapat berkomunikasi dengan aman satu sama lain.

Tidak menyelesaikan item di atas akan mengakibatkan node Anda tampak "offline" hingga kedua lapisan disinkronkan dan diautentikasi.

</ExpandableCard>

<ExpandableCard
title="Pengembang dapp dan kontrak pintar"
contentPreview="The Merge dirancang untuk memiliki dampak minimal pada pengembang kontrak pintar dan dapp."
id="developers">

The Merge datang dengan perubahan pada konsensus, yang juga mencakup perubahan terkait dengan:

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

The Merge menandai akhir dari proof-of-work untuk Ethereum dan memulai era Ethereum yang lebih berkelanjutan dan ramah lingkungan. Konsumsi energi Ethereum turun sekitar 99,95%, menjadikan Ethereum sebagai blockchain hijau. Pelajari lebih lanjut tentang [konsumsi energi Ethereum](/energy-consumption/).

## The Merge dan peningkatan {#merge-and-scaling}

The Merge juga menyiapkan panggung untuk peningkatan skalabilitas lebih lanjut yang tidak mungkin dilakukan di bawah proof-of-work, membawa Ethereum selangkah lebih dekat untuk mencapai skala penuh, keamanan, dan keberlanjutan yang sedang dibangun oleh [peta jalannya](/roadmap/).

## Kesalahpahaman tentang The Merge {#misconceptions}

<ExpandableCard
title="Kesalahpahaman: &quot;Menjalankan node membutuhkan staking 32 ETH.&quot;"
contentPreview="Salah. Siapa pun bebas untuk menyinkronkan salinan Ethereum yang diverifikasi sendiri (yaitu, menjalankan node). Tidak ada ETH yang diperlukan—tidak sebelum The Merge, tidak setelah The Merge, tidak akan pernah.">

Ada dua jenis node Ethereum: node yang dapat mengusulkan blok dan node yang tidak.

Node yang mengusulkan blok hanyalah sebagian kecil dari total node di Ethereum. Kategori ini mencakup node penambangan di bawah proof-of-work (PoW) dan node validator di bawah proof-of-stake (PoS). Kategori ini membutuhkan komitmen sumber daya ekonomi (seperti kekuatan hash GPU dalam proof-of-work atau ETH yang dikunci dalam proof-of-stake) dengan imbalan kemampuan untuk sesekali mengusulkan blok berikutnya dan mendapatkan hadiah protokol.

Node lain di jaringan (yaitu, mayoritas) tidak diharuskan untuk memberikan sumber daya ekonomi apa pun di luar komputer tingkat konsumen dengan penyimpanan yang tersedia 1-2 TB dan koneksi internet. Node ini tidak mengusulkan blok, tetapi mereka masih melayani peran penting dalam mengamankan jaringan dengan meminta pertanggungjawaban semua pengusul blok dengan mendengarkan blok baru dan memverifikasi validitasnya pada saat kedatangan sesuai dengan aturan konsensus jaringan. Jika blok tersebut valid, node terus menyebarkannya melalui jaringan. Jika blok tidak valid karena alasan apa pun, perangkat lunak node akan mengabaikannya sebagai tidak valid dan menghentikan penyebarannya.

Menjalankan node yang tidak memproduksi blok dimungkinkan bagi siapa saja di bawah mekanisme konsensus mana pun (proof-of-work atau proof-of-stake); ini <em>sangat dianjurkan</em> untuk semua pengguna jika mereka memiliki sarana. Menjalankan node sangat berharga bagi Ethereum dan memberikan manfaat tambahan bagi setiap individu yang menjalankannya, seperti peningkatan keamanan, privasi, dan ketahanan terhadap sensor.

Kemampuan bagi siapa saja untuk menjalankan node mereka sendiri <em>sangat penting</em> untuk mempertahankan desentralisasi jaringan Ethereum.

[Lebih lanjut tentang menjalankan node Anda sendiri](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Kesalahpahaman: &quot;The Merge gagal mengurangi biaya gas.&quot;"
contentPreview="Salah. The Merge adalah perubahan mekanisme konsensus, bukan perluasan kapasitas jaringan, dan tidak pernah dimaksudkan untuk menurunkan biaya gas.">

Biaya gas adalah produk dari permintaan jaringan relatif terhadap kapasitas jaringan. The Merge menghentikan penggunaan proof-of-work, beralih ke proof-of-stake untuk konsensus, tetapi tidak secara signifikan mengubah parameter apa pun yang secara langsung memengaruhi kapasitas atau throughput jaringan.

Dengan <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">peta jalan yang berpusat pada rollup</a>, upaya difokuskan pada peningkatan aktivitas pengguna di [layer 2](/layer-2/), sambil mengaktifkan Mainnet layer 1 sebagai lapisan penyelesaian terdesentralisasi yang aman yang dioptimalkan untuk penyimpanan data rollup guna membantu membuat transaksi rollup secara eksponensial lebih murah. Transisi ke proof-of-stake adalah pendahulu penting untuk mewujudkan hal ini. [Lebih lanjut tentang gas dan biaya.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Kesalahpahaman: &quot;Transaksi dipercepat secara substansial oleh The Merge.&quot;"
contentPreview="Salah. Meskipun ada sedikit perubahan, kecepatan transaksi sebagian besar sama di layer 1 sekarang seperti sebelum The Merge.">
"Kecepatan" transaksi dapat diukur dengan beberapa cara, termasuk waktu untuk dimasukkan ke dalam blok dan waktu untuk finalisasi. Keduanya sedikit berubah, tetapi tidak dengan cara yang akan diperhatikan pengguna.

Secara historis, pada proof-of-work, targetnya adalah memiliki blok baru setiap ~13,3 detik. Di bawah proof-of-stake, slot terjadi tepat setiap 12 detik, yang masing-masing merupakan peluang bagi validator untuk menerbitkan blok. Sebagian besar slot memiliki blok, tetapi belum tentu semuanya (yaitu, validator sedang offline). Dalam proof-of-stake, blok diproduksi ~10% lebih sering daripada pada proof-of-work. Ini adalah perubahan yang cukup tidak signifikan dan tidak mungkin diperhatikan oleh pengguna.

Proof-of-stake memperkenalkan konsep finalitas transaksi yang sebelumnya tidak ada. Dalam proof-of-work, kemampuan untuk membalikkan blok menjadi semakin sulit secara eksponensial dengan setiap blok yang ditambang di atas transaksi, tetapi tidak pernah benar-benar mencapai nol. Di bawah proof-of-stake, blok digabungkan ke dalam epoch (rentang waktu 6,4 menit yang berisi 32 peluang untuk blok) yang dipilih oleh validator. Saat epoch berakhir, validator memilih apakah akan menganggap epoch tersebut 'dibenarkan'. Jika validator setuju untuk membenarkan epoch, itu akan difinalisasi di epoch berikutnya. Membatalkan transaksi yang difinalisasi secara ekonomi tidak layak karena akan membutuhkan perolehan dan pembakaran lebih dari sepertiga dari total ETH yang dikunci.

</ExpandableCard>

<ExpandableCard
title="Kesalahpahaman: &quot;The Merge memungkinkan penarikan staking.&quot;"
contentPreview="Salah, tetapi penarikan staking sejak itu telah diaktifkan melalui peningkatan Shanghai/Capella.">

Awalnya setelah The Merge, staker hanya dapat mengakses tip biaya dan MEV yang diperoleh sebagai hasil dari proposal blok. Hadiah ini dikreditkan ke akun non-staking yang dikendalikan oleh validator (dikenal sebagai <em>fee recipient</em>), dan segera tersedia. Hadiah ini terpisah dari hadiah protokol untuk melakukan tugas validator.

Sejak peningkatan jaringan Shanghai/Capella, staker sekarang dapat menunjuk <em>alamat penarikan</em> untuk mulai menerima pembayaran otomatis dari setiap kelebihan saldo staking (ETH di atas 32 dari hadiah protokol). Peningkatan ini juga memungkinkan kemampuan validator untuk membuka kunci dan mengklaim kembali seluruh saldonya saat keluar dari jaringan.

[Lebih lanjut tentang penarikan staking](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Kesalahpahaman: &quot;Sekarang setelah The Merge selesai, dan penarikan diaktifkan, staker dapat keluar semua sekaligus.&quot;"
contentPreview="Salah. Keluar validator dibatasi kecepatannya karena alasan keamanan.">
Karena peningkatan Shanghai/Capella mengaktifkan penarikan, validator diberi insentif untuk menarik saldo staking mereka di atas 32 ETH, karena dana ini tidak menambah hasil dan sebaliknya terkunci. Bergantung pada APR (ditentukan oleh total ETH yang dikunci), mereka mungkin diberi insentif untuk keluar dari validator mereka untuk mengklaim kembali seluruh saldo mereka atau berpotensi melakukan stake lebih banyak lagi menggunakan hadiah mereka untuk mendapatkan lebih banyak hasil.

Peringatan penting di sini, keluar validator penuh dibatasi kecepatannya oleh protokol, dan hanya sejumlah validator yang dapat keluar per epoch (setiap 6,4 menit). Batas ini berfluktuasi tergantung pada jumlah validator aktif, tetapi mencapai sekitar 0,33% dari total ETH yang dikunci dapat dikeluarkan dari jaringan dalam satu hari.

Ini mencegah eksodus massal dana yang dikunci. Selain itu, ini mencegah penyerang potensial dengan akses ke sebagian besar dari total ETH yang dikunci dari melakukan pelanggaran yang dapat dipotong dan keluar/menarik semua saldo validator yang melanggar di epoch yang sama sebelum protokol dapat menegakkan hukuman pemotongan.

APR juga sengaja dibuat dinamis, memungkinkan pasar staker untuk menyeimbangkan berapa banyak mereka bersedia dibayar untuk membantu mengamankan jaringan. Jika tarifnya terlalu rendah, maka validator akan keluar pada tingkat yang dibatasi oleh protokol. Secara bertahap ini akan menaikkan APR untuk semua orang yang tersisa, menarik staker baru atau yang kembali lagi.
</ExpandableCard>

## Apa yang terjadi pada 'Eth2'? {#eth2}

Istilah 'Eth2' telah dihentikan. Setelah menggabungkan 'Eth1' dan 'Eth2' menjadi satu rantai, tidak perlu lagi membedakan antara dua jaringan Ethereum; yang ada hanyalah Ethereum.

Untuk membatasi kebingungan, komunitas telah memperbarui istilah-istilah ini:

- 'Eth1' sekarang menjadi 'lapisan eksekusi', yang menangani transaksi dan eksekusi.
- 'Eth2' sekarang menjadi 'lapisan konsensus', yang menangani konsensus proof-of-stake.

Pembaruan terminologi ini hanya mengubah konvensi penamaan; ini tidak mengubah tujuan atau peta jalan Ethereum.

[Pelajari lebih lanjut tentang penggantian nama 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## Hubungan antar peningkatan {#relationship-between-upgrades}

Peningkatan Ethereum semuanya agak saling terkait. Jadi mari kita rekap bagaimana The Merge berhubungan dengan peningkatan lainnya.

### The Merge dan Beacon Chain {#merge-and-beacon-chain}

The Merge mewakili adopsi formal Beacon Chain sebagai lapisan konsensus baru ke lapisan eksekusi Mainnet asli. Sejak The Merge, validator ditugaskan untuk mengamankan Mainnet Ethereum, dan penambangan pada [proof-of-work](/developers/docs/consensus-mechanisms/pow/) tidak lagi menjadi sarana produksi blok yang valid.

Blok sebaliknya diusulkan oleh node validasi yang telah men-stake ETH sebagai imbalan atas hak untuk berpartisipasi dalam konsensus. Peningkatan ini menyiapkan panggung untuk peningkatan skalabilitas di masa depan, termasuk sharding.

<ButtonLink href="/roadmap/beacon-chain/">
  Beacon Chain
</ButtonLink>

### The Merge dan peningkatan Shanghai {#merge-and-shanghai}

Untuk menyederhanakan dan memaksimalkan fokus pada transisi yang sukses ke proof-of-stake, peningkatan The Merge tidak menyertakan fitur tertentu yang diantisipasi seperti kemampuan untuk menarik ETH yang dikunci. Fungsionalitas ini diaktifkan secara terpisah dengan peningkatan Shanghai/Capella.

Bagi yang penasaran, pelajari lebih lanjut tentang [Apa yang Terjadi Setelah The Merge](https://youtu.be/7ggwLccuN5s?t=101), yang dipresentasikan oleh Vitalik di acara ETHGlobal April 2021.

### The Merge dan sharding {#merge-and-data-sharding}

Awalnya, rencananya adalah mengerjakan sharding sebelum The Merge untuk mengatasi skalabilitas. Namun, dengan ledakan [solusi peningkatan layer 2](/layer-2/), prioritas bergeser ke menukar proof-of-work ke proof-of-stake terlebih dahulu.

Rencana untuk sharding berkembang pesat, tetapi mengingat kebangkitan dan keberhasilan teknologi layer 2 untuk meningkatkan eksekusi transaksi, rencana sharding telah bergeser untuk menemukan cara paling optimal untuk mendistribusikan beban penyimpanan calldata terkompresi dari kontrak rollup, memungkinkan pertumbuhan eksponensial dalam kapasitas jaringan. Ini tidak akan mungkin terjadi tanpa terlebih dahulu beralih ke proof-of-stake.

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Bacaan lebih lanjut {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />