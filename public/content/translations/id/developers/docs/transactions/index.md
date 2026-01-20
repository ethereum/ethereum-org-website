---
title: Transaksi
description: Gambaran umum tentang transaksi Ethereum – cara kerjanya, struktur datanya, dan cara mengirimnya melalui aplikasi.
lang: id
---

Transaksi adalah instruksi yang ditandatangani secara kriptografis dari akun. Akun akan menginisiasi transaksi untuk memperbarui state jaringan Ethereum. Bentuk transaksi paling sederhana adalah mentransfer ETH dari satu akun ke akun yang lain.

## Persyaratan {#prerequisites}

Untuk membantu Anda memahami halaman ini dengan lebih baik, kami sarankan Anda membaca [Akun](/developers/docs/accounts/) dan [pengantar kami tentang Ethereum](/developers/docs/intro-to-ethereum/) terlebih dahulu.

## Apa itu transaksi? {#whats-a-transaction}

Transaksi Ethereum mengacu pada aksi yang dimulai oleh akun dengan kepemilikan eksternal, dengan kata lain, akun yang dikelola oleh manusia, bukan kontrak. Sebagai contoh, jika Bob mengirimkan 1 ETH ke Alice, akun Bob harus didebit dan akun Alice harus dikredit. Aksi yang mengubah state ini terjadi dalam sebuah transaksi.

