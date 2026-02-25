---
title: Serialisasi awalan panjang rekursif (RLP)
description: Definisi pengkodean rlp dalam lapisan eksekusi Ethereum.
lang: id
sidebarDepth: 2
---

Serialisasi Recursive Length Prefix (RLP) digunakan secara ekstensif dalam klien eksekusi Ethereum. RLP menstandarkan transfer data antar node dalam format yang hemat ruang. Tujuan RLP adalah untuk mengkodekan array biner yang bisa bersarang secara arbitrer, dan RLP merupakan metode encoding utama yang digunakan untuk menyerialisasi objek di lapisan eksekusi Ethereum. Tujuan utama RLP adalah untuk menyandikan struktur; dengan pengecualian bilangan bulat positif, RLP mendelegasikan penyandian tipe data tertentu (misalnya, string, float) ke protokol tingkat lebih tinggi. Bilangan bulat positif harus direpresentasikan dalam bentuk biner big-endian tanpa nol di depan (sehingga nilai bilangan nol setara dengan array byte kosong). Bilangan bulat positif yang telah dideserialisasi dengan nol di depan harus dianggap tidak valid oleh protokol tingkat lebih tinggi manapun yang menggunakan RLP.

Informasi lebih lanjut di [yellow paper Ethereum (Lampiran B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Untuk menggunakan RLP untuk menyandikan kamus, dua bentuk kanonik yang disarankan adalah:

- gunakan `[[k1,v1],[k2,v2]...]` dengan kunci dalam urutan leksikografis
- menggunakan pengkodean Pohon Patricia tingkat yang lebih tinggi seperti yang dilakukan Ethereum

## Definisi {#definition}

Fungsi pengkodean RLP mengambil sebuah item. Sebuah item didefinisikan sebagai berikut：

- sebuah string (yaitu, larik bita) adalah sebuah item
- daftar item adalah sebuah item
- Bilangan bulat positif adalah sebuah item

Sebagai contoh, semua item berikut ini adalah item:

- sebuah string kosong;
- string yang berisi kata "kucing";
- Daftar yang berisi sejumlah string;
- dan struktur data yang lebih kompleks seperti `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- angka `100`

Perlu dicatat bahwa dalam konteks halaman ini, 'string' berarti 'sejumlah byte data biner tertentu'; tidak ada pengkodean khusus yang digunakan, dan tidak ada pengetahuan tentang isi string yang dimaksud (kecuali sebagaimana diatur oleh aturan terhadap bilangan bulat positif yang tidak minimal).

Pengkodean RLP didefinisikan sebagai berikut:

- Untuk bilangan bulat positif, bilangan tersebut dikonversi menjadi array byte terpendek yang interpretasi big-endian-nya adalah bilangan itu, lalu dikodekan sebagai string sesuai dengan aturan di bawah ini.
- Untuk satu bita yang nilainya berada dalam rentang `[0x00, 0x7f]` (desimal `[0, 127]`), bita tersebut adalah penyandian RLP-nya sendiri.
- Jika tidak, jika sebuah string memiliki panjang 0-55 bita, penyandian RLP terdiri dari satu bita dengan nilai **0x80** (des. 128) ditambah panjang string yang diikuti oleh string. Dengan demikian, rentang bita pertama adalah `[0x80, 0xb7]` (des. `[128, 183]`).
- Jika sebuah string memiliki panjang lebih dari 55 bita, penyandian RLP terdiri dari satu bita dengan nilai **0xb7** (des. 183) ditambah panjang dalam bita dari panjang string dalam bentuk biner, diikuti oleh panjang string, diikuti oleh string. Sebagai contoh, string sepanjang 1024 bita akan disandikan sebagai `\xb9\x04\x00` (des. `185, 4, 0`) diikuti oleh string. Di sini, `0xb9` (183 + 2 = 185) sebagai bita pertama, diikuti oleh 2 bita `0x0400` (des. 1024) yang menunjukkan panjang string yang sebenarnya. Dengan demikian, rentang bita pertama adalah `[0xb8, 0xbf]` (des. `[184, 191]`).
- Jika sebuah string memiliki panjang 2^64 byte atau lebih, string tersebut tidak boleh dikodekan.
- Jika total muatan sebuah daftar (yaitu, panjang gabungan dari semua itemnya yang disandikan RLP) memiliki panjang 0-55 bita, penyandian RLP terdiri dari satu bita dengan nilai **0xc0** ditambah panjang muatan yang diikuti oleh penggabungan penyandian RLP dari item-item tersebut. Dengan demikian, rentang bita pertama adalah `[0xc0, 0xf7]` (des. `[192, 247]`).
- Jika total muatan sebuah daftar lebih dari 55 bita, penyandian RLP terdiri dari satu bita dengan nilai **0xf7** ditambah panjang dalam bita dari panjang muatan dalam bentuk biner, diikuti oleh panjang muatan, diikuti oleh penggabungan penyandian RLP dari item-item tersebut. Dengan demikian, rentang bita pertama adalah `[0xf8, 0xff]` (des. `[248, 255]`).

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

- string "anjing" = [ 0x83, 'd', 'o', 'g' ]
- daftar [ "kucing", "anjing" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- string kosong ('null') = `[ 0x80 ]`
- daftar kosong = `[ 0xc0 ]`
- bilangan bulat 0 = `[ 0x80 ]`
- bita '\\x00' = `[ 0x00 ]`
- bita '\\x0f' = `[ 0x0f ]`
- bita-bita '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- [representasi teoretis himpunan](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) dari tiga, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- string "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ...` `, 'e', 'l', 'i', 't' ]`

## Pendekodean RLP {#rlp-decoding}

Menurut aturan dan proses pengkodean RLP, input dari RLP decode dianggap sebagai array data biner. Proses penguraian kode RLP adalah sebagai berikut:

1. menurut bita pertama (yaitu, awalan) dari data masukan dan mendekode tipe data, panjang data aktual dan offset;

2. Sesuai dengan tipe dan offset data, dekode data tersebut secara bersesuaian, dengan tetap menghormati aturan minimal untuk pengkodean bilangan bulat positif;

3. lanjutkan untuk memecahkan kode input lainnya;

Di antaranya, aturan penguraian tipe data dan offset adalah sebagai berikut:

1. data adalah string jika rentang bita pertama (yaitu, awalan) adalah [0x00, 0x7f], dan string tersebut adalah bita pertama itu sendiri;

2. data adalah string jika rentang byte pertama adalah [0x80, 0xb7], dan string yang panjangnya sama dengan byte pertama dikurangi 0x80 mengikuti byte pertama;

3. data adalah string jika rentang byte pertama adalah [0xb8, 0xbf], dan panjang string yang panjangnya dalam byte sama dengan byte pertama dikurangi 0xb7 mengikuti byte pertama, dan string mengikuti panjang string;

4. data adalah daftar jika rentang byte pertama adalah [0xc0, 0xf7], dan penggabungan pengkodean RLP dari semua item dalam daftar yang total muatannya sama dengan byte pertama dikurangi 0xc0 mengikuti byte pertama;

5. data adalah daftar jika rentang byte pertama adalah [0xf8, 0xff], dan total muatan daftar yang panjangnya sama dengan byte pertama dikurangi 0xf7 mengikuti byte pertama, dan penggabungan pengkodean RLP dari semua item dalam daftar mengikuti total muatan daftar;

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
- [Ethereum di balik layar: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Awalan Panjang Rekursif Ethereum di ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Topik terkait {#related-topics}

- [Patricia merkle trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
