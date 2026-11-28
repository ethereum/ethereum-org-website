---
title: Memantau Geth dengan InfluxDB dan Grafana
description: Siapkan pemantauan untuk node Geth Anda menggunakan InfluxDB dan Grafana untuk melacak kinerja dan mengidentifikasi masalah.
author: "Mario Havel"
tags: ["klien", "node"]
skill: intermediate
breadcrumb: Memantau Geth
lang: id
published: 2021-01-13
---

Tutorial ini akan membantu Anda menyiapkan pemantauan untuk node Geth Anda sehingga Anda dapat lebih memahami kinerjanya dan mengidentifikasi potensi masalah.

## Prasyarat {#prerequisites}

- Anda harus sudah menjalankan instans Geth.
- Sebagian besar langkah dan contoh ditujukan untuk lingkungan Linux, pengetahuan dasar tentang terminal akan sangat membantu.
- Lihat ikhtisar video tentang rangkaian metrik Geth ini: [Memantau infrastruktur Ethereum oleh Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Tumpukan pemantauan {#monitoring-stack}

Klien Ethereum mengumpulkan banyak data yang dapat dibaca dalam bentuk basis data kronologis. Untuk mempermudah pemantauan, Anda dapat memasukkan data ini ke dalam perangkat lunak visualisasi data. Ada beberapa opsi yang tersedia:

- [Prometheus](https://prometheus.io/) (model tarik)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (model dorong)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Jika Anda lebih memilih Prometheus, Geth juga dapat mengekspos metriknya dalam format Prometheus. Mulai Geth dengan `--metrics --metrics.addr 127.0.0.1` dan arahkan Prometheus ke `http://127.0.0.1:6060/debug/metrics/prometheus`.

Dalam tutorial ini, kita akan menyiapkan klien Geth Anda untuk mendorong data ke InfluxDB guna membuat basis data dan Grafana untuk membuat visualisasi grafik dari data tersebut. Melakukannya secara manual akan membantu Anda memahami prosesnya dengan lebih baik, mengubahnya, dan menyebarkannya di berbagai lingkungan.

## Menyiapkan InfluxDB {#setting-up-influxdb}

Pertama, mari kita unduh dan instal InfluxDB. Tutorial ini menggunakan InfluxDB 1.x (OSS), yang didukung Geth dengan tanda `--metrics.influxdb` di bawah ini. Versi InfluxDB yang lebih baru menggunakan penyiapan yang berbeda dengan organisasi, bucket, dan token alih-alih basis data dan pengguna. Geth mendukung InfluxDB 2.x dengan tanda `--metrics.influxdbv2`, tetapi langkah-langkah penyiapan dalam tutorial ini hanya berlaku untuk 1.x.

Ikuti [petunjuk penginstalan InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) untuk lingkungan Anda. Misalnya, di Debian atau Ubuntu Anda dapat menginstalnya dari repositori InfluxData. Periksa petunjuk penginstalan untuk sidik jari kunci penandatanganan saat ini sebelum memercayai kunci tersebut:

```sh
curl --silent --location -O https://repos.influxdata.com/influxdata-archive.key
sudo mkdir -p /etc/apt/keyrings
gpg --dearmor < influxdata-archive.key | sudo tee /etc/apt/keyrings/influxdata-archive.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/influxdata-archive.gpg] https://repos.influxdata.com/debian stable main" | sudo tee /etc/apt/sources.list.d/influxdata.list
sudo apt update
sudo apt install influxdb -y
sudo systemctl enable influxdb
sudo systemctl start influxdb
```

Paket `influxdb` menyertakan klien baris perintah `influx`.

Setelah berhasil menginstal InfluxDB, pastikan ia berjalan di latar belakang. Secara bawaan, ia dapat dijangkau di `localhost:8086`.
Sebelum menggunakan klien `influx`, Anda harus membuat pengguna baru dengan hak istimewa admin. Pengguna ini akan berfungsi untuk manajemen tingkat tinggi, membuat basis data dan pengguna.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Sekarang Anda dapat menggunakan klien influx untuk masuk ke [shell InfluxDB](https://docs.influxdata.com/influxdb/v1/tools/shell/) dengan pengguna ini.

```sh
influx -username 'username' -password 'password'
```

Berkomunikasi langsung dengan InfluxDB di shell-nya, Anda dapat membuat basis data dan pengguna untuk metrik geth.

```sql
create database geth
create user geth with password '<geth-password>'
```

Verifikasi entri yang dibuat dengan:

```sql
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
Penyiapan dasar menentukan titik akhir tempat InfluxDB dapat dijangkau dan autentikasi untuk basis data.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Gunakan kata sandi yang sama dengan yang Anda tetapkan saat membuat pengguna `geth`. Tanda-tanda ini dapat ditambahkan ke perintah yang memulai klien atau disimpan ke file konfigurasi.

Anda dapat memverifikasi bahwa Geth berhasil mendorong data, misalnya dengan mencantumkan metrik dalam basis data. Di shell InfluxDB:

```sql
use geth
show measurements
```

## Menyiapkan Grafana {#setting-up-grafana}

Langkah selanjutnya adalah menginstal Grafana yang akan menafsirkan data secara grafis. Ikuti [proses penginstalan untuk lingkungan Anda](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) dalam dokumentasi Grafana. Pastikan untuk menginstal versi OSS kecuali Anda membutuhkan yang lain.
Contoh langkah-langkah penginstalan untuk Debian atau Ubuntu menggunakan repositori Grafana:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Setelah Grafana berjalan, ia seharusnya dapat dijangkau di `localhost:3000`.
Gunakan peramban pilihan Anda untuk mengakses jalur ini, lalu masuk dengan kredensial bawaan (pengguna: `admin` dan kata sandi: `admin`). Saat diminta, ubah kata sandi bawaan dan simpan.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 1)](./grafana1.png)

Anda akan diarahkan ke halaman beranda Grafana. Pertama, siapkan data sumber Anda. Buka menu dan pilih **Connections > Data sources**. Tangkapan layar dalam tutorial ini berasal dari versi Grafana yang lebih lama, sehingga layar Anda mungkin terlihat sedikit berbeda.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 2)](./grafana2.png)

Belum ada sumber data yang dibuat, klik "Add data source" untuk menentukannya.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 3)](./grafana3.png)

Untuk penyiapan ini, pilih "InfluxDB" dan lanjutkan.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 4)](./grafana4.png)

Konfigurasi sumber data cukup mudah jika Anda menjalankan alat pada mesin yang sama. Anda perlu mengatur alamat InfluxDB dan detail untuk mengakses basis data. Rujuk ke gambar di bawah ini.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 5)](./grafana5.png)

Jika semuanya sudah selesai dan InfluxDB dapat dijangkau, klik "Save and test" dan tunggu konfirmasi muncul.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 6)](./grafana6.png)

Grafana sekarang disiapkan untuk membaca data dari InfluxDB. Sekarang Anda perlu membuat dasbor yang akan menafsirkan dan menampilkannya. Properti dasbor dikodekan dalam file JSON yang dapat dibuat oleh siapa saja dan diimpor dengan mudah. Buka menu dan pilih **Dashboards**, lalu klik **New > Import**.

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 7)](./grafana7.png)

Untuk dasbor pemantauan Geth, salin ID dari [dasbor ini](https://grafana.com/grafana/dashboards/13877/) dan tempelkan di "Import page" di Grafana. Setelah menyimpan dasbor, tampilannya akan seperti ini:

![Tangkapan layar dasbor Grafana untuk pemantauan Geth (panel 8)](./grafana8.png)

Anda dapat memodifikasi dasbor Anda. Setiap panel dapat diedit, dipindahkan, dihapus, atau ditambahkan. Anda dapat mengubah konfigurasi Anda. Semuanya terserah Anda! Untuk mempelajari lebih lanjut tentang cara kerja dasbor, rujuk ke [dokumentasi Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Anda mungkin juga tertarik dengan [Alerting](https://grafana.com/docs/grafana/latest/alerting/). Ini memungkinkan Anda menyiapkan pemberitahuan peringatan saat metrik mencapai nilai tertentu. Berbagai saluran komunikasi didukung.
