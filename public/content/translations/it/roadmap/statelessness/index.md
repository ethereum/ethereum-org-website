---
title: Assenza di stato, scadenza dello stato e scadenza della cronologia
description: Spiegazione della scadenza della cronologia e dell'Ethereum senza stato
lang: it
---

# Assenza di stato, scadenza dello stato e scadenza della cronologia {#statelessness}

La capacità di eseguire i nodi di [Ethereum](/) su hardware modesto è fondamentale per una vera decentralizzazione. Questo perché l'esecuzione di un nodo offre agli utenti la capacità di verificare le informazioni eseguendo controlli crittografici in modo indipendente, piuttosto che fidarsi di una terza parte che fornisca loro i dati. L'esecuzione di un nodo consente agli utenti di inviare transazioni direttamente alla rete peer-to-peer di Ethereum, piuttosto che doversi fidare di un intermediario. La decentralizzazione non è possibile se questi vantaggi sono disponibili solo per gli utenti con hardware costoso. Invece, i nodi dovrebbero poter essere eseguiti con requisiti di elaborazione e memoria estremamente modesti, in modo da poter funzionare su telefoni cellulari, microcomputer o in modo impercettibile su un computer di casa.

Oggi, gli elevati requisiti di spazio su disco sono la barriera principale che impedisce l'accesso universale ai nodi. Ciò è dovuto principalmente alla necessità di archiviare grandi porzioni dei dati di stato di Ethereum. Questi dati di stato contengono informazioni critiche necessarie per elaborare correttamente nuovi blocchi e transazioni. Al momento della stesura di questo documento, si consiglia un SSD veloce da 2 TB per eseguire un nodo Ethereum completo. Per un nodo che non elimina alcun dato più vecchio, il requisito di archiviazione cresce di circa 14 GB a settimana e i nodi di archivio che memorizzano tutti i dati dalla genesi si stanno avvicinando ai 12 TB (al momento della stesura, a febbraio 2023).

Dischi rigidi più economici possono essere utilizzati per archiviare dati più vecchi, ma sono troppo lenti per tenere il passo con i blocchi in arrivo. Mantenere gli attuali modelli di archiviazione per i client rendendo i dati più economici e facili da archiviare è solo una soluzione temporanea e parziale al problema, perché la crescita dello stato di Ethereum è "illimitata", il che significa che i requisiti di archiviazione possono solo aumentare e i miglioramenti tecnologici dovranno sempre tenere il passo con la continua crescita dello stato. Invece, i client devono trovare nuovi modi per verificare blocchi e transazioni che non si basino sulla ricerca di dati da database locali.

## Ridurre l'archiviazione per i nodi {#reducing-storage-for-nodes}

Esistono diversi modi per ridurre la quantità di dati che ogni nodo deve archiviare, ognuno dei quali richiede l'aggiornamento del protocollo principale di Ethereum in misura diversa:

- **Scadenza della cronologia**: consente ai nodi di scartare i dati di stato più vecchi di X blocchi, ma non cambia il modo in cui i client di Ethereum gestiscono i dati di stato.
- **Scadenza dello stato**: consente ai dati di stato che non vengono utilizzati frequentemente di diventare inattivi. I dati inattivi possono essere ignorati dai client fino a quando non vengono resuscitati.
- **Assenza di stato debole**: solo i produttori di blocchi necessitano dell'accesso ai dati di stato completi, gli altri nodi possono verificare i blocchi senza un database di stato locale.
- **Assenza di stato forte**: nessun nodo necessita dell'accesso ai dati di stato completi.

## Scadenza dei dati {#data-expiry}

### Scadenza della cronologia {#history-expiry}

