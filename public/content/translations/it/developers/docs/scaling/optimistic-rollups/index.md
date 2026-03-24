---
title: Rollup ottimistici
description: "Un'introduzione ai rollup ottimistici, una soluzione di scalabilità utilizzata dalla community di Ethereum."
lang: it
---

I rollup ottimistici sono protocolli di livello 2 (L2) progettati per estendere il throughput del livello di base di Ethereum. Riducono il calcolo sulla catena principale di [Ethereum](/) elaborando le transazioni fuori catena, offrendo miglioramenti significativi nelle velocità di elaborazione. A differenza di altre soluzioni di scalabilità, come le [catene laterali](/developers/docs/scaling/sidechains/), i rollup ottimistici derivano la sicurezza dalla rete principale pubblicando i risultati delle transazioni on-chain, o le [catene plasma](/developers/docs/scaling/plasma/), che verificano anch'esse le transazioni su Ethereum con prove di frode, ma archiviano i dati delle transazioni altrove.

Poiché il calcolo è la parte lenta e costosa dell'utilizzo di Ethereum, i rollup ottimistici possono offrire miglioramenti della scalabilità fino a 10-100 volte. I rollup ottimistici scrivono anche le transazioni su Ethereum come `calldata` o in [blob](/roadmap/danksharding/), riducendo i costi del gas per gli utenti.

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso le nostre pagine sulla [scalabilità di Ethereum](/developers/docs/scaling/) e sul [livello 2](/layer-2/).

## Cos'è un rollup ottimistico? {#what-is-an-optimistic-rollup}

Un rollup ottimistico è un approccio alla scalabilità di Ethereum che prevede lo spostamento del calcolo e dell'archiviazione dello stato fuori catena. I rollup ottimistici eseguono le transazioni al di fuori di Ethereum, ma pubblicano i dati delle transazioni sulla rete principale come `calldata` o in [blob](/roadmap/danksharding/).

Gli operatori dei rollup ottimistici raggruppano più transazioni fuori catena in grandi lotti prima di inviarle a Ethereum. Questo approccio consente di distribuire i costi fissi su più transazioni in ogni lotto, riducendo le commissioni per gli utenti finali. I rollup ottimistici utilizzano anche tecniche di compressione per ridurre la quantità di dati pubblicati su Ethereum.

