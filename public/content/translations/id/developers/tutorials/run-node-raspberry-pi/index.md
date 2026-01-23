---
title: Jalankan node Ethereum di Raspberry Pi 4
description: Flash Raspberry Pi 4 Anda, colokkan kabel ethernet, sambungkan disk SSD dan nyalakan perangkat untuk mengubah Raspberry Pi 4 menjadi node Ethereum + validator penuh
author: "EthereumOnArm"
tags:
  [
    "klien",
    "lapisan eksekusi",
    "lapisan konsensus",
    "node"
  ]
lang: id
skill: intermediate
published: 2022-06-10
source: Ethereum di ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm adalah citra Linux khusus yang dapat mengubah Raspberry Pi menjadi node Ethereum.**

Untuk menggunakan Ethereum on Arm untuk mengubah Raspberry Pi menjadi node Ethereum, perangkat keras berikut ini direkomendasikan:

- Papan Raspberry 4 (model B 8GB), Odroid M1 atau Rock 5B (RAM 8GB/16GB)
- Kartu MicroSD (minimum 16 GB Kelas 10)
- Disk USB 3.0 minimum 2 TB SSD atau SSD dengan casing USB ke SATA.
- Catu daya
- Kabel ethernet
- Penerusan port (lihat klien untuk info lebih lanjut)
- Casing dengan heatsink dan kipas
- Keyboard USB, Monitor, dan kabel HDMI (micro-HDMI) (Opsional)

## Mengapa menjalankan Ethereum di ARM? {#why-run-ethereum-on-arm}

Papan ARM adalah komputer yang sangat terjangkau, fleksibel, dan berukuran kecil. Mereka adalah pilihan yang baik untuk menjalankan node Ethereum karena dapat dibeli dengan harga murah, dikonfigurasikan sehingga semua sumber dayanya hanya terfokus pada node tersebut, menjadikannya efisien, mengonsumsi daya yang rendah dan secara fisik berukuran kecil sehingga dapat muat secara diam-diam di rumah mana pun. Juga sangat mudah untuk menjalankan node karena MicroSD Raspberry Pi dapat dengan mudah di-flash dengan gambar yang sudah ada sebelumnya, tanpa perlu mengunduh atau membangun perangkat lunak.

## Bagaimana cara kerjanya? {#how-does-it-work}

Kartu memori Raspberry Pi di-flash dengan gambar yang sudah ada sebelumnya. Gambar ini berisi semua yang dibutuhkan untuk menjalankan node Ethereum. Dengan kartu yang telah di-flash, yang perlu dilakukan pengguna hanyalah menyalakan Raspberry Pi. Semua proses yang diperlukan untuk menjalankan node secara otomatis dimulai. Hal ini bekerja karena kartu memori berisi sistem operasi (OS) berbasis Linux yang di atasnya terdapat proses tingkat sistem yang secara otomatis dijalankan yang mengubah unit tersebut menjadi node Ethereum.

Ethereum tidak dapat dijalankan menggunakan OS Linux Raspberry Pi yang populer "Raspbian" karena Raspbian masih menggunakan arsitektur 32-bit yang membuat pengguna Ethereum mengalami masalah memori dan klien konsensus tidak mendukung biner 32-bit. Untuk mengatasi hal ini, tim Ethereum on Arm bermigrasi ke OS 64-bit asli yang disebut "Armbian".

**Gambar menangani semua langkah penting**, dari menyiapkan lingkungan dan memformat disk SSD hingga menginstal dan menjalankan perangkat lunak Ethereum serta memulai sinkronisasi blockchain.

## Catatan tentang klien eksekusi dan konsensus {#note-on-execution-and-consensus-clients}

Gambar Ethereum on Arm menyertakan klien eksekusi dan klien konsensus prabangun sebagai layanan. Sebuah node Ethereum membutuhkan kedua klien untuk disinkronkan dan berjalan. Anda hanya perlu mengunduh dan mem-flash gambar, kemudian memulai layanan. Gambar sudah dimuat sebelumnya dengan klien eksekusi berikut ini:

- Geth
- Nethermind
- Besu

