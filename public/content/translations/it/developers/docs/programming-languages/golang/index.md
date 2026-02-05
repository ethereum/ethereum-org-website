---
title: Ethereum per sviluppatori Go
description: Scopri come sviluppare per Ethereum usando progetti e strumenti basati su Go
lang: it
incomplete: true
---

<FeaturedText>Scopri come sviluppare per Ethereum utilizzando progetti e strumenti basati su Go</FeaturedText>

Usa Ethereum per creare applicazioni decentralizzate (o "dapp"). Queste dapp sono attendibili perché, una volta "caricate" su Ethereum, vengono eseguite sempre come sono state programmate. Sono decentralizzate, significa che sono eseguite su una rete peer-to-peer e non esiste un punto di errore singolo. Nessun ente o persona le controlla e sono quasi impossibili da censurare. Possono controllare risorse digitali in modo da creare nuovi tipi di applicazioni.

## Iniziare con i contratti intelligenti e il linguaggio Solidity {#getting-started-with-smart-contracts-and-solidity}

**Operazioni di base per integrare Go con Ethereum**

Ti servono prima le nozioni di base? Consulta [ethereum.org/learn](/learn/) o [ethereum.org/developers](/developers/).

- [Blockchain spiegate](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Comprendere i contratti intelligenti](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Scrivi il tuo primo contratto intelligente](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Impara a compilare e distribuire Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Tutorial sui contratti](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Articoli e libri per principianti {#beginner-articles-and-books}

- [Introduzione a Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Usa Golang per connetterti a Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Distribuire contratti intelligenti di Ethereum usando Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Una guida passo passo per testare e distribuire contratti intelligenti di Ethereum in Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Sviluppo di Ethereum con Go](https://goethereumbook.org/) - _Sviluppa applicazioni Ethereum con Go_

## Articoli e documenti intermedi {#intermediate-articles-and-docs}

- [Documentazione di Go Ethereum](https://geth.ethereum.org/docs/) - _La documentazione per il Golang ufficiale di Ethereum_
- [Guida del programmatore di Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Guida illustrata che include l'albero di stato, le multi-prove e l'elaborazione delle transazioni_
- [Erigon e Ethereum senza stato](https://youtu.be/3-Mn7OckSus?t=394) - _Conferenza della Community di Ethereum 2020 (EthCC 3)_
- [Erigon: ottimizzare i client di Ethereum](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _Devcon 4 del 2018_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Creare una dApp in Go con Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Lavorare con una rete privata di Ethereum con Golang e Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Test unitari di contratti Solidity su Ethereum con Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Guida di riferimento rapida per l'uso di Geth come libreria](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Modelli di utilizzo avanzati {#advanced-use-patterns}

- [Il Backend simulato di GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [App Blockchain-as-a-Service con Ethereum e Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Archiviazione distribuita IPFS e Swarm nelle applicazioni Blockchain di Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Client mobili: Librerie e Nodi Ethereum Inproc](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [dApp native: binding di Go a contratti Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Progetti e strumenti Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Implementazione ufficiale Go del protocollo Ethereum_
- [Analisi del codice di Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Revisione e analisi del codice sorgente di Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Derivato più veloce di Go Ethereum, con un focus sui nodi di archivio_
- [Golem](https://github.com/golemfactory/golem) - _Golem sta creando un mercato globale per la potenza di calcolo_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Un'implementazione con permessi di Ethereum a supporto della privacy dei dati_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Implementazione Go di Ethereum 'Serenity' 2.0_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Twitter decentralizzato: un servizio di microblogging in esecuzione sulla blockchain di Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Implementazione ed estensione Golang della specifica Minimum Viable Plasma_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _Una mining pool di Ethereum open source_
- [Portafoglio HD di Ethereum](https://github.com/miguelmota/go-ethereum-hdwallet) - _Derivazioni del portafoglio HD di Ethereum in Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Supporto per molti tipi di reti Ethereum_
- [Client leggero di Geth](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Implementazione di Geth del Light Ethereum Subprotocol_
- [SDK Golang di Ethereum](https://github.com/everFinance/goether) - _Una semplice implementazione del portafoglio Ethereum e utilità in Golang_
- [SDK Golang di Covalent](https://github.com/covalenthq/covalent-api-sdk-go) - _Accesso efficiente ai dati della blockchain tramite SDK Go per oltre 200 blockchain_

Cerchi altre risorse? Dai un'occhiata a [ethereum.org/developers](/developers/)

## Collaboratori della community di Go {#go-community-contributors}

- [Discord di Geth](https://discordapp.com/invite/nthXNEv)
- [Gitter di Geth](https://gitter.im/ethereum/go-ethereum)
- [Slack di Gophers](https://invite.slack.golangbridge.org/) - [canale #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Gitter di Multi Geth](https://gitter.im/ethoxy/multi-geth)
- [Gitter di Ethereum](https://gitter.im/ethereum/home)
- [Gitter del client leggero di Geth](https://gitter.im/ethereum/light-client)

## Altri elenchi aggregati {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: un elenco definitivo degli strumenti per sviluppatori di Ethereum](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Sorgente su GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)
