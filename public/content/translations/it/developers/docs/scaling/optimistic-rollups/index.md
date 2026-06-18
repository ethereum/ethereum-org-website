---
title: Rollup ottimistici
description: Un'introduzione ai rollup ottimistici: una soluzione di ridimensionamento utilizzata dalla community di Ethereum.
lang: it
---

I rollup ottimistici sono protocolli di layer 2 (L2) progettati per estendere la capacità transazionale del livello di base di Ethereum. Riducono il calcolo sulla catena principale di [Ethereum](/) elaborando le transazioni offchain, offrendo miglioramenti significativi nelle velocità di elaborazione. A differenza di altre soluzioni di ridimensionamento, come le [sidechain](/developers/docs/scaling/sidechains/), i rollup ottimistici derivano la sicurezza dalla Mainnet pubblicando i risultati delle transazioni onchain, o le [catene Plasma](/developers/docs/scaling/plasma/), che verificano anch'esse le transazioni su Ethereum con prove di frode, ma archiviano i dati delle transazioni altrove.

Poiché il calcolo è la parte lenta e costosa dell'utilizzo di Ethereum, i rollup ottimistici possono offrire miglioramenti della scalabilità fino a 10-100 volte. I rollup ottimistici scrivono anche le transazioni su Ethereum come `calldata` o nei [blob](/roadmap/danksharding/), riducendo i costi del gas per gli utenti.

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso le nostre pagine sul [ridimensionamento di Ethereum](/developers/docs/scaling/) e sul [layer 2](/layer-2/).

## Cos'è un rollup ottimistico? {#what-is-an-optimistic-rollup}

Un rollup ottimistico è un approccio al ridimensionamento di Ethereum che prevede lo spostamento del calcolo e dell'archiviazione dello stato offchain. I rollup ottimistici eseguono le transazioni al di fuori di Ethereum, ma pubblicano i dati delle transazioni sulla Mainnet come `calldata` o nei [blob](/roadmap/danksharding/).

Gli operatori dei rollup ottimistici raggruppano più transazioni offchain in grandi lotti (batch) prima di inviarle a Ethereum. Questo approccio consente di distribuire i costi fissi su più transazioni in ogni lotto, riducendo le commissioni per gli utenti finali. I rollup ottimistici utilizzano anche tecniche di compressione per ridurre la quantità di dati pubblicati su Ethereum.

