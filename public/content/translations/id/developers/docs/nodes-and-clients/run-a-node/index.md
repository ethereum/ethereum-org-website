---
title: Jalankan node Ethereum Anda sendiri
description: Pengenalan umum untuk menjalankan instance klien Ethereum Anda sendiri.
lang: id
sidebarDepth: 2
---

Menjalankan node Anda sendiri memberi Anda beragam manfaat, membuka peluang baru, dan membantu mendukung ekosistem. Halaman ini akan memandu Anda menjalankan node Anda sendiri dan mengambil bagian dalam memvalidasi transaksi Ethereum.

Perhatikan bahwa setelah [Penggabungan](/roadmap/merge), diperlukan dua klien untuk menjalankan simpul Ethereum; sebuah klien **lapisan eksekusi (EL)** dan sebuah klien **lapisan konsensus (CL)**. Halaman ini akan menunjukkan cara menginstal, mengonfigurasi, dan menghubungkan kedua klien ini untuk menjalankan node Ethereum.

## Persyaratan {#prerequisites}

Anda sebaiknya memahami apa itu node Ethereum dan mengapa Anda mungkin ingin menjalankan sebuah klien. Hal ini dibahas dalam [Simpul dan klien](/developers/docs/nodes-and-clients/).

Jika Anda baru mengenal topik menjalankan simpul, atau mencari jalur yang kurang teknis, kami sarankan untuk memeriksa pengantar ramah pengguna kami terlebih dahulu tentang [menjalankan simpul Ethereum](/run-a-node).

## Memilih pendekatan {#choosing-approach}

Langkah pertama dalam memulai node Anda adalah memilih pendekatan yang akan digunakan. Berdasarkan kebutuhan dan berbagai kemungkinan, Anda harus memilih implementasi klien (baik untuk klien eksekusi maupun konsensus), lingkungan (perangkat keras, sistem), serta parameter untuk pengaturan klien.

Halaman ini akan memandu Anda melalui keputusan-keputusan tersebut dan membantu menemukan cara paling sesuai untuk menjalankan instance Ethereum Anda.

Untuk memilih dari implementasi klien, lihat semua [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) yang siap untuk Jaringan Utama, [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients) yang tersedia dan pelajari tentang [keragaman klien](/developers/docs/nodes-and-clients/client-diversity).

