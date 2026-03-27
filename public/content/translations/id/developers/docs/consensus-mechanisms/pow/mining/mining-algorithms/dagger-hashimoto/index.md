---
title: Dagger-Hashimoto
description: Tinjauan terperinci tentang algoritma Dagger-Hashimoto.
lang: id
---

Dagger-Hashimoto adalah implementasi penelitian dan spesifikasi asli untuk algoritma penambangan Ethereum. Dagger-Hashimoto digantikan oleh [Ethash](#ethash). Penambangan dimatikan sepenuhnya pada [The Merge](/roadmap/merge/) pada tanggal 15 September 2022. Sejak saat itu, Ethereum telah diamankan menggunakan mekanisme [proof-of-stake](/developers/docs/consensus-mechanisms/pos) sebagai gantinya. Halaman ini ditujukan untuk kepentingan sejarah - informasi di sini tidak lagi relevan untuk Ethereum pasca-Merge.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda terlebih dahulu membaca tentang [konsensus proof-of-work](/developers/docs/consensus-mechanisms/pow), [penambangan](/developers/docs/consensus-mechanisms/pow/mining), dan [algoritma penambangan](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto bertujuan untuk memenuhi dua tujuan:

1.  **Tahan ASIC**: keuntungan dari membuat perangkat keras khusus untuk algoritma ini harus sekecil mungkin
2.  **Verifiabilitas klien ringan**: sebuah blok harus dapat diverifikasi secara efisien oleh klien ringan.

Dengan modifikasi tambahan, kami juga menentukan cara untuk memenuhi tujuan ketiga jika diinginkan, tetapi dengan mengorbankan kompleksitas tambahan:

**Penyimpanan rantai penuh**: penambangan harus memerlukan penyimpanan status blockchain yang lengkap (karena struktur trie status Ethereum yang tidak teratur, kami mengantisipasi bahwa beberapa pemangkasan akan dimungkinkan, terutama dari beberapa kontrak yang sering digunakan, tetapi kami ingin meminimalkan hal ini).

## Pembuatan DAG {#dag-generation}

Kode untuk algoritma ini akan didefinisikan dalam Python di bawah ini. Pertama, kami memberikan `encode_int` untuk menyusun int tak bertanda (unsigned int) dengan presisi tertentu menjadi string. Kebalikannya juga diberikan:

```python
NUM_BITS = 512

def encode_int(x):
    "Encode an integer x as a string of 64 characters using a big-endian scheme"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Unencode an integer x from a string using a big-endian scheme"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Selanjutnya kami mengasumsikan bahwa `sha3` adalah fungsi yang mengambil bilangan bulat dan menghasilkan bilangan bulat, dan `dbl_sha3` adalah fungsi double-sha3; jika mengonversi kode referensi ini menjadi implementasi, gunakan:

```python
from pyethereum import utils
def sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(x))

