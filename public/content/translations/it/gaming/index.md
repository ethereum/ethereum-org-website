---
title: Il gaming su Ethereum
lang: it
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoint1: Le regole e lo stato del gioco possono essere applicati dalla blockchain di Ethereum, non dai server di uno studio, rappresentando un vantaggio chiave dei giochi on-chain
summaryPoint2: "Chiunque può creare mod, bot o giochi completamente nuovi che si collegano agli stessi dati aperti on-chain"
summaryPoint3: "I L2 appositamente creati consentono un gameplay in tempo reale con commissioni inferiori, mentre i framework di sviluppo di giochi rendono la creazione di giochi on-chain più accessibile che mai"
buttons:
  - content: Scopri di più
    toId: gaming-on-ethereum
  - content: Esplora i giochi
    toId: games
    isSecondary: false
---

## Il gaming su Ethereum {#gaming-on-ethereum}

Il gaming su Ethereum si presenta in varie forme, dai giochi che utilizzano la blockchain per funzionalità specifiche a quelli in cui l'intero mondo di gioco vive on-chain. La blockchain di Ethereum può essere utilizzata con i giochi in varie capacità. I giochi possono memorizzare le loro valute come token trasferibili o altre risorse di gioco (personaggi, equipaggiamento, animali domestici, ecc.) sotto forma di [NFT (token non fungibili)](/nft/). I giochi possono anche utilizzare i contratti intelligenti per ospitare la loro logica, le regole e lo stato on-chain. Tali giochi sono comunemente definiti "giochi completamente on-chain".

L'ecosistema di Ethereum include anche [blockchain di livello 2 (L2)](/layer-2/learn/) che ereditano le garanzie di sicurezza della rete principale di Ethereum estendendo al contempo la scalabilità di Ethereum e supportando casi d'uso specializzati. Le reti L2 possono fornire ulteriori vantaggi per i giochi on-chain e le loro comunità, perché i L2 possono offrire tempi di conferma più rapidi, un volume di elaborazione più elevato e commissioni inferiori, rendendo il gameplay più veloce e accessibile.

## Panoramica dell'ecosistema di gaming di Ethereum {#ethereums-gaming-ecosystem-overview}

- **Livelli 2:** Con commissioni più economiche e tempi di transazione brevi, i L2 sono diventati un luogo comune per il lancio dei giochi. I principali livelli 2 con giochi includono: Starknet, Immutable, Base e Abstract.
- **Infrastruttura:** Per semplificare lo sviluppo di giochi on-chain, esistono diversi stack di strumenti che possono essere utilizzati con il proprio progetto, tra cui: Cartridge, Dojo, Proof of Play e Thirdweb.
- **Gilde di gioco:** I giocatori che vogliono far parte di una comunità di gioco possono unirsi alle gilde di gioco per elaborare strategie e collaborare con altri giocatori nella gilda. Le gilde degne di nota includono: YGG, WASD, LegacyGG, Gaming Grid, OLAGG e altre ancora.
- **Giochi:** I giochi su Ethereum sono disponibili in diverse forme e dimensioni, spaziando dalla strategia in tempo reale di _Realms: Eternum_, all'MMO _Axie: Atia's Legacy_, all'action RPG _Fableborn_ e persino a piattaforme DeFi gamificate come _Ponziland_. Con nuovi giochi lanciati regolarmente su diverse catene, c'è sempre qualcosa di nuovo da esplorare.

## Giochi da provare {#games}

<CategoryAppsGrid category="gaming" />

## Caratteristiche dei giochi on-chain {#features-of-onchain-games}

1. **Modo sicuro di scambiare beni digitali**

   Le risorse di gioco scambiabili possono essere scambiate tra i giocatori con altre risorse di gioco o token su quella catena. In passato, i giochi affrontavano comunemente la sfida di facilitare il commercio equo tra i giocatori, specialmente per oggetti rari e di valore. I mercati di terze parti e il trading peer-to-peer spesso portavano i giocatori a essere ingannati o truffati dei loro beni preziosi. Poiché le risorse on-chain seguono una struttura di dati consolidata, possono essere facilmente integrate con i mercati esistenti, offrendo ai giocatori tranquillità durante lo scambio. I progressi negli AMM consentono inoltre ai giocatori di scambiare istantaneamente determinati oggetti senza dover aspettare una controparte (acquirente/venditore) per finalizzare il loro scambio.

