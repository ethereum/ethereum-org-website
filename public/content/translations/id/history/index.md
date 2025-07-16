---
title: Riwayat dan Fork Ethereum
description: Riwayat blockchain Ethereum termasuk tonggak sejarah, rilis, dan fork utama.
lang: id
sidebarDepth: 1
---

# Riwayat Ethereum {#the-history-of-ethereum}

Linimasa semua tonggak sejarah, fork, dan pembaruan utama dalam blockchain Ethereum.

<ExpandableCard title="Apa itu fork?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Garpu terjadi ketika ada perubahan atau peningkatan teknis yang signifikan yang perlu dilakukan pada jaringan - biasanya berasal dari <a href="/eips/">Proposal Peningkatan Ethereum (EIP)</a> dan mengubah "aturan" protokol.

Ketika peningkatan diperlukan dalam perangkat lunak tradisonal yang dikontrol secara terpusat, perusahaan hanya akan menerbitkan versi terbarunya bagi pengguna akhir. Blockchain bekerja dengan cara yang berbeda karena tidak ada kepemilikan terpusat. <a href="/developers/docs/nodes-and-clients/">Klien Ethereum</a> harus memperbarui perangkat lunak mereka untuk mengimplementasikan aturan fork yang baru. Pembuat blok plus (penambang di dunia bukti kerja, validator di dunia bukti taruhan) dan node harus membuat blok dan memvalidasi aturan baru. <a href="/developers/docs/consensus-mechanisms/">Lebih lanjut tentang mekanisme konsensus</a>

Aturan-aturan ini dapat mengubah pemisahan sementara di jarinagn ini. Blok baru dapat dibuat berdasarkan peraturan baru atau lama. Fork biasanya disepakati sebelumnya sehingga klien mengadopsi perubahan secara bersamaan dan fork dengan peningkatan menjadi rantai utama. Namun, dalam kasus yang jarang terjadi, perselisihan mengenai garpu dapat menyebabkan jaringan terbagi secara permanen - yang paling terkenal adalah terciptanya Ethereum Classic dengan <a href="#dao-fork">fork DAO</a>.

</ExpandableCard>

