---
title: "EigenLayer: aggiunta di funzionalità permissionless a Ethereum"
description: "Sreeram Kannan presenta l'approccio di EigenLayer all'aggiunta di funzionalità permissionless su Ethereum."
lang: it
youtubeId: "-V-fG4J1N_M"
uploadDate: 2023-02-10
duration: "0:24:11"
educationLevel: advanced
topic:
  - "restaking"
  - "eigenlayer"
  - "security"
format: presentation
author: a16z crypto
breadcrumb: "EigenLayer"
---

Un intervento di ricerca di **Sreeram Kannan** (Università di Washington / EigenLayer) a un evento di ricerca cripto di a16z, che spiega come EigenLayer miri a consentire l'innovazione permissionless su Ethereum permettendo a chi fa staking di vincolare lo stesso capitale in staking a condizioni di slashing aggiuntive in cambio della fornitura di nuovi servizi come oracoli, ponti, livelli di disponibilità dei dati e ambienti di esecuzione alternativi.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=-V-fG4J1N_M) pubblicata da a16z crypto. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione (0:00) {#introduction-000}

Oggi parlerò di uno dei prodotti che stiamo costruendo, che è anche un'idea chiamata EigenLayer. Chiamiamo EigenLayer il collettivo di restaking, ma ciò che fa è consentire a chiunque di aggiungere nuove funzionalità a Ethereum.

Come ha introdotto Tim, sono un professore associato all'Università di Washington a Seattle, dove abbiamo lavorato su blockchain, consenso e altre aree negli ultimi quattro anni e mezzo. Nell'ultimo anno, ho fondato la startup EigenLayer Labs. Abbiamo svolto molto lavoro sui protocolli di consenso — abbiamo pubblicato un articolo intitolato "Everything is a Race" che analizza le condizioni in cui i protocolli del tipo a catena più lunga basati su Prova di lavoro (PoW), Proof-of-Stake (PoS) e proof of space sono sicuri. Abbiamo costruito su parte di questa comprensione — ad esempio, un articolo chiamato Prism, che è un protocollo di Prova di lavoro (PoW) a bassissima latenza. Abbiamo anche svolto un lavoro chiamato PoSAT su come creare un protocollo Proof-of-Stake (PoS) dinamicamente disponibile, in cui il protocollo continua a funzionare con una partecipazione variabile.

#### Quando le blockchain sono responsabili (1:31) {#when-are-blockchains-accountable-131}

Abbiamo anche esplorato quando le blockchain sono responsabili. Un'euristica è che quando si hanno quorum e firme, se un gruppo di staker firma due volte un blocco, quelle blockchain sono responsabili. Ma ci sono delle sottigliezze — ad esempio, un protocollo come Algorand, che utilizza anch'esso i quorum, non è responsabile perché si basa su presupposti di tempistica in cui è possibile creare violazioni della sicurezza semplicemente non comunicando nulla.

#### Consenso multi-risorsa (2:11) {#multi-resource-consensus-211}

I due lavori più recenti riguardano il consenso multi-risorsa: supponiamo di voler costruire un protocollo che utilizzi Proof-of-Stake (PoS), proof of space e Prova di lavoro (PoW) tutti combinati in un unico protocollo. Si desidera che funzioni anche se la maggioranza dei minatori della Prova di lavoro (PoW) è malintenzionata, a patto che una piccolissima frazione dei minatori della Proof-of-Stake (PoS) sia onesta. Abbiamo caratterizzato le regioni di compromesso tra più risorse.

Abbiamo anche lavorato sulla progettazione della topologia peer-to-peer: come ci si assicura che nella rete peer-to-peer di una blockchain, il protocollo di consenso rispetti l'ordinamento dei messaggi? Una delle cose che accade in modo dilagante nelle blockchain è il front-running. Per prevenire il front-running non mirato — in cui si vuole semplicemente passare davanti a tutti gli altri perché si ha un vantaggio di prezzo — abbiamo un articolo chiamato Themis che conferisce alla blockchain una proprietà nativa di first-in-first-out.

Oltre al consenso, ci sono soluzioni di ridimensionamento come lo sharding. Abbiamo pubblicato un paio di articoli — Coded Merkle Tree e Free2Shard — a riguardo.