2. **Origine trasparente delle risorse**

   I falsi e le copie degli originali possono essere un problema considerevole quando si valutano gli oggetti, specialmente se la persona non ha molta familiarità con come distinguere un oggetto reale da uno falso. Le risorse on-chain hanno sempre una cronologia completa di chi (quale portafoglio) le possedeva e del loro indirizzo di origine. Anche se esiste una copia perfetta dell'oggetto on-chain, si distingue chiaramente dall'originale in base al suo contratto intelligente di origine, mitigando il rischio di frode.

3. **Logica trasparente**

   I giochi completamente on-chain utilizzano i contratti intelligenti per la loro funzionalità. Ciò significa che chiunque può rivedere e verificare la logica del gioco, assicurandosi che funzioni secondo le intenzioni degli sviluppatori. Questa trasparenza logica consente inoltre ad altri sviluppatori di creare nuovi contratti intelligenti che possono espandere il gioco o essere integrati con alcune delle sue funzionalità.

4. **Risultati dimostrabili**

   Nei giochi completamente on-chain, ogni azione del giocatore viene registrata sulla blockchain. Questo rende molto facile controllare e verificare se un giocatore ha compiuto le azioni richieste per un certo traguardo/risultato. A causa della natura immutabile delle blockchain, quei record di risultati rimarranno intatti finché la catena continuerà a funzionare e potranno essere verificati da qualsiasi parte (non solo dagli sviluppatori, come si vede comunemente nel gaming tradizionale).

5. **Giochi per sempre**

   I giocatori investono molto tempo e sforzi per costruire la loro reputazione e i loro personaggi nel gioco, ma quei progressi possono essere facilmente persi se gli sviluppatori decidono di chiudere i server (specialmente se si tratta di un gioco online). Poiché i giochi completamente on-chain memorizzano la loro logica e il loro stato on-chain, i giocatori possono ancora interagire con i contratti intelligenti del gioco, anche se lo sviluppatore principale del gioco cessa lo sviluppo. Tali giochi possono ancora essere giocati e continuare a ricevere aggiornamenti dalle loro comunità perché la loro logica continua a funzionare sulla blockchain.

## Come i giochi integrano le blockchain {#how-games-integrate-blockchains}

Gli sviluppatori di giochi possono decidere di incorporare diverse funzionalità di Ethereum nei loro giochi. Solo perché le funzionalità esistono non significa che ogni gioco creato su Ethereum debba usarle tutte, poiché esistono soluzioni alternative (con i propri pro e contro) che gli sviluppatori possono utilizzare in alternativa.

### Accedi con Ethereum {#sign-in-with-ethereum}

