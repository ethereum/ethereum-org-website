---
title: Menjalankan node Ethereum di Raspberry Pi 5
description: Flash Raspberry Pi 5 Anda, colokkan kabel ethernet, sambungkan disk NVMe, dan nyalakan perangkat untuk mengubah Raspberry Pi 5 menjadi node Ethereum penuh + validator
author: "EthereumOnArm"
tags: ["klien", "lapisan eksekusi", "lapisan konsensus", "node"]
lang: id
skill: intermediate
breadcrumb: Node Rasp Pi
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm adalah citra Linux kustom yang dapat mengubah Raspberry Pi menjadi node Ethereum.**

Untuk menggunakan Ethereum on Arm guna mengubah Raspberry Pi menjadi node Ethereum, perangkat keras berikut direkomendasikan:

- Raspberry Pi 5 dengan RAM 16 GB
- NVMe HAT untuk Raspberry Pi 5, untuk menyambungkan disk NVMe
- SSD NVMe (M.2 2280), minimum 4 TB. Hindari disk dengan pengontrol Phison, yang diketahui memiliki masalah kompatibilitas.
- Kartu MicroSD (minimum 16 GB Kelas 10)
- Catu daya
- Kabel ethernet
- Penerusan port (lihat klien untuk info lebih lanjut)
- Casing dengan heatsink
- Keyboard USB, Monitor, dan kabel HDMI (micro-HDMI) (Opsional)

Ethereum on Arm juga mendukung papan ARM lainnya, seperti NanoPC T6, Rock 5B, dan Orange Pi 5 Plus. Papan-papan ini memiliki dukungan NVMe bawaan, sehingga tim Ethereum on Arm merekomendasikannya dibandingkan Raspberry Pi 5 jika Anda membeli perangkat keras baru. Lihat [daftar perangkat keras yang direkomendasikan](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html) untuk detailnya. Sisa tutorial ini sama untuk semua papan yang didukung, kecuali untuk file citra yang Anda unduh.

## Mengapa menjalankan Ethereum di ARM? {#why-run-ethereum-on-arm}

Papan ARM adalah komputer kecil yang sangat terjangkau dan fleksibel. Papan ini adalah pilihan yang baik untuk menjalankan node Ethereum karena dapat dibeli dengan harga murah, dikonfigurasi sehingga semua sumber dayanya hanya berfokus pada node, menjadikannya efisien, mengonsumsi daya yang rendah, dan secara fisik kecil sehingga dapat ditempatkan tanpa mengganggu di rumah mana pun. Sangat mudah juga untuk menjalankan node karena MicroSD Raspberry Pi cukup di-flash dengan citra (image) yang sudah dibuat sebelumnya, tanpa perlu mengunduh atau membangun perangkat lunak.

## Bagaimana cara kerjanya? {#how-does-it-work}

Kartu memori Raspberry Pi di-flash dengan citra yang sudah dibuat sebelumnya. Citra ini berisi semua yang dibutuhkan untuk menjalankan node Ethereum. Dengan kartu yang sudah di-flash, pengguna hanya perlu menyalakan Raspberry Pi. Semua proses yang diperlukan untuk menjalankan node akan dimulai secara otomatis. Hal ini berfungsi karena kartu memori berisi sistem operasi (OS) berbasis Linux yang di atasnya proses tingkat sistem dijalankan secara otomatis untuk mengubah unit tersebut menjadi node Ethereum.

Citra Ethereum on Arm didasarkan pada distribusi Linux 64-bit yang dioptimalkan untuk menjalankan node Ethereum, dan menyertakan klien Ethereum yang sudah dibuat sebelumnya.

**Citra menangani semua langkah yang diperlukan**, mulai dari menyiapkan lingkungan dan memformat disk NVMe hingga menginstal perangkat lunak Ethereum.

## Catatan tentang klien eksekusi dan konsensus {#note-on-execution-and-consensus-clients}

Citra Ethereum on Arm menyertakan klien eksekusi dan klien konsensus yang sudah dibuat sebelumnya sebagai layanan. Node Ethereum mengharuskan kedua klien disinkronisasi dan berjalan. Anda hanya perlu mengunduh dan mem-flash citra lalu memulai layanannya. Citra ini sudah dimuat sebelumnya dengan beberapa klien eksekusi (seperti Geth, Nethermind, Besu, Erigon, dan Reth) dan klien konsensus (seperti Lighthouse, Prysm, Teku, Nimbus, dan Lodestar). Lihat [dokumentasi Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html) untuk daftar saat ini.

