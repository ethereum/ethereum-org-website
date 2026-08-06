---
title: "Lo stack della privacy di Ethereum: letture private, networking e la falla nascosta"
description: "Andy Guzman spiega come i metadati trapelano quando i portafogli leggono dati da Ethereum e come la ricerca sulle letture private e sul networking della roadmap della privacy chiuda la falla del livello di accesso."
lang: it
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Stack della privacy di Ethereum"
---

Un intervento di **Andy Guzman**, responsabile del team Privacy Stewards of Ethereum (PSE) presso la Fondazione Ethereum, all'EthBoulder 2026. Espone un importante punto cieco nella privacy di Ethereum: anche gli utenti che non firmano mai una transazione fanno trapelare dati comportamentali dettagliati attraverso le query quotidiane. Introduce lo stack della privacy di Ethereum, coprendo le letture private (PIR), la privacy del traffico (onion routing e mixnet) e il lavoro sulle prestazioni come gli alberi binari unificati e lo stato verificabile tramite ZK.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=tvAqDJXCBaA) pubblicata da EthBoulder. È stata leggermente modificata per facilitarne la lettura.*

#### La lettera fittizia del provider RPC (0:12) {#the-fictional-rpc-provider-letter-012}

Ciao a tutti, sono Andy e volevo introdurre un argomento che non viene discusso spesso nell'ecosistema di Ethereum ed è estremamente importante. Come avrete notato dalla diapositiva e dall'introduzione, riguarda la privacy e come siamo poco protetti senza nemmeno accorgercene.

Lasciate che inizi con una lettera che qualcuno vi ha scritto.

"Caro utente prezioso, grazie per le 847 query che hai effettuato questo mese. Ci è piaciuto molto conoscerti. Sappiamo che detieni ETH in tre diversi portafogli. Sappiamo che hai controllato il prezzo di ETH 94 volte martedì scorso. È stata una giornata molto dura per tutti, quindi non ti giudichiamo. Hai anche controllato il prezzo di BTC, il che è interessante, perché non detieni alcun Bitcoin. Stai pensando di diversificare? Questo rimarrà tra noi e, naturalmente, i nostri partner di analisi. Stai anche osservando molto da vicino due pool di Uniswap e hai controllato il tuo fattore di salute su Aave 14 volte la scorsa settimana. Forse dovresti rilassarti, o semplicemente aggiungere del collaterale. Giovedì lo hai controllato tre volte in 12 minuti ed eri molto preoccupato. Hai guardato quattro diversi nomi ENS, quindi o stai iniziando un nuovo progetto o stai avendo una crisi d'identità. E sei sempre inattivo tra le 23:00 e le 7:00, fuso orario delle Montagne Rocciose."

#### Come fai trapelare dati senza firmare transazioni (1:34) {#how-you-leak-data-without-signing-transactions-134}

"Quindi siamo abbastanza sicuri che tu viva a Boulder, o nelle vicinanze. Non hai mai firmato una singola transazione tramite noi. Non ne hai mai avuto bisogno. La tua curiosità ci ha detto tutto. Con affetto, il tuo provider RPC."

Naturalmente questa è una lettera fittizia, ma descrive qualcosa che facciamo davvero trapelare ogni giorno. Anche se non stai effettuando una singola transazione o alcuna azione onchain, stai fondamentalmente dicendo tutto a qualsiasi società di analisi che vorrebbe mettere le mani su quei dati e sui tuoi comportamenti.

#### Scritture private vs letture private (2:07) {#private-writes-vs-private-reads-207}

Quindi cosa sta succedendo davvero in questo momento nel mondo della privacy? Vedo che poniamo molta enfasi sulla privacy onchain, o su ciò che noi del PSE chiamiamo scritture private: tutte le azioni che compi onchain. E ha senso, giusto? Quelle azioni vengono registrate per sempre e trasmesse in tutto il mondo, quindi ha senso non far trapelare il tuo indirizzo con un'azione specifica. Poniamo anche molta enfasi sugli strumenti: fonti di dati, prove, DSL e linguaggi che possiamo usare per dare agli sviluppatori più strumenti per esprimere e costruire app più solide che abbiano maggiore privacy onchain.

