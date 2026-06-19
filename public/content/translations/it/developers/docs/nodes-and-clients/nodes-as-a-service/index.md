---
title: Nodi come servizio
description: "Una panoramica di base sui servizi di nodi, i pro e i contro e i fornitori più popolari."
lang: it
sidebarDepth: 2
---

## Introduzione {#introduction}

Eseguire il proprio [nodo Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) può essere impegnativo, specialmente quando si è agli inizi o durante una rapida scalabilità. Esistono [diversi servizi](#popular-node-services) che gestiscono infrastrutture di nodi ottimizzate al posto tuo, in modo che tu possa concentrarti sullo sviluppo della tua applicazione o del tuo prodotto. Spiegheremo come funzionano i servizi di nodi, i pro e i contro del loro utilizzo ed elencheremo i fornitori se sei interessato a iniziare.

## Prerequisiti {#prerequisites}

Se non hai ancora compreso cosa siano i nodi e i client, dai un'occhiata a [Nodi e client](/developers/docs/nodes-and-clients/).

## Staker {#stakoooooooooooooors}

Gli staker solitari devono eseguire la propria infrastruttura piuttosto che affidarsi a fornitori di terze parti. Ciò significa eseguire un client di esecuzione accoppiato a un client di consenso. Prima de [The Merge](/roadmap/merge), era possibile eseguire solo un client di consenso e utilizzare un fornitore centralizzato per i dati di esecuzione; questo non è più possibile: uno staker solitario deve eseguire entrambi i client. Tuttavia, sono disponibili servizi per facilitare questo processo.

[Maggiori informazioni sull'esecuzione di un nodo](/developers/docs/nodes-and-clients/run-a-node/).

I servizi descritti in questa pagina sono per nodi che non fanno staking.

## Come funzionano i servizi di nodi? {#how-do-node-services-work}

I fornitori di servizi di nodi eseguono client di nodi distribuiti dietro le quinte al posto tuo, così non devi farlo tu.

Questi servizi in genere forniscono una chiave API che puoi utilizzare per scrivere e leggere dalla blockchain. Spesso includono l'accesso alle [testnet di Ethereum](/developers/docs/networks/#ethereum-testnets) oltre alla Mainnet.

Alcuni servizi ti offrono il tuo nodo dedicato che gestiscono per te, mentre altri utilizzano bilanciatori di carico per distribuire l'attività tra i nodi.

Quasi tutti i servizi di nodi sono estremamente facili da integrare, richiedendo modifiche di una sola riga nel tuo codice per sostituire il tuo nodo auto-ospitato, o persino per passare da un servizio all'altro.

Spesso i servizi di nodi eseguono una varietà di [client di nodi](/developers/docs/nodes-and-clients/#execution-clients) e [tipi](/developers/docs/nodes-and-clients/#node-types), consentendoti di accedere a nodi completi e di archivio oltre a metodi specifici del client in un'unica API.

È importante notare che i servizi di nodi non memorizzano e non dovrebbero memorizzare le tue chiavi private o le tue informazioni.

## Quali sono i vantaggi dell'utilizzo di un servizio di nodi? {#benefits-of-using-a-node-service}

Il vantaggio principale dell'utilizzo di un servizio di nodi è non dover dedicare tempo ingegneristico alla manutenzione e alla gestione dei nodi in prima persona. Questo ti consente di concentrarti sulla costruzione del tuo prodotto piuttosto che doverti preoccupare della manutenzione dell'infrastruttura.

Eseguire i propri nodi può essere molto costoso, dallo spazio di archiviazione alla larghezza di banda, fino al prezioso tempo ingegneristico. Cose come l'avvio di più nodi durante la scalabilità, l'aggiornamento dei nodi alle versioni più recenti e la garanzia della coerenza dello stato, possono distrarre dalla costruzione e dall'investimento di risorse nel prodotto Web3 desiderato.

## Quali sono gli svantaggi dell'utilizzo di un servizio di nodi? {#cons-of-using-a-node-service}

Utilizzando un servizio di nodi stai centralizzando l'aspetto infrastrutturale del tuo prodotto. Per questo motivo, i progetti che ritengono la decentralizzazione di massima importanza potrebbero preferire l'auto-hosting dei nodi piuttosto che l'esternalizzazione a terze parti.

Scopri di più sui [vantaggi di eseguire il tuo nodo](/developers/docs/nodes-and-clients/#benefits-to-you).

## Servizi di nodi popolari {#popular-node-services}

Ecco un elenco di alcuni dei fornitori di nodi Ethereum più popolari, sentiti libero di aggiungere quelli mancanti! Ogni servizio di nodi offre vantaggi e funzionalità diversi oltre a livelli gratuiti o a pagamento; dovresti indagare su quali si adattano meglio alle tue esigenze prima di prendere una decisione.

- [**Alchemy**](https://alchemy.com/)
  - [Documentazione](https://www.alchemy.com/docs/)
  - Funzionalità
    - Il livello gratuito più ampio con 300 milioni di unità di calcolo al mese (\~30 milioni di richieste getLatestBlock)
    - Supporto multi-catena per Polygon, Starknet, Optimism, Arbitrum
    - Alimenta circa il 70% delle più grandi dapp di Ethereum e del volume delle transazioni della DeFi
    - Avvisi webhook in tempo reale tramite Alchemy Notify
    - Supporto e affidabilità/stabilità ai vertici della categoria
    - API NFT di Alchemy
    - Dashboard con Request Explorer, Mempool Watcher e Composer
    - Accesso integrato al faucet della testnet
    - Comunità attiva di costruttori su Discord con 18.000 utenti

- [**Allnodes**](https://www.allnodes.com/)
  - [Documentazione](https://docs.allnodes.com/)
  - Funzionalità
    - Nessun limite di frequenza con il token PublicNode creato nella pagina del portfolio di Allnodes.
    - Endpoint RPC gratuiti incentrati sulla privacy (oltre 100 blockchain) su [PublicNode](https://www.publicnode.com)
    - Nodi dedicati senza limiti di frequenza per oltre 90 blockchain
    - Nodi di archivio dedicati per oltre 30 blockchain
    - Disponibile in 3 regioni (Stati Uniti, UE, Asia)
    - Snapshot per oltre 100 blockchain su [PublicNode](https://www.publicnode.com/snapshots)
    - Supporto tecnico 24/7 con SLA di uptime del 99,90%-99,98% (a seconda del piano).
    - Prezzi orari
    - Paga con carta di credito, PayPal o cripto

- [**All That Node**](https://allthatnode.com/)
  - [Documentazione](https://docs.allthatnode.com/)
  - Funzionalità
    - 50.000 richieste al giorno con il livello gratuito
    - Supporto per oltre 40 protocolli
    - API JSON-RPC (EVM, Tendermint), REST e Websocket supportate
    - Accesso illimitato ai dati di archivio
    - Supporto tecnico 24/7 e uptime superiore al 99,9%
    - Faucet disponibile su più catene
    - Accesso illimitato agli endpoint con un numero illimitato di chiavi API
    - API Trace/Debug supportate
    - Aggiornamenti automatici

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Documentazione](https://aws.amazon.com/managed-blockchain/resources/)
  - Funzionalità
    - Nodi Ethereum completamente gestiti
    - Disponibile in sei regioni
    - JSON-RPC su HTTP e WebSocket sicuri
    - Supporta 3 catene
    - SLA, supporto AWS 24/7
    - Go-ethereum e Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Documentazione](https://docs.ankr.com/)
  - Funzionalità
    - Protocollo Ankr: accesso aperto agli endpoint API RPC pubblici per oltre 8 catene
    - Bilanciamento del carico e monitoraggio dell'integrità dei nodi per un gateway veloce e affidabile verso il nodo disponibile più vicino
    - Livello Premium che abilita l'endpoint WSS e un limite di frequenza illimitato
    - Distribuzione di nodi completi e nodi validatori con un clic per oltre 40 catene
    - Scala in base alle tue esigenze
    - Strumenti di analisi
    - Dashboard
    - Endpoint RPC, HTTPS e WSS
    - Supporto diretto

- [**Blast**](https://blastapi.io/)
  - [Documentazione](https://docs.blastapi.io/)
  - Funzionalità
    - Supporto RPC e WSS
    - Hosting di nodi multi-regione
    - Infrastruttura decentralizzata
    - API pubbliche
    - Piano gratuito dedicato
    - Supporto multi-catena (oltre 17 blockchain)
    - Nodi di archivio
    - Supporto Discord 24/7
    - Monitoraggio e avvisi 24/7
    - Uno SLA complessivo del 99,9%
    - Paga in cripto

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentazione](https://ubiquity.docs.blockdaemon.com/)
  - Vantaggi
    - Dashboard
    - Su base per nodo
    - Analisi

- [**BlockPI**](https://blockpi.io/)
  - [Documentazione](https://docs.blockpi.io/)
  - Funzionalità
    - Struttura dei nodi robusta e distribuita
    - Fino a 40 endpoint HTTPS e WSS
    - Pacchetto di iscrizione gratuito e pacchetto mensile
    - Metodo Trace + supporto per i dati di archivio
    - Pacchetti con validità fino a 90 giorni
    - Piano personalizzato e pagamento a consumo
    - Paga in cripto
    - Supporto diretto e supporto tecnico

- [**Chainbase**](https://www.chainbase.com/)
  - [Documentazione](https://docs.chainbase.com)
  - Funzionalità
    - Servizio RPC ad alta disponibilità, veloce e scalabile
    - Supporto multi-catena
    - Tariffe gratuite
    - Dashboard intuitiva
    - Fornisce servizi di dati blockchain oltre a RPC

- [**Chainstack**](https://chainstack.com/)
  - [Documentazione](https://docs.chainstack.com/)
  - Funzionalità
    - Nodi condivisi gratuiti
    - Nodi di archivio condivisi
    - Supporto GraphQL
    - Endpoint RPC e WSS
    - Nodi completi e di archivio dedicati
    - Tempi di sincronizzazione rapidi per le distribuzioni dedicate
    - Porta il tuo cloud
    - Prezzi orari
    - Supporto diretto 24/7

- [**dRPC**](https://drpc.org/)
  - [Documentazione](https://drpc.org/docs)
  - NodeCloud: infrastruttura RPC plug-n-play a partire da 10 $ (USD) — massima velocità, nessun limite
  - Funzionalità di NodeCloud:
    - Supporto API per 185 reti
    - Pool distribuito di oltre 40 fornitori
    - Copertura globale con nove (9) geo-cluster
    - Sistema di bilanciamento del carico basato sull'intelligenza artificiale
    - Prezzi forfettari a consumo: nessun aumento, nessuna scadenza, nessun vincolo
    - Chiavi illimitate, modifiche granulari delle chiavi, ruoli del team, protezione front-end
    - Tariffa fissa per i metodi a 20 unità di calcolo (CU) per metodo
    - [Elenco delle catene di endpoint pubblici](https://drpc.org/chainlist)
    - [Calcolatore dei prezzi](https://drpc.org/pricing#calculator)
  - NodeCore: stack open source per le organizzazioni che desiderano il pieno controllo

- [**GetBlock**](https://getblock.io/)
  - [Documentazione](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Funzionalità
    - Accesso a oltre 40 nodi blockchain
    - 40.000 richieste giornaliere gratuite
    - Numero illimitato di chiavi API
    - Alta velocità di connessione a 1 GB/sec
    - Trace+Archive
    - Analisi avanzate
    - Aggiornamenti automatici
    - Supporto tecnico

- [**InfStones**](https://infstones.com/)
  - Funzionalità
    - Opzione di livello gratuito
    - Scala in base alle tue esigenze
    - Analisi
    - Dashboard
    - Endpoint API unici
    - Nodi completi dedicati
    - Tempi di sincronizzazione rapidi per le distribuzioni dedicate
    - Supporto diretto 24/7
    - Accesso a oltre 50 nodi blockchain

- [**Infura**](https://infura.io/)
  - [Documentazione](https://infura.io/docs)
  - Funzionalità
    - Opzione di livello gratuito
    - Scala in base alle tue esigenze
    - Dati di archivio a pagamento
    - Supporto diretto
    - Dashboard

- [**Kaleido**](https://kaleido.io/)
  - [Documentazione](https://docs.kaleido.io/)
  - Funzionalità
    - Livello iniziale gratuito
    - Distribuzione del nodo Ethereum con un clic
    - Client e algoritmi personalizzabili (Geth, Quorum e Besu || PoA, IBFT e Raft)
    - Oltre 500 API amministrative e di servizio
    - Interfaccia RESTful per l'invio di transazioni Ethereum (supportata da Apache Kafka)
    - Flussi in uscita per la consegna degli eventi (supportati da Apache Kafka)
    - Vasta raccolta di servizi "offchain" e ausiliari (ad es. trasporto di messaggistica crittografata bilaterale)
    - Inserimento diretto nella rete con governance e controllo degli accessi basato sui ruoli
    - Gestione sofisticata degli utenti sia per gli amministratori che per gli utenti finali
    - Infrastruttura altamente scalabile, resiliente e di livello aziendale
    - Gestione delle chiavi private Cloud HSM
    - Tethering alla Mainnet di Ethereum
    - Certificazioni ISO 27k e SOC 2, Tipo 2
    - Configurazione dinamica a runtime (ad es. aggiunta di integrazioni cloud, modifica degli ingressi dei nodi, ecc.)
    - Supporto per orchestrazioni di distribuzione multi-cloud, multi-regione e ibride
    - Semplici prezzi orari basati su SaaS
    - SLA e supporto 24x7

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Documentazione](https://docs.lavanet.xyz/)
  - Funzionalità
    - Uso gratuito della testnet
    - Ridondanza decentralizzata per un elevato uptime
    - Open source
    - SDK completamente decentralizzato
    - Integrazione con Ethers.js
    - Interfaccia intuitiva per la gestione dei progetti
    - Integrità dei dati basata sul consenso
    - Supporto multi-catena

- [**Moralis**](https://moralis.io/)
  - [Documentazione](https://docs.moralis.io/)
  - Funzionalità
    - Nodi condivisi gratuiti
    - Nodi di archivio condivisi gratuiti
    - Incentrato sulla privacy (politica no-log)
    - Supporto cross-chain
    - Scala in base alle tue esigenze
    - Dashboard
    - SDK Ethereum unico
    - Endpoint API unici
    - Supporto tecnico diretto

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Documentazione](https://docs.nodereal.io/docs/introduction)
  - Funzionalità
    - Servizi API RPC affidabili, veloci e scalabili
    - API migliorate per gli sviluppatori Web3
    - Supporto multi-catena
    - Inizia gratuitamente

- [**NodeFlare**](https://nodeflare.app/)
  - [Documentazione](https://nodeflare.app/docs/quick-start)
  - Funzionalità
    - 8 catene EVM tra cui Ethereum, Base, Arbitrum One e Optimism
    - 4 regioni (Europa, Asia, Nord America) con failover automatico al nodo integro più vicino
    - Endpoint pubblico gratuito (nessuna chiave API) + piano gratuito con 3 milioni di unità di calcolo/mese
    - Fatturazione per unità di calcolo: paghi solo per ciò che usi, le chiamate più pesanti costano di più
    - Nessuna limitazione sui piani a pagamento

- [**NOWNodes**](https://nownodes.io/)
  - Funzionalità
    - Accesso a oltre 50 nodi blockchain
    - Chiave API gratuita
    - Block explorer
    - Tempo di risposta dell'API ⩽ 1 sec
    - Team di supporto 24/7
    - Account manager personale
    - Nodi condivisi, di archivio, di backup e dedicati

- [**Pocket Network**](https://www.pokt.network/)
  - [Documentazione](https://docs.pokt.network/)
  - Funzionalità
    - Protocollo RPC decentralizzato e marketplace
    - Livello gratuito di 1 milione di richieste al giorno (per endpoint, max 2)
    - Programma Pre-Stake+ (se hai bisogno di più di 1 milione di richieste al giorno)
    - Oltre 15 blockchain supportate
    - Oltre 6400 nodi che guadagnano POKT per servire le applicazioni
    - Supporto per nodi di archivio, nodi di archivio con tracciamento e nodi di testnet
    - Diversità dei client dei nodi della Mainnet di Ethereum
    - Nessun singolo punto di guasto
    - Zero tempi di inattività
    - Tokenomics conveniente quasi a zero (metti in staking POKT una volta per la larghezza di banda della rete)
    - Nessun costo irrecuperabile mensile, trasforma la tua infrastruttura in un asset
    - Bilanciamento del carico integrato nel protocollo
    - Scala all'infinito il numero di richieste al giorno e di nodi all'ora in base alle tue esigenze
    - L'opzione più privata e resistente alla censura
    - Supporto pratico per gli sviluppatori
    - Dashboard e analisi di [Pocket Portal](https://bit.ly/ETHorg_POKTportal)

- [**QuickNode**](https://www.quicknode.com)
  - [Documentazione](https://www.quicknode.com/docs/)
  - Funzionalità
    - Supporto tecnico 24/7 e comunità di sviluppatori su Discord
    - Rete geo-bilanciata, multi-cloud/metal, a bassa latenza
    - Supporto multi-catena (Optimism, Arbitrum, Polygon + altre 11)
    - Livelli intermedi per velocità e stabilità (instradamento delle chiamate, cache, indicizzazione)
    - Monitoraggio dei contratti intelligenti tramite webhook
    - Dashboard intuitiva, suite di analisi, compositore RPC
    - Funzionalità di sicurezza avanzate (JWT, mascheramento, whitelisting)
    - API per dati e analisi NFT
    - [Certificato SOC2](https://www.quicknode.com/security)
    - Adatto dagli sviluppatori alle imprese

- [**Rivet**](https://rivet.cloud/)
  - [Documentazione](https://rivet.readthedocs.io/en/latest/)
  - Funzionalità
    - Opzione di livello gratuito
    - Scala in base alle tue esigenze

- [**SenseiNode**](https://senseinode.com)
  - [Documentazione](https://docs.senseinode.com/)
  - Funzionalità
    - Nodi dedicati e condivisi
    - Dashboard
    - Hosting al di fuori di AWS su più fornitori di hosting in diverse località dell'America Latina
    - Client Prysm e Lighthouse

- [**SettleMint**](https://console.settlemint.com/)
  - [Documentazione](https://docs.settlemint.com/)
  - Funzionalità
    - Prova gratuita
    - Scala in base alle tue esigenze
    - Supporto GraphQL
    - Endpoint RPC e WSS
    - Nodi completi dedicati
    - Porta il tuo cloud
    - Strumenti di analisi
    - Dashboard
    - Prezzi orari
    - Supporto diretto

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Documentazione](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Funzionalità
    - Livello gratuito che include 25 milioni di unità Tenderly al mese
    - Accesso gratuito ai dati storici
    - Carichi di lavoro ad alta intensità di lettura fino a 8 volte più veloci
    - Accesso in lettura coerente al 100%
    - Endpoint JSON-RPC
    - Generatore di richieste RPC basato su interfaccia utente e anteprima delle richieste
    - Strettamente integrato con gli strumenti di sviluppo, debug e test di Tenderly
    - Simulazioni di transazioni
    - Analisi e filtraggio dell'utilizzo
    - Gestione semplificata delle chiavi di accesso
    - Supporto ingegneristico dedicato tramite chat, e-mail e Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Documentazione](https://services.tokenview.io/docs?type=nodeService)
  - Funzionalità
    - Supporto tecnico 24/7 e comunità di sviluppatori su Telegram
    - Supporto multi-catena (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Entrambi gli endpoint RPC e WSS sono aperti all'uso
    - Accesso illimitato all'API dei dati di archivio
    - Dashboard con Request Explorer e Mempool Watcher
    - API per dati NFT e notifiche webhook
    - Paga in cripto
    - Supporto esterno per requisiti di comportamento aggiuntivi

- [**Watchdata**](https://watchdata.io/)
  - [Documentazione](https://docs.watchdata.io/)
  - Funzionalità
    - Affidabilità dei dati
    - Connessione ininterrotta senza tempi di inattività
    - Automazione dei processi
    - Tariffe gratuite
    - Limiti elevati adatti a qualsiasi utente
    - Supporto per vari nodi
    - Scalabilità delle risorse
    - Elevate velocità di elaborazione

- [**ZMOK**](https://zmok.io/)
  - [Documentazione](https://docs.zmok.io/)
  - Funzionalità
    - Front-running come servizio
    - Mempool di transazioni globali con metodi di ricerca/filtraggio
    - Commissioni di transazione illimitate e gas infinito per l'invio di transazioni
    - Ottenimento più rapido del nuovo blocco e lettura della blockchain
    - Garanzia del miglior prezzo per chiamata API

- [**Zeeve**](https://www.zeeve.io/)
  - [Documentazione](https://www.zeeve.io/docs/)
  - Funzionalità
    - Piattaforma di automazione no-code di livello aziendale che fornisce distribuzione, monitoraggio e gestione di nodi e reti blockchain
    - Oltre 30 protocolli e integrazioni supportati, in continuo aumento
    - Servizi infrastrutturali Web3 a valore aggiunto come archiviazione decentralizzata, identità decentralizzata e API di dati del registro blockchain per casi d'uso reali
    - Il supporto 24/7 e il monitoraggio proattivo garantiscono l'integrità dei nodi in ogni momento.
    - Gli endpoint RPC offrono accesso autenticato alle API, gestione senza problemi con dashboard intuitiva e analisi.
    - Fornisce opzioni sia di cloud gestito che di "porta il tuo cloud" tra cui scegliere e supporta tutti i principali fornitori di cloud come AWS, Azure, Google Cloud, Digital Ocean e on-premise.
    - Utilizziamo un instradamento intelligente per raggiungere ogni volta il nodo più vicino al tuo utente


## Letture consigliate {#further-reading}

- [Elenco dei servizi di nodi Ethereum](https://ethereumnodes.com/)

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)

## Tutorial correlati {#related-tutorials}

- [Iniziare con lo sviluppo su Ethereum utilizzando Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guida all'invio di transazioni utilizzando Web3 e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)