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

Mengambil kode sumber yang terverifikasi dari Etherscan memerlukan [kunci API Etherscan](https://docs.etherscan.io/set-up-your-api-key) (kunci gratis bisa digunakan). Teruskan dengan `--etherscan-apikey`, atau atur variabel lingkungan `ETHERSCAN_API_KEY`, yang juga dibaca oleh Slither:

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

Tanpa kunci, perintah akan gagal dengan kesalahan `Invalid etherscan API Key`.

Untuk mengikuti daftar periksa ini, Anda perlu memiliki keluaran dari Slither ini untuk token tersebut:

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # mewajibkan konfigurasi, dan penggunaan Echidna
```

## Pertimbangan umum {#general-considerations}

- **Kontrak memiliki tinjauan keamanan.** Hindari berinteraksi dengan kontrak yang tidak memiliki tinjauan keamanan. Periksa durasi penilaian (alias "tingkat upaya"), reputasi perusahaan keamanan, serta jumlah dan tingkat keparahan temuan.
- **Anda telah menghubungi pengembang.** Anda mungkin perlu memperingatkan tim mereka tentang suatu insiden. Cari kontak yang sesuai di [kontak keamanan rantai blok (blockchain-security-contacts)](https://github.com/crytic/blockchain-security-contacts).
- **Mereka memiliki milis keamanan untuk pengumuman penting.** Tim mereka harus memberi tahu pengguna (seperti Anda!) ketika masalah kritis ditemukan atau ketika peningkatan terjadi.

## Kesesuaian ERC {#erc-conformity}

Slither menyertakan utilitas, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), yang meninjau kesesuaian token dengan banyak standar ERC terkait. Gunakan slither-check-erc untuk meninjau bahwa:

- **Transfer dan transferFrom mengembalikan boolean.** Beberapa token tidak mengembalikan boolean pada fungsi-fungsi ini. Akibatnya, panggilannya di dalam kontrak mungkin gagal.
- **Fungsi name, decimals, dan symbol ada jika digunakan.** Fungsi-fungsi ini bersifat opsional dalam standar ERC-20 dan mungkin tidak ada.
- **Decimals mengembalikan uint8.** Beberapa token secara keliru mengembalikan uint256. Jika ini masalahnya, pastikan nilai yang dikembalikan di bawah 255.
- **Token memitigasi [kondisi balapan ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) yang diketahui.** Standar ERC-20 memiliki kondisi balapan ERC-20 yang diketahui yang harus dimitigasi untuk mencegah penyerang mencuri token.
- **Token tersebut bukan token ERC-777 dan tidak memiliki panggilan fungsi eksternal dalam transfer dan transferFrom.** Panggilan eksternal dalam fungsi transfer dapat menyebabkan masuk kembali (reentrancy).

Slither menyertakan utilitas, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), yang menghasilkan pengujian unit dan properti keamanan yang dapat menemukan banyak kelemahan ERC yang umum. Gunakan slither-prop untuk meninjau bahwa:

- **Kontrak lulus semua pengujian unit dan properti keamanan dari slither-prop.** Jalankan pengujian unit yang dihasilkan, lalu periksa propertinya dengan [Echidna](https://github.com/crytic/echidna).

Terakhir, ada karakteristik tertentu yang sulit diidentifikasi secara otomatis. Tinjau kondisi ini secara manual:

- **Transfer dan transferFrom tidak boleh memungut biaya.** Token deflasi dapat menyebabkan perilaku yang tidak terduga.
- **Potensi bunga yang diperoleh dari token diperhitungkan.** Beberapa token mendistribusikan bunga kepada pemegang token. Bunga ini mungkin terjebak di dalam kontrak jika tidak diperhitungkan.

## Komposisi kontrak {#contract-composition}

- **Kontrak menghindari kerumitan yang tidak diperlukan.** Token harus berupa kontrak yang sederhana; token dengan kode yang rumit memerlukan standar peninjauan yang lebih tinggi. Gunakan [pencetak ringkasan manusia](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) Slither untuk mengidentifikasi kode yang rumit.
- **Kontrak menggunakan aritmetika yang diperiksa.** Solidity 0.8 dan yang lebih baru mengembalikan (revert) pada limpahan (overflow) dan underflow secara bawaan; kontrak yang lebih lama memerlukan SafeMath untuk perlindungan yang sama. Kontrak yang dikompilasi dengan versi yang lebih lama tanpa SafeMath, atau yang menggunakan blok `unchecked`, memerlukan standar peninjauan yang lebih tinggi. Periksa aritmetika secara manual, terutama di dalam blok `unchecked` dan rakitan sebaris (inline assembly).
- **Kontrak hanya memiliki sedikit fungsi yang tidak terkait dengan token.** Fungsi yang tidak terkait dengan token meningkatkan kemungkinan terjadinya masalah dalam kontrak. Gunakan [pencetak ringkasan kontrak](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slither untuk meninjau secara luas kode yang digunakan dalam kontrak.
- **Token hanya memiliki satu alamat.** Token dengan beberapa titik masuk untuk pembaruan saldo dapat merusak pembukuan internal berdasarkan alamat (misalnya, `balances[token_address][msg.sender]` mungkin tidak mencerminkan saldo yang sebenarnya).

## Hak istimewa pemilik {#owner-privileges}

- **Token tidak dapat ditingkatkan (upgradeable).** Kontrak yang dapat ditingkatkan mungkin mengubah aturannya seiring waktu. Gunakan [pencetak ringkasan manusia](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) Slither untuk menentukan apakah kontrak dapat ditingkatkan.
- **Pemilik memiliki kemampuan pencetakan yang terbatas.** Pemilik yang berniat jahat atau disusupi dapat menyalahgunakan kemampuan pencetakan. Gunakan [pencetak ringkasan manusia](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) Slither untuk meninjau kemampuan pencetakan, dan pertimbangkan untuk meninjau kode secara manual.
- **Token tidak dapat dijeda (pausable).** Pemilik yang berniat jahat atau disusupi dapat menjebak kontrak yang bergantung pada token yang dapat dijeda. Identifikasi kode yang dapat dijeda secara manual.
- **Pemilik tidak dapat memasukkan kontrak ke daftar hitam (blacklist).** Pemilik yang berniat jahat atau disusupi dapat menjebak kontrak yang bergantung pada token dengan daftar hitam. Identifikasi fitur daftar hitam secara manual.
- **Tim di balik token diketahui dan dapat dimintai pertanggungjawaban atas penyalahgunaan.** Kontrak dengan tim pengembangan anonim, atau yang berada di tempat perlindungan hukum harus memerlukan standar peninjauan yang lebih tinggi.

## Kelangkaan token {#token-scarcity}

Peninjauan untuk masalah kelangkaan token memerlukan peninjauan manual. Periksa kondisi berikut:

- **Tidak ada pengguna yang memiliki sebagian besar pasokan.** Jika beberapa pengguna memiliki sebagian besar token, mereka dapat memengaruhi operasi berdasarkan pembagian ulang token.
- **Total pasokan mencukupi.** Token dengan total pasokan yang rendah dapat dengan mudah dimanipulasi.
- **Token berada di lebih dari beberapa bursa.** Jika semua token berada di satu bursa, peretasan pada bursa tersebut dapat membahayakan kontrak yang bergantung pada token tersebut.
- **Pengguna memahami risiko terkait dana besar atau pinjaman kilat (flash loan).** Kontrak yang bergantung pada saldo token harus mempertimbangkan dengan cermat penyerang dengan dana besar atau serangan melalui pinjaman kilat.
- **Token tidak mengizinkan pencetakan kilat (flash minting)**. Pencetakan kilat dapat menyebabkan ayunan substansial dalam saldo dan total pasokan, yang mengharuskan pemeriksaan limpahan yang ketat dan komprehensif dalam operasi token.
## Token ERC-20 non-standar yang diketahui {#known-non-standard-erc20-tokens}

Protokol yang memungkinkan integrasi dengan token arbitrer harus berhati-hati untuk menangani token ERC-20 non-standar tertentu yang terkenal dengan benar. Rujuk ke [daftar token non-standar](https://secure-contracts.com/development-guidelines/non-standard-tokens.html) untuk token terkenal yang membawa risiko tambahan.

## Token ERC-721 {#erc721-tokens}

### Pemeriksaan kesesuaian ERC-721 {#erc721-conformity-checks}

Perilaku kontrak tertentu mungkin berbeda dari spesifikasi ERC aslinya. Tinjau kondisi berikut secara manual:

- **Transfer token ke alamat 0x0 mengembalikan (revert).** Beberapa token mengizinkan transfer ke 0x0 dan menganggap token yang dikirim ke alamat tersebut telah dibakar; namun, standar ERC-721 mewajibkan transfer semacam itu mengembalikan (revert).
- **Fungsi `safeTransferFrom` diimplementasikan dengan tanda tangan yang benar.** Beberapa kontrak token tidak mengimplementasikan fungsi-fungsi ini. Mentransfer NFT ke salah satu kontrak tersebut dapat mengakibatkan hilangnya aset.
- **Fungsi `name`, `decimals`, dan `symbol` ada jika digunakan.** Fungsi-fungsi ini bersifat opsional dalam standar ERC-721 dan mungkin tidak ada.
- **Jika digunakan, `decimals` mengembalikan `uint8(0)`.** Nilai lainnya tidak valid.
- **Fungsi `name` dan `symbol` dapat mengembalikan string kosong.** Perilaku ini diizinkan oleh standar.
- **Fungsi `ownerOf` mengembalikan (revert) jika `tokenId` tidak valid atau merujuk ke token yang telah dibakar.** Fungsi tersebut tidak dapat mengembalikan 0x0. Perilaku ini diwajibkan oleh standar tetapi mungkin tidak selalu diimplementasikan dengan benar.
- **Transfer NFT menghapus persetujuannya.** Hal ini diwajibkan oleh standar.
- **ID token dari sebuah NFT tidak dapat diubah selama masa pakainya.** Hal ini diwajibkan oleh standar.

### Risiko umum dari standar ERC-721 {#common-risks-of-the-erc721-standard}

Mitigasi risiko yang terkait dengan kontrak ERC-721 dengan melakukan peninjauan manual terhadap kondisi berikut:

- **Panggilan balik (callback) `onERC721Received` diperhitungkan.** Panggilan eksternal dalam fungsi transfer dapat menyebabkan masuk kembali (reentrancy), terutama ketika panggilan balik tidak eksplisit (misalnya, dalam panggilan [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code)).
- **Saat NFT dicetak, NFT tersebut ditransfer dengan aman ke kontrak pintar.** Jika fungsi pencetakan ada, fungsi tersebut harus berperilaku mirip dengan `safeTransferFrom` dan menangani pencetakan token baru ke kontrak pintar dengan benar, mencegah hilangnya aset.
- **Membakar token menghapus persetujuannya.** Jika fungsi pembakaran ada, fungsi tersebut harus menghapus persetujuan token sebelumnya.
