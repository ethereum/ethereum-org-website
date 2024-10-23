---
title: Einführung in Ether
description: Eine Einführung für Entwickler in die Kryptowährung Ether.
lang: de
---

## Voraussetzungen {#prerequisites}

Damit du diese Seite besser verstehst, empfehlen wir dir, zuerst [Einführung in Ethereum](/developers/docs/intro-to-ethereum/) zu lesen.

## Was ist eine Kryptowährung? {#what-is-a-cryptocurrency}

Eine Kryptowährung ist ein Tauschmittel, das durch ein Blockchain-basiertes Ledger gesichert ist.

Ein Tauschmittel ist alles, was allgemein als Zahlungsmittel für Waren und Dienstleistungen akzeptiert wird, und ein Ledger ist ein Datenspeicher, der die Transaktionen aufzeichnet. Die Blockchain-Technologie ermöglicht es den Nutzern, Transaktionen auf dem Ledger durchzuführen, ohne sich auf eine vertrauenswürdige dritte Partei zu verlassen, die dieses verwaltet.

Die erste Kryptowährung war Bitcoin, die vom Pseudonym Satoshi Nakamoto erschaffen wurde. Seit der Veröffentlichung von Bitcoin im Jahr 2009 haben Menschen Tausende von Kryptowährungen auf vielen verschiedenen Blockchains geschaffen.

## Was ist Ether? {#what-is-ether}

**Ether (ETH)** ist die Kryptowährung, die für viele Dinge im Ethereum-Netzwerk verwendet wird. Grundsätzlich ist es die einzig akzeptable Form der Bezahlung von Transaktionsgebühren, und nach [der Zusammenführung](/roadmap/merge) wird Ether benötigt, um Blöcke auf dem Mainnet zu validieren und vorzuschlagen. Ether werden u. a. auch als primäre Form von Sicherheiten auf den [DeFi](/defi)-Kreditmärkten, als Rechnungseinheit auf NFT-Marktplätzen, als Bezahlung für die Erbringung von Dienstleistungen oder für den Verkauf von Gütern in der realen Welt und mehr verwendet.

Ethereum ermöglicht es Entwicklern, [**dezentrale Anwendungen (dapps)**](/developers/docs/dapps) zu erstellen, die sich alle einen Pool von Rechenleistung teilen. Da dieser gemeinsame Pool endlich ist, braucht Ethereum einen Mechanismus, um zu bestimmen, wer ihn nutzen darf. Andernfalls könnte eine App versehentlich oder böswillig alle Netzwerkressourcen verbrauchen, was anderen den Zugriff auf die App verwehren würde.

Die Kryptowährung Ether unterstützt einen Preismechanismus für die Rechenleistung von Ethereum. Wenn Nutzer/Nutzerinnen eine Transaktion durchführen wollen, müssen sie Ether bezahlen, damit ihre Transaktion auf der Blockchain anerkannt wird. Diese Nutzungskosten werden als [Gasgebühren](/developers/docs/gas/) bezeichnet, und die Gasgebühr hängt von der Menge an Rechenleistung ab, die für die Ausführung der Transaktion benötigt wird, sowie von der netzwerkweiten Nachfrage nach Rechenleistung zu diesem Zeitpunkt.

Selbst wenn eine böswillige Dapp eine Endlosschleife einreichen würde, ginge der Transaktion irgendwann der Ether aus und sie würde beendet, so dass das Netzwerk wieder zur Normalität zurückkehren könnte.

Es ist üblich, Ethereum und Ether [zu verwechseln](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845); wenn Leute den "Preis von Ethereum" erwähnen, beschreiben sie den Preis von Ether.

## Ether-Minting {#minting-ether}

Minting ist der Prozess, bei dem neuer Ether im Ethereum-Ledger erstellt wird. Das zugrundeliegende Ethereum-Protokoll erstellt den neuen Ether, und es ist nicht möglich, dass ein Nutzer Ether erstellt.

Ether wird als Belohnung für jeden vorgeschlagenen Block und an jedem Epochen-Checkpoint für andere Validierungsaktivitäten geprägt, die mit dem Erreichen des Konsenses in Zusammenhang stehen. Der Gesamtbetrag, der ausgegeben wird, hängt von der Anzahl der Validatoren und der Höhe ihrer Einsätze ab. Diese Gesamtausgabe wird im Idealfall, wenn alle Validierer ehrlich und online sind, gleichmäßig unter den Validierern aufgeteilt, doch in der Realität variiert sie je nach Leistung der Validierer. Etwa 1/8 der Gesamtausgabe geht an den Block-Vorschlagenden, der Rest wird auf die weiteren Validierer verteilt. Block-Vorschlagende erhalten auch Trinkgelder aus Transaktionsgebühren und MEV-bezogenen Einnahmen, aber diese stammen aus recyceltem Ether, nicht aus der Neuausstellung.

