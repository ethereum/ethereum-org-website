---
title: API JSON-RPC
description: Protokol pemanggilan prosedur jarak jauh (RPC) tanpa state dan berbobot ringan untuk klien Ethereum.
lang: id
---

Agar sebuah aplikasi perangkat lunak dapat berinteraksi dengan blockchain Ethereum — baik untuk membaca data blockchain maupun mengirim transaksi ke jaringan - aplikasi tersebut harus terhubung ke sebuah node Ethereum.

Untuk tujuan ini, setiap [klien Ethereum](/developers/docs/nodes-and-clients/#execution-clients) menerapkan [spesifikasi JSON-RPC](https://github.com/ethereum/execution-apis), sehingga terdapat serangkaian metode yang seragam yang dapat diandalkan oleh aplikasi, terlepas dari implementasi simpul atau klien yang spesifik.

[JSON-RPC](https://www.jsonrpc.org/specification) adalah protokol panggilan prosedur jarak jauh (RPC) yang ringan dan tanpa status (stateless). Ini mendefinisikan beberapa struktur data dan aturan seputar pemrosesannya. Ini adalah transportasi agnostik karena konsepnya dapat digunakan dalam proses yang sama, melalui soket, melalui HTTP, atau dalam beragam lingkungan penyaluran pesan. Menggunakan JSON (RFC 4627) sebagai format data.

## Implementasi klien {#client-implementations}

Tiap klien Ethereum dapat menggunakan bahasa pemrograman berbeda ketika mengimplementasikan spesifikasi JSON-RPC. Lihat [dokumentasi klien](/developers/docs/nodes-and-clients/#execution-clients) individual untuk detail lebih lanjut terkait dengan bahasa pemrograman tertentu. Kami menyarankan melihat dokumentasi dari setiap klien untuk mendapatkan informasi dukungan API yang terbaru.

## Pustaka praktis {#convenience-libraries}

Meskipun Anda dapat memilih untuk berinteraksi secara langsung dengan klien Ethereum melalui API JSON-RPC, sering kali ada opsi yang lebih mudah bagi para pengembang dapp. Banyak pustaka [JavaScript](/developers/docs/apis/javascript/#available-libraries) dan [API backend](/developers/docs/apis/backend/#available-libraries) yang ada untuk menyediakan pembungkus (wrapper) di atas API JSON-RPC. Dengan menggunakan pustaka ini, pengembang dapat menulis metode satu baris yang intuitif dalam bahasa pemrograman pilihan mereka untuk memulai permintaan JSON-RPC (yang mendasari) yang berinteraksi dengan Ethereum.

## API klien konsensus {#consensus-clients}

Halaman ini terutama membahas API JSON-RPC yang digunakan oleh klien eksekusi Ethereum. However, consensus clients also provide an RPC API, which enables users to query node information, request Beacon blocks, access Beacon state, and retrieve other consensus-related data directly from the node. API ini didokumentasikan di [halaman web Beacon API](https://ethereum.github.io/beacon-APIs/#/).

An internal API is also used for inter-client communication within a node—allowing the consensus client and execution client to exchange data seamlessly. Ini disebut 'Engine API' dan spesifikasinya tersedia di [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Spesifikasi klien eksekusi {#spec}

[Baca spesifikasi API JSON-RPC lengkap di GitHub](https://github.com/ethereum/execution-apis). API ini didokumentasikan di [halaman web API Eksekusi](https://ethereum.github.io/execution-apis/) dan menyertakan Inspector untuk mencoba semua metode yang tersedia.

## Konvensi {#conventions}

### Pengodean nilai hex {#hex-encoding}

Dua tipe data utama dilewatkan melalui JSON: array byte yang tidak diformat dan jumlah. Keduanya dikirim menggunakan encoding heksadesimal, tetapi masing-masing mengikuti persyaratan format yang berbeda.

#### Kuantitas {#quantities-encoding}

Saat melakukan encoding kuantitas (bilangan bulat, angka): gunakan hex, awali dengan "0x", gunakan representasi paling ringkas (pengecualian kecil: nol harus ditulis sebagai "0x0").

Berikut ini beberapa contohnya:

- 0x41 (65 dalam desimal)
- 0x400 (1024 dalam desimal)
- SALAH: 0x (harus selalu memiliki setidaknya satu digit - nol adalah "0x0")
- SALAH: 0x0400 (tidak boleh ada angka nol di depan)
- SALAH: ff (harus diawali dengan 0x)

### Data yang tidak diformat {#unformatted-data-encoding}

Saat melakukan encoding data yang tidak diformat (array byte, alamat akun, hash, array bytecode): gunakan hex, awali dengan "0x", dua digit hex untuk setiap byte.

Berikut ini beberapa contohnya:

- 0x41 (ukuran 1, "A")
- 0x004200 (ukuran 3, "0B0")
- 0x (ukuran 0, "")
- SALAH: 0xf0f0f (harus berupa angka genap)
- SALAH: 004200 (harus diawali dengan 0x)

### Parameter blok {#block-parameter}

Metode berikut ini memiliki parameter blok:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Ketika permintaan dilakukan untuk menanyakan state Ethereum, parameter blok yang diberikan menentukan tinggi blok.

Ada beberapa opsi yang bisa digunakan sebagai parameter blok, yaitu:

- `String HEX` - nomor blok integer
- `String "earliest"` untuk blok terawal/genesis
- `String "latest"` - untuk blok terbaru yang diusulkan
- `String "safe"` - untuk blok head terbaru yang aman
- `String "finalized"` - untuk blok terbaru yang telah difinalisasi
- `String "pending"` - untuk keadaan/transaksi yang tertunda

## Contoh

Di halaman ini, kami menyediakan contoh cara menggunakan masing-masing titik akhir (endpoint) API JSON_RPC menggunakan alat baris perintah, [curl](https://curl.se). Contoh-contoh titik akhir (endpoint) individual ini dapat ditemukan di bawah pada bagian [Contoh Curl](#curl-examples). Lebih jauh ke bawah halaman, kami juga menyediakan [contoh end-to-end](#usage-example) untuk mengompilasi dan menyebarkan kontrak pintar menggunakan simpul Geth, API JSON_RPC, dan curl.

## Contoh Curl {#curl-examples}

Contoh penggunaan API JSON_RPC dengan membuat permintaan [curl](https://curl.se) ke simpul Ethereum disediakan di bawah ini. Setiap contoh mencakup deskripsi endpoint tertentu, parameternya, tipe hasil yang dikembalikan, serta contoh penggunaan lengkap tentang bagaimana seharusnya digunakan.

Permintaan curl mungkin mengembalikan pesan error yang berkaitan dengan jenis konten. Ini karena opsi `--data` mengatur jenis konten ke `application/x-www-form-urlencoded`. Jika simpul Anda mengeluhkan hal ini, atur header secara manual dengan menempatkan `-H "Content-Type: application/json"` di awal panggilan. Contoh-contoh tersebut juga tidak menyertakan kombinasi URL/IP & port yang harus menjadi argumen terakhir yang diberikan ke curl (misalnya, `127.0.0.1:8545`). Permintaan curl lengkap termasuk data tambahan ini mengambil formulir berikut:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, State, History {#gossip-state-history}

Sejumlah metode inti JSON-RPC memerlukan data dari jaringan Ethereum, dan terbagi dengan rapi ke dalam tiga kategori utama: _Gossip, State, dan History_. Gunakan tautan di bagian ini untuk melompat ke setiap metode, atau gunakan daftar isi untuk menjelajahi seluruh daftar metode.

### Metode Gossip {#gossip-methods}

> Metode ini melacak kepala rantai. Begini cara transaksi menyebar ke seluruh jaringan, masuk ke dalam blok, dan bagaimana klien mengetahui adanya blok baru.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Metode State {#state_methods}

> Metode yang melaporkan kondisi saat ini dari semua data yang disimpan. "State" itu ibarat satu memori RAM besar yang digunakan bersama, dan mencakup saldo akun, data kontrak, serta estimasi gas.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Metode History {#history_methods}

> Mengambil catatan sejarah dari setiap blok kembali ke asal mula. Ini ibarat satu file besar yang hanya bisa ditambahkan, dan mencakup semua header blok, isi blok, blok paman, serta tanda terima transaksi.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## Taman Bermain API JSON-RPC

Anda dapat menggunakan [alat playground](https://ethereum-json-rpc.com) untuk menemukan dan mencoba metode API. Itu juga menunjukkan metode dan jaringan mana yang didukung oleh berbagai penyedia node.

## Metode API JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Mengembalikan versi klien saat ini.

**Parameter**

Tidak ada

**Hasil**

`String` - Versi klien saat ini

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Mengembalikan Keccak-256 (_bukan_ SHA3-256 yang terstandardisasi) dari data yang diberikan.

**Parameter**

1. `DATA` - Data yang akan diubah menjadi hash SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Hasil**

`DATA` - Hasil SHA3 dari string yang diberikan.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

Mengembalikan id jaringan saat ini.

**Parameter**

Tidak ada

**Hasil**

`String` - ID jaringan saat ini.

Daftar lengkap ID jaringan saat ini tersedia di [chainlist.org](https://chainlist.org). Beberapa yang umum adalah:

- `1`: Jaringan Utama Ethereum
- `11155111`: testnet Sepolia
- `560048` : Testnet Hoodi

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

Mengembalikan `true` jika klien secara aktif mendengarkan koneksi jaringan.

**Parameter**

Tidak ada

**Hasil**

`Boolean` - `true` saat mendengarkan, jika tidak `false`.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

Mengembalikan jumlah rekan yang saat ini terhubung ke klien.

**Parameter**

Tidak ada

**Hasil**

`QUANTITY` - integer dari jumlah peer yang terhubung.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

Mengembalikan versi protokol Ethereum saat ini. Perhatikan bahwa metode ini [tidak tersedia di Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Parameter**

Tidak ada

**Hasil**

`String` - Versi protokol Ethereum saat ini

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

Mengembalikan objek dengan data tentang status sinkronisasi atau `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

Tidak ada

**Hasil**

Data pengembalian yang tepat beragam di antara implementasi klien. Semua klien mengembalikan `False` ketika simpul tidak sinkron, dan semua klien mengembalikan bidang-bidang berikut.

`Object|Boolean`, Objek dengan data status sinkronisasi atau `FALSE`, saat tidak sinkron:

- `startingBlock`: `QUANTITY` - Blok tempat impor dimulai (hanya akan diatur ulang, setelah sinkronisasi mencapai head-nya)
- `currentBlock`: `QUANTITY` - Blok saat ini, sama seperti eth_blockNumber
- `highestBlock`: `QUANTITY` - Perkiraan blok tertinggi

Namun, klien individu juga dapat memberikan data tambahan. Sebagai contoh, Geth mengembalikan yang berikut ini:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Sedangkan Besu kembali:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

Lihat dokumentasi untuk klien spesifik milikmu untuk detail lebih lanjut.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Mengembalikan alamat coinbase klien.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

> **Catatan:** Metode ini telah usang per **v1.14.0** dan tidak lagi didukung. Mencoba menggunakan metode ini akan menghasilkan error "Metode tidak didukung".

**Parameter**

Tidak ada

**Hasil**

`DATA`, 20 bita - alamat coinbase saat ini.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Mengembalikan chain ID yang digunakan untuk menandatangani transaksi dengan perlindungan replay.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

Tidak ada

**Hasil**

`chainId`, nilai heksadesimal sebagai string yang mewakili integer dari ID rantai saat ini.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

Mengembalikan `true` jika klien secara aktif menambang blok baru. Ini hanya dapat mengembalikan `true` untuk jaringan proof-of-work dan mungkin tidak tersedia di beberapa klien sejak [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

Tidak ada

**Hasil**

`Boolean` - mengembalikan `true` jika klien menambang, jika tidak `false`.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Mengembalikan jumlah hash per detik yang digunakan node untuk menambang. Ini hanya dapat mengembalikan `true` untuk jaringan proof-of-work dan mungkin tidak tersedia di beberapa klien sejak [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

Tidak ada

**Hasil**

`QUANTITY` - jumlah hash per detik.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Mengembalikan perkiraan harga saat ini tiap gas dalam wei. Sebagai contoh, klien Besu memeriksa 100 blok terakhir dan secara bawaan mengembalikan harga satuan gas median.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

Tidak ada

**Hasil**

`QUANTITY` - integer dari harga gas saat ini dalam wei.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

Mengembalikan daftar alamat yang dimiliki oleh klien.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

Tidak ada

**Hasil**

`Array DATA`, 20 Bita - alamat yang dimiliki oleh klien.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

Mengembalikan nomor blok terbaru.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

Tidak ada

**Hasil**

`QUANTITY` - integer nomor blok saat ini tempat klien berada.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Mengembalikan saldo akun di alamat yang diberikan.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `DATA`, 20 Bita - alamat untuk memeriksa saldo.
2. `QUANTITY|TAG` - nomor blok integer, atau string `"latest"`, `"earliest"`, `"pending"`, `"safe"`, atau `"finalized"`, lihat [parameter blok](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Hasil**

`QUANTITY` - integer dari saldo saat ini dalam wei.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Mengembalikan nilai dari posisi penyimpanan pada alamat tertentu.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `DATA`, 20 Bita - alamat penyimpanan.
2. `QUANTITY` - integer posisi dalam penyimpanan.
3. `QUANTITY|TAG` - nomor blok integer, atau string `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, lihat [parameter blok](/developers/docs/apis/json-rpc/#block-parameter)

**Hasil**

`DATA` - nilai pada posisi penyimpanan ini.

**Contoh**
Menghitung posisi yang benar bergantung pada penyimpanan yang akan diambil. Pertimbangkan kontrak berikut yang disebarkan di `0x295a70b2de5e3953354a6a8344e616ed314d7251` oleh alamat `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Pengambilan nilai pos0 adalah mudah:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Mengambil elemen peta lebih sulit. Posisi suatu elemen dalam peta dihitung dengan:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Ini berarti untuk mengambil storage pada pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"], kita perlu menghitung posisi dengan:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Konsol geth yang dilengkapi dengan pustaka web3 dapat digunakan untuk melakukan perhitungan:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Sekarang untuk mengambil penyimpanan:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Mengembalikan jumlah transaksi yang _dikirim_ dari suatu alamat.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `DATA`, 20 Bita - alamat.
2. `QUANTITY|TAG` - nomor blok integer, atau string `"latest"`, `"earliest"`, `"pending"`, `"safe"` atau `"finalized"`, lihat [parameter blok](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**Hasil**

`QUANTITY` - integer dari jumlah transaksi yang dikirim dari alamat ini.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Mengembalikan jumlah transaksi dalam sebuah blok dari blok yang cocok dengan hash blok yang diberikan.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bita - hash sebuah blok

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Hasil**

`QUANTITY` - integer dari jumlah transaksi dalam blok ini.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Mengembalikan jumlah transaksi dalam suatu blok yang sesuai dengan nomor blok yang diberikan.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `QUANTITY|TAG` - integer nomor blok, atau string `"earliest"`, `"latest"`, `"pending"`, `"safe"` atau `"finalized"`, seperti dalam [parameter blok](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Hasil**

`QUANTITY` - integer dari jumlah transaksi dalam blok ini.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Mengembalikan jumlah paman dalam blok dari blok yang cocok dengan hash blok yang diberikan.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bita - hash sebuah blok

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Hasil**

`QUANTITY` - integer jumlah "uncle" dalam blok ini.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Mengembalikan jumlah paman dalam blok dari blok yang cocok dengan nomor blok yang diberikan.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `QUANTITY|TAG` - nomor blok integer, atau string `"latest"`, `"earliest"`, `"pending"`, `"safe"` atau `"finalized"`, lihat [parameter blok](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Hasil**

`QUANTITY` - integer jumlah "uncle" dalam blok ini.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Mengembalikan kode di alamat yang diberikan.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `DATA`, 20 Bita - alamat
2. `QUANTITY|TAG` - nomor blok integer, atau string `"latest"`, `"earliest"`, `"pending"`, `"safe"` atau `"finalized"`, lihat [parameter blok](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Hasil**

`DATA` - kode dari alamat yang diberikan.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

Metode sign menghitung tanda tangan khusus Ethereum dengan: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Dengan menambahkan awalan pada pesan, tanda tangan yang dihitung dapat dikenali sebagai tanda tangan khusus Ethereum. Ini mencegah penyalahgunaan di mana dapp berbahaya dapat menandatangani data arbitrer (misalnya, transaksi) dan menggunakan tanda tangan untuk menyamar sebagai korban.

Catatan: alamat yang akan digunakan untuk menandatangani harus tidak terkunci.

**Parameter**

1. `DATA`, 20 Bita - alamat
2. `DATA`, N Bita - pesan yang akan ditandatangani

**Hasil**

`DATA`: Tanda Tangan

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

Menandatangani transaksi yang dapat dikirimkan ke jaringan di lain waktu menggunakan [eth_sendRawTransaction](#eth_sendrawtransaction).

**Parameter**

1. `Object` - Objek transaksi

- `type`:
- `from`: `DATA`, 20 Bita - Alamat pengirim transaksi.
- `to`: `DATA`, 20 Bita - (opsional saat membuat kontrak baru) Alamat tujuan transaksi.
- `gas`: `QUANTITY` - (opsional, default: 90000) Integer gas yang disediakan untuk eksekusi transaksi. Ini akan mengembalikan gas yang tidak terpakai.
- `gasPrice`: `QUANTITY` - (opsional, default: Akan Ditentukan) Integer dari gasPrice yang digunakan untuk setiap gas yang dibayar, dalam Wei.
- `value`: `QUANTITY` - (opsional) Integer dari nilai yang dikirim dengan transaksi ini, dalam Wei.
- `data`: `DATA` - Kode kontrak yang telah dikompilasi ATAU hash dari tanda tangan metode yang dipanggil dan parameter yang telah dikodekan.
- `nonce`: `QUANTITY` - (opsional) Integer dari sebuah nonce. Ini memungkinkan untuk menimpa transaksi tertunda Anda sendiri yang menggunakan nonce yang sama.

**Hasil**

`DATA`, Objek transaksi yang dikodekan RLP yang ditandatangani oleh akun yang ditentukan.

**Contoh**

```js
// Request
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Membuat transaksi panggilan pesan baru atau pembuatan kontrak, jika bidang data berisi kode, dan menandatanganinya menggunakan akun yang ditentukan di `from`.

**Parameter**

1. `Object` - Objek transaksi

- `from`: `DATA`, 20 Bita - Alamat pengirim transaksi.
- `to`: `DATA`, 20 Bita - (opsional saat membuat kontrak baru) Alamat tujuan transaksi.
- `gas`: `QUANTITY` - (opsional, default: 90000) Integer gas yang disediakan untuk eksekusi transaksi. Ini akan mengembalikan gas yang tidak terpakai.
- `gasPrice`: `QUANTITY` - (opsional, default: Akan Ditentukan) Integer dari gasPrice yang digunakan untuk setiap gas yang dibayar.
- `value`: `QUANTITY` - (opsional) Integer dari nilai yang dikirim dengan transaksi ini.
- `input`: `DATA` - Kode kontrak yang telah dikompilasi ATAU hash dari tanda tangan metode yang dipanggil dan parameter yang telah dikodekan.
- `nonce`: `QUANTITY` - (opsional) Integer dari sebuah nonce. Ini memungkinkan untuk menimpa transaksi tertunda Anda sendiri yang menggunakan nonce yang sama.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Hasil**

`DATA`, 32 Bita - hash transaksi, atau hash nol jika transaksi belum tersedia.

Gunakan [eth_getTransactionReceipt](#eth_gettransactionreceipt) untuk mendapatkan alamat kontrak, setelah transaksi diusulkan dalam sebuah blok, saat Anda membuat kontrak.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Membuat transaksi panggilan pesan baru atau pembuatan kontrak untuk transaksi yang ditandatangani.

**Parameter**

1. `DATA`, Data transaksi yang ditandatangani.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Hasil**

`DATA`, 32 Bita - hash transaksi, atau hash nol jika transaksi belum tersedia.

Gunakan [eth_getTransactionReceipt](#eth_gettransactionreceipt) untuk mendapatkan alamat kontrak, setelah transaksi diusulkan dalam sebuah blok, saat Anda membuat kontrak.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Menjalankan panggilan pesan baru secara langsung tanpa membuat transaksi di blockchain. Sering digunakan untuk mengeksekusi fungsi kontrak pintar hanya-baca, misalnya `balanceOf` untuk kontrak ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `Object` - Objek panggilan transaksi

- `from`: `DATA`, 20 Bita - (opsional) Alamat pengirim transaksi.
- `to`: `DATA`, 20 Bita - Alamat tujuan transaksi.
- `gas`: `QUANTITY` - (opsional) Integer gas yang disediakan untuk eksekusi transaksi. eth_call mengkonsumsi nol gas, tetapi parameter ini mungkin dibutuhkan oleh beberapa eksekusi.
- `gasPrice`: `QUANTITY` - (opsional) Integer gasPrice yang digunakan untuk setiap gas yang dibayar
- `value`: `QUANTITY` - (opsional) Integer nilai yang dikirimkan bersama transaksi ini
- `input`: `DATA` - (opsional) Hash dari tanda tangan metode dan parameter yang telah dikodekan. Untuk detailnya, lihat [ABI Kontrak Ethereum di dokumentasi Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - nomor blok integer, atau string `"latest"`, `"earliest"`, `"pending"`, `"safe"` atau `"finalized"`, lihat [parameter blok](/developers/docs/apis/json-rpc/#block-parameter)

**Hasil**

`DATA` - nilai kembali dari kontrak yang dieksekusi.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

Menghasilkan dan mengembalikan perkiraan berapa banyak gas yang diperlukan agar transaksi dapat diselesaikan. Transaksi tidak akan ditambahkan ke dalam blockchain. Harap diperhatikan bahwa estimasi ini mungkin jauh lebih besar daripada jumlah gas yang sebenarnya digunakan dalam transaksi, karena berbagai alasan, termasuk mekanisme EVM dan kinerja node.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

Lihat parameter [eth_call](#eth_call), kecuali bahwa semua properti bersifat opsional. Jika tidak ada batas gas yang ditentukan, geth menggunakan batas gas blok dari blok yang tertunda sebagai batas atas. Akibatnya, estimasi yang dikembalikan mungkin tidak cukup untuk mengeksekusi panggilan/transaksi ketika jumlah gas lebih tinggi dari batas gas blok yang tertunda.

**Hasil**

`QUANTITY` - jumlah gas yang digunakan.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Mengembalikan informasi tentang sebuah blok berdasarkan hash.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bita - Hash dari sebuah blok.
2. `Boolean` - Jika `true`, mengembalikan objek transaksi lengkap, jika `false` hanya hash transaksinya.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Hasil**

`Object` - Objek blok, atau `null` jika tidak ada blok yang ditemukan:

- `number`: `QUANTITY` - nomor blok. `null` ketika bloknya tertunda.
- `hash`: `DATA`, 32 Bita - hash dari blok. `null` ketika bloknya tertunda.
- `parentHash`: `DATA`, 32 Bita - hash dari blok induk.
- `nonce`: `DATA`, 8 Bita - hash dari bukti kerja (proof-of-work) yang dihasilkan. `null` saat bloknya tertunda, `0x0` untuk blok bukti taruhan (sejak The Merge)
- `sha3Uncles`: `DATA`, 32 Bita - SHA3 dari data uncle di dalam blok.
- `logsBloom`: `DATA`, 256 Bita - filter bloom untuk log dari blok. `null` ketika bloknya tertunda.
- `transactionsRoot`: `DATA`, 32 Bita - root dari trie transaksi blok.
- `stateRoot`: `DATA`, 32 Bita - root dari trie keadaan akhir blok.
- `receiptsRoot`: `DATA`, 32 Bita - root dari trie tanda terima blok.
- `miner`: `DATA`, 20 Bita - alamat penerima manfaat yang diberi hadiah blok.
- `difficulty`: `QUANTITY` - integer dari tingkat kesulitan untuk blok ini.
- `totalDifficulty`: `QUANTITY` - integer dari total tingkat kesulitan rantai hingga blok ini.
- `extraData`: `DATA` - bidang "extra data" dari blok ini.
- `size`: `QUANTITY` - integer ukuran blok ini dalam bita.
- `gasLimit`: `QUANTITY` - gas maksimum yang diizinkan dalam blok ini.
- `gasUsed`: `QUANTITY` - total gas yang digunakan oleh semua transaksi dalam blok ini.
- `timestamp`: `QUANTITY` - stempel waktu unix saat blok disusun.
- `transactions`: `Array` - Array objek transaksi, atau hash transaksi 32 Bita tergantung pada parameter terakhir yang diberikan.
- `uncles`: `Array` - Array hash uncle.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

Mengembalikan informasi tentang blok berdasarkan nomor blok.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `QUANTITY|TAG` - integer nomor blok, atau string `"earliest"`, `"latest"`, `"pending"`, `"safe"` atau `"finalized"`, seperti dalam [parameter blok](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - Jika `true`, mengembalikan objek transaksi lengkap, jika `false` hanya hash transaksinya.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Hasil**
Lihat [eth_getBlockByHash](#eth_getblockbyhash)

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Hasil lihat [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Mengembalikan informasi tentang transaksi yang diminta oleh hash transaksi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bita - hash sebuah transaksi

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Hasil**

`Object` - Objek transaksi, atau `null` jika tidak ditemukan transaksi:

- `blockHash`: `DATA`, 32 Bita - hash blok tempat transaksi ini berada. `null` ketika tertunda.
- `blockNumber`: `QUANTITY` - nomor blok tempat transaksi ini berada. `null` ketika tertunda.
- `from`: `DATA`, 20 Bita - alamat pengirim.
- `gas`: `QUANTITY` - gas yang disediakan oleh pengirim.
- `gasPrice`: `QUANTITY` - harga gas yang disediakan oleh pengirim dalam Wei.
- `hash`: `DATA`, 32 Bita - hash transaksi.
- `input`: `DATA` - data yang dikirim bersama dengan transaksi.
- `nonce`: `QUANTITY` - jumlah transaksi yang dilakukan oleh pengirim sebelum yang ini.
- `to`: `DATA`, 20 Bita - alamat penerima. `null` ketika itu adalah transaksi pembuatan kontrak.
- `transactionIndex`: `QUANTITY` - integer dari posisi indeks transaksi dalam blok. `null` ketika tertunda.
- `value`: `QUANTITY` - nilai yang ditransfer dalam Wei.
- `v`: `QUANTITY` - ID pemulihan ECDSA
- `r`: `QUANTITY` - tanda tangan ECDSA r
- `s`: `QUANTITY` - tanda tangan ECDSA s

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Mengembalikan informasi tentang sebuah transaksi berdasarkan hash blok dan posisi indeks transaksi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bita - hash dari sebuah blok.
2. `QUANTITY` - integer dari posisi indeks transaksi.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Hasil**
Lihat [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Hasil lihat [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Mengembalikan informasi transaksi berdasarkan nomor blok dan posisi indeks transaksi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `QUANTITY|TAG` - nomor blok, atau string `"earliest"`, `"latest"`, `"pending"`, `"safe"` atau `"finalized"`, seperti dalam [parameter blok](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - posisi indeks transaksi.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Hasil**
Lihat [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Hasil lihat [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Mengembalikan tanda terima dari suatu transaksi berdasarkan hash transaksi.

**Catatan** Bahwa tanda terima tidak tersedia untuk transaksi yang tertunda.

**Parameter**

1. `DATA`, 32 Bita - hash sebuah transaksi

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Hasil**
`Object` - Objek tanda terima transaksi, atau `null` jika tidak ditemukan tanda terima:

- `transactionHash `: `DATA`, 32 Bita - hash dari transaksi.
- `transactionIndex`: `QUANTITY` - integer dari posisi indeks transaksi dalam blok.
- `blockHash`: `DATA`, 32 Bita - hash blok tempat transaksi ini berada.
- `blockNumber`: `QUANTITY` - nomor blok tempat transaksi ini berada.
- `from`: `DATA`, 20 Bita - alamat pengirim.
- `to`: `DATA`, 20 Bita - alamat penerima. null ketika transaksi merupakan pembuatan kontrak.
- `cumulativeGasUsed` : `QUANTITY ` - Jumlah total gas yang digunakan saat transaksi ini dieksekusi di blok.
- `effectiveGasPrice` : `QUANTITY` - Jumlah dari biaya dasar dan tip yang dibayarkan per unit gas.
- `gasUsed `: `QUANTITY ` - Jumlah gas yang digunakan oleh transaksi spesifik ini saja.
- `contractAddress `: `DATA`, 20 Bita - Alamat kontrak yang dibuat, jika transaksi adalah pembuatan kontrak, jika tidak `null`.
- `logs`: `Array` - Array objek log, yang dihasilkan oleh transaksi ini.
- `logsBloom`: `DATA`, 256 Bita - Filter Bloom untuk klien ringan agar dapat dengan cepat mengambil log terkait.
- `type`: `QUANTITY` - integer dari jenis transaksi, `0x0` untuk transaksi lama, `0x1` untuk jenis daftar akses, `0x2` untuk biaya dinamis.

Itu juga mengembalikan _salah satu_ dari:

- `root` : `DATA` 32 bita dari root keadaan pasca-transaksi (sebelum Byzantium)
- `status`: `QUANTITY` baik `1` (berhasil) atau `0` (gagal)

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Mengembalikan informasi tentang uncle dari sebuah blok berdasarkan hash dan posisi indeks uncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bita - Hash dari sebuah blok.
2. `QUANTITY` - Posisi indeks uncle.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Hasil**
Lihat [eth_getBlockByHash](#eth_getblockbyhash)

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Hasil lihat [eth_getBlockByHash](#eth_getblockbyhash)

**Catatan**: Uncle tidak berisi transaksi individual.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Mengembalikan informasi tentang uncle dari sebuah blok berdasarkan nomor dan posisi indeks uncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Coba titik akhir (endpoint) di playground
</ButtonLink>

**Parameter**

1. `QUANTITY|TAG` - nomor blok, atau string `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, seperti dalam [parameter blok](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - posisi indeks uncle.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Hasil**
Lihat [eth_getBlockByHash](#eth_getblockbyhash)

**Catatan**: Uncle tidak berisi transaksi individual.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Hasil lihat [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Membuat objek penyaring, berdasarkan opsi penyaring, untuk memberi tahu ketika status berubah (log).
Untuk memeriksa apakah keadaan telah berubah, panggil [eth_getFilterChanges](#eth_getfilterchanges).

**Catatan tentang menentukan filter topik:**
Topik bergantung pada urutan. Transaksi dengan log dengan topik [A, B] akan dicocokkan dengan filter topik berikut:

- `[]` "apa saja"
- `[A]` "A di posisi pertama (dan apa pun setelahnya)"
- `[null, B]` "apa pun di posisi pertama DAN B di posisi kedua (dan apa pun setelahnya)"
- `[A, B]` "A di posisi pertama DAN B di posisi kedua (dan apa pun setelahnya)"
- `[[A, B], [A, B]]` "(A ATAU B) pada posisi pertama DAN (A ATAU B) pada posisi kedua (dan setelahnya)"
- **Parameter**

1. `Object` - Opsi filter:

- `fromBlock`: `QUANTITY|TAG` - (opsional, default: `"latest"`) Nomor blok integer, atau `"latest"` untuk blok yang diusulkan terakhir, `"safe"` untuk blok aman terakhir, `"finalized"` untuk blok terakhir yang difinalisasi, atau `"pending"`, `"earliest"` untuk transaksi yang belum ada di dalam blok.
- `toBlock`: `QUANTITY|TAG` - (opsional, default: `"latest"`) Nomor blok integer, atau `"latest"` untuk blok yang diusulkan terakhir, `"safe"` untuk blok aman terakhir, `"finalized"` untuk blok terakhir yang telah difinalisasi, atau `"pending"`, `"earliest"` untuk transaksi yang belum ada di dalam blok.
- `address`: `DATA|Array`, 20 Bita - (opsional) Alamat kontrak atau daftar alamat asal log.
- `topics`: `Array of DATA`, - (opsional) Array topik `DATA` 32 Bita. Topik tergantung pada pesanan. Setiap topik juga dapat berupa array DATA dengan "atau" opsi.

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Hasil**
`QUANTITY` - ID filter.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Membuat penyaring di node, untuk memberi tahu ketika sebuah blok baru tiba.
Untuk memeriksa apakah keadaan telah berubah, panggil [eth_getFilterChanges](#eth_getfilterchanges).

**Parameter**
Tidak ada

**Hasil**
`QUANTITY` - ID filter.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Membuat pemyaring di node, untuk memberitahukan ketika ada transaksi baru yang tertunda.
Untuk memeriksa apakah keadaan telah berubah, panggil [eth_getFilterChanges](#eth_getfilterchanges).

**Parameter**
Tidak ada

**Hasil**
`QUANTITY` - ID filter.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Mencopot pemasangan penyaring dengan identitas yang diberikan. Harus selalu dipanggil ketika jam tangan tidak lagi diperlukan.
Selain itu, Filter akan habis masa berlakunya jika tidak diminta dengan [eth_getFilterChanges](#eth_getfilterchanges) untuk jangka waktu tertentu.

**Parameter**

1. `QUANTITY` - ID filter.

```js
params: [
  "0xb", // 11
]
```

**Hasil**
`Boolean` - `true` jika filter berhasil dihapus, jika tidak `false`.

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Metode polling untuk filter, yang mengembalikan sebuah array log yang terjadi sejak polling terakhir.

**Parameter**

1. `QUANTITY` - id filter.

```js
params: [
  "0x16", // 22
]
```

**Hasil**
`Array` - Array objek log, atau array kosong jika tidak ada yang berubah sejak polling terakhir.

- Untuk filter yang dibuat dengan `eth_newBlockFilter`, nilai yang dikembalikan adalah hash blok (`DATA`, 32 Bita), misalnya, `["0x3454645634534..."]`.

- Untuk filter yang dibuat dengan `eth_newPendingTransactionFilter `, nilai yang dikembalikan adalah hash transaksi (`DATA`, 32 Bita), misalnya, `["0x6345343454645..."]`.

- Untuk filter yang dibuat dengan `eth_newFilter` log adalah objek dengan parameter berikut:
  - `removed`: `TAG` - `true` ketika log dihapus, karena reorganisasi rantai. `false` jika itu adalah log yang valid.
  - `logIndex`: `QUANTITY` - integer dari posisi indeks log dalam blok. `null` ketika lognya tertunda.
  - `transactionIndex`: `QUANTITY` - integer dari posisi indeks transaksi tempat log dibuat. `null` ketika lognya tertunda.
  - `transactionHash`: `DATA`, 32 Bita - hash dari transaksi tempat log ini dibuat. `null` ketika lognya tertunda.
  - `blockHash`: `DATA`, 32 Bita - hash blok tempat log ini berada. `null` ketika tertunda. `null` ketika lognya tertunda.
  - `blockNumber`: `QUANTITY` - nomor blok tempat log ini berada. `null` ketika tertunda. `null` ketika lognya tertunda.
  - `address`: `DATA`, 20 Bita - alamat asal log ini.
  - `data`: `DATA` - data log non-indeks dengan panjang variabel. (Dalam _solidity_: nol atau lebih argumen log non-indeks 32 Bita.)
  - `topics`: `Array of DATA` - Array 0 hingga 4 `DATA` 32 Bita dari argumen log yang diindeks. (Dalam _solidity_: Topik pertama adalah _hash_ dari tanda tangan aksi (misalnya, `Deposit(address,bytes32,uint256)`), kecuali Anda mendeklarasikan aksi dengan penentu `anonymous`.)

- **Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

Mengembalikan sebuah array dari semua log yang cocok dengan penyaring dengan identintas yang diberikan.

**Parameter**

1. `QUANTITY` - ID filter.

```js
params: [
  "0x16", // 22
]
```

**Hasil**
Lihat [eth_getFilterChanges](#eth_getfilterchanges)

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Hasil lihat [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Mengembalikan larik semua log yang cocok dengan objek penyaring yang diberikan.

**Parameter**

1. `Object` - Opsi filter:

- `fromBlock`: `QUANTITY|TAG` - (opsional, default: `"latest"`) Nomor blok integer, atau `"latest"` untuk blok yang diusulkan terakhir, `"safe"` untuk blok aman terakhir, `"finalized"` untuk blok terakhir yang difinalisasi, atau `"pending"`, `"earliest"` untuk transaksi yang belum ada di dalam blok.
- `toBlock`: `QUANTITY|TAG` - (opsional, default: `"latest"`) Nomor blok integer, atau `"latest"` untuk blok yang diusulkan terakhir, `"safe"` untuk blok aman terakhir, `"finalized"` untuk blok terakhir yang telah difinalisasi, atau `"pending"`, `"earliest"` untuk transaksi yang belum ada di dalam blok.
- `address`: `DATA|Array`, 20 Bita - (opsional) Alamat kontrak atau daftar alamat asal log.
- `topics`: `Array of DATA`, - (opsional) Array topik `DATA` 32 Bita. Topik tergantung pada pesanan. Setiap topik juga dapat berupa array DATA dengan "atau" opsi.
- `blockHash`: `DATA`, 32 Bita - (opsional, **masa depan**) Dengan penambahan EIP-234, `blockHash` akan menjadi opsi filter baru yang membatasi log yang dikembalikan ke blok tunggal dengan hash 32-bita `blockHash`. Menggunakan `blockHash` setara dengan `fromBlock` = `toBlock` = nomor blok dengan hash `blockHash`. Jika `blockHash` ada dalam kriteria filter, maka `fromBlock` maupun `toBlock` tidak diizinkan.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Hasil**
Lihat [eth_getFilterChanges](#eth_getfilterchanges)

**Contoh**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Hasil lihat [eth_getFilterChanges](#eth_getfilterchanges)

## Contoh Penggunaan {#usage-example}

### Menyebarkan kontrak menggunakan JSON_RPC {#deploying-contract}

Bagian ini mencakup demonstrasi tentang cara melakukan deploy kontrak hanya dengan menggunakan antarmuka RPC. Ada rute alternatif untuk menyebarkan kontrak di mana kompleksitas ini diabstraksikan—misalnya, menggunakan pustaka yang dibangun di atas antarmuka RPC seperti [web3.js](https://web3js.readthedocs.io/) dan [web3.py](https://github.com/ethereum/web3.py). Abstraksi ini umumnya lebih mudah dipahami dan lebih kecil kemungkinannya menimbulkan kesalahan, namun tetap penting untuk memahami apa yang sebenarnya terjadi di balik layar.

Berikut ini adalah kontrak pintar sederhana bernama `Multiply7` yang akan disebarkan menggunakan antarmuka JSON-RPC ke simpul Ethereum. Tutorial ini mengasumsikan pembaca sudah menjalankan simpul Geth. Informasi lebih lanjut tentang simpul dan klien tersedia [di sini](/developers/docs/nodes-and-clients/run-a-node). Silakan merujuk ke dokumentasi [klien](/developers/docs/nodes-and-clients/) individual untuk melihat cara memulai HTTP JSON-RPC untuk klien non-Geth. Sebagian besar klien secara default melayani di `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Hal pertama yang perlu dilakukan adalah memastikan antarmuka HTTP RPC sudah diaktifkan. Ini berarti kami menyediakan Geth dengan flag `--http` saat startup. Pada contoh ini, kita menggunakan node Geth pada jaringan pengembangan pribadi. Dengan pendekatan ini, kita tidak memerlukan ether di jaringan utama.

```bash
geth --http --dev console 2>>geth.log
```

Ini akan memulai antarmuka HTTP RPC di `http://localhost:8545`.

Kita dapat memverifikasi bahwa antarmuka berjalan dengan mengambil alamat coinbase (dengan mendapatkan alamat pertama dari array akun) dan saldo menggunakan [curl](https://curl.se). Perlu dicatat bahwa data pada contoh-contoh ini akan berbeda pada node lokal Anda. Jika Anda ingin mencoba perintah-perintah ini, ganti parameter permintaan pada curl request kedua dengan hasil yang dikembalikan dari perintah pertama.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Karena angka dikodekan dalam format heksadesimal, saldo dikembalikan dalam satuan wei sebagai string heksadesimal. Jika kita ingin memperoleh saldo dalam ether sebagai angka, kita dapat menggunakan web3 dari konsol Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Sekarang, setelah ada sejumlah ether di jaringan pengembangan privat kita, kita dapat melakukan deploy kontrak. Langkah pertama adalah mengompilasi kontrak Multiply7 menjadi bytecode yang dapat dikirim ke EVM. Untuk menginstal solc, kompiler Solidity, ikuti [dokumentasi Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Anda mungkin ingin menggunakan rilis `solc` yang lebih lama agar sesuai dengan [versi kompiler yang digunakan untuk contoh kami](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Langkah selanjutnya adalah mengompilasi kontrak Multiply7 menjadi kode bita yang dapat dikirim ke EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Sekarang, setelah kode dikompilasi, kita perlu menentukan berapa banyak gas yang dibutuhkan untuk melakukan deploy. Antarmuka RPC memiliki metode `eth_estimateGas` yang akan memberi kita perkiraan.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Dan terakhir lakukan deploy kontraknya.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Transaksi diterima oleh node dan menghasilkan sebuah hash transaksi. Hash ini dapat digunakan untuk melacak transaksi. Langkah selanjutnya adalah menentukan alamat di mana kontrak kita diterapkan. Setiap transaksi yang dijalankan akan menghasilkan sebuah tanda terima. Tanda terima ini memuat berbagai informasi tentang transaksi seperti di blok mana transaksi dimasukkan dan berapa banyak gas yang digunakan oleh EVM. Jika sebuah transaksi
membuat kontrak tanda terima tersebut juga akan memuat alamat kontraknya. Kita dapat mengambil tanda terima tersebut dengan metode RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Kontrak kami dibuat di `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Hasil null sebagai ganti tanda terima itu berarti transaksi tersebut belum dimasukkan ke dalam blok. Tunggu sementara waktu lalu periksa apakah konsensus klien Anda sedang berjalan kemudian coba lagi.

#### Berinteraksi dengan kontrak pintar {#interacting-with-smart-contract}

Dalam contoh ini, kami akan mengirimkan transaksi menggunakan `eth_sendTransaction` ke metode `multiply` dari kontrak.

`eth_sendTransaction` memerlukan beberapa argumen, secara spesifik `from`, `to` dan `data`. `From` adalah alamat publik akun kami, dan `to` adalah alamat kontrak. Argumen `data` berisi payload yang mendefinisikan metode mana yang harus dipanggil dan dengan argumen mana. Di sinilah [ABI (application binary interface)](https://docs.soliditylang.org/en/latest/abi-spec.html) berperan. ABI adalah berkas JSON yang mendefinisikan cara menentukan dan encode data untuk EVM.

Byte pada payload menentukan metode mana yang dipanggil dalam kontrak. Ini adalah 4 byte pertama dari hash Keccak yang dihasilkan dari nama fungsi dan tipe argumennya, dikodekan dalam format heksadesimal. Fungsi multiply menerima sebuah uint yang merupakan alias dari uint256. Sehingga kita mendapatkan:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Langkah berikutnya adalah menyandikan argumen. Hanya ada satu uint256, katakanlah, nilai 6. ABI memiliki bagian yang menentukan cara encode tipe uint256.

`int<M>: enc(X)` adalah pengodean komplemen dua big-endian dari X, diisi di sisi urutan lebih tinggi (kiri) dengan 0xff untuk X negatif dan dengan bita nol untuk X positif sehingga panjangnya menjadi kelipatan 32 bita.

Ini dikodekan menjadi `0000000000000000000000000000000000000000000000000000000000000006`.

Menggabungkan pemilih fungsi dan argumen yang dikodekan, data kita akan menjadi `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

There is only one uint256, say, value 6.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Karena transaksi telah dikirim, sebuah transaction hash dikembalikan. Mengambil tanda terima yang diberikan:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

Tanda terima berisi log. Log ini dihasilkan oleh EVM saat eksekusi transaksi dan disertakan dalam tanda terima. Fungsi `multiply` menunjukkan bahwa aksi `Print` dimunculkan dengan input dikali 7. Karena argumen untuk aksi `Print` adalah uint256, kita dapat mendekodekannya sesuai dengan aturan ABI yang akan memberi kita desimal 42 yang diharapkan. Selain data, perlu dicatat bahwa topik dapat digunakan untuk menentukan event mana yang membuat log tersebut:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Ini hanyalah pengantar singkat tentang beberapa tugas yang paling umum, menunjukkan penggunaan langsung JSON-RPC.

## Topik terkait {#related-topics}

- [Spesifikasi JSON-RPC](http://www.jsonrpc.org/specification)
- [Simpul dan klien](/developers/docs/nodes-and-clients/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API Backend](/developers/docs/apis/backend/)
- [Klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients)
