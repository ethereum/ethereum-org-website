---
title: Hadiah dan penalti proof-of-stake
description: Pelajari tentang insentif dalam protokol pada Ethereum proof-of-stake.
lang: id
---

[Ethereum](/) diamankan menggunakan mata uang kripto aslinya, ether (ETH). Operator node yang ingin berpartisipasi dalam memvalidasi blok dan mengidentifikasi kepala rantai, menyetorkan ether ke dalam [kontrak deposit](/staking/deposit-contract/) di Ethereum. Mereka kemudian dibayar dalam ether untuk menjalankan perangkat lunak validator yang memeriksa validitas blok baru yang diterima melalui jaringan peer-to-peer dan menerapkan algoritma pilihan fork untuk mengidentifikasi kepala rantai.

Ada dua peran utama untuk validator: 1) memeriksa blok baru dan "mengesahkan" blok tersebut jika valid, 2) mengusulkan blok baru ketika dipilih secara acak dari total kumpulan validator. Jika validator gagal melakukan salah satu dari tugas ini ketika diminta, mereka akan kehilangan pembayaran ether. Validator juga terkadang ditugaskan dengan agregasi tanda tangan dan berpartisipasi dalam komite sinkronisasi.

Ada juga beberapa tindakan yang sangat sulit dilakukan secara tidak sengaja dan menandakan niat jahat, seperti mengusulkan beberapa blok untuk slot yang sama atau mengesahkan beberapa blok untuk slot yang sama. Ini adalah perilaku yang "dapat dipotong" (slashable) yang mengakibatkan validator mengalami pembakaran sejumlah ether (hingga 1 ETH) sebelum validator dihapus dari jaringan, yang memakan waktu 36 hari. Ether dari validator yang dipotong perlahan-lahan terkuras selama periode keluar, tetapi pada Hari ke-18 mereka menerima "penalti korelasi" yang lebih besar ketika lebih banyak validator dipotong pada waktu yang hampir bersamaan. Oleh karena itu, struktur insentif mekanisme konsensus membayar untuk kejujuran dan menghukum pelaku kejahatan.

Semua hadiah dan penalti diterapkan sekali per epoch.

Baca terus untuk detail lebih lanjut...

## Hadiah dan penalti {#rewards}

### Hadiah {#rewards}

Validator menerima hadiah ketika mereka memberikan suara yang konsisten dengan mayoritas validator lainnya, ketika mereka mengusulkan blok, dan ketika mereka berpartisipasi dalam komite sinkronisasi. Nilai hadiah di setiap epoch dihitung dari `base_reward`. Ini adalah unit dasar dari mana hadiah lainnya dihitung. `base_reward` mewakili hadiah rata-rata yang diterima oleh validator di bawah kondisi optimal per epoch. Ini dihitung dari saldo efektif validator dan jumlah total validator aktif sebagai berikut:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

di mana `base_reward_factor` adalah 64, `base_rewards_per_epoch` adalah 4 dan `sum(active balance)` adalah total ether yang di-stake di seluruh validator aktif.

