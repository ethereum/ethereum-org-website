---
title: Jalankan node Ethereum Anda sendiri
description: Pengenalan umum untuk menjalankan instance klien Ethereum Anda sendiri.
lang: id
sidebarDepth: 2
---

Menjalankan node Anda sendiri memberi Anda beragam manfaat, membuka peluang baru, dan membantu mendukung ekosistem. Halaman ini akan memandu Anda menjalankan node Anda sendiri dan mengambil bagian dalam memvalidasi transaksi Ethereum.

## Prasyarat {#prerequisites}

Anda harus mengerti apa yang dimaksud node Ethereum dan kenapa Anda ingin menjalankan kliennya. Ini dibahas di [Node dan klien](/developers/docs/nodes-and-clients/).

If you're new to the topic of running a node, or looking for a less technical path, we recommend first checking out our user-friendly introduction on [running an Ethereum node](/run-a-node).

## Memilih pendekatan {#choosing-approach}

Langkah pertama dalam menjalankan node Anda adalah memilih pendekatan Anda. Anda harus memilih klien (perangkat lunaknya), lingkungan, dan parameter yang Anda inginkan untuk memulai. Lihat semua [klien Jaringan Utama](/developers/docs/nodes-and-clients/#advantages-of-different-implementations) yang tersedia.

#### Pengaturan klien {#client-settings}

Implementasi klien memungkinkan mode sinkronisasi yang berbeda dan beragam opsi lainnya. [Mode sinkronisasi](/developers/docs/nodes-and-clients/#sync-modes) mewakili metode pengunduhan dan pengesahan data rantai blok yang berbeda. Sebelum memulai node, Anda harus memutuskan jaringan dan mode sinkronisasi apa yang akan digunakan. Yang paling penting untuk dipertimbangkan adalah ruang disk dan waktu sinkronisasi yang dibutuhkan klien.

Semua fitur dan opsi dapat ditemukan di dokumentasi klien. Beragam konfigurasi klien dapat diatur dengan mengeksekusi klien dengan bendera yang sesuai. Anda bisa mendapat informasi lebih lanjut mengenai bendera dari [EthHub](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/#client-settings) atau dokumentasi klien. Untuk kebutuhan pengujian, Anda mungkin memilih menjalankan klien pada salah satu jaringan testnet. [Lihat ringkasan jaringan yang didukung](/developers/docs/nodes-and-clients/#execution-clients).

### Lingkungan dan perangkat keras {#environment-and-hardware}

#### Lokal atau cloud {#local-vs-cloud}

Klien Ethereum dapat dijalankan pada komputer kelas konsumen dan tidak membutuhkan perangkat keras khusus, contohnya seperti dalam penambangan. Oleh karena itu, Anda memiliki beragam opsi untuk menyebarkan berdasarkan kebutuhan Anda. Untuk menyederhanakannya, mari pikirkan tentang menjalankan node di mesin fisik lokal dan server cloud:

- Cloud
  - Penyedia menawarkan waktu aktif server yang tinggi, alamat IP publik yang statis
  - Mendapatkan server terdedikasi atau virtual dapat memberi kenyamanan lebih dari pada membangunnya sendiri
  - Sebagai gantinya mempercayai penyedia server pihak ketiga
  - Karena ukuran penyimpanan untuk node penuh dibutuhkan, harga server yang disewakan mungkin menjadi tinggi
- Perangkat keras milik sendiri
  - Pendekatan yang lebih tepercaya dan bebas
  - Investasi satu kali
  - Opsi untuk membeli mesin yang sudah dikonfigurasi
  - Anda harus secara fisik menyiapkan, memelihara, dan berpotensi melakukan pencarian masalah pada mesin

Kedua opsi tersebut memiliki kelebihan berbeda yang diringkas seperti di atas. Jika Anda mencari solusi cloud, sebagai tambahan dari banyak penyedia komputasi cloud tradisional, terdapat pula layanan yang berfokus pada menyebarkan node. Sebagai contoh:

- [QuikNode](https://www.quiknode.io/)
- [Blockdaemon](https://blockdaemon.com)
- [LunaNode](https://www.lunanode.com/)
- [Alchemy](https://www.alchemy.com/)

#### Perangkat keras {#hardware}

Namun, jaringan terdesentralisasi yang tahan sensor seharusnya tidak bergantung pada penyedia cloud. Lebih sehat bagi ekosistem jika Anda menjalankan node Anda sendiri pada perangkat keras. Opsi termudahnya adalah mesin yang sudah dikonfigurasi seperti:

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

Periksa [persyaratan ruang disk untuk setiap klien dan mode sinkronisasi](/developers/docs/nodes-and-clients/#requirements) minimum dan yang direkomendasikan. Secara umum, kekuatan komputasi sederhana seharusnya sudah cukup. Masalahnya biasanya pada kecepatan drive. Selama inisiasi sinkronisasi, klien Ethereum melakukan banyak operasi baca/tulis. Oleh karena itu, SSD sangat direkomendasikan. Klien bahkan mungkin [tidak dapat menyinkronkan state terkini pada HDD](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278) dan tersangkut beberapa blok di belakang Jaringan Utama. Anda dapat menjalankan sebagian besar klien di sebuah [komputer papan tunggal dengan ARM](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/). Anda juga dapat menggunakan sistem operasi [Ethbian](https://ethbian.org/index.html) untuk Raspberry Pi 4. This lets you [run a client by flashing the SD card](/developers/tutorials/run-node-raspberry-pi/). Berdasarkan pilihan perangkat lunak dan keras Anda, persyaratan waktu sinkronisasi dan penyimpanan awal mungkin beragam. Pastikan untuk [memeriksa persyaratan waktu sinkronisasi dan penyimpanan](/developers/docs/nodes-and-clients/#recommended-specifications). Juga pastikan koneksi internet Anda tidak dibatasi oleh [batas bandwidth](https://wikipedia.org/wiki/Data_cap). Disarankan untuk menggunakan koneksi tidak terbatas karena sinkronisasi dan data awal yang disiarkan ke jaringan dapat melebihi batas Anda.

#### Sistem operasi {#operating-system}

Semua klien mendukung sistem operasi utama - Linux, MacOS, Windows. Ini berarti Anda dapat menjalankan node pada desktop reguler atau mesin server dengan sistem operasi (OS) yang paling sesuai dengan kebutuhan Anda. Pastikan OS Anda merupakan versi terkini untuk menghindari masalah dan kerentanan keamanan potensial.

## Menjalankan node {#spinning-up-node}

### Mendapatkan perangkat lunak klien {#getting-the-client}

Pertama, unduh [perangkat lunak klien](/developers/docs/nodes-and-clients/#execution-clients) yang Anda inginkan

Anda cukup mengunduh aplikasi yang dapat dieksekusi atau paket instalasi yang sesuai dengan sistem dan arsitektur operasi Anda. Selalu verifikasi tanda tangan dan checksum dari paket yang diunduh. Beberapa klien juga menawarkan repositori untuk instalasi dan pembaruan yang lebih mudah. Jika Anda mau, Anda dapat membangun dari sumber. Semua klien adalah sumber terbuka sehingga Anda dapat membangun mereka dari kode sumber dengan pengkompilasi yang sesuai.

Biner yang dapat dieksekusi untuk implementasi klien Jaringan Utama stabil dapat diunduh dari halaman rilisnya:

- [Geth](https://geth.ethereum.org/downloads/)
- [OpenEthereum,](https://github.com/openethereum/openethereum/releases)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://besu.hyperledger.org/en/stable/)
- [Erigon](https://github.com/ledgerwatch/erigon)

**Perhatikan bahwa OpenEthereum [telah menjadi usang](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) dan tidak lagi dipertahankan.** Gunakan dengan hati-hati dan lebih baik beralih ke implementasi klien lainnya.

### Memulai klien {#starting-the-client}

Sebelum memulai perangkat lunak klien Ethereum, lakukan pemeriksaan terakhir bahwa lingkungan Anda telah siap. Sebagai contoh, pastikan:

- Ada ruang disk yang cukup jika dilihat dari jaringan dan mode sikronisasi yang dipilih.
- Memori dan CPU tidak terhambat oleh program lainnya.
- Sistem operasi diperbarui ke versi terkini.
- Sistem memiliki waktu dan tanggal yang tepat.
- Router dan firewall Anda menerima koneksi pada port pendengar. Secara default, klien Ethereum menggunakan port pendengar (TCP) dan port penemuan (UDP), keduanya pada 30303 secara default.

Jalankan klien Anda pada testnet terlebih dahulu untuk menolong memastikan semuanya bekerja dengan benar. [Menjalankan node ringan Geth](/developers/tutorials/run-light-node-geth/) seharusnya membantu. Anda perlu mendeklarasikan pengaturan klien mana pun yang bukan default pada awalnya. Anda dapat menggunakan bendera atau berkas konfigurasi untuk mendeklarasikan konfigurasi yang diinginkan. Lihat dokumentasi klien Anda untuk eksekusi Klien khusus yang akan memulai fungsi inti, titik akhir terpilihnya, dan mulai mencari peer. Setelah berhasil menemukan peer, klien memulai sinkronisasi. Data rantai blok saat ini akan tersedia setelah klien berhasil disinkronisasikan dengan state saat ini.

### Menggunakan klien {#using-the-client}

Klien menawarkan titik akhir API RPC yang dapat Anda gunakan untuk mengontrol klien dan berinteraksi dengan jaringan Ethereum dalam berbagai cara:

- Secara manual memanggil mereka dengan protokol yang sesuai (contohnya menggunakan `curl`)
- Melekatkan konsol yang disediakan (misalnya `geth attach`)
- Mengimplementasikan mereka dalam aplikasi

Klien berbeda memiliki implementasi berbeda pada titik akhir RPC. Tetapi ada JSON-RPC standar yang dapat Anda gunakan dengan setiap klien. Untuk ringkasannya, [baca dokumen JSON-RPC](https://eth.wiki/json-rpc/API). Aplikasi yang membutuhkan informasi dari jaringan Ethereum dapat menggunakan RPC ini. Sebagai contoh, dompet populer MetaMask memungkinkan Anda [menjalankan instance rantai blok lokal dan terhubung dengannya](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node).

#### Menjangkau RPC {#reaching-rpc}

Port default JSON-RPC adalah `8545` tetapi Anda dapat memodifikasi port titik akhir lokalnya dalam berkas konfigurasi. Secara default, antarmuka RPC hanya dapat dijangkau pada host lokal komputer Anda. Untuk membuatnya dapat diakses dari jarak jauh, Anda mungkin ingin mengeksposnya ke publik dengan mengubah alamatnya ke `0.0.0.0`. Ini akan membuatnya dapat dijangkau melalui alamat IP lokal dan publik. Dalam kebanyakan kasus, Anda juga akan perlu menyiapkan port yang meneruskan ke router Anda.

Anda harus melakukan ini dengan hati-hati karena ini akan memungkinkan siapa pun di internet mengontrol node Anda. Pelaku kejahatan dapat mengakses node Anda untuk menghentikan sistem Anda atau mencuri dana Anda jika Anda menggunakan klien Anda sebagai dompet.

Cara mengatasinya adalah mencegah termodifikasinya metode RPC yang berpotensi berbahaya. Sebagai contoh, dengan `geth`, Anda dapat mendeklarasikan metode yang dapat dimodifikasi dengan bendera: `--http.api web3,eth,txpool`.

Anda juga dapat menghost akses ke antarmuka RPC Anda dengan menunjukkan layanan server web, seperti Nginx, ke alamat dan port lokal klien Anda.

Cara paling sederhana dan paling menjaga privasi adalah mengatur titik akhir yang dapat dicapai publik, Anda dapat melakukan host di layanan onion [Tor](https://www.torproject.org/) Anda sendiri. Ini akan memungkinkan Anda mencapai RPC di luar jaringan lokal Anda tanpa alamat IP publik yang statis ataupun port yang terbuka. Untuk melakukannya:

- Instal `tor`
- Edit konfigurasi `torrc` untuk mengaktifkan layanan tersembunyi dengan alamat dan port RPC klien Anda
- Mulai ulang layanan `tor`

Setelah Anda memulai ulang Tor, Anda akan mendapat kunci layanan tersembunyi dan sebuah nama host di direktori yang Anda inginkan. Dari situ, RPC Anda dapat dicapai dalam nama host `.onion`.

### Mengoperasikan node {#operating-the-node}

Anda harus mengawasi node Anda secara berkala untuk memastikannya berjalan dengan baik. Anda sesekali mungkin perlu melakukan pemeliharaan.

#### Menjaga node tetap daring {#keeping-node-online}

Node Anda tidak harus daring tanpa henti tetapi Anda harus menjaganya daring sebisa mungkin untuk membuatnya tetap tersinkronisasi dengan jaringan. Anda dapat mematikannya untuk memulai ulang tetapi ingatlah bahwa:

- Mematikan dapat memakan waktu beberapa menit jika state terkininya masih ditulis dalam diska.
- Mematikan secara paksa dapat merusak basis data.
- Klien Anda akan tidak tersinkronisasi dengan jaringan dan akan membutuhkan sinkronisasi ulang ketika Anda memulainya kembali.

_Ini tidak berlaku pada node validator lapisan konsensus._ Menjadikan node Anda luring akan berdampak pada semua layanan yang bergantung padanya. Jika Anda menjalankan node untuk tujuan _penaruhan_ Anda seharusnya mencoba meminimalisasi waktu henti sebisa mungkin.

#### Membuat layanan klien {#creating-client-service}

Pertimbangkan membuat layanan untuk menjalankan klien Anda secara otomatis saat memulai. Sebagai contoh pada server Linux, praktik yang baiknya adalah membuat layanan yang mengeksekusi klien dengan konfigurasi yang sesuai, di bawah pengguna dengan hak istimewa yang terbatas dan memulai ulang secara otomatis.

#### Memperbarui klien {#updating-client}

Anda perlu menjaga perangkat lunak klien Anda dalam versi terkini dengan patch keamanan, fitur-fitur, dan [EIPs](/eips/) terbaru. Terutama sebelum [fork keras](/history/), pastikan Anda menjalankan versi klien yang benar.

#### Menjalankan layanan tambahan {#running-additional-services}

Menjalankan node Anda sendiri memungkinkan Anda menggunakan layanan yang membutuhkan akses langsung ke RPC klien Ethereum. Layanan ini dibangun di atas Ethereum seperti [solusi lapisan 2](/developers/docs/scaling/#layer-2-scaling), [klien konsensus](/upgrades/get-involved/#clients), dan infrastruktur Ethereum lainnya.

#### Memonitor node {#monitoring-the-node}

"Untuk memonitor node Anda dengan benar, pertimbangkan mengoleksi metrik. Klien menyediakan titik akhir metrik sehingga Anda bisa mendapatkan data komprehensif tentang node Anda. Gunakan perangkat seperti [InfluxDB](https://www.influxdata.com/get-influxdb/) atau [Prometheus](https://prometheus.io/) untuk membuat basis data yang dapat Anda ubah menjadi visualisasi dan bagan pada perangkat lunak seperti [Grafana](https://grafana.com/). Terdapat banyak pengaturan untuk menggunakan perangkat lunak ini dan dasbor Grafana yang berbeda untuk memvisualisasikan node Anda dan jaringannya secara keseluruhan. Sebagai bagian dari pengawasan Anda, pastikan untuk memperhatikan performa mesin Anda. Selama sinkronisasi awal node Anda, perangkat lunak klien mungkin membebani CPU dan RAM. Sebagai tambahan pada Grafana, Anda dapat menggunakan perangkat yang ditawarkan OS Anda seperti `htop` atau `uptime` untuk melakukannya.

## Bacaan lebih lanjut {#further-reading}

- [Menganalisis persayaratan perangkat keras untuk menjadi node tervalidasi penuh Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 September 2018_
- [Menjalankan Node Penuh Ethereum: Satu Panduan untuk Anda yang Sedikit Termotivasi](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 November 2019_
- [Menjalankan Node Ethereum](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, sering diperbarui_
- [Menjalankan Node Hyperledger Besu pada Jaringan Utama Ethereum: Manfaat, Persyaratan, dan Persiapannya](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Mei 2020_
- [Menyebarkan Klien Nethermind Ethereum dengan Memonitor Stack](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 Juli 2020_

## Topik terkait {#related-topics}

- [Node dan klien](/developers/docs/nodes-and-clients/)
- [Blok](/developers/docs/blocks/)
- [Jaringan](/developers/docs/networks/)
