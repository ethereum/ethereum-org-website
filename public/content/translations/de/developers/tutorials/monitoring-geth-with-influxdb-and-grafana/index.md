---
title: "Geth mit InfluxDB und Grafana überwachen"
description: "Richten Sie die Überwachung für Ihren Geth-Knoten mit InfluxDB und Grafana ein, um die Leistung zu verfolgen und Probleme zu identifizieren."
author: "Mario Havel"
tags: ["Clients", "Knoten"]
skill: intermediate
breadcrumb: "Geth überwachen"
lang: de
published: 2021-01-13
---

Dieses Tutorial hilft Ihnen bei der Einrichtung der Überwachung für Ihren Geth-Knoten, damit Sie dessen Leistung besser verstehen und potenzielle Probleme identifizieren können.

## Voraussetzungen {#prerequisites}

- Sie sollten bereits eine Instanz von Geth ausführen.
- Die meisten Schritte und Beispiele beziehen sich auf eine Linux-Umgebung, grundlegende Terminal-Kenntnisse sind hilfreich.
- Sehen Sie sich diesen Video-Überblick über die Metriken von Geth an: [Überwachung einer Ethereum-Infrastruktur von Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Monitoring-Stack {#monitoring-stack}

Ein Ethereum-Client sammelt viele Daten, die in Form einer chronologischen Datenbank gelesen werden können. Um die Überwachung zu erleichtern, können Sie diese in eine Datenvisualisierungssoftware einspeisen. Es stehen mehrere Optionen zur Verfügung:

- [Prometheus](https://prometheus.io/) (Pull-Modell)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (Push-Modell)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Wenn Sie Prometheus bevorzugen, kann Geth seine Metriken auch im Prometheus-Format bereitstellen. Starten Sie Geth mit `--metrics --metrics.addr 127.0.0.1` und verweisen Sie Prometheus auf `http://127.0.0.1:6060/debug/metrics/prometheus`.

In diesem Tutorial richten wir Ihren Geth-Client so ein, dass er Daten an InfluxDB sendet, um eine Datenbank zu erstellen, und an Grafana, um eine grafische Visualisierung der Daten zu erstellen. Wenn Sie dies manuell tun, können Sie den Prozess besser verstehen, ihn ändern und in verschiedenen Umgebungen bereitstellen.

## InfluxDB einrichten {#setting-up-influxdb}

Laden wir zunächst InfluxDB herunter und installieren es. Dieses Tutorial verwendet InfluxDB 1.x (OSS), das Geth mit den unten stehenden `--metrics.influxdb`-Flags unterstützt. Neuere InfluxDB-Versionen verwenden ein anderes Setup mit Organisationen, Buckets und Token anstelle von Datenbanken und Benutzern. Geth unterstützt InfluxDB 2.x mit den `--metrics.influxdbv2`-Flags, aber die Einrichtungsschritte in diesem Tutorial gelten nur für 1.x.

Befolgen Sie die [Installationsanweisungen für InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) für Ihre Umgebung. Unter Debian oder Ubuntu können Sie es beispielsweise aus dem InfluxData-Repository installieren. Überprüfen Sie die Installationsanweisungen auf den aktuellen Fingerabdruck des Signaturschlüssels, bevor Sie dem Schlüssel vertrauen:

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

Das Paket `influxdb` enthält den Befehlszeilen-Client `influx`.

Stellen Sie nach der erfolgreichen Installation von InfluxDB sicher, dass es im Hintergrund ausgeführt wird. Standardmäßig ist es unter `localhost:8086` erreichbar.
Bevor Sie den Client `influx` verwenden können, müssen Sie einen neuen Benutzer mit Administratorrechten erstellen. Dieser Benutzer dient der übergeordneten Verwaltung, dem Erstellen von Datenbanken und Benutzern.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Jetzt können Sie den Influx-Client verwenden, um mit diesem Benutzer in die [InfluxDB-Shell](https://docs.influxdata.com/influxdb/v1/tools/shell/) zu gelangen.

```sh
influx -username 'username' -password 'password'
```

Durch die direkte Kommunikation mit InfluxDB in seiner Shell können Sie eine Datenbank und einen Benutzer für Geth-Metriken erstellen.

```sql
create database geth
create user geth with password '<geth-password>'
```

Überprüfen Sie die erstellten Einträge mit:

```sql
show databases
show users
```

Verlassen Sie die InfluxDB-Shell.

```
exit
```

InfluxDB wird ausgeführt und ist so konfiguriert, dass Metriken von Geth gespeichert werden.

## Geth vorbereiten {#preparing-geth}

Nach der Einrichtung der Datenbank müssen wir die Metrikerfassung in Geth aktivieren. Achten Sie auf `METRICS AND STATS OPTIONS` in `geth --help`. Dort finden Sie mehrere Optionen. In diesem Fall möchten wir, dass Geth Daten an InfluxDB sendet.
Die grundlegende Einrichtung gibt den Endpunkt an, an dem InfluxDB erreichbar ist, sowie die Authentifizierung für die Datenbank.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Verwenden Sie dasselbe Passwort, das Sie beim Erstellen des Benutzers `geth` festgelegt haben. Diese Flags können an einen Befehl zum Starten des Clients angehängt oder in der Konfigurationsdatei gespeichert werden.

Sie können überprüfen, ob Geth erfolgreich Daten sendet, indem Sie beispielsweise die Metriken in der Datenbank auflisten. In der InfluxDB-Shell:

```sql
use geth
show measurements
```

## Grafana einrichten {#setting-up-grafana}

Der nächste Schritt ist die Installation von Grafana, das die Daten grafisch interpretiert. Befolgen Sie den [Installationsprozess für Ihre Umgebung](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) in der Grafana-Dokumentation. Stellen Sie sicher, dass Sie die OSS-Version installieren, es sei denn, Sie benötigen etwas anderes.
Beispielhafte Installationsschritte für Debian oder Ubuntu unter Verwendung des Grafana-Repositorys:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Wenn Grafana ausgeführt wird, sollte es unter `localhost:3000` erreichbar sein.
Verwenden Sie Ihren bevorzugten Browser, um auf diesen Pfad zuzugreifen, und melden Sie sich dann mit den Standardanmeldeinformationen an (Benutzer: `admin` und Passwort: `admin`). Wenn Sie dazu aufgefordert werden, ändern Sie das Standardpasswort und speichern Sie es.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 1)](./grafana1.png)

Sie werden zur Grafana-Startseite weitergeleitet. Richten Sie zunächst Ihre Quelldaten ein. Öffnen Sie das Menü und wählen Sie **Connections > Data sources**. Die Screenshots in diesem Tutorial stammen von einer älteren Version von Grafana, daher sehen Ihre Bildschirme möglicherweise etwas anders aus.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 2)](./grafana2.png)

