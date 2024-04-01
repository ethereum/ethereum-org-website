---
title: Sending Transactions Using Web3
description: "This is a beginner friendly guide to sending Ethereum transactions using web3. Ada tiga langkah utama untuk mengirim transaksi ke blockchain Ethereum: buat, tandatangani, dan siarkan. Kita akan membahas ketiganya."
author: "Elan Halpern"
tags:
  - "transaksi"
  - "web3.js"
  - "alchemy"
skill: beginner
lang: id
published: 2020-11-04
source: Dokumen Alchemy
sourceUrl: https://docs.alchemy.com/alchemy/tutorials/sending-txs
---

This is a beginner friendly guide to sending Ethereum transactions using web3. Ada tiga langkah utama untuk mengirim transaksi ke blockchain ethereum: buat, tandatangani, dan siarkan. Kita akan membahas ketiganya, dengan harapan menjawab pertanyaan apa pun yang Anda miliki! In this tutorial, we'll be using [Alchemy](https://www.alchemy.com/) to send our transactions to the Ethereum chain. You can [create a free Alchemy account here](https://auth.alchemyapi.io/signup).

**NOTE:** This guide is for signing your transactions on the _backend_ for your app, if you want to integrate signing your transactions on the frontend, check out integrating [Web3 with a browser provider](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Dasar-Dasar {#the-basics}

Seperti kebanyakan pengembang blockchain ketika mereka baru memulai, Anda mungkin telah melakukan beberapa penelitian tentang bagaimana cara mengirim transaksi (sesuatu yang seharusnya cukup sederhana) dan menemukan banyak panduan, yang masing-masing mengatakan hal-hal yang berbeda dan membuat Anda kewalahan dan bingung. Jika Anda ada di tempat itu, jangan khawatir; kita semua pernah ada di beberapa titik tersebut! Jadi, sebelum kita memulai, mari meluruskan beberapa hal:

### 1\. Alchemy tidak menyimpan kunci privat Anda {#alchemy-does-not-store-your-private-keys}

- Ini berarti bahwa Alchemy tidak dapat menandatangani dan mengirim transaksi mewakili Anda. Alasannya untuk ini bersifat keamanan. Alchemy tidak pernah meminta Anda membagikan kunci privat Anda, dan Anda seharusnya tidak pernah membagikan kunci privat Anda dengan node yang di-host (atau dengan siapa pun dalam hal ini).
- You can read from the blockchain using Alchemy’s core API, but to write to it you’ll need to use something else to sign your transactions before sending them through Alchemy (this is the same for any other [node service](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Apa itu "penandatangan"? {#what-is-a-signer}

- Penandatangan akan menandatangani transaksi untuk Anda dengan menggunakan kunci privat Anda. In this tutorial we’ll be using [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) to sign our transaction, but you could also use any other web3 library.
- Pada bagian frontend, sebuah contoh yang baik dari penandatangan adalah [metamask](https://metamask.io/), yang akan menandatangani dan mengirim transaksi mewakili Anda.

### 3\. Mengapa saya harus menandatangani transaksi saya? {#why-do-i-need-to-sign-my-transactions}

- Setiap pengguna yang ingin mengirim transaksi di jaringan Ethereum harus menandatangani transaksi (menggunakan kunci privat mereka), untuk memvalidasi bahwa asal transaksi sesuai dengan pihak yang diklaimnya.
- Sangat penting untuk melindungi kunci privat ini, karena memiliki akses ke kunci tersebut memberikan kontrol penuh terhadap akun Ethereum Anda, yang memungkinkan Anda (atau siapa pun yang memiliki akses) untuk melakukan transaksi mewakili Anda.

### 4\. Bagaimana cara melindungi kunci privat saya? {#how-do-i-protect-my-private-key}

- Ada banyak cara melindungi kunci privat Anda dan menggunakannya untuk mengirimkan transaksi. Dalam tutorial ini, kita akan menggunakan file .env. Namun, Anda juga dapat menggunakan penyedia terpisah yang menyimpan kunci privat, menggunakan file penyimpanan kunci, atau opsi lainnya.

### 5\. Apa perbedaan antara `eth_sendTransaction` dan `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` dan `eth_sendRawTransaction` keduanya adalah fungsi API Ethereum yang menyiarkan transaksi ke jaringan Ethereum, sehingga transaksi akan ditambahkan ke blok berikutnya. Fungsi ini berbeda dalam cara menangani penandatanganan transaksi.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) digunakan untuk mengirim transaksi _yang belum ditandatangani_, yang berarti node tujuan pengiriman harus mengelola kunci privat Anda agar dapat menandatangani transaksi sebelum menyiarkannya ke rantai. Since Alchemy doesn't hold user's private keys, they do not support this method.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) digunakan untuk menyiarkan transaksi yang telah ditandatangani. Ini berarti pertama-tama Anda harus menggunakan [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), lalu teruskan hasilnya ke `eth_sendRawTransaction`.

Ketika menggunakan web3, `eth_sendRawTransaction` diakses dengan memanggil fungsi [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

This is what we will be using in this tutorial.

### 6\. Apa itu pustaka web3? {#what-is-the-web3-library}

- Web3.js adalah pustaka pembungkus seputar pemanggilan JSON-RPC standar yang cukup umum untuk digunakan dalam pengembangan Ethereum.
- Ada banyak pustaka web3 untuk bahasa pemrograman berbeda. Dalam tutorial ini, kita akan menggunakan [Web3 Alchemy](https://docs.alchemy.com/reference/api-overview) yang ditulis dalam JavaScript. Anda dapat memeriksa opsi lainnya [di sini](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries).

Baiklah, karena kita telah menjawab beberapa pertanyaan, mari kita teruskan ke bagian tutorial. Feel free to ask questions anytime in the Alchemy [discord](https://discord.gg/gWuC7zB)!

**NOTE:** This guide requires an Alchemy account, an Ethereum address or MetaMask wallet, NodeJs, and npm installed. Jika tidak, ikuti langkah-langkah ini:

1.  [Buat akun Alchemy gratis](https://auth.alchemyapi.io/signup)
2.  [Create MetaMask account](https://metamask.io/) (or get an Ethereum address)
3.  [Ikuti langkah-langkah ini untuk menginstal NodeJs dan NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Langkah-Langkah untuk Mengirim Transaksi Anda {#steps-to-sending-your-transaction}

### 1\. Buat aplikasi Alchemy di testnet Rinkeby {#create-an-alchemy-app-on-the-rinkeby-testnet}

Arahkan kursor ke [Dasbor Alchemy](https://dashboard.alchemyapi.io/) Anda dan buat aplikasi baru, yang memilih Rinkeby (atau testnet lain mana pun) untuk jaringan Anda.

### 2\. Meminta ETH dari keran Rinkeby {#request-eth-from-rinkeby-faucet}

Follow the instructions on the [Alchemy Rinkeby faucet](https://www.rinkebyfaucet.com/) to receive ETH. Make sure to include your **Rinkeby** Ethereum address (from MetaMask) and not another network. After following the instructions, double-check that you’ve received the ETH in your wallet.

### 3\. Buat direktori proyek baru dan `cd` di dalamnya {#create-a-new-project-direction}

Buat direktori proyek baru dari baris perintah (terminal untuk mac) dan arahkan kursor ke sana:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Instal Web3 Alchemy (atau pustaka web3 mana pun) {#install-alchemy-web3}

Jalankan perintah berikut dalam direktori proyek Anda untuk menginstal [Web3 Alchemy](https://docs.alchemy.com/reference/api-overview):

```
npm install @alch/alchemy-web3
```

### 5\. Instal dotenv {#install-dotenv}

Kita akan menggunakan file .env untuk menyimpan kunci API dan kunci privat kita dengan aman.

```
npm install dotenv --save
```

### 6\. Buat file .env {#create-the-dotenv-file}

Create a `.env` file in your project directory and add the following (replacing “`your-api-url`" and "`your-private-key`")

- Untuk menemukan URL API Alchemy Anda, arahkan kursor ke halaman detail aplikasi yang baru saja Anda buat di dasbor, klik "View Key" di pojok kanan atas, dan dapatkan URL HTTP.
- To find your private key using MetaMask, check out this [guide](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<InfoBanner isWarning>
Don't commit <code>.env</code>! Please make sure never to share or expose your <code>.env</code> file with anyone, as you are compromising your secrets in doing so. If you are using version control, add your <code>.env</code> to a <a href="https://git-scm.com/docs/gitignore">gitignore</a> file.
</InfoBanner>

### 7\. Buat file `sendTx.js` {#create-sendtx-js}

Hebat, karena sekarang kita memiliki data sensitif yang dilindungi di file .env, mari mulai pengodean. Untuk contoh pengiriman transaksi, kita akan mengirimkan ETH kembali ke keran Rinkeby.

Buat file `sendTx.js`, yang merupakan tempat di mana kita akan mengonfigurasi dan mengirim transaksi percontohan kita, dan menambahkan baris kode berikut ini ke dalamnya:

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

Be sure to replace the address on **line 6** with your own public address.

Now, before we jump into running this code, let's talk about some of the components here.

- `nonce`: Spesifikasi nonce digunakan untuk melacak jumlah transaksi yang dikirim dari alamat Anda. Kita memerlukan ini untuk alasan keamanan dan untuk mencegah [serangan pemutaran ulang](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Untuk mendapatkan jumlah transaksi yang dikirim dari alamat Anda, kita menggunakan [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: Objek transaksi memiliki beberapa aspek yang perlu kita tetapkan
  - `to`: Ini adalah alamat ke mana kita ingin mengirimkan ETH. Dalam kasus ini, kita mengirimkan ETH kembali ke [keran Rinkeby](https://faucet.rinkeby.io/) yang darinya kita meminta eth sebelumnya.
  - `value`: Ini adalah jumlah yang ingin kita kirimkan, yang ditetapkan dalam wei di mana 10^18 wei = 1 ETH
  - `gas`: Ada banyak cara untuk menetapkan jumlah gas yang tepat untuk dimasukkan ke dalam transaksi Anda. Alchemy bahkan memiliki [webhook harga gas](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) untuk memberi tahu Anda ketika harga gas turun dalam ambang batas tertentu. For Mainnet transactions, it's good practice to check a gas estimator like [ETH Gas Station](https://ethgasstation.info/) to determine the right amount of gas to include. 21000 adalah jumlah gas minimum yang akan dipakai untuk sebuah operasi di Ethereum, sehingga untuk memastikan transaksi kita akan dieksekusi, kita menyiapkan 30000 di sini.
  - `nonce`: lihat definisi nonce di atas. Nonce memulai penghitungan dari nol.
  - [OPTIONAL] data: Used for sending additional information with your transfer, or calling a smart contract, not required for balance transfers, check out the note below.
- `signedTx`: Untuk menandatangani objek transaksi, kita akan menggunakan metode `signTransaction` dengan `PRIVATE_KEY` kita
- `sendSignedTransaction`: Setelah kita memiliki transaksi yang ditandatangani, kita dapat mengirimnya untuk dimasukkan ke dalam blok berikutnya dengan menggunakan `sendSignedTransaction`

**A Note on data** There are a two main types of transactions that can be sent in Ethereum.

- Balance transfer: Send eth from one address to another. No data field required, however, if you'd like to send additional information alongside your transaction, you can include that information in HEX format in this field.
  - For example, let's say we wanted to write the hash of an IPFS document to the ethereum chain in order to give it an immutable timestamp. Our data field should then look like data: web3.utils.toHex(‘IPFS hash‘). And now anyone can query the chain and see when that document was added.
- Smart contact transaction: Execute some smart contract code on the chain. In this case, the data field should contain the smart function you wish to execute, alongside any parameters.
  - For a practical example, check out Step 8 in this [Hello World Tutorial](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8\. Jalankan kode dengan menggunakan `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Arahkan kursor kembali ke terminal atau baris perintah dan jalankan:

```
node sendTx.js
```

### 9\. Lihat transaksi Anda di Mempool {#see-your-transaction-in-the-mempool}

Buka [halaman Mempool](https://dashboard.alchemyapi.io/mempool) di dasbor Alchemy Anda dan filter berdasarkan aplikasi yang Anda buat untuk menemukan transaksi Anda. Inilah tempat di mana kita dapat melihat transisi transaksi kita dari status menunggu hingga status ditambang (jika berhasil) atau status dibatalkan jika tidak berhasil. Pastikan untuk memilih "Semua" sehingga Anda melihat kategori transaksi "ditambang", "menunggu", dan "dibatalkan". Anda juga dapat mencari transaksi Anda dengan mencari transaksi yang dikirim ke alamat `0x31b98d14007bdee637298086988a0bbd31184523`.

Untuk melihat detail transaksi Anda setelah Anda menemukannya, pilih hash tx, yang seharusnya membawa Anda melihat tampilan seperti ini:

![Tangkapan layar penonton di Mempool](./mempool.png)

Dari sana Anda dapat melihat transaksi Anda di Etherscan dengan mengklik ikon yang dilingkari dalam warna merah!

**Yeiiiiii! Anda baru saja mengirim transaksi Ethereum pertama Anda dengan menggunakan Alchemy 🎉**

_Untuk memberikan umpan balik dan saran mengenai panduan ini, silakan kirimkan pesan ke Elan di [Discord](https://discord.gg/A39JVCM) Alchemy!_

_Dipublikasikan pertama kali di [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
