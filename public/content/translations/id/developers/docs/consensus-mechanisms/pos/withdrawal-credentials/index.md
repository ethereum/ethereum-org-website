---
title: Kredensial penarikan
description: Penjelasan tentang jenis kredensial penarikan validator (0x00, 0x01, 0x02) dan implikasinya bagi staker Ethereum.
lang: id
---

Setiap validator memiliki **kredensial penarikan** yang menentukan bagaimana dan di mana ETH yang di-stake dan hadiah mereka dapat ditarik. Jenis kredensial ditunjukkan oleh bita pertama: `0x00`, `0x01`, atau `0x02`. Memahami jenis-jenis ini penting bagi validator yang mengelola stake mereka.

## 0x00: Kredensial Pra-Shapella {#0x00-credentials}

Jenis `0x00` adalah format kredensial penarikan asli dari sebelum peningkatan Shapella (April 2023). Validator dengan jenis kredensial ini tidak memiliki alamat penarikan lapisan eksekusi yang diatur, yang berarti dana mereka tetap terkunci di lapisan konsensus. Jika Anda masih memiliki kredensial `0x00`, Anda harus meningkatkan ke `0x01` atau `0x02` sebelum Anda dapat menerima penarikan apa pun.

## 0x01: Kredensial penarikan warisan {#0x01-credentials}

Jenis `0x01` diperkenalkan dengan peningkatan Shapella dan menjadi standar bagi validator yang ingin mengatur alamat penarikan lapisan eksekusi. Dengan kredensial `0x01`:

- Saldo apa pun di atas 32 ETH akan **disapu secara otomatis** ke alamat penarikan Anda
- Keluar sepenuhnya (full exit) melalui antrean keluar standar
- Hadiah di atas 32 ETH tidak dapat berbunga majemuk (compound)—hadiah tersebut disapu keluar secara berkala

**Mengapa beberapa validator masih menggunakan 0x01:** Ini lebih sederhana dan familier. Banyak validator melakukan deposit setelah Shapella dan sudah memiliki jenis ini, dan ini berfungsi dengan baik bagi mereka yang menginginkan penarikan otomatis dari saldo berlebih.

**Mengapa ini tidak disarankan:** Dengan `0x01`, Anda kehilangan kemampuan untuk menggabungkan (compound) hadiah di atas 32 ETH. Setiap kelebihan disapu secara otomatis, yang membatasi potensi penghasilan validator Anda dan mengharuskan pengelolaan dana yang ditarik secara terpisah.

## 0x02: Kredensial penarikan majemuk (compounding) {#0x02-credentials}

Jenis `0x02` diperkenalkan dengan peningkatan Pectra dan merupakan **pilihan yang disarankan** untuk validator saat ini. Validator dengan kredensial `0x02` terkadang disebut "validator majemuk (compounding validators)".

Dengan kredensial `0x02`:

- Hadiah di atas 32 ETH **berbunga majemuk (compound)** dalam peningkatan 1 ETH hingga saldo efektif maksimum 2048 ETH
- Penarikan sebagian harus diminta secara manual (sapuan otomatis hanya terjadi di atas ambang batas 2048 ETH)
- Validator dapat mengonsolidasikan beberapa validator 32 ETH menjadi satu validator dengan saldo lebih tinggi
- Keluar sepenuhnya masih didukung melalui antrean keluar standar

Baik penarikan sebagian maupun konsolidasi dapat dilakukan melalui [Launchpad Validator Actions](https://launchpad.ethereum.org/en/validator-actions).

**Mengapa validator sebaiknya lebih memilih 0x02:** Ini menawarkan efisiensi modal yang lebih baik melalui bunga majemuk (compounding), kontrol lebih besar atas kapan penarikan terjadi, dan mendukung konsolidasi validator. Bagi solo staker yang mengumpulkan hadiah seiring waktu, ini berarti saldo efektif mereka—dan dengan demikian hadiah mereka—dapat tumbuh melampaui 32 ETH tanpa intervensi manual.

**Penting:** Setelah Anda mengonversi dari `0x01` ke `0x02`, Anda tidak dapat mengembalikannya.

Untuk panduan terperinci tentang mengonversi ke kredensial Tipe 2 dan fitur MaxEB, lihat [halaman penjelasan MaxEB](/roadmap/pectra/maxeb/).

## Apa yang harus saya pilih? {#what-should-i-pick}

- **Validator baru:** Pilih `0x02`. Ini adalah standar modern dengan bunga majemuk dan fleksibilitas yang lebih baik.
- **Validator 0x01 yang ada:** Pertimbangkan untuk mengonversi ke `0x02` jika Anda ingin hadiah berbunga majemuk di atas 32 ETH atau berencana untuk mengonsolidasikan validator.
- **Validator 0x00 yang ada:** Tingkatkan segera—Anda tidak dapat menarik tanpa memperbarui kredensial Anda. Anda harus terlebih dahulu mengonversi ke `0x01`, kemudian Anda dapat mengonversi ke `0x02`.

## Alat untuk mengelola kredensial penarikan {#withdrawal-credential-tools}

Beberapa alat mendukung pemilihan atau konversi antar jenis kredensial:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** - Alat resmi untuk deposit dan manajemen validator, termasuk konversi kredensial dan konsolidasi
- **[Pectra Staking Manager](https://pectrastaking.com)** - UI Web dengan dukungan koneksi dompet untuk konversi dan konsolidasi
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** - Alat baris perintah untuk konversi batch
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Alat CLI untuk operasi Ethereum termasuk manajemen validator

Untuk daftar lengkap alat konsolidasi dan instruksi konversi terperinci, lihat [Alat konsolidasi MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Bacaan lebih lanjut {#further-reading}

- [Kunci dalam proof-of-stake Ethereum](/developers/docs/consensus-mechanisms/pos/keys/) - Pelajari tentang kunci validator dan bagaimana kaitannya dengan kredensial penarikan
- [MaxEB](/roadmap/pectra/maxeb/) - Panduan terperinci tentang peningkatan Pectra dan fitur saldo efektif maksimum