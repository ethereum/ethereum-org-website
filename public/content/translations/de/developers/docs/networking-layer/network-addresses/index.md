---
title: Netzwerkadressen
description: "Eine Einführung in Netzwerkadressen."
lang: de
sidebarDepth: 2
---

[Ethereum](/) Blockchain-Knoten müssen sich mit einigen grundlegenden Informationen identifizieren, um sich mit Peers zu verbinden. Um sicherzustellen, dass jeder potenzielle Peer diese Informationen interpretieren kann, werden sie in einem von drei standardisierten Formaten weitergeleitet, die jeder Ethereum-Blockchain-Knoten verstehen kann: Multiaddr, Enode oder Ethereum Node Records (ENRs). ENRs sind der aktuelle Standard für Ethereum-Netzwerkadressen.

## Voraussetzungen {#prerequisites}

Ein gewisses Verständnis der [Netzwerkschicht](/developers/docs/networking-layer/) von Ethereum ist erforderlich, um diese Seite zu verstehen.

## Multiaddr {#multiaddr}

Das ursprüngliche Adressformat für Ethereum-Blockchain-Knoten war die „Multiaddr“ (kurz für „Multi-Addresses“). Multiaddr ist ein universelles Format, das für Peer-to-Peer-Netzwerke entwickelt wurde. Adressen werden als Schlüssel-Wert-Paare dargestellt, wobei Schlüssel und Werte durch einen Schrägstrich getrennt sind. Zum Beispiel sieht die Multiaddr für einen Blockchain-Knoten mit der IPv4-Adresse `192.168.22.27`, der auf dem TCP-Port `33000` lauscht, wie folgt aus:

`/ip4/192.168.22.27/tcp/33000`

Für einen Ethereum-Blockchain-Knoten enthält die Multiaddr die Knoten-ID (einen Hash ihres Public-Keys):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Ein Enode ist eine Möglichkeit, einen Ethereum-Blockchain-Knoten mithilfe eines URL-Adressformats zu identifizieren. Die hexadezimale Knoten-ID wird im Benutzernamenteil der URL codiert und durch ein @-Zeichen vom Host getrennt. Der Hostname kann nur als IP-Adresse angegeben werden; DNS-Namen sind nicht zulässig. Der Port im Hostnamen-Abschnitt ist der TCP-Listening-Port. Wenn sich die TCP- und UDP-Ports (Discovery) unterscheiden, wird der UDP-Port als Abfrageparameter „discport“ angegeben.

Im folgenden Beispiel beschreibt die Knoten-URL einen Blockchain-Knoten mit der IP-Adresse `10.3.58.6`, dem TCP-Port `30303` und dem UDP-Discovery-Port `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum Node Records (ENRs) {#enr}

Ethereum Node Records (ENRs) sind ein standardisiertes Format für Netzwerkadressen auf Ethereum. Sie ersetzen Multiaddrs und Enodes. Diese sind besonders nützlich, da sie einen größeren Informationsaustausch zwischen Blockchain-Knoten ermöglichen. Der ENR enthält eine Signatur, eine Sequenznummer und Felder, die das Identitätsschema detailliert beschreiben, das zum Generieren und Validieren von Signaturen verwendet wird. Der ENR kann auch mit beliebigen Daten gefüllt werden, die als Schlüssel-Wert-Paare organisiert sind. Diese Schlüssel-Wert-Paare enthalten die IP-Adresse des Blockchain-Knotens und Informationen über die Subprotokolle, die der Blockchain-Knoten verwenden kann. Konsens-Clients verwenden eine [spezifische ENR-Struktur](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure), um Boot-Knoten zu identifizieren, und enthalten auch ein `eth2`-Feld mit Informationen über den aktuellen Ethereum-Fork und das Attestation-Gossip-Subnetz (dies verbindet den Blockchain-Knoten mit einer bestimmten Gruppe von Peers, deren Bestätigungen zusammengefasst werden).

## Weiterführende Literatur {#further-reading}

- [EIP-778: Ethereum Node Records (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)