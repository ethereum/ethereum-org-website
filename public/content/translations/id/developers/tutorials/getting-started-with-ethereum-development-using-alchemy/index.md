---
title: Memulai Pengembangan Ethereum
description: "Ini adalah panduan pemula untuk memulai pengembangan Ethereum. Kami akan memandu Anda mulai dari menyiapkan titik akhir API, membuat permintaan baris perintah, hingga menulis skrip Web3 pertama Anda! Tidak diperlukan pengalaman pengembangan rantai blok!"
author: "Elan Halpern"
tags: ["JavaScript", "ethers.js", "node", "kueri", "Alchemy"]
skill: beginner
breadcrumb: Memulai
lang: id
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

Ini adalah panduan pemula untuk memulai pengembangan Ethereum. Untuk tutorial ini, kita akan menggunakan [Alchemy](https://alchemyapi.io/), platform pengembang rantai blok terkemuka yang memberdayakan jutaan pengguna dari 70% aplikasi rantai blok teratas, termasuk Maker, 0x, MyEtherWallet, Dharma, dan Kyber. Alchemy akan memberi kita akses ke titik akhir API di rantai Ethereum sehingga kita dapat membaca dan menulis transaksi.

Kami akan memandu Anda mulai dari mendaftar di Alchemy hingga menulis skrip Web3 pertama Anda! Tidak diperlukan pengalaman pengembangan rantai blok!

## 1. Daftar Akun Alchemy Gratis {#sign-up-for-a-free-alchemy-account}

Membuat akun di Alchemy sangat mudah, [daftar gratis di sini](https://auth.alchemy.com/).

## 2. Buat Aplikasi Alchemy {#create-an-alchemy-app}

Untuk berkomunikasi dengan rantai Ethereum dan menggunakan produk Alchemy, Anda memerlukan kunci API untuk mengautentikasi permintaan Anda.

Anda dapat [membuat kunci API dari dasbor](https://dashboard.alchemy.com/). Untuk membuat kunci baru, navigasikan ke “Create App” (Buat Aplikasi) seperti yang ditunjukkan di bawah ini:

Terima kasih khusus kepada [_ShapeShift_](https://shapeshift.com/) _karena telah mengizinkan kami menampilkan dasbor mereka!_

![Alchemy dashboard](./alchemy-dashboard.png)

Isi detail di bawah “Create App” untuk mendapatkan kunci baru Anda. Anda juga dapat melihat aplikasi yang sebelumnya Anda buat dan yang dibuat oleh tim Anda di sini. Tarik kunci yang ada dengan mengeklik “View Key” (Lihat Kunci) untuk aplikasi apa pun.

![Create app with Alchemy screenshot](./create-app.png)

Anda juga dapat menarik kunci API yang ada dengan mengarahkan kursor ke “Apps” (Aplikasi) dan memilih salah satunya. Anda dapat mengeklik “View Key” di sini, serta “Edit App” (Edit Aplikasi) untuk memasukkan domain tertentu ke daftar putih, melihat beberapa alat pengembang, dan melihat analitik.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. Buat Permintaan dari Baris Perintah {#make-a-request-from-the-command-line}

Berinteraksi dengan rantai blok Ethereum melalui Alchemy menggunakan JSON-RPC dan curl.

Untuk permintaan manual, kami menyarankan untuk berinteraksi dengan `JSON-RPC` melalui permintaan `POST`. Cukup teruskan header `Content-Type: application/json` dan kueri Anda sebagai isi `POST` dengan bidang-bidang berikut:

- `jsonrpc`: Versi JSON-RPC—saat ini, hanya `2.0` yang didukung.
- `method`: Metode API ETH. [Lihat referensi API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Daftar parameter yang akan diteruskan ke metode.
- `id`: ID permintaan Anda. Akan dikembalikan oleh respons sehingga Anda dapat melacak respons mana yang merupakan bagian dari permintaan tersebut.

Berikut adalah contoh yang dapat Anda jalankan dari baris perintah untuk mengambil harga gas saat ini:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**CATATAN:** Ganti [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) dengan kunci API Anda sendiri `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Hasil:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Siapkan Klien Web3 Anda {#set-up-your-web3-client}

**Jika Anda memiliki klien yang sudah ada,** ubah URL penyedia node Anda saat ini ke URL Alchemy dengan kunci API Anda: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_CATATAN:_** Skrip di bawah ini perlu dijalankan dalam **konteks node** atau **disimpan dalam sebuah file**, bukan dijalankan dari baris perintah. Jika Anda belum menginstal Node atau npm, lihat [panduan penyiapan cepat untuk Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) ini.

Ada banyak sekali [pustaka Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) yang dapat Anda integrasikan dengan Alchemy, namun, kami menyarankan untuk menggunakan [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), pengganti langsung untuk web3.js, yang dibangun dan dikonfigurasi agar bekerja secara mulus dengan Alchemy. Ini memberikan berbagai keuntungan seperti percobaan ulang otomatis dan dukungan WebSocket yang tangguh.

Untuk menginstal AlchemyWeb3.js, **navigasikan ke direktori proyek Anda** dan jalankan:

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

Sekarang untuk mulai mempraktikkan sedikit pemrograman Web3, kita akan menulis skrip sederhana yang mencetak nomor blok terbaru dari Mainnet Ethereum.

**1. Jika belum, di terminal Anda buat direktori proyek baru dan masuk (cd) ke dalamnya:**

```
mkdir web3-example
cd web3-example
```

**2. Instal dependensi Web3 Alchemy (atau Web3 apa pun) ke dalam proyek Anda jika Anda belum melakukannya:**

```
npm install @alch/alchemy-web3
```

**3. Buat file bernama `index.js` dan tambahkan konten berikut:**

> Anda pada akhirnya harus mengganti `demo` dengan kunci API HTTP Alchemy Anda.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Belum familier dengan hal-hal terkait async? Lihat [postingan Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) ini.

**4. Jalankan di terminal Anda menggunakan node**

```
node index.js
```

**5. Anda sekarang akan melihat keluaran nomor blok terbaru di konsol Anda!**

```
The latest block number is 11043912
```

**Wah! Selamat! Anda baru saja menulis skrip Web3 pertama Anda menggunakan Alchemy 🎉**

Tidak yakin apa yang harus dilakukan selanjutnya? Coba terapkan kontrak pintar pertama Anda dan mulailah mempraktikkan pemrograman Solidity di [Panduan Kontrak Pintar Hello World](https://www.alchemy.com/docs/hello-world-smart-contract) kami, atau uji pengetahuan dasbor Anda dengan [Aplikasi Demo Dasbor](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Daftar di Alchemy secara gratis](https://auth.alchemy.com/), lihat [dokumentasi](https://www.alchemy.com/docs/) kami, dan untuk berita terbaru, ikuti kami di [Twitter](https://twitter.com/AlchemyPlatform)_.