I giocatori possono utilizzare i loro account on-chain per accedere al gioco. Questo è solitamente facilitato firmando una transazione con il portafoglio web3 di un giocatore. I giocatori possono quindi conservare le loro risorse di gioco e portare la loro reputazione di giocatore in un unico account, in tutti i giochi a cui accedono utilizzando lo stesso portafoglio. L'[EVM](/developers/docs/evm/) di Ethereum è uno standard comunemente utilizzato su molte blockchain, quindi un giocatore può spesso utilizzare lo stesso account per accedere ai giochi su qualsiasi blockchain compatibile con l'EVM supportata dal portafoglio (nota: alcuni portafogli web3 richiedono un'importazione RPC manuale, specialmente per le blockchain più recenti, prima di poter essere utilizzati per fare qualsiasi cosa su quella catena).

### Token fungibili {#fungible-tokens}

Proprio come l'Ether, le risorse e le valute di gioco fungibili possono essere memorizzate on-chain come token fungibili. I token possono quindi essere inviati tra indirizzi e utilizzati nei contratti intelligenti, consentendo ai giocatori di scambiare o regalare risorse e valute di gioco su mercati aperti.

### Token non fungibili {#non-fungible-tokens}

I token non fungibili (NFT) possono rappresentare elementi di gioco unici, come personaggi, oggetti, terreni o persino stati di salvataggio. Con i metadati dinamici, gli NFT possono evolversi in risposta agli eventi di gioco, consentendo alle risorse di portare con sé la storia nel tempo. Ad esempio, gli NFT Beast in Loot Survivor registrano in modo permanente quando un giocatore specifico sconfigge una creatura unica, incorporando quel risultato nella risorsa NFT stessa. Questo tipo di design punta verso giochi in cui le risorse sono persistenti, dotate di stato e potenzialmente utilizzabili in più esperienze on-chain, piuttosto che oggetti da collezione statici.

### Contratti intelligenti {#smart-contracts}

I giochi completamente on-chain utilizzano i contratti intelligenti per creare una logica di gioco trasparente e immutabile. In tali casi, la blockchain funge da backend del gioco, sostituendo la necessità di ospitare la sua logica e l'archiviazione dei dati su un server centralizzato. (Nota: non tutti i giochi web3 sono giochi completamente on-chain. Come accennato in precedenza, dipende caso per caso da quanta parte dei dati e della logica del gioco è memorizzata on-chain, rispetto a un altro livello di disponibilità dei dati o su un server classico.)

## Evoluzione dei miglioramenti dell'UX del giocatore {#evolution-of-player-ux-improvements}

### Interoperabilità e gioco cross-chain {#interoperability-and-cross-chain-play}

I progressi nelle interazioni cross-chain e nei ponti consentono ai giocatori di accedere ai giochi su Ethereum in modo più fluido che mai. I giochi possono essere distribuiti su più blockchain e le risorse on-chain di un gioco possono essere integrate da un altro gioco. In passato, ai giocatori era solitamente richiesto di trasferire tramite ponte i propri fondi su un'altra catena prima di poter iniziare a utilizzarli nel gioco. Oggigiorno, i giochi integrano comunemente ponti di token verso altre catene per facilitare l'onboarding dei giocatori.

### Miglioramenti della scalabilità e delle commissioni del gas {#scalability-and-gas-fee-improvements}

Nel 2017, la mania per i CryptoKitties ha aumentato drasticamente le commissioni del gas per tutti gli utenti che effettuavano transazioni su Ethereum. Da allora, numerose Proposte di miglioramento di Ethereum sono state implementate con successo negli aggiornamenti della rete, aumentando la larghezza di banda della rete principale di Ethereum e riducendo significativamente le commissioni della transazione medie. I livelli 2 espandono ulteriormente il throughput disponibile, riducendo le commissioni della transazione a centesimi o anche meno. Commissioni inferiori e un throughput più elevato hanno ampliato i casi d'uso di gioco che possono essere creati su Ethereum, supportando azioni ad alto volume e microtransazioni in-game che non escludono i giocatori di tutti i giorni a causa dei prezzi.

### Accessi social {#social-logins}

L'accesso con un account Ethereum on-chain, che può essere utilizzato su tutte le blockchain compatibili con l'EVM, è uno dei metodi di autenticazione più comuni. Anche alcune catene non EVM lo utilizzano come opzione per creare un account. Tuttavia, se un nuovo giocatore non ha un account Ethereum esistente e desidera creare facilmente un account per accedere a un gioco, l'[astrazione dell'account](/roadmap/account-abstraction/) gli consente di accedere con i propri account social e creare un account Ethereum in background.

### Paymaster e chiavi di sessione {#paymaster-and-session-keys}

Pagare le commissioni del gas per inviare transazioni on-chain o interagire con i contratti intelligenti può essere un punto di attrito significativo per molti nuovi giocatori. Gli account Paymaster possono essere finanziati dal giocatore o sovvenzionati dal gioco. Le chiavi di sessione consentono al giocatore di rimanere connesso al gioco per l'intera durata della sua sessione, richiedendogli di firmare solo il primo messaggio della sua sessione, con i messaggi successivi firmati in background.

Ci sono filosofie contrastanti attorno a queste meccaniche. Un esempio di spicco è Kamigotchi di Initia, che tratta il gas pagato dai giocatori come entrate dirette. Al contrario, l'ecosistema di giochi Realms.World, che include oltre 4 giochi completamente on-chain dal vivo su Starknet, adotta l'approccio opposto. Tutti i giochi nell'ecosistema utilizzano il Cartridge Paymaster, consentendo ai giocatori di interagire con i giochi a costo zero di gas. Laddove Kamigotchi abbraccia le commissioni del gas come parte del design economico, i giochi di Realms.World vedono i costi del gas principalmente come un ostacolo all'esperienza del giocatore.

## Inizia a giocare su Ethereum {#get-started-with-gaming-on-ethereum}

1. **Trova un gioco divertente a cui giocare** - Sfoglia i giochi elencati sopra o esplora piattaforme come [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/) e [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games)
2. **Configura il tuo portafoglio crypto** - Avrai bisogno di un portafoglio per gestire le tue risorse digitali di gioco e (in alcuni casi) per accedere ai giochi. [Scegli un portafoglio qui](/wallets/find-wallet/)
3. **Finanzia il tuo portafoglio** - Acquisisci un po' di Ether (ETH) o token rilevanti per la rete di livello 2 che intendi utilizzare
4. **Gioca** - Inizia a giocare e goditi la vera proprietà dei tuoi progressi nel gioco