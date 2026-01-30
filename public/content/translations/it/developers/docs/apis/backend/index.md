---
title: Librerie API di backend
description: Introduzione alle API client di Ethereum che permettono l'interazione tra un'applicazione con la blockchain.
lang: it
---

Per interagire con la blockchain di Ethereum (ad esempio, leggere i dati della blockchain e/o inviare transazioni alla rete), un'applicazione software deve connettersi a un nodo Ethereum.

A tale scopo, ogni client di Ethereum implementa la specifica [JSON-RPC](/developers/docs/apis/json-rpc/), in modo che esista una serie uniforme di [metodi](/developers/docs/apis/json-rpc/#json-rpc-methods) a cui le applicazioni possano affidarsi.

Se desideri utilizzare un linguaggio di programmazione specifico per connetterti a un nodo Ethereum, sviluppa una soluzione personalizzata, ma tieni presente che ci sono già molte librerie all'interno dell'ecosistema che possono facilitarti la vita. Con queste librerie, gli sviluppatori possono scrivere metodi a una riga intuitivi per inizializzare le richieste RPC JSON (under the hood) che interagiscono con Ethereum.

## Prerequisiti {#prerequisites}

Potrebbe essere utile comprendere lo [stack di Ethereum](/developers/docs/ethereum-stack/) e i [client di Ethereum](/developers/docs/nodes-and-clients/).

## Perché usare una libreria? {#why-use-a-library}

Queste librerie eliminano buona parte della complessità legata al dover interagire direttamente con un nodo Ethereum. Forniscono anche funzioni di utilità (ad es. la conversione di ETH in Gwei), così che uno sviluppatore possa dedicare meno tempo alle complessità dei client di Ethereum e più tempo alle funzionalità uniche della propria applicazione.

## Librerie disponibili {#available-libraries}

### Infrastruttura e servizi per i nodi {#infrastructure-and-node-services}

**Alchemy -** **_Piattaforma di sviluppo di Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentazione](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Nodo come servizio._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentazione](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_API decentralizzate per la Rete Principale di Ethereum e le reti di test._**

- [blastapi.io](https://blastapi.io/)
- [Documentazione](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Fornisce servizi RPC più efficienti e veloci_**

- [blockpi.io](https://blockpi.io/)
- [Documentazione](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Gateway Ethereum di Cloudflare.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Esploratore di Blocchi e API di transazione**

- [Documentazione](https://docs.etherscan.io/)

**Blockscout - Esploratore di blocchi open source**

- [Documentazione](https://docs.blockscout.com/)

**GetBlock -** **_Blockchain come servizio per lo sviluppo Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentazione](https://docs.getblock.io/)

**Infura -** **_L'API di Ethereum come servizio._**

- [infura.io](https://infura.io)
- [Documentazione](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Fornitore EVM JSON-RPC conveniente_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentazione](https://docs.noderpc.xyz/node-rpc)

**NOWNodes -** **_Nodi completi ed esploratori di blocchi._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentazione](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Infrastruttura blockchain come servizio._**

- [quicknode.com](https://quicknode.com)
- [Documentazione](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API di Ethereum ed Ethereum Classic come servizio, basate su software open source._**

- [rivet.cloud](https://rivet.cloud)
- [Documentazione](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nodi Ethereum orientati alla velocità come API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentazione](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Strumenti di sviluppo {#development-tools}

**ethers-kt -** **_Libreria asincrona e ad alte prestazioni per Kotlin/Java/Android per le blockchain basate sull'EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Esempi](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Una libreria di integrazione .NET open source per la blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentazione](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Varietà di librerie per l'interazione con Ethereum tramite Python._**

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

**BlockCypher -** **_API web di Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentazione](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Infrastruttura dati Web3 tutto in uno per Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Documentazione](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Nodi Ethereum elastici e dedicati come servizio._**

- [chainstack.com](https://chainstack.com)
- [Documentazione](https://docs.chainstack.com/)
- [Riferimento API di Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_API di infrastruttura blockchain._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Documentazione](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_Servizi API Web3 con la Rete Principale di Ethereum e le reti di test._**

- [DataHub](https://www.figment.io/)
- [Documentazione](https://docs.figment.io/)

**Moralis -** **_Fornitore di API EVM di livello enterprise._**

- [moralis.io](https://moralis.io)
- [Documentazione](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_API di dati e minting di Ethereum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentazione](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_La piattaforma generale per API blockchain multi-criptovaluta._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentazione](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Fornisce un accesso API semplice e affidabile alla blockchain di Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentazione](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_API blockchain arricchite per oltre 200 catene._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentazione](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)
- [Framework di sviluppo](/developers/docs/frameworks/)

## Guide correlate {#related-tutorials}

- [Configurare Web3js per usare la blockchain di Ethereum in JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Istruzioni per configurare web3.js nel proprio progetto._
- [Chiamare un contratto intelligente da JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando il token DAI, scopri come chiamare le funzioni dei contratti usando JavaScript._
