---
title: Proof-of-Authority (PoA)
description: Eine Erklärung des Proof-of-Authority-Konsensprotokolls und seiner Rolle im Blockchain-Ökosystem.
lang: de
---

**Proof-of-Authority (PoA)** ist ein rufbasierter Konsensalgorithmus, der eine modifizierte Version von [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) darstellt. Es wird hauptsächlich von privaten Chains, Testnetzen und lokalen Entwicklungsnetzwerken verwendet. PoA ist ein rufbasierter Konsensalgorithmus, der das Vertrauen in eine Gruppe von autorisierten Unterzeichnern voraussetzt, um Blöcke zu erzeugen, im Gegensatz zu einem Stake-basierten Mechanismus in PoS.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Transaktionen](/developers/docs/transactions/), [Blöcke](/developers/docs/blocks/) und [Konsensmechanismen](/developers/docs/consensus-mechanisms/) zu informieren.

## Was ist Proof-of-Authority (PoA)? {#what-is-poa}

Proof-of-Authority ist eine modifizierte Version von **[Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) (PoS)**, die einen rufbasierten Konsensalgorithmus anstelle des Stake-basierten Mechanismus in PoS darstellt. Der Begriff wurde erstmals im 2017 von Gavin Wood eingeführt, und dieser Konsensalgorithmus wurde hauptsächlich von privaten Ketten, Testnetzen und lokalen Entwicklungsnetzwerken verwendet, weil er im Gegensatz zu PoW den Bedarf an qualitativ hochwertigen Ressourcen und die Skalierbarkeitsprobleme von PoS überwindet, da er eine kleine Teilmenge von Knoten hat, die die Blockchain speichern und Blöcke produzieren.

