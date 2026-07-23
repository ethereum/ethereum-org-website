---
title: Akun Ethereum
description: "Penjelasan tentang akun Ethereum – struktur datanya dan hubungannya dengan kriptografi pasangan kunci."
lang: id
---

Sebuah akun [Ethereum](/) adalah entitas dengan saldo Ether (ETH) yang dapat mengirim pesan di Ethereum. Akun dapat dikendalikan oleh pengguna atau diterapkan sebagai kontrak pintar.

## Prasyarat {#prerequisites}

Untuk membantu Anda memahami halaman ini dengan lebih baik, kami sarankan Anda membaca terlebih dahulu [pengantar Ethereum](/developers/docs/intro-to-ethereum/) kami.

## Jenis akun {#types-of-account}

Ethereum memiliki dua jenis akun:

- Akun yang dimiliki secara eksternal (EOA) – dikendalikan oleh siapa saja yang memiliki kunci privat
- Akun kontrak – sebuah kontrak pintar yang diterapkan ke jaringan, dikendalikan oleh kode. Pelajari tentang [kontrak pintar](/developers/docs/smart-contracts/)

Kedua jenis akun memiliki kemampuan untuk:

- Menerima, menyimpan, dan mengirim ETH dan token
- Berinteraksi dengan kontrak pintar yang diterapkan

### Perbedaan utama {#key-differences}

**Dimiliki secara eksternal**

- Membuat akun tidak memerlukan biaya
- Dapat memulai transaksi
- Transaksi antara akun yang dimiliki secara eksternal hanya dapat berupa transfer ETH/token
- Terdiri dari pasangan kunci kriptografi: kunci publik dan privat yang mengendalikan aktivitas akun

**Kontrak**

- Membuat kontrak memerlukan biaya karena Anda menggunakan penyimpanan jaringan
- Hanya dapat mengirim pesan sebagai respons terhadap penerimaan transaksi
- Transaksi dari akun eksternal ke akun kontrak dapat memicu kode yang dapat mengeksekusi berbagai tindakan berbeda, seperti mentransfer token atau bahkan membuat kontrak baru
- Akun kontrak tidak memiliki kunci privat. Sebaliknya, akun ini dikendalikan oleh logika kode kontrak pintar

## Memeriksa sebuah akun {#an-account-examined}

Akun Ethereum memiliki empat bidang:

- `nonce` – Sebuah penghitung yang menunjukkan jumlah transaksi yang dikirim dari akun yang dimiliki secara eksternal atau jumlah kontrak yang dibuat oleh akun kontrak. Hanya satu transaksi dengan nonce tertentu yang dapat dieksekusi untuk setiap akun, melindungi dari serangan ulangan (replay attacks) di mana transaksi yang ditandatangani disiarkan dan dieksekusi berulang kali.
- `balance` – Jumlah Wei yang dimiliki oleh alamat ini. Wei adalah denominasi dari ETH dan terdapat 1e+18 Wei per ETH.
- `codeHash` – Hash ini merujuk pada _kode_ sebuah akun di Mesin Virtual Ethereum (EVM). Akun kontrak memiliki fragmen kode yang diprogram di dalamnya yang dapat melakukan berbagai operasi. Kode EVM ini dieksekusi jika akun mendapatkan panggilan pesan. Kode ini tidak dapat diubah, tidak seperti bidang akun lainnya. Semua fragmen kode tersebut dimuat dalam basis data state di bawah hash yang sesuai untuk diambil kembali nanti. Nilai hash ini dikenal sebagai codeHash. Untuk akun yang dimiliki secara eksternal, bidang codeHash adalah hash dari string kosong.
- `storageRoot` – Terkadang dikenal sebagai hash penyimpanan. Sebuah hash 256-bit dari node akar sebuah [Trie Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) yang menyandikan isi penyimpanan akun (sebuah pemetaan antara nilai integer 256-bit), disandikan ke dalam trie sebagai pemetaan dari hash Keccak-256 bit dari kunci integer 256-bit ke nilai integer 256-bit yang disandikan RLP. Trie ini menyandikan hash dari isi penyimpanan akun ini, dan secara bawaan kosong.

