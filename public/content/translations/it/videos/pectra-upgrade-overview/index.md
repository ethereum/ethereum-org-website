---
title: "Cosa c'è nell'aggiornamento Pectra?"
description: "Christine Kim sull'aggiornamento Pectra di Ethereum, coprendo le EIP incluse nell'aggiornamento, cosa cambiano nel protocollo e perché sono importanti per utenti, sviluppatori e validatori."
lang: it
youtubeId: "ufIDBCgdGwY"
uploadDate: 2024-11-14
duration: "0:20:46"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "upgrades"
format: presentation
author: Ethereum Foundation
breadcrumb: "Panoramica su Pectra"
---

Una presentazione di **Christine Kim** alla Devcon SEA che copre le EIP incluse nell'aggiornamento Pectra di Ethereum, cosa cambiano nel protocollo, quando è prevista l'attivazione sulla Mainnet e quali EIP sono state rimosse dall'ambito.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=ufIDBCgdGwY) pubblicata dalla Fondazione Ethereum. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione (0:00) {#introduction-000}

Parleremo di tutte le EIP che faranno parte dell'aggiornamento Pectra. Un rapido disclaimer prima di iniziare: tutto ciò che sto per dire è a scopo informativo — per scopi informativi — e non deve essere interpretato come un consiglio finanziario o di investimento.

#### Quando arriverà Pectra sulla Mainnet (0:23) {#when-is-pectra-mainnet-023}

Prima di addentrarci in cosa ci sarà in Pectra, la domanda che mi viene posta più spesso è "quando arriverà Pectra sulla Mainnet?". Quindi me ne sbarazzerò subito per poter passare alle questioni tecniche.

Questa è un'analisi delle tempistiche molto provvisoria. Quando le persone mi chiedono quando avverrà Pectra, rispondo che è troppo presto per dirlo — perché è vero. Pectra è ancora nelle primissime fasi del suo sviluppo. Le specifiche stanno cambiando e l'ambito di Pectra non è ancora stato veramente finalizzato.

Attraverso questo processo, una delle cose che si possono imparare è come vengono sviluppati gli aggiornamenti, come vengono testati e, infine, come arrivano sulla Mainnet. Inizialmente, gli sviluppatori decidono un paio di EIP da includere in un aggiornamento, e poi implementano quelle EIP su testnet private incentrate sugli sviluppatori chiamate devnet. Gli sviluppatori hanno già lanciato un paio di devnet per Pectra, quindi queste EIP hanno già subito un paio di cicli di implementazione. Gli sviluppatori hanno notato casi limite e bug che vogliono correggere, e iterano su queste EIP lanciando nuove devnet. La devnet 4 è stata lanciata il mese scorso, a ottobre.

Di solito questo non succede, ma gli sviluppatori — in modo molto speciale per l'intera conferenza e per tutti i presenti tra il pubblico — hanno lanciato la prima testnet pubblica di Pectra questo mese. Si chiama Mekong, quindi potete andare a interagire in anticipo con alcune delle EIP che saranno in Pectra. È basata sulle specifiche della devnet 4, ma tenete presente che tali specifiche stanno cambiando.

C'è un elenco di modifiche alle specifiche per le EIP che gli sviluppatori vogliono già includere nella devnet 5 di Pectra — cose come il repricing del precompilato BLS e una nuova EIP che non è stata implementata nella devnet 4 ma che gli sviluppatori mirano a implementare per la devnet 5 o un aggiornamento futuro. Quindi le specifiche di Pectra stanno cambiando. Prevedo che ci vorranno ancora diverse devnet prima che le specifiche possano essere veramente congelate.

L'altra parte davvero importante per l'aggiornamento Pectra nel suo percorso verso la Mainnet è che l'ambito venga finalizzato — che vengano decise tutte le EIP che entreranno in Pectra. C'è un'EIP — non è ancora propriamente un'EIP — ma è l'aumento della capacità dei blob che gli sviluppatori non hanno ancora formalmente incluso in Pectra, ma sembra probabile che includeranno un qualche tipo di aumento della capacità dei blob perché hanno recentemente incluso un'EIP che introduce un meccanismo per aggiornare dinamicamente il target del gas dei blob e il massimo del gas dei blob attraverso il livello di consenso, piuttosto che avere quei parametri hardcoded nel livello di esecuzione e nel livello di consenso.

