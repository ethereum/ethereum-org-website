---
title: Cara mengembangkan dan menguji dapp di testnet lokal dengan banyak klien
description: Panduan ini pertama-tama akan memandu Anda tentang cara menginisiasi dan mengonfigurasi testnet Ethereum lokal dengan banyak klien sebelum menggunakan testnet tersebut untuk menyebarkan & menguji dapp.
author: "Tedi Mitiku"
tags:
  [
    "klien",
    "node",
    "kontrak pintar",
    "kemampuan untuk disusun",
    "lapisan konsensus",
    "lapisan eksekusi",
    "pengujian",
  ]
skill: intermediate
breadcrumb: Testnet banyak klien
lang: id
published: 2023-04-11
---

## Pengantar {#introduction}

Panduan ini memandu Anda melalui proses menginisiasi testnet Ethereum lokal yang dapat dikonfigurasi, menyebarkan kontrak pintar ke dalamnya, dan menggunakan testnet tersebut untuk menjalankan pengujian terhadap aplikasi terdesentralisasi (dapp) Anda. Panduan ini dirancang untuk pengembang dapp yang ingin mengembangkan dan menguji dapp mereka secara lokal terhadap berbagai konfigurasi jaringan sebelum menyebarkannya ke testnet langsung atau Mainnet.

Dalam panduan ini, Anda akan:

