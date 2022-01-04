---
title: Akun Ethereum
description: Penjelasan tentang akun Ethereum - struktur datanya dan hubungannya dengan kriptografi pasangan kunci.
lang: id
sidebar: true
---

Akun Ethereum adalah entitas dengan saldo eter (ETH) yang dapat mengirim transaksi di Ethereum. Akun dapat dikontrol pengguna atau digunakan sebagai kontrak pintar.

## Prasyarat {#prerequisites}

Akun adalah topik yang sangat ramah bagi pemula. Tetapi untuk membantu Anda lebih memahami halaman ini, kami sarankan Anda terlebih dahulu membaca [pengantar Ethereum](/developers/docs/intro-to-ethereum/).

## Jenis akun {#types-of-account}

Ethereum mempunyai dua jenis akun:

- Dimiliki secara eksternal - dikendalikan oleh siapa saja yang memiliki kunci privat
- Kontrak – kontrak pintar yang diterapkan ke jaringan, dikendalikan oleh kode. Pelajari tentang [kontrak pintar](/developers/docs/smart-contracts/)

Kedua jenis akun tersebut memiliki kemampuan untuk:

- Menerima, menyimpan, dan mengirim ETH serta token
- Berinteraksi dengan kontrak pintar yang diterapkan

### Perbedaan utama {#key-differences}

**Kepemilikan Eksternal**

- Membuat akun tidak memerlukan biaya
- Dapat memulai transaksi
- Transaksi antar akun dengan kepemilikan eksternal hanya dapat berupa transfer ETH/token

**Kontrak**

- Membuat sebuah kontrak memerlukan biaya karena Anda menggunakan penyimpanan jaringan
- Hanya dapat mengirim transaksi sebagai tanggapan untuk menerima transaksi
- Transaksi dari akun eksternal ke akun kontrak dapat memicu kode yang dapat melakukan banyak tindakan berbeda, seperti mentransfer token atau bahkan membuat kontrak baru

## Pemeriksaan akun {#an-account-examined}

Akun Ethereum memiliki empat bidang:

- `nonce` – penghitung yang menunjukkan jumlah transaksi yang dikirim dari akun. Ini memastikan transaksi hanya diproses sekali. Dalam akun kontrak, angka ini mewakili jumlah kontrak yang dibuat oleh akun tersebut.
- `saldo` – Jumlah wei yang dimiliki oleh alamat ini. Wei adalah denominasi ETH dan ada 1e+18 wei per ETH.
- `codeHash` – Hash ini merujuk pada _kode_ sebuah akun di mesin virtual Ethereum (EVM). Akun kontrak memiliki potongan kode yang diprogramkan ke dalamnya yang dapat melakukan berbagai operasi. Kode EVM ini dieksekusi jika akun menerima pemanggilan message. Tidak dapat diubah, tidak seperti field akun lainnya. Semua potongan kode tersebut disimpan dalam basis data state di bawah hash yang sesuai untuk proses pengambilan nanti. Nilai hash ini dikenal sebagai codeHash. Untuk kepemilikan akun eksternal, bidang codeHash adalah hash dari string kosong.
- `storageRoot` – Terkadang dikenal sebagai hash penyimpanan. Hash 256-bit dari node akar pohon Merkle Patricia yang mengkodekan konten penyimpanan akun (pemetaan di antara nilai bilangan bulat 256-bit), yang dikodekan ke dalam pohon sebagai pemetaan dari hash 256-bit Keccak dari kunci bilangan bulat 256-bit ke nilai bilangan bulat 256-bit yang dikodekan RLP. Pohon ini mengkodekan hash dari konten penyimpanan akun ini, dan bersifat kosong secara default.

