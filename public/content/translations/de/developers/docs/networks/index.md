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

### Ethereum-Mainnet {#ethereum-mainnet}

Mainnet ist die primäre öffentliche Ethereum-Produktions-Blockchain, bei der Transaktionen mit tatsächlichem Wert im dezentralisierten Ledger stattfinden.

Wenn Menschen und Börsen ETH-Preise diskutieren, sprechen sie über Mainnet ETH.

### Ethereum-Testnets {#ethereum-testnets}

Zusätzlich zum Mainnet gibt es öffentliche Testnetze. Dabei handelt es sich um Netzwerke, die von Protokollentwicklern oder Smart-Contract-Entwicklern eingesetzt werden, um sowohl Protokoll-Upgrades als auch potenzielle Smart Contracts in einer produktionsähnlichen Umgebung zu testen, bevor sie ins Mainnet gelangen. Stelle dir dies als Analog zur Produktion im Vergleich zu Staging-Servern vor.

Sie sollten jeden Contract-Code, den Sie schreiben, in einem Testnet testen, bevor Sie ihn im Mainnet einsetzen. dApps, die mit bestehenden Smart Contracts integriert werden, haben Kopien der meisten Projekte in Testnets bereitgestellt.

Die meisten Testnets begannen mit einem berechtigten Proof-of-Authority-Konsensmechanismus. Dies bedeutet, dass eine kleine Anzahl von Nodes ausgewählt wird, um Transaktionen zu validieren und neue Blöcke zu erstellen – und ihre Identität im Prozess zu hinterlegen. Alternativ dazu bieten einige Testnets einen offenen Proof-of-Stake-Konsensmechanismus, bei dem jeder testweise einen Valitador laufen lassen kann, genau wie beim Ethereum-Mainnet.

ETH in Testnets soll keinen wirklichen Wert haben. Es wurden jedoch Märkte für bestimmte Arten von Testnet-ETH geschaffen, die knapp oder schwer zu bekommen sind. Da Sie ETH benötigen, um tatsächlich mit Ethereum zu interagieren (sogar auf Testnets), erhalten die meisten Nutzer Testnet-ETH kostenlos von Faucets. Die meisten Faucets sind Webapplikationen, bei denen Sie eine Adresse eingeben können, an die die ETH gesendet werden sollen.

#### Welches Testnet soll ich benutzen?

Die beiden öffentlichen Testnets, die die Client-Entwickler derzeit betreiben, sind Sepolia und Goerli. Sepolia ist ein Netz für Smart Contract- und Anwendungsentwickler zum Testen ihrer Anwendungen. Das Goerli-Netz ermöglicht es Protokollentwicklern, Netzwerk-Upgrades zu testen, bzw. erlaubt es Stakern, laufende Validatoren zu testen.

#### Sepolia {#sepolia}

**Sepolia ist das empfohlene Standard-Testnet für die Anwendungsentwicklung**. Das Sepolia-Netz verwendet ein berechtigtes Validator-Set. Es ist relativ neu, d. h. der Status und Verlauf sind beide recht klein. Das bedeutet, dass das Netzwerk schnell zu synchronisieren ist und dass der Betrieb eines Knotens weniger Speicherplatz erfordert. Das ist nützlich für Benutzer, die schnell einen Knoten einrichten und direkt mit dem Netzwerk interagieren möchten.

- Geschlossener Validatorensatz, kontrolliert von Client und Testteams
- Neues Testnet, weniger Anwendungen im Einsatz als auf anderen Testnets
- Schnelle Synchronisierung und minimaler Speicherplatzbedarf für den Betrieb eines Knotens

##### Ressourcen

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW-Faucet](https://sepolia-faucet.pk910.de/)
- [Faucet für Coinbase-Wallet | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Faucet für Alchemy Sepolia](https://sepoliafaucet.com/)
- [Faucet für Infura Sepolia](https://www.infura.io/faucet)
- [Faucet für Chainstack Sepolia](https://faucet.chainstack.com/sepolia-faucet)
- [Ethereum-Ökosystem-Faucet](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Goerli _(Langzeit-Support)_ {#goerli}

_Hinweis: [Das Goerli-Testnetz ist veraltet](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) und wird 2023 durch [Holesovice](https://github.com/eth-clients/holesovice) ersetzt. Sie sollten die Migration Ihrer Anwendungen auf Sepolia in Erwägung ziehen._

Goerli ist ein Testnet zum Testen, Validieren und Staking. Das Goerli-Netzwerk ist offen für Benutzer, die einen Testnet-Validator betreiben möchten. Staker, die Protokoll-Upgrades testen wollen, bevor sie im Mainnet eingesetzt werden, sollten daher Goerli benutzen.

- Offenes Validator-Set, Staker können Netzwerk-Upgrades testen
- Großer State, nützlich zum Testen komplexer Smart-Contract-Interaktionen
- Langwierige Synchronisierung und hoher Speicherbedarf für den Betrieb eines Knotens

##### Ressourcen

- [Website](https://goerli.net/)
- [GitHub](https://github.com/eth-clients/goerli)
- [Etherscan](https://goerli.etherscan.io)
- [Blockscout](https://eth-goerli.blockscout.com/)

##### Faucets

- [QuickNode Goerli Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW-Faucet](https://goerli-faucet.pk910.de/)
- [Paradigm-Faucet](https://faucet.paradigm.xyz/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)
- [All That Node Goerli Faucet](https://www.allthatnode.com/faucet/ethereum.dsrv)
- [Coinbase Wallet Faucet | Goerli](https://coinbase.com/faucets/ethereum-goerli-faucet)
- [Chainstack Goerli-Faucet](https://faucet.chainstack.com/goerli-faucet)

Um einen Validator im Goerli-Testnet zu starten, verwenden Sie das [Launchpad "cheap goerli validator"](https://holesky.launchpad.ethstaker.cc/en/) von ethstaker.

### Layer-2-Testnets {#layer-2-testnets}

[Layer-2 (L2)](/layer-2/) ist ein Sammelbegriff, der eine bestimmte Gruppe von Ethereum-Skalierungslösungen beschreibt. Ein Layer-2 ist eine separate Blockchain, die Ethereum erweitert und die Sicherheitsgarantien von Ethereum erbt. Layer-2-Testnets sind in der Regel eng mit öffentlichen Ethereum-Testnets gekoppelt.

#### Arbitrum Goerli {#arbitrum-goerli}

Ein Testnet für [Arbitrum](https://arbitrum.io/).

##### Faucets

- [Chainlink-Faucet](https://faucets.chain.link/)

#### Optimistic Goerli {#optimistic-goerli}

Ein Testnet für [Optimism](https://www.optimism.io/).

##### Faucets

- [Paradigm-Faucet](https://faucet.paradigm.xyz/)
- [Coinbase Wallet Faucet | Optimism Goerli](https://coinbase.com/faucets/optimism-goerli-faucet)

#### Starknet Goerli {#starknet-goerli}

Ein Testnetz für [Starknet](https://www.starknet.io).

##### Faucets

- [Starknet-Faucet](https://faucet.goerli.starknet.io)

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
