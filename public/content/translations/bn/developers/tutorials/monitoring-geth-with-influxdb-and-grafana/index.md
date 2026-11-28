---
title: "InfluxDB এবং Grafana দিয়ে Geth মনিটরিং"
description: "পারফরম্যান্স ট্র্যাক করতে এবং সমস্যাগুলি চিহ্নিত করতে InfluxDB এবং Grafana ব্যবহার করে আপনার Geth নোডের জন্য মনিটরিং সেট আপ করুন।"
author: "মারিও হাভেল"
tags:
  - "ক্লায়েন্ট"
  - "নোড"
skill: intermediate
breadcrumb: "Geth মনিটরিং"
lang: bn
published: 2021-01-13
---

এই টিউটোরিয়ালটি আপনাকে আপনার Geth নোডের জন্য মনিটরিং সেট আপ করতে সাহায্য করবে যাতে আপনি এর পারফরম্যান্স আরও ভালোভাবে বুঝতে পারেন এবং সম্ভাব্য সমস্যাগুলি চিহ্নিত করতে পারেন।

## পূর্বশর্ত {#prerequisites}

- আপনার ইতিমধ্যে Geth-এর একটি ইনস্ট্যান্স চালু থাকা উচিত।
- বেশিরভাগ ধাপ এবং উদাহরণ Linux পরিবেশের জন্য, টার্মিনালের প্রাথমিক জ্ঞান সহায়ক হবে।
- Geth-এর মেট্রিক্স স্যুটের এই ভিডিও ওভারভিউটি দেখুন: [পিটার সিলাগি (Péter Szilágyi) দ্বারা ইথেরিয়াম ইনফ্রাস্ট্রাকচার মনিটরিং](https://www.youtube.com/watch?v=cOBab8IJMYI)।

## মনিটরিং স্ট্যাক {#monitoring-stack}

একটি ইথেরিয়াম ক্লায়েন্ট প্রচুর ডেটা সংগ্রহ করে যা একটি ক্রমানুক্রমিক ডেটাবেস আকারে পড়া যায়। মনিটরিং সহজ করার জন্য, আপনি এই ডেটা ভিজ্যুয়ালাইজেশন সফ্টওয়্যারে ফিড করতে পারেন। এর জন্য একাধিক বিকল্প উপলব্ধ রয়েছে:

- [Prometheus](https://prometheus.io/) (পুল মডেল)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (পুশ মডেল)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

আপনি যদি Prometheus পছন্দ করেন, তবে Geth তার মেট্রিক্স Prometheus ফর্ম্যাটেও প্রকাশ করতে পারে। `--metrics --metrics.addr 127.0.0.1` দিয়ে Geth চালু করুন এবং Prometheus-কে `http://127.0.0.1:6060/debug/metrics/prometheus`-এ পয়েন্ট করুন।

এই টিউটোরিয়ালে, আমরা আপনার Geth ক্লায়েন্টকে InfluxDB-তে ডেটা পুশ করে একটি ডেটাবেস তৈরি করতে এবং Grafana-তে ডেটার একটি গ্রাফ ভিজ্যুয়ালাইজেশন তৈরি করতে সেট আপ করব। এটি ম্যানুয়ালি করলে আপনি প্রক্রিয়াটি আরও ভালোভাবে বুঝতে পারবেন, এটি পরিবর্তন করতে পারবেন এবং বিভিন্ন পরিবেশে ডিপ্লয় করতে পারবেন।

## InfluxDB সেট আপ করা {#setting-up-influxdb}

প্রথমে, চলুন InfluxDB ডাউনলোড এবং ইনস্টল করি। এই টিউটোরিয়ালটি InfluxDB 1.x (OSS) ব্যবহার করে, যা Geth নিচের `--metrics.influxdb` ফ্ল্যাগগুলির মাধ্যমে সমর্থন করে। নতুন InfluxDB সংস্করণগুলি ডেটাবেস এবং ব্যবহারকারীদের পরিবর্তে সংস্থা, বাকেট এবং টোকেন সহ একটি ভিন্ন সেটআপ ব্যবহার করে। Geth `--metrics.influxdbv2` ফ্ল্যাগগুলির মাধ্যমে InfluxDB 2.x সমর্থন করে, তবে এই টিউটোরিয়ালের সেটআপ ধাপগুলি শুধুমাত্র 1.x-এর জন্য প্রযোজ্য।

আপনার পরিবেশের জন্য [InfluxDB 1.x ইনস্টলেশন নির্দেশাবলী](https://docs.influxdata.com/influxdb/v1/introduction/install/) অনুসরণ করুন। উদাহরণস্বরূপ, Debian বা Ubuntu-তে আপনি এটি InfluxData রিপোজিটরি থেকে ইনস্টল করতে পারেন। কী-টি বিশ্বাস করার আগে বর্তমান সাইনিং কী ফিঙ্গারপ্রিন্টের জন্য ইনস্টলেশন নির্দেশাবলী চেক করুন:

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

`influxdb` প্যাকেজে `influx` কমান্ড লাইন ক্লায়েন্ট অন্তর্ভুক্ত রয়েছে।

সফলভাবে InfluxDB ইনস্টল করার পর, নিশ্চিত করুন যে এটি ব্যাকগ্রাউন্ডে চলছে। ডিফল্টরূপে, এটি `localhost:8086`-এ পৌঁছানো যায়।
`influx` ক্লায়েন্ট ব্যবহার করার আগে, আপনাকে অ্যাডমিন সুবিধা সহ নতুন ব্যবহারকারী তৈরি করতে হবে। এই ব্যবহারকারী উচ্চ স্তরের পরিচালনা, ডেটাবেস এবং ব্যবহারকারী তৈরির জন্য কাজ করবে।

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

এখন আপনি এই ব্যবহারকারীর সাথে [InfluxDB শেল](https://docs.influxdata.com/influxdb/v1/tools/shell/)-এ প্রবেশ করতে influx ক্লায়েন্ট ব্যবহার করতে পারেন।

```sh
influx -username 'username' -password 'password'
```

এর শেলে সরাসরি InfluxDB-এর সাথে যোগাযোগ করে, আপনি geth মেট্রিক্সের জন্য ডেটাবেস এবং ব্যবহারকারী তৈরি করতে পারেন।

```sql
create database geth
create user geth with password '<geth-password>'
```

তৈরি করা এন্ট্রিগুলি যাচাই করুন:

```sql
show databases
show users
```

InfluxDB শেল থেকে প্রস্থান করুন।

```
exit
```

InfluxDB চলছে এবং Geth থেকে মেট্রিক্স সংরক্ষণ করার জন্য কনফিগার করা হয়েছে।

## Geth প্রস্তুত করা {#preparing-geth}

ডেটাবেস সেট আপ করার পর, আমাদের Geth-এ মেট্রিক্স সংগ্রহ সক্ষম করতে হবে। `geth --help`-এ `METRICS AND STATS OPTIONS`-এর দিকে মনোযোগ দিন। সেখানে একাধিক বিকল্প পাওয়া যেতে পারে, এই ক্ষেত্রে আমরা চাই Geth যেন InfluxDB-তে ডেটা পুশ করে।
প্রাথমিক সেটআপ সেই এন্ডপয়েন্ট নির্দিষ্ট করে যেখানে InfluxDB পৌঁছানো যায় এবং ডেটাবেসের জন্য প্রমাণীকরণ প্রদান করে।

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

আপনি যখন `geth` ব্যবহারকারী তৈরি করেছিলেন তখন যে পাসওয়ার্ড সেট করেছিলেন সেটিই ব্যবহার করুন। এই ফ্ল্যাগগুলি ক্লায়েন্ট চালু করার কমান্ডের সাথে যুক্ত করা যেতে পারে বা কনফিগারেশন ফাইলে সংরক্ষণ করা যেতে পারে।

আপনি যাচাই করতে পারেন যে Geth সফলভাবে ডেটা পুশ করছে, উদাহরণস্বরূপ ডেটাবেসে মেট্রিক্স তালিকাভুক্ত করে। InfluxDB শেলে:

```sql
use geth
show measurements
```

## Grafana সেট আপ করা {#setting-up-grafana}

পরবর্তী ধাপ হলো Grafana ইনস্টল করা যা ডেটাকে গ্রাফিকভাবে ব্যাখ্যা করবে। Grafana ডকুমেন্টেশনে [আপনার পরিবেশের জন্য ইনস্টলেশন প্রক্রিয়া](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) অনুসরণ করুন। আপনার যদি অন্য কিছুর প্রয়োজন না হয় তবে নিশ্চিত করুন যে আপনি OSS সংস্করণটি ইনস্টল করেছেন।
Grafana রিপোজিটরি ব্যবহার করে Debian বা Ubuntu-এর জন্য উদাহরণস্বরূপ ইনস্টলেশন ধাপ:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

যখন আপনার Grafana চালু হবে, তখন এটি `localhost:3000`-এ পৌঁছানো উচিত।
এই পাথে অ্যাক্সেস করতে আপনার পছন্দের ব্রাউজার ব্যবহার করুন, তারপর ডিফল্ট ক্রেডেনশিয়াল (ব্যবহারকারী: `admin` এবং পাসওয়ার্ড: `admin`) দিয়ে লগইন করুন। প্রম্পট করা হলে, ডিফল্ট পাসওয়ার্ড পরিবর্তন করুন এবং সেভ করুন।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 1)](./grafana1.png)

আপনাকে Grafana হোম পেজে রিডাইরেক্ট করা হবে। প্রথমে, আপনার সোর্স ডেটা সেট আপ করুন। মেনু খুলুন এবং **Connections > Data sources** নির্বাচন করুন। এই টিউটোরিয়ালের স্ক্রিনশটগুলি Grafana-এর একটি পুরানো সংস্করণের, তাই আপনার স্ক্রিনগুলি কিছুটা আলাদা দেখাতে পারে।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 2)](./grafana2.png)

