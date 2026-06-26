---
title: Scalare Ethereum
description: "I rollup raggruppano le transazioni offchain, riducendo i costi per l'utente. Tuttavia, il modo in cui i rollup utilizzano attualmente i dati è troppo costoso, limitando quanto possano essere economiche le transazioni. Il Proto-Danksharding risolve questo problema."
lang: it
image: /images/roadmap/roadmap-transactions.png
alt: "Roadmap di Ethereum"
template: roadmap
---

Ethereum viene scalato utilizzando i [layer 2](/layer-2/#rollups) (noti anche come rollup), che raggruppano le transazioni e inviano l'output a Ethereum. Anche se i rollup sono fino a otto volte meno costosi della Mainnet di Ethereum, è possibile ottimizzarli ulteriormente per ridurre i costi per gli utenti finali. I rollup si basano anche su alcuni componenti centralizzati che gli sviluppatori possono rimuovere man mano che i rollup maturano.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Costi delle transazioni
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>I rollup odierni sono <strong>\~5-20 volte</strong> più economici del layer 1 di Ethereum</li>
    <li>Gli ZK-rollup abbasseranno presto le commissioni di <strong>\~40-100 volte</strong></li>
    <li>Le imminenti modifiche a Ethereum forniranno un'ulteriore scalabilità di <strong>\~100-1000 volte</strong></li>
 <li style={{ marginBottom: 0 }}>Gli utenti dovrebbero beneficiare di transazioni <strong>che costano meno di 0,001 $</strong></li>
  </ul>
</AlertContent>
</Alert>

## Rendere i dati più economici {#making-data-cheaper}

I rollup raccolgono un gran numero di transazioni, le eseguono e inviano i risultati a Ethereum. Ciò genera molti dati che devono essere apertamente disponibili in modo che chiunque possa eseguire le transazioni per conto proprio e verificare che l'operatore del rollup sia stato onesto. Se qualcuno trova una discrepanza, può sollevare una contestazione.

### Proto-Danksharding {#proto-danksharding}

I dati dei rollup sono stati storicamente archiviati su Ethereum in modo permanente, il che è costoso. Oltre il 90% del costo delle transazioni che gli utenti pagano sui rollup è dovuto a questa archiviazione dei dati. Per ridurre i costi delle transazioni, possiamo spostare i dati in una nuova archiviazione temporanea di 'blob'. I blob sono più economici perché non sono permanenti; vengono eliminati da Ethereum una volta che non sono più necessari. L'archiviazione a lungo termine dei dati dei rollup diventa responsabilità delle persone che ne hanno bisogno, come gli operatori dei rollup, gli exchange, i servizi di indicizzazione, ecc. L'aggiunta di transazioni blob a Ethereum fa parte di un aggiornamento noto come "Proto-Danksharding".

Con il Proto-Danksharding, è possibile aggiungere molti blob ai blocchi di Ethereum. Ciò consente un altro sostanziale aumento (>100x) della capacità transazionale di Ethereum e una riduzione dei costi delle transazioni.

### Danksharding {#danksharding}

La seconda fase di espansione dei dati dei blob è complicata perché richiede nuovi metodi per verificare che i dati dei rollup siano disponibili sulla rete e si basa sui [validatori](/glossary/#validator) che separano le loro responsabilità di costruzione del [blocco](/glossary/#block) e di proposta del blocco. Richiede anche un modo per dimostrare crittograficamente che i validatori abbiano verificato piccoli sottoinsiemi dei dati dei blob.

Questo secondo passaggio è noto come ["Danksharding"](/roadmap/danksharding/). Il lavoro di implementazione continua, con progressi sui prerequisiti come la [separazione della costruzione e della proposta dei blocchi](/roadmap/pbs) e nuovi design di rete che consentono alla rete di confermare in modo efficiente che i dati siano disponibili campionando casualmente pochi kilobyte alla volta, noto come [campionamento della disponibilità dei dati (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Maggiori informazioni sul Danksharding</ButtonLink>

## Decentralizzare i rollup {#decentralizing-rollups}

I [rollup](/layer-2) stanno già scalando Ethereum. Un [ricco ecosistema di progetti di rollup](https://l2beat.com/scaling/tvs) sta consentendo agli utenti di effettuare transazioni in modo rapido ed economico, con una serie di garanzie di sicurezza. Tuttavia, i rollup sono stati avviati utilizzando sequencer centralizzati (computer che eseguono tutta l'elaborazione e l'aggregazione delle transazioni prima di inviarle a Ethereum). Ciò è vulnerabile alla censura, perché gli operatori dei sequencer possono essere sanzionati, corrotti o altrimenti compromessi. Allo stesso tempo, i [rollup variano](https://l2beat.com/scaling/summary) nel modo in cui convalidano i dati in entrata. Il modo migliore è che i "prover" inviino [prove di frode](/glossary/#fraud-proof) o prove di validità, ma non tutti i rollup ci sono ancora arrivati. Anche quei rollup che utilizzano prove di validità/frode si avvalgono di un piccolo gruppo di prover noti. Pertanto, il prossimo passo fondamentale per scalare Ethereum è distribuire la responsabilità dell'esecuzione di sequencer e prover a un numero maggiore di persone.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Maggiori informazioni sui rollup</ButtonLink>

## Progressi attuali {#current-progress}

Il Proto-Danksharding è stato implementato con successo come parte dell'aggiornamento della rete Cancun-Deneb ("Dencun") a marzo 2024. Dalla sua implementazione, i rollup hanno iniziato a utilizzare l'archiviazione dei blob, con conseguente riduzione dei costi delle transazioni per gli utenti e milioni di transazioni elaborate nei blob.

Il lavoro sul Danksharding completo continua, con progressi sui suoi prerequisiti come la PBS (separazione proponente-costruttore) e il DAS (campionamento della disponibilità dei dati). La decentralizzazione dell'infrastruttura dei rollup è un processo graduale: ci sono molti rollup diversi che stanno costruendo sistemi leggermente diversi e si decentralizzeranno completamente a ritmi diversi.

[Maggiori informazioni sull'aggiornamento di rete Dencun e sul suo impatto](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />