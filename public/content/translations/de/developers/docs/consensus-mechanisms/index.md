---
title: Konsensmechanismus
description: Eine Erklärung von Konsensprotokollen in verteilten Systemen und die Rolle, die sie in Ethereum spielen.
lang: de
incomplete: true
---

Bei Blockchains wie Ethereum, die im Grunde verteilte Datenbanken sind, müssen sich die Nodes des Netzwerks über den aktuellen Zustand des Netzwerks einigen. Diese Einigung wird durch Konsensmechanismen erreicht.

Auch wenn die Konsensmechanismen nicht direkt mit der Entwicklung einer App zu tun haben, wird das Verständnis dieser Mechanismen dir und deinen Nutzern/Nutzerinnen helfen, Konzepte wie Gaspreise und Transaktionszeiten zu verstehen.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir dir, zuerst unsere [Einführung in Ethereum](/developers/docs/intro-to-ethereum/) zu lesen.

## Was ist ein Konsens? {#what-is-consensus}

Unter einem Konsens verstehen wir, dass eine allgemeine Einigung erzielt wurde. Stell dir vor, eine Gruppe von Menschen geht ins Kino. Wenn es keine Meinungsverschiedenheiten über eine vorgeschlagene Filmauswahl gibt, wird ein Konsens erzielt. Im Extremfall wird sich die Gruppe ohne Konsens aufspalten.

In Bezug auf die Blockchain ist der Prozess formalisiert und das Erreichen eines Konsenses bedeutet, dass sich mindestens 51 % der Nodes im Netzwerk über den nächsten globalen Zustand des Netzwerks einig sind.

## Was ist ein Konsensmechanismus? {#what-is-a-consensus-mechanism}

Konsensmechanismen (auch bekannt als Konsensprotokolle oder Konsensalgorithmen) ermöglichen, dass verteilte Systeme (Computernetzwerke) zusammenarbeiten und sicher bleiben.

Seit Jahrzehnten werden Mechanismen genutzt, um einen Konsens zwischen Datenbank-Nodes, Anwendungsservern und anderen Unternehmensinfrastrukturen herzustellen. In den letzten Jahren wurden neue Konsensmechanismen erfunden, die es kryptoökonomischen Systemen wie Ethereum ermöglichen, sich über den Zustand des Netzwerks zu einigen.

Ein Konsensmechanismus in einem kryptoökonomisches System hilft auch bestimmte Arten von wirtschaftlichen Angriffen zu verhindern. Theoretisch kann ein Angreifer den Konsens erreichen, indem er 51 % des Netzwerks kontrolliert. Konsensmechanismen sollen diesen "51-%-Angriff" unmöglich zu machen. Verschiedene Mechanismen werden entwickelt, um dieses Sicherheitsproblem auf unterschiedliche Weise zu lösen.

<YouTube id="dylgwcPH4EA" />

## Arten von Konsensmechanismen {#types-of-consensus-mechanisms}

### Proof-of-Work {#proof-of-work}

Ethereum verwendet, wie Bitcoin, derzeit ein **Proof-of-Work(PoW)**-Konsensprotokoll.

#### Blockerstellung {#pow-block-creation}

Der Proof-of-Work wird durch [Miner](/developers/docs/consensus-mechanisms/pow/mining/) erledigt, die um die Erstellung eines neuen Blocks voller verarbeiteter Transaktionen konkurrieren. Der Gewinner teilt den neuen Block mit dem Rest des Netzwerks und verdient einige frisch geminte ETH. Es gewinnt derjenige, dessen Computer am schnellsten ein mathematisches Rätsel lösen kann. Dadurch wird die kryptographische Verbindung zwischen dem aktuellen Block und dem vorherigen Block hergestellt. Die Lösung dieses Rätsels ist die Arbeit ("Work") im "Proof-of-Work".

#### Sicherheit {#pow-security}

Die Sicherheit des Netzwerks wird dadurch gewährleistet, dass du 51 % der Rechenleistung des Netzwerks brauchst, um die Kette zu betrügen. Das würde so große Investitionen in Ausrüstung und Energie erfordern, dass du wahrscheinlich mehr ausgibst, als du gewinnst.

