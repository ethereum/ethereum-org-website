---
title: Merkle Patricia Trie
description: Pengenalan Merkle Patricia Trie.
lang: id
sidebarDepth: 2
---

State Ethereum (seluruh akun, saldo, dan kontrak pintar) di-encode ke dalam versi khusus dari struktur data yang secara umum dikenal dalam ilmu komputer sebagai Merkle Tree. Struktur ini berguna untuk banyak aplikasi dalam kriptografi karena menciptakan hubungan yang dapat diverifikasi antara semua potongan data individual yang terjerat di dalam pohon, menghasilkan nilai **root** tunggal yang dapat digunakan untuk membuktikan hal-hal tentang data.

Struktur data Ethereum adalah 'Modified Merkle-Patricia Trie', dinamai demikian karena meminjam beberapa fitur dari PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric), dan karena dirancang untuk pengambilan data yang efisien dari item-item yang membentuk status Ethereum.

Trie Merkle-Patricia bersifat deterministik dan dapat diverifikasi secara kriptografis: Satu-satunya cara untuk menghasilkan root status adalah dengan menghitungnya dari setiap bagian individual dari status, dan dua status yang identik dapat dengan mudah dibuktikan dengan membandingkan hash root dan hash yang mengarah ke sana (_bukti Merkle_). Sebaliknya, tidak mungkin membuat dua state berbeda dengan root hash yang sama, dan setiap upaya memodifikasi state dengan nilai yang berbeda akan menghasilkan state root hash yang berbeda. Secara teoretis, struktur ini memberikan 'cawan suci' efisiensi `O(log(n))` untuk penyisipan, pencarian, dan penghapusan.

