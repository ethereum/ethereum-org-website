---
title: Rollup a conoscenza zero
description: Un'introduzione ai rollup a conoscenza zero, una soluzione di ridimensionamento utilizzata dalla community di Ethereum.
lang: it
---

I rollup a conoscenza zero (ZK-rollup) sono [soluzioni di ridimensionamento](/developers/docs/scaling/) di layer 2 (l2) che aumentano la capacità transazionale sulla Mainnet di [Ethereum](/) spostando il calcolo e l'archiviazione dello stato offchain. Gli ZK-rollup possono elaborare migliaia di transazioni in un batch e quindi pubblicare solo alcuni dati riassuntivi minimi sulla Mainnet. Questi dati riassuntivi definiscono le modifiche che dovrebbero essere apportate allo stato di Ethereum e alcune prove crittografiche che tali modifiche sono corrette.

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso la nostra pagina sul [ridimensionamento di Ethereum](/developers/docs/scaling/) e sui [layer 2](/layer-2).

## Cosa sono i rollup a conoscenza zero? {#what-are-zk-rollups}

I **rollup a conoscenza zero (ZK-rollup)** raggruppano (o "arrotolano") le transazioni in batch che vengono eseguiti offchain. Il calcolo offchain riduce la quantità di dati che deve essere pubblicata sulla blockchain. Gli operatori degli ZK-rollup inviano un riepilogo delle modifiche necessarie per rappresentare tutte le transazioni in un batch anziché inviare ogni transazione singolarmente. Producono anche [prove di validità](/glossary/#validity-proof) per dimostrare la correttezza delle loro modifiche.

Lo stato dello ZK-rollup è mantenuto da uno smart contract distribuito sulla rete Ethereum. Per aggiornare questo stato, i nodi dello ZK-rollup devono inviare una prova di validità per la verifica. Come accennato, la prova di validità è una garanzia crittografica che il cambiamento di stato proposto dal rollup è realmente il risultato dell'esecuzione del batch di transazioni fornito. Ciò significa che gli ZK-rollup devono solo fornire prove di validità per finalizzare le transazioni su Ethereum invece di pubblicare tutti i dati delle transazioni onchain come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/).

Non ci sono ritardi nello spostamento di fondi da uno ZK-rollup a Ethereum perché le transazioni di uscita vengono eseguite una volta che il contratto dello ZK-rollup verifica la prova di validità. Al contrario, il prelievo di fondi dai rollup ottimistici è soggetto a un ritardo per consentire a chiunque di contestare la transazione di uscita con una [prova di frode](/glossary/#fraud-proof).

Gli ZK-rollup scrivono le transazioni su Ethereum come `calldata`. `calldata` è dove vengono archiviati i dati inclusi nelle chiamate esterne alle funzioni dello smart contract. Le informazioni in `calldata` sono pubblicate sulla blockchain, consentendo a chiunque di ricostruire lo stato del rollup in modo indipendente. Gli ZK-rollup utilizzano tecniche di compressione per ridurre i dati delle transazioni: ad esempio, gli account sono rappresentati da un indice anziché da un indirizzo, il che fa risparmiare 28 byte di dati. La pubblicazione dei dati onchain è un costo significativo per i rollup, quindi la compressione dei dati può ridurre le commissioni per gli utenti.

## In che modo gli ZK-rollup interagiscono con Ethereum? {#zk-rollups-and-ethereum}

Una catena ZK-rollup è un protocollo offchain che opera al di sopra della blockchain di Ethereum ed è gestito da smart contract di Ethereum onchain. Gli ZK-rollup eseguono transazioni al di fuori della Mainnet, ma inviano periodicamente batch di transazioni offchain a un contratto di rollup onchain. Questo registro delle transazioni è immutabile, proprio come la blockchain di Ethereum, e forma la catena ZK-rollup.

L'architettura principale dello ZK-rollup è composta dai seguenti componenti:

1. **Contratti onchain**: Come accennato, il protocollo ZK-rollup è controllato da smart contract in esecuzione su Ethereum. Questo include il contratto principale che archivia i blocchi del rollup, tiene traccia dei depositi e monitora gli aggiornamenti di stato. Un altro contratto onchain (il contratto verificatore) verifica le prove a conoscenza zero inviate dai produttori di blocchi. Pertanto, Ethereum funge da livello di base o "layer 1 (l1)" per lo ZK-rollup.

2. **Macchina virtuale (VM) offchain**: Sebbene il protocollo ZK-rollup risieda su Ethereum, l'esecuzione delle transazioni e l'archiviazione dello stato avvengono su una macchina virtuale separata indipendente dalla [EVM](/developers/docs/evm/). Questa VM offchain è l'ambiente di esecuzione per le transazioni sullo ZK-rollup e funge da livello secondario o "layer 2 (l2)" per il protocollo ZK-rollup. Le prove di validità verificate sulla Mainnet di Ethereum garantiscono la correttezza delle transizioni di stato nella VM offchain.

Gli ZK-rollup sono "soluzioni di ridimensionamento ibride": protocolli offchain che operano in modo indipendente ma derivano la sicurezza da Ethereum. Nello specifico, la rete Ethereum impone la validità degli aggiornamenti di stato sullo ZK-rollup e garantisce la disponibilità dei dati alla base di ogni aggiornamento allo stato del rollup. Di conseguenza, gli ZK-rollup sono notevolmente più sicuri delle pure soluzioni di ridimensionamento offchain, come le [sidechain](/developers/docs/scaling/sidechains/), che sono responsabili delle proprie proprietà di sicurezza, o i [validium](/developers/docs/scaling/validium/), che verificano anch'essi le transazioni su Ethereum con prove di validità, ma archiviano i dati delle transazioni altrove.

Gli ZK-rollup si affidano al protocollo principale di Ethereum per quanto segue:

### Disponibilità dei dati {#data-availability}

Gli ZK-rollup pubblicano i dati di stato per ogni transazione elaborata offchain su Ethereum. Con questi dati, è possibile per individui o aziende riprodurre lo stato del rollup e convalidare la catena da soli. Ethereum rende questi dati disponibili a tutti i partecipanti della rete come `calldata`.

Gli ZK-rollup non hanno bisogno di pubblicare molti dati delle transazioni onchain perché le prove di validità verificano già l'autenticità delle transizioni di stato. Tuttavia, l'archiviazione dei dati onchain è ancora importante perché consente una verifica permissionless e indipendente dello stato della catena L2, che a sua volta consente a chiunque di inviare batch di transazioni, impedendo a operatori malintenzionati di censurare o bloccare la catena.

L'onchain è richiesto affinché gli utenti possano interagire con il rollup. Senza accesso ai dati di stato, gli utenti non possono interrogare il saldo del proprio account o avviare transazioni (ad es. prelievi) che si basano sulle informazioni di stato.

### Definitività delle transazioni {#transaction-finality}

Ethereum funge da livello di regolamento per gli ZK-rollup: le transazioni L2 sono finalizzate solo se il contratto L1 accetta la prova di validità. Ciò elimina il rischio che operatori malintenzionati corrompano la catena (ad es. rubando i fondi del rollup) poiché ogni transazione deve essere approvata sulla Mainnet. Inoltre, Ethereum garantisce che le operazioni degli utenti non possano essere annullate una volta finalizzate su L1.

### Resistenza alla censura {#censorship-resistance}

La maggior parte degli ZK-rollup utilizza un "supernodo" (l'operatore) per eseguire transazioni, produrre batch e inviare blocchi a L1. Sebbene ciò garantisca l'efficienza, aumenta il rischio di censura: gli operatori malintenzionati degli ZK-rollup possono censurare gli utenti rifiutandosi di includere le loro transazioni nei batch.

Come misura di sicurezza, gli ZK-rollup consentono agli utenti di inviare transazioni direttamente al contratto del rollup sulla Mainnet se ritengono di essere censurati dall'operatore. Ciò consente agli utenti di forzare un'uscita dallo ZK-rollup verso Ethereum senza dover fare affidamento sul permesso dell'operatore.

## Come funzionano gli ZK-rollup? {#how-do-zk-rollups-work}

### Transazioni {#transactions}

Gli utenti nello ZK-rollup firmano le transazioni e le inviano agli operatori L2 per l'elaborazione e l'inclusione nel batch successivo. In alcuni casi, l'operatore è un'entità centralizzata, chiamata sequencer, che esegue le transazioni, le aggrega in batch e le invia a L1. Il sequencer in questo sistema è l'unica entità autorizzata a produrre blocchi L2 e ad aggiungere transazioni del rollup al contratto dello ZK-rollup.

Altri ZK-rollup possono ruotare il ruolo dell'operatore utilizzando un set di validatori [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos/). I potenziali operatori depositano fondi nel contratto del rollup, con la dimensione di ogni stake che influenza le possibilità dello staker di essere selezionato per produrre il batch di rollup successivo. Lo stake dell'operatore può subire lo slashing se agisce in modo dannoso, il che lo incentiva a pubblicare blocchi validi.

#### Come gli ZK-rollup pubblicano i dati delle transazioni su Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Come spiegato, i dati delle transazioni sono pubblicati su Ethereum come `calldata`. `calldata` è un'area dati in uno smart contract utilizzata per passare argomenti a una funzione e si comporta in modo simile alla [memoria](/developers/docs/smart-contracts/anatomy/#memory). Sebbene `calldata` non sia archiviato come parte dello stato di Ethereum, persiste onchain come parte dei [log storici](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) della catena di Ethereum. `calldata` non influisce sullo stato di Ethereum, rendendolo un modo economico per archiviare dati onchain.

La parola chiave `calldata` identifica spesso il metodo dello smart contract chiamato da una transazione e contiene gli input al metodo sotto forma di una sequenza arbitraria di byte. Gli ZK-rollup utilizzano `calldata` per pubblicare i dati compressi delle transazioni onchain; l'operatore del rollup aggiunge semplicemente un nuovo batch chiamando la funzione richiesta nel contratto del rollup e passa i dati compressi come argomenti della funzione. Questo aiuta a ridurre i costi per gli utenti poiché gran parte delle commissioni del rollup è destinata all'archiviazione dei dati delle transazioni onchain.

### Commitment di stato {#state-commitments}

Lo stato dello ZK-rollup, che include gli account e i saldi L2, è rappresentato come un [albero di Merkle](/whitepaper/#merkle-trees). Un hash crittografico della radice dell'albero di Merkle (radice di Merkle) è archiviato nel contratto onchain, consentendo al protocollo del rollup di tenere traccia delle modifiche nello stato dello ZK-rollup.

Il rollup passa a un nuovo stato dopo l'esecuzione di un nuovo set di transazioni. L'operatore che ha avviato la transizione di stato è tenuto a calcolare una nuova radice di stato e a inviarla al contratto onchain. Se la prova di validità associata al batch è autenticata dal contratto verificatore, la nuova radice di Merkle diventa la radice di stato canonica dello ZK-rollup.

Oltre a calcolare le radici di stato, l'operatore dello ZK-rollup crea anche una radice del batch: la radice di un albero di Merkle che comprende tutte le transazioni in un batch. Quando viene inviato un nuovo batch, il contratto del rollup archivia la radice del batch, consentendo agli utenti di dimostrare che una transazione (ad es. una richiesta di prelievo) è stata inclusa nel batch. Gli utenti dovranno fornire i dettagli della transazione, la radice del batch e una [prova di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) che mostri il percorso di inclusione.

### Prove di validità {#validity-proofs}

La nuova radice di stato che l'operatore dello ZK-rollup invia al contratto L1 è il risultato degli aggiornamenti allo stato del rollup. Supponiamo che Alice invii 10 token a Bob, l'operatore diminuisce semplicemente il saldo di Alice di 10 e incrementa il saldo di Bob di 10. L'operatore esegue quindi l'hashing dei dati dell'account aggiornati, ricostruisce l'albero di Merkle del rollup e invia la nuova radice di Merkle al contratto onchain.

Ma il contratto del rollup non accetterà automaticamente il commitment di stato proposto finché l'operatore non dimostrerà che la nuova radice di Merkle è il risultato di aggiornamenti corretti allo stato del rollup. L'operatore dello ZK-rollup lo fa producendo una prova di validità, un commitment crittografico succinto che verifica la correttezza delle transazioni raggruppate in batch.

Le prove di validità consentono alle parti di dimostrare la correttezza di un'affermazione senza rivelare l'affermazione stessa: per questo motivo, sono anche chiamate prove a conoscenza zero. Gli ZK-rollup utilizzano le prove di validità per confermare la correttezza delle transizioni di stato offchain senza dover rieseguire le transazioni su Ethereum. Queste prove possono assumere la forma di uno [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) o di uno [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

Sia gli SNARK che gli STARK aiutano ad attestare l'integrità del calcolo offchain negli ZK-rollup, sebbene ogni tipo di prova abbia caratteristiche distintive.

**ZK-SNARK**

Affinché il protocollo ZK-SNARK funzioni, è necessario creare una Common Reference String (CRS): la CRS fornisce parametri pubblici per dimostrare e verificare le prove di validità. La sicurezza del sistema di prova dipende dalla configurazione della CRS; se le informazioni utilizzate per creare i parametri pubblici cadono in possesso di attori malintenzionati, questi potrebbero essere in grado di generare false prove di validità.

Alcuni ZK-rollup tentano di risolvere questo problema utilizzando una [cerimonia di calcolo multi-parte (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), che coinvolge individui fidati, per generare parametri pubblici per il circuito ZK-SNARK. Ogni parte contribuisce con un po' di casualità (chiamata "rifiuto tossico") per costruire la CRS, che deve distruggere immediatamente.

Le configurazioni attendibili vengono utilizzate perché aumentano la sicurezza della configurazione della CRS. Finché un partecipante onesto distrugge il proprio input, la sicurezza del sistema ZK-SNARK è garantita. Tuttavia, questo approccio richiede di fidarsi di coloro che sono coinvolti affinché eliminino la loro casualità campionata e non compromettano le garanzie di sicurezza del sistema.

Assunzioni di fiducia a parte, gli ZK-SNARK sono popolari per le loro dimensioni ridotte delle prove e per la verifica in tempo costante. Poiché la verifica delle prove su L1 costituisce il costo maggiore per il funzionamento di uno ZK-rollup, gli L2 utilizzano gli ZK-SNARK per generare prove che possono essere verificate in modo rapido ed economico sulla Mainnet.

**ZK-STARK**

Come gli ZK-SNARK, gli ZK-STARK dimostrano la validità del calcolo offchain senza rivelare gli input. Tuttavia, gli ZK-STARK sono considerati un miglioramento rispetto agli ZK-SNARK per la loro scalabilità e trasparenza.

Gli ZK-STARK sono "trasparenti", in quanto possono funzionare senza la configurazione attendibile di una Common Reference String (CRS). Invece, gli ZK-STARK si basano su una casualità verificabile pubblicamente per impostare i parametri per la generazione e la verifica delle prove.

Gli ZK-STARK forniscono anche maggiore scalabilità perché il tempo necessario per dimostrare e verificare le prove di validità aumenta in modo _quasilineare_ in relazione alla complessità del calcolo sottostante. Con gli ZK-SNARK, i tempi di prova e verifica scalano in modo _lineare_ in relazione alle dimensioni del calcolo sottostante. Ciò significa che gli ZK-STARK richiedono meno tempo rispetto agli ZK-SNARK per la prova e la verifica quando sono coinvolti set di dati di grandi dimensioni, rendendoli utili per applicazioni ad alto volume.

Gli ZK-STARK sono anche sicuri contro i computer quantistici, mentre la crittografia a curva ellittica (ECC) utilizzata negli ZK-SNARK è ampiamente ritenuta suscettibile agli attacchi di calcolo quantistico. Il lato negativo degli ZK-STARK è che producono prove di dimensioni maggiori, che sono più costose da verificare su Ethereum.

#### Come funzionano le prove di validità negli ZK-rollup? {#validity-proofs-in-zk-rollups}

##### Generazione della prova {#}

Prima di accettare le transazioni, l'operatore eseguirà i consueti controlli. Ciò include la conferma che:

- Gli account del mittente e del destinatario fanno parte dell'albero di stato.
- Il mittente ha fondi sufficienti per elaborare la transazione.
- La transazione è corretta e corrisponde alla chiave pubblica del mittente sul rollup.
- Il nonce del mittente è corretto, ecc.

Una volta che il nodo dello ZK-rollup ha abbastanza transazioni, le aggrega in un batch e compila gli input per il circuito di prova da compilare in una prova ZK succinta. Questo include:

- Una radice dell'albero di Merkle che comprende tutte le transazioni nel batch.
- Prove di Merkle per le transazioni per dimostrare l'inclusione nel batch.
- Prove di Merkle per ogni coppia mittente-destinatario nelle transazioni per dimostrare che quegli account fanno parte dell'albero di stato del rollup.
- Un set di radici di stato intermedie, derivate dall'aggiornamento della radice di stato dopo aver applicato gli aggiornamenti di stato per ogni transazione (ovvero, diminuendo gli account del mittente e aumentando gli account del destinatario).

Il circuito di prova calcola la prova di validità "iterando" su ogni transazione ed eseguendo gli stessi controlli che l'operatore ha completato prima di elaborare la transazione. Innanzitutto, verifica che l'account del mittente faccia parte della radice di stato esistente utilizzando la prova di Merkle fornita. Quindi riduce il saldo del mittente, aumenta il suo nonce, esegue l'hashing dei dati dell'account aggiornati e li combina con la prova di Merkle per generare una nuova radice di Merkle.

Questa radice di Merkle riflette l'unica modifica nello stato dello ZK-rollup: una modifica nel saldo e nel nonce del mittente. Ciò è possibile perché la prova di Merkle utilizzata per dimostrare l'esistenza dell'account viene utilizzata per derivare la nuova radice di stato.

Il circuito di prova esegue lo stesso processo sull'account del destinatario. Controlla se l'account del destinatario esiste sotto la radice di stato intermedia (utilizzando la prova di Merkle), aumenta il suo saldo, esegue nuovamente l'hashing dei dati dell'account e li combina con la prova di Merkle per generare una nuova radice di stato.

Il processo si ripete per ogni transazione; ogni "iterazione" crea una nuova radice di stato dall'aggiornamento dell'account del mittente e una successiva nuova radice dall'aggiornamento dell'account del destinatario. Come spiegato, ogni aggiornamento alla radice di stato rappresenta una parte dell'albero di stato del rollup che cambia.

Il circuito di prova ZK itera sull'intero batch di transazioni, verificando la sequenza di aggiornamenti che si traducono in una radice di stato finale dopo l'esecuzione dell'ultima transazione. L'ultima radice di Merkle calcolata diventa la più recente radice di stato canonica dello ZK-rollup.

##### Verifica della prova {#}

Dopo che il circuito di prova ha verificato la correttezza degli aggiornamenti di stato, l'operatore L2 invia la prova di validità calcolata al contratto verificatore su L1. Il circuito di verifica del contratto verifica la validità della prova e controlla anche gli input pubblici che fanno parte della prova:

- **Radice di pre-stato**: La vecchia radice di stato dello ZK-rollup (ovvero, prima che le transazioni raggruppate in batch venissero eseguite), che riflette l'ultimo stato valido noto della catena L2.

- **Radice di post-stato**: La nuova radice di stato dello ZK-rollup (ovvero, dopo l'esecuzione delle transazioni raggruppate in batch), che riflette lo stato più recente della catena L2. La radice di post-stato è la radice finale derivata dopo aver applicato gli aggiornamenti di stato nel circuito di prova.

- **Radice del batch**: La radice di Merkle del batch, derivata _merklizzando_ le transazioni nel batch ed eseguendo l'hashing della radice dell'albero.

- **Input della transazione**: Dati associati alle transazioni eseguite come parte del batch inviato.

Se la prova soddisfa il circuito (ovvero, è valida), significa che esiste una sequenza di transazioni valide che fanno passare il rollup dallo stato precedente (identificato crittograficamente dalla radice di pre-stato) a un nuovo stato (identificato crittograficamente dalla radice di post-stato). Se la radice di pre-stato corrisponde alla radice archiviata nel contratto del rollup e la prova è valida, il contratto del rollup prende la radice di post-stato dalla prova e aggiorna il suo albero di stato per riflettere lo stato modificato del rollup.

### Entrate e uscite {#entries-and-exits}

Gli utenti entrano nello ZK-rollup depositando token nel contratto del rollup distribuito sulla catena L1. Questa transazione viene messa in coda poiché solo gli operatori possono inviare transazioni al contratto del rollup.

Se la coda dei depositi in sospeso inizia a riempirsi, l'operatore dello ZK-rollup prenderà le transazioni di deposito e le invierà al contratto del rollup. Una volta che i fondi dell'utente sono nel rollup, possono iniziare a effettuare transazioni inviando transazioni all'operatore per l'elaborazione. Gli utenti possono verificare i saldi sul rollup eseguendo l'hashing dei dati del proprio account, inviando l'hash al contratto del rollup e fornendo una prova di Merkle da verificare rispetto alla radice di stato corrente.

Il prelievo da uno ZK-rollup a L1 è semplice. L'utente avvia la transazione di uscita inviando i propri asset sul rollup a un account specificato per bruciare i token. Se l'operatore include la transazione nel batch successivo, l'utente può inviare una richiesta di prelievo al contratto onchain. Questa richiesta di prelievo includerà quanto segue:

- Prova di Merkle che dimostra l'inclusione della transazione dell'utente verso l'account di burn in un batch di transazioni

- Dati della transazione

- Radice del batch

- Indirizzo L1 per ricevere i fondi depositati

Il contratto del rollup esegue l'hashing dei dati della transazione, controlla se la radice del batch esiste e utilizza la prova di Merkle per verificare se l'hash della transazione fa parte della radice del batch. Successivamente, il contratto esegue la transazione di uscita e invia i fondi all'indirizzo scelto dall'utente su L1.

## ZK-rollup e compatibilità EVM {#zk-rollups-and-evm-compatibility}

A differenza dei rollup ottimistici, gli ZK-rollup non sono facilmente compatibili con la [Macchina Virtuale di Ethereum (EVM)](/developers/docs/evm/). Dimostrare il calcolo EVM generico nei circuiti è più difficile e richiede più risorse rispetto alla dimostrazione di calcoli semplici (come il trasferimento di token descritto in precedenza).

Tuttavia, i [progressi nella tecnologia a conoscenza zero](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) stanno accendendo un rinnovato interesse nell'avvolgere il calcolo EVM in prove a conoscenza zero. Questi sforzi sono orientati alla creazione di un'implementazione di EVM a conoscenza zero (zkEVM) in grado di verificare in modo efficiente la correttezza dell'esecuzione del programma. Una zkEVM ricrea gli opcode EVM esistenti per la prova/verifica nei circuiti, consentendo di eseguire smart contract.

Come la EVM, una zkEVM passa da uno stato all'altro dopo che il calcolo è stato eseguito su alcuni input. La differenza è che la zkEVM crea anche prove a conoscenza zero per verificare la correttezza di ogni passaggio nell'esecuzione del programma. Le prove di validità potrebbero verificare la correttezza delle operazioni che toccano lo stato della VM (memoria, stack, archiviazione) e il calcolo stesso (ovvero, l'operazione ha chiamato gli opcode giusti e li ha eseguiti correttamente?).

Si prevede che l'introduzione di ZK-rollup compatibili con EVM aiuterà gli sviluppatori a sfruttare le garanzie di scalabilità e sicurezza delle prove a conoscenza zero. Ancora più importante, la compatibilità con l'infrastruttura nativa di Ethereum significa che gli sviluppatori possono creare dapp compatibili con ZK utilizzando strumenti e linguaggi familiari (e collaudati).

## Come funzionano le commissioni degli ZK-rollup? {#how-do-zk-rollup-fees-work}

Quanto pagano gli utenti per le transazioni sugli ZK-rollup dipende dalla commissione del gas, proprio come sulla Mainnet di Ethereum. Tuttavia, le commissioni del gas funzionano in modo diverso su L2 e sono influenzate dai seguenti costi:

1. **Scrittura dello stato**: C'è un costo fisso per la scrittura nello stato di Ethereum (ovvero, l'invio di una transazione sulla blockchain di Ethereum). Gli ZK-rollup riducono questo costo raggruppando le transazioni in batch e distribuendo i costi fissi su più utenti.

2. **Pubblicazione dei dati**: Gli ZK-rollup pubblicano i dati di stato per ogni transazione su Ethereum come `calldata`. I costi di `calldata` sono attualmente regolati dall'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), che stabilisce un costo di 16 gas per i byte non zero e 4 gas per i byte zero di `calldata`, rispettivamente. Il costo pagato su ogni transazione è influenzato da quanto `calldata` deve essere pubblicato onchain per essa.

3. **Commissioni dell'operatore L2**: Questo è l'importo pagato all'operatore del rollup come compenso per i costi computazionali sostenuti nell'elaborazione delle transazioni, in modo molto simile alle ["commissioni di priorità (mance)" delle transazioni](/developers/docs/gas/#how-are-gas-fees-calculated) sulla Mainnet di Ethereum.

4. **Generazione e verifica della prova**: Gli operatori degli ZK-rollup devono produrre prove di validità per i batch di transazioni, il che richiede molte risorse. Anche la verifica delle prove a conoscenza zero sulla Mainnet costa gas (~ 500.000 gas).

Oltre al batching delle transazioni, gli ZK-rollup riducono le commissioni per gli utenti comprimendo i dati delle transazioni. Puoi [vedere una panoramica in tempo reale](https://l2fees.info/) di quanto costa utilizzare gli ZK-rollup di Ethereum.

## In che modo gli ZK-rollup ridimensionano Ethereum? {#scaling-ethereum-with-zk-rollups}

### Compressione dei dati delle transazioni {#transaction-data-compression}

Gli ZK-rollup estendono la capacità transazionale sul livello di base di Ethereum portando il calcolo offchain, ma la vera spinta per il ridimensionamento deriva dalla compressione dei dati delle transazioni. La [dimensione del blocco](/developers/docs/blocks/#block-size) di Ethereum limita i dati che ogni blocco può contenere e, per estensione, il numero di transazioni elaborate per blocco. Comprimendo i dati relativi alle transazioni, gli ZK-rollup aumentano significativamente il numero di transazioni elaborate per blocco.

Gli ZK-rollup possono comprimere i dati delle transazioni meglio dei rollup ottimistici poiché non devono pubblicare tutti i dati necessari per convalidare ogni transazione. Devono solo pubblicare i dati minimi necessari per ricostruire l'ultimo stato degli account e dei saldi sul rollup.

### Prove ricorsive {#recursive-proofs}

Un vantaggio delle prove a conoscenza zero è che le prove possono verificare altre prove. Ad esempio, un singolo ZK-SNARK può verificare altri ZK-SNARK. Tali "prove di prove" sono chiamate prove ricorsive e aumentano drasticamente la capacità transazionale sugli ZK-rollup.

Attualmente, le prove di validità vengono generate blocco per blocco e inviate al contratto L1 per la verifica. Tuttavia, la verifica delle prove di un singolo blocco limita la capacità transazionale che gli ZK-rollup possono raggiungere poiché solo un blocco può essere finalizzato quando l'operatore invia una prova.

Le prove ricorsive, tuttavia, consentono di finalizzare diversi blocchi con un'unica prova di validità. Questo perché il circuito di prova aggrega ricorsivamente più prove di blocco fino a creare un'unica prova finale. L'operatore L2 invia questa prova ricorsiva e, se il contratto la accetta, tutti i blocchi rilevanti verranno finalizzati all'istante. Con le prove ricorsive, aumenta il numero di transazioni ZK-rollup che possono essere finalizzate su Ethereum a intervalli.

### Pro e contro degli ZK-rollup {#zk-rollups-pros-and-cons}

| Pro                                                                                                                                                                                                   | Contro                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Le prove di validità garantiscono la correttezza delle transazioni offchain e impediscono agli operatori di eseguire transazioni di stato non valide.                                                                           | Il costo associato al calcolo e alla verifica delle prove di validità è sostanziale e può aumentare le commissioni per gli utenti del rollup.                                                                            |
| Offre una definitività delle transazioni più rapida poiché gli aggiornamenti di stato vengono approvati una volta che le prove di validità sono verificate su L1.                                                                                              | Costruire ZK-rollup compatibili con EVM è difficile a causa della complessità della tecnologia a conoscenza zero.                                                                                                    |
| Si affida a meccanismi crittografici trustless per la sicurezza, non all'onestà di attori incentivati come con i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | La produzione di prove di validità richiede hardware specializzato, il che potrebbe incoraggiare il controllo centralizzato della catena da parte di poche parti.                                                                    |
| Archivia i dati necessari per recuperare lo stato offchain su L1, il che garantisce sicurezza, resistenza alla censura e decentralizzazione.                                                                       | Gli operatori centralizzati (sequencer) possono influenzare l'ordinamento delle transazioni.                                                                                                                     |
| Gli utenti beneficiano di una maggiore efficienza del capitale e possono prelevare fondi da L2 senza ritardi.                                                                                                           | I requisiti hardware possono ridurre il numero di partecipanti che possono forzare la catena a fare progressi, aumentando il rischio che operatori malintenzionati blocchino lo stato del rollup e censurino gli utenti. |
| Non dipende da assunzioni di liveness e gli utenti non devono convalidare la catena per proteggere i propri fondi.                                                                                              | Alcuni sistemi di prova (ad es. ZK-SNARK) richiedono una configurazione attendibile che, se gestita in modo errato, potrebbe potenzialmente compromettere il modello di sicurezza di uno ZK-rollup.                                                     |
| Una migliore compressione dei dati può aiutare a ridurre i costi di pubblicazione di `calldata` su Ethereum e ridurre al minimo le commissioni del rollup per gli utenti.                                                                             |                                                                                                                                                                                                    |

### Una spiegazione visiva degli ZK-rollup {#zk-video}

Guarda Finematics spiegare gli ZK-rollup:

<VideoWatch slug="rollups-scaling-strategy" startTime="406" />


## Chi sta lavorando a una zkEVM? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM per L2 vs L1</AlertTitle>
<AlertDescription>
I progetti seguenti utilizzano la tecnologia zkEVM per creare rollup di Layer 2. C'è anche una ricerca sull'utilizzo della zkEVM per la [verifica dei blocchi L1](/roadmap/zkevm/), che consentirebbe ai validatori di verificare i blocchi di Ethereum senza rieseguire le transazioni.
</AlertDescription>
</AlertContent>
</Alert>

I progetti che lavorano sulle zkEVM includono:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM è un progetto finanziato dalla Fondazione Ethereum per sviluppare uno ZK-rollup compatibile con EVM e un meccanismo per generare prove di validità per i blocchi di Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _è uno ZK Rollup decentralizzato sulla Mainnet di Ethereum che lavora su una Macchina Virtuale di Ethereum a conoscenza zero (zkEVM) che esegue le transazioni di Ethereum in modo trasparente, inclusi gli smart contract con convalide tramite prove a conoscenza zero._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll è un'azienda guidata dalla tecnologia che lavora alla creazione di una soluzione nativa zkEVM di Layer 2 per Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko è uno ZK-rollup decentralizzato ed equivalente a Ethereum (una [ZK-EVM di Tipo 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era è uno ZK Rollup compatibile con EVM creato da Matter Labs, alimentato dalla propria zkEVM._

- **[Starknet](https://starkware.co/starknet/)** - _Starknet è una soluzione di ridimensionamento di layer 2 compatibile con EVM creata da StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph è una soluzione di ridimensionamento rollup ibrida che utilizza prove ZK per affrontare il problema della sfida di stato del Layer 2._

- **[Linea](https://linea.build)** - _Linea è un Layer 2 zkEVM equivalente a Ethereum creato da ConsenSys, completamente allineato con l'ecosistema Ethereum._

## Ulteriori letture sugli ZK-rollup {#further-reading-on-zk-rollups}

- [Cosa sono i rollup a conoscenza zero?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Cosa sono i rollup a conoscenza zero?](https://alchemy.com/blog/zero-knowledge-rollups)
- [La guida pratica ai rollup di Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARK vs SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Cos'è una zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Tipi di ZK-EVM: equivalenti a Ethereum, equivalenti a EVM, Tipo 1, Tipo 4 e altre parole d'ordine criptiche](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Introduzione alla zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Cosa sono gli L2 ZK-EVM?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Risorse Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARK dietro le quinte](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Come sono possibili gli SNARK?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Tutorial: Privacy e conoscenza zero su Ethereum {#tutorials}

- [Utilizzare la conoscenza zero per uno stato segreto](/developers/tutorials/secret-state/) _– Come utilizzare le prove ZK e i componenti del server offchain per mantenere lo stato di gioco segreto onchain._
- [Utilizzare gli indirizzi stealth](/developers/tutorials/stealth-addr/) _– Come gli indirizzi stealth ERC-5564 consentono trasferimenti anonimi di ETH utilizzando la derivazione della chiave crittografica._
- [Utilizzare Ethereum per l'autenticazione Web2](/developers/tutorials/ethereum-for-web2-auth/) _– Come integrare le firme del portafoglio Ethereum con i sistemi di autenticazione Web2 basati su SAML._