def dbl_sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(utils.sha3(x)))
```

### Parameter {#parameters}

Parameter yang digunakan untuk algoritma ini adalah:

```python
SAFE_PRIME_512 = 2**512 - 38117     # Largest Safe Prime less than 2**512 # Bilangan prima aman terbesar yang kurang dari 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Size of the dataset (4 Gigabytes); MUST BE MULTIPLE OF 65536 # Ukuran dataset (4 Gigabita); HARUS KELIPATAN 65536
      "n_inc": 65536,                   # Increment in value of n per period; MUST BE MULTIPLE OF 65536 # Peningkatan nilai n per periode; HARUS KELIPATAN 65536
                                        # with epochtime=20000 gives 882 MB growth per year # dengan epochtime=20000 memberikan pertumbuhan 882 MB per tahun
      "cache_size": 2500,               # Size of the light client's cache (can be chosen by light # Ukuran cache klien ringan (dapat dipilih oleh klien
                                        # client; not part of the algo spec) # ringan; bukan bagian dari spesifikasi algoritma)
      "diff": 2**14,                    # Difficulty (adjusted during block evaluation) # Tingkat kesulitan (disesuaikan selama evaluasi blok)
      "epochtime": 100000,              # Length of an epoch in blocks (how often the dataset is updated) # Panjang epoch dalam blok (seberapa sering dataset diperbarui)
      "k": 1,                           # Number of parents of a node # Jumlah induk dari sebuah node
      "w": w,                          # Used for modular exponentiation hashing # Digunakan untuk hash eksponensiasi modular
      "accesses": 200,                  # Number of dataset accesses during hashimoto # Jumlah akses dataset selama hashimoto
      "P": SAFE_PRIME_512               # Safe Prime for hashing and random number generation # Bilangan prima aman untuk hash dan pembuatan angka acak
}
```

`P` dalam hal ini adalah bilangan prima yang dipilih sedemikian rupa sehingga `log₂(P)` hanya sedikit kurang dari 512, yang sesuai dengan 512 bit yang telah kami gunakan untuk merepresentasikan angka-angka kami. Perhatikan bahwa hanya paruh kedua dari DAG yang sebenarnya perlu disimpan, sehingga kebutuhan RAM de-facto dimulai pada 1 GB dan tumbuh sebesar 441 MB per tahun.

### Pembuatan grafik Dagger {#dagger-graph-building}

Primitif pembuatan grafik dagger didefinisikan sebagai berikut:

```python
def produce_dag(params, seed, length):
    P = params["P"]
    picker = init = pow(sha3(seed), params["w"], P)
    o = [init]
    for i in range(1, length):
        x = picker = (picker * init) % P
        for _ in range(params["k"]):
            x ^= o[x % i]
        o.append(pow(x, params["w"], P))
    return o
```

Pada dasarnya, ini memulai grafik sebagai node tunggal, `sha3(seed)`, dan dari sana mulai menambahkan node lain secara berurutan berdasarkan node sebelumnya yang acak. Ketika node baru dibuat, pangkat modular dari seed dihitung untuk memilih secara acak beberapa indeks yang kurang dari `i` (menggunakan `x % i` di atas), dan nilai node pada indeks tersebut digunakan dalam perhitungan untuk menghasilkan nilai baru untuk `x`, yang kemudian dimasukkan ke dalam fungsi proof-of-work kecil (berdasarkan XOR) untuk pada akhirnya menghasilkan nilai grafik pada indeks `i`. Alasan di balik desain khusus ini adalah untuk memaksa akses berurutan dari DAG; nilai DAG berikutnya yang akan diakses tidak dapat ditentukan sampai nilai saat ini diketahui. Terakhir, eksponensiasi modular melakukan hash pada hasilnya lebih lanjut.

Algoritma ini bergantung pada beberapa hasil dari teori bilangan. Lihat lampiran di bawah ini untuk pembahasannya.

## Evaluasi klien ringan {#light-client-evaluation}

Konstruksi grafik di atas bermaksud untuk memungkinkan setiap node dalam grafik direkonstruksi dengan menghitung sub-pohon yang hanya terdiri dari sejumlah kecil node dan hanya membutuhkan sejumlah kecil memori tambahan. Perhatikan bahwa dengan k=1, sub-pohon tersebut hanyalah rantai nilai yang naik ke elemen pertama dalam DAG.

Fungsi komputasi klien ringan untuk DAG bekerja sebagai berikut:

```python
def quick_calc(params, seed, p):
    w, P = params["w"], params["P"]
    cache = {}

    def quick_calc_cached(p):
        if p in cache:
            pass
        elif p == 0:
            cache[p] = pow(sha3(seed), w, P)
        else:
            x = pow(sha3(seed), (p + 1) * w, P)
            for _ in range(params["k"]):
                x ^= quick_calc_cached(x % p)
            cache[p] = pow(x, w, P)
        return cache[p]

    return quick_calc_cached(p)
