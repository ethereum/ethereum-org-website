---
title: Übersetzen – so geht's
lang: de
description: Anweisungen für die Verwendung von Crowdin zur Übersetzung von ethereum.org
---

# Wie man übersetzt {#how-to-translate}

## Visuelle Anleitung {#visual-guide}

Für visuell Lernende: Luka führt Sie durch die Einrichtung von Crowdin. Alternativ können Sie die gleichen Schritte auch im nächsten Abschnitt nachlesen.

<YouTube id="Ii7bYhanLs4" />

## Schriftliche Anleitung {#written-guide}

### Beteiligen Sie sich an unserem Projekt auf Crowdin {#join-project}

Sie müssen sich bei Ihrem Crowdin-Konto anmelden oder sich registrieren, wenn Sie noch kein Konto haben. Für die Anmeldung benötigen Sie lediglich ein E-Mail-Konto und ein Passwort.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Am Projekt teilnehmen
</ButtonLink>

### Öffnen Sie Ihre Sprache {#open-language}

Nachdem Sie sich bei Crowdin angemeldet haben, sehen Sie eine Projektbeschreibung und eine Liste aller verfügbaren Sprachen.
Jede Sprache enthält außerdem Informationen über die Gesamtzahl der übersetzbaren Wörter und einen Überblick darüber, wie viele Inhalte in einer bestimmten Sprache bereits übersetzt und genehmigt wurden.

Wählen Sie die Sprache, in die Sie übersetzen möchten, um die Liste der Dateien anzuzeigen, die für die Übersetzungen zur Verfügung stehen.

![Liste der Sprachen in Crowdin](./list-of-languages.png)

### Suchen Sie ein Dokument, an dem Sie arbeiten möchten {#find-document}

Der Inhalt der Website ist in eine Reihe von Dokumenten und Inhaltsbereichen unterteilt. Sie können den Fortschritt jedes Dokuments auf der rechten Seite überprüfen. Wenn der Übersetzungsfortschritt unter 100 % liegt, können Sie daran mitarbeiten.

Ist Ihre Sprache nicht aufgeführt? [Erstellen Sie ein Issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose) oder fragen Sie in unserem [Discord](https://discord.gg/ethereum-org)

![Übersetzte und nicht übersetzte Dateien in Crowdin](./crowdin-files.png)

Ein Hinweis zu den Inhaltsbereichen: Wir nutzen 'Inhaltsbereiche' in Crowdin, um den Inhalt mit der höchsten Priorität zuerst zu veröffentlichen. Wenn Sie sich eine Sprache ansehen, zum Beispiel [Filipino](https://crowdin.com/project/ethereum-org/fil#), sehen Sie Ordner für Inhaltsbereiche ("1. Startseite", "2. Grundlagen", "3. Exploring", usw.).

Wir empfehlen Ihnen, in dieser numerischen Reihenfolge zu übersetzen (1 → 2 → 3 → ⋯), um sicherzustellen, dass die Seiten mit der größten Wirkung zuerst übersetzt werden.

### Übersetzen {#translate}

Nachdem Sie die zu übersetzende Datei ausgewählt haben, wird sie im Online-Editor geöffnet. Wenn Sie noch nicht mit Crowdin gearbeitet haben, finden Sie in dieser Kurzanleitung eine Erläuterung der Grundlagen.

![Crowdin-Online-Editor](./online-editor.png)

**_1 – Linke Seitenleiste_**

- Nicht übersetzt (rot) – Text, an dem noch nicht gearbeitet wurde. Das sind die Zeichenfolgen, die übersetzt werden sollten.
- Übersetzt (grün) – Text, der bereits übersetzt, aber noch nicht überprüft wurde. Gerne können Sie alternative Übersetzungen vorschlagen oder über die Schaltflächen ''+'' und ''-'' im Editor über bestehende Übersetzungen abstimmen.
- Genehmigt (Häkchen) – Text, der bereits überprüft wurde und derzeit auf der Website live ist.

Sie können auch die Schaltflächen oben verwenden, um nach bestimmten Zeichenfolgen zu suchen, sie nach Status zu filtern oder die Ansicht zu ändern.

**_2 – Editor-Bereich_**

Der Hauptübersetzungsbereich – der Ausgangstext wird oben angezeigt, mit zusätzlichem Kontext und Screenshots, falls verfügbar.
Um eine neue Übersetzung vorzuschlagen, geben Sie Ihre Übersetzung in das Feld ''Enter translation here" (Übersetzung hier eingeben') ein und klicken Sie auf "Save" (Speichern).

In diesem Abschnitt finden Sie auch vorhandene Übersetzungen der Zeichenfolge und Übersetzungen in andere Sprachen sowie Translation-Memory-Übereinstimmungen und Vorschläge für maschinelle Übersetzungen.

**_3 – Rechte Seitenleiste_**

Hier können Sie Kommentare finden, Einträge aus dem Übersetzungsspeicher (Translation Memory, TM) oder dem Glossar. In der Standardansicht werden die Kommentare angezeigt und Übersetzer haben die Möglichkeit, zu kommunizieren, Probleme aufzuwerfen oder falsche Übersetzungen zu melden.

Über die Schaltflächen oben können Sie auch zum Übersetzungsspeicher wechseln, wo Sie nach bereits existierenden Übersetzungen suchen können, oder zum Glossar, das Beschreibungen und Standardübersetzungen von zentralen Begriffen beinhaltet.

Möchten Sie mehr erfahren? Sehen Sie sich ruhig die [Dokumentation zur Verwendung des Crowdin-Online-Editors](https://support.crowdin.com/online-editor/) an.

### Überprüfungsprozess {#review-process}

Sobald Sie die Übersetzung abgeschlossen haben (d. h., alle Dateien für einen Inhaltsbereich 100 % anzeigen), wird unser professioneller Übersetzungsdienst den Inhalt überprüfen (und möglicherweise bearbeiten). Sobald die Überprüfung abgeschlossen ist (d. h., der Überprüfungsfortschritt beträgt 100 %), werden wir sie zur Website hinzufügen.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Verwenden Sie keine maschinell erstellten Übersetzungen für das Projekt. Alle Übersetzungen werden vor der Veröffentlichung auf der Website überprüft. Wenn sich herausstellt, dass die von Ihnen vorgeschlagenen Übersetzungen maschinell erstellt wurden, werden sie abgelehnt und Übersetzerinnen und Übersetzer, die häufig maschinelle Übersetzungen verwenden, werden aus dem Projekt entfernt.
</AlertContent>
</Alert>

### Kontaktieren Sie uns {#get-in-touch}

Haben Sie noch Fragen? Oder möchten Sie mit unserem Team und anderen Übersetzern zusammenarbeiten? Bitte posten Sie im Kanal #translations auf unserem [ethereum.org Discord-Server](https://discord.gg/ethereum-org)

Sie können uns auch unter translations@ethereum.org kontaktieren.

Vielen Dank für Ihre Teilnahme am ethereum.org-Übersetzungsprogramm.
