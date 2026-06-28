---
title: "مراقبة ⁦Geth⁩ باستخدام ⁦InfluxDB⁩ و⁦Grafana⁩"
description: "إعداد المراقبة لعقدة ⁦Geth⁩ الخاصة بك باستخدام ⁦InfluxDB⁩ و⁦Grafana⁩ لتتبع الأداء وتحديد المشكلات."
author: "ماريو هافيل"
tags: ["العملاء", "العقد"]
skill: intermediate
breadcrumb: "مراقبة ⁦Geth⁩"
lang: ar
published: 2021-01-13
---

سيساعدك هذا البرنامج التعليمي على إعداد المراقبة لعقدة <span dir="ltr">Geth</span> الخاصة بك حتى تتمكن من فهم أدائها بشكل أفضل وتحديد المشكلات المحتملة.

## المتطلبات الأساسية {#prerequisites}

- يجب أن تكون تقوم بالفعل بتشغيل مثيل لـ <span dir="ltr">Geth</span>.
- معظم الخطوات والأمثلة مخصصة لبيئة <span dir="ltr">Linux</span>، وستكون المعرفة الأساسية بالطرفية (terminal) مفيدة.
- تحقق من نظرة عامة بالفيديو على مجموعة مقاييس <span dir="ltr">Geth</span>: [مراقبة البنية التحتية لإيثيريوم بواسطة <span dir="ltr">Péter Szilágyi</span>](https://www.youtube.com/watch?v=cOBab8IJMYI).

## حزمة المراقبة {#monitoring-stack}

يجمع عميل إيثيريوم الكثير من البيانات التي يمكن قراءتها في شكل قاعدة بيانات زمنية. لجعل المراقبة أسهل، يمكنك إدخال هذه البيانات في برنامج تصور البيانات. هناك خيارات متعددة متاحة:

- [<span dir="ltr">Prometheus</span>](https://prometheus.io/) (نموذج السحب)
- [<span dir="ltr">InfluxDB</span>](https://www.influxdata.com/get-influxdb/) (نموذج الدفع)
- [<span dir="ltr">Telegraf</span>](https://www.influxdata.com/get-influxdb/)
- [<span dir="ltr">Grafana</span>](https://www.grafana.com/)
- [<span dir="ltr">Datadog</span>](https://www.datadoghq.com/)
- [<span dir="ltr">Chronograf</span>](https://www.influxdata.com/time-series-platform/chronograf/)

هناك أيضًا [<span dir="ltr">Geth Prometheus Exporter</span>](https://github.com/hunterlong/gethexporter)، وهو خيار مُعد مسبقًا مع <span dir="ltr">InfluxDB</span> و<span dir="ltr">Grafana</span>.

في هذا البرنامج التعليمي، سنقوم بإعداد عميل <span dir="ltr">Geth</span> الخاص بك لدفع البيانات إلى <span dir="ltr">InfluxDB</span> لإنشاء قاعدة بيانات و<span dir="ltr">Grafana</span> لإنشاء تصور رسومي للبيانات. سيساعدك القيام بذلك يدويًا على فهم العملية بشكل أفضل، وتعديلها، ونشرها في بيئات مختلفة.

## إعداد InfluxDB {#setting-up-influxdb}

أولاً، دعنا نقوم بتنزيل وتثبيت <span dir="ltr">InfluxDB</span>. يمكن العثور على خيارات تنزيل مختلفة في [صفحة إصدارات <span dir="ltr">Influxdata</span>](https://portal.influxdata.com/downloads/). اختر الخيار الذي يناسب بيئتك.
يمكنك أيضًا تثبيته من [مستودع](https://repos.influxdata.com/). على سبيل المثال في التوزيعات المبنية على <span dir="ltr">Debian</span>:

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

بعد تثبيت <span dir="ltr">InfluxDB</span> بنجاح، تأكد من تشغيله في الخلفية. افتراضيًا، يمكن الوصول إليه على `localhost:8086`.
قبل استخدام عميل `influx`، يجب عليك إنشاء مستخدم جديد بامتيازات المسؤول. سيعمل هذا المستخدم للإدارة عالية المستوى، وإنشاء قواعد البيانات والمستخدمين.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

الآن يمكنك استخدام عميل <span dir="ltr">influx</span> للدخول إلى [صدفة <span dir="ltr">InfluxDB</span>](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) باستخدام هذا المستخدم.

```
influx -username 'username' -password 'password'
```

من خلال التواصل المباشر مع <span dir="ltr">InfluxDB</span> في الصدفة الخاصة به، يمكنك إنشاء قاعدة بيانات ومستخدم لمقاييس <span dir="ltr">geth</span>.

```
create database geth
create user geth with password choosepassword
```

تحقق من الإدخالات المنشأة باستخدام:

```
show databases
show users
```

اخرج من صدفة <span dir="ltr">InfluxDB</span>.

```
exit
```

يعمل <span dir="ltr">InfluxDB</span> الآن وهو مُكوّن لتخزين المقاييس من <span dir="ltr">Geth</span>.

## تجهيز Geth {#preparing-geth}

بعد إعداد قاعدة البيانات، نحتاج إلى تمكين جمع المقاييس في <span dir="ltr">Geth</span>. انتبه إلى `METRICS AND STATS OPTIONS` في `geth --help`. يمكن العثور على خيارات متعددة هناك، في هذه الحالة نريد من <span dir="ltr">Geth</span> دفع البيانات إلى <span dir="ltr">InfluxDB</span>.
يحدد الإعداد الأساسي نقطة النهاية (endpoint) التي يمكن الوصول إلى <span dir="ltr">InfluxDB</span> من خلالها والمصادقة لقاعدة البيانات.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

يمكن إلحاق هذه العلامات (flags) بأمر بدء تشغيل العميل أو حفظها في ملف التكوين.

يمكنك التحقق من أن <span dir="ltr">Geth</span> يدفع البيانات بنجاح، على سبيل المثال عن طريق سرد المقاييس في قاعدة البيانات. في صدفة <span dir="ltr">InfluxDB</span>:

```
use geth
show measurements
```

## إعداد Grafana {#setting-up-grafana}

الخطوة التالية هي تثبيت <span dir="ltr">Grafana</span> الذي سيقوم بتفسير البيانات رسوميًا. اتبع عملية التثبيت لبيئتك في وثائق <span dir="ltr">Grafana</span>. تأكد من تثبيت إصدار <span dir="ltr">OSS</span> إذا لم تكن ترغب في غير ذلك.
خطوات التثبيت كمثال لتوزيعات <span dir="ltr">Debian</span> باستخدام المستودع:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

عندما يكون <span dir="ltr">Grafana</span> قيد التشغيل، يجب أن يكون قابلاً للوصول على `localhost:3000`.
استخدم متصفحك المفضل للوصول إلى هذا المسار، ثم قم بتسجيل الدخول باستخدام بيانات الاعتماد الافتراضية (المستخدم: `admin` وكلمة المرور: `admin`). عند المطالبة، قم بتغيير كلمة المرور الافتراضية واحفظها.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

ستتم إعادة توجيهك إلى الصفحة الرئيسية لـ <span dir="ltr">Grafana</span>. أولاً، قم بإعداد بيانات المصدر الخاصة بك. انقر على أيقونة التكوين في الشريط الأيسر وحدد <span dir="ltr">"Data sources"</span> (مصادر البيانات).

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

لا توجد أي مصادر بيانات تم إنشاؤها بعد، انقر على <span dir="ltr">"Add data source"</span> (إضافة مصدر بيانات) لتحديد واحد.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

لهذا الإعداد، حدد <span dir="ltr">"InfluxDB"</span> وتابع.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

تكوين مصدر البيانات واضح ومباشر إذا كنت تقوم بتشغيل الأدوات على نفس الجهاز. تحتاج إلى تعيين عنوان <span dir="ltr">InfluxDB</span> والتفاصيل للوصول إلى قاعدة البيانات. راجع الصورة أدناه.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

إذا اكتمل كل شيء وكان <span dir="ltr">InfluxDB</span> قابلاً للوصول، انقر على <span dir="ltr">"Save and test"</span> (حفظ واختبار) وانتظر ظهور التأكيد.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

تم إعداد <span dir="ltr">Grafana</span> الآن لقراءة البيانات من <span dir="ltr">InfluxDB</span>. الآن تحتاج إلى إنشاء لوحة معلومات (dashboard) ستقوم بتفسيرها وعرضها. يتم تشفير خصائص لوحات المعلومات في ملفات <span dir="ltr">JSON</span> التي يمكن لأي شخص إنشاؤها واستيرادها بسهولة. في الشريط الأيسر، انقر على <span dir="ltr">"Create and Import"</span> (إنشاء واستيراد).

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

للحصول على لوحة معلومات مراقبة <span dir="ltr">Geth</span>، انسخ مُعرّف (ID) [لوحة المعلومات هذه](https://grafana.com/grafana/dashboards/13877/) والصقه في <span dir="ltr">"Import page"</span> (صفحة الاستيراد) في <span dir="ltr">Grafana</span>. بعد حفظ لوحة المعلومات، يجب أن تبدو هكذا:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

يمكنك تعديل لوحات المعلومات الخاصة بك. يمكن تحرير كل لوحة أو نقلها أو إزالتها أو إضافتها. يمكنك تغيير تكويناتك. الأمر متروك لك! لمعرفة المزيد حول كيفية عمل لوحات المعلومات، راجع [وثائق <span dir="ltr">Grafana</span>](https://grafana.com/docs/grafana/latest/dashboards/).
قد تكون مهتمًا أيضًا بـ [التنبيهات (Alerting)](https://grafana.com/docs/grafana/latest/alerting/). يتيح لك هذا إعداد إشعارات التنبيه عندما تصل المقاييس إلى قيم معينة. يتم دعم قنوات اتصال مختلفة.