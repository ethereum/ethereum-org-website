---
title: "InfluxDB এবং Grafana দিয়ে Geth মনিটরিং"
description: "পারফরম্যান্স ট্র্যাক করতে এবং সমস্যাগুলি চিহ্নিত করতে InfluxDB এবং Grafana ব্যবহার করে আপনার Geth নোডের জন্য মনিটরিং সেট আপ করুন।"
author: "মারিও হ্যাভেল"
tags: ["ক্লায়েন্ট", "নোড"]
skill: intermediate
breadcrumb: "Geth মনিটরিং"
lang: bn
published: 2021-01-13
---

এই টিউটোরিয়ালটি আপনাকে আপনার Geth নোডের জন্য মনিটরিং সেট আপ করতে সাহায্য করবে যাতে আপনি এর পারফরম্যান্স আরও ভালোভাবে বুঝতে পারেন এবং সম্ভাব্য সমস্যাগুলি চিহ্নিত করতে পারেন।

## পূর্বশর্ত {#prerequisites}

- আপনার ইতিমধ্যে Geth এর একটি ইনস্ট্যান্স চালু থাকা উচিত।
- বেশিরভাগ ধাপ এবং উদাহরণ লিনাক্স (linux) পরিবেশের জন্য, টার্মিনাল সম্পর্কে প্রাথমিক জ্ঞান সহায়ক হবে।
- Geth এর মেট্রিক্স স্যুটের এই ভিডিও ওভারভিউটি দেখুন: [Monitoring an Ethereum infrastructure by Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI)।

## মনিটরিং স্ট্যাক {#monitoring-stack}

একটি ইথেরিয়াম ক্লায়েন্ট প্রচুর ডেটা সংগ্রহ করে যা একটি ক্রমানুক্রমিক ডেটাবেস আকারে পড়া যায়। মনিটরিং সহজ করার জন্য, আপনি এটি ডেটা ভিজ্যুয়ালাইজেশন সফটওয়্যারে ফিড করতে পারেন। এর জন্য একাধিক বিকল্প উপলব্ধ রয়েছে:

- [Prometheus](https://prometheus.io/) (পুল মডেল)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (পুশ মডেল)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

এছাড়াও [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) রয়েছে, যা InfluxDB এবং Grafana এর সাথে আগে থেকেই কনফিগার করা একটি বিকল্প।

এই টিউটোরিয়ালে, আমরা আপনার Geth ক্লায়েন্ট সেট আপ করব যাতে এটি একটি ডেটাবেস তৈরি করতে InfluxDB-তে ডেটা পুশ করে এবং ডেটার গ্রাফ ভিজ্যুয়ালাইজেশন তৈরি করতে Grafana ব্যবহার করে। এটি ম্যানুয়ালি করলে আপনি প্রক্রিয়াটি আরও ভালোভাবে বুঝতে পারবেন, এটি পরিবর্তন করতে পারবেন এবং বিভিন্ন পরিবেশে ডেপ্লয় করতে পারবেন।

## InfluxDB সেট আপ করা {#setting-up-influxdb}

প্রথমে, চলুন InfluxDB ডাউনলোড এবং ইনস্টল করি। ডাউনলোডের বিভিন্ন বিকল্প [Influxdata রিলিজ পেজে](https://portal.influxdata.com/downloads/) পাওয়া যাবে। আপনার পরিবেশের জন্য উপযুক্ত একটি বেছে নিন। আপনি এটি একটি [রিপোজিটরি](https://repos.influxdata.com/) থেকেও ইনস্টল করতে পারেন। উদাহরণস্বরূপ ডেবিয়ান (Debian) ভিত্তিক ডিস্ট্রিবিউশনে:

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

InfluxDB সফলভাবে ইনস্টল করার পর, নিশ্চিত করুন যে এটি ব্যাকগ্রাউন্ডে চলছে। ডিফল্টভাবে, এটি `localhost:8086` এ পৌঁছানো যায়। `influx` ক্লায়েন্ট ব্যবহার করার আগে, আপনাকে অ্যাডমিন সুবিধা সহ নতুন ব্যবহারকারী তৈরি করতে হবে। এই ব্যবহারকারী উচ্চ স্তরের পরিচালনা, ডেটাবেস এবং ব্যবহারকারী তৈরির জন্য কাজ করবে।

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

এখন আপনি এই ব্যবহারকারীর সাথে [InfluxDB শেল](https://docs.influxdata.com/influxdb/v1.8/tools/shell/)-এ প্রবেশ করতে influx ক্লায়েন্ট ব্যবহার করতে পারেন।

```
influx -username 'username' -password 'password'
```

এর শেলে সরাসরি InfluxDB এর সাথে যোগাযোগ করে, আপনি geth মেট্রিক্সের জন্য ডেটাবেস এবং ব্যবহারকারী তৈরি করতে পারেন।

```
create database geth
create user geth with password choosepassword
```

তৈরি করা এন্ট্রিগুলি যাচাই করুন:

```
show databases
show users
```

InfluxDB শেল থেকে প্রস্থান করুন।

```
exit
```

InfluxDB চলছে এবং Geth থেকে মেট্রিক্স সংরক্ষণ করার জন্য কনফিগার করা হয়েছে।

## Geth প্রস্তুত করা {#preparing-geth}

ডেটাবেস সেট আপ করার পর, আমাদের Geth-এ মেট্রিক্স সংগ্রহ সক্ষম করতে হবে। `geth --help`-এ `METRICS AND STATS OPTIONS`-এর দিকে মনোযোগ দিন। সেখানে একাধিক বিকল্প পাওয়া যেতে পারে, এই ক্ষেত্রে আমরা চাই Geth যেন InfluxDB-তে ডেটা পুশ করে। বেসিক সেটআপ সেই এন্ডপয়েন্ট নির্দিষ্ট করে যেখানে InfluxDB পৌঁছানো যায় এবং ডেটাবেসের জন্য প্রমাণীকরণ (authentication) থাকে।

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

এই ফ্ল্যাগগুলি ক্লায়েন্ট শুরু করার কমান্ডের সাথে যুক্ত করা যেতে পারে বা কনফিগারেশন ফাইলে সংরক্ষণ করা যেতে পারে।

আপনি যাচাই করতে পারেন যে Geth সফলভাবে ডেটা পুশ করছে, উদাহরণস্বরূপ ডেটাবেসে মেট্রিক্স তালিকাভুক্ত করে। InfluxDB শেলে:

```
use geth
show measurements
```

## Grafana সেট আপ করা {#setting-up-grafana}

পরবর্তী ধাপ হলো Grafana ইনস্টল করা যা ডেটাকে গ্রাফিকভাবে ব্যাখ্যা করবে। Grafana ডকুমেন্টেশনে আপনার পরিবেশের জন্য ইনস্টলেশন প্রক্রিয়া অনুসরণ করুন। আপনি যদি অন্য কিছু না চান তবে নিশ্চিত করুন যে OSS সংস্করণ ইনস্টল করেছেন। রিপোজিটরি ব্যবহার করে ডেবিয়ান ডিস্ট্রিবিউশনের জন্য উদাহরণস্বরূপ ইনস্টলেশন ধাপ:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

যখন আপনার Grafana চালু হবে, তখন এটি `localhost:3000`-এ পৌঁছানো উচিত। এই পাথে অ্যাক্সেস করতে আপনার পছন্দের ব্রাউজার ব্যবহার করুন, তারপর ডিফল্ট ক্রেডেনশিয়াল (ব্যবহারকারী: `admin` এবং পাসওয়ার্ড: `admin`) দিয়ে লগইন করুন। প্রম্পট করা হলে, ডিফল্ট পাসওয়ার্ড পরিবর্তন করুন এবং সেভ করুন।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 1)](./grafana1.png)

আপনাকে Grafana হোম পেজে রিডাইরেক্ট করা হবে। প্রথমে, আপনার সোর্স ডেটা সেট আপ করুন। বাম দিকের বারে কনফিগারেশন আইকনে ক্লিক করুন এবং "Data sources" নির্বাচন করুন।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 2)](./grafana2.png)

