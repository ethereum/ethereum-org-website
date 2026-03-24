---
title: "Building a user interface for your contract"
description: Menggunakan komponen modern seperti TypeScript, React, Vite, dan Wagmi, kita akan membahas antarmuka pengguna yang modern namun minimalis, dan mempelajari cara menghubungkan dompet ke antarmuka pengguna, memanggil kontrak pintar untuk membaca informasi, mengirim transaksi ke kontrak pintar, dan memantau peristiwa dari kontrak pintar untuk mengidentifikasi perubahan.
author: Ori Pomerantz
tags: ["TypeScript", "react", "vite", "wagmi", "frontend"]
skill: beginner
published: 2023-11-01
lang: id
sidebarDepth: 3
---

Anda menemukan fitur yang kita butuhkan di ekosistem Ethereum. Anda menulis kontrak pintar untuk mengimplementasikannya, dan mungkin juga beberapa kode terkait yang berjalan offchain. Ini luar biasa! Sayangnya, tanpa antarmuka pengguna, Anda tidak akan memiliki pengguna, dan terakhir kali Anda menulis situs web, orang-orang menggunakan modem dial-up dan JavaScript masih baru.

Artikel ini untuk Anda. Saya berasumsi Anda tahu pemrograman, dan mungkin sedikit JavaScript dan HTML, tetapi keterampilan antarmuka pengguna Anda sudah berkarat dan ketinggalan zaman. Bersama-sama kita akan membahas aplikasi modern yang sederhana sehingga Anda akan melihat bagaimana hal itu dilakukan saat ini.

## Mengapa ini penting {#why-important}

