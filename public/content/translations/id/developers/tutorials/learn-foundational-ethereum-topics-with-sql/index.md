---
title: Belajar Topik Dasar Ethereum dengan SQL
description: Tutorial ini menolong pembaca memahami konsep dasar Ethereum termasuk transaksi, blok, dan gas dengan membuat kueri data on-chain dengan Structured Query Language (SQL).
author: "Paul Apivat"
tags:
  - "SQL"
  - "Membuat kueri"
  - "Analitik"
  - "Memulai"
  - "Analitik Dune"
  - "Blok"
  - "Transaksi"
  - "Gas"
skill: beginner
lang: id
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Banyak tutorial Ethereum ditujukan untuk para pengembang, tetapi ada kekurangan sumber edukasi untuk analis data atau untuk orang-orang yang ingin melihat data on-chain tanpa menjalankan klien atau node.

Tutorial ini menolong pembaca memahami konsep dasar Ethereum termasuk transaksi, blok, dan gas dengan membuat kueri data on-chain dengan Structured Query Language (SQL) melalui antarmuka yang disediakan oleh [Analitik Dune](https://dune.xyz/home).

Data on-chain dapat menolong kita memahami Ethereum, jaringannya, dan sebagai ekonomi untuk daya komputasi dan seharusnya berfungsi sebagai dasar untuk memahami tantangan yang dihadapi Ethereum hari ini (yaitu, harga gas yang terus naik) dan, lebih penting lagi, diskusi tentang solusi penskalaan.

### Transaksi {#transactions}

Perjalanan pengguna di Ethereum dimulai dengan menginisialisasi akun yang dikontrol penggunga atau entitas dengan saldo ETH. Ada dua jenis akun - yang dikontrol pengguna atau kontrak pintar (lihat [ethereum.org](/developers/docs/accounts/)).

Akun mana pun dapat dilihat di penjelajah blok seperti [Etherscan](https://etherscan.io/). Penjelajah blok adalah portal ke data Ethereum. Mereka menampilkan, dalam waktu nyata, data di blok, transaksi, penambang, akun, dan akivitas on-chain lainnya (lihat [di sini](/developers/docs/data-and-analytics/block-explorers/)).

Namun, seorang pengguna mungkin ingin membuat kueri data secara langsung untuk mencocokkan informasi yang disediakan oleh penjelajah blok eksternal. [Analitik Dune](https://duneanalytics.com/) menyediakan kemampuan ini untuk siapa pun dengan beberapa pengetahuan SQL.

Sebagai referensi, akun kontrak pintar untuk Yayasan Ethereum (EF) dapat dilihat di [Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae).

Satu hal untuk diperhatikan adalah bahwa semua akun, termasuk milik EF, memiliki alamat publik yang dapat digunakan untuk mengirim dan menerima transaksi.

Saldo akun di Etherscan terdiri dari transaksi reguler dan internal. Transaksi internal, terlepas dari namanya, bukanlah transaksi _sebenarnya_ yang mengubah state dari rantai. Mereka adalah nilai transfer yang diinisiasi dengan mengeksekusi kontrak ([sumber](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Karena transaksi internal tidak bertandatangan, mereka **tidak** termasuk dalam blockchain dan tidak dapat dikueri dengan Analitik Dune.

Oleh karena itu, tutorial ini akan berfokus pada transaksi reguler. Ini dapat dibuat kueri sebagai:

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

![etherscan_view](./etherscan_view.png)

[Halaman kontrak EF di Etherscan.](https://etherscan.io/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Analitik Dune {#dune-analytics}

![dune_view](./dune_view.png)

Anda dapat menemukan dasbor [di sini](https://duneanalytics.com/paulapivat/Learn-Ethereum). Klik pada tabel untuk melihat kuerinya (juga lihat di atas).

### Merinci Transaksi {#breaking_down_transactions}

Transaksi yang dikirimkan mencakup beberapa bagian informasi termasuk ([sumber](/developers/docs/transactions/)):

- **Penerima**: Alamat penerima (dikueri sebagai "to")
- **Tanda tangan**: Ketika kunci privat pengirim menandatangani transaksi, apa yang dapat kita kueri dengan SQL adalah alamat publik pengirim ("from").
- **Nilai**: Ini adalah jumlah ETH yang ditransfer (lihat kolom `ether`).
- **Data**: Ini adalah data arbitrari yang telah dihash (lihat kolom `data`)
- **Batas gas**: Jumlah maksimum gas, atau biaya komputasi, yang dapat dipakai oleh transaksi (lihat `gas_limit`).
- **Harga gas**: Biaya yang dibayarkan pengirim untuk menandatangani transaksi di blockchain. Gas berdenominasi dalam Gwei yaitu 0,000000001 ETH (sembelian angka di belakang koma).

Kita dapat membuat kueri bagian informasi khusus ini untuk transaksi ke alamat publik Yayasan Ethereum:

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

Setiap transaksi akan mengubah state dari mesin virtual Ethereum ([EVM](/developers/docs/evm/)) ([sumber](/developers/docs/transactions/)). Transaksi disiarkan ke jaringan untuk diverifikasi dan dimasukkan ke dalam blok. Setiap transaksi terkait dengan nomor blok. Untuk melihat data, kita dapat membuat kueri nomor blok khusus: 12396854 (blok terbaru di antara transaksi Yayasan Ethereum pada waktu penulisan ini, 11/5/21).

Lagipula, ketika kita membuat kueri kepada kedua blok berikutnya, kita dapat melihat setiap blok berisi hash dari blok sebelumnya (yaitu hash induk), yang menggambarkan bagaimana blockchain terbentuk.

Setiap blok berisi referensi ke blok induknya. Ini ditunjukkan di bawah di antara kolom `hash` dan `parent_hash` ([sumber](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Berikut adalah [kueri](https://duneanalytics.com/queries/44856/88292) di Dune Analytics:

```sql
SELECT
   time,
   number,
   difficulty,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

Kita dapat memeriksa blok dengan membuat kueri waktu, nomor blok, tingkat kesulitan, hash, hash induk, dan nonce.

Satu hal yang tidak dicakup oleh kueri ini adalah _daftar transaksi_ yang membutuhkan kueri di bawah dan _akar state_ terpisah. Node arsip penuh akan menyimpan semua transaksi dan transisi state, yang memungkinkan klien untuk membuat kueri state rantai pada saat mana pun. Karena ini membutuhkan ruangan penyimpanan yang besar, kita dapat memisahkan data rantai dari data state:

- Data rantai (daftar blok, transaksi)
- Data state (hasil setiap transisi state transaksi)

Akar state termasuk dalam kategori kedua dan merupakan data _implisit_ (tidak tersimpan secara on-chain), sedangkan data rantai bersifat eksplisit dan tersimpan di rantai itu sendiri ([sumber](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Untuk tutorial ini, kita akan berfokus pada data on-chain yang _dapat_ dikueri dengan SQL melalui Dune Analytics.

Seperti yang disebutkan di atas, bahwa setiap blok berisi daftar transaksi, kita dapat membuat kueri ini dengan memfilter blok khusus. Kita akan mencoba blok paling baru, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Berikut adalah output SQL di Dune:

![list_of_txn](./list_of_txn.png)

Blok tunggal ini yang ditambahkan ke rantai mengubah state mesin virtual Ethereum ([EVM](/developers/docs/evm/)). Kadang-kadang belasan, ratusan transaksi diverifikasi dalam sekali waktu. Dalam kasus khusus ini, 222 transaksi dimasukkan.

Untuk melihat berapa banyak yang berhasil, kita akan menambahkan filter lainnya untuk menghitung transaksi yang berhasil:

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

![successful_txn](./successful_txn.png)

Permintaan transaksi muncul belasan kali setiap detik, tetapi blok dikomit kira-kira sekali setiap 15 detik ([sumber](/developers/docs/blocks/)).

Untuk melihat bahwa ada satu blok yang dibuat kira-kira setiap 15 detik, kita dapat mengambil jumlah detik dalam satu hari (86400) dibagi dengan 15 untuk mendapatkan _estimasi_ jumlah blok rata-rata per hari (~ 5760).

Bagan untuk blok Ethereum dibuat per hari (2016 - hari ini) adalah:

![daily_blocks](./daily_blocks.png)

Jumlah rata-rata blok yang dibuat setiap hari selama periode waktu ini adalah ~ 5.874:

![avg_daily_blocks](./avg_daily_blocks.png)

Kuerinya adalah:

```sql
# query to visualize number of blocks produced daily since 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# average number of blocks produced per day

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

Jumlah rata-rata blok yang dibuat per hari sejak 2016 sedikit di atas jumlah tersebut pada 5.874. Secara alternatif, membagi 86400 detik dengan 5874 blok rata-rata menghasilkan 14,7 detik atau kira-kira satu blok setiap 15 detik.

### Gas {#gas}

Blok dibatasi oleh ukuran. Setiap blok memiliki batas gas yang secara kolektif ditetapkan oleh para penambang dan jaringan untuk mencegah ukuran blok yang besar secara aribitrari agar mengurangi tekanan pada node penuh dalam persyaratan ruang diska dan kecepatan ([sumber](/developers/docs/blocks/)).

Satu cara untuk mengonsep batas gas blok adalah memikirkannya sebagai **pasokan** ruangan blok yang tersedia sebagai tempat untuk mengelompokkan transaksi. Batas gas blok dapat dikueri dan divisualisasi dari 2016 sampai hari ini:

![avg_gas_limit](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Lalu ada gas sebenarnya yang dipakai secara harian untuk membayar komputasi yang dilakukan di rantai Ethereum (yaitu mengirim transaksi, memanggil kontrak pintar, mencetak NFT). Ini adalah **permintaan** untuk ruang blok Ethereum yang tersedia:

![daily_gas_used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Kita juga dapat membandingkan kedua bagan ini bersama untuk melihat bagaimana **permintaan dan pasokan** disejajarkan:

![gas_demand_supply](./gas_demand_supply.png)

Oleh karena itu kita dapat memahami harga gas sebagai fungsi permintaan untuk ruangan blok Ethereum, yang ditentukan oleh pasokan yang tersedia.

Akhirnya, kita mungkin ingin membuat kueri harga gas harian rata-rata untuk rantai Ethereum, namun melakukan ini akan menghasilkan waktu kueri yang lama, sehingga kita akan memfilter kueri kita ke jumlah rata-rata gas yang dibayar per transaksi oleh Yayasan Ethereum.

![ef_daily_gas](./ef_daily_gas.png)

Kita dapat melihat harga gas yang dibayarkan dalam transaksi ke alamat Yayasan Ethereum dari tahun ke tahun. Berikut adalah kuerinya:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Ringkasan {#summary}

Dengan tutorial ini, kita memahami konsep dasar Ethereum dan cara blockchain Ethereum bekerja dengan membuat kueri dan memahami data on-chain.

Dasbor yang menyimpan semua kode yang digunakan dalam tutorial ini dapat ditemukan [di sini](https://duneanalytics.com/paulapivat/Learn-Ethereum).

Untuk penggunaan data selengkapnya untuk menjelajah web3 [hubungi saya di Twitter](https://twitter.com/paulapivat).
