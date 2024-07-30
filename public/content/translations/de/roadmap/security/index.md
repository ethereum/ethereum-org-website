---
title: Ein sichereres Ethereum Netzwerk
description: Ethereum ist die sicherste und dezentralisierte Smart-Contract-Plattform, die es gibt. Es gibt jedoch immer noch Verbesserungen, die vorgenommen werden können, um Ethereum bis weit in die Zukunft hinein gegen jegliche Art von Angriffen zu wappnen.
lang: de
image: /images/roadmap/roadmap-security.png
alt: "Ethereum-Roadmap"
template: roadmap
---

Ethereum ist bereits eine äußerst sichere, dezentralisierte Smart-Contract-Plattform. Es gibt jedoch immer noch Verbesserungen, die vorgenommen werden können, um Ethereum bis weit in die Zukunft hinein gegen jegliche Art von Angriffen zu wappnen. Dazu gehören subtile Änderungen an der Art und Weise, wie Ethereum-Prüfer (Node) mit konkurrierenden Blöcken umgehen, sowie die Erhöhung der Geschwindigkeit, mit der das Netzwerk Blöcke als ["finalisiert"](/developers/docs/consensus-mechanisms/pos/#finality) betrachtet (was bedeutet, dass sie nicht ohne extreme wirtschaftliche Verluste für einen Angreifer verändert werden können).

Es gibt zudem Verbesserungen, die das Zensieren von Transaktionen erheblich erschweren, indem sie den Block-Konstrukteur blind für den tatsächlichen Inhalt ihrer Blöcke machen, und neue Möglichkeiten, zu erkennen, wann ein Block-Prüfer zensiert. Zusammen werden diese Verbesserungen das Proof-of-Stake-Protokoll verbessern, so dass die Nutzer - von Privatpersonen bis hin zu Unternehmen - sofortiges Vertrauen in ihre Anwendungen, Daten und Vermögenswerte auf Ethereum haben.

## Staking-Auszahlungen {#staking-withdrawals}

Die Umstellung von Proof-of-Work auf Proof-of-Stake begann damit, dass die Ethereum-Pioniere ihre ETH in einem Hinterlegungsvertrag "verwahrten". Dieses ETH wird zum Schutz des Netzes verwendet. Dieses ETH kann jedoch bisher nicht freigeschaltet und an die Nutzer zurückgegeben werden. Die Erlaubnis, dieses ETH auszuzahlen, ist ein wichtiger Teil des Proof-of-Stake-Upgrades. Abgesehen davon, dass die Auszahlungen eine kritische Komponente eines voll funktionsfähigen Proof-of-Stake-Protokolls sind, ist das Zulassen von Auszahlungen auch vorteilhaft für die Sicherheit von Ethereum, da dies den Gutachtern ermöglicht, ihre ETH-Belohnungen für andere Zwecke als der Validierung von Transaktionen zu verwenden. Das bedeutet, dass Nutzer, die Liquidität wünschen, nicht auf Liquid Staking Derivate (LSD) angewiesen sind, die eine zentralisierende Kraft auf Ethereum ausüben können. Diese Aufrüstung soll bis zum 12. April 2023 abgeschlossen sein.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Lesen Sie mehr über Auszahlungen</ButtonLink>

## Angriff abwehren {#defending-against-attacks}

Auch nach Abhebungen gibt es Verbesserungen, die am [Proof-of-Stake-Protokoll](/developers/docs/consensus-mechanisms/pos/) von Ethereum vorgenommen werden können. Eine davon ist [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - ein sicherer "fork-choice"-Algorithmus, der bestimmte ausgeklügelte Arten von Angriffen erschwert.

Eine Verkürzung der Zeit, die Ethereum für die Fertigstellung von Blöcken benötigt, würde eine bessere Nutzererfahrung bieten und ausgeklügelte "Reorg"-Angriffe verhindern, bei denen Angreifer versuchen, sehr aktuelle Blöcke umzuwandeln, um Profit zu machen oder bestimmte Transaktionen zu zensieren. [**Single slot finality (SSF)**](/roadmap/single-slot-finality/) ist eine Möglichkeit, die Abschlussverzögerung zu minimieren. Zurzeit besteht die Möglichkeit, dass ein Angreifer andere Validierer dazu bewegt, Blöcke in einem Zeitraum von 15 Minuten neu zu konfigurieren. Mit SSF ist dieser Zeitrahmen gleich 0. Nutzer, von Einzelpersonen bis hin zu Anwendungen und Börsen, profitieren von der schnellen Gewissheit, dass ihre Transaktionen nicht rückgängig gemacht werden, und das Netzwerk profitiert davon, dass eine ganze Klasse von Angriffen unterbunden wird.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Lesen Sie mehr über die Endgültigkeit voneinzelnen Slots</ButtonLink>

## Verteidigung gegen Zensur {#defending-against-censorship}

Die Dezentralisierung verhindert, dass einzelne Personen oder kleine Gruppen von Prüfern zu viel Einfluss gewinnen. Neue Staking-Technologien können dazu beitragen, dass die Ethereum-Validatoren so dezentralisiert wie möglich bleiben und gleichzeitig vor Hardware-, Software- und Netzwerkausfällen geschützt sind. Dazu gehört auch Software, die die Verantwortung für die Validierung auf mehrere Nodes verteilt. Dies wird als **verteilte Validierungstechnologie (distributed validator technology / DVT)** bezeichnet. Für Staking-Pools besteht ein Anreiz, DVT zu verwenden, da es mehreren Computern ermöglicht, gemeinsam an der Validierung teilzunehmen, was zu zusätzlicher Redundanz und Fehlertoleranz führt. Außerdem werden die Validierungsschlüssel auf mehrere Systeme aufgeteilt, anstatt dass ein einzelner Operator mehrere Validatoren betreibt. Dies erschwert es unredlichen Betreibern, Angriffe auf Ethereum zu koordinieren. Insgesamt besteht die Idee darin, Sicherheitsvorteile zu erzielen, indem die Validatoren als _Gemeinschaften_ und nicht als Einzelpersonen betrieben werden.

<ButtonLink variant="outline-color" href="/staking/dvt/">Lesen Sie mehr über verteilte Validierungstechnologie</ButtonLink>

Die Implementierung der **Proposer-Builder-Separation (PBS)** wird die in Ethereum eingebauten Schutzmechanismen gegen Zensur drastisch verbessern. PBS ermöglicht es einem Validator, einen Block zu erstellen, und einem anderen, ihn über das Ethereum-Netzwerk zu veröffentlichen. Dadurch wird sichergestellt, dass die Gewinne aus professionellen, gewinnmaximierenden Blockbildungsalgorithmen gerechter über das Netzwerk verteilt werden und **verhindern, dass sich der Gewinn im Laufe der Zeit bei den leistungsstärksten institutionellen Stakern konzentriert**. Der Blockanbieter kann den profitabelsten Block auswählen, der ihm von einem Markt von Blockbauern angeboten wird. Um zu zensieren, müsste ein Blockvorschläger oft einen weniger profitablen Block wählen, was **wirtschaftlich betrachtet unlogisch und auch für den Rest der Validierer** im Netz offensichtlich wäre.

Es gibt potenzielle Erweiterungen zu PBS, wie verschlüsselte Transaktionen und Inklusionslisten, die die Zensurresistenz von Ethereum weiter verbessern könnten. Diese machen den Blockersteller und den Vorschlagenden blind für die tatsächlichen Transaktionen, die in ihren Blöcken enthalten sind.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Lesen Sie über die Trennung von Proposer und Builder</ButtonLink>

## Schutz für Validatoren {#protecting-validators}

Es ist möglich, dass ein raffinierter Angreifer bevorstehende Prüfer identifiziert und sie mit Spam attackiert, um sie daran zu hindern, Blöcke vorzuschlagen; dies ist als **Denial of Service (DoS)** Angriff bekannt. Die Implementierung von [**secret-leader-election (SLE)**](/roadmap/secret-leader-election) schützt vor dieser Art von Angriffen, indem verhindert wird, dass die Blockvorschläger im Voraus bekannt gegeben werden. Dabei wird eine Reihe von kryptografischen Zusagen, die Kandidaten für Blockvorschläge darstellen, ständig gemischt und deren Reihenfolge verwendet, um zu bestimmen, welcher Prüfer ausgewählt wird, und zwar so, dass nur die Prüfer selbst ihre Reihenfolge im Voraus erfahren.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Lesen Sie über die geheime Wahl des Leiters</ButtonLink>

## Aktueller Fortschritt {#current-progress}

Die Sicherheitsverbesserungen in der Roadmap befinden sich in einem fortgeschrittenen Stadium der Entwicklung, werden aber voraussichtlich erst im Laufe der Zeit umgesetzt. Die nächsten Schritte für view-merge, PBS, SSF und SLE sind die Fertigstellung von Spezifikationen und der Beginn der Entwicklung von Prototypen.
