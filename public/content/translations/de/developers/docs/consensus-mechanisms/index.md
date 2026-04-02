---
title: Konsensmechanismen
description: "Eine Erklärung von Konsensprotokollen in verteilten Systemen und der Rolle, die sie bei Ethereum spielen."
lang: de
---

Der Begriff „Konsensmechanismus“ wird umgangssprachlich oft verwendet, um sich auf „Proof-of-Stake“-, „Proof-of-Work“- oder „Proof-of-Authority“-Protokolle zu beziehen. Dies sind jedoch nur Komponenten in Konsensmechanismen, die vor [Sybil-Angriffen](/glossary/#sybil-attack) schützen. Konsensmechanismen sind der komplette Stack aus Ideen, Protokollen und Anreizen, die es einer verteilten Gruppe von Blockchain-Knoten ermöglichen, sich auf den Zustand einer Blockchain zu einigen.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, zuerst unsere [Einführung in Ethereum](/developers/docs/intro-to-ethereum/) zu lesen.

## Was ist Konsens? {#what-is-consensus}

Unter Konsens verstehen wir, dass eine allgemeine Einigung erzielt wurde. Stellen Sie sich eine Gruppe von Menschen vor, die ins Kino gehen. Wenn es keine Meinungsverschiedenheiten über die vorgeschlagene Filmauswahl gibt, ist ein Konsens erreicht. Wenn es Meinungsverschiedenheiten gibt, muss die Gruppe über Mittel verfügen, um zu entscheiden, welchen Film sie sehen möchte. In extremen Fällen wird sich die Gruppe schließlich aufteilen.

In Bezug auf die [Ethereum](/)-Blockchain ist der Prozess formalisiert, und das Erreichen eines Konsenses bedeutet, dass mindestens 66 % der Blockchain-Knoten im Netzwerk über den globalen Zustand des Netzwerks einig sind.

## Was ist ein Konsensmechanismus? {#what-is-a-consensus-mechanism}

Der Begriff Konsensmechanismus bezieht sich auf den gesamten Stack von Protokollen, Anreizen und Ideen, die es einem Netzwerk von Blockchain-Knoten ermöglichen, sich auf den Zustand einer Blockchain zu einigen.

Ethereum verwendet einen auf Proof-of-Stake basierenden Konsensmechanismus, der seine kryptoökonomische Sicherheit aus einer Reihe von Belohnungen und Strafen ableitet, die auf das von Stakern gesperrte Kapital angewendet werden. Diese Anreizstruktur ermutigt einzelne Staker, ehrliche Validatoren zu betreiben, bestraft diejenigen, die dies nicht tun, und verursacht extrem hohe Kosten für einen Angriff auf das Netzwerk.

Dann gibt es ein Protokoll, das regelt, wie ehrliche Validatoren ausgewählt werden, um Blöcke vorzuschlagen oder zu validieren, Transaktionen zu verarbeiten und für ihre Sicht auf die Spitze der Chain abzustimmen. In den seltenen Situationen, in denen sich mehrere Blöcke an derselben Position in der Nähe der Spitze der Chain befinden, gibt es einen Fork-Choice-Mechanismus, der Blöcke auswählt, die die „schwerste“ Chain bilden, gemessen an der Anzahl der Validatoren, die für die Blöcke gestimmt haben, gewichtet nach ihrem gestakten Ether-Guthaben.

Einige Konzepte sind für den Konsens wichtig, die nicht explizit im Code definiert sind, wie z. B. die zusätzliche Sicherheit, die durch eine potenzielle Out-of-Band-soziale Koordination als letzte Verteidigungslinie gegen Angriffe auf das Netzwerk geboten wird.

Diese Komponenten bilden zusammen den Konsensmechanismus.

## Arten von Konsensmechanismen {#types-of-consensus-mechanisms}

### Proof-of-Work-basiert {#proof-of-work}

Wie Bitcoin verwendete Ethereum einst ein auf **Proof-of-Work (PoW)** basierendes Konsensprotokoll.

#### Block-Erstellung {#pow-block-creation}

Miner konkurrieren darum, neue Blöcke zu erstellen, die mit verarbeiteten Transaktionen gefüllt sind. Der Gewinner teilt den neuen Block mit dem Rest des Netzwerks und verdient etwas frisch geprägtes ETH. Das Rennen gewinnt der Computer, der ein mathematisches Rätsel am schnellsten lösen kann. Dies erzeugt die kryptografische Verbindung zwischen dem aktuellen Block und dem vorhergehenden Block. Das Lösen dieses Rätsels ist die Arbeit (Work) in „Proof-of-Work“. Die kanonische Chain wird dann durch eine Fork-Choice-Regel bestimmt, die die Menge an Blöcken auswählt, für deren Mining die meiste Arbeit aufgewendet wurde.

#### Sicherheit {#pow-security}

Das Netzwerk wird dadurch sicher gehalten, dass man 51 % der Rechenleistung des Netzwerks benötigen würde, um die Chain zu betrügen. Dies würde so enorme Investitionen in Ausrüstung und Energie erfordern, dass man wahrscheinlich mehr ausgeben würde, als man gewinnen könnte.

Mehr zu [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)

### Proof-of-Stake-basiert {#proof-of-stake}

Ethereum verwendet nun ein auf **Proof-of-Stake (PoS)** basierendes Konsensprotokoll.

#### Block-Erstellung {#pos-block-creation}

Validatoren erstellen Blöcke. Ein Validator wird in jedem Slot zufällig als Block-Vorschlagender ausgewählt. Sein Konsens-Client fordert ein Bündel von Transaktionen als „Ausführungs-Payload“ von seinem gekoppelten Ausführungs-Client an. Er verpackt dies in Konsensdaten, um einen Block zu bilden, den er an andere Blockchain-Knoten im Ethereum-Netzwerk sendet. Diese Blockproduktion wird in ETH belohnt. In seltenen Fällen, in denen mehrere mögliche Blöcke für einen einzelnen Slot existieren oder Blockchain-Knoten zu unterschiedlichen Zeiten von Blöcken erfahren, wählt der Fork-Choice-Algorithmus den Block aus, der die Chain mit dem größten Gewicht an Bestätigungen bildet (wobei das Gewicht die Anzahl der bestätigenden Validatoren skaliert nach ihrem ETH-Guthaben ist).

#### Sicherheit {#pos-security}

Ein Proof-of-Stake-System ist kryptoökonomisch sicher, da ein Angreifer, der versucht, die Kontrolle über die Chain zu übernehmen, eine massive Menge an ETH zerstören muss. Ein System von Belohnungen bietet einzelnen Stakern Anreize, sich ehrlich zu verhalten, und Strafen schrecken Staker davon ab, böswillig zu handeln.

Mehr zu [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)

### Ein visueller Leitfaden {#types-of-consensus-video}

Sehen Sie sich mehr zu den verschiedenen Arten von Konsensmechanismen an, die bei Ethereum verwendet werden:

<YouTube id="ojxfbN78WFQ" />

### Sybil-Resistenz & Chain-Auswahl {#sybil-chain}

Proof-of-Work und Proof-of-Stake allein sind keine Konsensprotokolle, werden aber der Einfachheit halber oft als solche bezeichnet. Sie sind eigentlich Sybil-Resistenzmechanismen und Selektoren für Blockautoren; sie sind eine Möglichkeit zu entscheiden, wer der Autor des neuesten Blocks ist. Eine weitere wichtige Komponente ist der Chain-Auswahl-Algorithmus (auch Fork-Choice genannt), der es Blockchain-Knoten ermöglicht, in Szenarien, in denen mehrere Blöcke an derselben Position existieren, einen einzigen korrekten Block an der Spitze der Chain auszuwählen.

**Sybil-Resistenz** misst, wie sich ein Protokoll gegen einen Sybil-Angriff behauptet. Die Resistenz gegen diese Art von Angriff ist für eine dezentralisierte Blockchain unerlässlich und ermöglicht es, Miner und Validatoren basierend auf den eingesetzten Ressourcen gleichermaßen zu belohnen. Proof-of-Work und Proof-of-Stake schützen davor, indem sie Benutzer dazu zwingen, viel Energie aufzuwenden oder viele Sicherheiten zu hinterlegen. Diese Schutzmaßnahmen sind eine wirtschaftliche Abschreckung gegen Sybil-Angriffe.

Eine **Chain-Auswahlregel** wird verwendet, um zu entscheiden, welche Chain die „richtige“ Chain ist. Bitcoin verwendet die Regel der „längsten Chain“, was bedeutet, dass die längste Blockchain diejenige ist, die der Rest der Blockchain-Knoten als gültig akzeptiert und mit der er arbeitet. Bei Proof-of-Work-Chains wird die längste Chain durch die gesamte kumulative Proof-of-Work-Schwierigkeit der Chain bestimmt. Ethereum verwendete früher ebenfalls die Regel der längsten Chain; da Ethereum nun jedoch auf Proof-of-Stake läuft, hat es einen aktualisierten Fork-Choice-Algorithmus übernommen, der das „Gewicht“ der Chain misst. Das Gewicht ist die kumulierte Summe der Stimmen der Validatoren, gewichtet nach den gestakten Ether-Guthaben der Validatoren.

Ethereum verwendet einen Konsensmechanismus namens [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/), der [Casper FFG Proof-of-Stake](https://arxiv.org/abs/1710.09437) mit der [GHOST-Fork-Choice-Regel](https://arxiv.org/abs/2003.03052) kombiniert.

## Weiterführende Literatur {#further-reading}

- [Was ist ein Blockchain-Konsensalgorithmus?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Was ist der Nakamoto-Konsens? Ein kompletter Anfängerleitfaden](https://blockonomi.com/nakamoto-consensus/)
- [Wie funktioniert Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Zur Sicherheit und Leistung von Proof-of-Work-Blockchains](https://eprint.iacr.org/2016/555.pdf)
- [Byzantinischer Fehler](https://en.wikipedia.org/wiki/Byzantine_fault)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)
- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof-of-Authority](/developers/docs/consensus-mechanisms/poa/)