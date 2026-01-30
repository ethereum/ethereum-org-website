---
title: Catene plasma
description: "Un'introduzione alle catene plasma come soluzione di scalabilità, attualmente utilizzata dalla comunità Ethereum."
lang: it
incomplete: true
sidebarDepth: 3
---

Una catena Plasma è una blockchain separata ancorata alla Rete principale di Ethereum, ma che esegue le transazioni fuori dalla catena con il proprio meccanismo per la convalida dei blocchi. Le catene Plasma sono solitamente note come catene "figlio", essenzialmente copie più piccole della Rete principale di Ethereum. Le catene Plasma utilizzano [prove di frode](/glossary/#fraud-proof) (come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/)) per arbitrare le controversie.

Gli alberi di Merkle consentono la creazione di una pila illimitata di queste catene che possono funzionare per scaricare la larghezza di banda dalle catene padre (inclusa la Rete principale di Ethereum). Tuttavia, benché queste catene derivino una certa sicurezza da Ethereum (tramite le prove di frode), la loro sicurezza ed efficienza sono influenzate da numerose limitazioni di progettazione.

## Prerequisiti {#prerequisites}

Dovresti avere una buona comprensione di tutti gli argomenti fondamentali e una comprensione di alto livello del [ridimensionamento di Ethereum](/developers/docs/scaling/).

## Cos'è Plasma?

Plasma è un quadro per migliorare la scalabilità nelle blockchain pubbliche come Ethereum. Come descritto nel [whitepaper di Plasma](http://plasma.io/plasma.pdf) originale, le catene Plasma sono costruite su un'altra blockchain (chiamata "catena radice"). Ogni "catena figlia" si estende dalla catena di radice ed è generalmente gestita da un contratto intelligente, distribuito sulla catena madre.

Il contratto Plasma funge, tra le altre cose, da [ponte](/developers/docs/bridges/) consentendo agli utenti di spostare asset tra la Rete principale di Ethereum e la catena Plasma. Sebbene questo le renda simili alle [catene laterali](/developers/docs/scaling/sidechains/), le catene Plasma beneficiano, almeno in una certa misura, della sicurezza della Rete principale di Ethereum. Questo le distingue dalle sidechain, che sono le uniche responsabili della propria sicurezza.

## Come funziona Plasma?

I componenti di base del quadro Plasma sono:

### Calcolo fuori dalla catena {#offchain-computation}

La velocità di elaborazione attuale di Ethereum è limitata a circa 15-20 transazioni al secondo, riducendo la possibilità a breve termine di ridimensionamento per gestire più utenti. Questo problema esiste principalmente perché il [meccanismo di consenso](/developers/docs/consensus-mechanisms/) di Ethereum richiede che molti nodi peer-to-peer verifichino ogni aggiornamento allo stato della blockchain.

Sebbene il meccanismo di consenso di Ethereum sia necessario per la sicurezza, potrebbe non applicarsi a ogni caso d'uso. Ad esempio, Alice potrebbe non aver bisogno dei suoi pagamenti giornalieri a Bob per una tazza di caffè verificata dall'intera rete di Ethereum, poiché esiste una certa fiducia tra entrambe le parti.

Plasma suppone che la Rete principale di Ethereum non necessiti di verificare tutte le transazioni. Invece, possiamo elaborare transazioni al di fuori della Rete principale, liberando i nodi dall'obbligo di convalidare ogni transazione.

Il calcolo fuori dalla catena è necessario poiché le catene Plasma possono ottimizzare per velocità e costi. Ad esempio, una catena Plasma potrebbe usare, e molto spesso usa, un singolo "operatore" per gestire l'ordine e l'esecuzione delle transazioni. Con una sola entità che verifica le transazioni, i tempi di elaborazione su una catena Plasma sono più veloci sulla Rete principale di Ethereum.

### Impegni di stato {#state-commitments}

Mentre Plasma esegue transazioni fuori dalla catena, queste vengono regolate sul livello di esecuzione principale di Ethereum, altrimenti le catene Plasma non possono beneficiare delle garanzie di sicurezza di Ethereum. Ma la finalizzazione delle transazioni fuori dalla catena senza conoscere lo stato della catena Plasma comprometterebbe il modello di sicurezza e consentirebbe la proliferazione di transazioni non valide. Per questo l'operatore, l'entità responsabile della produzione dei blocchi sulla catena Plasma deve pubblicare periodicamente degli "impegni di stato" su Ethereum.

Uno [schema di impegno](https://en.wikipedia.org/wiki/Commitment_scheme) è una tecnica crittografica per impegnarsi su un valore o un'istruzione senza rivelarla a un'altra parte. Gli impegni sono "vincolanti" nel senso che non puoi cambiare il valore o l'istruzione una volta che te ne sei assunto l'impegno. Gli impegni di stato in Plasma assumono la forma di "radici di Merkle" (derivate da un [albero di Merkle](/whitepaper/#merkle-trees)) che l'operatore invia a intervalli al contratto Plasma sulla catena di Ethereum.

Le radici di Merkle sono primitive crittografiche che consentono la compressione di grandi quantità di informazioni. Una radice di Merkle (anche detta una "radice blocco", in questo caso), potrebbe rappresentare tutte le transazioni in un blocco. Le radici di Merkle rendono inoltre più facile verificare che una piccola parte di dati faccia parte del set di dati più ampio. Ad esempio, un utente può produrre una [prova di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) per dimostrare l'inclusione di una transazione in un blocco specifico.

Le radici di Merkle sono importanti per fornire informazioni a Ethereum sullo stato fuori dalla catena. Puoi pensare alle radici di Merkle come "punti di salvataggio": l'operatore sta dicendo che "Questo è lo stato della catena Plasma nel momento x e questa è la radice di Merkle che ne è la prova". L'operatore si sta impegnando sullo _stato attuale_ della catena Plasma con una radice di Merkle, motivo per cui viene chiamato "impegno di stato".

### Entrate e uscite {#entries-and-exits}

Perché gli utenti di Ethereum sfruttino Plasma, è necessario un meccanismo per spostare i fondi tra la Rete principale e le catene Plasma. Non possiamo però inviare arbitrariamente ether a un indirizzo sulla catena Plasma: queste catene sono incompatibili, quindi, la transazione fallirebbe o porterebbe alla perdita dei fondi.

Plasma usa un contratto principale eseguito su Ethereum per elaborare le entrate e uscite dell'utente. Questo contratto principale è inoltre responsabile di monitorare gli impegni di stato (spiegati in precedenza) e di punire il comportamento disonesto tramite prove di frode (maggiori informazioni a riguardo in seguito).

#### Entrare nella catena Plasma {#entering-the-plasma-chain}

Per entrare nella catena Plasma, Alice (l'utente) dovrà depositare ETH o qualsiasi token ERC-20 nel contratto Plasma. L'operatore di Plasma, che guarda i depositi del contratto, ricrea un importo pari al deposito iniziale di Alice e lo rilascia al suo indirizzo sulla catena Plasma. Alice deve attestare per ricevere i fondi sulla catena figlio e può poi usarli per le transazioni.

#### Uscire dalla catena Plasma {#exiting-the-plasma-chain}

Uscire dalla catena Plasma è più complesso che entrarvi per diversi motivi. Il principale è che, mentre Ethereum ha informazioni sullo stato della catena Plasma, non può verificare se le informazioni siano vere o no. Un utente malevolo potrebbe fare un'asserzione errata ("Ho 1000 ETH") e riuscire a fornire prove fasulle per sostenerla.

Per impedire i prelievi malevoli, è introdotto un "periodo di contestazione". Durante il periodo di contestazione (solitamente una settimana), chiunque può contestare una richiesta di prelievo usando una prova di frode. Se la contestazione ha successo, allora la richiesta di prelievo è negata.

Tuttavia, di solito gli utenti sono onesti e fanno affermazioni corrette sui fondi che posseggono. In questo scenario, Alice avvierà una richiesta di prelievo sulla catena radice (Ethereum) inviando una transazione al contratto Plasma.

Deve anche fornire una prova di Merkle che verifichi che una transazione che ha creato i suoi fondi sulla catena Plasma è stata inclusa in un blocco. Questo è necessario per le iterazioni di Plasma, come [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), che utilizzano un modello [Unspent Transaction Output (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Altre, come [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), rappresentano i fondi come [token non fungibili](/developers/docs/standards/tokens/erc-721/) invece di UTXO. Prelevare, in questo caso, richiede la prova di proprietà dei token sulla catena Plasma. Ciò avviene inviando le ultime due transazioni relative al token e fornendo una prova di Merkle che verifichi l'inclusione di queste transazioni in un blocco.

L'utente deve anche aggiungere una cauzione alla richiesta di prelievo come garanzia di comportamento onesto. Se l'autore di una contestazione prova che la richiesta di prelievo di Alice non è valida, la sua cauzione viene decurtata e una parte di essa va all'autore della contestazione come ricompensa.

Se il periodo di contestazione scade senza che nessuno fornisca una prova di frode, la richiesta di prelievo di Alice è considerata valida, consentendole di recuperare i depositi dal contratto Plasma su Ethereum.

### Arbitrato delle controversie {#dispute-arbitration}

Come ogni blockchain, le catene Plasma necessitano di un meccanismo per applicare l'integrità delle transazioni nel caso in cui i partecipanti agiscano in modo malevolo (ad es. doppia spesa di fondi). A tal fine, le catene Plasma usano le prove di frode per arbitrare le dispute relative alla validità delle transizioni di stato e penalizzare i cattivi comportamenti. Le prove di frode sono utilizzate come un meccanismo tramite cui, una catena secondaria di Plasma presenta un reclamo alla sua catena principale o alla catena di root.

Una prova di frode è semplicemente l'affermazione che una particolare transizione di stato non è valida. Un esempio è se un utente (Alice) prova a spendere gli stessi fondi due volte. Forse ha speso l'UTXO in una transazione con Bob e desidera spendere lo stesso UTXO (che ora è di Bob) in un'altra transazione.

Per impedire il prelievo, Bob costruirà una prova di frode fornendo prova della spesa di tale UTXO da parte di Alice in una transazione precedente e una prova di Merkle dell'inclusione della transazione in un blocco. Lo stesso processo funziona in Plasma Cash: Bob dovrebbe fornire prova che Alice abbia precedentemente trasferito i token che sta provando a prelevare.

Se la contestazione di Bob ha successo, la richiesta di prelievo di Alice viene annullata. Tuttavia, questo approccio si basa sulla possibilità per Bob di guardare la catena alla ricerca di richieste di prelievo. Se Bob è offline, allora Alice può elaborare il prelievo malevolo una volta scaduto il periodo di contestazione.

## Il problema dell'uscita di massa in Plasma {#the-mass-exit-problem-in-plasma}

Il problema dell'uscita di massa si verifica quando un gran numero di utenti prova a prelevare da una catena Plasma allo stesso momento. L'esistenza di questo problema ha a che fare con uno dei maggiori problemi di Plasma: la **non disponibilità dei dati**.

La disponibilità dei dati è la capacità di verificare che le informazioni per un blocco proposto siano state realmente pubblicate sulla rete della blockchain. Un blocco è "non disponibile" se il produttore pubblica il blocco stesso ma trattiene i dati usati per crearlo.

I blocchi devono essere disponibili se i nodi devono essere in grado di scaricare il blocco e verificare la validità delle transazioni. Le blockchain garantiscono la disponibilità dei dati obbligando i produttori di blocchi a pubblicare tutti i dati delle transazioni on-chain.

La disponibilità dei dati aiuta anche a proteggere i protocolli di ridimensionamento fuori dalla catena che si basano sul livello di base di Ethereum. Forzando gli operatori su queste catene a pubblicare i dati delle transazioni su Ethereum, chiunque può contestare i blocchi non validi costruendo prove di frode facendo riferimento allo stato corretto della catena.

Le catene Plasma archiviano principalmente i dati delle transazioni con l'operatore e **non pubblicano alcun dato sulla Rete principale** (cioè, a parte gli impegni di stato periodici). Questo significa che gli utenti devono affidarsi all'operatore per fornire i dati del blocco, se devono creare delle prove di frode che constino le transazioni non valide. Se questo sistema funziona, allora gli utenti possono sempre usare le prove di frode per proteggere i fondi.

Il problema nasce quando l'operatore, non un utente qualsiasi, è la parte che agisce in modo malevolo. Poiché l'operatore ha il controllo esclusivo della blockchain, ha un maggiore incentivo a portare avanti transizioni di stato non valide su una scala maggiore, come rubare i fondi appartenenti ad utenti sulla catena Plasma.

In questo caso, l'utilizzo del classico sistema di prova di frode non funziona. L'operatore potrebbe facilmente creare una transazione non valida trasferendo i fondi di Alice e Bob al proprio portafoglio e nascondendo i dati necessari per creare la prova di frode. Questo è possibile perché l'operatore non è tenuto a rendere disponibili i dati agli utenti o alla Rete principale.

Dunque, la soluzione più ottimistica è quella di tentare una "uscita di massa" degli utenti dalla catena Plasma. L'uscita di massa rallenta il piano dell'operatore malevolo di rubare fondi e fornisce una certa misura di protezione agli utenti. Le richieste di prelievo sono ordinate in base al momento di creazione di ogni UTXO (o token), impedendo agli operatori malevoli dal danneggiare gli utenti onesti.

Ciò nonostante, ci serve ancora di un modo per verificare la validità delle richieste di prelievo durante un'uscita di massa, per impedire a individui opportunisti di approfittare dell'elaborazione caotica delle uscite non valide. La soluzione è semplice: richiedere agli utenti di pubblicare l'ultimo **stato valido della catena** per ritirare i propri fondi.

Ma anche questo approccio ha dei problemi. Per esempio, se tutti gli utenti su una catena Plasma devono uscire (il che è possibile nel caso di un operatore malevolo), allora l'intero stato valido della catena Plasma deve essere scaricato subito sul livello di base di Ethereum. Con le dimensioni arbitrarie delle catene Plasma (elevato volume = più dati) e coi vincoli sulle velocità di elaborazione di Ethereum, questa non è una soluzione ideale.

Sebbene i giochi di fuga sembrino divertenti in teoria, le "fughe" di massa nella vita reale potrebbero innescare congestioni dell'intera rete su Ethereum stessa. Oltre a danneggiare la funzionalità di Ethereum, un'uscita di massa mal coordinata comporta che gli utenti potrebbero non riuscire a prelevare i fondi prima che l'operatore abbia drenato ogni conto sulla catena di Plasma.

## Pro e contro di Plasma {#pros-and-cons-of-plasma}

| Pro                                                                                                                                                                                                                                                                                         | Contro                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Volumi elevati d'offerta e basso costo per transazione.                                                                                                                                                                                                                     | Non supporta il calcolo generale (non può eseguire i contratti intelligenti). Solo trasferimenti di base di token, scambi e pochi altri tipi di transazione sono supportati tramite logica dei predicati. |
| Ottima per transazioni tra utenti arbitrari (non c'è sovraccarico per coppia di utenti se entrambi sono sulla catena Plasma)                                                                                                                                             | Necessità di monitorare la rete periodicamente (requisito di liveness) o delegare la responsabilità a qualcun altro per garantire la sicurezza dei fondi.                                                                 |
| Le catene Plasma sono adattabili a casi d'uso specifici non correlati alla catena principale. Chiunque, incluse le aziende, può personalizzare i contratti intelligenti di Plasma per fornire un'infrastruttura scalabile che funzioni in diversi contesti. | Fa affidamento ad uno o più operatori per archiviare i dati e fornirli su richiesta.                                                                                                                                                         |
| Riduce il carico sulla Rete principale di Ethereum spostando calcolo e archiviazione fuori dalla catena.                                                                                                                                                                    | I prelievi sono ritardati di diversi giorni per consentire eventuali contestazioni. Per risorse fungibili, questo può essere mitigato da provider di liquidità, ma c'è sempre associato un costo di capitale.                |
|                                                                                                                                                                                                                                                                                             | Se troppi utenti provano a uscire simultaneamente, la Rete principale di Ethereum potrebbe congestionarsi.                                                                                                                                   |

## Plasma vs. protocolli di ridimensionamento di livello 2 {#plasma-vs-layer-2}

Sebbene Plasma fosse un tempo considerata un'utile soluzione di ridimensionamento per Ethereum, da allora è stata abbandonata a favore dei [protocolli di ridimensionamento di livello 2 (L2)](/layer-2/). Le soluzioni di ridimensionamento del L2 rimediano a diversi problemi di Plasma:

### Efficienza {#efficiency}

I [rollup a conoscenza-zero](/developers/docs/scaling/zk-rollups) generano prove crittografiche della validità di ogni lotto di transazioni elaborate fuori dalla catena. Questo impedisce agli utenti (e agli operatori) di portare avanti transizioni di stato non valide, eliminando il bisogno di periodi di contestazione e fughe di massa. Significa anche che gli utenti non devono guardare periodicamente la catena per proteggere i propri fondi.

### Supporto per i contratti intelligenti {#support-for-smart-contracts}

Un altro problema del framework di Plasma era [l'impossibilità di supportare l'esecuzione dei contratti intelligenti di Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Di conseguenza, gran parte delle implementazioni di Plasma erano prevalentemente create per pagamenti semplici o lo scambio di token ERC-20.

Al contrario, i rollup ottimistici sono compatibili con la [Macchina Virtuale di Ethereum](/developers/docs/evm/) e possono eseguire [contratti intelligenti](/developers/docs/smart-contracts/) nativi di Ethereum, rendendoli una soluzione utile e _sicura_ per il ridimensionamento delle [applicazioni decentralizzate](/developers/docs/dapps/). Allo stesso modo, sono in corso piani per [creare un'implementazione a conoscenza-zero dell'EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) che consentirebbe ai rollup ZK di elaborare logiche arbitrarie ed eseguire contratti intelligenti.

### Non disponibilità dei dati {#data-unavailability}

Come spiegato in precedenza, Plasma soffre di un problema di disponibilità dei dati. Se un operatore malevolo portasse avanti una transizione non valida sulla catena Plasma, gli utenti non potrebbero contestarla poiché l'operatore può trattenere i dati necessari a creare la prova di frode. I rollup risolvono questo problema forzando gli operatori a pubblicare i dati delle transazioni su Ethereum, consentendo a chiunque di verificare lo stato della catena e creare prove di frode se necessario.

### Problema dell'uscita di massa {#mass-exit-problem}

I rollup ZK e ottimistici risolvono entrambi il problema di uscita di massa di Plasma in vari modi. Ad esempio, un rollup ZK si basa su meccanismi crittografici che assicurano che gli operatori non possano rubare i fondi dell'utente in alcuno scenario.

Analogamente, i rollup ottimistici impongono un periodo di ritardo sui prelievi durante cui chiunque può avviare una contestazione e impedire le richieste di prelievo malevole. Sebbene questo sia simile a Plasma, la differenza è che i verificatori hanno accesso ai dati necessari a creare le prove di frode. Dunque, non serve che gli utenti del rollup diano luogo a un frenetico "fuggi fuggi" per migrare verso la Rete principale di Ethereum.

## In che modo Plasma differisce dalle sidechain e dallo sharding? {#plasma-sidechains-sharding}

Plasma, sidechain e sharding sono abbastanza simili perché si connettono tutti alla Rete principale di Ethereum in qualche modo. Tuttavia, il livello e la forza di queste connessioni variano, il che influenza le proprietà di sicurezza di ciascuna soluzione di ridimensionamento.

### Plasma vs. catene laterali {#plasma-vs-sidechains}

Una [catena laterale](/developers/docs/scaling/sidechains/) è una blockchain gestita in modo indipendente e connessa alla Rete principale di Ethereum tramite un ponte bidirezionale. I [ponti](/bridges/) consentono agli utenti di scambiare token tra le due blockchain per effettuare transazioni sulla catena laterale, riducendo la congestione sulla Rete principale di Ethereum e migliorando la scalabilità.
Le sidechain usano un meccanismo di consenso separato e sono tipicamente molto più piccole della Rete principale di Ethereum. Ne risulta che il collegamento delle risorse a queste catene coinvolge un maggiore rischio; data la mancanza di garanzie di sicurezza ereditate dalla Rete principale di Ethereum nel modello della sidechain, gli utenti rischiano di perdere fondi in un attacco alla sidechain.

Viceversa, le catene Plasma derivano la propria sicurezza dalla Rete principale. Questo le rende considerevolmente più sicure delle sidechain. Sia le sidechain che le catene Plasma possono avere diversi protocolli di consenso, ma la differenza è che le seconde pubblicano radici di Merkle per ogni blocco sulla Rete principale di Ethereum. Le radici blocco sono piccole informazioni utilizzabili per verificare le informazioni sulle transazioni che si verificano su una catena Plasma. Se si verifica un attacco su una catena Plasma, gli utenti possono prelevare in sicurezza i propri fondi sulla Rete principale usando le prove appropriate.

### Plasma vs. frammentazione {#plasma-vs-sharding}

Sia le catene Plasma che le shard chain pubblicano periodicamente prove crittografiche sulla Rete principale di Ethereum. Tuttavia, le due catene hanno proprietà di sicurezza diverse.

Le shard chain inviano "intestazioni di collazione" alla Rete principale contenenti informazioni dettagliate su ogni frammento di dati. I nodi sulla Rete principale verificano e applicano la validità dei frammenti di dati, riducendo la possibilità di transazioni di shard non valide e proteggendo la rete dalle attività malevole.

Plasma è differente perché la Rete principale riceve solo informazioni minime sullo stato delle catene figlio. Questo significa che la Rete principale non può verificare efficientemente le transazioni condotte sulle catene figlio, rendendole meno sicure.

**Nota**: la frammentazione della blockchain di Ethereum non è più sulla tabella di marcia. È stata sostituita dal ridimensionamento tramite i rollup e [Danksharding](/roadmap/danksharding).

### Usa Plasma {#use-plasma}

Diversi progetti forniscono implementazioni di Plasma che puoi integrare nelle tue dapp:

- [Polygon](https://polygon.technology/) (precedentemente Rete Matic)

## Letture consigliate {#further-reading}

- [Scopri Plasma](https://www.learnplasma.org/en/)
- [Un rapido promemoria di cosa significa "sicurezza condivisa" e perché è così importante](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Catene laterali vs. Plasma vs. frammentazione](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Capire Plasma, Parte 1: le basi](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Vita e morte di Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_
