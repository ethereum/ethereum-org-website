---
title: Danksharding
description: "Scopri il Proto-Danksharding e il Danksharding, due aggiornamenti sequenziali per la scalabilità di Ethereum."
lang: it
summaryPoints:
  - Il Danksharding è un aggiornamento in più fasi per migliorare la scalabilità e la capacità di Ethereum.
  - La prima fase, il Proto-Danksharding, aggiunge blob di dati ai blocchi.
  - I blob di dati offrono un modo più economico ai rollup per pubblicare dati su Ethereum e tali costi possono essere trasferiti agli utenti sotto forma di commissioni della transazione inferiori.
  - In seguito, il Danksharding completo distribuirà la responsabilità della verifica dei blob di dati su sottoinsiemi di nodi, aumentando ulteriormente la scalabilità di Ethereum a oltre 100.000 transazioni al secondo.
---

# Danksharding {#danksharding}

Il **Danksharding** è il modo in cui [Ethereum](/) diventa una blockchain veramente scalabile, ma sono necessari diversi aggiornamenti del protocollo per arrivarci. Il **Proto-Danksharding** è un passaggio intermedio lungo il percorso. Entrambi mirano a rendere le transazioni sul livello 2 il più economiche possibile per gli utenti e dovrebbero portare la scalabilità di Ethereum a >100.000 transazioni al secondo.

## Cos'è il Proto-Danksharding? {#what-is-protodanksharding}

