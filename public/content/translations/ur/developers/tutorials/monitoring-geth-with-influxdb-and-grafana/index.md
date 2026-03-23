---
title: "InfluxDB اور Grafana کے ساتھ Geth کی نگرانی"
description: "کارکردگی کو ٹریک کرنے اور مسائل کی شناخت کرنے کے لیے InfluxDB اور Grafana کا استعمال کرتے ہوئے اپنے Geth نوڈ کے لیے نگرانی سیٹ اپ کریں۔"
author: "Mario Havel"
tags: [ "کلائنٹس", "نوڈز" ]
skill: intermediate
lang: ur-in
published: 2021-01-13
---

یہ ٹیوٹوریل آپ کو اپنے Geth نوڈ کے لیے نگرانی سیٹ اپ کرنے میں مدد کرے گا تاکہ آپ اس کی کارکردگی کو بہتر طور پر سمجھ سکیں اور ممکنہ مسائل کی شناخت کر سکیں۔

## شرائط {#prerequisites}

- آپ کو پہلے سے ہی Geth کا ایک انسٹنس چلا رہے ہونا چاہئے۔
- زیادہ تر اقدامات اور مثالیں linux ماحول کے لیے ہیں، بنیادی ٹرمینل کا علم مددگار ثابت ہوگا۔
- Geth کے میٹرکس کے سوٹ کا یہ ویڈیو جائزہ دیکھیں: [Péter Szilágyi کے ذریعہ ایک Ethereum انفراسٹرکچر کی نگرانی](https://www.youtube.com/watch?v=cOBab8IJMYI)۔

## نگرانی کا اسٹیک {#monitoring-stack}

ایک Ethereum کلائنٹ بہت سارا ڈیٹا اکٹھا کرتا ہے جسے ایک کرونولوجیکل ڈیٹا بیس کی شکل میں پڑھا جا سکتا ہے۔ نگرانی کو آسان بنانے کے لیے، آپ اسے ڈیٹا ویژولائزیشن سافٹ ویئر میں فیڈ کر سکتے ہیں۔ متعدد اختیارات دستیاب ہیں:

- [Prometheus](https://prometheus.io/) (pull model)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (push model)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

[Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) بھی ہے، جو InfluxDB اور Grafana کے ساتھ پہلے سے کنفیگر کیا گیا ایک آپشن ہے۔

اس ٹیوٹوریل میں، ہم آپ کے Geth کلائنٹ کو ایک ڈیٹا بیس بنانے کے لیے InfluxDB میں ڈیٹا پش کرنے کے لیے، اور ڈیٹا کا گراف ویژولائزیشن بنانے کے لیے Grafana کے لیے سیٹ اپ کریں گے۔ اسے دستی طور پر کرنے سے آپ کو اس عمل کو بہتر طور پر سمجھنے، اس میں تبدیلی کرنے، اور مختلف ماحول میں اسے ڈیپلائے کرنے میں مدد ملے گی۔

## InfluxDB سیٹ اپ کرنا {#setting-up-influxdb}

سب سے پہلے، آئیے InfluxDB کو ڈاؤن لوڈ اور انسٹال کریں۔ ڈاؤن لوڈ کے مختلف اختیارات [Influxdata ریلیز پیج](https://portal.influxdata.com/downloads/) پر مل سکتے ہیں۔ اپنے ماحول کے مطابق ایک کا انتخاب کریں۔
آپ اسے ایک [ریپوزٹری](https://repos.influxdata.com/) سے بھی انسٹال کر سکتے ہیں۔ مثال کے طور پر Debian پر مبنی ڈسٹری بیوشن میں:

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

InfluxDB کو کامیابی سے انسٹال کرنے کے بعد، یقینی بنائیں کہ یہ بیک گراؤنڈ میں چل رہا ہے۔ ڈیفالٹ کے طور پر، یہ `localhost:8086` پر قابل رسائی ہے۔
`influx` کلائنٹ استعمال کرنے سے پہلے، آپ کو ایڈمن مراعات کے ساتھ ایک نیا صارف بنانا ہوگا۔ یہ صارف اعلیٰ سطح کے انتظام، ڈیٹا بیس اور صارفین بنانے کے لیے کام کرے گا۔

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

اب آپ اس صارف کے ساتھ [InfluxDB شیل](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) میں داخل ہونے کے لیے influx کلائنٹ کا استعمال کر سکتے ہیں۔

```
influx -username 'username' -password 'password'
```

اس کے شیل میں InfluxDB کے ساتھ براہ راست بات چیت کرتے ہوئے، آپ geth میٹرکس کے لیے ڈیٹا بیس اور صارف بنا سکتے ہیں۔

```
create database geth
create user geth with password choosepassword
```

تخلیق شدہ اندراجات کی تصدیق کریں:

```
show databases
show users
```

InfluxDB شیل چھوڑ دیں۔

```
exit
```

InfluxDB چل رہا ہے اور Geth سے میٹرکس کو اسٹور کرنے کے لیے کنفیگر کیا گیا ہے۔

## Geth کی تیاری {#preparing-geth}

ڈیٹا بیس سیٹ اپ کرنے کے بعد، ہمیں Geth میں میٹرکس کلیکشن کو فعال کرنے کی ضرورت ہے۔ `geth --help` میں `METRICS AND STATS OPTIONS` پر دھیان دیں۔ وہاں متعدد اختیارات مل سکتے ہیں، اس معاملے میں ہم چاہتے ہیں کہ Geth، InfluxDB میں ڈیٹا پش کرے۔
بنیادی سیٹ اپ اس اینڈ پوائنٹ کی وضاحت کرتا ہے جہاں InfluxDB قابل رسائی ہے اور ڈیٹا بیس کے لیے توثیق۔

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

یہ فلیگس کلائنٹ کو شروع کرنے والے کمانڈ میں شامل کیے جا سکتے ہیں یا کنفیگریشن فائل میں محفوظ کیے جا سکتے ہیں۔

آپ تصدیق کر سکتے ہیں کہ Geth کامیابی سے ڈیٹا پش کر رہا ہے، مثال کے طور پر ڈیٹا بیس میں میٹرکس کی فہرست بنا کر۔ InfluxDB شیل میں:

```
use geth
show measurements
```

## Grafana سیٹ اپ کرنا {#setting-up-grafana}

اگلا مرحلہ Grafana کو انسٹال کرنا ہے جو ڈیٹا کو گرافیکل طور پر بیان کرے گا۔ Grafana دستاویزات میں اپنے ماحول کے لیے انسٹالیشن کے عمل پر عمل کریں۔ اگر آپ دوسری صورت میں نہیں چاہتے ہیں تو OSS ورژن انسٹال کرنا یقینی بنائیں۔
ریپوزٹری کا استعمال کرتے ہوئے Debian ڈسٹری بیوشنز کے لیے انسٹالیشن کے مثال کے اقدامات:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

جب آپ Grafana چلا رہے ہوں، تو اسے `localhost:3000` پر قابل رسائی ہونا چاہئے۔
اس پاتھ تک رسائی کے لیے اپنا پسندیدہ براؤزر استعمال کریں، پھر ڈیفالٹ اسناد (صارف: `admin` اور پاس ورڈ: `admin`) کے ساتھ لاگ ان کریں۔ جب کہا جائے تو ڈیفالٹ پاس ورڈ تبدیل کریں اور محفوظ کریں۔

![](./grafana1.png)

آپ کو Grafana کے ہوم پیج پر ری ڈائریکٹ کر دیا جائے گا۔ سب سے پہلے، اپنا سورس ڈیٹا سیٹ اپ کریں۔ بائیں بار میں کنفیگریشن آئیکن پر کلک کریں اور "Data sources" منتخب کریں۔

![](./grafana2.png)

ابھی تک کوئی ڈیٹا سورس نہیں بنایا گیا ہے، ایک کی وضاحت کرنے کے لیے "Add data source" پر کلک کریں۔

![](./grafana3.png)

اس سیٹ اپ کے لیے، "InfluxDB" منتخب کریں اور آگے بڑھیں۔

![](./grafana4.png)

اگر آپ ایک ہی مشین پر ٹولز چلا رہے ہیں تو ڈیٹا سورس کنفیگریشن کافی سیدھا ہے۔ آپ کو ڈیٹا بیس تک رسائی کے لیے InfluxDB ایڈریس اور تفصیلات سیٹ کرنے کی ضرورت ہے۔ نیچے دی گئی تصویر دیکھیں۔

![](./grafana5.png)

اگر سب کچھ مکمل ہے اور InfluxDB قابل رسائی ہے، تو "Save and test" پر کلک کریں اور تصدیق کے پاپ اپ ہونے کا انتظار کریں۔

![](./grafana6.png)

Grafana اب InfluxDB سے ڈیٹا پڑھنے کے لیے سیٹ اپ ہے۔ اب آپ کو ایک ڈیش بورڈ بنانے کی ضرورت ہے جو اس کی تشریح اور اسے ظاہر کرے گا۔ ڈیش بورڈز کی خصوصیات JSON فائلوں میں انکوڈ کی جاتی ہیں جنہیں کوئی بھی بنا سکتا ہے اور آسانی سے امپورٹ کیا جا سکتا ہے۔ بائیں بار پر، "Create and Import" پر کلک کریں۔

![](./grafana7.png)

Geth مانیٹرنگ ڈیش بورڈ کے لیے، [اس ڈیش بورڈ](https://grafana.com/grafana/dashboards/13877/) کی ID کاپی کریں اور اسے Grafana میں "Import page" میں پیسٹ کریں۔ ڈیش بورڈ کو محفوظ کرنے کے بعد، یہ اس طرح نظر آنا چاہئے:

![](./grafana8.png)

آپ اپنے ڈیش بورڈز میں ترمیم کر سکتے ہیں۔ ہر پینل کو ایڈٹ کیا، منتقل کیا، ہٹایا یا شامل کیا جا سکتا ہے۔ آپ اپنی کنفیگریشنز کو تبدیل کر سکتے ہیں۔ یہ آپ پر منحصر ہے! ڈیش بورڈز کیسے کام کرتے ہیں اس کے بارے میں مزید جاننے کے لیے، [Grafana کی دستاویزات](https://grafana.com/docs/grafana/latest/dashboards/) سے رجوع کریں۔
آپ کو [Alerting](https://grafana.com/docs/grafana/latest/alerting/) میں بھی دلچسپی ہو سکتی ہے۔ یہ آپ کو اس وقت کے لیے الرٹ نوٹیفکیشنز سیٹ اپ کرنے دیتا ہے جب میٹرکس کچھ خاص ویلیوز تک پہنچ جاتے ہیں۔ مختلف کمیونیکیشن چینلز معاون ہیں۔