La scadenza della cronologia si riferisce ai client che eliminano i dati più vecchi di cui è improbabile che abbiano bisogno, in modo da archiviare solo una piccola quantità di dati storici, scartando i dati più vecchi quando arrivano nuovi dati. Ci sono due motivi per cui i client richiedono dati storici: la sincronizzazione e la gestione delle richieste di dati. In origine, i client dovevano sincronizzarsi dal blocco genesi, verificando che ogni blocco successivo fosse corretto fino alla testa della catena. Oggi, i client utilizzano "punti di controllo di soggettività debole" (weak subjectivity checkpoints) per avviarsi verso la testa della catena. Questi punti di controllo sono punti di partenza attendibili, come avere un blocco genesi vicino al presente piuttosto che all'inizio stesso di Ethereum. Ciò significa che i client possono scartare tutte le informazioni precedenti al punto di controllo di soggettività debole più recente senza perdere la capacità di sincronizzarsi con la testa della catena. Attualmente i client gestiscono le richieste (in arrivo tramite JSON-RPC) di dati storici prelevandoli dai loro database locali. Tuttavia, con la scadenza della cronologia questo non sarà possibile se i dati richiesti sono stati eliminati. È proprio per fornire questi dati storici che sono necessarie alcune soluzioni innovative.

Un'opzione è che i client richiedano dati storici ai peer utilizzando una soluzione come la Portal Network. La Portal Network è una rete peer-to-peer in fase di sviluppo per fornire dati storici in cui ogni nodo archivia una piccola parte della cronologia di Ethereum in modo tale che l'intera cronologia esista distribuita attraverso la rete. Le richieste vengono gestite cercando i peer che archiviano i dati rilevanti e richiedendoli a loro. In alternativa, poiché in genere sono le app a richiedere l'accesso ai dati storici, può diventare loro responsabilità archiviarli. Potrebbero esserci anche abbastanza attori altruisti nello spazio di Ethereum disposti a mantenere archivi storici. Potrebbe essere una DAO che si attiva per gestire l'archiviazione dei dati storici o, idealmente, sarà una combinazione di tutte queste opzioni. Questi fornitori potrebbero offrire i dati in molti modi, come su un torrent, FTP, Filecoin o IPFS.

La scadenza della cronologia è in qualche modo controversa perché finora Ethereum ha sempre garantito implicitamente la disponibilità di qualsiasi dato storico. Una sincronizzazione completa dalla genesi è sempre stata possibile come standard, anche se si basa sulla ricostruzione di alcuni dati più vecchi da istantanee (snapshot). La scadenza della cronologia sposta la responsabilità di fornire questa garanzia al di fuori del protocollo principale di Ethereum. Ciò potrebbe introdurre nuovi rischi di censura se a intervenire per fornire dati storici finissero per essere organizzazioni centralizzate.

L'EIP-4444 non è ancora pronto per essere rilasciato, ma è in fase di discussione attiva. È interessante notare che le sfide con l'EIP-4444 non sono tanto tecniche, ma riguardano principalmente la gestione della community. Affinché questo venga rilasciato, è necessario il consenso della community che includa non solo l'accordo, ma anche l'impegno ad archiviare e fornire dati storici da parte di entità affidabili.

Questo aggiornamento non cambia fondamentalmente il modo in cui i nodi di Ethereum gestiscono i dati di stato, cambia solo il modo in cui si accede ai dati storici.

### Scadenza dello stato {#state-expiry}

La scadenza dello stato si riferisce alla rimozione dello stato dai singoli nodi se non vi si è acceduto di recente. Ci sono diversi modi in cui questo potrebbe essere implementato, tra cui:

- **Scadenza per affitto**: addebitare un "affitto" agli account e farli scadere quando il loro affitto raggiunge lo zero
- **Scadenza per tempo**: rendere inattivi gli account se non ci sono letture/scritture su quell'account per un certo periodo di tempo

La scadenza per affitto potrebbe essere un affitto diretto addebitato agli account per mantenerli nel database dello stato attivo. La scadenza per tempo potrebbe avvenire tramite un conto alla rovescia dall'ultima interazione dell'account, oppure potrebbe essere una scadenza periodica di tutti gli account. Potrebbero esserci anche meccanismi che combinano elementi di entrambi i modelli basati sul tempo e sull'affitto, ad esempio i singoli account persistono nello stato attivo se pagano una piccola commissione prima della scadenza basata sul tempo. Con la scadenza dello stato è importante notare che lo stato inattivo **non viene eliminato**, viene solo archiviato separatamente dallo stato attivo. Lo stato inattivo può essere resuscitato nello stato attivo.