Ma in questa presentazione voglio sostenere che non dedichiamo quasi abbastanza attenzione e sforzi a questi altri domini: ciò che chiamiamo letture private, perché ogni volta che interroghi i dati da una blockchain fai trapelare molte informazioni, e il networking privato, perché ancor prima che qualcosa arrivi onchain, tutto il tuo traffico sta trapelando.

Per scendere un po' più sul tecnico: tutte le chiamate RPC, come eth_getBalance, eth_call ed eth_getLogs, sono richieste in chiaro che vanno ai provider RPC e vengono correlate al tuo IP.

#### Perché una maggiore attività aumenta il rischio di profilazione (3:20) {#why-more-activity-increases-profiling-risk-320}

Con queste informazioni, diventa molto facile profilare le persone, segmentarle e modellarne i comportamenti. E questo può essere usato contro di te. Come puoi immaginare, l'informazione è potere, e più informazioni le persone hanno su di te e sul tuo comportamento, più potere hanno su di te.

La maggior parte delle persone non se ne rende conto. La maggior parte delle persone dirà, ok, beh, non importa davvero perché non si tratta di informazioni critiche. O potrebbero pensare: più attività c'è, più sarò protetto. Questo è del tutto falso e controintuitivo. Per le azioni onchain, ovunque ci siano set di anonimato, aiuta: più utenti ci sono, maggiore è la privacy e più facile è mimetizzarsi. Ma con le letture è il contrario, perché le query non sono intercambiabili. Più attività trasmetti, più azioni intraprendi, più ricca è la superficie di correlazione e più facile è costruire un profilo delle tue azioni.

Quindi, ogni volta che c'è la mania della finanza decentralizzata (DeFi) o la follia degli NFT, le persone diventano più disattente. La sicurezza operativa (OpSec), ovviamente, viene buttata alle ortiche e diventa molto, molto più facile de-anonimizzare le persone in base ai modelli di attività in cui ricade la maggior parte della gente.

#### Introduzione allo stack della privacy di Ethereum (4:43) {#introducing-the-ethereum-privacy-stack-443}

Voglio iniziare con il panorama generale: dove dovremmo attaccare, cosa è necessario e chi sta lavorando a cosa. Questo intervento affronterà alcuni argomenti più tecnici e altri concettuali di più alto livello, in modo che tutti possano trarne valore.

Voglio presentare quello che chiamo lo stack della privacy di Ethereum, o i livelli dello stack della privacy di Ethereum, e penso che sia utile per ragionarci su. Se vogliamo davvero la privacy, non abbiamo bisogno solo della privacy onchain; abbiamo bisogno di privacy anche in tutti questi livelli dello stack, in modo simile al ciclo di vita di una transazione, o al modello OSI e ai suoi livelli tecnologici. Sosterrei che potremmo creare uno standard, o una sorta di riconoscimento a livello di ecosistema, dell'esistenza di questi livelli. Forse questa non è la forma definitiva, ma penso che sia indiscutibilmente già utile.

#### Livello per livello: dove fai trapelare dati (5:41) {#layer-by-layer-where-you-leak-541}

In cima c'è il livello dell'applicazione. Ogni volta che visiti un sito web, ovviamente, fai trapelare ciò che stai visitando e le persone possono iniziare a profilare: set di anonimato, credenziali, collegando il tuo IP a ciò che stai visitando, anche se non fai nulla.

Il successivo è il livello del portafoglio. Ogni volta che intraprendi un'azione, non fai trapelare informazioni solo al livello dell'app, ma anche ai gateway. I portafogli in questo momento sono molto complessi, si integrano con molti altri sistemi e servizi e fai trapelare molte più informazioni di quanto immagini. Anche se apri semplicemente il tuo portafoglio e questo interroga il prezzo di ETH o il tuo saldo, stai facendo trapelare tutto.

Poi ci sono i gateway: gli RPC, i proxy, i relayer. Fai trapelare di nuovo altri metadati. Poi c'è quello che le persone immaginerebbero come l'elemento onchain, ovvero ogni volta che le cose vengono interrogate sull'EVM, come lo stato o i modelli di esecuzione. Ad esempio, interrogare il saldo di qualcosa o lo stato di uno smart contract. E infine il consenso, dove si trovano tutti i validatori. A seconda che tu stia scrivendo onchain o leggendo onchain, potresti anche toccare la mempool.

E c'è un'altra verticale, che è ciò che chiamiamo networking, che è trasversale e attraversa tutti questi livelli. Ad esempio: in questo momento visiti un sito web e il server conosce il tuo IP. Ma cosa succederebbe se visitassi quel sito web tramite Tor o un'altra rete anonima? Tu conosceresti l'indirizzo IP del sito web, ma loro non conoscerebbero il tuo. E cosa succederebbe se quel sito web fosse ospitato in un paese che ha recentemente iniziato a censurare tutte le cose cripto? Anche quel sito web e quell'azienda vorrebbero nascondere il proprio IP e vorrebbero nascondere il proprio dominio dietro un dominio onion.

Questi sono i tipi di cose che hanno senso: dobbiamo procedere livello per livello, rafforzando tutto, analizzando attraverso la lente di un aggressore molto distruttivo che vuole censurare tutto. Anche se non lo facciamo, e diciamo di vivere in uno stato abbastanza buono, queste informazioni vengono registrate ora e saranno ospitate per sempre da un sacco di persone che nemmeno conosci, aziende che iniziano a vendere i tuoi dati. Alla fine, tra cinque anni, qualcuno potrebbe vietare le cripto e dire: "chiunque abbia usato Uniswap negli ultimi cinque anni, sono l'Agenzia delle Entrate, inizierò a bussare alle porte e a mettervi in prigione", o qualcosa del genere. Questi scenari distopici si verificano in diversi paesi del mondo proprio in questo momento.

#### Letture private e networking privato (8:24) {#private-reads-and-private-networking-824}

Ok, quindi abbiamo lo stack della privacy di Ethereum. Dove dovremmo concentrarci? In questa presentazione voglio parlare di queste due aree. Letture private: ogni volta che accedi allo stato da onchain, tocchi tutti questi livelli, dall'app, diciamo che voglio interrogare il prezzo di ETH, al portafoglio, ai gateway, a un nodo che esegue Ethereum e l'EVM, e poi di nuovo indietro. Fondamentalmente un provider RPC o un indexer. E il networking privato, che comprende tutte le azioni che avvengono a livello di rete. Questo è ciò che vogliamo rafforzare.

#### Tre pilastri: dati, traffico, prestazioni (9:05) {#three-pillars-data-traffic-performance-905}

Ci sono tre pilastri che ritengo fondamentali per raggiungere questo obiettivo. Vogliamo nascondere e rendere privati i dati stessi. Vogliamo nascondere e rendere privato il traffico stesso. E poi vogliamo renderlo performante, utile, pratico ed economico. Questo riassume molte informazioni sulle cose che accadono nell'ecosistema, ma penso che sia utile per delineare la situazione e identificare i punti di leva in cui possiamo accelerare.

#### Nascondere i dati: dai proxy alla PIR (9:39) {#hiding-data-from-proxies-to-pir-939}

Quindi, i dati. Cosa vogliamo proteggere? Vogliamo nascondere quali informazioni stai chiedendo a questi server e vogliamo nascondere i modelli di come accedi a questi dati. Non solo il contenuto, ma anche i modelli.

