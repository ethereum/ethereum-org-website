---
title: Einzelplatzfinalität (single slot finality)
description: Erklärung von Einzelplatzfinalität (single slot finality)
lang: de
---

# Einzelplatzfinalität (single slot finality) {#single-slot-finality}

Es braucht ungefähr 15 Minuten einen Ethereum Block zu finalisieren. Jedoch können wir Ethereums Konsensmechanismus Blöcke effizienter validieren lassen und dadurch die Zeit, die für das Finalisieren benötigt wird, dramatisch verringern. Statt für 15 Minuten zu warten, könnten Blöcke im selben Platz (slot) vorgeschlagen und finalisiert werden. Dieses Konzept nennt sich **Einzelplatzfinalität (SSF)**.

## Was ist Endgültigkeit? {#what-is-finality}

In Ethereums auf Proof-of-Stake basierenden Konsensmechanismus bezieht sich die Endlichkeit auf die Garantie, dass ein Block nicht mehr verändert oder von der Blockchain entfernt werden kann, ohne mindestens 33 % der gesamten staked Ether zu entfernen. Dies ist "krypto-wirtschaftliche" Sicherheit, da das Selbstvertrauen von den extrem hohen Kosten, welche mit dem Verändern der Reihenfolge von Inhalten der Kette assoziiert werden, welche jeden rationalen wirtschaftlichen Akteur davon abhalten würde, es auszuprobieren.

## Warum sich auf schnellere Endlichkeit fokussieren? {#why-aim-for-quicker-finality}

Die derzeitige Zeit zur Endlichkeit hat sich als zu lang herausgestellt. Die meisten Nutzer wollen nicht 15 Minuten auf Endlichkeit warten, und es ist für Anwendungen und Austausche, welche einen hohen Transaktionsdurchsatz wollen ungünstig so lange zu warten, um sicher zu sein, dass ihre Transaktionen permanent sind. Eine Verzögerung zwischen dem Vorschlagen eines Blocks und dessen Finalisierung zu haben ermöglicht auch kurze Neuorganisationen, welche ein Angreifer nutzen könnte einzelne Blöcke zu zensieren oder MEV zu extrahieren. Der Mechanismus, der das stufenweise Verbessern von Blöcken regelt, ist ebenfalls recht komplex und wurde mehrfach gepatcht, um Sicherheitslücken zu schließen, was ihn zu einem der Teile der Ethereum-Codebasis macht, in dem subtile Fehler wahrscheinlicher sind. Diese Probleme könnten alle eliminiert werden, wäre die Zeit, die für das finalisieren eines einzigen Platzes gebraucht wird, geringer.

## Der Kompromiss von Dezentralisation / Zeit / Overhead {#the-decentralization-time-overhead-tradeoff}

Die Endlichkeitsgarantie ist keine direkte Eigenschaft eines neuen Blocks; es braucht Zeit, einen neuen Block zu finalisieren. Der Grund dafür ist, dass Validatoren, die mindestens 2/3 der gesamten staked ETH auf dem Netzwerk für den Block abstimmen müssen ("Bestätigung"), dafür dass er als endlich gesehen werden kann. Jeder validierende Node auf dem Netzwerk muss Attestierungen anderer Nodes verarbeiten, um zu wissen, ob ein Block diese 2/3 Voraussetzung erreicht hat.

Je kürzer die Zeit zur Endlichkeit ist, desto mehr Rechenleistung wird an jedem einzelnen Node benötigt, da die Attestierung schneller verarbeitet werden muss. Außerdem müssen mit mehr validierenden Nodes auch mehr Attestierungen für jeden Block verarbeitet, was auch die benötigte Gesamtrechenleistung erhöht. Je mehr Rechenleistung benötigt wird, desto weniger Menschen können sich ins Ethereum Netzwerk einbringen, da teurere Hardware benötigt wird, um jeden validierenden Node zu betreiben. Die Zeit zwischen Blöcken zu erhöhen, verringert die an jedem Node benötigte Rechenleistung, erhöht jedoch auch die Zeit zu Endlichkeit, da mehr Attestierungen langsam verarbeitet werden.

Deshalb gilt es einen Kompromiss zwischen Overhead (Rechenleistung), Dezentralisierung (Anzahl an Nodes, welche in der validierenden Kette teilnehmen können) und der Zeit zur Endlichkeit. Ein ideales System würde einen Kompromiss zwischen minimaler Rechenleistung, maximaler Dezentralisation und minimalen Zeit zur Endlichkeit finden.

Ethereums derzeitiger Konsensmechanismus gleicht diese Parameter aus, indem:

- **Den minimalen Einsatz (fürs Staking) auf 32 ETH setzen**. Dies setzt eine Höchstanzahl auf die Anzahl von Attestierungen eines Validatoren, die von individuellen Nodes verarbeitet werden müssen und dadurch auch ein Limit auf die vorausgesetzte Rechenleistung für einzelne Nodes.
- **Die Zeit zu Endlichkeit zu ~15 Minuten zu setzen**. Das erzeugt genug Zeit für Validatoren, die auf normalen Standrechnern betrieben werden, um die Attestierungen für jeden Block zu verarbeiten.

