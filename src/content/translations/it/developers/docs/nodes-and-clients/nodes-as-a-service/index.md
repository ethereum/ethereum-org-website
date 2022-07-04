---
title: Nodi come servizio
description: Panoramica entry-level dei servizi dei nodi, dei pro e dei contro, e dei fornitori più diffusi.
lang: it
sidebar: true
sidebarDepth: 2
---

## Introduzione {#Introduction}

Eseguire un [nodo Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) può essere impegnativo, specialmente quando si è alle prime armi o in caso di ridimensionamento veloce. Ci sono [alcuni servizi](#popular-node-services) che eseguono infrastrutture di nodo ottimizzate, in modo che gli sviluppatori si possano concentrare sullo sviluppo di un'applicazione o di un prodotto. Se vuoi muovere i primi passi, ti spiegheremo come funzionano i servizi di nodo, i pro e i contro del loro utilizzo ed elencheremo i fornitori.

## Prerequisiti {#prerequisites}

Se non hai ancora chiaro cosa siano nodi e client, consulta [Nodi e client](/developers/docs/nodes-and-clients/).

## Come funzionano i servizi di nodo? {#how-do-node-services-work}

I fornitori di servizi di nodo eseguono client di nodo distribuiti, quindi non è necessario farlo.

Questi servizi in genere forniscono una chiave API utilizzabile per scrivere e leggere sulla blockchain. Spesso includono l'accesso a [reti di test Ethereum](/developers/docs/networks/#ethereum-testnets) in aggiunta alla rete principale.

Alcuni servizi offrono un nodo personale dedicato e lo gestiscono, mentre altri usano bilanciatori del carico per distribuire l'attività tra i nodi.

Quasi tutti i servizi di nodo sono estremamente facili da integrare, richiedono modifiche di una sola riga di codice per sostituire il nodo originale o persino per passare da un servizio all'altro.

Spesso i servizi di nodo eseguono una varietà di [ client](/developers/docs/nodes-and-clients/#execution-clients) e [tipi di nodo](/developers/docs/nodes-and-clients/#node-types), che consentono di accedere a nodi completi e di archivio, oltre a metodi specifici del client in un'unica API.

È importante notare che i servizi di nodo non memorizzano le chiavi private né le informazioni, e non lo devono fare.

## Quali sono i vantaggi legati all'utilizzo di un servizio di nodo? {#benefits-of-using-a-node-service}

Il vantaggio principale dell'utilizzo di un servizio di nodo è non dover dedicare il proprio tempo alla progettazione, alla manutenzione e alla gestione del nodo. Questo permette di concentrarsi sulla realizzazione del prodotto anziché sulla manutenzione dell'infrastruttura.

L'esecuzione di nodi può essere molto esigente in termini di spazio di archiviazione e larghezza di banda, per non parlare del tempo di progettazione. Aspetti come l'aggiunta di nodi durante il ridimensionamento, l'aggiornamento dei nodi alle versioni più recenti e la garanzia della coerenza dello stato possono togliere tempo e risorse alla creazione del prodotto web3 che si desidera realizzare.

## Quali sono gli svantaggi legati all'utilizzo di un servizio di nodo? {#cons-of-using-a-node-service}

Utilizzando un servizio di nodo si centralizza l'aspetto dell'infrastruttura del prodotto. Per questo motivo, i progetti per cui la decentralizzazione ha la massima importanza potrebbero preferire nodi propri anziché un outsourcing a terzi.

Consulta i [vantaggi legati all'esecuzione di un nodo proprio](/developers/docs/nodes-and-clients/#benefits-to-you).

## Servizi di nodo più popolari {#popular-node-services}

Ecco una lista di alcuni dei più popolari fornitori di nodi Ethereum. Aggiungine pure altri, se li conosci! Ogni servizio di nodo offre diversi vantaggi e funzionalità in aggiunta ai livelli gratuiti o a pagamento. Verifica quali corrispondono alle tue esigenze prima di prendere una decisione.

- [**Alchemy**](https://www.alchemy.com/)
  - [Documentazione](https://docs.alchemyapi.io/)
  - Caratteristiche
    - Opzione livello gratuito
    - Ridimensionamento secondo le esigenze
    - Dati di archiviazione gratuiti
    - Strumenti di analisi
    - Dashboard
    - Endpoint API univoci
    - Webhook
    - Assistenza diretta
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
    - Analisi
    - Dashboard
    - Endpoint API univoci
    - Nodi completi dedicati
    - Tempo di sincronizzazione veloce per implementazioni dedicate
    - Assistenza diretta 24 ore su 24, 7 giorni su 7
    - Accesso a oltre 50 nodi della blockchain
- [**Infura**](https://infura.io/)
  - [Documentazione](https://infura.io/docs)
  - Caratteristiche
    - Opzione livello gratuito
    - Scaling al volo
    - Dati di archiviazione a pagamento
    - Assistenza diretta
    - Dashboard
- [**Moralis**](https://moralis.io/)
  - [Documentazione](https://docs.moralis.io/)
  - Caratteristiche
    - Nodi condivisi gratuiti
    - Nodi d’archivio condivisi gratuiti
    - Incentrato sulla privacy (nessuna politica sui registri)
    - Supporto tra catene
    - Scaling al volo
    - Dashboard
    - Unicità dell’SDK Ethereum
    - Endpoint API univoci
    - Supporto tecnico diretto
- [**Rete Tascabile**](https://www.pokt.network/)
  - [Documentazione](https://docs.pokt.network/home/)
  - Caratteristiche
    - Protocollo RPC e Marketplace decentralizzati
    - 1 milione di richieste gratuite al giorno (per endpoint, max 2)
    - [Endpoint pubblici](https://docs.pokt.network/home/resources/public-rpc-endpoints)
    - Programma Pre-Stake+ (se hai bisogno di più di 1 milione di richieste al giorno)
    - Più di 15 blockchain supportate
    - Più di 6.400 nodi che guadagnano POKT a servizio delle applicazioni
    - Nodo di archiviazione, Nodo di archiviazione con tracciamento & Supporto nodo Testnet
    - Ethereum Mainnet Node Client Diversity
    - Nessun Single Point of Failure
    - Nessun tempo di inattività
    - Tokenomics a costo quasi zero (stake POKT una volta per la larghezza di banda di rete)
    - Nessun costo mensile irrecuperabile, trasforma la tua infrastruttura in un asset
    - Bilanciamento del carico integrato nel protocollo
    - Scalabilità infinita del numero di richieste giornaliere e di nodi orari secondo le esigenze
    - L'opzione più privata e resistente alla censura
    - Supporto pratico per sviluppatori
    - Dashboard e analisi di [Pocket Portal](https://bit.ly/ETHorg_POKTportal)
- [**QuikNode**](https://www.quiknode.io/)
  - Caratteristiche
    - Prova gratuita di 7 giorni
    - Supporto variabile
    - Webhook
    - Dashboard
    - Analisi
- [**Rivet**](https://rivet.cloud/)
  - [Documentazione](https://rivet.readthedocs.io/en/latest/)
  - Caratteristiche
    - Opzione livello gratuito
    - Scaling al volo
- [**SettleMint**](https://console.settlemint.com/)
  - [Documentazione](https://docs.settlemint.com/)
  - Caratteristiche
    - Prova gratuita
    - Scaling al volo
    - Supporto a GraphQL
    - RPC ed endpoint WSS
    - Nodi completi dedicati
    - Porta il tuo cloud
    - Strumenti di analisi
    - Dashboard
    - Tariffazione oraria
    - Assistenza diretta

## Letture consigliate {#further-reading}

- [List of Ethereum node services](https://ethereumnodes.com/)

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)

## Tutorial correlati {#related-tutorials}

- [Primi passi nello sviluppo di Ethereum usando Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guida all'invio di transazioni tramite web3 e Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
