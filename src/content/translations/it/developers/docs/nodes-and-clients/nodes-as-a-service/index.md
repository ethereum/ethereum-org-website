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

Questi servizi in genere forniscono una chiave API utilizzabile per scrivere e leggere sulla blockchain. Spesso includono l'accesso a [reti di test Ethereum](/developers/docs/networks/#testnets) in aggiunta alla rete principale.

Alcuni servizi offrono un nodo personale dedicato e lo gestiscono, mentre altri usano bilanciatori del carico per distribuire l'attività tra i nodi.

Quasi tutti i servizi di nodo sono estremamente facili da integrare, richiedono modifiche di una sola riga di codice per sostituire il nodo originale o persino per passare da un servizio all'altro.

Spesso i servizi di nodo eseguono una varietà di [ client](/developers/docs/nodes-and-clients/#clients) e [tipi di nodo](/developers/docs/nodes-and-clients/#node-types), che consentono di accedere a nodi completi e di archivio, oltre a metodi specifici del client in un'unica API.

È importante notare che i servizi di nodo non memorizzano le chiavi private né le informazioni, e non lo devono fare.

## Quali sono i vantaggi legati all'utilizzo di un servizio di nodo? {#benefits-of-using-a-node-service}

Il vantaggio principale dell'utilizzo di un servizio di nodo è non dover dedicare il proprio tempo alla progettazione, alla manutenzione e alla gestione del nodo. Questo permette di concentrarsi sulla realizzazione del prodotto anziché sulla manutenzione dell'infrastruttura.

L'esecuzione di nodi può essere molto esigente in termini di spazio di archiviazione e larghezza di banda, per non parlare del tempo di progettazione. Aspetti come l'aggiunta di nodi durante il ridimensionamento, l'aggiornamento dei nodi alle versioni più recenti e la garanzia della coerenza dello stato possono togliere tempo e risorse alla creazione del prodotto web3 che si desidera realizzare.

## Quali sono gli svantaggi legati all'utilizzo di un servizio di nodo? {#cons-of-using-a-node-service}

Utilizzando un servizio di nodo si centralizza l'aspetto dell'infrastruttura del prodotto. Per questo motivo, i progetti per cui la decentralizzazione ha la massima importanza potrebbero preferire nodi propri anziché un outsourcing a terzi.

Consulta i [vantaggi legati all'esecuzione di un nodo proprio](/developers/docs/nodes-and-clients/#benefits-to-you).

## Servizi di nodo più popolari {#popular-node-services}

Ecco una lista di alcuni dei più popolari fornitori di nodi Ethereum. Aggiungine pure altri, se li conosci! Ogni servizio di nodo offre diversi vantaggi e funzionalità in aggiunta ai livelli gratuiti o a pagamento. Verifica quali corrispondono alle tue esigenze prima di prendere una decisione.

- [**Alchemy**](https://alchemyapi.io/)
  - [Documentazione](https://docs.alchemyapi.io/)
  - Caratteristiche
    - Opzione livello gratuito
    - Ridimensionamento secondo le esigenze
    - Dati di archiviazione gratuiti
    - Strumenti di analisi
    - Pannello di gestione
    - Endpoint API univoci
    - Webhook
    - Assistenza diretta
- [**Infura**](https://infura.io/)
  - [Documentazione](https://infura.io/docs)
  - Caratteristiche
    - Opzione livello gratuito
    - Ridimensionamento secondo le esigenze
    - Dati di archiviazione a pagamento
    - Assistenza diretta
    - Pannello di gestione
- [**QuikNode**](https://www.quiknode.io/)
  - Caratteristiche
    - Prova gratuita di 7 giorni
    - Supporto variabile
    - Webhook
    - Pannello di gestione
    - Analisi
- [**Rivet**](https://rivet.cloud/)
  - [Documentazione](https://rivet.readthedocs.io/en/latest/)
  - Caratteristiche
    - Opzione livello gratuito
    - Ridimensionamento secondo le esigenze
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentazione](https://ubiquity.docs.blockdaemon.com/)
  - Vantaggi
    - Pannello di gestione
    - In base al nodo
    - Analisi

## Letture consigliate {#further-reading}

- [List of Ethereum node services](https://ethereumnodes.com/)

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)

## Tutorial correlati {#related-tutorials}

- [Primi passi nello sviluppo di Ethereum usando Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Guida all'invio di transazioni tramite web3 e Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
