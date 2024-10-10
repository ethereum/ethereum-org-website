---
title: Separazione proponente-sviluppatore
description: Scopri come e perché i validatori di Ethereum divideranno le proprie responsabilità di costruzione e trasmissione dei blocchi.
lang: it
---

# Separazione proponente-sviluppatore {#proposer-builder-separation}

I validatori odierni di Ethereum creano _e_ trasmettono i blocchi. Raggruppano le transazioni che hanno sentito nella rete di gossip e le impacchettano in un blocco, inviato ai pari sulla rete di Ethereum. La **separazione tra propositore e costruttore (PBS)** divide queste mansioni tra più validatori. I costruttori di blocchi diventano responsabili della creazione dei blocchi e li offrono al propositore di blocchi, in ogni spazio. Il propositore di blocchi non può visualizzare i contenuti del blocco, semplicemente, sceglie il più profittevole, pagando una commissione al suo costruttore, prima di inviarlo i suoi pari.

Questo è un aggiornamento importante per svariati motivi. Primo, crea opportunità per prevenire la censura delle transazioni al livello del protocollo. Secondo, impedisce ai validatori hobbisti di essere "battuti" dalla concorrenza di utenti istituzionali, che possono meglio ottimizzare la redditività della costruzione del proprio blocco. Terzo, aiuta a ridimensionare Ethereum, consentendo gli aggiornamenti di Danksharding.

## PBS e resistenza alla censura {#pbs-and-censorship-resistance}

La separazione dei costruttori e propositori di blocchi complica per i costruttori di blocchi la censura delle transazioni. Questo perché, dei criteri di inclusione relativamente complessi possono essere aggiunti, assicurando che non avvenga alcuna censura, prima della proposta del blocco. Poiché il propositore di blocchi è un'entità separata dal costruttore di blocchi, può assumere il ruolo di protettore, contro la censura dei costruttori di blocchi.

Ad esempio, possono essere introdotti degli elenchi di inclusione, così che quando i validatori entrano a conoscenza delle transazioni ma non le vedono incluse nei blocchi, possono imporle come necessarie nel blocco successivo. L'elenco di inclusione è generato dal mempool locale dei propositori di blocchi (l'elenco di transazioni di cui sono a conoscenza) ed è inviato ai loro pari, poco prima che un blocco sia proposto. Se una delle transazioni dall'elenco di inclusione è mancante, il propositore potrebbe rifiutare il blocco, aggiungere le transazioni mancanti prima di proporle o proporle e far sì che siano rifiutate dagli altri validatori, quando la ricevono. Inoltre, esiste una versione potenzialmente più efficiente di questa idea, che afferma che i costruttori devono utilizzare completamente lo spazio disponibile del blocco e, altrimenti, le transazioni sono aggiunte dall'elenco di inclusione del propositore. Questa è ancora un'area di ricerca attiva e la configurazione ottimale per gli elenchi di inclusione non è ancora stata determinata.

I [mempool crittografati](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3), inoltre, potrebbero rendere impossibile per costruttori e propositori, sapere quali transazioni stiano includendo in un blocco, dopo che questo è già stato trasmesso.

<ExpandableCard title="Che tipi di censura sono risolti dalla PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Potenti organizzazioni possono spingere i validatori a censurare le transazioni da o verso certi indirizzi. I validatori si conformano a tale pressione rilevando gli indirizzi nella lista nera del proprio gruppo di transazioni e omettendoli dai blocchi che propongono. Dopo la PBS, non sarà più possibile poiché i propositori di blocchi non sapranno quali transazioni stanno trasmettendo nei propri blocchi. Potrebbe essere importante, per certi individui o app, conformarsi alle regole di censura, ad esempio, quando è emanata una legge nella loro regione. In tali casi, la conformità si verifica a livello di applicazione, mentre il protocolo rimane privo di permessi e di censura.

</ExpandableCard>

## PBS e MEV {#pbs-and-mev}