![A diagram showing the make up of an account](./accounts.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Akun yang dimiliki secara eksternal dan pasangan kunci {#externally-owned-accounts-and-key-pairs}

Sebuah akun terdiri dari sepasang kunci kriptografi: publik dan privat. Kunci-kunci ini membantu membuktikan bahwa sebuah transaksi benar-benar ditandatangani oleh pengirim dan mencegah pemalsuan. Kunci privat Anda adalah apa yang Anda gunakan untuk menandatangani transaksi, sehingga kunci ini memberi Anda hak asuh atas dana yang terkait dengan akun Anda. Anda tidak pernah benar-benar memegang mata uang kripto, Anda memegang kunci privat – dana tersebut selalu berada di buku besar Ethereum.

Hal ini mencegah pelaku jahat menyiarkan transaksi palsu karena Anda selalu dapat memverifikasi pengirim sebuah transaksi.

Jika Alice ingin mengirim Ether dari akunnya sendiri ke akun Bob, Alice perlu membuat permintaan transaksi dan mengirimkannya ke jaringan untuk diverifikasi. Penggunaan kriptografi kunci publik oleh Ethereum memastikan bahwa Alice dapat membuktikan bahwa dia yang awalnya memulai permintaan transaksi tersebut. Tanpa mekanisme kriptografi, musuh yang jahat, Eve, dapat dengan mudah menyiarkan permintaan secara publik yang terlihat seperti "kirim 5 ETH dari akun Alice ke akun Eve," dan tidak ada yang dapat memverifikasi bahwa permintaan itu tidak berasal dari Alice.

## Pembuatan akun {#account-creation}

Saat Anda ingin membuat akun, sebagian besar Pustaka akan menghasilkan kunci privat acak untuk Anda.

Kunci privat terdiri dari 64 karakter hex dan dapat dienkripsi dengan kata sandi.

Contoh:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Kunci publik dihasilkan dari kunci privat menggunakan [Algoritma Tanda Tangan Digital Kurva Eliptik](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Anda mendapatkan alamat publik untuk akun Anda dengan mengambil 20 byte terakhir dari hash Keccak-256 dari kunci publik dan menambahkan `0x` di awal.

Ini berarti Akun yang dimiliki secara eksternal (EOA) memiliki alamat 42 karakter (segmen 20-byte yang merupakan 40 karakter heksadesimal ditambah awalan `0x`).

Contoh:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Contoh berikut menunjukkan cara menggunakan alat penandatanganan yang disebut [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) untuk menghasilkan akun baru. Clef adalah alat manajemen akun dan penandatanganan yang dibundel dengan klien Ethereum, [Geth](https://geth.ethereum.org). Perintah `clef newaccount` membuat pasangan kunci baru dan menyimpannya dalam penyimpanan kunci yang dienkripsi.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Dokumentasi Geth](https://geth.ethereum.org/docs)

Dimungkinkan untuk menurunkan kunci publik baru dari kunci privat Anda, tetapi Anda tidak dapat menurunkan kunci privat dari kunci publik. Sangat penting untuk menjaga kunci privat Anda tetap aman dan, seperti namanya, **PRIVAT**.

Anda memerlukan kunci privat untuk menandatangani pesan dan transaksi yang menghasilkan tanda tangan. Orang lain kemudian dapat mengambil tanda tangan tersebut untuk menurunkan kunci publik Anda, membuktikan pembuat pesan tersebut. Dalam aplikasi Anda, Anda dapat menggunakan Pustaka JavaScript untuk mengirim transaksi ke jaringan.

## Akun kontrak {#contract-accounts}

Akun kontrak juga memiliki alamat heksadesimal 42 karakter:

Contoh:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Alamat kontrak biasanya diberikan saat sebuah kontrak diterapkan ke rantai blok Ethereum. Alamat tersebut berasal dari alamat pembuat dan jumlah transaksi yang dikirim dari alamat tersebut ("nonce").

## Kunci validator {#validators-keys}

Ada juga jenis kunci lain di Ethereum, yang diperkenalkan saat Ethereum beralih dari konsensus berbasis Bukti Kerja (PoW) ke Bukti Kepemilikan (PoS). Ini adalah kunci 'BLS' dan digunakan untuk mengidentifikasi validator. Kunci-kunci ini dapat diagregasi secara efisien untuk mengurangi bandwidth yang diperlukan jaringan untuk mencapai konsensus. Tanpa agregasi kunci ini, stake minimum untuk seorang validator akan jauh lebih tinggi.

[Lebih lanjut tentang kunci validator](/developers/docs/consensus-mechanisms/pos/keys/).

## Catatan tentang dompet {#a-note-on-wallets}

Sebuah akun bukanlah sebuah dompet. Dompet adalah antarmuka atau aplikasi yang memungkinkan Anda berinteraksi dengan akun Ethereum Anda, baik akun yang dimiliki secara eksternal maupun akun kontrak.

## Demo visual {#a-visual-demo}

Tonton Austin memandu Anda melalui fungsi hash, dan pasangan kunci.

<VideoWatch slug="hash-function-eth-build" />

<VideoWatch slug="key-pair-eth-build" />

## Bacaan lebih lanjut {#further-reading}

- [Memahami Akun Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - Etherscan

_Tahu sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Kontrak pintar](/developers/docs/smart-contracts/)
- [Transaksi](/developers/docs/transactions/)