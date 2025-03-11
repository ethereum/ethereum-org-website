---
title: Rollup ottimistici
description: 'Un''introduzione ai rollup ottimistici: una soluzione di ridimensionamento usata dalla community di Ethereum.'
lang: it
---

I rollup ottimistici sono protocolli di livello 2 (L2) progettati per estendere il volume del livello di base di Ethereum. Riducono il calcolo sulla catena principale di Ethereum elaborando le transazioni al di fuori della catena, offrendo miglioramenti significativi in termini di velocità di elaborazione. A differenza di altre soluzioni di ridimensionamento, come le [sidechain](/developers/docs/scaling/sidechains/), i rollup ottimistici derivano la propria sicurezza dalla Rete principale, pubblicando i risultati delle transazioni sulla catena o sulle [catene Plasma](/developers/docs/scaling/plasma/), che verificano le transazioni anche su Ethereum con le prove di frode, ma memorizzano i dati delle transazioni altrove.

Siccome il calcolo è la parte lenta e costosa di Ethereum, i rollup ottimistici possono offrire miglioramenti alla scalabilità pari a 10-100x. Inoltre, i rollup ottimistici scrivono le transazioni su Ethereum come `calldata` o in [blob](/roadmap/danksharding/), riducendo i costi del gas per gli utenti.

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso le nostre pagine sul [ridimensionamento di Ethereum](/developers/docs/scaling/) e il [livello 2](/layer-2/).

## Cos'è un rollup ottimistico? {#what-is-an-optimistic-rollup}

Un rollup ottimistico è un approccio al ridimensionamento di Ethereum che comporta lo spostamento del calcolo e dell'archiviazione di stato al di fuori della catena. I rollup ottimistici eseguono le transazioni all'esterno di Ethereum, ma ne pubblicano i dati sulla Rete Principale come `calldata` o in [blob](/roadmap/danksharding/).

Gli operatori del rollup ottimistico raggruppano svariate transazioni off-chain in grandi batch prima di inviarle a Ethereum. Questo approccio consente di distribuire i costi fissi su più transazioni in ogni batch, riducendo le commissioni per gli utenti finali. I rollup ottimistici usano inoltre tecniche di compressione per ridurre la quantità di dati pubblicati su Ethereum.

