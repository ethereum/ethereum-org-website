---
title: Riwayat dan Fork Ethereum
description: Riwayat blockchain Ethereum termasuk tonggak sejarah, rilis, dan fork utama.
lang: id
sidebarDepth: 1
---

# Riwayat Ethereum {#the-history-of-ethereum}

Linimasa semua tonggak sejarah, fork, dan pembaruan utama dalam blockchain Ethereum.

<ExpandableCard title="Apa itu fork?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Fork adalah ketika peningkatan atau perubahan teknis utama perlu dilakukan pada jaringan – biasanya berasal dari [Proposal Peningkatan Ethereum (EIP)](/eips/) dan mengubah "aturan" protokol.

Ketika peningkatan diperlukan dalam perangkat lunak tradisonal yang dikontrol secara terpusat, perusahaan hanya akan menerbitkan versi terbarunya bagi pengguna akhir. Blockchain bekerja dengan cara yang berbeda karena tidak ada kepemilikan terpusat. [Klien Ethereum](/developers/docs/nodes-and-clients/) harus memperbarui perangkat lunak mereka untuk menerapkan aturan fork baru. Pembuat blok plus (penambang di dunia bukti kerja, validator di dunia bukti taruhan) dan node harus membuat blok dan memvalidasi aturan baru. [Lebih lanjut tentang mekanisme konsensus](/developers/docs/consenus-mechanisms/)

