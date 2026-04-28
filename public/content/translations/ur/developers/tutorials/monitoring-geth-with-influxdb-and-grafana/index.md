---
title: "InfluxDB اور Grafana کے ساتھ Geth کی نگرانی"
description: "کارکردگی کو ٹریک کرنے اور مسائل کی نشاندہی کرنے کے لیے InfluxDB اور Grafana کا استعمال کرتے ہوئے اپنے Geth نوڈ کے لیے نگرانی سیٹ اپ کریں۔"
author: "ماریو ہیول"
tags: ["کلائنٹس", "نوڈز"]
skill: intermediate
breadcrumb: "Geth کی نگرانی"
lang: ur
published: 2021-01-13
---

یہ ٹیوٹوریل آپ کو اپنے Geth نوڈ کے لیے نگرانی سیٹ اپ کرنے میں مدد کرے گا تاکہ آپ اس کی کارکردگی کو بہتر طور پر سمجھ سکیں اور ممکنہ مسائل کی نشاندہی کر سکیں۔

## پیشگی شرائط {#prerequisites}

- آپ کے پاس پہلے سے ہی Geth کا ایک انسٹنس چل رہا ہونا چاہیے۔
- زیادہ تر اقدامات اور مثالیں لینکس (linux) ماحول کے لیے ہیں، ٹرمینل کا بنیادی علم مددگار ثابت ہوگا۔
- Geth کے میٹرکس کے مجموعے کا یہ ویڈیو جائزہ دیکھیں: [Monitoring an Ethereum infrastructure by Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI)۔

## نگرانی کا اسٹیک {#monitoring-stack}

ایک ایتھیریم کلائنٹ بہت سا ڈیٹا اکٹھا کرتا ہے جسے ایک تاریخی (chronological) ڈیٹا بیس کی شکل میں پڑھا جا سکتا ہے۔ نگرانی کو آسان بنانے کے لیے، آپ اسے ڈیٹا ویژولائزیشن سافٹ ویئر میں فیڈ کر سکتے ہیں۔ اس کے لیے متعدد اختیارات دستیاب ہیں:

- [Prometheus](https://prometheus.io/) (پل ماڈل)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (پش ماڈل)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

یہاں [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) بھی ہے، جو InfluxDB اور Grafana کے ساتھ پہلے سے کنفیگر شدہ ایک آپشن ہے۔

اس ٹیوٹوریل میں، ہم آپ کے Geth کلائنٹ کو InfluxDB میں ڈیٹا پش کرنے کے لیے سیٹ اپ کریں گے تاکہ ایک ڈیٹا بیس بنایا جا سکے اور Grafana کو ڈیٹا کی گراف ویژولائزیشن بنانے کے لیے استعمال کیا جا سکے۔ اسے دستی طور پر کرنے سے آپ کو اس عمل کو بہتر طور پر سمجھنے، اس میں تبدیلی کرنے، اور مختلف ماحول میں تعینات (deploy) کرنے میں مدد ملے گی۔

## InfluxDB کو سیٹ اپ کرنا {#setting-up-influxdb}

سب سے پہلے، آئیے InfluxDB ڈاؤن لوڈ اور انسٹال کریں۔ ڈاؤن لوڈ کے مختلف اختیارات [Influxdata release page](https://portal.influxdata.com/downloads/) پر مل سکتے ہیں۔ وہ منتخب کریں جو آپ کے ماحول کے مطابق ہو۔
آپ اسے [repository](https://repos.influxdata.com/) سے بھی انسٹال کر سکتے ہیں۔ مثال کے طور پر Debian پر مبنی ڈسٹری بیوشن میں:

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

InfluxDB کو کامیابی سے انسٹال کرنے کے بعد، یقینی بنائیں کہ یہ بیک گراؤنڈ میں چل رہا ہے۔ پہلے سے طے شدہ (default) طور پر، یہ `localhost:8086` پر قابل رسائی ہے۔
`influx` کلائنٹ استعمال کرنے سے پہلے، آپ کو ایڈمن مراعات کے ساتھ نیا صارف بنانا ہوگا۔ یہ صارف اعلیٰ سطحی انتظام، ڈیٹا بیس اور صارفین بنانے کے لیے کام کرے گا۔

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

اب آپ اس صارف کے ساتھ [InfluxDB shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) میں داخل ہونے کے لیے influx کلائنٹ استعمال کر سکتے ہیں۔

```
influx -username 'username' -password 'password'
```

اس کے شیل میں InfluxDB کے ساتھ براہ راست بات چیت کرتے ہوئے، آپ geth میٹرکس کے لیے ڈیٹا بیس اور صارف بنا سکتے ہیں۔

```
create database geth
create user geth with password choosepassword
```

بنائی گئی اندراجات (entries) کی تصدیق اس سے کریں:

```
show databases
show users
```

InfluxDB شیل سے باہر نکلیں۔

```
exit
```

InfluxDB چل رہا ہے اور Geth سے میٹرکس کو اسٹور کرنے کے لیے کنفیگر کیا گیا ہے۔

## Geth کی تیاری {#preparing-geth}

ڈیٹا بیس سیٹ اپ کرنے کے بعد، ہمیں Geth میں میٹرکس جمع کرنے کو فعال کرنے کی ضرورت ہے۔ `geth --help` میں `METRICS AND STATS OPTIONS` پر توجہ دیں۔ وہاں متعدد اختیارات مل سکتے ہیں، اس صورت میں ہم چاہتے ہیں کہ Geth ڈیٹا کو InfluxDB میں پش کرے۔
بنیادی سیٹ اپ اس اینڈ پوائنٹ کی وضاحت کرتا ہے جہاں InfluxDB قابل رسائی ہے اور ڈیٹا بیس کے لیے توثیق (authentication) فراہم کرتا ہے۔

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

ان فلیگز کو کلائنٹ شروع کرنے والی کمانڈ کے ساتھ شامل کیا جا سکتا ہے یا کنفیگریشن فائل میں محفوظ کیا جا سکتا ہے۔

آپ تصدیق کر سکتے ہیں کہ Geth کامیابی سے ڈیٹا پش کر رہا ہے، مثال کے طور پر ڈیٹا بیس میں میٹرکس کی فہرست بنا کر۔ InfluxDB شیل میں:

```
use geth
show measurements
```

## Grafana کو سیٹ اپ کرنا {#setting-up-grafana}

اگلا قدم Grafana کو انسٹال کرنا ہے جو ڈیٹا کی گرافیکل تشریح کرے گا۔ Grafana کی دستاویزات میں اپنے ماحول کے لیے انسٹالیشن کے عمل کی پیروی کریں۔ یقینی بنائیں کہ OSS ورژن انسٹال کریں الا یہ کہ آپ کچھ اور چاہتے ہوں۔
ریپوزٹری کا استعمال کرتے ہوئے Debian ڈسٹری بیوشنز کے لیے انسٹالیشن کے مراحل کی مثال:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

جب آپ Grafana چلا لیں، تو یہ `localhost:3000` پر قابل رسائی ہونا چاہیے۔
اس پاتھ تک رسائی کے لیے اپنا پسندیدہ براؤزر استعمال کریں، پھر پہلے سے طے شدہ اسناد (صارف: `admin` اور پاس ورڈ: `admin`) کے ساتھ لاگ ان کریں۔ جب پوچھا جائے تو پہلے سے طے شدہ پاس ورڈ تبدیل کریں اور محفوظ کریں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 1)](./grafana1.png)

آپ کو Grafana کے ہوم پیج پر بھیج دیا جائے گا۔ سب سے پہلے، اپنا سورس ڈیٹا سیٹ اپ کریں۔ بائیں بار میں کنفیگریشن آئیکن پر کلک کریں اور "Data sources" کو منتخب کریں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 2)](./grafana2.png)