I rollup ottimistici sono considerati "ottimistici" perché presuppongono che le transazioni off-chain siano valide e non pubblicano le prove di validità per i batch di transazioni pubblicati sulla catena. Questo distingue i rollup ottimistici dai [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups) che pubblicano le [prove di validità](/glossary/#validity-proof) crittografiche per le transazioni off-chain.

I rollup ottimistici, invece, si affidano a uno schema di prova di frode per rilevare i casi in cui le transazioni non sono calcolate correttamente. Dopo che un batch del rollup è inviata a Ethereum, c'è una finestra temporale (detta periodo di contestazione) durante la quale chiunque può contestare i risultati di una transazione del rollup calcolando una [prova di frode](/glossary/#fraud-proof).

Se la prova di frode ha successo, il protocollo del rollup esegue nuovamente le transazioni e aggiorna di conseguenza lo stato del rollup. L'altro effetto di una prova di frode riuscita è che il sequenziatore responsabile dell'inclusione della transazione eseguita erroneamente in un blocco riceve una sanzione.

Se il batch del rollup non viene contestata (cioè, tutte le transazioni sono eseguite correttamente) dopo la scadenza del periodo di contestazione, è ritenuta valida e accettata su Ethereum. Altri possono continuare a costruire su un blocco di rollup non confermato, ma con una precisazione: i risultati della transazione saranno annullati se basati su una transazione eseguita erroneamente pubblicata in precedenza.

## Come interagiscono i rollup ottimistici con Ethereum? {#optimistic-rollups-and-Ethereum}

I rollup ottimistici sono [soluzioni di ridimensionamento off-chain](/developers/docs/scaling/#off-chain-scaling) create per funzionare su Ethereum. Ogni rollup ottimistico è gestito da una serie di contratti intelligenti distribuiti sulla rete di Ethereum. I rollup ottimistici elaborano le transazioni al di fuori della catena principale di Ethereum, ma pubblicano le transazioni off-chain (in batch) in un contratto di rollup on-chain. Come la blockchain di Ethereum, questo registro delle transazioni è immutabile e forma la "catena di rollup ottimistico".

L'architettura di un optimistic rollup comprende le seguenti parti:

**Contratti su catena**: L'operazione del rollup ottimistico è controllata dai contratti intelligenti eseguiti su Ethereum. Questo include i contratti che memorizzano i blocchi del rollup, monitorano gli aggiornamenti di stato sul rollup e tracciano i depositi degli utenti. In questo senso, Ethereum serve da livello di base o "livello 1" per i rollup ottimistici.

**Macchina virtuale (VM) off-chain**: sebbene i contratti che gestiscono il protocollo di rollup ottimistico siano eseguiti su Ethereum, il protocollo di rollup esegue calcolo e archiviazione di stato su un'altra macchina virtuale separata dalla [Macchina Virtuale di Ethereum](/developers/docs/evm/). La VM off-chain è dove le applicazioni risiedono e dove sono eseguiti i cambiamenti di stato; serve da livello superiore o "livello 2" per un rollup ottimistico.

Poiché i rollup ottimistici sono progettati per eseguire programmi scritti o compilati per l'EVM, la VM off-chain incorpora molte specifiche di progettazione dell'EVM. Inoltre, le prove di frode calcolate sulla catena consentono alla rete di Ethereum di imporre la validità dei cambiamenti di stato calcolati nella VM off-chain.

I rollup ottimistici sono descritti come 'soluzioni di ridimensionamento ibridi' perché, sebbene esistano come protocolli separati, le loro proprietà di sicurezza sono derivate da Ethereum. Tra le altre cose, Ethereum garantisce la correttezza del calcolo off-chain di un rollup e la disponibilità dei dati dietro il calcolo. Questo rende i rollup ottimistici più sicuri dei protocolli di ridimensionamento off-chain puri (ad es. [sidechain](/developers/docs/scaling/sidechains/)) che non si affidano a Ethereum per la sicurezza.

I rollup ottimistici si affidano al protocollo principale di Ethereum per quanto segue:

### Disponibilità dei dati {#data-availability}

Come accennato, i rollup ottimistici pubblicano i dati delle transazioni su Ethereum come `calldata` o in [blob](/roadmap/danksharding/). Poiché l'esecuzione della catena di rollup si basa sulle transazioni inviate, chiunque può usare queste informazioni, ancorate al livello di base di Ethereum, per eseguire lo stato del rollup e verificare la correttezza delle transizioni di stato.

[La disponibilità dei dati](/developers/docs/data-availability/) è critica perché, senza accesso ai dati di stato, gli autori della contestazione non possono produrre prove di frode per contestare operazioni di rollup non valide. Con Ethereum che fornisce la disponibilità dei dati, il rischio che gli operatori di rollup la passino liscia con atti malevoli (ad es. inviare blocchi non validi) è ridotto.

### Resistenza alla censura {#censorship-resistance}

I rollup ottimistici si affidano a Ethereum anche per la resistenza alla censura. In un rollup ottimistico, un'entità centralizzata (l'operatore) è responsabile dell'elaborazione delle transazioni e dell'invio dei blocchi di rollup a Ethereum. Ciò ha delle implicazioni:

- Gli operatori del rollup possono censurare gli utenti andando completamente offline o rifiutandosi di produrre blocchi che introducano in essi determinate transazioni.

- Gli operatori dei rollup possono impedire agli utenti di prelevare i fondi depositati nel contratto di rollup trattenendo i dati di stato necessari per le prove di proprietà di Merkle. Trattenere i dati di stato può anche nascondere lo stato del rollup agli utenti e impedire loro di interagire col rollup.

I rollup ottimistici risolvono questo problema forzando gli operatori a pubblicare i dati associati agli aggiornamenti di stato su Ethereum. La pubblicazione dei dati di rollup sulla catena ha i seguenti benefici:

- Se l'operatore di un rollup ottimistico va offline o smette di produrre i batch di transazioni, un altro nodo può usare i dati disponibili per riprodurre l'ultimo stato del rollup e proseguire con la produzione del blocco.

- Gli utenti possono usare i dati della transazione per creare delle prove di Merkle per dimostrare la proprietà dei fondi e prelevare le proprie risorse dal rollup.

- Gli utenti possono inoltre inviare le proprie transazioni sul L1 invece che al sequenziatore, nel qual caso il sequenziatore deve includere la transazione entro un certo limite di tempo per continuare a produrre blocchi validi.

### Accordo {#settlement}

Un altro ruolo rivestito da Ethereum nel contesto dei rollup ottimistici è quello di un livello d'accordo. Un livello di accordo collega l'intero ecosistema della blockchain, stabilisce sicurezza e fornisce finalità oggettiva se si verifica una disputa su un'altra catena (rollup ottimistici in questo caso) che richieda un arbitrato.

La Rete principale di Ethereum fornisce un hub per i rollup ottimistici per verificare le prove di frode e risolvere le dispute. Inoltre, le transazioni condotte sul rollup sono finali solo _dopo_ che il blocco del rollup è accettato su Ethereum. Una volta che la transazione di un rollup è impegnata nel livello di base di Ethereum, non è posticipabile (tranne nell'altamente improbabile caso di una riorganizzazione della catena).

## Come funzionano i rollup ottimistici? {#how-optimistic-rollups-work}

### Esecuzione e aggregazione delle transazioni {#transaction-execution-and-aggregation}

Gli utenti inviano le transazioni agli "operatori", che sono nodi responsabili dell'elaborazione delle transazioni sul rollup ottimistico. Anche noto come "validatore" o "aggregatore", l'operatore aggrega le transazioni, comprime i dati sottostanti e pubblica il blocco su Ethereum.

Sebbene chiunque possa diventare un validatore, i validatori del rollup ottimistico devono fornire una cauzione prima di produrre i blocchi, come in un [sistema di proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Questa cauzione è decurtabile se il validatore pubblica un blocco non valido o costruisce su un blocco vecchio ma non valido (anche se il suo blocco è valido). Così, i rollup ottimistici usano incentivi cripto-economici per assicurarsi che i validatori agiscano onestamente.

Gli altri validatori sulla catena di rollup ottimistico dovrebbero eseguire le transazioni inviate usando la loro copia dello stato del rollup. Se lo stato finale di un validatore è differente da quello proposto dall'operatore, possono avviare una contestazione e calcolare una prova di frode.

Alcuni rollup ottimistici potrebbero rinunciare a un sistema di validatore senza permessi e usare un solo "sequenziatore" per eseguire la catena. Come un validatore, il sequenziatore elabora le transazioni, produce i blocchi del rollup e invia le transazioni di rollup alla catena del L1 (Ethereum).

Il sequenziatore si distingue da un normale operatore di rollup perché ha un controllo maggiore sull'ordine delle transazioni. Inoltre, il sequenziatore ha accesso prioritario alla catena di rollup ed è l'unica entità autorizzata a inviare le transazioni al contratto on-chain. Le transazioni da nodi non del sequenziatore o da normali utenti sono semplicemente accodate in una casella di ricezione separata finché il sequenziatore non le include in un nuovo batch.

#### Inviare i blocchi di rollup a Ethereum {#submitting-blocks-to-ethereum}

Come accennato, l'operatore di un rollup ottimistico raggruppa le transazioni off-chain in un batch e le invia a Ethereum per la notarizzazione. Questo procedimento comporta la compressione dei dati correlati alle transazioni e la loro pubblicazione su Ethereum come `calldata` o in blob.

`calldata` è un'area non modificabile e non persistente in un contratto intelligente, che si comporta prevalentemente come una [memoria](/developers/docs/smart-contracts/anatomy/#memory). Mentre `calldata` persiste sulla catena come parte dei [registri storici](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) della blockchain, non è memorizzato come una parte dello statko di Ethereum. Poiché i `calldata` non toccano alcuna parte dello stato di Ethereum, sono più economici dello stato per memorizzare i dati sulla catena.

La parola chiave `calldata` è anche usata in Solidity per passare gli argomenti alla funzione di un contratto intelligente al momento dell'esecuzione. `calldata` identifica la funzione chiamata durante una transazione e trattiene gli input della funzione nella forma di una sequenza arbitraria di byte.

Nel contesto dei rollup ottimistici, `calldata` è usata per inviare dati di transazione compressi al contratto on-chain. L'operatore del rollup aggiunge un nuovo batch chiamando la funzione necessaria nel contratto di rollup e passando i dati compressi come argomenti della funzione. Usare `calldata` riduce le commissioni degli utenti poiché gran parte dei costi in cui incorrono i rollup provengono dalla memorizzazione dei dati sulla catena.

Ecco [un esempio](https://etherscan.io/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) dell'invio di un batch del rollup per mostrare come funziona questo concetto. Il sequenziatore ha invocato il metodo `appendSequencerBatch()` e ha passato i dati della transazione compressi come input usando `calldata`.

Alcuni rollup ora utilizzano i blob per pubblicare pacchetti di transazioni su Ethereum.

I blob non sono modificabili, né persistenti (proprio come `calldata`), ma sono rimossi dallo storico dopo circa 18 giorni. Per ulteriori informazioni sui blob, consulta [Danksharding](/roadmap/danksharding).

### Impegni di stato {#state-commitments}

In qualsiasi momento, lo stato del rollup ottimistico (conti, saldi, codice del contratto, etc.) è organizzato come un [albero di Merkle](/whitepaper/#merkle-trees), detto "albero di stato". La radice di questo albero di Merkle (radice di stato), che fa riferimento all'ultimo stato del rollup, è associata a un hash ed è memorizzata nel contratto di rollup. Ogni transizione di stato sulla catena produce un nuovo stato del rollup, in cui un operatore si impegna calcolando una nuova radice di stato.

L'operatore deve inviare sia le vecchie radici di stato che quelle nuove quando pubblica i batch. Se la vecchia radice di stato corrisponde a quella esistente nel contratto on-chain, quest'ultima viene scartata e sostituita con quella nuova.

L'operatore del rollup deve anche creare una radice di Merkle per il batch di transazioni stesso. Questo consente a chiunque di provare l'inclusione di una transazione nel batch (sul L1) presentando una [prova di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Gli impegni di stato, specialmente le radici di stato, sono necessari per provare la correttezza dei cambiamenti di stato in un rollup ottimistico. Il contratto di rollup accetta le nuove radici di stato dagli operatori immediatamente dopo la loro pubblicazione, ma può poi eliminare quelle non valide per ripristinare il rollup al suo stato corretto.

### Prova di frode {#fraud-proving}

Come spiegato, i rollup ottimistici consentono a chiunque di pubblicare blocchi senza fornire prove di validità. Tuttavia, per assicurarsi che la catena rimanga sicura, i rollup ottimistici specificano una finestra temporale durante la quale chiunque può contestare una transizione di stato. Dunque, i blocchi del rollup sono detti "asserzioni", poiché chiunque può contestarne la validità.

Se qualcuno contesta un'asserzione, il protocollo del rollup avvierà il calcolo della prova di frode. Ogni tipo di prova di frode è interattivo: qualcuno deve pubblicare un'asserzione prima che un'altra persona possa contestarla. La differenza sta nel numero di cicli di interazione necessari per calcolare la prova di frode.

Gli schemi di prova interattivi a turno singolo riproducono le transazioni oggetto di contestazione sul L1 per rilevare le asserzioni non valide. Il protocollo di rollup emula la ri-esecuzione della transazione oggetto di contestazione sul L1 (Ethereum) usando un contratto di verifica, con la radice di stato calcolata che determina chi vince la contestazione. Se il reclamo dell'autore della contestazione sullo stato del rollup è corretto, l'operatore è sanzionato tramite la decurtazione della sua cauzione.

Tuttavia, ri-eseguire le transazioni sul L1 per rilevare la frode richiede la pubblicazione degli impegni di stato per le singole transazioni e aumenta i dati che i rollup devono pubblicare sulla catena. Anche la riproduzione delle transazioni comporta significativi costi del gas. Per questo, i rollup ottimistici stanno passando alla prova interattiva su più turni, che raggiunge lo stesso obiettivo (cioè, rilevare le operazioni di rollup non valide) con maggiore efficienza.

#### Prova interattiva multi-turno {#multi-round-interactive-proving}

La prova interattiva su più turni coinvolge un protocollo botta e risposta tra l'assertore e l'autore della contestazione, supervisionato da un contratto di verifica del L1, che decide infine la parte perdente. Dopo che un nodo del L2 contesta un'asserzione, l'assertore deve dividere l'asserzione constata in due metà uguali. Ogni asserzione individuale, in questo caso, conterrà tanti passaggi di calcolo quanto l'altra.

L'autore della contestazione sceglierà poi quale asserzione desidera contestare. Il processo di divisione (detto "protocollo di bisezione") prosegue finché entrambe le parti stanno contestando un'asserzione su una _singola_ fase dell'esecuzione. A questo punto, il contratto del L1 risolverà la disputa valutando l'istruzione (e il suo risultato) per identificare la parte fraudolenta.

L'assertore deve fornire una "prova di singola fase", verificando la validità del calcolo a singola fase contestato. Se l'assertore non riesce a fornire la prova di singola fase o il verificatore del L1 ritiene che la prova non sia valida, perde la contestazione.

Alcune note su questo tipo di prova di frode:

1. La prova di frode interattiva multi-turno è considerata efficiente perché minimizza il lavoro che la catena del L1 deve effettuare nell'arbitrato della disputa. Invece di riprodurre l'intera transazione, la catena del L1 deve eseguire nuovamente solo una fase nell'esecuzione del rollup.

2. I protocolli di bisezione riducono la quantità di dati pubblicati sulla catena (non serve pubblicare gli impegni di stato per ogni transazione). Inoltre, le transazioni del rollup ottimistico non sono vincolate dal limite di gas di Ethereum. Viceversa, i rollup ottimistici che ri-eseguono le transazioni devono assicurarsi che una transazione del L2 abbia un limite di gas inferiore per emularne l'esecuzione entro una singola transazione di Ethereum.

3. Parte della cauzione dell'assertore malevolo è assegnata all'autore della contestazione, mentre l'altra parte viene bruciata. La combustione previene la collusione tra validatori; se due validatori colludono per avviare delle contestazioni fasulle, perderanno comunque una parte considerevole dell'intero stake.

4. La prova interattiva multi-turno richiede che entrambe le parti (l'assertore e l'autore della contestazione) compiano mosse entro la finestra di tempo specificata. La mancata azione prima della scadenza causa la perdita della contestazione dalla parte inadempiente.

#### Perché le prove di frode contano per i rollup ottimistici {#fraud-proof-benefits}

Le prove di frode sono importanti perché facilitano la _finalità senza fiducia_ nei rollup ottimistici. La finalità senza fiducia è una qualità dei rollup ottimistici che garantisce che una transazione, purché valida, sarà poi confermata.

I nodi malevoli possono provare a ritardare la conferma di un blocco del rollup valido avviando delle contestazioni false. Tuttavia, le prove di frode dimostreranno infine la validità del blocco di rollup e ne causeranno la conferma.

Questo si correla anche a un'altra proprietà di sicurezza dei rollup ottimistici: la validità della catena si basa sull'esistenza di _un_ nodo onesto. Il nodo onesto può far avanzare correttamente la catena pubblicando asserzioni valide o contestando quelle non valide. Indipendentemente dal caso, i nodi malevoli che ingaggiano contestazioni con il nodo onesto perderanno il proprio stake durante il processo di prova di frode.

### Interoperabilità di L1/L2 {#l1-l2-interoperability}

I rollup ottimistici sono progettati per l'interoperabilità con la Rete principale di Ethereum e per consentire agli utenti di passare messaggi e dati arbitrari tra L1 e L2. Sono inoltre compatibili con l'EVM, quindi puoi portare le [dapp](/developers/docs/dapps/) esistenti al rollup ottimistico o creare nuove dapp usando gli strumenti di sviluppo di Ethereum.

#### 1. Spostamento di risorse {#asset-movement}

##### Accedere al rollup

Per usare un rollup ottimistico, gli utenti depositano ETH, token ERC-20 e altre risorse accettate nel contratto [ponte](/developers/docs/bridges/) del rollup sul L1. Il contratto ponte trasmetterà la transazione al L2, dove un importo di risorse equivalente è coniato e inviato all'indirizzo scelto dall'utente sul rollup ottimistico.

Le transazioni generate dall'utente (come un deposito L1 > L2) sono solitamente accodate finché il sequenziatore non le invia nuovamente al contratto del rollup. Tuttavia, per preservare la resistenza alla censura, i rollup ottimistici consentono agli utenti di inviare una transazione direttamente al contratto di rollup on-chain se è stato ritardato oltre il tempo massimo consentito.

Alcuni rollup ottimistici adottano un approccio più semplice per impedire che i sequenziatori censurino gli utenti. Qui, un blocco è definito da tutte le transazioni inviate al contratto del L1 dal blocco precedente (es. depositi) oltre alle transazioni elaborate sulla catena di rollup. Se un sequenziatore ignora una transazione del L1, pubblicherà la radice di stato errata (in modo dimostrabile); dunque, i sequenziatori non possono ritardare il messaggio generato dall'utente una volta pubblicati sul L1.

##### Uscire dal rollup

Il prelievo da un rollup ottimistico a Ethereum è più difficile a causa dello schema di prova di frode. Se un utente avvia una transazione L2 > L1 per prelevare i fondi in garanzia sul L1, devono attendere fino alla scadenza del periodo di contestazione, che dura circa sette giorni. Tuttavia, il processo di prelievo di per sé è abbastanza semplice.

Dopo l'avvio della richiesta di prelievo sul rollup del L2, la transazione è inclusa nel batch successivo, mentre le risorse dell'utente sul rollup sono bruciate. Una volta pubblicato il batch su Ethereum, l'utente può calcolare una prova di Merkle per verificare l'inclusione della sua transazione di uscita nel blocco. Poi si tratta di attendere durante il periodo di ritardo per finalizzare la transazione sul L1 e prelevare i fondi alla Rete principale.

Per evitare di attendere una settimana prima di prelevare i fondi a Ethereum, gli utenti dei rollup ottimistici possono impiegare un **fornitore di liquidità** (LP). Un fornitore di liquidità assume la proprietà di un prelievo del L2 in sospeso e paga l'utente sul L1 (in cambio di una commissione).

I fornitori di liquidità possono verificare la validità della richiesta di prelievo dell'utente (eseguendo essi stessi la catena), prima di rilasciare i fondi. Così hanno la garanzia che la transazione sarà infine confermata (cioè, la finalità senza fiducia).

#### 2. Compatibilità con l'EVM {#evm-compatibility}

Per gli sviluppatori, il vantaggio dei rollup ottimistici è la loro compatibilità, o ancora meglio, equivalenza, con la [Macchina Virtuale di Ethereum (EVM)](/developers/docs/evm/). I rollup compatibili con l'EVM soddisfano le specifiche nel [Yellow Paper di Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) e supportano l'EVM al livello del cobytecode.

La compatibilità dell'EVM nei rollup ottimistici ha i seguenti vantaggi:

i. Gli sviluppatori possono migrare i contratti intelligenti esistenti su Ethereum alle catene dei rollup ottimistici senza dover estensivamente modificare le basi di codice. Questo può far risparmiare tempo ai team di sviluppo durante la distribuzione dei contratti intelligenti di Ethereum sul L2.

ii. I team di sviluppatori e di progetto che usano i rollup ottimistici possono trarre vantaggio dall'infrastruttura di Ethereum. Questo include linguaggi di programmazione, librerie di codice, strumenti di test, software del client, infrastruttura di distribuzione e così via.

Usare gli strumenti esistenti è importante perché questi sono stati ampiamente controllati, debuggati e migliorati negli anni. Rimuove inoltre la necessità per gli sviluppatori di Ethereum di imparare a costruire con uno stack di sviluppo interamente nuovo.

#### 3. Chiamate del contratto tra catene {#cross-chain-contract-calls}

Gli utenti (conti posseduti esternamente), interagiscono con i contratti del L2, inviando una transazione al contratto di rollup o faceendolo fare da un sequenziatore o un validatore. I rollup ottimistici, inoltre, consentono ai conti dei contratti su Ethereum di interagire con i contratti del L2, usando i contratti di collegamento per trasmettere messaggi e passare i dati dal L1 al L2. Questo significa che puoi programmare un contratto del L1 sulla Rete principale di Ethereum affinché invochi funzioni appartenenti a contratti su un rollup ottimistico del L2.

Le chiamate del contratto tra catene si verificano in modo asincrono, il che significa che la chiamata è prima avviata e in seguito eseguita. Questo differisce dalle chiamate tra i due contratti su Ethereum, in cui la chiamata produce risultati immediatamente.

Un esempio di chiamata del contratto tra catene è il deposito di token descritto precedentemente. Un contratto sul L1 mette in garanzia i token dell'utente e invia un messaggio a un contratto del L2 associato per coniare una quantità equivalente di token sul rollup.

Poiché le chiamate del messaggio tra catene risultano nell'esecuzione del contratto, il mittente deve solitamente coprire i [costi del gas](/developers/docs/gas/) per il calcolo. Si consiglia di impostare un limite di gas elevato, per impedire alla transazione di fallire sulla catena di destinazione. Lo scenario di collegamento dei token è un buon esempio; se il lato del L1 della transazione (deposito del token) funziona, ma il lato dedl L2 (conio dei nuovi token) fallisce a causa del poco gas, il deposito diventa irrecuperabile.

Infine, dovremmo notare che le chiamate di messaggio dal L2 al L1 tra i contratti, devono tenere conto dei ritardi (Le chiamate dal L1 al L2 sono tipicamente eseguite dopo qualche minuto). Questo perché i messaggi inviati alla Rete principale dai rollup ottimistici non possono essere eseguiti fino alla scadenza della finestra di contestazione.

## Come funzionano le commissioni dei rollup ottimistici? {#how-do-optimistic-rollup-fees-work}

I rollup ottimistici usano uno schema di commissioni sul gas, molto simile a Ethereum, per denotare quanto gli utenti pagano per la transazione. Le commissioni addebitate sui rollup ottimistici dipendono dai seguenti componenti:

1. **Scrittura di stato**: i rollup ottimistici pubblicano i dati delle transazioni e le intestazioni dei blocchi (consistenti in: hash dell'intestazione del blocco precedente, radice di stato, radice del batch) su Ethereum come `blob`, o "oggetto binario di grandi dimensioni". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) ha introdotto una soluzione economica per includere i dati on-chain. Un `blob` è un nuovo campo di transazione che consente ai rollup di pubblicare dati compressi sulle transizioni tra stati sul L1 di Ethereum. A differenza dei `calldata`, che rimangono permanentemente on-chain, i blob sono di breve durata e possono essere eliminati dai client dopo [4096 epoche](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (circa 18 giorni). Utilizzando i blob per pubblicare batch di transazioni compresse, i rollup ottimistici possono ridurre significativamente il costo di scrittura delle transazioni nel L1.

2. **Gas del blob utilizzato**: le transazioni che trasportano blob utilizzano un meccanismo di commissione dinamica simile a quello introdotto da [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). La commissione sul gas per le transazioni di tipo 3 tiene conto della commissione di base per i blob, che è determinata dalla rete in base alla domanda di spazio blob e all'utilizzo dello spazio blob della transazione inviata.

3. **Commissioni dell'operatore del L2**: questo è l'importo pagato al nodo del rollup come compenso per i costi di calcolo sostenuti nell'elaborazione delle transazioni, proprio come le commissioni sul carburante su Ethereum. I nodi del rollup addebitano commissioni di transazione inferiori, poiché gli L2 hanno capacità di elaborazione maggiori e non affrontano congestioni di rete che forzano i validatori su Ethereum a dare priorità alle transazioni con commissioni maggiori.

I rollup ottimistici applicano diversi meccanismi per ridurre le commissioni per gli utenti, inclusi il raggruppamento delle transazioni e la compressione dei `calldata` per ridurre i costi di pubblicazione dei dati. Puoi controllare il [tracker delle commissioni del L2](https://l2fees.info/) per una panoramica in tempo reale dei costi d'uso dei rollup ottimistici basati su Ethereum.

## Come fanno i rollup ottimistici a ridimensionare Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Come spiegato, i rollup ottimistici pubblicano i dati delle transazioni compressi su Ethereum per garantire la disponibilità dei dati. La possibilità di comprimere i dati pubblicati sulla catena è essenziale per ridimensionare il volume su Ethereum coi rollup ottimistici.

La catena principale di Ethereum pone limiti su quanti dati possono esser contenuti dai blocchi, denominati in unità di gas (la [dimensione media del blocco](/developers/docs/blocks/#block-size) è di 15 milioni di gas). Mentre ciò limita quanto gas è utilizzabile da ogni transazione, significa anche che possiamo aumentare le transazioni elaborate per blocco, riducendo i dati relativi alla transazione e migliorando direttamente la scalabilità.

I rollup ottimistici usano diverse tecniche per ottenere la compressione dei dati di transazione e migliorare i tassi TPS. Ad esempio, questo [articolo](https://vitalik.eth.limo/general/2021/01/05/rollup.html) confronta i dati generati da una transazione di base dell'utente (invio di ether) sulla Rete Principale con i dati generati dalla stessa transazione su un rollup:

| Parametro  | Ethereum (L1)         | Rollup (L2)  |
| ---------- | --------------------- | ------------ |
| Nonce      | ~3                    | 0            |
| Gasprice   | ~8                    | 0-0.5        |
| Gas        | 3                     | 0-0.5        |
| A          | 21                    | 4            |
| Valore     | 9                     | ~3           |
| Firma      | ~68 (2 + 33 + 33)     | ~0.5         |
| Da         | 0 (recuperato da sig) | 4            |
| **Totale** | **~112 byte**         | **~12 byte** |

Fare qualche calcolo approssimativo su queste cifre può aiutare a mostrare i miglioramenti della scalabilità derivati da un rollup ottimistico:

1. Le dimensioni obiettivo per ogni blocco sono di 15 milioni di gas e, verificare un byte di dati, costa 16 gas. Dividere la dimensione media del blocco per 16 gas (15.000.000/16), mostra che il blocco medio può contenere **937.500 byte di dati**.
2. Se una transazione del rollup di base usa 12 byte, allora il blocco medio di Ethereum può elaborare **78.125 transazioni di rollup** (937.500/12) o **39 batch di rollup** (se ogni batch contiene una media di 2.000 transazioni).
3. Se un nuovo blocco è prodotto su Ethereum ogni 15 secondi, allora le velocità di elaborazione del rollup ammonterebbero approssimativamente a **5.208 transazioni al secondo**. Ciò avviene dividendo il numero di transazioni di rollup di base che un blocco di Ethereum può contenere (**78.125**) per il tempo medio del blocco (**15 secondi**).

Questa è una stima piuttosto ottimistica, dato che le transazioni del rollup ottimistico non possono verosimilmente comprendere un intero blocco su Ethereum. Tuttavia, può dare un'idea approssimativa di quanti guadagni in termini di scalabilità i rollup ottimistici possono offrire agli utenti di Ethereum (le implementazioni correnti offrono fino a 2.000 TPS).

L'introduzione dello [sharding dei dati](/roadmap/danksharding/) su Ethereum dovrebbe migliorare la scalabilità nei rollup ottimistici. Poiché le transazioni del rollup devono condividere lo spazio del blocco con altre transazioni non del rollup, la loro capacità di elaborazione è limitata dal volume di dati sulla catena principale di Ethereum. Il danksharding aumenterà lo spazio disponibile alle catene L2 per pubblicare i dati per blocco, utilizzando un'archiviazione a "blob" più economica e non permanente, invece di costosi `CALLDATA` permanenti.

### Pro e contro dei rollup ottimistici {#optimistic-rollups-pros-and-cons}

| Pro                                                                                                                                                                                     | Contro                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Offre enormi miglioramenti in termini di scalabilità senza sacrificare la sicurezza o la mancanza di fiducia.                                                                           | Ritardi nella finalità della transazione a causa di potenziali contestazioni di frodi.                                                                                    |
| I dati della transazione sono memorizzati sulla catena del livello 1, migliorando trasparenza, sicurezza, resistenza alla censura e decentralizzazione.                                 | Gli operatori di rollup centralizzati (sequenziatori) possono influenzare l'ordine delle transazioni.                                                                     |
| La prova di frode garantisce la finalità senza fiducia e consente alle minoranze oneste di proteggere la catena.                                                                        | Se non esistessero nodi onesti, un operatore malevolo potrebbe rubare i fondi pubblicando blocchi e impegni di stato non validi.                                          |
| Il calcolo delle prove di frode è aperto al nodo regolare del L2, a differenza delle prove di validità (usate nei rollup ZK), che richiedono hardware speciale.                         | Il modello di sicurezza si basa su almeno un nodo onesto che esegue le transazioni di rollup e invia le prove di frode per contestare le transizioni di stato non valide. |
| I rollup traggono vantaggio dalla "liveness senza fiducia" (chiunque può forzare la catena ad avanzare eseguendo transazioni e pubblicando asserzioni)                                  | Gli utenti devono attendere che scada il periodo di contestazione di una settimana prima di prelevare nuovamente i fondi su Ethereum.                                     |
| I rollup ottimistici si affidano a incentivi cripto-economici ben progettati, per aumentare la sicurezza sulla catena.                                                                  | I rollup devono pubblicare tutti i dati delle transazioni su catena, il che può aumentare i costi.                                                                        |
| La compatibilità con l'EVM e Solidity consente agli sviluppatori di portare i contratti intelligenti nativi di Ethereum ai rollup o di usare strumenti esistenti per creare nuove dapp. |                                                                                                                                                                           |

### Una spiegazione visiva dei rollup ottimistici {#optimistic-video}

Preferisci un approccio visivo all'apprendimento? Guarda Finematics spiegare i rollup ottimistici:

<YouTube id="7pWxCklcNsU" start="263" />

## Ulteriori letture sui rollup ottimistici

- [Come funzionano gli Optimistic Rollup (La guida completa)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Cos'è un rollup della blockchain? Un'introduzione tecnica](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Guida essenziale ad Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Come funziona davvero il rollup di Optimism?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [Approfondimento su OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [What is the Optimistic Virtual Machine?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
