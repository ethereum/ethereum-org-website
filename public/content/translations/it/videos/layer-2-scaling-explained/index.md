---
title: "Spiegazione della scalabilità del layer 2 di Ethereum"
description: "Una panoramica delle soluzioni di scalabilità del layer 2 per Ethereum, inclusi rollup, Plasma, canali di stato e sidechain."
lang: it
youtubeId: "BgCgauWVTs0"
uploadDate: 2021-02-03
duration: "0:14:28"
educationLevel: intermediate
topic:
  - "scaling"
  - "layer-2"
format: explainer
author: Finematics
breadcrumb: "Scalabilità del layer 2"
---

Una spiegazione di **Finematics** che copre le soluzioni di scalabilità del layer 2 per Ethereum — inclusi canali, Plasma, sidechain e rollup, e perché i rollup stanno emergendo come la strategia di scalabilità dominante. Scopri come queste tecnologie riducono i costi e aumentano la capacità transazionale ereditando al contempo la sicurezza di Ethereum.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=BgCgauWVTs0) pubblicata da Finematics. È stata leggermente modificata per migliorarne la leggibilità.*

#### Scalabilità di Ethereum (0:31) {#ethereum-scaling-031}

La scalabilità di Ethereum è stata uno degli argomenti più discussi praticamente fin dal momento in cui la rete è stata lanciata. Il dibattito sulla scalabilità si accende sempre dopo un periodo di forte congestione della rete.

Uno dei primi periodi di questo tipo è stato il mercato rialzista delle cripto del 2017, in cui i famigerati CryptoKitties insieme alle ICO sono riusciti a intasare l'intera rete Ethereum, causando un forte picco nelle commissioni del gas. Quest'anno la congestione della rete è tornata ancora più forte, questa volta causata dalla popolarità della finanza decentralizzata (DeFi) e dello yield farming. Ci sono stati periodi in cui persino commissioni del gas superiori a 500 Gwei non avrebbero permesso di verificare la tua transazione per un po' di tempo.

#### Scalare le blockchain (1:20) {#scaling-blockchains-120}

Quando si tratta di scalare Ethereum o le blockchain in generale, ci sono due modi principali per farlo: scalare il livello di base stesso — il layer 1 (l1) — o scalare la rete scaricando parte del lavoro su un altro livello — il layer 2 (l2).

Il layer 1 è il livello di consenso di base standard in cui attualmente vengono regolate quasi tutte le transazioni. Il concetto di layer non è specifico di Ethereum; anche altre blockchain come Bitcoin o Zcash lo utilizzano ampiamente.

Il layer 2 è un altro livello costruito sopra il layer 1. Ci sono alcuni punti importanti qui: il layer 2 non richiede alcuna modifica nel layer 1 — può essere semplicemente costruito sopra il layer 1 utilizzando i suoi elementi esistenti, come i contratti intelligenti. Il layer 2 sfrutta anche la sicurezza del layer 1 ancorando il suo stato al layer 1.

Attualmente Ethereum può elaborare circa 15 transazioni al secondo sul suo livello di base. La scalabilità del layer 2 può aumentare drasticamente il numero di transazioni — a seconda della soluzione, elaborando tra le 2.000 e le 4.000 transazioni al secondo.

#### Ethereum 2.0 (2:39) {#ethereum-20-239}

E per quanto riguarda Ethereum 2.0? Non doveva scalare Ethereum? Sì — Ethereum 2.0 introduce la Proof-of-Stake (PoS) e lo sharding che aumenteranno drasticamente la capacità transazionale sul livello di base.

Questo significa che non avremo bisogno della scalabilità del layer 2 quando Ethereum 2.0 sarà rilasciato? Non esattamente — anche con lo sharding, Ethereum avrà ancora bisogno della scalabilità del layer 2 per poter gestire centinaia di migliaia o addirittura milioni di transazioni al secondo in futuro.

#### Trilemma della scalabilità (3:15) {#scalability-trilemma-315}

È qui che entra in gioco anche il famoso trilemma della scalabilità. In teoria, potremmo semplicemente saltare del tutto il layer 2 e concentrarci invece sulla scalabilità del livello di base. Ciò richiederebbe nodi altamente specializzati per gestire l'aumento del carico di lavoro, il che porterebbe a una maggiore centralizzazione e quindi ridurrebbe la sicurezza e le proprietà di resistenza alla censura della rete.

Attenendoci al fatto che la scalabilità non dovrebbe mai andare a scapito della sicurezza e della decentralizzazione, ci rimane una combinazione di scalabilità del layer 1 e del layer 2 per il futuro.

#### Scalabilità del layer 2 (3:52) {#layer-2-scaling-352}

La scalabilità del layer 2 è un termine collettivo per le soluzioni che aiutano ad aumentare le capacità del layer 1 gestendo le transazioni offchain. Le due capacità principali che possono essere migliorate sono la velocità delle transazioni e la capacità transazionale. Oltre a ciò, le soluzioni di layer 2 possono ridurre notevolmente le commissioni del gas.

