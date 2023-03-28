---
title: Rantai shard
description: Pelajari tentang rantai shard - partisi jaringan yang memberi Ethereum lebih banyak kapasitas transaksi dan membuatnya lebih mudah dijalankan.
lang: id
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Sharding adalah peningkatan multi-fase untuk meningkatkan skalabilitas dan kapasitas Ethereum.
summaryPoint2: Rantai shard menyediakan lapisan penyimpanan tambahan, yang lebih murah untuk aplikasi dan rollup dalam menyimpan data.
summaryPoint3: Rantai ini memungkinkan solusi lapisan 2 menawarkan biaya transaksi rendah sekaligus memanfaatkan keamanan Ethereum.
summaryPoint4: Peningkatan ini direncanakan setelah penggabungan Jaringan Utama dengan Rantai Suar.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Rantai shard seharusnya diluncurkan suatu hari pada 2023, bergantung pada seberapa cepat kemajuan pengerjaannya setelah <a href="/upgrades/merge/">penggabungan</a>. Shard tersebut dapat memberikan Ethereum kapasitas yang lebih besar untuk menyimpan dan mengakses data, tetapi mereka tidak akan digunakan untuk menjalankan kode.
</UpgradeStatus>

## Apa itu sharding? {#what-is-sharding}

Sharding adalah proses untuk membagi sebuah basis data secara horizontal untuk menyebarkan muatannya – ini merupakan konsep umum di ilmu komputer. Dalam konteks Ethereum, sharding akan menurunkan kepadatan jaringan dan meningkatkan jumlah transaksi per detik dengan membentuk rantai baru, yang disebut sebagai “shard”.

Ini penting untuk berbagai alasan selain aspek skalabilitas.

## Fitur sharding {#features-of-sharding}

### Semua orang bisa menjalankan node {#everyone-can-run-a-node}

Sharding adalah cara yang baik untuk mengubah ukuran apabila Anda ingin tetap menjaga proses yang ada terdesentralisasi. Sebagai alternatif untuk penskalaan adalah dengan meningkatkan ukuran basis data yang sudah ada. Hal ini akan membuat Ethereum menjadi lebih sulit diakses oleh validator jaringan karena mereka membutuhkan komputer yang kuat dan mahal. Dengan rantai shard, validator hanya perlu menyimpan/menjalankan data untuk shard yang mereka validasi, bukan seluruh jaringan (seperti yang terjadi hari ini). Ini mempercepat semua proses dan secara drastis mengurangi persyaratan spesifikasi perangkat keras.

### Lebih banyak partisipasi jaringan {#more-network-participation}

Sharding pada akhirnya akan memampukan Anda menjalankan Ethereum di laptop atau ponsel pribadi. Jadi semakin banyak orang seharusnya berpartisipasi, atau menjalankan [klien](/developers/docs/nodes-and-clients/), dengan Ethereum yang memiliki shard. Ini akan meningkatkan keamanan karena semakin jaringan terdesentralisasi, semakin kecil pula daerah serangan.