Tentukan apakah akan menjalankan perangkat lunak pada [perangkat keras Anda sendiri atau di cloud](#local-vs-cloud), dengan mempertimbangkan [persyaratan](#requirements) klien.

Setelah menyiapkan lingkungan, pasang klien yang dipilih baik dengan [antarmuka ramah-pemula](#automatized-setup) atau [secara manual](#manual-setup) menggunakan terminal dengan opsi lanjutan.

Saat simpul berjalan dan menyinkron, Anda siap [menggunakannya](#using-the-node), tetapi pastikan untuk mengawasi [pemeliharaannya](#operating-the-node).

![Pengaturan klien](./diagram.png)

### Lingkungan dan perangkat keras {#environment-and-hardware}

#### Lokal atau cloud {#local-vs-cloud}

Klien Ethereum dapat dijalankan di komputer kelas konsumen dan tidak memerlukan perangkat keras khusus, seperti mesin penambangan misalnya. Oleh karena itu, Anda memiliki berbagai opsi untuk men-deploy node sesuai dengan kebutuhan Anda.
Untuk menyederhanakan, mari kita bayangkan menjalankan sebuah node baik di mesin fisik lokal maupun di server cloud:

- Cloud
  - Penyedia menawarkan uptime server yang tinggi dan alamat IP publik statis
  - Mendapatkan server terdedikasi atau virtual dapat memberi kenyamanan lebih dari pada membangunnya sendiri
  - Sebagai gantinya mempercayai penyedia server pihak ketiga
  - Karena ukuran penyimpanan yang dibutuhkan untuk full node, harga sewa server bisa menjadi tinggi
- Perangkat keras milik sendiri
  - Pendekatan yang lebih tepercaya dan bebas
  - Investasi satu kali
  - Opsi untuk membeli mesin yang sudah dikonfigurasi
  - Anda harus menyiapkan secara fisik, merawat, dan mungkin memecahkan masalah pada mesin serta jaringan

Kedua opsi memiliki keunggulan yang berbeda seperti yang dijelaskan di atas. Jika Anda mencari solusi cloud, selain banyak penyedia komputasi awan tradisional, ada juga layanan yang fokus pada penyebaran node. Lihat [simpul sebagai layanan](/developers/docs/nodes-and-clients/nodes-as-a-service/) untuk opsi lebih lanjut tentang simpul yang di-hosting.

#### Perangkat keras {#hardware}

Namun, jaringan yang tahan sensor dan terdesentralisasi seharusnya tidak bergantung pada penyedia layanan cloud. Sebaliknya, menjalankan node Anda sendiri di perangkat keras lokal lebih sehat bagi ekosistem. [Estimasi](https://www.ethernodes.org/networkType/cl/Hosting) menunjukkan sebagian besar simpul berjalan di cloud, yang bisa menjadi satu titik kegagalan.

Klien Ethereum dapat dijalankan di komputer, laptop, server, atau bahkan komputer papan tunggal. Meskipun menjalankan klien di komputer pribadi dimungkinkan, memiliki mesin khusus hanya untuk node Anda dapat secara signifikan meningkatkan kinerja dan keamanan, sekaligus meminimalkan dampak pada komputer utama Anda.

Menggunakan perangkat keras Anda sendiri bisa sangat mudah. Terdapat banyak opsi sederhana, sekaligus pengaturan lanjutan bagi mereka yang lebih teknis. Mari kita lihat persyaratan dan cara untuk menjalankan klien Ethereum di perangkat Anda.

#### Persyaratan {#requirements}

Persyaratan perangkat keras berbeda-beda tergantung klien, tetapi secara umum tidak terlalu tinggi karena node hanya perlu tetap tersinkronisasi. Jangan bingung dengan penambangan, yang membutuhkan daya komputasi jauh lebih besar. Namun, waktu sinkronisasi dan kinerja akan meningkat jika menggunakan perangkat keras yang lebih kuat.

Sebelum menginstal klien apa pun, pastikan komputer Anda memiliki sumber daya yang cukup untuk menjalankannya. Anda dapat menemukan persyaratan minimum dan yang direkomendasikan di bawah ini.

Hambatan utama untuk perangkat keras Anda biasanya adalah ruang penyimpanan disk. Menyinkronkan blockchain Ethereum sangat intensif pada input/output dan membutuhkan banyak ruang penyimpanan. Sebaiknya miliki **solid-state drive (SSD)** dengan ratusan GB ruang kosong yang tersisa bahkan setelah sinkronisasi.

Ukuran basis data dan kecepatan sinkronisasi awal bergantung pada klien yang dipilih, konfigurasinya, dan [strategi sinkronisasi](/developers/docs/nodes-and-clients/#sync-modes).

Pastikan juga koneksi internet Anda tidak dibatasi oleh [batas bandwidth](https://wikipedia.org/wiki/Data_cap). Disarankan menggunakan koneksi tanpa batas karena sinkronisasi awal dan data yang disiarkan ke jaringan bisa melebihi batas kuota Anda.

##### Sistem operasi

Semua klien mendukung sistem operasi utama - Linux, MacOS, Windows. Ini berarti Anda dapat menjalankan node di komputer desktop atau server biasa dengan sistem operasi (OS) yang paling sesuai untuk Anda. Pastikan sistem operasi Anda selalu diperbarui untuk menghindari masalah potensial dan kerentanan keamanan.

##### Persayaratan minimum

- CPU dengan 2+ inti
- RAM 8 GB
- SSD 2TB
- Bandwidth dengan kecepatan 10+ MBit/d

##### Spesifikasi yang direkomendasikan

- CPU cepat dengan 4+ inti
- RAM berukuran 16 GB+
- SSD cepat dengan 2+TB
- Bandwidth dengan kecepatan 25+ MBit/d

Mode sinkronisasi dan klien yang Anda pilih akan memengaruhi kebutuhan ruang penyimpanan, tetapi kami telah memperkirakan kapasitas disk yang Anda perlukan untuk setiap klien di bawah ini.

| Klien      | Ukuran cakram (sinkronisasi snap) | Ukuran disk (arsip penuh) |
| ---------- | ---------------------------------------------------- | -------------------------------------------- |
| Besu       | 800GB+                                               | 12TB+                                        |
| Erigon     | N/A                                                  | 2.5TB+                       |
| Geth       | 500GB+                                               | 12TB+                                        |
| Nethermind | 500GB+                                               | 12TB+                                        |
| Reth       | N/A                                                  | 2.2TB+                       |

- Catatan: Erigon dan Reth tidak menyediakan snap sync, tetapi Full Pruning memungkinkan (~2TB untuk Erigon, ~1,2TB untuk Reth)

Untuk klien konsensus, kebutuhan ruang juga bergantung pada implementasi klien dan fitur yang diaktifkan (misalnya, pemotong validator) tetapi secara umum perhitungkan 200GB lain yang dibutuhkan untuk data beacon. Dengan jumlah validator yang banyak, beban bandwidth juga meningkat. Anda dapat menemukan [detail tentang persyaratan klien konsensus dalam analisis ini](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Solusi plug-and-play {#plug-and-play}

Opsi termudah untuk menjalankan node dengan perangkat keras sendiri adalah menggunakan plug-and-play box. Mesin yang sudah dikonfigurasi sebelumnya dari penyedia menawarkan pengalaman paling mudah: pesan, sambungkan, jalankan. Semua sudah dikonfigurasi sebelumnya dan berjalan otomatis dengan panduan intuitif serta dasbor untuk memantau dan mengontrol perangkat lunak.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum di komputer papan tunggal {#ethereum-on-a-single-board-computer}

Cara mudah dan murah untuk menjalankan node Ethereum adalah menggunakan komputer papan tunggal, bahkan dengan arsitektur ARM seperti Raspberry Pi. [Ethereum di ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) menyediakan citra yang mudah dijalankan dari beberapa klien eksekusi dan konsensus untuk Raspberry Pi dan papan ARM lainnya.

Perangkat kecil, terjangkau, dan efisien seperti ini ideal untuk menjalankan node di rumah, namun perlu diingat keterbatasan performanya.

## Memulai simpul {#spinning-up-node}

Pengaturan klien yang sebenarnya dapat dilakukan baik dengan peluncur otomatis maupun secara manual, dengan menginstal perangkat lunak klien secara langsung.

Untuk pengguna yang kurang berpengalaman, pendekatan yang disarankan adalah menggunakan peluncur, yaitu perangkat lunak yang memandu Anda melalui proses instalasi dan mengotomatiskan pengaturan klien. Namun, jika Anda memiliki pengalaman menggunakan terminal, langkah-langkah untuk pengaturan manual seharusnya mudah diikuti.

### Pengaturan terpandu {#automatized-setup}

Beberapa proyek yang ramah pengguna bertujuan untuk meningkatkan pengalaman dalam mengatur klien. Peluncur ini menyediakan instalasi dan konfigurasi klien secara otomatis, dengan beberapa bahkan menawarkan antarmuka grafis untuk panduan pengaturan dan pemantauan klien.

Berikut beberapa proyek yang dapat membantu Anda menginstal dan mengelola klien hanya dengan beberapa klik:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DappNode tidak hanya datang dengan mesin dari vendor. Perangkat lunak, termasuk peluncur node dan pusat kendali dengan berbagai fitur, dapat digunakan pada perangkat keras apa pun.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - Cara tercepat dan termudah untuk menyiapkan simpul penuh. Alat pengaturan satu baris dan manajemen node TUI. Gratis. Sumber terbuka. Barang publik untuk Ethereum oleh para pemegang saham solo. Dukungan ARM64 dan AMD64.
- [eth-docker](https://eth-docker.net/) - Pengaturan otomatis menggunakan Docker yang berfokus pada penaruhan yang mudah dan aman, membutuhkan pengetahuan dasar terminal dan Docker, direkomendasikan untuk pengguna yang sedikit lebih mahir.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - Peluncur untuk memasang klien di server jarak jauh melalui koneksi SSH dengan panduan pengaturan GUI, pusat kontrol, dan banyak fitur lainnya.
- [NiceNode](https://www.nicenode.xyz/) - Peluncur dengan pengalaman pengguna yang sederhana untuk menjalankan simpul di komputer Anda. Cukup pilih klien dan jalankan dengan beberapa klik saja. Masih dalam pengembangan.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - Alat penyiapan simpul yang secara otomatis menghasilkan konfigurasi Docker menggunakan wizard CLI. Ditulis dalam Go oleh Nethermind.

### Penyiapan klien manual {#manual-setup}

Opsi lainnya adalah mengunduh, memverifikasi, dan mengonfigurasi perangkat lunak client secara manual. Meskipun beberapa client menyediakan antarmuka grafis, pengaturan manual tetap memerlukan keterampilan dasar menggunakan terminal, tetapi menawarkan fleksibilitas yang jauh lebih besar.

Seperti yang dijelaskan sebelumnya, menjalankan node Ethereum Anda sendiri akan membutuhkan sepasang client: satu untuk konsensus dan satu untuk eksekusi. Beberapa client mungkin menyertakan light client dari jenis lain dan dapat melakukan sinkronisasi tanpa memerlukan software tambahan. Namun, verifikasi penuh yang bersifat trustless membutuhkan kedua implementasi tersebut.

#### Mendapatkan perangkat lunak klien {#getting-the-client}

Pertama, Anda perlu mendapatkan perangkat lunak [klien eksekusi](/developers/docs/nodes-and-clients/#execution-clients) dan [klien konsensus](/developers/docs/nodes-and-clients/#consensus-clients) pilihan Anda.

Anda dapat dengan mudah mengunduh aplikasi eksekusi atau paket instalasi yang sesuai dengan sistem operasi dan arsitektur perangkat Anda. Selalu verifikasi tanda tangan dan checksum paket yang diunduh. Beberapa klien juga menyediakan repositori atau image Docker untuk memudahkan instalasi dan pembaruan. Semua klien bersifat sumber terbuka, jadi Anda juga dapat membangunnya dari sumber. Ini adalah metode yang lebih canggih, tetapi dalam beberapa kasus, hal ini mungkin diperlukan.

Petunjuk untuk menginstal setiap client disediakan dalam dokumentasi yang terhubung di daftar client di atas.

Berikut adalah halaman rilis dari masing-masing client, di mana Anda bisa menemukan biner siap pakai atau instruksi instalasi:

##### Klien eksekusi

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Perlu juga dicatat bahwa keragaman klien adalah sebuah [masalah pada lapisan eksekusi](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Disarankan bagi pembaca untuk mempertimbangkan menjalankan execution client minoritas.

##### Klien konsensus

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source) (Tidak menyediakan biner pra-bangun, hanya citra Docker atau untuk dibangun dari sumber)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Keragaman klien](/developers/docs/nodes-and-clients/client-diversity/) sangat penting untuk simpul konsensus yang menjalankan validator. Jika mayoritas validator menjalankan satu implementasi client saja, keamanan jaringan akan terancam. Oleh karena itu, disarankan untuk mempertimbangkan memilih client minoritas.

[Lihat penggunaan klien jaringan terbaru](https://clientdiversity.org/) dan pelajari lebih lanjut tentang [keragaman klien](/developers/docs/nodes-and-clients/client-diversity).

##### verifikasi perangkat lunak

Saat mengunduh perangkat lunak dari internet, disarankan untuk memverifikasi integritasnya. Langkah ini bersifat opsional, tetapi terutama untuk komponen infrastruktur penting seperti klien Ethereum, penting untuk menyadari potensi jalur serangan dan menghindarinya. Jika Anda mengunduh binary yang sudah jadi, Anda harus mempercayainya dan menanggung risiko bahwa penyerang bisa mengganti file tersebut dengan versi berbahaya.

Para pengembang menandatangani berkas biner yang dirilis menggunakan kunci PGP mereka sehingga Anda dapat memverifikasi secara kriptografi bahwa Anda menjalankan perangkat lunak yang persis sama dengan yang mereka buat. Anda hanya perlu memperoleh public key yang digunakan oleh pengembang, yang dapat ditemukan di halaman rilis klien atau dalam dokumentasinya. Setelah mengunduh rilis klien beserta tanda tangannya, Anda dapat menggunakan implementasi PGP, misalnya [GnuPG](https://gnupg.org/download/index.html), untuk memverifikasi keduanya dengan mudah. Lihat tutorial tentang verifikasi perangkat lunak sumber terbuka menggunakan `gpg` di [linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) atau [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/).

Bentuk verifikasi lainnya adalah memastikan bahwa hash, sebuah sidik jari kriptografi unik, dari perangkat lunak yang Anda unduh sesuai dengan yang disediakan oleh pengembang. Ini bahkan lebih mudah daripada menggunakan PGP, dan beberapa klien hanya menyediakan opsi ini saja. Cukup jalankan fungsi hash pada perangkat lunak yang diunduh dan bandingkan dengan yang ada di halaman rilis. Sebagai contoh:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Penyiapan Klien {#client-setup}

Setelah menginstal, mengunduh, atau compile perangkat lunak klien, Anda siap untuk menjalankannya. Ini hanya berarti perangkat lunak tersebut harus dijalankan dengan konfigurasi yang tepat. Klien menyediakan berbagai opsi konfigurasi yang dapat mengaktifkan berbagai fitur.

Mari kita mulai dengan opsi-opsi yang dapat secara signifikan memengaruhi kinerja klien dan penggunaan data. [Mode sinkronisasi](/developers/docs/nodes-and-clients/#sync-modes) mewakili berbagai metode mengunduh dan memvalidasi data blockchain. Sebelum memulai node, Anda harus memutuskan jaringan dan mode sinkronisasi apa yang akan digunakan. Hal terpenting yang perlu dipertimbangkan adalah ruang penyimpanan dan waktu sinkronisasi yang dibutuhkan klien. Perhatikan dokumentasi klien untuk mengetahui mode sinkronisasi mana yang menjadi default. Jika itu tidak sesuai, pilih mode lain berdasarkan tingkat keamanan, data yang tersedia, dan biayanya. Selain algoritma sinkronisasi, Anda juga dapat menentukan pemangkasan berbagai jenis data lama. Pemangkasan memungkinkan penghapusan data usang, yaitu, menghapus simpul trie status yang tidak dapat dijangkau dari blok-blok terbaru.

Pilihan konfigurasi dasar lainnya adalah, misalnya, memilih jaringan - Jaringan Utama atau testnet, mengaktifkan titik akhir HTTP untuk RPC atau WebSocket, dll. Anda dapat menemukan semua fitur dan opsi di dokumentasi klien. Berbagai konfigurasi klien dapat diatur dengan menjalankan klien menggunakan flag yang sesuai langsung di CLI atau melalui berkas konfigurasi. Setiap klien memiliki perbedaan masing-masing; selalu rujuk ke dokumentasi resmi atau halaman bantuan klien untuk detail opsi konfigurasi.

Untuk tujuan pengujian, Anda mungkin lebih memilih menjalankan klien pada salah satu jaringan testnet. [Lihat ikhtisar jaringan yang didukung](/developers/docs/nodes-and-clients/#execution-clients).

Contoh menjalankan klien eksekusi dengan konfigurasi dasar dapat ditemukan di bagian berikutnya.

#### Memulai klien eksekusi {#starting-the-execution-client}

Sebelum memulai perangkat lunak klien Ethereum, lakukan pemeriksaan terakhir untuk memastikan lingkungan Anda siap. Sebagai contoh, pastikan:

- Tersedia cukup ruang penyimpanan sesuai dengan jaringan dan mode sinkronisasi yang dipilih.
- Memori dan CPU tidak terhambat oleh program lainnya.
- Sistem operasi diperbarui ke versi terbaru.
- Sistem memiliki waktu dan tanggal yang benar.
- Router dan firewall Anda menerima koneksi pada port pendengar. Secara default, klien Ethereum menggunakan port pendengar (TCP) dan port penemuan (UDP), keduanya pada 30303 secara default.

Jalankan klien Anda pada testnet terlebih dahulu untuk menolong memastikan semuanya bekerja dengan benar.

Anda perlu mendeklarasikan pengaturan klien mana pun yang bukan default pada awalnya. Anda dapat menggunakan bendera atau berkas konfigurasi untuk mendeklarasikan konfigurasi yang diinginkan. Set fitur dan sintaks konfigurasi setiap klien berbeda-beda. Periksa dokumentasi klien Anda untuk detail spesifiknya.

klien eksekusi dan klien konsensus berkomunikasi melalui titik akhir terotentikasi yang ditentukan dalam [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). Untuk terhubung ke klien konsensus, klien eksekusi harus menghasilkan [`jwtsecret`](https://jwt.io/) pada path yang diketahui. Untuk alasan keamanan dan stabilitas, klien sebaiknya dijalankan di mesin yang sama, dan kedua klien harus mengetahui jalur ini karena digunakan untuk mengautentikasi koneksi RPC lokal di antara mereka. Klien eksekusi juga harus menentukan listening port untuk API yang terautentikasi.

Token ini dibuat secara otomatis oleh perangkat lunak klien, namun dalam beberapa kasus, Anda mungkin perlu membuatnya sendiri. Anda dapat membuatnya menggunakan [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### Menjalankan klien eksekusi {#running-an-execution-client}

Bagian ini akan memandu Anda melalui proses memulai klien eksekusi. Ini hanya berfungsi sebagai contoh konfigurasi dasar, yang akan memulai klien dengan pengaturan berikut:

- Menentukan jaringan yang akan dihubungkan, dalam contoh ini adalah Jaringan Utama
  - Anda bisa memilih [salah satu testnet](/developers/docs/networks/) untuk pengujian awal pengaturan Anda
- Menentukan direktori data, tempat semua data termasuk blockchain akan disimpan
  - Pastikan untuk mengganti path dengan yang asli, misalnya, menunjuk ke drive eksternal Anda
- Mengaktifkan antarmuka untuk berkomunikasi dengan klien
  - Termasuk JSON-RPC dan Engine API untuk komunikasi dengan klien konsensus
- Menentukan path ke `jwtsecret` untuk API yang diautentikasi
  - Pastikan untuk mengganti path contoh dengan yang asli yang dapat diakses oleh klien, misalnya, `/tmp/jwtsecret`

Perlu diingat bahwa ini hanyalah contoh dasar, semua pengaturan lainnya akan menggunakan nilai default. Perhatikan dokumentasi masing-masing klien untuk mempelajari nilai default, pengaturan, dan fitur yang tersedia. Untuk fitur lebih lanjut, misalnya menjalankan validator, memantau, dan sebagainya, silakan merujuk ke dokumentasi klien yang bersangkutan.

> Perhatikan bahwa garis miring terbalik `\` dalam contoh hanya untuk tujuan pemformatan; flag konfigurasi dapat didefinisikan dalam satu baris.

##### Menjalankan Besu

Contoh ini memulai Besu di Jaringan Utama, menyimpan data blockchain dalam format default di `/data/ethereum`, mengaktifkan JSON-RPC dan Engine RPC untuk menghubungkan klien konsensus. Engine API diautentikasi dengan token `jwtsecret` dan hanya panggilan dari `localhost` yang diizinkan.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu juga dilengkapi opsi launcher yang akan menanyakan serangkaian pertanyaan dan menghasilkan berkas konfigurasi. Jalankan peluncur interaktif menggunakan:

```sh
besu --Xlauncher
```

[Dokumentasi Besu](https://besu.hyperledger.org/public-networks/get-started/start-node/) berisi opsi tambahan dan detail konfigurasi.

##### Menjalankan Erigon

Contoh ini memulai Erigon di Jaringan Utama, menyimpan data blockchain di `/data/ethereum`, mengaktifkan JSON-RPC, menentukan namespace mana yang diizinkan dan mengaktifkan autentikasi untuk menghubungkan klien konsensus yang ditentukan oleh path `jwtsecret`.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Secara default, Erigon melakukan sinkronisasi penuh dengan 8GB HDD, yang akan menghasilkan lebih dari 2TB data arsip. Pastikan `datadir` menunjuk ke disk dengan ruang kosong yang cukup atau lihat flag `--prune` yang dapat memangkas berbagai jenis data. Periksa `--help` Erigon untuk mempelajari lebih lanjut.

##### Menjalankan Geth

Contoh ini memulai Geth di Jaringan Utama, menyimpan data blockchain di `/data/ethereum`, mengaktifkan JSON-RPC dan menentukan namespace mana yang diizinkan. Ini juga mengaktifkan autentikasi untuk menghubungkan klien konsensus yang memerlukan path ke `jwtsecret` dan juga opsi yang menentukan koneksi mana yang diizinkan, dalam contoh kami hanya dari `localhost`.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Periksa [dokumen untuk semua opsi konfigurasi](https://geth.ethereum.org/docs/fundamentals/command-line-options) dan pelajari lebih lanjut tentang [menjalankan Geth dengan klien konsensus](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Menjalankan Nethermind

Nethermind menawarkan berbagai [opsi instalasi](https://docs.nethermind.io/get-started/installing-nethermind). Paket ini dilengkapi dengan berbagai binary, termasuk Launcher dengan panduan pengaturan, yang akan membantu Anda membuat konfigurasi secara interaktif. Sebagai alternatif, Anda dapat menggunakan Runner yang merupakan executable itu sendiri dan bisa langsung dijalankan dengan tanda konfigurasi. JSON-RPC diaktifkan secara default.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Dokumen Nethermind menawarkan [panduan lengkap](https://docs.nethermind.io/get-started/running-node/) tentang menjalankan Nethermind dengan klien konsensus.

Klien eksekusi akan memulai fungsi inti, endpoint yang dipilih, dan mulai mencari peer. Setelah berhasil menemukan peer, klien memulai sinkronisasi. Klien eksekusi akan menunggu koneksi dari klien konsensus. Data rantai blok saat ini akan tersedia setelah klien berhasil disinkronisasikan dengan state saat ini.

##### Menjalankan Reth

Contoh ini menjalankan Reth di Mainnet, menggunakan lokasi data default. Mengaktifkan autentikasi JSON-RPC dan Engine RPC untuk menghubungkan klien konsensus yang ditentukan oleh path `jwtsecret`, dengan hanya panggilan dari `localhost` yang diizinkan.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Lihat [Mengonfigurasi Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) untuk mempelajari lebih lanjut tentang direktori data default. [Dokumentasi Reth](https://reth.rs/run/mainnet.html) berisi opsi tambahan dan detail konfigurasi.

#### Memulai klien konsensus {#starting-the-consensus-client}

Klien konsensus harus dijalankan dengan konfigurasi port yang tepat agar dapat membangun koneksi RPC lokal ke klien eksekusi. Klien konsensus harus dijalankan dengan port klien eksekusi yang terbuka sebagai argumen konfigurasi.

klien konsensus juga memerlukan path ke `jwt-secret` klien eksekusi untuk mengotentikasi koneksi RPC di antara mereka. Serupa dengan contoh eksekusi di atas, setiap klien konsensus memiliki tanda konfigurasi yang menerima jalur berkas token jwt sebagai argumen. Ini harus konsisten dengan path `jwtsecret` yang diberikan kepada klien eksekusi.

Jika Anda berencana menjalankan validator, pastikan untuk menambahkan flag konfigurasi yang menunjukkan alamat Ethereum penerima biaya. Di sinilah imbalan ether untuk validator Anda akan terkumpul. Setiap klien konsensus memiliki opsi, misalnya, `--suggested-fee-recipient=0xabcd1`, yang mengambil alamat Ethereum sebagai argumen.

Saat memulai Simpul Beacon di testnet, Anda dapat menghemat waktu sinkronisasi secara signifikan dengan menggunakan titik akhir publik untuk [Sinkronisasi Checkpoint](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Menjalankan klien konsensus {#running-a-consensus-client}

##### Menjalankan Mercusuar

Sebelum menjalankan Lighthouse, pelajari lebih lanjut tentang cara memasang dan mengonfigurasinya di [Lighthouse Book](https://lighthouse-book.sigmaprime.io/installation.html).

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### Menjalankan Lodestar

Instal perangkat lunak Lodestar dengan cara mengompilasinya atau mengunduh image Docker. Pelajari lebih lanjut di [dokumen](https://chainsafe.github.io/lodestar/) dan [panduan penyiapan](https://hackmd.io/@philknows/rk5cDvKmK) yang lebih komprehensif.

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Menjalankan Nimbus

Nimbus hadir dengan klien konsensus dan eksekusi. Perangkat lunak ini dapat dijalankan pada berbagai perangkat, bahkan dengan daya komputasi yang sangat terbatas.
Setelah [memasang dependensi dan Nimbus itu sendiri](https://nimbus.guide/quick-start.html), Anda dapat menjalankan klien konsensusnya:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Menjalankan Prysm

Prysm dilengkapi dengan skrip yang memungkinkan instalasi otomatis yang mudah. Detailnya dapat ditemukan di [dokumen Prysm](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/).

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### Menjalankan Teku

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

Saat klien konsensus terhubung ke klien eksekusi untuk membaca kontrak deposit dan mengidentifikasi validator, klien juga terhubung ke peer Beacon Node lainnya dan mulai menyinkronkan ruang konsensus sejak genesis. Begitu Beacon Node mencapai epoch saat ini, Beacon API dapat digunakan untuk validator Anda. Pelajari lebih lanjut tentang [API Simpul Beacon](https://eth2docs.vercel.app/).

### Menambahkan Validator {#adding-validators}

Klien konsensus berfungsi sebagai Beacon Node agar validator dapat terhubung. Setiap klien konsensus memiliki perangkat lunak validatornya sendiri yang dijelaskan secara rinci dalam dokumentasi masing-masing.

Menjalankan validator Anda sendiri memungkinkan [penaruhan solo](/staking/solo/), metode yang paling berdampak dan tanpa kepercayaan untuk mendukung jaringan Ethereum. Namun, ini memerlukan setoran sebesar 32 ETH. Untuk menjalankan validator pada simpul Anda sendiri dengan jumlah yang lebih kecil, pool terdesentralisasi dengan operator simpul tanpa izin, seperti [Rocket Pool](https://rocketpool.net/node-operators), mungkin menarik bagi Anda.

Cara termudah untuk memulai dengan penaruhan dan pembuatan kunci validator adalah dengan menggunakan [Launchpad Penaruhan Testnet Hoodi](https://hoodi.launchpad.ethereum.org/), yang memungkinkan Anda untuk menguji pengaturan Anda dengan [menjalankan simpul di Hoodi](https://notes.ethereum.org/@launchpad/hoodi). Saat Anda siap untuk Jaringan Utama, Anda dapat mengulangi langkah-langkah ini menggunakan [Launchpad Penaruhan Jaringan Utama](https://launchpad.ethereum.org/).

Lihat [halaman penaruhan](/staking) untuk ikhtisar tentang opsi penaruhan.

### Menggunakan simpul {#using-the-node}

klien eksekusi menawarkan [titik akhir API RPC](/developers/docs/apis/json-rpc/) yang dapat Anda gunakan untuk mengirimkan transaksi, berinteraksi dengan atau menerapkan kontrak pintar di jaringan Ethereum dengan berbagai cara:

- Memanggilnya secara manual dengan protokol yang sesuai (misalnya, menggunakan `curl`)
- Melampirkan konsol yang disediakan (misalnya, `geth attach`)
- Menerapkannya di aplikasi menggunakan pustaka web3, misalnya, [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Klien berbeda memiliki implementasi berbeda pada titik akhir RPC. Tetapi ada JSON-RPC standar yang dapat Anda gunakan dengan setiap klien. Untuk sebuah ikhtisar [baca dokumen JSON-RPC](/developers/docs/apis/json-rpc/). Aplikasi yang membutuhkan informasi dari jaringan Ethereum dapat menggunakan RPC ini. Misalnya, dompet populer MetaMask memungkinkan Anda [terhubung ke titik akhir RPC Anda sendiri](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) yang memiliki manfaat privasi dan keamanan yang kuat.

Semua klien konsensus mengekspos [Beacon API](https://ethereum.github.io/beacon-APIs) yang dapat digunakan untuk memeriksa status klien konsensus atau mengunduh blok dan data konsensus dengan mengirimkan permintaan menggunakan alat-alat seperti [Curl](https://curl.se). Untuk informasi lebih lengkap, silakan lihat dokumentasi dari tiap konsensus client.

#### Menjangkau RPC {#reaching-rpc}

Port default untuk JSON-RPC klien eksekusi adalah `8545` tetapi Anda dapat mengubah port titik akhir lokal dalam konfigurasi. Secara default, antarmuka RPC hanya dapat dijangkau pada host lokal komputer Anda. Untuk membuatnya dapat diakses dari jarak jauh, Anda mungkin ingin mengeksposnya ke publik dengan mengubah alamat ke `0.0.0.0`. Ini akan membuatnya dapat diakses melalui jaringan lokal maupun alamat IP publik. Dalam kebanyakan kasus, Anda juga akan perlu menyiapkan port yang meneruskan ke router Anda.

Pendekatan membuka port ke internet harus dilakukan dengan hati-hati karena hal ini memungkinkan siapa pun di internet mengendalikan node Anda. Pelaku kejahatan dapat mengakses node Anda untuk menghentikan sistem Anda atau mencuri dana Anda jika Anda menggunakan klien Anda sebagai dompet.

Cara mengatasinya adalah mencegah termodifikasinya metode RPC yang berpotensi berbahaya. Misalnya, dengan Geth, Anda dapat mendeklarasikan metode yang dapat diubah dengan sebuah flag: `--http.api web3,eth,txpool`.

Akses ke antarmuka RPC dapat diperluas melalui pengembangan API lapisan tepi atau aplikasi server web, seperti Nginx, dengan menghubungkannya ke alamat dan port lokal klien Anda. Memanfaatkan lapisan tengah juga memungkinkan pengembang untuk menyiapkan sertifikat guna mengamankan koneksi `https` ke antarmuka RPC.

Menyiapkan server web, proxy, atau API Rest yang dapat diakses publik bukanlah satu-satunya cara untuk memberikan akses ke endpoint RPC dari node Anda. Cara lain yang menjaga privasi untuk menyiapkan titik akhir yang dapat dijangkau publik adalah dengan meng-host simpul di layanan onion [Tor](https://www.torproject.org/) Anda sendiri. Ini akan memungkinkan Anda mencapai RPC di luar jaringan lokal Anda tanpa alamat IP publik yang statis ataupun port yang terbuka. Namun, konfigurasi ini mungkin hanya memungkinkan endpoint RPC diakses melalui jaringan Tor, yang tidak didukung oleh semua aplikasi dan dapat menyebabkan masalah koneksi.

Untuk melakukan ini, Anda harus membuat [layanan onion](https://community.torproject.org/onion-services/) Anda sendiri. Lihat [dokumentasi](https://community.torproject.org/onion-services/setup/) tentang penyiapan layanan onion untuk meng-host milik Anda sendiri. Anda dapat mengarahkannya ke server web dengan proxy ke port RPC atau langsung ke RPC itu sendiri.

Terakhir, dan salah satu cara paling populer untuk memberikan akses ke jaringan internal adalah melalui koneksi VPN. Tergantung pada kasus penggunaan Anda dan jumlah pengguna yang membutuhkan akses ke node Anda, koneksi VPN yang aman bisa menjadi pilihan. [OpenVPN](https://openvpn.net/) adalah VPN SSL berfitur lengkap yang mengimplementasikan ekstensi jaringan aman lapisan 2 atau 3 OSI menggunakan protokol SSL/TLS standar industri, mendukung metode otentikasi klien yang fleksibel berdasarkan sertifikat, kartu pintar, dan/atau kredensial nama pengguna/kata sandi, dan memungkinkan kebijakan kontrol akses khusus pengguna atau grup menggunakan aturan firewall yang diterapkan ke antarmuka virtual VPN.

### Mengoperasikan simpul {#operating-the-node}

Anda harus mengawasi node Anda secara berkala untuk memastikannya berjalan dengan baik. Anda sesekali mungkin perlu melakukan pemeliharaan.

#### Menjaga simpul tetap daring {#keeping-node-online}

Node Anda tidak harus selalu online, tetapi sebaiknya dijaga tetap online sebanyak mungkin agar tetap tersinkronisasi dengan jaringan. Anda dapat mematikannya untuk memulai ulang, tetapi perlu diingat bahwa:

- Mematikan dapat memakan waktu beberapa menit jika state terbaru masih sedang ditulis ke disk.
- Mematikan paksa dapat merusak basis data, sehingga Anda perlu melakukan sinkronisasi ulang seluruh node.
- Klien Anda akan tidak tersinkronisasi dengan jaringan dan akan membutuhkan sinkronisasi ulang ketika Anda memulainya kembali. Meskipun node dapat mulai sinkronisasi dari posisi terakhir saat dimatikan, proses ini bisa memakan waktu tergantung seberapa lama node tersebut offline.

_Ini tidak berlaku pada simpul validator lapisan konsensus._ Membawa simpul Anda luring akan memengaruhi semua layanan yang bergantung padanya. Jika Anda menjalankan simpul untuk tujuan _penaruhan_, Anda harus mencoba meminimalkan waktu henti sebanyak mungkin.

#### Membuat layanan klien {#creating-client-services}

Pertimbangkan untuk membuat sebuah layanan agar klien Anda dapat berjalan otomatis saat sistem dinyalakan. Misalnya, pada server Linux, praktik yang baik adalah membuat layanan, mis., dengan `systemd`, yang mengeksekusi klien dengan konfigurasi yang tepat, di bawah pengguna dengan hak terbatas dan memulai ulang secara otomatis.

#### Memperbarui klien {#updating-clients}

Anda perlu menjaga perangkat lunak klien Anda tetap terbaru dengan patch keamanan, fitur, dan [EIP](/eips/) terbaru. Terutama sebelum [Garpu Keras](/ethereum-forks/), pastikan Anda menjalankan versi klien yang benar.

> Sebelum pembaruan jaringan penting, EF menerbitkan sebuah postingan di [blog](https://blog.ethereum.org)nya. Anda dapat [berlangganan pengumuman ini](https://blog.ethereum.org/category/protocol#subscribe) untuk mendapatkan notifikasi ke email Anda saat simpul Anda memerlukan pembaruan.

Memperbarui klien sangatlah mudah. Setiap klien memiliki petunjuk khusus dalam dokumentasinya, namun secara umum prosesnya hanyalah mengunduh versi terbaru dan memulai ulang klien dengan executable yang baru. Klien seharusnya melanjutkan dari posisi terakhirnya, tetapi dengan pembaruan yang telah diterapkan.

Setiap implementasi klien memiliki version string yang dapat dibaca manusia, digunakan dalam protokol peer-to-peer, dan juga dapat diakses melalui command line. Version string ini memungkinkan pengguna memeriksa apakah mereka menjalankan versi yang benar, dan memungkinkan penjelajah blok serta alat analitik lainnya untuk mengukur distribusi klien tertentu di jaringan. Silakan merujuk ke dokumentasi masing-masing klien untuk informasi lebih lanjut mengenai version string.

#### Menjalankan layanan tambahan {#running-additional-services}

Menjalankan node Anda sendiri memungkinkan Anda menggunakan layanan yang membutuhkan akses langsung ke RPC klien Ethereum. Ini adalah layanan yang dibangun di atas Ethereum seperti [solusi lapisan 2](/developers/docs/scaling/#layer-2-scaling), backend untuk dompet, penjelajah blok, alat pengembang, dan infrastruktur Ethereum lainnya.

#### Memantau simpul {#monitoring-the-node}

Untuk memonitor node Anda dengan benar, pertimbangkan mengoleksi metrik. Klien menyediakan titik akhir metrik sehingga Anda bisa mendapatkan data komprehensif tentang node Anda. Gunakan alat seperti [InfluxDB](https://www.influxdata.com/get-influxdb/) atau [Prometheus](https://prometheus.io/) untuk membuat basis data yang bisa Anda ubah menjadi visualisasi dan bagan dalam perangkat lunak seperti [Grafana](https://grafana.com/). Terdapat banyak pengaturan untuk menggunakan perangkat lunak ini dan dasbor Grafana yang berbeda untuk memvisualisasikan node Anda dan jaringannya secara keseluruhan. Misalnya, lihat [tutorial tentang memantau Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

Sebagai bagian dari pengawasan Anda, pastikan untuk memperhatikan performa mesin Anda. Selama sinkronisasi awal node Anda, perangkat lunak klien mungkin membebani CPU dan RAM. Selain Grafana, Anda dapat menggunakan alat yang ditawarkan OS Anda seperti `htop` atau `uptime` untuk melakukan ini.

## Bacaan lebih lanjut {#further-reading}

- [Panduan Penaruhan Ethereum](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat, sering diperbarui_
- [Panduan | Cara menyiapkan validator untuk penaruhan Ethereum di mainnet](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, sering diperbarui_
- [Panduan ETHStaker tentang menjalankan validator di testnet](https://github.com/remyroy/ethstaker#guides) – _ETHStaker, diperbarui secara berkala_
- [Aplikasi Contoh AWS Blockchain Node Runner untuk Simpul Ethereum](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) - _AWS, sering diperbarui_
- [FAQ Penggabungan untuk operator simpul](https://notes.ethereum.org/@launchpad/node-faq-merge) - _Juli 2022_
- [Menganalisis persyaratan perangkat keras untuk menjadi simpul tervalidasi penuh Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 September 2018_
- [Menjalankan Simpul Penuh Ethereum: Panduan bagi yang Kurang Termotivasi](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 November 2019_
- [Menjalankan Simpul Hyperledger Besu di Mainnet Ethereum: Manfaat, Persyaratan, dan Pengaturan](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Mei 2020_
- [Menyebarkan Klien Nethermind Ethereum dengan Tumpukan Pemantauan](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 Juli 2020_

## Topik terkait {#related-topics}

- [Simpul dan klien](/developers/docs/nodes-and-clients/)
- [Blok](/developers/docs/blocks/)
- [Jaringan](/developers/docs/networks/)