```

Pada dasarnya, ini hanyalah penulisan ulang dari algoritma di atas yang menghapus perulangan komputasi nilai untuk seluruh DAG dan mengganti pencarian node sebelumnya dengan panggilan rekursif atau pencarian cache. Perhatikan bahwa untuk `k=1` cache tidak diperlukan, meskipun pengoptimalan lebih lanjut sebenarnya melakukan prakomputasi beberapa ribu nilai pertama dari DAG dan menyimpannya sebagai cache statis untuk komputasi; lihat lampiran untuk implementasi kode dari hal ini.

## Buffer ganda DAG {#double-buffer}

Dalam klien penuh, [_buffer ganda_](https://wikipedia.org/wiki/Multiple_buffering) dari 2 DAG yang dihasilkan oleh rumus di atas digunakan. Idenya adalah bahwa DAG diproduksi setiap jumlah blok `epochtime` sesuai dengan parameter di atas. Alih-alih klien menggunakan DAG terbaru yang diproduksi, klien menggunakan yang sebelumnya. Manfaat dari hal ini adalah memungkinkan DAG diganti seiring waktu tanpa perlu memasukkan langkah di mana penambang harus tiba-tiba menghitung ulang semua data. Jika tidak, ada potensi perlambatan sementara yang tiba-tiba dalam pemrosesan rantai pada interval reguler dan secara dramatis meningkatkan sentralisasi. Dengan demikian, risiko serangan 51% dalam beberapa menit sebelum semua data dihitung ulang.

Algoritma yang digunakan untuk menghasilkan kumpulan DAG yang digunakan untuk menghitung pekerjaan untuk sebuah blok adalah sebagai berikut:

```python
def get_prevhash(n):
    from pyethereum.blocks import GENESIS_PREVHASH
    from pyethereum import chain_manager
    if n <= 0:
        return hash_to_int(GENESIS_PREVHASH)
    else:
        prevhash = chain_manager.index.get_block_by_number(n - 1)
        return decode_int(prevhash)

def get_seedset(params, block):
    seedset = {}
    seedset["back_number"] = block.number - (block.number % params["epochtime"])
    seedset["back_hash"] = get_prevhash(seedset["back_number"])
    seedset["front_number"] = max(seedset["back_number"] - params["epochtime"], 0)
    seedset["front_hash"] = get_prevhash(seedset["front_number"])
    return seedset

