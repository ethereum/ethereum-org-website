---
title: "⁦InfluxDB⁩ اور ⁦Grafana⁩ کے ساتھ گو ایتھیریم (⁦Geth⁩) کی نگرانی"
description: "اپنی کارکردگی کو ٹریک کرنے اور مسائل کی نشاندہی کرنے کے لیے ⁦InfluxDB⁩ اور ⁦Grafana⁩ کا استعمال کرتے ہوئے اپنے گو ایتھیریم (⁦Geth⁩) نوڈ کے لیے نگرانی سیٹ اپ کریں۔"
author: "ماریو ہیول"
tags: ["کلائنٹس", "نوڈز"]
skill: intermediate
breadcrumb: "گو ایتھیریم (⁦Geth⁩) کی نگرانی"
lang: ur
published: 2021-01-13
---

یہ ٹیوٹوریل آپ کو اپنے گو ایتھیریم (<span dir="ltr">Geth</span>) نوڈ کے لیے نگرانی سیٹ اپ کرنے میں مدد کرے گا تاکہ آپ اس کی کارکردگی کو بہتر طور پر سمجھ سکیں اور ممکنہ مسائل کی نشاندہی کر سکیں۔

## پیشگی شرائط {#prerequisites}

- آپ کے پاس پہلے سے ہی گو ایتھیریم (<span dir="ltr">Geth</span>) کا ایک انسٹنس چل رہا ہونا چاہیے۔
- زیادہ تر اقدامات اور مثالیں `Linux` ماحول کے لیے ہیں، ٹرمینل کا بنیادی علم مددگار ثابت ہوگا۔
- `Geth` کے میٹرکس کے مجموعے کا یہ ویڈیو جائزہ دیکھیں: [Péter Szilágyi کی جانب سے ایتھیریم انفراسٹرکچر کی نگرانی](https://www.youtube.com/watch?v=cOBab8IJMYI)۔

## نگرانی کا اسٹیک {#monitoring-stack}

ایک ایتھیریم کلائنٹ بہت سا ڈیٹا اکٹھا کرتا ہے جسے کرونولوجیکل (تاریخ وار) ڈیٹا بیس کی شکل میں پڑھا جا سکتا ہے۔ نگرانی کو آسان بنانے کے لیے، آپ اسے ڈیٹا ویژولائزیشن سافٹ ویئر میں فیڈ کر سکتے ہیں۔ اس کے لیے کئی اختیارات دستیاب ہیں:

- [Prometheus](https://prometheus.io/) (پل ماڈل)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (پش ماڈل)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

اگر آپ Prometheus کو ترجیح دیتے ہیں، تو Geth اپنے میٹرکس کو Prometheus فارمیٹ میں بھی ظاہر کر سکتا ہے۔ Geth کو `--metrics --metrics.addr 127.0.0.1` کے ساتھ شروع کریں اور Prometheus کو `http://127.0.0.1:6060/debug/metrics/prometheus` پر پوائنٹ کریں۔

اس ٹیوٹوریل میں، ہم آپ کے Geth کلائنٹ کو InfluxDB میں ڈیٹا پش کرنے کے لیے سیٹ اپ کریں گے تاکہ ایک ڈیٹا بیس بنایا جا سکے اور Grafana کو ڈیٹا کی گراف ویژولائزیشن بنانے کے لیے استعمال کیا جا سکے۔ اسے دستی طور پر کرنے سے آپ کو اس عمل کو بہتر طور پر سمجھنے، اس میں تبدیلی کرنے، اور مختلف ماحول میں تعینات کرنے میں مدد ملے گی۔

## InfluxDB کو سیٹ اپ کرنا {#setting-up-influxdb}

سب سے پہلے، آئیے InfluxDB ڈاؤن لوڈ اور انسٹال کریں۔ یہ ٹیوٹوریل <span dir="ltr">InfluxDB 1.x (OSS)</span> استعمال کرتا ہے، جسے Geth ذیل میں دیے گئے `--metrics.influxdb` فلیگز کے ساتھ سپورٹ کرتا ہے۔ InfluxDB کے نئے ورژنز ڈیٹا بیسز اور صارفین کے بجائے تنظیموں، بکٹس اور ٹوکنز کے ساتھ ایک مختلف سیٹ اپ استعمال کرتے ہیں۔ Geth `--metrics.influxdbv2` فلیگز کے ساتھ <span dir="ltr">InfluxDB 2.x</span> کو سپورٹ کرتا ہے، لیکن اس ٹیوٹوریل میں سیٹ اپ کے مراحل صرف <span dir="ltr">1.x</span> پر لاگو ہوتے ہیں۔

اپنے ماحول کے لیے [<span dir="ltr">InfluxDB 1.x</span> کی انسٹالیشن کی ہدایات](https://docs.influxdata.com/influxdb/v1/introduction/install/) پر عمل کریں۔ مثال کے طور پر، Debian یا Ubuntu پر آپ اسے InfluxData ریپوزٹری سے انسٹال کر سکتے ہیں۔ کلید پر بھروسہ کرنے سے پہلے موجودہ سائننگ کلید کے فنگر پرنٹ کے لیے انسٹالیشن کی ہدایات چیک کریں:

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

`influxdb` پیکیج میں `influx` کمانڈ لائن کلائنٹ شامل ہے۔

InfluxDB کو کامیابی سے انسٹال کرنے کے بعد، یقینی بنائیں کہ یہ بیک گراؤنڈ میں چل رہا ہے۔ بذریعہ ڈیفالٹ، یہ `localhost:8086` پر قابل رسائی ہے۔
`influx` کلائنٹ استعمال کرنے سے پہلے، آپ کو ایڈمن مراعات کے ساتھ نیا صارف بنانا ہوگا۔ یہ صارف اعلیٰ سطح کے انتظام، ڈیٹا بیسز اور صارفین بنانے کے لیے کام کرے گا۔

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

اب آپ اس صارف کے ساتھ [InfluxDB شیل](https://docs.influxdata.com/influxdb/v1/tools/shell/) میں داخل ہونے کے لیے influx کلائنٹ استعمال کر سکتے ہیں۔

```sh
influx -username 'username' -password 'password'
```

اس کے شیل میں InfluxDB کے ساتھ براہ راست بات چیت کرتے ہوئے، آپ geth میٹرکس کے لیے ڈیٹا بیس اور صارف بنا سکتے ہیں۔

```sql
create database geth
create user geth with password '<geth-password>'
```

بنائی گئی اینٹریز کی تصدیق اس سے کریں:

```sql
show databases
show users
```

InfluxDB شیل سے باہر نکلیں۔

```
exit
```

InfluxDB چل رہا ہے اور Geth سے میٹرکس کو اسٹور کرنے کے لیے کنفیگر کیا گیا ہے۔

## Geth کی تیاری {#preparing-geth}

ڈیٹا بیس سیٹ اپ کرنے کے بعد، ہمیں Geth میں میٹرکس جمع کرنے کو فعال کرنے کی ضرورت ہے۔ `geth --help` میں `METRICS AND STATS OPTIONS` پر توجہ دیں۔ وہاں کئی اختیارات مل سکتے ہیں، اس صورت میں ہم چاہتے ہیں کہ Geth ڈیٹا کو InfluxDB میں پش کرے۔
بنیادی سیٹ اپ اس اینڈ پوائنٹ کی وضاحت کرتا ہے جہاں InfluxDB قابل رسائی ہے اور ڈیٹا بیس کے لیے توثیق فراہم کرتا ہے۔

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

وہی پاس ورڈ استعمال کریں جو آپ نے `geth` صارف بناتے وقت سیٹ کیا تھا۔ ان فلیگز کو کلائنٹ شروع کرنے والی کمانڈ کے ساتھ منسلک کیا جا سکتا ہے یا کنفیگریشن فائل میں محفوظ کیا جا سکتا ہے۔

آپ تصدیق کر سکتے ہیں کہ Geth کامیابی سے ڈیٹا پش کر رہا ہے، مثال کے طور پر ڈیٹا بیس میں میٹرکس کی فہرست بنا کر۔ InfluxDB شیل میں:

```sql
use geth
show measurements
```

## Grafana کو سیٹ اپ کرنا {#setting-up-grafana}

اگلا قدم Grafana کو انسٹال کرنا ہے جو ڈیٹا کی گرافیکل تشریح کرے گا۔ Grafana کی دستاویزات میں [اپنے ماحول کے لیے انسٹالیشن کے عمل](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) پر عمل کریں۔ یقینی بنائیں کہ آپ OSS ورژن انسٹال کریں جب تک کہ آپ کو کسی اور چیز کی ضرورت نہ ہو۔
Grafana ریپوزٹری کا استعمال کرتے ہوئے Debian یا Ubuntu کے لیے انسٹالیشن کے مراحل کی مثال:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

جب آپ Grafana کو چلا لیں، تو یہ `localhost:3000` پر قابل رسائی ہونا چاہیے۔
اس پاتھ تک رسائی کے لیے اپنا پسندیدہ براؤزر استعمال کریں، پھر ڈیفالٹ اسناد (صارف: `admin` اور پاس ورڈ: `admin`) کے ساتھ لاگ ان کریں۔ جب کہا جائے، تو ڈیفالٹ پاس ورڈ تبدیل کریں اور محفوظ کریں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 1)](./grafana1.png)

آپ کو Grafana کے ہوم پیج پر ری ڈائریکٹ کر دیا جائے گا۔ سب سے پہلے، اپنا سورس ڈیٹا سیٹ اپ کریں۔ مینو کھولیں اور **<span dir="ltr">Connections > Data sources</span>** کو منتخب کریں۔ اس ٹیوٹوریل میں موجود اسکرین شاٹس Grafana کے پرانے ورژن کے ہیں، اس لیے آپ کی اسکرینز تھوڑی مختلف لگ سکتی ہیں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 2)](./grafana2.png)