Una volta finalizzato l'ambito, si inizia a testare qualsiasi nuova EIP implementata — l'intero ambito dell'aggiornamento Pectra — e la si testa sul campo su un altro paio di devnet. Immagino forse fino alla devnet 6 o 7. E poi, una volta che le specifiche di Pectra saranno congelate e pronte per partire — e tutti i casi limite che gli sviluppatori possono trovare sulle devnet saranno stati trovati — rilasceranno l'aggiornamento Pectra sulle testnet pubbliche di Ethereum. Al momento ce ne sono due: Sepolia e Holesky.

Storicamente, gli sviluppatori hanno preventivato circa due settimane tra gli aggiornamenti delle testnet pubbliche. In rare occasioni, gli sviluppatori hanno ridotto questa tempistica a una sola settimana tra le testnet, ma a causa delle dimensioni di Pectra, immagino che gli sviluppatori vorranno prendersi tutto il tempo necessario. Sto preventivando all'incirca un mese per Sepolia e Holesky, e dopodiché è quando si potrà finalmente avere l'attivazione sulla Mainnet.

Date tutte le informazioni che conosco in questo momento e i progressi che gli sviluppatori hanno fatto finora su Pectra, la mia migliore analisi e ipotesi è che la Mainnet di Pectra avverrà realisticamente il prossimo aprile 2025. Ancora una volta, questo è molto provvisorio perché molte cose possono cambiare. Lo sviluppo avviene di settimana in settimana — gli sviluppatori partecipano a queste chiamate ACD parlando di questo bug che non si aspettavano in questa EIP o di questa nuova EIP che vogliono aggiungere a Pectra.

#### EIP del livello di esecuzione (6:23) {#execution-layer-eips-623}

Passiamo al nocciolo di questo discorso: cosa ci sarà nell'aggiornamento Pectra. Ci sono dieci EIP che entreranno in Pectra, e quattro di esse sono incentrate sul livello di esecuzione.

**EIP-2537** è un nuovo precompilato nell'EVM — operazioni sulla curva BLS12-381. Questo è un nuovo schema di firma crittografica che gli sviluppatori di smart contract chiedono da molto tempo. Questa EIP è stata creata nel 2020 e all'epoca gli sviluppatori di applicazioni decentralizzate (dapp) dicevano di volerla davvero perché avrebbe fornito ad alcune dapp che si basano sulla crittografia a conoscenza zero garanzie di privacy più forti, e potenzialmente maggiore sicurezza e scalabilità. Le firme BLS sono anche l'aggregazione che avviene sul livello di consenso per le attestazioni dei validatori. Questa EIP si è fatta attendere a lungo. Una delle preoccupazioni è: ci sono ancora app che aspettano il precompilato BLS e lo useranno quando andrà live? Ma se siete tra il pubblico e non sapevate che il precompilato BLS sta finalmente arrivando — sta arrivando.

**EIP-2935** — servire gli hash dei blocchi storici dallo stato. Questa introduce una modifica al livello di esecuzione tale per cui le prove dei blocchi storici possono essere generate dallo stato. Ha alcuni vantaggi a breve termine per la sincronizzazione dei client leggeri e per gli smart contract che potrebbero voler utilizzare i dati sullo stato di un blocco precedente direttamente tramite l'EVM — attualmente non è possibile farlo. Ma questi vantaggi a breve termine non sono il motivo principale per cui questa EIP è stata inclusa in Pectra. Il motivo principale è che si tratta di un prerequisito per Verkle — la grande revisione della struttura dei dati di stato di Ethereum. Gli sviluppatori pensavano che la transizione sarebbe avvenuta subito dopo Pectra, ma Verkle non entrerà in Fusaka. L'hanno rimandata a un altro aggiornamento, ma questo passo intermedio è già stato spuntato dalla lista.

**EIP-7685** — richieste di uso generale del livello di esecuzione. Questa EIP non introduce in realtà nuove funzionalità in Ethereum — è un'EIP per supportare altre EIP in Pectra. In Pectra, ci sono un paio di EIP in cui il livello di esecuzione sarà in grado di passare molti più messaggi — diversi tipi di messaggi — al livello di consenso che prima non poteva passare. Gli smart contract sul livello di esecuzione saranno in grado di innescare prelievi, consolidamenti e depositi dei validatori. Piuttosto che implementare questi nuovi canali di comunicazione tutti in modo separato e unico, questa EIP crea una struttura generalizzata — un bus generalizzato — per ospitare queste richieste. Sarà più facile da testare, più facile da implementare tra i client e più facile da standardizzare, specialmente se gli sviluppatori vorranno introdurre nuovi tipi di richieste innescabili dal livello di esecuzione.

