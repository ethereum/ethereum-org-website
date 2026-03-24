---
title: Pelajari Topik Dasar Ethereum dengan SQL
description: Tutorial ini membantu pembaca memahami konsep dasar Ethereum termasuk transaksi, blok, dan gas dengan melakukan kueri data onchain menggunakan Structured Query Language (SQL).
author: "Paul Apivat"
tags: ["SQL", "Kueri", "Transaksi", "data-dan-analitik"]
skill: beginner
breadcrumb: "Ethereum dengan SQL"
lang: id
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Banyak tutorial Ethereum menargetkan pengembang, tetapi ada kekurangan sumber daya pendidikan untuk analis data atau untuk orang-orang yang ingin melihat data onchain tanpa menjalankan klien atau node.

Tutorial ini membantu pembaca memahami konsep dasar Ethereum termasuk transaksi, blok, dan gas dengan melakukan kueri data onchain menggunakan structured query language (SQL) melalui antarmuka yang disediakan oleh [Dune Analytics](https://dune.com/).

Data onchain dapat membantu kita memahami Ethereum, jaringan, dan sebagai ekonomi untuk daya komputasi serta harus berfungsi sebagai dasar untuk memahami tantangan yang dihadapi Ethereum saat ini (misalnya, kenaikan harga gas) dan, yang lebih penting, diskusi seputar solusi peningkatan.

### Transaksi {#transactions}

Perjalanan pengguna di Ethereum dimulai dengan menginisialisasi akun yang dikendalikan pengguna atau entitas dengan saldo ETH. Ada dua jenis akun - yang dikendalikan pengguna atau kontrak pintar (lihat [ethereum.org](/developers/docs/accounts/)).

Setiap akun dapat dilihat di penjelajah blok seperti [Etherscan](https://etherscan.io/) atau [Blockscout](https://eth.blockscout.com/). Penjelajah blok adalah portal ke data Ethereum. Mereka menampilkan, secara real-time, data tentang blok, transaksi, penambang, akun, dan aktivitas onchain lainnya (lihat [di sini](/developers/docs/data-and-analytics/block-explorers/)).

Namun, pengguna mungkin ingin melakukan kueri data secara langsung untuk merekonsiliasi informasi yang disediakan oleh penjelajah blok eksternal. [Dune Analytics](https://dune.com/) menyediakan kemampuan ini kepada siapa saja yang memiliki sedikit pengetahuan tentang SQL.

Sebagai referensi, akun kontrak pintar untuk Ethereum Foundation (EF) dapat dilihat di [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Satu hal yang perlu diperhatikan adalah bahwa semua akun, termasuk milik EF, memiliki alamat publik yang dapat digunakan untuk mengirim dan menerima transaksi.

Saldo akun di Etherscan terdiri dari transaksi reguler dan transaksi internal. Transaksi internal, terlepas dari namanya, bukanlah transaksi _sebenarnya_ yang mengubah status rantai. Mereka adalah transfer nilai yang diinisiasi dengan mengeksekusi kontrak ([sumber](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Karena transaksi internal tidak memiliki tanda tangan, mereka **tidak** disertakan di blockchain dan tidak dapat dikueri dengan Dune Analytics.

Oleh karena itu, tutorial ini akan berfokus pada transaksi reguler. Ini dapat dikueri seperti ini:

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

Ini akan menghasilkan informasi yang sama seperti yang disediakan di halaman transaksi Etherscan. Sebagai perbandingan, berikut adalah kedua sumber tersebut:

#### Etherscan {#etherscan}

![Tangkapan layar dari tampilan penjelajah transaksi Etherscan](./etherscan_view.png)

[Halaman kontrak EF di Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Tangkapan layar dari dasbor kueri Dune Analytics](./dune_view.png)

Anda dapat menemukan dasbor [di sini](https://dune.com/paulapivat/Learn-Ethereum). Klik pada tabel untuk melihat kueri (lihat juga di atas).

### Menguraikan Transaksi {#breaking_down_transactions}

Transaksi yang dikirimkan mencakup beberapa informasi termasuk ([sumber](/developers/docs/transactions/)):

- **Penerima**: Alamat penerima (dikueri sebagai "to")
- **Tanda Tangan**: Meskipun kunci pribadi pengirim menandatangani transaksi, apa yang dapat kita kueri dengan SQL adalah alamat publik pengirim ("from").
- **Nilai**: Ini adalah jumlah ETH yang ditransfer (lihat kolom `ether`).
- **Data**: Ini adalah data arbitrer yang telah di-hash (lihat kolom `data`)
- **gasLimit** – jumlah maksimum unit gas yang dapat dikonsumsi oleh transaksi. Unit gas mewakili langkah-langkah komputasi
- **maxPriorityFeePerGas** - jumlah maksimum gas yang akan disertakan sebagai tip kepada penambang
- **maxFeePerGas** - jumlah maksimum gas yang bersedia dibayarkan untuk transaksi (termasuk baseFeePerGas dan maxPriorityFeePerGas)

Kita dapat mengkueri informasi spesifik ini untuk transaksi ke alamat publik Ethereum Foundation:

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

Setiap transaksi akan mengubah status Mesin Virtual Ethereum ([EVM](/developers/docs/evm/)) ([sumber](/developers/docs/transactions/)). Transaksi disiarkan ke jaringan untuk diverifikasi dan disertakan dalam sebuah blok. Setiap transaksi dikaitkan dengan nomor blok. Untuk melihat datanya, kita dapat mengkueri nomor blok tertentu: 12396854 (blok terbaru di antara transaksi Ethereum Foundation pada saat penulisan ini, 11/5/21).

Selain itu, ketika kita mengkueri dua blok berikutnya, kita dapat melihat bahwa setiap blok berisi hash dari blok sebelumnya (yaitu, hash induk), yang mengilustrasikan bagaimana blockchain terbentuk.

Setiap blok berisi referensi ke blok induknya. Ini ditunjukkan di bawah ini antara kolom `hash` dan `parent_hash` ([sumber](/developers/docs/blocks/)):

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

Kita dapat memeriksa sebuah blok dengan mengkueri waktu, nomor blok, kesulitan, hash, hash induk, dan nonce.

Satu-satunya hal yang tidak dicakup oleh kueri ini adalah _daftar transaksi_ yang memerlukan kueri terpisah di bawah ini dan _akar status_ (state root). Node penuh atau arsip akan menyimpan semua transaksi dan transisi status, memungkinkan klien untuk mengkueri status rantai kapan saja. Karena ini membutuhkan ruang penyimpanan yang besar, kita dapat memisahkan data rantai dari data status:

- Data rantai (daftar blok, transaksi)
- Data status (hasil dari transisi status setiap transaksi)

Akar status termasuk dalam yang terakhir dan merupakan data _implisit_ (tidak disimpan onchain), sedangkan data rantai bersifat eksplisit dan disimpan di rantai itu sendiri ([sumber](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Untuk tutorial ini, kita akan berfokus pada data onchain yang _dapat_ dikueri dengan SQL melalui Dune Analytics.

Seperti yang dinyatakan di atas, setiap blok berisi daftar transaksi, kita dapat mengkuerinya dengan memfilter blok tertentu. Kita akan mencoba blok terbaru, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Berikut adalah keluaran SQL di Dune:

![Tangkapan layar dari daftar transaksi Ethereum](./list_of_txn.png)

Satu blok ini yang ditambahkan ke rantai mengubah status Mesin Virtual Ethereum ([EVM](/developers/docs/evm/)). Puluhan, terkadang ratusan transaksi diverifikasi sekaligus. Dalam kasus khusus ini, 222 transaksi disertakan.

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

![Tangkapan layar dari transaksi Ethereum yang berhasil](./successful_txn.png)

Permintaan transaksi terjadi puluhan kali per detik, tetapi blok dikomit kira-kira setiap 15 detik sekali ([sumber](/developers/docs/blocks/)).

Untuk melihat bahwa ada satu blok yang diproduksi kira-kira setiap 15 detik, kita dapat mengambil jumlah detik dalam sehari (86400) dibagi 15 untuk mendapatkan perkiraan jumlah rata-rata blok per hari (~ 5760).

Grafik untuk blok Ethereum yang diproduksi per hari (2016 - sekarang) adalah:

![Grafik yang menunjukkan produksi blok Ethereum harian](./daily_blocks.png)

Jumlah rata-rata blok yang diproduksi setiap hari selama periode waktu ini adalah ~5.874:

![Grafik yang menunjukkan produksi blok Ethereum harian](./avg_daily_blocks.png)

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

Jumlah rata-rata blok yang diproduksi per hari sejak 2016 sedikit di atas angka tersebut yaitu 5.874. Sebagai alternatif, membagi 86400 detik dengan rata-rata 5874 blok menghasilkan 14,7 detik atau kira-kira satu blok setiap 15 detik.

### Gas {#gas}

Blok dibatasi ukurannya. Ukuran blok maksimum bersifat dinamis dan bervariasi sesuai dengan permintaan jaringan antara 12.500.000 dan 25.000.000 unit. Batasan diperlukan untuk mencegah ukuran blok yang terlalu besar membebani node penuh dalam hal ruang disk dan persyaratan kecepatan ([sumber](/developers/docs/blocks/)).

Salah satu cara untuk mengonseptualisasikan batas gas blok adalah dengan menganggapnya sebagai **pasokan** ruang blok yang tersedia untuk mengelompokkan transaksi. Batas gas blok dapat dikueri dan divisualisasikan dari tahun 2016 hingga saat ini:

![Grafik yang menunjukkan rata-rata batas gas Ethereum dari waktu ke waktu](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Kemudian ada gas aktual yang digunakan setiap hari untuk membayar komputasi yang dilakukan di rantai Ethereum (misalnya, mengirim transaksi, memanggil kontrak pintar, melakukan mint NFT). Ini adalah **permintaan** untuk ruang blok Ethereum yang tersedia:

![Grafik yang menunjukkan gas Ethereum harian yang digunakan](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Kita juga dapat menyandingkan kedua grafik ini bersama-sama untuk melihat bagaimana **permintaan dan pasokan** sejajar:

![gas_demand_supply](./gas_demand_supply.png)

Oleh karena itu kita dapat memahami harga gas sebagai fungsi dari permintaan untuk ruang blok Ethereum, mengingat pasokan yang tersedia.

Terakhir, kita mungkin ingin mengkueri rata-rata harga gas harian untuk rantai Ethereum, namun, melakukan hal itu akan menghasilkan waktu kueri yang sangat lama, jadi kita akan memfilter kueri kita ke jumlah rata-rata gas yang dibayarkan per transaksi oleh Ethereum Foundation.

![Grafik yang menunjukkan penggunaan gas harian Ethereum Foundation](./ef_daily_gas.png)

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

### Ringkasan {#summary}

Dengan tutorial ini, kita memahami konsep dasar Ethereum dan bagaimana blockchain Ethereum bekerja dengan mengkueri dan merasakan data onchain.

Dasbor yang menyimpan semua kode yang digunakan dalam tutorial ini dapat ditemukan [di sini](https://dune.com/paulapivat/Learn-Ethereum).

Untuk penggunaan data lebih lanjut dalam menjelajahi web3 [temukan saya di Twitter](https://twitter.com/paulapivat).