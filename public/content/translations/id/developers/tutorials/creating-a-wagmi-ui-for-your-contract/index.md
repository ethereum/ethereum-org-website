---
title: "Membangun antarmuka pengguna untuk kontrak Anda"
description: Menggunakan komponen modern seperti TypeScript, React, Vite, dan Wagmi, kita akan membahas antarmuka pengguna yang modern, namun minimal, dan mempelajari cara menghubungkan dompet ke antarmuka pengguna, memanggil kontrak pintar untuk membaca informasi, mengirim transaksi ke kontrak pintar, dan memantau aksi dari kontrak pintar untuk mengidentifikasi perubahan.
author: Ori Pomerantz
tags:
  [
    "typescript",
    "react",
    "vite",
    "wagmi",
    "frontend"
  ]
skill: beginner
published: 2023-11-01
lang: id
sidebarDepth: 3
---

Anda menemukan fitur yang kami butuhkan dalam ekosistem Ethereum. Anda menulis kontrak pintar untuk mengimplementasikannya, dan bahkan mungkin beberapa kode terkait yang berjalan di luar rantai. Ini hebat! Sayangnya, tanpa antarmuka pengguna, Anda tidak akan memiliki pengguna, dan terakhir kali Anda menulis situs web, orang-orang menggunakan modem dial-up dan JavaScript adalah hal baru.

Artikel ini untuk Anda. Saya berasumsi Anda tahu pemrograman, dan mungkin sedikit JavaScript dan HTML, tetapi keterampilan antarmuka pengguna Anda sudah usang dan ketinggalan zaman. Bersama-sama kita akan membahas aplikasi modern sederhana sehingga Anda akan melihat bagaimana hal itu dilakukan saat ini.

## Mengapa ini penting {#why-important}

