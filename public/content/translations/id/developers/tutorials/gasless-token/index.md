---
title: "Membiarkan pengguna tanpa gas Anda menyimpan token dan memanggil kontrak"
description: Menggunakan abstraksi akun, kita dapat membuat dompet kontrak pintar yang menerima transaksi yang dikirim oleh EOA tertentu atau ditandatangani oleh EOA tersebut. Kontrak pintar ini kemudian dapat memiliki token, yang berada di bawah kendali EOA.
author: Ori Pomerantz
tags: ["tanpa gas", "erc-20", "abstraksi akun"]
skill: intermediate
breadcrumb: Token tanpa gas
lang: id
published: 2026-04-01
---

## Pengantar {#introduction}

[Artikel sebelumnya](/developers/tutorials/gasless/) membahas penggunaan akses tanpa gas ke aplikasi Anda sendiri menggunakan tanda tangan EIP-712, tetapi ini terbatas pada kontrak pintar Anda sendiri. Menggunakan [abstraksi akun](/roadmap/account-abstraction/), kita dapat membuat dompet kontrak pintar yang menerima dua jenis transaksi dan meneruskannya ke tujuan yang diminta:

- Transaksi yang dikirim oleh EOA tertentu (yang mewajibkan EOA tersebut memiliki ETH)
- Transaksi yang dikirim dari mana saja, tetapi ditandatangani oleh EOA yang sama.

Dengan cara ini, kita dapat menyediakan cara tanpa gas bagi sebuah akun untuk menyimpan aset (token, dll.) dan melakukan semua fungsi yang dapat dilakukan oleh EOA dengan gas.

### Mengapa kita tidak bisa sekadar meneruskan permintaan tersebut? {#why-no-tx-origin}

Dalam ERC-20 dan standar terkait, pemilik akun adalah [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), alamat yang memanggil kontrak token, yang belum tentu merupakan pembuat transaksi, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). Ini diwajibkan karena [alasan keamanan](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin). Ini berarti bahwa jika kita meneruskan permintaan transfer token, permintaan tersebut akan mencoba mentransfer token dari alamat penerus (relayer) alih-alih dari alamat yang dikendalikan oleh pengguna.

