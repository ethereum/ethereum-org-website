---
title: Linimasa semua fork Ethereum (2014 hingga sekarang)
description: Sejarah blockchain Ethereum termasuk pencapaian utama, rilis, dan fork.
lang: id
sidebarDepth: 1
---

# Linimasa semua fork Ethereum (2014 hingga sekarang) {#the-history-of-ethereum}

Linimasa semua pencapaian utama, fork, dan pembaruan pada blockchain [Ethereum](/).

<ExpandableCard title="Apa itu fork?" contentPreview="Perubahan pada aturan protokol Ethereum yang sering kali mencakup peningkatan teknis yang direncanakan.">

Fork terjadi ketika peningkatan atau perubahan teknis besar perlu dilakukan pada jaringan – biasanya berasal dari [proposal pengembangan ethereum (EIP)](/eips/) dan mengubah "aturan" protokol.

Ketika peningkatan diperlukan dalam perangkat lunak tradisional yang dikendalikan secara terpusat, perusahaan hanya akan menerbitkan versi baru untuk pengguna akhir. Blockchain bekerja secara berbeda karena tidak ada kepemilikan terpusat. [Klien Ethereum](/developers/docs/nodes-and-clients/) harus memperbarui perangkat lunak mereka untuk menerapkan aturan fork yang baru. Selain itu, pembuat blok (penambang di dunia proof-of-work, validator di dunia proof-of-stake) dan node harus membuat blok dan memvalidasi berdasarkan aturan baru. [Lebih lanjut tentang mekanisme konsensus](/developers/docs/consensus-mechanisms/)

Perubahan aturan ini dapat menciptakan perpecahan sementara di jaringan. Blok baru dapat diproduksi sesuai dengan aturan baru atau aturan lama. Fork biasanya disepakati sebelumnya sehingga klien mengadopsi perubahan secara serempak dan fork dengan peningkatan tersebut menjadi rantai utama. Namun, dalam kasus yang jarang terjadi, ketidaksepakatan atas fork dapat menyebabkan jaringan terpecah secara permanen – yang paling menonjol adalah penciptaan Ethereum Classic dengan <a href="#dao-fork">DAO fork</a>.
</ExpandableCard>

<ExpandableCard title="Mengapa beberapa peningkatan memiliki banyak nama?" contentPreview="Nama-nama peningkatan mengikuti sebuah pola">

