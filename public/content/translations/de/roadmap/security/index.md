---
title: Ein sichereres Ethereum Netzwerk
description: Ethereum ist die sicherste und dezentralisierte Smart-Contract-Plattform, die es gibt. Es gibt jedoch immer noch Verbesserungen, die vorgenommen werden können, um Ethereum bis weit in die Zukunft hinein gegen jegliche Art von Angriffen zu wappnen.
lang: de
image: /images/roadmap/roadmap-security.png
alt: "Ethereum-Roadmap"
template: roadmap
---

**Ethereum ist bereits eine sehr sichere**, dezentrale Plattform für [Smart-Contracts](/glossary/#smart-contract). Es gibt jedoch immer noch Verbesserungen, die vorgenommen werden können, um Ethereum bis weit in die Zukunft hinein gegen jegliche Art von Angriffen zu wappnen. Dazu gehören subtile Änderungen an der Art und Weise, wie [Ethereum-Clients](/glossary/#consensus-client) mit konkurrierenden [Blöcken](/glossary/#block) umgehen, sowie eine Erhöhung der Geschwindigkeit, mit der das Netzwerk Blöcke als [„finalisiert“](/developers/docs/consensus-mechanisms/pos/#finality) betrachtet (was bedeutet, dass sie nicht geändert werden können, ohne dass einem Angreifer extreme wirtschaftliche Verluste entstehen).

Es gibt zudem Verbesserungen, die das Zensieren von Transaktionen erheblich erschweren, indem sie den Block-Konstrukteur blind für den tatsächlichen Inhalt ihrer Blöcke machen, und neue Möglichkeiten, zu erkennen, wann ein Block-Prüfer zensiert. Zusammen werden diese Verbesserungen das [Proof-of-Stake](/glossary/#pos)-Protokoll aktualisieren, sodass Benutzer – von Einzelpersonen bis hin zu Unternehmen – sofortiges Vertrauen in ihre Apps, Daten und Vermögenswerte auf Ethereum haben können.

## Staking-Auszahlungen {#staking-withdrawals}

Das Upgrade von [Proof-of-Work](/glossary/#pow) auf Proof-of-Stake nahm damit seinen Anfang, dass Wegbereiter auf Ethereum ihre ETH per „Staking“ in einem Einzahlungsvertrag deponierten. Dieses ETH wird zum Schutz des Netzes verwendet. Am 12. April 2023 gab es ein zweites Update, um das Abheben der eingesetzten ETH zu ermöglichen. Seither können Validatoren ETH frei „staken “ oder abheben.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Lesen Sie mehr über Auszahlungen</ButtonLink>

## Angriff abwehren {#defending-against-attacks}

Es gibt Verbesserungen, die am Proof-of-Stake-Protokoll von Ethereum vorgenommen werden können. Eine davon ist als [View-Merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) bekannt – ein sicherer [Abspaltungs](/glossary/#fork)-Wahlalgorithmus, der bestimmte ausgefeilte Angriffsarten erschwert.

Eine Verkürzung der Zeit, die Ethereum für die [Finalisierung](/glossary/#finality) von Blöcken benötigt, würde für eine bessere Benutzererfahrung sorgen. Außerdem würde sie ausgefeilte „Reorg“-Angriffe verhindern, bei denen Angreifer versuchen, kürzlich erstellte Blöcke umzuorganisieren, um Profit zu machen oder bestimmte Transaktionen zu zensieren. [**Einzelplatzendgültigkeit („Single Slot Finality“, SSF)**](/roadmap/single-slot-finality/) ist eine **Möglichkeit zur Minimierung der Finalisierungsverzögerung**. Zurzeit besteht die Möglichkeit, dass ein Angreifer andere Validierer dazu bewegt, Blöcke in einem Zeitraum von 15 Minuten neu zu konfigurieren. Mit SSF ist dieser Zeitrahmen gleich 0. Nutzer, von Einzelpersonen bis hin zu Anwendungen und Börsen, profitieren von der schnellen Gewissheit, dass ihre Transaktionen nicht rückgängig gemacht werden, und das Netzwerk profitiert davon, dass eine ganze Klasse von Angriffen unterbunden wird.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Lesen Sie mehr über die Endgültigkeit voneinzelnen Slots</ButtonLink>

## Verteidigung gegen Zensur {#defending-against-censorship}

Durch die Dezentralisierung wird verhindert, dass Einzelpersonen oder kleine Gruppen von [Validatoren](/glossary/#validator) zu einflussreich werden. Neue Staking-Technologien können dazu beitragen, dass die Ethereum-Validatoren so dezentralisiert wie möglich bleiben und gleichzeitig vor Hardware-, Software- und Netzwerkausfällen geschützt sind. Hierzu gehört Software, die die Verantwortlichkeiten von Validatoren auf mehrere [Knoten](/glossary/#node) verteilt. Dies wird als **verteilte Validierungstechnologie (distributed validator technology / DVT)** bezeichnet. [Staking-Pools](/glossary/#staking-pool) werden zur Verwendung von DVT angeregt, da dadurch mehrere Computer gemeinsam an der Validierung teilnehmen können, was zu mehr Redundanz und Fehlertoleranz führt. Außerdem werden die Validierungsschlüssel auf mehrere Systeme aufgeteilt, anstatt dass ein einzelner Operator mehrere Validatoren betreibt. Dies erschwert es unredlichen Betreibern, Angriffe auf Ethereum zu koordinieren. Insgesamt besteht die Idee darin, Sicherheitsvorteile zu erzielen, indem die Validatoren als _Gemeinschaften_ und nicht als Einzelpersonen betrieben werden.

<ButtonLink variant="outline-color" href="/staking/dvt/">Lesen Sie mehr über verteilte Validierungstechnologie</ButtonLink>

Die Implementierung der **Proposer-Builder-Separation (PBS)** wird die in Ethereum eingebauten Schutzmechanismen gegen Zensur drastisch verbessern. PBS ermöglicht es einem Validator, einen Block zu erstellen, und einem anderen, ihn über das Ethereum-Netzwerk zu veröffentlichen. Dadurch wird sichergestellt, dass die Gewinne aus professionellen, gewinnmaximierenden Blockbildungsalgorithmen gerechter über das Netzwerk verteilt werden und **verhindern, dass sich der Gewinn im Laufe der Zeit bei den leistungsstärksten institutionellen Stakern konzentriert**. Der Blockanbieter kann den profitabelsten Block auswählen, der ihm von einem Markt von Blockbauern angeboten wird. Um zu zensieren, müsste ein Blockvorschläger oft einen weniger profitablen Block wählen, was **wirtschaftlich betrachtet unlogisch und auch für den Rest der Validierer** im Netz offensichtlich wäre.

Es gibt potenzielle Erweiterungen zu PBS, wie verschlüsselte Transaktionen und Inklusionslisten, die die Zensurresistenz von Ethereum weiter verbessern könnten. Diese machen den Blockersteller und den Vorschlagenden blind für die tatsächlichen Transaktionen, die in ihren Blöcken enthalten sind.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Lesen Sie über die Trennung von Proposer und Builder</ButtonLink>

## Schutz für Validatoren {#protecting-validators}

Es ist möglich, dass ein raffinierter Angreifer bevorstehende Prüfer identifiziert und sie mit Spam attackiert, um sie daran zu hindern, Blöcke vorzuschlagen; dies ist als **Denial of Service (DoS)** Angriff bekannt. Die Implementierung von [**secret-leader-election (SLE)**](/roadmap/secret-leader-election) schützt vor dieser Art von Angriffen, indem verhindert wird, dass die Blockvorschläger im Voraus bekannt gegeben werden. Dabei wird eine Reihe von kryptografischen Zusagen, die Kandidaten für Blockvorschläge darstellen, ständig gemischt und deren Reihenfolge verwendet, um zu bestimmen, welcher Prüfer ausgewählt wird, und zwar so, dass nur die Prüfer selbst ihre Reihenfolge im Voraus erfahren.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Lesen Sie über die geheime Wahl des Leiters</ButtonLink>

## Aktueller Fortschritt {#current-progress}

**Die auf der Roadmap aufgeführten Sicherheitsupgrades befinden sich in fortgeschrittenen Forschungsstadien**, sie werden aber voraussichtlich erst in einiger Zeit implementiert werden. Die nächsten Schritte für view-merge, PBS, SSF und SLE sind die Fertigstellung von Spezifikationen und der Beginn der Entwicklung von Prototypen.
