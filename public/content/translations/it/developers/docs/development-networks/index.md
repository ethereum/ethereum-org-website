---
title: Reti di sviluppo
description: Una panoramica delle reti di sviluppo e degli strumenti disponibili per aiutare a creare applicazioni Ethereum.
lang: it
---

Quando crei un'applicazione [Ethereum](/) con contratti intelligenti (smart contract), vorrai eseguirla su una rete locale per vedere come funziona prima di distribuirla.

Similmente a come potresti eseguire un server locale sul tuo computer per lo sviluppo web, puoi usare una rete di sviluppo per creare un'istanza locale della blockchain per testare la tua applicazione decentralizzata (dapp). Queste reti di sviluppo Ethereum forniscono funzionalità che consentono un'iterazione molto più rapida rispetto a una testnet pubblica (ad esempio, non devi preoccuparti di acquisire ETH da un faucet della testnet).

## Prerequisiti {#prerequisites}

Dovresti comprendere le [basi dello stack di Ethereum](/developers/docs/ethereum-stack/) e le [reti Ethereum](/developers/docs/networks/) prima di immergerti nelle reti di sviluppo.

## Cos'è una rete di sviluppo? {#what-is-a-development-network}

Le reti di sviluppo sono essenzialmente client Ethereum (implementazioni di Ethereum) progettati specificamente per lo sviluppo locale.

**Perché non eseguire semplicemente un nodo Ethereum standard localmente?**

_Potresti_ [eseguire un nodo](/developers/docs/nodes-and-clients/#running-your-own-node), ma poiché le reti di sviluppo sono create appositamente per lo sviluppo, spesso sono dotate di comode funzionalità come:

- Popolamento deterministico della tua blockchain locale con dati (es. account con saldi in ETH)
- Produzione istantanea di blocchi con ogni transazione che riceve, in ordine e senza ritardi
- Funzionalità avanzate di debug e registrazione (logging)

## Strumenti disponibili {#available-projects}

**Nota**: La maggior parte dei [framework di sviluppo](/developers/docs/frameworks/) include una rete di sviluppo integrata. Consigliamo di iniziare con un framework per [configurare il tuo ambiente di sviluppo locale](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

Una rete Ethereum locale progettata per lo sviluppo. Ti consente di distribuire i tuoi contratti, eseguire i tuoi test ed effettuare il debug del tuo codice.

Hardhat Network è integrata in Hardhat, un ambiente di sviluppo Ethereum per professionisti.

- [Sito web](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Beacon Chain locali {#local-beacon-chains}

Alcuni client di consenso dispongono di strumenti integrati per avviare beacon chain locali a scopo di test. Sono disponibili le istruzioni per Lighthouse, Nimbus e Lodestar:

- [Testnet locale usando Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Testnet locale usando Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Catene di test pubbliche di Ethereum {#public-beacon-testchains}

Esistono anche due implementazioni di test pubbliche mantenute di Ethereum: Sepolia e Hoodi. La testnet consigliata con supporto a lungo termine è Hoodi, su cui chiunque è libero di validare. Sepolia utilizza un set di validatori autorizzato, il che significa che non c'è accesso generale per nuovi validatori su questa testnet.

- [Launchpad di staking di Hoodi](https://hoodi.launchpad.ethereum.org/)

### Pacchetto Ethereum di Kurtosis {#kurtosis}

Kurtosis è un sistema di compilazione per ambienti di test multi-container che consente agli sviluppatori di avviare localmente istanze riproducibili di reti blockchain.

Il pacchetto Ethereum di Kurtosis può essere utilizzato per istanziare rapidamente una testnet Ethereum privata, altamente scalabile e parametrizzabile su Docker o Kubernetes. Il pacchetto supporta tutti i principali client del livello di esecuzione (EL) e del livello di consenso (CL). Kurtosis gestisce in modo elegante tutte le mappature delle porte locali e le connessioni ai servizi per una rete rappresentativa da utilizzare nei flussi di lavoro di validazione e test relativi all'infrastruttura principale di Ethereum.

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

- [Sviluppare e testare dapp con una testnet Ethereum locale multi-client](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Come avviare una testnet Ethereum locale multi-client con Kurtosis per lo sviluppo e il test di dapp._