---
title: Memantau Geth dengan InfluxDB dan Grafana
description: Siapkan pemantauan untuk node Geth Anda menggunakan InfluxDB dan Grafana untuk melacak kinerja dan mengidentifikasi masalah.
author: "Mario Havel"
tags: ["klien", "node"]
skill: intermediate
breadcrumb: "Monitoring Geth"
lang: id
published: 2021-01-13
---

Tutorial ini akan membantu Anda menyiapkan pemantauan untuk node Geth Anda sehingga Anda dapat lebih memahami kinerjanya dan mengidentifikasi potensi masalah.

## Prasyarat {#prerequisites}

- Anda harus sudah menjalankan instans Geth.
- Sebagian besar langkah dan contoh adalah untuk lingkungan linux, pengetahuan dasar tentang terminal akan sangat membantu.
- Lihat ikhtisar video tentang rangkaian metrik Geth ini: [Memantau infrastruktur Ethereum oleh Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Tumpukan pemantauan {#monitoring-stack}

Klien Ethereum mengumpulkan banyak data yang dapat dibaca dalam bentuk basis data kronologis. Untuk mempermudah pemantauan, Anda dapat memasukkannya ke dalam perangkat lunak visualisasi data. Ada beberapa opsi yang tersedia:

- [Prometheus](https://prometheus.io/) (model tarik)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (model dorong)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Ada juga [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), opsi yang telah dikonfigurasi sebelumnya dengan InfluxDB dan Grafana.

Dalam tutorial ini, kita akan menyiapkan klien Geth Anda untuk mendorong data ke InfluxDB guna membuat basis data dan Grafana untuk membuat visualisasi grafik dari data tersebut. Melakukannya secara manual akan membantu Anda memahami prosesnya dengan lebih baik, mengubahnya, dan menerapkannya di lingkungan yang berbeda.

## Menyiapkan InfluxDB {#setting-up-influxdb}

Pertama, mari unduh dan instal InfluxDB. Berbagai opsi unduhan dapat ditemukan di [halaman rilis Influxdata](https://portal.influxdata.com/downloads/). Pilih salah satu yang sesuai dengan lingkungan Anda.
Anda juga dapat menginstalnya dari [repositori](https://repos.influxdata.com/). Misalnya dalam distribusi berbasis Debian:

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

Setelah berhasil menginstal InfluxDB, pastikan itu berjalan di latar belakang. Secara default, ini dapat dijangkau di `localhost:8086`.
Sebelum menggunakan klien `influx`, Anda harus membuat pengguna baru dengan hak istimewa admin. Pengguna ini akan berfungsi untuk manajemen tingkat tinggi, membuat basis data dan pengguna.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Sekarang Anda dapat menggunakan klien influx untuk masuk ke [shell InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) dengan pengguna ini.

```
influx -username 'username' -password 'password'
```

Berkomunikasi langsung dengan InfluxDB di shell-nya, Anda dapat membuat basis data dan pengguna untuk metrik geth.

```
create database geth
create user geth with password choosepassword
```

Verifikasi entri yang dibuat dengan:

```
show databases
show users
```

Tinggalkan shell InfluxDB.

```
exit
```

InfluxDB sedang berjalan dan dikonfigurasi untuk menyimpan metrik dari Geth.

## Menyiapkan Geth {#preparing-geth}

Setelah menyiapkan basis data, kita perlu mengaktifkan pengumpulan metrik di Geth. Perhatikan `METRICS AND STATS OPTIONS` di `geth --help`. Beberapa opsi dapat ditemukan di sana, dalam hal ini kita ingin Geth mendorong data ke InfluxDB.
Penyiapan dasar menentukan titik akhir di mana InfluxDB dapat dijangkau dan autentikasi untuk basis data.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Bendera ini dapat ditambahkan ke perintah yang memulai klien atau disimpan ke file konfigurasi.

Anda dapat memverifikasi bahwa Geth berhasil mendorong data, misalnya dengan mencantumkan metrik dalam basis data. Di shell InfluxDB:

```
use geth
show measurements
```

## Menyiapkan Grafana {#setting-up-grafana}

Langkah selanjutnya adalah menginstal Grafana yang akan menafsirkan data secara grafis. Ikuti proses instalasi untuk lingkungan Anda di dokumentasi Grafana. Pastikan untuk menginstal versi OSS jika Anda tidak menginginkan yang lain.
Contoh langkah instalasi untuk distribusi Debian menggunakan repositori:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Saat Anda menjalankan Grafana, itu harus dapat dijangkau di `localhost:3000`.
Gunakan peramban pilihan Anda untuk mengakses jalur ini, lalu masuk dengan kredensial default (pengguna: `admin` dan kata sandi: `admin`). Saat diminta, ubah kata sandi default dan simpan.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 1)](./grafana1.png)

Anda akan diarahkan ke halaman beranda Grafana. Pertama, siapkan data sumber Anda. Klik ikon konfigurasi di bilah kiri dan pilih "Data sources".

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 2)](./grafana2.png)

Belum ada sumber data yang dibuat, klik "Add data source" untuk menentukannya.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 3)](./grafana3.png)

Untuk penyiapan ini, pilih "InfluxDB" dan lanjutkan.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 4)](./grafana4.png)

Konfigurasi sumber data cukup mudah jika Anda menjalankan alat pada mesin yang sama. Anda perlu mengatur alamat InfluxDB dan detail untuk mengakses basis data. Lihat gambar di bawah ini.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 5)](./grafana5.png)

Jika semuanya sudah selesai dan InfluxDB dapat dijangkau, klik "Save and test" dan tunggu konfirmasi muncul.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 6)](./grafana6.png)

Grafana sekarang disiapkan untuk membaca data dari InfluxDB. Sekarang Anda perlu membuat dasbor yang akan menafsirkan dan menampilkannya. Properti dasbor dikodekan dalam file JSON yang dapat dibuat oleh siapa saja dan diimpor dengan mudah. Di bilah kiri, klik "Create and Import".

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 7)](./grafana7.png)

Untuk dasbor pemantauan Geth, salin ID dari [dasbor ini](https://grafana.com/grafana/dashboards/13877/) dan tempelkan di "Import page" di Grafana. Setelah menyimpan dasbor, tampilannya akan seperti ini:

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 8)](./grafana8.png)

Anda dapat memodifikasi dasbor Anda. Setiap panel dapat diedit, dipindahkan, dihapus, atau ditambahkan. Anda dapat mengubah konfigurasi Anda. Terserah Anda! Untuk mempelajari lebih lanjut tentang cara kerja dasbor, lihat [dokumentasi Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Anda mungkin juga tertarik dengan [Peringatan](https://grafana.com/docs/grafana/latest/alerting/). Ini memungkinkan Anda menyiapkan pemberitahuan peringatan saat metrik mencapai nilai tertentu. Berbagai saluran komunikasi didukung.