Dalam waktu dekat, Ethereum berencana untuk bermigrasi ke struktur [Pohon Verkle](/roadmap/verkle-trees), yang akan membuka banyak kemungkinan baru untuk peningkatan protokol di masa depan.

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, akan sangat membantu jika Anda memiliki pengetahuan dasar tentang [hash](https://en.wikipedia.org/wiki/Hash_function), [pohon Merkle](https://en.wikipedia.org/wiki/Merkle_tree), [trie](https://en.wikipedia.org/wiki/Trie), dan [serialisasi](https://en.wikipedia.org/wiki/Serialization). Artikel ini dimulai dengan deskripsi [pohon radix](https://en.wikipedia.org/wiki/Radix_tree) dasar, kemudian secara bertahap memperkenalkan modifikasi yang diperlukan untuk struktur data Ethereum yang lebih optimal.

## Trie radix dasar {#basic-radix-tries}

Dalam sebuah radix trie dasar, setiap simpul terlihat sebagai berikut:

```
    [i_0, i_1 ... i_n, value]
```

Di mana `i_0 ...  i_n` mewakili simbol-simbol alfabet (sering kali biner atau heksa), `value` adalah nilai terminal di simpul, dan nilai-nilai di `i_0, i_1 ...  slot `i_n`adalah`NULL`atau pointer ke (dalam kasus kita, hash dari) simpul lain. Ini membentuk penyimpanan dasar`(kunci, nilai)`.

Katakanlah Anda ingin menggunakan struktur data pohon radix untuk mempertahankan urutan atas satu set pasangan nilai kunci. Untuk menemukan nilai yang saat ini dipetakan ke kunci `dog` di dalam trie, Anda akan mengonversi `dog` terlebih dahulu menjadi huruf-huruf alfabet (menghasilkan `64 6f 67`), lalu menelusuri trie mengikuti jalur tersebut hingga Anda menemukan nilainya. Artinya, Anda mulai dengan mencari hash akar di DB kunci/nilai datar untuk menemukan simpul akar dari trie. Ini direpresentasikan sebagai sebuah larik kunci yang menunjuk ke node lain. Anda akan menggunakan nilai pada indeks `6` sebagai kunci dan mencarinya di DB kunci/nilai datar untuk mendapatkan simpul satu tingkat ke bawah. Kemudian pilih indeks `4` untuk mencari nilai berikutnya, lalu pilih indeks `6`, dan seterusnya, sampai, setelah Anda mengikuti jalur: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, Anda akan mencari nilai simpul dan mengembalikan hasilnya.

Ada perbedaan antara mencari sesuatu di 'trie' dan kunci/nilai datar yang mendasari 'DB'. Keduanya mendefinisikan pengaturan kunci/nilai, tetapi DB yang mendasarinya dapat melakukan pencarian 1 langkah tradisional untuk sebuah kunci. Mencari kunci dalam trie membutuhkan beberapa pencarian DB yang mendasari untuk mendapatkan nilai akhir yang dijelaskan di atas. Mari kita sebut yang terakhir sebagai `path` untuk menghilangkan ambiguitas.

Operasi pembaruan dan penghapusan untuk percobaan radix dapat didefinisikan sebagai berikut:

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

Pohon Radix "Merkle" dibangun dengan menghubungkan node-node menggunakan hash digest kriptografi yang dihasilkan secara deterministik. Pengalamatan konten ini (di DB kunci/nilai `kunci == keccak256(rlp(nilai))`) memberikan jaminan integritas kriptografis dari data yang disimpan. Jika hash akar dari sebuah trie diketahui oleh publik, maka siapa pun yang memiliki akses ke data daun yang mendasarinya dapat membuat sebuah bukti bahwa trie tersebut menyertakan nilai yang diberikan pada jalur tertentu dengan memberikan hash dari setiap node yang bergabung dengan nilai tertentu ke akar pohon.

Tidak mungkin bagi penyerang untuk memberikan bukti pasangan `(jalur, nilai)` yang tidak ada karena hash root pada akhirnya didasarkan pada semua hash di bawahnya. Setiap modifikasi yang mendasarinya akan mengubah hash akar. Anda dapat menganggap hash sebagai representasi terkompresi dari informasi struktural tentang data, yang diamankan oleh perlindungan pra-gambar dari fungsi hashing.

Kita akan menyebut unit atom dari pohon radix (misalnya satu karakter heksa, atau bilangan biner 4 bit) sebagai "nibble". Saat melintasi jalur satu nibble pada satu waktu, seperti yang dijelaskan di atas, simpul dapat merujuk ke maksimal 16 turunan tetapi menyertakan elemen `value`. Oleh karena itu, kami merepresentasikannya sebagai sebuah larik dengan panjang 17. Kami menyebut susunan 17 elemen ini sebagai "simpul cabang".

## Trie Merkle Patricia {#merkle-patricia-trees}

Percobaan Radix memiliki satu keterbatasan utama: tidak efisien. Jika Anda ingin menyimpan satu ikatan `(jalur, nilai)` di mana jalurnya, seperti di Ethereum, memiliki panjang 64 karakter (jumlah nibble dalam `bytes32`), kita akan membutuhkan lebih dari satu kilobita ruang ekstra untuk menyimpan satu tingkat per karakter, dan setiap pencarian atau penghapusan akan memakan 64 langkah penuh. Patricia trie yang diperkenalkan berikut ini memecahkan masalah ini.

### Optimisasi {#optimization}

Simpul dalam trio Merkle Patricia adalah salah satu dari yang berikut ini:

1. `NULL` (diwakili sebagai string kosong)
2. `cabang` Sebuah simpul 17 item `[ v0 ...  v15, vt ]`
3. `daun` Simpul 2 item `[ encodedPath, value ]`
4. `ekstensi` Simpul 2 item `[ encodedPath, key ]`

Dengan 64 jalur karakter, tidak dapat dihindari bahwa setelah melintasi beberapa lapisan pertama dari trie, Anda akan mencapai simpul di mana tidak ada jalur yang berbeda untuk setidaknya sebagian dari perjalanan ke bawah. Untuk menghindari keharusan membuat hingga 15 simpul `NULL` yang jarang di sepanjang jalur, kami memotong penurunan dengan menyiapkan simpul `ekstensi` dalam bentuk `[ encodedPath, key ]`, di mana `encodedPath` berisi "jalur parsial" untuk melompat ke depan (menggunakan pengkodean ringkas yang dijelaskan di bawah ini), dan `key` adalah untuk pencarian DB berikutnya.

Untuk simpul `daun`, yang dapat ditandai dengan sebuah bendera pada nibble pertama dari `encodedPath`, jalur mengkodekan semua fragmen jalur simpul sebelumnya dan kita dapat mencari `value` secara langsung.

Namun demikian, pengoptimalan di atas ini menimbulkan ambiguitas.

Ketika melintasi jalur dalam nibble, kita mungkin akan mendapatkan jumlah nibble ganjil untuk dilalui, tetapi karena semua data disimpan dalam format `bytes`. Tidak mungkin untuk membedakan antara, misalnya, nibble `1`, dan nibble `01` (keduanya harus disimpan sebagai `<01>`). Untuk menentukan panjang ganjil, jalur parsial diawali dengan bendera.

### Spesifikasi: Pengkodean ringkas urutan heksa dengan terminator opsional {#specification}

Penandaan _panjang jalur parsial sisa ganjil vs. genap_ dan _simpul daun vs. ekstensi_ seperti yang dijelaskan di atas berada di nibble pertama jalur parsial dari setiap simpul 2 item. Hasilnya adalah sebagai berikut:

| hex char | bits | Tipe Simpul partial                  | Panjang jalur |
| -------- | ---- | ------------------------------------ | ------------- |
| 0        | 0000 | ekstensi                             | genap         |
| 1        | 0001 | ekstensi                             | odd           |
| 2        | 0010 | mengakhiri (daun) | genap         |
| 3        | 0011 | mengakhiri (daun) | odd           |

Untuk panjang jalur sisa genap (`0` atau `2`), nibble "padding" `0` lainnya akan selalu mengikuti.

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
        # hexarray now has an even length whose first nibble is the flags.
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

Berikut ini adalah kode yang diperluas untuk mendapatkan simpul dalam trio Merkle Patricia:

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

Misalkan kita ingin sebuah trie yang berisi empat pasang jalur/nilai `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Pertama, kita mengonversi jalur dan nilai menjadi `bytes`. Di bawah ini, representasi bita aktual untuk _jalur_ ditandai dengan `<>`, meskipun _nilai_ masih ditampilkan sebagai string, ditandai dengan `''`, untuk pemahaman yang lebih mudah (mereka juga, sebenarnya adalah `bytes`):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Sekarang, kita membangun trie tersebut dengan pasangan kunci/nilai berikut di DB yang mendasarinya:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Ketika satu simpul direferensikan di dalam simpul lain, yang disertakan adalah `keccak256(rlp.encode(node))`, jika `len(rlp.encode(node)) >= 32` selainnya `node` di mana `rlp.encode` adalah fungsi pengkodean [RLP](/developers/docs/data-structures-and-encoding/rlp).

Perhatikan bahwa ketika memperbarui sebuah trie, seseorang perlu menyimpan pasangan kunci/nilai `(keccak256(x), x)` dalam tabel pencarian persisten _jika_ simpul yang baru dibuat memiliki panjang >= 32. Namun, jika simpulnya lebih pendek dari itu, kita tidak perlu menyimpan apa pun, karena fungsi f(x) = x dapat dibalik.

## Trie di Ethereum {#tries-in-ethereum}

Semua percobaan merkle dalam lapisan eksekusi Ethereum menggunakan Merkle Patricia Trie.

Dari sundulan blok, ada 3 akar dari 3 percobaan ini.

1. stateRoot (akar)
2. transaksiAkar
3. tanda terimaAkar

### Trie Status {#state-trie}

Terdapat satu state trie global, dan diperbarui setiap kali klien memproses blok. Di dalamnya, sebuah `path` selalu: `keccak256(ethereumAddress)` dan sebuah `value` selalu: `rlp(ethereumAccount)`. Lebih khusus lagi, `akun` Ethereum adalah array 4 item dari `[nonce,balance,storageRoot,codeHash]`. Pada titik ini, perlu dicatat bahwa `storageRoot` ini adalah root dari trie patricia lain:

### Trie Penyimpanan {#storage-trie}

Trie penyimpanan adalah tempat _semua_ data kontrak berada. Ada trie penyimpanan terpisah untuk setiap akun. Untuk mengambil nilai pada posisi penyimpanan tertentu pada alamat tertentu, diperlukan alamat penyimpanan, posisi bilangan bulat dari data yang tersimpan dalam penyimpanan, dan ID blok. Ini kemudian dapat diteruskan sebagai argumen ke `eth_getStorageAt` yang didefinisikan dalam API JSON-RPC, misalnya untuk mengambil data di slot penyimpanan 0 untuk alamat `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Mengambil elemen lain dalam penyimpanan sedikit lebih rumit karena posisi dalam trie penyimpanan harus dihitung terlebih dahulu. Posisinya dihitung sebagai hash `keccak256` dari alamat dan posisi penyimpanan, keduanya diisi dengan nol di sebelah kiri hingga panjang 32 bita. Sebagai contoh, posisi untuk data di slot penyimpanan 1 untuk alamat `0x391694e7e0b0cce554cb130d723a9d27458f9298` adalah:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Pada konsol Geth, hal ini dapat dihitung sebagai berikut:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Oleh karena itu, `path` adalah `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Ini sekarang dapat digunakan untuk mengambil data dari trie penyimpanan seperti sebelumnya:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Catatan: `storageRoot` untuk akun Ethereum kosong secara default jika bukan akun kontrak.

### Trie Transaksi {#transaction-trie}

Terdapat trie transaksi terpisah untuk setiap blok, yang sekali lagi menyimpan pasangan `(kunci, nilai)`. Sebuah jalur di sini adalah: `rlp(transactionIndex)` yang mewakili kunci yang sesuai dengan nilai yang ditentukan oleh:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Informasi lebih lanjut mengenai hal ini dapat ditemukan dalam dokumentasi [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie Tanda Terima {#receipts-trie}

Setiap blok memiliki trie Tanda Terima sendiri. Sebuah `path` di sini adalah: `rlp(transactionIndex)`. `transactionIndex` adalah indeksnya dalam blok tempatnya disertakan. Trie penerimaan tidak pernah diperbarui. Mirip dengan triwulan Transaksi, ada penerimaan saat ini dan warisan. Untuk menanyakan tanda terima tertentu dalam trie Tanda Terima, diperlukan indeks transaksi dalam bloknya, muatan tanda terima, dan jenis transaksi. Tanda terima yang Dikembalikan dapat bertipe `Receipt` yang didefinisikan sebagai penggabungan `TransactionType` dan `ReceiptPayload` atau dapat bertipe `LegacyReceipt` yang didefinisikan sebagai `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Informasi lebih lanjut mengenai hal ini dapat ditemukan dalam dokumentasi [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Bacaan Lebih Lanjut {#further-reading}

- [Trie Merkle Patricia yang Dimodifikasi — Bagaimana Ethereum menyimpan sebuah status](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling di Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Memahami trie Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
