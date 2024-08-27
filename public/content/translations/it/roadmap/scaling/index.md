---
title: Ridimensionare Ethereum
description: I rollup raggruppano le transazioni al di fuori della catena, riducendo i costi per l'utente. Tuttavia, il modo in cui i rollup utilizzano i dati al momento è troppo costoso, il che limita l'economicità delle transazioni. Il Proto-Danksharding lo corregge.
lang: it
image: /images/roadmap/roadmap-transactions.png
alt: "Roadmap di Ethereum"
template: roadmap
---

Ethereum è ridimensionato utilizzando i [livelli 2](/layer-2/#rollups) (anche noti come rollup), che raggruppano le transazioni, inviando il risultato a Ethereum. Sebbene i rollup siano fino a otto volte meno costosi che sulla Rete Principale di Ethereum, è possibile ottimizzare ulteriormente i rollup per ridurre i costi per gli utenti finali. Inoltre, i rollup, si affidano ad alcuni componenti centralizzati che gli sviluppatori possono rimuovere, al maturare dei rollup.

<InfoBanner mb={8} title="Costi di transazione">
  <ul style={{ marginBottom: 0 }}>
    <li>I rollup odierni sono all'incirca da <strong>5 a 20 volte</strong> più economici del Livello 1 di Ethereum</li>
    <li>I rollup ZK ridurranno presto le commissioni di <strong>circa da 40 a 100 volte</strong></li>
    <li>I cambiamenti in arrivo su Ethereum forniranno un ulteriore ridimensionamento di <strong>circa 100-1000 volte</strong></li>
    <li style={{ marginBottom: 0 }}>Gli utenti dovrebbero beneficiare dalle transazioni <strong>dal costo inferiore a $0,001</strong></li>
  </ul>
</InfoBanner>

## Rendere più economici i dati {#making-data-cheaper}

I rollup raccolgono grandi numeri di transazioni, le eseguono e poi inviano i risultati a Ethereum. Ciò genera molti dati che devono essere disponibili apertamente, così che tutti possano eseguire le transazioni da soli, verificando che l'operatore del rollup sia onesto. Se qualcuno trova una discrepanza, può generare una sfida.

### Proto-Danksharding {#proto-danksharding}

Storicamente i dati dei rollup sono stati memorizzati in modo permanente su Ethereum, il che è costoso. Oltre il 90% dei costi di transazione pagati sui rollup è causato da tale archiviazione dei dati. Per ridurre i costi di transazione, possiamo spostare i dati in una nuova archiviazione temporanea a 'blob'. I blob sono più economici poiché non sono permanenti; sono eliminati da Ethereum una volta che non sono più necessari. La memorizzazione a lungo termine dei dati dei rollup diventa una responsabilità di coloro che li necessitano, come gli operatori dei rollup, le borse, i servizi di indicizzazione, etc. Aggiungere le transazioni di blob a Ethereum è parte di un aggiornamento noto come "Proto-Danksharding".

Con il Proto-Danksharding è possibile aggiungere molti blob ai blocchi di Ethereum. Ciò consente un altro ridimensionamento sostanziale (>100 volte) del volume di Ethereum e la riduzione dei costi di transazione.

### Danksharding {#danksharding}

La seconda fase di espansione dei dati del blob è complicata, poiché richiede nuovi metodi per verificare che i dati del rollup siano disponibili sulla rete, e fa affidamento sul fatto che i [validatori](/glossary/#validator) separino le proprie responsabilità di creazione e proposta dei [blocchi](/glossary/#block). Inoltre, richiede un metodo per provare crittograficamente che i validatori abbiano verificato piccoli sotto nsiemi dei dati dei blob.

Questa seconda fase è nota come [“Danksharding”](/roadmap/danksharding/). **Probabilmente trascorreranno diversi anni** prima della sua completa implementazione. Il danksharding si affida ad altri sviluppi come la [separazione della costruzione e della proposta dei blocchi](/roadmap/pbs) e nuovi design della rete che consentano a essa di confermare efficientemente che i dati siano disponibili, campionando casualmente pochi kilobyte per volta, procedimento noto come [campionamento della disponibilità dei dati (o DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Di più sul Danksharding</ButtonLink>

## Decentralizzare i rollup {#decentralizing-rollups}

I [rollup](/layer-2) stanno già ridimensionando Ethereum. Un [ecosistema ricco di progetti di rollup](https://l2beat.com/scaling/tvl) sta consentendo agli utenti di eseguire le transazioni rapidamente ed economicamente, con numerose garanzie di sicurezza. Tuttavia, i rollup sono stati avviati utilizzando sequenziatori centralizzati (computer che eseguono tutta l'elaborazione e aggregazione delle transazioni, prima di inviarle a Ethereum). Ciò è vulnerabile alla censura, poiché gli operatori del sequenziatore sono sanzionabili, corrompibili o, compromessi in altri modi. Al contempo, i [rollup variano](https://l2beat.com) nel modo in cui convalidano i dati in entrata. Il metodo migliore è che i "dimostratori" inviino delle [prove di frode](/glossary/#fraud-proof), o prove di validità; tuttavia, ancora non tutti i rollup ne dispongono. Persino quei rollup che utilizzano le prove di validità/frode, utilizzano un piccolo gruppo di dimostratori noti. Dunque, il prossimo passaggio critico nel ridimensionare Ethereum è distribuire la responsabilità di operare i sequenziatori e i dimostratori, tra più persone.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Maggiori informazioni sui rollup</ButtonLink>

## Stato attuale {#current-progress}

Il Proto-Danksharding è il primo di questi elementi della tabella di marcia a essere implementato, come parte dell'aggiornamento della rete Cancun-Deneb ("Dencun"), nel marzo 2024. **Il Danksharding completo richiederà probabilmente ancora diversi anni**, poiché si basa su diversi altri punti della tabella di marcia ancora da completare. La decentralizzazione dell'infrastruttura dei rollup è probabilmente un processo graduale: esistono molti rollup differenti che stanno creando sistemi lievemente differenti e si decentralizzeranno completamente a velocità diverse.

[Maggiori informazioni sull'aggiornamento della rete Dencun](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