Il modo in cui funzionerebbe è probabilmente quello di avere un albero di stato per periodi di tempo specifici (forse ~1 anno). Ogni volta che inizia un nuovo periodo, inizia anche un albero di stato completamente nuovo. Solo l'albero di stato corrente può essere modificato, tutti gli altri sono immutabili. Ci si aspetta che i nodi di Ethereum mantengano solo l'albero di stato corrente e quello immediatamente precedente. Ciò richiede un modo per marcare temporalmente un indirizzo con il periodo in cui esiste. Ci sono [diversi modi possibili](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) per farlo, ma l'opzione principale richiede che [gli indirizzi vengano allungati](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) per accogliere le informazioni aggiuntive, con l'ulteriore vantaggio che indirizzi più lunghi sono molto più sicuri. L'elemento del piano d'azione che fa questo è chiamato [estensione dello spazio degli indirizzi](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Analogamente alla scadenza della cronologia, con la scadenza dello stato la responsabilità dell'archiviazione dei vecchi dati di stato viene rimossa dai singoli utenti e trasferita ad altre entità come fornitori centralizzati, membri altruisti della community o soluzioni decentralizzate più futuristiche come la Portal Network.

La scadenza dello stato è ancora in fase di ricerca e non è ancora pronta per essere rilasciata. La scadenza dello stato potrebbe benissimo avvenire più tardi rispetto ai client senza stato e alla scadenza della cronologia, perché quegli aggiornamenti rendono le grandi dimensioni dello stato facilmente gestibili per la maggior parte dei validatori.

## Assenza di stato {#statelessness}

L'assenza di stato è un termine un po' improprio perché non significa che il concetto di "stato" venga eliminato, ma comporta modifiche al modo in cui i nodi di Ethereum gestiscono i dati di stato. L'assenza di stato stessa si presenta in due varianti: assenza di stato debole e assenza di stato forte. L'assenza di stato debole consente alla maggior parte dei nodi di diventare senza stato affidando la responsabilità dell'archiviazione dello stato a pochi. L'assenza di stato forte rimuove completamente la necessità per qualsiasi nodo di archiviare i dati di stato completi. Sia l'assenza di stato debole che quella forte offrono i seguenti vantaggi ai normali validatori:

- sincronizzazione quasi istantanea
- capacità di validare i blocchi fuori ordine
- nodi in grado di funzionare con requisiti hardware molto bassi (ad es. sui telefoni)
- i nodi possono funzionare su dischi rigidi economici perché non è richiesta alcuna lettura/scrittura su disco
- compatibile con i futuri aggiornamenti della crittografia di Ethereum

### Assenza di stato debole {#weak-statelessness}

L'assenza di stato debole comporta modifiche al modo in cui i nodi di Ethereum verificano i cambiamenti di stato, ma non elimina completamente la necessità di archiviazione dello stato in tutti i nodi della rete. Invece, l'assenza di stato debole affida la responsabilità dell'archiviazione dello stato ai proponenti dei blocchi (block proposers), mentre tutti gli altri nodi della rete verificano i blocchi senza archiviare i dati di stato completi.

**Nell'assenza di stato debole, la proposta di blocchi richiede l'accesso ai dati di stato completi, ma la verifica dei blocchi non richiede alcun dato di stato**

Affinché ciò avvenga, gli [alberi di Verkle](/roadmap/verkle-trees/) devono essere già stati implementati nei client di Ethereum. Gli alberi di Verkle sono una struttura dati sostitutiva per l'archiviazione dei dati di stato di Ethereum che consente di passare tra i peer piccoli "testimoni" (witnesses) di dimensioni fisse dei dati e di utilizzarli per verificare i blocchi invece di verificare i blocchi rispetto ai database locali. È richiesta anche la [separazione tra proponente e costruttore](/roadmap/pbs/) perché ciò consente ai costruttori di blocchi di essere nodi specializzati con hardware più potente, e sono quelli che richiedono l'accesso ai dati di stato completi.

<ExpandableCard title="Perché va bene fare affidamento su un numero inferiore di proponenti di blocchi?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

L'assenza di stato si basa sui costruttori di blocchi che mantengono una copia dei dati di stato completi in modo che possano generare testimoni che possono essere utilizzati per verificare il blocco. Gli altri nodi non hanno bisogno di accedere ai dati di stato, tutte le informazioni necessarie per verificare il blocco sono disponibili nel testimone. Questo crea una situazione in cui proporre un blocco è costoso, ma verificare il blocco è economico, il che implica che un numero inferiore di operatori eseguirà un nodo che propone blocchi. Tuttavia, la decentralizzazione dei proponenti di blocchi non è critica finché il maggior numero possibile di partecipanti può verificare in modo indipendente che i blocchi che propongono siano validi.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Leggi di più sugli appunti di Dankrad</ButtonLink>
</ExpandableCard>

I proponenti dei blocchi utilizzano i dati di stato per creare "testimoni": l'insieme minimo di dati che dimostrano i valori dello stato che vengono modificati dalle transazioni in un blocco. Gli altri validatori non detengono lo stato, archiviano solo la radice dello stato (un hash dell'intero stato). Ricevono un blocco e un testimone e li usano per aggiornare la loro radice dello stato. Questo rende un nodo di validazione estremamente leggero.

L'assenza di stato debole è in uno stato avanzato di ricerca, ma si basa sull'implementazione della separazione tra proponente e costruttore e degli alberi di Verkle in modo che piccoli testimoni possano essere passati tra i peer. Ciò significa che l'assenza di stato debole è probabilmente a qualche anno di distanza dalla rete principale di Ethereum.

Lo zkEVM per la verifica L1 è una tecnologia complementare che potrebbe migliorare ulteriormente la verifica stateless. Invece di controllare solo i testimoni, i validatori potrebbero verificare una prova a conoscenza zero che l'intero blocco è stato eseguito correttamente -- fornendo certezza crittografica senza ri-eseguire le transazioni.

### Assenza di stato forte {#strong-statelessness}

L'assenza di stato forte rimuove la necessità per qualsiasi nodo di archiviare i dati di stato. Invece, le transazioni vengono inviate con testimoni che possono essere aggregati dai produttori di blocchi. I produttori di blocchi sono quindi responsabili dell'archiviazione solo di quello stato necessario per generare testimoni per gli account rilevanti. La responsabilità dello stato è quasi interamente spostata sugli utenti, poiché inviano testimoni ed "elenchi di accesso" (access lists) per dichiarare con quali account e chiavi di archiviazione stanno interagendo. Ciò consentirebbe nodi estremamente leggeri, ma ci sono dei compromessi, tra cui rendere più difficile effettuare transazioni con i contratti intelligenti.

L'assenza di stato forte è stata studiata dai ricercatori ma al momento non si prevede che faccia parte del piano d'azione di Ethereum: è più probabile che l'assenza di stato debole sia sufficiente per le esigenze di scalabilità di Ethereum.

## Progressi attuali {#current-progress}

L'assenza di stato debole, la scadenza della cronologia e la scadenza dello stato sono tutte in fase di ricerca e si prevede che verranno rilasciate tra diversi anni. Non vi è alcuna garanzia che tutte queste proposte vengano implementate; ad esempio, se la scadenza dello stato viene implementata per prima, potrebbe non esserci bisogno di implementare anche la scadenza della cronologia. Ci sono anche altri elementi del piano d'azione, come gli [alberi di Verkle](/roadmap/verkle-trees) e la [separazione tra proponente e costruttore](/roadmap/pbs), che devono essere completati prima.

## Letture consigliate {#further-reading}

- [Cos'è l'Ethereum senza stato?](https://stateless.fyi/)
- [AMA di Vitalik sull'assenza di stato](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Una teoria sulla gestione delle dimensioni dello stato](https://hackmd.io/@vbuterin/state_size_management)
- [Limitazione dello stato con minimizzazione dei conflitti di resurrezione](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Percorsi verso l'assenza di stato e la scadenza dello stato](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Specifiche dell'EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes sull'EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Perché è così importante diventare senza stato](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Gli appunti originali sul concetto di client senza stato](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Maggiori informazioni sulla scadenza dello stato](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Ancora di più sulla scadenza dello stato](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Pagina informativa sull'Ethereum senza stato](https://stateless.fyi)