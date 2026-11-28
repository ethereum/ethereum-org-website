---
title: "InfluxDB మరియు Grafanaతో Gethను పర్యవేక్షించడం"
description: "పనితీరును ట్రాక్ చేయడానికి మరియు సమస్యలను గుర్తించడానికి InfluxDB మరియు Grafanaను ఉపయోగించి మీ Geth నోడ్ కోసం పర్యవేక్షణను సెటప్ చేయండి."
author: "మారియో హావెల్"
tags:
  - క్లయింట్లు
  - నోడ్‌లు
skill: intermediate
breadcrumb: "Gethను పర్యవేక్షించడం"
lang: te
published: 2021-01-13
---

ఈ ట్యుటోరియల్ మీ Geth నోడ్ కోసం పర్యవేక్షణను సెటప్ చేయడంలో మీకు సహాయపడుతుంది, తద్వారా మీరు దాని పనితీరును బాగా అర్థం చేసుకోవచ్చు మరియు సంభావ్య సమస్యలను గుర్తించవచ్చు.

## ముందస్తు అవసరాలు {#prerequisites}

- మీరు ఇప్పటికే Geth యొక్క ఇన్‌స్టాన్స్‌ను రన్ చేస్తూ ఉండాలి.
- చాలా దశలు మరియు ఉదాహరణలు Linux వాతావరణం కోసం ఉద్దేశించబడ్డాయి, ప్రాథమిక టెర్మినల్ పరిజ్ఞానం సహాయకరంగా ఉంటుంది.
- Geth యొక్క మెట్రిక్స్ సూట్ యొక్క ఈ వీడియో అవలోకనాన్ని చూడండి: [పీటర్ స్జిలాగి ద్వారా ఎథీరియం మౌలిక సదుపాయాల పర్యవేక్షణ](https://www.youtube.com/watch?v=cOBab8IJMYI).

## పర్యవేక్షణ స్టాక్ {#monitoring-stack}

ఒక ఎథీరియం క్లయింట్ చాలా డేటాను సేకరిస్తుంది, దీనిని కాలానుక్రమ డేటాబేస్ రూపంలో చదవవచ్చు. పర్యవేక్షణను సులభతరం చేయడానికి, మీరు దీనిని డేటా విజువలైజేషన్ సాఫ్ట్‌వేర్‌లోకి ఫీడ్ చేయవచ్చు. దీనికి బహుళ ఎంపికలు అందుబాటులో ఉన్నాయి:

- [Prometheus](https://prometheus.io/) (పుల్ మోడల్)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (పుష్ మోడల్)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

మీరు Prometheusను ఇష్టపడితే, Geth తన మెట్రిక్స్‌ను Prometheus ఫార్మాట్‌లో కూడా బహిర్గతం చేయగలదు. `--metrics --metrics.addr 127.0.0.1` తో Gethను ప్రారంభించండి మరియు Prometheusను `http://127.0.0.1:6060/debug/metrics/prometheus` వద్ద పాయింట్ చేయండి.

ఈ ట్యుటోరియల్‌లో, డేటాబేస్‌ను సృష్టించడానికి InfluxDBకి డేటాను పుష్ చేయడానికి మరియు డేటా యొక్క గ్రాఫ్ విజువలైజేషన్‌ను సృష్టించడానికి Grafanaకి డేటాను పుష్ చేయడానికి మేము మీ Geth క్లయింట్‌ను సెటప్ చేస్తాము. దీన్ని మాన్యువల్‌గా చేయడం వల్ల మీరు ప్రక్రియను బాగా అర్థం చేసుకోవడానికి, దాన్ని మార్చడానికి మరియు విభిన్న వాతావరణాలలో డిప్లాయ్ చేయడానికి సహాయపడుతుంది.

## InfluxDBని సెటప్ చేయడం {#setting-up-influxdb}

ముందుగా, InfluxDBని డౌన్‌లోడ్ చేసి ఇన్‌స్టాల్ చేద్దాం. ఈ ట్యుటోరియల్ InfluxDB 1.x (OSS)ని ఉపయోగిస్తుంది, దీనికి Geth దిగువ ఉన్న `--metrics.influxdb` ఫ్లాగ్‌లతో మద్దతు ఇస్తుంది. కొత్త InfluxDB వెర్షన్‌లు డేటాబేస్‌లు మరియు వినియోగదారులకు బదులుగా సంస్థలు, బకెట్‌లు మరియు టోకెన్‌లతో విభిన్న సెటప్‌ను ఉపయోగిస్తాయి. Geth `--metrics.influxdbv2` ఫ్లాగ్‌లతో InfluxDB 2.xకి మద్దతు ఇస్తుంది, కానీ ఈ ట్యుటోరియల్‌లోని సెటప్ దశలు 1.xకి మాత్రమే వర్తిస్తాయి.

మీ వాతావరణం కోసం [InfluxDB 1.x ఇన్‌స్టాలేషన్ సూచనలను](https://docs.influxdata.com/influxdb/v1/introduction/install/) అనుసరించండి. ఉదాహరణకు, Debian లేదా Ubuntuలో మీరు దీన్ని InfluxData రిపోజిటరీ నుండి ఇన్‌స్టాల్ చేయవచ్చు. కీని విశ్వసించడానికి ముందు ప్రస్తుత సంతకం చేసే కీ (signing key) ఫింగర్‌ప్రింట్ కోసం ఇన్‌స్టాలేషన్ సూచనలను తనిఖీ చేయండి:

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

`influxdb` ప్యాకేజీలో `influx` కమాండ్ లైన్ క్లయింట్ ఉంటుంది.

InfluxDBని విజయవంతంగా ఇన్‌స్టాల్ చేసిన తర్వాత, అది బ్యాక్‌గ్రౌండ్‌లో రన్ అవుతోందని నిర్ధారించుకోండి. అప్రమేయంగా, ఇది `localhost:8086` వద్ద చేరుకోవచ్చు.
`influx` క్లయింట్‌ను ఉపయోగించే ముందు, మీరు అడ్మిన్ అధికారాలతో కొత్త వినియోగదారుని సృష్టించాలి. ఈ వినియోగదారు ఉన్నత స్థాయి నిర్వహణ, డేటాబేస్‌లు మరియు వినియోగదారులను సృష్టించడం కోసం ఉపయోగపడతారు.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

ఇప్పుడు మీరు ఈ వినియోగదారుతో [InfluxDB షెల్](https://docs.influxdata.com/influxdb/v1/tools/shell/)లోకి ప్రవేశించడానికి influx క్లయింట్‌ను ఉపయోగించవచ్చు.

```sh
influx -username 'username' -password 'password'
```

దాని షెల్‌లో InfluxDBతో నేరుగా కమ్యూనికేట్ చేయడం ద్వారా, మీరు geth మెట్రిక్స్ కోసం డేటాబేస్ మరియు వినియోగదారుని సృష్టించవచ్చు.

```sql
create database geth
create user geth with password '<geth-password>'
```

సృష్టించిన ఎంట్రీలను దీనితో ధృవీకరించండి:

```sql
show databases
show users
```

InfluxDB షెల్ నుండి నిష్క్రమించండి.

```
exit
```

InfluxDB రన్ అవుతోంది మరియు Geth నుండి మెట్రిక్స్‌ను నిల్వ చేయడానికి కాన్ఫిగర్ చేయబడింది.

## Gethను సిద్ధం చేయడం {#preparing-geth}

డేటాబేస్‌ను సెటప్ చేసిన తర్వాత, మనం Gethలో మెట్రిక్స్ సేకరణను ప్రారంభించాలి. `geth --help` లోని `METRICS AND STATS OPTIONS` పై శ్రద్ధ వహించండి. అక్కడ బహుళ ఎంపికలు కనుగొనబడతాయి, ఈ సందర్భంలో Geth డేటాను InfluxDBలోకి పుష్ చేయాలని మేము కోరుకుంటున్నాము.
ప్రాథమిక సెటప్ InfluxDB చేరుకోగల ఎండ్‌పాయింట్‌ను మరియు డేటాబేస్ కోసం ప్రామాణీకరణను నిర్దేశిస్తుంది.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

మీరు `geth` వినియోగదారుని సృష్టించినప్పుడు సెట్ చేసిన అదే పాస్‌వర్డ్‌ను ఉపయోగించండి. ఈ ఫ్లాగ్‌లను క్లయింట్‌ను ప్రారంభించే కమాండ్‌కు జోడించవచ్చు లేదా కాన్ఫిగరేషన్ ఫైల్‌లో సేవ్ చేయవచ్చు.

ఉదాహరణకు డేటాబేస్‌లో మెట్రిక్స్‌ను జాబితా చేయడం ద్వారా Geth విజయవంతంగా డేటాను పుష్ చేస్తోందని మీరు ధృవీకరించవచ్చు. InfluxDB షెల్‌లో:

```sql
use geth
show measurements
```

## Grafanaను సెటప్ చేయడం {#setting-up-grafana}

తదుపరి దశ Grafanaను ఇన్‌స్టాల్ చేయడం, ఇది డేటాను గ్రాఫికల్‌గా వివరిస్తుంది. Grafana డాక్యుమెంటేషన్‌లో [మీ వాతావరణం కోసం ఇన్‌స్టాలేషన్ ప్రక్రియను](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) అనుసరించండి. మీకు మరేదైనా అవసరం ఉంటే తప్ప OSS వెర్షన్‌ను ఇన్‌స్టాల్ చేసినట్లు నిర్ధారించుకోండి.
Grafana రిపోజిటరీని ఉపయోగించి Debian లేదా Ubuntu కోసం ఉదాహరణ ఇన్‌స్టాలేషన్ దశలు:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

మీరు Grafanaను రన్ చేసినప్పుడు, అది `localhost:3000` వద్ద చేరుకోవచ్చు.
ఈ పాత్‌ను యాక్సెస్ చేయడానికి మీకు ఇష్టమైన బ్రౌజర్‌ను ఉపయోగించండి, ఆపై డిఫాల్ట్ ఆధారాలతో లాగిన్ చేయండి (వినియోగదారు: `admin` మరియు పాస్‌వర్డ్: `admin`). ప్రాంప్ట్ చేయబడినప్పుడు, డిఫాల్ట్ పాస్‌వర్డ్‌ను మార్చండి మరియు సేవ్ చేయండి.

![Geth పర్యవేక్షణ కోసం Grafana డ్యాష్‌బోర్డ్ స్క్రీన్‌షాట్ (ప్యానెల్ 1)](./grafana1.png)

మీరు Grafana హోమ్ పేజీకి దారి మళ్లించబడతారు. ముందుగా, మీ సోర్స్ డేటాను సెటప్ చేయండి. మెనుని తెరిచి, **Connections > Data sources** ఎంచుకోండి. ఈ ట్యుటోరియల్‌లోని స్క్రీన్‌షాట్‌లు Grafana యొక్క పాత వెర్షన్ నుండి తీసుకోబడ్డాయి, కాబట్టి మీ స్క్రీన్‌లు కొద్దిగా భిన్నంగా కనిపించవచ్చు.

![Geth పర్యవేక్షణ కోసం Grafana డ్యాష్‌బోర్డ్ స్క్రీన్‌షాట్ (ప్యానెల్ 2)](./grafana2.png)

ఇంకా ఎలాంటి డేటా సోర్స్‌లు సృష్టించబడలేదు, ఒకదాన్ని నిర్వచించడానికి "Add data source" పై క్లిక్ చేయండి.

![Geth పర్యవేక్షణ కోసం Grafana డ్యాష్‌బోర్డ్ స్క్రీన్‌షాట్ (ప్యానెల్ 3)](./grafana3.png)

ఈ సెటప్ కోసం, "InfluxDB"ని ఎంచుకుని కొనసాగండి.

![Geth పర్యవేక్షణ కోసం Grafana డ్యాష్‌బోర్డ్ స్క్రీన్‌షాట్ (ప్యానెల్ 4)](./grafana4.png)

మీరు ఒకే మెషీన్‌లో టూల్స్‌ను రన్ చేస్తుంటే డేటా సోర్స్ కాన్ఫిగరేషన్ చాలా సులభం. డేటాబేస్‌ను యాక్సెస్ చేయడానికి మీరు InfluxDB చిరునామా మరియు వివరాలను సెట్ చేయాలి. దిగువ చిత్రాన్ని చూడండి.

![Geth పర్యవేక్షణ కోసం Grafana డ్యాష్‌బోర్డ్ స్క్రీన్‌షాట్ (ప్యానెల్ 5)](./grafana5.png)

అంతా పూర్తయి, InfluxDB చేరుకోగలిగితే, "Save and test" పై క్లిక్ చేసి, నిర్ధారణ పాప్ అప్ అయ్యే వరకు వేచి ఉండండి.

![Geth పర్యవేక్షణ కోసం Grafana డ్యాష్‌బోర్డ్ స్క్రీన్‌షాట్ (ప్యానెల్ 6)](./grafana6.png)

Grafana ఇప్పుడు InfluxDB నుండి డేటాను చదవడానికి సెటప్ చేయబడింది. ఇప్పుడు మీరు దాన్ని వివరించే మరియు ప్రదర్శించే డ్యాష్‌బోర్డ్‌ను సృష్టించాలి. డ్యాష్‌బోర్డ్‌ల లక్షణాలు JSON ఫైల్‌లలో ఎన్‌కోడ్ చేయబడతాయి, వీటిని ఎవరైనా సృష్టించవచ్చు మరియు సులభంగా దిగుమతి చేసుకోవచ్చు. మెనుని తెరిచి, **Dashboards** ఎంచుకోండి, ఆపై **New > Import** క్లిక్ చేయండి.

![Geth పర్యవేక్షణ కోసం Grafana డ్యాష్‌బోర్డ్ స్క్రీన్‌షాట్ (ప్యానెల్ 7)](./grafana7.png)

Geth పర్యవేక్షణ డ్యాష్‌బోర్డ్ కోసం, [ఈ డ్యాష్‌బోర్డ్](https://grafana.com/grafana/dashboards/13877/) యొక్క IDని కాపీ చేసి, Grafanaలోని "Import page"లో పేస్ట్ చేయండి. డ్యాష్‌బోర్డ్‌ను సేవ్ చేసిన తర్వాత, ఇది ఇలా కనిపిస్తుంది:

![Geth పర్యవేక్షణ కోసం Grafana డ్యాష్‌బోర్డ్ స్క్రీన్‌షాట్ (ప్యానెల్ 8)](./grafana8.png)

మీరు మీ డ్యాష్‌బోర్డ్‌లను సవరించవచ్చు. ప్రతి ప్యానెల్‌ను సవరించవచ్చు, తరలించవచ్చు, తీసివేయవచ్చు లేదా జోడించవచ్చు. మీరు మీ కాన్ఫిగరేషన్‌లను మార్చవచ్చు. ఇది మీ ఇష్టం! డ్యాష్‌బోర్డ్‌లు ఎలా పనిచేస్తాయో మరింత తెలుసుకోవడానికి, [Grafana డాక్యుమెంటేషన్](https://grafana.com/docs/grafana/latest/dashboards/)ను చూడండి.
మీకు [అలర్టింగ్ (Alerting)](https://grafana.com/docs/grafana/latest/alerting/) పట్ల కూడా ఆసక్తి ఉండవచ్చు. మెట్రిక్స్ నిర్దిష్ట విలువలను చేరుకున్నప్పుడు అలర్ట్ నోటిఫికేషన్‌లను సెటప్ చేయడానికి ఇది మిమ్మల్ని అనుమతిస్తుంది. వివిధ కమ్యూనికేషన్ ఛానెల్‌లకు మద్దతు ఉంది.
