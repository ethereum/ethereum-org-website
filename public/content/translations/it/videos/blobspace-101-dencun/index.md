---
title: "Il prossimo aggiornamento di Ethereum: blobspace 101"
description: "Domothy spiega il blobspace, il nuovo livello di disponibilità dei dati introdotto dall'aggiornamento Dencun di Ethereum, illustrando come funzionano le transazioni blob, perché sono importanti per la scalabilità di Ethereum e cosa riserva il futuro per la disponibilità dei dati."
lang: it
youtubeId: "dFjyUY3e53Q"
uploadDate: 2024-02-27
duration: "1:02:31"
educationLevel: intermediate
topic:
  - "scaling"
  - "blobs"
  - "dencun"
  - "upgrades"
format: interview
author: Bankless
breadcrumb: "Blobspace 101"
---

Questa intervista tratta la risorsa dello spazio dei blob (blobspace) di Ethereum, introdotta con l'[EIP-4844 (Proto-Danksharding)](https://www.eip4844.com/). Il ricercatore di Ethereum Domothy si unisce a David Hoffman e Ryan Sean Adams nel podcast Bankless per spiegare la storia della roadmap incentrata sui rollup, i meccanismi tecnici dei blob e le implicazioni economiche della separazione dello spazio dei blocchi dallo spazio dei blob.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=dFjyUY3e53Q) pubblicata da Bankless. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione allo spazio dei blob (0:00) {#introduction-to-blob-space-000}

**Ryan Sean Adams:** Benvenuti a Bankless, dove esploriamo la frontiera del denaro e della finanza su internet. Qui vi spieghiamo come iniziare, come migliorare e come anticipare le opportunità. Sono qui con David Hoffman e siamo qui per aiutarvi a diventare più "bankless". Sapete quando diciamo che le blockchain vendono blocchi? Ebbene, presto Ethereum venderà molto più che semplici blocchi: venderà anche blob.

**David Hoffman:** Esatto, blob. Mancano solo pochi mesi al più grande rilascio di Ethereum da The Merge, e credo che nessuno ne abbia ancora compreso appieno le implicazioni, ma sarà un evento enorme. Ethereum sta per avere un nuovo prodotto da vendere. Si chiama spazio dei blob (blobspace), e si aggiunge allo spazio dei blocchi. Il costo delle transazioni sui layer 2 (l2) sta per scendere verso lo zero. L'economia del gas in ETH e di ciò che viene bruciato sta per cambiare per sempre. Chiamiamo questo aggiornamento l'aggiornamento dello spazio dei blob, EIP-4844, Proto-Danksharding. Vogliamo coprire tutto ciò che c'è da sapere sullo spazio dei blob.

**Ryan Sean Adams:** Alcuni punti chiave qui. Numero uno, esamineremo cos'è lo spazio dei blob. Numero due, ripercorreremo la storia di come siamo arrivati fin qui: questa roadmap incentrata sui rollup. Numero tre, analizzeremo l'economia. Cosa significa questo per l'economia di Ethereum, per l'accumulo di valore di ETH, per ETH come asset? David, perché questo episodio è stato significativo per te?

**David Hoffman:** Penso che se c'è un argomento di conversazione che tu e io amiamo davvero, è l'intersezione tra crittografia ed economia: come i numeri e le manifestazioni economiche. Adoro interagire con questi protocolli.

**Ryan Sean Adams:** Sì, è il nostro linguaggio dell'amore.

**David Hoffman:** Abbiamo parlato dell'EIP-4844, abbiamo parlato del Proto-Danksharding. Sono la stessa cosa. Lo abbiamo definito diverse volte in vari contesti. Ma non ci siamo mai tuffati a capofitto nella tana del bianconiglio per uscirne dall'altra parte rispondendo al lato economico. Quindi, abbiamo tecnicamente scalato la disponibilità dei dati a livello tecnico: questo è un miglioramento del protocollo. Ma come si collega al lato di mercato di Ethereum? L'unico mercato esistente si sta ora dividendo in due: lo spazio dei blocchi e lo spazio dei blob sono ora due mercati indipendenti e distinti contenuti all'interno di un blocco di Ethereum.

