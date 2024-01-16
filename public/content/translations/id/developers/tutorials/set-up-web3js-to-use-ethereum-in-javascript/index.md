---
title: Menyiapkan web3.js untuk menggunakan blockchain Ethereum di JavaScript
description: Cara menggunakan kontrak pintar untuk berinteraksi dengan token menggunakan bahasa Solidity
author: "jdourlens"
tags:
  - "web3.js"
  - "javascript"
skill: beginner
lang: id
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam tutorial ini, kita akan melihat cara memulai [web3.js](https://web3js.readthedocs.io/) untuk berinteraksi dengan blockchain Ethereum. Web3.js dapat digunakan baik di frontend maupun backend untuk membaca data dari blockchain atau membuat transaksi dan bahkan menggunakan kontrak pintar.

Langkah pertama adalah memasukkan web3.js dalam proyek Anda. Untuk menggunakannya dalam halaman web, Anda dapat mengimpor pustakanya secara langsung menggunakan CDN seperti JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Jika Anda lebih suka menginstal pustaka untuk menggunakannya di backend Anda atau proyek frontend yang menggunakan build, Anda dapat menginstalnya menggunakan npm:

```bash
npm install web3 --save
```

Then to import Web3.js into a Node.js script or Browserify frontend project, you can use the following line of JavaScript:

```js
const Web3 = require("web3")
```

Karena kita memasukkan pustaka dalam proyek, kita perlu menginisialisasinya. Your project needs to be able to communicate with the blockchain. Kebanyakan pustaka Ethereum berkomunikasi dengan [node](/developers/docs/nodes-and-clients/) melalui pemanggilan RPC. To initiate our Web3 provider, we’ll instantiate a Web3 instance passing as the constructor the URL of the provider. Jika Anda memiliki node atau [instance ganache yang beroperasi di komputer Anda](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) itu akan tampak seperti ini:

```js
const web3 = new Web3("http://localhost:8545")
```

If you’d like to directly access a hosted node you can use Infura or the free ones provided by [Cloudflare](https://cloudflare-eth.com/):

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

To test that we correctly configured our Web3 instance, we’ll try to retrieve the latest block number using the `getBlockNumber` function. This function accepts a callback as a parameter and returns the block number as an integer.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Jika Anda mengeksekusi program ini, ini hanya akan mencetak nomor blok terakhir: bagian teratas dari blockchain. You can also use `await/async` function calls to avoid nesting callbacks in your code:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

You can see all the functions available on the Web3 instance in [the official web3.js documentation](https://docs.web3js.org/).

Kebanyakan dari pustaka Web3 bersifat asinkron karena pada latar belakang, pustaka membuat JSON RPC memanggil node yang mengirimkan kembali hasilnya.

<Divider />

If you are working in the browser, some wallets directly inject a Web3 instance and you should try to use it whenever possible especially if you plan to interact with the user’s Ethereum address to make transactions.

Here is the snippet to detect if a MetaMask wallet is available and try to enable it if it is. Nantinya dompet ini akan memungkinkan Anda membaca saldo pengguna dan mengaktifkannya untuk memvalidasi transaksi yang Anda ingin dilakukannya di blockchain Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Request account access if needed
    await window.ethereum.enable()
    // Acccounts now exposed
  } catch (error) {
    // User denied account access...
  }
}
```

Alternatif untuk web3.js seperti [Ethers.js](https://docs.ethers.io/) memang ada tetapi kami akan memfokuskan semua tutorial JavaScript kami untuk web3.js karena ini adalah pustaka resmi untuk berinteraksi dengan Ethereum di browser. Dalam tutorial berikutnya, kita akan melihat [cara mudah untuk mendengar blok yangbaru masuk di blockchain dan melihat apa isinya](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
