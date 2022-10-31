---
title: Smart Contracts
description: Eine nicht-technische Einführung in Smart Contracts
lang: de
---

# Einführung in Smart Contracts {#introduction-to-smart-contracts}

Smart Contracts (Inteligente Verträge) bilden die Grundlage der [Ethereum-Anwendungen](/dapps/). Es handelt sich dabei um Computerprogramme, die auf der Blockchain gespeichert sind und die es ermöglichen, herkömmliche Verträge digital abzubilden. Smart Contracts sind sehr logisch aufgebaut. Sie folgen einer Wenn-Das-Dann-Das-Struktur. Das bedeutet, dass sie sich genau so verhalten wie sie programmiert sind. Es ist nicht möglich, sie zu verändern.

Nick Szabo hat den Begriff "Smart Contract" geprägt. Er verfasste 1994 [eine Einführung in das Konzept](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) und 1996 [eine Erläuterung darüber, was mit Smart Contracts möglich wäre](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Nick Szabo stellte sich einen digitalen Marktplatz vor, der auf automatischen, kryptographisch sicheren Prozessen beruht. Ein Ort an dem Transaktionen und Geschäftsabläufe ohne Vermittler erfolgen können, ohne dabei der Gegenseite Vertrauen entgegen bringen zu müssen. Smart Contracts auf Ethereum realisieren eben diese Vision.

## Wieso Verträge? {#what-are-contracts}

Möglicherweise denken Sie: _"Ich bin kein Anwalt! Warum sollte ich mich um Verträge kümmern?"_. Die meisten Menschen denken bei Verträgen an unnötig lange Vertragsbedingungen oder langweilige Rechtsdokumente.

Verträge sind einfach Vereinbarungen. Das heißt jede Art von Vereinbarung kann in Form von Vertragsbedingungen geschlossen werden. Mündliche Vereinbarungen oder schriftliche Verträge sind für viele Dinge akzeptabel, doch sie haben auch Schwachstellen.

### Vertrauen und Verträge {#trust-and-contracts}

Eines der größten Probleme bei herkömmlichen Verträgen ist die Notwendigkeit, dass die Personen, denen Vertrauen entgegen gebracht wird, die vertraglichen Regelungen auch einhalten.

Hier ist ein Beispiel:

Alice und Bob liefern sich ein Fahrradrennen. Nehmen wir an Alice wettet mit Bob um 10 EUR, dass sie das Rennen gewinnt. Bob ist zuversichtlich, dass er der Gewinner sein wird, und nimmt die Wette an. Am Ende fährt Alice weit vor Bob ins Ziel und ist die klare Siegerin. Doch Bob weigert sich den Wetteinsatz zu bezahlen und behauptet, Alice hätte betrogen.

Dieses einfache Beispiel veranschaulicht, dass nicht kluge Vereinbarungen Probleme mit sich bringen können. Selbst wenn die Bedingungen der Vereinbarung erfüllt werden (z. B. Sie sind der Gewinner des Rennens), müssen Sie dennoch einer anderen Person vertrauen, dass die Vereinbarung erfüllt wird (z. B. Auszahlung des Wetteinsatzes).

## Smart Contracts {#smart-contracts}

Smart Contracts digitalisieren Vereinbarungen, indem sie die Vertragsbedingungen in einen Computercode umwandeln, der automatisch bei Erfüllung der Vertragsbedingungen ausgeführt wird.

### Ein digitaler Verkaufsautomat {#vending-machine}

Eine einfache Metapher für einen Smart Contract ist ein Verkaufsautomat, dessen Funktionsweise mit einem Smart Contract verglichbar ist: konkrete Eingaben garantieren vorab festgelegte Leistungen.

- Sie wählen ein Produkt.
- Der Verkaufsautomat zeigt den für den Kauf benötigten Betrag an.
- Sie werfen den korrekten Betrag ein.
- Der Verkaufsautomat prüft, ob Sie den richtigen Betrag eingeworfen haben.
- Der Automat gibt das gewählte Produkt aus.

Der Verkaufsautomat gibt das gewünscht Procukt erst dann aus, wenn alle Anforderungen erfüllt sind. Wenn Sie beispielsweise kein Produkt auswählen oder nicht genug Geld einwerfen, gibt der Automat das Produkt nicht aus.

### Automatische Ausführung {#automation}

Eines der wichtigsten Vorteile von Smart Contracts gegenüber normalen Verträgen ist, dass das Ergebnis automatisch ausgeführt wird, sobald die Vertragsbedingungen erfüllt sind. Es besteht keine Notwendigkeit, auf die Ausführung des Ergebnisses durch einen Menschen zu warten. Mit anderen Worten: Smart Contracts machen den Aspekt Vertrauen überflüssig.

Sie könnten zum Beispiel einen Smart Contract schreiben, der Gelder für ein Kind auf einem Treuhandkonto verwahrt und es dem Kind ermöglicht, nach einem bestimmten Datum über die Geldmittel zu verfügen. Wenn jemand versucht, das Guthaben vor dem angegebenen Datum abzuheben, wird der Smart Contract nicht ausgeführt. Oder Sie könnten einen Vertrag schreiben, der Ihnen automatisch eine digitale Version des Fahrzeugbriefs aushändigt, sobald Sie den Händler bezahlen.

### Vorhersehbare Ergebnisse {#predictability}

Der Faktor Mensch ist eine der größten Fehlerquellen bei herkömmlichen Verträgen. So können beispielsweise zwei Richter einen Vertrag unterschiedlich auslegen. Ihre Auslegungen könnten zu unterschiedlichen Entscheidungen und Ergebnissen führen. Smart Contracts lassen keine unterschiedlichen Auslegungen zu. Stattdessen führen sie alles genau auf Grundlage der programmierten Bedingungen aus, die dem Vertrag entsprechen. Diese präzise Handhabung bedeutet, dass ein Smart Contract unter gleichen Umständen auch zum gleichen Ergebnis führt.

### Öffentliche Aufzeichnung {#public-record}

Smart Contracts sind auch für Audits und eine Nachverfolgung nützlich. Da sich die Smart Contracts von Ethereum auf einer öffentlichen Blockchain befinden, kann jeder umgehend die Übertragung von Vermögenswerten und weiterer damit verbundenen Informationen nachvollziehen. Sie können beispielsweis überprüfen, ob jemand Geld an Ihre Adresse geschickt hat.

### Schutz der Privatsphäre {#privacy-protection}

Intelligente Verträge können zudem auch Ihre Privatsphäre schützen. Da Ethereum ein pseudonymes Netzwerk ist (Transaktionen sind öffentlich an eine eindeutige kryptographische Adresse gebunden, nicht an eine Identität), können Sie Ihre Privatsphäre vor Beobachtern schützen.

### Sichtbare Bedingungen {#visible-terms}

Schließlich können Sie wie auch bei Verträgen vorab die Inhalte eines Smart Contracts prüfen, bevor Sie ihn annehmen (oder anderweitig damit interagieren). Und da die Vertragsbedingungen öffentlich sind, kann der Vertrag sogar von jedem überprüft werden.

## Anwendungsfälle für Smart Contracts {#use-cases}

Smart Contracts sind also Computerprogramme, die in der Blockchain laufen. Sie können automatisch ausgeführt werden. Es ist möglich, ihre Transaktionen zu verfolgen, ihr Verhalten vorherzusagen und sie sogar pseudonymisiert nutzen. Das ist wirklich großartig. Doch wozu sind sie gut? Nun, Smart Contracts können im Grunde alles, was auch andere Computerprogramme machen.

Sie können Berechnungen durchführen, Währungen erzeugen, Daten speichern, NFTs prägen, Mitteilungen senden und sogar Grafiken erstellen. Hier sind einige gängige reale Anwendungen:

- [Stablecoins](/stablecoins/)
- [Einzigartige digitale Vermögenswerte erstellen und verteilen](/nft/)
- [Ein automatischer, offener Währungsumtausch](/get-eth/#dex)
- [Dezentralisiertes Gaming](/dapps/?category=gaming)
- [Eine Versicherungspolice mit automatisierter Auszahlung](https://etherisc.com/)
- [Ein Standard, der es Menschen ermöglicht, individuelle, interoperable Währungen zu schaffen](/developers/docs/standards/tokens/)

## Sie sind eher ein visueller Lerner? {#visual-learner}

Dann sehen Sie sich an, wie Finematics Smart Contracts erklären:

<YouTube id="pWGLtjG-F5c" />

## Weiterführende Informationen {#further-reading}

- [So verändern Smart Contracts die Welt](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Smart Contracts: die Blockchain-Technologie, die Anwälte ersetzen wird](https://blockgeeks.com/guides/smart-contracts/)
- [Smart Contracts für Entwickler](/developers/docs/smart-contracts/)
- [Lernen Sie, Smart Contracts zu programmieren](/developers/learning-tools/)
- [Ethereum-Experte werden – was ist ein Smart Contract?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