ابھی تک کوئی ڈیٹا سورس نہیں بنایا گیا ہے، ایک کی وضاحت کرنے کے لیے "Add data source" پر کلک کریں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 3)](./grafana3.png)

اس سیٹ اپ کے لیے، "InfluxDB" کو منتخب کریں اور آگے بڑھیں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 4)](./grafana4.png)

اگر آپ ایک ہی مشین پر ٹولز چلا رہے ہیں تو ڈیٹا سورس کی کنفیگریشن کافی سیدھی ہے۔ آپ کو ڈیٹا بیس تک رسائی کے لیے InfluxDB کا پتہ اور تفصیلات سیٹ کرنے کی ضرورت ہے۔ نیچے دی گئی تصویر کا حوالہ دیکھیں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 5)](./grafana5.png)

اگر سب کچھ مکمل ہو گیا ہے اور InfluxDB قابل رسائی ہے، تو "Save and test" پر کلک کریں اور تصدیق کے پاپ اپ ہونے کا انتظار کریں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 6)](./grafana6.png)

Grafana اب InfluxDB سے ڈیٹا پڑھنے کے لیے سیٹ اپ ہو گیا ہے۔ اب آپ کو ایک ڈیش بورڈ بنانے کی ضرورت ہے جو اس کی تشریح کرے گا اور اسے دکھائے گا۔ ڈیش بورڈز کی خصوصیات JSON فائلوں میں انکوڈ کی جاتی ہیں جنہیں کوئی بھی بنا سکتا ہے اور آسانی سے امپورٹ کیا جا سکتا ہے۔ مینو کھولیں اور **Dashboards** کو منتخب کریں، پھر **<span dir="ltr">New > Import</span>** پر کلک کریں۔

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 7)](./grafana7.png)

