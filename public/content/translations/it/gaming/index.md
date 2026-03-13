---
title: Gaming su Ethereum
lang: it
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoint1: Le regole e lo stato del gioco possono essere applicati dalla blockchain di Ethereum, non dai server di uno studio, il che rappresenta un vantaggio chiave dei giochi on-chain
summaryPoint2: "Chiunque può creare mod, bot o giochi completamente nuovi che si collegano agli stessi dati aperti on-chain"
summaryPoint3: "Gli L2 appositamente creati consentono un gameplay in tempo reale con commissioni inferiori, mentre i framework di sviluppo di giochi rendono la creazione di giochi on-chain più accessibile che mai"
buttons:
  - content: Per saperne di più
    toId: gaming-on-ethereum
  - content: Esplora i giochi
    toId: games
    isSecondary: false
---

## Gaming su Ethereum {#gaming-on-ethereum}

Il gaming su Ethereum si presenta in varie forme, dai giochi che utilizzano la blockchain per funzionalità specifiche a quelli in cui l'intero mondo di gioco vive on-chain. La blockchain di Ethereum può essere utilizzata con i giochi in vari modi. I giochi possono archiviare le loro valute come token trasferibili o altri asset di gioco (personaggi, equipaggiamento, animali domestici, ecc.) sotto forma di [NFT (token non fungibili)](/nft/). I giochi possono anche utilizzare contratti intelligenti per ospitare la loro logica, le regole e lo stato on-chain. Tali giochi sono comunemente definiti "giochi completamente on-chain".

L'ecosistema di Ethereum include anche [blockchain di livello 2 (L2)](/layer-2/learn/) che ereditano le garanzie di sicurezza della rete principale di Ethereum, estendendo al contempo la scalabilità di Ethereum e supportando casi d'uso specializzati. Le reti L2 possono fornire ulteriori vantaggi per i giochi on-chain e le loro comunità, poiché gli L2 possono offrire tempi di conferma più rapidi, un volume di elaborazione più elevato e commissioni inferiori, rendendo il gameplay più veloce e accessibile.

## Panoramica dell'ecosistema di gioco di Ethereum {#ethereums-gaming-ecosystem-overview}

- **Livelli 2:** Con commissioni più economiche e tempi di transazione brevi, gli L2 sono diventati un luogo comune per il lancio dei giochi. I principali livelli 2 con giochi includono: Starknet, Immutable, Base e Abstract.
- **Infrastruttura:** Per rendere più facile lo sviluppo di giochi on-chain, esistono una serie di stack di strumenti che possono essere utilizzati con il proprio progetto, tra cui: Cartridge, Dojo, Proof of Play e Thirdweb.
- **Gilde di gioco:** I giocatori che vogliono far parte di una comunità di gioco possono unirsi a gilde di gioco per elaborare strategie e collaborare con altri giocatori della gilda. Gilde degne di nota includono: YGG, WASD, LegacyGG, Gaming Grid, OLAGG e altre.
- **Giochi:** I giochi di Ethereum sono disponibili in diverse forme e dimensioni, spaziando da giochi di strategia in tempo reale come _Realms: Eternum_, a MMO come _Axie: Atia's Legacy_, a RPG d'azione come _Fableborn_, e persino a piattaforme DeFi gamificate come _Ponziland_. Con nuovi giochi lanciati regolarmente su diverse catene, c'è sempre qualcosa di nuovo da esplorare.

## Giochi da provare {#games}

<CategoryAppsGrid category="gaming" />

## Caratteristiche dei giochi on-chain {#features-of-onchain-games}

1. **Modo sicuro per scambiare beni digitali**

   Gli asset di gioco scambiabili possono essere scambiati tra giocatori con altri asset di gioco o token su quella catena. In passato, i giochi hanno spesso affrontato la sfida di facilitare lo scambio equo tra i giocatori, specialmente per oggetti rari e di valore. I marketplace di terze parti e gli scambi peer-to-peer hanno spesso portato i giocatori a essere ingannati o truffati, perdendo i loro beni più preziosi. Poiché gli asset on-chain seguono una struttura dati consolidata, possono essere facilmente integrati con i marketplace esistenti, dando ai giocatori tranquillità quando li scambiano. I progressi negli AMM consentono inoltre ai giocatori di scambiare istantaneamente determinati oggetti senza dover attendere che una controparte (acquirente/venditore) finalizzi lo scambio.

