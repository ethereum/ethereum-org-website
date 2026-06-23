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

Mteja wa Ethereum hukusanya data nyingi ambazo zinaweza kusomwa kwa mfumo wa hifadhidata ya mpangilio wa matukio. Ili kurahisisha ufuatiliaji, unaweza kuingiza haya kwenye programu ya kuona data. Kuna chaguzi nyingi zinazopatikana:

- [Prometheus](https://prometheus.io/) (mtindo wa kuvuta)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (mtindo wa kusukuma)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Pia kuna [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), chaguo lililosanidiwa mapema na InfluxDB na Grafana.

Katika mafunzo haya, tutasanidi mteja wako wa Geth kusukuma data kwenye InfluxDB ili kuunda hifadhidata na Grafana ili kuunda mwonekano wa grafu wa data. Kufanya hivi kwa mikono kutakusaidia kuelewa mchakato vizuri zaidi, kuubadilisha, na kusambaza katika mazingira tofauti.

## Kusanidi InfluxDB {#setting-up-influxdb}

Kwanza, hebu tupakue na kusakinisha InfluxDB. Chaguzi mbalimbali za kupakua zinaweza kupatikana kwenye [ukurasa wa matoleo wa Influxdata](https://portal.influxdata.com/downloads/). Chagua inayofaa mazingira yako.
Unaweza pia kuisakinisha kutoka kwenye [hifadhi](https://repos.influxdata.com/). Kwa mfano katika usambazaji unaotegemea Debian:

Baada ya kusakinisha InfluxDB kwa ufanisi, hakikisha inafanya kazi nyuma. Kwa chaguo-msingi, inapatikana kwenye `localhost:8086`.
Kabla ya kutumia mteja wa `influx`, inabidi uunde mtumiaji mpya aliye na mapendeleo ya msimamizi. Mtumiaji huyu atatumika kwa usimamizi wa kiwango cha juu, kuunda hifadhidata na watumiaji.

Sasa unaweza kutumia mteja wa influx kuingia kwenye [ganda la InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) na mtumiaji huyu.

Ukiwasiliana moja kwa moja na InfluxDB katika ganda lake, unaweza kuunda hifadhidata na mtumiaji kwa ajili ya vipimo vya geth.

Thibitisha maingizo yaliyoundwa kwa:

Ondoka kwenye ganda la InfluxDB.

InfluxDB inafanya kazi na imesanidiwa kuhifadhi vipimo kutoka kwa Geth.

## Kuandaa Geth {#preparing-geth}

Baada ya kusanidi hifadhidata, tunahitaji kuwezesha ukusanyaji wa vipimo katika Geth. Zingatia `METRICS AND STATS OPTIONS` katika `geth --help`. Chaguzi nyingi zinaweza kupatikana hapo, katika kesi hii tunataka Geth isukume data kwenye InfluxDB.
Usanidi wa kimsingi unabainisha sehemu ya mwisho ambapo InfluxDB inapatikana na uthibitishaji wa hifadhidata.

Alama hizi zinaweza kuongezwa kwenye amri inayoanzisha mteja au kuhifadhiwa kwenye faili ya usanidi.

Unaweza kuthibitisha kuwa Geth inasukuma data kwa ufanisi, kwa mfano kwa kuorodhesha vipimo katika hifadhidata. Katika ganda la InfluxDB:

## Kusanidi Grafana {#setting-up-grafana}

Hatua inayofuata ni kusakinisha Grafana ambayo itatafsiri data kwa njia ya picha. Fuata mchakato wa usakinishaji kwa mazingira yako katika nyaraka za Grafana. Hakikisha umesakinisha toleo la OSS ikiwa hutaki vinginevyo.
Mfano wa hatua za usakinishaji kwa usambazaji wa Debian kwa kutumia hifadhi:

Unapokuwa na Grafana inayoendesha, inapaswa kupatikana kwenye `localhost:3000`.
Tumia kivinjari unachopendelea kufikia njia hii, kisha ingia na vitambulisho vya chaguo-msingi (mtumiaji: `admin` na nenosiri: `admin`). Unapoulizwa, badilisha nenosiri la chaguo-msingi na uhifadhi.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

Utaelekezwa kwenye ukurasa wa nyumbani wa Grafana. Kwanza, sanidi data yako ya chanzo. Bofya kwenye ikoni ya usanidi kwenye upau wa kushoto na uchague "Data sources" (Vyanzo vya data).

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

Hakuna vyanzo vya data vilivyoundwa bado, bofya kwenye "Add data source" (Ongeza chanzo cha data) ili kufafanua kimoja.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

Kwa usanidi huu, chagua "InfluxDB" na uendelee.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

Usanidi wa chanzo cha data ni rahisi sana ikiwa unaendesha zana kwenye mashine moja. Unahitaji kuweka anwani ya InfluxDB na maelezo ya kufikia hifadhidata. Rejelea picha hapa chini.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

Ikiwa kila kitu kimekamilika na InfluxDB inapatikana, bofya kwenye "Save and test" (Hifadhi na ujaribu) na usubiri uthibitisho ujitokeze.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Grafana sasa imesanidiwa kusoma data kutoka InfluxDB. Sasa unahitaji kuunda dashibodi ambayo itatafsiri na kuionyesha. Sifa za dashibodi zimesimbwa katika faili za JSON ambazo zinaweza kuundwa na mtu yeyote na kuingizwa kwa urahisi. Kwenye upau wa kushoto, bofya kwenye "Create and Import" (Unda na Uingize).

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Kwa dashibodi ya ufuatiliaji wa Geth, nakili kitambulisho cha [dashibodi hii](https://grafana.com/grafana/dashboards/13877/) na ubandike katika "Import page" (Ukurasa wa kuingiza) katika Grafana. Baada ya kuhifadhi dashibodi, inapaswa kuonekana hivi:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

Unaweza kurekebisha dashibodi zako. Kila paneli inaweza kuhaririwa, kuhamishwa, kuondolewa au kuongezwa. Unaweza kubadilisha usanidi wako. Ni juu yako! Ili kujifunza zaidi kuhusu jinsi dashibodi zinavyofanya kazi, rejelea [nyaraka za Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Unaweza pia kuvutiwa na [Kutoa Tahadhari](https://grafana.com/docs/grafana/latest/alerting/). Hii inakuwezesha kusanidi arifa za tahadhari wakati vipimo vinafikia viwango fulani. Njia mbalimbali za mawasiliano zinatumika.