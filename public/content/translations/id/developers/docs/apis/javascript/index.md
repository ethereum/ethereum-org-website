---
title: Pustaka API JavaScript
description: Pengantar pustaka klien JavaScript yang memungkinkan Anda berinteraksi dengan blockchain dari aplikasi Anda.
lang: id
---

Agar aplikasi web dapat berinteraksi dengan rantai blok Ethereum (yaitu, membaca data rantai blok dan/atau mengirim transaksi ke jaringan), aplikasi tersebut harus terhubung ke sebuah simpul Ethereum.

Untuk tujuan ini, setiap klien Ethereum mengimplementasikan spesifikasi [JSON-RPC](/developers/docs/apis/json-rpc/), sehingga ada serangkaian [metode](/developers/docs/apis/json-rpc/#json-rpc-methods) yang seragam yang dapat diandalkan oleh aplikasi.

Jika ingin Anda menggunakan JavaScript untuk terhubung dengan node Ethereum, dimungkinkan menggunakan JavaScript vanilla, tetapi beberapa pustaka praktis telah ada di dalam ekosistem yang akan membuat proses ini jauh lebih mudah. Dengan pustaka ini, pengembang dapat menulis metode satu baris yang intuitif untuk memulai permintaan JSON-RPC (di bawah tenda) yang berinteraksi dengan Ethereum.

Harap dicatat bahwa sejak [The Merge](/roadmap/merge/), dua perangkat lunak Ethereum yang terhubung - klien eksekusi dan klien konsensus - diperlukan untuk menjalankan sebuah simpul. Pastikan node Anda menyertakan klien eksekusi dan konsensus. Jika simpul Anda tidak berada di mesin lokal Anda (misalnya, simpul Anda berjalan di sebuah instance AWS), perbarui alamat IP di dalam tutorial sebagaimana mestinya. Untuk informasi lebih lanjut, silakan lihat halaman kami tentang [menjalankan sebuah simpul](/developers/docs/nodes-and-clients/run-a-node/).

## Persyaratan {#prerequisites}

Selain memahami JavaScript, akan sangat membantu juga untuk memahami [tumpukan Ethereum](/developers/docs/ethereum-stack/) dan [klien Ethereum](/developers/docs/nodes-and-clients/).

## Mengapa menggunakan pustaka? {#why-use-a-library}

Pustaka ini menyederhanakan banyak kerumitan dalam interaksi langsung dengan node Ethereum. Pustaka juga menyediakan fungsi utilitas (misalnya, mengonversi ETH ke Gwei) sehingga sebagai pengembang Anda dapat menghabiskan lebih sedikit waktu berurusan dengan seluk-beluk klien Ethereum dan lebih banyak waktu berfokus pada fungsionalitas unik aplikasi Anda.

## Fitur pustaka {#library-features}

### Terhubung ke simpul Ethereum {#connect-to-ethereum-nodes}

Dengan menggunakan providers, pustaka-pustaka ini memungkinkan Anda untuk terhubung ke Ethereum dan membaca datanya, baik itu melalui JSON-RPC, INFURA, Etherscan, Alchemy, maupun MetaMask.

> **Peringatan:** Web3.js diarsipkan pada 4 Maret 2025. [Baca pengumumannya](https://blog.chainsafe.io/web3-js-sunset/). Pertimbangkan untuk menggunakan pustaka alternatif seperti [ethers.js](https://ethers.org) atau [viem](https://viem.sh) untuk proyek baru.

**Contoh Ether**

```js
// BrowserProvider membungkus penyedia Web3 standar, yaitu
// yang disisipkan MetaMask sebagai window.ethereum ke setiap halaman
const provider = new ethers.BrowserProvider(window.ethereum)

// Plugin MetaMask juga memungkinkan penandatanganan transaksi untuk
// mengirim ether dan membayar untuk mengubah state di dalam blockchain.
// Untuk ini, kita memerlukan penanda tangan akun...
const signer = provider.getSigner()
```

**Contohy Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// atau
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// ganti penyedia
web3.setProvider("ws://localhost:8546")
// atau
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Menggunakan penyedia IPC di node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// atau
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os path
// untuk windows path berbentuk: "\\\\.\\pipe\\geth.ipc"
// untuk linux path berbentuk: "/users/myuser/.ethereum/geth.ipc"
```

Setelah disiapkan, Anda dapat membuat kueri blockchain untuk:

- nomor blok
- estimasi gas
- aksi kontrak pintar
- id jaringan
- dan banyak lagi...

### Fungsionalitas dompet {#wallet-functionality}

Perpustakaan ini memberi Anda fungsionalitas untuk membuat dompet, mengelola kunci, dan menandatangani transaksi.

Berikut adalah contoh dari Ether

```js
// Buat sebuah instance dompet dari sebuah mnemonik...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...atau dari sebuah kunci pribadi
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Alamat sebagai sebuah Promise per API Penanda Tangan (Signer)
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Alamat Dompet juga tersedia secara sinkron
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Komponen kriptografi internal
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Mnemonik dompet
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Catatan: Dompet yang dibuat dengan kunci pribadi tidak
//       memiliki mnemonik (derivasi mencegahnya)
walletPrivateKey.mnemonic
// null

// Menandatangani sebuah pesan
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Menandatangani sebuah transaksi
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Metode connect mengembalikan instance baru dari
// Dompet yang terhubung ke sebuah penyedia
wallet = walletMnemonic.connect(provider)

// Mengueri jaringan
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Mengirim ether
wallet.sendTransaction(tx)
```

[Baca dokumentasi lengkapnya](https://docs.ethers.io/v5/api/signer/#Wallet)

Setelah disiapkan, Anda dapat:

- membuat akun
- mengirim transaksi
- menandatangani transaksi
- dan banyak lagi...

### Berinteraksi dengan fungsi kontrak pintar {#interact-with-smart-contract-functions}

Pustaka klien JavaScript memungkinkan aplikasi Anda untuk memanggil fungsi kontrak pintar dengan membaca Antarmuka Biner Aplikasi (ABI) dari kontrak yang dikompilasi.

ABI pada dasarnya menjelaskan fungsi kontrak dalam format JSON dan memungkinkan Anda untuk menggunakannya seperti objek JavaScript biasa.

Jadi, berikut ini kontrak Solidity:

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

Akan menghasilkan JSON seperti berikut:

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

- Mengirim transaksi ke kontrak pintar dan menjalankan metodenya
- Melakukan pemanggilan untuk memperkirakan gas yang diperlukan oleh metode eksekusi saat dieksekusi di EVM
- Menyebarkan kontrak
- Dan banyak lagi...

### Fungsi utilitas {#utility-functions}

Fungsi utilitas memberi Anda jalan pintas praktis yang membuat pembangunan dengan Ethereum sedikit lebih mudah.

Nilai ETH dalam bentuk Wei secara default. 1 ETH = 1.000.000.000.000.000.000 WEI – ini berarti Anda berurusan dengan banyak angka! `web3.utils.toWei` mengonversi ether ke Wei untuk Anda.

Dan dalam ether terlihat seperti ini:

```js
// mendapatkan saldo akun (dengan alamat atau nama ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Seringkali Anda perlu memformat output untuk pengguna
// yang lebih suka melihat nilai dalam ether (alih - alih wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Fungsi utilitas Web3js](https://docs.web3js.org/api/web3-utils)
- [Fungsi utilitas Ethers](https://docs.ethers.org/v6/api/utils/)

## Pustaka yang tersedia {#available-libraries}

**Web3.js -** **_API JavaScript untuk Ethereum._**

- [Dokumentasi](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Implementasi dompet dan utilitas Ethereum yang lengkap dalam JavaScript dan TypeScript._**

- [Beranda Ethers.js](https://ethers.org/)
- [Dokumentasi](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Sebuah protokol untuk mengindeks data Ethereum dan IPFS dan membuat kuerinya menggunakan GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Dokumentasi](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Pembungkus untuk Ethers.js dengan API yang disempurnakan._**

- [Dokumentasi](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Antarmuka TypeScript untuk Ethereum._**

- [Dokumentasi](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_Meta-pustaka TypeScript dengan caching, hooks, dan mock tes bawaan._**

- [Dokumentasi](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Simpul dan klien](/developers/docs/nodes-and-clients/)
- [Kerangka kerja pengembangan](/developers/docs/frameworks/)

## Tutorial terkait {#related-tutorials}

- [Menyiapkan Web3js untuk menggunakan rantai blok Ethereum di JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Petunjuk untuk menyiapkan web3.js di proyek Anda._
- [Memanggil kontrak pintar dari JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Menggunakan token DAI, lihat cara memanggil fungsi kontrak menggunakan JavaScript._
- [Mengirim transaksi menggunakan web3 dan Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Panduan langkah demi langkah untuk mengirim transaksi dari backend._