I rollup ottimistici sono considerati "ottimistici" perché presumono che le transazioni offchain siano valide e non pubblicano prove di validità per i lotti di transazioni pubblicati onchain. Questo separa i rollup ottimistici dai [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups) che pubblicano [prove di validità](/glossary/#validity-proof) crittografiche per le transazioni offchain.

I rollup ottimistici si basano invece su uno schema di prova di frode per rilevare i casi in cui le transazioni non sono calcolate correttamente. Dopo che un lotto di rollup è stato inviato su Ethereum, c'è una finestra temporale (chiamata periodo di contestazione) durante la quale chiunque può contestare i risultati di una transazione di rollup calcolando una [prova di frode](/glossary/#fraud-proof).

Se la prova di frode ha successo, il protocollo di rollup riesegue la/e transazione/i e aggiorna lo stato del rollup di conseguenza. L'altro effetto di una prova di frode riuscita è che il sequencer responsabile dell'inclusione della transazione eseguita in modo errato in un blocco riceve una penalizzazione (slashing).

Se il lotto di rollup rimane incontestato (ovvero, tutte le transazioni sono eseguite correttamente) dopo la scadenza del periodo di contestazione, viene ritenuto valido e accettato su Ethereum. Altri possono continuare a costruire su un blocco di rollup non confermato, ma con un avvertimento: i risultati delle transazioni verranno annullati se basati su una transazione eseguita in modo errato pubblicata in precedenza.

## Come interagiscono i rollup ottimistici con Ethereum? {#optimistic-rollups-and-ethereum}

I rollup ottimistici sono [soluzioni di ridimensionamento offchain](/developers/docs/scaling/#offchain-scaling) costruite per operare al di sopra di Ethereum. Ogni rollup ottimistico è gestito da un insieme di smart contract distribuiti sulla rete Ethereum. I rollup ottimistici elaborano le transazioni al di fuori della catena principale di Ethereum, ma pubblicano le transazioni offchain (in lotti) su un contratto di rollup onchain. Come la blockchain di Ethereum, questo registro delle transazioni è immutabile e forma la "catena del rollup ottimistico".

L'architettura di un rollup ottimistico comprende le seguenti parti:

**Contratti onchain**: L'operazione del rollup ottimistico è controllata da smart contract in esecuzione su Ethereum. Ciò include contratti che archiviano i blocchi del rollup, monitorano gli aggiornamenti di stato sul rollup e tengono traccia dei depositi degli utenti. In questo senso, Ethereum funge da livello di base o "layer 1" per i rollup ottimistici.

**Macchina virtuale (VM) offchain**: Sebbene i contratti che gestiscono il protocollo del rollup ottimistico vengano eseguiti su Ethereum, il protocollo del rollup esegue il calcolo e l'archiviazione dello stato su un'altra macchina virtuale separata dalla [Ethereum Virtual Machine](/developers/docs/evm/). La VM offchain è il luogo in cui risiedono le applicazioni e vengono eseguiti i cambiamenti di stato; funge da livello superiore o "layer 2" per un rollup ottimistico.

Poiché i rollup ottimistici sono progettati per eseguire programmi scritti o compilati per l'EVM, la VM offchain incorpora molte specifiche di progettazione dell'EVM. Inoltre, le prove di frode calcolate onchain consentono alla rete Ethereum di far rispettare la validità dei cambiamenti di stato calcolati nella VM offchain.

I rollup ottimistici sono descritti come 'soluzioni di ridimensionamento ibride' perché, sebbene esistano come protocolli separati, le loro proprietà di sicurezza derivano da Ethereum. Tra le altre cose, Ethereum garantisce la correttezza del calcolo offchain di un rollup e la disponibilità dei dati alla base del calcolo. Ciò rende i rollup ottimistici più sicuri rispetto ai protocolli di ridimensionamento puramente offchain (ad es. le [sidechain](/developers/docs/scaling/sidechains/)) che non si affidano a Ethereum per la sicurezza.

I rollup ottimistici si affidano al protocollo principale di Ethereum per quanto segue:

### Disponibilità dei dati {#data-availability}

Come accennato, i rollup ottimistici pubblicano i dati delle transazioni su Ethereum come `calldata` o [blob](/roadmap/danksharding/). Poiché l'esecuzione della catena del rollup si basa sulle transazioni inviate, chiunque può utilizzare queste informazioni, ancorate al livello di base di Ethereum, per eseguire lo stato del rollup e verificare la correttezza delle transizioni di stato.

La [disponibilità dei dati](/developers/docs/data-availability/) è fondamentale perché senza l'accesso ai dati di stato, gli sfidanti non possono costruire prove di frode per contestare operazioni di rollup non valide. Con Ethereum che fornisce la disponibilità dei dati, il rischio che gli operatori dei rollup la passino liscia con atti dannosi (ad es. l'invio di blocchi non validi) è ridotto.

### Resistenza alla censura {#censorship-resistance}

I rollup ottimistici si affidano a Ethereum anche per la resistenza alla censura. In un rollup ottimistico un'entità centralizzata (l'operatore) è responsabile dell'elaborazione delle transazioni e dell'invio dei blocchi del rollup a Ethereum. Questo ha alcune implicazioni:

- Gli operatori dei rollup possono censurare gli utenti andando completamente offline o rifiutandosi di produrre blocchi che includano determinate transazioni al loro interno.

- Gli operatori dei rollup possono impedire agli utenti di prelevare i fondi depositati nel contratto del rollup trattenendo i dati di stato necessari per le prove di Merkle della proprietà. Trattenere i dati di stato può anche nascondere lo stato del rollup agli utenti e impedire loro di interagire con il rollup.

I rollup ottimistici risolvono questo problema costringendo gli operatori a pubblicare i dati associati agli aggiornamenti di stato su Ethereum. La pubblicazione dei dati del rollup onchain presenta i seguenti vantaggi:

- Se un operatore di rollup ottimistico va offline o smette di produrre lotti di transazioni, un altro nodo può utilizzare i dati disponibili per riprodurre l'ultimo stato del rollup e continuare la produzione di blocchi.

- Gli utenti possono utilizzare i dati delle transazioni per creare prove di Merkle che dimostrino la proprietà dei fondi e prelevare i propri asset dal rollup.

- Gli utenti possono anche inviare le proprie transazioni sul layer 1 (L1) invece che al sequencer, nel qual caso il sequencer deve includere la transazione entro un certo limite di tempo per continuare a produrre blocchi validi.

### Regolamento {#settlement}

