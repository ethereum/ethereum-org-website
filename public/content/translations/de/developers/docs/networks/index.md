---
title: Netzwerke
description: Eine Übersicht über Ethereums Netzwerke und wo man Testnet Ether (ETH) zum Testen neuer Anwendungen bekommt.
lang: de
---

Da Ethereum ein Protokoll ist, kann es mehrere unabhängige "Netzwerke" geben, die diesem Protokoll entsprechen, jedoch nicht miteinander interagieren.

Netzwerke sind verschiedene Ethereum-Umgebungen, auf die du für Entwicklung, Tests oder Produktionsanwendungsfälle zugreifen kannst. Dein Ethereum-Konto wird in den verschiedenen Netzwerken funktionieren, aber dein Kontostand und die zugehörige Transaktionsgeschichte werden nicht von Ethereums Hauptnetzwerk auf andere Netzwerke übertragen. Zu Testzwecken ist es nützlich zu wissen, welche Netzwerke verfügbar sind und wie man Testnet ETH erhält, um damit zu experimentieren.

## Voraussetzungen {#prerequisites}

Du solltest die Grundlagen von Ethereum verstehen, bevor du über die verschiedenen Netzwerke liest, da die Testnetze dir eine günstige und sichere Version von Ethereum bieten, um damit herumzuspielen. Starte mit unserer [Einführung in Ethereum](/developers/docs/intro-to-ethereum/).

## Öffentliche Netzwerke {#public-networks}

Öffentliche Netzwerke sind für jedermann auf der Welt mit einer Internetverbindung zugänglich. Jeder kann Transaktionen in einer öffentlichen Blockchain lesen oder erstellen und die ausgeführten Transaktionen validieren. Die Vereinbarung über Transaktionen und den Zustand des Netzwerks wird durch einen Konsens von Netzwerkteilnehmern getroffen.

### Mainnet {#mainnet}

Mainnet ist die primäre öffentliche Ethereum-Produktions-Blockchain, bei der Transaktionen mit tatsächlichem Wert im dezentralisierten Ledger stattfinden.

Wenn Menschen und Börsen ETH-Preise diskutieren, sprechen sie über Mainnet ETH.

### Testnetze {#testnets}

Zusätzlich zum Mainnet gibt es öffentliche Testnetze. Dabei handelt es sich um Netzwerke, die von Protokollentwicklern oder Smart-Contract-Entwicklern eingesetzt werden, um sowohl Protokoll-Upgrades als auch potenzielle Smart Contracts in einer produktionsähnlichen Umgebung zu testen, bevor sie ins Mainnet gelangen. Stelle dir dies als Analog zur Produktion im Vergleich zu Staging-Servern vor.

Es ist generell wichtig, jeden Vertragscode, den du auf einem Testnetz schreibst, zu testen, bevor du ihn in das Mainnet einbringst. Wenn du eine dApp erstellst, die an bestehende Smart Contracts angeknüpft ist, haben die meisten Projekte Kopien in Testnetze, mit denen du interagieren kannst, bereitgestellt.

Die meisten Testnetze verwenden den Konsensmechanismus Proof-of-Authority. Dies bedeutet, dass eine kleine Anzahl von Nodes ausgewählt wird, um Transaktionen zu validieren und neue Blöcke zu erstellen – und ihre Identität im Prozess zu hinterlegen. Es ist schwer, das Mining auf einem Testnetz zu fördern, was es aufgrund geringer Validierungsressourcen verwundbar machen kann.

ETH auf Testnetzen hat keinen echten Wert. Daher gibt es keine Märkte für Testnet ETH. Da du ETH benötigst, um tatsächlich mit Ethereum zu interagieren, bekommen die meisten Leute Testnet ETH von Faucets. Die meisten Faucets sind Webapplikationen, bei denen du eine Adresse eingeben kannst, an die die ETH gesendet werden sollen.

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

Ein Testnetz für [Arbitrum](https://arbitrum.io/).

##### Arbitrum Rinkeby faucets

- [FaucETH](https://fauceth.computing.org) (Multi-Chain-faucet ohne die Notwendigkeit eines sozialen Kontos)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigmatischer Faucet](https://faucet.paradigm.xyz/)

#### Görli {#goerli}

Ein Proof-of-Authority-Testnetz, das über verschiedene Clients hinweg funktioniert.

##### Görli faucets

- [Görli faucet](https://faucet.goerli.mudit.blog/)
- [Chainlink faucet](https://faucets.chain.link/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)

#### Kintsugi {#kintsugi}

Ein Fusionstestnetz für Ethereum.

##### Kintsugi faucets

- [FaucETH](https://fauceth.computing.org) (Multi-Chain-Faucet ohne die Notwendigkeit eines Social-Kontos)
- [Kintsugi faucet](https://faucet.kintsugi.themerge.dev/)

#### Kovan {#kovan}

Ein Proof-of-Authority-Testnetz für diejenigen, die OpenEthereum-Clients verwenden.

##### Kovan faucets

- [FaucETH](https://fauceth.computing.org) (Multi-Chain-Faucet ohne die Notwendigkeit eines Social-Kontos)
- [Kovan faucet](https://faucet.kovan.network/)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

#### Optimistischer Kovan {#optimistic-kovan}

Ein Testnetz für [Optimismus](https://www.optimism.io/).

##### Optimistische Kovan-Faucets

- [FaucETH](https://fauceth.computing.org) (Multi-Chain-Faucet ohne die Notwendigkeit eines Social-Kontos)
- [Paradigmatischer Faucet](https://faucet.paradigm.xyz/)

#### Rinkeby {#rinkeby}

Ein Proof-of-Authority-Testnetz für diejenigen, die den Geth-Client verwenden.

##### Rinkeby faucets

- [FaucETH](https://fauceth.computing.org) (Multi-Chain-Faucet ohne die Notwendigkeit eines Social-Kontos)
- [Alchemy faucet](https://RinkebyFaucet.com)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)
- [Rinkeby faucet](https://faucet.rinkeby.io/)

#### Ropsten {#ropsten}

Ein Proof-of-Work-Testnetz. Das bedeutet, es ist die beste gleichartige Testnetzumgebung von Ethereum.

##### Ropsten faucets

- [FaucETH](https://fauceth.computing.org) (Multi-Chain-Faucet ohne die Notwendigkeit eines Social-Kontos)
- [Paradigmatischer Faucet](https://faucet.paradigm.xyz/)

## Private Netzwerke {#private-networks}

Ein Ethereum-Netzwerk ist ein privates Netzwerk, wenn seine Nodes nicht mit einem öffentlichen Netzwerk verbunden sind (d. h. Hauptnetz oder ein Testnetz). In diesem Zusammenhang bedeutet privat nur reserviert oder isoliert statt geschützt oder sicher.

### Entwicklungsnetzwerke {#development-networks}

Um eine Ethereum-Anwendung zu entwickeln, ist es ratsam, sie in einem privaten Netzwerk auszuführen, um zu sehen, wie sie funktioniert, bevor du sie in der Blockchain verteilst. Ähnlich wie du auf deinem Computer einen lokalen Server für Webentwicklung erstellst, kannst du eine lokale Blockchain-Instanz erstellen, um deine dApp zu testen. Dies ermöglicht eine wesentlich schnellere Iteration als ein öffentliches Testnetz.

Es gibt Projekte und Tools, die dabei hilfreich sind. Erfahre mehr über [Entwicklungsnetzwerke](/developers/docs/development-networks/).

### Konsortium-Netzwerke {#consortium-networks}

Der Konsensprozess wird von einer vordefinierten Gruppe von Nodes gesteuert, die vertrauenswürdig sind, z. B. ein privates Netzwerk bekannter akademischer Institutionen, die jeweils einen einzelnen Node stellen, wodurch Blöcke mit einer Schwelle von Unterzeichnern innerhalb des Netzwerks validiert werden.

Wenn ein öffentliches Ethereum-Netzwerk wie das öffentliche Internet ist, kannst du dir ein Konsortium-Netzwerk als privates Intranet vorstellen.

## Verwandte Tools {#related-tools}

- [Kettenliste](https://chainlist.org/) _Liste der EVM-Netzwerke, um Wallets und Anbieter mit der entsprechenden Ketten-ID und Netzwerk-ID zu verbinden_
- [EVM-basierte Ketten](https://github.com/ethereum-lists/chains) _GitHub Repo der Ketten-Metadaten, die Chainlist_ unterstützen

## Weiterführende Informationen {#further-reading}

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_
