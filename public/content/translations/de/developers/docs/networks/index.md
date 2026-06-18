---
title: Netzwerke
description: Ein Überblick über die Netzwerke von Ethereum und wo man Testnetz-Ether (ETH) zum Testen seiner Anwendung erhält.
lang: de
---

[Ethereum](/)-Netzwerke sind Gruppen verbundener Computer, die über das Ethereum-Protokoll kommunizieren. Es gibt nur ein Ethereum Mainnet, aber für Test- und Entwicklungszwecke können unabhängige Netzwerke erstellt werden, die denselben Protokollregeln entsprechen. Es gibt viele unabhängige „Netzwerke“, die dem Protokoll entsprechen, ohne miteinander zu interagieren. Sie können sogar lokal auf Ihrem eigenen Computer eines starten, um Ihre Smart Contracts und Web3-Apps zu testen.

Ihr Ethereum-Konto funktioniert über die verschiedenen Netzwerke hinweg, aber Ihr Kontostand und Ihr Transaktionsverlauf werden nicht aus dem Haupt-Ethereum-Netzwerk übernommen. Für Testzwecke ist es nützlich zu wissen, welche Netzwerke verfügbar sind und wie man Testnetz-ETH zum Ausprobieren erhält. Im Allgemeinen wird aus Sicherheitsgründen nicht empfohlen, Mainnet-Konten in Testnetzen wiederzuverwenden oder umgekehrt.

## Voraussetzungen {#prerequisites}

Sie sollten die [Grundlagen von Ethereum](/developers/docs/intro-to-ethereum/) verstehen, bevor Sie sich über die verschiedenen Netzwerke informieren, da die Testnetzwerke Ihnen eine günstige, sichere Version von Ethereum zum Ausprobieren bieten.

## Öffentliche Netzwerke {#public-networks}

Öffentliche Netzwerke sind für jeden auf der Welt mit einer Internetverbindung zugänglich. Jeder kann Transaktionen auf einer öffentlichen Blockchain lesen oder erstellen und die ausgeführten Transaktionen validieren. Der Konsens unter den Peers entscheidet über die Aufnahme von Transaktionen und den Zustand des Netzwerks.

### Ethereum Mainnet {#ethereum-mainnet}

Das Mainnet ist die primäre öffentliche Ethereum-Produktions-Blockchain, auf der Transaktionen mit tatsächlichem Wert auf dem verteilten Hauptbuch (Distributed Ledger) stattfinden.

Wenn Leute und Börsen über ETH-Preise diskutieren, sprechen sie über Mainnet-ETH.

### Ethereum-Testnetze {#ethereum-testnets}

Zusätzlich zum Mainnet gibt es öffentliche Testnetze. Dies sind Netzwerke, die von Protokollentwicklern oder Smart-Contract-Entwicklern verwendet werden, um sowohl Protokoll-Upgrades als auch potenzielle Smart Contracts in einer produktionsähnlichen Umgebung vor der Bereitstellung im Mainnet zu testen. Stellen Sie sich dies als Analogon zu Produktions- versus Staging-Servern vor.

Sie sollten jeden von Ihnen geschriebenen Vertrags-Code in einem Testnetz testen, bevor Sie ihn im Mainnet bereitstellen. Bei dezentralen Anwendungen (Dapps), die in bestehende Smart Contracts integriert sind, haben die meisten Projekte Kopien in Testnetzen bereitgestellt.

Die meisten Testnetze begannen mit der Verwendung eines erlaubnispflichtigen Autoritätsnachweis (PoA)-Konsensmechanismus. Das bedeutet, dass eine kleine Anzahl von Knoten ausgewählt wird, um Transaktionen zu validieren und neue Blöcke zu erstellen – wobei sie dabei ihre Identität einsetzen. Alternativ verfügen einige Testnetze über einen offenen Proof-of-Stake (PoS)-Konsensmechanismus, bei dem jeder das Ausführen eines Validators testen kann, genau wie im Ethereum Mainnet.

ETH in Testnetzen soll keinen echten Wert haben; es wurden jedoch Märkte für bestimmte Arten von Testnetz-ETH geschaffen, die knapp oder schwer zu bekommen sind. Da Sie ETH benötigen, um tatsächlich mit Ethereum zu interagieren (auch in Testnetzen), erhalten die meisten Leute Testnetz-ETH kostenlos von Faucets. Die meisten Faucets sind Web-Apps, in die Sie eine Adresse eingeben können, an die ETH gesendet werden soll.

#### Welches Testnetz sollte ich verwenden? {#which-testnet-should-i-use}

