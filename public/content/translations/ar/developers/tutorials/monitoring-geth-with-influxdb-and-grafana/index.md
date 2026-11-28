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

يجمع عميل إيثيريوم الكثير من البيانات التي يمكن قراءتها في شكل قاعدة بيانات زمنية. لتسهيل المراقبة، يمكنك تغذية هذه البيانات في برنامج لتصور البيانات. هناك خيارات متعددة متاحة:

- [Prometheus](https://prometheus.io/) (نموذج السحب)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (نموذج الدفع)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

إذا كنت تفضل Prometheus، يمكن لـ Geth أيضًا عرض مقاييسه بتنسيق Prometheus. ابدأ تشغيل Geth باستخدام `--metrics --metrics.addr 127.0.0.1` ووجه Prometheus إلى `http://127.0.0.1:6060/debug/metrics/prometheus`.

في هذا البرنامج التعليمي، سنقوم بإعداد عميل Geth الخاص بك لدفع البيانات إلى InfluxDB لإنشاء قاعدة بيانات وGrafana لإنشاء تصور رسومي للبيانات. سيساعدك القيام بذلك يدويًا على فهم العملية بشكل أفضل، وتعديلها، ونشرها في بيئات مختلفة.

## إعداد InfluxDB {#setting-up-influxdb}

أولاً، دعنا نقوم بتنزيل وتثبيت InfluxDB. يستخدم هذا البرنامج التعليمي <span dir="ltr">InfluxDB 1.x (OSS)</span>، والذي يدعمه Geth باستخدام علامات `--metrics.influxdb` أدناه. تستخدم إصدارات InfluxDB الأحدث إعدادًا مختلفًا مع المؤسسات (organizations) والحاويات (buckets) والرموز (tokens) بدلاً من قواعد البيانات والمستخدمين. يدعم Geth إصدار <span dir="ltr">InfluxDB 2.x</span> باستخدام علامات `--metrics.influxdbv2`، ولكن خطوات الإعداد في هذا البرنامج التعليمي تنطبق فقط على <span dir="ltr">1.x</span>.

اتبع [إرشادات تثبيت <span dir="ltr">InfluxDB 1.x</span>](https://docs.influxdata.com/influxdb/v1/introduction/install/) لبيئتك. على سبيل المثال، في Debian أو Ubuntu يمكنك تثبيته من مستودع InfluxData. تحقق من إرشادات التثبيت لمعرفة بصمة مفتاح التوقيع الحالية قبل الوثوق بالمفتاح:

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

تتضمن حزمة `influxdb` عميل سطر الأوامر `influx`.

بعد تثبيت InfluxDB بنجاح، تأكد من تشغيله في الخلفية. افتراضيًا، يمكن الوصول إليه على `localhost:8086`.
قبل استخدام عميل `influx`، يجب عليك إنشاء مستخدم جديد بامتيازات المسؤول. سيعمل هذا المستخدم للإدارة عالية المستوى، وإنشاء قواعد البيانات والمستخدمين.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

الآن يمكنك استخدام عميل influx للدخول إلى [صدفة InfluxDB](https://docs.influxdata.com/influxdb/v1/tools/shell/) باستخدام هذا المستخدم.

```sh
influx -username 'username' -password 'password'
```

من خلال التواصل المباشر مع InfluxDB في الصدفة الخاصة به، يمكنك إنشاء قاعدة بيانات ومستخدم لمقاييس geth.

```sql
create database geth
create user geth with password '<geth-password>'
```

تحقق من الإدخالات التي تم إنشاؤها باستخدام:

```sql
show databases
show users
```

اخرج من صدفة InfluxDB.

```
exit
```

يعمل InfluxDB الآن وهو مكوّن لتخزين المقاييس من Geth.

## تجهيز Geth {#preparing-geth}

بعد إعداد قاعدة البيانات، نحتاج إلى تمكين جمع المقاييس في Geth. انتبه إلى `METRICS AND STATS OPTIONS` في `geth --help`. يمكن العثور على خيارات متعددة هناك، وفي هذه الحالة نريد من Geth دفع البيانات إلى InfluxDB.
يحدد الإعداد الأساسي نقطة النهاية التي يمكن الوصول إلى InfluxDB من خلالها والمصادقة لقاعدة البيانات.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

استخدم نفس كلمة المرور التي قمت بتعيينها عند إنشاء المستخدم `geth`. يمكن إلحاق هذه العلامات بأمر بدء تشغيل العميل أو حفظها في ملف التكوين.

يمكنك التحقق من أن Geth يقوم بدفع البيانات بنجاح، على سبيل المثال عن طريق سرد المقاييس في قاعدة البيانات. في صدفة InfluxDB:

```sql
use geth
show measurements
```

## إعداد Grafana {#setting-up-grafana}

الخطوة التالية هي تثبيت Grafana الذي سيقوم بتفسير البيانات رسوميًا. اتبع [عملية التثبيت لبيئتك](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) في وثائق Grafana. تأكد من تثبيت إصدار OSS ما لم تكن بحاجة إلى شيء آخر.
مثال على خطوات التثبيت لـ Debian أو Ubuntu باستخدام مستودع Grafana:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

عندما يعمل Grafana، يجب أن يكون قابلاً للوصول على `localhost:3000`.
استخدم متصفحك المفضل للوصول إلى هذا المسار، ثم قم بتسجيل الدخول باستخدام بيانات الاعتماد الافتراضية (المستخدم: `admin` وكلمة المرور: `admin`). عند المطالبة، قم بتغيير كلمة المرور الافتراضية واحفظها.

![لقطة شاشة للوحة تحكم Grafana لمراقبة Geth (اللوحة 1)](./grafana1.png)

ستتم إعادة توجيهك إلى الصفحة الرئيسية لـ Grafana. أولاً، قم بإعداد بيانات المصدر الخاصة بك. افتح القائمة وحدد <span dir="ltr">**Connections > Data sources**</span>. لقطات الشاشة في هذا البرنامج التعليمي مأخوذة من إصدار أقدم من Grafana، لذلك قد تبدو شاشاتك مختلفة قليلاً.

![لقطة شاشة للوحة تحكم Grafana لمراقبة Geth (اللوحة 2)](./grafana2.png)

لا توجد أي مصادر بيانات تم إنشاؤها بعد، انقر على "Add data source" لتحديد واحد.

![لقطة شاشة للوحة تحكم Grafana لمراقبة Geth (اللوحة 3)](./grafana3.png)

لهذا الإعداد، حدد "InfluxDB" وتابع.

![لقطة شاشة للوحة تحكم Grafana لمراقبة Geth (اللوحة 4)](./grafana4.png)

تكوين مصدر البيانات بسيط للغاية إذا كنت تقوم بتشغيل الأدوات على نفس الجهاز. تحتاج إلى تعيين عنوان InfluxDB والتفاصيل للوصول إلى قاعدة البيانات. راجع الصورة أدناه.

![لقطة شاشة للوحة تحكم Grafana لمراقبة Geth (اللوحة 5)](./grafana5.png)

إذا اكتمل كل شيء وكان InfluxDB قابلاً للوصول، انقر على "Save and test" وانتظر ظهور التأكيد.

![لقطة شاشة للوحة تحكم Grafana لمراقبة Geth (اللوحة 6)](./grafana6.png)

تم إعداد Grafana الآن لقراءة البيانات من InfluxDB. الآن تحتاج إلى إنشاء لوحة تحكم ستقوم بتفسيرها وعرضها. يتم تشفير خصائص لوحات التحكم في ملفات JSON التي يمكن لأي شخص إنشاؤها واستيرادها بسهولة. افتح القائمة وحدد **Dashboards**، ثم انقر على <span dir="ltr">**New > Import**</span>.

![لقطة شاشة للوحة تحكم Grafana لمراقبة Geth (اللوحة 7)](./grafana7.png)

للحصول على لوحة تحكم مراقبة Geth، انسخ معرف [لوحة التحكم هذه](https://grafana.com/grafana/dashboards/13877/) والصقه في "Import page" في Grafana. بعد حفظ لوحة التحكم، يجب أن تبدو هكذا:

![لقطة شاشة للوحة تحكم Grafana لمراقبة Geth (اللوحة 8)](./grafana8.png)

يمكنك تعديل لوحات التحكم الخاصة بك. يمكن تحرير كل لوحة أو نقلها أو إزالتها أو إضافتها. يمكنك تغيير تكويناتك. الأمر متروك لك! لمعرفة المزيد حول كيفية عمل لوحات التحكم، راجع [وثائق Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
قد تكون مهتمًا أيضًا بـ [التنبيهات (Alerting)](https://grafana.com/docs/grafana/latest/alerting/). يتيح لك هذا إعداد إشعارات التنبيه عندما تصل المقاييس إلى قيم معينة. يتم دعم قنوات اتصال مختلفة.
