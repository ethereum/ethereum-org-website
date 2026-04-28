---
title: Separazione tra proponente e costruttore
description: "Scopri come e perché i validatori di Ethereum divideranno le loro responsabilità di costruzione e trasmissione dei blocchi."
lang: it
---

# Separazione tra proponente e costruttore {#proposer-builder-separation}

Gli attuali [validatori](/) di [Ethereum](/) creano _e_ trasmettono i blocchi. Raggruppano le transazioni di cui sono venuti a conoscenza tramite la rete di gossip e le confezionano in un blocco che viene inviato ai peer sulla rete di Ethereum. La **separazione tra proponente e costruttore (PBS)** divide questi compiti tra più validatori. I costruttori di blocchi diventano responsabili della creazione dei blocchi e della loro offerta al proponente del blocco in ogni slot. Il proponente del blocco non può vedere i contenuti del blocco, sceglie semplicemente quello più redditizio, pagando una commissione al costruttore del blocco prima di inviare il blocco ai suoi peer.

Questo è un aggiornamento importante per diverse ragioni. In primo luogo, crea opportunità per prevenire la censura delle transazioni a livello di protocollo. In secondo luogo, impedisce che i validatori amatoriali vengano superati dalla concorrenza di attori istituzionali che possono ottimizzare meglio la redditività della loro costruzione dei blocchi. In terzo luogo, aiuta con la scalabilità di Ethereum abilitando gli aggiornamenti di Danksharding.

## PBS e resistenza alla censura {#pbs-and-censorship-resistance}

Separare i costruttori di blocchi e i proponenti dei blocchi rende molto più difficile per i costruttori di blocchi censurare le transazioni. Questo perché possono essere aggiunti criteri di inclusione relativamente complessi che assicurano che non sia avvenuta alcuna censura prima che il blocco venga proposto. Poiché il proponente del blocco è un'entità separata dal costruttore del blocco, può assumere il ruolo di protettore contro i costruttori di blocchi che censurano.

Ad esempio, possono essere introdotte liste di inclusione in modo che quando i validatori sono a conoscenza di transazioni ma non le vedono incluse nei blocchi, possano imporle come obbligatorie nel blocco successivo. La lista di inclusione viene generata dalla mempool locale del proponente del blocco (la lista di transazioni di cui è a conoscenza) e inviata ai suoi peer appena prima che un blocco venga proposto. Se manca una qualsiasi delle transazioni dalla lista di inclusione, il proponente potrebbe rifiutare il blocco, aggiungere le transazioni mancanti prima di proporlo, oppure proporlo e lasciare che venga rifiutato dagli altri validatori quando lo ricevono. Esiste anche una versione potenzialmente più efficiente di questa idea che asserisce che i costruttori debbano utilizzare appieno lo spazio disponibile nel blocco e, in caso contrario, le transazioni vengono aggiunte dalla lista di inclusione del proponente. Questa è ancora un'area di ricerca attiva e la configurazione ottimale per le liste di inclusione non è ancora stata determinata.

Le [mempool crittografate](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) potrebbero anche rendere impossibile per i costruttori e i proponenti sapere quali transazioni stanno includendo in un blocco fino a dopo che il blocco è già stato trasmesso.

<ExpandableCard title="Quali tipi di censura risolve la PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Organizzazioni potenti possono fare pressione sui validatori affinché censurino le transazioni da o verso determinati indirizzi. I validatori si conformano a questa pressione rilevando gli indirizzi in lista nera nel loro pool di transazioni e omettendoli dai blocchi che propongono. Dopo la PBS questo non sarà più possibile perché i proponenti dei blocchi non sapranno quali transazioni stanno trasmettendo nei loro blocchi. Potrebbe essere importante per determinati individui o app conformarsi alle regole di censura, ad esempio quando diventa legge nella loro regione. In questi casi, la conformità avviene a livello di applicazione, mentre il protocollo rimane senza permessi e libero dalla censura.
</ExpandableCard>

## PBS e MEV {#pbs-and-mev}