Ci sono diversi livelli di tecnica. Il primo è il nulla: fai semplicemente trapelare tutto. Ogni volta che colleghi il tuo portafoglio, leghi il tuo indirizzo IP al contratto che stai interrogando, a un eth_getBalance specifico per un indirizzo specifico, e questo è quanto. Anche se stai usando un protocollo per la privacy, diciamo Tornado Cash, e vuoi interrogare lo stato dell'albero di Merkle, o devi scaricare l'intero albero, il che non è molto performante, oppure fai trapelare quale percorso e quali foglie stai interrogando, riducendo il tuo set di anonimato. Quindi, anche usare un forte protocollo per la privacy come Tornado Cash non è sufficiente se non proteggi il tuo networking e i tuoi modelli di accesso ai dati.

Il livello successivo è una sorta di proxy o relay: molte macchine che non sanno da dove provenga la richiesta e alla fine recuperano i dati. Non è molto pratico e non è molto trustless.

Poi ci sono i TEE, che rappresentano un passo avanti, ed è qui che alcuni team e aziende offrono servizi. Penso che questo sia un buon passo avanti ma non sufficiente, ancora una volta perché il costo per attaccare e corrompere i TEE sta scendendo molto. Per alcuni casi d'uso critici questo non è sufficiente; per molti casi quotidiani potrebbe esserlo.

Ci sono altri team che lavorano su OMAP, oblivious map access patterns, e ORAM, Oblivious RAM. Queste sono tecniche simili che cercano di offuscare a quali parti del set di dati stai cercando di accedere. Invece di dire "Voglio il saldo da questo indirizzo ETH", accedi casualmente a cose diverse, in modo che il server non lo sappia.

E sosterrei che il punto di arrivo di queste sarà la PIR, private information retrieval, il che significa che il server non sa cosa stai interrogando e non impara nulla al riguardo.

#### Spiegazione del Private Information Retrieval (12:03) {#private-information-retrieval-explained-1203}

Il private information retrieval è una tecnica super potente nella crittografia e verrà usata molto. Ci sono due varianti: index PIR, che puoi usare se hai dati strutturati sotto un indice, e keyword PIR, dove, come dice il nome, interroghi per parola chiave. È molto difficile avere un unico schema che funzioni per tutto.

Lo stato di Ethereum è enorme e molto vario. I log, come ho imparato ieri, sono di sola aggiunta (append-only), ma il modello degli account è diverso: parte dello stato viene aggiornato molto frequentemente, parte no. A seconda di come lo si scompone, si possono avere megabyte, gigabyte o terabyte di dati, con modelli di accesso molto diversi.

#### Un'architettura PIR multi-agente (12:48) {#a-multi-agent-pir-architecture-1248}

La proposta su cui stiamo lavorando all'interno del PSE, e qui parlerò concettualmente e poi di progetti specifici che stiamo realizzando al PSE e di altre cose che sto vedendo nell'ecosistema, è un'architettura multi-agente. Non esiste un singolo schema perfetto per tutto lo stato di Ethereum. Ma se riusciamo a suddividere lo stato di Ethereum per tipo o per modello di accesso, possiamo trovare ottimi schemi per ciascuno di essi.

E se avessimo un servizio che esegue questa architettura multi-agente e, a seconda del tipo di query e di dove potrebbero trovarsi nello stato di Ethereum, esegue uno schema o un altro? Questo ci porta già molto vicini a qualcosa di fattibile, pronto per la produzione e offribile all'ecosistema. Ciò richiederà qualcosa come un'API unificata, in modo che portafogli, indexer, utenti e sviluppatori di applicazioni decentralizzate (dapp) non debbano preoccuparsi di quale schema venga utilizzato e di come chiamarlo. Hai semplicemente l'API standard e qualcun altro si preoccupa dei dettagli di implementazione.

Stiamo già facendo questo e implementando due schemi diversi. Apriremo dei grant e stiamo cercando di coordinare più persone nell'ecosistema per affrontare alcuni di questi aspetti e vedere quali sono i più necessari per Ethereum.