2. **Origine trasparente degli asset**

   I falsi e le copie degli originali possono essere un problema considerevole nella valutazione degli oggetti, specialmente se la persona non ha molta familiarità con come distinguere un oggetto reale da uno falso. Gli asset on-chain hanno sempre una cronologia completa di chi (quale portafoglio) li ha posseduti e del loro indirizzo di origine. Anche se esiste una copia perfetta dell'oggetto on-chain, essa è chiaramente distinguibile dall'originale in base al suo contratto intelligente di origine, mitigando il rischio di frode.

3. **Logica trasparente**

   I giochi completamente on-chain utilizzano contratti intelligenti per le loro funzionalità. Ciò significa che chiunque può esaminare e verificare la logica del gioco, assicurandosi che funzioni come previsto dagli sviluppatori. Questa trasparenza della logica consente anche ad altri sviluppatori di creare nuovi contratti intelligenti che possono espandere il gioco o essere integrati con alcune delle sue funzionalità.

4. **Risultati dimostrabili**

   Nei giochi completamente on-chain, ogni azione del giocatore viene registrata sulla blockchain. Questo rende molto facile controllare e verificare se un giocatore ha compiuto le azioni necessarie per un determinato traguardo/risultato. Data la natura immutabile delle blockchain, tali registri dei risultati rimarranno intatti finché la catena continuerà a funzionare e potranno essere verificati da qualsiasi parte (non solo dagli sviluppatori, come si vede comunemente nei giochi tradizionali).

5. **Giochi per sempre**

   I giocatori investono molto tempo e sforzi per costruire la loro reputazione e i loro personaggi nel gioco, ma quel progresso può essere facilmente perso se gli sviluppatori decidono di spegnere i server (specialmente se si tratta di un gioco online). Poiché i giochi completamente on-chain memorizzano la loro logica e il loro stato on-chain, i giocatori possono ancora interagire con i contratti intelligenti del gioco, anche se lo sviluppatore principale del gioco cessa lo sviluppo. Tali giochi possono ancora essere giocati e continuare a ricevere aggiornamenti dalle loro comunità perché la loro logica continua a funzionare sulla blockchain.

## Come i giochi integrano le blockchain {#how-games-integrate-blockchains}

Gli sviluppatori di giochi possono decidere di incorporare diverse funzionalità di Ethereum nei loro giochi. Il solo fatto che le funzionalità esistano non significa che ogni gioco costruito su Ethereum debba usarle tutte, poiché esistono soluzioni alternative (con i loro pro e contro) che gli sviluppatori possono utilizzare.

### Accedi con Ethereum {#sign-in-with-ethereum}

I giocatori possono utilizzare i loro account on-chain per accedere al gioco. Questo di solito è facilitato firmando una transazione con il portafoglio web3 di un giocatore. I giocatori possono quindi conservare i loro asset di gioco e portare la loro reputazione di giocatore in un unico account, su tutti i giochi a cui accedono utilizzando lo stesso portafoglio. L'[EVM](/developers/docs/evm/) di Ethereum è uno standard comunemente utilizzato su molte blockchain, quindi un giocatore può spesso utilizzare lo stesso account per accedere ai giochi su qualsiasi blockchain compatibile con EVM supportata dal portafoglio (nota: alcuni portafogli web3 richiedono un'importazione manuale dell'RPC, specialmente per le blockchain più recenti, prima di poter essere utilizzati per fare qualsiasi cosa su quella catena).

### Token fungibili {#fungible-tokens}

Proprio come Ether, le risorse e le valute di gioco fungibili possono essere archiviate on-chain come token fungibili. I token possono quindi essere inviati tra indirizzi e utilizzati nei contratti intelligenti, consentendo ai giocatori di scambiare o regalare risorse e valute di gioco su mercati aperti.

### Token non fungibili {#non-fungible-tokens}

I token non fungibili (NFT) possono rappresentare elementi di gioco unici, come personaggi, oggetti, terreni o persino stati di salvataggio. Con i metadati dinamici, gli NFT possono evolversi in risposta agli eventi di gioco, consentendo agli asset di portare con sé la cronologia nel tempo. Ad esempio, gli NFT Bestia in Loot Survivor registrano in modo permanente quando un giocatore specifico sconfigge una creatura unica, incorporando tale risultato nell'asset NFT stesso. Questo tipo di design punta a giochi in cui gli asset sono persistenti, con stato e potenzialmente utilizzabili in più esperienze on-chain, piuttosto che oggetti da collezione statici.

### Contratti intelligenti {#smart-contracts}

