---
title: Menggunakan WebSockets
description: Panduan untuk menggunakan WebSocket dan Alchemy untuk membuat permintaan JSON-RPC dan berlangganan ke aksi.
author: "Elan Halpern"
lang: id
tags:
  - "alchemy"
  - "websocket"
  - "membuat kueri"
  - "memulai"
  - "langganan"
  - "javascript"
skill: beginner
source: Dokumen Alchemy
sourceUrl: https://docs.alchemyapi.io/guides/using-websockets
published: 2020-12-01
---

Ini adalah panduan level pemula tentang menggunakan WebSocket dan Alchemy untuk membuat permintaan di blockchain Ethereum.

## WebSocket vs. HTTP {#websockets-vs-http}

Tidak seperti HTTP, dengan WebSocket, Anda tidak perlu secara berulang membuat permintaan saat Anda menginginkan informasi spesifik. WebSocket mempertahankan koneksi jaringan untuk Anda (jika dilakukan dengan benar) dan mendengarkan perubahannya.

Seperti koneksi jaringan mana pun, Anda tidak boleh menganggap bahwa WebSocket akan tetap terbuka selamanya tanpa gangguan, tetapi menangani koneksi dan penyambungan kembali koneksi yang turun dengan benar secara manual bisa sulit untuk dilakukan. Kekurangan lainnya dari WebSocket adalah Anda tidak mendapatkan kode status HTTP dalam tanggapannya, tapi hanya pesan kesalahan.