![Diagram yang menunjukan susunan akun](../../../../../developers/docs/accounts/accounts.png) _Diagram diadaptasi dari [Ethereum EVM yang diilustrasikan](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Akun dan pasangan kunci dengan kepemilikan eksternal {#externally-owned-accounts-and-key-pairs}

Akun terdiri dari sepasang kunci kriptografis: publik dan pribadi. Mereka membantu membuktikan bahwa transaksi benar-benar ditandatangani oleh pengirim dan mencegah pemalsuan. Kunci privat adalah yang Anda gunakan untuk menandatangani transaksi, sehingga memberi Anda pengawasan atas dana yang terkait dengan akun Anda. Anda tidak pernah benar-benar memegang mata uang kripto, Anda memegang kunci privatnya - dananya selalu ada di buku besar Ethereum.

Ini mencegah pelaku jahat menyiarkan transaksi palsu karena Anda selalu dapat memverifikasi pengirim transaksi.

Jika Alice ingin mengirim eter dari akunnya sendiri ke akun Bob, Alice perlu membuat permintaan transaksi dan mengirimkannya ke jaringan untuk verifikasi. Penggunaan kriptografi kunci publik Ethereum memastikan bahwa Alice dapat membuktikan bahwa dia awalnya yang memulai permintaan transaksi. Tanpa mekanisme kriptografi, musuh jahat Eve dapat dengan mudah menyiarkan permintaan yang terlihat seperti "kirim 5 ETH dari akun Alice ke akun Eve," dan tidak ada yang dapat memverifikasi bahwa permintaan tersebut tidak berasal dari Alice.

## Pembuatan akun {#account-creation}

Saat Anda ingin membuat akun, kebanyakan pustaka akan memberi Anda kunci privat acak.

Kunci privat terdiri dari 64 karakter heksa dan dapat dienkripsi dengan kata sandi.

Contoh:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Kunci publik dihasilkan oleh kunci privat yang menggunakan [Algoritma Tanda Tangan Digital Kurva Eliptik](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Anda mendapatkan alamat publik untuk akun Anda dengan mengambil 20 bita terakhir dari kunci publik hash Keccak-256 dan menambahkan `0x` ke bagian awal alamat.

Berikut adalah contoh membuat akun di konsol menggunakan `personal_newAccount` GETH

```go
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"

> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

[Dokumentasi GETH](https://geth.ethereum.org/docs)

Dimungkinkan untuk memperoleh kunci publik baru dari kunci privat Anda tetapi Anda tidak dapat memperoleh kunci privat dari kunci publik. Ini berarti sangat penting untuk menjaga kunci privat tetap aman dan, seperti namanya, **PRIVAT**.

Anda memerlukan kunci privat untuk menandatangani pesan dan transaksi yang menghasilkan tanda tangan. Orang lain kemudian dapat mengambil tanda tangan untuk mendapatkan kunci publik anda, membuktikan penulis pesan tersebut. Dalam aplikasi Anda, Anda dapat menggunakan pustaka javascript untuk mengirim transaksi ke jaringan.

<!-- **WEB3JS example**

```jsx
web3.eth.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
> "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55"
```

[Web3js documentation](https://web3js.readthedocs.io/)

[code for creating an account in JS?] + links to how to do it in other languages maybe?

`$ geth account new` -->

## Akun Kontrak {#contract-accounts}

Akun kontrak juga memiliki alamat heksadesimal 42 karakter:

Contoh:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Alamat kontrak biasanya diberikan saat kontrak diterapkan ke Blockchain Ethereum. Alamat ini berasal dari alamat kreator dan jumlah transaksi yang dikirim dari alamat tersebut (“nonce”).

<!-- @Sam Richards is there a line of code you can use to return your contract's address – in the same way that we have personal.newAccount() above? – Don't know if what I found below is helpful?

```jsx
ethers.utils.getContractAddress( transaction ) ⇒ string< Address >
```

TODO: add a contract address example-->

<!-- ## Managing an account

Most users will want to interact with their account via a wallet. Note that an account is not a wallet. A wallet is the keypair associated with a user-owned account, which allow a user to make transactions from or manage the account

For dapp development, you'll want access to dummy accounts with test ETH so you can experiment. When you create a local chain, you'll get test accounts with fake ETH which you can then import using MetaMask and use on your dapp's frontend. -->

## Catatan pada dompet {#a-note-on-wallets}

Akun bukanlah dompet. Dompet adalah pasangan kunci yang terkait dengan akun milik pengguna, yang darinya memungkinkan pengguna melakukan transaksi atau mengelola akun.

## Demo visual {#a-visual-demo}

Tonton Austin memandu Anda tentang fungsi hash, dan pasangan kunci.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kontrak pintar](/developers/docs/smart-contracts/)
- [Transaksi](/developers/docs/transactions/)
