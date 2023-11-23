---
title: Smart Contracts
description: Eine nicht-technische Einführung in Smart Contracts
lang: de
---

# Einführung in Smart Contracts {#introduction-to-smart-contracts}

Smart Contracts sind die grundlegenden Bausteine der Anwendungsebene von Ethereum. Dabei handelt es sich um auf der Blockchain gespeicherte Computerprogramme, die einer "wenn dies, dann das"-Logik folgen und garantiert nach den in ihrem Code definierten Regeln ausgeführt werden und nach ihrer Erstellung nicht mehr verändert werden können.

Nick Szabo hat den Begriff „Smart Contract" geprägt. Im Jahr 1994 schrieb er eine [Einführung in das Konzept](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) und 1996 eine [Untersuchung der Möglichkeiten von Smart Contracts](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo stellte sich einen digitalen Marktplatz vor, auf dem automatische, kryptografisch gesicherte Prozesse Transaktionen und Geschäftsfunktionen ohne vertrauenswürdige Zwischenpersonen ermöglichen. Smart Contracts auf Ethereum realisieren eben diese Vision.

## Vertrauen in herkömmliche Verträge {#trust-and-contracts}

Eines der größten Probleme bei herkömmlichen Verträgen ist die Notwendigkeit, dass die Personen, denen Vertrauen entgegengebracht wird, die vertraglichen Regelungen auch einhalten.

Hier ist ein Beispiel:

Alice und Bob liefern sich ein Fahrradrennen. Nehmen wir an, Alice wettet mit Bob um 10 EUR, dass sie das Rennen gewinnt. Bob ist zuversichtlich, dass er gewinnt, und nimmt die Wette an. Am Ende fährt Alice weit vor Bob ins Ziel und ist die klare Siegerin. Doch Bob weigert sich, den Wetteinsatz zu bezahlen, und behauptet, Alice hätte betrogen.

Dieses einfache Beispiel veranschaulicht, dass nicht kluge Vereinbarungen Probleme mit sich bringen können. Selbst wenn die Bedingungen der Vereinbarung erfüllt werden (z. B. Sie sind der Gewinner des Rennens), müssen Sie dennoch einer anderen Person vertrauen, dass die Vereinbarung erfüllt wird (z. B. Auszahlung des Wetteinsatzes).

## Ein digitaler Verkaufsautomat {#vending-machine}

Eine einfache Metapher für einen Smart Contract ist ein Verkaufsautomat, dessen Funktionsweise mit einem Smart Contract vergleichbar ist: konkrete Eingaben garantieren vorab festgelegte Leistungen.

- Sie wählen ein Produkt.
- Der Verkaufautomat zeigt den Preis an.
- Sie zahlen den Preis.
- Der Automat prüft, ob Sie den richtigen Betrag bezahlt haben.
- Der Automat übergibt Ihnen Ihren Artikel.

Der Verkaufsautomat gibt das gewünschte Produkt erst dann aus, wenn alle Anforderungen erfüllt sind. Wenn Sie beispielsweise kein Produkt auswählen oder nicht genug Geld einwerfen, gibt der Automat kein Produkt aus.

## Automatische Ausführung {#automation}

Der Hauptvorteil eines Smart Contracts besteht darin, dass er bestimmt eindeutigen Code ausführt, wenn bestimmte Bedingungen erfüllt sind. Es ist nicht nötig, auf einen Menschen zu warten, um das Ergebnis zu interpretieren oder zu verhandeln. Somit entfällt die Notwendigkeit von vertrauenswürdigen Vermittlern.

Sie könnten zum Beispiel einen Smart Contract schreiben, der Gelder für ein Kind auf einem Treuhandkonto verwahrt und es dem Kind ermöglicht, nach einem bestimmten Datum über die Geldmittel zu verfügen. Wenn jemand versucht, das Guthaben vor diesem Datum abzuheben, führt der Smart Contract die Transaktion nicht aus. Sie könnten auch einen Vertrag aufsetzen, der Ihnen automatisch eine digitale Version des Fahrzeugbriefs aushändigt, wenn Sie den Händler bezahlen.

## Vorhersehbare Ergebnisse {#predictability}

Herkömmliche Verträge sind mehrdeutig, weil sie von Menschen ausgelegt und umgesetzt werden müssen. So könnten beispielsweise zwei Richter einen Vertrag unterschiedlich auslegen. Das könnte zu widersprüchlichen Entscheidungen und ungleichen Ergebnissen führen. Mit Smart Contracts ist das ausgeschlossen. Stattdessen führen sie alles genau auf Grundlage der programmierten Bedingungen aus, die dem Vertrag entsprechen. Diese Präzision bedingt, dass ein Smart Contract unter gleichen Umständen auch zum gleichen Ergebnis führt.

## Öffentliche Aufzeichnung {#public-record}

Smart Contracts sind nützlich für Prüfungen und die Nachverfolgung. Da sich die Smart Contracts von Ethereum auf einer öffentlichen Blockchain befinden, kann jeder umgehend die Übertragung von Vermögenswerten und weiterer damit verbundenen Informationen nachvollziehen. So können Sie beispielsweise überprüfen, ob jemand Geld an Ihre Adresse geschickt hat.

## Schutz der Privatsphäre {#privacy-protection}

Smart Contracts schützen zudem Ihre Daten. Da Ethereum ein pseudonymes Netzwerk ist (Transaktionen sind öffentlich an eine eindeutige kryptographische Adresse gebunden, nicht an eine Identität), können Sie Ihre Privatsphäre vor Beobachtern schützen.

## Sichtbare Bedingungen {#visible-terms}

Letztlich können Sie wie bei herkömmlichen Verträgen prüfen, was in einem Smart Contract steht, bevor Sie diesen unterschreiben (oder anderweitig damit interagieren). Die Transparenz eines Smart Contracts garantiert, dass er von jedem überprüft werden kann.

## Anwendungsfälle für Smart Contracts {#use-cases}

Smart Contracts können im Grunde alles, was auch Computerprogramme ausführen können.

Sie können Berechnungen durchführen, Währungen erzeugen, Daten speichern, NFTs prägen, Mitteilungen senden und sogar Grafiken erstellen. Hier sind einige gängige reale Anwendungen:

- [Stablecoins](/stablecoins/)
- [Einzigartige digitale Vermögenswerte erstellen und verteilen](/nft/)
- [Ein automatischer, offener Währungsumtausch](/get-eth/#dex)
- [Dezentralisiertes Gaming](/dapps/?category=gaming)
- [Eine Versicherungspolice mit automatisierter Auszahlung](https://etherisc.com/)
- [Ein Standard, der es Menschen ermöglicht, individuelle, interoperable Währungen zu schaffen](/developers/docs/standards/tokens/)

## Eher der visuelle Lernende? {#visual-learner}

Dann sehen Sie sich an, wie Finematics Smart Contracts erklären:

<YouTube id="pWGLtjG-F5c" />

## Weiterführende Informationen {#further-reading}

- [So verändern Smart Contracts die Welt](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Smart Contracts: die Blockchain-Technologie, die Anwälte ersetzen wird](https://blockgeeks.com/guides/smart-contracts/)
- [Smart Contracts für Entwickler](/developers/docs/smart-contracts/)
- [Lernen Sie, Smart Contracts zu programmieren](/developers/learning-tools/)
- [Ethereum-Experte werden – was ist ein Smart Contract?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
