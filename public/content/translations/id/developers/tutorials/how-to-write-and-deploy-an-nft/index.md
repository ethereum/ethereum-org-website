---
title: Cara Menulis & Menyebarkan NFT (Bagian 1/3 dari Seri Tutorial NFT)
description: Tutorial ini adalah Bagian 1 dari seri NFT yang akan membawa Anda selangkah demi selangkah tentang cara menulis dan menyebarkan kontrak pintar Token yang Tak Dapat Dipertukarkan (token ERC-721) dengan menggunakan Ethereum dan Sistem Berkas Antar Planet (IPFS).
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity", "kontrak pintar" ]
skill: beginner
lang: id
published: 2021-04-22
---

Dengan NFT yang membawa blockchain ke mata publik, sekarang adalah kesempatan yang sangat baik untuk memahami sendiri hype-nya dengan menerbitkan kontrak NFT (Token ERC-721) Anda sendiri di blockchain Ethereum!

Alchemy sangat bangga dapat mendukung nama-nama terbesar di dunia NFT, termasuk Makersplace (baru-baru ini mencetak rekor penjualan karya seni digital di Christie’s seharga $69 Juta), Dapper Labs (kreator NBA Top Shot & Crypto Kitties), OpenSea (marketplace NFT terbesar di dunia), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable, dan lainnya.

