---
title: Cara Mencetak NFT (Bagian 2/3 dari Seri Tutorial NFT)
description: Tutorial ini menjelaskan cara mencetak NFT di rantai blok Ethereum menggunakan kontrak pintar kami, Hardhat, dan ethers.js.
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "kontrak pintar"]
skill: beginner
breadcrumb: Cetak NFT
lang: id
published: 2021-04-22
---

"Pencetakan NFT" adalah tindakan menerbitkan instans unik dari token ERC-721 Anda di rantai blok. Menggunakan kontrak pintar kami dari [Bagian 1 dari seri tutorial NFT ini](/developers/tutorials/how-to-write-and-deploy-an-nft/), mari kita asah keterampilan Web3 kita dan cetak sebuah NFT. Di akhir tutorial ini, Anda akan dapat mencetak sebanyak mungkin NFT sesuai keinginan hati (dan dompet) Anda!

Mari kita mulai!

## Langkah 1: Periksa pengaturan Anda {#install-web3}

Jika Anda mengikuti tutorial pertama tentang pembuatan kontrak pintar NFT Anda, Anda sudah memiliki semua yang dibutuhkan: proyek Hardhat 3 dengan [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) dan [ethers.js](https://docs.ethers.org/v6/), sebuah pustaka yang digunakan untuk mempermudah pembuatan permintaan ke rantai blok [Ethereum](/). Kami akan menulis kode pencetakan kami sebagai skrip Hardhat, sehingga kode tersebut menggunakan kembali pengaturan jaringan Sepolia dan nilai `API_URL` serta `PRIVATE_KEY` dari Bagian 1 — tidak ada hal baru yang perlu diinstal.

## Langkah 2: Buat file `mint-nft.js` {#create-mintnftjs}

Di dalam direktori skrip Anda, buat file `mint-nft.js` dan tambahkan baris kode berikut:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Seperti dalam skrip penyebaran kami, `network.create()` terhubung ke jaringan yang Anda pilih dengan `--network` saat Anda menjalankan skrip, dan memberi kami objek `ethers` untuk itu.

## Langkah 3: Ambil ABI kontrak Anda {#contract-abi}

Antarmuka Biner Aplikasi (ABI) kontrak kami adalah antarmuka untuk berinteraksi dengan kontrak pintar kami. Anda dapat mempelajari lebih lanjut tentang [ABI kontrak](/glossary/#abi). Hardhat secara otomatis menghasilkan ABI untuk kami saat mengompilasi kontrak dan menyimpannya di file `artifacts/contracts/MyNFT.sol/MyNFT.json`. Plugin Hardhat Ethers membacanya dari sana untuk kami saat kami membuat instans kontrak kami di langkah 5, jadi kami tidak perlu memuatnya sendiri.

Jika Anda ingin melihat ABI, Anda dapat mencetaknya ke konsol Anda. Dari direktori akar proyek Anda, jalankan:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Langkah 4: Konfigurasikan metadata untuk NFT Anda menggunakan IPFS {#config-meta}

Jika Anda ingat dari tutorial kami di Bagian 1, fungsi kontrak pintar `mintNFT` kami menerima parameter tokenURI yang harus mengarah ke dokumen JSON yang mendeskripsikan metadata NFT— yang sebenarnya menghidupkan NFT, memungkinkannya memiliki properti yang dapat dikonfigurasi, seperti nama, deskripsi, gambar, dan atribut lainnya.

> _Interplanetary File System (IPFS) adalah protokol terdesentralisasi dan jaringan peer-to-peer untuk menyimpan dan berbagi data dalam sistem file terdistribusi._

Kami akan menggunakan Pinata, Antarmuka Pemrograman Aplikasi (API) IPFS dan perangkat yang praktis, untuk menyimpan aset dan metadata NFT kami guna memastikan NFT kami benar-benar terdesentralisasi. Jika Anda tidak memiliki akun Pinata, daftar untuk mendapatkan akun gratis [di sini](https://app.pinata.cloud) dan selesaikan langkah-langkah untuk memverifikasi email Anda.

Setelah Anda membuat akun:

- Navigasikan ke [halaman Files](https://app.pinata.cloud/ipfs/files) dan klik tombol "Add" di sudut kanan atas halaman.

- Unggah gambar ke Pinata — ini akan menjadi aset gambar untuk NFT Anda. Jangan ragu untuk menamai aset tersebut sesuka Anda. Pastikan Anda mengunggahnya ke IPFS publik: file di [Private IPFS](https://docs.pinata.cloud/files/private-ipfs) tidak dapat diambil oleh dompet dan pasar yang menampilkan NFT Anda.

- Setelah Anda mengunggah, Anda akan melihat file tersebut terdaftar di halaman Files bersama dengan CID (pengidentifikasi konten) miliknya. Salin CID tersebut. Anda dapat melihat unggahan Anda di: `https://gateway.pinata.cloud/ipfs/<CID>`, atau melalui gateway khusus yang terdaftar di bawah "Gateways" di bilah sisi Pinata. Anda dapat menemukan gambar yang kami gunakan di IPFS [di sini](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), sebagai contoh.

Sekarang, kita akan mengunggah satu dokumen lagi ke Pinata. Namun sebelum kita melakukannya, kita perlu membuatnya!

Di direktori akar Anda, buat file baru bernama `nft-metadata.json` dan tambahkan kode json berikut:

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

Jangan ragu untuk mengubah data di json tersebut. Anda dapat menghapus atau menambahkan ke bagian atribut. Yang terpenting, pastikan bidang gambar menunjuk ke lokasi gambar IPFS Anda, dalam bentuk `ipfs://<image-CID>` — jika tidak, NFT Anda akan menyertakan foto anjing (yang sangat lucu!).

Setelah Anda selesai mengedit file JSON, simpan dan unggah ke Pinata, mengikuti langkah-langkah yang sama seperti yang kita lakukan untuk mengunggah gambar. Salin juga CID dari `nft-metadata.json`; kita akan membutuhkannya di langkah 9.

## Langkah 5: Buat instans kontrak Anda {#instance-contract}

Sekarang, untuk berinteraksi dengan kontrak kami, kami perlu membuat instansnya di kode kami. Untuk melakukannya, kami akan membutuhkan alamat kontrak kami, yang dicetak oleh skrip penyebaran kami di Bagian 1. Anda juga dapat menemukannya di [Etherscan](https://sepolia.etherscan.io/) atau [Blockscout](https://eth-sepolia.blockscout.com/) dengan mencari alamat yang Anda gunakan untuk menyebarkan kontrak.

![Lihat alamat kontrak Anda di Etherscan](./view-contract-etherscan.png)

Dalam contoh di atas, alamat kontrak kami adalah 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Selanjutnya kita akan menggunakan metode `getContractAt` dari plugin Hardhat Ethers untuk membuat kontrak kita menggunakan namanya (yang memberitahunya ABI mana yang akan digunakan) dan alamatnya. Di file `mint-nft.js` Anda, tambahkan yang berikut ini, ganti alamatnya dengan milik Anda sendiri:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Langkah 6: Periksa file `.env` {#update-env}

Setiap transaksi yang kami kirim harus ditandatangani dengan kunci privat akun Anda. Jika Anda menyelesaikan bagian 1 dari tutorial ini, file `.env` kami seharusnya sudah terlihat seperti ini:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Tidak perlu menambahkan alamat publik Anda: ethers mengetahuinya dari kunci privat.

## Langkah 7: Buat transaksi Anda {#create-txn}

Pertama, mari kita tentukan fungsi bernama `mintNFT(tokenURI)` dan buat transaksi kita dengan melakukan hal berikut:

1. Dapatkan akun tempat kita mengirim transaksi. `ethers.getSigners()` mengembalikan akun yang dikonfigurasi untuk jaringan, yang di Sepolia adalah akun yang kunci privatnya ada di `.env`. Karena `mintNFT` adalah `onlyOwner`, ini harus merupakan akun yang sama yang menyebarkan kontrak.

1. Panggil fungsi `mintNFT` pada instans kontrak kita, dengan alamat kita sendiri sebagai penerima dan URI metadata. Ini adalah komputasi yang ingin kita lakukan dalam transaksi ini — yang dalam hal ini adalah mencetak NFT.

Anda tidak perlu menghitung nonce (jumlah transaksi yang dikirim dari alamat Anda, yang mencegah serangan pemutaran ulang), batas gas, atau biayanya sendiri: ethers mengambil atau memperkirakannya sebelum mengirim transaksi.

File `mint-nft.js` Anda seharusnya terlihat seperti ini sekarang:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Kirim transaksi. ethers mengisi nonce, batas gas, dan biaya untuk kita.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Langkah 8: Tandatangani transaksi {#sign-txn}

Karena jaringan dikonfigurasi dengan kunci privat kita, ethers menandatangani transaksi dengannya secara otomatis sebelum mengirimkannya.

Memanggil `mintNFT` akan kembali setelah transaksi dikirim, dan memberi kita hash transaksi, yang dapat kita gunakan untuk memastikan transaksi kita ditambang dan tidak dibatalkan oleh jaringan. `tx.wait()` kemudian menunggu hingga transaksi disertakan dalam sebuah blok. Kami juga telah menambahkan beberapa pemeriksaan kesalahan sehingga kami tahu apakah transaksi kami berhasil diselesaikan.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Kirim transaksi. ethers mengisi nonce, batas gas, dan biaya untuk kita.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Tunggu hingga transaksi dimasukkan ke dalam blok
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Langkah 9: Panggil `mintNFT` dan jalankan `mint-nft.js` {#call-mintnft-fn}

Ingat `nft-metadata.json` yang Anda unggah ke Pinata? Dapatkan CID-nya dari Pinata dan teruskan `ipfs://<metadata-CID>` sebagai parameter ke fungsi `mintNFT`. Dompet dan pasar menyelesaikan URI `ipfs://` melalui gateway IPFS pilihan mereka, sehingga NFT Anda tidak bergantung pada satu gateway mana pun.

> Periksa kembali apakah CID yang Anda salin tertaut ke **nft-metadata.json** Anda dengan memuat `https://gateway.pinata.cloud/ipfs/<metadata-CID>` ke jendela terpisah. Halaman tersebut akan terlihat mirip dengan tangkapan layar di bawah ini:

![Halaman Anda harus menampilkan metadata json](./metadataJSON.png)_Halaman Anda harus menampilkan metadata json_

Secara keseluruhan, kode Anda akan terlihat seperti ini:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Kirim transaksi. ethers mengisi nonce, batas gas, dan biaya untuk kita.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Tunggu hingga transaksi dimasukkan ke dalam blok
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Sekarang, jalankan skrip terhadap Sepolia untuk mencetak NFT Anda:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Setelah beberapa detik, Anda akan melihat respons seperti ini di terminal Anda:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Untuk melihat detail transaksi Anda, cari hash-nya di [Etherscan](https://sepolia.etherscan.io/) atau [Blockscout](https://eth-sepolia.blockscout.com/).

![Lihat hash transaksi NFT Anda di Etherscan](./view-nft-etherscan.png)_Lihat hash transaksi NFT Anda di Etherscan_

Dan itu saja! Anda sekarang telah menyebarkan DAN mencetak NFT di rantai blok Ethereum <Emoji text=":money_mouth_face:" size={1} />

Menggunakan `mint-nft.js` Anda dapat mencetak sebanyak mungkin NFT sesuai keinginan hati (dan dompet) Anda! Pastikan saja untuk meneruskan tokenURI baru yang mendeskripsikan metadata NFT (jika tidak, Anda hanya akan membuat sekumpulan NFT identik dengan ID yang berbeda).

Mungkin, Anda ingin dapat memamerkan NFT Anda di dompet Anda — jadi pastikan untuk memeriksa [Bagian 3: Cara Melihat NFT Anda di Dompet Anda](/developers/tutorials/how-to-view-nft-in-metamask/)!