Ini berarti hadiah dasar sebanding dengan saldo efektif validator dan berbanding terbalik dengan jumlah validator di jaringan. Semakin banyak validator, semakin besar penerbitan keseluruhan (sebagai `sqrt(N)`) tetapi semakin kecil `base_reward` per validator (sebagai `1/sqrt(N)`). Faktor-faktor ini memengaruhi APR untuk node staking. Baca alasan untuk ini di [catatan Vitalik](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

Total hadiah kemudian dihitung sebagai jumlah dari lima komponen yang masing-masing memiliki bobot yang menentukan seberapa banyak setiap komponen menambah total hadiah. Komponen-komponen tersebut adalah:

```
1. source vote: the validator has made a timely vote for the correct source checkpoint
2. target vote: the validator has made a timely vote for the correct target checkpoint
3. head vote: the validator has made a timely vote for the correct head block
4. sync committee reward: the validator has participated in a sync committee
5. proposer reward: the validator has proposed a block in the correct slot
```

Bobot untuk setiap komponen adalah sebagai berikut:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Bobot ini berjumlah 64. Hadiah dihitung sebagai jumlah dari bobot yang berlaku dibagi 64. Validator yang telah memberikan suara sumber, target, dan kepala tepat waktu, mengusulkan blok, dan berpartisipasi dalam komite sinkronisasi dapat menerima `64/64 * base_reward == base_reward`. Namun, validator biasanya bukan pengusul blok, sehingga hadiah maksimum mereka adalah `64-8 /64 * base_reward == 7/8 * base_reward`. Validator yang bukan pengusul blok maupun dalam komite sinkronisasi dapat menerima `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Hadiah tambahan ditambahkan untuk memberikan insentif pada pengesahan yang cepat. Ini adalah `inclusion_delay_reward`. Ini memiliki nilai yang sama dengan `base_reward` dikalikan dengan `1/delay` di mana `delay` adalah jumlah slot yang memisahkan usulan blok dan pengesahan. Misalnya, jika pengesahan diserahkan dalam satu slot dari usulan blok, pengesah menerima `base_reward * 1/1 == base_reward`. Jika pengesahan tiba di slot berikutnya, pengesah menerima `base_reward * 1/2` dan seterusnya.

Pengusul blok menerima `8 / 64 * base_reward` untuk **setiap pengesahan yang valid** yang disertakan dalam blok, sehingga nilai sebenarnya dari hadiah berskala dengan jumlah validator yang mengesahkan. Pengusul blok juga dapat meningkatkan hadiah mereka dengan menyertakan bukti perilaku buruk oleh validator lain dalam blok yang diusulkan. Hadiah ini adalah "wortel" yang mendorong kejujuran validator. Pengusul blok yang menyertakan pemotongan akan diberi hadiah dengan `slashed_validators_effective_balance / 512`.

### Penalti {#penalties}

Sejauh ini kita telah mempertimbangkan validator yang berperilaku sangat baik, tetapi bagaimana dengan validator yang tidak memberikan suara kepala, sumber, dan target tepat waktu atau melakukannya dengan lambat?

Penalti karena melewatkan suara target dan sumber sama dengan hadiah yang akan diterima pengesah seandainya mereka menyerahkannya. Ini berarti bahwa alih-alih hadiah ditambahkan ke saldo mereka, nilai yang sama dihapus dari saldo mereka. Tidak ada penalti karena melewatkan suara kepala (yaitu, suara kepala hanya diberi hadiah, tidak pernah diberi penalti). Tidak ada penalti yang terkait dengan `inclusion_delay` - hadiah tersebut tidak akan ditambahkan ke saldo validator. Juga tidak ada penalti karena gagal mengusulkan blok.

Baca lebih lanjut tentang hadiah dan penalti di [spesifikasi konsensus](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Hadiah dan penalti disesuaikan dalam pembaruan Bellatrix - tonton Danny Ryan dan Vitalik mendiskusikan hal ini dalam [video Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ) ini.

## Pemotongan {#slashing}

Pemotongan adalah tindakan yang lebih parah yang mengakibatkan penghapusan paksa validator dari jaringan dan hilangnya ether yang di-stake terkait. Ada tiga cara validator dapat dipotong, yang semuanya merupakan usulan atau pengesahan blok yang tidak jujur:

- Dengan mengusulkan dan menandatangani dua blok berbeda untuk slot yang sama
- Dengan mengesahkan blok yang "mengelilingi" blok lain (secara efektif mengubah sejarah)
- Dengan "pemungutan suara ganda" dengan mengesahkan dua kandidat untuk blok yang sama

Jika tindakan ini terdeteksi, validator akan dipotong. Ini berarti bahwa 0,0078125 segera dibakar untuk validator 32 ETH (diskalakan secara linier dengan saldo aktif), kemudian periode penghapusan 36 hari dimulai. Selama periode penghapusan ini, stake validator secara bertahap terkuras. Pada titik tengah (Hari ke-18) penalti tambahan diterapkan yang besarnya berskala dengan total ether yang di-stake dari semua validator yang dipotong dalam 36 hari sebelum peristiwa pemotongan. Ini berarti bahwa ketika lebih banyak validator dipotong, besarnya pemotongan meningkat. Pemotongan maksimum adalah saldo efektif penuh dari semua validator yang dipotong (yaitu, jika ada banyak validator yang dipotong, mereka bisa kehilangan seluruh stake mereka). Di sisi lain, peristiwa pemotongan tunggal yang terisolasi hanya membakar sebagian kecil dari stake validator. Penalti titik tengah yang berskala dengan jumlah validator yang dipotong ini disebut "penalti korelasi".

## Kebocoran ketidakaktifan {#inactivity-leak}

Jika lapisan konsensus telah berjalan lebih dari empat epoch tanpa finalisasi, protokol darurat yang disebut "kebocoran ketidakaktifan" (inactivity leak) diaktifkan. Tujuan akhir dari kebocoran ketidakaktifan adalah untuk menciptakan kondisi yang diperlukan agar rantai dapat memulihkan finalitas. Seperti yang dijelaskan di atas, finalitas membutuhkan mayoritas 2/3 dari total ether yang di-stake untuk menyetujui pos pemeriksaan sumber dan target. Jika validator yang mewakili lebih dari 1/3 dari total validator offline atau gagal menyerahkan pengesahan yang benar, maka tidak mungkin bagi supermayoritas 2/3 untuk memfinalisasi pos pemeriksaan. Kebocoran ketidakaktifan membiarkan stake milik validator yang tidak aktif secara bertahap terkuras hingga mereka mengendalikan kurang dari 1/3 dari total stake, memungkinkan validator aktif yang tersisa memfinalisasi rantai. Sebesar apa pun kumpulan validator yang tidak aktif, validator aktif yang tersisa pada akhirnya akan mengendalikan >2/3 dari stake. Hilangnya stake adalah insentif yang kuat bagi validator yang tidak aktif untuk mengaktifkan kembali sesegera mungkin! Skenario kebocoran ketidakaktifan ditemui di testnet Medalla ketika < 66% validator aktif dapat mencapai konsensus pada kepala blockchain saat ini. Kebocoran ketidakaktifan diaktifkan dan finalitas akhirnya diperoleh kembali!

Desain hadiah, penalti, dan pemotongan dari mekanisme konsensus mendorong validator individu untuk berperilaku dengan benar. Namun, dari pilihan desain ini muncul sistem yang sangat memberikan insentif pada distribusi validator yang merata di berbagai klien, dan seharusnya sangat tidak memberikan insentif pada dominasi klien tunggal.

## Bacaan lebih lanjut {#further-reading}

- [Meningkatkan Ethereum: Lapisan insentif](https://eth2book.info/altair/part2/incentives)
- [Insentif dalam protokol Casper hibrida Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Spesifikasi beranotasi Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Tips Pencegahan Pemotongan Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analisis penalti pemotongan di bawah EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Sumber_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_