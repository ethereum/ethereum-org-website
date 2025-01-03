---
title: Memulai Pengembangan Ethereum
description: "This is a beginner's guide to getting started with Ethereum development. Kami akan memandu Anda mulai dari memutar titik akhir API, membuat permintaan baris perintah, hingga menulis skrip web3 pertama Anda! Pengalaman pengembangan blockchain tidak diperlukan!"
author: "Elan Halpern"
tags:
  - "memulai"
  - "javascript"
  - "ethers.js"
  - "node"
  - "membuat kueri"
  - "alchemy"
skill: beginner
lang: id
published: 2020-10-30
source: Sedang
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum dan logo Alchemy](./ethereum-alchemy.png)

Ini adalah panduan bagi pemula untuk memulai pengembangan Ethereum. Untuk tutorial ini, kita akan menggunakan [Alchemy](https://alchemyapi.io/), pelopor platform developer blockchain yang mendukung jutaan pengguna dari 70% aplikasi blockchain teratas, termasuk Maker, 0x, MyEtherWallet, Dharma, dan Kyber. Alchemy akan memberi kita akses ke titik akhir API di rantai Ethereum sehingga kita dapat membaca dan menulis transaksi.

Kami akan memandu Anda mulai dari mendaftar di Alchemy hingga menulis skrip web3 pertama Anda! Pengalaman pengembangan blockchain tidak diperlukan!

## 1. Mendaftar Akun Alchemy Secara Gratis {#sign-up-for-a-free-alchemy-account}

Membuat akun Alchemy itu mudah, [daftar secara gratis di sini](https://auth.alchemyapi.io/signup).

## 2. Membuat Aplikasi Alchemy {#create-an-alchemy-app}

Untuk berkomunikasi dengan rantai Ethereum dan menggunakan produk-produk Alchemy, Anda memerlukan kunci API untuk mengotentikasi permintaan Anda.

Anda bisa [membuat kunci API dari dasbor](http://dashboard.alchemyapi.io/). Untuk membuat kunci baru, arahkan ke "Create App" seperti contoh dibawah:

Terima kasih banyak untuk [_ShapeShift_](https://shapeshift.com/) _yang telah mengizinkan kami menampilkan dasbor mereka!_

![Dasbor Alchemy](./alchemy-dashboard.png)

Isi detail di bawah "Create App" untuk mendapatkan kunci baru. Anda juga bisa melihat aplikasi yang sebelumnya Anda buat dan yang dibuat oleh tim Anda di sini. Tarik kunci yang ada dengan mengklik "View Key" untuk aplikasi apa pun.

![Buat aplikasi dengan tangkapan layar Alchemy](./create-app.png)

Anda juga bisa menarik kunci API yang sudah ada dengan mengarahkan kursor ke "Apps" dan pilih salah satu. Anda bisa "View Key" disini, juga "Edit App" untuk memasukkan domain tertentu ke whitelist, melihat beberapa peralatan developer, dan melihat analitik.

![Gif yang menampilkan ke pengguna bagaimana cara menarik kunci API](./pull-api-keys.gif)

## 3. Membuat permintaan dari Baris Perintah {#make-a-request-from-the-command-line}

Berinteraksi dengan blockchain Ethereum melalui Alchemy menggunakan JSON-RPC dan curl.

Untuk permintaan manual, kami merekomendasikan berinteraksi dengan `JSON-RPC` via permintaan `POST`. Cukup teruskan dalam header `Content-Type: application/json` dan kueri Anda sebagai isi `POST` yang berisi field sebagai berikut:

- `jsonrpc`: Versi JSON-RPC — saat ini, hanya versi `2.0` yang didukung.
- `method`: Metode API ETH. [Lihat referensi API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Daftar parameter untuk diteruskan ke metode.
- `id`: ID permintaan Anda. Akan dikembalikan oleh tanggapan, jadi Anda tetap bisa melacak permintaan mana yang ditanggapi.

Berikut contoh yang bisa Anda jalankan di baris perintah untuk mengambil harga gas saat ini:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOTE:** Replace [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) with your own API key `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`\*\*._

**Hasil:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Menyiapkan Client Web3 Anda {#set-up-your-web3-client}

**Jika Anda sudah memiliki klien,** ganti URL penyedia node Anda saat ini ke URL Alchemy dengan kunci API Anda: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_CATATAN:_** Skrip di bawah harus dijalankan pada **konteks node** atau **disimpan dalam file**, jangan menjalankannya di baris perintah. Jika Anda tidak memiliki Node atau npm yang terinstal, simak [panduan pengaturan untuk mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) singkat ini.

Ada banyak sekali [pustaka Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) yang bisa Anda integrasikan dengan Alchemy, namun, kami merekomendasikan menggunakan [Web3 Alchemy](https://docs.alchemy.com/reference/api-overview), pengganti web3.js, yang dibuat dan dikonfigurasi agar bekerja dengan mulus dengan Alchemy. Ini menyediakan banyak keuntungan seperti percobaan ulang otomatis dan dukungan WebSocket yang kuat.

Untuk menginstal AlchemyWeb3.js, **arahkan kursor ke direktori proyek Anda** dan jalankan:

**Dengan Yarn:**

```
yarn add @alch/alchemy-web3
```

**Dengan NPM:**

```
npm install @alch/alchemy-web3
```

Untuk berinteraksi dengan infrastruktur node Alchemy, jalankan di NodeJS atau tambahkan ini ke file JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Tulis Skrip Web3 pertama Anda! {#write-your-first-web3-script}

Sekarang untuk membuat tangan kita kotor dengan sedikit pemrograman web3, kita akan menulis skrip sederhana yang mencetak nomor blok terakhir dari Jaringan Utama Ethereum.

**1. Jika Anda belum memilikinya, di terminal Anda, buat direktori proyek dan cd baru kedalamnya:**

```
mkdir web3-example
cd web3-example
```

**2. Instal dependensi web3 Alchemy (atau web3 apa pun) ke proyek Anda jika belum memilikinya:**

```
npm install @alch/alchemy-web3
```

**3. Create a file named `index.js` and add the following contents:**

> Pada akhirnya Anda harus mengganti `demo` dengan kunci API HTTP Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Tidak familiar dengan async? Lihat [postingan Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) berikut ini.

**4. Jalankan di terminal Anda menggunakan node**

```
node index.js
```

**5. Sekarang Anda akan melihat output nomor blok terakhir pada konsol Anda!**

```
The latest block number is 11043912
```

**Woo! Selamat! You just wrote your first web3 script using Alchemy 🎉**

Not sure what to do next? Try deploying your first smart contract and get your hands dirty with some solidity programming in our [Hello World Smart Contract Guide](https://docs.alchemyapi.io/tutorials/hello-world-smart-contract), or test your dashboard knowledge with the [Dashboard Demo App](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Daftar Alchemy secara gratis](https://auth.alchemyapi.io/signup), lihat [dokumentasi](https://docs.alchemyapi.io/) kami, dan untuk berita terbaru, ikuti kami di [Twitter](https://twitter.com/AlchemyPlatform)_.
