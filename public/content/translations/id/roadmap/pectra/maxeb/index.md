---
title: Pectra MaxEB
description: Pelajari lebih lanjut tentang MaxEB dalam rilis Pectra
lang: id
---

# MaxEB {#maxeb}

_tl;dr:_ Hard fork Pectra memungkinkan validator Ethereum untuk memilih saldo efektif maksimum yang lebih tinggi dan peracikan dengan mengonversi kredensial penarikan **Tipe 1** ke **Tipe 2**. Alat resmi untuk melakukan ini adalah Landasan peluncuran. Operasi ini tidak dapat dibatalkan.

## Overview {#overview}

### Siapa yang terkena dampak? {#who-is-affected}

Siapa pun yang menjalankan validator - kemungkinan besar adalah seseorang yang mengetahui indeks (misalnya, [Validator #12345](https://beaconcha.in/validator/12345)) dari validator yang mereka kendalikan. Jika Anda menggunakan protokol untuk menjalankan validator (misalnya, Lido CSM atau Rocket Pool), Anda harus memeriksa dengan mereka untuk melihat apakah dan kapan mereka mendukung maxEB.

Jika Anda mempertaruhkan menggunakan token staking likuid (misalnya rETH atau stETH), tidak ada tindakan yang diperlukan atau direkomendasikan.

### Apa itu "maxEB"? {#what-is-maxeb}

maxEB = Saldo Efektif MAKSIMUM suatu validator. Hingga hard fork Pectra, setiap validator memperoleh maksimum 32 ETH. Setelah Pectra, validator memiliki opsi untuk memperoleh penghasilan dari saldo antara 32 dan 2048 ETH, dalam kelipatan 1 ETH dengan menyetujui perubahan tersebut.

### Bagaimana cara validator ikut serta? {#how-does-a-validator-opt-in}

Seorang validator menyetujui perubahan maxEB dengan mengonversi kredensial penarikan **Tipe 1** ke **Tipe 2**. Ini dapat dilakukan di [Launchpad (Validator Actions)](https://launchpad.ethereum.org/validator-actions) setelah hard fork Pectra aktif. Seperti halnya **Tipe 0** → **Tipe 1**, konversi dari **Tipe 1** → **Tipe 2** merupakan proses yang tidak dapat diubah kembali.

### Apa itu kredensial penarikan? {#whats-a-withdrawal-credential}

Saat Anda menjalankan validator, Anda memiliki serangkaian kredensial penarikan. Ini dapat ditemukan dalam data json setoran Anda atau Anda dapat melihatnya di beaconcha.in [tab setoran](https://beaconcha.in/validator/12345#deposits) validator Anda.

1. **ketik 0** kredensial penarikan: Jika kredensial penarikan validator Anda dimulai dengan `0x00...`, Anda telah menyetor sebelum hard fork Shapella dan belum menetapkan alamat penarikan.

![Type 0 withdrawal credential](./0x00-wd.png)

2. Kredensial penarikan **tipe 1**: Jika kredensial penarikan validator Anda dimulai dengan `0x01...`, Anda melakukan penyetoran setelah hard fork Shapella atau telah mengonversi kredensial **Tipe 0** Anda ke kredensial **Tipe 1**.

![Type 1 withdrawal credential](./0x01-wd.png)

3. **Kredensial penarikan tipe 2**: Jenis kredensial penarikan baru ini akan dimulai dengan `0x02...` dan akan diaktifkan setelah Pectra. Validator dengan kredensial penarikan **Tipe 2** terkadang disebut "**validator peracikan**"

| **Diizinkan**     | **Tidak diizinkan** |
| ----------------- | ------------------- |
| Tipe 0 → Tipe 1   | ❌ Tipe 0 → Tipe 2   |
| ✅ Tipe 1 → Tipe 2 | ❌ Tipe 1 → Tipe 0   |
|                   | ❌ Tipe 2 → Tipe 1   |
|                   | ❌ Tipe 2 → Tipe 0   |

### Risiko {#risks}

MaxEB memungkinkan validator untuk mengirim seluruh saldonya ke validator lain. Pengguna yang mengirimkan permintaan konsolidasi harus memverifikasi sumber dan isi transaksi yang mereka tandatangani. Alat resmi untuk memanfaatkan fitur maxEB adalah Launchpad. Jika Anda memutuskan untuk menggunakan alat pihak ketiga, Anda harus memeriksa bahwa:

- Pubkey dan alamat penarikan validator sumber cocok dengan validator yang mereka kendalikan
- Pubkey validator target benar dan milik mereka
- Permintaan tersebut adalah konversi, bukan konsolidasi, jika mereka tidak bermaksud mengirim dana ke validator lain
- Transaksi sedang ditandatangani oleh alamat penarikan yang benar

Kami **sangat menyarankan** mendiskusikan alat pihak ketiga apa pun yang ingin Anda gunakan dengan [komunitas ethstaker](https://ethstaker.org/about). Ini adalah tempat yang berguna untuk memeriksa kewarasan pendekatan Anda dan menghindari kesalahan. Jika Anda menggunakan alat yang berbahaya atau salah konfigurasi, **seluruh saldo validator Anda dapat dikirim ke validator yang tidak Anda kendalikan** — tanpa cara untuk mendapatkannya kembali.

## Detail teknis {#technical-details}

### Aliran {#the-flow}

Akan ada dua penggunaan operasi `consolidationrequest`:

1. Mengonversi validator yang ada dari validator **Tipe 1** ke validator **Tipe 2**
2. Menggabungkan validator lain ke dalam validator **Tipe 2** yang ada

Dalam konversi validator **Tipe 1** ke **Tipe 2**, _sumber_ dan _target_ akan menjadi validator yang Anda konversi. Operasi ini akan membutuhkan biaya gas dan akan diantrekan di belakang permintaan konsolidasi lainnya. Antrian ini **terpisah** dari antrian deposit dan tidak terpengaruh oleh deposit validator baru dan dapat dilihat di [pectrified.com](https://pectrified.com/).

Untuk mengkonsolidasikan validator, Anda harus memiliki _validator target_ yang memiliki kredensial penarikan **Tipe 2**. Ini adalah tujuan dari setiap saldo validator yang dikonsolidasikan, dan indeks yang dipertahankan.

### Persyaratan untuk konversi ke Tipe 2 {#requirements-for-converting-to-type-2}

Ini akan diperlukan untuk validator pertama yang Anda ubah ke **Tipe 2**. Indeks validator ini dipertahankan dan aktif. Untuk konversi, _validator sumber_ == _validator target._

Validator harus...

- aktiflah
- memiliki kredensial penarikan **Tipe 1**
- tidak berada dalam keadaan keluar (atau terpotong)
- tidak memiliki penarikan tertunda yang dipicu secara manual (tidak berlaku untuk sapuan)

![ilustrasi konversi](./conversion.png)

### Persyaratan untuk konsolidasi {#requirements-for-consolidating}

Ini adalah _operasi yang sama_ seperti konversi tetapi ketika _validator sumber_ berbeda dari _validator target_. Indeks validator target dipertahankan dan menerima saldo dari validator sumber. Indeks validator sumber dimasukkan ke dalam status `EXITED`.

Dalam kasus ini, validator sumber memiliki semua persyaratan yang sama seperti di atas ditambah:

- telah aktif setidaknya selama ~27,3 jam (satu `SHARD_COMMITTEE_PERIOD`)

Validator harus target

- memiliki kredensial penarikan **Tipe 2**
- tidak berada dalam kondisi keluar.

![ilustrasi konsolidasi](./consolidation.png)

### Permintaan konsolidasi {#the-consolidation-request}

Permintaan konsolidasi akan ditandatangani oleh alamat penarikan yang terkait dengan validator sumber dan memiliki:

1. Alamat validator sumber (misalnya, `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Kunci publik validator sumber (misalnya, `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Kunci publik dari validator target tersebut

Dalam konversi, 2 & 3 akan sama. Operasi ini dapat dilakukan di [launchpad](https://launchpad.ethereum.org/).

### Persyaratan penandatanganan {#signing-requirements}

Untuk mengirimkan `ConsolidationRequest`, **alamat penarikan validator sumber** harus menandatangani permintaan. Ini membuktikan adanya kendali atas dana validator.

### Apa yang ditandatangani? {#what-is-signed}

[root penandatanganan](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) yang dipisahkan domain dari objek `ConsolidationRequest` digunakan.

- **domain:** `PERMINTAAN_KONSOLIDASI_DOMAIN`
- **menandatangani bidang akar:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `alamat_sumber`: `AlamatEksekusi`

**Tanda tangan BLS** yang dihasilkan diserahkan bersama permintaan.

Catatan: Penandatanganan dilakukan oleh alamat penarikan, bukan kunci validator.

### Penarikan sebagian {#partial-withdrawals}

Validator dengan kredensial **Tipe 1** mendapatkan pembersihan otomatis tanpa gas atas saldo berlebih mereka (apa pun di atas 32 ETH) ke alamat penarikan mereka. Karena **Tipe 2** memperbolehkan validator untuk menggabungkan saldo dalam kelipatan 1 ETH, validator tidak akan secara otomatis menyapu saldo hingga mencapai 2048 ETH. Penarikan sebagian pada validator **Tipe 2** harus dipicu secara manual dan akan memerlukan biaya gas.

## Peralatan konsolidasi {#consolidation-tooling}

Ada beberapa alat yang tersedia untuk mengelola konsolidasi. Alat resmi yang dibuat oleh yayasan ethereum adalah [launchpad](https://launchpad.ethereum.org/en/validator-actions). Ada juga alat pihak ketiga yang dibuat oleh entitas dari komunitas staking yang mungkin menawarkan fitur yang tidak disediakan oleh Landasan peluncuran. Meskipun peralatan di sini tidak diaudit atau didukung oleh Ethereum Foundation, peralatan berikut ini merupakan peralatan sumber terbuka yang dibuat oleh anggota komunitas yang dikenal.

| Peralatan                       | Situs web                                                                                                 | Sumber terbuka  | Pencipta                                       | Diaudit                                                                                                                                            | Antarmuka                                                                                   | Fitur-fitur penting                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Manajer Taruhan Pectra          | pectrastaking.com                                                                         | Ya, Apache 2,0  | [dermaga dua](https://piertwo.com/)            | Tidak                                                                                                                                              | Antarmuka Pengguna Web                                                                      | Wallet Connect, bekerja dengan SAFE                                                |
| Alat CLI Ops Validator Pectra   | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract)                                              | Ya, MIT         | [luganodes](https://www.luganodes.com/)        | Ya, quantstamp [Mei 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Baris perintahBaris perintah                                                                | Pengelompokan, untuk banyak validator sekaligus                                    |
| Sangat halus                    | [github](https://github.com/wealdtech/ethereal)                                                           | Ya, Apache 2,0  | [Jim McDonald](https://www.attestant.io/team/) | Tidak                                                                                                                                              | Baris perintahBaris perintah                                                                | Set fitur lengkap untuk validator dan manajemen node                               |
| Sirene                          | [GitHub](https://github.com/sigp/siren)                                                                   | Ya, Apache 2,0  | [sigma prima](https://sigmaprime.io/)          | Tidak                                                                                                                                              | Beberapa baris perintah, tetapi terutama UI web                                             | Hanya berfungsi jika Anda menggunakan klien konsensus Lighthouse                   |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Ya, lisensi MIT | [Stakely](https://stakely.io/)                 | Tidak                                                                                                                                              | UI Web, dihosting oleh Stakely dan siap untuk di-host sendiri secara bebas. | Mendukung koneksi dompet utama termasuk Safe dengan WalletConnect. |

## FAQ {#faq}

### Apakah ikut serta mengubah keberuntungan atau imbalan proposal saya? {#change-luck-or-rewards}

Tidak. Memilih untuk ikut serta tidak mengurangi perubahan proposal Anda - tugas dan pemilihan proposal Anda tetap sama. Sebagai contoh, jika Anda memiliki dua validator 32 ETH vs satu validator 64 ETH, Anda akan memiliki total peluang yang sama untuk dipilih untuk mengajukan blok dan mendapatkan hadiah.

### Apakah memilih untuk ikut serta akan mengubah risiko pemotongan saya? {#change-slashing-risk}

Untuk operator yang lebih kecil atau tidak profesional, jawaban singkatnya adalah tidak. Jawaban yang lebih panjang adalah, untuk operator profesional yang menjalankan banyak validator per node dengan peringatan cepat, konsolidasi ke dalam lebih sedikit validator dapat mengurangi kemampuan mereka untuk bereaksi terhadap pemotongan dan mencegah kejadian cascade. Pemotongan awal _penalti_ untuk semua validator telah dikurangi secara dramatis dari 1 ETH (per 32 ETH) menjadi 0,0078125 ETH (per 32 ETH) untuk mengimbangi risiko ini.

### Apakah saya harus keluar dari validator saya untuk mengonversi? {#exit-validator}

Tidak. Anda dapat mengonversi di tempat tanpa keluar.

### Berapa lama waktu yang dibutuhkan untuk mengonversi / mengkonsolidasikan? {#how-long}

Minimal 27,3 jam tetapi konsolidasi juga tunduk pada antrean. Antrian ini tidak bergantung pada antrian deposit dan penarikan dan tidak terpengaruh oleh antrian tersebut.

### Dapatkah saya menyimpan indeks validator saya? {#keep-validator-index}

Ya. Konversi di tempat mempertahankan indeks validator yang sama. Jika Anda mengkonsolidasikan beberapa validator, Anda hanya dapat menyimpan indeks dari _target validator_.

### Apakah saya akan melewatkan pengesahan? {#miss-attestations}

Selama konsolidasi ke validator lain, validator sumber akan keluar dan ada waktu tunggu ~27 jam sebelum saldo aktif di validator target. Periode ini **tidak mempengaruhi metrik kinerja**.

### Apakah saya akan dikenakan penalti? {#incur-penalties}

Tidak. Selama validator Anda online, Anda tidak akan dikenai penalti.

### Apakah alamat penarikan dari validator yang dikonsolidasikan harus sama? {#withdrawal-addresses-match}

Tidak. Tetapi _sumber_ harus mengesahkan permintaan dari alamatnya sendiri.

### Apakah hadiah saya akan bertambah setelah melakukan konversi? {#rewards-compound}

Ya. Dengan kredensial **Tipe 2**, hadiah di atas 32 ETH secara otomatis di-restake - tetapi tidak secara instan. Karena adanya buffer kecil (disebut [_hysteresis_] (https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), saldo Anda harus mencapai **sekitar 1,25 ETH lebih banyak** sebelum ekstra tersebut di-restake. Jadi, alih-alih majemuk pada 33,0 ETH, itu terjadi pada 33,25 (saldo efektif = 33 ETH), lalu 34,25 (saldo efektif = 34 ETH), dan seterusnya.

### Apakah saya masih bisa mendapatkan sapuan otomatis setelah melakukan konversi? {#automatic-sweep}

Sapuan otomatis hanya akan terjadi pada saldo berlebih di atas tahun 2048. Untuk semua penarikan sebagian lainnya, Anda harus melakukannya secara manual.

### Dapatkah saya berubah pikiran dan kembali dari Tipe 2 ke Tipe 1? {#go-back-to-type1}

Tidak. Pengubahan ke **Tipe 2** tidak dapat diubah.

### Jika saya ingin menggabungkan beberapa validator, apakah saya harus mengonversi setiap validator ke Tipe 2 terlebih dahulu? {#consolidate-multiple-validators}

Tidak! Ubah satu validator menjadi Tipe 2, lalu gunakan itu sebagai target. Semua validator lain yang dikonsolidasikan ke dalam target Tipe 2 tersebut dapat berupa Tipe 1 atau Tipe 2

### Validator saya sedang offline atau di bawah 32 ETH - apakah saya masih bisa mengonversinya? {#offline-or-below-32eth}

Ya. Selama akun tersebut masih aktif (belum keluar) dan Anda bisa masuk dengan alamat penarikannya, Anda bisa mengonversinya.

## Sumber daya {#resources}

- [Spesifikasi konsensus Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md): Ini adalah versi ‘paling benar’ yang harus Anda andalkan. Jika ragu, bacalah spesifikasinya
- Tidak semua orang merasa nyaman mengarungi kode, jadi [maxEB-GPT ini](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) dapat membantu menginterpretasikan spesifikasi. _Keterangan: Spesifikasi, bukan AI, harus diandalkan sebagai kebenaran, karena AI dapat salah menafsirkan informasi atau jawaban halusinasi_
- [pectrified.com](https://pectrified.com/): Melihat status konsolidasi, setoran, dan waktu tunggu antrian
- [Ethereal](https://github.com/wealdtech/ethereal): Alat bantu CLI yang dibuat oleh komunitas untuk mengelola tugas-tugas validator umum
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Kontrak yang dibuat oleh komunitas yang memungkinkan beberapa validator Ethereum untuk disimpan dalam satu transaksi
