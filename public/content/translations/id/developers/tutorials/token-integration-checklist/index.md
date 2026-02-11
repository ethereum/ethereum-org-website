---
title: Daftar periksa integrasi token
description: Daftar periksa hal-hal yang perlu diperhatikan saat berinteraksi dengan token
author: "Ipungpurwono"
lang: id
tags: [ "Solidity", "kontrak pintar", "keamanan", "token" ]
skill: intermediate
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Ikuti daftar periksa ini ketika berinteraksi dengan token arbitrari. Pastikan Anda mengerti risiko yang terkait dengan setiap item, dan buat justifikasi terhadap pengecualian apa pun untuk aturan ini.

Untuk kenyamanan, semua [utilitas](https://github.com/crytic/slither#tools) Slither dapat dijalankan langsung pada alamat token, seperti:

[Tutorial menggunakan Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Untuk mengikuti daftar periksa ini, Anda mungkin ingin memiliki output ini dari Slither untuk token:

```bash
- slither-check-erc [target] [contractName] [opsional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # memerlukan konfigurasi, dan penggunaan Echidna dan Manticore
```

## Pertimbangan umum {#general-considerations}

- \*\*Kontrak memiliki ulasan keamanan. Hindari berinteraksi dengan kontrak yang ulasan keamanannya kurang. Periksa panjang penilaian (alias “tingkat upaya”), reputasi firma keamanan, dan jumlah serta tingkat keparahan temuannya.
- \*\*Anda telah menghubungi pengembang. Anda mungkin perlu mengingatkan tim mereka akan suatu insiden. Cari kontak yang sesuai di [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Mereka memiliki milis keamanan untuk pengumuman penting.** Tim mereka harus menasihati pengguna (seperti Anda!) saat masalah kritis ditemukan atau saat pemutakhiran terjadi.

## Kesesuaian ERC {#erc-conformity}

Slither menyertakan utilitas, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), yang meninjau kesesuaian token dengan banyak standar ERC terkait. Gunakan slither-check-erc untuk meninjau bahwa:

- **Transfer dan transferFrom mengembalikan boolean.** Beberapa token tidak mengembalikan boolean pada fungsi ini. Akibatnya, pemanggilan mereka dalam kontrak mungkin gagal.
- **Fungsi nama, desimal, dan simbol ada jika digunakan.** Fungsi-fungsi ini bersifat opsional dalam standar ERC20 dan mungkin tidak ada.
- **Decimals mengembalikan uint8.** Beberapa token salah mengembalikan uint256. Jika ini terjadi, pastikan nilai yang dikembalikan di bawah 255.
- **Token memitigasi [kondisi pacu ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) yang diketahui.** Standar ERC20 memiliki kondisi pacu ERC20 yang diketahui yang harus dimitigasi untuk mencegah penyerang mencuri token.
- **Token bukan token ERC777 dan tidak memiliki pemanggilan fungsi eksternal dalam transfer dan transferFrom.** Panggilan eksternal dalam fungsi transfer bisa menyebabkan reentrancy.

Slither menyertakan utilitas, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), yang menghasilkan pengujian unit dan properti keamanan yang dapat menemukan banyak kelemahan umum ERC. Gunakan slither-prop untuk meninjau bahwa:

- **Kontrak lolos semua pengujian unit dan properti keamanan dari slither-prop.** Jalankan pengujian unit yang dihasilkan, lalu periksa propertinya dengan [Echidna](https://github.com/crytic/echidna) dan [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Akhirnya, ada beberapa karakteristik yang sulit dikenali secara otomatis. Tinjau kondisi-kondisi ini secara manual:

- **Transfer dan transferFrom tidak boleh memungut biaya.** Token deflasi bisa menyebabkan perilaku tak terduga.
- **Potensi bunga yang diperoleh dari token diperhitungkan.** Beberapa token mendistribusikan bunga ke pemegang token. Bunga ini mungkin terjebak dalam kontrak jika tidak diperhitungkan.

## Komposisi kontrak {#contract-composition}

- **Kontrak menghindari kerumitan yang tidak diperlukan.** Token seharusnya adalah kontrak sederhana; token dengan kode kompleks memerlukan standar yang lebih tinggi untuk diulas. Gunakan [pencetak ringkasan-manusia (human-summary printer)](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) dari Slither untuk mengidentifikasi kode yang kompleks.
- **Kontrak menggunakan SafeMath.** Kontrak yang tidak menggunakan SafeMath memerlukan standar yang lebih tinggi untuk diulas. Periksa kontrak secara manual untuk penggunaan SafeMath.
- **Kontrak hanya memiliki beberapa fungsi yang tidak terkait token.** Fungsi yang tidak terkait token meningkatkan kemungkinan timbulnya masalah dalam kontrak. Gunakan [pencetak ringkasan-kontrak (contract-summary printer)](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) dari Slither untuk meninjau secara luas kode yang digunakan dalam kontrak.
- **Token hanya memiliki satu alamat.** Token dengan beberapa titik masuk untuk pembaruan saldo dapat merusak pembukuan internal berdasarkan alamat (misalnya, `balances[token_address][msg.sender]` mungkin tidak mencerminkan saldo yang sebenarnya).

## Hak istimewa pemilik {#owner-privileges}

- **Token tidak dapat ditingkatkan.** Kontrak yang dapat ditingkatkan bisa mengubah aturannya seiring dengan waktu. Gunakan [pencetak ringkasan-manusia (human-summary printer)](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) dari Slither untuk menentukan apakah kontrak dapat ditingkatkan.
- **Pemilik memiliki kemampuan pencetakan terbatas.** Pemilik yang berniat jahat atau yang telah disusupi dapat menyalahgunakan kemampuan pencetakan. Gunakan [pencetak ringkasan-manusia (human-summary printer)](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) dari Slither untuk meninjau kemampuan pencetakan, dan pertimbangkan untuk meninjau kode secara manual.
- **Token tidak dapat dijeda.** Pemilik yang berniat jahat atau yang telah disusupi dapat menjebak kontrak yang mengandalkan token yang dapat dijeda. Identifikasi kode yang dapat dijeda secara manual.
- **Pemilik tidak dapat memasukkan kontrak ke daftar hitam.** Pemilik yang berniat jahat atau yang telah disusupi dapat menjebak kontrak yang mengandalkan token dengan daftar hitam. Identifikasi fitur daftar hitam secara manual.
- **Tim di belakang token dikenal dan bisa dimintai pertanggungjawaban untuk penyalahgunaan.** Kontrak dengan tim pengembangan anonim, atau yang tinggal di tempat perlindungan hukum memerlukan peninjauan dengan standar yang lebih tinggi.

## Kelangkaan token {#token-scarcity}

Ulasan untuk masalah kelangkaan token memerlukan ulasan manual. Periksa kondisi-kondisi berikut:

- **Tidak ada pengguna yang memiliki sebagian besar pasokan.** Jika beberapa pengguna memiliki sebagian besar token, mereka dapat memengaruhi operasi berdasarkan repartisi token.
- **Total pasokannya cukup.** Token dengan total pasokan yang rendah bisa dengan mudah dimanipulasi.
- **Token terletak di lebih dari beberapa bursa.** Jika semua token berada di satu bursa, penyusupan bursa dapat membahayakan kontrak yang mengandalkan token.
- **Pengguna memahami risiko terkait dana besar atau pinjaman kilat.** Kontrak yang mengandalkan saldo token harus mempertimbangkan dengan cermat penyerang dengan dana besar atau serangan melalui pinjaman kilat.
- **Token tidak mengizinkan pencetakan kilat**. Pencetakan kilat dapat menyebabkan ayunan substansial pada saldo dan total pasokan, yang mengharuskan pemeriksaan overflow yang ketat dan komprehensif dalam pengoperasian token.
