---
title: Kunci dalam Bukti Kepemilikan (PoS) Ethereum
description: Penjelasan tentang kunci yang digunakan dalam mekanisme konsensus Bukti Kepemilikan (PoS) Ethereum
lang: id
---

Ethereum mengamankan aset pengguna menggunakan kriptografi kunci publik-privat. Kunci publik digunakan sebagai dasar untuk alamat Ethereum—yaitu, dapat dilihat oleh masyarakat umum dan digunakan sebagai pengidentifikasi unik. Kunci privat (atau 'rahasia') hanya boleh diakses oleh pemilik akun. Kunci privat digunakan untuk 'menandatangani' transaksi dan data sehingga kriptografi dapat membuktikan bahwa pemegangnya menyetujui suatu tindakan dari kunci privat tertentu.

Kunci Ethereum dihasilkan menggunakan [kriptografi kurva eliptik](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Namun, ketika Ethereum beralih dari [Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow) ke [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos), jenis kunci baru ditambahkan ke Ethereum. Kunci asli masih berfungsi persis sama seperti sebelumnya—tidak ada perubahan pada kunci berbasis kurva eliptik yang mengamankan akun. Namun, pengguna membutuhkan jenis kunci baru untuk berpartisipasi dalam Bukti Kepemilikan (PoS) dengan melakukan staking ETH dan menjalankan validator. Kebutuhan ini muncul dari tantangan skalabilitas yang terkait dengan banyaknya pesan yang berlalu-lalang di antara sejumlah besar validator yang mewajibkan metode kriptografi yang dapat dengan mudah diagregasi untuk mengurangi jumlah komunikasi yang diperlukan agar jaringan mencapai konsensus.

Jenis kunci baru ini menggunakan [skema tanda tangan **Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS memungkinkan agregasi tanda tangan yang sangat efisien tetapi juga memungkinkan rekayasa balik dari kunci validator individu yang diagregasi dan sangat ideal untuk mengelola tindakan antar validator.

## Dua jenis kunci validator {#two-types-of-keys}

Sebelum beralih ke Bukti Kepemilikan (PoS), pengguna Ethereum hanya memiliki satu kunci privat berbasis kurva eliptik untuk mengakses dana mereka. Dengan diperkenalkannya Bukti Kepemilikan (PoS), pengguna yang ingin menjadi staker solo juga mewajibkan **kunci validator** dan **kunci penarikan**.

### Kunci validator {#validator-key}

Kunci penandatanganan validator terdiri dari dua elemen:

- Kunci **privat** validator
- Kunci **publik** validator

Tujuan dari kunci privat validator adalah untuk menandatangani operasi onchain seperti proposal blok dan atestasi. Oleh karena itu, kunci-kunci ini harus disimpan di dalam dompet panas.

Fleksibilitas ini memiliki keuntungan untuk memindahkan kunci penandatanganan validator dengan sangat cepat dari satu perangkat ke perangkat lain, namun, jika kunci tersebut hilang atau dicuri, pencuri mungkin dapat **bertindak jahat** dalam beberapa cara:

- Membuat validator terkena pemotongan dengan:
  - Menjadi pengusul dan menandatangani dua blok suar (beacon block) yang berbeda untuk slot yang sama
  - Menjadi pembuat atestasi (attester) dan menandatangani atestasi yang "mengelilingi" atestasi lainnya
  - Menjadi pembuat atestasi dan menandatangani dua atestasi berbeda yang memiliki target yang sama
- Memaksa keluar secara sukarela, yang menghentikan validator dari staking, dan memberikan akses ke saldo ETH-nya kepada pemilik kunci penarikan

**Kunci publik validator** disertakan dalam data transaksi ketika pengguna menyetorkan ETH ke kontrak deposit staking. Ini dikenal sebagai _data deposit_ dan memungkinkan Ethereum untuk mengidentifikasi validator.

### Kredensial penarikan {#withdrawal-credentials}

Setiap validator memiliki properti yang dikenal sebagai _kredensial penarikan_. Byte pertama dari bidang 32-byte ini mengidentifikasi jenis akun: `0x00` mewakili kredensial BLS asli (pra-Shapella, tidak dapat ditarik), `0x01` mewakili kredensial warisan yang menunjuk ke alamat eksekusi, dan `0x02` mewakili jenis kredensial pemajemukan modern.

Validator dengan kunci BLS `0x00` wajib memperbarui kredensial ini untuk menunjuk ke alamat eksekusi guna mengaktifkan pembayaran kelebihan saldo atau penarikan penuh dari staking. Hal ini dapat dilakukan dengan memberikan alamat eksekusi dalam data deposit selama pembuatan kunci awal, _ATAU_ dengan menggunakan kunci penarikan di kemudian hari untuk menandatangani dan menyiarkan pesan `BLSToExecutionChange`.

[Lebih lanjut tentang kredensial penarikan validator](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Kunci penarikan {#withdrawal-key}

Kunci penarikan akan diwajibkan untuk memperbarui kredensial penarikan agar menunjuk ke alamat eksekusi, jika tidak diatur selama deposit awal. Ini akan memungkinkan pembayaran kelebihan saldo mulai diproses, dan juga akan memungkinkan pengguna untuk menarik sepenuhnya ETH yang di-stake.

Sama seperti kunci validator, kunci penarikan juga terdiri dari dua komponen:

- Kunci **privat** penarikan
- Kunci **publik** penarikan

Kehilangan kunci ini sebelum memperbarui kredensial penarikan ke jenis `0x01` berarti kehilangan akses ke saldo validator. Validator masih dapat menandatangani atestasi dan blok karena tindakan ini mewajibkan kunci privat validator, namun hanya ada sedikit atau tidak ada insentif sama sekali jika kunci penarikan hilang.

Memisahkan kunci validator dari kunci akun Ethereum memungkinkan beberapa validator dijalankan oleh satu pengguna.

![validator key schematic](validator-key-schematic.png)

**Catatan**: Keluar dari tugas staking dan menarik saldo validator saat ini mewajibkan penandatanganan [pesan keluar sukarela (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) dengan kunci validator. Namun, [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) adalah proposal yang akan memungkinkan pengguna untuk memicu keluarnya validator dan menarik saldonya dengan menandatangani pesan keluar menggunakan kunci penarikan di masa mendatang. Ini akan mengurangi asumsi kepercayaan dengan memungkinkan staker yang mendelegasikan ETH ke [penyedia staking-as-a-service](/staking/saas/#what-is-staking-as-a-service) untuk tetap memegang kendali atas dana mereka.

## Menurunkan kunci dari frasa benih {#deriving-keys-from-seed}

Jika setiap 32 ETH yang di-stake mewajibkan set baru yang terdiri dari 2 kunci yang sepenuhnya independen, manajemen kunci akan dengan cepat menjadi tidak praktis, terutama bagi pengguna yang menjalankan beberapa validator. Sebaliknya, beberapa kunci validator dapat diturunkan dari satu rahasia umum tunggal dan menyimpan rahasia tunggal tersebut memungkinkan akses ke beberapa kunci validator.

[Mnemonic](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) dan jalur adalah fitur menonjol yang sering ditemui pengguna saat [mereka mengakses](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) dompet mereka. Mnemonic adalah urutan kata yang bertindak sebagai benih awal untuk kunci privat. Ketika digabungkan dengan data tambahan, mnemonic menghasilkan hash yang dikenal sebagai 'kunci utama'. Ini dapat dianggap sebagai akar dari sebuah pohon. Cabang-cabang dari akar ini kemudian dapat diturunkan menggunakan jalur hierarkis sehingga node anak dapat ada sebagai kombinasi dari hash node induknya dan indeks mereka di dalam pohon. Baca tentang standar [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) dan [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) untuk pembuatan kunci berbasis mnemonic.

Jalur-jalur ini memiliki struktur berikut, yang akan familier bagi pengguna yang pernah berinteraksi dengan dompet perangkat keras:

```
m/44'/60'/0'/0`
```

Garis miring di jalur ini memisahkan komponen kunci privat sebagai berikut:

```
master_key / purpose / coin_type / account / change / address_index
```

Logika ini memungkinkan pengguna untuk melampirkan sebanyak mungkin validator ke satu **frasa mnemonic** karena akar pohonnya bisa sama, dan diferensiasi dapat terjadi di cabang-cabangnya. Pengguna dapat **menurunkan sejumlah kunci** dari frasa mnemonic tersebut.

```
[m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Setiap cabang dipisahkan oleh `/` sehingga `m/2` berarti mulai dengan kunci utama dan ikuti cabang 2. Dalam skema di bawah ini, satu frasa mnemonic digunakan untuk menyimpan tiga kunci penarikan, masing-masing dengan dua validator terkait.

![validator key logic](multiple-keys.png)

## Bacaan lebih lanjut {#further-reading}

- [Postingan blog Yayasan Ethereum oleh Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys)
- [Pembuatan kunci BLS12-381 EIP-2333](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Keluar yang Dipicu Lapisan Eksekusi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Manajemen kunci dalam skala besar](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)