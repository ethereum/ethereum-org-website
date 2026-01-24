---
title: Überwachung von Geth mit InfluxDB und Grafana
description: Richten Sie die Überwachung für Ihren Geth-Node mit InfluxDB und Grafana ein, um die Leistung zu verfolgen und Probleme zu identifizieren.
author: "Mario Havel"
tags: [ "Clients", "Nodes" ]
skill: intermediate
lang: de
published: 2021-01-13
---

Dieses Tutorial hilft Ihnen dabei, die Überwachung für Ihren Geth-Node einzurichten, damit Sie dessen Leistung besser verstehen und potenzielle Probleme erkennen können.

## Voraussetzungen {#prerequisites}

- Sie sollten bereits eine Instanz von Geth ausführen.
- Die meisten Schritte und Beispiele sind für eine Linux-Umgebung, grundlegende Terminalkenntnisse sind dabei hilfreich.
- Sehen Sie sich diesen Videoüberblick über die Metrik-Suite von Geth an: [Monitoring an Ethereum infrastructure by Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Überwachungs-Stack {#monitoring-stack}

Ein Ethereum-Client sammelt eine Menge Daten, die in Form einer chronologischen Datenbank gelesen werden können. Um die Überwachung zu erleichtern, können Sie diese in eine Datenvisualisierungssoftware einspeisen. Es gibt mehrere verfügbare Optionen:

- [Prometheus](https://prometheus.io/) (Pull-Modell)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (Push-Modell)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Es gibt auch [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), eine mit InfluxDB und Grafana vorkonfigurierte Option.

In diesem Tutorial richten wir Ihren Geth-Client ein, um Daten an InfluxDB zur Erstellung einer Datenbank zu senden und mit Grafana eine Diagrammvisualisierung der Daten zu erstellen. Die manuelle Durchführung wird Ihnen helfen, den Prozess besser zu verstehen, ihn zu ändern und in verschiedenen Umgebungen bereitzustellen.

## Einrichten von InfluxDB {#setting-up-influxdb}

Lassen Sie uns zunächst InfluxDB herunterladen und installieren. Verschiedene Download-Optionen finden Sie auf der [Influxdata-Release-Seite](https://portal.influxdata.com/downloads/). Wählen Sie die für Ihre Umgebung passende aus.
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

Nach der erfolgreichen Installation von InfluxDB, stellen Sie sicher, dass es im Hintergrund läuft. Standardmäßig ist es unter `localhost:8086` erreichbar.
Bevor Sie den `Influx`-Client verwenden, müssen Sie einen neuen Benutzer mit Administratorrechten erstellen. Dieser Benutzer dient der übergeordneten Verwaltung, der Erstellung von Datenbanken und Benutzern.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Jetzt können Sie den Influx-Client verwenden, um mit diesem Benutzer die [InfluxDB-Shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) zu betreten.

```
influx -username 'username' -password 'password'
```

Indem Sie direkt mit InfluxDB in seiner Shell kommunizieren, können Sie eine Datenbank und einen Benutzer für Geth-Metriken erstellen.

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

InfluxDB läuft und ist konfiguriert, um Metriken von Geth zu speichern.

## Geth vorbereiten {#preparing-geth}

Nachdem die Datenbank eingerichtet ist, müssen wir die Metrikerfassung in Geth aktivieren. Achten Sie auf `METRICS AND STATS OPTIONS` in `geth --help`. Dort finden Sie mehrere Optionen, in diesem Fall möchten wir, dass Geth Daten in InfluxDB pusht.
Die Grundeinrichtung gibt den Endpunkt an, an dem InfluxDB erreichbar ist, und die Authentifizierung für die Datenbank.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Diese Flags können an einen Befehl zum Starten des Clients angehängt oder in der Konfigurationsdatei gespeichert werden.

Sie können überprüfen, ob Geth erfolgreich Daten pusht, indem Sie zum Beispiel die Metriken in der Datenbank auflisten. In der InfluxDB-Shell:

```
use geth
show measurements
```

## Einrichten von Grafana {#setting-up-grafana}

Der nächste Schritt ist die Installation von Grafana, das die Daten grafisch interpretieren wird. Folgen Sie dem Installationsprozess für Ihre Umgebung in der Grafana-Dokumentation. Stellen Sie sicher, dass Sie die OSS-Version installieren, wenn nicht anders gewünscht.
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
Verwenden Sie Ihren bevorzugten Browser, um auf diesen Pfad zuzugreifen, und melden Sie sich dann mit den Standard-Anmeldeinformationen an (Benutzer: `admin` und Passwort: `admin`). Wenn Sie dazu aufgefordert werden, ändern Sie das Standardpasswort und speichern Sie es.

![](./grafana1.png)

Sie werden zur Grafana-Startseite weitergeleitet. Richten Sie zunächst Ihre Quelldaten ein. Klicken Sie auf das Konfigurationssymbol in der linken Leiste und wählen Sie "Datenquellen" aus.

![](./grafana2.png)

Es sind noch keine Datenquellen erstellt worden. Klicken Sie auf "Datenquelle hinzufügen", um eine zu definieren.

![](./grafana3.png)

Wählen Sie für dieses Setup "InfluxDB" aus und fahren Sie fort.

![](./grafana4.png)

Die Konfiguration der Datenquelle ist ziemlich einfach, wenn Sie die Tools auf demselben Rechner ausführen. Sie müssen die InfluxDB-Adresse und die Details für den Zugriff auf die Datenbank festlegen. Beachten Sie die Abbildung unten.

![](./grafana5.png)

Wenn alles vollständig ist und InfluxDB erreichbar ist, klicken Sie auf "Speichern und testen" und warten Sie, bis die Bestätigung erscheint.

![](./grafana6.png)

Grafana ist jetzt so eingerichtet, dass es Daten aus InfluxDB lesen kann. Jetzt müssen Sie ein Dashboard erstellen, das sie interpretiert und anzeigt. Dashboard-Eigenschaften sind in JSON-Dateien kodiert, die von jedermann erstellt und einfach importiert werden können. Klicken Sie in der linken Leiste auf "Erstellen und Importieren".

![](./grafana7.png)

Für ein Geth-Überwachungs-Dashboard kopieren Sie die ID von [diesem Dashboard](https://grafana.com/grafana/dashboards/13877/) und fügen Sie sie auf der "Importseite" in Grafana ein. Nach dem Speichern des Dashboards sollte es so aussehen:

![](./grafana8.png)

Sie können Ihre Dashboards ändern. Jedes Panel kann bearbeitet, verschoben, entfernt oder hinzugefügt werden. Sie können Ihre Konfigurationen ändern. Es liegt ganz bei Ihnen! Um mehr darüber zu erfahren, wie Dashboards funktionieren, lesen Sie die [Dokumentation von Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Sie könnten auch an [Alerting](https://grafana.com/docs/grafana/latest/alerting/) interessiert sein. Damit können Sie Warnmeldungen für den Fall einrichten, dass Metriken bestimmte Werte erreichen. Verschiedene Kommunikationskanäle werden unterstützt.