Una cosa che abbiamo riscontrato come un forte attrito nella blockchain è che il tasso di innovazione ai livelli principali — nel consenso, nello sharding o nel peer-to-peer — è molto inferiore rispetto al tasso di innovazione a livello di applicazione. Le applicazioni sono distribuibili in modo permissionless: chiunque può distribuire un'applicazione su una blockchain esistente come Ethereum. Mentre gli aggiornamenti del protocollo principale sono autorizzati in un senso molto profondo. Questo ha bloccato un po' il nostro settore.

#### Disaccoppiare fiducia e innovazione (8:30) {#decoupling-trust-and-innovation-830}

Riportando la storia al 2008-2009: Bitcoin ha fatto da pioniere nella fiducia decentralizzata attraverso il minaggio basato sulla Prova di lavoro (PoW). Oltre al minaggio, c'è un protocollo di consenso — la catena più lunga o la catena più pesante — che decide la catena valida. Oltre a ciò, Bitcoin Script imposta la semantica di esecuzione. Quindi abbiamo un livello di fiducia alla base, un livello di consenso sopra di esso e un livello di esecuzione ancora più in alto.

Ma Bitcoin era anche una blockchain specifica per un'applicazione, progettata per una sola applicazione: lo scambio di Bitcoin tra i client. Tornando al 2011, qualsiasi nuova applicazione che doveva essere costruita su una blockchain necessitava della propria rete di fiducia. Ad esempio, qualcuno voleva costruire un sistema di nomi di dominio decentralizzato chiamato Namecoin. Il livello di scripting di Bitcoin non offriva sufficiente programmabilità, quindi si doveva creare un nuovo livello di scripting e una nuova rete di fiducia. Non c'era modo di condividere la fiducia tra Namecoin e Bitcoin.

L'idea centrale sviluppata da Ethereum è stata il disaccoppiamento tra fiducia e innovazione. Hanno preso il livello di scripting di Bitcoin e lo hanno sostituito con un livello di programmazione Turing-completo di uso generale: la Ethereum Virtual Machine. Si è trattato di un piccolo aggiornamento tecnico in senso basilare, ma ciò che ha creato è stata la modularità della fiducia. Ora chiunque può arrivare e costruire applicazioni decentralizzate (dapp) sul sistema. La persona che ha costruito ENS non ha avuto nulla a che fare con la rete di fiducia. La fiducia della rete Ethereum è diventata un modulo che può essere fornito a qualsiasi applicazione distribuita.

#### Innovazione aperta (10:23) {#open-innovation-1023}

Questo ha portato a una massiccia accelerazione dell'economia pseudonima. Chiunque crei queste applicazioni non è di per sé considerato affidabile, sta solo portando innovazione. Ti viene un'idea, puoi essere un signor nessuno, non hai bisogno di essere considerato affidabile, scrivi semplicemente il tuo codice, lo metti su Ethereum e tutti si fidano che Ethereum continuerà a eseguire le condizioni come stabilito.

Un modo per modellare questo concetto: i livelli di base — la rete di fiducia, il consenso e la macchina virtuale — sono raggruppati in una rete di fiducia che produce fiducia. La blockchain di Ethereum è un produttore di fiducia. Le applicazioni distribuite sono consumatori di fiducia. Lo scambio di valore è: le dapp ottengono fiducia da Ethereum e in cambio pagano delle commissioni. Proprio come il venture capital è stato il disaccoppiamento tra capitale e innovazione, Ethereum ha disaccoppiato fiducia e innovazione.

Ma le barriere all'innovazione aperta continuano a persistere. Se ho un'idea su come aggiornare il protocollo di consenso di Ethereum — diciamo che è il 2019 e mi è venuto in mente il protocollo di consenso di Avalanche — non c'è modo di distribuirlo su Ethereum. Quindi cosa faccio? Vado e creo il mio intero mondo. Questa è l'era delle blockchain layer 1 (l1) alternative: ognuna con protocolli di consenso diversi, macchine virtuali diverse, ma ognuna che deve costruire le proprie reti di fiducia.

Questo quadro è esattamente identico a quello del 2011 di Bitcoin e Namecoin. Le innovazioni a livello di dapp possono semplicemente essere costruite su Ethereum, ma le innovazioni che vanno più in profondità e toccano il cuore dello stack devono creare ecosistemi di fiducia frammentati.

Inoltre, Ethereum fornisce fiducia alle dapp solo per la creazione dei blocchi: l'ordinamento delle transazioni e l'esecuzione delle transazioni. Questo è tutto. Se le dapp volessero fiducia su qualsiasi altra cosa — leggere dati da internet, leggere dati da un'altra blockchain, eseguire un motore di esecuzione diverso, eseguire un motore di gioco, eseguire un sistema di autenticazione — devono creare la propria rete di fiducia. Chainlink è un ottimo esempio: è un protocollo oracolo che aiuta a recuperare dati da internet nella blockchain, ma Chainlink ha la sua rete di fiducia. La sua fiducia non è presa in prestito dagli staker di Ethereum.

#### Problema microeconomico (16:28) {#microeconomic-problem-1628}

Il problema microeconomico: se si gestisce un middleware — ad esempio, un sistema di archiviazione dati — si deve creare il proprio meccanismo di staking. È necessaria un'elevata sicurezza economica, il che significa molto capitale in staking, e poi c'è il costo opportunità del capitale. Ad esempio, si desiderano 10 miliardi di dollari in staking nel proprio livello di archiviazione dati. Si deve pagare un tasso annuo del 5% o del 10% su quel capitale in un mondo non speculativo. Il costo dominante non è il costo operativo dell'archiviazione dei dati: è il costo per alimentare una massiccia base di capitale economico.

Se si osserva qualsiasi ecosistema Proof-of-Stake (PoS): il 94% delle ricompense va alla persona che detiene il capitale e solo il 6% va alla persona che esegue effettivamente le operazioni. Quindi, anche se si ha un'idea rivoluzionaria per ridurre i costi operativi di 10 volte, il 94% rimane invariato. La struttura dei costi è limitata dal costo del capitale.

Se sei una dapp, il problema microeconomico è che stai pagando una commissione molto alta a una grande rete di fiducia come Ethereum, ma sei limitato dalla fiducia più debole da cui dipendi. Se avessi un oracolo o un ponte che non è altrettanto affidabile, potresti subire un exploit lì. La tua sicurezza è sempre il minimo comune denominatore.

#### Problema economico (19:52) {#economic-problem-1952}

Per la blockchain principale, se la proposta di valore fondamentale è fornire fiducia decentralizzata e trarne profitto, Ethereum è in grado di fornire fiducia decentralizzata solo sulla creazione dei blocchi, non su tutte le altre cose necessarie per eseguire un servizio decentralizzato. Isole di fiducia decentralizzata vengono create da altri middleware e, invece di allineare i ricavi e creare una massiccia rete di fiducia, i ricavi vengono frammentati in isole più piccole.

#### EigenLayer (20:44) {#eigenlayer-2044}

In realtà è un'idea incredibilmente semplice che risolve tutti questi problemi in una volta sola.

EigenLayer è un meccanismo per sfruttare una rete di fiducia esistente per fare altre cose per cui non era stata concepita. Ethereum fornisce fiducia sull'ordinamento e sull'esecuzione. EigenLayer è una serie di smart contract su Ethereum e la parola operativa chiave è restaking.

Cos'è il restaking? In Ethereum Proof-of-Stake (PoS), diverse decine di miliardi di dollari sono già in staking nella Beacon Chain. EigenLayer è un meccanismo attraverso il quale gli staker fanno restaking: mettono lo stesso capitale a un rischio aggiuntivo. Vincolano il loro stake in Ethereum e lo stesso stake viene impegnato in condizioni di slashing aggiuntive. Lo slashing è un meccanismo attraverso il quale il tuo stake può essere sottratto, ma ora si aggiungono ulteriori motivi per cui si può essere penalizzati, oltre agli smart contract di EigenLayer.

La proprietà che vogliamo: lo stesso stake si assume un rischio aggiuntivo. Rischio aggiuntivo su cosa? Sulla fornitura di qualsiasi nuovo servizio che sia stato costruito su EigenLayer: qualcuno vuole costruire un oracolo, un ponte, un livello di disponibilità dei dati, un nuovo protocollo di consenso. Ognuno di questi può essere costruito su EigenLayer. Se sei uno staker che decide di partecipare, specifichi anche a quale sottoinsieme di servizi stai aderendo, ottenendo così entrate e assumendoti al contempo un rischio di slashing aggiuntivo.

#### Come EigenLayer allinea l'ecosistema (23:50) {#how-eigenlayer-aligns-the-ecosystem-2350}

Per i middleware: se uno staker che ha già messo in staking in Ethereum sceglie di fornire servizi anche su un oracolo, non ha un costo del capitale aggiuntivo. Ha già messo in staking su Ethereum e sta guadagnando un APR. Scegliendo di partecipare a EigenLayer, il costo marginale del capitale è molto piccolo o teoricamente pari a zero. Se sai che come nodo onesto non subirai mai lo slashing, il rischio è ridotto al minimo. L'equazione diventa: il costo operativo è giustificato dalle entrate? La struttura dei costi dei middleware si trasforma improvvisamente da limitata dal capitale a limitata dai costi operativi.

Per le dapp: in particolare i servizi popolari a cui molti staker scelgono di aderire forniscono la stessa fiducia di Ethereum stesso. Se tutti gli staker potenzialmente aderissero, si potrebbe ottenere la fiducia principale di Ethereum su servizi che non sono stati integrati nativamente in Ethereum.

È anche allineato in termini di valore all'ecosistema principale. Gli staker che hanno messo in staking su Ethereum ottengono ricompense per i blocchi e commissioni di transazione, ma possono anche ottenere commissioni per gli oracoli, commissioni per la disponibilità dei dati, commissioni di ordinamento: tutte cose che prima non erano disponibili. Il fatto che ci siano ulteriori fonti di reddito per lo staking di ETH aumenta il valore del token stesso.

EigenLayer è un mercato a due facce. Da un lato ci sono gli staker che decidono di partecipare. Dall'altro ci sono i middleware e i servizi costruiti su EigenLayer che scelgono di utilizzare questi staker.

#### Sovraindebitamento e gestione del rischio (33:00) {#over-leveraging-and-risk-management-3300}

**Domanda dal pubblico:** Cosa succede se lo stake è sovraindebitato?

Supponiamo che ci siano dieci diverse dapp che eseguono le proprie catene, ciascuna con 1 milione di dollari di valore che si affida allo stesso quorum di staker da 2 milioni di dollari: quello stake diventa sovraindebitato. EigenLayer è anche il livello di gestione del rischio. Modelliamo questo come un problema di grafi: ogni staker è un nodo, ogni servizio dipende da un gruppo di staker e c'è un profitto derivante dalla corruzione per ogni servizio. Quindi si calcolano i tagli su questo grafo per garantire che il sistema non sia mai sovraindebitato.

Se il sistema diventa sovraindebitato, le commissioni aumentano, più persone partecipano e il sistema torna a essere sottoindebitato. Man mano che vengono avviati più servizi, le opportunità di rendimento aumentano e più capitale viene vincolato: invece del 5% di ETH in staking, si potrebbe arrivare al 50%.

#### Economia dello spazio dei blocchi (43:58) {#block-space-economics-4358}

Lo spazio dei blocchi è determinato dal limite del blocco: la dimensione massima che un blocco può ospitare. Tutti i sistemi blockchain hanno un'economia che si autoregola in cui, man mano che la dimensione del blocco si avvicina al limite del blocco, i prezzi iniziano a esplodere.

Il limite del blocco è stabilito dall'infrastruttura del nodo più debole. La filosofia di Ethereum è quella di ammettere un validatore domestico in Venezuela, magari con 1 megabyte al secondo. Quindi è così che viene impostato il limite del blocco. Ma tutti gli staker che operano su Amazon Web Services hanno connessioni a 10 gigabit: una differenza di 10.000 volte rispetto al nodo più debole.

EigenLayer risolve automaticamente questo problema creando un libero mercato in cui questi staker possono prestare il loro spazio dei blocchi aggiuntivo per altri servizi. Qualcuno potrebbe costruire un'altra catena con 15 giga-gas per blocco invece di 15 milioni di gas. Si ottiene circa il 60% della sicurezza di Ethereum, e questo è già abbastanza buono.

#### Eterogeneità degli staker (48:57) {#staker-heterogeneity-4857}

L'eterogeneità degli staker si estende oltre le capacità computazionali. Gli staker sono altamente eterogenei nelle loro preferenze di rischio e ricompensa. Tu e io potremmo concordare sul fatto che subiremo lo slashing se ci discostiamo dall'output di un'API di Coinbase, ma per qualcun altro questo è completamente inaccettabile. Questo non potrà mai essere normalizzato in un protocollo principale, ma può essere esternalizzato in un livello opt-in.

