---
title: Serialisasi recursive-length prefix (RLP)
description: Definisi dari pengodean rlp di lapisan eksekusi Ethereum.
lang: id
sidebarDepth: 2
---

Serialisasi Recursive Length Prefix (RLP) digunakan secara ekstensif dalam klien eksekusi Ethereum. RLP menstandarkan transfer data antar node dalam format yang hemat ruang. Tujuan RLP adalah untuk mengodekan array data biner bersarang secara sewenang-wenang, dan RLP adalah metode pengodean utama yang digunakan untuk menserialisasi objek di lapisan eksekusi Ethereum. Tujuan utama RLP adalah untuk mengodekan struktur; dengan pengecualian bilangan bulat positif, RLP mendelegasikan pengodean tipe data spesifik (misalnya, string, float) ke protokol tingkat tinggi. Bilangan bulat positif harus direpresentasikan dalam bentuk biner big-endian tanpa angka nol di depan (sehingga membuat nilai bilangan bulat nol setara dengan array byte kosong). Bilangan bulat positif yang dideserialisasi dengan angka nol di depan harus diperlakukan sebagai tidak valid oleh protokol tingkat tinggi mana pun yang menggunakan RLP.

Informasi lebih lanjut di [yellow paper Ethereum (Apendiks B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Untuk menggunakan RLP dalam mengodekan kamus (dictionary), dua bentuk kanonis yang disarankan adalah:

- gunakan `[[k1,v1],[k2,v2]...]` dengan kunci dalam urutan leksikografis
- gunakan pengodean Patricia Tree tingkat tinggi seperti yang dilakukan [Ethereum](/)

## Definisi {#definition}

Fungsi pengodean RLP menerima sebuah item. Sebuah item didefinisikan sebagai berikut:

- sebuah string (yaitu, array byte) adalah sebuah item
- sebuah daftar item adalah sebuah item
- sebuah bilangan bulat positif adalah sebuah item

Sebagai contoh, semua yang berikut ini adalah item:

- sebuah string kosong;
- string yang berisi kata "cat";
- sebuah daftar yang berisi sejumlah string;
- dan struktur data yang lebih kompleks seperti `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- angka `100`

Perhatikan bahwa dalam konteks sisa halaman ini, 'string' berarti "sejumlah byte data biner tertentu"; tidak ada pengodean khusus yang digunakan, dan tidak ada pengetahuan tentang konten string yang tersirat (kecuali sebagaimana diwajibkan oleh aturan terhadap bilangan bulat positif non-minimal).

Pengodean RLP didefinisikan sebagai berikut:

- Untuk bilangan bulat positif, ini dikonversi ke array byte terpendek yang interpretasi big-endian-nya adalah bilangan bulat tersebut, dan kemudian dikodekan sebagai string sesuai dengan aturan di bawah ini.
- Untuk byte tunggal yang nilainya berada dalam rentang `[0x00, 0x7f]` (desimal `[0, 127]`), byte tersebut adalah pengodean RLP-nya sendiri.
- Jika tidak, jika sebuah string memiliki panjang 0-55 byte, pengodean RLP terdiri dari byte tunggal dengan nilai **0x80** (des. 128) ditambah panjang string yang diikuti oleh string tersebut. Rentang byte pertama dengan demikian adalah `[0x80, 0xb7]` (des. `[128, 183]`).
- Jika sebuah string memiliki panjang lebih dari 55 byte, pengodean RLP terdiri dari byte tunggal dengan nilai **0xb7** (des. 183) ditambah panjang dalam byte dari panjang string dalam bentuk biner, diikuti oleh panjang string, diikuti oleh string tersebut. Sebagai contoh, string sepanjang 1024 byte akan dikodekan sebagai `\xb9\x04\x00` (des. `185, 4, 0`) diikuti oleh string tersebut. Di sini, `0xb9` (183 + 2 = 185) sebagai byte pertama, diikuti oleh 2 byte `0x0400` (des. 1024) yang menunjukkan panjang string yang sebenarnya. Rentang byte pertama dengan demikian adalah `[0xb8, 0xbf]` (des. `[184, 191]`).
- Jika sebuah string memiliki panjang 2^64 byte, atau lebih, string tersebut mungkin tidak dapat dikodekan.
- Jika total payload dari sebuah daftar (yaitu, panjang gabungan dari semua itemnya yang dikodekan RLP) memiliki panjang 0-55 byte, pengodean RLP terdiri dari byte tunggal dengan nilai **0xc0** ditambah panjang payload yang diikuti oleh penggabungan pengodean RLP dari item-item tersebut. Rentang byte pertama dengan demikian adalah `[0xc0, 0xf7]` (des. `[192, 247]`).
- Jika total payload dari sebuah daftar memiliki panjang lebih dari 55 byte, pengodean RLP terdiri dari byte tunggal dengan nilai **0xf7** ditambah panjang dalam byte dari panjang payload dalam bentuk biner, diikuti oleh panjang payload, diikuti oleh penggabungan pengodean RLP dari item-item tersebut. Rentang byte pertama dengan demikian adalah `[0xf8, 0xff]` (des. `[248, 255]`).

Dalam bentuk ringkas:

| Rentang     | Byte 1     | Byte 2     | ...        | Byte 9                | Byte 10    | Arti                                      |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | string byte tunggal                       |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | string pendek (0-55 byte)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | string panjang, N+1 byte untuk len, lalu payload |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | daftar pendek (0-55 byte)                 |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | daftar panjang, N+1 byte untuk len, lalu payload |

- `p` = payload
- `n` = len (jumlah byte payload)
- `N` = offset len-of-len (diikuti oleh N+1 byte `n`)

Dalam kode, ini adalah:

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## Contoh {#examples}

- string "dog" = [ 0x83, 'd', 'o', 'g' ]
- daftar [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- string kosong ('null') = `[ 0x80 ]`
- daftar kosong = `[ 0xc0 ]`
- bilangan bulat 0 = `[ 0x80 ]`
- byte '\\x00' = `[ 0x00 ]`
- byte '\\x0f' = `[ 0x0f ]`
- byte '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- [representasi teori himpunan](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) dari tiga, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- string "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Dekode RLP {#rlp-decoding}

Menurut aturan dan proses pengodean RLP, input dari dekode RLP dianggap sebagai array data biner. Proses dekode RLP adalah sebagai berikut:

1.  menurut byte pertama (yaitu, awalan) dari data input dan mendekode tipe data, panjang data aktual dan offset;

2.  menurut tipe dan offset data, dekode data secara koresponden, dengan mematuhi aturan pengodean minimal untuk bilangan bulat positif;

3.  lanjutkan untuk mendekode sisa input;

Di antaranya, aturan mendekode tipe data dan offset adalah sebagai berikut:

1.  data adalah sebuah string jika rentang byte pertama (yaitu, awalan) adalah [0x00, 0x7f], dan string tersebut adalah byte pertama itu sendiri secara persis;

2.  data adalah sebuah string jika rentang byte pertama adalah [0x80, 0xb7], dan string yang panjangnya sama dengan byte pertama dikurangi 0x80 mengikuti byte pertama;

3.  data adalah sebuah string jika rentang byte pertama adalah [0xb8, 0xbf], dan panjang string yang panjangnya dalam byte sama dengan byte pertama dikurangi 0xb7 mengikuti byte pertama, dan string tersebut mengikuti panjang string;

4.  data adalah sebuah daftar jika rentang byte pertama adalah [0xc0, 0xf7], dan penggabungan pengodean RLP dari semua item daftar yang total payload-nya sama dengan byte pertama dikurangi 0xc0 mengikuti byte pertama;

5.  data adalah sebuah daftar jika rentang byte pertama adalah [0xf8, 0xff], dan total payload daftar yang panjangnya sama dengan byte pertama dikurangi 0xf7 mengikuti byte pertama, dan penggabungan pengodean RLP dari semua item daftar mengikuti total payload daftar;

Dalam kode, ini adalah:

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## Bacaan lebih lanjut {#further-reading}

- [RLP di Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Di balik layar Ethereum: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Recursive Length Prefix Ethereum di ACL2. pracetak arXiv arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Topik terkait {#related-topics}

- [Patricia merkle trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)