Mehr über [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)

### Proof-of-Stake {#proof-of-stake}

Ethereum plant ein Upgrade zum **Proof-of-Stake(PoS)**-Konsensprotokoll.

#### Blockerstellung {#pos-block-creation}

Der Proof-of-Stake wird durch Validatoren vollzogen, welche ihre ETH für die Teilnahme im System eingesetzt haben. Ein Validator wird nach dem Zufallsprinzip ausgewählt, um neue Blöcke zu erstellen, sie mit dem Netzwerk zu teilen und Belohnungen zu verdienen. Anstatt intensive Rechenarbeit leisten zu müssen, musst du einfach deine ETH ins Netzwerk gesteckt haben. Das schafft Anreize für ein gesundes Netzwerkverhalten.

#### Sicherheit {#pos-security}

Ein Proof-of-Stake-System wird durch die Tatsache gesichert, dass man 51 % der gesamten eingesetzten ETH benötigt, um die Kette zu betrügen, und dass dein Einsatz für böswilliges Verhalten gekürzt wird.

Mehr zu [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)

### Ein visueller Leitfaden {#types-of-consensus-video}

Erfahre mehr über die verschiedenen Arten von Konsensmechanismen, die auf Ethereum verwendet werden:

<YouTube id="ojxfbN78WFQ" />

### Sybil: Widerstand & Kettenauswahl {#sybil-chain}

Technisch gesehen sind Proof-of-Work und Proof-of-Stake keine Konsensprotokolle, aber der Einfachheit halber werden sie oft als solche bezeichnet. Sie sind eigentlich Sybil-Widerstandsmechanismen und Blockautor-Selektoren; sie sind ein Weg, um zu entscheiden, wer der Autor des letzten Blocks ist. Dieser Sybil-Widerstandsmechanismus in Kombination mit einer Kettenauswahlregel macht einen echten Konsensmechanismus aus.

Der **Sybil-Widerstand** misst, wie ein Protokoll gegen einen [Sybil-Angriff](https://wikipedia.org/wiki/Sybil_attack) abschneidet. Bei Sybil-Angriffen gibt sich ein Nutzer oder eine Gruppe als viele Nutzer aus. Der Widerstand gegen diese Art von Angriffen ist für eine dezentrale Blockchain unerlässlich und ermöglicht es Minern und Validatoren, auf der Grundlage der eingesetzten Ressourcen gleichermaßen belohnt zu werden. Proof-of-Work und Proof-of-Stake schützen davor, indem sie die Nutzer/Nutzerinnen dazu bringen, viel Energie aufzuwenden oder eine Menge Sicherheiten zu stellen. Diese Schutzmaßnahmen sind eine wirtschaftliche Abschreckung gegen Sybil-Angriffe.

Eine **Kettenauswahlregel** wird verwendet, um zu entscheiden, welche Kette die "richtige" ist. Ethereum und Bitcoin verwenden derzeit die "Longest-Chain"-Regel, was bedeutet, dass die Blockchain, die am längsten ist, von den anderen Nodes als gültig akzeptiert wird und mit ihr arbeitet. Bei Proof-of-Work-Ketten wird die längste Kette durch die gesamte kumulative Proof-of-Work-Schwierigkeit der Kette bestimmt.

Die Kombination aus Proof-of-Work und Longest-Chain-Regel ist als "Nakamoto-Konsens" bekannt.

Die [Beacon Chain](/roadmap/beacon-chain/) verwendet einen Konsensmechanismus namens [Casper the Friendly Finality Gadget](https://arxiv.org/abs/1710.09437), der auf einem Proof-of-Stake basiert.

## Weiterführende Informationen {#further-reading}

- [Was ist ein Blockchain-Konsens-Algorithmus?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Was ist der Nakamoto-Konsens? Vollständiger Leitfaden für Anfänger](https://blockonomi.com/nakamoto-consensus/)
- [Wie funktioniert Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Über die Sicherheit und Leistungsfähigkeit von Proof-of-Work-Blockchains](https://eprint.iacr.org/2016/555.pdf)

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_

## Verwandte Themen {#related-topics}

- [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)
- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
