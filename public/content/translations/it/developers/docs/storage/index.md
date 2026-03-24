---
title: Archiviazione decentralizzata
description: "Panoramica di cos'è l'archiviazione decentralizzata e degli strumenti disponibili per integrarla in una dApp."
lang: it
---

A differenza di un server centralizzato gestito da una singola azienda o organizzazione, i sistemi di archiviazione decentralizzata consistono in una rete peer-to-peer di utenti-operatori che detengono una porzione dei dati complessivi, creando un sistema di condivisione e archiviazione di file resiliente. Questi possono trovarsi in un'applicazione basata su blockchain o in qualsiasi rete basata su peer-to-peer.

Ethereum stesso può essere utilizzato come sistema di archiviazione decentralizzata, e lo è quando si tratta di archiviare il codice in tutti i contratti intelligenti. Tuttavia, quando si tratta di grandi quantità di dati, non è per questo che Ethereum è stato progettato. La catena è in costante crescita, ma al momento della stesura, la catena di Ethereum è di circa 500GB - 1TB ([a seconda del client](https://etherscan.io/chartsync/chaindefault)), e ogni nodo sulla rete deve essere in grado di archiviare tutti i dati. Se la catena dovesse espandersi a grandi quantità di dati (diciamo 5TB) non sarebbe fattibile per tutti i nodi continuare a funzionare. Inoltre, il costo di distribuzione di una tale quantità di dati sulla rete principale sarebbe proibitivo a causa delle commissioni del [gas](/developers/docs/gas).

A causa di questi vincoli, abbiamo bisogno di una catena o metodologia diversa per archiviare grandi quantità di dati in modo decentralizzato.

Quando si esaminano le opzioni di archiviazione decentralizzata (dStorage), ci sono alcune cose che un utente deve tenere a mente.

- Meccanismo di persistenza / struttura degli incentivi
- Applicazione della conservazione dei dati
- Decentralizzazione
- Consenso

## Meccanismo di persistenza / struttura degli incentivi {#persistence-mechanism}

### Basato su blockchain {#blockchain-based}

Affinché un dato persista per sempre, dobbiamo utilizzare un meccanismo di persistenza. Ad esempio, su Ethereum, il meccanismo di persistenza prevede che l'intera catena debba essere presa in considerazione quando si esegue un nodo. Nuovi dati vengono aggiunti alla fine della catena, che continua a crescere, richiedendo a ogni nodo di replicare tutti i dati incorporati.

Questa è nota come persistenza **basata su blockchain**.

Il problema con la persistenza basata su blockchain è che la catena potrebbe diventare troppo grande per mantenere e archiviare tutti i dati in modo fattibile (ad es., [molte fonti](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) stimano che Internet richieda oltre 40 Zettabyte di capacità di archiviazione).

La blockchain deve anche avere un qualche tipo di struttura degli incentivi. Per la persistenza basata su blockchain, viene effettuato un pagamento al validatore. Quando i dati vengono aggiunti alla catena, i validatori vengono pagati per aggiungervi i dati.

Piattaforme con persistenza basata su blockchain:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Basato su contratti {#contract-based}

La persistenza **basata su contratti** si fonda sull'intuizione che i dati non possono essere replicati da ogni nodo e archiviati per sempre, ma devono invece essere mantenuti tramite accordi contrattuali. Si tratta di accordi stipulati con più nodi che hanno promesso di conservare un dato per un periodo di tempo. Devono essere rimborsati o rinnovati ogni volta che scadono per mantenere i dati persistenti.

Nella maggior parte dei casi, invece di archiviare tutti i dati on-chain, viene archiviato l'hash della posizione in cui si trovano i dati su una catena. In questo modo, l'intera catena non ha bisogno di scalare per conservare tutti i dati.

Piattaforme con persistenza basata su contratti:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Considerazioni aggiuntive {#additional-consideration}

IPFS è un sistema distribuito per l'archiviazione e l'accesso a file, siti web, applicazioni e dati. Non ha uno schema di incentivi integrato, ma può invece essere utilizzato con una qualsiasi delle soluzioni di incentivi basate su contratti di cui sopra per una persistenza a lungo termine. Un altro modo per rendere persistenti i dati su IPFS è lavorare con un servizio di pinning, che "fisserà" (pin) i tuoi dati per te. Puoi persino eseguire il tuo nodo IPFS e contribuire alla rete per rendere persistenti i tuoi dati e/o quelli di altri gratuitamente!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(servizio di pinning IPFS)_
- [web3.storage](https://web3.storage/) _(servizio di pinning IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(servizio di pinning IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(esploratore di pinning IPFS)_
- [4EVERLAND](https://www.4everland.org/)_（servizio di pinning IPFS）_
- [Filebase](https://filebase.com) _(Servizio di pinning IPFS)_
- [Spheron Network](https://spheron.network/) _(servizio di pinning IPFS/Filecoin)_

SWARM è una tecnologia di archiviazione e distribuzione dei dati decentralizzata con un sistema di incentivi per l'archiviazione e un oracolo per il prezzo di affitto dell'archiviazione.

## Conservazione dei dati {#data-retention}

Al fine di conservare i dati, i sistemi devono avere una sorta di meccanismo per assicurarsi che i dati vengano conservati.

### Meccanismo di sfida {#challenge-mechanism}

Uno dei modi più popolari per assicurarsi che i dati vengano conservati è utilizzare un qualche tipo di sfida crittografica che viene inviata ai nodi per assicurarsi che abbiano ancora i dati. Un esempio semplice è la prova di accesso (proof-of-access) di Arweave. Emettono una sfida ai nodi per vedere se hanno i dati sia nel blocco più recente che in un blocco casuale nel passato. Se il nodo non riesce a fornire la risposta, viene penalizzato.

Tipi di dStorage con un meccanismo di sfida:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Decentralizzazione {#decentrality}

Non ci sono ottimi strumenti per misurare il livello di decentralizzazione delle piattaforme, ma in generale, vorrai utilizzare strumenti che non abbiano alcuna forma di KYC per fornire prove che non siano centralizzati.

Strumenti decentralizzati senza KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Consenso {#consensus}

La maggior parte di questi strumenti ha la propria versione di un [meccanismo di consenso](/developers/docs/consensus-mechanisms/), ma generalmente si basano sulla [**prova di lavoro (PoW)**](/developers/docs/consensus-mechanisms/pow/) o sulla [**prova di stake (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Basati sulla prova di lavoro:

- Skynet
- Arweave

Basati sulla prova di stake:

- Ethereum
- Filecoin
- Züs
- Crust Network

## Strumenti correlati {#related-tools}

**IPFS - _L'InterPlanetary File System è un sistema di archiviazione decentralizzata e di riferimento ai file per Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Documentazione](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Archiviazione di oggetti cloud decentralizzata sicura, privata e compatibile con S3 per sviluppatori._**

- [Storj.io](https://storj.io/)
- [Documentazione](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _Sfrutta la crittografia per creare un mercato di archiviazione cloud trustless, consentendo ad acquirenti e venditori di effettuare transazioni direttamente._**

- [Skynet.net](https://sia.tech/)
- [Documentazione](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin è stato creato dallo stesso team dietro IPFS. È un livello di incentivi basato sugli ideali di IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Documentazione](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave è una piattaforma dStorage per l'archiviazione dei dati._**

- [Arweave.org](https://www.arweave.org/)
- [Documentazione](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs è una piattaforma dStorage basata sulla prova di stake con frammentazione e blobber._**

- [zus.network](https://zus.network/)
- [Documentazione](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust è una piattaforma dStorage basata su IPFS._**

- [Crust.network](https://crust.network)
- [Documentazione](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Una piattaforma di archiviazione distribuita e un servizio di distribuzione di contenuti per lo stack web3 di Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Documentazione](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Un database peer-to-peer decentralizzato basato su IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Documentazione](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Progetto cloud decentralizzato (database, archiviazione di file, calcolo e DID). Una miscela unica di tecnologia peer-to-peer fuori catena e on-chain. Compatibilità con IPFS e multi-chain._**

- [Aleph.im](https://aleph.cloud/)
- [Documentazione](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Archiviazione di database IPFS controllata dall'utente per applicazioni ricche di dati e coinvolgenti._**

- [Ceramic.network](https://ceramic.network/)
- [Documentazione](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _Archiviazione decentralizzata compatibile con S3 e servizio di pinning IPFS geo-ridondante. Tutti i file caricati su IPFS tramite Filebase vengono automaticamente fissati (pinned) all'infrastruttura Filebase con una replica 3x in tutto il mondo._**

- [Filebase.com](https://filebase.com/)
- [Documentazione](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Una piattaforma di cloud computing Web 3.0 che integra funzionalità principali di archiviazione, calcolo e rete, è compatibile con S3 e fornisce archiviazione dati sincrona su reti di archiviazione decentralizzata come IPFS e Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Documentazione](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Una piattaforma blockchain-as-a-service con nodi IPFS attivabili con un clic_**

- [Kaleido](https://kaleido.io/)
- [Documentazione](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron è una platform-as-a-service (PaaS) progettata per le dApp che desiderano lanciare le proprie applicazioni su un'infrastruttura decentralizzata con le migliori prestazioni. Fornisce calcolo, archiviazione decentralizzata, CDN e web hosting pronti all'uso._**

- [spheron.network](https://spheron.network/)
- [Documentazione](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Letture consigliate {#further-reading}

- [Cos'è l'archiviazione decentralizzata?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Sfatare cinque miti comuni sull'archiviazione decentralizzata](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Framework di sviluppo](/developers/docs/frameworks/)