---
title: Imbalan dan penalti berdasarkan bukti kepemilikan
description: Pelajari tentang insentif dalam protokol dalam bukti kepemilikan Ethereum.
lang: id
---

Ethereum diamankan menggunakan mata uang kripto asalnya, ether (ETH). Operator node yang ingin berpartisipasi dalam memvalidasi blok dan mengidentifikasi kepala rantai, menyetorkan ether ke dalam [kontrak deposit](/staking/deposit-contract/) di Ethereum. Mereka kemudian dibayar dalam bentuk ether untuk menjalankan perangkat lunak validator yang memeriksa keabsahan blok baru yang diterima melalui jaringan peer-to-peer dan menerapkan algoritme fork-choice untuk mengidentifikasi kepala rantai.

Ada dua peran utama untuk seorang validator: 1) memeriksa blok baru dan "mengesahkan" blok tersebut jika valid, 2) mengusulkan blok baru jika dipilih secara acak dari kumpulan validator. Jika validator gagal melakukan salah satu dari tugas-tugas ini ketika diminta, maka mereka akan kehilangan pembayaran eter. Validator juga terkadang ditugaskan untuk melakukan agregasi tanda tangan dan berpartisipasi dalam komite sinkronisasi.

Ada juga beberapa tindakan yang sangat sulit dilakukan secara tidak sengaja dan menandakan niat jahat, seperti mengajukan beberapa blok untuk slot yang sama atau mengesahkan beberapa blok untuk slot yang sama. Ini adalah perilaku "slashable" yang mengakibatkan validator memiliki sejumlah eter (hingga 1 ETH) yang dibakar sebelum validator dihapus dari jaringan, yang membutuhkan waktu 36 hari. Eter validator yang terpotong perlahan-lahan terkuras selama periode keluar, tetapi pada Hari ke-18 mereka menerima "penalti korelasi" yang lebih besar ketika lebih banyak validator yang terpotong pada waktu yang sama. Oleh karena itu, struktur insentif mekanisme konsensus membayar kejujuran dan menghukum pelaku kejahatan.

Semua hadiah dan hukuman diterapkan sekali per periode.

Baca terus untuk informasi lebih lanjut...

## Imbalan dan hukuman {#rewards}

### Imbalan {#rewards}

Validator menerima hadiah ketika mereka memberikan suara yang konsisten dengan mayoritas validator lain, ketika mereka mengusulkan blok, dan ketika mereka berpartisipasi dalam komite sinkronisasi. Nilai imbalan di setiap epok dihitung dari `base_reward`. Ini adalah unit dasar yang digunakan untuk menghitung hadiah lainnya. `base_reward` mewakili imbalan rata-rata yang diterima oleh validator dalam kondisi optimal per epok. Ini dihitung dari saldo efektif validator dan jumlah total validator aktif sebagai berikut:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

dengan `base_reward_factor` adalah 64, `base_rewards_per_epoch` adalah 4, dan `sum(active balance)` adalah total ether yang dipertaruhkan di semua validator aktif.