Il **Valore Massimo Estraibile (MEV)** fa riferimento ai validatori che massimizzano la propria redditività, ordinando favorevolmente le transazioni. Esempi comuni includono gli scambi di arbitraggio sulle piattaforme di scambio decentralizzate (es. frontrunning di una grande vendita o un grande acquisto) o identificazione di opportunità per liquidare posizioni della DeFi. La massimizzazione del MEV richiede conoscenze tecniche sofisticate e software personalizzati aggiunti ai normali validatori, rendendo più probabile che gli operatori istituzionali surclassino i validatori individuali e hobbisti all'estrazione del MEV. Ciò significa che i rendimenti da staking potrebbero essere maggiori con operatori centralizzati, creando una forza centralizzante che disincentiva lo staking domestico.

La PBS risolve questo problema, riconfigurando l'economia del MEV. Invece del propositore di blocchi che svolge la propria ricerca del MEV seleziona semplicement eun blocco fra i tanti che gli vengono offerti dai costruttori di blocchi. I costruttori di blocchi potrebbero aver compiuto una sofisticata estrazione del MEV, ma la ricompensa va al propositore di blocchi. Ciò significa che, anche se un piccolo gruppo di costruttori di blocchi specializzati domina l'estrazione del MEV, la ricompensa potrebbe andare a qualsiasi validatore sulla rete, inclusi gli staker domestici in solo.

<ExpandableCard title="Perché va bene centralizzare la costruzione dei blocchi?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Gli individui potrebbero essere incentivati a mettere in staking in gruppo, piuttosto che per conto proprio, grazie alle ricompense migliorate, offerte dalle sofisticate strategie di MEV. La separazione della costruzione e proposta dei blocchi significa che il MEV estratto sarà distribuito su più validatori, piuttosto che centralizzato con il ricercatore di MEV più efficiente. Al contempo, consentire ai costruttori di blocchi specializzati di esistere prende l'onere di costruzione dei blocchi dai singoli individui, impedendo ai singoli di rubare il MEV per sé stessi, pur massimizzando il numero di validatori individuali e indipendenti, che possono verificare che i blocchi siano onesti. Il concetto importante è la "asimmetria tra dimostratore e verificatore", che fa riferimento all'idea che la produzione centralizzata dei blocchi vada bene, finché è una rete di validatori robusta e massimamente decentralizzata, capace di provare che i blocchi sono onesti. La decentralizzazione è un mezzo, non un obiettivo finale; ciò che vogliamo sono blocchi onesti.
</ExpandableCard>

## PBS e Danksharding {#pbs-and-danksharding}

Il danksharding è come Ethereum si ridimensionerà a circa 100.000 transazioni al secondo e minimizzerà le commissioni per gli utenti dei rollup. Si affida alla PBS poiché si somma al carico di lavoro per i costruttori di blocchi, che dovranno calcolare prove fino a 64MB dei dati di rollup, in meno di 1 secondo. Ciò probabilmente richiederà costruttori specializzati, che possano dedicare hardware importanti a questa attività. Tuttavia, nella situazione corrente, la costruzione dei blocchi potrebbe divenire sempre più centralizzata, con operatori più sofisticati e potenti, grazie all'estrazione del MEV. La separazione tra propositori e costruttori è un modo per abbracciare tale realtà, impedendogli di esercitare una forza centrale sulla validazione dei blocchi (la parte importante) o sulla distribuzione delle ricompense di staking. Un ottimo beneficio collaterale è che i costruttori di blocchi specializzati sono anche disposti e capaci di calcolare le prove di dati necessarie per il Danksharding.

## Stato attuale {#current-progress}

La PBS è in una fase di ricerca avanzata, ma esistono ancora delle importanti domande di design che devono essere risolte prima che possa essere prototipata nei client di Ethereum. Non esistono ancora delle specifiche finalizzate. Ciò significa che la PBS potrebbe ancora richiedere qualche anno. Consulta lo [stato della ricerca](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance) più recente.

## Letture consigliate {#further-reading}

- [Stato della ricerca: resistenza alla censura sotto PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Design di mercato delle commissioni pratici per PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS e resistenza alla censura](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Elenchi di inclusione](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
