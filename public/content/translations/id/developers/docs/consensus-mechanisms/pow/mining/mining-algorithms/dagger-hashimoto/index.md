---
title: Dagger-Hashimoto
description: Penampilan secara rinci dari algoritma Dagger-Hashimoto.
lang: id
---

Dagger-Hashimoto aslinya adalah penerapan penelitian dan spesifikasi untuk algoritma penambangan Ethereum. Dagger-Hashimoto digantikan oleh [Ethash](#ethash). Penambangan dihentikan sepenuhnya saat [Penggabungan](/roadmap/merge/) pada tanggal 15 September 2022. Sejak saat itu, Ethereum telah diamankan menggunakan mekanisme [bukti taruhan](/developers/docs/consensus-mechanisms/pos). Halaman ini untuk kepentingan sejarah-informasi disini tidak lagi relevan untuk Ethereum setelah penggabungan.

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan kamu untuk membaca terlebih dahulu tentang [konsensus bukti kerja](/developers/docs/consensus-mechanisms/pow), [penambangan](/developers/docs/consensus-mechanisms/pow/mining), dan [algoritma penambangan](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto bertujuan untuk memenuhi dua tujuan:

1. **Ketahanan-ASIC**: manfaat dari pembuatan perangkat keras khusus untuk algoritma harus sekecil mungkin
2. **Keterverifikasian klien ringan**: sebuah blok harus dapat diverifikasi secara efisien oleh klien ringan.

Dengan modifikasi tambahan, kami juga menentukan cara memenuhi tujuan ketiga jika diinginkan, tetapi dengan mengorbankan kerumitan tambahan:

**Penyimpanan rantai penuh**: penambangan harus memerlukan penyimpanan status rantai blok yang lengkap (karena struktur trie status Ethereum yang tidak beraturan, kami mengantisipasi bahwa beberapa pemangkasan akan dimungkinkan, terutama pada beberapa kontrak yang sering digunakan, tetapi kami ingin meminimalkan hal ini).

## Pembuatan DAG {#dag-generation}

Kode untuk algoritma ini akan didefinisikan dalam bahasa Python di bawah ini. Pertama, kami memberikan `encode_int` untuk menserialisasi bilangan bulat tak bertanda dengan presisi tertentu menjadi string. Kebalikannya juga diberikan:

```python
NUM_BITS = 512

def encode_int(x):
    "Mengenkode integer x sebagai string 64 karakter menggunakan skema big-endian"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Mendekode integer x dari sebuah string menggunakan skema big-endian"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Selanjutnya, kami berasumsi bahwa `sha3` adalah fungsi yang mengambil integer dan menghasilkan integer, dan `dbl_sha3` adalah fungsi double-sha3; jika mengonversi kode referensi ini menjadi implementasi, gunakan:

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

Parameter yang digunakan untuk algoritmanya adalah:

```python
SAFE_PRIME_512 = 2**512 - 38117     # Bilangan Prima Aman Terbesar yang kurang dari 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Ukuran set data (4 Gigabytes); HARUS KELIPATAN 65536
      "n_inc": 65536,                   # Peningkatan nilai n per periode; HARUS KELIPATAN 65536
                                        # dengan epochtime=20000 memberikan pertumbuhan 882 MB per tahun
      "cache_size": 2500,               # Ukuran cache klien ringan (dapat dipilih oleh klien
                                        # ringan; bukan bagian dari spesifikasi algo)
      "diff": 2**14,                    # Tingkat kesulitan (disesuaikan selama evaluasi blok)
      "epochtime": 100000,              # Panjang sebuah jangka waktu dalam blok (seberapa sering set data diperbarui)
      "k": 1,                           # Jumlah induk dari sebuah simpul
      "w": w,                          # Digunakan untuk hashing eksponensiasi modular
      "accesses": 200,                  # Jumlah akses set data selama hashimoto
      "P": SAFE_PRIME_512               # Bilangan Prima Aman untuk hashing dan pembuatan angka acak
}
```

Dalam kasus ini, `P` adalah bilangan prima yang dipilih sedemikian rupa sehingga `log₂(P)` sedikit lebih kecil dari 512, yang sesuai dengan 512 bit yang telah kami gunakan untuk merepresentasikan bilangan kami. Perhatikan bahwa hanya separuh bagian terakhir dari DAG yang sebenarnya perlu disimpan, sehingga kebutuhan RAM secara de-facto dimulai dari 1 GB dan bertambah 441 MB per tahun.

### Pembangunan graf Dagger {#dagger-graph-building}

Primitif pembangun graf belati didefinisikan sebagai berikut:

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

Pada dasarnya, ini dimulai dari sebuah graf sebagai satu simpul tunggal, `sha3(seed)`, dan dari sana mulai menambahkan simpul-simpul lain secara berurutan berdasarkan simpul-simpul acak sebelumnya. Ketika sebuah simpul baru dibuat, pangkat modular dari seed dihitung untuk secara acak memilih beberapa indeks yang lebih kecil dari `i` (menggunakan `x % i` di atas), dan nilai-nilai dari simpul-simpul pada indeks tersebut digunakan dalam sebuah perhitungan untuk menghasilkan nilai baru untuk `x`, yang kemudian dimasukkan ke dalam fungsi bukti kerja kecil (berbasis XOR) untuk pada akhirnya menghasilkan nilai graf pada indeks `i`. Alasan di balik desain khusus ini adalah untuk memaksa akses berurutan dari DAG; nilai berikutnya dari DAG yang akan diakses tidak dapat ditentukan sampai nilai saat ini diketahui. Terakhir, eksponensial modular mengacak hasilnya lebih jauh.

Algoritma ini bergantung pada beberapa hasil dari teori bilangan. Lihat lampiran di bawah untuk diskusi.

## Evaluasi klien ringan {#light-client-evaluation}

Konstruksi graf diatas bertujuan agar tiap simpul dalam graf dapat direkonstruksi hanya dengan menkalkulasi sebagian kecil simpul dalam graf dan membutuhkan sejumlah kecil memori eksternal. Perhatikan ketika k=1, subtree dimaksud adalah rantai nilai menuju elemen pertama pada DAG.

Fungsi komputasi Klien Ringan untuk DAG bekerja sebagai berikut:

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

Pada esensinya, algoritma ini adalah variasi algoritma diatas yang mengganti kalkulasi nilai berulang untuk seluruh DAG dengan pencarian simpul sebelumnya melalui panggilan rekursif atau cache. Perhatikan bahwa untuk `k=1` cache tidak diperlukan, meskipun optimisasi lebih lanjut sebenarnya melakukan prakomputasi beberapa ribu nilai pertama dari DAG dan menyimpannya sebagai cache statis untuk komputasi; lihat lampiran untuk implementasi kode ini.

## Buffer ganda DAG {#double-buffer}

Dalam klien penuh, sebuah [_buffer ganda_](https://wikipedia.org/wiki/Multiple_buffering) dari 2 DAG yang dihasilkan oleh rumus di atas digunakan. Idenya adalah DAG diproduksi setiap `epochtime` jumlah blok sesuai dengan parameter di atas. Alih-alih klien menggunakan DAG terbaru yang dihasilkan, klien menggunakan DAG sebelumnya. Manfaatnya adalah memungkinkan DAG diganti seiring waktu tanpa perlu menambahkan langkah di mana penambang harus tiba-tiba menghitung ulang semua data. Jika tidak, ada potensi terjadinya perlambatan sementara yang tiba-tiba dalam pemrosesan rantai secara berkala dan peningkatan sentralisasi secara drastis Dengan demikian, terdapat risiko serangan 51% dalam beberapa menit sebelum semua data dihitung ulang.

Algoritme yang digunakan untuk menghasilkan himpunan DAG yang dipakai untuk menghitung pekerjaan suatu blok adalah sebagai berikut:

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
        # Tidak ada buffer belakang yang memungkinkan, buat saja buffer depan
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

Gagasan di balik Hashimoto asli adalah menggunakan blockchain sebagai dataset, melakukan komputasi yang memilih N indeks dari blockchain, mengumpulkan transaksi pada indeks tersebut, melakukan operasi XOR terhadap data ini, dan mengembalikan hash dari hasilnya. Algoritme asli Thaddeus Dryja, yang diterjemahkan ke dalam Python untuk konsistensi, adalah sebagai berikut:

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

Sayangnya, meskipun Hashimoto dianggap RAM hard, algoritme ini bergantung pada aritmetika 256-bit, yang memiliki beban komputasi cukup besar. Namun, Dagger-Hashimoto hanya menggunakan 64 bit paling rendah ketika melakukan pengindeksan pada dataset-nya untuk mengatasi masalah ini.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Penggunaan SHA3 ganda memungkinkan adanya bentuk pra-verifikasi tanpa data, yang hampir seketika, dengan hanya memverifikasi bahwa nilai perantara yang benar telah disediakan. Lapisan luar proof-of-work ini sangat ramah terhadap ASIC dan relatif lemah, tetapi ada untuk membuat serangan DDoS menjadi lebih sulit karena sejumlah kecil pekerjaan tersebut harus dilakukan agar dapat menghasilkan blok yang tidak langsung ditolak. Berikut adalah versi light client:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Menambang dan Memverifikasi {#mining-and-verifying}

Sekarang, kita akan menggabungkan keseluruhannya menjadi sebuah algoritma penambangan:

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

Berikut algoritma verifikasi:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Verifikasi yang cocok untuk Klien Ringan:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Juga perhatikan bahwa Dagger-Hashimoto memaksakan tambahan persyaratan pada awalan Blok:

- Agar verifikasi 2-lapis dapat bekerja, awalan sebuah Blok harus memiliki Nonce dan nilai tengah pre-sha3
- Awalan sebuah blok juga harus menyimpan nilai sha3 dari set bibit sekarang

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Lampiran {#appendix}

Seperti dicatat di atas, RNG yang digunakan untuk pembangkitan DAG bergantung pada beberapa hasil dari teori bilangan. Pertama, kami memberikan jaminan bahwa Lehmer RNG yang menjadi dasar bagi variabel `picker` memiliki periode yang panjang. Kedua, kami menunjukkan bahwa `pow(x,3,P)` tidak akan memetakan `x` ke `1` atau `P-1` asalkan `x ∈ [2,P-2]` pada awalnya. Terakhir, kami menunjukkan bahwa `pow(x,3,P)` memiliki tingkat tabrakan yang rendah ketika diperlakukan sebagai fungsi hashing.

### Generator angka acak Lehmer {#lehmer-random-number}

Meskipun fungsi `produce_dag` tidak perlu menghasilkan angka acak yang tidak bias, ancaman potensialnya adalah `seed**i % P` hanya mengambil segelintir nilai. Hal ini bisa memberikan keuntungan bagi penambang yang mengenali pola tersebut dibandingkan dengan yang tidak.

Untuk menghindari hal ini, digunakan sebuah hasil dari teori bilangan. [_Bilangan Prima Aman_](https://en.wikipedia.org/wiki/Safe_prime) didefinisikan sebagai bilangan prima `P` sedemikian rupa sehingga `(P-1)/2` juga merupakan bilangan prima. _Orde_ dari anggota `x` dari [grup perkalian](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` didefinisikan sebagai `m` minimal sedemikian rupa sehingga <pre>xᵐ mod P ≡ 1</pre>
Berdasarkan definisi ini, kita memiliki:

> Pengamatan 1. Misalkan `x` adalah anggota dari grup perkalian `ℤ/Pℤ` untuk sebuah bilangan prima aman `P`. Jika `x mod P ≠ 1 mod P` dan `x mod P ≠ P-1 mod P`, maka orde dari `x` adalah `P-1` atau `(P-1)/2`.

_Bukti_. Karena `P` adalah bilangan prima aman, maka menurut [Teorema Lagrange][lagrange] kita dapati bahwa orde dari `x` adalah `1`, `2`, `(P-1)/2`, atau `P-1`.

Orde dari `x` tidak bisa `1`, karena menurut Teorema Kecil Fermat kita memiliki:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Oleh karena itu, `x` harus menjadi identitas perkalian dari `ℤ/nℤ`, yang bersifat unik. Karena kita berasumsi bahwa `x ≠ 1`, hal ini tidak mungkin.

Orde dari `x` tidak bisa `2` kecuali `x = P-1`, karena ini akan melanggar fakta bahwa `P` adalah bilangan prima.

Dari proposisi di atas, kita dapat mengenali bahwa iterasi `(picker * init) % P` akan memiliki panjang siklus minimal `(P-1)/2`. Ini karena kami memilih `P` menjadi bilangan prima aman yang kira-kira sama dengan pangkat dua yang lebih tinggi, dan `init` berada di interval `[2,2**256+1]`. Mengingat besarnya `P`, kita seharusnya tidak pernah mengharapkan siklus dari eksponensiasi modular.

Saat kita menetapkan sel pertama di dalam DAG (variabel yang diberi label `init`), kita menghitung `pow(sha3(seed) + 2, 3, P)`. Sekilas, ini tidak menjamin bahwa hasilnya bukan `1` ataupun `P-1`. Namun, karena `P-1` adalah bilangan prima aman, kami memiliki jaminan tambahan berikut, yang merupakan korolari dari Pengamatan 1:

> Pengamatan 2. Misalkan `x` adalah anggota dari grup perkalian `ℤ/Pℤ` untuk bilangan prima aman `P`, dan misalkan `w` adalah bilangan asli. Jika `x mod P ≠ 1 mod P` dan `x mod P ≠ P-1 mod P`, serta `w mod P ≠ P-1 mod P` dan `w mod P ≠ 0 mod P`, maka `xʷ mod P ≠ 1 mod P` dan `xʷ mod P ≠ P-1 mod P`

### Eksponensiasi modular sebagai fungsi hash {#modular-exponentiation}

Untuk nilai `P` dan `w` tertentu, fungsi `pow(x, w, P)` mungkin memiliki banyak tabrakan. Sebagai contoh, `pow(x,9,19)` hanya mengambil nilai `{1,18}`.

Mengingat bahwa `P` adalah bilangan prima, maka `w` yang sesuai untuk fungsi hashing eksponensiasi modular dapat dipilih menggunakan hasil berikut:

> Observasi 3. Misalkan `P` adalah bilangan prima; `w` dan `P-1` adalah relatif prima jika dan hanya jika untuk semua `a` dan `b` di `ℤ/Pℤ`:<center>`aʷ mod P ≡ bʷ mod P` jika dan hanya jika `a mod P ≡ b mod P`</center>

Jadi, mengingat `P` adalah bilangan prima dan `w` relatif prima terhadap `P-1`, kita dapati bahwa `|{pow(x, w, P) : x ∈ ℤ}| = P`, yang menyiratkan bahwa fungsi hashing memiliki tingkat tabrakan seminimal mungkin.

Dalam kasus khusus di mana `P` adalah bilangan prima aman seperti yang telah kita pilih, maka `P-1` hanya memiliki faktor 1, 2, `(P-1)/2` dan `P-1`. Karena `P` > 7, kita tahu bahwa 3 relatif prima terhadap `P-1`, maka `w=3` memenuhi proposisi di atas.

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
