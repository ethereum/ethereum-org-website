---
title: Cara Mencetak NFT (Bagian 2/3 dari Seri Tutorial NFT)
description: Tutorial ini mendeskripsikan cara mencetak NFT di rantai blok Ethereum menggunakan kontrak pintar dan Web3 kita.
author: "Sumi Mudgil"
tags:
  - "NFT"
  - "ERC-721"
  - "Alchemy"
  - "Solidity"
  - "kontrak pintar"
skill: beginner
lang: id
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 Juta [3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 Juta [Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 Juta

Semuanya mencetak NFT mereka menggunakan API efektif Alchemy. Dalam tutorial ini, kami akan mengajarkan Anda cara melakukan hal yang sama dalam waktu <10 menit.

"Mencetak NFT" adalah tindakan mempublikasikan instance unik dari token ERC-721 Anda di rantai blok. Dengan menggunakan kontrak pintar kita dari [Bagian 1 seri tutorial NFT ini](/developers/tutorials/how-to-write-and-deploy-an-nft/), mari gunakan kemampuan web3 kita dan cetak NFT. Pada akhir tutorial ini, Anda akan dapat mencetak sebanyak mungkin NFT sesuai keinginan (dan dompet) Anda!

Ayo mulai!

## Langkah 1: Instal web3 {#install-web3}

Jika Anda mengikuti tutorial pertama tentang membuat kontrak pintar NFT Anda, Anda telah memiliki pengalaman menggunakan Ethers.js. Web3 sama dengan Ethers, karena merupakan pustaka yang digunakan untuk membuat permintaan ke rantai blok Ethereum dengan lebih mudah. Dalam tutorial ini, kami akan menggunakan [Web3 Alchemy](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), yang merupakan pustaka web3 yang ditingkatkan yang menawarkan percobaan ulang otomatis dan dukungan WebSocket yang kokoh.

Dalam direktori beranda proyek Anda jalankan:

```
npm install @alch/alchemy-web3
```

## Langkah 2: Buat berkas mint-nft.js {#create-mintnftjs}

Inside your scripts directory, create a mint-nft.js file and add the following lines of code:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Langkah 3: Ambil ABI kontrak Anda {#contract-abi}

ABI (Antarmuka Biner Aplikasi) kontrak kita adalah antarmuka untuk berinteraksi dengan kontrak pintar kita. Anda dapat belajar lebih banyak tentang ABI Kontrak [di sini](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat secara otomatis membuat ABI untuk kita dan menyimpannya dalam berkas MyNFT.json. Untuk menggunakan ini, kita perlu mengurai kontennya dengan menambahkan barisan kode berikut ke berkas mint-nft.js kita:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Jika Anda ingin melihat ABInya, Anda dapat mencetaknya di konsol Anda:

```js
console.log(JSON.stringify(contract.abi))
```

Untuk menjalankan mint-nft.js dan melihat ABI Anda yang dicetak ke konsol, navigasikan ke terminal Anda dan jalankan

```js
node scripts/mint-nft.js
```

## Langkah 4: Konfigurasikan metadata untuk NFT Anda dengan menggunakan IPFS {#config-meta}

Jika Anda ingat dari tutorial di Bagian 1, fungsi kontrak pintar mintNFT kita memasukkan parameter tokenURI yang seharusnya mengurai dokumen JSON yang mendeskripsikan metadata NFT — merupakan bagian yang menghidupkan NFT, yang memungkinkannya memiliki properti yang dapat dikonfigurasikan, seperti nama, deskripsi, gambar, dan atribut lainnya.

> _Sistem Berkas Antarplanet (IPFS) adalah protokol terdesentralisasi dan jaringan peer-to-peer untuk menyimpan dan membagikan data dalam sistem berkas yang terdistribusi._

Kita akan menggunakan Pinata, API dan kotak peralatan IPFS yang mudah digunakan, untuk menyimpan aset NFT dan metadata kita untuk memastikan NFT kita benar-benar terdesentralisasi. Jika Anda tidak memiliki akun Pinata, mendaftarlah untuk membuat akun gratis [di sini](https://app.pinata.cloud) dan lengkapi langkah-langkahnya untuk memverifikasi surel Anda.

Setelah Anda membuat akun:

- Navigasikan ke halaman "Berkas" dan klik tombol "Unggah" biru di bagian kiri atas halaman.

- Unggah gambar ke pinata — ini akan menjadi aset gambar untuk NFT Anda. Silahkan menamai asetnya dengan apa pun yang Anda inginkan

- Setelah Anda mengunggahnya, Anda akan melihat info berkas di tabel pada halaman Berkas. Anda juga akan melihat kolom CID. Anda dapat menyalin CID dengan mengklik tombol salin di sebelahnya. Anda dapat melihat ungggahan Anda di: `https://gateway.pinata.cloud/ipfs/<CID>`. Anda dapat menemukan gambar yang kita gunakan di IPFS [di sini](https://gateway.pinata.cloud/ipfs/QmarPqdEuzh5RsWpyH2hZ3qSXBCzC5RyK3ZHnFkAsk7u2f), sebagai contoh.

Untuk pelajar yang lebih visual, langkah-langkah di atas diringkaskan di sini:

![Cara mengunggah gambar Anda ke Pinata](https://gateway.pinata.cloud/ipfs/Qmcdt5VezYzAJDBc4qN5JbANy5paFg9iKDjq8YksRvZhtL)

Sekarang, kita akan mengunggah satu lagi dokumen ke Pinata. Tetapi sebelum kita melakukannya, kita perlu membuatnya!

Dalam direktori akar Anda, buat berkas baru yang disebut nft-metadata.json dan tambahkan kode json berikut:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Silahkan mengubah data dalam json-nya. Anda dapat menghilangkan atau menambah bagian atributnya. Yang paling penting, pastikan field gambar menunjuk ke lokasi gambar IPFS Anda — jika tidak, NFT Anda akan memasukkan foto anjing (sangat imut!).

Setelah Anda selesai mengedit berkas jsonnya, simpan dan unggah ke Pinata, dengan mengikuti langkah yang sama seperti yang kita lakukan untuk mengunggah gambar.

![Cara mengunggah nft-metadata.json Anda ke Pinata](./uploadPinata.gif)

## Langkah 5: Buat instance kontrak Anda {#instance-contract}

Sekarang, untuk berinteraksi dengan kontrak kita, kita perlu membuat instance-nya dalam kode kita. Untuk melakukannya, kita perlu akun kontrak kita yang bisa didapat dari penyebaran atau [Etherscan](https://ropsten.etherscan.io/) dengan mencari alamat yang Anda gunakan untuk menyebar kontrak.

![Lihat akun kontrak Anda di Etherscan](./viewContractEtherscan.png)

Dalam contoh di atas, akun kontrak kita adalah 0x81c587EB0fE773404c42c1d2666b5f557C470eED.

Selanjutnya, kita akan menggunakan [metode kontrak](https://docs.web3js.org/api/web3-eth-contract/class/Contract) web3 untuk membuat kontrak kita menggunakan ABI dan alamat. Dalam berkas mint-nft.js Anda, tambahkan berikut ini:

```js
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Langkah 6: Perbarui berkas .env {#update-env}

Sekarang, untuk membuat dan mengirim transaksi ke rantai Ethereum, kita akan menggunakan alamat akun Ethereum publik Anda untuk mendapatkan nonce akun (akan dijelaskan di bawah).

Tambahkan kunci publik Anda ke berkas .env Anda — Jika Anda menyelesaikan bagian 1 dari tutorial, berkas .env kita seharusnya sekarang tampak seperti ini:

```js
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Langkah 7: Buat transaksi Anda {#create-txn}

Pertama, mari tentukan fungsi yang bernama `mintNFT(tokenData)` dan buat transaksi kita dengan melakukan yang berikut ini:

1. Ambil _PRIVATE_KEY_ dan _PUBLIC_KEY_ dari berkas `.env`.

1. Selanjutnya, kita perlu mengetahui nonce akun. Spesifikasi nonce digunakan untuk melacak jumlah transaksi yang dikirim dari alamat Anda — yang kita perlukan untuk alasan keamanan dan mencegah [serangan perulangan](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Untuk mendapatkan jumlah transaksi yang dikirim dari alamat Anda, kita menggunakan [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Akhirnya, kita akan menyiapkan transaksi kita dengan info berikut:

- `'from': PUBLIC_KEY` — Asal transaksi kita adalah alamat publik kita

- `'to': contractAddress` — Kontrak yang dengannya kita ingin berinteraksi dan mengirimkan transaksi

- `'nonce': nonce` — Nonce akun dengan jumlah transaksi yang dikirimkan dari alamat kita

- `'gas': estimatedGas` — Gas perkiraan yang diperlukan untuk menyelesaikan transaksi

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Komputasi yang ingin kita lakukan dalam transaksi ini — yang dalam kasus ini adalah mencetak NFT

Berkas mint-nft.js Anda seharusnya tampak seperti ini sekarang:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

   //the transaction
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Langkah 8: Tandatangani transaksi {#sign-txn}

Sekarang kita telah membuat transaksi kita, kita perlu menandatanganinya untuk mengirimkannya. Di sini adalah di mana kita akan menggunakan kunci pribadi kita.

`web3.eth.sendSignedTransaction` akan memberi kita hash transaksi, yang dapat kita gunakan untuk memastikan transaksi kita ditambang dan tidak dilewatkan oleh jaringan. Anda akan melihat dalam bagian penandatanganan transaksi, kita telah menambahkan beberapa pemeriksaan kesalahan sehingga kita tahu jika transaksi kita berhasil diproses.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## Langkah 9: Panggil mintNFT dan jalankan simpul mint-nft.js {#call-mintnft-fn}

Masih ingat dengan metadata.json yang Anda unggah ke Pinata? Dapatkan kode hashnya dari Pinata dan kosongkan yang berikut sebagai parameter pada mintNFT fungsi `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Berikut cara mendapatkan kode hash:

![Cara mendapatkan kode hash metadata nft Anda di Pinata](./metadataPinata.gif)_Cara mendapatkan kode hash metadata nft Anda di Pinata_

> Periksa ulang bahwa kode hash yang Anda salin menautkan ke **metadata.json** Anda dengan memuat `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` ke dalam jendela terpisah. Halamannya seharusnya tampak sama seperti tangkapan layar di bawah:

![Halaman Anda seharusnya menampilkan metadata json](./metadataJSON.png)_Halaman Anda seharusnya menampilkan metadata json_

Secara keseluruhan, kode Anda seharusnya tampak seperti ini:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Sekarang, jalankan `node scripts/mint-nft.js` untuk menyebarkan NFT Anda. Setelah beberapa detik, Anda seharusnya melihat respon seperti ini di terminal Anda:

    The hash of your transaction is: 0x10e5062309de0cd0be7edc92e8dbab191aa2791111c44274483fa766039e0e00

    Check Alchemy's Mempool to view the status of your transaction!

Selanjutnya, buka [kolam memori Alchemy](https://dashboard.alchemyapi.io/mempool) Anda untuk melihat status transaksi Anda (apakah berstatus tunggu, ditambang, atau dilewatkan oleh jaringan). Jika transaksi Anda dilewatkan, akan juga menolong untuk melihat [Ropsten Etherscan](https://ropsten.etherscan.io/) dan mencari hash transaksi Anda.

![Lihat hash transaksi NFT Anda di Etherscan](./viewNFTEtherscan.png)_Lihat hash transaksi NFT Anda di Etherscan_

Dan selesai! Anda sekarang telah menyebarkan DAN mencetak dengan NFT di rantai blok Ethereum <Emoji text=":money_mouth_face:" size={1} />

Dengan menggunakan mint-nft.js, Anda dapat mencetak sebanyak mungkin NFT sesuai keinginan hati (dan dompet) Anda! Hanya pastikan untuk mengosongkan tokenURI baru yang mendeskripsikan metadata NFT (jika tidak, Anda hanya akan membuat sekumpulan NFT yang sama dengan ID berbeda).

Agaknya, Anda ingin memamerkan NFT Anda dalam dompet Anda — jadi pastikan melihat [Bagian 3: Cara Melihat NFT di Dompet Anda](/developers/tutorials/how-to-view-nft-in-metamask/)!
