---
title: Cara mengembangkan dan menguji dApp di testnet lokal multi-klien
description: Panduan ini pertama-tama akan memandu Anda melalui cara membuat instance dan mengonfigurasi testnet Ethereum lokal multi-klien sebelum menggunakan testnet untuk men-deploy & menguji dApp.
author: "Tedi Mitiku"
tags:
  [
    "klien",
    "node",
    "kontrak pintar",
    "komposabilitas",
    "lapisan konsensus",
    "lapisan eksekusi",
    "pengujian"
  ]
skill: intermediate
lang: id
published: 2023-04-11
---

## Pengenalan {#introduction}

Panduan ini memandu Anda melalui proses membuat instance testnet Ethereum lokal yang dapat dikonfigurasi, men-deploy smart contract ke dalamnya, dan menggunakan testnet untuk menjalankan pengujian terhadap dApp Anda. Panduan ini dirancang untuk developer dApp yang ingin mengembangkan dan menguji dApps mereka secara lokal terhadap berbagai konfigurasi jaringan sebelum men-deploy ke testnet langsung atau mainnet.

Dalam panduan ini, Anda akan:

- Membuat instance testnet Ethereum lokal dengan [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) menggunakan [Kurtosis](https://www.kurtosis.com/),
- Menghubungkan lingkungan pengembangan dApp Hardhat Anda ke testnet lokal untuk mengompilasi, men-deploy, dan menguji dApp, dan
- Mengonfigurasi testnet lokal, termasuk parameter seperti jumlah node dan pasangan klien EL/CL tertentu, untuk memungkinkan alur kerja pengembangan dan pengujian terhadap berbagai konfigurasi jaringan.

### Apa itu Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) adalah sistem build yang dapat disusun yang dirancang untuk mengonfigurasi lingkungan pengujian multi-kontainer. Ini secara khusus memungkinkan para developer untuk membuat lingkungan yang dapat direproduksi yang memerlukan logika penyiapan dinamis, seperti testnet blockchain.

Dalam panduan ini, eth-network-package Kurtosis menjalankan testnet Ethereum lokal dengan dukungan untuk klien lapisan eksekusi (EL) [`geth`](https://geth.ethereum.org/), serta klien lapisan konsensus (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), dan [`lodestar`](https://lodestar.chainsafe.io/). Paket ini berfungsi sebagai alternatif yang dapat dikonfigurasi dan disusun untuk jaringan dalam kerangka kerja seperti Hardhat Network, Ganache, dan Anvil. Kurtosis menawarkan kontrol dan fleksibilitas yang lebih besar kepada para developer atas testnet yang mereka gunakan, yang merupakan alasan utama mengapa [Ethereum Foundation menggunakan Kurtosis untuk menguji The Merge](https://www.kurtosis.com/blog/testing-the-ethereum-merge) dan terus menggunakannya untuk menguji pemutakhiran jaringan.

## Menyiapkan Kurtosis {#setting-up-kurtosis}

Sebelum Anda melanjutkan, pastikan Anda memiliki:

- [Mesin Docker telah diinstal dan dimulai](https://docs.kurtosis.com/install/#i-install--start-docker) di mesin lokal Anda
- [Kurtosis CLI telah diinstal](https://docs.kurtosis.com/install#ii-install-the-cli) (atau ditingkatkan ke rilis terbaru, jika Anda sudah menginstal CLI)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), dan [npx](https://www.npmjs.com/package/npx) telah diinstal (untuk lingkungan dApp Anda)

## Membuat instance testnet Ethereum lokal {#instantiate-testnet}

Untuk menjalankan testnet Ethereum lokal, jalankan:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Catatan: Perintah ini menamai jaringan Anda: "local-eth-testnet" menggunakan flag `--enclave`.

Kurtosis akan mencetak langkah-langkah yang diambilnya di balik layar saat bekerja untuk menafsirkan, memvalidasi, dan kemudian menjalankan instruksi. Pada akhirnya, Anda akan melihat output yang menyerupai berikut ini:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

Selamat! Anda menggunakan Kurtosis untuk membuat instance testnet Ethereum lokal, dengan klien CL (`lighthouse`) dan EL (`geth`), melalui Docker.

### Tinjauan {#review-instantiate-testnet}

Di bagian ini, Anda menjalankan perintah yang mengarahkan Kurtosis untuk menggunakan [`eth-network-package` yang dihosting dari jarak jauh di GitHub](https://github.com/kurtosis-tech/eth-network-package) untuk menjalankan testnet Ethereum lokal dalam sebuah [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. Di dalam enclave Anda, Anda akan menemukan "artefak file" dan "layanan pengguna".

[Artefak File](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) di enclave Anda mencakup semua data yang dihasilkan dan digunakan untuk mem-bootstrap klien EL dan CL. Data tersebut dibuat menggunakan layanan `prelaunch-data-generator` yang dibangun dari [image Docker](https://github.com/ethpandaops/ethereum-genesis-generator) ini

Layanan pengguna menampilkan semua layanan dalam kontainer yang beroperasi di enclave Anda. Anda akan melihat bahwa satu node, yang menampilkan klien EL dan klien CL, telah dibuat.

## Hubungkan lingkungan pengembangan dApp Anda ke testnet Ethereum lokal {#connect-your-dapp}

### Siapkan lingkungan pengembangan dApp {#set-up-dapp-env}

Sekarang setelah Anda memiliki testnet lokal yang berjalan, Anda dapat menghubungkan lingkungan pengembangan dApp Anda untuk menggunakan testnet lokal Anda. Kerangka kerja Hardhat akan digunakan dalam panduan ini untuk men-deploy dApp blackjack ke testnet lokal Anda.

Untuk menyiapkan lingkungan pengembangan dApp Anda, kloning repositori yang berisi sampel dApp kami dan instal dependensinya, jalankan:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Folder [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) yang digunakan di sini berisi pengaturan umum untuk developer dApp yang menggunakan kerangka kerja [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) berisi beberapa smart contract sederhana untuk dApp Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) berisi skrip untuk men-deploy kontrak token ke jaringan Ethereum lokal Anda
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) berisi pengujian .js sederhana untuk kontrak token Anda untuk mengonfirmasi setiap pemain di dApp Blackjack kami memiliki 1000 yang di-mint untuk mereka
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) mengonfigurasi pengaturan Hardhat Anda

### Konfigurasikan Hardhat untuk menggunakan testnet lokal {#configure-hardhat}

Dengan lingkungan pengembangan dApp Anda yang telah disiapkan, sekarang Anda akan menghubungkan Hardhat untuk menggunakan testnet Ethereum lokal yang dihasilkan menggunakan Kurtosis. Untuk mencapai ini, ganti `<$YOUR_PORT>` di struct `localnet` dalam file konfigurasi `hardhat.config.ts` Anda dengan port dari output uri rpc dari layanan `el-client-<num>` mana pun. Dalam kasus sampel ini, portnya adalah `64248`. Port Anda akan berbeda.

Contoh di `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: GANTI $YOUR_PORT DENGAN PORT URI NODE YANG DIHASILKAN OLEH PAKET JARINGAN ETH KURTOSIS

// Ini adalah kunci privat yang terkait dengan akun pengujian prapendanaan yang dibuat oleh eth-network-package
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

Setelah Anda menyimpan file, lingkungan pengembangan dApp Hardhat Anda sekarang terhubung ke testnet Ethereum lokal Anda! Anda dapat memverifikasi bahwa testnet Anda berfungsi dengan menjalankan:

```python
npx hardhat balances --network localnet
```

Output-nya akan terlihat seperti ini:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Ini mengonfirmasi bahwa Hardhat menggunakan testnet lokal Anda dan mendeteksi akun prapendanaan yang dibuat oleh `eth-network-package`.

### Deploy dan uji dApp Anda secara lokal {#deploy-and-test-dapp}

Dengan lingkungan pengembangan dApp yang sepenuhnya terhubung ke testnet Ethereum lokal, Anda sekarang dapat menjalankan alur kerja pengembangan dan pengujian terhadap dApp Anda menggunakan testnet lokal.

Untuk mengompilasi dan men-deploy smart contract `ChipToken.sol` untuk pembuatan prototipe dan pengembangan lokal, jalankan:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Output-nya akan terlihat seperti:

```python
ChipToken di-deploy ke: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Sekarang coba jalankan pengujian `simple.js` terhadap dApp lokal Anda untuk mengonfirmasi setiap pemain di dApp Blackjack kami memiliki 1000 yang di-mint untuk mereka:

Output-nya akan terlihat seperti ini:

```python
npx hardhat test --network localnet
```

Output-nya akan terlihat seperti ini:

```python
ChipToken
    mint
      ✔ harus me-mint 1000 chip untuk PLAYER ONE

  1 lolos (654md)
```

### Tinjauan {#review-dapp-workflows}

Pada titik ini, Anda sekarang telah menyiapkan lingkungan pengembangan dApp, menghubungkannya ke jaringan Ethereum lokal yang dibuat oleh Kurtosis, dan telah mengompilasi, men-deploy, dan menjalankan pengujian sederhana terhadap dApp Anda.

Sekarang mari kita jelajahi bagaimana Anda dapat mengonfigurasi jaringan yang mendasarinya untuk menguji dApps kita dalam berbagai konfigurasi jaringan.

## Mengonfigurasi testnet Ethereum lokal {#configure-testnet}

### Mengubah konfigurasi klien dan jumlah node {#configure-client-config-and-num-nodes}

Testnet Ethereum lokal Anda dapat dikonfigurasi untuk menggunakan pasangan klien EL dan CL yang berbeda, serta jumlah node yang bervariasi, tergantung pada skenario dan konfigurasi jaringan spesifik yang ingin Anda kembangkan atau uji. Ini berarti bahwa, setelah disiapkan, Anda dapat menjalankan testnet lokal yang disesuaikan dan menggunakannya untuk menjalankan alur kerja yang sama (deployment, pengujian, dll.) di bawah berbagai konfigurasi jaringan untuk memastikan semuanya berfungsi seperti yang diharapkan. Untuk mempelajari lebih lanjut tentang parameter lain yang dapat Anda modifikasi, kunjungi tautan ini.

Ayo dicoba! Anda dapat meneruskan berbagai opsi konfigurasi ke `eth-network-package` melalui file JSON. File JSON param jaringan ini menyediakan konfigurasi spesifik yang akan digunakan Kurtosis untuk menyiapkan jaringan Ethereum lokal.

Ambil file konfigurasi default dan edit untuk menjalankan tiga node dengan pasangan EL/CL yang berbeda:

- Node 1 dengan `geth`/`lighthouse`
- Node 2 dengan `geth`/`lodestar`
- Node 3 dengan `geth`/`teku`

Konfigurasi ini membuat jaringan heterogen implementasi node Ethereum untuk menguji dApp Anda. File konfigurasi Anda sekarang akan terlihat seperti:

```yaml
{
  "participants":
    [
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
        "builder_network_params": null,
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
        "builder_network_params": null,
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
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

Setiap struct `participants` memetakan ke sebuah node di jaringan, jadi 3 struct `participants` akan memberi tahu Kurtosis untuk menjalankan 3 node di jaringan Anda. Setiap struct `participants` akan memungkinkan Anda untuk menentukan pasangan EL dan CL yang digunakan untuk node spesifik tersebut.

Struct `network_params` mengonfigurasi pengaturan jaringan yang digunakan untuk membuat file genesis untuk setiap node serta pengaturan lain seperti detik per slot jaringan.

Simpan file params yang telah diedit di direktori mana pun yang Anda inginkan (dalam contoh di bawah, file disimpan di desktop) dan kemudian gunakan untuk menjalankan paket Kurtosis Anda dengan menjalankan:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Catatan: perintah `kurtosis clean -a` digunakan di sini untuk menginstruksikan Kurtosis untuk menghancurkan testnet lama dan isinya sebelum memulai yang baru.

Sekali lagi, Kurtosis akan bekerja sebentar dan mencetak langkah-langkah individual yang sedang berlangsung. Pada akhirnya, output-nya akan terlihat seperti:

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

Selamat! Anda telah berhasil mengonfigurasi testnet lokal Anda untuk memiliki 3 node, bukan 1. Untuk menjalankan alur kerja yang sama yang Anda lakukan sebelumnya terhadap dApp Anda (deploy & uji), lakukan operasi yang sama yang kita lakukan sebelumnya dengan mengganti `<$YOUR_PORT>` di struct `localnet` dalam file konfigurasi `hardhat.config.ts` Anda dengan port dari output uri rpc dari layanan `el-client-<num>` mana pun di testnet lokal 3-node Anda yang baru.

## Kesimpulan {#conclusion}

Dan itu saja! Untuk merekap panduan singkat ini, Anda:

- Membuat testnet Ethereum lokal melalui Docker menggunakan Kurtosis
- Menghubungkan lingkungan pengembangan dApp lokal Anda ke jaringan Ethereum lokal
- Men-deploy dApp dan menjalankan pengujian sederhana terhadapnya di jaringan Ethereum lokal
- Mengonfigurasi jaringan Ethereum yang mendasarinya untuk memiliki 3 node

Kami ingin mendengar dari Anda tentang apa yang berjalan baik untuk Anda, apa yang dapat ditingkatkan, atau untuk menjawab pertanyaan Anda. Jangan ragu untuk menghubungi kami melalui [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) atau [kirim email kepada kami](mailto:feedback@kurtosistech.com)!

### Contoh dan panduan lain {#other-examples-guides}

Kami mendorong Anda untuk memeriksa [mulai cepat](https://docs.kurtosis.com/quickstart) kami (di mana Anda akan membangun basis data Postgres dan API di atasnya) dan contoh kami yang lain di [repositori awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) kami di mana Anda akan menemukan beberapa contoh hebat, termasuk paket untuk:

- [Menjalankan testnet Ethereum lokal yang sama](https://github.com/kurtosis-tech/eth2-package), tetapi dengan layanan tambahan yang terhubung seperti spammer transaksi (untuk menyimulasikan transaksi), monitor fork, dan instance Grafana dan Prometheus yang terhubung
- Melakukan [pengujian sub-jaringan](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) terhadap jaringan Ethereum lokal yang sama
