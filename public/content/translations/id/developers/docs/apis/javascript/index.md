---
title: Pustaka API JavaScript
description: Pengenalan tentang pustaka klien JavaScript yang memungkinkan Anda berinteraksi dengan blockchain dari aplikasi Anda.
lang: id
---

Agar aplikasi web dapat berinteraksi dengan blockchain Ethereum (yaitu, membaca data blockchain dan/atau mengirim transaksi ke jaringan), aplikasi tersebut harus terhubung ke node Ethereum.

Untuk tujuan ini, setiap klien Ethereum mengimplementasikan spesifikasi [JSON-RPC](/developers/docs/apis/json-rpc/), sehingga terdapat serangkaian [metode](/developers/docs/apis/json-rpc/#json-rpc-methods) seragam yang dapat diandalkan oleh aplikasi.

Jika Anda ingin menggunakan JavaScript untuk terhubung dengan node Ethereum, Anda dapat menggunakan JavaScript murni, tetapi ada beberapa pustaka praktis dalam ekosistem yang membuatnya jauh lebih mudah. Dengan pustaka ini, pengembang dapat menulis metode satu baris yang intuitif untuk menginisialisasi permintaan JSON-RPC (di balik layar) yang berinteraksi dengan Ethereum.

Harap perhatikan bahwa sejak [The Merge](/roadmap/merge/), dua perangkat lunak Ethereum yang terhubung - klien eksekusi dan klien konsensus - diperlukan untuk menjalankan node. Pastikan node Anda mencakup klien eksekusi dan klien konsensus. Jika node Anda tidak berada di mesin lokal Anda (misalnya, node Anda berjalan di instans AWS), perbarui alamat IP dalam tutorial yang sesuai. Untuk informasi lebih lanjut, silakan lihat halaman kami tentang [menjalankan node](/developers/docs/nodes-and-clients/run-a-node/).

## Prasyarat {#prerequisites}

Selain memahami JavaScript, mungkin akan membantu jika Anda memahami [tumpukan Ethereum](/developers/docs/ethereum-stack/) dan [klien Ethereum](/developers/docs/nodes-and-clients/).

## Mengapa menggunakan pustaka? {#why-use-a-library}

Pustaka-pustaka ini mengabstraksi banyak kerumitan dalam berinteraksi langsung dengan node Ethereum. Mereka juga menyediakan fungsi utilitas (misalnya, mengonversi ETH ke Gwei) sehingga sebagai pengembang, Anda dapat menghabiskan lebih sedikit waktu untuk menangani kerumitan klien Ethereum dan lebih banyak waktu berfokus pada fungsionalitas unik aplikasi Anda.

## Fitur pustaka {#library-features}

### Terhubung ke node Ethereum {#connect-to-ethereum-nodes}

Dengan menggunakan penyedia (provider), pustaka-pustaka ini memungkinkan Anda untuk terhubung ke Ethereum dan membaca datanya, baik itu melalui JSON-RPC, INFURA, Etherscan, Alchemy, atau MetaMask.

> **Peringatan:** Web3.js telah diarsipkan pada 4 Maret 2025. [Baca pengumumannya](https://blog.chainsafe.io/web3-js-sunset/). Pertimbangkan untuk menggunakan pustaka alternatif seperti [ethers.js](https://ethers.org) atau [viem](https://viem.sh) untuk proyek baru.

**Contoh Ethers**

```js
// A BrowserProvider wraps a standard Web3 provider, which is // BrowserProvider membungkus penyedia Web3 standar, yaitu
// what MetaMask injects as window.ethereum into each page // apa yang disuntikkan MetaMask sebagai window.ethereum ke setiap halaman
const provider = new ethers.BrowserProvider(window.ethereum)

// The MetaMask plugin also allows signing transactions to // Plugin MetaMask juga memungkinkan penandatanganan transaksi untuk
// send ether and pay to change state within the blockchain. // mengirim ether dan membayar untuk mengubah status di dalam blockchain.
// For this, we need the account signer... // Untuk ini, kita memerlukan penandatangan akun...
const signer = provider.getSigner()
```

**Contoh Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// or // atau
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// change provider // ubah penyedia
web3.setProvider("ws://localhost:8546")
// or // atau
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Using the IPC provider in node.js // Menggunakan penyedia IPC di node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path // jalur mac os
// or // atau
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os path // jalur mac os
// on windows the path is: "\\\\.\\pipe\\geth.ipc" // di windows jalurnya adalah: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc" // di linux jalurnya adalah: "/users/myuser/.ethereum/geth.ipc"
```

Setelah disiapkan, Anda akan dapat meminta data (query) blockchain untuk:

- nomor blok
- perkiraan gas
- peristiwa kontrak pintar
- id jaringan
- dan banyak lagi...

### Fungsionalitas dompet {#wallet-functionality}

Pustaka-pustaka ini memberi Anda fungsionalitas untuk membuat dompet, mengelola kunci, dan menandatangani transaksi.

Berikut adalah contoh dari Ethers

```js
// Create a wallet instance from a mnemonic... // Buat instans dompet dari mnemonik...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...or from a private key // ...atau dari kunci privat
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true // true

// The address as a Promise per the Signer API // Alamat sebagai Promise sesuai dengan API Signer
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' } // { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// A Wallet address is also available synchronously // Alamat dompet juga tersedia secara sinkron
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' // '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// The internal cryptographic components // Komponen kriptografi internal
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db' // '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64' // '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// The wallet mnemonic // Mnemonik dompet
walletMnemonic.mnemonic
// { // {
//   locale: 'en', // locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0', // path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol' // phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// } // }

// Note: A wallet created with a private key does not // Catatan: Sebuah dompet yang dibuat dengan kunci privat tidak
//       have a mnemonic (the derivation prevents it) // memiliki mnemonik (derivasi mencegahnya)
walletPrivateKey.mnemonic
// null // null

// Signing a message // Menandatangani pesan
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' } // { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Signing a transaction // Menandatangani transaksi
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' } // { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// The connect method returns a new instance of the // Metode connect mengembalikan instans baru dari
// Wallet connected to a provider // Dompet yang terhubung ke penyedia
wallet = walletMnemonic.connect(provider)

// Querying the network // Melakukan kueri jaringan
wallet.getBalance()
// { Promise: { BigNumber: "42" } } // { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 } // { Promise: 0 }

// Sending ether // Mengirim ether
wallet.sendTransaction(tx)
```

[Baca dokumentasi lengkapnya](https://docs.ethers.io/v5/api/signer/#Wallet)

Setelah disiapkan, Anda akan dapat:

- membuat akun
- mengirim transaksi
- menandatangani transaksi
- dan banyak lagi...

### Berinteraksi dengan fungsi kontrak pintar {#interact-with-smart-contract-functions}

Pustaka klien JavaScript memungkinkan aplikasi Anda untuk memanggil fungsi kontrak pintar dengan membaca Application Binary Interface (ABI) dari kontrak yang dikompilasi.

ABI pada dasarnya menjelaskan fungsi kontrak dalam format JSON dan memungkinkan Anda untuk menggunakannya seperti objek JavaScript biasa.

Jadi kontrak Solidity berikut:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Akan menghasilkan JSON berikut:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Ini berarti Anda dapat:

- Mengirim transaksi ke kontrak pintar dan mengeksekusi metodenya
- Memanggil untuk memperkirakan gas yang akan dibutuhkan oleh eksekusi metode saat dieksekusi di Mesin Virtual Ethereum
- Menyebarkan kontrak
- Dan banyak lagi...

### Fungsi utilitas {#utility-functions}

Fungsi utilitas memberi Anda pintasan praktis yang membuat membangun dengan Ethereum menjadi sedikit lebih mudah.

Nilai ETH secara default berada dalam Wei. 1 ETH = 1.000.000.000.000.000.000 WEI – ini berarti Anda berurusan dengan banyak angka! `web3.utils.toWei` mengonversi ether ke Wei untuk Anda.

Dan di ethers terlihat seperti ini:

```js
// Get the balance of an account (by address or ENS name) // Dapatkan saldo akun (berdasarkan alamat atau nama ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" } // { BigNumber: "2337132817842795605" }

// Often you will need to format the output for the user // Seringkali Anda perlu memformat output untuk pengguna
// which prefer to see values in ether (instead of wei) // yang lebih suka melihat nilai dalam ether (bukan wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605' // '2.337132817842795605'
```

- [Fungsi utilitas Web3js](https://docs.web3js.org/api/web3-utils)
- [Fungsi utilitas Ethers](https://docs.ethers.org/v6/api/utils/)

## Pustaka yang tersedia {#available-libraries}

**Web3.js -** **_API JavaScript Ethereum._**

- [Dokumentasi](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Implementasi dompet Ethereum lengkap dan utilitas dalam JavaScript dan TypeScript._**

- [Beranda Ethers.js](https://ethers.org/)
- [Dokumentasi](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Protokol untuk mengindeks data Ethereum dan IPFS serta melakukan kueri menggunakan GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Dokumentasi](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Pembungkus (wrapper) untuk Ethers.js dengan API yang ditingkatkan._**

- [Dokumentasi](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Antarmuka TypeScript untuk Ethereum._**

- [Dokumentasi](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_API data blockchain yang diperkaya dan real-time di puluhan rantai._**

- [Dokumentasi](https://docs.codex.io)
- [Explorer](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_Meta-pustaka TypeScript dengan caching bawaan, hooks, dan mock pengujian._**

- [Dokumentasi](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Node dan klien](/developers/docs/nodes-and-clients/)
- [Kerangka kerja pengembangan](/developers/docs/frameworks/)

## Tutorial terkait {#related-tutorials}

- [Menyiapkan Web3js untuk menggunakan blockchain Ethereum dalam JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instruksi untuk menyiapkan web3.js di proyek Anda._
- [Memanggil kontrak pintar dari JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Menggunakan token DAI, lihat cara memanggil fungsi kontrak menggunakan JavaScript._
- [Mengirim transaksi menggunakan web3 dan Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Panduan langkah demi langkah untuk mengirim transaksi dari backend._

## Tutorial: API JavaScript & WebSocket di Ethereum {#tutorials}

- [Menggunakan WebSocket](/developers/tutorials/using-websockets/) _– Cara menggunakan WebSocket dengan Alchemy untuk berlangganan peristiwa Ethereum dan membuat permintaan JSON-RPC secara real-time._