Quando si tratta di soluzioni di scalabilità vere e proprie, ci sono diverse opzioni disponibili. Alcune delle opzioni sono disponibili fin da ora e possono aumentare la capacità transazionale della rete Ethereum nel breve e medio termine, mentre altre puntano a un orizzonte temporale a medio-lungo termine. Alcune soluzioni sono specifiche per l'applicazione — ad esempio, i canali di pagamento — mentre altre, come i rollup ottimistici, possono essere utilizzate per qualsiasi esecuzione arbitraria di contratti.

#### Canali (5:03) {#channels-503}

I canali sono una delle prime soluzioni di scalabilità ampiamente discusse. Consentono ai partecipanti di scambiare le loro transazioni un certo numero di volte inviando solo due transazioni al livello di base. I tipi più popolari di canali sono i canali di stato e il loro sottotipo, i canali di pagamento.

Sebbene i canali abbiano il potenziale per elaborare facilmente migliaia di transazioni al secondo, presentano alcuni svantaggi. Non offrono una partecipazione aperta — i partecipanti devono essere noti in anticipo e gli utenti devono bloccare i propri fondi in un contratto multisig. Oltre a ciò, questa soluzione di scalabilità è specifica per l'applicazione e non può essere utilizzata per scalare contratti intelligenti di uso generale.

Il progetto principale che sfrutta la potenza dei canali di stato su Ethereum è Raiden. Il concetto di canali di pagamento è ampiamente utilizzato anche dal Lightning Network di Bitcoin.

#### Plasma (6:04) {#plasma-604}

Plasma è una soluzione di scalabilità del layer 2 originariamente proposta da Joseph Poon e Vitalik Buterin. È un framework per la creazione di applicazioni scalabili su Ethereum.

Plasma sfrutta l'uso di contratti intelligenti e alberi di Merkle per consentire la creazione di un numero illimitato di catene figlie — copie della blockchain principale di Ethereum. Scaricare le transazioni dalla catena principale alle catene figlie consente transazioni veloci ed economiche.

Uno degli svantaggi di Plasma è un lungo periodo di attesa per gli utenti che desiderano prelevare i propri fondi dal layer 2. Plasma, in modo simile ai canali, non può essere utilizzato per scalare contratti intelligenti di uso generale. L'OMG Network è basato sulla propria implementazione di Plasma chiamata More Viable Plasma. Matic Network è un altro esempio di piattaforma che utilizza una versione adattata del framework Plasma.

#### Sidechain (7:08) {#sidechains-708}

Le sidechain sono blockchain indipendenti compatibili con Ethereum con i propri modelli di consenso e parametri di blocco. L'interoperabilità con Ethereum è resa possibile utilizzando la stessa Ethereum Virtual Machine, in modo che i contratti distribuiti sul livello di base di Ethereum possano essere distribuiti direttamente sulla sidechain.

xDai è un esempio di tale sidechain.

#### Rollup ZK (8:11) {#zk-rollups-811}

I rollup forniscono scalabilità raggruppando — o "arrotolando" — le transazioni della sidechain in un'unica transazione e generando una prova crittografica, nota anche come SNARK (Succinct Non-interactive Argument of Knowledge). Solo questa prova viene inviata al livello di base. Con i rollup, tutto lo stato e l'esecuzione delle transazioni vengono gestiti nelle sidechain; la catena principale di Ethereum memorizza solo i dati delle transazioni.

Esistono due tipi di rollup: i rollup ZK e i rollup ottimistici.

I rollup ZK, sebbene più veloci ed efficienti dei rollup ottimistici, non forniscono un modo semplice per i contratti intelligenti esistenti di migrare al layer 2.

I rollup ottimistici eseguono una macchina virtuale compatibile con l'EVM chiamata OVM (Optimistic Virtual Machine), che consente di eseguire gli stessi contratti intelligenti che possono essere eseguiti su Ethereum. Questo è davvero importante in quanto rende più facile per i contratti intelligenti esistenti mantenere la loro componibilità, il che è estremamente rilevante nella DeFi dove tutti i principali contratti intelligenti sono già stati testati sul campo.

Uno dei progetti principali che lavorano sui rollup ottimistici è Optimism, che si sta avvicinando sempre di più al lancio della propria Mainnet. Per quanto riguarda i rollup ZK, Loopring e DeversiFi sono buoni esempi di exchange decentralizzati costruiti sul layer 2. Oltre a ciò, abbiamo zkSync che abilita pagamenti in cripto scalabili.

#### Una roadmap incentrata sui rollup (9:18) {#a-rollup-centric-roadmap-918}

La scalabilità dei rollup può anche essere amplificata da Ethereum 2.0. Infatti, poiché i rollup hanno bisogno solo che il livello dei dati venga scalato, possono ottenere un enorme impulso già nella Fase 1 di Ethereum 2.0, che riguarda lo sharding dei dati.

Nonostante sia disponibile uno spettro di soluzioni di scalabilità del layer 2, sembra che la comunità di Ethereum stia convergendo sull'approccio di scalare principalmente attraverso i rollup e lo sharding dei dati della Fase 1 di Ethereum 2.0. Questo approccio è stato confermato anche in un recente post di Vitalik Buterin intitolato "A Rollup-Centric Ethereum Roadmap".

Nei video futuri, esploreremo la scalabilità del livello di base con Ethereum 2.0 e come la scalabilità sia del layer 1 che del layer 2 possa aiutare a rendere la finanza decentralizzata più accessibile a tutti.