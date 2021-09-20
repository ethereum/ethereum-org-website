---
title: Librerie API di backend
description: Introduzione alle API client di Ethereum che permettono l'interazione tra un'applicazione con la blockchain.
lang: it
sidebar: true
---

Per interagire con la blockchain Ethereum (ad esempio leggere i dati della blockchain e/o inviare transazioni alla rete), un'applicazione software deve connettersi a un nodo Ethereum.

A questo scopo, ogni client Ethereum implementa la specifica JSON-RPC, così che ci sia un set uniforme di endpoint a cui le applicazioni possono fare riferimento.

Se desideri utilizzare un linguaggio di programmazione specifico per connetterti a un nodo Ethereum, sviluppa una soluzione personalizzata, ma tieni presente che ci sono già molte librerie all'interno dell'ecosistema che possono facilitarti la vita. Con queste librerie, gli sviluppatori possono scrivere metodi a una riga intuitivi per inizializzare le richieste RPC JSON (under the hood) che interagiscono con Ethereum.

## Prerequisiti {#prerequisites}

Potrebbe essere utile conoscere meglio lo [stack di Ethereum](/developers/docs/ethereum-stack/) e[i client di Ethereum](/docs/nodes-and-clients/).

## Perché usare una libreria? {#why-use-a-library}

Queste librerie eliminano buona parte della complessità legata al dover interagire direttamente con un nodo Ethereum. Forniscono inoltre funzioni di utilità (ad esempio conversione da ETH a Gwei) in modo da ridurre il tempo necessario per districarsi tra le complessità dei client Ethereum e potersi concentrare sulle funzionalità uniche dell'applicazione.

## Librerie disponibili {#available-libraries}

<!-- TODO separate APIs-as-a-service vs. connect your own -->

**Alchemy -** **_Piattaforma di sviluppo Ethereum_**

- [alchemyapi.io](https://alchemyapi.io)
- [Documentazione](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.gg/kwqVnrA)

**BlockCypher -** **_API Web Ethereum_**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentazione](https://www.blockcypher.com/dev/ethereum/)

**Infura -** **_L'API Ethereum come servizio_**

- [infura.io](https://infura.io)
- [Documentazione](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Gateway Ethereum Cloudflare**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith -** **_Accesso API JSON-RPC alla rete principale e alle reti di prova Ethereum_**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Documentazione](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_Esegui un servizio API Ethereum personalizzato supportando sia ETH che ETC_**

- [ethercluster.com](https://www.ethercluster.com/)

**Catainstack -** **_Nodi Ethereum condivisi e dedicati come servizio_**

- [chainstack.com](https://chainstack.com)
- [Documentazione](https://docs.chainstack.com)

**QuikNode -** **_Piattaforma per sviluppatori di blockchain_**

- [quiknode.io](https://quiknode.io)

**Strumenti Python -** **_Diverse librerie per interagire con Ethereum tramite Python_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**web3j -** **_Libreria di integrazione Java/Android/Kotlin/Scala per Ethereum_**

- [GitHub](https://github.com/web3j/web3j)
- [Documenti](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_API Ethereum ed Ethereum Classic cine servizio, supportate da software open source_**

- [rivet.cloud](https://rivet.cloud)
- [Documentazione](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_Una libreria di integrazione .NET open source per la blockchain_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentazione](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

## Letture consigliate {#further-reading}

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)
- [Framework di sviluppo](/developers/docs/frameworks/)

## Tutorial correlati {#related-tutorials}

- [Set up Web3js to use the Ethereum blockchain in Javascript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Istruzioni per utilizzare e configurare web3.js in un progetto_
- [Calling a Smart Contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando il token Dai, impara a chiamare le funzioni dei contratti con JavaScript_
