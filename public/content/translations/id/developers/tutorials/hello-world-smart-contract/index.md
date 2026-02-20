---
title: Kontrak Pintar Hello World untuk Pemula
description: Tutorial pengantar tentang menulis dan menyebarkan kontrak pintar sederhana di Ethereum.
author: "elanh"
tags:
  [
    "Solidity",
    "hardhat",
    "alchemy",
    "kontrak pintar",
    "menyebarkan"
  ]
skill: beginner
lang: id
published: 2021-03-31
---

Jika Anda baru dalam pengembangan rantai blok dan tidak tahu harus mulai dari mana, atau jika Anda hanya ingin memahami cara menyebarkan dan berinteraksi dengan kontrak pintar, panduan ini cocok untuk Anda. Kami akan memandu pembuatan dan penyebaran kontrak pintar sederhana di testnet Sepolia menggunakan dompet virtual [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), dan [Alchemy](https://www.alchemy.com/eth) (jangan khawatir jika Anda belum mengerti apa pun artinya, kami akan menjelaskannya).

Di [bagian 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) tutorial ini kita akan membahas cara berinteraksi dengan kontrak pintar kita setelah disebarkan di sini, dan di [bagian 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) kita akan membahas cara memublikasikannya di Etherscan.

Jika Anda memiliki pertanyaan kapan pun, jangan ragu untuk bertanya di [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Langkah 1: Hubungkan ke jaringan Ethereum {#step-1}

Ada banyak cara untuk membuat permintaan ke rantai Ethereum. Untuk mempermudah, kita akan menggunakan akun gratis di Alchemy, platform pengembang rantai blok dan API yang memungkinkan kita untuk berkomunikasi dengan rantai Ethereum tanpa harus menjalankan simpul kita sendiri. Platform ini juga memiliki perangkat pengembang untuk pemantauan dan analitik yang akan kita manfaatkan dalam tutorial ini untuk memahami apa yang terjadi di balik layar dalam penyebaran kontrak pintar kita. Jika Anda belum memiliki akun Alchemy, [Anda dapat mendaftar gratis di sini](https://dashboard.alchemy.com/signup).

## Langkah 2: Buat aplikasi Anda (dan kunci API) {#step-2}

Setelah Anda membuat akun Alchemy, Anda dapat membuat kunci API dengan membuat aplikasi. Ini akan memungkinkan kita untuk membuat permintaan ke testnet Sepolia. Jika Anda tidak terbiasa dengan testnet, lihat [halaman ini](/developers/docs/networks/).

1. Arahkan ke halaman "Create new app" di Dasbor Alchemy Anda dengan memilih "Select an app" di bilah navigasi dan mengeklik "Create new app"

![Buat aplikasi Hello World](./hello-world-create-app.png)

2. Beri nama aplikasi Anda “Hello World”, berikan deskripsi singkat, dan pilih kasus penggunaan, mis., "Infra & Tooling." Berikutnya, cari "Ethereum" dan pilih jaringan.

![tampilan buat aplikasi hello world](./create-app-view-hello-world.png)

3. Klik "Next" untuk melanjutkan, lalu “Create app” dan selesai! Aplikasi Anda akan muncul di menu tarik-turun bilah navigasi, dengan Kunci API yang tersedia untuk disalin.

## Langkah 3: Buat akun Ethereum (alamat) {#step-3}

Kita memerlukan akun Ethereum untuk mengirim dan menerima transaksi. Untuk tutorial ini, kita akan menggunakan MetaMask, dompet virtual dalam peramban yang digunakan untuk mengelola alamat akun Ethereum Anda. Selengkapnya tentang [transaksi](/developers/docs/transactions/).

Anda dapat mengunduh MetaMask dan membuat akun Ethereum secara gratis [di sini](https://metamask.io/download). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke testnet "Sepolia" menggunakan menu tarik-turun jaringan (agar kita tidak berurusan dengan uang sungguhan).

Jika Anda tidak melihat Sepolia terdaftar, masuk ke menu, lalu Advanced dan gulir ke bawah untuk mengaktifkan "Show test networks". Di menu pemilihan jaringan, pilih tab "Custom" untuk menemukan daftar testnet dan pilih "Sepolia."

![contoh metamask sepolia](./metamask-sepolia-example.png)

## Langkah 4: Tambahkan ether dari faucet {#step-4}

Untuk menyebarkan kontrak pintar kita ke testnet, kita akan memerlukan beberapa Eth palsu. Untuk mendapatkan ETH Sepolia, Anda dapat membuka [detail jaringan Sepolia](/developers/docs/networks/#sepolia) untuk melihat daftar berbagai faucet. Jika salah satu tidak berfungsi, coba yang lain karena terkadang bisa kehabisan. Mungkin perlu beberapa saat untuk menerima ETH palsu Anda karena lalu lintas jaringan. Anda akan segera melihat ETH di akun Metamask Anda!

## Langkah 5: Periksa Saldo Anda {#step-5}

Untuk memeriksa ulang saldo kita, mari buat permintaan [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) menggunakan [alat penyusun Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Ini akan mengembalikan jumlah ETH dalam dompet kita. Setelah Anda memasukkan alamat akun MetaMask Anda dan klik "Kirim Permintaan", Anda akan melihat respons seperti ini:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **CATATAN:** Hasil ini dalam wei, bukan ETH. Wei digunakan sebagai denominasi terkecil dari ether. Konversi dari wei ke ETH adalah: 1 eth = 10<sup>18</sup> wei. Jadi jika kita mengonversi 0x2B5E3AF16B1880000 ke desimal kita mendapatkan 5\*10¹⁸ yang sama dengan 5 ETH.
>
> Fiuh! Uang palsu kita sudah ada semua <Emoji text=":money_mouth_face:" size={1} />.

## Langkah 6: Inisialisasi proyek kita {#step-6}

Pertama, kita perlu membuat folder untuk proyek kita. Navigasikan ke barisan perintah dan ketik:

```
mkdir hello-world
cd hello-world
```

Sekarang kita berada di dalam folder proyek kita, kita akan menggunakan `npm init` untuk menginisialisasi proyek. Jika Anda belum menginstal npm, ikuti [petunjuk ini](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (kita juga akan memerlukan Node.js, jadi unduh itu juga!).

```
npm init
```

Tidak masalah bagaimana Anda menjawab pertanyaan instalasi, berikut adalah cara kami melakukannya sebagai referensi:

```
nama paket: (hello-world)
versi: (1.0.0)
deskripsi: kontrak pintar hello world
titik masuk: (index.js)
perintah pengujian:
repositori git:
kata kunci:
penulis:
lisensi: (ISC)
Tentang penulisan ke /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "kontrak pintar hello world",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Kesalahan: tidak ada tes yang ditentukan\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Setujui package.json dan kita siap!

## Langkah 7: Unduh [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat adalah lingkungan pengembangan untuk mengkompilasi, menyebarkan, menguji, dan men-debug perangkat lunak Ethereum Anda. Ini membantu pengembang saat membangun kontrak pintar dan dapps secara lokal sebelum menyebarkannya ke chain utama.

Di dalam proyek `hello-world` kita, jalankan:

```
npm install --save-dev hardhat
```

Lihat halaman ini untuk detail lebih lanjut tentang [instruksi instalasi](https://hardhat.org/getting-started/#overview).

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

👷 Selamat datang di Hardhat v2.0.11 👷‍?

Apa yang ingin Anda lakukan? …
Buat proyek sampel
❯ Buat hardhat.config.js kosong
Keluar
```

Ini akan menghasilkan berkas `hardhat.config.js` untuk kita yang merupakan tempat kita akan menentukan semua penyiapan untuk proyek kita (pada langkah 13).

## Langkah 9: Tambahkan folder proyek {#step-9}

Agar proyek kita tetap teratur, kita akan membuat dua folder baru. Navigasikan ke direktori akar dari proyek Anda dalam barisan perintah dan ketik:

```
mkdir contracts
mkdir scripts
```

- `contracts/` adalah tempat kita akan menyimpan berkas kode kontrak pintar hello world kita
- `scripts/` adalah tempat kita akan menyimpan skrip untuk menyebarkan dan berinteraksi dengan kontrak kita

## Langkah 10: Tulis kontrak kita {#step-10}

Anda mungkin bertanya pada diri sendiri, kapan kita akan menulis kode?? Nah, kita sudah sampai di sini, pada langkah 10.

Buka proyek hello-world di editor favorit Anda (kami suka [VSCode](https://code.visualstudio.com/)). Kontrak pintar ditulis dalam bahasa yang disebut Solidity yang akan kita gunakan untuk menulis kontrak pintar HelloWorld.sol kita.‌

1. Arahkan ke folder “contracts” dan buat berkas baru bernama HelloWorld.sol
2. Di bawah ini adalah contoh kontrak pintar Hello World dari Ethereum Foundation yang akan kita gunakan untuk tutorial ini. Salin dan tempel konten di bawah ini ke dalam berkas HelloWorld.sol Anda, dan pastikan untuk membaca komentar untuk memahami apa yang dilakukan kontrak ini:

```solidity
// Menentukan versi Solidity, menggunakan versi semantik.
// Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Mendefinisikan kontrak bernama `HelloWorld`.
// Kontrak adalah kumpulan fungsi dan data (keadaannya). Setelah disebarkan, kontrak berada di alamat tertentu di rantai blok Ethereum. Pelajari lebih lanjut: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Mendeklarasikan variabel keadaan `message` dengan tipe `string`.
   // Variabel keadaan adalah variabel yang nilainya disimpan secara permanen di penyimpanan kontrak. Kata kunci `public` membuat variabel dapat diakses dari luar kontrak dan membuat fungsi yang dapat dipanggil oleh kontrak atau klien lain untuk mengakses nilainya.
   string public message;

   // Mirip dengan banyak bahasa berorientasi objek berbasis kelas, konstruktor adalah fungsi khusus yang hanya dijalankan saat pembuatan kontrak.
   // Konstruktor digunakan untuk menginisialisasi data kontrak. Pelajari lebih lanjut:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Menerima argumen string `initMessage` dan menetapkan nilainya ke dalam variabel penyimpanan `message` kontrak).
      message = initMessage;
   }

   // Fungsi publik yang menerima argumen string dan memperbarui variabel penyimpanan `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Ini adalah kontrak pintar super sederhana yang menyimpan pesan saat dibuat dan dapat diperbarui dengan memanggil fungsi `update`.

## Langkah 11: Hubungkan MetaMask & Alchemy ke proyek Anda {#step-11}

Kita telah membuat dompet MetaMask, akun Alchemy, dan menulis kontrak pintar kita, sekarang saatnya untuk menghubungkan ketiganya.

Setiap transaksi yang dikirim dari dompet virtual Anda memerlukan tanda tangan menggunakan kunci pribadi unik Anda. Untuk menyediakan program kita dengan izin ini, kita dapat menyimpan kunci pribadi kita (dan kunci API Alchemy) dengan aman dalam sebuah berkas lingkungan.

> Untuk mempelajari lebih lanjut tentang pengiriman transaksi, lihat [tutorial ini](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) tentang mengirim transaksi menggunakan web3.

Pertama-tama, instal paket dotenv ke dalam direktori proyek Anda:

```
npm install dotenv --save
```

Kemudian, buat file `.env` di direktori root proyek kita, dan tambahkan kunci pribadi MetaMask dan URL API HTTP Alchemy Anda ke dalamnya.

- Ikuti [petunjuk ini](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) untuk mengekspor kunci pribadi Anda
- Lihat di bawah ini untuk mendapatkan URL HTTP Alchemy API

![dapatkan kunci api alchemy](./get-alchemy-api-key.png)

Salin URL API Alchemy

`.env` Anda akan terlihat seperti ini:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Untuk benar-benar menghubungkannya ke kode kita, kita akan mereferensikan variabel-variabel ini dalam berkas `hardhat.config.js` kita pada langkah ke-13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Jangan commit <code>.env</code>! Pastikan untuk tidak pernah membagikan atau mengekspos file <code>.env</code> Anda kepada siapa pun, karena dengan melakukannya Anda membahayakan rahasia Anda. Jika Anda menggunakan kontrol versi, tambahkan <code>.env</code> Anda ke file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Langkah 12: Instal Ethers.js {#step-12-install-ethersjs}

Ethers.js adalah library yang mempermudah interaksi dan pembuatan permintaan ke Ethereum dengan membungkus [metode JSON-RPC standar](/developers/docs/apis/json-rpc/) dengan metode yang lebih ramah pengguna.

Hardhat membuatnya sangat mudah untuk mengintegrasikan [Plugin](https://hardhat.org/plugins/) untuk tooling tambahan dan fungsionalitas yang diperluas. Kita akan memanfaatkan [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) untuk penyebaran kontrak ([Ethers.js](https://github.com/ethers-io/ethers.js/) memiliki beberapa metode penyebaran kontrak yang sangat rapi).

Dalam direktori proyek Anda, ketik:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Kita juga akan memerlukan ethers dalam `hardhat.config.js` kita di langkah selanjutnya.

## Langkah 13: Perbarui hardhat.config.js {#step-13-update-hardhatconfigjs}

Kita sejauh ini telah menambahkan beberapa dependensi dan plugin, kini kita perlu memperbarui `hardhat.config.js` agar proyek kita mengenali mereka semua.

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

Untuk memastikan segalanya berjalan baik sejauh ini, mari kita kompilasikan kontrak kita. Tugas `compile` adalah salah satu tugas bawaan hardhat.

Dari barisan perintah jalankan:

```
npx hardhat compile
```

Anda mungkin mendapat peringatan tentang `SPDX license identifier not provided in source file`, tetapi tidak perlu mengkhawatirkannya — semoga semua yang lainnya berjalan dengan baik! Jika tidak, Anda selalu dapat mengirim pesan di [Discord Alchemy](https://discord.gg/u72VCg3).

## Langkah 15: Tulis skrip penyebaran kita {#step-15-write-our-deploy-scripts}

Kini setelah kontrak kita ditulis dan berkas konfigurasi kita siap, inilah waktunya menulis skrip penyebaran kontrak kita.

Arahkan ke folder `scripts/` dan buat berkas baru yang disebut `deploy.js`, tambahkan konten berikut ke dalamnya:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Mulai penyebaran, mengembalikan janji yang diselesaikan ke objek kontrak
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Kontrak disebarkan ke alamat:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat melakukan pekerjaan luar biasa dalam menjelaskan apa yang dilakukan setiap baris kode ini di [tutorial Kontrak](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) mereka, kami telah mengadopsi penjelasan mereka di sini.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

`ContractFactory` di ethers.js adalah abstraksi yang digunakan untuk menyebarkan kontrak pintar baru, jadi `HelloWorld` di sini adalah pabrik untuk instance kontrak hello world kita. Saat menggunakan plugin `hardhat-ethers`, instance `ContractFactory` dan `Contract` terhubung ke penanda tangan pertama secara default.

```
const hello_world = await HelloWorld.deploy();
```

Memanggil `deploy()` pada `ContractFactory` akan memulai penyebaran, dan mengembalikan `Promise` yang menyelesaikannya menjadi sebuah `Contract`. Ini adalah objek yang memiliki metode untuk setiap fungsi kontrak pintar kita.

## Langkah 16: Sebarkan kontrak kita {#step-16-deploy-our-contract}

Akhirnya kita siap untuk menyebarkan kontrak pintar kita! Arahkan ke baris perintah dan jalankan:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Lalu, Anda seharusnya melihat sesuatu seperti ini:

```
Kontrak disebarkan ke alamat: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Jika kita membuka [Sepolia etherscan](https://sepolia.etherscan.io/) dan mencari alamat kontrak kita, kita akan dapat melihat bahwa kontrak tersebut telah berhasil disebarkan. Transaksi akan terlihat seperti ini:

![kontrak etherscan](./etherscan-contract.png)

Alamat `From` harus sesuai dengan alamat akun MetaMask Anda dan alamat To akan bertuliskan “Contract Creation” tetapi jika kita mengklik transaksi, kita akan melihat alamat kontrak kita di kolom `To`:

![transaksi etherscan](./etherscan-transaction.png)

Selamat! Anda baru saja menyebarkan kontrak pintar ke rantai Ethereum 🎉

Untuk memahami apa yang terjadi di balik layar, mari kita buka tab Explorer di [dasbor Alchemy](https://dashboard.alchemyapi.io/explorer) kita. Jika Anda memiliki beberapa aplikasi Alchemy, pastikan untuk memfilter berdasarkan aplikasi dan pilih “Hello World”.
![penjelajah hello world](./hello-world-explorer.png)

Di sini Anda akan melihat beberapa panggilan JSON-RPC yang dibuat Hardhat/Ethers di balik layar untuk kita saat kita memanggil fungsi `.deploy()`. Dua hal penting yang perlu disebutkan di sini adalah [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), yang merupakan permintaan untuk benar-benar menulis kontrak kita ke rantai Sepolia, dan [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) yang merupakan permintaan untuk membaca informasi tentang transaksi kita berdasarkan hash (pola umum saat
transaksi). Untuk mempelajari lebih lanjut tentang pengiriman transaksi, lihat tutorial tentang [mengirim transaksi menggunakan Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Itu saja untuk bagian 1 dari tutorial ini, di bagian 2 kita akan benar-benar [berinteraksi dengan kontrak pintar kita](https://www.alchemy.com/docs/interacting-with-a-smart-contract) dengan memperbarui pesan awal kita, dan di bagian 3 kita akan [mempublikasikan kontrak pintar kita ke Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) sehingga semua orang akan tahu cara berinteraksi dengannya.

**Ingin mempelajari lebih lanjut tentang Alchemy? Lihat [situs web](https://www.alchemy.com/eth) kami. Ingin tidak ketinggalan pembaruan? Berlangganan buletin kami [di sini](https://www.alchemy.com/newsletter)! Pastikan juga untuk bergabung dengan [Discord](https://discord.gg/u72VCg3) kami.**.