![Diagram yang menunjukkan transaksi menyebabkan perubahan keadaan](./tx.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Transaksi, yang mengubah state dari EVM, perlu disiarkan ke seluruh jaringan. Setiap node dapat menyiarkan permintaan untuk transaksi yang akan dieksekusi di EVM; setelah ini terjadi, validator akan mengeksekusi transaksi dan menyebarkan perubahan status yang dihasilkan ke seluruh jaringan.

Transaksi memerlukan biaya dan harus disertakan dalam blok yang divalidasi. Untuk menyederhanakan tinjauan ini, kami akan membahas biaya gas dan validasi di tempat lain.

Sebuah transaksi yang dikirim meliputi informasi berikut:

- `from` – alamat pengirim, yang akan menandatangani transaksi. Ini akan menjadi akun eksternal karena akun kontrak tidak dapat mengirim transaksi
- `to` – alamat penerima (jika sebuah akun milik eksternal, transaksi akan mentransfer nilai. Jika akun kontrak, transaksi akan mengeksekusi kode kontrak)
- `signature` – pengidentifikasi pengirim. Ini dihasilkan ketika kunci pribadi pengirim menandatangani transaksi dan mengonfirmasi bahwa pengirim telah mengesahkan transaksi ini
- `nonce` - penghitung yang bertambah secara berurutan yang menunjukkan nomor transaksi dari akun
- `value` – jumlah ETH yang akan ditransfer dari pengirim ke penerima (dinyatakan dalam WEI, di mana 1 ETH sama dengan 1e+18wei)
- `input data` – bidang opsional untuk menyertakan data arbitrer
- `gasLimit` – jumlah maksimum unit gas yang dapat dikonsumsi oleh transaksi. [EVM](/developers/docs/evm/opcodes) menentukan unit gas yang dibutuhkan oleh setiap langkah komputasi
- `maxPriorityFeePerGas` - harga maksimum dari gas yang dikonsumsi untuk dimasukkan sebagai tip kepada validator
- `maxFeePerGas` - biaya maksimum per unit gas yang bersedia dibayarkan untuk transaksi (termasuk `baseFeePerGas` dan `maxPriorityFeePerGas`)

Gas adalah referensi untuk perhitungan yang diperlukan untuk memproses transaksi oleh validator. Pengguna harus membayar biaya untuk komputasi ini. `gasLimit` dan `maxPriorityFeePerGas` menentukan biaya transaksi maksimum yang dibayarkan kepada validator. [Selengkapnya tentang Gas](/developers/docs/gas/).

Objek transaksi kurang lebih akan tampak seperti ini:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

Tapi satu objek transaksi harus ditandatangani menggunakan kunci privat pengirim. Ini membuktikan bahwa transaksi hanya bisa berasal dari pengirim dan bukan dikirim secara curang.

Klien Ethereum seperti Geth akan menangani proses penandatanganan ini.

Contoh panggilan [JSON-RPC](/developers/docs/apis/json-rpc):

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

- `raw` adalah transaksi yang ditandatangani dalam bentuk yang dikodekan [Prefiks Panjang Rekursif (RLP)](/developers/docs/data-structures-and-encoding/rlp)
- `tx` adalah transaksi yang ditandatangani dalam bentuk JSON

Dengan hash tanda tangan, transaksi bisa dibuktikan secara kriptografi berasal dari pengirim dan dikirim ke jaringan.

### Bidang data {#the-data-field}

Sebagian besar transaksi mengakses kontrak dari akun yang dimiliki secara eksternal.
Sebagian besar kontrak ditulis dalam Solidity dan menafsirkan bidang datanya sesuai dengan [antarmuka biner aplikasi (ABI)](/glossary/#abi).

Empat byte pertama menentukan fungsi mana yang akan dipanggil, dengan menggunakan hash dari nama fungsi dan argumen.
Anda terkadang dapat mengidentifikasi fungsi dari selektor menggunakan [database ini](https://www.4byte.directory/signatures/).

Sisa dari calldata adalah argumen, [dikodekan seperti yang ditentukan dalam spesifikasi ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Sebagai contoh, mari kita lihat [transaksi ini](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Gunakan **Klik untuk melihat Lebih Banyak** untuk melihat calldata.

Pemilih fungsinya adalah `0xa9059cbb`. Ada beberapa [fungsi yang diketahui dengan tanda tangan ini](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
Dalam kasus ini [kode sumber kontrak](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) telah diunggah ke Etherscan, jadi kita tahu fungsinya adalah `transfer(address,uint256)`.

Data lainnya adalah:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Menurut spesifikasi ABI, nilai bilangan bulat (seperti alamat, yang merupakan bilangan bulat 20-byte) muncul dalam ABI sebagai kata 32-byte, yang dilengkapi dengan angka nol di depannya.
Jadi kita tahu bahwa alamat `to` adalah [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
`value`nya adalah 0x3b0559f4 = 990206452.

## Jenis-jenis transaksi {#types-of-transactions}

Di Ethereum ada beberapa jenis transaksi yang berbeda:

- Transaksi reguler: transaksi dari satu rekening ke rekening lainnya.
- Transaksi penerapan kontrak: transaksi tanpa alamat 'kepada', di mana bidang data digunakan untuk kode kontrak.
- Eksekusi kontrak: transaksi yang berinteraksi dengan smart contract yang digunakan. Dalam hal ini, alamat 'to' adalah alamat smart contract.

### Tentang gas {#on-gas}

Seperti yang disebutkan, transaksi membutuhkan [gas](/developers/docs/gas/) untuk dieksekusi. Transaksi transfer sederhana membutuhkan 21000 unit Gas.

Jadi agar Bob dapat mengirim 1 ETH kepada Alice dengan `baseFeePerGas` 190 gwei dan `maxPriorityFeePerGas` 10 gwei, Bob harus membayar biaya berikut:

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

Akun Bob akan didebit **-1.0042 ETH** (1 ETH untuk Alice + 0.0042 ETH dalam biaya gas)

Akun Alice akan dikredit **+1.0 ETH**

Biaya dasar akan dibakar **-0.00399 ETH**

Validator menyimpan tip **+0.000210 ETH**

![Diagram yang menunjukkan bagaimana gas yang tidak terpakai dikembalikan](./gas-tx.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gas yang tidak digunakan dalam transaksi dikembalikan dananya ke akun pengguna.

### Interaksi kontrak pintar {#smart-contract-interactions}

Gas diperlukan untuk setiap transaksi yang melibatkan kontrak pintar.

Kontrak pintar juga dapat berisi fungsi yang dikenal sebagai fungsi [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) atau [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), yang tidak mengubah keadaan kontrak. Dengan demikian, memanggil fungsi-fungsi ini dari EOA tidak memerlukan gas. Panggilan RPC yang mendasari untuk skenario ini adalah [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

Tidak seperti saat diakses menggunakan `eth_call`, fungsi `view` atau `pure` ini juga biasa dipanggil secara internal (yaitu, dari kontrak itu sendiri atau dari kontrak lain) yang memang membutuhkan gas.

## Siklus hidup transaksi {#transaction-lifecycle}

Setelah transaksi dikirim, proses berikut terjadi:

1. Hash transaksi dibuat secara kriptografis:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Transaksi ini kemudian disiarkan ke jaringan dan ditambahkan ke kumpulan transaksi yang terdiri dari semua transaksi jaringan yang tertunda.
3. Validator harus memilih transaksi Anda dan memasukkannya ke dalam blok untuk memverifikasi transaksi dan menganggapnya "berhasil".
4. Seiring berjalannya waktu, blok yang berisi transaksi Anda akan ditingkatkan menjadi "dibenarkan" kemudian "diselesaikan". Peningkatan ini membuatnya jauh
   lebih pasti bahwa transaksi Anda berhasil dan tidak akan pernah diubah. Setelah sebuah blok "difinalisasi", blok tersebut hanya dapat diubah
   oleh serangan tingkat jaringan yang akan menelan biaya miliaran dolar.

## Demo visual {#a-visual-demo}

Tonton Austin memandu Anda dalam transaksi, gas, dan penambangan.

<YouTube id="er-0ihqFQB0" />

## Amplop Transaksi Berjenis {#typed-transaction-envelope}

Ethereum pada awalnya memiliki satu format transaksi. Setiap transaksi berisi nonce, harga gas, batas gas, alamat kepada, nilai, data, v, r, dan s. Bidang-bidang ini [dikodekan dengan RLP](/developers/docs/data-structures-and-encoding/rlp/), sehingga terlihat seperti ini:

`RLP([nonce, gasPrice, gasLimit, kepada, nilai, data, v, r, s])`

Ethereum telah berevolusi untuk mendukung berbagai jenis transaksi agar fitur baru seperti daftar akses dan [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) dapat diimplementasikan tanpa memengaruhi format transaksi lama.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) adalah yang memungkinkan perilaku ini. Transaksi diartikan sebagai:

`TransactionType || TransactionPayload`

Di mana bidang ini didefinisikan sebagai:

- `TransactionType` - angka antara 0 dan 0x7f, dengan total 128 jenis transaksi yang memungkinkan.
- `TransactionPayload` - array bita arbitrer yang ditentukan oleh jenis transaksi.

Berdasarkan nilai `TransactionType`, transaksi dapat diklasifikasikan sebagai:

1. **Transaksi Tipe 0 (Legacy):** Format transaksi asli yang digunakan sejak peluncuran Ethereum. Transaksi ini tidak menyertakan fitur dari [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) seperti perhitungan biaya gas dinamis atau daftar akses untuk kontrak pintar. Transaksi legacy tidak memiliki prefiks spesifik yang menunjukkan jenisnya dalam bentuk serial, dimulai dengan bita `0xf8` saat menggunakan pengodean [Prefiks Panjang Rekursif (RLP)](/developers/docs/data-structures-and-encoding/rlp). Nilai TransactionType untuk transaksi ini adalah `0x0`.

2. **Transaksi Tipe 1:** Diperkenalkan dalam [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) sebagai bagian dari [Peningkatan Berlin](/ethereum-forks/#berlin) Ethereum, transaksi ini menyertakan parameter `accessList`. Daftar ini menentukan alamat dan kunci penyimpanan yang diharapkan dapat diakses oleh transaksi, yang berpotensi membantu mengurangi biaya [gas](/developers/docs/gas/) untuk transaksi kompleks yang melibatkan kontrak pintar. Perubahan pasar biaya EIP-1559 tidak disertakan dalam transaksi Tipe 1. Transaksi Tipe 1 juga menyertakan parameter `yParity`, yang dapat berupa `0x0` atau `0x1`, yang menunjukkan paritas dari nilai-y dari tanda tangan secp256k1. Transaksi ini diidentifikasi dengan diawali dengan bita `0x01`, dan nilai TransactionType-nya adalah `0x1`.

3. **Transaksi Tipe 2**, yang biasa disebut sebagai transaksi EIP-1559, adalah transaksi yang diperkenalkan dalam [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), dalam [Peningkatan London](/ethereum-forks/#london) Ethereum. Mereka telah menjadi jenis transaksi standar pada jaringan Ethereum. Transaksi ini memperkenalkan mekanisme pasar biaya baru yang meningkatkan prediktabilitas dengan memisahkan biaya transaksi menjadi biaya dasar dan biaya prioritas. Transaksi ini dimulai dengan bita `0x02` dan mencakup bidang seperti `maxPriorityFeePerGas` dan `maxFeePerGas`. Transaksi Tipe 2 kini menjadi default karena fleksibilitas dan efisiensinya, terutama disukai saat jaringan padat karena kemampuannya membantu pengguna mengelola biaya transaksi secara lebih terprediksi. Nilai TransactionType untuk transaksi ini adalah `0x2`.

4. **Transaksi Tipe 3 (Blob)** diperkenalkan di [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) sebagai bagian dari [Peningkatan Dencun](/ethereum-forks/#dencun) Ethereum. Transaksi ini dirancang untuk menangani data "blob" (Binary Large Objects) secara lebih efisien, terutama menguntungkan Layer 2 rollup dengan menyediakan cara untuk mengirim data ke jaringan Ethereum dengan biaya lebih rendah. Transaksi blob mencakup bidang tambahan seperti `blobVersionedHashes`, `maxFeePerBlobGas`, dan `blobGasPrice`. Transaksi ini dimulai dengan bita `0x03`, dan nilai TransactionType-nya adalah `0x3`. Transaksi blob menunjukkan peningkatan signifikan dalam ketersediaan data dan kemampuan penskalaan Ethereum.

5. **Transaksi Tipe 4** diperkenalkan di [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) sebagai bagian dari [Peningkatan Pectra](/roadmap/pectra/) Ethereum. Transaksi ini dirancang agar kompatibel ke depan dengan abstraksi akun. Transaksi ini memungkinkan EOA untuk sementara berperilaku seperti akun kontrak pintar tanpa mengorbankan fungsionalitas aslinya. Transaksi ini mencakup parameter `authorization_list`, yang menentukan kontrak pintar tempat EOA mendelegasikan wewenangnya. Setelah transaksi, bidang kode EOA akan berisi alamat kontrak pintar yang didelegasikan.

## Bacaan lebih lanjut {#further-reading}

- [EIP-2718: Amplop Transaksi Berjenis](https://eips.ethereum.org/EIPS/eip-2718)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Akun](/developers/docs/accounts/)
- [Mesin Virtual Ethereum (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)
