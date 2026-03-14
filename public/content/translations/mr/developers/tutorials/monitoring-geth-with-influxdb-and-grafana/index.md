---
title: "InfluxDB आणि Grafana वापरून Geth चे निरीक्षण करणे"
description: "कार्यप्रदर्शनाचा मागोवा घेण्यासाठी आणि समस्या ओळखण्यासाठी InfluxDB आणि Grafana वापरून तुमच्या Geth नोडसाठी देखरेख प्रणाली सेट करा."
author: "Mario Havel"
tags: [ "क्लायंट्स", "नोड्स" ]
skill: intermediate
lang: mr
published: 2021-01-13
---

हे ट्युटोरियल तुम्हाला तुमच्या Geth नोडसाठी देखरेख प्रणाली सेट करण्यात मदत करेल जेणेकरून तुम्ही त्याच्या कार्यप्रदर्शनास अधिक चांगल्या प्रकारे समजू शकाल आणि संभाव्य समस्या ओळखू शकाल.

## पूर्वतयारी {#prerequisites}

- तुम्ही आधीपासूनच Geth चे एक इन्स्टन्स चालवत असले पाहिजे.
- बहुतेक पायऱ्या आणि उदाहरणे लिनक्स वातावरणासाठी आहेत, मूलभूत टर्मिनल ज्ञान उपयुक्त ठरेल.
- Geth च्या मेट्रिक्सच्या संचाचा हा व्हिडिओ आढावा पहा: [पीटर सिझिलागी द्वारे इथेरियम इन्फ्रास्ट्रक्चरचे निरीक्षण](https://www.youtube.com/watch?v=cOBab8IJMYI).

## निरीक्षण स्टॅक {#monitoring-stack}

एक इथेरियम क्लायंट खूप डेटा गोळा करतो जो कालानुक्रमे डेटाबेसच्या स्वरूपात वाचला जाऊ शकतो. निरीक्षण सोपे करण्यासाठी, तुम्ही हे डेटा व्हिज्युअलायझेशन सॉफ्टवेअरमध्ये फीड करू शकता. अनेक पर्याय उपलब्ध आहेत:

- [Prometheus](https://prometheus.io/) (पुल मॉडेल)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (पुश मॉडेल)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

[Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) हा देखील एक पर्याय आहे, जो InfluxDB आणि Grafana सह पूर्व-कॉन्फिगर केलेला आहे.

या ट्युटोरियलमध्ये, आम्ही तुमचा Geth क्लायंट डेटाबेस तयार करण्यासाठी InfluxDB वर डेटा पुश करण्यासाठी आणि डेटाचे ग्राफ व्हिज्युअलायझेशन तयार करण्यासाठी Grafana सेट करू. हे स्वतः केल्याने तुम्हाला प्रक्रिया अधिक चांगल्या प्रकारे समजून घेण्यास, त्यात बदल करण्यास आणि वेगवेगळ्या वातावरणात तैनात करण्यास मदत होईल.

## InfluxDB सेट करणे {#setting-up-influxdb}

प्रथम, InfluxDB डाउनलोड आणि इन्स्टॉल करूया. [Influxdata रिलीज पेज](https://portal.influxdata.com/downloads/) वर विविध डाउनलोड पर्याय आढळू शकतात. तुमच्या वातावरणास अनुकूल असलेला पर्याय निवडा.
तुम्ही ते [रिपॉझिटरी](https://repos.influxdata.com/) मधून देखील इन्स्टॉल करू शकता. उदाहरणार्थ, डेबियन आधारित डिस्ट्रिब्युशनमध्ये:

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

InfluxDB यशस्वीरित्या इन्स्टॉल केल्यानंतर, ते बॅकग्राउंडमध्ये चालू असल्याची खात्री करा. डीफॉल्टनुसार, ते `localhost:8086` वर उपलब्ध आहे.
`influx` क्लायंट वापरण्यापूर्वी, तुम्हाला प्रशासकीय अधिकारांसह नवीन वापरकर्ता तयार करावा लागेल. हा वापरकर्ता उच्च-स्तरीय व्यवस्थापन, डेटाबेस आणि वापरकर्ते तयार करण्यासाठी काम करेल.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

आता तुम्ही या वापरकर्त्यासह [InfluxDB शेल](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) मध्ये प्रवेश करण्यासाठी influx क्लायंट वापरू शकता.

```
influx -username 'username' -password 'password'
```

त्याच्या शेलमध्ये InfluxDB शी थेट संवाद साधून, तुम्ही geth मेट्रिक्ससाठी डेटाबेस आणि वापरकर्ता तयार करू शकता.

```
create database geth
create user geth with password choosepassword
```

तयार केलेल्या नोंदी सत्यापित करा:

```
show databases
show users
```

InfluxDB शेलमधून बाहेर पडा.

```
exit
```

InfluxDB चालू आहे आणि Geth मधील मेट्रिक्स संग्रहित करण्यासाठी कॉन्फिगर केलेले आहे.

## Geth तयार करणे {#preparing-geth}

डेटाबेस सेट केल्यानंतर, आम्हाला Geth मध्ये मेट्रिक्स संकलन सक्षम करणे आवश्यक आहे. `geth --help` मधील `METRICS AND STATS OPTIONS` कडे लक्ष द्या. तेथे अनेक पर्याय आढळू शकतात, या प्रकरणात आम्हाला Geth ने InfluxDB मध्ये डेटा पुश करावा असे वाटते.
मूलभूत सेटअपमध्ये एंडपॉइंट निर्दिष्ट केला जातो जिथे InfluxDB पोहोचू शकते आणि डेटाबेससाठी ऑथेंटिकेशन निर्दिष्ट केले जाते.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

हे फ्लॅग्स क्लायंट सुरू करणाऱ्या कमांडला जोडले जाऊ शकतात किंवा कॉन्फिगरेशन फाईलमध्ये सेव्ह केले जाऊ शकतात.

Geth यशस्वीरित्या डेटा पुश करत आहे हे तुम्ही सत्यापित करू शकता, उदाहरणार्थ डेटाबेसमध्ये मेट्रिक्सची यादी करून. InfluxDB शेलमध्ये:

```
use geth
show measurements
```

## Grafana सेट करणे {#setting-up-grafana}

पुढील पायरी म्हणजे Grafana इन्स्टॉल करणे, जे डेटाचे ग्राफिकली विश्लेषण करेल. Grafana डॉक्युमेंटेशनमध्ये तुमच्या वातावरणासाठी इन्स्टॉलेशन प्रक्रिया फॉलो करा. तुम्हाला अन्यथा नको असल्यास OSS आवृत्ती इन्स्टॉल केल्याची खात्री करा.
रिपॉझिटरी वापरून डेबियन डिस्ट्रिब्युशनसाठी उदाहरणादाखल इन्स्टॉलेशन पायऱ्या:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

जेव्हा तुम्ही Grafana चालू कराल, तेव्हा ते `localhost:3000` वर उपलब्ध असले पाहिजे.
या मार्गावर प्रवेश करण्यासाठी तुमचा पसंतीचा ब्राउझर वापरा, नंतर डीफॉल्ट क्रेडेन्शियलसह लॉग इन करा (वापरकर्ता: `admin` आणि पासवर्ड: `admin`). सूचित केल्यावर, डीफॉल्ट पासवर्ड बदला आणि सेव्ह करा.

![](./grafana1.png)

तुम्हाला Grafana होम पेजवर पुनर्निर्देशित केले जाईल. प्रथम, तुमचा स्त्रोत डेटा सेट करा. डाव्या पट्टीतील कॉन्फिगरेशन आयकॉनवर क्लिक करा आणि "Data sources" निवडा.

![](./grafana2.png)

अद्याप कोणताही डेटा स्रोत तयार केलेला नाही, एक परिभाषित करण्यासाठी "Add data source" वर क्लिक करा.

![](./grafana3.png)

या सेटअपसाठी, "InfluxDB" निवडा आणि पुढे जा.

![](./grafana4.png)

जर तुम्ही एकाच मशीनवर साधने चालवत असाल तर डेटा स्रोत कॉन्फिगरेशन अगदी सोपे आहे. तुम्हाला InfluxDB पत्ता आणि डेटाबेसमध्ये प्रवेश करण्यासाठी तपशील सेट करणे आवश्यक आहे. खालील चित्राचा संदर्भ घ्या.

![](./grafana5.png)

जर सर्व काही पूर्ण झाले असेल आणि InfluxDB पोहोचण्यायोग्य असेल, तर "Save and test" वर क्लिक करा आणि पुष्टीकरण पॉप अप होण्याची प्रतीक्षा करा.

![](./grafana6.png)

Grafana आता InfluxDB मधून डेटा वाचण्यासाठी सेट केले आहे. आता तुम्हाला एक डॅशबोर्ड तयार करण्याची आवश्यकता आहे जो त्याचे विश्लेषण करेल आणि प्रदर्शित करेल. डॅशबोर्डचे गुणधर्म JSON फाईल्समध्ये एन्कोड केलेले आहेत जे कोणीही तयार करू शकतात आणि सहजपणे आयात करू शकतात. डाव्या पट्टीवर, "Create and Import" वर क्लिक करा.

![](./grafana7.png)

Geth मॉनिटरिंग डॅशबोर्डसाठी, [या डॅशबोर्डचा](https://grafana.com/grafana/dashboards/13877/) ID कॉपी करा आणि तो Grafana मधील "Import page" मध्ये पेस्ट करा. डॅशबोर्ड सेव्ह केल्यानंतर, तो असा दिसला पाहिजे:

![](./grafana8.png)

तुम्ही तुमचे डॅशबोर्ड सुधारित करू शकता. प्रत्येक पॅनेल संपादित, हलवले, काढले किंवा जोडले जाऊ शकते. तुम्ही तुमची कॉन्फिगरेशन बदलू शकता. हे तुमच्यावर अवलंबून आहे! डॅशबोर्ड कसे कार्य करतात याबद्दल अधिक जाणून घेण्यासाठी, [Grafana च्या डॉक्युमेंटेशनचा](https://grafana.com/docs/grafana/latest/dashboards/) संदर्भ घ्या.
तुम्हाला [Alerting](https://grafana.com/docs/grafana/latest/alerting/) मध्ये देखील स्वारस्य असू शकते. हे तुम्हाला मेट्रिक्स विशिष्ट मूल्यांपर्यंत पोहोचल्यावर अलर्ट सूचना सेट करण्याची परवानगी देते. विविध संप्रेषण चॅनेल समर्थित आहेत.
