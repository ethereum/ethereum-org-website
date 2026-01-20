---
title: Belajar Topik Dasar Ethereum dengan SQL
description: Tutorial ini membantu pembaca memahami konsep dasar Ethereum termasuk transaksi, blok, dan gas dengan membuat kueri data onchain menggunakan Structured Query Language (SQL).
author: "Paul Apivat"
tags: [ "SQL", "Membuat kueri", "Transaksi" ]
skill: beginner
lang: id
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Banyak tutorial Ethereum menargetkan para pengembang, tetapi ada kekurangan sumber daya edukasi untuk analis data atau untuk orang-orang yang ingin melihat data onchain tanpa menjalankan klien atau node.

Tutorial ini membantu pembaca memahami konsep dasar Ethereum termasuk transaksi, blok, dan gas dengan membuat kueri data onchain dengan structured query language (SQL) melalui antarmuka yang disediakan oleh [Dune Analytics](https://dune.com/).

Data onchain dapat membantu kita memahami Ethereum, jaringannya, dan sebagai ekonomi untuk daya komputasi dan seharusnya berfungsi sebagai dasar untuk memahami tantangan yang dihadapi Ethereum saat ini (misalnya, kenaikan harga gas) dan, yang lebih penting, diskusi seputar solusi penskalaan.

### Transaksi {#transactions}

Perjalanan pengguna di Ethereum dimulai dengan menginisialisasi akun yang dikontrol pengguna atau entitas dengan saldo ETH. Ada dua jenis akun - yang dikontrol pengguna atau kontrak pintar (lihat [ethereum.org](/developers/docs/accounts/)).

Akun mana pun dapat dilihat di penjelajah blok seperti [Etherscan](https://etherscan.io/) atau [Blockscout](https://eth.blockscout.com/). Penjelajah blok adalah portal untuk data Ethereum. Mereka menampilkan, secara waktu nyata, data pada blok, transaksi, penambang, akun, dan aktivitas onchain lainnya (lihat [di sini](/developers/docs/data-and-analytics/block-explorers/)).

Namun, pengguna mungkin ingin membuat kueri data secara langsung untuk merekonsiliasi informasi yang disediakan oleh penjelajah blok eksternal. [Dune Analytics](https://dune.com/) menyediakan kemampuan ini kepada siapa pun yang memiliki pengetahuan tentang SQL.

Sebagai referensi, akun kontrak pintar untuk Ethereum Foundation (EF) dapat dilihat di [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Satu hal yang perlu diperhatikan adalah bahwa semua akun, termasuk milik EF, memiliki alamat publik yang dapat digunakan untuk mengirim dan menerima transaksi.

Saldo akun di Etherscan terdiri dari transaksi reguler dan transaksi internal. Transaksi internal, terlepas dari namanya, bukanlah transaksi _aktual_ yang mengubah state rantai. Transaksi ini adalah transfer nilai yang dimulai dengan mengeksekusi kontrak ([sumber](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Karena transaksi internal tidak memiliki tanda tangan, transaksi tersebut **tidak** disertakan di dalam blockchain dan tidak dapat dikueri dengan Dune Analytics.

Oleh karena itu, tutorial ini akan berfokus pada transaksi reguler. Ini dapat dikueri sebagai berikut:

```sql
WITH temp_table AS (
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    value / 1e18 AS ether,
    gas_used,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
)
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    ether,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

Ini akan menghasilkan informasi yang sama seperti yang disediakan di halaman transaksi Etherscan. Sebagai perbandingan, berikut adalah kedua sumber:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Halaman kontrak EF di Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Anda dapat menemukan dasbor [di sini](https://dune.com/paulapivat/Learn-Ethereum). Klik pada tabel untuk melihat kueri (lihat juga di atas).

### Membedah Transaksi {#breaking_down_transactions}

Transaksi yang dikirimkan mencakup beberapa informasi, termasuk ([sumber](/developers/docs/transactions/)):

- **Penerima**: Alamat penerima (dikueri sebagai "to")
- **Tanda Tangan**: Meskipun kunci privat pengirim menandatangani transaksi, yang dapat kita kueri dengan SQL adalah alamat publik pengirim ("from").
- **Nilai**: Ini adalah jumlah ETH yang ditransfer (lihat kolom `ether`).
- **Data**: Ini adalah data arbitrer yang telah di-hash (lihat kolom `data`)
- **gasLimit** – jumlah maksimum unit gas yang dapat digunakan oleh transaksi. Unit gas mewakili langkah-langkah komputasi
- **maxPriorityFeePerGas** - jumlah gas maksimum yang akan disertakan sebagai tip untuk penambang
- **maxFeePerGas** - jumlah maksimum gas yang bersedia dibayarkan untuk transaksi (termasuk baseFeePerGas dan maxPriorityFeePerGas)

Kita dapat mengueri bagian informasi spesifik ini untuk transaksi ke alamat publik Ethereum Foundation:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Blok {#blocks}

Setiap transaksi akan mengubah state Mesin Virtual Ethereum ([EVM](/developers/docs/evm/)) ([sumber](/developers/docs/transactions/)). Transaksi disiarkan ke jaringan untuk diverifikasi dan disertakan dalam sebuah blok. Setiap transaksi dikaitkan dengan nomor blok. Untuk melihat datanya, kita dapat mengueri nomor blok tertentu: 12396854 (blok terbaru di antara transaksi Ethereum Foundation pada saat artikel ini ditulis, 11/5/21).

Selain itu, saat kita mengueri dua blok berikutnya, kita dapat melihat bahwa setiap blok berisi hash dari blok sebelumnya (yaitu, hash induk), yang mengilustrasikan bagaimana blockchain terbentuk.

Setiap blok berisi referensi ke blok induknya. Ini ditunjukkan di bawah ini di antara kolom `hash` dan `parent_hash` ([sumber](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Berikut adalah [kueri](https://dune.com/queries/44856/88292) di Dune Analytics:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

Kita dapat memeriksa sebuah blok dengan mengueri waktu, nomor blok, difficulty, hash, hash induk, dan nonce.

Satu-satunya hal yang tidak dicakup oleh kueri ini adalah _daftar transaksi_ yang memerlukan kueri terpisah di bawah ini dan _akar state_. Node penuh atau arsip akan menyimpan semua transaksi dan transisi state, yang memungkinkan klien untuk mengueri state rantai kapan saja. Karena ini membutuhkan ruang penyimpanan yang besar, kita dapat memisahkan data rantai dari data state:

- Data rantai (daftar blok, transaksi)
- Data state (hasil dari setiap transisi state transaksi)

Akar state termasuk dalam kategori yang terakhir dan merupakan data _implisit_ (tidak disimpan di onchain), sedangkan data rantai bersifat eksplisit dan disimpan di rantai itu sendiri ([sumber](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Untuk tutorial ini, kita akan berfokus pada data onchain yang _dapat_ dikueri dengan SQL melalui Dune Analytics.

Seperti yang disebutkan di atas, setiap blok berisi daftar transaksi, kita dapat mengueri ini dengan memfilter blok tertentu. Kita akan mencoba blok terbaru, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Berikut adalah output SQL di Dune:

![](./list_of_txn.png)

Penambahan satu blok ini ke rantai mengubah state Mesin Virtual Ethereum ([EVM](/developers/docs/evm/)). Terkadang puluhan, bahkan ratusan transaksi diverifikasi sekaligus. Dalam kasus spesifik ini, 222 transaksi disertakan.

Untuk melihat berapa banyak yang benar-benar berhasil, kita akan menambahkan filter lain untuk menghitung transaksi yang berhasil:

```sql
WITH temp_table AS (
    SELECT * FROM ethereum."transactions"
    WHERE block_number = 12396854 AND success = true
    ORDER BY block_time DESC
)
SELECT
    COUNT(success) AS num_successful_txn
FROM temp_table
```

Untuk blok 12396854, dari total 222 transaksi, 204 berhasil diverifikasi:

![](./successful_txn.png)

Permintaan transaksi terjadi puluhan kali per detik, tetapi blok dikomit kira-kira sekali setiap 15 detik ([sumber](/developers/docs/blocks/)).

Untuk melihat bahwa ada satu blok yang diproduksi kira-kira setiap 15 detik, kita bisa mengambil jumlah detik dalam sehari (86400) dibagi 15 untuk mendapatkan perkiraan jumlah rata-rata blok per hari (~ 5760).

Bagan untuk blok Ethereum yang diproduksi per hari (2016 - sekarang) adalah:

![](./daily_blocks.png)

Jumlah rata-rata blok yang diproduksi setiap hari selama periode waktu ini adalah ~5.874:

![](./avg_daily_blocks.png)

Kuerinya adalah:

```sql
# kueri untuk memvisualisasikan jumlah blok yang diproduksi setiap hari sejak 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# jumlah rata-rata blok yang diproduksi per hari

WITH temp_table AS (
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
)
SELECT
    AVG(block_count) AS avg_block_count
FROM temp_table
```

Jumlah rata-rata blok yang diproduksi per hari sejak 2016 sedikit di atas angka tersebut, yaitu 5.874. Sebagai alternatif, membagi 86400 detik dengan rata-rata 5874 blok akan menghasilkan 14,7 detik atau kira-kira satu blok setiap 15 detik.

### Gas {#gas}

Ukuran blok dibatasi. Ukuran blok maksimum bersifat dinamis dan bervariasi sesuai dengan permintaan jaringan antara 12.500.000 dan 25.000.000 unit. Batasan diperlukan untuk mencegah ukuran blok yang terlalu besar yang dapat membebani node penuh dalam hal ruang disk dan persyaratan kecepatan ([sumber](/developers/docs/blocks/)).

Salah satu cara untuk mengonseptualisasikan batas gas blok adalah dengan menganggapnya sebagai **pasokan** ruang blok yang tersedia untuk menempatkan transaksi secara batch. Batas gas blok dapat dikueri dan divisualisasikan dari tahun 2016 hingga saat ini:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Lalu, ada gas aktual yang digunakan setiap hari untuk membayar komputasi yang dilakukan di rantai Ethereum (misalnya, mengirim transaksi, memanggil kontrak pintar, mencetak NFT). Ini adalah **permintaan** untuk ruang blok Ethereum yang tersedia:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Kita juga bisa menjajarkan kedua bagan ini untuk melihat bagaimana **permintaan dan penawaran** sejajar:

![gas_demand_supply](./gas_demand_supply.png)

Oleh karena itu, kita dapat memahami harga gas sebagai fungsi dari permintaan akan ruang blok Ethereum, dengan mempertimbangkan pasokan yang tersedia.

Terakhir, kita mungkin ingin mengueri harga gas harian rata-rata untuk rantai Ethereum, namun, hal ini akan mengakibatkan waktu kueri yang sangat lama, jadi kita akan memfilter kueri kita ke jumlah rata-rata gas yang dibayarkan per transaksi oleh Ethereum Foundation.

![](./ef_daily_gas.png)

Kita dapat melihat harga gas yang dibayarkan untuk semua transaksi yang dilakukan ke alamat Ethereum Foundation selama bertahun-tahun. Berikut adalah kuerinya:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Rangkuman {#summary}

Dengan tutorial ini, kita memahami konsep dasar Ethereum dan cara kerja blockchain Ethereum dengan membuat kueri dan mendapatkan gambaran tentang data onchain.

Dasbor yang berisi semua kode yang digunakan dalam tutorial ini dapat ditemukan [di sini](https://dune.com/paulapivat/Learn-Ethereum).

Untuk penggunaan data lebih lanjut dalam menjelajahi web3, [temukan saya di Twitter](https://twitter.com/paulapivat).
