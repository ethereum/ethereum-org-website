---
title: Smart Contracts bereitstellen
description: "Erfahren Sie, wie Sie Smart Contracts in Ethereum-Netzwerken bereitstellen, einschließlich Voraussetzungen, Tools und Bereitstellungsschritten."
lang: de
---

Sie müssen Ihren Smart Contract bereitstellen, damit er für Benutzer eines Ethereum-Netzwerks verfügbar ist.

Um einen Smart Contract bereitzustellen, senden Sie lediglich eine Ethereum-Transaktion, die den kompilierten Code des Smart Contracts enthält, ohne einen Empfänger anzugeben.

## Voraussetzungen {#prerequisites}

Sie sollten [Ethereum-Netzwerke](/developers/docs/networks/), [Transaktionen](/developers/docs/transactions/) und die [Anatomie von Smart Contracts](/developers/docs/smart-contracts/anatomy/) verstehen, bevor Sie Smart Contracts bereitstellen.

Die Bereitstellung eines Vertrags kostet ebenfalls Ether (ETH), da diese auf der Blockchain gespeichert werden. Daher sollten Sie mit [Gas und Gebühren](/developers/docs/gas/) auf Ethereum vertraut sein.

Schließlich müssen Sie Ihren Vertrag kompilieren, bevor Sie ihn bereitstellen. Stellen Sie also sicher, dass Sie sich über das [Kompilieren von Smart Contracts](/developers/docs/smart-contracts/compiling/) informiert haben.

## Wie man einen Smart Contract bereitstellt {#how-to-deploy-a-smart-contract}

### Was Sie benötigen {#what-youll-need}

- Den Bytecode Ihres Vertrags – dieser wird durch [Kompilierung](/developers/docs/smart-contracts/compiling/) generiert
- ETH für Gas – Sie legen Ihr Gaslimit wie bei anderen Transaktionen fest. Beachten Sie jedoch, dass die Bereitstellung von Verträgen viel mehr Gas erfordert als eine einfache ETH-Überweisung
- Ein Bereitstellungsskript oder Plugin
- Zugriff auf einen [Ethereum-Blockchain-Knoten](/developers/docs/nodes-and-clients/), entweder indem Sie Ihren eigenen betreiben, sich mit einem öffentlichen Blockchain-Knoten verbinden oder über einen API-Schlüssel unter Verwendung eines [Knoten-Dienstes](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Schritte zur Bereitstellung eines Smart Contracts {#steps-to-deploy}

Die genauen Schritte hängen vom jeweiligen Entwicklungs-Framework ab. Sie können sich beispielsweise die [Dokumentation von Hardhat zur Bereitstellung Ihrer Verträge](https://hardhat.org/docs/tutorial/deploying) oder die [Dokumentation von Foundry zur Bereitstellung und Verifizierung eines Smart Contracts](https://book.getfoundry.sh/forge/deploying) ansehen. Nach der Bereitstellung erhält Ihr Vertrag eine Ethereum-Adresse wie andere [Konten](/developers/docs/accounts/) und kann mithilfe von [Quellcode-Verifizierungstools](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) verifiziert werden.

## Verwandte Tools {#related-tools}

**Remix – _Die Remix IDE ermöglicht die Entwicklung, Bereitstellung und Verwaltung von Smart Contracts für Ethereum-ähnliche Blockchains_**

- [Remix](https://remix.ethereum.org)

**Tenderly – _Web3-Entwicklungsplattform, die Debugging, Beobachtbarkeit und Infrastrukturbausteine für die Entwicklung, das Testen, die Überwachung und den Betrieb von Smart Contracts bietet_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentation](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat – _Eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentation zur Bereitstellung Ihrer Verträge](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb – _Stellen Sie jeden Vertrag mit einem einzigen Befehl einfach auf jeder EVM-kompatiblen Chain bereit_**

- [Dokumentation](https://portal.thirdweb.com/deploy/)

**Crossmint – _Web3-Entwicklungsplattform auf Unternehmensniveau zur Bereitstellung von Smart Contracts, zur Ermöglichung von Kreditkarten- und Cross-Chain-Zahlungen sowie zur Nutzung von APIs zum Erstellen, Verteilen, Verkaufen, Speichern und Bearbeiten von NFTs._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Verwandte Tutorials {#related-tutorials}

- [Ihren ersten Smart Contract bereitstellen](/developers/tutorials/deploying-your-first-smart-contract/) _– Eine Einführung in die Bereitstellung Ihres ersten Smart Contracts in einem Ethereum-Testnet._
- [Hello World | Smart-Contract-Tutorial](/developers/tutorials/hello-world-smart-contract/) _– Ein leicht verständliches Tutorial zum Erstellen und Bereitstellen eines einfachen Smart Contracts auf Ethereum._
- [Mit anderen Verträgen aus Solidity interagieren](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Wie man einen Smart Contract aus einem bestehenden Vertrag bereitstellt und mit ihm interagiert._
- [Wie Sie die Größe Ihres Vertrags reduzieren](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Wie Sie die Größe Ihres Vertrags verringern, um unter dem Limit zu bleiben und Gas zu sparen_

## Weiterführende Literatur {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) – _OpenZeppelin_
- [Bereitstellung Ihrer Verträge mit Hardhat](https://hardhat.org/docs/tutorial/deploying) – _Nomic Labs_

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
- [Einen Ethereum-Blockchain-Knoten betreiben](/developers/docs/nodes-and-clients/run-a-node/)
- [Blockchain-Knoten als Dienstleistung (Nodes-as-a-Service)](/developers/docs/nodes-and-clients/nodes-as-a-service)