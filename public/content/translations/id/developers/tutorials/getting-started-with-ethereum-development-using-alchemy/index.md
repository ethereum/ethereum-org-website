---
title: Memulai Pengembangan Ethereum
description: "Ini adalah panduan pemula untuk memulai pengembangan Ethereum. Kami akan memandu Anda mulai dari mengaktifkan titik akhir API, membuat permintaan baris perintah, hingga menulis skrip web3 pertama Anda! Pengalaman pengembangan blockchain tidak diperlukan!"
author: "Elan Halpern"
tags:
  [
    "javascript",
    "ethers.js",
    "node",
    "membuat kueri",
    "alchemy"
  ]
skill: beginner
lang: id
published: 2020-10-30
source: Sedang
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Logo Ethereum dan Alchemy](./ethereum-alchemy.png)

Ini adalah panduan bagi pemula untuk memulai pengembangan Ethereum. Untuk tutorial ini, kita akan menggunakan [Alchemy](https://alchemyapi.io/), platform pengembang blockchain terkemuka yang mendukung jutaan pengguna dari 70% aplikasi blockchain teratas, termasuk Maker, 0x, MyEtherWallet, Dharma, dan Kyber. Alchemy akan memberi kita akses ke titik akhir API di rantai Ethereum sehingga kita dapat membaca dan menulis transaksi.

Kami akan memandu Anda mulai dari mendaftar di Alchemy hingga menulis skrip web3 pertama Anda! Pengalaman pengembangan blockchain tidak diperlukan!

## 1. Daftar untuk Akun Alchemy Gratis {#sign-up-for-a-free-alchemy-account}

Membuat akun di Alchemy itu mudah, [daftar gratis di sini](https://auth.alchemy.com/).

## 2. Buat Aplikasi Alchemy {#create-an-alchemy-app}

Untuk berkomunikasi dengan rantai Ethereum dan menggunakan produk-produk Alchemy, Anda memerlukan kunci API untuk mengautentikasi permintaan Anda.

Anda dapat [membuat kunci API dari dasbor](https://dashboard.alchemy.com/). Untuk membuat kunci baru, navigasikan ke “Create App” seperti yang ditunjukkan di bawah ini:

Terima kasih khusus kepada [_ShapeShift_](https://shapeshift.com/) _karena mengizinkan kami menampilkan dasbor mereka!_

![Dasbor Alchemy](./alchemy-dashboard.png)

Isi detail di bawah “Create App” untuk mendapatkan kunci baru Anda. Anda juga bisa melihat aplikasi yang sebelumnya Anda buat dan yang dibuat oleh tim Anda di sini. Tarik kunci yang ada dengan mengeklik “View Key” untuk aplikasi apa pun.

![Tangkapan layar Buat aplikasi dengan Alchemy](./create-app.png)

Anda juga dapat menarik kunci API yang ada dengan mengarahkan kursor ke “Apps” dan memilih salah satunya. Anda dapat “View Key” di sini, serta “Edit App” untuk menambahkan domain spesifik ke daftar putih, melihat beberapa perangkat pengembang, dan melihat analitik.

![Gif yang menunjukkan kepada pengguna cara menarik kunci API](./pull-api-keys.gif)

## 3. Buat Permintaan dari Baris Perintah {#make-a-request-from-the-command-line}

Berinteraksi dengan blockchain Ethereum melalui Alchemy menggunakan JSON-RPC dan curl.

Untuk permintaan manual, kami merekomendasikan untuk berinteraksi dengan `JSON-RPC` melalui permintaan `POST`. Cukup teruskan header `Content-Type: application/json` dan kueri Anda sebagai isi `POST` dengan bidang-bidang berikut:

- `jsonrpc`: Versi JSON-RPC—saat ini, hanya `2.0` yang didukung.
- `method`: Metode API ETH. [Lihat referensi API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Daftar parameter untuk diteruskan ke metode.
- `id`: ID permintaan Anda. Akan dikembalikan oleh tanggapan, jadi Anda tetap bisa melacak permintaan mana yang ditanggapi.

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

**Jika Anda memiliki klien yang sudah ada,** ubah URL penyedia node Anda saat ini ke URL Alchemy dengan kunci API Anda: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key”`

**_CATATAN:_** Skrip di bawah ini perlu dijalankan dalam **konteks node** atau **disimpan dalam file**, bukan dijalankan dari baris perintah. Jika Anda belum menginstal Node atau npm, lihat [panduan penyiapan cepat untuk mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) ini.

Ada banyak sekali [pustaka Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) yang dapat Anda integrasikan dengan Alchemy, namun, kami merekomendasikan penggunaan [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), pengganti langsung untuk web3.js, yang dibuat dan dikonfigurasi agar dapat bekerja dengan lancar bersama Alchemy. Ini memberikan banyak keuntungan seperti percobaan ulang otomatis dan dukungan WebSocket yang kuat.

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

## 5. Tulis Skrip Web3 Pertama Anda! {#write-your-first-web3-script}

Sekarang untuk mencoba sedikit pemrograman web3, kita akan menulis skrip sederhana yang mencetak nomor blok terbaru dari Mainnet Ethereum.

**1. Jika Anda belum melakukannya, di terminal Anda, buat direktori proyek baru dan masuk ke dalamnya dengan cd:**

```
mkdir web3-example
cd web3-example
```

**2. Instal dependensi Alchemy web3 (atau web3 apa pun) ke dalam proyek Anda jika Anda belum melakukannya:**

```
npm install @alch/alchemy-web3
```

**3. Buat file bernama `index.js` dan tambahkan konten berikut:**

> Pada akhirnya, Anda harus mengganti `demo` dengan kunci API HTTP Alchemy Anda.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Tidak familiar dengan async? [Postingan Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Jalankan di terminal Anda menggunakan node**

```
node index.js
```

**5. Sekarang Anda akan melihat output nomor blok terbaru di konsol Anda!**

```
The latest block number is 11043912
```

**Woo!** Selamat! Anda baru saja menulis skrip web3 pertama Anda menggunakan Alchemy 🎉\*\*

Tidak yakin apa yang harus dilakukan selanjutnya? Coba sebarkan kontrak pintar pertama Anda dan coba langsung pemrograman Solidity di [Panduan Kontrak Pintar Hello World](https://www.alchemy.com/docs/hello-world-smart-contract) kami, atau uji pengetahuan dasbor Anda dengan [Aplikasi Demo Dasbor](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Daftar dengan Alchemy secara gratis](https://auth.alchemy.com/), lihat [dokumentasi](https://www.alchemy.com/docs/) kami, dan untuk berita terbaru, ikuti kami di [Twitter](https://twitter.com/AlchemyPlatform)_.
