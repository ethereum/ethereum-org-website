---
title: Mengirim Transaksi Menggunakan Web3
description: "Ini adalah panduan ramah pemula untuk mengirim transaksi Ethereum menggunakan Web3. Ada tiga langkah utama untuk mengirim transaksi ke blockchain Ethereum: membuat, menandatangani, dan menyiarkan. Kita akan membahas ketiganya."
author: "Elan Halpern"
tags: ["transaksi", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: "Kirim transaksi"
lang: id
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Ini adalah panduan ramah pemula untuk mengirim transaksi Ethereum menggunakan Web3. Ada tiga langkah utama untuk mengirim transaksi ke blockchain Ethereum: membuat, menandatangani, dan menyiarkan. Kita akan membahas ketiganya, dan semoga dapat menjawab pertanyaan apa pun yang mungkin Anda miliki! Dalam tutorial ini, kita akan menggunakan [Alchemy](https://www.alchemy.com/) untuk mengirim transaksi kita ke rantai Ethereum. Anda dapat [membuat akun Alchemy gratis di sini](https://auth.alchemyapi.io/signup).

**CATATAN:** Panduan ini adalah untuk menandatangani transaksi Anda di _backend_ untuk aplikasi Anda. Jika Anda ingin mengintegrasikan penandatanganan transaksi Anda di frontend, lihat integrasi [Web3 dengan penyedia peramban](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Dasar-dasar {#the-basics}

Seperti kebanyakan pengembang blockchain saat pertama kali memulai, Anda mungkin telah melakukan riset tentang cara mengirim transaksi (sesuatu yang seharusnya cukup sederhana) dan menemukan banyak panduan, yang masing-masing mengatakan hal yang berbeda dan membuat Anda sedikit kewalahan dan bingung. Jika Anda berada di posisi itu, jangan khawatir; kita semua pernah mengalaminya! Jadi, sebelum kita mulai, mari kita luruskan beberapa hal:

### 1\. Alchemy tidak menyimpan kunci pribadi Anda {#alchemy-does-not-store-your-private-keys}

- Ini berarti Alchemy tidak dapat menandatangani dan mengirim transaksi atas nama Anda. Alasannya adalah untuk tujuan keamanan. Alchemy tidak akan pernah meminta Anda untuk membagikan kunci pribadi Anda, dan Anda tidak boleh membagikan kunci pribadi Anda dengan node yang di-host (atau siapa pun dalam hal ini).
- Anda dapat membaca dari blockchain menggunakan API inti Alchemy, tetapi untuk menulis ke dalamnya, Anda perlu menggunakan sesuatu yang lain untuk menandatangani transaksi Anda sebelum mengirimkannya melalui Alchemy (ini sama untuk [layanan node](/developers/docs/nodes-and-clients/nodes-as-a-service/) lainnya).

### 2\. Apa itu "penandatangan" (signer)? {#what-is-a-signer}

- Penandatangan akan menandatangani transaksi untuk Anda menggunakan kunci pribadi Anda. Dalam tutorial ini kita akan menggunakan [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) untuk menandatangani transaksi kita, tetapi Anda juga dapat menggunakan pustaka web3 lainnya.
- Di frontend, contoh penandatangan yang baik adalah [MetaMask](https://metamask.io/), yang akan menandatangani dan mengirim transaksi atas nama Anda.

### 3\. Mengapa saya perlu menandatangani transaksi saya? {#why-do-i-need-to-sign-my-transactions}

- Setiap pengguna yang ingin mengirim transaksi di jaringan Ethereum harus menandatangani transaksi tersebut (menggunakan kunci pribadi mereka), untuk memvalidasi bahwa asal transaksi adalah benar seperti yang diklaimnya.
- Sangat penting untuk melindungi kunci pribadi ini, karena memiliki akses ke sana memberikan kendali penuh atas akun Ethereum Anda, memungkinkan Anda (atau siapa pun yang memiliki akses) untuk melakukan transaksi atas nama Anda.

### 4\. Bagaimana cara melindungi kunci pribadi saya? {#how-do-i-protect-my-private-key}

- Ada banyak cara untuk melindungi kunci pribadi Anda dan menggunakannya untuk mengirim transaksi. Dalam tutorial ini kita akan menggunakan file `.env`. Namun, Anda juga dapat menggunakan penyedia terpisah yang menyimpan kunci pribadi, menggunakan file keystore, atau opsi lainnya.

### 5\. Apa perbedaan antara `eth_sendTransaction` dan `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` dan `eth_sendRawTransaction` keduanya adalah fungsi API Ethereum yang menyiarkan transaksi ke jaringan Ethereum sehingga akan ditambahkan ke blok di masa mendatang. Keduanya berbeda dalam cara menangani penandatanganan transaksi.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) digunakan untuk mengirim transaksi yang _belum ditandatangani_, yang berarti node yang Anda kirimi harus mengelola kunci pribadi Anda sehingga dapat menandatangani transaksi sebelum menyiarkannya ke rantai. Karena Alchemy tidak menyimpan kunci pribadi pengguna, mereka tidak mendukung metode ini.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) digunakan untuk menyiarkan transaksi yang sudah ditandatangani. Ini berarti Anda pertama-tama harus menggunakan [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), lalu meneruskan hasilnya ke `eth_sendRawTransaction`.

Saat menggunakan web3, `eth_sendRawTransaction` diakses dengan memanggil fungsi [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Inilah yang akan kita gunakan dalam tutorial ini.

### 6\. Apa itu pustaka web3? {#what-is-the-web3-library}

- Web3.js adalah pustaka pembungkus di sekitar panggilan JSON-RPC standar yang cukup umum digunakan dalam pengembangan Ethereum.
- Ada banyak pustaka web3 untuk berbagai bahasa. Dalam tutorial ini kita akan menggunakan [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) yang ditulis dalam JavaScript. Anda dapat melihat opsi lain [di sini](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) seperti [ethers.js](https://docs.ethers.org/v5/).

Oke, sekarang setelah kita menyelesaikan beberapa pertanyaan ini, mari kita lanjutkan ke tutorial. Jangan ragu untuk mengajukan pertanyaan kapan saja di [discord](https://discord.gg/gWuC7zB) Alchemy!

### 7\. Bagaimana cara mengirim transaksi yang aman, dioptimalkan gasnya, dan privat? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy memiliki serangkaian API Transact](https://docs.alchemy.com/reference/transact-api-quickstart). Anda dapat menggunakannya untuk mengirim transaksi yang diperkuat, mensimulasikan transaksi sebelum terjadi, mengirim transaksi privat, dan mengirim transaksi yang dioptimalkan gasnya.
- Anda juga dapat menggunakan [Notify API](https://docs.alchemy.com/docs/alchemy-notify) untuk mendapatkan peringatan saat transaksi Anda ditarik dari mempool dan ditambahkan ke rantai.

**CATATAN:** Panduan ini memerlukan akun Alchemy, alamat Ethereum atau dompet MetaMask, NodeJs, dan npm yang terinstal. Jika belum, ikuti langkah-langkah berikut:

1.  [Buat akun Alchemy gratis](https://auth.alchemyapi.io/signup)
2.  [Buat akun MetaMask](https://metamask.io/) (atau dapatkan alamat Ethereum)
3.  [Ikuti langkah-langkah ini untuk menginstal NodeJs dan NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Langkah-langkah untuk Mengirim Transaksi Anda {#steps-to-sending-your-transaction}

### 1\. Buat aplikasi Alchemy di testnet Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Navigasikan ke [Dasbor Alchemy](https://dashboard.alchemyapi.io/) Anda dan buat aplikasi baru, pilih Sepolia (atau testnet lainnya) untuk jaringan Anda.

### 2\. Minta ETH dari faucet Sepolia {#request-eth-from-sepolia-faucet}

Ikuti instruksi di [faucet Sepolia Alchemy](https://www.sepoliafaucet.com/) untuk menerima ETH. Pastikan untuk menyertakan alamat Ethereum **Sepolia** Anda (dari MetaMask) dan bukan jaringan lain. Setelah mengikuti instruksi, periksa kembali apakah Anda telah menerima ETH di dompet Anda.

### 3\. Buat direktori proyek baru dan `cd` ke dalamnya {#create-a-new-project-direction}

Buat direktori proyek baru dari baris perintah (terminal untuk mac) dan navigasikan ke dalamnya:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Instal Alchemy Web3 (atau pustaka web3 apa pun) {#install-alchemy-web3}

Jalankan perintah berikut di direktori proyek Anda untuk menginstal [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

Catatan, jika Anda ingin menggunakan pustaka ethers.js, [ikuti instruksinya di sini](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Instal dotenv {#install-dotenv}

Kita akan menggunakan file `.env` untuk menyimpan kunci API dan kunci pribadi kita dengan aman.

```
npm install dotenv --save
```

### 6\. Buat file `.env` {#create-the-dotenv-file}

Buat file `.env` di direktori proyek Anda dan tambahkan yang berikut ini (ganti "`your-api-url`" dan "`your-private-key`")

- Untuk menemukan URL API Alchemy Anda, navigasikan ke halaman detail aplikasi dari aplikasi yang baru saja Anda buat di dasbor Anda, klik "View Key" di sudut kanan atas, dan ambil URL HTTP-nya.
- Untuk menemukan kunci pribadi Anda menggunakan MetaMask, lihat [panduan](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) ini.

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Jangan commit <code>.env</code>! Pastikan untuk tidak pernah membagikan atau mengekspos file <code>.env</code> Anda kepada siapa pun, karena Anda membahayakan rahasia Anda dengan melakukannya. Jika Anda menggunakan kontrol versi, tambahkan <code>.env</code> Anda ke file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Buat file `sendTx.js` {#create-sendtx-js}

Bagus, sekarang setelah data sensitif kita dilindungi dalam file `.env`, mari kita mulai membuat kode. Untuk contoh pengiriman transaksi kita, kita akan mengirimkan ETH kembali ke faucet Sepolia.

Buat file `sendTx.js`, yang merupakan tempat kita akan mengonfigurasi dan mengirim contoh transaksi kita, dan tambahkan baris kode berikut ke dalamnya:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: replace this address with your own public address

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // faucet address to return eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

Pastikan untuk mengganti alamat pada **baris 6** dengan alamat publik Anda sendiri.

Sekarang, sebelum kita melompat ke menjalankan kode ini, mari kita bicarakan tentang beberapa komponen di sini.

- `nonce` : Spesifikasi nonce digunakan untuk melacak jumlah transaksi yang dikirim dari alamat Anda. Kita membutuhkan ini untuk tujuan keamanan dan untuk mencegah [serangan replay](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Untuk mendapatkan jumlah transaksi yang dikirim dari alamat Anda, kita menggunakan [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: Objek transaksi memiliki beberapa aspek yang perlu kita tentukan
  - `to`: Ini adalah alamat tujuan pengiriman ETH. Dalam hal ini, kita mengirimkan ETH kembali ke [faucet Sepolia](https://sepoliafaucet.com/) tempat kita meminta sebelumnya.
  - `value`: Ini adalah jumlah yang ingin kita kirim, ditentukan dalam Wei di mana 10^18 Wei = 1 ETH
  - `gas`: Ada banyak cara untuk menentukan jumlah gas yang tepat untuk disertakan dengan transaksi Anda. Alchemy bahkan memiliki [webhook harga gas](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) untuk memberi tahu Anda saat harga gas turun dalam ambang batas tertentu. Untuk transaksi Mainnet, merupakan praktik yang baik untuk memeriksa pengestimasi gas seperti [ETH Gas Station](https://ethgasstation.info/) untuk menentukan jumlah gas yang tepat untuk disertakan. 21000 adalah jumlah minimum gas yang akan digunakan oleh operasi di Ethereum, jadi untuk memastikan transaksi kita akan dieksekusi, kita menaruh 30000 di sini.
  - `nonce`: lihat definisi nonce di atas. Nonce mulai menghitung dari nol.
  - [OPSIONAL] data: Digunakan untuk mengirim informasi tambahan dengan transfer Anda, atau memanggil kontrak pintar, tidak diperlukan untuk transfer saldo, lihat catatan di bawah ini.
- `signedTx`: Untuk menandatangani objek transaksi kita, kita akan menggunakan metode `signTransaction` dengan `PRIVATE_KEY` kita
- `sendSignedTransaction`: Setelah kita memiliki transaksi yang ditandatangani, kita dapat mengirimkannya untuk disertakan dalam blok berikutnya dengan menggunakan `sendSignedTransaction`

**Catatan tentang data**
Ada dua jenis utama transaksi yang dapat dikirim di Ethereum.

- Transfer saldo: Mengirim ETH dari satu alamat ke alamat lain. Tidak ada bidang data yang diperlukan, namun, jika Anda ingin mengirim informasi tambahan bersama transaksi Anda, Anda dapat menyertakan informasi tersebut dalam format HEX di bidang ini.
  - Misalnya, katakanlah kita ingin menulis hash dari dokumen IPFS ke rantai Ethereum untuk memberikannya stempel waktu yang tetap. Bidang data kita kemudian akan terlihat seperti data: `web3.utils.toHex(‘IPFS hash‘)`. Dan sekarang siapa pun dapat menanyakan rantai dan melihat kapan dokumen itu ditambahkan.
- Transaksi kontrak pintar: Mengeksekusi beberapa kode kontrak pintar di rantai. Dalam hal ini, bidang data harus berisi fungsi pintar yang ingin Anda eksekusi, bersama dengan parameter apa pun.
  - Untuk contoh praktis, lihat Langkah 8 dalam [Tutorial Hello World](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction) ini.

### 8\. Jalankan kode menggunakan `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Navigasikan kembali ke terminal atau baris perintah Anda dan jalankan:

```
node sendTx.js
```

### 9\. Lihat transaksi Anda di Mempool {#see-your-transaction-in-the-mempool}

Buka [halaman Mempool](https://dashboard.alchemyapi.io/mempool) di dasbor Alchemy Anda dan filter berdasarkan aplikasi yang Anda buat untuk menemukan transaksi Anda. Di sinilah kita dapat melihat transisi transaksi kita dari status tertunda (pending) ke status ditambang (mined) (jika berhasil) atau status dibatalkan (dropped) jika tidak berhasil. Pastikan untuk tetap pada "All" sehingga Anda menangkap transaksi "mined", "pending", dan "dropped". Anda juga dapat mencari transaksi Anda dengan mencari transaksi yang dikirim ke alamat `0x31b98d14007bdee637298086988a0bbd31184523` .

Untuk melihat detail transaksi Anda setelah Anda menemukannya, pilih hash tx, yang akan membawa Anda ke tampilan yang terlihat seperti ini:

![Mempool watcher screenshot](./mempool.png)

Dari sana Anda dapat melihat transaksi Anda di Etherscan dengan mengklik ikon yang dilingkari merah!

**Yippieeee! Anda baru saja mengirim transaksi Ethereum pertama Anda menggunakan Alchemy 🎉**

_Untuk umpan balik dan saran tentang panduan ini, silakan kirim pesan ke Elan di [Discord](https://discord.gg/A39JVCM) Alchemy!_

_Awalnya diterbitkan di [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_