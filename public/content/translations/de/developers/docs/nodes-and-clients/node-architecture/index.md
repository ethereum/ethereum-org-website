---
title: Knotenarchitektur
description: Einleitung zum Aufbau von Ethereum-Knoten.
lang: de
---

Ein Ethereum-Knoten besteht aus zwei Clients: einem [Ausführungs-Client](/developers/docs/nodes-and-clients/#execution-clients) und einem [Konsens-Client](/developers/docs/nodes-and-clients/#consensus-clients). Damit ein Knoten einen neuen Block vorschlagen kann, muss er auch einen [Validator-Client](#validators) betreiben.

Als Ethereum noch [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) verwendete, reichte ein Ausführungs-Client aus, um einen vollständigen Ethereum-Knoten zu betreiben. Seit der Implementierung von [Proof-of-Stake](/developers/docs/consensus-mechanisms/pow/) muss der Ausführungs-Client jedoch zusammen mit einer anderen Software, einem sogenannten [Konsens-Client](/developers/docs/nodes-and-clients/#consensus-clients), verwendet werden.

Das folgende Diagramm zeigt die Verbindung zwischen zwei Ethereum-Clients. Die beiden Clients verbinden sich mit ihren eigenen Peer-to-Peer(P2P)-Netzwerken. Es werden separate P2P-Netzwerke benötigt, da der Ausführungsclient Transaktionen über ihr P2P Netzwerk kommuniziert, wodurch sie ihren lokalen Transaktionspool verwalten können. Konsensclients können dabei Blöcke über ihr eigenes P2P-Netzwerk kommunizieren, was Konsens und Wachstum der Blockchain ermöglicht.

![](node-architecture-text-background.png)

_Für den Execution Client stehen verschiedene Optionen zur Wahl, einschließlich Erigon, Nethermind und Besu_.

Für die Funktionsfähigkeit dieser Zwei-Client-Architektur müssen Consensus Clients Transaktionsbündel an den Execution Client übermitteln. Der Execution Client führt Transaktionen lokal aus, um sicherzustellen, dass sie nicht gegen Ethereum-Regeln verstoßen und das vorgeschlagene Update des Zustands korrekt ist. Sobald eine Node zum Block Producer gewählt wird, fragt der Consensus Client beim Execution Client Transaktionsbündel an. Diese werden in den neuen Block integriert und ausgeführt, um den Global State zu aktualisieren. Der Konsens-Client steuert den Ausführungs-Client über eine lokale RPC-Verbindung unter Verwendung der [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Was macht der Ausführungsclient? {#execution-client}

Der Ausführungs-Client ist für die Validierung, die Abwicklung und das Gossip von Transaktionen sowie für die Zustandsverwaltung und die Unterstützung der Ethereum Virtual Machine ([EVM](/developers/docs/evm/)) verantwortlich. Er ist **nicht** für das Block-Building, das Block-Gossiping oder die Handhabung der Konsens-Logik verantwortlich. Dies sind die Aufgaben des Konsensclients.

Der Ausführungsclient erstellt Ausführungsnutzlasten – die Liste der Transaktionen, die aktualisierten Zustandsbäume, und andere ausführungsbezogene Daten. Konsensclients beinhalten die Ausführungsnutzlast in jedem Block. Der Ausführungsclient ist außerdem zuständig für das Wiederausführen von Transaktionen in einem neuen Block, um sicherzugehen, dass diese gültig sind. Die Ausführung von Transaktionen erfolgt auf dem eingebetteten Computer des Ausführungs-Clients, der als [Ethereum Virtual Machine (EVM)](/developers/docs/evm) bekannt ist.

Der Ausführungs-Client bietet auch eine Benutzeroberfläche für Ethereum über [RPC-Methoden](/developers/docs/apis/json-rpc), die es Benutzern ermöglichen, die Ethereum-Blockchain abzufragen, Transaktionen zu übermitteln und Smart Contracts bereitzustellen. Üblicherweise werden RPC-Aufrufe von einer Bibliothek wie [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/) oder von einer Benutzeroberfläche wie einer Browser-Wallet verarbeitet.

Zusammengefasst ist der Ausführungsclient:

- Ein Nutzergateway zu Ethereum
- Das Zuhause der Virtuellen Ethereum-Maschine, des Zustands von Ethereums und des Transaktionspools.

## Was macht der Konsensclient? {#consensus-client}

Der Konsensclient befasst sich mit der gesamten Logik, die ein Knoten braucht, um mit dem Ethereum-Netzwerk synchronisiert zu bleiben. Das beinhaltet das Empfangen von Blöcken von Peers und das Betreiben eines Abspaltungsalgorithmus, um sicherzugehen, dass der Knoten immer der Blockchain mit den meisten Attestierungen (gewichtet nach effektiven Guthaben von Validatoren) folgt. Ähnlich zum Ausführungsclient haben Konsensclients ihr eigenes P2P-Netzwerk, über das sie Blöcke und Attestierungen teilen können.

Der Konsensclient nimmt nicht an Attestierungen oder dem Vorschlagen von Blöcken teil. Das wird von einem Validator übernommen, eine optionale Erweiterung zu einem Konsensclient. Ein Konsensclient ohne Validator hält nur mit der Spitze der Blockchain mit, was dem Knoten ermöglicht, synchronisiert zu bleiben. Das ermöglicht dem Nutzer, Dinge mit Ethereum über ihren Ausführungsclient abzuwickeln, mit der Sicherheit, dass diese sich auf der richtigen Blockchain befinden.

## Validatoren {#validators}

Staking und der Betrieb der Validator-Software machen eine Node berechtigt, als Block-Proposer ausgewählt zu werden. Knotenbetreiber können Validatoren zu ihren Konsensclients hinzufügen, indem sie 32 ETH in den Einzahlungsvertrag einzahlen. Der Validatorclient kommt gebündelt mit dem Konsensclient und kann zu jeder Zeit einem Knoten hinzugefügt werden. Der Validator bearbeitet Attestierungen und Blockvorschläge. Außerdem versetzt es eine Node in die Lage, Belohnungen zu erzielen, aber auch ETH durch Strafen oder Slashing einzubüßen.

[Mehr zum Staking](/staking/).

## Vergleich der Knotenkomponenten {#node-comparison}

| Ausführungsclient                                              | Konsensclient                                                                                                                                                                      | Validator                                                 |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Verbreitet Transaktionen mittels Gossip über sein P2P-Netzwerk | Verbreitet Blöcke und Attestations über das eigene P2P-Netzwerk                                                                                                                    | Schlägt Blöcke vor                                        |
| Führt Transaktionen (erneut) aus            | Betreibt den Abspaltungsalgorithmus                                                                                                                                                | Sammelt Prämien/Strafen                                   |
| Verifiziert eingehende Zustandsänderungen                      | Verfolgt die Spitze der Blockchain                                                                                                                                                 | Stellt Attestierungen aus                                 |
| Verwaltet Zustands- und Belegsbäume                            | Verwaltet den Beacon-Zustand (beinhaltet Konsens- und Ausführungsinformationen)                                                                                 | Benötigt 32 ETH, um gestaked zu werden                    |
| Erzeugt Ausführungsnutzlast                                    | Überwacht den angesammelten Zufall in RANDAO (ein Algorithmus, der verifizierbaren Zufall für die Auswahl von Validatoren und weitere Konsens-Vorgänge liefert) | Kann „abgeschlagen“ (geslashed) werden |
| Deckt JSON-RPC API auf, um mit Ethereum zu interagieren        | Behält den Überblick über Begründung und Finalisierung                                                                                                                             |                                                           |

## Weiterführende Lektüre {#further-reading}

- [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos)
- [Block-Vorschlag](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Belohnungen und Strafen für Validatoren](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
