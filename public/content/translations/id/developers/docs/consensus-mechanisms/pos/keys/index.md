---
title: Kunci dalam bukti kepemilikan Ethereum
description: Penjelasan mengenai kunci yang digunakan dalam mekanisme konsensus proof-of-stake Ethereum
lang: id
---

Ethereum mengamankan aset pengguna dengan menggunakan kriptografi kunci publik-pribadi. Kunci publik digunakan sebagai dasar untuk alamat Ethereum-yaitu, kunci publik dapat dilihat oleh masyarakat umum dan digunakan sebagai pengenal unik. Kunci privat (atau 'rahasia') seharusnya hanya dapat diakses oleh pemilik akun. Kunci pribadi digunakan untuk 'menandatangani' transaksi dan data sehingga kriptografi dapat membuktikan bahwa pemegangnya menyetujui suatu tindakan dari kunci pribadi tertentu.

Kunci-kunci Ethereum dibuat menggunakan [kriptografi kurva eliptik](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Namun, ketika Ethereum beralih dari [bukti kerja](/developers/docs/consensus-mechanisms/pow) ke [bukti taruhan](/developers/docs/consensus-mechanisms/pos), jenis kunci baru ditambahkan ke Ethereum. Kunci asli masih berfungsi sama persis seperti sebelumnya - tidak ada perubahan pada kunci berbasis kurva elips yang mengamankan akun. Akan tetapi, pengguna membutuhkan jenis kunci baru untuk berpartisipasi dalam proof-of-stake dengan melakukan staking ETH dan menjalankan validator. Kebutuhan ini muncul dari tantangan skalabilitas yang terkait dengan banyak pesan yang lewat di antara sejumlah besar validator yang membutuhkan metode kriptografi yang dapat dengan mudah digabungkan untuk mengurangi jumlah komunikasi yang diperlukan agar jaringan dapat mencapai konsensus.

Jenis kunci baru ini menggunakan skema tanda tangan [**Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS memungkinkan agregasi tanda tangan yang sangat efisien, tetapi juga memungkinkan rekayasa balik kunci validator individual yang diagregasi dan sangat ideal untuk mengelola tindakan di antara para validator.

## Dua jenis kunci validator {#two-types-of-keys}

Sebelum beralih ke proof-of-stake, pengguna Ethereum hanya memiliki satu kunci pribadi berbasis kurva elips untuk mengakses dana mereka. Dengan diperkenalkannya bukti taruhan, pengguna yang ingin menjadi staker solo juga memerlukan **kunci validator** dan **kunci penarikan**.

### Kunci validator {#validator-key}

Kunci penandatanganan validator terdiri dari dua elemen:

- Kunci **pribadi** validator
- Kunci **publik** validator

Tujuan dari kunci pribadi validator adalah untuk menandatangani operasi onchain seperti proposal blok dan pengesahan. Karena itu, kunci-kunci ini harus disimpan di dalam dompet panas.

Fleksibilitas ini memiliki keuntungan memindahkan kunci penandatanganan validator dengan sangat cepat dari satu perangkat ke perangkat lain, namun, jika hilang atau dicuri, pencuri mungkin dapat **bertindak jahat** dengan beberapa cara:

- Dapatkan validator yang dipotong oleh:
  - Menjadi pengusul dan menandatangani dua blok suar yang berbeda untuk slot yang sama
  - Menjadi pengesah dan menandatangani pengesahan yang "mengelilingi" pengesahan lainnya
  - Menjadi penguji dan menandatangani dua pengesahan yang berbeda dengan target yang sama
- Memaksa keluar secara sukarela, yang menghentikan validator dari staking, dan memberikan akses ke saldo ETH kepada pemilik kunci penarikan

**Kunci publik validator** disertakan dalam data transaksi saat pengguna mendepositkan ETH ke kontrak deposit penaruhan. Ini dikenal sebagai _data deposit_ dan memungkinkan Ethereum untuk mengidentifikasi validator.

### Kredensial penarikan {#withdrawal-credentials}

Setiap validator memiliki properti yang dikenal sebagai _kredensial penarikan_. Bidang 32-bita ini diawali dengan `0x00`, yang mewakili kredensial penarikan BLS, atau `0x01`, yang mewakili kredensial yang menunjuk ke alamat eksekusi.

Validator dengan kunci BLS `0x00` harus memperbarui kredensial ini untuk menunjuk ke alamat eksekusi agar dapat mengaktifkan pembayaran saldo berlebih atau penarikan penuh dari penaruhan. Ini dapat dilakukan dengan menyediakan alamat eksekusi di data deposit selama pembuatan kunci awal, _ATAU_ dengan menggunakan kunci penarikan di kemudian hari untuk menandatangani dan menyiarkan pesan `BLSToExecutionChange`.

### Kunci penarikan {#withdrawal-key}

Kunci penarikan akan diperlukan untuk memperbarui kredensial penarikan agar mengarah ke alamat eksekusi, jika tidak ditetapkan saat deposit awal. Ini akan memungkinkan pembayaran saldo berlebih mulai diproses, dan juga memungkinkan pengguna untuk menarik ETH yang dipertaruhkan sepenuhnya.

Sama seperti kunci validator, kunci penarikan juga terdiri dari dua komponen:

- Kunci **pribadi** penarikan
- Kunci **publik** penarikan

Kehilangan kunci ini sebelum memperbarui kredensial penarikan ke tipe `0x01` berarti kehilangan akses ke saldo validator. Validator masih dapat menandatangani pengesahan dan pemblokiran karena tindakan ini membutuhkan kunci pribadi validator, namun hanya sedikit atau bahkan tidak ada insentif jika kunci penarikan hilang.

Memisahkan kunci validator dari kunci akun Ethereum memungkinkan beberapa validator dijalankan oleh satu pengguna.

![skema kunci validator](validator-key-schematic.png)

**Catatan**: Keluar dari tugas penaruhan dan menarik saldo validator saat ini memerlukan penandatanganan [pesan keluar sukarela (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) dengan kunci validator. Namun, [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) adalah proposal yang akan memungkinkan pengguna untuk memicu keluarnya validator dan menarik saldonya dengan menandatangani pesan keluar dengan kunci penarikan di masa mendatang. Ini akan mengurangi asumsi kepercayaan dengan memungkinkan penaruh yang mendelegasikan ETH ke [penyedia staking-as-a-service](/staking/saas/#what-is-staking-as-a-service) untuk tetap mengontrol dana mereka.

## Menurunkan kunci dari frase benih {#deriving-keys-from-seed}

Jika setiap 32 ETH yang di-stake membutuhkan satu set baru yang terdiri dari 2 kunci yang sepenuhnya independen, manajemen kunci akan dengan cepat menjadi berat, terutama bagi pengguna yang menjalankan banyak validator. Sebaliknya, beberapa kunci validator dapat diturunkan dari satu rahasia umum dan menyimpan satu rahasia tersebut memungkinkan akses ke beberapa kunci validator.

[Mnemonik](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) dan jalur adalah fitur utama yang sering ditemui pengguna saat [mereka mengakses](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) dompet mereka. Mnemonik adalah sebuah urutan kata yang bertindak sebagai benih awal untuk kunci pribadi. Ketika digabungkan dengan data tambahan, mnemonik menghasilkan hash yang dikenal sebagai 'kunci utama'. Hal ini dapat dianggap sebagai akar dari sebuah pohon. Cabang-cabang dari akar ini kemudian dapat diturunkan menggunakan jalur hirarkis sehingga simpul-simpul anak dapat ada sebagai kombinasi dari hash simpul induknya dan indeksnya di dalam pohon. Baca tentang standar [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) dan [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) untuk pembuatan kunci berbasis mnemonik.

Jalur-jalur ini memiliki struktur sebagai berikut, yang akan familiar bagi pengguna yang telah berinteraksi dengan dompet perangkat keras:

```
`m/44'/60'/0'/0`
```

Garis miring pada jalur ini memisahkan komponen-komponen kunci privat sebagai berikut:

```
kunci_induk / tujuan / jenis_koin / akun / perubahan / indeks_alamat
```

Logika ini memungkinkan pengguna untuk melampirkan validator sebanyak mungkin ke satu **frase mnemonik** karena akar pohon bisa sama, dan pembedaan dapat terjadi di cabang-cabangnya. Pengguna dapat **menurunkan sejumlah kunci** dari frase mnemonik.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Setiap cabang dipisahkan oleh `/` jadi `m/2` berarti mulai dengan kunci induk dan ikuti cabang 2. Dalam skema di bawah ini, satu frasa mnemonik digunakan untuk menyimpan tiga kunci penarikan, masing-masing dengan dua validator terkait.

![logika kunci validator](multiple-keys.png)

## Bacaan lebih lanjut {#further-reading}

- [Postingan blog Ethereum Foundation oleh Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys/)
- [Pembuatan kunci EIP-2333 BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Keluar yang Dipicu Lapisan Eksekusi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Manajemen kunci dalam skala besar](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
