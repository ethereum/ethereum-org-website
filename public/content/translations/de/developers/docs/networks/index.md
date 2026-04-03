---
title: Netzwerke
description: "Ein Überblick über die Netzwerke von Ethereum und wo man Testnet-Ether (ETH) zum Testen seiner Anwendung erhält."
lang: de
---

[Ethereum](/) Netzwerke sind Gruppen von verbundenen Computern, die über das Ethereum-Protokoll kommunizieren. Es gibt nur ein Ethereum-Mainnet, aber unabhängige Netzwerke, die denselben Protokollregeln entsprechen, können zu Test- und Entwicklungszwecken erstellt werden. Es gibt viele unabhängige „Netzwerke“, die dem Protokoll entsprechen, ohne miteinander zu interagieren. Sie können sogar lokal auf Ihrem eigenen Computer eines starten, um Ihre Smart Contracts und Web3-Dapps zu testen.

Ihr Ethereum-Konto funktioniert über die verschiedenen Netzwerke hinweg, aber Ihr Kontostand und Ihre Transaktionshistorie werden nicht aus dem Haupt-Ethereum-Netzwerk übernommen. Zu Testzwecken ist es nützlich zu wissen, welche Netzwerke verfügbar sind und wie man Testnet-ETH erhält, um damit herumzuspielen. Im Allgemeinen wird aus Sicherheitsgründen nicht empfohlen, Mainnet-Konten in Testnets wiederzuverwenden oder umgekehrt.

## Voraussetzungen {#prerequisites}

Sie sollten die [Grundlagen von Ethereum](/developers/docs/intro-to-ethereum/) verstehen, bevor Sie sich über die verschiedenen Netzwerke informieren, da die Testnetzwerke Ihnen eine günstige, sichere Version von Ethereum zum Herumspielen bieten.

## Öffentliche Netzwerke {#public-networks}

Öffentliche Netzwerke sind für jeden auf der Welt mit einer Internetverbindung zugänglich. Jeder kann Transaktionen auf einer öffentlichen Blockchain lesen oder erstellen und die ausgeführten Transaktionen validieren. Der Konsens unter den Peers entscheidet über die Aufnahme von Transaktionen und den Zustand des Netzwerks.

### Ethereum Mainnet {#ethereum-mainnet}

Das Mainnet ist die primäre öffentliche Ethereum-Produktions-Blockchain, auf der Transaktionen mit tatsächlichem Wert auf dem verteilten Ledger stattfinden.

Wenn Leute und Börsen über ETH-Preise diskutieren, sprechen sie über Mainnet-ETH.

### Ethereum-Testnets {#ethereum-testnets}

Zusätzlich zum Mainnet gibt es öffentliche Testnets. Dies sind Netzwerke, die von Protokollentwicklern oder Smart-Contract-Entwicklern verwendet werden, um sowohl Protokoll-Upgrades als auch potenzielle Smart Contracts in einer produktionsähnlichen Umgebung zu testen, bevor sie im Mainnet bereitgestellt werden. Stellen Sie sich dies als Analogon zu Produktions- versus Staging-Servern vor.

Sie sollten jeden von Ihnen geschriebenen Vertrags-Code in einem Testnet testen, bevor Sie ihn im Mainnet bereitstellen. Bei Dapps, die in bestehende Smart Contracts integriert sind, haben die meisten Projekte Kopien in Testnets bereitgestellt.

Die meisten Testnets begannen mit der Verwendung eines erlaubnispflichtigen Proof-of-Authority-Konsensmechanismus. Das bedeutet, dass eine kleine Anzahl von Blockchain-Knoten ausgewählt wird, um Transaktionen zu validieren und neue Blöcke zu erstellen – wobei sie dabei ihre Identität als Einsatz verwenden. Alternativ verfügen einige Testnets über einen offenen Proof-of-Stake-Konsensmechanismus, bei dem jeder das Ausführen eines Validators testen kann, genau wie im Ethereum-Mainnet.

ETH in Testnets soll keinen echten Wert haben; es wurden jedoch Märkte für bestimmte Arten von Testnet-ETH geschaffen, die knapp oder schwer zu bekommen sind. Da Sie ETH benötigen, um tatsächlich mit Ethereum zu interagieren (auch in Testnets), erhalten die meisten Leute Testnet-ETH kostenlos von Faucets. Die meisten Faucets sind Web-Apps, in die Sie eine Adresse eingeben können, an die ETH gesendet werden soll.

