---
title: Rantaian Isyarat
description: Pelajari perihal Rantai Beacon - penambahbaikan yang memperkenalkan bukti penaruhan Ethereum.
lang: ms
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: Rantai Beacon memperkenalkan bukti penaruhan kepada ekosistem Ethereum.
summaryPoint2: Ia digabungkan dengan rantaian proof-of-work Ethereum asal pada September 2022.
summaryPoint3: Rantai Beacon memperkenalkan logik konsensus dan protokol gosip blok yang kini melindungi Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Rantai Beacon dilancarkan pada 1 Disember 2020, dan memformalkan bukti penaruhan sebagai mekanisme konsensus Ethereum dengan naik taraf The Merge pada 15 September 2022.
</UpgradeStatus>

## Apakah itu Rantai Beacon? {#what-is-the-beacon-chain}

Rantai Beacon ialah nama bagi blok rantai bukti penaruhan asal yang dilancarkan pada 2020. Ia dicipta untuk memastikan logik konsensus bukti penaruhan adalah tepat dan lestari sebelum digunakan pada Rangkaian Utama Ethereum. Oleh itu, ia berjalan selari dengan Ethereum bukti kerja asal. Rantai Beacon ialah rangkaian blok 'kosong', tetapi mematikan bukti kerja dan mengaktifkan bukti penaruhan di Ethereum memerlukan Rantai Beacon menerima data transaksi daripada klien pelaksanaan, menggabungkannya ke dalam blok, dan kemudian menyusunnya menjadi blok rantai menggunakan mekanisme konsensus berasaskan bukti penaruhan. Pada masa yang sama, klien Ethereum asal mematikan perlombongan, penyebaran blok, dan logik konsensus mereka, menyerahkan semua itu kepada Rantai Beacon. Acara ini dikenali sebagai [The Merge](/roadmap/merge/). Setelah The Merge berlaku, tiada lagi dua blok rantai. Sebaliknya, hanya wujud satu bukti penaruhan Ethereum, yang kini memerlukan dua klien berbeza bagi setiap nod. Rantai Beacon kini menjadi lapisan konsensus, satu rangkaian peer-to-peer klien konsensus yang mengendalikan gosip blok dan logik konsensus, manakala klien asal membentuk lapisan pelaksanaan, yang bertanggungjawab untuk menyebarkan dan melaksanakan transaksi, serta mengurus keadaan Ethereum. Kedua-dua lapisan boleh berkomunikasi antara satu sama lain menggunakan Engine API.

## Apakah tujuan Rantai Beacon? {#what-does-the-beacon-chain-do}