​[Web3 Alchemy](https://docs.alchemy.com/reference/api-overview) secara otomatis menambah penanganan untuk kegagalan WebSocket dan mencoba kembali tanpa perlu adanya konfigurasi.

## Cobalah {#try-it-out}

Cara termudah untuk menguji WebSocket adalah menginstal peralatan baris perintah untuk membuat permintaan WebSocket, seperti [wscat](https://github.com/websockets/wscat). Dengan wscat, Anda bisa mengirim permintaan seperti berikut ini:

_Catatan: jika Anda memiliki akun Alchemy, Anda bisa menggantikan `demo` dengan kunci API Anda sendiri. [Daftar akun Alchemy secara gratis di sini!](https://auth.alchemyapi.io/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## Cara menggunakan WebSocket {#how-to-use-websockets}

Untuk memulai, buka WebSocket menggunakan URL WebSocket untuk aplikasi Anda. Anda bisa menemukan URL WebSocket aplikasi Anda dengan membuka halaman aplikasi di [dasbor Anda](https://dashboard.alchemyapi.io/) dan mengklik "View Key". Perhatikan bahwa URL aplikasi Anda untuk WebSocket berbeda dari URL untuk permintaan HTTP, tapi keduanya bisa ditemukan dengan mengklik "View Key".

![Tempat menemukan URL WebSocket Anda dalam dasbor Alchemy Anda](./use-websockets.gif)

Setiap API yang terdaftar di [Referensi API Alchemy](https://docs.alchemyapi.io/documentation/alchemy-api-reference/) bisa digunakan melalui WebSocket. Untuk melakukannya, gunakan payload yang sama yang akan dikirimkan sebagai isi permintaan HTTP POST, tapi sebaliknya kirimkan payload itu melalui WebSocket.

## Dengan Web3 {#with-web3}

Beralih ke WebSocket sementara menggunakan pustaka klien seperti Web3 itu mudah. Cukup hanya dengan meneruskan URL WebSocket sebagai ganti HTTP saat membuat instance klien Web3 Anda. Sebagai contoh:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API Langganan {#subscription-api}

Saat terhubung lewat WebSocket, Anda bisa menggunakan dua metode tambahan: `eth_subscribe` dan `eth_unsubscribe`. Metode ini akan memungkinkan Anda mendengar aksi tertentu dan mendapat pemberitahuan dengan segera.

### `eth_subscribe` {#eth-subscribe}

Membuat langganan baru untuk aksi yang ditentukan. [Pelajari selengkapnya tentang `eth_subscribe`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_subscribe).

#### Parameter {#parameters}

1. Jenis langganan
2. Parameter opsional

Argumen pertama menentukan jenis aksi yang didengarkan. Argumen kedua berisi opsi tambahan yang tergantung pada argumen pertama. Jenis deskripsi, opsi, dan payload aksi yang berbeda dideskripsikan di bawah.

#### Mengembalikan {#returns}

ID langganan: ID ini akan dilampirkan pada setiap aksi yang diterima, dan bisa juga digunakan untuk membatalkan langganan menggunakan `eth_unsubscribe`.

#### Aksi langganan {#subscription-events}

Saat langganan aktif, Anda akan menerima aksi yang adalah objek dengan field berikut:

- `jsonrpc`: Selalu "2.0"
- `method`: Selalu "eth_subscription"
- `params`: Objek dengan field berikut:
  - `subscription`: ID langganan yang dikembalikan oleh pemanggilan `eth_subscription` yang membuat langganan ini.
  - `result`: Objek yang isinya bervariasi bergantung pada jenis langganan.

#### Jenis langganan {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Mengembalikan informasi transaksi untuk semua transaksi yang ditambahkan ke state tunggu. Jenis langganan ini berlangganan ke transaksi tunggu, yang sama dengan pemanggilan Web3 standar `web3.eth.subscribe("pendingTransactions")`, tapi bedanya jenis langganan ini memancarkan _informasi transaksi lengkap_ dan bukan hanya hash transaksi.

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

Memancarkan aksi setiap kali header baru ditambahkan ke rantai, termasuk saat reorganisasi rantai.

Saat reorganisasi rantai terjadi, langganan ini akan memancarkan aksi yang berisi semua header baru dari rantai barunya. Secara khusus, ini berarti Anda mungkin melihat beragam header yang dipancarkan dengan tinggi yang sama, dan saat ini terjadi, header berikutnya harus dianggap sebagai yang benar setelah reorganisasi selesai.

Contoh:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "difficulty":  "0x15d9223a23aa",
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "miner":  "0xf8b483dba2c3b7176a3da549ad41a48bb3121069",
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

3. `log`

Memancarkan log yang merupakan bagian dari blok yang baru ditambahkan yang sesuai dengan kriteria penyaringan tertentu.

Saat reorganisasi rantai terjadi, log yang merupakan bagian dari blok di rantai lama akan dipancarkan lagi dengan properti `removed` diatur ke `true`. Selanjutnya, log yang merupakan bagian dari blok di rantai baru dipancarkan, berarti ada kemungkinan melihat log transaksi yang sama berulang kali jika terjadi reorganisasi.

Parameter

1. Objek dengan field berikut:
   - `address` (optional): either a string representing an address or an array of such strings.
     - Hanya log yang dibuat dari salah satu alamat ini akan dipancarkan.
   - `topics`: array dari penentu topik.
     - Setiap penentu topik adalah `null`, string yang mewakili topik, atau array string.
     - Setiap posisi dalam array yang bukan `null` membatasi log yang dipancarkan hanya ke yang memiliki salah satu dari topik tertentu di posisi itu.

Beberapa contoh spesifikasi topik:

- `[]`: Topik mana pun diizinkan.
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

Membatalkan langganan yang ada, sehingga tidak ada aksi berikutnya yang dikirimkan.

Parameter

1. ID langganan, seperti yang dikembalikan sebelumnya dari pemanggilan `eth_subscribe`.

Mengembalikan

`true` jika langganan berhasil dibatalkan, atau `false` jika tidak ada langganan dengan ID tertentu.

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

[Daftar Alchemy](https://auth.alchemyapi.io/signup) secara gratis, lihat [dokumentasi kami](https://docs.alchemyapi.io/), dan untuk berita terkini, ikuti kami di [Twitter](https://twitter.com/AlchemyPlatform).