Ecco alcuni numeri sui diversi schemi PIR: throughput, overhead di comunicazione e così via. È difficile, perché app diverse hanno modelli di accesso diversi. Alcune accedono a molte ricevute, altre vogliono accedere a una parte maggiore dello stato, come Rotki, e altre accedono a più transazioni, come Helios. Non esiste una soluzione magica e molto probabilmente un'architettura mista sarà utile. Stiamo anche facendo una sistematizzazione delle conoscenze, quindi se questo vi interessa, possiamo condividerla. Ed ecco solo alcuni dei team che lavorano in queste aree. Perdonatemi se fate parte di un team e non vi ho incluso; se qualcuno guarda la registrazione e manca, per favore fatemelo sapere e potrò iniziare ad aggiungervi.

#### Nascondere il traffico: onion routing e Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

Abbiamo coperto i dati. L'altro grande contenitore è il traffico. Come nascondiamo il traffico e cosa vogliamo nascondere? In termini molto semplici, vogliamo nascondere gli IP del client e del server l'uno all'altro e al resto del mondo che potrebbe curiosare nel traffico. Abbiamo diverse tecniche: servizi onion, mixnet, VPN, DC-net e potrebbero esserci altre classificazioni. Parlerò solo delle prime due.

Le tecniche di onion routing crittografano a strati e anche il traffico viene decrittografato a strati. Le persone nel mezzo non possono mai conoscere l'origine, alcune non possono mai conoscere la destinazione e alcune non imparano mai nulla; agiscono semplicemente come router.

Il riassunto è: cosa succederebbe se tutto il traffico dell'ecosistema di Ethereum potesse essere instradato attraverso la rete Tor, per così dire? Ci sono anche altre opzioni. Aiuteremmo a proteggere l'IP del mittente: il tuo telefono o il tuo laptop non verrebbero fatti trapelare quando invii transazioni o richiedi informazioni. E naturalmente proteggeremmo anche il destinatario, il server. Immagina che in Iran, Cina, Corea del Nord o Venezuela, qualcuno stia cercando di ospitare un protocollo di finanza decentralizzata (DeFi) o un servizio e questo venga censurato dal suo paese. Questa è un'opzione che potrebbe proteggere le loro vite. Aggira la censura e nasconde anche il traffico agli ISP, i provider di servizi internet, che tutti sappiamo essere intercettati dalle agenzie di intelligence che curiosano su tutto.

L'obiettivo è avere un sostituto pronto all'uso: un SDK, in modo che portafogli, sviluppatori di applicazioni decentralizzate (dapp) e fornitori di infrastrutture non debbano preoccuparsi dei dettagli di implementazione. Sanno solo che se usano questo SDK, il traffico viene 'onionizzato', crittografato e rafforzato.

C'è un team a cui voglio fare un plauso, il team di Brume Wallet, che ha avviato Echalote, un'implementazione open source di Tor per il web. Questo esiste già ora: ci sono client Tor, ma sono scritti in C e devono essere eseguiti in un browser speciale. E se volessi aggiungerlo a MetaMask, o al portafoglio Kohaku, o ad Ambire, Rabby e a tutti gli altri? Abbiamo bisogno di SDK in JavaScript, ed è quello che ha iniziato Echalote.

Inoltre, il Tor Project ha una nuova implementazione in fase di sviluppo chiamata Arti, la prossima generazione del loro client. Ma abbiamo bisogno di un Arti integrato. Arti è basato su Rust e deve essere compilato in WASM per poter essere eseguito nel tuo browser, in modo da poterlo importare molto facilmente. Fondamentalmente abbiamo una collaborazione con il team di Tor: chiamate ogni settimana e alcuni progetti e partnership insieme.

#### Mixnet per Ethereum (18:16) {#mixnets-for-ethereum-1816}

