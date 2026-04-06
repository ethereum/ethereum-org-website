---
title: "Scalabilità di Ethereum"
description: "I rollup raggruppano le transazioni fuori catena, riducendo i costi per l'utente. Tuttavia, il modo in cui i rollup utilizzano attualmente i dati è troppo costoso, limitando quanto possano essere economiche le transazioni. Il Proto-Danksharding risolve questo problema."
lang: it
image: /images/roadmap/roadmap-transactions.png
alt: "Piano d'azione di Ethereum"
template: roadmap
---

La scalabilità di Ethereum avviene utilizzando i [livelli 2](/layer-2/#rollups) (noti anche come rollup), che raggruppano le transazioni e inviano l'output a Ethereum. Anche se i rollup sono fino a otto volte meno costosi della rete principale di Ethereum, è possibile ottimizzarli ulteriormente per ridurre i costi per gli utenti finali. I rollup si basano anche su alcuni componenti centralizzati che gli sviluppatori possono rimuovere man mano che i rollup maturano.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Costi delle transazioni
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>I rollup odierni sono <strong>\~5-20 volte</strong> più economici del livello 1 di Ethereum</li>
    <li>I rollup a conoscenza zero (ZK-rollup) abbasseranno presto le commissioni di <strong>\~40-100 volte</strong></li>
    <li>Le imminenti modifiche a Ethereum forniranno un'ulteriore scalabilità di <strong>\~100-1000 volte</strong></li>
    <li style={{ marginBottom: 0 }}>Gli utenti dovrebbero beneficiare di transazioni <strong>che costano meno di 0,001 $</strong></li>
  </ul>
</AlertContent>
</Alert>

## Rendere i dati più economici {#making-data-cheaper}

I rollup raccolgono un gran numero di transazioni, le eseguono e inviano i risultati a Ethereum. Ciò genera molti dati che devono essere apertamente disponibili in modo che chiunque possa eseguire le transazioni per conto proprio e verificare che l'operatore del rollup sia stato onesto. Se qualcuno trova una discrepanza, può sollevare una contestazione.

### Proto-Danksharding {#proto-danksharding}

I dati dei rollup sono stati storicamente archiviati su Ethereum in modo permanente, il che è costoso. Oltre il 90% del costo della transazione che gli utenti pagano sui rollup è dovuto a questa archiviazione dei dati. Per ridurre i costi delle transazioni, possiamo spostare i dati in una nuova archiviazione temporanea di "blob". I blob sono più economici perché non sono permanenti; vengono eliminati da Ethereum una volta che non sono più necessari. L'archiviazione a lungo termine dei dati dei rollup diventa responsabilità delle persone che ne hanno bisogno, come gli operatori dei rollup, gli exchange, i servizi di indicizzazione, ecc. L'aggiunta di transazioni blob a Ethereum fa parte di un aggiornamento noto come "Proto-Danksharding".

Con il Proto-Danksharding, è possibile aggiungere molti blob ai blocchi di Ethereum. Ciò consente un altro sostanziale (>100x) aumento della produttività di Ethereum e una riduzione dei costi delle transazioni.

### Danksharding {#danksharding}

La seconda fase dell'espansione dei dati blob è complicata perché richiede nuovi metodi per verificare che i dati dei rollup siano disponibili sulla rete e si basa sui [validatori](/glossary/#validator) che separano le loro responsabilità di costruzione del [blocco](/glossary/#block) e di proposta del blocco. Richiede anche un modo per dimostrare crittograficamente che i validatori hanno verificato piccoli sottoinsiemi dei dati blob.

Questo secondo passaggio è noto come ["Danksharding"](/roadmap/danksharding/). Il lavoro di implementazione continua, con progressi sui prerequisiti come la [separazione della costruzione del blocco e della proposta del blocco](/roadmap/pbs) e nuovi design di rete che consentono alla rete di confermare in modo efficiente che i dati siano disponibili campionando casualmente pochi kilobyte alla volta, noto come [campionamento della disponibilità dei dati (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Maggiori informazioni sul Danksharding</ButtonLink>

## Decentralizzare i rollup {#decentralizing-rollups}

I [rollup](/layer-2) stanno già scalando Ethereum. Un [ricco ecosistema di progetti di rollup](https://l2beat.com/scaling/tvs) sta consentendo agli utenti di effettuare transazioni in modo rapido ed economico, con una serie di garanzie di sicurezza. Tuttavia, i rollup sono stati avviati utilizzando sequenziatori centralizzati (computer che eseguono tutta l'elaborazione e l'aggregazione delle transazioni prima di inviarle a Ethereum). Questo è vulnerabile alla censura, perché gli operatori dei sequenziatori possono essere sanzionati, corrotti o altrimenti compromessi. Allo stesso tempo, i [rollup variano](https://l2beat.com/scaling/summary) nel modo in cui convalidano i dati in entrata. Il modo migliore è che i "dimostratori" (prover) inviino [prove di frode](/glossary/#fraud-proof) o prove di validità, ma non tutti i rollup sono ancora a questo punto. Anche quei rollup che utilizzano prove di validità/frode utilizzano un piccolo gruppo di dimostratori noti. Pertanto, il prossimo passo critico nella scalabilità di Ethereum è distribuire la responsabilità per l'esecuzione di sequenziatori e dimostratori a più persone.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Maggiori informazioni sui rollup</ButtonLink>

## Progressi attuali {#current-progress}

Il Proto-Danksharding è stato implementato con successo come parte dell'aggiornamento di rete Cancun-Deneb ("Dencun") a marzo 2024. Dalla sua implementazione, i rollup hanno iniziato a utilizzare l'archiviazione blob, con conseguente riduzione dei costi delle transazioni per gli utenti e milioni di transazioni elaborate nei blob.

Il lavoro sul Danksharding completo continua, con progressi sui suoi prerequisiti come la PBS (Separazione tra Proponente e Costruttore) e il DAS (Campionamento della Disponibilità dei Dati). Decentralizzare l'infrastruttura dei rollup è un processo graduale: ci sono molti rollup diversi che stanno costruendo sistemi leggermente diversi e si decentralizzeranno completamente a ritmi diversi.

[Maggiori informazioni sull'aggiornamento di rete Dencun e il suo impatto](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />