---
title: Linimasa semua fork Ethereum (2014 hingga sekarang)
description: Riwayat blockchain Ethereum termasuk tonggak sejarah, rilis, dan fork utama.
lang: id
sidebarDepth: 1
---

# Linimasa semua fork Ethereum (2014 hingga sekarang) {#the-history-of-ethereum}

Linimasa semua tonggak sejarah, fork, dan pembaruan utama dalam blockchain Ethereum.

<ExpandableCard title="Apa itu fork?" contentPreview="Perubahan pada aturan protokol Ethereum yang sering kali berupa pembaruan teknis.">

Fork adalah ketika peningkatan atau perubahan teknis utama perlu dilakukan pada jaringan – biasanya berasal dari [Proposal Peningkatan Ethereum (EIP)](/eips/) dan mengubah "aturan" protokol.

Ketika peningkatan diperlukan dalam perangkat lunak tradisonal yang dikontrol secara terpusat, perusahaan hanya akan menerbitkan versi terbarunya bagi pengguna akhir. Blockchain bekerja dengan cara yang berbeda karena tidak ada kepemilikan terpusat. [Klien Ethereum](/developers/docs/nodes-and-clients/) harus memperbarui perangkat lunak mereka untuk menerapkan aturan fork baru. Pembuat blok plus (penambang di dunia bukti kerja, validator di dunia bukti taruhan) dan node harus membuat blok dan memvalidasi aturan baru. [Lebih lanjut tentang mekanisme konsensus](/developers/docs/consensus-mechanisms/)

Perubahan aturan ini dapat menciptakan perpecahan sementara di jaringan. Blok baru dapat dibuat berdasarkan peraturan baru atau lama. Fork biasanya disepakati sebelumnya sehingga klien mengadopsi perubahan secara bersamaan dan fork dengan peningkatan menjadi rantai utama. Namun, dalam kasus yang jarang terjadi, perselisihan mengenai garpu dapat menyebabkan jaringan terbagi secara permanen - yang paling terkenal adalah terciptanya Ethereum Classic dengan <a href="#dao-fork">fork DAO</a>.
</ExpandableCard>

<ExpandableCard title="Mengapa beberapa pembaruan memiliki beberapa nama?" contentPreview="Nama pembaruan mengikuti suatu pola">

