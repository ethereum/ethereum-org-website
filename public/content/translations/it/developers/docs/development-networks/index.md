---
title: Reti di sviluppo
description: Panoramica delle reti di sviluppo e degli strumenti disponibili per creare applicazioni Ethereum.
lang: it
---

Creando un'applicazione di Ethereum con i contratti intelligenti, vorrai eseguirlo su una rete locale per vedere come funziona, prima di distribuirla.

Come è possibile eseguire un server locale sul computer per lo sviluppo web, allo stesso modo è possibile usare una rete di sviluppo per creare un'istanza di blockchain locale per testare una dapp. Queste reti di sviluppo Ethereum offrono funzionalità che permettono un'iterazione molto più veloce rispetto a una rete di prova pubblica (ad esempio, non è necessario acquisire ETH da un faucet di una rete di prova).

## Prerequisiti {#prerequisites}

È necessario conoscere le [basi dello stack Ethereum](/developers/docs/ethereum-stack/) e delle [reti Ethereum](/developers/docs/networks/) prima di iniziare ad utilizzare le reti di sviluppo.

## Cos'è una rete di sviluppo? {#what-is-a-development-network}

Si tratta essenzialmente di client Ethereum (implementazioni di Ethereum) progettate in modo specifico per lo sviluppo locale.

**Perché allora non eseguire semplicemente un nodo Ethereum locale?**

_Potresti_ [eseguire un nodo](/developers/docs/nodes-and-clients/#running-your-own-node), ma poiché le reti di sviluppo sono costruite per lo sviluppo, spesso includono funzionalità pratiche come:

- Inserimento deterministico dei dati nella tua blockchain locale (es. conti con saldi di ETH)
- Produzione istantanea di blocchi a ogni transazione ricevuta, in ordine e senza ritardi
- Funzionalità di debugging e registrazione avanzate

## Strumenti disponibili {#available-projects}

**Nota**: la maggior parte dei [framework di sviluppo](/developers/docs/frameworks/) include una rete di sviluppo incorporata. Raccomandiamo di iniziare con un framework per [impostare l'ambiente di sviluppo locale](/developers/local-environment/).

### Rete Hardhat {#hardhat-network}

Rete Ethereum locale progettata per lo sviluppo. Permette di distribuire contratti, eseguire test e il debug del codice.

La rete Hardhat è incorporata in Hardhat, un ambiente di sviluppo Ethereum professionale.

- [Sito Web](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### Beacon Chain Locali {#local-beacon-chains}

Alcuni client del consenso sono dotati di strumenti integrati per avviare Beacon Chain locali per scopi di test. Sono disponibili le istruzioni per Lighthouse, Nimbus e Lodestar:

- [Testnet locale usando Lodestar](https://chainsafe.github.io/lodestar/usage/local/)
- [Testnet locale usando Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)
- [Testnet locale usando Nimbus](https://github.com/status-im/nimbus-eth1/blob/master/fluffy/docs/local_testnet.md)

### Catene di prova pubbliche di Ethereum {#public-beacon-testchains}

Esistono anche due implementazioni di prova pubbliche e mantenute di Ethereum: Goerli e Sepolia. La rete di prova consigliata con supporto a lungo termine è Goerli, su cui tutti sono liberi di validare. Anche Sepolia, una catena più nuova e ridotta, dovrebbe essere mantenuta nel futuro prossimo, con una serie di validatori con permessi (a significare che non vi è accesso generale ai nuovi validatori su questa rete di prova). La catena Ropsten dovrebbe diventare obsoleta nel 4° trimestre 2022 e la catena Rinkeby dovrebbe diventare obsoleta tra il 2° e il 3° trimestre del 2023.

- [Launchpad di staking di Goerli](https://goerli.launchpad.ethereum.org/)
- [Annuncio di Deprecazione di Ropsten, Rinkeby e Kiln](https://blog.ethereum.org/2022/06/21/testnet-deprecation)

### Pacchetto Ethereum di Kurtosis {#kurtosis}

Kurtosis è un sistema di produzione per ambienti di prova multi-contenitore che consente agli sviluppatori di avviare localmente istanze riproducibili di reti blockchain.

Il pacchetto Kurtosis di Ethereum è utilizzabile per istanziare rapidamente una rete di prova di Ethereum parametrizzabile, altamente scalabile e privata, su Docker o Kubernetes. Il pacchetto supporta tutti i clienti principali dei Livelli d'Esecuzione (EL) e del Consenso (CL). Kurtosis gestisce comodamente tutte le mappature delle porte locali e le connessioni del servizio per una rete rappresentativa da utilizzare nei flussi di lavoro di convalida e test, relativamente all'infrastruttura principale di Ethereum.

- [Pacchetto rete Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Sito Web](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Documentazione](https://docs.kurtosis.com/)

## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Quadri di sviluppo](/developers/docs/frameworks/)
- [Configura un ambiente di sviluppo locale](/developers/local-environment/)
