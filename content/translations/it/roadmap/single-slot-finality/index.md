---
title: Finalità dello spazio singolo
description: Spiegazione della finalità dello spazio singolo
lang: it
---

# Finalità dello spazio singolo {#single-slot-finality}

Perché un blocco di Ethereum sia finalizzato, sono necessari circa 15 minuti. Tuttavia, possiamo far validare i blocchi al meccanismo di consenso di Ethereum, in modo più efficiente, riducendo drasticamente il tempo di finalizzazione. Invece di attendere quindici minuti, i blocchi potrebbero essere proposti e finalizzati nello stesso blocco. Questo concetto è noto come **finalità dello spazio singolo (o SSF)**.

## Cos'è la finalità? {#what-is-finality}

Nel meccanismo di consenso basato sul proof-of-stake di Ethereum, la finalità si riferisce alla garanzia che un blocco non sia alterabile o rimovibile dalla blockchain, senza bruciare almeno il 33% degli ETH in staking totali. Questa è la sicurezza 'cripto-economica', poiché la confidenza proviene dai costi estremamente elevati associati al cambiamento dell'ordine o del contenuto della catena, che impedirebbe a qualsiasi attore economico razionale di provarci.

## Perché mirare a una finalità più rapida? {#why-aim-for-quicker-finality}

I tempi correnti per la finalità sono diventati troppo lunghi. Gran parte degli utenti non vogliono attendere 15 minuti per la finalità ed è scomodo per app e piattaforme di scambio, che potrebbero volere un volume di transazione elevato per attendere così tanto, per essere certi che le proprie transazioni siano permanenti. Inoltre, avere un ritardo tra la proposta e la finalizzazione di un blocco, crea un'opportunità per delle brevi riorganizzazioni, che un utente malevolo potrebbe utilizzare per censurare certi blocchi, o estrarre il MEV. Il meccanismo che affronta l'aggiornamento dei blocchi in fasi, inoltre, è abbastanza complesso ed è stato corretto diverse volte per chiudere delle vulnerabilità di sicurezza, rendendolo una delle parti della base di codice di Ethereum in cui è più probabile che emergano piccoli bug. Questi problemi potrebbero essere eliminati riducendo il tempo alla finalità in un singolo spazio.

## Il compromesso tra decentralizzazione, tempo e costi di gestione {#the-decentralization-time-overhead-tradeoff}

La garanzia di finalità non è una proprietà immediata di un nuovo blocco: ci vuole del tempo affinché un nuovo blocco sia finalizzato. Il motivo è che i validatori che rappresentano almeno i 2/3 degli ETH in staking totali sulla rete, devono votare per il blocco ("attestarlo"), perché sia considerabile come finalizzato. Ogni nodo di convalida sulla rete deve elaborare le attestazioni dagli altri nodi per poter sapere se un blocco ha ottenuto tale soglia di 2/3 o no.

Più è breve il tempo consentito per raggiungere la finalizzazione, maggiore è la potenza di calcolo necessaria a ogni nodo perché l'elaborazione dell'attestazione sia eseguita più velocemente. Inoltre, più nodi di convalida esistono sulla rete, più attestazioni devono essere elaborate per ogni blocco, da aggiungere alla potenza d'elaborazione necessaria. Più potenza di elaborazione è necessaria, meno persone possono partecipare a causa della necessità di hardware più costoso, per operare ogni nodo di convalida. Aumentare il tempo tra blocchi riduce la potenza di calcolo necessaria a ogni nodo ma allunga il tempo di finalizzazione, poiché le attestazioni sono elaborate più lentamente.

Dunque, esiste un compromesso tra i costi di gestione (potenza di calcolo), la decentralizzazione (il numero di nodi che possono partecipare alla convalida della catena) e il tempo di finalizzazione. Il sistema ideale equilibra la minima potenza di calcolo, la massima decentralizzazione e il tempo di finalizzazione minimo.

Il meccanismo di consenso corrente di Ethereum equilibra questi tre parametri:

- **Impostando lo stake minimo su 32 ETH**. Questo imposta un limite massimo sul numero delle attestazioni dei validatori che devono essere elaborate dai singoli nodi e, dunque, un limite massimo sui requisiti di calcolo per ogni nodo.
- **Impostando il tempo di finalizzazione a circa 15 minuti**. Questo da' abbastanza tempo ai validatori operati su normali computer domestici di elaborare in sicurezza le attestazioni per ogni blocco.

