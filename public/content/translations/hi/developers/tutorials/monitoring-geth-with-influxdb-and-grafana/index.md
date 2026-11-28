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

## निगरानी स्टैक {#monitoring-stack}

एक इथेरियम क्लाइंट बहुत सारा डेटा एकत्र करता है जिसे कालानुक्रमिक डेटाबेस (chronological database) के रूप में पढ़ा जा सकता है। निगरानी को आसान बनाने के लिए, आप इसे डेटा विज़ुअलाइज़ेशन सॉफ़्टवेयर में फ़ीड कर सकते हैं। इसके लिए कई विकल्प उपलब्ध हैं:

- [Prometheus](https://prometheus.io/) (पुल मॉडल)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (पुश मॉडल)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

यदि आप Prometheus पसंद करते हैं, तो Geth अपने मेट्रिक्स को Prometheus प्रारूप में भी प्रदर्शित कर सकता है। Geth को `--metrics --metrics.addr 127.0.0.1` के साथ शुरू करें और Prometheus को `http://127.0.0.1:6060/debug/metrics/prometheus` पर पॉइंट करें।

इस ट्यूटोरियल में, हम आपके Geth क्लाइंट को InfluxDB में डेटा पुश करने के लिए सेट करेंगे ताकि एक डेटाबेस बनाया जा सके और डेटा का ग्राफ़ विज़ुअलाइज़ेशन बनाने के लिए Grafana का उपयोग किया जा सके। इसे मैन्युअल रूप से करने से आपको प्रक्रिया को बेहतर ढंग से समझने, इसे बदलने और विभिन्न वातावरणों में तैनात करने में मदद मिलेगी।

## InfluxDB सेट अप करना {#setting-up-influxdb}

सबसे पहले, आइए InfluxDB डाउनलोड और इंस्टॉल करें। यह ट्यूटोरियल InfluxDB 1.x (OSS) का उपयोग करता है, जिसे Geth नीचे दिए गए `--metrics.influxdb` फ़्लैग के साथ सपोर्ट करता है। नए InfluxDB संस्करण डेटाबेस और उपयोगकर्ताओं के बजाय संगठनों, बकेट और टोकन के साथ एक अलग सेटअप का उपयोग करते हैं। Geth `--metrics.influxdbv2` फ़्लैग के साथ InfluxDB 2.x का सपोर्ट करता है, लेकिन इस ट्यूटोरियल में सेटअप चरण केवल 1.x पर लागू होते हैं।

अपने वातावरण के लिए [InfluxDB 1.x इंस्टॉलेशन निर्देशों](https://docs.influxdata.com/influxdb/v1/introduction/install/) का पालन करें। उदाहरण के लिए, Debian या Ubuntu पर आप इसे InfluxData रिपॉजिटरी से इंस्टॉल कर सकते हैं। कुंजी पर भरोसा करने से पहले वर्तमान हस्ताक्षर करने वाली कुंजी (signing key) फ़िंगरप्रिंट के लिए इंस्टॉलेशन निर्देशों की जांच करें:

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

`influxdb` पैकेज में `influx` कमांड लाइन क्लाइंट शामिल है।

InfluxDB को सफलतापूर्वक इंस्टॉल करने के बाद, सुनिश्चित करें कि यह बैकग्राउंड में चल रहा है। डिफ़ॉल्ट रूप से, यह `localhost:8086` पर उपलब्ध होता है।
`influx` क्लाइंट का उपयोग करने से पहले, आपको एडमिन विशेषाधिकारों के साथ नया उपयोगकर्ता बनाना होगा। यह उपयोगकर्ता उच्च स्तरीय प्रबंधन, डेटाबेस और उपयोगकर्ता बनाने के लिए काम करेगा।

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

अब आप इस उपयोगकर्ता के साथ [InfluxDB शेल](https://docs.influxdata.com/influxdb/v1/tools/shell/) में प्रवेश करने के लिए influx क्लाइंट का उपयोग कर सकते हैं।

```sh
influx -username 'username' -password 'password'
```

सीधे इसके शेल में InfluxDB के साथ संचार करते हुए, आप geth मेट्रिक्स के लिए डेटाबेस और उपयोगकर्ता बना सकते हैं।

```sql
create database geth
create user geth with password '<geth-password>'
```

बनाई गई प्रविष्टियों को इसके साथ सत्यापित करें:

```sql
show databases
show users
```

InfluxDB शेल छोड़ें।

```
exit
```

InfluxDB चल रहा है और Geth से मेट्रिक्स स्टोर करने के लिए कॉन्फ़िगर किया गया है।

## Geth तैयार करना {#preparing-geth}

डेटाबेस सेट करने के बाद, हमें Geth में मेट्रिक्स संग्रह को सक्षम करने की आवश्यकता है। `geth --help` में `METRICS AND STATS OPTIONS` पर ध्यान दें। वहां कई विकल्प मिल सकते हैं, इस मामले में हम चाहते हैं कि Geth डेटा को InfluxDB में पुश करे।
बुनियादी सेटअप उस एंडपॉइंट को निर्दिष्ट करता है जहां InfluxDB उपलब्ध है और डेटाबेस के लिए प्रमाणीकरण (authentication) है।

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

उसी पासवर्ड का उपयोग करें जो आपने `geth` उपयोगकर्ता बनाते समय सेट किया था। इन फ़्लैग्स को क्लाइंट शुरू करने वाले कमांड में जोड़ा जा सकता है या कॉन्फ़िगरेशन फ़ाइल में सहेजा जा सकता है।

आप सत्यापित कर सकते हैं कि Geth सफलतापूर्वक डेटा पुश कर रहा है, उदाहरण के लिए डेटाबेस में मेट्रिक्स सूचीबद्ध करके। InfluxDB शेल में:

```sql
use geth
show measurements
```

## Grafana सेट अप करना {#setting-up-grafana}

अगला कदम Grafana इंस्टॉल करना है जो डेटा की ग्राफ़िक रूप से व्याख्या करेगा। Grafana दस्तावेज़ में [अपने वातावरण के लिए इंस्टॉलेशन प्रक्रिया](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) का पालन करें। सुनिश्चित करें कि आप OSS संस्करण इंस्टॉल करें जब तक कि आपको किसी और चीज़ की आवश्यकता न हो।
Grafana रिपॉजिटरी का उपयोग करके Debian या Ubuntu के लिए उदाहरण इंस्टॉलेशन चरण:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

जब आप Grafana चला रहे हों, तो यह `localhost:3000` पर उपलब्ध होना चाहिए।
इस पथ तक पहुँचने के लिए अपने पसंदीदा ब्राउज़र का उपयोग करें, फिर डिफ़ॉल्ट क्रेडेंशियल्स (उपयोगकर्ता: `admin` और पासवर्ड: `admin`) के साथ लॉगिन करें। संकेत दिए जाने पर, डिफ़ॉल्ट पासवर्ड बदलें और सहेजें।

![Geth निगरानी के लिए Grafana डैशबोर्ड स्क्रीनशॉट (पैनल 1)](./grafana1.png)

आपको Grafana होम पेज पर रीडायरेक्ट किया जाएगा। सबसे पहले, अपना स्रोत डेटा सेट करें। मेनू खोलें और **Connections > Data sources** चुनें। इस ट्यूटोरियल में स्क्रीनशॉट Grafana के पुराने संस्करण के हैं, इसलिए आपकी स्क्रीन थोड़ी अलग दिख सकती है।

![Geth निगरानी के लिए Grafana डैशबोर्ड स्क्रीनशॉट (पैनल 2)](./grafana2.png)

अभी तक कोई डेटा स्रोत नहीं बनाया गया है, एक को परिभाषित करने के लिए "Add data source" पर क्लिक करें।

![Geth निगरानी के लिए Grafana डैशबोर्ड स्क्रीनशॉट (पैनल 3)](./grafana3.png)

इस सेटअप के लिए, "InfluxDB" चुनें और आगे बढ़ें।

![Geth निगरानी के लिए Grafana डैशबोर्ड स्क्रीनशॉट (पैनल 4)](./grafana4.png)

यदि आप एक ही मशीन पर टूल चला रहे हैं तो डेटा स्रोत कॉन्फ़िगरेशन काफी सीधा है। आपको डेटाबेस तक पहुँचने के लिए InfluxDB पता और विवरण सेट करने की आवश्यकता है। नीचे दिए गए चित्र को देखें।

![Geth निगरानी के लिए Grafana डैशबोर्ड स्क्रीनशॉट (पैनल 5)](./grafana5.png)

यदि सब कुछ पूरा हो गया है और InfluxDB उपलब्ध है, तो "Save and test" पर क्लिक करें और पुष्टि पॉप अप होने की प्रतीक्षा करें।

![Geth निगरानी के लिए Grafana डैशबोर्ड स्क्रीनशॉट (पैनल 6)](./grafana6.png)

Grafana अब InfluxDB से डेटा पढ़ने के लिए सेट अप है। अब आपको एक डैशबोर्ड बनाने की आवश्यकता है जो इसकी व्याख्या और प्रदर्शन करेगा। डैशबोर्ड गुण JSON फ़ाइलों में एन्कोड किए गए हैं जिन्हें किसी के द्वारा भी बनाया जा सकता है और आसानी से आयात किया जा सकता है। मेनू खोलें और **Dashboards** चुनें, फिर **New > Import** पर क्लिक करें।

![Geth निगरानी के लिए Grafana डैशबोर्ड स्क्रीनशॉट (पैनल 7)](./grafana7.png)

Geth निगरानी डैशबोर्ड के लिए, [इस डैशबोर्ड](https://grafana.com/grafana/dashboards/13877/) की आईडी कॉपी करें और इसे Grafana में "Import page" में पेस्ट करें। डैशबोर्ड को सहेजने के बाद, यह इस तरह दिखना चाहिए:

![Geth निगरानी के लिए Grafana डैशबोर्ड स्क्रीनशॉट (पैनल 8)](./grafana8.png)

आप अपने डैशबोर्ड को संशोधित कर सकते हैं। प्रत्येक पैनल को संपादित, स्थानांतरित, हटाया या जोड़ा जा सकता है। आप अपने कॉन्फ़िगरेशन बदल सकते हैं। यह आप पर निर्भर है! डैशबोर्ड कैसे काम करते हैं, इसके बारे में अधिक जानने के लिए, [Grafana के दस्तावेज़](https://grafana.com/docs/grafana/latest/dashboards/) देखें।
आप [Alerting](https://grafana.com/docs/grafana/latest/alerting/) में भी रुचि ले सकते हैं। यह आपको मेट्रिक्स के कुछ मानों तक पहुँचने पर अलर्ट सूचनाएँ सेट करने देता है। विभिन्न संचार चैनल समर्थित हैं।
