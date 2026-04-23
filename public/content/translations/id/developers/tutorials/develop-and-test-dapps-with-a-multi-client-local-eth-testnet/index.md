---
title: Cara mengembangkan dan menguji dapp di testnet lokal multi-klien
description: Panduan ini pertama-tama akan memandu Anda tentang cara menginisiasi dan mengonfigurasi testnet Ethereum lokal multi-klien sebelum menggunakan testnet tersebut untuk menerapkan & menguji dapp.
author: "Tedi Mitiku"
tags:
  [
    "klien",
    "node",
    "kontrak pintar",
    "komposabilitas",
    "lapisan konsensus",
    "lapisan eksekusi",
    "pengujian",
  ]
skill: intermediate
lang: id
published: 2023-04-11
---

## Pengantar {#introduction}

Panduan ini memandu Anda melalui proses menginisiasi testnet Ethereum lokal yang dapat dikonfigurasi, menerapkan kontrak pintar ke dalamnya, dan menggunakan testnet tersebut untuk menjalankan pengujian terhadap dapp Anda. Panduan ini dirancang untuk pengembang dapp yang ingin mengembangkan dan menguji dapp mereka secara lokal terhadap berbagai konfigurasi jaringan sebelum menerapkannya ke testnet langsung atau mainnet.

Dalam panduan ini, Anda akan:

