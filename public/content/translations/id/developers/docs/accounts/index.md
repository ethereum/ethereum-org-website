---
title: Akun Ethereum
description: Penjelasan tentang akun Ethereum - struktur datanya dan hubungannya dengan kriptografi pasangan kunci.
lang: id
---

Akun Ethereum adalah entitas dengan saldo ether (ETH) yang dapat mengirim pesan di jaringan Ethereum. Akun dapat dikontrol pengguna atau digunakan sebagai kontrak pintar.

## Persyaratan {#prerequisites}

Untuk membantu Anda lebih memahami halaman ini, kami sarankan Anda membaca [pengenalan ke Ethereum](/developers/docs/intro-to-ethereum/) kami terlebih dahulu.

## Jenis-jenis akun {#types-of-account}

Ethereum mempunyai dua jenis akun:

- Akun yang dimiliki secara eksternal (EOA) - dikontrol oleh siapa saja yang memiliki kunci pribadi
- Akun kontrak - kontrak pintar yang diterapkan ke jaringan, dikendalikan oleh kode. Pelajari tentang [kontrak pintar](/developers/docs/smart-contracts/)

Kedua jenis akun tersebut memiliki kemampuan untuk:

- Menerima, menyimpan, dan mengirim ETH serta token
- Berinteraksi dengan kontrak pintar yang diterapkan

### Perbedaan utama {#key-differences}

**Kepemilikan eksternal**

- Membuat akun tidak memerlukan biaya
- Dapat memulai transaksi
- Transaksi antar akun dengan kepemilikan eksternal hanya dapat berupa transfer ETH/token
- Terdiri dari sepasang kunci kriptografi: kunci publik dan privat yang mengontrol aktivitas akun

**Kontrak**

- Membuat sebuah kontrak memerlukan biaya karena Anda menggunakan penyimpanan jaringan
- Hanya dapat mengirim pesan sebagai respons terhadap penerimaan transaksi
- Transaksi dari akun eksternal ke akun kontrak dapat memicu kode yang dapat melakukan banyak tindakan berbeda, seperti mentransfer token atau bahkan membuat kontrak baru
- Akun kontrak tidak memiliki kunci pribadi. Sebaliknya, mereka dikendalikan oleh logika kode kontrak pintar

## Menelaah sebuah akun {#an-account-examined}

Akun Ethereum memiliki empat bidang:

- `nonce` – Penghitung yang menunjukkan jumlah transaksi yang dikirim dari akun yang dimiliki secara eksternal atau jumlah kontrak yang dibuat oleh akun kontrak. Hanya satu transaksi dengan nonce tertentu yang dapat dieksekusi untuk setiap akun, melindungi dari serangan replay di mana transaksi yang ditandatangani disiarkan berulang kali dan dieksekusi ulang.
- `balance` – Jumlah wei yang dimiliki oleh alamat ini. Wei adalah denominasi ETH dan ada 1e+18 wei per ETH.
- `codeHash` – Hash ini merujuk pada _kode_ sebuah akun di Mesin Virtual Ethereum (EVM). Akun kontrak memiliki potongan kode yang diprogramkan ke dalamnya yang dapat melakukan berbagai operasi. Kode EVM ini dieksekusi jika akun menerima pemanggilan message. Tidak dapat diubah, tidak seperti field akun lainnya. Semua potongan kode tersebut disimpan dalam basis data state di bawah hash yang sesuai untuk proses pengambilan nanti. Nilai hash ini dikenal sebagai codeHash. Untuk kepemilikan akun eksternal, bidang codeHash adalah hash dari string kosong.
- `storageRoot` – Terkadang dikenal sebagai hash penyimpanan. Hash 256-bit dari node akar sebuah [Trie Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) yang menyandikan konten penyimpanan dari akun (pemetaan antara nilai-nilai integer 256-bit), disandikan ke dalam trie sebagai pemetaan dari hash Keccak 256-bit dari kunci-kunci integer 256-bit ke nilai-nilai integer 256-bit yang disandikan dengan RLP. Pohon ini mengkodekan hash dari konten penyimpanan akun ini, dan bersifat kosong secara default.

