---
title: Jalankan node Ethereum Anda sendiri
description: Pengenalan umum untuk menjalankan instans klien Ethereum Anda sendiri.
lang: id
sidebarDepth: 2
---

Menjalankan node Anda sendiri memberikan berbagai manfaat, membuka kemungkinan baru, dan membantu mendukung ekosistem. Halaman ini akan memandu Anda untuk menjalankan node Anda sendiri dan mengambil bagian dalam memvalidasi transaksi [Ethereum](/).

Perhatikan bahwa setelah [The Merge](/roadmap/merge), dua klien diperlukan untuk menjalankan node Ethereum; klien **lapisan eksekusi (EL)** dan klien **lapisan konsensus (CL)**. Halaman ini akan menunjukkan cara menginstal, mengonfigurasi, dan menghubungkan kedua klien ini untuk menjalankan node Ethereum.

## Prasyarat {#prerequisites}

Anda harus memahami apa itu node Ethereum dan mengapa Anda mungkin ingin menjalankan klien. Hal ini dibahas dalam [Node dan klien](/developers/docs/nodes-and-clients/).

Jika Anda baru mengenal topik menjalankan node, atau mencari jalur yang tidak terlalu teknis, kami sarankan untuk terlebih dahulu memeriksa pengantar ramah pengguna kami tentang [menjalankan node Ethereum](/run-a-node).

## Memilih pendekatan {#choosing-approach}

Langkah pertama dalam menjalankan node Anda adalah memilih pendekatan Anda. Berdasarkan persyaratan dan berbagai kemungkinan, Anda harus memilih implementasi klien (baik klien eksekusi maupun klien konsensus), lingkungan (perangkat keras, sistem), dan parameter untuk pengaturan klien.

Halaman ini akan memandu Anda melalui keputusan-keputusan ini dan membantu Anda menemukan cara yang paling sesuai untuk menjalankan instans Ethereum Anda.

Untuk memilih dari implementasi klien, lihat semua [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) dan [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients) yang siap untuk mainnet yang tersedia, dan pelajari tentang [keragaman klien](/developers/docs/nodes-and-clients/client-diversity).