Es wurden noch keine Datenquellen erstellt. Klicken Sie auf „Add data source“, um eine zu definieren.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 3)](./grafana3.png)

Wählen Sie für diese Einrichtung „InfluxDB“ aus und fahren Sie fort.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 4)](./grafana4.png)

Die Konfiguration der Datenquelle ist ziemlich unkompliziert, wenn Sie Tools auf derselben Maschine ausführen. Sie müssen die InfluxDB-Adresse und die Details für den Zugriff auf die Datenbank festlegen. Beziehen Sie sich auf das Bild unten.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 5)](./grafana5.png)

Wenn alles abgeschlossen ist und InfluxDB erreichbar ist, klicken Sie auf „Save and test“ und warten Sie, bis die Bestätigung angezeigt wird.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 6)](./grafana6.png)

Grafana ist nun so eingerichtet, dass es Daten aus InfluxDB liest. Jetzt müssen Sie ein Dashboard erstellen, das diese interpretiert und anzeigt. Dashboard-Eigenschaften sind in JSON-Dateien codiert, die von jedem erstellt und einfach importiert werden können. Öffnen Sie das Menü und wählen Sie **Dashboards**, klicken Sie dann auf **New > Import**.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 7)](./grafana7.png)

Für ein Geth-Überwachungs-Dashboard kopieren Sie die ID von [diesem Dashboard](https://grafana.com/grafana/dashboards/13877/) und fügen Sie sie auf der Seite „Import“ in Grafana ein. Nach dem Speichern des Dashboards sollte es so aussehen:

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 8)](./grafana8.png)

Sie können Ihre Dashboards ändern. Jedes Panel kann bearbeitet, verschoben, entfernt oder hinzugefügt werden. Sie können Ihre Konfigurationen ändern. Es liegt ganz bei Ihnen! Um mehr darüber zu erfahren, wie Dashboards funktionieren, lesen Sie die [Grafana-Dokumentation](https://grafana.com/docs/grafana/latest/dashboards/).
Vielleicht interessieren Sie sich auch für [Alerting](https://grafana.com/docs/grafana/latest/alerting/). Damit können Sie Benachrichtigungen einrichten, wenn Metriken bestimmte Werte erreichen. Es werden verschiedene Kommunikationskanäle unterstützt.
