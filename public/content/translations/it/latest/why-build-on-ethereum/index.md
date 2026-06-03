---
title: "Perché costruire su Ethereum"
description: "Decentralizzazione, resistenza alla censura, distribuzione permissionless e componibilità non sono punti di forza separati. Si rafforzano a vicenda. Una guida pratica sul perché i costruttori dovrebbero scegliere Ethereum."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "decentralizzazione"
  - "resistenza alla censura"
  - "componibilità"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Perché costruire su Ethereum"
lang: it
---

I costruttori scelgono l'infrastruttura in base alle promesse che la loro app deve mantenere.

La maggior parte delle promesse del software dipende da un operatore. Un provider cloud mantiene il server in funzione. Una piattaforma mantiene l'account aperto. Un processore di pagamento mantiene abilitato il commerciante. Un fornitore di API mantiene valida la chiave. Questo va bene per molti prodotti. Non è sufficiente quando il valore del prodotto dipende da un accesso neutrale, da uno stato condiviso e da commitment che gli utenti e gli altri sviluppatori possono verificare da soli.

Ethereum è costruito per il secondo caso, in cui l'accesso neutrale e i commitment verificabili sono il prodotto. Nessuno lo possiede. La catena è in esecuzione in molti paesi, con molti operatori e molteplici implementazioni di client indipendenti, e nessuna singola azienda, validatore o fondazione può riscrivere silenziosamente le regole. Per un costruttore, questo significa che non è solo un posto dove ospitare codice. È un luogo in cui prendere commitment pubblici. Puoi distribuire senza chiedere a nessuno, gli utenti possono continuare a raggiungere ciò che distribuisci, altri sviluppatori possono costruirci sopra senza il tuo permesso e la tua app può continuare a funzionare anche quando una qualsiasi parte, incluso te, smette di collaborare.

## Decentralizzazione {#decentralization}

La decentralizzazione è la base su cui poggiano queste proprietà. Ethereum la offre attraverso una rete di computer, chiamati nodi, che memorizzano ciascuno una copia della catena e controllano ogni transazione. Ogni nodo esegue un software client. Un sottoinsieme di nodi, chiamati validatori, si alternano nel proporre e confermare nuovi blocchi attraverso un processo chiamato consenso. Per partecipare, i validatori mettono degli ETH come collaterale, chiamato stake, che perdono se infrangono le regole. Tra i 13.700 e i 14.000 nodi sono stati tracciati nel tracker dei nodi di Etherscan nell'aprile 2026, distribuiti tra Stati Uniti, Germania, Cina, Regno Unito, Russia, Giappone e dozzine di altri paesi.

La decentralizzazione è anche economica. Circa 32-36 milioni di ETH, circa il 27-29% dell'offerta, sono messi in staking come collaterale che il protocollo taglia (slash) quando i validatori si comportano in modo dimostrabilmente scorretto. Un utente malintenzionato dovrebbe acquisire e rischiare una frazione significativa di quello stake per corrompere la catena. Ai prezzi di ETH dell'aprile 2026, ciò significa che decine di miliardi di dollari sarebbero a rischio.

L'altra dimensione è il software stesso. Ogni nodo Ethereum esegue due software fianco a fianco. Un client di esecuzione esegue l'EVM e tiene traccia dello stato del contratto. Un client di consenso gestisce la Proof-of-Stake (PoS). Tiene traccia di quali validatori propongono i blocchi, quali blocchi la rete accetta e quando un blocco raggiunge la definitività. Una sana decentralizzazione necessita di molteplici implementazioni indipendenti di ciascuno, in modo che un bug in un client non diventi automaticamente un bug in Ethereum.

Il livello di esecuzione ha cinque client principali in produzione. Geth è in esecuzione a circa il 50%, Nethermind a circa il 25%, Besu a circa il 9%, Reth a circa l'8% ed Erigon a circa il 7%. Il livello di consenso è in esecuzione su Lighthouse, Prysm, Teku, Nimbus, Lodestar e altri client. Ethereum non è una catena a client singolo su nessuno dei due livelli.

La quota di quasi il 50% di Geth è la vera fragilità. Un bug in un client di minoranza è doloroso per i suoi operatori, ma il resto della rete può continuare. Un bug grave in un client di maggioranza è più pericoloso. Ecco perché la diversità dei client è una priorità operativa attiva.

Questa priorità è stata messa alla prova. Ethereum non ha mai avuto un arresto completo della catena dalla genesi del 30 luglio 2015. Il momento in cui si è andati più vicini a un grave incidente è stato l'11 e 12 maggio 2023, quando il livello di consenso, chiamato Beacon Chain, non è riuscito a raggiungere la definitività per circa 25 minuti e poi in seguito per circa 64 minuti. La causa è stata un bug del client Prysm. La definitività richiede l'attestazione di più di due terzi dei validatori e la quota di Prysm all'epoca era abbastanza alta che il suo problema ha brevemente trascinato la rete al di sotto di quella soglia.

Uno stallo della definitività non è la stessa cosa di un arresto della catena. Nuovi blocchi hanno continuato a essere prodotti, le transazioni hanno continuato a essere incluse e la maggior parte degli utenti e delle applicazioni ha continuato a funzionare. Ciò che si è bloccato è stata la più forte garanzia di regolamento di Ethereum. In base alle normali ipotesi di consenso, un blocco più vecchio di circa 13 minuti non può essere annullato. I bridge, gli exchange e altri sistemi che attendono la definitività prima di accreditare i depositi avrebbero messo in pausa quei flussi. La catena stessa si è ripresa automaticamente una volta che un numero sufficiente di validatori si è rimesso in pari, senza intervento manuale.

Per i costruttori, questa storia è importante. Se altre persone deterranno asset nei tuoi contratti, indirizzeranno gli ordini attraverso il tuo mercato o costruiranno sulla tua primitiva, hanno bisogno che le fondamenta sottostanti continuino a funzionare nonostante bug, guasti dei client e pressioni istituzionali.

## Resistenza alla censura {#censorship-resistance}

La decentralizzazione è la struttura. La resistenza alla censura è una delle cose pratiche che si ottengono. Gli utenti non dovrebbero aver bisogno del permesso di un'azienda, di un governo, di un relay, di un validatore, di un provider RPC o di un operatore di app per inviare una transazione valida ai tuoi contratti.

Questo non significa che ogni transazione finisca nel blocco successivo. Significa che nessuna singola parte può tenere una transazione valida fuori dalla catena per sempre. Ogni blocco è proposto da un validatore diverso, che lavora con parti esterne, chiamate costruttori e relay, per assemblarlo. Se uno di loro filtra la tua transazione, lo slot successivo ha un set diverso e alla fine uno di loro la include. La censura deve persistere in tutto quel cast a rotazione, il che è molto più difficile rispetto a un singolo operatore che dice di no. Il periodo successivo a Tornado Cash ha mostrato come si presenta questa situazione sotto pressione.

Tornado Cash è un contratto mixer per la privacy che interrompe il collegamento onchain tra deposito e prelievo. Dopo che l'OFAC lo ha sanzionato nell'agosto 2022, diversi importanti relay MEV-Boost si sono rifiutati di inoltrare blocchi contenenti transazioni da indirizzi sanzionati. La quota di blocchi costruiti attraverso quei relay conformi all'OFAC ha raggiunto il picco di quasi il 79% nel novembre 2022. L'altro 21% proveniva da relay e costruttori che non filtravano, quindi le transazioni di Tornado Cash arrivavano comunque, solo più lentamente. L'attesa prevista è salita da circa 12 secondi a circa un minuto.

Sembrava allarmante, e lo era. Poi la quota è scesa. Nuovi relay sono stati lanciati esplicitamente senza filtri, tra cui Ultra Sound e Agnostic, e i proponenti erano liberi di aggiungerli alla loro configurazione MEV-Boost. Nessuno poteva forzare ogni proponente su un relay di filtraggio, quindi la quota non poteva rimanere al suo picco. All'inizio del 2023 era scesa sotto il 50% e per il resto del 2023 ha oscillato tra il 27% e il 47%. L'OFAC ha rimosso Tornado Cash dall'elenco delle sanzioni nel marzo 2025. L'episodio rimane il più chiaro stress test di resistenza alla censura di Ethereum.

Ethereum sta anche spostando una parte maggiore di questa garanzia nel protocollo stesso. Un aggiornamento pianificato chiamato FOCIL (EIP-7805) aggiunge le liste di inclusione. Validatori selezionati casualmente pubblicano le transazioni che vedono nella mempool pubblica e ci si aspetta che il blocco successivo soddisfi quelle liste. Se un blocco le ignora, il resto della rete può rifiutarlo. Quindi nessuno può impedire ai tuoi utenti di utilizzare la tua app.

## Permissionless {#permissionless}

La resistenza alla censura riguarda la possibilità per gli utenti di continuare a raggiungere la tua app dopo averla distribuita. La natura permissionless riguarda la possibilità di distribuirla in primo luogo.