Cosa significa questo per l'ether? Cosa significa per i mercati che nascono attorno a queste cose? In che modo l'equilibrio tra domanda e offerta di ciascuno influisce sull'altro? Cosa comporta per la scalabilità dei layer 2? Cosa comporta per i casi d'uso economici sui layer 2? Inizieremo dalle basi, ma poi sbucheremo dall'altra parte della tana del bianconiglio per affrontare il lato economico di questa conversazione.

Facciamo entrare il nostro ospite, Dom, noto anche come Domothy. È un ricercatore presso la Fondazione Ethereum che lavora alla ricerca e allo sviluppo dei principali aggiornamenti di Ethereum in arrivo, tra cui l'EIP-4844 (l'argomento di oggi), il danksharding completo e la combustione del MEV (MEV burn).

#### La storia della roadmap incentrata sui rollup (10:00) {#the-history-of-the-rollup-centric-roadmap-1000}

**Ryan Sean Adams:** Quindi Dom, per capire appieno come siamo arrivati allo spazio dei blob, penso valga la pena fare un tuffo nel passato per comprendere l'intera roadmap di Ethereum, perché è giunta a una conclusione molto logica con i blob e lo spazio dei blob. Puoi riportarci indietro? Perché un tempo la roadmap di Ethereum incentrata sui rollup non esisteva. Avevamo questa cosa chiamata sharding dell'esecuzione (execution sharding), che in realtà non abbiamo mai ottenuto. In quale punto della storia della roadmap di Ethereum è opportuno collocarsi per comprendere davvero l'intero contesto dello spazio dei blob?

**Domothy:** Certo. Ancora prima del lancio di Ethereum, si pensava già a come scalarlo, perché tutti sapevano fin da allora che una singola blockchain in cui ogni nodo esegue tutto non sarebbe stata sufficiente. Quindi inizialmente c'erano diverse idee per lo sharding. Il primo tentativo di definirne le specifiche è stato lo sharding con esecuzione, in cui si hanno fondamentalmente, diciamo, 64 catene indipendenti diverse che cercano di comunicare tra loro. Si è scoperto che è difficile da realizzare: c'è molta complessità in gioco.

È stato suddiviso in diverse fasi. Prima lanceremo una Beacon Chain, poi capiremo come unirla effettivamente all'attuale livello di esecuzione. Poi faremo la Fase Uno, che è solo lo sharding dei dati: quindi nessuna esecuzione, solo blockchain più piccole contenenti dati. E poi capiremo come fare lo sharding dell'esecuzione. Si trattava molto di capire le cose strada facendo, ma in modo sicuro per non fare qualcosa di cui pentirci in seguito e rompere l'intera blockchain, dato che c'è così tanta attività economica su di essa.

**David Hoffman:** Per fornire dettagli sullo sharding dell'esecuzione: si tratta del rimescolamento casuale dei validatori attraverso shard distinti della blockchain, dove ogni shard è essenzialmente una mini-blockchain a sé stante che funziona in parallelo alla Beacon Chain. Suona un po' come quello che abbiamo oggi con i rollup, ma la differenza qui è che gli shard di Ethereum sono in realtà parte del protocollo layer 1 (l1). Il protocollo layer 1 determina cosa sono gli shard, mentre i rollup sono separati. Originariamente, dovevano esserci 64 di questi shard operati, gestiti e prodotti dal protocollo layer 1 di Ethereum. Lo sto spiegando correttamente?

**Domothy:** Esattamente. Ottenere la scalabilità dell'esecuzione in questo modo è più indiretto con i rollup e lo sharding dei dati, ma è un po' come un trucco dal punto di vista della ricerca, perché il layer 1 di Ethereum ha molte meno cose da fare e di cui preoccuparsi. Il resto viene scaricato sui rollup, il che a mio avviso è meglio del piano originale. Nel piano originale degli shard sponsorizzati dallo stato, tutto è uguale: stessa blockchain, stessa EVM, stessi compromessi. Ora, invece, puoi avere rollup in competizione tra loro per ottenere l'ambiente e i compromessi migliori. Se preferisci la super velocità alla super sicurezza, puoi passare a un rollup diverso. Hai scelte, innovazione e competizione al layer 2.

