---
title: Cara Menulis & Menyebarkan NFT (Bagian 1/3 dari Seri Tutorial NFT)
description: Tutorial ini adalah Bagian 1 dari seri tentang NFT yang akan memandu Anda selangkah demi selangkah tentang cara menulis dan menyebarkan kontrak pintar Non Fungible Token (token ERC-721) menggunakan Ethereum dan Inter Planetary File System (IPFS).
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "kontrak pintar"]
skill: beginner
breadcrumb: Menulis dan menyebarkan NFT
lang: id
published: 2021-04-22
---

Dengan token yang tidak dapat dipertukarkan (NFT) yang membawa rantai blok ke mata publik, sekarang adalah kesempatan yang sangat baik untuk memahami sensasi tersebut sendiri dengan menerbitkan kontrak NFT Anda sendiri (Token ERC-721) di rantai blok Ethereum!

Dalam tutorial ini, kita akan memandu pembuatan dan penyebaran kontrak pintar ERC-721 di jaringan pengujian (testnet) Sepolia menggunakan [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/), dan [Alchemy](https://alchemy.com/signup/eth) (jangan khawatir jika Anda belum memahami apa arti dari semua ini — kami akan menjelaskannya!).

Di Bagian 2 dari tutorial ini, kita akan membahas bagaimana kita dapat menggunakan kontrak pintar kita untuk mencetak NFT, dan di Bagian 3 kita akan menjelaskan cara melihat NFT Anda di MetaMask.

Dan tentu saja, jika Anda memiliki pertanyaan kapan saja, jangan ragu untuk menghubungi di [Discord Alchemy](https://discord.gg/gWuC7zB) atau kunjungi [dokumentasi API NFT Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## Langkah 1: Hubungkan ke jaringan Ethereum {#connect-to-ethereum}

Ada banyak cara untuk membuat permintaan ke rantai blok Ethereum, tetapi untuk mempermudah, kita akan menggunakan akun gratis di [Alchemy](https://alchemy.com/signup/eth), sebuah platform pengembang rantai blok dan API yang memungkinkan kita untuk berkomunikasi dengan rantai Ethereum tanpa harus menjalankan node kita sendiri.

Dalam tutorial ini, kita juga akan memanfaatkan alat pengembang Alchemy untuk pemantauan dan analitik guna memahami apa yang terjadi secara teknis dalam penyebaran kontrak pintar kita. Jika Anda belum memiliki akun Alchemy, Anda dapat mendaftar secara gratis [di sini](https://alchemy.com/signup/eth).

## Langkah 2: Buat aplikasi Anda (dan kunci API) {#make-api-key}

Setelah Anda membuat akun Alchemy, Anda dapat menghasilkan kunci Antarmuka Pemrograman Aplikasi (API) dengan membuat aplikasi. Ini akan memungkinkan kita untuk membuat permintaan ke testnet Sepolia. Lihat [panduan ini](https://www.alchemy.com/docs/choosing-a-web3-network) jika Anda ingin mempelajari lebih lanjut tentang testnet.

1. Navigasikan ke halaman "Create new app" di Dasbor Alchemy Anda dengan memilih "Select an app" di bilah navigasi dan mengklik "Create new app"

![Buat aplikasi Anda](./alchemy-create-new-app.png)

2. Beri nama aplikasi Anda (kami memilih "My First NFT!"), berikan deskripsi singkat, dan pilih kasus penggunaan. Selanjutnya, cari "Ethereum" dan pilih jaringan. Kita akan menggunakan Sepolia, testnet yang direkomendasikan untuk pengembangan aplikasi (lihat [jaringan Ethereum](/developers/docs/networks/#ethereum-testnets)).

3. Klik "Next" untuk melanjutkan, lalu "Create app" dan selesai! Aplikasi Anda akan muncul di menu tarik-turun bilah navigasi, dengan Kunci API yang tersedia untuk disalin.

## Langkah 3: Buat akun Ethereum (alamat) {#create-eth-address}

Kita memerlukan akun Ethereum untuk mengirim dan menerima transaksi. Untuk tutorial ini, kita akan menggunakan MetaMask, dompet virtual di peramban yang digunakan untuk mengelola alamat akun Ethereum Anda. Jika Anda ingin memahami lebih lanjut tentang cara kerja transaksi di Ethereum, lihat [halaman ini](/developers/docs/transactions/) dari Yayasan Ethereum.

Anda dapat mengunduh dan membuat akun MetaMask secara gratis [di sini](https://metamask.io/download). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke testnet "Sepolia" menggunakan menu pemilihan jaringan (sehingga kita tidak berurusan dengan uang sungguhan). Jika Anda tidak melihat Sepolia terdaftar, buka menu di sudut kanan atas, pilih "Networks", dan aktifkan "Show test networks" (lihat [panduan MetaMask untuk melihat testnet](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Tetapkan Sepolia sebagai jaringan Anda](./metamask-sepolia.png)

## Langkah 4: Tambahkan Ether dari Faucet {#step-4-add-ether-from-a-faucet}

Untuk menyebarkan kontrak pintar kita ke testnet, kita akan membutuhkan beberapa ETH palsu. Untuk mendapatkan ETH Sepolia, pilih salah satu faucet yang terdaftar di [detail jaringan Sepolia](/developers/docs/networks/#sepolia) dan masukkan alamat akun Anda. Jika salah satu tidak berfungsi, coba yang lain karena terkadang bisa kehabisan, dan beberapa memiliki aturan kelayakan: misalnya, [faucet Sepolia Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) mengharuskan alamat penerima untuk memiliki setidaknya 0,001 ETH di Mainnet Ethereum. Anda akan melihat ETH di akun MetaMask Anda segera setelahnya!

## Langkah 5: Periksa Saldo Anda {#check-balance}

Untuk memastikan saldo kita ada di sana, mari buat permintaan [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) menggunakan [alat sandbox Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Ini akan mengembalikan jumlah ETH di dompet kita. Setelah Anda memasukkan alamat akun MetaMask Anda dan mengklik "Send Request", Anda akan melihat respons seperti ini:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **Catatan** Hasil ini dalam Wei, bukan ETH. Wei digunakan sebagai denominasi terkecil dari Ether. Konversi dari Wei ke ETH adalah 1 eth = 10<sup>18</sup> Wei. Jadi jika kita mengonversi 0xde0b6b3a7640000 ke desimal, kita mendapatkan 1\*10<sup>18</sup> Wei, yang sama dengan 1 ETH.

Fiuh! Uang palsu kita semuanya ada di sana.

## Langkah 6: Inisialisasi proyek kita {#initialize-project}

Pertama, kita perlu membuat folder untuk proyek kita. Navigasikan ke baris perintah Anda dan ketik:

```sh
mkdir my-nft
cd my-nft
```

Sekarang setelah kita berada di dalam folder proyek kita, kita akan menggunakan npm init untuk menginisialisasi proyek. Jika Anda belum menginstal npm, ikuti [petunjuk penginstalan Node.js](https://nodejs.org/en/download/) (kita akan membutuhkan Node.js dan npm untuk tutorial ini).

```sh
npm init
```

Tidak terlalu penting bagaimana Anda menjawab pertanyaan penginstalan; berikut adalah cara kami melakukannya sebagai referensi:

```console
package name: (my-nft)
version: (1.0.0)
description: My first NFT!
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

{
  "name": "my-nft",
  "version": "1.0.0",
  "description": "My first NFT!",
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

## Langkah 7: Instal [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat adalah lingkungan pengembangan untuk mengompilasi, menyebarkan, menguji, dan men-debug perangkat lunak Ethereum Anda. Ini membantu pengembang saat membangun kontrak pintar dan aplikasi terdesentralisasi (dapp) secara lokal sebelum menyebarkannya ke rantai langsung.

Hardhat 3 membutuhkan Node.js v22.13.0 atau yang lebih baru. Di dalam proyek my-nft kita, jalankan:

```sh
npm install --save-dev hardhat
```

Lihat halaman ini untuk detail lebih lanjut tentang [petunjuk penginstalan](https://hardhat.org/docs/getting-started).

## Langkah 8: Buat proyek Hardhat {#create-hardhat-project}

Menjalankan `npx hardhat --init` akan menghasilkan proyek sampel yang lengkap, tetapi untuk tutorial ini kita akan mengatur semuanya secara manual sehingga Anda dapat melihat setiap bagiannya. Di akar folder proyek Anda, buat file bernama `hardhat.config.js` dengan konten berikut:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Di sinilah kita akan menentukan semua pengaturan untuk proyek kita (pada langkah 13). Untuk saat ini, ini hanya memberi tahu Hardhat versi kompiler Solidity mana yang akan digunakan.

## Langkah 9: Tambahkan folder proyek {#add-project-folders}

Untuk menjaga proyek kita tetap teratur, kita akan membuat dua folder baru. Navigasikan ke direktori akar proyek Anda di baris perintah Anda dan ketik:

```sh
mkdir contracts
mkdir scripts
```

- contracts/ adalah tempat kita akan menyimpan kode kontrak pintar NFT kita

- scripts/ adalah tempat kita akan menyimpan skrip untuk menyebarkan dan berinteraksi dengan kontrak pintar kita

## Langkah 10: Tulis kontrak kita {#write-contract}

Sekarang setelah lingkungan kita disiapkan, mari beralih ke hal yang lebih menarik: _menulis kode kontrak pintar kita!_

Buka proyek my-nft di editor favorit Anda (kami menyukai [VSCode](https://code.visualstudio.com/)). Kontrak pintar ditulis dalam bahasa yang disebut Solidity yang akan kita gunakan untuk menulis kontrak pintar MyNFT.sol kita.‌

1. Navigasikan ke folder `contracts` dan buat file baru bernama MyNFT.sol

2. Di bawah ini adalah kode kontrak pintar NFT kita, yang kita dasarkan pada implementasi ERC-721 dari Pustaka [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721). Salin dan tempel konten di bawah ini ke dalam file MyNFT.sol Anda.

   ```solidity
   // Kontrak berdasarkan https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Karena kita mewarisi kelas dari Pustaka kontrak OpenZeppelin, di baris perintah Anda jalankan `npm install @openzeppelin/contracts` untuk menginstal Pustaka ke dalam folder kita. Tutorial ini menggunakan OpenZeppelin Contracts 5.x, yang membutuhkan Solidity 0.8.24 atau yang lebih baru.

Jadi, apa yang _dilakukan_ kode ini sebenarnya? Mari kita uraikan, baris demi baris.

Di bagian atas kontrak pintar kita, kita mengimpor tiga kelas kontrak pintar [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol berisi implementasi standar ERC-721, yang akan diwarisi oleh kontrak pintar NFT kita. (Untuk menjadi NFT yang valid, kontrak pintar Anda harus mengimplementasikan semua metode standar ERC-721.) Untuk mempelajari lebih lanjut tentang fungsi ERC-721 yang diwariskan, lihat definisi antarmuka [di sini](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/access/Ownable.sol mengatur [kontrol akses](https://docs.openzeppelin.com/contracts/5.x/access-control) pada kontrak pintar kita, sehingga hanya pemilik kontrak pintar (Anda) yang dapat mencetak NFT. Pemiliknya adalah alamat `initialOwner` yang diteruskan ke konstruktor. (Catatan, menyertakan kontrol akses sepenuhnya merupakan preferensi. Jika Anda ingin siapa pun dapat mencetak NFT menggunakan kontrak pintar Anda, hapus `Ownable` dan `Ownable(initialOwner)` dari definisi kontrak dan konstruktor, dan `onlyOwner` dari fungsi `mintNFT`.)

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol memperluas ERC-721 sehingga setiap token dapat menyimpan URI metadata-nya sendiri, yang kita tetapkan saat pencetakan.

Setelah pernyataan impor kita, kita memiliki kontrak pintar NFT kustom kita, yang secara mengejutkan pendek — ini hanya berisi penghitung, konstruktor, dan fungsi tunggal! Ini berkat kontrak OpenZeppelin yang kita warisi, yang mengimplementasikan sebagian besar metode yang kita butuhkan untuk membuat NFT, seperti `ownerOf` yang mengembalikan pemilik NFT, dan `transferFrom`, yang mentransfer kepemilikan NFT dari satu akun ke akun lainnya.

Penghitung, `_nextTokenId`, melacak jumlah total NFT yang dicetak dan menetapkan ID unik pada NFT baru kita. (Setiap NFT yang dicetak menggunakan kontrak pintar harus diberi ID unik—di sini ID unik kita hanya ditentukan oleh jumlah total NFT yang ada. `++_nextTokenId` meningkatkan penghitung sebelum digunakan, sehingga NFT pertama yang kita cetak dengan kontrak pintar kita memiliki ID "1," NFT kedua kita memiliki ID "2," dll.)

Dalam konstruktor ERC-721 kita, Anda akan melihat kita meneruskan 2 string, "MyNFT" dan "NFT." Variabel pertama adalah nama kontrak pintar, dan yang kedua adalah simbolnya. Anda dapat menamai masing-masing variabel ini sesuka Anda!

Terakhir, kita memiliki fungsi `mintNFT(address recipient, string memory tokenURI)` yang memungkinkan kita untuk mencetak NFT! Anda akan melihat fungsi ini mengambil dua variabel:

- `address recipient` menentukan alamat yang akan menerima NFT Anda yang baru dicetak

- `string memory tokenURI` adalah string yang harus diselesaikan ke dokumen JSON yang menjelaskan metadata NFT. Metadata NFT adalah apa yang benar-benar menghidupkannya, memungkinkannya memiliki properti yang dapat dikonfigurasi, seperti nama, deskripsi, gambar, dan atribut lainnya. Di bagian 2 dari tutorial ini, kita akan menjelaskan cara mengonfigurasi metadata ini.

`mintNFT` memanggil beberapa metode dari Pustaka ERC-721 yang diwariskan, dan pada akhirnya mengembalikan angka yang mewakili ID dari NFT yang baru dicetak.

## Langkah 11: Hubungkan MetaMask & Alchemy ke proyek Anda {#connect-metamask-and-alchemy}

Sekarang setelah kita membuat dompet MetaMask, akun Alchemy, dan menulis kontrak pintar kita, saatnya untuk menghubungkan ketiganya.

Setiap transaksi yang dikirim dari dompet virtual Anda memerlukan tanda tangan menggunakan kunci privat unik Anda. Untuk memberikan izin ini kepada program kita, kita dapat menyimpan kunci privat kita (dan kunci API Alchemy) dengan aman di file lingkungan.

Untuk mempelajari lebih lanjut tentang mengirim transaksi, lihat [dokumentasi transaksi](/developers/docs/transactions/).

Buat file `.env` di direktori akar proyek kita, dan tambahkan kunci privat MetaMask dan URL API Alchemy HTTP Anda ke dalamnya.

- Ikuti [petunjuk ini](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) untuk mengekspor kunci privat Anda dari MetaMask

- Lihat di bawah ini untuk mendapatkan URL API Alchemy HTTP dan salin ke papan klip Anda

![Salin URL API Alchemy Anda](./copy-alchemy-api-url.mp4#842x480)

File `.env` Anda sekarang akan terlihat seperti ini:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Untuk benar-benar menghubungkan ini ke kode kita, kita akan merujuk variabel-variabel ini di file hardhat.config.js kita pada langkah 13. Node.js dapat membaca file `.env` dengan sendirinya, jadi tidak ada paket tambahan yang perlu diinstal.

<EnvWarningBanner />

## Langkah 12: Instal Ethers.js {#install-ethers}

Ethers.js adalah Pustaka yang memudahkan untuk berinteraksi dan membuat permintaan ke Ethereum dengan membungkus [metode JSON-RPC standar](/developers/docs/apis/json-rpc/) dengan metode yang lebih ramah pengguna.

Hardhat membuatnya sangat mudah untuk mengintegrasikan [Plugin](https://hardhat.org/docs/plugins/official-plugins) untuk perkakas tambahan dan fungsionalitas yang diperluas. Kita akan memanfaatkan [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) untuk penyebaran kontrak ([Ethers.js](https://docs.ethers.org/v6/) memiliki beberapa metode penyebaran kontrak yang sangat rapi).

Di direktori proyek Anda ketik:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Kita juga akan menambahkan plugin ke hardhat.config.js kita pada langkah berikutnya.

## Langkah 13: Perbarui hardhat.config.js {#update-hardhat-config}

Kita telah menambahkan beberapa dependensi dan plugin sejauh ini, sekarang kita perlu memperbarui hardhat.config.js sehingga proyek kita mengetahui semuanya.

Perbarui hardhat.config.js Anda agar terlihat seperti ini:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Muat API_URL dan PRIVATE_KEY dari file .env ke dalam process.env, jika ada
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

## Langkah 14: Kompilasi kontrak kita {#compile-contract}

Untuk memastikan semuanya berfungsi sejauh ini, mari kita kompilasi kontrak kita. Tugas kompilasi adalah salah satu tugas bawaan Hardhat.

Dari baris perintah jalankan:

```sh
npx hardhat compile
```

Pertama kali Anda mengompilasi, Hardhat mengunduh kompiler Solidity. Anda kemudian akan melihat sesuatu seperti `Compiled 1 Solidity file with solc 0.8.34`. Jika tidak, Anda selalu dapat mengirim pesan di [Discord Alchemy](https://discord.gg/gWuC7zB).

## Langkah 15: Tulis skrip penyebaran kita {#write-deploy}

Sekarang setelah kontrak kita ditulis dan file konfigurasi kita siap digunakan, saatnya untuk menulis skrip penyebaran kontrak kita.

Navigasikan ke folder `scripts/` dan buat file baru bernama `deploy.js`, tambahkan konten berikut ke dalamnya:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Mulai penyebaran, mengembalikan promise yang diselesaikan menjadi objek kontrak
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Mari kita bahas apa yang dilakukan oleh masing-masing baris kode ini.

```js
const { ethers } = await network.create()
```

Di Hardhat 3, sebuah skrip membuka koneksi ke jaringan secara eksplisit. `network.create()` terhubung ke jaringan yang Anda pilih dengan opsi `--network` saat Anda menjalankan skrip, dan plugin `hardhat-ethers` menambahkan objek `ethers` ke koneksi tersebut.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` mengembalikan akun yang dikonfigurasi untuk jaringan. Di Sepolia, itu adalah akun yang kunci privatnya Anda masukkan ke dalam `.env`. Kita meneruskan alamatnya ke konstruktor sehingga Anda menjadi pemilik kontrak.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

ContractFactory di ethers.js adalah abstraksi yang digunakan untuk menyebarkan kontrak pintar baru, jadi MyNFT di sini adalah pabrik untuk instans kontrak NFT kita. Saat menggunakan plugin hardhat-ethers, instans ContractFactory dan Contract terhubung ke penandatangan pertama secara default.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

Memanggil deploy() pada ContractFactory akan memulai penyebaran, dan mengembalikan Promise yang diselesaikan ke Contract. Ini adalah objek yang memiliki metode untuk setiap fungsi kontrak pintar kita. Argumen yang Anda teruskan ke deploy() masuk ke konstruktor kontrak, di sini alamat `initialOwner`.

`waitForDeployment()` menunggu hingga transaksi penyebaran disertakan dalam sebuah blok, dan `getAddress()` mengembalikan alamat kontrak baru. Lihat [dokumentasi kontrak ethers.js](https://docs.ethers.org/v6/api/contract/) untuk detail lebih lanjut.

## Langkah 16: Sebarkan kontrak kita {#deploy-contract}

Kita akhirnya siap untuk menyebarkan kontrak pintar kita! Navigasikan kembali ke akar direktori proyek Anda, dan di baris perintah jalankan:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Anda kemudian akan melihat sesuatu seperti:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

Jika kita pergi ke [Etherscan Sepolia](https://sepolia.etherscan.io/) dan mencari alamat kontrak kita, kita seharusnya dapat melihat bahwa itu telah berhasil disebarkan. Jika Anda tidak dapat melihatnya segera, harap tunggu sebentar karena ini bisa memakan waktu. Transaksinya akan terlihat seperti ini:

![Lihat alamat transaksi Anda di Etherscan](./etherscan-sepoila-contract-creation.png)

Alamat From harus cocok dengan alamat akun MetaMask Anda dan alamat To akan bertuliskan "Contract Creation". Jika kita mengklik transaksi tersebut, kita akan melihat alamat kontrak kita di bidang To:

![Lihat alamat kontrak Anda di Etherscan](./etherscan-sepolia-tx-details.png)

Yasssss! Anda baru saja menyebarkan kontrak pintar NFT Anda ke rantai (testnet) Ethereum!

Untuk memahami apa yang terjadi secara internal, Anda dapat melihat permintaan yang diterima aplikasi Anda di [dasbor Alchemy](https://dashboard.alchemy.com/) Anda.

Di sana Anda akan melihat beberapa panggilan JSON-RPC yang dilakukan Hardhat/Ethers secara internal untuk kita saat kita memanggil fungsi .deploy(). Dua hal penting yang perlu diperhatikan di sini adalah [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), yang merupakan permintaan untuk benar-benar menulis kontrak pintar kita ke rantai Sepolia, dan [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) yang merupakan permintaan untuk membaca informasi tentang transaksi kita berdasarkan hash (pola umum saat mengirim transaksi). Untuk mempelajari lebih lanjut tentang mengirim transaksi, lihat [dokumentasi transaksi](/developers/docs/transactions/).

Itu saja untuk Bagian 1 dari tutorial ini. Di [Bagian 2, kita akan benar-benar berinteraksi dengan kontrak pintar kita dengan mencetak NFT](/developers/tutorials/how-to-mint-an-nft/), dan di [Bagian 3 kita akan menunjukkan kepada Anda cara melihat NFT Anda di dompet Ethereum Anda](/developers/tutorials/how-to-view-nft-in-metamask/)!