La distribuzione su Ethereum non richiede una partnership, un account, un'approvazione per la quotazione, una revisione dell'app store o un accordo commerciale. Chiunque può distribuire codice, chiamare un contratto, eseguire un nodo, indicizzare dati, costruire un portafoglio o pubblicare un'interfaccia. Il livello di base non sa se sei una startup, una banca, uno sviluppatore solista, un agente, una DAO o un utente senza alcuna azienda.

Questo cambia il modello del costruttore. Su una piattaforma, il proprietario della piattaforma può modificare i termini, revocare le chiavi, bloccare le regioni, rimuovere le app o subordinare l'accesso a una relazione commerciale. Su Ethereum, il protocollo valuta le transazioni in base alle stesse regole pubbliche per qualsiasi chiamante. Un contratto distribuito oggi funziona in base a quelle regole pubbliche per ogni indirizzo finché la catena continua a funzionare.

Questo non rimuove ogni dipendenza. La maggior parte degli utenti non raggiunge direttamente i tuoi contratti. Passano attraverso un frontend, un portafoglio e un provider RPC, e ognuno di questi livelli può rompersi o filtrare. I frontend possono essere disattivati. I provider RPC, i servizi che instradano la maggior parte delle richieste di app e portafogli alla catena, possono rifiutarsi di inoltrare transazioni o bloccare regioni e indirizzi specifici. I portafogli possono scegliere cosa visualizzare.

L'ambiente di esecuzione di base rimane aperto al di sotto. Se il tuo frontend si blocca, un utente può comunque chiamare direttamente il contratto e un altro sviluppatore può creare una nuova interfaccia. Se un portafoglio smette di supportare il tuo token, il contratto funziona ancora. Se un provider RPC filtra, un'app può instradare attraverso un altro o eseguire il proprio nodo per raggiungere la rete.

## Componibilità {#composability}

La natura permissionless porta il tuo codice sulla catena. Una volta che è lì, nessuno può rimuoverlo, quindi altri sviluppatori possono costruire sopra i tuoi contratti e tu puoi costruire sui loro.

WETH è l'esempio più chiaro. È un contratto che incapsula ETH in modo che possa essere utilizzato come un token standard in altri contratti. Si trova a un indirizzo Ethereum fisso, detiene circa 1,8 milioni di WETH a maggio 2026, ha circa 3,25 milioni di detentori e funge da unità comune tra DEX, mercati di prestito, caveau e bridge. È un codice che migliaia di altri contratti e app possono utilizzare direttamente.

Questo modello si ripete in tutto l'ecosistema. Dalla genesi all'inizio del 2025, Ethereum ha visto decine di milioni di distribuzioni di contratti e circa 2,5 milioni di bytecode unici secondo il conteggio di Zellic. Standard come ERC-20 per i token fungibili ed ERC-721 per i token non fungibili (NFT) sono diventati livelli di coordinamento. Un token emesso dal tuo contratto può essere scambiato su un DEX, preso in prestito in un mercato monetario, indicizzato da strumenti di analisi, visualizzato nei portafogli e collegato tramite bridge o incapsulato da altri sistemi senza che ogni team debba negoziare un accordo personalizzato.

A maggio 2026, circa 46 miliardi di dollari si trovavano nella finanza decentralizzata (DeFi) su Ethereum. Quel denaro è bloccato all'interno di migliaia di protocolli funzionanti, tra cui asset, mercati, oracoli, portafogli, sistemi di account, contratti di governance, bridge, analisi e strumenti per sviluppatori. Tutto questo è codice che puoi chiamare direttamente dal primo giorno, invece di costruire da zero o aspettare partnership.

## L'economia degli agenti {#the-agent-economy}

L'accesso permissionless e la resistenza alla censura, con la decentralizzazione alla base, contano ancora di più per la prossima ondata di utenti che entreranno in Ethereum. Gli agenti IA sono quell'ondata e pagano per i servizi, detengono capitale e regolano i conti con altri agenti attraverso transazioni e chiamate di contratto, tutto senza un essere umano nel ciclo. Un agente non ha una carta da addebitare, nessun account di piattaforma da sospendere e nessun essere umano da chiamare quando un relay si rifiuta di inoltrare una transazione. Ecco perché entrambi smettono di essere opzionali per quel tipo di software e le proprietà di Ethereum corrispondono direttamente a ciò di cui un agente ha effettivamente bisogno. Ethereum è il luogo in cui si prevede che si svilupperà quell'economia, e questo potrebbe far crescere immensamente la base di utenti.

