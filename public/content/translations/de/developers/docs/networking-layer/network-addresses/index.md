---
title: Netzwerkadressen
description: Eine Einführung in Netzwerkadressen.
lang: de
sidebarDepth: 2
---

Ethereum-Knoten müssen sich mit einigen grundlegenden Informationen identifizieren, um eine Verbindung zu Peers herzustellen. Um sicherzustellen, dass jeder potenzielle Peer diese Informationen interpretieren kann, werden sie in einem von drei standardisierten Formaten weitergeleitet, die jeder Ethereum-Knoten verstehen kann: Multiaddr, Enode oder Ethereum Node Records (ENRs). ENRS sind der aktuelle Standard für Ethereum Netzwerkadressen

## Voraussetzungen {#prerequisites}

Zum Verständnis dieser Seite sind gewisse Kenntnisse der [Netzwerkschicht](/developers/docs/networking-layer/) von Ethereum erforderlich.

## Multiaddr {#multiaddr}

Das ursprüngliche Ethereum-Knotenadressformat war „Multiaddr“ (kurz für „Multi-Adressen“). Multiaddr ist ein universelles Format, das für Peer-to-Peer-Netzwerke entwickelt wurde. Adressen werden als Schlüssel Wert Paare dargestellt, wobei Schlüssel und Werte durch einen Schrägstrich getrennt sind. Beispielsweise sieht die Multiaddr für einen Knoten mit der IPv4-Adresse `192.168.22.27`, der auf dem TCP-Port `33000` lauscht, folgendermaßen aus:

/ip4/192.168.22.27/tcp/33000

Für einen Ethereum-Knoten enthält die Multiadr die Knoten-ID (einen Hash ihres öffentlichen Schlüssels):

/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br

## Enode {#enode}

Ein Enode ist eine Möglichkeit, einen Ethereum-Knoten mithilfe eines URL-Adressformats zu identifizieren. Die hexadezimale Knoten-ID ist im Benutzer namenteil der URL codiert und durch ein @-Zeichen vom Host getrennt. Der Hostname kann nur als IP-Adresse angegeben werden, DNS-Namen sind nicht zulässig. Der Port im Abschnitt „Hostname“ ist der TCP-Abhörport. Wenn sich die TCP- und UDP-Ports (Discovery) unterscheiden, wird der UDP Port als Abfrageparameter "diskportieren" angegeben.

Im folgenden Beispiel beschreibt die Knoten-URL einen Knoten mit der IP-Adresse `10.3.58.6`, dem TCP-Port `30303` und dem UDP-Erkennungsport `30301`.

enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301

## Ethereum-Knotenaufzeichnungen (ENRs) {#enr}

Ethereum Node Records (ENRs) sind ein standardisiertes Format für Netzwerkadressen auf Ethereum. Sie ersetzen multiaddr und Enodes. Diese sind besonders nützlich, da sie einen größeren Informationsaustausch zwischen Knoten ermöglichen. Der ENR enthält eine Signatur, eine Sequenznummer und Felder, die das Identitätsschema detailliert beschreiben, das zum Generieren und Validieren von Signaturen verwendet wird. Der ENR kann auch mit beliebigen Daten gefüllt werden, die als Schlüssel-Wert-Paare organisiert sind. Diese Schlüssel-Wert-Paare enthalten die IP-Adresse des Knotens und Informationen zu den Unterprotokollen, die der Knoten verwenden kann. Konsens-Clients verwenden eine [spezifische ENR-Struktur](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure), um Boot-Knoten zu identifizieren, und enthalten außerdem ein `eth2`-Feld mit Informationen über den aktuellen Ethereum-Fork und das Attestierungs-Gossip-Subnetz (dies verbindet den Knoten mit einer bestimmten Gruppe von Peers, deren Attestierungen zusammengefasst werden).

## Weiterführende Lektüre {#further-reading}

- [EIP-778: Ethereum-Knotenaufzeichnungen (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
