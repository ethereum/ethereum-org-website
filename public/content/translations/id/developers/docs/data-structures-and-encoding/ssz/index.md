---
title: Simple serialize
description: Penjelasan tentang format SSZ Ethereum.
lang: id
sidebarDepth: 2
---

**Simple serialize (SSZ)** adalah metode serialisasi yang digunakan pada beacon chain. Ini menggantikan serialisasi RLP yang digunakan pada lapisan eksekusi di mana saja di seluruh lapisan konsensus kecuali protokol penemuan rekan (peer discovery protocol). Untuk mempelajari lebih lanjut tentang serialisasi RLP, lihat [Recursive-length prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ dirancang agar deterministik dan juga untuk melakukan Merkleize secara efisien. SSZ dapat dianggap memiliki dua komponen: skema serialisasi dan skema Merkleization yang dirancang untuk bekerja secara efisien dengan struktur data yang diserialisasi.

## Bagaimana cara kerja SSZ? {#how-does-ssz-work}

### Serialisasi {#serialization}

SSZ adalah skema serialisasi yang tidak mendeskripsikan dirinya sendiri - melainkan bergantung pada skema yang harus diketahui sebelumnya. Tujuan dari serialisasi SSZ adalah untuk merepresentasikan objek dengan kompleksitas arbitrer sebagai string byte. Ini adalah proses yang sangat sederhana untuk "tipe dasar". Elemen tersebut hanya dikonversi menjadi byte heksadesimal. Tipe dasar meliputi:

- bilangan bulat tak bertanda (unsigned integers)
- Boolean

Untuk tipe "komposit" yang kompleks, serialisasi lebih rumit karena tipe komposit berisi beberapa elemen yang mungkin memiliki tipe yang berbeda atau ukuran yang berbeda, atau keduanya. Di mana semua objek ini memiliki panjang tetap (yaitu, ukuran elemen akan selalu konstan terlepas dari nilai aktualnya), serialisasi hanyalah konversi dari setiap elemen dalam tipe komposit yang diurutkan menjadi bytestring little-endian. Bytestring ini digabungkan bersama. Objek yang diserialisasi memiliki representasi bytelist dari elemen dengan panjang tetap dalam urutan yang sama seperti yang muncul di objek yang dideserialisasi.

Untuk tipe dengan panjang variabel, data aktual diganti dengan nilai "offset" pada posisi elemen tersebut dalam objek yang diserialisasi. Data aktual ditambahkan ke heap di akhir objek yang diserialisasi. Nilai offset adalah indeks untuk awal data aktual di heap, bertindak sebagai penunjuk ke byte yang relevan.

Contoh di bawah ini mengilustrasikan bagaimana offsetting bekerja untuk wadah dengan elemen panjang tetap dan variabel:

```rust

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
   number1       number2    offset for    number 3    value for
                              vector                   vector

```

dibagi menjadi beberapa baris untuk kejelasan:

```
[
  37, 0, 0, 0,  # little-endian encoding of `number1`.
  55, 0, 0, 0,  # little-endian encoding of `number2`.
  16, 0, 0, 0,  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  22, 0, 0, 0,  # little-endian encoding of `number3`.
  1, 2, 3, 4,   # The actual values in `vector`.
]
```

Ini masih merupakan penyederhanaan - bilangan bulat dan nol dalam skema di atas sebenarnya akan disimpan sebagai bytelist, seperti ini:

```
[
  10100101000000000000000000000000  # little-endian encoding of `number1`
  10110111000000000000000000000000  # little-endian encoding of `number2`.
  10010000000000000000000000000000  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  10010110000000000000000000000000  # little-endian encoding of `number3`.
  10000001100000101000001110000100   # The actual value of the `bytes` field.
]
```

Jadi nilai aktual untuk tipe panjang variabel disimpan dalam heap di akhir objek yang diserialisasi dengan offset-nya disimpan di posisi yang benar dalam daftar bidang yang diurutkan.

Ada juga beberapa kasus khusus yang memerlukan perlakuan spesifik, seperti tipe `BitList` yang memerlukan batas panjang untuk ditambahkan selama serialisasi dan dihapus selama deserialisasi. Detail lengkap tersedia di [spesifikasi SSZ](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

### Deserialisasi {#deserialization}

Untuk mendeserialisasi objek ini memerlukan <b>skema</b>. Skema mendefinisikan tata letak yang tepat dari data yang diserialisasi sehingga setiap elemen spesifik dapat dideserialisasi dari blob byte menjadi objek yang bermakna dengan elemen yang memiliki tipe, nilai, ukuran, dan posisi yang tepat. Skemalah yang memberi tahu pendeserialisasi nilai mana yang merupakan nilai aktual dan mana yang merupakan offset. Semua nama bidang menghilang ketika sebuah objek diserialisasi, tetapi diinstansiasi ulang pada deserialisasi sesuai dengan skema.

Lihat [ssz.dev](https://www.ssz.dev/overview) untuk penjelasan interaktif tentang hal ini.

## Merkleization {#merkleization}

Objek yang diserialisasi SSZ ini kemudian dapat di-merkleize - yaitu diubah menjadi representasi pohon Merkle (Merkle-tree) dari data yang sama. Pertama, jumlah potongan 32-byte dalam objek yang diserialisasi ditentukan. Ini adalah "daun" dari pohon tersebut. Jumlah total daun harus merupakan pangkat 2 sehingga melakukan hash bersama-sama pada daun pada akhirnya menghasilkan satu hash-tree-root. Jika ini tidak terjadi secara alami, daun tambahan yang berisi 32 byte nol ditambahkan. Secara diagram:

```
        hash tree root
            /     \
           /       \
          /         \
         /           \
   hash of leaves  hash of leaves
     1 and 2         3 and 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 leaf1     leaf2  leaf3     leaf4
```

Ada juga kasus di mana daun pohon tidak terdistribusi secara merata secara alami seperti pada contoh di atas. Misalnya, daun 4 bisa menjadi wadah dengan beberapa elemen yang memerlukan "kedalaman" tambahan untuk ditambahkan ke pohon Merkle, menciptakan pohon yang tidak rata.

Alih-alih merujuk pada elemen pohon ini sebagai daun X, node X, dll., kita dapat memberi mereka indeks yang digeneralisasi, dimulai dengan akar = 1 dan menghitung dari kiri ke kanan di sepanjang setiap tingkat. Ini adalah indeks yang digeneralisasi yang dijelaskan di atas. Setiap elemen dalam daftar yang diserialisasi memiliki indeks yang digeneralisasi sama dengan `2**depth + idx` di mana idx adalah posisi indeks nolnya dalam objek yang diserialisasi dan kedalaman adalah jumlah tingkat dalam pohon Merkle, yang dapat ditentukan sebagai logaritma basis dua dari jumlah elemen (daun).

## Indeks yang digeneralisasi {#generalized-indices}

Indeks yang digeneralisasi adalah bilangan bulat yang mewakili node dalam pohon Merkle biner di mana setiap node memiliki indeks yang digeneralisasi `2 ** depth + index in row`.

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Representasi ini menghasilkan indeks node untuk setiap bagian data dalam pohon Merkle.

## Multiproof {#multiproofs}

Menyediakan daftar indeks yang digeneralisasi yang mewakili elemen spesifik memungkinkan kita untuk memverifikasinya terhadap hash-tree-root. Akar ini adalah versi realitas yang kita terima. Data apa pun yang diberikan kepada kita dapat diverifikasi terhadap realitas tersebut dengan memasukkannya ke tempat yang tepat di pohon Merkle (ditentukan oleh indeks yang digeneralisasi) dan mengamati bahwa akarnya tetap konstan. Ada fungsi dalam spesifikasi [di sini](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) yang menunjukkan cara menghitung set minimal node yang diperlukan untuk memverifikasi konten dari set indeks yang digeneralisasi tertentu.

Misalnya, untuk memverifikasi data di indeks 9 di pohon di bawah ini, kita memerlukan hash dari data di indeks 8, 9, 5, 3, 1.
Hash dari (8,9) harus sama dengan hash (4), yang di-hash dengan 5 untuk menghasilkan 2, yang di-hash dengan 3 untuk menghasilkan akar pohon 1. Jika data yang salah diberikan untuk 9, akarnya akan berubah - kita akan mendeteksi ini dan gagal memverifikasi cabang tersebut.

```
* = data required to generate proof

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Bacaan lebih lanjut {#further-reading}

- [Meningkatkan Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Meningkatkan Ethereum: Merkleization](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementasi SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Kalkulator SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)