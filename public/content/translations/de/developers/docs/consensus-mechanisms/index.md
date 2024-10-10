---
title: Konsensmechanismus
description: Eine Erklärung von Konsensprotokollen in verteilten Systemen und die Rolle, die sie in Ethereum spielen.
lang: de
---

Der Begriff „Konsensmechanismus“ wird oft umgangssprachlich verwendet, um „Proof-of-Stake“-, „Proof-of-Work“- oder „Proof-of-Authority“-Protokolle zu beschreiben. Dies sind jedoch nur Komponenten in Konsensmechanismen, die vor [Sybil-Angriffen](/glossary/#sybil-attack) schützen. Konsensmechanismen sind der komplette Stack von Ideen, Protokollen und Anreizen, die es einer verteilten Reihe von Nodes ermöglichen, sich über den Zustand einer Blockchain zu einigen.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir dir, zuerst unsere [Einleitung zu Ethereum](/developers/docs/intro-to-ethereum/) zu lesen.

## Was ist ein Konsens? {#what-is-consensus}

Unter einem Konsens verstehen wir, dass eine allgemeine Einigung erzielt wurde. Stellen Sie sich vor, eine Gruppe von Menschen geht ins Kino. Wenn es keine Meinungsverschiedenheiten über einen vorgeschlagenen Film gibt, dann besteht Konsens. Wenn es zu Uneinigkeiten kommt, muss die Gruppe über die Mittel verfügen, um zu entscheiden, welchen Film sie sehen möchte. In extremen Fällen wird die Gruppe sich irgendwann aufteilen.

Im Zusammenhang mit der Ethereum-Blockchain ist der Prozess formalisiert. Das Erreichen von Konsens bedeutet, dass mindestens 66 % der Nodes im Netzwerk sich auf den globalen Zustand des Netzwerks einigen.

## Was ist ein Konsensmechanismus? {#what-is-a-consensus-mechanism}

Der Begriff „Konsensmechanismus“ bezieht sich auf den gesamten Stack von Protokollen, Anreizen und Ideen, die es einem Netzwerk von Nodes ermöglichen, sich auf den Zustand einer Blockchain zu einigen.

Ethereum verwendet einen auf Proof-of-Stake basierenden Konsensmechanismus, der seine kryptoökonomische Sicherheit aus einer Reihe von Belohnungen und Strafen ableitet, die auf das von Stakern gesperrte Kapital angewendet werden. Diese Anreizstruktur ermutigt einzelne Staker dazu, ehrliche Validatoren zu betreiben, bestraft diejenigen, die dies nicht tun, und schafft extrem hohe Kosten für Angriffe auf das Netzwerk.

Es existiert darüber hinaus ein Protokoll, das den Auswahlprozess ehrlicher Validatoren bestimmt, die Blöcke vorschlagen oder validieren, Transaktionen verarbeiten und ihre Stimme bezüglich ihrer Sicht auf die Spitze der Chain abgeben. In den seltenen Situationen, in denen mehrere Blöcke sich in der gleichen Position nahe der Spitze der Chain befinden, kommt ein Abspaltungs-Wahl-Mechanismus zum Tragen. Hierbei werden die Blöcke auswählt, die die „schwerste“ Kette bilden, und zwar gemessen an der Anzahl der Validatoren, die für die Blöcke gestimmt haben, gewichtet nach ihrem eingesetzten Ether-Guthaben.

Einige Konzepte, die für den Konsens wichtig sind, sind nicht explizit im Code definiert. Dazu gehört etwa die zusätzliche Sicherheit, die durch potenzielle soziale Koordination außerhalb des Bands als letzte Verteidigungslinie gegen Angriffe auf das Netzwerk geboten wird.

Diese Komponenten bilden zusammen den Konsensmechanismus.

## Arten von Konsensmechanismen {#types-of-consensus-mechanisms}

### Proof-of-Work-basiert {#proof-of-work}

Wie Bitcoin nutzte auch Ethereum früher ein auf **Proof-of-Work (PoW)** basierendes Konsensprotokoll.

#### Blockerstellung {#pow-block-creation}

Miner konkurrieren darum, neue Blöcke voll mit verarbeiteten Transaktionen zu erstellen. Der Gewinner teilt den neuen Block mit dem Rest des Netzwerks und verdient einige frisch geprägte ETH. Das Rennen wird von dem Computer gewonnen, der ein mathematisches Rätsel am schnellsten lösen kann. Dies erzeugt die kryptografische Verbindung zwischen dem aktuellen Block und dem vorherigen Block. Die Lösung dieses Rätsels ist die Arbeit („Work“) in „Proof-of-Work“. Die kanonische Chain wird dann durch eine Abspaltungs-Wahl-Regel bestimmt, bei der die Reihe von Blöcken ausgewählt wird, für deren Mining die meiste Arbeit geleistet wurde.

#### Sicherheit {#pow-security}

Die Sicherheit des Netzwerks wird dadurch gewährleistet, dass Sie 51 % der Rechenleistung des Netzwerks brauchen, um die Chain zu betrügen. Das würde so große Investitionen in Ausrüstung und Energie erfordern, dass Sie wahrscheinlich mehr ausgeben würden, als Sie einnehmen.

Mehr über [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)

### Proof-of-Stake-basiert {#proof-of-stake}

Ethereum verwendet jetzt ein auf **Proof-of-Stake (PoS)** basierendes Konsensprotokoll.

#### Blockerstellung {#pos-block-creation}

Validatoren erstellen Blöcke. In jedem Slot wird zufällig ein Validator als Block-Proposer ausgewählt. Ihr Konsens-Client fordert ein Bündel von Transaktionen als „Ausführungsnutzlast“ von ihrem gekoppelten Ausführungs-Client an. Sie verpacken dies in Konsensdaten, um einen Block zu bilden, den sie an andere Nodes im Ethereum-Netzwerk senden. Diese Blockproduktion wird mit ETH belohnt. In seltenen Fällen, wenn für einen einzigen Slot mehrere mögliche Blöcke existieren oder Nodes zu unterschiedlichen Zeiten von Blöcken erfahren, wählt der Abspaltungs-Wahl-Algorithmus den Block aus, der die Chain mit dem größten Gewicht an Attestierungen bildet (wobei das Gewicht die Anzahl der attestierenden Validatoren ist, skaliert nach ihrem ETH-Guthaben).

#### Sicherheit {#pos-security}

Ein Proof-of-Stake-System ist kryptoökonomisch sicher, weil ein Angreifer, der versucht, die Kontrolle über die Chain zu übernehmen, eine massive Menge an ETH zerstören muss. Ein Belohnungssystem setzt Anreize für einzelne Staker, ehrlich zu handeln, und Strafen halten Staker davon ab, mit böswilliger Absicht zu handeln.

Mehr zu [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)

### Ein visueller Leitfaden {#types-of-consensus-video}

Erfahren Sie mehr über die verschiedenen Arten von Konsensmechanismen, die auf Ethereum verwendet werden:

<YouTube id="ojxfbN78WFQ" />

### Sybil: Widerstand & Kettenauswahl {#sybil-chain}

Proof-of-Work und Proof-of-Stake sind für sich genommen keine Konsensprotokolle, aber sie werden oft der Einfachheit halber als solche bezeichnet. Sie sind eigentlich Sybil-Widerstandsmechanismen und Blockautor-Selektoren; sie bieten eine Möglichkeit, zu entscheiden, wer der Autor des letzten Blocks ist. Eine weitere wichtige Komponente ist der Chain-Auswahl-(auch Abspaltungs-Wahl-)Algorithmus. Er ermöglicht es Nodes, in Szenarien, bei denen mehrere Blöcke in der gleichen Position existieren, einen einzigen korrekten Block an der Spitze der Chain auszuwählen.

Mit dem **Sybil-Widerstand** wird gemessen, wie ein Protokoll gegen einen Sybil-Angriff abschneidet. Der Widerstand gegen diese Art von Angriffen ist für eine dezentrale Blockchain unerlässlich und ermöglicht es Minern und Validatoren, gleichermaßen entsprechend der eingesetzten Ressourcen belohnt zu werden. Proof-of-Work und Proof-of-Stake schützen davor, indem sie die Benutzer dazu bringen, viel Energie aufzuwenden oder viele Sicherheiten bereitzustellen. Diese Schutzmaßnahmen sind eine wirtschaftliche Abschreckung gegen Sybil-Angriffe.

Eine **Chain-Auswahlregel** wird verwendet, um zu entscheiden, welche Chain die „richtige“ ist. Bitcoin verwendet die „längste Chain“-Regel. Das bedeutet, dass die Blockchain, die am längsten ist, von den restlichen Nodes als gültig akzeptiert wird, sodass sie mit ihr arbeiten. Bei Proof-of-Work-Chains wird die längste Chain auf Basis der gesamten kumulativen Proof-of-Work-Schwierigkeit der Chain bestimmt. Bei Ethereum kam früher auch die „längste Chain“-Regel zur Anwendung; jetzt, da Ethereum auf Proof-of-Stake läuft, hat es jedoch einen aktualisierten Abspaltungs-Wahl-Algorithmus übernommen, der das „Gewicht“ der Kette bestimmt. Das Gewicht entspricht der kumulierten Summe der Validatorenstimmen, gewichtet nach den in Ether eingesetzten Beträgen der Validatoren.

Ethereum verwendet einen Konsensmechanismus, bekannt als [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/), der [Casper FFG-Proof-of-Stake](https://arxiv.org/abs/1710.09437) mit der [GHOST-Abspaltungs-Wahl-Regel](https://arxiv.org/abs/2003.03052) kombiniert.

## Weiterführende Informationen {#further-reading}

- [Was ist ein Blockchain-Konsens-Algorithmus?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Was ist der Nakamoto-Konsens? Vollständiger Leitfaden für Anfänger](https://blockonomi.com/nakamoto-consensus/)
- [Wie funktioniert Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Über die Sicherheit und Leistungsfähigkeit von Proof-of-Work-Blockchains](https://eprint.iacr.org/2016/555.pdf)
- [Byzantinischer Fehler](https://en.wikipedia.org/wiki/Byzantine_fault)

_Gibt es Community-Resourcen, die Sie hilfreich fanden? Bearbeiten Sie diese Seite und fügen Sie sie hinzu._

## Verwandte Themen {#related-topics}

- [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)
- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)