**Ryan Sean Adams:** Soffermiamoci sul mondo modulare in cui si trova Ethereum. Ci sono il livello di consenso, il livello di disponibilità dei dati e il livello di esecuzione. Il livello di consenso definisce ciò che è vero: l'ordine dei blocchi. Il livello di disponibilità dei dati è ciò che è successo: il livello dei dati. Il livello esterno è l'esecuzione, dove l'attività si sta svolgendo in questo momento. Originariamente, Ethereum combinava tutti e tre questi elementi sulla catena principale.

Ora, quello che stiamo facendo con la roadmap incentrata sui rollup è separare l'esecuzione dalla catena principale in questi rollup. Ma affinché i rollup siano completamente protetti con garanzie simili alla Mainnet di Ethereum, devono pubblicare i loro dati di nuovo sulla Mainnet di Ethereum. Quando lo fanno, attualmente costa spazio nei blocchi e costa un sacco di soldi. Il motivo del Proto-Danksharding (EIP-4844) è che l'economia cambia in un modo molto favorevole ai rollup. Dom, hai qualcosa da aggiungere?

**Domothy:** Aggiungerei solo che in questo momento la disponibilità dei dati è più implicita e si riduce a una verifica trustless. Vogliamo che tutti siano in grado di verificare la catena da soli e non debbano avere una terza parte "fidati di me" nel mezzo. Questo è il collo di bottiglia. Devi essere in grado di verificare tutto, il che implica implicitamente che devi avere i dati a tua disposizione per controllare le transizioni di stato.

Verso la fine del 2020, le persone si sono rese conto che i rollup stavano iniziando a diventare incredibilmente validi e popolari, e risolvevano il nostro problema di scalabilità dell'esecuzione senza la necessità dello sharding dell'esecuzione. Scegliendo un ecosistema di rollup piuttosto che cercare di essere dei massimalisti del layer 1, i rollup possono fare i propri compromessi, avviare le proprie blockchain e sperimentare cose nuove. Ethereum gestisce la verifica: questo è il fulcro di ciò che è una blockchain.

#### Cos'è lo spazio dei blob? (30:00) {#what-is-blob-space-3000}

**Ryan Sean Adams:** Ora portaci allo stato attuale, Dom. Abbiamo molti rollup che utilizzano lo spazio dei blocchi del layer 1 di Ethereum, pagando commissioni del gas elevate per pubblicare i dati del loro stato in modo che chiunque possa verificarli. Quindi, Dom, cos'è un blob?

**Domothy:** Un blob è solo un pezzo di dati: nello specifico, essenzialmente un grande array grezzo di numeri. Un blob su Ethereum in questo momento ha una dimensione fissa di circa 128 kilobyte. Sono solo dati grezzi allegati a una transazione, nota come transazione portatrice di blob (blob-carrying transaction), che invii al layer 1.

Il vincolo di progettazione cruciale qui è che l'EVM (Ethereum Virtual Machine) del layer 1 di Ethereum, ovvero il motore di esecuzione, non ha accesso ai dati all'interno del blob. Nei blocchi standard, dati come i dati di chiamata implicano che il sistema guardi quali funzioni vengono chiamate, quali soldi vengono spostati e verifichi i cambiamenti di stato. L'EVM accede a tutto questo. Ma se la scalabilità del layer 2 implica la pubblicazione dei dati dei rollup proprio in modo che un verificatore *offchain* possa eseguire il calcolo, allora il *layer 1* di Ethereum funzionalmente non ha bisogno di guardarli ed eseguirli.

È essenzialmente un pacchetto sigillato. Il layer 1 lo prende, garantisce che tutti abbiano accesso per guardarci dentro se vogliono scaricarlo fisicamente, ma il livello di esecuzione principale di elaborazione di Ethereum stesso non legge e calcola attivamente i dati. Poiché non sta leggendo e calcolando i dati nell'EVM, richiede radicalmente meno risorse di elaborazione dai nodi. Ecco perché è molto più economico.

