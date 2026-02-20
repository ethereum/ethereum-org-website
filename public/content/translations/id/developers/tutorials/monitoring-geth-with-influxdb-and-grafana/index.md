---
title: Memantau Geth dengan InfluxDB dan Grafana
description: Siapkan pemantauan untuk node Geth Anda menggunakan InfluxDB dan Grafana untuk melacak kinerja dan mengidentifikasi masalah.
author: "Mario Havel"
tags: [ "klien", "node" ]
skill: intermediate
lang: id
published: 2021-01-13
---

Tutorial ini akan membantu Anda menyiapkan pemantauan untuk node Geth Anda agar Anda dapat lebih memahami kinerjanya dan mengidentifikasi potensi masalah.

## Persyaratan {#prerequisites}

- Anda seharusnya telah menjalankan instance Geth.
- Sebagian besar langkah dan contoh adalah untuk lingkungan linux, pengetahuan dasar terminal akan sangat membantu.
- Lihat tinjauan video dari rangkaian metrik Geth ini: [Mengawasi infrastruktur Ethereum oleh Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Rangkaian pemantauan {#monitoring-stack}

Klien Ethereum mengumpulkan banyak data yang dapat dibaca dalam bentuk basis data kronologis. Untuk mempermudah pemantauan, Anda bisa memasukkan data ini ke perangkat lunak visualisasi data. Tersedia beberapa opsi:

- [Prometheus](https://prometheus.io/) (model tarik)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (model dorong)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Ada juga [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), sebuah opsi yang telah dikonfigurasi sebelumnya dengan InfluxDB dan Grafana.

Dalam tutorial ini, kita akan menyiapkan klien Geth Anda untuk mendorong data ke InfluxDB guna membuat basis data dan ke Grafana untuk membuat visualisasi grafik dari data tersebut. Melakukannya secara manual akan membantu Anda memahami prosesnya dengan lebih baik, mengubahnya, dan menyebarkannya di lingkungan yang berbeda.

## Menyiapkan InfluxDB {#setting-up-influxdb}

Pertama-tama, mari kita unduh dan instal InfluxDB. Berbagai opsi unduhan dapat ditemukan di [halaman rilis Influxdata](https://portal.influxdata.com/downloads/). Pilih salah satu yang cocok dengan lingkungan Anda.
Anda juga dapat menginstalnya dari sebuah [repositori](https://repos.influxdata.com/). Contohnya pada distribusi berbasis Debian:

```
curl -tlsv1.3 --proto =https -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
sudo apt update
sudo apt install influxdb -y
sudo systemctl enable influxdb
sudo systemctl start influxdb
sudo apt install influxdb-client
```

Setelah berhasil menginstal InfluxDB, pastikan program itu beroperasi di latar belakang. Secara default, ini dapat dijangkau di `localhost:8086`.
Sebelum menggunakan klien `influx`, Anda harus membuat pengguna baru dengan hak istimewa admin. Pengguna ini akan berfungsi untuk manajemen tingkat tinggi, membuat basis data, dan pengguna.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Sekarang Anda dapat menggunakan klien influx untuk masuk ke [shell InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) dengan pengguna ini.

```
influx -username 'username' -password 'password'
```

Dengan berkomunikasi langsung dengan InfluxDB di dalam shell-nya, Anda dapat membuat basis data dan pengguna untuk metrik geth.

```
buat basis data geth
buat pengguna geth dengan kata sandi pilihan
```

Verifikasi entri yang dibuat dengan:

```
tampilkan basis data
tampilkan pengguna
```

Keluar dari shell InfluxDB.

```
keluar
```

InfluxDB berjalan dan dikonfigurasi untuk menyimpan metrik dari Geth.

## Mempersiapkan Geth {#preparing-geth}

Setelah menyiapkan basis data, kita perlu mengaktifkan pengumpulan metrik di Geth. Perhatikan `METRICS AND STATS OPTIONS` di `geth --help`. Beberapa opsi dapat ditemukan di sana, dalam kasus ini kita ingin Geth mendorong data ke dalam InfluxDB.
Penyiapan dasar menentukan titik akhir (endpoint) di mana InfluxDB dapat dijangkau dan autentikasi untuk basis data.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Flag ini dapat ditambahkan ke perintah yang memulai klien atau disimpan ke file konfigurasi.

Anda dapat memverifikasi bahwa Geth berhasil mendorong data, misalnya dengan menampilkan daftar metrik dalam basis data. Dalam shell InfluxDB:

```
gunakan geth
tampilkan pengukuran
```

## Menyiapkan Grafana {#setting-up-grafana}

Langkah berikutnya adalah menginstal Grafana yang akan menginterpretasikan data secara grafis. Ikuti proses instalasi untuk lingkungan Anda dalam dokumentasi Grafana. Pastikan Anda menginstal versi OSS, kecuali jika Anda menginginkan yang lain.
Contoh langkah instalasi untuk distribusi Debian menggunakan repositori:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Setelah Grafana berjalan, Grafana seharusnya dapat dijangkau di `localhost:3000`.
Gunakan peramban pilihan Anda untuk mengakses jalur ini, lalu masuk dengan kredensial default (pengguna: `admin` dan kata sandi: `admin`). Ketika diminta, ubah kata sandi defaultnya dan simpan.

![](./grafana1.png)

Anda akan dialihkan ke halaman beranda Grafana. Pertama-tama, siapkan data sumber Anda. Klik ikon konfigurasi pada bilah kiri dan pilih "Sumber Data".

![](./grafana2.png)

Belum ada sumber data yang dibuat. Klik "Tambahkan sumber data" untuk membuatnya.

![](./grafana3.png)

Untuk penyiapan ini, pilih "InfluxDB" dan lanjutkan.

![](./grafana4.png)

Konfigurasi sumber data cukup mudah jika Anda menjalankan perangkat pada mesin yang sama. Anda perlu menyiapkan alamat dan detail InfluxDB untuk mengakses basis data. Lihat gambar di bawah.

![](./grafana5.png)

Jika semuanya lengkap dan InfluxDB dapat dijangkau, klik "Simpan dan uji" dan tunggu hingga konfirmasi muncul.

![](./grafana6.png)

Grafana sekarang telah disiapkan untuk membaca data dari InfluxDB. Sekarang Anda perlu membuat dasbor yang akan menginterpretasikan dan menampilkannya. Properti dasbor dikodekan dalam berkas JSON yang dapat dibuat oleh siapa pun dan dengan mudah diimpor. Pada bilah kiri, klik "Buat dan Impor".

![](./grafana7.png)

Untuk dasbor pemantauan Geth, salin ID dari [dasbor ini](https://grafana.com/grafana/dashboards/13877/) dan tempelkan di halaman "Impor" di Grafana. Setelah menyimpan dasbor, tampilannya akan seperti ini:

![](./grafana8.png)

Anda dapat memodifikasi dasbor Anda. Setiap panel dapat diedit, dipindahkan, dihapus, atau ditambahkan. Anda dapat mengubah konfigurasi Anda. Terserah Anda! Untuk mempelajari lebih lanjut tentang cara kerja dasbor, lihat [dokumentasi Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Anda mungkin juga tertarik dengan [Pemberitahuan](https://grafana.com/docs/grafana/latest/alerting/). Ini memungkinkan Anda menyiapkan pemberitahuan ketika metrik mencapai nilai tertentu. Berbagai saluran komunikasi didukung.