Un altro ruolo che Ethereum svolge nel contesto dei rollup ottimistici è quello di livello di regolamento. Un livello di regolamento ancora l'intero ecosistema blockchain, stabilisce la sicurezza e fornisce una definitività oggettiva se si verifica una controversia su un'altra catena (i rollup ottimistici in questo caso) che richiede un arbitrato.

La Mainnet di Ethereum fornisce un hub per i rollup ottimistici per verificare le prove di frode e risolvere le controversie. Inoltre, le transazioni condotte sul rollup sono definitive solo _dopo_ che il blocco del rollup è stato accettato su Ethereum. Una volta che una transazione di rollup è stata confermata sul livello di base di Ethereum, non può essere annullata (tranne nel caso altamente improbabile di una riorganizzazione della catena).

## Come funzionano i rollup ottimistici? {#how-optimistic-rollups-work}

### Esecuzione e aggregazione delle transazioni {#transaction-execution-and-aggregation}

Gli utenti inviano le transazioni agli "operatori", che sono nodi responsabili dell'elaborazione delle transazioni sul rollup ottimistico. Conosciuto anche come "validatore" o "aggregatore", l'operatore aggrega le transazioni, comprime i dati sottostanti e pubblica il blocco su Ethereum.

Sebbene chiunque possa diventare un validatore, i validatori dei rollup ottimistici devono fornire una cauzione prima di produrre blocchi, in modo molto simile a un [sistema Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos/). Questa cauzione può subire lo slashing se il validatore pubblica un blocco non valido o costruisce su un blocco vecchio ma non valido (anche se il suo blocco è valido). In questo modo i rollup ottimistici utilizzano incentivi criptoeconomici per garantire che i validatori agiscano onestamente.

Ci si aspetta che altri validatori sulla catena del rollup ottimistico eseguano le transazioni inviate utilizzando la loro copia dello stato del rollup. Se lo stato finale di un validatore è diverso dallo stato proposto dall'operatore, possono avviare una contestazione e calcolare una prova di frode.

Alcuni rollup ottimistici potrebbero rinunciare a un sistema di validatori permissionless e utilizzare un singolo "sequencer" per eseguire la catena. Come un validatore, il sequencer elabora le transazioni, produce i blocchi del rollup e invia le transazioni del rollup alla catena L1 (Ethereum).

Il sequencer è diverso da un normale operatore di rollup perché ha un maggiore controllo sull'ordinamento delle transazioni. Inoltre, il sequencer ha accesso prioritario alla catena del rollup ed è l'unica entità autorizzata a inviare transazioni al contratto onchain. Le transazioni provenienti da nodi non sequencer o da utenti normali vengono semplicemente messe in coda in una casella di posta separata finché il sequencer non le include in un nuovo lotto.

#### Invio dei blocchi del rollup a Ethereum {#submitting-blocks-to-ethereum}

Come accennato, l'operatore di un rollup ottimistico raggruppa le transazioni offchain in un lotto e lo invia a Ethereum per l'autenticazione. Questo processo prevede la compressione dei dati relativi alle transazioni e la loro pubblicazione su Ethereum come `calldata` o nei blob.

`calldata` è un'area non modificabile e non persistente in uno smart contract che si comporta per lo più come la [memoria](/developers/docs/smart-contracts/anatomy/#memory). Sebbene `calldata` persista onchain come parte dei [log storici](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) della blockchain, non viene archiviato come parte dello stato di Ethereum. Poiché `calldata` non tocca alcuna parte dello stato di Ethereum, è più economico dello stato per l'archiviazione dei dati onchain.

La parola chiave `calldata` viene utilizzata anche in Solidity per passare argomenti a una funzione di uno smart contract in fase di esecuzione. `calldata` identifica la funzione chiamata durante una transazione e contiene gli input per la funzione sotto forma di una sequenza arbitraria di byte.

Nel contesto dei rollup ottimistici, `calldata` viene utilizzato per inviare i dati compressi delle transazioni al contratto onchain. L'operatore del rollup aggiunge un nuovo lotto chiamando la funzione richiesta nel contratto del rollup e passando i dati compressi come argomenti della funzione. L'utilizzo di `calldata` riduce le commissioni per gli utenti poiché la maggior parte dei costi sostenuti dai rollup deriva dall'archiviazione dei dati onchain.

Ecco [un esempio](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) di invio di un lotto di rollup per mostrare come funziona questo concetto. Il sequencer ha invocato il metodo `appendSequencerBatch()` e ha passato i dati compressi della transazione come input utilizzando `calldata`.

Alcuni rollup ora utilizzano i blob per pubblicare lotti di transazioni su Ethereum.

