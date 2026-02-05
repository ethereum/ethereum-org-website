---
title: Monitorování Gethu s InfluxDB a Grafanou
description: Nastavte si monitorování pro svůj Geth uzel pomocí InfluxDB a Grafany, abyste mohli sledovat jeho výkon a identifikovat problémy.
author: "Mario Havel"
tags: [ "klienti", "uzly" ]
skill: intermediate
lang: cs
published: 2021-01-13
---

Tento tutoriál vám pomůže nastavit monitorování pro váš Geth uzel, abyste mohli lépe porozumět jeho výkonu a identifikovat případné problémy.

## Předpoklady {#prerequisites}

- Měli byste již mít spuštěnou instanci Gethu.
- Většina kroků a příkladů je určena pro prostředí Linux, takže se bude hodit základní znalost terminálu.
- Podívejte se na tento videopřehled sady metrik Gethu: [Monitorování infrastruktury Ethereum od Pétera Szilágyiho](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Sada pro monitorování {#monitoring-stack}

Klient Etherea shromažďuje spoustu dat, která lze číst ve formě chronologické databáze. Pro usnadnění monitorování je můžete vložit do softwaru pro vizualizaci dat. K dispozici je více možností:

- [Prometheus](https://prometheus.io/) (pull model)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (push model)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Existuje také [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), možnost předkonfigurovaná s InfluxDB a Grafanou.

V tomto tutoriálu nastavíme vašeho klienta Geth tak, aby odesílal data do InfluxDB k vytvoření databáze a Grafanu k vytvoření grafické vizualizace dat. Ruční provedení vám pomůže lépe porozumět procesu, měnit ho a nasazovat v různých prostředích.

## Nastavení InfluxDB {#setting-up-influxdb}

Nejprve si stáhněme a nainstalujme InfluxDB. Různé možnosti stažení naleznete na [stránce s verzemi Influxdata](https://portal.influxdata.com/downloads/). Vyberte si tu, která vyhovuje vašemu prostředí.
Můžete ji také nainstalovat z [úložiště](https://repos.influxdata.com/). Například v distribuci založené na Debianu:

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

Po úspěšné instalaci InfluxDB se ujistěte, že běží na pozadí. Ve výchozím nastavení je dostupná na `localhost:8086`.
Před použitím klienta `influx` musíte vytvořit nového uživatele s oprávněními správce. Tento uživatel bude sloužit pro správu na vysoké úrovni, vytváření databází a uživatelů.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Nyní můžete použít klienta influx pro vstup do [InfluxDB shellu](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) s tímto uživatelem.

```
influx -username 'username' -password 'password'
```

Přímou komunikací s InfluxDB v jeho shellu můžete vytvořit databázi a uživatele pro metriky Geth.

```
create database geth
create user geth with password choosepassword
```

Ověřte vytvořené položky pomocí:

```
show databases
show users
```

Opusťte InfluxDB shell.

```
exit
```

InfluxDB běží a je nakonfigurována pro ukládání metrik z Gethu.

## Příprava Gethu {#preparing-geth}

Po nastavení databáze musíme v Gethu povolit sběr metrik. Věnujte pozornost `METRICS AND STATS OPTIONS` v `geth --help`. Naleznete zde několik možností, v tomto případě chceme, aby Geth odesílal data do InfluxDB.
Základní nastavení specifikuje koncový bod, kde je InfluxDB dostupná, a ověření pro databázi.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Tyto příznaky mohou být připojeny k příkazu spouštějícímu klienta nebo uloženy do konfiguračního souboru.

Můžete ověřit, že Geth úspěšně odesílá data, například výpisem metrik v databázi. V InfluxDB shellu:

```
use geth
show measurements
```

## Nastavení Grafany {#setting-up-grafana}

Dalším krokem je instalace Grafany, která bude interpretovat data graficky. Postupujte podle instalačního procesu pro vaše prostředí v dokumentaci Grafany. Ujistěte se, že instalujete verzi OSS, pokud nechcete jinak.
Příklad instalačních kroků pro distribuce Debian s použitím úložiště:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Když máte Grafanu spuštěnou, měla by být dostupná na `localhost:3000`.
Použijte preferovaný prohlížeč pro přístup k této cestě, poté se přihlaste s výchozími přihlašovacími údaji (uživatel: `admin` a heslo: `admin`). Po zobrazení výzvy změňte výchozí heslo a uložte.

![](./grafana1.png)

Budete přesměrováni na domovskou stránku Grafany. Nejprve nastavte svá zdrojová data. Klikněte na ikonu konfigurace v levém panelu a vyberte „Zdroje dat“.

![](./grafana2.png)

Zatím nejsou vytvořeny žádné zdroje dat, klikněte na „Přidat zdroj dat“ pro definování jednoho.

![](./grafana3.png)

Pro toto nastavení vyberte „InfluxDB“ a pokračujte.

![](./grafana4.png)

Konfigurace zdroje dat je poměrně jednoduchá, pokud spouštíte nástroje na stejném stroji. Musíte nastavit adresu InfluxDB a podrobnosti pro přístup k databázi. Viz obrázek níže.

![](./grafana5.png)

Pokud je vše kompletní a InfluxDB je dostupná, klikněte na „Uložit a testovat“ a počkejte, až se zobrazí potvrzení.

![](./grafana6.png)

Grafana je nyní nastavena ke čtení dat z InfluxDB. Nyní musíte vytvořit panel, který je bude interpretovat a zobrazovat. Vlastnosti panelů jsou kódovány v souborech JSON, které může kdokoli vytvořit a snadno importovat. V levém panelu klikněte na „Vytvořit a importovat“.

![](./grafana7.png)

Pro monitorovací panel Geth zkopírujte ID [tohoto panelu](https://grafana.com/grafana/dashboards/13877/) a vložte jej na stránku „Importovat“ v Grafaně. Po uložení panelu by měl vypadat takto:

![](./grafana8.png)

Své panely můžete upravovat. Každý panel lze upravovat, přesouvat, odstraňovat nebo přidávat. Můžete měnit své konfigurace. Je to na vás! Chcete-li se dozvědět více o tom, jak panely fungují, podívejte se do [dokumentace Grafany](https://grafana.com/docs/grafana/latest/dashboards/).
Mohlo by vás také zajímat [Upozorňování](https://grafana.com/docs/grafana/latest/alerting/). To vám umožní nastavit upozornění pro případy, kdy metriky dosáhnou určitých hodnot. Jsou podporovány různé komunikační kanály.