Secara teori, Anda bisa saja meminta orang menggunakan [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) atau [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) untuk berinteraksi dengan kontrak Anda. Itu akan bagus untuk Etherean yang berpengalaman. Tapi kami mencoba melayani [miliaran orang lainnya](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Ini tidak akan terjadi tanpa pengalaman pengguna yang hebat, dan antarmuka pengguna yang ramah adalah bagian besar dari itu.

## Aplikasi Greeter {#greeter-app}

Ada banyak teori di balik cara kerja UI modern, dan [banyak situs bagus](https://react.dev/learn/thinking-in-react) [yang menjelaskannya](https://wagmi.sh/core/getting-started). Daripada mengulangi pekerjaan bagus yang dilakukan oleh situs-situs tersebut, saya akan berasumsi Anda lebih suka belajar sambil melakukan dan memulai dengan aplikasi yang dapat Anda mainkan. Anda masih memerlukan teori untuk menyelesaikan berbagai hal, dan kita akan membahasnya - kita akan membahasnya satu per satu dari file sumber, dan mendiskusikan berbagai hal saat kita membahasnya.

### Instalasi {#installation}

1. Jika perlu, tambahkan [rantai blok Holesky](https://chainlist.org/?search=holesky&testnets=true) ke dompet Anda dan [dapatkan ETH uji](https://www.holeskyfaucet.io/).

2. Kloning repositori github.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Instal paket yang diperlukan.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Mulai aplikasi.

   ```sh
   pnpm dev
   ```

5. Telusuri URL yang ditampilkan oleh aplikasi. Dalam kebanyakan kasus, URLnya adalah [http://localhost:5173/](http://localhost:5173/).

6. Anda dapat melihat kode sumber kontrak, versi Greeter Hardhat yang sedikit dimodifikasi, [di penjelajah rantai blok](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### Penelusuran file {#file-walk-through}

#### `index.html` {#index-html}

File ini adalah boilerplate HTML standar kecuali untuk baris ini, yang mengimpor file skrip.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Ekstensi file memberi tahu kita bahwa file ini adalah [komponen React](https://www.w3schools.com/react/react_components.asp) yang ditulis dalam [TypeScript](https://www.typescriptlang.org/), sebuah ekstensi dari JavaScript yang mendukung [pemeriksaan tipe](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript dikompilasi menjadi JavaScript, jadi kita dapat menggunakannya untuk eksekusi sisi klien.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Impor kode pustaka yang kita butuhkan.

```tsx
import { App } from './App'
```

Impor komponen React yang mengimplementasikan aplikasi (lihat di bawah).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Buat komponen root React. Parameter untuk `render` adalah [JSX](https://www.w3schools.com/react/react_jsx.asp), bahasa ekstensi yang menggunakan HTML dan JavaScript/TypeScript. Tanda seru di sini memberi tahu komponen TypeScript: "Anda tidak tahu bahwa `document.getElementById('root')` akan menjadi parameter yang valid untuk `ReactDOM.createRoot`, tetapi jangan khawatir - saya adalah pengembang dan saya memberi tahu Anda itu akan ada".

```tsx
  <React.StrictMode>
```

Aplikasi ini masuk ke dalam [komponen `React.StrictMode`](https://react.dev/reference/react/StrictMode). Komponen ini memberi tahu pustaka React untuk menyisipkan pemeriksaan debug tambahan, yang berguna selama pengembangan.

```tsx
    <WagmiConfig config={config}>
```

Aplikasi ini juga berada di dalam [komponen `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). [Pustaka wagmi (we are going to make it)](https://wagmi.sh/) menghubungkan definisi UI React dengan [pustaka viem](https://viem.sh/) untuk menulis aplikasi terdesentralisasi Ethereum.

```tsx
      <RainbowKitProvider chains={chains}>
```

Dan akhirnya, [komponen `RainbowKitProvider`](https://www.rainbowkit.com/). Komponen ini menangani proses masuk dan komunikasi antara dompet dan aplikasi.

```tsx
        <App />
```

Sekarang kita bisa memiliki komponen untuk aplikasi, yang sebenarnya mengimplementasikan UI. Simbol `/>` di akhir komponen memberi tahu React bahwa komponen ini tidak memiliki definisi di dalamnya, sesuai dengan standar XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Tentu saja, kita harus menutup komponen lainnya.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

Ini adalah cara standar untuk membuat komponen React - mendefinisikan fungsi yang dipanggil setiap kali perlu dirender. Fungsi ini biasanya memiliki beberapa kode TypeScript atau JavaScript di atas, diikuti oleh pernyataan `return` yang mengembalikan kode JSX.

```tsx
  const { isConnected } = useAccount()
```

Di sini kita menggunakan [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) untuk memeriksa apakah kita terhubung ke rantai blok melalui dompet atau tidak.

Berdasarkan konvensi, dalam fungsi React yang disebut `use...` adalah [hook](https://www.w3schools.com/react/react_hooks.asp) yang mengembalikan beberapa jenis data. Ketika Anda menggunakan hook seperti itu, komponen Anda tidak hanya mendapatkan data, tetapi ketika data itu berubah, komponen akan dirender ulang dengan informasi yang diperbarui.

```tsx
  return (
    <>
```

JSX dari komponen React _harus_ mengembalikan satu komponen. Ketika kita memiliki beberapa komponen dan kita tidak memiliki apa pun yang membungkus "secara alami", kita menggunakan komponen kosong (`<> ...` </>`) untuk menjadikannya satu komponen.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Kita mendapatkan [komponen `ConnectButton`](https://www.rainbowkit.com/docs/connect-button) dari RainbowKit. Ketika kita tidak terhubung, itu memberi kita tombol `Hubungkan Dompet` yang membuka modal yang menjelaskan tentang dompet dan memungkinkan Anda memilih mana yang Anda gunakan. Ketika kita terhubung, itu menampilkan rantai blok yang kita gunakan, alamat akun kita, dan saldo ETH kita. Kita dapat menggunakan tampilan ini untuk beralih jaringan atau memutuskan koneksi.

```tsx
      {isConnected && (
```

Ketika kita perlu memasukkan JavaScript aktual (atau TypeScript yang akan dikompilasi ke JavaScript) ke dalam JSX, kita menggunakan kurung kurawal (`{}`).

Sintaks `a && b` adalah singkatan dari [`a ?` `b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). Artinya, jika `a` bernilai benar, maka akan dievaluasi menjadi `b` dan sebaliknya akan dievaluasi menjadi `a` (yang bisa berupa `false`, `0`, dll). Ini adalah cara mudah untuk memberi tahu React bahwa sebuah komponen hanya boleh ditampilkan jika kondisi tertentu terpenuhi.

Dalam kasus ini, kami hanya ingin menampilkan `Greeter` kepada pengguna jika pengguna terhubung ke rantai blok.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

File ini berisi sebagian besar fungsionalitas UI. Ini mencakup definisi yang biasanya berada di beberapa file, tetapi karena ini adalah tutorial, program ini dioptimalkan agar mudah dipahami untuk pertama kalinya, daripada kinerja atau kemudahan pemeliharaan.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Kami menggunakan fungsi pustaka ini. Sekali lagi, mereka dijelaskan di bawah ini di mana mereka digunakan.

```tsx
import { AddressType } from 'abitype'
```

[Pustaka `abitype`](https://abitype.dev/) memberi kami definisi TypeScript untuk berbagai tipe data Ethereum, seperti [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

ABI untuk kontrak `Greeter`.
Jika Anda mengembangkan kontrak dan UI pada saat yang sama, Anda biasanya akan meletakkannya di repositori yang sama dan menggunakan ABI yang dihasilkan oleh kompiler Solidity sebagai file dalam aplikasi Anda. Namun, ini tidak diperlukan di sini karena kontrak sudah dikembangkan dan tidak akan berubah.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript memiliki tipe yang kuat. Kami menggunakan definisi ini untuk menentukan alamat di mana kontrak `Greeter` diterapkan pada rantai yang berbeda. Kuncinya adalah angka (chainId), dan nilainya adalah `AddressType` (sebuah alamat).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

Alamat kontrak di dua jaringan yang didukung: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) dan [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Catatan: Sebenarnya ada definisi ketiga, untuk Redstone Holesky, akan dijelaskan di bawah ini.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Tipe ini digunakan sebagai parameter untuk komponen `ShowObject` (dijelaskan nanti). Ini mencakup nama objek dan nilainya, yang ditampilkan untuk tujuan debugging.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

Setiap saat kita mungkin tahu apa sapaannya (karena kita membacanya dari rantai blok) atau tidak tahu (karena kita belum menerimanya). Jadi berguna untuk memiliki tipe yang bisa berupa string atau tidak sama sekali.

##### Komponen `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Akhirnya, kita mendefinisikan komponennya.

```tsx
  const { chain } = useNetwork()
```

Informasi tentang rantai yang kita gunakan, berkat [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Karena ini adalah hook (`use...`), setiap kali informasi ini berubah, komponen akan digambar ulang.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Alamat kontrak Greeter, yang bervariasi berdasarkan rantai (dan yang `undefined` jika kita tidak memiliki informasi rantai atau kita berada di rantai tanpa kontrak tersebut).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // Tanpa argumen
    watch: true
  })
```

[Hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) membaca informasi dari sebuah kontrak. Anda dapat melihat dengan tepat informasi apa yang dikembalikannya dengan memperluas `readResults` di UI. Dalam hal ini, kita ingin ia terus mencari sehingga kita akan diberi tahu saat sapaan berubah.

**Catatan:** Kita dapat mendengarkan [aksi `setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) untuk mengetahui kapan sapaan berubah dan memperbaruinya dengan cara itu. Namun, meskipun mungkin lebih efisien, hal ini tidak akan berlaku dalam semua kasus. Ketika pengguna beralih ke rantai yang berbeda, sapaan juga berubah, tetapi perubahan itu tidak disertai dengan aksi. Kita bisa memiliki satu bagian dari kode yang mendengarkan aksi dan bagian lain untuk mengidentifikasi perubahan rantai, tetapi itu akan lebih rumit daripada hanya mengatur [parameter `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

[Hook `useState` dari React](https://www.w3schools.com/react/react_usestate.asp) memungkinkan kita untuk menentukan variabel state, yang nilainya tetap ada dari satu rendering komponen ke rendering lainnya. Nilai awalnya adalah parameter, dalam hal ini string kosong.

Hook `useState` mengembalikan daftar dengan dua nilai:

1. Nilai saat ini dari variabel state.
2. Fungsi untuk memodifikasi variabel state bila diperlukan. Karena ini adalah hook, setiap kali dipanggil, komponen akan dirender lagi.

Dalam kasus ini, kita menggunakan variabel state untuk sapaan baru yang ingin diatur oleh pengguna.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Ini adalah penangan peristiwa saat bidang masukan sapaan baru berubah. Tipe [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), menentukan bahwa ini adalah penangan untuk perubahan nilai dari elemen masukan HTML. Bagian `<HTMLInputElement>` digunakan karena ini adalah [tipe generik](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Ini adalah proses untuk mengirimkan transaksi rantai blok dari perspektif klien:

1. Kirim transaksi ke simpul di rantai blok menggunakan [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Tunggu respons dari simpul.
3. Ketika respons diterima, minta pengguna untuk menandatangani transaksi melalui dompet. Langkah ini _harus_ terjadi setelah respons simpul diterima karena pengguna akan ditunjukkan biaya gas dari transaksi sebelum menandatanganinya.
4. Tunggu persetujuan pengguna.
5. Kirim transaksi lagi, kali ini menggunakan [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Langkah 2 kemungkinan akan memakan waktu yang cukup lama, di mana pengguna akan bertanya-tanya apakah perintah mereka benar-benar diterima oleh antarmuka pengguna dan mengapa mereka belum diminta untuk menandatangani transaksi. Itu membuat pengalaman pengguna (UX) yang buruk.

Solusinya adalah menggunakan [hook persiapan](https://wagmi.sh/react/prepare-hooks). Setiap kali parameter berubah, segera kirim permintaan `eth_estimateGas` ke simpul. Kemudian, ketika pengguna benar-benar ingin mengirim transaksi (dalam hal ini dengan menekan **Perbarui sapaan**), biaya gas sudah diketahui dan pengguna dapat langsung melihat halaman dompet.

```tsx
  return (
```

Sekarang kita akhirnya bisa membuat HTML aktual untuk dikembalikan.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Buat komponen `ShowGreeting` (dijelaskan di bawah), tetapi hanya jika sapaan berhasil dibaca dari blockchain.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Ini adalah bidang teks masukan tempat pengguna dapat mengatur sapaan baru. Setiap kali pengguna menekan sebuah tombol, kita memanggil `greetingChange` yang memanggil `setNewGreeting`. Karena `setNewGreeting` berasal dari hook `useState`, hal itu menyebabkan komponen `Greeter` dirender ulang. Ini berarti bahwa:

- Kita perlu menentukan `value` untuk menjaga nilai sapaan baru, karena jika tidak, itu akan kembali ke default, yaitu string kosong.
- `usePrepareContractWrite` dipanggil setiap kali `newGreeting` berubah, yang berarti ia akan selalu memiliki `newGreeting` terbaru dalam transaksi yang disiapkan.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Perbarui sapaan
      </button>
```

Jika tidak ada `workingTx.write` maka kita masih menunggu informasi yang diperlukan untuk mengirimkan pembaruan sapaan, jadi tombol dinonaktifkan. Jika ada nilai `workingTx.write`, maka itu adalah fungsi yang harus dipanggil untuk mengirim transaksi.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Akhirnya, untuk membantu Anda melihat apa yang kami lakukan, tunjukkan tiga objek yang kami gunakan:

- `readResults`
- `preparedTx`
- `workingTx`

##### Komponen `ShowGreeting` {#showgreeting-component}

Komponen ini menunjukkan

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

Sebuah fungsi komponen menerima parameter dengan semua atribut komponen.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### Komponen `ShowObject` {#showobject-component}

Untuk tujuan informasi, kami menggunakan komponen `ShowObject` untuk menampilkan objek penting (`readResults` untuk membaca sapaan dan `preparedTx` serta `workingTx` untuk transaksi yang kami buat).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Kami tidak ingin mengacaukan UI dengan semua informasi, jadi untuk memungkinkan untuk melihatnya atau menutupnya, kami menggunakan tag [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

Sebagian besar bidang ditampilkan menggunakan [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Fungsi:
          <ul>
```

Pengecualiannya adalah fungsi, yang bukan bagian dari [standar JSON](https://www.json.org/json-en.html), jadi harus ditampilkan secara terpisah.

```tsx
          {funs.map((f, i) =>
```

Di dalam JSX, kode di dalam `{` kurung kurawal `}` diinterpretasikan sebagai JavaScript. Kemudian, kode di dalam `(` kurung biasa `)`, diinterpretasikan lagi sebagai JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React mengharuskan tag dalam [Pohon DOM](https://www.w3schools.com/js/js_htmldom.asp) memiliki pengidentifikasi yang berbeda. Ini berarti bahwa turunan dari tag yang sama (dalam hal ini, [daftar tak berurutan](https://www.w3schools.com/tags/tag_ul.asp)), memerlukan atribut `key` yang berbeda.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Akhiri berbagai tag HTML.

##### `export` terakhir {#the-final-export}

```tsx
export { Greeter }
```

Komponen `Greeter` adalah yang perlu kita ekspor untuk aplikasi.

#### `src/wagmi.ts` {#wagmi-ts}

Akhirnya, berbagai definisi yang terkait dengan WAGMI ada di `src/wagmi.ts`. Saya tidak akan menjelaskan semuanya di sini, karena sebagian besarnya adalah boilerplate yang kemungkinan tidak perlu Anda ubah.

Kode di sini tidak persis sama seperti [di github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) karena nanti di artikel ini kita akan menambahkan rantai lain ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Impor rantai blok yang didukung oleh aplikasi. Anda dapat melihat daftar rantai yang didukung [di github viem](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Untuk dapat menggunakan [WalletConnect](https://walletconnect.com/), Anda memerlukan ID proyek untuk aplikasi Anda. Anda bisa mendapatkannya di [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### Menambahkan rantai blok lain {#add-blockchain}

Saat ini ada banyak [solusi penskalaan L2](/layer-2/), dan Anda mungkin ingin mendukung beberapa yang belum didukung viem. Untuk melakukannya, Anda mengubah `src/wagmi.ts`. Instruksi ini menjelaskan cara menambahkan [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Impor tipe `defineChain` dari viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Tambahkan definisi jaringan.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. Tambahkan rantai baru ke panggilan `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Pastikan aplikasi mengetahui alamat untuk kontrak Anda di jaringan baru. Dalam kasus ini, kami memodifikasi `src/components/Greeter.tsx`:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## Kesimpulan {#conclusion}

Tentu saja, Anda tidak terlalu peduli tentang menyediakan antarmuka pengguna untuk `Greeter`. Anda ingin membuat antarmuka pengguna untuk kontrak Anda sendiri. Untuk membuat aplikasi Anda sendiri, jalankan langkah-langkah berikut:

1. Tentukan untuk membuat aplikasi wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. Beri nama aplikasi.

3. Pilih kerangka kerja **React**.

4. Pilih varian **Vite**.

5. Anda dapat [menambahkan Rainbow kit](https://www.rainbowkit.com/docs/installation#manual-setup).

Sekarang pergilah dan buat kontrak Anda dapat digunakan oleh seluruh dunia.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).