এখনও কোনো ডেটা সোর্স তৈরি করা হয়নি, একটি সংজ্ঞায়িত করতে "Add data source"-এ ক্লিক করুন।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 3)](./grafana3.png)

এই সেটআপের জন্য, "InfluxDB" নির্বাচন করুন এবং এগিয়ে যান।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 4)](./grafana4.png)

আপনি যদি একই মেশিনে টুলগুলি চালান তবে ডেটা সোর্স কনফিগারেশন বেশ সহজ। আপনাকে InfluxDB ঠিকানা এবং ডেটাবেস অ্যাক্সেস করার জন্য বিশদ বিবরণ সেট করতে হবে। নিচের ছবিটি দেখুন।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 5)](./grafana5.png)

যদি সবকিছু সম্পূর্ণ হয় এবং InfluxDB পৌঁছানো যায়, তবে "Save and test"-এ ক্লিক করুন এবং নিশ্চিতকরণ পপ আপ হওয়ার জন্য অপেক্ষা করুন।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 6)](./grafana6.png)

Grafana এখন InfluxDB থেকে ডেটা পড়ার জন্য সেট আপ করা হয়েছে। এখন আপনাকে একটি ড্যাশবোর্ড তৈরি করতে হবে যা এটি ব্যাখ্যা করবে এবং প্রদর্শন করবে। ড্যাশবোর্ডের বৈশিষ্ট্যগুলি JSON ফাইলে এনকোড করা থাকে যা যে কেউ তৈরি করতে পারে এবং সহজেই ইমপোর্ট করা যায়। মেনু খুলুন এবং **Dashboards** নির্বাচন করুন, তারপর **New > Import**-এ ক্লিক করুন।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 7)](./grafana7.png)

