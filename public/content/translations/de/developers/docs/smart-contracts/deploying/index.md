---
title: Smart Contracts bereitstellen
description:
lang: de
---

Sie müssen Ihren Smart Contract auf die Blockchain hochladen, damit er Benutzern eines Ethereum-Netzwerks zur Verfügung steht.

Die Bereitstellung des Smart Contracts auf der Blockchain ist eigentlich nur das Senden einer Transaktion, die den Code des kompilierten Smart Contracts enthält, ohne Angabe von Empfängern.

## Voraussetzungen {#prerequisites}

Sie sollten mit [Ethereum-Netzwerken](/developers/docs/networks/), [Transaktionen](/developers/docs/transactions/) und der [Anatomie von Smart Contracts](/developers/docs/smart-contracts/anatomy/) vor der Umsetzung von Smart Contracts vertraut sein.

Die Veröffentlichung eines Contracts kostet auch Ether (ETH), da sie auf der Blockchain gespeichert werden. Daher sollten Sie mit [Gas und Gebühren](/developers/docs/gas/) auf Ethereum vertraut sein.

Zu guter letzt muss ein Vertrag vor der Bereitstellung kompiliert werden. Lesen Sie also vorher den Beitrag [Smart Contracts kompilieren](/developers/docs/smart-contracts/compiling/).

## So laden Sie einen Smart Contract hoch {#how-to-deploy-a-smart-contract}

### Folgendes ist erforderlich {#what-youll-need}

- Ihr Contract-Bytecode – dieser wird durch [Kompilierung](/developers/docs/smart-contracts/compiling/) generiert.
- Ether for gas – Sie setzen Ihre Ressourcengrenze wie bei anderen Transaktionen fest. Beachten Sie dabei jedoch, dass das Integrieren von Smart Contracts viel mehr Ressourcen erfordert als eine einfache ETH-Transaktion.
- Ein Bereitstellungsskript oder Plug-in
- Zugriff auf einen [Ethereum-Knoten](/developers/docs/nodes-and-clients/), entweder durch Betreiben Ihres eigenen Knotens, durch Verbindung zu einem öffentlichen Knoten oder über einen API-Schlüssel mit einem [Node-Service](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Schritte zur Bereitstellung eines Smart Contracts {#steps-to-deploy}

Die spezifischen Schritte hängen vom jeweiligen Entwicklungsframework ab. Zum Beispiel können Sie sich [die Dokumentation von Hardhat zur Bereitstellung Ihrer Contracts](https://hardhat.org/guides/deploying.html) oder [die Dokumentation von Foundry zur Bereitstellung und Verifizierung eines Smart Contract](https://book.getfoundry.sh/forge/deploying) ansehen. Nach Bereitstellung hat Ihr Vertrag wie andere [Konten](/developers/docs/accounts/) eine Ethereum-Adresse und kann mit [Werkzeugen zur Verifizierung des Quellcodes](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) verifiziert werden.

## Verwandte Werkzeuge {#related-tools}

**Remix – _Remix IDE ermöglicht das Entwickeln, Bereitstellen und Verwalten von Smart Contracts für Ethereum-ähnliche Blockchains_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3-Entwicklungsplattform, die Debugging, Beobachtbarkeit und Infrastrukturbausteine für die Entwicklung, das Testen, die Überwachung und den Betrieb von Smart Contracts bietet_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentation](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat – _Eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumente zur Bereitstellung Ihrer Verträge](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Einfache Bereitstellung eines beliebigen Vertrags für eine EVM-kompatible Blockchain mit einem einzigen Befehl_**

- [Dokumentation](https://portal.thirdweb.com/deploy/)

**Crossmint – _Web3-Entwicklungsplattform auf Unternehmensniveau, um Smart Contracts bereitzustellen, Zahlungen per Kreditkarte und über verschiedene Ketten hinweg zu ermöglichen sowie APIs zu nutzen, um NFTs zu erstellen, zu verteilen, zu verkaufen, zu speichern und zu bearbeiten._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Verwandte Tutorials {#related-tutorials}

- [Bereitstellung Ihres ersten Smart Contracts](/developers/tutorials/deploying-your-first-smart-contract/) _– Eine Einführung in die Bereitstellung Ihres ersten Smart Contracts in einem Ethereum-Testnetzwerk._
- [Hallo Welt | Smart Contract-Tutorial](/developers/tutorials/hello-world-smart-contract/) _– Ein leicht verständliches Tutorial zur Erstellung & Veröffentlichung eines einfachen Smart Contracts auf Ethereum._
- [Mit anderen Verträgen aus Solidity interagieren](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– So können Sie einen Smart Contract aus einem bestehenden Vertrag aufbauen und mit ihm interagieren_
- [So können Sie die Größe Ihres Vertrags reduzieren](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– So reduzieren Sie die Größe Ihres Vertrags, um sie unter dem Limit zu halten und Gas zu sparen_

## Weiterführende Informationen {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Ihre Verträge mit Hardhat bereitstellen](https://hardhat.org/guides/deploying.html) – _Nomic Labs_

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
- [Einen Ethereum-Knoten betreiben](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodes als Dienstleistung](/developers/docs/nodes-and-clients/nodes-as-a-service)
