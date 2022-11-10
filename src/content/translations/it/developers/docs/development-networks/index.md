---
title: Reti di sviluppo
description: Panoramica delle reti di sviluppo e degli strumenti disponibili per creare applicazioni Ethereum.
lang: it
---

Quando si crea un'applicazione Ethereum con Smart Contract, è consigliabile eseguirla prima su una rete locale per vedere come funziona prima di distribuirla.

Come è possibile eseguire un server locale sul computer per lo sviluppo web, allo stesso modo è possibile usare una rete di sviluppo per creare un'istanza di blockchain locale per testare una dapp. Queste reti di sviluppo Ethereum offrono funzionalità che permettono un'iterazione molto più veloce rispetto a una rete di prova pubblica (ad esempio, non è necessario acquisire ETH da un faucet di una rete di prova).

## Prerequisiti {#prerequisites}

È necessario conoscere le [basi dello stack Ethereum](/developers/docs/ethereum-stack/) e delle [reti Ethereum](/developers/docs/networks/) prima di iniziare ad utilizzare le reti di sviluppo.

## Cos'è una rete di sviluppo? {#what-is-a-development-network}

Si tratta essenzialmente di client Ethereum (implementazioni di Ethereum) progettate in modo specifico per lo sviluppo locale.

**Perché allora non eseguire semplicemente un nodo Ethereum locale?**

_Potresti_ [eseguire un nodo](/developers/docs/nodes-and-clients/#running-your-own-node), ma poiché le reti di sviluppo sono costruite per lo sviluppo, spesso includono funzionalità pratiche come:

- Inserire in modo deterministico dati nella blockchain locale (ad esempio account con saldi ETH)
- Eseguire il mining istantaneo di blocchi a ogni transazione ricevuta, in ordine e senza ritardi
- Funzionalità di debugging e registrazione avanzate

## Strumenti disponibili {#available-projects}

**Nota**: la maggior parte dei [framework di sviluppo](/developers/docs/frameworks/) include una rete di sviluppo incorporata. Raccomandiamo di iniziare con un framework per [impostare l'ambiente di sviluppo locale](/developers/local-environment/).

### Ganache {#ganache}

Imposta rapidamente una blockchain Ethereum personale che permette di eseguire test, comandi e ispezionare lo stato durante il controllo del funzionamento della catena.

Ganache offre sia un'applicazione desktop (Ganache UI) che uno strumento da riga di comando (`ganache-cli`). Fa parte della suite di strumenti Truffle.

- [Sito Web](https://www.trufflesuite.com/ganache)
- [GitHub](https://github.com/trufflesuite/ganache)
- [Documentazione](https://www.trufflesuite.com/docs/ganache/overview)

### Rete Hardhat {#hardhat-network}

Rete Ethereum locale progettata per lo sviluppo. Permette di distribuire contratti, eseguire test e il debug del codice.

La rete Hardhat è incorporata in Hardhat, un ambiente di sviluppo Ethereum professionale.

- [Sito Web](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### Beacon Chain Locali {#local-beacon-chains}

Alcuni client del consenso hanno strumenti integrati per avviare beacon chain locali per scopi di test. Sono disponibili le istruzioni per Lighthouse, Nimbus e Lodestar:

- [Testnet locale usando Lodestar](https://chainsafe.github.io/lodestar/usage/local/)
- [Testnet locale usando Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)
- [Testnet locale usando Nimbus](https://github.com/status-im/nimbus-eth1/blob/master/fluffy/docs/local_testnet.md)

### Catene di prova pubbliche di Ethereum {#public-beacon-testchains}

Attualmente esistono inoltre tre implementazioni di prova pubbliche di Ethereum. La rete di prova consigliata con supporto a lungo termine è Goerli. Anche Sepolia dovrebbe essere mantenuta nel futuro prossimo, ma il validatore impostato è autorizzato, il che significare che non sussiste alcun accesso generale ai nuovi validatori su questa rete di prova. La catena di Ropsten dovrebbe essere superata.

- [Launchpad di staking di Goerli](https://goerli.launchpad.ethereum.org/)
- [Launchpad di staking di Ropsten](https://ropsten.launchpad.ethereum.org/)

## Letture consigliate {#further-reading}

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Framework di sviluppo](/developers/docs/frameworks/)
- [Imposta un ambiente di sviluppo locale](/developers/local-environment/)
