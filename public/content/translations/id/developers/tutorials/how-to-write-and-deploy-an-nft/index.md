---
title: Cara Menulis & Menerapkan NFT (Bagian 1/3 dari Seri Tutorial NFT)
description: Tutorial ini adalah Bagian 1 dari seri tentang NFT yang akan memandu Anda langkah demi langkah tentang cara menulis dan menerapkan kontrak pintar Non Fungible Token (token ERC-721) menggunakan Ethereum dan Inter Planetary File System (IPFS).
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "kontrak pintar"]
skill: beginner
breadcrumb: "Tulis dan deploy NFT"
lang: id
published: 2021-04-22
---

Dengan NFT yang membawa blockchain ke mata publik, sekarang adalah kesempatan yang sangat baik untuk memahami tren ini sendiri dengan menerbitkan kontrak NFT Anda sendiri (Token ERC-721) di blockchain Ethereum!

Alchemy sangat bangga dapat mendukung nama-nama terbesar di ruang NFT, termasuk Makersplace (baru-baru ini mencetak rekor penjualan karya seni digital di Christie's seharga $69 Juta), Dapper Labs (pencipta NBA Top Shot & Crypto Kitties), OpenSea (pasar NFT terbesar di dunia), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable, dan banyak lagi.

Dalam tutorial ini, kita akan memandu pembuatan dan penerapan kontrak pintar ERC-721 di jaringan testnet Sepolia menggunakan [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) dan [Alchemy](https://alchemy.com/signup/eth) (jangan khawatir jika Anda belum memahami apa arti dari semua ini — kami akan menjelaskannya!).

Di Bagian 2 dari tutorial ini, kita akan membahas bagaimana kita dapat menggunakan kontrak pintar kita untuk melakukan mint NFT, dan di Bagian 3 kita akan menjelaskan cara melihat NFT Anda di MetaMask.

Dan tentu saja, jika Anda memiliki pertanyaan kapan saja, jangan ragu untuk menghubungi di [Discord Alchemy](https://discord.gg/gWuC7zB) atau kunjungi [dokumentasi API NFT Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Langkah 1: Hubungkan ke jaringan Ethereum {#connect-to-ethereum}

Ada banyak cara untuk membuat permintaan ke blockchain Ethereum, tetapi untuk mempermudah, kita akan menggunakan akun gratis di [Alchemy](https://alchemy.com/signup/eth), sebuah platform pengembang blockchain dan API yang memungkinkan kita untuk berkomunikasi dengan rantai Ethereum tanpa harus menjalankan node kita sendiri.

Dalam tutorial ini, kita juga akan memanfaatkan alat pengembang Alchemy untuk pemantauan dan analitik guna memahami apa yang terjadi di balik layar dalam penerapan kontrak pintar kita. Jika Anda belum memiliki akun Alchemy, Anda dapat mendaftar secara gratis [di sini](https://alchemy.com/signup/eth).

## Langkah 2: Buat aplikasi Anda (dan kunci API) {#make-api-key}

Setelah Anda membuat akun Alchemy, Anda dapat menghasilkan kunci API dengan membuat aplikasi. Ini akan memungkinkan kita untuk membuat permintaan ke jaringan testnet Sepolia. Lihat [panduan ini](https://docs.alchemyapi.io/guides/choosing-a-network) jika Anda penasaran untuk mempelajari lebih lanjut tentang jaringan testnet.

1. Arahkan ke halaman "Create App" di Dasbor Alchemy Anda dengan mengarahkan kursor ke "Apps" di bilah navigasi dan mengklik "Create App"

![Buat aplikasi Anda](./create-your-app.png)

2. Beri nama aplikasi Anda (kami memilih "My First NFT!"), berikan deskripsi singkat, pilih "Ethereum" untuk Chain, dan pilih "Sepolia" untuk jaringan Anda. Sejak the merge, testnet lainnya telah dihentikan.

![Konfigurasi dan publikasikan aplikasi Anda](./alchemy-explorer-sepolia.png)

3. Klik "Create app" dan selesai! Aplikasi Anda akan muncul di tabel di bawah ini.

## Langkah 3: Buat akun (alamat) Ethereum {#create-eth-address}

Kita memerlukan akun Ethereum untuk mengirim dan menerima transaksi. Untuk tutorial ini, kita akan menggunakan MetaMask, sebuah dompet virtual di peramban yang digunakan untuk mengelola alamat akun Ethereum Anda. Jika Anda ingin memahami lebih lanjut tentang cara kerja transaksi di Ethereum, lihat [halaman ini](/developers/docs/transactions/) dari yayasan Ethereum.

Anda dapat mengunduh dan membuat akun MetaMask secara gratis [di sini](https://metamask.io/download). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke "Sepolia Test Network" di kanan atas (sehingga kita tidak berurusan dengan uang sungguhan).

![Atur Sepolia sebagai jaringan Anda](./metamask-goerli.png)

## Langkah 4: Tambahkan ether dari Faucet {#step-4-add-ether-from-a-faucet}

Untuk menerapkan kontrak pintar kita ke jaringan testnet, kita akan memerlukan beberapa ETH palsu. Untuk mendapatkan ETH, Anda dapat pergi ke [Sepolia Faucet](https://sepoliafaucet.com/) yang di-host oleh Alchemy, masuk dan masukkan alamat akun Anda, klik "Send Me ETH". Anda akan melihat ETH di akun MetaMask Anda segera setelahnya!

## Langkah 5: Periksa Saldo Anda {#check-balance}

Untuk memeriksa kembali apakah saldo kita ada di sana, mari buat permintaan [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) menggunakan [alat komposer Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ini akan mengembalikan jumlah ETH di dompet kita. Setelah Anda memasukkan alamat akun MetaMask Anda dan mengklik "Send Request", Anda akan melihat respons seperti ini:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Catatan** Hasil ini dalam wei, bukan ETH. Wei digunakan sebagai denominasi terkecil dari ether. Konversi dari wei ke ETH adalah 1 eth = 10<sup>18</sup> wei. Jadi jika kita mengonversi 0xde0b6b3a7640000 ke desimal kita mendapatkan 1\*10<sup>18</sup> wei, yang sama dengan 1 ETH.

Fiuh! Uang palsu kita semuanya ada di sana.

## Langkah 6: Inisialisasi proyek kita {#initialize-project}

Pertama, kita perlu membuat folder untuk proyek kita. Arahkan ke baris perintah Anda dan ketik:

    mkdir my-nft
    cd my-nft

Sekarang kita berada di dalam folder proyek kita, kita akan menggunakan npm init untuk menginisialisasi proyek. Jika Anda belum menginstal npm, ikuti [instruksi ini](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (kita juga akan memerlukan [Node.js](https://nodejs.org/en/download/), jadi unduh juga itu!).

    npm init

Tidak masalah bagaimana Anda menjawab pertanyaan instalasi; berikut adalah cara kami melakukannya sebagai referensi:

```json
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

Setujui package.json, dan kita siap untuk melanjutkan!

## Langkah 7: Instal [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat adalah lingkungan pengembangan untuk mengompilasi, menerapkan, menguji, dan men-debug perangkat lunak Ethereum Anda. Ini membantu pengembang saat membangun kontrak pintar dan dapp secara lokal sebelum menerapkannya ke rantai langsung.

Di dalam proyek my-nft kita, jalankan:

    npm install --save-dev hardhat

Lihat halaman ini untuk detail lebih lanjut tentang [instruksi instalasi](https://hardhat.org/getting-started/#overview).

## Langkah 8: Buat proyek Hardhat {#create-hardhat-project}

Di dalam folder proyek kita, jalankan:

    npx hardhat

Anda kemudian akan melihat pesan selamat datang dan opsi untuk memilih apa yang ingin Anda lakukan. Pilih "create an empty hardhat.config.js":

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Ini akan menghasilkan file hardhat.config.js untuk kita yang merupakan tempat kita akan menentukan semua pengaturan untuk proyek kita (pada langkah 13).

## Langkah 9: Tambahkan folder proyek {#add-project-folders}

Untuk menjaga proyek kita tetap teratur, kita akan membuat dua folder baru. Arahkan ke direktori root proyek Anda di baris perintah Anda dan ketik:

    mkdir contracts
    mkdir scripts

- contracts/ adalah tempat kita akan menyimpan kode kontrak pintar NFT kita

- scripts/ adalah tempat kita akan menyimpan skrip untuk menerapkan dan berinteraksi dengan kontrak pintar kita

## Langkah 10: Tulis kontrak kita {#write-contract}

Sekarang lingkungan kita sudah diatur, mari beralih ke hal yang lebih menarik: _menulis kode kontrak pintar kita!_

Buka proyek my-nft di editor favorit Anda (kami menyukai [VSCode](https://code.visualstudio.com/)). Kontrak pintar ditulis dalam bahasa yang disebut Solidity yang akan kita gunakan untuk menulis kontrak pintar MyNFT.sol kita.‌

1. Arahkan ke folder `contracts` dan buat file baru bernama MyNFT.sol

2. Di bawah ini adalah kode kontrak pintar NFT kita, yang kita dasarkan pada implementasi ERC-721 dari pustaka [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Salin dan tempel konten di bawah ini ke dalam file MyNFT.sol Anda.

   ```solidity
   //Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721) // Kontrak berdasarkan [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
```

3. Karena kita mewarisi kelas dari pustaka kontrak OpenZeppelin, di baris perintah Anda jalankan `npm install @openzeppelin/contracts^4.0.0` untuk menginstal pustaka ke dalam folder kita.

Jadi, apa yang _dilakukan_ kode ini sebenarnya? Mari kita uraikan, baris demi baris.

Di bagian atas kontrak pintar kita, kita mengimpor tiga kelas kontrak pintar [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol berisi implementasi standar ERC-721, yang akan diwarisi oleh kontrak pintar NFT kita. (Untuk menjadi NFT yang valid, kontrak pintar Anda harus mengimplementasikan semua metode standar ERC-721.) Untuk mempelajari lebih lanjut tentang fungsi ERC-721 yang diwariskan, lihat definisi antarmuka [di sini](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol menyediakan penghitung yang hanya dapat ditambah atau dikurangi satu. Kontrak pintar kita menggunakan penghitung untuk melacak jumlah total NFT yang di-mint dan menetapkan ID unik pada NFT baru kita. (Setiap NFT yang di-mint menggunakan kontrak pintar harus diberi ID unik—di sini ID unik kita hanya ditentukan oleh jumlah total NFT yang ada. Misalnya, NFT pertama yang kita mint dengan kontrak pintar kita memiliki ID "1," NFT kedua kita memiliki ID "2," dll.)

- @openzeppelin/contracts/access/Ownable.sol mengatur [kontrol akses](https://docs.openzeppelin.com/contracts/3.x/access-control) pada kontrak pintar kita, sehingga hanya pemilik kontrak pintar (Anda) yang dapat melakukan mint NFT. (Catatan, menyertakan kontrol akses sepenuhnya merupakan preferensi. Jika Anda ingin siapa pun dapat melakukan mint NFT menggunakan kontrak pintar Anda, hapus kata Ownable pada baris 10 dan onlyOwner pada baris 17.)

Setelah pernyataan impor kita, kita memiliki kontrak pintar NFT kustom kita, yang secara mengejutkan pendek — ini hanya berisi penghitung, konstruktor, dan fungsi tunggal! Ini berkat kontrak OpenZeppelin yang kita warisi, yang mengimplementasikan sebagian besar metode yang kita butuhkan untuk membuat NFT, seperti `ownerOf` yang mengembalikan pemilik NFT, dan `transferFrom`, yang mentransfer kepemilikan NFT dari satu akun ke akun lainnya.

Dalam konstruktor ERC-721 kita, Anda akan melihat kita meneruskan 2 string, "MyNFT" dan "NFT." Variabel pertama adalah nama kontrak pintar, dan yang kedua adalah simbolnya. Anda dapat menamai masing-masing variabel ini sesuka Anda!

Terakhir, kita memiliki fungsi `mintNFT(address recipient, string memory tokenURI)` yang memungkinkan kita untuk melakukan mint NFT! Anda akan melihat fungsi ini mengambil dua variabel:

- `address recipient` menentukan alamat yang akan menerima NFT Anda yang baru di-mint

- `string memory tokenURI` adalah string yang harus diselesaikan ke dokumen JSON yang mendeskripsikan metadata NFT. Metadata NFT adalah apa yang benar-benar menghidupkannya, memungkinkannya memiliki properti yang dapat dikonfigurasi, seperti nama, deskripsi, gambar, dan atribut lainnya. Di bagian 2 dari tutorial ini, kita akan mendeskripsikan cara mengonfigurasi metadata ini.

`mintNFT` memanggil beberapa metode dari pustaka ERC-721 yang diwariskan, dan pada akhirnya mengembalikan angka yang mewakili ID dari NFT yang baru di-mint.

## Langkah 11: Hubungkan MetaMask & Alchemy ke proyek Anda {#connect-metamask-and-alchemy}

Sekarang kita telah membuat dompet MetaMask, akun Alchemy, dan menulis kontrak pintar kita, saatnya untuk menghubungkan ketiganya.

Setiap transaksi yang dikirim dari dompet virtual Anda memerlukan tanda tangan menggunakan kunci pribadi unik Anda. Untuk memberikan izin ini kepada program kita, kita dapat dengan aman menyimpan kunci pribadi kita (dan kunci API Alchemy) dalam file lingkungan.

Untuk mempelajari lebih lanjut tentang mengirim transaksi, lihat [tutorial ini](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) tentang mengirim transaksi menggunakan web3.

Pertama, instal paket dotenv di direktori proyek Anda:

    npm install dotenv --save

Kemudian, buat file `.env` di direktori root proyek kita, dan tambahkan kunci pribadi MetaMask Anda dan URL API HTTP Alchemy ke dalamnya.

- Ikuti [instruksi ini](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) untuk mengekspor kunci pribadi Anda dari MetaMask

- Lihat di bawah ini untuk mendapatkan URL API HTTP Alchemy dan salin ke papan klip Anda

![Salin URL API Alchemy Anda](./copy-alchemy-api-url.gif)

`.env` Anda sekarang akan terlihat seperti ini:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Untuk benar-benar menghubungkan ini ke kode kita, kita akan merujuk variabel-variabel ini dalam file hardhat.config.js kita pada langkah 13.

<EnvWarningBanner />

## Langkah 12: Instal Ethers.js {#install-ethers}

Ethers.js adalah pustaka yang memudahkan untuk berinteraksi dan membuat permintaan ke Ethereum dengan membungkus [metode JSON-RPC standar](/developers/docs/apis/json-rpc/) dengan metode yang lebih ramah pengguna.

Hardhat membuatnya sangat mudah untuk mengintegrasikan [Plugin](https://hardhat.org/plugins/) untuk perkakas tambahan dan fungsionalitas yang diperluas. Kita akan memanfaatkan [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) untuk penerapan kontrak ([Ethers.js](https://github.com/ethers-io/ethers.js/) memiliki beberapa metode penerapan kontrak yang sangat bersih).

Di direktori proyek Anda ketik:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Kita juga akan memerlukan ethers di hardhat.config.js kita pada langkah berikutnya.

## Langkah 13: Perbarui hardhat.config.js {#update-hardhat-config}

Kita telah menambahkan beberapa dependensi dan plugin sejauh ini, sekarang kita perlu memperbarui hardhat.config.js sehingga proyek kita mengetahui semuanya.

Perbarui hardhat.config.js Anda agar terlihat seperti ini:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
     */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
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

## Langkah 14: Kompilasi kontrak kita {#compile-contract}

Untuk memastikan semuanya berfungsi sejauh ini, mari kompilasi kontrak kita. Tugas kompilasi adalah salah satu tugas bawaan hardhat.

Dari baris perintah jalankan:

    npx hardhat compile

Anda mungkin mendapatkan peringatan tentang pengidentifikasi lisensi SPDX yang tidak disediakan dalam file sumber, tetapi tidak perlu khawatir tentang itu — semoga semuanya terlihat baik! Jika tidak, Anda selalu dapat mengirim pesan di [discord Alchemy](https://discord.gg/u72VCg3).

## Langkah 15: Tulis skrip penerapan kita {#write-deploy}

Sekarang kontrak kita telah ditulis dan file konfigurasi kita siap digunakan, saatnya untuk menulis skrip penerapan kontrak kita.

Arahkan ke folder `scripts/` dan buat file baru bernama `deploy.js`, tambahkan konten berikut ke dalamnya:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Start deployment, returning a promise that resolves to a contract object // Mulai penerapan, mengembalikan promise yang menghasilkan objek kontrak
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat melakukan pekerjaan yang luar biasa dalam menjelaskan apa yang dilakukan masing-masing baris kode ini dalam [tutorial Kontrak](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) mereka, kami telah mengadopsi penjelasan mereka di sini.

    const MyNFT = await ethers.getContractFactory("MyNFT");

ContractFactory di ethers.js adalah abstraksi yang digunakan untuk menerapkan kontrak pintar baru, jadi MyNFT di sini adalah pabrik untuk instans kontrak NFT kita. Saat menggunakan plugin hardhat-ethers, instans ContractFactory dan Contract terhubung ke penandatangan pertama secara default.

    const myNFT = await MyNFT.deploy();

Memanggil deploy() pada ContractFactory akan memulai penerapan, dan mengembalikan Promise yang diselesaikan ke Contract. Ini adalah objek yang memiliki metode untuk setiap fungsi kontrak pintar kita.

## Langkah 16: Terapkan kontrak kita {#deploy-contract}

Kita akhirnya siap untuk menerapkan kontrak pintar kita! Arahkan kembali ke root direktori proyek Anda, dan di baris perintah jalankan:

    npx hardhat --network sepolia run scripts/deploy.js

Anda kemudian akan melihat sesuatu seperti:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Jika kita pergi ke [Sepolia etherscan](https://sepolia.etherscan.io/) dan mencari alamat kontrak kita, kita seharusnya dapat melihat bahwa itu telah berhasil diterapkan. Jika Anda tidak dapat melihatnya segera, harap tunggu sebentar karena ini bisa memakan waktu. Transaksi akan terlihat seperti ini:

![Lihat alamat transaksi Anda di Etherscan](./etherscan-sepoila-contract-creation.png)

Alamat From harus cocok dengan alamat akun MetaMask Anda dan alamat To akan mengatakan "Contract Creation". Jika kita mengklik ke dalam transaksi, kita akan melihat alamat kontrak kita di bidang To:

![Lihat alamat kontrak Anda di Etherscan](./etherscan-sepolia-tx-details.png)

Yasssss! Anda baru saja menerapkan kontrak pintar NFT Anda ke rantai (testnet) Ethereum!

Untuk memahami apa yang terjadi di balik layar, mari arahkan ke tab Explorer di [dasbor Alchemy](https://dashboard.alchemyapi.io/explorer) kita. Jika Anda memiliki beberapa aplikasi Alchemy, pastikan untuk memfilter berdasarkan aplikasi dan pilih "MyNFT".

![Lihat panggilan yang dilakukan "di balik layar" dengan Dasbor Explorer Alchemy](./alchemy-explorer-goerli.png)

Di sini Anda akan melihat beberapa panggilan JSON-RPC yang dilakukan Hardhat/Ethers di balik layar untuk kita saat kita memanggil fungsi .deploy(). Dua hal penting yang perlu disebutkan di sini adalah [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), yang merupakan permintaan untuk benar-benar menulis kontrak pintar kita ke rantai Sepolia, dan [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) yang merupakan permintaan untuk membaca informasi tentang transaksi kita berdasarkan hash (pola khas saat mengirim transaksi). Untuk mempelajari lebih lanjut tentang mengirim transaksi, lihat tutorial ini tentang [mengirim transaksi menggunakan Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Sekian untuk Bagian 1 dari tutorial ini. Di [Bagian 2, kita akan benar-benar berinteraksi dengan kontrak pintar kita dengan melakukan mint NFT](/developers/tutorials/how-to-mint-an-nft/), dan di [Bagian 3 kita akan menunjukkan kepada Anda cara melihat NFT Anda di dompet Ethereum Anda](/developers/tutorials/how-to-view-nft-in-metamask/)!