Geth کی نگرانی کے ڈیش بورڈ کے لیے، [اس ڈیش بورڈ](https://grafana.com/grafana/dashboards/13877/) کی ID کاپی کریں اور اسے Grafana میں "Import page" میں پیسٹ کریں۔ ڈیش بورڈ کو محفوظ کرنے کے بعد، یہ اس طرح نظر آنا چاہیے:

![Geth کی نگرانی کے لیے Grafana ڈیش بورڈ کا اسکرین شاٹ (پینل 8)](./grafana8.png)

آپ اپنے ڈیش بورڈز میں ترمیم کر سکتے ہیں۔ ہر پینل کو ایڈٹ کیا جا سکتا ہے، منتقل کیا جا سکتا ہے، ہٹایا جا سکتا ہے یا شامل کیا جا سکتا ہے۔ آپ اپنی کنفیگریشنز تبدیل کر سکتے ہیں۔ یہ آپ پر منحصر ہے! ڈیش بورڈز کیسے کام کرتے ہیں اس بارے میں مزید جاننے کے لیے، [Grafana کی دستاویزات](https://grafana.com/docs/grafana/latest/dashboards/) دیکھیں۔
آپ کو [الرٹنگ (Alerting)](https://grafana.com/docs/grafana/latest/alerting/) میں بھی دلچسپی ہو سکتی ہے۔ یہ آپ کو الرٹ نوٹیفیکیشنز سیٹ اپ کرنے کی سہولت دیتا ہے جب میٹرکس مخصوص اقدار تک پہنچ جائیں۔ مختلف مواصلاتی چینلز تعاون یافتہ ہیں۔
