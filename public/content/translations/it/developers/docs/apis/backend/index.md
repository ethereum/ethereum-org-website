---
title: Librerie API di backend
description: Un'introduzione alle API dei client di Ethereum che ti consentono di interagire con la blockchain dalla tua applicazione.
lang: it
---

Affinché un'applicazione software possa interagire con la blockchain di [Ethereum](/) (ovvero, leggere i dati della blockchain e/o inviare transazioni alla rete), deve connettersi a un nodo di Ethereum.

A questo scopo, ogni client di Ethereum implementa la specifica [JSON-RPC](/developers/docs/apis/json-rpc/), in modo che ci sia un insieme uniforme di [metodi](/developers/docs/apis/json-rpc/#json-rpc-methods) su cui le applicazioni possono fare affidamento.

Se desideri utilizzare un linguaggio di programmazione specifico per connetterti a un nodo di Ethereum, ci sono molte librerie di utilità all'interno dell'ecosistema che rendono tutto ciò molto più semplice. Con queste librerie, gli sviluppatori possono scrivere metodi intuitivi di una sola riga per inizializzare richieste JSON-RPC (dietro le quinte) che interagiscono con Ethereum.

## Prerequisiti {#prerequisites}

Potrebbe essere utile comprendere lo [stack di Ethereum](/developers/docs/ethereum-stack/) e i [client di Ethereum](/developers/docs/nodes-and-clients/).

## Perché usare una libreria? {#why-use-a-library}

Queste librerie astraggono gran parte della complessità dell'interazione diretta con un nodo di Ethereum. Forniscono anche funzioni di utilità (ad es. la conversione di ETH in Gwei) in modo che, come sviluppatore, tu possa dedicare meno tempo ad affrontare le complessità dei client di Ethereum e più tempo a concentrarti sulle funzionalità uniche della tua applicazione.

## Librerie disponibili {#available-libraries}

### Infrastruttura e servizi dei nodi {#infrastructure-and-node-services}

**Alchemy -** **_Piattaforma di sviluppo di Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentazione](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_Node-as-a-Service._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentazione](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_API decentralizzate per la rete principale e le reti di test di Ethereum._**

- [blastapi.io](https://blastapi.io/)
- [Documentazione](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Fornisce servizi RPC più efficienti e veloci_**

- [blockpi.io](https://blockpi.io/)
- [Documentazione](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Esploratore di blocchi e API per le transazioni**
- [Documentazione](https://docs.etherscan.io/)

**Blockscout - Esploratore di blocchi open source**
- [Documentazione](https://docs.blockscout.com/)

**GetBlock-** **_Blockchain-as-a-service per lo sviluppo web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentazione](https://docs.getblock.io/)

**Infura -** **_L'API di Ethereum come servizio._**

- [infura.io](https://infura.io)
- [Documentazione](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Provider JSON-RPC EVM conveniente_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentazione](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Nodi completi ed esploratori di blocchi._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentazione](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Infrastruttura blockchain come servizio._**

- [quicknode.com](https://quicknode.com)
- [Documentazione](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API di Ethereum ed Ethereum Classic come servizio basate su software open source._**

- [rivet.cloud](https://rivet.cloud)
- [Documentazione](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nodi di Ethereum orientati alla velocità come API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentazione](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Strumenti di sviluppo {#development-tools}

**ethers-kt -** **_Libreria Kotlin/Java/Android asincrona e ad alte prestazioni per blockchain basate su EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Esempi](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Una libreria di integrazione .NET open source per la blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentazione](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Strumenti Python -** **_Varietà di librerie per l'interazione con Ethereum tramite Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_La piattaforma di sviluppo blockchain definitiva._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentazione](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Una libreria di integrazione Java/Android/Kotlin/Scala per Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentazione](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Servizi blockchain {#blockchain-services}

**BlockCypher -** **_API Web di Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentazione](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Infrastruttura dati web3 all-in-one per Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Documentazione](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Nodi di Ethereum elastici e dedicati come servizio._**

- [chainstack.com](https://chainstack.com)
- [Documentazione](https://docs.chainstack.com/)
- [Riferimento API di Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_API per l'infrastruttura blockchain._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Documentazione](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_Servizi API web3 con la rete principale e le reti di test di Ethereum._**

- [DataHub](https://www.figment.io/)
- [Documentazione](https://docs.figment.io/)

**Moralis -** **_Provider di API EVM di livello aziendale._**

- [moralis.io](https://moralis.io)
- [Documentazione](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_API per dati e per coniare su Ethereum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentazione](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_La piattaforma generale di API blockchain multi-criptovaluta._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentazione](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Fornisce un accesso API semplice e affidabile alla blockchain di Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentazione](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_API di dati blockchain arricchiti in tempo reale su dozzine di catene._**

- [codex.io](https://www.codex.io/)
- [Documentazione](https://docs.codex.io)
- [Esploratore](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_API blockchain arricchite per oltre 200 catene._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentazione](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)
- [Framework di sviluppo](/developers/docs/frameworks/)

## Tutorial correlati {#related-tutorials}

- [Configurare Web3js per usare la blockchain di Ethereum in JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Istruzioni per configurare web3.js nel tuo progetto._
- [Chiamare un contratto intelligente da JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando il token DAI, scopri come chiamare le funzioni dei contratti usando JavaScript._