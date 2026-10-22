---
title: Kontrak Pintar Hello World untuk Pemula
description: Tutorial pengantar tentang penulisan dan penyebaran kontrak pintar sederhana di Ethereum.
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "kontrak pintar", "penyebaran"]
skill: beginner
breadcrumb: Kontrak Hello World
lang: id
published: 2021-03-31
---

Jika Anda baru dalam pengembangan rantai blok dan tidak tahu harus mulai dari mana, atau jika Anda hanya ingin memahami cara menyebarkan dan berinteraksi dengan kontrak pintar, panduan ini cocok untuk Anda. Kita akan membahas pembuatan dan penyebaran kontrak pintar sederhana di jaringan pengujian Sepolia menggunakan dompet virtual [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), dan [Alchemy](https://www.alchemy.com/eth) (jangan khawatir jika Anda belum memahami apa arti semua ini, kami akan menjelaskannya).

Setelah kontrak Anda disebarkan, Anda dapat [membangun antarmuka pengguna untuknya](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Jika Anda memiliki pertanyaan kapan saja, jangan ragu untuk menghubungi di [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Langkah 1: Hubungkan ke jaringan Ethereum {#step-1}

Ada banyak cara untuk membuat permintaan ke rantai Ethereum. Untuk mempermudah, kita akan menggunakan akun gratis di Alchemy, sebuah platform pengembang rantai blok dan API yang memungkinkan kita berkomunikasi dengan rantai Ethereum tanpa harus menjalankan node kita sendiri. Platform ini juga memiliki alat pengembang untuk pemantauan dan analitik yang akan kita manfaatkan dalam tutorial ini untuk memahami apa yang terjadi secara teknis dalam penyebaran kontrak pintar kita. Jika Anda belum memiliki akun Alchemy, [Anda dapat mendaftar secara gratis di sini](https://dashboard.alchemy.com/signup).

## Langkah 2: Buat aplikasi Anda (dan kunci API) {#step-2}

Setelah Anda membuat akun Alchemy, Anda dapat menghasilkan kunci API dengan membuat aplikasi. Ini akan memungkinkan kita untuk membuat permintaan ke jaringan pengujian Sepolia. Jika Anda belum familier dengan testnet, lihat [halaman ini](/developers/docs/networks/).

1.  Arahkan ke halaman "Create new app" di Dasbor Alchemy Anda dengan memilih "Select an app" di bilah navigasi dan mengeklik "Create new app"

![Hello world create app](./hello-world-create-app.png)

2. Beri nama aplikasi Anda "Hello World", berikan deskripsi singkat, dan pilih kasus penggunaan, mis., "Infra & Tooling." Selanjutnya, cari "Ethereum" dan pilih jaringannya.

![create app view hello world](./create-app-view-hello-world.png)

3. Klik "Next" untuk melanjutkan, lalu "Create app" dan selesai! Aplikasi Anda akan muncul di menu tarik-turun bilah navigasi, dengan Kunci API yang tersedia untuk disalin.

## Langkah 3: Buat akun Ethereum (alamat) {#step-3}

Kita memerlukan akun Ethereum untuk mengirim dan menerima transaksi. Untuk tutorial ini, kita akan menggunakan MetaMask, dompet virtual di peramban yang digunakan untuk mengelola alamat akun Ethereum Anda. Selengkapnya tentang [transaksi](/developers/docs/transactions/).

Anda dapat mengunduh MetaMask dan membuat akun Ethereum secara gratis [di sini](https://metamask.io/download). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke jaringan pengujian "Sepolia" menggunakan menu tarik-turun jaringan (sehingga kita tidak berurusan dengan uang sungguhan).

Jika Anda tidak melihat Sepolia terdaftar, buka menu di sudut kanan atas, pilih "Networks", dan aktifkan "Show test networks" di bagian bawah daftar jaringan (lihat [panduan MetaMask untuk melihat testnet](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)). Kemudian pilih "Sepolia" di menu pemilihan jaringan.

![contoh sepolia metamask](./metamask-sepolia-example.png)

## Langkah 4: Tambahkan Ether dari faucet {#step-4}

Untuk menyebarkan kontrak pintar kita ke jaringan pengujian, kita akan membutuhkan beberapa ETH palsu. Untuk mendapatkan ETH Sepolia, Anda dapat membuka [detail jaringan Sepolia](/developers/docs/networks/#sepolia) untuk melihat daftar berbagai faucet. Jika salah satu tidak berfungsi, coba yang lain karena terkadang bisa kehabisan. Beberapa faucet memiliki aturan kelayakan; misalnya, faucet Sepolia Alchemy mengharuskan alamat penerima untuk menyimpan setidaknya 0,001 ETH di Mainnet Ethereum. Mungkin perlu beberapa saat untuk menerima ETH palsu Anda karena lalu lintas jaringan. Anda akan segera melihat ETH di akun MetaMask Anda!

## Langkah 5: Periksa Saldo Anda {#step-5}

Untuk memastikan kembali saldo kita ada di sana, mari buat permintaan [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) menggunakan [alat komposer Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Ini akan mengembalikan jumlah ETH di dompet kita. Setelah Anda memasukkan alamat akun MetaMask Anda dan mengeklik "Send Request", Anda akan melihat respons seperti ini:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **CATATAN:** Hasil ini dalam Wei, bukan ETH. Wei digunakan sebagai denominasi terkecil dari ether. Konversi dari Wei ke ETH adalah: 1 eth = 10<sup>18</sup> Wei. Jadi jika kita mengonversi 0x2B5E3AF16B1880000 ke desimal, kita mendapatkan 5\*10¹⁸ yang sama dengan 5 ETH.
>
> Fiuh! Uang palsu kita semuanya ada di sana <Emoji text=":money_mouth_face:" size={1} />.

## Langkah 6: Inisialisasi proyek kita {#step-6}

Pertama, kita perlu membuat folder untuk proyek kita. Arahkan ke baris perintah Anda dan ketik:

```sh
mkdir hello-world
cd hello-world
```

Sekarang setelah kita berada di dalam folder proyek kita, kita akan menggunakan `npm init` untuk menginisialisasi proyek. Jika Anda belum menginstal npm, ikuti [petunjuk penginstalan Node.js](https://nodejs.org/en/download/) (kita akan membutuhkan Node.js dan npm untuk tutorial ini).

```sh
npm init
```

Tidak terlalu penting bagaimana Anda menjawab pertanyaan penginstalan, berikut adalah cara kami melakukannya sebagai referensi:

```text
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Setujui package.json. Hardhat 3, yang akan kita instal selanjutnya, hanya mendukung proyek modul ES, jadi tandai proyek sebagai salah satunya:

```sh
npm pkg set type=module
```

Dan kita siap untuk melanjutkan!

## Langkah 7: Unduh [Hardhat](https://hardhat.org/docs/getting-started) {#step-7}

Hardhat adalah lingkungan pengembangan untuk mengompilasi, menyebarkan, menguji, dan men-debug perangkat lunak Ethereum Anda. Ini membantu pengembang saat membangun kontrak pintar dan aplikasi terdesentralisasi (dapp) secara lokal sebelum menyebarkannya ke rantai langsung.

Hardhat 3 memerlukan Node.js v22.13.0 atau yang lebih baru. Di dalam proyek `hello-world` kita, jalankan:

```sh
npm install --save-dev hardhat
```

Lihat halaman ini untuk detail selengkapnya tentang [petunjuk penginstalan](https://hardhat.org/docs/getting-started).

## Langkah 8: Buat proyek Hardhat {#step-8}

Menjalankan `npx hardhat --init` akan menghasilkan proyek sampel lengkap, tetapi untuk tutorial ini kita akan menyiapkan semuanya secara manual sehingga Anda dapat melihat setiap bagiannya. Di akar folder proyek Anda, buat file bernama `hardhat.config.js` dengan konten berikut:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Di sinilah kita akan menentukan semua penyiapan untuk proyek kita (pada langkah 13). Untuk saat ini, ini hanya memberi tahu Hardhat versi kompilator Solidity mana yang akan digunakan.

## Langkah 9: Tambahkan folder proyek {#step-9}

Untuk menjaga proyek kita tetap teratur, kita akan membuat dua folder baru. Arahkan ke direktori akar proyek Anda di baris perintah Anda dan ketik:

```sh
mkdir contracts
mkdir scripts
```

- `contracts/` adalah tempat kita akan menyimpan file kode kontrak pintar hello world kita
- `scripts/` adalah tempat kita akan menyimpan skrip untuk menyebarkan dan berinteraksi dengan kontrak kita

## Langkah 10: Tulis kontrak kita {#step-10}

Anda mungkin bertanya pada diri sendiri, kapan kita akan menulis kode?? Nah, di sinilah kita, pada langkah 10.

Buka proyek hello-world di editor favorit Anda (kami menyukai [VSCode](https://code.visualstudio.com/)). Kontrak pintar ditulis dalam bahasa yang disebut Solidity yang akan kita gunakan untuk menulis kontrak pintar HelloWorld.sol kita.‌

1.  Arahkan ke folder "contracts" dan buat file baru bernama HelloWorld.sol
2.  Di bawah ini adalah contoh kontrak pintar Hello World dari Yayasan Ethereum yang akan kita gunakan untuk tutorial ini. Salin dan tempel konten di bawah ini ke dalam file HelloWorld.sol Anda, dan pastikan untuk membaca komentar untuk memahami apa yang dilakukan kontrak ini:

```solidity
// SPDX-License-Identifier: MIT
// Menentukan versi Solidity, menggunakan pembuatan versi semantik.
// Pelajari lebih lanjut: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// Mendefinisikan sebuah kontrak bernama `HelloWorld`.
// Sebuah kontrak adalah kumpulan fungsi dan data (statusnya). Setelah disebarkan, sebuah kontrak berada di alamat tertentu di rantai blok Ethereum. Pelajari lebih lanjut: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // Mendeklarasikan variabel status `message` dengan tipe `string`.
   // Variabel status adalah variabel yang nilainya disimpan secara permanen di penyimpanan kontrak. Kata kunci `public` membuat variabel dapat diakses dari luar kontrak dan membuat fungsi yang dapat dipanggil oleh kontrak atau klien lain untuk mengakses nilainya.
   string public message;

   // Mirip dengan banyak bahasa berorientasi objek berbasis kelas, konstruktor adalah fungsi khusus yang hanya dieksekusi saat pembuatan kontrak.
   // Konstruktor digunakan untuk menginisialisasi data kontrak. Pelajari lebih lanjut: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // Menerima argumen string `initMessage` dan menetapkan nilainya ke dalam variabel penyimpanan `message` milik kontrak).
      message = initMessage;
   }

   // Fungsi publik yang menerima argumen string dan memperbarui variabel penyimpanan `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Ini adalah kontrak pintar yang sangat sederhana yang menyimpan pesan saat pembuatan dan dapat diperbarui dengan memanggil fungsi `update`.

## Langkah 11: Hubungkan MetaMask & Alchemy ke proyek Anda {#step-11}

Kita telah membuat dompet MetaMask, akun Alchemy, dan menulis kontrak pintar kita, sekarang saatnya untuk menghubungkan ketiganya.

Setiap transaksi yang dikirim dari dompet virtual Anda memerlukan tanda tangan menggunakan kunci privat unik Anda. Untuk memberikan izin ini kepada program kita, kita dapat menyimpan kunci privat kita (dan kunci API Alchemy) dengan aman dalam file lingkungan.

> Untuk mempelajari selengkapnya tentang pengiriman transaksi, lihat [dokumentasi transaksi](/developers/docs/transactions/).

Buat file `.env` di direktori akar proyek kita, dan tambahkan kunci privat MetaMask Anda dan URL API Alchemy HTTP ke dalamnya.

- Ikuti [petunjuk ini](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) untuk mengekspor kunci privat Anda
- Lihat di bawah ini untuk mendapatkan URL API Alchemy HTTP

![dapatkan kunci api alchemy](./get-alchemy-api-key.png)

Salin URL API Alchemy

File `.env` Anda akan terlihat seperti ini:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Untuk benar-benar menghubungkan ini ke kode kita, kita akan mereferensikan variabel-variabel ini dalam file `hardhat.config.js` kita pada langkah 13. Node.js dapat membaca file `.env` dengan sendirinya, jadi tidak ada paket tambahan yang perlu diinstal.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Jangan komit <code>.env</code>! Pastikan untuk tidak pernah membagikan atau mengekspos file <code>.env</code> Anda kepada siapa pun, karena Anda membahayakan rahasia Anda dengan melakukannya. Jika Anda menggunakan kontrol versi, tambahkan <code>.env</code> Anda ke file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Langkah 12: Instal Ethers.js {#step-12-install-ethersjs}

Ethers.js adalah Pustaka yang memudahkan interaksi dan pembuatan permintaan ke Ethereum dengan membungkus [metode JSON-RPC standar](/developers/docs/apis/json-rpc/) dengan metode yang lebih ramah pengguna.

Hardhat membuatnya sangat mudah untuk mengintegrasikan [Plugin](https://hardhat.org/docs/plugins/official-plugins) untuk perkakas tambahan dan fungsionalitas yang diperluas. Kita akan memanfaatkan [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) untuk penyebaran kontrak ([Ethers.js](https://docs.ethers.org/v6/) memiliki beberapa metode penyebaran kontrak yang sangat rapi).

Di direktori proyek Anda, ketik:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Kita juga akan menambahkan plugin ke `hardhat.config.js` kita pada langkah berikutnya.

## Langkah 13: Perbarui hardhat.config.js {#step-13-update-hardhatconfigjs}

Kita telah menambahkan beberapa dependensi dan plugin sejauh ini, sekarang kita perlu memperbarui `hardhat.config.js` sehingga proyek kita mengetahui semuanya.

Perbarui `hardhat.config.js` Anda agar terlihat seperti ini:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Memuat API_URL dan PRIVATE_KEY dari file .env ke dalam process.env, jika ada
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` memberi tahu Hardhat untuk membaca setiap nilai dari variabel lingkungan hanya saat dibutuhkan, sehingga perintah seperti `compile` berfungsi bahkan sebelum nilainya ditetapkan. Jika Anda lebih suka tidak menyimpan kunci privat Anda dalam file teks biasa, Hardhat juga dapat membaca [variabel konfigurasi dari penyimpanan kunci terenkripsi](https://hardhat.org/docs/guides/configuration-variables).

## Langkah 14: Kompilasi kontrak kita {#step-14-compile-our-contracts}

Untuk memastikan semuanya berfungsi sejauh ini, mari kita kompilasi kontrak kita. Tugas `compile` adalah salah satu tugas bawaan Hardhat.

Dari baris perintah, jalankan:

```sh
npx hardhat compile
```

Pertama kali Anda mengompilasi, Hardhat mengunduh kompilator Solidity. Anda kemudian akan melihat sesuatu seperti `Compiled 1 Solidity file with solc 0.8.34`. Jika tidak, Anda selalu dapat mengirim pesan di [Discord Alchemy](https://discord.gg/gWuC7zB).

## Langkah 15: Tulis skrip penyebaran kita {#step-15-write-our-deploy-scripts}

Sekarang setelah kontrak kita ditulis dan file konfigurasi kita siap digunakan, saatnya untuk menulis skrip penyebaran kontrak kita.

Arahkan ke folder `scripts/` dan buat file baru bernama `deploy.js` , tambahkan konten berikut ke dalamnya:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// Memulai penyebaran, mengembalikan promise yang menyelesaikan menjadi objek kontrak
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

Mari kita bahas apa yang dilakukan setiap baris kode ini.

```js
const { ethers } = await network.create()
```

Di Hardhat 3, sebuah skrip membuka koneksi ke jaringan secara eksplisit. `network.create()` terhubung ke jaringan yang Anda pilih dengan opsi `--network` saat Anda menjalankan skrip, dan plugin `hardhat-ethers` menambahkan objek `ethers` ke koneksi tersebut.

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` di ethers.js adalah abstraksi yang digunakan untuk menyebarkan kontrak pintar baru, jadi `HelloWorld` di sini adalah pabrik untuk instans kontrak hello world kita. Saat menggunakan plugin `hardhat-ethers`, instans `ContractFactory` dan `Contract` terhubung ke penanda tangan pertama secara default.

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

Memanggil `deploy()` pada `ContractFactory` akan memulai penyebaran, dan mengembalikan `Promise` yang diselesaikan menjadi `Contract`. Ini adalah objek yang memiliki metode untuk setiap fungsi kontrak pintar kita. Argumen yang Anda teruskan ke `deploy()` masuk ke konstruktor kontrak, di sini pesan awal.

`waitForDeployment()` menunggu hingga transaksi penyebaran disertakan dalam blok, dan `getAddress()` mengembalikan alamat kontrak baru. Lihat [dokumentasi kontrak ethers.js](https://docs.ethers.org/v6/api/contract/) untuk detail selengkapnya.

## Langkah 16: Sebarkan kontrak kita {#step-16-deploy-our-contract}

Kita akhirnya siap untuk menyebarkan kontrak pintar kita! Arahkan ke baris perintah dan jalankan:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Anda kemudian akan melihat sesuatu seperti:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Jika kita pergi ke [Etherscan Sepolia](https://sepolia.etherscan.io/) dan mencari alamat kontrak kita, kita seharusnya dapat melihat bahwa kontrak tersebut telah berhasil disebarkan. Transaksinya akan terlihat seperti ini:

![kontrak etherscan](./etherscan-contract.png)

Alamat `From` harus cocok dengan alamat akun MetaMask Anda dan alamat To akan bertuliskan "Contract Creation" tetapi jika kita mengeklik transaksi tersebut, kita akan melihat alamat kontrak kita di bidang `To`:

![transaksi etherscan](./etherscan-transaction.png)

Selamat! Anda baru saja menyebarkan kontrak pintar ke rantai Ethereum 🎉

Untuk memahami apa yang terjadi secara teknis, Anda dapat melihat permintaan yang diterima aplikasi "Hello World" Anda di [dasbor Alchemy](https://dashboard.alchemy.com/) Anda.

Di sana Anda akan melihat beberapa panggilan JSON-RPC yang dilakukan Hardhat/Ethers secara internal untuk kita saat kita memanggil fungsi `.deploy()`. Dua hal penting yang perlu diperhatikan di sini adalah [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), yang merupakan permintaan untuk benar-benar menulis kontrak kita ke rantai Sepolia, dan [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) yang merupakan permintaan untuk membaca informasi tentang transaksi kita berdasarkan hash (pola umum saat mengirim transaksi). Untuk mempelajari selengkapnya tentang pengiriman transaksi, lihat [dokumentasi transaksi](/developers/docs/transactions/).

Itu saja untuk tutorial ini. Selanjutnya, Anda dapat [membangun antarmuka pengguna untuk kontrak Anda](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).
