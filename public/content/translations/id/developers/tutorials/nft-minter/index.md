---
title: Tutorial Minter NFT
description: Dalam tutorial ini, Anda akan membangun minter NFT dan mempelajari cara membuat dapp full stack dengan menghubungkan kontrak pintar Anda ke frontend React menggunakan MetaMask dan alat Web3.
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "kontrak pintar", "frontend", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: "Dapp pencetak NFT"
lang: id
published: 2021-10-06
---

Salah satu tantangan terbesar bagi pengembang yang berasal dari latar belakang Web2 adalah mencari tahu cara menghubungkan kontrak pintar Anda ke proyek frontend dan berinteraksi dengannya.

Dengan membangun minter NFT — UI sederhana di mana Anda dapat memasukkan tautan ke aset digital Anda, judul, dan deskripsi — Anda akan belajar cara:

- Terhubung ke MetaMask melalui proyek frontend Anda
- Memanggil metode kontrak pintar dari frontend Anda
- Menandatangani transaksi menggunakan MetaMask

Dalam tutorial ini, kita akan menggunakan [React](https://react.dev/) sebagai kerangka kerja frontend kita. Karena tutorial ini terutama difokuskan pada pengembangan Web3, kita tidak akan menghabiskan banyak waktu untuk menguraikan dasar-dasar React. Sebaliknya, kita akan fokus pada membawa fungsionalitas ke proyek kita.

Sebagai prasyarat, Anda harus memiliki pemahaman tingkat pemula tentang React—mengetahui cara kerja komponen, props, useState/useEffect, dan pemanggilan fungsi dasar. Jika Anda belum pernah mendengar istilah-istilah tersebut sebelumnya, Anda mungkin ingin memeriksa [Tutorial Pengantar React](https://react.dev/learn/tutorial-tic-tac-toe) ini. Untuk pembelajar yang lebih visual, kami sangat merekomendasikan seri video [Tutorial React Modern Lengkap](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) yang sangat bagus ini oleh Net Ninja.

Dan jika Anda belum melakukannya, Anda pasti akan membutuhkan akun Alchemy untuk menyelesaikan tutorial ini serta membangun apa pun di blockchain. Daftar untuk akun gratis [di sini](https://alchemy.com/).

Tanpa basa-basi lagi, mari kita mulai!

## Dasar-dasar Membuat NFT {#making-nfts-101}

Sebelum kita mulai melihat kode apa pun, penting untuk memahami cara kerja pembuatan NFT. Ini melibatkan dua langkah:

### Menerbitkan kontrak pintar NFT di blockchain Ethereum {#publish-nft}

Perbedaan terbesar antara kedua standar kontrak pintar NFT adalah bahwa ERC-1155 merupakan standar multi-token dan mencakup fungsionalitas batch, sedangkan ERC-721 adalah standar token tunggal dan oleh karena itu hanya mendukung transfer satu token pada satu waktu.

### Memanggil fungsi minting {#minting-function}

Biasanya, fungsi minting ini mengharuskan Anda untuk meneruskan dua variabel sebagai parameter, pertama `recipient`, yang menentukan alamat yang akan menerima NFT yang baru saja Anda mint, dan kedua `tokenURI` NFT, sebuah string yang mengarah ke dokumen JSON yang mendeskripsikan metadata NFT.

Metadata NFT adalah hal yang benar-benar menghidupkannya, memungkinkannya memiliki properti, seperti nama, deskripsi, gambar (atau aset digital yang berbeda), dan atribut lainnya. Berikut adalah [contoh tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), yang berisi metadata NFT.

Dalam tutorial ini, kita akan fokus pada bagian 2, memanggil fungsi minting kontrak pintar NFT yang sudah ada menggunakan UI React kita.

[Berikut adalah tautan](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) ke kontrak pintar NFT ERC-721 yang akan kita panggil dalam tutorial ini. Jika Anda ingin mempelajari cara kami membuatnya, kami sangat menyarankan Anda untuk memeriksa tutorial kami yang lain, ["Cara Membuat NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

Keren, sekarang setelah kita memahami cara kerja pembuatan NFT, mari kita kloning file awal kita!

## Kloning file awal {#clone-the-starter-files}

Pertama, buka [repositori GitHub nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) untuk mendapatkan file awal untuk proyek ini. Kloning repositori ini ke lingkungan lokal Anda.

Saat Anda membuka repositori `nft-minter-tutorial` yang dikloning ini, Anda akan melihat bahwa repositori ini berisi dua folder: `minter-starter-files` dan `nft-minter`.

- `minter-starter-files` berisi file awal (pada dasarnya UI React) untuk proyek ini. Dalam tutorial ini, **kita akan bekerja di direktori ini**, saat Anda belajar cara menghidupkan UI ini dengan menghubungkannya ke dompet Ethereum Anda dan kontrak pintar NFT.
- `nft-minter` berisi seluruh tutorial yang telah selesai dan ada untuk Anda sebagai **referensi** **jika Anda mengalami kebuntuan.**

Selanjutnya, buka salinan `minter-starter-files` Anda di editor kode Anda, lalu navigasikan ke folder `src` Anda.

Semua kode yang akan kita tulis akan berada di bawah folder `src`. Kita akan mengedit komponen `Minter.js` dan menulis file javascript tambahan untuk memberikan fungsionalitas Web3 pada proyek kita.

## Langkah 2: Periksa file awal kita {#step-2-check-out-our-starter-files}

Sebelum kita mulai membuat kode, penting untuk memeriksa apa yang sudah disediakan untuk kita di file awal.

### Jalankan proyek react Anda {#get-your-react-project-running}

Mari kita mulai dengan menjalankan proyek React di browser kita. Keindahan React adalah setelah proyek kita berjalan di browser, setiap perubahan yang kita simpan akan diperbarui secara langsung di browser kita.

Untuk menjalankan proyek, navigasikan ke direktori root dari folder `minter-starter-files`, dan jalankan `npm install` di terminal Anda untuk menginstal dependensi proyek:

```bash
cd minter-starter-files
npm install
```

Setelah selesai menginstal, jalankan `npm start` di terminal Anda:

```bash
npm start
```

Melakukan hal itu akan membuka http://localhost:3000/ di browser Anda, di mana Anda akan melihat frontend untuk proyek kita. Ini harus terdiri dari 3 bidang: tempat untuk memasukkan tautan ke aset NFT Anda, memasukkan nama NFT Anda, dan memberikan deskripsi.

Jika Anda mencoba mengklik tombol "Connect Wallet" atau "Mint NFT", Anda akan melihat bahwa tombol tersebut tidak berfungsi—itu karena kita masih perlu memprogram fungsionalitasnya! :\)

### Komponen Minter.js {#minter-js}

**CATATAN:** Pastikan Anda berada di folder `minter-starter-files` dan bukan di folder `nft-minter`!

Mari kembali ke folder `src` di editor kita dan buka file `Minter.js`. Sangat penting bagi kita untuk memahami semua yang ada di file ini, karena ini adalah komponen React utama yang akan kita kerjakan.

Di bagian atas file ini, kita memiliki variabel status yang akan kita perbarui setelah peristiwa tertentu.

```javascript
//State variables // Variabel state
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Belum pernah mendengar tentang variabel status React atau hook status? Periksa dokumentasi [ini](https://legacy.reactjs.org/docs/hooks-state.html).

Berikut adalah apa yang diwakili oleh masing-masing variabel:

- `walletAddress` - sebuah string yang menyimpan alamat dompet pengguna
- `status` - sebuah string yang berisi pesan untuk ditampilkan di bagian bawah UI
- `name` - sebuah string yang menyimpan nama NFT
- `description` - sebuah string yang menyimpan deskripsi NFT
- `url` - sebuah string yang merupakan tautan ke aset digital NFT

Setelah variabel status, Anda akan melihat tiga fungsi yang belum diimplementasikan: `useEffect`, `connectWalletPressed`, dan `onMintPressed`. Anda akan melihat bahwa semua fungsi ini adalah `async`, itu karena kita akan melakukan panggilan API asinkron di dalamnya! Nama-nama mereka sesuai dengan fungsionalitasnya:

```javascript
useEffect(async () => {
  //TODO: implement // TODO: implementasikan
}, [])

const connectWalletPressed = async () => {
  //TODO: implement // TODO: implementasikan
}

const onMintPressed = async () => {
  //TODO: implement // TODO: implementasikan
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - ini adalah hook React yang dipanggil setelah komponen Anda dirender. Karena ia memiliki prop array kosong `[]` yang diteruskan ke dalamnya (lihat baris 3), ia hanya akan dipanggil pada render _pertama_ komponen. Di sini kita akan memanggil pendengar dompet kita dan fungsi dompet lainnya untuk memperbarui UI kita guna mencerminkan apakah dompet sudah terhubung.
- `connectWalletPressed` - fungsi ini akan dipanggil untuk menghubungkan dompet MetaMask pengguna ke dapp kita.
- `onMintPressed` - fungsi ini akan dipanggil untuk melakukan mint NFT pengguna.

Di dekat akhir file ini, kita memiliki UI dari komponen kita. Jika Anda memindai kode ini dengan cermat, Anda akan melihat bahwa kita memperbarui variabel status `url`, `name`, dan `description` kita ketika input di bidang teks yang sesuai berubah.

Anda juga akan melihat bahwa `connectWalletPressed` dan `onMintPressed` dipanggil ketika tombol dengan ID `mintButton` dan `walletButton` masing-masing diklik.

```javascript
//the UI of our component // UI dari komponen kita
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
</div>
)
```

Terakhir, mari kita bahas di mana komponen Minter ini ditambahkan.

Jika Anda pergi ke file `App.js`, yang merupakan komponen utama di React yang bertindak sebagai wadah untuk semua komponen lainnya, Anda akan melihat bahwa komponen Minter kita disuntikkan pada baris 7.

**Dalam tutorial ini, kita hanya akan mengedit file `Minter.js` dan menambahkan file di folder `src` kita.**

Sekarang setelah kita memahami apa yang sedang kita kerjakan, mari kita siapkan dompet Ethereum kita!

## Siapkan dompet Ethereum Anda {#set-up-your-ethereum-wallet}

Agar pengguna dapat berinteraksi dengan kontrak pintar Anda, mereka perlu menghubungkan dompet Ethereum mereka ke dapp Anda.

### Unduh MetaMask {#download-metamask}

Untuk tutorial ini, kita akan menggunakan MetaMask, dompet virtual di browser yang digunakan untuk mengelola alamat akun Ethereum Anda. Jika Anda ingin memahami lebih lanjut tentang cara kerja transaksi di Ethereum, periksa [halaman ini](/developers/docs/transactions/).

Anda dapat mengunduh dan membuat akun MetaMask secara gratis [di sini](https://metamask.io/download). Saat Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke “Ropsten Test Network” di kanan atas \(sehingga kita tidak berurusan dengan uang sungguhan\).

### Tambahkan ether dari Faucet {#add-ether-from-faucet}

Untuk melakukan mint NFT kita (atau menandatangani transaksi apa pun di blockchain Ethereum), kita akan membutuhkan beberapa Eth palsu. Untuk mendapatkan Eth, Anda dapat pergi ke [faucet Ropsten](https://faucet.ropsten.be/) dan memasukkan alamat akun Ropsten Anda, lalu klik “Send Ropsten Eth.” Anda akan melihat Eth di akun MetaMask Anda segera setelahnya!

### Periksa saldo Anda {#check-your-balance}

Untuk memeriksa kembali apakah saldo kita ada di sana, mari kita buat permintaan [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) menggunakan [alat komposer Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ini akan mengembalikan jumlah Eth di dompet kita. Setelah Anda memasukkan alamat akun MetaMask Anda dan mengklik “Send Request”, Anda akan melihat respons seperti ini:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**CATATAN:** Hasil ini dalam wei, bukan eth. Wei digunakan sebagai denominasi terkecil dari ether. Konversi dari wei ke eth adalah: 1 eth = 10¹⁸ wei. Jadi jika kita mengonversi 0xde0b6b3a7640000 ke desimal, kita mendapatkan 1\*10¹⁸ yang sama dengan 1 eth.

Fiuh! Uang palsu kita semuanya ada di sana! <Emoji text=":money_mouth_face:" size={1} />

## Hubungkan MetaMask ke UI Anda {#connect-metamask-to-your-UI}

Sekarang setelah dompet MetaMask kita disiapkan, mari kita hubungkan dapp kita ke sana!

Karena kita ingin mengikuti paradigma [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), kita akan membuat file terpisah yang berisi fungsi kita untuk mengelola logika, data, dan aturan dapp kita, lalu meneruskan fungsi tersebut ke frontend kita (komponen Minter.js kita).

### Fungsi `connectWallet` {#connect-wallet-function}

Untuk melakukannya, mari kita buat folder baru bernama `utils` di direktori `src` Anda dan tambahkan file bernama `interact.js` di dalamnya, yang akan berisi semua fungsi interaksi dompet dan kontrak pintar kita.

Di file `interact.js` kita, kita akan menulis fungsi `connectWallet`, yang kemudian akan kita impor dan panggil di komponen `Minter.js` kita.

Di file `interact.js` Anda, tambahkan yang berikut ini

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Mari kita uraikan apa yang dilakukan kode ini:

Pertama, fungsi kita memeriksa apakah `window.ethereum` diaktifkan di browser Anda.

`window.ethereum` adalah API global yang disuntikkan oleh MetaMask dan penyedia dompet lainnya yang memungkinkan situs web untuk meminta akun Ethereum pengguna. Jika disetujui, ia dapat membaca data dari blockchain yang terhubung dengan pengguna, dan menyarankan agar pengguna menandatangani pesan dan transaksi. Periksa [dokumentasi MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) untuk info lebih lanjut!

Jika `window.ethereum` _tidak_ ada, maka itu berarti MetaMask tidak diinstal. Ini menghasilkan objek JSON yang dikembalikan, di mana `address` yang dikembalikan adalah string kosong, dan objek JSX `status` menyampaikan bahwa pengguna harus menginstal MetaMask.

**Sebagian besar fungsi yang kita tulis akan mengembalikan objek JSON yang dapat kita gunakan untuk memperbarui variabel status dan UI kita.**

Sekarang jika `window.ethereum` _ada_, maka di situlah hal-hal menjadi menarik.

Menggunakan loop try/catch, kita akan mencoba terhubung ke MetaMask dengan memanggil [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Memanggil fungsi ini akan membuka MetaMask di browser, di mana pengguna akan diminta untuk menghubungkan dompet mereka ke dapp Anda.

- Jika pengguna memilih untuk terhubung, `method: "eth_requestAccounts"` akan mengembalikan array yang berisi semua alamat akun pengguna yang terhubung ke dapp. Secara keseluruhan, fungsi `connectWallet` kita akan mengembalikan objek JSON yang berisi `address` _pertama_ dalam array ini \(lihat baris 9\) dan pesan `status` yang meminta pengguna untuk menulis pesan ke kontrak pintar.
- Jika pengguna menolak koneksi, maka objek JSON akan berisi string kosong untuk `address` yang dikembalikan dan pesan `status` yang mencerminkan bahwa pengguna menolak koneksi.

### Tambahkan fungsi connectWallet ke Komponen UI Minter.js Anda {#add-connect-wallet}

Sekarang setelah kita menulis fungsi `connectWallet` ini, mari kita hubungkan ke komponen `Minter.js.` kita.

Pertama, kita harus mengimpor fungsi kita ke dalam file `Minter.js` kita dengan menambahkan `import { connectWallet } from "./utils/interact.js";` ke bagian atas file `Minter.js`. 11 baris pertama `Minter.js` Anda sekarang akan terlihat seperti ini:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //State variables // Variabel state
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Kemudian, di dalam fungsi `connectWalletPressed` kita, kita akan memanggil fungsi `connectWallet` yang diimpor, seperti ini:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Perhatikan bagaimana sebagian besar fungsionalitas kita diabstraksikan dari komponen `Minter.js` kita dari file `interact.js`? Ini agar kita mematuhi paradigma M-V-C!

Di `connectWalletPressed`, kita cukup melakukan panggilan await ke fungsi `connectWallet` yang diimpor, dan menggunakan responsnya, kita memperbarui variabel `status` dan `walletAddress` kita melalui hook status mereka.

Sekarang, mari kita simpan kedua file `Minter.js` dan `interact.js` dan uji UI kita sejauh ini.

Buka browser Anda di localhost:3000, dan tekan tombol "Connect Wallet" di kanan atas halaman.

Jika Anda telah menginstal MetaMask, Anda akan diminta untuk menghubungkan dompet Anda ke dapp Anda. Terima undangan untuk terhubung.

Anda akan melihat bahwa tombol dompet sekarang mencerminkan bahwa alamat Anda terhubung.

Selanjutnya, coba segarkan halaman... ini aneh. Tombol dompet kita meminta kita untuk menghubungkan MetaMask, meskipun sudah terhubung...

Namun jangan khawatir! Kita dapat dengan mudah memperbaikinya dengan mengimplementasikan fungsi yang disebut `getCurrentWalletConnected`, yang akan memeriksa apakah sebuah alamat sudah terhubung ke dapp kita dan memperbarui UI kita sesuai dengan itu!

### Fungsi getCurrentWalletConnected {#get-current-wallet}

Di file `interact.js` Anda, tambahkan fungsi `getCurrentWalletConnected` berikut:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Kode ini _sangat_ mirip dengan fungsi `connectWallet` yang baru saja kita tulis sebelumnya.

Perbedaan utamanya adalah alih-alih memanggil metode `eth_requestAccounts`, yang membuka MetaMask bagi pengguna untuk menghubungkan dompet mereka, di sini kita memanggil metode `eth_accounts`, yang hanya mengembalikan array yang berisi alamat MetaMask yang saat ini terhubung ke dapp kita.

Untuk melihat fungsi ini beraksi, mari kita panggil di fungsi `useEffect` dari komponen `Minter.js` kita.

Seperti yang kita lakukan untuk `connectWallet`, kita harus mengimpor fungsi ini dari file `interact.js` kita ke dalam file `Minter.js` kita seperti ini:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //import here // impor di sini
} from "./utils/interact.js"
```

Sekarang, kita cukup memanggilnya di fungsi `useEffect` kita:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Perhatikan, kita menggunakan respons dari panggilan kita ke `getCurrentWalletConnected` untuk memperbarui variabel status `walletAddress` dan `status` kita.

Setelah Anda menambahkan kode ini, coba segarkan jendela browser kita. Tombol tersebut harus mengatakan bahwa Anda terhubung, dan menampilkan pratinjau alamat dompet Anda yang terhubung - bahkan setelah Anda menyegarkan!

### Implementasikan addWalletListener {#implement-add-wallet-listener}

Langkah terakhir dalam penyiapan dompet dapp kita adalah mengimplementasikan pendengar dompet sehingga UI kita diperbarui ketika status dompet kita berubah, seperti ketika pengguna memutuskan sambungan atau beralih akun.

Di file `Minter.js` Anda, tambahkan fungsi `addWalletListener` yang terlihat seperti berikut:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Mari kita uraikan dengan cepat apa yang terjadi di sini:

- Pertama, fungsi kita memeriksa apakah `window.ethereum` diaktifkan \(yaitu, MetaMask diinstal\).
  - Jika tidak, kita cukup mengatur variabel status `status` kita ke string JSX yang meminta pengguna untuk menginstal MetaMask.
  - Jika diaktifkan, kita menyiapkan pendengar `window.ethereum.on("accountsChanged")` pada baris 3 yang mendengarkan perubahan status di dompet MetaMask, yang mencakup saat pengguna menghubungkan akun tambahan ke dapp, beralih akun, atau memutuskan sambungan akun. Jika ada setidaknya satu akun yang terhubung, variabel status `walletAddress` diperbarui sebagai akun pertama dalam array `accounts` yang dikembalikan oleh pendengar. Jika tidak, `walletAddress` diatur sebagai string kosong.

Terakhir, kita harus memanggilnya di fungsi `useEffect` kita:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Dan voila! Kita telah selesai memprogram semua fungsionalitas dompet kita! Sekarang setelah dompet kita disiapkan, mari kita cari tahu cara melakukan mint NFT kita!

## Dasar-dasar Metadata NFT {#nft-metadata-101}

Jadi ingat metadata NFT yang baru saja kita bicarakan di Langkah 0 dari tutorial ini—itu menghidupkan NFT, memungkinkannya memiliki properti, seperti aset digital, nama, deskripsi, dan atribut lainnya.

Kita perlu mengonfigurasi metadata ini sebagai objek JSON dan menyimpannya, sehingga kita dapat meneruskannya sebagai parameter `tokenURI` saat memanggil fungsi `mintNFT` kontrak pintar kita.

Teks di bidang "Link to Asset", "Name", "Description" akan terdiri dari berbagai properti metadata NFT kita. Kita akan memformat metadata ini sebagai objek JSON, tetapi ada beberapa opsi untuk tempat kita dapat menyimpan objek JSON ini:

- Kita bisa menyimpannya di blockchain Ethereum; namun, melakukan hal itu akan sangat mahal.
- Kita bisa menyimpannya di server terpusat, seperti AWS atau Firebase. Tapi itu akan mengalahkan etos desentralisasi kita.
- Kita bisa menggunakan IPFS, protokol desentralisasi dan jaringan peer-to-peer untuk menyimpan dan berbagi data dalam sistem file terdistribusi. Karena protokol ini terdesentralisasi dan gratis, ini adalah opsi terbaik kita!

Untuk menyimpan metadata kita di IPFS, kita akan menggunakan [Pinata](https://pinata.cloud/), API dan toolkit IPFS yang nyaman. Pada langkah berikutnya, kita akan menjelaskan dengan tepat cara melakukan ini!

## Gunakan Pinata untuk menyematkan metadata Anda ke IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Jika Anda tidak memiliki akun [Pinata](https://pinata.cloud/), daftar untuk akun gratis [di sini](https://app.pinata.cloud/auth/signup) dan selesaikan langkah-langkah untuk memverifikasi email dan akun Anda.

### Buat kunci API Pinata Anda {#create-pinata-api-key}

Navigasikan ke halaman [https://pinata.cloud/keys](https://pinata.cloud/keys), lalu pilih tombol "New Key" di bagian atas, atur widget Admin sebagai diaktifkan, dan beri nama kunci Anda.

Anda kemudian akan diperlihatkan popup dengan info API Anda. Pastikan untuk meletakkannya di tempat yang aman.

Sekarang setelah kunci kita disiapkan, mari kita tambahkan ke proyek kita sehingga kita dapat menggunakannya.

### Buat file .env {#create-a-env}

Kita dapat dengan aman menyimpan kunci dan rahasia Pinata kita dalam file lingkungan. Mari kita instal [paket dotenv](https://www.npmjs.com/package/dotenv) di direktori proyek Anda.

Buka tab baru di terminal Anda \(terpisah dari yang menjalankan host lokal\) dan pastikan Anda berada di folder `minter-starter-files`, lalu jalankan perintah berikut di terminal Anda:

```text
npm install dotenv --save
```

Selanjutnya, buat file `.env` di direktori root dari `minter-starter-files` Anda dengan memasukkan yang berikut ini di baris perintah Anda:

```javascript
vim.env
```

Ini akan membuka file `.env` Anda di vim \(editor teks\). Untuk menyimpannya tekan "esc" + ":" + "q" pada keyboard Anda dalam urutan itu.

Selanjutnya, di VSCode, navigasikan ke file `.env` Anda dan tambahkan kunci API Pinata dan rahasia API Anda ke dalamnya, seperti ini:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Simpan file, dan kemudian Anda siap untuk mulai menulis fungsi untuk mengunggah metadata JSON Anda ke IPFS!

### Implementasikan pinJSONToIPFS {#pin-json-to-ipfs}

Untungnya bagi kita, Pinata memiliki [API khusus untuk mengunggah data JSON ke IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) dan contoh JavaScript dengan axios yang nyaman yang dapat kita gunakan, dengan beberapa modifikasi kecil.

Di folder `utils` Anda, mari kita buat file lain bernama `pinata.js` dan kemudian impor rahasia dan kunci Pinata kita dari file .env seperti ini:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Selanjutnya, tempelkan kode tambahan dari bawah ke dalam file `pinata.js` Anda. Jangan khawatir, kita akan menguraikan apa arti semuanya!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //making axios POST request to Pinata ⬇️ // membuat permintaan POST axios ke Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Jadi apa sebenarnya yang dilakukan kode ini?

Pertama, ia mengimpor [axios](https://www.npmjs.com/package/axios), klien HTTP berbasis promise untuk browser dan node.js, yang akan kita gunakan untuk membuat permintaan ke Pinata.

Kemudian kita memiliki fungsi asinkron kita `pinJSONToIPFS`, yang mengambil `JSONBody` sebagai inputnya dan kunci api serta rahasia Pinata di headernya, semuanya untuk membuat permintaan POST ke API `pinJSONToIPFS` mereka.

- Jika permintaan POST ini berhasil, maka fungsi kita mengembalikan objek JSON dengan boolean `success` sebagai true dan `pinataUrl` tempat metadata kita disematkan. Kita akan menggunakan `pinataUrl` yang dikembalikan ini sebagai input `tokenURI` ke fungsi mint kontrak pintar kita.
- Jika permintaan post ini gagal, maka fungsi kita mengembalikan objek JSON dengan boolean `success` sebagai false dan string `message` yang menyampaikan kesalahan kita.

Sama seperti tipe pengembalian fungsi `connectWallet` kita, kita mengembalikan objek JSON sehingga kita dapat menggunakan parameternya untuk memperbarui variabel status dan UI kita.

## Muat kontrak pintar Anda {#load-your-smart-contract}

Sekarang setelah kita memiliki cara untuk mengunggah metadata NFT kita ke IPFS melalui fungsi `pinJSONToIPFS` kita, kita akan membutuhkan cara untuk memuat instance kontrak pintar kita sehingga kita dapat memanggil fungsi `mintNFT`-nya.

Seperti yang kami sebutkan sebelumnya, dalam tutorial ini kita akan menggunakan [kontrak pintar NFT yang sudah ada ini](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); namun, jika Anda ingin mempelajari cara kami membuatnya, atau membuatnya sendiri, kami sangat menyarankan Anda untuk memeriksa tutorial kami yang lain, ["Cara Membuat NFT."](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI kontrak {#contract-abi}

Jika Anda memeriksa file kami dengan cermat, Anda akan melihat bahwa di direktori `src` kita, ada file `contract-abi.json`. ABI diperlukan untuk menentukan fungsi mana yang akan dipanggil oleh kontrak serta memastikan bahwa fungsi tersebut akan mengembalikan data dalam format yang Anda harapkan.

Kita juga akan membutuhkan kunci API Alchemy dan API Web3 Alchemy untuk terhubung ke blockchain Ethereum dan memuat kontrak pintar kita.

### Buat kunci API Alchemy Anda {#create-alchemy-api}

Jika Anda belum memiliki akun Alchemy, [daftar gratis di sini.](https://alchemy.com/?a=eth-org-nft-minter)

Setelah Anda membuat akun Alchemy, Anda dapat menghasilkan kunci API dengan membuat aplikasi. Ini akan memungkinkan kita untuk membuat permintaan ke testnet Ropsten.

Navigasikan ke halaman “Create App” di Dasbor Alchemy Anda dengan mengarahkan kursor ke “Apps” di bilah navigasi dan mengklik “Create App”.

Beri nama aplikasi Anda, kami memilih "My First NFT!", tawarkan deskripsi singkat, pilih “Staging” untuk Lingkungan yang digunakan untuk pembukuan aplikasi Anda, dan pilih “Ropsten” untuk jaringan Anda.

Klik “Create app” dan selesai! Aplikasi Anda akan muncul di tabel di bawah ini.

Luar biasa, jadi sekarang setelah kita membuat URL API Alchemy HTTP kita, salin ke papan klip Anda...

…dan kemudian mari kita tambahkan ke file `.env` kita. Secara keseluruhan, file .env Anda akan terlihat seperti ini:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key> // eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Sekarang setelah kita memiliki ABI kontrak kita dan kunci API Alchemy kita, kita siap untuk memuat kontrak pintar kita menggunakan [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Siapkan titik akhir dan kontrak Alchemy Web3 Anda {#setup-alchemy-endpoint}

Pertama, jika Anda belum memilikinya, Anda perlu menginstal [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) dengan menavigasi ke direktori beranda: `nft-minter-tutorial` di terminal:

```text
cd ..
npm install @alch/alchemy-web3
```

Selanjutnya mari kembali ke file `interact.js` kita. Di bagian atas file, tambahkan kode berikut untuk mengimpor kunci Alchemy Anda dari file .env Anda dan menyiapkan titik akhir Alchemy Web3 Anda:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) adalah pembungkus di sekitar [Web3.js](https://docs.web3js.org/), menyediakan metode API yang ditingkatkan dan manfaat penting lainnya untuk membuat hidup Anda sebagai pengembang web3 lebih mudah. Ini dirancang untuk membutuhkan konfigurasi minimal sehingga Anda dapat mulai menggunakannya di aplikasi Anda segera!

Selanjutnya, mari kita tambahkan ABI kontrak dan alamat kontrak kita ke file kita.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Setelah kita memiliki keduanya, kita siap untuk mulai membuat kode fungsi mint kita!

## Implementasikan fungsi mintNFT {#implement-the-mintnft-function}

Di dalam file `interact.js` Anda, mari kita definisikan fungsi kita, `mintNFT`, yang sesuai namanya akan melakukan mint NFT kita.

Karena kita akan melakukan banyak panggilan asinkron \(ke Pinata untuk menyematkan metadata kita ke IPFS, Alchemy Web3 untuk memuat kontrak pintar kita, dan MetaMask untuk menandatangani transaksi kita\), fungsi kita juga akan asinkron.

Tiga input ke fungsi kita adalah `url` dari aset digital kita, `name`, dan `description`. Tambahkan tanda tangan fungsi berikut di bawah fungsi `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Penanganan kesalahan input {#input-error-handling}

Tentu saja, masuk akal untuk memiliki semacam penanganan kesalahan input di awal fungsi, jadi kita keluar dari fungsi ini jika parameter input kita tidak benar. Di dalam fungsi kita, mari kita tambahkan kode berikut:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling // penanganan kesalahan
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

Pada dasarnya, jika salah satu parameter input adalah string kosong, maka kita mengembalikan objek JSON di mana boolean `success` adalah false, dan string `status` menyampaikan bahwa semua bidang di UI kita harus lengkap.

### Unggah metadata ke IPFS {#upload-metadata-to-ipfs}

Setelah kita tahu metadata kita diformat dengan benar, langkah selanjutnya adalah membungkusnya ke dalam objek JSON dan mengunggahnya ke IPFS melalui `pinJSONToIPFS` yang kita tulis!

Untuk melakukannya, pertama-tama kita perlu mengimpor fungsi `pinJSONToIPFS` ke dalam file `interact.js` kita. Di bagian paling atas `interact.js`, mari kita tambahkan:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Ingat bahwa `pinJSONToIPFS` mengambil badan JSON. Jadi sebelum kita memanggilnya, kita perlu memformat parameter `url`, `name`, dan `description` kita ke dalam objek JSON.

Mari kita perbarui kode kita untuk membuat objek JSON yang disebut `metadata` dan kemudian melakukan panggilan ke `pinJSONToIPFS` dengan parameter `metadata` ini:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling // penanganan kesalahan
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata // buat metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //make pinata call // buat panggilan pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Perhatikan, kita menyimpan respons dari panggilan kita ke `pinJSONToIPFS(metadata)` di objek `pinataResponse`. Kemudian, kita mengurai objek ini untuk mencari kesalahan apa pun.

Jika ada kesalahan, kita mengembalikan objek JSON di mana boolean `success` adalah false dan string `status` kita menyampaikan bahwa panggilan kita gagal. Jika tidak, kita mengekstrak `pinataURL` dari `pinataResponse` dan menyimpannya sebagai variabel `tokenURI` kita.

Sekarang saatnya untuk memuat kontrak pintar kita menggunakan API Web3 Alchemy yang kita inisialisasi di bagian atas file kita. Tambahkan baris kode berikut ke bagian bawah fungsi `mintNFT` untuk mengatur kontrak pada variabel global `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Hal terakhir yang ditambahkan dalam fungsi `mintNFT` kita adalah transaksi Ethereum kita:

```javascript
//set up your Ethereum transaction // siapkan transaksi Ethereum Anda
const transactionParameters = {
  to: contractAddress, // Required except during contract publications. // Diperlukan kecuali selama publikasi kontrak.
  from: window.ethereum.selectedAddress, // must match user's active address. // harus cocok dengan alamat aktif pengguna.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //make call to NFT smart contract // buat panggilan ke smart contract NFT
}

//sign the transaction via MetaMask // tandatangani transaksi melalui MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

Jika Anda sudah terbiasa dengan transaksi Ethereum, Anda akan melihat bahwa strukturnya cukup mirip dengan apa yang pernah Anda lihat.

- Pertama, kita menyiapkan parameter transaksi kita.
  - `to` menentukan alamat penerima \(kontrak pintar kita\)
  - `from` menentukan penandatangan transaksi \(alamat pengguna yang terhubung ke MetaMask: `window.ethereum.selectedAddress`\)
  - `data` berisi panggilan ke metode `mintNFT` kontrak pintar kita, yang menerima `tokenURI` kita dan alamat dompet pengguna, `window.ethereum.selectedAddress`, sebagai input
- Kemudian, kita melakukan panggilan await, `window.ethereum.request,` di mana kita meminta MetaMask untuk menandatangani transaksi. Perhatikan, dalam permintaan ini, kita menentukan metode eth kita \(eth_SentTransaction\) dan meneruskan `transactionParameters` kita. Pada titik ini, MetaMask akan terbuka di browser, dan meminta pengguna untuk menandatangani atau menolak transaksi.
  - Jika transaksi berhasil, fungsi akan mengembalikan objek JSON di mana boolean `success` diatur ke true dan string `status` meminta pengguna untuk memeriksa Etherscan untuk informasi lebih lanjut tentang transaksi mereka.
  - Jika transaksi gagal, fungsi akan mengembalikan objek JSON di mana boolean `success` diatur ke false, dan string `status` menyampaikan pesan kesalahan.

Secara keseluruhan, fungsi `mintNFT` kita akan terlihat seperti ini:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling // penanganan kesalahan
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata // buat metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata pin request // permintaan pin pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //load smart contract // muat smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract(); // loadContract();

  //set up your Ethereum transaction // siapkan transaksi Ethereum Anda
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications. // Diperlukan kecuali selama publikasi kontrak.
    from: window.ethereum.selectedAddress, // must match user's active address. // harus cocok dengan alamat aktif pengguna.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //make call to NFT smart contract // buat panggilan ke smart contract NFT
  }

  //sign transaction via MetaMask // tandatangani transaksi melalui MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

Itu adalah satu fungsi raksasa! Sekarang, kita hanya perlu menghubungkan fungsi `mintNFT` kita ke komponen `Minter.js` kita...

## Hubungkan mintNFT ke frontend Minter.js kita {#connect-our-frontend}

Buka file `Minter.js` Anda dan perbarui baris `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` di bagian atas menjadi:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Terakhir, implementasikan fungsi `onMintPressed` untuk melakukan panggilan await ke fungsi `mintNFT` yang Anda impor dan perbarui variabel status `status` untuk mencerminkan apakah transaksi kita berhasil atau gagal:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Terapkan NFT Anda ke situs web langsung {#deploy-your-NFT}

Siap untuk membuat proyek Anda langsung agar pengguna dapat berinteraksi dengannya? Periksa [tutorial ini](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) untuk menerapkan Minter Anda ke situs web langsung.

Satu langkah terakhir...

## Guncang dunia blockchain {#take-the-blockchain-world-by-storm}

Hanya bercanda, Anda berhasil mencapai akhir tutorial!

Sebagai rekap, dengan membangun minter NFT, Anda berhasil mempelajari cara:

- Terhubung ke MetaMask melalui proyek frontend Anda
- Memanggil metode kontrak pintar dari frontend Anda
- Menandatangani transaksi menggunakan MetaMask

Mungkin, Anda ingin dapat memamerkan NFT yang di-mint melalui dapp Anda di dompet Anda — jadi pastikan untuk memeriksa tutorial singkat kami [Cara Melihat NFT Anda di Dompet Anda](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

Dan, seperti biasa, jika Anda memiliki pertanyaan, kami di sini untuk membantu di [Discord Alchemy](https://discord.gg/gWuC7zB). Kami tidak sabar untuk melihat bagaimana Anda menerapkan konsep dari tutorial ini ke proyek masa depan Anda!