---
title: Merkle Patricia Trie
description: Pengantar tentang Merkle Patricia Trie.
lang: id
sidebarDepth: 2
---

Status [Ethereum](/) (keseluruhan dari semua akun, saldo, dan kontrak pintar), dienkode ke dalam versi khusus dari struktur data yang secara umum dikenal dalam ilmu komputer sebagai Merkle Tree. Struktur ini berguna untuk banyak aplikasi dalam kriptografi karena menciptakan hubungan yang dapat diverifikasi antara semua potongan data individu yang terjalin di dalam pohon, menghasilkan nilai **akar (root)** tunggal yang dapat digunakan untuk membuktikan hal-hal tentang data tersebut.

Struktur data Ethereum adalah 'Merkle-Patricia Trie yang dimodifikasi', dinamakan demikian karena meminjam beberapa fitur dari PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric), dan karena dirancang untuk pengambilan (re**trie**val) data yang efisien dari item-item yang membentuk status Ethereum.

Merkle-Patricia trie bersifat deterministik dan dapat diverifikasi secara kriptografi: Satu-satunya cara untuk menghasilkan akar status adalah dengan menghitungnya dari setiap potongan individu dari status tersebut, dan dua status yang identik dapat dengan mudah dibuktikan dengan membandingkan hash akar dan hash yang mengarah kepadanya (_bukti Merkle_). Sebaliknya, tidak ada cara untuk membuat dua status yang berbeda dengan hash akar yang sama, dan setiap upaya untuk memodifikasi status dengan nilai yang berbeda akan menghasilkan hash akar status yang berbeda. Secara teoritis, struktur ini memberikan 'cawan suci' efisiensi `O(log(n))` untuk penyisipan, pencarian, dan penghapusan.

