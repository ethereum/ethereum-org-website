---
title: Atestasi
description: Penjelasan tentang pengesahan dalam Ethereum berbasis proof-of-stake.
lang: id
---

Seorang validator diharapkan untuk membuat, menandatangani, dan mengirimkan sebuah pengesahan selama setiap epoch. Halaman ini menguraikan bagaimana pengesahan ini terlihat dan bagaimana mereka diproses dan dikomunikasikan antara klien konsensus.

## Apa itu pengesahan? {#what-is-an-attestation}

Setiap [epoch](/glossary/#epoch) (6,4 menit) seorang validator mengusulkan sebuah pengesahan ke jaringan. Pengesahan ini untuk slot tertentu dalam epoch. Tujuan pengesahan adalah untuk memberikan suara yang mendukung pandangan validator terhadap rantai, khususnya blok terjustifikasi terbaru dan blok pertama dalam epoch saat ini (dikenal sebagai checkpoint `source` dan `target`). Informasi ini digabungkan untuk semua validator yang berpartisipasi, memungkinkan jaringan mencapai konsensus tentang keadaan blockchain.

Pengesahan ini mengandung komponen-komponen berikut:

- `aggregation_bits`: daftar bit validator di mana posisinya dipetakan ke indeks validator di komite mereka; nilainya (0/1) menunjukkan apakah validator menandatangani `data` (yaitu, apakah mereka aktif dan setuju dengan pengusul blok)
- `data`: rincian yang berkaitan dengan pengesahan, seperti yang didefinisikan di bawah ini
- `signature`: tanda tangan BLS yang mengagregasikan tanda tangan validator individu

Tugas pertama untuk validator yang melakukan pengesahan adalah membangun `data`. `data` berisi informasi berikut:

- `slot`: Nomor slot yang dirujuk oleh pengesahan
- `index`: Nomor yang mengidentifikasi komite tempat validator berada dalam slot tertentu
- `beacon_block_root`: Root hash dari blok yang dilihat validator di kepala rantai (hasil dari penerapan algoritma pemilihan fork)
- `source`: Bagian dari pemungutan suara finalitas yang menunjukkan apa yang validator lihat sebagai blok terjustifikasi terbaru
- `target`: Bagian dari pemungutan suara finalitas yang menunjukkan apa yang validator lihat sebagai blok pertama dalam epoch saat ini

Setelah `data` dibangun, validator dapat membalik bit di `aggregation_bits` yang sesuai dengan indeks validator mereka sendiri dari 0 menjadi 1 untuk menunjukkan bahwa mereka berpartisipasi.

Terakhir, validator menandatangani pengesahan dan mengirimkannya ke jaringan.

### Pengesahan teragregasi {#aggregated-attestation}

Terdapat overhead yang signifikan terkait dengan melewatkan data ini di seluruh jaringan untuk setiap validator. Oleh karena itu, pengesahan dari validator-individu diagregate dalam subnet sebelum disiarkan secara lebih luas. Ini termasuk mengagregasi tanda tangan bersama sehingga pengesahan yang disiarkan menyertakan `data` konsensus dan satu tanda tangan yang dibentuk dengan menggabungkan tanda tangan dari semua validator yang setuju dengan `data` tersebut. Ini dapat diperiksa menggunakan `aggregation_bits` karena ini memberikan indeks setiap validator di komite mereka (yang ID-nya disediakan di `data`) yang dapat digunakan untuk menanyakan tanda tangan individu.

Di setiap epoch, 16 validator di setiap subnet dipilih untuk menjadi `agregator`. Agregator mengumpulkan semua pengesahan yang mereka dengar melalui jaringan gossip yang memiliki `data` yang setara dengan milik mereka sendiri. Pengirim setiap pengesahan yang cocok dicatat dalam `aggregation_bits`. Agregator kemudian menyiarkan agregat pengesahan ke jaringan yang lebih luas.

Ketika seorang validator dipilih menjadi pembuat usulan blok, mereka mengemas pengesahan aggregate dari subnet hingga slot terbaru dalam blok baru tersebut.

### Siklus hidup penyertaan pengesahan {#attestation-inclusion-lifecycle}

1. Generasi
2. Penyebaran
3. Pengumpulan
4. Penyebaran
5. Penyertaan

Siklus pengesahan diuraikan dalam skema di bawah ini:

![siklus hidup pengesahan](./attestation_schematic.png)

## Imbalan {#rewards}

Validator diberi imbalan atas pengiriman pengesahan. Hadiah pengesahan ditentukan oleh tanda partisipasi (source, target, dan head), hadiah dasar, serta tingkat partisipasi.

Masing-masing bendera partisipasi dapat bernilai benar atau salah, tergantung pada pengesahan yang diserahkan dan penundaan penyertaannya.

Skenario terbaik terjadi ketika ketiga flag bernilai benar, dalam hal ini seorang validator akan mendapatkan (untuk setiap flag yang benar):

`hadiah += hadiah dasar * bobot bendera * tingkat pengesahan bendera / 64`

Pembuktian rate dari sebuah flag diukur dengan menjumlahkan saldo efektif semua validator yang memberikan attestation untuk flag tersebut, kemudian dibandingkan dengan total saldo efektif yang aktif.

### Imbalan dasar {#base-reward}

Imbalan dasar dihitung berdasarkan jumlah validator pengesahan dan saldo Ether efektif yang mereka staked:

`imbalan dasar = saldo efektif validator x 2^6 / SQRT(Saldo efektif dari semua validator aktif)`

#### Keterlambatan penyertaan {#inclusion-delay}

Pada saat validator memberikan suara pada kepala rantai (`blok n`), `blok n+1` belum diusulkan. Oleh karena itu, pengesahan secara alami disertakan **satu blok kemudian** sehingga semua pengesahan yang memberikan suara pada `blok n` sebagai kepala rantai akan disertakan dalam `blok n+1`, dan **keterlambatan penyertaan** adalah 1. Jika keterlambatan penyertakan berlipat ganda menjadi dua slot, imbalan pengesahan menjadi separuh, karena untuk menghitung imbalan pengesahan, imbalan dasar dikalikan dengan kebalikan dari keterlambatan penyertakan.

### Skenario pengesahan {#attestation-scenarios}

#### Validator Pemungut Suara yang Hilang {#missing-voting-validator}

Validator memiliki waktu maksimal 1 epoch untuk mengirimkan pengesahan mereka. Jika pengesahan terlewat pada epoch 0, mereka dapat mengirimkannya dengan keterlambatan penyertakan pada epoch 1.

#### Agregator yang Hilang {#missing-aggregator}

Totalnya ada 16 Aggregator setiap epoch. Selain itu, validator acak berlangganan **dua subnet selama 256 epoch** dan berfungsi sebagai cadangan jika agregator hilang.

#### Pengusul blok yang hilang {#missing-block-proposer}

Perlu diperhatikan bahwa dalam beberapa kasus, seorang aggregator yang beruntung juga dapat menjadi pengusulan blok. Jika pengesahan tidak dimasukkan karena pengusulan blok telah salah, pengusulan blok berikutnya akan mengambil pengesahan yang telah di aggregate dan memasukkannya ke dalam blok berikutnya. Namun, **keterlambatan penyertaan** akan bertambah satu.

## Bacaan lebih lanjut {#further-reading}

- [Pengesahan dalam spesifikasi konsensus beranotasi dari Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Pengesahan di eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