**EIP-7702** — impostare il codice per gli account di proprietà esterna (EOA). Un nuovo tipo di transazione sta arrivando su Ethereum. Questo tipo di transazione consentirà temporaneamente a un EOA di avere una maggiore flessibilità, abilitando funzionalità come il batching delle transazioni, le transazioni sponsorizzate, le transazioni condizionali e la sicurezza delegata. Potreste pensare: "è questa la visione dell'astrazione dell'account che prende vita su Ethereum?". No, non lo è — è un piccolo passo. È un primo passo per vedere come potrebbe essere la vera roadmap verso una vera astrazione dell'account nativa su Ethereum. C'è stato un bel po' di dibattito su come gli sviluppatori avrebbero dovuto fare quel primo passo, e molte controversie sul suo inserimento e sul suo design — ma è dentro.

#### EIP del livello di consenso (12:00) {#consensus-layer-eips-1200}

Ce ne sono altre sei — queste sono EIP del livello di consenso.

**EIP-7742** — disaccoppiare il conteggio dei blob tra il livello di consenso e il livello di esecuzione. Questa è l'EIP più recente ad essere stata inclusa in Pectra. Attualmente, la capacità dei blob è hardcoded nel livello di esecuzione e nel livello di consenso in tutti i diversi client. Aggiornare quell'hardcoding non è così facile come alcuni potrebbero pensare. Creare un meccanismo per impostare dinamicamente la capacità dei blob attraverso il livello di consenso garantirà che in futuro gli sviluppatori possano facilmente modificare la capacità dei blob di Ethereum, e che un tale aggiornamento richieda solo modifiche al livello di consenso — non modifiche a entrambi i livelli.

**EIP-6110** — fornire i depositi dei validatori onchain. The Merge è avvenuto ed Ethereum è più maturo come blockchain Proof-of-Stake (PoS). Alcune assunzioni di sicurezza possono ora essere allentate. Questa EIP rimuove un ulteriore round di votazione che avviene sul lato del livello di consenso ogni volta che si depositano 32 ETH sul contratto di deposito, garantendo che tutta la convalida dei depositi avvenga sul livello di esecuzione. Questo ha dei vantaggi per l'esperienza utente (UX) dei validatori — ridurrà il tempo tra quando si depositano i 32 ETH e quando si vede il validatore effettivamente attivato sulla Beacon Chain.

**EIP-7002** — prelievi innescabili dal livello di esecuzione. Questo è molto positivo per le pool di staking. Al momento, se si desidera prelevare completamente un validatore, l'operatore del nodo che gestisce quel validatore deve utilizzare la propria chiave di prelievo per far uscire completamente il validatore. Attraverso questa EIP, gli smart contract saranno in grado di avviare quei prelievi completi. È un'assunzione di fiducia che ora si può rimuovere dalle pool di staking — entità come Lido, Rocket Pool e altre pool di staking basate su smart contract possono ora innescare prelievi completi dei validatori se lo desiderano.

**EIP-7251** — aumentare il saldo effettivo massimo. Questo è davvero un problema. Quando gli sviluppatori stavano pensando alla Beacon Chain, non si aspettavano che il set di validatori crescesse così rapidamente — siamo a circa 1,2 o 1,3 milioni di validatori. Ci sono molti validatori attivi, molti messaggi che vengono scambiati sul livello di rete, ed è troppo. Sta mettendo a dura prova i nodi e, se lasciato incontrollato, sarebbe un grave problema per la salute di Ethereum. L'EIP-7251 è progettata per incoraggiare i validatori a consolidare i loro ETH e ad avere un saldo effettivo massimo (MaxEB) superiore a 32 ETH, riducendo il numero di validatori attivi su Ethereum.

**EIP-7549** — spostare l'indice del comitato fuori dall'attestazione. Si tratta di una ristrutturazione e di un refactoring del modo in cui le attestazioni vengono aggregate per ridurre il carico di rete su Ethereum e risparmiare la larghezza di banda dei nodi. Quando gli sviluppatori l'hanno inclusa in Pectra, pensavano che fosse un grande cambiamento con meravigliosi vantaggi e facile da realizzare — ma in pratica, si è rivelato molto più difficile da implementare del previsto.

#### Riepilogo (17:19) {#summary-1719}

