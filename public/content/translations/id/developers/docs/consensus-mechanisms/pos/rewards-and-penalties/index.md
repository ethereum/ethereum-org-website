---
title: Imbalan dan penalti proof-of-stake
description: Pelajari tentang insentif dalam protokol pada Ethereum proof-of-stake.
lang: id
---

[Ethereum](/) diamankan menggunakan mata uang kripto aslinya, ether (ETH). Operator node yang ingin berpartisipasi dalam memvalidasi blok dan mengidentifikasi head (ujung) dari rantai, mendepositkan ether ke dalam [kontrak deposit](/staking/deposit-contract/) di Ethereum. Mereka kemudian dibayar dalam ether untuk menjalankan perangkat lunak validator yang memeriksa validitas blok baru yang diterima melalui jaringan peer-to-peer dan menerapkan algoritma pilihan percabangan (fork-choice) untuk mengidentifikasi head dari rantai.

Ada dua peran utama bagi seorang validator: 1) memeriksa blok baru dan melakukan "atestasi" terhadapnya jika valid, 2) mengusulkan blok baru ketika dipilih secara acak dari total kumpulan validator. Jika validator gagal melakukan salah satu dari tugas ini ketika diminta, mereka akan kehilangan pembayaran ether. Validator juga terkadang ditugaskan untuk agregasi tanda tangan dan berpartisipasi dalam komite sinkronisasi.

Ada juga beberapa tindakan yang sangat sulit dilakukan secara tidak sengaja dan menandakan adanya intensi jahat, seperti mengusulkan beberapa blok untuk slot yang sama atau melakukan atestasi ke beberapa blok untuk slot yang sama. Ini adalah perilaku yang "dapat dipotong" (slashable) yang mengakibatkan validator mengalami pembakaran sejumlah ether (hingga 1 ETH) sebelum validator dihapus dari jaringan, yang memakan waktu 36 hari. Ether milik validator yang dipotong perlahan-lahan terkuras selama periode keluar, tetapi pada Hari ke-18 mereka menerima "penalti korelasi" yang lebih besar ketika lebih banyak validator dipotong pada waktu yang hampir bersamaan. Oleh karena itu, struktur insentif mekanisme konsensus membayar untuk kejujuran dan menghukum aktor jahat.

Semua imbalan dan penalti diterapkan sekali per Epok.

Baca terus untuk detail lebih lanjut...

## Imbalan dan penalti {#rewards}

### Imbalan {#rewards-2}

Validator menerima imbalan ketika mereka memberikan suara yang konsisten dengan mayoritas validator lainnya, ketika mereka mengusulkan blok, dan ketika mereka berpartisipasi dalam komite sinkronisasi. Nilai imbalan di setiap Epok dihitung dari `base_reward`. Ini adalah unit dasar yang menjadi acuan perhitungan imbalan lainnya. `base_reward` mewakili imbalan rata-rata yang diterima oleh validator dalam kondisi optimal per Epok. Ini dihitung dari saldo efektif validator dan jumlah total validator aktif sebagai berikut:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

di mana `base_reward_factor` adalah 64, `base_rewards_per_epoch` adalah 4 dan `sum(active balance)` adalah total ether yang di-stake di seluruh validator aktif.

