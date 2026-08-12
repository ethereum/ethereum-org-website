---
title: Berinteraksi dengan kontrak pintar
description: Pelajari cara membaca dari dan menulis ke kontrak pintar yang sudah disebarkan di Ethereum.
lang: id
---

Anda tidak selalu perlu menulis dan menyebarkan kontrak pintar Anda sendiri. Sebagian besar waktu sebagai pengembang, Anda akan ingin berinteraksi dengan kontrak pintar yang telah disebarkan orang lain ke jaringan Ethereum.

Halaman ini mencakup dua cara mendasar untuk berinteraksi dengan kontrak pintar—**membaca** data dan **menulis** data—serta alat yang Anda butuhkan untuk melakukan keduanya.

## Prasyarat {#prerequisites}

Anda harus memahami:

- [Cara kerja kontrak pintar](/developers/docs/smart-contracts/)
- [Akun Ethereum dan cara mereka menandatangani transaksi](/developers/docs/accounts/)
- [Apa itu transaksi](/developers/docs/transactions/)

## Dua cara untuk berinteraksi dengan kontrak pintar {#two-ways}

Berinteraksi dengan kontrak pintar terbagi dalam dua kategori:

### Membaca dari kontrak {#reading-from-a-contract}

Membaca adalah operasi **gratis** yang tidak membuat transaksi dan tidak mengubah state apa pun di rantai blok.

Saat Anda membaca dari kontrak, Anda hanya menanyakan data yang sudah ada. Misalnya:

- Memeriksa saldo token ERC-20
- Membaca harga saat ini dari bursa terdesentralisasi
- Mendapatkan pemilik NFT

Karena membaca tidak memodifikasi state, mereka tidak memerlukan biaya [gas](/developers/docs/gas/) dan dapat dilakukan oleh siapa saja tanpa memerlukan ETH.

### Menulis ke kontrak {#writing-to-a-contract}

Menulis adalah operasi **pengubah state** yang memerlukan transaksi dan membutuhkan biaya gas.

Saat Anda menulis ke kontrak, Anda memicu fungsi yang memodifikasi state rantai blok. Misalnya:

- Mentransfer token
- Menukar token di bursa terdesentralisasi
- Mencetak NFT

Menulis selalu memerlukan:

1. [Akun yang Dimiliki Secara Eksternal (EOA)](/developers/docs/accounts/#types-of-account) dengan ETH yang cukup untuk gas
2. Transaksi yang ditandatangani oleh kunci privat akun
3. Transaksi untuk ditambang dan dimasukkan ke dalam blok

Dengan [abstraksi akun](/roadmap/account-abstraction/), akun kontrak pintar juga dapat memulai penulisan, dan juru bayar dapat menanggung gas atas nama pengguna—sehingga EOA yang memegang ETH tidak sepenuhnya diwajibkan.

## Memahami ABI kontrak {#understanding-contract-abis}

Untuk berinteraksi dengan kontrak pintar, aplikasi Anda perlu mengetahui *apa* yang dapat dilakukan kontrak tersebut. Di sinilah **Application Binary Interface (ABI)** berperan.

ABI adalah dokumen JSON yang menjelaskan:

- Setiap fungsi yang diekspos kontrak (nama, input, output)
- Setiap peristiwa yang dapat dipancarkan kontrak
- Cara menyandikan dan memecahkan sandi data saat berkomunikasi dengan kontrak

Anggap ABI sebagai manual instruksi kontrak—tanpanya, aplikasi Anda tidak tahu fungsi mana yang ada atau parameter apa yang mereka harapkan.

### Di mana menemukan ABI kontrak {#where-to-find-abis}

- **Kontrak terverifikasi di Etherscan** - [Etherscan](https://etherscan.io) secara otomatis mengekspos ABI untuk kode sumber yang terverifikasi
- **Dari pengembang** - banyak proyek menerbitkan ABI mereka dalam dokumentasi atau paket npm mereka
- **Hasilkan dari sumber** - jika Anda memiliki kode sumber Solidity, Anda dapat [mengkompilasinya](/developers/docs/smart-contracts/compiling/) untuk menghasilkan ABI

## Alat dan pustaka untuk berinteraksi dengan kontrak {#tools-and-libraries}

Pengembang biasanya menggunakan pustaka JavaScript/TypeScript untuk berinteraksi dengan kontrak dari aplikasi web, backend, atau skrip.

### Pustaka klien (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - Antarmuka TypeScript modern dan ringan untuk Ethereum dengan keamanan tipe kelas satu
- **[ethers.js](https://docs.ethers.org/)** - Pustaka yang telah teruji untuk berinteraksi dengan rantai blok Ethereum
- **[web3.js](https://web3js.org/)** - API JavaScript Ethereum yang asli

### Pustaka backend {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - Juga berfungsi di Node.js untuk skrip sisi server dan bot
- **[web3.py](https://web3py.readthedocs.io/)** - Pustaka Python untuk interaksi Ethereum
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Pustaka Go resmi dari tim Geth

### Contoh: membaca saldo token dengan Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// Alamat kontrak USDC dan ABI (sebagian, untuk balanceOf)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC memiliki 6 desimal
```

### Contoh: mengirim transaksi dengan ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI transfer ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // tunggu hingga transaksi ditambang
console.log(`Transferred! TX: ${tx.hash}`)
```

## Peristiwa dan log {#events-and-logs}

Kontrak pintar dapat memancarkan **peristiwa** untuk memberi sinyal bahwa sesuatu telah terjadi. Aplikasi Anda dapat mendengarkan peristiwa ini untuk bereaksi secara waktu nyata.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Pantau peristiwa Transfer USDC
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Mensimulasikan transaksi {#simulating}

Sebelum mengirim transaksi, Anda dapat **mensimulasikannya** untuk memeriksa apakah transaksi tersebut akan berhasil—dan untuk melihat nilai kembaliannya—tanpa menghabiskan gas. Ini berguna untuk menangkap kesalahan lebih awal dan untuk mempratinjau hasil.

Sebagian besar pustaka klien mendukung ini melalui `eth_call`:

```ts
// Dengan Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Dompet dan penandatanganan {#wallets-and-signing}

Dalam aplikasi terdesentralisasi (dapp), dompet pengguna (seperti MetaMask, Rainbow, atau WalletConnect) menangani penandatanganan. Anda tidak mengelola kunci privat secara langsung.

[Pustaka dompet dan alat koneksi](/developers/docs/apis/javascript/) mengabstraksi ini sehingga Anda dapat fokus membangun logika aplikasi Anda.

## Tutorial terkait {#related-tutorials}

- [Memanggil kontrak pintar dari JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Mengirim transaksi menggunakan web3.js dan Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Cara melihat NFT Anda di dompet Anda](/developers/tutorials/how-to-view-nft-in-metamask/)

## Bacaan lebih lanjut {#further-reading}

- [Dokumentasi Viem: Membaca dan menulis ke kontrak](https://viem.sh/docs/contract/readContract)
- [Dokumentasi ethers.js: Kontrak](https://docs.ethers.org/v6/api/contract/)
- [Spesifikasi ABI Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [Apa itu ABI? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Topik terkait {#related-topics}

- [Mengkompilasi kontrak pintar](/developers/docs/smart-contracts/compiling/)
- [Menyebarkan kontrak pintar](/developers/docs/smart-contracts/deploying/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API Backend](/developers/docs/apis/backend/)