---
title: Memanggil kontrak pintar dari JavaScript
description: Cara memanggil fungsi kontrak pintar dari JavaScript menggunakan contoh token Dai
author: jdourlens
tags: ["transaksi", "frontend", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: "Panggil kontrak dari JS"
lang: id
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam tutorial ini kita akan melihat cara memanggil fungsi [kontrak pintar](/developers/docs/smart-contracts/) dari JavaScript. Pertama adalah membaca status kontrak pintar (misalnya, saldo pemegang ERC20), kemudian kita akan memodifikasi status blockchain dengan melakukan transfer token. Anda seharusnya sudah familier dengan [menyiapkan lingkungan JS untuk berinteraksi dengan blockchain](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Untuk contoh ini kita akan bermain dengan token DAI, untuk tujuan pengujian kita akan melakukan fork pada blockchain menggunakan ganache-cli dan membuka kunci alamat yang sudah memiliki banyak DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Untuk berinteraksi dengan kontrak pintar, kita akan membutuhkan alamat dan ABI-nya:

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

Untuk proyek ini, kami memangkas ABI ERC20 yang lengkap dan hanya menyimpan fungsi `balanceOf` dan `transfer`, tetapi Anda dapat menemukan [ABI ERC20 lengkap di sini](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Kita kemudian perlu menginstansiasi kontrak pintar kita:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Kita juga akan menyiapkan dua alamat:

- alamat yang akan menerima transfer dan
- alamat yang sudah kita buka kuncinya yang akan mengirimkannya:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Pada bagian selanjutnya, kita akan memanggil fungsi `balanceOf` untuk mengambil jumlah token saat ini yang dimiliki oleh kedua alamat tersebut.

## Panggilan: Membaca nilai dari kontrak pintar {#call-reading-value-from-a-smart-contract}

Contoh pertama akan memanggil metode "konstan" dan mengeksekusi metode kontrak pintarnya di EVM tanpa mengirimkan transaksi apa pun. Untuk ini, kita akan membaca saldo ERC20 dari sebuah alamat. [Baca artikel kami tentang token ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Anda dapat mengakses metode kontrak pintar yang diinstansiasi yang telah Anda berikan ABI-nya sebagai berikut: `yourContract.methods.methodname`. Dengan menggunakan fungsi `call`, Anda akan menerima hasil dari eksekusi fungsi tersebut.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Ingatlah bahwa DAI ERC20 memiliki 18 desimal yang berarti Anda perlu menghapus 18 nol untuk mendapatkan jumlah yang benar. uint256 dikembalikan sebagai string karena JavaScript tidak menangani nilai numerik yang besar. Jika Anda tidak yakin [cara menangani angka besar di JS, periksa tutorial kami tentang bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Kirim: Mengirim transaksi ke fungsi kontrak pintar {#send-sending-a-transaction-to-a-smart-contract-function}

Untuk contoh kedua, kita akan memanggil fungsi transfer dari kontrak pintar DAI untuk mengirim 10 DAI ke alamat kedua kita. Fungsi transfer menerima dua parameter: alamat penerima dan jumlah token yang akan ditransfer:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

Fungsi panggilan mengembalikan hash dari transaksi yang akan ditambang ke dalam blockchain. Di Ethereum, hash transaksi dapat diprediksi - begitulah cara kita bisa mendapatkan hash dari transaksi sebelum dieksekusi ([pelajari cara hash dihitung di sini](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Karena fungsi tersebut hanya mengirimkan transaksi ke blockchain, kita tidak dapat melihat hasilnya sampai kita tahu kapan transaksi tersebut ditambang dan dimasukkan ke dalam blockchain. Dalam tutorial berikutnya, kita akan belajar [cara menunggu transaksi dieksekusi di blockchain dengan mengetahui hash-nya](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).