Die beiden öffentlichen Testnetze, die Client-Entwickler derzeit pflegen, sind Sepolia und Hoodi. Sepolia ist ein Netzwerk für Vertrags- und Anwendungsentwickler, um ihre Anwendungen zu testen. Das Hoodi-Netzwerk ermöglicht es Protokollentwicklern, Netzwerk-Upgrades zu testen, und Stakern, das Ausführen von Validatoren zu testen.

#### Sepolia {#sepolia}

**Sepolia ist das empfohlene Standard-Testnetz für die Anwendungsentwicklung**. Das Sepolia-Netzwerk verwendet ein erlaubnispflichtiges Validator-Set, das von Client- und Testteams kontrolliert wird.

##### Ressourcen {#hoodi}

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets {#ephemery}

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

#### Hoodi {#faucets}

Hoodi ist ein Testnetz zum Testen von Validierung und Staking. Das Hoodi-Netzwerk ist offen für Benutzer, die einen Testnetz-Validator ausführen möchten. Staker, die Protokoll-Upgrades testen möchten, bevor sie im Mainnet bereitgestellt werden, sollten daher Hoodi verwenden.

- Offenes Validator-Set, Staker können Netzwerk-Upgrades testen
- Großer Zustand, nützlich zum Testen komplexer Smart-Contract-Interaktionen
- Längere Synchronisierung und erfordert mehr Speicherplatz, um einen Knoten auszuführen

##### Ressourcen {#holesky}

- [Website](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucets {#layer-2-testnets}

- [Chain Platform Hoodi Faucet](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi Faucet](https://hoodi.ethpandaops.io/)
- [PoW Faucet](https://hoodi-faucet.pk910.de/)

#### Ephemery {#arbitrum-sepolia}

Ephemery ist eine einzigartige Art von Testnetz, das jeden Monat vollständig zurückgesetzt wird. Der Ausführungs- und Konsenszustand wird alle 28 Tage auf Genesis zurückgesetzt, was bedeutet, dass alles, was im Testnetz passiert, flüchtig (ephemeral) ist. Dies macht es ideal für kurzfristige Tests, schnelles Bootstrapping von Knoten und „Hello World“-Anwendungen, die keine Dauerhaftigkeit benötigen.

- Immer frischer Zustand, kurzfristiges Testen von Validatoren und Apps
- Enthält nur einen grundlegenden Satz von Verträgen
- Offenes Validator-Set und einfacher Zugang zu großen Mengen an Geldern
- Geringste Knoten-Anforderungen und schnellste Synchronisierung, im Durchschnitt &lt;5GB

##### Ressourcen {#optimistic-sepolia}

- [Website](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Community-Chat](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Beacon-Explorer](https://beaconlight.ephemery.dev/)
- [Checkpoint Sync](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucets {#starknet-sepolia}

- [Bordel Faucet](https://faucet.bordel.wtf/)
- [Pk910 PoW Faucet](https://ephemery-faucet.pk910.de/)

#### Holesky (veraltet) {#private-networks}

Das Holesky-Testnetz ist ab September 2025 veraltet. Staking-Betreiber und Infrastrukturanbieter sollten stattdessen Hoodi für Validator-Tests verwenden.

- [Ankündigung der Abschaltung des Holesky-Testnetzes](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _EF Blog, 1. September 2025_
- [Updates zu den Holesky- und Hoodi-Testnetzen](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _EF Blog, 18. März 2025_

### Layer-2-Testnetze {#development-networks}

[Layer 2 (L2)](/layer-2/) ist ein Sammelbegriff zur Beschreibung einer bestimmten Gruppe von Ethereum-Skalierungslösungen. Ein Layer 2 ist eine separate Blockchain, die Ethereum erweitert und die Sicherheitsgarantien von Ethereum erbt. Layer-2-Testnetze sind in der Regel eng mit öffentlichen Ethereum-Testnetzen gekoppelt.

#### Arbitrum Sepolia {#consortium-networks}

Ein Testnetz für [Arbitrum](https://arbitrum.io/).

##### Ressourcen {#why-naming}

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets {#common-and-legacy-testnets}

- [Alchemy Arbitrum Sepolia Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia Faucet](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia Faucet](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#other-testnets}

Ein Testnetz für [Optimism](https://www.optimism.io/).

##### Ressourcen {#related-tools}

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets {#further-reading}

- [Alchemy Faucet](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlink Faucet](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia Faucet](https://ethfaucet.com/networks/optimism)
- [Testnet-Faucet](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia

Ein Testnetz für [Starknet](https://www.starknet.io).

##### Ressourcen

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucets

- [Alchemy Faucet](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia Faucet](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet Faucet](https://starknet-faucet.vercel.app/)

## Private Netzwerke

Ein Ethereum-Netzwerk ist ein privates Netzwerk, wenn seine Knoten nicht mit einem öffentlichen Netzwerk (d. h. Mainnet oder einem Testnetz) verbunden sind. In diesem Zusammenhang bedeutet privat nur reserviert oder isoliert, nicht jedoch geschützt oder sicher.

### Entwicklungsnetzwerke

Um eine Ethereum-Anwendung zu entwickeln, sollten Sie sie in einem privaten Netzwerk ausführen, um zu sehen, wie sie funktioniert, bevor Sie sie bereitstellen. Ähnlich wie Sie für die Webentwicklung einen lokalen Server auf Ihrem Computer erstellen, können Sie eine lokale Blockchain-Instanz erstellen, um Ihre Dapp zu testen. Dies ermöglicht eine viel schnellere Iteration als ein öffentliches Testnetz.

Es gibt Projekte und Tools, die speziell dafür entwickelt wurden, dabei zu helfen. Erfahren Sie mehr über [Entwicklungsnetzwerke](/developers/docs/development-networks/).

### Konsortium-Netzwerke

Der Konsensprozess wird von einer vordefinierten Gruppe von Knoten gesteuert, denen vertraut wird. Zum Beispiel ein privates Netzwerk bekannter akademischer Einrichtungen, die jeweils einen einzelnen Knoten verwalten, und Blöcke werden durch einen Schwellenwert von Unterzeichnern innerhalb des Netzwerks validiert.

Wenn ein öffentliches Ethereum-Netzwerk wie das öffentliche Internet ist, ist ein Konsortium-Netzwerk wie ein privates Intranet.

## <Emoji text="🚉" /> Warum sind Ethereum-Testnetze nach U-Bahn-Stationen benannt?

Viele Ethereum-Testnetze sind nach realen U-Bahn- oder Bahnhöfen benannt. Diese Namenstradition begann früh und spiegelt die globalen Städte wider, in denen Mitwirkende gelebt oder gearbeitet haben. Es ist symbolisch, einprägsam und praktisch. Genau wie Testnetze vom Ethereum Mainnet isoliert sind, verlaufen U-Bahn-Linien getrennt vom Oberflächenverkehr.

### <Emoji text="🚧" /> Häufig genutzte und veraltete Testnetze

- **Sepolia** - Ein an die U-Bahn angebundenes Viertel in Athen, Griechenland. Wird derzeit für Smart-Contract- und Dapp-Tests verwendet.
- **Hoodi** - Benannt nach der U-Bahn-Station Hoodi in Bengaluru, Indien. Wird für Validator- und Protokoll-Upgrade-Tests verwendet.
- **Goerli** _(veraltet)_ - Benannt nach dem Görlitzer Bahnhof in Berlin, Deutschland.
- **Rinkeby** _(veraltet)_ - Benannt nach einem Vorort von Stockholm mit einer U-Bahn-Station.
- **Ropsten** _(veraltet)_ - Bezieht sich auf ein Gebiet und ein ehemaliges Fähr-/U-Bahn-Terminal in Stockholm.
- **Kovan** _(veraltet)_ - Benannt nach einer MRT-Station in Singapur.
- **Morden** _(veraltet)_ - Benannt nach einer Station der London Underground. Ethereums erstes öffentliches Testnetz.

### <Emoji text="🧪" /> Andere spezialisierte Testnetze

Einige Testnetze wurden für kurzfristige oder Upgrade-spezifische Tests erstellt und haben nicht unbedingt ein U-Bahn-Thema:

- **Holesky** _(veraltet)_ - Benannt nach dem Bahnhof Holešovice in Prag. Wurde für Validator-Tests verwendet; 2025 als veraltet eingestuft.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(alle veraltet)_ und **Ephemery** - Speziell für Upgrade-Simulationen wie den Merge, Shanghai oder Validator-Experimente entwickelt. Einige Namen sind eher regional oder thematisch als U-Bahn-basiert.

Die Verwendung von U-Bahn-Stationsnamen hilft Entwicklern, Testnetze schnell zu identifizieren und sich daran zu erinnern, ohne sich auf numerische Chain-IDs verlassen zu müssen. Es spiegelt auch die Kultur von Ethereum wider: praktisch, global und menschenzentriert.

## Verwandte Tools

- [Chainlist](https://chainlist.org/) _Liste von EVM-Netzwerken, um Wallets und Anbieter mit der entsprechenden Chain-ID und Netzwerk-ID zu verbinden_
- [EVM-basierte Chains](https://github.com/ethereum-lists/chains) _GitHub-Repository mit Chain-Metadaten, die Chainlist antreiben_

## Weiterführende Literatur

- [Vorschlag: Vorhersehbarer Lebenszyklus von Ethereum-Testnetzen](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Die Evolution der Ethereum-Testnetze](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)