Mit dem derzeitigen Aufbau des Mechanismus müssen, um die Zeit zur Endlichkeit zu reduzieren, die Nummer von Validatoren auf dem Netzwerk verringert, oder die Hardware Voraussetzungen für jeden Node erhöht werden. Es gibt jedoch Verbesserungen zu der Art, wie Attestierungen verarbeitet werden, wodurch mehr Attestierungen gezählt werden könnten, ohne einen Overhead an jeden Node hinzuzufügen. Durch die effizientere Verarbeitung kann die Endlichkeit in einem einzelnen Platz, anstelle von zwei Epochen, ermittelt werden.

## Wege zu SSF {#routes-to-ssf}

<ExpandableCard title= "Warum können wir nicht heute schon SSF haben?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Der derzeitige Konsensmechanismus verbindet Attestierungen mehrerer Validatoren, welche Komitees genannt werden, um die Anzahl an Nachrichten, die jeder Validator in einem Block verarbeiten muss, um jenen zu validieren, zu verringern. Jeder Validator hat in jeder Epoche (32 Plätze) die Möglichkeit zur Attestierung. In jedem Platz haben jedoch nur eine Untergruppe von Validatoren, bekannt als Komitee-Attestierung diese Möglichkeit. Das machen sie, indem sie in Unternetzwerke unterteilt werden, in denen wenige Validatoren als "Aggregatoren" ausgewählt werden. Diese Aggregatoren verbinden alle die Unterschriften, welche sie von anderen Validatoren bekommen in, in ihrem Netzwerk zu einer einzelnen aggregierten Unterschrift. Der Aggregator, welcher die größte Anzahl an einzelnen Teilnahmen beinhaltet, gibt dann die aggregierte Unterschrift an den Blockantragsteller (Block Proposer) weiter, welcher sie dann in seinem Block mit den aggregierten Unterschriften anderer Komitees einschließt.

Dieser Prozess gibt für jeden Validatoren ausreichende Kapazität, in jeder Epoche abzustimmen, da 32 Plätze * 64 Komitees * 256 Validator pro Komitee 524 288 Validatoren pro Epoche ergeben. Zum Zeitpunkt der Erstellung dieses Artikels (Februar 2023) gibt es ~513 000 aktive Validatoren.

In diesem Schema ist es für jeden Validatoren möglich für einen Block abzustimmen, indem er seine Attestierungen über die gesamte Epoche verteilen. Jedoch gibt es potentielle Wege diesen Mechanismus zu verbessern, sodass _jeder Validator die Chance hat in jedem Platz zu attestieren_.
</ExpandableCard>

Seit der Ethereum Konsensmechanismus entwickelt wurde, hat sich das Unterschriften-Aggregationsschema (BLS) als deutlich skalierbarer als erwartet erwiesen, dabei wurde auch die Fähigkeit von Clients, die Unterschriften zu verarbeiten und unterschreiben, verbessert. Es stellt sich heraus, dass das Verarbeiten von Attestierungen in großer Anzahl von Validatoren in einem einzelnen Platz möglich ist. Zum Beispiel müssten Nodes, bei einer Million Validatoren, die zweimal pro Platz wählen und dem Verändern von der Zeit pro Slot (Platz) auf 16 Sekunden, Unterschriften mit mindestens 125 000 Aggregationen pro Sekunde funktionieren, um alle Attestierungen innerhalb des Platzes zu verarbeiten. In Wirklichkeit benötigt ein gewöhnlicher Computer ungefähr 500 Nanosekunden um eine Unterschrift zu verifizieren, das heißt, dass 125 000 Verifikationen in ~62,5 ms durchgeführt werden könnten. Das wäre weit unter der Ein-Sekunden-Grenze.

