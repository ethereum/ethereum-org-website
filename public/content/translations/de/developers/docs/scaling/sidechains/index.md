---
title: Seitenketten
description: "Eine Einführung in Sidechains als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird."
lang: de
sidebarDepth: 3
---

Eine Sidechain ist eine separate Blockchain, die unabhängig von Ethereum läuft und durch eine Zwei-Wege-Brücke mit Ethereum Mainnet verbunden ist. Sidechains können separate Blockparameter und [Konsensalgorithmen](/developers/docs/consensus-mechanisms/) haben, die oft für die effiziente Verarbeitung von Transaktionen ausgelegt sind. Die Nutzung einer Sidechain bringt jedoch Kompromisse mit sich, da sie nicht die Sicherheitseigenschaften von Ethereum erben. Anders als [Layer-2-Skalierungslösungen](/layer-2/) übertragen Sidechains keine Zustandsänderungen und Transaktionsdaten zurück an das Ethereum-Mainnet.

Sidechains opfern auch ein gewisses Maß an Dezentralisierung oder Sicherheit, um einen hohen Durchsatz zu erreichen ([Skalierbarkeitstrilemma](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum setzt sich jedoch für eine Skalierung ein, ohne Kompromisse bei Dezentralisierung und Sicherheit einzugehen.

## Wie funktionieren Sidechains? {#how-do-sidechains-work}

Sidechains sind unabhängige Blockchains mit unterschiedlichen Historien, Entwicklungs-Roadmaps und Designüberlegungen. Während eine Sidechain oberflächliche Ähnlichkeiten mit Ethereum aufweisen kann, hat sie mehrere besondere Merkmale.

### Konsensalgorithmen {#consensus-algorithms}

Eines der Merkmale, die Sidechains einzigartig machen (d. h. anders als Ethereum), ist der verwendete Konsensalgorithmus. Sidechains verlassen sich nicht auf Ethereum für den Konsens und können alternative Konsensprotokolle wählen, die ihren Bedürfnissen entsprechen. Einige Beispiele für Konsensalgorithmen, die auf Sidechains verwendet werden, sind:

- [Proof-of-Authority](/developers/docs/consensus-mechanisms/poa/)
- [Delegierter Proof-of-Stake](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Byzantinische Fehlertoleranz](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Wie Ethereum haben auch Sidechains validierende Nodes, die Transaktionen verifizieren und verarbeiten, Blöcke produzieren und den Blockchain-Zustand speichern. Validatoren sind auch dafür verantwortlich, den Konsens im Netzwerk aufrechtzuerhalten und es vor böswilligen Angriffen zu schützen.

#### Block-Parameter {#block-parameters}

Ethereum setzt Grenzen für [Blockzeiten](/developers/docs/blocks/#block-time) (d. h. die Zeit, die für die Erzeugung neuer Blöcke benötigt wird) und [Blockgrößen](/developers/docs/blocks/#block-size) (d. h. die in einem Block enthaltene Datenmenge, die in Gas angegeben wird). Umgekehrt verwenden Sidechains oft andere Parameter, wie z. B. schnellere Blockzeiten und höhere Gaslimits, um einen hohen Durchsatz, schnelle Transaktionen und niedrige Gebühren zu erreichen.

Während dies einige Vorteile hat, hat es kritische Auswirkungen auf die Netzwerkdezentralisierung und Sicherheit. Blockparameter, wie schnelle Blockzeiten und große Blockgrößen, erhöhen die Schwierigkeit, einen vollständigen Node zu betreiben – wodurch einige wenige "Supernodes" für die Sicherung der Chain verantwortlich sind. In einem solchen Szenario steigt die Möglichkeit von Validator-Absprachen oder einer böswilligen Übernahme der Chain.

Damit Blockchains skalieren können, ohne die Dezentralisierung zu beeinträchtigen, muss der Betrieb eines Nodes für jeden offen sein – nicht unbedingt für Parteien mit spezialisierter Hardware. Deshalb wird daran gearbeitet, sicherzustellen, dass jeder im Ethereum-Netzwerk [einen Full-Node betreiben](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) kann.

### EVM-Kompatibilität {#evm-compatibility}

Einige Sidechains sind EVM-kompatibel und können Verträge ausführen, die für die [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) entwickelt wurden. EVM-kompatible Sidechains unterstützen Smart Contracts, [die in Solidity geschrieben wurden](/developers/docs/smart-contracts/languages/), sowie andere EVM-Smart-Contract-Sprachen. Das bedeutet, dass für das Ethereum-Mainnet geschriebene Smart Contracts auch auf EVM-kompatiblen Sidechains funktionieren.

Das bedeutet, wenn Sie Ihre [Dapp](/developers/docs/dapps/) auf einer Sidechain verwenden möchten, müssen Sie lediglich Ihren [Smart Contract](/developers/docs/smart-contracts/) auf dieser Sidechain bereitstellen. Es sieht aus, fühlt sich an und verhält sich genau wie Mainnet – Sie schreiben Verträge in Solidity und interagieren mit der Chain über die Sidechain-RPC.

Da Sidechains EVM-kompatibel sind, gelten sie als nützliche [Skalierungslösung](/developers/docs/scaling/) für Ethereum-native Dapps. Mit Ihrer Dapp auf einer Sidechain können Nutzer niedrigere Gasgebühren und schnellere Transaktionen genießen, besonders wenn Mainnet überlastet ist.

Jedoch bringt die Verwendung einer Sidechain, wie bereits erläutert, erhebliche Nachteile mit sich. Jede Sidechain ist für ihre eigene Sicherheit verantwortlich und erbt nicht die Sicherheitseigenschaften von Ethereum. Dies erhöht die Möglichkeit bösartigen Verhaltens, was Ihre Nutzer beeinträchtigen oder ihre Gelder gefährden kann.

### Asset-Bewegung {#asset-movement}

Damit eine separate Blockchain zu einer Sidechain des Ethereum Mainnets werden kann, braucht sie die Fähigkeit, den Transfer von Vermögenswerten vom und zum Ethereum Mainnet zu ermöglichen. Diese Interoperabilität mit Ethereum wird durch eine Blockchain-Brücke erreicht. [Kettenübergreifende Brücken](/bridges/) verwenden Smart Contracts, die auf dem Ethereum-Mainnet und einer Sidechain bereitgestellt werden, um das Bridging von Geldern zwischen ihnen zu steuern.

Während Brücken Nutzern helfen, Gelder zwischen Ethereum und der Sidechain zu bewegen, werden die Vermögenswerte nicht physisch über die beiden Ketten bewegt. Stattdessen werden Mechanismen, die typischerweise Minting und Burning beinhalten, für die Wertübertragung zwischen Ketten verwendet. Mehr darüber, [wie kettenübergreifende Brücken funktionieren](/developers/docs/bridges/#how-do-bridges-work).

## Vor- und Nachteile von Sidechains {#pros-and-cons-of-sidechains}

| Pro                                                                                                                                                            | Nachteile                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Die Technologie, die Sidechains untermauert, ist bewährt und profitiert von umfangreicher Forschung und Designverbesserungen.                  | Sidechains tauschen ein gewisses Maß an Dezentralisierung und Vertrauenslosigkeit gegen Skalierbarkeit ein.                                                                     |
| Sidechains unterstützen allgemeine Berechnungen und bieten EVM-Kompatibilität (sie können Ethereum-eigene DApps ausführen). | Eine Sidechain nutzt einen separaten Konsensmechanismus und profitiert nicht von Ethereums Sicherheitsgarantien.                                                                |
| Sidechains verwenden verschiedene Konsensmodelle, um Transaktionen effizient zu verarbeiten und Transaktionsgebühren für Nutzer zu senken.     | idechains erfordern höhere Vertrauensvoraussetzungen (z.B. kann ein Quorum bösartiger Sidechain-Validatoren Betrug begehen). |
| EVM-kompatible Sidechains ermöglichen es DApps, ihr Ökosystem zu erweitern.                                                                    |                                                                                                                                                                                                 |

### Sidechains verwenden {#use-sidechains}

Mehrere Projekte bieten Implementierungen von Sidechains, die Sie in Ihre dApps integrieren können:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (ehemals xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Weiterführende Lektüre {#further-reading}

- [Skalierung von Ethereum-Dapps durch Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8. Feb. 2018 – Georgios Konstantopoulos_

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