Ada solusi yang memungkinkan Anda menggunakan alamat EOA melalui [EIP-7702](https://eip7702.io/), tetapi ini mewajibkan penandatanganan pendelegasian yang berpotensi berbahaya, sehingga Anda hanya dapat menggunakannya untuk mendelegasikan ke kontrak pintar yang disetujui oleh penyedia dompet. Untuk tutorial ini, saya lebih memilih metode yang jauh lebih sederhana yaitu membuat kontrak pintar sebagai proksi bagi pengguna.

## Melihatnya beraksi {#in-action}

1. Pastikan Anda memiliki [Node](https://nodejs.org/en/download) dan [Foundry](https://www.getfoundry.sh/introduction/installation).

2. Kloning aplikasi dan instal perangkat lunak yang diperlukan.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Edit `.env` untuk mengatur `SEPOLIA_PRIVATE_KEY` ke dompet yang memiliki ETH di Sepolia. Jika Anda membutuhkan ETH Sepolia, [gunakan faucet](/developers/docs/networks/#sepolia) untuk mendapatkannya. Idealnya, kunci privat ini harus berbeda dari yang Anda miliki di dompet peramban Anda.

4. Mulai server.

   ```sh
   npm run dev
   ```

5. Buka aplikasi di URL [`http://localhost:5173`](http://localhost:5173).

6. Klik **Connect with Injected** untuk terhubung ke dompet. Setujui di dompet, dan setujui perubahan ke Sepolia jika perlu.

7. Gulir ke bawah dan klik **Deploy UserProxy (slow process)**.

8. Anda dapat melihat kapan proksi pengguna disebarkan karena ada alamat di sebelah **UserProxy access**. Jika Anda menunggu 24 detik (2 blok) dan itu masih belum terjadi, mungkin ada masalah dengan pendeteksian perubahan.

   Jika demikian, buka [Penjelajah Sepolia](https://eth-sepolia.blockscout.com/) dan masukkan hash transaksi penyebaran yang Anda lihat di keluaran server pada `npm run dev`. Klik kontrak yang dibuat untuk melihat alamatnya, lalu salin. Tempelkan alamat di bidang _Or enter existing proxy address_, lalu klik **Set proxy address**.

9. Klik **Request more tokens for proxy** untuk mengirimkan panggilan ke fungsi [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) dari kontrak ERC-20 untuk mendapatkan token. **Konfirmasi** tanda tangan di dompet. Tentu saja, token tersebut masuk ke alamat proksi, bukan alamat pengguna.

10. Gulir ke bawah dan klik tautan di bawah _Last transaction:_. Ini akan membuka peramban untuk menunjukkan kepada Anda transaksi `faucet`.

11. Di bagian _amount to transfer_, masukkan angka antara satu dan seribu. Klik **Transfer** untuk mentransfer token ke alamat Anda sendiri. Sebelum Anda mengeklik **Konfirmasi** untuk permintaan tersebut, perhatikan bahwa data yang ditandatangani tidak jelas (opaque). Pengguna akan kesulitan memahami apa yang mereka tandatangani. Ingatlah bahwa kita akan membahasnya [di bawah](#vulnerabilities).

12. Setelah transaksi dikonfirmasi, tunggu untuk melihat perubahan pada _your balance_ dan _proxy balance_. Perhatikan bahwa ini juga akan memakan waktu, karena Sepolia memiliki waktu blok 12 detik.

## Cara kerjanya {#how-work}

Untuk pengalaman tanpa gas, kita memerlukan antarmuka pengguna untuk pengguna, server untuk merutekan pesan dari antarmuka pengguna ke rantai, dan kontrak pintar untuk menerima dan memverifikasinya.

### Kontrak pintar dompet {#wallet-smart-contract}

Ini adalah [kontrak pintar](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Tujuannya adalah untuk melakukan apa pun yang diminta oleh pemilik asli, terlepas dari saluran yang digunakan untuk memintanya, dan mengabaikan hal lainnya. Untuk melakukan ini, fungsi-fungsinya menerima alamat target untuk dipanggil dan data untuk digunakan memanggilnya.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

Identitas pemilik dan sebuah [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) untuk mencegah pesan diulang. Karena nonce adalah variabel `public`, kompiler Solidity juga membuat fungsi view, [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), yang memungkinkan kode offchain untuk membaca nilainya.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

Informasi yang diperlukan untuk memverifikasi [tanda tangan EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

Sebuah `UserProxy` terikat pada satu alamat pemilik. Ini diperlukan karena ia dapat memiliki aset (token ERC-20, NFT, dll.). Kita tidak ingin mencampuradukkan aset milik pemilik yang berbeda.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[Pemisah domain](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Ini tidak dapat dihitung pada waktu kompilasi, karena bergantung pada ID rantai dan alamat kontrak. Hal ini membuat UserProxy tidak mungkin tertipu oleh pesan yang disiapkan untuk yang lain.

```solidity
    event CallResult(address target, bytes returnData);
```

Log hasil panggilan.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Fungsi ini dapat dipanggil secara langsung oleh pemilik. Jika tidak ada penerus (relay) yang tersedia, pemilik masih dapat mengakses aset secara langsung di rantai blok (jika pengguna memiliki ETH).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Jika kita dipanggil _secara langsung_ oleh pemilik, panggil target dengan data panggilan (calldata) yang disediakan.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

Ini adalah fungsi utama `UserProxy`. Fungsi ini mendapatkan `target` dan `data`, serta sebuah tanda tangan.

```solidity
    external returns (bytes memory) {
        // Hitung digest EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

Intisari (digest) juga menyertakan nonce, tetapi kita tidak perlu menerimanya dari transaksi; kita sudah mengetahui nilai yang benar. Tanda tangan dengan nonce yang salah akan ditolak.

```solidity

    // Pulihkan penandatangan
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

Jika tanda tangan tidak valid, `ecrecover` biasanya akan mengembalikan alamat yang berbeda, dan itu tidak akan diterima.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Panggil kontrak yang diperintahkan pengguna untuk kita panggil, dan kembalikan (revert) jika tidak berhasil.

```solidity
    emit CallResult(target, returnData);

    nonce++; // Tingkatkan nonce untuk mencegah replay

    return returnData;
}
```

Jika berhasil, pancarkan peristiwa log dan tingkatkan nonce.

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

Ini adalah varian yang hampir identik yang memungkinkan Anda juga mentransfer ETH keluar dari kontrak.

### Penerus (relayer) {#relayer}

Penerus (relayer) adalah [komponen server](/developers/tutorials/server-components/). Ini ditulis dalam JavaScript; Anda dapat melihat kode sumbernya [di sini](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js).

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

Pustaka yang kita butuhkan. Ini adalah server [Express](https://expressjs.com/), yang menggunakan [Vite](https://vite.dev/) untuk menyajikan kode antarmuka pengguna. Kita menggunakan [Viem](https://viem.sh/) untuk berkomunikasi dengan rantai blok, dan [dotenv](https://www.dotenv.org/) untuk membaca kunci privat untuk alamat yang mengirimkan transaksi.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

Ini adalah cara sederhana untuk membaca `UserProxy` yang telah dikompilasi. Kita memerlukan ABI untuk dapat memanggil `UserProxy`, dan kode yang dikompilasi untuk dapat menyebarkannya bagi pengguna.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

Baca file `.env`, ekstrak alamatnya, dan cetak ke konsol.

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Klien Viem yang berbicara dengan rantai blok.

```js
const start = async () => {
  const app = express()
```

Jalankan server Express.

```js
  app.use(express.json())
```

Beri tahu Express untuk membaca isi permintaan, dan jika itu JSON, urai (parse) isinya.

```js
  app.post("/server/deploy", async (req, res) => {
```

Ini adalah kode yang menangani permintaan untuk menyebarkan proksi. Perhatikan bahwa kita rentan terhadap serangan [penolakan layanan (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) di sini karena penyerang dapat mengirimkan spam permintaan kepada kita untuk menyebarkan proksi hingga ETH kita habis. Pada sistem produksi, kita mungkin akan mewajibkan agar permintaan untuk menyebarkan proksi ditandatangani dan penandatangannya adalah pelanggan yang sudah ada.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

Dapatkan alamat pemilik dari permintaan.

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[Sebarkan kontrak](https://viem.sh/docs/contract/deployContract#deploycontract) dan [tunggu hingga disebarkan](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Jika semuanya baik-baik saja, kembalikan alamat proksi ke antarmuka pengguna.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Jika ada masalah, laporkan.

```js
  app.post("/server/message", async (req, res) => {
```

Ini adalah kode yang memproses pesan pengguna untuk kontrak `UserProxy`. Ini adalah titik lain yang rentan terhadap serangan penolakan layanan.

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

Dapatkan data permintaan dan gunakan untuk memanggil `signedAccess` pada proksi.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

Laporkan kembali hash transaksi. Ini memungkinkan UI menampilkan URL bagi pengguna untuk memeriksa transaksi.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Sekali lagi, jika ada masalah, laporkan.

```js
  // Biarkan Vite menangani sisanya
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

Untuk hal lainnya, gunakan Vite, yang menangani penyajian antarmuka pengguna untuk kita.

### Antarmuka pengguna {#user-interface}

[Ini adalah kode antarmuka pengguna](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). Sebagian besar kode hampir identik dengan yang didokumentasikan dalam [artikel ini](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through), dengan pengecualian [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

Bagian dari [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) mirip dengan [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) dalam [artikel ini](/developers/tutorials/gasless/#ui-changes). Berikut adalah bagian-bagian barunya.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Fungsi ini](https://viem.sh/docs/contract/encodeFunctionData) membuat data panggilan (calldata) untuk panggilan fungsi EVM. Ini diperlukan agar pengguna dapat menandatangani data panggilan tersebut.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`, dijelaskan di atas.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Kontrak ini](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) sebagian besar adalah kontrak ERC-20 normal, dengan penambahan satu fungsi penting, `faucet()`. Fungsi ini memberikan token kepada siapa saja yang memintanya untuk tujuan pengujian.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

Alamat untuk `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Komponen ini mengeluarkan alamat dengan tautan ke kontrak di penjelajah blok.

```js
const Token = () => {
    ...
```

Ini adalah komponen utama yang melakukan sebagian besar pekerjaan.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

Saldo token dari alamat pengguna.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

Alamat proksi yang dimiliki oleh pengguna.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

Saldo token proksi.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

Bidang ini digunakan saat pengguna mengatur alamat proksi secara manual. Memiliki kemampuan untuk mengatur alamat proksi secara manual memungkinkan pengguna menggunakan proksi yang ada alih-alih menyebarkan yang baru setiap saat (dan kehilangan semua token yang dimiliki oleh proksi lama).

```js
  const [ txHash, setTxHash ] = useState(null)
```

Hash dari transaksi terakhir, digunakan untuk menampilkan tautan ke penjelajah sehingga pengguna dapat memeriksa transaksi tersebut.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Semua bidang ini digunakan untuk mengirim perintah transfer token ke kontrak ERC-20. Ini mungkin `FaucetToken`, tetapi tidak harus demikian. Fungsi [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) adalah bagian dari standar ERC-20.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

Baca dua saldo token yang kita minati, berapa banyak yang dimiliki pengguna, dan berapa banyak yang dimiliki proksi.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Untuk mencegah serangan pemutaran ulang (replay attack) (misalnya, penjual memutar ulang transaksi yang memberi mereka uang), kita menggunakan sebuah [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Kita perlu mengetahui nilai saat ini untuk menambahkannya ke data yang kita tandatangani.

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

Gunakan [`useEffect`](https://react.dev/reference/react/useEffect) untuk memperbarui saldo yang ditampilkan kepada pengguna saat informasi yang dibaca dari rantai blok berubah.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

Standarnya adalah mentransfer token `FaucetToken` ke akun pengguna sendiri. Di sini kita mengatur nilai-nilai ini saat kita menerimanya dari Viem.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Penangan peristiwa (event handler) untuk saat bidang teks berubah.

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Minta server untuk menyebarkan proksi bagi pengguna ini.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Tandatangani pesan sebelum mengirimkannya ke server untuk dikirim ke `UserProxy` secara onchain. Ini dijelaskan [di sini](/developers/tutorials/gasless/#ui-changes). Kita perlu menandatangani pesan dengan alamat target (alamat token yang kita panggil) dan data panggilan (calldata) untuk dikirim.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

Kirim pesan yang ditandatangani ke `UserProxy`, yang akan memverifikasi tanda tangan dan kemudian mengirimkannya ke `target`.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // kedua alamat
          data,           // data panggilan untuk dikirim ke target
          v, r, s         // tanda tangan
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Kirim permintaan ke server, dan saat Anda menerima respons, dapatkan hash transaksi.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

Simulasikan pemanggilan fungsi `faucet`. Kita hanya mengaktifkan tombol faucet jika ini berhasil.

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

Untuk memanggil fungsi melalui server dan `UserProxy`, kita mengikuti tiga langkah:

1. Buat data panggilan (calldata) untuk ditandatangani dan dikirim menggunakan [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. Tandatangani pesan (alamat target, data panggilan, dan nonce).

3. Kirim pesan ke server.

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

Bagian komponen ini memungkinkan Anda menggunakan `FaucetToken` secara langsung dari peramban. Tujuan utamanya adalah untuk memfasilitasi proses debug.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Biarkan pengguna menyebarkan `UserProxy` baru.

```js
         <br /><br />
         <input type="text" placeholder="Atau masukkan alamat proxy yang ada" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Hanya biarkan pengguna mengeklik **Set proxy address** saat mereka memasukkan alamat yang sah. Perhatikan bahwa ini tidak memastikan bahwa alamat yang dimaksud memang merupakan kontrak `UserProxy`. Dimungkinkan untuk menambahkan pemeriksaan semacam itu, tetapi akan jauh lebih lambat (pengalaman pengguna yang lebih buruk) dan tidak meningkatkan keamanan (penyerang selalu dapat menggunakan kode mereka sendiri untuk antarmuka pengguna).

```js
         <br /><br />
         { proxyAddr && (
```

Tampilkan sisanya _hanya_ jika ada alamat proksi yang sah.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

Pengguna tidak perlu mengetahui nonce; ini hanya untuk tujuan debug.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

Kita tidak dapat menyimulasikan panggilan ke `faucet()` melalui proksi. Namun, setidaknya kita dapat memastikan bahwa kita memiliki proksi dan bahwa proksi tersebut melaporkan nonce kepada kita.

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

Biarkan pengguna menerbitkan transaksi transfer ERC-20.

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

Jika ada hash transaksi terakhir, tampilkan tautan agar pengguna dapat melihatnya di penjelajah blok.

```js
 
</div>
    </>
  )
}

export {Token}
```

Ini hanyalah boilerplate React.

## Kerentanan {#vulnerabilities}

Server kita rentan terhadap serangan penolakan layanan. Serangan ini dijelaskan [dalam artikel sebelumnya dari seri ini](/developers/tutorials/gasless/#dos-on-server).

Selain itu, kita mendorong perilaku pengguna yang buruk. Inilah yang kita minta untuk ditandatangani oleh pengguna:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_Kita_ tahu ini adalah transfer ERC-20 yang sah untuk token, jumlah, dan alamat tujuan yang ingin ditransfer oleh pengguna. Namun, sebagian besar pengguna tidak tahu cara menafsirkan data panggilan (calldata), dan tidak tahu apa yang mereka tandatangani. Itu adalah desain yang buruk, karena dua alasan:

- Beberapa pengguna tidak akan menggunakan kita karena mereka tidak memercayai data yang kita suruh untuk mereka tandatangani.
- Pengguna lain _akan_ memercayai kita dan belajar bahwa mereka harus menandatangani data panggilan begitu saja tanpa memahami apa itu. Ini berarti bahwa jika Adam si Penyerang berhasil mengarahkan mereka ke situs webnya, ia dapat meminta mereka menandatangani transaksi yang memberinya semua USDC (atau DAI, atau ERC-20 lainnya) yang dimiliki pengguna.

Solusinya adalah memiliki fungsi terpisah di `UserProxy` untuk fungsi yang umum digunakan, seperti transfer. Kemudian pengguna dapat menandatangani sesuatu yang mereka pahami.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Catatan:** Meskipun pengguna dapat menggunakan dompet apa pun yang mereka inginkan, sangat disarankan agar aplikasi yang menggunakan EIP-712 mendorong mereka untuk menggunakan dompet yang [menampilkan seluruh data tanda tangan](https://rabby.io/). Beberapa dompet memotong alamat, yang mana tidak aman. Penyerang dapat membuat alamat yang memiliki karakter awal dan akhir yang sama, tetapi berbeda di bagian tengah.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Kesimpulan {#conclusion}

Selain kerentanan di atas, solusi dalam tutorial ini memiliki beberapa kelemahan yang dapat dibantu atasi oleh Ethereum.

- _Ketahanan sensor_. Saat ini, pengguna dapat menggunakan server Anda, server pesaing yang disiapkan oleh orang lain, atau terhubung ke Ethereum secara langsung, yang menimbulkan biaya gas. Menggunakan [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) memungkinkan pengguna menawarkan transaksi mereka ke kumpulan server yang besar, sehingga mengurangi kemungkinan transaksi mereka akan disensor.
- _Aset yang dimiliki EOA_. Seperti yang dicatat di atas, [EIP-7702](https://eip7702.io/) dapat digunakan untuk mengelola aset yang sudah dimiliki oleh alamat EOA. Ini memiliki kesulitannya sendiri, tetapi terkadang hal ini diperlukan.

Saya berharap dapat menerbitkan tutorial tentang penambahan fitur-fitur ini dalam waktu dekat.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).