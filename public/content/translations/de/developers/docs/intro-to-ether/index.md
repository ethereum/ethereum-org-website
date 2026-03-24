---
title: "Technische Einführung in Ether"
description: "Eine Einführung in die Kryptowährung Ether für Entwickler."
lang: de
---

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, zuerst die [Einführung in Ethereum](/developers/docs/intro-to-ethereum/) zu lesen.

## Was ist eine Kryptowährung? {#what-is-a-cryptocurrency}

Eine Kryptowährung ist ein Tauschmittel, das durch einen Blockchain-basierten Ledger gesichert ist.

Ein Tauschmittel ist alles, was weithin als Zahlungsmittel für Waren und Dienstleistungen akzeptiert wird, und ein Ledger ist ein Datenspeicher, der Transaktionen aufzeichnet. Die Blockchain-Technologie ermöglicht es Benutzern, Transaktionen auf dem Ledger durchzuführen, ohne sich auf eine vertrauenswürdige dritte Partei verlassen zu müssen, um den Ledger zu verwalten.

Die erste Kryptowährung war Bitcoin, entwickelt von Satoshi Nakamoto. Seit der Veröffentlichung von Bitcoin im Jahr 2009 wurden Tausende von Kryptowährungen auf vielen verschiedenen Blockchains entwickelt.

## Was ist Ether? {#what-is-ether}

**Ether (ETH)** ist die Kryptowährung, die für viele Dinge im Ethereum-Netzwerk verwendet wird. Grundsätzlich ist es die einzige akzeptierte Zahlungsform für Transaktionsgebühren, und nach [The Merge](/roadmap/merge) wird Ether benötigt, um Blöcke im Mainnet zu validieren und vorzuschlagen. Ether wird auch als primäre Form der Sicherheit auf den [DeFi](/defi)-Kreditmärkten, als Rechnungseinheit auf NFT-Marktplätzen, als Zahlung für erbrachte Dienstleistungen oder den Verkauf von realen Gütern und vielem mehr verwendet.

Ethereum ermöglicht es Entwicklern, [**dezentralisierte Anwendungen (Dapps)**](/developers/docs/dapps) zu erstellen, die sich alle einen Pool an Rechenleistung teilen. Dieser gemeinsame Pool ist begrenzt, daher benötigt Ethereum einen Mechanismus, um zu bestimmen, wer ihn nutzen darf. Andernfalls könnte eine Dapp versehentlich oder böswillig alle Netzwerkressourcen verbrauchen, was andere vom Zugriff darauf abhalten würde.

Die Kryptowährung Ether unterstützt einen Preismechanismus für die Rechenleistung von Ethereum. Wenn Benutzer eine Transaktion durchführen möchten, müssen sie Ether bezahlen, damit ihre Transaktion auf der Blockchain anerkannt wird. Diese Nutzungskosten werden als [Gasgebühren](/developers/docs/gas/) bezeichnet, und die Gasgebühr hängt von der Menge an Rechenleistung ab, die zur Ausführung der Transaktion erforderlich ist, sowie von der netzwerkweiten Nachfrage nach Rechenleistung zu diesem Zeitpunkt.

Selbst wenn eine böswillige Dapp eine Endlosschleife einreichen würde, würde der Transaktion daher irgendwann das Ether ausgehen und sie würde abgebrochen werden, sodass das Netzwerk zum Normalzustand zurückkehren kann.

Es ist [üblich, Ethereum und Ether zu verwechseln](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) – wenn Leute vom „Preis von Ethereum“ sprechen, meinen sie eigentlich den Preis von Ether.

## Prägen von Ether {#minting-ether}

Das Prägen ist der Prozess, bei dem neues Ether auf dem Ethereum-Ledger erstellt wird. Das zugrunde liegende Ethereum-Protokoll erstellt das neue Ether, und es ist für einen Benutzer nicht möglich, Ether zu erstellen.

Ether wird als Belohnung für jeden vorgeschlagenen Block und an jedem Epochen-Checkpoint für andere Validator-Aktivitäten im Zusammenhang mit der Konsensfindung geprägt. Die insgesamt ausgegebene Menge hängt von der Anzahl der Validatoren ab und davon, wie viel Ether sie als Einsatz hinterlegt haben. Diese gesamte Emission wird im Idealfall, dass alle Validatoren ehrlich und online sind, gleichmäßig unter den Validatoren aufgeteilt, variiert in der Realität jedoch je nach Leistung der Validatoren. Etwa 1/8 der gesamten Emission geht an den Block-Vorschlagenden; der Rest wird auf die anderen Validatoren verteilt. Block-Vorschlagende erhalten auch Trinkgelder aus Transaktionsgebühren und MEV-bezogenen Einnahmen, aber diese stammen aus recyceltem Ether, nicht aus einer neuen Emission.