Anda harus memilih masing-masing satu untuk dijalankan - semua klien eksekusi kompatibel dengan semua klien konsensus. Tutorial ini menggunakan Geth dan Lighthouse.

## Mengunduh Citra {#downloading-the-image}

Citra Ethereum on Arm adalah citra "plug and play" yang secara otomatis menginstal dan menyiapkan klien eksekusi dan klien konsensus, mengonfigurasinya untuk saling berkomunikasi dan terhubung ke jaringan Ethereum. Pengguna hanya perlu memulai prosesnya menggunakan perintah sederhana.

Unduh citra terbaru untuk papan Anda dari [halaman unduhan Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads). Halaman unduhan juga mencantumkan checksum SHA256 dari setiap citra. Verifikasi file yang diunduh terhadapnya:

```sh
# Dari direktori yang berisi image yang diunduh
sha256sum ethonarm_rpi5_<version>.img.zip
# Bandingkan output dengan checksum di halaman unduhan
```

## Mem-flash MicroSD {#flashing-the-microsd}

Kartu MicroSD yang akan digunakan untuk Raspberry Pi harus dimasukkan terlebih dahulu ke desktop atau laptop agar dapat di-flash. Kemudian, perintah terminal berikut akan mem-flash citra yang diunduh ke kartu SD:

```shell
# periksa nama kartu MicroSD
sudo fdisk -l

>> sdxxx
```

Sangat penting untuk memasukkan nama yang benar karena perintah berikutnya menyertakan `dd` yang sepenuhnya menghapus konten yang ada di kartu sebelum memasukkan citra ke dalamnya. Untuk melanjutkan, navigasikan ke direktori yang berisi citra yang di-zip:

