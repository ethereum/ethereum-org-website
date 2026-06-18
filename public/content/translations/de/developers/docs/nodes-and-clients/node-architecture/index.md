---
title: Knotenarchitektur
description: Einführung in die Organisation von Ethereum-Knoten.
lang: de
---

Ein Ethereum-Knoten besteht aus zwei Clients: einem [Ausführungsclient](/developers/docs/nodes-and-clients/#execution-clients) und einem [Konsens-Client](/developers/docs/nodes-and-clients/#consensus-clients). Damit ein Knoten einen neuen Block vorschlagen kann, muss er auch einen [Validator-Client](#validators) ausführen.

Als Ethereum noch [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) verwendete, reichte ein Ausführungsclient aus, um einen vollständigen Ethereum-Knoten zu betreiben. Seit der Implementierung von [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) muss der Ausführungsclient jedoch zusammen mit einer weiteren Software, dem sogenannten [Konsens-Client](/developers/docs/nodes-and-clients/#consensus-clients), verwendet werden.

Das folgende Diagramm zeigt die Beziehung zwischen den beiden Ethereum-Clients. Die beiden Clients verbinden sich mit ihren jeweils eigenen Peer-to-Peer-Netzwerken (P2P). Separate P2P-Netzwerke sind erforderlich, da die Ausführungsclients Transaktionen über ihr P2P-Netzwerk verbreiten (gossip), was es ihnen ermöglicht, ihren lokalen Transaktionspool zu verwalten, während die Konsens-Clients Blöcke über ihr P2P-Netzwerk verbreiten, was den Konsens und das Wachstum der Chain ermöglicht.

![Diagram of Ethereum node architecture showing execution and consensus layers](node-architecture-text-background.png)

_Es gibt mehrere Optionen für den Ausführungsclient, darunter Erigon, Nethermind und Besu_.

Damit diese Zwei-Client-Struktur funktioniert, müssen Konsens-Clients Bündel von Transaktionen an den Ausführungsclient weitergeben. Der Ausführungsclient führt die Transaktionen lokal aus, um zu validieren, dass die Transaktionen keine Ethereum-Regeln verletzen und dass die vorgeschlagene Aktualisierung des Zustands von Ethereum korrekt ist. Wenn ein Knoten als Blockproduzent ausgewählt wird, fordert seine Konsens-Client-Instanz Transaktionsbündel vom Ausführungsclient an, um sie in den neuen Block aufzunehmen und auszuführen, um den globalen Zustand zu aktualisieren. Der Konsens-Client steuert den Ausführungsclient über eine lokale RPC-Verbindung unter Verwendung der [Engine-API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Was macht der Ausführungsclient? {#execution-client}

Der Ausführungsclient ist für die Validierung, Verarbeitung und Verbreitung von Transaktionen sowie für die Zustandsverwaltung und die Unterstützung der Ethereum Virtual Machine ([EVM](/developers/docs/evm/)) verantwortlich. Er ist **nicht** für die Blockbildung, die Verbreitung von Blöcken oder die Verarbeitung der Konsenslogik verantwortlich. Diese fallen in den Aufgabenbereich des Konsens-Clients.

Der Ausführungsclient erstellt Ausführungs-Payloads – die Liste der Transaktionen, den aktualisierten Zustands-Trie und andere ausführungsbezogene Daten. Konsens-Clients fügen die Ausführungs-Payload in jeden Block ein. Der Ausführungsclient ist auch dafür verantwortlich, Transaktionen in neuen Blöcken erneut auszuführen, um sicherzustellen, dass sie gültig sind. Die Ausführung von Transaktionen erfolgt auf dem eingebetteten Computer des Ausführungsclients, der als [Ethereum Virtual Machine (EVM)](/developers/docs/evm) bekannt ist.

Der Ausführungsclient bietet auch eine Benutzeroberfläche für Ethereum über [RPC-Methoden](/developers/docs/apis/json-rpc), die es Benutzern ermöglichen, die Ethereum-Blockchain abzufragen, Transaktionen einzureichen und Smart Contracts bereitzustellen. Es ist üblich, dass RPC-Aufrufe von einer Bibliothek wie [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/) oder von einer Benutzeroberfläche wie einer Browser-Wallet verarbeitet werden.

Zusammenfassend ist der Ausführungsclient:

- ein Benutzer-Gateway zu Ethereum
- das Zuhause der Ethereum Virtual Machine, des Zustands von Ethereum und des Transaktionspools.

## Was macht der Konsens-Client? {#consensus-client}

Der Konsens-Client befasst sich mit der gesamten Logik, die es einem Knoten ermöglicht, mit dem Ethereum-Netzwerk synchronisiert zu bleiben. Dies umfasst den Empfang von Blöcken von Peers und die Ausführung eines Fork-Choice-Algorithmus, um sicherzustellen, dass der Knoten immer der Chain mit der größten Ansammlung von Bestätigungen (Attestations, gewichtet nach den effektiven Guthaben der Validatoren) folgt. Ähnlich wie der Ausführungsclient haben Konsens-Clients ihr eigenes P2P-Netzwerk, über das sie Blöcke und Bestätigungen teilen.

Der Konsens-Client beteiligt sich nicht an der Bestätigung oder dem Vorschlagen von Blöcken – dies wird von einem Validator durchgeführt, einem optionalen Add-on für einen Konsens-Client. Ein Konsens-Client ohne Validator hält nur mit der Spitze (Head) der Chain Schritt, sodass der Knoten synchronisiert bleibt. Dies ermöglicht es einem Benutzer, mit seinem Ausführungsclient Transaktionen auf Ethereum durchzuführen, in der Gewissheit, dass er sich auf der richtigen Chain befindet.

## Validatoren {#validators}

Durch Staking und das Ausführen der Validator-Software wird ein Knoten berechtigt, für den Vorschlag eines neuen Blocks ausgewählt zu werden. Knotenbetreiber können ihren Konsens-Clients einen Validator hinzufügen, indem sie 32 ETH in den Einzahlungsvertrag einzahlen. Der Validator-Client wird mit dem Konsens-Client gebündelt geliefert und kann einem Knoten jederzeit hinzugefügt werden. Der Validator verarbeitet Bestätigungen und Blockvorschläge. Er ermöglicht es einem Knoten auch, Belohnungen anzusammeln oder ETH durch Strafen oder Slashing zu verlieren.

[Mehr zum Thema Staking](/staking/).

## Vergleich der Knotenkomponenten {#node-comparison}

| Ausführungsclient | Konsens-Client | Validator |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Verbreitet Transaktionen über sein P2P-Netzwerk | Verbreitet Blöcke und Bestätigungen über sein P2P-Netzwerk | Schlägt Blöcke vor |
| Führt Transaktionen aus/erneut aus | Führt den Fork-Choice-Algorithmus aus | Sammelt Belohnungen/Strafen an |
| Verifiziert eingehende Zustandsänderungen | Verfolgt die Spitze der Chain | Nimmt Bestätigungen vor |
| Verwaltet Zustands- und Quittungs-Tries | Verwaltet den Beacon-Zustand (enthält Konsens- und Ausführungsinformationen) | Erfordert das Staken von 32 ETH |
| Erstellt die Ausführungs-Payload | Verfolgt die angesammelte Zufälligkeit in RANDAO (ein Algorithmus, der überprüfbare Zufälligkeit für die Validator-Auswahl und andere Konsensoperationen bereitstellt) | Kann von Slashing betroffen sein |
| Stellt eine JSON-RPC-API zur Interaktion mit Ethereum bereit | Verfolgt die Rechtfertigung (Justification) und Finalisierung | |

## Weiterführende Literatur {#further-reading}

- [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos)
- [Blockvorschlag](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Belohnungen und Strafen für Validatoren](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)