---
title: Backend-API-Bibliotheken
description: "Eine Einführung in die Ethereum-Client-APIs, über die Sie mit der Blockchain Ihrer Anwendung interagieren können."
lang: de
---

Damit eine Softwareanwendung mit der Ethereum-Blockchain interagieren kann (d. h. Blockchain-Daten lesen und/oder Transaktionen an das Netzwerk senden), muss sie sich mit einem Ethereum-Node verbinden.

Zu diesem Zweck implementiert jeder Ethereum-Client die [JSON-RPC](/developers/docs/apis/json-rpc/)-Spezifikation, sodass ein einheitlicher Satz von [Methoden](/developers/docs/apis/json-rpc/#json-rpc-methods) zur Verfügung steht, auf die sich Anwendungen verlassen können.

Wenn Sie eine bestimmte Programmiersprache verwenden möchten, um sich mit einem Ethereum-Knoten zu verbinden, können Sie auf eine der komfortablen Bibliotheken in diesem Ökosystem zurückgreifen, die Ihnen das Leben erleichtern. Mit diesen Programmbibliotheken können Entwickler intuitive, einzeilige Methoden schreiben, um JSON-RPC-Anfragen („unter der Haube“) zu initialisieren, die mit Ethereum interagieren.

## Voraussetzungen {#prerequisites}

Es könnte hilfreich sein, den [Ethereum-Stack](/developers/docs/ethereum-stack/) und die [Ethereum-Clients](/developers/docs/nodes-and-clients/) zu verstehen.

## Warum eine Bibliothek verwenden? {#why-use-a-library}

Durch Abstraktion vereinfachen diese Programmbibliotheken die komplexe direkte Interaktion mit einem Ethereum-Knoten. Sie bieten auch Hilfsfunktionen (z. B. die Umrechnung von ETH in Gwei), sodass Sie als Entwickler weniger Zeit mit den Feinheiten von Ethereum-Clients verbringen und sich mehr auf die einzigartige Funktionalität Ihrer Anwendung konzentrieren können.

## Verfügbare Bibliotheken {#available-libraries}

### Infrastruktur- und Node-Dienste {#infrastructure-and-node-services}

**Alchemy –** **_Ethereum-Entwicklungsplattform._**

- [alchemy.com](https://www.alchemy.com/)
- [Dokumentation](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node –** **_Node-as-a-Service._**

- [All That Node.com](https://www.allthatnode.com/)
- [Dokumentation](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs –** **_Dezentrale APIs für Ethereum-Mainnet und Testnets._**

- [blastapi.io](https://blastapi.io/)
- [Dokumentation](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi –** **_Bereitstellung effizienterer und schnellerer RPC-Dienste_**

- [blockpi.io](https://blockpi.io/)
- [Dokumentation](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare-Ethereum-Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan – Blockexplorer und Transaktions-API**

- [Dokumentation](https://docs.etherscan.io/)

**Blockscout - ein Open-Source-Block-Explorer**

- [Dokumentation](https://docs.blockscout.com/)

**GetBlock –** **_Blockchain-as-a-Service für die Web3-Entwicklung_**

- [GetBlock.io](https://getblock.io/)
- [Dokumentation](https://docs.getblock.io/)

**Infura –** **_Die Ethereum-API als Service._**

- [infura.io](https://infura.io)
- [Dokumentation](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC – _Kostengünstiger EVM-JSON-RPC-Anbieter_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Dokumentation](https://docs.noderpc.xyz/node-rpc)

**NOWNodes – _Full Nodes und Block-Explorer._**

- [NOWNodes.io](https://nownodes.io/)
- [Dokumentation](https://nownodes.gitbook.io/documentation)

**QuickNode –** **_Blockchain-Infrastruktur as a Service._**

- [quicknode.com](https://quicknode.com)
- [Dokumentation](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet –** **_Ethereum- und Ethereum-Classic-APIs as a Service, betrieben mit Open-Source-Software._**

- [rivet.cloud](https://rivet.cloud)
- [Dokumentation](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok –** **_Geschwindigkeitsorientierte Ethereum-Nodes als JSON-RPC/WebSockets-API._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Dokumentation](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Entwicklerwerkzeuge {#development-tools}

**ethers-kt –** **_Asynchrone, hochleistungsfähige Kotlin-/Java-/Android-Bibliothek für EVM-basierte Blockchains._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Beispiele](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum –** **_Eine Open-Source-.NET-Integrationsbibliothek für die Blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Dokumentation](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python-Tooling –** **_Eine Vielzahl von Bibliotheken für die Interaktion mit Ethereum über Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py-Chat](https://gitter.im/ethereum/web3.py)

**Tatum –** **_Die ultimative Blockchain-Entwicklungsplattform._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Dokumentation](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j –** **_Eine Java/Android/Kotlin/Scala-Integrationsbibliothek für Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Docs](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Blockchain-Dienste {#blockchain-services}

**BlockCypher –** **_Ethereum-Web-APIs._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dokumentation](https://www.blockcypher.com/dev/ethereum/)

**Chainbase –** **_All-in-one-Web3-Dateninfrastruktur für Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Dokumentation](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack –** **_Elastische und dedizierte Ethereum-Nodes as a Service._**

- [chainstack.com](https://chainstack.com)
- [Dokumentation](https://docs.chainstack.com/)
- [Ethereum-API-Referenz](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node –** **_Blockchain-Infrastruktur-API._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Dokumentation](https://docs.cdp.coinbase.com/)

**DataHub by Figment –** **_Web3-API-Dienste mit Ethereum-Mainnet und Testnets._**

- [DataHub](https://www.figment.io/)
- [Dokumentation](https://docs.figment.io/)

**Moralis –** **_EVM-API-Anbieter auf Unternehmensebene._**

- [moralis.io](https://moralis.io)
- [Dokumentation](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort –** **_Ethereum-Daten- und Mint-APIs._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Dokumentation](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview –** **_Die allgemeine Plattform für Multi-Krypto-Blockchain-APIs._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Dokumentation](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata –** **_Bietet einfachen und zuverlässigen API-Zugriff auf die Ethereum-Blockchain._**

- [Watchdata](https://watchdata.io/)
- [Dokumentation](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent –** **_Angereicherte Blockchain-APIs für über 200 Chains._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Dokumentation](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## Weiterführende Lektüre {#further-reading}

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Nodes und Clients](/developers/docs/nodes-and-clients/)
- [Entwicklungs-Frameworks](/developers/docs/frameworks/)

## Verwandte Tutorials {#related-tutorials}

- [Web3.js einrichten, um die Ethereum-Blockchain in JavaScript zu verwenden](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Anleitung, um web3.js in Ihrem Projekt einzurichten._
- [Einen Smart Contract aus JavaScript aufrufen](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Sehen Sie am Beispiel des DAI-Tokens, wie man Vertragsfunktionen mit JavaScript aufruft._
