---
title: "Überwachung von Geth mit InfluxDB und Grafana"
description: "Richten Sie die Überwachung für Ihren Geth-Blockchain-Knoten mit InfluxDB und Grafana ein, um die Leistung zu verfolgen und Probleme zu identifizieren."
author: "Mario Havel"
tags: ["Anwendungen", "Blockchain-Knoten"]
skill: intermediate
breadcrumb: "Geth überwachen"
lang: de
published: 2021-01-13
---

Dieses Tutorial hilft Ihnen bei der Einrichtung der Überwachung für Ihren Geth-Blockchain-Knoten, damit Sie dessen Leistung besser verstehen und potenzielle Probleme identifizieren können.

## Voraussetzungen {#prerequisites}

- Sie sollten bereits eine Instanz von Geth ausführen.
- Die meisten Schritte und Beispiele beziehen sich auf eine Linux-Umgebung, grundlegende Terminal-Kenntnisse sind hilfreich.
- Sehen Sie sich diesen Video-Überblick über die Metrik-Suite von Geth an: [Monitoring an Ethereum infrastructure by Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Überwachungs-Stack {#monitoring-stack}

Eine Ethereum-Anwendung sammelt viele Daten, die in Form einer chronologischen Datenbank gelesen werden können. Um die Überwachung zu erleichtern, können Sie diese in eine Datenvisualisierungssoftware einspeisen. Es stehen mehrere Optionen zur Verfügung:

- [Prometheus](https://prometheus.io/) (Pull-Modell)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (Push-Modell)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Es gibt auch den [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), eine Option, die mit InfluxDB und Grafana vorkonfiguriert ist.

In diesem Tutorial richten wir Ihre Geth-Anwendung so ein, dass sie Daten an InfluxDB sendet, um eine Datenbank zu erstellen, und an Grafana, um eine grafische Visualisierung der Daten zu erstellen. Wenn Sie dies manuell tun, können Sie den Prozess besser verstehen, ihn ändern und in verschiedenen Umgebungen bereitstellen.

## InfluxDB einrichten {#setting-up-influxdb}

Laden wir zunächst InfluxDB herunter und installieren es. Verschiedene Download-Optionen finden Sie auf der [Influxdata-Release-Seite](https://portal.influxdata.com/downloads/). Wählen Sie diejenige aus, die zu Ihrer Umgebung passt.
Sie können es auch aus einem [Repository](https://repos.influxdata.com/) installieren. Zum Beispiel in einer Debian-basierten Distribution:

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

Stellen Sie nach der erfolgreichen Installation von InfluxDB sicher, dass es im Hintergrund ausgeführt wird. Standardmäßig ist es unter `localhost:8086` erreichbar.
Bevor Sie die `influx`-Anwendung verwenden, müssen Sie einen neuen Benutzer mit Administratorrechten erstellen. Dieser Benutzer dient der übergeordneten Verwaltung, der Erstellung von Datenbanken und Benutzern.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Jetzt können Sie die Influx-Anwendung verwenden, um mit diesem Benutzer in die [InfluxDB-Shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) zu gelangen.

```
influx -username 'username' -password 'password'
```

Durch die direkte Kommunikation mit InfluxDB in seiner Shell können Sie eine Datenbank und einen Benutzer für Geth-Metriken erstellen.

```
create database geth
create user geth with password choosepassword
```

Überprüfen Sie die erstellten Einträge mit:

```
show databases
show users
```

Verlassen Sie die InfluxDB-Shell.

```
exit
```

InfluxDB läuft und ist so konfiguriert, dass Metriken von Geth gespeichert werden.

## Geth vorbereiten {#preparing-geth}

Nach der Einrichtung der Datenbank müssen wir die Metrikerfassung in Geth aktivieren. Achten Sie auf `METRICS AND STATS OPTIONS` in `geth --help`. Dort finden Sie mehrere Optionen. In diesem Fall möchten wir, dass Geth Daten in InfluxDB pusht.
Die grundlegende Einrichtung gibt den Endpunkt an, an dem InfluxDB erreichbar ist, sowie die Authentifizierung für die Datenbank.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Diese Flags können an einen Befehl angehängt werden, der die Anwendung startet, oder in der Konfigurationsdatei gespeichert werden.

Sie können überprüfen, ob Geth erfolgreich Daten pusht, indem Sie beispielsweise Metriken in der Datenbank auflisten. In der InfluxDB-Shell:

```
use geth
show measurements
```

## Grafana einrichten {#setting-up-grafana}

Der nächste Schritt ist die Installation von Grafana, das die Daten grafisch interpretiert. Befolgen Sie den Installationsprozess für Ihre Umgebung in der Grafana-Dokumentation. Stellen Sie sicher, dass Sie die OSS-Version installieren, sofern Sie nichts anderes wünschen.
Beispielhafte Installationsschritte für Debian-Distributionen unter Verwendung des Repositorys:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Wenn Grafana läuft, sollte es unter `localhost:3000` erreichbar sein.
Verwenden Sie Ihren bevorzugten Browser, um auf diesen Pfad zuzugreifen, und melden Sie sich dann mit den Standardanmeldeinformationen an (Benutzer: `admin` und Passwort: `admin`). Wenn Sie dazu aufgefordert werden, ändern Sie das Standardpasswort und speichern Sie es.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 1)](./grafana1.png)

Sie werden zur Grafana-Startseite weitergeleitet. Richten Sie zunächst Ihre Quelldaten ein. Klicken Sie auf das Konfigurationssymbol in der linken Leiste und wählen Sie „Data sources“ (Datenquellen).

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 2)](./grafana2.png)

Es wurden noch keine Datenquellen erstellt. Klicken Sie auf „Add data source“ (Datenquelle hinzufügen), um eine zu definieren.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 3)](./grafana3.png)

