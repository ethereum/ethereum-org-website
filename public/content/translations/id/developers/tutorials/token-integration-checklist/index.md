---
title: Daftar periksa integrasi token
description: Daftar periksa hal-hal yang perlu diperhatikan saat berinteraksi dengan token
author: "Trailofbits"
lang: id
tags:
  - "solidity"
  - "kontrak pintar"
  - "keamanan"
  - "token"
skill: intermediate
published: 2020-08-13
source: Membuat kontrak yang aman
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Ikuti daftar periksa ini ketika berinteraksi dengan token arbitrari. Pastikan Anda mengerti risiko yang terkait dengan setiap item, dan buat justifikasi terhadap pengecualian apa pun untuk aturan ini.

Untuk kenyamanan, semua [utilitas](https://github.com/crytic/slither#tools) Slither dapat di jalankan langsung pada alamat token, seperti:

[Tutorial Menggunakan Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Untuk mengikuti daftar periksa ini, Anda mungkin ingin memiliki output ini dari Slither untuk token:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # memerlukan konfigurasi, dan menggunakan Echidna dan Manticore
```

## Pertimbangan umum {#general-considerations}

- **Kontrak memiliki ulasan keamanan.** Hindari berinteraksi dengan kontrak yang ulasan keamanannya kurang. Lihat durasi penilaiannya (alias "level upaya"), reputasi dari lembaga keamanan, dan jumlah serta keparahan temuannya.
- **Anda telah menghubungi pengembang.** Anda mungkin perlu mengingatkan tim mereka akan suatu insiden. Cari kontak yang sesuai di [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Mereka memiliki milis keamanan untuk pengumuman penting.** Tim mereka harus menasihati penggunan (seperti Anda!) saat masalah genting ditemukan atau saat peningkatan terjadi.

## Kesesuaian dengan ERC {#erc-conformity}

Slither memasukkan utilitas, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), yang mengulas kesesuaian token dengan banyak standar ERC terkait. Gunakan slither-check-erc untuk mengulas bahwa:

- **Transfer dan transferFrom mengembalikan boolean.** Beberapa token tidak mengembalikan boolean pada fungsi ini. Akibatnya, pemanggilan mereka dalam kontrak mungkin gagal.
- **Fungsi nama, desimal, dan simbol ada jika digunakan.** Fungsi ini bersifat opsional dalam standar ERC20 dan mungkin tidak ada.
- **Desimal mengembalikan uint8.** Beberapa token secara tidak benar mengembalikan uint256. Jika ini terjadi, pastikan nilai yang dikembalikan di bawah 255.
- **Token memitigasi [kondisi pacu ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) yang diketahui.** Standar ERC20 memiliki kondisi pacu ERC20 yang diketahui yang harus dimitigasi untuk mencegah penyerang mencuri token.
- **Token bukan token ERC777 dan tidak memiliki pemanggilan fungsi eksternal dalam transfer dan transferFrom.** Pemanggilan eksternal dalam fungsi transfer bisa menyebabkan reentancy.

Slither memasukkan utilitas, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), yang membuat tes unit dan properti keamanan yang bisa menemukan banyak kelemahan ERC umum. Gunakan slither-prop untuk mengulas bahwa:

- **Kontrak memenuhi semua test unit dan properti keamanan dari slither-prop.** Jalankan tes unit yang dibuat, dan kemudian periksa properti dengan [Echidna](https://github.com/crytic/echidna) dan [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Akhirnya, ada beberapa karakteristik yang sulit dikenali secara otomatis. Ulas kondisi ini secara manual:

- **Transfer dan transferFrom tidak boleh memungut biaya.** Token deflasi bisa menyebabkan perilaku tak terduga.
- **Potensi bunga yang diperoleh dari token diperhitungkan.** Beberapa token mendistribusikan bunga ke pemegang token. Bunga ini mungkin terjebak dalam kontrak jika tidak diperhitungkan.

## Komposisi kontrak {#contract-composition}

- **Kontrak menghindari kerumitan yang tidak diperlukan.** Token seharusnya adalah kontrak sederhana; token dengan kode kompleks memerlukan standar yang lebih tinggi untuk diulas. Gunakan [printer ringkasan manusia](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) Slither untuk mengidentifikasi kode yang rumit.
- **Kontrak menggunakan SafeMath.** Kontrak yang tidak menggunakan SafeMath memerlukan standar yang lebih tinggi untuk diulas. Periksa kontrak secara manual untuk penggunaan SafeMath.
- **Kontrak hanya memiliki beberapa fungsi yang tidak terkait token.** Fungsi yang tidak terkait token meningkatkan kemungkinan timbulnya masalah dalam kontrak. Gunakan [printer ringkasan kontrak](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slither untuk mengulas secara luas kode yang digunakan dalam kontrak.
- **Token hanya memiliki satu alamat.** Token dengan beberapa titik masuk untuk pembaharuan saldo bisa merusak pembukuan internal yang didasarkan pada alamat (contohnya, `balances[token_address][msg.sender]` mungkin tidak mencerminkan saldo sebenarnya).

## Hak istimewa pemilik {#owner-privileges}

- **Token tidak dapat ditingkatkan.** Kontrak yang dapat ditingkatkan bisa mengubah aturannya seiring dengan waktu. Gunakan [printer ringkasan manusia](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slither untuk menentukan apakah kontrak dapat ditingkatkan.
- **Pemilik memiliki kemampuan pencetakan terbatas.** Pemilik yang jahat atau membahayakan bisa menyalahgunakan kemampuan pencetakan. Gunakan [printer ringkasan manusia](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slither untuk mengulas kemampuan pencetakan, dan pertimbangkan meninjau kodenya secara manual.
- **Token tidak bisa dijeda.** Pemilik yang jahat atau membahayakan bisa memerangkap kontrak yang mengandalkan token yang dapat dijeda. Kenali kode yang dapat dijeda secara manual.
- **Pemilik tidak dapat membuat kontrak masuk dalam daftar hitam.** Pemilik yang jahat atau membahayakan bisa memerangkap kontrak yang mengandalkan token dengan daftar hitam. Kenali fitur pembuatan daftar hitam secara manual.
- **Tim di belakang token dikenal dan bisa dimintai pertanggungjawaban untuk penyalahgunaan.** Kontrak dengan tim pengembangan anonim, atau yang tinggal di tempat perlindungan hukum memerlukan peninjauan dengan standar yang lebih tinggi.

## Kelangkaan token {#token-scarcity}

Ulasan untuk masalah kelangkaan token memerlukan ulasan manual. Periksalah untuk menemukan kondisi ini:

- **Tidak ada pengguna yang memiliki sebagian besar pasokan.** Jika beberapa pengguna memiliki sebagian besar token, mereka bisa memengaruhi operasi yang didasarkan pada partisi ulang token.
- **Total pasokannya cukup.** Token dengan total pasokan yang rendah bisa dengan mudah dimanipulasi.
- **Token berada di beberapa bursa.** Jika semua token berada di satu bursa, menyusupi bursa bisa membahayakan kontrak yang mengandalkan token.
- **Pengguna memahami risiko terkait dengan dana yang besar atau pinjaman cepat.** Kontrak yang mengandalkan saldo token harus mempertimbangkan penyerang dengan dana besar atau serangan lewat pinjaman cepat dengan hati-hati.
- **Token tidak mengizinkan pencetakan cepat**. Pencetakan cepat bisa menyebabkan ayunan substansial pada saldo dan pasokan total, yang mengharuskan pemeriksaan overflow yang ketat dan menyeluruh dalam operasi tokennya.
