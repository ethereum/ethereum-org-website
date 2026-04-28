---
title: Pengesahan
description: Deskripsi tentang pengesahan pada proof-of-stake Ethereum.
lang: id
---

Seorang validator diharapkan untuk membuat, menandatangani, dan menyiarkan pengesahan selama setiap epoch. Halaman ini menguraikan seperti apa bentuk pengesahan ini dan bagaimana mereka diproses serta dikomunikasikan di antara klien konsensus.

## Apa itu pengesahan? {#what-is-an-attestation}

Setiap [epoch](/glossary/#epoch) (6,4 menit) seorang validator mengusulkan pengesahan ke jaringan. Pengesahan tersebut adalah untuk slot tertentu dalam epoch. Tujuan dari pengesahan ini adalah untuk memberikan suara yang mendukung pandangan validator terhadap rantai, khususnya blok yang dibenarkan (justified) paling baru dan blok pertama dalam epoch saat ini (dikenal sebagai pos pemeriksaan `source` dan `target`). Informasi ini digabungkan untuk semua validator yang berpartisipasi, memungkinkan jaringan untuk mencapai konsensus tentang status blockchain.

Pengesahan berisi komponen-komponen berikut:

- `aggregation_bits`: daftar bit validator di mana posisinya memetakan ke indeks validator dalam komite mereka; nilai (0/1) menunjukkan apakah validator menandatangani `data` (yaitu, apakah mereka aktif dan setuju dengan pengusul blok)
- `data`: detail yang berkaitan dengan pengesahan, seperti yang didefinisikan di bawah ini
- `signature`: tanda tangan BLS yang menggabungkan tanda tangan dari masing-masing validator

Tugas pertama untuk validator yang mengesahkan adalah membangun `data`. `data` berisi informasi berikut:

- `slot`: Nomor slot yang dirujuk oleh pengesahan
- `index`: Angka yang mengidentifikasi komite mana validator tersebut berada dalam slot tertentu
- `beacon_block_root`: Hash root dari blok yang dilihat validator di kepala rantai (hasil dari penerapan algoritma pilihan fork)
- `source`: Bagian dari suara finalitas yang menunjukkan apa yang dilihat validator sebagai blok yang dibenarkan paling baru
- `target`: Bagian dari suara finalitas yang menunjukkan apa yang dilihat validator sebagai blok pertama dalam epoch saat ini

Setelah `data` dibangun, validator dapat membalik bit dalam `aggregation_bits` yang sesuai dengan indeks validator mereka sendiri dari 0 menjadi 1 untuk menunjukkan bahwa mereka berpartisipasi.

Terakhir, validator menandatangani pengesahan dan menyiarkannya ke jaringan.

### Pengesahan gabungan {#aggregated-attestation}

Ada overhead substansial yang terkait dengan penyampaian data ini di sekitar jaringan untuk setiap validator. Oleh karena itu, pengesahan dari masing-masing validator digabungkan dalam subnet sebelum disiarkan secara lebih luas. Ini termasuk menggabungkan tanda tangan bersama-sama sehingga pengesahan yang disiarkan mencakup `data` konsensus dan satu tanda tangan yang dibentuk dengan menggabungkan tanda tangan dari semua validator yang setuju dengan `data` tersebut. Ini dapat diperiksa menggunakan `aggregation_bits` karena ini memberikan indeks setiap validator dalam komite mereka (yang ID-nya disediakan dalam `data`) yang dapat digunakan untuk menanyakan tanda tangan individu.

Dalam setiap epoch, 16 validator di setiap subnet dipilih untuk menjadi `aggregators` (penggabung). Penggabung mengumpulkan semua pengesahan yang mereka dengar melalui jaringan gosip yang memiliki `data` yang setara dengan milik mereka. Pengirim dari setiap pengesahan yang cocok dicatat dalam `aggregation_bits`. Penggabung kemudian menyiarkan gabungan pengesahan ke jaringan yang lebih luas.

Ketika seorang validator dipilih untuk menjadi pengusul blok, mereka mengemas pengesahan gabungan dari subnet hingga slot terbaru di blok baru.

### Siklus hidup penyertaan pengesahan {#attestation-inclusion-lifecycle}

1. Pembuatan (Generation)
2. Propagasi (Propagation)
3. Penggabungan (Aggregation)
4. Propagasi (Propagation)
5. Penyertaan (Inclusion)

Siklus hidup pengesahan diuraikan dalam skema di bawah ini:

![siklus hidup pengesahan](./attestation_schematic.png)

## Hadiah {#rewards}

Validator diberi hadiah karena mengirimkan pengesahan. Hadiah pengesahan bergantung pada tanda partisipasi (sumber, target, dan kepala), hadiah dasar, dan tingkat partisipasi.

Masing-masing tanda partisipasi dapat bernilai benar (true) atau salah (false), bergantung pada pengesahan yang dikirimkan dan penundaan penyertaannya.

Skenario terbaik terjadi ketika ketiga tanda bernilai benar, dalam hal ini validator akan mendapatkan (per tanda yang benar):

`reward += base reward * flag weight * flag attesting rate / 64`

Tingkat pengesahan tanda diukur menggunakan jumlah saldo efektif dari semua validator yang mengesahkan untuk tanda yang diberikan dibandingkan dengan total saldo efektif aktif.

### Hadiah dasar {#base-reward}

Hadiah dasar dihitung berdasarkan jumlah validator yang mengesahkan dan saldo ether yang di-stake secara efektif:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Penundaan penyertaan {#inclusion-delay}

Pada saat validator memberikan suara pada kepala rantai (`block n`), `block n+1` belum diusulkan. Oleh karena itu, pengesahan secara alami disertakan **satu blok kemudian** sehingga semua pengesahan yang memberikan suara pada `block n` sebagai kepala rantai disertakan dalam `block n+1` dan, **penundaan penyertaan** adalah 1. Jika penundaan penyertaan berlipat ganda menjadi dua slot, hadiah pengesahan berkurang setengahnya, karena untuk menghitung hadiah pengesahan, hadiah dasar dikalikan dengan kebalikan dari penundaan penyertaan.

### Skenario pengesahan {#attestation-scenarios}

#### Validator Pemberi Suara yang Hilang {#missing-voting-validator}

Validator memiliki waktu maksimum 1 epoch untuk mengirimkan pengesahan mereka. Jika pengesahan terlewat di epoch 0, mereka dapat mengirimkannya dengan penundaan penyertaan di epoch 1.

#### Penggabung yang Hilang {#missing-aggregator}

Terdapat total 16 Penggabung per epoch. Selain itu, validator acak berlangganan ke **dua subnet selama 256 epoch** dan berfungsi sebagai cadangan jika penggabung hilang.

#### Pengusul blok yang hilang {#missing-block-proposer}

Perhatikan bahwa dalam beberapa kasus, penggabung yang beruntung juga dapat menjadi pengusul blok. Jika pengesahan tidak disertakan karena pengusul blok telah hilang, pengusul blok berikutnya akan mengambil pengesahan gabungan dan menyertakannya ke dalam blok berikutnya. Namun, **penundaan penyertaan** akan meningkat satu.

## Bacaan lebih lanjut {#further-reading}

- [Pengesahan dalam spesifikasi konsensus beranotasi Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Pengesahan di eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_