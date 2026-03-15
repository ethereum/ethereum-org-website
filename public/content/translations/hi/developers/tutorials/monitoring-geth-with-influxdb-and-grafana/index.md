---
title: "InfluxDB और Grafana के साथ Geth की निगरानी"
description: "प्रदर्शन को ट्रैक करने और समस्याओं की पहचान करने के लिए InfluxDB और Grafana का उपयोग करके अपने Geth नोड के लिए निगरानी सेट करें।"
author: "मारियो हवेल"
tags: [ "क्लाइंट्स", "नोड्स" ]
skill: intermediate
lang: hi
published: 2021-01-13
---

यह ट्यूटोरियल आपको अपने Geth नोड के लिए निगरानी सेट करने में मदद करेगा ताकि आप इसके प्रदर्शन को बेहतर ढंग से समझ सकें और संभावित समस्याओं की पहचान कर सकें।

## पूर्वापेक्षाएं {#prerequisites}

- आपको पहले से ही Geth का एक इंस्टेंस चलाना चाहिए।
- अधिकांश चरण और उदाहरण लिनक्स एनवायरमेंट के लिए हैं, बेसिक टर्मिनल नॉलेज सहायक होगा।
- Geth के मेट्रिक्स के सुइट का यह वीडियो अवलोकन देखें: [Péter Szilágyi द्वारा एक Ethereum इंफ्रास्ट्रक्चर की निगरानी](https://www.youtube.com/watch?v=cOBab8IJMYI)।

## निगरानी स्टैक {#monitoring-stack}

एक एथेरियम क्लाइंट बहुत सारा डेटा एकत्र करता है जिसे एक कालानुक्रमिक डेटाबेस के रूप में पढ़ा जा सकता है। निगरानी को आसान बनाने के लिए, आप इसे डेटा विज़ुअलाइज़ेशन सॉफ़्टवेयर में फीड कर सकते हैं। कई विकल्प उपलब्ध हैं:

- [Prometheus](https://prometheus.io/) (पुल मॉडल)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (पुश मॉडल)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

[Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) भी है, जो InfluxDB और Grafana के साथ पहले से कॉन्फ़िगर किया गया एक विकल्प है।

इस ट्यूटोरियल में, हम डेटाबेस बनाने के लिए InfluxDB में डेटा पुश करने के लिए आपके Geth क्लाइंट को और डेटा का ग्राफ़ विज़ुअलाइज़ेशन बनाने के लिए Grafana को सेट करेंगे। इसे मैन्युअल रूप से करने से आपको प्रक्रिया को बेहतर ढंग से समझने, इसे बदलने और विभिन्न एनवायरमेंट में तैनात करने में मदद मिलेगी।

## InfluxDB सेट करना {#setting-up-influxdb}

सबसे पहले, आइए InfluxDB डाउनलोड और इंस्टॉल करें। विभिन्न डाउनलोड विकल्प [Influxdata रिलीज़ पेज](https://portal.influxdata.com/downloads/) पर मिल सकते हैं। अपने एनवायरमेंट के अनुकूल एक चुनें।
आप इसे [रिपॉजिटरी](https://repos.influxdata.com/) से भी इंस्टॉल कर सकते हैं। उदाहरण के लिए डेबियन आधारित वितरण में:

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

InfluxDB को सफलतापूर्वक इंस्टॉल करने के बाद, सुनिश्चित करें कि यह बैकग्राउंड में चल रहा है। डिफ़ॉल्ट रूप से, यह `localhost:8086` पर उपलब्ध है।
`influx` क्लाइंट का उपयोग करने से पहले, आपको एडमिन विशेषाधिकारों के साथ नया यूज़र बनाना होगा। यह यूज़र उच्च स्तरीय प्रबंधन, डेटाबेस और यूज़र्स बनाने के लिए काम करेगा।

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

अब आप इस यूज़र के साथ [InfluxDB शेल](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) में प्रवेश करने के लिए influx क्लाइंट का उपयोग कर सकते हैं।

```
influx -username 'username' -password 'password'
```

इसके शेल में InfluxDB के साथ सीधे संवाद करते हुए, आप geth मेट्रिक्स के लिए डेटाबेस और यूज़र बना सकते हैं।

```
create database geth
create user geth with password choosepassword
```

बनाई गई प्रविष्टियों को इसके साथ सत्यापित करें:

```
show databases
show users
```

InfluxDB शेल छोड़ दें।

```
exit
```

InfluxDB चल रहा है और Geth से मेट्रिक्स स्टोर करने के लिए कॉन्फ़िगर किया गया है।

## Geth तैयार करना {#preparing-geth}

डेटाबेस सेट करने के बाद, हमें Geth में मेट्रिक्स कलेक्शन को सक्षम करना होगा। `geth --help` में `METRICS AND STATS OPTIONS` पर ध्यान दें। वहां कई विकल्प मिल सकते हैं, इस मामले में हम चाहते हैं कि Geth डेटा को InfluxDB में पुश करे।
बेसिक सेटअप उस एंडपॉइंट को निर्दिष्ट करता है जहां InfluxDB पहुंच योग्य है और डेटाबेस के लिए प्रमाणीकरण।

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

यह फ्लैग क्लाइंट को शुरू करने वाले कमांड में जोड़ा जा सकता है या कॉन्फ़िगरेशन फ़ाइल में सहेजा जा सकता है।

आप यह सत्यापित कर सकते हैं कि Geth सफलतापूर्वक डेटा पुश कर रहा है, उदाहरण के लिए डेटाबेस में मेट्रिक्स को सूचीबद्ध करके। InfluxDB शेल में:

```
use geth
show measurements
```

## Grafana सेट करना {#setting-up-grafana}

अगला कदम Grafana इंस्टॉल करना है जो डेटा को ग्राफिक रूप से इंटरप्रेट करेगा। Grafana प्रलेखन में अपने एनवायरमेंट के लिए इंस्टॉलेशन प्रक्रिया का पालन करें। सुनिश्चित करें कि आप OSS संस्करण इंस्टॉल करें यदि आप अन्यथा नहीं चाहते हैं।
रिपॉजिटरी का उपयोग करके डेबियन वितरण के लिए उदाहरण इंस्टॉलेशन चरण:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

जब आपके पास Grafana चल रहा हो, तो यह `localhost:3000` पर उपलब्ध होना चाहिए।
इस पाथ तक पहुंचने के लिए अपने पसंदीदा ब्राउज़र का उपयोग करें, फिर डिफ़ॉल्ट क्रेडेंशियल्स (यूज़र: `admin` और पासवर्ड: `admin`) के साथ लॉगिन करें। पूछे जाने पर, डिफ़ॉल्ट पासवर्ड बदलें और सेव करें।

![](./grafana1.png)

आपको Grafana होम पेज पर रीडायरेक्ट कर दिया जाएगा। सबसे पहले, अपना स्रोत डेटा सेट करें। बाईं ओर बार में कॉन्फ़िगरेशन आइकन पर क्लिक करें और "डेटा स्रोत" चुनें।

![](./grafana2.png)

अभी तक कोई डेटा स्रोत नहीं बनाया गया है, एक को परिभाषित करने के लिए "डेटा स्रोत जोड़ें" पर क्लिक करें।

![](./grafana3.png)

इस सेटअप के लिए, "InfluxDB" चुनें और आगे बढ़ें।

![](./grafana4.png)

यदि आप एक ही मशीन पर उपकरण चला रहे हैं तो डेटा स्रोत कॉन्फ़िगरेशन बहुत सीधा है। आपको डेटाबेस तक पहुंचने के लिए InfluxDB पता और विवरण सेट करना होगा। नीचे दी गई तस्वीर देखें।

![](./grafana5.png)

यदि सब कुछ पूरा हो गया है और InfluxDB पहुंच योग्य है, तो "सहेजें और परीक्षण करें" पर क्लिक करें और पुष्टि के पॉप अप होने की प्रतीक्षा करें।

![](./grafana6.png)

Grafana अब InfluxDB से डेटा पढ़ने के लिए सेट है। अब आपको एक डैशबोर्ड बनाना होगा जो इसे इंटरप्रेट और प्रदर्शित करेगा। डैशबोर्ड गुण JSON फ़ाइलों में एन्कोड किए गए हैं जिन्हें कोई भी बना सकता है और आसानी से आयात कर सकता है। बाईं ओर बार में, "बनाएँ और आयात करें" पर क्लिक करें।

![](./grafana7.png)

Geth निगरानी डैशबोर्ड के लिए, [इस डैशबोर्ड](https://grafana.com/grafana/dashboards/13877/) की आईडी कॉपी करें और इसे Grafana में "आयात पृष्ठ" में पेस्ट करें। डैशबोर्ड को सहेजने के बाद, यह इस तरह दिखना चाहिए:

![](./grafana8.png)

आप अपने डैशबोर्ड को संशोधित कर सकते हैं। प्रत्येक पैनल को संपादित, स्थानांतरित, हटाया या जोड़ा जा सकता है। आप अपने कॉन्फ़िगरेशन बदल सकते हैं। यह आप पर निर्भर है! डैशबोर्ड कैसे काम करते हैं, इसके बारे में अधिक जानने के लिए, [Grafana का प्रलेखन](https://grafana.com/docs/grafana/latest/dashboards/) देखें।
आप [अलर्टिंग](https://grafana.com/docs/grafana/latest/alerting/) में भी रुचि ले सकते हैं। यह आपको मेट्रिक्स के कुछ मानों तक पहुंचने पर अलर्ट नोटिफिकेशन सेट करने देता है। विभिन्न संचार चैनल समर्थित हैं।