Perubahan-perubahan aturan ini dapat membuat pemisahan sementara di jaringan. Blok baru dapat dibuat berdasarkan peraturan baru atau lama. Fork biasanya disepakati sebelumnya sehingga klien mengadopsi perubahan secara bersamaan dan fork dengan peningkatan menjadi rantai utama. Namun dalam kasus yang jarang terjadi, ketidaksepakatan mengenai fork dapat menyebabkan jaringan terpecah secara permanen – terutama dalam pembuatan Ethereum Classic dengan [DAO fork](#dao-fork).

</ExpandableCard>

Sedang mencari peningkatan protokol di masa mendatang? [Pelajari tentang peningkatan Ethereum berikutnya](/upgrades/).

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>09-Des-2021 07:55:23 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Nomor blok: <a href="https://etherscan.io/block/13773000">13.773.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Harga ETH: $4111 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211207064430/https://ethereum.org/en/">ethereum.org di waybackmachine</a>

#### Ringkasan {#arrow-glacier-summary}

Peningkatan jaringan Arrow Glacier menjeda [bom kesulitan](/glossary/#difficulty-bomb) sebanyak beberapa bulan. Ini adalah satu-satunya perubahan yang diperkenalkan dalam peningkatan ini, dan sifatnya sama dengan peningkatan [Muir Glacier](#muir-glacier). Perubahan serupa telah diterapkan pada peningkatan jaringan [Byzantium](#byzantium), [Konstatinopel](#constantinople) dan [London](#london).

- [Blog EF - Pengumuman Peningkatan Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Peningkatan Arrow Glacier Ethereum](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIPs Arrow Glacier" contentPreview="Official improvements included in this upgrade.">

- [EIP-4345](https://eips.ethereum.org/EIPS/eip-4345) – _menunda bom kesulitan hingga Juni 2022_

</ExpandableCard>

#### <Emoji text=":police_car_light:" size={1} mr="0.5rem" />Operator node {#arrow-glacier-node-operators}

Pastikan untuk meningkatkan perangkat lunak klien Anda ke versi terbarunya sebelum 5 Desember 2021 guna mengetahui frekuensi blok variabel. Sehingga klien Anda tidak perlu menyinkronkan ke suatu rantai sebelum fork, yang menyebabkan kegagalan untuk mengirim dana atau dengan benar memverifikasi transaksi.

---

### Altair {#altair}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>27-Okt-2021 10:56:23 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Nomor epoch: 74.240<br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Harga ETH: $4024 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211026174951/https://ethereum.org/en/">ethereum.org di waybackmachine</a>

#### Ringkasan {#altair-summary}

Peningkatan Altair adalah peningkatan pertama yang terjadwal untuk [Rantai Suar](/upgrades/beacon-chain). Peningkatan ini akan menambah dukungan pada "komite sinkronisasi", yang dapat mengaktifkan klien ringan, dan memberikan validator penalti ketidakaktifan dan pemotongan sampai nilai maksimumnya.

- [Baca spesifikasi peningkatan Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} mr="0.5rem" />Fakta menyenangkan! {#altair-fun-fact}

Altair adalah peningkatan besar dan pertama untuk jaringan yang memiliki waktu rollout yang pasti. Setiap peningkatan sebelumnya telah berdasarkan pada suatu nomor blok yang dideklarasikan pada rantai bukti kerja, dengan waktu blok yang bervariasi. Rantai Suar tidak mengharuskan penyelesaian bukti kerja, dan sebagai gantinya berfungsi pada sistem epoch berbasis waktu yang terdiri dari 32 "slot" waktu dua belas detik di mana para validator dapat mengusulkan blok. Inilah alasan kami mengetahui secara pasti kapan kami akan mencapai epoch 74.240 dan Altair mulai beroperasi!

- [Beaconcha.in Glossary - Slot](https://kb.beaconcha.in/glossary#slots)

---

### London {#london}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>05-Agu-2021 12:33:42 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/12965000">12.965.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $2621 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210805124609/https://ethereum.org/en/">ethereum.org di waybackmachine</a>

#### Ringkasan {#london-summary}

Peningkatan London memperkenalkan [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), yang memperbarui pasar biaya transaksi, bersamaan dengan perubahan bagaimana pembayaran kembali gas ditangani dan jadwal untuk [Zaman Es](/glossary/#ice-age).

- [Apakah Anda pengembang dApp? Pastikan untuk meningkatkan pustaka dan peralatan Anda.](https://github.com/ethereum/eth1.0-specs/blob/master/network-upgrades/ecosystem-readiness.md)
- [Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Baca penjelasan Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIPs London" contentPreview="Official improvements included in this upgrade.">

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) – _meningkatkan pasar biaya transaksi_
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198) – _mengembalikan `BASEFEE` dari sebuah blok_
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) - _mengurangi pengembalian dana gas untuk operasi EVM_
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) - _mencegah penggunaan kontrak yang dimulai dengan `0xEF`_
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) – _menunda Zaman Es sampai Desember 2021_

</ExpandableCard>

---

### Berlin {#berlin}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>15-Apr-2021 10:07:03 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/12244000">12.244.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $2454 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210415093618/https://ethereum.org/">ethereum.org di waybackmachine</a>

#### Ringkasan {#berlin-summary}

Peningkatan Berlin mengoptimalkan harga gas untuk beberapa aksi EVM, dan meningkatkan dukungan pada beragam jenis transaksi.

- [Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Baca penjelasan Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIPs Berlin" contentPreview="Official improvements included in this upgrade.">

- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565) – _menurunkan biaya gas ModExp_
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) – _memungkinkan dukungan yang lebih mudah untuk tipe transaksi beragam_
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) – _peningkatan biaya gas untuk opcode akses state_
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) – _menambahkan daftar akses opsional_

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Genesis Rantai Suar {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>01-Des-2020 12.00.35 +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok Rantai Suar: <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $586,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org di waybackmachine</a>

#### Ringkasan {#beacon-chain-genesis-summary}

[Rantai Suar](/upgrades/beacon-chain/) memerlukan deposito 16384 dari 32 ETH yang ditaruhkan untuk diluncurkan secara aman. Ini terjadi pada 27 November yang berarti Rantai Suar mulai memproduksi blok pada 1 Desember 2020. Ini adalah langkah pertama yang penting untuk meraih [visi Ethereum](/upgrades/vision/).

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/upgrades/beacon-chain/">
  Rantai Suar
</DocLink>

---

### Kontrak setoran penaruhan dibuat {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14-Okt-2020 09:22:52 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/11052984">11.052.984</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $379,04 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org di waybackmachine</a>

#### Ringkasan {#deposit-contract-summary}

Kontrak setoran penaruhan memperkenalkan [penaruhan](/glossary/#staking) ke ekosistem Ethereum. Bahkan kontrak [Jaringan Utama](/glossary/#mainnet) memiliki dampak langsung pada linimasa peluncuran [Rantai Suar](/upgrades/beacon-chain/), yaitu [peningkatan Ethereum](/upgrades/) yang penting.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  Penaruhan
</DocLink>

---

### Muir Glacier {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>02-Jan-2020 08:30:49 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/9200000">9.200.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $127,18 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org di waybackmachine</a>

#### Ringkasan {#muir-glacier-summary}

Fork Gletser Muir memperkenalkan penundaan pada [bom kesulitan](/glossary/#difficulty-bomb). Peningkatan kesulitan blok mekanisme konsensus [bukti kerja](/developers/docs/consensus-mechanisms/pow/) mengancam akan menurunkan kegunaan Ethereum dengan meningkatkan waktu tunggu untuk mengirim transaksi dan menggunakan dapps.

- [Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Baca penjelasan Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP Muir Glacier" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) – _menunda bom kesulitan untuk 4.000.000 blok lagi, atau ~611 hari._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>08-Des-2019 12:25:09 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/9069000">9.069.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $151,06 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org di waybackmachine</a>

#### Ringkasan {#istanbul-summary}

Istanbul fork:

- Mengoptimalkan biaya [gas](/glossary/#gas) dari tindakan tertentu di [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Meningkatkan ketahanan terhadap serangan penolakan layanan.
- Membuat solusi [penskalaan Lapisan 2](/developers/docs/scaling/#layer-2-scaling) berdasarkan SNARK dan STARK berkinerja lebih baik.
- Mengaktifkan Ethereum dan Zcash untuk saling beroperasi.
- Kontrak yang diizinkan untuk memperkenalkan lebih banyak fungsi kreatif.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _izinkan Ethereum bekerja dengan mata uang yang menjaga privasi seperti Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _kriptografi lebih murah untuk meningkatkan biaya [gas](/glossary/#gas)._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _melindungi Ethereum dari serangan ulang dengan menambahkan `CHAINID` [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _mengoptimalkan harga gas opcode berdasarkan konsumsi._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _mengurangi biaya CallData untuk memungkinkan lebih banyak data dalam blok – bagus untuk [Penskalaan lapisan 2](/developers/docs/scaling/#layer-2-scaling)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _alterasi harga gas opcode lainnya._

</ExpandableCard>

---

### Konstantinopel {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>28-Feb-2019 07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/7280000">7.280.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $136,29 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org di waybackmachine</a>

#### Ringkasan {#constantinople-summary}

Fork Konstantinopel:

- Memastikan blockchain tidak membeku sebelum [bukti taruhan diimplementasikan](#beacon-chain-genesis).
- Mengoptimalkan biaya [gas](/glossary/#gas) dari tindakan tertentu di [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Menambahkan kemampuan untuk berinteraksi dengan alamat yang belum dibuat.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIPs Konstantinopel" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _mengoptimalkan biaya tindakan on-chain tertentu._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _memungkinkan Anda berinteraksi dengan alamat yang belum dibuat._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _mengoptimalkan biaya tindakan on-chain tertentu._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _memastikan blockchain tidak membeku sebelum bukti taruhan._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>16-Okt-2017 05:22:11 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/4370000">4.370.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $334,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org di waybackmachine</a>

#### Ringkasan {#byzantium-summary}

Fork Byzantium:

- Pengurangan imbalan [penambangan](/developers/docs/consensus-mechanisms/pow/mining/) blok dari 5 menjadi 3 ETH.
- Menunda [bom kesulitan](/glossary/#difficulty-bomb) selama satu tahun.
- Menambahkan kemampuan untuk melakukan panggilan yang tidak mengubah status ke kontrak lain.
- Menambahkan metode kriptografi tertentu untuk memungkinkan [penskalaan lapisan ke-2](/developers/docs/scaling/#layer-2-scaling).

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _menambahkan opcode `REVERT`._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _kolom status ditambahkan ke resi transaksi untuk mengindikasikan keberhasilan atau kegagalan transaksi tersebut._
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _menambahkan kurva eliptik dan perkalian skalar untuk memungkinkan [ZK-Snarks](/developers/docs/scaling/zk-rollups/)._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _menambahkan kurva eliptik dan perkalian skalar untuk memungkinkan [ZK-Snarks](/developers/docs/scaling/zk-rollups/)._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _mengaktifkan verifikasi tanda tangan RSA._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _menambahkan dukungan untuk nilai pengembalian panjang variabel._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _menambahkan opcode `STATICCALL`, memungkinkan panggilan yang tidak mengubah status ke kontrak lainnya._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _mengubah formula penyesuaian tingkat kesulitan._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _menunda [bom kesulitan](/glossary/#difficulty-bomb) hingga 1 tahun dan mengurangi imbalan blok dari 5 ETH menjadi 3 ETH._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>22-Nov-2016 04:15:44 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/2675000">2.675.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $9,84 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org di waybackmachine</a>

#### Ringkasan {#spurious-dragon-summary}

Spurious Dragon fork adalah respons kedua terhadap serangan penolakan layanan (DoS) di jaringan (September/Oktober 2016) termasuk:

- menyetel harga opcode untuk mencegah serangan di masa mendatang pada jaringan.
- mengaktifkan "debloat" dari status blockchain.
- menambahkan perlindungan serangan replay.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _mencegah transaksi dari satu rantai Ethereum untuk kembali disiarkan pada rantai alternatif, sebagai contoh transaksi testnet dijalankan kembali di rantai Ethereum utama._
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _menyesuaikan harga opcode `EXP` – membuat lebih sulit untuk memperlambat jaringan lewat operasi kontrak yang mahal secara komputasional._
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _memungkinkan penghapusan akun kosong yang ditambahkan lewat serangan DOS._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _mengubah ukuran kode maksimum yang bisa dimiliki oleh sebuah kontrak di blokchain – ke 24576 bita._

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>18-Okt-2016 01:19:31 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/2463000">2.463.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org di waybackmachine</a>

#### Ringkasan {#tangerine-whistle-summary}

Tangerine Whistle fork adalah respons pertama terhadap serangan penolakan layanan (DoS) di jaringan (September/Oktober 2016) termasuk:

- menangani masalah kesehatan jaringan yang mendesak mengenai kode operasi yang terlalu murah.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _meningkatkan biaya gas opcode yang dapat digunakan dalam serangan spam._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _mengurangi ukuran status dengan menghapus sejumlah besar akun kosong yang dimasukkan ke status dengan biaya yang sangat rendah karena kekurangan pada versi sebelumnya dari protokol Ethereum._

</ExpandableCard>

---

### Fork DAO {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>20-Jul-2016 01:20:40 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/1920000">1.920.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $12,54 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org di waybackmachine</a>

#### Ringkasan {#dao-fork-summary}

Fork DAO merupakan respons terhadap [serangan DAO 2016](https://www.coindesk.com/markets/2016/06/25/understanding-the-dao-attack/) di mana kontrak [DAO](/glossary/#dao) yang tidak aman dikuras dananya sebanyak lebih dari 3,6 juta ETH dalam peretasan saat itu. Fork tersebut memindahkan dana dari kontrak bermasalah ke [kontrak baru](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) dengan satu fungsi tunggal: tarik. Siapa pun yang kehilangan dana dapat menarik 1 ETH untuk setiap 100 token DAO di dompet mereka.

Tindakan ini dipilih oleh komunitas Ethereum. Setiap pemegang ETH dapat memilih melalui transaksi di [platform pemilihan](http://v1.carbonvote.com/). Keputusan untuk melakukan fork mencapai lebih dari 85% suara.

Beberapa penambang menolak untuk melakukan fork karena insiden DAO bukan merupakan kesalahan dalam protokol. Mereka kemudian membentuk [Ethereum Classic](https://ethereumclassic.org/).

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14-Mar-2016 06:49:53 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/1150000">1.150.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org di waybackmachine</a>

#### Ringkasan {#homestead-summary}

Fork Homestead yang melihat ke masa depan. Ini termasuk beberapa perubahan protokol dan perubahan jaringan yang memberi Ethereum kemampuan untuk melakukan peningkatan jaringan lebih lanjut.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _membuat pengeditan ke proses pembuatan kontrak._
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _menambahkan opcode baru: `DELEGATECALL`_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _memperkenalkan persyaratan kompatibilitas maju devp2p_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Thawing garis depan {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>07-Sep-2015 09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/200000">200.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: $1,24 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org di waybackmachine</a>

#### Ringkasan {#frontier-thawing-summary}

Fork thawing garis depan mengangkat batas [gas](/glossary/#gas) 5.000 per [blok](/glossary/#block) blok dan menetapkan harga gas default menjadi 51 [gwei](/glossary/#gwei). Ini memungkinkan transaksi–transaksi membutuhkan 21.000 gas.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Garis depan {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-30-2015 03:26:13 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nomor blok: <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Harga ETH: N/A<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org di waybackmachine</a>

#### Ringkasan {#frontier-summary}

Garis depan adalah implementasi langsung, tetapi barebone dari proyek Ethereum. Ini mengikuti fase pengujian Olimpiade yang sukses. Ditujukan untuk pengguna teknis, khususnya pengembang. [Blok](/glossary/#block) memiliki batas [gas](/glossary/#gas) sebesar 5.000. Periode 'pencairan' ini memungkinkan penambang untuk memulai operasi mereka dan bagi pengguna awal untuk menginstal klien mereka tanpa harus 'terburu-buru'.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Jual Ether {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> July 22 - September 02, 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">ethereum.org di waybackmachine</a>

Ether secara resmi mulai dijual selama 42 hari. Anda dapat membeli dengan BTC.

[Baca pengumuman Yayasan Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Yellowpaper dirilis {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> April 01, 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org di waybackmachine</a>

Yellow Paper, yang ditulis oleh Dr. Gavin Wood, adalah definisi teknis dari protokol Ethereum.

[Lihat Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Laporan resmi dirilis {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> November 27, 2013<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org di waybackmachine</a>

Makalah pengantar, diterbitkan pada tahun 2013 oleh Vitalik Buterin, pendiri Ethereum, sebelum peluncuran proyek pada tahun 2015.

<DocLink to="/whitepaper/">
  Laporan Resmi
</DocLink>
