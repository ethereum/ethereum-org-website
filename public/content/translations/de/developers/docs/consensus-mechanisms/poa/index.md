---
title: Proof-of-Authority (PoA)
description: "Eine Erklärung des Proof-of-Authority-Konsensprotokolls und seiner Rolle im Blockchain-Ökosystem."
lang: de
---

**Proof-of-Authority (PoA)** ist ein reputationsbasierter Konsensalgorithmus, der eine modifizierte Version von [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) ist. Er wird meistens von privaten Chains, Testnets und lokalen Entwicklungsnetzwerken verwendet. PoA ist ein reputationsbasierter Konsensalgorithmus, der das Vertrauen in eine Gruppe autorisierter Unterzeichner erfordert, um Blöcke zu produzieren, anstelle eines einsatzbasierten Mechanismus wie bei PoS.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Transaktionen](/developers/docs/transactions/), [Blöcke](/developers/docs/blocks/) und [Konsensmechanismen](/developers/docs/consensus-mechanisms/) zu informieren.

## Was ist Proof-of-Authority (PoA)? {#what-is-poa}

Proof-of-Authority ist eine modifizierte Version von **[Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) (PoS)**, die ein reputationsbasierter Konsensalgorithmus anstelle des einsatzbasierten Mechanismus in PoS ist. Der Begriff wurde erstmals 2017 von Gavin Wood eingeführt, und dieser Konsensalgorithmus wurde hauptsächlich von privaten Chains, Testnets und lokalen Entwicklungsnetzwerken verwendet, da er den Bedarf an hochwertigen Ressourcen wie bei PoW überwindet und die Skalierbarkeitsprobleme von PoS löst, indem eine kleine Teilmenge von Blockchain-Knoten die Blockchain speichert und Blöcke produziert.