I blob non sono modificabili e non sono persistenti (proprio come `calldata`) ma vengono eliminati dalla cronologia dopo circa 18 giorni. Per ulteriori informazioni sui blob, consulta il [danksharding](/roadmap/danksharding).

### Impegni di stato {#state-commitments}

In qualsiasi momento, lo stato del rollup ottimistico (account, saldi, codice del contratto, ecc.) è organizzato come un [albero di Merkle](/whitepaper/#merkle-trees) chiamato "albero di stato". La radice di questo albero di Merkle (radice di stato), che fa riferimento all'ultimo stato del rollup, viene sottoposta a hash e archiviata nel contratto del rollup. Ogni transizione di stato sulla catena produce un nuovo stato del rollup, a cui un operatore si impegna calcolando una nuova radice di stato.

L'operatore è tenuto a inviare sia le vecchie radici di stato che le nuove radici di stato quando pubblica i lotti. Se la vecchia radice di stato corrisponde alla radice di stato esistente nel contratto onchain, quest'ultima viene scartata e sostituita con la nuova radice di stato.

L'operatore del rollup è inoltre tenuto a confermare una radice di Merkle per il lotto di transazioni stesso. Ciò consente a chiunque di dimostrare l'inclusione di una transazione nel lotto (su L1) presentando una [prova di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Gli impegni di stato, in particolare le radici di stato, sono necessari per dimostrare la correttezza dei cambiamenti di stato in un rollup ottimistico. Il contratto del rollup accetta nuove radici di stato dagli operatori immediatamente dopo la loro pubblicazione, ma può in seguito eliminare le radici di stato non valide per ripristinare il rollup al suo stato corretto.

### Prova di frode {#fraud-proving}

Come spiegato, i rollup ottimistici consentono a chiunque di pubblicare blocchi senza fornire prove di validità. Tuttavia, per garantire che la catena rimanga sicura, i rollup ottimistici specificano una finestra temporale durante la quale chiunque può contestare una transizione di stato. Pertanto, i blocchi del rollup sono chiamati "asserzioni" poiché chiunque può contestarne la validità.

Se qualcuno contesta un'asserzione, il protocollo del rollup avvierà il calcolo della prova di frode. Ogni tipo di prova di frode è interattivo: qualcuno deve pubblicare un'asserzione prima che un'altra persona possa contestarla. La differenza sta nel numero di round di interazione necessari per calcolare la prova di frode.

Gli schemi di prova interattiva a round singolo riproducono le transazioni contestate su L1 per rilevare asserzioni non valide. Il protocollo del rollup emula la riesecuzione della transazione contestata su L1 (Ethereum) utilizzando un contratto verificatore, con la radice di stato calcolata che determina chi vince la sfida. Se l'affermazione dello sfidante sul corretto stato del rollup è corretta, l'operatore viene penalizzato subendo lo slashing della propria cauzione.

Tuttavia, la riesecuzione delle transazioni su L1 per rilevare le frodi richiede la pubblicazione degli impegni di stato per le singole transazioni e aumenta i dati che i rollup devono pubblicare onchain. La riproduzione delle transazioni comporta inoltre costi del gas significativi. Per questi motivi, i rollup ottimistici stanno passando alla prova interattiva multi-round, che raggiunge lo stesso obiettivo (ovvero, rilevare operazioni di rollup non valide) con maggiore efficienza.

#### Prova interattiva multi-round {#multi-round-interactive-proving}

La prova interattiva multi-round prevede un protocollo di botta e risposta tra l'asseritore e lo sfidante supervisionato da un contratto verificatore L1, che alla fine decide quale sia la parte che mente. Dopo che un nodo L2 contesta un'asserzione, all'asseritore viene richiesto di dividere l'asserzione contestata in due metà uguali. Ogni singola asserzione in questo caso conterrà tanti passaggi di calcolo quanti l'altra.

Lo sfidante sceglierà quindi quale asserzione vuole contestare. Il processo di divisione (chiamato "protocollo di bisezione") continua finché entrambe le parti non contestano un'asserzione su un _singolo_ passaggio di esecuzione. A questo punto, il contratto L1 risolverà la controversia valutando l'istruzione (e il suo risultato) per individuare la parte fraudolenta.

All'asseritore viene richiesto di fornire una "prova in un solo passaggio" che verifichi la validità del calcolo a passaggio singolo contestato. Se l'asseritore non riesce a fornire la prova in un solo passaggio, o il verificatore L1 ritiene la prova non valida, perde la sfida.

Alcune note su questo tipo di prova di frode:

1. La prova di frode interattiva multi-round è considerata efficiente perché riduce al minimo il lavoro che la catena L1 deve svolgere nell'arbitrato delle controversie. Invece di riprodurre l'intera transazione, la catena L1 deve rieseguire solo un passaggio nell'esecuzione del rollup.

2. I protocolli di bisezione riducono la quantità di dati pubblicati onchain (non è necessario pubblicare gli impegni di stato per ogni transazione). Inoltre, le transazioni dei rollup ottimistici non sono vincolate dal limite di gas di Ethereum. Al contrario, i rollup ottimistici che rieseguono le transazioni devono assicurarsi che una transazione L2 abbia un limite di gas inferiore per emularne l'esecuzione all'interno di una singola transazione Ethereum.

3. Parte della cauzione dell'asseritore malintenzionato viene assegnata allo sfidante, mentre l'altra parte viene bruciata. Il bruciare previene la collusione tra i validatori; se due validatori colludono per avviare sfide fasulle, perderanno comunque una parte considerevole dell'intero stake.

4. La prova interattiva multi-round richiede che entrambe le parti (l'asseritore e lo sfidante) facciano le loro mosse entro la finestra temporale specificata. La mancata azione prima della scadenza del termine fa sì che la parte inadempiente perda la sfida.

#### Perché le prove di frode sono importanti per i rollup ottimistici {#fraud-proof-benefits}

Le prove di frode sono importanti perché facilitano la _definitività trustless_ nei rollup ottimistici. La definitività trustless è una qualità dei rollup ottimistici che garantisce che una transazione, a patto che sia valida, verrà alla fine confermata.

I nodi malintenzionati possono cercare di ritardare la conferma di un blocco di rollup valido avviando false sfide. Tuttavia, le prove di frode alla fine dimostreranno la validità del blocco del rollup e ne causeranno la conferma.

Questo si ricollega anche a un'altra proprietà di sicurezza dei rollup ottimistici: la validità della catena si basa sull'esistenza di _un_ nodo onesto. Il nodo onesto può far avanzare correttamente la catena pubblicando asserzioni valide o contestando asserzioni non valide. In ogni caso, i nodi malintenzionati che entrano in controversia con il nodo onesto perderanno i loro stake durante il processo di prova di frode.

### Interoperabilità L1/L2 {#l1-l2-interoperability}

I rollup ottimistici sono progettati per l'interoperabilità con la Mainnet di Ethereum e consentono agli utenti di passare messaggi e dati arbitrari tra L1 e L2. Sono anche compatibili con l'EVM, quindi puoi portare le [applicazioni decentralizzate (dapp)](/developers/docs/dapps/) esistenti sui rollup ottimistici o creare nuove dapp utilizzando gli strumenti di sviluppo di Ethereum.

#### 1. Movimento degli asset {#asset-movement}

##### Entrare nel rollup {#evm-compatibility}

Per utilizzare un rollup ottimistico, gli utenti depositano ETH, token ERC-20 e altri asset accettati nel contratto [ponte](/developers/docs/bridges/) del rollup su L1. Il contratto ponte trasmetterà la transazione a L2, dove una quantità equivalente di asset viene coniata e inviata all'indirizzo scelto dall'utente sul rollup ottimistico.

Le transazioni generate dagli utenti (come un deposito L1 > L2) vengono solitamente messe in coda finché il sequencer non le invia nuovamente al contratto del rollup. Tuttavia, per preservare la resistenza alla censura, i rollup ottimistici consentono agli utenti di inviare una transazione direttamente al contratto del rollup onchain se è stata ritardata oltre il tempo massimo consentito.

Alcuni rollup ottimistici adottano un approccio più diretto per impedire ai sequencer di censurare gli utenti. Qui, un blocco è definito da tutte le transazioni inviate al contratto L1 dal blocco precedente (ad es. i depositi) in aggiunta alle transazioni elaborate sulla catena del rollup. Se un sequencer ignora una transazione L1, pubblicherà la radice di stato (dimostrabilmente) sbagliata; pertanto, i sequencer non possono ritardare i messaggi generati dagli utenti una volta pubblicati su L1.

##### Uscire dal rollup {#cross-chain-contract-calls}

Il prelievo da un rollup ottimistico a Ethereum è più difficile a causa dello schema di prova di frode. Se un utente avvia una transazione L2 > L1 per prelevare fondi depositati in garanzia su L1, deve attendere fino alla scadenza del periodo di contestazione, che dura circa sette giorni. Tuttavia, il processo di prelievo in sé è abbastanza semplice.

Dopo che la richiesta di prelievo è stata avviata sul rollup L2, la transazione viene inclusa nel lotto successivo, mentre gli asset dell'utente sul rollup vengono bruciati. Una volta che il lotto è stato pubblicato su Ethereum, l'utente può calcolare una prova di Merkle che verifichi l'inclusione della sua transazione di uscita nel blocco. Quindi si tratta di attendere il periodo di ritardo per finalizzare la transazione su L1 e prelevare i fondi sulla Mainnet.

Per evitare di aspettare una settimana prima di prelevare fondi su Ethereum, gli utenti dei rollup ottimistici possono impiegare un **fornitore di liquidità** (LP). Un fornitore di liquidità assume la proprietà di un prelievo L2 in sospeso e paga l'utente su L1 (in cambio di una commissione).

I fornitori di liquidità possono verificare la validità della richiesta di prelievo dell'utente (eseguendo loro stessi la catena) prima di rilasciare i fondi. In questo modo hanno la garanzia che la transazione verrà alla fine confermata (ovvero, definitività trustless).

#### 2. Compatibilità con l'EVM {#how-do-optimistic-rollup-fees-work}

Per gli sviluppatori, il vantaggio dei rollup ottimistici è la loro compatibilità, o meglio ancora, equivalenza, con la [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). I rollup compatibili con l'EVM sono conformi alle specifiche dello [yellow paper di Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) e supportano l'EVM a livello di bytecode.

La compatibilità con l'EVM nei rollup ottimistici presenta i seguenti vantaggi:

i. Gli sviluppatori possono migrare gli smart contract esistenti su Ethereum verso le catene dei rollup ottimistici senza dover modificare ampiamente le basi di codice. Ciò può far risparmiare tempo ai team di sviluppo durante la distribuzione degli smart contract di Ethereum su L2.

ii. Gli sviluppatori e i team di progetto che utilizzano i rollup ottimistici possono trarre vantaggio dall'infrastruttura di Ethereum. Ciò include linguaggi di programmazione, librerie di codice, strumenti di test, software client, infrastruttura di distribuzione e così via.

L'utilizzo degli strumenti esistenti è importante perché questi strumenti sono stati ampiamente controllati, sottoposti a debug e migliorati nel corso degli anni. Elimina inoltre la necessità per gli sviluppatori di Ethereum di imparare a costruire con uno stack di sviluppo completamente nuovo.

#### 3. Chiamate di contratto cross-chain {#scaling-ethereum-with-optimistic-rollups}

Gli utenti (account di proprietà esterna) interagiscono con i contratti L2 inviando una transazione al contratto del rollup o facendolo fare a un sequencer o a un validatore per loro conto. I rollup ottimistici consentono inoltre agli account di contratto su Ethereum di interagire con i contratti L2 utilizzando contratti ponte per trasmettere messaggi e passare dati tra L1 e L2. Ciò significa che puoi programmare un contratto L1 sulla Mainnet di Ethereum per invocare funzioni appartenenti a contratti su un rollup ottimistico L2.

Le chiamate di contratto cross-chain avvengono in modo asincrono, il che significa che la chiamata viene prima avviata e poi eseguita in un secondo momento. Questo è diverso dalle chiamate tra due contratti su Ethereum, in cui la chiamata produce risultati immediatamente.

Un esempio di chiamata di contratto cross-chain è il deposito di token descritto in precedenza. Un contratto su L1 deposita in garanzia i token dell'utente e invia un messaggio a un contratto L2 associato per coniare una quantità uguale di token sul rollup.

Poiché le chiamate di messaggi cross-chain comportano l'esecuzione del contratto, al mittente è solitamente richiesto di coprire i [costi del gas](/developers/docs/gas/) per il calcolo. È consigliabile impostare un limite di gas elevato per evitare che la transazione fallisca sulla catena di destinazione. Lo scenario del ponte dei token è un buon esempio; se il lato L1 della transazione (il deposito dei token) funziona, ma il lato L2 (il conio di nuovi token) fallisce a causa del gas insufficiente, il deposito diventa irrecuperabile.

Infine, dovremmo notare che le chiamate di messaggi L2 > L1 tra contratti devono tenere conto dei ritardi (le chiamate L1 > L2 vengono in genere eseguite dopo alcuni minuti). Questo perché i messaggi inviati alla Mainnet dal rollup ottimistico non possono essere eseguiti finché non scade la finestra di contestazione.

## Come funzionano le commissioni dei rollup ottimistici? {#optimistic-rollups-pros-and-cons}

I rollup ottimistici utilizzano uno schema di commissioni del gas, molto simile a Ethereum, per indicare quanto pagano gli utenti per transazione. Le commissioni addebitate sui rollup ottimistici dipendono dai seguenti componenti:

1. **Scrittura dello stato**: I rollup ottimistici pubblicano i dati delle transazioni e le intestazioni dei blocchi (costituite dall'hash dell'intestazione del blocco precedente, dalla radice di stato, dalla radice del lotto) su Ethereum come `blob`, o "binary large object". L'[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) ha introdotto una soluzione conveniente per includere i dati onchain. Un `blob` è un nuovo campo di transazione che consente ai rollup di pubblicare i dati compressi delle transizioni di stato su Ethereum L1. A differenza di `calldata`, che rimane permanentemente onchain, i blob hanno vita breve e possono essere eliminati dai client dopo [4096 epoche](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (circa 18 giorni). Utilizzando i blob per pubblicare lotti di transazioni compresse, i rollup ottimistici possono ridurre significativamente il costo di scrittura delle transazioni su L1.

2. **Gas del blob utilizzato**: Le transazioni che trasportano blob impiegano un meccanismo di commissioni dinamico simile a quello introdotto dall'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). La commissione del gas per le transazioni di tipo 3 tiene conto della commissione di base per i blob, che è determinata dalla rete in base alla domanda di spazio per i blob e all'utilizzo dello spazio per i blob della transazione inviata.

3. **Commissioni dell'operatore L2**: Questo è l'importo pagato ai nodi del rollup come compenso per i costi di calcolo sostenuti nell'elaborazione delle transazioni, in modo molto simile alle commissioni del gas su Ethereum. I nodi del rollup addebitano commissioni di transazione inferiori poiché gli L2 hanno capacità di elaborazione più elevate e non devono affrontare le congestioni di rete che costringono i validatori su Ethereum a dare priorità alle transazioni con commissioni più elevate.

I rollup ottimistici applicano diversi meccanismi per ridurre le commissioni per gli utenti, tra cui il batching delle transazioni e la compressione di `calldata` per ridurre i costi di pubblicazione dei dati. Puoi controllare il [tracker delle commissioni L2](https://l2fees.info/) per una panoramica in tempo reale di quanto costa utilizzare i rollup ottimistici basati su Ethereum.

## In che modo i rollup ottimistici scalano Ethereum? {#optimistic-video}

Come spiegato, i rollup ottimistici pubblicano i dati compressi delle transazioni su Ethereum per garantire la disponibilità dei dati. La capacità di comprimere i dati pubblicati onchain è fondamentale per scalare la capacità transazionale su Ethereum con i rollup ottimistici.

La catena principale di Ethereum pone dei limiti alla quantità di dati che i blocchi possono contenere, denominati in unità di gas (la [dimensione media del blocco](/developers/docs/blocks/#block-size) è di 15 milioni di gas). Sebbene ciò limiti la quantità di gas che ogni transazione può utilizzare, significa anche che possiamo aumentare le transazioni elaborate per blocco riducendo i dati relativi alle transazioni, migliorando direttamente la scalabilità.

I rollup ottimistici utilizzano diverse tecniche per ottenere la compressione dei dati delle transazioni e migliorare i tassi di TPS. Ad esempio, questo [articolo](https://vitalik.eth.limo/general/2021/01/05/rollup.html) confronta i dati che una transazione utente di base (l'invio di ether) genera sulla Mainnet rispetto a quanti dati la stessa transazione genera su un rollup:

| Parametro | Ethereum (L1)          | Rollup (L2)   |
| --------- | ---------------------- | ------------- |
| Nonce     | ~3                     | 0             |
| Gasprice  | ~8                     | 0-0.5         |
| Gas       | 3                      | 0-0.5         |
| To        | 21                     | 4             |
| Value     | 9                      | ~3            |
| Firma | ~68 (2 + 33 + 33)      | ~0.5          |
| From      | 0 (recuperato dalla firma) | 4             |
| **Totale** | **~112 byte**         | **~12 byte** |

Fare alcuni calcoli approssimativi su queste cifre può aiutare a mostrare i miglioramenti di scalabilità offerti da un rollup ottimistico:

1. La dimensione target per ogni blocco è di 15 milioni di gas e costa 16 gas verificare un byte di dati. Dividendo la dimensione media del blocco per 16 gas (15.000.000/16) si evince che il blocco medio può contenere **937.500 byte di dati**.
2. Se una transazione di rollup di base utilizza 12 byte, il blocco medio di Ethereum può elaborare **78.125 transazioni di rollup** (937.500/12) o **39 lotti di rollup** (se ogni lotto contiene in media 2.000 transazioni).
3. Se un nuovo blocco viene prodotto su Ethereum ogni 15 secondi, le velocità di elaborazione del rollup ammonterebbero a circa **5.208 transazioni al secondo**. Questo si ottiene dividendo il numero di transazioni di rollup di base che un blocco di Ethereum può contenere (**78.125**) per il tempo di blocco medio (**15 secondi**).

Questa è una stima abbastanza ottimistica, dato che le transazioni dei rollup ottimistici non possono in alcun modo comprendere un intero blocco su Ethereum. Tuttavia, può dare un'idea approssimativa di quanti guadagni di scalabilità i rollup ottimistici possono offrire agli utenti di Ethereum (le implementazioni attuali offrono fino a 2.000 TPS).

Si prevede che l'introduzione del [data sharding](/roadmap/danksharding/) su Ethereum migliorerà la scalabilità nei rollup ottimistici. Poiché le transazioni dei rollup devono condividere lo spazio del blocco con altre transazioni non di rollup, la loro capacità di elaborazione è limitata dalla capacità transazionale dei dati sulla catena principale di Ethereum. Il danksharding aumenterà lo spazio disponibile per le catene L2 per pubblicare dati per blocco, utilizzando l'archiviazione "blob" più economica e non permanente invece della costosa e permanente `CALLDATA`.

### Pro e contro dei rollup ottimistici {#further-reading-on-optimistic-rollups}

| Pro                                                                                                                                                  | Contro                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Offre enormi miglioramenti nella scalabilità senza sacrificare la sicurezza o l'assenza di necessità di fiducia.                                                             | Ritardi nella definitività delle transazioni a causa di potenziali sfide per frode.                                                                                   |
| I dati delle transazioni sono archiviati sulla catena di layer 1, migliorando la trasparenza, la sicurezza, la resistenza alla censura e la decentralizzazione.                       | Gli operatori centralizzati dei rollup (sequencer) possono influenzare l'ordinamento delle transazioni.                                                                       |
| La prova di frode garantisce la definitività trustless e consente alle minoranze oneste di proteggere la catena.                                                         | Se non ci sono nodi onesti, un operatore malintenzionato può rubare fondi pubblicando blocchi e impegni di stato non validi.                                  |
| Il calcolo delle prove di frode è aperto ai normali nodi L2, a differenza delle prove di validità (utilizzate nei rollup ZK) che richiedono hardware speciale.                         | Il modello di sicurezza si basa su almeno un nodo onesto che esegue le transazioni del rollup e invia prove di frode per contestare transizioni di stato non valide. |
| I rollup beneficiano della "liveness trustless" (chiunque può forzare l'avanzamento della catena eseguendo transazioni e pubblicando asserzioni).                    | Gli utenti devono attendere la scadenza del periodo di contestazione di una settimana prima di prelevare i fondi su Ethereum.                                              |
| I rollup ottimistici si basano su incentivi criptoeconomici ben progettati per aumentare la sicurezza sulla catena.                                                 | I rollup devono pubblicare tutti i dati delle transazioni onchain, il che può aumentare i costi.                                                                          |
| La compatibilità con l'EVM e Solidity consente agli sviluppatori di portare gli smart contract nativi di Ethereum sui rollup o di utilizzare gli strumenti esistenti per creare nuove dapp. |

### Una spiegazione visiva dei rollup ottimistici {#tutorials}

Preferisci l'apprendimento visivo? Guarda Finematics che spiega i rollup ottimistici:

<VideoWatch slug="rollups-scaling-strategy" startTime="263" />

## Ulteriori letture sui rollup ottimistici

- [Come funzionano i rollup ottimistici (La guida completa)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Cos'è un rollup blockchain? Un'introduzione tecnica](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [La guida essenziale ad Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [La guida pratica ai rollup di Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Lo stato delle prove di frode negli L2 di Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Come funziona davvero il rollup di Optimism?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Un'analisi approfondita dell'OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Cos'è la Optimistic Virtual Machine?](https://www.alchemy.com/overviews/optimistic-virtual-machine)

## Tutorial: Rollup ottimistici e ponti su Ethereum

- [Panoramica del contratto ponte standard di Optimism](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Una panoramica del codice annotato del ponte standard di Optimism per lo spostamento di asset tra L1 e L2._