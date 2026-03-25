---
title: "Wie man übersetzt"
lang: de
description: "Anweisungen zur Verwendung von Crowdin für die Übersetzung von ethereum.org"
---

# Wie man übersetzt {#how-to-translate}

## Visueller Leitfaden {#visual-guide}

Für visuelle Lerner zeigt Luka in diesem Video, wie man sich bei Crowdin einrichtet. Alternativ findest du die gleichen Schritte im nächsten Abschnitt in schriftlicher Form.

<YouTube id="Ii7bYhanLs4" />

## Schriftlicher Leitfaden {#written-guide}

### Tritt unserem Projekt in Crowdin bei {#join-project}

Du musst dich in deinem Crowdin-Konto anmelden oder dich registrieren, falls du noch keines hast. Für die Registrierung benötigst du lediglich eine E-Mail-Adresse und ein Passwort.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Projekt beitreten
</ButtonLink>

### Öffne deine Sprache {#open-language}

Nach der Anmeldung bei Crowdin siehst du eine Projektbeschreibung und eine Liste aller verfügbaren Sprachen.
Jede Sprache enthält zudem Informationen über die Gesamtanzahl der übersetzbaren Wörter sowie eine Übersicht darüber, wie viel Inhalt in einer bestimmten Sprache bereits übersetzt und genehmigt wurde.

Öffne die Sprache, in die du übersetzen möchtest, um die Liste der für die Übersetzung verfügbaren Dateien zu sehen.

![Liste der Sprachen in Crowdin](./list-of-languages.png)

### Finde ein Dokument zur Bearbeitung {#find-document}

Der Inhalt der Website ist in eine Reihe von Dokumenten und Inhaltskategorien (Content Buckets) unterteilt. Du kannst den Fortschritt jedes Dokuments auf der rechten Seite überprüfen – wenn der Übersetzungsfortschritt unter 100 % liegt, trage bitte dazu bei!

Ist deine Sprache nicht aufgeführt? [Eröffne ein Issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose) oder frage in unserem [Discord](https://discord.gg/ethereum-org) nach.

![Übersetzte und unübersetzte Dateien in Crowdin](./crowdin-files.png)

Ein Hinweis zu Inhaltskategorien (Content Buckets): Wir verwenden „Content Buckets“ in Crowdin, um Inhalte mit der höchsten Priorität zuerst zu veröffentlichen. Wenn du dir eine Sprache ansiehst, zum Beispiel [Filipino](https://crowdin.com/project/ethereum-org/fil#), siehst du Ordner für die Inhaltskategorien („1. Homepage“, „2. Essentials“, „3. Exploring“ usw.).

Wir empfehlen dir, in dieser numerischen Reihenfolge (1 → 2 → 3 → ⋯) zu übersetzen, um sicherzustellen, dass die wichtigsten Seiten zuerst übersetzt werden.

### Übersetzen {#translate}

Nachdem du die Datei ausgewählt hast, die du übersetzen möchtest, wird sie im Online-Editor geöffnet. Wenn du Crowdin noch nie benutzt hast, kannst du diese Kurzanleitung nutzen, um dich mit den Grundlagen vertraut zu machen.

![Crowdin Online-Editor](./online-editor.png)

**_1 – Linke Seitenleiste_**

- Unübersetzt (rot) – Text, der noch nicht bearbeitet wurde. Dies sind die Zeichenfolgen (Strings), die du übersetzen solltest.
- Übersetzt (grün) – Text, der bereits übersetzt, aber noch nicht überprüft wurde. Du kannst gerne alternative Übersetzungen vorschlagen oder über bestehende abstimmen, indem du die Schaltflächen „+“ und „-“ im Editor verwendest.
- Genehmigt (Häkchen) – Text, der bereits überprüft wurde und derzeit auf der Website live ist.

Du kannst auch die Schaltflächen oben verwenden, um nach bestimmten Zeichenfolgen zu suchen, sie nach Status zu filtern oder die Ansicht zu ändern.

**_2 – Editor-Bereich_**

Der Hauptübersetzungsbereich – der Quelltext wird oben angezeigt, mit zusätzlichem Kontext und Screenshots, falls verfügbar.
Um eine neue Übersetzung vorzuschlagen, gib deine Übersetzung in das Feld „Enter translation here“ (Übersetzung hier eingeben) ein und klicke auf Speichern.

In diesem Abschnitt findest du auch bestehende Übersetzungen der Zeichenfolge und Übersetzungen in andere Sprachen sowie Übereinstimmungen aus dem Translation Memory und Vorschläge für maschinelle Übersetzungen.

**_3 – Rechte Seitenleiste_**

Hier findest du Kommentare, Einträge aus dem Translation Memory und Glossareinträge. Die Standardansicht zeigt die Kommentare und ermöglicht es Übersetzern, zu kommunizieren, Probleme anzusprechen oder falsche Übersetzungen zu melden.

Über die Schaltflächen oben kannst du auch zum Translation Memory wechseln, wo du nach bestehenden Übersetzungen suchen kannst, oder zum Glossar, das Beschreibungen und Standardübersetzungen von Schlüsselbegriffen enthält.

Möchtest du mehr erfahren? Schau dir gerne die [Dokumentation zur Nutzung des Crowdin Online-Editors](https://support.crowdin.com/online-editor/) an.

### Überprüfungsprozess {#review-process}

Sobald du die Übersetzung abgeschlossen hast (d. h. alle Dateien für eine Inhaltskategorie zeigen 100 % an), wird unser professioneller Übersetzungsdienst den Inhalt überprüfen (und möglicherweise bearbeiten). Sobald die Überprüfung abgeschlossen ist (d. h. der Überprüfungsfortschritt liegt bei 100 %), werden wir ihn zur Website hinzufügen.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Bitte verwende keine maschinelle Übersetzung, um das Projekt zu übersetzen. Alle Übersetzungen werden überprüft, bevor sie zur Website hinzugefügt werden. Wenn festgestellt wird, dass deine vorgeschlagenen Übersetzungen maschinell übersetzt wurden, werden sie abgelehnt, und Mitwirkende, die häufig maschinelle Übersetzungen verwenden, werden aus dem Projekt entfernt.
</AlertContent>
</Alert>

### Nimm Kontakt auf {#get-in-touch}

Hast du Fragen? Oder möchtest du mit unserem Team und anderen Übersetzern zusammenarbeiten? Bitte poste im Kanal #translations auf unserem [ethereum.org Discord-Server](https://discord.gg/ethereum-org).

Du kannst uns auch unter translations@ethereum.org erreichen.

Vielen Dank für deine Teilnahme am ethereum.org-Übersetzungsprogramm!