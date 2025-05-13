---
title: Netzwerke
description: Eine Übersicht über Ethereums Netzwerke und wo man Testnet Ether (ETH) zum Testen neuer Anwendungen bekommt.
lang: de
---

Ethereum-Netzwerke sind Gruppen von verbundenen Computern, die über das Ethereum-Protokoll kommunizieren. Es gibt nur ein Ethereum-Mainnet, aber zu Test- und Entwicklungszwecken können unabhängige Netzwerke eingerichtet werden, die denselben Protokollregeln entsprechen. Es gibt viele unabhängige "Netzwerke", die dem Protokoll folgen, ohne miteinander zu interagieren. Sie können sogar ein lokales Netzwerk auf Ihrem eigenen Computer starten, um Ihre Smart Contracts und Web3-Anwendungen zu testen.

Ihr Ethereum-Konto funktioniert in den verschiedenen Netzwerken, aber Ihr Kontostand und Ihr Transaktionsverlauf werden nicht vom Ethereum-Mainnet übernommen. Für Testzwecke ist es nützlich zu wissen, welche Netzwerke verfügbar sind und wie man Testnet-ETH erhält, um sich auszuprobieren. Generell ist es aus Sicherheitsgründen nicht empfehlenswert, Mainnet-Konten in Testnets wiederzuverwenden oder umgekehrt.

## Voraussetzungen {#prerequisites}

Sie sollten die [Grundlagen von Ethereum](/developers/docs/intro-to-ethereum/) verstehen, bevor Sie sich über die verschiedenen Netzwerke informieren, denn die Testnetzwerke bieten Ihnen eine billige, sichere Version von Ethereum, mit der Sie Dinge ausprobieren können.

## Öffentliche Netzwerke {#public-networks}

Öffentliche Netzwerke sind für jedermann auf der Welt mit einer Internetverbindung zugänglich. Jeder kann Transaktionen in einer öffentlichen Blockchain lesen oder erstellen und die ausgeführten Transaktionen validieren. Der Konsens zwischen den Peers entscheidet über die Aufnahme von Transaktionen und den Zustand des Netzwerks.

### Ethereum Mainnet {#ethereum-mainnet}

Mainnet ist die primäre öffentliche Ethereum-Produktions-Blockchain, bei der Transaktionen mit tatsächlichem Wert im dezentralisierten Ledger stattfinden.

Wenn Menschen und Börsen ETH-Preise diskutieren, sprechen sie über Mainnet ETH.

### Ethereum Testnetze {#ethereum-testnets}

Neben dem Mainnet gibt es öffentliche Testnetze. Diese werden von Protokollentwicklern oder Smart-Contract-Entwicklern verwendet, um sowohl Protokoll-Upgrades als auch potenzielle Smart Contracts in einer produktionsähnlichen Umgebung zu testen, bevor sie auf das Mainnet deployed werden. Stellen Sie sich das als Analogie zu Produktions- und Staging-Servern vor.

Sie sollten jeden Contract-Code, den Sie schreiben, auf einem Testnet testen, bevor Sie ihn auf dem Mainnet deployen. Unter den dApps, die mit bestehenden Smart Contracts integriert sind, haben die meisten Projekte Kopien auf Testnetzen deployed.

Die meisten Testnetze begannen mit einem berechtigten Proof-of-Authority-Konsensmechanismus. Das bedeutet, dass eine kleine Anzahl von Nodes ausgewählt wird, um Transaktionen zu validieren und neue Blöcke zu erstellen – wobei sie ihre Identität in diesem Prozess einsetzen. Alternativ verfügen einige Testnetze über einen offenen Proof-of-Stake-Konsensmechanismus, bei dem jeder das Validieren testen kann, genau wie beim Ethereum Mainnet.

ETH auf Testnetzen soll keinen realen Wert haben; es wurden jedoch Märkte für bestimmte Arten von Testnet-ETH geschaffen, die knapp oder schwer zu erhalten geworden sind. Da Sie ETH benötigen, um tatsächlich mit Ethereum zu interagieren (selbst auf Testnetzen), erhalten die meisten Menschen Testnet-ETH kostenlos von Faucets. Die meisten Faucets sind Webanwendungen, in die Sie eine Adresse eingeben können, an die Sie ETH senden möchten.

#### Welches Testnet soll ich benutzen?

Die beiden öffentlichen Testnetze, die Client-Entwickler derzeit warten, sind Sepolia und Hoodi. Sepolia ist ein Netzwerk für Contract- und Anwendungsentwickler, um ihre Anwendungen zu testen. Das Hoodi-Netzwerk ermöglicht es Protokollentwicklern, Netzwerk-Upgrades zu testen, und Stakern, das Validieren zu testen.

#### Sepolia {#sepolia}

**Sepolia ist das empfohlene Standard-Testnet für die Anwendungsentwicklung**.
Das Sepolia-Netzwerk verwendet einen berechtigten Validatorsatz. Es ist relativ neu, was bedeutet, dass sein Zustand und seine Historie beide recht klein sind. Das bedeutet, dass das Netzwerk schnell synchronisiert und dass das Betreiben eines Nodes weniger Speicherplatz erfordert. Dies ist nützlich für Benutzer, die schnell einen Node starten und direkt mit dem Netzwerk interagieren möchten.