Dalam waktu dekat, Ethereum berencana untuk bermigrasi ke struktur [Verkle Tree](/roadmap/verkle-trees), yang akan membuka banyak kemungkinan baru untuk peningkatan protokol di masa depan.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, akan sangat membantu jika Anda memiliki pengetahuan dasar tentang [hash](https://en.wikipedia.org/wiki/Hash_function), [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree), [trie](https://en.wikipedia.org/wiki/Trie), dan [serialisasi](https://en.wikipedia.org/wiki/Serialization). Artikel ini dimulai dengan deskripsi tentang [radix tree](https://en.wikipedia.org/wiki/Radix_tree) dasar, kemudian secara bertahap memperkenalkan modifikasi yang diperlukan untuk struktur data Ethereum yang lebih dioptimalkan.

## Radix trie dasar {#basic-radix-tries}

Dalam radix trie dasar, setiap node terlihat sebagai berikut:

```
    [i_0, i_1 ... i_n, value]
```

Di mana `i_0 ... i_n` mewakili simbol-simbol alfabet (sering kali biner atau hex), `value` adalah nilai terminal pada node, dan nilai-nilai di slot `i_0, i_1 ... i_n` adalah `NULL` atau penunjuk ke (dalam kasus kita, hash dari) node lain. Ini membentuk penyimpanan `(key, value)` dasar.

Katakanlah Anda ingin menggunakan struktur data radix tree untuk mempertahankan urutan atas sekumpulan pasangan nilai kunci (key-value). Untuk menemukan nilai yang saat ini dipetakan ke kunci `dog` di dalam trie, Anda pertama-tama akan mengonversi `dog` menjadi huruf-huruf alfabet (menghasilkan `64 6f 67`), dan kemudian menuruni trie mengikuti jalur tersebut hingga Anda menemukan nilainya. Yaitu, Anda mulai dengan mencari hash akar di DB key/value datar untuk menemukan node akar dari trie. Ini direpresentasikan sebagai array kunci yang menunjuk ke node lain. Anda akan menggunakan nilai pada indeks `6` sebagai kunci dan mencarinya di DB key/value datar untuk mendapatkan node satu tingkat di bawahnya. Kemudian pilih indeks `4` untuk mencari nilai berikutnya, lalu pilih indeks `6`, dan seterusnya, hingga, setelah Anda mengikuti jalur: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, Anda akan mencari nilai node tersebut dan mengembalikan hasilnya.

Ada perbedaan antara mencari sesuatu di 'trie' dan 'DB' key/value datar yang mendasarinya. Keduanya mendefinisikan susunan key/value, tetapi DB yang mendasarinya dapat melakukan pencarian kunci 1 langkah tradisional. Mencari kunci di dalam trie memerlukan beberapa pencarian DB yang mendasarinya untuk mencapai nilai akhir yang dijelaskan di atas. Mari kita sebut yang terakhir sebagai `path` (jalur) untuk menghilangkan ambiguitas.

Operasi pembaruan dan penghapusan untuk radix trie dapat didefinisikan sebagai berikut:

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

Radix tree "Merkle" dibangun dengan menautkan node menggunakan intisari hash kriptografi yang dihasilkan secara deterministik. Pengalamatan konten ini (dalam DB key/value `key == keccak256(rlp(value))`) memberikan jaminan integritas kriptografi dari data yang disimpan. Jika hash akar dari trie tertentu diketahui publik, maka siapa pun yang memiliki akses ke data daun (leaf) yang mendasarinya dapat menyusun bukti bahwa trie tersebut menyertakan nilai tertentu pada jalur tertentu dengan memberikan hash dari setiap node yang menggabungkan nilai tertentu ke akar pohon.

Mustahil bagi penyerang untuk memberikan bukti pasangan `(path, value)` yang tidak ada karena hash akar pada akhirnya didasarkan pada semua hash di bawahnya. Modifikasi apa pun yang mendasarinya akan mengubah hash akar. Anda dapat menganggap hash sebagai representasi terkompresi dari informasi struktural tentang data, yang diamankan oleh perlindungan pra-citra (pre-image) dari fungsi hashing.

Kita akan menyebut unit atomik dari radix tree (misalnya, karakter hex tunggal, atau angka biner 4 bit) sebagai "nibble". Saat melintasi jalur satu nibble pada satu waktu, seperti yang dijelaskan di atas, node dapat secara maksimal merujuk ke 16 anak tetapi menyertakan elemen `value`. Oleh karena itu, kita merepresentasikannya sebagai array dengan panjang 17. Kita menyebut array 17 elemen ini sebagai "node cabang" (branch nodes).

## Merkle Patricia Trie {#merkle-patricia-trees}

Radix trie memiliki satu batasan utama: mereka tidak efisien. Jika Anda ingin menyimpan satu ikatan `(path, value)` di mana jalurnya, seperti di Ethereum, memiliki panjang 64 karakter (jumlah nibble dalam `bytes32`), kita akan membutuhkan lebih dari satu kilobyte ruang ekstra untuk menyimpan satu tingkat per karakter, dan setiap pencarian atau penghapusan akan memakan waktu 64 langkah penuh. Patricia trie yang diperkenalkan berikut ini memecahkan masalah ini.

### Optimasi {#optimization}

Sebuah node dalam Merkle Patricia trie adalah salah satu dari berikut ini:

1.  `NULL` (direpresentasikan sebagai string kosong)
2.  `branch` Node 17 item `[ v0 ... v15, vt ]`
3.  `leaf` Node 2 item `[ encodedPath, value ]`
4.  `extension` Node 2 item `[ encodedPath, key ]`

Dengan jalur 64 karakter, tidak dapat dihindari bahwa setelah melintasi beberapa lapisan pertama dari trie, Anda akan mencapai node di mana tidak ada jalur divergen yang ada untuk setidaknya sebagian jalan ke bawah. Untuk menghindari keharusan membuat hingga 15 node `NULL` yang jarang di sepanjang jalur, kita mempersingkat penurunan dengan menyiapkan node `extension` dalam bentuk `[ encodedPath, key ]`, di mana `encodedPath` berisi "jalur parsial" untuk melompat ke depan (menggunakan pengkodean ringkas yang dijelaskan di bawah), dan `key` adalah untuk pencarian DB berikutnya.

Untuk node `leaf`, yang dapat ditandai dengan bendera (flag) di nibble pertama dari `encodedPath`, jalur tersebut mengkodekan semua fragmen jalur node sebelumnya dan kita dapat mencari `value` secara langsung.

Namun, optimasi di atas memperkenalkan ambiguitas.

Saat melintasi jalur dalam nibble, kita mungkin berakhir dengan jumlah nibble ganjil untuk dilintasi, tetapi karena semua data disimpan dalam format `bytes`. Tidak mungkin untuk membedakan antara, misalnya, nibble `1`, dan nibble `01` (keduanya harus disimpan sebagai `<01>`). Untuk menentukan panjang ganjil, jalur parsial diawali dengan sebuah bendera.

### Spesifikasi: Pengkodean ringkas urutan hex dengan terminator opsional {#specification}

Penandaan baik _panjang jalur parsial tersisa ganjil vs. genap_ maupun _node leaf vs. extension_ seperti yang dijelaskan di atas berada di nibble pertama dari jalur parsial dari setiap node 2 item. Mereka menghasilkan hal berikut:

| karakter hex | bit | tipe node parsial  | panjang jalur |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | extension          | genap        |
| 1        | 0001 | extension          | ganjil         |
| 2        | 0010 | terminating (leaf) | genap        |
| 3        | 0011 | terminating (leaf) | ganjil         |

Untuk panjang jalur tersisa yang genap (`0` atau `2`), nibble "padding" `0` lainnya akan selalu mengikuti.

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarray now has an even length whose first nibble is the flags. # hexarray sekarang memiliki panjang genap di mana nibble pertamanya adalah flag.
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

Contoh:

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Berikut adalah kode yang diperluas untuk mendapatkan node di Merkle Patricia trie:

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### Contoh Trie {#example-trie}

Misalkan kita menginginkan trie yang berisi empat pasangan path/value `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Pertama, kita mengonversi path dan value menjadi `bytes`. Di bawah ini, representasi byte aktual untuk _path_ dilambangkan dengan `<>`, meskipun _value_ masih ditampilkan sebagai string, dilambangkan dengan `''`, untuk pemahaman yang lebih mudah (mereka juga sebenarnya akan berupa `bytes`):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Sekarang, kita membangun trie semacam itu dengan pasangan key/value berikut di DB yang mendasarinya:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Ketika satu node direferensikan di dalam node lain, apa yang disertakan adalah `keccak256(rlp.encode(node))`, jika `len(rlp.encode(node)) >= 32` jika tidak `node` di mana `rlp.encode` adalah fungsi pengkodean [RLP](/developers/docs/data-structures-and-encoding/rlp).

Perhatikan bahwa saat memperbarui trie, seseorang perlu menyimpan pasangan key/value `(keccak256(x), x)` dalam tabel pencarian persisten _jika_ node yang baru dibuat memiliki panjang >= 32. Namun, jika node lebih pendek dari itu, seseorang tidak perlu menyimpan apa pun, karena fungsi f(x) = x dapat dibalik (reversible).

## Trie di Ethereum {#tries-in-ethereum}

Semua merkle trie di lapisan eksekusi Ethereum menggunakan Merkle Patricia Trie.

Dari header blok terdapat 3 akar dari 3 trie ini.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### State Trie {#state-trie}

Terdapat satu state trie global, dan ini diperbarui setiap kali klien memproses sebuah blok. Di dalamnya, sebuah `path` selalu: `keccak256(ethereumAddress)` dan sebuah `value` selalu: `rlp(ethereumAccount)`. Lebih spesifiknya, sebuah `akun` Ethereum adalah array 4 item dari `[nonce,balance,storageRoot,codeHash]`. Pada titik ini, perlu dicatat bahwa `storageRoot` ini adalah akar dari patricia trie lainnya:

### Storage Trie {#storage-trie}

Storage trie adalah tempat _semua_ data kontrak berada. Terdapat storage trie terpisah untuk setiap akun. Untuk mengambil nilai pada posisi penyimpanan tertentu di alamat yang diberikan, alamat penyimpanan, posisi integer dari data yang disimpan di penyimpanan, dan ID blok diperlukan. Ini kemudian dapat diteruskan sebagai argumen ke `eth_getStorageAt` yang didefinisikan dalam API JSON-RPC, mis., untuk mengambil data di slot penyimpanan 0 untuk alamat `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Mengambil elemen lain dalam penyimpanan sedikit lebih rumit karena posisi di storage trie harus dihitung terlebih dahulu. Posisi dihitung sebagai hash `keccak256` dari alamat dan posisi penyimpanan, keduanya diisi dengan nol di sebelah kiri (left-padded) hingga panjang 32 byte. Misalnya, posisi untuk data di slot penyimpanan 1 untuk alamat `0x391694e7e0b0cce554cb130d723a9d27458f9298` adalah:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Di konsol Geth, ini dapat dihitung sebagai berikut:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Oleh karena itu, `path` adalah `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Ini sekarang dapat digunakan untuk mengambil data dari storage trie seperti sebelumnya:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Catatan: `storageRoot` untuk akun Ethereum secara default kosong jika itu bukan akun kontrak.

### Transactions Trie {#transaction-trie}

Terdapat transactions trie terpisah untuk setiap blok, yang sekali lagi menyimpan pasangan `(key, value)`. Sebuah path di sini adalah: `rlp(transactionIndex)` yang mewakili kunci yang sesuai dengan nilai yang ditentukan oleh:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Informasi lebih lanjut tentang ini dapat ditemukan dalam dokumentasi [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Receipts Trie {#receipts-trie}

Setiap blok memiliki Receipts trie-nya sendiri. Sebuah `path` di sini adalah: `rlp(transactionIndex)`. `transactionIndex` adalah indeksnya di dalam blok tempat ia disertakan. Receipts trie tidak pernah diperbarui. Mirip dengan Transactions trie, terdapat tanda terima (receipt) saat ini dan warisan (legacy). Untuk menanyakan tanda terima tertentu di Receipts trie, indeks transaksi di bloknya, payload tanda terima, dan tipe transaksi diperlukan. Tanda terima yang dikembalikan dapat berupa tipe `Receipt` yang didefinisikan sebagai penggabungan dari `TransactionType` dan `ReceiptPayload` atau dapat berupa tipe `LegacyReceipt` yang didefinisikan sebagai `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Informasi lebih lanjut tentang ini dapat ditemukan dalam dokumentasi [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Bacaan Lebih Lanjut {#further-reading}

- [Modified Merkle Patricia Trie — How Ethereum saves a state](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling in Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [Understanding the Ethereum trie](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)