dan klien konsensus berikut ini:

- Lighthouse
- Nimbus
- Prysm
- Teku

Anda harus memilih salah satu dari masing-masing untuk dijalankan - semua klien eksekusi kompatibel dengan semua klien konsensus. Jika Anda tidak secara eksplisit memilih klien, node akan kembali ke defaultnya - Geth dan Lighthouse - dan menjalankannya secara otomatis ketika board dinyalakan. Anda harus membuka port 30303 pada router Anda agar Geth dapat menemukan dan menyambung ke peer.

## Mengunduh Gambar {#downloading-the-image}

Image Raspberry Pi 4 Ethereum adalah image "plug and play" yang secara otomatis menginstal dan mengatur klien eksekusi dan konsensus, mengonfigurasinya untuk berbicara satu sama lain dan terhubung ke jaringan Ethereum. Yang perlu dilakukan pengguna hanyalah memulai prosesnya dengan menggunakan perintah sederhana.

Unduh gambar Raspberry Pi dari [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) dan verifikasi hash SHA256:

```sh
# Dari direktori yang berisi gambar yang diunduh
shasum -a 256 ethonarm_22.04.00.img.zip
# Hash akan menghasilkan: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Perhatikan bahwa gambar untuk papan Rock 5B dan Odroid M1 tersedia di [halaman unduhan](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) Ethereum-on-Arm.

## Mem-flash MicroSD {#flashing-the-microsd}

Kartu MicroSD yang akan digunakan untuk Raspberry Pi harus terlebih dahulu dimasukkan ke dalam desktop atau laptop agar dapat di-flash. Kemudian, perintah terminal berikut ini akan mem-flash gambar yang diunduh ke dalam kartu SD:

```shell
# periksa nama kartu MicroSD
sudo fdisk -l

>> sdxxx
```

Sangat penting untuk mendapatkan nama yang benar karena perintah berikutnya menyertakan `dd` yang sepenuhnya menghapus konten yang ada di kartu sebelum memasukkan gambar ke dalamnya. Untuk melanjutkan, buka direktori yang berisi gambar yang telah di-zip:

```shell
# unzip dan flash gambar
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Kartu tersebut sekarang telah di-flash, sehingga dapat dimasukkan ke dalam Raspberry Pi.

## Mulai node {#start-the-node}

Dengan kartu SD dimasukkan ke dalam Raspberry Pi, sambungkan kabel ethernet dan SSD, lalu nyalakan daya. OS akan boot dan secara otomatis mulai melakukan tugas-tugas yang telah dikonfigurasi sebelumnya yang mengubah Raspberry Pi menjadi node Ethereum, termasuk menginstal dan membangun perangkat lunak klien. Ini mungkin akan memakan waktu 10-15 menit.

Setelah semuanya terinstal dan terkonfigurasi, masuk ke perangkat melalui koneksi ssh atau menggunakan terminal secara langsung jika monitor dan keyboard terpasang ke papan. Gunakan akun `ethereum` untuk masuk, karena akun ini memiliki izin yang diperlukan untuk memulai node.

```shell
Pengguna: ethereum
Kata Sandi: ethereum
```

Klien eksekusi default, Geth, akan dimulai secara otomatis. Anda dapat mengonfirmasi hal ini dengan memeriksa log menggunakan perintah terminal berikut:

```sh
sudo journalctl -u geth -f
```

Klien konsensus memang perlu dimulai secara eksplisit. Untuk melakukan ini, pertama-tama buka port 9000 pada router Anda agar Lighthouse dapat menemukan dan menyambung ke peer. Kemudian aktifkan dan mulai layanan Lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Periksa klien menggunakan log:

```sh
sudo journalctl -u lighthouse-beacon
```

Perhatikan bahwa klien konsensus akan melakukan sinkronisasi dalam beberapa menit karena menggunakan sinkronisasi checkpoint. Klien eksekusi akan memakan waktu lebih lama - mungkin beberapa jam, dan tidak akan dimulai hingga klien konsensus selesai disinkronkan (ini karena klien eksekusi membutuhkan target untuk disinkronkan, yang disediakan oleh klien konsensus yang telah disinkronkan).

