---
title: "Rollup: la strategia di ridimensionamento definitiva di Ethereum?"
description: "Un'analisi approfondita dei rollup come strategia di ridimensionamento principale di Ethereum. Questo video spiega come funzionano i rollup ottimistici (Arbitrum, Optimism) e i rollup a conoscenza zero."
lang: it
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "scaling"
  - "rollups"
  - "optimistic-rollups"
  - "zk-rollups"
format: explainer
author: Finematics
breadcrumb: "Rollup"
---

Una spiegazione di **Finematics** che tratta i rollup come strategia di ridimensionamento principale di Ethereum. Il video confronta i rollup ottimistici (Arbitrum, Optimism) con gli ZK rollup ed esamina perché i rollup sono diventati il metodo dominante per il ridimensionamento di Ethereum.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=7pWxCklcNsU) pubblicata da Finematics. È stata leggermente modificata per facilitarne la lettura.*

#### Layer 2 (1:17) {#layer-2-117}

Il ridimensionamento di Ethereum è stato uno degli argomenti più discussi nel mondo cripto. Il dibattito sul ridimensionamento di solito si accende durante i periodi di elevata attività della rete, come la mania dei CryptoKitties nel 2017, l'estate della finanza decentralizzata (DeFi) del 2020 o il mercato rialzista delle cripto all'inizio del 2021. Durante questi periodi, la domanda senza precedenti per la rete Ethereum ha portato a commissioni del gas estremamente elevate, rendendo costoso per gli utenti comuni pagare le proprie transazioni.

Per affrontare questo problema, la ricerca della soluzione di ridimensionamento definitiva è stata una delle massime priorità per diversi team e per la comunità di Ethereum nel suo complesso.

In generale, ci sono tre modi principali per ridimensionare Ethereum, o di fatto la maggior parte delle altre blockchain: ridimensionare la blockchain stessa (ridimensionamento del layer 1), costruire sopra il layer 1 (ridimensionamento del layer 2) e costruire a lato del layer 1 (sidechain).

#### Al di fuori del layer 1 (1:58) {#outside-of-layer-1-158}

Per quanto riguarda il layer 1, Eth2 è la soluzione scelta per ridimensionare la blockchain di Ethereum. Eth2 si riferisce a un insieme di modifiche interconnesse come la migrazione alla Proof-of-Stake (PoS), la fusione dello stato della blockchain basata sulla Prova di lavoro (PoW) nella nuova catena Proof-of-Stake e lo sharding. Lo sharding, in particolare, può aumentare drasticamente la capacità transazionale della rete Ethereum, specialmente se combinato con i rollup.

Quando si tratta di ridimensionare al di fuori del layer 1, sono state provate diverse soluzioni di ridimensionamento con risultati contrastanti. Da un lato, abbiamo soluzioni di layer 2 come i canali, che sono completamente protetti da Ethereum ma funzionano bene solo per un insieme specifico di applicazioni. Le sidechain, d'altro canto, sono solitamente compatibili con l'EVM e possono ridimensionare applicazioni di uso generale. Lo svantaggio principale è che sono meno sicure delle soluzioni di layer 2, poiché non si affidano alla sicurezza di Ethereum e hanno invece i propri modelli di consenso.

La maggior parte dei rollup mira a ottenere il meglio di questi due mondi creando una soluzione di ridimensionamento di uso generale pur affidandosi completamente alla sicurezza di Ethereum. Questo è il Santo Graal del ridimensionamento, poiché consente di distribuire tutti i contratti intelligenti esistenti presenti su Ethereum su un rollup con poche o nessuna modifica, senza sacrificare la sicurezza. Non c'è da stupirsi che i rollup siano probabilmente la soluzione di ridimensionamento più attesa di tutte.

Un rollup è un tipo di soluzione di ridimensionamento che funziona eseguendo le transazioni al di fuori del layer 1 ma pubblicando i dati della transazione sul layer 1. Ciò consente al rollup di ridimensionare la rete e di derivare comunque la propria sicurezza dal consenso di Ethereum. Spostare il calcolo offchain consente essenzialmente di elaborare più transazioni in totale, poiché solo alcuni dei dati delle transazioni del rollup devono rientrare nei blocchi di Ethereum.

