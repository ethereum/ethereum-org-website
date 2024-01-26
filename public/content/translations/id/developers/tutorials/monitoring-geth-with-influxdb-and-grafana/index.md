---
title: Mengawasi Geth dengan InfluxDB dan Grafana
description:
author: "Mario Havel"
tags:
  - "klien"
  - "node"
skill: intermediate
lang: id
published: 2021-01-13
---

Tutorial ini akan menolong Anda menyiapkan node Geth Anda sehingga Anda dapat lebih baik memahami kinerjanya dan mengenali masalah yang mungkin muncul.

## Prasyarat {#prerequisites}

- Anda seharusnya telah menjalankan instance Geth.
- Kebanyakan langkah dan contoh adalah untuk lingkungan linux, pengetahuan terminal dasar akan menolong.
- Lihat tinjauan luas video dari rangkaian metrik Geth ini: [Mengawasi infrastruktur Ethereum oleh Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Mengawasi tumpukan {#monitoring-stack}

Klien Ethereum mengumpulkan banyak data yang dapat dibaca dalam bentuk basis data kronologis. Untuk mempermudah pengawasan, Anda dapat mem-feed ini ke dalam perangkat lunak visualisasi data. Ada beberapa opsi yang tersedia:

- [Prometheus](https://prometheus.io/) (model penarikan)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (model pendorongan)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Ada juga [Pengekspor Prometheus Geth](https://github.com/hunterlong/gethexporter), suatu opsi yang dikonfigurasi sebelumnya dengan InfluxDB dan Grafana. Anda dapat menyiapkannya dengan mudah menggunakan docker dan [Sistem Operasi Ethbian](https://ethbian.org/index.html) untuk RPi 4.

Dalam tutorial ini, kita akan menyiapkan klien Geth Anda untuk mendorong data ke InfluxDB untuk membuat basis data dan Grafana untuk membuat visualisasi grafik datanya. Melakukan ini secara manual akan membantu Anda untuk dengan lebih baik memahami prosesnya, mengubahnya, dan menyebarkannya di lingkungan yang berbeda.

## Menyiapkan InfluxDB {#setting-up-influxdb}

Pertama - tama, mari kita unduh dan instal InfluxDB. Berbagai opsi pengunduhan dapat ditemukan di [halaman rilis influxdata](https://portal.influxdata.com/downloads/). Pilih salah satu yang cocok dengan lingkungan Anda. Anda juga dapat menginstalnya dari suatu [repository](https://repos.influxdata.com/). Sebagai contoh dalam distribusi berbasis Debian:

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

Setelah berhasil menginstal InfluxDB, pastikan program itu beroperasi di latar belakang. Secara default, ia dapat ditemukan pada `localhost:8086`. Sebelum menggunakan klien `influx`, Anda harus membuat pengguna baru dengan hak istimewa administrator. Pengguna ini akan berguna untuk manajemen tingkat tinggi, yang membuat basis data dan pengguna.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Sekarang Anda dapat menggunakan klien influx untuk masuk ke [shell InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) dengan pengguna ini.

```
influx -username 'username' -password 'password'
```

Dengan berkomunikasi secara langsung dengan InfluxDB dalam shell-nya, Anda dapat membuat basis data dan pengguna untuk metrik geth.

```
create database geth
create user geth with password choosepassword
```

Verifikasi entri yang dibuat dengan:

```
show databases
show users
```

Biarkan shell InfluxDB.

```
exit
```

InfluxDB beroperasi dan dikonfigurasi untuk menyimpan metrik dari Geth.

## Menyiapkan Geth {#preparing-geth}

Setelah menyiapkan basis data, kita perlu mengaktifkan pengumpulan metrik di Geth. Perhatikan `METRICS AND STATS OPTIONS` dalam `geth --help`. Beberapa opsi dapat ditemukan di sana, dalam kasus ini kita ingin Geth mendorong data ke dalam InfluxDB. Penyiapan dasar menentukan endpoint di mana InfluxDB dapat dijangkau dan otentikasi untuk basis data.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Bendera ini dapat ditambahkan ke command yang memulai klien atau yang disimpan ke dalam berkas konfigurasi.

Anda dapat memverifikasi bahwa Geth berhasil mendorong data, sebagai contoh dengan merincikan metrik dalam basis data. Dalam shell InfluxDB:

```
use geth
show measurements
```

## Menyiapkan Grafana {#setting-up-grafana}

Langkah berikutnya adalah menginstal Grafana yang akan mengartikan data secara grafis. Ikuti proses instalasi untuk lingkungan Anda dalam dokumentasi Grafana. Sebaliknya, pastikan menginstal versi OSS jika Anda tidak ingin menggunakan cara sebelumnya. Langkah instalasi percontohan untuk distribusi Debian yang menggunakan repository:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Ketika Anda telah membuat Grafana beroperasi, ia seharusnya dapat dicapai di `localhost:3000`. Gunakan peramban yang Anda inginkan untuk mengakses jalur ini, lalu masuk dengan kredensial default (pengguna: `admin` dan kata sandi: `admin`). Ketika diminta, ubah kata sandi defaultnya dan simpan.

![](./grafana1.png)

Anda akan diarahkan kembali ke halaman beranda Grafana. Pertama - tama, siapkan data sumber Anda. Klik pada ikon konfigurasi di bar kiri dan pilih "Sumber data".

![](./grafana2.png)

Tidak ada sumber data mana pun yang dibuat, klik pada "Tambahkan sumber data" untuk menentukan satu sumber.

![](./grafana3.png)

Untuk penyiapan ini, pilih "InfluxDB" dan lanjutkan.

![](./grafana4.png)

Konfigurasi sumber data cukup mudah jika Anda menjalankan perangkat pada mesin yang sama. Anda perlu menyiapkan alamat dan detail InfluxDB untuk mengakses basis data. Lihat gambar di bawah.

![](./grafana5.png)

Jika semuanya lengkap dan InfluxDB dapat dicapai, klik pada "Simpan dan uji" dan tunggu hingga konfirmasinya muncul.

![](./grafana6.png)

Grafana sekarang telah disiapkan untuk membaca data dari InfluxDB. Sekarang Anda perlu membuat dasbor yang akan mengartikan dan menampilkannya. Properti dasbor dikodekan dalam berkas JSON yang dapat dibuat oleh siapa pun dan dengan mudah diimpor. Pada bar kiri, klik pada "Buat dan Impor".

![](./grafana7.png)

Untuk dasbor pengawasan Geth, salin ID [dasbor ini](https://grafana.com/grafana/dashboards/13877/) dan tempelkan pada "Impor halaman" di Grafana. Setelah menyimpan dasbor, ia seharusnya tampak seperti ini:

![](./grafana8.png)

Anda dapat memodifikasi dasbor Anda. Setiap panel dapat diedit, dipindahkan, dihilangkan atau ditambahkan. Anda dapat mengubah konfigurasi Anda. Terserah Anda! Untuk mempelajari lebih lanjut tentang bagaimana dasbor bekerja, lihat [Dokumentasi Grafana](https://grafana.com/docs/grafana/latest/dashboards/). Anda juga mungkin tertarik dengan [Memperingatkan](https://grafana.com/docs/grafana/latest/alerting/). Ini memungkinkan Anda menyiapkan pemberitahuan ketika metrik mencapai nilai tertentu. Berbagai kanal komunikasi didukung.
