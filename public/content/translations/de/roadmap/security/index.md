---
title: Ein sichereres Ethereum
description: Ethereum ist die sicherste und dezentralste Smart-Contract-Plattform, die es gibt. Dennoch können noch Verbesserungen vorgenommen werden, damit Ethereum auch in ferner Zukunft gegen Angriffe jeglicher Art resistent bleibt.
lang: de
image: /images/roadmap/roadmap-security.png
alt: "Ethereum-Roadmap"
template: roadmap
---

**Ethereum ist bereits eine sehr sichere**, dezentrale [Smart-Contract](/glossary/#smart-contract)-Plattform. Dennoch können noch Verbesserungen vorgenommen werden, damit Ethereum auch in ferner Zukunft gegen alle Arten von Angriffen resistent bleibt. Dazu gehören subtile Änderungen an der Art und Weise, wie [Ethereum-Clients](/glossary/#consensus-client) mit konkurrierenden [Blöcken](/glossary/#block) umgehen, sowie die Erhöhung der Geschwindigkeit, mit der das Netzwerk Blöcke als [„endgültig“](/developers/docs/consensus-mechanisms/pos/#finality) betrachtet (was bedeutet, dass sie ohne extreme wirtschaftliche Verluste für einen Angreifer nicht mehr geändert werden können).

Es gibt auch Verbesserungen, die das Zensieren von Transaktionen viel schwieriger machen, indem sie Block-Proposer blind für den tatsächlichen Inhalt ihrer Blöcke machen, sowie neue Wege, um zu erkennen, wenn ein Client zensiert. Zusammen werden diese Verbesserungen das [Proof-of-Stake](/glossary/#pos)-Protokoll aktualisieren, sodass Nutzer – von Einzelpersonen bis hin zu Unternehmen – sofortiges Vertrauen in ihre Apps, Daten und Vermögenswerte auf Ethereum haben.

## Staking-Abhebungen {#staking-withdrawals}

Das Upgrade von [Proof-of-Work](/glossary/#pow) auf Proof-of-Stake begann damit, dass Ethereum-Pioniere ihre ETH in einem Einzahlungsvertrag „stakten“. Diese ETH werden verwendet, um das Netzwerk zu schützen. Am 12. April 2023 gab es ein zweites Update, das es Validatoren ermöglichte, gestakte ETH abzuheben. Seitdem können Validatoren ETH frei staken oder abheben.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Mehr über Abhebungen lesen</ButtonLink>

## Verteidigung gegen Angriffe {#defending-against-attacks}

Es gibt Verbesserungen, die am Proof-of-Stake-Protokoll von Ethereum vorgenommen werden können. Eine davon ist als [View-Merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) bekannt – ein sichererer [Fork](/glossary/#fork)-Choice-Algorithmus, der bestimmte raffinierte Arten von Angriffen erschwert.

Die Reduzierung der Zeit, die Ethereum benötigt, um Blöcke [endgültig zu machen](/glossary/#finality), würde eine bessere Nutzererfahrung bieten und raffinierte „Reorg“-Angriffe verhindern, bei denen Angreifer versuchen, sehr neue Blöcke neu anzuordnen, um Profit zu erzielen oder bestimmte Transaktionen zu zensieren. [**Single-Slot-Finalität (SSF)**](/roadmap/single-slot-finality/) ist ein **Weg, um die Finalisierungsverzögerung zu minimieren**. Derzeit gibt es Blöcke im Wert von 15 Minuten, bei denen ein Angreifer theoretisch andere Validatoren davon überzeugen könnte, sie neu zu konfigurieren. Mit SSF sind es 0. Nutzer, von Einzelpersonen bis hin zu Apps und Börsen, profitieren von der schnellen Gewissheit, dass ihre Transaktionen nicht rückgängig gemacht werden, und das Netzwerk profitiert davon, dass eine ganze Klasse von Angriffen ausgeschaltet wird.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Mehr über Single-Slot-Finalität lesen</ButtonLink>

## Verteidigung gegen Zensur {#defending-against-censorship}

Dezentralisierung verhindert, dass Einzelpersonen oder kleine Gruppen von [Validatoren](/glossary/#validator) zu einflussreich werden. Neue Staking-Technologien können dazu beitragen, dass Ethereums Validatoren so dezentral wie möglich bleiben und sie gleichzeitig vor Hardware-, Software- und Netzwerkausfällen schützen. Dazu gehört Software, die Validator-Verantwortlichkeiten auf mehrere [Nodes](/glossary/#node) verteilt. Dies ist als **Verteilte Validator-Technologie (DVT)** bekannt. [Staking-Pools](/glossary/#staking-pool) haben einen Anreiz, DVT zu nutzen, da es mehreren Computern ermöglicht, gemeinsam an der Validierung teilzunehmen, was Redundanz und Fehlertoleranz hinzufügt. Es teilt auch Validator-Schlüssel auf mehrere Systeme auf, anstatt dass einzelne Betreiber mehrere Validatoren ausführen. Dies macht es für unehrliche Betreiber schwieriger, Angriffe auf Ethereum zu koordinieren. Insgesamt besteht die Idee darin, Sicherheitsvorteile zu erzielen, indem Validatoren als _Gemeinschaften_ und nicht als Einzelpersonen betrieben werden.

<ButtonLink variant="outline-color" href="/staking/dvt/">Mehr über Verteilte Validator-Technologie lesen</ButtonLink>

Die Implementierung der **Proposer-Builder-Trennung (PBS)** wird Ethereums eingebaute Verteidigung gegen Zensur drastisch verbessern. PBS ermöglicht es einem Validator, einen Block zu erstellen, und einem anderen, ihn über das Ethereum-Netzwerk zu übertragen. Dies stellt sicher, dass die Gewinne aus professionellen, profitmaximierenden Block-Building-Algorithmen fairer über das Netzwerk verteilt werden, was **verhindert, dass sich Stake im Laufe der Zeit bei den leistungsstärksten institutionellen Stakern konzentriert**. Der Block-Proposer kann den profitabelsten Block auswählen, der ihm von einem Markt von Block-Buildern angeboten wird. Um zu zensieren, müsste ein Block-Proposer oft einen weniger profitablen Block wählen, was **wirtschaftlich irrational und auch für den Rest der Validatoren im Netzwerk offensichtlich** wäre.

Es gibt potenzielle Erweiterungen für PBS, wie verschlüsselte Transaktionen und Inklusionslisten, die Ethereums Zensurresistenz weiter verbessern könnten. Diese machen den Block-Builder und Proposer blind für die tatsächlichen Transaktionen, die in ihren Blöcken enthalten sind.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Mehr über Proposer-Builder-Trennung lesen</ButtonLink>

## Schutz von Validatoren {#protecting-validators}

Es ist möglich, dass ein raffinierter Angreifer bevorstehende Validatoren identifiziert und sie spammt, um sie daran zu hindern, Blöcke vorzuschlagen; dies ist als **Denial-of-Service (DoS)**-Angriff bekannt. Die Implementierung der [**Geheimen Anführerwahl (SLE)**](/roadmap/secret-leader-election) wird vor dieser Art von Angriff schützen, indem verhindert wird, dass Block-Proposer im Voraus bekannt sind. Dies funktioniert, indem eine Reihe von kryptografischen Commitments, die Kandidaten für Block-Proposer darstellen, kontinuierlich gemischt werden und ihre Reihenfolge verwendet wird, um zu bestimmen, welcher Validator ausgewählt wird, und zwar so, dass nur die Validatoren selbst ihre Reihenfolge im Voraus kennen.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Mehr über die Geheime Anführerwahl lesen</ButtonLink>

## Aktueller Fortschritt {#current-progress}

**Sicherheits-Upgrades auf der Roadmap befinden sich in fortgeschrittenen Forschungsstadien**, aber es wird nicht erwartet, dass sie in absehbarer Zeit implementiert werden. Die nächsten Schritte für View-Merge, PBS, SSF und SLE bestehen darin, eine Spezifikation fertigzustellen und mit dem Bau von Prototypen zu beginnen.