Per ottenere ciò, le transazioni del rollup vengono eseguite su una catena separata che può persino eseguire una versione dell'EVM specifica per il rollup. Il passaggio successivo, dopo aver eseguito le transazioni su un rollup, è raggrupparle e pubblicarle sulla catena principale di Ethereum. L'intero processo essenzialmente esegue le transazioni, prende i dati, li comprime e li "arrotola" (roll up) sulla catena principale in un singolo lotto: da qui il nome "rollup".

Ogni rollup distribuisce un insieme di contratti intelligenti sul layer 1 che sono responsabili dell'elaborazione di depositi e prelievi e della verifica delle prove. Le prove sono anche il punto in cui entra in gioco la distinzione principale tra i diversi tipi di rollup. I rollup ottimistici utilizzano prove di frode, mentre gli ZK rollup utilizzano prove di validità.

#### Rollup ottimistici (4:26) {#optimistic-rollups-426}

I rollup ottimistici pubblicano i dati sul layer 1 e presumono che siano corretti: da qui il nome "ottimistici". Se i dati pubblicati sono validi, ci troviamo nello scenario ideale e non c'è nient'altro da fare. Il rollup ottimistico trae vantaggio dal non dover svolgere alcun lavoro aggiuntivo nello scenario ottimistico.

In caso di transazione non valida, il sistema deve essere in grado di identificarla, recuperare lo stato corretto e penalizzare la parte che invia tale transazione. Per ottenere ciò, i rollup ottimistici implementano un sistema di risoluzione delle controversie in grado di verificare le prove di frode, rilevare le transazioni fraudolente e disincentivare i malintenzionati dall'inviare altre transazioni non valide o prove di frode errate.

Nella maggior parte delle implementazioni di rollup ottimistici, la parte in grado di inviare lotti di transazioni al layer 1 deve fornire una cauzione, solitamente sotto forma di ETH. Qualsiasi altro partecipante alla rete può inviare una prova di frode se individua una transazione errata. Dopo l'invio di una prova di frode, il sistema entra in modalità di risoluzione delle controversie. In questa modalità, la transazione sospetta viene eseguita di nuovo, questa volta sulla catena principale di Ethereum. Se l'esecuzione dimostra che la transazione era effettivamente fraudolenta, la parte che ha inviato questa transazione viene punita, solitamente subendo lo slashing dei propri ETH vincolati.

Per impedire ai malintenzionati di inondare la rete con prove di frode errate, le parti che desiderano inviare prove di frode di solito devono anche fornire una cauzione che può essere soggetta a slashing.

Per poter eseguire una transazione di rollup sul layer 1, i rollup ottimistici devono implementare un sistema in grado di riprodurre una transazione con l'esatto stato che era presente quando la transazione è stata originariamente eseguita sul rollup. Questa è una delle parti complicate dei rollup ottimistici e di solito si ottiene creando un contratto gestore separato che sostituisce determinate chiamate di funzione con uno stato dal rollup.

Il sistema può funzionare come previsto e rilevare le frodi anche se c'è solo una parte onesta che monitora lo stato del rollup e invia prove di frode se necessario. Grazie ai giusti incentivi all'interno del sistema di rollup, l'ingresso nel processo di risoluzione delle controversie dovrebbe essere una situazione eccezionale e non qualcosa che accade di continuo.

Per quanto riguarda gli ZK rollup, non c'è alcuna risoluzione delle controversie. Ciò è possibile sfruttando un ingegnoso elemento di crittografia chiamato prove a conoscenza zero: da qui il nome ZK rollup. In questo modello, ogni lotto pubblicato sul layer 1 include una prova crittografica chiamata ZK-SNARK. La prova può essere verificata rapidamente dal contratto del layer 1 quando viene inviato il lotto di transazioni e i lotti non validi possono essere rifiutati immediatamente.

#### Altre differenze (7:28) {#other-differences-728}

A causa della natura del processo di risoluzione delle controversie, i rollup ottimistici devono concedere a tutti i partecipanti alla rete tempo sufficiente per inviare prove di frode prima di finalizzare una transazione sul layer 1. Questo periodo è solitamente piuttosto lungo, per garantire che anche nello scenario peggiore le transazioni fraudolente possano ancora essere contestate. Ciò fa sì che i prelievi dai rollup ottimistici siano piuttosto lunghi, poiché gli utenti devono aspettare fino a una o due settimane per poter prelevare i propri fondi e riportarli sul layer 1.