Secara teori, Anda bisa saja meminta orang menggunakan [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) atau [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) untuk berinteraksi dengan kontrak Anda. Itu bagus untuk para pengguna Ethereum yang berpengalaman. Namun, kita mencoba melayani [satu miliar orang lainnya](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Ini tidak akan terjadi tanpa pengalaman pengguna yang luar biasa, dan antarmuka pengguna yang ramah adalah bagian besar dari hal tersebut.

## Aplikasi Greeter {#greeter-app}

Ada banyak teori di balik cara kerja UI modern, dan [banyak situs bagus](https://react.dev/learn/thinking-in-react) [yang menjelaskannya](https://wagmi.sh/core/getting-started). Daripada mengulangi pekerjaan luar biasa yang dilakukan oleh situs-situs tersebut, saya akan berasumsi bahwa Anda lebih suka belajar dengan mempraktikkannya dan memulai dengan aplikasi yang dapat Anda mainkan. Anda tetap membutuhkan teori untuk menyelesaikan sesuatu, dan kita akan membahasnya - kita hanya akan membahas file sumber demi file sumber, dan mendiskusikan berbagai hal saat kita menemukannya.

### Instalasi {#installation}

1. Aplikasi ini menggunakan jaringan testnet [Sepolia](https://sepolia.dev/). Jika perlu, [dapatkan ETH uji coba Sepolia](/developers/docs/networks/#sepolia) dan [tambahkan Sepolia ke dompet Anda](https://chainlist.org/chain/11155111).

2. Klon repositori GitHub dan instal paket-paket yang diperlukan.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
```

3. Aplikasi ini menggunakan titik akses gratis, yang memiliki batasan kinerja. Jika Anda ingin menggunakan penyedia [Node sebagai layanan](/developers/docs/nodes-and-clients/nodes-as-a-service/), ganti URL di [`src/wagmi.ts`](#wagmi-ts).

4. Mulai aplikasi.

   ```sh
   npm run dev
```

5. Buka URL yang ditampilkan oleh aplikasi. Dalam kebanyakan kasus, URL tersebut adalah [http://localhost:5173/](http://localhost:5173/).

6. Anda dapat melihat kode sumber kontrak, versi modifikasi dari Greeter milik Hardhat, [di penjelajah blok](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Panduan file {#file-walk-through}

#### `index.html` {#index-html}

File ini adalah boilerplate HTML standar kecuali untuk baris ini, yang mengimpor file skrip.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Ekstensi file menunjukkan bahwa ini adalah [komponen React](https://www.w3schools.com/react/react_components.asp) yang ditulis dalam [TypeScript](https://www.typescriptlang.org/), sebuah ekstensi dari JavaScript yang mendukung [pemeriksaan tipe](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript dikompilasi menjadi JavaScript, sehingga kita dapat menggunakannya di sisi klien.

File ini sebagian besar dijelaskan jika Anda tertarik. Biasanya Anda tidak memodifikasi file ini, melainkan [`src/App.tsx`](#app-tsx) dan file-file yang diimpornya.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Impor kode pustaka yang kita butuhkan.

```tsx
import App from './App.tsx'
```

Impor komponen React yang mengimplementasikan aplikasi (lihat di bawah).

```tsx
import { config } from './wagmi.ts'
```

Impor konfigurasi [wagmi](https://wagmi.sh/), yang mencakup konfigurasi blockchain.

```tsx
const queryClient = new QueryClient()
```

Membuat instans baru dari manajer cache [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Objek ini akan menyimpan:

- Panggilan RPC yang di-cache
- Pembacaan kontrak
- Status pengambilan ulang di latar belakang

Kita membutuhkan manajer cache karena wagmi v3 menggunakan React Query secara internal.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Buat komponen React root. Parameter untuk `render` adalah [JSX](https://www.w3schools.com/react/react_jsx.asp), bahasa ekstensi yang menggunakan HTML dan JavaScript/TypeScript. Tanda seru di sini memberi tahu komponen TypeScript: "Anda tidak tahu bahwa `document.getElementById('root')` akan menjadi parameter yang valid untuk `ReactDOM.createRoot`, tetapi jangan khawatir - saya adalah pengembangnya dan saya memberi tahu Anda bahwa itu akan ada".

```tsx
  <React.StrictMode>
```

Aplikasi ini akan berada di dalam [komponen `React.StrictMode`](https://react.dev/reference/react/StrictMode). Komponen ini memberi tahu pustaka React untuk menyisipkan pemeriksaan debugging tambahan, yang berguna selama pengembangan.

```tsx
    <WagmiProvider config={config}>
```

Aplikasi ini juga berada di dalam [komponen `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). [Pustaka wagmi (we are going to make it)](https://wagmi.sh/) menghubungkan definisi UI React dengan [pustaka viem](https://viem.sh/) untuk menulis aplikasi terdesentralisasi Ethereum.

```tsx
      <QueryClientProvider client={queryClient}>
```

Dan terakhir, tambahkan penyedia React Query sehingga komponen aplikasi apa pun dapat menggunakan kueri yang di-cache.

```tsx
        <App />
```

Sekarang kita dapat memiliki komponen untuk aplikasi, yang sebenarnya mengimplementasikan UI. Tanda `/>` di akhir komponen memberi tahu React bahwa komponen ini tidak memiliki definisi apa pun di dalamnya, sesuai dengan standar XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Tentu saja, kita harus menutup komponen lainnya.

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

Impor pustaka yang kita butuhkan, serta [komponen `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

ID chain Sepolia.

```
function App() {
```

Ini adalah cara standar untuk membuat komponen React: tentukan fungsi yang dipanggil setiap kali perlu dirender. Fungsi ini biasanya berisi kode TypeScript atau JavaScript, diikuti oleh pernyataan `return` yang mengembalikan kode JSX.

```tsx
  const connection = useConnection()
```

Gunakan [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) untuk mendapatkan informasi terkait koneksi saat ini, seperti alamat dan `chainId`.

Berdasarkan konvensi, dalam React fungsi yang disebut `use...` adalah [hooks](https://www.w3schools.com/react/react_hooks.asp). Fungsi-fungsi ini tidak hanya mengembalikan data ke komponen; mereka juga memastikan komponen tersebut dirender ulang (fungsi komponen dieksekusi lagi, dan outputnya menggantikan yang sebelumnya di HTML) ketika data tersebut berubah.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Gunakan [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) untuk mendapatkan informasi tentang koneksi dompet.

```tsx
  const { disconnect } = useDisconnect()
```

[Hook ini](https://wagmi.sh/react/api/hooks/useDisconnect) memberi kita fungsi untuk memutuskan koneksi dari dompet.

```tsx
  const { switchChain } = useSwitchChain()
```

[Hook ini](https://wagmi.sh/react/api/hooks/useSwitchChain) memungkinkan kita beralih chain.

```tsx
  useEffect(() => {
```

Hook React [`useEffect`](https://react.dev/reference/react/useEffect) memungkinkan Anda menjalankan fungsi setiap kali nilai variabel berubah untuk menyinkronkan sistem eksternal.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Jika kita terhubung, tetapi tidak ke blockchain Sepolia, beralihlah ke Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Jalankan ulang fungsi setiap kali status koneksi atau chainId koneksi berubah.

```tsx
  return (
    <>
```

JSX dari komponen React _harus_ mengembalikan satu komponen HTML. Ketika kita memiliki beberapa komponen dan tidak memerlukan wadah untuk membungkus semuanya, kita menggunakan komponen kosong (`<> ... </>`) untuk menggabungkannya menjadi satu komponen.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
</div>
```

Berikan informasi tentang koneksi saat ini. Di dalam JSX, `{<expression>}` berarti mengevaluasi ekspresi sebagai JavaScript.

```tsx
      {connection.status === 'connected' && (
```

Sintaks `{<condition> && <value>} berarti "jika kondisinya `true`, evaluasi menjadi nilai tersebut; jika tidak, evaluasi menjadi `false`".

Ini adalah cara standar untuk meletakkan pernyataan if di dalam JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX mengikuti standar XML, yang lebih ketat daripada HTML. Jika sebuah tag tidak memiliki tag penutup yang sesuai, tag tersebut _harus_ memiliki garis miring (`/`) di bagian akhir untuk mengakhirinya.

Di sini kita memiliki dua tag semacam itu, `<Greeter />` (yang sebenarnya berisi kode HTML yang berkomunikasi dengan kontrak) dan [`<hr />` untuk garis horizontal](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
</div>
      )}
```

Jika pengguna mengklik tombol ini, panggil fungsi `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

Jika kita _tidak_ terhubung, tampilkan opsi yang diperlukan untuk terhubung ke dompet.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

Di `connectors` kita memiliki daftar konektor. Kita menggunakan [`map`](https://www.w3schools.com/jsref/jsref_map.asp) untuk mengubahnya menjadi daftar tombol JSX untuk ditampilkan.

```tsx
            <button
              key={connector.uid}
```

Dalam JSX, tag "saudara" (tag yang diturunkan dari induk yang sama) perlu memiliki pengidentifikasi yang berbeda.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Tombol-tombol konektor.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

Berikan informasi tambahan. Sintaks ekspresi `<variable>?.<field>` memberi tahu JavaScript bahwa jika variabel tersebut didefinisikan, evaluasi ke bidang tersebut. Jika variabel tidak didefinisikan, maka ekspresi ini dievaluasi menjadi `undefined`.

Ekspresi `error.message`, ketika tidak ada kesalahan, akan memunculkan pengecualian. Menggunakan `error?.message` memungkinkan kita menghindari masalah ini.

#### `src/Greeter.tsx` {#greeter-tsx}

File ini berisi sebagian besar fungsionalitas UI. Ini mencakup definisi yang biasanya berada di beberapa file, tetapi karena ini adalah tutorial, program ini dioptimalkan agar mudah dipahami pada kali pertama, daripada kinerja atau kemudahan pemeliharaan.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

Kita menggunakan fungsi-fungsi pustaka ini. Sekali lagi, fungsi-fungsi tersebut dijelaskan di bawah ini di mana mereka digunakan.

```tsx
import { AddressType } from 'abitype'
```

[Pustaka `abitype`](https://abitype.dev/) memberi kita definisi TypeScript untuk berbagai tipe data Ethereum, seperti [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI // greeterABI
```

ABI untuk kontrak `Greeter`.
Jika Anda mengembangkan kontrak dan UI pada saat yang sama, Anda biasanya akan meletakkannya di repositori yang sama dan menggunakan ABI yang dihasilkan oleh kompiler Solidity sebagai file dalam aplikasi Anda. Namun, ini tidak diperlukan di sini karena kontrak sudah dikembangkan dan tidak akan berubah.

Kita menggunakan [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) untuk memberi tahu TypeScript bahwa ini adalah konstanta yang _sebenarnya_. Biasanya, ketika Anda menentukan dalam JavaScript `const x = {"a": 1}`, Anda dapat mengubah nilai dalam `x`, Anda hanya tidak dapat menetapkan ulang nilainya.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript diketik dengan kuat (strongly typed). Kita menggunakan definisi ini untuk menentukan alamat di mana kontrak `Greeter` diterapkan di berbagai chain. Kuncinya adalah angka (chainId), dan nilainya adalah `AddressType` (sebuah alamat).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

Alamat kontrak di [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### Komponen `Timer` {#timer-component}

Komponen `Timer` menunjukkan jumlah detik sejak waktu tertentu. Ini penting untuk tujuan kegunaan. Ketika pengguna melakukan sesuatu, mereka mengharapkan reaksi langsung. Dalam blockchain, ini sering kali tidak mungkin karena tidak ada yang terjadi sampai transaksi ditempatkan di dalam blok. Salah satu solusinya adalah dengan menunjukkan sudah berapa lama sejak pengguna melakukan tindakan tersebut, sehingga pengguna dapat memutuskan apakah waktu yang dibutuhkan masuk akal.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

Komponen `Timer` mengambil satu parameter, `lastUpdate`, yang merupakan waktu dari tindakan terakhir.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Kita perlu memiliki status (variabel yang terikat pada komponen) dan memperbaruinya agar komponen berfungsi dengan benar. Namun kita tidak pernah perlu membacanya, jadi tidak perlu repot-repot membuat variabel.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

Fungsi [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) memungkinkan kita menjadwalkan fungsi untuk berjalan secara berkala. Dalam hal ini, setiap detik. Fungsi ini memanggil `setNow` untuk memperbarui status, sehingga komponen `Timer` akan dirender ulang. Kita membungkus ini di dalam [`useEffect`](https://react.dev/reference/react/useEffect) dengan daftar dependensi kosong sehingga ini hanya akan terjadi sekali, bukan setiap kali komponen dirender.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Hitung jumlah detik sejak pembaruan terakhir dan kembalikan nilainya.

##### Komponen `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Akhirnya, kita dapat mendefinisikan komponen tersebut.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Informasi tentang chain dan akun yang kita gunakan, berkat [wagmi](https://wagmi.sh/). Karena ini adalah hook (`use...`), komponen dirender ulang setiap kali informasi ini berubah.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Alamat kontrak Greeter, yang bernilai `undefined` jika kita tidak memiliki informasi chain, atau kita berada di chain tanpa kontrak tersebut.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // No arguments // Tidak ada argumen
  })
```

[Hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) memanggil fungsi `greet` dari [kontrak tersebut](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

[Hook `useState`](https://www.w3schools.com/react/react_usestate.asp) dari React memungkinkan kita menentukan variabel status, yang nilainya bertahan dari satu rendering komponen ke rendering lainnya. Nilai awalnya adalah parameter, dalam hal ini string kosong.

Hook `useState` mengembalikan daftar dengan dua nilai:

1. Nilai saat ini dari variabel status.
2. Fungsi untuk memodifikasi variabel status saat dibutuhkan. Karena ini adalah hook, setiap kali dipanggil, komponen akan dirender lagi.

Dalam hal ini, kita menggunakan variabel status untuk sapaan baru yang ingin ditetapkan oleh pengguna.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Jika beberapa pengguna menggunakan kontrak yang sama pada saat yang sama, mereka mungkin menimpa sapaan satu sama lain. Ini akan terlihat oleh pengguna seolah-olah aplikasi tidak berfungsi. Jika aplikasi menunjukkan siapa yang terakhir menetapkan sapaan, pengguna akan tahu bahwa itu adalah orang lain dan bahwa aplikasi berfungsi dengan benar.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Pengguna suka melihat bahwa tindakan mereka memiliki efek langsung. Namun, di blockchain, hal ini tidak terjadi. Variabel status ini memungkinkan kita setidaknya menampilkan sesuatu kepada pengguna sehingga mereka akan tahu bahwa tindakan mereka sedang diproses.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Jika `readResults` di atas mengubah data dan tidak diatur ke nilai salah (misalnya `undefined`), perbarui sapaan saat ini ke sapaan yang dibaca dari blockchain. Selain itu, perbarui statusnya.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Dengarkan peristiwa `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` berarti bahwa jika nilainya `false`, atau nilai yang dievaluasi sebagai salah, seperti `undefined`, `0`, atau string kosong, ekspresi secara keseluruhan adalah `false`. Untuk nilai lainnya, itu adalah `true`. Ini adalah cara untuk mengonversi nilai menjadi boolean, karena jika tidak ada `greeterAddr`, kita tidak ingin mendengarkan peristiwa.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Ketika kita melihat log (yang terjadi ketika kita melihat peristiwa baru), itu berarti sapaan telah dimodifikasi. Dalam hal itu, kita dapat memperbarui `currentGreeting` dan `lastSetterAddress` ke nilai baru. Selain itu, kita ingin memperbarui tampilan status.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Ketika kita memperbarui status, kita ingin melakukan dua hal:

1. Memperbarui string status (`status`)
2. Memperbarui waktu pembaruan status terakhir (`statusTime`) menjadi sekarang.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Ini adalah penangan peristiwa untuk perubahan pada bidang input sapaan baru. Kita bisa menentukan tipe parameter `evt`, tetapi TypeScript adalah bahasa dengan tipe opsional. Karena fungsi ini hanya dipanggil sekali, dalam penangan peristiwa HTML, saya rasa itu tidak perlu.

```tsx
  const { writeContractAsync } = useWriteContract()
```

Fungsi untuk menulis ke kontrak. Ini mirip dengan [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), tetapi memungkinkan pembaruan status yang lebih baik.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Ini adalah proses untuk mengirimkan transaksi blockchain dari perspektif klien:

1. Kirim transaksi ke node di blockchain menggunakan [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Tunggu respons dari node.
3. Ketika respons diterima, minta pengguna untuk menandatangani transaksi melalui dompet. Langkah ini _harus_ terjadi setelah respons node diterima karena pengguna akan ditunjukkan biaya gas dari transaksi sebelum menandatanganinya.
4. Tunggu pengguna untuk menyetujui.
5. Kirim transaksi lagi, kali ini menggunakan [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Langkah 2 kemungkinan akan memakan waktu yang cukup lama, di mana pengguna mungkin bertanya-tanya apakah perintah mereka diterima oleh antarmuka pengguna dan mengapa mereka belum diminta untuk menandatangani transaksi. Hal itu menciptakan pengalaman pengguna (UX) yang buruk.

Salah satu solusinya adalah mengirimkan `eth_estimateGas` setiap kali parameter berubah. Kemudian, ketika pengguna benar-benar ingin mengirim transaksi (dalam hal ini dengan menekan **Update greeting**), biaya gas sudah diketahui, dan pengguna dapat segera melihat halaman dompet.

```tsx
  return (
```

Sekarang kita akhirnya dapat membuat HTML aktual untuk dikembalikan.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Tampilkan sapaan saat ini.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Jika kita tahu siapa yang terakhir menetapkan sapaan, tampilkan informasi tersebut. `Greeter` tidak melacak informasi ini, dan kita tidak ingin melihat kembali peristiwa `SetGreeting`, jadi kita hanya mendapatkannya setelah sapaan diubah saat kita sedang berjalan.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Ini adalah bidang teks input di mana pengguna dapat menetapkan sapaan baru. Setiap kali pengguna menekan tombol, kita memanggil `greetingChange`, yang memanggil `setNewGreeting`. Karena `setNewGreeting` berasal dari `useState`, ini menyebabkan komponen `Greeter` dirender ulang. Ini berarti bahwa:

- Kita perlu menentukan `value` untuk menyimpan nilai sapaan baru, karena jika tidak, nilainya akan kembali ke default, yaitu string kosong.
- `simulation` juga diperbarui setiap kali `newGreeting` berubah, yang berarti kita akan mendapatkan simulasi dengan sapaan yang benar. Ini bisa relevan karena biaya gas bergantung pada ukuran data panggilan, yang bergantung pada panjang string.

```tsx
      <button disabled={!simulation.data}
```

Hanya aktifkan tombol setelah kita memiliki informasi yang kita butuhkan untuk mengirim transaksi.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Perbarui status. Pada titik ini, pengguna perlu mengonfirmasi di dompet.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` hanya mengembalikan nilai setelah transaksi benar-benar dikirim. Ini memungkinkan kita menunjukkan kepada pengguna sudah berapa lama transaksi menunggu untuk dimasukkan ke dalam blockchain.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Tampilkan status dan sudah berapa lama sejak status tersebut diperbarui.

```
export {Greeter}
```

Ekspor komponen.

#### `src/wagmi.ts` {#wagmi-ts}

Terakhir, berbagai definisi terkait wagmi ada di `src/wagmi.ts`. Saya tidak akan menjelaskan semuanya di sini, karena sebagian besar adalah boilerplate yang kemungkinan tidak perlu Anda ubah.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Konfigurasi wagmi mencakup chain yang didukung oleh aplikasi ini. Anda dapat melihat [daftar chain yang tersedia](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

[Konektor ini](https://wagmi.sh/core/api/connectors/injected) memungkinkan kita berkomunikasi dengan dompet yang diinstal di browser.

```ts
  transports: {
    [sepolia.id]: http()
```

Titik akhir HTTP default yang disertakan dengan Viem sudah cukup baik. Jika kita menginginkan URL yang berbeda, kita dapat menggunakan `http("https:// hostname ")` atau `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Menambahkan blockchain lain {#add-blockchain}

Saat ini ada banyak [solusi peningkatan L2](https://ethereum.org/layer-2/), dan Anda mungkin ingin mendukung beberapa yang belum didukung oleh viem. Untuk melakukannya, Anda memodifikasi `src/wagmi.ts`. Instruksi ini menjelaskan cara menambahkan [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  Edit `src/wagmi.ts`

    A. Impor tipe `defineChain` dari viem.

          ```ts
          import { defineChain } from 'viem'
```

    B. Tambahkan definisi jaringan. Anda sebenarnya tidak perlu melakukan ini untuk Optimism Sepolia, [itu sudah ada di `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), tetapi dengan cara ini Anda belajar cara menambahkan blockchain yang tidak ada di `viem`.

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
```

    C. Tambahkan chain baru ke panggilan `createConfig`.

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
```

2.  Edit `src/App.tsx` untuk mengomentari peralihan otomatis ke Sepolia. Pada sistem produksi, Anda mungkin akan menampilkan tombol dengan tautan ke masing-masing blockchain yang Anda dukung.

    ```ts
    /* useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId]) */
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
```

3.  Edit `src/Greeter.tsx` untuk memastikan bahwa aplikasi mengetahui alamat untuk kontrak Anda di jaringan baru.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
```

4.  Di browser Anda.

    A. Buka [ChainList](https://chainlist.org/chain/11155420?testnets=true) dan klik salah satu tombol di sisi kanan tabel untuk menambahkan chain ke dompet Anda.

    B. Di aplikasi, **Disconnect** (Putuskan koneksi) lalu sambungkan kembali untuk mengubah blockchain. Ada cara yang lebih baik untuk menangani ini, tetapi itu akan memerlukan perubahan aplikasi.

## Kesimpulan {#conclusion}

Tentu saja, Anda tidak terlalu peduli tentang menyediakan antarmuka pengguna untuk `Greeter`. Anda ingin membuat antarmuka pengguna untuk kontrak Anda sendiri. Untuk membuat aplikasi Anda sendiri, jalankan langkah-langkah ini:

1. Tentukan untuk membuat aplikasi wagmi.

   ```sh copy
   npm create wagmi
```

2. Ketik `y` untuk melanjutkan.

3. Beri nama aplikasi.

4. Pilih kerangka kerja **React**.

5. Pilih varian **Vite**.

Sekarang pergilah dan buat kontrak Anda dapat digunakan oleh dunia luas.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).