---
title: Rollup zero-knowledge
description: Un'introduzione ai rollup a conoscenza zero, una soluzione di ridimensionamento usata dalla community di Ethereum.
lang: it
---

I rollup a conoscenza zero (rollup ZK) sono [soluzioni di ridimensionamento](/developers/docs/scaling/) di livello 2 che aumentano il volume sulla Rete principale di Ethereum spostando il calcolo e l'archiviazione di stato al di fuori della catena. I rollup ZK possono elaborare migliaia di transazioni in un batch e poi pubblicare solo alcuni dati sommari minimi nella Rete principale. Questi dati sommari definiscono i cambiamenti che dovrebbero essere apportati allo stato di Ethereum e alcune prove crittografiche che tali modifiche siano corrette.

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso la nostra pagina sul [ridimensionamento di Ethereum](/developers/docs/scaling/) e il [livello 2](/layer-2).

## Cosa sono i rollup a conoscenza zero? {#what-are-zk-rollups}

I **rollup a conoscenza zero (rollup ZK)** impacchettano (o 'eseguono il roll up') le transazioni in batch eseguiti al di fuori della catena. Il calcolo off-chain riduce la quantità di dati da pubblicare nella blockchain. Gli operatori del rollup ZK inviano un riepilogo delle modifiche necessarie per rappresentare tutte le transazioni in un batch, piuttosto che inviare individualmente ogni transazione. Inoltre, producono delle [prove di validità](/glossary/#validity-proof) per dimostrare la correttezza delle loro modifiche.

Lo stato del rollup ZK è mantenuto da un contratto intelligente distribuito sulla rete di Ethereum. Per aggiornare questo stato, i nodi del rollup ZK devono inviare una prova di validità per la verifica. Come accennato, la prova di validità è una garanzia crittografica che il cambiamento di stato proposto dal rollup sia realmente il risultato dell'esecuzione dello specifico batch di transazioni. Questo significa che i rollup ZK devono solo fornire le prove di validità per finalizzare le transazioni su Ethereum invece di pubblicare tutti i dati della transazione on-chain come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/).

Spostando i fondi da un rollup ZK a Ethereum non ci sono ritardi perché le transazioni di uscita sono eseguite una volta che il contratto del rollup ZK verifica la prova di validità. Viceversa, il prelievo di fondi dai rollup ottimistici è soggetto a un ritardo per consentire di contestare la transazione di uscita con una [prova di frode](/glossary/#fraud-proof).

I rollup ZK scrivono le transazioni in Ethereum come `calldata`. `calldata` è dove sono archiviati i dati inclusi nelle chiamate esterne alle funzioni del contratto intelligente. Le informazioni in `calldata` sono pubblicate sulla blockchain, consentendo a chiunque di ricostruire lo stato del rollup in modo indipendente. I rollup ZK usano delle tecniche di compressione per ridurre i dati della transazione; ad esempio, i conti sono rappresentati da un indicec, piuttosto che da un indirizzo, risparmiando 28 byte di dati. La pubblicazione dei dati on-chain rappresenta un costo significativo per i rollup, quindi, la compressione dei dati può ridurre le commissioni per gli utenti.

## Come interagiscono i rollup ZK con Ethereum? {#zk-rollups-and-ethereum}

Una catena di rollup ZK è un protocollo esterno alla catena che opera sulla blockchain di Ethereum ed è gestito dai contratti intelligenti sulla catena di Ethereum. I rollup ZK eseguono le transazioni al di fuori della Rete principale, ma impegnano periodicamente batch di transazioni off-chain in un contratto di rollup on-chain. Questo registro di transazioni è immutabile, come la blockchain di Ethereum, e forma la catena di rollup ZK.

L'architettura principale del rollup ZK si compone dei seguenti componenti:

1. **Contratti sulla catena**: come menzionato, il protocollo rollup ZK è controllato da contratti intelligenti eseguiti su Ethereum. Questo include il contratto principale che memorizza i blocchi del rollup, traccia i depositi e monitora gli aggiornamenti di stato. Un altro contratto on-chain (il contratto di verifica) verifica le prove a conoscenza zero inviate dai produttori di blocchi. Dunque, Ethereum serve da livello di base o "livello 1" per il rollup ZK.

2. **Macchina virtuale (VM) off-chain**: benché il protocollo del rollup ZK risieda su Ethereum, l'esecuzione della transazione e l'archiviazione di stato si verificano su una macchina virtuale separata e indipendente dall'[EVM](/developers/docs/evm/). Questa VM off-chain è l'ambiente di esecuzione per le transazioni sul rollup ZK e serve da livello secondario o "livello 2" per il protocollo rollup ZK. Le prove di validità verificate sulla Rete principale di Ethereum garantiscono la correttezza delle transizioni di stato nella VM off-chain.

I rollup ZK sono "soluzioni di ridimensionamento ibride": protocolli off-chain che operano indipendentemente ma derivano la sicurezza da Ethereum. Nello specifico, la rete di Ethereum impone la validità degli aggiornamenti di stato sul rollup ZK e garantisce la disponibilità dei dati dietro ogni aggiornamento allo stato del rollup. Di conseguenza, i rollup ZK sono considerevolmente più sicuri delle soluzioni di ridimensionamento off-chain, come le [sidechain](/developers/docs/scaling/sidechains/), responsabili delle proprie proprietà di sicurezza, o i [validium](/developers/docs/scaling/validiums/), che pur verificando le transazioni su Ethereum con le prove di validità, memorizzano altrove i dati della transazione.

I rollup ZK si affidano al protocollo principale di Ethereum per quanto segue:

### Disponibilità dei dati {#data-availability}

I rollup ZK pubblicano dati di stato per ogni transazione elaborata al di fuori della catena in Ethereum. Con questi dati, è possibile per individui o aziende riprodurre lo stato del rollup e validare la catena da soli. Ethereum rende disponibili questi dati a tutti i partecipanti della rete come `calldata`.

I rollup ZK non necessitano di pubblicare molti dati di transazione sulla catena poiché le prove di validità verificano già l'autenticità delle transizioni di stato. Tuttavia, memorizzare i dati su catena è comunque importante, perché consente la verifica senza permessi e indipendente dello stato della catena del L2, che a sua volta consente a chiunque di inviare batch di transazioni, impedendo agli operatori malevoli di censurare o congelare la catena.

Sulla catena è necessario che gli utenti interagiscano col rollup. Senza l'accesso ai dati di stato, gli utenti non possono richiededre il saldo del proprio conto né avviare transazioni (es., prelievi), che si affidino alle informazioni di stato.

### Finalità della transazione {#transaction-finality}

Ethereum funge da livello di accordo per i rollup ZK: le transazioni del L2 sono finalizzate solo se il contratto del L1 accetta la prova di validità. Questo elimina il rischio che operatori malevoli corrompano la catena (ad es. rubando i fondi del rollup), poiché ogni transazione deve essere approvata sulla Rete principale. Inoltre, Ethereum garantisce che le operazioni degli utenti non siano annullabili una volta finalizzate sul L1.

### Resistenza alla censura {#censorship-resistance}

Gran parte dei rollup ZK usa un "supernodo" (l'operatore) per eseguire le transazioni, produrre batch e inviare blocchi al L1. Se ciò da un lato garantisce efficienza, dall'altro aumenta il rischio di censura: gli operatori malevoli dei rollup ZK possono censurare gli utenti, rifiutandosi di includere le loro transazioni nei batch.

Come misura di sicurezza, i rollup ZK consentono agli utenti di inviare le transazioni direttamente al contratto di rollup sulla Rete principale se pensano di essere stati censurati dall'operatore. Questo consente agli utenti di forzare un'uscita dal rollup ZK a Ethereum senza doversi affidare all'autorizzazione dell'operatore.

## Come funzionano i rollup ZK? {#how-do-zk-rollups-work}

### Transazioni {#transactions}

Gli utenti nel rollup ZK firmano le transazioni e le inviano agli operatori del L2 per l'elaborazione e inclusione nel batch successivo. In alcuni casi, l'operatore è un'entità centralizzata, detta sequenziatore, che esegue le transazioni, le aggrega in batch e le invia al L1. Il sequenziatore, in questo sistema, è l'unica entità autorizzata a produrre blocchi del L2 e aggiungere le transazioni del rollup al contratto del rollup ZK.

Altri rollup ZK potrebbero effettuare la rotazione del ruolo dell'operatore usando una serie di validatori di [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). I potenziali operatori depositano i fondi nel contratto di rollup, con la dimensione di ogni stake che influenza le possibilità che lo staker sia selezionato per produrre il prossimo batch del rollup. Lo stake dell'operatore può essere oggetto di slashing se agisce malevolmente, il che lo incentiva a pubblicare blocchi validi.

#### Come i rollup ZK pubblicano i dati delle transazioni su Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Come spiegato, i dati della transazione sono pubblicati su Ethereum come `calldata`. `calldata` è un'area di dati in un contratto intelligente, usata per passare gli argomenti a una funzione e si comporta similmente alla [memoria](/developers/docs/smart-contracts/anatomy/#memory). Benché i `calldata` non siano memorizzati come parte dello stato di Ethereum, persistono sulla catena come [registri storici](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) della catena di Ethereum. `calldata` non influenza lo stato di Ethereum, il che la rende un metodo economico per memorizzare i dati su catena.

La parola chiave `calldata` identifica spesso il metodo del contratto intelligente chiamato da una transazione e trattiene gli input del metodo sotto forma di una sequenza arbitraria di byte. I rollup ZK usano `calldata` per pubblicare i dati di transazione compressi sulla catena; l'operatore del rollup aggiunge semplicemente un nuovo batch chiamando la funzione necessaria nel contratto di rollup e passa i dati compressi come argomenti della funzione. Questo aiuta a ridurre i costi per gli utenti poiché gran parte delle commissioni del rollup vanno verso la memorizzazione dei dati della transazione su catena.

### Impegni di stato {#state-commitments}

Lo stato del rollup ZK, che include conti e saldi del L2, è rappresentato come un [albero di Merkle](/whitepaper/#merkle-trees). Un hash crittografico della radice dell'albero di Merkle (radice di Merkle) è memorizzato nel contratto on-chain, consentendo al protocollo di rollup di tracciare le modifiche allo stato del rollup ZK.

Il rollup transita a un nuovo stato dopo l'esecuzione di una nuova serie di transazioni. L'operatore che ha avviato la transizione di stato deve calcolare una nuova radice di stato e inviarla al contratto on-chain. Se la prova di validità associata al batch è autenticata dal contratto di verifica, la nuova radice di Merkle diventa la radice di stato canonica del rollup ZK.

Oltre a calcolare le radici di stato, l'operatore del rollup ZK crea inoltre una radice del batch, la radice di un albero di Merkle che comprende tutte le transazioni in un batch. Quando viene inviato un nuovo batch, il contratto di rollup memorizza la radice del batch, consentendo agli utenti di provare che una transazione (ad es. una richiesta di prelievo) sia stata inclusa nel batch. Gli utenti dovranno fornire i dettagli della transazione, la radice del batch e una [prova di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) che mostri il percorso d'inclusione.

### Prove di validità {#validity-proofs}

La nuova radice di stato che l'operatore del rollup ZK invia al contratto del L1 è il risultato degli aggiornamenti allo stato del rollup. Diciamo che Alice invia 10 token a Bob, l'operatore semplicemente riduce il saldo di Alice di 10 e aumenta il saldo di Bob di 10. Poi, l'operatore esegue l'hashing dei dati del conto aggiornati, ricostruisce l'albero di Merkle del rollup e invia la nuova radice di Merkle al contratto su catena.

Ma il contratto del rollup non accetterà automaticamente l'impegno di stato proposto finché l'operatore non proverà che la nuova radice di Merkle risultava dagli aggiornamenti allo stato del rollup corretti. L'operatore del rollup ZK lo fa producendo una prova di validità, un impegno crittografico succinto che verifica la correttezza delle transazioni raggruppate.

Le prove di validità consentono alle parti di provare la correttezza di una istruzione senza rivelarla, per questo sono anche dette prove a conoscenza zero. I rollup ZK usano le prove di validità per confermare la correttezza delle transizioni di stato off-chain, senza dover eseguire di nuovo le transazioni su Ethereum. Queste prove possono assumere la forma di uno [ZK-SNARK](https://arxiv.org/abs/2202.06877) (argomento di conoscenza succinto non interattivo a conoscenza zero) o di uno [ZK-STARK](https://eprint.iacr.org/2018/046) (argomento di conoscenza trasparente e scalabile a conoscenza zero).

Sia gli SNARK che gli STARK aiutano ad attestare all'integrità del calcolo off-chain nei rollup ZK, sebbene ogni tipo di prova abbia funzionalità distinte.

**ZK-SNARK**

Perché il protocollo ZK-SNARK funzioni, è necessario creare una Stringa di riferimento comune (CRS): la CRS fornisce i parametri pubblici per provare e verificare le prove di validità. La sicurezza del sistema di prova dipende dalla configurazione della CRS; se le informazioni usate per creare i parametri pubblici finiscono nelle mani di utenti malevoli, potrebbero generare prove di validità false.

Alcuni rollup ZK tentano di risolvere questo problema usando una [cerimonia di calcolo multi-parte(MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), coinvolgendo individui fidati, per generare i parametri pubblici per il circuito ZK-SNARK. Ogni parte apporta una certa casualità (detta "rifiuti tossici") alla costruzione della CRS, che deve distruggere immediatamente.

Le configurazioni attendibili sono usate perché aumentano la sicurezza della configurazione della CRS. Finché un partecipante onesto distrugge il proprio input, la sicurezza del sistema ZK-SNARK è garantita. Tuttavia, questo approccio richiede comunque di fidarsi del fatto che i soggetti coinvolti elimineranno la loro casualità e non comprometteranno le garanzie di sicurezza del sistema.

Ipotesi di fiducia a parte, gli ZK-SNARK sono popolari per le prove di piccole dimensioni e la verifica costante. Poiché la verifica della prova sul L1 costituisce il costo maggiore della gestione di un rollup ZK, gli L2 usano gli ZK-SNARK per generare prove verificabili in modo rapido ed economico sulla Rete principale.

**ZK-STARK**

Come gli ZK-SNARK, gli ZK-STARK provano la validità del calcolo off-chain senza rilevare gli input. Tuttavia, gli ZK-STARK sono considerati un miglioramento degli ZK-SNARK per la loro scalabilità e trasparenza.

Gli ZK-STARK sono "trasparenti", potendo lavorare senza la configurazione attendibile di una stringa di riferimento comune (CRS). Invece, gli ZK-STARK si affidano alla casualità verificabile pubblicamente per configurare i parametri per generare e verificare le prove.

Gli ZK-STARK forniscono inoltre una maggiore scalabilità perché il tempo necessario per provare e verificare le prove di validità aumenta _quasi linearmente_ rispetto alla complessità del calcolo sottostante. Con gli ZK-SNARK, la prova e la verifica dei tempi scalano _linearmente_ in rapporto alle dimensioni del calcolo sottostante. Questo significa che gli ZK-STARK richiedono meno tempo degli ZK-SNARK per provare e verificare quando sono coinvolti grandi serie di dati, rendendoli utili per le applicazioni a volume elevato.

Gli ZK-STARK proteggono inoltre dai computer quantistici, mentre è opinione diffusa che la Crittografia a curva ellittica (ECC) usata negli ZK-SNARK sia suscettibile agli attacchi di calcolo quantistico. Lo svantaggio degli ZK-STARK è che producono prove di dimensioni maggiori, che sono più costose da verificare su Ethereum.

#### Come funzionano le prove di validità nei rollup ZK? {#validity-proofs-in-zk-rollups}

##### Generazione della prova

Prima di accettare le transazioni, l'operatore eseguirà i soliti controlli. Questo include confermare che:

- I conti del mittente e del destinatario sono parte dell'albero di stato.
- Il mittente abbia abbastanza fondi per procedere con la transazione.
- La transazione sia corretta e corrisponda alla chiave pubblica del mittente sul rollup.
- Il nonce del mittente sia corretto, ecc.

Una volta che il nodo del rollup ZK ha abbastanza transazioni, le aggrega in un batch e compila gli input per il circuito di prova da compilare in una prova "piccola" ZK. Questo include:

- La radice di una albero di Merkel che comprende tutte le transazioni nel gruppo.
- Le prove di Merkle per le transazioni per provare l'inclusione nel batch.
- Prove di Merkle per ogni coppia mittente-destinatario nelle transazioni, per provare che questi conti facciano parte dell'albero di stato del rollup.
- Una serie di radici di stato intermedie, derivate dall'aggiornamento della radice di stato dopo l'applicazione degli aggiornamenti di stato per ogni transazione (cioè, la riduzione dei conti dei mittente e l'aumento dei conti dei destinatari).

Il circuito di prova calcola la prova di validità eseguendo a "ciclo" ogni transazione ed eseguendo gli stessi controlli che l'operatore ha completato prima di elaborare la transazione. Prima, verifica che il conto del mittente sia parte della radice di stato, utilizzando la prova di Merkle fornita. Poi, riduce il saldo del mittente, ne aumenta il nonce, esegue l'hashing dei dati aggiornati del conto e li combina con la prova di Merkle per generare una nuova radice di Merkle.

Questa radice di Merkle riflette il solo cambiamento nello stato del rollup ZK: un cambiamento nel saldo e nel nonce del mittente. Ciò è possibile perché la prova di Merkle, usata per provare l'esistenza del conto, è usata per derivare la nuova radice di stato.

Il circuito di prova esegue lo stesso processo sul conto del destinatario. Verifica se il conto del destinatario esiste sotto la radice di stato intermedia (usando la prova di Merkle), ne aumenta il saldo, esegue nuovamente l'hashing dei dati e li combina con la prova di Merkle per generare una nuova radice di stato.

Il processo si ripete per ogni transazione; ogni "ciclo" crea una nuova radice di stato dall'aggiornamento del conto del mittente e una successiva nuova radice dall'aggiornamento del conto del destinatario. Come spiegato, ogni aggiornamento alla radice di stato rappresenta il cambiamento di una parte dell'albero di stato del rollup.

Il circuito di prova ZK itera l'intero batch di transazioni, verificando la sequenza di aggiornamenti risultante in una radice di stato finale dopo l'esecuzione dell'ultima transazione. L'ultima radice di Merkle calcolata diventa la più recente radice di stato canonica del rollup ZK.

##### Verifica della prova

Dopo che il circuito di prova verifica la correttezza degli aggiornamenti di stato, l'operatore del L2 invia la prova di validità calcolata al contratto di verifica sul L1. Il circuito di verifica del contratto verifica la validità della prova oltre a controllare gli input pubblici che formano parte della prova:

- **Radice di pre-stato**: la vecchia radice di stato del rollup ZK (cioè, prima dell'esecuzione delle transazioni raggruppate) che riflette l'ultimo stato valido noto della catena del L2.

- **Radice di post-stato**: la nuova radice di stato del rollup ZK (cioè, dopo l'esecuzione delle transazioni raggruppate) che riflette lo stato più recente della catena del L2. La radice di post-stato è la radice finale derivata dopo aver applicato gli aggiornamenti di stato nel circuito di prova.

- **Radice del batch**: la radice di Merkle del batch, derivata dalla _merklizzazione_ delle transazioni nel batch e dell'hashing della radice dell'albero.

- **Input della transazione**: dati associati alle transazioni eseguite come parte del batch inviato.

Se la prova soddisfa il circuito (cioè è valida), significa che esiste una sequenza di transazioni valide che fa transitare il rollup dallo stato precedente (con fingerprint crittografica dalla radice di pre-stato) a uno nuovo (con fingerprint crittografica dalla radice di post-stato). Se la radice di pre-stato corrisponde a quella memorizzata nel contratto di rollup e la prova è valida, il contratto di rollup prende la radice di post-stato dalla prova e aggiorna il suo albero di stato per riflettere lo stato cambiato del rollup.

### Entrate e uscite {#entries-and-exits}

Gli utenti entrano nel rollup ZK depositando i token nel contratto di rollup distribuito sulla catena del L1. Questa transazione è accodata poiché solo gli operatori possono inviare le transazioni al contratto di rollup.

Se la coda di depositi in sospeso inizia a riempirsi, l'operatore del rollup ZK prenderà le transazioni di deposito e le invierà al contratto del rollup. Una volta che i suoi fondi sono nel rollup, l'utente può iniziare a eseguire transazioni inviando le transazioni all'operatore per l'elaborazione. Gli utenti possono verificare i saldi sul rollup eseguendo l'hashing dei dati del loro conto, inviando l'hash al contratto di rollup e fornendo una prova di Merkle per verificare rispetto alla radice di stato corrente.

Il prelievo da un rollup ZK al L1 è semplice. L'utente avvia la transazione d'uscita, inviando le proprie risorse sul rollup a un conto specificato, per bruciarle. Se l'operatore include la transazione nel batch successivo, l'utente può inviare una richiesta di prelievo al contratto on-chain. Questa richiesta di prelievo includerà quanto segue:

- Prova di Merkle che dimostra l'inclusione della transazione dell'utente al conto di bruciatura nel gruppo di transazioni

- Dati di transazione

- Radice del batch

- Indirizzo del L1 per ricevere i fondi depositati

Il contratto di rollup esegue l'hashing dei dati di transazione, verifica l'esistenza della radice del batch e usa la prova di Merkle per verificare se l'hash della transazione è parte della radice del batch. Dopodiché, il contratto esegue la transazione di uscita e invia i fondi all'indirizzo scelto dall'utente sul L1.

## Rollup ZK e compatibilità con l'EVM {#zk-rollups-and-evm-compatibility}

A differenza dei rollup ottimistici, i rollup ZK non sono facilmente compatibili con la [Macchina Virtuale di Ethereum (EVM)](/developers/docs/evm/). Fornire calcoli dell'EVM a scopo generale nei circuiti è più difficile e ha uso di risorse più elevato che dimostrare calcoli semplici (come il trasferimento di token descritto precedentemente).

Tuttavia, i [progressi nella tecnologia a conoscenza zero](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) stanno accendendo un rinnovato interesse verso l'avvolgimento dei calcoli dell'EVM nelle prove a conoscenza zero. Questi sforzi sono orientati alla creazione dell'implementazione di un'EVM a conoscenza zero (zkEVM) che possa verificare efficientemente la correttezza dell'esecuzione del programma. Una zkEVM ricrea gli opcode esistenti dell'EVM per la prova/verifica nei circuiti, consentendo l'esecuzione dei contratti intelligenti.

Come l'EVM, una zkEVM transita tra gli stati dopo che il calcolo è eseguito su alcuni input. La differenza è che la zkEVM crea anche prove a conoscenza zero per verificare la correttezza di ogni passaggio nell'esecuzione del programma. Le prove di validità potrebbero verificare la correttezza delle operazioni che toccano lo stato della VM (memoria, stack, archiviazione) e il calcolo stesso (cioè, l'operazione ha chiamato gli opcode esatti e li ha eseguiti correttamente?).

L'introduzione dei rollup ZK compatibili con l'EVM è prevista per aiutare gli sviluppatori a sfruttare le garanzie di scalabilità e sicurezza delle prove a conoscenza zero. Ancora più importante, la compatibilità con l'infrastruttura nativa di Ethereum fa sì che gli sviluppatori possano creare dApp con funzionalità ZK usando strumenti e linguaggi familiari (e collaudati).

## Come funzionano le commissioni del rollup ZK? {#how-do-zk-rollup-fees-work}

Quanto gli utenti pagano per le transazioni sui rollup ZK, dipende dalla commissione del gas, proprio come sulla Rete Principale di Ethereum. Tuttavia, le commissioni sul gas funzionano diversamente sul L2 e sono influenzate dai seguenti costi:

1. **Scrittura di stato**: esiste un costo fisso per scrivere allo stato di Ethereum (cioè, inviare una transazione alla blockchain di Ethereum). I rollup ZK riducono questo costo raggruppando le transazioni e distribuendo i costi fissi per più utenti.

2. **Pubblicazione dei dati**: i rollup ZK pubblicano i dati di stato per ogni transazione in Ethereum come `calldata`. I costi di `calldata` sono correntemente disciplinati dall'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), che stipola un costo di 16 gas per i byte diversi da zero e di 4 gas per i byte zero di `calldata`, rispettivamente. Il costo pagato su ogni transazione è influenzato dalla quantità di `calldata` da pubblicare sulla catena per essa.

3. **Commissioni dell'operatore del L2**: questo è l'importo pagato all'operatore del rollup come compenso per i costi di calcolo sostenuti nell'elaborazione delle transazioni, proprio come le ["commissioni prioritarie (mance)" della transazione](/developers/docs/gas/#how-are-gas-fees-calculated) sulla Rete Principale di Ethereum.

4. **Generazione e verifica della prova**: gli operatori del rollup ZK devono produrre prove di validità per i batch di transazioni, il che impiega molte risorse. Anche verificare le prove a conoscenza zero sulla Rete Principale costa del gas (circa 500.000 gas).

Oltre a raggruppare le transazioni, i rollup ZK riducono le commissioni per gli utenti comprimendo i dati della transazione. Puoi [vedere una panoramica in tempo reale](https://l2fees.info/) di quanto costa usare i rollup ZK di Ethereum.

## Come fanno i rollup ZK a ridimensionare Ethereum? {#scaling-ethereum-with-zk-rollups}

### Compressione dei dati della transazione {#transaction-data-compression}

I rollup ZK estendono il volume sul livello di base di Ethereum portando il calcolo al di fuori della catena, ma la vera spinta per il ridimensionamento proviene dalla compressione dei dati delle transazioni. La [dimensione del blocco](/developers/docs/blocks/#block-size) di Ethereum limita i dati che ogni blocco può contenere e, di conseguenza, il numero di transazioni elaborate per blocco. Comprimendo i dati correlati alle transazioni, i rollup ZK aumentano significativamente il numero di transazioni elaborate per blocco.

I rollup ZK possono comprimere i dati di transazione meglio dei rollup ottimistici, poiché non devono pubblicare tutti i dati richiesti per validare ogni transazione. Devono solo pubblicare i dati minimi richiesti per ricostruire l'ultimo stato dei conti e saldi sul rollup.

### Prove ricorsive {#recursive-proofs}

Un vantaggio delle prove a conoscenza zero è che le prove possono verificare altre prove. Ad esempio, uno ZK-SNARK singolo può verificare altri ZK-SNARK. Tale "prova delle prove" è detta prova ricorsiva e aumenta drasticamente il volume sui rollup ZK.

Attualmente le prove di validità sono generate blocco per blocco e inviate al contratto del L1 per la verifica. Tuttavia, verificare singole prove di blocco limita il volume che i rollup ZK possono ottenere poiché solo un blocco può essere finalizzato quando l'operatore invia una prova.

Le prove ricorsive, invece, permettono di finalizzare diversi blocchi con una sola prova di validità. Questo perché il circuito di prova aggrega ricorsivamente svariate prove di blocco finché non viene creata una prova finale. L'operatore del L2 invia questa prova ricorsiva e, se il contratto la accetta, tutti i blocchi pertinenti saranno finalizzati istantaneamente. Con le prove ricorsive, il numero di transazioni del rollup ZK finalizzabili su Ethereum a intervalli aumenta.

### Pro e contro dei rollup ZK {#zk-rollups-pros-and-cons}

| Pro                                                                                                                                                                                                                | Contro                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Le prove di validità assicurano la correttezza delle transazioni off-chain e impediscono agli operatori di eseguire le transizioni di stato non valide.                                                            | Il costo associato al calcolo e alla verifica delle prove di validità è sostanziale e può aumentare le commissioni per gli utenti del rollup.                                                                            |
| Offre una finalità della transazione più veloce in quanto gli aggiornamenti di stato sono approvati quando le prove di validità sono verificate sul L1.                                                            | Creare rollup ZK compatibili con l'EVM è difficile a causa della complessità della tecnologia a conoscenza zero.                                                                                                         |
| Si basa su meccanismi crittografici senza fiducia per la sicurezza, non sull'onestà degli attori incentivati come nei [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Produrre le prove di validità richiede hardware specializzato, che potrebbe incoraggiare il controllo centralizzato della catena da alcune parti.                                                                        |
| Memorizza i dati necessari a recuperare lo stato off-chain sul L1, garantendo sicurezza, resistenza alla censura e decentralizzazione.                                                                             | Gli operatori centralizzati (sequenziatori) possono influenzare l'ordine delle transazioni.                                                                                                                              |
| Gli utenti beneficiano di una maggiore efficienza del capitale e possono prelevare fondi dal L2 senza ritardi.                                                                                                     | I requisiti hardware potrebbero ridurre il numero di partecipanti che possono forzare la catena a fare progressi, aumentando il rischio che gli operatori malevoli congelino lo stato del rollup e censurino gli utenti. |
| Non dipende dalle ipotesi di liveness e gli utenti non devono validare la catena per proteggere i propri fondi.                                                                                                    | Alcuni sistemi di prova (es. ZK-SNARK) richiedono una configurazione attendibile che, se mal gestita, potrebbe potenzialmente compromettere il modello di sicurezza di un rollup ZK.                                     |
| Una migliore compressione dei dati può aiutare a ridurre i costi della pubblicazione di `calldata` su Ethereum e minimizzare le commissioni del rollup per gli utenti.                                             |                                                                                                                                                                                                                          |

### Una spiegazione grafica dei rollup ZK {#zk-video}

Guarda Finematics spiegare i rollup ZK:

<YouTube id="7pWxCklcNsU" start="406" />

## Chi sta lavorando a una zkEVM? {#zkevm-projects}

I progetti che stanno lavorando alle zkEVM includono:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM è un progetto finanziato dalla Ethereum Foundation per sviluppare un rollup ZK compatibile con l'EVM e un meccanismo per generare prove di validità per i blocchi di Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _ è un Rollup ZK decentralizzato sulla rete principale di Ethereum che opera su una Macchina Virtuale di Ethereum a conoscenza zero (zkEVM) che esegue le transazioni di Ethereum in modo trasparente, includendo contratti intelligenti con validazioni di prova a conoscenza zero._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll è un'azienda orientata alla tecnologia che sta lavorando alla creazione di una Soluzione di Livello 2 dello zkEVM nativa per Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko è un rollup ZK decentralizzato ed equivalente a Ethereum (un [ZK-EVM di Tipo 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)**: _ZKsync Era è un Rollup ZK compatibile con l'EVM creato da Matter Labs, basato sulla propria zkEVM._

- **[StarkNet](https://starkware.co/starknet/)**. _StarkNet è una soluzione di ridimensionamento del livello 2 compatibile con l'EVM, creata da StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph è una soluzione di ridimensionamento dei rollup ibrida che utilizza le prove ZK per risolvere i problemi di dimostrazione dello stato dei livelli 2._

## Ulteriori letture sui rollup ZK {#further-reading-on-zk-rollups}

- [What Are Zero-Knowledge Rollups?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [What are zero-knowledge rollups?](https://alchemy.com/blog/zero-knowledge-rollups)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [What is a zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Tipi di ZK-EVM: equivalente a Ethereum, equivalente all'EVM, Tipo 1, Tipo 4 e altre parole chiave criptiche](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Intro to zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Awesome-zkEVM resources](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKS under the hood](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [How are SNARKs possible?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