Sia che tu distribuisca l'agente o i contratti che l'agente chiama, si presentano gli stessi problemi. Su un tipico stack ospitato, l'identità dell'agente viene affittata da un account di piattaforma che può essere revocato. I suoi pagamenti dipendono dalla carta o dalla chiave API di un essere umano. Le sue regole vengono eseguite su un server controllato da un operatore. La sua continuità dipende da un host che può scomparire. Ognuna di queste dipendenze è ciò che il livello di base di Ethereum è progettato per rimuovere.

Su Ethereum, nulla di tutto ciò dipende da un operatore. Le chiavi dell'agente sono le sue e le regole che firma non possono essere riscritte unilateralmente. Le sue transazioni passano attraverso lo stesso cast a rotazione di validatori, costruttori e relay che protegge qualsiasi altro indirizzo dal blocco mirato. Le transizioni di stato avvengono in pubblico, quindi i contratti dall'altra parte della chiamata non devono fidarsi di un operatore per segnalare l'accaduto.

I binari sono già al loro posto. I contratti intelligenti (smart contract), le stablecoin e l'astrazione dell'account offrono oggi a un attore autonomo un indirizzo funzionante, un saldo funzionante e limiti di spesa programmabili. Gli standard per l'identità degli agenti e i pagamenti nativi delle macchine stanno recuperando terreno. ERC-8004 definisce i registri onchain per l'identità, la reputazione e la convalida degli agenti. x402 utilizza il codice di stato HTTP 402 per consentire ai client, inclusi gli agenti, di pagare API e servizi digitali in stablecoin senza account tradizionali. L'adozione è agli inizi ma in movimento e la superficie di integrazione è piccola. Accetta pagamenti x402 ai tuoi endpoint, registra o controlla l'identità tramite ERC-8004 e tratta gli indirizzi degli agenti come utenti di prima classe nei tuoi contratti.

Per qualsiasi costruttore che sceglie una catena su cui distribuire, gli agenti sono la prossima classe di utenti in formazione e i binari sono già attivi. I contratti che distribuisci oggi possono servirli domani senza aspettare un protocollo futuro.

## Conclusione {#conclusion}

Decentralizzazione, resistenza alla censura, distribuzione permissionless e componibilità non sono punti di forza separati. Si rafforzano a vicenda. La decentralizzazione rende credibile la resistenza alla censura e consente agli utenti di continuare a raggiungere ciò che viene distribuito. La distribuzione permissionless consente ai costruttori di distribuire. La componibilità trasforma quelle app in un'infrastruttura condivisa. Gli agenti autonomi possono effettuare transazioni attraverso di essa e nessuno può fermarli. Ciò che distribuisci è un commitment pubblico. Continua a funzionare senza di te.

## Letture di approfondimento {#further-reading}

- [Fondazione Ethereum Checkpoint #9 (aprile 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [clientdiversity.org](https://clientdiversity.org/)
- [Tracker dei nodi di Etherscan](https://etherscan.io/nodetracker)
- [Validatori beaconcha.in](https://beaconcha.in/charts/validators)
- [Post-mortem: definitività della Mainnet di maggio 2023](https://medium.com/offchainlabs/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2)
- [mevwatch.info](https://www.mevwatch.info/)
- [The Block: i blocchi conformi all'OFAC scendono al 27%](https://www.theblock.co/post/230179/ethereums-ofac-compliant-blocks-fall-to-27-marking-a-drop-in-protocol-level-censorship)
- [Proposta Hegotá Headliner: FOCIL (EIP-7805)](https://ethereum-magicians.org/t/hegota-headliner-proposal-focil-eip-7805/27604)
- [EIP-7805: Liste di inclusione applicate alla scelta del fork (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8004: Identità dell'agente onchain](https://eips.ethereum.org/EIPS/eip-8004)
- [GitHub di coinbase/x402](https://github.com/coinbase/x402)
- [CoinDesk: la domanda di x402 non si è materializzata](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)
- [WETH su Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Zellic: Tutti i contratti Ethereum](https://www.zellic.io/blog/all-ethereum-contracts/)
- [DefiLlama: catena Ethereum](https://defillama.com/chain/ethereum)
- [OpenZeppelin: Valutazione del rischio tecnico sulle reti blockchain (aprile 2026)](https://openzeppelin.com/hubfs/OpenZeppelin%20%7C%20Technical%20Risk%20Assessment%20on%20Blockchain%20Networks.pdf)