Gli staker sono eterogenei anche nelle preferenze di ricompensa. In Ethereum, lo spazio dei blocchi è una quantità incolore: tutte le transazioni sono uguali e l'unico segnale per distinguerle è il prezzo. È molto difficile costruire un social network su Ethereum perché ogni transazione del social network compete con una transazione della finanza decentralizzata (DeFi) che è molto più redditizia su base transazionale. La nostra soluzione: gli staker scelgono di partecipare a diverse sotto-catene in cui hanno preferenze di ricompensa diverse.

#### Innovazione democratica e agile (51:01) {#democratic-and-agile-innovation-5101}

EigenLayer risolve il problema di come progettare una blockchain che sia al contempo democratica e agile nell'innovazione. Ethereum è governato in modo molto democratico ma è anche molto lento a rispondere. Tutti i protocolli oggi scendono a compromessi tra agilità e governance democratica. Ethereum più EigenLayer ottiene il meglio di entrambi i mondi: un livello di base che è democratico e aggiornato lentamente, su cui EigenLayer consente alle persone di costruire innovazioni che rispondono rapidamente alle richieste del mercato in modo completamente permissionless.

#### EigenDA e conclusioni (52:56) {#eigenda-and-closing-5256}

Stiamo esplorando la costruzione di ponti, automazione guidata dagli eventi, servizi di ordinamento equo, sidechain e integrazione MEV, tutto su EigenLayer. EigenLayer è già attivo su testnet interne. Abbiamo già costruito il primo caso d'uso: un livello di disponibilità dei dati su iper-scala per Ethereum chiamato EigenDA. È un livello di disponibilità dei dati che incorpora le migliori idee nella codifica a cancellazione e negli impegni polinomiali. Sulla nostra testnet, la velocità con cui è possibile scrivere dati è di 12,4 megabyte al secondo: 10 volte superiore a quella prevista per il rilascio di Ethereum 2.0.

L'intuizione chiave è che con la codifica a cancellazione, il costo totale di archiviazione di un file non dipende dal numero di nodi che hanno aderito. Ma il prezzo che si può addebitare dipende dal numero di nodi perché si sta offrendo maggiore sicurezza economica. C'è un'economia auto-scalabile in cui sempre più nodi decideranno di partecipare perché possono addebitare un premio di sicurezza senza aumentare i costi operativi. La codifica a cancellazione rompe il compromesso tra scalabilità e decentralizzazione: si ottiene contemporaneamente piena decentralizzazione e piena scalabilità.

#### Punti salienti delle domande e risposte (58:00) {#qa-highlights-5800}

**Sugli audit dei middleware:** Proprio come esiste un ecosistema di audit degli smart contract, abbiamo bisogno di ecosistemi di audit dei middleware. L'audit degli smart contract serve agli utenti che si presume non sappiano nulla. L'audit dei middleware serve agli staker che si presume sappiano qualcosa. Se non riusciamo a far funzionare gli audit dei middleware, non dovremmo fidarci nemmeno degli audit degli smart contract.

**Sul rischio:** L'esempio estremo: tutto lo stake ha aderito a un sistema EigenLayer in cui si potrebbe subire lo slashing anche senza fare nulla di male, e poi si subisce lo slashing e l'intero protocollo è a rischio. È possibile. Ma sono gli staker a perdere i loro soldi, quindi dovrebbero essere più attenti nell'aderire. Rendere facile per loro essere attenti è ciò su cui ci stiamo concentrando.

**Sullo spazio dei blocchi layer 1 (l1) rispetto alle sidechain:** È possibile eseguire un sistema molto diverso — come una VM di Solana — sulla rete di fiducia di Ethereum. La condizione di slashing è semplice: se si firma due volte un blocco alla stessa profondità, si tratta di una condizione verificabile onchain e si subisce lo slashing. La struttura dei costi funziona perché chi fa restaking non ha costi di capitale aggiuntivi, e la differenza tra una sidechain di EigenLayer e avere la propria catena è che non si ha bisogno di un nuovo token di valore e non si deve pagare per mantenere il costo del capitale di quel token.