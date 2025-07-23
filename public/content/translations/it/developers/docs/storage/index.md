---
title: Archiviazione Decentralizzata
description: Panoramica di cos'è l'archiviazione decentralizzata e degli strumenti disponibili per integrarla in una dapp.
lang: it
---

A differenza di un server centralizzato gestito da una singola società o organizzazione, il sistema di storage decentralizzato consiste in una rete peer-to-peer di operatori-user che trattengono una porzione di tutti i dati esistenti, creando un sistema resiliente di salvataggio e condivisione di file. Tale sistema può trovarsi in un'applicazione basata sulla blockchain o in qualunque rete peer-to-peer.

Lo stesso Ethereum è utilizzabile come un sistema decentralizzato d'archiviazione e ciò avviene per l'archiviazione del codice in tutti i contratti intelligenti. Ad ogni modo, Ethereum non è stato progettato per gestire grandi quantitativi di dati. La catena Ethereum cresce costantemente e, al momento della redazione di questa pagina, si aggira intorno a 500GB - 1TB ([a seconda del client](https://etherscan.io/chartsync/chaindefault)), ed ogni nodo sulla rete deve essere in grado di memorizzare tutti i dati. Se la catena dovesse espandersi raggiungendo un grosso volume di dati (ad esempio 5TB), non sarebbe possibile continuare l'esecuzione di tutti i nodi. Inoltre, il costo di distribuzione di così tanti dati alla Rete Principale, sarebbe proibitivo a causa delle commissioni del [gas](/developers/docs/gas).

A causa di tali vincoli, necessitiamo di una catena o metodologia diversa per archiviare grandi quantità di dati in modo decentralizzato.

Guardando alle opzioni di archiviazione decentralizzata (dStorage), esistono alcune cose che un utente deve tenere a mente.

- Meccanismo di persistenza / struttura d'incentivazione
- Applicazione della ritenzione dei dati
- Decentralità
- Consenso

## Meccanismo di persistenza / struttura d'incentivazione {#persistence-mechanism}

### Basata sulla blockchain {#blockchain-based}

Affinché un dato persista nel tempo, occorre usare un meccanismo di persistenza. Ad esempio, su Ethereum, il meccanismo di persistenza prevede di tener conto dell'intera catena, operando un nodo. Nuovi pezzi di dati vengono aggiunti alla fine della chain, e questa continua a crescere - richiedendo ad ogni nodo di replicare tutti i dati incorporati.

Questo meccanismo prende il nome di persistenza **basata sulla blockchain**.

Il problema della persistenza basata sulla blockchain è che la chain potrebbe diventare troppo grande per mantenere e memorizzare tutti i dati in modo fattibile (e.g. [molte fonti](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) stimano che, per fare ciò, internet richieda una capacità di archiviazione di oltre 40 Zetabyte).

La blockchain deve anche avere qualche tipo di struttura d'incentivazione. Per la persistenza basata sulla blockchain, esiste un pagamento effettuato al validatore. Quando i dati sono aggiunti alla catena, i validatori sono pagati per aggiungervi i dati.

Le piattaforme con persistenza basata sulla blockchain sono:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Persistenza basata su contratto {#contract-based}

La persistenza **basata sul contratto** si basa sull'intuizione che i dati non possono essere replicati da ogni nodo e memorizzati per sempre, devono invece essere mantenuti con accordi contrattuali. Si tratta di accordi effettuati con più nodi che si sono impegnati a conservare un dato per un certo periodo di tempo. Per far sì che mantengano i dati, devono essere rimborsati o rinnovati ogni volta che scadono.

In gran parte dei casi, invece di archiviare tutti i dati sulla catena, viene memorizzato l'hash che indica la posizione dei dati sulla catena. In questo modo, l'intera catena non deve scalare per mantenere tutti i dati.

Le piattaforme con persistenza basata su contratto sono:

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Rete Crust](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Considerazioni aggiuntive {#additional-consideration}

IPFS è un sistema distribuito per memorizzare e accedere a file, siti web, applicazioni e dati. Non ha un sistema di incentivi incorporato, ma può essere utilizzato con una qualsiasi delle soluzioni di incentivazione basate sul contratto citate prima per una persistenza di maggiore durata. Un altro modo per mantenere i dati su IPFS è quello di lavorare con un servizio di pinning, che "appunta" i dati per te. È possibile anche eseguire il proprio nodo IPFS e contribuire alla rete per conservare i propri dati e/o quelli degli altri gratuitamente!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(servizio di pinning IPFS)_
- [Pinata](https://www.pinata.cloud/) _(servizio di pinning IPFS)_
- [Pinata](https://www.pinata.cloud/) _(servizio di pinning IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(esploratore di pinning di IPFS)_
- [4EVERLAND](https://www.4everland.org/)_（Servizio di pinning IPFS）_
- [Filebase](https://filebase.com) _(Servizio di pinning IPFS)_
- [Spheron Network](https://spheron.network/) _(Servizio di pinning IPFS/Filecoin)_

SWARM è una tecnologia decentralizzata di archiviazione e distribuzione di dati con un sistema di incentivazione di archiviazione e un oracolo del prezzo di affitto della memoria.

## Ritenzione dei dati {#data-retention}

Per conservare i dati, i sistemi devono avere qualche tipo di meccanismo per assicurarsi che i dati vengano conservati.

### Meccanismo di messa alla prova {#challenge-mechanism}

Uno dei metodi più diffusi per verificare l'effettiva conservazione dei dati consiste nell'utilizzare qualche tipo di meccanismo di messa alla prova crittografica applicato ai nodi per accertare che contengano ancora i dati. Un esempio semplice è quello di verificare il proof-of-access di Arweave. I nodi vengono messi alla prova per vedere se contengono i dati sia sul blocco più recente sia su un blocco casuale in passato. Se il nodo non trova la risposta, viene penalizzato.

Tipi di dStorage con meccanismo di messa alla prova:

- Züs
- Skynet
- Arweave
- Filecoin
- Rete Crust
- 4EVERLAND

### Decentralità {#decentrality}

Non esistono strumenti impeccabili per misurare il livello di decentralizzazione delle piattaforme ma, in generale, si tende a ricorrere a strumenti che non utilizzano qualche tipo di KYC per dimostrare di non essere centralizzati.

Strumenti decentralizzati senza KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Rete Crust
- 4EVERLAND

### Consenso {#consensus}

Gran parte di questi strumenti ha la propria versione di un [meccanismo di consenso](/developers/docs/consensus-mechanisms/), ma generalmente si basano su [**proof-of-work (PoW)**](/developers/docs/consensus-mechanisms/pow/) o [**proof-of-stake (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Basata sul proof-of-work:

- Skynet
- Arweave

Basata sul proof-of-stake:

- Ethereum
- Filecoin
- Züs
- Rete Crust

## Strumenti correlati {#related-tools}

**IPFS - _InterPlanetary File System è un sistema decentralizzato di archiviazione e referenziazione dei file per Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Documentazione](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Archiviazione decentralizzata di oggetti su cloud per sviluppatori, sicura, privata e compatibile con S3._**

- [Storj.io](https://storj.io/)
- [Documentazione](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Skynet - _Skynet è una catena di PoW decentralizzata dedicata a un web decentralizzato._**

- [Skynet.net](https://siasky.net/)
- [Documentazione](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin - _Filecoin è stato creato dallo stesso team dietro a IPFS. È un livello d'incentivazione basato sui principi di IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Documentazione](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave è una piattaforma di dStorage per l'archiviazione di dati._**

- [Arweave.org](https://www.arweave.org/)
- [Documentazione](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs è una piattaforma di dStorage in proof-of-stake con sharding e blobber._**

- [zus.network](https://zus.network/)
- [Documentazione](https://0chaindocs.gitbook.io/zus-docs)
- [GitHub](https://github.com/0chain/)

**Rete Crust: _Crust è una piattaforma di dStorage basata su IPFS._**

- [Crust.network](https://crust.network)
- [Documentazione](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Una piattaforma di archiviazione distribuita e un servizio di distribuzione di contenuti per lo stack web3 di Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Documentazione](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Un database peer-to-peer decentralizzato basato su IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Documentazione](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Progetto decentralizzato su cloud (database, archiviazione di file, calcolo e DID). Una combinazione unica di tecnologia peer-to-peer on-chain e off-chain. Compatibilità multi-catena e IPFS._**

- [Aleph.im](https://aleph.im/)
- [Documentazione](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Archiviazione di database IPFS controllata dall'utente per applicazioni impegnative e ricche di dati._**

- [Ceramic.network](https://ceramic.network/)
- [Documentazione](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _archiviazione decentralizzata compatibile con S3 e servizio di pinning IPFS geo-ridondante. Tutti i file caricati in IPFS tramite Filebase sono fissati automaticamente all'infrastruttura di Filebase con replicazione 3x in tutto il globo._**

- [Filebase.com](https://filebase.com/)
- [Documentazione](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND: _Una piattaforma di cloud computing in Web 3.0 che integra archiviazione, calcolo e capacità essenziali di rete, è compatibile con S3 e fornisce l'archiviazione sincrona dei dati su reti di archiviazione decentralizzate quali IPFS e Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Documentazione](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Una piattaforma di blockchain-as-a-service con Nodi IPFS alla pressione di un pulsante_**

- [Kaleido](https://kaleido.io/)
- [Documentazione](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron è una platform-as-a-service (PaaS) progettata per le dApp che desiderano lanciare le proprie applicazioni su infrastrutture decentralizzate con le migliori prestazioni. Fornisce calcolo, archiviazione decentralizzata, CDN e hosting web pronti all'uso._**

- [spheron.network](https://spheron.network/)
- [Documentazione](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Letture consigliate {#further-reading}

- [Cos'è l'archiviazione decentralizzata?](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Sfatiamo cinque falsi miti sull'archiviazione decentralizzata](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Quadri di sviluppo](/developers/docs/frameworks/)
