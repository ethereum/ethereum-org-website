---
title: Reti di sviluppo
description: Panoramica delle reti di sviluppo e degli strumenti disponibili per creare applicazioni Ethereum.
lang: it
---

Creando un'applicazione di Ethereum con i contratti intelligenti, vorrai eseguirlo su una rete locale per vedere come funziona, prima di distribuirla.

Come è possibile eseguire un server locale sul computer per lo sviluppo web, allo stesso modo è possibile usare una rete di sviluppo per creare un'istanza di blockchain locale per testare una dapp. Queste reti di sviluppo Ethereum offrono funzionalità che permettono un'iterazione molto più veloce rispetto a una rete di prova pubblica (ad esempio, non è necessario acquisire ETH da un faucet di una rete di prova).

## Prerequisiti {#prerequisites}

È necessario comprendere le [basi dello stack di Ethereum](/developers/docs/ethereum-stack/) e delle [reti Ethereum](/developers/docs/networks/) prima di immergersi nelle reti di sviluppo.

## Cos'è una rete di sviluppo? {#what-is-a-development-network}

Si tratta essenzialmente di client Ethereum (implementazioni di Ethereum) progettate in modo specifico per lo sviluppo locale.

**Perché allora non eseguire semplicemente un nodo Ethereum locale?**

_Potresti_ [eseguire un nodo](/developers/docs/nodes-and-clients/#running-your-own-node), ma poiché le reti di sviluppo sono create appositamente per lo sviluppo, spesso includono comode funzionalità come:

- Popolare in modo deterministico la tua blockchain locale con dati (ad es. account con saldi in ETH)
- Produzione istantanea di blocchi a ogni transazione ricevuta, in ordine e senza ritardi
- Funzionalità di debugging e registrazione avanzate

## Strumenti disponibili {#available-projects}

**Nota**: la maggior parte dei [framework di sviluppo](/developers/docs/frameworks/) include una rete di sviluppo integrata. Consigliamo di iniziare con un framework per [impostare l'ambiente di sviluppo locale](/developers/local-environment/).

### Rete Hardhat {#hardhat-network}

Rete Ethereum locale progettata per lo sviluppo. Permette di distribuire contratti, eseguire test e il debug del codice.

La rete Hardhat è incorporata in Hardhat, un ambiente di sviluppo Ethereum professionale.

- [Sito web](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Beacon Chain locali {#local-beacon-chains}

Alcuni client del consenso sono dotati di strumenti integrati per avviare Beacon Chain locali per scopi di test. Sono disponibili le istruzioni per Lighthouse, Nimbus e Lodestar:

- [Rete di test locale con Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Rete di test locale con Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Reti di test pubbliche di Ethereum {#public-beacon-testchains}

Esistono anche due implementazioni di prova pubbliche e mantenute di Ethereum: Sepolia e Hoodi. La rete di test consigliata con supporto a lungo termine è Hoodi, su cui chiunque è libero di convalidare. Sepolia utilizza un set di validatori con autorizzazione, il che significa che non vi è un accesso generale per i nuovi validatori su questa rete di test.

- [Launchpad di staking di Hoodi](https://hoodi.launchpad.ethereum.org/)

### Pacchetto Ethereum di Kurtosis {#kurtosis}

Kurtosis è un sistema di produzione per ambienti di prova multi-contenitore che consente agli sviluppatori di avviare localmente istanze riproducibili di reti blockchain.

Il pacchetto Kurtosis di Ethereum è utilizzabile per istanziare rapidamente una rete di prova di Ethereum parametrizzabile, altamente scalabile e privata, su Docker o Kubernetes. Il pacchetto supporta tutti i clienti principali dei Livelli d'Esecuzione (EL) e del Consenso (CL). Kurtosis gestisce comodamente tutte le mappature delle porte locali e le connessioni del servizio per una rete rappresentativa da utilizzare nei flussi di lavoro di convalida e test, relativamente all'infrastruttura principale di Ethereum.

- [Pacchetto della rete Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Sito web](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Documentazione](https://docs.kurtosis.com/)

## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Framework di sviluppo](/developers/docs/frameworks/)
- [Imposta un ambiente di sviluppo locale](/developers/local-environment/)
