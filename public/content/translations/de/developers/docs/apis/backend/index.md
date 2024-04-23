---
title: Backend-API-Bibliotheken
description: Eine Einführung in die Ethereum-Client-APIs, über die Sie mit der Blockchain Ihrer Anwendung interagieren können.
lang: de
---

Damit eine Softwareanwendung mit der Ethereum-Blockchain interagieren kann (z. B. Lesen von Blockchain-Daten und/oder Senden von Transaktionen an das Netzwerk), muss es sich mit einem Ethereum-Knoten verbinden.

Zu diesem Zweck implementiert jeder Ethereum-Client die [JSON-RPC](/developers/docs/apis/json-rpc/)-Spezifikation, damit es einen einheitlichen Satz von [Methoden](/developers/docs/apis/json-rpc/#json-rpc-methods) gibt, auf die sich Anwendungen verlassen können.

Wenn Sie eine bestimmte Programmiersprache verwenden möchten, um sich mit einem Ethereum-Knoten zu verbinden, können Sie auf eine der komfortablen Bibliotheken in diesem Ökosystem zurückgreifen, die Ihnen das Leben erleichtern. Mit diesen Programmbibliotheken können Entwickler intuitive, einzeilige Methoden schreiben, um JSON-RPC-Anfragen („unter der Haube“) zu initialisieren, die mit Ethereum interagieren.

## Voraussetzungen {#prerequisites}

Es könnte hilfreich sein, den [Ethereum-Stack](/developers/docs/ethereum-stack/) und die [Ethereum-Clients](/developers/docs/nodes-and-clients/) zu verstehen.

## Warum eine Bibliothek verwenden? {#why-use-a-library}

Durch Abstraktion vereinfachen diese Programmbibliotheken die komplexe direkte Interaktion mit einem Ethereum-Knoten. Zudem bieten sie auch Dienstprogrammfunktionen (z. B. ETH in GWei umwandeln), so dass Sie als Entwickler weniger Zeit mit den Problemstellungen der Ethereum-Clients verbringen müssen und sich stärker auf die einzigartige Funktion Ihrer Anwendung konzentrieren können.

## Verfügbare Bibliotheken {#available-libraries}

**Alchemy-\*\***_Ehereum-Entwicklungsplattform_\*\*

- [alchemy.com](https://www.alchemy.com/)
- [Dokumentation](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**BlockCypher –** **_Ethereum-Web-APIs_**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dokumentation](https://www.blockcypher.com/dev/ethereum/)

**Blast by Bware Labs -** **_Dezentrale APIs für Ethereum Mainnet und Testnetzwerke._**

- [blastapi.io](https://blastapi.io/)
- [Dokumentation](https://docs.blastapi.io)
- [Discord](https://discord.com/invite/VPkWESgtvV)

**Infura –** **_Die Ethereum-API als Dienst_**

- [infura.io](https://infura.io)
- [Dokumentation](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare-Ethereum-Gateway.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Coinbase Cloud Node -** **_Blockchain Infrastruktur-API._**

- [Coinbase Cloud Node](https://www.coinbase.com/cloud/products/node)
- [Dokumentation](https://docs.cloud.coinbase.com/node/reference/welcome-to-node)

**DataHub von Figment -** **_Web3-API-Dienste mit Ethereum-Mainnet und -Testnets_**

- [DataHub](https://www.figment.io/datahub)
- [Dokumentation](https://docs.figment.io/introduction/what-is-datahub)

**NFTPort -** **_Ethereum Daten- und Mint-APIs._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Dokumentation](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Nodesmith –** **_JSON-RPC-API-Zugriff auf Ethereum-Mainnet und -Testnetzwerke_**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Dokumentation](https://nodesmith.io/docs/#/ethereum/apiRef)

**EtherCluster –** **_Führen Sie Ihren eigenen Ethereum -API-Dienst aus, der sowohl ETH als auch ETC unterstützt_**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_Elastische und dedizierte Ethereum-Nodes als Dienst._**

- [chainstack.com](https://chainstack.com)
- [Dokumentation](https://docs.chainstack.com)
- [Ethereum API-Referenz](https://docs.chainstack.com/api/ethereum/ethereum-api-reference)

**QuickNode –** **_Blockchain-Infrastruktur als Dienstleistung_**

- [quicknode.com](https://quicknode.com)
- [Dokumentation](https://www.quicknode.com/docs)
- [Discord](https://discord.gg/NaR7TtpvJq)

**Python Tooling –** **_eine Auswahl von Programmbibliotheken für Ethereum-Interaktion über Python_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**web3j –** **_eine Java-/Android-/Kotlin-/Scala -Integrationsbibliothek für Ethereum_**

- [GitHub](https://github.com/web3j/web3j)
- [Dokumente](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet –** **_Ethereum- und Ethereum Classic-APIs als Service unterstützt durch Open-Source-Software_**

- [rivet.cloud](https://rivet.cloud)
- [Dokumentation](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_Eine Open Source .NET Integration-Library für Blockchain_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Dokumentation](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Tatum –** **_die ultimative Blockchain-Entwicklungsplattform_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Dokumentation](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Watchdata –** **_bietet einen einfachen und zuverlässigen API-Zugriff auf die Ethereum-Blockchain_**

- [Watchdata](https://watchdata.io/)
- [Dokumentation](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Zmok –** **_geschwindigkeitsorientierte Ethereum-Nodes als JSON-RPC-/WebSockets-API_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Dokumentation](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

**NOWNodes - _Full Nodes und Block Explorers._**

- [NOWNodes.io](https://nownodes.io/)
- [Dokumentation](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**Moralis -** **_EVM API-Anbieter auf Unternehmensebene._**

- [moralis.io](http://moralis.io)
- [Dokumentation](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://discord.com/invite/KYswaxwEtg)
- [Forum](https://forum.moralis.io/)

**Chainbase -** **_All-in-One web3-Dateninfrastruktur für Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Dokumentation](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**GetBlock-** **_Blockchain als Dienstleistung für Web3-Entwicklung_**

- [GetBlock.io](https://getblock.io/)
- [Dokumentation](https://getblock.io/docs/)

**BlockPi -** **_Bereitstellung von effizienteren und schnellen RPC-Diensten_**

- [blockpi.io](https://blockpi.io/)
- [Dokumentation](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Tokenview -** **_Die allgemeine API-Plattform für die Multi-Crypto-Blockchain._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Dokumentation](https://services.tokeniew/docs?type=api)
- [Github](https://github.com/Tokenview)

## Weiterführende Informationen {#further-reading}

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Knotenpunkte und Clients](/developers/docs/nodes-and-clients/)
- [Entwicklungs-Frameworks](/developers/docs/frameworks/)

## Ähnliche Tutorials {#related-tutorials}

- [Web3js einrichten, um die Ethereum-Blockchain in JavaScript zu nutzen](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Leitfaden für die Einrichtung von web3.js in Ihrem Projekt._
- [Aufruf eines intelligenten Vertrags mit JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Mit dem DAI-Token können Sie die Funktion „Verträge aufrufen“ mit JavaScript verwenden._
