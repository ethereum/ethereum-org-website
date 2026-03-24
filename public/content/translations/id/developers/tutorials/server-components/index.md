---
title: "Komponen server dan agen untuk aplikasi web3"
description: Setelah membaca tutorial ini, Anda akan dapat menulis server TypeScript yang mendengarkan peristiwa di blockchain dan meresponsnya dengan transaksi mereka sendiri. Ini akan memungkinkan Anda untuk menulis aplikasi terpusat (karena server adalah titik kegagalan), tetapi dapat berinteraksi dengan entitas web3. Teknik yang sama juga dapat digunakan untuk menulis agen yang merespons peristiwa onchain tanpa campur tangan manusia.

author: Ori Pomerantz
lang: id
tags: ["agen", "server", "offchain", "dapps"]
skill: beginner
published: 2024-07-15
---

## Pengantar {#introduction}

Dalam kebanyakan kasus, aplikasi terdesentralisasi menggunakan server untuk mendistribusikan perangkat lunak, tetapi semua interaksi aktual terjadi antara klien (biasanya, peramban web) dan blockchain.

![Interaksi normal antara server web, klien, dan blockchain](./fig-1.svg)

Namun, ada beberapa kasus di mana sebuah aplikasi akan mendapat manfaat dari memiliki komponen server yang berjalan secara independen. Server semacam itu akan dapat merespons peristiwa, dan permintaan yang datang dari sumber lain, seperti API, dengan mengeluarkan transaksi.

![Interaksi dengan penambahan server](./fig-2.svg)

Ada beberapa kemungkinan tugas yang dapat dipenuhi oleh server semacam itu.

- Pemegang status rahasia. Dalam permainan, sering kali berguna untuk tidak membuat semua informasi yang diketahui permainan tersedia bagi para pemain. Namun, _tidak ada rahasia di blockchain_, informasi apa pun yang ada di blockchain mudah diketahui oleh siapa saja. Oleh karena itu, jika sebagian dari status permainan harus dirahasiakan, itu harus disimpan di tempat lain (dan mungkin efek dari status tersebut diverifikasi menggunakan [bukti zero-knowledge](/zero-knowledge-proofs)).

- Oracle terpusat. Jika taruhannya cukup rendah, server eksternal yang membaca beberapa informasi secara online dan kemudian mempostingnya ke rantai mungkin cukup baik untuk digunakan sebagai [oracle](/developers/docs/oracles/).

