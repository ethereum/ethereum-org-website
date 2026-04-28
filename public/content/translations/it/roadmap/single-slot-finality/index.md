---
title: "Finalità a singolo slot"
description: "Spiegazione della finalità a singolo slot"
lang: it
---

# Finalità a singolo slot {#single-slot-finality}

Ci vogliono circa 15 minuti affinché un blocco di [Ethereum](/) raggiunga la finalità. Tuttavia, possiamo fare in modo che il meccanismo di consenso di Ethereum convalidi i blocchi in modo più efficiente e riduca drasticamente il tempo di finalità. Invece di aspettare quindici minuti, i blocchi potrebbero essere proposti e finalizzati nello stesso slot. Questo concetto è noto come **finalità a singolo slot (SSF)**.

## Cos'è la finalità? {#what-is-finality}

Nel meccanismo di consenso basato sulla prova di stake di Ethereum, la finalità si riferisce alla garanzia che un blocco non possa essere alterato o rimosso dalla blockchain senza bruciare almeno il 33% degli ETH totali in stake. Questa è una sicurezza "criptoeconomica" perché la fiducia deriva dal costo estremamente elevato associato alla modifica dell'ordine o del contenuto della catena, che impedirebbe a qualsiasi attore economico razionale di provarci.

## Perché puntare a una finalità più rapida? {#why-aim-for-quicker-finality}

L'attuale tempo di finalità si è rivelato troppo lungo. La maggior parte degli utenti non vuole aspettare 15 minuti per la finalità, ed è scomodo per le app e gli exchange che potrebbero desiderare un'elevata produttività delle transazioni dover aspettare così tanto per essere certi che le loro transazioni siano permanenti. Avere un ritardo tra la proposta di un blocco e la sua finalizzazione crea anche un'opportunità per brevi riorganizzazioni che un utente malintenzionato potrebbe utilizzare per censurare determinati blocchi o estrarre il MEV. Anche il meccanismo che si occupa dell'aggiornamento dei blocchi in fasi è piuttosto complesso ed è stato corretto diverse volte per chiudere le vulnerabilità di sicurezza, rendendolo una delle parti della base di codice di Ethereum in cui è più probabile che si verifichino bug sottili. Tutti questi problemi potrebbero essere eliminati riducendo il tempo di finalità a un singolo slot.

## Il compromesso tra decentralizzazione, tempo e sovraccarico {#the-decentralization-time-overhead-tradeoff}

La garanzia di finalità non è una proprietà immediata di un nuovo blocco; ci vuole tempo affinché un nuovo blocco raggiunga la finalità. Il motivo è che i validatori che rappresentano almeno i 2/3 degli ETH totali in stake sulla rete devono votare per il blocco ("attestare") affinché sia considerato finalizzato. Ogni nodo validatore sulla rete deve elaborare le attestazioni degli altri nodi per sapere se un blocco ha, o non ha, raggiunto quella soglia dei 2/3.

Più breve è il tempo concesso per raggiungere la finalizzazione, maggiore è la potenza di calcolo richiesta a ciascun nodo perché l'elaborazione dell'attestazione deve essere eseguita più velocemente. Inoltre, più nodi validatori esistono sulla rete, più attestazioni devono essere elaborate per ogni blocco, aumentando anche la potenza di elaborazione richiesta. Maggiore è la potenza di elaborazione richiesta, meno persone possono partecipare perché è necessario un hardware più costoso per eseguire ciascun nodo validatore. Aumentare il tempo tra i blocchi riduce la potenza di calcolo richiesta a ciascun nodo ma allunga anche il tempo di finalità, perché le attestazioni vengono elaborate più lentamente.

Pertanto, esiste un compromesso tra il sovraccarico (potenza di calcolo), la decentralizzazione (numero di nodi che possono partecipare alla convalida della catena) e il tempo di finalità. Il sistema ideale bilancia la minima potenza di calcolo, la massima decentralizzazione e il minimo tempo di finalità.

L'attuale meccanismo di consenso di Ethereum ha bilanciato questi tre parametri:

- **Impostando lo stake minimo a 32 ETH**. Questo stabilisce un limite superiore al numero di attestazioni dei validatori che devono essere elaborate dai singoli nodi e, di conseguenza, un limite superiore ai requisiti computazionali per ciascun nodo.
- **Impostando il tempo di finalità a ~15 minuti**. Questo dà tempo sufficiente ai validatori eseguiti su normali computer domestici per elaborare in sicurezza le attestazioni per ogni blocco.

