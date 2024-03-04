---
title: Librerie API di backend
description: Introduzione alle API client di Ethereum che permettono l'interazione tra un'applicazione con la blockchain.
lang: it
---

Per interagire con la blockchain Ethereum (ad esempio leggere i dati della blockchain e/o inviare transazioni alla rete), un'applicazione software deve connettersi a un nodo Ethereum.

Per questo scopo, ogni client di Ethereum implementa la specifica [JSON-RPC](/developers/docs/apis/json-rpc/), quindi esiste una serie uniforme di [metodi](/developers/docs/apis/json-rpc/#json-rpc-methods) su cui possono basarsi le applicazioni.

Se desideri utilizzare un linguaggio di programmazione specifico per connetterti a un nodo Ethereum, sviluppa una soluzione personalizzata, ma tieni presente che ci sono già molte librerie all'interno dell'ecosistema che possono facilitarti la vita. Con queste librerie, gli sviluppatori possono scrivere metodi a una riga intuitivi per inizializzare le richieste RPC JSON (under the hood) che interagiscono con Ethereum.

## Prerequisiti {#prerequisites}

Potrebbe essere utile comprendere meglio lo [stack di Ethereum](/developers/docs/ethereum-stack/) e[i client di Ethereum](/developers/docs/nodes-and-clients/).

## Perché usare una libreria? {#why-use-a-library}

Queste librerie eliminano buona parte della complessità legata al dover interagire direttamente con un nodo Ethereum. Forniscono inoltre funzioni di utilità (ad esempio conversione da ETH a Gwei) in modo da ridurre il tempo necessario per districarsi tra le complessità dei client Ethereum e potersi concentrare sulle funzionalità uniche dell'applicazione.

## Librerie disponibili {#available-libraries}

**Alchemy -** **_Piattaforma di sviluppo Ethereum_**

- [alchemy.com](https://www.alchemy.com/)
- [Documentazione](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**BlockCypher -** **_API Web Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentazione](https://www.blockcypher.com/dev/ethereum/)

**Blast by Bware Labs -** **_API decentralizzate per la rete principale e le reti di prova di Ethereum._**

- [blastapi.io](https://blastapi.io/)
- [Documentazione](https://docs.blastapi.io)
- [Discord](https://discord.com/invite/VPkWESgtvV)

**Infura -** **_L'API Ethereum come servizio_**

- [infura.io](https://infura.io)
- [Documentazione](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Gateway Ethereum Cloudflare**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodo cloud di Coinbase-** **_API per l'infrastruttura della Blockchain._**

- [Nodo in cloud di Coinbase](https://www.coinbase.com/cloud/products/node)
- [Documentazione](https://docs.cloud.coinbase.com/node/reference/welcome-to-node)

**DataHub di Figment -** **_Servizi API Web3 con la Rete principale e le reti di prova di Ethereum._**

- [DataHub](https://www.figment.io/datahub)
- [Documentazione](https://docs.figment.io/introduction/what-is-datahub)

**NFTPort -** **_Dati di Ethereum e API di Mint._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentazione](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Nodesmith -** **_Accesso dell’API JSON-RPC alla Rete Principale e alle reti di prova di Ethereum._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Documentazione](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_Esegui il tuo servizio API di Ethereum che supporta sia ETH che ETC_**

- [ethercluster.com](https://www.ethercluster.com/)

**Catainstack -** **_Nodi di Ethereum elastici e dedicati come servizio_**

- [chainstack.com](https://chainstack.com)
- [Documentazione](https://docs.chainstack.com)
- [Riferimento all'API di Ethereum](https://docs.chainstack.com/api/ethereum/ethereum-api-reference)

**QuickNode -** **_Infrastruttura della Blockchain come servizio._**

- [quicknode.com](https://quicknode.com)
- [Documentazione](https://www.quicknode.com/docs)
- [Discord](https://discord.gg/NaR7TtpvJq)

**Strumenti Python -** **_Diverse librerie per interagire con Ethereum tramite Python_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**web3j -** **_Libreria di integrazione di Java/Android/Kotlin/Scala per Ethereum_**

- [GitHub](https://github.com/web3j/web3j)
- [Docs](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_API di Ethereum ed Ethereum Classic come servizio, supportate da software open source._**

- [rivet.cloud](https://rivet.cloud)
- [Documentazione](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_Una libreria di integrazione .NET open source per la blockchain_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentazione](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**QuikNode -** **_La piattaforma definitiva per sviluppatori di blockchain_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentazione](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Watchdata -** **_Accesso semplice e affidabile delle API alla blockchain di Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentazione](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Zmok -** **_Nodi di Ethereum orientati alla velocità come l'API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentazione](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

**NOWNodes - _Nodi completi ed esploratori di blocchi._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentazione](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**Moralis**: **_Fornitore di API EVM di livello enterprise._**

- [moralis.io](http://moralis.io)
- [Documentazione](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://discord.com/invite/KYswaxwEtg)
- [Forum](https://forum.moralis.io/)

**Chainbase -** **_Infrastruttura dati web3 tutto in uno per Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Documentazione](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**GetBlock-** **_Blockchain-as-a-service per lo sviluppo Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentazione](https://getblock.io/docs/)

**BlockPi -** **_Fornire servizi RPC più efficienti e veloci_**

- [blockpi.io](https://blockpi.io/)
- [Documentazione](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Tokenview -** **_La piattaforma generale per API blockchain multi-criptovaluta._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentazione](https://services.tokeniew/docs?type=api)
- [Github](https://github.com/Tokenview)

## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [ Nodi e client](/developers/docs/nodes-and-clients/)
- [Quadri di sviluppo](/developers/docs/frameworks/)

## Tutorial correlati {#related-tutorials}

- [Set up Web3js to use the Ethereum blockchain in JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Istruzioni per impostare web3.js in un progetto._
- [Calling a Smart Contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando il token DAI, impara come funzionano i contratti di chiamata con JavaScript_