**David Hoffman:** Quindi per riassumere: lo spazio dei blocchi si occupa del calcolo, dell'esecuzione dello stato e dell'archiviazione della logica. Lo spazio dei blob si occupa esclusivamente della disponibilità dei dati. Al layer 1 non importa chi pubblica cosa in questi blob; tutto ciò che gli importa è ricevere questi blob e conservarli per la finestra di disponibilità designata in modo che le parti interessate (come i sequenziatori dei rollup e gli utenti) possano estrarli, verificare che i dati non siano stati trattenuti in modo malevolo e andare avanti.

**Domothy:** Esattamente. E un'altra proprietà critica dei blob è che vengono automaticamente eliminati (pruned) dopo un periodo di tempo: attualmente circa 18 giorni. Il motivo per cui vengono eliminati è che per garantire una verifica trustless, gli individui hanno bisogno che quei dati siano disponibili solo per dimostrare la definitività e il consenso sullo stato del rollup entro una specifica finestra di contestazione. Non hai bisogno di mille nodi che conservano blob di due anni fa per verificare la tua transazione oggi. Quando la finestra scade, non li otterrai più da un nodo Ethereum; li otterrai da fornitori di cronologia, indicizzatori o dagli esploratori di blocchi nativi del rollup. L'archiviazione su Ethereum è follemente costosa per sempre. L'eliminazione del requisito di archiviazione ci consente di scalare la capacità transazionale dei blob senza distruggere i dischi rigidi degli operatori dei nodi.

#### Economia e danksharding completo (55:00) {#economics-and-full-danksharding-5500}

**Ryan Sean Adams:** Sappiamo che la 4844 è il primo passo: quello che chiamiamo Proto-Danksharding. Stabilisce il formato dei blob e il mercato delle commissioni isolato, ma il numero effettivo di blob target per blocco è inizialmente limitato per essere abbastanza sicuro. Come si presenta questo scalando verso il danksharding completo?

**Domothy:** In questo momento, con l'EIP-4844, puntiamo essenzialmente a 3 blob per blocco, con un massimo rigido di 6. Ciò limita la capacità transazionale massima assoluta dei dati sul layer 1 immediatamente dopo l'aggiornamento per prevenire qualsiasi stress della rete mentre osserviamo come funziona la funzionalità in produzione continua.

Il danksharding completo scala questo aspetto in modo drammatico. Si muove verso il campionamento della disponibilità dei dati (DAS). Con il DAS, i nodi completi non hanno più bisogno di scaricare individualmente ogni singolo blob per verificare che i dati siano stati resi disponibili. Possono campionare statisticamente minuscoli pezzi dei dati del blob. Se il campione statistico risulta disponibile, la probabilità matematica che un utente malintenzionato stia nascondendo dati si avvicina effettivamente allo zero (come una possibilità su un miliardo). Una volta che non si richiede il download completo dell'intero blob, è possibile scalare la capacità dei blob a due cifre o più per blocco.

**David Hoffman:** Questo crea un mercato delle commissioni frammentato all'interno di un blocco di Ethereum. In questo momento, un rollup layer 2 deve competere con i trader di Uniswap e OpenSea per le stesse risorse di spazio dei blocchi in un blocco di Ethereum. Ma questi sono modelli di utilizzo fondamentalmente diversi. Se c'è un conio di NFT che impazza sul layer 1 di Ethereum, il gas subisce picchi e i rollup layer 2 che cercano di pubblicare lo stato dei loro dati si trovano improvvisamente ad affrontare spese aziendali alle stelle solo per svolgere i loro necessari compiti di sicurezza.

Con un mercato delle commissioni bidimensionale (essenzialmente una strada isolata e separata su cui far viaggiare i blob), quel conio di NFT sul layer 1 di Ethereum fa impennare il gas di esecuzione allo stesso modo, ma non utilizza alcuno spazio dei blob. I blob rimangono del tutto non congestionati e di fatto costano pochi centesimi. Un conio di NFT multimilionario sulla catena principale ha un impatto pari a zero sul costo economico della finalizzazione delle transazioni su Arbitrum o Optimism.