- Menginisiasi testnet Ethereum lokal dengan [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) menggunakan [Kurtosis](https://www.kurtosis.com/),
- Menghubungkan lingkungan pengembangan dapp Hardhat Anda ke testnet lokal untuk mengompilasi, menyebarkan, dan menguji dapp, dan
- Mengonfigurasi testnet lokal, termasuk parameter seperti jumlah node dan pasangan klien EL/CL tertentu, untuk memungkinkan alur kerja pengembangan dan pengujian terhadap berbagai konfigurasi jaringan.

### Apa itu Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) adalah sistem pembangunan yang dapat disusun yang dirancang untuk mengonfigurasi lingkungan pengujian multi-kontainer. Ini secara khusus memungkinkan pengembang untuk membuat lingkungan yang dapat direproduksi yang memerlukan logika penyiapan dinamis, seperti testnet rantai blok.

Dalam panduan ini, `ethereum-package` Kurtosis, yang dikelola oleh [ethPandaOps](https://ethpandaops.io/), menjalankan testnet Ethereum lokal. Ini mendukung semua klien Lapisan Eksekusi (EL) utama, seperti [`geth`](https://geth.ethereum.org/), dan klien Lapisan Konsensus (CL), seperti [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), dan [`lodestar`](https://lodestar.chainsafe.io/). Paket ini berfungsi sebagai alternatif yang dapat dikonfigurasi dan dapat disusun untuk jaringan dalam kerangka kerja seperti Hardhat Network dan Anvil. Kurtosis menawarkan pengembang kontrol dan fleksibilitas yang lebih besar atas testnet yang mereka gunakan, yang merupakan alasan utama mengapa tim klien Ethereum menggunakannya untuk menguji peningkatan jaringan.

## Menyiapkan Kurtosis {#setting-up-kurtosis}

Sebelum Anda melanjutkan, pastikan Anda telah:

- [Menginstal dan memulai mesin Docker](https://docs.kurtosis.com/install/#i-install--start-docker) di mesin lokal Anda
- [Menginstal CLI Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (atau memutakhirkannya ke rilis terbaru, jika Anda sudah menginstal CLI)
- Menginstal [Node.js](https://nodejs.org/en) (untuk lingkungan dapp Anda)

## Menginisiasi testnet Ethereum lokal {#instantiate-testnet}

Untuk menjalankan testnet Ethereum lokal, jalankan:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Catatan: Perintah ini menamai jaringan Anda "local-eth-testnet" menggunakan tanda `--enclave`.

Kurtosis akan mencetak langkah-langkah yang diambilnya secara internal saat ia bekerja untuk menafsirkan, memvalidasi, dan kemudian mengeksekusi instruksi. Pada akhirnya, ia mencetak ringkasan dari enklaf yang dibuatnya. Ringkasan tersebut mencakup daftar **artefak file** dan daftar **layanan pengguna**. Dengan konfigurasi default, layanan pengguna mencakup satu node:

- `el-1-geth-lighthouse`, klien eksekusi `geth`
- `cl-1-lighthouse-geth`, simpul suar `lighthouse`
- `vc-1-geth-lighthouse`, klien validator `lighthouse`

Setiap layanan dicantumkan dengan port yang dieksposnya dan port lokal tempat masing-masing dipetakan. Misalnya, port `rpc` dari layanan `el-1-geth-lighthouse` adalah titik akhir JSON-RPC yang akan digunakan oleh alat dapp Anda. Layanan dan nomor port yang tepat akan berbeda di mesin Anda.

Anda dapat melihat ringkasan ini lagi kapan saja dengan menjalankan:

```sh
kurtosis enclave inspect local-eth-testnet
```

Selamat! Anda menggunakan Kurtosis untuk menginisiasi testnet Ethereum lokal, dengan klien CL (`lighthouse`) dan EL (`geth`), melalui Docker.

### Tinjauan {#review-instantiate-testnet}

Di bagian ini, Anda mengeksekusi perintah yang mengarahkan Kurtosis untuk menggunakan [`ethereum-package` yang dihosting dari jarak jauh di GitHub](https://github.com/ethpandaops/ethereum-package) untuk menjalankan testnet Ethereum lokal di dalam [Enklaf](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. Di dalam enklaf Anda, Anda akan menemukan "artefak file" dan "layanan pengguna".

[Artefak File](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) di enklaf Anda mencakup semua data yang dihasilkan dan digunakan untuk mem-bootstrap klien EL dan CL, seperti file genesis dan kunci validator. Data genesis dibuat menggunakan [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator).

Layanan pengguna menampilkan semua layanan dalam kontainer yang beroperasi di enklaf Anda. Anda akan melihat bahwa satu node, yang menampilkan klien EL dan klien CL, telah dibuat.

## Hubungkan lingkungan pengembangan dapp Anda ke testnet Ethereum lokal {#connect-your-dapp}

### Siapkan lingkungan pengembangan dapp {#set-up-dapp-env}

Sekarang setelah Anda memiliki testnet lokal yang berjalan, Anda dapat menghubungkan lingkungan pengembangan aplikasi terdesentralisasi (dapp) Anda untuk menggunakan testnet lokal Anda. Kerangka kerja Hardhat akan digunakan dalam panduan ini untuk menyebarkan dapp blackjack ke testnet lokal Anda.

Untuk menyiapkan lingkungan pengembangan dapp Anda, kloning repositori yang berisi contoh dapp kami dan instal dependensinya, jalankan:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

Tanda `--legacy-peer-deps` diperlukan karena beberapa plugin Hardhat dari proyek sampel mendeklarasikan versi dependensi peer yang bertentangan.

Folder [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) yang digunakan di sini berisi penyiapan umum untuk pengembang dapp yang menggunakan kerangka kerja [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) berisi beberapa kontrak pintar sederhana untuk dapp Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) berisi skrip untuk menyebarkan kontrak token ke jaringan Ethereum lokal Anda
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) berisi pengujian .js sederhana untuk kontrak token Anda guna mengonfirmasi bahwa setiap pemain di dapp Blackjack kami memiliki 1000 yang dicetak untuk mereka
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) mengonfigurasi penyiapan Hardhat Anda

### Konfigurasikan Hardhat untuk menggunakan testnet lokal {#configure-hardhat}

Dengan lingkungan pengembangan dapp Anda yang telah disiapkan, Anda sekarang akan menghubungkan Hardhat untuk menggunakan testnet Ethereum lokal yang dihasilkan menggunakan Kurtosis. Pertama, temukan alamat lokal dari titik akhir JSON-RPC dari klien eksekusi:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

Outputnya adalah URL seperti `http://127.0.0.1:32769`. Port Anda akan berbeda. Ganti `<PORT>` di struktur `localnet` dalam file konfigurasi `hardhat.config.ts` Anda dengan port ini.

Contoh di `hardhat.config.ts`:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: GANTI <PORT> DENGAN PORT DARI URI NODE YANG DIHASILKAN OLEH PAKET KURTOSIS JARINGAN ETH
  // Ini adalah kunci privat yang terkait dengan akun pengujian yang telah didanai sebelumnya yang dibuat oleh eth-network-package
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

Kunci privat ini adalah kunci pengujian yang diketahui publik. Jangan pernah menggunakannya di Mainnet atau jaringan publik mana pun.

Setelah Anda menyimpan file Anda, lingkungan pengembangan dapp Hardhat Anda sekarang terhubung ke testnet Ethereum lokal Anda! Anda dapat memverifikasi bahwa testnet Anda berfungsi dengan menjalankan:

```sh
npx hardhat balances --network localnet
```

Output mencantumkan alamat dan saldo dari masing-masing akun di atas. Misalnya, baris pertama akan terlihat seperti ini:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

Ini mengonfirmasi bahwa Hardhat menggunakan testnet lokal Anda dan mendeteksi akun yang didanai sebelumnya yang dibuat oleh `ethereum-package`.

### Sebarkan dan uji dapp Anda secara lokal {#deploy-and-test-dapp}

Dengan lingkungan pengembangan dapp yang sepenuhnya terhubung ke testnet Ethereum lokal, Anda sekarang dapat menjalankan alur kerja pengembangan dan pengujian terhadap dapp Anda menggunakan testnet lokal.

Untuk mengompilasi dan menyebarkan kontrak pintar `ChipToken.sol` untuk pembuatan prototipe dan pengembangan lokal, jalankan:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Outputnya akan terlihat seperti:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Sekarang coba jalankan pengujian `ChipToken.js` terhadap dapp lokal Anda untuk mengonfirmasi bahwa setiap pemain di dapp Blackjack kami memiliki 1000 yang dicetak untuk mereka. Pengujian sampel masih menggunakan fungsi `deployed()` ethers v5, yang digantikan oleh ethers v6 dengan `waitForDeployment()`, jadi perbarui terlebih dahulu:

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

Kemudian jalankan pengujian:

```sh
npx hardhat test --network localnet
```

Outputnya akan terlihat seperti ini:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Tinjauan {#review-dapp-workflows}

Pada titik ini, Anda sekarang telah menyiapkan lingkungan pengembangan dapp, menghubungkannya ke jaringan Ethereum lokal yang dibuat oleh Kurtosis, dan telah mengompilasi, menyebarkan, serta menjalankan pengujian sederhana terhadap dapp Anda.

Sekarang mari kita jelajahi bagaimana Anda dapat mengonfigurasi jaringan yang mendasarinya untuk menguji dapp kita di bawah berbagai konfigurasi jaringan.

## Mengonfigurasi testnet Ethereum lokal {#configure-testnet}

### Mengubah konfigurasi klien dan jumlah node {#configure-client-config-and-num-nodes}

Testnet Ethereum lokal Anda dapat dikonfigurasi untuk menggunakan pasangan klien EL dan CL yang berbeda, serta jumlah node yang bervariasi, tergantung pada skenario dan konfigurasi jaringan tertentu yang ingin Anda kembangkan atau uji. Ini berarti bahwa, setelah disiapkan, Anda dapat menjalankan testnet lokal yang disesuaikan dan menggunakannya untuk menjalankan alur kerja yang sama (penyebaran, pengujian, dll.) di bawah berbagai konfigurasi jaringan untuk memastikan semuanya berfungsi seperti yang diharapkan. Untuk mempelajari lebih lanjut tentang parameter lain yang dapat Anda modifikasi, lihat [dokumentasi konfigurasi `ethereum-package`](https://github.com/ethpandaops/ethereum-package#configuration).

Cobalah! Anda dapat meneruskan berbagai opsi konfigurasi ke `ethereum-package` melalui file YAML. File parameter jaringan ini menyediakan konfigurasi spesifik yang akan digunakan Kurtosis untuk menyiapkan jaringan Ethereum lokal.

Buat file bernama `network_params.yaml` yang menjalankan tiga node dengan pasangan EL/CL yang berbeda:

- Node 1 dengan `geth`/`lighthouse`
- Node 2 dengan `geth`/`lodestar`
- Node 3 dengan `geth`/`teku`

Konfigurasi ini membuat jaringan heterogen dari implementasi node Ethereum untuk menguji dapp Anda. File konfigurasi Anda akan terlihat seperti:

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

Setiap entri di `participants` memetakan ke sebuah node di jaringan, jadi 3 entri `participants` akan memberi tahu Kurtosis untuk menjalankan 3 node di jaringan Anda. Setiap entri memungkinkan Anda untuk menentukan pasangan EL dan CL yang digunakan untuk node spesifik tersebut. Parameter apa pun yang tidak Anda tentukan akan mempertahankan nilai defaultnya.

Struktur `network_params` mengonfigurasi pengaturan jaringan yang digunakan untuk membuat file genesis untuk setiap node serta pengaturan lain seperti detik per slot dari jaringan.

Simpan file parameter Anda dan kemudian gunakan untuk menjalankan paket Kurtosis Anda dengan menjalankan:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Catatan: perintah `kurtosis clean -a` digunakan di sini untuk menginstruksikan Kurtosis agar menghancurkan testnet lama dan isinya sebelum memulai yang baru.

Sekali lagi, Kurtosis akan bekerja sebentar dan mencetak langkah-langkah individual yang sedang berlangsung. Pada akhirnya, ia mencetak ringkasan enklaf. Kali ini, layanan pengguna mencakup tiga node, misalnya `el-1-geth-lighthouse`, `el-2-geth-lodestar`, dan `el-3-geth-teku` untuk klien eksekusi, bersama dengan klien konsensus dan validator yang cocok.

Selamat! Anda telah berhasil mengonfigurasi testnet lokal Anda untuk memiliki 3 node alih-alih 1. Untuk menjalankan alur kerja yang sama seperti yang Anda lakukan sebelumnya terhadap dapp Anda (menyebarkan & menguji), lakukan operasi yang sama seperti yang kita lakukan sebelumnya dengan mengganti `<PORT>` di struktur `localnet` dalam file konfigurasi `hardhat.config.ts` Anda dengan port `rpc` dari layanan `el-<num>-...` mana pun di testnet lokal 3 node Anda yang baru.

## Kesimpulan {#conclusion}

Dan itu saja! Untuk merangkum panduan singkat ini, Anda:

- Membuat testnet Ethereum lokal melalui Docker menggunakan Kurtosis
- Menghubungkan lingkungan pengembangan dapp lokal Anda ke jaringan Ethereum lokal
- Menyebarkan dapp dan menjalankan pengujian sederhana terhadapnya di jaringan Ethereum lokal
- Mengonfigurasi jaringan Ethereum yang mendasarinya untuk memiliki 3 node

Kami ingin mendengar dari Anda tentang apa yang berjalan baik bagi Anda, apa yang dapat ditingkatkan, atau untuk menjawab pertanyaan Anda. Jangan ragu untuk menghubungi melalui [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)!

### Contoh dan panduan lainnya {#other-examples-guides}

Kami mendorong Anda untuk memeriksa [mulai cepat](https://docs.kurtosis.com/quickstart) kami dan contoh kami yang lain di [repositori awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) kami.

`ethereum-package` juga dapat memulai layanan tambahan di samping jaringan Anda, seperti spammer transaksi (untuk menyimulasikan transaksi), penjelajah blok, dan instans Grafana serta Prometheus yang terhubung. Untuk mengaktifkannya, cantumkan di bawah `additional_services` dalam file parameter Anda, seperti yang dijelaskan dalam [dokumentasi paket](https://github.com/ethpandaops/ethereum-package#configuration).