Rantai Beacon ialah nama yang diberikan kepada lejar akaun yang mengendalikan dan menyelaraskan rangkaian [staker](/staking/) Ethereum sebelum staker tersebut mula mengesahkan blok Ethereum sebenar. Walau bagaimanapun, ia tidak memproses transaksi atau mengendalikan interaksi kontrak pintar kerana itu dijalankan di lapisan perlaksanaan. Rantai Beacon bertanggungjawab terhadap perkara seperti pengendalian blok dan perakuan, menjalankan algoritma pilihan fork, serta mengurus ganjaran dan penalti. Baca lebih lanjut di [halaman seni bina nod](/developers/docs/nodes-and-clients/node-architecture/#node-comparison) kami.

## Kesan Rantai Beacon {#beacon-chain-features}

### Memperkenalkan pertaruhan {#introducing-staking}

Rantai Beacon memperkenalkan [bukti penaruhan](/developers/docs/consensus-mechanisms/pos/) kepada Ethereum. Ini memastikan Ethereum selamat dan membolehkan pengesah memperoleh lebih banyak ETH dalam proses tersebut. Dalam amalan, pertaruhan melibatkan pertaruhan ETH untuk mengaktifkan perisian pengesah. Sebagai staker, anda menjalankan perisian yang mencipta dan mengesahkan blok baharu dalam rantaian.

Pertaruhan mempunyai tujuan yang serupa dengan [perlombongan](/developers/docs/consensus-mechanisms/pow/mining/) yang pernah digunakan, tetapi berbeza dalam banyak aspek. Perlombongan memerlukan perbelanjaan pendahuluan yang besar dalam bentuk perkakasan yang berkuasa dan penggunaan tenaga, yang mengakibatkan ekonomi skala, serta menggalakkan pemusatan. Perlombongan juga tidak datang dengan sebarang keperluan untuk mengunci aset sebagai cagaran, mengehadkan keupayaan protokol untuk menghukum pihak yang berniat jahat selepas sesuatu serangan.

Peralihan kepada bukti penaruhan menjadikan Ethereum jauh lebih selamat dan terdesentralisasi berbanding dengan bukti kerja. Semakin ramai orang yang menyertai rangkaian, semakin terdesentralisasi dan selamat daripada serangan.

Dan menggunakan bukti penaruhan sebagai mekanisme konsensus ialah komponen asas untuk [Ethereum yang selamat, mesra alam dan berskala yang kita ada sekarang](/roadmap/vision/).

<InfoBanner emoji=":money_bag:">
  Jika anda berminat untuk menjadi pengesah dan membantu melindungi Ethereum, [ketahui lebih lanjut tentang pertaruhan](/pertaruhan/).
</InfoBanner>

### Penyediaan untuk penyerpihan {#setting-up-for-sharding}

Sejak Rantai Beacon digabungkan dengan Rangkaian Utama Ethereum yang asal, komuniti Ethereum mula melihat kepada penskalaan rangkaian.

Bukti penaruhan mempunyai kelebihan kerana mempunyai daftar semua pengeluar blok yang diluluskan pada bila-bila masa, setiap satu dengan ETH yang dipertaruhkan. Pendaftaran ini menyediakan asas untuk keupayaan membahagi dan menguasai, tetapi membahagikan tanggungjawab rangkaian tertentu dengan cara yang boleh dipercayai.

Tanggungjawab ini adalah berbeza dengan bukti kerja, iaitu pelombong tidak mempunyai kewajipan kepada rangkaian dan boleh berhenti melombong serta mematikan perisian nod mereka secara kekal dalam sekelip mata tanpa sebarang akibat. Terdapat juga tiada pendaftaran pengusul blok yang diketahui dan tiada cara yang boleh dipercayai untuk membahagikan tanggungjawab rangkaian dengan selamat.

[Lebih lanjut tentang penyerpihan](/roadmap/danksharding/)

## Hubungan antara naik taraf {#relationship-between-upgrades}

Naik taraf Ethereum semuanya agak berkait antara satu sama lain. Jadi, mari rangkum semula cara Rantai Beacon mempengaruhi naik taraf yang lain.

### Rantai Beacon dan Penggabungan {#merge-and-beacon-chain}

Pada mulanya, Rantai Beacon wujud secara berasingan daripada Rangkaian Utama Ethereum, tetapi ia digabungkan pada 2022.

<ButtonLink href="/roadmap/merge/">
  Penggabungan
</ButtonLink>

### Penyerpihan dan Rantai Beacon {#shards-and-beacon-chain}

Penyerpihan hanya boleh memasuki ekosistem Ethereum dengan selamat apabila mekanisme konsensus bukti penaruhan telah diterapkan. Rantai Beacon memperkenalkan pertaruhan, yang 'digabungkan' dengan Rangkaian Utama, membuka jalan untuk penyerpihan membantu meningkatkan skala Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Rantai serpihan
</ButtonLink>

## Further Reading

- [Lebih lanjut tentang naik taraf Ethereum yang akan datang](/roadmap/vision)
- [Lebih lanjut tentang seni bina nod](/developers/docs/nodes-and-clients/node-architecture)
- [Lebih lanjut tentang bukti penaruhan](/developers/docs/consensus-mechanisms/pos)
