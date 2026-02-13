---
title: "مراقبة Geth باستخدام InfluxDB وGrafana"
description: "إعداد المراقبة لعقدة Geth الخاصة بك باستخدام InfluxDB وGrafana لتتبع الأداء وتحديد المشكلات."
author: "Mario Havel"
tags: [ "العملاء", "العُقَد" ]
skill: intermediate
lang: ar
published: 2021-01-13
---

سيساعدك هذا البرنامج التعليمي على إعداد مراقبة لعقدة Geth الخاصة بك حتى تتمكن من فهم أدائها بشكل أفضل وتحديد المشكلات المحتملة.

## المتطلبات الأساسية {#prerequisites}

- يجب أن تكون بالفعل تشغل نسخة من Geth.
- معظم الخطوات والأمثلة مخصصة لبيئة لينكس، وستكون المعرفة الأساسية بالطرفية مفيدة.
- ألقِ نظرة على نظرة عامة الفيديو هذه على مجموعة مقاييس Geth: [مراقبة بنية إيثريوم التحتية بواسطة بيتر سيلاجي](https://www.youtube.com/watch?v=cOBab8IJMYI).

## حزمة المراقبة {#monitoring-stack}

يجمع عميل إيثريوم الكثير من البيانات التي يمكن قراءتها في شكل قاعدة بيانات مرتبة ترتيبًا زمنيًا. لتسهيل المراقبة، يمكنك إدخال هذه البيانات في برنامج لتصوير البيانات. هناك العديد من الخيارات المتاحة:

- [Prometheus](https://prometheus.io/) (نموذج السحب)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (نموذج الدفع)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

يوجد أيضًا [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter)، وهو خيار مهيأ مسبقًا مع InfluxDB وGrafana.

في هذا البرنامج التعليمي، سنقوم بإعداد عميل Geth الخاص بك لدفع البيانات إلى InfluxDB لإنشاء قاعدة بيانات وGrafana لإنشاء تصور بياني للبيانات. سيساعدك القيام بذلك يدويًا على فهم العملية بشكل أفضل، وتعديلها، ونشرها في بيئات مختلفة.

## إعداد InfluxDB {#setting-up-influxdb}

أولاً، لنقم بتنزيل InfluxDB وتثبيته. يمكن العثور على خيارات تنزيل متنوعة في [صفحة إصدار Influxdata](https://portal.influxdata.com/downloads/). اختر الخيار الذي يناسب بيئتك.
يمكنك أيضًا تثبيته من [مستودع](https://repos.influxdata.com/). على سبيل المثال في التوزيعات المبنية على Debian:

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

بعد تثبيت InfluxDB بنجاح، تأكد من أنه يعمل في الخلفية. افتراضيًا، يمكن الوصول إليه على `localhost:8086`.
قبل استخدام عميل `influx`، يجب عليك إنشاء مستخدم جديد بصلاحيات المسؤول. سيُستخدم هذا المستخدم للإدارة عالية المستوى، وإنشاء قواعد البيانات والمستخدمين.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

الآن يمكنك استخدام عميل influx للدخول إلى [shell InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) مع هذا المستخدم.

```
influx -username 'username' -password 'password'
```

بالتواصل مباشرة مع InfluxDB في shell الخاص به، يمكنك إنشاء قاعدة بيانات ومستخدم لمقاييس geth.

```
create database geth
create user geth with password choosepassword
```

تحقق من الإدخالات التي تم إنشاؤها باستخدام:

```
show databases
show users
```

اخرج من InfluxDB shell.

```
exit
```

يعمل InfluxDB الآن وهو مهيأ لتخزين المقاييس من Geth.

## إعداد Geth {#preparing-geth}

بعد إعداد قاعدة البيانات، نحتاج إلى تمكين جمع المقاييس في Geth. انتبه إلى `METRICS AND STATS OPTIONS` في `geth --help`. يمكن العثور على خيارات متعددة هناك، في هذه الحالة نريد أن يقوم Geth بدفع البيانات إلى InfluxDB.
يحدد الإعداد الأساسي نقطة النهاية حيث يمكن الوصول إلى InfluxDB والمصادقة الخاصة بقاعدة البيانات.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

يمكن إلحاق هذه العلامات بأمر بدء تشغيل العميل أو حفظها في ملف الإعدادات.

يمكنك التحقق من أن Geth يدفع البيانات بنجاح، على سبيل المثال عن طريق عرض المقاييس في قاعدة البيانات. في InfluxDB shell:

```
use geth
show measurements
```

## إعداد Grafana {#setting-up-grafana}

الخطوة التالية هي تثبيت Grafana الذي سيفسر البيانات بشكل بياني. اتبع عملية التثبيت الخاصة ببيئتك في توثيق Grafana. تأكد من تثبيت إصدار OSS إذا كنت لا ترغب في غير ذلك.
مثال على خطوات التثبيت لتوزيعات Debian باستخدام المستودع:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

عندما يعمل Grafana، يجب أن يكون قابلاً للوصول إليه على `localhost:3000`.
استخدم متصفحك المفضل للوصول إلى هذا المسار، ثم سجّل الدخول باستخدام بيانات الاعتماد الافتراضية (المستخدم: `admin` وكلمة المرور: `admin`). عندما يُطلب منك ذلك، قم بتغيير كلمة المرور الافتراضية واحفظها.

![](./grafana1.png)

سيتم إعادة توجيهك إلى الصفحة الرئيسية لـ Grafana. أولاً، قم بإعداد بيانات المصدر الخاصة بك. انقر على أيقونة الإعدادات في الشريط الأيسر وحدد \

![](./grafana2.png)

لم يتم إنشاء أي مصادر بيانات بعد، انقر على \

![](./grafana3.png)

لهذا الإعداد، حدد \

![](./grafana4.png)

إن إعداد مصدر البيانات أمر بسيط للغاية إذا كنت تشغل الأدوات على نفس الجهاز. تحتاج إلى تعيين عنوان InfluxDB وتفاصيل الوصول إلى قاعدة البيانات. راجع الصورة أدناه.

![](./grafana5.png)

إذا كان كل شيء مكتملاً وكان InfluxDB قابلاً للوصول، فانقر على \

![](./grafana6.png)

تم الآن إعداد Grafana لقراءة البيانات من InfluxDB. أنت الآن بحاجة إلى إنشاء لوحة معلومات تقوم بتفسير البيانات وعرضها. يتم ترميز خصائص لوحات المعلومات في ملفات JSON التي يمكن لأي شخص إنشاؤها واستيرادها بسهولة. في الشريط الأيسر، انقر على \

![](./grafana7.png)

للحصول على لوحة معلومات مراقبة Geth، انسخ معرّف [لوحة المعلومات هذه](https://grafana.com/grafana/dashboards/13877/) والصقه في \ بعد حفظ لوحة المعلومات، يجب أن تبدو هكذا:

![](./grafana8.png)

يمكنك تعديل لوحات المعلومات الخاصة بك. يمكن تحرير كل لوحة أو نقلها أو إزالتها أو إضافتها. يمكنك تغيير إعداداتك. الأمر متروك لك! لمعرفة المزيد حول كيفية عمل لوحات المعلومات، راجع [توثيق Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
قد تكون مهتمًا أيضًا بـ [التنبيه](https://grafana.com/docs/grafana/latest/alerting/). يتيح لك هذا إعداد إشعارات التنبيه عندما تصل المقاييس إلى قيم معينة. يتم دعم قنوات اتصال متنوعة.
