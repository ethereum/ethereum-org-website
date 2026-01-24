---
title: Smart Contracts bereitstellen
description: Erfahren Sie, wie Sie Smart Contracts in Ethereum Netzwerken bereitstellen, einschließlich Voraussetzungen, Tools und Bereitstellungsschritten.
lang: de
---

Sie müssen Ihren Smart Contract auf die Blockchain hochladen, damit er Benutzern eines Ethereum-Netzwerks zur Verfügung steht.

Die Bereitstellung des Smart Contracts auf der Blockchain ist eigentlich nur das Senden einer Transaktion, die den Code des kompilierten Smart Contracts enthält, ohne Angabe von Empfängern.

## Voraussetzungen {#prerequisites}

Sie sollten [Ethereum-Netzwerke](/developers/docs/networks/), [Transaktionen](/developers/docs/transactions/) und die [Anatomie von Smart Contracts](/developers/docs/smart-contracts/anatomy/) verstehen, bevor Sie Smart Contracts bereitstellen.

Das Bereitstellen eines Vertrags kostet auch Ether (ETH), da dieser auf der Blockchain gespeichert wird. Sie sollten daher mit [Gas und Gebühren](/developers/docs/gas/) auf Ethereum vertraut sein.

Schließlich müssen Sie Ihren Vertrag kompilieren, bevor Sie ihn bereitstellen. Stellen Sie also sicher, dass Sie den Artikel über das [Kompilieren von Smart Contracts](/developers/docs/smart-contracts/compiling/) gelesen haben.

## Wie man einen Smart Contract bereitstellt {#how-to-deploy-a-smart-contract}

### Was Sie benötigen {#what-youll-need}

- Der Bytecode Ihres Vertrags – dieser wird durch die [Kompilierung](/developers/docs/smart-contracts/compiling/) generiert
- Ether for gas – Sie setzen Ihre Ressourcengrenze wie bei anderen Transaktionen fest. Beachten Sie dabei jedoch, dass das Integrieren von Smart Contracts viel mehr Ressourcen erfordert als eine einfache ETH-Transaktion.
- Ein Bereitstellungsskript oder Plug-in
- Zugriff auf einen [Ethereum-Node](/developers/docs/nodes-and-clients/), entweder durch den Betrieb eines eigenen, die Verbindung zu einem öffentlichen Node oder über einen API-Schlüssel bei einem [Node-Service](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Schritte zur Bereitstellung eines Smart Contracts {#steps-to-deploy}

Die spezifischen Schritte hängen vom jeweiligen Entwicklungsframework ab. Zum Beispiel können Sie sich die [Dokumentation von Hardhat zur Bereitstellung Ihrer Verträge](https://hardhat.org/docs/tutorial/deploying) oder die [Dokumentation von Foundry zur Bereitstellung und Verifizierung eines Smart Contracts](https://book.getfoundry.sh/forge/deploying) ansehen. Nach der Bereitstellung hat Ihr Vertrag wie andere [Konten](/developers/docs/accounts/) eine Ethereum-Adresse und kann mithilfe von [Tools zur Überprüfung des Quellcodes](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) verifiziert werden.

## Zugehörige Werkzeuge {#related-tools}

**Remix – _Remix IDE ermöglicht die Entwicklung, Bereitstellung und Verwaltung von Smart Contracts für Ethereum-ähnliche Blockchains_**

- [Remix](https://remix.ethereum.org)

**Tenderly – _Web3-Entwicklungsplattform, die Debugging, Beobachtbarkeit und Infrastruktur-Bausteine für die Entwicklung, das Testen, die Überwachung und den Betrieb von Smart Contracts bietet_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentation](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat – _Eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentation zur Bereitstellung Ihrer Verträge](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb – _Einfache Bereitstellung beliebiger Verträge auf jeder EVM-kompatiblen Chain mit einem einzigen Befehl_**

- [Dokumentation](https://portal.thirdweb.com/deploy/)

**Crossmint – _Web3-Entwicklungsplattform auf Unternehmensniveau, um Smart Contracts bereitzustellen, Zahlungen per Kreditkarte und über verschiedene Ketten hinweg zu ermöglichen sowie APIs zu nutzen, um NFTs zu erstellen, zu verteilen, zu verkaufen, zu speichern und zu bearbeiten._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Verwandte Tutorials {#related-tutorials}

- [Bereitstellung Ihres ersten Smart Contracts](/developers/tutorials/deploying-your-first-smart-contract/) _– Eine Einführung in die Bereitstellung Ihres ersten Smart Contracts auf einem Ethereum-Testnet._
- [Hallo Welt | Smart-Contract-Tutorial](/developers/tutorials/hello-world-smart-contract/) _– Ein leicht verständliches Tutorial zur Erstellung und Bereitstellung eines einfachen Smart Contracts auf Ethereum._
- [Mit anderen Verträgen aus Solidity interagieren](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Wie man einen Smart Contract aus einem bestehenden Vertrag bereitstellt und mit ihm interagiert._
- [So verkleinern Sie die Größe Ihres Vertrags](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Wie Sie die Größe Ihres Vertrags reduzieren, um das Limit einzuhalten und Gas zu sparen_

## Weiterführende Lektüre {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) – _OpenZeppelin_
- [Bereitstellung Ihrer Verträge mit Hardhat](https://hardhat.org/docs/tutorial/deploying) – _Nomic Labs_

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
- [Einen Ethereum-Node betreiben](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodes-as-a-Service](/developers/docs/nodes-and-clients/nodes-as-a-service)
