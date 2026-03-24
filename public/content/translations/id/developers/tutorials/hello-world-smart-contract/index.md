---
title: Kontrak Pintar Hello World untuk Pemula
description: Tutorial pengantar tentang penulisan dan penerapan kontrak pintar sederhana di Ethereum.
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "kontrak pintar", "menerapkan"]
skill: beginner
breadcrumb: "Kontrak Hello World"
lang: id
published: 2021-03-31
---

Jika Anda baru dalam pengembangan blockchain dan tidak tahu harus mulai dari mana, atau jika Anda hanya ingin memahami cara menerapkan dan berinteraksi dengan kontrak pintar, panduan ini cocok untuk Anda. Kami akan memandu Anda membuat dan menerapkan kontrak pintar sederhana di jaringan testnet Sepolia menggunakan dompet virtual [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), dan [Alchemy](https://www.alchemy.com/eth) (jangan khawatir jika Anda belum memahami apa arti dari semua ini, kami akan menjelaskannya).

Pada [bagian 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) dari tutorial ini, kita akan membahas cara berinteraksi dengan kontrak pintar kita setelah diterapkan di sini, dan pada [bagian 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) kita akan membahas cara memublikasikannya di Etherscan.

Jika Anda memiliki pertanyaan kapan saja, jangan ragu untuk menghubungi kami di [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Langkah 1: Hubungkan ke jaringan Ethereum {#step-1}

Ada banyak cara untuk membuat permintaan ke rantai Ethereum. Untuk mempermudah, kita akan menggunakan akun gratis di Alchemy, sebuah platform pengembang blockchain dan API yang memungkinkan kita berkomunikasi dengan rantai Ethereum tanpa harus menjalankan node kita sendiri. Platform ini juga memiliki alat pengembang untuk pemantauan dan analitik yang akan kita manfaatkan dalam tutorial ini untuk memahami apa yang terjadi di balik layar dalam penerapan kontrak pintar kita. Jika Anda belum memiliki akun Alchemy, [Anda dapat mendaftar secara gratis di sini](https://dashboard.alchemy.com/signup).

## Langkah 2: Buat aplikasi Anda (dan kunci API) {#step-2}

Setelah Anda membuat akun Alchemy, Anda dapat menghasilkan kunci API dengan membuat aplikasi. Ini akan memungkinkan kita membuat permintaan ke jaringan testnet Sepolia. Jika Anda belum familier dengan testnet, lihat [halaman ini](/developers/docs/networks/).

1.  Navigasikan ke halaman "Create new app" di Dasbor Alchemy Anda dengan memilih "Select an app" di bilah navigasi dan mengklik "Create new app"

![Hello world create app](./hello-world-create-app.png)

2. Beri nama aplikasi Anda "Hello World", berikan deskripsi singkat, dan pilih kasus penggunaan, misalnya, "Infra & Tooling." Selanjutnya, cari "Ethereum" dan pilih jaringan.

![create app view hello world](./create-app-view-hello-world.png)

3. Klik "Next" untuk melanjutkan, lalu "Create app" dan selesai! Aplikasi Anda akan muncul di menu tarik-turun bilah navigasi, dengan Kunci API yang tersedia untuk disalin.

## Langkah 3: Buat akun (alamat) Ethereum {#step-3}

Kita memerlukan akun Ethereum untuk mengirim dan menerima transaksi. Untuk tutorial ini, kita akan menggunakan MetaMask, dompet virtual di peramban yang digunakan untuk mengelola alamat akun Ethereum Anda. Selengkapnya tentang [transaksi](/developers/docs/transactions/).

Anda dapat mengunduh MetaMask dan membuat akun Ethereum secara gratis [di sini](https://metamask.io/download). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke jaringan testnet "Sepolia" menggunakan menu tarik-turun jaringan (sehingga kita tidak berurusan dengan uang sungguhan).

Jika Anda tidak melihat Sepolia terdaftar, buka menu, lalu Advanced dan gulir ke bawah untuk mengaktifkan "Show test networks". Di menu pemilihan jaringan, pilih tab "Custom" untuk menemukan daftar testnet dan pilih "Sepolia."

![metamask sepolia example](./metamask-sepolia-example.png)

## Langkah 4: Tambahkan ether dari faucet {#step-4}

Untuk menerapkan kontrak pintar kita ke jaringan testnet, kita akan membutuhkan beberapa ETH palsu. Untuk mendapatkan ETH Sepolia, Anda dapat membuka [detail jaringan Sepolia](/developers/docs/networks/#sepolia) untuk melihat daftar berbagai faucet. Jika salah satu tidak berfungsi, coba yang lain karena terkadang bisa kehabisan. Mungkin butuh beberapa waktu untuk menerima ETH palsu Anda karena lalu lintas jaringan. Anda akan segera melihat ETH di akun Metamask Anda!

## Langkah 5: Periksa Saldo Anda {#step-5}

Untuk memeriksa kembali apakah saldo kita ada di sana, mari buat permintaan [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) menggunakan [alat komposer Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Ini akan mengembalikan jumlah ETH di dompet kita. Setelah Anda memasukkan alamat akun MetaMask Anda dan mengklik "Send Request", Anda akan melihat respons seperti ini:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **CATATAN:** Hasil ini dalam wei, bukan ETH. Wei digunakan sebagai denominasi terkecil dari ether. Konversi dari wei ke ETH adalah: 1 eth = 10<sup>18</sup> wei. Jadi jika kita mengonversi 0x2B5E3AF16B1880000 ke desimal, kita mendapatkan 5\*10¹⁸ yang sama dengan 5 ETH.
>
> Fiuh! Uang palsu kita semuanya ada di sana <Emoji text=":money_mouth_face:" size={1} />.

## Langkah 6: Inisialisasi proyek kita {#step-6}

Pertama, kita perlu membuat folder untuk proyek kita. Navigasikan ke baris perintah Anda dan ketik:

```
mkdir hello-world
cd hello-world
```

Sekarang kita berada di dalam folder proyek kita, kita akan menggunakan `npm init` untuk menginisialisasi proyek. Jika Anda belum menginstal npm, ikuti [instruksi ini](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (kita juga akan membutuhkan Node.js jadi unduh juga!).

```
npm init
```

Tidak masalah bagaimana Anda menjawab pertanyaan instalasi, berikut adalah cara kami melakukannya sebagai referensi:

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

Setujui package.json dan kita siap untuk melanjutkan!

## Langkah 7: Unduh [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat adalah lingkungan pengembangan untuk mengompilasi, menerapkan, menguji, dan men-debug perangkat lunak Ethereum Anda. Ini membantu pengembang saat membangun kontrak pintar dan dapps secara lokal sebelum menerapkannya ke rantai langsung.

Di dalam proyek `hello-world` kita, jalankan:

```
npm install --save-dev hardhat
```

Lihat halaman ini untuk detail lebih lanjut tentang [instruksi instalasi](https://hardhat.org/getting-started/#overview).

## Langkah 8: Buat proyek Hardhat {#step-8}

Di dalam folder proyek kita, jalankan:

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Ini akan menghasilkan file `hardhat.config.js` untuk kita yang merupakan tempat kita akan menentukan semua pengaturan untuk proyek kita (pada langkah 13).

## Langkah 9: Tambahkan folder proyek {#step-9}

Agar proyek kita tetap teratur, kita akan membuat dua folder baru. Navigasikan ke direktori root proyek Anda di baris perintah Anda dan ketik:

```
mkdir contracts
mkdir scripts
```

- `contracts/` adalah tempat kita akan menyimpan file kode kontrak pintar hello world kita
- `scripts/` adalah tempat kita akan menyimpan skrip untuk menerapkan dan berinteraksi dengan kontrak kita

## Langkah 10: Tulis kontrak kita {#step-10}

Anda mungkin bertanya pada diri sendiri, kapan kita akan menulis kode?? Nah, di sinilah kita, pada langkah 10.

Buka proyek hello-world di editor favorit Anda (kami menyukai [VSCode](https://code.visualstudio.com/)). Kontrak pintar ditulis dalam bahasa yang disebut Solidity yang akan kita gunakan untuk menulis kontrak pintar HelloWorld.sol kita.‌

1.  Navigasikan ke folder "contracts" dan buat file baru bernama HelloWorld.sol
2.  Di bawah ini adalah contoh kontrak pintar Hello World dari Ethereum Foundation yang akan kita gunakan untuk tutorial ini. Salin dan tempel konten di bawah ini ke dalam file HelloWorld.sol Anda, dan pastikan untuk membaca komentar untuk memahami apa yang dilakukan kontrak ini:

```solidity
// Specifies the version of Solidity, using semantic versioning. // Menentukan versi Solidity, menggunakan versi semantik.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma // Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Defines a contract named `HelloWorld`. // Mendefinisikan kontrak bernama `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html // Kontrak adalah kumpulan fungsi dan data (statusnya). Setelah diterapkan, kontrak berada di alamat tertentu di blockchain Ethereum. Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Declares a state variable `message` of type `string`. // Mendeklarasikan variabel status `message` dengan tipe `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value. // Variabel status adalah variabel yang nilainya disimpan secara permanen di penyimpanan kontrak. Kata kunci `public` membuat variabel dapat diakses dari luar kontrak dan membuat fungsi yang dapat dipanggil oleh kontrak atau klien lain untuk mengakses nilainya.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation. // Mirip dengan banyak bahasa berorientasi objek berbasis kelas, konstruktor adalah fungsi khusus yang hanya dieksekusi saat pembuatan kontrak.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors // Konstruktor digunakan untuk menginisialisasi data kontrak. Pelajari lebih lanjut:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable). // Menerima argumen string `initMessage` dan menetapkan nilainya ke dalam variabel penyimpanan `message` milik kontrak).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable. // Fungsi publik yang menerima argumen string dan memperbarui variabel penyimpanan `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Ini adalah kontrak pintar yang sangat sederhana yang menyimpan pesan saat pembuatan dan dapat diperbarui dengan memanggil fungsi `update`.

## Langkah 11: Hubungkan MetaMask & Alchemy ke proyek Anda {#step-11}

Kita telah membuat dompet MetaMask, akun Alchemy, dan menulis kontrak pintar kita, sekarang saatnya untuk menghubungkan ketiganya.

Setiap transaksi yang dikirim dari dompet virtual Anda memerlukan tanda tangan menggunakan kunci pribadi unik Anda. Untuk memberikan izin ini kepada program kita, kita dapat menyimpan kunci pribadi kita (dan kunci API Alchemy) dengan aman dalam file lingkungan.

> Untuk mempelajari lebih lanjut tentang pengiriman transaksi, lihat [tutorial ini](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) tentang pengiriman transaksi menggunakan web3.

Pertama, instal paket dotenv di direktori proyek Anda:

```
npm install dotenv --save
```

Kemudian, buat file `.env` di direktori root proyek kita, dan tambahkan kunci pribadi MetaMask Anda dan URL API HTTP Alchemy ke dalamnya.

- Ikuti [instruksi ini](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) untuk mengekspor kunci pribadi Anda
- Lihat di bawah untuk mendapatkan URL API HTTP Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Salin URL API Alchemy

File `.env` Anda akan terlihat seperti ini:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Untuk benar-benar menghubungkannya ke kode kita, kita akan mereferensikan variabel-variabel ini dalam file `hardhat.config.js` kita pada langkah 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Jangan commit <code>.env</code>! Pastikan untuk tidak pernah membagikan atau mengekspos file <code>.env</code> Anda kepada siapa pun, karena Anda membahayakan rahasia Anda dengan melakukannya. Jika Anda menggunakan kontrol versi, tambahkan <code>.env</code> Anda ke file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Langkah 12: Instal Ethers.js {#step-12-install-ethersjs}

Ethers.js adalah pustaka yang memudahkan interaksi dan pembuatan permintaan ke Ethereum dengan membungkus [metode JSON-RPC standar](/developers/docs/apis/json-rpc/) dengan metode yang lebih ramah pengguna.

Hardhat membuatnya sangat mudah untuk mengintegrasikan [Plugin](https://hardhat.org/plugins/) untuk perkakas tambahan dan fungsionalitas yang diperluas. Kita akan memanfaatkan [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) untuk penerapan kontrak ([Ethers.js](https://github.com/ethers-io/ethers.js/) memiliki beberapa metode penerapan kontrak yang sangat rapi).

Di direktori proyek Anda, ketik:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Kita juga akan membutuhkan ethers di `hardhat.config.js` kita pada langkah berikutnya.

## Langkah 13: Perbarui hardhat.config.js {#step-13-update-hardhatconfigjs}

Kita telah menambahkan beberapa dependensi dan plugin sejauh ini, sekarang kita perlu memperbarui `hardhat.config.js` agar proyek kita mengetahui semuanya.

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
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Langkah 14: Kompilasi kontrak kita {#step-14-compile-our-contracts}

Untuk memastikan semuanya berfungsi sejauh ini, mari kompilasi kontrak kita. Tugas `compile` adalah salah satu tugas bawaan hardhat.

Dari baris perintah, jalankan:

```
npx hardhat compile
```

Anda mungkin mendapatkan peringatan tentang `SPDX license identifier not provided in source file` , tetapi tidak perlu khawatir tentang itu — semoga semuanya terlihat baik! Jika tidak, Anda selalu dapat mengirim pesan di [discord Alchemy](https://discord.gg/u72VCg3).

## Langkah 15: Tulis skrip penerapan kita {#step-15-write-our-deploy-scripts}

Sekarang setelah kontrak kita ditulis dan file konfigurasi kita siap digunakan, saatnya untuk menulis skrip penerapan kontrak kita.

Navigasikan ke folder `scripts/` dan buat file baru bernama `deploy.js` , tambahkan konten berikut ke dalamnya:

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

Hardhat melakukan pekerjaan yang luar biasa dalam menjelaskan apa yang dilakukan setiap baris kode ini dalam [tutorial Kontrak](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) mereka, kami telah mengadopsi penjelasan mereka di sini.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Sebuah `ContractFactory` di ethers.js adalah abstraksi yang digunakan untuk menerapkan kontrak pintar baru, jadi `HelloWorld` di sini adalah pabrik untuk instans kontrak hello world kita. Saat menggunakan plugin `hardhat-ethers`, instans `ContractFactory` dan `Contract` terhubung ke penandatangan pertama secara default.

```
const hello_world = await HelloWorld.deploy();
```

Memanggil `deploy()` pada `ContractFactory` akan memulai penerapan, dan mengembalikan `Promise` yang diselesaikan menjadi `Contract`. Ini adalah objek yang memiliki metode untuk setiap fungsi kontrak pintar kita.

## Langkah 16: Terapkan kontrak kita {#step-16-deploy-our-contract}

Kita akhirnya siap untuk menerapkan kontrak pintar kita! Navigasikan ke baris perintah dan jalankan:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Anda kemudian akan melihat sesuatu seperti:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Jika kita pergi ke [etherscan Sepolia](https://sepolia.etherscan.io/) dan mencari alamat kontrak kita, kita seharusnya dapat melihat bahwa itu telah berhasil diterapkan. Transaksi akan terlihat seperti ini:

![etherscan contract](./etherscan-contract.png)

Alamat `From` harus cocok dengan alamat akun MetaMask Anda dan alamat To akan mengatakan "Contract Creation" tetapi jika kita mengklik transaksi, kita akan melihat alamat kontrak kita di bidang `To`:

![etherscan transaction](./etherscan-transaction.png)

Selamat! Anda baru saja menerapkan kontrak pintar ke rantai Ethereum 🎉

Untuk memahami apa yang terjadi di balik layar, mari navigasikan ke tab Explorer di [dasbor Alchemy](https://dashboard.alchemyapi.io/explorer) kita. Jika Anda memiliki beberapa aplikasi Alchemy, pastikan untuk memfilter berdasarkan aplikasi dan pilih "Hello World".
![hello world explorer](./hello-world-explorer.png)

Di sini Anda akan melihat beberapa panggilan JSON-RPC yang dilakukan Hardhat/Ethers di balik layar untuk kita saat kita memanggil fungsi `.deploy()`. Dua hal penting yang perlu diperhatikan di sini adalah [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), yang merupakan permintaan untuk benar-benar menulis kontrak kita ke rantai Sepolia, dan [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) yang merupakan permintaan untuk membaca informasi tentang transaksi kita berdasarkan hash (pola umum saat transaksi). Untuk mempelajari lebih lanjut tentang pengiriman transaksi, lihat tutorial ini tentang [pengiriman transaksi menggunakan Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Sekian untuk bagian 1 dari tutorial ini, di bagian 2 kita akan benar-benar [berinteraksi dengan kontrak pintar kita](https://www.alchemy.com/docs/interacting-with-a-smart-contract) dengan memperbarui pesan awal kita, dan di bagian 3 kita akan [memublikasikan kontrak pintar kita ke Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) sehingga semua orang akan tahu cara berinteraksi dengannya.

**Ingin mempelajari lebih lanjut tentang Alchemy? Lihat [situs web](https://www.alchemy.com/eth) kami. Tidak ingin ketinggalan pembaruan? Berlangganan buletin kami [di sini](https://www.alchemy.com/newsletter)! Pastikan juga untuk bergabung dengan [Discord](https://discord.gg/u72VCg3) kami.**.