Il **valore massimo estraibile (MEV)** si riferisce ai validatori che massimizzano la loro redditività ordinando favorevolmente le transazioni. Esempi comuni includono l'arbitraggio degli scambi sugli exchange decentralizzati (ad es., il frontrunning di una grande vendita o acquisto) o l'identificazione di opportunità per liquidare posizioni DeFi. Massimizzare il MEV richiede un know-how tecnico sofisticato e software personalizzato aggiunto ai normali validatori, rendendo molto più probabile che gli operatori istituzionali superino gli individui e i validatori amatoriali nell'estrazione del MEV. Ciò significa che i rendimenti dello staking saranno probabilmente più alti con gli operatori centralizzati, creando una forza centralizzante che disincentiva lo staking domestico.

La PBS risolve questo problema riconfigurando l'economia del MEV. Invece che il proponente del blocco faccia la propria ricerca di MEV, sceglie semplicemente un blocco tra i molti offerti dai costruttori di blocchi. I costruttori di blocchi potrebbero aver effettuato una sofisticata estrazione di MEV, ma la ricompensa per essa va al proponente del blocco. Ciò significa che anche se un piccolo gruppo di costruttori di blocchi specializzati domina l'estrazione di MEV, la ricompensa per essa potrebbe andare a qualsiasi validatore sulla rete, inclusi i singoli staker domestici.

<ExpandableCard title="Perché va bene centralizzare la costruzione dei blocchi?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Gli individui potrebbero essere incentivati a fare staking con le pool piuttosto che da soli a causa delle maggiori ricompense offerte da sofisticate strategie MEV. Separare la costruzione del blocco dalla proposta del blocco significa che il MEV estratto sarà distribuito su più validatori piuttosto che centralizzarsi con il ricercatore MEV più efficace. Allo stesso tempo, consentire l'esistenza di costruttori di blocchi specializzati toglie l'onere della costruzione dei blocchi agli individui, e impedisce anche agli individui di rubare il MEV per se stessi, massimizzando al contempo il numero di validatori individuali e indipendenti che possono verificare che i blocchi siano onesti. Il concetto importante è l'"asimmetria dimostratore-verificatore" che si riferisce all'idea che la produzione centralizzata dei blocchi va bene finché esiste una rete di validatori robusta e massimamente decentralizzata in grado di dimostrare che i blocchi sono onesti. La decentralizzazione è un mezzo, non un obiettivo finale: ciò che vogliamo sono blocchi onesti.
</ExpandableCard>

## PBS e Danksharding {#pbs-and-danksharding}

Il Danksharding è il modo in cui Ethereum scalerà a >100.000 transazioni al secondo e minimizzerà le commissioni per gli utenti dei rollup. Si basa sulla PBS perché aggiunge carico di lavoro ai costruttori di blocchi, che dovranno calcolare prove per un massimo di 64 MB di dati di rollup in meno di 1 secondo. Questo richiederà probabilmente costruttori specializzati in grado di dedicare hardware piuttosto sostanziale al compito. Tuttavia, nella situazione attuale la costruzione dei blocchi potrebbe diventare sempre più centralizzata attorno a operatori più sofisticati e potenti in ogni caso a causa dell'estrazione di MEV. La separazione tra proponente e costruttore è un modo per abbracciare questa realtà e impedire che eserciti una forza centralizzante sulla convalida dei blocchi (la parte importante) o sulla distribuzione delle ricompense di staking. Un grande vantaggio collaterale è che i costruttori di blocchi specializzati sono anche disposti e in grado di calcolare le prove dei dati necessarie per il Danksharding.

## Progressi attuali {#current-progress}

La PBS è in una fase avanzata di ricerca, ma ci sono ancora alcune importanti questioni di progettazione che devono essere risolte prima che possa essere prototipata nei client di Ethereum. Non esiste ancora una specifica finalizzata. Ciò significa che la PBS è probabilmente lontana un anno o più. Controlla l'ultimo [stato della ricerca](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Letture consigliate {#further-reading}

- [Stato della ricerca: resistenza alla censura con la PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Progetti di mercato delle commissioni compatibili con la PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS e resistenza alla censura](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Liste di inclusione](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)