Weitere Effizienzgewinne könnten durch die Erstellung von Superkomitees von beispielsweise 125 000 zufällig gewählten Validatoren pro Platz erreicht werden. Nur diese Validatoren könnten für einen Block abstimmen und dadurch könnte nur eine Untermenge an Validatoren entscheiden, ob ein Block endlich ist. Ob das eine gute Idee ist, kommt darauf an, wie teuer ein Angriff auf Ethereum nach der Community sein sollte. Das liegt daran, dass Angreifer einen unehrlichen Block statt mit 2/3 der gesamten staked Ether mit 2/3 der staked Ether _in diesem Superkomitee_ finalisieren könnten. Dies ist immer noch ein aktives Forschungsgebiet, jedoch scheint es plausibel, dass für eine Validatorenmenge, die groß genug wäre um Superkomitees zu brauchen, würden die Kosten für das Angreifen eines dieser Superkomitees extrem hoch sein (Zum Beispiel beträgen die ETH genannten Kosten eines Angriffs `2/3 * 125 000 * 32 = ~2,6 Millionen ETH`). Die Kosten eines Angriffs können angepasst werden, indem die Größe einer einzelnen Validatorenmenge (z.B. das Anpassen der Validatorengröße, sodass der Angriff 1 Million Ether, 4 Millionen Ether, 10 Millionen Ether, etc. kosten würde). [Vorläufige Abstimmungen](https://youtu.be/ojBgyFl6-v4?t=755) der Community legen nahe, dass 1-2 Millionen Ether akzeptable Angriffskosten darstellen würden, das bedeutet, man bräuchte ~65 636 - ~97 152 Validatoren pro Superkomitee.

Jedoch ist die Verifikation noch nicht das wahre Problem, die Aggregation von Unterschriften ist was Validatoren Nodes wirklich herausfordert. Um die Aggregation der Unterschriften zu skalieren, muss man wahrscheinlich die Validatorenmenge jedes Unternetzwerks oder die Anzahl an Unternetzwerke erhöhen oder zusätzliche Ebenen der Aggregation hinzufügen (d.h. Komitees von Komitees zu implementieren). Ein Teil der Lösung könnte das Erlauben von spezialisierten Aggregatoren sein - ähnlich dazu wie das Blockerzeugen und das Generieren von Verpflichtungen für Rollup Daten zu spezialisierten Blockerzeugern unter Proposer-Builder Separation (PBS) und Danksharding ausgelagert wird.

## Was ist die Rolle der Abspaltungsregel (fork-choice rule) innerhalb SSF? {#role-of-the-fork-choice-rule}

Der heutige Konsensmechanismus beruht auf engen Verbindungen zwischen dem Finality Gadget (Algorithmus, welcher bestimmt ob 2/3 der Validatoren eine bestimmte Kette attestiert haben) und der Abspaltungsregel (Algorithmus, der bestimmt welche Kette die richtige ist, sollte es mehrere geben). Der Abspaltungsalgorithmus (fork choice algorithm) betrachtet nur Blöcke _seit_ dem letzten finalisierten Block. Unter SSF gäbe es keine Blöcke, welche die Abspaltungsregel erwähnen müsste, da die Endgültigkeit im selben Slot, in der der Block vorgeschlagen wurde, aufkommt. Das bedeutet, dass unter SSF _entweder_ der Abspaltungsalgorithmus _oder_ das Finality Gadget zu jeder Zeit aktiv sein müssten. Das Finality Gadget würde Blöcke, bei denen 2/3 der Validatoren online sind und ehrlich attestieren finalisieren. Wenn ein Block die 2/3 Grenze nicht überschreiten könnte, würde die Abspaltungsregel bestimmen welcher Kette zu folgen ist. Das erzeugt auch eine Möglichkeit den Inaktivität-Leck-Mechanismus, welcher eine Kette wiederherstellt, bei der >1/3 der Validatoren offline gegangen sind, wenn auch mit einigen zusätzlichen Nuancen.

## Offenstehende Probleme {#outstanding-issues}

Das Problem mit dem Skalieren von Aggregationen mit einer Erhöhung der Validatorenmenge pro Unternetz ist, dass es zu einer größeren Last auf dem Peer-to-Peer Netzwerk führt. Das Problem damit, Ebenen der Aggregation hinzuzufügen, ist, dass es sehr komplex aufzubauen ist und Verzögerungen mit sich bringt (d.h. es könnte für einen Block Proposer länger dauern von allen Unternetz-Aggregatoren zu hören). Es ist auch nicht klar, wie man mit dem Szenario umgeht, dass mehr aktive Validatoren auf dem Netzwerk sind, als in jedem Platz verarbeitbar sind, sogar mit der BLS Unterschriftenaggregation. Eine mögliche Lösung ist das, da alle Validatoren in jedem Platz attestieren müssen und es keine Komitees unter SSF gibt. Das 32 ETH Limit zum effektiven Guthaben könnte komplett entfernt werden, was bedeutet, dass Operatoren, welche mehrere Validatoren verwalten ihren Staking Einsatz konsolidieren und weniger laufen könnten. Das würde die Anzahl der Nachrichten, welche validierende Nodes verarbeiten müssen, um alle Validatoren zu berücksichtigen reduzieren. Das beruht auf große Staker, welche zustimmen ihre Validatoren zu konsolidieren. Es ist auch möglich eine Obergrenze für die Anzahl an Validatoren oder der Anzahl von staked ETH zu jeder Zeit festzulegen. Jedoch erfordert dies irgendeinen Mechanismus, um zu entscheiden, welche Validatoren erlaubt sind teilzunehmen und welche nicht, was verantwortlich für das Erzeugen ungewollter Nebeneffekte ist.

## Aktueller Fortschritt {#current-progress}

SSF ist in der Forschungsphase. Es ist davon auszugehen, dass ihre Veröffentlichung noch einige Jahre auf sich warten lässt. Wahrscheinlich wird es erst nach anderen wesentlichen Upgrades wie [Verkle Trees](/roadmap/verkle-trees/) und [Danksharding](/roadmap/danksharding/) dazu kommen.

## Weiterführende Informationen {#further-reading}

- [Vitalik zu SSF auf der EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Vitaliks Notizen: Wege zur Einzelplatzfinalität (SSF)](https://notes.ethereum.org/@vbuterin/single_slot_finality)
