---
title: Nodi come servizio
description: Panoramica entry-level dei servizi dei nodi, dei pro e dei contro, e dei fornitori più diffusi.
lang: it
sidebarDepth: 2
---

## Introduzione {#Introduction}

Eseguire un [nodo Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) può essere impegnativo, specialmente quando si è alle prime armi o in caso di ridimensionamento veloce. Ci sono [alcuni servizi](#popular-node-services) che eseguono infrastrutture di nodo ottimizzate, in modo che gli sviluppatori si possano concentrare sullo sviluppo di un'applicazione o di un prodotto. Se vuoi muovere i primi passi, ti spiegheremo come funzionano i servizi di nodo, i pro e i contro del loro utilizzo ed elencheremo i fornitori.

## Prerequisiti {#prerequisites}

Se non hai ancora chiaro cosa siano nodi e client, consulta [Nodi e client](/developers/docs/nodes-and-clients/).

## Staker {#stakoooooooooooooors}

Gli staker in autonomia devono gestire la propria infrastruttura piuttosto che affidarsi a fornitori terzi. Ciò significa eseguire un client di esecuzione associato a un client di consenso. Prima de [La Fusione](/upgrades/merge), era possibile eseguire solo un client di consenso e usare un fornitore centralizzato per i dati di esecuzione; questo non è più possibile: uno staker in autonomia deve eseguire entrambi i client. Tuttavia, sono disponibili dei servizi per semplificare questo processo.

[Maggiori informazioni sull'esecuzione di un nodo](/developers/docs/nodes-and-clients/run-a-node/).

I servizi descritti in questa pagina sono per i nodi non di staking.

## Come funzionano i servizi di nodo? {#how-do-node-services-work}

I fornitori di servizi di nodo eseguono client di nodo distribuiti, così che non debba farlo l'utente.

Questi servizi in genere forniscono una chiave API utilizzabile per scrivere e leggere sulla blockchain. Spesso includono l'accesso a [reti di test Ethereum](/developers/docs/networks/#ethereum-testnets) in aggiunta alla Rete principale.

Alcuni servizi offrono un nodo personale dedicato e lo gestiscono per l'utente, mentre altri usano bilanciatori del carico per distribuire l'attività tra i nodi.

Quasi tutti i servizi di nodo sono estremamente facili da integrare, richiedono modifiche di una sola riga di codice per sostituire il nodo originale o persino per passare da un servizio all'altro.

Spesso i servizi di nodo eseguono una varietà di [ client](/developers/docs/nodes-and-clients/#execution-clients) e [tipi di nodo](/developers/docs/nodes-and-clients/#node-types), che consentono di accedere a nodi completi e di archivio, oltre a metodi specifici del client in un'unica API.

È importante notare che i servizi di nodo non memorizzano le chiavi né le informazioni private, e non lo devono fare.

## Quali sono i vantaggi legati all'utilizzo di un servizio di nodo? {#benefits-of-using-a-node-service}

Il vantaggio principale dell'utilizzo di un servizio di nodo è non dover dedicare il proprio tempo alla progettazione, alla manutenzione e alla gestione del nodo. Questo permette di concentrarsi sulla realizzazione del prodotto anziché sulla manutenzione dell'infrastruttura.

L'esecuzione di nodi può essere molto costosa in termini di spazio di archiviazione e larghezza di banda, per non parlare del tempo di progettazione. Aspetti come l'aggiunta di nodi durante il ridimensionamento, l'aggiornamento dei nodi alle versioni più recenti e la garanzia della coerenza dello stato possono togliere tempo e risorse alla creazione del prodotto web3 che si desidera realizzare.

## Quali sono gli svantaggi legati all'utilizzo di un servizio di nodo? {#cons-of-using-a-node-service}

Utilizzando un servizio di nodo si centralizza l'aspetto dell'infrastruttura del prodotto. Per questo motivo, i progetti per cui la decentralizzazione ha la massima importanza potrebbero preferire nodi propri anziché un outsourcing a terzi.

Consulta i [vantaggi legati all'esecuzione di un nodo proprio](/developers/docs/nodes-and-clients/#benefits-to-you).

## Servizi di nodo più popolari {#popular-node-services}

Ecco una lista di alcuni dei più popolari fornitori di nodi Ethereum. Aggiungine pure altri, se li conosci! Ogni servizio di nodo offre diversi vantaggi e funzionalità in aggiunta ai livelli gratuiti o a pagamento. Verifica quali corrispondono alle tue esigenze prima di prendere una decisione.

- [**Alchemy**](https://alchemy.com/)
  - [Documentazione](https://docs.alchemyapi.io/)
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
- [**Ankr**](https://www.ankr.com/)
  - [Documentazione](https://docs.ankr.com/)
  - Caratteristiche
    - Protocollo Ankr - Accesso aperto agli endpoint dell'API di Public RPC per oltre 8 catene
    - Bilanciamento del carico e monitoraggio della salute del nodo per un gateway veloce e affidabile al più vicino nodo disponibile
    - Rango Premium che consente l'endpoint WSS e limite di velocità illimitato
    - Distribuzione in un click del nodo completo e del suo validatore per oltre 40 catene
    - Scaling al volo
    - Strumenti di analisi
    - Dashboard
    - RPC, HTTPS ed endpoint WSS
    - Assistenza diretta
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentazione](https://ubiquity.docs.blockdaemon.com/)
  - Vantaggi
    - Dashboard
    - In base al nodo
    - Analisi
- [**Chainstack**](https://chainstack.com/)
  - [Documentazione](https://docs.chainstack.com/)
  - Caratteristiche
    - Nodi condivisi gratuiti
    - Nodi d'archivio condivisi
    - Supporto a GraphQL
    - RPC ed endpoint WSS
    - Nodi completi e d'archivio dedicati
    - Tempo di sincronizzazione veloce per implementazioni dedicate
    - Porta il tuo cloud
    - Tariffazione oraria
    - Assistenza diretta 24 ore su 24, 7 giorni su 7
- [**DataHub**](https://datahub.figment.io)
  - [Documentazione](https://docs.figment.io/)
  - Caratteristiche
    - Opzione di livello gratuito con 3.000.000 richieste/mese
    - Endpoint RPC e WSS
    - Nodi completi e d'archivio dedicati
    - Ridimensionamento Automatico (sconti per volumi)
    - Dati di archiviazione gratuiti
    - Analitiche del servizio
    - Pannello di gestione
    - Assistenza diretta 24/7
    - Pagamento in cripto (Enterprise)
- [**GetBlock**](https://getblock.io/)
  - [Documentazione](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Caratteristiche
    - Accesso a oltre 40 nodi della blockchain
    - 40.000 richieste giornaliere gratuite
    - Numero illimitato di chiavi API
    - Alta velocità di connessione a 1GB/sec
    - Traccia+Archivio
    - Analisi avanzate
    - Aggiornamenti automatizzati
    - Supporto tecnico
- [**InfStones**](https://infstones.com/)
  - Caratteristiche
    - Opzione livello gratuito
    - Ridimensionamento secondo le esigenze
    - Analisi
    - Pannello di gestione
    - Endpoint API univoci
    - Nodi completi dedicati
    - Tempo di sincronizzazione veloce per implementazioni dedicate
    - Assistenza diretta 24/7
    - Accesso a oltre 50 nodi della blockchain
- [**Infura**](https://infura.io/)
  - [Documentazione](https://infura.io/docs)
  - Caratteristiche
    - Opzione livello gratuito
    - Ridimensionamento secondo le esigenze
    - Dati di archiviazione a pagamento
    - Assistenza diretta
    - Pannello di gestione
- [**Kaleido**](https://kaleido.io/)
  - [Documentazione](https://docs.kaleido.io/)
  - Caratteristiche
    - Livello iniziale gratuito
    - Distribuzione del nodo di Ethereum in un click
    - Client e algoritmi personalizzabili (Geth, Quorum e Besu || PoA, IBFT e Raft)
    - Oltre 500 API amministrative e di servizio
    - Interfaccia di RESTful per l'invio di transazioni di Ethereum (basata su Apache Kafka)
    - Flussi in uscita per la consegna degli eventi (basata su Apache Kafka)
    - Raccolta approfondita di servizi "off-chain" e ausiliari (es. trasporto bilaterale di messaggistica crittografata)
    - Semplice rete di integrazione con governance e controllo dell'accesso basato sul ruolo
    - Gestione dell'utente sofisticata per amministratori e utenti finali
    - Infrastruttura altamente scalabile, resiliente e di livello aziendale
    - Gestione delle chiavi private HSM del cloud
    - Tethering della rete principale di Ethereum
    - Certificazioni ISO 27k e SOC 2, Type 2
    - Configurazione di runtime dinamica (es. aggiungere integrazioni del cloud, alterare gli ingressi del nodo, ecc.)
    - Supporto per orchestrazioni multi-cloud, multiregionali e con distribuzione ibrida
    - Tariffe orarie semplici basate su Saas
    - Supporto SLA e 24x7
- [**Moralis**](https://moralis.io/)
  - [Documenti](https://docs.moralis.io/)
  - Caratteristiche
    - Nodi condivisi gratuiti
    - Nodi di archiviazione condivisi gratuiti
    - Incentrato sulla privacy (nessuna politica sui registri)
    - Supporto tra catene
    - Ridimensionamento secondo le esigenze
    - Pannello di gestione
    - SDK Ethereum unico
    - Endpoint API univoci
    - Supporto tecnico diretto
- [**NOWNodes**](https://nownodes.io/)
  - [Documentazione](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Caratteristiche
    - Accesso a oltre 50 nodi della blockchain
    - Chiave API Gratuita
    - Esploratori di blocchi
    - Tempo di risposta dell'API ⩽ 1 sec
    - Team di supporto 24/7
    - Referente commerciale personale
    - Nodi condivisi, archivio, backup e dedicati
- [**Pocket Network**](https://www.pokt.network/)
  - [Documentazione](https://docs.pokt.network/home/)
  - Caratteristiche
    - Protocollo RPC e Marketplace decentralizzati
    - 1 milione di richieste giornaliere gratuite (per endpoint, max. 2)
    - [Endpoint pubblici](https://docs.pokt.network/home/resources/public-rpc-endpoints)
    - Programma Pre-Stake+ (se servono più di 1 milione di richieste al giorno)
    - Più di 15 blockchain supportate
    - Più di 6.400 nodi che guadagnano POKT a servizio delle applicazioni
    - Nodo d'archiviazione, nodo d'archiviazione con tracciamento e supporto ai nodi di reti di prova
    - Diversità dei client dei nodi della rete principale di Ethereum
    - Nessun Single Point of Failure
    - Nessun tempo d'inattività
    - Tokenomic a bassissimo costo (esegui lo staking di POKT una volta per la larghezza di banda di rete)
    - Nessun costo mensile irrecuperabile, trasforma la tua infrastruttura in una risorsa
    - Bilanciamento di carico integrato nel protocollo
    - Ridimensiona progressivamente e in modo preciso il numero di richieste giornaliere e nodi orari
    - L'opzione più privata e resistente alla censura
    - Supporto pratico per sviluppatori
    - Dashboard e analisi di [Pocket Portal](https://bit.ly/ETHorg_POKTportal)
- [**QuickNode**](https://www.quicknode.com)
  - [Documenti](https://www.quicknode.com/docs/)
  - Caratteristiche
    - Riferimento nel settore per prestazioni e affidabilità
    - Supporto tecnico 24/7 e community Discord di sviluppatori
    - Bilanciamento geografico, multi-cloud/metal, rete a bassa latenza
    - Supporto multi-catena (Optimism, Arbitrum, Polygon e altri 11)
    - Livelli intermedi (middle layer) per velocità e stabilità (indirizzamento di chiamata, cache, indicizzazione)
    - Monitoraggio dello smart contract tramite Webhook
    - Pannello di controllo intuitivo, suite di analisi, RPC composer
    - Funzionalità di sicurezza avanzate (JWT, mascheratura, whitelist)
    - API di dati e analisi NFT
    - [Certificazione SOC2](https://www.quicknode.com/security)
    - Adatto agli sviluppatori per grandi imprese
- [**Rivet**](https://rivet.cloud/)
  - [Documenti](https://rivet.readthedocs.io/en/latest/)
  - Caratteristiche
    - Opzione livello gratuito
    - Ridimensionamento secondo le esigenze
- [**SenseiNode**](https://senseinode.com)
  - [Documentazione](https://docs.senseinode.com/)
  - Caratteristiche
    - Nodi dedicati e condivisi
    - Pannello di gestione
    - Hosting di AWS su diversi fornitori di hosting in diversi luoghi in America Latina
    - Client di Prysm e Lighthouse
- [**SettleMint**](https://console.settlemint.com/)
  - [Documentazione](https://docs.settlemint.com/)
  - Caratteristiche
    - Prova gratuita
    - Ridimensionamento secondo le esigenze
    - Supporto a GraphQL
    - Endpoint RPC e WSS
    - Nodi completi dedicati
    - Bring your cloud
    - Strumenti d'analisi
    - Pannello di gestione
    - Tariffe orarie
    - Assistenza diretta
- [**Watchdata**](https://watchdata.io/)
  - [Documentazione](https://docs.watchdata.io/)
  - Caratteristiche
    - Attendibilità dei dati
    - Connessione ininterrotta senza tempi d'inattività
    - Automatizzazione di processo
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
    - Commissione TX illimitata e Gas illimitato per l'invio di transazioni
    - Ottenimento più veloce del nuovo blocco e lettura della blockchain
    - Il miglior prezzo per garanzia di chiamata dell'API

## Letture consigliate {#further-reading}

- [List of Ethereum node services](https://ethereumnodes.com/)

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)

## Tutorial correlati {#related-tutorials}

- [Primi passi nello sviluppo di Ethereum usando Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guida all'invio di transazioni tramite web3 e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
