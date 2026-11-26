---
title: Mempelajari Topik Dasar Ethereum dengan SQL
description: Tutorial ini membantu pembaca memahami konsep dasar Ethereum termasuk transaksi, blok, dan gas dengan melakukan kueri data onchain menggunakan Structured Query Language (SQL).
author: "Paul Apivat"
tags: ["SQL", "Kueri", "Transaksi", "data-dan-analitik"]
skill: beginner
breadcrumb: Ethereum dengan SQL
lang: id
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://web.archive.org/web/20260516182620/https://paulapivat.com/post/query_ethereum/
---

Banyak tutorial Ethereum menargetkan pengembang, tetapi ada kekurangan sumber daya pendidikan untuk analis data atau bagi orang-orang yang ingin melihat data onchain tanpa menjalankan klien atau node.

Tutorial ini membantu pembaca memahami konsep dasar Ethereum termasuk transaksi, blok, dan gas dengan melakukan kueri data onchain menggunakan structured query language (SQL) melalui antarmuka yang disediakan oleh [Dune](https://dune.com/). Kueri tersebut menggunakan [DuneSQL](https://docs.dune.com/query-engine/overview), dialek SQL dari Dune.

Data onchain dapat membantu kita memahami Ethereum, jaringan, dan sebagai ekonomi untuk daya komputasi serta harus berfungsi sebagai dasar untuk memahami tantangan yang dihadapi Ethereum saat ini (misalnya, kenaikan harga gas) dan, yang lebih penting, diskusi seputar solusi penskalaan.

### Transaksi {#transactions}

Perjalanan pengguna di Ethereum dimulai dengan menginisialisasi akun yang dikendalikan pengguna atau entitas dengan saldo ETH. Ada dua jenis akun - yang dikendalikan pengguna atau kontrak pintar (lihat [ethereum.org](/developers/docs/accounts/)).

Akun apa pun dapat dilihat di penjelajah blok seperti [Etherscan](https://etherscan.io/) atau [Blockscout](https://eth.blockscout.com/). Penjelajah blok adalah portal ke data Ethereum. Mereka menampilkan, secara waktu nyata, data tentang blok, transaksi, validator, akun, dan aktivitas onchain lainnya (lihat [di sini](/developers/docs/data-and-analytics/block-explorers/)).

Namun, pengguna mungkin ingin melakukan kueri data secara langsung untuk merekonsiliasi informasi yang disediakan oleh penjelajah blok eksternal. [Dune](https://dune.com/) menyediakan kemampuan ini kepada siapa saja yang memiliki sedikit pengetahuan tentang SQL.

Sebagai referensi, akun kontrak pintar untuk Yayasan Ethereum (EF) dapat dilihat di [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Satu hal yang perlu diperhatikan adalah bahwa semua akun, termasuk milik EF, memiliki alamat publik yang dapat digunakan untuk mengirim dan menerima transaksi.

Saldo akun di Etherscan terdiri dari transaksi reguler dan transaksi internal. Transaksi internal, terlepas dari namanya, bukanlah transaksi _sebenarnya_ yang mengubah state dari rantai. Mereka adalah transfer nilai yang diinisiasi dengan mengeksekusi sebuah kontrak ([sumber](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Karena transaksi internal tidak memiliki tanda tangan, mereka **tidak** disertakan pada rantai blok sebagai transaksi. Dune mencatatnya secara terpisah, di dalam tabel `ethereum.traces`.

Oleh karena itu, tutorial ini akan berfokus pada transaksi reguler. Ini dapat dikueri seperti berikut:

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
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
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

Perhatikan bahwa alamat ditulis sebagai literal `0x...` tanpa tanda kutip. Di DuneSQL, alamat dan hash adalah nilai biner, bukan string.

Ini akan menghasilkan informasi yang sama seperti yang disediakan di halaman transaksi Etherscan. Sebagai perbandingan, berikut adalah kedua sumber tersebut:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Halaman kontrak EF di Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune {#dune-analytics}

![Screenshot of a Dune query dashboard](./dune_view.png)

Anda dapat menemukan dasbor [di sini](https://dune.com/paulapivat/Learn-Ethereum). Klik pada tabel untuk melihat kueri (lihat juga di atas).

### Menguraikan Transaksi {#breaking-down-transactions}

Transaksi yang dikirimkan mencakup beberapa informasi termasuk ([sumber](/developers/docs/transactions/)):

- **Penerima**: Alamat penerima (dikueri sebagai "to")
- **Tanda tangan**: Meskipun kunci privat pengirim menandatangani sebuah transaksi, apa yang dapat kita kueri dengan SQL adalah alamat publik pengirim ("from").
- **Nilai**: Ini adalah jumlah ETH yang ditransfer (lihat kolom `ether`).
- **Data**: Ini adalah data arbitrer yang telah di-hash (lihat kolom `data`)
- **gasLimit** – jumlah maksimum unit gas yang dapat dikonsumsi oleh transaksi. Unit gas mewakili langkah-langkah komputasi
- **maxPriorityFeePerGas** - jumlah maksimum gas yang akan disertakan sebagai tip untuk validator
- **maxFeePerGas** - jumlah maksimum gas yang bersedia dibayarkan untuk transaksi (termasuk baseFeePerGas dan maxPriorityFeePerGas)

Kita dapat mengkueri informasi spesifik ini untuk transaksi ke alamat publik Yayasan Ethereum:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(CAST(gas_used AS DOUBLE) / gas_limit * 100, 2) AS gas_used_pct
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

`CAST` diperlukan karena membagi satu bilangan bulat dengan bilangan bulat lainnya di DuneSQL memberikan hasil bilangan bulat, yang akan membulatkan hampir setiap persentase ke bawah menjadi nol.

### Blok {#blocks}

Setiap transaksi akan mengubah state dari Mesin Virtual Ethereum ([EVM](/developers/docs/evm/)) ([sumber](/developers/docs/transactions/)). Transaksi disiarkan ke jaringan untuk diverifikasi dan disertakan dalam sebuah blok. Setiap transaksi dikaitkan dengan nomor blok. Untuk melihat datanya, kita dapat mengkueri nomor blok tertentu: 12396854 (blok terbaru di antara transaksi Yayasan Ethereum pada saat penulisan, pada bulan Mei 2021).

Selain itu, ketika kita mengkueri dua blok berikutnya, kita dapat melihat bahwa setiap blok berisi hash dari blok sebelumnya (yaitu, hash induk), yang mengilustrasikan bagaimana rantai blok terbentuk.

Setiap blok berisi referensi ke blok induknya. Hal ini ditunjukkan di bawah ini di antara kolom `hash` dan `parent_hash` ([sumber](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Berikut adalah kuerinya:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum.blocks
WHERE number IN (12396854, 12396855, 12396856)
```

Kita dapat memeriksa sebuah blok dengan mengkueri waktu, nomor blok, hash, hash induk, dan nonce. Blok 12396854 diproduksi sebelum [The Merge](/roadmap/merge/), ketika blok ditambang dengan Bukti Kerja (PoW) dan nonce memiliki arti. Dalam blok Bukti Kepemilikan (PoS), nonce selalu nol.

Satu-satunya hal yang tidak dicakup oleh kueri ini adalah _daftar transaksi_ yang memerlukan kueri terpisah di bawah ini dan _akar state_. Node penuh atau arsip akan menyimpan semua transaksi dan transisi state, yang memungkinkan klien untuk mengkueri state dari rantai kapan saja. Karena ini membutuhkan ruang penyimpanan yang besar, kita dapat memisahkan data rantai dari data state:

- Data rantai (daftar blok, transaksi)
- Data state (hasil dari transisi state setiap transaksi)

Akar state termasuk dalam yang terakhir dan merupakan data _implisit_ (tidak disimpan onchain), sedangkan data rantai bersifat eksplisit dan disimpan di rantai itu sendiri ([sumber](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Untuk tutorial ini, kita akan berfokus pada data onchain yang _dapat_ dikueri dengan SQL melalui Dune.

Seperti yang dinyatakan di atas, setiap blok berisi daftar transaksi, kita dapat mengkuerinya dengan memfilter blok tertentu. Kita akan mencoba blok 12396854:

```sql
SELECT * FROM ethereum.transactions
WHERE block_number = 12396854
```

Berikut adalah keluaran SQL di Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Blok tunggal ini yang ditambahkan ke rantai mengubah state dari Mesin Virtual Ethereum ([EVM](/developers/docs/evm/)). Terkadang puluhan, ratusan transaksi diverifikasi sekaligus. Dalam kasus khusus ini, 222 transaksi disertakan.

Untuk melihat berapa banyak yang benar-benar berhasil, kita akan menambahkan filter lain untuk menghitung transaksi yang berhasil:

```sql
SELECT
    COUNT(*) AS num_successful_txn
FROM ethereum.transactions
WHERE block_number = 12396854 AND success = true
```

Untuk blok 12396854, dari total 222 transaksi, 204 berhasil diverifikasi:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Permintaan transaksi terjadi puluhan kali per detik, tetapi blok hanya ditambahkan secara berkala ([sumber](/developers/docs/blocks/)). Di bawah Bukti Kerja (PoW), sebuah blok ditambang rata-rata setiap 13 hingga 15 detik, dengan banyak variasi. Sejak [The Merge](/roadmap/merge/) pada bulan September 2022, Bukti Kepemilikan (PoS) membagi waktu menjadi slot 12 detik, dan setiap slot dapat memiliki paling banyak satu blok.

Jadi saat ini paling banyak bisa ada 86400 / 12 = 7200 blok per hari. Dalam praktiknya jumlahnya sedikit lebih sedikit, karena validator terkadang melewatkan slotnya.

Grafik untuk blok Ethereum yang diproduksi per hari (2016 - 2021) adalah:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Jumlah rata-rata blok yang diproduksi setiap hari selama periode waktu ini adalah ~5.874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Kuerinya adalah:

Berikut adalah kueri untuk memvisualisasikan jumlah blok yang diproduksi setiap hari. Klausul `WHERE` mengecualikan hari ini, yang belum selesai.

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Dan kueri ini menghitung jumlah rata-rata blok yang diproduksi per hari, sebelum dan sesudah The Merge. Blok 15537394 adalah blok Bukti Kepemilikan (PoS) pertama.

```sql
WITH daily AS (
    SELECT
        DATE_TRUNC('day', time) AS dt,
        MIN(number) >= 15537394 AS after_merge,
        COUNT(*) AS block_count
    FROM ethereum.blocks
    WHERE time < DATE_TRUNC('day', NOW())
    GROUP BY 1
)
SELECT
    after_merge,
    AVG(block_count) AS avg_block_count,
    86400 / AVG(block_count) AS avg_seconds_per_block
FROM daily
GROUP BY 1
```

Ketika tutorial ini pertama kali ditulis pada bulan Mei 2021, rata-ratanya adalah 5.874 blok per hari, atau satu blok setiap 14,7 detik. Setelah The Merge, rata-ratanya berada tepat di bawah maksimum 7200, sekitar satu blok setiap 12 detik.

### Gas {#gas}

Blok dibatasi ukurannya. Setiap blok memiliki batas gas, dan sejak [EIP-1559](/developers/docs/gas/#base-fee) setiap blok juga memiliki target gas, yang merupakan setengah dari batas tersebut. Ketika blok menggunakan lebih banyak gas daripada target, biaya dasar naik, dan ketika mereka menggunakan lebih sedikit, biaya dasar turun. Batas gas itu sendiri disesuaikan oleh validator, dan telah dinaikkan beberapa kali selama bertahun-tahun. Batasan diperlukan untuk mencegah ukuran blok yang terlalu besar secara sewenang-wenang yang membebani node penuh dalam hal ruang disk dan persyaratan kecepatan ([sumber](/developers/docs/blocks/)).

Salah satu cara untuk mengonseptualisasikan batas gas blok adalah dengan menganggapnya sebagai **pasokan** ruang blok yang tersedia untuk mengelompokkan transaksi. Batas gas blok dapat dikueri dan divisualisasikan dari tahun 2016 hingga saat ini:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Kemudian ada gas aktual yang digunakan setiap hari untuk membayar komputasi yang dilakukan di rantai Ethereum (misalnya, mengirim transaksi, memanggil kontrak pintar, pencetakan NFT). Ini adalah **permintaan** untuk ruang blok Ethereum yang tersedia:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Kita juga dapat menyandingkan kedua grafik ini bersama-sama untuk melihat bagaimana **permintaan dan pasokan** sejajar:

![gas_demand_supply](./gas_demand_supply.png)

Oleh karena itu kita dapat memahami harga gas sebagai fungsi dari permintaan untuk ruang blok Ethereum, mengingat pasokan yang tersedia.

Terakhir, kita mungkin ingin mengkueri harga gas harian rata-rata untuk rantai Ethereum, namun, melakukan hal itu akan menghasilkan waktu kueri yang sangat lama, jadi kita akan memfilter kueri kita ke jumlah rata-rata gas yang dibayarkan per transaksi oleh Yayasan Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Kita dapat melihat harga gas yang dibayarkan untuk semua transaksi yang dilakukan ke alamat Yayasan Ethereum selama bertahun-tahun. Berikut adalah kuerinya:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

### Ringkasan {#summary}

Dengan tutorial ini, kita memahami konsep dasar Ethereum dan bagaimana rantai blok Ethereum bekerja dengan mengkueri dan merasakan data onchain.

Dasbor yang menyimpan semua kode yang digunakan dalam tutorial ini dapat ditemukan [di sini](https://dune.com/paulapivat/Learn-Ethereum).

Untuk penggunaan data lebih lanjut dalam menjelajahi Web3 [temukan saya di Twitter](https://twitter.com/paulapivat).
