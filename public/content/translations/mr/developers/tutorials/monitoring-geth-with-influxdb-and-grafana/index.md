---
title: "InfluxDB आणि Grafana सह Geth चे संनियंत्रण (Monitoring) करणे"
description: "कार्यप्रदर्शनाचा मागोवा घेण्यासाठी आणि समस्या ओळखण्यासाठी InfluxDB आणि Grafana वापरून तुमच्या Geth नोडसाठी संनियंत्रण (monitoring) सेट करा."
author: "मारिओ हॅवेल"
tags: ["क्लायंट्स", "नोड्स"]
skill: intermediate
breadcrumb: "Geth चे संनियंत्रण करणे"
lang: mr
published: 2021-01-13
---

हे ट्युटोरिअल तुम्हाला तुमच्या Geth नोडसाठी संनियंत्रण (monitoring) सेट करण्यात मदत करेल जेणेकरून तुम्ही त्याचे कार्यप्रदर्शन अधिक चांगल्या प्रकारे समजून घेऊ शकाल आणि संभाव्य समस्या ओळखू शकाल.

## पूर्वअटी {#prerequisites}

- तुम्ही आधीपासूनच Geth चा इन्स्टन्स चालवत असावा.
- बहुतेक पायऱ्या आणि उदाहरणे Linux वातावरणासाठी आहेत, टर्मिनलचे मूलभूत ज्ञान उपयुक्त ठरेल.
- Geth च्या मेट्रिक्सच्या संचाचा हा व्हिडिओ आढावा पहा: [पीटर सिलागी (Péter Szilágyi) द्वारे इथेरियम पायाभूत सुविधांचे संनियंत्रण](https://www.youtube.com/watch?v=cOBab8IJMYI).

## संनियंत्रण स्टॅक (Monitoring stack) {#monitoring-stack}

इथेरियम क्लायंट भरपूर डेटा गोळा करतो जो कालक्रमानुसार (chronological) डेटाबेसच्या स्वरूपात वाचला जाऊ शकतो. संनियंत्रण (monitoring) सोपे करण्यासाठी, तुम्ही हा डेटा डेटा व्हिज्युअलायझेशन सॉफ्टवेअरमध्ये फीड करू शकता. यासाठी अनेक पर्याय उपलब्ध आहेत:

- [Prometheus](https://prometheus.io/) (पुल मॉडेल)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (पुश मॉडेल)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

जर तुम्हाला Prometheus वापरायला आवडत असेल, तर Geth त्याचे मेट्रिक्स Prometheus फॉरमॅटमध्ये देखील उघड (expose) करू शकतो. `--metrics --metrics.addr 127.0.0.1` सह Geth सुरू करा आणि Prometheus ला `http://127.0.0.1:6060/debug/metrics/prometheus` वर पॉइंट करा.

या ट्युटोरिअलमध्ये, आपण डेटाबेस तयार करण्यासाठी InfluxDB मध्ये आणि डेटाचे ग्राफ व्हिज्युअलायझेशन तयार करण्यासाठी Grafana मध्ये डेटा पुश करण्यासाठी तुमचा Geth क्लायंट सेट करू. हे मॅन्युअली केल्याने तुम्हाला प्रक्रिया अधिक चांगल्या प्रकारे समजून घेण्यास, त्यात बदल करण्यास आणि वेगवेगळ्या वातावरणात प्रस्थापित करण्यास (deploy) मदत होईल.

## InfluxDB सेट करणे {#setting-up-influxdb}

प्रथम, आपण InfluxDB डाउनलोड आणि इन्स्टॉल करूया. हे ट्युटोरिअल InfluxDB 1.x (OSS) वापरते, ज्याला Geth खालील `--metrics.influxdb` फ्लॅग्ससह सपोर्ट करतो. नवीन InfluxDB आवृत्त्या डेटाबेस आणि वापरकर्त्यांऐवजी संस्था (organizations), बकेट्स आणि टोकन्ससह वेगळा सेटअप वापरतात. Geth `--metrics.influxdbv2` फ्लॅग्ससह InfluxDB 2.x ला सपोर्ट करतो, परंतु या ट्युटोरिअलमधील सेटअपच्या पायऱ्या फक्त 1.x ला लागू होतात.

तुमच्या वातावरणासाठी [InfluxDB 1.x इन्स्टॉलेशन सूचनांचे](https://docs.influxdata.com/influxdb/v1/introduction/install/) अनुसरण करा. उदाहरणार्थ, Debian किंवा Ubuntu वर तुम्ही ते InfluxData रिपॉझिटरीमधून इन्स्टॉल करू शकता. की (key) वर विश्वास ठेवण्यापूर्वी वर्तमान स्वाक्षरी की (signing key) फिंगरप्रिंटसाठी इन्स्टॉलेशन सूचना तपासा:

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

`influxdb` पॅकेजमध्ये `influx` कमांड लाइन क्लायंट समाविष्ट आहे.

InfluxDB यशस्वीरित्या इन्स्टॉल केल्यानंतर, ते बॅकग्राउंडमध्ये चालू असल्याची खात्री करा. डीफॉल्टनुसार, ते `localhost:8086` वर पोहोचण्यायोग्य (reachable) आहे.
`influx` क्लायंट वापरण्यापूर्वी, तुम्हाला ॲडमिन विशेषाधिकारांसह (admin privileges) नवीन वापरकर्ता तयार करावा लागेल. हा वापरकर्ता उच्च स्तरीय व्यवस्थापन, डेटाबेस आणि वापरकर्ते तयार करण्यासाठी काम करेल.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

आता तुम्ही या वापरकर्त्यासह [InfluxDB शेलमध्ये](https://docs.influxdata.com/influxdb/v1/tools/shell/) प्रवेश करण्यासाठी influx क्लायंट वापरू शकता.

```sh
influx -username 'username' -password 'password'
```

त्याच्या शेलमध्ये InfluxDB शी थेट संवाद साधून, तुम्ही geth मेट्रिक्ससाठी डेटाबेस आणि वापरकर्ता तयार करू शकता.

```sql
create database geth
create user geth with password '<geth-password>'
```

तयार केलेल्या नोंदी (entries) यासह तपासा:

```sql
show databases
show users
```

InfluxDB शेलमधून बाहेर पडा.

```
exit
```

InfluxDB चालू आहे आणि Geth मधील मेट्रिक्स स्टोअर करण्यासाठी कॉन्फिगर केले आहे.

## Geth तयार करणे {#preparing-geth}

डेटाबेस सेट केल्यानंतर, आपल्याला Geth मध्ये मेट्रिक्स संकलन (metrics collection) सक्षम करणे आवश्यक आहे. `geth --help` मधील `METRICS AND STATS OPTIONS` कडे लक्ष द्या. तेथे अनेक पर्याय आढळू शकतात, या प्रकरणात आपल्याला Geth ने InfluxDB मध्ये डेटा पुश करावा असे वाटते.
मूलभूत सेटअप एंडपॉइंट निर्दिष्ट करतो जिथे InfluxDB पोहोचण्यायोग्य आहे आणि डेटाबेससाठी प्रमाणीकरण (authentication) आहे.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

तुम्ही `geth` वापरकर्ता तयार करताना सेट केलेलाच पासवर्ड वापरा. हे फ्लॅग्स क्लायंट सुरू करणाऱ्या कमांडला जोडले जाऊ शकतात किंवा कॉन्फिगरेशन फाइलमध्ये सेव्ह केले जाऊ शकतात.

तुम्ही Geth यशस्वीरित्या डेटा पुश करत आहे हे तपासू शकता, उदाहरणार्थ डेटाबेसमध्ये मेट्रिक्सची यादी करून. InfluxDB शेलमध्ये:

```sql
use geth
show measurements
```

## Grafana सेट करणे {#setting-up-grafana}

पुढची पायरी Grafana इन्स्टॉल करणे आहे जे डेटाचे ग्राफिकल स्वरूपात विश्लेषण करेल. Grafana डॉक्युमेंटेशनमधील [तुमच्या वातावरणासाठी इन्स्टॉलेशन प्रक्रियेचे](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) अनुसरण करा. तुम्हाला इतर कशाची आवश्यकता नसल्यास OSS आवृत्ती इन्स्टॉल केल्याची खात्री करा.
Grafana रिपॉझिटरी वापरून Debian किंवा Ubuntu साठी इन्स्टॉलेशनच्या पायऱ्यांचे उदाहरण:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

जेव्हा तुमचे Grafana चालू होईल, तेव्हा ते `localhost:3000` वर पोहोचण्यायोग्य असावे.
या पाथवर प्रवेश करण्यासाठी तुमचा पसंतीचा ब्राउझर वापरा, त्यानंतर डीफॉल्ट क्रेडेंशियल्ससह (वापरकर्ता: `admin` आणि पासवर्ड: `admin`) लॉग इन करा. विचारले असता, डीफॉल्ट पासवर्ड बदला आणि सेव्ह करा.

![Geth संनियंत्रणासाठी Grafana डॅशबोर्डचा स्क्रीनशॉट (पॅनेल 1)](./grafana1.png)

तुम्हाला Grafana होम पेजवर पुनर्निर्देशित (redirect) केले जाईल. प्रथम, तुमचा सोर्स डेटा सेट करा. मेनू उघडा आणि **Connections > Data sources** निवडा. या ट्युटोरिअलमधील स्क्रीनशॉट्स Grafana च्या जुन्या आवृत्तीचे आहेत, त्यामुळे तुमच्या स्क्रीन्स थोड्या वेगळ्या दिसू शकतात.

![Geth संनियंत्रणासाठी Grafana डॅशबोर्डचा स्क्रीनशॉट (पॅनेल 2)](./grafana2.png)

अद्याप कोणतेही डेटा सोर्सेस तयार केलेले नाहीत, एक परिभाषित करण्यासाठी "Add data source" वर क्लिक करा.

![Geth संनियंत्रणासाठी Grafana डॅशबोर्डचा स्क्रीनशॉट (पॅनेल 3)](./grafana3.png)

या सेटअपसाठी, "InfluxDB" निवडा आणि पुढे जा.

![Geth संनियंत्रणासाठी Grafana डॅशबोर्डचा स्क्रीनशॉट (पॅनेल 4)](./grafana4.png)

जर तुम्ही एकाच मशीनवर टूल्स चालवत असाल तर डेटा सोर्स कॉन्फिगरेशन अगदी सोपे आहे. तुम्हाला डेटाबेसमध्ये प्रवेश करण्यासाठी InfluxDB पत्ता आणि तपशील सेट करणे आवश्यक आहे. खालील चित्राचा संदर्भ घ्या.

![Geth संनियंत्रणासाठी Grafana डॅशबोर्डचा स्क्रीनशॉट (पॅनेल 5)](./grafana5.png)

जर सर्व काही पूर्ण झाले असेल आणि InfluxDB पोहोचण्यायोग्य असेल, तर "Save and test" वर क्लिक करा आणि पुष्टीकरण (confirmation) पॉप अप होण्याची प्रतीक्षा करा.

![Geth संनियंत्रणासाठी Grafana डॅशबोर्डचा स्क्रीनशॉट (पॅनेल 6)](./grafana6.png)

Grafana आता InfluxDB मधून डेटा वाचण्यासाठी सेट केले आहे. आता तुम्हाला एक डॅशबोर्ड तयार करणे आवश्यक आहे जो त्याचे विश्लेषण करेल आणि ते प्रदर्शित करेल. डॅशबोर्ड्सचे गुणधर्म JSON फाइल्समध्ये एन्कोड केलेले असतात जे कोणीही तयार करू शकतात आणि सहजपणे इम्पोर्ट केले जाऊ शकतात. मेनू उघडा आणि **Dashboards** निवडा, त्यानंतर **New > Import** वर क्लिक करा.

![Geth संनियंत्रणासाठी Grafana डॅशबोर्डचा स्क्रीनशॉट (पॅनेल 7)](./grafana7.png)

Geth संनियंत्रण डॅशबोर्डसाठी, [या डॅशबोर्डचा](https://grafana.com/grafana/dashboards/13877/) ID कॉपी करा आणि Grafana मधील "Import page" मध्ये पेस्ट करा. डॅशबोर्ड सेव्ह केल्यानंतर, तो असा दिसायला हवा:

![Geth संनियंत्रणासाठी Grafana डॅशबोर्डचा स्क्रीनशॉट (पॅनेल 8)](./grafana8.png)

तुम्ही तुमचे डॅशबोर्ड्स सुधारू (modify) शकता. प्रत्येक पॅनेल संपादित केले जाऊ शकते, हलवले जाऊ शकते, काढले जाऊ शकते किंवा जोडले जाऊ शकते. तुम्ही तुमचे कॉन्फिगरेशन्स बदलू शकता. हे सर्वस्वी तुमच्यावर अवलंबून आहे! डॅशबोर्ड्स कसे काम करतात याबद्दल अधिक जाणून घेण्यासाठी, [Grafana च्या डॉक्युमेंटेशनचा](https://grafana.com/docs/grafana/latest/dashboards/) संदर्भ घ्या.
तुम्हाला [Alerting](https://grafana.com/docs/grafana/latest/alerting/) मध्ये देखील स्वारस्य असू शकते. जेव्हा मेट्रिक्स विशिष्ट मूल्यांपर्यंत पोहोचतात तेव्हा हे तुम्हाला अलर्ट नोटिफिकेशन्स सेट करू देते. विविध कम्युनिकेशन चॅनेल्सना सपोर्ट आहे.
