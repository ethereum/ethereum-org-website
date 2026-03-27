---
title: Cara Melakukan Mint NFT (Bagian 2/3 dari Seri Tutorial NFT)
description: Tutorial ini menjelaskan cara melakukan mint NFT di blockchain Ethereum menggunakan kontrak pintar kami dan Web3.
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "kontrak pintar"]
skill: beginner
breadcrumb: "Cetak NFT"
lang: id
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 Juta
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 Juta
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 Juta

Semuanya melakukan mint NFT mereka menggunakan API Alchemy yang canggih. Dalam tutorial ini, kami akan mengajarkan Anda cara melakukan hal yang sama dalam waktu \<10 menit.

"Melakukan mint NFT" adalah tindakan menerbitkan instans unik dari token ERC-721 Anda di blockchain. Menggunakan kontrak pintar kami dari [Bagian 1 seri tutorial NFT ini](/developers/tutorials/how-to-write-and-deploy-an-nft/), mari kita asah keterampilan Web3 kita dan melakukan mint NFT. Di akhir tutorial ini, Anda akan dapat melakukan mint NFT sebanyak yang Anda (dan dompet Anda) inginkan!

Mari kita mulai!

## Langkah 1: Instal Web3 {#install-web3}

Jika Anda mengikuti tutorial pertama tentang pembuatan kontrak pintar NFT Anda, Anda sudah memiliki pengalaman menggunakan Ethers.js. Web3 mirip dengan Ethers, karena ini adalah pustaka yang digunakan untuk mempermudah pembuatan permintaan ke blockchain [Ethereum](/). Dalam tutorial ini kita akan menggunakan [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), yang merupakan pustaka Web3 yang ditingkatkan yang menawarkan percobaan ulang otomatis dan dukungan WebSocket yang kuat.

Di direktori beranda proyek Anda, jalankan:

```
npm install @alch/alchemy-web3
```

## Langkah 2: Buat file `mint-nft.js` {#create-mintnftjs}