#### Welches Testnet sollte ich verwenden?

Die beiden öffentlichen Testnets, die Anwendungsentwickler derzeit pflegen, sind Sepolia und Hoodi. Sepolia ist ein Netzwerk für Vertrags- und Anwendungsentwickler, um ihre Anwendungen zu testen. Das Hoodi-Netzwerk ermöglicht es Protokollentwicklern, Netzwerk-Upgrades zu testen, und lässt Staker das Ausführen von Validatoren testen.

#### Sepolia {#sepolia}

**Sepolia ist das empfohlene Standard-Testnet für die Anwendungsentwicklung**. Das Sepolia-Netzwerk verwendet ein erlaubnispflichtiges Validator-Set, das von Anwendungs- und Testteams kontrolliert wird.

##### Ressourcen

- [Website](https://sepolia.dev/)
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

Hoodi ist ein Testnet zum Testen von Validierung und Staking. Das Hoodi-Netzwerk ist offen für Benutzer, die einen Testnet-Validator ausführen möchten. Staker, die Protokoll-Upgrades testen möchten, bevor sie im Mainnet bereitgestellt werden, sollten daher Hoodi verwenden.

- Offenes Validator-Set, Staker können Netzwerk-Upgrades testen
- Großer Zustand, nützlich zum Testen komplexer Smart-Contract-Interaktionen
- Längere Synchronisationszeit und erfordert mehr Speicherplatz, um einen Blockchain-Knoten auszuführen

##### Ressourcen

- [Website](https://hoodi.ethpandaops.io/)
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

Ephemery ist eine einzigartige Art von Testnet, das jeden Monat vollständig zurückgesetzt wird. Der Ausführungs- und Konsenszustand wird alle 28 Tage auf Genesis zurückgesetzt, was bedeutet, dass alles, was im Testnet passiert, flüchtig ist. Dies macht es ideal für kurzfristige Tests, schnelles Bootstrapping von Blockchain-Knoten und „Hello World“-Anwendungen, die keine Dauerhaftigkeit benötigen.

- Immer frischer Zustand, kurzfristiges Testen von Validatoren und Apps
- Enthält nur einen grundlegenden Satz von Verträgen
- Offenes Validator-Set und einfacher Zugang zu großen Mengen an Geldern
- Geringste Anforderungen an Blockchain-Knoten und schnellste Synchronisation, durchschnittlich &lt;5GB

##### Ressourcen

- [Website](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
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

Das Holesky-Testnet ist seit September 2025 veraltet. Staking-Betreiber und Infrastrukturanbieter sollten stattdessen Hoodi für Validator-Tests verwenden.

- [Ankündigung der Abschaltung des Holesky-Testnets](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _EF Blog, 1. September 2025_
- [Updates zu den Holesky- und Hoodi-Testnets](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _EF Blog, 18. März 2025_

### Ebene-2-Testnets {#layer-2-testnets}

[Ebene 2 (L2)](/layer-2/) ist ein Sammelbegriff zur Beschreibung einer bestimmten Gruppe von Ethereum-Skalierungslösungen. Eine Ebene 2 ist eine separate Blockchain, die Ethereum erweitert und die Sicherheitsgarantien von Ethereum erbt. Ebene-2-Testnets sind in der Regel eng mit öffentlichen Ethereum-Testnets gekoppelt.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Ein Testnet für [Arbitrum](https://arbitrum.io/).

##### Ressourcen

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Alchemy Arbitrum Sepolia Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia faucet](https://faucets.chain.link/arbitrum-sepolia)
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

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucets

- [Alchemy Faucet](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia Faucet](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet Faucet](https://starknet-faucet.vercel.app/)

## Private Netzwerke {#private-networks}

Ein Ethereum-Netzwerk ist ein privates Netzwerk, wenn seine Blockchain-Knoten nicht mit einem öffentlichen Netzwerk (d. h. Mainnet oder einem Testnet) verbunden sind. In diesem Zusammenhang bedeutet privat nur reserviert oder isoliert, anstatt geschützt oder sicher.

### Entwicklungsnetzwerke {#development-networks}

Um eine Ethereum-Anwendung zu entwickeln, sollten Sie sie in einem privaten Netzwerk ausführen, um zu sehen, wie sie funktioniert, bevor Sie sie bereitstellen. Ähnlich wie Sie einen lokalen Server auf Ihrem Computer für die Webentwicklung erstellen, können Sie eine lokale Blockchain-Instanz erstellen, um Ihre Dapp zu testen. Dies ermöglicht eine viel schnellere Iteration als ein öffentliches Testnet.

Es gibt Projekte und Tools, die speziell dafür entwickelt wurden, dabei zu helfen. Erfahren Sie mehr über [Entwicklungsnetzwerke](/developers/docs/development-networks/).

### Konsortium-Netzwerke {#consortium-networks}

Der Konsensprozess wird von einer vordefinierten Gruppe von Blockchain-Knoten gesteuert, denen vertraut wird. Zum Beispiel ein privates Netzwerk bekannter akademischer Institutionen, die jeweils einen einzelnen Blockchain-Knoten verwalten, und Blöcke werden durch einen Schwellenwert von Unterzeichnern innerhalb des Netzwerks validiert.

Wenn ein öffentliches Ethereum-Netzwerk wie das öffentliche Internet ist, ist ein Konsortium-Netzwerk wie ein privates Intranet.

## <Emoji text="🚉" /> Warum sind Ethereum-Testnets nach U-Bahn-Stationen benannt? {#why-naming}

Viele Ethereum-Testnets sind nach realen U-Bahn- oder Bahnhöfen benannt. Diese Namensgebungstradition begann früh und spiegelt die globalen Städte wider, in denen Mitwirkende gelebt oder gearbeitet haben. Es ist symbolisch, einprägsam und praktisch. Genau wie Testnets vom Ethereum-Mainnet isoliert sind, verlaufen U-Bahn-Linien getrennt vom Oberflächenverkehr.

### <Emoji text="🚧" /> Häufig genutzte und veraltete Testnets {#common-and-legacy-testnets}

- **Sepolia** - Ein an die U-Bahn angebundenes Viertel in Athen, Griechenland. Wird derzeit für Smart-Contract- und Dapp-Tests verwendet.
- **Hoodi** - Benannt nach der U-Bahn-Station Hoodi in Bengaluru, Indien. Wird für Validator- und Protokoll-Upgrade-Tests verwendet.
- **Goerli** _(veraltet)_ - Benannt nach dem Görlitzer Bahnhof in Berlin, Deutschland.
- **Rinkeby** _(veraltet)_ - Benannt nach einem Vorort von Stockholm mit einer U-Bahn-Station.
- **Ropsten** _(veraltet)_ - Bezieht sich auf ein Gebiet und einen ehemaligen Fähr-/U-Bahn-Terminal in Stockholm.
- **Kovan** _(veraltet)_ - Benannt nach einer MRT-Station in Singapur.
- **Morden** _(veraltet)_ - Benannt nach einer Station der London Underground. Ethereums erstes öffentliches Testnet.

### <Emoji text="🧪" /> Andere spezialisierte Testnets {#other-testnets}

Einige Testnets wurden für kurzfristige oder Upgrade-spezifische Tests erstellt und haben nicht unbedingt ein U-Bahn-Thema:

- **Holesky** _(veraltet)_ - Benannt nach dem Bahnhof Holešovice in Prag. Wurde für Validator-Tests verwendet; veraltet seit 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(alle veraltet)_ und **Ephemery** - Speziell für Upgrade-Simulationen wie The Merge, Shanghai oder Validator-Experimente entwickelt. Einige Namen sind eher regional oder thematisch als U-Bahn-basiert.

Die Verwendung von U-Bahn-Stationsnamen hilft Entwicklern, Testnets schnell zu identifizieren und sich daran zu erinnern, ohne sich auf numerische Chain-IDs verlassen zu müssen. Es spiegelt auch die Kultur von Ethereum wider: praktisch, global und menschenzentriert.

## Verwandte Tools {#related-tools}

- [Chainlist](https://chainlist.org/) _Liste von EVM-Netzwerken, um Wallets und Anbieter mit der entsprechenden Chain-ID und Netzwerk-ID zu verbinden_
- [EVM-basierte Chains](https://github.com/ethereum-lists/chains) _GitHub-Repo mit Chain-Metadaten, das Chainlist antreibt_

## Weiterführende Literatur {#further-reading}

- [Vorschlag: Vorhersehbarer Lebenszyklus von Ethereum-Testnets](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Die Evolution der Ethereum-Testnets](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)