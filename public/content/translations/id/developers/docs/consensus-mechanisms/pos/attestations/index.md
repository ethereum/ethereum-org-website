---
title: Atestasi
description: Deskripsi tentang atestasi pada Ethereum proof-of-stake.
lang: id
---

Seorang validator diharapkan untuk membuat, menandatangani, dan menyiarkan sebuah atestasi selama setiap Epok. Halaman ini menguraikan seperti apa bentuk atestasi ini dan bagaimana mereka diproses serta dikomunikasikan antar klien konsensus.

## Apa itu atestasi? {#what-is-an-attestation}

Setiap [Epok](/glossary/#epoch) (6,4 menit) seorang validator mengusulkan sebuah atestasi ke jaringan. Atestasi tersebut adalah untuk slot tertentu di dalam Epok. Tujuan dari atestasi adalah untuk memberikan suara yang mendukung pandangan validator terhadap rantai, khususnya blok terjustifikasi yang paling baru dan blok pertama di Epok saat ini (dikenal sebagai pos pemeriksaan `source` dan `target`). Informasi ini digabungkan untuk semua validator yang berpartisipasi, memungkinkan jaringan untuk mencapai konsensus tentang state dari rantai blok.

Atestasi berisi komponen-komponen berikut:

- `aggregation_bits`: daftar bit (bitlist) validator di mana posisinya memetakan ke indeks validator di dalam komite mereka; nilainya (0/1) menunjukkan apakah validator menandatangani `data` (yaitu, apakah mereka aktif dan setuju dengan pengusul blok)
- `data`: detail yang berkaitan dengan atestasi, seperti yang didefinisikan di bawah ini
- `signature`: tanda tangan BLS yang mengagregasi tanda tangan dari masing-masing validator

Tugas pertama untuk validator yang melakukan atestasi adalah membangun `data`. `data` berisi informasi berikut:

- `slot`: Nomor slot yang dirujuk oleh atestasi
- `index`: Angka yang mengidentifikasi komite mana validator tersebut tergabung dalam slot tertentu
- `beacon_block_root`: Hash root dari blok yang dilihat validator di ujung rantai (hasil dari penerapan algoritma pilihan percabangan)
- `source`: Bagian dari suara finalitas yang menunjukkan apa yang dilihat validator sebagai blok terjustifikasi yang paling baru
- `target`: Bagian dari suara finalitas yang menunjukkan apa yang dilihat validator sebagai blok pertama di Epok saat ini

Setelah `data` dibangun, validator dapat membalik bit di `aggregation_bits` yang sesuai dengan indeks validator mereka sendiri dari 0 menjadi 1 untuk menunjukkan bahwa mereka berpartisipasi.

Terakhir, validator menandatangani atestasi dan menyiarkannya ke jaringan.

### Atestasi teragregasi {#aggregated-attestation}

Terdapat overhead yang substansial terkait dengan pengiriman data ini di sekitar jaringan untuk setiap validator. Oleh karena itu, atestasi dari masing-masing validator diagregasi di dalam subnet sebelum disiarkan secara lebih luas. Ini termasuk mengagregasi tanda tangan bersama-sama sehingga atestasi yang disiarkan mencakup `data` konsensus dan satu tanda tangan tunggal yang dibentuk dengan menggabungkan tanda tangan dari semua validator yang setuju dengan `data` tersebut. Hal ini dapat diperiksa menggunakan `aggregation_bits` karena ini menyediakan indeks dari setiap validator di dalam komite mereka (yang ID-nya disediakan di `data`) yang dapat digunakan untuk meminta tanda tangan individu.

Di setiap Epok, 16 validator di setiap subnet dipilih untuk menjadi `aggregators`. Agregator mengumpulkan semua atestasi yang mereka dengar melalui jaringan gosip yang memiliki `data` yang setara dengan milik mereka sendiri. Pengirim dari setiap atestasi yang cocok dicatat di dalam `aggregation_bits`. Agregator kemudian menyiarkan agregat atestasi ke jaringan yang lebih luas.

Ketika seorang validator dipilih untuk menjadi pengusul blok, mereka mengemas atestasi teragregasi dari subnet hingga slot terbaru ke dalam blok baru.

### Siklus hidup penyertaan atestasi {#attestation-inclusion-lifecycle}

1. Pembuatan (Generation)
2. Propagasi
3. Agregasi
4. Propagasi
5. Penyertaan (Inclusion)

Siklus hidup atestasi diuraikan dalam skema di bawah ini:

![attestation lifecycle](./attestation_schematic.png)

## Imbalan {#rewards}

Validator diberikan imbalan karena mengirimkan atestasi. Imbalan atestasi bergantung pada tanda partisipasi (sumber, target, dan head), imbalan dasar, dan tingkat partisipasi.

Masing-masing tanda partisipasi dapat bernilai benar atau salah, bergantung pada atestasi yang dikirimkan dan penundaan penyertaannya.

Skenario terbaik terjadi ketika ketiga tanda tersebut bernilai benar, dalam hal ini seorang validator akan mendapatkan (per tanda yang benar):

`reward += base reward * flag weight * flag attesting rate / 64`

Tingkat atestasi tanda diukur menggunakan jumlah saldo efektif dari semua validator yang melakukan atestasi untuk tanda yang diberikan dibandingkan dengan total saldo efektif aktif.

### Imbalan dasar {#base-reward}

Imbalan dasar dihitung berdasarkan jumlah validator yang melakukan atestasi dan saldo Ether yang di-stake efektif mereka:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Penundaan penyertaan {#inclusion-delay}

Pada saat validator memberikan suara pada ujung rantai (`block n`), `block n+1` belum diusulkan. Oleh karena itu, atestasi secara alami disertakan **satu blok kemudian** sehingga semua atestasi yang memilih `block n` sebagai ujung rantai disertakan dalam `block n+1` dan, **penundaan penyertaan** adalah 1. Jika penundaan penyertaan berlipat ganda menjadi dua slot, imbalan atestasi berkurang setengahnya, karena untuk menghitung imbalan atestasi, imbalan dasar dikalikan dengan kebalikan dari penundaan penyertaan.

### Skenario atestasi {#attestation-scenarios}

#### Validator Pemilih yang Hilang {#missing-voting-validator}

Validator memiliki waktu maksimum 1 Epok untuk mengirimkan atestasi mereka. Jika atestasi terlewat di Epok 0, mereka dapat mengirimkannya dengan penundaan penyertaan di Epok 1.

#### Agregator yang Hilang {#missing-aggregator}

Terdapat total 16 Agregator per Epok. Selain itu, validator acak berlangganan ke **dua subnet selama 256 Epok** dan berfungsi sebagai cadangan jika agregator hilang.

#### Pengusul blok yang hilang {#missing-block-proposer}

Perhatikan bahwa dalam beberapa kasus, agregator yang beruntung juga dapat menjadi pengusul blok. Jika atestasi tidak disertakan karena pengusul blok telah hilang, pengusul blok berikutnya akan mengambil atestasi teragregasi tersebut dan menyertakannya ke dalam blok berikutnya. Namun, **penundaan penyertaan** akan bertambah satu.

## Bacaan lebih lanjut {#further-reading}

- [Atestasi dalam spesifikasi konsensus beranotasi Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Atestasi di eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_