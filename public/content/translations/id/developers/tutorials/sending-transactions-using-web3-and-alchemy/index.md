---
title: Mengirim Transaksi Menggunakan Viem
description: "Ini adalah panduan ramah pemula untuk mengirim transaksi Ethereum menggunakan pustaka Viem. Ada tiga langkah utama untuk mengirim transaksi ke rantai blok Ethereum: membuat, menandatangani, dan menyiarkan. Kita akan membahas ketiganya."
author: "Elan Halpern"
tags: ["transaksi", "Viem", "Alchemy"]
skill: beginner
breadcrumb: Kirim transaksi
lang: id
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Ini adalah panduan ramah pemula untuk mengirim transaksi Ethereum menggunakan pustaka [Viem](https://viem.sh/). Ada tiga langkah utama untuk mengirim transaksi ke rantai blok Ethereum: membuat, menandatangani, dan menyiarkan. Kita akan membahas ketiganya, dan semoga dapat menjawab pertanyaan apa pun yang mungkin Anda miliki! Dalam tutorial ini, kita akan menggunakan [Alchemy](https://www.alchemy.com/) untuk mengirim transaksi kita ke rantai Ethereum. Anda dapat [membuat akun Alchemy gratis di sini](https://auth.alchemy.com/signup).

**CATATAN:** Panduan ini adalah untuk menandatangani transaksi Anda di _backend_ untuk aplikasi Anda. Jika Anda ingin mengintegrasikan penandatanganan transaksi Anda di frontend, lihat [API penyedia MetaMask](https://docs.metamask.io/wallet/reference/provider-api/).

## Dasar-dasar {#the-basics}

Seperti kebanyakan pengembang rantai blok saat pertama kali memulai, Anda mungkin telah melakukan riset tentang cara mengirim transaksi (sesuatu yang seharusnya cukup sederhana) dan menemukan banyak sekali panduan, yang masing-masing mengatakan hal yang berbeda dan membuat Anda sedikit kewalahan dan bingung. Jika Anda berada di posisi itu, jangan khawatir; kita semua pernah mengalaminya! Jadi, sebelum kita mulai, mari kita luruskan beberapa hal:

### 1\. Alchemy tidak menyimpan kunci privat Anda {#alchemy-does-not-store-your-private-keys}

- Ini berarti bahwa Alchemy tidak dapat menandatangani dan mengirim transaksi atas nama Anda. Alasannya adalah untuk tujuan keamanan. Alchemy tidak akan pernah meminta Anda untuk membagikan kunci privat Anda, dan Anda tidak boleh membagikan kunci privat Anda dengan node yang di-host (atau siapa pun dalam hal ini).
- Anda dapat membaca dari rantai blok menggunakan API inti Alchemy, tetapi untuk menulis ke dalamnya, Anda harus menggunakan sesuatu yang lain untuk menandatangani transaksi Anda sebelum mengirimkannya melalui Alchemy (ini sama untuk [layanan node](/developers/docs/nodes-and-clients/nodes-as-a-service/) lainnya).

### 2\. Apa itu "penandatangan" (signer)? {#what-is-a-signer}

- Penandatangan akan menandatangani transaksi untuk Anda menggunakan kunci privat Anda. Dalam tutorial ini kita akan menggunakan [Viem](https://viem.sh/) untuk menandatangani transaksi kita, tetapi Anda juga dapat menggunakan pustaka Web3 lainnya.
- Di frontend, contoh penandatangan yang baik adalah [MetaMask](https://metamask.io/), yang akan menandatangani dan mengirim transaksi atas nama Anda.

### 3\. Mengapa saya perlu menandatangani transaksi saya? {#why-do-i-need-to-sign-my-transactions}

- Setiap pengguna yang ingin mengirim transaksi di jaringan Ethereum harus menandatangani transaksi tersebut (menggunakan kunci privat mereka), untuk memvalidasi bahwa asal transaksi adalah benar seperti yang diklaimnya.
- Sangat penting untuk melindungi kunci privat ini, karena memiliki akses ke sana memberikan kendali penuh atas akun Ethereum Anda, yang memungkinkan Anda (atau siapa pun yang memiliki akses) untuk melakukan transaksi atas nama Anda.

### 4\. Bagaimana cara melindungi kunci privat saya? {#how-do-i-protect-my-private-key}

- Ada banyak cara untuk melindungi kunci privat Anda dan menggunakannya untuk mengirim transaksi. Dalam tutorial ini kita akan menggunakan file `.env`. Namun, Anda juga dapat menggunakan penyedia terpisah yang menyimpan kunci privat, menggunakan file penyimpanan kunci, atau opsi lainnya.

### 5\. Apa perbedaan antara `eth_sendTransaction` dan `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` dan `eth_sendRawTransaction` keduanya adalah fungsi API Ethereum yang menyiarkan transaksi ke jaringan Ethereum sehingga akan ditambahkan ke blok di masa mendatang. Keduanya berbeda dalam cara menangani penandatanganan transaksi.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) digunakan untuk mengirim transaksi yang _belum ditandatangani_, yang berarti node tujuan pengiriman Anda harus mengelola kunci privat Anda sehingga dapat menandatangani transaksi sebelum menyiarkannya ke rantai. Karena Alchemy tidak menyimpan kunci privat pengguna, mereka tidak mendukung metode ini.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) digunakan untuk menyiarkan transaksi yang telah ditandatangani. Ini berarti Anda harus terlebih dahulu menandatangani transaksi dengan kunci privat Anda (di Viem, menggunakan [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) dengan [akun lokal](https://viem.sh/docs/accounts/local/privateKeyToAccount)), lalu meneruskan hasilnya ke `eth_sendRawTransaction`.

Saat menggunakan Viem, `eth_sendRawTransaction` diakses dengan memanggil fungsi [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction).

Inilah yang akan kita gunakan dalam tutorial ini.

### 6\. Apa itu pustaka Web3? {#what-is-the-web3-library}

- Pustaka Web3 adalah pembungkus (wrapper) di sekitar [panggilan JSON-RPC](/developers/docs/apis/json-rpc/) standar yang cukup umum digunakan dalam pengembangan Ethereum.
- Ada banyak pustaka Web3 untuk berbagai bahasa. Dalam tutorial ini kita akan menggunakan [Viem](https://viem.sh/), yang ditulis dalam TypeScript dan berfungsi di proyek JavaScript apa pun. Anda dapat memeriksa opsi lain [di sini](/developers/docs/apis/javascript/) seperti [Ethers.js](https://docs.ethers.org/v6/).

Oke, sekarang setelah kita menyelesaikan beberapa pertanyaan ini, mari kita lanjutkan ke tutorial. Jangan ragu untuk mengajukan pertanyaan kapan saja di [Discord](https://discord.gg/gWuC7zB) Alchemy!

### 7\. Bagaimana cara mengirim transaksi yang aman, dioptimalkan gasnya, dan privat? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy memiliki serangkaian sumber daya transaksi](https://www.alchemy.com/docs/sending-transactions). Anda dapat menggunakannya untuk mengirim transaksi, mensimulasikan transaksi sebelum terjadi, mengirim transaksi privat, dan mengirim transaksi yang dioptimalkan penggunaan gasnya
- Anda juga dapat menggunakan [webhook Alchemy](https://www.alchemy.com/docs/reference/webhooks-overview) untuk mendapatkan peringatan saat transaksi Anda ditarik dari mempool dan ditambahkan ke rantai

**CATATAN:** Panduan ini memerlukan akun Alchemy, alamat Ethereum atau dompet MetaMask, Node.js, dan npm yang telah diinstal. Jika belum, ikuti langkah-langkah berikut:

1.  [Buat akun Alchemy gratis](https://auth.alchemy.com/signup)
2.  [Buat akun MetaMask](https://metamask.io/) (atau dapatkan alamat Ethereum)
3.  [Instal Node.js dan npm](https://nodejs.org/en/download/)
## Langkah-langkah untuk Mengirim Transaksi Anda {#steps-to-sending-your-transaction}

### 1\. Buat aplikasi Alchemy di testnet Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Navigasikan ke [Dasbor Alchemy](https://dashboard.alchemy.com/) Anda dan buat aplikasi baru, pilih Sepolia (atau testnet lainnya) untuk jaringan Anda.

### 2\. Minta ETH dari faucet Sepolia {#request-eth-from-sepolia-faucet}

Ikuti instruksi di [faucet Sepolia Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) untuk menerima ETH, atau gunakan salah satu [faucet Sepolia](/developers/docs/networks/#sepolia) lainnya. Faucet memberikan jumlah kecil (faucet Alchemy memberikan 0,1 ETH per hari), yang mana sudah cukup untuk tutorial ini. Pastikan untuk menyertakan alamat Ethereum **Sepolia** Anda (dari MetaMask) dan bukan jaringan lain. Setelah mengikuti instruksi, periksa kembali apakah Anda telah menerima ETH di dompet Anda.

### 3\. Buat direktori proyek baru dan `cd` ke dalamnya {#create-a-new-project-direction}

Buat direktori proyek baru dari baris perintah (terminal untuk Mac) dan navigasikan ke dalamnya:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Instal Viem (atau pustaka Web3 apa pun) {#install-alchemy-web3}

Jalankan perintah berikut di direktori proyek Anda untuk menginstal [Viem](https://viem.sh/):

Catatan, jika Anda ingin menggunakan pustaka Ethers.js, [ikuti instruksinya di sini](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. Instal dotenv {#install-dotenv}

Kita akan menggunakan file `.env` untuk menyimpan kunci API dan kunci privat kita dengan aman.

```
npm install dotenv --save
```

### 6\. Buat file `.env` {#create-the-dotenv-file}

Buat file `.env` di direktori proyek Anda dan tambahkan yang berikut ini (ganti "`your-api-url`" dan "`your-private-key`")

- Untuk menemukan URL API Alchemy Anda, navigasikan ke halaman detail aplikasi dari aplikasi yang baru saja Anda buat di dasbor Anda, klik "View Key" di sudut kanan atas, dan ambil URL HTTP-nya.
- Untuk menemukan kunci privat Anda menggunakan MetaMask, lihat [panduan](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) ini. Gunakan akun yang hanya menyimpan ETH testnet.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Jangan commit <code>.env</code>! Pastikan untuk tidak pernah membagikan atau mengekspos file <code>.env</code> Anda kepada siapa pun, karena Anda membahayakan rahasia Anda dengan melakukannya. Jika Anda menggunakan kontrol versi, tambahkan <code>.env</code> Anda ke file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Buat file `sendTx.js` {#create-sendtx-js}

Bagus, sekarang setelah data sensitif kita dilindungi dalam file `.env`, mari kita mulai membuat kode. Untuk contoh pengiriman transaksi kita, kita akan mengirim 0,001 ETH ke alamat lain yang Anda kendalikan, seperti akun kedua di MetaMask.

Buat file `sendTx.js`, yang merupakan tempat kita akan mengonfigurasi dan mengirim contoh transaksi kita, dan tambahkan baris kode berikut ke dalamnya:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // nonce mulai dihitung dari 0

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: ganti dengan alamat yang ingin Anda kirimi ETH
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // kolom data opsional untuk mengirim pesan atau mengeksekusi kontrak pintar
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

Pastikan untuk mengganti `0xYourSecondAddress` dengan alamat tujuan pengiriman ETH Anda. Skrip ini memperoleh alamat (pengirim) Anda sendiri dari `PRIVATE_KEY`, jadi Anda tidak perlu memasukkannya.

Sekarang, sebelum kita mulai menjalankan kode ini, mari kita bahas beberapa komponen di sini.

- `account`: Akun lokal yang dibuat dari kunci privat Anda dengan [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount). Penandatanganan terjadi di mesin Anda, dan kunci privat tidak pernah dikirim ke Alchemy.
- `publicClient` dan `walletClient`: klien Viem yang mengirim permintaan JSON-RPC ke URL Alchemy Anda. Klien publik membaca dari rantai, dan klien dompet menyiapkan dan menandatangani transaksi untuk akun Anda.
- `nonce` : Spesifikasi nonce digunakan untuk melacak jumlah transaksi yang dikirim dari alamat Anda. Kita memerlukan ini untuk tujuan keamanan dan untuk mencegah serangan pemutaran ulang (replay attack). Untuk mendapatkan jumlah transaksi yang dikirim dari alamat Anda, kita menggunakan [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). Viem juga akan mengisinya untuk Anda, tetapi kita mengambilnya secara eksplisit di sini untuk menunjukkan dari mana asalnya.
- `transaction`: Objek transaksi memiliki beberapa aspek yang perlu kita tentukan. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) mengisi sisanya untuk kita, termasuk `chainId` dan bidang biaya [EIP-1559](/developers/docs/gas/) `maxFeePerGas` dan `maxPriorityFeePerGas`, berdasarkan kondisi jaringan saat ini
  - `to`: Ini adalah alamat tujuan pengiriman ETH kita.
  - `value`: Ini adalah jumlah yang ingin kita kirim, ditentukan dalam Wei di mana 10^18 Wei = 1 ETH. [`parseEther`](https://viem.sh/docs/utilities/parseEther) mengonversi jumlah ETH ke Wei untuk kita. Akun Anda membutuhkan sedikit lebih banyak dari ini, karena ia juga membayar gas
  - `gas`: Ada banyak cara untuk menentukan jumlah gas yang tepat untuk disertakan dengan transaksi Anda. Alchemy mendukung [webhook](https://www.alchemy.com/docs/reference/webhooks-overview) yang dapat memberi tahu Anda tentang aktivitas onchain. Untuk transaksi Mainnet, merupakan praktik yang baik untuk memeriksa kondisi gas saat ini guna menentukan jumlah gas yang tepat untuk disertakan. Transfer ETH biasa ke alamat biasa selalu menggunakan tepat 21000 gas, yang merupakan jumlah minimum untuk transaksi apa pun, jadi kita menaruh 21000 di sini. Jika Anda mengosongkan `gas`, Viem akan memperkirakannya untuk Anda.
  - `nonce`: lihat definisi nonce di atas. Nonce mulai menghitung dari nol.
  - [OPSIONAL] data: Digunakan untuk mengirim informasi tambahan dengan transfer Anda, atau memanggil kontrak pintar, tidak diperlukan untuk transfer saldo, lihat catatan di bawah.
- `signedTx`: Untuk menandatangani objek transaksi kita, kita akan menggunakan metode `signTransaction`, yang menandatanganinya secara lokal dengan akun yang dibuat dari `PRIVATE_KEY` kita
- `sendRawTransaction`: Setelah kita memiliki transaksi yang ditandatangani, kita dapat mengirimkannya untuk disertakan dalam blok berikutnya dengan menggunakan `sendRawTransaction`, yang memanggil `eth_sendRawTransaction`
- `waitForTransactionReceipt`: Menunggu hingga transaksi disertakan dalam blok dan mengembalikan tanda terimanya

**Catatan tentang data**
Ada dua jenis utama transaksi yang dapat dikirim di Ethereum.

- Transfer saldo: Mengirim ETH dari satu alamat ke alamat lain. Tidak diperlukan bidang data, namun, jika Anda ingin mengirim informasi tambahan di samping transaksi Anda, Anda dapat menyertakan informasi tersebut dalam format HEX di bidang ini.
  - Misalnya, katakanlah kita ingin menulis hash dari dokumen IPFS ke rantai Ethereum untuk memberikannya stempel waktu yang tidak dapat diubah. Bidang data kita kemudian akan terlihat seperti `data: toHex("IPFS hash")`, menggunakan [`toHex`](https://viem.sh/docs/utilities/toHex) dari Viem. Dan sekarang siapa pun dapat menanyakan rantai dan melihat kapan dokumen itu ditambahkan.
- Transaksi kontrak pintar: Mengeksekusi beberapa kode kontrak pintar di rantai. Dalam hal ini, bidang data harus berisi fungsi pintar yang ingin Anda eksekusi, di samping parameter apa pun.
  - Untuk contoh praktis, lihat [tutorial Kontrak Pintar Hello World](/developers/tutorials/hello-world-smart-contract/).

### 8\. Jalankan kode menggunakan `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Navigasikan kembali ke terminal atau baris perintah Anda dan jalankan:

```
node sendTx.js
```

### 9\. Lihat transaksi Anda di penjelajah blok {#see-your-transaction-in-the-mempool}

Skrip mencetak hash transaksi segera setelah node menerima transaksi, lalu menunggu hingga disertakan dalam blok (biasanya dalam beberapa detik) dan mencetak hasilnya. Untuk melihat detailnya, tempelkan hash ke penjelajah blok Sepolia seperti [Sepolia Etherscan](https://sepolia.etherscan.io/) atau [Blockscout](https://eth-sepolia.blockscout.com/). Di sana Anda dapat melihat transaksi berubah dari tertunda menjadi disertakan, dan melihat jumlah, biaya, dan blok tempatnya mendarat.

Jika Anda melihat kesalahan `insufficient funds`, akun Anda tidak memiliki cukup ETH Sepolia untuk menutupi nilai ditambah gas. Kembali ke langkah 2 dan minta lebih banyak dari faucet.

**Yippieeee! Anda baru saja mengirim transaksi Ethereum pertama Anda menggunakan Alchemy 🎉**

_Untuk umpan balik dan saran tentang panduan ini, silakan kirim pesan ke Elan di [Discord](https://discord.gg/gWuC7zB) Alchemy!_

_Awalnya diterbitkan oleh Alchemy._
