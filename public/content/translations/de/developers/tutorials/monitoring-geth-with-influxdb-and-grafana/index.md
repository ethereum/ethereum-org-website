---
title: Geth mit InfluxDB und Grafana überwachen
description: Richten Sie die Überwachung für Ihren Geth-Knoten mit InfluxDB und Grafana ein, um die Leistung zu verfolgen und Probleme zu identifizieren.
author: "Mario Havel"
tags: ["Clients", "Knoten"]
skill: intermediate
breadcrumb: Geth überwachen
lang: de
published: 2021-01-13
---

Dieses Tutorial hilft Ihnen bei der Einrichtung der Überwachung für Ihren Geth-Knoten, damit Sie dessen Leistung besser verstehen und potenzielle Probleme identifizieren können.

## Voraussetzungen {#prerequisites}

- Sie sollten bereits eine Instanz von Geth ausführen.
- Die meisten Schritte und Beispiele beziehen sich auf eine Linux-Umgebung, grundlegende Terminal-Kenntnisse sind hilfreich.
- Sehen Sie sich diesen Video-Überblick über die Metriken von Geth an: [Überwachung einer Ethereum-Infrastruktur von Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Überwachungs-Stack {#monitoring-stack}

Ein Ethereum-Client sammelt viele Daten, die in Form einer chronologischen Datenbank gelesen werden können. Um die Überwachung zu erleichtern, können Sie diese in eine Datenvisualisierungssoftware einspeisen. Es stehen mehrere Optionen zur Verfügung:

- [Prometheus](https://prometheus.io/) (Pull-Modell)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (Push-Modell)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Es gibt auch den [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), eine Option, die mit InfluxDB und Grafana vorkonfiguriert ist.

In diesem Tutorial richten wir Ihren Geth-Client so ein, dass er Daten an InfluxDB sendet, um eine Datenbank zu erstellen, und an Grafana, um eine grafische Visualisierung der Daten zu erstellen. Wenn Sie dies manuell tun, können Sie den Prozess besser verstehen, ihn anpassen und in verschiedenen Umgebungen bereitstellen.

## InfluxDB einrichten {#setting-up-influxdb}

Laden wir zunächst InfluxDB herunter und installieren es. Verschiedene Download-Optionen finden Sie auf der [Influxdata-Release-Seite](https://portal.influxdata.com/downloads/). Wählen Sie diejenige aus, die zu Ihrer Umgebung passt.
Sie können es auch aus einem [Repository](https://repos.influxdata.com/) installieren. Zum Beispiel in einer Debian-basierten Distribution:

<HTML-PLACEHOLDER-CODEBLOCK-685d10 />

Stellen Sie nach der erfolgreichen Installation von InfluxDB sicher, dass es im Hintergrund ausgeführt wird. Standardmäßig ist es unter `localhost:8086` erreichbar.
Bevor Sie den `influx`-Client verwenden, müssen Sie einen neuen Benutzer mit Administratorrechten erstellen. Dieser Benutzer dient der übergeordneten Verwaltung, dem Erstellen von Datenbanken und Benutzern.

<HTML-PLACEHOLDER-CODEBLOCK-a5c65e />

Jetzt können Sie den Influx-Client verwenden, um mit diesem Benutzer auf die [InfluxDB-Shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) zuzugreifen.

<HTML-PLACEHOLDER-CODEBLOCK-8b28eb />

Durch die direkte Kommunikation mit InfluxDB in seiner Shell können Sie eine Datenbank und einen Benutzer für Geth-Metriken erstellen.

<HTML-PLACEHOLDER-CODEBLOCK-1c43ce />

Überprüfen Sie die erstellten Einträge mit:

<HTML-PLACEHOLDER-CODEBLOCK-5dee85 />

Verlassen Sie die InfluxDB-Shell.

<HTML-PLACEHOLDER-CODEBLOCK-090211 />

InfluxDB läuft und ist so konfiguriert, dass es Metriken von Geth speichert.

## Geth vorbereiten {#preparing-geth}

Nach der Einrichtung der Datenbank müssen wir die Metrikerfassung in Geth aktivieren. Achten Sie auf `METRICS AND STATS OPTIONS` in `geth --help`. Dort finden Sie mehrere Optionen; in diesem Fall möchten wir, dass Geth Daten an InfluxDB sendet.
Die grundlegende Einrichtung gibt den Endpunkt an, an dem InfluxDB erreichbar ist, sowie die Authentifizierung für die Datenbank.

<HTML-PLACEHOLDER-CODEBLOCK-1cd01d />

Diese Flags können an einen Befehl zum Starten des Clients angehängt oder in der Konfigurationsdatei gespeichert werden.

Sie können überprüfen, ob Geth erfolgreich Daten sendet, indem Sie beispielsweise die Metriken in der Datenbank auflisten. In der InfluxDB-Shell:

<HTML-PLACEHOLDER-CODEBLOCK-1da8b2 />

## Grafana einrichten {#setting-up-grafana}

Der nächste Schritt ist die Installation von Grafana, das die Daten grafisch interpretiert. Befolgen Sie den Installationsprozess für Ihre Umgebung in der Grafana-Dokumentation. Stellen Sie sicher, dass Sie die OSS-Version installieren, sofern Sie nichts anderes wünschen.
Beispielhafte Installationsschritte für Debian-Distributionen über das Repository:

<HTML-PLACEHOLDER-CODEBLOCK-ee08e5 />

Wenn Grafana läuft, sollte es unter `localhost:3000` erreichbar sein.
Verwenden Sie Ihren bevorzugten Browser, um auf diesen Pfad zuzugreifen, und melden Sie sich dann mit den Standardanmeldeinformationen an (Benutzer: `admin` und Passwort: `admin`). Wenn Sie dazu aufgefordert werden, ändern Sie das Standardpasswort und speichern Sie es.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

Sie werden zur Grafana-Startseite weitergeleitet. Richten Sie zunächst Ihre Quelldaten ein. Klicken Sie auf das Konfigurationssymbol in der linken Leiste und wählen Sie „Data sources“ (Datenquellen).

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

Es wurden noch keine Datenquellen erstellt. Klicken Sie auf „Add data source“ (Datenquelle hinzufügen), um eine zu definieren.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

Wählen Sie für diese Einrichtung „InfluxDB“ und fahren Sie fort.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

Die Konfiguration der Datenquelle ist ziemlich unkompliziert, wenn Sie die Tools auf derselben Maschine ausführen. Sie müssen die InfluxDB-Adresse und die Details für den Zugriff auf die Datenbank festlegen. Beziehen Sie sich auf das Bild unten.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

Wenn alles vollständig ist und InfluxDB erreichbar ist, klicken Sie auf „Save and test“ (Speichern und testen) und warten Sie, bis die Bestätigung angezeigt wird.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Grafana ist nun so eingerichtet, dass es Daten aus InfluxDB liest. Jetzt müssen Sie ein Dashboard erstellen, das diese interpretiert und anzeigt. Dashboard-Eigenschaften sind in JSON-Dateien codiert, die von jedem erstellt und einfach importiert werden können. Klicken Sie in der linken Leiste auf „Create and Import“ (Erstellen und Importieren).

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Für ein Geth-Überwachungs-Dashboard kopieren Sie die ID von [diesem Dashboard](https://grafana.com/grafana/dashboards/13877/) und fügen Sie sie auf der Seite „Import“ in Grafana ein. Nach dem Speichern des Dashboards sollte es so aussehen:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

Sie können Ihre Dashboards anpassen. Jedes Panel kann bearbeitet, verschoben, entfernt oder hinzugefügt werden. Sie können Ihre Konfigurationen ändern. Es liegt ganz bei Ihnen! Um mehr darüber zu erfahren, wie Dashboards funktionieren, lesen Sie die [Grafana-Dokumentation](https://grafana.com/docs/grafana/latest/dashboards/).
Vielleicht interessieren Sie sich auch für [Alerting](https://grafana.com/docs/grafana/latest/alerting/) (Benachrichtigungen). Damit können Sie Warnmeldungen einrichten, wenn Metriken bestimmte Werte erreichen. Es werden verschiedene Kommunikationskanäle unterstützt.