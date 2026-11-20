---
title: Atestasi
description: Deskripsi tentang atestasi pada proof-of-stake Ethereum.
lang: id
---

Seorang validator diharapkan untuk membuat, menandatangani, dan menyiarkan sebuah atestasi selama setiap Epok. Halaman ini menguraikan seperti apa bentuk atestasi ini dan bagaimana mereka diproses serta dikomunikasikan di antara klien konsensus.

## Apa itu atestasi? {#what-is-an-attestation}

Setiap [Epok](/glossary/#epoch) (6,4 menit) seorang validator menyiarkan sebuah atestasi ke jaringan. Atestasi tersebut adalah untuk slot tertentu di dalam Epok. Tujuan dari atestasi ini adalah untuk memberikan suara yang mendukung pandangan validator terhadap rantai, khususnya kepala rantai, titik periksa terjustifikasi yang paling baru, dan titik periksa pada awal Epok saat ini (dikenal sebagai titik periksa `source` dan `target`). Informasi ini digabungkan untuk semua validator yang berpartisipasi, memungkinkan jaringan untuk mencapai konsensus tentang state dari rantai blok.

Sejak [pembaruan Pectra](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)), sebuah atestasi dari validator tunggal dan atestasi agregat memiliki format yang berbeda. Atestasi validator tunggal berisi:

- `committee_index`: komite tempat validator tersebut tergabung dalam slot yang diberikan
- `attester_index`: indeks validator
- `data`: detail yang berkaitan dengan atestasi, seperti yang didefinisikan di bawah ini
- `signature`: tanda tangan BLS validator atas `data`

Tugas pertama untuk validator yang melakukan atestasi adalah membangun `data`. `data` berisi informasi berikut:

- `slot`: Nomor slot yang dirujuk oleh atestasi
- `index`: Diatur ke `0` sejak Pectra. Komite diidentifikasi di luar `data` (oleh `committee_index`, atau oleh `committee_bits` dalam sebuah agregat) sehingga suara dari komite yang berbeda memiliki `data` yang identik dan dapat diagregasi bersama. Sebelum Pectra, bidang ini mengidentifikasi komite
- `beacon_block_root`: Hash akar dari blok yang dilihat validator di kepala rantai (hasil dari penerapan algoritma pilihan percabangan)
- `source`: Bagian dari suara finalitas yang menunjukkan apa yang dilihat validator sebagai titik periksa terjustifikasi yang paling baru
- `target`: Bagian dari suara finalitas yang menunjukkan apa yang dilihat validator sebagai titik periksa pada awal Epok saat ini (blok pada slot pertamanya, atau blok terbaru sebelumnya jika slot tersebut kosong)