Fortunatamente, ci sono alcuni progetti che lavorano per migliorare questa situazione fornendo "uscite di liquidità" veloci. Questi progetti offrono prelievi quasi istantanei verso il layer 1, un altro layer 2 o persino una sidechain e addebitano una piccola commissione per la comodità. Hop Protocol e Connext sono i progetti da tenere d'occhio.

Gli ZK rollup non hanno il problema dei prelievi lunghi, poiché i fondi sono disponibili per i prelievi non appena il lotto del rollup, insieme a una prova di validità, viene inviato al layer 1.

Tuttavia, gli ZK rollup presentano i propri svantaggi. A causa della complessità della tecnologia, è molto più difficile creare uno ZK rollup compatibile con l'EVM, il che rende più difficile ridimensionare le applicazioni di uso generale senza dover riscrivere la logica dell'applicazione. Detto questo, zkSync sta facendo progressi significativi in quest'area e potrebbe essere in grado di lanciare uno ZK rollup compatibile con l'EVM molto presto.

I rollup ottimistici hanno vita un po' più facile con la compatibilità EVM. Devono comunque eseguire la propria versione dell'EVM con alcune modifiche, ma il 99% dei contratti può essere trasferito senza apportare alcuna modifica. Gli ZK rollup sono anche molto più pesanti dal punto di vista computazionale rispetto ai rollup ottimistici, il che significa che i nodi che calcolano le prove ZK devono essere macchine ad alte prestazioni, rendendo difficile per altri utenti eseguirli.

#### Miglioramenti del ridimensionamento (9:32) {#scaling-improvements-932}

Per quanto riguarda i miglioramenti del ridimensionamento, entrambi i tipi di rollup dovrebbero essere in grado di ridimensionare Ethereum da circa 15-45 transazioni al secondo (a seconda del tipo di transazione) fino a 1.000-4.000 transazioni al secondo. Vale la pena notare che è possibile elaborare ancora più transazioni al secondo offrendo più spazio per i lotti di rollup sul layer 1.

Questo è anche il motivo per cui Eth2 può creare un'enorme sinergia con i rollup, poiché aumenta il possibile spazio di disponibilità dei dati creando molteplici shard, ognuno dei quali in grado di archiviare una quantità significativa di dati. La combinazione di Eth2 e rollup potrebbe portare la velocità delle transazioni di Ethereum fino a 100.000 transazioni al secondo.

Optimism e Arbitrum sono attualmente le opzioni più popolari per quanto riguarda i rollup ottimistici. Optimism è stato parzialmente distribuito sulla Mainnet di Ethereum con un gruppo limitato di partner come Synthetix e Uniswap per garantire che la tecnologia funzioni come previsto prima del lancio completo. Arbitrum ha già distribuito la sua versione sulla Mainnet e ha iniziato l'inserimento di diversi progetti nel suo ecosistema.

Alcuni dei progetti più importanti lanciati su Arbitrum includono Uniswap, Sushi, Bancor, Augur, Chainlink, Aave e molti altri. Arbitrum ha anche annunciato la sua partnership con Reddit, concentrandosi sul lancio di una catena di rollup separata per ridimensionare il loro sistema di ricompensa. Optimism sta collaborando con MakerDAO per creare il ponte Optimism Dai e consentire prelievi rapidi di DAI e altri token verso il layer 1.

Sebbene sia Arbitrum che Optimism cerchino di raggiungere lo stesso obiettivo, ovvero costruire soluzioni di rollup ottimistici compatibili con l'EVM, ci sono alcune differenze nel loro design. Arbitrum ha un diverso modello di risoluzione delle controversie. Invece di rieseguire un'intera transazione sul layer 1 per verificare se la prova di frode è valida, hanno ideato un modello interattivo a più round che consente di restringere l'ambito della controversia e potenzialmente eseguire solo poche istruzioni sul layer 1 per verificare se una transazione sospetta è valida.

