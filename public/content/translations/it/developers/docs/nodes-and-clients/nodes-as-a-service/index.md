---
title: Nodi come servizio
description: Panoramica entry-level dei servizi dei nodi, dei pro e dei contro, e dei fornitori più diffusi.
lang: it
sidebarDepth: 2
---

## Introduzione {#Introduction}

Eseguire un proprio [nodo Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) può essere impegnativo, specialmente quando si è alle prime armi o si sta scalando velocemente. Esistono [diversi servizi](#popular-node-services) che gestiscono per te infrastrutture di nodi ottimizzate, così puoi concentrarti sullo sviluppo della tua applicazione o del tuo prodotto. Se vuoi muovere i primi passi, ti spiegheremo come funzionano i servizi di nodo, i pro e i contro del loro utilizzo ed elencheremo i fornitori.

## Prerequisiti {#prerequisites}

Se non ti è ancora chiaro cosa siano i nodi e i client, consulta [Nodi e client](/developers/docs/nodes-and-clients/).

## Staker {#stakoooooooooooooors}

Gli staker in autonomia devono gestire la propria infrastruttura piuttosto che affidarsi a fornitori terzi. Ciò significa eseguire un client di esecuzione associato a un client di consenso. Prima de [La Fusione](/roadmap/merge), era possibile eseguire solo un client di consenso e usare un fornitore centralizzato per i dati di esecuzione; questo non è più possibile: uno staker in solitaria deve eseguire entrambi i client. Tuttavia, sono disponibili dei servizi per semplificare questo processo.

[Maggiori informazioni sull'esecuzione di un nodo](/developers/docs/nodes-and-clients/run-a-node/).

I servizi descritti in questa pagina sono per i nodi non di staking.

## Come funzionano i servizi di nodo? {#how-do-node-services-work}

I fornitori di servizi di nodo eseguono client di nodo distribuiti, così che non debba farlo l'utente.

Questi servizi in genere forniscono una chiave API utilizzabile per scrivere e leggere sulla blockchain. Spesso includono l'accesso alle [reti di test di Ethereum](/developers/docs/networks/#ethereum-testnets) oltre alla Rete Principale.

Alcuni servizi offrono un nodo personale dedicato e lo gestiscono per l'utente, mentre altri usano bilanciatori del carico per distribuire l'attività tra i nodi.

Quasi tutti i servizi di nodo sono estremamente facili da integrare, richiedono modifiche di una sola riga di codice per sostituire il nodo originale o persino per passare da un servizio all'altro.

Spesso i servizi di nodo eseguono una varietà di [client di nodo](/developers/docs/nodes-and-clients/#execution-clients) e [tipi](/developers/docs/nodes-and-clients/#node-types), permettendoti di accedere a nodi completi e di archivio, oltre a metodi specifici del client in un'unica API.

È importante notare che i servizi di nodo non memorizzano le chiavi né le informazioni private, e non lo devono fare.

## Quali sono i vantaggi legati all'utilizzo di un servizio di nodo? {#benefits-of-using-a-node-service}

Il vantaggio principale dell'utilizzo di un servizio di nodo è non dover dedicare il proprio tempo alla progettazione, alla manutenzione e alla gestione del nodo. Questo permette di concentrarsi sulla realizzazione del prodotto anziché sulla manutenzione dell'infrastruttura.

L'esecuzione di nodi può essere molto costosa in termini di spazio di archiviazione e larghezza di banda, per non parlare del tempo di progettazione. Aspetti come l'aggiunta di nodi durante il ridimensionamento, l'aggiornamento dei nodi alle versioni più recenti e la garanzia della coerenza dello stato possono sottrarre tempo e risorse alla creazione del prodotto web3 che si desidera realizzare.

## Quali sono gli svantaggi legati all'utilizzo di un servizio di nodo? {#cons-of-using-a-node-service}

Utilizzando un servizio di nodo si centralizza l'aspetto dell'infrastruttura del prodotto. Per questo motivo, i progetti in cui la decentralizzazione ha la massima importanza potrebbero preferire nodi propri anziché un outsourcing a terzi.

[Maggiori informazioni sui vantaggi di eseguire un proprio nodo](/developers/docs/nodes-and-clients/#benefits-to-you).

## Servizi di nodo popolari {#popular-node-services}

Ecco una lista di alcuni dei più popolari fornitori di nodi Ethereum. Aggiungine pure altri, se li conosci! Ogni servizio di nodo offre diversi vantaggi e funzionalità, in aggiunta ai livelli gratuiti o a pagamento. Verifica quali corrispondono alle tue esigenze prima di decidere.

- [**Alchemy**](https://alchemy.com/)
  - [Documentazione](https://www.alchemy.com/docs/)
  - Caratteristiche
    - Il più grande livello gratuito con 300M unità di calcolo al mese (circa 30M richieste di getLatestBlock)
    - Supporto multi-catena per Polygon, Starknet, Optimism, Arbitrum
    - Alimenta circa il 70% delle maggiori dApp di Ethereum e del volume delle transazioni della DeFi
    - Avvisi webhook in tempo reale tramite Alchemy Notify
    - Migliore supporto e affidabilità / stabilità
    - API NFT di Alchemy
    - Pannello di Controllo con Request Explorer, Mempool Watcher, e Composer
    - Accesso integrato al faucet della rete di prova
    - Community Discord attiva di creatori con 18k utenti

- [**Allnodes**](https://www.allnodes.com/)
  - [Documentazione](https://docs.allnodes.com/)
  - Caratteristiche
    - Nessun limite di velocità con il token PublicNode creato nella pagina del portafoglio Allnodes.
    - Endpoint RPC gratuiti incentrati sulla privacy (oltre 100 blockchain) su [PublicNode](https://www.publicnode.com)
    - Nodi dedicati senza limiti di velocità per oltre 90 blockchain
    - Nodi di archiviazione dedicati per oltre 30 blockchain
    - Disponibile in 3 regioni (Stati Uniti, Unione Europea, Asia)
    - Istantanee per oltre 100 blockchain su [PublicNode](https://www.publicnode.com/snapshots)
    - Assistenza tecnica 24 ore su 24, 7 giorni su 7, con SLA che garantisce un tempo di attività compreso tra il 99,90% e il 99,98% (a seconda del piano).
    - Tariffe orarie
    - Paga con carta di credito, PayPal o criptovaluta

- [**All That Node**](https://allthatnode.com/)
  - [Documentazione](https://docs.allthatnode.com/)
  - Caratteristiche
    - 50.000 richieste al giorno con il livello gratuito
    - Supporto per oltre 40 protocolli
    - API di JSON-RPC (EVM, Tendermint), REST e Websocket supportate
    - Accesso illimitato per archiviare dati
    - Supporto tecnico 24/7 e 99,9% di tempo d'attività
    - Faucet disponibile su diverse chain
    - Accesso illimitato all'endpoint con un numero illimitato di chiavi API
    - API Traccia/Debug supportata
    - Aggiornamenti automatizzati

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Documentazione](https://aws.amazon.com/managed-blockchain/resources/)
  - Caratteristiche
    - Nodi di Ethereum gestiti interamente
    - Disponibile in sei regioni
    - JSON-RPC su HTTP e WebSocket sicure
    - Supporta 3 catene
    - SLA, Supporto ad AWS 24/7
    - Go-ethereum e Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Documentazione](https://docs.ankr.com/)
  - Caratteristiche
    - Protocollo Ankr - accesso aperto agli endpoint API RPC pubblici per oltre 8 catene
    - Bilanciamento del carico e monitoraggio della salute del nodo per un gateway veloce e affidabile al più vicino nodo disponibile
    - Livello premium che consente l'endpoint WSS e limite di velocità illimitato
    - Distribuzione completa in un click del nodo e del suo validatore per oltre 40 catene
    - Scaling al volo
    - Strumenti di analisi
    - Pannello di controllo
    - Endpoint RPC, HTTPS e WSS
    - Assistenza diretta

- [**Blast**](https://blastapi.io/)
  - [Documentazione](https://docs.blastapi.io/)
  - Caratteristiche
    - Supporto RPC e WSS
    - Hosting multiregionale dei nodi
    - Infrastruttura decentralizzata
    - API pubblica
    - Piano gratuito dedicato
    - Supporto multicatena (oltre 17 blockchain)
    - Nodi archivio
    - Supporto su Discord 24/7
    - Monitoraggio e avvisi 24/7
    - Uno SLA complessivo del 99,9%
    - Pagamento in criptovalute

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentazione](https://ubiquity.docs.blockdaemon.com/)
  - Vantaggi
    - Pannello di controllo
    - In base al nodo
    - Statistiche

- [**BlockPI**](https://blockpi.io/)
  - [Documentazione](https://docs.blockpi.io/)
  - Caratteristiche
    - Struttura del nodo robusta e distribuita
    - Fino a 40 endpoint HTTPS e WSS
    - Pacchetto di iscrizione gratuito e pacchetto mensile
    - Metodo di tracciamento + Supporto ai dati d'archivio
    - Pacchetti con validità fino a 90 giorni
    - Piano personalizzato e pagamento a consumo
    - Pagamento in criptovalute
    - Supporto diretto e supporto tecnico

- [**Chainbase**](https://www.chainbase.com/)
  - [Documentazione](https://docs.chainbase.com)
  - Caratteristiche
    - Servizi RPC altamente disponibili, veloci e scalabili
    - Supporto multi-catena
    - Tariffe gratuite
    - Pannelli di controllo facili da usare
    - Fornisce servizi di dati blockchain oltre a RPC

- [**Chainstack**](https://chainstack.com/)
  - [Documentazione](https://docs.chainstack.com/)
  - Caratteristiche
    - Nodi condivisi gratuiti
    - Nodi d'archivio condivisi
    - Supporto a GraphQL
    - Endpoint RPC e WSS
    - Nodi completi e d'archivio dedicati
    - Tempo di sincronizzazione veloce per distribuzioni dedicate
    - Bring your cloud
    - Tariffe orarie
    - Assistenza diretta 24 ore su 24, 7 giorni su 7

- [**dRPC**](https://drpc.org/)
  - [Documentazione](https://drpc.org/docs)
  - NodeCloud: infrastruttura RPC plug-n-play a partire da 10$ (USD) — massima velocità, nessun limite
  - Caratteristiche di NodeCloud:
    - Supporto API per 185 reti
    - Gruppo distribuito di oltre 40 fornitori
    - Copertura globale con nove (9) geo-cluster
    - Sistema di bilanciamento del carico basato su IA
    - Prezzi forfettari pay-as-you-go: nessun aumento, nessuna scadenza, nessun vincolo
    - Chiavi illimitate, modifiche granulari delle chiavi, ruoli del team, protezione front-end
    - Tariffa forfettaria per i metodi a 20 unità di calcolo (CU) per metodo
    - [Elenco di endpoint pubblici](https://drpc.org/chainlist)
    - [Calcolatore dei prezzi](https://drpc.org/pricing#calculator)
  - NodeCore: stack open-source per le organizzazioni che desiderano il pieno controllo

- [**GetBlock**](https://getblock.io/)
  - [Documentazione](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Caratteristiche
    - Accesso a oltre 40 nodi della blockchain
    - 40.000 richieste giornaliere gratuite
    - Numero illimitato di chiavi API
    - Elevata velocità di connessione a 1GB/sec
    - Traccia+Archivio
    - Analisi avanzate
    - Aggiornamenti automatizzati
    - Supporto tecnico

- [**InfStones**](https://infstones.com/)
  - Caratteristiche
    - Opzione livello gratuito
    - Scaling al volo
    - Statistiche
    - Pannello di controllo
    - Endpoint univoci dell'API
    - Nodi completi dedicati
    - Tempo di sincronizzazione veloce per distribuzioni dedicate
    - Assistenza diretta 24 ore su 24, 7 giorni su 7
    - Accesso a oltre 50 nodi della blockchain

- [**Infura**](https://infura.io/)
  - [Documentazione](https://infura.io/docs)
  - Caratteristiche
    - Opzione livello gratuito
    - Scaling al volo
    - Dati di archiviazione a pagamento
    - Assistenza diretta
    - Pannello di controllo

- [**Kaleido**](https://kaleido.io/)
  - [Documentazione](https://docs.kaleido.io/)
  - Caratteristiche
    - Livello iniziale gratuito
    - Distribuzione del nodo di Ethereum in un clic
    - Client e algoritmi personalizzabili (Geth, Quorum e Besu || PoA, IBFT e Raft)
    - Oltre 500 API amministrative e di servizio
    - Interfaccia RESTful per l'invio di transazioni di Ethereum (supportata da Apache Kafka)
    - Flussi in uscita per la consegna degli eventi (supportati da Apache Kafka)
    - Ampia raccolta di servizi "fuori dalla catena" e ausiliari (ad es. trasporto bilaterale di messaggi crittografati)
    - Semplice integrazione di rete con governance e controllo dell'accesso basato sul ruolo
    - Sofisticata gestione dell'utente per amministratori e utenti finali
    - Infrastruttura altamente scalabile, resiliente e di livello enterprise
    - Gestione delle chiavi private HSM del cloud
    - Tethering della Rete Principale di Ethereum
    - Certificazioni ISO 27k e SOC 2, di Tipo 2
    - Configurazione dinamica di runtime (ad es. aggiunta di integrazioni cloud, modifica degli ingressi del nodo, ecc.)
    - Supporto per orchestrazioni multi-cloud, multiregionali e con distribuzione ibrida
    - Tariffe orarie semplici basate su Saas
    - Supporto SLA e 24x7

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Documentazione](https://docs.lavanet.xyz/)
  - Caratteristiche
    - Utilizzo gratuito di Testnet
    - Ridondanza decentralizzata per un elevato tempo di attività.
    - Open-source
    - SDK completamente decentralizzato
    - Integrazione di Ethers.js
    - Interfaccia di gestione del progetto intuitiva
    - Integrità dei dati basata sul consenso
    - Supporto multi-catena

- [**Moralis**](https://moralis.io/)
  - [Documentazione](https://docs.moralis.io/)
  - Caratteristiche
    - Nodi condivisi gratuiti
    - Nodi archivio condivisi gratuiti
    - Incentrato sulla privacy (nessuna politica sui registri)
    - Supporto a catena incrociata
    - Scaling al volo
    - Pannello di controllo
    - SDK Ethereum univoco
    - Endpoint univoci dell'API
    - Supporto tecnico diretto

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Documentazione](https://docs.nodereal.io/docs/introduction)
  - Caratteristiche
    - Servizi API RPC affidabili, veloci e scalabili
    - API migliorata per sviluppatori web3
    - Supporto multi-catena
    - Inizia gratuitamente

- [**NOWNodes**](https://nownodes.io/)
  - [Documentazione](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Caratteristiche
    - Accesso a oltre 50 nodi della blockchain
    - Chiave API gratuita
    - Esploratori di blocchi
    - Tempo di risposta dell'API ⩽ 1 sec
    - Team di assistenza 24 ore su 24/7 giorni su 7
    - Gestore personale dell'account
    - Nodi condivisi, di archivio, di backup e dedicati

- [**Pocket Network**](https://www.pokt.network/)
  - [Documentazione](https://docs.pokt.network/home/)
  - Caratteristiche
    - Protocollo RPC e mercato decentralizzati
    - Livello con 1 milione di richieste giornaliere gratuite (per endpoint, max. 2)
    - [Endpoint pubblici](https://docs.pokt.network/developers/public-endpoints)
    - Programma Pre-Stake+ (se servono più di 1 milione di richieste al giorno)
    - Più di 15 blockchain supportate
    - Più di 6.400 nodi che guadagnano POKT a servizio delle applicazioni
    - Nodo di archiviazione, nodo di archiviazione con tracciamento e supporto per nodi della rete di test
    - Diversità dei client dei nodi della rete principale di Ethereum
    - Nessun punto di errore unico
    - Nessun tempo di inattività
    - Tokenomic a bassissimo costo (esegui lo staking di POKT una volta per la larghezza di banda di rete)
    - Nessun costo mensile irrecuperabile, trasforma la tua infrastruttura in una risorsa
    - Bilanciamento di carico integrato nel protocollo
    - Ridimensiona illimitatamente il numero di richieste giornaliere e nodi orari in base alle esigenze
    - L'opzione più privata e resistente alla censura
    - Supporto pratico per sviluppatori
    - Dashboard e analisi di [Pocket Portal](https://bit.ly/ETHorg_POKTportal)

- [**QuickNode**](https://www.quicknode.com)
  - [Documentazione](https://www.quicknode.com/docs/)
  - Caratteristiche
    - Supporto tecnico 24/7 e community di sviluppatori su Discord
    - Bilanciamento geografico, multi-cloud/metal, rete a bassa latenza
    - Supporto multi-catena (Optimism, Arbitrum, Polygon e altri 11)
    - Livelli intermedi per velocità e stabilità (instradamento delle chiamate, cache, indicizzazione)
    - Monitoraggio del contratto intelligente tramite Webhook
    - Pannello di controllo intuitivo, suite di analisi, RPC composer
    - Funzionalità di sicurezza avanzate (JWT, mascheratura, whitelist)
    - API di dati e analisi NFT
    - [Certificazione SOC2](https://www.quicknode.com/security)
    - Adatto agli sviluppatori per imprese

- [**Rivet**](https://rivet.cloud/)
  - [Documentazione](https://rivet.readthedocs.io/en/latest/)
  - Caratteristiche
    - Opzione livello gratuito
    - Scaling al volo

- [**SenseiNode**](https://senseinode.com)
  - [Documentazione](https://docs.senseinode.com/)
  - Caratteristiche
    - Nodi dedicati e condivisi
    - Pannello di controllo
    - Hosting di AWS su più fornitori di hosting in diversi luoghi in America Latina
    - Client di Prysm e Lighthouse

- [**SettleMint**](https://console.settlemint.com/)
  - [Documentazione](https://docs.settlemint.com/)
  - Caratteristiche
    - Prova gratuita
    - Scaling al volo
    - Supporto a GraphQL
    - Endpoint RPC e WSS
    - Nodi completi dedicati
    - Bring your cloud
    - Strumenti di analisi
    - Pannello di controllo
    - Tariffe orarie
    - Assistenza diretta

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Documentazione](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Caratteristiche
    - Livello gratuito con 25 milioni di unità di Tenderly al mese
    - Accesso gratuito ai dati storici
    - Carichi di lavoro gravosi in lettura fino a 8 volte più veloci
    - Accesso di lettura coerente al 100%
    - Endpoint JSON-RPC
    - Generatore di richieste RPC e anteprima delle richieste basati sull'interfaccia utente
    - Completamente integrato con gli strumenti di sviluppo, debug e test di Tenderly
    - Simulazioni delle transazioni
    - Analisi di utilizzo e filtraggio
    - Facile gestione delle chiavi d'accesso
    - Supporto ingegneristico dedicato tramite chat, e-mail e Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Documentazione](https://services.tokenview.io/docs?type=nodeService)
  - Caratteristiche
    - Supporto tecnico 24/7 e community di sviluppatori su Telegram
    - Supporto di più blockchain (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Sia gli endpoint RPC che WSS sono aperti all'uso
    - Accesso illimitato ad API di dati d'archivio
    - Pannello di controllo con Request Explorer e Mempool Watcher
    - API per dati NFT e notifiche per Webhook
    - Paga in criptovalute
    - Supporto esterno per ulteriori requisiti di funzionalità

- [**Watchdata**](https://watchdata.io/)
  - [Documentazione](https://docs.watchdata.io/)
  - Caratteristiche
    - Attendibilità dei dati
    - Connessione ininterrotta senza tempi di inattività
    - Automazione di processo
    - Tariffe gratuite
    - Limiti elevati che si adattano a qualsiasi utente
    - Supporto per vari nodi
    - Ridimensionamento delle risorse
    - Velocità d'elaborazione elevate

- [**ZMOK**](https://zmok.io/)
  - [Documentazione](https://docs.zmok.io/)
  - Caratteristiche
    - Front-running come servizio
    - Mempool di transazioni globale con metodi di ricerca/filtraggio
    - Commissione TX illimitata e carburante infinito per inviare le transazioni
    - Ottenimento più veloce del nuovo blocco e lettura della blockchain
    - Il miglior prezzo per garanzia di chiamata dell'API

- [**Zeeve**](https://www.zeeve.io/)
  - [Documentazione](https://www.zeeve.io/docs/)
  - Caratteristiche
    - Piattaforma di automazione senza codice di livello enterprise che fornisce la distribuzione, il monitoraggio e la gestione dei nodi e delle reti Blockchain
    - Oltre 30 protocolli e integrazioni supportati, e altri in arrivo
    - Servizi dell'infrastruttura web3 dal valore aggiunto, quali archiviazione decentralizzata, identità decentralizzata e API dei dati del Libro Mastro della Blockchain per casi d'uso del mondo reale
    - Supporto 24/7 e monitoraggio proattivo assicurano la costante salute dei nodi.
    - Gli endpoint RPC offrono l'accesso autenticato alle API, la gestione semplice con intuitivi pannelli di controllo e statistiche.
    - Offre opzioni di cloud gestito e di bring your own cloud tra cui scegliere e supporta tutti i principali fornitori di cloud come AWS, Azure, Google Cloud, Digital Ocean e on-premise.
    - Utilizziamo l'instradamento intelligente per colpire sempre il nodo più vicino al tuo utente

## Letture consigliate {#further-reading}

- [Elenco di servizi di nodo Ethereum](https://ethereumnodes.com/)

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)

## Guide correlate {#related-tutorials}

- [Guida introduttiva allo sviluppo su Ethereum con Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guida all'invio di transazioni usando web3 e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