Con l'attuale design del meccanismo, per poter ridurre il tempo di finalizzazione, è necessario ridurre il numero di validatori sulla rete o aumentare i requisiti hardware per ogni nodo. Tuttavia, esistono dei miglioramenti apportabili all'elaborazione delle attestazioni che possono consentire il conteggio di ulteriori attestazioni senza aumentare i costi di gestione di ogni nodo. L'elaborazione più efficiente consentirà la determinazione della finalità in un singolo spazio, piuttosto che su due epoche.

## Percorsi allo SSF {#routes-to-ssf}

<ExpandableCard title= "Perché non possiamo avere lo SSF oggi?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Il meccanismo di consenso attuale combina le attestazioni da più validatori, noti come commissioni, per ridurre il numero di messaggi che ogni validatore deve elaborare per convalidare un blocco. Ogni validatore ha l'opportunità di attestare in ogni epoca (32 spazi), ma in ogni spazio, soltanto un sottoinsieme di validatori attesta, noto come 'commissione'. Lo fanno dividendosi in reti secondarie, in cui alcuni validatori sono selezionati per essere 'aggregatori'. Questi combinano ognuno tutte le firme che vedono da altri validatori nella propria rete secondaria in una singola firma aggregata. L'aggregatore che include il numero massimo di singoli contributi, ne passa la firma aggregata al propositore di blocchi, che la include nel blocco insieme alla firma aggregata da altre commissioni.

Questo procedimento fornisce la capacità sufficiente per ogni validatore di votare in ogni epoca, poiché `32 spazi * 64 commissioni * 256 validatori per commissione = 524.288 validatori per epoca`. Al momento della scrittura (febbraio 2023), esistono circa 513.000 validatori attivi.

In questo schema, è possibile per ogni validatore, votare esclusivamente su un blocco, distribuendo le proprie attestazioni per l'intera epoca. Tuttavia, esistono potenzialmente dei metodi per migliorare il meccanismo, così che _ogni validatore abbia la possibilità di attestare a ogni spazio_.
</ExpandableCard>

Dalla progettazione del meccanismo di consenso di Ethereum, lo schema di aggregazione delle firme (BLS), è stato ben più scalabile di quanto si pensasse inizialmente, mentre è stata migliorata anche l'abilità dei client di elaborare e verificare le firme. Si è scoperto che le attestazioni di elaborazione da un gran numero di validatori è in realtà possibile, entro un singolo spazio. Ad esempio, con un milione di validatori che votano due volte per ogni spazio e con i tempi dello spazio regolati a 16 secondi, i nodi dovrebbero verificare a un tasso minimo di 125.000 aggregazioni al secondo, per elaborare tutto il milione di attestazioni nello spazio. In realtà, un normale computer richiede circa 500 nanosecondi per eseguire la verifica di una firma, a significare che se ne possono eseguire 125.000 in circa 62,5 ms; molto meno della soglia di un secondo.