Il Proto-Danksharding, noto anche come [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), è un modo per i [rollup](/layer-2/#rollups) di aggiungere dati più economici ai blocchi. Il nome deriva dai due ricercatori che hanno proposto l'idea: Protolambda e Dankrad Feist. Storicamente, i rollup sono stati limitati nel rendere economiche le transazioni degli utenti dal fatto che pubblicano le loro transazioni in `CALLDATA`.

Questo è costoso perché viene elaborato da tutti i nodi di Ethereum e risiede on-chain per sempre, anche se i rollup necessitano dei dati solo per un breve periodo. Il Proto-Danksharding introduce blob di dati che possono essere inviati e allegati ai blocchi. I dati in questi blob non sono accessibili alla macchina virtuale di Ethereum (EVM) e vengono eliminati automaticamente dopo un periodo di tempo fisso (impostato a 4096 epoche al momento della stesura, o circa 18 giorni). Ciò significa che i rollup possono inviare i propri dati in modo molto più economico e trasferire i risparmi agli utenti finali sotto forma di transazioni più economiche.

<ExpandableCard title="Perché i blob rendono i rollup più economici?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

I rollup sono un modo per scalare Ethereum raggruppando le transazioni fuori catena e pubblicando poi i risultati su Ethereum. Un rollup è essenzialmente composto da due parti: dati e controllo di esecuzione. I dati sono la sequenza completa di transazioni che viene elaborata da un rollup per produrre il cambiamento di stato pubblicato su Ethereum. Il controllo di esecuzione è la riesecuzione di quelle transazioni da parte di un attore onesto (un "prover") per garantire che il cambiamento di stato proposto sia corretto. Per eseguire il controllo di esecuzione, i dati della transazione devono essere disponibili abbastanza a lungo affinché chiunque possa scaricarli e controllarli. Ciò significa che qualsiasi comportamento disonesto da parte del sequenziatore del rollup può essere identificato e contestato dal prover. Tuttavia, non è necessario che siano disponibili per sempre.
</ExpandableCard>

<ExpandableCard title="Perché va bene eliminare i dati dei blob?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

I rollup pubblicano gli impegni (commitment) per i dati delle loro transazioni on-chain e rendono anche disponibili i dati effettivi nei blob di dati. Ciò significa che i prover possono verificare che gli impegni siano validi o contestare i dati che ritengono errati. A livello di nodo, i blob di dati sono conservati nel client di consenso. I client di consenso attestano di aver visto i dati e che sono stati propagati nella rete. Se i dati venissero conservati per sempre, questi client si gonfierebbero e porterebbero a requisiti hardware elevati per l'esecuzione dei nodi. Invece, i dati vengono eliminati automaticamente dal nodo ogni 18 giorni. Le attestazioni del client di consenso dimostrano che c'è stata un'opportunità sufficiente per i prover di verificare i dati. I dati effettivi possono essere archiviati fuori catena dagli operatori dei rollup, dagli utenti o da altri.
</ExpandableCard>

### Come vengono verificati i dati dei blob? {#how-are-blobs-verified}

I rollup pubblicano le transazioni che eseguono nei blob di dati. Pubblicano anche un "impegno" (commitment) per i dati. Lo fanno adattando una funzione polinomiale ai dati. Questa funzione può quindi essere valutata in vari punti. Ad esempio, se definiamo una funzione estremamente semplice `f(x) = 2x-1`, possiamo valutare questa funzione per `x = 1`, `x = 2`, `x = 3` ottenendo i risultati `1, 3, 5`. Un prover applica la stessa funzione ai dati e la valuta negli stessi punti. Se i dati originali vengono modificati, la funzione non sarà identica e, di conseguenza, non lo saranno nemmeno i valori valutati in ciascun punto. In realtà, l'impegno e la prova sono più complicati perché sono avvolti in funzioni crittografiche.

### Cos'è KZG? {#what-is-kzg}

KZG sta per Kate-Zaverucha-Goldberg, i nomi dei tre [autori originali](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) di uno schema che riduce un blob di dati a un piccolo ["impegno" crittografico](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). Il blob di dati inviato da un rollup deve essere verificato per garantire che il rollup non si stia comportando in modo scorretto. Ciò comporta che un prover riesegua le transazioni nel blob per verificare che l'impegno fosse valido. Questo è concettualmente lo stesso modo in cui i client di esecuzione verificano la validità delle transazioni di Ethereum sul livello 1 utilizzando le prove di Merkle. KZG è una prova alternativa che adatta un'equazione polinomiale ai dati. L'impegno valuta il polinomio in alcuni punti dati segreti. Un prover adatterebbe lo stesso polinomio sui dati e lo valuterebbe agli stessi valori, verificando che il risultato sia lo stesso. Questo è un modo per verificare i dati che è compatibile con le tecniche a conoscenza-zero utilizzate da alcuni rollup e, in futuro, da altre parti del protocollo di Ethereum.

### Cos'è stata la Cerimonia KZG? {#what-is-a-kzg-ceremony}

La cerimonia KZG è stata un modo per molte persone della community di Ethereum di generare collettivamente una stringa casuale segreta di numeri che può essere utilizzata per verificare alcuni dati. È molto importante che questa stringa di numeri non sia nota e non possa essere ricreata da nessuno. Per garantire ciò, ogni persona che ha partecipato alla cerimonia ha ricevuto una stringa dal partecipante precedente. Ha quindi creato dei nuovi valori casuali (ad esempio, consentendo al proprio browser di misurare il movimento del mouse) e li ha mescolati con il valore precedente. Ha poi inviato il valore al partecipante successivo e lo ha distrutto dalla propria macchina locale. Finché almeno una persona nella cerimonia ha agito onestamente, il valore finale sarà inconoscibile per un utente malintenzionato.

La cerimonia KZG dell'EIP-4844 era aperta al pubblico e decine di migliaia di persone hanno partecipato per aggiungere la propria entropia (casualità). In totale ci sono stati oltre 140.000 contributi, rendendola la più grande cerimonia del suo genere al mondo. Affinché la cerimonia venisse compromessa, il 100% di quei partecipanti avrebbe dovuto essere attivamente disonesto. Dal punto di vista dei partecipanti, se sanno di essere stati onesti, non c'è bisogno di fidarsi di nessun altro perché sanno di aver protetto la cerimonia (hanno soddisfatto individualmente il requisito di 1 partecipante onesto su N).

<ExpandableCard title="A cosa serve il numero casuale della cerimonia KZG?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Quando un rollup pubblica dati in un blob, fornisce un "impegno" che pubblica on-chain. Questo impegno è il risultato della valutazione di un adattamento polinomiale ai dati in determinati punti. Questi punti sono definiti dai numeri casuali generati nella cerimonia KZG. I prover possono quindi valutare il polinomio negli stessi punti per verificare i dati: se arrivano agli stessi valori, i dati sono corretti.
</ExpandableCard>

<ExpandableCard title="Perché i dati casuali KZG devono rimanere segreti?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Se qualcuno conosce le posizioni casuali utilizzate per l'impegno, è facile per lui generare un nuovo polinomio che si adatti a quei punti specifici (ovvero, una "collisione"). Ciò significa che potrebbe aggiungere o rimuovere dati dal blob e fornire comunque una prova valida. Per evitare ciò, invece di fornire ai prover le posizioni segrete effettive, ricevono in realtà le posizioni avvolte in una "scatola nera" crittografica utilizzando curve ellittiche. Queste mescolano efficacemente i valori in modo tale che i valori originali non possano essere decodificati, ma con un po' di algebra intelligente i prover e i verificatori possono comunque valutare i polinomi nei punti che rappresentano.
</ExpandableCard>

<Alert variant="warning" className="mb-8">
  Né il Danksharding né il Proto-Danksharding seguono il modello tradizionale di "frammentazione" (sharding) che mira a dividere la blockchain in più parti. Le catene di frammenti non fanno più parte del piano d'azione. Invece, il Danksharding utilizza il campionamento distribuito dei dati attraverso i blob per scalare Ethereum. Questo è molto più semplice da implementare. Questo modello è stato talvolta definito "frammentazione dei dati" (data-sharding).
</Alert>

## Cos'è il Danksharding? {#what-is-danksharding}

Il Danksharding è la piena realizzazione della scalabilità dei rollup iniziata con il Proto-Danksharding. Il Danksharding porterà enormi quantità di spazio su Ethereum affinché i rollup possano scaricare i dati compressi delle loro transazioni. Ciò significa che Ethereum sarà in grado di supportare facilmente centinaia di rollup individuali e rendere realtà milioni di transazioni al secondo.

Il modo in cui funziona è espandendo i blob allegati ai blocchi da sei (6) nel Proto-Danksharding, a 64 nel Danksharding completo. Il resto delle modifiche richieste sono tutti aggiornamenti al modo in cui operano i client di consenso per consentire loro di gestire i nuovi grandi blob. Molte di queste modifiche sono già nel piano d'azione per altri scopi indipendenti dal Danksharding. Ad esempio, il Danksharding richiede che sia stata implementata la separazione tra proponente e costruttore (proposer-builder separation). Questo è un aggiornamento che separa i compiti di costruzione dei blocchi e di proposta dei blocchi tra diversi validatori. Allo stesso modo, il campionamento della disponibilità dei dati è richiesto per il Danksharding, ma è anche richiesto per lo sviluppo di client molto leggeri che non memorizzano molti dati storici ("client senza stato").

<ExpandableCard title="Perché il Danksharding richiede la separazione tra proponente e costruttore?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

La separazione tra proponente e costruttore è necessaria per evitare che i singoli validatori debbano generare impegni e prove costosi per 32 MB di dati blob. Ciò metterebbe a dura prova gli staker domestici e richiederebbe loro di investire in hardware più potente, il che danneggia la decentralizzazione. Invece, costruttori di blocchi specializzati si assumono la responsabilità di questo costoso lavoro computazionale. Quindi, rendono i loro blocchi disponibili ai proponenti dei blocchi per la trasmissione. Il proponente del blocco sceglie semplicemente il blocco più redditizio. Chiunque può verificare i blob in modo economico e rapido, il che significa che qualsiasi validatore normale può verificare che i costruttori di blocchi si stiano comportando onestamente. Ciò consente di elaborare i grandi blob senza sacrificare la decentralizzazione. I costruttori di blocchi che si comportano in modo scorretto potrebbero semplicemente essere espulsi dalla rete e puniti: altri prenderanno il loro posto perché la costruzione di blocchi è un'attività redditizia.
</ExpandableCard>

<ExpandableCard title="Perché il Danksharding richiede il campionamento della disponibilità dei dati?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Il campionamento della disponibilità dei dati è necessario affinché i validatori possano verificare in modo rapido ed efficiente i dati dei blob. Utilizzando il campionamento della disponibilità dei dati, i validatori possono essere molto certi che i dati del blob fossero disponibili e impegnati correttamente. Ogni validatore può campionare casualmente solo pochi punti dati e creare una prova, il che significa che nessun validatore deve controllare l'intero blob. Se mancano dei dati, verranno identificati rapidamente e il blob verrà rifiutato.
</ExpandableCard>

### Progressi attuali {#current-progress}

Il Danksharding completo è lontano diversi anni. Nel frattempo, la cerimonia KZG si è conclusa con oltre 140.000 contributi e la [EIP](https://eips.ethereum.org/EIPS/eip-4844) per il Proto-Danksharding è maturata. Questa proposta è stata completamente implementata in tutte le reti di test ed è andata live sulla rete principale con l'aggiornamento della rete Cancun-Deneb ("Dencun") a marzo 2024.

### Letture consigliate {#further-reading}

- [Note sul Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Note di Dankrad sul Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto e Vitalik discutono del Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [La cerimonia KZG](https://ceremony.ethereum.org/)
- [Intervento di Carl Beekhuizen al Devcon sulle configurazioni attendibili](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Maggiori informazioni sul campionamento della disponibilità dei dati per i blob](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist sugli impegni e le prove KZG](https://youtu.be/8L2C6RDMV9Q)
- [Impegni polinomiali KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)