Setelah `data` dibangun, validator menandatanganinya dan menyiarkan atestasi ke [subnet](#aggregated-attestation) untuk komitenya.

### Atestasi agregat {#aggregated-attestation}

Ada overhead yang substansial terkait dengan pengiriman data ini di sekitar jaringan untuk setiap validator. Oleh karena itu, atestasi dari validator individu diagregasi di dalam subnet sebelum disiarkan lebih luas. Ini termasuk mengagregasi tanda tangan bersama-sama sehingga atestasi yang disiarkan mencakup `data` konsensus dan tanda tangan tunggal yang dibentuk dengan menggabungkan tanda tangan dari semua validator yang setuju dengan `data` tersebut. Sebuah atestasi agregat berisi:

- `aggregation_bits`: sebuah bitlist dengan satu bit per anggota dari setiap komite yang disertakan, di mana posisinya memetakan ke posisi validator di komitenya; nilai (0/1) menunjukkan apakah tanda tangan validator tersebut disertakan
- `data`: data atestasi yang ditandatangani oleh setiap validator yang disertakan
- `signature`: tanda tangan BLS yang mengagregasi tanda tangan dari validator yang disertakan
- `committee_bits`: anggota komite mana yang dicakup oleh `aggregation_bits`

Siapa pun dapat memeriksa tanda tangan agregat terhadap kunci publik gabungan dari validator yang bit-nya diatur.

Di setiap slot, sekitar 16 anggota dari setiap komite dipilih untuk menjadi `aggregators` (`TARGET_AGGREGATORS_PER_COMMITTEE`). Seorang validator mengetahui apakah ia dipilih dari tanda tangannya sendiri atas nomor slot. Agregator mengumpulkan semua atestasi yang mereka dengar di subnet komite mereka yang memiliki `data` yang sama dengan milik mereka, dan menggabungkannya, mencatat pengirim masing-masing di `aggregation_bits`. Agregator kemudian menyiarkan agregat tersebut ke jaringan yang lebih luas.

Ketika seorang validator dipilih untuk menjadi pengusul blok, mereka menyertakan atestasi agregat dari slot terbaru di blok baru. Sejak Pectra, pengusul dapat menggabungkan agregat dari komite berbeda yang berbagi `data` yang sama menjadi satu atestasi, dan sebuah blok dapat menampung hingga 8 di antaranya.

### Siklus hidup penyertaan atestasi {#attestation-inclusion-lifecycle}

1. Pembuatan
2. Propagasi
3. Agregasi
4. Propagasi
5. Penyertaan

Siklus hidup atestasi diuraikan dalam skema di bawah ini:

<AttestationsDiagram />

## Imbalan {#rewards}

Validator diberi imbalan karena mengirimkan atestasi. Imbalan atestasi bergantung pada tanda partisipasi (sumber, target, dan kepala), imbalan dasar, dan tingkat partisipasi.

Masing-masing tanda partisipasi dapat bernilai benar (true) atau salah (false), bergantung pada atestasi yang dikirimkan dan penundaan penyertaannya.

Skenario terbaik terjadi ketika ketiga tanda bernilai benar, dalam hal ini validator akan mendapatkan (per tanda yang benar):

`reward += base reward * flag weight * flag attesting rate / 64`

Tingkat atestasi tanda diukur menggunakan jumlah saldo efektif dari semua validator yang melakukan atestasi untuk tanda yang diberikan dibandingkan dengan total saldo efektif aktif.

### Imbalan dasar {#base-reward}

Imbalan dasar dihitung berdasarkan jumlah validator yang melakukan atestasi dan saldo Ether yang di-stake efektif mereka:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Penundaan penyertaan {#inclusion-delay}

Pada saat validator memberikan suara pada kepala rantai (`block n`), `block n+1` belum diusulkan. Oleh karena itu, atestasi secara alami disertakan **satu blok kemudian** sehingga semua atestasi yang memilih `block n` sebagai kepala rantai disertakan dalam `block n+1` dan, **penundaan penyertaan** adalah 1. Penundaan penyertaan menentukan tanda partisipasi mana yang diperoleh oleh sebuah atestasi:

- `head`: hanya jika penundaan penyertaan tepat 1 slot
- `source`: jika penundaan penyertaan paling banyak 5 slot (akar kuadrat bilangan bulat dari 32 slot dalam sebuah Epok)
- `target`: kapan pun atestasi disertakan (sejak pembaruan Deneb, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

Jadi, atestasi yang disertakan terlambat dua slot kehilangan imbalan kepalanya tetapi masih mendapatkan imbalan sumber dan target.

### Skenario atestasi {#attestation-scenarios}

#### Validator Pemilih yang Hilang {#missing-voting-validator}

Sebuah atestasi dapat disertakan dalam blok mana pun dari slot setelah dibuat hingga akhir Epok berikutnya. Jika atestasi dari Epok 0 tidak disertakan dalam blok selama Epok 0, atestasi tersebut masih dapat disertakan di Epok 1, dengan penundaan penyertaan yang lebih lama.

#### Agregator yang Hilang {#missing-aggregator}

Setiap komite menargetkan sekitar 16 agregator di setiap slot, jadi satu agregator yang hilang jarang menghentikan atestasi komite untuk diagregasi. Secara terpisah, setiap simpul suar tetap berlangganan ke **dua subnet selama 256 Epok** pada satu waktu, dipilih dari ID node-nya, yang menjaga setiap subnet terhubung dengan baik.

#### Pengusul blok yang hilang {#missing-block-proposer}

Perhatikan bahwa dalam beberapa kasus, agregator yang beruntung juga dapat menjadi pengusul blok. Jika atestasi tidak disertakan karena pengusul blok telah hilang, pengusul blok berikutnya akan mengambil atestasi agregat tersebut dan menyertakannya ke dalam blok berikutnya. Namun, **penundaan penyertaan** akan bertambah satu.

## Bacaan lebih lanjut {#further-reading}

- [Atestasi dalam spesifikasi konsensus beranotasi Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Atestasi di eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Atestasi dalam spesifikasi konsensus Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