Perangkat lunak yang mendasari Ethereum terdiri dari dua bagian, yang dikenal sebagai [lapisan eksekusi](/glossary/#execution-layer) dan [lapisan konsensus](/glossary/#consensus-layer).

**Penamaan peningkatan eksekusi**

Sejak tahun 2021, peningkatan pada **lapisan eksekusi** dinamai berdasarkan nama kota dari [lokasi Devcon dan Devconnect sebelumnya](https://devcon.org/en/past-events/) dalam urutan kronologis:

| Nama Peningkatan | Tahun Devcon(nect) | Nomor Devcon | Tanggal Peningkatan |
| -------------- | ----------------- | ------------- | ------------ |
| Berlin         | 2014              | 0             | 15 Apr 2021 |
| London         | 2015              | I             | 5 Agt 2021  |
| Shanghai       | 2016              | II            | 12 Apr 2023 |
| Cancun         | 2017              | III           | 13 Mar 2024 |
| Prague         | 2018              | IV            | 7 Mei 2025  |
| Osaka          | 2019              | V             | 3 Des 2025  |
| **Amsterdam**  | 2022              | Devconnect    | TBD - Berikutnya |
| _Bogotá_       | 2022              | VI            | TBD          |
| _Istanbul_     | 2023              | Devconnect    | TBD          |
| _Bangkok_      | 2024              | VII           | TBD          |
| _Buenos Aires_ | 2025              | Devconnect    | TBD          |
| _Mumbai_       | 2026              | VIII          | TBD          |

**Penamaan peningkatan konsensus**

Sejak peluncuran [beacon chain](/glossary/#beacon-chain), peningkatan pada **lapisan konsensus** dinamai berdasarkan bintang-bintang di langit yang diawali dengan huruf yang berlanjut dalam urutan abjad:

| Nama Peningkatan                                              | Tanggal Peningkatan |
| --------------------------------------------------------- | ------------ |
| Beacon Chain genesis                                      | 1 Des 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 27 Okt 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 6 Sep 2022  |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 12 Apr 2023 |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 13 Mar 2024 |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 Mei 2025  |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 Des 2025  |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | TBD - Berikutnya |
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | TBD          |

**Penamaan gabungan**

Peningkatan eksekusi dan konsensus pada awalnya diluncurkan pada waktu yang berbeda, tetapi setelah [The Merge](/roadmap/merge/) pada tahun 2022, peningkatan ini telah diterapkan secara bersamaan. Oleh karena itu, istilah sehari-hari telah muncul untuk menyederhanakan referensi ke peningkatan ini menggunakan satu istilah gabungan. Ini dimulai dengan peningkatan _Shanghai-Capella_, yang biasa disebut sebagai "**Shapella**", dan dilanjutkan dengan peningkatan berikutnya.

| Peningkatan Eksekusi | Peningkatan Konsensus | Nama Singkat    |
| ----------------- | ----------------- | ------------- |
| Shanghai          | Capella           | "Shapella"    |
| Cancun            | Deneb             | "Dencun"      |
| Prague            | Electra           | "Pectra"      |
| Osaka             | Fulu              | "Fusaka"      |
| Amsterdam         | Gloas             | "Glamsterdam" |
| Bogotá            | Heze              | "Hegotá"      |
</ExpandableCard>

Langsung lompat ke informasi tentang beberapa peningkatan masa lalu yang sangat penting: [Beacon Chain](/roadmap/beacon-chain/); [The Merge](/roadmap/merge/); dan [EIP-1559](#london)

Mencari peningkatan protokol di masa depan? [Pelajari tentang peningkatan mendatang di peta jalan Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Lebih lanjut tentang Fusaka](/roadmap/fusaka/)

### Prague-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

Peningkatan Prague-Electra ("Pectra") mencakup beberapa perbaikan pada protokol Ethereum yang bertujuan untuk meningkatkan pengalaman bagi semua pengguna, jaringan layer 2, staker, dan operator node.

Mengunci (staking) mendapat peningkatan dengan akun validator majemuk, dan kontrol yang lebih baik atas dana yang dikunci menggunakan alamat penarikan eksekusi. EIP-7251 meningkatkan saldo efektif maksimum untuk satu validator menjadi 2048, meningkatkan efisiensi modal bagi staker. EIP-7002 memungkinkan akun eksekusi untuk memicu tindakan validator secara aman, termasuk keluar, atau menarik sebagian dana, meningkatkan pengalaman bagi staker ETH, sekaligus membantu memperkuat akuntabilitas bagi operator node.

Bagian lain dari peningkatan ini berfokus pada peningkatan pengalaman bagi pengguna biasa. EIP-7702 membawa kemampuan bagi akun non-kontrak pintar biasa ([akun yang dimiliki secara eksternal (EOA)](/glossary/#eoa)) untuk mengeksekusi kode yang mirip dengan kontrak pintar. Ini membuka fungsionalitas baru yang tak terbatas untuk akun Ethereum tradisional, seperti pengelompokan transaksi, sponsor gas, autentikasi alternatif, kontrol pengeluaran yang dapat diprogram, mekanisme pemulihan akun, dan banyak lagi.

<ExpandableCard title="EIP Pectra" contentPreview="Perbaikan resmi yang disertakan dalam peningkatan ini.">

Pengalaman pengguna yang lebih baik:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Tetapkan kode akun EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Peningkatan throughput blob</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Tingkatkan biaya calldata</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Tambahkan jadwal blob ke file konfigurasi EL</em></li>
</ul>

Pengalaman mengunci yang lebih baik:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Tingkatkan <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Jalan keluar yang dapat dipicu oleh lapisan eksekusi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Permintaan lapisan eksekusi tujuan umum</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Sediakan deposit validator di onchain</em></li>
</ul>

Peningkatan efisiensi dan keamanan protokol:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Prakompilasi untuk operasi kurva BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Simpan hash blok historis dalam status</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Pindahkan indeks komite ke luar Pengesahan</em></li>
</ul>
</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Bagaimana Pectra akan meningkatkan pengalaman mengunci](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Baca spesifikasi peningkatan Electra](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [Tanya Jawab Prague-Electra ("Pectra")](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Ringkasan Cancun {#cancun-summary}

Peningkatan Cancun berisi serangkaian perbaikan pada _eksekusi_ Ethereum yang ditujukan untuk meningkatkan skalabilitas, bersamaan dengan peningkatan konsensus Deneb.

Khususnya ini termasuk EIP-4844, yang dikenal sebagai **Proto-Danksharding**, yang secara signifikan menurunkan biaya penyimpanan data untuk rollup layer 2. Hal ini dicapai melalui pengenalan "blob" data yang memungkinkan rollup untuk memposting data ke mainnet untuk waktu yang singkat. Ini menghasilkan biaya transaksi yang jauh lebih rendah bagi pengguna rollup layer 2.

<ExpandableCard title="EIP Cancun" contentPreview="Perbaikan resmi yang disertakan dalam peningkatan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Opcode penyimpanan sementara</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Akar blok beacon di EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transaksi blob shard (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Instruksi penyalinan memori</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> hanya dalam transaksi yang sama</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>Opcode <code>BLOBBASEFEE</code></em></li>
</ul>
</ExpandableCard>

- [Rollup layer 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Baca spesifikasi peningkatan Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Ringkasan Deneb {#deneb-summary}

Peningkatan Deneb berisi serangkaian perbaikan pada _konsensus_ Ethereum yang ditujukan untuk meningkatkan skalabilitas. Peningkatan ini hadir bersamaan dengan peningkatan eksekusi Cancun untuk mengaktifkan Proto-Danksharding (EIP-4844), bersama dengan perbaikan lain pada beacon chain.

"Pesan keluar sukarela" yang ditandatangani dan dibuat sebelumnya tidak lagi kedaluwarsa, sehingga memberikan lebih banyak kontrol kepada pengguna yang mengunci dana mereka dengan operator node pihak ketiga. Dengan pesan keluar yang ditandatangani ini, staker dapat mendelegasikan operasi node sambil mempertahankan kemampuan untuk keluar dengan aman dan menarik dana mereka kapan saja, tanpa perlu meminta izin dari siapa pun.

EIP-7514 membawa pengetatan pada penerbitan ETH dengan membatasi tingkat "churn" validator yang dapat bergabung dengan jaringan menjadi delapan (8) per epoch. Karena penerbitan ETH sebanding dengan total ETH yang dikunci, membatasi jumlah validator yang bergabung akan membatasi _tingkat pertumbuhan_ ETH yang baru diterbitkan, sekaligus mengurangi persyaratan perangkat keras untuk operator node, yang membantu desentralisasi.

<ExpandableCard title="EIP Deneb" contentPreview="Perbaikan resmi yang disertakan dalam peningkatan ini">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Akar blok beacon di EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transaksi blob shard</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Jalan keluar sukarela yang ditandatangani dan berlaku selamanya</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Tingkatkan slot penyertaan pengesahan maksimum</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Tambahkan batas churn epoch maksimum</em></li>
</ul>
</ExpandableCard>

- [Baca spesifikasi peningkatan Deneb](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [Tanya Jawab Cancun-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Ringkasan Shanghai {#shanghai-summary}

Peningkatan Shanghai membawa penarikan mengunci (staking) ke lapisan eksekusi. Bersamaan dengan peningkatan Capella, ini memungkinkan blok untuk menerima operasi penarikan, yang memungkinkan staker untuk menarik ETH mereka dari beacon chain ke lapisan eksekusi.

<ExpandableCard title="EIP Shanghai" contentPreview="Perbaikan resmi yang disertakan dalam peningkatan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Memulai alamat <code>COINBASE</code> dalam keadaan hangat</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Instruksi <code>PUSH0</code> baru</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Batasi dan ukur initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Penarikan dorong beacon chain sebagai operasi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Hentikan penggunaan <code>SELFDESTRUCT</code></em></li>
</ul>
</ExpandableCard>

- [Baca spesifikasi peningkatan Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Ringkasan Capella {#capella-summary}

Peningkatan Capella adalah peningkatan besar ketiga pada lapisan konsensus (beacon chain) dan mengaktifkan penarikan mengunci (staking). Capella terjadi secara sinkron dengan peningkatan lapisan eksekusi, Shanghai, dan mengaktifkan fungsionalitas penarikan mengunci.

Peningkatan lapisan konsensus ini membawa kemampuan bagi staker yang tidak memberikan kredensial penarikan dengan deposit awal mereka untuk melakukannya, sehingga memungkinkan penarikan.

Peningkatan ini juga menyediakan fungsionalitas penyapuan akun otomatis, yang secara terus-menerus memproses akun validator untuk setiap pembayaran hadiah yang tersedia atau penarikan penuh.

- [Lebih lanjut tentang penarikan mengunci](/staking/withdrawals/).
- [Baca spesifikasi peningkatan Capella](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Ringkasan {#paris-summary}

Peningkatan Paris dipicu oleh blockchain proof-of-work yang melewati [kesulitan total terminal](/glossary/#terminal-total-difficulty) sebesar 58750000000000000000000. Ini terjadi pada blok 15537393 pada 15 September 2022, memicu peningkatan Paris pada blok berikutnya. Paris adalah transisi [The Merge](/roadmap/merge/) - fitur utamanya adalah mematikan algoritma penambangan [proof-of-work](/developers/docs/consensus-mechanisms/pow) dan logika konsensus terkait dan beralih ke [proof-of-stake](/developers/docs/consensus-mechanisms/pos). Paris sendiri merupakan peningkatan pada [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) (setara dengan Bellatrix pada lapisan konsensus) yang memungkinkan mereka menerima instruksi dari [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients) yang terhubung. Ini membutuhkan serangkaian metode API internal baru, yang secara kolektif dikenal sebagai [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), untuk diaktifkan. Ini bisa dibilang merupakan peningkatan paling signifikan dalam sejarah Ethereum sejak [Homestead](#homestead)!

- [Baca spesifikasi peningkatan Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP Paris" contentPreview="Perbaikan resmi yang disertakan dalam peningkatan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Tingkatkan konsensus ke Proof-of-Stake</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Gantikan opcode DIFFICULTY dengan PREVRANDAO</em></li>
</ul>
</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Ringkasan {#bellatrix-summary}

Peningkatan Bellatrix adalah peningkatan terjadwal kedua untuk [beacon chain](/roadmap/beacon-chain), mempersiapkan rantai untuk [The Merge](/roadmap/merge/). Ini membawa penalti validator ke nilai penuhnya untuk ketidakaktifan dan pelanggaran yang dapat dikenakan pemotongan (slashing). Bellatrix juga mencakup pembaruan pada aturan pilihan fork untuk mempersiapkan rantai menuju The Merge dan transisi dari blok proof-of-work terakhir ke blok proof-of-stake pertama. Ini termasuk membuat klien konsensus menyadari [kesulitan total terminal](/glossary/#terminal-total-difficulty) sebesar 58750000000000000000000.

- [Baca spesifikasi peningkatan Bellatrix](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Ringkasan {#gray-glacier-summary}

Peningkatan jaringan Gray Glacier menunda [bom kesulitan](/glossary/#difficulty-bomb) selama tiga bulan. Ini adalah satu-satunya perubahan yang diperkenalkan dalam peningkatan ini, dan sifatnya mirip dengan peningkatan [Arrow Glacier](#arrow-glacier) dan [Muir Glacier](#muir-glacier). Perubahan serupa telah dilakukan pada peningkatan jaringan [Byzantium](#byzantium), [Constantinople](#constantinople), dan [London](#london).

- [Blog EF - Pengumuman Peningkatan Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="EIP Gray Glacier" contentPreview="Perbaikan resmi yang disertakan dalam peningkatan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>menunda bom kesulitan hingga September 2022</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Ringkasan {#arrow-glacier-summary}

Peningkatan jaringan Arrow Glacier menunda [bom kesulitan](/glossary/#difficulty-bomb) selama beberapa bulan. Ini adalah satu-satunya perubahan yang diperkenalkan dalam peningkatan ini, dan sifatnya mirip dengan peningkatan [Muir Glacier](#muir-glacier). Perubahan serupa telah dilakukan pada peningkatan jaringan [Byzantium](#byzantium), [Constantinople](#constantinople), dan [London](#london).

- [Blog EF - Pengumuman Peningkatan Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - Peningkatan Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP Arrow Glacier" contentPreview="Perbaikan resmi yang disertakan dalam peningkatan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>menunda bom kesulitan hingga Juni 2022</em></li>
</ul>
</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Ringkasan {#altair-summary}

Peningkatan Altair adalah peningkatan terjadwal pertama untuk [beacon chain](/roadmap/beacon-chain). Ini menambahkan dukungan untuk "komite sinkronisasi"—mengaktifkan klien ringan, dan meningkatkan penalti ketidakaktifan validator dan pemotongan (slashing) seiring dengan kemajuan pengembangan menuju The Merge.

- [Baca spesifikasi peningkatan Altair](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Fakta menarik! {#altair-fun-fact}

Altair adalah peningkatan jaringan besar pertama yang memiliki waktu peluncuran yang pasti. Setiap peningkatan sebelumnya didasarkan pada nomor blok yang dideklarasikan pada rantai proof-of-work, di mana waktu blok bervariasi. Beacon chain tidak memerlukan pemecahan untuk proof-of-work, dan sebaliknya bekerja pada sistem epoch berbasis waktu yang terdiri dari 32 "slot" waktu dua belas detik di mana validator dapat mengusulkan blok. Inilah sebabnya kami tahu persis kapan kami akan mencapai epoch 74.240 dan Altair menjadi aktif!

- [Waktu blok](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Ringkasan {#london-summary}

Peningkatan London memperkenalkan [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), yang mereformasi pasar biaya transaksi, bersama dengan perubahan pada cara pengembalian dana gas ditangani dan jadwal [Zaman Es](/glossary/#ice-age).

#### Apa itu Peningkatan London / EIP-1559? {#eip-1559}

Sebelum Peningkatan London, Ethereum memiliki blok berukuran tetap. Pada saat permintaan jaringan tinggi, blok-blok ini beroperasi pada kapasitas penuh. Akibatnya, pengguna sering kali harus menunggu permintaan berkurang agar dapat disertakan dalam sebuah blok, yang menyebabkan pengalaman pengguna yang buruk. Peningkatan London memperkenalkan blok berukuran variabel ke Ethereum.

Cara penghitungan biaya transaksi di jaringan Ethereum berubah dengan [Peningkatan London](/ethereum-forks/#london) pada Agustus 2021. Sebelum peningkatan London, biaya dihitung tanpa memisahkan biaya `base` (dasar) dan `priority` (prioritas), sebagai berikut:

Katakanlah Alice harus membayar Bob 1 ETH. Dalam transaksi tersebut, batas gas adalah 21.000 unit, dan harga gas adalah 200 gwei.

Total biayanya adalah: `Unit gas (batas) * Harga gas per unit` yaitu `21.000 * 200 = 4.200.000 gwei` atau 0,0042 ETH

Penerapan [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) dalam Peningkatan London membuat mekanisme biaya transaksi menjadi lebih kompleks, tetapi membuat biaya gas lebih dapat diprediksi, menghasilkan pasar biaya transaksi yang lebih efisien. Pengguna dapat mengirimkan transaksi dengan `maxFeePerGas` yang sesuai dengan berapa banyak mereka bersedia membayar agar transaksi dieksekusi, mengetahui bahwa mereka tidak akan membayar lebih dari harga pasar untuk gas (`baseFeePerGas`), dan mendapatkan kelebihannya, dikurangi tip mereka, dikembalikan.

Video ini menjelaskan EIP-1559 dan manfaat yang dibawanya: [Penjelasan EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Apakah Anda seorang pengembang dapp? Pastikan untuk meningkatkan pustaka dan peralatan Anda.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Baca penjelasan Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP London" contentPreview="Perbaikan resmi yang disertakan dalam peningkatan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>meningkatkan pasar biaya transaksi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>mengembalikan <code>BASEFEE</code> dari sebuah blok</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>mengurangi pengembalian dana gas untuk operasi EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>mencegah penerapan kontrak yang dimulai dengan <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>menunda Zaman Es hingga Desember 2021</em></li>
</ul>
</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Ringkasan {#berlin-summary}

Peningkatan Berlin mengoptimalkan biaya gas untuk tindakan EVM tertentu, dan meningkatkan dukungan untuk berbagai jenis transaksi.

- [Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Baca penjelasan Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP Berlin" contentPreview="Perbaikan resmi yang disertakan dalam peningkatan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>menurunkan biaya gas ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>memungkinkan dukungan yang lebih mudah untuk berbagai jenis transaksi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>peningkatan biaya gas untuk opcode akses status</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>menambahkan daftar akses opsional</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2020 {#2020}

### Beacon Chain genesis {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Ringkasan {#beacon-chain-genesis-summary}

[Beacon chain](/roadmap/beacon-chain/) membutuhkan 16.384 deposit sebesar 32 ETH yang dikunci untuk diluncurkan dengan aman. Ini terjadi pada 27 November, dan beacon chain mulai memproduksi blok pada 1 Desember 2020.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  Beacon Chain
</DocLink>

---

### Kontrak deposit mengunci diterapkan {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Ringkasan {#deposit-contract-summary}

Kontrak deposit mengunci memperkenalkan [mengunci (staking)](/glossary/#staking) ke ekosistem Ethereum. Meskipun merupakan kontrak [mainnet](/glossary/#mainnet), ini berdampak langsung pada linimasa peluncuran [beacon chain](/roadmap/beacon-chain/), sebuah [peningkatan Ethereum](/roadmap/) yang penting.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Mengunci (Staking)
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Ringkasan {#muir-glacier-summary}

Fork Muir Glacier memperkenalkan penundaan pada [bom kesulitan](/glossary/#difficulty-bomb). Peningkatan kesulitan blok dari mekanisme konsensus [proof-of-work](/developers/docs/consensus-mechanisms/pow/) mengancam akan menurunkan kegunaan Ethereum dengan meningkatkan waktu tunggu untuk mengirim transaksi dan menggunakan dapps.

- [Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Baca penjelasan Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP Muir Glacier" contentPreview="Perbaikan resmi yang disertakan dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>menunda bom kesulitan selama 4.000.000 blok lagi, atau ~611 hari.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Ringkasan {#istanbul-summary}

Fork Istanbul:

- Mengoptimalkan biaya [gas](/glossary/#gas) dari tindakan tertentu di [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Meningkatkan ketahanan terhadap serangan denial-of-service.
- Membuat solusi [peningkatan layer 2](/developers/docs/scaling/#layer-2-scaling) berbasis SNARK dan STARK menjadi lebih berkinerja.
- Memungkinkan Ethereum dan Zcash untuk beroperasi bersama.
- Memungkinkan kontrak untuk memperkenalkan fungsi yang lebih kreatif.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="EIP Istanbul" contentPreview="Perbaikan resmi yang disertakan dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>memungkinkan Ethereum bekerja dengan mata uang yang menjaga privasi seperti Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>kriptografi yang lebih murah untuk meningkatkan biaya [gas](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>melindungi Ethereum dari serangan replay dengan menambahkan [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>mengoptimalkan harga gas opcode berdasarkan konsumsi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>mengurangi biaya CallData untuk memungkinkan lebih banyak data dalam blok – baik untuk [peningkatan layer 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>perubahan harga gas opcode lainnya.</em></li>
</ul>
</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Ringkasan {#constantinople-summary}

Fork Constantinople:

- Mengurangi hadiah [penambangan](/developers/docs/consensus-mechanisms/pow/mining/) blok dari 3 menjadi 2 ETH.
- Memastikan blockchain tidak membeku sebelum [proof-of-stake diimplementasikan](#beacon-chain-genesis).
- Mengoptimalkan biaya [gas](/glossary/#gas) dari tindakan tertentu di [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Menambahkan kemampuan untuk berinteraksi dengan alamat yang belum dibuat.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="EIP Constantinople" contentPreview="Perbaikan resmi yang disertakan dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>mengoptimalkan biaya tindakan onchain tertentu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>memungkinkan Anda berinteraksi dengan alamat yang belum dibuat.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>memperkenalkan instruksi <code>EXTCODEHASH</code> untuk mengambil hash dari kode kontrak lain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>memastikan blockchain tidak membeku sebelum proof-of-stake dan mengurangi hadiah blok dari 3 menjadi 2 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Ringkasan {#byzantium-summary}

Fork Byzantium:

- Mengurangi hadiah [penambangan](/developers/docs/consensus-mechanisms/pow/mining/) blok dari 5 menjadi 3 ETH.
- Menunda [bom kesulitan](/glossary/#difficulty-bomb) selama satu tahun.
- Menambahkan kemampuan untuk melakukan panggilan yang tidak mengubah status ke kontrak lain.
- Menambahkan metode kriptografi tertentu untuk memungkinkan [peningkatan layer 2](/developers/docs/scaling/#layer-2-scaling).

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="EIP Byzantium" contentPreview="Perbaikan resmi yang disertakan dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>menambahkan opcode <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>bidang status ditambahkan ke tanda terima transaksi untuk menunjukkan keberhasilan atau kegagalan.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>menambahkan kurva eliptik dan perkalian skalar untuk memungkinkan [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>menambahkan kurva eliptik dan perkalian skalar untuk memungkinkan [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>mengaktifkan verifikasi tanda tangan RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>menambahkan dukungan untuk nilai kembalian dengan panjang variabel.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>menambahkan opcode <code>STATICCALL</code>, memungkinkan panggilan yang tidak mengubah status ke kontrak lain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>mengubah rumus penyesuaian kesulitan.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>menunda [bom kesulitan](/glossary/#difficulty-bomb) selama 1 tahun dan mengurangi hadiah blok dari 5 menjadi 3 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Ringkasan {#spurious-dragon-summary}

Fork Spurious Dragon adalah respons kedua terhadap serangan denial of service (DoS) di jaringan (September/Oktober 2016) termasuk:

- menyesuaikan harga opcode untuk mencegah serangan di masa depan pada jaringan.
- mengaktifkan "debloat" dari status blockchain.
- menambahkan perlindungan serangan replay.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="EIP Spurious Dragon" contentPreview="Perbaikan resmi yang disertakan dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>mencegah transaksi dari satu rantai Ethereum disiarkan ulang di rantai alternatif, misalnya transaksi testnet yang diputar ulang di rantai utama Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>menyesuaikan harga opcode <code>EXP</code> – membuatnya lebih sulit untuk memperlambat jaringan melalui operasi kontrak yang mahal secara komputasi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>memungkinkan penghapusan akun kosong yang ditambahkan melalui serangan DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>mengubah ukuran kode maksimum yang dapat dimiliki kontrak di blockchain – menjadi 24576 byte.</em></li>
</ul>
</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Ringkasan {#tangerine-whistle-summary}

Fork Tangerine Whistle adalah respons pertama terhadap serangan denial of service (DoS) di jaringan (September/Oktober 2016) termasuk:

- mengatasi masalah kesehatan jaringan yang mendesak terkait kode operasi yang harganya terlalu rendah.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="EIP Tangerine Whistle" contentPreview="Perbaikan resmi yang disertakan dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>meningkatkan biaya gas dari opcode yang dapat digunakan dalam serangan spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>mengurangi ukuran status dengan menghapus sejumlah besar akun kosong yang dimasukkan ke dalam status dengan biaya sangat rendah karena kelemahan pada versi protokol Ethereum sebelumnya.</em></li>
</ul>
</ExpandableCard>

---

### DAO fork {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Ringkasan {#dao-fork-summary}

DAO fork adalah respons terhadap [serangan DAO 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/) di mana kontrak [organisasi otonom terdesentralisasi (DAO)](/glossary/#dao) yang tidak aman dikuras lebih dari 3,6 juta ETH dalam sebuah peretasan. Fork ini memindahkan dana dari kontrak yang rusak ke [kontrak baru](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) dengan satu fungsi: penarikan. Siapa pun yang kehilangan dana dapat menarik 1 ETH untuk setiap 100 token DAO di dompet mereka.

Tindakan ini dipilih oleh komunitas Ethereum. Setiap pemegang ETH dapat memberikan suara melalui transaksi di [platform pemungutan suara](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Keputusan untuk melakukan fork mencapai lebih dari 85% suara.

Beberapa penambang menolak untuk melakukan fork karena insiden DAO bukanlah cacat pada protokol. Mereka kemudian membentuk [Ethereum Classic](https://ethereumclassic.org/).

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Ringkasan {#homestead-summary}

Fork Homestead yang melihat ke masa depan. Ini mencakup beberapa perubahan protokol dan perubahan jaringan yang memberi Ethereum kemampuan untuk melakukan peningkatan jaringan lebih lanjut.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="EIP Homestead" contentPreview="Perbaikan resmi yang disertakan dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>melakukan pengeditan pada proses pembuatan kontrak.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>menambahkan opcode baru: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>memperkenalkan persyaratan kompatibilitas ke depan devp2p</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Ringkasan {#frontier-thawing-summary}

Fork frontier thawing mencabut batas 5.000 [gas](/glossary/#gas) per [blok](/glossary/#block) dan menetapkan harga gas default menjadi 51 [gwei](/glossary/#gwei). Ini memungkinkan terjadinya transaksi – transaksi membutuhkan 21.000 gas. [Bom kesulitan](/glossary/#difficulty-bomb) diperkenalkan untuk memastikan hard fork di masa depan ke [proof-of-stake](/glossary/#pos).

- [Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Baca Pembaruan Protokol Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Ringkasan {#frontier-summary}

Frontier adalah implementasi langsung, tetapi sangat mendasar dari proyek Ethereum. Ini mengikuti fase pengujian Olympic yang sukses. Ini ditujukan untuk pengguna teknis, khususnya pengembang. [Blok](/glossary/#block) memiliki batas [gas](/glossary/#gas) sebesar 5.000. Periode 'pencairan' (thawing) ini memungkinkan penambang untuk memulai operasi mereka dan bagi pengadopsi awal untuk menginstal klien mereka tanpa harus 'terburu-buru'.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Penjualan Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether secara resmi mulai dijual selama 42 hari. Anda dapat membelinya dengan BTC.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Yellowpaper dirilis {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Yellow Paper, yang ditulis oleh Dr. Gavin Wood, adalah definisi teknis dari protokol Ethereum.

[Lihat Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Whitepaper dirilis {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Makalah pengantar, yang diterbitkan pada tahun 2013 oleh Vitalik Buterin, pendiri Ethereum, sebelum peluncuran proyek pada tahun 2015.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>