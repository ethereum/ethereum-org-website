---
title: Simple serialize
description: Penjelasan tentang format SSZ Ethereum.
lang: id
sidebarDepth: 2
---

**Simple serialize (SSZ)** adalah metode serialisasi yang digunakan pada Rantai suar. Metode ini menggantikan serialisasi RLP yang digunakan pada lapisan eksekusi di mana saja di seluruh lapisan konsensus kecuali pada protokol penemuan peer. Untuk mempelajari lebih lanjut tentang serialisasi RLP, lihat [Recursive-length prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ dirancang agar bersifat deterministik dan juga untuk melakukan Merkleize secara efisien. SSZ dapat dianggap memiliki dua komponen: skema serialisasi dan skema Merkleisasi yang dirancang untuk bekerja secara efisien dengan struktur data yang diserialisasi.

## Bagaimana cara kerja SSZ? {#how-does-ssz-work}

### Serialisasi {#serialization}

SSZ adalah skema serialisasi yang tidak mendeskripsikan dirinya sendiri - melainkan bergantung pada skema yang harus diketahui sebelumnya. Tujuan dari serialisasi SSZ adalah untuk merepresentasikan objek dengan kompleksitas arbitrer sebagai string byte. Ini adalah proses yang sangat sederhana untuk "tipe dasar". Elemen tersebut cukup dikonversi menjadi byte heksadesimal. Tipe dasar meliputi:

- bilangan bulat tak bertanda (unsigned integer)
- Boolean

Untuk tipe "komposit" yang kompleks, serialisasi menjadi lebih rumit karena tipe komposit berisi beberapa elemen yang mungkin memiliki tipe atau ukuran yang berbeda, atau keduanya. Jika semua objek ini memiliki panjang tetap (yaitu, ukuran elemen akan selalu konstan terlepas dari nilai aktualnya), serialisasi hanyalah konversi dari setiap elemen dalam tipe komposit yang diurutkan menjadi bytestring little-endian. Bytestring ini digabungkan bersama. Objek yang diserialisasi memiliki representasi bytelist dari elemen dengan panjang tetap dalam urutan yang sama seperti yang muncul dalam objek yang dideserialisasi.

Untuk tipe dengan panjang variabel, data aktual diganti dengan nilai "offset" pada posisi elemen tersebut dalam objek yang diserialisasi. Data aktual ditambahkan ke heap di akhir objek yang diserialisasi. Nilai offset adalah indeks untuk awal data aktual di heap, yang bertindak sebagai penunjuk ke byte yang relevan.

Contoh di bawah ini mengilustrasikan bagaimana offset bekerja untuk kontainer dengan elemen panjang tetap dan variabel:

```Rust

    struct Dummy {

        number1: u64,
        number2: u64,
        vector: Vec<u8>,
        number3: u64
    }

    dummy = Dummy{

        number1: 37,
        number2: 55,
        vector: vec![1,2,3,4],
        number3: 22,
    }

    serialized = ssz.serialize(dummy)

```

`serialized` akan memiliki struktur berikut (hanya di-pad ke 4 bit di sini, di-pad ke 32 bit pada kenyataannya, dan mempertahankan representasi `int` untuk kejelasan):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset utk    number 3    nilai utk
                              vektor                   vektor
```

dibagi menjadi beberapa baris untuk kejelasan:

```
[
  37, 0, 0, 0,  # pengodean little-endian dari `number1`.
  55, 0, 0, 0,  # pengodean little-endian dari `number2`.
  16, 0, 0, 0,  # "Offset" yang menunjukkan di mana nilai `vector` dimulai (little-endian 16).
  22, 0, 0, 0,  # pengodean little-endian dari `number3`.
  1, 2, 3, 4,   # Nilai aktual dalam `vector`.
]
```

Ini masih merupakan penyederhanaan - bilangan bulat dan nol dalam skema di atas sebenarnya akan disimpan sebagai bytelist, seperti ini:

```
[
  10100101000000000000000000000000  # pengodean little-endian dari `number1`
  10110111000000000000000000000000  # pengodean little-endian dari `number2`.
  10010000000000000000000000000000  # "Offset" yang menunjukkan di mana nilai `vector` dimulai (little-endian 16).
  10010110000000000000000000000000  # pengodean little-endian dari `number3`.
  10000001100000101000001110000100   # Nilai aktual dari bidang `bytes`.
]
```

Jadi, nilai aktual untuk tipe dengan panjang variabel disimpan dalam heap di akhir objek yang diserialisasi dengan offset-nya disimpan di posisi yang benar dalam daftar bidang yang diurutkan.

Ada juga beberapa kasus khusus yang memerlukan perlakuan spesifik, seperti tipe `BitList` yang mewajibkan penambahan batas panjang selama serialisasi dan dihapus selama deserialisasi. Detail lengkap tersedia di [spesifikasi SSZ](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

### Deserialisasi {#deserialization}

Untuk mendeserialisasi objek ini mewajibkan <b>skema</b>. Skema mendefinisikan tata letak yang tepat dari data yang diserialisasi sehingga setiap elemen spesifik dapat dideserialisasi dari blob byte menjadi objek yang bermakna dengan elemen yang memiliki tipe, nilai, ukuran, dan posisi yang tepat. Skemalah yang memberi tahu pendeserialisasi nilai mana yang merupakan nilai aktual dan mana yang merupakan offset. Semua nama bidang menghilang saat objek diserialisasi, tetapi diinstansiasi ulang pada saat deserialisasi sesuai dengan skema.

Lihat [ssz.dev](https://www.ssz.dev/overview) untuk penjelasan interaktif tentang hal ini.

## Merkleisasi {#merkleization}

Objek yang diserialisasi SSZ ini kemudian dapat di-merkleize - yaitu diubah menjadi representasi pohon Merkle dari data yang sama. Pertama, jumlah potongan 32-byte dalam objek yang diserialisasi ditentukan. Ini adalah "daun" dari pohon tersebut. Jumlah total daun harus merupakan pangkat 2 sehingga proses hash daun-daun tersebut secara bersamaan pada akhirnya menghasilkan satu akar pohon hash (hash-tree-root). Jika secara alami tidak demikian, daun tambahan yang berisi 32 byte nol akan ditambahkan. Secara diagram:

```
akar pohon hash
            /     \
           /       \
          /         \
         /           \
   hash dari daun  hash dari daun
     1 dan 2         3 dan 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 daun1     daun2  daun3     daun4
```

Ada juga kasus di mana daun-daun pohon tidak terdistribusi secara merata seperti pada contoh di atas. Misalnya, daun 4 bisa berupa kontainer dengan beberapa elemen yang mewajibkan penambahan "kedalaman" ekstra pada pohon Merkle, sehingga menciptakan pohon yang tidak rata.

Alih-alih menyebut elemen pohon ini sebagai daun X, node X, dll., kita dapat memberinya indeks yang digeneralisasi, dimulai dengan akar = 1 dan menghitung dari kiri ke kanan di sepanjang setiap tingkat. Ini adalah indeks yang digeneralisasi yang dijelaskan di atas. Setiap elemen dalam daftar yang diserialisasi memiliki indeks yang digeneralisasi yang sama dengan `2**depth + idx` di mana idx adalah posisi indeks nolnya dalam objek yang diserialisasi dan kedalaman adalah jumlah tingkat dalam pohon Merkle, yang dapat ditentukan sebagai logaritma basis dua dari jumlah elemen (daun).

## Indeks yang digeneralisasi {#generalized-indices}

Indeks yang digeneralisasi adalah bilangan bulat yang merepresentasikan node dalam pohon Merkle biner di mana setiap node memiliki indeks yang digeneralisasi `2 ** depth + index in row`.

```
1           --kedalaman = 0  2**0 + 0 = 1
    2       3       --kedalaman = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --kedalaman = 2  2**2 + 0 = 4, 2**2 + 1 = 5...
```

Representasi ini menghasilkan indeks node untuk setiap bagian data dalam pohon Merkle.

## Multiproof {#multiproofs}

Menyediakan daftar indeks yang digeneralisasi yang merepresentasikan elemen spesifik memungkinkan kita untuk memverifikasinya terhadap akar pohon hash (hash-tree-root). Akar ini adalah versi realitas yang kita terima. Data apa pun yang diberikan kepada kita dapat diverifikasi terhadap realitas tersebut dengan memasukkannya ke tempat yang tepat di pohon Merkle (ditentukan oleh indeks yang digeneralisasi) dan mengamati bahwa akarnya tetap konstan. Ada fungsi dalam spesifikasi [di sini](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) yang menunjukkan cara menghitung set node minimal yang diwajibkan untuk memverifikasi konten dari set indeks yang digeneralisasi tertentu.

Misalnya, untuk memverifikasi data pada indeks 9 di pohon di bawah ini, kita memerlukan hash dari data pada indeks 8, 9, 5, 3, 1.
Hash dari (8,9) harus sama dengan hash (4), yang di-hash dengan 5 untuk menghasilkan 2, yang di-hash dengan 3 untuk menghasilkan akar pohon 1. Jika data yang salah diberikan untuk 9, akarnya akan berubah - kita akan mendeteksi ini dan gagal memverifikasi cabang tersebut.

```
* = data yang diwajibkan untuk menghasilkan bukti

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15
```

## Bacaan lebih lanjut {#further-reading}

- [Memperbarui Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Memperbarui Ethereum: Merkleisasi](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementasi SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Kalkulator SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)