---
title: Ein sichereres Ethereum Netzwerk
description: Ethereum ist die sicherste und dezentralisierte Smart-Contract-Plattform, die es gibt. Es gibt jedoch immer noch Verbesserungen, die vorgenommen werden können, um Ethereum bis weit in die Zukunft hinein gegen jegliche Art von Angriffen zu wappnen.
lang: de
image: /images/roadmap/roadmap-security.png
alt: "Ethereum-Roadmap"
template: roadmap
---

**Ethereum ist bereits eine sehr sichere**, dezentralisierte [Smart-Contract](/glossary/#smart-contract)-Plattform. Es gibt jedoch immer noch Verbesserungen, die vorgenommen werden können, um Ethereum bis weit in die Zukunft hinein gegen jegliche Art von Angriffen zu wappnen. Dazu gehören subtile Änderungen an der Art und Weise, wie [Ethereum-Clients](/glossary/#consensus-client) mit konkurrierenden [Blöcken](/glossary/#block) umgehen, sowie eine Erhöhung der Geschwindigkeit, mit der das Netzwerk Blöcke als [„finalisiert“](/developers/docs/consensus-mechanisms/pos/#finality) betrachtet (was bedeutet, dass sie nicht ohne extreme wirtschaftliche Verluste für einen Angreifer geändert werden können).

Es gibt zudem Verbesserungen, die das Zensieren von Transaktionen erheblich erschweren, indem sie den Block-Konstrukteur blind für den tatsächlichen Inhalt ihrer Blöcke machen, und neue Möglichkeiten, zu erkennen, wann ein Block-Prüfer zensiert. Zusammen werden diese Verbesserungen das [Proof-of-Stake](/glossary/#pos)-Protokoll verbessern, sodass Benutzer – von Einzelpersonen bis hin zu Unternehmen – sofortiges Vertrauen in ihre Apps, Daten und Vermögenswerte auf Ethereum haben.

## Staking-Auszahlungen {#staking-withdrawals}

Das Upgrade von [Proof-of-Work](/glossary/#pow) auf Proof-of-Stake begann damit, dass Ethereum-Pioniere ihre ETH durch „Staking“ in einem Einzahlungsvertrag hinterlegten. Dieses ETH wird zum Schutz des Netzes verwendet. Am 12. April 2023 gab es ein zweites Update, das es Validatoren ermöglichte, gestakte ETH abzuheben. Seither können Validatoren ETH frei „staken “ oder abheben.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Informationen zu Auszahlungen</ButtonLink>

## Schutz vor Angriffen {#defending-against-attacks}

Es gibt Verbesserungen, die am Proof-of-Stake-Protokoll von Ethereum vorgenommen werden können. Einer davon ist als [View-Merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) bekannt – ein sichererer [Fork](/glossary/#fork)-Auswahlalgorithmus, der bestimmte komplexe Angriffsarten erschwert.

Die Verkürzung der Zeit, die Ethereum benötigt, um Blöcke zu [finalisieren](/glossary/#finality), würde eine bessere Benutzererfahrung bieten und komplexe „Reorg“-Angriffe verhindern, bei denen Angreifer versuchen, die neuesten Blöcke neu zu ordnen, um Profit zu erzielen oder bestimmte Transaktionen zu zensieren. [**Single-Slot Finality (SSF)**](/roadmap/single-slot-finality/) ist eine **Möglichkeit, die Finalisierungsverzögerung zu minimieren**. Zurzeit besteht die Möglichkeit, dass ein Angreifer andere Validierer dazu bewegt, Blöcke in einem Zeitraum von 15 Minuten neu zu konfigurieren. Mit SSF ist dieser Zeitrahmen gleich 0. Nutzer, von Einzelpersonen bis hin zu Anwendungen und Börsen, profitieren von der schnellen Gewissheit, dass ihre Transaktionen nicht rückgängig gemacht werden, und das Netzwerk profitiert davon, dass eine ganze Klasse von Angriffen unterbunden wird.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Informationen zu Single-Slot Finality</ButtonLink>

## Schutz vor Zensur {#defending-against-censorship}

Dezentralisierung verhindert, dass Einzelpersonen oder kleine Gruppen von [Validatoren](/glossary/#validator) zu einflussreich werden. Neue Staking-Technologien können dazu beitragen, dass die Ethereum-Validatoren so dezentralisiert wie möglich bleiben und gleichzeitig vor Hardware-, Software- und Netzwerkausfällen geschützt sind. Dazu gehört Software, die die Zuständigkeiten von Validatoren auf mehrere [Nodes](/glossary/#node) verteilt. Dies ist als **verteilte Validatortechnologie (DVT)** bekannt. Für [Staking-Pools](/glossary/#staking-pool) besteht ein Anreiz, DVT zu verwenden, da es mehreren Computern ermöglicht, gemeinsam an der Validierung teilzunehmen, was zu zusätzlicher Redundanz und Fehlertoleranz führt. Außerdem werden die Validierungsschlüssel auf mehrere Systeme aufgeteilt, anstatt dass ein einzelner Operator mehrere Validatoren betreibt. Dies erschwert es unredlichen Betreibern, Angriffe auf Ethereum zu koordinieren. Insgesamt besteht die Idee darin, Sicherheitsvorteile zu erzielen, indem Validatoren als _Gemeinschaften_ und nicht als Einzelpersonen betrieben werden.

<ButtonLink variant="outline-color" href="/staking/dvt/">Informationen zur verteilten Validatortechnologie</ButtonLink>

Die Implementierung der **Proposer-Builder Separation (PBS)** wird die in Ethereum integrierten Schutzmechanismen gegen Zensur drastisch verbessern. PBS ermöglicht es einem Validator, einen Block zu erstellen, und einem anderen, ihn über das Ethereum-Netzwerk zu veröffentlichen. Dies stellt sicher, dass die Gewinne aus professionellen, gewinnmaximierenden Algorithmen zur Blockerstellung gerechter im Netzwerk verteilt werden, **was die Konzentration von Stakes** bei den leistungsstärksten institutionellen Stakern im Laufe der Zeit **verhindert**. Der Blockanbieter kann den profitabelsten Block auswählen, der ihm von einem Markt von Blockbauern angeboten wird. Um zu zensieren, müsste ein Block-Proposer oft einen weniger profitablen Block wählen, was **wirtschaftlich irrational und für die übrigen Validatoren** im Netzwerk **offensichtlich wäre**.

Es gibt potenzielle Erweiterungen zu PBS, wie verschlüsselte Transaktionen und Inklusionslisten, die die Zensurresistenz von Ethereum weiter verbessern könnten. Diese machen den Blockersteller und den Vorschlagenden blind für die tatsächlichen Transaktionen, die in ihren Blöcken enthalten sind.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Informationen zur Proposer-Builder Separation</ButtonLink>

## Schutz für Validatoren {#protecting-validators}

Es ist möglich, dass ein raffinierter Angreifer bevorstehende Validatoren identifiziert und sie mit Spam-Nachrichten angreift, um sie daran zu hindern, Blöcke vorzuschlagen. Dies wird als **Denial-of-Service-Angriff (DoS)** bezeichnet. Die Implementierung von [**Secret Leader Election (SLE)**](/roadmap/secret-leader-election) schützt vor dieser Art von Angriff, indem verhindert wird, dass Block-Proposer im Voraus bekannt sind. Dabei wird eine Reihe von kryptografischen Zusagen, die Kandidaten für Blockvorschläge darstellen, ständig gemischt und deren Reihenfolge verwendet, um zu bestimmen, welcher Prüfer ausgewählt wird, und zwar so, dass nur die Prüfer selbst ihre Reihenfolge im Voraus erfahren.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Informationen zur Secret Leader Election</ButtonLink>

## Aktueller Fortschritt {#current-progress}

**Sicherheitsupgrades auf der Roadmap befinden sich in fortgeschrittenen Forschungsphasen**, aber ihre Implementierung wird voraussichtlich erst in einiger Zeit erfolgen. Die nächsten Schritte für View-Merge, PBS, SSF und SLE sind die Finalisierung einer Spezifikation und der Beginn der Entwicklung von Prototypen.