Proof-of-Authority erfordert das Vertrauen in eine Gruppe autorisierter Unterzeichner, die im [Genesis-Block](/glossary/#genesis-block) festgelegt sind. In den meisten aktuellen Implementierungen behalten alle autorisierten Unterzeichner die gleiche Macht und die gleichen Privilegien bei der Bestimmung des Konsenses der Chain. Die Idee hinter dem Reputations-Staking ist, dass jeder autorisierte Validator jedem durch Dinge wie Know Your Customer (KYC) bekannt ist, oder indem eine bekannte Organisation der einzige Validator ist – auf diese Weise ist ihre Identität bekannt, falls ein Validator etwas falsch macht.

Es gibt mehrere Implementierungen von PoA, aber die Standard-Ethereum-Implementierung ist **Clique**, welche [EIP-225](https://eips.ethereum.org/EIPS/eip-225) implementiert. Clique ist entwicklerfreundlich und ein einfach zu implementierender Standard, der alle Anwendungs-Synchronisierungstypen unterstützt. Andere Implementierungen umfassen [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) und [Aura](https://openethereum.github.io/Chain-specification).

## Wie es funktioniert {#how-it-works}

Bei PoA wird eine Gruppe autorisierter Unterzeichner ausgewählt, um neue Blöcke zu erstellen. Die Unterzeichner werden basierend auf ihrer Reputation ausgewählt und sind die einzigen, die neue Blöcke erstellen dürfen. Die Unterzeichner werden im Round-Robin-Verfahren ausgewählt, und jeder Unterzeichner darf in einem bestimmten Zeitrahmen einen Block erstellen. Die Blockerstellungszeit ist festgelegt, und die Unterzeichner müssen innerhalb dieses Zeitrahmens einen Block erstellen.

Die Reputation in diesem Kontext ist keine quantifizierte Größe, sondern vielmehr die Reputation bekannter Unternehmen wie Microsoft und Google. Daher ist die Art und Weise der Auswahl der vertrauenswürdigen Unterzeichner nicht algorithmisch, sondern vielmehr der normale menschliche Akt des _Vertrauens_, bei dem eine Entität, sagen wir zum Beispiel Microsoft, ein privates PoA-Netzwerk zwischen Hunderten oder Tausenden von Start-ups erstellt und die Rolle selbst als einziger vertrauenswürdiger Unterzeichner übernimmt, mit der Möglichkeit, in Zukunft andere bekannte Unterzeichner wie Google hinzuzufügen. Die Start-ups würden Microsoft zweifellos vertrauen, jederzeit ehrlich zu handeln und das Netzwerk zu nutzen. Dies löst die Notwendigkeit für Staking in verschiedenen kleinen/privaten Netzwerken, die für unterschiedliche Zwecke aufgebaut wurden, um sie dezentralisiert und funktionsfähig zu halten, zusammen mit der Notwendigkeit für Miner, was viel Strom und Ressourcen verbraucht. Einige private Netzwerke verwenden den PoA-Standard so wie er ist, wie z. B. VeChain, und einige modifizieren ihn, wie z. B. Binance, das [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) verwendet, was eine benutzerdefinierte modifizierte Version von PoA und PoS ist.

Der Abstimmungsprozess wird von den Unterzeichnern selbst durchgeführt. Jeder Unterzeichner stimmt für das Hinzufügen oder Entfernen eines Unterzeichners in seinem Block ab, wenn er einen neuen Block erstellt. Die Stimmen werden von den Blockchain-Knoten zusammengezählt, und die Unterzeichner werden basierend darauf hinzugefügt oder entfernt, ob die Stimmen einen bestimmten Schwellenwert `SIGNER_LIMIT` erreichen.

Es kann zu einer Situation kommen, in der kleine Forks auftreten. Die Schwierigkeit eines Blocks hängt davon ab, ob der Block an der Reihe ("in turn") oder außer der Reihe ("out of turn") signiert wurde. "In turn"-Blöcke haben die Schwierigkeit 2 und "out of turn"-Blöcke haben die Schwierigkeit 1. Im Falle von kleinen Forks wird die Chain, bei der die meisten Unterzeichner Blöcke "in turn" versiegeln, die größte Schwierigkeit ansammeln und gewinnen.

## Angriffsvektoren {#attack-vectors}

### Bösartige Unterzeichner {#malicious-signers}

Ein bösartiger Benutzer könnte zur Liste der Unterzeichner hinzugefügt werden, oder ein Signaturschlüssel/eine Signaturmaschine könnte kompromittiert werden. In einem solchen Szenario muss das Protokoll in der Lage sein, sich gegen Reorganisationen und Spamming zu verteidigen. Die vorgeschlagene Lösung besteht darin, dass bei einer Liste von N autorisierten Unterzeichnern jeder Unterzeichner nur 1 Block von jeweils K prägen darf. Dies stellt sicher, dass der Schaden begrenzt ist und der Rest der Validatoren den bösartigen Benutzer abwählen kann.

### Zensur {#censorship-attack}

Ein weiterer interessanter Angriffsvektor ist, wenn ein Unterzeichner (oder eine Gruppe von Unterzeichnern) versucht, Blöcke zu zensieren, die über ihre Entfernung aus der Autorisierungsliste abstimmen. Um dies zu umgehen, ist die erlaubte Prägehäufigkeit der Unterzeichner auf 1 von N/2 beschränkt. Dies stellt sicher, dass bösartige Unterzeichner mindestens 51 % der Signaturkonten kontrollieren müssen, an welchem Punkt sie effektiv zur neuen Quelle der Wahrheit (Source-of-Truth) für die Chain werden würden.

### Spam {#spam-attack}

Ein weiterer kleiner Angriffsvektor sind bösartige Unterzeichner, die neue Abstimmungsvorschläge in jeden Block injizieren, den sie prägen. Da Blockchain-Knoten alle Stimmen zusammenzählen müssen, um die tatsächliche Liste der autorisierten Unterzeichner zu erstellen, müssen sie alle Stimmen im Laufe der Zeit aufzeichnen. Ohne eine Begrenzung des Abstimmungsfensters könnte dies langsam, aber unbegrenzt wachsen. Die Lösung besteht darin, ein _gleitendes_ Fenster von W Blöcken festzulegen, nach dem Stimmen als veraltet gelten. _Ein vernünftiges Fenster könnten 1-2 Epochen sein._

### Gleichzeitige Blöcke {#concurrent-blocks}

In einem PoA-Netzwerk, wenn es N autorisierte Unterzeichner gibt, darf jeder Unterzeichner 1 Block von K prägen, was bedeutet, dass N-K+1 Validatoren zu jedem gegebenen Zeitpunkt prägen dürfen. Um zu verhindern, dass diese Validatoren um Blöcke wetteifern, sollte jeder Unterzeichner einen kleinen zufälligen "Offset" zu der Zeit hinzufügen, zu der er einen neuen Block veröffentlicht. Obwohl dieser Prozess sicherstellt, dass kleine Forks selten sind, können gelegentliche Forks dennoch auftreten, genau wie im Mainnet. Wenn festgestellt wird, dass ein Unterzeichner seine Macht missbraucht und Chaos verursacht, können die anderen Unterzeichner ihn abwählen.

Wenn es zum Beispiel 10 autorisierte Unterzeichner gibt und jeder Unterzeichner 1 Block von 20 erstellen darf, dann können zu jedem Zeitpunkt 11 Validatoren Blöcke erstellen. Um zu verhindern, dass sie um die Erstellung von Blöcken wetteifern, fügt jeder Unterzeichner einen kleinen zufälligen "Offset" zu der Zeit hinzu, zu der er einen neuen Block veröffentlicht. Dies reduziert das Auftreten kleiner Forks, lässt aber dennoch gelegentliche Forks zu, wie man es im Ethereum-Mainnet sieht. Wenn ein Unterzeichner seine Autorität missbraucht und Störungen verursacht, kann er aus dem Netzwerk abgewählt werden.

## Vor- und Nachteile {#pros-and-cons}

| Vorteile                                                                                                                                                                                  | Nachteile                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Skalierbarer als andere beliebte Mechanismen wie PoS und PoW, da es auf einer begrenzten Anzahl von Blockunterzeichnern basiert                                                           | PoA-Netzwerke haben typischerweise eine relativ kleine Anzahl von validierenden Blockchain-Knoten. Dies macht ein PoA-Netzwerk zentralisierter.                                       |
| PoA-Blockchains sind unglaublich günstig zu betreiben und zu warten                                                                                                                       | Ein autorisierter Unterzeichner zu werden, ist für eine gewöhnliche Person typischerweise unerreichbar, da die Blockchain Entitäten mit etablierter Reputation erfordert.             |
| Die Transaktionen werden sehr schnell bestätigt, da es weniger als 1 Sekunde dauern könnte, weil nur eine begrenzte Anzahl von Unterzeichnern erforderlich ist, um neue Blöcke zu validieren | Bösartige Unterzeichner könnten Reorgs durchführen, doppelt ausgeben (Double Spend) oder Transaktionen im Netzwerk zensieren. Diese Angriffe werden abgeschwächt, sind aber immer noch möglich |

## Weiterführende Literatur {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique-Standard_
- [Studie zu Proof-of-Authority](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Kryptoökonomie_
- [Was ist Proof-of-Authority](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Proof-of-Authority erklärt](https://academy.binance.com/en/articles/proof-of-authority-explained) _Binance_
- [PoA in der Blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique erklärt](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Veraltete PoA-, Aura-Spezifikation](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, eine weitere PoA-Implementierung](https://besu.hyperledger.org/private-networks/concepts/poa)

### Lernen Sie eher visuell? {#visual-learner}

Sehen Sie sich eine visuelle Erklärung von Proof-of-Authority an:

<YouTube id="Mj10HSEM5_8" />

## Verwandte Themen {#related-topics}

- [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)