Wählen Sie für diese Einrichtung „InfluxDB“ und fahren Sie fort.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 4)](./grafana4.png)

Die Konfiguration der Datenquelle ist ziemlich einfach, wenn Sie Tools auf derselben Maschine ausführen. Sie müssen die InfluxDB-Adresse und die Details für den Zugriff auf die Datenbank festlegen. Beziehen Sie sich auf das Bild unten.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 5)](./grafana5.png)

Wenn alles abgeschlossen ist und InfluxDB erreichbar ist, klicken Sie auf „Save and test“ (Speichern und testen) und warten Sie, bis die Bestätigung angezeigt wird.

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 6)](./grafana6.png)

Grafana ist nun so eingerichtet, dass es Daten aus InfluxDB liest. Jetzt müssen Sie ein Dashboard erstellen, das diese interpretiert und anzeigt. Dashboard-Eigenschaften sind in JSON-Dateien codiert, die von jedem erstellt und einfach importiert werden können. Klicken Sie in der linken Leiste auf „Create and Import“ (Erstellen und Importieren).

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 7)](./grafana7.png)

Für ein Geth-Überwachungs-Dashboard kopieren Sie die ID von [diesem Dashboard](https://grafana.com/grafana/dashboards/13877/) und fügen Sie sie auf der „Import page“ (Importseite) in Grafana ein. Nach dem Speichern des Dashboards sollte es so aussehen:

![Grafana-Dashboard-Screenshot für die Geth-Überwachung (Panel 8)](./grafana8.png)

Sie können Ihre Dashboards ändern. Jedes Panel kann bearbeitet, verschoben, entfernt oder hinzugefügt werden. Sie können Ihre Konfigurationen ändern. Es liegt ganz bei Ihnen! Um mehr darüber zu erfahren, wie Dashboards funktionieren, lesen Sie die [Grafana-Dokumentation](https://grafana.com/docs/grafana/latest/dashboards/).
Vielleicht interessieren Sie sich auch für [Alerting](https://grafana.com/docs/grafana/latest/alerting/) (Benachrichtigungen). Damit können Sie Benachrichtigungen einrichten, wenn Metriken bestimmte Werte erreichen. Es werden verschiedene Kommunikationskanäle unterstützt.