Sul lato mixnet, voglio fare un plauso a diversi team che si stanno avvicinando a questo: il team Nym; HOPR, anch'esso uno dei primi; VPN come Gnosis VPN; e un paio di altri che per me erano nuovi, come Anyone Protocol, e credo che qualcuno di quel team dovrebbe essere qui a Denver, oltre ad alcuni altri nuovi. Ci sono molti team che lavorano su mixnet, VPN e altri approcci.

Vogliamo vedere: cosa succederebbe se creassimo una mixnet appositamente costruita per Ethereum, dove poter instradare il traffico RPC? Le mixnet hanno forti garanzie, ma aggiungono molta latenza. Per alcuni casi d'uso va bene: non importa se ci vuole un po' più di tempo, purché si abbia la privacy. Ma per cose come la finanza decentralizzata (DeFi) e il trading, è estremamente improbabile che vengano adottate se aggiungono latenza. Quindi, qual è la velocità massima a cui possiamo operare con le massime garanzie di privacy? Ancora una volta, un plauso ad alcuni di questi team, e se qualcuno sta lavorando in queste aree e non vi ho aggiunto, mi piacerebbe fare due chiacchiere.

#### Prestazioni: alberi binari unificati e accelerazione GPU (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

L'ultima cosa di cui voglio parlare, il terzo pilastro per rendere tutto questo una realtà, sono le prestazioni. Vogliamo che queste cose funzionino in modo veloce ed economico. Ho un principio: queste cose non verranno adottate se il costo è superiore al beneficio. Costo significa esperienza utente, tempo e sforzo per l'utente, ma anche costo per gli sviluppatori e l'infrastruttura: è molto costoso da eseguire? Dobbiamo abbassare i costi il più possibile e ci sono due iniziative di alto livello di cui posso parlare.

Una è l'UBT. A seconda di quanto siete coinvolti nelle EIP del protocollo, potreste averne sentito parlare. In questo momento abbiamo il Merkle Patricia Trie, che è utile, ma non molto utile per le ZK e altri tipi di crittografia. C'è una proposta, l'EIP-7864, che passa non agli alberi di Verkle ma agli alberi binari unificati. Questo è molto più efficiente per interrogare lo stato e poi eseguire operazioni crittografiche come le ZK al di sopra.

Abbiamo un progetto che realizza un UBT verificabile: si aggiunge un sidecar a qualsiasi client Ethereum, il quale, invece di eseguire un database MPT, ha un database di stato UBT, e poi si dimostra che questa trasformazione da MPT a UBT è valida usando una zkVM. Questo è già molto potente. Una volta che riusciremo a farlo, i client leggeri (light client) potrebbero usarlo per aumentare le loro prestazioni e cose come la PIR potrebbero funzionare molto più velocemente.

L'altro aspetto è l'accelerazione GPU. Possiamo eseguire queste cose molto più velocemente se ottimizziamo i livelli inferiori dello stack: la GPU è uno, o anche l'accelerazione della CPU. Queste cose probabilmente verranno eseguite sui server, non sui telefoni, quindi è anche molto prezioso iniziare a esplorare come possiamo creare queste librerie di livello inferiore per funzionare molto più velocemente.

Facendo un riepilogo finora: abbiamo questi cinque livelli e vogliamo coprire questi casi d'uso. Ci sono tre pilastri: dati, traffico e prestazioni. Per i dati abbiamo proxy, TEE, ORAM, OMAP e PIR. Per il traffico abbiamo mixnet, onion routing e altri. Per le prestazioni abbiamo UBT e accelerazione GPU. Se volete leggere di più, almeno sui contributi che il PSE sta dando, potete andare su pse.dev/research.

#### Misurare il successo (22:15) {#measuring-success-2215}

Quindi cos'è il successo e come possiamo misurarlo? Tornando a questi livelli: se voglio poter affermare che Ethereum è la catena più privata, qual è l'obiettivo finale? Avrei bisogno di sentirmi a mio agio sul fatto che tutti questi livelli siano estremamente rafforzati. Come lo misurerei? Mi aspetterei che più siti web e frontend di applicazioni decentralizzate (dapp) fossero ospitati dietro domini onion. Mi piacerebbe che i portafogli usassero nativamente il routing anonimo, così come i gateway, i provider RPC e gli indexer. E misurerei una percentuale.

