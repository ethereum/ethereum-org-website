---
title: Menyiapkan web3.js untuk menggunakan blockchain Ethereum di JavaScript
description: Pelajari cara menyiapkan dan mengonfigurasi pustaka web3.js untuk berinteraksi dengan blockchain Ethereum dari aplikasi JavaScript.
author: "jdourlens"
tags: [ "web3.js", "javascript" ]
skill: beginner
lang: id
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam tutorial ini, kita akan melihat cara memulai [web3.js](https://web3js.readthedocs.io/) untuk berinteraksi dengan blockchain Ethereum. Web3.js dapat digunakan baik di frontend maupun backend untuk membaca data dari blockchain atau membuat transaksi dan bahkan menyebarkan kontrak pintar.

Langkah pertama adalah memasukkan web3.js dalam proyek Anda. Untuk menggunakannya di halaman web, Anda dapat mengimpor pustaka secara langsung menggunakan CDN seperti JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Jika Anda lebih suka menginstal pustaka untuk digunakan di backend Anda atau proyek frontend yang menggunakan build, Anda dapat menginstalnya menggunakan npm:

```bash
npm install web3 --save
```

Kemudian untuk mengimpor Web3.js ke dalam skrip Node.js atau proyek frontend Browserify, Anda dapat menggunakan baris JavaScript berikut:

```js
const Web3 = require("web3")
```

Sekarang kita telah memasukkan pustaka ke dalam proyek, kita perlu menginisialisasinya. Proyek Anda harus dapat berkomunikasi dengan blockchain. Sebagian besar pustaka Ethereum berkomunikasi dengan [simpul](/developers/docs/nodes-and-clients/) melalui panggilan RPC. Untuk menginisiasi penyedia Web3 kita, kita akan menginstansiasi instance Web3 dengan meneruskan URL penyedia sebagai konstruktor. Jika Anda memiliki simpul atau [instance ganache yang berjalan di komputer Anda](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), itu akan terlihat seperti ini:

```js
const web3 = new Web3("http://localhost:8545")
```

Jika Anda ingin mengakses langsung simpul yang dihosting, Anda dapat menemukan opsi di [simpul sebagai layanan](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Untuk menguji bahwa kita telah mengonfigurasi instance Web3 kita dengan benar, kita akan mencoba mengambil nomor blok terbaru menggunakan fungsi `getBlockNumber`. Fungsi ini menerima callback sebagai parameter dan mengembalikan nomor blok sebagai bilangan bulat.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Jika Anda mengeksekusi program ini, itu hanya akan mencetak nomor blok terakhir: bagian teratas dari blockchain. Anda juga dapat menggunakan panggilan fungsi `await/async` untuk menghindari callback bersarang di kode Anda:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Anda dapat melihat semua fungsi yang tersedia pada instance Web3 di [dokumentasi resmi web3.js](https://docs.web3js.org/).

Sebagian besar pustaka Web3 bersifat asinkron karena di latar belakang, pustaka membuat panggilan JSON-RPC ke simpul yang mengirimkan kembali hasilnya.

<Divider />

Jika Anda bekerja di peramban, beberapa dompet secara langsung menyuntikkan instance Web3 dan Anda harus mencoba menggunakannya sedapat mungkin, terutama jika Anda berencana untuk berinteraksi dengan alamat Ethereum pengguna untuk melakukan transaksi.

Berikut ini adalah cuplikan untuk mendeteksi apakah dompet MetaMask tersedia dan mencoba mengaktifkannya jika ada. Nantinya, ini akan memungkinkan Anda membaca saldo pengguna dan memungkinkan mereka memvalidasi transaksi yang ingin Anda minta mereka lakukan di blockchain Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Minta akses akun jika diperlukan
    await window.ethereum.enable()
    // Akun sekarang terekspos
  } catch (error) {
    // Pengguna menolak akses akun...
  }
}
```

Alternatif untuk web3.js seperti [Ethers.js](https://docs.ethers.io/) memang ada dan juga umum digunakan. Di tutorial berikutnya, kita akan melihat [cara mudah mendengarkan blok baru yang masuk di blockchain dan melihat apa isinya](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
