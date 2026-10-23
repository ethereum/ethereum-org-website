---
title: Menggunakan WebSockets
description: Panduan menggunakan WebSockets untuk membuat permintaan JSON-RPC dan berlangganan kejadian, dengan penyedia node Ethereum mana pun.
author: "Elan Halpern"
lang: id
tags: ["Alchemy", "websockets", "kueri", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Ini adalah panduan tingkat pemula untuk menggunakan WebSockets guna membuat permintaan ke rantai blok Ethereum. Contoh-contoh ini menggunakan metode JSON-RPC standar, sehingga berfungsi dengan node atau penyedia node mana pun yang menawarkan titik akhir WebSocket, termasuk Alchemy.

## WebSockets vs HTTP {#websockets-vs-http}

Berbeda dengan HTTP, dengan WebSockets, Anda tidak perlu terus-menerus membuat permintaan saat menginginkan informasi tertentu. WebSockets mempertahankan koneksi jaringan untuk Anda (jika dilakukan dengan benar) dan mendengarkan perubahan.

Seperti halnya koneksi jaringan apa pun, Anda tidak boleh berasumsi bahwa WebSocket akan tetap terbuka selamanya tanpa gangguan, tetapi menangani koneksi yang terputus dan penyambungan kembali secara manual dengan benar bisa menjadi tantangan tersendiri. Kekurangan lain dari WebSockets adalah Anda tidak mendapatkan kode status HTTP dalam respons, melainkan hanya pesan kesalahan.

Pustaka klien dapat menangani hal ini untuk Anda. Misalnya, [transportasi WebSocket Viem](https://viem.sh/docs/clients/transports/websocket) menyambung kembali saat kegagalan soket dan mengirimkan ping keep-alive secara default.

## Cobalah {#try-it-out}

Anda memerlukan URL WebSocket untuk node Ethereum. Penyedia node akan memberikannya saat Anda membuat kunci Antarmuka Pemrograman Aplikasi (API), biasanya dalam bentuk `wss://<provider-host>/<your-api-key>`. Misalnya, URL Mainnet Ethereum Alchemy terlihat seperti `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([daftar untuk mendapatkan akun Alchemy gratis](https://auth.alchemy.com/signup)). Lihat [node sebagai layanan](/developers/docs/nodes-and-clients/nodes-as-a-service/) untuk penyedia lain, atau gunakan titik akhir WebSocket dari [node Anda sendiri](/developers/docs/nodes-and-clients/run-a-node/). Titik akhir publik seperti `wss://ethereum-rpc.publicnode.com` juga berfungsi untuk eksperimen cepat, tetapi dibatasi kecepatannya dan mungkin tidak mendukung setiap jenis langganan.

Cara termudah untuk menguji WebSockets adalah dengan menginstal alat baris perintah untuk membuat permintaan WebSocket seperti [wscat](https://github.com/websockets/wscat). Menggunakan wscat, Anda dapat mengirim permintaan sebagai berikut:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Baris yang dimulai dengan `>` adalah apa yang Anda ketik, dan baris yang dimulai dengan `<` adalah apa yang dikirim kembali oleh node.

## Cara menggunakan WebSockets {#how-to-use-websockets}

Untuk memulai, buka WebSocket menggunakan URL WebSocket penyedia Anda. Dengan Alchemy, Anda dapat menemukannya dengan membuka aplikasi Anda di [dasbor](https://dashboard.alchemy.com/) dan melihat kunci API-nya. Perhatikan bahwa URL untuk WebSockets (`wss://`) berbeda dari URL untuk permintaan HTTP (`https://`), meskipun sebagian besar penyedia menggunakan kunci API yang sama untuk keduanya.

![Di mana menemukan URL WebSocket Anda di dasbor Alchemy Anda](./use-websockets.mp4#602x280)

Metode [JSON-RPC](/developers/docs/apis/json-rpc/) apa pun yang didukung penyedia Anda dapat digunakan melalui WebSocket. Untuk melakukannya, gunakan muatan yang sama yang akan dikirim sebagai isi permintaan HTTP POST, tetapi kirimkan muatan tersebut melalui WebSocket.

## Dengan Web3 {#with-web3}

Beralih ke WebSockets saat menggunakan Pustaka klien seperti [Viem](https://viem.sh/) sangatlah mudah. Gunakan transportasi `webSocket` dengan URL WebSocket Anda alih-alih transportasi `http`. Misalnya, setelah `npm install viem`, simpan ini sebagai `index.mjs` dan jalankan `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Berlangganan blok baru melalui WebSocket yang sama
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## API Langganan {#subscription-api}

Saat terhubung melalui WebSocket, Anda dapat menggunakan dua metode tambahan: `eth_subscribe` dan `eth_unsubscribe`. Metode ini akan memungkinkan Anda untuk mendengarkan peristiwa tertentu dan segera diberi tahu.

### `eth_subscribe` {#eth-subscribe}

Membuat langganan baru untuk peristiwa yang ditentukan. [Pelajari lebih lanjut tentang `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

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

1. `newHeads`

Memancarkan kejadian setiap kali header baru ditambahkan ke rantai, termasuk selama reorganisasi rantai (reorg).

Ketika reorg terjadi, langganan ini akan memancarkan kejadian yang berisi semua header baru untuk rantai baru. Secara khusus, ini berarti Anda mungkin melihat beberapa header dipancarkan dengan ketinggian yang sama, dan ketika ini terjadi, header yang lebih baru harus dianggap sebagai yang benar setelah reorg.

Contoh:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

Memancarkan log yang merupakan bagian dari blok yang baru ditambahkan yang cocok dengan kriteria filter yang ditentukan.

Ketika reorg terjadi, log yang merupakan bagian dari blok pada rantai lama akan dipancarkan lagi dengan properti `removed` diatur ke `true`. Selanjutnya, log yang merupakan bagian dari blok pada rantai baru dipancarkan, yang berarti dimungkinkan untuk melihat log untuk transaksi yang sama beberapa kali dalam kasus reorg.

Parameter

1. Sebuah objek dengan bidang-bidang berikut:
   - `address` (opsional): baik string yang mewakili alamat atau array dari string tersebut.
     - Hanya log yang dibuat dari salah satu alamat ini yang akan dipancarkan.
   - `topics`: array penentu topik.
     - Setiap penentu topik adalah `null`, string yang mewakili topik, atau array string.
     - Setiap posisi dalam array yang bukan `null` membatasi log yang dipancarkan hanya pada mereka yang memiliki salah satu topik yang diberikan di posisi tersebut.

Beberapa contoh spesifikasi topik:

- `[]`: Topik apa pun diizinkan.
- `[A]`: A di posisi pertama (dan apa pun setelahnya).
- `[null, B]`: Apa pun di posisi pertama dan B di posisi kedua (dan apa pun setelahnya).
- `[A, B]`: A di posisi pertama dan B di posisi kedua (dan apa pun setelahnya).
- `[[A, B], [A, B]]`: (A atau B) di posisi pertama dan (A atau B) di posisi kedua (dan apa pun setelahnya).

Contoh:

Contoh ini mendengarkan kejadian `Deposit` dari [kontrak WETH](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) di Mainnet Ethereum:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

Memancarkan hash dari setiap transaksi yang ditambahkan ke state tertunda node (mempool-nya).

Contoh:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Beberapa penyedia juga menawarkan jenis langganan mereka sendiri. Misalnya, [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) milik Alchemy memancarkan _objek transaksi penuh_ alih-alih hanya hash, dan menerima filter opsional `fromAddress`, `toAddress`, dan `hashesOnly`. Ini bukan bagian dari API JSON-RPC standar, sehingga hanya berfungsi dengan penyedia tersebut.

### `eth_unsubscribe` {#eth-unsubscribe}

Membatalkan langganan yang ada sehingga tidak ada kejadian lebih lanjut yang dikirim.

Parameter

1. ID Langganan, seperti yang dikembalikan sebelumnya dari panggilan `eth_subscribe`.

Nilai Kembalian

`true` jika langganan berhasil dibatalkan, atau `false` jika tidak ada langganan dengan ID yang diberikan.

Langganan hanya ada pada koneksi WebSocket yang membuatnya, jadi `eth_unsubscribe` harus dikirim melalui koneksi yang sama. Ini tidak dapat dikirim sebagai permintaan HTTP terpisah. Menutup koneksi juga membatalkan semua langganannya.

Contoh:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Daftar dengan Alchemy](https://auth.alchemy.com) secara gratis, periksa [dokumentasi Alchemy](https://www.alchemy.com/docs/), dan untuk berita terbaru, ikuti Alchemy di [Twitter](https://x.com/Alchemy).
