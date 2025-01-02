---
title: Assenza di stato, scadenza di stato e scadenza dello storico
description: Spiegazione della scadenza dello storico e dell'assenza di stato su Ethereum
lang: it
---

# Assenza di stato, scadenza di stato e scadenza dello storico {#statelessness}

L'abilità di operare i nodi di Ethereum su hardware modesti è fondamentale per la vera decentralizzazione. Questo perché operare un nodo da' agli utenti la possibilità di verificare le informazioni, eseguendo controlli crittografici indipendentemente, piuttosto che fidandosi di una terza parte per alimentare i dati. Eseguire un nodo consente agli utenti di inviare le transazioni direttamente alla rete tra pari di Ethereum, piuttosto che doversi fidare di un intermediario. La decentralizzazione non è possibile se tali benefici sono disponibili soltanto per gli utenti con hardware costoso. Invece, i nodi dovrebbero poter operare con requisiti di elaborazione e memoria estremamente modesti, così che possano funzionare su dispositivi mobili, micro-computer o impercettibilmente su un computer di casa.

Oggi, i requisiti di spazio su disco sono la principale barriera che impedisce l'accesso universale ai nodi. Questo, principalmente, è dovuto al bisogno di memorizzare grandi pezzi dei dati di stato di Ethereum. Questi dati di stato contengono le informazioni critiche necessarie per elaborare correttamente i nuovi blocchi e le nuove transazioni. Al momento della scrittura, è consigliata una SSD veloce da 2TB per eseguire un nodo completo di Ethereum. Per un nodo che non elimina alcun dato vecchio, i requisiti di archiviazione crescono a circa 14GB/settimana e i nodi d'archivio che memorizzano tutti i dati dalla genesi arrivano a circa 12TB (al momento della scrittura, a febbraio 2023).

Dischi rigidi più economici sono utilizzabili per memorizzare i dati più vecchi, ma sono troppo lenti per tenere il passo con i blocchi in entrata. Mantenere i modelli di archiviazione correnti per i client mentre i dati diventano più economici e facili da archiviare è soltanto temporaneo e, una soluzione parziale al problema, poiché la crescita dello stato di Ethereum è 'senza limiti', a significare che i requisiti d'archiviazione possono soltanto aumentare e, i miglioramenti tecnologici dovranno sempre mantenere il passo con la continua crescita di stato. Invece, i client devono trovare metodi per verificare i blocchi e le transazioni, senza affidarsi alla ricerca dei dati sui database locali.

## Ridurre l'archiviazione per i nodi {#reducing-storage-for-nodes}

Esistono diversi modi per ridurre la quantità di dati che ciascun nodo deve archiviare, ciascuno dei quali richiede che il protocollo principale di Ethereum venga aggiornato in misura diversa:

- **Scadenza dello storico**: consente ai nodi di scartare i dati di stato precedenti a X blocchi, senza modificare la gestione dei dati di stato del client di Ethereum
- **Scadenza di stato**: consente ai dati di staato non utilizzati di frequente di divenire inattivi. I dati inattivi sono ignorabili dai client, finché non sono "resuscitati".
- **Assenza di stato debole**: solo i produttori di blocchi necessitano dell'accesso ai dati di stato completi, altri nodi possono verificare i blocchi senza un database di stato locale.
- **Assenza di stato forte**: nessun nodo necessita dell'accesso ai dati di stato completi.

## Scadenza dei dati {#data-expiry}

### Scadenza dello storico {#history-expiry}

La scadenza dello storico si riferisce ai client, che rimuovono i dati vecchi che è improbabile che necessiteranno, così da memorizzare soltanto una piccola quantità di dati storici, abbandonando i dati precedenti, quando arrivano i nuovi dati. Esistono due motivi per cui i client necessitano dei dati storici: sincronizzazione e servizio delle richieste di dati. Originariamente, i client dovevano sincronizzarsi dal blocco di genesi, verificando che ogni blocco successivo fosse corretto fino alla testa della catena. Oggi, i client utilizzano i "punti di controllo di soggettività deboli" per farsi strada alla testa della catena. Questi punti di controllo sono punti di partenza affidabili, come avere un blocco di genesi vicino al presente, piuttosto che all'inizio di Ethereum. Ciò significa che i client possono rilasciare tutte le informazioni precedenti al punto di controllo di soggettività debole più recente, senza perdere la capacità di sincronizzarsi con la testa della catena. I client, al momento, servono le richieste (in arrivo tramite JSON-RPC) per i dati storici, prendendole dai propri database locali. Tuttavia, con la scadenza dello storico non sarà possibile se i dati richiesti sono stati eliminati. È nel servire questi dati storici che sono necessarie delle soluzioni innovative.

Un'opzione è che i client richiedano i dati storici dai pari, utilizzando una soluzione come la Portal Network. La Portal Network è una rete tra pari in via di sviluppo per servire i dati storici, in cui ogni nodo memorizza una piccola parte dello storico di Ethereum, così che l'intero storico esista, ma distribuito sulla rete. Le richieste sono servite ricercando i pari che memorizzano i dati rilevanti e richiedendoli. Altrimenti, poiché generalmente sono le app a richiedere l'accesso ai dati storici, può diventare loro responsabilità memorizzarli. Potrebbero anche esistere abbastanza utenti altruisti nello spazio di Ethereum, desiderosi di mantenere gli archivi storici. Potrebbe essere una DAO, eseguita per gestire l'archiviazione dei dati storici o, idealmente, sarebbe una combinazione di tali opzioni. Questi fornitori potrebbero servire i dati in molti modi, come su un torrent, FTP, Filecoin o IPFS.

La scadenza dello storico è piuttosto controversa perché finora Ethereum ha sempre garantito implicitamente la disponibilità di qualsiasi dato storico. Una sincronizzazione completa dalla genesi è sempre stata possibile come standard, anche se si affida alla ricostruzione di alcuni dati precedenti da delle istantanee. La scadenza dello storico sposta la responsabilità di fornire questa garanzia, all'esterno del protocollo principale di Ethereum. Questo potrebbe introdurre nuovi rischi di censura, se delle organizzazioni centralizzate finissero per intervenire nel fornire i dati storici.

L'EIP-4444 non è ancora pronto alla distribuzione, ma è in discussione attiva. È interessante notare che, le sfide con l'EIP-4444 non sono molto tecniche, ma prevalentemente relative alla gestione della community. Perché possa essere distribuita, è necessario coinvolgere la community, così che includa non soltanto accordo, ma anche impegni a memorizzare e servire i dati storici, da entità affidabili.

Questo aggiornamento, fondamentalmente, non modifica come i nodi di Ethereum gestiscono i dati di stato, modifica semplicemente come i dati storici siano accessibili.

### Scadenza dello stato {#state-expiry}

La scadenza di stato fa riferimento alla rimozione dello stato dai singoli nodi, se non è stato acceduto di recente. Esistono vari modi per implementarlo, tra cui:

- **Scadenza per noleggio**: addebitando un "noleggio" ai conti e facendoli scadere quando il noleggio raggiunge lo zero
- **Scadenza per tempo**: rendendo i conti inattivi se non si verifica alcuna lettura/scrittura a quel conto, per un dato periodo di tempo

La scadenza per noleggio potrebbe essere un noleggio diretto addebitato ai conti per mantenerli nel database dello stato attivo. La scadenza per tempo potrebbe essere un conto alla rovescia dall'ultima interazione del conto, o una scadenza periodica di tutti i conti. Potrebbero inoltre esistere dei meccanismi che combinano gli elementi dei modelli basati su tempo e affitto, ad esempio, i conti individuali persistono nello stato attivo se pagano delle piccole commissioni, prima della scadenza. Con la scadenza di stato è importante notare che lo stato inattivo **non è eliminato**, è soltanto memorizzato separatamente da quello attivo. Lo stato inattivo può essere resuscitato nello stato attivo.

Questo dovrebbe probabilmente funzionare con un albero di stato per periodi di tempo specifici (forse di circa 1 anno). Ogni volta che inizia un nuovo periodo, inizia un albero di stato completamente nuovo. Solo l'albero di stato corrente è modificabile, tutti gli altri sono immutabili. I nodi di Ethereum devono contenere soltanto l'albero di stato corrente e il successivo più recente. Questo richiede un metodo per mettere in sequenza un indirizzo, con il periodo in cui esiste. Esistono [svariati metodi possibili](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) per farlo, ma l'opzione principale richiede l'[allungamento degli indirizzi](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) per accomodare le informazioni aggiuntive, con il beneficio aggiunto che gli indirizzi più lunghi sono più sicuri. Il punto della tabella di marcia che fa questo è detto [estensione dello spazio dell'indirizzo](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Analogamente alla scadenza dello storico, sotto la scadenza di stato, la responsabilità di memorizzare i vecchi dati di stato è rimossa dai singoli utenti e spinta ad altre entità, come fornitori centralizzati, membri altruisti dell community o soluzioni decentralizzate più futuristiche, come la Portal Network.

La scadenza dello stato è ancora in fase di ricerca e non è ancora pronta alla distribuzione. La scadenza di stato potrebbe verificarsi dopo i client privi di stato e la scadenza dello storico, poiché questi aggiornamenti rendono più facilmente gestibili le grandi dimensioni di stato per gran parte dei validatori.

## Assenza di stato {#statelessness}

L'assenza di stato è un termine un po' improprio perché non si riferisce al concetto di eliminazione dello "stato", ma coinvolge delle modifiche alla gestione dei dati di stato dai nodi di Ethereum. L'assenza di stato stessa si presenta in due modalità: debole e forte. L'assenza di stato debole consente a gran parte dei nodi di essere privi di stato, dando la responsabilità dell'archiviazione dello stato a pochi. L'assenza di stato forte rimuove completamente il bisogno, per qualsiasi nodo, di memorizzare i dati di stato completi. Sia l'assenza di stato debole che forte offrono i seguenti benefici ai normali validatori:

- sincronizzazione quasi istantanea
- abilità di convalidare i blocchi fuori ordine
- nodi capaci di operare con requisiti hardware molto ridotti (es. su telefoni)
- nodi che operano su dischi rigidi economici, perché non è richiesta alcuna lettura/scrittura del disco
- compatibilità con aggiornamenti futuri alla crittografia di Ethereum

### Assenza di stato debole {#weak-statelessness}

L'assenza di stato debole richiede modifiche a come i nodi di Ethereum verificano i cambiamenti di stato, ma non elimina completamente il bisogno di archiviare lo stato su tutti i nodi sulla rete. Invece, l'assenza di stato dà la responsabilità d'archiviazione dello stato ai propositori di blocchi, mentre tutti gli altri nodi sulla rete verificano i blocchi senza memorizzare i dati di stato completi.

**Nell'assenza di stato debole, la proposta dei blocchi richiede l'accesso ai dati di stato completi, ma la verifica dei blocchi no**

Perché ciò si verifichi, gli [alberi di Verkle](/roadmap/verkle-trees/) devono già essere stati implementati nei client di Ethereum. Gli alberi di Verkle sono strutture di dati sostitutive per memorizzare i dati di stato di Ethereum, che consentono a "testimoni" di dati di dimensioni ridotte e fisse, di essere passati tra i pari e utilizzati per verificare i blocchi, invece di verificarli rispetto ai database locali. Anche la [separazione tra propositori e costruttori](/roadmap/pbs/) è necessaria poiché consente ai costruttori di blocchi di essere nodi specializzati con hardware più potente, essendo coloro che necessitano di accedere ai dati di stato completi.

<ExpandableCard title="Perché va bene affidarsi a meno propositori di blocchi?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

L'assenza di stato si affida ai costruttori di blocchi che mantengono una copia dei dati di stato completi, così che possano generare testimoni utilizzabili per verificare il blocco. Gli altri nodi non necessitano di accedere ai dati di stato, tutte le informazioni necessarie per verificare il blocco sono disponibili nel testimone. Ciò crea una situazione in cui proporre un blocco è costoso, ma verificarlo è economico, implicando che meno operatori eseguiranno un nodo di proposta dei blocchi. Tuttavia, la decentralizzazione dei propositori di blocchi non è fondamentale, finché quanti più partecipanti possibili possono verificare indipendentemente che i blocchi proposti siano validi.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Leggi di più sulle note di Dankrad</ButtonLink>
</ExpandableCard>

I propositori di blocchi utilizzano i dati di stato per creare dei "testimoni": la serie minima di dati che prova i valori dello stato modificati dalle transazioni in un blocco. Gli altri validatori non detengono lo stato, memorizzano semplicemente la radice di stato (un hash dell'intero stato). Ricevono un blocco e un testimone e li utilizzano per aggiornare la radice di stato. Questo rende un nodo di convalida estremamente leggero.

L'assenza di stato debole è in uno stato avanzato di ricerca, ma si affida all'implementazione della separazione tra propositori e costruttori e degli Alberi di Verkle, così che i piccoli testimoni possano essere passati tra pari. Ciò significa che l'assenza di stato debole è probabilmente a pochi anni dalla Rete Principale di Ethereum.

### Assenza di stato forte {#strong-statelessness}

L'assenza di stato forte rimuove l'esigenza per qualsiasi nodo di memorizzare i dati di stato. Invece, le transazioni sono inviate con i testimoni, aggregabili dai produttori di blocchi. I produttori di blocchi sono quindi responsabili della memorizzazione di soltanto quello stato, necessario per generare testimoni per i conti rilevanti. La responsabilità per lo stato è quasi interamente trasferita agli utenti, poiché inviano i testimoni e 'accedono agli elenchi' per dichiarare con quali conti e quali chiavi d'archiviazione stanno interagendo. Questo consentirebbe la presenza di nodi estremamente leggeri, ma esistono dei compromessi, incluso il rendere più difficili le transazioni con i contratti intelligenti.

L'assenza di stato forte è stata investigata dai ricercatori, ma non è correntemente previsto che diventi parte della tabella di marcia di Ethereum: è più probabile che l'assenza di stato debole sia sufficiente per le esigenze di ridimensionamento di Ethereum.

## Stato attuale {#current-progress}

L'assenza di stato debole, la scadenza dello storico e la scadenza dello stato sono tutte in fase di ricerca ed è previsto siano distribuite tra svariati anni. Non esiste alcuna garanzia che tutte queste proposte saranno implementate, ad esempio, se la scadenza di stato è implementate per prima, non sarebbe necessario implementare anche la scadenza dello storico. Esistono anche altri punti della tabella di marcia, come gli [Alberi di Verkle](/roadmap/verkle-trees) e la [Separazione tra propositori e costruttori](/roadmap/pbs), che necessitano di essere completati per primi.

## Letture consigliate {#further-reading}

- [AMA sull'assenza di stato di Vitalik](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Una teoria sulla gestione delle dimensioni dello stato](https://hackmd.io/@vbuterin/state_size_management)
- [Limitazione dello stato di risurrezione e conflitto minimizzati](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Percorsi all'assenza di stato e alla scadenza dello stato](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Specifiche dell'EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes sull'EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Perché l'assenza di stato è così importante](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Le note del concetto originale del client privo di stato](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Informazioni sulla scadenza dello stato](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Ulteriori informazioni sulla scadenza di stato](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
