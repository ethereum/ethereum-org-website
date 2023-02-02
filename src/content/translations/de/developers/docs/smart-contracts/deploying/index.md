---
title: Einsetzen von Smart Contracts
description:
lang: de
---

Sie müssen Ihren Smart Contract auf die Blockchain hochladen, damit er Benutzern eines Ethereum-Netzwerks zur Verfügung steht.

Die Bereitstellung des Smart Contracts auf der Blockchain ist eigentlich nur das Senden einer Transaktion, die den Code des kompilierten Smart Contracts enthält, ohne Angabe von Empfängern.

## Voraussetzungen {#prerequisites}

Sie sollten mit [Ethereum-Netzwerken](/developers/docs/networks/), [Transaktionen](/developers/docs/transactions/) und der [Anatomie von Smart Contracts](/developers/docs/smart-contracts/anatomy/) vor der Umsetzung von Smart Contracts vertraut sein.

Der Einsatz eines Vertrags kostet auch ETH, daher sollten Sie sich mit [Ressourcen und Gebühren](/developers/docs/gas/) auf Ethereum auskennen.

Zu guter letzt muss ein Vertrag vor der Bereitstellung kompiliert werden. Lesen Sie also vorher den Beitrag [Smart Contracts kompilieren](/developers/docs/smart-contracts/compiling/).

## So laden Sie einen Smart Contract hoch {#how-to-deploy-a-smart-contract}

### Was Sie brauchen {#what-youll-need}

- Der Vertragsbytecode – dieser wird durch [Kompilierung](/developers/docs/smart-contracts/compiling/) generiert
- Ether for gas – Sie setzen Ihre Ressourcengrenze wie bei anderen Transaktionen fest. Beachten Sie dabei jedoch, dass das Integrieren von Smart Contracts viel mehr Ressourcen erfordert als eine einfache ETH-Transaktion.
- Ein Bereitstellungsskript oder Plug-in
- Zugang zu einem [Ethereum-Node](/developers/docs/nodes-and-clients/), entweder durch den Betrieb eines eigenen Node, die Verbindung zu einem öffentlichen Node oder über einen API-Schlüssel mit Hilfe eines [Node-Dienstes](/developers/docs/nodes-and-clients/nodes-as-a-service/) wie Infura oder Alchemy

### Schritte zur Bereitstellung eines Smart Contracts {#steps-to-deploy}

Die einzelnen Schritte hängen von den verwendeten Tools ab. Ein Beispiel dafür finden Sie in der [Hardhat-Dokumentation über die Bereitstellung Ihrer Verträge](https://hardhat.org/guides/deploying.html) oder in der [Truffle-Dokumentation über Netzwerke und die Bereitstellung von Anwendungen](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment). Das sind zwei der beliebtesten Tools für die Bereitstellung von Smart Contracts, bei denen ein Skript geschrieben werden muss, um die Bereitstellungsschritte durchzuführen.

Sobald Ihr Smart Contract integriert ist, hat er eine Ethereum-Adresse, wie andere [-Konten](/developers/docs/accounts/).

## Verwandte Werkzeuge {#related-tools}

**Remix – _Remix IDE ermöglicht das Entwickeln, Bereitstellen und Verwalten von Smart Contracts für Ethereum-ähnliche Blockchains_**

- [Remix](https://remix.ethereum.org)

**Tenderly – _Simulieren, debuggen und überwachen Sie alles auf EVM-kompatiblen Ketten, mit Echtzeitdaten_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentation](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat – _Eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumente zur Bereitstellung Ihrer Verträge](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**Truffle –** **_Entwicklungsumgebung, Test-Framework, Build-Pipeline und weitere Tools_**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [Dokumente über Netzwerke und Anwendungsbereitstellung](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment)
- [GitHub](https://github.com/trufflesuite/truffle)

## Verwandte Tutorials {#related-tutorials}

- [Bereitstellung Ihres ersten Smart Contracts](/developers/tutorials/deploying-your-first-smart-contract/) _– Eine Einführung in die Bereitstellung Ihres ersten Smart Contracts in einem Ethereum-Testnetzwerk_
- [Mit anderen Contracts aus Solidity interagieren](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– So bauen Sie einen Smart Contract aus einem bestehenden Vertrag auf und interagieren damit_
- [So können Sie die Größe Ihres Vertrags verkleinern](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– So verkleinern Sie die Größe Ihres Vertrags, um sie unter dem Limit zu halten und Ressourcen zu sparen_

## Weiterführende Informationen {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) – _OpenZeppelin_
- [Ihre Verträge mit Hardhat bereitstellen](https://hardhat.org/guides/deploying.html) – _Nomic Labs_

_Kennen Sie eine Community-Ressource die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu._

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
- [Einen Ethereum-Node starten](/developers/docs/nodes-and-clients/run-a-node/)
