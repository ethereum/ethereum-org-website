---
title: Daftar periksa integrasi token
description: Daftar periksa hal-hal yang perlu dipertimbangkan saat berinteraksi dengan token
author: "Trailofbits"
lang: id
tags:
  - solidity
  - kontrak pintar
  - keamanan
  - token
skill: intermediate
breadcrumb: Integrasi token
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Ikuti daftar periksa ini saat berinteraksi dengan token arbitrer. Pastikan Anda memahami risiko yang terkait dengan setiap item, dan berikan alasan untuk setiap pengecualian terhadap aturan ini.

Untuk kenyamanan, semua [utilitas](https://github.com/crytic/slither#tools) Slither dapat dijalankan langsung pada alamat token, seperti:

[Tutorial menggunakan Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Untuk mengikuti daftar periksa ini, Anda akan memerlukan keluaran dari Slither ini untuk token tersebut:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # mewajibkan konfigurasi, dan penggunaan Echidna dan Manticore
```

## Pertimbangan umum {#general-considerations}

- **Kontrak memiliki tinjauan keamanan.** Hindari berinteraksi dengan kontrak yang tidak memiliki tinjauan keamanan. Periksa durasi penilaian (alias "tingkat upaya"), reputasi perusahaan keamanan, serta jumlah dan tingkat keparahan temuan.
- **Anda telah menghubungi pengembang.** Anda mungkin perlu memperingatkan tim mereka tentang suatu insiden. Cari kontak yang sesuai di [kontak keamanan rantai blok (blockchain-security-contacts)](https://github.com/crytic/blockchain-security-contacts).
- **Mereka memiliki milis keamanan untuk pengumuman penting.** Tim mereka harus memberi tahu pengguna (seperti Anda!) ketika masalah kritis ditemukan atau ketika peningkatan terjadi.

## Kesesuaian ERC {#erc-conformity}

Slither menyertakan sebuah utilitas, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), yang meninjau kesesuaian token dengan banyak standar ERC terkait. Gunakan slither-check-erc untuk meninjau bahwa:

- **Transfer dan transferFrom mengembalikan nilai boolean.** Beberapa token tidak mengembalikan nilai boolean pada fungsi-fungsi ini. Akibatnya, pemanggilannya di dalam kontrak mungkin gagal.
- **Fungsi name, decimals, dan symbol tersedia jika digunakan.** Fungsi-fungsi ini bersifat opsional dalam standar ERC-20 dan mungkin tidak tersedia.
- **Decimals mengembalikan uint8.** Beberapa token secara tidak benar mengembalikan uint256. Jika ini masalahnya, pastikan nilai yang dikembalikan di bawah 255.
- **Token memitigasi [kondisi balapan (race condition) ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) yang diketahui.** Standar ERC-20 memiliki kondisi balapan ERC-20 yang diketahui yang harus dimitigasi untuk mencegah penyerang mencuri token.
- **Token tersebut bukan token ERC-777 dan tidak memiliki pemanggilan fungsi eksternal dalam transfer dan transferFrom.** Pemanggilan eksternal dalam fungsi transfer dapat menyebabkan serangan masuk kembali (reentrancy).

Slither menyertakan sebuah utilitas, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), yang menghasilkan pengujian unit dan properti keamanan yang dapat menemukan banyak kelemahan ERC yang umum. Gunakan slither-prop untuk meninjau bahwa:

- **Kontrak lulus semua pengujian unit dan properti keamanan dari slither-prop.** Jalankan pengujian unit yang dihasilkan, lalu periksa propertinya dengan [Echidna](https://github.com/crytic/echidna) dan [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Terakhir, ada karakteristik tertentu yang sulit diidentifikasi secara otomatis. Tinjau kondisi-kondisi ini secara manual:

- **Transfer dan transferFrom seharusnya tidak memungut biaya.** Token deflasi dapat menyebabkan perilaku yang tidak terduga.
- **Potensi bunga yang diperoleh dari token diperhitungkan.** Beberapa token mendistribusikan bunga kepada pemegang token. Bunga ini mungkin terperangkap di dalam kontrak jika tidak diperhitungkan.

## Komposisi kontrak {#contract-composition}

- **Kontrak menghindari kerumitan yang tidak perlu.** Token harus berupa kontrak yang sederhana; token dengan kode yang rumit memerlukan standar peninjauan yang lebih tinggi. Gunakan [pencetak ringkasan manusia (human-summary printer)](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) Slither untuk mengidentifikasi kode yang rumit.
- **Kontrak menggunakan SafeMath.** Kontrak yang tidak menggunakan SafeMath memerlukan standar peninjauan yang lebih tinggi. Periksa kontrak secara manual untuk penggunaan SafeMath.
- **Kontrak hanya memiliki sedikit fungsi yang tidak terkait dengan token.** Fungsi yang tidak terkait dengan token meningkatkan kemungkinan terjadinya masalah di dalam kontrak. Gunakan [pencetak ringkasan kontrak (contract-summary printer)](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slither untuk meninjau secara luas kode yang digunakan di dalam kontrak.
- **Token hanya memiliki satu alamat.** Token dengan beberapa titik masuk untuk pembaruan saldo dapat merusak pembukuan internal berdasarkan alamat (misalnya, `balances[token_address][msg.sender]` mungkin tidak mencerminkan saldo yang sebenarnya).

## Hak istimewa pemilik {#owner-privileges}

- **Token tidak dapat ditingkatkan (upgradeable).** Kontrak yang dapat ditingkatkan mungkin mengubah aturannya seiring waktu. Gunakan [pencetak ringkasan manusia](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slither untuk menentukan apakah kontrak dapat ditingkatkan.
- **Pemilik memiliki kemampuan pencetakan yang terbatas.** Pemilik yang berniat jahat atau disusupi dapat menyalahgunakan kemampuan pencetakan. Gunakan [pencetak ringkasan manusia](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slither untuk meninjau kemampuan pencetakan, dan pertimbangkan untuk meninjau kode secara manual.
- **Token tidak dapat dijeda (pausable).** Pemilik yang berniat jahat atau disusupi dapat menjebak kontrak yang bergantung pada token yang dapat dijeda. Identifikasi kode yang dapat dijeda secara manual.
- **Pemilik tidak dapat memasukkan kontrak ke daftar hitam (blacklist).** Pemilik yang berniat jahat atau disusupi dapat menjebak kontrak yang bergantung pada token dengan daftar hitam. Identifikasi fitur daftar hitam secara manual.
- **Tim di balik token diketahui dan dapat dimintai pertanggungjawaban atas penyalahgunaan.** Kontrak dengan tim pengembangan anonim, atau yang berada di tempat perlindungan hukum harus memerlukan standar peninjauan yang lebih tinggi.

## Kelangkaan token {#token-scarcity}

Peninjauan untuk masalah kelangkaan token memerlukan peninjauan manual. Periksa kondisi-kondisi berikut:

- **Tidak ada pengguna yang memiliki sebagian besar pasokan.** Jika beberapa pengguna memiliki sebagian besar token, mereka dapat memengaruhi operasi berdasarkan pembagian ulang token.
- **Total pasokan mencukupi.** Token dengan total pasokan yang rendah dapat dengan mudah dimanipulasi.
- **Token berada di lebih dari beberapa bursa.** Jika semua token berada di satu bursa, peretasan pada bursa tersebut dapat membahayakan kontrak yang bergantung pada token tersebut.
- **Pengguna memahami risiko terkait dana besar atau pinjaman kilat (flash loan).** Kontrak yang bergantung pada saldo token harus mempertimbangkan dengan cermat penyerang dengan dana besar atau serangan melalui pinjaman kilat.
- **Token tidak mengizinkan pencetakan kilat (flash minting)**. Pencetakan kilat dapat menyebabkan ayunan substansial pada saldo dan total pasokan, yang mengharuskan pemeriksaan limpahan yang ketat dan komprehensif dalam operasi token.