I giochi completamente on-chain utilizzano contratti intelligenti per creare una logica di gioco trasparente e immutabile. In tali casi, la blockchain funge da backend del gioco, sostituendo la necessità di ospitare la sua logica e l'archiviazione dei dati su un server centralizzato. (Nota: non tutti i giochi web3 sono giochi completamente on-chain. Come accennato in precedenza, dipende caso per caso quanta parte dei dati e della logica del gioco viene archiviata on-chain, rispetto a un altro livello di disponibilità dei dati o a un server classico).

## Evoluzione dei miglioramenti dell'UX del giocatore {#evolution-of-player-ux-improvements}

### Interoperabilità e gioco cross-chain {#interoperability-and-cross-chain-play}

I progressi nelle interazioni cross-chain e nel bridging consentono ai giocatori di accedere ai giochi su Ethereum in modo più fluido che mai. I giochi possono essere distribuiti su più blockchain e gli asset on-chain di un gioco possono essere integrati da un altro gioco. In passato, ai giocatori era solitamente richiesto di trasferire i propri fondi su un'altra catena tramite ponte prima di poterli utilizzare nel gioco. Oggi, i giochi integrano comunemente ponti di token verso altre catene per facilitare l'onboarding dei giocatori.

### Miglioramenti della scalabilità e delle commissioni sul gas {#scalability-and-gas-fee-improvements}

Nel 2017, la mania per CryptoKitties ha aumentato drasticamente le commissioni sul gas per tutti gli utenti che effettuavano transazioni su Ethereum. Da allora, numerose proposte di miglioramento di ethereum sono state implementate con successo negli aggiornamenti della rete, aumentando la larghezza di banda della rete principale di Ethereum e riducendo significativamente le commissioni di transazione medie. I livelli 2 espandono ulteriormente il throughput disponibile, riducendo le commissioni di transazione a centesimi o anche meno. Commissioni più basse e un throughput più elevato hanno ampliato i casi d'uso dei giochi che possono essere costruiti su Ethereum, supportando azioni ad alto volume e microtransazioni di gioco che non escludono i giocatori comuni.

### Accessi social {#social-logins}

L'accesso con un account Ethereum on-chain, che può essere utilizzato su tutte le blockchain compatibili con EVM, è uno dei metodi di autenticazione più comuni. Anche alcune catene non-EVM lo utilizzano come opzione per creare un account. Tuttavia, se un nuovo giocatore non ha un account Ethereum esistente e vuole creare facilmente un account per accedere a un gioco, l'[astrazione dell'account](/roadmap/account-abstraction/) gli consente di accedere con i propri account social e creare un account Ethereum in background.

### Paymaster e chiavi di sessione {#paymaster-and-session-keys}

Pagare le commissioni sul gas per inviare transazioni on-chain o interagire con i contratti intelligenti può essere un punto di frizione significativo per molti nuovi giocatori. Gli account Paymaster possono essere finanziati dal giocatore o sovvenzionati dal gioco. Le chiavi di sessione consentono al giocatore di rimanere connesso al gioco per l'intera durata della sessione, richiedendogli di firmare solo il primo messaggio della sessione, con i messaggi successivi firmati in background.

Ci sono filosofie contrastanti riguardo a queste meccaniche. Un esempio lampante è Kamigotchi di Initia, che tratta il gas pagato dal giocatore come entrata diretta. Al contrario, l'ecosistema di gioco di Realms.World, che include più di 4 giochi completamente on-chain attivi su Starknet, adotta l'approccio opposto. Tutti i giochi dell'ecosistema utilizzano il Paymaster di Cartridge, consentendo ai giocatori di interagire con i giochi a costo zero di gas. Mentre Kamigotchi considera le commissioni sul gas come parte del design economico, i giochi di Realms.World vedono i costi del gas principalmente come un ostacolo all'esperienza del giocatore.

## Inizia a giocare su Ethereum {#get-started-with-gaming-on-ethereum}

1. **Trova un gioco divertente** - Sfoglia i giochi elencati sopra o esplora piattaforme come [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/) e [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games)
2. **Configura il tuo portafoglio di criptovalute** - Avrai bisogno di un portafoglio per gestire i tuoi asset digitali di gioco e (in alcuni casi) per accedere ai giochi. [Scegli un portafoglio qui](/wallets/find-wallet/)
3. **Ricarica il tuo portafoglio** - Acquista un po' di Ether (ETH) o i token pertinenti per la rete di livello 2 che intendi utilizzare
4. **Gioca** - Inizia a giocare e goditi la vera proprietà dei tuoi progressi nel gioco
