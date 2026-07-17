---
title: "Autoritätsnachweis (PoA)"
description: "Eine Erklärung des Konsensprotokolls Autoritätsnachweis (PoA) und seiner Rolle im Blockchain-Ökosystem."
lang: de
---

**Autoritätsnachweis (PoA)** ist ein reputationsbasierter Konsensalgorithmus, der eine modifizierte Version von [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) ist. Er wird hauptsächlich von privaten Chains, Testnets und lokalen Entwicklungsnetzwerken verwendet. PoA ist ein reputationsbasierter Konsensalgorithmus, der das Vertrauen in eine Gruppe autorisierter Unterzeichner erfordert, um Blöcke zu produzieren, anstelle eines Stake-basierten Mechanismus wie bei PoS.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Transaktionen](/developers/docs/transactions/), [Blöcke](/developers/docs/blocks/) und [Konsensmechanismen](/developers/docs/consensus-mechanisms/) zu informieren.

## Was ist der Autoritätsnachweis (PoA)? {#what-is-poa}

Der Autoritätsnachweis ist eine modifizierte Version von **[Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) (PoS)**, die ein reputationsbasierter Konsensalgorithmus anstelle des Stake-basierten Mechanismus in PoS ist. Der Begriff wurde erstmals 2017 von Gavin Wood eingeführt. Dieser Konsensalgorithmus wird hauptsächlich von privaten Chains, Testnets und lokalen Entwicklungsnetzwerken verwendet, da er den Bedarf an hochwertigen Ressourcen wie bei PoW überwindet und die Skalierbarkeitsprobleme von PoS löst, indem nur eine kleine Teilmenge von Nodes die Blockchain speichert und Blöcke produziert.

