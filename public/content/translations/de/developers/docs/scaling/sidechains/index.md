---
title: Sidechains
description: "Eine Einführung in Sidechains als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird."
lang: de
sidebarDepth: 3
---

Eine Sidechain ist eine separate Blockchain, die unabhängig von [Ethereum](/) läuft und über eine kettenübergreifende Zwei-Wege-Brücke mit dem Ethereum-Mainnet verbunden ist. Sidechains können separate Blockparameter und [Konsensalgorithmen](/developers/docs/consensus-mechanisms/) haben, die oft für die effiziente Verarbeitung von Transaktionen ausgelegt sind. Die Nutzung einer Sidechain ist jedoch mit Kompromissen verbunden, da sie nicht die Sicherheitseigenschaften von Ethereum erben. Im Gegensatz zu [Skalierungslösungen der Ebene 2](/layer-2/) senden Sidechains keine Zustandsänderungen und Transaktionsdaten an das Ethereum-Mainnet zurück.

Sidechains opfern zudem ein gewisses Maß an Dezentralisierung oder Sicherheit, um einen hohen Durchsatz zu erreichen ([Skalierbarkeits-Trilemma](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum hat sich jedoch der Skalierung verschrieben, ohne Kompromisse bei Dezentralisierung und Sicherheit einzugehen.

## Wie funktionieren Sidechains? {#how-do-sidechains-work}

Sidechains sind unabhängige Blockchains mit unterschiedlichen Historien, Entwicklungs-Roadmaps und Designüberlegungen. Während eine Sidechain oberflächliche Ähnlichkeiten mit Ethereum aufweisen kann, hat sie mehrere charakteristische Merkmale.

### Konsensalgorithmen {#consensus-algorithms}

Eine der Eigenschaften, die Sidechains einzigartig machen (d. h. anders als Ethereum), ist der verwendete Konsensalgorithmus. Sidechains sind für den Konsens nicht auf Ethereum angewiesen und können alternative Konsensprotokolle wählen, die ihren Anforderungen entsprechen. Einige Beispiele für Konsensalgorithmen, die auf Sidechains verwendet werden, sind:

- [Proof-of-Authority](/developers/docs/consensus-mechanisms/poa/)
- [Delegated Proof-of-Stake](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Byzantinische Fehlertoleranz](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Wie Ethereum verfügen Sidechains über validierende Blockchain-Knoten, die Transaktionen verifizieren und verarbeiten, Blöcke produzieren und den Blockchain-Zustand speichern. Validatoren sind auch dafür verantwortlich, den Konsens im gesamten Netzwerk aufrechtzuerhalten und es gegen böswillige Angriffe abzusichern.

#### Blockparameter {#block-parameters}

Ethereum setzt Grenzen für [Blockzeiten](/developers/docs/blocks/#block-time) (d. h. die Zeit, die benötigt wird, um neue Blöcke zu produzieren) und [Blockgrößen](/developers/docs/blocks/#block-size) (d. h. die in Gas angegebene Datenmenge pro Block). Im Gegensatz dazu verwenden Sidechains oft andere Parameter, wie schnellere Blockzeiten und höhere Gaslimits, um einen hohen Durchsatz, schnelle Transaktionen und niedrige Gebühren zu erreichen.

Obwohl dies einige Vorteile hat, bringt es kritische Auswirkungen auf die Dezentralisierung und Sicherheit des Netzwerks mit sich. Blockparameter wie schnelle Blockzeiten und große Blockgrößen erhöhen die Schwierigkeit, einen vollständigen Blockchain-Knoten zu betreiben – wodurch nur wenige „Superknoten“ für die Sicherung der Chain verantwortlich bleiben. In einem solchen Szenario steigt die Wahrscheinlichkeit von Absprachen zwischen Validatoren oder einer böswilligen Übernahme der Chain.

Damit Blockchains skalieren können, ohne die Dezentralisierung zu beeinträchtigen, muss der Betrieb eines Blockchain-Knotens für jeden offen sein – nicht nur für Parteien mit spezialisierter Hardware. Aus diesem Grund laufen Bemühungen, um sicherzustellen, dass jeder einen [vollständigen Blockchain-Knoten](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) im Ethereum-Netzwerk betreiben kann.

### EVM-Kompatibilität {#evm-compatibility}

Einige Sidechains sind EVM-kompatibel und können Verträge ausführen, die für die [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) entwickelt wurden. EVM-kompatible Sidechains unterstützen Smart Contracts, die [in Solidity geschrieben](/developers/docs/smart-contracts/languages/) wurden, sowie andere EVM-Smart-Contract-Sprachen. Das bedeutet, dass Smart Contracts, die für das Ethereum-Mainnet geschrieben wurden, auch auf EVM-kompatiblen Sidechains funktionieren.

Das bedeutet, wenn Sie Ihre [Dapp](/developers/docs/dapps/) auf einer Sidechain nutzen möchten, müssen Sie lediglich Ihren [Smart Contract](/developers/docs/smart-contracts/) auf dieser Sidechain bereitstellen. Es sieht aus, fühlt sich an und verhält sich genau wie das Mainnet – Sie schreiben Verträge in Solidity und interagieren mit der Chain über den RPC der Sidechain.

Da Sidechains EVM-kompatibel sind, gelten sie als nützliche [Skalierungslösung](/developers/docs/scaling/) für Ethereum-native Dapps. Mit Ihrer Dapp auf einer Sidechain können Benutzer von niedrigeren Gasgebühren und schnelleren Transaktionen profitieren, insbesondere wenn das Mainnet überlastet ist.

Wie bereits erklärt, ist die Nutzung einer Sidechain jedoch mit erheblichen Kompromissen verbunden. Jede Sidechain ist für ihre eigene Sicherheit verantwortlich und erbt nicht die Sicherheitseigenschaften von Ethereum. Dies erhöht die Wahrscheinlichkeit von böswilligem Verhalten, das Ihre Benutzer beeinträchtigen oder deren Gelder gefährden kann.

### Bewegung von Vermögenswerten {#asset-movement}

Damit eine separate Blockchain zu einer Sidechain des Ethereum-Mainnets werden kann, muss sie in der Lage sein, den Transfer von Vermögenswerten vom und zum Ethereum-Mainnet zu erleichtern. Diese Interoperabilität mit Ethereum wird durch eine kettenübergreifende Brücke erreicht. [Kettenübergreifende Brücken](/bridges/) verwenden Smart Contracts, die auf dem Ethereum-Mainnet und einer Sidechain bereitgestellt werden, um die Überbrückung von Geldern zwischen ihnen zu steuern.

Während kettenübergreifende Brücken Benutzern helfen, Gelder zwischen Ethereum und der Sidechain zu bewegen, werden die Vermögenswerte nicht physisch über die beiden Chains hinweg verschoben. Stattdessen werden Mechanismen, die typischerweise das Prägen und Verbrennen umfassen, für den Werttransfer über Chains hinweg verwendet. Mehr darüber, [wie kettenübergreifende Brücken funktionieren](/developers/docs/bridges/#how-do-bridges-work).

## Vor- und Nachteile von Sidechains {#pros-and-cons-of-sidechains}

| Vorteile                                                                                                                    | Nachteile                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Die Technologie, die Sidechains zugrunde liegt, ist gut etabliert und profitiert von umfangreicher Forschung und Designverbesserungen. | Sidechains opfern ein gewisses Maß an Dezentralisierung und Vertrauenslosigkeit für Skalierbarkeit.                          |
| Sidechains unterstützen allgemeine Berechnungen und bieten EVM-Kompatibilität (sie können Ethereum-native Dapps ausführen).                    | Eine Sidechain verwendet einen separaten Konsensmechanismus und profitiert nicht von den Sicherheitsgarantien von Ethereum.         |
| Sidechains verwenden unterschiedliche Konsensmodelle, um Transaktionen effizient zu verarbeiten und die Transaktionsgebühren für Benutzer zu senken.         | Sidechains erfordern höhere Vertrauensannahmen (z. B. kann ein Quorum böswilliger Sidechain-Validatoren Betrug begehen). |
| EVM-kompatible Sidechains ermöglichen es Dapps, ihr Ökosystem zu erweitern.                                                            |                                                                                                                  |

### Sidechains nutzen {#use-sidechains}

Mehrere Projekte bieten Implementierungen von Sidechains an, die Sie in Ihre Dapps integrieren können:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (ehemals xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Weiterführende Literatur {#further-reading}

- [Scaling Ethereum dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8. Feb. 2018 – Georgios Konstantopoulos_

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_