- Menginisiasi testnet Ethereum lokal dengan [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) menggunakan [Kurtosis](https://www.kurtosis.com/),
- Menghubungkan lingkungan pengembangan dapp Hardhat Anda ke testnet lokal untuk mengompilasi, menerapkan, dan menguji dapp, dan
- Mengonfigurasi testnet lokal, termasuk parameter seperti jumlah node dan pasangan klien EL/CL tertentu, untuk memungkinkan alur kerja pengembangan dan pengujian terhadap berbagai konfigurasi jaringan.

### Apa itu Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) adalah sistem pembangunan yang dapat dikomposisikan yang dirancang untuk mengonfigurasi lingkungan pengujian multi-kontainer. Ini secara khusus memungkinkan pengembang untuk membuat lingkungan yang dapat direproduksi yang memerlukan logika penyiapan dinamis, seperti testnet blockchain.

Dalam panduan ini, eth-network-package Kurtosis memutar testnet Ethereum lokal dengan dukungan untuk klien Lapisan Eksekusi (EL) [`geth`](https://geth.ethereum.org/), serta klien Lapisan Konsensus (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), dan [`lodestar`](https://lodestar.chainsafe.io/). Paket ini berfungsi sebagai alternatif yang dapat dikonfigurasi dan dikomposisikan untuk jaringan dalam kerangka kerja seperti Hardhat Network, Ganache, dan Anvil. Kurtosis menawarkan pengembang kontrol dan fleksibilitas yang lebih besar atas testnet yang mereka gunakan, yang merupakan alasan utama mengapa [Ethereum Foundation menggunakan Kurtosis untuk menguji The Merge](https://www.kurtosis.com/blog/testing-the-ethereum-merge) dan terus menggunakannya untuk menguji peningkatan jaringan.

## Menyiapkan Kurtosis {#setting-up-kurtosis}

Sebelum Anda melanjutkan, pastikan Anda telah:

- [Menginstal dan memulai mesin Docker](https://docs.kurtosis.com/install/#i-install--start-docker) di mesin lokal Anda
- [Menginstal Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (atau memutakhirkannya ke rilis terbaru, jika Anda sudah menginstal CLI)
- Menginstal [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), dan [npx](https://www.npmjs.com/package/npx) (untuk lingkungan dapp Anda)

## Menginisiasi testnet Ethereum lokal {#instantiate-testnet}

Untuk memutar testnet Ethereum lokal, jalankan:

```bash
kurtosis run github.com/kurtosis-tech/eth-network-package --enclave local-eth-testnet
```

Catatan: Perintah ini menamai jaringan Anda: "local-eth-testnet” menggunakan bendera `--enclave`.

Kurtosis akan mencetak langkah-langkah yang diambilnya di balik layar saat ia bekerja untuk menafsirkan, memvalidasi, dan kemudian mengeksekusi instruksi. Pada akhirnya, Anda akan melihat keluaran yang menyerupai berikut ini:

```bash
INFO[2023-03-16T11:42:28-04:00] =========================================================
INFO[2023-03-16T11:42:28-04:00] ||          Created enclave: local-eth-testnet         ||
INFO[2023-03-16T11:42:28-04:00] =========================================================
Name:            local-eth-testnet
UUID:            12345678901234567890123456789012
Status:          RUNNING
Creation Time:   Thu, 16 Mar 2023 11:41:18 EDT

========================================= Files Artifacts =========================================
UUID                               Name
12345678901234567890123456789012   1-prelaunch-data-dir
12345678901234567890123456789012   2-geth-genesis-dir
12345678901234567890123456789012   3-genesis-generation-config-dir
12345678901234567890123456789012   4-prysm-password-dir

========================================== User Services ==========================================
UUID                               Name                                Ports                                         Status
12345678901234567890123456789012   cl-1-lighthouse-geth                http: 4000/tcp -> http://127.0.0.1:64251      RUNNING
                                                                       metrics: 5054/tcp -> http://127.0.0.1:64252
                                                                       tcp-discovery: 9000/tcp -> 127.0.0.1:64253
                                                                       udp-discovery: 9000/udp -> 127.0.0.1:64254
12345678901234567890123456789012   el-1-geth-lighthouse                engine-rpc: 8551/tcp -> 127.0.0.1:64247       RUNNING
                                                                       rpc: 8545/tcp -> 127.0.0.1:64248
                                                                       tcp-discovery: 30303/tcp -> 127.0.0.1:64249
                                                                       udp-discovery: 30303/udp -> 127.0.0.1:64250
                                                                       ws: 8546/tcp -> 127.0.0.1:64255
12345678901234567890123456789012   prelaunch-data-generator            <none>                                        RUNNING
12345678901234567890123456789012   validator-key-generation-cl-node    <none>                                        RUNNING
```

Selamat! Anda menggunakan Kurtosis untuk menginisiasi testnet Ethereum lokal, dengan klien CL (`lighthouse`) dan EL (`geth`), melalui Docker.

### Tinjauan {#review-instantiate-testnet}

Di bagian ini, Anda mengeksekusi perintah yang mengarahkan Kurtosis untuk menggunakan [`eth-network-package` yang di-host secara jarak jauh di GitHub](https://github.com/kurtosis-tech/eth-network-package) untuk memutar testnet Ethereum lokal di dalam [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. Di dalam enclave Anda, Anda akan menemukan "artefak file" dan "layanan pengguna".

[Artefak File](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) di enclave Anda mencakup semua data yang dihasilkan dan digunakan untuk mem-bootstrap klien EL dan CL. Data tersebut dibuat menggunakan layanan `prelaunch-data-generator` yang dibangun dari [citra Docker](https://github.com/ethpandaops/ethereum-genesis-generator) ini.

Layanan pengguna menampilkan semua layanan dalam kontainer yang beroperasi di enclave Anda. Anda akan melihat bahwa satu node, yang menampilkan klien EL dan klien CL, telah dibuat.

## Hubungkan lingkungan pengembangan dapp Anda ke testnet Ethereum lokal {#connect-your-dapp}

### Siapkan lingkungan pengembangan dapp {#set-up-dapp-env}

Sekarang setelah Anda memiliki testnet lokal yang berjalan, Anda dapat menghubungkan lingkungan pengembangan dapp Anda untuk menggunakan testnet lokal Anda. Kerangka kerja Hardhat akan digunakan dalam panduan ini untuk menerapkan dapp blackjack ke testnet lokal Anda.

Untuk menyiapkan lingkungan pengembangan dapp Anda, kloning repositori yang berisi contoh dapp kami dan instal dependensinya, jalankan:

```bash
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
yarn install
```

Folder [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) yang digunakan di sini berisi penyiapan umum untuk pengembang dapp yang menggunakan kerangka kerja [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) berisi beberapa kontrak pintar sederhana untuk dapp Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) berisi skrip untuk menerapkan kontrak token ke jaringan Ethereum lokal Anda
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) berisi pengujian .js sederhana untuk kontrak token Anda guna mengonfirmasi bahwa setiap pemain di dapp Blackjack kami memiliki 1000 yang di-mint untuk mereka
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) mengonfigurasi penyiapan Hardhat Anda

### Konfigurasikan Hardhat untuk menggunakan testnet lokal {#configure-hardhat}

Dengan lingkungan pengembangan dapp Anda yang telah disiapkan, Anda sekarang akan menghubungkan Hardhat untuk menggunakan testnet Ethereum lokal yang dihasilkan menggunakan Kurtosis. Untuk mencapai ini, ganti `<$YOUR_PORT>` di struct `localnet` dalam file konfigurasi `hardhat.config.ts` Anda dengan port dari keluaran rpc uri dari layanan `el-client-<num>` mana pun. Dalam contoh kasus ini, portnya adalah `64248`. Port Anda akan berbeda.

Contoh di `hardhat.config.ts`:

```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    localnet: {
      url: "http://127.0.0.1:<$YOUR_PORT>",
    },
  },
};

export default config;
```

Setelah Anda menyimpan file Anda, lingkungan pengembangan dapp Hardhat Anda sekarang terhubung ke testnet Ethereum lokal Anda! Anda dapat memverifikasi bahwa testnet Anda berfungsi dengan menjalankan:

```bash
npx hardhat run scripts/get-balance.ts --network localnet
```

Keluarannya akan terlihat seperti ini:

```bash
Balance of 0x821b55d8abe79bc98f05eb675fdc50dfe796b7ab: 10000000000000000000000
```

Ini mengonfirmasi bahwa Hardhat menggunakan testnet lokal Anda dan mendeteksi akun yang didanai sebelumnya yang dibuat oleh `eth-network-package`.

### Terapkan dan uji dapp Anda secara lokal {#deploy-and-test-dapp}

Dengan lingkungan pengembangan dapp yang sepenuhnya terhubung ke testnet Ethereum lokal, Anda sekarang dapat menjalankan alur kerja pengembangan dan pengujian terhadap dapp Anda menggunakan testnet lokal.

Untuk mengompilasi dan menerapkan kontrak pintar `ChipToken.sol` untuk pembuatan prototipe dan pengembangan lokal, jalankan:

```bash
npx hardhat run scripts/deploy.ts --network localnet
```

Keluarannya akan terlihat seperti:

```bash
Compiled 3 Solidity files successfully
ChipToken deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Sekarang coba jalankan pengujian `simple.js` terhadap dapp lokal Anda untuk mengonfirmasi bahwa setiap pemain di dapp Blackjack kami memiliki 1000 yang di-mint untuk mereka:

Keluarannya akan terlihat seperti ini:

```bash
npx hardhat test --network localnet
```

Keluarannya akan terlihat seperti ini:

```bash
  ChipToken
    ✔ Should mint 1000 tokens for each player (101ms)


  1 passing (103ms)
```

### Tinjauan {#review-dapp-workflows}

Pada titik ini, Anda sekarang telah menyiapkan lingkungan pengembangan dapp, menghubungkannya ke jaringan Ethereum lokal yang dibuat oleh Kurtosis, dan telah mengompilasi, menerapkan, dan menjalankan pengujian sederhana terhadap dapp Anda.

Sekarang mari kita jelajahi bagaimana Anda dapat mengonfigurasi jaringan yang mendasarinya untuk menguji dapp kita di bawah berbagai konfigurasi jaringan.

## Mengonfigurasi testnet Ethereum lokal {#configure-testnet}

### Mengubah konfigurasi klien dan jumlah node {#configure-client-config-and-num-nodes}

Testnet Ethereum lokal Anda dapat dikonfigurasi untuk menggunakan pasangan klien EL dan CL yang berbeda, serta jumlah node yang bervariasi, tergantung pada skenario dan konfigurasi jaringan tertentu yang ingin Anda kembangkan atau uji. Ini berarti bahwa, setelah disiapkan, Anda dapat memutar testnet lokal yang disesuaikan dan menggunakannya untuk menjalankan alur kerja yang sama (penerapan, pengujian, dll.) di bawah berbagai konfigurasi jaringan untuk memastikan semuanya berfungsi seperti yang diharapkan. Untuk mempelajari lebih lanjut tentang parameter lain yang dapat Anda modifikasi, kunjungi tautan ini.

Cobalah! Anda dapat meneruskan berbagai opsi konfigurasi ke `eth-network-package` melalui file JSON. File JSON parameter jaringan ini menyediakan konfigurasi spesifik yang akan digunakan Kurtosis untuk menyiapkan jaringan Ethereum lokal.

Ambil file konfigurasi default dan edit untuk memutar dua node dengan pasangan EL/CL yang berbeda:

- Node 1 dengan `geth`/`lighthouse`
- Node 2 dengan `geth`/`lodestar`
- Node 3 dengan `geth`/`teku`

Konfigurasi ini menciptakan jaringan heterogen dari implementasi node Ethereum untuk menguji dapp Anda. File konfigurasi Anda sekarang akan terlihat seperti:

```json
{
  "participants": [
    {
      "el_client_type": "geth",
      "el_client_image": "",
      "el_client_log_level": "",
      "cl_client_type": "lighthouse",
      "cl_client_image": "",
      "cl_client_log_level": "",
      "beacon_extra_params": [],
      "el_extra_params": [],
      "validator_extra_params": [],
      "builder_network_params": null
    },
    {
      "el_client_type": "geth",
      "el_client_image": "",
      "el_client_log_level": "",
      "cl_client_type": "lodestar",
      "cl_client_image": "",
      "cl_client_log_level": "",
      "beacon_extra_params": [],
      "el_extra_params": [],
      "validator_extra_params": [],
      "builder_network_params": null
    },
    {
      "el_client_type": "geth",
      "el_client_image": "",
      "el_client_log_level": "",
      "cl_client_type": "teku",
      "cl_client_image": "",
      "cl_client_log_level": "",
      "beacon_extra_params": [],
      "el_extra_params": [],
      "validator_extra_params": [],
      "builder_network_params": null
    }
  ],
  "network_params": {
    "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano radar curl auth network grid random filter aries anchor volume shape",
    "num_validator_keys_per_node": 64,
    "network_id": "3151908",
    "deposit_contract_address": "0x4242424242424242424242424242424242424242",
    "seconds_per_slot": 12,
    "slots_per_epoch": 32,
    "genesis_delay": 120,
    "capella_fork_epoch": 2,
    "deneb_fork_epoch": 500
  },
  "wait_for_finalization": false,
  "global_client_log_level": "info"
}
```

Setiap struct `participants` memetakan ke sebuah node di jaringan, jadi 3 struct `participants` akan memberi tahu Kurtosis untuk memutar 3 node di jaringan Anda. Setiap struct `participants` akan memungkinkan Anda untuk menentukan pasangan EL dan CL yang digunakan untuk node tertentu tersebut.

Struct `network_params` mengonfigurasi pengaturan jaringan yang digunakan untuk membuat file genesis untuk setiap node serta pengaturan lain seperti detik per slot dari jaringan.

Simpan file parameter yang telah Anda edit di direktori mana pun yang Anda inginkan (dalam contoh di bawah, ini disimpan ke desktop) dan kemudian gunakan untuk menjalankan paket Kurtosis Anda dengan menjalankan:

```bash
kurtosis clean -a && kurtosis run github.com/kurtosis-tech/eth-network-package --args-file ~/Desktop/network_params.json
```

Catatan: perintah `kurtosis clean -a` digunakan di sini untuk menginstruksikan Kurtosis agar menghancurkan testnet lama dan isinya sebelum memulai yang baru.

Sekali lagi, Kurtosis akan bekerja sebentar dan mencetak langkah-langkah individual yang sedang berlangsung. Pada akhirnya, keluarannya akan terlihat seperti:

```bash
INFO[2023-03-16T12:00:00-04:00] =========================================================
INFO[2023-03-16T12:00:00-04:00] ||          Created enclave: local-eth-testnet         ||
INFO[2023-03-16T12:00:00-04:00] =========================================================
Name:            local-eth-testnet
UUID:            12345678901234567890123456789012
Status:          RUNNING
Creation Time:   Thu, 16 Mar 2023 11:55:00 EDT

========================================= Files Artifacts =========================================
UUID                               Name
12345678901234567890123456789012   1-prelaunch-data-dir
12345678901234567890123456789012   2-geth-genesis-dir
12345678901234567890123456789012   3-genesis-generation-config-dir
12345678901234567890123456789012   4-prysm-password-dir

========================================== User Services ==========================================
UUID                               Name                                Ports                                         Status
12345678901234567890123456789012   cl-1-lighthouse-geth                http: 4000/tcp -> http://127.0.0.1:64251      RUNNING
                                                                       metrics: 5054/tcp -> http://127.0.0.1:64252
                                                                       tcp-discovery: 9000/tcp -> 127.0.0.1:64253
                                                                       udp-discovery: 9000/udp -> 127.0.0.1:64254
12345678901234567890123456789012   cl-2-lodestar-geth                  http: 4000/tcp -> http://127.0.0.1:64256      RUNNING
                                                                       metrics: 5054/tcp -> http://127.0.0.1:64257
                                                                       tcp-discovery: 9000/tcp -> 127.0.0.1:64258
                                                                       udp-discovery: 9000/udp -> 127.0.0.1:64259
12345678901234567890123456789012   cl-3-teku-geth                      http: 4000/tcp -> http://127.0.0.1:64260      RUNNING
                                                                       metrics: 5054/tcp -> http://127.0.0.1:64261
                                                                       tcp-discovery: 9000/tcp -> 127.0.0.1:64262
                                                                       udp-discovery: 9000/udp -> 127.0.0.1:64263
12345678901234567890123456789012   el-1-geth-lighthouse                engine-rpc: 8551/tcp -> 127.0.0.1:64247       RUNNING
                                                                       rpc: 8545/tcp -> 127.0.0.1:64248
                                                                       tcp-discovery: 30303/tcp -> 127.0.0.1:64249
                                                                       udp-discovery: 30303/udp -> 127.0.0.1:64250
                                                                       ws: 8546/tcp -> 127.0.0.1:64255
12345678901234567890123456789012   el-2-geth-lodestar                  engine-rpc: 8551/tcp -> 127.0.0.1:64264       RUNNING
                                                                       rpc: 8545/tcp -> 127.0.0.1:64265
                                                                       tcp-discovery: 30303/tcp -> 127.0.0.1:64266
                                                                       udp-discovery: 30303/udp -> 127.0.0.1:64267
                                                                       ws: 8546/tcp -> 127.0.0.1:64268
12345678901234567890123456789012   el-3-geth-teku                      engine-rpc: 8551/tcp -> 127.0.0.1:64269       RUNNING
                                                                       rpc: 8545/tcp -> 127.0.0.1:64270
                                                                       tcp-discovery: 30303/tcp -> 127.0.0.1:64271
                                                                       udp-discovery: 30303/udp -> 127.0.0.1:64272
                                                                       ws: 8546/tcp -> 127.0.0.1:64273
12345678901234567890123456789012   prelaunch-data-generator            <none>                                        RUNNING
12345678901234567890123456789012   validator-key-generation-cl-node    <none>                                        RUNNING
```

Selamat! Anda telah berhasil mengonfigurasi testnet lokal Anda untuk memiliki 3 node alih-alih 1. Untuk menjalankan alur kerja yang sama seperti yang Anda lakukan sebelumnya terhadap dapp Anda (terapkan & uji), lakukan operasi yang sama seperti yang kita lakukan sebelumnya dengan mengganti `<$YOUR_PORT>` di struct `localnet` dalam file konfigurasi `hardhat.config.ts` Anda dengan port dari keluaran rpc uri dari layanan `el-client-<num>` mana pun di testnet lokal 3-node Anda yang baru.

## Kesimpulan {#conclusion}

Dan itu saja! Untuk merangkum panduan singkat ini, Anda:

- Membuat testnet Ethereum lokal melalui Docker menggunakan Kurtosis
- Menghubungkan lingkungan pengembangan dapp lokal Anda ke jaringan Ethereum lokal
- Menerapkan dapp dan menjalankan pengujian sederhana terhadapnya di jaringan Ethereum lokal
- Mengonfigurasi jaringan Ethereum yang mendasarinya untuk memiliki 3 node

Kami ingin mendengar dari Anda tentang apa yang berjalan baik untuk Anda, apa yang dapat ditingkatkan, atau untuk menjawab pertanyaan Anda. Jangan ragu untuk menghubungi melalui [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) atau [email kami](mailto:feedback@kurtosistech.com)!

### Contoh dan panduan lainnya {#other-examples-guides}

Kami mendorong Anda untuk memeriksa [panduan memulai cepat](https://docs.kurtosis.com/quickstart) kami (di mana Anda akan membangun basis data Postgres dan API di atasnya) dan contoh kami lainnya di [repositori awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) kami di mana Anda akan menemukan beberapa contoh hebat, termasuk paket untuk:

- [Memutar testnet Ethereum lokal yang sama](https://github.com/kurtosis-tech/eth2-package), tetapi dengan layanan tambahan yang terhubung seperti spammer transaksi (untuk menyimulasikan transaksi), monitor fork, dan instans Grafana dan Prometheus yang terhubung
- Melakukan [pengujian sub-jaringan](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) terhadap jaringan Ethereum lokal yang sama