La domanda è: degli attuali frontend dell'ecosistema di Ethereum, quanti sono ospitati dietro un dominio onion? Direi pochissimi, l'1% se va bene. Per sentirmi bene e dire che ce l'abbiamo fatta, avremmo probabilmente bisogno di più dell'80% a tutti questi livelli. Quanti portafogli in questo momento stanno instradando il traffico attraverso tecniche di routing anonimo? Molto, molto pochi. Lo stesso vale per i provider RPC: questi provider offrono la PIR? No. Quindi per me, rivendicare il successo significa che gli attori a tutti questi livelli adottano questi tipi di tecnologie, almeno l'80% dei team, del traffico o delle query.

#### Confronto con i nodi onion di Bitcoin (23:39) {#bitcoins-onion-node-comparison-2339}

Questa è una cosa per cui possiamo essere invidiosi di Bitcoin. Nonostante tutte le critiche che ricevono, questa è un'immagine del novembre dell'anno scorso: il 64% dei loro nodi completi raggiungibili è nascosto dietro domini onion.

Possiamo farlo anche noi? Questa è privacy di livello inferiore, a livello di consenso, ma potremmo dire che i nostri nodi completi e i nodi validatori sono dietro una rete onion o mixnet? Penso decisamente che dovremmo, e probabilmente siamo a meno dell'1%. Abbiamo altre sfide che loro non hanno: operiamo molto più velocemente e il nostro consenso è diverso. Ma mi piacerebbe avere dashboard come questa e dire che più dell'80% dei portafogli ha adottato questi tipi di tecnologie, e anche i provider RPC, gli esploratori, i frontend, i bilanciatori di carico e gli SDK. Mi piacerebbe che questo elenco crescesse.

#### Confronto tra Ethereum, Monero e Zcash (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

Mi sono preso la libertà, ieri sera e la sera prima, di iniziare a vedere come, attraverso questa lente dei livelli, l'ecosistema di Ethereum si confronta con cose come Solana, Bitcoin, Zcash e Monero. Le cose in giallo sono tecniche opt-in e penso che lì siamo messi molto bene. Le cose in blu sono proposte, alcune delle quali proposte di protocollo. Le cose in verde sono applicate a livello di protocollo.

A causa della nostra storia decennale come catena pubblica, penso che sarà difficile raggiungere Monero e Zcash nel rendere nativa la privacy. Ma penso che possiamo fare un ottimo lavoro nell'ottenere un'adozione opt-in e nell'influenzare culturalmente e socialmente i team e gli utenti ad adottare un maggior numero di queste tecniche. Bitcoin e Solana hanno le loro sfide e penso che rimarranno più indietro, almeno su queste questioni di privacy.

#### La sfida: l'ecosistema programmabile più privato (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

Il mio obiettivo, e l'obiettivo che voglio mettervi in testa, è che Ethereum diventi l'ecosistema più privato, permissionless, trustless e programmabile al mondo. Abbiamo altre catene di pagamento private, e questo è fantastico, sono molto buone, ma penso che avranno un compito molto più difficile nel diventare programmabili e nel creare l'ecosistema che abbiamo creato noi.

La mia sfida per voi, e naturalmente per me e per il mio team, è diventare, tra gli ecosistemi programmabili, il più permissionless, trustless e privato. Non possiamo concentrarci solo sugli elementi onchain. Dobbiamo concentrarci su tutti questi livelli.

Quindi, se state lavorando su letture private, networking, implementazioni PIR, accelerazione GPU, strutture dati, UBT, infrastrutture o validatori, mi piacerebbe fare due chiacchiere con voi più tardi. Grazie mille. Ethereum è per la privacy.