- Geschlossener Validatorsatz, kontrolliert von Client- und Testteams
- Neues Testnet, weniger Anwendungen deployed als bei anderen Testnetzen
- Schnelle Synchronisation und minimaler Speicherplatzbedarf für den Betrieb eines Nodes

##### Ressourcen

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW faucet](https://sepolia-faucet.pk910.de/)
- [Coinbase Wallet Faucet | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia faucet](https://sepoliafaucet.com/)
- [Infura Sepolia faucet](https://www.infura.io/faucet)
- [Chainstack Sepolia faucet](https://faucet.chainstack.com/sepolia-faucet)
- [Ethereum Ecosystem faucet](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Hoodi {#hoodi}

Hoodi ist ein Testnet zum Testen von Validierung und Staking. Das Hoodi-Netzwerk ist offen für Benutzer, die einen Testnet-Validator betreiben möchten. Staker, die Protokoll-Upgrades testen möchten, bevor sie auf dem Mainnet deployed werden, sollten daher Hoodi verwenden.

- Offener Validatorsatz, Staker können Netzwerk-Upgrades testen
- Großer Zustand, nützlich für das Testen komplexer Smart-Contract-Interaktionen
- Längere Synchronisationszeit und mehr Speicherplatz für den Betrieb eines Nodes erforderlich

##### Ressourcen

- [Website](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)

##### Faucets

- [Hoodi Faucet](https://hoodi.ethpandaops.io/)

Um einen Validator auf dem Hoodi-Testnet zu starten, verwenden Sie [Hoodi launchpad](https://hoodi.launchpad.ethereum.org/en/).

### Layer-2-Testnetze {#layer-2-testnets}

[Layer 2 (L2)](/layer-2/) ist ein Sammelbegriff zur Beschreibung einer bestimmten Gruppe von Ethereum-Skalierungslösungen. Ein Layer 2 ist eine separate Blockchain, die Ethereum erweitert und die Sicherheitsgarantien von Ethereum erbt. Layer-2-Testnetze sind normalerweise eng mit öffentlichen Ethereum-Testnetzen verbunden.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Ein Testnet für [Arbitrum](https://arbitrum.io/).

##### Faucets

- [Chainlink faucet](https://faucets.chain.link/arbitrum-sepolia)
- [Alchemy faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Ein Testnet für [Optimism](https://www.optimism.io/).

##### Faucets

- [Chainlink faucet](https://faucets.chain.link/optimism-sepolia)
- [Alchemy faucet](https://www.alchemy.com/faucets/optimism-sepolia)

#### Starknet Sepolia {#starknet-sepolia}

Ein Testnet für [Starknet](https://www.starknet.io).

##### Faucets

- [Alchemy faucet](https://www.alchemy.com/faucets/starknet-sepolia)

## Private Netzwerke {#private-networks}

Ein Ethereum-Netzwerk ist ein privates Netzwerk, wenn seine Knoten nicht mit einem öffentlichen Netzwerk verbunden sind (z. B. mit Mainnet oder einem Testnet). In diesem Zusammenhang bedeutet privat nur reserviert oder isoliert statt geschützt oder sicher.

### Entwicklungsnetzwerke {#development-networks}

Um eine Ethereum-Anwendung zu entwickeln, ist es ratsam, sie in einem privaten Netzwerk auszuführen, um zu sehen, wie sie funktioniert, bevor Sie sie in der Blockchain einsetzen. Ähnlich wie Sie auf Ihrem Computer einen lokalen Server für die Webentwicklung erstellen, können Sie eine lokale Blockchain-Instanz erstellen, um Ihre dApp zu testen. Das ermöglicht eine wesentlich schnellere Iteration als ein öffentliches Testnet.

Es gibt Projekte und Tools, die dabei hilfreich sind. Erfahren Sie mehr über [Entwicklungsnetzwerke](/developers/docs/development-networks/).

### Konsortium-Netzwerke {#consortium-networks}

Der Konsensprozess wird von einer vordefinierten Gruppe von Nodes gesteuert, die vertrauenswürdig sind. Beispielsweise ein privates Netzwerk bekannter akademischer Institutionen, die jeweils eine einzelne Node stellen, sowie Blöcke werden mithilfe einer Schwelle von Unterzeichnern innerhalb des Netzwerks validiert.

Wenn ein öffentliches Ethereum-Netzwerk wie das öffentliche Internet ist, dann ist ein Konsortialnetzwerk wie ein privates Intranet.

## Verwandte Tools {#related-tools}

- [Chain-Liste](https://chainlist.org/) _Liste der EVM-Netzwerke, um Wallets und Anbieter mit der entsprechenden Chain-ID und Netzwerk-ID zu verbinden_
- [EVM-basierte Chains](https://github.com/ethereum-lists/chains) _GitHub Repo der Chain-Metadaten, die die Chain-Liste_ unterstützen

## Weiterführende Informationen {#further-reading}

- [Vorschlag: vorhersehbarer Ethereum-Testnet-Lebenszyklus](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Die Entwicklung der Ethereum-Testnets](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
