---
title: Transaksi
description: "Gambaran umum tentang transaksi Ethereum – cara kerjanya, struktur datanya, dan cara mengirimkannya melalui aplikasi."
lang: id
---

Transaksi adalah instruksi yang ditandatangani secara kriptografis dari akun. Sebuah akun akan menginisiasi transaksi untuk memperbarui state dari jaringan [Ethereum](/). Transaksi yang paling sederhana adalah mentransfer ETH dari satu akun ke akun lainnya.

## Prasyarat {#prerequisites}

Untuk membantu Anda memahami halaman ini dengan lebih baik, kami sarankan Anda membaca terlebih dahulu tentang [Akun](/developers/docs/accounts/) dan [pengantar Ethereum](/developers/docs/intro-to-ethereum/) kami.

## Apa itu transaksi? {#whats-a-transaction}

Transaksi Ethereum merujuk pada tindakan yang diinisiasi oleh akun yang dimiliki secara eksternal (externally-owned account), dengan kata lain akun yang dikelola oleh manusia, bukan kontrak. Misalnya, jika Bob mengirimkan 1 ETH kepada Alice, akun Bob harus didebit dan akun Alice harus dikredit. Tindakan yang mengubah state ini terjadi di dalam sebuah transaksi.

![Diagram showing a transaction cause state change](./tx.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Transaksi, yang mengubah state EVM, perlu disiarkan ke seluruh jaringan. Setiap node dapat menyiarkan permintaan agar transaksi dieksekusi di EVM; setelah ini terjadi, validator akan mengeksekusi transaksi dan menyebarkan perubahan state yang dihasilkan ke seluruh jaringan.

Transaksi memerlukan biaya dan harus disertakan dalam blok yang divalidasi. Untuk membuat gambaran umum ini lebih sederhana, kami akan membahas biaya gas dan validasi di tempat lain.

Transaksi yang dikirimkan mencakup informasi berikut:

- `from` – alamat pengirim, yang akan menandatangani transaksi. Ini akan menjadi akun yang dimiliki secara eksternal karena akun kontrak tidak dapat mengirim transaksi
- `to` – alamat penerima (jika akun yang dimiliki secara eksternal, transaksi akan mentransfer nilai. Jika akun kontrak, transaksi akan mengeksekusi kode kontrak)
- `signature` – pengidentifikasi pengirim. Ini dihasilkan ketika kunci privat pengirim menandatangani transaksi dan mengonfirmasi bahwa pengirim telah mengotorisasi transaksi ini
- `nonce` - penghitung yang meningkat secara berurutan yang menunjukkan nomor transaksi dari akun tersebut
- `value` – jumlah ETH yang akan ditransfer dari pengirim ke penerima (dalam denominasi Wei, di mana 1 ETH sama dengan 1e+18 Wei)
- `input data` – bidang opsional untuk menyertakan data arbitrer
- `gasLimit` – jumlah maksimum unit gas yang dapat dikonsumsi oleh transaksi. [EVM](/developers/docs/evm/opcodes) menentukan unit gas yang diperlukan oleh setiap langkah komputasi
- `maxPriorityFeePerGas` - harga maksimum dari gas yang dikonsumsi untuk disertakan sebagai tip kepada validator
- `maxFeePerGas` - biaya maksimum per unit gas yang bersedia dibayarkan untuk transaksi (termasuk `baseFeePerGas` dan `maxPriorityFeePerGas`)

Gas adalah referensi ke komputasi yang diperlukan untuk memproses transaksi oleh validator. Pengguna harus membayar biaya untuk komputasi ini. `gasLimit`, dan `maxPriorityFeePerGas` menentukan biaya transaksi maksimum yang dibayarkan kepada validator. [Lebih lanjut tentang Gas](/developers/docs/gas/).

Objek transaksi akan terlihat sedikit seperti ini:

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

Namun, objek transaksi perlu ditandatangani menggunakan kunci privat pengirim. Ini membuktikan bahwa transaksi hanya bisa berasal dari pengirim dan tidak dikirim secara curang.

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

Contoh respons:

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

- `raw` adalah transaksi yang ditandatangani dalam bentuk yang dienkode [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp)
- `tx` adalah transaksi yang ditandatangani dalam bentuk JSON

Dengan hash tanda tangan, transaksi dapat dibuktikan secara kriptografis bahwa itu berasal dari pengirim dan dikirimkan ke jaringan.

### Bidang data {#the-data-field}

Sebagian besar transaksi mengakses kontrak dari akun yang dimiliki secara eksternal.
Sebagian besar kontrak ditulis dalam Solidity dan menafsirkan bidang datanya sesuai dengan [antarmuka biner aplikasi (ABI)](/glossary/#abi).

Empat bita pertama menentukan fungsi mana yang akan dipanggil, menggunakan hash dari nama fungsi dan argumennya.
Anda terkadang dapat mengidentifikasi fungsi dari pemilih (selector) menggunakan [basis data ini](https://www.4byte.directory/signatures/).

Sisa dari data panggilan adalah argumen, [dienkode seperti yang ditentukan dalam spesifikasi ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Sebagai contoh, mari kita lihat [transaksi ini](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Gunakan **Click to see More** untuk melihat data panggilan.

Pemilih fungsi adalah `0xa9059cbb`. Ada beberapa [fungsi yang diketahui dengan tanda tangan ini](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
Dalam kasus ini [kode sumber kontrak](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) telah diunggah ke Etherscan, jadi kita tahu fungsinya adalah `transfer(address,uint256)`.

Sisa datanya adalah:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Menurut spesifikasi ABI, nilai bilangan bulat (seperti alamat, yang merupakan bilangan bulat 20 bita) muncul di ABI sebagai kata 32 bita, diisi dengan nol di bagian depan.
Jadi kita tahu bahwa alamat `to` adalah [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
`value` adalah 0x3b0559f4 = 990206452.

### Deskriptor transaksi {#transaction-descriptors}

Karena bidang data berisi bita heksadesimal yang tidak jelas, bisa sangat sulit untuk memverifikasi tindakan apa yang sebenarnya akan dilakukan oleh suatu transaksi. Kerentanan "penandatanganan buta" (blind signing) ini diatasi oleh **[Clear Signing](https://clearsigning.org/)** melalui penggunaan [deskriptor transaksi](https://eips.ethereum.org/EIPS/eip-7730) (didefinisikan oleh ERC-7730).  

Spesifikasi ERC-7730 menggunakan deskriptor transaksi (sering kali disusun sebagai file JSON) untuk memperkaya data yang ditemukan dalam ABI dan pesan terstruktur, seperti data panggilan transaksi EVM, pesan EIP-712, dan Operasi Pengguna EIP-4337. Pengembang menggunakan deskriptor ini untuk memetakan variabel transaksi tertentu secara langsung ke dalam templat pemformatan, memastikan data yang mendasarinya tetap dapat dibaca oleh mesin untuk aplikasi.

Di sisi frontend, dompet menggunakan konteks pemformatan ini untuk menerjemahkan kode bita yang tidak jelas menjadi informasi yang jelas dan dapat dibaca manusia. Dengan secara otomatis menyelesaikan nilai seperti alamat token menjadi ticker yang dikenali, atau jumlah menjadi desimal, pengguna disajikan dengan ringkasan bahasa sederhana dari intensi pasti transaksi (misalnya, 'Tukar 1000 USDC dengan setidaknya 0,25 WETH') sebelum mereka menandatangani

## Jenis-jenis transaksi {#types-of-transactions}

Di Ethereum ada beberapa jenis transaksi yang berbeda:

- Transaksi reguler: transaksi dari satu akun ke akun lainnya.
- Transaksi penyebaran kontrak: transaksi tanpa alamat 'to' (tujuan), di mana bidang data digunakan untuk kode kontrak.
- Eksekusi kontrak: transaksi yang berinteraksi dengan kontrak pintar yang disebarkan. Dalam kasus ini, alamat 'to' adalah alamat kontrak pintar.

### Tentang gas {#on-gas}

Seperti yang disebutkan, transaksi memerlukan biaya [gas](/developers/docs/gas/) untuk dieksekusi. Transaksi transfer sederhana memerlukan 21000 unit Gas.

Jadi agar Bob dapat mengirimkan 1 ETH kepada Alice dengan `baseFeePerGas` sebesar 190 Gwei dan `maxPriorityFeePerGas` sebesar 10 Gwei, Bob harus membayar biaya berikut:

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

Akun Bob akan didebit **-1,0042 ETH** (1 ETH untuk Alice + 0,0042 ETH dalam biaya gas)

Akun Alice akan dikredit **+1,0 ETH**

Biaya dasar akan dibakar **-0,00399 ETH**

Validator menyimpan tip **+0,000210 ETH**


![Diagram showing how unused gas is refunded](./gas-tx.png)
_Diagram diadaptasi dari [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Setiap gas yang tidak digunakan dalam transaksi akan dikembalikan ke akun pengguna.

### Interaksi kontrak pintar {#smart-contract-interactions}

Gas diperlukan untuk setiap transaksi yang melibatkan kontrak pintar.

Kontrak pintar juga dapat berisi fungsi yang dikenal sebagai fungsi [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) atau [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), yang tidak mengubah state kontrak. Oleh karena itu, memanggil fungsi-fungsi ini dari EOA tidak akan memerlukan gas apa pun. Panggilan RPC yang mendasari untuk skenario ini adalah [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

Tidak seperti saat diakses menggunakan `eth_call`, fungsi `view` atau `pure` ini juga umumnya dipanggil secara internal (yaitu, dari kontrak itu sendiri atau dari kontrak lain) yang memerlukan biaya gas.

## Siklus hidup transaksi {#transaction-lifecycle}

Setelah transaksi dikirimkan, hal berikut terjadi:

1. Hash transaksi dihasilkan secara kriptografis:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Transaksi kemudian disiarkan ke jaringan dan ditambahkan ke pool transaksi yang terdiri dari semua transaksi jaringan lain yang tertunda.
3. Validator harus memilih transaksi Anda dan menyertakannya dalam sebuah blok untuk memverifikasi transaksi dan menganggapnya "berhasil".
4. Seiring berjalannya waktu, blok yang berisi transaksi Anda akan ditingkatkan menjadi "terjustifikasi" kemudian "difinalisasi". Peningkatan ini membuatnya jauh lebih pasti bahwa transaksi Anda berhasil dan tidak akan pernah diubah. Setelah sebuah blok "difinalisasi", blok tersebut hanya dapat diubah oleh serangan tingkat jaringan yang akan menelan biaya miliaran dolar.

## Demo visual {#a-visual-demo}

Tonton Austin memandu Anda melalui transaksi, gas, dan penambangan.

<VideoWatch slug="transactions-eth-build" />

## Amplop Transaksi Bertipe {#typed-transaction-envelope}

Ethereum pada awalnya memiliki satu format untuk transaksi. Setiap transaksi berisi nonce, harga gas, batas gas, alamat tujuan (to), nilai, data, v, r, dan s. Bidang-bidang ini [dienkode RLP](/developers/docs/data-structures-and-encoding/rlp/), sehingga terlihat seperti ini:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum telah berevolusi untuk mendukung berbagai jenis transaksi guna memungkinkan fitur-fitur baru seperti daftar akses dan [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) diimplementasikan tanpa memengaruhi format transaksi lama.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) adalah apa yang memungkinkan perilaku ini. Transaksi ditafsirkan sebagai:

`TransactionType || TransactionPayload`

Di mana bidang-bidang tersebut didefinisikan sebagai:

- `TransactionType` - angka antara 0 dan 0x7f, dengan total 128 kemungkinan jenis transaksi.
- `TransactionPayload` - array bita arbitrer yang ditentukan oleh jenis transaksi.

Berdasarkan nilai `TransactionType`, transaksi dapat diklasifikasikan sebagai:

1. **Transaksi Tipe 0 (Lama):** Format transaksi asli yang digunakan sejak peluncuran Ethereum. Transaksi ini tidak menyertakan fitur dari [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) seperti perhitungan biaya gas dinamis atau daftar akses untuk kontrak pintar. Transaksi lama tidak memiliki awalan spesifik yang menunjukkan jenisnya dalam bentuk serialnya, dimulai dengan bita `0xf8` saat menggunakan pengodean [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp). Nilai TransactionType untuk transaksi ini adalah `0x0`.

2. **Transaksi Tipe 1:** Diperkenalkan dalam [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) sebagai bagian dari [Pembaruan Berlin](/ethereum-forks/#berlin) Ethereum, transaksi ini menyertakan parameter `accessList`. Daftar ini menentukan alamat dan kunci penyimpanan yang diharapkan akan diakses oleh transaksi, membantu berpotensi mengurangi biaya [gas](/developers/docs/gas/) untuk transaksi kompleks yang melibatkan kontrak pintar. Perubahan pasar biaya EIP-1559 tidak disertakan dalam transaksi Tipe 1. Transaksi Tipe 1 juga menyertakan parameter `yParity`, yang dapat berupa `0x0` atau `0x1`, yang menunjukkan paritas nilai y dari tanda tangan secp256k1. Transaksi ini diidentifikasi dengan awalan bita `0x01`, dan nilai TransactionType-nya adalah `0x1`.

3. **Transaksi Tipe 2**, umumnya disebut sebagai transaksi EIP-1559, adalah transaksi yang diperkenalkan dalam [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), pada [Pembaruan London](/ethereum-forks/#london) Ethereum. Transaksi ini telah menjadi jenis transaksi standar di jaringan Ethereum. Transaksi ini memperkenalkan mekanisme pasar biaya baru yang meningkatkan prediktabilitas dengan memisahkan biaya transaksi menjadi biaya dasar dan biaya prioritas. Transaksi ini dimulai dengan bita `0x02` dan menyertakan bidang seperti `maxPriorityFeePerGas` dan `maxFeePerGas`. Transaksi Tipe 2 sekarang menjadi default karena fleksibilitas dan efisiensinya, terutama disukai selama periode kemacetan jaringan yang tinggi karena kemampuannya membantu pengguna mengelola biaya transaksi dengan lebih dapat diprediksi. Nilai TransactionType untuk transaksi ini adalah `0x2`.

4. **Transaksi Tipe 3 (Blob)** diperkenalkan dalam [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) sebagai bagian dari [pembaruan Dencun](/ethereum-forks/#dencun) Ethereum. Transaksi ini dirancang untuk menangani data "blob" (Binary Large Objects) dengan lebih efisien, khususnya menguntungkan rollup lapisan 2 (l2) dengan menyediakan cara untuk memposting data ke jaringan Ethereum dengan biaya yang lebih rendah. Transaksi blob menyertakan bidang tambahan seperti `blobVersionedHashes`, `maxFeePerBlobGas`, dan `blobGasPrice`. Transaksi ini dimulai dengan bita `0x03`, dan nilai TransactionType-nya adalah `0x3`. Transaksi blob mewakili peningkatan signifikan dalam ketersediaan data dan kemampuan penskalaan Ethereum.

5. **Transaksi Tipe 4** diperkenalkan dalam [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) sebagai bagian dari [Pembaruan Pectra](/roadmap/pectra/) Ethereum. Transaksi ini dirancang agar kompatibel ke depan dengan abstraksi akun. Transaksi ini memungkinkan EOA untuk sementara berperilaku seperti akun kontrak pintar tanpa mengorbankan fungsionalitas aslinya. Transaksi ini menyertakan parameter `authorization_list`, yang menentukan kontrak pintar tempat EOA mendelegasikan otoritasnya. Setelah transaksi, bidang kode EOA akan memiliki alamat kontrak pintar yang didelegasikan.

## Bacaan lebih lanjut {#further-reading}

- [EIP-2718: Amplop Transaksi Bertipe](https://eips.ethereum.org/EIPS/eip-2718)

_Tahu sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Akun](/developers/docs/accounts/)
- [Mesin virtual Ethereum (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)