ابھی تک کوئی ڈیٹا سورس نہیں بنایا گیا ہے، ایک کی وضاحت کرنے کے لیے "Add data source" پر کلک کریں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 3)](./grafana3.png)

اس سیٹ اپ کے لیے، "InfluxDB" کو منتخب کریں اور آگے بڑھیں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 4)](./grafana4.png)

اگر آپ ایک ہی مشین پر ٹولز چلا رہے ہیں تو ڈیٹا سورس کی کنفیگریشن کافی سیدھی ہے۔ آپ کو ڈیٹا بیس تک رسائی کے لیے InfluxDB کا پتہ اور تفصیلات سیٹ کرنے کی ضرورت ہے۔ نیچے دی گئی تصویر دیکھیں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 5)](./grafana5.png)

اگر سب کچھ مکمل ہے اور InfluxDB قابل رسائی ہے، تو "Save and test" پر کلک کریں اور تصدیق کے ظاہر ہونے کا انتظار کریں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 6)](./grafana6.png)

Grafana اب InfluxDB سے ڈیٹا پڑھنے کے لیے سیٹ اپ ہو گیا ہے۔ اب آپ کو ایک ڈیش بورڈ بنانے کی ضرورت ہے جو اس کی تشریح کرے گا اور اسے دکھائے گا۔ ڈیش بورڈز کی خصوصیات JSON فائلوں میں انکوڈ کی جاتی ہیں جنہیں کوئی بھی بنا سکتا ہے اور آسانی سے امپورٹ کیا جا سکتا ہے۔ بائیں بار پر، "Create and Import" پر کلک کریں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 7)](./grafana7.png)

Geth کی نگرانی کے ڈیش بورڈ کے لیے، [اس ڈیش بورڈ](https://grafana.com/grafana/dashboards/13877/) کی ID کاپی کریں اور اسے Grafana میں "Import page" میں پیسٹ کریں۔ ڈیش بورڈ کو محفوظ کرنے کے بعد، یہ اس طرح نظر آنا چاہیے:

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 8)](./grafana8.png)

آپ اپنے ڈیش بورڈز میں ترمیم کر سکتے ہیں۔ ہر پینل کو ایڈٹ کیا جا سکتا ہے، منتقل کیا جا سکتا ہے، ہٹایا جا سکتا ہے یا شامل کیا جا سکتا ہے۔ آپ اپنی کنفیگریشنز تبدیل کر سکتے ہیں۔ یہ آپ پر منحصر ہے! ڈیش بورڈز کیسے کام کرتے ہیں اس بارے میں مزید جاننے کے لیے، [Grafana کی دستاویزات](https://grafana.com/docs/grafana/latest/dashboards/) دیکھیں۔
آپ کو [الرٹنگ (Alerting)](https://grafana.com/docs/grafana/latest/alerting/) میں بھی دلچسپی ہو سکتی ہے۔ یہ آپ کو الرٹ نوٹیفیکیشن سیٹ اپ کرنے کی سہولت دیتا ہے جب میٹرکس مخصوص اقدار تک پہنچ جائیں۔ مختلف مواصلاتی چینلز تعاون یافتہ ہیں۔