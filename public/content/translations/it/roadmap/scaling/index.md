---
title: Ridimensionare Ethereum
description: "I rollup raggruppano le transazioni al di fuori della catena, riducendo i costi per l'utente. Tuttavia, il modo in cui i rollup utilizzano i dati al momento è troppo costoso, il che limita l'economicità delle transazioni. Il Proto-Danksharding lo corregge."
lang: it
image: /images/roadmap/roadmap-transactions.png
alt: "Roadmap di Ethereum"
template: roadmap
---

Ethereum è ridimensionato utilizzando i [livelli 2](/layer-2/#rollups) (anche noti come rollup), che raggruppano le transazioni e inviano il risultato a Ethereum. Sebbene i rollup siano fino a otto volte meno costosi che sulla Rete Principale di Ethereum, è possibile ottimizzare ulteriormente i rollup per ridurre i costi per gli utenti finali. Inoltre, i rollup, si affidano ad alcuni componenti centralizzati che gli sviluppatori possono rimuovere, al maturare dei rollup.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Costi di transazione
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>I rollup odierni sono all'incirca da <strong>5 a 20 volte</strong> più economici del Livello 1 di Ethereum</li>
    <li>I rollup ZK ridurranno presto le commissioni di <strong>circa da 40 a 100 volte</strong></li>
    <li>I cambiamenti in arrivo su Ethereum forniranno un ulteriore ridimensionamento di <strong>circa 100-1000 volte</strong></li>
    <li style={{ marginBottom: 0 }}>Gli utenti dovrebbero beneficiare dalle transazioni <strong>dal costo inferiore a $0,001</strong></li>
  </ul>
</AlertContent>
</Alert>

## Rendere i dati più economici {#making-data-cheaper}

I rollup raccolgono grandi numeri di transazioni, le eseguono e poi inviano i risultati a Ethereum. Ciò genera molti dati che devono essere disponibili apertamente, così che tutti possano eseguire le transazioni da soli, verificando che l'operatore del rollup sia onesto. Se qualcuno trova una discrepanza, può generare una sfida.

### Proto-Danksharding {#proto-danksharding}

Storicamente i dati dei rollup sono stati memorizzati in modo permanente su Ethereum, il che è costoso. Oltre il 90% dei costi di transazione pagati sui rollup è causato da tale archiviazione dei dati. Per ridurre i costi di transazione, possiamo spostare i dati in una nuova archiviazione temporanea a 'blob'. I blob sono più economici poiché non sono permanenti; sono eliminati da Ethereum una volta che non sono più necessari. La memorizzazione a lungo termine dei dati dei rollup diventa una responsabilità di coloro che li necessitano, come gli operatori dei rollup, le borse, i servizi di indicizzazione, etc. Aggiungere le transazioni di blob a Ethereum è parte di un aggiornamento noto come "Proto-Danksharding".

Con il Proto-Danksharding è possibile aggiungere molti blob ai blocchi di Ethereum. Ciò consente un altro ridimensionamento sostanziale (>100x) del volume di Ethereum e la riduzione dei costi di transazione.

### Danksharding {#danksharding}

La seconda fase dell'espansione dei dati blob è complicata perché richiede nuovi metodi per verificare che i dati dei rollup siano disponibili sulla rete e si basa sul fatto che i [validatori](/glossary/#validator) separino le loro responsabilità di costruzione del [blocco](/glossary/#block) e di proposta del blocco. Inoltre, richiede un metodo per provare crittograficamente che i validatori abbiano verificato piccoli sotto nsiemi dei dati dei blob.

Questo secondo passo è noto come ["Danksharding"](/roadmap/danksharding/). Il lavoro di implementazione continua, con progressi sui prerequisiti come la [separazione della costruzione e della proposta dei blocchi](/roadmap/pbs) e nuovi design di rete che consentono alla rete di confermare in modo efficiente che i dati siano disponibili campionando casualmente pochi kilobyte alla volta, una procedura nota come [campionamento della disponibilità dei dati (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Maggiori informazioni su Danksharding</ButtonLink>

## Decentralizzare i rollup {#decentralizing-rollups}

I [rollup](/layer-2) stanno già ridimensionando Ethereum. Un [ricco ecosistema di progetti di rollup](https://l2beat.com/scaling/tvs) consente agli utenti di effettuare transazioni in modo rapido ed economico, con una serie di garanzie di sicurezza. Tuttavia, i rollup sono stati avviati utilizzando sequenziatori centralizzati (computer che eseguono tutta l'elaborazione e aggregazione delle transazioni, prima di inviarle a Ethereum). Ciò è vulnerabile alla censura, poiché gli operatori del sequenziatore sono sanzionabili, corrompibili o, compromessi in altri modi. Allo stesso tempo, i [rollup variano](https://l2beat.com/scaling/summary) nel modo in cui convalidano i dati in entrata. Il modo migliore è che i "prover" inviino [prove di frode](/glossary/#fraud-proof) o prove di validità, ma non tutti i rollup sono ancora a quel punto. Persino quei rollup che utilizzano le prove di validità/frode, utilizzano un piccolo gruppo di dimostratori noti. Dunque, il prossimo passaggio critico nel ridimensionare Ethereum è distribuire la responsabilità di operare i sequenziatori e i dimostratori, tra più persone.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Maggiori informazioni sui rollup</ButtonLink>

## Progressi attuali {#current-progress}

Il Proto-Danksharding è stato implementato con successo come parte dell'aggiornamento della rete Cancun-Deneb ("Dencun") a marzo 2024. Dalla sua implementazione, i rollup hanno iniziato a utilizzare l'archiviazione blob, riducendo i costi di transazione per gli utenti ed elaborando milioni di transazioni nei blob.

Il lavoro sul Danksharding completo continua, con progressi sui suoi prerequisiti come PBS (Proposer-Builder Separation) e DAS (Data Availability Sampling). La decentralizzazione dell'infrastruttura dei rollup è un processo graduale: esistono molti rollup diversi che stanno costruendo sistemi leggermente diversi e si decentralizzeranno completamente a ritmi diversi.

[Maggiori informazioni sull'aggiornamento della rete Dencun e sul suo impatto](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