Langsung menuju informasi tentang beberapa peningkatan penting di masa lalu: [Rantai Suar](/roadmap/beacon-chain/); [Penggabungan](/roadmap/merge/); dan [EIP-1559](#london)

Sedang mencari peningkatan protokol di masa mendatang? [Pelajari tentang upgrade mendatang pada peta perjalanan Ethereum](/roadmap/).

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Ringkasan Shanghai {#shanghai-summary}

Peningkatan Shanghai membawa penarikan penaruhan ke Lapisan Eksekusi. Bersamaan dengan peningkatan Capella, ini memungkinkan blok menerima operasi penarikan, yang memungkinkan para staker menarik ETH mereka dari Rantai Suar ke lapisan eksekusi.

<ExpandableCard title="EIP Shanghai" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Memulai alamat <code>COINBASE</code> menjadi hangat</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Instruksi <code>PUSH0</code> baru</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Batasi dan ukur kode awal</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Penarikan dorong rantai suar sebagai operasi</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Hentikan <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Baca spesifikasi meningkatkan Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Ringkasan Capella {#capella-summary}

Peningkatan Capella adalah peningkatan utama ketiga pada lapisan konsensus (Rantai Suar) dan memungkinkan penarikan penaruhan. Capella terjadi secara bersamaan dengan upgrade lapisan eksekusi, Shanghai, dan mengaktifkan fungsionalitas penarikan penaruhan.

Peningkatan lapisan konsensus ini membawa kemampuan bagi staker yang tidak menyediakan kredensial penarikan bersama setoran awal mereka untuk melakukannya, dengan demikian memungkinkan penarikan.

Peningkatan ini juga menyediakan fungsionalitas pemindaian akun otomatis, yang terus-menerus memproses akun validator untuk pembayaran imbalan yang tersedia atau penarikan penuh.

- [Lebih lanjut tentang penarikan penaruhan](/staking/withdrawals/).
- [Baca spesifikasi peningkatan Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (Penggabungan) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Ringkasan {#paris-summary}

Peningkatan Paris dipicu oleh rantai blok bukti kerja mencapai [total tingkat kesulitan terminal](/glossary/#terminal-total-difficulty) sebesar 58750000000000000000000. Hal ini terjadi pada blok 15537393 pada tanggal 15 September 2022, memicu peningkatan Paris pada blok berikutnya. Paris merupakan transisi [Penggabungan](/roadmap/merge/) fitur utamanya adalah mematikan algoritma penambangan [bukti kerja](/developers/docs/consensus-mechanisms/pow) dan logika konsensus terkait, serta sebagai gantinya mengaktifkan [bukti taruhan](/developers/docs/consensus-mechanisms/pos). Paris sendiri merupakan peningkatan untuk [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) (setara dengan Bellatrix pada lapisan konsensus) yang memungkinkan mereka menerima instruksi dari [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients) yang terhubung. Untuk ini, diperlukan seperangkat metode API internal baru, yang secara kolektif dikenal sebagai [API Mesin](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), untuk diaktifkan. Ini dapat dikatakan sebagai peningkatan paling signifikan dalam sejarah Ethereum sejak [Homestead](#homestead)!

- [Baca spesifikasi peningkatan Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP Paris" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Meningkatkan konsensus ke Bukti Taruhan</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Ganti opcode KESULITAN dengan PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Ringkasan {#bellatrix-summary}

Peningkatan Bellatrix adalah peningkatan terjadwal kedua untuk [Rantai Suar](/roadmap/beacon-chain), mempersiapkan jaringan untuk [Penggabungan](/roadmap/merge/). Peningkatan ini membawa denda validator ke nilai penuh untuk ketidakaktifan dan pelanggaran yang dapat dipotong. Bellatrix juga mencakup pembaruan pada aturan pemilihan garpu untuk mempersiapkan jaringan untuk Penggabungan dan transisi dari blok bukti kerja terakhir ke blok bukti taruhan pertama. Hal ini mencakup membuat klien konsensus menyadari [total kesulitan terminal](/glossary/#terminal-total-difficulty) sebesar 58750000000000000000000.

- [Baca spesifikasi peningkatan Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Ringkasan {#gray-glacier-summary}

Peningkatan jaringan Gray Glacier menunda [bomb kesulitan](/glossary/#difficulty-bomb) selama tiga bulan. Ini adalah satu-satunya perubahan yang dibolehkan dalam pembaruan ini, dan sifatnya serupa dengan pembaruan [Arrow Glacier](#arrow-glacier) dan [Muir Glacier](#muir-glacier). Perubahan serupa telah diterapkan pada peningkatan jaringan [Byzantium](#byzantium), [Konstatinopel](#constantinople) dan [London](#london).

- [EF Blog - Pengumuman Pembaruan Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="EIP Gray Glacier" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>menunda bom kesulitan hingga September 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Ringkasan {#arrow-glacier-summary}

Peningkatan jaringan Arrow Glacier menjeda [bom kesulitan](/glossary/#difficulty-bomb) sebanyak beberapa bulan. Ini adalah satu-satunya perubahan yang diperkenalkan dalam peningkatan ini, dan sifatnya sama dengan peningkatan [Muir Glacier](#muir-glacier). Perubahan serupa telah diterapkan pada peningkatan jaringan [Byzantium](#byzantium), [Konstatinopel](#constantinople) dan [London](#london).

- [Blog EF - Pengumuman Peningkatan Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Peningkatan Arrow Glacier Ethereum](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP Arrow Glacier" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>menunda bom kesulitan hingga Juni 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Ringkasan {#altair-summary}

Peningkatan Altair adalah peningkatan pertama yang terjadwal untuk [Rantai Suar](/roadmap/beacon-chain). Ini memberi tambahan dukungan untuk "komite sinkronisasi" — memungkinkan klien ringan, dan meningkatkan ketidakaktifan validator dan memotong hukuman saat pengembangan berkembang menuju Penggabungan.

- [Baca spesifikasi peningkatan Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Fakta menyenangkan! {#altair-fun-fact}

Altair adalah peningkatan besar dan pertama untuk jaringan yang memiliki waktu rollout yang pasti. Setiap peningkatan sebelumnya telah berdasarkan pada suatu nomor blok yang dideklarasikan pada rantai bukti kerja, dengan waktu blok yang bervariasi. Rantai Suar tidak mengharuskan penyelesaian bukti kerja, dan sebagai gantinya berfungsi pada sistem jangka waktu berbasis waktu yang terdiri dari 32 "slot" waktu dua belas detik di mana para validator dapat mengusulkan blok. Inilah alasan kami mengetahui secara pasti kapan kami akan mencapai jangka waktu 74.240 dan Altair mulai beroperasi!

- [Waktu blok](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Ringkasan {#london-summary}

Peningkatan London memperkenalkan [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), yang memperbarui pasar biaya transaksi, bersamaan dengan perubahan bagaimana pembayaran kembali gas ditangani dan jadwal untuk [Zaman Es](/glossary/#ice-age).

- [Apakah Anda seorang pengembang dapp? Pastikan untuk meningkatkan pustaka dan peralatan Anda.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Baca pengumuman Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Baca penjelasan Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP London" contentPreview="Official improvements included in this upgrade.">

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

#### Ringkasan {#berlin-summary}

Peningkatan Berlin mengoptimalkan harga gas untuk beberapa aksi EVM, dan meningkatkan dukungan pada beragam jenis transaksi.

- [Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Baca penjelasan Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP Berlin" contentPreview="Official improvements included in this upgrade.">

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

#### Ringkasan {#beacon-chain-genesis-summary}

[Rantai Suar](/roadmap/beacon-chain/) memerlukan deposito 16384 dari 32 ETH yang ditaruhkan untuk diluncurkan secara aman. Ini terjadi pada 27 November yang berarti Rantai Suar mulai memproduksi blok pada 1 Desember 2020. Ini adalah langkah pertama yang penting untuk meraih [visi Ethereum](/roadmap/vision/).

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  Rantai Suar
</DocLink>

---

### Kontrak setoran penaruhan dibuat {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Ringkasan {#deposit-contract-summary}

Kontrak setoran penaruhan memperkenalkan [penaruhan](/glossary/#staking) ke ekosistem Ethereum. Bahkan kontrak [Jaringan Utama](/glossary/#mainnet) memiliki dampak langsung pada linimasa peluncuran [Rantai Suar](/roadmap/beacon-chain/), yaitu [peningkatan Ethereum](/roadmap/) yang penting.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Penaruhan
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Ringkasan {#muir-glacier-summary}

Fork Gletser Muir memperkenalkan penundaan pada [bom kesulitan](/glossary/#difficulty-bomb). Peningkatan kesulitan blok mekanisme konsensus [bukti kerja](/developers/docs/consensus-mechanisms/pow/) mengancam akan menurunkan kegunaan Ethereum dengan meningkatkan waktu tunggu untuk mengirim transaksi dan menggunakan dapps.

- [Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Baca penjelasan Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP Muir Glacier" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>menunda bom kesulitan selama 4.000.000 blok lagi, atau sekitar ~611 hari.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Ringkasan {#istanbul-summary}

Garpu Istanbul:

- Mengoptimalkan biaya [gas](/glossary/#gas) dari aksi tertentu di [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Meningkatkan ketahanan terhadap serangan penolakan layanan.
- Membuat solusi [penskalaan Lapisan ke-2](/developers/docs/scaling/#layer-2-scaling) berdasarkan SNARK dan STARK berkinerja lebih baik.
- Memungkinkan Ethereum dan Zcash untuk saling bekerja sama.
- Kontrak yang diizinkan untuk memperkenalkan lebih banyak fungsi kreatif.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP Istanbul" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>memungkinkan Ethereum bekerja dengan mata uang yang menjaga privasi seperti Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>kriptografi yang lebih murah untuk meningkatkan kinerja biaya <a href="/glossary/#gas">gas</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>melindungi Ethereum dari serangan ulang dengan menambahkan <code>CHAINID</code> <a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine">opcode</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>mengoptimalkan harga gas opcode berdasarkan konsumsi.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>mengurangi biaya CallData untuk memungkinkan lebih banyak data dalam blok – baik untuk <a href="/developers/docs/scaling/#layer-2-scaling">Penskalaan Lapisan ke-2</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>penyesuaian harga gas opcode lainnya.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Ringkasan {#constantinople-summary}

Fork Konstantinopel:

- Memastikan rantai blok tidak membeku sebelum [bukti taruhan diimplementasikan](#beacon-chain-genesis).
- Mengoptimalkan biaya [gas](/glossary/#gas) dari aksi tertentu di [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Menambahkan kemampuan untuk berinteraksi dengan alamat yang belum dibuat.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIP Konstantinopel" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>mengoptimalkan biaya tindakan di dalam rantai tertentu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>memungkinkan Anda berinteraksi dengan alamat yang belum dibuat.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>mengoptimalkan biaya tindakan di dalam rantai tertentu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>memastikan rantai blok tidak membeku sebelum bukti taruhan.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Ringkasan {#byzantium-summary}

Fork Byzantium:

- Pengurangan imbalan [penambangan](/developers/docs/consensus-mechanisms/pow/mining/) blok dari 5 menjadi 3 ETH.
- Menunda [bom tingkat kesulitan](/glossary/#difficulty-bomb) selama satu tahun.
- Menambahkan kemampuan untuk melakukan panggilan yang tidak mengubah state ke kontrak lain.
- Menambahkan metode kriptografi tertentu untuk memungkinkan [penskalaan lapisan ke-2](/developers/docs/scaling/#layer-2-scaling).

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP Byzantium" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>menambahkan opcode <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>Bidang status ditambahkan ke tanda terima transaksi untuk menunjukkan keberhasilan atau kegagalan.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>menambahkan kurva elips dan perkalian skalar untuk memungkinkan <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>menambahkan kurva elips dan perkalian skalar untuk memungkinkan <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>memungkinkan verifikasi tanda tangan RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>menambahkan dukungan untuk nilai pengembalian panjang variabel.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>menambahkan <code>STATICCALL</code> opcode, mengizinkan panggilan yang tidak mengubah status ke kontrak lain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>mengubah formula penyesuaian tingkat kesulitan.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>penundaan <a href="/glossary/#difficulty-bomb">bom tingkat kesulitan</a> selama 1 tahun dan mengurangi hadiah blok dari 5 menjadi 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Ringkasan {#spurious-dragon-summary}

Garpu Spurious Dragon adalah respons kedua terhadap serangan penolakan layanan (DoS) di jaringan (September/Oktober 2016) termasuk:

- menyetel harga opcode untuk mencegah serangan di masa mendatang pada jaringan.
- memungkinkan "debloat" dari status rantai blok.
- menambahkan perlindungan terhadap serangan perulangan.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP Spurious Dragon" contentPreview="Official improvements included in this fork.">

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

#### Ringkasan {#tangerine-whistle-summary}

Garpu Tangerine Whistle adalah respons pertama terhadap serangan denial of service (DoS) di jaringan (September/Oktober 2016) yang mencakup:

- menangani masalah kesehatan jaringan yang mendesak mengenai kode operasi yang terlalu murah.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP Tangerine Whistle" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>meningkatkan biaya gas dari opcode yang dapat digunakan dalam serangan spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>mengurangi ukuran status dengan menghapus sejumlah besar akun kosong yang dimasukkan ke dalam status dengan biaya yang sangat rendah karena adanya kekurangan pada versi protokol Ethereum sebelumnya.</em></li>
</ul>

</ExpandableCard>

---

### Garpu DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Ringkasan {#dao-fork-summary}

Garpu DAO merupakan respons terhadap [serangan DAO 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/) di mana kontrak [DAO](/glossary/#dao) yang tidak aman dikuras dananya sebanyak lebih dari 3,6 juta ETH dalam peretasan saat itu. Garpu tersebut memindahkan dana dari kontrak bermasalah ke [kontrak baru](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) dengan satu fungsi tunggal: tarik. Siapa pun yang kehilangan dana dapat menarik 1 ETH untuk setiap 100 token DAO di dompet mereka.

Tindakan ini dipilih oleh komunitas Ethereum. Setiap pemegang ETH dapat memilih melalui transaksi di [platform pemilihan](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Keputusan untuk melakukan fork mencapai lebih dari 85% suara.

Beberapa penambang menolak melakukan garpu karena insiden DAO bukan merupakan kesalahan dalam protokol. Mereka kemudian membentuk [Ethereum Classic](https://ethereumclassic.org/).

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Ringkasan {#homestead-summary}

Garpu Homestead yang melihat ke masa depan. Ini termasuk beberapa perubahan protokol dan perubahan jaringan yang memberi Ethereum kemampuan untuk melakukan peningkatan jaringan lebih lanjut.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP Homestead" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>melakukan pengeditan pada proses pembuatan kontrak.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>menambahkan opcode baru: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>memperkenalkan persyaratan kompatibilitas ke depan devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Thawing frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Ringkasan {#frontier-thawing-summary}

Garpu thawing frontier mengangkat batas [gas](/glossary/#gas) 5.000 per [blok](/glossary/#block) blok dan menetapkan harga gas default menjadi 51 [gwei](/glossary/#gwei). Ini memungkinkan transaksi–transaksi membutuhkan 21.000 gas. [bom tingkat kesulitan](/glossary/#difficulty-bomb) diperkenalkan untuk memastikan garpu-tangan di masa depan untuk [bukti taruhan](/glossary/#pos).

- [Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Baca Pembaruan Protokol Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Garis depan {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Ringkasan {#frontier-summary}

Frontier adalah implementasi langsung, tetapi barebone dari proyek Ethereum. Ini mengikuti fase pengujian Olimpiade yang sukses. Ditujukan untuk pengguna teknis, khususnya pengembang. [Blok](/glossary/#block) memiliki batas [gas](/glossary/#gas) sebesar 5.000. Periode 'pencairan' ini memungkinkan penambang untuk memulai operasi mereka dan bagi pengguna awal untuk menginstal klien mereka tanpa harus 'terburu-buru'.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Penjualan Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether secara resmi mulai dijual selama 42 hari. Anda dapat membelinya dengan BTC.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Yellowpaper dirilis {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Yellow Paper, yang ditulis oleh Dr. Gavin Wood, adalah definisi teknis dari protokol Ethereum.

[Lihat Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Kertas putih dirilis {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Makalah pengantar, diterbitkan pada tahun 2013 oleh Vitalik Buterin, pendiri Ethereum, sebelum peluncuran proyek pada tahun 2015.

<DocLink href="/whitepaper/">
  Laporan Resmi
</DocLink>