Proof-of-Authority erfordert das Vertrauen in eine Gruppe autorisierter Unterzeichner, die im [Genesis-Block](/glossary/#genesis-block) festgelegt sind. In den meisten aktuellen Implementierungen behalten alle autorisierten Unterzeichner die gleiche Befugnis und die gleichen Privilegien bei der Bestimmung des Konsenses der Kette. Die Idee hinter dem Ruf-Staking ist, dass jeder autorisierte Validator beispielsweise durch Know Your Customer (KYC) oder durch die Zugehörigkeit zu einer renommierten Organisation jedem als einziger Validator bekannt ist — auf diese Weise ist die Identität des Validators bekannt, falls er etwas Unrechtes tut.

Es gibt mehrere Implementierungen von PoA, aber die Standardimplementierung von Ethereum ist **Clique**, die [EIP-225](https://eips.ethereum.org/EIPS/eip-225) implementiert. Clique ist entwicklerfreundlich und ein einfach zu implementierender Standard, der alle Client-Synchronisierungstypen unterstützt. Andere Implementierungen umfassen [IBFT 2.0](https://besu.hyperledger.org/stable/private-networks/concepts/poa) und [Aura](https://openethereum.github.io/Chain-specification).

## Funktionsweise {#how-it-works}

Bei PoA wird eine Gruppe von autorisierten Unterzeichnern ausgewählt, um neue Blöcke zu erstellen. Die Unterzeichner werden auf der Grundlage ihres Rufs ausgewählt und sind die einzigen, die neue Blöcke erstellen dürfen. Die Unterzeichner werden nach dem Rotationsprinzip ausgewählt, und jeder Unterzeichner darf innerhalb eines bestimmten Zeitrahmens einen Block erstellen. Der Zeitpunkt der Blockerstellung ist festgelegt und die Unterzeichner müssen innerhalb dieses Zeitrahmens einen Block erstellen.

In diesem Zusammenhang ist der Ruf kein quantifizierter Wert, sondern es handelt sich eher um den Ruf bekannter Unternehmen wie Microsoft und Google. Die Auswahl der vertrauenswürdigen Unterzeichner erfolgt daher nicht algorithmisch, sondern ist eine übliche menschliche _Vertrauenshandlung_. Dabei richtet beispielsweise eine Instanz wie Microsoft ein privates PoA-Netzwerk zwischen Hunderten oder Tausenden von Startups ein und fungiert als einziger vertrauenswürdiger Unterzeichner mit der Möglichkeit, in Zukunft weitere bekannte Unterzeichner wie Google hinzuzufügen. Die Startups würden zweifellos darauf vertrauen, dass Microsoft stets ehrlich handelt, und das Netzwerk nutzen. Dadurch entfällt die Notwendigkeit, in verschiedenen kleinen/privaten Netzwerken zu staken, die aus unterschiedlichen Gründen aufgebaut wurden, um sie dezentralisiert und funktionsfähig zu halten, und es fällt gleichzeitig der Bedarf an Minern weg, die viel Energie und Ressourcen verbrauchen. Einige private Netzwerke verwenden den PoA-Standard direkt, wie zum Beispiel VeChain, während andere ihn modifizieren, wie Binance, das [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) nutzt — eine benutzerdefinierte, modifizierte Version von PoA und PoS.

Die Abstimmung wird von den Unterzeichnern selbst durchgeführt. Jeder Unterzeichner stimmt beim Erstellen eines neuen Blocks über die Aufnahme oder Entfernung eines Unterzeichners in seinen Block ab. Die Abstimmungen werden von den Knoten zusammengezählt, und die Unterzeichner werden hinzugefügt oder entfernt, wenn die Stimmen einen bestimmten „SIGNER_LIMIT“-Schwellenwert erreichen.

Es kann vorkommen, dass kleine Abzweigungen entstehen. Die Schwierigkeit eines Blocks hängt davon ab, ob der Block der Reihe nach oder außerhalb der Reihe unterzeichnet wurde. „In der Reihe“-Blöcke haben den Schwierigkeitsgrad 2 und „Außerhalb der Reihe“-Blöcke haben den Schwierigkeitsgrad 1. Bei kleinen Abzweigungen sammelt die Kette, bei der die meisten Unterzeichner die Blöcke „der Reihe nach“ versiegelt haben, die meiste Schwierigkeit an und gewinnt.

## Angriffsvektoren {#attack-vectors}

### Böswillige Unterzeichner {#malicious-signers}

Ein böswilliger Benutzer könnte der Liste der Unterzeichner hinzugefügt werden, oder ein(e) Unterzeichnungsschlüssel/-maschine könnte kompromittiert werden. In einem solchen Szenario muss das Protokoll in der Lage sein, sich gegen Umstrukturierungen und Spamming zu wehren. Die vorgeschlagene Lösung besteht darin, dass bei einer Liste von N autorisierten Unterzeichnern jeder Unterzeichner nur 1 Block aus jedem K prägen darf. Dadurch wird sichergestellt, dass der Schaden begrenzt wird und die übrigen Validatoren den böswilligen Benutzer ausschließen können.

### Zensur {#censorship-attack}

Ein weiterer interessanter Angriffsvektor ist, wenn ein Unterzeichner (oder eine Gruppe von Unterzeichnern) versucht, Blöcke zu zensieren, die über ihre Streichung aus der Autorisierungsliste abstimmen. Um das zu umgehen, wird die zulässige Prägungsfrequenz für Unterzeichner auf 1 aus N/2 beschränkt. Dadurch wird gewährleistet, dass böswillige Unterzeichner mindestens 51 % der unterzeichnenden Konten kontrollieren müssen, um effektiv zur neuen Quelle der Wahrheit für die Kette zu werden.

### Spam {#spam-attack}

Ein weiterer kleiner Angriffsvektor sind böswillige Unterzeichner, die neue Abstimmungsvorschläge in jeden von ihnen geprägten Block einfügen. Da die Knoten alle Abstimmungen zusammenzählen müssen, um die tatsächliche Liste der autorisierten Unterzeichner zu erstellen, müssen sie alle Abstimmungen im Laufe der Zeit aufzeichnen. Eine fehlende Begrenzung des Zeitfensters für die Abstimmung könnte zu einem langsamen und dennoch unkontrollierten Wachstum führen. Die Lösung besteht darin, ein _bewegliches_ Fenster aus W Blöcken zu setzen, nach dem die Abstimmungen als veraltet gelten. _Ein angemessenes Zeitfenster könnten 1–2 Epochen sein._

### Gleichzeitige Blöcke {#concurrent-blocks}

Wenn es in einem PoA-Netzwerk N autorisierte Unterzeichner gibt, darf jeder Unterzeichner 1 Block aus K prägen, was bedeutet, dass N-K+1-Validatoren zu jedem beliebigen Zeitpunkt prägen dürfen. Um zu verhindern, dass diese Validatoren um Blöcke wetteifern, sollte jeder Unterzeichner einen kleinen zufälligen „Offset“ zu dem Zeitpunkt hinzufügen, zu dem ein neuer Block freigegeben wird. Obwohl dieser Prozess sicherstellt, dass kleine Abzweigungen selten sind, kann es dennoch gelegentlich zu Abzweigungen kommen, genau wie im Mainnet. Wenn festgestellt wird, dass ein Unterzeichner seine Befugnisse missbraucht und Chaos verursacht, können die anderen Unterzeichner ihn abwählen.

Wenn es beispielsweise 10 autorisierte Unterzeichner gibt und jeder Unterzeichner 1 von 20 Blöcken erstellen darf, können zu jedem beliebigen Zeitpunkt 11 Validatoren Blöcke erstellen. Um zu verhindern, dass sie bei der Erstellung von Blöcken wetteifern, fügt jeder Unterzeichner einen kleinen zufälligen „Offset“ zu der Zeit hinzu, zu der er einen neuen Block freigibt. Das reduziert das Auftreten von kleinen Abzweigungen, ermöglicht aber immer noch gelegentliche Abzweigungen, wie wir es aus dem Ethereum-Mainnet kennen. Wenn ein Unterzeichner seine Autorität missbraucht und Störungen verursacht, kann er aus dem Netzwerk gestimmt werden.

## Pro und Kontra {#pros-and-cons}

| Vorteile                                                                                                                                                                                                          | Nachteile                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Skalierbarer als andere beliebte Mechanismen wie PoS und PoW, da es auf einer begrenzten Anzahl von Blockunterzeichnern basiert                                                                                   | PoA-Netzwerke haben typischerweise eine relativ kleine Anzahl an Validierungsknoten. Dadurch wird ein PoA-Netzwerk stärker zentralisiert.                                                                 |
| PoA-Blockchains sind unglaublich günstig bei Betrieb und Wartung                                                                                                                                                  | Ein autorisierter Unterzeichner zu werden, ist für eine gewöhnliche Person in der Regel unerreichbar, da die Blockchain Entitäten mit einem etablierten Ruf erfordert.                                                    |
| Die Transaktionen werden sehr schnell bestätigt, da weniger als 1 Sekunde erreicht werden kann, weil nur eine begrenzte Anzahl von Unterzeichnern erforderlich ist, um neue Blöcke zu validieren. | Böswillige Unterzeichner könnten Reorganisationen durchführen, doppelte Ausgaben tätigen oder Transaktionen im Netzwerk zensieren. Diese Angriffe werden zwar abgeschwächt, sind aber immer noch möglich. |

## Weiterführende Lektüre {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique-Standard_
- [Studie zu Proof of Authority](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Kryptoökonomie_
- [Was ist Proof of Authority](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Erläuterung von Proof of Authority](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA in der Blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Erläuterung von Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Veralteter PoA, Aura-Spezifikation](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, eine weitere PoA-Implementierung](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### Eher der visuelle Lernende? {#visual-learner}

Sehen Sie sich eine visuelle Erläuterung des Proof-of-Authority an:

<YouTube id="Mj10HSEM5_8" />

## Verwandte Themen {#related-topics}

- [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/)