```shell
# ekstrak dan flash image
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Kartu sekarang sudah di-flash, sehingga dapat dimasukkan ke Raspberry Pi.

## Memulai node {#start-the-node}

Dengan kartu SD dimasukkan ke Raspberry Pi, sambungkan kabel ethernet dan disk NVMe lalu nyalakan daya. OS akan melakukan booting dan secara otomatis mulai menjalankan tugas yang telah dikonfigurasi sebelumnya yang mengubah Raspberry Pi menjadi node Ethereum, termasuk memformat disk NVMe dan menginstal perangkat lunak klien. Ini mungkin akan memakan waktu 10-15 menit, dan papan akan melakukan reboot secara otomatis setelah selesai. Jangan putuskan catu daya selama waktu ini.

Setelah semuanya diinstal dan dikonfigurasi, masuk ke perangkat melalui koneksi ssh atau menggunakan terminal secara langsung jika monitor dan keyboard terpasang ke papan. Gunakan akun `ethereum` untuk masuk, karena akun ini memiliki izin yang diperlukan untuk memulai node.

```shell
User: ethereum
Password: ethereum
```

Anda akan diminta untuk mengubah kata sandi default pada saat pertama kali masuk. Lakukanlah, karena siapa pun yang dapat menjangkau node Anda dapat masuk dengan kata sandi default. Firewall sistem dinonaktifkan secara default, jadi jika node Anda memiliki alamat IP publik, lihat [panduan keamanan Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html) untuk mengaktifkannya.

Mulai klien konsensus terlebih dahulu. Buka port 9000 (TCP dan UDP) di router Anda agar Lighthouse dapat menemukan dan terhubung ke rekan (peer). Kemudian aktifkan dan mulai layanan lighthouse, sehingga layanan ini juga dimulai ulang setelah reboot:

```sh
sudo systemctl enable --now lighthouse-beacon
```

Periksa klien menggunakan Log:

```sh
sudo journalctl -u lighthouse-beacon -f
```

Selanjutnya, mulai klien eksekusi. Buka port 30303 (TCP dan UDP) di router Anda agar Geth dapat menemukan dan terhubung ke rekan. Kemudian aktifkan dan mulai layanan geth:

```sh
sudo systemctl enable --now geth
```

Anda dapat mengonfirmasi bahwa layanan ini berjalan dengan memeriksa Log:

```sh
sudo journalctl -u geth -f
```

Perhatikan bahwa klien konsensus akan melakukan sinkronisasi dalam beberapa menit karena menggunakan sinkronisasi titik periksa (checkpoint sync). Klien eksekusi akan memakan waktu lebih lama - berpotensi beberapa jam. Kedua klien berjalan pada saat yang sama: klien konsensus memberi tahu klien eksekusi blok mana yang merupakan kepala rantai, dan klien eksekusi mengunduh serta memverifikasi blok hingga blok tersebut.

Dengan layanan Geth dan Lighthouse yang berjalan dan disinkronisasi, Raspberry Pi Anda sekarang menjadi node Ethereum! Cara paling umum untuk berinteraksi dengan jaringan Ethereum adalah menggunakan konsol JavaScript Geth, yang dapat dilampirkan ke klien Geth di port 8545. Anda juga dapat mengirimkan perintah yang diformat sebagai objek JSON menggunakan alat permintaan seperti Curl. Lihat selengkapnya di [dokumentasi Geth](https://geth.ethereum.org/).

Citra ini juga menyertakan dasbor Grafana yang dapat digunakan oleh pengguna tingkat lanjut untuk memantau kesehatan node mereka, dengan menavigasi ke `ipaddress:3000` di browser.

## Validator {#validators}

Validator juga dapat ditambahkan secara opsional ke klien konsensus. Perangkat lunak validator memungkinkan node Anda untuk berpartisipasi aktif dalam konsensus dan memberikan keamanan kriptoekonomi pada jaringan. Anda mendapatkan imbalan atas pekerjaan ini dalam bentuk ETH. Untuk menjalankan validator, Anda harus memiliki 32 ETH terlebih dahulu, yang harus disetorkan ke dalam kontrak deposit. Deposit dapat dilakukan dengan mengikuti panduan langkah demi langkah di [Launchpad](https://launchpad.ethereum.org/). Lakukan ini di desktop/laptop, tetapi jangan buat kunci — ini dapat dilakukan langsung di Raspberry Pi.

Alat [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) menghasilkan kunci validator. Citra saat ini menyertakannya; jika Anda menjalankan citra yang lebih lama, instal terlebih dahulu. Kemudian buat kunci deposit, ganti `<YOUR_ETH_ADDRESS>` dengan alamat yang seharusnya menerima penarikan Anda:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(Atau unduh [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) untuk dijalankan di mesin yang terisolasi (airgapped), dan jalankan perintah `deposit new-mnemonic` di sana)

Simpan frasa mnemonik dengan aman! Perintah di atas menghasilkan dua file di direktori `validator_keys`: kunci validator dan file data deposit. Data deposit perlu diunggah ke launchpad, sehingga harus disalin dari Raspberry Pi ke desktop/laptop. Ini dapat dilakukan menggunakan koneksi ssh atau metode salin/tempel lainnya.

Setelah file data deposit tersedia di komputer yang menjalankan launchpad, file tersebut dapat diseret dan dilepaskan ke `+` di layar launchpad. Ikuti instruksi di layar untuk mengirim transaksi ke kontrak deposit.

Kembali ke Raspberry Pi, validator dapat dimulai. Ini memerlukan pengimporan kunci validator, pengaturan alamat untuk mengumpulkan imbalan, dan kemudian memulai proses validator yang telah dikonfigurasi sebelumnya. Contoh di bawah ini adalah untuk Lighthouse—instruksi untuk klien konsensus lainnya tersedia di [dokumen Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html):

```shell
# impor kunci validator (Software entity (node) that validates blocks in proof-of-stake. Sometimes refers to the human operator. NOT the same as 'miner' (PoW).)
lighthouse account validator import --directory=/home/ethereum/validator_keys

# atur alamat (A unique hexadecimal identifier (0x...) for an Ethereum account. NOT a physical location.) hadiah (ganti <YOUR_ETH_ADDRESS> dengan alamat (A unique hexadecimal identifier (0x...) for an Ethereum account. NOT a physical location.) Anda)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# mulai validator (Software entity (node) that validates blocks in proof-of-stake. Sometimes refers to the human operator. NOT the same as 'miner' (PoW).)
sudo systemctl enable --now lighthouse-validator
```

Selamat, Anda sekarang memiliki node Ethereum penuh dan validator yang berjalan di Raspberry Pi!

## Detail lebih lanjut {#more-details}

Halaman ini memberikan gambaran umum tentang cara menyiapkan node Geth-Lighthouse dan validator menggunakan Raspberry Pi. Instruksi yang lebih mendetail tersedia di [situs web Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Umpan balik sangat dihargai {#feedback-appreciated}

Kami tahu Raspberry Pi memiliki basis pengguna yang sangat besar yang dapat memberikan dampak yang sangat positif pada kesehatan jaringan Ethereum.
Silakan pelajari detail dalam tutorial ini, coba jalankan di testnet, periksa [GitHub Ethereum on Arm](https://github.com/EOA-Blockchain-Labs/ethereumonarm), berikan umpan balik, ajukan masalah (issue) dan pull request, serta bantu memajukan teknologi dan dokumentasi!

## Referensi {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
