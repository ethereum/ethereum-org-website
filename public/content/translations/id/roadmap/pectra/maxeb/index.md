---
title: Pectra MaxEB
description: Pelajari lebih lanjut tentang MaxEB dalam rilis Pectra
lang: id
---

# MaxEB {#maxeb}

*Singkatnya:* Hard fork Pectra memungkinkan validator Ethereum untuk memilih saldo efektif maksimum yang lebih tinggi dan compounding (penggabungan) dengan mengonversi kredensial penarikan **Tipe 1** menjadi **Tipe 2**. Alat resmi untuk melakukan ini adalah Launchpad. Operasi ini tidak dapat dibatalkan.

## Ikhtisar {#overview}

### Siapa yang terdampak? {#who-is-affected}

Siapa pun yang menjalankan validator - ini kemungkinan adalah seseorang yang mengetahui indeks (misalnya, [Validator #12345](https://beaconcha.in/validator/12345)) dari validator yang mereka kendalikan. Jika Anda menggunakan protokol untuk menjalankan validator (misalnya, Lido CSM atau Rocket Pool), Anda harus memeriksa dengan mereka untuk melihat apakah dan kapan mereka mendukung maxEB.

Jika Anda mengunci menggunakan token liquid staking (misalnya, rETH atau stETH), tidak ada tindakan yang diperlukan atau disarankan.

### Apa itu "maxEB"? {#what-is-maxeb}

maxEB = Saldo Efektif Maksimum (MAXimum Effective Balance) dari sebuah validator. Hingga hard fork Pectra, setiap validator mendapatkan penghasilan dari maksimum 32 ETH. Setelah Pectra, validator memiliki opsi untuk mendapatkan penghasilan dari saldo berapa pun antara 32 dan 2048 ETH, dalam kelipatan 1 ETH dengan memilih untuk mengikuti perubahan tersebut.

### Bagaimana cara validator ikut serta? {#how-does-a-validator-opt-in}

Sebuah validator ikut serta dalam perubahan maxEB dengan mengonversi kredensial penarikan **Tipe 1** menjadi **Tipe 2**. Ini dapat dilakukan di [Launchpad (Tindakan Validator)](https://launchpad.ethereum.org/validator-actions) setelah hard fork Pectra ditayangkan. Sama seperti **Tipe 0** → **Tipe 1**, konversi dari **Tipe 1** → **Tipe 2** adalah proses yang tidak dapat dibatalkan.

### Apa itu kredensial penarikan? {#whats-a-withdrawal-credential}

Saat Anda menjalankan validator, Anda memiliki serangkaian kredensial penarikan. Ini dapat ditemukan di json data deposit Anda atau Anda dapat melihatnya di [tab deposit](https://beaconcha.in/validator/12345#deposits) beaconcha.in validator Anda.

1. Kredensial penarikan **Tipe 0**: Jika kredensial penarikan validator Anda dimulai dengan `0x00...`, Anda melakukan deposit sebelum hard fork Shapella dan belum mengatur alamat penarikan.

![Kredensial penarikan Tipe 0](./0x00-wd.png)

2. Kredensial penarikan **Tipe 1**: Jika kredensial penarikan validator Anda dimulai dengan `0x01...`, Anda melakukan deposit setelah hard fork Shapella atau sudah mengonversi kredensial **Tipe 0** Anda menjadi kredensial **Tipe 1**.

 ![Kredensial penarikan Tipe 1](./0x01-wd.png)

3. Kredensial penarikan **Tipe 2**: Jenis kredensial penarikan baru ini akan dimulai dengan `0x02...` dan akan diaktifkan setelah Pectra. Validator dengan kredensial penarikan **Tipe 2** terkadang disebut "**validator compounding**"

| **Diizinkan** | **Tidak diizinkan** |
| --- | --- |
| ✅ Tipe 0 → Tipe 1 | ❌ Tipe 0 → Tipe 2 |
| ✅ Tipe 1 → Tipe 2 | ❌ Tipe 1 → Tipe 0 |
|  | ❌ Tipe 2 → Tipe 1 |
|  | ❌ Tipe 2 → Tipe 0 |

### Risiko {#risks}

MaxEB memungkinkan sebuah validator untuk mengirim seluruh saldonya ke validator lain. Pengguna yang mengirimkan permintaan konsolidasi harus memverifikasi sumber dan isi transaksi yang mereka tandatangani. Alat resmi untuk memanfaatkan fitur maxEB adalah Launchpad. Jika Anda memutuskan untuk menggunakan alat pihak ketiga, Anda harus memverifikasi bahwa:

- Kunci publik (pubkey) dan alamat penarikan validator sumber cocok dengan validator yang mereka kendalikan
- Kunci publik validator target sudah benar dan milik mereka
- Permintaan tersebut adalah konversi, bukan konsolidasi, jika mereka tidak berniat mengirim dana ke validator lain
- Transaksi ditandatangani oleh alamat penarikan yang benar

Kami **sangat menyarankan** untuk mendiskusikan alat pihak ketiga apa pun yang Anda rencanakan untuk digunakan dengan [komunitas EthStaker](https://ethstaker.org/about). Ini adalah tempat yang berguna untuk memeriksa kembali pendekatan Anda dan menghindari kesalahan. Jika Anda menggunakan alat yang berbahaya atau salah dikonfigurasi, **seluruh saldo validator Anda dapat dikirim ke validator yang tidak Anda kendalikan** — tanpa ada cara untuk mendapatkannya kembali.

## Detail teknis {#technical-details}

### Alur {#the-flow}

Akan ada dua penggunaan operasi `ConsolidationRequest`:

1. Mengonversi validator yang ada dari validator **Tipe 1** menjadi **Tipe 2**
2. Mengonsolidasikan validator lain ke dalam validator **Tipe 2** yang ada

Dalam konversi validator **Tipe 1** menjadi **Tipe 2**, baik *sumber* maupun *target* akan menjadi validator yang Anda konversi. Operasi ini akan memakan biaya gas dan akan diantrekan di belakang permintaan konsolidasi lainnya. Antrean ini **terpisah** dari antrean deposit dan tidak terpengaruh oleh deposit validator baru serta dapat dilihat di [pectrified.com](https://pectrified.com/).

Untuk mengonsolidasikan validator, Anda harus memiliki *validator target* yang memiliki kredensial penarikan **Tipe 2**. Ini adalah tujuan dari setiap saldo validator yang dikonsolidasikan, dan indeks yang dipertahankan.

### Persyaratan untuk mengonversi ke Tipe 2 {#requirements-for-converting-to-type-2}

Ini akan diperlukan untuk validator pertama yang Anda konversi ke **Tipe 2**. Indeks validator ini dipertahankan dan aktif. Untuk sebuah konversi, *validator sumber* == *validator target.*

Validator harus...

- aktif
- memiliki kredensial penarikan **Tipe 1**
- tidak dalam status keluar (atau dipotong/slashed)
- tidak memiliki penarikan yang dipicu secara manual yang tertunda (tidak berlaku untuk penyapuan/sweeps)

![ilustrasi konversi](./conversion.png)

### Persyaratan untuk mengonsolidasikan {#requirements-for-consolidating}

Ini adalah *operasi yang sama* dengan mengonversi tetapi terjadi ketika *validator sumber* berbeda dari *validator target*. Indeks validator target dipertahankan dan menerima saldo dari validator sumber. Indeks validator sumber dimasukkan ke dalam status `EXITED` (keluar).

Dalam hal ini, validator sumber memiliki semua persyaratan yang sama seperti di atas ditambah:

- telah aktif setidaknya selama ~27,3 jam (satu `SHARD_COMMITTEE_PERIOD`)

Validator target harus

- memiliki kredensial penarikan **Tipe 2**
- tidak dalam status keluar.

![ilustrasi konsolidasi](./consolidation.png)

### Permintaan konsolidasi {#the-consolidation-request}

Permintaan konsolidasi akan ditandatangani oleh alamat penarikan yang terkait dengan validator sumber dan memiliki:

1. Alamat validator sumber (misalnya, `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Kunci publik validator sumber (misalnya, `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Kunci publik dari validator target tersebut

Dalam sebuah konversi, 2 & 3 akan sama. Operasi ini dapat dilakukan di [Launchpad](https://launchpad.ethereum.org/).

### Persyaratan penandatanganan {#signing-requirements}

Untuk mengirimkan `ConsolidationRequest`, **alamat penarikan dari validator sumber** harus menandatangani permintaan tersebut. Ini membuktikan kendali atas dana validator.

### Apa yang ditandatangani? {#what-is-signed}

Sebuah [akar penandatanganan (signing root)](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root) yang dipisahkan domain dari objek `ConsolidationRequest` digunakan.

- **Domain:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Bidang akar penandatanganan:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

**Tanda tangan BLS** yang dihasilkan dikirimkan bersama dengan permintaan tersebut.

Catatan: Penandatanganan dilakukan oleh alamat penarikan, bukan kunci validator.

### Penarikan sebagian {#partial-withdrawals}

Validator dengan kredensial **Tipe 1** mendapatkan penyapuan otomatis tanpa biaya gas untuk kelebihan saldo mereka (apa pun di atas 32 ETH) ke alamat penarikan mereka. Karena **Tipe 2** memungkinkan validator untuk menggabungkan (compound) saldo dalam kelipatan 1 ETH, ia tidak akan secara otomatis menyapu saldo hingga mencapai 2048 ETH. Penarikan sebagian pada validator **Tipe 2** harus dipicu secara manual dan akan memakan biaya gas.

## Alat konsolidasi {#consolidation-tooling}

Ada beberapa alat yang tersedia untuk mengelola konsolidasi. Alat resmi, yang dibuat oleh Ethereum Foundation, adalah [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Ada juga alat pihak ketiga yang dibuat oleh entitas dari komunitas staking yang mungkin menawarkan fitur yang tidak disediakan oleh Launchpad. Meskipun alat-alat di sini tidak diaudit atau didukung oleh Ethereum Foundation, berikut ini adalah alat sumber terbuka (open source) oleh anggota komunitas yang dikenal.

| Alat | Situs Web | Sumber terbuka | Pembuat | Diaudit | Antarmuka | Fitur penting |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Ya, Apache 2.0 | [Pier Two](https://piertwo.com/) | Tidak | Web UI | Wallet Connect, berfungsi dengan SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Ya, MIT | [Luganodes](https://www.luganodes.com/) | Ya, Quantstamp [Mei 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Baris perintah | Batching, untuk banyak validator sekaligus |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Ya, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Tidak | Baris perintah | Kumpulan fitur lengkap untuk manajemen validator dan node |
| Siren | [GitHub](https://github.com/sigp/siren) | Ya, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | Tidak | Beberapa baris perintah, tetapi utamanya Web UI | Hanya berfungsi jika Anda menggunakan klien konsensus Lighthouse |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Ya, lisensi MIT | [Stakely](https://stakely.io/) | Tidak | Web UI, di-host oleh stakely dan siap untuk di-host sendiri secara bebas | Mendukung koneksi dompet utama termasuk safe dengan walletconnect |

## FAQ {#faq}

### Apakah ikut serta mengubah keberuntungan proposal atau hadiah saya? {#change-luck-or-rewards}

Tidak. Ikut serta tidak mengurangi peluang proposal Anda - tugas dan pemilihan proposal Anda tetap sama. Misalnya, jika Anda memiliki dua validator 32 ETH vs satu validator 64 ETH, Anda akan memiliki total peluang yang sama untuk dipilih mengusulkan blok dan mendapatkan hadiah.

### Apakah ikut serta mengubah risiko pemotongan (slashing) saya? {#change-slashing-risk}

Untuk operator yang lebih kecil atau tidak profesional, jawaban singkatnya adalah tidak. Jawaban yang lebih panjang adalah bahwa, untuk operator profesional yang menjalankan banyak validator per node dengan peringatan cepat, mengonsolidasikan menjadi lebih sedikit validator dapat mengurangi kemampuan mereka untuk bereaksi terhadap pemotongan dan mencegah peristiwa beruntun (cascade). *Hukuman* pemotongan awal untuk semua validator telah dikurangi secara dramatis dari 1 ETH (per 32 ETH) menjadi 0,0078125 ETH (per 32 ETH) untuk mengimbangi risiko ini.

### Apakah saya harus keluar dari validator saya untuk mengonversi? {#exit-validator}

Tidak. Anda dapat mengonversi di tempat tanpa keluar.

### Berapa lama waktu yang dibutuhkan untuk mengonversi / mengonsolidasikan? {#how-long}

Minimal 27,3 jam tetapi konsolidasi juga tunduk pada antrean. Antrean ini independen dari antrean deposit dan penarikan serta tidak terpengaruh olehnya.

### Bisakah saya mempertahankan indeks validator saya? {#keep-validator-index}

Ya. Konversi di tempat mempertahankan indeks validator yang sama. Jika Anda mengonsolidasikan beberapa validator, Anda hanya akan dapat mempertahankan indeks dari *validator target*.

### Apakah saya akan melewatkan pengesahan (attestations)? {#miss-attestations}

Selama konsolidasi ke validator lain, validator sumber dikeluarkan dan ada masa tunggu ~27 jam sebelum saldo aktif pada validator target. Periode ini **tidak memengaruhi metrik kinerja**.

### Apakah saya akan dikenakan penalti? {#incur-penalties}

Tidak. Selama validator Anda online, Anda tidak akan dikenakan penalti.

### Apakah alamat penarikan dari validator yang dikonsolidasikan harus cocok? {#withdrawal-addresses-match}

Tidak. Tetapi *sumber* harus mengotorisasi permintaan dari alamatnya sendiri.

### Apakah hadiah saya akan digabungkan (compound) setelah mengonversi? {#rewards-compound}

Ya. Dengan kredensial **Tipe 2**, hadiah di atas 32 ETH secara otomatis dikunci kembali (restaked) — tetapi tidak secara instan. Karena adanya penyangga kecil (disebut [*hysteresis*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), saldo Anda harus mencapai **sekitar 1,25 ETH lebih banyak** sebelum kelebihannya dikunci kembali. Jadi alih-alih menggabungkan pada 33,0 ETH, itu terjadi pada 33,25 (saldo efektif = 33 ETH), lalu 34,25 (saldo efektif = 34 ETH), dan seterusnya.

### Bisakah saya masih mendapatkan penyapuan otomatis setelah mengonversi? {#automatic-sweep}

Penyapuan otomatis hanya akan terjadi dengan kelebihan saldo di atas 2048. Untuk semua penarikan sebagian lainnya, Anda harus memicunya secara manual.

### Bisakah saya berubah pikiran dan kembali dari Tipe 2 ke Tipe 1? {#go-back-to-type1}

Tidak. Mengonversi ke **Tipe 2** tidak dapat dibatalkan.

### Jika saya ingin mengonsolidasikan beberapa validator, apakah saya harus mengonversi masing-masing ke Tipe 2 terlebih dahulu? {#consolidate-multiple-validators}

Tidak! Konversikan satu validator ke Tipe 2 lalu gunakan itu sebagai target. Semua validator lain yang dikonsolidasikan ke target Tipe 2 tersebut bisa berupa Tipe 1 atau Tipe 2.

### Validator saya offline atau di bawah 32 ETH - bisakah saya tetap mengonversinya? {#offline-or-below-32eth}

Ya. Selama masih aktif (belum keluar) dan Anda dapat menandatangani dengan alamat penarikannya, Anda dapat mengonversinya.

## Sumber daya {#resources}

- [Spesifikasi konsensus Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): Ini adalah versi 'paling benar' yang harus Anda andalkan. Jika ragu, bacalah spesifikasinya
- Tidak semua orang nyaman membaca kode, jadi [maxEB-GPT ini](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) dapat membantu menafsirkan spesifikasi tersebut. *Penafian: Spesifikasi, bukan AI, yang harus diandalkan sebagai kebenaran, karena AI mungkin salah menafsirkan informasi atau memberikan jawaban halusinasi*
- [pectrified.com](https://pectrified.com/): Lihat status konsolidasi, deposit, dan waktu tunggu antrean
- [Ethereal](https://github.com/wealdtech/ethereal): Alat CLI buatan komunitas untuk mengelola tugas-tugas validator umum
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Kontrak buatan komunitas yang memungkinkan beberapa validator Ethereum untuk didepositkan dalam satu transaksi