I rollup ottimistici sono considerati "ottimistici" perché presumono che le transazioni fuori catena siano valide e non pubblicano prove di validità per i lotti di transazioni pubblicati on-chain. Questo separa i rollup ottimistici dai [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups) che pubblicano [prove di validità](/glossary/#validity-proof) crittografiche per le transazioni fuori catena.

I rollup ottimistici si affidano invece a uno schema di prova di frode per rilevare i casi in cui le transazioni non sono calcolate correttamente. Dopo che un lotto di rollup è stato inviato su Ethereum, c'è una finestra temporale (chiamata periodo di contestazione) durante la quale chiunque può contestare i risultati di una transazione di rollup calcolando una [prova di frode](/glossary/#fraud-proof).

Se la prova di frode ha successo, il protocollo del rollup riesegue la transazione (o le transazioni) e aggiorna lo stato del rollup di conseguenza. L'altro effetto di una prova di frode riuscita è che il sequenziatore responsabile dell'inclusione della transazione eseguita in modo errato in un blocco riceve una penalità.

Se il lotto di rollup rimane incontestato (cioè, tutte le transazioni sono eseguite correttamente) dopo la scadenza del periodo di contestazione, viene ritenuto valido e accettato su Ethereum. Altri possono continuare a costruire su un blocco di rollup non confermato, ma con un avvertimento: i risultati delle transazioni saranno annullati se basati su una transazione eseguita in modo errato pubblicata in precedenza.

## Come interagiscono i rollup ottimistici con Ethereum? {#optimistic-rollups-and-Ethereum}

I rollup ottimistici sono [soluzioni di scalabilità fuori catena](/developers/docs/scaling/#offchain-scaling) costruite per operare sopra Ethereum. Ogni rollup ottimistico è gestito da un insieme di contratti intelligenti distribuiti sulla rete Ethereum. I rollup ottimistici elaborano le transazioni fuori dalla catena principale di Ethereum, ma pubblicano le transazioni fuori catena (in lotti) su un contratto di rollup on-chain. Come la blockchain di Ethereum, questo registro delle transazioni è immutabile e forma la "catena del rollup ottimistico".

L'architettura di un rollup ottimistico comprende le seguenti parti:

**Contratti on-chain**: L'operazione del rollup ottimistico è controllata da contratti intelligenti in esecuzione su Ethereum. Questo include contratti che archiviano i blocchi del rollup, monitorano gli aggiornamenti di stato sul rollup e tracciano i depositi degli utenti. In questo senso, Ethereum funge da livello di base o "livello 1" per i rollup ottimistici.

**Macchina virtuale (VM) fuori catena**: Sebbene i contratti che gestiscono il protocollo del rollup ottimistico vengano eseguiti su Ethereum, il protocollo del rollup esegue il calcolo e l'archiviazione dello stato su un'altra macchina virtuale separata dalla [macchina virtuale di Ethereum](/developers/docs/evm/). La VM fuori catena è dove risiedono le applicazioni e vengono eseguiti i cambiamenti di stato; funge da livello superiore o "livello 2" per un rollup ottimistico.

Poiché i rollup ottimistici sono progettati per eseguire programmi scritti o compilati per l'EVM, la VM fuori catena incorpora molte specifiche di progettazione dell'EVM. Inoltre, le prove di frode calcolate on-chain consentono alla rete Ethereum di far rispettare la validità dei cambiamenti di stato calcolati nella VM fuori catena.

I rollup ottimistici sono descritti come "soluzioni di scalabilità ibride" perché, sebbene esistano come protocolli separati, le loro proprietà di sicurezza derivano da Ethereum. Tra le altre cose, Ethereum garantisce la correttezza del calcolo fuori catena di un rollup e la disponibilità dei dati alla base del calcolo. Questo rende i rollup ottimistici più sicuri rispetto ai protocolli di scalabilità puramente fuori catena (ad es., le [catene laterali](/developers/docs/scaling/sidechains/)) che non si affidano a Ethereum per la sicurezza.

I rollup ottimistici si affidano al protocollo principale di Ethereum per quanto segue:

### Disponibilità dei dati {#data-availability}

Come accennato, i rollup ottimistici pubblicano i dati delle transazioni su Ethereum come `calldata` o [blob](/roadmap/danksharding/). Poiché l'esecuzione della catena del rollup si basa sulle transazioni inviate, chiunque può utilizzare queste informazioni, ancorate al livello di base di Ethereum, per eseguire lo stato del rollup e verificare la correttezza delle transizioni di stato.

La [disponibilità dei dati](/developers/docs/data-availability/) è fondamentale perché senza accesso ai dati di stato, gli sfidanti non possono costruire prove di frode per contestare operazioni di rollup non valide. Con Ethereum che fornisce la disponibilità dei dati, il rischio che gli operatori del rollup la passino liscia con atti dannosi (ad es., l'invio di blocchi non validi) è ridotto.

### Resistenza alla censura {#censorship-resistance}

I rollup ottimistici si affidano a Ethereum anche per la resistenza alla censura. In un rollup ottimistico un'entità centralizzata (l'operatore) è responsabile dell'elaborazione delle transazioni e dell'invio dei blocchi del rollup a Ethereum. Questo ha alcune implicazioni:

- Gli operatori del rollup possono censurare gli utenti andando completamente offline, o rifiutandosi di produrre blocchi che includano determinate transazioni al loro interno.

- Gli operatori del rollup possono impedire agli utenti di prelevare i fondi depositati nel contratto del rollup trattenendo i dati di stato necessari per le prove di proprietà di Merkle. Trattenere i dati di stato può anche nascondere lo stato del rollup agli utenti e impedire loro di interagire con il rollup.

I rollup ottimistici risolvono questo problema costringendo gli operatori a pubblicare i dati associati agli aggiornamenti di stato su Ethereum. La pubblicazione dei dati del rollup on-chain ha i seguenti vantaggi:

- Se un operatore di rollup ottimistico va offline o smette di produrre lotti di transazioni, un altro nodo può utilizzare i dati disponibili per riprodurre l'ultimo stato del rollup e continuare la produzione di blocchi.

- Gli utenti possono utilizzare i dati delle transazioni per creare prove di Merkle che dimostrano la proprietà dei fondi e prelevare i propri asset dal rollup.

- Gli utenti possono anche inviare le loro transazioni su L1 invece che al sequenziatore, nel qual caso il sequenziatore deve includere la transazione entro un certo limite di tempo per continuare a produrre blocchi validi.

### Regolamento {#settlement}

Un altro ruolo che Ethereum svolge nel contesto dei rollup ottimistici è quello di livello di regolamento. Un livello di regolamento ancora l'intero ecosistema blockchain, stabilisce la sicurezza e fornisce una finalità oggettiva se si verifica una controversia su un'altra catena (i rollup ottimistici in questo caso) che richiede un arbitrato.

La rete principale di Ethereum fornisce un hub per i rollup ottimistici per verificare le prove di frode e risolvere le controversie. Inoltre, le transazioni condotte sul rollup sono definitive solo _dopo_ che il blocco del rollup è stato accettato su Ethereum. Una volta che una transazione di rollup è impegnata nel livello di base di Ethereum, non può essere annullata (tranne nel caso altamente improbabile di una riorganizzazione della catena).

## Come funzionano i rollup ottimistici? {#how-optimistic-rollups-work}

### Esecuzione e aggregazione delle transazioni {#transaction-execution-and-aggregation}

Gli utenti inviano le transazioni agli "operatori", che sono nodi responsabili dell'elaborazione delle transazioni sul rollup ottimistico. Conosciuto anche come "validatore" o "aggregatore", l'operatore aggrega le transazioni, comprime i dati sottostanti e pubblica il blocco su Ethereum.

Sebbene chiunque possa diventare un validatore, i validatori dei rollup ottimistici devono fornire una cauzione prima di produrre blocchi, in modo molto simile a un [sistema di prova di stake](/developers/docs/consensus-mechanisms/pos/). Questa cauzione può essere punita se il validatore pubblica un blocco non valido o costruisce su un blocco vecchio ma non valido (anche se il suo blocco è valido). In questo modo i rollup ottimistici utilizzano incentivi crittoeconomici per garantire che i validatori agiscano onestamente.

Ci si aspetta che altri validatori sulla catena del rollup ottimistico eseguano le transazioni inviate utilizzando la loro copia dello stato del rollup. Se lo stato finale di un validatore è diverso dallo stato proposto dall'operatore, possono avviare una contestazione e calcolare una prova di frode.

Alcuni rollup ottimistici possono rinunciare a un sistema di validatori senza permessi e utilizzare un singolo "sequenziatore" per eseguire la catena. Come un validatore, il sequenziatore elabora le transazioni, produce i blocchi del rollup e invia le transazioni del rollup alla catena L1 (Ethereum).

Il sequenziatore è diverso da un normale operatore di rollup perché ha un maggiore controllo sull'ordinamento delle transazioni. Inoltre, il sequenziatore ha accesso prioritario alla catena del rollup ed è l'unica entità autorizzata a inviare transazioni al contratto on-chain. Le transazioni provenienti da nodi non sequenziatori o da utenti normali vengono semplicemente messe in coda in una casella di posta separata finché il sequenziatore non le include in un nuovo lotto.

#### Invio dei blocchi del rollup a Ethereum {#submitting-blocks-to-ethereum}

Come accennato, l'operatore di un rollup ottimistico raggruppa le transazioni fuori catena in un lotto e lo invia a Ethereum per l'autenticazione. Questo processo prevede la compressione dei dati relativi alle transazioni e la loro pubblicazione su Ethereum come `calldata` o in blob.

`calldata` è un'area non modificabile e non persistente in un contratto intelligente che si comporta per lo più come la [memoria](/developers/docs/smart-contracts/anatomy/#memory). Sebbene `calldata` persista on-chain come parte dei [registri storici](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) della blockchain, non viene archiviato come parte dello stato di Ethereum. Poiché `calldata` non tocca alcuna parte dello stato di Ethereum, è più economico dello stato per l'archiviazione dei dati on-chain.

La parola chiave `calldata` viene utilizzata anche in Solidity per passare argomenti a una funzione di un contratto intelligente al momento dell'esecuzione. `calldata` identifica la funzione chiamata durante una transazione e contiene gli input per la funzione sotto forma di una sequenza arbitraria di byte.

Nel contesto dei rollup ottimistici, `calldata` viene utilizzato per inviare i dati compressi delle transazioni al contratto on-chain. L'operatore del rollup aggiunge un nuovo lotto chiamando la funzione richiesta nel contratto del rollup e passando i dati compressi come argomenti della funzione. L'utilizzo di `calldata` riduce le commissioni per gli utenti poiché la maggior parte dei costi sostenuti dai rollup deriva dall'archiviazione dei dati on-chain.

Ecco [un esempio](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) di invio di un lotto di rollup per mostrare come funziona questo concetto. Il sequenziatore ha invocato il metodo `appendSequencerBatch()` e ha passato i dati compressi della transazione come input utilizzando `calldata`.

Alcuni rollup ora utilizzano i blob per pubblicare lotti di transazioni su Ethereum.

I blob sono non modificabili e non persistenti (proprio come `calldata`) ma vengono eliminati dalla cronologia dopo circa 18 giorni. Per ulteriori informazioni sui blob, consulta [Danksharding](/roadmap/danksharding).

### Impegni di stato {#state-commitments}

In qualsiasi momento, lo stato del rollup ottimistico (account, saldi, codice del contratto, ecc.) è organizzato come un [albero di Merkle](/whitepaper/#merkle-trees) chiamato "albero di stato". La radice di questo albero di Merkle (radice di stato), che fa riferimento all'ultimo stato del rollup, viene sottoposta a hash e archiviata nel contratto del rollup. Ogni transizione di stato sulla catena produce un nuovo stato del rollup, a cui un operatore si impegna calcolando una nuova radice di stato.

L'operatore è tenuto a inviare sia le vecchie radici di stato che le nuove radici di stato quando pubblica i lotti. Se la vecchia radice di stato corrisponde alla radice di stato esistente nel contratto on-chain, quest'ultima viene scartata e sostituita con la nuova radice di stato.

L'operatore del rollup è inoltre tenuto a impegnare una radice di Merkle per il lotto di transazioni stesso. Questo consente a chiunque di dimostrare l'inclusione di una transazione nel lotto (su L1) presentando una [prova di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Gli impegni di stato, in particolare le radici di stato, sono necessari per dimostrare la correttezza dei cambiamenti di stato in un rollup ottimistico. Il contratto del rollup accetta nuove radici di stato dagli operatori immediatamente dopo la loro pubblicazione, ma può in seguito eliminare le radici di stato non valide per ripristinare il rollup al suo stato corretto.

### Prova di frode {#fraud-proving}

Come spiegato, i rollup ottimistici consentono a chiunque di pubblicare blocchi senza fornire prove di validità. Tuttavia, per garantire che la catena rimanga sicura, i rollup ottimistici specificano una finestra temporale durante la quale chiunque può contestare una transizione di stato. Pertanto, i blocchi del rollup sono chiamati "asserzioni" poiché chiunque può contestarne la validità.

Se qualcuno contesta un'asserzione, il protocollo del rollup avvierà il calcolo della prova di frode. Ogni tipo di prova di frode è interattivo: qualcuno deve pubblicare un'asserzione prima che un'altra persona possa contestarla. La differenza sta nel numero di round di interazione necessari per calcolare la prova di frode.

Gli schemi di prova interattiva a round singolo riproducono le transazioni contestate su L1 per rilevare asserzioni non valide. Il protocollo del rollup emula la riesecuzione della transazione contestata su L1 (Ethereum) utilizzando un contratto verificatore, con la radice di stato calcolata che determina chi vince la sfida. Se l'affermazione dello sfidante sullo stato corretto del rollup è corretta, l'operatore viene penalizzato vedendo la propria cauzione punita.

Tuttavia, la riesecuzione delle transazioni su L1 per rilevare le frodi richiede la pubblicazione di impegni di stato per le singole transazioni e aumenta i dati che i rollup devono pubblicare on-chain. La riproduzione delle transazioni comporta anche costi del gas significativi. Per questi motivi, i rollup ottimistici stanno passando alla prova interattiva multi-round, che raggiunge lo stesso obiettivo (cioè, rilevare operazioni di rollup non valide) con maggiore efficienza.

#### Prova interattiva multi-round {#multi-round-interactive-proving}

La prova interattiva multi-round prevede un protocollo di botta e risposta tra l'asseritore e lo sfidante supervisionato da un contratto verificatore L1, che alla fine decide quale sia la parte che mente. Dopo che un nodo L2 contesta un'asserzione, l'asseritore è tenuto a dividere l'asserzione contestata in due metà uguali. Ogni singola asserzione in questo caso conterrà tanti passaggi di calcolo quanti l'altra.

Lo sfidante sceglierà quindi quale asserzione vuole contestare. Il processo di divisione (chiamato "protocollo di bisezione") continua finché entrambe le parti non contestano un'asserzione su un _singolo_ passaggio di esecuzione. A questo punto, il contratto L1 risolverà la controversia valutando l'istruzione (e il suo risultato) per catturare la parte fraudolenta.

L'asseritore è tenuto a fornire una "prova a un passaggio" che verifichi la validità del calcolo a singolo passaggio contestato. Se l'asseritore non riesce a fornire la prova a un passaggio, o il verificatore L1 ritiene la prova non valida, perde la sfida.

Alcune note su questo tipo di prova di frode:

1. La prova di frode interattiva multi-round è considerata efficiente perché riduce al minimo il lavoro che la catena L1 deve svolgere nell'arbitrato delle controversie. Invece di riprodurre l'intera transazione, la catena L1 deve solo rieseguire un passaggio nell'esecuzione del rollup.

2. I protocolli di bisezione riducono la quantità di dati pubblicati on-chain (non è necessario pubblicare impegni di stato per ogni transazione). Inoltre, le transazioni dei rollup ottimistici non sono vincolate dal limite del gas di Ethereum. Al contrario, i rollup ottimistici che rieseguono le transazioni devono assicurarsi che una transazione L2 abbia un limite del gas inferiore per emulare la sua esecuzione all'interno di una singola transazione di Ethereum.

3. Parte della cauzione dell'asseritore malintenzionato viene assegnata allo sfidante, mentre l'altra parte viene bruciata. La bruciatura previene la collusione tra i validatori; se due validatori colludono per avviare sfide fasulle, perderanno comunque una parte considerevole dell'intero stake.

4. La prova interattiva multi-round richiede che entrambe le parti (l'asseritore e lo sfidante) facciano le loro mosse entro la finestra temporale specificata. La mancata azione prima della scadenza del termine fa sì che la parte inadempiente perda la sfida.

#### Perché le prove di frode sono importanti per i rollup ottimistici {#fraud-proof-benefits}

Le prove di frode sono importanti perché facilitano la _finalità senza fiducia_ nei rollup ottimistici. La finalità senza fiducia è una qualità dei rollup ottimistici che garantisce che una transazione, purché sia valida, verrà alla fine confermata.

I nodi malintenzionati possono cercare di ritardare la conferma di un blocco di rollup valido avviando false sfide. Tuttavia, le prove di frode alla fine dimostreranno la validità del blocco del rollup e ne causeranno la conferma.

Questo si collega anche a un'altra proprietà di sicurezza dei rollup ottimistici: la validità della catena si basa sull'esistenza di _un_ nodo onesto. Il nodo onesto può far avanzare correttamente la catena pubblicando asserzioni valide o contestando asserzioni non valide. In ogni caso, i nodi malintenzionati che entrano in controversia con il nodo onesto perderanno i loro stake durante il processo di prova di frode.

### Interoperabilità L1/L2 {#l1-l2-interoperability}

I rollup ottimistici sono progettati per l'interoperabilità con la rete principale di Ethereum e consentono agli utenti di passare messaggi e dati arbitrari tra L1 e L2. Sono anche compatibili con l'EVM, quindi puoi portare le [dApp](/developers/docs/dapps/) esistenti sui rollup ottimistici o creare nuove dApp utilizzando gli strumenti di sviluppo di Ethereum.

#### 1. Movimento degli asset {#asset-movement}

##### Entrare nel rollup

Per utilizzare un rollup ottimistico, gli utenti depositano ETH, token ERC-20 e altri asset accettati nel contratto [ponte](/developers/docs/bridges/) del rollup su L1. Il contratto ponte trasmetterà la transazione a L2, dove una quantità equivalente di asset viene coniata e inviata all'indirizzo scelto dall'utente sul rollup ottimistico.

Le transazioni generate dagli utenti (come un deposito L1 > L2) vengono solitamente messe in coda finché il sequenziatore non le invia nuovamente al contratto del rollup. Tuttavia, per preservare la resistenza alla censura, i rollup ottimistici consentono agli utenti di inviare una transazione direttamente al contratto del rollup on-chain se è stata ritardata oltre il tempo massimo consentito.

Alcuni rollup ottimistici adottano un approccio più diretto per impedire ai sequenziatori di censurare gli utenti. Qui, un blocco è definito da tutte le transazioni inviate al contratto L1 dal blocco precedente (ad es., i depositi) in aggiunta alle transazioni elaborate sulla catena del rollup. Se un sequenziatore ignora una transazione L1, pubblicherà la radice di stato (dimostrabilmente) sbagliata; pertanto, i sequenziatori non possono ritardare i messaggi generati dagli utenti una volta pubblicati su L1.

##### Uscire dal rollup

Prelevare da un rollup ottimistico a Ethereum è più difficile a causa dello schema di prova di frode. Se un utente avvia una transazione L2 > L1 per prelevare fondi depositati in garanzia su L1, deve attendere che trascorra il periodo di contestazione, che dura circa sette giorni. Tuttavia, il processo di prelievo in sé è abbastanza semplice.

Dopo che la richiesta di prelievo è stata avviata sul rollup L2, la transazione viene inclusa nel lotto successivo, mentre gli asset dell'utente sul rollup vengono bruciati. Una volta che il lotto è pubblicato su Ethereum, l'utente può calcolare una prova di Merkle che verifica l'inclusione della sua transazione di uscita nel blocco. Quindi si tratta di attendere il periodo di ritardo per finalizzare la transazione su L1 e prelevare i fondi sulla rete principale.

Per evitare di aspettare una settimana prima di prelevare fondi su Ethereum, gli utenti dei rollup ottimistici possono impiegare un **fornitore di liquidità** (LP). Un fornitore di liquidità assume la proprietà di un prelievo L2 in sospeso e paga l'utente su L1 (in cambio di una commissione).

I fornitori di liquidità possono verificare la validità della richiesta di prelievo dell'utente (eseguendo loro stessi la catena) prima di rilasciare i fondi. In questo modo hanno la garanzia che la transazione verrà alla fine confermata (cioè, finalità senza fiducia).

#### 2. Compatibilità con l'EVM {#evm-compatibility}

Per gli sviluppatori, il vantaggio dei rollup ottimistici è la loro compatibilità, o meglio ancora, equivalenza, con la [macchina virtuale di Ethereum (EVM)](/developers/docs/evm/). I rollup compatibili con l'EVM sono conformi alle specifiche dell'[Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) e supportano l'EVM a livello di bytecode.

La compatibilità con l'EVM nei rollup ottimistici ha i seguenti vantaggi:

i. Gli sviluppatori possono migrare i contratti intelligenti esistenti su Ethereum verso le catene dei rollup ottimistici senza dover modificare ampiamente le basi di codice. Questo può far risparmiare tempo ai team di sviluppo durante la distribuzione di contratti intelligenti di Ethereum su L2.

ii. Gli sviluppatori e i team di progetto che utilizzano i rollup ottimistici possono trarre vantaggio dall'infrastruttura di Ethereum. Questo include linguaggi di programmazione, librerie di codice, strumenti di test, software client, infrastruttura di distribuzione e così via.

L'utilizzo degli strumenti esistenti è importante perché questi strumenti sono stati ampiamente controllati, sottoposti a debug e migliorati nel corso degli anni. Rimuove anche la necessità per gli sviluppatori di Ethereum di imparare a costruire con uno stack di sviluppo completamente nuovo.

#### 3. Chiamate di contratto cross-chain {#cross-chain-contract-calls}

Gli utenti (account controllati esternamente) interagiscono con i contratti L2 inviando una transazione al contratto del rollup o facendolo fare a un sequenziatore o a un validatore per loro. I rollup ottimistici consentono anche agli account di contratto su Ethereum di interagire con i contratti L2 utilizzando contratti ponte per trasmettere messaggi e passare dati tra L1 e L2. Questo significa che puoi programmare un contratto L1 sulla rete principale di Ethereum per invocare funzioni appartenenti a contratti su un rollup ottimistico L2.

Le chiamate di contratto cross-chain avvengono in modo asincrono, il che significa che la chiamata viene prima avviata e poi eseguita in un secondo momento. Questo è diverso dalle chiamate tra due contratti su Ethereum, dove la chiamata produce risultati immediatamente.

Un esempio di chiamata di contratto cross-chain è il deposito di token descritto in precedenza. Un contratto su L1 deposita in garanzia i token dell'utente e invia un messaggio a un contratto L2 accoppiato per coniare una quantità uguale di token sul rollup.

Poiché le chiamate di messaggi cross-chain comportano l'esecuzione del contratto, al mittente è solitamente richiesto di coprire i [costi del gas](/developers/docs/gas/) per il calcolo. È consigliabile impostare un limite del gas elevato per evitare che la transazione fallisca sulla catena di destinazione. Lo scenario del ponte dei token è un buon esempio; se il lato L1 della transazione (il deposito dei token) funziona, ma il lato L2 (la coniazione di nuovi token) fallisce a causa del gas insufficiente, il deposito diventa irrecuperabile.

Infine, dovremmo notare che le chiamate di messaggi L2 > L1 tra contratti devono tenere conto dei ritardi (le chiamate L1 > L2 vengono in genere eseguite dopo alcuni minuti). Questo perché i messaggi inviati alla rete principale dal rollup ottimistico non possono essere eseguiti finché non scade la finestra di contestazione.

## Come funzionano le commissioni dei rollup ottimistici? {#how-do-optimistic-rollup-fees-work}

I rollup ottimistici utilizzano uno schema di commissioni del gas, molto simile a Ethereum, per indicare quanto pagano gli utenti per transazione. Le commissioni addebitate sui rollup ottimistici dipendono dai seguenti componenti:

1. **Scrittura dello stato**: I rollup ottimistici pubblicano i dati delle transazioni e le intestazioni dei blocchi (costituiti dall'hash dell'intestazione del blocco precedente, dalla radice di stato, dalla radice del lotto) su Ethereum come `blob`, o "binary large object". L'[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) ha introdotto una soluzione economica per includere i dati on-chain. Un `blob` è un nuovo campo di transazione che consente ai rollup di pubblicare dati compressi di transizione di stato su Ethereum L1. A differenza di `calldata`, che rimane permanentemente on-chain, i blob hanno vita breve e possono essere eliminati dai client dopo [4096 epoche](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (circa 18 giorni). Utilizzando i blob per pubblicare lotti di transazioni compresse, i rollup ottimistici possono ridurre significativamente il costo di scrittura delle transazioni su L1.

2. **Gas del blob utilizzato**: Le transazioni che trasportano blob impiegano un meccanismo di commissione dinamica simile a quello introdotto dall'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). La commissione per le transazioni di tipo 3 tiene conto della commissione di base per i blob, che è determinata dalla rete in base alla domanda di spazio per i blob e all'utilizzo dello spazio per i blob della transazione inviata.

3. **Commissioni dell'operatore L2**: Questo è l'importo pagato ai nodi del rollup come compenso per i costi di calcolo sostenuti nell'elaborazione delle transazioni, in modo molto simile alle commissioni su Ethereum. I nodi del rollup addebitano commissioni della transazione inferiori poiché gli L2 hanno capacità di elaborazione più elevate e non devono affrontare le congestioni di rete che costringono i validatori su Ethereum a dare priorità alle transazioni con commissioni più elevate.

I rollup ottimistici applicano diversi meccanismi per ridurre le commissioni per gli utenti, tra cui il raggruppamento delle transazioni e la compressione di `calldata` per ridurre i costi di pubblicazione dei dati. Puoi controllare il [tracker delle commissioni L2](https://l2fees.info/) per una panoramica in tempo reale di quanto costa utilizzare i rollup ottimistici basati su Ethereum.

## In che modo i rollup ottimistici scalano Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Come spiegato, i rollup ottimistici pubblicano dati compressi delle transazioni su Ethereum per garantire la disponibilità dei dati. La capacità di comprimere i dati pubblicati on-chain è fondamentale per scalare il throughput su Ethereum con i rollup ottimistici.

La catena principale di Ethereum pone dei limiti alla quantità di dati che i blocchi possono contenere, denominati in unità di gas (la [dimensione media del blocco](/developers/docs/blocks/#block-size) è di 15 milioni di gas). Sebbene questo limiti la quantità di gas che ogni transazione può utilizzare, significa anche che possiamo aumentare le transazioni elaborate per blocco riducendo i dati relativi alle transazioni, migliorando direttamente la scalabilità.

I rollup ottimistici utilizzano diverse tecniche per ottenere la compressione dei dati delle transazioni e migliorare i tassi di TPS. Ad esempio, questo [articolo](https://vitalik.eth.limo/general/2021/01/05/rollup.html) confronta i dati che una transazione utente di base (l'invio di ether) genera sulla rete principale rispetto a quanti dati la stessa transazione genera su un rollup:

| Parametro | Ethereum (L1)          | Rollup (L2)   |
| --------- | ---------------------- | ------------- |
| Nonce     | ~3                     | 0             |
| Gasprice  | ~8                     | 0-0.5         |
| Gas       | 3                      | 0-0.5         |
| To        | 21                     | 4             |
| Value     | 9                      | ~3            |
| Signature | ~68 (2 + 33 + 33)      | ~0.5          |
| From      | 0 (recuperato dalla firma) | 4             |
| **Totale** | **\~112 byte**         | **\~12 byte** |

Fare alcuni calcoli approssimativi su queste cifre può aiutare a mostrare i miglioramenti di scalabilità offerti da un rollup ottimistico:

1. La dimensione target per ogni blocco è di 15 milioni di gas e costa 16 gas verificare un byte di dati. Dividendo la dimensione media del blocco per 16 gas (15.000.000/16) si evince che il blocco medio può contenere **937.500 byte di dati**.
2. Se una transazione di rollup di base utilizza 12 byte, il blocco medio di Ethereum può elaborare **78.125 transazioni di rollup** (937.500/12) o **39 lotti di rollup** (se ogni lotto contiene in media 2.000 transazioni).
3. Se un nuovo blocco viene prodotto su Ethereum ogni 15 secondi, le velocità di elaborazione del rollup ammonterebbero a circa **5.208 transazioni al secondo**. Questo si ottiene dividendo il numero di transazioni di rollup di base che un blocco di Ethereum può contenere (**78.125**) per il tempo medio del blocco (**15 secondi**).

Questa è una stima abbastanza ottimistica, dato che le transazioni dei rollup ottimistici non possono in alcun modo comprendere un intero blocco su Ethereum. Tuttavia, può dare un'idea approssimativa di quanti guadagni in termini di scalabilità i rollup ottimistici possono offrire agli utenti di Ethereum (le implementazioni attuali offrono fino a 2.000 TPS).

L'introduzione della [frammentazione dei dati](/roadmap/danksharding/) su Ethereum dovrebbe migliorare la scalabilità nei rollup ottimistici. Poiché le transazioni dei rollup devono condividere lo spazio del blocco con altre transazioni non di rollup, la loro capacità di elaborazione è limitata dal throughput dei dati sulla catena principale di Ethereum. Il Danksharding aumenterà lo spazio disponibile per le catene L2 per pubblicare dati per blocco, utilizzando l'archiviazione "blob" più economica e non permanente invece del costoso e permanente `CALLDATA`.

### Pro e contro dei rollup ottimistici {#optimistic-rollups-pros-and-cons}

| Pro | Contro |
| --- | --- |
| Offre enormi miglioramenti nella scalabilità senza sacrificare la sicurezza o l'assenza di fiducia. | Ritardi nella finalità della transazione a causa di potenziali sfide di frode. |
| I dati delle transazioni sono archiviati sulla catena di livello 1, migliorando la trasparenza, la sicurezza, la resistenza alla censura e la decentralizzazione. | Gli operatori centralizzati del rollup (sequenziatori) possono influenzare l'ordinamento delle transazioni. |
| La prova di frode garantisce la finalità senza fiducia e consente alle minoranze oneste di proteggere la catena. | Se non ci sono nodi onesti, un operatore malintenzionato può rubare fondi pubblicando blocchi e impegni di stato non validi. |
| Il calcolo delle prove di frode è aperto ai normali nodi L2, a differenza delle prove di validità (utilizzate nei rollup a conoscenza zero) che richiedono hardware speciale. | Il modello di sicurezza si basa su almeno un nodo onesto che esegue le transazioni del rollup e invia prove di frode per contestare transazioni di stato non valide. |
| I rollup beneficiano della "vivacità senza fiducia" (chiunque può forzare l'avanzamento della catena eseguendo transazioni e pubblicando asserzioni). | Gli utenti devono attendere la scadenza del periodo di contestazione di una settimana prima di prelevare i fondi su Ethereum. |
| I rollup ottimistici si affidano a incentivi crittoeconomici ben progettati per aumentare la sicurezza sulla catena. | I rollup devono pubblicare tutti i dati delle transazioni on-chain, il che può aumentare i costi. |
| La compatibilità con l'EVM e Solidity consente agli sviluppatori di portare i contratti intelligenti nativi di Ethereum sui rollup o di utilizzare gli strumenti esistenti per creare nuove dApp. | |

### Una spiegazione visiva dei rollup ottimistici {#optimistic-video}

Preferisci imparare visivamente? Guarda Finematics che spiega i rollup ottimistici:

<YouTube id="7pWxCklcNsU" start="263" />

## Ulteriori letture sui rollup ottimistici

- [Come funzionano i rollup ottimistici (La guida completa)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Cos'è un rollup blockchain? Un'introduzione tecnica](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [La guida essenziale ad Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [La guida pratica ai rollup di Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Lo stato delle prove di frode negli L2 di Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Come funziona davvero il rollup di Optimism?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Approfondimento sull'OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Cos'è la macchina virtuale ottimistica?](https://www.alchemy.com/overviews/optimistic-virtual-machine)

## Tutorial: Rollup ottimistici e ponti su Ethereum {#tutorials}

- [Analisi del contratto ponte standard di Optimism](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Un'analisi del codice annotato del ponte standard di Optimism per lo spostamento di asset tra L1 e L2._