**Domothy:** Sì, sono completamente disconnessi. E vale anche il contrario. Se la capacità transazionale del layer 2 subisce un'impennata immensa e migliaia di rollup operano e congestionano lo spazio dei blob, il conseguente picco delle commissioni di base dei blob non influirà sul costo di esecuzione di una semplice transazione sulla Mainnet di Ethereum. La commissione di base dei blob funziona esattamente come la commissione di base dell'EIP-1559, ma nella sua dimensione. E per quanto riguarda la tua precedente domanda su ciò che viene bruciato: sì, la commissione per i blob genera ETH bruciati per pagare l'inclusione dei dati nello spazio dei blob, in modo totalmente separato dagli ETH bruciati per la commissione di base dello spazio dei blocchi.

#### Il futuro della scalabilità di Ethereum (75:00) {#the-future-of-ethereum-scalability-7500}

**Ryan Sean Adams:** Voglio arrivare a ciò che accade specificamente al rilascio della 4844. Inizialmente, c'è ovviamente un'aspettativa molto alta che quando la capacità dei blob si sbloccherà all'improvviso, non ci sarà abbastanza domanda di rollup in quell'esatto microsecondo per riempirla completamente. Lo spazio dei blob sarà quasi comicamente economico al lancio. Ma non cè la legge della domanda indotta? Se hai risorse incredibilmente economiche, le applicazioni che consumano quelle risorse esplodono in volume.

**Domothy:** La transizione iniziale farà scendere le commissioni del layer 2 essenzialmente quasi a zero, perché tutti i rollup esistenti che attualmente competono per il costoso spazio dei blocchi passeranno senza problemi a un enorme pool quasi vuoto di spazio dei blob. Si tratta di un'espansione dei margini massiccia e istantanea per le reti layer 2, che verrà trasferita direttamente agli utenti nel momento in cui integreranno la loro nuova logica di prova con la 4844.

Ma hai ragione: lo spazio dei blocchi economico guida la progettazione di applicazioni ad alta velocità. Quando all'improvviso puoi costruire un gioco onchain che genera milioni e milioni di transizioni di micro-stato per frazioni di centesimo perché il sovraccarico della persistenza dei dati è scomparso, diventano economicamente sostenibili classificazioni di applicazioni completamente nuove che non lo erano sotto i vincoli standard.

Questo crea un'interessante dinamica economica nel modo in cui ETH accumula valore. Se le transazioni sui layer 2 esplodono di 10 o 100 volte a causa di nuove applicazioni possibili in esecuzione su una disponibilità dei dati quasi gratuita, il volume aggregato inizierà alla fine a competere per lo spazio dei blob. A quel punto la commissione di base dei blob dell'EIP-1559 aumenterà naturalmente fino a quando il mercato non raggiungerà l'equilibrio, creando un ciclo continuo e composto in cui si continua a bruciare ETH espandendo al contempo l'utilità dei layer 2.

**David Hoffman:** Rappresenta il successo e la maturazione della roadmap incentrata sui rollup. Ethereum, l'ambiente di esecuzione monolitico, ha colpito un muro in cui scalare la capacità transazionale in modo lineare distruggeva il suo mandato di decentralizzazione. I rollup hanno fornito un modo per aggirare il collo di bottiglia dell'esecuzione, ma erano ancora legati al collo di bottiglia dei dati del layer 1. Lo spazio dei blob sblocca il collo di bottiglia dei dati nello stesso modo in cui i rollup hanno sbloccato il collo di bottiglia dell'esecuzione. Quando questo aggiornamento verrà rilasciato, Ethereum passerà completamente dall'elaborazione di singole transazioni all'elaborazione di reti di esecuzione verificate.

**Ryan Sean Adams:** Per riassumere le tempistiche, l'EIP-4844 arriverà ottimisticamente entro la fine dell'anno o all'inizio del prossimo, e il danksharding completo seguirà nel ciclo di sviluppo successivo. È davvero l'impalcatura infrastrutturale necessaria affinché Ethereum possa accogliere l'intero pianeta, e siamo così vicini a vederlo operare nel mondo reale. Dom, grazie per averci guidato attraverso questo enorme sblocco per la rete.

**Domothy:** Grazie per avermi ospitato.