Der Autoritätsnachweis erfordert das Vertrauen in eine Gruppe autorisierter Unterzeichner, die im [Genesis-Block](/glossary/#genesis-block) festgelegt sind. In den meisten aktuellen Implementierungen behalten alle autorisierten Unterzeichner die gleiche Macht und die gleichen Privilegien bei der Bestimmung des Konsenses der Chain. Die Idee hinter dem Reputations-Staking ist, dass jeder autorisierte Validator allen bekannt ist, beispielsweise durch Know Your Customer (KYC) oder dadurch, dass eine bekannte Organisation der einzige Validator ist – auf diese Weise ist die Identität eines Validators bekannt, falls er etwas falsch macht.

Es gibt mehrere Implementierungen von PoA, aber die Standard-Ethereum-Implementierung ist **Clique**, welche [EIP-225](https://eips.ethereum.org/EIPS/eip-225) implementiert. Clique ist entwicklerfreundlich und ein einfach zu implementierender Standard, der alle Arten der Client-Synchronisierung unterstützt. Weitere Implementierungen umfassen [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) und [Aura](https://openethereum.github.io/Chain-specification).

## Wie es funktioniert {#how-it-works}

Bei PoA wird eine Gruppe autorisierter Unterzeichner ausgewählt, um neue Blöcke zu erstellen. Die Unterzeichner werden basierend auf ihrer Reputation ausgewählt und sind die Einzigen, die neue Blöcke erstellen dürfen. Die Unterzeichner werden im Round-Robin-Verfahren ausgewählt, und jeder Unterzeichner darf in einem bestimmten Zeitrahmen einen Block erstellen. Die Blockerstellungszeit ist festgelegt, und die Unterzeichner müssen innerhalb dieses Zeitrahmens einen Block erstellen.

Die Reputation in diesem Kontext ist keine quantifizierte Größe, sondern vielmehr die Reputation bekannter Unternehmen wie Microsoft und Google. Daher ist die Art und Weise der Auswahl der vertrauenswürdigen Unterzeichner nicht algorithmisch, sondern vielmehr der normale menschliche Akt des _Vertrauens_. Wenn beispielsweise ein Unternehmen wie Microsoft ein privates PoA-Netzwerk zwischen Hunderten oder Tausenden von Start-ups aufbaut und selbst die Rolle als einziger vertrauenswürdiger Unterzeichner übernimmt (mit der Möglichkeit, in Zukunft andere bekannte Unterzeichner wie Google hinzuzufügen), würden die Start-ups zweifellos darauf vertrauen, dass Microsoft jederzeit ehrlich handelt, und das Netzwerk nutzen. Dies löst die Notwendigkeit, in verschiedenen kleinen/privaten Netzwerken, die für unterschiedliche Zwecke aufgebaut wurden, zu staken, um sie dezentral und funktionsfähig zu halten, sowie den Bedarf an Minern, was viel Strom und Ressourcen verbraucht. Einige private Netzwerke verwenden den PoA-Standard in seiner ursprünglichen Form, wie z. B. VeChain, und einige modifizieren ihn, wie z. B. Binance, das [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) verwendet, was eine speziell modifizierte Version von PoA und PoS ist.

Der Abstimmungsprozess wird von den Unterzeichnern selbst durchgeführt. Jeder Unterzeichner gibt bei der Erstellung eines neuen Blocks eine Stimme für das Hinzufügen oder Entfernen eines Unterzeichners in seinem Block ab. Die Stimmen werden von den Nodes zusammengezählt, und die Unterzeichner werden hinzugefügt oder entfernt, basierend darauf, ob die Stimmen einen bestimmten Schwellenwert `SIGNER_LIMIT` erreichen.

Es kann zu Situationen kommen, in denen kleine Forks auftreten. Die Schwierigkeit eines Blocks hängt davon ab, ob der Block der Reihe nach („in turn“) oder außer der Reihe („out of turn“) signiert wurde. „In turn“-Blöcke haben die Schwierigkeit 2 und „out of turn“-Blöcke haben die Schwierigkeit 1. Im Falle kleiner Forks wird die Chain, bei der die meisten Unterzeichner Blöcke „in turn“ versiegeln, die größte Schwierigkeit ansammeln und gewinnen.

## Angriffsvektoren {#attack-vectors}

### Bösartige Unterzeichner {#malicious-signers}

Ein bösartiger Benutzer könnte zur Liste der Unterzeichner hinzugefügt werden, oder ein Signierschlüssel/eine Signiermaschine könnte kompromittiert werden. In einem solchen Szenario muss das Protokoll in der Lage sein, sich gegen Reorgs und Spamming zu verteidigen. Die vorgeschlagene Lösung besteht darin, dass bei einer Liste von N autorisierten Unterzeichnern jeder Unterzeichner nur 1 Block von jeweils K prägen darf. Dies stellt sicher, dass der Schaden begrenzt ist und die restlichen Validatoren den bösartigen Benutzer abwählen können.

### Zensur {#censorship-attack}

Ein weiterer interessanter Angriffsvektor besteht darin, dass ein Unterzeichner (oder eine Gruppe von Unterzeichnern) versucht, Blöcke zu zensieren, die für ihre Entfernung aus der Autorisierungsliste stimmen. Um dies zu umgehen, ist die zulässige Prägehäufigkeit der Unterzeichner auf 1 von N/2 beschränkt. Dies stellt sicher, dass bösartige Unterzeichner mindestens 51 % der Signierkonten kontrollieren müssen, an welchem Punkt sie effektiv zur neuen Quelle der Wahrheit (Source-of-Truth) für die Chain werden würden.

### Spam {#spam-attack}

Ein weiterer kleiner Angriffsvektor sind bösartige Unterzeichner, die in jeden von ihnen geprägten Block neue Abstimmungsvorschläge einfügen. Da Nodes alle Stimmen zusammenzählen müssen, um die tatsächliche Liste der autorisierten Unterzeichner zu erstellen, müssen sie alle Stimmen im Laufe der Zeit aufzeichnen. Ohne eine Begrenzung des Abstimmungsfensters könnte dies langsam, aber unbegrenzt wachsen. Die Lösung besteht darin, ein _gleitendes_ Fenster von W Blöcken festzulegen, nach dem Stimmen als veraltet gelten. _Ein vernünftiges Fenster könnten 1-2 Epochen sein._

### Gleichzeitige Blöcke {#concurrent-blocks}

In einem PoA-Netzwerk darf bei N autorisierten Unterzeichnern jeder Unterzeichner 1 Block von K prägen, was bedeutet, dass N-K+1 Validatoren zu jedem gegebenen Zeitpunkt prägen dürfen. Um zu verhindern, dass diese Validatoren um Blöcke wetteifern, sollte jeder Unterzeichner einen kleinen zufälligen „Offset“ zu der Zeit hinzufügen, zu der er einen neuen Block veröffentlicht. Obwohl dieser Prozess sicherstellt, dass kleine Forks selten sind, können gelegentliche Forks dennoch auftreten, genau wie im Mainnet. Wenn festgestellt wird, dass ein Unterzeichner seine Macht missbraucht und Chaos verursacht, können die anderen Unterzeichner ihn abwählen.

Wenn es beispielsweise 10 autorisierte Unterzeichner gibt und jeder Unterzeichner 1 Block von 6 erstellen darf, können zu jedem Zeitpunkt 5 Validatoren Blöcke erstellen. Um zu verhindern, dass sie um die Erstellung von Blöcken wetteifern, fügt jeder Unterzeichner einen kleinen zufälligen „Offset“ zu der Zeit hinzu, zu der er einen neuen Block veröffentlicht. Dies reduziert das Auftreten kleiner Forks, lässt aber dennoch gelegentliche Forks zu, wie man es im Ethereum Mainnet sieht. Wenn ein Unterzeichner seine Autorität missbraucht und Störungen verursacht, kann er aus dem Netzwerk abgewählt werden.

## Vor- und Nachteile {#pros-and-cons}

| Vorteile                                                                                                                                                                                          | Nachteile                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Skalierbarer als andere beliebte Mechanismen wie PoS und PoW, da es auf einer begrenzten Anzahl von Block-Unterzeichnern basiert                                                                  | PoA-Netzwerke haben typischerweise eine relativ kleine Anzahl von validierenden Nodes. Dies macht ein PoA-Netzwerk zentralisierter.                                                                |
| PoA-Blockchains sind unglaublich günstig zu betreiben und zu warten                                                                                                                               | Ein autorisierter Unterzeichner zu werden, ist für eine gewöhnliche Person typischerweise unerreichbar, da die Blockchain Entitäten mit etablierter Reputation erfordert.                          |
| Die Transaktionen werden sehr schnell bestätigt, da dies weniger als 1 Sekunde dauern kann, weil nur eine begrenzte Anzahl von Unterzeichnern erforderlich ist, um neue Blöcke zu validieren | Bösartige Unterzeichner könnten Reorgs, Doppelausgaben oder Zensur von Transaktionen im Netzwerk durchführen; diese Angriffe werden zwar abgeschwächt, sind aber dennoch möglich |

## Weiterführende Literatur {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique-Standard_
- [Studie zum Autoritätsnachweis](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Kryptowirtschaft_
- [Was ist der Autoritätsnachweis?](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Autoritätsnachweis erklärt](https://academy.binance.com/en/articles/proof-of-authority-explained) _Binance_
- [PoA in der Blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique erklärt](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Veraltetes PoA, Aura-Spezifikation](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, eine weitere PoA-Implementierung](https://besu.hyperledger.org/private-networks/concepts/poa)

### Lernen Sie besser visuell? {#visual-learner}

Sehen Sie sich eine visuelle Erklärung des Autoritätsnachweises an:

<VideoWatch slug="proof-of-authority-explained" />

## Verwandte Themen {#related-topics}

- [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)