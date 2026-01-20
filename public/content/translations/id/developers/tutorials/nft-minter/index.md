---
title: Tutorial mencetak NFT
description: Dalam tutorial ini, Anda akan membuat minter NFT dan mempelajari cara membuat full stack dapp dengan menghubungkan smart contract Anda ke frontend React menggunakan alat MetaMask dan Web3.
author: "smudgil"
tags:
  [
    "Solidity",
    "NFT",
    "alchemy",
    "kontrak pintar",
    "frontend",
    "Pinata"
  ]
skill: intermediate
lang: id
published: 2021-10-06
---

Salah satu tantangan terbesar bagi pengembang yang berasal dari latar belakang Web2 adalah mencari cara untuk menghubungkan smart contract Anda ke proyek frontend dan berinteraksi dengannya.

Dengan membuat minter NFT - UI sederhana tempat Anda dapat memasukkan tautan ke aset digital Anda, judul, dan deskripsi - Anda akan belajar caranya:

- Terhubung ke MetaMask melalui proyek frontend Anda
- Panggil metode kontrak pintar dari frontend Anda
- Menandatangani transaksi menggunakan MetaMask

Dalam tutorial ini, kita akan menggunakan [React](https://react.dev/) sebagai kerangka kerja frontend kita. Karena tutorial ini difokuskan pada pengembangan Web3, kita tidak akan menghabiskan banyak waktu untuk menguraikan dasar-dasar React. Sebaliknya, kami akan berfokus pada fungsionalitas pada proyek kami.

Sebagai prasyarat, Anda harus memiliki pemahaman tingkat pemula tentang React-mengetahui cara kerja komponen, props, useState/useEffect, dan pemanggilan fungsi dasar. Jika Anda belum pernah mendengar istilah-istilah tersebut sebelumnya, Anda mungkin ingin melihat [tutorial Intro ke React](https://react.dev/learn/tutorial-tic-tac-toe) ini. Untuk para pembelajar yang lebih visual, kami sangat merekomendasikan seri video [Tutorial React Modern Lengkap](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) yang luar biasa oleh Net Ninja ini.

Dan jika Anda belum memilikinya, Anda pasti akan membutuhkan akun Alchemy untuk menyelesaikan tutorial ini serta membangun apa pun di blockchain. Daftar untuk mendapatkan akun gratis [di sini](https://alchemy.com/).

Tanpa basa-basi lagi, mari kita mulai!

## Membuat NFT 101 {#making-nfts-101}

Bahkan sebelum kita mulai melihat kode apa pun, penting untuk memahami cara kerja NFT. Ini melibatkan dua langkah:

### Menerbitkan kontrak pintar NFT di rantai blok Ethereum {#publish-nft}

Perbedaan terbesar antara dua standar kontrak pintar NFT adalah bahwa ERC-1155 adalah standar multi-token dan mencakup fungsionalitas batch, sedangkan dengan ERC-721 adalah standar token tunggal dan oleh karena itu hanya mendukung transfer satu token pada satu waktu.

### Memanggil fungsi pencetakan {#minting-function}

Biasanya, fungsi pencetakan ini mengharuskan Anda untuk memasukkan dua variabel sebagai parameter, pertama `recipient`, yang menentukan alamat yang akan menerima NFT Anda yang baru dicetak, dan kedua `tokenURI` NFT, sebuah string yang mengarah ke dokumen JSON yang mendeskripsikan metadata NFT.

Metadata NFT adalah apa yang membuatnya hidup, memungkinkannya memiliki properti, seperti nama, deskripsi, gambar (atau aset digital yang berbeda), dan atribut lainnya. Berikut [contoh tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), yang berisi metadata NFT.

Dalam tutorial ini, kita akan fokus pada bagian 2, memanggil fungsi pembuatan kontrak pintar NFT yang sudah ada menggunakan React UI.

[Berikut tautan](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) ke kontrak pintar NFT ERC-721 yang akan kita panggil dalam tutorial ini. Jika Anda ingin mempelajari cara kami membuatnya, kami sangat menyarankan Anda untuk melihat tutorial kami yang lain, ["Cara Membuat NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

Keren, sekarang kita sudah paham bagaimana cara kerja NFT, mari kita kloning file awal kita!

## Kloning file pemula {#clone-the-starter-files}

Pertama, buka [repositori GitHub nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) untuk mendapatkan berkas-berkas awal untuk proyek ini. Kloning repositori ini ke dalam lingkungan lokal Anda.

Saat Anda membuka repositori `nft-minter-tutorial` yang dikloning ini, Anda akan melihat bahwa itu berisi dua folder: `minter-starter-files` dan `nft-minter`.

- `minter-starter-files` berisi berkas pemula (pada dasarnya adalah UI React) untuk proyek ini. Dalam tutorial ini, **kita akan bekerja di direktori ini**, saat Anda mempelajari cara menghidupkan UI ini dengan menghubungkannya ke dompet Ethereum dan kontrak pintar NFT Anda.
- `nft-minter` berisi seluruh tutorial yang telah selesai dan tersedia untuk Anda sebagai **referensi** **jika Anda mengalami kebuntuan.**

Selanjutnya, buka salinan `minter-starter-files` Anda di editor kode, lalu navigasikan ke folder `src` Anda.

Semua kode yang akan kita tulis akan berada di bawah folder `src`. Kita akan mengedit komponen `Minter.js` dan menulis file javascript tambahan untuk memberikan fungsionalitas Web3 pada proyek kita.

## Langkah 2: Periksa file pemula kami {#step-2-check-out-our-starter-files}

Sebelum kita mulai membuat kode, penting untuk memeriksa apa yang sudah disediakan untuk kita di dalam file-file pemula.

### Menjalankan proyek React Anda {#get-your-react-project-running}

Mari kita mulai dengan menjalankan proyek React di browser kita. Keindahan dari React adalah ketika kita menjalankan proyek kita di browser, setiap perubahan yang kita simpan akan diperbarui secara langsung di browser.

Untuk menjalankan proyek, navigasikan ke direktori root folder `minter-starter-files`, dan jalankan `npm install` di terminal Anda untuk menginstal dependensi proyek:

```bash
cd minter-starter-files
npm install
```

Setelah penginstalan selesai, jalankan `npm start` di terminal Anda:

```bash
npm start
```

Untuk melakukannya, Anda harus membuka http://localhost:3000/ di browser Anda, di mana Anda akan melihat halaman depan untuk proyek kami. Ini harus terdiri dari 3 bidang: tempat untuk memasukkan tautan ke aset NFT Anda, masukkan nama NFT Anda, dan berikan deskripsi.

Jika Anda mencoba mengklik tombol "Hubungkan Dompet" atau "Mint NFT", Anda akan melihat bahwa tombol tersebut tidak berfungsi - itu karena kami masih perlu memprogram fungsionalitasnya! :\)

### Komponen Minter.js {#minter-js}

**CATATAN:** Pastikan Anda berada di folder `minter-starter-files` dan bukan di folder `nft-minter`!

Mari kembali ke folder `src` di editor kita dan buka file `Minter.js`. Sangat penting bagi kita untuk memahami semua yang ada di dalam file ini, karena ini adalah komponen utama React yang akan kita kerjakan.

Di bagian atas file ini, kita memiliki variabel state yang akan kita perbarui setelah kejadian tertentu.

```javascript
//Variabel state
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Belum pernah mendengar tentang variabel state atau state hook pada React? Lihat dokumentasi [ini](https://legacy.reactjs.org/docs/hooks-state.html).

Berikut ini adalah apa yang diwakili oleh masing-masing variabel:

- `walletAddress` - sebuah string yang menyimpan alamat dompet pengguna
- `status` - string yang berisi pesan untuk ditampilkan di bagian bawah UI
- `name` - string yang menyimpan nama NFT
- `description` - string yang menyimpan deskripsi NFT
- `url` - string yang merupakan tautan ke aset digital NFT

Setelah variabel state, Anda akan melihat tiga fungsi yang belum diimplementasikan: `useEffect`, `connectWalletPressed`, dan `onMintPressed`. Anda akan melihat bahwa semua fungsi ini `async`, itu karena kita akan membuat panggilan API asinkron di dalamnya! Nama-nama mereka sama dengan fungsinya:

```javascript
useEffect(async () => {
  //TODO: implementasikan
}, [])

const connectWalletPressed = async () => {
  //TODO: implementasikan
}

const onMintPressed = async () => {
  //TODO: implementasikan
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - ini adalah hook React yang dipanggil setelah komponen Anda dirender. Karena ia memiliki prop array kosong `[]` yang dilewatkan ke dalamnya (lihat baris 3), ia hanya akan dipanggil pada render _pertama_ komponen. Di sini kita akan memanggil fungsi pendengar dompet dan fungsi dompet lain untuk memperbarui UI kita untuk merefleksikan apakah sebuah dompet sudah terhubung.
- `connectWalletPressed` - fungsi ini akan dipanggil untuk menghubungkan dompet MetaMask pengguna ke dapp kita.
- `onMintPressed` - fungsi ini akan dipanggil untuk mencetak NFT pengguna.

Di bagian akhir file ini, kita akan mendapatkan UI dari komponen kita. Jika Anda memeriksa kode ini dengan saksama, Anda akan melihat bahwa kami memperbarui variabel state `url`, `name`, dan `description` kami saat input di bidang teks yang sesuai berubah.

Anda juga akan melihat bahwa `connectWalletPressed` dan `onMintPressed` dipanggil saat tombol dengan ID `mintButton` dan `walletButton` masing-masing diklik.

```javascript
//UI dari komponen kita
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Terhubung: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Hubungkan Dompet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Pencetak NFT Alchemy</h1>
    <p>
      Cukup tambahkan tautan, nama, dan deskripsi aset Anda, lalu tekan "Cetak."
    </p>
    <form>
      <h2>🖼 Tautan ke aset: </h2>
      <input
        type="text"
        placeholder="misalnya, https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Nama: </h2>
      <input
        type="text"
        placeholder="misalnya, NFT pertamaku!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Deskripsi: </h2>
      <input
        type="text"
        placeholder="misalnya, Bahkan lebih keren dari cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Cetak NFT
    </button>
    <p id="status">{status}</p>
  </div>
)
```

Terakhir, mari kita bahas di mana komponen Minter ini ditambahkan.

Jika Anda membuka berkas `App.js`, yang merupakan komponen utama dalam React yang bertindak sebagai wadah untuk semua komponen lainnya, Anda akan melihat bahwa komponen Minter kita disuntikkan pada baris 7.

**Dalam tutorial ini, kita hanya akan mengedit `file Minter.js` dan menambahkan file di folder `src` kita.**

Sekarang setelah kita memahami apa yang sedang kita kerjakan, mari siapkan dompet Ethereum kita!

## Menyiapkan dompet Ethereum Anda {#set-up-your-ethereum-wallet}

Agar pengguna dapat berinteraksi dengan smart contract Anda, mereka perlu menghubungkan dompet Ethereum mereka ke dapp Anda.

### Mengunduh MetaMask {#download-metamask}

Untuk tutorial ini, kita akan menggunakan MetaMask, dompet virtual dalam peramban yang digunakan untuk mengelola alamat akun Ethereum Anda. Jika Anda ingin lebih memahami tentang cara kerja transaksi di Ethereum, lihat [halaman ini](/developers/docs/transactions/).

Anda dapat mengunduh dan membuat akun MetaMask secara gratis [di sini](https://metamask.io/download). Ketika Anda membuat akun, atau jika Anda sudah memiliki akun, pastikan untuk beralih ke "Ropsten Test Network" di bagian kanan atas (agar kita tidak berurusan dengan uang sungguhan).

### Menambahkan ether dari Faucet {#add-ether-from-faucet}

Untuk mencetak NFT kita (atau menandatangani transaksi apa pun di blockchain Ethereum), kita membutuhkan Eth palsu. Untuk mendapatkan Eth, Anda dapat membuka [faucet Ropsten](https://faucet.ropsten.be/) dan masukkan alamat akun Ropsten Anda, lalu klik “Kirim Ropsten Eth.” Anda akan segera melihat Eth di akun MetaMask Anda!

### Memeriksa saldo Anda {#check-your-balance}

Untuk memeriksa ulang saldo kita, mari buat permintaan [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) menggunakan [alat penyusun Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Ini akan mengembalikan jumlah Eth di dompet kita. Setelah Anda memasukkan alamat akun MetaMask Anda dan klik "Kirim Permintaan", Anda akan melihat respons seperti ini:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**CATATAN:** Hasil ini dalam wei, bukan eth. Wei digunakan sebagai denominasi terkecil dari ether. Konversi dari wei ke eth adalah: 1 eth = 10¹⁸ wei. Jadi, jika kita mengonversi 0xde0b6b3a7640000 ke desimal, kita akan mendapatkan 1\*10¹⁸ yang sama dengan 1 eth.

Fiuh! Uang palsu kita ada di sana! <Emoji text=":money_mouth_face:" size={1} />

## Menghubungkan MetaMask ke UI Anda {#connect-metamask-to-your-UI}

Sekarang dompet MetaMask kita sudah siap, mari hubungkan dapp kita ke dompet tersebut!

Karena kami ingin mengikuti paradigma [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), kami akan membuat file terpisah yang berisi fungsi kami untuk mengelola logika, data, dan aturan dapp kami, dan kemudian meneruskan fungsi-fungsi tersebut ke frontend kami (komponen Minter.js kami).

### Fungsi `connectWallet` {#connect-wallet-function}

Untuk melakukannya, mari kita buat folder baru bernama `utils` di direktori `src` Anda dan tambahkan file bernama `interact.js` di dalamnya, yang akan berisi semua fungsi interaksi dompet dan kontrak pintar kita.

Di file `interact.js` kita, kita akan menulis fungsi `connectWallet`, yang kemudian akan kita impor dan panggil di komponen `Minter.js` kita.

Pada berkas `interact.js` Anda, tambahkan berikut ini

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Tulis pesan di bidang teks di atas.",
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
              Anda harus menginstal MetaMask, dompet virtual Ethereum, di
              peramban Anda.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Mari kita uraikan apa yang dilakukan oleh kode ini:

Pertama, fungsi kita akan memeriksa apakah `window.ethereum` diaktifkan di peramban Anda.

`window.ethereum` adalah API global yang disuntikkan oleh MetaMask dan penyedia dompet lainnya yang memungkinkan situs web untuk meminta akun Ethereum pengguna. Jika disetujui, ia dapat membaca data dari blockchain yang terhubung dengan pengguna, dan menyarankan agar pengguna menandatangani pesan dan transaksi. Lihat [dokumentasi MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) untuk info lebih lanjut!

Jika `window.ethereum` _tidak_ ada, maka itu berarti MetaMask tidak terinstal. Ini menghasilkan objek JSON yang dikembalikan, di mana `address` yang dikembalikan adalah string kosong, dan objek `status` JSX menyampaikan bahwa pengguna harus menginstal MetaMask.

**Sebagian besar fungsi yang kita tulis akan mengembalikan objek JSON yang dapat kita gunakan untuk memperbarui variabel state dan UI kita.**

Sekarang jika `window.ethereum` _ada_, saat itulah segalanya menjadi menarik.

Menggunakan perulangan coba/tangkap, kita akan mencoba menyambungkan ke MetaMask dengan memanggil [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Memanggil fungsi ini akan membuka MetaMask di browser, di mana pengguna akan diminta untuk menghubungkan dompet mereka ke dapp Anda.

- Jika pengguna memilih untuk terhubung, `method: "eth_requestAccounts"` akan mengembalikan sebuah array yang berisi semua alamat akun pengguna yang terhubung ke dapp. Secara keseluruhan, fungsi `connectWallet` kita akan mengembalikan objek JSON yang berisi `address` _pertama_ dalam array ini \(lihat baris 9\) dan pesan `status` yang meminta pengguna untuk menulis pesan ke kontrak pintar.
- Jika pengguna menolak koneksi, maka objek JSON akan berisi string kosong untuk `address` yang dikembalikan dan pesan `status` yang mencerminkan bahwa pengguna menolak koneksi.

### Menambahkan fungsi connectWallet ke Komponen UI Minter.js Anda {#add-connect-wallet}

Sekarang setelah kita menulis fungsi `connectWallet` ini, mari kita hubungkan ke komponen `Minter.js` kita.

Pertama, kita harus mengimpor fungsi kita ke file `Minter.js` kita dengan menambahkan `import { connectWallet } from "./utils/interact.js";` ke bagian atas file `Minter.js`. 11 baris pertama `Minter.js` Anda sekarang akan terlihat seperti ini:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Variabel state
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

Perhatikan bagaimana sebagian besar fungsionalitas kami diabstraksikan dari komponen `Minter.js` dari file `interact.js`? Hal ini kami lakukan agar kami mematuhi paradigma M-V-C!

Di `connectWalletPressed`, kita hanya membuat panggilan tunggu ke fungsi `connectWallet` yang diimpor, dan menggunakan responsnya, kita memperbarui variabel `status` dan `walletAddress` kita melalui hook state mereka.

Sekarang, mari simpan kedua file `Minter.js` dan `interact.js` dan uji UI kita sejauh ini.

Buka browser Anda di localhost:3000, dan tekan tombol "Hubungkan Dompet" di bagian kanan atas halaman.

Jika Anda telah menginstal MetaMask, Anda akan diminta untuk menghubungkan dompet Anda ke dapp. Terima undangan untuk terhubung.

Anda akan melihat bahwa tombol dompet sekarang mencerminkan bahwa alamat Anda telah terhubung.

Selanjutnya, coba segarkan halaman... ini aneh. Tombol dompet kami meminta kami untuk menghubungkan MetaMask, meskipun sudah terhubung...

Namun, jangan khawatir! Kita dapat dengan mudah memperbaikinya dengan mengimplementasikan fungsi yang disebut `getCurrentWalletConnected`, yang akan memeriksa apakah sebuah alamat telah terhubung ke dapp kita dan memperbarui UI kita sesuai dengan itu!

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
          status: "👆🏽 Tulis pesan di bidang teks di atas.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Hubungkan ke MetaMask menggunakan tombol kanan atas.",
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
              Anda harus menginstal MetaMask, dompet virtual Ethereum, di
              peramban Anda.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Kode ini _sangat_ mirip dengan fungsi `connectWallet` yang baru saja kita tulis sebelumnya.

Perbedaan utamanya adalah bahwa alih-alih memanggil metode `eth_requestAccounts`, yang membuka MetaMask bagi pengguna untuk menghubungkan dompet mereka, di sini kita memanggil metode `eth_accounts`, yang hanya mengembalikan sebuah array yang berisi alamat MetaMask yang saat ini terhubung ke dapp kita.

Untuk melihat fungsi ini beraksi, mari kita panggil di fungsi `useEffect` dari komponen `Minter.js` kita.

Seperti yang kita lakukan untuk `connectWallet`, kita harus mengimpor fungsi ini dari file `interact.js` kita ke file `Minter.js` kita seperti ini:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //impor di sini
} from "./utils/interact.js"
```

Sekarang, kita tinggal memanggilnya di fungsi `useEffect` kita:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Perhatikan, kami menggunakan respons dari panggilan kami ke `getCurrentWalletConnected` untuk memperbarui variabel state `walletAddress` dan `status` kami.

Setelah Anda menambahkan kode ini, coba segarkan jendela browser Anda. Tombolnya akan mengatakan bahwa Anda terhubung, dan menampilkan pratinjau alamat dompet Anda yang terhubung - bahkan setelah Anda menyegarkan!

### Mengimplementasikan addWalletListener {#implement-add-wallet-listener}

Langkah terakhir dalam penyiapan dompet dapp kita adalah mengimplementasikan pendengar dompet sehingga UI kita diperbarui ketika state dompet kita berubah, seperti ketika pengguna memutuskan koneksi atau beralih akun.

Di file `Minter.js` Anda, tambahkan fungsi `addWalletListener` yang terlihat seperti berikut:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Tulis pesan di bidang teks di atas.")
      } else {
        setWallet("")
        setStatus("🦊 Hubungkan ke MetaMask menggunakan tombol kanan atas.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Anda harus menginstal MetaMask, dompet virtual Ethereum, di peramban Anda.
        </a>
      </p>
    )
  }
}
```

Mari kita uraikan dengan cepat apa yang terjadi di sini:

- Pertama, fungsi kita memeriksa apakah `window.ethereum` diaktifkan (yaitu, MetaMask diinstal).
  - Jika tidak, kita hanya mengatur variabel state `status` kita ke string JSX yang meminta pengguna untuk menginstal MetaMask.
  - Jika diaktifkan, kita mengatur pendengar `window.ethereum.on("accountsChanged")` pada baris 3 yang mendengarkan perubahan state di dompet MetaMask, yang meliputi saat pengguna menghubungkan akun tambahan ke dapp, beralih akun, atau memutuskan koneksi akun. Jika ada setidaknya satu akun yang terhubung, variabel state `walletAddress` diperbarui sebagai akun pertama dalam array `accounts` yang dikembalikan oleh pendengar. Jika tidak, `walletAddress` diatur sebagai string kosong.

Terakhir, kita harus memanggilnya di fungsi `useEffect` kita:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Dan voila! Kita telah menyelesaikan semua pemrograman fungsionalitas dompet kita! Sekarang dompet kita sudah diatur, mari kita cari tahu cara mencetak NFT kita!

## Metadata NFT 101 {#nft-metadata-101}

Jadi ingat metadata NFT yang baru saja kita bicarakan di Langkah 0 tutorial ini—ia menghidupkan NFT, memungkinkannya memiliki properti, seperti aset digital, nama, deskripsi, dan atribut lainnya.

Kita perlu mengonfigurasi metadata ini sebagai objek JSON dan menyimpannya, sehingga kita dapat meneruskannya sebagai parameter `tokenURI` saat memanggil fungsi `mintNFT` kontrak pintar kita.

Teks di bidang "Tautan ke Aset", "Nama", "Deskripsi" akan terdiri dari berbagai properti metadata NFT kita. Kami akan memformat metadata ini sebagai objek JSON, tetapi ada beberapa opsi untuk tempat kami dapat menyimpan objek JSON ini:

- Kita bisa menyimpannya di rantai blok Ethereum; namun, melakukannya akan sangat mahal.
- Kita bisa menyimpannya di server terpusat, seperti AWS atau Firebase. Tapi itu akan mengalahkan etos desentralisasi kita.
- Kita dapat menggunakan IPFS, protokol terdesentralisasi dan jaringan peer-to-peer untuk menyimpan dan berbagi data dalam sistem file terdistribusi. Karena protokol ini terdesentralisasi dan gratis, ini adalah pilihan terbaik kita!

Untuk menyimpan metadata kita di IPFS, kita akan menggunakan [Pinata](https://pinata.cloud/), sebuah API dan toolkit IPFS yang nyaman. Pada langkah selanjutnya, kami akan menjelaskan dengan tepat cara melakukannya!

## Gunakan Pinata untuk menyematkan metadata Anda ke IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Jika Anda tidak memiliki akun [Pinata](https://pinata.cloud/), daftar untuk mendapatkan akun gratis [di sini](https://app.pinata.cloud/auth/signup) dan selesaikan langkah-langkah untuk memverifikasi email dan akun Anda.

### Buat kunci API Pinata Anda {#create-pinata-api-key}

Navigasi ke halaman [https://pinata.cloud/keys](https://pinata.cloud/keys), lalu pilih tombol "Kunci Baru" di bagian atas, atur widget Admin sebagai diaktifkan, dan beri nama kunci Anda.

Anda kemudian akan ditampilkan popup dengan info API Anda. Pastikan untuk meletakkannya di tempat yang aman.

Sekarang setelah kunci kami diatur, mari kita tambahkan ke proyek kita agar kita dapat menggunakannya.

### Buat file .env {#create-a-env}

Kita dapat menyimpan kunci dan rahasia Pinata kita dengan aman di file lingkungan. Mari kita instal [paket dotenv](https://www.npmjs.com/package/dotenv) di direktori proyek Anda.

Buka tab baru di terminal Anda (terpisah dari yang menjalankan host lokal) dan pastikan Anda berada di folder `minter-starter-files`, lalu jalankan perintah berikut di terminal Anda:

```text
npm install dotenv --save
```

Selanjutnya, buat file `.env` di direktori root dari `minter-starter-files` Anda dengan memasukkan yang berikut di baris perintah Anda:

```javascript
vim .env
```

Ini akan membuka file `.env` Anda di vim (editor teks). Untuk menyimpannya, tekan "esc" + ":" + "q" pada keyboard Anda secara berurutan.

Selanjutnya, di VSCode, navigasikan ke file `.env` Anda dan tambahkan kunci API Pinata dan rahasia API Anda ke dalamnya, seperti ini:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Simpan file tersebut, dan kemudian Anda siap untuk mulai menulis fungsi untuk mengunggah metadata JSON Anda ke IPFS!

### Mengimplementasikan pinJSONToIPFS {#pin-json-to-ipfs}

Untungnya bagi kita, Pinata memiliki [API khusus untuk mengunggah data JSON ke IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) dan contoh JavaScript yang nyaman dengan axios yang dapat kita gunakan, dengan beberapa modifikasi kecil.

Di folder `utils` Anda, mari kita buat file lain bernama `pinata.js` dan kemudian impor rahasia dan kunci Pinata kita dari file .env seperti ini:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Selanjutnya, tempelkan kode tambahan dari bawah ke file `pinata.js` Anda. Jangan khawatir, kami akan menguraikan apa artinya semua itu!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //membuat permintaan POST axios ke Pinata ⬇️
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

Jadi, apa yang sebenarnya dilakukan oleh kode ini?

Pertama, ia mengimpor [axios](https://www.npmjs.com/package/axios), klien HTTP berbasis janji untuk peramban dan node.js, yang akan kita gunakan untuk membuat permintaan ke Pinata.

Kemudian kita memiliki fungsi asinkron `pinJSONToIPFS`, yang mengambil `JSONBody` sebagai inputnya dan kunci serta rahasia api Pinata di headernya, semua untuk membuat permintaan POST ke API `pinJSONToIPFS` mereka.

- Jika permintaan POST ini berhasil, maka fungsi kita mengembalikan objek JSON dengan boolean `success` sebagai true dan `pinataUrl` di mana metadata kita disematkan. Kami akan menggunakan `pinataUrl` yang dikembalikan ini sebagai input `tokenURI` ke fungsi cetak kontrak pintar kami.
- Jika permintaan posting ini gagal, maka fungsi kami mengembalikan objek JSON dengan boolean `success` sebagai false dan string `message` yang menyampaikan kesalahan kami.

Seperti halnya tipe pengembalian fungsi `connectWallet` kami, kami mengembalikan objek JSON sehingga kami dapat menggunakan parameternya untuk memperbarui variabel state dan UI kami.

## Memuat kontrak pintar Anda {#load-your-smart-contract}

Sekarang setelah kita memiliki cara untuk mengunggah metadata NFT kita ke IPFS melalui fungsi `pinJSONToIPFS` kita, kita akan memerlukan cara untuk memuat instance kontrak pintar kita sehingga kita dapat memanggil fungsi `mintNFT` nya.

Seperti yang kami sebutkan sebelumnya, dalam tutorial ini kami akan menggunakan [kontrak pintar NFT yang ada ini](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); namun, jika Anda ingin mempelajari cara kami membuatnya, atau membuatnya sendiri, kami sangat menyarankan Anda memeriksa tutorial kami yang lain, ["Cara Membuat NFT."](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI kontrak {#contract-abi}

Jika Anda memeriksa file kami dengan cermat, Anda akan melihat bahwa di direktori `src` kami, ada file `contract-abi.json`. ABI diperlukan untuk menentukan fungsi mana yang akan dipanggil oleh kontrak serta memastikan bahwa fungsi tersebut akan mengembalikan data dalam format yang Anda harapkan.

Kami juga akan memerlukan kunci API Alchemy dan API Web3 Alchemy untuk terhubung ke rantai blok Ethereum dan memuat kontrak pintar kami.

### Buat kunci API Alchemy Anda {#create-alchemy-api}

Jika Anda belum memiliki akun Alchemy, [daftar gratis di sini.](https://alchemy.com/?a=eth-org-nft-minter)

Setelah Anda membuat akun Alchemy, Anda dapat membuat kunci API dengan membuat aplikasi. Ini akan memungkinkan kita untuk membuat permintaan ke jaringan pengujian Ropsten.

Arahkan ke halaman "Buat Aplikasi" di Dasbor Alchemy Anda dengan mengarahkan kursor ke "Aplikasi" di bilah navigasi dan mengklik "Buat Aplikasi".

Beri nama aplikasi Anda, kami memilih "NFT Pertamaku!", tawarkan deskripsi singkat, pilih "Staging" untuk Lingkungan yang digunakan untuk pembukuan aplikasi Anda, dan pilih "Ropsten" untuk jaringan Anda.

Klik "Buat aplikasi" dan selesai! Aplikasi Anda akan muncul dalam tabel di bawahnya.

Luar biasa, jadi sekarang setelah kita membuat URL API HTTP Alchemy kita, salin ke papan klip Anda...

…dan kemudian mari kita tambahkan ke file `.env` kita. Secara keseluruhan, file .env Anda akan terlihat seperti ini:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Sekarang setelah kita memiliki ABI kontrak dan kunci API Alchemy, kita siap untuk memuat kontrak pintar kita menggunakan [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Mengatur endpoint dan kontrak Alchemy Web3 Anda {#setup-alchemy-endpoint}

Pertama, jika Anda belum memilikinya, Anda perlu menginstal [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) dengan menavigasi ke direktori beranda: `nft-minter-tutorial` di terminal:

```text
cd ..
npm install @alch/alchemy-web3
```

Selanjutnya mari kita kembali ke file `interact.js` kita. Di bagian atas file, tambahkan kode berikut untuk mengimpor kunci Alchemy Anda dari file .env Anda dan atur titik akhir Alchemy Web3 Anda:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) adalah pembungkus di sekitar [Web3.js](https://docs.web3js.org/), menyediakan metode API yang disempurnakan dan manfaat penting lainnya untuk membuat hidup Anda sebagai pengembang web3 lebih mudah. Ini dirancang untuk membutuhkan konfigurasi minimal sehingga Anda dapat mulai menggunakannya di aplikasi Anda segera!

Selanjutnya, mari kita tambahkan ABI kontrak dan alamat kontrak kita ke file kita.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Setelah kita memiliki keduanya, kita siap untuk mulai membuat kode fungsi cetak kita!

## Mengimplementasikan fungsi mintNFT {#implement-the-mintnft-function}

Di dalam file `interact.js` Anda, mari kita definisikan fungsi kita, `mintNFT`, yang secara eponim akan mencetak NFT kita.

Karena kita akan melakukan banyak panggilan asinkron (ke Pinata untuk menyematkan metadata kita ke IPFS, Alchemy Web3 untuk memuat kontrak pintar kita, dan MetaMask untuk menandatangani transaksi kita), fungsi kita juga akan asinkron.

Tiga input untuk fungsi kami adalah `url` aset digital kami, `name`, dan `description`. Tambahkan tanda tangan fungsi berikut di bawah fungsi `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Penanganan kesalahan input {#input-error-handling}

Tentu saja, masuk akal untuk memiliki semacam penanganan kesalahan input di awal fungsi, sehingga kita keluar dari fungsi ini jika parameter input kita tidak benar. Di dalam fungsi kita, mari kita tambahkan kode berikut:

```javascript
export const mintNFT = async (url, name, description) => {
  //penanganan eror
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Pastikan semua bidang diisi sebelum mencetak.",
    }
  }
}
```

Intinya, jika ada parameter input yang merupakan string kosong, maka kita mengembalikan objek JSON di mana boolean `success` adalah false, dan string `status` menyampaikan bahwa semua bidang di UI kita harus lengkap.

### Mengunggah metadata ke IPFS {#upload-metadata-to-ipfs}

Setelah kita tahu metadata kita diformat dengan benar, langkah selanjutnya adalah membungkusnya ke dalam objek JSON dan mengunggahnya ke IPFS melalui `pinJSONToIPFS` yang kita tulis!

Untuk melakukannya, pertama-tama kita perlu mengimpor fungsi `pinJSONToIPFS` ke dalam file `interact.js` kita. Di bagian paling atas dari `interact.js`, mari kita tambahkan:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Ingat bahwa `pinJSONToIPFS` menerima badan JSON. Jadi sebelum kita memanggilnya, kita perlu memformat parameter `url`, `name`, dan `description` kita menjadi objek JSON.

Mari kita perbarui kode kita untuk membuat objek JSON bernama `metadata` dan kemudian melakukan panggilan ke `pinJSONToIPFS` dengan parameter `metadata` ini:

```javascript
export const mintNFT = async (url, name, description) => {
  //penanganan eror
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Pastikan semua bidang diisi sebelum mencetak.",
    }
  }

  //buat metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //lakukan panggilan pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Terjadi kesalahan saat mengunggah tokenURI Anda.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Perhatikan, kami menyimpan respons dari panggilan kami ke `pinJSONToIPFS(metadata)` di objek `pinataResponse`. Kemudian, kami mem-parsing objek ini untuk setiap kesalahan.

Jika ada kesalahan, kami mengembalikan objek JSON di mana boolean `success` adalah false dan string `status` kami menyampaikan bahwa panggilan kami gagal. Jika tidak, kami mengekstrak `pinataURL` dari `pinataResponse` dan menyimpannya sebagai variabel `tokenURI` kami.

Sekarang saatnya memuat kontrak pintar kami menggunakan API Alchemy Web3 yang kami inisialisasi di bagian atas file kami. Tambahkan baris kode berikut ke bagian bawah fungsi `mintNFT` untuk mengatur kontrak pada variabel global `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Hal terakhir yang perlu ditambahkan dalam fungsi `mintNFT` kami adalah transaksi Ethereum kami:

```javascript
//siapkan transaksi Ethereum Anda
const transactionParameters = {
  to: contractAddress, // Wajib kecuali selama publikasi kontrak.
  from: window.ethereum.selectedAddress, // harus cocok dengan alamat aktif pengguna.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //lakukan panggilan ke kontrak pintar NFT
}

//tanda tangani transaksi melalui MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Lihat transaksi Anda di Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Terjadi kesalahan: " + error.message,
  }
}
```

Jika Anda sudah terbiasa dengan transaksi Ethereum, Anda akan melihat bahwa strukturnya cukup mirip dengan yang pernah Anda lihat.

- Pertama, kami mengatur parameter transaksi kami.
  - `to` menentukan alamat penerima (kontrak pintar kami)
  - `from` menentukan penanda tangan transaksi (alamat pengguna yang terhubung ke MetaMask: `window.ethereum.selectedAddress`)
  - `data` berisi panggilan ke metode `mintNFT` kontrak pintar kami, yang menerima `tokenURI` kami dan alamat dompet pengguna, `window.ethereum.selectedAddress`, sebagai input
- Kemudian, kami membuat panggilan tunggu, `window.ethereum.request,` di mana kami meminta MetaMask untuk menandatangani transaksi. Perhatikan, dalam permintaan ini, kami menentukan metode eth kami (eth_SentTransaction) dan meneruskan `transactionParameters` kami. Pada titik ini, MetaMask akan terbuka di peramban, dan meminta pengguna untuk menandatangani atau menolak transaksi.
  - Jika transaksi berhasil, fungsi akan mengembalikan objek JSON di mana boolean `success` diatur ke true dan string `status` meminta pengguna untuk memeriksa Etherscan untuk informasi lebih lanjut tentang transaksi mereka.
  - Jika transaksi gagal, fungsi akan mengembalikan objek JSON di mana `success` boolean diatur ke false, dan string `status` menyampaikan pesan kesalahan.

Secara keseluruhan, fungsi `mintNFT` kita akan terlihat seperti ini:

```javascript
export const mintNFT = async (url, name, description) => {
  //penanganan eror
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Pastikan semua bidang diisi sebelum mencetak.",
    }
  }

  //buat metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //permintaan pin pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Terjadi kesalahan saat mengunggah tokenURI Anda.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //muat kontrak pintar
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //siapkan transaksi Ethereum Anda
  const transactionParameters = {
    to: contractAddress, // Wajib kecuali selama publikasi kontrak.
    from: window.ethereum.selectedAddress, // harus cocok dengan alamat aktif pengguna.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //lakukan panggilan ke kontrak pintar NFT
  }

  //tanda tangani transaksi via MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Lihat transaksi Anda di Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Terjadi kesalahan: " + error.message,
    }
  }
}
```

Itu satu fungsi raksasa! Sekarang, kita hanya perlu menghubungkan fungsi `mintNFT` kita ke komponen `Minter.js` kita...

## Hubungkan mintNFT ke frontend Minter.js kami {#connect-our-frontend}

Buka file `Minter.js` Anda dan perbarui baris `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` di bagian atas menjadi:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Terakhir, implementasikan fungsi `onMintPressed` untuk membuat panggilan tunggu ke fungsi `mintNFT` yang Anda impor dan perbarui variabel state `status` untuk mencerminkan apakah transaksi kami berhasil atau gagal:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Menyebarkan NFT Anda ke situs web langsung {#deploy-your-NFT}

Siap untuk meluncurkan proyek Anda secara langsung agar pengguna dapat berinteraksi dengannya? Lihat [tutorial ini](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) untuk menyebarkan Minter Anda ke situs web langsung.

Satu langkah terakhir...

## Mengguncang dunia rantai blok {#take-the-blockchain-world-by-storm}

Hanya bercanda, Anda telah berhasil sampai di akhir tutorial!

Sebagai rekap, dengan membangun pencetak NFT, Anda telah berhasil mempelajari cara:

- Terhubung ke MetaMask melalui proyek frontend Anda
- Panggil metode kontrak pintar dari frontend Anda
- Menandatangani transaksi menggunakan MetaMask

Agaknya, Anda ingin dapat memamerkan NFT yang dicetak melalui dapp Anda di dompet Anda — jadi pastikan untuk memeriksa tutorial singkat kami [Cara Melihat NFT Anda di Dompet Anda](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

Dan, seperti biasa, jika Anda memiliki pertanyaan, kami siap membantu di [Alchemy Discord](https://discord.gg/gWuC7zB). Kami tidak sabar untuk melihat bagaimana Anda menerapkan konsep dari tutorial ini ke proyek masa depan Anda!