Perangkat lunak yang mendasari Ethereum terdiri dari dua bagian, yang dikenal sebagai [lapisan eksekusi](/glossary/#execution-layer) dan [lapisan konsensus](/glossary/#consensus-layer).

**Penamaan peningkatan eksekusi**

Sejak 2021, peningkatan pada **lapisan eksekusi** dinamai sesuai dengan nama-nama kota dari [lokasi Devcon sebelumnya](https://devcon.org/en/past-events/) dalam urutan kronologis:

| Nama Peningkatan | Tahun Devcon | Nomor Devcon | Tanggal Peningkatan          |
| ---------------- | ------------ | ------------ | ---------------------------- |
| Berlin           | 2014         | 0            | 15 Apr 2021                  |
| London           | 2015         | I            | 5 Agu 2021                   |
| Shanghai         | 2016         | II           | 12 Apr 2023                  |
| Cancun           | 2017         | III          | 13 Mar 2024                  |
| **Prague**       | 2018         | IV           | Akan Ditentukan - Berikutnya |
| _Osaka_          | 2019         | V            | Akan Ditentukan              |
| _Bogota_         | 2022         | VI           | Akan Ditentukan              |
| _Bangkok_        | 2024         | VII          | Akan Ditentukan              |

**Penamaan peningkatan konsensus**

Sejak peluncuran [Beacon Chain](/glossary/#beacon-chain), peningkatan pada **lapisan konsensus** dinamai berdasarkan nama bintang-bintang yang dimulai dengan huruf secara berurutan abjad:

| Nama Peningkatan                                              | Tanggal Peningkatan          |
| ------------------------------------------------------------- | ---------------------------- |
| Genesis Rantai Suar                                           | 1 Des 2020                   |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 27 Okt 2021                  |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 6 Sep 2022                   |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 12 Apr 2023                  |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 13 Mar 2024                  |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | Akan Ditentukan - Berikutnya |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | Akan Ditentukan              |

**Penamaan gabungan**

Peningkatan eksekusi dan konsensus awalnya diluncurkan pada waktu yang berbeda, tetapi setelah [The Merge](/roadmap/merge/) pada tahun 2022, ini telah diterapkan secara bersamaan. Oleh karena itu, istilah sehari-hari telah muncul untuk menyederhanakan referensi ke peningkatan ini menggunakan satu istilah gabungan. Hal ini dimulai dengan peningkatan _Shanghai-Capella_, yang biasa disebut sebagai “**Shapella**”, dan dilanjutkan dengan peningkatan _Cancun-Deneb_ (**Dencun**), dan _Prague-Electra_ (**Pectra**).

| Peningkatan Eksekusi | Peningkatan Konsensus | Nama Pendek |
| -------------------- | --------------------- | ----------- |
| Shanghai             | Capella               | "Shapella"  |
| Cancun               | Deneb                 | "Dencun"    |
| Prague               | Electra               | "Pectra"    |
| Osaka                | Fulu                  | "Fusaka"    |
</ExpandableCard>

Langsung ke informasi tentang beberapa peningkatan masa lalu yang sangat penting: [Rantai Suar](/roadmap/beacon-chain/); [Penggabungan](/roadmap/merge/); dan [EIP-1559](#london)

Sedang mencari peningkatan protokol di masa mendatang? [Pelajari tentang peningkatan mendatang di peta perjalanan Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Selengkapnya tentang Fusaka](/roadmap/fusaka/)

### Prague-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

Upgrade Prague-Electra ("Pectra") mencakup beberapa peningkatan pada protokol Ethereum yang bertujuan untuk meningkatkan pengalaman bagi semua pengguna, jaringan layer 2, staker, dan operator node.

Staking mendapatkan peningkatan dengan akun validator penggabungan, dan kontrol yang lebih baik atas dana yang dipertaruhkan menggunakan alamat penarikan eksekusi. EIP-7251 meningkatkan saldo efektif maksimum untuk satu validator menjadi 2048, sehingga meningkatkan efisiensi modal bagi para stakers. Dengan EIP-7002, akun eksekusi dapat dengan aman melakukan tindakan validator, seperti keluar atau menarik sebagian dana. Ini meningkatkan pengalaman staker ETH dan memperkuat tanggung jawab operator node.

Bagian lain dari peningkatan ini berfokus pada peningkatan pengalaman bagi pengguna biasa. EIP-7702 memberikan kemampuan bagi akun biasa non-kontrak pintar ([EOA](/glossary/#eoa)) untuk mengeksekusi kode yang serupa dengan kontrak pintar. Fitur ini menghadirkan kemampuan baru tak terbatas bagi akun Ethereum tradisional, termasuk pengelompokan transaksi, sponsor gas, metode otentikasi alternatif, kontrol pengeluaran yang dapat diprogram, pemulihan akun, dan banyak lagi.

<ExpandableCard title="EIP Pectra" contentPreview="Peningkatan resmi dalam pembaruan ini.">

Pengalaman pengguna yang lebih baik:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Tetapkan kode akun EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Peningkatan throughput Blob</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Meningkatkan biaya data panggilan</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Tambahkan jadwal blob ke berkas konfigurasi EL</em></li>
</ul>

Pengalaman staking yang lebih baik:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Meningkatkan <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Keluar yang dapat dipicu oleh lapisan eksekusi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Keluar yang dapat dipicu oleh lapisan eksekusi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Setoran validator pasokan pada rantai</em></li>
</ul>

Efisiensi protokol dan peningkatan keamanan:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Pra-kompilasi untuk operasi kurva BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Simpan hash blok historis dalam status</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Pindahkan indeks komite ke luar Pengesahan</em></li>
</ul>
</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Bagaimana Pectra akan meningkatkan pengalaman penaruhan](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Baca spesifikasi peningkatan Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [FAQ Prague-Electra ("Pectra")](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Ringkasan Cancun {#cancun-summary}

Peningkatan Cancun berisi serangkaian perbaikan untuk _eksekusi_ Ethereum yang bertujuan untuk meningkatkan skalabilitas, bersamaan dengan peningkatan konsensus Deneb.

Terutama, ini termasuk EIP-4844, yang dikenal sebagai **Proto-Danksharding**, yang secara signifikan menurunkan biaya penyimpanan data untuk rollup lapisan 2. Hal ini dapat dicapai melalui pengenalan "blob" data yang memungkinkan rollup untuk mengirim data ke Mainnet dalam waktu singkat. Hasil ini menghasilkan biaya yang jauh lebih rendah untuk pengguna rollup layer 2.

<ExpandableCard title="EIP Cancun" contentPreview="Peningkatan resmi dalam pembaruan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>opcode penyimpanan sementara</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>root blok Beacon di EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>transaksi blob Shard (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Instruksi penyalinan memori</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> hanya dalam transaksi yang sama</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> opcode</em></li>
</ul>
</ExpandableCard>

- [Rollup lapisan 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Baca spesifikasi peningkatan Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Ringkasan Deneb {#deneb-summary}

Peningkatan Deneb berisi serangkaian perbaikan pada _konsensus_ Ethereum yang bertujuan untuk meningkatkan skalabilitas. Peningkatan ini hadir bersamaan dengan peningkatan eksekusi Cancun untuk mengaktifkan Proto-Danksharding (EIP-4844), bersama dengan peningkatan lainnya pada Beacon Chain.

"Pesan keluar sukarela" yang telah ditandatangani sebelumnya tidak lagi kedaluwarsa, sehingga memberikan kontrol lebih kepada pengguna yang mempertaruhkan dana mereka dengan operator node pihak ketiga. Dengan pesan keluar yang ditandatangani ini, stakers dapat mendelegasikan operasi node dengan tetap mempertahankan kemampuan untuk keluar dengan aman dan menarik dana mereka kapan saja, tanpa perlu meminta izin dari siapa pun.

EIP-7514 memperketat penerbitan ETH dengan membatasi tingkat "churn" dimana validator dapat bergabung dengan jaringan menjadi delapan (8) per epoch. Karena penerbitan ETH sebanding dengan total ETH yang ditaruhkan, membatasi jumlah validator yang bergabung akan membatasi _tingkat pertumbuhan_ ETH yang baru diterbitkan, sekaligus mengurangi persyaratan perangkat keras bagi operator node, yang membantu desentralisasi.

<ExpandableCard title="EIP Deneb" contentPreview="Peningkatan resmi dalam pembaruan ini">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>root blok Beacon di EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>transaksi blob Shard</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Keluar secara sukarela yang ditandatangani dan berlaku selamanya</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Meningkatkan slot penyertaan pengesahan maksimal</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Menambahkan batas churn epoch maksimal</em></li>
</ul>
</ExpandableCard>

- [Baca spesifikasi peningkatan Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [FAQ Cancun-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Ringkasan Shanghai {#shanghai-summary}

Peningkatan Shanghai membawa penarikan penaruhan ke Lapisan Eksekusi. Bersamaan dengan peningkatan Capella, ini memungkinkan blok menerima operasi penarikan, yang memungkinkan para staker menarik ETH mereka dari Rantai Suar ke lapisan eksekusi.

<ExpandableCard title="EIP Shanghai" contentPreview="Peningkatan resmi dalam pembaruan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Memulai alamat <code>COINBASE</code> menjadi hangat</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Instruksi <code>PUSH0</code> baru</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Batasi dan ukur kode awal</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Penarikan dorong rantai suar sebagai operasi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Hentikan <code>SELFDESTRUCT</code></em></li>
</ul>
</ExpandableCard>

- [Baca spesifikasi peningkatan Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Ringkasan Capella {#capella-summary}

Peningkatan Capella adalah peningkatan utama ketiga pada lapisan konsensus (Rantai Suar) dan memungkinkan penarikan penaruhan. Capella terjadi secara bersamaan dengan upgrade lapisan eksekusi, Shanghai, dan mengaktifkan fungsionalitas penarikan penaruhan.

Peningkatan lapisan konsensus ini membawa kemampuan bagi staker yang tidak menyediakan kredensial penarikan bersama setoran awal mereka untuk melakukannya, dengan demikian memungkinkan penarikan.

Peningkatan ini juga menyediakan fungsionalitas pemindaian akun otomatis, yang terus-menerus memproses akun validator untuk pembayaran imbalan yang tersedia atau penarikan penuh.

- [Selengkapnya tentang penarikan penaruhan](/staking/withdrawals/).
- [Baca spesifikasi peningkatan Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (Penggabungan) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Rangkuman {#paris-summary}

Peningkatan Paris dipicu saat blockchain bukti kerja melewati [total kesulitan terminal](/glossary/#terminal-total-difficulty) sebesar 58750000000000000000000. Hal ini terjadi pada blok 15537393 pada tanggal 15 September 2022, memicu peningkatan Paris pada blok berikutnya. Paris adalah transisi [Penggabungan](/roadmap/merge/) - fitur utamanya adalah mematikan algoritma penambangan [bukti kerja](/developers/docs/consensus-mechanisms/pow) dan logika konsensus terkait, dan sebagai gantinya mengaktifkan [bukti taruhan](/developers/docs/consensus-mechanisms/pos). Paris sendiri merupakan peningkatan untuk [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) (setara dengan Bellatrix pada lapisan konsensus) yang memungkinkan mereka menerima instruksi dari [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients) yang terhubung. Ini memerlukan serangkaian metode API internal baru, yang secara kolektif dikenal sebagai [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), untuk diaktifkan. Ini bisa dibilang merupakan peningkatan paling signifikan dalam sejarah Ethereum sejak [Homestead](#homestead)!

- [Baca spesifikasi peningkatan Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP Paris" contentPreview="Peningkatan resmi dalam pembaruan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Meningkatkan konsensus ke Bukti Taruhan</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Ganti opcode KESULITAN dengan PREVRANDAO</em></li>
</ul>
</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Rangkuman {#bellatrix-summary}

Peningkatan Bellatrix adalah peningkatan terjadwal kedua untuk [Rantai Suar](/roadmap/beacon-chain), yang mempersiapkan rantai untuk [Penggabungan](/roadmap/merge/). Peningkatan ini membawa denda validator ke nilai penuh untuk ketidakaktifan dan pelanggaran yang dapat dipotong. Bellatrix juga mencakup pembaruan pada aturan pemilihan garpu untuk mempersiapkan jaringan untuk Penggabungan dan transisi dari blok bukti kerja terakhir ke blok bukti taruhan pertama. Ini termasuk membuat klien konsensus menyadari [total kesulitan terminal](/glossary/#terminal-total-difficulty) sebesar 58750000000000000000000.

- [Baca spesifikasi peningkatan Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Rangkuman {#gray-glacier-summary}

Peningkatan jaringan Gray Glacier menunda [bom kesulitan](/glossary/#difficulty-bomb) selama tiga bulan. Ini adalah satu-satunya perubahan yang diperkenalkan dalam peningkatan ini, dan sifatnya serupa dengan peningkatan [Arrow Glacier](#arrow-glacier) dan [Muir Glacier](#muir-glacier). Perubahan serupa telah dilakukan pada peningkatan jaringan [Byzantium](#byzantium), [Constantinople](#constantinople), dan [London](#london).

- [Blog EF - Pengumuman Peningkatan Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="EIP Gray Glacier" contentPreview="Peningkatan resmi dalam pembaruan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>menunda bom kesulitan hingga September 2022</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Rangkuman {#arrow-glacier-summary}

Peningkatan jaringan Arrow Glacier menunda [bom kesulitan](/glossary/#difficulty-bomb) selama beberapa bulan. Ini adalah satu-satunya perubahan yang diperkenalkan dalam peningkatan ini, dan sifatnya serupa dengan peningkatan [Muir Glacier](#muir-glacier). Perubahan serupa telah dilakukan pada peningkatan jaringan [Byzantium](#byzantium), [Constantinople](#constantinople), dan [London](#london).

- [Blog EF - Pengumuman Peningkatan Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Peningkatan Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP Arrow Glacier" contentPreview="Peningkatan resmi dalam pembaruan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>menunda bom kesulitan hingga Juni 2022</em></li>
</ul>
</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Rangkuman {#altair-summary}

Peningkatan Altair adalah peningkatan terjadwal pertama untuk [Rantai Suar](/roadmap/beacon-chain). Ini memberi tambahan dukungan untuk "komite sinkronisasi" — memungkinkan klien ringan, dan meningkatkan ketidakaktifan validator dan memotong hukuman saat pengembangan berkembang menuju Penggabungan.

- [Baca spesifikasi peningkatan Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Fakta menarik! {#altair-fun-fact}

Altair adalah peningkatan besar dan pertama untuk jaringan yang memiliki waktu rollout yang pasti. Setiap peningkatan sebelumnya telah berdasarkan pada suatu nomor blok yang dideklarasikan pada rantai bukti kerja, dengan waktu blok yang bervariasi. Rantai Suar tidak mengharuskan penyelesaian bukti kerja, dan sebagai gantinya berfungsi pada sistem jangka waktu berbasis waktu yang terdiri dari 32 "slot" waktu dua belas detik di mana para validator dapat mengusulkan blok. Inilah alasan kami mengetahui secara pasti kapan kami akan mencapai jangka waktu 74.240 dan Altair mulai beroperasi!

- [Waktu blok](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Rangkuman {#london-summary}

Peningkatan London memperkenalkan [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), yang mereformasi pasar biaya transaksi, bersama dengan perubahan cara penanganan pengembalian dana gas dan jadwal [Zaman Es](/glossary/#ice-age).

#### Apa yang dimaksud dengan London Upgrade / EIP-1559? {#eip-1559}

Sebelum Peningkatan London, Ethereum memiliki blok berukuran tetap. Pada saat permintaan jaringan yang tinggi, blok-blok ini beroperasi dengan kapasitas penuh. Akibatnya, pengguna sering kali harus menunggu permintaan berkurang untuk dimasukkan ke dalam blokir, yang menyebabkan pengalaman pengguna yang buruk. London Upgrade memperkenalkan blok berukuran variabel ke Ethereum.

Cara biaya transaksi di jaringan Ethereum dihitung berubah dengan [Peningkatan London](/ethereum-forks/#london) pada bulan Agustus 2021. Sebelum peningkatan London, biaya dihitung tanpa memisahkan biaya `dasar` dan `prioritas`, sebagai berikut:

Katakanlah Alice harus membayar Bob 1 ETH. Dalam transaksi tersebut, batas gas adalah 21.000 unit dan harga gas adalah 200 gwei.

Total biayanya adalah: `Unit gas (limit) * Harga gas per unit` yaitu `21.000 * 200 = 4.200.000 gwei` atau 0,0042 ETH

Implementasi [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) pada Peningkatan London membuat mekanisme biaya transaksi lebih kompleks, tetapi membuat biaya gas lebih dapat diprediksi, yang menghasilkan pasar biaya transaksi yang lebih efisien. Pengguna dapat mengirimkan transaksi dengan `maxFeePerGas` yang sesuai dengan jumlah yang bersedia mereka bayar agar transaksi dieksekusi, dengan mengetahui bahwa mereka tidak akan membayar lebih dari harga pasar untuk gas (`baseFeePerGas`), dan mendapatkan kelebihan dana, dikurangi tip mereka, dikembalikan.

Video ini menjelaskan EIP-1559 dan manfaat yang dibawanya: [Penjelasan EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Apakah Anda seorang pengembang dapp? Pastikan untuk meningkatkan pustaka dan perangkat Anda.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Baca penjelasan dari Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP London" contentPreview="Peningkatan resmi dalam pembaruan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>meningkatkan pasar biaya transaksi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>mengembalikan <code>BASEFEE</code> dari blok</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>mengurangi pengembalian dana gas untuk pengoperasian EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>mencegah penggunaan kontrak dengan <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>menunda Zaman Es hingga Desember 2021</em></li>
</ul>
</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Rangkuman {#berlin-summary}

Peningkatan Berlin mengoptimalkan harga gas untuk beberapa aksi EVM, dan meningkatkan dukungan pada beragam jenis transaksi.

- [Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Baca penjelasan dari Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP Berlin" contentPreview="Peningkatan resmi dalam pembaruan ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>mengurangi biaya gas ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>memungkinkan dukungan yang lebih mudah untuk berbagai jenis transaksi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>kenaikan biaya gas untuk opcode akses negara bagian</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>menambahkan daftar akses opsional</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2020 {#2020}

### Genesis Rantai Suar {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Rangkuman {#beacon-chain-genesis-summary}

[Rantai Suar](/roadmap/beacon-chain/) membutuhkan 16.384 deposit sebesar 32 ETH yang ditaruhkan untuk diluncurkan dengan aman. Ini terjadi pada 27 November, dan Rantai Suar mulai memproduksi blok pada 1 Desember 2020.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  Rantai Suar
</DocLink>

---

### Kontrak deposit penaruhan diterapkan {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Rangkuman {#deposit-contract-summary}

Kontrak deposit penaruhan memperkenalkan [penaruhan](/glossary/#staking) ke ekosistem Ethereum. Meskipun merupakan kontrak [Mainnet](/glossary/#mainnet), kontrak ini berdampak langsung pada linimasa peluncuran [Rantai Suar](/roadmap/beacon-chain/), sebuah [peningkatan Ethereum](/roadmap/) yang penting.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Penaruhan
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Rangkuman {#muir-glacier-summary}

Fork Muir Glacier memperkenalkan penundaan pada [bom kesulitan](/glossary/#difficulty-bomb). Peningkatan kesulitan blok dari mekanisme konsensus [bukti kerja](/developers/docs/consensus-mechanisms/pow/) mengancam akan menurunkan kegunaan Ethereum dengan meningkatkan waktu tunggu untuk mengirim transaksi dan menggunakan dapps.

- [Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Baca penjelasan dari Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP Muir Glacier" contentPreview="Peningkatan resmi dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>menunda bom kesulitan selama 4.000.000 blok lagi, atau sekitar ~611 hari.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Rangkuman {#istanbul-summary}

Garpu Istanbul:

- Mengoptimalkan biaya [gas](/glossary/#gas) dari tindakan tertentu di [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Meningkatkan ketahanan terhadap serangan penolakan layanan.
- Membuat solusi [penskalaan Lapisan 2](/developers/docs/scaling/#layer-2-scaling) berdasarkan SNARK dan STARK menjadi lebih berkinerja.
- Memungkinkan Ethereum dan Zcash untuk saling bekerja sama.
- Kontrak yang diizinkan untuk memperkenalkan lebih banyak fungsi kreatif.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP Istanbul" contentPreview="Peningkatan resmi dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>memungkinkan Ethereum bekerja dengan mata uang yang menjaga privasi seperti Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>kriptografi yang lebih murah untuk meningkatkan biaya [gas](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>melindungi Ethereum dari serangan replay dengan menambahkan <code>CHAINID</code> [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>mengoptimalkan harga gas opcode berdasarkan konsumsi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>mengurangi biaya CallData untuk memungkinkan lebih banyak data dalam blok – baik untuk [penskalaan Layer 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>penyesuaian harga gas opcode lainnya.</em></li>
</ul>
</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Rangkuman {#constantinople-summary}

Fork Konstantinopel:

- Mengurangi imbalan [penambangan](/developers/docs/consensus-mechanisms/pow/mining/) blok dari 3 menjadi 2 ETH.
- Memastikan blockchain tidak membeku sebelum [bukti taruhan diterapkan](#beacon-chain-genesis).
- Mengoptimalkan biaya [gas](/glossary/#gas) dari tindakan tertentu di [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Menambahkan kemampuan untuk berinteraksi dengan alamat yang belum dibuat.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIP Constantinople" contentPreview="Peningkatan resmi dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>mengoptimalkan biaya tindakan onchain tertentu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>memungkinkan Anda berinteraksi dengan alamat yang belum dibuat.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>memperkenalkan instruksi <code>EXTCODEHASH</code> untuk mengambil hash kode kontrak lain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>memastikan blockchain tidak&#39; membeku sebelum bukti kepemilikan dan mengurangi hadiah blok dari 3 menjadi 2 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Rangkuman {#byzantium-summary}

Fork Byzantium:

- Mengurangi imbalan [penambangan](/developers/docs/consensus-mechanisms/pow/mining/) blok dari 5 menjadi 3 ETH.
- Menunda [bom kesulitan](/glossary/#difficulty-bomb) selama satu tahun.
- Menambahkan kemampuan untuk melakukan panggilan yang tidak mengubah state ke kontrak lain.
- Menambahkan metode kriptografi tertentu untuk memungkinkan [penskalaan lapisan 2](/developers/docs/scaling/#layer-2-scaling).

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP Byzantium" contentPreview="Peningkatan resmi dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>menambahkan opcode <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>Bidang status ditambahkan ke tanda terima transaksi untuk menunjukkan keberhasilan atau kegagalan.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>menambahkan kurva eliptik dan perkalian skalar untuk memungkinkan [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>menambahkan kurva eliptik dan perkalian skalar untuk memungkinkan [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>memungkinkan verifikasi tanda tangan RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>menambahkan dukungan untuk nilai pengembalian panjang variabel.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>menambahkan <code>STATICCALL</code> opcode, mengizinkan panggilan yang tidak mengubah status ke kontrak lain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>mengubah formula penyesuaian tingkat kesulitan.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>menunda [bom kesulitan](/glossary/#difficulty-bomb) selama 1 tahun dan mengurangi hadiah blok dari 5 menjadi 3 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Rangkuman {#spurious-dragon-summary}

Garpu Spurious Dragon adalah respons kedua terhadap serangan penolakan layanan (DoS) di jaringan (September/Oktober 2016) termasuk:

- menyetel harga opcode untuk mencegah serangan di masa mendatang pada jaringan.
- memungkinkan "debloat" dari status rantai blok.
- menambahkan perlindungan terhadap serangan perulangan.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP Spurious Dragon" contentPreview="Peningkatan resmi dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>mencegah transaksi dari satu rantai Ethereum disiarkan ulang di rantai alternatif, misalnya transaksi jaringan percobaan yang diputar ulang di rantai Ethereum utama.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>menyesuaikan harga dari <code>EXP</code> opcode – mempersulit memperlambat jaringan melalui operasi kontrak yang mahal secara komputasi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>memungkinkan penghapusan akun kosong yang ditambahkan melalui serangan DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>mengubah ukuran kode maksimum yang dapat dimiliki oleh sebuah kontrak pada rantai blok – menjadi 24576 bita.</em></li>
</ul>
</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Rangkuman {#tangerine-whistle-summary}

Garpu Tangerine Whistle adalah respons pertama terhadap serangan denial of service (DoS) di jaringan (September/Oktober 2016) yang mencakup:

- menangani masalah kesehatan jaringan yang mendesak mengenai kode operasi yang terlalu murah.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP Tangerine Whistle" contentPreview="Peningkatan resmi dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>meningkatkan biaya gas dari opcode yang dapat digunakan dalam serangan spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>mengurangi ukuran status dengan menghapus sejumlah besar akun kosong yang dimasukkan ke dalam status dengan biaya yang sangat rendah karena adanya kekurangan pada versi protokol Ethereum sebelumnya.</em></li>
</ul>
</ExpandableCard>

---

### Fork DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Rangkuman {#dao-fork-summary}

Fork DAO adalah tanggapan atas [serangan DAO 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/) di mana kontrak [DAO](/glossary/#dao) yang tidak aman dikuras lebih dari 3,6 juta ETH dalam sebuah peretasan. Fork memindahkan dana dari kontrak yang salah ke [kontrak baru](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) dengan satu fungsi: tarik. Siapa pun yang kehilangan dana dapat menarik 1 ETH untuk setiap 100 token DAO di dompet mereka.

Tindakan ini dipilih oleh komunitas Ethereum. Setiap pemegang ETH dapat memberikan suara melalui transaksi di [platform pemungutan suara](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Keputusan untuk melakukan fork mencapai lebih dari 85% suara.

Beberapa penambang menolak melakukan garpu karena insiden DAO bukan merupakan kesalahan dalam protokol. Mereka kemudian membentuk [Ethereum Classic](https://ethereumclassic.org/).

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Rangkuman {#homestead-summary}

Garpu Homestead yang melihat ke masa depan. Ini termasuk beberapa perubahan protokol dan perubahan jaringan yang memberi Ethereum kemampuan untuk melakukan peningkatan jaringan lebih lanjut.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP Homestead" contentPreview="Peningkatan resmi dalam fork ini.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>melakukan pengeditan pada proses pembuatan kontrak.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>menambahkan opcode baru: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>memperkenalkan persyaratan kompatibilitas ke depan devp2p</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2015 {#2015}

### Pencairan Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Rangkuman {#frontier-thawing-summary}

Fork pencairan frontier mencabut batas 5.000 [gas](/glossary/#gas) per [blok](/glossary/#block) dan menetapkan harga gas default menjadi 51 [gwei](/glossary/#gwei). Ini memungkinkan transaksi–transaksi membutuhkan 21.000 gas. [Bom kesulitan](/glossary/#difficulty-bomb) diperkenalkan untuk memastikan hard fork di masa depan ke [bukti taruhan](/glossary/#pos).

- [Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Baca Pembaruan Protokol Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Rangkuman {#frontier-summary}

Garis depan adalah implementasi langsung, tetapi barebone dari proyek Ethereum. Ini mengikuti fase pengujian Olimpiade yang sukses. Ditujukan untuk pengguna teknis, khususnya pengembang. [Blok](/glossary/#block) memiliki batas [gas](/glossary/#gas) 5.000. Periode 'pencairan' ini memungkinkan penambang untuk memulai operasi mereka dan bagi pengguna awal untuk menginstal klien mereka tanpa harus 'terburu-buru'.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Penjualan Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether secara resmi mulai dijual selama 42 hari. Anda dapat membelinya dengan BTC.

[Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Yellowpaper dirilis {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Yellow Paper, yang ditulis oleh Dr. Gavin Wood, adalah definisi teknis dari protokol Ethereum.

[Lihat Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Whitepaper dirilis {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Makalah pengantar, diterbitkan pada tahun 2013 oleh Vitalik Buterin, pendiri Ethereum, sebelum peluncuran proyek pada tahun 2015.

<DocLink href="/whitepaper/">
  Kertas Putih
</DocLink>
