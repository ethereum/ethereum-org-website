---
title: Cara mengubah Raspberry Pi 4 Anda menjadi node hanya dengan mem-flash memori MicroSD
description: Nyalakan Raspberry Pi 4 Anda, sambungkan pada kabel ethernet, koneksikan ke diska SSD dan nyalakan perangkat untuk mengubah Raspberry Pi 4 menjadi simpul Ethereum utuh yang menjalankan lapisan eksekusi, atau lapisan konsensus (Rantai Suar / validator)
author: "EthereumOnArm"
tags:
  - "klien"
  - "lapisan eksekusi"
  - "lapisan konsensus"
  - "node"
lang: id
skill: intermediate
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**TL;DR**: Nyalakan Raspberry Pi 4 Anda, sambungkan pada kabel ethernet, koneksikan ke diska SSD dan nyalakan perangkat untuk mengubah Raspberry Pi 4 menjadi simpul Ethereum utuh yang menjalankan lapisan eksekusi, atau lapisan konsensus (Rantai Suar / validator)

[Pelajari tentang peningkatan Ethereum](/roadmap/)

Mari mulai dengan latar belakang dulu. Seperti yang Anda ketahui, kami telah mengalami beberapa masalah memori [[1]](/developers/tutorials/run-node-raspberry-pi/#references) dengan gambar Raspberry Pi 4 karena OS Raspbian masih 32bit [[2]](/developers/tutorials/run-node-raspberry-pi/#references) (setidaknya pada userland). Sementara kami lebih suka memakai OS yang resmi, kami sampai pada kesimpulan bahwa, untuk menyelesaikan masalah ini, kami perlu beralih ke OS 64bit asli

Disamping itu, klien konsensus tidak mendukung binari 32 bit sehingga menggunakan Raspbian akan memberi pengecualian pada Raspberry Pi 4 untuk menjalankan simpul lapisan konsensus (dan kemungkinan untuk melakukan penaruhan).

Jadi, setelah beberapa kali pengujian kini kami merilis dua gambar berbeda berdasarkan Ubuntu 20.04 64bit [[3]](/developers/tutorials/run-node-raspberry-pi/#references): edisi lapisan eksekusi dan lapisan konsensus.

Pada dasarnya, keduanya adalah gambar yang sama dan memasukkan fitur gambar berbasis Raspbian yang sama. Tetapi kedua lapisan itu dipasang untuk menjalankan perangkat lunak lapisan eksekusi atau lapisan konsensus secara bawaan.

**Gambar menangani semua langkah penting**, dari menyiapkan lingkungan dan memformat cakram SSD sampai menginstal dan menjalankan perangkat lunak Ethereum maupun memulai sinkronisasi blockchain.

## Fitur utama {#main-features}

- Berbasis Ubuntu 20.04. 64bit
- Membuat partisi dan memformat disk USB secara otomatis
- Menambahkan memori pertukaran (modul kernel ZRAM + satu file pertukaran) berbasis kinerja Armbian [[7]](/developers/tutorials/run-node-raspberry-pi/#references)
- Mengganti nama host dengan sesuatu seperti “ethnode-e2a3e6fe” berdasarkan hash MAC
- Menjalankan perangkat lunak sebagai layanan systemd dan memulai sikronisasi Blockchain
- Memasukkan repositori APT untuk menginstal dan meningkatkan perangkat lunak Ethereum
- Memasukkan dasbor pengawasan berbasis Granfana / Prometheus

## Perangkat lunak yang disertakan {#software-included}

Kedua gambar memiliki paket yang sama, perbedaan keduanya hanya bahwa versi eksekusi menjalankan Geth secara bawaan dan versi konsensus menjalankan rantai suar Prysm secara bawaan.

### Klien eksekusi {#execution-clients}

- Geth [[8]](/developers/tutorials/run-node-raspberry-pi/#references): 1.9.13 (binari resmi)
- Parity [[9]](/developers/tutorials/run-node-raspberry-pi/#references): 2.7.2 (terkompilasi silang)
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references): 1.8.28 (terkompilasi silang)
- Hyperledger Besu [[11]](/developers/tutorials/run-node-raspberry-pi/#references): 1.4.4 (terkompilasi)

### Klien konsensus {#consensus-clients}

- Prysm [[12]](/developers/tutorials/run-node-raspberry-pi/#references): 1.0.0-alpha6 (binari resmi)
- Lighthouse [[13]](/developers/tutorials/run-node-raspberry-pi/#references): 0.1.1 (terkompilasi)

### Kerangka kerja Ethereum {#ethereum-framework}

- Swarm [[14]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.7 (binari resmi)
- Raiden Network [[15]](/developers/tutorials/run-node-raspberry-pi/#references): 0.200.0~rc1 (binari resmi)
- IPFS [[16]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.0 (binari resmi)
- Statusd [[17]](/developers/tutorials/run-node-raspberry-pi/#references): 0.52.3 (terkompilasi)
- Vipnode [[18]](/developers/tutorials/run-node-raspberry-pi/#references): 2.3.3 (binari resmi)

## Panduan instalasi dan penggunaan {#installation-guide-and-usage}

### Perangkat keras dan pengaturan yang disarankan {#recommended-hardware-and-setup}

- Raspberry 4 (model B) - 4GB
- MicroSD Card (minimum 16 GB Class 10)
- Disk USB 3.0 SSD (lihat bagian penyimpanan)
- Catu daya
- Kabel ethernet
- Penerusan port 30303 (lapisan eksekusi) dan penerusan port 13000 (lapisan konsensus) [[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- Kasing dengan pembuang panas dan kipas (opsional tapi sangat disarankan)
- Keyboard USB, Monitor, dan kabel HDMI (mikro-HDMI) (opsional)

## Penyimpanan {#storage}

Anda akan memerlukan SSD untuk menjalankan klien Ethereum (tanpa drive SSD sama sekali tidak mungkin menyinkronkan blockchain Ethereum). Ada 2 opsi:

- Gunakan disk SSD portabel USB seperti SSD Portabel Samsung T5.
- Gunakan Kasing Hard Drive Eksternal USB 3.0 dengan Disk SSD. Dalam kasus kami, kami menggunakan Inateck 2.5 Hard Drive Enclosure FE2011. Pastikan membeli kasing dengan chip yang sesuai dengan UAS, secara khusus, salah satu dari ini: JMicron (JMS567 atau JMS578) atau ASMedia (ASM1153E).

Dalam kedua kasus, hindari membeli disk SSD berkualitas rendah karena ini adalah komponen kunci node Anda dan bisa secara drastis memengaruhi kinerja (dan waktu sinkronisasi).

Ingatlah bahwa Anda harus menyambungkan disk dengan porta USB 3.0 (biru)

## Pengunduhan dan penginstalan gambar {#image-download-and-installation}

### 1. Unduh gambar lapisan eksekusi dan konsensus {#1-download-execution-or-consensus-images}

<ButtonLink href="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">
  Unduh gambar lapisan eksekusi
</ButtonLink>

sha256 7fa9370d13857dd6abcc8fde637c7a9a7e3a66b307d5c28b0c0d29a09c73c55c

<ButtonLink href="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">
  Unduh gambar lapisan konsensus
</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. Flash gambarnya {#2-flash-the-image}

Masukkan microSD dalam Desktop / Laptop Anda dan unduh failnya (lapisan eksekusi, misalnya):

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
```

Catatan: Jika Anda tidak nyaman menggunakan baris perintah atau jika Anda menjalankan Windows, Anda bisa menggunakan [Etcher](https://etcher.io)

Buka terminal dan periksa nama perangkat MicroSD Anda yang menjalankan:

```bash
sudo fdisk -l
```

Anda akan melihat perangkat bernama mmcblk0 atau sdd. Ekstrak dan flash gambarnya:

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. Masukkan MicroSD ke dalam Raspberry Pi 4. Sambungkan kabel Ethernet dan pasang disk SSD USB-nya (pastikan Anda menggunakan porta biru). {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. Nyalakan perangkatnya {#4-power-on-the-device}

OS Ubuntu akan melakukan boot up dalam waktu kurang dari satu menit tapi **Anda harus menunggu kira-kira 10 menit** untuk memungkinkan skrip melakukan tugas yang diperlukan guna mengubah perangkat menjadi node Ethereum dan melakukan reboot Raspberry.

Tergantung pada gambarnya, Anda akan menjalankan:

- Klien eksekusi: Geth sebagai klien bawaan menyinkronkan ke rantai blok
- Klien konsensus: Prysm sebagai klien bawaan menyinkronkan rantai suar (jaringan percobaan Goerli)

### 5. Masuk {#5-log-in}

Anda bisa masuk melalui SSH atau menggunakan konsolnya (jika Anda memiliki monitor dan keyboard yang terpasang)

```bash
User: ethereum
Password: ethereum
```

Anda akan diminta mengubah kata sandi saat masuk pertama kali, sehingga Anda perlu melakukan log masuk sebanyak dua kali.

### 6. Buka porta 30303 untuk Geth dan 13000 jika Anda menjalankan rantai suar Prysm. Jika Anda tidak tahu caranya, cari di google "port forwarding" diikuti dengan model perute Anda. {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. Dapatkan output konsol {#7-get-console-output}

Anda bisa melihat apa yang terjadi di balik layar dengan mengetik:

```bash
sudo tail -f /var/log/syslog
```

**Selamat. Anda sedang menjalankan node Ethereum penuh pada Raspberry Pi 4 Anda.**

## Menyinkronkan Blockchain {#syncing-the-blockchain}

Sekarang Anda perlu menunggu blockchain disinkronkan. Pada kasus lapisan eksekusi, ini dapat memakan waktu beberapa hari tergantung dari beberapa faktor, tetapi Anda dapat berharap dalam 5-7 hari.

Jika Anda menjalankan lapisan konsensus jaringan percobaan Goerli Anda dapat mengharapkan 1-2 hari waktu sinkronisasi Rantai suar. Ingatlah bahwa Anda harus menyiapkan validatornya nanti untuk memulai proses penaruhan. [Cara menjalankan validator lapisan konsensus](/developers/tutorials/run-node-raspberry-pi/#validator)

## Dasbor pengawasan {#monitoring-dashboards}

Untuk rilis pertama ini, kami memasukkan 3 dasbor pengawasan berbasis Prometheus [[5]](/developers/tutorials/run-node-raspberry-pi/#references) / Grafana [[6]](/developers/tutorials/run-node-raspberry-pi/#references) untuk mengawasi data node dan klien (Geth dan Besu). Anda bisa mengaksesnya melalui browser web:

```bash
URL: http://your_raspberrypi_IP:3000
User: admin
Password: ethereum
```

## Beralih klien {#switching-clients}

Semua klien beroperasi sebagai layanan systemd. Ini penting karena jika masalah muncul, sistem akan memunculkan kembali proses secara otomatis.

Geth and Prysm beacon chain run by default (depending on what you are synchronizing, execution layer or consensus layer) so, if you want to switch to other clients (from Geth to Nethermind, for instance), you need to stop and disable Geth first, and enable and start the other client:

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

Perintah untuk mengaktifkan dan memulai setiap klien eksekusi:

```bash
sudo systemctl enable besu && sudo systemctl start besu
sudo systemctl enable nethermind && sudo systemctl start nethermind
sudo systemctl enable parity && sudo systemctl start parity
```

Klien konsensus:

```bash
sudo systemctl stop prysm-beacon && sudo systemctl disable prysm-beacon
sudo systemctl start lighthouse && sudo systemctl enable lighthouse
```

## Mengubah parameter {#changing-parameters}

File config klien terletak di direktori /etc/ethereum/. Anda bisa mengedit file ini dan memulai ulang layanan systemd untuk menerapkan perubahan. Pengecualiannya hanya pada Nethermind, yang selain itu, memiliki file config Jaringan Utama yang terletak di sini:

```bash
/etc/nethermind/configs/mainnet.cfg
```

Data klien blockchain disimpan pada akun beranda Ethereum sebagai berikut (perhatikan tanda titiknya sebelum nama direktori):

### Lapisan eksekusi {#execution-layer}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### Lapisan konsensus {#consensus-layer}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind dan Hyperledger Besu {#nethermind-and-hyperledger-besu}

Dua klien eksekusi hebat berikut menjadi alternatif yang bagus untuk Geth dan Parity. Semakin beragam jaringan, akan semakin baik, sehingga Anda bisa mencobanya dan berkontribusi pada kesehatan jaringan.

Keduanya memerlukan pengujian lebih lanjut, silakan dicoba dan laporkan umpan balik Anda.

## Cara menjalankan validator konsensus (penaruhan) {#validator}

Setelah jaringan percobaan rantai suar Goerli disinkronkan, Anda dapat menjalankan validator dalam perangkat yang sama. Anda perlu mengikuti [langkah partisipasi ini](https://prylabs.net/participate).

Pertama-tama, Anda perlu membuat akun secara manual dengan menjalankan binari "validator" dan menyiapkan kata sandi. Setelah Anda telah menyelesaikan langkah ini, Anda bisa menambahkan kata sandi ke `/etc/ethereum/prysm-validator.conf` dan memulai validator sebagai layanan systemd.

## Umpan balik dihargai {#feedback-appreciated}

Kami berusaha keras menyiapkan Raspberry Pi 4 sebagai node Ethereum penuh, karena seperti yang kita ketahui basis pengguna perangkat ini yang besar bisa berdampak positif pada jaringan.

Tolong diperhitungkan, karena ini adalah gambar pertama berbasis Ubuntu 20.04, jadi mungkin ada beberapa bug. Jika ada, ajukan masalah di [GitHub](https://github.com/diglos/ethereumonarm) atau hubungi kami di [Twitter](https://twitter.com/EthereumOnARM).

## Referensi {#references}

1. [geth berulang kali gagal berfungsi dengan SIGSEGV](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/ethereumonarm](https://github.com/diglos/ethereumonarm)
3. https://ubuntu.com/download/raspberry-pi
4. https://wikipedia.org/wiki/Port_forwarding
5. https://prometheus.io
6. https://grafana.com
7. https://forum.armbian.com/topic/5565-zram-vs-swap/
8. https://geth.ethereum.org
9. https://github.com/openethereum/openethereum \* ** Perhatikan bahwa OpenEthereum [telah menjadi usang](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) dan tidak lagi dipertahankan.** Gunakan dengan hati-hati dan sebaiknya beralih ke implementasi klien yang lain.
10. https://nethermind.io
11. https://www.hyperledger.org/projects/besu
12. https://github.com/prysmaticlabs/prysm
13. https://lighthouse.sigmaprime.io
14. https://ethersphere.github.io/swarm-home
15. https://raiden.network
16. https://ipfs.io
17. https://status.im
18. https://vipnode.org
