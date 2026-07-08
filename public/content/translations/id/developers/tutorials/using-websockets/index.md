---
title: Menggunakan WebSockets
description: Panduan menggunakan WebSockets dan Alchemy untuk membuat permintaan JSON-RPC dan berlangganan peristiwa.
author: "Elan Halpern"
lang: id
tags: ["Alchemy", "websockets", "kueri", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Ini adalah panduan tingkat pemula untuk menggunakan WebSockets dan Alchemy guna membuat permintaan ke rantai blok Ethereum.

## WebSockets vs. HTTP {#websockets-vs-http}

Berbeda dengan HTTP, dengan WebSockets, Anda tidak perlu terus-menerus membuat permintaan saat menginginkan informasi tertentu. WebSockets mempertahankan koneksi jaringan untuk Anda (jika dilakukan dengan benar) dan mendengarkan perubahan.

Seperti halnya koneksi jaringan apa pun, Anda tidak boleh berasumsi bahwa WebSocket akan tetap terbuka selamanya tanpa gangguan, tetapi menangani koneksi yang terputus dan penyambungan kembali secara manual dengan benar bisa menjadi tantangan tersendiri. Kelemahan lain dari WebSockets adalah Anda tidak mendapatkan kode status HTTP dalam respons, melainkan hanya pesan kesalahan.

​[Web3 Alchemy](https://docs.alchemy.com/reference/api-overview) secara otomatis menambahkan penanganan untuk kegagalan dan percobaan ulang WebSocket tanpa memerlukan konfigurasi.

## Coba sekarang {#try-it-out}

Cara termudah untuk menguji WebSockets adalah dengan menginstal alat baris perintah untuk membuat permintaan WebSocket seperti [wscat](https://github.com/websockets/wscat). Menggunakan wscat, Anda dapat mengirim permintaan sebagai berikut:

_Catatan: jika Anda memiliki akun Alchemy, Anda dapat mengganti `demo` dengan kunci API Anda sendiri. [Daftar untuk mendapatkan akun Alchemy gratis di sini!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## Cara menggunakan WebSockets {#how-to-use-websockets}

Untuk memulai, buka WebSocket menggunakan URL WebSocket untuk aplikasi Anda. Anda dapat menemukan URL WebSocket aplikasi Anda dengan membuka halaman aplikasi di [dasbor Anda](https://dashboard.alchemy.com/) dan mengeklik "View Key". Perhatikan bahwa URL aplikasi Anda untuk WebSockets berbeda dari URL-nya untuk permintaan HTTP, tetapi keduanya dapat ditemukan dengan mengeklik "View Key".

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

Semua API yang tercantum dalam [Referensi API Alchemy](https://www.alchemy.com/docs/reference/api-overview) dapat digunakan melalui WebSocket. Untuk melakukannya, gunakan muatan (payload) yang sama yang akan dikirim sebagai badan permintaan HTTP POST, tetapi kirimkan muatan tersebut melalui WebSocket.

## Dengan Web3 {#with-web3}

Beralih ke WebSockets saat menggunakan Pustaka klien seperti Web3 sangatlah mudah. Cukup berikan URL WebSocket alih-alih URL HTTP saat menginisiasi klien Web3 Anda. Sebagai contoh:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API Langganan {#subscription-api}

Saat terhubung melalui WebSocket, Anda dapat menggunakan dua metode tambahan: `eth_subscribe` dan `eth_unsubscribe`. Metode ini akan memungkinkan Anda untuk mendengarkan peristiwa tertentu dan segera diberi tahu.

### `eth_subscribe` {#eth-subscribe}

Membuat langganan baru untuk peristiwa yang ditentukan. [Pelajari lebih lanjut tentang `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### Parameter {#parameters}

1. Jenis langganan
2. Parameter opsional

Argumen pertama menentukan jenis peristiwa yang akan didengarkan. Argumen kedua berisi opsi tambahan yang bergantung pada argumen pertama. Berbagai jenis deskripsi, opsinya, dan muatan peristiwanya dijelaskan di bawah ini.

#### Nilai Kembalian {#returns}

ID langganan: ID ini akan dilampirkan pada setiap peristiwa yang diterima, dan juga dapat digunakan untuk membatalkan langganan menggunakan `eth_unsubscribe`.

#### Peristiwa langganan {#subscription-events}

Selama langganan aktif, Anda akan menerima peristiwa berupa objek dengan bidang-bidang berikut:

- `jsonrpc`: Selalu "2.0"
- `method`: Selalu "eth_subscription"
- `params`: Sebuah objek dengan bidang-bidang berikut:
  - `subscription`: ID langganan yang dikembalikan oleh panggilan `eth_subscribe` yang membuat langganan ini.
  - `result`: Sebuah objek yang isinya bervariasi tergantung pada jenis langganan.

#### Jenis langganan {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Mengembalikan informasi transaksi untuk semua transaksi yang ditambahkan ke state tertunda. Jenis langganan ini berlangganan transaksi yang tertunda, mirip dengan panggilan Web3 standar `web3.eth.subscribe("pendingTransactions")`, tetapi berbeda karena ia memancarkan _informasi transaksi lengkap_ alih-alih hanya hash transaksi.

Contoh:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["alchemy_newFullPendingTransactions"]}

<  {"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}
<  {
      "jsonrpc":"2.0",
      "method":"eth_subscription",
      "params":{
          "result":{
          "blockHash":null,
          "blockNumber":null,
          "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
          "gas":"0x1adb0",
          "gasPrice":"0x7735c4d40",
          "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
          "nonce":"0x0",
          "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
          "transactionIndex":null,
          "value":"0x0",
          "v":"0x26",
          "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
          "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
          "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
      }
  }

```

2. `newHeads`

Memancarkan peristiwa setiap kali header baru ditambahkan ke rantai, termasuk selama reorganisasi rantai.

Ketika reorganisasi rantai terjadi, langganan ini akan memancarkan peristiwa yang berisi semua header baru untuk rantai baru tersebut. Secara khusus, ini berarti Anda mungkin melihat beberapa header dipancarkan dengan ketinggian yang sama, dan ketika ini terjadi, header yang lebih baru harus dianggap sebagai yang benar setelah reorganisasi.

Contoh:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "nonce":  "0x084149998194cc5f",
          "number":  "0x1348c9",
          "parentHash":  "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
          "receiptRoot":  "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
          "sha3Uncles":  "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "stateRoot":  "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
          "timestamp":  "0x56ffeff8",
          "transactionsRoot":  "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
      },
  "subscription":  "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}

```

3. `logs`

Memancarkan log yang merupakan bagian dari blok yang baru ditambahkan yang cocok dengan kriteria filter yang ditentukan.

Ketika reorganisasi rantai terjadi, log yang merupakan bagian dari blok pada rantai lama akan dipancarkan lagi dengan properti `removed` diatur ke `true`. Selanjutnya, log yang merupakan bagian dari blok pada rantai baru akan dipancarkan, yang berarti ada kemungkinan untuk melihat log untuk transaksi yang sama beberapa kali jika terjadi reorganisasi.

Parameter

1. Sebuah objek dengan bidang-bidang berikut:
   - `address` (opsional): baik berupa string yang mewakili alamat atau array dari string tersebut.
     - Hanya log yang dibuat dari salah satu alamat ini yang akan dipancarkan.
   - `topics`: sebuah array penentu topik.
     - Setiap penentu topik dapat berupa `null`, string yang mewakili topik, atau array string.
     - Setiap posisi dalam array yang bukan `null` membatasi log yang dipancarkan hanya pada log yang memiliki salah satu topik yang diberikan di posisi tersebut.

Beberapa contoh spesifikasi topik:

- `[]`: Topik apa pun diizinkan.
- `[A]`: A di posisi pertama (dan apa pun setelahnya).
- `[null, B]`: Apa pun di posisi pertama dan B di posisi kedua (dan apa pun setelahnya).
- `[A, B]`: A di posisi pertama dan B di posisi kedua (dan apa pun setelahnya).
- `[[A, B], [A, B]]`: (A atau B) di posisi pertama dan (A atau B) di posisi kedua (dan apa pun setelahnya).

Contoh:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "subscription":  "0x4a8a4c0517381924f9838102c5a4dcb7",
      "result":  {
          "address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
          "blockHash":  "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
          "blockNumber":  "0x29e87",
          "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
          "logIndex":"0x0",
          "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
          "transactionHash":  "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
          "transactionIndex":  "0x0"
      }
  }
}

```

### `eth_unsubscribe` {#eth-unsubscribe}

Membatalkan langganan yang ada sehingga tidak ada lagi peristiwa yang dikirim.

Parameter

1. ID Langganan, seperti yang sebelumnya dikembalikan dari panggilan `eth_subscribe`.

Nilai Kembalian

`true` jika langganan berhasil dibatalkan, atau `false` jika tidak ada langganan dengan ID yang diberikan.

Contoh:

**Permintaan**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```

**Hasil**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[Daftar dengan Alchemy](https://auth.alchemy.com) secara gratis, periksa [dokumentasi kami](https://www.alchemy.com/docs/), dan untuk berita terbaru, ikuti kami di [Twitter](https://x.com/AlchemyPlatform).