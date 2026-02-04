---
title: Kufuatilia Geth kwa kutumia InfluxDB na Grafana
description: Weka ufuatiliaji kwa nodi yako ya Geth kwa kutumia InfluxDB na Grafana ili kufuatilia utendaji na kutambua matatizo.
author: "Mario Havel"
tags: [ "wateja", "nodi" ]
skill: intermediate
lang: sw
published: 2021-01-13
---

Mafunzo haya yatakusaidia kuweka ufuatiliaji wa nodi yako ya Geth ili uweze kuelewa vyema utendaji wake na kutambua matatizo yanayoweza kutokea.

## Mahitaji ya awali {#prerequisites}

- Unapaswa kuwa tayari unaendesha mfano wa Geth.
- Hatua na mifano mingi ni kwa ajili ya mazingira ya linux, ujuzi wa msingi wa terminal utasaidia.
- Angalia muhtasari huu wa video wa seti ya vipimo vya Geth: [Monitoring an Ethereum infrastructure by Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Rundo la ufuatiliaji {#monitoring-stack}

Mteja wa Ethereum hukusanya data nyingi ambayo inaweza kusomwa katika mfumo wa hifadhidata ya mpangilio wa matukio. Ili kurahisisha ufuatiliaji, unaweza kuiingiza katika programu ya kuonesha data. Kuna chaguo nyingi zinazopatikana:

- [Prometheus](https://prometheus.io/) (mfumo wa kuvuta)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (mfumo wa kusukuma)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Pia kuna [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), chaguo lililowekwa tayari na InfluxDB na Grafana.

Katika mafunzo haya, tutaweka mteja wako wa Geth ili kusukuma data kwenda InfluxDB ili kuunda hifadhidata na Grafana ili kuunda taswira ya grafu ya data. Kufanya hivi mwenyewe kutakusaidia kuelewa mchakato vizuri zaidi, kuubadilisha, na kuupeleka katika mazingira tofauti.

## Inasanidi InfluxDB {#setting-up-influxdb}

Kwanza, hebu tupakue na kusakinisha InfluxDB. Chaguo mbalimbali za upakuaji zinaweza kupatikana kwenye [ukurasa wa matoleo wa Influxdata](https://portal.influxdata.com/downloads/). Chagua ile inayoendana na mazingira yako.
Unaweza pia kuisakinisha kutoka kwenye [repository](https://repos.influxdata.com/). Kwa mfano katika usambazaji unaotegemea Debian:

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

Baada ya kusakinisha InfluxDB kwa mafanikio, hakikisha inaendeshwa chinichini. Kwa chaguo-msingi, inapatikana katika `localhost:8086`.
Kabla ya kutumia mteja wa `influx`, unapaswa kuunda mtumiaji mpya mwenye haki za msimamizi. Mtumiaji huyu atatumiwa kwa usimamizi wa ngazi ya juu, kuunda hifadhidata na watumiaji.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Sasa unaweza kutumia mteja wa influx kuingia [shell ya InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) na mtumiaji huyu.

```
influx -username 'username' -password 'password'
```

Kwa kuwasiliana moja kwa moja na InfluxDB kwenye shell yake, unaweza kuunda hifadhidata na mtumiaji kwa vipimo vya geth.

```
unda hifadhidata geth
unda mtumiaji geth na nenosiri chaguapassword
```

Thibitisha viingilio vilivyoundwa na:

```
onyesha hifadhidata
onyesha watumiaji
```

Toka kwenye shell ya InfluxDB.

```
toka
```

InfluxDB inaendeshwa na imesanidiwa kuhifadhi vipimo kutoka Geth.

## Inatayarisha Geth {#preparing-geth}

Baada ya kusanidi hifadhidata, tunahitaji kuwezesha ukusanyaji wa vipimo katika Geth. Zingatia `METRICS AND STATS OPTIONS` katika `geth --help`. Chaguo nyingi zinaweza kupatikana hapo, katika kesi hii tunataka Geth isukume data kwenye InfluxDB.
Usanidi wa msingi unabainisha kituo ambapo InfluxDB inapatikana na uthibitishaji wa hifadhidata.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Bendera hizi zinaweza kuongezwa kwenye amri inayoanzisha mteja au kuhifadhiwa kwenye faili ya usanidi.

Unaweza kuthibitisha kwamba Geth inasukuma data kwa mafanikio, kwa mfano kwa kuorodhesha vipimo katika hifadhidata. Katika shell ya InfluxDB:

```
tumia geth
onyesha vipimo
```

## Inasanidi Grafana {#setting-up-grafana}

Hatua inayofuata ni kusakinisha Grafana ambayo itatafsiri data kwa njia ya picha. Fuata mchakato wa usakinishaji kwa mazingira yako katika nyaraka za Grafana. Hakikisha unasakinisha toleo la OSS ikiwa hutaki vinginevyo.
Mfano wa hatua za usakinishaji kwa usambazaji wa Debian kwa kutumia repository:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Ukishafanikiwa kuendesha Grafana, inapaswa kupatikana kwenye `localhost:3000`.
Tumia kivinjari chako unachopendelea kufikia njia hii, kisha ingia na vitambulisho vya chaguo-msingi (mtumiaji: `admin` na nenosiri: `admin`). Unapoombwa, badilisha nenosiri la chaguo-msingi na uhifadhi.

![](./grafana1.png)

Utaelekezwa kwenye ukurasa wa nyumbani wa Grafana. Kwanza, sanidi data yako chanzo. Bofya kwenye ikoni ya usanidi kwenye upau wa kushoto na uchague "Vyanzo vya data".

![](./grafana2.png)

Bado hakuna vyanzo vya data vilivyoundwa, bofya kwenye "Ongeza chanzo cha data" ili kufafanua kimoja.

![](./grafana3.png)

Kwa usanidi huu, chagua "InfluxDB" na uendelee.

![](./grafana4.png)

Usanidi wa chanzo cha data ni rahisi sana ikiwa unaendesha zana kwenye mashine moja. Unahitaji kuweka anwani ya InfluxDB na maelezo ya kufikia hifadhidata. Rejelea picha hapa chini.

![](./grafana5.png)

Ikiwa kila kitu kimekamilika na InfluxDB inapatikana, bofya kwenye "Hifadhi na ujaribu" na usubiri uthibitisho utokee.

![](./grafana6.png)

Sasa Grafana imesanidiwa kusoma data kutoka InfluxDB. Sasa unahitaji kuunda dashibodi ambayo itatafsiri na kuionyesha. Sifa za dashibodi zimesimbwa katika faili za JSON ambazo zinaweza kuundwa na mtu yeyote na kuingizwa kwa urahisi. Kwenye upau wa kushoto, bofya kwenye "Unda na Ingiza".

![](./grafana7.png)

Kwa dashibodi ya ufuatiliaji ya Geth, nakili ID ya [dashibodi hii](https://grafana.com/grafana/dashboards/13877/) na uibandike kwenye "Ukurasa wa kuingiza" katika Grafana. Baada ya kuhifadhi dashibodi, inapaswa kuonekana kama hivi:

![](./grafana8.png)

Unaweza kurekebisha dashibodi zako. Kila paneli inaweza kuhaririwa, kuhamishwa, kuondolewa au kuongezwa. Unaweza kubadilisha usanidi wako. Ni juu yako! Ili kujifunza zaidi kuhusu jinsi dashibodi zinavyofanya kazi, rejelea [nyaraka za Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Unaweza pia kupendezwa na [Kuarifu](https://grafana.com/docs/grafana/latest/alerting/). Hii inakuwezesha kuweka arifa za tahadhari kwa wakati vipimo vinafikia thamani fulani. Njia mbalimbali za mawasiliano zinatumika.