Ini berarti hadiah dasar sebanding dengan saldo efektif validator dan berbanding terbalik dengan jumlah validator di jaringan. Semakin banyak validator, semakin besar penerbitan keseluruhan (sebagai `sqrt(N)`) tetapi semakin kecil `base_reward` per validator (sebagai `1/sqrt(N)`). Faktor-faktor ini mempengaruhi APR untuk sebuah staking node. Baca alasan untuk ini di [catatan Vitalik](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

Total hadiah kemudian dihitung sebagai jumlah dari lima komponen yang masing-masing memiliki pembobotan yang menentukan berapa banyak setiap komponen menambah total hadiah. Komponen-komponennya adalah:

```
1. pemungutan suara sumber: validator telah melakukan pemungutan suara tepat waktu untuk pos pemeriksaan sumber yang benar
2. pemungutan suara target: validator telah melakukan pemungutan suara tepat waktu untuk pos pemeriksaan target yang benar
3. pemungutan suara kepala: validator telah melakukan pemungutan suara tepat waktu untuk blok kepala yang benar
4. imbalan komite sinkronisasi: validator telah berpartisipasi dalam komite sinkronisasi
5. imbalan pengusul: validator telah mengusulkan sebuah blok di slot yang benar
```

Pembobotan untuk setiap komponen adalah sebagai berikut:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Semua bobot ini berjumlah 64. Hadiah dihitung sebagai jumlah bobot yang berlaku dibagi 64. Validator yang telah melakukan pemungutan suara sumber, target, dan kepala secara tepat waktu, mengusulkan sebuah blok, dan berpartisipasi dalam komite sinkronisasi dapat menerima `64/64 * base_reward == base_reward`. Akan tetapi, validator biasanya bukanlah pengusul blok, sehingga imbalan maksimum mereka adalah `64-8 /64 * base_reward == 7/8 * base_reward`. Validator yang bukan pengusul blok ataupun berada di dalam komite sinkronisasi dapat menerima `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Hadiah tambahan ditambahkan untuk memberikan insentif bagi pengesahan yang cepat. Ini adalah `inclusion_delay_reward`. Ini memiliki nilai yang sama dengan `base_reward` dikalikan dengan `1/delay` di mana `delay` adalah jumlah slot yang memisahkan proposal blok dan atestasi. Sebagai contoh, jika atestasi dikirimkan dalam satu slot dari proposal blok, atestator menerima `base_reward * 1/1 == base_reward`. Jika atestasi tiba di slot berikutnya, atestator menerima `base_reward * 1/2` dan seterusnya.

Pengusul blok menerima `8 / 64 * base_reward` untuk **setiap atestasi yang valid** yang disertakan dalam blok, jadi nilai imbalan yang sebenarnya berskala dengan jumlah validator yang melakukan atestasi. Pengusul blok juga dapat meningkatkan hadiahnya dengan menyertakan bukti perilaku buruk oleh validator lain dalam blok yang mereka usulkan. Hadiah-hadiah ini berfungsi sebagai "insentif" untuk mendorong kejujuran dari para validator. Pengusul blok yang menyertakan pemotongan akan diberi imbalan `slashed_validators_effective_balance / 512`.

### Hukuman {#penalties}

Sejauh ini, kita telah mempertimbangkan validator yang berperilaku dengan baik, tetapi bagaimana dengan validator yang tidak memberikan suara kepala (head), sumber (source), dan target tepat waktu atau melakukannya dengan lambat?

Hukuman karena tidak memberikan suara sasaran dan suara sumber sama besarnya dengan imbalan yang akan diterima attestor jika mereka menyerahkan suara tersebut. Artinya, alih-alih mendapatkan imbalan yang ditambahkan ke saldo mereka, mereka justru mendapatkan nilai yang sama yang dihapus dari saldo mereka. Tidak ada hukuman karena melewatkan pemungutan suara kepala (yaitu, pemungutan suara kepala hanya diberi imbalan, tidak pernah dikenai hukuman). Tidak ada hukuman yang terkait dengan `inclusion_delay` - imbalan tidak akan ditambahkan ke saldo validator. Tidak ada pula penalti jika gagal mengusulkan blok.

Baca lebih lanjut tentang imbalan dan hukuman dalam [spesifikasi konsensus](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Imbalan dan hukuman disesuaikan dalam pemutakhiran Bellatrix - saksikan Danny Ryan dan Vitalik membahas ini dalam [video Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ) ini.

## Pemotongan {#slashing}

Slashing merupakan tindakan yang lebih parah yang menyebabkan penghapusan paksa validator dari jaringan dan hilangnya ether yang dipertaruhkan. Ada tiga cara validator dapat disayat, yang semuanya mengarah pada proposal atau pengesahan blok yang tidak jujur:

- Dengan mengusulkan dan menandatangani dua blok berbeda untuk slot yang sama
- Dengan membuktikan adanya blok yang "mengelilingi" blok lain (yang secara efektif mengubah sejarah)
- Dengan “pemungutan suara ganda” dengan memberikan kesaksian kepada dua kandidat untuk blok yang sama

Jika tindakan ini terdeteksi, validator akan dihapus. Artinya 0,0078125 segera dibakar untuk validator 32 ETH (diskalakan secara linear dengan saldo aktif), lalu periode penghapusan 36 hari dimulai. Selama periode penghapusan ini, saham validator secara bertahap akan hilang. Pada titik tengah (Hari ke 18), penalti tambahan diterapkan yang besarnya berskala dengan total ether yang dipertaruhkan dari semua validator yang dipotong dalam 36 hari sebelum peristiwa pemotongan. Artinya, jika semakin banyak validator yang dipangkas, besarnya pemangkasan pun meningkat. Pemotongan maksimum adalah seluruh saldo efektif dari semua validator yang dikenai pemotongan (yaitu, jika ada banyak validator yang dikenai pemotongan, mereka bisa kehilangan seluruh taruhan mereka). Di sisi lain, satu kejadian pemotongan yang terisolasi hanya membakar sebagian kecil saham validator. Penalti titik tengah yang berskala dengan jumlah validator yang dipotong disebut "penalti korelasi".

## Kebocoran inaktivitas {#inactivity-leak}

Jika lapisan konsensus telah berjalan lebih dari empat periode tanpa finalisasi, protokol darurat yang disebut "kebocoran tidak aktif" diaktifkan. Tujuan utama kebocoran ketidakaktifan adalah untuk menciptakan kondisi yang dibutuhkan agar rantai dapat memulihkan finalitas. Seperti dijelaskan di atas, finalitas memerlukan mayoritas 2/3 dari total ether yang dipertaruhkan untuk menyetujui titik pemeriksaan sumber dan target. Jika validator yang mewakili lebih dari 1/3 dari total validator offline atau gagal menyerahkan pernyataan yang benar maka mustahil bagi mayoritas super 2/3 untuk menyelesaikan titik pemeriksaan. Kebocoran ketidakaktifan ini membuat saham milik validator yang tidak aktif berkurang secara bertahap hingga mereka mengendalikan kurang dari 1/3 saham total, sehingga validator aktif yang tersisa dapat menuntaskan rantai tersebut. Berapa pun besarnya kumpulan validator yang tidak aktif, validator aktif yang tersisa pada akhirnya akan mengendalikan >2/3 saham. Hilangnya saham merupakan insentif yang kuat bagi validator yang tidak aktif untuk mengaktifkan kembali sesegera mungkin! Skenario kebocoran tidak aktif ditemukan pada testnet Medalla ketika < 66% validator aktif mampu mencapai konsensus mengenai kepala blockchain saat ini. Kebocoran ketidakaktifan diaktifkan dan finalitas akhirnya diperoleh kembali!

Desain penghargaan, penalti, dan pemotongan dari mekanisme konsensus mendorong validator individual untuk berperilaku dengan benar. Akan tetapi, dari pilihan desain ini muncul sebuah sistem yang sangat memberi insentif bagi distribusi validator yang merata di antara banyak klien, dan seharusnya sangat mengurangi insentif bagi dominasi satu klien.

## Bacaan lebih lanjut {#further-reading}

- [Memutakhirkan Ethereum: Lapisan insentif](https://eth2book.info/altair/part2/incentives)
- [Insentif dalam protokol Casper hibrida Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Spesifikasi beranotasi dari Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Kiat Pencegahan Pemotongan Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analisis hukuman pemotongan di bawah EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Sumber_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