Pectra è un insieme eterogeneo di aggiornamenti. Farà tre cose: primo, risolverà le carenze critiche di Ethereum come blockchain Proof-of-Stake — pensate a MaxEB, è una correzione critica perché la dimensione del set di validatori può continuare a crescere in modo incontrollato. Secondo, migliorerà l'esperienza utente — il nuovo tipo di transazione, design più flessibili, alcuni miglioramenti per design più trustless per le pool di staking. E terzo, aumenterà la capacità di disponibilità dei dati di Ethereum — questo non è stato formalmente incluso in Pectra ma sembra probabile.

#### EIP rimosse da Pectra (18:02) {#eips-removed-from-pectra-1802}

Ecco tutte le EIP che sono state rimosse da Pectra. È una sorta di prima volta che un aggiornamento vede rimosse così tante EIP.

**PeerDAS** — inizialmente ci sarebbe dovuto essere un aumento molto più grande della capacità di disponibilità dei dati in Pectra. PeerDAS consentirebbe agli sviluppatori di aumentare il target dei blob di Ethereum di molti multipli in più senza avere un grande impatto sul consumo di larghezza di banda e sui requisiti computazionali per l'esecuzione di un nodo Ethereum. Ma è ancora in fase di ricerca e sviluppo.

**EOF** — l'EVM Object Format. Queste undici modifiche al codice come pacchetto rappresentano un importante aggiornamento per l'EVM di Ethereum. Sia PeerDAS che EOF erano stati inizialmente inclusi in Pectra, ma venivano testati su devnet separate. Gli sviluppatori hanno ritenuto che avrebbero richiesto molto più tempo per essere pronti per l'attivazione sulla Mainnet e non volevano ritardare le altre EIP di Pectra. Quindi hanno detto che PeerDAS ed EOF hanno chiaramente bisogno di più tempo — li sposteranno a un altro aggiornamento e non tratterranno le altre EIP di Pectra dalla Mainnet.

Questi sono ora spostati in Fusaka. Verkle era inizialmente previsto per Fusaka ma da allora è stato ulteriormente ritardato. EOF e PeerDAS sono in Fusaka per ora. Ci sono altre EIP che gli sviluppatori riconsidereranno per l'inclusione in Fusaka — la transizione a SSZ, le liste di inclusione, le modifiche all'emissione, la scadenza della cronologia, ePBS e la direzione dell'astrazione dell'account.

#### Domande e risposte (22:02) {#qa-2202}

**Host:** Quando arriverà EOF?

**Christine Kim:** Ho letteralmente appena detto che gli sviluppatori cercheranno di inserirlo in Fusaka. Penso che sia probabile? Probabilmente no. Penso che Fusaka avverrà nel 2025? Assolutamente no. La quantità di tempo che ci è voluta per preparare Pectra — Fusaka richiederà un tempo simile, se non più lungo.

**Host:** Esiste un percorso di emergenza per aumentare il target dei blob da qui all'attivazione di Pectra?

**Christine Kim:** No. Il target dei blob è un parametro hardcoded nel livello di esecuzione e nel livello di consenso. Affinché la capacità dei blob cambi, gli sviluppatori devono eseguire un hard fork. Non credo che ci sia alcun modo per aumentare la capacità dei blob da qui a Pectra senza un hard fork.

**Host:** La proposta è di cambiare solo il limite dei blob o anche il target dei blob?

**Christine Kim:** Ottima domanda. L'aumento più conservativo è da tre a quattro — cambiando solo il target, senza cambiare affatto il massimo. Ma non è quello che hanno chiesto gli sviluppatori dei layer 2 (l2). C'è un rappresentante del team di Base — il team di Base di Coinbase — e ha spinto per aumenti più aggressivi. Ha mostrato dati che suggeriscono che l'aumento non avrebbe un impatto negativo sulla decentralizzazione di Ethereum. C'è una proposta conservativa per cambiare solo il target, e poi c'è una proposta più ambiziosa per cambiare sia il massimo che il target — come otto e quattro, o sei e dodici. Ci sono varie sfumature.

**Host:** Hai esortato le persone a essere più coinvolte nella governance. Come può la comunità essere più coinvolta?

**Christine Kim:** ETH Research ed ETH Magicians sono due forum di discussione davvero ottimi per votare a favore di determinate EIP e mostrare il proprio supporto. Le chiamate ACD sono probabilmente il luogo con il segnale più alto — tutto ciò che devi fare è lasciare un commento sull'agenda della chiamata ACD su GitHub e dire che questa è un'EIP di cui vorresti parlare o che vorresti presentare. Il moderatore della chiamata di solito è molto disponibile a concederti del tempo. Non prendere troppo tempo però — magari cinque minuti per dire la tua.