Con l'attuale progettazione del meccanismo, per ridurre il tempo di finalità, è necessario ridurre il numero di validatori sulla rete o aumentare i requisiti hardware per ciascun nodo. Tuttavia, ci sono miglioramenti che possono essere apportati al modo in cui vengono elaborate le attestazioni che possono consentire di contare più attestazioni senza aumentare il sovraccarico su ciascun nodo. L'elaborazione più efficiente consentirà di determinare la finalità all'interno di un singolo slot, piuttosto che in due epoche.

## Percorsi verso la SSF {#routes-to-ssf}

<ExpandableCard title= "Perché non possiamo avere la SSF oggi?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

L'attuale meccanismo di consenso combina le attestazioni di più validatori, noti come comitati, per ridurre il numero di messaggi che ogni validatore deve elaborare per convalidare un blocco. Ogni validatore ha l'opportunità di attestare in ogni epoca (32 slot) ma in ogni slot, solo un sottoinsieme di validatori, noto come "comitato", attesta. Lo fanno dividendosi in sottoreti in cui alcuni validatori vengono selezionati per essere "aggregatori". Ognuno di questi aggregatori combina tutte le firme che vede dagli altri validatori nella propria sottorete in un'unica firma aggregata. L'aggregatore che include il maggior numero di contributi individuali passa la propria firma aggregata al proponente del blocco, che la include nel blocco insieme alla firma aggregata degli altri comitati.

Questo processo fornisce una capacità sufficiente affinché ogni validatore possa votare in ogni epoca, perché `32 slot * 64 comitati * 256 validatori per comitato = 524.288 validatori per epoca`. Al momento della stesura di questo documento (febbraio 2023) ci sono ~513.000 validatori attivi.

In questo schema, è possibile per ogni validatore votare su un blocco solo distribuendo le proprie attestazioni sull'intera epoca. Tuttavia, ci sono potenzialmente modi per migliorare il meccanismo in modo che _ogni validatore abbia la possibilità di attestare in ogni slot_.
</ExpandableCard>

Da quando è stato progettato il meccanismo di consenso di Ethereum, lo schema di aggregazione delle firme (BLS) si è rivelato molto più scalabile di quanto si pensasse inizialmente, mentre è migliorata anche la capacità dei client di elaborare e verificare le firme. Si scopre che l'elaborazione delle attestazioni da un numero enorme di validatori è effettivamente possibile all'interno di un singolo slot. Ad esempio, con un milione di validatori che votano ciascuno due volte in ogni slot e tempi di slot regolati a 16 secondi, ai nodi verrebbe richiesto di verificare le firme a una velocità minima di 125.000 aggregazioni al secondo per elaborare tutti i 1 milione di attestazioni all'interno dello slot. In realtà, un normale computer impiega circa 500 nanosecondi per eseguire una verifica della firma, il che significa che 125.000 possono essere eseguite in ~62,5 ms, ben al di sotto della soglia di un secondo.