একটি Geth মনিটরিং ড্যাশবোর্ডের জন্য, [এই ড্যাশবোর্ডের](https://grafana.com/grafana/dashboards/13877/) আইডি কপি করুন এবং Grafana-এর "Import page"-এ পেস্ট করুন। ড্যাশবোর্ড সেভ করার পর, এটি দেখতে এমন হওয়া উচিত:

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 8)](./grafana8.png)

আপনি আপনার ড্যাশবোর্ডগুলি পরিবর্তন করতে পারেন। প্রতিটি প্যানেল সম্পাদনা, সরানো, মুছে ফেলা বা যোগ করা যেতে পারে। আপনি আপনার কনফিগারেশন পরিবর্তন করতে পারেন। এটি আপনার উপর নির্ভর করে! ড্যাশবোর্ডগুলি কীভাবে কাজ করে সে সম্পর্কে আরও জানতে, [Grafana-এর ডকুমেন্টেশন](https://grafana.com/docs/grafana/latest/dashboards/) দেখুন।
আপনি [অ্যালার্টিং](https://grafana.com/docs/grafana/latest/alerting/)-এও আগ্রহী হতে পারেন। এটি আপনাকে মেট্রিক্স নির্দিষ্ট মানগুলিতে পৌঁছালে অ্যালার্ট নোটিফিকেশন সেট আপ করতে দেয়। বিভিন্ন যোগাযোগের চ্যানেল সমর্থিত।
