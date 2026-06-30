---
title: Kontrak Pintar Hello World untuk Pemula - Fullstack
description: Tutorial pengantar tentang menulis dan menyebarkan kontrak pintar sederhana di Ethereum.
author: "nstrike2"
breadcrumb: Hello World fullstack
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "kontrak pintar",
    "menyebarkan",
    "penjelajah blok",
    "frontend",
    "transaksi",
    "kerangka kerja",
  ]
skill: beginner
lang: id
published: 2021-10-25
---

Panduan ini ditujukan untuk Anda jika Anda baru mengenal pengembangan rantai blok dan tidak tahu harus mulai dari mana atau bagaimana cara menyebarkan dan berinteraksi dengan kontrak pintar. Kita akan membahas pembuatan dan penyebaran kontrak pintar sederhana di jaringan testnet Goerli menggunakan [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), dan [Alchemy](https://alchemy.com/eth).

Anda akan memerlukan akun Alchemy untuk menyelesaikan tutorial ini. [Daftar untuk mendapatkan akun gratis](https://www.alchemy.com/).

Jika Anda memiliki pertanyaan kapan saja, jangan ragu untuk menghubungi kami di [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Bagian 1 - Membuat dan Menyebarkan Kontrak Pintar Anda menggunakan Hardhat {#part-1}

### Terhubung ke jaringan Ethereum {#connect-to-the-ethereum-network}

Ada banyak cara untuk membuat permintaan ke rantai Ethereum. Untuk mempermudah, kita akan menggunakan akun gratis di Alchemy, sebuah platform pengembang rantai blok dan API yang memungkinkan kita untuk berkomunikasi dengan rantai Ethereum tanpa harus menjalankan node sendiri. Alchemy juga memiliki alat pengembang untuk pemantauan dan analitik; kita akan memanfaatkan alat-alat ini dalam tutorial ini untuk memahami bagaimana cara kerjanya secara teknis dalam penyebaran kontrak pintar kita.

### Buat aplikasi dan kunci API Anda {#create-your-app-and-api-key}

Setelah Anda membuat akun Alchemy, Anda dapat menghasilkan kunci API dengan membuat aplikasi. Ini akan memungkinkan Anda untuk membuat permintaan ke testnet Goerli. Jika Anda belum familier dengan testnet, Anda dapat [membaca panduan Alchemy untuk memilih jaringan](https://www.alchemy.com/docs/choosing-a-web3-network).

Di dasbor Alchemy, temukan menu tarik-turun **Apps** di bilah navigasi dan klik **Create App**.

![Hello world create app](./hello-world-create-app.png)

Beri nama aplikasi Anda '_Hello World_' dan tulis deskripsi singkat. Pilih **Staging** sebagai lingkungan Anda dan **Goerli** sebagai jaringan Anda.

![create app view hello world](./create-app-view-hello-world.png)

_Catatan: pastikan untuk memilih **Goerli**, atau tutorial ini tidak akan berfungsi._

Klik **Create app**. Aplikasi Anda akan muncul di tabel di bawah ini.

### Buat akun Ethereum {#create-an-ethereum-account}

Anda memerlukan akun Ethereum untuk mengirim dan menerima transaksi. Kita akan menggunakan MetaMask, dompet virtual di peramban yang memungkinkan pengguna mengelola alamat akun Ethereum mereka.

Anda dapat mengunduh dan membuat akun MetaMask secara gratis [di sini](https://metamask.io/download). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke "Goerli Test Network" di kanan atas (sehingga kita tidak berurusan dengan uang sungguhan).

### Langkah 4: Tambahkan ether dari Faucet {#step-4-add-ether-from-a-faucet}

Untuk menyebarkan kontrak pintar Anda ke jaringan pengujian (testnet), Anda akan memerlukan beberapa ETH palsu. Untuk mendapatkan ETH di jaringan Goerli, buka faucet Goerli dan masukkan alamat akun Goerli Anda. Perhatikan bahwa faucet Goerli akhir-akhir ini bisa sedikit tidak dapat diandalkan - lihat [halaman jaringan pengujian](/developers/docs/networks/#goerli) untuk daftar opsi yang dapat dicoba:

_Catatan: karena kepadatan jaringan, ini mungkin memakan waktu beberapa saat._
``

### Langkah 5: Periksa Saldo Anda {#step-5-check-your-balance}

Untuk memeriksa kembali apakah ETH ada di dompet Anda, mari kita buat permintaan [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) menggunakan [alat sandbox Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Ini akan mengembalikan jumlah ETH di dompet kita. Untuk mempelajari lebih lanjut, lihat [tutorial singkat Alchemy tentang cara menggunakan alat komposer](https://youtu.be/r6sjRxBZJuU).

Masukkan alamat akun MetaMask Anda dan klik **Send Request**. Anda akan melihat respons yang terlihat seperti cuplikan kode di bawah ini.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Catatan: Hasil ini dalam wei, bukan ETH. Wei digunakan sebagai denominasi terkecil dari ether._

Fiuh! Uang palsu kita semuanya ada di sana.
### Langkah 6: Inisialisasi proyek kita {#step-6-initialize-our-project}

Pertama, kita perlu membuat folder untuk proyek kita. Navigasikan ke baris perintah Anda dan masukkan yang berikut ini.

```
mkdir hello-world
cd hello-world
```

Sekarang setelah kita berada di dalam folder proyek kita, kita akan menggunakan `npm init` untuk menginisialisasi proyek.

> Jika Anda belum menginstal npm, ikuti [petunjuk penginstalan Node.js](https://nodejs.org/en/download/) untuk menginstal Node.js dan npm.

Untuk tujuan tutorial ini, tidak masalah bagaimana Anda menjawab pertanyaan inisialisasi. Berikut adalah cara kami melakukannya sebagai referensi:

```
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

Setujui package.json dan kita siap untuk melanjutkan!
### Langkah 7: Unduh Hardhat {#step-7-download-hardhat}

Hardhat adalah lingkungan pengembangan untuk mengompilasi, menyebarkan, menguji, dan men-debug perangkat lunak Ethereum Anda. Ini membantu pengembang saat membangun kontrak pintar dan aplikasi terdesentralisasi (dapp) secara lokal sebelum menyebarkannya ke rantai langsung.

Di dalam proyek `hello-world` kita, jalankan:

```
npm install --save-dev hardhat
```

Lihat halaman ini untuk detail lebih lanjut tentang [petunjuk penginstalan](https://hardhat.org/getting-started/#overview).

### Langkah 8: Buat proyek Hardhat {#step-8-create-hardhat-project}

Di dalam folder proyek `hello-world` kita, jalankan:

```
npx hardhat
```

Anda kemudian akan melihat pesan selamat datang dan opsi untuk memilih apa yang ingin Anda lakukan. Pilih "create an empty hardhat.config.js":

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Ini akan menghasilkan file `hardhat.config.js` di dalam proyek. Kita akan menggunakan ini nanti dalam tutorial untuk menentukan penyiapan proyek kita.

### Langkah 9: Tambahkan folder proyek {#step-9-add-project-folders}

Untuk menjaga proyek tetap teratur, mari kita buat dua folder baru. Di baris perintah, navigasikan ke direktori akar proyek `hello-world` Anda dan ketik:

```
mkdir contracts
mkdir scripts
```

- `contracts/` adalah tempat kita akan menyimpan file kode kontrak pintar hello world kita
- `scripts/` adalah tempat kita akan menyimpan skrip untuk menyebarkan dan berinteraksi dengan kontrak kita

### Langkah 10: Tulis kontrak kita {#step-10-write-our-contract}

Anda mungkin bertanya pada diri sendiri, kapan kita akan menulis kode? Sekarang saatnya!

Buka proyek hello-world di editor favorit Anda. Kontrak pintar paling sering ditulis dalam Solidity, yang akan kita gunakan untuk menulis kontrak pintar kita.‌

1. Navigasikan ke folder `contracts` dan buat file baru bernama `HelloWorld.sol`
2. Di bawah ini adalah contoh kontrak pintar Hello World yang akan kita gunakan untuk tutorial ini. Salin konten di bawah ini ke dalam file `HelloWorld.sol`.

_Catatan: Pastikan untuk membaca komentar untuk memahami apa yang dilakukan kontrak ini._

```
// Menentukan versi Solidity, menggunakan pembuatan versi semantik.
// Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Mendefinisikan kontrak bernama `HelloWorld`.
// Kontrak adalah kumpulan fungsi dan data (state-nya). Setelah disebarkan, kontrak berada di alamat tertentu di rantai blok Ethereum. Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Dipancarkan saat fungsi pembaruan dipanggil
   //Peristiwa kontrak pintar adalah cara bagi kontrak Anda untuk mengomunikasikan bahwa sesuatu terjadi di rantai blok ke front-end aplikasi Anda, yang dapat 'mendengarkan' peristiwa tertentu dan mengambil tindakan saat peristiwa itu terjadi.
   event UpdatedMessages(string oldStr, string newStr);

   // Mendeklarasikan variabel state `message` dengan tipe `string`.
   // Variabel state adalah variabel yang nilainya disimpan secara permanen di penyimpanan kontrak. Kata kunci `public` membuat variabel dapat diakses dari luar kontrak dan membuat fungsi yang dapat dipanggil oleh kontrak atau klien lain untuk mengakses nilainya.
   string public message;

   // Mirip dengan banyak bahasa berorientasi objek berbasis kelas, konstruktor adalah fungsi khusus yang hanya dieksekusi saat pembuatan kontrak.
   // Konstruktor digunakan untuk menginisialisasi data kontrak. Pelajari lebih lanjut:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Menerima argumen string `initMessage` dan menetapkan nilainya ke dalam variabel penyimpanan `message` kontrak).
      message = initMessage;
   }

   // Fungsi publik yang menerima argumen string dan memperbarui variabel penyimpanan `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Ini adalah kontrak pintar dasar yang menyimpan pesan saat pembuatan. Ini dapat diperbarui dengan memanggil fungsi `update`.

### Langkah 11: Hubungkan MetaMask & Alchemy ke proyek Anda {#step-11-connect-metamask-alchemy-to-your-project}

Kita telah membuat dompet MetaMask, akun Alchemy, dan menulis kontrak pintar kita, sekarang saatnya untuk menghubungkan ketiganya.

Setiap transaksi yang dikirim dari dompet Anda memerlukan tanda tangan menggunakan kunci privat unik Anda. Untuk memberikan izin ini kepada program kita, kita dapat menyimpan kunci privat kita dengan aman di file lingkungan (environment file). Kita juga akan menyimpan kunci API untuk Alchemy di sini.

> Untuk mempelajari lebih lanjut tentang mengirim transaksi, lihat [tutorial ini](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) tentang mengirim transaksi menggunakan Web3.

Pertama, instal paket dotenv di direktori proyek Anda:

```
npm install dotenv --save
```

Kemudian, buat file `.env` di direktori akar proyek. Tambahkan kunci privat MetaMask Anda dan URL API HTTP Alchemy ke dalamnya.

File lingkungan Anda harus diberi nama `.env` atau file tersebut tidak akan dikenali sebagai file lingkungan.

Jangan menamainya `process.env` atau `.env-custom` atau apa pun yang lain.

- Ikuti [petunjuk ini](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) untuk mengekspor kunci privat Anda
- Lihat di bawah ini untuk mendapatkan URL API HTTP Alchemy

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

File `.env` Anda akan terlihat seperti ini:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Untuk benar-benar menghubungkan ini ke kode kita, kita akan mereferensikan variabel-variabel ini di file `hardhat.config.js` kita pada langkah 13.

### Langkah 12: Instal Ethers.js {#step-12-install-ethersjs}

Ethers.js adalah pustaka yang memudahkan untuk berinteraksi dan membuat permintaan ke Ethereum dengan membungkus [metode JSON-RPC standar](/developers/docs/apis/json-rpc/) dengan metode yang lebih ramah pengguna.

Hardhat memungkinkan kita untuk mengintegrasikan [plugin](https://hardhat.org/plugins/) untuk perkakas tambahan dan fungsionalitas yang diperluas. Kita akan memanfaatkan [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) untuk penyebaran kontrak.

Di direktori proyek Anda, ketik:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Langkah 13: Perbarui hardhat.config.js {#step-13-update-hardhat-configjs}

Kita telah menambahkan beberapa dependensi dan plugin sejauh ini, sekarang kita perlu memperbarui `hardhat.config.js` agar proyek kita mengetahui semuanya.

Perbarui `hardhat.config.js` Anda agar terlihat seperti ini:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Langkah 14: Kompilasi kontrak kita {#step-14-compile-our-contract}

Untuk memastikan semuanya berfungsi sejauh ini, mari kita kompilasi kontrak kita. Tugas `compile` adalah salah satu tugas bawaan Hardhat.

Dari baris perintah, jalankan:

```bash
npx hardhat compile
```

Anda mungkin mendapatkan peringatan tentang `SPDX license identifier not provided in source file`, tetapi tidak perlu khawatir tentang itu — semoga semuanya terlihat baik! Jika tidak, Anda selalu dapat mengirim pesan di [Discord Alchemy](https://discord.gg/u72VCg3).

### Langkah 15: Tulis skrip penyebaran kita {#step-15-write-our-deploy-script}

Sekarang setelah kontrak kita ditulis dan file konfigurasi kita siap, saatnya untuk menulis skrip penyebaran kontrak kita.

Navigasikan ke folder `scripts/` dan buat file baru bernama `deploy.js` , lalu tambahkan konten berikut ke dalamnya:

```javascript
async function main() {
  const HelloWorld = await ethers.getKontrakFactory("HelloWorld")

  // Mulai penyebaran, mengembalikan promise yang menghasilkan objek kontrak
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat melakukan pekerjaan yang luar biasa dalam menjelaskan apa yang dilakukan setiap baris kode ini dalam [tutorial Kontrak](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) mereka, kita telah mengadopsi penjelasan mereka di sini.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Sebuah `ContractFactory` di ethers.js adalah abstraksi yang digunakan untuk menyebarkan kontrak pintar baru, jadi `HelloWorld` di sini adalah [pabrik (factory)](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) untuk instans kontrak hello world kita. Saat menggunakan plugin `hardhat-ethers` `ContractFactory` dan `Contract`, instans terhubung ke penandatangan pertama (pemilik) secara default.

```javascript
const hello_world = await HelloWorld.deploy()
```

Memanggil `deploy()` pada `ContractFactory` akan memulai penyebaran, dan mengembalikan `Promise` yang diselesaikan menjadi objek `Contract`. Ini adalah objek yang memiliki metode untuk setiap fungsi kontrak pintar kita.

### Langkah 16: Sebarkan kontrak kita {#step-16-deploy-our-contract}

Kita akhirnya siap untuk menyebarkan kontrak pintar kita! Navigasikan ke baris perintah dan jalankan:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Anda kemudian akan melihat sesuatu seperti:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Harap simpan alamat ini**. Kita akan menggunakannya nanti dalam tutorial.

Jika kita pergi ke [Etherscan Goerli](https://goerli.etherscan.io) dan mencari alamat kontrak kita, kita seharusnya dapat melihat bahwa kontrak tersebut telah berhasil disebarkan. Transaksi akan terlihat seperti ini:

![](./etherscan-contract.png)

Alamat `From` harus cocok dengan alamat akun MetaMask Anda dan alamat `To` akan bertuliskan **Contract Creation**. Jika kita mengeklik transaksi tersebut, kita akan melihat alamat kontrak kita di bidang `To`.

![](./etherscan-transaction.png)

Selamat! Anda baru saja menyebarkan kontrak pintar ke testnet Ethereum.

Untuk memahami bagaimana cara kerjanya secara teknis, mari navigasikan ke tab Explorer di [dasbor Alchemy](https://dashboard.alchemy.com/explorer) kita. Jika Anda memiliki beberapa aplikasi Alchemy, pastikan untuk memfilter berdasarkan aplikasi dan pilih **Hello World**.

![](./hello-world-explorer.png)

Di sini Anda akan melihat beberapa metode JSON-RPC yang dibuat oleh Hardhat/Ethers di balik layar untuk kita saat kita memanggil fungsi `.deploy()`. Dua metode penting di sini adalah [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), yang merupakan permintaan untuk menulis kontrak kita ke rantai Goerli, dan [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash), yang merupakan permintaan untuk membaca informasi tentang transaksi kita berdasarkan hash-nya. Untuk mempelajari lebih lanjut tentang mengirim transaksi, lihat [tutorial kami tentang mengirim transaksi menggunakan Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Bagian 2: Berinteraksi dengan Kontrak Pintar Anda {#part-2-interact-with-your-smart-contract}

Sekarang setelah kita berhasil menyebarkan kontrak pintar ke jaringan Goerli, mari kita pelajari cara berinteraksi dengannya.

### Buat file interact.js {#create-a-interactjs-file}

Ini adalah file tempat kita akan menulis skrip interaksi kita. Kita akan menggunakan pustaka Ethers.js yang sebelumnya Anda instal di Bagian 1.

Di dalam folder `scripts/`, buat file baru bernama `interact.js` tambahkan kode berikut:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Perbarui file .env Anda {#update-your-env-file}

Kita akan menggunakan variabel lingkungan baru, jadi kita perlu mendefinisikannya di file `.env` yang [kita buat sebelumnya](#step-11-connect-metamask-alchemy-to-your-project).

Kita perlu menambahkan definisi untuk `API_KEY` Alchemy kita dan `CONTRACT_ADDRESS` tempat kontrak pintar Anda disebarkan.

File `.env` Anda akan terlihat seperti ini:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Ambil ABI kontrak Anda {#grab-your-contract-abi}

[ABI (Application Binary Interface)](/glossary/#abi) kontrak kita adalah antarmuka untuk berinteraksi dengan kontrak pintar kita. Hardhat secara otomatis menghasilkan ABI dan menyimpannya di `HelloWorld.json`. Untuk menggunakan ABI, kita perlu mengurai kontennya dengan menambahkan baris kode berikut ke file `interact.js` kita:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Jika Anda ingin melihat ABI, Anda dapat mencetaknya ke konsol Anda:

```javascript
console.log(JSON.stringify(contract.abi))
```

Untuk melihat ABI Anda dicetak ke konsol, navigasikan ke terminal Anda dan jalankan:

```bash
npx hardhat run scripts/interact.js
```

### Buat instans kontrak Anda {#create-an-instance-of-your-contract}

Untuk berinteraksi dengan kontrak kita, kita perlu membuat instans kontrak dalam kode kita. Untuk melakukannya dengan Ethers.js, kita perlu bekerja dengan tiga konsep:

1. Provider - penyedia node yang memberi Anda akses baca dan tulis ke rantai blok
2. Signer - mewakili akun Ethereum yang dapat menandatangani transaksi
3. Contract - objek Ethers.js yang mewakili kontrak tertentu yang disebarkan secara onchain

Kita akan menggunakan ABI kontrak dari langkah sebelumnya untuk membuat instans kontrak kita:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Pelajari lebih lanjut tentang Provider, Signer, dan Contract di [dokumentasi ethers.js](https://docs.ethers.io/v5/).

### Baca pesan inisialisasi {#read-the-init-message}

Ingat ketika kita menyebarkan kontrak kita dengan `initMessage = "Hello world!"`? Kita sekarang akan membaca pesan yang disimpan dalam kontrak pintar kita dan mencetaknya ke konsol.

Dalam JavaScript, fungsi asinkron digunakan saat berinteraksi dengan jaringan. Untuk mempelajari lebih lanjut tentang fungsi asinkron, [baca artikel medium ini](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Gunakan kode di bawah ini untuk memanggil fungsi `message` dalam kontrak pintar kita dan membaca pesan inisialisasi:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Setelah menjalankan file menggunakan `npx hardhat run scripts/interact.js` di terminal, kita akan melihat respons ini:

```
Pesan tersebut adalah: Hello world!
```

Selamat! Anda baru saja berhasil membaca data kontrak pintar dari rantai blok Ethereum, kerja bagus!

### Perbarui pesan {#update-the-message}

Alih-alih hanya membaca pesan, kita juga dapat memperbarui pesan yang disimpan dalam kontrak pintar kita menggunakan fungsi `update`! Keren, kan?

Untuk memperbarui pesan, kita dapat langsung memanggil fungsi `update` pada objek Contract yang telah kita instansiasi:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

Perhatikan bahwa pada baris 11, kita melakukan panggilan ke `.wait()` pada objek transaksi yang dikembalikan. Ini memastikan bahwa skrip kita menunggu transaksi ditambang di rantai blok sebelum keluar dari fungsi. Jika panggilan `.wait()` tidak disertakan, skrip mungkin tidak melihat nilai `message` yang diperbarui dalam kontrak.

### Baca pesan baru {#read-the-new-message}

Anda seharusnya dapat mengulangi [langkah sebelumnya](#read-the-init-message) untuk membaca nilai `message` yang diperbarui. Luangkan waktu sejenak dan lihat apakah Anda dapat membuat perubahan yang diperlukan untuk mencetak nilai baru tersebut!

Jika Anda butuh petunjuk, inilah tampilan file `interact.js` Anda pada titik ini:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signer - Anda
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// instans kontrak
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

Sekarang jalankan saja skripnya dan Anda seharusnya dapat melihat pesan lama, status pembaruan, dan pesan baru dicetak ke terminal Anda!

`npx hardhat run scripts/interact.js --network goerli`

```
Pesan tersebut adalah: Hello World!
Memperbarui pesan...
Pesan baru tersebut adalah: This is the new message.
```

Saat menjalankan skrip tersebut, Anda mungkin menyadari bahwa langkah `Updating the message...` membutuhkan waktu beberapa saat untuk dimuat sebelum pesan baru dimuat. Hal itu disebabkan oleh proses penambangan; jika Anda penasaran tentang pelacakan transaksi saat sedang ditambang, kunjungi [mempool Alchemy](https://dashboard.alchemy.com/mempool) untuk melihat status transaksi. Jika transaksi dibatalkan, ada baiknya juga untuk memeriksa [Etherscan Goerli](https://goerli.etherscan.io) dan mencari hash transaksi Anda.

## Bagian 3: Publikasikan Kontrak Pintar Anda ke Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Anda telah melakukan semua kerja keras untuk menghidupkan kontrak pintar Anda; sekarang saatnya untuk membagikannya kepada dunia!

Dengan memverifikasi kontrak pintar Anda di Etherscan, siapa pun dapat melihat kode sumber Anda dan berinteraksi dengan kontrak pintar Anda. Mari kita mulai!

### Langkah 1: Buat Kunci API di akun Etherscan Anda {#step-1-generate-an-api-key-on-your-etherscan-account}

Kunci API Etherscan diperlukan untuk memverifikasi bahwa Anda memiliki kontrak pintar yang ingin Anda publikasikan.

Jika Anda belum memiliki akun Etherscan, [daftarlah untuk membuat akun](https://etherscan.io/register).

Setelah masuk, temukan nama pengguna Anda di bilah navigasi, arahkan kursor ke atasnya, dan pilih tombol **My profile**.

Di halaman profil Anda, Anda akan melihat bilah navigasi samping. Dari bilah navigasi samping, pilih **API Keys**. Selanjutnya, tekan tombol "Add" untuk membuat kunci API baru, beri nama aplikasi Anda **hello-world** dan tekan tombol **Create New API Key**.

Kunci API baru Anda akan muncul di tabel kunci API. Salin kunci API tersebut ke papan klip Anda.

Selanjutnya, kita perlu menambahkan kunci API Etherscan ke file `.env` kita.

Setelah menambahkannya, file `.env` Anda akan terlihat seperti ini:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Kontrak pintar yang disebarkan dengan Hardhat {#hardhat-deployed-smart-contracts}

#### Instal hardhat-etherscan {#install-hardhat-etherscan}

Mempublikasikan kontrak Anda ke Etherscan menggunakan Hardhat sangatlah mudah. Pertama, Anda perlu menginstal plugin `hardhat-etherscan` untuk memulai. `hardhat-etherscan` akan secara otomatis memverifikasi kode sumber dan ABI kontrak pintar di Etherscan. Untuk menambahkannya, di direktori `hello-world` jalankan:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Setelah diinstal, sertakan pernyataan berikut di bagian atas `hardhat.config.js` Anda, dan tambahkan opsi konfigurasi Etherscan:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Kunci API Anda untuk Etherscan
    // Dapatkan di https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Verifikasi kontrak pintar Anda di Etherscan {#verify-your-smart-contract-on-etherscan}

Pastikan semua file telah disimpan dan semua variabel `.env` dikonfigurasi dengan benar.

Jalankan tugas `verify`, dengan meneruskan alamat kontrak, dan jaringan tempat kontrak tersebut disebarkan:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Pastikan bahwa `DEPLOYED_CONTRACT_ADDRESS` adalah alamat kontrak pintar Anda yang disebarkan di jaringan pengujian Goerli. Selain itu, argumen terakhir (`'Hello World!'`) harus berupa nilai string yang sama yang digunakan [selama langkah penyebaran di bagian 1](#step-15-write-our-deploy-script).

Jika semuanya berjalan lancar, Anda akan melihat pesan berikut di terminal Anda:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Selamat! Kode kontrak pintar Anda sudah ada di Etherscan!

### Lihat kontrak pintar Anda di Etherscan! {#check-out-your-smart-contract-on-etherscan}

Saat Anda menavigasi ke tautan yang disediakan di terminal Anda, Anda seharusnya dapat melihat kode kontrak pintar dan ABI Anda dipublikasikan di Etherscan!

**Wahooo - Anda berhasil, juara! Sekarang siapa pun dapat memanggil atau menulis ke kontrak pintar Anda! Kami tidak sabar untuk melihat apa yang akan Anda bangun selanjutnya!**

## Bagian 4 - Mengintegrasikan kontrak pintar Anda dengan frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Pada akhir tutorial ini, Anda akan mengetahui cara:

- Menghubungkan dompet MetaMask ke aplikasi terdesentralisasi (dapp) Anda
- Membaca data dari kontrak pintar Anda menggunakan API [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Menandatangani transaksi Ethereum menggunakan MetaMask

Untuk dapp ini, kita akan menggunakan [React](https://react.dev/) sebagai kerangka kerja frontend kita; namun, penting untuk dicatat bahwa kita tidak akan menghabiskan banyak waktu untuk menguraikan dasar-dasarnya, karena kita sebagian besar akan berfokus pada membawa fungsionalitas Web3 ke proyek kita.

Sebagai prasyarat, Anda harus memiliki pemahaman tingkat pemula tentang React. Jika tidak, kami sarankan untuk menyelesaikan [tutorial Pengantar React](https://react.dev/learn) resmi.

### Kloning file pemula {#clone-the-starter-files}

Pertama, buka [repositori GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) untuk mendapatkan file pemula untuk proyek ini dan kloning repositori ini ke mesin lokal Anda.

Buka repositori yang dikloning secara lokal. Perhatikan bahwa repositori ini berisi dua folder: `starter-files` dan `completed`.

- `starter-files`- **kita akan bekerja di direktori ini**, kita akan menghubungkan UI ke dompet Ethereum Anda dan kontrak pintar yang kita terbitkan ke Etherscan di [Bagian 3](#part-3-publish-your-smart-contract-to-etherscan).
- `completed` berisi seluruh tutorial yang telah selesai dan hanya boleh digunakan sebagai referensi jika Anda mengalami kebuntuan.

Selanjutnya, buka salinan `starter-files` Anda di editor kode favorit Anda, lalu navigasikan ke dalam folder `src`.

Semua kode yang akan kita tulis akan berada di bawah folder `src`. Kita akan mengedit komponen `HelloWorld.js` dan file JavaScript `util/interact.js` untuk memberikan fungsionalitas Web3 pada proyek kita.

### Periksa file pemula {#check-out-the-starter-files}

Sebelum kita mulai membuat kode, mari kita jelajahi apa yang disediakan untuk kita di file pemula.

#### Jalankan proyek react Anda {#get-your-react-project-running}

Mari kita mulai dengan menjalankan proyek React di peramban kita. Keindahan React adalah setelah proyek kita berjalan di peramban, setiap perubahan yang kita simpan akan diperbarui secara langsung di peramban kita.

Untuk menjalankan proyek, navigasikan ke direktori root dari folder `starter-files`, dan jalankan `npm install` di terminal Anda untuk menginstal dependensi proyek:

```bash
cd starter-files
npm install
```

Setelah selesai menginstal, jalankan `npm start` di terminal Anda:

```bash
npm start
```

Melakukan hal tersebut akan membuka [http://localhost:3000/](http://localhost:3000/) di peramban Anda, di mana Anda akan melihat frontend untuk proyek kita. Ini harus terdiri dari satu bidang \(tempat untuk memperbarui pesan yang disimpan di kontrak pintar Anda\), tombol "Connect Wallet", dan tombol "Update".

Jika Anda mencoba mengklik salah satu tombol, Anda akan menyadari bahwa tombol tersebut tidak berfungsi—itu karena kita masih perlu memprogram fungsionalitasnya.

#### Komponen `HelloWorld.js` {#the-helloworld-js-component}

Mari kita kembali ke folder `src` di editor kita dan buka file `HelloWorld.js`. Sangat penting bagi kita untuk memahami semua yang ada di file ini, karena ini adalah komponen React utama yang akan kita kerjakan.

Di bagian atas file ini, Anda akan melihat bahwa kita memiliki beberapa pernyataan impor yang diperlukan untuk menjalankan proyek kita, termasuk pustaka React, hook useEffect dan useState, beberapa item dari `./util/interact.js` (kita akan menjelaskannya lebih detail segera!), dan logo Alchemy.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

Selanjutnya, kita memiliki variabel state yang akan kita perbarui setelah peristiwa tertentu.

```javascript
// HelloWorld.js

//Variabel state
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Berikut adalah representasi dari masing-masing variabel:

- `walletAddress` - string yang menyimpan alamat dompet pengguna
- `status`- string yang menyimpan pesan bermanfaat yang memandu pengguna tentang cara berinteraksi dengan dapp
- `message` - string yang menyimpan pesan saat ini di kontrak pintar
- `newMessage` - string yang menyimpan pesan baru yang akan ditulis ke kontrak pintar

Setelah variabel state, Anda akan melihat lima fungsi yang belum diimplementasikan: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, dan `onUpdatePressed`. Kita akan menjelaskan apa yang mereka lakukan di bawah ini:

```javascript
// HelloWorld.js

//hanya dipanggil sekali
useEffect(async () => {
  //TODO: implementasikanasikanasikanasikanasikan
}, [])

function addSmartContractListener() {
  //TODO: implement
}

function addWalletListener() {
  //TODO: implement
}

const connectWalletPressed = async () => {
  //TODO: implement
}

const onUpdatePressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- ini adalah hook React yang dipanggil setelah komponen Anda dirender. Karena ia memiliki prop array kosong `[]` yang diteruskan ke dalamnya \(lihat baris 4\), ia hanya akan dipanggil pada render _pertama_ komponen. Di sini kita akan memuat pesan saat ini yang disimpan di kontrak pintar kita, memanggil pendengar kontrak pintar dan dompet kita, dan memperbarui UI kita untuk mencerminkan apakah dompet sudah terhubung.
- `addSmartContractListener`- fungsi ini menyiapkan pendengar yang akan mengawasi peristiwa `UpdatedMessages` dari kontrak HelloWorld kita dan memperbarui UI kita ketika pesan diubah di kontrak pintar kita.
- `addWalletListener`- fungsi ini menyiapkan pendengar yang mendeteksi perubahan pada state dompet MetaMask pengguna, seperti ketika pengguna memutuskan sambungan dompet mereka atau beralih alamat.
- `connectWalletPressed`- fungsi ini akan dipanggil untuk menghubungkan dompet MetaMask pengguna ke dapp kita.
- `onUpdatePressed` - fungsi ini akan dipanggil ketika pengguna ingin memperbarui pesan yang disimpan di kontrak pintar.

Di dekat akhir file ini, kita memiliki UI dari komponen kita.

```javascript
// HelloWorld.js

//UI dari komponen kita
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

Jika Anda memindai kode ini dengan cermat, Anda akan melihat di mana kita menggunakan berbagai variabel state kita di UI kita:

- Pada baris 6-12, jika dompet pengguna terhubung \(yaitu, `walletAddress.length > 0`\), kita menampilkan versi terpotong dari `walletAddress` pengguna di tombol dengan ID "walletButton;" jika tidak, ia hanya mengatakan "Connect Wallet."
- Pada baris 17, kita menampilkan pesan saat ini yang disimpan di kontrak pintar, yang ditangkap dalam string `message`.
- Pada baris 23-26, kita menggunakan [komponen terkontrol](https://legacy.reactjs.org/docs/forms.html#controlled-components) untuk memperbarui variabel state `newMessage` kita ketika input di bidang teks berubah.

Selain variabel state kita, Anda juga akan melihat bahwa fungsi `connectWalletPressed` dan `onUpdatePressed` dipanggil ketika tombol dengan ID `publishButton` dan `walletButton` masing-masing diklik.

Terakhir, mari kita bahas di mana komponen `HelloWorld.js` ini ditambahkan.

Jika Anda pergi ke file `App.js`, yang merupakan komponen utama di React yang bertindak sebagai wadah untuk semua komponen lainnya, Anda akan melihat bahwa komponen `HelloWorld.js` kita disuntikkan pada baris 7.

Terakhir namun tidak kalah pentingnya, mari kita periksa satu file lagi yang disediakan untuk Anda, file `interact.js`.

#### File `interact.js` {#the-interact-js-file}

Karena kita ingin mengikuti paradigma [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), kita akan menginginkan file terpisah yang berisi semua fungsi kita untuk mengelola logika, data, dan aturan dapp kita, dan kemudian dapat mengekspor fungsi-fungsi tersebut ke frontend kita \(komponen `HelloWorld.js` kita\).

👆🏽Inilah tujuan sebenarnya dari file `interact.js` kita!

Navigasikan ke folder `util` di direktori `src` Anda, dan Anda akan melihat bahwa kami telah menyertakan file bernama `interact.js` yang akan berisi semua interaksi kontrak pintar serta fungsi dan variabel dompet kita.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Anda akan melihat di bagian atas file bahwa kita telah mengomentari objek `helloWorldContract`. Nanti dalam tutorial ini, kita akan menghapus komentar objek ini dan membuat instansiasi kontrak pintar kita dalam variabel ini, yang kemudian akan kita ekspor ke dalam komponen `HelloWorld.js` kita.

Empat fungsi yang belum diimplementasikan setelah objek `helloWorldContract` kita melakukan hal berikut:

- `loadCurrentMessage` - fungsi ini menangani logika pemuatan pesan saat ini yang disimpan di kontrak pintar. Ini akan melakukan panggilan _baca_ ke kontrak pintar Hello World menggunakan [API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - fungsi ini akan menghubungkan MetaMask pengguna ke dapp kita.
- `getCurrentWalletConnected` - fungsi ini akan memeriksa apakah akun Ethereum sudah terhubung ke dapp kita saat halaman dimuat dan memperbarui UI kita sesuai dengan itu.
- `updateMessage` - fungsi ini akan memperbarui pesan yang disimpan di kontrak pintar. Ini akan melakukan panggilan _tulis_ ke kontrak pintar Hello World, sehingga dompet MetaMask pengguna harus menandatangani transaksi Ethereum untuk memperbarui pesan.

Sekarang setelah kita memahami apa yang sedang kita kerjakan, mari kita cari tahu cara membaca dari kontrak pintar kita!

### Langkah 3: Membaca dari kontrak pintar Anda {#step-3-read-from-your-smart-contract}

Untuk membaca dari kontrak pintar Anda, Anda harus berhasil menyiapkan:

- Koneksi API ke rantai Ethereum
- Instansiasi yang dimuat dari kontrak pintar Anda
- Fungsi untuk memanggil fungsi kontrak pintar Anda
- Pendengar untuk mengawasi pembaruan ketika data yang Anda baca dari kontrak pintar berubah

Ini mungkin terdengar seperti banyak langkah, tetapi jangan khawatir! Kami akan memandu Anda tentang cara melakukan masing-masing langkah tersebut selangkah demi selangkah! :\)

#### Membangun koneksi API ke rantai Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Jadi, ingatkah Anda bagaimana di Bagian 2 dari tutorial ini, kita menggunakan kunci Alchemy Web3 kita untuk membaca dari kontrak pintar kita? Anda juga akan memerlukan kunci Alchemy Web3 di dapp Anda untuk membaca dari rantai.

Jika Anda belum memilikinya, pertama-tama instal [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) dengan menavigasi ke direktori akar `starter-files` Anda dan menjalankan perintah berikut di terminal Anda:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) adalah pembungkus di sekitar [Web3.js](https://docs.web3js.org/), yang menyediakan metode API yang ditingkatkan dan manfaat penting lainnya untuk membuat hidup Anda sebagai pengembang Web3 menjadi lebih mudah. Ini dirancang untuk memerlukan konfigurasi minimal sehingga Anda dapat mulai menggunakannya di aplikasi Anda segera!

Kemudian, instal paket [dotenv](https://www.npmjs.com/package/dotenv) di direktori proyek Anda, sehingga kita memiliki tempat yang aman untuk menyimpan kunci API kita setelah kita mengambilnya.

```text
npm install dotenv --save
```

Untuk dapp kita, **kita akan menggunakan kunci API Websockets kita** alih-alih kunci API HTTP kita, karena ini akan memungkinkan kita untuk menyiapkan pendengar yang mendeteksi ketika pesan yang disimpan di kontrak pintar berubah.

Setelah Anda memiliki kunci API Anda, buat file `.env` di direktori akar Anda dan tambahkan url Alchemy Websockets Anda ke dalamnya. Setelah itu, file `.env` Anda akan terlihat seperti ini:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Sekarang, kita siap untuk menyiapkan titik akhir Alchemy Web3 kita di dapp kita! Mari kembali ke `interact.js` kita, yang bersarang di dalam folder `util` kita dan tambahkan kode berikut di bagian atas file:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Di atas, pertama-tama kita mengimpor kunci Alchemy dari file `.env` kita dan kemudian meneruskan `alchemyKey` kita ke `createAlchemyWeb3` untuk membangun titik akhir Alchemy Web3 kita.

Dengan titik akhir ini siap, saatnya untuk memuat kontrak pintar kita!
#### Memuat kontrak pintar Hello World Anda {#loading-your-hello-world-smart-contract}

Untuk memuat kontrak pintar Hello World Anda, Anda akan memerlukan alamat kontrak dan ABI-nya, yang keduanya dapat ditemukan di Etherscan jika Anda menyelesaikan [Bagian 3 dari tutorial ini.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Cara mendapatkan ABI kontrak Anda dari Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Jika Anda melewati Bagian 3 dari tutorial ini, Anda dapat menggunakan kontrak HelloWorld dengan alamat [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). ABI-nya dapat ditemukan [di sini](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI kontrak diperlukan untuk menentukan fungsi mana yang akan dipanggil oleh kontrak serta memastikan bahwa fungsi tersebut akan mengembalikan data dalam format yang Anda harapkan. Setelah kita menyalin ABI kontrak kita, mari kita simpan sebagai file JSON bernama `contract-abi.json` di direktori `src` Anda.

File contract-abi.json Anda harus disimpan di folder src Anda.

Berbekal alamat kontrak, ABI, dan titik akhir Alchemy Web3 kita, kita dapat menggunakan [metode kontrak](https://docs.web3js.org/api/web3-eth-contract/class/Contract) untuk memuat instansiasi kontrak pintar kita. Impor ABI kontrak Anda ke dalam file `interact.js` dan tambahkan alamat kontrak Anda.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Kita sekarang akhirnya dapat menghapus komentar variabel `helloWorldContract` kita, dan memuat kontrak pintar menggunakan titik akhir AlchemyWeb3 kita:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Sebagai rekap, 12 baris pertama dari `interact.js` Anda sekarang akan terlihat seperti ini:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Sekarang setelah kontrak kita dimuat, kita dapat mengimplementasikan fungsi `loadCurrentMessage` kita!

#### Mengimplementasikan `loadCurrentMessage` di file `interact.js` Anda {#implementing-loadcurrentmessage-in-your-interact-js-file}

Fungsi ini sangat sederhana. Kita akan melakukan panggilan web3 asinkron sederhana untuk membaca dari kontrak kita. Fungsi kita akan mengembalikan pesan yang disimpan di kontrak pintar:

Perbarui `loadCurrentMessage` di file `interact.js` Anda menjadi berikut ini:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Karena kita ingin menampilkan kontrak pintar ini di UI kita, mari kita perbarui fungsi `useEffect` di komponen `HelloWorld.js` kita menjadi berikut ini:

```javascript
// HelloWorld.js

//hanya dipanggil sekali
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Catatan, kita hanya ingin `loadCurrentMessage` kita dipanggil sekali selama render pertama komponen. Kita akan segera mengimplementasikan `addSmartContractListener` untuk memperbarui UI secara otomatis setelah pesan di kontrak pintar berubah.

Sebelum kita menyelami pendengar kita, mari kita periksa apa yang kita miliki sejauh ini! Simpan file `HelloWorld.js` dan `interact.js` Anda, lalu pergi ke [http://localhost:3000/](http://localhost:3000/)

Anda akan melihat bahwa pesan saat ini tidak lagi mengatakan "No connection to the network." Sebaliknya, ini mencerminkan pesan yang disimpan di kontrak pintar. Keren!

#### UI Anda sekarang harus mencerminkan pesan yang disimpan di kontrak pintar {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

Sekarang berbicara tentang pendengar itu...

#### Implementasikan `addSmartContractListener` {#implement-addsmartcontractlistener}

Jika Anda mengingat kembali file `HelloWorld.sol` yang kita tulis di [Bagian 1 dari seri tutorial ini](#step-10-write-our-contract), Anda akan ingat bahwa ada peristiwa kontrak pintar yang disebut `UpdatedMessages` yang dipancarkan setelah fungsi `update` kontrak pintar kita dipanggil \(lihat baris 9 dan 27\):

```javascript
// HelloWorld.sol

// Menentukan versi Solidity, menggunakan pembuatan versi semantik.
// Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Mendefinisikan sebuah kontrak bernama `HelloWorld`.
// Sebuah kontrak adalah kumpulan fungsi dan data (state-nya). Setelah disebarkan, sebuah kontrak berada pada alamat tertentu di rantai blok Ethereum. Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Dipancarkan ketika fungsi pembaruan dipanggil
   //Event kontrak pintar adalah cara bagi kontrak Anda untuk mengomunikasikan bahwa sesuatu terjadi di rantai blok ke front-end aplikasi Anda, yang dapat 'mendengarkan' event tertentu dan mengambil tindakan saat event tersebut terjadi.
   event UpdatedMessages(string oldStr, string newStr);

   // Mendeklarasikan variabel state `message` bertipe `string`.
   // Variabel state adalah variabel yang nilainya disimpan secara permanen di penyimpanan kontrak. Kata kunci `public` membuat variabel dapat diakses dari luar kontrak dan membuat fungsi yang dapat dipanggil oleh kontrak atau klien lain untuk mengakses nilainya.
   string public message;

   // Mirip dengan banyak bahasa berorientasi objek berbasis kelas, konstruktor adalah fungsi khusus yang hanya dieksekusi pada saat pembuatan kontrak.
   // Konstruktor digunakan untuk menginisialisasi data kontrak. Pelajari lebih lanjut:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Menerima argumen string `initMessage` dan menetapkan nilainya ke dalam variabel penyimpanan `message` milik kontrak).
      message = initMessage;
   }

   // Fungsi publik yang menerima argumen string dan memperbarui variabel penyimpanan `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Peristiwa kontrak pintar adalah cara bagi kontrak Anda untuk mengomunikasikan bahwa sesuatu telah terjadi \(yaitu, ada _peristiwa_\) di rantai blok ke aplikasi front-end Anda, yang dapat 'mendengarkan' peristiwa tertentu dan mengambil tindakan ketika peristiwa itu terjadi.

Fungsi `addSmartContractListener` akan secara khusus mendengarkan peristiwa `UpdatedMessages` dari kontrak pintar Hello World kita, dan memperbarui UI kita untuk menampilkan pesan baru.

Modifikasi `addSmartContractListener` menjadi berikut ini:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Mari kita uraikan apa yang terjadi ketika pendengar mendeteksi suatu peristiwa:

- Jika terjadi kesalahan saat peristiwa dipancarkan, itu akan tercermin di UI melalui variabel state `status` kita.
- Jika tidak, kita akan menggunakan objek `data` yang dikembalikan. `data.returnValues` adalah array yang diindeks pada nol di mana elemen pertama dalam array menyimpan pesan sebelumnya dan elemen kedua menyimpan pesan yang diperbarui. Secara keseluruhan, pada peristiwa yang berhasil, kita akan mengatur string `message` kita ke pesan yang diperbarui, menghapus string `newMessage`, dan memperbarui variabel state `status` kita untuk mencerminkan bahwa pesan baru telah diterbitkan di kontrak pintar kita.

Terakhir, mari kita panggil pendengar kita di fungsi `useEffect` kita sehingga diinisialisasi pada render pertama komponen `HelloWorld.js`. Secara keseluruhan, fungsi `useEffect` Anda akan terlihat seperti ini:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Sekarang setelah kita dapat membaca dari kontrak pintar kita, alangkah baiknya untuk mengetahui cara menulis ke dalamnya juga! Namun, untuk menulis ke dapp kita, pertama-tama kita harus memiliki dompet Ethereum yang terhubung dengannya.

Jadi, selanjutnya kita akan menangani penyiapan dompet Ethereum kita \(MetaMask\) dan kemudian menghubungkannya ke dapp kita!

### Langkah 4: Siapkan dompet Ethereum Anda {#step-4-set-up-your-ethereum-wallet}

Untuk menulis apa pun ke rantai Ethereum, pengguna harus menandatangani transaksi menggunakan kunci privat dompet virtual mereka. Untuk tutorial ini, kita akan menggunakan [MetaMask](https://metamask.io/), dompet virtual di peramban yang digunakan untuk mengelola alamat akun Ethereum Anda, karena ini membuat penandatanganan transaksi menjadi sangat mudah bagi pengguna akhir.

Jika Anda ingin memahami lebih lanjut tentang cara kerja transaksi di Ethereum, periksa [halaman ini](/developers/docs/transactions/) dari yayasan Ethereum.

#### Unduh MetaMask {#download-metamask}

Anda dapat mengunduh dan membuat akun MetaMask secara gratis [di sini](https://metamask.io/download). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke "Goerli Test Network" di kanan atas \(sehingga kita tidak berurusan dengan uang sungguhan\).

#### Tambahkan Ether dari Faucet {#add-ether-from-a-faucet}

Untuk menandatangani transaksi di rantai blok Ethereum, kita akan membutuhkan beberapa ETH palsu. Untuk mendapatkan ETH, Anda dapat pergi ke [FaucETH](https://fauceth.komputing.org) dan memasukkan alamat akun Goerli Anda, klik "Request funds", lalu pilih "Ethereum Testnet Goerli" di menu tarik-turun dan terakhir klik tombol "Request funds" lagi. Anda akan melihat ETH di akun MetaMask Anda segera setelahnya!

#### Periksa Saldo Anda {#check-your-balance}

Untuk memeriksa ulang apakah saldo kita ada, mari buat permintaan [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) menggunakan [alat sandbox Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Ini akan mengembalikan jumlah ETH di dompet kita. Setelah Anda memasukkan alamat akun MetaMask Anda dan mengeklik “Send Request”, Anda akan melihat respons seperti ini:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**CATATAN:** Hasil ini dalam bentuk wei, bukan ETH. Wei digunakan sebagai denominasi terkecil dari ether. Konversi dari wei ke ETH adalah: 1 ETH = 10¹⁸ wei. Jadi, jika kita mengubah 0xde0b6b3a7640000 menjadi desimal, kita mendapatkan 1\*10¹⁸ yang sama dengan 1 ETH.

Fiuh! Uang palsu kita sudah masuk semua! 🤑
### Langkah 5: Hubungkan MetaMask ke UI Anda {#step-5-connect-metamask-to-your-ui}

Sekarang setelah dompet MetaMask kita disiapkan, mari kita hubungkan dapp kita ke sana!

#### Fungsi `connectWallet` {#the-connectwallet-function}

Di file `interact.js` kita, mari kita implementasikan fungsi `connectWallet`, yang kemudian dapat kita panggil di komponen `HelloWorld.js` kita.

Mari kita modifikasi `connectWallet` menjadi berikut ini:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Jadi apa sebenarnya yang dilakukan oleh blok kode raksasa ini?

Nah, pertama-tama, ia memeriksa apakah `window.ethereum` diaktifkan di peramban Anda.

`window.ethereum` adalah API global yang disuntikkan oleh MetaMask dan penyedia dompet lainnya yang memungkinkan situs web untuk meminta akun Ethereum pengguna. Jika disetujui, ia dapat membaca data dari rantai blok yang terhubung dengan pengguna, dan menyarankan agar pengguna menandatangani pesan dan transaksi. Periksa [dokumentasi MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) untuk info lebih lanjut!

Jika `window.ethereum` _tidak_ ada, maka itu berarti MetaMask tidak diinstal. Ini menghasilkan objek JSON yang dikembalikan, di mana `address` yang dikembalikan adalah string kosong, dan objek JSX `status` menyampaikan bahwa pengguna harus menginstal MetaMask.

Sekarang jika `window.ethereum` _ada_, maka saat itulah hal-hal menjadi menarik.

Menggunakan loop try/catch, kita akan mencoba terhubung ke MetaMask dengan memanggil [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Memanggil fungsi ini akan membuka MetaMask di peramban, di mana pengguna akan diminta untuk menghubungkan dompet mereka ke dapp Anda.

- Jika pengguna memilih untuk terhubung, `method: "eth_requestAccounts"` akan mengembalikan array yang berisi semua alamat akun pengguna yang terhubung ke dapp. Secara keseluruhan, fungsi `connectWallet` kita akan mengembalikan objek JSON yang berisi `address` _pertama_ dalam array ini \(lihat baris 9\) dan pesan `status` yang meminta pengguna untuk menulis pesan ke kontrak pintar.
- Jika pengguna menolak koneksi, maka objek JSON akan berisi string kosong untuk `address` yang dikembalikan dan pesan `status` yang mencerminkan bahwa pengguna menolak koneksi.

Sekarang setelah kita menulis fungsi `connectWallet` ini, langkah selanjutnya adalah memanggilnya ke komponen `HelloWorld.js` kita.

#### Tambahkan fungsi `connectWallet` ke Komponen UI `HelloWorld.js` Anda {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

Navigasikan ke fungsi `connectWalletPressed` di `HelloWorld.js`, dan perbarui menjadi berikut ini:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Perhatikan bagaimana sebagian besar fungsionalitas kita diabstraksikan dari komponen `HelloWorld.js` kita dari file `interact.js`? Ini agar kita mematuhi paradigma M-V-C!

Di `connectWalletPressed`, kita cukup melakukan panggilan await ke fungsi `connectWallet` yang diimpor, dan menggunakan responsnya, kita memperbarui variabel `status` dan `walletAddress` kita melalui hook state mereka.

Sekarang, mari kita simpan kedua file \(`HelloWorld.js` dan `interact.js`\) dan uji UI kita sejauh ini.

Buka peramban Anda di halaman [http://localhost:3000/](http://localhost:3000/), dan tekan tombol "Connect Wallet" di kanan atas halaman.

Jika Anda telah menginstal MetaMask, Anda akan diminta untuk menghubungkan dompet Anda ke dapp Anda. Terima undangan untuk terhubung.

Anda akan melihat bahwa tombol dompet sekarang mencerminkan bahwa alamat Anda terhubung! Yasssss 🔥

Selanjutnya, coba segarkan halaman... ini aneh. Tombol dompet kita meminta kita untuk menghubungkan MetaMask, meskipun sudah terhubung...

Namun, jangan takut! Kita dapat dengan mudah mengatasinya dengan mengimplementasikan `getCurrentWalletConnected`, yang akan memeriksa apakah alamat sudah terhubung ke dapp kita dan memperbarui UI kita sesuai dengan itu!

#### Fungsi `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Perbarui fungsi `getCurrentWalletConnected` Anda di file `interact.js` menjadi berikut ini:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Kode ini _sangat_ mirip dengan fungsi `connectWallet` yang baru saja kita tulis di langkah sebelumnya.

Perbedaan utamanya adalah alih-alih memanggil metode `eth_requestAccounts`, yang membuka MetaMask bagi pengguna untuk menghubungkan dompet mereka, di sini kita memanggil metode `eth_accounts`, yang hanya mengembalikan array yang berisi alamat MetaMask yang saat ini terhubung ke dapp kita.

Untuk melihat fungsi ini beraksi, mari kita panggil di fungsi `useEffect` dari komponen `HelloWorld.js` kita:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Perhatikan, kita menggunakan respons dari panggilan kita ke `getCurrentWalletConnected` untuk memperbarui variabel state `walletAddress` dan `status` kita.

Sekarang setelah Anda menambahkan kode ini, mari kita coba menyegarkan jendela peramban kita.

Bagussss! Tombol tersebut harus mengatakan bahwa Anda terhubung, dan menampilkan pratinjau alamat dompet Anda yang terhubung - bahkan setelah Anda menyegarkan!

#### Implementasikan `addWalletListener` {#implement-addwalletlistener}

Langkah terakhir dalam penyiapan dompet dapp kita adalah mengimplementasikan pendengar dompet sehingga UI kita diperbarui ketika state dompet kita berubah, seperti ketika pengguna memutuskan sambungan atau beralih akun.

Di file `HelloWorld.js` Anda, modifikasi fungsi `addWalletListener` Anda sebagai berikut:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Saya yakin Anda bahkan tidak memerlukan bantuan kami untuk memahami apa yang terjadi di sini pada titik ini, tetapi untuk tujuan ketelitian, mari kita uraikan dengan cepat:

- Pertama, fungsi kita memeriksa apakah `window.ethereum` diaktifkan \(yaitu, MetaMask diinstal\).
  - Jika tidak, kita cukup mengatur variabel state `status` kita ke string JSX yang meminta pengguna untuk menginstal MetaMask.
  - Jika diaktifkan, kita menyiapkan pendengar `window.ethereum.on("accountsChanged")` pada baris 3 yang mendengarkan perubahan state di dompet MetaMask, yang mencakup ketika pengguna menghubungkan akun tambahan ke dapp, beralih akun, atau memutuskan sambungan akun. Jika ada setidaknya satu akun yang terhubung, variabel state `walletAddress` diperbarui sebagai akun pertama dalam array `accounts` yang dikembalikan oleh pendengar. Jika tidak, `walletAddress` diatur sebagai string kosong.

Terakhir namun tidak kalah pentingnya, kita harus memanggilnya di fungsi `useEffect` kita:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Dan itu saja! Kita telah berhasil menyelesaikan pemrograman semua fungsionalitas dompet kita! Sekarang ke tugas terakhir kita: memperbarui pesan yang disimpan di kontrak pintar kita!

### Langkah 6: Implementasikan fungsi `updateMessage` {#step-6-implement-the-updatemessage-function}

Baiklah kawan, kita telah tiba di tahap akhir! Di `updateMessage` dari file `interact.js` Anda, kita akan melakukan hal berikut:

1. Pastikan pesan yang ingin kita terbitkan di kontrak pintar kita valid
2. Tandatangani transaksi kita menggunakan MetaMask
3. Panggil fungsi ini dari komponen frontend `HelloWorld.js` kita

Ini tidak akan memakan waktu lama; mari kita selesaikan dapp ini!

#### Penanganan kesalahan input {#input-error-handling}

Tentu saja, masuk akal untuk memiliki semacam penanganan kesalahan input di awal fungsi.

Kita ingin fungsi kita kembali lebih awal jika tidak ada ekstensi MetaMask yang diinstal, tidak ada dompet yang terhubung \(yaitu, `address` yang diteruskan adalah string kosong\), atau `message` adalah string kosong. Mari kita tambahkan penanganan kesalahan berikut ke `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

Sekarang setelah memiliki penanganan kesalahan input yang tepat, saatnya untuk menandatangani transaksi melalui MetaMask!

#### Menandatangani transaksi kita {#signing-our-transaction}

Jika Anda sudah terbiasa dengan transaksi Ethereum Web3 tradisional, kode yang kita tulis selanjutnya akan sangat familier. Di bawah kode penanganan kesalahan input Anda, tambahkan yang berikut ini ke `updateMessage`:

```javascript
// interact.js

//menyiapkan parameter transaksi
const transactionParameters = {
  to: contractAddress, // Diperlukan kecuali selama publikasi kontrak.
  from: address, // harus cocok dengan alamat aktif pengguna.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//menandatangani transaksi
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Mari kita uraikan apa yang terjadi. Pertama, kita menyiapkan parameter transaksi kita, di mana:

- `to` menentukan alamat penerima \(kontrak pintar kita\)
- `from` menentukan penandatangan transaksi, variabel `address` yang kita teruskan ke fungsi kita
- `data` berisi panggilan ke metode `update` kontrak pintar Hello World kita, menerima variabel string `message` kita sebagai input

Kemudian, kita melakukan panggilan await, `window.ethereum.request`, di mana kita meminta MetaMask untuk menandatangani transaksi. Perhatikan, pada baris 11 dan 12, kita menentukan metode eth kita, `eth_sendTransaction` dan meneruskan `transactionParameters` kita.

Pada titik ini, MetaMask akan terbuka di peramban, dan meminta pengguna untuk menandatangani atau menolak transaksi.

- Jika transaksi berhasil, fungsi akan mengembalikan objek JSON di mana string JSX `status` meminta pengguna untuk memeriksa Etherscan untuk informasi lebih lanjut tentang transaksi mereka.
- Jika transaksi gagal, fungsi akan mengembalikan objek JSON di mana string `status` menyampaikan pesan kesalahan.

Secara keseluruhan, fungsi `updateMessage` kita akan terlihat seperti ini:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //penanganan kesalahan input
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //menyiapkan parameter transaksi
  const transactionParameters = {
    to: contractAddress, // Diperlukan kecuali selama publikasi kontrak.
    from: address, // harus cocok dengan alamat aktif pengguna.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //menandatangani transaksi
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

Terakhir namun tidak kalah pentingnya, kita perlu menghubungkan fungsi `updateMessage` kita ke komponen `HelloWorld.js` kita.

#### Hubungkan `updateMessage` ke frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Fungsi `onUpdatePressed` kita harus melakukan panggilan await ke fungsi `updateMessage` yang diimpor dan memodifikasi variabel state `status` untuk mencerminkan apakah transaksi kita berhasil atau gagal:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Ini sangat bersih dan sederhana. Dan coba tebak... DAPP ANDA SELESAI!!!

Silakan dan uji tombol **Update**!

### Buat dapp kustom Anda sendiri {#make-your-own-custom-dapp}

Wooooo, Anda berhasil mencapai akhir tutorial! Sebagai rekap, Anda telah mempelajari cara:

- Menghubungkan dompet MetaMask ke proyek dapp Anda
- Membaca data dari kontrak pintar Anda menggunakan API [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Menandatangani transaksi Ethereum menggunakan MetaMask

Sekarang Anda sepenuhnya siap untuk menerapkan keterampilan dari tutorial ini untuk membangun proyek dapp kustom Anda sendiri! Seperti biasa, jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami untuk mendapatkan bantuan di [Discord Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Setelah Anda menyelesaikan tutorial ini, beri tahu kami bagaimana pengalaman Anda atau jika Anda memiliki umpan balik dengan menandai kami di Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
