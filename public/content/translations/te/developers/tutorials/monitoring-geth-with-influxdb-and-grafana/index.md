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

ఒక ఎథీరియం క్లయింట్ కాలక్రమానుసార డేటాబేస్ రూపంలో చదవగలిగే చాలా డేటాను సేకరిస్తుంది. పర్యవేక్షణను సులభతరం చేయడానికి, మీరు దీన్ని డేటా విజువలైజేషన్ సాఫ్ట్‌వేర్‌లోకి ఫీడ్ చేయవచ్చు. దీనికి బహుళ ఎంపికలు అందుబాటులో ఉన్నాయి:

- [Prometheus](https://prometheus.io/) (పుల్ మోడల్)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (పుష్ మోడల్)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

InfluxDB మరియు Grafanaతో ముందుగా కాన్ఫిగర్ చేయబడిన ఎంపిక అయిన [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) కూడా ఉంది.

ఈ ట్యుటోరియల్‌లో, డేటాబేస్‌ను సృష్టించడానికి InfluxDBకి మరియు డేటా యొక్క గ్రాఫ్ విజువలైజేషన్‌ను సృష్టించడానికి Grafanaకి డేటాను పుష్ చేయడానికి మేము మీ Geth క్లయింట్‌ను సెటప్ చేస్తాము. దీన్ని మాన్యువల్‌గా చేయడం వల్ల ప్రక్రియను బాగా అర్థం చేసుకోవడానికి, దాన్ని మార్చడానికి మరియు విభిన్న వాతావరణాలలో డిప్లాయ్ చేయడానికి మీకు సహాయపడుతుంది.

## InfluxDBని సెటప్ చేయడం {#setting-up-influxdb}

ముందుగా, InfluxDBని డౌన్‌లోడ్ చేసి ఇన్‌స్టాల్ చేద్దాం. వివిధ డౌన్‌లోడ్ ఎంపికలను [Influxdata విడుదల పేజీ](https://portal.influxdata.com/downloads/)లో కనుగొనవచ్చు. మీ వాతావరణానికి సరిపోయేదాన్ని ఎంచుకోండి.
మీరు దీన్ని [రిపోజిటరీ](https://repos.influxdata.com/) నుండి కూడా ఇన్‌స్టాల్ చేయవచ్చు. ఉదాహరణకు డెబియన్ (Debian) ఆధారిత పంపిణీలో:

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

InfluxDBని విజయవంతంగా ఇన్‌స్టాల్ చేసిన తర్వాత, అది బ్యాక్‌గ్రౌండ్‌లో రన్ అవుతోందని నిర్ధారించుకోండి. అప్రమేయంగా, ఇది `localhost:8086` వద్ద చేరుకోవచ్చు.
`influx` క్లయింట్‌ను ఉపయోగించే ముందు, మీరు అడ్మిన్ అధికారాలతో కొత్త వినియోగదారుని సృష్టించాలి. ఈ వినియోగదారు ఉన్నత స్థాయి నిర్వహణ, డేటాబేస్‌లు మరియు వినియోగదారులను సృష్టించడం కోసం ఉపయోగపడతారు.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

ఇప్పుడు మీరు ఈ వినియోగదారుతో [InfluxDB షెల్](https://docs.influxdata.com/influxdb/v1.8/tools/shell/)లోకి ప్రవేశించడానికి influx క్లయింట్‌ను ఉపయోగించవచ్చు.

```
influx -username 'username' -password 'password'
```

దాని షెల్‌లో InfluxDBతో నేరుగా కమ్యూనికేట్ చేయడం ద్వారా, మీరు geth మెట్రిక్స్ కోసం డేటాబేస్ మరియు వినియోగదారుని సృష్టించవచ్చు.

```
create database geth
create user geth with password choosepassword
```

సృష్టించబడిన ఎంట్రీలను దీనితో ధృవీకరించండి:

```
show databases
show users
```

InfluxDB షెల్ నుండి నిష్క్రమించండి.

```
exit
```

InfluxDB రన్ అవుతోంది మరియు Geth నుండి మెట్రిక్స్‌ను నిల్వ చేయడానికి కాన్ఫిగర్ చేయబడింది.

## Gethను సిద్ధం చేయడం {#preparing-geth}

డేటాబేస్‌ను సెటప్ చేసిన తర్వాత, మనం Gethలో మెట్రిక్స్ సేకరణను ప్రారంభించాలి. `geth --help`లోని `METRICS AND STATS OPTIONS`పై శ్రద్ధ వహించండి. అక్కడ బహుళ ఎంపికలను కనుగొనవచ్చు, ఈ సందర్భంలో Geth డేటాను InfluxDBకి పుష్ చేయాలని మేము కోరుకుంటున్నాము.
ప్రాథమిక సెటప్ InfluxDB చేరుకోగల ఎండ్‌పాయింట్‌ను మరియు డేటాబేస్ కోసం ప్రామాణీకరణను నిర్దేశిస్తుంది.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

ఈ ఫ్లాగ్‌లను క్లయింట్‌ను ప్రారంభించే కమాండ్‌కు జోడించవచ్చు లేదా కాన్ఫిగరేషన్ ఫైల్‌లో సేవ్ చేయవచ్చు.

ఉదాహరణకు డేటాబేస్‌లో మెట్రిక్స్‌ను జాబితా చేయడం ద్వారా Geth విజయవంతంగా డేటాను పుష్ చేస్తోందని మీరు ధృవీకరించవచ్చు. InfluxDB షెల్‌లో:

```
use geth
show measurements
```

## Grafanaను సెటప్ చేయడం {#setting-up-grafana}

తదుపరి దశ Grafanaను ఇన్‌స్టాల్ చేయడం, ఇది డేటాను గ్రాఫికల్‌గా వివరిస్తుంది. Grafana డాక్యుమెంటేషన్‌లో మీ వాతావరణం కోసం ఇన్‌స్టాలేషన్ ప్రక్రియను అనుసరించండి. మీకు వేరే విధంగా అవసరం లేకపోతే OSS వెర్షన్‌ను ఇన్‌స్టాల్ చేసుకున్నారని నిర్ధారించుకోండి.
రిపోజిటరీని ఉపయోగించి డెబియన్ పంపిణీల కోసం ఉదాహరణ ఇన్‌స్టాలేషన్ దశలు:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

మీరు Grafanaను రన్ చేసినప్పుడు, అది `localhost:3000` వద్ద చేరుకోవచ్చు.
ఈ పాత్‌ను యాక్సెస్ చేయడానికి మీకు ఇష్టమైన బ్రౌజర్‌ను ఉపయోగించండి, ఆపై డిఫాల్ట్ ఆధారాలతో లాగిన్ చేయండి (వినియోగదారు: `admin` మరియు పాస్‌వర్డ్: `admin`). ప్రాంప్ట్ చేయబడినప్పుడు, డిఫాల్ట్ పాస్‌వర్డ్‌ను మార్చి సేవ్ చేయండి.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

మీరు Grafana హోమ్ పేజీకి దారి మళ్లించబడతారు. ముందుగా, మీ సోర్స్ డేటాను సెటప్ చేయండి. ఎడమ బార్‌లోని కాన్ఫిగరేషన్ చిహ్నంపై క్లిక్ చేసి, "Data sources" ఎంచుకోండి.

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

ఇంకా ఎలాంటి డేటా సోర్స్‌లు సృష్టించబడలేదు, ఒకదాన్ని నిర్వచించడానికి "Add data source"పై క్లిక్ చేయండి.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

ఈ సెటప్ కోసం, "InfluxDB"ని ఎంచుకుని కొనసాగండి.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

మీరు ఒకే మెషీన్‌లో సాధనాలను రన్ చేస్తుంటే డేటా సోర్స్ కాన్ఫిగరేషన్ చాలా సులభం. డేటాబేస్‌ను యాక్సెస్ చేయడానికి మీరు InfluxDB చిరునామా మరియు వివరాలను సెట్ చేయాలి. దిగువ చిత్రాన్ని చూడండి.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

అంతా పూర్తయి, InfluxDB చేరుకోగలిగితే, "Save and test"పై క్లిక్ చేసి, నిర్ధారణ పాప్ అప్ అయ్యే వరకు వేచి ఉండండి.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

InfluxDB నుండి డేటాను చదవడానికి Grafana ఇప్పుడు సెటప్ చేయబడింది. ఇప్పుడు మీరు దాన్ని వివరించే మరియు ప్రదర్శించే డ్యాష్‌బోర్డ్‌ను సృష్టించాలి. డ్యాష్‌బోర్డ్‌ల లక్షణాలు JSON ఫైల్‌లలో ఎన్‌కోడ్ చేయబడతాయి, వీటిని ఎవరైనా సృష్టించవచ్చు మరియు సులభంగా దిగుమతి చేసుకోవచ్చు. ఎడమ బార్‌లో, "Create and Import"పై క్లిక్ చేయండి.

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Geth పర్యవేక్షణ డ్యాష్‌బోర్డ్ కోసం, [ఈ డ్యాష్‌బోర్డ్](https://grafana.com/grafana/dashboards/13877/) యొక్క IDని కాపీ చేసి, Grafanaలోని "Import page"లో అతికించండి. డ్యాష్‌బోర్డ్‌ను సేవ్ చేసిన తర్వాత, ఇది ఈ విధంగా కనిపిస్తుంది:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

మీరు మీ డ్యాష్‌బోర్డ్‌లను సవరించవచ్చు. ప్రతి ప్యానెల్‌ను సవరించవచ్చు, తరలించవచ్చు, తీసివేయవచ్చు లేదా జోడించవచ్చు. మీరు మీ కాన్ఫిగరేషన్‌లను మార్చుకోవచ్చు. ఇది మీ ఇష్టం! డ్యాష్‌బోర్డ్‌లు ఎలా పని చేస్తాయో మరింత తెలుసుకోవడానికి, [Grafana డాక్యుమెంటేషన్](https://grafana.com/docs/grafana/latest/dashboards/)ను చూడండి.
మీకు [అలర్టింగ్ (Alerting)](https://grafana.com/docs/grafana/latest/alerting/) పట్ల కూడా ఆసక్తి ఉండవచ్చు. మెట్రిక్స్ నిర్దిష్ట విలువలను చేరుకున్నప్పుడు అలర్ట్ నోటిఫికేషన్‌లను సెటప్ చేయడానికి ఇది మిమ్మల్ని అనుమతిస్తుంది. వివిధ కమ్యూనికేషన్ ఛానెల్‌లకు మద్దతు ఉంది.