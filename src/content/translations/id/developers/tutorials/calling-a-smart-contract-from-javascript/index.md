---
title: Memanggil kontrak pintar dari JavaScript
description: Cara memanggil fungsi kontrak pintar dari JavaScript menggunakan contoh token Dai
author: jdourlens
tags:
  - "transaksi"
  - "frontend"
  - "JavaScript"
  - "web3.js"
skill: beginner
lang: id
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam panduan ini kita akan melihat bagaimana cara memanggil fungsi [kontrak pintar](/developers/docs/smart-contracts/) dari JavaScript. Yang pertama adalah membaca state kontrak pintar (mis. saldo pemilik ERC20), kemudian kita akan mengubah state blockchain tersebut dengan membuat transfer token. Anda seharusnya sudah tidak asing lagi dengan [menyiapkan lingkungan JS untuk berinteraksi dengan blockchain](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Untuk contoh ini kita akan menggunakan token DAI, untuk kepentingan pengujian kita akan melakukan fork blockchain menggunakan ganache-cli dan membuka alamat yang sudah memiliki banyak DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Untuk berinteraksi dengan kontrak pintar kita membutuhkan alamat dan ABI-nya:

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

Untuk proyek ini kita membongkar ABI ERC20 yang sudah lengkap dan hanya menyisakan fungsi `balanceOf` dan `transfer` tapi Anda bisa menemukan [ABI ERC20 yang lengkap di sini](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Kita kemudian perlu membuat instance kontrak pintarnya:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Kita juga akan menyiapkan dua alamat:

- satu yang akan menerima transfer dan
- satu yang kita buka sebelumnya sebagai pengirim:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Selanjutnya kita akan memanggil fungsi `balanceOf` untuk mengambil jumlah token saat ini yang dimiliki kedua alamat tersebut.

## Call: Membaca nilai dari kontrak pintar {#call-reading-value-from-a-smart-contract}

Contoh pertama akan memanggil metode "konstan" dan mengeksekusi metode kontrak pintarnya dalam EVM tanpa mengirim transaksi apa pun. Untuk ini, kita akan membaca saldo ERC20 dari sebuah alamat. [Baca artikel kami tentang token ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Anda dapat mengakses metode kontrak pintar beserta instancenya yang untuknya Anda menyediakan ABI sebagai berikut: `yourContract.methods.methodname`. Dengan menggunakan fungsi `call` Anda akan menerima hasil dari eksekusi fungsi.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occured", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Ingat bahwa ERC20 DAI memliki 18 desimal yang berarti Anda harus menghapus 18 nol untuk mendapatkan hasil yang benar. uint256 are returned as strings as JavaScript does not handle big numeric values. Apabila Anda tidak yakin [cara menangani angka besar dalam JS, lihat tutorial tentang bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Kirim: Mengirim transaksi kepada fungsi kontrak pintar {#send-sending-a-transaction-to-a-smart-contract-function}

Untuk contoh kedua kita akan memanggil fungsi transfer dari kontrak pintar DAI untuk mengirim 10 DAI ke alamat kedua kita. Fungsi transfer menerima dua parameter: alamat penerima dan jumlah token yang ditransfer:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occured", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

Fungsi call mengembalikan hash transaksi yang akan ditambang ke dalam blockchain. Di Ethereum, hash transaksi dapat diperkirakan - itulah cara kita bisa mendapatkan hash transaksi sebelum eksekusinya ([pelajari cara menghitung hash di sini](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Karena fungsi hanya mengirimkan transaksi ke dalam blockchain, kita tidak dapat melihat hasilnya sampai kita tahu kapan transaksi ditambang dan dimasukkan ke dalam blockchain. Dalam tutorial selanjutnya kita akan mempelajari [bagaimana cara menunggu transaksi agar dieksekusi dalam blockchain dengan mengetahui hashnya](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
