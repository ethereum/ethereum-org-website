---
title: Kufuatilia Geth kwa kutumia InfluxDB na Grafana
description: Sanidi ufuatiliaji wa nodi yako ya Geth ukitumia InfluxDB na Grafana ili kufuatilia utendaji na kutambua matatizo.
author: "Mario Havel"
tags:
  - wateja
  - nodi
skill: intermediate
breadcrumb: Kufuatilia Geth
lang: sw
published: 2021-01-13
---

Mafunzo haya yatakusaidia kusanidi ufuatiliaji wa nodi yako ya Geth ili uweze kuelewa vyema utendaji wake na kutambua matatizo yanayoweza kutokea.

## Mahitaji ya awali {#prerequisites}

- Unapaswa kuwa tayari unaendesha mfumo wa Geth.
- Hatua na mifano mingi ni kwa ajili ya mazingira ya Linux, ujuzi wa kimsingi wa terminal utasaidia.
- Tazama muhtasari huu wa video wa vipimo vya Geth: [Kufuatilia miundombinu ya Ethereum na Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Mkusanyiko wa ufuatiliaji {#monitoring-stack}

Mteja wa Ethereum hukusanya data nyingi ambazo zinaweza kusomwa kwa muundo wa hifadhidata ya mpangilio wa wakati. Ili kurahisisha ufuatiliaji, unaweza kuingiza haya kwenye programu ya taswira ya data. Kuna chaguzi nyingi zinazopatikana:

- [Prometheus](https://prometheus.io/) (muundo wa kuvuta)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (muundo wa kusukuma)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Ikiwa unapendelea Prometheus, Geth pia inaweza kuonyesha vipimo vyake katika muundo wa Prometheus. Anzisha Geth na `--metrics --metrics.addr 127.0.0.1` na uelekeze Prometheus kwenye `http://127.0.0.1:6060/debug/metrics/prometheus`.

Katika mafunzo haya, tutasanidi mteja wako wa Geth kusukuma data kwenye InfluxDB ili kuunda hifadhidata na Grafana ili kuunda taswira ya grafu ya data. Kufanya hivi kwa mikono kutakusaidia kuelewa mchakato vizuri zaidi, kuubadilisha, na kusambaza katika mazingira tofauti.

## Kusanidi InfluxDB {#setting-up-influxdb}

Kwanza, hebu tupakue na kusakinisha InfluxDB. Mafunzo haya yanatumia InfluxDB 1.x (OSS), ambayo Geth inasaidia na alama za `--metrics.influxdb` hapa chini. Matoleo mapya ya InfluxDB yanatumia usanidi tofauti na mashirika, ndoo (buckets) na tokeni badala ya hifadhidata na watumiaji. Geth inasaidia InfluxDB 2.x na alama za `--metrics.influxdbv2`, lakini hatua za usanidi katika mafunzo haya zinatumika tu kwa 1.x.

Fuata [maagizo ya usakinishaji wa InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) kwa mazingira yako. Kwa mfano, kwenye Debian au Ubuntu unaweza kuisakinisha kutoka kwenye hazina ya InfluxData. Angalia maagizo ya usakinishaji kwa alama ya vidole ya sasa ya ufunguo wa kusaini kabla ya kuamini ufunguo:

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

Kifurushi cha `influxdb` kinajumuisha mteja wa mstari wa amri wa `influx`.

Baada ya kusakinisha InfluxDB kwa mafanikio, hakikisha inafanya kazi chinichini. Kwa chaguo-msingi, inapatikana kwenye `localhost:8086`.
Kabla ya kutumia mteja wa `influx`, inabidi uunde mtumiaji mpya aliye na haki za msimamizi. Mtumiaji huyu atatumika kwa usimamizi wa kiwango cha juu, kuunda hifadhidata na watumiaji.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Sasa unaweza kutumia mteja wa influx kuingia kwenye [shell ya InfluxDB](https://docs.influxdata.com/influxdb/v1/tools/shell/) na mtumiaji huyu.

```sh
influx -username 'username' -password 'password'
```

Ukiwasiliana moja kwa moja na InfluxDB kwenye shell yake, unaweza kuunda hifadhidata na mtumiaji kwa vipimo vya geth.

```sql
create database geth
create user geth with password '<geth-password>'
```

Thibitisha maingizo yaliyoundwa na:

```sql
show databases
show users
```

Ondoka kwenye shell ya InfluxDB.

```
exit
```

InfluxDB inafanya kazi na imesanidiwa kuhifadhi vipimo kutoka kwa Geth.

## Kuandaa Geth {#preparing-geth}

Baada ya kusanidi hifadhidata, tunahitaji kuwezesha ukusanyaji wa vipimo kwenye Geth. Zingatia `METRICS AND STATS OPTIONS` katika `geth --help`. Chaguzi nyingi zinaweza kupatikana hapo, katika kesi hii tunataka Geth isukume data kwenye InfluxDB.
Usanidi wa kimsingi unabainisha sehemu ya mwisho ambapo InfluxDB inapatikana na uthibitishaji kwa hifadhidata.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Tumia nenosiri lile lile uliloweka ulipounda mtumiaji wa `geth`. Alama hizi zinaweza kuongezwa kwenye amri inayoanzisha mteja au kuhifadhiwa kwenye faili ya usanidi.

Unaweza kuthibitisha kuwa Geth inasukuma data kwa mafanikio, kwa mfano kwa kuorodhesha vipimo kwenye hifadhidata. Kwenye shell ya InfluxDB:

```sql
use geth
show measurements
```

## Kusanidi Grafana {#setting-up-grafana}

Hatua inayofuata ni kusakinisha Grafana ambayo itatafsiri data kwa njia ya picha. Fuata [mchakato wa usakinishaji kwa mazingira yako](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) katika nyaraka za Grafana. Hakikisha unasakinisha toleo la OSS isipokuwa kama unahitaji kitu kingine.
Mfano wa hatua za usakinishaji kwa Debian au Ubuntu ukitumia hazina ya Grafana:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Unapokuwa na Grafana inafanya kazi, inapaswa kupatikana kwenye `localhost:3000`.
Tumia kivinjari unachopendelea kufikia njia hii, kisha ingia na vitambulisho vya chaguo-msingi (mtumiaji: `admin` na nenosiri: `admin`). Unapoulizwa, badilisha nenosiri la chaguo-msingi na uhifadhi.

![Picha ya skrini ya dashibodi ya Grafana kwa ufuatiliaji wa Geth (paneli 1)](./grafana1.png)

Utaelekezwa kwenye ukurasa wa nyumbani wa Grafana. Kwanza, sanidi data yako ya chanzo. Fungua menyu na uchague **Connections > Data sources**. Picha za skrini katika mafunzo haya ni kutoka kwa toleo la zamani la Grafana, kwa hivyo skrini zako zinaweza kuonekana tofauti kidogo.

![Picha ya skrini ya dashibodi ya Grafana kwa ufuatiliaji wa Geth (paneli 2)](./grafana2.png)

Hakuna vyanzo vya data vilivyoundwa bado, bofya kwenye "Add data source" ili kufafanua kimoja.

![Picha ya skrini ya dashibodi ya Grafana kwa ufuatiliaji wa Geth (paneli 3)](./grafana3.png)

Kwa usanidi huu, chagua "InfluxDB" na uendelee.

![Picha ya skrini ya dashibodi ya Grafana kwa ufuatiliaji wa Geth (paneli 4)](./grafana4.png)

Usanidi wa chanzo cha data ni wa moja kwa moja ikiwa unaendesha zana kwenye mashine moja. Unahitaji kuweka anwani ya InfluxDB na maelezo ya kufikia hifadhidata. Rejelea picha hapa chini.

![Picha ya skrini ya dashibodi ya Grafana kwa ufuatiliaji wa Geth (paneli 5)](./grafana5.png)

Ikiwa kila kitu kimekamilika na InfluxDB inapatikana, bofya kwenye "Save and test" na usubiri uthibitisho ujitokeze.

![Picha ya skrini ya dashibodi ya Grafana kwa ufuatiliaji wa Geth (paneli 6)](./grafana6.png)

Grafana sasa imesanidiwa kusoma data kutoka InfluxDB. Sasa unahitaji kuunda dashibodi ambayo itatafsiri na kuionyesha. Sifa za dashibodi zimesimbwa katika faili za JSON ambazo zinaweza kuundwa na mtu yeyote na kuletwa kwa urahisi. Fungua menyu na uchague **Dashboards**, kisha ubofye **New > Import**.

![Picha ya skrini ya dashibodi ya Grafana kwa ufuatiliaji wa Geth (paneli 7)](./grafana7.png)

Kwa dashibodi ya ufuatiliaji wa Geth, nakili kitambulisho cha [dashibodi hii](https://grafana.com/grafana/dashboards/13877/) na ubandike kwenye "Import page" katika Grafana. Baada ya kuhifadhi dashibodi, inapaswa kuonekana hivi:

![Picha ya skrini ya dashibodi ya Grafana kwa ufuatiliaji wa Geth (paneli 8)](./grafana8.png)

Unaweza kurekebisha dashibodi zako. Kila paneli inaweza kuhaririwa, kuhamishwa, kuondolewa au kuongezwa. Unaweza kubadilisha usanidi wako. Ni juu yako! Ili kujifunza zaidi kuhusu jinsi dashibodi zinavyofanya kazi, rejelea [nyaraka za Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Unaweza pia kuvutiwa na [Kutoa Tahadhari](https://grafana.com/docs/grafana/latest/alerting/). Hii inakuwezesha kusanidi arifa za tahadhari wakati vipimo vinafikia viwango fulani. Njia mbalimbali za mawasiliano zinasaidiwa.