Putuskan apakah akan menjalankan perangkat lunak pada [perangkat keras Anda sendiri atau di cloud](#local-vs-cloud), dengan mempertimbangkan [persyaratan](#requirements) klien.

Setelah menyiapkan lingkungan, instal klien yang dipilih baik dengan [antarmuka yang ramah pemula](#automatized-setup) atau [secara manual](#manual-setup) menggunakan terminal dengan opsi lanjutan.

Saat node berjalan dan menyinkronkan, Anda siap untuk [menggunakannya](#using-the-node), tetapi pastikan untuk terus mengawasi [pemeliharaannya](#operating-the-node).

![Pengaturan klien](./diagram.png)

### Lingkungan dan perangkat keras {#environment-and-hardware}

#### Lokal atau cloud {#local-vs-cloud}

Klien Ethereum dapat berjalan di komputer tingkat konsumen dan tidak memerlukan perangkat keras khusus, seperti mesin penambangan misalnya. Oleh karena itu, Anda memiliki berbagai opsi untuk menerapkan node berdasarkan kebutuhan Anda.
Untuk menyederhanakan, mari kita pikirkan tentang menjalankan node pada mesin fisik lokal dan server cloud:

- Cloud
  - Penyedia menawarkan waktu aktif server yang tinggi dan alamat IP publik statis
  - Mendapatkan server khusus atau virtual bisa lebih nyaman daripada membangun sendiri
  - Komprominya adalah memercayai pihak ketiga - penyedia server
  - Karena ukuran penyimpanan yang diperlukan untuk node penuh, harga server sewaan mungkin menjadi tinggi
- Perangkat keras sendiri
  - Pendekatan yang lebih tanpa kepercayaan dan berdaulat
  - Investasi satu kali
  - Opsi untuk membeli mesin yang telah dikonfigurasi sebelumnya
  - Anda harus secara fisik menyiapkan, memelihara, dan berpotensi memecahkan masalah mesin dan jaringan

Kedua opsi memiliki keuntungan berbeda yang dirangkum di atas. Jika Anda mencari solusi cloud, selain banyak penyedia komputasi cloud tradisional, ada juga layanan yang berfokus pada penerapan node. Lihat [node sebagai layanan](/developers/docs/nodes-and-clients/nodes-as-a-service/) untuk opsi lebih lanjut tentang node yang dihosting.

#### Perangkat keras {#hardware}

Namun, jaringan desentralisasi yang tahan sensor tidak boleh bergantung pada penyedia cloud. Sebaliknya, menjalankan node Anda pada perangkat keras lokal Anda sendiri lebih sehat untuk ekosistem. [Estimasi](https://www.ethernodes.org/networkType/cl/Hosting) menunjukkan sebagian besar node berjalan di cloud, yang bisa menjadi titik kegagalan tunggal.

Klien Ethereum dapat berjalan di komputer, laptop, server, atau bahkan komputer papan tunggal. Meskipun menjalankan klien di komputer pribadi Anda dimungkinkan, memiliki mesin khusus hanya untuk node Anda dapat secara signifikan meningkatkan kinerja dan keamanannya sambil meminimalkan dampak pada komputer utama Anda.

Menggunakan perangkat keras Anda sendiri bisa sangat mudah. Ada banyak opsi sederhana serta pengaturan lanjutan untuk orang yang lebih teknis. Jadi mari kita lihat persyaratan dan cara untuk menjalankan klien Ethereum di mesin Anda.

#### Persyaratan {#requirements}

Persyaratan perangkat keras berbeda menurut klien tetapi umumnya tidak terlalu tinggi karena node hanya perlu tetap tersinkronisasi. Jangan bingung dengan penambangan, yang membutuhkan lebih banyak daya komputasi. Namun, waktu sinkronisasi dan kinerja memang meningkat dengan perangkat keras yang lebih kuat.

Sebelum menginstal klien apa pun, pastikan komputer Anda memiliki sumber daya yang cukup untuk menjalankannya. Anda dapat menemukan persyaratan minimum dan yang disarankan di bawah ini.

Hambatan untuk perangkat keras Anda sebagian besar adalah ruang disk. Menyinkronkan blockchain Ethereum sangat intensif input/output dan membutuhkan banyak ruang. Sebaiknya miliki **solid-state drive (SSD)** dengan ratusan GB ruang kosong yang tersisa bahkan setelah sinkronisasi.

Ukuran basis data dan kecepatan sinkronisasi awal bergantung pada klien yang dipilih, konfigurasinya, dan [strategi sinkronisasi](/developers/docs/nodes-and-clients/#sync-modes).

Pastikan juga koneksi internet Anda tidak dibatasi oleh [batas bandwidth](https://wikipedia.org/wiki/Data_cap). Disarankan untuk menggunakan koneksi tanpa batas karena sinkronisasi awal dan data yang disiarkan ke jaringan dapat melebihi batas Anda.

##### Sistem operasi

Semua klien mendukung sistem operasi utama - Linux, MacOS, Windows. Ini berarti Anda dapat menjalankan node pada mesin desktop atau server biasa dengan sistem operasi (OS) yang paling sesuai untuk Anda. Pastikan OS Anda mutakhir untuk menghindari potensi masalah dan kerentanan keamanan.

##### Persyaratan minimum

- CPU dengan 2+ inti
- RAM 8 GB
- SSD 2TB
- Bandwidth 10+ MBit/s

##### Spesifikasi yang disarankan

- CPU cepat dengan 4+ inti
- RAM 16 GB+
- SSD cepat dengan 2+TB
- Bandwidth 25+ MBit/s

Mode sinkronisasi dan klien yang Anda pilih akan memengaruhi persyaratan ruang, tetapi kami telah memperkirakan ruang disk yang Anda perlukan untuk setiap klien di bawah ini.

| Klien      | Ukuran disk (snap sync) | Ukuran disk (arsip penuh) |
| ---------- | ----------------------- | ------------------------- |
| Besu       | 800GB+                  | 12TB+                     |
| Erigon     | N/A                     | 2.5TB+                    |
| Geth       | 500GB+                  | 12TB+                     |
| Nethermind | 500GB+                  | 12TB+                     |
| Reth       | N/A                     | 2.2TB+                    |

- Catatan: Erigon dan Reth tidak menawarkan snap sync, tetapi Pemangkasan Penuh (Full Pruning) dimungkinkan (\~2TB untuk Erigon, ~1.2TB untuk Reth)

Untuk klien konsensus, persyaratan ruang juga bergantung pada implementasi klien dan fitur yang diaktifkan (misalnya, pemotong validator) tetapi umumnya perhitungkan tambahan 200GB yang diperlukan untuk data beacon. Dengan sejumlah besar validator, beban bandwidth juga bertambah. Anda dapat menemukan [detail tentang persyaratan klien konsensus dalam analisis ini](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Solusi plug-and-play {#plug-and-play}

Opsi termudah untuk menjalankan node dengan perangkat keras Anda sendiri adalah menggunakan kotak plug-and-play. Mesin yang telah dikonfigurasi sebelumnya dari vendor menawarkan pengalaman yang paling mudah: pesan, sambungkan, jalankan. Semuanya telah dikonfigurasi sebelumnya dan berjalan secara otomatis dengan panduan intuitif dan dasbor untuk memantau dan mengontrol perangkat lunak.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum di komputer papan tunggal {#ethereum-on-a-single-board-computer}

Cara mudah dan murah untuk menjalankan node Ethereum adalah dengan menggunakan komputer papan tunggal, bahkan dengan arsitektur ARM seperti Raspberry Pi. [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) menyediakan citra yang mudah dijalankan dari beberapa klien eksekusi dan konsensus untuk Raspberry Pi dan papan ARM lainnya.

Perangkat kecil, terjangkau, dan efisien seperti ini ideal untuk menjalankan node di rumah tetapi perlu diingat kinerjanya yang terbatas.

## Menjalankan node {#spinning-up-node}

Pengaturan klien yang sebenarnya dapat dilakukan baik dengan peluncur otomatis atau secara manual, mengatur perangkat lunak klien secara langsung.

Untuk pengguna yang kurang mahir, pendekatan yang disarankan adalah menggunakan peluncur, perangkat lunak yang memandu Anda melalui instalasi dan mengotomatiskan proses pengaturan klien. Namun, jika Anda memiliki pengalaman menggunakan terminal, langkah-langkah untuk pengaturan manual seharusnya mudah diikuti.

### Pengaturan terpandu {#automatized-setup}

Beberapa proyek yang ramah pengguna bertujuan untuk meningkatkan pengalaman mengatur klien. Peluncur ini menyediakan instalasi dan konfigurasi klien otomatis, dengan beberapa bahkan menawarkan antarmuka grafis untuk pengaturan terpandu dan pemantauan klien.

Di bawah ini adalah beberapa proyek yang dapat membantu Anda menginstal dan mengontrol klien hanya dengan beberapa klik:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DappNode tidak hanya datang dengan mesin dari vendor. Perangkat lunak, peluncur node yang sebenarnya, dan pusat kendali dengan banyak fitur dapat digunakan pada perangkat keras sembarang.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - Cara tercepat dan termudah untuk mengatur node penuh. Alat pengaturan satu baris dan TUI manajemen node. Gratis. Sumber terbuka. Barang publik untuk Ethereum oleh staker solo. Dukungan ARM64 dan AMD64.
- [eth-docker](https://eth-docker.net/) - Pengaturan otomatis menggunakan Docker yang berfokus pada mengunci yang mudah dan aman, memerlukan pengetahuan dasar terminal dan Docker, disarankan untuk pengguna yang sedikit lebih mahir.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - Peluncur untuk menginstal klien di server jarak jauh melalui koneksi SSH dengan panduan pengaturan GUI, pusat kendali, dan banyak fitur lainnya.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - Alat pengaturan node yang secara otomatis menghasilkan konfigurasi Docker menggunakan panduan CLI. Ditulis dalam Go oleh Nethermind.

### Pengaturan klien manual {#manual-setup}

Opsi lainnya adalah mengunduh, memverifikasi, dan mengonfigurasi perangkat lunak klien secara manual. Bahkan jika beberapa klien menawarkan antarmuka grafis, pengaturan manual masih memerlukan keterampilan dasar dengan terminal tetapi menawarkan lebih banyak fleksibilitas.

Seperti yang dijelaskan sebelumnya, mengatur node Ethereum Anda sendiri akan memerlukan menjalankan sepasang klien konsensus dan klien eksekusi. Beberapa klien mungkin menyertakan klien ringan dari jenis lain dan menyinkronkan tanpa perangkat lunak lain yang diperlukan. Namun, verifikasi tanpa kepercayaan penuh memerlukan kedua implementasi tersebut.

#### Mendapatkan perangkat lunak klien {#getting-the-client}

Pertama, Anda perlu mendapatkan perangkat lunak [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) dan [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients) pilihan Anda.

Anda cukup mengunduh aplikasi yang dapat dieksekusi atau paket instalasi yang sesuai dengan sistem operasi dan arsitektur Anda. Selalu verifikasi tanda tangan dan checksum dari paket yang diunduh. Beberapa klien juga menawarkan repositori atau citra Docker untuk instalasi dan pembaruan yang lebih mudah. Semua klien adalah sumber terbuka, jadi Anda juga dapat membangunnya dari sumber. Ini adalah metode yang lebih maju, tetapi dalam beberapa kasus, ini mungkin diperlukan.

Instruksi untuk menginstal setiap klien disediakan dalam dokumentasi yang ditautkan dalam daftar klien di atas.

Berikut adalah halaman rilis klien tempat Anda dapat menemukan biner pra-bangun mereka atau instruksi tentang instalasi:

##### Klien eksekusi

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Perlu juga dicatat bahwa keragaman klien adalah [masalah pada lapisan eksekusi](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Disarankan agar pembaca mempertimbangkan untuk menjalankan klien eksekusi minoritas.

##### Klien konsensus

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source/) (Tidak menyediakan biner pra-bangun, hanya citra Docker atau untuk dibangun dari sumber)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Keragaman klien](/developers/docs/nodes-and-clients/client-diversity/) sangat penting untuk node konsensus yang menjalankan validator. Jika mayoritas validator menjalankan implementasi klien tunggal, keamanan jaringan berisiko. Oleh karena itu disarankan untuk mempertimbangkan memilih klien minoritas.

[Lihat penggunaan klien jaringan terbaru](https://clientdiversity.org/) dan pelajari lebih lanjut tentang [keragaman klien](/developers/docs/nodes-and-clients/client-diversity).

##### Memverifikasi perangkat lunak

Saat mengunduh perangkat lunak dari internet, disarankan untuk memverifikasi integritasnya. Langkah ini opsional tetapi terutama dengan bagian infrastruktur penting seperti klien Ethereum, penting untuk menyadari potensi vektor serangan dan menghindarinya. Jika Anda mengunduh biner pra-bangun, Anda harus memercayainya dan mengambil risiko bahwa penyerang dapat menukar file yang dapat dieksekusi dengan yang berbahaya.

Pengembang menandatangani biner yang dirilis dengan kunci PGP mereka sehingga Anda dapat memverifikasi secara kriptografi bahwa Anda menjalankan perangkat lunak yang persis mereka buat. Anda hanya perlu mendapatkan kunci publik yang digunakan oleh pengembang, yang dapat ditemukan di halaman rilis klien atau dalam dokumentasi. Setelah mengunduh rilis klien dan tanda tangannya, Anda dapat menggunakan implementasi PGP, mis., [GnuPG](https://gnupg.org/download/index.html) untuk memverifikasinya dengan mudah. Lihat tutorial tentang memverifikasi perangkat lunak sumber terbuka menggunakan `gpg` di [linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) atau [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/).

Bentuk verifikasi lain adalah memastikan bahwa hash, sidik jari kriptografi unik, dari perangkat lunak yang Anda unduh cocok dengan yang disediakan oleh pengembang. Ini bahkan lebih mudah daripada menggunakan PGP, dan beberapa klien hanya menawarkan opsi ini. Cukup jalankan fungsi hash pada perangkat lunak yang diunduh dan bandingkan dengan yang ada di halaman rilis. Misalnya:

```bash
sha256sum geth-linux-amd64-1.10.4-aa637fd3.tar.gz
```

#### Pengaturan klien {#client-setup}

Setelah menginstal, mengunduh, atau mengkompilasi perangkat lunak klien, Anda siap untuk menjalankannya. Ini hanya berarti ia harus dieksekusi dengan konfigurasi yang tepat. Klien menawarkan opsi konfigurasi yang kaya, yang dapat mengaktifkan berbagai fitur.

Mari kita mulai dengan opsi yang dapat secara signifikan memengaruhi kinerja klien dan penggunaan data. [Mode sinkronisasi](/developers/docs/nodes-and-clients/#sync-modes) mewakili metode berbeda untuk mengunduh dan memvalidasi data blockchain. Sebelum memulai node, Anda harus memutuskan jaringan dan mode sinkronisasi apa yang akan digunakan. Hal terpenting untuk dipertimbangkan adalah ruang disk, dan waktu sinkronisasi yang dibutuhkan klien. Perhatikan dokumen klien untuk menentukan mode sinkronisasi mana yang merupakan default. Jika itu tidak sesuai dengan Anda, pilih yang lain berdasarkan tingkat keamanan, data yang tersedia, dan biaya. Terlepas dari algoritma sinkronisasi, Anda juga dapat mengatur pemangkasan berbagai jenis data lama. Pemangkasan memungkinkan penghapusan data yang sudah usang, yaitu, menghapus node trie status yang tidak dapat dijangkau dari blok terbaru.

Opsi konfigurasi dasar lainnya adalah, mis., memilih jaringan - mainnet atau testnet, mengaktifkan titik akhir HTTP untuk RPC atau WebSockets, dll. Anda dapat menemukan semua fitur dan opsi dalam dokumentasi klien. Berbagai konfigurasi klien dapat diatur dengan mengeksekusi klien dengan bendera yang sesuai secara langsung di CLI atau file konfigurasi. Setiap klien sedikit berbeda; harap selalu merujuk ke dokumentasi resminya atau halaman bantuan untuk detail tentang opsi konfigurasi.

Untuk tujuan pengujian, Anda mungkin lebih suka menjalankan klien di salah satu jaringan testnet. [Lihat ikhtisar jaringan yang didukung](/developers/docs/nodes-and-clients/#execution-clients).

Contoh menjalankan klien eksekusi dengan konfigurasi dasar dapat ditemukan di bagian selanjutnya.

#### Memulai klien eksekusi {#starting-the-execution-client}

Sebelum memulai perangkat lunak klien Ethereum, lakukan pemeriksaan terakhir bahwa lingkungan Anda sudah siap. Misalnya, pastikan:

- Terdapat ruang disk yang cukup dengan mempertimbangkan jaringan dan mode sinkronisasi yang dipilih.
- Memori dan CPU tidak dihentikan oleh program lain.
- Sistem operasi diperbarui ke versi terbaru.
- Sistem memiliki waktu dan tanggal yang benar.
- Router dan firewall Anda menerima koneksi pada port pendengar. Secara default klien Ethereum menggunakan port pendengar (TCP) dan port penemuan (UDP), keduanya pada 30303 secara default.

Jalankan klien Anda di testnet terlebih dahulu untuk membantu memastikan semuanya berfungsi dengan benar.

Anda perlu mendeklarasikan pengaturan klien apa pun yang bukan default di awal. Anda dapat menggunakan bendera atau file konfigurasi untuk mendeklarasikan konfigurasi pilihan Anda. Kumpulan fitur dan sintaks konfigurasi setiap klien berbeda. Lihat dokumentasi klien Anda untuk spesifikasinya.

Klien eksekusi dan konsensus berkomunikasi melalui titik akhir terautentikasi yang ditentukan dalam [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). Untuk terhubung ke klien konsensus, klien eksekusi harus menghasilkan [`jwtsecret`](https://jwt.io/) pada jalur yang diketahui. Untuk alasan keamanan dan stabilitas, klien harus berjalan pada mesin yang sama, dan kedua klien harus mengetahui jalur ini karena digunakan untuk mengautentikasi koneksi RPC lokal di antara mereka. Klien eksekusi juga harus menentukan port pendengar untuk API yang diautentikasi.

Token ini dihasilkan secara otomatis oleh perangkat lunak klien, tetapi dalam beberapa kasus, Anda mungkin perlu melakukannya sendiri. Anda dapat menghasilkannya menggunakan [OpenSSL](https://www.openssl.org/):

```bash
openssl rand -hex 32 > jwtsecret
```

#### Menjalankan klien eksekusi {#running-an-execution-client}

Bagian ini akan memandu Anda melalui memulai klien eksekusi. Ini hanya berfungsi sebagai contoh konfigurasi dasar, yang akan memulai klien dengan pengaturan ini:

- Menentukan jaringan untuk dihubungkan, mainnet dalam contoh kami
  - Anda dapat memilih [salah satu testnet](/developers/docs/networks/) untuk pengujian awal pengaturan Anda
- Menentukan direktori data, tempat semua data termasuk blockchain akan disimpan
  - Pastikan untuk mengganti jalur dengan yang asli, mis., menunjuk ke drive eksternal Anda
- Mengaktifkan antarmuka untuk berkomunikasi dengan klien
  - Termasuk JSON-RPC dan Engine API untuk komunikasi dengan klien konsensus
- Menentukan jalur ke `jwtsecret` untuk API yang diautentikasi
  - Pastikan untuk mengganti jalur contoh dengan yang asli yang dapat diakses oleh klien, mis., `/tmp/jwtsecret`

Harap diingat bahwa ini hanyalah contoh dasar, semua pengaturan lainnya akan diatur ke default. Perhatikan dokumentasi setiap klien untuk mempelajari tentang nilai default, pengaturan, dan fitur. Untuk fitur lebih lanjut, misalnya untuk menjalankan validator, pemantauan, dll., silakan merujuk ke dokumentasi klien tertentu.

> Perhatikan bahwa garis miring terbalik `` dalam contoh hanya untuk tujuan pemformatan; bendera konfigurasi dapat didefinisikan dalam satu baris.

##### Menjalankan Besu

Contoh ini memulai Besu di mainnet, menyimpan data blockchain dalam format default di `/data/ethereum`, mengaktifkan JSON-RPC dan Engine RPC untuk menghubungkan klien konsensus. Engine API diautentikasi dengan token `jwtsecret` dan hanya panggilan dari `localhost` yang diizinkan.

```bash
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/tmp/jwtsecret
```

Besu juga dilengkapi dengan opsi peluncur yang akan menanyakan serangkaian pertanyaan dan menghasilkan file konfigurasi. Jalankan peluncur interaktif menggunakan:

```bash
besu --Xlauncher
```

[Dokumentasi Besu](https://besu.hyperledger.org/public-networks/get-started/start-node/) berisi opsi tambahan dan detail konfigurasi.

##### Menjalankan Erigon

Contoh ini memulai Erigon di mainnet, menyimpan data blockchain di `/data/ethereum`, mengaktifkan JSON-RPC, menentukan namespace mana yang diizinkan dan mengaktifkan autentikasi untuk menghubungkan klien konsensus yang ditentukan oleh jalur `jwtsecret`.

```bash
erigon --chain mainnet \
    --datadir /data/ethereum \
    --http --http.api=engine,eth,erigon,web3,net,debug,trace,txpool \
    --authrpc.jwtsecret=/tmp/jwtsecret
```

Erigon secara default melakukan sinkronisasi penuh dengan HDD 8GB yang akan menghasilkan lebih dari 2TB data arsip. Pastikan `datadir` menunjuk ke disk dengan ruang kosong yang cukup atau lihat bendera `--prune` yang dapat memangkas berbagai jenis data. Periksa `--help` Erigon untuk mempelajari lebih lanjut.

##### Menjalankan Geth

Contoh ini memulai Geth di mainnet, menyimpan data blockchain di `/data/ethereum`, mengaktifkan JSON-RPC dan menentukan namespace mana yang diizinkan. Ini juga mengaktifkan autentikasi untuk menghubungkan klien konsensus yang memerlukan jalur ke `jwtsecret` dan juga opsi yang menentukan koneksi mana yang diizinkan, dalam contoh kami hanya dari `localhost`.

```bash
geth --mainnet \
    --datadir /data/ethereum \
    --http --http.api eth,net,engine,admin \
    --authrpc.jwtsecret=/tmp/jwtsecret
```

Periksa [dokumen untuk semua opsi konfigurasi](https://geth.ethereum.org/docs/fundamentals/command-line-options) dan pelajari lebih lanjut tentang [menjalankan Geth dengan klien konsensus](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Menjalankan Nethermind

Nethermind menawarkan berbagai [opsi instalasi](https://docs.nethermind.io/get-started/installing-nethermind). Paket ini dilengkapi dengan berbagai biner, termasuk Peluncur dengan pengaturan terpandu, yang akan membantu Anda membuat konfigurasi secara interaktif. Sebagai alternatif, Anda menemukan Runner yang merupakan file yang dapat dieksekusi itu sendiri dan Anda dapat menjalankannya dengan bendera konfigurasi. JSON-RPC diaktifkan secara default.

```bash
./Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/tmp/jwtsecret
```

Dokumen Nethermind menawarkan [panduan lengkap](https://docs.nethermind.io/get-started/running-node/) tentang menjalankan Nethermind dengan klien konsensus.

Klien eksekusi akan memulai fungsi intinya, titik akhir yang dipilih, dan mulai mencari rekan. Setelah berhasil menemukan rekan, klien memulai sinkronisasi. Klien eksekusi akan menunggu koneksi dari klien konsensus. Data blockchain saat ini akan tersedia setelah klien berhasil disinkronkan ke status saat ini.

##### Menjalankan Reth

Contoh ini memulai Reth di mainnet, menggunakan lokasi data default. Mengaktifkan autentikasi JSON-RPC dan Engine RPC untuk menghubungkan klien konsensus yang ditentukan oleh jalur `jwtsecret`, dengan hanya panggilan dari `localhost` yang diizinkan.

```bash
reth node \
    --authrpc.jwtsecret /tmp/jwtsecret \
    --http
```

Lihat [Mengonfigurasi Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) untuk mempelajari lebih lanjut tentang direktori data default. [Dokumentasi Reth](https://reth.rs/run/mainnet.html) berisi opsi tambahan dan detail konfigurasi.

#### Memulai klien konsensus {#starting-the-consensus-client}

Klien konsensus harus dimulai dengan konfigurasi port yang tepat untuk membuat koneksi RPC lokal ke klien eksekusi. Klien konsensus harus dijalankan dengan port klien eksekusi yang diekspos sebagai argumen konfigurasi.

Klien konsensus juga memerlukan jalur ke `jwt-secret` klien eksekusi untuk mengautentikasi koneksi RPC di antara mereka. Mirip dengan contoh eksekusi di atas, setiap klien konsensus memiliki bendera konfigurasi yang mengambil jalur file token jwt sebagai argumen. Ini harus konsisten dengan jalur `jwtsecret` yang diberikan ke klien eksekusi.

Jika Anda berencana untuk menjalankan validator, pastikan untuk menambahkan bendera konfigurasi yang menentukan alamat Ethereum penerima biaya. Di sinilah hadiah ether untuk validator Anda terakumulasi. Setiap klien konsensus memiliki opsi, mis., `--suggested-fee-recipient=0xabcd1`, yang mengambil alamat Ethereum sebagai argumen.

Saat memulai Beacon Node di testnet, Anda dapat menghemat waktu sinkronisasi yang signifikan dengan menggunakan titik akhir publik untuk [Sinkronisasi Checkpoint](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Menjalankan klien konsensus {#running-a-consensus-client}

##### Menjalankan Lighthouse

Sebelum menjalankan Lighthouse, pelajari lebih lanjut tentang cara menginstal dan mengonfigurasinya di [Buku Lighthouse](https://lighthouse-book.sigmaprime.io/installation.html).

```bash
lighthouse bn \
    --network mainnet \
    --execution-endpoint http://localhost:8551 \
    --execution-jwt /tmp/jwtsecret
```

##### Menjalankan Lodestar

Instal perangkat lunak Lodestar dengan mengkompilasinya atau mengunduh citra Docker. Pelajari lebih lanjut di [dokumen](https://chainsafe.github.io/lodestar/) dan [panduan pengaturan](https://hackmd.io/@philknows/rk5cDvKmK) yang lebih komprehensif.

```bash
lodestar beacon \
    --network mainnet \
    --jwt-secret /tmp/jwtsecret
```

##### Menjalankan Nimbus

Nimbus dilengkapi dengan klien konsensus dan eksekusi. Ini dapat dijalankan di berbagai perangkat bahkan dengan daya komputasi yang sangat sederhana.
Setelah [menginstal dependensi dan Nimbus itu sendiri](https://nimbus.guide/quick-start.html), Anda dapat menjalankan klien konsensusnya:

```bash
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --jwt-secret=/tmp/jwtsecret
```

##### Menjalankan Prysm

Prysm dilengkapi dengan skrip yang memungkinkan instalasi otomatis yang mudah. Detail dapat ditemukan di [dokumen Prysm](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/).

```bash
prysm.sh beacon-chain \
    --mainnet \
    --execution-endpoint=http://localhost:8551 \
    --jwt-secret=/tmp/jwtsecret
```

##### Menjalankan Teku

```bash
teku --network mainnet \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file /tmp/jwtsecret
```

Saat klien konsensus terhubung ke klien eksekusi untuk membaca kontrak deposit dan mengidentifikasi validator, ia juga terhubung ke rekan Beacon Node lainnya dan mulai menyinkronkan slot konsensus dari genesis. Setelah Beacon Node mencapai epoch saat ini, Beacon API menjadi dapat digunakan untuk validator Anda. Pelajari lebih lanjut tentang [API Beacon Node](https://eth2docs.vercel.app/).

### Menambahkan Validator {#adding-validators}

Klien konsensus berfungsi sebagai Beacon Node untuk dihubungkan oleh validator. Setiap klien konsensus memiliki perangkat lunak validatornya sendiri yang dijelaskan secara rinci dalam dokumentasinya masing-masing.

Menjalankan validator Anda sendiri memungkinkan untuk [mengunci solo](/staking/solo/), metode yang paling berdampak dan tanpa kepercayaan untuk mendukung jaringan Ethereum. Namun, ini memerlukan deposit sebesar 32 ETH. Untuk menjalankan validator pada node Anda sendiri dengan jumlah yang lebih kecil, kolam terdesentralisasi dengan operator node tanpa izin, seperti [Rocket Pool](https://rocketpool.net/node-operators), mungkin menarik bagi Anda.

Cara termudah untuk memulai dengan mengunci dan pembuatan kunci validator adalah dengan menggunakan [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org/), yang memungkinkan Anda untuk menguji pengaturan Anda dengan [menjalankan node di Hoodi](https://notes.ethereum.org/@launchpad/hoodi). Saat Anda siap untuk mainnet, Anda dapat mengulangi langkah-langkah ini menggunakan [Mainnet Staking Launchpad](https://launchpad.ethereum.org/).

Lihat [halaman mengunci](/staking) untuk ikhtisar tentang opsi mengunci.

### Menggunakan node {#using-the-node}

Klien eksekusi menawarkan [titik akhir RPC API](/developers/docs/apis/json-rpc/) yang dapat Anda gunakan untuk mengirimkan transaksi, berinteraksi dengan, atau menerapkan kontrak pintar di jaringan Ethereum dengan berbagai cara:

- Memanggilnya secara manual dengan protokol yang sesuai (mis., menggunakan `curl`)
- Melampirkan konsol yang disediakan (mis., `geth attach`)
- Mengimplementasikannya dalam aplikasi menggunakan pustaka web3, mis., [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Klien yang berbeda memiliki implementasi titik akhir RPC yang berbeda. Tetapi ada JSON-RPC standar yang dapat Anda gunakan dengan setiap klien. Untuk ikhtisar [baca dokumen JSON-RPC](/developers/docs/apis/json-rpc/). Aplikasi yang membutuhkan informasi dari jaringan Ethereum dapat menggunakan RPC ini. Misalnya, dompet populer MetaMask memungkinkan Anda [terhubung ke titik akhir RPC Anda sendiri](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) yang memiliki manfaat privasi dan keamanan yang kuat.

Semua klien konsensus mengekspos [Beacon API](https://ethereum.github.io/beacon-APIs) yang dapat digunakan untuk memeriksa status klien konsensus atau mengunduh blok dan data konsensus dengan mengirimkan permintaan menggunakan alat seperti [Curl](https://curl.se). Informasi lebih lanjut tentang ini dapat ditemukan dalam dokumentasi untuk setiap klien konsensus.

#### Menjangkau RPC {#reaching-rpc}

Port default untuk klien eksekusi JSON-RPC adalah `8545` tetapi Anda dapat memodifikasi port titik akhir lokal dalam konfigurasi. Secara default, antarmuka RPC hanya dapat dijangkau di localhost komputer Anda. Untuk membuatnya dapat diakses dari jarak jauh, Anda mungkin ingin mengeksposnya ke publik dengan mengubah alamat menjadi `0.0.0.0`. Ini akan membuatnya dapat dijangkau melalui jaringan lokal dan alamat IP publik. Dalam kebanyakan kasus, Anda juga perlu mengatur penerusan port di router Anda.

Lakukan pendekatan mengekspos port ke internet dengan hati-hati karena ini akan membiarkan siapa pun di internet mengontrol node Anda. Aktor jahat dapat mengakses node Anda untuk menjatuhkan sistem Anda atau mencuri dana Anda jika Anda menggunakan klien Anda sebagai dompet.

Cara untuk menyiasati ini adalah dengan mencegah metode RPC yang berpotensi berbahaya agar tidak dapat dimodifikasi. Misalnya, dengan Geth, Anda dapat mendeklarasikan metode yang dapat dimodifikasi dengan bendera: `--http.api web3,eth,txpool`.

Akses ke antarmuka RPC dapat diperluas melalui pengembangan API lapisan tepi atau aplikasi server web, seperti Nginx, dan menghubungkannya ke alamat dan port lokal klien Anda. Memanfaatkan lapisan tengah juga dapat memungkinkan pengembang kemampuan untuk mengatur sertifikat untuk koneksi `https` yang aman ke antarmuka RPC.

Mengatur server web, proksi, atau Rest API yang menghadap eksternal bukanlah satu-satunya cara untuk menyediakan akses ke titik akhir RPC node Anda. Cara lain yang menjaga privasi untuk mengatur titik akhir yang dapat dijangkau publik adalah dengan menghosting node pada layanan onion [Tor](https://www.torproject.org/) Anda sendiri. Ini akan memungkinkan Anda menjangkau RPC di luar jaringan lokal Anda tanpa alamat IP publik statis atau port yang dibuka. Namun, menggunakan konfigurasi ini mungkin hanya memungkinkan titik akhir RPC dapat diakses melalui jaringan Tor yang tidak didukung oleh semua aplikasi dan mungkin mengakibatkan masalah koneksi.

Untuk melakukan ini, Anda harus membuat [layanan onion](https://community.torproject.org/onion-services/) Anda sendiri. Lihat [dokumentasi](https://community.torproject.org/onion-services/setup/) tentang pengaturan layanan onion untuk menghosting milik Anda sendiri. Anda dapat mengarahkannya ke server web dengan proksi ke port RPC atau langsung ke RPC.

Terakhir, dan salah satu cara paling populer untuk menyediakan akses ke jaringan internal adalah melalui koneksi VPN. Bergantung pada kasus penggunaan Anda dan jumlah pengguna yang membutuhkan akses ke node Anda, koneksi VPN yang aman mungkin menjadi pilihan. [OpenVPN](https://openvpn.net/) adalah SSL VPN berfitur lengkap yang mengimplementasikan ekstensi jaringan aman OSI layer 2 atau 3 menggunakan protokol SSL/TLS standar industri, mendukung metode autentikasi klien yang fleksibel berdasarkan sertifikat, kartu pintar, dan/atau kredensial nama pengguna/kata sandi, dan memungkinkan kebijakan kontrol akses khusus pengguna atau grup menggunakan aturan firewall yang diterapkan ke antarmuka virtual VPN.

### Mengoperasikan node {#operating-the-node}

Anda harus memantau node Anda secara teratur untuk memastikan ia berjalan dengan baik. Anda mungkin perlu melakukan pemeliharaan sesekali.

#### Menjaga node tetap online {#keeping-node-online}

Node Anda tidak harus online sepanjang waktu, tetapi Anda harus menjaganya tetap online sebanyak mungkin agar tetap sinkron dengan jaringan. Anda dapat mematikannya untuk memulai ulang, tetapi perlu diingat bahwa:

- Mematikan dapat memakan waktu beberapa menit jika status terbaru masih ditulis di disk.
- Mematikan paksa dapat merusak basis data yang mengharuskan Anda untuk menyinkronkan ulang seluruh node.
- Klien Anda akan keluar dari sinkronisasi dengan jaringan dan perlu menyinkronkan ulang saat Anda memulai ulangnya. Meskipun node dapat mulai menyinkronkan dari tempat terakhir dimatikan, prosesnya dapat memakan waktu tergantung pada berapa lama ia offline.

_Ini tidak berlaku pada node validator lapisan konsensus._ Membuat node Anda offline akan memengaruhi semua layanan yang bergantung padanya. Jika Anda menjalankan node untuk tujuan _mengunci_ Anda harus mencoba meminimalkan waktu henti sebanyak mungkin.

#### Membuat layanan klien {#creating-client-services}

Pertimbangkan untuk membuat layanan untuk menjalankan klien Anda secara otomatis saat startup. Misalnya, di server Linux, praktik yang baik adalah membuat layanan, mis., dengan `systemd`, yang mengeksekusi klien dengan konfigurasi yang tepat, di bawah pengguna dengan hak istimewa terbatas dan secara otomatis memulai ulang.

#### Memperbarui klien {#updating-clients}

Anda perlu menjaga perangkat lunak klien Anda tetap mutakhir dengan patch keamanan, fitur, dan [EIP](/eips/) terbaru. Terutama sebelum [hard fork](/ethereum-forks/), pastikan Anda menjalankan versi klien yang benar.

> Sebelum pembaruan jaringan penting, EF menerbitkan postingan di [blog](https://blog.ethereum.org)-nya. Anda dapat [berlangganan pengumuman ini](https://blog.ethereum.org/category/protocol#subscribe) untuk mendapatkan pemberitahuan ke email Anda saat node Anda memerlukan pembaruan.

Memperbarui klien sangat sederhana. Setiap klien memiliki instruksi spesifik dalam dokumentasinya, tetapi prosesnya umumnya hanya mengunduh versi terbaru dan memulai ulang klien dengan file yang dapat dieksekusi yang baru. Klien harus melanjutkan dari tempat ia tinggalkan, tetapi dengan pembaruan yang diterapkan.

Setiap implementasi klien memiliki string versi yang dapat dibaca manusia yang digunakan dalam protokol peer-to-peer tetapi juga dapat diakses dari baris perintah. String versi ini memungkinkan pengguna memeriksa bahwa mereka menjalankan versi yang benar dan memungkinkan penjelajah blok dan alat analitik lainnya yang tertarik untuk mengukur distribusi klien tertentu di jaringan. Silakan merujuk ke dokumentasi klien individu untuk informasi lebih lanjut tentang string versi.

#### Menjalankan layanan tambahan {#running-additional-services}

Menjalankan node Anda sendiri memungkinkan Anda menggunakan layanan yang memerlukan akses langsung ke RPC klien Ethereum. Ini adalah layanan yang dibangun di atas Ethereum seperti [solusi layer 2](/developers/docs/scaling/#layer-2-scaling), backend untuk dompet, penjelajah blok, alat pengembang, dan infrastruktur Ethereum lainnya.

#### Memantau node {#monitoring-the-node}

Untuk memantau node Anda dengan benar, pertimbangkan untuk mengumpulkan metrik. Klien menyediakan titik akhir metrik sehingga Anda bisa mendapatkan data komprehensif tentang node Anda. Gunakan alat seperti [InfluxDB](https://www.influxdata.com/get-influxdb/) atau [Prometheus](https://prometheus.io/) untuk membuat basis data yang dapat Anda ubah menjadi visualisasi dan bagan dalam perangkat lunak seperti [Grafana](https://grafana.com/). Ada banyak pengaturan untuk menggunakan perangkat lunak ini dan dasbor Grafana yang berbeda bagi Anda untuk memvisualisasikan node Anda dan jaringan secara keseluruhan. Misalnya, lihat [tutorial tentang memantau Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

Sebagai bagian dari pemantauan Anda, pastikan untuk mengawasi kinerja mesin Anda. Selama sinkronisasi awal node Anda, perangkat lunak klien mungkin sangat berat pada CPU dan RAM. Selain Grafana, Anda dapat menggunakan alat yang ditawarkan OS Anda seperti `htop` atau `uptime` untuk melakukan ini.

## Bacaan lebih lanjut {#further-reading}

- [Panduan Mengunci Ethereum](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat, sering diperbarui_
- [Panduan | Cara mengatur validator untuk mengunci Ethereum di mainnet](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, sering diperbarui_
- [Panduan ETHStaker tentang menjalankan validator di testnet](https://github.com/remyroy/ethstaker#guides) – _ETHStaker, diperbarui secara berkala_
- [Contoh aplikasi AWS Blockchain Node Runner untuk Node Ethereum](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) - _AWS, sering diperbarui_
- [FAQ The Merge untuk operator node](https://notes.ethereum.org/@launchpad/node-faq-merge) - _Juli 2022_
- [Menganalisis persyaratan perangkat keras untuk menjadi node tervalidasi penuh Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 September 2018_
- [Menjalankan Node Penuh Ethereum: Panduan untuk yang Kurang Termotivasi](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 November 2019_
- [Menjalankan Node Hyperledger Besu di Mainnet Ethereum: Manfaat, Persyaratan, dan Pengaturan](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Mei 2020_
- [Menerapkan Klien Ethereum Nethermind dengan Tumpukan Pemantauan](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 Juli 2020_

## Topik terkait {#related-topics}

- [Node dan klien](/developers/docs/nodes-and-clients/)
- [Blok](/developers/docs/blocks/)
- [Jaringan](/developers/docs/networks/)