![Diagram yang menunjukkan susunan sebuah akun](./accounts.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Akun yang dimiliki secara eksternal dan pasangan kunci {#externally-owned-accounts-and-key-pairs}

Sebuah akun terdiri dari sepasang kunci kriptografi: Umum dan pribadi. Mereka membantu membuktikan bahwa transaksi benar-benar ditandatangani oleh pengirim dan mencegah pemalsuan. Kunci privat adalah yang Anda gunakan untuk menandatangani transaksi, sehingga memberi Anda pengawasan atas dana yang terkait dengan akun Anda. Anda tidak pernah benar-benar memegang mata uang kripto, Anda memegang kunci privatnya - dananya selalu ada di buku besar Ethereum.

Ini mencegah pelaku jahat menyiarkan transaksi palsu karena Anda selalu dapat memverifikasi pengirim transaksi.

Jika Alice ingin mengirim eter dari akunnya sendiri ke akun Bob, Alice perlu membuat permintaan transaksi dan mengirimkannya ke jaringan untuk verifikasi. Penggunaan kriptografi kunci publik Ethereum memastikan bahwa Alice dapat membuktikan bahwa dia awalnya yang memulai permintaan transaksi. Tanpa mekanisme kriptografi, musuh jahat Eve dapat dengan mudah menyiarkan permintaan yang terlihat seperti "kirim 5 ETH dari akun Alice ke akun Eve," dan tidak ada yang dapat memverifikasi bahwa permintaan tersebut tidak berasal dari Alice.

## Pembuatan akun {#account-creation}

Saat kamu ingin membuat akun, sebagian besar pustaka akan menghasilkan kunci pribadi secara acak.

Kunci privat terdiri dari 64 karakter heksa dan dapat dienkripsi dengan kata sandi.

Contoh:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Kunci publik dihasilkan dari kunci pribadi menggunakan [Algoritma Tanda Tangan Digital Kurva Elips](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Anda mendapatkan alamat publik untuk akun Anda dengan mengambil 20 bita terakhir dari hash Keccak-256 dari kunci publik dan menambahkan `0x` ke bagian awal.

Ini berarti sebuah akun yang dimiliki secara eksternal (EOA) memiliki alamat 42 karakter (segmen 20 bita yang merupakan 40 karakter heksadesimal ditambah awalan `0x`).

Contoh:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Contoh berikut menunjukkan cara menggunakan alat penandatanganan yang disebut [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) untuk membuat akun baru. Clef adalah alat manajemen akun dan penandatanganan yang disertakan dengan klien Ethereum, [Geth](https://geth.ethereum.org). Perintah `clef newaccount` membuat pasangan kunci baru dan menyimpannya di dalam file penyimpanan kunci yang terenkripsi.

```
> clef newaccount --keystore <path>

Silakan masukkan kata sandi untuk akun baru yang akan dibuat:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Dokumentasi Geth](https://geth.ethereum.org/docs)

Dimungkinkan untuk menurunkan kunci publik baru dari kunci pribadi Anda, tetapi Anda tidak dapat menurunkan kunci pribadi dari kunci publik. Sangat penting untuk menjaga kunci pribadi Anda tetap aman dan, seperti namanya, **PRIBADI**.

Anda memerlukan kunci privat untuk menandatangani pesan dan transaksi yang menghasilkan tanda tangan. Orang lain kemudian dapat mengambil tanda tangan untuk mendapatkan kunci publik anda, membuktikan penulis pesan tersebut. Dalam aplikasi Anda, Anda dapat menggunakan pustaka JavaScript untuk mengirim transaksi ke jaringan.

## Akun kontrak {#contract-accounts}

Akun kontrak juga memiliki alamat heksadesimal 42 karakter:

Contoh:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Alamat kontrak biasanya diberikan saat kontrak diterapkan ke Rantai Blok Ethereum. Alamat ini berasal dari alamat pembuat dan jumlah transaksi yang dikirim dari alamat tersebut (“nonce”).

## Kunci validator {#validators-keys}

Ada juga jenis kunci lain di Ethereum, yang diperkenalkan ketika Ethereum beralih dari proof-of-work ke konsensus berbasis proof-of-stake. Ini adalah kunci 'BLS' dan digunakan untuk mengidentifikasi validator. Kunci-kunci ini dapat digabungkan secara efisien untuk mengurangi bandwidth yang diperlukan agar jaringan dapat mencapai konsensus. Tanpa agregasi kunci ini, taruhan minimum untuk validator akan jauh lebih tinggi.

[Selengkapnya tentang kunci validator](/developers/docs/consensus-mechanisms/pos/keys/).

## Catatan tentang dompet {#a-note-on-wallets}

Akun bukanlah dompet. Dompet adalah sebuah antarmuka atau aplikasi yang memungkinkan Anda berinteraksi dengan akun Ethereum Anda, baik itu akun yang dimiliki secara eksternal atau akun kontrak.

## Demo visual {#a-visual-demo}

Tonton Austin memandu Anda tentang fungsi hash, dan pasangan kunci.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Bacaan lebih lanjut {#further-reading}

- [Memahami Akun Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kontrak pintar](/developers/docs/smart-contracts/)
- [Transaksi](/developers/docs/transactions/)