Dengan layanan Geth dan Lighthouse yang berjalan dan tersinkronisasi, Raspberry Pi Anda sekarang menjadi node Ethereum! Cara yang paling umum untuk berinteraksi dengan jaringan Ethereum adalah dengan menggunakan konsol Javascript Geth, yang dapat dilampirkan ke klien Geth pada port 8545. Anda juga dapat mengirimkan perintah yang diformat sebagai objek JSON menggunakan alat bantu permintaan seperti Curl. Lihat selengkapnya di [dokumentasi Geth](https://geth.ethereum.org/).

Geth telah dikonfigurasikan sebelumnya untuk melaporkan metrik ke dasbor Grafana yang dapat dilihat di browser. Pengguna tingkat lanjut mungkin ingin menggunakan fitur ini untuk memantau kesehatan node mereka dengan menavigasi ke `ipaddress:3000`, dengan memasukkan `user: admin` dan `passwd: ethereum`.

## Validator {#validators}

Validator juga dapat ditambahkan secara opsional ke klien konsensus. Perangkat lunak validator memungkinkan node Anda untuk berpartisipasi secara aktif dalam konsensus dan memberikan keamanan ekonomi kripto pada jaringan. Anda akan mendapatkan imbalan untuk pekerjaan ini dalam ETH. Untuk menjalankan validator, Anda harus terlebih dahulu memiliki 32 ETH, yang harus disetorkan ke dalam kontrak setoran. Setoran dapat dilakukan dengan mengikuti panduan langkah demi langkah di [Launchpad](https://launchpad.ethereum.org/). Lakukan ini di desktop/laptop, tetapi jangan buat kunci - ini dapat dilakukan langsung di Raspberry Pi.

Buka terminal pada Raspberry Pi dan jalankan perintah berikut untuk menghasilkan kunci deposit:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Atau unduh [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) untuk dijalankan pada mesin air-gapped, dan jalankan perintah `deposit new-mnemnonic`)

Jaga agar frasa mnemonik tetap aman! Perintah di atas menghasilkan dua file di keystore node: kunci validator dan file data deposit. Data deposit perlu diunggah ke Launchpad, jadi data tersebut harus disalin dari Raspberry Pi ke desktop/laptop. Hal ini dapat dilakukan dengan menggunakan koneksi ssh atau metode salin/tempel lainnya.

Setelah file data deposit tersedia di komputer yang menjalankan Launchpad, file tersebut dapat diseret dan diletakkan ke `+` di layar Launchpad. Ikuti instruksi di layar untuk mengirim transaksi ke kontrak deposit.

Kembali ke Raspberry Pi, validator dapat dimulai. Hal ini memerlukan pengimporan kunci validator, pengaturan alamat untuk mengumpulkan imbalan, dan kemudian memulai proses validator yang telah dikonfigurasikan sebelumnya. Contoh di bawah ini adalah untuk Lighthouse—instruksi untuk klien konsensus lain tersedia di [dokumen Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# impor kunci validator
lighthouse account validator import --directory=/home/ethereum/validator_keys

# atur alamat imbalan
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# mulai validator
sudo systemctl start lighthouse-validator
```

Selamat, sekarang Anda memiliki node Ethereum lengkap dan validator yang berjalan pada Raspberry Pi!

## Detail selengkapnya {#more-details}

Halaman ini memberikan gambaran umum tentang cara menyiapkan node Geth-Lighthouse dan validator menggunakan Raspberry Pi. Instruksi yang lebih detail tersedia di [situs web Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Umpan balik sangat dihargai {#feedback-appreciated}

Kita tahu bahwa Raspberry Pi memiliki basis pengguna yang sangat besar yang dapat memberikan dampak yang sangat positif terhadap kesehatan jaringan Ethereum.
Silakan gali detail dalam tutorial ini, coba jalankan di testnet, lihat Ethereum di Arm GitHub, berikan umpan balik, ajukan masalah dan pull request, dan bantu memajukan teknologi dan dokumentasi!

## Referensi {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