এখনও কোনো ডেটা সোর্স তৈরি করা হয়নি, একটি সংজ্ঞায়িত করতে "Add data source"-এ ক্লিক করুন।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 3)](./grafana3.png)

এই সেটআপের জন্য, "InfluxDB" নির্বাচন করুন এবং এগিয়ে যান।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 4)](./grafana4.png)

আপনি যদি একই মেশিনে টুলগুলি চালান তবে ডেটা সোর্স কনফিগারেশন বেশ সহজ। ডেটাবেস অ্যাক্সেস করার জন্য আপনাকে InfluxDB ঠিকানা এবং বিবরণ সেট করতে হবে। নিচের ছবিটি দেখুন।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 5)](./grafana5.png)

যদি সবকিছু সম্পন্ন হয় এবং InfluxDB পৌঁছানো যায়, তবে "Save and test"-এ ক্লিক করুন এবং কনফার্মেশন পপ আপ হওয়ার জন্য অপেক্ষা করুন।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 6)](./grafana6.png)

Grafana এখন InfluxDB থেকে ডেটা পড়ার জন্য সেট আপ করা হয়েছে। এখন আপনাকে একটি ড্যাশবোর্ড তৈরি করতে হবে যা এটি ব্যাখ্যা করবে এবং প্রদর্শন করবে। ড্যাশবোর্ডের বৈশিষ্ট্যগুলি JSON ফাইলে এনকোড করা থাকে যা যে কেউ তৈরি করতে পারে এবং সহজেই ইমপোর্ট করা যায়। বাম দিকের বারে, "Create and Import"-এ ক্লিক করুন।

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 7)](./grafana7.png)

একটি Geth মনিটরিং ড্যাশবোর্ডের জন্য, [এই ড্যাশবোর্ডের](https://grafana.com/grafana/dashboards/13877/) আইডি কপি করুন এবং Grafana-এর "Import page"-এ পেস্ট করুন। ড্যাশবোর্ড সেভ করার পর, এটি দেখতে এমন হওয়া উচিত:

![Geth মনিটরিংয়ের জন্য Grafana ড্যাশবোর্ডের স্ক্রিনশট (প্যানেল 8)](./grafana8.png)

আপনি আপনার ড্যাশবোর্ডগুলি পরিবর্তন করতে পারেন। প্রতিটি প্যানেল এডিট, সরানো, মুছে ফেলা বা যোগ করা যেতে পারে। আপনি আপনার কনফিগারেশন পরিবর্তন করতে পারেন। এটি আপনার উপর নির্ভর করে! ড্যাশবোর্ডগুলি কীভাবে কাজ করে সে সম্পর্কে আরও জানতে, [Grafana-এর ডকুমেন্টেশন](https://grafana.com/docs/grafana/latest/dashboards/) দেখুন।
আপনি [Alerting](https://grafana.com/docs/grafana/latest/alerting/)-এও আগ্রহী হতে পারেন। এটি আপনাকে মেট্রিক্স নির্দিষ্ট মানগুলিতে পৌঁছালে অ্যালার্ট নোটিফিকেশন সেট আপ করতে দেয়। বিভিন্ন কমিউনিকেশন চ্যানেল সমর্থিত।