## Verbrennen von Ether {#burning-ether}

Neben der Erstellung von Ether durch Block-Belohnungen kann Ether auch durch einen Prozess namens „Verbrennen“ (Burning) zerstört werden. Wenn Ether verbrannt wird, wird es dauerhaft aus dem Verkehr gezogen.

Das Verbrennen von Ether findet bei jeder Transaktion auf Ethereum statt. Wenn Benutzer für ihre Transaktionen bezahlen, wird eine Grundgebühr für Gas, die vom Netzwerk entsprechend der Transaktionsnachfrage festgelegt wird, zerstört. Dies, gepaart mit variablen Blockgrößen und einer maximalen Gasgebühr, vereinfacht die Schätzung der Transaktionsgebühr auf Ethereum. Wenn die Netzwerknachfrage hoch ist, können [Blöcke](https://eth.blockscout.com/block/22580057) mehr Ether verbrennen, als sie prägen, was die Ether-Emission effektiv ausgleicht.

Das Verbrennen der Grundgebühr erschwert es einem Blockproduzenten, Transaktionen zu manipulieren. Wenn Blockproduzenten beispielsweise die Grundgebühr erhalten würden, könnten sie ihre eigenen Transaktionen kostenlos einbeziehen und die Grundgebühr für alle anderen erhöhen. Alternativ könnten sie einigen Benutzern die Grundgebühr Off-Chain erstatten, was zu einem undurchsichtigeren und komplexeren Markt für Transaktionsgebühren führen würde.

## Stückelungen von Ether {#denominations}

Da der Wert vieler Transaktionen auf Ethereum gering ist, hat Ether mehrere Stückelungen, die als kleinere Rechnungseinheiten bezeichnet werden können. Von diesen Stückelungen sind Wei und Gwei besonders wichtig.

Wei ist die kleinstmögliche Menge an Ether, und infolgedessen basieren viele technische Implementierungen, wie das [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), alle Berechnungen auf Wei.

Gwei, kurz für Giga-Wei, wird oft verwendet, um Gaskosten auf Ethereum zu beschreiben.

| Stückelung   | Wert in Ether    | Häufige Verwendung        |
| ------------ | ---------------- | ------------------------- |
| Wei          | 10<sup>-18</sup> | Technische Implementierungen |
| Gwei         | 10<sup>-9</sup>  | Für Menschen lesbare Gasgebühren |

## Überweisen von Ether {#transferring-ether}

Jede Transaktion auf Ethereum enthält ein `value`-Feld, das die Menge an Ether angibt, die in Wei gestückelt von der Adresse des Absenders an die Adresse des Empfängers gesendet werden soll.

Wenn die Empfängeradresse ein [Smart Contract](/developers/docs/smart-contracts/) ist, kann dieses überwiesene Ether verwendet werden, um für Gas zu bezahlen, wenn der Smart Contract seinen Code ausführt.

[Mehr zu Transaktionen](/developers/docs/transactions/)

## Abfragen von Ether {#querying-ether}

Benutzer können das Ether-Guthaben jedes [Kontos](/developers/docs/accounts/) abfragen, indem sie das `balance`-Feld des Kontos überprüfen, das die Ether-Bestände in Wei anzeigt.

[Etherscan](https://etherscan.io) und [Blockscout](https://eth.blockscout.com) sind beliebte Tools, um Adressguthaben über webbasierte Anwendungen zu überprüfen. Zum Beispiel zeigt [diese Blockscout-Seite](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) das Guthaben der Ethereum Foundation. Kontostände können auch über Wallets oder direkt durch Anfragen an Blockchain-Knoten abgefragt werden.

## Weiterführende Literatur {#further-reading}

- [Definition von Ether und Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Ethereum-Whitepaper](/whitepaper/): Der ursprüngliche Vorschlag für Ethereum. Dieses Dokument enthält eine Beschreibung von Ether und die Motivationen hinter seiner Erschaffung.
- [Gwei-Rechner](https://www.alchemy.com/gwei-calculator): Verwenden Sie diesen Gwei-Rechner, um Wei, Gwei und Ether einfach umzurechnen. Geben Sie einfach einen beliebigen Betrag in Wei, Gwei oder ETH ein und berechnen Sie automatisch die Umrechnung.

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_