- Agen. Tidak ada yang terjadi di blockchain tanpa transaksi untuk mengaktifkannya. Sebuah server dapat bertindak atas nama pengguna untuk melakukan tindakan seperti [arbitrase](/developers/docs/mev/#mev-examples-dex-arbitrage) ketika ada kesempatan.

## Contoh program {#sample-program}

Anda dapat melihat contoh server [di github](https://github.com/qbzzt/20240715-server-component). Server ini mendengarkan peristiwa yang datang dari [kontrak ini](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), versi modifikasi dari Greeter milik Hardhat. Ketika sapaan diubah, server akan mengubahnya kembali.

Untuk menjalankannya:

1. Klon repositori.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
```

2. Instal paket yang diperlukan. Jika Anda belum memilikinya, [instal Node terlebih dahulu](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
```

3. Edit `.env` untuk menentukan kunci pribadi dari akun yang memiliki ETH di testnet Holesky. Jika Anda tidak memiliki ETH di Holesky, Anda dapat [menggunakan faucet ini](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
```

4. Mulai server.

   ```sh copy
   npm start
```

5. Buka [penjelajah blok](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract), dan menggunakan alamat yang berbeda dari yang memiliki kunci pribadi, ubah sapaannya. Lihat bahwa sapaan tersebut secara otomatis diubah kembali.

### Bagaimana cara kerjanya? {#how-it-works}

Cara termudah untuk memahami cara menulis komponen server adalah dengan memeriksa contohnya baris demi baris.

#### `src/app.ts` {#src-app-ts}

Sebagian besar program terdapat di [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Membuat objek prasyarat

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Ini adalah entitas [Viem](https://viem.sh/) yang kita butuhkan, fungsi, dan [tipe `Address`](https://viem.sh/docs/glossary/types#address). Server ini ditulis dalam [TypeScript](https://www.typescriptlang.org/), yang merupakan ekstensi dari JavaScript yang membuatnya [diketik dengan kuat (strongly typed)](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Fungsi ini](https://viem.sh/docs/accounts/privateKey) memungkinkan kita menghasilkan informasi dompet, termasuk alamat, yang sesuai dengan kunci pribadi.

```typescript
import { holesky } from "viem/chains"
```

Untuk menggunakan blockchain di Viem, Anda perlu mengimpor definisinya. Dalam hal ini, kita ingin terhubung ke blockchain pengujian [Holesky](https://github.com/eth-clients/holesky).

```typescript
// This is how we add the definitions in .env to process.env. // Ini adalah cara kita menambahkan definisi di .env ke process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

Ini adalah cara kita membaca `.env` ke dalam lingkungan. Kita membutuhkannya untuk kunci pribadi (lihat nanti).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Untuk menggunakan kontrak, kita memerlukan alamatnya dan [ABI](/glossary/#abi) untuknya. Kita menyediakan keduanya di sini.

Dalam JavaScript (dan karenanya TypeScript) Anda tidak dapat menetapkan nilai baru ke sebuah konstanta, tetapi Anda _dapat_ memodifikasi objek yang disimpan di dalamnya. Dengan menggunakan akhiran `as const`, kita memberi tahu TypeScript bahwa daftar itu sendiri adalah konstan dan tidak boleh diubah.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Buat [klien publik](https://viem.sh/docs/clients/public.html) Viem. Klien publik tidak memiliki kunci pribadi yang terlampir, dan karenanya tidak dapat mengirim transaksi. Mereka dapat memanggil [fungsi `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), membaca saldo akun, dll.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Variabel lingkungan tersedia di [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Namun, TypeScript diketik dengan kuat. Variabel lingkungan dapat berupa string apa pun, atau kosong, sehingga tipe untuk variabel lingkungan adalah `string | undefined`. Namun, sebuah kunci didefinisikan di Viem sebagai `0x${string}` (`0x` diikuti oleh sebuah string). Di sini kita memberi tahu TypeScript bahwa variabel lingkungan `PRIVATE_KEY` akan bertipe tersebut. Jika tidak, kita akan mendapatkan kesalahan runtime.

Fungsi [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) kemudian menggunakan kunci pribadi ini untuk membuat objek akun lengkap.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Selanjutnya, kita menggunakan objek akun untuk membuat [klien dompet](https://viem.sh/docs/clients/wallet). Klien ini memiliki kunci pribadi dan alamat, sehingga dapat digunakan untuk mengirim transaksi.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Sekarang setelah kita memiliki semua prasyarat, kita akhirnya dapat membuat [instans kontrak](https://viem.sh/docs/contract/getContract). Kita akan menggunakan instans kontrak ini untuk berkomunikasi dengan kontrak onchain.

##### Membaca dari blockchain

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Fungsi kontrak yang hanya-baca ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) dan [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) tersedia di bawah `read`. Dalam hal ini, kita menggunakannya untuk mengakses fungsi [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), yang mengembalikan sapaan.

JavaScript bersifat single-threaded, jadi ketika kita menjalankan proses yang berjalan lama, kita perlu [menentukan bahwa kita melakukannya secara asinkron](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Memanggil blockchain, bahkan untuk operasi hanya-baca, memerlukan perjalanan bolak-balik antara komputer dan node blockchain. Itulah alasan kita menentukan di sini bahwa kode perlu `await` (menunggu) hasilnya.

Jika Anda tertarik dengan cara kerjanya, Anda dapat [membacanya di sini](https://www.w3schools.com/js/js_promise.asp), tetapi secara praktis yang perlu Anda ketahui adalah bahwa Anda melakukan `await` pada hasil jika Anda memulai operasi yang memakan waktu lama, dan bahwa fungsi apa pun yang melakukan ini harus dideklarasikan sebagai `async`.

##### Mengeluarkan transaksi

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Ini adalah fungsi yang Anda panggil untuk mengeluarkan transaksi yang mengubah sapaan. Karena ini adalah operasi yang panjang, fungsi ini dideklarasikan sebagai `async`. Karena implementasi internal, setiap fungsi `async` perlu mengembalikan objek `Promise`. Dalam hal ini, `Promise<any>` berarti kita tidak menentukan apa tepatnya yang akan dikembalikan dalam `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Bidang `write` dari instans kontrak memiliki semua fungsi yang menulis ke status blockchain (yang memerlukan pengiriman transaksi), seperti [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Parameter, jika ada, disediakan sebagai daftar, dan fungsi tersebut mengembalikan hash dari transaksi.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Laporkan hash dari transaksi (sebagai bagian dari URL ke penjelajah blok untuk melihatnya) dan kembalikan.

##### Merespons peristiwa

```typescript
greeter.watchEvent.SetGreeting({
```

[Fungsi `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) memungkinkan Anda menentukan bahwa sebuah fungsi akan dijalankan ketika suatu peristiwa dipancarkan. Jika Anda hanya peduli pada satu jenis peristiwa (dalam hal ini, `SetGreeting`), Anda dapat menggunakan sintaks ini untuk membatasi diri Anda pada jenis peristiwa tersebut.

```typescript
    onLogs: logs => {
```

Fungsi `onLogs` dipanggil ketika ada entri log. Di Ethereum, "log" dan "peristiwa" biasanya dapat dipertukarkan.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Bisa jadi ada beberapa peristiwa, tetapi untuk kesederhanaan kita hanya peduli pada yang pertama. `logs[0].args` adalah argumen dari peristiwa tersebut, dalam hal ini `sender` dan `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Jika pengirimnya _bukan_ server ini, gunakan `setGreeting` untuk mengubah sapaan.

#### `package.json` {#package-json}

[File ini](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) mengontrol konfigurasi [Node.js](https://nodejs.org/en). Artikel ini hanya menjelaskan definisi-definisi penting.

```json
{
  "main": "dist/index.js",
```

Definisi ini menentukan file JavaScript mana yang akan dijalankan.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Skrip adalah berbagai tindakan aplikasi. Dalam hal ini, satu-satunya yang kita miliki adalah `start`, yang mengkompilasi dan kemudian menjalankan server. Perintah `tsc` adalah bagian dari paket `typescript` dan mengkompilasi TypeScript menjadi JavaScript. Jika Anda ingin menjalankannya secara manual, perintah ini terletak di `node_modules/.bin`. Perintah kedua menjalankan server.

```json
  "type": "module",
```

Ada beberapa jenis aplikasi node JavaScript. Tipe `module` memungkinkan kita memiliki `await` di kode tingkat atas, yang penting ketika Anda melakukan operasi yang lambat (dan karenanya asinkron).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Ini adalah paket-paket yang hanya diperlukan untuk pengembangan. Di sini kita membutuhkan `typescript` dan karena kita menggunakannya dengan Node.js, kita juga mendapatkan tipe untuk variabel dan objek node, seperti `process`. [Notasi `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) berarti versi tersebut atau versi yang lebih tinggi yang tidak memiliki perubahan yang merusak (breaking changes). Lihat [di sini](https://semver.org) untuk informasi lebih lanjut tentang arti nomor versi.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Ini adalah paket-paket yang diperlukan saat runtime, ketika menjalankan `dist/app.js`.

## Kesimpulan {#conclusion}

Server terpusat yang kita buat di sini melakukan tugasnya, yaitu bertindak sebagai agen untuk pengguna. Siapa pun yang ingin dapp terus berfungsi dan bersedia menghabiskan gas dapat menjalankan instans baru dari server dengan alamat mereka sendiri.

Namun, ini hanya berfungsi ketika tindakan server terpusat dapat dengan mudah diverifikasi. Jika server terpusat memiliki informasi status rahasia, atau menjalankan perhitungan yang sulit, itu adalah entitas terpusat yang perlu Anda percayai untuk menggunakan aplikasi, yang mana hal ini adalah tepat apa yang coba dihindari oleh blockchain. Dalam artikel mendatang, saya berencana untuk menunjukkan cara menggunakan [bukti zero-knowledge](/zero-knowledge-proofs) untuk mengatasi masalah ini.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).