Dalam tutorial ini, kita akan membahas cara membuat dan menyebarkan kontrak pintar ERC-721 di testnet Sepolia menggunakan [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) dan [Alchemy](https://alchemy.com/signup/eth) (jangan khawatir jika Anda belum mengerti artinya—kami akan menjelaskannya!).

Dalam Bagian 2 dari tutorial ini kita akan melalui panduan cara menggunakan kontrak pintar kita untuk mencetak NFT, dan dalam Bagian 3, kami akan menjelaskan cara melihat NFT Anda di MetaMask.

Tentu saja, jika Anda memiliki pertanyaan kapan pun, jangan ragu untuk bertanya di [Discord Alchemy](https://discord.gg/gWuC7zB) atau kunjungi [dokumen API NFT Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Langkah 1: Hubungkan ke jaringan Ethereum {#connect-to-ethereum}

Ada banyak cara untuk membuat permintaan ke blockchain Ethereum, tetapi untuk mempermudah, kita akan menggunakan akun gratis di [Alchemy](https://alchemy.com/signup/eth), sebuah platform pengembang blockchain dan API yang memungkinkan kita berkomunikasi dengan chain Ethereum tanpa harus menjalankan node kita sendiri.

Dalam tutorial ini, kita juga akan memanfaatkan perangkat pengembang Alchemy untuk pengawasan dan analitik untuk memahami apa yang terjadi di bawah hood dalam penyebaran kontrak pintar kita. Jika Anda belum memiliki akun Alchemy, Anda dapat mendaftar gratis [di sini](https://alchemy.com/signup/eth).

## Langkah 2: Buat aplikasi Anda (dan kunci API) {#make-api-key}

Setelah Anda membuat akun Alchemy, Anda dapat membuat kunci API dengan membuat aplikasi. Ini akan memungkinkan kita untuk membuat permintaan ke testnet Sepolia. Lihat [panduan ini](https://docs.alchemyapi.io/guides/choosing-a-network) jika Anda penasaran untuk mempelajari lebih lanjut tentang testnet.

1. Arahkan ke halaman "Create App" di Dashboard Alchemy Anda dengan mengarahkan kursor ke "Apps" di bilah navigasi dan mengklik "Create App"

![Buat aplikasi Anda](./create-your-app.png)

2. Beri nama aplikasi Anda (kami memilih “NFT Pertamaku!”), berikan deskripsi singkat, pilih “Ethereum” untuk Chain, dan pilih “Sepolia” untuk jaringan Anda. Sejak The Merge, testnet lainnya telah usang.

![Konfigurasi dan publikasikan aplikasi Anda](./alchemy-explorer-sepolia.png)

3. Klik "Buat aplikasi" dan selesai! Aplikasi Anda akan muncul dalam tabel di bawahnya.

## Langkah 3: Buat akun Ethereum (alamat) {#create-eth-address}

Kita memerlukan akun Ethereum untuk mengirim dan menerima transaksi. Untuk tutorial ini, kita akan menggunakan MetaMask, dompet virtual dalam peramban yang digunakan untuk mengelola alamat akun Ethereum Anda. Jika Anda ingin memahami lebih lanjut tentang cara kerja transaksi di Ethereum, lihat [halaman ini](/developers/docs/transactions/) dari Ethereum Foundation.

Anda dapat mengunduh dan membuat akun MetaMask secara gratis [di sini](https://metamask.io/download). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke “Testnet Sepolia” di kanan atas (agar kita tidak berurusan dengan uang sungguhan).

![Atur Sepolia sebagai jaringan Anda](./metamask-goerli.png)

## Langkah 4: Tambahkan eter dari Faucet {#step-4-add-ether-from-a-faucet}

Untuk menyebarkan kontrak pintar kita ke jaringan uji, kita memerlukan beberapa ETH palsu. Untuk mendapatkan ETH, Anda bisa membuka [Faucet Sepolia](https://sepoliafaucet.com/) yang di-host oleh Alchemy, masuk dan masukkan alamat akun Anda, lalu klik “Send Me ETH”. Anda seharusnya akan melihat ETH dalam akun MetaMask Anda dengan segera!

## Langkah 5: Periksa Saldo Anda {#check-balance}

Untuk memeriksa ulang saldo kita, mari buat permintaan [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) menggunakan [alat composer Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ini akan mengembalikan jumlah ETH dalam dompet kita. Setelah Anda memasukkan alamat akun MetaMask Anda dan klik "Kirim Permintaan", Anda akan melihat respons seperti ini:

    ```
    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`
    ```

> **Catatan**: Hasil ini dalam wei, bukan ETH. Wei digunakan sebagai denominasi terkecil dari ether. Konversi dari wei ke ETH adalah 1 eth = 10<sup>18</sup> wei. Jadi jika kita mengonversi 0xde0b6b3a7640000 ke bentuk desimal, kita mendapatkan 1\*10<sup>18</sup> wei, yang setara dengan 1 ETH.

Fiuh! Uang palsu kita semuanya ada di sana.

## Langkah 6: Inisialisasi proyek kita {#initialize-project}

Pertama, kita perlu membuat folder untuk proyek kita. Navigasikan ke barisan perintah dan ketik:

    ```
    mkdir my-nft
    cd my-nft
    ```

Sekarang karena kita ada di dalam folder proyek kita, kita akan menggunakan npm init untuk menginisialisasi proyek. Jika Anda belum menginstal npm, ikuti [instruksi ini](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (kita juga akan memerlukan [Node.js](https://nodejs.org/en/download/), jadi unduh juga!).

    ```
    npm init
    ```

Tidak jadi masalah bagaimana cara Anda menjawab pertanyaan instalasinya, berikut adalah cara kami melakukannya sebagai referensi:

```json
    nama paket: (my-nft)
    versi: (1.0.0)
    deskripsi: NFT pertamaku!
    titik masuk: (index.js)
    perintah tes:
    repositori git:
    kata kunci:
    penulis:
    lisensi: (ISC)
    Akan menulis ke /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "NFT pertamaku!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Kesalahan: tidak ada tes yang ditentukan\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Setujui package.json, dan kita siap untuk beraksi!

## Langkah 7: Instal [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat adalah lingkungan pengembangan untuk mengkompilasi, menyebarkan, menguji, dan men-debug perangkat lunak Ethereum Anda. Ini membantu pengembang saat membangun kontrak pintar dan dapps secara lokal sebelum menyebarkannya ke chain utama.

Di dalam proyek nft ku jalankan:

    ```
    npm install --save-dev hardhat
    ```

Lihat halaman ini untuk detail lebih lanjut tentang [instruksi instalasi](https://hardhat.org/getting-started/#overview).

## Langkah 8: Buat proyek Hardhat {#create-hardhat-project}

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
    👷 Selamat Datang di Hardhat v2.0.11 👷‍
    ? Apa yang ingin Anda lakukan? …
    Buat proyek contoh
    ❯ Buat hardhat.config.js kosong
    Keluar
    ```

Ini akan menghasilkan berkas hardhat.config.js untuk kita yang merupakan tempat di mana kita akan menentukan semua penyiapan untuk proyek kita (pada langkah 13).

## Langkah 9: Tambah folder proyek {#add-project-folders}

Untuk menjaga proyek kita tetap terorganisir, kita akan membuat dua folder baru. Navigasikan ke direktori akar dari proyek Anda dalam barisan perintah dan ketik:

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ adalah tempat di mana kita akan menyimpan kode kontrak pintar NFT kita

- scripts/ adalah tempat di mana kita akan menyimpan skrip untuk menyebarkan dan berinteraksi dengan kontrak pintar kita

## Langkah 10: Tulis kontrak kita {#write-contract}

Sekarang lingkungan kita telah siap, mari beralih ke hal yang lebih menarik: _menulis kode kontrak pintar kita!_

Buka proyek my-nft di editor favorit Anda (kami suka [VSCode](https://code.visualstudio.com/)). Kontrak pintar ditulis dalam bahasa yang disebut Solidity yang akan kami gunakan untuk menulis kontrak pintar MyNFT.sol kami

1. Buka folder `contracts` dan buat file baru bernama MyNFT.sol

2. Di bawah ini adalah kode kontrak pintar NFT kita, yang kita dasarkan pada implementasi ERC-721 dari library [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Salin dan tempelkan konten di bawah ke dalam berkas MyNFT.sol Anda.

   ```solidity
   //Kontrak berdasarkan [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
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

3. Karena kita mewarisi kelas dari library kontrak OpenZeppelin, jalankan `npm install @openzeppelin/contracts^4.0.0` di baris perintah Anda untuk menginstal library ke dalam folder kita.

Jadi, apa sebenarnya yang dilakukan kode ini? Mari kita uraikan, baris per baris.

Di bagian atas kontrak pintar kita, kita mengimpor tiga kelas kontrak pintar [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol berisi implementasi standar ERC-721, yang akan diwarisi oleh kontrak pintar NFT kita. (Untuk menjadi NFT valid, kontrak pintar Anda harus mengimplementasikan semua metode standar ERC-721.) Untuk mempelajari lebih lanjut tentang fungsi ERC-721 yang diwariskan, lihat definisi antarmuka [di sini](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol menyediakan penghitung yang hanya dapat ditambah atau dikurangi sebanyak satu. Kontrak pintar kami menggunakan penghitung untuk melacak jumlah total NFT yang dicetak dan menetapkan ID unik pada NFT baru kami. (Tiap NFT yang dicetak dengan menggunakan kontrak pintar harus diberikan ID unik — di sini ID unik kita hanya ditentukan berdasarkan jumlah total NFT yang ada. Sebagai contoh, NFT pertama yang kita cetak menggunakan kontrak pintar kita memiliki ID "1", NFT kedua kita memiliki ID "2", dst.)

- @openzeppelin/contracts/access/Ownable.sol mengatur [kontrol akses](https://docs.openzeppelin.com/contracts/3.x/access-control) pada kontrak pintar kita, jadi hanya pemilik kontrak pintar (Anda) yang dapat mencetak NFT. (Ingatlah, menyertakan kontrol akses hanya merupakan sebuah preferensi. Jika Anda ingin siapapun dapat mencetak NFT dengan menggunakan kontrak pintar Anda, hapus kata Ownable pada baris 10 dan onlyOwner pada baris 17.)

Setelah kita mengimpor pernyataan, kita memiliki kontrak pintar NFT kustom kita, yang ternyata sangat pendek — hanya terdiri dari sebuah penghitung, sebuah konstruktor, dan fungsi tunggal! Ini berkat kontrak OpenZeppelin yang kita warisi, yang mengimplementasikan sebagian besar metode yang kita butuhkan untuk membuat NFT, seperti `ownerOf` yang mengembalikan pemilik NFT, dan `transferFrom`, yang mentransfer kepemilikan NFT dari satu akun ke akun lain.

Pada konstruktor ERC-721 kita, Anda akan melihat kita melewati 2 string, "MyNFT" dan "NFT." Variabel pertama adalah nama kontrak pintarnya, dan yang kedua adalah simbolnya. Anda dapat menamai setiap variabel tersebut sesuka Anda!

Terakhir, kita memiliki fungsi `mintNFT(address recipient, string memory tokenURI)` yang memungkinkan kita untuk mencetak NFT! Anda dapat melihat fungsi ini memiliki dua variabel:

- `address recipient` menentukan alamat yang akan menerima NFT yang baru Anda cetak

- `string memory tokenURI` adalah string yang harus merujuk ke dokumen JSON yang menjelaskan metadata NFT. Metadata NFT-lah yang menghidupkannya, memungkinkan NFT memiliki properti yang dapat dikonfigurasi, seperti nama, deskripsi, gambar, dan atribut lainnya. Pada bagian 2 dari tutorial ini, kami akan menjelaskan cara mengkonfigurasi metadata tersebut.

`mintNFT` memanggil beberapa metode dari library ERC-721 yang diwariskan, dan pada akhirnya mengembalikan angka yang mewakili ID dari NFT yang baru dicetak.

## Langkah 11: Hubungkan MetaMask & Alchemy ke proyek Anda {#connect-metamask-and-alchemy}

Kini setelah kita membuat dompet MetaMask, akun Alchemy, dan menulis kontrak pintar kita, inilah waktunya menghubungkan ketiganya.

Setiap transaksi yang dikirim dari dompet virtual Anda memerlukan tanda tangan menggunakan kunci pribadi unik Anda. Untuk menyediakan program kita dengan izin ini, kita dapat menyimpan kunci pribadi kita (dan kunci API Alchemy) dengan aman dalam sebuah berkas lingkungan.

Untuk mempelajari lebih lanjut tentang pengiriman transaksi, lihat [tutorial ini](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) tentang mengirim transaksi menggunakan web3.

Pertama-tama, instal paket dotenv ke dalam direktori proyek Anda:

    ```
    npm install dotenv --save
    ```

Kemudian, buat file `.env` di direktori root proyek kita, dan tambahkan kunci pribadi MetaMask dan URL API HTTP Alchemy Anda ke dalamnya.

- Ikuti [instruksi ini](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) untuk mengekspor kunci pribadi Anda dari MetaMask

- Lihat di bawah ini untuk mendapatkan URL API Alchemy HTTP dan menyalinnya ke papan klip Anda

![Salin URL API Alchemy Anda](./copy-alchemy-api-url.gif)

File `.env` Anda sekarang akan terlihat seperti ini:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

Untuk benar-benar menghubungkannya ke kode kita, kita akan mereferensikan variabel-variabel ini di file hardhat.config.js kita pada langkah 13.

<EnvWarningBanner />

## Langkah 12: Instal Ethers.js {#install-ethers}

Ethers.js adalah library yang mempermudah interaksi dan pembuatan permintaan ke Ethereum dengan membungkus [metode JSON-RPC standar](/developers/docs/apis/json-rpc/) dengan metode yang lebih ramah pengguna.

Hardhat membuatnya sangat mudah untuk mengintegrasikan [Plugin](https://hardhat.org/plugins/) untuk tooling tambahan dan fungsionalitas yang diperluas. Kita akan memanfaatkan [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) untuk penyebaran kontrak ([Ethers.js](https://github.com/ethers-io/ethers.js/) memiliki beberapa metode penyebaran kontrak yang sangat rapi).

Dalam direktori proyek Anda, ketik:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

Kita juga memerlukan ethers dalam hardhat.config.js kita di langkah selanjutnya.

## Langkah 13: Perbarui hardhat.config.js {#update-hardhat-config}

Kita sejauh ini telah menambahkan beberapa dependensi dan plugin, kini kita perlu memperbarui hardhat.config.js agar proyek kita mengenali mereka.

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

Untuk memastikan segalanya berjalan baik sejauh ini, mari kita kompilasikan kontrak kita. Tugas untuk mengompilasi merupakan salah satu tugas bawaan hardhat.

Dari barisan perintah jalankan:

    ```
    npx hardhat compile
    ```

Anda mungkin mendapat peringatan mengenai pengenal lisensi SPDX tidak tersedia di berkas sumber, tetapi tidak perlu mengkhawatirkannya — semoga semua yang lainnya berjalan dengan baik! Jika tidak, Anda selalu dapat mengirim pesan di [Discord Alchemy](https://discord.gg/u72VCg3).

## Langkah 15: Tulis skrip penyebaran kita {#write-deploy}

Kini setelah kontrak kita ditulis dan berkas konfigurasi kita siap, inilah waktunya menulis skrip penyebaran kontrak kita.

Buka folder `scripts/` dan buat file baru bernama `deploy.js`, tambahkan konten berikut ke dalamnya:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Mulai penerapan, mengembalikan promise yang me-resolve ke objek kontrak
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Kontrak disebarkan ke alamat:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat melakukan pekerjaan luar biasa dalam menjelaskan apa yang dilakukan setiap baris kode ini di [tutorial Kontrak](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) mereka, kami telah mengadopsi penjelasan mereka di sini.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

ContractFactory di ethers.js adalah abstraksi yang digunakan untuk menyebarkan kontrak pintar baru, jadi MyNFT di sini adalah pabrik untuk instance kontrak NFT kita. Saat menggunakan plugin hardhat-ethers, instance ContractFactory dan Contract terhubung ke penandatangan pertama secara default.

    ```
    const myNFT = await MyNFT.deploy();
    ```

Memanggil deploy() pada ContractFactory akan memulai penyebaran, dan mengembalikan Promise yang menyelesaikan ke Contract. Ini adalah objek yang memiliki metode untuk setiap fungsi kontrak pintar kita.

## Langkah 16: Sebarkan kontrak kita {#deploy-contract}

Akhirnya kita siap untuk menyebarkan kontrak pintar kita! Navigasikan kembali ke akar direktori proyek Anda, dan dalam barisan perintah jalankan:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

Lalu, Anda seharusnya melihat sesuatu seperti ini:

    ```
    Kontrak disebarkan ke alamat: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

Jika kita membuka [Etherscan Sepolia](https://sepolia.etherscan.io/) dan mencari alamat kontrak kita, kita akan dapat melihat bahwa kontrak tersebut telah berhasil disebarkan. Jika Anda tidak langsung melihatnya, harap tunggu sebentar karena mungkin perlu waktu. Transaksi akan terlihat seperti ini:

![Lihat alamat transaksi Anda di Etherscan](./etherscan-sepoila-contract-creation.png)

Alamat From harus cocok dengan alamat akun MetaMask Anda dan alamat To akan bertuliskan “Contract Creation”. Jika kita mengklik transaksi, kita akan melihat akun kontrak kita dalam field To:

![Lihat alamat kontrak Anda di Etherscan](./etherscan-sepolia-tx-details.png)

Yesssss! Anda baru saja menyebarkan kontrak pintar NFT Anda ke chain Ethereum (testnet)!

Untuk memahami apa yang terjadi di balik layar, mari kita buka tab Explorer di [dasbor Alchemy](https://dashboard.alchemyapi.io/explorer) kita. Jika Anda memiliki beberapa aplikasi Alchemy, pastikan memilah berdasarkan aplikasi dan pilih "MyNFT".

![Lihat panggilan yang dibuat “di balik layar” dengan Dasbor Explorer Alchemy](./alchemy-explorer-goerli.png)

Di sini Anda akan melihat beberapa panggilan JSON-RPC yang dibuat Hardhat/Ethers untuk kita saat kita memanggil fungsi .deploy(). Dua hal penting yang perlu disebutkan di sini adalah [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), yang merupakan permintaan untuk benar-benar menulis kontrak pintar kita ke chain Sepolia, dan [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) yang merupakan permintaan untuk membaca informasi tentang transaksi kita berdasarkan hash (pola umum saat mengirim transaksi). Untuk mempelajari lebih lanjut tentang pengiriman transaksi, lihat tutorial tentang [mengirim transaksi menggunakan Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) ini.

Itulah Bagian 1 untuk tutorial ini. Di [Bagian 2, kita akan benar-benar berinteraksi dengan kontrak pintar kita dengan mencetak NFT](/developers/tutorials/how-to-mint-an-nft/), dan di [Bagian 3 kami akan menunjukkan cara melihat NFT Anda di dompet Ethereum Anda](/developers/tutorials/how-to-view-nft-in-metamask/)!