Ulteriori incrementi d'efficienza potrebbero derivare dalla creazione di super-commissioni di, ad esempio, 125.000 validatori selezionati casualmente, per spazio. Solo questi validatori possono votare su un blocco e, dunque, solo questo sottoinsieme di validatori decide se un blocco è finalizzato. La bontà di questa idea dipende dal costo che vorrebbe la community per un attacco di successo su Ethereum. Questo perché, invece di richiedere i 2/3 dell'ether in staking totale, un utente malevolo potrebbe finalizzare un blocco disonesto con i 2/3 degli ether in staking _in quella super-commissione_. Questa è un'area di ricerca ancora attiva, ma sembra plausibile che perché un insieme di validatori sia abbastanza grande da richiedere le super-commissioni, il costo di attaccarne una sarebbe estremamente elevato (es., il costo denominato di ETH dell'attacco sarebbe di `2/3 * 125.000 * 32 = circa 2,6 milioni di ETH`). Il costo dell'attacco è regolabile aumentando le dimensioni dell'insieme di validatori (ad esempio, regolando le dimensioni del validatore, così che il costo dell'attacco sia pari a 1 milione di ether, 4 milioni di ether, 10 milioni di ether, etc.). I [sondaggi preliminari](https://youtu.be/ojBgyFl6-v4?t=755) della community sembrano suggerire che 1-2 milioni di ether siano un costo accettabile dell'attacco, implicando circa da 65.536 a 97.152 validatori per super-commissione.

Tuttavia, la verifica non è la vera impasse: è l'aggregazione della firma a sfidare realmente i nodi del validatore. Ridimensionare l'aggregazione delle firme richiederebbe probabilmente l'aumento del numero di validatori per ogni rete secondaria, aumentandone il numero, o aggiungendo ulteriori livelli d'aggregazione (cioè, implementando commissioni delle commissioni). Parte della soluzione potrebbe essere consentire degli agreggatori specializzati, similmente a come la costruzione del blocco e la generaazione degli impegni per i dati dei rollup sarà affidata a costruttori di blocchi specializzati, sotto la separazione propositore-costruttore (PBS) e il Danksharding.

## Qual è il ruolo della regola di scelta della biforcazione nello SSF? {#role-of-the-fork-choice-rule}

Il meccanismo del consenso odierno si affida a un rigoroso accoppiamento tra il dispositivo di finalità (l'algoritmo che determina se i 2/3 dei validatori hanno attestato a una certa catena) e la regola di scelta della biforcazione (l'algoritmo che decide quale catena è quella corretta, quando ci sono più opzioni). L'algoritmo di scelta della biforcazione considera soltanto i blocchi _dall'_ultimo blocco finalizzato. Sotto lo SSF, non ci sarebbe alcun blocco da considerare per la regola di scelta della biforcazione, poiché la finalità si verifica nello stesso spazio in cui è proposto il blocco. Ciò significa che sotto lo SSF, l'algoritmo di scelta _o___ il dispositivo di finalità sarebbero attivi in ogni momento. Il dispositivo di finalità finalizzerebbe i blocchi in cui i 2/3 dei validatori erano online e stavano attestando in modo onesto. Se un blocco non riuscisse a superare la soglia dei 2/3, la regola di scelta della biforcazione entrerebbe in gioco per determinare quale catena seguire. Questo, inoltre, crea un'opportunità per mantenere il meccanismo di perdita dell'inattività che recupera una catena in cui >1/3 dei validatori è offline, sebbene con delle sfumature aggiuntive.

## Questioni irrisolte {#outstanding-issues}

Il problema con il ridimensionamento dell'aggregazione, aumentando il numero di validatori per rete secondaria è che comporta un maggiore carico sulla rete tra pari. Il problema con l'aggiunta di livelli di aggregazioni è che è abbastanza complesso progettare e aggiungere latenza (cioè, potrebbe volerci di più per il propositore del blocco di ricevere da tutti gli aggregatori della rete secondaria). Inoltre, non è chiaro come affrontare lo scenario in cui ci siano più validatori attivi sulla rete di quanti fattibilmente ne possano essere elaborati in ogni spazio, anche con l'aggregazione di firme BLS. Una soluzione potenziale è che, poiché tutti i validatori attestano in ogni slot e non esistono commissioni sotto lo SSF, il limite di 32 ETH sul saldo effettivo potrebbe essere interamente rimosso, a significare che gli operatori che gestiscono più validatori potrebbero consolidare i propri ETH in staking ed eseguirne meno, riducendo il numero di messaggi che i nodi di convalida devono elaborare per tenere conto dell'intero insieme di validatori. Ciò si affida sull'accordo da parte dei grandi staker, di consolidare i propri validatori. Inoltre, è possibile imporre un limite fisso sul numero di validatori o sull'importo di ETH in staking, in ogni momento. Tuttavia, ciò richiede dei meccanismi per decidere quali validatori possono partecipare e quali no, responsabili di creare effetti secondari indesiderati.

## Stato attuale {#current-progress}

Lo SSF è nella fase di ricerca. Non dovrebbe essere rilasciata per svariati anni, probabilmente dopo altri aggiornamenti sostanziali come gli [alberi di Verkle](/roadmap/verkle-trees/) e il [Danksharding](/roadmap/danksharding/).

## Letture consigliate {#further-reading}

- [Vitalik sullo SSF all'EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Note di Vitalik: Percorsi alla finalità dello spazio singolo](https://notes.ethereum.org/@vbuterin/single_slot_finality)
