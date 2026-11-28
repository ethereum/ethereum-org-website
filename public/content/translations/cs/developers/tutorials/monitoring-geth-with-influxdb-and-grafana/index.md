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

Klient Etherea shromažďuje spoustu dat, která lze číst ve formě chronologické databáze. Aby bylo monitorování snazší, můžete tato data předávat do softwaru pro vizualizaci dat. K dispozici je několik možností:

- [Prometheus](https://prometheus.io/) (model pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (model push)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Pokud dáváte přednost Prometheu, Geth může také vystavovat své metriky ve formátu Prometheus. Spusťte Geth s `--metrics --metrics.addr 127.0.0.1` a nasměrujte Prometheus na `http://127.0.0.1:6060/debug/metrics/prometheus`.

V tomto návodu nastavíme vašeho klienta Geth tak, aby odesílal data do InfluxDB pro vytvoření databáze a do Grafany pro vytvoření grafické vizualizace dat. Ruční nastavení vám pomůže lépe pochopit proces, upravit jej a nasadit v různých prostředích.

## Nastavení InfluxDB {#setting-up-influxdb}

Nejprve si stáhneme a nainstalujeme InfluxDB. Tento návod používá InfluxDB 1.x (OSS), kterou Geth podporuje pomocí příznaků `--metrics.influxdb` níže. Novější verze InfluxDB používají odlišné nastavení s organizacemi, buckety a tokeny namísto databází a uživatelů. Geth podporuje InfluxDB 2.x pomocí příznaků `--metrics.influxdbv2`, ale kroky nastavení v tomto návodu se vztahují pouze na verzi 1.x.

Postupujte podle [pokynů k instalaci InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) pro vaše prostředí. Například na Debianu nebo Ubuntu ji můžete nainstalovat z repozitáře InfluxData. Než klíči začnete důvěřovat, zkontrolujte v pokynech k instalaci aktuální otisk podepisovacího klíče:

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

Balíček `influxdb` obsahuje klienta příkazového řádku `influx`.

Po úspěšné instalaci InfluxDB se ujistěte, že běží na pozadí. Ve výchozím nastavení je dostupná na `localhost:8086`.
Před použitím klienta `influx` musíte vytvořit nového uživatele s administrátorskými právy. Tento uživatel bude sloužit pro správu na vysoké úrovni, vytváření databází a uživatelů.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Nyní můžete použít klienta influx pro vstup do [shellu InfluxDB](https://docs.influxdata.com/influxdb/v1/tools/shell/) s tímto uživatelem.

```sh
influx -username 'username' -password 'password'
```

Přímou komunikací s InfluxDB v jejím shellu můžete vytvořit databázi a uživatele pro metriky Gethu.

```sql
create database geth
create user geth with password '<geth-password>'
```

Ověřte vytvořené záznamy pomocí:

```sql
show databases
show users
```

Opusťte shell InfluxDB.

```
exit
```

InfluxDB běží a je nakonfigurována pro ukládání metrik z Gethu.

## Příprava Gethu {#preparing-geth}

Po nastavení databáze musíme v Gethu povolit shromažďování metrik. Věnujte pozornost `METRICS AND STATS OPTIONS` v `geth --help`. Lze tam najít více možností, v tomto případě chceme, aby Geth odesílal data do InfluxDB.
Základní nastavení specifikuje koncový bod, kde je InfluxDB dostupná, a ověřování pro databázi.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Použijte stejné heslo, které jste nastavili při vytváření uživatele `geth`. Tyto příznaky lze připojit k příkazu spouštějícímu klienta nebo uložit do konfiguračního souboru.

Můžete ověřit, že Geth úspěšně odesílá data, například vypsáním metrik v databázi. V shellu InfluxDB:

```sql
use geth
show measurements
```

## Nastavení Grafany {#setting-up-grafana}

Dalším krokem je instalace Grafany, která bude data graficky interpretovat. Postupujte podle [procesu instalace pro vaše prostředí](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) v dokumentaci Grafany. Ujistěte se, že instalujete verzi OSS, pokud nepotřebujete něco jiného.
Příklad kroků instalace pro Debian nebo Ubuntu pomocí repozitáře Grafany:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Když vám Grafana běží, měla by být dostupná na `localhost:3000`.
Použijte svůj oblíbený prohlížeč pro přístup k této cestě a poté se přihlaste pomocí výchozích přihlašovacích údajů (uživatel: `admin` a heslo: `admin`). Po vyzvání změňte výchozí heslo a uložte.

![Snímek obrazovky řídicího panelu Grafany pro monitorování Gethu (panel 1)](./grafana1.png)

Budete přesměrováni na domovskou stránku Grafany. Nejprve nastavte svá zdrojová data. Otevřete nabídku a vyberte **Connections > Data sources**. Snímky obrazovky v tomto návodu jsou ze starší verze Grafany, takže vaše obrazovky mohou vypadat trochu jinak.

![Snímek obrazovky řídicího panelu Grafany pro monitorování Gethu (panel 2)](./grafana2.png)

Zatím nejsou vytvořeny žádné zdroje dat, klikněte na „Add data source“ pro definování jednoho z nich.

![Snímek obrazovky řídicího panelu Grafany pro monitorování Gethu (panel 3)](./grafana3.png)

Pro toto nastavení vyberte „InfluxDB“ a pokračujte.

![Snímek obrazovky řídicího panelu Grafany pro monitorování Gethu (panel 4)](./grafana4.png)

Konfigurace zdroje dat je poměrně přímočará, pokud spouštíte nástroje na stejném stroji. Musíte nastavit adresu InfluxDB a podrobnosti pro přístup k databázi. Podívejte se na obrázek níže.

![Snímek obrazovky řídicího panelu Grafany pro monitorování Gethu (panel 5)](./grafana5.png)

Pokud je vše hotovo a InfluxDB je dostupná, klikněte na „Save and test“ a počkejte, až se objeví potvrzení.

![Snímek obrazovky řídicího panelu Grafany pro monitorování Gethu (panel 6)](./grafana6.png)

Grafana je nyní nastavena pro čtení dat z InfluxDB. Nyní musíte vytvořit řídicí panel (dashboard), který je bude interpretovat a zobrazovat. Vlastnosti řídicích panelů jsou zakódovány v souborech JSON, které může vytvořit kdokoli a snadno je importovat. Otevřete nabídku a vyberte **Dashboards**, poté klikněte na **New > Import**.

![Snímek obrazovky řídicího panelu Grafany pro monitorování Gethu (panel 7)](./grafana7.png)

Pro řídicí panel monitorování Gethu zkopírujte ID [tohoto řídicího panelu](https://grafana.com/grafana/dashboards/13877/) a vložte jej na stránku „Import“ v Grafaně. Po uložení by měl řídicí panel vypadat takto:

![Snímek obrazovky řídicího panelu Grafany pro monitorování Gethu (panel 8)](./grafana8.png)

Své řídicí panely můžete upravovat. Každý panel lze upravit, přesunout, odstranit nebo přidat. Můžete měnit své konfigurace. Je to na vás! Chcete-li se dozvědět více o tom, jak řídicí panely fungují, podívejte se do [dokumentace Grafany](https://grafana.com/docs/grafana/latest/dashboards/).
Mohlo by vás také zajímat [Upozorňování (Alerting)](https://grafana.com/docs/grafana/latest/alerting/). To vám umožní nastavit upozornění, když metriky dosáhnou určitých hodnot. Jsou podporovány různé komunikační kanály.
