---
title: Rollup a conoscenza zero
description: "Un'introduzione ai rollup a conoscenza zero, una soluzione di scalabilità utilizzata dalla community di Ethereum."
lang: it
---

I rollup a conoscenza zero (ZK-rollup) sono soluzioni di [scalabilità](/developers/docs/scaling/) di [livello 2](/layer-2) che aumentano il throughput sulla rete principale di [Ethereum](/) spostando il calcolo e l'archiviazione dello stato fuori catena. I rollup a conoscenza zero possono elaborare migliaia di transazioni in un lotto (batch) e poi pubblicare solo alcuni dati riassuntivi minimi sulla rete principale. Questi dati riassuntivi definiscono le modifiche che dovrebbero essere apportate allo stato di Ethereum e alcune prove crittografiche che tali modifiche sono corrette.

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso la nostra pagina sulla [scalabilità di Ethereum](/developers/docs/scaling/) e sul [livello 2](/layer-2).

## Cosa sono i rollup a conoscenza zero? {#what-are-zk-rollups}

I **rollup a conoscenza zero (ZK-rollup)** raggruppano (o 'arrotolano') le transazioni in lotti che vengono eseguiti fuori catena. Il calcolo fuori catena riduce la quantità di dati che deve essere pubblicata sulla blockchain. Gli operatori degli ZK-rollup inviano un riepilogo delle modifiche necessarie per rappresentare tutte le transazioni in un lotto anziché inviare ogni transazione individualmente. Producono anche [prove di validità](/glossary/#validity-proof) per dimostrare la correttezza delle loro modifiche.

Lo stato dello ZK-rollup è mantenuto da un contratto intelligente distribuito sulla rete Ethereum. Per aggiornare questo stato, i nodi dello ZK-rollup devono inviare una prova di validità per la verifica. Come accennato, la prova di validità è una garanzia crittografica che il cambiamento di stato proposto dal rollup sia realmente il risultato dell'esecuzione del lotto di transazioni fornito. Ciò significa che i rollup a conoscenza zero devono solo fornire prove di validità per finalizzare le transazioni su Ethereum invece di pubblicare tutti i dati delle transazioni on-chain come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/).

Non ci sono ritardi nello spostamento di fondi da uno ZK-rollup a Ethereum perché le transazioni di uscita vengono eseguite una volta che il contratto dello ZK-rollup verifica la prova di validità. Al contrario, il prelievo di fondi dai rollup ottimistici è soggetto a un ritardo per consentire a chiunque di contestare la transazione di uscita con una [prova di frode](/glossary/#fraud-proof).

I rollup a conoscenza zero scrivono le transazioni su Ethereum come `calldata`. `calldata` è dove vengono archiviati i dati inclusi nelle chiamate esterne alle funzioni del contratto intelligente. Le informazioni in `calldata` sono pubblicate sulla blockchain, consentendo a chiunque di ricostruire lo stato del rollup in modo indipendente. I rollup a conoscenza zero utilizzano tecniche di compressione per ridurre i dati delle transazioni: ad esempio, gli account sono rappresentati da un indice anziché da un indirizzo, il che fa risparmiare 28 byte di dati. La pubblicazione dei dati on-chain è un costo significativo per i rollup, quindi la compressione dei dati può ridurre le commissioni per gli utenti.

## Come interagiscono i rollup a conoscenza zero con Ethereum? {#zk-rollups-and-ethereum}

Una catena ZK-rollup è un protocollo fuori catena che opera sopra la blockchain di Ethereum ed è gestito da contratti intelligenti di Ethereum on-chain. I rollup a conoscenza zero eseguono transazioni al di fuori della rete principale, ma inviano periodicamente lotti di transazioni fuori catena a un contratto di rollup on-chain. Questo registro delle transazioni è immutabile, in modo molto simile alla blockchain di Ethereum, e forma la catena ZK-rollup.

L'architettura principale dello ZK-rollup è composta dai seguenti componenti:

1. **Contratti on-chain**: Come accennato, il protocollo ZK-rollup è controllato da contratti intelligenti in esecuzione su Ethereum. Questo include il contratto principale che archivia i blocchi del rollup, traccia i depositi e monitora gli aggiornamenti di stato. Un altro contratto on-chain (il contratto verificatore) verifica le prove a conoscenza zero inviate dai produttori di blocchi. Pertanto, Ethereum funge da livello di base o "livello 1" per lo ZK-rollup.

2. **Macchina virtuale (VM) fuori catena**: Sebbene il protocollo ZK-rollup risieda su Ethereum, l'esecuzione delle transazioni e l'archiviazione dello stato avvengono su una macchina virtuale separata e indipendente dalla [EVM](/developers/docs/evm/). Questa VM fuori catena è l'ambiente di esecuzione per le transazioni sullo ZK-rollup e funge da livello secondario o "livello 2" per il protocollo ZK-rollup. Le prove di validità verificate sulla rete principale di Ethereum garantiscono la correttezza delle transizioni di stato nella VM fuori catena.

I rollup a conoscenza zero sono "soluzioni di scalabilità ibride": protocolli fuori catena che operano in modo indipendente ma derivano la sicurezza da Ethereum. Nello specifico, la rete Ethereum applica la validità degli aggiornamenti di stato sullo ZK-rollup e garantisce la disponibilità dei dati dietro ogni aggiornamento allo stato del rollup. Di conseguenza, i rollup a conoscenza zero sono notevolmente più sicuri delle pure soluzioni di scalabilità fuori catena, come le [catene laterali](/developers/docs/scaling/sidechains/), che sono responsabili delle proprie proprietà di sicurezza, o i [validium](/developers/docs/scaling/validium/), che verificano anch'essi le transazioni su Ethereum con prove di validità, ma archiviano i dati delle transazioni altrove.

I rollup a conoscenza zero si affidano al protocollo principale di Ethereum per quanto segue:

### Disponibilità dei dati {#data-availability}

I rollup a conoscenza zero pubblicano i dati di stato per ogni transazione elaborata fuori catena su Ethereum. Con questi dati, è possibile per individui o aziende riprodurre lo stato del rollup e convalidare la catena da soli. Ethereum rende questi dati disponibili a tutti i partecipanti della rete come `calldata`.

I rollup a conoscenza zero non hanno bisogno di pubblicare molti dati delle transazioni on-chain perché le prove di validità verificano già l'autenticità delle transizioni di stato. Tuttavia, l'archiviazione dei dati on-chain è ancora importante perché consente una verifica indipendente e senza permessi dello stato della catena di livello 2, che a sua volta consente a chiunque di inviare lotti di transazioni, impedendo a operatori malintenzionati di censurare o bloccare la catena.

L'on-chain è necessario affinché gli utenti possano interagire con il rollup. Senza accesso ai dati di stato, gli utenti non possono interrogare il saldo del proprio account o avviare transazioni (ad es. prelievi) che si basano sulle informazioni di stato.

### Finalità della transazione {#transaction-finality}

Ethereum funge da livello di regolamento per i rollup a conoscenza zero: le transazioni di livello 2 vengono finalizzate solo se il contratto di livello 1 accetta la prova di validità. Ciò elimina il rischio che operatori malintenzionati corrompano la catena (ad es. rubando i fondi del rollup) poiché ogni transazione deve essere approvata sulla rete principale. Inoltre, Ethereum garantisce che le operazioni degli utenti non possano essere annullate una volta finalizzate sul livello 1.

### Resistenza alla censura {#censorship-resistance}

La maggior parte dei rollup a conoscenza zero utilizza un "supernodo" (l'operatore) per eseguire transazioni, produrre lotti e inviare blocchi al livello 1. Sebbene ciò garantisca l'efficienza, aumenta il rischio di censura: gli operatori malintenzionati degli ZK-rollup possono censurare gli utenti rifiutandosi di includere le loro transazioni nei lotti.

Come misura di sicurezza, i rollup a conoscenza zero consentono agli utenti di inviare transazioni direttamente al contratto del rollup sulla rete principale se ritengono di essere censurati dall'operatore. Ciò consente agli utenti di forzare un'uscita dallo ZK-rollup verso Ethereum senza dover fare affidamento sul permesso dell'operatore.

## Come funzionano i rollup a conoscenza zero? {#how-do-zk-rollups-work}

### Transazioni {#transactions}

Gli utenti nello ZK-rollup firmano le transazioni e le inviano agli operatori di livello 2 per l'elaborazione e l'inclusione nel lotto successivo. In alcuni casi, l'operatore è un'entità centralizzata, chiamata sequenziatore, che esegue le transazioni, le aggrega in lotti e le invia al livello 1. Il sequenziatore in questo sistema è l'unica entità autorizzata a produrre blocchi di livello 2 e ad aggiungere transazioni di rollup al contratto dello ZK-rollup.

Altri rollup a conoscenza zero possono ruotare il ruolo dell'operatore utilizzando un set di validatori [prova di stake](/developers/docs/consensus-mechanisms/pos/). I potenziali operatori depositano fondi nel contratto del rollup, con la dimensione di ogni stake che influenza le possibilità dello staker di essere selezionato per produrre il lotto di rollup successivo. Lo stake dell'operatore può essere punito se agisce in modo dannoso, il che lo incentiva a pubblicare blocchi validi.

#### Come i rollup a conoscenza zero pubblicano i dati delle transazioni su Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Come spiegato, i dati delle transazioni vengono pubblicati su Ethereum come `calldata`. `calldata` è un'area dati in un contratto intelligente utilizzata per passare argomenti a una funzione e si comporta in modo simile alla [memoria](/developers/docs/smart-contracts/anatomy/#memory). Sebbene `calldata` non sia archiviato come parte dello stato di Ethereum, persiste on-chain come parte dei [registri storici](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) della catena di Ethereum. `calldata` non influisce sullo stato di Ethereum, rendendolo un modo economico per archiviare dati on-chain.

La parola chiave `calldata` identifica spesso il metodo del contratto intelligente chiamato da una transazione e contiene gli input al metodo sotto forma di una sequenza arbitraria di byte. I rollup a conoscenza zero utilizzano `calldata` per pubblicare dati di transazione compressi on-chain; l'operatore del rollup aggiunge semplicemente un nuovo lotto chiamando la funzione richiesta nel contratto del rollup e passa i dati compressi come argomenti della funzione. Questo aiuta a ridurre i costi per gli utenti poiché gran parte delle commissioni del rollup è destinata all'archiviazione dei dati delle transazioni on-chain.

### Impegni di stato {#state-commitments}

Lo stato dello ZK-rollup, che include account e saldi di livello 2, è rappresentato come un [albero di Merkle](/whitepaper/#merkle-trees). Un hash crittografico della radice dell'albero di Merkle (radice di Merkle) è archiviato nel contratto on-chain, consentendo al protocollo di rollup di tracciare le modifiche nello stato dello ZK-rollup.

Il rollup passa a un nuovo stato dopo l'esecuzione di un nuovo set di transazioni. L'operatore che ha avviato la transizione di stato è tenuto a calcolare una nuova radice di stato e a inviarla al contratto on-chain. Se la prova di validità associata al lotto viene autenticata dal contratto verificatore, la nuova radice di Merkle diventa la radice di stato canonica dello ZK-rollup.

Oltre a calcolare le radici di stato, l'operatore dello ZK-rollup crea anche una radice del lotto: la radice di un albero di Merkle che comprende tutte le transazioni in un lotto. Quando viene inviato un nuovo lotto, il contratto del rollup archivia la radice del lotto, consentendo agli utenti di dimostrare che una transazione (ad es. una richiesta di prelievo) è stata inclusa nel lotto. Gli utenti dovranno fornire i dettagli della transazione, la radice del lotto e una [prova di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) che mostri il percorso di inclusione.

### Prove di validità {#validity-proofs}

La nuova radice di stato che l'operatore dello ZK-rollup invia al contratto di livello 1 è il risultato degli aggiornamenti allo stato del rollup. Supponiamo che Alice invii 10 token a Bob, l'operatore diminuisce semplicemente il saldo di Alice di 10 e incrementa il saldo di Bob di 10. L'operatore esegue quindi l'hash dei dati dell'account aggiornati, ricostruisce l'albero di Merkle del rollup e invia la nuova radice di Merkle al contratto on-chain.

Ma il contratto del rollup non accetterà automaticamente l'impegno di stato proposto finché l'operatore non dimostrerà che la nuova radice di Merkle è il risultato di aggiornamenti corretti allo stato del rollup. L'operatore dello ZK-rollup lo fa producendo una prova di validità, un impegno crittografico succinto che verifica la correttezza delle transazioni raggruppate.

Le prove di validità consentono alle parti di dimostrare la correttezza di un'affermazione senza rivelare l'affermazione stessa: per questo motivo, sono anche chiamate prove a conoscenza zero. I rollup a conoscenza zero utilizzano prove di validità per confermare la correttezza delle transizioni di stato fuori catena senza dover rieseguire le transazioni su Ethereum. Queste prove possono assumere la forma di uno [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) o di uno [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

Sia gli SNARK che gli STARK aiutano ad attestare l'integrità del calcolo fuori catena nei rollup a conoscenza zero, sebbene ogni tipo di prova abbia caratteristiche distintive.

**ZK-SNARK**

Affinché il protocollo ZK-SNARK funzioni, è necessario creare una Common Reference String (CRS): la CRS fornisce parametri pubblici per dimostrare e verificare le prove di validità. La sicurezza del sistema di prova dipende dalla configurazione della CRS; se le informazioni utilizzate per creare i parametri pubblici cadono in possesso di attori malintenzionati, questi potrebbero essere in grado di generare false prove di validità.

Alcuni rollup a conoscenza zero tentano di risolvere questo problema utilizzando una [cerimonia di calcolo multipartecipante (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), che coinvolge individui fidati, per generare parametri pubblici per il circuito ZK-SNARK. Ogni parte contribuisce con una certa casualità (chiamata "rifiuto tossico") alla costruzione della CRS, che deve distruggere immediatamente.

Le configurazioni fidate vengono utilizzate perché aumentano la sicurezza della configurazione della CRS. Finché un partecipante onesto distrugge il proprio input, la sicurezza del sistema ZK-SNARK è garantita. Tuttavia, questo approccio richiede di fidarsi del fatto che le persone coinvolte eliminino la loro casualità campionata e non compromettano le garanzie di sicurezza del sistema.

A parte le ipotesi di fiducia, gli ZK-SNARK sono popolari per le loro dimensioni ridotte delle prove e per la verifica in tempo costante. Poiché la verifica delle prove sul livello 1 costituisce il costo maggiore per l'operatività di uno ZK-rollup, i livelli 2 utilizzano gli ZK-SNARK per generare prove che possono essere verificate in modo rapido ed economico sulla rete principale.

**ZK-STARK**

Come gli ZK-SNARK, gli ZK-STARK dimostrano la validità del calcolo fuori catena senza rivelare gli input. Tuttavia, gli ZK-STARK sono considerati un miglioramento rispetto agli ZK-SNARK per la loro scalabilità e trasparenza.

Gli ZK-STARK sono 'trasparenti', in quanto possono funzionare senza la configurazione fidata di una Common Reference String (CRS). Invece, gli ZK-STARK si basano su una casualità verificabile pubblicamente per impostare i parametri per la generazione e la verifica delle prove.

Gli ZK-STARK offrono anche maggiore scalabilità perché il tempo necessario per dimostrare e verificare le prove di validità aumenta in modo _quasilineare_ in relazione alla complessità del calcolo sottostante. Con gli ZK-SNARK, i tempi di prova e verifica scalano in modo _lineare_ in relazione alle dimensioni del calcolo sottostante. Ciò significa che gli ZK-STARK richiedono meno tempo rispetto agli ZK-SNARK per la prova e la verifica quando sono coinvolti set di dati di grandi dimensioni, rendendoli utili per applicazioni ad alto volume.

Gli ZK-STARK sono anche sicuri contro i computer quantistici, mentre la crittografia a curva ellittica (ECC) utilizzata negli ZK-SNARK è ampiamente ritenuta suscettibile agli attacchi di calcolo quantistico. Il lato negativo degli ZK-STARK è che producono prove di dimensioni maggiori, che sono più costose da verificare su Ethereum.

#### Come funzionano le prove di validità nei rollup a conoscenza zero? {#validity-proofs-in-zk-rollups}

##### Generazione della prova

Prima di accettare le transazioni, l'operatore eseguirà i consueti controlli. Questo include la conferma che:

- Gli account del mittente e del destinatario fanno parte dell'albero di stato.
- Il mittente ha fondi sufficienti per elaborare la transazione.
- La transazione è corretta e corrisponde alla chiave pubblica del mittente sul rollup.
- Il nonce del mittente è corretto, ecc.

Una volta che il nodo dello ZK-rollup ha abbastanza transazioni, le aggrega in un lotto e compila gli input per il circuito di prova da compilare in una succinta prova ZK. Questo include:

- Una radice dell'albero di Merkle che comprende tutte le transazioni nel lotto.
- Prove di Merkle per le transazioni per dimostrare l'inclusione nel lotto.
- Prove di Merkle per ogni coppia mittente-destinatario nelle transazioni per dimostrare che quegli account fanno parte dell'albero di stato del rollup.
- Un set di radici di stato intermedie, derivate dall'aggiornamento della radice di stato dopo aver applicato gli aggiornamenti di stato per ogni transazione (ovvero, diminuendo gli account del mittente e aumentando gli account del destinatario).

Il circuito di prova calcola la prova di validità "iterando" su ogni transazione ed eseguendo gli stessi controlli che l'operatore ha completato prima di elaborare la transazione. Innanzitutto, verifica che l'account del mittente faccia parte della radice di stato esistente utilizzando la prova di Merkle fornita. Quindi riduce il saldo del mittente, aumenta il suo nonce, esegue l'hash dei dati dell'account aggiornati e lo combina con la prova di Merkle per generare una nuova radice di Merkle.

Questa radice di Merkle riflette l'unica modifica nello stato dello ZK-rollup: una modifica nel saldo e nel nonce del mittente. Ciò è possibile perché la prova di Merkle utilizzata per dimostrare l'esistenza dell'account viene utilizzata per derivare la nuova radice di stato.

Il circuito di prova esegue lo stesso processo sull'account del destinatario. Controlla se l'account del destinatario esiste sotto la radice di stato intermedia (utilizzando la prova di Merkle), aumenta il suo saldo, esegue nuovamente l'hash dei dati dell'account e lo combina con la prova di Merkle per generare una nuova radice di stato.

Il processo si ripete per ogni transazione; ogni "iterazione" crea una nuova radice di stato dall'aggiornamento dell'account del mittente e una successiva nuova radice dall'aggiornamento dell'account del destinatario. Come spiegato, ogni aggiornamento alla radice di stato rappresenta una parte dell'albero di stato del rollup che cambia.

Il circuito di prova ZK itera sull'intero lotto di transazioni, verificando la sequenza di aggiornamenti che si traducono in una radice di stato finale dopo l'esecuzione dell'ultima transazione. L'ultima radice di Merkle calcolata diventa la più recente radice di stato canonica dello ZK-rollup.

##### Verifica della prova

Dopo che il circuito di prova ha verificato la correttezza degli aggiornamenti di stato, l'operatore di livello 2 invia la prova di validità calcolata al contratto verificatore sul livello 1. Il circuito di verifica del contratto verifica la validità della prova e controlla anche gli input pubblici che fanno parte della prova:

- **Radice di pre-stato**: La vecchia radice di stato dello ZK-rollup (ovvero, prima che le transazioni raggruppate venissero eseguite), che riflette l'ultimo stato valido noto della catena di livello 2.

- **Radice di post-stato**: La nuova radice di stato dello ZK-rollup (ovvero, dopo l'esecuzione delle transazioni raggruppate), che riflette lo stato più recente della catena di livello 2. La radice di post-stato è la radice finale derivata dopo aver applicato gli aggiornamenti di stato nel circuito di prova.

- **Radice del lotto**: La radice di Merkle del lotto, derivata _merklizzando_ le transazioni nel lotto ed eseguendo l'hash della radice dell'albero.

- **Input della transazione**: Dati associati alle transazioni eseguite come parte del lotto inviato.

Se la prova soddisfa il circuito (ovvero, è valida), significa che esiste una sequenza di transazioni valide che fanno passare il rollup dallo stato precedente (identificato crittograficamente dalla radice di pre-stato) a un nuovo stato (identificato crittograficamente dalla radice di post-stato). Se la radice di pre-stato corrisponde alla radice archiviata nel contratto del rollup e la prova è valida, il contratto del rollup prende la radice di post-stato dalla prova e aggiorna il suo albero di stato per riflettere lo stato modificato del rollup.

### Entrate e uscite {#entries-and-exits}

Gli utenti entrano nello ZK-rollup depositando token nel contratto del rollup distribuito sulla catena di livello 1. Questa transazione viene messa in coda poiché solo gli operatori possono inviare transazioni al contratto del rollup.

Se la coda dei depositi in sospeso inizia a riempirsi, l'operatore dello ZK-rollup prenderà le transazioni di deposito e le invierà al contratto del rollup. Una volta che i fondi dell'utente sono nel rollup, possono iniziare a effettuare transazioni inviando transazioni all'operatore per l'elaborazione. Gli utenti possono verificare i saldi sul rollup eseguendo l'hash dei dati del proprio account, inviando l'hash al contratto del rollup e fornendo una prova di Merkle da verificare rispetto alla radice di stato corrente.

Prelevare da uno ZK-rollup al livello 1 è semplice. L'utente avvia la transazione di uscita inviando i propri asset sul rollup a un account specificato per essere bruciati. Se l'operatore include la transazione nel lotto successivo, l'utente può inviare una richiesta di prelievo al contratto on-chain. Questa richiesta di prelievo includerà quanto segue:

- Prova di Merkle che dimostra l'inclusione della transazione dell'utente verso l'account di burn in un lotto di transazioni

- Dati della transazione

- Radice del lotto

- Indirizzo di livello 1 per ricevere i fondi depositati

Il contratto del rollup esegue l'hash dei dati della transazione, controlla se la radice del lotto esiste e utilizza la prova di Merkle per verificare se l'hash della transazione fa parte della radice del lotto. Successivamente, il contratto esegue la transazione di uscita e invia i fondi all'indirizzo scelto dall'utente sul livello 1.

## Rollup a conoscenza zero e compatibilità con la EVM {#zk-rollups-and-evm-compatibility}

A differenza dei rollup ottimistici, i rollup a conoscenza zero non sono facilmente compatibili con la [macchina virtuale di Ethereum (EVM)](/developers/docs/evm/). Dimostrare il calcolo EVM di uso generale nei circuiti è più difficile e richiede più risorse rispetto alla dimostrazione di calcoli semplici (come il trasferimento di token descritto in precedenza).

Tuttavia, i [progressi nella tecnologia a conoscenza zero](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) stanno accendendo un rinnovato interesse nell'avvolgere il calcolo EVM in prove a conoscenza zero. Questi sforzi sono orientati alla creazione di un'implementazione EVM a conoscenza zero (zkEVM) in grado di verificare in modo efficiente la correttezza dell'esecuzione del programma. Una zkEVM ricrea gli opcode EVM esistenti per la prova/verifica nei circuiti, consentendo di eseguire contratti intelligenti.

Come la EVM, una zkEVM passa da uno stato all'altro dopo che il calcolo è stato eseguito su alcuni input. La differenza è che la zkEVM crea anche prove a conoscenza zero per verificare la correttezza di ogni passaggio nell'esecuzione del programma. Le prove di validità potrebbero verificare la correttezza delle operazioni che toccano lo stato della VM (memoria, stack, archiviazione) e il calcolo stesso (ovvero, l'operazione ha chiamato gli opcode giusti e li ha eseguiti correttamente?).

Si prevede che l'introduzione di rollup a conoscenza zero compatibili con la EVM aiuterà gli sviluppatori a sfruttare le garanzie di scalabilità e sicurezza delle prove a conoscenza zero. Ancora più importante, la compatibilità con l'infrastruttura nativa di Ethereum significa che gli sviluppatori possono creare dApp compatibili con ZK utilizzando strumenti e linguaggi familiari (e collaudati).

## Come funzionano le commissioni dei rollup a conoscenza zero? {#how-do-zk-rollup-fees-work}

Quanto pagano gli utenti per le transazioni sui rollup a conoscenza zero dipende dalla commissione del gas, proprio come sulla rete principale di Ethereum. Tuttavia, le commissioni del gas funzionano in modo diverso sul livello 2 e sono influenzate dai seguenti costi:

1. **Scrittura dello stato**: C'è un costo fisso per scrivere nello stato di Ethereum (ovvero, inviare una transazione sulla blockchain di Ethereum). I rollup a conoscenza zero riducono questo costo raggruppando le transazioni e distribuendo i costi fissi su più utenti.

2. **Pubblicazione dei dati**: I rollup a conoscenza zero pubblicano i dati di stato per ogni transazione su Ethereum come `calldata`. I costi di `calldata` sono attualmente regolati dall'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), che stabilisce un costo di 16 gas per i byte non zero e 4 gas per i byte zero di `calldata`, rispettivamente. Il costo pagato su ogni transazione è influenzato da quanto `calldata` deve essere pubblicato on-chain per essa.

3. **Commissioni dell'operatore di livello 2**: Questo è l'importo pagato all'operatore del rollup come compenso per i costi computazionali sostenuti nell'elaborazione delle transazioni, in modo molto simile alle ["commissioni di priorità (mance)" della transazione](/developers/docs/gas/#how-are-gas-fees-calculated) sulla rete principale di Ethereum.

4. **Generazione e verifica della prova**: Gli operatori degli ZK-rollup devono produrre prove di validità per i lotti di transazioni, il che richiede molte risorse. Anche la verifica delle prove a conoscenza zero sulla rete principale costa gas (~ 500.000 gas).

Oltre a raggruppare le transazioni, i rollup a conoscenza zero riducono le commissioni per gli utenti comprimendo i dati delle transazioni. Puoi [vedere una panoramica in tempo reale](https://l2fees.info/) di quanto costa utilizzare i rollup a conoscenza zero di Ethereum.

## Come i rollup a conoscenza zero scalano Ethereum? {#scaling-ethereum-with-zk-rollups}

### Compressione dei dati delle transazioni {#transaction-data-compression}

I rollup a conoscenza zero estendono il throughput sul livello di base di Ethereum portando il calcolo fuori catena, ma la vera spinta per la scalabilità deriva dalla compressione dei dati delle transazioni. La [dimensione del blocco](/developers/docs/blocks/#block-size) di Ethereum limita i dati che ogni blocco può contenere e, per estensione, il numero di transazioni elaborate per blocco. Comprimendo i dati relativi alle transazioni, i rollup a conoscenza zero aumentano significativamente il numero di transazioni elaborate per blocco.

I rollup a conoscenza zero possono comprimere i dati delle transazioni meglio dei rollup ottimistici poiché non devono pubblicare tutti i dati necessari per convalidare ogni transazione. Devono solo pubblicare i dati minimi necessari per ricostruire l'ultimo stato degli account e dei saldi sul rollup.

### Prove ricorsive {#recursive-proofs}

Un vantaggio delle prove a conoscenza zero è che le prove possono verificare altre prove. Ad esempio, un singolo ZK-SNARK può verificare altri ZK-SNARK. Tali "prove di prove" sono chiamate prove ricorsive e aumentano drasticamente il throughput sui rollup a conoscenza zero.

Attualmente, le prove di validità vengono generate blocco per blocco e inviate al contratto di livello 1 per la verifica. Tuttavia, la verifica delle prove di un singolo blocco limita il throughput che i rollup a conoscenza zero possono raggiungere poiché solo un blocco può essere finalizzato quando l'operatore invia una prova.

Le prove ricorsive, tuttavia, consentono di finalizzare diversi blocchi con un'unica prova di validità. Questo perché il circuito di prova aggrega ricorsivamente più prove di blocco fino a creare un'unica prova finale. L'operatore di livello 2 invia questa prova ricorsiva e, se il contratto la accetta, tutti i blocchi rilevanti verranno finalizzati all'istante. Con le prove ricorsive, aumenta il numero di transazioni dello ZK-rollup che possono essere finalizzate su Ethereum a intervalli.

### Pro e contro dei rollup a conoscenza zero {#zk-rollups-pros-and-cons}

| Pro                                                                                                                                                                                                   | Contro                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Le prove di validità garantiscono la correttezza delle transazioni fuori catena e impediscono agli operatori di eseguire transizioni di stato non valide.                                                                           | Il costo associato al calcolo e alla verifica delle prove di validità è sostanziale e può aumentare le commissioni per gli utenti del rollup.                                                                            |
| Offre una finalità della transazione più rapida poiché gli aggiornamenti di stato vengono approvati una volta che le prove di validità sono verificate sul livello 1.                                                                                              | Costruire rollup a conoscenza zero compatibili con la EVM è difficile a causa della complessità della tecnologia a conoscenza zero.                                                                                                    |
| Si affida a meccanismi crittografici senza fiducia per la sicurezza, non all'onestà di attori incentivati come con i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | La produzione di prove di validità richiede hardware specializzato, il che potrebbe incoraggiare il controllo centralizzato della catena da parte di poche parti.                                                                    |
| Archivia i dati necessari per recuperare lo stato fuori catena sul livello 1, il che garantisce sicurezza, resistenza alla censura e decentralizzazione.                                                                       | Gli operatori centralizzati (sequenziatori) possono influenzare l'ordinamento delle transazioni.                                                                                                                     |
| Gli utenti beneficiano di una maggiore efficienza del capitale e possono prelevare fondi dal livello 2 senza ritardi.                                                                                                           | I requisiti hardware possono ridurre il numero di partecipanti che possono forzare la catena a fare progressi, aumentando il rischio che operatori malintenzionati blocchino lo stato del rollup e censurino gli utenti. |
| Non dipende da ipotesi di vivacità e gli utenti non devono convalidare la catena per proteggere i propri fondi.                                                                                              | Alcuni sistemi di prova (ad es. ZK-SNARK) richiedono una configurazione fidata che, se gestita in modo errato, potrebbe potenzialmente compromettere il modello di sicurezza di uno ZK-rollup.                                                     |
| Una migliore compressione dei dati può aiutare a ridurre i costi di pubblicazione di `calldata` su Ethereum e ridurre al minimo le commissioni del rollup per gli utenti.                                                                             |                                                                                                                                                                                                    |

### Una spiegazione visiva dei rollup a conoscenza zero {#zk-video}

Guarda Finematics spiegare i rollup a conoscenza zero:

<YouTube id="7pWxCklcNsU" start="406" />


## Chi sta lavorando a una zkEVM? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM per L2 vs L1</AlertTitle>
<AlertDescription>
I progetti seguenti utilizzano la tecnologia zkEVM per creare rollup di livello 2. Esistono anche ricerche sull'utilizzo dello zkEVM per la verifica dei blocchi L1, che consentirebbe ai validatori di verificare i blocchi di Ethereum senza ri-eseguire le transazioni.
</AlertDescription>
</AlertContent>
</Alert>


I progetti che lavorano sulle zkEVM includono:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM è un progetto finanziato dalla Ethereum Foundation per sviluppare uno ZK-rollup compatibile con la EVM e un meccanismo per generare prove di validità per i blocchi di Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _è uno ZK Rollup decentralizzato sulla rete principale di Ethereum che lavora su una macchina virtuale di Ethereum a conoscenza zero (zkEVM) che esegue transazioni Ethereum in modo trasparente, inclusi contratti intelligenti con convalide di prove a conoscenza zero._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll è un'azienda guidata dalla tecnologia che lavora alla costruzione di una soluzione nativa di livello 2 zkEVM per Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko è uno ZK-rollup decentralizzato ed equivalente a Ethereum (una [ZK-EVM di Tipo 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era è uno ZK Rollup compatibile con la EVM costruito da Matter Labs, alimentato dalla propria zkEVM._

- **[Starknet](https://starkware.co/starknet/)** - _StarkNet è una soluzione di scalabilità di livello 2 compatibile con la EVM costruita da StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph è una soluzione di scalabilità rollup ibrida che utilizza prove ZK per affrontare il problema della sfida di stato del livello 2._

- **[Linea](https://linea.build)** - _Linea è un livello 2 zkEVM equivalente a Ethereum costruito da Consensys, completamente allineato con l'ecosistema Ethereum._

## Ulteriori letture sui rollup a conoscenza zero {#further-reading-on-zk-rollups}

- [Cosa sono i rollup a conoscenza zero?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Cosa sono i rollup a conoscenza zero?](https://alchemy.com/blog/zero-knowledge-rollups)
- [La guida pratica ai rollup di Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARK contro SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Cos'è una zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Tipi di ZK-EVM: equivalente a Ethereum, equivalente a EVM, Tipo 1, Tipo 4 e altre parole d'ordine criptiche](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Introduzione a zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Cosa sono i L2 ZK-EVM?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Risorse Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARK sotto il cofano](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Come sono possibili gli SNARK?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Tutorial: Privacy e conoscenza-zero su Ethereum {#tutorials}

- [Utilizzare la conoscenza-zero per uno stato segreto](/developers/tutorials/secret-state/) _– Come utilizzare le prove ZK e i componenti del server fuori catena per mantenere lo stato segreto del gioco on-chain._
- [Utilizzare gli indirizzi invisibili](/developers/tutorials/stealth-addr/) _– Come gli indirizzi invisibili ERC-5564 consentono trasferimenti anonimi di ETH utilizzando la derivazione della chiave crittografica._
- [Utilizzare Ethereum per l'autenticazione web2](/developers/tutorials/ethereum-for-web2-auth/) _– Come integrare le firme del portafoglio di Ethereum con i sistemi di autenticazione web2 basati su SAML._