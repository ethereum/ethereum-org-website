---
title: Memanggil kontrak pintar dari JavaScript
description: Cara memanggil fungsi kontrak pintar dari JavaScript menggunakan contoh token Dai
author: jdourlens
tags: [ "transaksi", "frontend", "JavaScript", "web3.js" ]
skill: beginner
lang: id
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam tutorial ini kita akan melihat cara memanggil fungsi [kontrak pintar](/developers/docs/smart-contracts/) dari JavaScript. Pertama adalah membaca state dari sebuah kontrak pintar (misalnya, saldo pemegang ERC20), lalu kita akan mengubah state dari rantai blok dengan membuat transfer token. Anda seharusnya sudah memahami cara [menyiapkan lingkungan JS untuk berinteraksi dengan rantai blok](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Untuk contoh ini kita akan menggunakan token DAI, untuk tujuan pengujian kita akan melakukan fork rantai blok menggunakan ganache-cli dan membuka alamat yang sudah memiliki banyak DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Untuk berinteraksi dengan kontrak pintar, kita akan memerlukan alamat dan ABI-nya:

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

Untuk proyek ini kami menyederhanakan ABI ERC20 lengkap untuk hanya menyisakan fungsi `balanceOf` dan `transfer` tetapi Anda dapat menemukan [ABI ERC20 lengkapnya di sini](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

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

Di bagian selanjutnya kita akan memanggil fungsi `balanceOf` untuk mengambil jumlah token saat ini yang dimiliki kedua alamat tersebut.

## Panggilan: Membaca nilai dari kontrak pintar {#call-reading-value-from-a-smart-contract}

Contoh pertama akan memanggil metode "konstan" dan mengeksekusi metode kontrak pintarnya di dalam EVM tanpa mengirimkan transaksi apa pun. Untuk ini, kita akan membaca saldo ERC20 dari sebuah alamat. [Baca artikel kami tentang token ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Anda dapat mengakses metode kontrak pintar yang diinstansiasi yang telah Anda berikan ABI-nya sebagai berikut: `yourContract.methods.methodname`. Dengan menggunakan fungsi `call` Anda akan menerima hasil dari eksekusi fungsi tersebut.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("Terjadi kesalahan", err)
    return
  }
  console.log("Saldonya adalah: ", res)
})
```

Ingat bahwa DAI ERC20 memiliki 18 desimal yang berarti Anda perlu menghapus 18 angka nol untuk mendapatkan jumlah yang benar. uint256 dikembalikan sebagai string karena JavaScript tidak menangani nilai numerik yang besar. Jika Anda tidak yakin [cara menangani angka besar di JS, lihat tutorial kami tentang bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Kirim: Mengirimkan transaksi ke fungsi kontrak pintar {#send-sending-a-transaction-to-a-smart-contract-function}

Untuk contoh kedua kita akan memanggil fungsi transfer dari kontrak pintar DAI untuk mengirim 10 DAI ke alamat kedua kita. Fungsi transfer menerima dua parameter: alamat penerima dan jumlah token yang ditransfer:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("Terjadi sebuah kesalahan", err)
      return
    }
    console.log("Hash dari transaksi: " + res)
  })
```

Fungsi call mengembalikan hash transaksi yang akan ditambang ke dalam rantai blok. Di Ethereum, hash transaksi dapat diprediksi - begitulah cara kita bisa mendapatkan hash transaksi sebelum dieksekusi ([pelajari cara penghitungan hash di sini](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Karena fungsi hanya mengirimkan transaksi ke rantai blok, kita tidak dapat melihat hasilnya sampai kita tahu kapan transaksi itu ditambang dan dimasukkan ke dalam rantai blok. Dalam tutorial berikutnya, kita akan mempelajari [cara menunggu transaksi dieksekusi di rantai blok dengan mengetahui hash-nya](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
