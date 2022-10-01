---
title: Transaksi
description: Gambaran umum tentang transaksi Ethereum – cara kerjanya, struktur datanya, dan cara mengirimnya melalui aplikasi.
lang: id
---

Transaksi adalah instruksi yang ditandatangani secara kriptografis dari akun. Akun akan menginisiasi transaksi untuk memperbarui state jaringan Ethereum. Bentuk transaksi paling sederhana adalah mentransfer ETH dari satu akun ke akun yang lain.

## Prasyarat {#prerequisites}

Untukmembantu Anda memahami halaman ini dengan lebih baik, kami menyarankan Anda membaca terlebih dahulu [Akun](/developers/docs/accounts/) dan [pengantar Ethereum](/developers/docs/intro-to-ethereum/) kami.

## Apa itu transaksi? {#whats-a-transaction}

Transaksi Ethereum mengacu pada aksi yang dimulai oleh akun dengan kepemilikan eksternal, dengan kata lain, akun yang dikelola oleh manusia, bukan kontrak. Sebagai contoh, jika Bob mengirimkan 1 ETH ke Alice, akun Bob harus didebit dan akun Alice harus dikredit. Aksi yang mengubah state ini terjadi dalam sebuah transaksi.

![Diagram yang menunjukkan sebuah transaksi menyebabkan perubahan state](./tx.png) _Diagram diadaptasi dari [Ethereum EVM yang diilustrasikan](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Transaksi, yang mengubah state dari EVM, perlu disiarkan ke seluruh jaringan. Node apa saja bisa menyiarkan permintaan agar sebuah transaksi dieksekusi pada EVM; setelah ini terjadi, penambang akan mengeksekusi transaksi dan menyebarkan perubahan state yang menjadi hasilnya ke seluruh jaringan.

Transaksi membutuhkan biaya dan harus ditambang untuk menjadi valid. Untuk membuat gambaran umum ini lebih sederhana, kami akan membahas biaya gas dan penambangan di tempat lain.

Sebuah transaksi yang dikirim meliputi informasi berikut:

- `recipient` – alamat yang menerima (jika akun dengan kepemilikan eksternal, transaksi akan mentransfer nilai. Jika akun kontrak, transaksi akan mengeksekusi kode kontrak)
- `signature` – tanda pengenal dari sang pengirim. Ini dihasilkan ketika kunci privat pengirim menandatangani transaksi dan mengonfirmasi bahwa pengirim telah mengizinkan transaksi ini
- `value` – jumlah ETH yang ditransfer dari pengirim ke peneriman (dalam WEI, denominasi dari ETH)
- `data` – field tambahan untuk memasukkan data arbitrari
- `gasLimit` – jumlah maksimum unit gas yang bisa dipakai dalam transaksi. Unit gas menunjukkan langkah komputasional
- `maxPriorityFeePerGas` - jumlah gas maksimum yang akan dimasukkan sebagai tips bagi penambang
- `maxFeePerGas` - jumlah gas maksimum yang ingin dibayarkan untuk transaksi (termasuk `baseFeePerGas` dan `maxPriorityFeePerGas`)

Gas adalah referensi komputasi yang diperlukan untuk memroses transaksi oleh penambang. Pengguna harus membayar biaya untuk komputasi ini. `gasLimit`, dan `maxPriorityFeePerGas` menentukan biaya transaksi maksimum yang dibayarkan kepada penambang. [Selengkapnya tentang Gas](/developers/docs/gas/).

Objek transaksi kurang lebih akan tampak seperti ini:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300"
  maxPriorityFeePerGas: "10"
  nonce: "0",
  value: "10000000000",
}
```

Tapi satu objek transaksi harus ditandatangani menggunakan kunci privat pengirim. Ini membuktikan bahwa transaksi hanya bisa berasal dari pengirim dan bukan dikirim secara curang.

Klien Ethereum seperti Geth akan menangani proses penandatanganan ini.

Contoh pemanggilan [JSON-RPC](https://eth.wiki/json-rpc/API):

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Contoh tanggapan:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `mentah` adalah transaksi yang ditandatangani dalam bentuk Prefiks Panjang Rekursif (RLP) yang dikodekan
- `tx` adalah transaksi yang ditandatangani dalam bentuk JSON

Dengan hash tanda tangan, transaksi bisa dibuktikan secara kriptografi berasal dari pengirim dan dikirim ke jaringan.

### The data field {#the-data-field}

The vast majority of transactions access a contract from an externally-owned account. Most contracts are written in Solidity and interpret their data field in accordance with the [application binary interface (ABI)](/glossary/#abi).

The first four bytes specify which function to call, using the hash of the function's name and arguments. You can sometimes identify the function from the selector using [this database](https://www.4byte.directory/signatures/).

The rest of the calldata is the arguments, [encoded as specified in the ABI specs](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

For example, lets look at [this transaction](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1). Use **Click to see More** to see the calldata.

The function selector is `0xa9059cbb`. There are several [known functions with this signature](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb). In this case [the contract source code](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) has been uploaded to Etherscan, so we know the function is `transfer(address,uint256)`.

The rest of the data is:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

According to the ABI specifications, integer values (such as addresses, which are 20-byte integers) appear in the ABI as 32-byte words, padded with zeros in the front. So we know that the `to` address is [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279). The `value` is 0x3b0559f4 = 990206452.

## Jenis transaksi {#types-of-transactions}

Di Ethereum ada beberapa jenis transaksi yang berbeda:

- Transaksi reguler: transaksi dari satu dompet ke dompet lainnya.
- Transaksi penerapan kontrak: transaksi tanpa alamat 'kepada', di mana bidang data digunakan untuk kode kontrak.
- Execution of a contract: a transaction that interacts with a deployed smart contract. In this case, 'to' address is the smart contract address.

### Tentang gas {#on-gas}

Seperti yang disebutkan, transaksi memerlukan [gas](/developers/docs/gas/) untuk dijalankan. Transaksi transfer sederhana membutuhkan 21.000 unit Gas.

Jadi agar Bob dapat mengirimkan kepada Alice 1 ETH dengan `baseFeePerGas` sebesar 190 gwei dan `maxPriorityFeePerGas` sebesar 10 gwei, Bob harus membayar biaya berikut:

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

Akun Bob akan didebit **-1,0042 ETH**

Akun Alice akan dikredit **+1,0 ETH**

Biaya pokoknya akan terbakar **-0,00399 ETH**

Penambang menerima tips **+0,000210 ETH**

Gas juga dibutuhkan untuk interaksi kontrak pintar mana pun.

![Diagram menunjukkan cara mengembalikan dana gas yang tidak terpakai](./gas-tx.png) _Diagram diadaptasi dari [Ethereum EVM yang diilustrasikan](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gas yang tidak digunakan dalam transaksi dikembalikan dananya ke akun pengguna.

## Siklus hidup transaksi {#transaction-lifecycle}

Setelah transaksi dikirimkan, proses berikut terjadi:

1. Setelah Anda mengirim transaksi, kriptografi menghasilkan hash transaksi: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Transaksi kemudian disiarkan ke jaringan dan dimasukkan ke dalam satu pool berisi banyak transaksi lainnya.
3. Penambang harus memilih transaksi Anda dan memasukkannya ke dalam blok untuk memverifikasi transaksi dan menganggapnya "berhasil".
   - Anda mungkin akan menunggu di fase ini jika jaringan sibuk dan penambang tidak dapat menyamakan kecepatan pemrosesan dengan permintaan.
4. Transaksi Anda akan menerima "konfirmasi". Jumlah konfirmasi adalah jumlah blok yang dibuat sejak blok yang dimasukkan ke dalam transaksi Anda. Semakin tinggi angkanya, semakin besar kepastian transaksinya diproses dan dikenali oleh jaringan.
   - Blok baru mungkin diatur ulang, yang memberi kesan bahwa transaksi tidak berhasil; namun, transaksi masih mungkin valid tapi dimasukkan dalam blok yang berbeda.
   - Kemungkinan pengaturan ulang berkurang seiring ditambangnya blok berikutnya, yaitu semakin besar jumlah konfirmasinya, semakin tidak dapat diubah transaksinya.

## Demo visual {#a-visual-demo}

Tonton Austin memandu Anda dalam transaksi, gas, dan penambangan.

<YouTube id="er-0ihqFQB0" />

## Transaksi Bertipe Amplop {#typed-transaction-envelope}

Ethereum pada awalnya memiliki satu format transaksi. Setiap transaksi berisi nonce, harga gas, batas gas, alamat kepada, nilai, data, v, r, dan s. Bidang ini dikodekan RLP, agar terlihat seperti ini:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum telah berkembang untuk mendukung beberapa jenis transaksi agar memungkinkan fitur baru seperti daftar akses dan [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) diimplementasikan tanpa memengaruhi format transaksi warisan.

[EIP-2718: Transaksi Berjenis Amplop](https://eips.ethereum.org/EIPS/eip-2718) mendefiniskan jenis transaksi berupa amplop untuk jenis transaksi di masa mendatang.

EIP-2718 adalah amplop umum baru untuk transaksi bertipe. Dalam standar baru, transaksi diartikan sebagai:

`TransactionType || TransactionPayload`

Di mana bidang ini didefinisikan sebagai:

- `TransactionType` - angka antara 0 dan 0x7f, untuk total 128 jenis transaksi yang dimungkinkan.
- `TransactionPayload` - array bita arbitrari yang ditentukan oleh jenis transaksi.

## Bacaan lebih lanjut {#further-reading}

- [EIP-2718: Transaksi Bertipe Amplop](https://eips.ethereum.org/EIPS/eip-2718)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Akun](/developers/docs/accounts/)
- [Mesin virtual Ethereum (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)
- [Penambangan](/developers/docs/consensus-mechanisms/pow/mining/)
