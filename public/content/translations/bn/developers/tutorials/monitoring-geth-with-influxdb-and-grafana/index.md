---
title: "InfluxDB এবং Grafana দিয়ে Geth পর্যবেক্ষণ"
description: "আপনার Geth নোডের কার্যকারিতা ট্র্যাক করতে এবং সমস্যা শনাক্ত করতে InfluxDB ও Grafana ব্যবহার করে পর্যবেক্ষণ ব্যবস্থা সেট আপ করুন।"
author: "Mario Havel"
tags: [ "ক্লায়েন্ট", "নোড" ]
skill: intermediate
lang: bn
published: 2021-01-13
---

এই টিউটোরিয়ালটি আপনাকে আপনার Geth নোডের জন্য পর্যবেক্ষণ ব্যবস্থা সেট আপ করতে সাহায্য করবে, যাতে আপনি এর কার্যকারিতা আরও ভালোভাবে বুঝতে পারেন এবং সম্ভাব্য সমস্যাগুলি শনাক্ত করতে পারেন।

## পূর্বশর্ত {#prerequisites}

- আপনার Geth-এর একটি ইনস্ট্যান্স আগে থেকেই চালু থাকা উচিত।
- বেশিরভাগ ধাপ এবং উদাহরণ linux পরিবেশের জন্য, তাই টার্মিনাল সম্পর্কে প্রাথমিক জ্ঞান থাকা সহায়ক হবে।
- Geth-এর মেট্রিক্স স্যুটের এই ভিডিও ওভারভিউটি দেখুন: [Péter Szilágyi-র ইথেরিয়াম পরিকাঠামো পর্যবেক্ষণ](https://www.youtube.com/watch?v=cOBab8IJMYI)।

## পর্যবেক্ষণ স্ট্যাক {#monitoring-stack}

একটি ইথেরিয়াম ক্লায়েন্ট প্রচুর ডেটা সংগ্রহ করে যা একটি ক্রনোলজিক্যাল ডেটাবেসের আকারে পড়া যায়। পর্যবেক্ষণ সহজ করার জন্য, আপনি এটি ডেটা ভিজ্যুয়ালাইজেশন সফ্টওয়্যারে ফিড করতে পারেন। একাধিক বিকল্প উপলব্ধ রয়েছে:

- [Prometheus](https://prometheus.io/) (পুল মডেল)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (পুশ মডেল)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

এছাড়াও [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) রয়েছে, যা InfluxDB এবং Grafana-এর সাথে আগে থেকে কনফিগার করা একটি বিকল্প।

এই টিউটোরিয়ালে, আমরা আপনার Geth ক্লায়েন্টকে একটি ডেটাবেস তৈরি করতে InfluxDB-তে ডেটা পুশ করার জন্য এবং ডেটার গ্রাফ ভিজ্যুয়ালাইজেশন তৈরি করতে Grafana সেট আপ করব। এটি ম্যানুয়ালি করলে আপনাকে প্রক্রিয়াটি আরও ভালভাবে বুঝতে, এটি পরিবর্তন করতে এবং বিভিন্ন পরিবেশে ডেপ্লয় করতে সাহায্য করবে।

## InfluxDB সেট আপ করা {#setting-up-influxdb}

প্রথমে, আসুন InfluxDB ডাউনলোড এবং ইনস্টল করি। বিভিন্ন ডাউনলোডের বিকল্প [Influxdata রিলিজ পেজ](https://portal.influxdata.com/downloads/)-এ পাওয়া যাবে। আপনার পরিবেশের জন্য উপযুক্ত বিকল্পটি বেছে নিন।
আপনি এটি একটি [রিপোজিটরি](https://repos.influxdata.com/) থেকেও ইনস্টল করতে পারেন। উদাহরণস্বরূপ, ডেবিয়ান-ভিত্তিক ডিস্ট্রিবিউশনে:

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

InfluxDB সফলভাবে ইনস্টল করার পরে, নিশ্চিত করুন যে এটি ব্যাকগ্রাউন্ডে চলছে। ডিফল্টরূপে, এটি `localhost:8086`-এ অ্যাক্সেসযোগ্য।
`influx` ক্লায়েন্ট ব্যবহার করার আগে, আপনাকে অ্যাডমিন সুবিধা সহ একজন নতুন ব্যবহারকারী তৈরি করতে হবে। এই ব্যবহারকারীকে উচ্চ-স্তরের ব্যবস্থাপনা, ডেটাবেস ও ব্যবহারকারী তৈরির কাজে ব্যবহার করা হবে।

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

এখন আপনি এই ব্যবহারকারীর মাধ্যমে [InfluxDB shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/)-এ প্রবেশ করতে influx ক্লায়েন্ট ব্যবহার করতে পারেন।

```
influx -username 'username' -password 'password'
```

এর শেল থেকে সরাসরি InfluxDB-এর সাথে যোগাযোগ করে, আপনি geth মেট্রিক্সের জন্য ডেটাবেস এবং ব্যবহারকারী তৈরি করতে পারেন।

```
create database geth
create user geth with password choosepassword
```

তৈরি করা এন্ট্রিগুলো যাচাই করুন:

```
show databases
show users
```

InfluxDB শেল থেকে বেরিয়ে আসুন।

```
exit
```

InfluxDB এখন Geth থেকে মেট্রিক্স সংরক্ষণ করার জন্য চলছে এবং কনফিগার করা হয়েছে।

## Geth প্রস্তুত করা {#preparing-geth}

ডেটাবেস সেট আপ করার পরে, আমাদের Geth-এ মেট্রিক্স সংগ্রহ চালু করতে হবে। `geth --help`-এর মধ্যে `METRICS AND STATS OPTIONS`-এর দিকে মনোযোগ দিন। সেখানে একাধিক বিকল্প পাওয়া যাবে, এই ক্ষেত্রে আমরা চাই Geth যেন InfluxDB-তে ডেটা পুশ করে।
বেসিক সেটআপে এন্ডপয়েন্ট (যেখানে InfluxDB উপলব্ধ) এবং ডেটাবেসের জন্য প্রমাণীকরণ নির্দিষ্ট করা থাকে।

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

এই ফ্ল্যাগগুলি ক্লায়েন্ট চালু করার কমান্ডের সাথে যুক্ত করা যেতে পারে অথবা কনফিগারেশন ফাইলে সেভ করা যেতে পারে।

আপনি যাচাই করতে পারেন যে Geth সফলভাবে ডেটা পুশ করছে, উদাহরণস্বরূপ, ডেটাবেসে মেট্রিক্স তালিকাভুক্ত করে। InfluxDB শেলে:

```
use geth
show measurements
```

## Grafana সেট আপ করা {#setting-up-grafana}

পরবর্তী ধাপ হল Grafana ইনস্টল করা, যা ডেটাকে গ্রাফিকভাবে ব্যাখ্যা করবে। Grafana নথিপত্রে আপনার পরিবেশের জন্য ইনস্টলেশন প্রক্রিয়া অনুসরণ করুন। যদি অন্য কোনো সংস্করণ ব্যবহার করতে না চান, তবে OSS সংস্করণটিই ইনস্টল করুন।
রিপোজিটরি ব্যবহার করে ডেবিয়ান ডিস্ট্রিবিউশনের জন্য ইনস্টলেশনের উদাহরণ:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafana চালু হয়ে গেলে, এটি `localhost:3000`-এ অ্যাক্সেসযোগ্য হওয়া উচিত।
এই পাথে অ্যাক্সেস করতে আপনার পছন্দের ব্রাউজার ব্যবহার করুন, তারপর ডিফল্ট শংসাপত্র (ব্যবহারকারী: `admin` এবং পাসওয়ার্ড: `admin`) দিয়ে লগইন করুন। প্রম্পট করা হলে, ডিফল্ট পাসওয়ার্ড পরিবর্তন করে সেভ করুন।

![](./grafana1.png)

আপনাকে Grafana হোম পেজে রিডাইরেক্ট করা হবে। প্রথমে, আপনার সোর্স ডেটা সেট আপ করুন। বাম বারের কনফিগারেশন আইকনে ক্লিক করুন এবং "Data sources" নির্বাচন করুন।

![](./grafana2.png)

এখনও কোনো ডেটা সোর্স তৈরি করা হয়নি, একটি যোগ করতে "Add data source"-এ ক্লিক করুন।

![](./grafana3.png)

এই সেটআপের জন্য, "InfluxDB" নির্বাচন করুন এবং এগিয়ে যান।

![](./grafana4.png)

আপনি যদি একই মেশিনে টুলসগুলো চালান, তাহলে ডেটা সোর্স কনফিগারেশন বেশ সহজ। আপনাকে InfluxDB ঠিকানা এবং ডেটাবেস অ্যাক্সেস করার জন্য বিস্তারিত তথ্য সেট করতে হবে। নীচের ছবিটি দেখুন।

![](./grafana5.png)

যদি সবকিছু সম্পূর্ণ হয় এবং InfluxDB অ্যাক্সেসযোগ্য থাকে, তাহলে "Save and test"-এ ক্লিক করুন এবং কনফার্মেশন পপ আপ হওয়ার জন্য অপেক্ষা করুন।

![](./grafana6.png)

Grafana এখন InfluxDB থেকে ডেটা পড়ার জন্য সেট আপ করা হয়েছে। এখন আপনাকে একটি ড্যাশবোর্ড তৈরি করতে হবে যা এই ডেটা ব্যাখ্যা করবে এবং প্রদর্শন করবে। ড্যাশবোর্ডের বৈশিষ্ট্যগুলি JSON ফাইলে এনকোড করা থাকে, যা যে কেউ তৈরি করতে পারে এবং সহজেই ইমপোর্ট করা যায়। বাম বারে, "Create and Import"-এ ক্লিক করুন।

![](./grafana7.png)

একটি Geth পর্যবেক্ষণ ড্যাশবোর্ডের জন্য, [এই ড্যাশবোর্ড](https://grafana.com/grafana/dashboards/13877/)-এর আইডি কপি করুন এবং Grafana-র "Import page"-এ পেস্ট করুন। ড্যাশবোর্ডটি সেভ করার পর, এটি এইরকম দেখাবে:

![](./grafana8.png)

আপনি আপনার ড্যাশবোর্ড পরিবর্তন করতে পারেন। প্রতিটি প্যানেল এডিট করা, সরানো, মুছে ফেলা বা যোগ করা যেতে পারে। আপনি আপনার কনফিগারেশন পরিবর্তন করতে পারেন। এটা আপনার উপর নির্ভর করছে! ড্যাশবোর্ড কীভাবে কাজ করে সে সম্পর্কে আরও জানতে, [Grafana-র নথিপত্র](https://grafana.com/docs/grafana/latest/dashboards/) দেখুন।
আপনি [অ্যালার্টিং](https://grafana.com/docs/grafana/latest/alerting/)-এও আগ্রহী হতে পারেন। এটি আপনাকে মেট্রিক্স নির্দিষ্ট মানে পৌঁছালে অ্যালার্ট নোটিফিকেশন সেট আপ করার সুবিধা দেয়। বিভিন্ন কমিউনিকেশন চ্যানেল সমর্থিত।
