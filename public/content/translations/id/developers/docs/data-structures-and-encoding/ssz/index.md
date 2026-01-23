---
title: Serialisasi sederhana
description: Penjelasan mengenai format SSZ Ethereum.
lang: id
sidebarDepth: 2
---

**Simple serialize (SSZ)** adalah metode serialisasi yang digunakan pada Rantai Suar. Ini menggantikan serialisasi RLP yang digunakan pada execution layer di seluruh consensus layer, kecuali pada protokol penemuan peer. Untuk mempelajari lebih lanjut tentang serialisasi RLP, lihat [Recursive-length prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ dirancang agar deterministik dan juga dapat dimerkleisasi secara efisien. SSZ dapat dianggap memiliki dua komponen: sebuah skema serialisasi dan sebuah skema merkleisasi yang dirancang untuk bekerja secara efisien dengan struktur data yang telah diserialisasi.

## Bagaimana cara kerja SSZ? {#how-does-ssz-work}

### Serialisasi {#serialization}

SSZ adalah sebuah skema serialisasi yang tidak bersifat self-describing — melainkan bergantung pada sebuah skema yang harus diketahui terlebih dahulu. Tujuan dari serialisasi SSZ adalah merepresentasikan objek dengan kompleksitas seberapa pun menjadi rangkaian byte. Ini adalah proses yang sangat sederhana untuk "tipe dasar". Elemen ini secara sederhana dikonversi ke byte heksadesimal. Tipe dasar meliputi:

- bilangan bulat yang tidak ditandatangani
- Boolean

Untuk tipe ‘komposit’ yang kompleks, proses serialisasi menjadi lebih rumit karena tipe komposit berisi banyak elemen yang mungkin memiliki tipe berbeda, ukuran berbeda, atau keduanya sekaligus. Jika objek-objek tersebut semuanya memiliki panjang tetap (yaitu ukuran elemennya selalu konstan terlepas dari nilai aktualnya), maka proses serialisasi hanyalah konversi setiap elemen dalam tipe komposit menjadi bytestring little-endian sesuai urutannya. Boundary ini disatukan menjadi satu. Objek yang diserialisasi memiliki representasi bytelist dari elemen-elemen dengan panjang tetap, dalam urutan yang sama seperti saat objek tersebut belum diserialisasi.

Untuk tipe dengan panjang yang bervariasi, data aktual digantikan oleh sebuah nilai offset pada posisi elemen tersebut dalam objek yang diserialisasi. Data aktual ditambahkan ke heap pada akhir objek yang diserialisasikan. Nilai offset adalah indeks yang menunjukkan awal dari data aktual di heap, berfungsi sebagai penunjuk pointer ke byte yang relevan.

Contoh di bawah ini menggambarkan bagaimana mekanisme offset bekerja pada sebuah kontainer yang memiliki elemen dengan panjang tetap dan panjang variabel:

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

`serialized` akan memiliki struktur berikut (hanya diisi hingga 4 bit di sini, diisi hingga 32 bit pada kenyataannya, dan menjaga representasi `int` untuk kejelasan):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   nomor1        nomor2     offset untuk   nomor 3      nilai untuk
                               vektor                     vektor

```

dibagi menjadi beberapa garis untuk kejelasan:

```
[
  37, 0, 0, 0,  # pengodean little-endian dari `number1`.
  55, 0, 0, 0,  # pengodean little-endian dari `number2`.
  16, 0, 0, 0,  # "offset" yang menunjukkan di mana nilai `vector` dimulai (little-endian 16).
  22, 0, 0, 0,  # pengodean little-endian dari `number3`.
  1, 2, 3, 4,   # Nilai aktual di `vector`.
]
```

Ini masih merupakan penyederhanaan — bilangan bulat dan nol pada skema di atas sebenarnya akan disimpan sebagai bytelist, seperti berikut:

```
[
  10100101000000000000000000000000  # pengodean little-endian dari `number1`
  10110111000000000000000000000000  # pengodean little-endian dari `number2`.
  10010000000000000000000000000000  # "offset" yang menunjukkan di mana nilai `vector` dimulai (little-endian 16).
  10010110000000000000000000000000  # pengodean little-endian dari `number3`.
  10000001100000101000001110000100   # Nilai aktual dari bidang `bytes`.
]
```

Jadi, nilai aktual untuk tipe dengan panjang variabel disimpan dalam heap di akhir objek yang diserialisasi, dengan offset-nya ditempatkan pada posisi yang benar dalam daftar field yang terurut.

Ada juga beberapa kasus khusus yang memerlukan perlakuan spesifik, seperti tipe `BitList` yang membutuhkan penambahan batas panjang saat serialisasi dan penghapusan saat deserialisasi. Detail lengkap tersedia di [spesifikasi SSZ](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md).

### Deserialisasi {#deserialization}

Untuk melakukan deserialisasi objek ini membutuhkan <b>skema</b>. Skema mendefinisikan tata letak yang tepat dari data yang diserialisasi sehingga setiap elemen tertentu dapat dideserialisasi dari sekumpulan byte menjadi objek yang bermakna, dengan elemen-elemen yang memiliki tipe, nilai, ukuran, dan posisi yang benar. Skemalah yang memberi tahu proses deserialisasi mana nilai yang merupakan data aktual dan mana yang merupakan offset. Semua nama field hilang ketika sebuah objek diserialisasi, tetapi akan dimunculkan kembali saat deserialisasi sesuai dengan skema.

Lihat [ssz.dev](https://www.ssz.dev/overview) untuk penjelasan interaktif tentang hal ini.

## Merkleisasi {#merkleization}

Objek yang diserialisasi dengan SSZ ini kemudian dapat dimerkleisasi — yaitu diubah menjadi representasi pohon Merkle dari data yang sama. Pertama, jumlah potongan 32-byte dalam objek yang diserialisasi ditentukan. Ini adalah "daun" pohon. Jumlah total leaf harus berupa pangkat 2 agar proses hashing antar leaf pada akhirnya menghasilkan satu hash-tree-root. Jika hal ini tidak terjadi secara alami, daun tambahan yang berisi 32 byte nol ditambahkan. Secara diagramatis:

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

Ada juga kasus di mana leaf pada pohon tidak secara alami terdistribusi merata seperti pada contoh di atas. Sebagai contoh, leaf ke 4 bisa berupa sebuah kontainer dengan banyak elemen yang membutuhkan ‘kedalaman’ tambahan pada pohon Merkle, sehingga menghasilkan pohon yang tidak seimbang.

Alih-alih menyebut elemen-elemen pohon ini sebagai leaf X, node X, dan seterusnya, kita bisa memberikan indeks yang digeneralisasi, dimulai dengan root = 1 lalu menghitung dari kiri ke kanan pada setiap level. Ini adalah indeks umum yang dijelaskan di atas. Setiap elemen dalam daftar yang diserialisasi memiliki indeks yang digeneralisasi sama dengan `2**depth + idx`, di mana `idx` adalah posisi berindeks nol dalam objek yang diserialisasi dan `depth` adalah jumlah level dalam pohon Merkle, yang dapat ditentukan sebagai logaritma basis dua dari jumlah elemen (daun).

## Indeks yang Digeneralisasi {#generalized-indices}

Indeks yang digeneralisasi adalah sebuah bilangan bulat yang merepresentasikan sebuah simpul dalam pohon Merkle biner di mana setiap simpul memiliki indeks yang digeneralisasi `2 ** depth + index in row`.

```
        1           --kedalaman = 0  2**0 + 0 = 1
    2       3       --kedalaman = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --kedalaman = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Representasi ini menghasilkan indeks simpul untuk setiap bagian data dalam pohon Merkle.

## Multibukti {#multiproofs}

Dengan menyediakan daftar indeks yang digeneralisasi yang merepresentasikan suatu elemen tertentu, kita dapat memverifikasinya terhadap hash-tree-root. Akar ini adalah versi realitas yang kita terima. Setiap data yang kita terima dapat diverifikasi terhadap realitas tersebut dengan cara menempatkannya pada posisi yang tepat di dalam pohon Merkle (ditentukan oleh indeks yang digeneralisasi) dan memastikan bahwa root tetap konstan. Ada fungsi-fungsi dalam spesifikasi [di sini](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) yang menunjukkan cara menghitung himpunan simpul minimal yang diperlukan untuk memverifikasi konten dari himpunan indeks yang digeneralisasi tertentu.

Sebagai contoh, untuk memverifikasi data pada indeks 9 di pohon di bawah ini, kita membutuhkan hash dari data pada indeks 8, 9, 5, 3, dan 1.
Hash dari (8,9) seharusnya sama dengan hash (4), yang kemudian di-hash bersama 5 untuk menghasilkan 2, yang di-hash bersama 3 untuk menghasilkan tree root 1. Jika data yang diberikan untuk indeks 9 salah, root akan berubah — kita akan mendeteksi hal ini dan gagal memverifikasi cabang tersebut.

```
* = data yang diperlukan untuk menghasilkan bukti

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Bacaan lebih lanjut {#further-reading}

- [Meningkatkan Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Meningkatkan Ethereum: Merkleisasi](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementasi SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Kalkulator SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
