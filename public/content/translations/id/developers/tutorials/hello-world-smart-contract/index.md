---
title: Kontrak Pintar Hello World untuk Pemula
description: Tutorial pengantar tentang menulis dan menyebarkan kontrak pintar sederhana di Ethereum.
author: "elanh"
tags:
  - "solidity"
  - "hardhat"
  - "alchemy"
  - "kontrak pintar"
  - "memulai"
  - "menyebarkan"
skill: beginner
lang: id
published: 2021-03-31
---

Jika Anda baru dalam pengembangan rantai blok dan tidak tahu harus mulai dari mana, atau jika Anda hanya ingin memahami cara menyebarkan dan berinteraksi dengan kontrak pintar, panduan ini cocok untuk Anda. Kami akan memandu pembuatan dan menyebarkan kontrak pintar sederhana di jaringan uji Ropsten menggunakan dompet virtual ([MetaMask](https://metamask.io/)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), dan [Alchemy](https://alchemyapi.io/eth) (jangan khawatir jika Anda belum mengerti beberapa hal ini, kami akan menjelaskannya).

Di bagian 2 dari tutorial ini kita akan membahas bagaimana kita dapat berinteraksi dengan kontrak pintar kita setelah disebarkan, dan di bagian 3 kita akan membahas cara mempublikasikannya di Etherscan.

Jika Anda memiliki pertanyaan, silakan berdiskusi di [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Langkah 1: Hubungkan ke jaringan Ethereum {#step-1}

Ada banyak cara untuk membuat permintaan ke rantai Ethereum. Untuk mempermudah, kita akan menggunakan akun gratis di Alchemy, platform pengembang rantai blok dan API yang memungkinkan kita untuk berkomunikasi dengan rantai Ethereum tanpa harus menjalankan simpul kita sendiri. Platform ini juga memiliki perangkat pengembang untuk pemantauan dan analitik yang akan kita manfaatkan dalam tutorial ini untuk memahami apa yang terjadi di balik layar dalam penyebaran kontrak pintar kita. Jika Anda belum memiliki akun Alchemy, [Anda dapat mendaftar gratis di sini](https://dashboard.alchemyapi.io/signup).

## Langkah 2: Buat aplikasi Anda (dan kunci API) {#step-2}

Setelah Anda membuat akun Alchemy, Anda dapat membuat kunci API dengan membuat aplikasi. Ini akan memungkinkan kita untuk membuat permintaan ke jaringan pengujian Ropsten. Jika Anda tidak terbiasa dengan jaringan uji, lihat [laman ini](/developers/docs/networks/).

1.  Arahkan ke halaman "Buat Aplikasi" di Dasbor Alchemy Anda dengan mengarahkan kursor ke "Aplikasi" di bar navigasi dan mengklik "Buat Aplikasi"

![Buat aplikasi Hello world](./hello-world-create-app.png)

2. Beri nama aplikasi Anda "Hello World", berikan deskripsi singkat, pilih "Staging" untuk Lingkungan (digunakan untuk pembukuan aplikasi Anda), dan pilih "Ropsten" untuk jaringan Anda.

![buat tampilan aplikasi hello world](./create-app-view-hello-world.png)

3. Klik "Buat aplikasi" dan selesai! Aplikasi Anda seharusnya muncul dalam tabel di bawah ini.

## Langkah 3: Buat akun Ethereum (alamat) {#step-3}

Kita memerlukan akun Ethereum untuk mengirim dan menerima transaksi. Untuk tutorial ini, kita akan menggunakan MetaMask, dompet virtual dalam peramban yang digunakan untuk mengelola alamat akun Ethereum Anda. Selengkapnya tentang [transaksi](/developers/docs/transactions/).

Anda dapat mengunduh dan membuat akun MetaMask secara gratis [di sini](https://metamask.io/download.html). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke "Jaringan Pengujian Ropsten" di kanan atas (sehingga kita tidak berurusan dengan uang asli).

![contoh metamask ropsten](./metamask-ropsten-example.png)

## Langkah 4: Tambahkan ether dari Keran {#step-4}

Untuk menyebarkan kontrak pintar kita ke jaringan uji, kita memerlukan beberapa ETH palsu. Untuk mendapatkan ETH, Anda dapat beralih ke [keran Ropsten](https://faucet.dimensions.network/) dan memasukkan alamat akun Ropsten Anda, lalu klik "Kirim ETH Ropsten." Mungkin perlu beberapa saat untuk menerima ETH palsu Anda karena kepadatan jaringan. Anda seharusnya akan melihat ETH dalam akun MetaMask Anda dengan segera!

## Langkah 5: Periksa Saldo Anda {#step-5}

Untuk memeriksa ulang apakah saldo kita ada di sana, mari buat permintaan [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) dengan menggunakan [peralatan komposer Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ini akan mengembalikan jumlah ETH dalam dompet kita. Setelah Anda memasukkan alamat akun MetaMask Anda dan klik "Kirim Permintaan", Anda akan melihat respons seperti ini:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **CATATAN:** Hasil dalam wei bukan ETH. Wei digunakan sebagai denominasi terkecil dari ether. Konversi dari wei ke ETH adalah: 1 eth = 10<sup>18</sup> wei. Jadi jika kita mengubah 0x2B5E3AF16B1880000 ke desimal kita mendapatkan 5\*10¹⁸ yang sama dengan 5 ETH.
>
> Fiuh! Uang palsu kita ada di sana <Emoji text=":money_mouth_face:" size={1} />.

## Langkah 6: Inisialisasi proyek kami {#step-6}

Pertama, kita perlu membuat folder untuk proyek kita. Navigasikan ke barisan perintah dan ketik:

```
mkdir hello-world
cd hello-world
```

Sekarang karena kita ada di dalam folder proyek kita, kita akan menggunakan `npm init` untuk menginisialisasi proyek. Jika Anda belum menginstal npm, ikuti [petunjuk ini](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (kita juga membutuhkan Node.js jadi unduh juga!).

```
npm init
```

Tidak masalah bagaimana Anda menjawab pertanyaan tentang pemasangan, berikut adalah cara kami melakukannya untuk referensi:

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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Setujui package.json dan kita siap untuk beraksi!

## Langkah 7: Unduh [Hardhat](https://hardhat.org/getting-started/#overview){#step-7}

Hardhat adalah lingkungan pengembangan untuk mengkompilasi, menyebarkan, menguji, dan men-debug perangkat lunak Ethereum Anda. Lingkungan ini membantu pengembang saat membangun kontrak pintar dan dApps secara lokal sebelum menyebarkannya ke rantai sebenarnya.

Di dalam proyek `hello-world` kita jalankan:

```
npm install --save-dev hardhat
```

Lihat halaman ini untuk detail lebih lanjut tentang [petunjuk penginstalan](https://hardhat.org/getting-started/#overview).

## Langkah 8: Buat proyek Hardhat {#step-8}

Di dalam folder proyek kita jalankan:

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Ini akan menghasilkan berkas `hardhat.config.js` untuk kita yang merupakan tempat di mana kita akan menentukan semua penyiapan untuk proyek kita (pada langkah 13).

## Langkah 9: Tambahkan folder proyek {#step-9}

Agar proyek kami tetap teratur, kita akan membuat dua folder baru. Navigasikan ke direktori akar dari proyek Anda dalam barisan perintah dan ketik:

```
mkdir contracts
mkdir scripts
```

- `contracts/` adalah tempat kita menyimpan berkas kode kontrak pintar hello world kita
- `scripts/` adalah tempat kita menyimpan skrip untuk menyebar dan berinteraksi dengan kontrak kita

## Langkah 10: Tulis kontrak kita {#step-10}

Anda mungkin bertanya pada diri sendiri, kapan kita akan menulis kode?? Nah, kita sudah sampai disini, pada langkah 10.

Buka proyek hello-world di editor favorit Anda (kami menyukai [VSCode](https://code.visualstudio.com/)). Kontrak pintar ditulis dalam bahasa yang disebut Solidity dan inilah yang akan kita gunakan untuk menulis kontrak pintar HelloWorld.sol kita.‌

1.  Arahkan ke folder "kontrak" dan buat berkas baru bernama HelloWorld.sol
2.  Di bawah ini adalah contoh kontrak pintar Hello World dari Yayasan Ethereum yang akan kita gunakan untuk tutorial ini. Salin dan tempel konten di bawah ini ke berkas HelloWorld.sol Anda, dan pastikan untuk membaca komentar untuk memahami apa yang dilakukan kontrak ini:

```solidity
// Tentukan versi Solidity, gunakan pembuatan versi semantik.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Defines a contract named `HelloWorld`.
// Satu kontrak adalah koleksi dari fungsi dan data (statenya). Setelah disebarkan, sebuah kontrak tinggal di alamat spesifik pada blockchain Ethereum. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Declares a state variable `message` of type `string`.
   // Variabel state adalah variabel yang nilainya secara permanen disimpan dalam penyimpanan kontrak. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Pembangun digunakan untuk menjalankan data kontrak. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Ini adalah kontrak pintar super sederhana yang menyimpan pesan saat dibuat dan dapat diperbarui dengan memanggil fungsi `update`.

## Langkah 11: Hubungkan MetaMask & Alchemy ke proyek Anda {#step-11}

Kita telah membuat dompet MetaMask, akun Alchemy, dan menulis kontrak pintar kitar, sekarang saatnya untuk menghubungkan ketiganya.

Setiap transaksi yang dikirim dari dompet virtual Anda memerlukan tanda tangan menggunakan kunci pribadi unik Anda. Untuk menyediakan program kita dengan izin ini, kita dapat menyimpan kunci pribadi kita (dan kunci API Alchemy) dengan aman dalam sebuah berkas lingkungan.

> Untuk mempelajari lebih lanjut tentang mengirim transaksi, lihat [tutorial ini](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) tentang mengirim transaksi dengan menggunakan web3.

Pertama-tama, instal paket dotenv ke dalam direktori proyek Anda:

```
npm install dotenv --save
```

Kemudian, buat sebuah berkas `.env` dalam direktori akar proyek kita, dan tambahkan kunci pribadi MetaMask dan URL API Alchemy HTTP-nya.

- Ikuti [petunjuk ini](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) untuk mengekspor kunci pribadi
- Lihat di bawah ini untuk mendapatkan URL HTTP Alchemy API

![dapatkan kunci api alchemy](./get-alchemy-api-key.gif)

Salin URL API Alchemy

Berkas `.env` Anda akan terlihat seperti ini:

```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Untuk betul-betul menghubungkannya ke kode kita, kita akan mereferensikan variabel-variabel ini dalam berkas `hardhat.config.js` kita pada langkah ke-13.

<InfoBanner isWarning>
Don't commit <code>.env</code>! Please make sure never to share or expose your <code>.env</code> file with anyone, as you are compromising your secrets in doing so. If you are using version control, add your <code>.env</code> to a <a href="https://git-scm.com/docs/gitignore">gitignore</a> file.
</InfoBanner>

## Langkah 12: Instal Ethers.js {#step-12-install-ethersjs}

Ethers.js adalah pustaka yang mempermudah interaksi dan pembuatan permintaan ke Ethereum dengan membungkus [metode JSON-RPC standar](/developers/docs/apis/json-rpc/) dengan metode yang lebih ramah pengguna.

Hardhat menjadikannya sangat mudah untuk mengintegrasikan [Plugin](https://hardhat.org/plugins/) untuk perangkat tambahan dan fungsionalitas yang diperluas. Kita akan mengambil manfaat dari [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) untuk penyebaran kontrak ([Ethers.js](https://github.com/ethers-io/ethers.js/) memiliki beberapa metode penyebaran kontrak yang sangat bersih).

Dalam direktori proyek Anda, ketik:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Kita juga memerlukan ethers dalam `hardhat.config.js` kita di langkah selanjutnya.

## Langkah 13: Perbarui hardhat.config.js {#step-13-update-hardhatconfigjs}

Kita sejauh ini telah menambahkan beberapa dependensi dan plugin, kini kita perlu memperbarui `hardhat.config.js` agar proyek kita mengenali mereka.

Perbarui `hardhat.config.js` Anda agar terlihat seperti ini:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Langkah 14: Mengkompilasi kontrak kita {#step-14-compile-our-contracts}

Untuk memastikan segalanya berjalan baik sejauh ini, mari kita kompilasikan kontrak kita. Tugas untuk `mengompilasi` merupakan salah satu tugas bawaan hardhat.

Dari barisan perintah jalankan:

```
npx hardhat compile
```

Anda mungkin mendapat peringatan mengenai pengenal lisensi `SPDX tidak tersedia di berkas sumber`, tetapi tidak perlu mengkhawatirkannya — semoga semua yang lainnya berjalan dengan baik! Jika tidak, Anda selalu dapat mengirim pesan di [discord Alchemy](https://discord.gg/u72VCg3).

## Langkah 15: Tulis skrip penyebaran kita {#step-15-write-our-deploy-scripts}

Kini setelah kontrak kita ditulis dan berkas konfigurasi kita siap, inilah waktunya menulis skrip penyebaran kontrak kita.

Arahkan ke folder `skrip/` dan buat berkas baru yang disebut `deploy.js`, tambahkan konten berikut ke dalamnya:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat melakukan pekerjaan luar biasa dalam menjelaskan apa yang dilakukan masing-masing baris kode ini dalam [Tutorial kontrak](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) mereka, kami telah mengadopsi penjelasan mereka di sini.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

`ContractFactory` di ethers.js adalah abstraksi yang digunakan untuk menyebarkan kontrak pintar baru, jadi `HelloWorld` di sini adalah factory untuk instance dari kontrak hello world kita. Saat menggunakan plugin `hardhat-ethers`, instance `ContractFactory` dan `Contract` terhubung ke penandatangan pertama secara default.

```
const hello_world = await HelloWorld.deploy();
```

Memanggil `deploy()` pada `ContractFactory` akan memulai penyebaran, dan mengembalikan `Promise` yang menyelesaikan ke `Contract`. Ini adalah objek yang memiliki metode untuk setiap fungsi kontrak pintar kita.

## Langkah 16: Menyebarkan kontrak kita {#step-16-deploy-our-contract}

Akhirnya kita siap untuk menyebarkan kontrak pintar kita! Arahkan ke baris perintah dan jalankan:

```
npx hardhat run scripts/deploy.js --network ropsten
```

Lalu, Anda seharusnya melihat sesuatu seperti ini:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Jika kita pergi ke [etherscan Ropsten](https://ropsten.etherscan.io/) dan mencari akun kontrak kita, kita akan dapat melihat bahwa kontrak telah berhasil disebarkan. Transaksi akan terlihat seperti ini:

![kontrak etherscan](./etherscan-contract.png)

`From` harus sesuai dengan alamat akun MetaMask Anda dan alamat To akan bertuliskan “Contract Creation” tetapi jika kita mengklik transaksi, kita akan melihat akun kontrak kita di bagian `To`:

![transaksi etherscan](./etherscan-transaction.png)

Selamat! Anda baru saja menyebarkan kontrak pintar ke rantai Ethereum 🎉

Untuk memahami apa yang terjadi di bawah hood, mari navigasikan ke tab Penjelajah dalam [dasbor Alchemy](https://dashboard.alchemyapi.io/explorer) kita. Jika Anda memiliki beberapa aplikasi Alchemy, pastikan untuk memfilter berdasarkan aplikasi dan pilih "Hello World". ![penjelajah hello world](./hello-world-explorer.png)

Di sini Anda akan melihat beberapa panggilan JSON-RPC yang dibuat Hardhat/Ethers untuk kita saat kita memanggil fungsi `.deploy()`. Dua hal penting untuk disebutkan di sini adalah [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), yang merupakan permintaan untuk benar-benar menulis kontrak kita ke dalam rantai Ropsten, dan [ `eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash) yang merupakan permintaan untuk membaca informasi tentang transaksi kita yang diberi hash (pola khas ketika transaksi). Untuk mempelajari lebih lanjut tentang mengirim transaksi, lihat tutorial ini [tentang mengirim transaksi dengan menggunakan Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Demikian untuk bagian 1 dari tutorial ini, di bagian 2 kita akan benar-benar [berinteraksi dengan kontrak pintar kita](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#part-2-interact-with-your-smart-contract) dengan memperbarui pesan awal kita, dan di bagian 3 kita akan [menyebarkan kontrak pintar kita ke Etherscan](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#optional-part-3-publish-your-smart-contract-to-etherscan) sehingga semua orang akan tahu cara berinteraksi dengan kontrak itu.

**Ingin mempelajari lebih lanjut tentang Alchemy? Lihat [situs web](https://alchemyapi.io/eth) kami. Ingin tidak ketinggalan pembaruan? Berlangganan buletin kami [di sini](https://www.alchemyapi.io/newsletter)! Pastikan juga untuk mengikuti [Twitter](https://twitter.com/alchemyplatform) kami dan bergabunglah dengan [Discord](https://discord.com/invite/u72VCg3)** kami.
