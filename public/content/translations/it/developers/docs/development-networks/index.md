---
title: Reti di sviluppo
description: Una panoramica delle reti di sviluppo e degli strumenti disponibili per aiutare a creare applicazioni su Ethereum.
lang: it
---

Quando si crea un'applicazione [Ethereum](/) con contratti intelligenti, è consigliabile eseguirla su una rete locale per vederne il funzionamento prima di distribuirla.

Similmente a come si potrebbe eseguire un server locale sul proprio computer per lo sviluppo web, è possibile utilizzare una rete di sviluppo per creare un'istanza locale della blockchain per testare la propria dApp. Queste reti di sviluppo di Ethereum forniscono funzionalità che consentono un'iterazione molto più rapida rispetto a una rete di test pubblica (ad esempio, non è necessario preoccuparsi di acquisire ETH da un rubinetto della rete di test).

## Prerequisiti {#prerequisites}

Dovresti comprendere le [basi dello stack di Ethereum](/developers/docs/ethereum-stack/) e le [reti di Ethereum](/developers/docs/networks/) prima di immergerti nelle reti di sviluppo.

## Cos'è una rete di sviluppo? {#what-is-a-development-network}

Le reti di sviluppo sono essenzialmente client di Ethereum (implementazioni di Ethereum) progettati specificamente per lo sviluppo locale.

**Perché non eseguire semplicemente un nodo standard di Ethereum localmente?**

_Potresti_ [eseguire un nodo](/developers/docs/nodes-and-clients/#running-your-own-node) ma, poiché le reti di sviluppo sono create appositamente per lo sviluppo, spesso sono dotate di comode funzionalità come:

- Popolamento deterministico della blockchain locale con dati (es. account con saldi in ETH)
- Produzione istantanea di blocchi con ogni transazione che riceve, in ordine e senza ritardi
- Funzionalità avanzate di debug e registrazione (logging)

## Strumenti disponibili {#available-projects}

**Nota**: La maggior parte dei [framework di sviluppo](/developers/docs/frameworks/) include una rete di sviluppo integrata. Consigliamo di iniziare con un framework per [configurare il tuo ambiente di sviluppo locale](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

Una rete Ethereum locale progettata per lo sviluppo. Ti consente di distribuire i tuoi contratti, eseguire i tuoi test ed effettuare il debug del tuo codice.

Hardhat Network è integrata in Hardhat, un ambiente di sviluppo Ethereum per professionisti.

- [Sito web](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Beacon chain locali {#local-beacon-chains}

Alcuni client di consenso dispongono di strumenti integrati per avviare beacon chain locali a scopo di test. Sono disponibili le istruzioni per Lighthouse, Nimbus e Lodestar:

- [Rete di test locale usando Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Rete di test locale usando Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Catene di test pubbliche di Ethereum {#public-beacon-testchains}

Esistono anche due implementazioni di test pubbliche mantenute di Ethereum: Sepolia e Hoodi. La rete di test consigliata con supporto a lungo termine è Hoodi, su cui chiunque è libero di validare. Sepolia utilizza un set di validatori autorizzati, il che significa che non c'è accesso generale per nuovi validatori su questa rete di test.

- [Launchpad di staking di Hoodi](https://hoodi.launchpad.ethereum.org/)

### Pacchetto Ethereum Kurtosis {#kurtosis}

Kurtosis è un sistema di compilazione per ambienti di test multi-container che consente agli sviluppatori di avviare localmente istanze riproducibili di reti blockchain.

Il pacchetto Ethereum Kurtosis può essere utilizzato per istanziare rapidamente una rete di test di Ethereum parametrizzabile, altamente scalabile e privata su Docker o Kubernetes. Il pacchetto supporta tutti i principali client del livello di esecuzione (EL) e del livello di consenso (CL). Kurtosis gestisce in modo elegante tutte le mappature delle porte locali e le connessioni ai servizi per una rete rappresentativa da utilizzare nei flussi di lavoro di validazione e test relativi all'infrastruttura principale di Ethereum.

- [Pacchetto di rete Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Sito web](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Documentazione](https://docs.kurtosis.com/)

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Framework di sviluppo](/developers/docs/frameworks/)
- [Configurare un ambiente di sviluppo locale](/developers/local-environment/)

## Tutorial: Reti di sviluppo e ambienti di test su Ethereum {#tutorials}

- [Sviluppare e testare dApp con una rete di test locale multi-client di Ethereum](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Come avviare una rete di test locale multi-client di Ethereum con Kurtosis per lo sviluppo e il test di dApp._