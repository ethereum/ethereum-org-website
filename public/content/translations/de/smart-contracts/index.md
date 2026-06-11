---
title: Einführung in Smart Contracts
metaTitle: "Smart Contracts: Was sie sind und ihre Vorteile"
description: Eine nicht-technische Einführung in Smart Contracts
lang: de
---

Smart Contracts sind die grundlegenden Bausteine der Anwendungsschicht von [Ethereum](/). Es handelt sich um Computerprogramme, die auf der [Blockchain](/glossary/#blockchain) gespeichert sind und einer „Wenn-Dann“-Logik folgen. Sie werden garantiert nach den durch ihren Code definierten Regeln ausgeführt, die nach der Erstellung nicht mehr geändert werden können.

Nick Szabo prägte den Begriff „Smart Contract“. Im Jahr 1994 schrieb er [eine Einführung in das Konzept](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) und 1996 verfasste er [eine Untersuchung darüber, was Smart Contracts leisten könnten](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo stellte sich einen digitalen Marktplatz vor, auf dem automatische, [kryptografisch sichere](/glossary/#cryptography) Prozesse Transaktionen und Geschäftsfunktionen ohne vertrauenswürdige Vermittler ermöglichen. Smart Contracts auf Ethereum setzen diese Vision in die Praxis um.

Sieh dir an, wie Finematics Smart Contracts erklärt:

<VideoWatch slug="smart-contracts-code-is-law" />

## Vertrauen in herkömmliche Verträge {#trust-and-contracts}

Eines der größten Probleme bei einem traditionellen Vertrag ist die Notwendigkeit vertrauenswürdiger Personen, die die Ergebnisse des Vertrags umsetzen.

Hier ist ein Beispiel:

Alice und Bob veranstalten ein Fahrradrennen. Nehmen wir an, Alice wettet mit Bob um 10 $, dass sie das Rennen gewinnen wird. Bob ist zuversichtlich, dass er der Gewinner sein wird, und stimmt der Wette zu. Am Ende beendet Alice das Rennen weit vor Bob und ist die klare Siegerin. Aber Bob weigert sich, die Wette auszuzahlen, und behauptet, Alice müsse betrogen haben.

Dieses einfache Beispiel veranschaulicht das Problem mit jeder nicht-smarten Vereinbarung. Selbst wenn die Bedingungen der Vereinbarung erfüllt sind (d. h. du bist der Gewinner des Rennens), musst du immer noch einer anderen Person vertrauen, dass sie die Vereinbarung erfüllt (d. h. die Wette auszahlt).

## Ein digitaler Verkaufsautomat {#vending-machine}

Eine einfache Metapher für einen Smart Contract ist ein Verkaufsautomat, der ähnlich wie ein Smart Contract funktioniert – spezifische Eingaben garantieren vorher festgelegte Ausgaben.

- Du wählst ein Produkt aus
- Der Verkaufsautomat zeigt den Preis an
- Du bezahlst den Preis
- Der Verkaufsautomat überprüft, ob du den richtigen Betrag bezahlt hast
- Der Verkaufsautomat gibt dir deinen Artikel

Der Verkaufsautomat gibt dein gewünschtes Produkt erst aus, nachdem alle Anforderungen erfüllt sind. Wenn du kein Produkt auswählst oder nicht genug Geld einwirfst, gibt der Verkaufsautomat dein Produkt nicht heraus.

## Automatische Ausführung {#automation}

Der Hauptvorteil eines Smart Contracts besteht darin, dass er deterministisch eindeutigen Code ausführt, wenn bestimmte Bedingungen erfüllt sind. Es ist nicht nötig, darauf zu warten, dass ein Mensch das Ergebnis interpretiert oder aushandelt. Dies beseitigt die Notwendigkeit vertrauenswürdiger Vermittler.

Zum Beispiel könntest du einen Smart Contract schreiben, der Gelder treuhänderisch für ein Kind verwahrt und es ihm ermöglicht, die Gelder nach einem bestimmten Datum abzuheben. Wenn es versucht, vor diesem Datum abzuheben, wird der Smart Contract nicht ausgeführt. Oder du könntest einen Vertrag schreiben, der dir automatisch eine digitale Version eines Fahrzeugbriefs gibt, wenn du den Händler bezahlst.

## Vorhersehbare Ergebnisse {#predictability}

Traditionelle Verträge sind mehrdeutig, da sie darauf angewiesen sind, dass Menschen sie interpretieren und umsetzen. Zum Beispiel könnten zwei Richter einen Vertrag unterschiedlich interpretieren, was zu inkonsistenten Entscheidungen und ungleichen Ergebnissen führen könnte. Smart Contracts schließen diese Möglichkeit aus. Stattdessen werden Smart Contracts präzise basierend auf den im Code des Vertrags geschriebenen Bedingungen ausgeführt. Diese Präzision bedeutet, dass der Smart Contract unter denselben Umständen dasselbe Ergebnis liefert.

## Öffentliche Aufzeichnung {#public-record}

Smart Contracts sind nützlich für Audits und Nachverfolgung. Da sich Ethereum-Smart-Contracts auf einer öffentlichen Blockchain befinden, kann jeder sofort Vermögensübertragungen und andere damit verbundene Informationen nachverfolgen. Zum Beispiel kannst du überprüfen, ob jemand Geld an deine Adresse gesendet hat.

## Schutz der Privatsphäre {#privacy-protection}

Smart Contracts schützen auch deine Privatsphäre. Da Ethereum ein pseudonymes Netzwerk ist (deine Transaktionen sind öffentlich an eine eindeutige kryptografische Adresse gebunden, nicht an deine Identität), kannst du deine Privatsphäre vor Beobachtern schützen.

## Sichtbare Bedingungen {#visible-terms}

Schließlich kannst du, wie bei traditionellen Verträgen, überprüfen, was in einem Smart Contract steht, bevor du ihn signierst. Im Gegensatz zu einem traditionellen Vertrag ermöglicht die Onchain-Transparenz eines Smart Contracts jedem, ihn zu prüfen und zu überprüfen, bevor er damit interagiert. 

Obwohl jedoch jeder die Bedingungen eines Smart Contracts einsehen kann, sind die rohen Transaktionsdaten so konzipiert, dass sie von Anwendungen und Wallets interpretiert werden, nicht von Menschen. Da diese Daten so schwer zu lesen sind, sind Benutzer oft einem großen Sicherheitsrisiko ausgesetzt, das als „Blindes Signieren“ (Blind Signing) bezeichnet wird, also der Genehmigung einer Transaktion, die mit einem Smart Contract interagiert, ohne wirklich zu verstehen, was sie bewirken wird. 

Das Ethereum-Ökosystem geht zu **[Clear Signing](https://clearsigning.org/)**-Standards über (insbesondere [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)). Clear Signing übersetzt undurchsichtige Smart-Contract-Daten in einfache, für Menschen lesbare Transaktionsbeschreibungen und stellt sicher, dass jeder den wahren Intent eines Vertrags verstehen kann, bevor er signiert.

## Anwendungsfälle für Smart Contracts {#use-cases}

Smart Contracts können im Grunde alles tun, was Computerprogramme tun können.

Sie können Berechnungen durchführen, Währungen erstellen, Daten speichern, [NFTs](/glossary/#nft) prägen, Kommunikationen senden und sogar Grafiken generieren. Hier sind einige beliebte Beispiele aus der Praxis:

- [Stablecoins](/stablecoins/)
- [Erstellung und Verteilung einzigartiger digitaler Vermögenswerte](/nft/)
- [Ein automatischer, offener Währungsaustausch](/get-eth/#dex)
- [Dezentrales Gaming](/apps/categories/gaming)
- [Eine Versicherungspolice, die automatisch auszahlt](https://etherisc.com/)
- [Ein Standard, der es Menschen ermöglicht, maßgeschneiderte, interoperable Währungen zu erstellen](/developers/docs/standards/tokens/)

## Weiterführende Literatur {#further-reading}

- [Wie Smart Contracts die Welt verändern werden](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Smart Contracts für Entwickler](/developers/docs/smart-contracts/)
- [Lerne, Smart Contracts zu schreiben](/developers/learning-tools/)
- [Mastering Ethereum – Was ist ein Smart Contract?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />