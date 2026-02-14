---
title: Netzwerke
description: "Eine Übersicht über Ethereums Netzwerke und wo man Testnet Ether (ETH) zum Testen neuer Anwendungen bekommt."
lang: de
---

Ethereum-Netzwerke sind Gruppen von verbundenen Computern, die über das Ethereum-Protokoll kommunizieren. Es gibt nur ein Ethereum-Mainnet, aber zu Test- und Entwicklungszwecken können unabhängige Netzwerke eingerichtet werden, die denselben Protokollregeln entsprechen. Es gibt viele unabhängige "Netzwerke", die dem Protokoll folgen, ohne miteinander zu interagieren. Sie können sogar ein lokales Netzwerk auf Ihrem eigenen Computer starten, um Ihre Smart Contracts und Web3-Anwendungen zu testen.

Ihr Ethereum-Konto funktioniert in den verschiedenen Netzwerken, aber Ihr Kontostand und Ihr Transaktionsverlauf werden nicht vom Ethereum-Mainnet übernommen. Für Testzwecke ist es nützlich zu wissen, welche Netzwerke verfügbar sind und wie man Testnet-ETH erhält, um sich auszuprobieren. Generell ist es aus Sicherheitsgründen nicht empfehlenswert, Mainnet-Konten in Testnets wiederzuverwenden oder umgekehrt.

## Voraussetzungen {#prerequisites}

Sie sollten die [Grundlagen von Ethereum](/developers/docs/intro-to-ethereum/) verstehen, bevor Sie sich über die verschiedenen Netzwerke informieren, da die Testnets Ihnen eine günstige, sichere Version von Ethereum zum Ausprobieren bieten.

## Öffentliche Netzwerke {#public-networks}

Öffentliche Netzwerke sind für jedermann auf der Welt mit einer Internetverbindung zugänglich. Jeder kann Transaktionen in einer öffentlichen Blockchain lesen oder erstellen und die ausgeführten Transaktionen validieren. Der Konsens zwischen den Peers entscheidet über die Aufnahme von Transaktionen und den Zustand des Netzwerks.

### Ethereum Mainnet {#ethereum-mainnet}

Mainnet ist die primäre öffentliche Ethereum-Produktions-Blockchain, bei der Transaktionen mit tatsächlichem Wert im dezentralisierten Ledger stattfinden.

Wenn Menschen und Börsen ETH-Preise diskutieren, sprechen sie über Mainnet ETH.

### Ethereum-Testnets {#ethereum-testnets}

Zusätzlich zum Mainnet gibt es öffentliche Testnetze. Dabei handelt es sich um Netzwerke, die von Protokollentwicklern oder Smart-Contract-Entwicklern eingesetzt werden, um sowohl Protokoll-Upgrades als auch potenzielle Smart Contracts in einer produktionsähnlichen Umgebung zu testen, bevor sie ins Mainnet gelangen. Stelle dir dies als Analog zur Produktion im Vergleich zu Staging-Servern vor.

Sie sollten jeden Contract-Code, den Sie schreiben, in einem Testnet testen, bevor Sie ihn im Mainnet einsetzen. dApps, die mit bestehenden Smart Contracts integriert werden, haben Kopien der meisten Projekte in Testnets bereitgestellt.

Die meisten Testnets begannen mit einem berechtigten Proof-of-Authority-Konsensmechanismus. Dies bedeutet, dass eine kleine Anzahl von Nodes ausgewählt wird, um Transaktionen zu validieren und neue Blöcke zu erstellen – und ihre Identität im Prozess zu hinterlegen. Alternativ dazu bieten einige Testnets einen offenen Proof-of-Stake-Konsensmechanismus, bei dem jeder testweise einen Valitador laufen lassen kann, genau wie beim Ethereum-Mainnet.

ETH in Testnets soll keinen wirklichen Wert haben. Es wurden jedoch Märkte für bestimmte Arten von Testnet-ETH geschaffen, die knapp oder schwer zu bekommen sind. Da Sie ETH benötigen, um tatsächlich mit Ethereum zu interagieren (sogar auf Testnets), erhalten die meisten Nutzer Testnet-ETH kostenlos von Faucets. Die meisten Faucets sind Webapplikationen, bei denen Sie eine Adresse eingeben können, an die die ETH gesendet werden sollen.

#### Welches Testnet soll ich benutzen?

Die beiden öffentlichen Testnets, die von Client-Entwicklern derzeit gepflegt werden, sind Sepolia und Hoodi. Sepolia ist ein Netz für Smart Contract- und Anwendungsentwickler zum Testen ihrer Anwendungen. Das Hoodi-Netzwerk ermöglicht Protokollentwicklern das Testen von Netzwerk-Upgrades und Stakern das Testen des Betriebs von Validatoren.

#### Sepolia {#sepolia}

**Sepolia ist das empfohlene Standard-Testnet für die Anwendungsentwicklung**. Das Sepolia-Netzwerk verwendet einen genehmigten Validatorensatz, der von Client- und Test-Teams kontrolliert wird.

##### Ressourcen

- [Webseite](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Chain Platform Sepolia Faucet](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Chainstack Sepolia Faucet](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Ethereum Ecosystem Faucet](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [ethfaucet.com Sepolia Faucet](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet)
- [PoW Faucet](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi ist ein Testnet zum Testen des Validierens und Stakens. Das Hoodi-Netzwerk ist offen für Benutzer, die einen Testnet-Validator betreiben möchten. Staker, die Protokoll-Upgrades testen möchten, bevor sie im Mainnet eingesetzt werden, sollten daher Hoodi verwenden.

- Offene Validatoren-Sets ermöglichen es Stakern, Netzwerk-Upgrades zu testen, bevor sie live gehen
- Großer Zustand, nützlich zum Testen komplexer Smart-Contract-Interaktionen
- Längere Synchronisationsdauer und erfordert mehr Speicherplatz, um einen Node zu betreiben

##### Ressourcen

- [Webseite](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucets

- [Chain Platform Hoodi Faucet](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi Faucet](https://hoodi.ethpandaops.io/)
- [PoW Faucet](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemer ist eine einzigartige Art von Testnetz, das jeden Monat vollständig zurückgesetzt wird. Die Ausführung und der Konsens zustand kehren alle 28 Tage zum Genesis-Zustand zurück, was bedeutet, dass alles, was im Testnetz geschieht, vergänglich ist. Dies macht es ideal für kurzfristige Tests, schnelles Nöte-Bootstrapping und „Hello World“-Anwendungen, die keine Dauerhaftigkeit erfordern.

- Immer aktueller Stand, kurzfristige Tests von Validatoren und Apps
- Enthält nur grundlegende Verträge
- Offener Validation-Satz und einfacher Zugriff auf große Geldbeträge
- Geringste Anforderungen an Knoten und schnellste Synchronisierung, durchschnittlich <5 GB

##### Ressourcen

- [Webseite](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [Community-Chat](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Beacon-Explorer](https://beaconlight.ephemery.dev/)
- [Checkpoint Sync](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucets

- [Bordel Faucet](https://faucet.bordel.wtf/)
- [Pk910 PoW Faucet](https://ephemery-faucet.pk910.de/)

#### Holesky (veraltet) {#holesky}

Das Holesky-Testnet wird im September 2025 eingestellt. Staking-Betreiber und Infrastruktur-Anbieter sollten stattdessen Hoodi für Validator-Tests verwenden.

- [Ankündigung der Abschaltung des Holesky-Testnets](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) – _EF-Blog, 1. September 2025_
- [Updates zu den Testnets Holesky und Hoodi](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) – _EF-Blog, 18. März 2025_

### Layer-2-Testnets {#layer-2-testnets}

[Layer 2 (L2)](/layer-2/) ist ein Sammelbegriff für eine bestimmte Reihe von Ethereum-Skalierungslösungen. Ein Layer-2 ist eine separate Blockchain, die Ethereum erweitert und die Sicherheitsgarantien von Ethereum erbt. Layer-2-Testnets sind in der Regel eng mit öffentlichen Ethereum-Testnets gekoppelt.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Ein Testnet für [Arbitrum](https://arbitrum.io/).

##### Ressourcen

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Alchemy Arbitrum Sepolia Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia Faucet](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia Faucet](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Ein Testnet für [Optimism](https://www.optimism.io/).

##### Ressourcen

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Alchemy Faucet](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlink Faucet](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia Faucet](https://ethfaucet.com/networks/optimism)
- [Testnet Faucet](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Ein Testnet für [Starknet](https://www.starknet.io).

##### Ressourcen

- [Starkscan](https://sepolia.starkscan.co/)

##### Faucets

- [Alchemy Faucet](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia Faucet](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet Faucet](https://starknet-faucet.vercel.app/)

## Private Netzwerke {#private-networks}

Ein Ethereum-Netzwerk ist ein privates Netzwerk, wenn seine Nodes nicht an ein öffentliches Netzwerk angeschlossen sind (z. B. Mainnet oder ein Testnet). In diesem Zusammenhang bedeutet privat nur reserviert oder isoliert statt geschützt oder sicher.

### Entwicklungsnetzwerke {#development-networks}

Um eine Ethereum-Anwendung zu entwickeln, ist es ratsam, sie in einem privaten Netzwerk auszuführen, um zu sehen, wie sie funktioniert, bevor Sie sie in der Blockchain einsetzen. Ähnlich wie Sie auf Ihrem Computer einen lokalen Server für die Webentwicklung erstellen, können Sie eine lokale Blockchain-Instanz erstellen, um Ihre dApp zu testen. Das ermöglicht eine wesentlich schnellere Iteration als ein öffentliches Testnet.

Es gibt Projekte und Tools, die dabei hilfreich sind. Erfahren Sie mehr über [Entwicklungsnetzwerke](/developers/docs/development-networks/).

### Konsortialnetzwerke {#consortium-networks}

Der Konsensprozess wird von einer vordefinierten Gruppe von Knoten gesteuert, die vertrauenswürdig sind. Beispielsweise ein privates Netzwerk bekannter akademischer Institutionen, die jeweils eine einzelne Node stellen, sowie Blöcke werden mithilfe einer Schwelle von Unterzeichnern innerhalb des Netzwerks validiert.

Wenn ein öffentliches Ethereum-Netzwerk wie das öffentliche Internet ist, dann ist ein Konsortialnetzwerk wie ein privates Intranet.

## <Emoji text="🚉" /> Warum sind Ethereum-Testnets nach U-Bahn-Stationen benannt? {#why-naming}

Viele Ethereum-Testnets sind nach realen U-Bahn- oder Bahnhöfen benannt. Diese Namensgebungstradition begann schon früh und spiegelt die globalen Städte wider, in denen Mitwirkende gelebt oder gearbeitet haben. Sie ist symbolisch, einprägsam und praktisch. So wie Testnets vom Ethereum-Mainnet isoliert sind, verlaufen auch U-Bahn-Linien getrennt vom oberirdischen Verkehr.

### <Emoji text="🚧" /> Häufig verwendete und veraltete Testnets {#common-and-legacy-testnets}

- **Sepolia** – Ein an die U-Bahn angebundenes Viertel in Athen, Griechenland. Wird derzeit für Tests von Smart Contracts und Dapps verwendet.
- **Hoodi** – Benannt nach der U-Bahn-Station Hoodi in Bengaluru, Indien. Wird für Validator- und Protokoll-Upgrade-Tests verwendet.
- **Goerli** _(veraltet)_ – Benannt nach dem Görlitzer Bahnhof in Berlin, Deutschland.
- **Rinkeby** _(veraltet)_ – Benannt nach einem Vorort von Stockholm mit einer U-Bahn-Station.
- **Ropsten** _(veraltet)_ – Bezieht sich auf ein Gebiet und ein ehemaliges Fähr-/U-Bahn-Terminal in Stockholm.
- **Kovan** _(veraltet)_ – Benannt nach einer MRT-Station in Singapur.
- **Morden** _(veraltet)_ – Benannt nach einer Station der Londoner U-Bahn. Das erste öffentliche Testnet von Ethereum.

### <Emoji text="🧪" /> Andere spezialisierte Testnets {#other-testnets}

Einige Testnets wurden für kurzfristige oder upgrade-spezifische Tests erstellt und sind nicht unbedingt nach U-Bahnen benannt:

- **Holesky** _(veraltet)_ – Benannt nach dem Bahnhof Holešovice in Prag. Wurde für Validator-Tests verwendet; veraltet ab 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(alle veraltet)_ und **Ephemery** – Speziell für Upgrade-Simulationen wie „Die Zusammenführung“, „Shanghai“ oder Validator-Experimente entwickelt. Einige Namen sind eher regional oder thematisch als U-Bahn-basiert.

Die Verwendung von Namen von U-Bahn-Stationen hilft Entwicklern, Testnets schnell zu identifizieren und sich daran zu erinnern, ohne sich auf numerische Chain-IDs verlassen zu müssen. Es spiegelt auch die Kultur von Ethereum wider: praktisch, global und auf den Menschen ausgerichtet.

## Zugehörige Werkzeuge {#related-tools}

- [Chainlist](https://chainlist.org/) _Liste von EVM-Netzwerken, um Wallets und Anbieter mit der entsprechenden Chain-ID und Netzwerk-ID zu verbinden_
- [EVM-basierte Chains](https://github.com/ethereum-lists/chains) _GitHub-Repo mit Chain-Metadaten, das Chainlist unterstützt_

## Weiterführende Lektüre {#further-reading}

- [Vorschlag: Vorhersehbarer Lebenszyklus von Ethereum-Testnets](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Die Entwicklung der Ethereum-Testnets](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
