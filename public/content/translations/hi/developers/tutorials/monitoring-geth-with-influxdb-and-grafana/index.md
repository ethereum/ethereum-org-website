---
title: "InfluxDB और Grafana के साथ Geth की निगरानी करना"
description: "प्रदर्शन को ट्रैक करने और समस्याओं की पहचान करने के लिए InfluxDB और Grafana का उपयोग करके अपने Geth नोड के लिए निगरानी सेट करें।"
author: "मारियो हैवल"
tags: ["क्लाइंट्स", "नोड्स"]
skill: intermediate
breadcrumb: "Geth की निगरानी करना"
lang: hi
published: 2021-01-13
---

यह ट्यूटोरियल आपको अपने Geth नोड के लिए निगरानी सेट करने में मदद करेगा ताकि आप इसके प्रदर्शन को बेहतर ढंग से समझ सकें और संभावित समस्याओं की पहचान कर सकें।

## पूर्वापेक्षाएँ {#prerequisites}

- आप पहले से ही Geth का एक इंस्टेंस चला रहे हों।
- अधिकांश चरण और उदाहरण Linux वातावरण के लिए हैं, टर्मिनल का बुनियादी ज्ञान मददगार होगा।
- Geth के मेट्रिक्स सूट के इस वीडियो अवलोकन को देखें: [पीटर स्ज़िलागी (Péter Szilágyi) द्वारा इथेरियम इंफ्रास्ट्रक्चर की निगरानी करना](https://www.youtube.com/watch?v=cOBab8IJMYI)।

## निगरानी स्टैक (Monitoring stack) {#monitoring-stack}

एक इथेरियम क्लाइंट बहुत सारा डेटा एकत्र करता है जिसे कालानुक्रमिक (chronological) डेटाबेस के रूप में पढ़ा जा सकता है। निगरानी को आसान बनाने के लिए, आप इसे डेटा विज़ुअलाइज़ेशन सॉफ़्टवेयर में फ़ीड कर सकते हैं। इसके लिए कई विकल्प उपलब्ध हैं:

- [Prometheus](https://prometheus.io/) (पुल मॉडल)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (पुश मॉडल)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

इसके अलावा [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) भी है, जो InfluxDB और Grafana के साथ पूर्व-कॉन्फ़िगर किया गया एक विकल्प है।

इस ट्यूटोरियल में, हम आपके Geth क्लाइंट को डेटाबेस बनाने के लिए InfluxDB में डेटा पुश करने और डेटा का ग्राफ़ विज़ुअलाइज़ेशन बनाने के लिए Grafana सेट अप करेंगे। इसे मैन्युअल रूप से करने से आपको प्रक्रिया को बेहतर ढंग से समझने, इसे बदलने और विभिन्न वातावरणों में तैनात करने में मदद मिलेगी।

## InfluxDB सेट अप करना {#setting-up-influxdb}

सबसे पहले, आइए InfluxDB डाउनलोड और इंस्टॉल करें। विभिन्न डाउनलोड विकल्प [Influxdata रिलीज़ पेज](https://portal.influxdata.com/downloads/) पर पाए जा सकते हैं। वह चुनें जो आपके वातावरण के अनुकूल हो।
आप इसे [रिपॉजिटरी](https://repos.influxdata.com/) से भी इंस्टॉल कर सकते हैं। उदाहरण के लिए डेबियन (Debian) आधारित वितरण में:

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

InfluxDB को सफलतापूर्वक इंस्टॉल करने के बाद, सुनिश्चित करें कि यह बैकग्राउंड में चल रहा है। डिफ़ॉल्ट रूप से, यह `localhost:8086` पर उपलब्ध होता है।
`influx` क्लाइंट का उपयोग करने से पहले, आपको एडमिन विशेषाधिकारों के साथ नया उपयोगकर्ता बनाना होगा। यह उपयोगकर्ता उच्च स्तरीय प्रबंधन, डेटाबेस और उपयोगकर्ता बनाने के लिए काम करेगा।

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

अब आप इस उपयोगकर्ता के साथ [InfluxDB शेल](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) में प्रवेश करने के लिए influx क्लाइंट का उपयोग कर सकते हैं।

```
influx -username 'username' -password 'password'
```

इसके शेल में InfluxDB के साथ सीधे संचार करके, आप geth मेट्रिक्स के लिए डेटाबेस और उपयोगकर्ता बना सकते हैं।

```
create database geth
create user geth with password choosepassword
```

बनाई गई प्रविष्टियों को इसके साथ सत्यापित करें:

```
show databases
show users
```

InfluxDB शेल से बाहर निकलें।

```
exit
```

InfluxDB चल रहा है और Geth से मेट्रिक्स स्टोर करने के लिए कॉन्फ़िगर किया गया है।

## Geth तैयार करना {#preparing-geth}

डेटाबेस सेट करने के बाद, हमें Geth में मेट्रिक्स संग्रह को सक्षम करने की आवश्यकता है। `geth --help` में `METRICS AND STATS OPTIONS` पर ध्यान दें। वहां कई विकल्प मिल सकते हैं, इस मामले में हम चाहते हैं कि Geth डेटा को InfluxDB में पुश करे।
बुनियादी सेटअप उस एंडपॉइंट को निर्दिष्ट करता है जहां InfluxDB उपलब्ध है और डेटाबेस के लिए प्रमाणीकरण है।

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

इन फ़्लैग्स को क्लाइंट शुरू करने वाले कमांड में जोड़ा जा सकता है या कॉन्फ़िगरेशन फ़ाइल में सहेजा जा सकता है।

आप सत्यापित कर सकते हैं कि Geth सफलतापूर्वक डेटा पुश कर रहा है, उदाहरण के लिए डेटाबेस में मेट्रिक्स को सूचीबद्ध करके। InfluxDB शेल में:

```
use geth
show measurements
```

## Grafana सेट अप करना {#setting-up-grafana}

अगला कदम Grafana इंस्टॉल करना है जो डेटा की ग्राफ़िकल व्याख्या करेगा। Grafana दस्तावेज़ में अपने वातावरण के लिए इंस्टॉलेशन प्रक्रिया का पालन करें। यदि आप अन्यथा नहीं चाहते हैं तो OSS संस्करण इंस्टॉल करना सुनिश्चित करें।
रिपॉजिटरी का उपयोग करके डेबियन (Debian) वितरण के लिए उदाहरण इंस्टॉलेशन चरण:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

जब आपका Grafana चलने लगे, तो यह `localhost:3000` पर उपलब्ध होना चाहिए।
इस पथ तक पहुँचने के लिए अपने पसंदीदा ब्राउज़र का उपयोग करें, फिर डिफ़ॉल्ट क्रेडेंशियल्स (उपयोगकर्ता: `admin` और पासवर्ड: `admin`) के साथ लॉगिन करें। संकेत मिलने पर, डिफ़ॉल्ट पासवर्ड बदलें और सहेजें।

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

आपको Grafana होम पेज पर रीडायरेक्ट कर दिया जाएगा। सबसे पहले, अपना स्रोत डेटा सेट करें। बाएँ बार में कॉन्फ़िगरेशन आइकन पर क्लिक करें और "Data sources" चुनें।

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

अभी तक कोई डेटा स्रोत नहीं बनाया गया है, एक को परिभाषित करने के लिए "Add data source" पर क्लिक करें।

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

इस सेटअप के लिए, "InfluxDB" चुनें और आगे बढ़ें।

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

यदि आप एक ही मशीन पर टूल चला रहे हैं तो डेटा स्रोत कॉन्फ़िगरेशन काफी सीधा है। आपको डेटाबेस तक पहुँचने के लिए InfluxDB पता और विवरण सेट करने की आवश्यकता है। नीचे दिए गए चित्र को देखें।

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

यदि सब कुछ पूरा हो गया है और InfluxDB उपलब्ध है, तो "Save and test" पर क्लिक करें और पुष्टि के पॉप अप होने की प्रतीक्षा करें।

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Grafana अब InfluxDB से डेटा पढ़ने के लिए सेट हो गया है। अब आपको एक डैशबोर्ड बनाने की आवश्यकता है जो इसकी व्याख्या करेगा और इसे प्रदर्शित करेगा। डैशबोर्ड गुण JSON फ़ाइलों में एन्कोड किए गए हैं जिन्हें किसी के भी द्वारा बनाया जा सकता है और आसानी से आयात किया जा सकता है। बाएँ बार पर, "Create and Import" पर क्लिक करें।

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Geth निगरानी डैशबोर्ड के लिए, [इस डैशबोर्ड](https://grafana.com/grafana/dashboards/13877/) की ID कॉपी करें और इसे Grafana में "Import page" में पेस्ट करें। डैशबोर्ड को सहेजने के बाद, यह इस तरह दिखना चाहिए:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

आप अपने डैशबोर्ड को संशोधित कर सकते हैं। प्रत्येक पैनल को संपादित किया जा सकता है, स्थानांतरित किया जा सकता है, हटाया जा सकता है या जोड़ा जा सकता है। आप अपने कॉन्फ़िगरेशन बदल सकते हैं। यह आप पर निर्भर है! डैशबोर्ड कैसे काम करते हैं, इसके बारे में अधिक जानने के लिए, [Grafana के दस्तावेज़](https://grafana.com/docs/grafana/latest/dashboards/) देखें।
आपकी रुचि [अलर्टिंग (Alerting)](https://grafana.com/docs/grafana/latest/alerting/) में भी हो सकती है। यह आपको तब के लिए अलर्ट सूचनाएं सेट करने देता है जब मेट्रिक्स कुछ निश्चित मानों तक पहुँच जाते हैं। विभिन्न संचार चैनल समर्थित हैं।