## Ether verbrennen {#burning-ether}

Neben der Erzeugung von Ether durch Blockbelohnungen kann Ether auch durch einen Prozess namens "Burning" zerstört werden. Wenn Ether verbrannt wird, wird er dauerhaft aus dem Verkehr gezogen.

Bei jeder Transaktion auf Ethereum wird Ether verbrannt. Wenn Nutzer für ihre Transaktionen bezahlen, wird eine grundlegende Gasgebühr vernichtet, die vom Netzwerk entsprechend der Transaktion festgelegt wird. Dies, zusammen mit variablen Blockgrößen und einer maximalen Gasgebühr, vereinfacht die Abschätzung der Transaktionsgebühren auf Ethereum. Wenn die Nachfrage im Netzwerk hoch ist, können [Blöcke](https://etherscan.io/block/12965263) mehr Ether verbrauchen, als sie minten, wodurch die Ausgabe von Ether effektiv ausgeglichen wird.

Das Verbrennen der Grundgebühr verhindert, dass ein Block-Produzent Transaktionen manipulieren kann. Wenn beispielsweise Block-Ersteller die Grundgebühr erhalten, könnten sie ihre eigenen Transaktionen kostenlos einbeziehen und die Grundgebühr für alle anderen erhöhen. Alternativ könnten sie die Grundgebühr an einige Nutzer außerhalb der Kette zurückerstatten, was zu einem undurchsichtigen und komplexen Markt für Transaktionsgebühren führen würde.

## Stückelung von Ether {#denominations}

Da der Wert vieler Transaktionen auf Ethereum gering ist, hat Ether mehrere Stückelungen, die als kleinere Rechnungseinheiten bezeichnet werden können. Von diesen Stückelungen sind Wei und gwei besonders wichtig.

Wei ist die kleinstmögliche Menge an Ether. Daher basieren viele technische Implementierungen, wie das [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), auf Berechnungen in Wei.

Gwei, kurz für Giga-Wei, wird oft verwendet, um die Gaskosten auf Ethereum zu beschreiben.

| Stückelung | Wert in Ether    | Häufige Verwendung             |
| ---------- | ---------------- | ------------------------------ |
| Wei        | 10<sup>-18</sup> | Technische Implementierungen   |
| Gwei       | 10<sup>-9</sup>  | Menschlich lesbare Gasgebühren |

## Überweisung von Ether {#transferring-ether}

Jede Transaktion auf Ethereum enthält ein `value`-Feld, das den zu überweisenden Ether-Betrag in Wei angibt, der von der Adresse des Absenders an die Adresse des Empfängers gesendet wird.

Wenn es sich bei der Empfängeradresse um einen [Smart Contract](/developers/docs/smart-contracts/) handelt, kann dieser übertragene Ether zum Bezahlen von Gas verwendet werden, wenn der Smart Contract seinen Code ausführt.

[Weitere Informationen zu Transaktionen](/developers/docs/transactions/)

## Ether-Saldo abfragen {#querying-ether}

Nutzer können den Ether-Saldo jedes [Kontos](/developers/docs/accounts/) abfragen, indem sie das `balance`-Feld des Kontos einsehen, das den Ether-Bestand in Wei anzeigt.

[Etherscan](https://etherscan.io) ist ein beliebtes Tool zur Überprüfung von Adresssalden über eine webbasierte Anwendung. Zum Beispiel zeigt [diese Etherscan-Seite](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) den Kontostand der Ethereum Foundation. Kontostände können auch über Wallets oder direkt durch Anfragen an die Knoten abgefragt werden.

## Weiterführende Informationen {#further-reading}

- [Definition von Ether und Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) - _CME Group_
- [Ethereum Whitepaper](/whitepaper/): Der ursprüngliche Vorschlag für Ethereum. Dieses Dokument enthält eine Beschreibung von Ether und der Beweggründe für seine Entstehung.
- [Gwei-Rechner](https://www.alchemy.com/gwei-calculator): Dieser Gwei-Rechner konvertiert Wei, Gwei und Ether. Geben Sie einfach einen Betrag an Wei, Gwei oder ETH ein, die Umrechnung erhalten Sie automatisch.

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_
