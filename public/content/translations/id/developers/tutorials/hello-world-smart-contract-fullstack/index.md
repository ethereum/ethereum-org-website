---
title: Kontrak Pintar Hello World untuk Pemula - Fullstack
description: Tutorial pengantar tentang menulis dan menyebarkan kontrak pintar sederhana di Ethereum.
author: "nstrike2"
tags:
  [
    "Solidity",
    "hardhat",
    "alchemy",
    "kontrak pintar",
    "menyebarkan",
    "penjelajah blok",
    "frontend",
    "transaksi"
  ]
skill: beginner
lang: id
published: 2021-10-25
---

Panduan ini untuk Anda jika Anda baru dalam pengembangan rantai blok dan tidak tahu harus mulai dari mana atau cara menyebarkan dan berinteraksi dengan kontrak pintar. Kami akan memandu pembuatan dan penyebaran kontrak pintar sederhana di testnet Goerli menggunakan [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), dan [Alchemy](https://alchemy.com/eth).

Anda akan memerlukan akun Alchemy untuk menyelesaikan tutorial ini. [Daftar untuk mendapatkan akun gratis](https://www.alchemy.com/).

Jika Anda memiliki pertanyaan kapan pun, jangan ragu untuk bertanya di [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Bagian 1 - Membuat dan Menyebarkan Kontrak Pintar Anda menggunakan Hardhat {#part-1}

### Hubungkan ke jaringan Ethereum {#connect-to-the-ethereum-network}

Ada banyak cara untuk membuat permintaan ke rantai Ethereum. Untuk mempermudah, kami akan menggunakan akun gratis di Alchemy, sebuah platform pengembang rantai blok dan API yang memungkinkan kita berkomunikasi dengan rantai Ethereum tanpa menjalankan simpul sendiri. Alchemy juga memiliki perangkat pengembang untuk pemantauan dan analitik; kami akan memanfaatkannya dalam tutorial ini untuk memahami apa yang terjadi di balik layar dalam penyebaran kontrak pintar kami.

### Buat aplikasi dan kunci API Anda {#create-your-app-and-api-key}

Setelah Anda membuat akun Alchemy, Anda dapat menghasilkan kunci API dengan membuat sebuah aplikasi. Ini akan memungkinkan Anda untuk membuat permintaan ke testnet Goerli. Jika Anda tidak terbiasa dengan testnet, Anda dapat [membaca panduan Alchemy untuk memilih jaringan](https://www.alchemy.com/docs/choosing-a-web3-network).

Di dasbor Alchemy, temukan menu tarik-turun **Apps** di bilah navigasi dan klik **Create App**.

![Buat aplikasi Hello World](./hello-world-create-app.png)

Beri nama aplikasi Anda '_Hello World_' dan tulis deskripsi singkat. Pilih **Staging** sebagai lingkungan Anda dan **Goerli** sebagai jaringan Anda.

![tampilan buat aplikasi hello world](./create-app-view-hello-world.png)

_Catatan: pastikan untuk memilih **Goerli**, atau tutorial ini tidak akan berfungsi._

Klik **Buat aplikasi**. Aplikasi Anda akan muncul pada tabel di bawah ini.

### Buat sebuah akun Ethereum {#create-an-ethereum-account}

Anda memerlukan akun Ethereum untuk mengirim dan menerima transaksi. Kami akan menggunakan MetaMask, sebuah dompet virtual di peramban yang memungkinkan pengguna mengelola alamat akun Ethereum mereka.

Anda dapat mengunduh dan membuat akun MetaMask secara gratis [di sini](https://metamask.io/download). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke “Goerli Test Network” di kanan atas (supaya kita tidak berurusan dengan uang sungguhan).

### Langkah 4: Tambahkan eter dari Faucet {#step-4-add-ether-from-a-faucet}

Untuk menyebarkan kontrak pintar Anda ke testnet, Anda memerlukan ETH palsu. Untuk mendapatkan ETH di jaringan Goerli, buka keran Goerli dan masukkan alamat akun Goerli Anda. Perhatikan bahwa keran Goerli bisa sedikit tidak dapat diandalkan baru-baru ini - lihat [halaman testnet](/developers/docs/networks/#goerli) untuk daftar opsi yang bisa dicoba:

_Catatan: karena kemacetan jaringan, ini mungkin akan memakan waktu._
``

### Langkah 5: Periksa Saldo Anda {#step-5-check-your-balance}

Untuk memeriksa ulang apakah ETH ada di dompet Anda, mari kita buat permintaan [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) menggunakan [alat penyusun dari Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ini akan mengembalikan jumlah ETH dalam dompet kita. Untuk mempelajari lebih lanjut, lihat [tutorial singkat dari Alchemy tentang cara menggunakan alat penyusun](https://youtu.be/r6sjRxBZJuU).

Masukkan alamat akun MetaMask Anda dan klik **Kirim Permintaan**. Anda akan melihat respons yang terlihat seperti cuplikan kode di bawah ini.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Catatan: Hasil ini dalam wei, bukan ETH._ Wei digunakan sebagai denominasi ether terkecil._

Fiuh! Uang palsu kita semuanya ada di sana.

### Langkah 6: Inisialisasi proyek kami {#step-6-initialize-our-project}

Pertama, kita perlu membuat folder untuk proyek kita. Navigasikan ke baris perintah Anda dan masukkan yang berikut ini.

```
mkdir hello-world
cd hello-world
```

Sekarang kita berada di dalam folder proyek kita, kita akan menggunakan `npm init` untuk menginisialisasi proyek.

> Jika Anda belum menginstal npm, ikuti [petunjuk ini untuk menginstal Node.js dan npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Untuk tujuan tutorial ini, tidak masalah bagaimana Anda menjawab pertanyaan inisialisasi. Berikut ini adalah cara kami melakukannya sebagai referensi:

```
nama paket: (hello-world)
versi: (1.0.0)
deskripsi: kontrak pintar hello world
titik masuk: (index.js)
perintah uji:
repositori git:
kata kunci:
penulis:
lisensi: (ISC)

Akan menulis ke /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "kontrak pintar hello world",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Kesalahan: tidak ada pengujian yang ditentukan\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Setujui package.json dan kita siap!

### Langkah 7: Unduh Hardhat {#step-7-download-hardhat}

Hardhat adalah lingkungan pengembangan untuk mengkompilasi, menyebarkan, menguji, dan men-debug perangkat lunak Ethereum Anda. Ini membantu pengembang saat membangun kontrak pintar dan dapps secara lokal sebelum menyebarkannya ke chain utama.

Di dalam proyek `hello-world` kita, jalankan:

```
npm install --save-dev hardhat
```

Lihat halaman ini untuk detail lebih lanjut tentang [instruksi instalasi](https://hardhat.org/getting-started/#overview).

### Langkah 8: Buat proyek Hardhat {#step-8-create-hardhat-project}

Di dalam folder proyek `hello-world` kami, jalankan:

```
npx hardhat
```

Lalu Anda seharusnya melihat pesan selamat datang dan opsi untuk memilih apa yang ingin Anda lakukan. Pilih "buat hardhat.config.js kosong":

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Selamat Datang di Hardhat v2.0.11 👷‍

Apa yang ingin Anda lakukan? …
Buat proyek sampel
❯ Buat hardhat.config.js kosong
Keluar
```

Ini akan menghasilkan file `hardhat.config.js` di dalam proyek. Kita akan menggunakan ini nanti dalam tutorial untuk menentukan pengaturan proyek kita.

### Langkah 9: Tambahkan folder proyek {#step-9-add-project-folders}

Agar proyek tetap terorganisir, mari kita buat dua folder baru. Di baris perintah, navigasikan ke direktori root proyek `hello-world` Anda dan ketik:

```
mkdir contracts
mkdir scripts
```

- `contracts/` adalah tempat kita akan menyimpan berkas kode kontrak pintar hello world kita
- `scripts/` adalah tempat kita akan menyimpan skrip untuk menyebarkan dan berinteraksi dengan kontrak kita

### Langkah 10: Tulis kontrak kami {#step-10-write-our-contract}

Anda mungkin bertanya pada diri sendiri, kapan kita akan menulis kode? Sudah waktunya!

Buka proyek hello-world di editor favorit Anda. Kontrak pintar paling umum ditulis dalam Solidity, yang akan kami gunakan untuk menulis kontrak pintar kami.‌

1. Navigasikan ke folder `contracts` dan buat file baru bernama `HelloWorld.sol`
2. Di bawah ini adalah contoh kontrak pintar Hello World yang akan kami gunakan untuk tutorial ini. Salin konten di bawah ini ke dalam file `HelloWorld.sol`.

_Catatan: Pastikan untuk membaca komentar untuk memahami apa yang dilakukan kontrak ini._

```
// Menentukan versi Solidity, menggunakan versi semantik.
// Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Mendefinisikan kontrak bernama `HelloWorld`.
// Kontrak adalah kumpulan fungsi dan data (keadaannya). Setelah disebarkan, kontrak berada di alamat tertentu di rantai blok Ethereum. Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Dikeluarkan saat fungsi pembaruan dipanggil
   //Aksi kontrak pintar adalah cara bagi kontrak Anda untuk mengomunikasikan bahwa sesuatu terjadi di rantai blok ke front-end aplikasi Anda, yang dapat 'mendengarkan' aksi tertentu dan mengambil tindakan saat itu terjadi.
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

Setiap transaksi yang dikirim dari dompet Anda memerlukan tanda tangan menggunakan kunci pribadi unik Anda. Untuk memberikan izin ini kepada program kami, kami dapat menyimpan kunci pribadi kami dengan aman di file lingkungan. Kami juga akan menyimpan kunci API untuk Alchemy di sini.

> Untuk mempelajari lebih lanjut tentang pengiriman transaksi, lihat [tutorial ini](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) tentang mengirim transaksi menggunakan web3.

Pertama-tama, instal paket dotenv ke dalam direktori proyek Anda:

```
npm install dotenv --save
```

Kemudian, buat file `.env` di direktori root proyek. Tambahkan kunci pribadi MetaMask dan URL HTTP API Alchemy Anda ke dalamnya.

File lingkungan Anda harus diberi nama `.env` atau tidak akan dikenali sebagai file lingkungan.

Jangan beri nama `process.env` atau `.env-custom` atau apa pun.

- Ikuti [petunjuk ini](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) untuk mengekspor kunci pribadi Anda
- Lihat di bawah ini untuk mendapatkan URL HTTP Alchemy API

![](./get-alchemy-api-key.gif)

`.env` Anda akan terlihat seperti ini:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Untuk benar-benar menghubungkannya ke kode kita, kita akan mereferensikan variabel-variabel ini dalam berkas `hardhat.config.js` kita pada langkah ke-13.

### Langkah 12: Instal Ethers.js {#step-12-install-ethersjs}

Ethers.js adalah pustaka yang mempermudah interaksi dan pembuatan permintaan ke Ethereum dengan membungkus metode [JSON-RPC standar](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) dengan metode yang lebih ramah pengguna.

Hardhat memungkinkan kita untuk mengintegrasikan [plugin](https://hardhat.org/plugins/) untuk perangkat tambahan dan fungsionalitas yang diperluas. Kami akan memanfaatkan [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) untuk penyebaran kontrak.

Dalam direktori proyek Anda, ketik:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Langkah 13: Perbarui hardhat.config.js {#step-13-update-hardhat-configjs}

Kita sejauh ini telah menambahkan beberapa dependensi dan plugin, kini kita perlu memperbarui `hardhat.config.js` agar proyek kita mengenali mereka semua.

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

### Langkah 14: Kompilasi kontrak kami {#step-14-compile-our-contract}

Untuk memastikan segalanya berjalan baik sejauh ini, mari kita kompilasikan kontrak kita. Tugas `compile` adalah salah satu tugas bawaan hardhat.

Dari barisan perintah jalankan:

```bash
npx hardhat compile
```

Anda mungkin mendapatkan peringatan tentang `SPDX license identifier not provided in source file`, tetapi tidak perlu khawatir tentang itu — semoga yang lainnya terlihat bagus! Jika tidak, Anda selalu dapat mengirim pesan di [Discord Alchemy](https://discord.gg/u72VCg3).

### Langkah 15: Tulis skrip penyebaran kami {#step-15-write-our-deploy-script}

Kini setelah kontrak kita ditulis dan berkas konfigurasi kita siap, inilah waktunya menulis skrip penyebaran kontrak kita.

Arahkan ke folder `scripts/` dan buat berkas baru yang disebut `deploy.js`, tambahkan konten berikut ke dalamnya:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Mulai penyebaran, mengembalikan promise yang menyelesaikan ke objek kontrak
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Kontrak disebarkan ke alamat:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat melakukan pekerjaan luar biasa dalam menjelaskan apa yang dilakukan setiap baris kode ini di [tutorial Kontrak](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) mereka, kami telah mengadopsi penjelasan mereka di sini.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` di ethers.js adalah sebuah abstraksi yang digunakan untuk menyebarkan kontrak pintar baru, jadi `HelloWorld` di sini adalah [pabrik](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) untuk instans dari kontrak hello world kami. Saat menggunakan plugin `hardhat-ethers`, `ContractFactory` dan `Contract`, instans terhubung ke penanda tangan pertama (pemilik) secara default.

```javascript
const hello_world = await HelloWorld.deploy()
```

Memanggil `deploy()` pada `ContractFactory` akan memulai penyebaran, dan mengembalikan `Promise` yang diselesaikan menjadi objek `Contract`. Ini adalah objek yang memiliki metode untuk setiap fungsi kontrak pintar kita.

### Langkah 16: Sebarkan kontrak kita {#step-16-deploy-our-contract}

Akhirnya kita siap untuk menyebarkan kontrak pintar kita! Arahkan ke baris perintah dan jalankan:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Lalu, Anda seharusnya melihat sesuatu seperti ini:

```bash
Kontrak disebarkan ke alamat: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Harap simpan alamat ini**. Kita akan menggunakannya nanti dalam tutorial ini.

Jika kita membuka [Goerli etherscan](https://goerli.etherscan) dan mencari alamat kontrak kita, kita akan dapat melihat bahwa kontrak tersebut telah berhasil disebarkan. Transaksi akan terlihat seperti ini:

![](./etherscan-contract.png)

Alamat `Dari` harus cocok dengan alamat akun MetaMask Anda dan alamat `Ke` akan tertulis **Pembuatan Kontrak**. Jika kita mengklik ke dalam transaksi, kita akan melihat alamat kontrak kita di kolom `Ke`.

![](./etherscan-transaction.png)

Selamat! Anda baru saja menyebarkan kontrak pintar ke testnet Ethereum.

Untuk memahami apa yang terjadi di balik layar, mari kita navigasi ke tab Explorer di [dasbor Alchemy](https://dashboard.alchemy.com/explorer) kita. Jika Anda memiliki beberapa aplikasi Alchemy, pastikan untuk memfilter berdasarkan aplikasi dan pilih **Hello World**.

![](./hello-world-explorer.png)

Di sini Anda akan melihat beberapa metode JSON-RPC yang dibuat oleh Hardhat/Ethers di balik layar untuk kita saat kita memanggil fungsi `.deploy()`. Dua metode penting di sini adalah [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), yang merupakan permintaan untuk menulis kontrak kami ke rantai Goerli, dan [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), yang merupakan permintaan untuk membaca informasi tentang transaksi kami dengan hash yang diberikan. Untuk mempelajari lebih lanjut tentang pengiriman transaksi, lihat [tutorial kami tentang mengirim transaksi menggunakan Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Bagian 2: Berinteraksi dengan Kontrak Pintar Anda {#part-2-interact-with-your-smart-contract}

Sekarang setelah kita berhasil menyebarkan kontrak pintar ke jaringan Goerli, mari kita pelajari cara berinteraksi dengannya.

### Buat file interact.js {#create-a-interactjs-file}

Ini adalah file di mana kita akan menulis skrip interaksi kita. Kita akan menggunakan pustaka Ethers.js yang sebelumnya telah Anda instal di Bagian 1.

Di dalam folder `scripts/`, buat file baru bernama `interact.js` tambahkan kode berikut:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Perbarui file .env Anda {#update-your-env-file}

Kami akan menggunakan variabel lingkungan baru, jadi kami perlu mendefinisikannya di file `.env` yang [kami buat sebelumnya](#step-11-connect-metamask-&-alchemy-to-your-project).

Kita perlu menambahkan definisi untuk `API_KEY` Alchemy dan `CONTRACT_ADDRESS` tempat kontrak pintar Anda disebarkan.

File `.env` Anda akan terlihat seperti ini:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Ambil ABI kontrak Anda {#grab-your-contract-ABI}

Kontrak kami [ABI (Application Binary Interface)](/glossary/#abi) adalah antarmuka untuk berinteraksi dengan kontrak pintar kami. Hardhat secara otomatis menghasilkan ABI dan menyimpannya di `HelloWorld.json`. Untuk menggunakan ABI, kita perlu mengurai konten dengan menambahkan baris kode berikut ke file `interact.js` kita:

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

1. Penyedia - penyedia simpul yang memberi Anda akses baca dan tulis ke rantai blok
2. Penanda tangan - mewakili akun Ethereum yang dapat menandatangani transaksi
3. Kontrak - objek Ethers.js yang mewakili kontrak spesifik yang disebarkan secara on-chain

Kita akan menggunakan kontrak ABI dari langkah sebelumnya untuk membuat instans kontrak kita:

```javascript
// interact.js

// Penyedia
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Penanda Tangan
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Kontrak
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Pelajari lebih lanjut tentang Penyedia, Penanda Tangan, dan Kontrak di [dokumentasi ethers.js](https://docs.ethers.io/v5/).

### Baca pesan awal {#read-the-init-message}

Ingat ketika kita menyebarkan kontrak kita dengan `initMessage = "Hello world!"`? Kita sekarang akan membaca pesan yang tersimpan di kontrak pintar kita dan mencetaknya ke konsol.

Di JavaScript, fungsi asinkron digunakan saat berinteraksi dengan jaringan. Untuk mempelajari lebih lanjut tentang fungsi asinkron, [baca artikel medium ini](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Gunakan kode di bawah ini untuk memanggil fungsi `pesan` di kontrak pintar kita dan membaca pesan awal:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Pesannya adalah: " + message)
}
main()
```

Setelah menjalankan file menggunakan `npx hardhat run scripts/interact.js` di terminal, kita akan melihat respons ini:

```
Pesannya adalah: Hello world!
```

Selamat! Anda baru saja berhasil membaca data kontrak pintar dari rantai blok Ethereum, kerja bagus!

### Perbarui pesan {#update-the-message}

Alih-alih hanya membaca pesan, kita juga dapat memperbarui pesan yang tersimpan di dalam kontrak pintar kita menggunakan fungsi `update`! Cukup keren, bukan?

Untuk memperbarui pesan, kita dapat langsung memanggil fungsi `update` pada objek Kontrak yang telah diinstansiasi:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Pesannya adalah: " + message)

  console.log("Memperbarui pesan...")
  const tx = await helloWorldContract.update("Ini adalah pesan baru.")
  await tx.wait()
}
main()
```

Perhatikan bahwa pada baris 11, kita melakukan pemanggilan ke `.wait()` pada objek transaksi yang dikembalikan. Ini memastikan bahwa skrip kita menunggu transaksi ditambang di rantai blok sebelum keluar dari fungsi. Jika panggilan `.wait()` tidak disertakan, skrip mungkin tidak melihat nilai `pesan` yang diperbarui di dalam kontrak.

### Baca pesan baru {#read-the-new-message}

Anda seharusnya dapat mengulangi [langkah sebelumnya](#read-the-init-message) untuk membaca nilai `pesan` yang diperbarui. Luangkan waktu sejenak dan lihat apakah Anda bisa membuat perubahan yang diperlukan untuk mencetak nilai baru itu!

Jika Anda membutuhkan petunjuk, inilah tampilan file `interact.js` Anda saat ini:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// penyedia - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// penanda tangan - Anda
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// instans kontrak
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("Pesannya adalah: " + message)

  console.log("Memperbarui pesan...")
  const tx = await helloWorldContract.update("ini adalah pesan baru")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("Pesan barunya adalah: " + newMessage)
}

main()
```

Sekarang jalankan saja skripnya dan Anda akan dapat melihat pesan lama, status pembaruan, dan pesan baru yang dicetak ke terminal Anda!

`npx hardhat run scripts/interact.js --network goerli`

```
Pesannya adalah: Hello World!
Memperbarui pesan...
Pesan barunya adalah: Ini adalah pesan baru.
```

Saat menjalankan skrip tersebut, Anda mungkin akan melihat bahwa langkah `Memperbarui pesan...` membutuhkan waktu beberapa saat untuk dimuat sebelum pesan baru dimuat. Hal ini disebabkan oleh proses penambangan; jika Anda ingin tahu tentang pelacakan transaksi ketika sedang ditambang, kunjungi [mempool Alchemy](https://dashboard.alchemyapi.io/mempool) untuk melihat status transaksi. Jika transaksi dibatalkan, akan sangat membantu jika Anda memeriksa [Goerli Etherscan](https://goerli.etherscan.io) dan mencari hash transaksi Anda.

## Bagian 3: Publikasikan Kontrak Pintar Anda ke Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Anda telah bekerja keras untuk mewujudkan kontrak pintar Anda; sekarang saatnya untuk membagikannya kepada dunia!

Dengan memverifikasi kontrak pintar Anda di Etherscan, siapa pun dapat melihat kode sumber Anda dan berinteraksi dengan kontrak pintar Anda. Mari kita mulai!

### Langkah 1: Buat Kunci API di akun Etherscan Anda {#step-1-generate-an-api-key-on-your-etherscan-account}

Kunci API Etherscan diperlukan untuk memverifikasi bahwa Anda memiliki kontrak pintar yang ingin Anda publikasikan.

Jika Anda belum memiliki akun Etherscan, [daftar untuk sebuah akun](https://etherscan.io/register).

Setelah masuk, temukan nama pengguna Anda di bilah navigasi, arahkan kursor ke sana dan pilih tombol **Profil saya**.

Di halaman profil Anda, Anda akan melihat bilah navigasi samping. Dari bilah navigasi samping, pilih **Kunci API**. Selanjutnya, tekan tombol "Tambah" untuk membuat kunci API baru, beri nama aplikasi Anda **hello-world** dan tekan tombol **Buat Kunci API Baru**.

Kunci API baru Anda akan muncul di tabel kunci API. Salin kunci API ke papan klip Anda.

Selanjutnya, kita perlu menambahkan kunci API Etherscan ke file `.env` kita.

Setelah menambahkannya, file `.env` Anda akan terlihat seperti ini:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Kontrak pintar yang disebarkan Hardhat {#hardhat-deployed-smart-contracts}

#### Instal hardhat-etherscan {#install-hardhat-etherscan}

Menerbitkan kontrak Anda ke Etherscan menggunakan Hardhat sangatlah mudah. Pertama-tama Anda harus menginstal plugin `hardhat-etherscan` untuk memulai. `hardhat-etherscan` akan secara otomatis memverifikasi kode sumber dan ABI kontrak pintar di Etherscan. Untuk menambahkan ini, di direktori `hello-world`, jalankan:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Setelah terinstal, sertakan pernyataan berikut di bagian atas `hardhat.config.js` Anda, dan tambahkan opsi konfigurasi Etherscan:

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

Pastikan semua file disimpan dan semua variabel `.env` dikonfigurasi dengan benar.

Jalankan tugas `verify`, berikan alamat kontrak, dan jaringan tempat kontrak itu disebarkan:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Pastikan bahwa `DEPLOYED_CONTRACT_ADDRESS` adalah alamat kontrak pintar Anda yang digunakan di testnet Goerli. Selain itu, argumen terakhir (`'Hello World!'`) harus berupa nilai string yang sama yang digunakan [selama langkah penyebaran di bagian 1](#write-our-deploy-script).

Jika semua berjalan dengan baik, Anda akan melihat pesan berikut di terminal Anda:

```text
Berhasil mengirimkan kode sumber untuk kontrak
contracts/HelloWorld.sol:HelloWorld di 0xdeployed-contract-address
untuk verifikasi di Etherscan. Menunggu hasil verifikasi...


Berhasil memverifikasi kontrak HelloWorld di Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Selamat! Kode kontrak pintar Anda ada di Etherscan!

### Lihat kontrak pintar Anda di Etherscan! {#check-out-your-smart-contract-on-etherscan}

Ketika Anda menavigasi ke tautan yang disediakan di terminal Anda, Anda seharusnya dapat melihat kode kontrak pintar dan ABI Anda yang diterbitkan di Etherscan!

**Wahooo - Anda berhasil, juara! Sekarang siapa pun dapat memanggil atau menulis ke kontrak pintar Anda! Kami tidak sabar untuk melihat apa yang akan Anda bangun selanjutnya!**

## Bagian 4 - Mengintegrasikan kontrak pintar Anda dengan frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Di akhir tutorial ini, Anda akan tahu cara:

- Hubungkan dompet MetaMask ke dapp Anda
- Baca data dari kontrak pintar Anda menggunakan API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Tanda tangani transaksi Ethereum menggunakan MetaMask

Untuk dapp ini, kami akan menggunakan [React](https://react.dev/) sebagai kerangka kerja frontend kami; namun, penting untuk dicatat bahwa kami tidak akan menghabiskan banyak waktu untuk menguraikan fundamentalnya, karena kami sebagian besar akan fokus untuk membawa fungsionalitas Web3 ke proyek kami.

Sebagai prasyarat, Anda harus memiliki pemahaman tingkat pemula tentang React. Jika tidak, kami sarankan untuk menyelesaikan [tutorial resmi Pengantar React](https://react.dev/learn).

### Kloning file pemula {#clone-the-starter-files}

Pertama, buka [repositori GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) untuk mendapatkan file awal untuk proyek ini dan kloning repositori ini ke mesin lokal Anda.

Buka repositori yang dikloning secara lokal. Perhatikan bahwa ini berisi dua folder: `starter-files` dan `completed`.

- `starter-files`- **kami akan bekerja di direktori ini**, kami akan menghubungkan UI ke dompet Ethereum Anda dan kontrak pintar yang kami publikasikan ke Etherscan di [Bagian 3](#part-3).
- `completed` berisi seluruh tutorial yang telah selesai dan hanya boleh digunakan sebagai referensi jika Anda mengalami kesulitan.

Selanjutnya, buka salinan `starter-files` Anda ke editor kode favorit Anda, lalu navigasikan ke folder `src`.

Semua kode yang akan kita tulis akan berada di bawah folder `src`. Kami akan mengedit komponen `HelloWorld.js` dan file JavaScript `util/interact.js` untuk memberikan fungsionalitas Web3 pada proyek kami.

### Lihat file pemula {#check-out-the-starter-files}

Sebelum kita mulai membuat kode, mari kita jelajahi apa yang disediakan untuk kita di file pemula.

#### Menjalankan proyek React Anda {#get-your-react-project-running}

Mari kita mulai dengan menjalankan proyek React di browser kita. Keindahan dari React adalah ketika kita menjalankan proyek kita di browser, setiap perubahan yang kita simpan akan diperbarui secara langsung di browser.

Untuk menjalankan proyek, navigasikan ke direktori root folder `starter-files`, dan jalankan `npm install` di terminal Anda untuk menginstal dependensi proyek:

```bash
cd starter-files
npm install
```

Setelah penginstalan selesai, jalankan `npm start` di terminal Anda:

```bash
npm start
```

Melakukannya akan membuka [http://localhost:3000/](http://localhost:3000/) di browser Anda, di mana Anda akan melihat frontend untuk proyek kami. Ini harus terdiri dari satu kolom (tempat untuk memperbarui pesan yang disimpan di kontrak pintar Anda), tombol "Hubungkan Dompet", dan tombol "Perbarui".

Jika Anda mencoba mengklik salah satu tombol, Anda akan melihat bahwa tombol-tombol tersebut tidak berfungsi—itu karena kita masih perlu memprogram fungsionalitasnya.

#### Komponen `HelloWorld.js` {#the-helloworld-js-component}

Mari kita kembali ke folder `src` di editor kita dan buka file `HelloWorld.js`. Sangat penting bagi kita untuk memahami semua yang ada di dalam file ini, karena ini adalah komponen utama React yang akan kita kerjakan.

Di bagian atas file ini, Anda akan melihat kami memiliki beberapa pernyataan impor yang diperlukan untuk menjalankan proyek kami, termasuk pustaka React, hook useEffect dan useState, beberapa item dari `./util/interact.js` (kami akan menjelaskannya lebih detail segera!), dan logo Alchemy.

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

Selanjutnya, kita memiliki variabel state yang akan kita perbarui setelah aksi tertentu.

```javascript
// HelloWorld.js

//Variabel state
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("Tidak ada koneksi ke jaringan.")
const [newMessage, setNewMessage] = useState("")
```

Berikut adalah apa yang diwakili oleh masing-masing variabel:

- `walletAddress` - sebuah string yang menyimpan alamat dompet pengguna
- `status`- sebuah string yang menyimpan pesan bermanfaat yang memandu pengguna tentang cara berinteraksi dengan dapp
- `message` - string yang menyimpan pesan saat ini di kontrak pintar
- `newMessage` - sebuah string yang menyimpan pesan baru yang akan ditulis ke kontrak pintar

Setelah variabel state, Anda akan melihat lima fungsi yang belum diimplementasikan: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, dan `onUpdatePressed`. Kami akan menjelaskan apa yang mereka lakukan di bawah ini:

```javascript
// HelloWorld.js

//hanya dipanggil sekali
useEffect(async () => {
  //TODO: implementasikan
}, [])

function addSmartContractListener() {
  //TODO: implementasikan
}

function addWalletListener() {
  //TODO: implementasikan
}

const connectWalletPressed = async () => {
  //TODO: implementasikan
}

const onUpdatePressed = async () => {
  //TODO: implementasikan
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- ini adalah hook React yang dipanggil setelah komponen Anda dirender. Karena memiliki prop array kosong `[]` yang dilewatkan ke dalamnya (lihat baris 4), ia hanya akan dipanggil pada render _pertama_ komponen. Di sini kita akan memuat pesan saat ini yang disimpan di kontrak pintar kita, memanggil pendengar kontrak pintar dan dompet kita, dan memperbarui UI kita untuk mencerminkan apakah dompet sudah terhubung.
- `addSmartContractListener`- fungsi ini menyiapkan pendengar yang akan mengawasi aksi `UpdatedMessages` kontrak HelloWorld kami dan memperbarui UI kami saat pesan diubah di kontrak pintar kami.
- `addWalletListener`- fungsi ini mengatur pendengar yang mendeteksi perubahan dalam state dompet MetaMask pengguna, seperti ketika pengguna memutuskan koneksi dompetnya atau beralih alamat.
- `connectWalletPressed`- fungsi ini akan dipanggil untuk menghubungkan dompet MetaMask pengguna ke dapp kita.
- `onUpdatePressed` - fungsi ini akan dipanggil ketika pengguna ingin memperbarui pesan yang disimpan di kontrak pintar.

Di bagian akhir file ini, kita akan mendapatkan UI dari komponen kita.

```javascript
// HelloWorld.js

//UI dari komponen kami
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Terhubung: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Hubungkan Dompet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Pesan Saat Ini:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Pesan Baru:</h2>

    <div>
      <input
        type="text"
        placeholder="Perbarui pesan di kontrak pintar Anda."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Perbarui
      </button>
</div>
 
</div>
)
```

Jika Anda memindai kode ini dengan cermat, Anda akan melihat di mana kami menggunakan berbagai variabel state di UI kami:

- Pada baris 6-12, jika dompet pengguna terhubung (yaitu, `walletAddress.length > 0`), kami menampilkan versi terpotong dari `walletAddress` pengguna di tombol dengan ID "walletButton;" jika tidak, tombol itu hanya bertuliskan "Hubungkan Dompet."
- Pada baris 17, kami menampilkan pesan saat ini yang disimpan dalam kontrak pintar, yang ditangkap dalam string `message`.
- Pada baris 23-26, kita menggunakan [komponen terkontrol](https://legacy.reactjs.org/docs/forms.html#controlled-components) untuk memperbarui variabel state `newMessage` kita saat input di kolom teks berubah.

Selain variabel state kami, Anda juga akan melihat bahwa fungsi `connectWalletPressed` dan `onUpdatePressed` dipanggil saat tombol dengan ID `publishButton` dan `walletButton` masing-masing diklik.

Terakhir, mari kita bahas di mana komponen `HelloWorld.js` ini ditambahkan.

Jika Anda membuka file `App.js`, yang merupakan komponen utama dalam React yang bertindak sebagai wadah untuk semua komponen lainnya, Anda akan melihat bahwa komponen `HelloWorld.js` kami disuntikkan pada baris 7.

Terakhir, mari kita periksa satu file lagi yang disediakan untuk Anda, file `interact.js`.

#### File `interact.js` {#the-interact-js-file}

Karena kami ingin mengikuti paradigma [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), kami akan menginginkan file terpisah yang berisi semua fungsi kami untuk mengelola logika, data, dan aturan dapp kami, dan kemudian dapat mengekspor fungsi-fungsi tersebut ke frontend kami (komponen `HelloWorld.js` kami).

👆🏽Inilah tujuan sebenarnya dari file `interact.js` kami!

Navigasikan ke folder `util` di direktori `src` Anda, dan Anda akan melihat kami telah menyertakan file bernama `interact.js` yang akan berisi semua fungsi dan variabel interaksi kontrak pintar dan dompet kami.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Anda akan melihat di bagian atas file bahwa kami telah mengomentari objek `helloWorldContract`. Nanti dalam tutorial ini, kita akan menghapus komentar objek ini dan menginstansiasi kontrak pintar kita dalam variabel ini, yang kemudian akan kita ekspor ke komponen `HelloWorld.js` kita.

Empat fungsi yang belum diimplementasikan setelah objek `helloWorldContract` kita melakukan hal berikut:

- `loadCurrentMessage` - fungsi ini menangani logika pemuatan pesan saat ini yang disimpan di kontrak pintar. Ini akan melakukan panggilan _baca_ ke kontrak pintar Hello World menggunakan [API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - fungsi ini akan menghubungkan MetaMask pengguna ke dapp kami.
- `getCurrentWalletConnected` - fungsi ini akan memeriksa apakah akun Ethereum sudah terhubung ke dapp kami saat halaman dimuat dan memperbarui UI kami sesuai.
- `updateMessage` - fungsi ini akan memperbarui pesan yang disimpan di kontrak pintar. Ini akan melakukan panggilan _tulis_ ke kontrak pintar Hello World, sehingga dompet MetaMask pengguna harus menandatangani transaksi Ethereum untuk memperbarui pesan.

Sekarang setelah kita memahami apa yang sedang kita kerjakan, mari kita cari tahu cara membaca dari kontrak pintar kita!

### Langkah 3: Baca dari kontrak pintar Anda {#step-3-read-from-your-smart-contract}

Untuk membaca dari kontrak pintar Anda, Anda harus berhasil mengatur:

- Koneksi API ke rantai Ethereum
- Instans yang dimuat dari kontrak pintar Anda
- Fungsi untuk memanggil fungsi kontrak pintar Anda
- Pendengar untuk mengawasi pembaruan saat data yang Anda baca dari kontrak pintar berubah

Ini mungkin terdengar seperti banyak langkah, tapi jangan khawatir! Kami akan memandu Anda melalui setiap langkahnya! :\)

#### Membangun koneksi API ke rantai Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Jadi, ingat bagaimana di Bagian 2 dari tutorial ini, kita menggunakan [kunci Alchemy Web3 kita untuk membaca dari kontrak pintar kita](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Anda juga akan memerlukan kunci Alchemy Web3 di dapp Anda untuk membaca dari rantai.

Jika Anda belum memilikinya, pertama-tama instal [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) dengan menavigasi ke direktori root dari `starter-files` Anda dan menjalankan yang berikut di terminal Anda:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) adalah pembungkus di sekitar [Web3.js](https://docs.web3js.org/), menyediakan metode API yang disempurnakan dan manfaat penting lainnya untuk membuat hidup Anda sebagai pengembang web3 lebih mudah. Ini dirancang untuk membutuhkan konfigurasi minimal sehingga Anda dapat mulai menggunakannya di aplikasi Anda segera!

Kemudian, instal paket [dotenv](https://www.npmjs.com/package/dotenv) di direktori proyek Anda, sehingga kami memiliki tempat yang aman untuk menyimpan kunci API kami setelah kami mengambilnya.

```text
npm install dotenv --save
```

Untuk dapp kami, **kami akan menggunakan kunci API Websockets kami** alih-alih kunci API HTTP kami, karena ini akan memungkinkan kami untuk mengatur pendengar yang mendeteksi ketika pesan yang disimpan di kontrak pintar berubah.

Setelah Anda memiliki kunci API Anda, buat file `.env` di direktori root Anda dan tambahkan url Websockets Alchemy Anda ke dalamnya. Setelah itu, file `.env` Anda akan terlihat seperti ini:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Sekarang, kami siap untuk mengatur titik akhir Alchemy Web3 kami di dapp kami! Mari kita kembali ke `interact.js` kita, yang bersarang di dalam folder `util` kita dan tambahkan kode berikut di bagian atas file:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Di atas, kami pertama-tama mengimpor kunci Alchemy dari file `.env` kami dan kemudian meneruskan `alchemyKey` kami ke `createAlchemyWeb3` untuk membangun titik akhir Alchemy Web3 kami.

Dengan titik akhir ini siap, saatnya memuat kontrak pintar kita!

#### Memuat kontrak pintar Hello World Anda {#loading-your-hello-world-smart-contract}

Untuk memuat kontrak pintar Hello World Anda, Anda akan memerlukan alamat kontrak dan ABI-nya, keduanya dapat ditemukan di Etherscan jika Anda menyelesaikan [Bagian 3 dari tutorial ini.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Cara mendapatkan ABI kontrak Anda dari Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Jika Anda melewatkan Bagian 3 dari tutorial ini, Anda dapat menggunakan kontrak HelloWorld dengan alamat [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). ABI-nya dapat ditemukan [di sini](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI kontrak diperlukan untuk menentukan fungsi mana yang akan dipanggil oleh kontrak serta memastikan bahwa fungsi akan mengembalikan data dalam format yang Anda harapkan. Setelah kami menyalin ABI kontrak kami, mari simpan sebagai file JSON bernama `contract-abi.json` di direktori `src` Anda.

File contract-abi.json Anda harus disimpan di folder src Anda.

Berbekal alamat kontrak, ABI, dan titik akhir Alchemy Web3 kami, kami dapat menggunakan [metode kontrak](https://docs.web3js.org/api/web3-eth-contract/class/Contract) untuk memuat instans kontrak pintar kami. Impor ABI kontrak Anda ke dalam file `interact.js` dan tambahkan alamat kontrak Anda.

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

Sekarang setelah kita memuat kontrak kita, kita dapat mengimplementasikan fungsi `loadCurrentMessage` kita!

#### Mengimplementasikan `loadCurrentMessage` di file `interact.js` Anda {#implementing-loadCurrentMessage-in-your-interact-js-file}

Fungsi ini sangat sederhana. Kami akan membuat panggilan web3 asinkron sederhana untuk membaca dari kontrak kami. Fungsi kami akan mengembalikan pesan yang disimpan di kontrak pintar:

Perbarui `loadCurrentMessage` di file `interact.js` Anda menjadi berikut:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Karena kami ingin menampilkan kontrak pintar ini di UI kami, mari perbarui fungsi `useEffect` di komponen `HelloWorld.js` kami menjadi berikut:

```javascript
// HelloWorld.js

//hanya dipanggil sekali
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Perhatikan, kami hanya ingin `loadCurrentMessage` kami dipanggil sekali selama render pertama komponen. Kami akan segera mengimplementasikan `addSmartContractListener` untuk secara otomatis memperbarui UI setelah pesan di kontrak pintar berubah.

Sebelum kita masuk ke pendengar kita, mari kita lihat apa yang telah kita capai sejauh ini! Simpan file `HelloWorld.js` dan `interact.js` Anda, lalu buka [http://localhost:3000/](http://localhost:3000/)

Anda akan melihat bahwa pesan saat ini tidak lagi bertuliskan "Tidak ada koneksi ke jaringan." Sebaliknya, itu mencerminkan pesan yang disimpan di kontrak pintar. Keren!

#### UI Anda sekarang akan mencerminkan pesan yang disimpan di kontrak pintar {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Sekarang berbicara tentang pendengar itu...

#### Implementasikan `addSmartContractListener` {#implement-addsmartcontractlistener}

Jika Anda mengingat kembali file `HelloWorld.sol` yang kami tulis di [Bagian 1 dari seri tutorial ini](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), Anda akan ingat bahwa ada aksi kontrak pintar bernama `UpdatedMessages` yang dipancarkan setelah fungsi `update` kontrak pintar kami dipanggil (lihat baris 9 dan 27):

```javascript
// HelloWorld.sol

// Menentukan versi Solidity, menggunakan versi semantik.
// Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Mendefinisikan kontrak bernama `HelloWorld`.
// Kontrak adalah kumpulan fungsi dan data (keadaannya). Setelah disebarkan, kontrak berada di alamat tertentu di rantai blok Ethereum. Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Dikeluarkan saat fungsi pembaruan dipanggil
   //Aksi kontrak pintar adalah cara bagi kontrak Anda untuk mengomunikasikan bahwa sesuatu terjadi di rantai blok ke front-end aplikasi Anda, yang dapat 'mendengarkan' aksi tertentu dan mengambil tindakan saat itu terjadi.
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

Aksi kontrak pintar adalah cara bagi kontrak Anda untuk mengomunikasikan bahwa sesuatu terjadi (yaitu, ada _aksi_) di rantai blok ke aplikasi front-end Anda, yang dapat 'mendengarkan' aksi tertentu dan mengambil tindakan saat itu terjadi.

Fungsi `addSmartContractListener` akan secara spesifik mendengarkan aksi `UpdatedMessages` dari kontrak pintar Hello World kami, dan memperbarui UI kami untuk menampilkan pesan baru.

Ubah `addSmartContractListener` menjadi berikut:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Pesan Anda telah diperbarui!")
    }
  })
}
```

Mari kita uraikan apa yang terjadi ketika pendengar mendeteksi sebuah aksi:

- Jika terjadi kesalahan saat aksi dipancarkan, itu akan tercermin di UI melalui variabel state `status` kami.
- Jika tidak, kami akan menggunakan objek `data` yang dikembalikan. `data.returnValues` adalah sebuah array yang diindeks pada nol di mana elemen pertama dalam array menyimpan pesan sebelumnya dan elemen kedua menyimpan yang diperbarui. Secara keseluruhan, pada aksi yang berhasil kami akan mengatur string `message` kami ke pesan yang diperbarui, menghapus string `newMessage`, dan memperbarui variabel state `status` kami untuk mencerminkan bahwa pesan baru telah dipublikasikan di kontrak pintar kami.

Terakhir, mari kita panggil pendengar kita di fungsi `useEffect` kita sehingga diinisialisasi pada render pertama komponen `HelloWorld.js`. Secara keseluruhan, fungsi `useEffect` Anda akan terlihat seperti ini:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Sekarang setelah kita bisa membaca dari kontrak pintar kita, alangkah baiknya jika kita juga bisa menulis ke dalamnya! Namun, untuk menulis ke dapp kami, kami harus terlebih dahulu memiliki dompet Ethereum yang terhubung dengannya.

Jadi, selanjutnya kita akan menangani pengaturan dompet Ethereum kita (MetaMask) dan kemudian menghubungkannya ke dapp kita!

### Langkah 4: Siapkan dompet Ethereum Anda {#step-4-set-up-your-ethereum-wallet}

Untuk menulis apa pun ke rantai Ethereum, pengguna harus menandatangani transaksi menggunakan kunci pribadi dompet virtual mereka. Untuk tutorial ini, kami akan menggunakan [MetaMask](https://metamask.io/), dompet virtual di browser yang digunakan untuk mengelola alamat akun Ethereum Anda, karena ini membuat penandatanganan transaksi ini sangat mudah bagi pengguna akhir.

Jika Anda ingin memahami lebih lanjut tentang cara kerja transaksi di Ethereum, lihat [halaman ini](/developers/docs/transactions/) dari Ethereum Foundation.

#### Mengunduh MetaMask {#download-metamask}

Anda dapat mengunduh dan membuat akun MetaMask secara gratis [di sini](https://metamask.io/download). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke “Goerli Test Network” di kanan atas (supaya kita tidak berurusan dengan uang sungguhan).

#### Tambahkan ether dari Keran {#add-ether-from-a-faucet}

Untuk menandatangani transaksi di rantai blok Ethereum, kita memerlukan Eth palsu. Untuk mendapatkan Eth, Anda dapat membuka [FaucETH](https://fauceth.komputing.org) dan memasukkan alamat akun Goerli Anda, klik “Minta dana”, lalu pilih “Ethereum Testnet Goerli” di menu tarik-turun dan terakhir klik tombol “Minta dana” lagi. Anda akan segera melihat Eth di akun MetaMask Anda!

#### Periksa Saldo Anda {#check-your-balance}

Untuk memeriksa ulang saldo kita, mari buat permintaan [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) menggunakan [alat penyusun Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ini akan mengembalikan jumlah Eth di dompet kita. Setelah Anda memasukkan alamat akun MetaMask Anda dan klik "Kirim Permintaan", Anda akan melihat respons seperti ini:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**CATATAN:** Hasil ini dalam wei, bukan eth. Wei digunakan sebagai denominasi terkecil dari ether. Konversi dari wei ke eth adalah: 1 eth = 10¹⁸ wei. Jadi, jika kita mengonversi 0xde0b6b3a7640000 ke desimal, kita akan mendapatkan 1\*10¹⁸ yang sama dengan 1 eth.

Fiuh! Uang palsu kita ada di sana! 🤑

### Langkah 5: Hubungkan MetaMask ke UI Anda {#step-5-connect-metamask-to-your-UI}

Sekarang dompet MetaMask kita sudah siap, mari hubungkan dapp kita ke dompet tersebut!

#### Fungsi `connectWallet` {#the-connectWallet-function}

Di file `interact.js` kami, mari kita implementasikan fungsi `connectWallet`, yang kemudian dapat kita panggil di komponen `HelloWorld.js` kami.

Mari kita ubah `connectWallet` menjadi berikut:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Tulis pesan di kolom teks di atas.",
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
              Anda harus menginstal MetaMask, dompet virtual Ethereum, di
              browser Anda.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Jadi, apa sebenarnya yang dilakukan oleh blok kode raksasa ini?

Nah, pertama, ia memeriksa apakah `window.ethereum` diaktifkan di browser Anda.

`window.ethereum` adalah API global yang disuntikkan oleh MetaMask dan penyedia dompet lainnya yang memungkinkan situs web untuk meminta akun Ethereum pengguna. Jika disetujui, ia dapat membaca data dari rantai blok yang terhubung dengan pengguna, dan menyarankan agar pengguna menandatangani pesan dan transaksi . Lihat [dokumentasi MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) untuk info lebih lanjut!

Jika `window.ethereum` _tidak_ ada, maka itu berarti MetaMask tidak terinstal. Ini menghasilkan objek JSON yang dikembalikan, di mana `address` yang dikembalikan adalah string kosong, dan objek `status` JSX menyampaikan bahwa pengguna harus menginstal MetaMask.

Sekarang jika `window.ethereum` _ada_, saat itulah segalanya menjadi menarik.

Menggunakan perulangan coba/tangkap, kita akan mencoba menyambungkan ke MetaMask dengan memanggil [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Memanggil fungsi ini akan membuka MetaMask di browser, di mana pengguna akan diminta untuk menghubungkan dompet mereka ke dapp Anda.

- Jika pengguna memilih untuk terhubung, `method: "eth_requestAccounts"` akan mengembalikan array yang berisi semua alamat akun pengguna yang terhubung ke dapp. Secara keseluruhan, fungsi `connectWallet` kita akan mengembalikan objek JSON yang berisi `address` _pertama_ dalam array ini \(lihat baris 9\) dan pesan `status` yang meminta pengguna untuk menulis pesan ke kontrak pintar.
- Jika pengguna menolak koneksi, maka objek JSON akan berisi string kosong untuk `address` yang dikembalikan dan pesan `status` yang mencerminkan bahwa pengguna menolak koneksi.

Sekarang setelah kita menulis fungsi `connectWallet` ini, langkah selanjutnya adalah memanggilnya ke komponen `HelloWorld.js` kita.

#### Tambahkan fungsi `connectWallet` ke Komponen UI `HelloWorld.js` Anda {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Navigasikan ke fungsi `connectWalletPressed` di `HelloWorld.js`, dan perbarui menjadi berikut:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Perhatikan bagaimana sebagian besar fungsionalitas kami diabstraksikan dari komponen `HelloWorld.js` kami dari file `interact.js`? Hal ini kami lakukan agar kami mematuhi paradigma M-V-C!

Di `connectWalletPressed`, kita hanya membuat panggilan tunggu ke fungsi `connectWallet` yang diimpor, dan menggunakan responsnya, kita memperbarui variabel `status` dan `walletAddress` kita melalui hook state mereka.

Sekarang, mari simpan kedua file (`HelloWorld.js` dan `interact.js`) dan uji UI kita sejauh ini.

Buka browser Anda di halaman [http://localhost:3000/](http://localhost:3000/), dan tekan tombol "Hubungkan Dompet" di kanan atas halaman.

Jika Anda telah menginstal MetaMask, Anda akan diminta untuk menghubungkan dompet Anda ke dapp. Terima undangan untuk terhubung.

Anda akan melihat bahwa tombol dompet sekarang mencerminkan bahwa alamat Anda telah terhubung! Yasssss 🔥

Selanjutnya, coba segarkan halaman... ini aneh. Tombol dompet kami meminta kami untuk menghubungkan MetaMask, meskipun sudah terhubung...

Namun, jangan takut! Kita dapat dengan mudah mengatasinya (mengerti?) dengan mengimplementasikan `getCurrentWalletConnected`, yang akan memeriksa apakah sebuah alamat telah terhubung ke dapp kita dan memperbarui UI kita sesuai dengan itu!

#### Fungsi `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Perbarui fungsi `getCurrentWalletConnected` Anda di file `interact.js` menjadi berikut:

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
          status: "👆🏽 Tulis pesan di kolom teks di atas.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Hubungkan ke MetaMask menggunakan tombol kanan atas.",
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
              Anda harus menginstal MetaMask, dompet virtual Ethereum, di
              browser Anda.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Kode ini _sangat_ mirip dengan fungsi `connectWallet` yang baru saja kita tulis di langkah sebelumnya.

Perbedaan utamanya adalah bahwa alih-alih memanggil metode `eth_requestAccounts`, yang membuka MetaMask bagi pengguna untuk menghubungkan dompet mereka, di sini kita memanggil metode `eth_accounts`, yang hanya mengembalikan sebuah array yang berisi alamat MetaMask yang saat ini terhubung ke dapp kita.

Untuk melihat fungsi ini beraksi, mari kita panggil di fungsi `useEffect` komponen `HelloWorld.js` kita:

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

Perhatikan, kami menggunakan respons dari panggilan kami ke `getCurrentWalletConnected` untuk memperbarui variabel state `walletAddress` dan `status` kami.

Sekarang setelah Anda menambahkan kode ini, mari coba segarkan jendela browser kita.

Bagus! Tombolnya akan mengatakan bahwa Anda terhubung, dan menampilkan pratinjau alamat dompet Anda yang terhubung - bahkan setelah Anda menyegarkan!

#### Implementasikan `addWalletListener` {#implement-addwalletlistener}

Langkah terakhir dalam penyiapan dompet dapp kita adalah mengimplementasikan pendengar dompet sehingga UI kita diperbarui ketika state dompet kita berubah, seperti ketika pengguna memutuskan koneksi atau beralih akun.

Di file `HelloWorld.js` Anda, ubah fungsi `addWalletListener` Anda sebagai berikut:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Tulis pesan di kolom teks di atas.")
      } else {
        setWallet("")
        setStatus("🦊 Hubungkan ke MetaMask menggunakan tombol kanan atas.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Anda harus menginstal MetaMask, dompet virtual Ethereum, di browser Anda.
        </a>
      </p>
    )
  }
}
```

Saya yakin Anda bahkan tidak memerlukan bantuan kami untuk memahami apa yang terjadi di sini pada saat ini, tetapi untuk tujuan kelengkapan, mari kita uraikan dengan cepat:

- Pertama, fungsi kita memeriksa apakah `window.ethereum` diaktifkan (yaitu, MetaMask diinstal).
  - Jika tidak, kita hanya mengatur variabel state `status` kita ke string JSX yang meminta pengguna untuk menginstal MetaMask.
  - Jika diaktifkan, kita mengatur pendengar `window.ethereum.on("accountsChanged")` pada baris 3 yang mendengarkan perubahan state di dompet MetaMask, yang meliputi saat pengguna menghubungkan akun tambahan ke dapp, beralih akun, atau memutuskan koneksi akun. Jika ada setidaknya satu akun yang terhubung, variabel state `walletAddress` diperbarui sebagai akun pertama dalam array `accounts` yang dikembalikan oleh pendengar. Jika tidak, `walletAddress` diatur sebagai string kosong.

Terakhir, kita harus memanggilnya di fungsi `useEffect` kita:

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

Dan itu saja! Kami telah berhasil menyelesaikan pemrograman semua fungsionalitas dompet kami! Sekarang lanjut ke tugas terakhir kita: memperbarui pesan yang disimpan di kontrak pintar kita!

### Langkah 6: Implementasikan fungsi `updateMessage` {#step-6-implement-the-updateMessage-function}

Baiklah teman-teman, kita sudah sampai di bagian akhir! Dalam `updateMessage` dari file `interact.js` Anda, kami akan melakukan hal berikut:

1. Pastikan pesan yang ingin kami publikasikan di kontak pintar kami valid
2. Tanda tangani transaksi kami menggunakan MetaMask
3. Panggil fungsi ini dari komponen frontend `HelloWorld.js` kami

Ini tidak akan memakan waktu lama; mari selesaikan dapp ini!

#### Penanganan kesalahan input {#input-error-handling}

Tentu saja, masuk akal untuk memiliki semacam penanganan kesalahan input di awal fungsi.

Kami ingin fungsi kami kembali lebih awal jika tidak ada ekstensi MetaMask yang terpasang, tidak ada dompet yang terhubung (yaitu, `address` yang dilewatkan adalah string kosong), atau `message` adalah string kosong. Mari tambahkan penanganan kesalahan berikut ke `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Hubungkan dompet MetaMask Anda untuk memperbarui pesan di rantai blok.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Pesan Anda tidak boleh berupa string kosong.",
    }
  }
}
```

Sekarang setelah memiliki penanganan kesalahan input yang tepat, saatnya menandatangani transaksi melalui MetaMask!

#### Menandatangani transaksi kita {#signing-our-transaction}

Jika Anda sudah terbiasa dengan transaksi Ethereum web3 tradisional, kode yang akan kita tulis selanjutnya akan sangat familiar. Di bawah kode penanganan kesalahan input Anda, tambahkan yang berikut ke `updateMessage`:

```javascript
// interact.js

//atur parameter transaksi
const transactionParameters = {
  to: contractAddress, // Diperlukan kecuali selama publikasi kontrak.
  from: address, // harus cocok dengan alamat aktif pengguna.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//tanda tangani transaksi
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
          Lihat status transaksi Anda di Etherscan!
        </a>
        <br />
        ℹ️ Setelah transaksi diverifikasi oleh jaringan, pesan akan
        diperbarui secara otomatis.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Mari kita uraikan apa yang terjadi. Pertama, kami mengatur parameter transaksi kami, di mana:

- `to` menentukan alamat penerima (kontrak pintar kami)
- `from` menentukan penanda tangan transaksi, variabel `address` yang kami lewati ke fungsi kami
- `data` berisi panggilan ke metode `update` kontrak pintar Hello World kami, menerima variabel string `message` kami sebagai input

Kemudian, kami melakukan panggilan await, `window.ethereum.request`, di mana kami meminta MetaMask untuk menandatangani transaksi. Perhatikan, pada baris 11 dan 12, kami menentukan metode eth kami, `eth_sendTransaction` dan meneruskan `transactionParameters` kami.

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
        "💡 Hubungkan dompet MetaMask Anda untuk memperbarui pesan di rantai blok.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Pesan Anda tidak boleh berupa string kosong.",
    }
  }

  //atur parameter transaksi
  const transactionParameters = {
    to: contractAddress, // Diperlukan kecuali selama publikasi kontrak.
    from: address, // harus cocok dengan alamat aktif pengguna.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //tanda tangani transaksi
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
            Lihat status transaksi Anda di Etherscan!
          </a>
          <br />
          ℹ️ Setelah transaksi diverifikasi oleh jaringan, pesan akan
          diperbarui secara otomatis.
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

Terakhir, kita perlu menghubungkan fungsi `updateMessage` kita ke komponen `HelloWorld.js` kita.

#### Hubungkan `updateMessage` ke frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Fungsi `onUpdatePressed` kami harus melakukan panggilan await ke fungsi `updateMessage` yang diimpor dan memodifikasi variabel state `status` untuk mencerminkan apakah transaksi kami berhasil atau gagal:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Sangat bersih dan sederhana. Dan coba tebak... DAPP ANDA SELESAI!!!

Silakan coba tombol **Perbarui**!

### Buat dapp kustom Anda sendiri {#make-your-own-custom-dapp}

Wooooo, Anda berhasil sampai akhir tutorial! Sebagai rekap, Anda belajar cara:

- Hubungkan dompet MetaMask ke proyek dapp Anda
- Baca data dari kontrak pintar Anda menggunakan API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Tanda tangani transaksi Ethereum menggunakan MetaMask

Sekarang Anda sepenuhnya siap untuk menerapkan keterampilan dari tutorial ini untuk membangun proyek dapp kustom Anda sendiri! Seperti biasa, jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami untuk mendapatkan bantuan di [Discord Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Setelah Anda menyelesaikan tutorial ini, beri tahu kami bagaimana pengalaman Anda atau jika Anda memiliki umpan balik dengan menandai kami di Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