Dengan persyaratan spesifikasi perangkat keras yang rendah, sharding akan mempermudah menjalankan [klien](/developers/docs/nodes-and-clients/) Anda secara mandiri tanpa harus bergantung pada jasa perantara. Dan jika memungkinkan, pertimbangkan untuk menjalankan beberapa klien. Ini bisa mendukung kesehatan jaringan dengan semakin mengurangi titik kegagalan. [Jalankan klien Rantai Suar](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Pertama - tama, Anda perlu menjalankan klien Jaringan Utama bersamaan dengan klien Rantai Suar Anda. <a href="https://launchpad.ethereum.org" target="_blank">Launchpad</a> akan membantu Anda dalam persyaratan spesifikasi perangkat keras dan prosesnya. Sebagai alternatif, Anda juga dapat menggunakan <a href="/developers/docs/apis/backend/#available-libraries">API backend</a>.
</InfoBanner>

## Rantai shard versi 1: ketersediaan data {#data-availability}

Ketika rantai shard dikirim, mereka hanya akan menyediakan data ekstra ke jaringan. Rantai shard tidak akan menangani transaksi atau kontrak pintar. Tetapi akan tetap menawarkan perbaikan yang luar biasa terhadap transaksi per detik saat dikombinasikan dengan rollup.

Rollup adalah teknologi "lapisan 2" yang sudah ada sekarang. Rollup memampukan dapp untuk memindahkan atau “menggulung” banyak transaksi menjadi satu transaksi di luar rantai, menghasilkan bukti kriptografik dan mengirimkannya ke rantai. Ini mengurangi kebutuhan data untuk satu transaksi. Dikombinasikan dengan keberadaan semua data ekstra yang disediakan oleh shard dan Anda mendapatkan 100.000 transaksi per detik.

<InfoBanner isWarning={false}>
  Mengingat kemajuan baru-baru ini pada pengembangan dan penelitian solusi penskalaan lapisan 2, ini telah mendorong prioritas peningkatan penggabungan lebih utama dari peluncuran rantai shard. Ini akan menjadi fokus pengerjaan setelah transisi jaringan utama ke sistem bukti taruhan.

[Selengkapnya tentang rollup](/developers/docs/scaling/#rollups)
</InfoBanner>

## Rantai shard versi 2: eksekusi kode {#code-execution}

Rencananya adalah selalu menambahkan fungsionalitas ekstra pada shard, untuk membuatnya lebih seperti [Jaringan Utama Ethereum](/glossary/#mainnet) saat ini. Ini akan memungkinkannya menyimpan dan mengeksekusi kode dan menangani transaksi, karena setiap shard akan berisi kumpulan kontrak pintar dan saldo akun yang unik. Komunikasi lintas shard akan memungkinkan transaksi terjadi antar shard.

Namun, mempertimbangkan peningkatan transaksi per detik yang telah diberikan oleh shard versi 1 apakah masih dibutuhkan? Ini masih diperdebatkan di komunitas dan sepertinya ada beberapa opsi.

### Apakah shard butuh eksekusi kode? {#do-shards-need-code-execution}

Vitalik Buterin, ketika berbicara dalam podcast Bankless, mempresentasikan 3 opsi potensial yang layak didiskusikan.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Eksekusi state tidak dibutuhkan {#state-execution-not-needed}

Ini berarti kita tidak memberikan shard kemampuan untuk menangani kontrak pintar dan membiarkannya sebagai depot data.

#### 2. Memerlukan beberapa shard eksekusi {#some-execution-shards}

Kedepannya, akan ada kompromi saat kita tidak membutuhkan semua shard (64 shard sedang direncanakan sekarang) untuk menjadi lebih pintar. Kita hanya dapat menambahkan fungsionalitas ini ke beberapa dan membiarkan sisanya. Dengan ini kita bisa menambah kecepatan pengiriman.

#### 3. Tunggu sampai kita bisa melakukan snark Zero Knowledge (ZK) {#wait-for-zk-snarks}

Akhirnya, mungkin kita perlu melihat kembali debat ini ketika snark ZK telah dikuatkan. Ini adalah sebuah teknologi yang dapat membantu membawa transaksi yang benar-benar privat menuju jaringan. Kemungkinan bahwa mereka akan membutuhkan shard yang lebih pintar, namun mereka masih dalam tahap penelitian dan pengembangan.

#### Sumber-sumber lainnya {#other-sources}

Berikut beberapa pemikiran yang memiliki pandangan yang sama:

- [Fase Satu dan Selesai: Eth2 sebagai mesin ketersediaan data](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Ini masih menjadi topik diskusi yang sedang berlangsung. Kami akan memperbarui halaman ini setelah kami mengetahui lebih banyak.

## Hubungan antar peningkatan {#relationship-between-upgrades}

Semua peningkatan Ethereum saling terkait. Jadi mari kita rekap bagaimana rantai shard menghubungkan peningkatan lainnya.

### Shard dan rantai suar {#shards-and-beacon-chain}

Rantai Suar berisi semua logika untuk menjaga shard tetap aman dan tersinkronisasi. Rantai Suar akan mengoordinasikan para penaruh di jaringan, menugaskan mereka pada shard yang harus mereka kerjakan. Dan ini juga akan memfasilitasi komunikasi antar shard melalui penerimaan dan penyimpanan data transaksi shard yang dapat diakses oleh shard lain. Ini akan memberikan shard sebuah gambaran singkat mengenai status Ethereum untuk menjaga semuanya tetap mutakhir.

<ButtonLink to="/upgrades/beacon-chain/">
  Rantai Suar
</ButtonLink>

### Shard dan penggabungan {#shards-and-docking}

Pada waktu shard tambahan ditambahkan, Jaringan Utama Ethereum sudah diamankan oleh Rantai Suar menggunakan sistem bukti taruhan. Ini memungkinkan Jaringan Utama yang subur untuk membangun rantai shard, yang digerakkan solusi lapisan 2 yang memperkuat skalabilitas.

Masih harus dilihat apakah jaringan utama akan hadir sebagai shard "pintar" satu-satunya yang bisa menangani eksekusi kode - tapi bagaimanapun juga, keputusan untuk memperluas shard bisa ditinjau ulang sesuai kebutuhan.

<ButtonLink to="/upgrades/merge/">
  Penggabungan
</ButtonLink>

<Divider />

### Baca lebih lanjut {#read-more}

<ShardChainsList />