def get_dagsize(params, block):
    return params["n"] + (block.number // params["epochtime"]) * params["n_inc"]

def get_daggerset(params, block):
    dagsz = get_dagsize(params, block)
    seedset = get_seedset(params, block)
    if seedset["front_hash"] <= 0:
        # No back buffer is possible, just make front buffer # Tidak memungkinkan adanya back buffer, cukup buat front buffer
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

Ide di balik Hashimoto asli adalah menggunakan blockchain sebagai kumpulan data, melakukan komputasi yang memilih N indeks dari blockchain, mengumpulkan transaksi pada indeks tersebut, melakukan XOR dari data ini, dan mengembalikan hash dari hasilnya. Algoritma asli Thaddeus Dryja, yang diterjemahkan ke Python untuk konsistensi, adalah sebagai berikut:

```python
def orig_hashimoto(prev_hash, merkle_root, list_of_transactions, nonce):
    hash_output_A = sha256(prev_hash + merkle_root + nonce)
    txid_mix = 0
    for i in range(64):
        shifted_A = hash_output_A >> i
        transaction = shifted_A % len(list_of_transactions)
        txid_mix ^= list_of_transactions[transaction] << i
    return txid_mix ^ (nonce << 192)
```

Sayangnya, meskipun Hashimoto dianggap sulit secara RAM, ia bergantung pada aritmatika 256-bit, yang memiliki overhead komputasi yang cukup besar. Namun, Dagger-Hashimoto hanya menggunakan 64 bit paling tidak signifikan saat mengindeks kumpulan datanya untuk mengatasi masalah ini.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Penggunaan SHA3 ganda memungkinkan bentuk pra-verifikasi tanpa data yang hampir instan, hanya memverifikasi bahwa nilai perantara yang benar telah diberikan. Lapisan luar proof-of-work ini sangat ramah ASIC dan cukup lemah, tetapi ada untuk membuat DDoS menjadi lebih sulit karena sejumlah kecil pekerjaan tersebut harus dilakukan untuk menghasilkan blok yang tidak akan langsung ditolak. Berikut adalah versi klien ringan:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Penambangan dan verifikasi {#mining-and-verifying}

Sekarang, mari kita gabungkan semuanya ke dalam algoritma penambangan:

```python
def mine(daggerset, params, block):
    from random import randint
    nonce = randint(0, 2**64)
    while 1:
        result = hashimoto(daggerset, get_dagsize(params, block),
                           params, decode_int(block.prevhash), nonce)
        if result * params["diff"] < 2**256:
            break
        nonce += 1
        if nonce >= 2**64:
            nonce = 0
    return nonce
```

Berikut adalah algoritma verifikasinya:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Verifikasi yang ramah klien ringan:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Selain itu, perhatikan bahwa Dagger-Hashimoto memberlakukan persyaratan tambahan pada header blok:

- Agar verifikasi dua lapis berfungsi, header blok harus memiliki nonce dan nilai tengah pra-sha3
- Di suatu tempat, header blok harus menyimpan sha3 dari seedset saat ini

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Lampiran {#appendix}

Seperti yang dicatat di atas, RNG yang digunakan untuk pembuatan DAG bergantung pada beberapa hasil dari teori bilangan. Pertama, kami memberikan jaminan bahwa Lehmer RNG yang menjadi dasar untuk variabel `picker` memiliki periode yang luas. Kedua, kami menunjukkan bahwa `pow(x,3,P)` tidak akan memetakan `x` ke `1` atau `P-1` asalkan `x ∈ [2,P-2]` untuk memulai. Terakhir, kami menunjukkan bahwa `pow(x,3,P)` memiliki tingkat tabrakan yang rendah ketika diperlakukan sebagai fungsi hashing.

### Generator angka acak Lehmer {#lehmer-random-number}

Meskipun fungsi `produce_dag` tidak perlu menghasilkan angka acak yang tidak bias, potensi ancamannya adalah bahwa `seed**i % P` hanya mengambil segelintir nilai. Hal ini dapat memberikan keuntungan bagi penambang yang mengenali pola tersebut dibandingkan dengan mereka yang tidak.

Untuk menghindari hal ini, hasil dari teori bilangan digunakan. Sebuah [_Safe Prime_](https://en.wikipedia.org/wiki/Safe_prime) didefinisikan sebagai bilangan prima `P` sedemikian rupa sehingga `(P-1)/2` juga merupakan bilangan prima. _Orde_ dari anggota `x` dari [grup perkalian](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` didefinisikan sebagai `m` minimal sedemikian rupa sehingga <pre>xᵐ mod P ≡ 1</pre>
Mengingat definisi ini, kita memiliki:

> Pengamatan 1. Misalkan `x` menjadi anggota grup perkalian `ℤ/Pℤ` untuk safe prime `P`. Jika `x mod P ≠ 1 mod P` dan `x mod P ≠ P-1 mod P`, maka orde dari `x` adalah `P-1` atau `(P-1)/2`.

_Bukti_. Karena `P` adalah safe prime, maka berdasarkan [Teorema Lagrange][lagrange] kita memiliki bahwa orde dari `x` adalah `1`, `2`, `(P-1)/2`, atau `P-1`.

Orde dari `x` tidak bisa `1`, karena berdasarkan Teorema Kecil Fermat kita memiliki:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Oleh karena itu `x` harus menjadi identitas perkalian dari `ℤ/nℤ`, yang mana unik. Karena kita mengasumsikan bahwa `x ≠ 1` berdasarkan asumsi, hal ini tidak mungkin.

Orde dari `x` tidak bisa `2` kecuali `x = P-1`, karena ini akan melanggar bahwa `P` adalah bilangan prima.

Dari proposisi di atas, kita dapat mengenali bahwa mengulangi `(picker * init) % P` akan memiliki panjang siklus setidaknya `(P-1)/2`. Ini karena kita memilih `P` sebagai safe prime yang kira-kira sama dengan pangkat dua yang lebih tinggi, dan `init` berada dalam interval `[2,2**256+1]`. Mengingat besarnya `P`, kita seharusnya tidak pernah mengharapkan siklus dari eksponensiasi modular.

Ketika kita menetapkan sel pertama dalam DAG (variabel berlabel `init`), kita menghitung `pow(sha3(seed) + 2, 3, P)`. Sekilas, ini tidak menjamin bahwa hasilnya bukan `1` maupun `P-1`. Namun, karena `P-1` adalah safe prime, kita memiliki jaminan tambahan berikut, yang merupakan akibat wajar dari Pengamatan 1:

> Pengamatan 2. Misalkan `x` menjadi anggota grup perkalian `ℤ/Pℤ` untuk safe prime `P`, dan misalkan `w` menjadi bilangan asli. Jika `x mod P ≠ 1 mod P` dan `x mod P ≠ P-1 mod P`, serta `w mod P ≠ P-1 mod P` dan `w mod P ≠ 0 mod P`, maka `xʷ mod P ≠ 1 mod P` dan `xʷ mod P ≠ P-1 mod P`

### Eksponensiasi modular sebagai fungsi hash {#modular-exponentiation}

Untuk nilai `P` dan `w` tertentu, fungsi `pow(x, w, P)` mungkin memiliki banyak tabrakan. Misalnya, `pow(x,9,19)` hanya mengambil nilai `{1,18}`.

Mengingat bahwa `P` adalah bilangan prima, maka `w` yang sesuai untuk fungsi hashing eksponensiasi modular dapat dipilih menggunakan hasil berikut:

> Pengamatan 3. Misalkan `P` adalah bilangan prima; `w` dan `P-1` relatif prima jika dan hanya jika untuk semua `a` dan `b` dalam `ℤ/Pℤ`:<center>`aʷ mod P ≡ bʷ mod P` jika dan hanya jika `a mod P ≡ b mod P`</center>

Dengan demikian, mengingat bahwa `P` adalah bilangan prima dan `w` relatif prima terhadap `P-1`, kita memiliki bahwa `|{pow(x, w, P) : x ∈ ℤ}| = P`, yang menyiratkan bahwa fungsi hashing memiliki tingkat tabrakan minimal yang mungkin.

Dalam kasus khusus bahwa `P` adalah safe prime seperti yang telah kita pilih, maka `P-1` hanya memiliki faktor 1, 2, `(P-1)/2` dan `P-1`. Karena `P` > 7, kita tahu bahwa 3 relatif prima terhadap `P-1`, oleh karena itu `w=3` memenuhi proposisi di atas.

## Algoritma evaluasi berbasis cache yang lebih efisien {#cache-based-evaluation}

```python
def quick_calc(params, seed, p):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_calc_cached(cache, params, p)

def quick_calc_cached(cache, params, p):
    P = params["P"]
    if p < len(cache):
        return cache[p]
    else:
        x = pow(cache[0], p + 1, P)
        for _ in range(params["k"]):
            x ^= quick_calc_cached(cache, params, x % p)
        return pow(x, params["w"], P)

def quick_hashimoto(seed, dagsize, params, header, nonce):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_hashimoto_cached(cache, dagsize, params, header, nonce)

def quick_hashimoto_cached(cache, dagsize, params, header, nonce):
    m = dagsize // 2
    mask = 2**64 - 1
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc_cached(cache, params, m + (mix & mask) % m)
    return dbl_sha3(mix)
```