Di dalam direktori skrip Anda, buat file `mint-nft.js` dan tambahkan baris kode berikut:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Langkah 3: Ambil ABI kontrak Anda {#contract-abi}

ABI (Application Binary Interface) kontrak kita adalah antarmuka untuk berinteraksi dengan kontrak pintar kita. Anda dapat mempelajari lebih lanjut tentang ABI Kontrak [di sini](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat secara otomatis menghasilkan ABI untuk kita dan menyimpannya di file `MyNFT.json`. Untuk menggunakan ini, kita perlu mengurai kontennya dengan menambahkan baris kode berikut ke file `mint-nft.js` kita:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Jika Anda ingin melihat ABI, Anda dapat mencetaknya ke konsol Anda:

```js
console.log(JSON.stringify(contract.abi))
```

Untuk menjalankan `mint-nft.js` dan melihat ABI Anda dicetak ke konsol, navigasikan ke terminal Anda dan jalankan:

```js
node scripts/mint-nft.js
```

## Langkah 4: Konfigurasikan metadata untuk NFT Anda menggunakan IPFS {#config-meta}

Jika Anda ingat dari tutorial kita di Bagian 1, fungsi kontrak pintar `mintNFT` kita mengambil parameter tokenURI yang harus diselesaikan ke dokumen JSON yang mendeskripsikan metadata NFT— yang benar-benar menghidupkan NFT, memungkinkannya memiliki properti yang dapat dikonfigurasi, seperti nama, deskripsi, gambar, dan atribut lainnya.

> _Interplanetary File System (IPFS) adalah protokol desentralisasi dan jaringan peer-to-peer untuk menyimpan dan berbagi data dalam sistem file terdistribusi._

Kita akan menggunakan Pinata, API dan toolkit IPFS yang praktis, untuk menyimpan aset dan metadata NFT kita guna memastikan NFT kita benar-benar terdesentralisasi. Jika Anda belum memiliki akun Pinata, daftar untuk mendapatkan akun gratis [di sini](https://app.pinata.cloud) dan selesaikan langkah-langkah untuk memverifikasi email Anda.

Setelah Anda membuat akun:

- Navigasikan ke halaman "Files" dan klik tombol "Upload" berwarna biru di kiri atas halaman.

- Unggah gambar ke Pinata — ini akan menjadi aset gambar untuk NFT Anda. Jangan ragu untuk menamai aset tersebut sesuka Anda

- Setelah Anda mengunggah, Anda akan melihat info file di tabel pada halaman "Files". Anda juga akan melihat kolom CID. Anda dapat menyalin CID dengan mengeklik tombol salin di sebelahnya. Anda dapat melihat unggahan Anda di: `https://gateway.pinata.cloud/ipfs/<CID>`. Anda dapat menemukan gambar yang kami gunakan di IPFS [di sini](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), sebagai contoh.

Bagi pembelajar yang lebih visual, langkah-langkah di atas dirangkum di sini:

![Cara mengunggah gambar Anda ke Pinata](./instructionsPinata.gif)

Sekarang, kita akan mengunggah satu dokumen lagi ke Pinata. Namun sebelum kita melakukannya, kita perlu membuatnya!

Di direktori root Anda, buat file baru bernama `nft-metadata.json` dan tambahkan kode json berikut:

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

Jangan ragu untuk mengubah data di json. Anda dapat menghapus atau menambahkan ke bagian atribut. Yang terpenting, pastikan bidang gambar menunjuk ke lokasi gambar IPFS Anda — jika tidak, NFT Anda akan menyertakan foto anjing (yang sangat lucu!).

Setelah Anda selesai mengedit file JSON, simpan dan unggah ke Pinata, ikuti langkah yang sama seperti yang kita lakukan untuk mengunggah gambar.

![Cara mengunggah nft-metadata.json Anda ke Pinata](./uploadPinata.gif)

## Langkah 5: Buat instans kontrak Anda {#instance-contract}

Sekarang, untuk berinteraksi dengan kontrak kita, kita perlu membuat instansnya di kode kita. Untuk melakukannya, kita memerlukan alamat kontrak kita yang bisa kita dapatkan dari penerapan atau [Blockscout](https://eth-sepolia.blockscout.com/) dengan mencari alamat yang Anda gunakan untuk menerapkan kontrak.

![Lihat alamat kontrak Anda di Etherscan](./view-contract-etherscan.png)

Dalam contoh di atas, alamat kontrak kita adalah 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Selanjutnya kita akan menggunakan [metode kontrak](https://docs.web3js.org/api/web3-eth-contract/class/Contract) Web3 untuk membuat kontrak kita menggunakan ABI dan alamat. Di file `mint-nft.js` Anda, tambahkan yang berikut ini:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Langkah 6: Perbarui file `.env` {#update-env}

Sekarang, untuk membuat dan mengirim transaksi ke rantai Ethereum, kita akan menggunakan alamat akun Ethereum publik Anda untuk mendapatkan nonce akun (akan dijelaskan di bawah).

Tambahkan kunci publik Anda ke file `.env` Anda — jika Anda menyelesaikan bagian 1 dari tutorial, file `.env` kita sekarang akan terlihat seperti ini:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Langkah 7: Buat transaksi Anda {#create-txn}

Pertama, mari kita tentukan fungsi bernama `mintNFT(tokenData)` dan buat transaksi kita dengan melakukan hal berikut:

1. Ambil _PRIVATE_KEY_ dan _PUBLIC_KEY_ Anda dari file `.env`.

1. Selanjutnya, kita perlu mengetahui nonce akun. Spesifikasi nonce digunakan untuk melacak jumlah transaksi yang dikirim dari alamat Anda — yang kita perlukan untuk tujuan keamanan dan untuk mencegah [serangan replay](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Untuk mendapatkan jumlah transaksi yang dikirim dari alamat Anda, kita menggunakan [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Terakhir kita akan mengatur transaksi kita dengan info berikut:

- `'from': PUBLIC_KEY` — Asal transaksi kita adalah alamat publik kita

- `'to': contractAddress` — Kontrak yang ingin kita ajak berinteraksi dan kirimi transaksi

- `'nonce': nonce` — Nonce akun dengan jumlah transaksi yang dikirim dari alamat kita

- `'gas': estimatedGas` — Perkiraan gas yang dibutuhkan untuk menyelesaikan transaksi

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Komputasi yang ingin kita lakukan dalam transaksi ini — yang dalam hal ini adalah melakukan mint NFT

File `mint-nft.js` Anda seharusnya terlihat seperti ini sekarang:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce // dapatkan nonce terbaru

   //the transaction // transaksi tersebut
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Langkah 8: Tanda tangani transaksi {#sign-txn}

Sekarang setelah kita membuat transaksi kita, kita perlu menandatanganinya untuk mengirimkannya. Di sinilah kita akan menggunakan kunci pribadi kita.

`web3.eth.sendSignedTransaction` akan memberi kita hash transaksi, yang dapat kita gunakan untuk memastikan transaksi kita ditambang dan tidak dibatalkan oleh jaringan. Anda akan melihat di bagian penandatanganan transaksi, kami telah menambahkan beberapa pemeriksaan kesalahan sehingga kami tahu apakah transaksi kami berhasil dilalui.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce // dapatkan nonce terbaru

  //the transaction // transaksi tersebut
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

## Langkah 9: Panggil `mintNFT` dan jalankan node `mint-nft.js` {#call-mintnft-fn}

Ingat `metadata.json` yang Anda unggah ke Pinata? Dapatkan kode hash-nya dari Pinata dan teruskan yang berikut ini sebagai parameter ke fungsi `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Berikut cara mendapatkan kode hash:

![Cara mendapatkan kode hash metadata nft Anda di Pinata](./metadataPinata.gif)_Cara mendapatkan kode hash metadata nft Anda di Pinata_

> Periksa kembali apakah kode hash yang Anda salin tertaut ke **metadata.json** Anda dengan memuat `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` ke jendela terpisah. Halaman tersebut akan terlihat mirip dengan tangkapan layar di bawah ini:

![Halaman Anda harus menampilkan metadata json](./metadataJSON.png)_Halaman Anda harus menampilkan metadata json_

Secara keseluruhan, kode Anda akan terlihat seperti ini:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce // dapatkan nonce terbaru

  //the transaction // transaksi tersebut
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

Sekarang, jalankan `node scripts/mint-nft.js` untuk menerapkan NFT Anda. Setelah beberapa detik, Anda akan melihat respons seperti ini di terminal Anda:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Selanjutnya, kunjungi [mempool Alchemy](https://dashboard.alchemyapi.io/mempool) Anda untuk melihat status transaksi Anda (apakah tertunda, ditambang, atau dibatalkan oleh jaringan). Jika transaksi Anda dibatalkan, ada baiknya juga untuk memeriksa [Blockscout](https://eth-sepolia.blockscout.com/) dan mencari hash transaksi Anda.

![Lihat hash transaksi NFT Anda di Etherscan](./view-nft-etherscan.png)_Lihat hash transaksi NFT Anda di Etherscan_

Dan itu saja! Anda sekarang telah menerapkan DAN melakukan mint dengan NFT di blockchain Ethereum <Emoji text=":money_mouth_face:" size={1} />

Menggunakan `mint-nft.js` Anda dapat melakukan mint NFT sebanyak yang Anda (dan dompet Anda) inginkan! Pastikan saja untuk meneruskan tokenURI baru yang mendeskripsikan metadata NFT (jika tidak, Anda hanya akan membuat banyak NFT identik dengan ID yang berbeda).

Mungkin, Anda ingin dapat memamerkan NFT Anda di dompet Anda — jadi pastikan untuk memeriksa [Bagian 3: Cara Melihat NFT Anda di Dompet Anda](/developers/tutorials/how-to-view-nft-in-metamask/)!