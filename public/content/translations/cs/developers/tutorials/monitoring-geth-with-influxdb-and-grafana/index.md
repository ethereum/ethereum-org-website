---
title: "Monitorování Gethu pomocí InfluxDB a Grafany"
description: "Nastavte si monitorování pro svůj uzel Geth pomocí InfluxDB a Grafany, abyste mohli sledovat výkon a identifikovat problémy."
author: "Mario Havel"
tags: ["klienti", "uzly"]
skill: intermediate
breadcrumb: "Monitorování Gethu"
lang: cs
published: 2021-01-13
---

Tento návod vám pomůže nastavit monitorování pro váš uzel Geth, abyste lépe porozuměli jeho výkonu a dokázali identifikovat potenciální problémy.

## Předpoklady {#prerequisites}

- Měli byste již mít spuštěnou instanci klienta Geth.
- Většina kroků a příkladů je určena pro prostředí Linux, takže se vám budou hodit základní znalosti práce s terminálem.
- Podívejte se na tento video přehled sady metrik Gethu: [Monitorování infrastruktury Etherea od Pétera Szilágyiho](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Monitorovací stack {#monitoring-stack}

Klient Etherea shromažďuje spoustu dat, která lze číst ve formě chronologické databáze. Pro usnadnění monitorování můžete tato data předávat do softwaru pro vizualizaci dat. K dispozici je několik možností:

- [Prometheus](https://prometheus.io/) (model pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (model push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Existuje také [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), což je varianta předkonfigurovaná s InfluxDB a Grafanou.

V tomto návodu nastavíme vašeho klienta Geth tak, aby odesílal data do InfluxDB pro vytvoření databáze a do Grafany pro vytvoření grafické vizualizace dat. Manuální nastavení vám pomůže lépe pochopit celý proces, upravovat jej a nasadit v různých prostředích.

## Nastavení InfluxDB {#setting-up-influxdb}

Nejprve si stáhneme a nainstalujeme InfluxDB. Různé možnosti stahování najdete na [stránce vydání Influxdata](https://portal.influxdata.com/downloads/). Vyberte si tu, která vyhovuje vašemu prostředí.
Můžete ji také nainstalovat z [repozitáře](https://repos.influxdata.com/). Například v distribuci založené na Debianu:

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

Po úspěšné instalaci InfluxDB se ujistěte, že běží na pozadí. Ve výchozím nastavení je dostupná na adrese `localhost:8086`.
Před použitím klienta `influx` musíte vytvořit nového uživatele s administrátorskými právy. Tento uživatel bude sloužit pro správu na vysoké úrovni, vytváření databází a uživatelů.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Nyní můžete použít klienta influx pro vstup do [shellu InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) s tímto uživatelem.

```
influx -username 'username' -password 'password'
```

Při přímé komunikaci s InfluxDB v jejím shellu můžete vytvořit databázi a uživatele pro metriky Gethu.

```
create database geth
create user geth with password choosepassword
```

Ověřte vytvořené záznamy pomocí:

```
show databases
show users
```

Opusťte shell InfluxDB.

```
exit
```

InfluxDB nyní běží a je nakonfigurována pro ukládání metrik z Gethu.

## Příprava Gethu {#preparing-geth}

Po nastavení databáze musíme v Gethu povolit sběr metrik. Věnujte pozornost `METRICS AND STATS OPTIONS` v `geth --help`. Najdete tam více možností, v tomto případě chceme, aby Geth odesílal data do InfluxDB.
Základní nastavení specifikuje koncový bod, kde je InfluxDB dostupná, a autentizaci pro databázi.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Tyto příznaky lze připojit k příkazu spouštějícímu klienta nebo uložit do konfiguračního souboru.

Můžete ověřit, že Geth úspěšně odesílá data, například vypsáním metrik v databázi. V shellu InfluxDB:

```
use geth
show measurements
```

## Nastavení Grafany {#setting-up-grafana}

Dalším krokem je instalace Grafany, která bude data graficky interpretovat. Postupujte podle instalačního procesu pro vaše prostředí v dokumentaci Grafany. Ujistěte se, že instalujete verzi OSS, pokud nechcete jinou.
Příklad kroků instalace pro distribuce Debian pomocí repozitáře:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Když máte Grafanu spuštěnou, měla by být dostupná na adrese `localhost:3000`.
Použijte svůj oblíbený prohlížeč pro přístup k této cestě a poté se přihlaste pomocí výchozích přihlašovacích údajů (uživatel: `admin` a heslo: `admin`). Po vyzvání změňte výchozí heslo a uložte.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

Budete přesměrováni na domovskou stránku Grafany. Nejprve nastavte zdrojová data. Klikněte na ikonu konfigurace v levém panelu a vyberte „Data sources“ (Zdroje dat).

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

Zatím nejsou vytvořeny žádné zdroje dat, klikněte na „Add data source“ (Přidat zdroj dat) pro jeho definování.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

Pro toto nastavení vyberte „InfluxDB“ a pokračujte.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

Konfigurace zdroje dat je poměrně přímočará, pokud spouštíte nástroje na stejném stroji. Musíte nastavit adresu InfluxDB a podrobnosti pro přístup k databázi. Podívejte se na obrázek níže.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

Pokud je vše kompletní a InfluxDB je dostupná, klikněte na „Save and test“ (Uložit a otestovat) a počkejte, až se objeví potvrzení.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Grafana je nyní nastavena pro čtení dat z InfluxDB. Nyní musíte vytvořit řídicí panel (dashboard), který je bude interpretovat a zobrazovat. Vlastnosti řídicích panelů jsou zakódovány v souborech JSON, které může vytvořit kdokoli a lze je snadno importovat. V levém panelu klikněte na „Create and Import“ (Vytvořit a importovat).

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Pro řídicí panel monitorování Gethu zkopírujte ID [tohoto řídicího panelu](https://grafana.com/grafana/dashboards/13877/) a vložte jej na stránku „Import“ v Grafaně. Po uložení by měl řídicí panel vypadat takto:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

Své řídicí panely můžete upravovat. Každý panel lze upravit, přesunout, odstranit nebo přidat. Můžete měnit své konfigurace. Je to jen na vás! Chcete-li se dozvědět více o tom, jak řídicí panely fungují, nahlédněte do [dokumentace Grafany](https://grafana.com/docs/grafana/latest/dashboards/).
Mohlo by vás také zajímat [Upozorňování (Alerting)](https://grafana.com/docs/grafana/latest/alerting/). To vám umožní nastavit upozornění pro případ, kdy metriky dosáhnou určitých hodnot. Podporovány jsou různé komunikační kanály.