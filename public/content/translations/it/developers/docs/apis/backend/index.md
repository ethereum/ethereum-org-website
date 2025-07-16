---
title: Librerie API di backend
description: Introduzione alle API client di Ethereum che permettono l'interazione tra un'applicazione con la blockchain.
lang: it
---

Per interagire con la blockchain Ethereum (ad esempio leggere i dati della blockchain e/o inviare transazioni alla rete), un'applicazione software deve connettersi a un nodo Ethereum.

A tale scopo, ogni client di Ethereum implementa la specifica [JSON-RPC](/developers/docs/apis/json-rpc/), così che esista una serie uniforme di [metodi](/developers/docs/apis/json-rpc/#json-rpc-methods) a cui le applicazioni possano affidarsi.

Se desideri utilizzare un linguaggio di programmazione specifico per connetterti a un nodo Ethereum, sviluppa una soluzione personalizzata, ma tieni presente che ci sono già molte librerie all'interno dell'ecosistema che possono facilitarti la vita. Con queste librerie, gli sviluppatori possono scrivere metodi a una riga intuitivi per inizializzare le richieste RPC JSON (under the hood) che interagiscono con Ethereum.

## Prerequisiti {#prerequisites}

Potrebbe essere utile comprendere meglio lo [stack di Ethereum](/developers/docs/ethereum-stack/) e[i client di Ethereum](/developers/docs/nodes-and-clients/).

## Perché usare una libreria? {#why-use-a-library}

Queste librerie eliminano buona parte della complessità legata al dover interagire direttamente con un nodo Ethereum. Forniscono inoltre funzioni di utilità (ad esempio conversione da ETH a Gwei) in modo da ridurre il tempo necessario per districarsi tra le complessità dei client Ethereum e potersi concentrare sulle funzionalità uniche dell'applicazione.

## Librerie disponibili {#available-libraries}

### Servizi per infrastrutture e nodi {#infrastructure-and-node-services}

**Alchemy -** **_Piattaforma di sviluppo Ethereum_**

- [alchemy.com](https://www.alchemy.com/)
- [Documentazione](https://docs.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Node-as-a-Service._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentazione](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_API decentralizzate per la rete principale e le reti di prova di Ethereum._**

- [blastapi.io](https://blastapi.io/)
- [Documentazione](https://docs.blastapi.io)
- [Discord](https://discord.gg/bwarelabs)

**BlockPi -** **_Fornire servizi RPC più efficienti e veloci_**

- [blockpi.io](https://blockpi.io/)
- [Documentazione](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Gateway Ethereum Cloudflare**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Esploratore di Blocchi e API di transazione**
- [Documentazione](https://docs.etherscan.io/)

**GetBlock-** **_Blockchain-as-a-service per lo sviluppo Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentazione](https://getblock.io/docs/)

**Infura -** **_L'API Ethereum come servizio_**

- [infura.io](https://infura.io)
- [Documentazione](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Conveniente fornitore di RPC-JSON dell'EVM_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentazione](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Nodi completi ed esploratori di blocchi._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentazione](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**QuickNode -** **_Infrastruttura della Blockchain come servizio._**

- [quicknode.com](https://quicknode.com)
- [Documentazione](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API di Ethereum ed Ethereum Classic come servizio, supportate da software open source._**

- [rivet.cloud](https://rivet.cloud)
- [Documentazione](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nodi di Ethereum orientati alla velocità come l'API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentazione](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Strumenti di sviluppo {#development-tools}

**ethers-kt -** **_Libreria asincrona e ad alte prestazioni per Kotlin/Java/Android per le blockchain basate sull'EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Esempi](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Una libreria di integrazione .NET open source per la blockchain_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentazione](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Strumenti Python -** **_Diverse librerie per interagire con Ethereum tramite Python_**

- [py.ethereum.org](https://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**QuikNode -** **_La piattaforma definitiva per sviluppatori di blockchain_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentazione](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Libreria di integrazione di Java/Android/Kotlin/Scala per Ethereum_**

- [GitHub](https://github.com/web3j/web3j)
- [Docs](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Servizi della blockchain {#blockchain-services}

**BlockCypher -** **_API Web Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentazione](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Infrastruttura dati web3 tutto in uno per Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Documentazione](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Catainstack -** **_Nodi di Ethereum elastici e dedicati come servizio_**

- [chainstack.com](https://chainstack.com)
- [Documentazione](https://docs.chainbase.com/docs)
- [Riferimento all'API di Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Nodo cloud di Coinbase-** **_API per l'infrastruttura della Blockchain._**

- [Nodo in cloud di Coinbase](https://www.coinbase.com/cloud)
- [Documentazione](https://docs.cloud.coinbase.com/)

**DataHub di Figment -** **_Servizi API Web3 con la Rete principale e le reti di prova di Ethereum._**

- [DataHub](https://www.figment.io/)
- [Documentazione](https://docs.figment.io/)

**Moralis**: **_Fornitore di API EVM di livello enterprise._**

- [moralis.io](https://moralis.io)
- [Documentazione](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_Dati di Ethereum e API di Mint._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentazione](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_La piattaforma generale per API blockchain multi-criptovaluta._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentazione](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Accesso semplice e affidabile delle API alla blockchain di Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentazione](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_API della blockchain arricchite per oltre 200 catene._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentazione](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [ Nodi e client](/developers/docs/nodes-and-clients/)
- [Quadri di sviluppo](/developers/docs/frameworks/)

## Tutorial correlati {#related-tutorials}

- [Set up Web3js to use the Ethereum blockchain in JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Istruzioni per impostare web3.js in un progetto._
- [Calling a Smart Contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando il token DAI, impara come funzionano i contratti di chiamata con JavaScript_
