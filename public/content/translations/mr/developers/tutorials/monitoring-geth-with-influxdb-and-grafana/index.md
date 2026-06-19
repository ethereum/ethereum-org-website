---
title: InfluxDB आणि Grafana सह Geth चे संनियंत्रण (Monitoring) करणे
description: कार्यप्रदर्शनाचा मागोवा घेण्यासाठी आणि समस्या ओळखण्यासाठी InfluxDB आणि Grafana वापरून तुमच्या Geth नोडसाठी संनियंत्रण (monitoring) सेट करा.
author: "मारिओ हॅवेल"
tags: ["क्लायंट्स", "नोड्स"]
skill: intermediate
breadcrumb: Geth चे संनियंत्रण करणे
lang: mr
published: 2021-01-13
---

हे ट्युटोरिअल तुम्हाला तुमच्या Geth नोडसाठी संनियंत्रण (monitoring) सेट करण्यात मदत करेल जेणेकरून तुम्ही त्याचे कार्यप्रदर्शन अधिक चांगल्या प्रकारे समजून घेऊ शकाल आणि संभाव्य समस्या ओळखू शकाल.

## पूर्वअटी {#prerequisites}

- तुम्ही आधीपासूनच Geth चा इन्स्टन्स चालवत असावा.
- बहुतेक पायऱ्या आणि उदाहरणे Linux वातावरणासाठी आहेत, टर्मिनलचे मूलभूत ज्ञान उपयुक्त ठरेल.
- Geth च्या मेट्रिक्सच्या संचाचा हा व्हिडिओ आढावा पहा: [पीटर सिलागी (Péter Szilágyi) द्वारे इथेरियम पायाभूत सुविधांचे संनियंत्रण](https://www.youtube.com/watch?v=cOBab8IJMYI).

## मॉनिटरिंग स्टॅक {#monitoring-stack}

इथेरियम क्लायंट भरपूर डेटा गोळा करतो जो कालक्रमानुसार डेटाबेसच्या स्वरूपात वाचला जाऊ शकतो. संनियंत्रण सोपे करण्यासाठी, तुम्ही हा डेटा व्हिज्युअलायझेशन सॉफ्टवेअरमध्ये फीड करू शकता. यासाठी अनेक पर्याय उपलब्ध आहेत:

- [Prometheus](https://prometheus.io/) (पुल मॉडेल)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (पुश मॉडेल)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

[Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) हा देखील एक पर्याय आहे, जो InfluxDB आणि Grafana सह पूर्व-कॉन्फिगर केलेला आहे.

या ट्युटोरिअलमध्ये, डेटाबेस तयार करण्यासाठी InfluxDB मध्ये डेटा पुश करण्यासाठी आणि डेटाचे आलेख व्हिज्युअलायझेशन तयार करण्यासाठी Grafana मध्ये डेटा पुश करण्यासाठी आम्ही तुमचा Geth क्लायंट सेट करू. हे मॅन्युअली केल्याने तुम्हाला प्रक्रिया अधिक चांगल्या प्रकारे समजून घेण्यास, त्यात बदल करण्यास आणि वेगवेगळ्या वातावरणात प्रस्थापित करण्यास (deploy) मदत होईल.

## InfluxDB सेट करणे {#setting-up-influxdb}

प्रथम, InfluxDB डाउनलोड आणि इन्स्टॉल करूया. डाउनलोडचे विविध पर्याय [Influxdata रिलीज पेजवर](https://portal.influxdata.com/downloads/) आढळू शकतात. तुमच्या वातावरणाला अनुकूल असा पर्याय निवडा.
तुम्ही ते [रिपॉझिटरीमधून](https://repos.influxdata.com/) देखील इन्स्टॉल करू शकता. उदाहरणार्थ Debian आधारित वितरणामध्ये:

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

InfluxDB यशस्वीरित्या इन्स्टॉल केल्यानंतर, ते बॅकग्राउंडमध्ये चालू असल्याची खात्री करा. डीफॉल्टनुसार, ते `localhost:8086` वर पोहोचण्यायोग्य आहे.
`influx` क्लायंट वापरण्यापूर्वी, तुम्हाला ॲडमिन विशेषाधिकारांसह नवीन वापरकर्ता तयार करावा लागेल. हा वापरकर्ता उच्च स्तरीय व्यवस्थापन, डेटाबेस आणि वापरकर्ते तयार करण्यासाठी काम करेल.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

आता तुम्ही या वापरकर्त्यासह [InfluxDB शेलमध्ये](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) प्रवेश करण्यासाठी influx क्लायंट वापरू शकता.

```
influx -username 'username' -password 'password'
```

InfluxDB च्या शेलमध्ये थेट संवाद साधून, तुम्ही geth मेट्रिक्ससाठी डेटाबेस आणि वापरकर्ता तयार करू शकता.

```
create database geth
create user geth with password choosepassword
```

तयार केलेल्या नोंदी यासह तपासा:

```
show databases
show users
```

InfluxDB शेलमधून बाहेर पडा.

```
exit
```

InfluxDB चालू आहे आणि Geth मधील मेट्रिक्स संचयित करण्यासाठी कॉन्फिगर केले आहे.

## Geth तयार करणे {#preparing-geth}

डेटाबेस सेट केल्यानंतर, आम्हाला Geth मध्ये मेट्रिक्स संकलन सक्षम करणे आवश्यक आहे. `geth --help` मधील `METRICS AND STATS OPTIONS` कडे लक्ष द्या. तेथे अनेक पर्याय आढळू शकतात, या प्रकरणात आम्हाला Geth ने InfluxDB मध्ये डेटा पुश करावा असे वाटते.
मूलभूत सेटअप एंडपॉइंट निर्दिष्ट करतो जेथे InfluxDB पोहोचण्यायोग्य आहे आणि डेटाबेससाठी प्रमाणीकरण (authentication) आहे.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

हे फ्लॅग्स क्लायंट सुरू करणाऱ्या कमांडला जोडले जाऊ शकतात किंवा कॉन्फिगरेशन फाइलमध्ये सेव्ह केले जाऊ शकतात.

तुम्ही Geth यशस्वीरित्या डेटा पुश करत असल्याची पडताळणी करू शकता, उदाहरणार्थ डेटाबेसमध्ये मेट्रिक्स सूचीबद्ध करून. InfluxDB शेलमध्ये:

```
use geth
show measurements
```

## Grafana सेट करणे {#setting-up-grafana}

पुढची पायरी Grafana इन्स्टॉल करणे आहे जे डेटाचे ग्राफिकरित्या स्पष्टीकरण करेल. Grafana दस्तऐवजीकरणामध्ये तुमच्या वातावरणासाठी इन्स्टॉलेशन प्रक्रियेचे अनुसरण करा. तुम्हाला अन्यथा नको असल्यास OSS आवृत्ती इन्स्टॉल करण्याची खात्री करा.
रिपॉझिटरी वापरून Debian वितरणांसाठी इन्स्टॉलेशनच्या पायऱ्यांचे उदाहरण:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

जेव्हा तुमचे Grafana चालू असेल, तेव्हा ते `localhost:3000` वर पोहोचण्यायोग्य असावे.
या मार्गावर प्रवेश करण्यासाठी तुमचा पसंतीचा ब्राउझर वापरा, त्यानंतर डीफॉल्ट क्रेडेन्शियल्ससह लॉग इन करा (वापरकर्ता: `admin` आणि पासवर्ड: `admin`). विचारले असता, डीफॉल्ट पासवर्ड बदला आणि सेव्ह करा.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

तुम्हाला Grafana च्या होम पेजवर पुनर्निर्देशित केले जाईल. प्रथम, तुमचा स्रोत डेटा सेट करा. डाव्या बारमधील कॉन्फिगरेशन आयकॉनवर क्लिक करा आणि "Data sources" निवडा.

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

अद्याप कोणतेही डेटा स्रोत तयार केलेले नाहीत, एक परिभाषित करण्यासाठी "Add data source" वर क्लिक करा.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

या सेटअपसाठी, "InfluxDB" निवडा आणि पुढे जा.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

जर तुम्ही एकाच मशीनवर टूल्स चालवत असाल तर डेटा स्रोत कॉन्फिगरेशन अगदी सोपे आहे. तुम्हाला डेटाबेसमध्ये प्रवेश करण्यासाठी InfluxDB पत्ता आणि तपशील सेट करणे आवश्यक आहे. खालील चित्राचा संदर्भ घ्या.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

जर सर्व काही पूर्ण झाले असेल आणि InfluxDB पोहोचण्यायोग्य असेल, तर "Save and test" वर क्लिक करा आणि पुष्टीकरण पॉप अप होण्याची प्रतीक्षा करा.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Grafana आता InfluxDB मधून डेटा वाचण्यासाठी सेट केले आहे. आता तुम्हाला एक डॅशबोर्ड तयार करणे आवश्यक आहे जो त्याचे स्पष्टीकरण करेल आणि प्रदर्शित करेल. डॅशबोर्डचे गुणधर्म JSON फाइल्समध्ये एन्कोड केलेले असतात जे कोणीही तयार करू शकतात आणि सहजपणे आयात (import) केले जाऊ शकतात. डाव्या बारवर, "Create and Import" वर क्लिक करा.

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Geth संनियंत्रण डॅशबोर्डसाठी, [या डॅशबोर्डचा](https://grafana.com/grafana/dashboards/13877/) ID कॉपी करा आणि Grafana मधील "Import page" मध्ये पेस्ट करा. डॅशबोर्ड सेव्ह केल्यानंतर, तो असा दिसायला हवा:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

तुम्ही तुमचे डॅशबोर्ड सुधारू शकता. प्रत्येक पॅनेल संपादित केले जाऊ शकते, हलवले जाऊ शकते, काढले जाऊ शकते किंवा जोडले जाऊ शकते. तुम्ही तुमचे कॉन्फिगरेशन बदलू शकता. हे तुमच्यावर अवलंबून आहे! डॅशबोर्ड कसे कार्य करतात याबद्दल अधिक जाणून घेण्यासाठी, [Grafana च्या दस्तऐवजीकरणाचा](https://grafana.com/docs/grafana/latest/dashboards/) संदर्भ घ्या.
तुम्हाला [अलर्टिंग (Alerting)](https://grafana.com/docs/grafana/latest/alerting/) मध्ये देखील स्वारस्य असू शकते. जेव्हा मेट्रिक्स विशिष्ट मूल्यांपर्यंत पोहोचतात तेव्हा हे तुम्हाला अलर्ट सूचना सेट करू देते. विविध संवाद माध्यमांना (communication channels) समर्थन दिले जाते.