Un'altra grande differenza è l'approccio alla gestione dell'ordinamento delle transazioni e del MEV. Arbitrum eseguirà inizialmente un sequencer responsabile dell'ordinamento delle transazioni, ma vogliono decentralizzarlo a lungo termine. Optimism preferisce un altro approccio in cui l'ordinamento delle transazioni, e quindi il MEV, può essere messo all'asta ad altre parti per un certo periodo di tempo.

#### ZK rollup (13:10) {#zk-rollups-1310}

Sebbene sembri che la comunità di Ethereum si stia concentrando principalmente sui rollup ottimistici, almeno a breve termine, anche i progetti che lavorano sugli ZK rollup stanno progredendo in modo estremamente rapido.

Loopring utilizza la tecnologia ZK rollup per ridimensionare il suo protocollo di scambio e pagamento. Hermez e ZKTube stanno lavorando al ridimensionamento dei pagamenti utilizzando gli ZK rollup, con Hermez che sta anche costruendo uno ZK rollup compatibile con l'EVM. Aztec si sta concentrando sull'introduzione di funzionalità di privacy nella propria tecnologia ZK rollup.

I rollup basati su StarkWare sono già ampiamente utilizzati da progetti come DeversiFi, Immutable X e dYdX. Come accennato in precedenza, zkSync sta lavorando a una macchina virtuale compatibile con l'EVM che sarà in grado di supportare completamente qualsiasi contratto intelligente arbitrario scritto in Solidity.

#### DeFi (14:02) {#defi-1402}

I rollup dovrebbero avere un grande impatto anche sulla DeFi. Gli utenti che in precedenza non erano in grado di effettuare transazioni su Ethereum a causa delle elevate commissioni di transazione potranno rimanere nell'ecosistema la prossima volta che l'attività della rete sarà elevata. I rollup consentiranno anche una nuova generazione di applicazioni che richiedono transazioni più economiche e tempi di conferma più rapidi, il tutto pur essendo completamente protette dal consenso di Ethereum. Sembra che i rollup possano innescare un altro periodo di forte crescita per la DeFi.

#### Sfide (14:29) {#challenges-1429}

Ci sono, tuttavia, alcune sfide per quanto riguarda i rollup. La componibilità è una di queste: per comporre una transazione che utilizza più protocolli, tutti dovrebbero essere distribuiti sullo stesso rollup.

Un'altra sfida è la liquidità frammentata. Senza nuovo denaro in entrata nell'ecosistema Ethereum nel suo complesso, la liquidità esistente presente sul layer 1 in protocolli come Uniswap o Aave sarà condivisa tra il layer 1 e molteplici implementazioni di rollup. Una minore liquidità di solito significa uno slittamento maggiore e una peggiore esecuzione delle operazioni.

Questo significa anche che naturalmente ci saranno vincitori e vinti. Al momento, l'ecosistema Ethereum esistente non è abbastanza grande da utilizzare tutte le soluzioni di ridimensionamento. Questo potrebbe cambiare, e probabilmente cambierà, a lungo termine, ma a breve termine potremmo vedere alcuni rollup e altre soluzioni di ridimensionamento diventare città fantasma. In futuro, potremmo anche vedere utenti vivere interamente all'interno di un ecosistema di rollup e non interagire con la catena principale di Ethereum e altre soluzioni di ridimensionamento per lunghi periodi di tempo.

#### Minaccia per le sidechain (15:44) {#threat-to-sidechains-1544}

Una domanda che sorge molto spesso quando si discute dei rollup è se rappresentino una minaccia per le sidechain. Le sidechain avranno ancora il loro posto nell'ecosistema Ethereum. Sebbene il costo delle transazioni sul layer 2 sarà molto inferiore rispetto al layer 1, molto probabilmente sarà ancora abbastanza alto da escludere determinati tipi di applicazioni come i giochi e altre app ad alto volume. Questo potrebbe cambiare quando Ethereum introdurrà lo sharding, ma per allora le sidechain potrebbero creare un effetto rete sufficiente per sopravvivere a lungo termine.

Inoltre, le commissioni sui rollup sono più alte rispetto alle sidechain perché ogni lotto di rollup deve comunque pagare per lo spazio del blocco di Ethereum. La comunità di Ethereum pone un'enorme attenzione sui rollup nella strategia di ridimensionamento di Ethereum, almeno a breve e medio termine e potenzialmente anche più a lungo.