Ulteriori guadagni di efficienza potrebbero essere ottenuti creando supercomitati di, ad esempio, 125.000 validatori selezionati casualmente per slot. Solo questi validatori possono votare su un blocco e quindi solo questo sottoinsieme di validatori decide se un blocco è finalizzato. Se questa sia una buona idea o meno dipende da quanto la community preferirebbe che fosse costoso un attacco riuscito a Ethereum. Questo perché invece di richiedere i 2/3 degli ether totali in stake, un utente malintenzionato potrebbe finalizzare un blocco disonesto con i 2/3 degli ether in stake _in quel supercomitato_. Questa è ancora un'area di ricerca attiva, ma sembra plausibile che per un set di validatori sufficientemente grande da richiedere in primo luogo i supercomitati, il costo per attaccare uno di quei sottocomitati sarà estremamente elevato (ad esempio, il costo dell'attacco denominato in ETH sarebbe `2/3 * 125.000 * 32 = ~2,6 milioni di ETH`). Il costo dell'attacco può essere regolato aumentando la dimensione del set di validatori (ad esempio, sintonizzare la dimensione del validatore in modo che il costo dell'attacco sia pari a 1 milione di ether, 4 milioni di ether, 10 milioni di ether, ecc.). I [sondaggi preliminari](https://youtu.be/ojBgyFl6-v4?t=755) della community sembrano suggerire che 1-2 milioni di ether siano un costo di attacco accettabile, il che implica ~65.536 - 97.152 validatori per supercomitato.

Tuttavia, la verifica non è il vero collo di bottiglia: è l'aggregazione delle firme che mette davvero alla prova i nodi validatori. Per scalare l'aggregazione delle firme sarà probabilmente necessario aumentare il numero di validatori in ciascuna sottorete, aumentare il numero di sottoreti o aggiungere ulteriori livelli di aggregazione (ovvero, implementare comitati di comitati). Parte della soluzione potrebbe essere consentire aggregatori specializzati, in modo simile a come la costruzione dei blocchi e la generazione di impegni per i dati dei rollup saranno esternalizzate a costruttori di blocchi specializzati in base alla separazione proponente-costruttore (PBS) e al Danksharding.

## Qual è il ruolo della regola di scelta della biforcazione nella SSF? {#role-of-the-fork-choice-rule}

Il meccanismo di consenso odierno si basa su uno stretto accoppiamento tra il gadget di finalità (l'algoritmo che determina se i 2/3 dei validatori hanno attestato una determinata catena) e la regola di scelta della biforcazione (l'algoritmo che decide quale catena è quella corretta quando ci sono più opzioni). L'algoritmo di scelta della biforcazione considera solo i blocchi _a partire_ dall'ultimo blocco finalizzato. Con la SSF non ci sarebbero blocchi da considerare per la regola di scelta della biforcazione, perché la finalità si verifica nello stesso slot in cui viene proposto il blocco. Ciò significa che con la SSF _o_ l'algoritmo di scelta della biforcazione _o_ il gadget di finalità sarebbero attivi in qualsiasi momento. Il gadget di finalità finalizzerebbe i blocchi in cui i 2/3 dei validatori fossero online e attestassero onestamente. Se un blocco non è in grado di superare la soglia dei 2/3, entrerebbe in gioco la regola di scelta della biforcazione per determinare quale catena seguire. Questo crea anche l'opportunità di mantenere il meccanismo di perdita per inattività che recupera una catena in cui >1/3 dei validatori va offline, sebbene con alcune sfumature aggiuntive.

## Problemi in sospeso {#outstanding-issues}

Il problema con il ridimensionamento dell'aggregazione aumentando il numero di validatori per sottorete è che porta a un carico maggiore sulla rete peer-to-peer. Il problema con l'aggiunta di livelli di aggregazione è che è piuttosto complesso da progettare e aggiunge latenza (ovvero, potrebbe volerci più tempo affinché il proponente del blocco riceva notizie da tutti gli aggregatori della sottorete). Inoltre, non è chiaro come affrontare lo scenario in cui ci sono più validatori attivi sulla rete di quanti possano essere fattibilmente elaborati in ogni slot, anche con l'aggregazione delle firme BLS. Una potenziale soluzione è che, poiché tutti i validatori attestano in ogni slot e non ci sono comitati con la SSF, il limite di 32 ETH sul saldo effettivo potrebbe essere rimosso del tutto, il che significa che gli operatori che gestiscono più validatori potrebbero consolidare il loro stake ed eseguirne di meno, riducendo il numero di messaggi che i nodi validatori devono elaborare per tenere conto dell'intero set di validatori. Questo si basa sul fatto che i grandi staker accettino di consolidare i loro validatori. È anche possibile imporre un limite fisso al numero di validatori o alla quantità di ETH in stake in qualsiasi momento. Tuttavia, ciò richiede un meccanismo per decidere a quali validatori è consentito partecipare e a quali no, il che è suscettibile di creare effetti secondari indesiderati.

## Progressi attuali {#current-progress}

La SSF è in fase di ricerca. Non si prevede che venga rilasciata per diversi anni, probabilmente dopo altri aggiornamenti sostanziali come gli [alberi di Verkle](/roadmap/verkle-trees/) e il [Danksharding](/roadmap/danksharding/).

## Letture consigliate {#further-reading}

- [Vitalik sulla SSF all'EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Appunti di Vitalik: Percorsi verso la finalità a singolo slot](https://notes.ethereum.org/@vbuterin/single_slot_finality)