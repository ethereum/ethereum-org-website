---
title: Catene Plasma
description: Un'introduzione alle catene Plasma come soluzione di ridimensionamento attualmente utilizzata dalla community di Ethereum.
lang: it
incomplete: true
sidebarDepth: 3
---

Una catena Plasma è una blockchain separata ancorata alla Mainnet di [Ethereum](/) ma che esegue transazioni offchain con il proprio meccanismo per la validazione del blocco. Le catene Plasma sono talvolta chiamate catene "figlie", essenzialmente copie più piccole della Mainnet di Ethereum. Le catene Plasma utilizzano le [prove di frode](/glossary/#fraud-proof) (come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/)) per arbitrare le dispute.

Gli alberi di Merkle consentono la creazione di uno stack infinito di queste catene che possono lavorare per scaricare la larghezza di banda dalle catene genitore (inclusa la Mainnet di Ethereum). Tuttavia, sebbene queste catene derivino una certa sicurezza da Ethereum (tramite le prove di frode), la loro sicurezza ed efficienza sono influenzate da diverse limitazioni di progettazione.

## Prerequisiti {#prerequisites}

Dovresti avere una buona comprensione di tutti gli argomenti fondamentali e una comprensione ad alto livello del [ridimensionamento di Ethereum](/developers/docs/scaling/).

## Cos'è Plasma? {#what-is-plasma}

Plasma è un framework per migliorare la scalabilità nelle blockchain pubbliche come Ethereum. Come descritto nel [whitepaper di Plasma](https://plasma.io/plasma.pdf) originale, le catene Plasma sono costruite sopra un'altra blockchain (chiamata "catena radice"). Ogni "catena figlia" si estende dalla catena radice ed è generalmente gestita da uno smart contract distribuito sulla catena genitore.

Il contratto Plasma funziona, tra le altre cose, come un [ponte](/developers/docs/bridges/) che consente agli utenti di spostare asset tra la Mainnet di Ethereum e la catena Plasma. Sebbene questo le renda simili alle [sidechain](/developers/docs/scaling/sidechains/), le catene Plasma beneficiano, almeno in una certa misura, della sicurezza della Mainnet di Ethereum. Questo a differenza delle sidechain che sono le uniche responsabili della propria sicurezza.

## Come funziona Plasma? {#how-does-plasma-work}

I componenti di base del framework Plasma sono:

### Calcolo offchain {#offchain-computation}

L'attuale velocità di elaborazione di Ethereum è limitata a circa 15-20 transazioni al secondo, riducendo la possibilità a breve termine di scalare per gestire più utenti. Questo problema esiste principalmente perché il [meccanismo di consenso](/developers/docs/consensus-mechanisms/) di Ethereum richiede che molti nodi peer-to-peer verifichino ogni aggiornamento allo stato della blockchain.

Sebbene il meccanismo di consenso di Ethereum sia necessario per la sicurezza, potrebbe non applicarsi a ogni caso d'uso. Ad esempio, Alice potrebbe non aver bisogno che i suoi pagamenti giornalieri a Bob per una tazza di caffè siano verificati dall'intera rete Ethereum, poiché esiste una certa fiducia tra le due parti.

Plasma presuppone che la Mainnet di Ethereum non debba verificare tutte le transazioni. Invece, possiamo elaborare le transazioni fuori dalla Mainnet, liberando i nodi dal dover validare ogni transazione.

Il calcolo offchain è necessario poiché le catene Plasma possono ottimizzare velocità e costi. Ad esempio, una catena Plasma può utilizzare, e molto spesso lo fa, un singolo "operatore" per gestire l'ordinamento e l'esecuzione delle transazioni. Con una sola entità che verifica le transazioni, i tempi di elaborazione su una catena Plasma sono più rapidi rispetto alla Mainnet di Ethereum.

### Commitment di stato {#state-commitments}

Mentre Plasma esegue le transazioni offchain, queste vengono regolate sul livello di esecuzione principale di Ethereum; altrimenti, le catene Plasma non potrebbero beneficiare delle garanzie di sicurezza di Ethereum. Ma finalizzare le transazioni offchain senza conoscere lo stato della catena Plasma romperebbe il modello di sicurezza e consentirebbe la proliferazione di transazioni non valide. Questo è il motivo per cui l'operatore, l'entità responsabile della produzione di blocchi sulla catena Plasma, è tenuto a pubblicare periodicamente dei "commitment di stato" su Ethereum.

Uno [schema di commitment](https://en.wikipedia.org/wiki/Commitment_scheme) è una tecnica crittografica per vincolarsi a un valore o a un'affermazione senza rivelarla a un'altra parte. I commitment sono "vincolanti" nel senso che non è possibile modificare il valore o l'affermazione una volta che ci si è impegnati. I commitment di stato in Plasma assumono la forma di "radici di Merkle" (derivate da un [albero di Merkle](/whitepaper/#merkle-trees)) che l'operatore invia a intervalli al contratto Plasma sulla catena di Ethereum.

Le radici di Merkle sono primitive crittografiche che consentono di comprimere grandi quantità di informazioni. Una radice di Merkle (chiamata anche "radice del blocco" in questo caso) potrebbe rappresentare tutte le transazioni in un blocco. Le radici di Merkle rendono anche più facile verificare che una piccola porzione di dati faccia parte del set di dati più ampio. Ad esempio, un utente può produrre una [prova di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) per dimostrare l'inclusione di una transazione in un blocco specifico.

Le radici di Merkle sono importanti per fornire informazioni sullo stato offchain a Ethereum. Puoi pensare alle radici di Merkle come a dei "punti di salvataggio": l'operatore sta dicendo: "Questo è lo stato della catena Plasma al momento x, e questa è la radice di Merkle come prova". L'operatore si sta vincolando allo _stato attuale_ della catena Plasma con una radice di Merkle, motivo per cui viene chiamato "commitment di stato".

### Entrate e uscite {#entries-and-exits}

Affinché gli utenti di Ethereum possano trarre vantaggio da Plasma, deve esserci un meccanismo per spostare i fondi tra la Mainnet e le catene Plasma. Tuttavia, non possiamo inviare arbitrariamente ether a un indirizzo sulla catena Plasma: queste catene sono incompatibili, quindi la transazione fallirebbe o porterebbe alla perdita di fondi.

Plasma utilizza un contratto principale in esecuzione su Ethereum per elaborare le entrate e le uscite degli utenti. Questo contratto principale è anche responsabile del tracciamento dei commitment di stato (spiegati in precedenza) e della punizione dei comportamenti disonesti tramite le prove di frode (maggiori dettagli in seguito).

#### Entrare nella catena Plasma {#entering-the-plasma-chain}

Per entrare nella catena Plasma, Alice (l'utente) dovrà depositare ETH o qualsiasi token ERC-20 nel contratto Plasma. L'operatore Plasma, che osserva i depositi del contratto, ricrea un importo pari al deposito iniziale di Alice e lo rilascia al suo indirizzo sulla catena Plasma. Ad Alice è richiesto di attestare la ricezione dei fondi sulla catena figlia e può quindi utilizzare questi fondi per le transazioni.

#### Uscire dalla catena Plasma {#exiting-the-plasma-chain}

L'uscita dalla catena Plasma è più complessa dell'entrata per diversi motivi. Il principale è che, sebbene Ethereum disponga di informazioni sullo stato della catena Plasma, non può verificare se le informazioni siano vere o meno. Un utente malintenzionato potrebbe fare un'affermazione errata ("Ho 1000 ETH") e farla franca fornendo prove false per supportare la dichiarazione.

Per prevenire prelievi dannosi, viene introdotto un "periodo di contestazione". Durante il periodo di contestazione (di solito una settimana), chiunque può contestare una richiesta di prelievo utilizzando una prova di frode. Se la contestazione ha successo, la richiesta di prelievo viene negata.

Tuttavia, di solito gli utenti sono onesti e fanno affermazioni corrette sui fondi che possiedono. In questo scenario, Alice avvierà una richiesta di prelievo sulla catena radice (Ethereum) inviando una transazione al contratto Plasma.

Deve anche fornire una prova di Merkle che verifichi che una transazione che ha creato i suoi fondi sulla catena Plasma sia stata inclusa in un blocco. Questo è necessario per le iterazioni di Plasma, come [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), che utilizzano un modello [Unspent Transaction Output (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Altre, come [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), rappresentano i fondi come [token non fungibili](/developers/docs/standards/tokens/erc-721/) invece di UTXO. Il prelievo, in questo caso, richiede la prova della proprietà dei token sulla catena Plasma. Ciò viene fatto inviando le due transazioni più recenti che coinvolgono il token e fornendo una prova di Merkle che verifichi l'inclusione di tali transazioni in un blocco.

L'utente deve anche aggiungere una cauzione alla richiesta di prelievo come garanzia di comportamento onesto. Se uno sfidante dimostra che la richiesta di prelievo di Alice non è valida, la sua cauzione subisce lo slashing e una parte di essa va allo sfidante come ricompensa.

Se il periodo di contestazione trascorre senza che nessuno fornisca una prova di frode, la richiesta di prelievo di Alice è considerata valida, consentendole di recuperare i depositi dal contratto Plasma su Ethereum.

### Arbitrato delle dispute {#dispute-arbitration}

Come qualsiasi blockchain, le catene Plasma necessitano di un meccanismo per far rispettare l'integrità delle transazioni nel caso in cui i partecipanti agiscano in modo dannoso (ad es. la doppia spesa dei fondi). A tal fine, le catene Plasma utilizzano le prove di frode per arbitrare le dispute riguardanti la validità delle transizioni di stato e penalizzare i comportamenti scorretti. Le prove di frode sono utilizzate come meccanismo attraverso il quale una catena figlia Plasma presenta un reclamo alla sua catena genitore o alla catena radice.

Una prova di frode è semplicemente un'affermazione che una particolare transizione di stato non è valida. Un esempio è se un utente (Alice) cerca di spendere gli stessi fondi due volte. Forse ha speso l'UTXO in una transazione con Bob e vuole spendere lo stesso UTXO (che ora è di Bob) in un'altra transazione.

Per impedire il prelievo, Bob costruirà una prova di frode fornendo la prova che Alice ha speso il suddetto UTXO in una transazione precedente e una prova di Merkle dell'inclusione della transazione in un blocco. Lo stesso processo funziona in Plasma Cash: Bob dovrebbe fornire la prova che Alice ha precedentemente trasferito i token che sta cercando di prelevare.

Se la contestazione di Bob ha successo, la richiesta di prelievo di Alice viene annullata. Tuttavia, questo approccio si basa sulla capacità di Bob di osservare la catena per le richieste di prelievo. Se Bob è offline, Alice può elaborare il prelievo dannoso una volta trascorso il periodo di contestazione.

## Il problema dell'uscita di massa in Plasma {#the-mass-exit-problem-in-plasma}

Il problema dell'uscita di massa si verifica quando un gran numero di utenti cerca di prelevare da una catena Plasma contemporaneamente. Il motivo per cui esiste questo problema ha a che fare con uno dei maggiori problemi di Plasma: **l'indisponibilità dei dati**.

La disponibilità dei dati è la capacità di verificare che le informazioni per un blocco proposto siano state effettivamente pubblicate sulla rete blockchain. Un blocco è "non disponibile" se il produttore pubblica il blocco stesso ma trattiene i dati utilizzati per creare il blocco.

I blocchi devono essere disponibili affinché i nodi siano in grado di scaricare il blocco e verificare la validità delle transazioni. Le blockchain garantiscono la disponibilità dei dati costringendo i produttori di blocchi a pubblicare tutti i dati delle transazioni onchain.

La disponibilità dei dati aiuta anche a proteggere i protocolli di ridimensionamento offchain che si basano sul livello di base di Ethereum. Costringendo gli operatori su queste catene a pubblicare i dati delle transazioni su Ethereum, chiunque può contestare i blocchi non validi costruendo prove di frode che fanno riferimento allo stato corretto della catena.

Le catene Plasma memorizzano principalmente i dati delle transazioni con l'operatore e **non pubblicano alcun dato sulla Mainnet** (cioè, oltre ai commitment di stato periodici). Ciò significa che gli utenti devono fare affidamento sull'operatore per fornire i dati del blocco se hanno bisogno di creare prove di frode che contestano transazioni non valide. Se questo sistema funziona, gli utenti possono sempre utilizzare le prove di frode per proteggere i fondi.

Il problema inizia quando l'operatore, non un utente qualsiasi, è la parte che agisce in modo dannoso. Poiché l'operatore ha il controllo esclusivo della blockchain, ha maggiori incentivi a far avanzare transazioni di stato non valide su scala più ampia, come rubare fondi appartenenti agli utenti sulla catena Plasma.

In questo caso, l'utilizzo del classico sistema di prova di frode non funziona. L'operatore potrebbe facilmente effettuare una transazione non valida trasferendo i fondi di Alice e Bob al proprio portafoglio e nascondere i dati necessari per creare la prova di frode. Questo è possibile perché l'operatore non è tenuto a rendere i dati disponibili agli utenti o alla Mainnet.

Pertanto, la soluzione più ottimistica è tentare un'"uscita di massa" degli utenti dalla catena Plasma. L'uscita di massa rallenta il piano dell'operatore malintenzionato di rubare fondi e fornisce una certa misura di protezione per gli utenti. Le richieste di prelievo sono ordinate in base a quando è stato creato ciascun UTXO (o token), impedendo agli operatori malintenzionati di fare front-running sugli utenti onesti.

Tuttavia, abbiamo ancora bisogno di un modo per verificare la validità delle richieste di prelievo durante un'uscita di massa, per impedire a individui opportunisti di trarre profitto dal caos elaborando uscite non valide. La soluzione è semplice: richiedere agli utenti di pubblicare l'ultimo **stato valido della catena** per far uscire i propri soldi.

Ma questo approccio presenta ancora dei problemi. Ad esempio, se tutti gli utenti su una catena Plasma devono uscire (il che è possibile nel caso di un operatore malintenzionato), l'intero stato valido della catena Plasma deve essere scaricato sul livello di base di Ethereum in una sola volta. Con le dimensioni arbitrarie delle catene Plasma (alta capacità transazionale = più dati) e i vincoli sulle velocità di elaborazione di Ethereum, questa non è una soluzione ideale.

Sebbene i giochi di uscita sembrino belli in teoria, le uscite di massa nella vita reale probabilmente innescheranno una congestione a livello di rete su Ethereum stesso. Oltre a danneggiare la funzionalità di Ethereum, un'uscita di massa mal coordinata significa che gli utenti potrebbero non essere in grado di prelevare i fondi prima che l'operatore prosciughi ogni account sulla catena Plasma.

## Pro e contro di Plasma {#pros-and-cons-of-plasma}

| Pro                                                                                                                                                                                                                                                              | Contro                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Offre un'elevata capacità transazionale e un basso costo per transazione.                                                                                                                                                                                        | Non supporta il calcolo generale (non può eseguire smart contract). Solo i trasferimenti di token di base, gli swap e alcuni altri tipi di transazioni sono supportati tramite la logica dei predicati.      |
| Ottimo per le transazioni tra utenti arbitrari (nessun sovraccarico per coppia di utenti se entrambi sono stabiliti sulla catena Plasma)                                                                                                                         | Necessità di osservare periodicamente la rete (requisito di liveness) o delegare questa responsabilità a qualcun altro per garantire la sicurezza dei propri fondi.                                          |
| Le catene Plasma possono essere adattate a casi d'uso specifici che non sono correlati alla catena principale. Chiunque, comprese le aziende, può personalizzare gli smart contract Plasma per fornire un'infrastruttura scalabile che funzioni in contesti diversi. | Si affida a uno o più operatori per archiviare i dati e fornirli su richiesta.                                                                                                                               |
| Riduce il carico sulla Mainnet di Ethereum spostando il calcolo e l'archiviazione offchain.                                                                                                                                                                      | I prelievi sono ritardati di diversi giorni per consentire le contestazioni. Per gli asset fungibili, questo può essere mitigato dai fornitori di liquidità, ma vi è un costo di capitale associato.         |
|                                                                                                                                                                                                                                                                  | Se troppi utenti cercano di uscire contemporaneamente, la Mainnet di Ethereum potrebbe congestionarsi.                                                                                                       |

## Plasma vs protocolli di ridimensionamento layer 2 {#plasma-vs-layer-2}

Sebbene Plasma fosse un tempo considerata un'utile soluzione di ridimensionamento per Ethereum, da allora è stata abbandonata a favore dei [protocolli di ridimensionamento layer 2 (L2)](/layer-2/). Le soluzioni di ridimensionamento L2 pongono rimedio a molti dei problemi di Plasma:

### Efficienza {#efficiency}

I [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups) generano prove crittografiche della validità di ogni lotto di transazioni elaborate offchain. Ciò impedisce agli utenti (e agli operatori) di far avanzare transizioni di stato non valide, eliminando la necessità di periodi di contestazione e giochi di uscita. Significa anche che gli utenti non devono osservare periodicamente la catena per proteggere i propri fondi.

### Supporto per gli smart contract {#support-for-smart-contracts}

Un altro problema con il framework Plasma era [l'incapacità di supportare l'esecuzione degli smart contract di Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Di conseguenza, la maggior parte delle implementazioni di Plasma è stata costruita principalmente per pagamenti semplici o per lo scambio di token ERC-20.

Al contrario, i rollup ottimistici sono compatibili con la [Ethereum Virtual Machine](/developers/docs/evm/) e possono eseguire [smart contract](/developers/docs/smart-contracts/) nativi di Ethereum, rendendoli una soluzione utile e _sicura_ per il ridimensionamento delle [applicazioni decentralizzate](/developers/docs/dapps/). Allo stesso modo, sono in corso piani per [creare un'implementazione a conoscenza zero della EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) che consentirebbe ai rollup ZK di elaborare logica arbitraria ed eseguire smart contract.

### Indisponibilità dei dati {#data-unavailability}

Come spiegato in precedenza, Plasma soffre di un problema di disponibilità dei dati. Se un operatore malintenzionato facesse avanzare una transizione non valida sulla catena Plasma, gli utenti non sarebbero in grado di contestarla poiché l'operatore può trattenere i dati necessari per creare la prova di frode. I rollup risolvono questo problema costringendo gli operatori a pubblicare i dati delle transazioni su Ethereum, consentendo a chiunque di verificare lo stato della catena e creare prove di frode se necessario.

### Problema dell'uscita di massa {#mass-exit-problem}

I rollup ZK e i rollup ottimistici risolvono entrambi il problema dell'uscita di massa di Plasma in vari modi. Ad esempio, un rollup ZK si basa su meccanismi crittografici che garantiscono che gli operatori non possano rubare i fondi degli utenti in nessuno scenario.

Allo stesso modo, i rollup ottimistici impongono un periodo di ritardo sui prelievi durante il quale chiunque può avviare una contestazione e prevenire richieste di prelievo dannose. Sebbene questo sia simile a Plasma, la differenza è che i verificatori hanno accesso ai dati necessari per creare le prove di frode. Pertanto, non c'è bisogno che gli utenti dei rollup si impegnino in una frenetica migrazione "chi prima esce meglio alloggia" verso la Mainnet di Ethereum.

## In che modo Plasma differisce dalle sidechain e dallo sharding? {#plasma-sidechains-sharding}

Plasma, le sidechain e lo sharding sono abbastanza simili perché si connettono tutti alla Mainnet di Ethereum in qualche modo. Tuttavia, il livello e la forza di queste connessioni variano, il che influisce sulle proprietà di sicurezza di ciascuna soluzione di ridimensionamento.

### Plasma vs sidechain {#plasma-vs-sidechains}

Una [sidechain](/developers/docs/scaling/sidechains/) è una blockchain gestita in modo indipendente connessa alla Mainnet di Ethereum tramite un ponte bidirezionale. I [ponti](/bridges/) consentono agli utenti di scambiare token tra le due blockchain per effettuare transazioni sulla sidechain, riducendo la congestione sulla Mainnet di Ethereum e migliorando la scalabilità.
Le sidechain utilizzano un meccanismo di consenso separato e sono in genere molto più piccole della Mainnet di Ethereum. Di conseguenza, il trasferimento di asset su queste catene tramite ponte comporta un rischio maggiore; data la mancanza di garanzie di sicurezza ereditate dalla Mainnet di Ethereum nel modello sidechain, gli utenti rischiano la perdita di fondi in un attacco alla sidechain.

Al contrario, le catene Plasma derivano la loro sicurezza dalla Mainnet. Questo le rende misurabilmente più sicure delle sidechain. Sia le sidechain che le catene Plasma possono avere protocolli di consenso diversi, ma la differenza è che le catene Plasma pubblicano le radici di Merkle per ogni blocco sulla Mainnet di Ethereum. Le radici del blocco sono piccole porzioni di informazioni che possiamo utilizzare per verificare le informazioni sulle transazioni che avvengono su una catena Plasma. Se si verifica un attacco su una catena Plasma, gli utenti possono prelevare in sicurezza i propri fondi sulla Mainnet utilizzando le prove appropriate.

### Plasma vs sharding {#plasma-vs-sharding}

Sia le catene Plasma che le catene di shard pubblicano periodicamente prove crittografiche sulla Mainnet di Ethereum. Tuttavia, entrambe hanno proprietà di sicurezza diverse.

Le catene di shard inviano "intestazioni di collazione" alla Mainnet contenenti informazioni dettagliate su ciascuno shard di dati. I nodi sulla Mainnet verificano e fanno rispettare la validità degli shard di dati, riducendo la possibilità di transazioni di shard non valide e proteggendo la rete da attività dannose.

Plasma è diversa perché la Mainnet riceve solo informazioni minime sullo stato delle catene figlie. Ciò significa che la Mainnet non può verificare efficacemente le transazioni condotte sulle catene figlie, rendendole meno sicure.

**Nota** che lo sharding della blockchain di Ethereum non è più nella roadmap. È stato sostituito dal ridimensionamento tramite rollup e [danksharding](/roadmap/danksharding).

### Usa Plasma {#use-plasma}

Diversi progetti forniscono implementazioni di Plasma che puoi integrare nelle tue dapp:

- [Polygon](https://polygon.technology/) (in precedenza Matic Network)

## Letture consigliate {#further-reading}

- [Impara Plasma](https://www.learnplasma.org/en/)
- [Un rapido promemoria di cosa significa "sicurezza condivisa" e perché è così importante](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Sidechain vs Plasma vs Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Comprendere Plasma, Parte 1: Le basi](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Vita e morte di Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Tutorial: Catene Plasma su Ethereum {#tutorials}

- [Scrivi un plasma specifico per l'app che preservi la privacy](/developers/tutorials/app-plasma/) _– Costruisci un'applicazione plasma che preserva la privacy utilizzando prove a conoscenza zero e componenti offchain._