Ini berarti imbalan dasar sebanding dengan saldo efektif validator dan berbanding terbalik dengan jumlah validator di jaringan. Semakin banyak validator, semakin besar penerbitan keseluruhan (karena `sqrt(N)` tetapi semakin kecil `base_reward` per validator (karena `1/sqrt(N)`). Faktor-faktor ini memengaruhi APR untuk node staking. Baca alasan untuk hal ini di [catatan Vitalik](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

Total imbalan kemudian dihitung sebagai jumlah dari lima komponen yang masing-masing memiliki bobot yang menentukan seberapa besar setiap komponen menambah total imbalan. Komponen-komponen tersebut adalah:

```
1. source vote: validator telah memberikan suara tepat waktu untuk checkpoint sumber yang benar
2. target vote: validator telah memberikan suara tepat waktu untuk checkpoint target yang benar
3. head vote: validator telah memberikan suara tepat waktu untuk blok head yang benar
4. sync committee reward: validator telah berpartisipasi dalam komite sinkronisasi
5. proposer reward: validator telah mengusulkan blok di slot yang benar
```

Bobot untuk setiap komponen adalah sebagai berikut:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Jumlah dari bobot-bobot ini adalah 64. Imbalan dihitung sebagai jumlah dari bobot yang berlaku dibagi 64. Seorang validator yang telah memberikan suara sumber, target, dan head tepat waktu, mengusulkan blok, dan berpartisipasi dalam komite sinkronisasi dapat menerima `64/64 * base_reward == base_reward`. Namun, seorang validator biasanya bukan pengusul blok, sehingga imbalan maksimum mereka adalah `64-8 /64 * base_reward == 7/8 * base_reward`. Validator yang bukan pengusul blok maupun anggota komite sinkronisasi dapat menerima `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Imbalan tambahan ditambahkan untuk memberi insentif pada atestasi yang cepat. Ini adalah `inclusion_delay_reward`. Ini memiliki nilai yang sama dengan `base_reward` dikalikan dengan `1/delay` di mana `delay` adalah jumlah slot yang memisahkan proposal blok dan atestasi. Misalnya, jika atestasi dikirimkan dalam satu slot dari proposal blok, pembuat atestasi menerima `base_reward * 1/1 == base_reward`. Jika atestasi tiba di slot berikutnya, pembuat atestasi menerima `base_reward * 1/2` dan seterusnya.

Pengusul blok menerima `8 / 64 * base_reward` untuk **setiap atestasi valid** yang disertakan dalam blok, sehingga nilai aktual dari imbalan berskala dengan jumlah validator yang melakukan atestasi. Pengusul blok juga dapat meningkatkan imbalan mereka dengan menyertakan bukti perilaku buruk oleh validator lain dalam blok yang mereka usulkan. Imbalan ini adalah "wortel" (insentif) yang mendorong kejujuran validator. Pengusul blok yang menyertakan pemotongan akan diberi imbalan dengan `slashed_validators_effective_balance / 512`.

### Penalti {#penalties}

Sejauh ini kita telah mempertimbangkan validator yang berperilaku sangat baik, tetapi bagaimana dengan validator yang tidak memberikan suara head, sumber, dan target tepat waktu atau melakukannya dengan lambat?

Penalti karena melewatkan suara target dan sumber sama dengan imbalan yang akan diterima pembuat atestasi seandainya mereka mengirimkannya. Ini berarti alih-alih imbalan ditambahkan ke saldo mereka, nilai yang sama akan dihapus dari saldo mereka. Tidak ada penalti karena melewatkan suara head (yaitu, suara head hanya diberi imbalan, tidak pernah diberi penalti). Tidak ada penalti yang terkait dengan `inclusion_delay` - imbalan tersebut tidak akan ditambahkan ke saldo validator. Juga tidak ada penalti karena gagal mengusulkan blok.

Baca lebih lanjut tentang imbalan dan penalti di [spesifikasi konsensus](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Imbalan dan penalti disesuaikan dalam peningkatan Bellatrix - tonton Danny Ryan dan Vitalik mendiskusikan hal ini dalam [video Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ) ini.

## Pemotongan {#slashing}

Pemotongan adalah tindakan yang lebih parah yang mengakibatkan penghapusan paksa validator dari jaringan dan hilangnya ether yang mereka stake. Ada tiga cara validator dapat dipotong, yang semuanya merupakan proposal atau atestasi blok yang tidak jujur:

- Dengan mengusulkan dan menandatangani dua blok berbeda untuk slot yang sama
- Dengan melakukan atestasi ke blok yang "mengelilingi" blok lain (secara efektif mengubah sejarah)
- Dengan "pemungutan suara ganda" dengan melakukan atestasi ke dua kandidat untuk blok yang sama

Jika tindakan ini terdeteksi, validator akan dipotong. Ini berarti 0,0078125 segera dibakar untuk validator 32 ETH (diskalakan secara linier dengan saldo aktif), kemudian periode penghapusan 36 hari dimulai. Selama periode penghapusan ini, stake validator secara bertahap terkuras. Pada titik tengah (Hari ke-18) penalti tambahan diterapkan yang besarannya berskala dengan total ether yang di-stake dari semua validator yang dipotong dalam 36 hari sebelum peristiwa pemotongan. Ini berarti bahwa ketika lebih banyak validator dipotong, besaran pemotongan meningkat. Pemotongan maksimum adalah saldo efektif penuh dari semua validator yang dipotong (yaitu, jika ada banyak validator yang dipotong, mereka bisa kehilangan seluruh stake mereka). Di sisi lain, peristiwa pemotongan tunggal yang terisolasi hanya membakar sebagian kecil dari stake validator. Penalti titik tengah yang berskala dengan jumlah validator yang dipotong ini disebut "penalti korelasi".

## Kebocoran ketidakaktifan {#inactivity-leak}

Jika lapisan konsensus telah berjalan lebih dari empat Epok tanpa melakukan finalisasi, protokol darurat yang disebut "kebocoran ketidakaktifan" akan diaktifkan. Tujuan akhir dari kebocoran ketidakaktifan adalah untuk menciptakan kondisi yang diperlukan agar rantai dapat memulihkan finalitas. Seperti yang dijelaskan di atas, finalitas membutuhkan mayoritas 2/3 dari total ether yang di-stake untuk menyetujui checkpoint sumber dan target. Jika validator yang mewakili lebih dari 1/3 dari total validator offline atau gagal mengirimkan atestasi yang benar, maka tidak mungkin bagi mayoritas super 2/3 untuk memfinalisasi checkpoint. Kebocoran ketidakaktifan membiarkan stake milik validator yang tidak aktif secara bertahap terkuras hingga mereka mengendalikan kurang dari 1/3 dari total stake, memungkinkan validator aktif yang tersisa memfinalisasi rantai. Sebesar apa pun kumpulan validator yang tidak aktif, validator aktif yang tersisa pada akhirnya akan mengendalikan >2/3 dari stake. Hilangnya stake adalah insentif yang kuat bagi validator yang tidak aktif untuk mengaktifkan kembali sesegera mungkin! Skenario kebocoran ketidakaktifan pernah ditemui di testnet Medalla ketika < 66% validator aktif mampu mencapai konsensus pada head rantai blok saat ini. Kebocoran ketidakaktifan diaktifkan dan finalitas akhirnya diperoleh kembali!

Desain imbalan, penalti, dan pemotongan dari mekanisme konsensus mendorong setiap validator untuk berperilaku dengan benar. Namun, dari pilihan desain ini muncul sebuah sistem yang sangat memberi insentif pada distribusi validator yang merata di berbagai klien, dan seharusnya sangat tidak memberi insentif pada dominasi klien tunggal.

## Bacaan lebih lanjut {#further-reading}

- [Meningkatkan Ethereum: Lapisan insentif](https://eth2book.info/altair/part2/incentives)
- [Insentif dalam protokol Casper hibrida Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Spesifikasi beranotasi Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Tips Pencegahan Pemotongan Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analisis penalti pemotongan di bawah EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Sumber_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_